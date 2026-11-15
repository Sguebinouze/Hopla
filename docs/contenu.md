# Chaîne du contenu

Le contenu pédagogique vit dans `content/`, versionné et relu comme du code. Rien n'arrive dans l'app sans passer par `pnpm content:check`.

## Dossiers

| Dossier | Contenu |
| --- | --- |
| `content/sources/sources.json` | Textes officiels : URL, licence, date de consultation, empreinte SHA-256 |
| `content/sources/archive/` | Copies des textes officiels (`<id>.pdf`), base des empreintes |
| `content/programmes/programmes.json` | Programmes et calendrier d'application par classe et par année scolaire |
| `content/referentiel/<programme>/<classe>.json` | Compétences attendues, chacune rattachée à sa source |
| `content/exercices/<competence>.json` | Banque d'exercices rédigés |
| `packages/generateurs` | Exercices calculés par code, correction garantie |

## Statuts

- Programme : `verifie: false` tant que la référence (BO, dates d'application) n'a pas été contrôlée sur le texte officiel.
- Compétence : `a_verifier`, puis `verifie` une fois l'attendu comparé au texte source. Une compétence vérifiée doit citer la page et l'extrait.
- Exercice : `brouillon` → `relu` (avec `relu_par`) → `publie`. Les packs de production n'embarquent que les exercices publiés ; `pnpm content:packs --brouillons` les montre en développement.

## Contrôles bloquants (`pnpm content:check`)

- Schémas de tous les fichiers.
- Calendrier : un et un seul programme par classe, matière suivie et année (2026-2027 à 2028-2029).
- Références : programmes, sources, prérequis, compétences des exercices et des générateurs.
- Cohérence des identifiants (matière, cycle, classe).
- QCM : options uniques, réponse présente.
- Règles de rédaction du cycle (`docs/redaction.md`).

Les alertes (sources non archivées, programmes non vérifiés, compétences sans exercice) ne bloquent pas mais restent visibles : c'est la liste de travail.

## Veille sur les textes officiels

1. Télécharger le texte à la main (éduscol bloque les robots) dans `content/sources/archive/<id>.pdf`.
2. `pnpm content:hash --maj` enregistre l'empreinte.
3. En CI, `pnpm content:hash` échoue si un fichier archivé ne correspond plus à son empreinte.
4. À chaque rentrée : vérifier le calendrier officiel et les nouveaux BO, mettre à jour `programmes.json`.

## Ajouter une compétence

1. L'ajouter dans `content/referentiel/<programme>/<classe>.json` avec `statut: a_verifier`.
2. Écrire un générateur (`packages/generateurs`) ou des exercices (`content/exercices`).
3. `pnpm content:check` puis `pnpm test`.
4. Relire l'attendu sur le texte source, renseigner page et extrait, passer en `verifie`.
