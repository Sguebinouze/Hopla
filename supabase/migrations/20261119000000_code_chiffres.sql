-- Code secret des enfants : 4 chiffres pour tous, du CP à la 3e (un code en images ne se retient pas mieux).
-- Les profils déjà créés avec un code en images le gardent jusqu'à ce qu'un parent définisse un nouveau code,
-- qui passe alors aux chiffres : aucun enfant ne se retrouve bloqué.

create or replace function public.creer_enfant(p_prenom text, p_avatar text, p_classe text, p_code text)
returns uuid
language plpgsql security definer set search_path = public, extensions as $$
declare
  v_id uuid;
begin
  if not app.mode_parent() then raise exception 'Mode parent requis.' using errcode = '42501'; end if;
  perform app.verifier_code(p_code);
  insert into public.enfants (parent_id, famille_id, prenom, avatar, classe, code_hash, code_type)
  values (auth.uid(), app.famille_assuree(), p_prenom, p_avatar, p_classe, extensions.crypt(p_code, extensions.gen_salt('bf')), 'chiffres')
  returning id into v_id;
  return v_id;
end $$;

create or replace function public.definir_code_enfant(p_enfant uuid, p_code text) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not app.enfant_de_ma_famille(p_enfant) then raise exception 'Mode parent requis.' using errcode = '42501'; end if;
  perform app.verifier_code(p_code);
  update public.enfants set code_hash = extensions.crypt(p_code, extensions.gen_salt('bf')), code_type = 'chiffres' where id = p_enfant;
end $$;
