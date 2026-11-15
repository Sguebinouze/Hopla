# Reprise du projet : état et prochaines étapes

À lire en début de session, après `CLAUDE.md`, `docs/contenu.md` et `docs/redaction.md`.

## État au 15 novembre 2026

- PWA (React, Vite) dans `apps/pwa`, serveur de dev sur le port 5180 (`pnpm dev`). Supabase : projet `aqtldxubfiollxkermmj` (organisation CBT_Team), clés dans `apps/pwa/.env.local`.
- Sessions enfants isolées par RLS, testées dans `supabase/tests` (PGlite).
- Textes officiels archivés dans `content/sources/archive` avec empreinte SHA-256 :
  - `bo41-2024-francais-c2.pdf`, `bo41-2024-maths-c2.pdf` : cycle 2 (CP, CE1, CE2), BO n°41 du 31 octobre 2024 ;
  - `bo16-2025-francais-c3.pdf`, `bo16-2025-maths-c3.pdf` : cycle 3 (CM1, CM2, 6e), BO n°16 du 17 avril 2025.
- Référentiel fait, du CP à la 6e en français et en maths : 181 compétences (CP 30, CE1 20, CE2 34, CM1 35, CM2 39, 6e 23), plus 1 en 5e. Chaque compétence cite page et extrait ; `pnpm content:extraits` le vérifie dans le PDF (`pdftotext`, paquet poppler : `brew install poppler`).
- Toutes les compétences sont `a_verifier` : seul Laurent les passe en `verifie` après relecture.
- 184 générateurs dans `packages/generateurs/src`, un fichier par classe et domaine (`cp-*.ts`, `ce1-*.ts`, `ce2-*.ts`, `cm1-*.ts`, `cm2-*.ts`, `sixieme-*.ts`). Chaque classe récente a son point d'entrée (`cp.ts`, `ce2.ts`, `cm1.ts`, `cm2.ts`) et ses tests de justesse (`cp.test.ts`…), avec les outils d'oracle communs de `oracles.ts`. Les règles communes à tous les générateurs restent dans `generateurs.test.ts`.
- Leçons : `content/lecons/<COMPETENCE>.json` (exemple, règle, piège, essai), 76 en brouillon pour toutes les notions CE1 et 6e ; page `/lecon/:competence` dans la PWA. Voix d'Octave : `pourLaVoix` (`packages/redaction/src/oral.ts`) puis synthèse vocale du navigateur.
- Suivi : chaque résultat enregistre l'option choisie et son code d'erreur (`Item.erreurs`), la révision espacée est calculée en base (`app.intervalle`) et dans `apps/pwa/src/lib/progression.ts`. L'espace parent affiche les erreurs fréquentes : les codes ajoutés aux générateurs y apparaissent tels quels, mis en forme par `libelleErreur`.
- La PWA a ses propres tests (vitest) : après un pull, `pnpm install`.
- Points de périmètre à trancher par Laurent en relisant : CM2 sans « ne… plus » (seuls « pas » et « jamais » sont exercés aux temps composés) ; CM1, masses avec dag, dg, cg ; CE2, conversions dL ↔ cL absentes ; CP, sons désignés par leur graphie (« an » couvre an, en, am, em).

## Règles apprises en route

- Les sites officiels (éduscol, education.gouv.fr) bloquent les téléchargements automatiques. Demander à Laurent de déposer le PDF dans `content/sources/archive/<id>.pdf`, puis `pnpm content:hash --maj`.
- Relire le texte officiel avant d'écrire un générateur : le périmètre exact compte (au CE1, pluriel en -s seulement ; les pluriels en -x sont au CE2).
- QCM : utiliser `optionsNumeriques` dès que les options sont des nombres ou des fractions, pour ne jamais proposer deux bonnes réponses (1/2 et 2/4).
- Cycle 2 : 12 mots au plus par phrase, consigne comprise. Le test bloque sinon.
- Un oracle de test ne réutilise pas la logique du générateur : il recalcule la réponse à partir de la consigne.
- Une compétence a un `titre` court (40 caractères au plus), affiché à l'élève.
- Relire des items réels, pas seulement les tests : sortir 4 graines × 3 difficultés par générateur et mesurer le nombre de consignes distinctes sur 400 graines. Les défauts trouvés ainsi : difficulté sans effet, listes de 10 à 20 phrases, « 1 parts », énoncés invraisemblables.
- Pas de combinatoire libre pour les phrases de grammaire : elle produit « Le chat mange sa pâtée hier. » ou « ne… jamais … hier ». Phrases rédigées en entier, ou éléments qui déclarent leurs compatibilités.
- Orthographe rectifiée de 1990 dans tout texte généré (coute, maitresse, boite), comme le programme ; les extraits officiels restent tels quels.
- Élision devant un prénom à voyelle (« qu’Elsa ») et accord après 1 (« 1 millier ») : les tests de classe le vérifient.
- Réponse saisie en mots : `normaliserReponse` met en minuscules et uniformise l'apostrophe ; la réponse attendue doit donc être en minuscules.

## Prochaines étapes, par ordre

Session VS Code (français et maths) :
1. **Codes d'erreur** : renseigner `erreurs` (option piège → code kebab-case) dans les générateurs QCM où le piège correspond à une erreur connue (fractions, décimaux, accords, homophones…), et un dictionnaire `ERREURS` (code → libellé court pour le parent, 60 caractères au plus) exporté par `@hopla/generateurs`. L'espace parent l'affichera à la place du libellé automatique.
2. **Compétence CE2 manquante** : « tables d'addition dans les deux sens » (BO n°41, p. 22, objectif 15 égalités en une minute), pour le défi de fluence CE2.
3. **Leçons de français et de maths** : 262 notions sans leçon (CP à 3e). Format et exemples dans `content/lecons/` (36 notions CE1 et 6e déjà faites), règles de rédaction du cycle vérifiées par `pnpm content:check`. Statut `brouillon`, auteur `ia`.

Session cloud (app et autres matières) :
1. Littérature de 6e (4 entrées du programme) : la session cloud ajoute ces compétences dans `content/referentiel/FR-C3-2025/6e.json`, la session VS Code n'y touche pas en attendant.
2. Anglais (CE1 puis 6e), puis autres matières des autres classes.
3. Leçons des matières autres que français et maths ; page de relecture enrichie des leçons.

## Travail à deux sessions

Deux sessions Claude peuvent travailler en même temps (VS Code sur le Mac, session cloud). Pour ne pas se marcher dessus :
- `git pull --rebase` avant de commencer, commit et `git push` dès qu'un lot est terminé et vérifié ;
- une session par zone. Français et maths (`packages/generateurs`, `content/referentiel/FR-*` et `MA-*`, `content/lecons/FR-*` et `MA-*`) d'un côté ; app (`apps/pwa`, `supabase`), autres matières (`content/referentiel` hors FR et MA, `content/exercices`) et calendrier (`content/programmes`, `content/sources`) de l'autre ;
- un fichier partagé (`index.ts`, `generateurs.test.ts`, `docs/reprise.md`) : modifier peu et pousser vite.

## Avant de livrer

`pnpm content:check && pnpm content:extraits && pnpm test && pnpm typecheck && pnpm build`, puis commit et push sur `main`.
