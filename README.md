# Hopla

PWA de révisions du CP à la 3e, sur smartphone et tablette, alignée sur les programmes officiels de l'Éducation nationale. Chaque enfant a sa propre session protégée par un code secret ; Octave, le compagnon, l'accompagne.

## Principe

Le contenu pédagogique vit dans Git ; les données des enfants vivent dans Supabase.

- Le référentiel (programmes, compétences, sources) et les exercices sont versionnés, relus et contrôlés en CI.
- Supabase ne stocke que les comptes parents, les profils enfants et la progression, avec une isolation stricte par session.
- La PWA est servie par Cloudflare Pages ; les packs de contenu par classe sont mis en cache pour le hors connexion.

## Structure

```
apps/pwa                 PWA React + Vite (Cloudflare Pages)
packages/ds              Tokens et composants du design system Hopla
packages/redaction       Contrôle automatique des règles de rédaction
packages/generateurs     Exercices calculés par code (correction garantie)
packages/content         Schémas, contrôle d'intégrité et construction des packs
content/                 Sources officielles, programmes, référentiel, banque d'exercices
supabase/migrations      Schéma, sessions enfant et parent, RLS
supabase/tests           Tests d'isolation sur Postgres en mémoire (PGlite)
docs/                    Règles de rédaction, chaîne du contenu
```

## Démarrer

```bash
pnpm install
pnpm dev            # mode démo sans backend : profils locaux, code 1111 (4 fois la lune en primaire)
pnpm content:check  # intégrité du contenu
pnpm test           # tous les tests
pnpm build          # tokens, packs (exercices publiés) puis PWA
```

## Supabase

1. Créer un projet en région UE.
2. Appliquer `supabase/migrations` (`supabase link` puis `supabase db push`, ou l'éditeur SQL).
3. Auth : activer la connexion par lien e-mail ; URL du site = `http://localhost:5180` en développement, puis l'URL Cloudflare Pages.
4. Copier `apps/pwa/.env.example` en `.env.local` et renseigner l'URL et la clé anon.

Isolation des sessions : le JWT du parent seul ne donne que la liste des prénoms. Le code secret d'un enfant ouvre une session limitée à ses données ; le code parent ouvre le mode parent. Les résultats sont insérés par la session enfant, la progression (XP, série, score par compétence) est calculée en base. Voir `supabase/tests/isolation.test.ts`.

## Cloudflare Pages

- Projet relié au dépôt GitHub, branche `main`.
- Commande de build : `pnpm build` ; dossier de sortie : `apps/pwa/dist`.
- Variables : `NODE_VERSION=22`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
- `apps/pwa/public/_redirects` gère le routage côté client.

## Règles

- Rédaction pédagogique : `docs/redaction.md`.
- Chaîne du contenu et statuts de relecture : `docs/contenu.md`.
- Design system Hopla : tokens dans `packages/ds/tokens.json`, à ne jamais contourner par des valeurs en dur.
