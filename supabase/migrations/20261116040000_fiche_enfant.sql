-- Fiche enfant (lot 2) : réglages par enfant, leçons consultées, historique des séances,
-- suppression du compte parent sans emporter les enfants d'une famille partagée.
-- Aucune donnée personnelle ajoutée : réglages, identifiants de notions, dates et compteurs.

-- ─────────────────────────────────────────── Réglages par enfant

alter table public.enfants
  add column matieres_masquees text[] not null default '{}' check (
    cardinality(matieres_masquees) <= 20
    and array_to_string(matieres_masquees, ',') ~ '^([a-z-]+(,[a-z-]+)*)?$'),
  add column minutes_par_jour smallint check (minutes_par_jour between 5 and 240);

grant select (matieres_masquees, minutes_par_jour) on public.enfants to authenticated, anon;
grant update (matieres_masquees, minutes_par_jour) on public.enfants to authenticated;

-- ─────────────────────────────────────────── Le parent qui a créé un profil peut partir

alter table public.enfants alter column parent_id drop not null;
alter table public.enfants drop constraint enfants_parent_id_fkey;
alter table public.enfants add constraint enfants_parent_id_fkey
  foreign key (parent_id) references auth.users (id) on delete set null;

-- Une famille sans aucun parent est supprimée, avec ses profils enfants.
create function app.apres_depart_membre() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  delete from public.familles f where f.id = old.famille_id
    and not exists (select 1 from public.membres_famille m where m.famille_id = f.id);
  return null;
end $$;
create trigger membres_depart after delete on public.membres_famille
for each row execute function app.apres_depart_membre();

-- ─────────────────────────────────────────── Leçons consultées

create table public.lecons_vues (
  enfant_id uuid not null references public.enfants (id) on delete cascade,
  competence_id text not null check (competence_id ~ '^[A-Z]{2}-C[234]-[A-Z0-9]{2,3}-[A-Z]{2,6}-[0-9]{2}$'),
  vues smallint not null default 1 check (vues between 1 and 9999),
  derniere_vue timestamptz not null default now(),
  primary key (enfant_id, competence_id)
);
alter table public.lecons_vues enable row level security;
revoke all on public.lecons_vues from public, anon, authenticated;
grant select on public.lecons_vues to authenticated, anon;
create policy lecons_vues_lecture on public.lecons_vues for select to authenticated, anon
  using (enfant_id = app.enfant_courant() or app.enfant_de_ma_famille(enfant_id));

create function public.noter_lecon(p_competence text) returns void
language plpgsql security definer set search_path = public as $$
declare
  v_enfant uuid := app.enfant_courant();
begin
  if v_enfant is null then raise exception 'Session enfant requise.' using errcode = '42501'; end if;
  insert into public.lecons_vues (enfant_id, competence_id) values (v_enfant, p_competence)
  on conflict (enfant_id, competence_id) do update
    set vues = least(public.lecons_vues.vues + 1, 9999), derniere_vue = now();
end $$;

-- ─────────────────────────────────────────── Historique des séances

-- Par jour (heure de Paris) et par notion. Fonction « invoker » : la RLS de resultats s'applique.
create function public.historique(p_enfant uuid, p_jours integer default 30)
returns table (jour date, competence_id text, questions bigint, reussies bigint, duree_ms bigint)
language sql stable security invoker set search_path = '' as $$
  select (r.le at time zone 'Europe/Paris')::date as jour, r.competence_id,
         count(*), count(*) filter (where r.reussi), coalesce(sum(r.duree_ms), 0)::bigint
  from public.resultats r
  where r.enfant_id = p_enfant
    and r.le >= now() - make_interval(days => least(greatest(p_jours, 1), 365))
  group by 1, 2
  order by 1 desc, 2
$$;

-- ─────────────────────────────────────────── Mode parent et suppression du compte

create function public.mode_parent_actif() returns boolean
language sql stable security invoker set search_path = '' as $$
  select app.mode_parent()
$$;

-- Supprime le compte du parent connecté (mode parent requis). Ses enfants restent si un autre
-- parent est membre de la famille ; sinon la famille et ses profils sont supprimés.
create function public.supprimer_mon_compte() returns void
language plpgsql security definer set search_path = public, auth as $$
begin
  if not app.mode_parent() then raise exception 'Mode parent requis.' using errcode = '42501'; end if;
  delete from auth.users where id = auth.uid();
end $$;

revoke all on function app.apres_depart_membre() from public, anon, authenticated;
revoke all on function public.noter_lecon(text), public.historique(uuid, integer), public.mode_parent_actif(),
  public.supprimer_mon_compte() from public, anon;
grant execute on function public.noter_lecon(text), public.historique(uuid, integer) to anon, authenticated;
grant execute on function public.mode_parent_actif(), public.supprimer_mon_compte() to authenticated;
