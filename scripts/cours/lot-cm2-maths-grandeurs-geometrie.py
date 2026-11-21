"""Lot de cours : maths CM2, grandeurs, géométrie, données. Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-cm2-maths-grandeurs-geometrie.py
    python3 scripts/cours/pages.py content/cours/MA-C3-CM2-*.json

Cycle 3 : phrases de 20 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
Figures : une case (colonne, ligne) occupe x de colonne à colonne + 1 ; l'axe y descend.
"""
from commun import bq, ecrire, q, source_referentiel as ref, vocabulaire


def figure(largeur, hauteur, *elements, quadrillage=True):
    return {'type': 'figure', 'largeur': largeur, 'hauteur': hauteur, 'quadrillage': quadrillage, 'elements': list(elements)}


def rect(x, y, l, h, **o):
    return {'forme': 'polygone', 'sommets': [[x, y], [x + l, y], [x + l, y + h], [x, y + h]], **o}


COURS = {
    'MA-C3-CM2-AIRE-01': dict(duree=6, essentiel=
        'L’aire d’un rectangle est égale à sa longueur multipliée par sa largeur.\n'
        'L’aire d’un carré est égale à son côté multiplié par lui-même.\n'
        'Un rectangle de 6 cm sur 4 cm a une aire de 6 × 4 = 24 cm².',
        parties=[
            ('Compter les carreaux, puis calculer', [
                vocabulaire(3, 'Aire'),
                {'type': 'visuel', 'visuel': figure(8, 6, rect(1, 1, 6, 4)), 'legende': '6 carreaux sur 4 rangées : 6 × 4 = 24 carreaux.'},
                bq('Quelle est l’aire d’un carré de 5 cm de côté ?', ['25 cm²', '20 cm²', '10 cm²'], '5 × 5 = 25.'),
            ]),
            ('Aire ou périmètre ?', [
                {'type': 'tableau', 'titre': 'Rectangle de 6 cm sur 4 cm', 'colonnes': ['Grandeur', 'Calcul', 'Résultat'], 'lignes': [
                    ['aire', '6 × 4', '24 cm²'], ['périmètre', '6 + 4 + 6 + 4', '20 cm']]},
                {'type': 'piege', 'erreur': 'On ajoute les côtés pour trouver l’aire.', 'correction': 'Ajouter les côtés donne le périmètre, en cm. L’aire se calcule par un produit, en cm².'},
            ]),
        ],
        a_toi=[
            q('Aire d’un rectangle de 8 m sur 3 m :', ['24 m²', '22 m²', '11 m²'], '8 × 3 = 24.'),
            q('Un rectangle a une aire de 30 cm² et une largeur de 5 cm. Sa longueur :', ['6 cm', '25 cm', '150 cm'], '6 × 5 = 30.'),
            q('L’aire se mesure en :', ['cm²', 'cm', 'cm³'], 'Des carrés de 1 cm de côté.'),
        ],
        sources=[ref('MA-C3-CM2-AIRE-01', 'Aire du carré et du rectangle')]),

    'MA-C3-CM2-AIRE-02': dict(duree=7, essentiel=
        '1 dm² est un carré de 10 cm de côté : il contient 10 × 10 = 100 cm².\n'
        'Entre deux unités d’aire qui se suivent, on multiplie ou on divise par 100.\n'
        '1 m² = 100 dm² = 10 000 cm². 1 cm² = 100 mm².',
        parties=[
            ('Les unités d’aire', [
                {'type': 'tableau', 'titre': 'De 100 en 100', 'colonnes': ['Unité', 'Vaut'], 'lignes': [
                    ['1 m²', '100 dm²'], ['1 dm²', '100 cm²'], ['1 cm²', '100 mm²'], ['1 hectare (ha)', '10 000 m²'], ['1 km²', '1 000 000 m²']]},
                bq('3 m² = ?', ['300 dm²', '30 dm²', '3 000 dm²'], '1 m² = 100 dm².'),
            ]),
            ('Pourquoi 100 ?', [
                {'type': 'explique', 'texte': 'Un carré de 1 m de côté mesure 10 dm sur 10 dm. Il contient 10 rangées de 10 dm² : 100 dm².'},
                {'type': 'piege', 'erreur': 'On écrit 1 m² = 100 cm², comme 1 m = 100 cm.', 'correction': '1 m² = 100 cm × 100 cm = 10 000 cm².'},
            ]),
        ],
        a_toi=[
            q('500 cm² = ?', ['5 dm²', '50 dm²', '0,5 dm²'], '100 cm² = 1 dm².'),
            q('2 cm² = ?', ['200 mm²', '20 mm²', '2 000 mm²'], '1 cm² = 100 mm².'),
            q('1 m² = ?', ['10 000 cm²', '100 cm²', '1 000 cm²'], '100 × 100 = 10 000.'),
        ],
        sources=[ref('MA-C3-CM2-AIRE-02', 'Conversions d’aires')]),

    'MA-C3-CM2-ANG-01': dict(duree=5, essentiel=
        'Un angle droit mesure 90°. C’est un quart de tour.\n'
        'Un angle aigu mesure moins de 90°. Un angle obtus mesure entre 90° et 180°.\n'
        'Un demi-tour mesure 180°, un tour complet 360°.',
        parties=[
            ('L’angle droit', [
                {'type': 'visuel', 'visuel': figure(7, 6, {'forme': 'segment', 'de': [1, 5], 'a': [6, 5]}, {'forme': 'segment', 'de': [1, 5], 'a': [1, 1]}),
                 'legende': 'Un angle droit : 90°. On le vérifie avec l’équerre.'},
                {'type': 'tableau', 'titre': 'Trois sortes d’angles', 'colonnes': ['Angle', 'Mesure', 'Exemple'], 'lignes': [
                    ['aigu', 'moins de 90°', '45°'], ['droit', '90°', 'coin d’une feuille'], ['obtus', 'entre 90° et 180°', '120°']]},
                bq('Un angle de 60° est :', ['aigu', 'droit', 'obtus'], '60° < 90°.'),
            ]),
            ('Tours et degrés', [
                {'type': 'observe', 'consigne': 'Une aiguille qui tourne.', 'exemples': ['un quart de tour : 90°', 'un demi-tour : 180°', 'un tour complet : 360°']},
                {'type': 'piege', 'erreur': 'On croit qu’un angle est plus grand si ses côtés sont plus longs.', 'correction': 'La mesure dépend de l’ouverture, pas de la longueur des côtés.'},
            ]),
        ],
        a_toi=[
            q('Un quart de tour mesure :', ['90°', '45°', '180°'], '360° ÷ 4 = 90°.'),
            q('Un angle de 120° est :', ['obtus', 'aigu', 'droit'], 'Entre 90° et 180°.'),
            q('Deux angles droits côte à côte font :', ['180°', '90°', '360°'], '90° + 90° = 180°.'),
        ],
        sources=[ref('MA-C3-CM2-ANG-01', 'L’angle droit mesure 90°')]),

    'MA-C3-CM2-DUR-01': dict(duree=7, essentiel=
        '1 minute = 60 secondes. 1 heure = 60 minutes = 3 600 secondes.\n'
        'Les durées se comptent de 60 en 60, pas de 100 en 100.\n'
        '2 min 15 s = 120 s + 15 s = 135 s.',
        parties=[
            ('Convertir', [
                {'type': 'tableau', 'titre': 'Des conversions', 'colonnes': ['Durée', 'En secondes ou minutes'], 'lignes': [
                    ['3 min', '180 s'], ['2 min 15 s', '135 s'], ['200 s', '3 min 20 s'], ['1 h 30 min', '90 min']]},
                bq('150 s = ?', ['2 min 30 s', '1 min 50 s', '15 min'], '120 s = 2 min, il reste 30 s.'),
            ]),
            ('Calculer une durée', [
                {'type': 'visuel', 'visuel': {'type': 'horloge', 'heures': 10, 'minutes': 45}, 'legende': 'Le départ est à 10 h 45.'},
                {'type': 'exemple-resolu', 'enonce': 'Départ à 10 h 45, arrivée à 12 h 20. Combien de temps dure le trajet ?', 'etapes': [
                    'De 10 h 45 à 11 h : 15 min.', 'De 11 h à 12 h : 1 h.', 'De 12 h à 12 h 20 : 20 min.', '15 min + 1 h + 20 min = 1 h 35 min.'],
                 'conclusion': 'Le trajet dure 1 h 35 min.'},
                {'type': 'piege', 'erreur': 'On croit que 1,5 h = 1 h 50 min.', 'correction': '0,5 h, c’est une demi-heure : 30 min. Donc 1,5 h = 1 h 30 min.'},
            ]),
        ],
        a_toi=[
            q('3 min = ?', ['180 s', '300 s', '30 s'], '3 × 60 = 180.'),
            q('1 h = ?', ['3 600 s', '600 s', '360 s'], '60 × 60 = 3 600.'),
            q('De 8 h 50 à 9 h 25, il s’écoule :', ['35 min', '75 min', '25 min'], '10 min jusqu’à 9 h, puis 25 min.'),
        ],
        sources=[ref('MA-C3-CM2-DUR-01', 'Durées : heures, minutes, secondes')]),

    'MA-C3-CM2-PROBA-01': dict(duree=6, essentiel=
        'Dans une urne de 3 boules rouges et 2 bleues, on a 3 chances sur 5 de tirer une rouge.\n'
        'On compte les cas favorables, puis tous les cas possibles.\n'
        'Avec un dé, obtenir 6 : 1 chance sur 6.',
        parties=[
            ('a chances sur b', [
                vocabulaire(3, 'Probabilité'),
                {'type': 'visuel', 'visuel': {'type': 'urne', 'boules': [{'couleur': 'rouge', 'nombre': 3}, {'couleur': 'bleue', 'nombre': 2}]},
                 'legende': '5 boules en tout, dont 3 rouges.'},
                {'type': 'tableau', 'titre': 'On tire une boule de cette urne', 'colonnes': ['Évènement', 'Chances'], 'lignes': [
                    ['tirer une rouge', '3 chances sur 5'], ['tirer une bleue', '2 chances sur 5'], ['tirer une verte', '0 chance sur 5']]},
                bq('Avec un dé, obtenir un nombre pair :', ['3 chances sur 6', '1 chance sur 6', '2 chances sur 6'], '2, 4 et 6 : 3 cas sur 6.'),
            ]),
            ('Compter tous les cas', [
                {'type': 'piege', 'erreur': 'Avec 3 rouges et 2 bleues, on dit « 3 chances sur 2 ».', 'correction': 'On compare au nombre total de boules : 3 chances sur 5.'},
            ]),
        ],
        a_toi=[
            q('Une urne de 4 boules vertes et 1 jaune. Tirer la jaune :', ['1 chance sur 5', '1 chance sur 4', '4 chances sur 5'], '1 cas favorable, 5 boules en tout.'),
            q('Avec un dé, obtenir moins de 3 :', ['2 chances sur 6', '3 chances sur 6', '1 chance sur 6'], '1 ou 2 : 2 cas sur 6.'),
            q('10 billes, dont 7 noires. Tirer une noire :', ['7 chances sur 10', '3 chances sur 10', '7 chances sur 3'], '7 cas favorables sur 10.'),
        ],
        sources=[ref('MA-C3-CM2-PROBA-01', 'Probabilité « a chances sur b »')]),

    'MA-C3-CM2-GEO-01': dict(duree=6, essentiel=
        'Le cercle de centre O et de rayon 3 cm contient tous les points situés à 3 cm de O.\n'
        'Le disque est formé de tous les points situés à 3 cm de O, ou moins.\n'
        'Le diamètre mesure deux rayons : 6 cm.',
        parties=[
            ('Cercle et disque', [
                vocabulaire(3, 'Cercle', 'Disque', 'Rayon', 'Diamètre'),
                {'type': 'visuel', 'visuel': figure(8, 8,
                    {'forme': 'cercle', 'centre': [4, 4], 'rayon': 3},
                    {'forme': 'point', 'en': [4, 4], 'nom': 'O'},
                    {'forme': 'segment', 'de': [4, 4], 'a': [7, 4], 'accent': True},
                    {'forme': 'point', 'en': [7, 4], 'nom': 'A'}),
                 'legende': '[OA] est un rayon : OA = 3 carreaux.'},
                bq('Le rayon d’un cercle mesure 4 cm. Son diamètre mesure :', ['8 cm', '2 cm', '4 cm'], 'Deux rayons : 4 × 2 = 8.'),
            ]),
            ('Sur le cercle ou dans le disque ?', [
                {'type': 'tableau', 'titre': 'Cercle de centre O, de rayon 5 cm', 'colonnes': ['Distance à O', 'Le point est'], 'lignes': [
                    ['5 cm', 'sur le cercle, et dans le disque'], ['2 cm', 'dans le disque, pas sur le cercle'], ['7 cm', 'ni sur le cercle, ni dans le disque']]},
                {'type': 'piege', 'erreur': 'On croit que le centre est sur le cercle.', 'correction': 'Le centre est dans le disque, mais pas sur le cercle.'},
            ]),
        ],
        a_toi=[
            q('Un point est à 5 cm du centre d’un cercle de rayon 5 cm. Il est :', ['sur le cercle', 'hors du disque', 'au centre'], 'Sa distance au centre égale le rayon.'),
            q('Un point est à 2 cm du centre d’un cercle de rayon 5 cm. Il est :', ['dans le disque, pas sur le cercle', 'sur le cercle', 'hors du disque'], '2 cm < 5 cm.'),
            q('Un diamètre mesure 10 cm. Le rayon mesure :', ['5 cm', '20 cm', '10 cm'], '10 ÷ 2 = 5.'),
        ],
        sources=[ref('MA-C3-CM2-GEO-01', 'Cercle et disque')]),

    'MA-C3-CM2-SYM-01': dict(duree=7, essentiel=
        'Sur un quadrillage, le symétrique d’un point est à la même distance de l’axe, de l’autre côté.\n'
        'On compte les carreaux jusqu’à l’axe, puis on reporte le même nombre de l’autre côté.\n'
        'L’axe peut être vertical, horizontal ou suivre une diagonale du quadrillage.',
        parties=[
            ('Axe vertical ou horizontal', [
                vocabulaire(3, 'Axe de symétrie'),
                {'type': 'visuel', 'visuel': figure(8, 5,
                    {'forme': 'axe', 'de': [4, 0], 'a': [4, 5]},
                    {'forme': 'case', 'colonne': 1, 'ligne': 2, 'accent': True},
                    {'forme': 'case', 'colonne': 6, 'ligne': 2}),
                 'legende': 'La case colorée est à 2 carreaux de l’axe : sa symétrique aussi, de l’autre côté.'},
                bq('Un point est à 3 carreaux à gauche d’un axe vertical. Son symétrique est :', ['à 3 carreaux à droite', 'à 6 carreaux à droite', 'sur l’axe'], 'Même distance, de l’autre côté.'),
            ]),
            ('Axe en diagonale', [
                {'type': 'visuel', 'visuel': figure(6, 6,
                    {'forme': 'axe', 'de': [0, 0], 'a': [6, 6]},
                    {'forme': 'case', 'colonne': 1, 'ligne': 3, 'accent': True},
                    {'forme': 'case', 'colonne': 3, 'ligne': 1}),
                 'legende': 'Avec un axe en diagonale, on compte les carreaux en suivant les diagonales des carreaux.'},
                {'type': 'methode', 'titre': 'Pour construire le symétrique d’une figure', 'etapes': [
                    'Repère les sommets de la figure.', 'Construis le symétrique de chaque sommet.', 'Relie les points obtenus dans le même ordre.']},
                {'type': 'piege', 'erreur': 'Avec un axe en diagonale, on reporte les carreaux à l’horizontale.', 'correction': 'Le point et son symétrique sont sur une droite perpendiculaire à l’axe.'},
            ]),
        ],
        a_toi=[
            q('Un point situé sur l’axe a pour symétrique :', ['lui-même', 'un point à 1 carreau', 'aucun point'], 'Sa distance à l’axe est 0.'),
            q('Le symétrique d’une figure a :', ['la même forme et les mêmes mesures', 'des côtés deux fois plus longs', 'une forme différente'], 'Les deux figures se superposent par pliage.'),
            q('Un point est à 4 carreaux au-dessus d’un axe horizontal. Son symétrique est :', ['à 4 carreaux en dessous', 'à 4 carreaux à droite', 'à 8 carreaux au-dessus'], 'Même distance, de l’autre côté.'),
        ],
        sources=[ref('MA-C3-CM2-SYM-01', 'Symétrie axiale sur quadrillage')]),

    'MA-C3-CM2-SOL-01': dict(duree=6, essentiel=
        'Le patron d’un pavé est formé de 6 rectangles qui, une fois pliés, ferment le pavé.\n'
        'Les faces opposées du pavé sont identiques : il y a 3 paires de rectangles pareils.\n'
        'Deux côtés qui se touchent au pliage ont la même longueur.',
        parties=[
            ('Le pavé et son patron', [
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'pave'}, 'legende': 'Un pavé : 6 faces rectangulaires.'},
                {'type': 'visuel', 'visuel': figure(7, 7,
                    rect(2, 0.5, 3, 1), rect(2, 1.5, 3, 2), rect(2, 3.5, 3, 1), rect(2, 4.5, 3, 2), rect(1, 1.5, 1, 2), rect(5, 1.5, 1, 2), quadrillage=False),
                 'legende': 'Un patron de pavé : 3 paires de rectangles identiques.'},
                bq('Combien de faces compte un patron de pavé ?', ['6', '4', '8'], 'Une par face du pavé.'),
            ]),
            ('Vérifier un patron', [
                {'type': 'methode', 'titre': 'Pour savoir si c’est un patron de pavé', 'etapes': [
                    'Compte les rectangles : il en faut 6.', 'Cherche les 3 paires de rectangles identiques.', 'Imagine le pliage : aucune face ne doit se superposer à une autre.']},
                {'type': 'piege', 'erreur': 'On croit que 6 rectangles assemblés font toujours un patron.', 'correction': 'Si deux faces se retrouvent au même endroit au pliage, le pavé ne se ferme pas.'},
            ]),
        ],
        a_toi=[
            q('Dans un patron de pavé, combien de paires de faces identiques ?', ['3', '2', '6'], 'Dessus et dessous, devant et derrière, gauche et droite.'),
            q('Deux faces opposées d’un pavé sont :', ['identiques', 'toujours carrées', 'de tailles différentes'], 'Elles ont les mêmes dimensions.'),
            q('Un cube est :', ['un pavé particulier', 'une pyramide', 'un prisme à base triangulaire'], 'Ses 6 faces sont des carrés.'),
        ],
        sources=[ref('MA-C3-CM2-SOL-01', 'Patron d’un pavé')]),

    'MA-C3-CM2-GEO-02': dict(duree=6, essentiel=
        'Un trapèze est un quadrilatère qui a deux côtés opposés parallèles.\n'
        'Un trapèze rectangle a en plus deux angles droits.\n'
        'Un pentagone a 5 côtés, un hexagone a 6 côtés.',
        parties=[
            ('Les trapèzes', [
                {'type': 'visuel', 'visuel': figure(8, 6, {'forme': 'polygone', 'sommets': [[1, 5], [7, 5], [5, 2], [3, 2]]}),
                 'legende': 'Un trapèze : le côté du haut et celui du bas sont parallèles.'},
                {'type': 'visuel', 'visuel': figure(8, 6, {'forme': 'polygone', 'sommets': [[1, 5], [7, 5], [4, 2], [1, 2]]}),
                 'legende': 'Un trapèze rectangle : deux angles droits, à gauche.'},
                bq('Un trapèze rectangle a :', ['deux angles droits', 'quatre angles droits', 'aucun angle droit'], 'Les deux angles du côté perpendiculaire aux bases.'),
            ]),
            ('Pentagone et hexagone', [
                {'type': 'tableau', 'titre': 'Nommer selon le nombre de côtés', 'colonnes': ['Côtés', 'Nom'], 'lignes': [
                    ['3', 'triangle'], ['4', 'quadrilatère'], ['5', 'pentagone'], ['6', 'hexagone']]},
                {'type': 'piege', 'erreur': 'On croit qu’un hexagone a 8 côtés.', 'correction': 'Hexa veut dire six. Le polygone à 8 côtés est l’octogone.'},
            ]),
        ],
        a_toi=[
            q('Un pentagone a :', ['5 côtés', '6 côtés', '8 côtés'], 'Penta veut dire cinq.'),
            q('Un hexagone a :', ['6 côtés', '5 côtés', '7 côtés'], 'Hexa veut dire six.'),
            q('Un trapèze a toujours :', ['deux côtés opposés parallèles', 'quatre côtés égaux', 'un angle droit'], 'C’est sa définition.'),
        ],
        sources=[ref('MA-C3-CM2-GEO-02', 'Trapèzes, pentagone, hexagone')]),

    'MA-C3-CM2-GEO-03': dict(duree=7, essentiel=
        'Un programme de construction donne, dans l’ordre, les étapes pour tracer une figure.\n'
        'Il utilise le vocabulaire précis : segment, droite, perpendiculaire, parallèle, cercle, centre, rayon.\n'
        'Pour l’écrire, on nomme les points et on part d’un élément simple.',
        parties=[
            ('Suivre un programme', [
                {'type': 'methode', 'titre': 'Un programme', 'etapes': [
                    'Trace un segment [AB] de 6 cm.', 'Trace la droite perpendiculaire à (AB) passant par A.', 'Place le point C sur cette droite, à 4 cm de A.', 'Trace le segment [BC].']},
                {'type': 'visuel', 'visuel': figure(8, 6,
                    {'forme': 'polygone', 'sommets': [[1, 5], [7, 5], [1, 1]]},
                    {'forme': 'point', 'en': [1, 5], 'nom': 'A'}, {'forme': 'point', 'en': [7, 5], 'nom': 'B'}, {'forme': 'point', 'en': [1, 1], 'nom': 'C'}),
                 'legende': 'On obtient un triangle rectangle en A.'},
                bq('Dans ce programme, quel angle est droit ?', ['l’angle en A', 'l’angle en B', 'l’angle en C'], 'La droite tracée est perpendiculaire à (AB) en A.'),
            ]),
            ('Écrire un programme', [
                {'type': 'methode', 'titre': 'Pour écrire un programme', 'etapes': [
                    'Nomme tous les points de la figure.', 'Commence par un segment ou un cercle.', 'Écris une seule action par étape, avec les mesures.', 'Fais tracer la figure par un camarade pour vérifier.']},
                {'type': 'piege', 'erreur': 'On écrit « trace un trait à côté ».', 'correction': 'Chaque mot doit être précis : « trace la droite parallèle à (AB) passant par C ».'},
            ]),
        ],
        a_toi=[
            q('« Trace un cercle de centre O et de rayon 3 cm, puis un diamètre [AB]. » AB mesure :', ['6 cm', '3 cm', '9 cm'], 'Un diamètre vaut deux rayons.'),
            q('« Perpendiculaire » veut dire :', ['qui forme un angle droit', 'qui ne se coupe jamais', 'qui a la même longueur'], 'Deux droites perpendiculaires se coupent à angle droit.'),
            q('Dans un programme, l’ordre des étapes :', ['compte', 'ne compte pas', 'est au hasard'], 'On ne peut pas placer C avant d’avoir tracé la droite.'),
        ],
        sources=[ref('MA-C3-CM2-GEO-03', 'Programme de construction')]),

    'MA-C3-CM2-ESP-01': dict(duree=6, essentiel=
        'Pour compter les cubes d’un assemblage, on compte étage par étage, sans oublier les cubes cachés.\n'
        'Un pavé de 4 cubes sur 3, sur 2 étages, contient 4 × 3 × 2 = 24 cubes.\n'
        'Une vue de dessus montre les colonnes, pas leur hauteur.',
        parties=[
            ('Compter par étages', [
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'cube'}, 'legende': 'Chaque assemblage est fait de cubes identiques.'},
                {'type': 'exemple-resolu', 'enonce': 'Une pyramide de cubes : 9 cubes en bas, 4 au milieu, 1 en haut. Combien de cubes ?', 'etapes': [
                    '1er étage : 3 × 3 = 9.', '2e étage : 2 × 2 = 4.', '3e étage : 1.', '9 + 4 + 1 = 14.'],
                 'conclusion': 'La pyramide compte 14 cubes.'},
                bq('Un escalier de 3 marches : 1, 2 puis 3 cubes de haut, sur une rangée. Combien de cubes ?', ['6', '3', '9'], '1 + 2 + 3 = 6.'),
            ]),
            ('Les cubes cachés', [
                {'type': 'piege', 'erreur': 'On compte seulement les cubes visibles sur le dessin.', 'correction': 'Sous chaque cube du haut, il y a des cubes qui le portent.'},
            ]),
        ],
        a_toi=[
            q('Un pavé de 4 cubes sur 3, sur 2 étages :', ['24 cubes', '9 cubes', '14 cubes'], '4 × 3 × 2 = 24.'),
            q('Une tour de 5 cubes empilés, vue de dessus, montre :', ['1 carré', '5 carrés', 'un rectangle'], 'Les cubes sont les uns sur les autres.'),
            q('Un cube de 3 cubes de côté contient :', ['27 cubes', '9 cubes', '12 cubes'], '3 × 3 × 3 = 27.'),
        ],
        sources=[ref('MA-C3-CM2-ESP-01', 'Assemblages de cubes')]),

    'MA-C3-CM2-DATA-01': dict(duree=7, essentiel=
        'Un tableau, un diagramme en barres, un diagramme circulaire ou une courbe présentent des données.\n'
        'On lit le titre, les axes et les unités avant de répondre.\n'
        'Une courbe montre comment une grandeur évolue dans le temps.',
        parties=[
            ('Diagramme en barres', [
                {'type': 'visuel', 'visuel': {'type': 'diagramme', 'titre': 'Sports préférés des élèves de CM2', 'unite': 'élèves', 'pas': 2, 'barres': [
                    {'nom': 'football', 'valeur': 14}, {'nom': 'danse', 'valeur': 10}, {'nom': 'natation', 'valeur': 8}, {'nom': 'judo', 'valeur': 6}]},
                 'legende': '38 élèves ont répondu.'},
                bq('Combien d’élèves de plus préfèrent le football à la natation ?', ['6', '22', '8'], '14 − 8 = 6.'),
            ]),
            ('Diagramme circulaire et courbe', [
                {'type': 'explique', 'texte': 'Dans un diagramme circulaire, le disque entier représente le total. Un demi-disque, c’est la moitié ; un quart de disque, le quart.'},
                {'type': 'tableau', 'titre': 'Températures d’une journée, pour tracer une courbe', 'colonnes': ['Heure', '8 h', '12 h', '16 h', '20 h'], 'lignes': [
                    ['Température (°C)', '9', '16', '18', '12']]},
                {'type': 'piege', 'erreur': 'On lit une valeur sans regarder les graduations.', 'correction': 'Vérifie de combien en combien avance l’axe avant de lire.'},
            ]),
        ],
        a_toi=[
            q('Dans le diagramme, quel sport a 10 élèves ?', ['la danse', 'le judo', 'le football'], 'La barre de la danse arrive à 10.'),
            q('Dans un diagramme circulaire, un quart de disque représente :', ['le quart du total', 'la moitié', '4 personnes'], 'Le disque entier, c’est le total.'),
            q('D’après le tableau, la température la plus haute est à :', ['16 h', '12 h', '20 h'], '18 °C à 16 h.'),
        ],
        sources=[ref('MA-C3-CM2-DATA-01', 'Tableaux, diagrammes, courbes')]),
}

ecrire(COURS)
