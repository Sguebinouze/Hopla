-- Lot 4 : bilan de la semaine.
-- Le même calcul sert à l'espace parent (« Cette semaine ») et au bilan du dimanche par e-mail,
-- envoyé seulement aux parents qui l'ont demandé.

alter table public.membres_famille add column bilan_hebdo boolean not null default false;

-- Bilan des 7 derniers jours (heure de Paris), par enfant de la famille.
create function app.bilan_famille(p_famille uuid) returns jsonb
language sql stable security definer set search_path = public as $$
  with bornes as (
    select (now() at time zone 'Europe/Paris')::date as fin,
           (now() at time zone 'Europe/Paris')::date - 6 as debut
  ),
  semaine as (
    select r.enfant_id, r.competence_id, r.reussi, r.duree_ms, r.erreur,
           (r.le at time zone 'Europe/Paris')::date as jour
    from public.resultats r join public.enfants e on e.id = r.enfant_id
    where e.famille_id = p_famille and r.le >= now() - interval '8 days'
  ),
  s as (select * from semaine where jour >= (select debut from bornes))
  select coalesce(jsonb_agg(jsonb_build_object(
    'enfant_id', e.id,
    'prenom', e.prenom,
    'classe', e.classe,
    'serie', e.serie,
    'jours_actifs', (select count(distinct jour) from s where s.enfant_id = e.id),
    'questions', (select count(*) from s where s.enfant_id = e.id),
    'reussies', (select count(*) from s where s.enfant_id = e.id and s.reussi),
    'minutes', (select coalesce(round(sum(s.duree_ms) / 60000.0), 0)::int from s where s.enfant_id = e.id),
    'notions', (select count(distinct competence_id) from s where s.enfant_id = e.id),
    'maitrisees', (select count(*) from public.progression_competences p
                   where p.enfant_id = e.id and p.score >= 0.85
                     and p.competence_id in (select competence_id from s where s.enfant_id = e.id)),
    'a_revoir', (select count(*) from public.progression_competences p
                 where p.enfant_id = e.id and p.nb_essais > 0 and p.prochaine_revision <= (select fin from bornes)),
    'erreurs', (select coalesce(jsonb_agg(to_jsonb(x)), '[]'::jsonb) from (
                  select competence_id, erreur, count(*)::int as nb from s
                  where s.enfant_id = e.id and s.erreur is not null
                  group by 1, 2 order by 3 desc, 1, 2 limit 3) x),
    'controle', (select jsonb_build_object('date', c.date, 'notions', cardinality(c.notions))
                 from public.controles c where c.enfant_id = e.id and c.date >= (select fin from bornes))
  ) order by e.cree_le), '[]'::jsonb)
  from public.enfants e
  where e.famille_id = p_famille
$$;

-- Espace parent : bilan de sa famille, mode parent ouvert.
create function public.bilan_semaine() returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if not app.mode_parent() then raise exception 'Mode parent requis.' using errcode = '42501'; end if;
  return app.bilan_famille(app.ma_famille());
end $$;

-- Préférence du parent connecté : recevoir le bilan le dimanche par e-mail.
create function public.bilan_hebdo_actif() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select bilan_hebdo from public.membres_famille where user_id = auth.uid()), false)
$$;

create function public.regler_bilan_hebdo(p_actif boolean) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not app.mode_parent() then raise exception 'Mode parent requis.' using errcode = '42501'; end if;
  perform app.famille_assuree();
  update public.membres_famille set bilan_hebdo = p_actif where user_id = auth.uid();
end $$;

-- Envoi du dimanche (fonction bilan-hebdo, clé de service seulement) : adresse et bilan de chaque parent inscrit.
create function public.bilans_a_envoyer()
returns table (email text, bilan jsonb)
language sql stable security definer set search_path = public as $$
  select u.email::text, app.bilan_famille(m.famille_id)
  from public.membres_famille m join auth.users u on u.id = m.user_id
  where m.bilan_hebdo and u.email is not null
$$;

revoke all on function app.bilan_famille(uuid) from public, anon, authenticated;
revoke all on function public.bilan_semaine(), public.bilan_hebdo_actif(), public.regler_bilan_hebdo(boolean),
  public.bilans_a_envoyer() from public, anon, authenticated;
grant execute on function public.bilan_semaine(), public.bilan_hebdo_actif(), public.regler_bilan_hebdo(boolean) to authenticated;
grant execute on function public.bilans_a_envoyer() to service_role;
