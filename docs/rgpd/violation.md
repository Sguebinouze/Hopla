# Procédure en cas de violation de données

Une violation de données, c'est une perte de confidentialité, d'intégrité ou de disponibilité : base exposée, clé de service divulguée, compte parent détourné, données effacées par erreur.

## Dans l'heure

1. Contenir : révoquer la clé ou le jeton en cause (Supabase, Cloudflare, GitHub), couper l'accès fautif, garder les journaux.
2. Noter dans le tableau ci-dessous : date de découverte, ce qui s'est passé, données et familles touchées.

## Sous 72 heures après la découverte

3. Évaluer le risque pour les familles. Les données concernent des enfants : en cas de doute, considérer qu'il y a un risque.
4. S'il y a un risque, notifier la CNIL par son téléservice de notification des violations, même incomplet, puis compléter.
5. Si le risque est élevé (par exemple adresses e-mail et travail des enfants exposés), prévenir les familles touchées, en clair : ce qui s'est passé, ce qui est exposé, ce que fait Hopla, ce qu'elles peuvent faire.

## Ensuite

6. Corriger la cause, ajouter un test qui la couvre, mettre à jour l'AIPD.

## Violations constatées

| Découverte | Description | Données et familles touchées | CNIL notifiée | Familles prévenues | Mesures |
| --- | --- | --- | --- | --- | --- |
| Aucune à ce jour | | | | | |
