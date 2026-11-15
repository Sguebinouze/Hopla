-- Supabase accorde par défaut l'exécution des nouvelles fonctions du schéma public au rôle anon.
-- Les fonctions réservées aux parents connectés n'ont rien à faire côté appareil de l'enfant.
revoke execute on function public.inviter_parent(), public.rejoindre_famille(text),
  public.membres_de_ma_famille(), public.creer_appairage(uuid) from anon;
