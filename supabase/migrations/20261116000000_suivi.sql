-- Suivi fin : réponse donnée, erreur typique, révision espacée, erreurs fréquentes pour le parent.
-- Aucune nouvelle donnée personnelle : la réponse est une option du contenu ou un nombre saisi.

alter table public.resultats
  add column reponse text check (char_length(reponse) <= 60),
  add column erreur text check (erreur ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(erreur) <= 60);
create index resultats_erreur_idx on public.resultats (enfant_id, erreur) where erreur is not null;

-- Révision espacée : chaque jour distinct où la notion est maitrisée allonge l'intervalle.
alter table public.progression_competences
  add column reussites_espacees smallint not null default 0,
  add column derniere_reussite date;

create or replace function app.apres_resultat() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  v_score real;
  v_reussites smallint;
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

  update public.progression_competences p set
    reussites_espacees = case
      when v_score < 0.6 then 0
      when v_score >= 0.85 and (p.derniere_reussite is null or p.derniere_reussite < current_date)
        then least(p.reussites_espacees + 1, 10)
      else p.reussites_espacees end,
    derniere_reussite = case when v_score >= 0.85 then current_date else p.derniere_reussite end
  where p.enfant_id = new.enfant_id and p.competence_id = new.competence_id
  returning reussites_espacees into v_reussites;

  update public.progression_competences set prochaine_revision = current_date + app.intervalle(v_score, v_reussites)
  where enfant_id = new.enfant_id and competence_id = new.competence_id;
  return new;
end $$;

-- Intervalle en jours avant la prochaine révision (même règle dans apps/pwa/src/lib/progression.ts).
create function app.intervalle(p_score real, p_reussites smallint) returns integer
language sql immutable set search_path = '' as $$
  select case
    when p_score < 0.6 then 1
    when p_score < 0.85 then 2
    when p_reussites <= 1 then 3
    when p_reussites = 2 then 7
    when p_reussites = 3 then 14
    else 30 end
$$;

-- Erreurs typiques d'un enfant sur une période. Fonction « invoker » : la RLS de resultats s'applique.
create function public.erreurs_frequentes(p_enfant uuid, p_jours integer default 30)
returns table (competence_id text, erreur text, nb bigint, derniere timestamptz)
language sql stable security invoker set search_path = '' as $$
  select r.competence_id, r.erreur, count(*) as nb, max(r.le) as derniere
  from public.resultats r
  where r.enfant_id = p_enfant and r.erreur is not null
    and r.le >= now() - make_interval(days => least(greatest(p_jours, 1), 365))
  group by r.competence_id, r.erreur
  order by nb desc, derniere desc
  limit 20
$$;

revoke execute on function app.intervalle(real, smallint) from public, anon, authenticated;
revoke execute on function public.erreurs_frequentes(uuid, integer) from public, anon;
grant execute on function public.erreurs_frequentes(uuid, integer) to authenticated;
