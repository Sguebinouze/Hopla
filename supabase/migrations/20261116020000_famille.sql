-- Famille, co-parent, appareils de l'enfant, records de défis et contrôles.
--
-- Famille : un enfant appartient à une famille ; chaque parent membre a les mêmes droits
--   (toujours en mode parent pour voir ou modifier). Un second parent rejoint par code d'invitation.
-- Appareil de l'enfant : le parent génère un code d'appairage (8 caractères, 10 minutes, usage unique).
--   L'appareil reçoit un jeton propre, stocké en empreinte, qui ne donne accès qu'à ce profil
--   (en-tête x-appareil, rôle anon : aucun identifiant parent sur l'appareil). Le parent peut le retirer.
-- Données ajoutées : aucune donnée personnelle (nom d'appareil générique, scores, identifiants de notions).

-- ─────────────────────────────────────────── Tables

create table public.familles (
  id uuid primary key default gen_random_uuid(),
  cree_le timestamptz not null default now()
);

create table public.membres_famille (
  famille_id uuid not null references public.familles (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  rejoint_le timestamptz not null default now(),
  primary key (famille_id, user_id)
);
create unique index membres_famille_un_par_compte on public.membres_famille (user_id);

alter table public.enfants add column famille_id uuid references public.familles (id) on delete cascade;

-- Reprise de l'existant : une famille par compte parent déjà présent.
do $$
declare
  r record;
  v_famille uuid;
begin
  for r in select id from public.parents union select parent_id from public.enfants loop
    insert into public.familles default values returning id into v_famille;
    insert into public.membres_famille (famille_id, user_id) values (v_famille, r.id);
    update public.enfants set famille_id = v_famille where parent_id = r.id;
  end loop;
end $$;
alter table public.enfants alter column famille_id set not null;
create index enfants_famille_idx on public.enfants (famille_id);

create table public.invitations_famille (
  code_hash text primary key,
  famille_id uuid not null references public.familles (id) on delete cascade,
  expire_le timestamptz not null
);

create table public.appairages (
  code_hash text primary key,
  enfant_id uuid not null references public.enfants (id) on delete cascade,
  expire_le timestamptz not null
);

create table public.appareils (
  id uuid primary key default gen_random_uuid(),
  enfant_id uuid not null references public.enfants (id) on delete cascade,
  jeton_hash text not null unique,
  nom text not null check (char_length(nom) between 1 and 40),
  cree_le timestamptz not null default now(),
  vu_le timestamptz not null default now()
);
create index appareils_enfant_idx on public.appareils (enfant_id);

create table public.records_defis (
  enfant_id uuid not null references public.enfants (id) on delete cascade,
  defi_id text not null check (defi_id ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(defi_id) <= 60),
  record smallint not null check (record between 0 and 999),
  maj_le timestamptz not null default now(),
  primary key (enfant_id, defi_id)
);

create table public.controles (
  enfant_id uuid primary key references public.enfants (id) on delete cascade,
  date date not null,
  notions text[] not null check (
    cardinality(notions) between 1 and 60
    and array_to_string(notions, ',') ~ '^[A-Z]{2}-C[234]-[A-Z0-9]{2,3}-[A-Z]{2,6}-[0-9]{2}(,[A-Z]{2}-C[234]-[A-Z0-9]{2,3}-[A-Z]{2,6}-[0-9]{2})*$'),
  maj_le timestamptz not null default now()
);

-- ─────────────────────────────────────────── Fonctions d'accès

create function app.ma_famille() returns uuid
language sql stable security definer set search_path = public as $$
  select m.famille_id from public.membres_famille m where m.user_id = auth.uid()
$$;

-- Crée la famille du compte à la première utilisation.
create function app.famille_assuree() returns uuid
language plpgsql security definer set search_path = public as $$
declare
  v_famille uuid := app.ma_famille();
begin
  if auth.uid() is null then raise exception 'Connexion requise.'; end if;
  if v_famille is null then
    insert into public.familles default values returning id into v_famille;
    insert into public.membres_famille (famille_id, user_id) values (v_famille, auth.uid());
  end if;
  return v_famille;
end $$;

-- Enfant en cours : session ouverte par code sur l'appareil familial, ou appareil appairé.
create or replace function app.enfant_courant() returns uuid
language sql stable security definer set search_path = public, extensions as $$
  select coalesce(
    (select s.enfant_id from public.sessions_enfant s
      join public.enfants e on e.id = s.enfant_id
      where s.jeton_hash = app.empreinte(app.entete('x-session-enfant'))
        and s.expire_le > now()
        and s.parent_id = auth.uid()
        and e.famille_id = app.ma_famille()),
    (select a.enfant_id from public.appareils a
      where app.entete('x-appareil') is not null
        and a.jeton_hash = app.empreinte(app.entete('x-appareil')))
  )
$$;

-- Enfant visible par le parent en mode parent (même famille).
create function app.enfant_de_ma_famille(p_enfant uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select app.mode_parent() and exists (
    select 1 from public.enfants e where e.id = p_enfant and e.famille_id = app.ma_famille())
$$;

-- Code lisible : 8 caractères sans 0, O, 1, I, L.
create function app.nouveau_code() returns text
language sql volatile set search_path = public, extensions as $$
  select string_agg(substr('ABCDEFGHJKMNPQRSTUVWXYZ23456789', 1 + (get_byte(b, i) % 31), 1), '' order by i)
  from (select extensions.gen_random_bytes(8) as b) x, generate_series(0, 7) as i
$$;

create function app.empreinte_code(p_code text) returns text
language sql immutable set search_path = public, extensions as $$
  select app.empreinte(upper(regexp_replace(coalesce(p_code, ''), '[^A-Za-z0-9]', '', 'g')))
$$;

-- ─────────────────────────────────────────── Fonctions existantes, passées à la famille

create or replace function public.definir_code_parent(p_code text) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  if auth.uid() is null then raise exception 'Connexion requise.'; end if;
  perform app.verifier_code(p_code);
  insert into public.parents (id) values (auth.uid()) on conflict (id) do nothing;
  if (select code_parent_hash from public.parents where id = auth.uid()) is not null
     and not app.mode_parent() then
    raise exception 'Mode parent requis.' using errcode = '42501';
  end if;
  perform app.famille_assuree();
  update public.parents set code_parent_hash = extensions.crypt(p_code, extensions.gen_salt('bf'))
  where id = auth.uid();
end $$;

create or replace function public.liste_profils()
returns table (id uuid, prenom text, avatar text, code_type text)
language sql stable security definer set search_path = public as $$
  select e.id, e.prenom, e.avatar, e.code_type from public.enfants e
  where e.famille_id = app.ma_famille() order by e.cree_le
$$;

create or replace function public.creer_enfant(p_prenom text, p_avatar text, p_classe text, p_code text)
returns uuid
language plpgsql security definer set search_path = public, extensions as $$
declare
  v_id uuid;
begin
  if not app.mode_parent() then raise exception 'Mode parent requis.' using errcode = '42501'; end if;
  perform app.verifier_code(p_code);
  insert into public.enfants (parent_id, famille_id, prenom, avatar, classe, code_hash, code_type)
  values (
    auth.uid(), app.famille_assuree(), p_prenom, p_avatar, p_classe,
    extensions.crypt(p_code, extensions.gen_salt('bf')),
    case when p_classe in ('cp','ce1','ce2','cm1','cm2') then 'pictos' else 'chiffres' end
  )
  returning id into v_id;
  return v_id;
end $$;

create or replace function public.definir_code_enfant(p_enfant uuid, p_code text) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not app.enfant_de_ma_famille(p_enfant) then raise exception 'Mode parent requis.' using errcode = '42501'; end if;
  perform app.verifier_code(p_code);
  update public.enfants set code_hash = extensions.crypt(p_code, extensions.gen_salt('bf')) where id = p_enfant;
end $$;

create or replace function public.ouvrir_session_enfant(p_enfant uuid, p_code text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare
  v_hash text;
  v_jeton text;
begin
  if auth.uid() is null then raise exception 'Connexion requise.'; end if;
  perform app.limiter_tentatives(p_enfant::text);
  select code_hash into v_hash from public.enfants where id = p_enfant and famille_id = app.ma_famille();
  if v_hash is null or extensions.crypt(p_code, v_hash) <> v_hash then
    insert into public.tentatives_code (parent_id, cible) values (auth.uid(), p_enfant::text);
    return null;
  end if;
  v_jeton := app.nouveau_jeton();
  insert into public.sessions_enfant (jeton_hash, enfant_id, parent_id, expire_le)
  values (app.empreinte(v_jeton), p_enfant, auth.uid(), now() + interval '12 hours');
  return v_jeton;
end $$;

-- ─────────────────────────────────────────── Co-parent

create function public.inviter_parent() returns text
language plpgsql security definer set search_path = public, extensions as $$
declare
  v_code text := app.nouveau_code();
begin
  if not app.mode_parent() then raise exception 'Mode parent requis.' using errcode = '42501'; end if;
  insert into public.invitations_famille (code_hash, famille_id, expire_le)
  values (app.empreinte_code(v_code), app.famille_assuree(), now() + interval '7 days');
  return v_code;
end $$;

-- Rejoindre la famille d'un autre parent. Refusé si le compte a déjà des enfants dans sa propre famille.
create function public.rejoindre_famille(p_code text) returns void
language plpgsql security definer set search_path = public, extensions as $$
declare
  v_cible uuid;
  v_actuelle uuid := app.ma_famille();
begin
  if auth.uid() is null then raise exception 'Connexion requise.'; end if;
  perform app.limiter_tentatives('invitation');
  delete from public.invitations_famille where code_hash = app.empreinte_code(p_code) and expire_le > now()
  returning famille_id into v_cible;
  if v_cible is null then
    insert into public.tentatives_code (parent_id, cible) values (auth.uid(), 'invitation');
    raise exception 'Code d''invitation inconnu ou expiré.' using errcode = 'P0001';
  end if;
  if v_actuelle = v_cible then return; end if;
  if v_actuelle is not null then
    if exists (select 1 from public.enfants where famille_id = v_actuelle) then
      raise exception 'Ce compte a déjà des profils enfants dans sa propre famille.' using errcode = 'P0001';
    end if;
    delete from public.membres_famille where user_id = auth.uid();
    delete from public.familles f where f.id = v_actuelle
      and not exists (select 1 from public.membres_famille m where m.famille_id = f.id);
  end if;
  insert into public.membres_famille (famille_id, user_id) values (v_cible, auth.uid());
end $$;

-- Membres de la famille (mode parent) : adresse de connexion pour les reconnaitre, rien d'autre.
create function public.membres_de_ma_famille()
returns table (user_id uuid, email text, rejoint_le timestamptz, moi boolean)
language sql stable security definer set search_path = public, auth as $$
  select m.user_id, u.email::text, m.rejoint_le, m.user_id = auth.uid()
  from public.membres_famille m join auth.users u on u.id = m.user_id
  where app.mode_parent() and m.famille_id = app.ma_famille()
  order by m.rejoint_le
$$;

-- ─────────────────────────────────────────── Appareils de l'enfant

create function public.creer_appairage(p_enfant uuid) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare
  v_code text := app.nouveau_code();
begin
  if not app.enfant_de_ma_famille(p_enfant) then raise exception 'Mode parent requis.' using errcode = '42501'; end if;
  delete from public.appairages where expire_le < now();
  insert into public.appairages (code_hash, enfant_id, expire_le)
  values (app.empreinte_code(v_code), p_enfant, now() + interval '10 minutes');
  return v_code;
end $$;

-- Appelé par l'appareil de l'enfant, sans compte. Code à usage unique.
create function public.lier_appareil(p_code text, p_nom text)
returns table (jeton text, enfant_id uuid, prenom text, avatar text, classe text)
language plpgsql security definer set search_path = public, extensions as $$
declare
  v_enfant uuid;
  v_jeton text := app.nouveau_jeton();
begin
  delete from public.appairages a where a.code_hash = app.empreinte_code(p_code) and a.expire_le > now()
  returning a.enfant_id into v_enfant;
  if v_enfant is null then raise exception 'Code inconnu ou expiré.' using errcode = 'P0001'; end if;
  insert into public.appareils (enfant_id, jeton_hash, nom)
  values (v_enfant, app.empreinte(v_jeton), left(coalesce(nullif(trim(p_nom), ''), 'Appareil'), 40));
  return query select v_jeton, e.id, e.prenom, e.avatar, e.classe from public.enfants e where e.id = v_enfant;
end $$;

-- Au démarrage sur l'appareil de l'enfant : profil associé (et date de dernière utilisation).
create function public.mon_appareil()
returns table (enfant_id uuid, prenom text, avatar text, classe text, xp integer, serie integer)
language plpgsql volatile security definer set search_path = public, extensions as $$
begin
  update public.appareils set vu_le = now()
  where app.entete('x-appareil') is not null and jeton_hash = app.empreinte(app.entete('x-appareil'));
  return query select e.id, e.prenom, e.avatar, e.classe, e.xp, e.serie
  from public.appareils a join public.enfants e on e.id = a.enfant_id
  where app.entete('x-appareil') is not null and a.jeton_hash = app.empreinte(app.entete('x-appareil'));
end $$;

-- ─────────────────────────────────────────── Défis

create function public.noter_defi(p_defi text, p_score integer) returns boolean
language plpgsql security definer set search_path = public as $$
declare
  v_enfant uuid := app.enfant_courant();
  v_avant smallint;
begin
  if v_enfant is null then raise exception 'Session enfant requise.' using errcode = '42501'; end if;
  select record into v_avant from public.records_defis where enfant_id = v_enfant and defi_id = p_defi;
  if v_avant is not null and v_avant >= p_score then return false; end if;
  insert into public.records_defis (enfant_id, defi_id, record) values (v_enfant, p_defi, p_score)
  on conflict (enfant_id, defi_id) do update set record = excluded.record, maj_le = now();
  return true;
end $$;

-- ─────────────────────────────────────────── Droits et RLS

alter table public.familles enable row level security;
alter table public.membres_famille enable row level security;
alter table public.invitations_famille enable row level security;
alter table public.appairages enable row level security;
alter table public.appareils enable row level security;
alter table public.records_defis enable row level security;
alter table public.controles enable row level security;

revoke all on public.familles, public.membres_famille, public.invitations_famille, public.appairages,
  public.appareils, public.records_defis, public.controles from public, anon, authenticated;

-- L'appareil de l'enfant parle avec le rôle anon : mêmes droits que la session enfant, rien de plus.
grant usage on schema app to anon;
grant select (id, parent_id, prenom, avatar, classe, code_type, xp, serie, derniere_activite, cree_le, famille_id)
  on public.enfants to authenticated, anon;
grant select, insert on public.resultats to anon;
grant select on public.progression_competences, public.badges_enfant to anon;
grant select (id, enfant_id, nom, cree_le, vu_le), delete on public.appareils to authenticated;
grant select on public.records_defis to authenticated, anon;
grant select, insert, update, delete on public.controles to authenticated, anon;

drop policy enfants_lecture on public.enfants;
drop policy enfants_modif on public.enfants;
drop policy enfants_suppr on public.enfants;
drop policy resultats_ajout on public.resultats;
drop policy resultats_lecture on public.resultats;
drop policy progression_lecture on public.progression_competences;
drop policy badges_lecture on public.badges_enfant;

create policy enfants_lecture on public.enfants for select to authenticated, anon
  using (id = app.enfant_courant() or app.enfant_de_ma_famille(id));
create policy enfants_modif on public.enfants for update to authenticated
  using (app.enfant_de_ma_famille(id)) with check (famille_id = app.ma_famille());
create policy enfants_suppr on public.enfants for delete to authenticated
  using (app.enfant_de_ma_famille(id));

create policy resultats_ajout on public.resultats for insert to authenticated, anon
  with check (enfant_id = app.enfant_courant());
create policy resultats_lecture on public.resultats for select to authenticated, anon
  using (enfant_id = app.enfant_courant() or app.enfant_de_ma_famille(enfant_id));
create policy progression_lecture on public.progression_competences for select to authenticated, anon
  using (enfant_id = app.enfant_courant() or app.enfant_de_ma_famille(enfant_id));
create policy badges_lecture on public.badges_enfant for select to authenticated, anon
  using (enfant_id = app.enfant_courant() or app.enfant_de_ma_famille(enfant_id));

create policy appareils_parent on public.appareils for select to authenticated using (app.enfant_de_ma_famille(enfant_id));
create policy appareils_retrait on public.appareils for delete to authenticated using (app.enfant_de_ma_famille(enfant_id));

create policy records_lecture on public.records_defis for select to authenticated, anon
  using (enfant_id = app.enfant_courant() or app.enfant_de_ma_famille(enfant_id));

create policy controles_tout on public.controles for all to authenticated, anon
  using (enfant_id = app.enfant_courant() or app.enfant_de_ma_famille(enfant_id))
  with check (enfant_id = app.enfant_courant() or app.enfant_de_ma_famille(enfant_id));

-- Fonctions : celles du schéma app restent internes ; les fonctions publiques sont listées une à une.
revoke all on function app.ma_famille(), app.famille_assuree(), app.enfant_de_ma_famille(uuid),
  app.nouveau_code(), app.empreinte_code(text) from public;
grant execute on function app.ma_famille(), app.enfant_de_ma_famille(uuid), app.enfant_courant(),
  app.mode_parent(), app.entete(text), app.empreinte(text) to authenticated, anon;

revoke all on function public.inviter_parent(), public.rejoindre_famille(text), public.membres_de_ma_famille(),
  public.creer_appairage(uuid), public.lier_appareil(text, text), public.mon_appareil(),
  public.noter_defi(text, integer) from public;
grant execute on function public.inviter_parent(), public.rejoindre_famille(text), public.membres_de_ma_famille(),
  public.creer_appairage(uuid), public.noter_defi(text, integer) to authenticated;
grant execute on function public.lier_appareil(text, text), public.mon_appareil(), public.noter_defi(text, integer)
  to anon, authenticated;
-- erreurs_frequentes lit resultats avec la RLS de l'appelant : l'appareil de l'enfant peut l'appeler aussi.
grant execute on function public.erreurs_frequentes(uuid, integer) to anon;
