-- Relecture des cours complets : une décision par cours, identifié par sa notion (FR-C3-6E-GRAM-01).
alter table public.relectures drop constraint relectures_type_check;
alter table public.relectures add constraint relectures_type_check
  check (type in ('notion', 'lecon', 'question', 'dictee', 'media', 'cours'));
