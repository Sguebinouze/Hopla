-- Lot 5 : défi de la semaine en famille et cahier de vacances.

-- ─────────────────────────────────────────── Défi de la semaine en famille
-- Un objectif commun à tous les enfants de la famille, du lundi au dimanche (heure de Paris).
-- La sorte de défi tourne chaque semaine ; l'objectif dépend du nombre d'enfants.
-- Un enfant voit le total de la famille et sa propre part, jamais le détail de ses frères et sœurs.
create function public.defi_famille() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  v_enfant uuid := app.enfant_courant();
  v_famille uuid;
  v_debut date := date_trunc('week', now() at time zone 'Europe/Paris')::date;
  v_sorte text;
  v_par_enfant int;
  v_n int;
  v_total int;
  v_part int;
begin
  if v_enfant is not null then
    select famille_id into v_famille from public.enfants where id = v_enfant;
  elsif app.mode_parent() then
    v_famille := app.ma_famille();
  else
    raise exception 'Session requise.' using errcode = '42501';
  end if;
  select count(*) into v_n from public.enfants where famille_id = v_famille;
  if v_famille is null or v_n = 0 then return null; end if;

  v_sorte := (array['bonnes_reponses', 'jours_actifs', 'notions'])[1 + (extract(week from v_debut)::int % 3)];
  v_par_enfant := case v_sorte when 'bonnes_reponses' then 60 when 'jours_actifs' then 4 else 6 end;

  with s as (
    select r.enfant_id, r.competence_id, r.reussi, (r.le at time zone 'Europe/Paris')::date as jour
    from public.resultats r join public.enfants e on e.id = r.enfant_id
    where e.famille_id = v_famille and r.le >= (v_debut::timestamp at time zone 'Europe/Paris')
  )
  select
    case v_sorte
      when 'bonnes_reponses' then count(*) filter (where reussi)
      when 'jours_actifs' then count(distinct (enfant_id, jour))
      else count(distinct (enfant_id, competence_id)) end,
    case v_sorte
      when 'bonnes_reponses' then count(*) filter (where reussi and enfant_id = v_enfant)
      when 'jours_actifs' then count(distinct jour) filter (where enfant_id = v_enfant)
      else count(distinct competence_id) filter (where enfant_id = v_enfant) end
  into v_total, v_part
  from s;

  return jsonb_build_object(
    'sorte', v_sorte, 'debut', v_debut, 'fin', v_debut + 6, 'enfants', v_n,
    'objectif', v_n * v_par_enfant, 'total', v_total,
    'ma_part', case when v_enfant is null then null else v_part end);
end $$;

revoke all on function public.defi_famille() from public, anon, authenticated;
grant execute on function public.defi_famille() to anon, authenticated;

-- ─────────────────────────────────────────── Cahier de vacances
-- Un cahier à la fois par enfant : date de début et nombre de jours.
-- Le plan (notions de chaque jour) se déduit du programme de la classe ; les jours faits, des résultats.
create table public.cahiers_vacances (
  enfant_id uuid primary key references public.enfants (id) on delete cascade,
  debut date not null,
  jours smallint not null check (jours between 5 and 60),
  cree_le timestamptz not null default now()
);

alter table public.cahiers_vacances enable row level security;
revoke all on public.cahiers_vacances from public, anon, authenticated;
grant select, insert, update, delete on public.cahiers_vacances to authenticated, anon;

create policy cahiers_tout on public.cahiers_vacances for all to authenticated, anon
  using (enfant_id = app.enfant_courant() or app.enfant_de_ma_famille(enfant_id))
  with check (enfant_id = app.enfant_courant() or app.enfant_de_ma_famille(enfant_id));
