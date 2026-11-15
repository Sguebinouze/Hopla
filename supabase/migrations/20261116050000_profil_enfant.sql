-- Lot 3 : profil de l'enfant.
-- L'enfant choisit lui-même son avatar et l'apparence d'Octave (couleur et accessoire).
-- Ce sont des choix d'affichage, pas des données personnelles : l'enfant reste décrit
-- par son prénom, son avatar et sa classe.

-- Avatar : « teinte » (ancien format) ou « personnage-teinte ».
alter table public.enfants
  add constraint enfants_avatar_format check (avatar ~ '^([a-z]{1,12}-)?[a-z]{1,12}$');

-- Octave : « couleur.accessoire » ; null : Octave d'origine.
alter table public.enfants
  add column octave text check (octave ~ '^[a-z]{1,12}\.[a-z]{1,12}$');

grant select (octave) on public.enfants to authenticated, anon;

-- Réglage par l'enfant en session (appareil familial ou appareil appairé), pour lui seul.
create function public.regler_mon_profil(p_avatar text, p_octave text) returns void
language plpgsql security definer set search_path = public as $$
declare
  v_enfant uuid := app.enfant_courant();
begin
  if v_enfant is null then raise exception 'Session enfant requise.' using errcode = '42501'; end if;
  update public.enfants set avatar = p_avatar, octave = p_octave where id = v_enfant;
end $$;

revoke all on function public.regler_mon_profil(text, text) from public, anon, authenticated;
grant execute on function public.regler_mon_profil(text, text) to anon, authenticated;
