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
- Fait le 15 novembre 2026 : codes d'erreur (107 générateurs, 169 codes, dictionnaire `ERREURS` exporté par `@hopla/generateurs`, test `erreurs.test.ts`), compétence CE2 « tables d'addition » (MA-C2-CE2-CALC-05, générateur `tables-addition-ce2`, défi de fluence), leçons de toutes les notions de français et de maths du CP à la 3e.
1. **Programme 2020 de 4e et de 3e**, encore en vigueur selon le calendrier : il faut d'abord archiver les « Repères annuels de progression » du cycle 4 (`eduscol-reperes-attendus`), car le BO n°31 de 2020 ne répartit pas les notions par année. Identifiants prévus : numéros 51 à 99.
2. **Codes d'erreur restants** : 92 générateurs QCM sans code (classements, comparaisons, nombres en lettres…), à qualifier quand un piège correspond à une erreur connue. Outils : `choix`, `erreursDe`, `confusionTemps`, `erreurLongueurDecimale` (`outils.ts`, `erreurs.ts`).

Session cloud (app et autres matières) :
- Fait : littérature de 6e (5 entrées du programme, `FR-C3-6E-LITT-01` à `05`), avec 45 questions rédigées et 5 leçons, en brouillon. `FR-C3-2025/6e.json` revient à la session VS Code.
- Fait : anglais CE1 (5 compétences en écoute, champ `ecoute` des exercices, lu en anglais par la PWA) et 6e (11 compétences, programme BO n°22 de 2025 appliqué en 6e depuis la rentrée 2025 d'après l'académie de Bordeaux, à confirmer sur l'arrêté). 133 questions et 16 leçons en brouillon.
- Fait : espace admin `/admin` (PWA), réservé aux comptes de `public.admins`, mode parent ouvert. Rubrique Relecture : notions, leçons et questions rédigées en brouillon (fichier `packs/relecture.json`, produit par `pnpm content:packs`), validation par notion, export des décisions. Report dans le dépôt : `pnpm content:relecture --decisions <export.json> --par Laurent` (ou `--simulation`). La décision « ok » publie la question ou la leçon et passe la notion en `verifie` ; « corriger » est listé avec le commentaire.
1. Autres matières des autres classes : reprises par la session VS Code (voir « Autres matières » ci-dessous).
2. Appliquer les décisions de relecture dès que Laurent en a pris (export depuis /admin, ou lecture de la table `relectures`).

## Autres matières (session VS Code depuis le 15 novembre 2026)

Zone : `content/referentiel` hors FR et MA, `content/exercices`, `content/lecons` de ces matières. Pour chaque classe : compétences avec page et extrait (vérifiés par `pnpm content:extraits`), 8 questions et une leçon par notion, en brouillon, `auteur: ia`. Le programme suivi est celui que `content/programmes/programmes.json` applique en 2026-2027.
- CP (fait) : le CP suit déjà les programmes 2026 d’histoire-géographie (`HG-C2-2026`, BO n°22 de 2026) et de sciences et technologie (`ST-C2-2026`, BO n°24 de 2026), qui remplacent questionner le monde ; EMC `EM-C2-2024`. 18 notions, 144 questions, 18 leçons.
- CE2 (fait) : questionner le monde `QM-C2-2020` (encore en vigueur au CE2 en 2026-2027 ; notions choisies parmi celles que le texte réserve au CE2 ou que le CE1 n’a pas : état gazeux, cycle de vie, besoins des plantes, croissance, conducteurs, ordinateur, astres, milieux, grandes périodes, organisation de la commune) et EMC `EM-C2-2024`. 14 notions, 112 questions, 14 leçons.
- Le test des packs (`packages/content/src/verifier.test.ts`) ne compte plus un nombre fixe de brouillons au CE2 : il compare au total des questions rédigées.
- CM1 (fait) : histoire-géographie `HG-C3-2026` et sciences et technologie `ST-C3-2026`, appliqués au CM1 depuis la rentrée 2026, et EMC `EM-C3-2024`. 24 notions (8 + 11 + 5), 192 questions, 24 leçons.
- CM2 (fait) : histoire-géographie `HG-C3-2020` et sciences et technologie `ST-C3-2023` (colonne « cours moyen » du programme, encore en vigueur au CM2 en 2026-2027), EMC `EM-C3-2024`. 20 notions (6 + 10 + 4), 160 questions, 20 leçons.
- 5e (fait) : histoire-géographie `HG-C4-2020`, physique-chimie `PC-C4-2020`, SVT `SV-C4-2020`, technologie `TE-C4-2024`, EMC `EM-C4-2024` (thème « Égalité, fraternité et solidarité »). 22 notions (6 + 5 + 3 + 5 + 3), 176 questions, 22 leçons. Les programmes 2020 de SVT et de physique-chimie ne répartissent pas les notions par année : la classe est justifiée par les « repères de progressivité » cités en extrait (« dès la classe de 5e », « dès le début du cycle »). À confirmer à la relecture.
- 4e (fait) : histoire-géographie `HG-C4-2020`, physique-chimie `PC-C4-2020`, SVT `SV-C4-2020`, technologie `TE-C4-2024` (colonne 4e des repères de progressivité), EMC `EM-C4-2024` (thème « Défendre les droits et les libertés »). 28 notions (10 + 5 + 3 + 6 + 4), 224 questions, 28 leçons. Même prudence qu’en 5e pour la SVT et la physique-chimie ; la reproduction humaine et la géologie sont placées en 4e par usage, l’extrait cité ne fixe pas l’année.
- 3e (fait) : histoire-géographie `HG-C4-2020`, physique-chimie `PC-C4-2020`, SVT `SV-C4-2020`, technologie `TE-C4-2024`, EMC `EM-C4-2024` (thème « Faire vivre la démocratie »). 36 notions (17 + 5 + 4 + 6 + 4), 288 questions, 36 leçons. En SVT, génétique et évolution sont placées en 3e par usage (l’extrait décrit une progression sur le cycle) ; digestion et immunité s’appuient sur les phrases qui les réservent à la 3e.
- Anglais CP (fait) : `LV-C2-2026` (BO n° 12 de 2026). 9 notions, 72 questions dont 65 avec écoute (`ecoute`, en-GB), 9 leçons. Le constructeur accepte désormais un 7e champ facultatif pour le texte à écouter.
- Anglais CE2 (fait) : `LV-C2-2020`, notions réservées au CE2 par les repères de progressivité (présenter quelqu’un, questions, date, politesse et excuses, épeler) et thèmes du cycle non traités en CE1 (famille et maison, météo, fêtes). 9 notions, 72 questions dont 61 avec écoute, 9 leçons.
- Anglais CM1 (fait) : `LV-C3-2026` (BO n° 12 de 2026, objectifs du CM1). 9 notions, 72 questions dont 58 avec écoute, 9 leçons.
- À suivre : anglais CM2 (`LV-C3-2020`), 5e (`LV-C4-2025`) ; pas de programme de langue vivante en vigueur listé pour la 4e et la 3e en 2026-2027.

## Travail à deux sessions

Deux sessions Claude peuvent travailler en même temps (VS Code sur le Mac, session cloud). Pour ne pas se marcher dessus :
- `git pull --rebase` avant de commencer, commit et `git push` dès qu'un lot est terminé et vérifié ;
- une session par zone. Français et maths (`packages/generateurs`, `content/referentiel/FR-*` et `MA-*`, `content/lecons/FR-*` et `MA-*`) d'un côté ; app (`apps/pwa`, `supabase`), autres matières (`content/referentiel` hors FR et MA, `content/exercices`) et calendrier (`content/programmes`, `content/sources`) de l'autre ;
- un fichier partagé (`index.ts`, `generateurs.test.ts`, `docs/reprise.md`) : modifier peu et pousser vite.

## Avant de livrer

`pnpm content:check && pnpm content:extraits && pnpm test && pnpm typecheck && pnpm build`, puis commit et push sur `main`.
