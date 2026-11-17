# Outils de contenu

- `outil.py` : `verifier_extrait(source, page, extrait)` contrôle qu'un extrait figure à la page indiquée du texte officiel archivé ; `ecrire(programme, classe, notions)` ajoute des notions vérifiées au référentiel, avec leçon et exercices en brouillon (`auteur: ia`).
- `couverture.py PROGRAMME SOURCE` : liste, par classe, les rubriques officielles (titre suivi de « Objectifs d'apprentissage ») et les notions qui les couvrent. Fiable pour les programmes 2024-2026 de français, mathématiques, histoire-géographie, sciences et langues à l'école.
- `rubriques.py PROGRAMME SOURCE CLASSE [--tout]` : affiche le texte des rubriques sans notion, pour rédiger les suivantes.

Nécessite `pdftotext` (poppler-utils).
