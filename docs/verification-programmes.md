# Vérification des références de programmes

Contrôle fait le 16 novembre 2026, à la demande de Laurent, pour les 31 programmes de `content/programmes/programmes.json`.
Deux points par programme : la référence (numéro et date du Bulletin officiel, arrêté) et le calendrier d'application par classe (`application`).
Les 31 programmes sont conformes ; aucune donnée n'a été corrigée. Ils passent en `verifie: true`.

## Méthode

1. Quand le PDF archivé contient l'arrêté, la référence et le calendrier sont lus dans son article d'entrée en application (texte extrait avec `pdftotext`).
2. Quand l'archive ne contient que l'annexe (le programme lui-même), la référence est lue dans l'en-tête de l'annexe ou le titre de la source, et le calendrier est vérifié sur une source publique. Le site du ministère et Légifrance refusent la lecture automatique : les sources retenues sont une copie du BO hébergée par une académie, des pages d'académie et le réseau Mission laïque française.
3. Les dates de fin (`fin`) sont contrôlées par cohérence : chaque programme s'arrête l'année précédant l'entrée en application de celui qui le remplace, pour la même classe.

## Résultats

| Programme | Référence | Calendrier | Preuve |
|---|---|---|---|
| FR-C2-2024, MA-C2-2024 | BO n°41 du 31 octobre 2024 | CP, CE1, CE2 à la rentrée 2025 | Titre de la page du BO (MENE2415135A) ; « Entrée en application à la rentrée 2025 » (Mission laïque française, présentation des programmes) ; page du ministère « De nouveaux programmes de français et de mathématiques pour les élèves de la maternelle au CE2 » |
| FR-C3-2025, MA-C3-2025 | BO n°16 du 17 avril 2025, arrêté du 10 avril 2025 | CM1 et 6e en 2025, CM2 en 2026 | « À la rentrée de septembre 2025, de nouveaux programmes de mathématiques entrent en vigueur, pour les niveaux CM1 et 6ème […] celui de CM2 sera applicable à la rentrée 2026 » (académie de Bordeaux) ; même arrêté pour le français |
| FR-C3-2020, MA-C3-2020 | BO n°31 du 30 juillet 2020 | CM2 jusqu'en 2025-2026 | Arrêté archivé (`bo31-2020-cycles-2-3-4`), article 2 : « entrent en vigueur à compter de la rentrée scolaire 2020 » ; fin cohérente avec FR/MA-C3-2025 en CM2 |
| FR-C4-2026, MA-C4-2026 | Arrêté du 18 février 2026, BO n°10 du 5 mars 2026 | 5e en 2026, 4e en 2027, 3e en 2028 | Arrêté archivé (`bo10-2026-francais-maths-c4`), article 3 |
| FR-C4-2020, MA-C4-2020 | BO n°31 du 30 juillet 2020 | Fin : 5e 2025-2026, 4e 2026-2027, 3e 2027-2028 | Arrêté archivé, article 2 ; fin cohérente avec FR/MA-C4-2026 |
| QM-C2-2020, LV-C2-2020, LV-C3-2020, HG-C3-2020 | BO n°31 du 30 juillet 2020 | Fins cohérentes avec les programmes 2026 | Arrêté archivé (`bo31-2020-cycles-2-3-4`), article 2 |
| HG-C2-2026, HG-C3-2026 | BO n°22 du 28 mai 2026, arrêté du 22 avril 2026 | CP et CM1 en 2026 ; CE1, CE2, CM2, 6e en 2027 | Arrêté archivé (`bo22-2026-histoire-geo-c2-c3`), article 3 |
| ST-C2-2026, ST-C3-2026 | BO n°24 du 11 juin 2026, arrêté du 5 juin 2026 | CP et CM1 en 2026 ; CE1, CE2, CM2, 6e en 2027 | Arrêté archivé (`bo24-2026-sciences-c2-c3`), article 3 |
| ST-C3-2023 | BO n°25 du 22 juin 2023 | CM1, CM2, 6e à la rentrée 2023 | Programme archivé (`eduscol-cycle-3-2023`) : « En vigueur à la rentrée 2023 […] d'après le BOEN no 31 du 30 juillet 2020 et le BOEN no 25 du 22 juin 2023 » |
| LV-C2-2026, LV-C3-2026 | BO n°12 du 19 mars 2026, arrêté du 26 février 2026 | CP et CM1 en 2026 ; CE1, CE2, CM2 en 2027 | Arrêté archivé (`bo12-2026-langues-ecole`), article 3 |
| EM-C2-2024, EM-C3-2024, EM-C4-2024 | BO n°24 du 13 juin 2024, arrêté du 29 mai 2024 | CP, CM1, 5e en 2024 ; CE1, CM2, 4e en 2025 ; CE2, 6e, 3e en 2026 | Arrêté archivé (`bo24-2024-emc`), article 3 |
| TE-C4-2024 | BO n°9 du 29 février 2024, arrêté du 9 février 2024 | 5e en 2024, 4e en 2025, 3e en 2026 | Arrêté archivé (`bo9-2024-technologie-c4`), article 2 |
| LV-C3-2025, LV-C4-2025 | BO n°22 du 29 mai 2025, arrêté du 5 mai 2025 (NOR MENE2504621A) | 6e en 2025, 5e en 2026, 4e en 2027, 3e en 2028 | Copie du BO hébergée par l'académie de Nantes, article 4 |
| LV-C4-2020 | BO n°31 du 30 juillet 2020 | Fin : 5e 2025-2026, 4e 2026-2027, 3e 2027-2028 | Fin cohérente avec LV-C4-2025 |
| HG-C4-2020, SV-C4-2020, PC-C4-2020 | BO n°31 du 30 juillet 2020 | Toutes les classes du cycle 4, sans fin prévue | Arrêté archivé, article 2 ; aucun nouveau programme annoncé pour le cycle 4 dans ces matières (les arrêtés de 2026 ne visent que les cycles 2 et 3) |

## Sources consultées hors archive

- Bulletin officiel n°22 du 29 mai 2025, copie de l'académie de Nantes : https://www.pedagogie.ac-nantes.fr/medias/fichier/bo-n-22-du-29-mai-2025_1749496580708-pdf
- Académie de Bordeaux, « Le programme de cycle 3 à partir de 2025 » : https://ent2d.ac-bordeaux.fr/disciplines/mathematiques/?p=10944
- Académie d'Orléans-Tours, présentation des programmes de mathématiques du cycle 3 : https://pedagogie.ac-orleans-tours.fr/documents/pdf/presentation_programmes_maths_c3.pdf
- Mission laïque française, appropriation des programmes de français : https://www.mlfmonde.org/wp-content/uploads/2025/06/Appropriation-des-programmes-MLF_Francais.pptx.pdf

## Limites

- Pour FR/MA-C2-2024 et FR/MA-C3-2025, l'arrêté lui-même n'a pas pu être lu (site du ministère et Légifrance inaccessibles en lecture automatique) : le calendrier repose sur des sources concordantes, pas sur le texte de l'arrêté. À relire sur le BO si l'on veut une preuve de premier rang.
- Ces programmes servent à choisir les notions de chaque classe ; aucune référence n'est affichée dans l'app.
