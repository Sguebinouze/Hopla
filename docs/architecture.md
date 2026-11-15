# Architecture des comptes, des accès et des espaces

Référence pour les deux sessions. Principe directeur : **le moins de données possible**. Enfant : prénom (ou pseudo), avatar, classe. Parent : adresse de connexion. Jamais de nom, d'adresse, de téléphone, de date de naissance ni de photo d'enfant.

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
- `admins`, `relectures`.
- Le contenu pédagogique n'est pas en base : il vit dans Git et part dans des packs statiques par classe.

## Espaces

**Parent** (`/parent`) : famille et invitations, une fiche par enfant (progression par matière, à revoir, erreurs fréquentes, appareils), création de profils. À venir (lot 2) : historique des séances, leçons consultées, réglages par enfant (matières, temps d'écran, code), export et suppression des données.

**Enfant** (`/accueil` et suivantes) : mission du jour (contrôle prévu, puis révisions dues, puis rotation), matières et notions, leçons, exercices, défis chrono, contrôle. À venir (lot 3) : profil (avatar, Octave personnalisable, collection), mode hors connexion.

**Admin** (`/admin`) : relecture ; module chargé à part.

## Lots

1. Famille, co-parent, appairage des appareils, connexion Apple et Google (si activée dans Supabase), records et contrôles en base. **Fait le 16 novembre 2026.**
2. Fiche enfant complète, historique, réglages, export et suppression.
3. Profil enfant, mode hors connexion.
4. Bilan du dimanche par email, contrôle programmé par le parent.
5. Photo de leçon, cahier de vacances, défi de la semaine en famille.

## Mettre en service

- Connexion Apple et Google : activer les fournisseurs dans Supabase (Authentication, Providers), puis `VITE_AUTH_GOOGLE=1` et `VITE_AUTH_APPLE=1` dans `apps/pwa/.env.local`. Sans cela, seuls les liens magiques s'affichent.
- Appairage par QR : le QR contient l'adresse de l'app (`/appairer?code=…`) ; l'appareil de l'enfant doit pouvoir l'ouvrir (même réseau en développement, adresse publique en production).
