"""Lot de cours : maths 6e, grandeurs, géométrie, espace, données et probabilités.

    python3 scripts/cours/lot-6e-maths-geometrie.py

Cycle 3 : phrases de 20 mots au plus. Les pages des extraits sont retrouvées ensuite dans les PDF archivés.
"""
from commun import bq, ecrire, q, src, vocabulaire

BO = 'bo16-2025-maths-c3'


def figure(largeur, hauteur, *elements, quadrillage=False):
    return {'type': 'figure', 'largeur': largeur, 'hauteur': hauteur, 'quadrillage': quadrillage, 'elements': list(elements)}


def pt(x, y, nom=None):
    e = {'forme': 'point', 'en': [x, y]}
    if nom:
        e['nom'] = nom
    return e


def seg(a, b, accent=False):
    e = {'forme': 'segment', 'de': list(a), 'a': list(b)}
    if accent:
        e['accent'] = True
    return e


COURS = {
    'MA-C3-6E-LONG-01': dict(duree=8, essentiel=
        'Les unités de longueur vont de 10 en 10 : km, hm, dam, m, dm, cm, mm.\n'
        'Kilo veut dire mille, centi veut dire centième, milli veut dire millième.\n'
        '3,5 m = 350 cm, car 1 m = 100 cm.',
        parties=[
            ('Les préfixes', [
                {'type': 'tableau', 'titre': 'Le mètre, ses multiples et ses sous-multiples', 'colonnes': ['Unité', 'Préfixe', 'En mètres'], 'lignes': [
                    ['km', 'kilo = mille', '1 000 m'], ['hm', 'hecto = cent', '100 m'], ['dam', 'déca = dix', '10 m'], ['m', '', '1 m'],
                    ['dm', 'déci = dixième', '0,1 m'], ['cm', 'centi = centième', '0,01 m'], ['mm', 'milli = millième', '0,001 m']]},
                {'type': 'explique', 'texte': 'D’une unité à la suivante, on multiplie ou on divise par 10. Ainsi 1 dm = 10 cm et 1 cm = 0,1 dm.'},
                bq('Combien de mètres dans 1 hm ?', ['100', '10', '1 000'], 'Hecto veut dire cent.'),
            ]),
            ('Convertir', [
                {'type': 'methode', 'titre': 'Pour convertir 3,5 m en cm', 'etapes': [
                    'Écris la relation : 1 m = 100 cm.',
                    'Multiplie : 3,5 × 100 = 350.',
                    '3,5 m = 350 cm.']},
                {'type': 'exemple-resolu', 'enonce': 'Convertis 2 450 mm en mètres.', 'etapes': [
                    '1 mm = 0,001 m, donc on divise par 1 000.', '2 450 ÷ 1 000 = 2,45.'],
                 'conclusion': '2 450 mm = 2,45 m'},
                {'type': 'piege', 'erreur': 'On multiplie quand on passe à une unité plus grande : 2 450 mm = 2 450 000 m.', 'correction': 'Une unité plus grande donne un nombre plus petit. On divise.'},
                bq('Combien font 0,8 km en mètres ?', ['800 m', '80 m', '8 000 m'], '0,8 × 1 000 = 800.'),
            ]),
        ],
        a_toi=[
            q('Combien font 45 cm en mètres ?', ['0,45 m', '4,5 m', '4 500 m'], '45 ÷ 100 = 0,45.'),
            q('Combien font 1,2 m en millimètres ?', ['1 200 mm', '120 mm', '12 mm'], '1,2 × 1 000 = 1 200.'),
            q('Quelle longueur est la plus grande ?', ['3 km', '2 500 m', '29 hm'], '3 km = 3 000 m ; 29 hm = 2 900 m.'),
        ],
        sources=[src(BO, 'L’élève sait convertir en mètre une longueur donnée dans une autre unité, multiple ou sous-multiple du mètre.', 'Convertir en mètre'),
                 src(BO, 'L’élève connaît les significations des préfixes allant du kilo- au milli-, ainsi que les relations entre le mètre, ses multiples et ses', 'Préfixes')]),

    'MA-C3-6E-LONG-02': dict(duree=9, essentiel=
        'Le périmètre est la longueur du contour.\n'
        'Carré de côté c : P = 4 × c. Rectangle : P = 2 × (L + l).\n'
        'Disque de diamètre d : P = π × d, avec π ≈ 3,14.',
        parties=[
            ('Carré et rectangle', [
                vocabulaire(3, 'Périmètre'),
                {'type': 'tableau', 'titre': 'Formules', 'colonnes': ['Figure', 'Périmètre', 'Exemple'], 'lignes': [
                    ['carré de côté 5 cm', '4 × c', '4 × 5 = 20 cm'], ['rectangle 7 cm sur 3 cm', '2 × (L + l)', '2 × (7 + 3) = 20 cm']]},
                bq('Périmètre d’un carré de côté 2,5 cm ?', ['10 cm', '6,25 cm', '5 cm'], '4 × 2,5 = 10.'),
            ]),
            ('Le disque', [
                {'type': 'visuel', 'visuel': figure(9, 7, {'forme': 'cercle', 'centre': [4.5, 3.5], 'rayon': 3}, seg((1.5, 3.5), (7.5, 3.5), accent=True), pt(4.5, 3.5, 'O')), 'legende': 'Le diamètre traverse le disque en passant par le centre O.'},
                {'type': 'explique', 'texte': 'Le périmètre d’un disque est proportionnel à son diamètre. Le coefficient s’appelle **π** (pi). Il vaut environ 3,14.'},
                {'type': 'methode', 'titre': 'Pour calculer le périmètre d’un disque', 'etapes': [
                    'Trouve le diamètre. Si on te donne le rayon, double-le.',
                    'Multiplie par π ≈ 3,14.',
                    'Diamètre 10 cm : 10 × 3,14 = 31,4 cm environ.']},
                {'type': 'piege', 'erreur': 'On multiplie le rayon par 3,14.', 'correction': 'La formule utilise le diamètre. Avec le rayon, on calcule 2 × π × r.'},
                bq('Périmètre d’un disque de rayon 5 cm ?', ['31,4 cm environ', '15,7 cm environ', '78,5 cm environ'], 'Diamètre 10 cm, donc 10 × 3,14.'),
            ]),
            ('Figures composées', [
                {'type': 'exemple-resolu', 'enonce': 'Un demi-disque de diamètre 4 cm. Quel est son périmètre ?', 'etapes': [
                    'Arc : moitié du cercle, 4 × 3,14 ÷ 2 = 6,28 cm.', 'On ajoute le diamètre : 6,28 + 4.'],
                 'conclusion': 'Le périmètre est 10,28 cm environ.'},
            ]),
        ],
        a_toi=[
            q('Périmètre d’un rectangle de 8 cm sur 2 cm ?', ['20 cm', '16 cm', '10 cm'], '2 × (8 + 2) = 20.'),
            q('Périmètre d’un disque de diamètre 2 m ?', ['6,28 m environ', '3,14 m environ', '12,56 m environ'], '2 × 3,14 = 6,28.'),
            q('Un carré a un périmètre de 36 cm. Son côté ?', ['9 cm', '6 cm', '18 cm'], '36 ÷ 4 = 9.'),
        ],
        sources=[src(BO, 'Calculer le périmètre d’un disque', 'Périmètre du disque'),
                 src(BO, 'Savoir que le périmètre du disque est proportionnel à son diamètre', 'Proportionnalité au diamètre')]),

    'MA-C3-6E-AIRE-01': dict(duree=9, essentiel=
        'L’aire mesure une surface. 1 cm² est l’aire d’un carré de 1 cm de côté.\n'
        'Rectangle : A = L × l. Carré : A = c × c.\n'
        '1 m² = 100 dm² et 1 dm² = 100 cm².',
        parties=[
            ('Compter les carreaux', [
                vocabulaire(3, 'Aire'),
                {'type': 'visuel', 'visuel': {'type': 'grille', 'lignes': 4, 'colonnes': 7, 'coloriees': 28}, 'legende': 'Un rectangle de 7 cm sur 4 cm : 28 carreaux de 1 cm².'},
                {'type': 'explique', 'texte': '4 rangées de 7 carreaux : 4 × 7 = 28. L’aire est 28 cm². C’est pourquoi on multiplie longueur et largeur.'},
                bq('Aire d’un carré de 6 cm de côté ?', ['36 cm²', '24 cm²', '12 cm²'], '6 × 6 = 36.'),
            ]),
            ('Convertir des aires', [
                {'type': 'observe', 'consigne': 'Un carré de 1 dm de côté.', 'exemples': [
                    '1 dm = 10 cm.', 'Il contient 10 rangées de 10 carrés de 1 cm².', '1 dm² = 100 cm².']},
                {'type': 'methode', 'titre': 'Pour convertir une aire', 'etapes': [
                    'Entre deux unités qui se suivent, le rapport est 100, pas 10.',
                    'Vers une unité plus petite : multiplie par 100.',
                    'Vers une unité plus grande : divise par 100.']},
                {'type': 'piege', 'erreur': 'On écrit 1 m² = 10 dm², comme pour les longueurs.', 'correction': '1 m² = 10 dm × 10 dm = 100 dm².'},
                bq('Combien font 3 dm² en cm² ?', ['300 cm²', '30 cm²', '3 000 cm²'], '3 × 100 = 300.'),
            ]),
            ('Aire et périmètre', [
                {'type': 'explique', 'texte': 'Deux figures peuvent avoir la même aire et des périmètres différents. Un carré de 4 cm et un rectangle de 8 cm sur 2 cm ont tous deux 16 cm².'},
            ]),
        ],
        a_toi=[
            q('Aire d’un rectangle de 12 m sur 5 m ?', ['60 m²', '34 m²', '17 m²'], '12 × 5 = 60.'),
            q('Combien font 250 cm² en dm² ?', ['2,5 dm²', '25 dm²', '25 000 dm²'], '250 ÷ 100 = 2,5.'),
            q('Un rectangle a une aire de 24 cm² et une largeur de 3 cm. Sa longueur ?', ['8 cm', '21 cm', '72 cm'], '3 × 8 = 24.'),
        ],
        sources=[src(BO, 'Calculer l’aire d’un carré ou d’un rectangle', 'Aire du carré et du rectangle'),
                 src(BO, 'Effectuer des conversions d’aire', 'Conversions d’aire')]),

    'MA-C3-6E-DUR-01': dict(duree=8, essentiel=
        '1 h = 60 min et 1 min = 60 s. 1 jour = 24 h.\n'
        'Pour convertir 150 min, on cherche combien de fois 60 : 150 = 2 × 60 + 30, soit 2 h 30 min.\n'
        'Pour calculer une durée, on avance par étapes jusqu’à l’heure ronde.',
        parties=[
            ('Convertir des durées', [
                {'type': 'tableau', 'titre': 'Relations entre unités', 'colonnes': ['Unité', 'Vaut'], 'lignes': [
                    ['1 jour', '24 h'], ['1 h', '60 min'], ['1 min', '60 s'], ['1 an', '365 jours, 366 si bissextile'], ['1 siècle', '100 ans']]},
                {'type': 'methode', 'titre': 'Pour convertir 150 min en heures et minutes', 'etapes': [
                    'Divise par 60 : 150 = 2 × 60 + 30.',
                    'Le quotient donne les heures : 2 h.',
                    'Le reste donne les minutes : 30 min.']},
                {'type': 'piege', 'erreur': 'On écrit 1,5 h = 1 h 50 min.', 'correction': '0,5 h est une demi-heure, soit 30 min. Donc 1,5 h = 1 h 30 min.'},
                bq('Combien font 3 h 15 min en minutes ?', ['195 min', '315 min', '180 min'], '3 × 60 + 15 = 195.'),
            ]),
            ('Calculer une durée ou un horaire', [
                {'type': 'exemple-resolu', 'enonce': 'Un film commence à 20 h 45 et dure 1 h 50 min. À quelle heure finit-il ?', 'etapes': [
                    '20 h 45 + 1 h = 21 h 45.', '21 h 45 + 15 min = 22 h.', 'Il reste 35 min : 22 h 35.'],
                 'conclusion': 'Le film finit à 22 h 35.'},
                {'type': 'exemple-resolu', 'enonce': 'Durée entre 9 h 40 et 11 h 15 ?', 'etapes': [
                    'De 9 h 40 à 10 h : 20 min.', 'De 10 h à 11 h : 1 h.', 'De 11 h à 11 h 15 : 15 min.'],
                 'conclusion': '1 h 35 min.'},
                bq('Il est 14 h 50. Quelle heure sera-t-il dans 25 min ?', ['15 h 15', '14 h 75', '15 h 25'], '14 h 50 + 10 min = 15 h, puis 15 min.'),
            ]),
        ],
        a_toi=[
            q('Combien font 200 s en minutes et secondes ?', ['3 min 20 s', '2 min 00 s', '3 min 33 s'], '200 = 3 × 60 + 20.'),
            q('Durée entre 8 h 25 et 10 h 10 ?', ['1 h 45 min', '2 h 15 min', '1 h 85 min'], '35 min + 1 h + 10 min.'),
            q('Combien d’heures dans 3 jours ?', ['72 h', '36 h', '60 h'], '3 × 24 = 72.'),
        ],
        sources=[src(BO, 'Effectuer des calculs sur des horaires et des durées', 'Horaires et durées'),
                 src(BO, 'Convertir des durées', 'Convertir des durées')]),

    'MA-C3-6E-VOL-01': dict(duree=7, essentiel=
        'Le volume mesure la place occupée par un solide.\n'
        '1 cm³ est le volume d’un cube de 1 cm d’arête.\n'
        'Pour un pavé rempli de cubes de 1 cm³, on compte : couches × rangées × cubes par rangée.',
        parties=[
            ('Le centimètre cube', [
                vocabulaire(3, 'Volume'),
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'cube'}, 'legende': 'Un cube de 1 cm d’arête a un volume de 1 cm³.'},
                {'type': 'explique', 'texte': 'Un morceau de sucre a un volume d’environ 1 cm³. Un dé à jouer aussi.'},
            ]),
            ('Dénombrer des cubes', [
                {'type': 'observe', 'consigne': 'Un pavé est fait de cubes de 1 cm³.', 'exemples': [
                    'Chaque rangée a 4 cubes.', 'Chaque couche a 3 rangées : 12 cubes.', 'Il y a 2 couches : 24 cubes.', 'Volume : 24 cm³.']},
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'pave'}, 'legende': 'Un pavé de 4 cm sur 3 cm sur 2 cm contient 24 cubes de 1 cm³.'},
                {'type': 'methode', 'titre': 'Pour trouver le volume d’un assemblage', 'etapes': [
                    'Compte les cubes d’une rangée.',
                    'Compte les rangées d’une couche.',
                    'Compte les couches.',
                    'Multiplie les trois nombres.']},
                {'type': 'piege', 'erreur': 'On ne compte que les cubes visibles.', 'correction': 'Les cubes cachés à l’intérieur comptent aussi. On calcule couche par couche.'},
                bq('Un pavé de 5 cubes sur 2 cubes sur 3 cubes. Volume ?', ['30 cm³', '10 cm³', '15 cm³'], '5 × 2 × 3 = 30.'),
            ]),
        ],
        a_toi=[
            q('Un cube de 3 cubes d’arête. Combien de cubes de 1 cm³ ?', ['27', '9', '12'], '3 × 3 × 3 = 27.'),
            q('Quel solide a le plus grand volume ?', ['20 cubes de 1 cm³', '18 cubes de 1 cm³', '2 cubes de 1 cm³'], 'On compare le nombre de cubes.'),
            q('Une couche de 6 cubes, 4 couches. Volume ?', ['24 cm³', '10 cm³', '64 cm³'], '6 × 4 = 24.'),
        ],
        sources=[src(BO, 'Connaître l’unité centimètre cube', 'Centimètre cube'),
                 src(BO, 'Déterminer un volume', 'Déterminer un volume')]),

    'MA-C3-6E-GEO-01': dict(duree=7, essentiel=
        'La distance entre A et B est la longueur du segment [AB], notée AB.\n'
        'Le milieu I de [AB] est le point de [AB] tel que AI = IB.\n'
        'Si AB = 8 cm, alors AI = IB = 4 cm.',
        parties=[
            ('Distance et milieu', [
                vocabulaire(3, 'Distance', 'Milieu'),
                {'type': 'visuel', 'visuel': figure(10, 3, seg((1, 1.5), (9, 1.5)), pt(1, 1.5, 'A'), pt(9, 1.5, 'B'), pt(5, 1.5, 'I')), 'legende': 'I est sur [AB] et à la même distance de A et de B.'},
                {'type': 'tableau', 'titre': 'Notations', 'colonnes': ['Écriture', 'Se lit'], 'lignes': [
                    ['[AB]', 'le segment d’extrémités A et B'], ['AB', 'la longueur du segment [AB]'], ['(AB)', 'la droite qui passe par A et B']]},
                bq('I est le milieu de [CD] et CD = 10 cm. Combien mesure CI ?', ['5 cm', '10 cm', '20 cm'], 'Le milieu partage le segment en deux longueurs égales.'),
            ]),
            ('Attention aux deux conditions', [
                {'type': 'piege', 'erreur': 'M est à 3 cm de A et à 3 cm de B, donc M est le milieu de [AB].', 'correction': 'Il faut aussi que M soit sur [AB]. Sinon, M est seulement à égale distance.'},
                {'type': 'methode', 'titre': 'Pour placer le milieu d’un segment', 'etapes': [
                    'Mesure le segment : 7 cm.',
                    'Divise par 2 : 3,5 cm.',
                    'Place I sur le segment à 3,5 cm de A.']},
            ]),
        ],
        a_toi=[
            q('AB = 6,4 cm. I est le milieu de [AB]. IB = ?', ['3,2 cm', '6,4 cm', '12,8 cm'], '6,4 ÷ 2 = 3,2.'),
            q('Que désigne AB ?', ['la longueur du segment [AB]', 'la droite (AB)', 'le milieu de [AB]'], 'Sans crochets ni parenthèses : une longueur.'),
            q('I est le milieu de [EF] et EI = 4 cm. EF = ?', ['8 cm', '4 cm', '2 cm'], 'EF = 2 × EI.'),
        ],
        sources=[src(BO, 'Connaître et utiliser la définition du milieu d’un segment', 'Milieu d’un segment'),
                 src(BO, 'Connaître et utiliser la définition de la distance entre deux points', 'Distance entre deux points')]),

    'MA-C3-6E-GEO-02': dict(duree=8, essentiel=
        'Le cercle de centre O et de rayon r est l’ensemble des points à la distance r de O.\n'
        'Le disque est l’ensemble des points à une distance de O inférieure ou égale à r.\n'
        'Le diamètre mesure deux rayons : d = 2 × r.',
        parties=[
            ('Le vocabulaire', [
                vocabulaire(3, 'Cercle', 'Disque', 'Rayon', 'Diamètre', 'Corde'),
                {'type': 'visuel', 'visuel': figure(9, 8,
                    {'forme': 'cercle', 'centre': [4.5, 4], 'rayon': 3}, pt(4.5, 4, 'O'),
                    seg((1.5, 4), (7.5, 4), accent=True), seg((6, 1.4), (6, 6.6)), pt(6, 1.4, 'C'), pt(6, 6.6, 'D')),
                 'legende': 'En couleur, un diamètre. [CD] est une corde.'},
                bq('Un cercle a un rayon de 3 cm. Son diamètre ?', ['6 cm', '1,5 cm', '9 cm'], 'd = 2 × 3 = 6.'),
            ]),
            ('Situer un point', [
                {'type': 'methode', 'titre': 'Pour savoir où est un point M', 'etapes': [
                    'Mesure OM.',
                    'OM = r : M est sur le cercle.',
                    'OM < r : M est dans le disque, à l’intérieur du cercle.',
                    'OM > r : M est à l’extérieur.']},
                {'type': 'piege', 'erreur': 'On confond cercle et disque.', 'correction': 'Le cercle est la ligne. Le disque est toute la surface, cercle compris.'},
                bq('Cercle de centre O, rayon 4 cm. OM = 2 cm. Où est M ?', ['dans le disque', 'sur le cercle', 'à l’extérieur'], '2 < 4.'),
            ]),
        ],
        a_toi=[
            q('Diamètre 9 cm. Rayon ?', ['4,5 cm', '18 cm', '9 cm'], 'r = d ÷ 2.'),
            q('Quelle est la plus longue corde d’un cercle ?', ['un diamètre', 'un rayon', 'toutes ont la même longueur'], 'Le diamètre passe par le centre.'),
            q('Tous les points à 5 cm de A forment :', ['le cercle de centre A et de rayon 5 cm', 'le disque de rayon 10 cm', 'un segment'], 'C’est la définition du cercle.'),
        ],
        sources=[src(BO, 'Connaître les définitions d’un cercle, d’un disque, d’un rayon, d’un diamètre, d’une corde', 'Cercle et disque'),
                 src(BO, 'Comprendre la définition d’un cercle et celle d’un disque sous la forme d’ensembles de points', 'Ensembles de points')]),

    'MA-C3-6E-GEO-03': dict(duree=8, essentiel=
        'La médiatrice d’un segment est la droite perpendiculaire à ce segment qui passe par son milieu.\n'
        'Si M est sur la médiatrice de [AB], alors MA = MB.\n'
        'Si MA = MB, alors M est sur la médiatrice de [AB].',
        parties=[
            ('La définition', [
                vocabulaire(3, 'Médiatrice'),
                {'type': 'visuel', 'visuel': figure(10, 8,
                    seg((2, 6), (8, 6)), pt(2, 6, 'A'), pt(8, 6, 'B'), pt(5, 6, 'I'),
                    {'forme': 'droite', 'de': [5, 0.5], 'a': [5, 7.5], 'nom': 'd'}, pt(5, 2, 'M'),
                    seg((5, 2), (2, 6), accent=True), seg((5, 2), (8, 6), accent=True)),
                 'legende': 'La droite d est la médiatrice de [AB]. M est sur d, donc MA = MB.'},
                bq('La médiatrice de [AB] passe par :', ['le milieu de [AB]', 'le point A', 'le point B'], 'Elle passe par le milieu et coupe [AB] à angle droit.'),
            ]),
            ('La propriété caractéristique', [
                {'type': 'explique', 'texte': 'Tous les points de la médiatrice sont à égale distance de A et de B. Et seuls ces points le sont.'},
                {'type': 'methode', 'titre': 'Pour tracer la médiatrice au compas', 'etapes': [
                    'Prends un écartement plus grand que la moitié de AB.',
                    'Trace deux arcs de centre A, de part et d’autre du segment.',
                    'Garde l’écartement et trace deux arcs de centre B.',
                    'Les deux points d’intersection sont à égale distance de A et B. Relie-les.']},
                {'type': 'piege', 'erreur': 'On trace une perpendiculaire à [AB] n’importe où.', 'correction': 'La médiatrice doit passer par le milieu. Sinon, MA ≠ MB.'},
                bq('M est sur la médiatrice de [EF] et ME = 7 cm. MF = ?', ['7 cm', '14 cm', '3,5 cm'], 'Tout point de la médiatrice est à égale distance de E et F.'),
            ]),
        ],
        a_toi=[
            q('PA = PB = 5 cm. Que peut-on dire de P ?', ['P est sur la médiatrice de [AB]', 'P est le milieu de [AB]', 'P est sur [AB]'], 'C’est la propriété caractéristique.'),
            q('La médiatrice et le segment forment un angle :', ['droit', 'aigu', 'plat'], 'Elle est perpendiculaire au segment.'),
            q('Combien de médiatrices a un segment ?', ['une seule', 'deux', 'une infinité'], 'Une seule droite est perpendiculaire en son milieu.'),
        ],
        sources=[src(BO, 'Connaître la définition de la médiatrice d’un segment', 'Médiatrice'),
                 src(BO, 'Comprendre et utiliser la propriété caractéristique de la médiatrice d’un segment', 'Propriété caractéristique')]),

    'MA-C3-6E-ANG-01': dict(duree=9, essentiel=
        'Un angle aigu mesure moins de 90°, un angle obtus entre 90° et 180°.\n'
        'Un angle droit mesure 90°, un angle plat 180°, un angle plein 360°.\n'
        'Deux angles supplémentaires ont une somme de 180°. Deux angles opposés par le sommet sont égaux.',
        parties=[
            ('Nommer un angle selon sa mesure', [
                {'type': 'tableau', 'titre': 'Les angles', 'colonnes': ['Angle', 'Mesure'], 'lignes': [
                    ['nul', '0°'], ['aigu', 'entre 0° et 90°'], ['droit', '90°'], ['obtus', 'entre 90° et 180°'], ['plat', '180°'], ['plein', '360°']]},
                {'type': 'methode', 'titre': 'Pour mesurer un angle au rapporteur', 'etapes': [
                    'Place le centre du rapporteur sur le sommet.',
                    'Aligne le zéro sur un côté de l’angle.',
                    'Lis la mesure sur la graduation qui part de ce zéro.']},
                {'type': 'piege', 'erreur': 'On lit 130° pour un angle visiblement aigu.', 'correction': 'Le rapporteur a deux graduations. Vérifie : un angle aigu mesure moins de 90°.'},
                bq('Un angle de 135° est :', ['obtus', 'aigu', 'plat'], '135° est entre 90° et 180°.'),
            ]),
            ('Angles qui vont par deux', [
                vocabulaire(3, 'Angles adjacents', 'Angles supplémentaires'),
                {'type': 'visuel', 'visuel': figure(10, 6, seg((0.5, 5), (9.5, 5)), seg((5, 5), (7.5, 0.8), accent=True), pt(5, 5, 'O')),
                 'legende': 'Les deux angles de sommet O sont adjacents. Ensemble, ils forment un angle plat : ils sont supplémentaires.'},
                {'type': 'explique', 'texte': 'Deux droites sécantes forment deux paires d’**angles opposés par le sommet**. Les angles d’une même paire ont la même mesure.'},
                bq('Un angle mesure 65°. Son supplémentaire mesure :', ['115°', '25°', '295°'], '180 − 65 = 115.'),
            ]),
        ],
        a_toi=[
            q('Un angle de 90° est :', ['droit', 'aigu', 'obtus'], 'L’angle droit mesure exactement 90°.'),
            q('Deux angles opposés par le sommet mesurent 40° et … ?', ['40°', '140°', '50°'], 'Ils sont égaux.'),
            q('Deux angles adjacents forment un angle plat. L’un mesure 72°. L’autre ?', ['108°', '18°', '72°'], '180 − 72 = 108.'),
        ],
        sources=[src(BO, 'Connaître et utiliser les angles ainsi que le lexique et les notations qui s’y rapportent : angle droit, angle plat, angle plein, angle', 'Lexique des angles'),
                 src(BO, 'Mesurer un angle', 'Mesurer un angle')]),

    'MA-C3-6E-ANG-02': dict(duree=7, essentiel=
        'La bissectrice d’un angle est la demi-droite qui le partage en deux angles de même mesure.\n'
        'Elle part du sommet de l’angle.\n'
        'La bissectrice d’un angle de 70° forme deux angles de 35°.',
        parties=[
            ('Définition', [
                vocabulaire(3, 'Bissectrice'),
                {'type': 'visuel', 'visuel': figure(10, 7, seg((1, 6), (9.5, 6)), seg((1, 6), (7.5, 0.6)), seg((1, 6), (9, 3.11), accent=True), pt(1, 6, 'O')),
                 'legende': 'En couleur, la bissectrice : elle partage l’angle en deux angles égaux.'},
                bq('La bissectrice d’un angle de 120° forme deux angles de :', ['60°', '120°', '240°'], '120 ÷ 2 = 60.'),
            ]),
            ('Calculer et construire', [
                {'type': 'methode', 'titre': 'Pour construire une bissectrice au rapporteur', 'etapes': [
                    'Mesure l’angle : 84°.',
                    'Calcule la moitié : 42°.',
                    'Trace la demi-droite à 42° d’un côté, depuis le sommet.']},
                {'type': 'exemple-resolu', 'enonce': '[Ox) est la bissectrice de l’angle AOB. L’angle AOx mesure 28°. Combien mesure l’angle AOB ?', 'etapes': [
                    'La bissectrice partage l’angle en deux angles égaux.', 'AOB = 2 × 28°.'],
                 'conclusion': 'L’angle AOB mesure 56°.'},
                {'type': 'piege', 'erreur': 'On trace une demi-droite qui ne part pas du sommet.', 'correction': 'La bissectrice part toujours du sommet de l’angle.'},
            ]),
        ],
        a_toi=[
            q('Bissectrice d’un angle de 90°. Chaque angle mesure :', ['45°', '90°', '30°'], '90 ÷ 2 = 45.'),
            q('La bissectrice forme deux angles de 37°. L’angle mesure :', ['74°', '37°', '18,5°'], '2 × 37 = 74.'),
            q('D’où part la bissectrice ?', ['du sommet de l’angle', 'du milieu d’un côté', 'de n’importe quel point'], 'C’est une demi-droite issue du sommet.'),
        ],
        sources=[src(BO, 'Connaître la définition de la bissectrice d’un angle saillant', 'Bissectrice'),
                 src(BO, 'Utiliser la définition de la bissectrice d’un angle pour effectuer des constructions et résoudre des problèmes', 'Utiliser la bissectrice')]),

    'MA-C3-6E-TRI-01': dict(duree=9, essentiel=
        'Dans un triangle, la somme des mesures des trois angles est égale à 180°.\n'
        'Triangle équilatéral : trois angles de 60°. Triangle isocèle : deux angles égaux.\n'
        'Triangle rectangle : un angle droit, les deux autres font 90° ensemble.',
        parties=[
            ('La somme des angles', [
                {'type': 'observe', 'consigne': 'Découpe les trois coins d’un triangle en papier et place-les côte à côte.', 'exemples': [
                    'Les trois angles forment un angle plat.', 'Un angle plat mesure 180°.']},
                {'type': 'methode', 'titre': 'Pour calculer le troisième angle', 'etapes': [
                    'Ajoute les deux angles connus : 50° + 60° = 110°.',
                    'Retire de 180° : 180° − 110° = 70°.']},
                bq('Deux angles d’un triangle mesurent 30° et 100°. Le troisième ?', ['50°', '70°', '130°'], '180 − 130 = 50.'),
            ]),
            ('Les triangles particuliers', [
                {'type': 'tableau', 'titre': 'Angles des triangles particuliers', 'colonnes': ['Triangle', 'Côtés', 'Angles'], 'lignes': [
                    ['équilatéral', '3 côtés égaux', '3 angles de 60°'], ['isocèle', '2 côtés égaux', '2 angles égaux, à la base'], ['rectangle', '', '1 angle droit, les 2 autres font 90° ensemble']]},
                {'type': 'visuel', 'visuel': figure(10, 6, {'forme': 'polygone', 'sommets': [[1, 5.5], [9, 5.5], [5, 0.7]]}), 'legende': 'Un triangle isocèle : ses deux angles à la base sont égaux.'},
                {'type': 'exemple-resolu', 'enonce': 'Un triangle isocèle a un angle principal de 40°. Combien mesurent les deux autres ?', 'etapes': [
                    '180° − 40° = 140°.', 'Les deux angles de la base sont égaux : 140° ÷ 2.'],
                 'conclusion': 'Chacun mesure 70°.'},
            ]),
            ('Un triangle n’existe pas toujours', [
                {'type': 'explique', 'texte': 'Avec des côtés de 2 cm, 3 cm et 7 cm, aucun triangle n’est possible. En effet, 2 + 3 est plus petit que 7.'},
                {'type': 'piege', 'erreur': 'On croit qu’un triangle peut avoir deux angles obtus.', 'correction': 'Deux angles obtus dépassent déjà 180°. C’est impossible.'},
            ]),
        ],
        a_toi=[
            q('Un triangle rectangle a un angle de 35°. Le troisième angle ?', ['55°', '145°', '65°'], '90 − 35 = 55.'),
            q('Les angles d’un triangle équilatéral mesurent :', ['60°', '90°', '45°'], '180 ÷ 3 = 60.'),
            q('Peut-on construire un triangle de côtés 4 cm, 5 cm, 12 cm ?', ['non', 'oui', 'seulement s’il est rectangle'], '4 + 5 = 9, plus petit que 12.'),
        ],
        sources=[src(BO, 'Connaître la valeur de la somme des mesures des angles d’un triangle', 'Somme des angles'),
                 src(BO, 'Connaître et utiliser les propriétés angulaires des triangles particuliers : triangle rectangle, triangle isocèle, triangle équilatéral', 'Triangles particuliers')]),

    'MA-C3-6E-SYM-01': dict(duree=8, essentiel=
        'A’ est le symétrique de A par rapport à d si d est la médiatrice de [AA’].\n'
        'La symétrie axiale conserve les longueurs, les angles et les aires.\n'
        'Un rectangle non carré a 2 axes de symétrie, un carré en a 4.',
        parties=[
            ('Axes de symétrie d’une figure', [
                vocabulaire(3, 'Axe de symétrie'),
                {'type': 'tableau', 'titre': 'Nombre d’axes', 'colonnes': ['Figure', 'Axes de symétrie'], 'lignes': [
                    ['triangle isocèle', '1'], ['triangle équilatéral', '3'], ['rectangle non carré', '2'], ['losange non carré', '2'], ['carré', '4'], ['cercle', 'une infinité']]},
                {'type': 'piege', 'erreur': 'On croit que les diagonales d’un rectangle sont des axes de symétrie.', 'correction': 'Plie un rectangle selon une diagonale : les deux parties ne se superposent pas.'},
                bq('Combien d’axes de symétrie a un carré ?', ['4', '2', '1'], 'Deux médianes et deux diagonales.'),
            ]),
            ('Construire un symétrique', [
                {'type': 'visuel', 'visuel': figure(12, 8, {'forme': 'axe', 'de': [6, 0.3], 'a': [6, 7.7]},
                    {'forme': 'polygone', 'sommets': [[2, 2], [5, 3], [3, 6]]}, {'forme': 'polygone', 'sommets': [[10, 2], [7, 3], [9, 6]]}, quadrillage=True),
                 'legende': 'Les deux triangles sont symétriques par rapport à l’axe en pointillés.'},
                {'type': 'methode', 'titre': 'Pour construire le symétrique de A par rapport à d', 'etapes': [
                    'Trace la perpendiculaire à d passant par A.',
                    'Mesure la distance de A à d.',
                    'Reporte la même distance de l’autre côté : c’est A’.']},
                bq('Un segment de 5 cm a pour symétrique un segment de :', ['5 cm', '10 cm', '2,5 cm'], 'La symétrie conserve les longueurs.'),
            ]),
        ],
        a_toi=[
            q('Combien d’axes de symétrie a un triangle équilatéral ?', ['3', '1', '0'], 'Chaque hauteur est un axe.'),
            q('A’ est le symétrique de A par rapport à d. Que représente d pour [AA’] ?', ['sa médiatrice', 'son milieu', 'sa bissectrice'], 'C’est la définition.'),
            q('Un angle de 40° a pour symétrique un angle de :', ['40°', '140°', '80°'], 'La symétrie conserve les angles.'),
        ],
        sources=[src(BO, 'Il reconnaît si une figure possède un ou plusieurs axes de symétrie.', 'Axes de symétrie'),
                 src(BO, 'Connaître la définition du symétrique d’un point par rapport à une droite', 'Symétrique d’un point')]),

    'MA-C3-6E-ESP-01': dict(duree=7, essentiel=
        'Un prisme droit a deux bases polygonales identiques et parallèles, reliées par des faces rectangulaires.\n'
        'Un prisme droit à base triangulaire a 5 faces, 9 arêtes et 6 sommets.\n'
        'Pour compter les cubes d’un assemblage, on compte étage par étage, sans oublier les cubes cachés.',
        parties=[
            ('Reconnaitre les solides', [
                vocabulaire(3, 'Prisme droit'),
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'prisme-triangulaire'}, 'legende': 'Un prisme droit à base triangulaire.'},
                {'type': 'tableau', 'titre': 'Faces, arêtes, sommets', 'colonnes': ['Solide', 'Faces', 'Arêtes', 'Sommets'], 'lignes': [
                    ['cube', '6', '12', '8'], ['pavé droit', '6', '12', '8'], ['prisme droit à base triangulaire', '5', '9', '6'], ['pyramide à base carrée', '5', '8', '5']]},
                bq('Un pavé droit est-il un prisme droit ?', ['oui', 'non', 'seulement si c’est un cube'], 'Ses bases sont des rectangles identiques et parallèles.'),
            ]),
            ('Assemblages de cubes', [
                {'type': 'methode', 'titre': 'Pour dénombrer les cubes d’un assemblage', 'etapes': [
                    'Compte les cubes de l’étage du bas, y compris ceux cachés.',
                    'Fais de même pour chaque étage.',
                    'Ajoute les résultats.']},
                {'type': 'piege', 'erreur': 'On compte les faces visibles au lieu des cubes.', 'correction': 'Un cube peut montrer trois faces. On compte des cubes, pas des carrés.'},
                {'type': 'exemple-resolu', 'enonce': 'Un escalier : 3 cubes en bas, 2 au milieu, 1 en haut, sur une seule rangée.', 'etapes': [
                    '3 + 2 + 1 = 6.'],
                 'conclusion': 'L’escalier compte 6 cubes.'},
            ]),
        ],
        a_toi=[
            q('Combien d’arêtes a un prisme droit à base triangulaire ?', ['9', '6', '12'], '3 + 3 sur les bases, 3 latérales.'),
            q('Les faces latérales d’un prisme droit sont des :', ['rectangles', 'triangles', 'cercles'], 'Elles relient les deux bases.'),
            q('Un cube de 2 cubes d’arête contient combien de petits cubes ?', ['8', '4', '6'], '2 × 2 × 2 = 8.'),
        ],
        sources=[src(BO, 'Voir dans l’espace des assemblages de cubes', 'Assemblages de cubes'),
                 src(BO, 'L’élève identifie dans un ensemble de solides lesquels sont des pyramides, des boules, des cubes, des cylindres, des pavés, des', 'Solides usuels')]),

    'MA-C3-6E-STAT-01': dict(duree=7, essentiel=
        'Un tableau range des données en lignes et en colonnes.\n'
        'Filtrer, c’est ne garder que les données qui respectent un critère.\n'
        'On lit le titre, les unités et les en-têtes avant de répondre.',
        parties=[
            ('Lire un tableau', [
                {'type': 'tableau', 'titre': 'Températures à midi (°C)', 'colonnes': ['Jour', 'Température'], 'lignes': [
                    ['lundi', '12'], ['mardi', '15'], ['mercredi', '18'], ['jeudi', '9'], ['vendredi', '16']]},
                {'type': 'methode', 'titre': 'Pour lire un tableau', 'etapes': [
                    'Lis le titre et l’unité.',
                    'Repère la ligne et la colonne qui répondent à la question.',
                    'Lis la valeur à leur croisement.']},
                bq('Quelle température mardi ?', ['15 °C', '12 °C', '18 °C'], 'Ligne mardi : 15.'),
            ]),
            ('Filtrer selon un critère', [
                {'type': 'exemple-resolu', 'enonce': 'Quels jours la température dépasse-t-elle 14 °C ?', 'etapes': [
                    'Critère : plus de 14.', 'On garde 15, 18 et 16. On écarte 12 et 9.'],
                 'conclusion': 'Mardi, mercredi et vendredi : 3 jours.'},
                {'type': 'piege', 'erreur': 'On compte 14 °C dans « dépasse 14 °C ».', 'correction': 'Dépasser veut dire strictement plus grand. 14 n’est pas retenu.'},
                {'type': 'visuel', 'visuel': {'type': 'diagramme', 'titre': 'Températures à midi', 'unite': '°C', 'pas': 2, 'barres': [
                    {'nom': 'lun', 'valeur': 12}, {'nom': 'mar', 'valeur': 15}, {'nom': 'mer', 'valeur': 18}, {'nom': 'jeu', 'valeur': 9}, {'nom': 'ven', 'valeur': 16}]},
                 'legende': 'Les mêmes données en diagramme en barres.'},
            ]),
        ],
        a_toi=[
            q('Quel jour a été le plus froid ?', ['jeudi', 'lundi', 'mardi'], '9 °C est la plus petite valeur.'),
            q('Combien de jours sous 13 °C ?', ['2', '1', '3'], 'Lundi (12) et jeudi (9).'),
            q('Écart entre le jour le plus chaud et le plus froid ?', ['9 °C', '18 °C', '6 °C'], '18 − 9 = 9.'),
        ],
        sources=[src(BO, 'Faire un choix en filtrant les données d’un tableau selon un critère', 'Filtrer des données'),
                 src(BO, 'Construire un tableau simple pour présenter des données (observations, caractères)', 'Tableau de données')]),

    'MA-C3-6E-PROBA-01': dict(duree=8, essentiel=
        'Une probabilité est un nombre entre 0 et 1.\n'
        '0 : l’évènement est impossible. 1 : il est certain.\n'
        'Avec des issues équiprobables : probabilité = issues favorables ÷ issues possibles. 3 chances sur 4 = 3/4 = 0,75.',
        parties=[
            ('De « chances sur » à un nombre', [
                vocabulaire(3, 'Probabilité'),
                {'type': 'visuel', 'visuel': {'type': 'urne', 'boules': [{'couleur': 'rouge', 'nombre': 3}, {'couleur': 'bleue', 'nombre': 1}]}, 'legende': 'Une urne avec 3 boules rouges et 1 boule bleue.'},
                {'type': 'observe', 'consigne': 'On tire une boule au hasard.', 'exemples': [
                    '4 boules : 4 issues possibles.', '3 boules rouges : 3 issues favorables.', 'Probabilité de tirer rouge : 3/4 = 0,75 = 75 %.']},
                bq('Probabilité de tirer la boule bleue ?', ['1/4', '1/3', '3/4'], '1 boule bleue sur 4 boules.'),
            ]),
            ('Échelle des probabilités', [
                {'type': 'tableau', 'titre': 'Du certain à l’impossible', 'colonnes': ['Probabilité', 'Évènement'], 'lignes': [
                    ['0', 'impossible : tirer une boule verte'], ['entre 0 et 0,5', 'peu probable'], ['0,5', 'une chance sur deux : pile ou face'], ['entre 0,5 et 1', 'probable'], ['1', 'certain : tirer une boule']]},
                {'type': 'piege', 'erreur': 'Une probabilité de 3 ou de 120 %.', 'correction': 'Une probabilité ne dépasse jamais 1, soit 100 %.'},
            ]),
            ('Probabilité et fréquence', [
                {'type': 'explique', 'texte': 'Si on répète un tirage de nombreuses fois, la fréquence d’un résultat se rapproche de sa probabilité. Sur 1 000 lancers de pièce, on obtient environ 500 « pile ».'},
                bq('On lance un dé à 6 faces. Probabilité d’obtenir 6 ?', ['1/6', '1/2', '6'], 'Une face favorable sur 6.'),
            ]),
        ],
        a_toi=[
            q('Probabilité d’obtenir un nombre pair avec un dé ?', ['1/2', '1/3', '2/6'], '2, 4, 6 : 3 issues sur 6.'),
            q('Quel nombre ne peut pas être une probabilité ?', ['1,2', '0', '0,99'], 'Une probabilité est entre 0 et 1.'),
            q('Une urne contient 5 boules, toutes vertes. Probabilité de tirer une verte ?', ['1', '5', '0'], 'C’est certain.'),
        ],
        sources=[src(BO, 'Savoir que la probabilité d’un évènement est un nombre compris entre 0 et 1', 'Probabilité entre 0 et 1'),
                 src(BO, 'Calculer des probabilités dans des situations simples d’équiprobabilité', 'Calculer une probabilité')]),
}

ecrire(COURS)
