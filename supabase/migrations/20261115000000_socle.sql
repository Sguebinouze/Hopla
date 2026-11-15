-- Hopla : socle des données utilisateurs.
-- Principe : le contenu pédagogique vit dans Git ; la base ne stocke que les comptes,
-- les profils enfants et leur progression.
--
-- Isolation des sessions :
--   * le parent s'authentifie avec Supabase Auth (son JWT reste sur l'appareil familial) ;
--   * ce JWT seul ne donne accès qu'à la liste des prénoms (fonction liste_profils) ;
--   * une session enfant (code secret) donne accès aux seules données de cet enfant ;
--   * le mode parent (code parent) donne accès aux données de tous ses enfants.
-- Les jetons de session voyagent dans les en-têtes x-session-enfant / x-session-parent
-- et ne sont stockés qu'en empreinte SHA-256.

create extension if not exists pgcrypto with schema extensions;
create schema if not exists app;
grant usage on schema app to authenticated;

-- ─────────────────────────────────────────── Tables

create table public.parents (
  id uuid primary key references auth.users (id) on delete cascade,
  code_parent_hash text,
  cree_le timestamptz not null default now()
);

create table public.enfants (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references auth.users (id) on delete cascade,
  prenom text not null check (char_length(prenom) between 1 and 40),
  avatar text not null default 'orange',
  classe text not null check (classe in ('cp','ce1','ce2','cm1','cm2','6e','5e','4e','3e')),
  code_hash text not null,
  code_type text not null check (code_type in ('pictos', 'chiffres')),
  xp integer not null default 0 check (xp >= 0),
  serie integer not null default 0 check (serie >= 0),
  derniere_activite date,
  cree_le timestamptz not null default now()
);
create index enfants_parent_idx on public.enfants (parent_id);

create table public.sessions_enfant (
  jeton_hash text primary key,
  enfant_id uuid not null references public.enfants (id) on delete cascade,
  parent_id uuid not null references auth.users (id) on delete cascade,
  expire_le timestamptz not null
);

create table public.sessions_parent (
  jeton_hash text primary key,
  parent_id uuid not null references auth.users (id) on delete cascade,
  expire_le timestamptz not null
);

create table public.tentatives_code (
  id bigint generated always as identity primary key,
  parent_id uuid not null references auth.users (id) on delete cascade,
  cible text not null,
  le timestamptz not null default now()
);
create index tentatives_code_idx on public.tentatives_code (parent_id, cible, le);

create table public.resultats (
  id bigint generated always as identity primary key,
  enfant_id uuid not null references public.enfants (id) on delete cascade,
  competence_id text not null check (competence_id ~ '^[A-Z]{2}-C[234]-[A-Z0-9]{2,3}-[A-Z]{2,6}-[0-9]{2}$'),
  contenu_id text not null,
  annee_scolaire text not null check (annee_scolaire ~ '^[0-9]{4}-[0-9]{4}$'),
  reussi boolean not null,
  essais smallint not null default 1 check (essais between 1 and 10),
  indice boolean not null default false,
  duree_ms integer check (duree_ms between 0 and 3600000),
  le timestamptz not null default now()
);
create index resultats_enfant_idx on public.resultats (enfant_id, le desc);

create table public.progression_competences (
  enfant_id uuid not null references public.enfants (id) on delete cascade,
  competence_id text not null,
  score real not null default 0 check (score between 0 and 1),
  nb_essais integer not null default 0,
  prochaine_revision date not null default current_date,
  maj_le timestamptz not null default now(),
  primary key (enfant_id, competence_id)
);

create table public.badges_enfant (
  enfant_id uuid not null references public.enfants (id) on delete cascade,
  badge_id text not null,
  obtenu_le timestamptz not null default now(),
  primary key (enfant_id, badge_id)
);

-- ─────────────────────────────────────────── Sessions

create function app.entete(nom text) returns text
language sql stable as $$
  select nullif(current_setting('request.headers', true), '')::json ->> nom
$$;

create function app.empreinte(jeton text) returns text
language sql immutable as $$
  select encode(extensions.digest(jeton, 'sha256'), 'hex')
$$;

create function app.enfant_courant() returns uuid
language sql stable security definer set search_path = public, extensions as $$
  select s.enfant_id from public.sessions_enfant s
  where s.jeton_hash = app.empreinte(app.entete('x-session-enfant'))
    and s.expire_le > now()
    and s.parent_id = auth.uid()
$$;

create function app.mode_parent() returns boolean
language sql stable security definer set search_path = public, extensions as $$
  select exists (
    select 1 from public.sessions_parent s
    where s.jeton_hash = app.empreinte(app.entete('x-session-parent'))
      and s.expire_le > now()
      and s.parent_id = auth.uid()
  )
$$;

create function app.limiter_tentatives(p_cible text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.tentatives_code
      where parent_id = auth.uid() and cible = p_cible and le > now() - interval '10 minutes') >= 5 then
    raise exception 'Trop d''essais. Réessaie dans quelques minutes.' using errcode = 'P0001';
  end if;
end $$;

create function app.nouveau_jeton() returns text
language sql volatile set search_path = public, extensions as $$
  select encode(extensions.gen_random_bytes(32), 'hex')
$$;

create function app.verifier_code(p_code text) returns void
language plpgsql immutable as $$
begin
  if p_code !~ '^[0-9]{4}$' then
    raise exception 'Le code doit compter 4 symboles.' using errcode = 'P0001';
  end if;
end $$;

-- Le parent définit son code parent : la première fois librement, ensuite en mode parent.
create function public.definir_code_parent(p_code text) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  if auth.uid() is null then raise exception 'Connexion requise.'; end if;
  perform app.verifier_code(p_code);
  insert into public.parents (id) values (auth.uid()) on conflict (id) do nothing;
  if (select code_parent_hash from public.parents where id = auth.uid()) is not null
     and not app.mode_parent() then
    raise exception 'Mode parent requis.' using errcode = '42501';
  end if;
  update public.parents set code_parent_hash = extensions.crypt(p_code, extensions.gen_salt('bf'))
  where id = auth.uid();
end $$;

create function public.ouvrir_mode_parent(p_code text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare
  v_hash text;
  v_jeton text;
begin
  if auth.uid() is null then raise exception 'Connexion requise.'; end if;
  perform app.limiter_tentatives('parent');
  select code_parent_hash into v_hash from public.parents where id = auth.uid();
  if v_hash is null or extensions.crypt(p_code, v_hash) <> v_hash then
    -- Pas d'exception ici : elle annulerait l'enregistrement de la tentative.
    insert into public.tentatives_code (parent_id, cible) values (auth.uid(), 'parent');
    return null;
  end if;
  v_jeton := app.nouveau_jeton();
  insert into public.sessions_parent (jeton_hash, parent_id, expire_le)
  values (app.empreinte(v_jeton), auth.uid(), now() + interval '30 minutes');
  return v_jeton;
end $$;

-- Écran « Qui travaille aujourd'hui ? » : prénoms et avatars seulement, aucune progression.
create function public.liste_profils()
returns table (id uuid, prenom text, avatar text, code_type text)
language sql stable security definer set search_path = public as $$
  select e.id, e.prenom, e.avatar, e.code_type from public.enfants e
  where e.parent_id = auth.uid() order by e.cree_le
$$;

create function public.creer_enfant(p_prenom text, p_avatar text, p_classe text, p_code text)
returns uuid
language plpgsql security definer set search_path = public, extensions as $$
declare
  v_id uuid;
begin
  if not app.mode_parent() then raise exception 'Mode parent requis.' using errcode = '42501'; end if;
  perform app.verifier_code(p_code);
  insert into public.enfants (parent_id, prenom, avatar, classe, code_hash, code_type)
  values (
    auth.uid(), p_prenom, p_avatar, p_classe,
    extensions.crypt(p_code, extensions.gen_salt('bf')),
    case when p_classe in ('cp','ce1','ce2','cm1','cm2') then 'pictos' else 'chiffres' end
  )
  returning id into v_id;
  return v_id;
end $$;

create function public.definir_code_enfant(p_enfant uuid, p_code text) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not app.mode_parent() then raise exception 'Mode parent requis.' using errcode = '42501'; end if;
  perform app.verifier_code(p_code);
  update public.enfants set code_hash = extensions.crypt(p_code, extensions.gen_salt('bf'))
  where id = p_enfant and parent_id = auth.uid();
  if not found then raise exception 'Profil introuvable.'; end if;
end $$;

create function public.ouvrir_session_enfant(p_enfant uuid, p_code text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare
  v_hash text;
  v_jeton text;
begin
  if auth.uid() is null then raise exception 'Connexion requise.'; end if;
  perform app.limiter_tentatives(p_enfant::text);
  select code_hash into v_hash from public.enfants where id = p_enfant and parent_id = auth.uid();
  if v_hash is null or extensions.crypt(p_code, v_hash) <> v_hash then
    insert into public.tentatives_code (parent_id, cible) values (auth.uid(), p_enfant::text);
    return null; -- code incorrect : le client affiche le message
  end if;
  v_jeton := app.nouveau_jeton();
  insert into public.sessions_enfant (jeton_hash, enfant_id, parent_id, expire_le)
  values (app.empreinte(v_jeton), p_enfant, auth.uid(), now() + interval '12 hours');
  return v_jeton;
end $$;

create function public.fermer_sessions() returns void
language sql security definer set search_path = public as $$
  delete from public.sessions_enfant where jeton_hash = app.empreinte(app.entete('x-session-enfant'));
  delete from public.sessions_parent where jeton_hash = app.empreinte(app.entete('x-session-parent'));
$$;

-- ─────────────────────────────────────────── Progression (calculée en base, jamais par le client)

create function app.apres_resultat() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  v_score real;
begin
  update public.enfants e set
    xp = e.xp + case when new.reussi then case when new.indice then 6 else 10 end else 2 end,
    serie = case
      when e.derniere_activite = current_date then e.serie
      when e.derniere_activite = current_date - 1 then e.serie + 1
      else 1 end,
    derniere_activite = current_date
  where e.id = new.enfant_id;

  insert into public.progression_competences as p (enfant_id, competence_id, score, nb_essais)
  values (new.enfant_id, new.competence_id, case when new.reussi then 0.3 else 0 end, 1)
  on conflict (enfant_id, competence_id) do update set
    score = least(1, p.score * 0.7 + case when new.reussi and not new.indice then 0.3
                                          when new.reussi then 0.2 else 0 end),
    nb_essais = p.nb_essais + 1,
    maj_le = now()
  returning score into v_score;

  update public.progression_competences set prochaine_revision = current_date +
    case when v_score >= 0.85 then 7 when v_score >= 0.6 then 3 else 1 end
  where enfant_id = new.enfant_id and competence_id = new.competence_id;
  return new;
end $$;

create trigger resultats_progression after insert on public.resultats
for each row execute function app.apres_resultat();

-- ─────────────────────────────────────────── Droits et RLS

alter table public.parents enable row level security;
alter table public.enfants enable row level security;
alter table public.sessions_enfant enable row level security;
alter table public.sessions_parent enable row level security;
alter table public.tentatives_code enable row level security;
alter table public.resultats enable row level security;
alter table public.progression_competences enable row level security;
alter table public.badges_enfant enable row level security;

revoke all on public.parents, public.enfants, public.sessions_enfant, public.sessions_parent,
  public.tentatives_code, public.resultats, public.progression_competences, public.badges_enfant
  from anon, authenticated;

-- Les empreintes de codes ne sont jamais lisibles par le client.
grant select (id, cree_le) on public.parents to authenticated;
grant select (id, parent_id, prenom, avatar, classe, code_type, xp, serie, derniere_activite, cree_le)
  on public.enfants to authenticated;
grant update (prenom, avatar, classe) on public.enfants to authenticated;
grant delete on public.enfants to authenticated;
grant select, insert on public.resultats to authenticated;
grant select on public.progression_competences, public.badges_enfant to authenticated;

create policy parents_soi on public.parents for select to authenticated using (id = auth.uid());

create policy enfants_lecture on public.enfants for select to authenticated
  using (parent_id = auth.uid() and (id = app.enfant_courant() or app.mode_parent()));
create policy enfants_modif on public.enfants for update to authenticated
  using (parent_id = auth.uid() and app.mode_parent()) with check (parent_id = auth.uid());
create policy enfants_suppr on public.enfants for delete to authenticated
  using (parent_id = auth.uid() and app.mode_parent());

create policy resultats_ajout on public.resultats for insert to authenticated
  with check (enfant_id = app.enfant_courant());
create policy resultats_lecture on public.resultats for select to authenticated
  using (enfant_id = app.enfant_courant()
         or (app.mode_parent() and enfant_id in (select id from public.enfants where parent_id = auth.uid())));

create policy progression_lecture on public.progression_competences for select to authenticated
  using (enfant_id = app.enfant_courant()
         or (app.mode_parent() and enfant_id in (select id from public.enfants where parent_id = auth.uid())));
create policy badges_lecture on public.badges_enfant for select to authenticated
  using (enfant_id = app.enfant_courant()
         or (app.mode_parent() and enfant_id in (select id from public.enfants where parent_id = auth.uid())));

revoke all on all functions in schema app from public, anon;
grant execute on function app.enfant_courant(), app.mode_parent(), app.entete(text), app.empreinte(text)
  to authenticated;
revoke execute on function public.definir_code_parent(text), public.ouvrir_mode_parent(text),
  public.liste_profils(), public.creer_enfant(text, text, text, text),
  public.definir_code_enfant(uuid, text), public.ouvrir_session_enfant(uuid, text),
  public.fermer_sessions() from public, anon;
grant execute on function public.definir_code_parent(text), public.ouvrir_mode_parent(text),
  public.liste_profils(), public.creer_enfant(text, text, text, text),
  public.definir_code_enfant(uuid, text), public.ouvrir_session_enfant(uuid, text),
  public.fermer_sessions() to authenticated;
