-- Relecture des dictées : une décision par dictée, identifiée par l'identifiant du fichier (ce1-merle, 3e-germinal).
alter table public.relectures drop constraint relectures_type_check;
alter table public.relectures add constraint relectures_type_check
  check (type in ('notion', 'lecon', 'question', 'dictee'));

alter table public.relectures drop constraint relectures_element_id_check;
alter table public.relectures add constraint relectures_element_id_check check (
  (type <> 'dictee' and element_id ~ '^[A-Z]{2}-C[234]-[A-Z0-9]{2,3}-[A-Z]{2,6}-[0-9]{2}(-[0-9]{3})?$')
  or (type = 'dictee' and element_id ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(element_id) <= 60)
);
