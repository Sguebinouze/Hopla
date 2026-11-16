# Architecture des comptes, des accès et des espaces

Référence pour les deux sessions. Principe directeur : **le moins de données possible**. Enfant : prénom (ou pseudo), avatar, classe. L'apparence d'Octave choisie par l'enfant (`enfants.octave`, couleur et accessoire) est un réglage d'affichage, pas une donnée personnelle. Parent : adresse de connexion. Jamais de nom, d'adresse, de téléphone, de date de naissance ni de photo d'enfant.

## Acteurs et accès

| Acteur | S'identifie avec | Voit et fait |
|---|---|---|
| Parent | Compte Supabase (lien magique ; Apple et Google en option), puis **code parent** pour le mode parent (30 min, par onglet) | Mode parent : profils, progression, erreurs, appareils, invitations, contrôles de toute sa famille |
| Second parent | Son propre compte, puis code d'invitation (8 caractères, 7 jours, usage unique) | Les mêmes droits que le premier parent |
| Enfant, appareil familial | Choix du profil puis code en pictogrammes ou chiffres (session de 12 h) | Son seul profil |
| Enfant, appareil à lui | Appairage : code ou QR généré par le parent (10 min, usage unique). L'appareil garde un jeton propre, sans compte parent | Son seul profil, tant que le parent ne retire pas l'appareil |
| Admin | Compte inscrit dans `admins`, mode parent ouvert | `/admin` : relecture des contenus |

Tous les contrôles d'accès sont en base (RLS et fonctions), testés dans `supabase/tests/isolation.test.ts`. Les jetons (sessions, appareils, codes) ne sont stockés qu'en empreinte SHA-256 ; les codes secrets en bcrypt.

## Données

- `familles`, `membres_famille` (un compte, une famille) ; `enfants.famille_id`.
- `sessions_enfant`, `sessions_parent`, `tentatives_code` (5 essais par 10 minutes).
- `appairages` (codes en attente), `appareils` (jeton, nom générique, dates).
- `resultats` (réponse choisie et code d'erreur, jamais de texte libre), `progression_competences` (révision espacée), `badges_enfant`.
- `records_defis`, `controles` (un contrôle prévu par enfant).
- `cahiers_vacances` (un cahier par enfant : début, nombre de pages). Le défi de la semaine se calcule à partir des résultats (`public.defi_famille`), sans table.
- `admins`, `relectures`.
- `membres_famille.bilan_hebdo` : le parent a demandé le bilan du dimanche par e-mail. `public.bilans_a_envoyer()` (adresse et bilan) n'est exécutable qu'avec la clé de service.
- Le contenu pédagogique n'est pas en base : il vit dans Git et part dans des packs statiques par classe.

## Espaces

**Ouverture et démarrage** : `/` présente Hopla et ouvre deux portes, « Je suis parent » (`/connexion` : e-mail puis code à 8 chiffres reçu par e-mail, saisi dans l'app ; le lien de l'e-mail marche aussi hors app installée) et « Je suis un enfant, j'ai un code » (`/appairer`). Un parent connecté sans enfant arrive dans l'assistant `/demarrer` : code parent, enfants (prénom, classe, avatar, code choisi sur le clavier en pictogrammes ou chiffres), appareil de chaque enfant (partagé, ou le sien avec son code d'appairage), installation selon l'appareil, puis récapitulatif. L'espace parent y renvoie pour ajouter un enfant ou un appareil (`/demarrer?etape=enfants`).

**Parent** (`/parent`) : famille et invitations, résumé par enfant, création de profils, export de toutes les données (JSON), suppression du compte (les enfants restent si un autre parent est membre). Fiche enfant (`/parent/enfant/:id`) : progression par matière et par notion, séances des 60 derniers jours, leçons consultées, erreurs fréquentes, défis, contrôle (le parent le prévoit, le modifie ou l'annule), réglages et appareils. « Cette semaine » : bilan des 7 derniers jours par enfant (`public.bilan_semaine`), le même que l'e-mail du dimanche.

**Enfant** (`/accueil` et suivantes) : mission du jour (contrôle prévu, puis révisions dues, puis rotation), matières et notions, leçons, exercices, défis chrono, contrôle. Profil (`/profil`) : avatar (7 personnages, 8 teintes), Octave (6 couleurs, 6 accessoires, débloqués par niveau), collection de trophées calculés à partir de la progression (rien de plus n'est enregistré).

**Défi de la semaine en famille** : un objectif commun du lundi au dimanche (bonnes réponses, jours de travail ou notions travaillées, à tour de rôle), proportionnel au nombre d'enfants. L'enfant voit le total et sa part, jamais le détail de ses frères et sœurs.

**Cahier de vacances** (`/cahier`) : toute l'année de la classe en révision, une page par jour (une notion de français, une de maths, une d'une autre matière), 10, 30 ou 40 pages. Une page est faite quand chaque notion a eu sa série ; le plan se déduit du programme et l'avancement des résultats (`apps/pwa/src/lib/cahier.ts`).

**Photo de leçon** (`/photo`) : l'enfant photographie sa leçon ; le texte est lu sur l'appareil (Tesseract, fichiers servis par l'app dans `/ocr`, copiés par `scripts/copier-ocr.mjs`) et rapproché des notions de sa classe ; il confirme la notion et s'entraine. La photo et son texte ne quittent jamais l'appareil (IndexedDB, 30 photos au plus par enfant), rien n'est enregistré en base.

**Hors connexion** (`apps/pwa/src/lib/horsLigne.ts`) : l'app et les packs sont mis en cache par le service worker ; l'enfant en session garde une copie de son profil, de sa progression, de ses records et de son contrôle ; ses réponses, leçons vues et records attendent dans une file, envoyée dans l'ordre au retour du réseau. Limite : ouvrir une session sur un appareil familial demande le réseau (l'appareil appairé de l'enfant, lui, fonctionne sans). Les réponses envoyées plus tard sont datées du moment de l'envoi.

**Jeux et culture générale** (`/jeux`, `/jeux/:jeu`, `/culture`) : ouverts une fois la mission du jour faite (trois séries complètes dans la journée). Sept jeux générés sur l'appareil, adaptés au cycle (`apps/pwa/src/jeux`, solutions vérifiées par les tests) : suites logiques, mini-sudoku, mémoire, intrus, labyrinthe, sommes croisées, mots mêlés. Quiz de culture générale : 5 questions par jour tirées de `content/culture/cycle-N.json`, hors programme et affiché comme tel. Chaque partie rapporte 5 XP (1 si ratée), 30 XP par jour au plus (`terminer_jeu`, table `jeux_jour`). Le parent coupe l'un ou l'autre dans la fiche de l'enfant (« jeux », « culture » dans les matières masquées).

**Deuxième langue** (5e à 3e) : allemand et espagnol sont deux matières (`allemand`, `espagnol`, préfixes AL et ES). À la création d'un profil de collégien, le parent choisit la LV2 ; l'autre langue est ajoutée aux matières masquées (réglable ensuite dans la fiche de l'enfant). Programmes : BO n°22 du 29 mai 2025 pour la 5e dès 2026-2027 (AL-C4-2025, ES-C4-2025), programme du cycle 4 de 2020 pour la 4e et la 3e tant qu'il s'applique (AL-C4-2020, ES-C4-2020). Questions d'écoute en `de-DE` et `es-ES`.

**Admin** (`/admin`) : relecture ; module chargé à part.

## Lots

1. Famille, co-parent, appairage des appareils, connexion Apple et Google (si activée dans Supabase), records et contrôles en base. **Fait le 16 novembre 2026.**
2. Fiche enfant complète (progression par notion, séances, leçons consultées), réglages par enfant (prénom, avatar, classe, code, matières, temps de travail par jour), export et suppression des données. **Fait le 16 novembre 2026.**
3. Profil enfant, mode hors connexion. **Fait le 16 novembre 2026.**
4. Bilan du dimanche par email, contrôle programmé par le parent. **Fait le 16 novembre 2026** (l'envoi des e-mails s'active à la mise en ligne, voir plus bas).
5. Photo de leçon, cahier de vacances, défi de la semaine en famille. **Fait le 16 novembre 2026.**

## Mettre en service

- Hébergement : Cloudflare Workers (fichiers statiques), `wrangler.jsonc` à la racine. Projet branché sur le dépôt GitHub (Workers Builds) : build `pnpm build`, déploiement `npx wrangler deploy`. Les valeurs publiques Supabase sont dans `apps/pwa/.env.production`. Dans Supabase (Authentication, URL Configuration), l'adresse publique doit être l'adresse du site et une redirection autorisée.
- E-mails de connexion : SMTP Gmail de hopla.news@gmail.com (mot de passe d'application) en attendant le domaine ; modèles français dans `docs/emails-supabase.md`.
- Connexion Apple et Google : activer les fournisseurs dans Supabase (Authentication, Providers), puis `VITE_AUTH_GOOGLE=1` et `VITE_AUTH_APPLE=1` dans `apps/pwa/.env.local`. Sans cela, seuls les liens magiques s'affichent.
- Appairage par QR : le QR contient l'adresse de l'app (`/appairer?code=…`) ; l'appareil de l'enfant doit pouvoir l'ouvrir (même réseau en développement, adresse publique en production).
- Bilan du dimanche par e-mail (une fois l'app en ligne, avec son domaine) :
  1. Créer un compte Resend, vérifier le domaine d'envoi, créer une clé d'API.
  2. Secrets de la fonction (Supabase, Edge Functions, Secrets) : `RESEND_API_KEY`, `BILAN_EXPEDITEUR` (par exemple `Hopla <bilan@domaine>`), `URL_APP` (adresse publique de l'app), `BILAN_CLE` (longue chaine aléatoire).
  3. Déployer `supabase/functions/bilan-hebdo` sans vérification de JWT (la fonction vérifie elle-même `x-bilan-cle`).
  4. Planifier l'envoi (extensions `pg_cron` et `pg_net`, clé rangée dans Vault) :
     ```sql
     create extension if not exists pg_cron;
     create extension if not exists pg_net;
     select vault.create_secret('<BILAN_CLE>', 'bilan_cle');
     select cron.schedule('bilan-du-dimanche', '0 17 * * 0', $$
       select net.http_post(
         url := 'https://<projet>.supabase.co/functions/v1/bilan-hebdo',
         headers := jsonb_build_object('Content-Type', 'application/json',
           'x-bilan-cle', (select decrypted_secret from vault.decrypted_secrets where name = 'bilan_cle')),
         body := '{}'::jsonb)
     $$);
     ```
     (17 h UTC : 18 h à Paris en hiver, 19 h en été.)
  5. `VITE_BILAN_EMAIL=1` dans l'environnement de l'app : la case « Bilan du dimanche par e-mail » apparait dans l'espace parent.
  Le courriel ne contient que le prénom, la classe et des chiffres de la semaine ; le détail reste dans l'app. Resend reçoit ces éléments pour l'envoi.
