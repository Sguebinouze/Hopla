# Hopla : conventions

- Français partout (code métier, contenus, messages, commits). Jamais de tiret cadratin.
- Contenu pédagogique : respecter `docs/redaction.md`. Tout nouveau texte passe `pnpm content:check`.
- Ne jamais inventer une référence officielle : une compétence reste `a_verifier` tant que page et extrait du texte source ne sont pas renseignés. Les programmes restent `verifie: false` tant que la référence n'a pas été contrôlée.
- Exercice généré par IA : `statut: brouillon`, `auteur: ia`. Seul un humain le passe en `relu` ou `publie`.
- Un générateur doit prouver la justesse de ses réponses dans ses tests et passer les règles de rédaction de son cycle.
- Données enfants : rien de plus que prénom, avatar et classe. Toute nouvelle table utilisateur a la RLS activée et un test d'isolation dans `supabase/tests`.
- Interface : tokens et classes `hp-*` de `@hopla/ds`, pas de valeurs de couleur en dur hors illustrations.
- Avant de livrer : `pnpm content:check && pnpm test && pnpm typecheck && pnpm build`.
