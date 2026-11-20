# Analyse d'impact (AIPD), premier jet

Premier jet du 20 novembre 2026, à reprendre dans l'outil PIA de la CNIL et à faire relire avant la publication sur les stores. Pourquoi une AIPD : les personnes concernées sont des enfants, et l'app suit leur travail dans la durée.

## Description

Hopla aide les enfants du CP à la 3e à réviser. Le parent crée la famille et les profils ; l'enfant travaille sur l'appareil familial (profil et code secret) ou sur son propre appareil (appairé par un code du parent). Le détail des données, des destinataires et des durées est dans `registre.md`.

## Nécessité et proportionnalité

- Minimisation : prénom ou pseudo, avatar, classe. Ni nom, ni date de naissance, ni photo, ni e-mail pour l'enfant.
- Réponses enregistrées sous forme de choix et de codes d'erreur, jamais de texte libre de l'enfant.
- Photos de leçon lues sur l'appareil, jamais envoyées.
- Aucune publicité, aucun traceur, aucune mesure d'audience.
- Durées limitées et appliquées chaque nuit (1 an pour le détail et pour une famille inactive).
- Information de l'enfant dans son profil : ce que ses parents voient.

## Risques et mesures

| Risque | Origine possible | Gravité | Mesures en place | Reste à faire |
| --- | --- | --- | --- | --- |
| Accès illégitime au travail d'un enfant | Autre famille, enfant de la même famille, appareil perdu | Importante | RLS testée famille par famille ; session enfant limitée à son profil ; appareil retirable par le parent, retiré après 6 mois sans usage, 5 au plus | Prévenir les parents à chaque nouvel appareil (avec Resend) |
| Compte parent détourné | Boîte e-mail du parent compromise | Importante | Connexion par code à usage unique ; mode parent sous code parent ; 5 essais par 10 minutes | Prévenir l'autre parent des actions sensibles (avec Resend) |
| Fuite de la base | Clé de service divulguée, faille | Importante | Codes et jetons en empreinte ; clé de service hors du dépôt ; contrôles en base | Revue des secrets avant publication |
| Modification ou suppression non voulue | Parent, erreur | Limitée | Suppression confirmée ; export JSON disponible | Notifier l'autre parent d'une suppression d'enfant |
| Sortie de l'enfant vers l'extérieur | Lien dans un écran visible par l'enfant | Limitée | Contrôle parental (code parent) avant tout lien ou e-mail | |
| Sous-traitant sans contrat | E-mails envoyés par un compte Gmail personnel | Importante | | Passer à Resend et signer son contrat de sous-traitance ; signer ceux de Supabase et Cloudflare |

## Points ouverts

- Éditeur et responsable du traitement (personne physique ou société).
- Conditions d'utilisation, et conditions de vente si le service devient payant.
- Transferts hors UE de Cloudflare et Google : vérifier le cadre (Data Privacy Framework ou clauses contractuelles types).
