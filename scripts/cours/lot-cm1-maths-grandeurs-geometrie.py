"""Lot de cours : maths CM1, grandeurs, géométrie et données. Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-cm1-maths-grandeurs-geometrie.py
    python3 scripts/cours/pages.py content/cours/MA-C3-CM1-*.json

Cycle 3 : phrases de 20 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
Figures : unités de carreau, origine en haut à gauche, y vers le bas.
"""
from commun import bq, ecrire, q, source_referentiel as ref, vocabulaire


def figure(largeur, hauteur, *elements, quadrillage=True):
    return {'type': 'figure', 'largeur': largeur, 'hauteur': hauteur, 'quadrillage': quadrillage, 'elements': list(elements)}


COURS = {
    'MA-C3-CM1-LONG-01': dict(duree=6, essentiel=
        '1 km = 1 000 m. 1 m = 100 cm = 1 000 mm. 1 cm = 10 mm.\n'
        'Chaque unité vaut 10 fois l’unité juste plus petite.\n'
        'Pour convertir, on s’appuie sur ces relations.',
        parties=[
            ('Les unités', [
                {'type': 'tableau', 'titre': 'Unités de longueur', 'colonnes': ['Unité', 'En mètres'], 'lignes': [
                    ['kilomètre (km)', '1 000 m'], ['hectomètre (hm)', '100 m'], ['décamètre (dam)', '10 m'], ['mètre (m)', '1 m'],
                    ['décimètre (dm)', '0,1 m'], ['centimètre (cm)', '0,01 m'], ['millimètre (mm)', '0,001 m']]},
                {'type': 'piege', 'erreur': 'On croit que 1 km = 100 m.', 'correction': 'Kilo veut dire mille : 1 km = 1 000 m.'},
            ]),
            ('Convertir', [
                {'type': 'exemple-resolu', 'enonce': 'Convertis 3 km 250 m en mètres.', 'etapes': [
                    '3 km = 3 000 m.', '3 000 m + 250 m = 3 250 m.'],
                 'conclusion': '3 km 250 m = 3 250 m.'},
                {'type': 'exemple-resolu', 'enonce': 'Convertis 45 mm en centimètres.', 'etapes': [
                    '10 mm = 1 cm.', '45 mm, c’est 4 cm et 5 mm.'],
                 'conclusion': '45 mm = 4,5 cm.'},
                bq('2,5 m = … cm ?', ['250', '25', '2 500'], '1 m = 100 cm, donc 2,5 m = 250 cm.'),
            ]),
        ],
        a_toi=[
            q('1 200 m = … km ?', ['1,2', '12', '120'], '1 000 m = 1 km, il reste 200 m, soit 0,2 km.'),
            q('7 cm = … mm ?', ['70', '700', '0,7'], '1 cm = 10 mm.'),
            q('Quelle longueur est la plus grande ?', ['1 km', '900 m', '9 000 cm'], '9 000 cm = 90 m et 1 km = 1 000 m.'),
        ],
        sources=[ref('MA-C3-CM1-LONG-01', 'Unités de longueur')]),

    'MA-C3-CM1-LONG-02': dict(duree=6, essentiel=
        'Le périmètre d’un polygone est la longueur de son contour.\n'
        'On additionne les longueurs de tous ses côtés.\n'
        'Les côtés doivent être exprimés dans la même unité.',
        parties=[
            ('Calculer un périmètre', [
                vocabulaire(3, 'Périmètre'),
                {'type': 'visuel', 'visuel': figure(8, 6, {'forme': 'polygone', 'sommets': [[1, 1], [7, 1], [7, 5], [1, 5]]}),
                 'legende': 'Rectangle de 6 cm sur 4 cm : 6 + 4 + 6 + 4 = 20 cm.'},
                bq('Un carré a des côtés de 5 cm. Quel est son périmètre ?', ['20 cm', '25 cm', '10 cm'], '5 + 5 + 5 + 5 = 20.'),
            ]),
            ('Retrouver un côté', [
                {'type': 'exemple-resolu', 'enonce': 'Un triangle a un périmètre de 24 cm. Deux côtés mesurent 7 cm et 9 cm. Et le troisième ?', 'etapes': [
                    '7 + 9 = 16 cm.', '24 − 16 = 8 cm.'],
                 'conclusion': 'Le troisième côté mesure 8 cm.'},
                {'type': 'piege', 'erreur': 'On additionne des centimètres et des mètres.', 'correction': 'Convertis d’abord : 1 m 20 cm = 120 cm.'},
            ]),
        ],
        a_toi=[
            q('Rectangle de 8 m sur 3 m. Périmètre ?', ['22 m', '24 m', '11 m'], '8 + 3 + 8 + 3 = 22.'),
            q('Un carré a un périmètre de 28 cm. Son côté mesure :', ['7 cm', '14 cm', '4 cm'], '28 ÷ 4 = 7.'),
            q('Triangle de côtés 5 cm, 7 cm et 8 cm. Périmètre ?', ['20 cm', '15 cm', '280 cm'], '5 + 7 + 8 = 20.'),
        ],
        sources=[ref('MA-C3-CM1-LONG-02', 'Périmètre d’un polygone')]),

    'MA-C3-CM1-MAS-01': dict(duree=5, essentiel=
        '1 t = 1 000 kg. 1 kg = 1 000 g. 1 g = 1 000 mg.\n'
        'Un litre d’eau pèse environ 1 kg. Une petite voiture pèse environ 1 t.\n'
        'Pour convertir, on s’appuie sur ces relations.',
        parties=[
            ('Les unités', [
                {'type': 'tableau', 'titre': 'Unités de masse', 'colonnes': ['Unité', 'Équivaut à'], 'lignes': [
                    ['1 tonne (t)', '1 000 kg'], ['1 kilogramme (kg)', '1 000 g'], ['1 hectogramme (hg)', '100 g'], ['1 décagramme (dag)', '10 g'],
                    ['1 gramme (g)', '1 000 mg'], ['1 décigramme (dg)', '100 mg'], ['1 centigramme (cg)', '10 mg']]},
                {'type': 'piege', 'erreur': 'On croit que 1 kg = 100 g.', 'correction': 'Kilo veut dire mille : 1 kg = 1 000 g.'},
            ]),
            ('Convertir', [
                {'type': 'observe', 'consigne': 'Des conversions.', 'exemples': [
                    '2,4 kg = 2 400 g', '3 500 kg = 3,5 t', '750 g = 0,75 kg']},
                bq('500 g = … kg ?', ['0,5', '5', '50'], '500 g, c’est la moitié de 1 000 g.'),
            ]),
        ],
        a_toi=[
            q('2 t = … kg ?', ['2 000', '200', '20 000'], '1 t = 1 000 kg.'),
            q('1 g = … mg ?', ['1 000', '100', '10'], 'Milli veut dire un millième.'),
            q('Quelle masse convient pour un cartable ?', ['3 kg', '3 g', '3 t'], 'Un cartable pèse quelques kilogrammes.'),
        ],
        sources=[ref('MA-C3-CM1-MAS-01', 'Unités de masse')]),

    'MA-C3-CM1-CONT-01': dict(duree=5, essentiel=
        '1 L = 10 dL = 100 cL = 1 000 mL.\n'
        '1 hL = 100 L et 1 daL = 10 L.\n'
        'Une canette contient 33 cL. Une bouteille d’eau contient souvent 1,5 L.',
        parties=[
            ('Les unités', [
                {'type': 'tableau', 'titre': 'Unités de contenance', 'colonnes': ['Unité', 'Équivaut à'], 'lignes': [
                    ['1 hectolitre (hL)', '100 L'], ['1 décalitre (daL)', '10 L'], ['1 litre (L)', '1 000 mL'], ['1 décilitre (dL)', '100 mL'], ['1 centilitre (cL)', '10 mL']]},
                {'type': 'piege', 'erreur': 'On croit que 1 L = 100 mL.', 'correction': '1 L = 1 000 mL. C’est 1 L = 100 cL.'},
            ]),
            ('Convertir', [
                {'type': 'observe', 'consigne': 'Des conversions.', 'exemples': [
                    '75 cL = 0,75 L', '2,5 hL = 250 L', '1,5 L = 150 cL']},
                bq('1 L = … cL ?', ['100', '10', '1 000'], 'Centi veut dire un centième.'),
            ]),
        ],
        a_toi=[
            q('Une canette contient environ :', ['33 cL', '33 L', '33 mL'], '33 cL = 0,33 L.'),
            q('3 hL = … L ?', ['300', '30', '3 000'], '1 hL = 100 L.'),
            q('250 mL = … L ?', ['0,25', '2,5', '25'], '1 000 mL = 1 L.'),
        ],
        sources=[ref('MA-C3-CM1-CONT-01', 'Unités de contenance')]),

    'MA-C3-CM1-AIRE-01': dict(duree=6, essentiel=
        'L’aire d’une figure mesure la surface qu’elle occupe.\n'
        'Un carré de 1 cm de côté a une aire de 1 cm².\n'
        'Pour trouver l’aire, on compte les carreaux de 1 cm² qui la recouvrent.',
        parties=[
            ('Compter les carreaux', [
                vocabulaire(3, 'Aire'),
                {'type': 'visuel', 'visuel': figure(5, 5, {'forme': 'polygone', 'plein': True, 'sommets': [[1, 1], [4, 1], [4, 2], [3, 2], [3, 4], [1, 4]]}),
                 'legende': 'Cette figure recouvre 7 carreaux de 1 cm² : son aire est 7 cm².'},
                bq('Un rectangle couvre 5 carreaux sur 2. Son aire ?', ['10 cm²', '7 cm²', '14 cm²'], '2 rangées de 5 carreaux.'),
            ]),
            ('Aire ou périmètre ?', [
                {'type': 'explique', 'texte': 'L’aire compte les carreaux à l’intérieur. Le périmètre mesure le tour. Deux figures peuvent avoir la même aire et des périmètres différents.'},
                {'type': 'piege', 'erreur': 'On confond aire et périmètre.', 'correction': 'L’aire s’écrit en cm², le périmètre en cm.'},
            ]),
        ],
        a_toi=[
            q('Un carré de 1 cm de côté a une aire de :', ['1 cm²', '4 cm²', '1 cm'], 'C’est l’unité d’aire.'),
            q('Deux figures recouvrent chacune 8 carreaux. Elles ont :', ['la même aire', 'forcément le même périmètre', 'des aires différentes'], 'Même nombre de carreaux, même aire.'),
            q('Un rectangle de 4 carreaux sur 3 a une aire de :', ['12 cm²', '14 cm²', '7 cm²'], '3 rangées de 4.'),
        ],
        sources=[ref('MA-C3-CM1-AIRE-01', 'Aires en centimètres carrés')]),

    'MA-C3-CM1-DUR-01': dict(duree=7, essentiel=
        '1 h = 60 min et 1 min = 60 s.\n'
        '135 min = 120 min + 15 min = 2 h 15 min.\n'
        'Pour une durée, on compte de l’heure de début jusqu’à l’heure de fin.',
        parties=[
            ('Convertir', [
                {'type': 'observe', 'consigne': 'Une heure compte 60 minutes, pas 100.', 'exemples': [
                    '90 min = 1 h 30 min', '135 min = 2 h 15 min', '1 h 45 min = 105 min']},
                {'type': 'piege', 'erreur': 'On calcule 16 h 20 − 14 h 45 comme 16,20 − 14,45.', 'correction': 'Une heure a 60 minutes : on compte par étapes.'},
            ]),
            ('Calculer une durée', [
                {'type': 'visuel', 'visuel': {'type': 'horloge', 'heures': 14, 'minutes': 45}, 'legende': 'Le film commence à 14 h 45.'},
                {'type': 'exemple-resolu', 'enonce': 'Un film commence à 14 h 45 et finit à 16 h 20. Quelle est sa durée ?', 'etapes': [
                    'De 14 h 45 à 15 h : 15 min.', 'De 15 h à 16 h 20 : 1 h 20 min.', '15 min + 1 h 20 min = 1 h 35 min.'],
                 'conclusion': 'Le film dure 1 h 35 min.'},
                bq('Départ à 9 h 50, trajet de 1 h 25 min. Arrivée ?', ['11 h 15', '10 h 75', '10 h 15'], '9 h 50 + 10 min = 10 h, puis + 1 h 15 min.'),
            ]),
        ],
        a_toi=[
            q('2 h = … min ?', ['120', '200', '60'], '2 × 60 = 120.'),
            q('De 10 h 40 à 11 h 15, combien de temps ?', ['35 min', '75 min', '45 min'], '20 min jusqu’à 11 h, puis 15 min.'),
            q('Départ 8 h 30, trajet 45 min. Arrivée ?', ['9 h 15', '8 h 75', '9 h 05'], '8 h 30 + 30 min = 9 h, puis + 15 min.'),
        ],
        sources=[ref('MA-C3-CM1-DUR-01', 'Durées en heures et minutes')]),

    'MA-C3-CM1-GEO-01': dict(duree=6, essentiel=
        'Le cercle est l’ensemble des points situés à la même distance du centre.\n'
        'Cette distance est le rayon. Le diamètre vaut deux rayons.\n'
        'Le disque est la surface délimitée par le cercle, cercle compris.',
        parties=[
            ('Le vocabulaire', [
                vocabulaire(3, 'Cercle', 'Centre', 'Rayon', 'Diamètre', 'Disque'),
                {'type': 'visuel', 'visuel': figure(8, 8,
                    {'forme': 'cercle', 'centre': [4, 4], 'rayon': 3},
                    {'forme': 'point', 'en': [4, 4], 'nom': 'O'},
                    {'forme': 'segment', 'de': [4, 4], 'a': [7, 4], 'accent': True}),
                 'legende': 'Cercle de centre O. Le segment coloré est un rayon de 3 cm.'},
                bq('Un cercle a un rayon de 6 cm. Son diamètre ?', ['12 cm', '3 cm', '6 cm'], 'Le diamètre vaut deux rayons.'),
            ]),
            ('Tracer au compas', [
                {'type': 'methode', 'titre': 'Pour tracer un cercle', 'etapes': [
                    'Écarte le compas de la longueur du rayon, sur la règle.', 'Pique la pointe sur le centre.', 'Tourne sans changer l’écartement.']},
                {'type': 'piege', 'erreur': 'On confond rayon et diamètre.', 'correction': 'Le diamètre traverse le cercle en passant par le centre : il vaut deux rayons.'},
            ]),
        ],
        a_toi=[
            q('Un diamètre mesure 9 cm. Le rayon mesure :', ['4,5 cm', '18 cm', '9 cm'], '9 ÷ 2 = 4,5.'),
            q('Les points du cercle sont tous :', ['à la même distance du centre', 'au centre', 'hors du disque'], 'C’est la définition du cercle.'),
            q('Pour tracer un cercle de rayon 5 cm, on écarte le compas de :', ['5 cm', '10 cm', '2,5 cm'], 'L’écartement est le rayon.'),
        ],
        sources=[ref('MA-C3-CM1-GEO-01', 'Cercle et disque')]),

    'MA-C3-CM1-GEO-02': dict(duree=6, essentiel=
        'Deux droites perpendiculaires se coupent en formant un angle droit.\n'
        'Deux droites parallèles ne se coupent jamais : leur écart reste le même.\n'
        'On vérifie un angle droit avec l’équerre.',
        parties=[
            ('Perpendiculaires', [
                {'type': 'visuel', 'visuel': figure(8, 6,
                    {'forme': 'droite', 'de': [0, 4], 'a': [8, 4], 'nom': 'd'},
                    {'forme': 'droite', 'de': [4, 0], 'a': [4, 6], 'nom': 'e'}),
                 'legende': 'Les droites d et e sont perpendiculaires : elles forment un angle droit.'},
                {'type': 'methode', 'titre': 'Pour vérifier avec l’équerre', 'etapes': [
                    'Place l’angle droit de l’équerre au point où les droites se coupent.', 'Pose un côté de l’équerre le long d’une droite.', 'Si l’autre droite suit l’autre côté, l’angle est droit.']},
            ]),
            ('Parallèles', [
                {'type': 'visuel', 'visuel': figure(8, 5,
                    {'forme': 'droite', 'de': [0, 1], 'a': [8, 1], 'nom': 'd'},
                    {'forme': 'droite', 'de': [0, 4], 'a': [8, 4], 'nom': 'f'}),
                 'legende': 'Les droites d et f sont parallèles : l’écart reste de 3 carreaux.'},
                {'type': 'piege', 'erreur': 'On croit que deux droites qui ne se coupent pas sur le dessin sont parallèles.', 'correction': 'Prolonge-les : elles se coupent peut-être plus loin.'},
                bq('Les rails d’un train sont :', ['parallèles', 'perpendiculaires', 'sécants'], 'Leur écart reste le même.'),
            ]),
        ],
        a_toi=[
            q('Deux droites perpendiculaires forment :', ['un angle droit', 'aucun angle', 'un angle aigu'], 'C’est la définition.'),
            q('Pour vérifier un angle droit, on utilise :', ['l’équerre', 'le compas', 'la gomme'], 'L’équerre a un angle droit.'),
            q('Deux bords opposés d’une feuille sont :', ['parallèles', 'perpendiculaires', 'sécants'], 'Ils ne se coupent jamais.'),
        ],
        sources=[ref('MA-C3-CM1-GEO-02', 'Perpendiculaires et parallèles')]),

    'MA-C3-CM1-GEO-03': dict(duree=7, essentiel=
        'Triangle rectangle : un angle droit. Isocèle : deux côtés égaux. Équilatéral : trois côtés égaux.\n'
        'Rectangle : quatre angles droits. Losange : quatre côtés égaux.\n'
        'Carré : quatre côtés égaux et quatre angles droits.',
        parties=[
            ('Les triangles', [
                {'type': 'visuel', 'visuel': figure(7, 6, {'forme': 'polygone', 'sommets': [[1, 1], [1, 5], [6, 5]]}),
                 'legende': 'Un triangle rectangle : un angle droit en bas à gauche.'},
                {'type': 'tableau', 'titre': 'Les triangles', 'colonnes': ['Triangle', 'Il a'], 'lignes': [
                    ['rectangle', 'un angle droit'], ['isocèle', 'deux côtés de même longueur'], ['équilatéral', 'trois côtés de même longueur']]},
                bq('Un triangle avec trois côtés égaux est :', ['équilatéral', 'rectangle', 'isocèle seulement'], 'Équi : égal. Latéral : côté.'),
            ]),
            ('Les quadrilatères', [
                {'type': 'visuel', 'visuel': figure(8, 8, {'forme': 'polygone', 'sommets': [[4, 1], [6, 4], [4, 7], [2, 4]]}),
                 'legende': 'Un losange : quatre côtés de même longueur.'},
                {'type': 'tableau', 'titre': 'Les quadrilatères', 'colonnes': ['Figure', 'Côtés', 'Angles'], 'lignes': [
                    ['rectangle', 'opposés de même longueur', '4 angles droits'], ['losange', '4 côtés égaux', 'pas forcément droits'], ['carré', '4 côtés égaux', '4 angles droits']]},
                {'type': 'piege', 'erreur': 'On croit qu’un carré n’est pas un rectangle.', 'correction': 'Un carré a 4 angles droits : c’est un rectangle particulier. C’est aussi un losange.'},
            ]),
        ],
        a_toi=[
            q('Un quadrilatère à quatre côtés égaux est :', ['un losange', 'un rectangle', 'un triangle'], 'C’est la définition du losange.'),
            q('Un rectangle a toujours :', ['4 angles droits', '4 côtés égaux', '3 côtés'], 'C’est la définition du rectangle.'),
            q('Un triangle avec deux côtés égaux est :', ['isocèle', 'équilatéral', 'rectangle'], 'Iso veut dire égal.'),
        ],
        sources=[ref('MA-C3-CM1-GEO-03', 'Triangles et quadrilatères')]),

    'MA-C3-CM1-SYM-01': dict(duree=6, essentiel=
        'Une figure a un axe de symétrie si, pliée selon cet axe, ses deux moitiés se superposent.\n'
        'Un rectangle a 2 axes, un carré 4, un cercle une infinité.\n'
        'Le symétrique d’une case est à la même distance de l’axe, de l’autre côté.',
        parties=[
            ('Combien d’axes ?', [
                vocabulaire(3, 'Axe de symétrie'),
                {'type': 'tableau', 'titre': 'Axes de symétrie', 'colonnes': ['Figure', 'Nombre d’axes'], 'lignes': [
                    ['triangle isocèle', '1'], ['rectangle', '2'], ['losange', '2'], ['triangle équilatéral', '3'], ['carré', '4'], ['cercle', 'une infinité']]},
                {'type': 'piege', 'erreur': 'On croit que la diagonale d’un rectangle est un axe de symétrie.', 'correction': 'Plie selon la diagonale : les deux moitiés ne se superposent pas.'},
            ]),
            ('Le symétrique d’une case', [
                {'type': 'visuel', 'visuel': figure(8, 5,
                    {'forme': 'axe', 'de': [4, 0], 'a': [4, 5]},
                    {'forme': 'case', 'colonne': 1, 'ligne': 2, 'accent': True},
                    {'forme': 'case', 'colonne': 6, 'ligne': 2}),
                 'legende': 'La case foncée est à 2 carreaux à gauche de l’axe. Son symétrique est à 2 carreaux à droite.'},
                bq('Une case est à 3 carreaux à gauche de l’axe. Son symétrique est :', ['à 3 carreaux à droite', 'à 6 carreaux à droite', 'sur l’axe'], 'Même distance, de l’autre côté.'),
            ]),
        ],
        a_toi=[
            q('Combien d’axes de symétrie a un carré ?', ['4', '2', '1'], 'Deux médianes et deux diagonales.'),
            q('La lettre A majuscule a :', ['un axe vertical', 'aucun axe', 'deux axes'], 'Ses deux moitiés gauche et droite se superposent.'),
            q('Un rectangle non carré a :', ['2 axes', '4 axes', 'aucun axe'], 'Les deux médianes seulement.'),
        ],
        sources=[ref('MA-C3-CM1-SYM-01', 'Axes de symétrie')]),

    'MA-C3-CM1-SOL-01': dict(duree=7, essentiel=
        'Un prisme droit a deux bases identiques et des faces latérales rectangulaires.\n'
        'Une pyramide a une base et des faces triangulaires qui se rejoignent au sommet.\n'
        'Un patron du cube est formé de 6 carrés qui, une fois pliés, ferment le cube.',
        parties=[
            ('Prismes et pyramides', [
                vocabulaire(3, 'Prisme droit'),
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'prisme-triangulaire'}, 'legende': 'Un prisme droit à base triangulaire.'},
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'pyramide'}, 'legende': 'Une pyramide à base carrée.'},
                {'type': 'tableau', 'titre': 'Faces, arêtes, sommets', 'colonnes': ['Solide', 'Faces', 'Arêtes', 'Sommets'], 'lignes': [
                    ['cube', '6', '12', '8'], ['prisme à base triangulaire', '5', '9', '6'], ['pyramide à base carrée', '5', '8', '5']]},
            ]),
            ('Le patron du cube', [
                {'type': 'explique', 'texte': 'Un patron se découpe et se plie pour fabriquer le solide. Le cube a 11 patrons différents.'},
                {'type': 'piege', 'erreur': 'On croit que 6 carrés collés font toujours un patron du cube.', 'correction': 'Six carrés en ligne, par exemple, ne se referment pas.'},
                bq('Combien de carrés dans un patron du cube ?', ['6', '4', '8'], 'Un carré par face.'),
            ]),
        ],
        a_toi=[
            q('Combien d’arêtes a un cube ?', ['12', '8', '6'], '4 en haut, 4 en bas, 4 verticales.'),
            q('Les faces latérales d’une pyramide sont des :', ['triangles', 'rectangles', 'cercles'], 'Elles se rejoignent au sommet.'),
            q('Un prisme à base triangulaire a :', ['5 faces', '6 faces', '3 faces'], '2 bases et 3 faces latérales.'),
        ],
        sources=[ref('MA-C3-CM1-SOL-01', 'Prismes, pyramides, patrons')]),

    'MA-C3-CM1-ANG-01': dict(duree=6, essentiel=
        'Un angle droit se vérifie avec l’équerre.\n'
        'Un angle aigu est plus petit qu’un angle droit. Un angle obtus est plus grand.\n'
        'La taille d’un angle dépend de son ouverture, pas de la longueur de ses côtés.',
        parties=[
            ('Aigu, droit, obtus', [
                {'type': 'visuel', 'visuel': figure(8, 6, {'forme': 'segment', 'de': [1, 5], 'a': [7, 5]}, {'forme': 'segment', 'de': [1, 5], 'a': [6, 1]}, quadrillage=False),
                 'legende': 'Un angle aigu : plus fermé qu’un angle droit.'},
                {'type': 'visuel', 'visuel': figure(8, 6, {'forme': 'segment', 'de': [4, 5], 'a': [8, 5]}, {'forme': 'segment', 'de': [4, 5], 'a': [1, 1]}, quadrillage=False),
                 'legende': 'Un angle obtus : plus ouvert qu’un angle droit.'},
                bq('Un angle plus grand qu’un angle droit est :', ['obtus', 'aigu', 'droit'], 'Obtus : plus ouvert.'),
            ]),
            ('Nommer et comparer', [
                {'type': 'explique', 'texte': 'On nomme un angle avec trois lettres, le sommet au milieu. L’angle ABC a pour sommet B.'},
                {'type': 'piege', 'erreur': 'On croit qu’un angle aux longs côtés est plus grand.', 'correction': 'Seule l’ouverture compte. On peut prolonger les côtés sans changer l’angle.'},
            ]),
        ],
        a_toi=[
            q('Dans l’angle ABC, le sommet est :', ['B', 'A', 'C'], 'La lettre du milieu.'),
            q('Un angle aigu est :', ['plus petit qu’un angle droit', 'plus grand qu’un angle droit', 'toujours droit'], 'Aigu : plus fermé.'),
            q('Le coin d’une feuille forme un angle :', ['droit', 'aigu', 'obtus'], 'L’équerre s’y ajuste exactement.'),
        ],
        sources=[ref('MA-C3-CM1-ANG-01', 'Les angles')]),

    'MA-C3-CM1-ESP-01': dict(duree=5, essentiel=
        'Un déplacement se décrit par une suite d’instructions.\n'
        'Par exemple : avance de 3 cases, tourne à droite, avance de 2 cases.\n'
        'Pour tourner, on se met à la place de celui qui se déplace.',
        parties=[
            ('Suivre un trajet', [
                {'type': 'visuel', 'visuel': figure(6, 6,
                    {'forme': 'segment', 'de': [1, 5], 'a': [1, 3], 'accent': True},
                    {'forme': 'segment', 'de': [1, 3], 'a': [4, 3], 'accent': True},
                    {'forme': 'point', 'en': [1, 5], 'nom': 'D'},
                    {'forme': 'point', 'en': [4, 3], 'nom': 'A'}),
                 'legende': 'De D : avance de 2 vers le haut, tourne à droite, avance de 3. Arrivée en A.'},
                bq('Le robot regarde vers le nord et tourne à droite. Il regarde vers :', ['l’est', 'l’ouest', 'le sud'], 'À droite du nord, c’est l’est.'),
            ]),
            ('Écrire les instructions', [
                {'type': 'methode', 'titre': 'Pour écrire un programme de déplacement', 'etapes': [
                    'Repère le départ et la direction du regard.', 'Écris chaque avancée en nombre de cases.', 'Indique chaque quart de tour : à droite ou à gauche.']},
                {'type': 'piege', 'erreur': 'On tourne selon sa propre droite, pas celle du robot.', 'correction': 'Mets-toi à la place du robot : sa droite dépend de là où il regarde.'},
            ]),
        ],
        a_toi=[
            q('Le robot regarde vers l’est et tourne à gauche. Il regarde vers :', ['le nord', 'le sud', 'l’ouest'], 'À gauche de l’est, c’est le nord.'),
            q('Deux quarts de tour à droite, c’est :', ['un demi-tour', 'un tour complet', 'rien du tout'], 'Le robot regarde dans l’autre sens.'),
            q('Le robot avance de 4 cases puis recule de 1. Il est à :', ['3 cases du départ', '5 cases', '1 case'], '4 − 1 = 3.'),
        ],
        sources=[ref('MA-C3-CM1-ESP-01', 'Décrire un déplacement')]),

    'MA-C3-CM1-DATA-01': dict(duree=7, essentiel=
        'Un tableau à double entrée se lit au croisement d’une ligne et d’une colonne.\n'
        'Dans un diagramme en barres, la hauteur de chaque barre donne la valeur.\n'
        'Une courbe montre comment une grandeur évolue, par exemple au fil des heures.',
        parties=[
            ('Tableau à double entrée', [
                {'type': 'tableau', 'titre': 'Les élèves de CM1', 'colonnes': ['Classe', 'Filles', 'Garçons'], 'lignes': [
                    ['CM1 A', '13', '12'], ['CM1 B', '11', '14']]},
                bq('Combien de garçons en CM1 B ?', ['14', '11', '25'], 'Ligne CM1 B, colonne Garçons.'),
            ]),
            ('Diagramme en barres', [
                {'type': 'visuel', 'visuel': {'type': 'diagramme', 'titre': 'Livres empruntés à la bibliothèque', 'unite': 'livres', 'pas': 2, 'barres': [
                    {'nom': 'lundi', 'valeur': 12}, {'nom': 'mardi', 'valeur': 8}, {'nom': 'jeudi', 'valeur': 15}, {'nom': 'vendredi', 'valeur': 10}]},
                 'legende': 'Chaque barre donne le nombre de livres du jour.'},
                {'type': 'exemple-resolu', 'enonce': 'Combien de livres de plus le jeudi que le mardi ?', 'etapes': [
                    'Jeudi : 15. Mardi : 8.', '15 − 8 = 7.'],
                 'conclusion': '7 livres de plus le jeudi.'},
                {'type': 'piege', 'erreur': 'On lit la barre sans regarder les graduations.', 'correction': 'Vérifie de combien en combien avance l’axe : ici de 2 en 2.'},
            ]),
        ],
        a_toi=[
            q('Combien d’élèves en CM1 A ?', ['25', '24', '13'], '13 + 12 = 25.'),
            q('Quel jour compte le plus d’emprunts ?', ['jeudi', 'lundi', 'mardi'], 'C’est la barre la plus haute.'),
            q('Lundi et vendredi ensemble :', ['22', '20', '27'], '12 + 10 = 22.'),
        ],
        sources=[ref('MA-C3-CM1-DATA-01', 'Tableaux, diagrammes, courbes')]),

    'MA-C3-CM1-PROBA-01': dict(duree=5, essentiel=
        'Un évènement impossible ne peut pas arriver. Un évènement certain arrive à coup sûr.\n'
        'Un évènement possible peut arriver ou non.\n'
        'Avec une pièce, « pile » a une chance sur deux.',
        parties=[
            ('Impossible, possible, certain', [
                vocabulaire(3, 'Probabilité'),
                {'type': 'visuel', 'visuel': {'type': 'urne', 'boules': [{'couleur': 'rouge', 'nombre': 3}, {'couleur': 'bleue', 'nombre': 1}]},
                 'legende': '3 boules rouges et 1 bleue.'},
                {'type': 'tableau', 'titre': 'On tire une boule de cette urne', 'colonnes': ['Évènement', 'Il est'], 'lignes': [
                    ['tirer une boule verte', 'impossible'], ['tirer une boule rouge ou bleue', 'certain'], ['tirer une boule rouge', 'possible et probable'], ['tirer une boule bleue', 'possible, peu probable']]},
            ]),
            ('Le dé et la pièce', [
                {'type': 'observe', 'consigne': 'Avec un dé de 1 à 6.', 'exemples': [
                    'Obtenir 7 : impossible.', 'Obtenir un nombre pair : une chance sur deux.', 'Obtenir moins de 7 : certain.']},
                {'type': 'piege', 'erreur': 'On croit qu’après trois « face », « pile » est plus probable.', 'correction': 'La pièce n’a pas de mémoire : toujours une chance sur deux.'},
            ]),
        ],
        a_toi=[
            q('Obtenir 0 avec un dé de 1 à 6 est :', ['impossible', 'possible', 'certain'], 'Le 0 n’est sur aucune face.'),
            q('Obtenir 6 avec ce dé est :', ['possible', 'certain', 'impossible'], 'Une face sur six.'),
            q('Dans l’urne, tirer une rouge est :', ['plus probable que tirer une bleue', 'moins probable', 'impossible'], '3 rouges contre 1 bleue.'),
        ],
        sources=[ref('MA-C3-CM1-PROBA-01', 'Vocabulaire des probabilités')]),
}

ecrire(COURS)
