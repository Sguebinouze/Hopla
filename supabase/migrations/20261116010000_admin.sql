-- Espace d'administration : relecture des contenus.
-- Un admin est un compte parent inscrit dans public.admins, et seulement quand son mode parent est ouvert :
-- un enfant qui utilise l'appareil du parent n'y accède pas.
-- Aucune donnée d'enfant ici : des décisions sur des contenus pédagogiques.

create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  cree_le timestamptz not null default now()
);

create table public.relectures (
  type text not null check (type in ('notion', 'lecon', 'question')),
  element_id text not null check (element_id ~ '^[A-Z]{2}-C[234]-[A-Z0-9]{2,3}-[A-Z]{2,6}-[0-9]{2}(-[0-9]{3})?$'),
  decision text not null check (decision in ('ok', 'corriger')),
  commentaire text not null default '' check (char_length(commentaire) <= 2000),
  par uuid not null default auth.uid() references auth.users (id) on delete cascade,
  maj_le timestamptz not null default now(),
  primary key (type, element_id)
);

alter table public.admins enable row level security;
alter table public.relectures enable row level security;

create function app.admin() returns boolean
language sql stable security definer set search_path = public, extensions as $$
  select app.mode_parent() and exists (select 1 from public.admins a where a.user_id = auth.uid())
$$;

-- Pour l'interface : savoir s'il faut montrer l'espace admin.
create function public.est_admin() returns boolean
language sql stable security invoker set search_path = '' as $$
  select app.admin()
$$;

create policy admins_soi on public.admins for select to authenticated using (user_id = auth.uid());
create policy relectures_admin on public.relectures for all to authenticated
  using (app.admin()) with check (app.admin() and par = auth.uid());

revoke all on public.admins, public.relectures from public, anon, authenticated;
grant select on public.admins to authenticated;
grant select, insert, update, delete on public.relectures to authenticated;

revoke all on function app.admin() from public, anon;
grant execute on function app.admin() to authenticated;
revoke all on function public.est_admin() from public, anon;
grant execute on function public.est_admin() to authenticated;
