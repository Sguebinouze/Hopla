# Reprise du projet : état et prochaines étapes

À lire en début de session, après `CLAUDE.md`, `docs/contenu.md` et `docs/redaction.md`.

## État au 15 novembre 2026

- PWA (React, Vite) dans `apps/pwa`, serveur de dev sur le port 5180 (`pnpm dev`). Supabase : projet `aqtldxubfiollxkermmj` (organisation CBT_Team), clés dans `apps/pwa/.env.local`.
- Sessions enfants isolées par RLS, testées dans `supabase/tests` (PGlite).
- Textes officiels archivés dans `content/sources/archive` avec empreinte SHA-256 :
  - `bo41-2024-francais-c2.pdf`, `bo41-2024-maths-c2.pdf` : cycle 2 (CP, CE1, CE2), BO n°41 du 31 octobre 2024 ;
  - `bo16-2025-francais-c3.pdf`, `bo16-2025-maths-c3.pdf` : cycle 3 (CM1, CM2, 6e), BO n°16 du 17 avril 2025.
- Référentiel fait : CE1 et 6e en français et en maths (43 compétences), plus 3 compétences de CE2 et 1 de 5e. Chaque compétence cite page et extrait ; `pnpm content:extraits` le vérifie dans le PDF.
- Toutes les compétences sont `a_verifier` : seul Laurent les passe en `verifie` après relecture.
- 44 générateurs dans `packages/generateurs/src` (un fichier par classe et domaine : `ce1-*.ts`, `sixieme-*.ts`). Chaque générateur a un test de justesse indépendant dans `generateurs.test.ts`.

## Règles apprises en route

- Les sites officiels (éduscol, education.gouv.fr) bloquent les téléchargements automatiques. Demander à Laurent de déposer le PDF dans `content/sources/archive/<id>.pdf`, puis `pnpm content:hash --maj`.
- Relire le texte officiel avant d'écrire un générateur : le périmètre exact compte (au CE1, pluriel en -s seulement ; les pluriels en -x sont au CE2).
- QCM : utiliser `optionsNumeriques` dès que les options sont des nombres ou des fractions, pour ne jamais proposer deux bonnes réponses (1/2 et 2/4).
- Cycle 2 : 12 mots au plus par phrase, consigne comprise. Le test bloque sinon.
- Un oracle de test ne réutilise pas la logique du générateur : il recalcule la réponse à partir de la consigne.
- Une compétence a un `titre` court (40 caractères au plus), affiché à l'élève.

## Prochaines étapes, par ordre

1. **CP, CE2, CM1, CM2 en français et en maths** : les textes sont déjà archivés (mêmes PDF que CE1 et 6e). Pour chaque classe : référentiel avec page et extrait, générateurs, tests, `pnpm content:extraits`.
2. **Compléter CE1 et 6e** : CE1 grandeurs (longueurs, masses, monnaie, heures), géométrie, lecture et vocabulaire ; 6e géométrie, volumes, statistiques et probabilités.
3. **Cycle 4 (5e, 4e, 3e)** : demander à Laurent les PDF du programme 2026 (arrêté du 18 février 2026, BO n°10 du 5 mars 2026) et du programme 2020 encore en vigueur en 4e et 3e. Le calendrier de bascule est dans `content/programmes/programmes.json`.
4. **App** : progression réelle par matière et par notion (les barres sont à 0 %), tableau de bord parent, badges, synchronisation hors connexion.
5. **Autres matières** : questionner le monde, sciences, histoire-géographie, langues, EMC.

## Avant de livrer

`pnpm content:check && pnpm content:extraits && pnpm test && pnpm typecheck && pnpm build`, puis commit et push sur `main`.
