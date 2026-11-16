-- Jeux de réflexion et quiz de culture générale : parties du jour par enfant et XP gagnés.
-- Aucune donnée personnelle nouvelle : un nom de jeu, des compteurs, une date.

create table public.jeux_jour (
  enfant_id uuid not null references public.enfants (id) on delete cascade,
  jour date not null default current_date,
  jeu text not null check (jeu in ('suites', 'sudoku', 'memoire', 'intrus', 'labyrinthe', 'sommes', 'mots-meles', 'culture')),
  parties smallint not null default 0 check (parties >= 0),
  reussies smallint not null default 0 check (reussies >= 0),
  xp smallint not null default 0 check (xp >= 0),
  primary key (enfant_id, jour, jeu)
);

alter table public.jeux_jour enable row level security;
revoke all on public.jeux_jour from public, anon, authenticated;
grant select on public.jeux_jour to authenticated, anon;

create policy jeux_lecture on public.jeux_jour for select to authenticated, anon
  using (enfant_id = app.enfant_courant() or app.enfant_de_ma_famille(enfant_id));

-- Fin d'une partie : 5 XP si réussie, 1 sinon, 30 XP par jour au plus pour l'ensemble des jeux.
-- Renvoie les XP effectivement gagnés.
create function public.terminer_jeu(p_jeu text, p_reussi boolean) returns integer
language plpgsql security definer set search_path = public as $$
declare
  v_enfant uuid := app.enfant_courant();
  v_deja integer;
  v_gain integer;
begin
  if v_enfant is null then raise exception 'Session enfant requise.' using errcode = '42501'; end if;
  if p_jeu is null or p_jeu not in ('suites', 'sudoku', 'memoire', 'intrus', 'labyrinthe', 'sommes', 'mots-meles', 'culture') then
    raise exception 'Jeu inconnu.' using errcode = '22023';
  end if;
  select coalesce(sum(xp), 0) into v_deja from public.jeux_jour where enfant_id = v_enfant and jour = current_date;
  v_gain := least(case when p_reussi then 5 else 1 end, greatest(0, 30 - v_deja));
  insert into public.jeux_jour as j (enfant_id, jour, jeu, parties, reussies, xp)
  values (v_enfant, current_date, p_jeu, 1, case when p_reussi then 1 else 0 end, v_gain)
  on conflict (enfant_id, jour, jeu) do update set
    parties = least(j.parties + 1, 32000),
    reussies = least(j.reussies + case when p_reussi then 1 else 0 end, 32000),
    xp = j.xp + v_gain;
  if v_gain > 0 then update public.enfants set xp = xp + v_gain where id = v_enfant; end if;
  return v_gain;
end $$;

revoke all on function public.terminer_jeu(text, boolean) from public;
grant execute on function public.terminer_jeu(text, boolean) to authenticated, anon;
