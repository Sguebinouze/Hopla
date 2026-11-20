# Licences et droits : inventaire avant les stores

État au 19 novembre 2026. Objectif : vendre Hopla sur l'App Store et Google Play. Chaque élément de l'appli est classé selon ce que sa licence permet pour une appli payante.

Bilan : rien n'interdit la vente. Deux vérifications restent à faire (section « À faire »).

## Ce que l'appli embarque

| Élément | Licence | Vente | Obligation |
|---|---|---|---|
| Code tiers de l'appli : React, React Router, client Supabase, Workbox, qrcode, idb-keyval, tslib et leurs dépendances | MIT, ISC, BSD-2-Clause, 0BSD | Oui | Mentions de copyright et de licence : page Crédits et `licences.txt` (`pnpm licences` après un changement de dépendance). |
| Lecture des photos de leçon : tesseract.js, tesseract.js-core, wasm-feature-detect | Apache-2.0 | Oui | Mentions de licence ; signaler toute modification de leur code (aucune). |
| Données de langue française de l'OCR (`@tesseract.js-data/fra`, fichier `fra.traineddata`) | MIT pour le paquet, Apache-2.0 pour les données Tesseract d'origine | Oui | Mentions de licence. |
| Polices Fredoka et Lexend (`@fontsource`) | SIL Open Font License 1.1 | Oui | Licence jointe ; interdit de vendre les polices seules (ce que Hopla ne fait pas). |
| Logo, Octave, avatars, icônes, illustrations | Créations du projet (SVG dessinés dans le dépôt) | Oui | Aucune. |
| Leçons, exercices, questions de culture, référentiel | Rédigés avec Claude et validés par Laurent ; les conditions d'Anthropic attribuent les contenus produits à l'utilisateur | Oui | Aucune. |
| Générateurs d'exercices | Code du projet | Oui | Aucune. |
| Références et extraits des programmes officiels (BO, Eduscol) | Informations publiques : réutilisation libre, commerciale comprise (code des relations entre le public et l'administration, articles L321-1 et suivants) | Oui | Citer la source et la date, ne pas dénaturer. Hopla affiche déjà « BO n°… du … » sous chaque notion. |
| Voix d'Octave : fichiers audio générés par Google Cloud Text-to-Speech (Chirp 3 HD, voix Algenib) | Conditions de Google Cloud | Oui, à confirmer | Pas d'attribution exigée d'après le forum Google Cloud. Relire les conditions Google Cloud propres au service avant la sortie. |

## Dictées

| Source | Licence | Vente | Obligation |
|---|---|---|---|
| Dictées Classetto, CE1 au CM2 (data.gouv.fr), 36 textes importés | CC BY 4.0 | Oui | Crédit affiché sous chaque dictée et sur la page Crédits. |
| Extraits d'auteurs du domaine public, recopiés depuis Wikisource : 17 passages, 6e à 3e (Daudet, Renard, Verne, Gautier, Maupassant, Zola, Hugo, Alain-Fournier) | Domaine public | Oui | Aucune. Ne pas reprendre les numérisations de Gallica : la BnF fait payer leur usage commercial. |
| Phrases de CP écrites pour l'appli : 10 | Hopla | Oui | Aucune. |
| Vikidia | CC BY-SA 3.0 | Oui, mais partage à l'identique | Écartée. |
| Manulex | Pas de licence claire | Non en l'état | Écartée. |

Chaque dictée porte sa licence et sa source ; `pnpm content:check` refuse une licence non compatible avec la vente.

## Services (contrats, pas licences)

| Service | Usage | Point d'attention |
|---|---|---|
| Supabase (région Paris, eu-west-3) | Comptes, progression | Données d'enfants limitées au prénom, à l'avatar et à la classe. |
| Cloudflare Workers et R2 | Hébergement de l'appli et des fichiers audio | Aucun. |
| Google Cloud | Génération des voix, hors appli | Facturation au-delà du quota gratuit. |

## À faire avant les stores

Fait : page Crédits (`/credits`), liée depuis l'accueil et l'espace parent.

1. **Conditions Google Cloud** : confirmer dans les conditions propres au service Text-to-Speech que les fichiers générés peuvent être diffusés dans une appli payante.
2. **Marque** : vérifier à l'INPI et à l'EUIPO que « Hopla » est disponible dans les classes logiciels et éducation (9, 41), puis la déposer. Des homonymes existent dans d'autres secteurs.

Hors licences, pour mémoire : une PWA n'entre pas telle quelle sur l'App Store. Il faudra l'emballer en appli native (Capacitor, par exemple) et respecter les règles de la catégorie Enfants : pas de publicité ni d'outil de mesure tiers, contrôle parental avant tout lien externe ou achat, politique de confidentialité (la page existe déjà).
