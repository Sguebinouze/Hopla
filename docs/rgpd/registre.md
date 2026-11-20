# Registre des traitements

Tenu au titre de l'article 30 du RGPD. Mis à jour le 20 novembre 2026. Un seul traitement : l'app Hopla.

## Responsable du traitement

- Laurent, porteur du projet Hopla (éditeur à fixer : personne physique ou société).
- Contact : hopla.news@gmail.com.

## Traitement « Révisions et suivi des enfants »

| Rubrique | Contenu |
| --- | --- |
| Finalités | Faire fonctionner l'app : profils, sessions, révisions adaptées à chaque enfant. Montrer la progression aux parents de la famille. Bilan hebdomadaire par e-mail, sur demande du parent (pas encore actif). |
| Base légale | Exécution du service demandé par le parent pour son enfant (art. 6.1.b). Conditions d'utilisation à rédiger. |
| Personnes | Parents (titulaires de l'autorité parentale) ; enfants du CP à la 3e. |
| Données du parent | Adresse e-mail (connexion), code parent (empreinte bcrypt), date de dernière connexion. |
| Données de l'enfant | Prénom ou pseudo, avatar, classe et année de la classe, apparence d'Octave, code secret (empreinte bcrypt). Jamais de nom, d'adresse, de date de naissance, de photo ni d'e-mail. |
| Travail de l'enfant | Réponses choisies et codes d'erreur (jamais de texte libre), temps passé, progression par notion, leçons vues, records, jeux du jour, contrôle prévu, cahier de vacances. |
| Appareils | Nom générique (« iPhone ») modifiable par le parent, dates d'association et d'utilisation, jeton (empreinte SHA-256). |
| Destinataires | Les parents membres de la famille. L'enfant ne voit que son propre profil. |
| Sous-traitants | Supabase (base et connexion, région Paris). Cloudflare (hébergement des fichiers, voit l'adresse IP). Google Gmail (envoi des codes de connexion, à remplacer par Resend avec contrat de sous-traitance). |
| Transferts hors UE | Cloudflare et Google sont des sociétés américaines : vérifier pour chacune l'adhésion au Data Privacy Framework ou les clauses contractuelles types. |
| Durées | Détail du travail (réponses, leçons vues, jeux) : 1 an. Appareil inutilisé : 6 mois. Famille sans activité : comptes et profils supprimés après 1 an. Sessions, codes d'appairage et d'invitation : supprimés à expiration. Tâche de nuit `public.appliquer_conservation()`. |
| Sécurité | Contrôle d'accès en base (RLS), testé (`supabase/tests/isolation.test.ts`). Codes en bcrypt, jetons en SHA-256. 5 essais de code par 10 minutes. Aucun traceur, aucune mesure d'audience, aucune publicité. Lecture des photos de leçon sur l'appareil, rien n'est envoyé. |
| Droits | Accès et portabilité : export JSON depuis l'espace parent. Rectification : réglages de la fiche enfant. Effacement : suppression du profil ou du compte depuis l'app, ou page publique `/supprimer-mon-compte`. Autres demandes : hopla.news@gmail.com. |
