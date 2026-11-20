-- Code parent oublié, contrôle parental, appareils, passage de classe et conservation des données (20 novembre 2026).

-- ─────────────────────────────────────────── Code parent oublié

-- Connexion par e-mail de moins de 10 minutes : prouve l'accès à la boîte du parent.
create function app.connexion_recente() returns boolean
language sql stable security definer set search_path = public, auth as $$
  select coalesce((select u.last_sign_in_at > now() - interval '10 minutes' from auth.users u where u.id = auth.uid()), false)
$$;

-- Le code parent se redéfinit en mode parent, ou juste après une connexion par e-mail (code oublié).
create or replace function public.definir_code_parent(p_code text) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  if auth.uid() is null then raise exception 'Connexion requise.'; end if;
  perform app.verifier_code(p_code);
  insert into public.parents (id) values (auth.uid()) on conflict (id) do nothing;
  if (select code_parent_hash from public.parents where id = auth.uid()) is not null
     and not app.mode_parent() and not app.connexion_recente() then
    raise exception 'Mode parent requis.' using errcode = '42501';
  end if;
  perform app.famille_assuree();
  update public.parents set code_parent_hash = extensions.crypt(p_code, extensions.gen_salt('bf'))
  where id = auth.uid();
end $$;

-- ─────────────────────────────────────────── Contrôle parental

-- Avant un lien vers l'extérieur ou un e-mail, depuis un écran que l'enfant peut voir : le code parent
-- d'un parent de la famille. Fonctionne sur l'appareil familial (compte parent connecté) comme sur
-- l'appareil appairé de l'enfant (jeton d'appareil). Code faux : false, l'essai est compté (5 par 10 minutes).
create function public.controle_parental(p_code text) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
declare
  v_famille uuid;
  v_parent uuid;
begin
  if auth.uid() is not null then
    v_famille := app.ma_famille();
  else
    select e.famille_id into v_famille
    from public.appareils a join public.enfants e on e.id = a.enfant_id
    where app.entete('x-appareil') is not null and a.jeton_hash = app.empreinte(app.entete('x-appareil'));
  end if;
  if v_famille is null then raise exception 'Aucune famille.' using errcode = '42501'; end if;
  select m.user_id into v_parent from public.membres_famille m where m.famille_id = v_famille order by m.rejoint_le limit 1;
  if (select count(*) from public.tentatives_code
      where parent_id = v_parent and cible = 'controle-parental' and le > now() - interval '10 minutes') >= 5 then
    raise exception 'Trop d''essais. Réessaie dans quelques minutes.' using errcode = 'P0001';
  end if;
  if exists (
    select 1 from public.membres_famille m join public.parents p on p.id = m.user_id
    where m.famille_id = v_famille and p.code_parent_hash is not null
      and p.code_parent_hash = extensions.crypt(p_code, p.code_parent_hash)
  ) then
    return true;
  end if;
  insert into public.tentatives_code (parent_id, cible) values (v_parent, 'controle-parental');
  return false;
end $$;

-- ─────────────────────────────────────────── Appareils : 5 au plus par enfant, nom modifiable

create or replace function public.lier_appareil(p_code text, p_nom text)
returns table (jeton text, enfant_id uuid, prenom text, avatar text, classe text)
language plpgsql security definer set search_path = public, extensions as $$
declare
  v_enfant uuid;
  v_jeton text := app.nouveau_jeton();
begin
  select a.enfant_id into v_enfant from public.appairages a
  where a.code_hash = app.empreinte_code(p_code) and a.expire_le > now();
  if v_enfant is null then raise exception 'Code inconnu ou expiré.' using errcode = 'P0001'; end if;
  if (select count(*) from public.appareils x where x.enfant_id = v_enfant) >= 5 then
    raise exception 'Cet enfant a déjà 5 appareils. Retire-en un dans l''espace parent.' using errcode = 'P0001';
  end if;
  delete from public.appairages a where a.code_hash = app.empreinte_code(p_code);
  insert into public.appareils (enfant_id, jeton_hash, nom)
  values (v_enfant, app.empreinte(v_jeton), left(coalesce(nullif(trim(p_nom), ''), 'Appareil'), 40));
  return query select v_jeton, e.id, e.prenom, e.avatar, e.classe from public.enfants e where e.id = v_enfant;
end $$;

create function public.renommer_appareil(p_appareil uuid, p_nom text) returns void
language plpgsql security definer set search_path = public as $$
declare
  v_enfant uuid := (select enfant_id from public.appareils where id = p_appareil);
begin
  if v_enfant is null or not app.enfant_de_ma_famille(v_enfant) then raise exception 'Mode parent requis.' using errcode = '42501'; end if;
  if char_length(trim(coalesce(p_nom, ''))) not between 1 and 40 then raise exception 'Nom de 1 à 40 caractères.' using errcode = 'P0001'; end if;
  update public.appareils set nom = trim(p_nom) where id = p_appareil;
end $$;

-- ─────────────────────────────────────────── Passage de classe

-- Année scolaire d'une date : la rentrée est fixée au 1er septembre.
create function app.annee_scolaire(p_jour date default current_date) returns text
language sql immutable set search_path = '' as $$
  select case when extract(month from p_jour) >= 9
    then extract(year from p_jour)::int || '-' || (extract(year from p_jour)::int + 1)
    else (extract(year from p_jour)::int - 1) || '-' || extract(year from p_jour)::int end
$$;

-- Année scolaire pour laquelle la classe a été donnée ou confirmée par un parent.
alter table public.enfants add column classe_annee text not null default app.annee_scolaire()
  check (classe_annee ~ '^[0-9]{4}-[0-9]{4}$');

create function app.classe_datee() returns trigger
language plpgsql set search_path = public as $$
begin
  if tg_op = 'INSERT' or new.classe is distinct from old.classe then
    new.classe_annee := app.annee_scolaire();
  end if;
  return new;
end $$;
create trigger enfants_classe_datee before insert or update of classe on public.enfants
for each row execute function app.classe_datee();
grant select (classe_annee) on public.enfants to authenticated, anon;

-- À la rentrée, le parent confirme la classe : la suivante, la même (redoublement) ou une autre.
create function public.confirmer_classe(p_enfant uuid, p_classe text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not app.enfant_de_ma_famille(p_enfant) then raise exception 'Mode parent requis.' using errcode = '42501'; end if;
  update public.enfants set classe = p_classe, classe_annee = app.annee_scolaire() where id = p_enfant;
end $$;

-- ─────────────────────────────────────────── Conservation des données

-- Lancé chaque nuit. Durées (politique de confidentialité) :
-- détail des réponses, leçons vues, parties de jeux : 1 an ; appareil inutilisé : 6 mois ;
-- famille sans aucune activité depuis 1 an : comptes parents supprimés, et avec eux la famille et les profils.
create function public.appliquer_conservation() returns jsonb
language plpgsql security definer set search_path = public, auth as $$
declare
  v_resultats integer;
  v_appareils integer;
  v_comptes integer;
begin
  delete from public.resultats where le < now() - interval '1 year';
  get diagnostics v_resultats = row_count;
  delete from public.lecons_vues where derniere_vue < now() - interval '1 year';
  delete from public.jeux_jour where jour < current_date - 365;
  delete from public.controles where date < current_date - 365;
  delete from public.appareils where vu_le < now() - interval '6 months';
  get diagnostics v_appareils = row_count;
  delete from public.appairages where expire_le < now();
  delete from public.invitations_famille where expire_le < now();
  delete from public.sessions_enfant where expire_le < now();
  delete from public.sessions_parent where expire_le < now();
  delete from public.tentatives_code where le < now() - interval '1 day';

  with activite as (
    select f.id as famille, greatest(
      f.cree_le,
      (select max(u.last_sign_in_at) from public.membres_famille m join auth.users u on u.id = m.user_id where m.famille_id = f.id),
      (select max(a.vu_le) from public.appareils a join public.enfants e on e.id = a.enfant_id where e.famille_id = f.id),
      (select max(r.le) from public.resultats r join public.enfants e on e.id = r.enfant_id where e.famille_id = f.id),
      (select max(e.derniere_activite)::timestamptz from public.enfants e where e.famille_id = f.id)
    ) as derniere
    from public.familles f
  ), supprimes as (
    delete from auth.users u
    using public.membres_famille m, activite a
    where m.user_id = u.id and m.famille_id = a.famille and a.derniere < now() - interval '1 year'
    returning u.id
  )
  select count(*) into v_comptes from supprimes;

  return jsonb_build_object('resultats', v_resultats, 'appareils', v_appareils, 'comptes', v_comptes);
end $$;

revoke all on function app.connexion_recente(), app.classe_datee(), public.appliquer_conservation() from public, anon, authenticated;
revoke all on function public.controle_parental(text), public.renommer_appareil(uuid, text),
  public.confirmer_classe(uuid, text) from public;
grant execute on function app.annee_scolaire(date) to anon, authenticated;
grant execute on function public.controle_parental(text) to anon, authenticated;
grant execute on function public.renommer_appareil(uuid, text), public.confirmer_classe(uuid, text) to authenticated;

-- Tâche de nuit (3 h 15 UTC), là où pg_cron existe (Supabase ; pas dans la base de test).
do $$
begin
  if exists (select 1 from pg_available_extensions where name = 'pg_cron') then
    create extension if not exists pg_cron;
    perform cron.schedule('conservation', '15 3 * * *', 'select public.appliquer_conservation()');
  end if;
end $$;
