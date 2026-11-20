"""Lot de cours : maths CE1, grandeurs, géométrie et données. Écrit les cours en brouillon (auteur ia).

    python3 scripts/cours/lot-ce1-maths-grandeurs-geometrie.py

Phrases de 12 mots au plus (cycle 2). Les pages des extraits sont retrouvées ensuite dans les PDF archivés.
"""
from commun import BO, bq, ecrire, q, src, vocabulaire


def figure(largeur, hauteur, *elements):
    return {'type': 'figure', 'largeur': largeur, 'hauteur': hauteur, 'quadrillage': True, 'elements': list(elements)}


def poly(*sommets):
    return {'forme': 'polygone', 'sommets': [list(s) for s in sommets]}


COURS = {
    'MA-C2-CE1-LONG-01': dict(duree=8, essentiel=
        'On mesure les longueurs en mètres (m), centimètres (cm) et kilomètres (km).\n'
        '1 m = 100 cm. 1 km = 1 000 m.\n'
        'Pour mesurer avec une règle, on part du 0.',
        parties=[
            ('Trois unités de longueur', [
                {'type': 'observe', 'consigne': 'Chaque unité sert pour une taille d’objet.', 'exemples': [
                    'Une gomme mesure environ 4 cm.', 'Une porte mesure environ 2 m.', 'La piscine est à 3 km de l’école.']},
                {'type': 'tableau', 'titre': 'Les unités', 'colonnes': ['Unité', 'Symbole', 'Pour mesurer'], 'lignes': [
                    ['le centimètre', 'cm', 'un crayon, un livre'], ['le mètre', 'm', 'une classe, un arbre'], ['le kilomètre', 'km', 'un trajet en voiture']]},
                {'type': 'explique', 'texte': 'Dans **1 m**, il y a **100 cm**. Dans **1 km**, il y a **1 000 m**.'},
                bq('Une trousse mesure plutôt :', ['20 cm', '2 cm', '2 m'], 'Une trousse tient dans le cartable. Elle mesure environ 20 cm.'),
            ]),
            ('Mesurer avec une règle', [
                {'type': 'visuel', 'visuel': {'type': 'regle', 'graduations': 12, 'debut': 0, 'fin': 7}, 'legende': 'Le trait part du 0 et finit au 7. Il mesure 7 cm.'},
                {'type': 'methode', 'titre': 'Pour mesurer un trait', 'etapes': [
                    'Place le 0 de la règle au début du trait.',
                    'Lis le nombre à la fin du trait.',
                    'Écris l’unité : cm.']},
                {'type': 'piege', 'erreur': 'On place le bord de la règle au début du trait.', 'correction': 'Le bord n’est pas toujours le 0. Cherche le 0 sur la règle.'},
                {'type': 'visuel', 'visuel': {'type': 'regle', 'graduations': 12, 'debut': 2, 'fin': 9}, 'legende': 'Ce trait va de 2 à 9. Il mesure 9 − 2 = 7 cm.'},
                bq('Un trait va de 3 à 8 sur la règle. Il mesure :', ['5 cm', '8 cm', '11 cm'], '8 − 3 = 5. Le trait mesure 5 cm.'),
            ]),
            ('Changer d’unité', [
                {'type': 'exemple-resolu', 'enonce': 'Écris 1 m 46 cm en centimètres.', 'etapes': [
                    '1 m, c’est 100 cm.', 'On ajoute les 46 cm : 100 + 46 = 146.'],
                 'conclusion': '1 m 46 cm = 146 cm.'},
                bq('Combien de mètres dans 2 km ?', ['2 000 m', '200 m', '20 m'], '1 km = 1 000 m. Donc 2 km = 2 000 m.'),
            ]),
        ],
        a_toi=[
            q('Combien de centimètres dans 1 m ?', ['100', '10', '1 000'], '1 m = 100 cm.'),
            q('Écris 1 m 20 cm en centimètres.', ['120 cm', '102 cm', '1 020 cm'], '100 cm + 20 cm = 120 cm.'),
            q('La distance entre deux villes se mesure plutôt en :', ['km', 'cm', 'm'], 'Les longs trajets se mesurent en kilomètres.'),
        ],
        sources=[src(BO, 'L’élève sait que 1 m = 100 cm et 1 km = 1 000 m.', 'Unités et relations'),
                 src(BO, 'L’élève sait dire si la longueur d’une trousse est plutôt 2 cm, 20 cm ou 2 m.', 'Longueurs de référence'),
                 src(BO, 'L’élève sait encadrer la longueur d’un segment par deux nombres entiers de centimètres.', 'Mesurer avec une règle graduée')]),

    'MA-C2-CE1-MAS-01': dict(duree=7, essentiel=
        'On mesure les masses en grammes (g) et en kilogrammes (kg).\n'
        '1 kg = 1 000 g.\n'
        'Un paquet de sucre pèse 1 kg.',
        parties=[
            ('Lourd ou léger', [
                {'type': 'observe', 'consigne': 'Pèse ces objets dans ta tête.', 'exemples': [
                    'Un sachet de levure pèse environ 10 g.', 'Un paquet de sucre pèse 1 kg.', 'Un grand chien pèse environ 30 kg.']},
                {'type': 'explique', 'texte': 'Pour les objets légers, on utilise le **gramme**. Pour les objets lourds, on utilise le **kilogramme**.'},
                {'type': 'tableau', 'titre': 'Des masses à connaitre', 'colonnes': ['Objet', 'Masse'], 'lignes': [
                    ['un sachet de levure', 'environ 10 g'], ['une pomme', 'environ 150 g'], ['un paquet de sucre', '1 kg'], ['un enfant de CE1', 'environ 25 kg']]},
                bq('Une pomme pèse plutôt :', ['150 g', '150 kg', '1 g'], 'Une pomme est légère. On la pèse en grammes.'),
            ]),
            ('Grammes et kilogrammes', [
                {'type': 'explique', 'texte': 'Dans **1 kg**, il y a **1 000 g**. Mille grammes pèsent autant qu’un paquet de sucre.'},
                {'type': 'exemple-resolu', 'enonce': 'Écris 1 kg 300 g en grammes.', 'etapes': [
                    '1 kg, c’est 1 000 g.', 'On ajoute 300 g : 1 000 + 300 = 1 300.'],
                 'conclusion': '1 kg 300 g = 1 300 g.'},
                {'type': 'methode', 'titre': 'Pour comparer deux masses', 'etapes': [
                    'Écris les deux masses en grammes.',
                    'Compare les deux nombres.']},
                {'type': 'piege', 'erreur': 'On croit que 900 g est plus lourd que 1 kg.', 'correction': '1 kg = 1 000 g. Et 1 000 est plus grand que 900.'},
                bq('Range du plus léger au plus lourd.', ['1 000 g ; 1 kg 300 g ; 2 kg', '2 kg ; 1 000 g ; 1 kg 300 g', '1 kg 300 g ; 1 000 g ; 2 kg'], 'En grammes : 1 000, 1 300, 2 000.'),
            ]),
        ],
        a_toi=[
            q('Combien de grammes dans 1 kg ?', ['1 000', '100', '10'], '1 kg = 1 000 g.'),
            q('Quel est le plus lourd ?', ['2 kg', '1 500 g', '900 g'], '2 kg = 2 000 g. C’est le plus lourd.'),
            q('Un cartable pèse plutôt :', ['3 kg', '3 g', '300 kg'], 'Un cartable se porte sur le dos. Il pèse quelques kilogrammes.'),
        ],
        sources=[src(BO, 'L’élève connait la masse de quelques objets du quotidien.', 'Masses de référence'),
                 src(BO, 'sucre pèse 1 kg et un sachet de levure pèse environ 10 g.', 'Paquet de sucre et sachet de levure'),
                 src(BO, 'L’élève sait ordonner quatre masses exprimées en gramme ou en kilogramme.', 'Ranger des masses')]),

    'MA-C2-CE1-MONN-01': dict(duree=8, essentiel=
        '1 € = 100 centimes.\n'
        'Avec une virgule : 2 € et 5 centimes s’écrit 2,05 €.\n'
        'Avant la virgule, les euros. Après la virgule, les centimes.',
        parties=[
            ('Euros et centimes', [
                {'type': 'observe', 'consigne': 'Regarde ces pièces et ces billets.', 'exemples': [
                    'Les billets : 5 €, 10 €, 20 €…', 'Les grosses pièces : 1 € et 2 €.', 'Les petites pièces : les centimes.']},
                {'type': 'visuel', 'visuel': {'type': 'monnaie', 'valeurs': [2, 1, 0.5, 0.2, 0.05]}, 'legende': '2 € + 1 € + 50 c + 20 c + 5 c = 3 € et 75 centimes.'},
                {'type': 'explique', 'texte': 'Une pièce de **1 €** vaut autant que **100 pièces** de 1 centime.'},
                bq('Combien de centimes dans 1 € ?', ['100', '10', '1 000'], '1 € = 100 centimes.'),
            ]),
            ('Écrire une somme avec une virgule', [
                {'type': 'tableau', 'titre': 'Écrire une somme', 'colonnes': ['Somme', 'Avec la virgule'], 'lignes': [
                    ['2 € et 5 centimes', '2,05 €'], ['2 € et 50 centimes', '2,50 €'], ['85 centimes', '0,85 €'], ['17 €', '17,00 €']]},
                {'type': 'methode', 'titre': 'Pour écrire une somme', 'etapes': [
                    'Écris les euros, puis une virgule.',
                    'Écris les centimes avec deux chiffres.',
                    'Ajoute le signe €.']},
                {'type': 'piege', 'erreur': 'On écrit 2,5 € pour 2 € et 5 centimes.', 'correction': 'Les centimes ont toujours deux chiffres : 2,05 €.'},
                bq('Comment écrit-on 4 € et 8 centimes ?', ['4,08 €', '4,8 €', '48 €'], '8 centimes s’écrivent 08 après la virgule.'),
            ]),
            ('Comparer des sommes', [
                {'type': 'exemple-resolu', 'enonce': 'Quel prix est le plus cher : 3,45 € ou 3,09 € ?', 'etapes': [
                    'Les euros sont pareils : 3 €.', 'Compare les centimes : 45 et 9.'],
                 'conclusion': '3,45 € est le plus cher.'},
                {'type': 'explique', 'texte': '345 centimes, c’est 3 € et 45 centimes. On écrit 3,45 €.'},
            ]),
        ],
        a_toi=[
            q('Comment écrit-on 6 € et 30 centimes ?', ['6,30 €', '6,3 c', '630 €'], '6 euros, une virgule, puis 30 centimes.'),
            q('Que vaut 0,75 € ?', ['75 centimes', '7 € et 5 centimes', '75 €'], 'Aucun euro, et 75 centimes.'),
            q('Quel prix est le moins cher ?', ['1,90 €', '2,05 €', '2,50 €'], '1 € est moins que 2 €. 1,90 € est le moins cher.'),
        ],
        sources=[src(BO, 'L’élève doit savoir qu’une pièce d’un euro a la même valeur que cent pièces d’un', 'Lien entre euros et centimes'),
                 src(BO, '2 € et 5 centimes s’écrit 2,05 €', 'Écriture à virgule'),
                 src(BO, '85 centimes = 0,85 €', 'Moins d’un euro')]),

    'MA-C2-CE1-TEMPS-01': dict(duree=8, essentiel=
        'La petite aiguille montre les heures. La grande aiguille montre les minutes.\n'
        'Grande aiguille sur le 3 : et quart. Sur le 6 : et demie.\n'
        'L’après-midi, 2 heures se dit aussi 14 heures.',
        parties=[
            ('Les deux aiguilles', [
                {'type': 'observe', 'consigne': 'Regarde l’horloge.', 'exemples': [
                    'La petite aiguille est juste après le 2.', 'La grande aiguille est sur le 3.', 'Il est 2 heures et quart.']},
                {'type': 'visuel', 'visuel': {'type': 'horloge', 'heures': 14, 'minutes': 15}, 'legende': '2 heures et quart, ou 14 h 15 l’après-midi.'},
                {'type': 'tableau', 'titre': 'Où est la grande aiguille ?', 'colonnes': ['Grande aiguille', 'On dit', 'Minutes'], 'lignes': [
                    ['sur le 12', 'heure pile', '0'], ['sur le 3', 'et quart', '15'], ['sur le 6', 'et demie', '30'], ['sur le 9', 'moins le quart', '45']]},
                bq('La grande aiguille est sur le 6. On dit :', ['et demie', 'et quart', 'pile'], 'Sur le 6, la grande aiguille a fait un demi-tour.'),
            ]),
            ('Le matin et l’après-midi', [
                {'type': 'explique', 'texte': 'Une journée dure **24 heures**. La petite aiguille fait deux tours. Après midi, on compte 13, 14, 15…'},
                {'type': 'tableau', 'titre': 'Après midi', 'colonnes': ['On dit', 'On écrit'], 'lignes': [
                    ['1 heure de l’après-midi', '13 h'], ['3 heures de l’après-midi', '15 h'], ['7 heures du soir', '19 h']]},
                {'type': 'methode', 'titre': 'Pour l’heure de l’après-midi', 'etapes': [
                    'Lis l’heure sur l’horloge : 3 heures.',
                    'Ajoute 12 : 3 + 12 = 15.',
                    'Il est 15 heures.']},
                {'type': 'piege', 'erreur': 'On lit la grande aiguille comme les heures.', 'correction': 'La petite aiguille donne l’heure. La grande donne les minutes.'},
                {'type': 'visuel', 'visuel': {'type': 'horloge', 'heures': 9, 'minutes': 30}, 'legende': '9 heures et demie.'},
            ]),
        ],
        a_toi=[
            q('Il est 4 heures de l’après-midi. On écrit :', ['16 h', '4 h', '14 h'], '4 + 12 = 16. Il est 16 h.'),
            q('La grande aiguille est sur le 3, la petite après le 8. Il est :', ['8 heures et quart', '3 heures et 8', '8 heures et demie'], 'Petite aiguille : 8 heures. Grande sur le 3 : et quart.'),
            q('Une horloge digitale affiche 14 : 15. Il est :', ['2 heures et quart de l’après-midi', '14 heures du matin', '4 heures et quart'], '14 h, c’est 2 heures de l’après-midi.'),
        ],
        sources=[src(BO, 'L’élève comprend et utilise les expressions « trois heures du matin », « trois heures de', 'Matin et après-midi'),
                 src(BO, 'qu’il est « 2 heures et quart » ou « 14 heures et 15 minutes » et il sait que sur une horloge', 'Lire l’heure sur une horloge à aiguilles')]),

    'MA-C2-CE1-DUR-01': dict(duree=7, essentiel=
        '1 heure = 60 minutes.\n1 demi-heure = 30 minutes.\n1 quart d’heure = 15 minutes.\n'
        'Une durée, c’est le temps entre le début et la fin.',
        parties=[
            ('Heures et minutes', [
                {'type': 'tableau', 'titre': 'Les durées à savoir', 'colonnes': ['Durée', 'En minutes'], 'lignes': [
                    ['1 heure', '60 min'], ['1 demi-heure', '30 min'], ['1 quart d’heure', '15 min'], ['3 quarts d’heure', '45 min']]},
                {'type': 'explique', 'texte': 'Deux quarts d’heure font **une demi-heure**. Quatre quarts d’heure font **une heure**.'},
                bq('Combien de minutes dure une demi-heure ?', ['30', '50', '15'], 'Une heure, c’est 60 minutes. La moitié, c’est 30.'),
            ]),
            ('Calculer une durée', [
                {'type': 'observe', 'consigne': 'Le dessin animé va de 8 h 30 à 8 h 45.', 'exemples': [
                    'Les heures sont pareilles : 8 h.', 'Les minutes vont de 30 à 45.', '45 − 30 = 15 minutes.']},
                {'type': 'methode', 'titre': 'Pour trouver une durée', 'etapes': [
                    'Pars de l’heure de début.',
                    'Avance jusqu’à l’heure pile suivante.',
                    'Avance ensuite jusqu’à l’heure de fin.',
                    'Ajoute les deux morceaux.']},
                {'type': 'exemple-resolu', 'enonce': 'Durée entre 15 h 45 et 16 h 15 ?', 'etapes': [
                    'De 15 h 45 à 16 h : 15 minutes.', 'De 16 h à 16 h 15 : 15 minutes.', '15 + 15 = 30.'],
                 'conclusion': 'La durée est 30 minutes.'},
                {'type': 'piege', 'erreur': 'On calcule 16 h 15 − 15 h 45 comme 1615 − 1545.', 'correction': 'Une heure a 60 minutes, pas 100. Passe par l’heure pile.'},
            ]),
            ('Comparer des durées', [
                {'type': 'exemple-resolu', 'enonce': 'Quelle est la plus longue : 2 heures ou 130 minutes ?', 'etapes': [
                    '2 heures = 60 + 60 = 120 minutes.', '130 est plus grand que 120.'],
                 'conclusion': '130 minutes, c’est plus long que 2 heures.'},
            ]),
        ],
        a_toi=[
            q('Un quart d’heure et une demi-heure font :', ['45 minutes', '35 minutes', '1 heure'], '15 + 30 = 45 minutes.'),
            q('Le film va de 14 h à 15 h 30. Il dure :', ['1 heure et demie', '1 heure', '30 minutes'], 'De 14 h à 15 h : 1 heure. Puis 30 minutes.'),
            q('Quelle durée est la plus courte ?', ['50 minutes', '1 heure', '3 quarts d’heure et 10 minutes'], '1 heure = 60 min. 3 quarts d’heure et 10 min = 55 min.'),
        ],
        sources=[src(BO, '1 heure = 60 minutes ; 1 demi-heure = 30 minutes', 'Relations entre unités'),
                 src(BO, 'L’élève sait déterminer la durée qui s’écoule entre 8 h 30 min et 8 h 45 min et celle entre', 'Calculer une durée'),
                 src(BO, 'L’élève sait comparer des durées comme 2 heures et 130 minutes.', 'Comparer des durées')]),

    'MA-C2-CE1-GEO-01': dict(duree=8, essentiel=
        'Le cube, le pavé et la pyramide ont des faces plates.\n'
        'Un cube a 6 faces carrées, 12 arêtes et 8 sommets.\n'
        'Une pyramide à base carrée a 5 faces, 8 arêtes, 5 sommets.',
        parties=[
            ('Reconnaitre les solides', [
                {'type': 'observe', 'consigne': 'Des solides se cachent autour de toi.', 'exemples': [
                    'Une boite à chaussures a la forme d’un pavé.', 'Une boite de conserve a la forme d’un cylindre.', 'Une balle de tennis a la forme d’une boule.']},
                {'type': 'tableau', 'titre': 'Les solides', 'colonnes': ['Solide', 'Un objet qui lui ressemble'], 'lignes': [
                    ['le cube', 'un dé'], ['le pavé', 'une boite à chaussures'], ['la pyramide', 'une tente de camping'], ['le cylindre', 'une boite de conserve'], ['le cône', 'un cornet de glace'], ['la boule', 'une balle']]},
                bq('Une brique de lait a la forme :', ['d’un pavé', 'd’une boule', 'd’un cône'], 'Ses faces sont des rectangles : c’est un pavé.'),
            ]),
            ('Faces, arêtes et sommets', [
                vocabulaire(2, 'Face', 'Arête', 'Sommet'),
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'cube'}, 'legende': 'Un cube. Les traits en pointillés sont les arêtes cachées.'},
                {'type': 'methode', 'titre': 'Pour compter les faces d’un cube', 'etapes': [
                    'Compte la face du dessus et celle du dessous : 2.',
                    'Compte les faces de devant et de derrière : 2.',
                    'Compte les faces de gauche et de droite : 2.',
                    '2 + 2 + 2 = 6 faces.']},
                {'type': 'piege', 'erreur': 'On compte seulement les faces qu’on voit : 3.', 'correction': 'Certaines faces sont cachées. Un cube a 6 faces.'},
            ]),
            ('Cube, pavé, pyramide', [
                {'type': 'tableau', 'titre': 'Trois solides', 'colonnes': ['Solide', 'Faces', 'Arêtes', 'Sommets'], 'lignes': [
                    ['cube', '6 carrés', '12', '8'], ['pavé', '6 rectangles', '12', '8'], ['pyramide à base carrée', '1 carré et 4 triangles', '8', '5']]},
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'pyramide'}, 'legende': 'Une pyramide à base carrée.'},
                bq('Combien de sommets a une pyramide à base carrée ?', ['5', '4', '8'], '4 sommets autour du carré, et 1 en haut.'),
            ]),
        ],
        a_toi=[
            q('Combien d’arêtes a un cube ?', ['12', '6', '8'], '4 en haut, 4 en bas, 4 sur les côtés.'),
            q('Les faces d’un pavé sont des :', ['rectangles', 'triangles', 'cercles'], 'Un pavé a 6 faces rectangulaires.'),
            q('Quel solide n’a pas de face plate ?', ['la boule', 'le cube', 'la pyramide'], 'La boule est toute ronde.'),
        ],
        sources=[src(BO, 'décrire ses faces (carrés, rectangles, triangles) et donner le nombre de ses arêtes et de', 'Décrire un cube, un pavé, une pyramide'),
                 src(BO, 'qu’une boite à chaussures a la forme d’un pavé, qu’une boite de conserve a la forme d’un', 'Solides dans l’environnement')]),

    'MA-C2-CE1-GEO-02': dict(duree=9, essentiel=
        'Un rectangle a 4 côtés et 4 angles droits. Ses côtés opposés ont la même longueur.\n'
        'Un carré a 4 angles droits et 4 côtés de même longueur.\n'
        'Un triangle a 3 côtés. Un triangle rectangle a un angle droit.',
        parties=[
            ('L’angle droit', [
                vocabulaire(2, 'Côté', 'Sommet', 'Angle droit'),
                {'type': 'explique', 'texte': 'Un angle plus petit qu’un angle droit est **aigu**. Un angle plus grand est **obtus**.'},
                {'type': 'methode', 'titre': 'Pour vérifier un angle droit', 'etapes': [
                    'Pose le coin de l’équerre sur le sommet.',
                    'Colle un bord de l’équerre sur un côté.',
                    'Regarde si l’autre côté suit l’autre bord.']},
                bq('Un angle plus grand qu’un angle droit est :', ['obtus', 'aigu', 'droit'], 'Obtus : plus ouvert que l’angle droit.'),
            ]),
            ('Le carré et le rectangle', [
                {'type': 'visuel', 'visuel': figure(13, 6, poly((1, 1), (7, 1), (7, 5), (1, 5)), poly((9, 1), (12, 1), (12, 4), (9, 4))), 'legende': 'Un rectangle et un carré, tracés sur le quadrillage.'},
                {'type': 'tableau', 'titre': 'Carré et rectangle', 'colonnes': ['Figure', 'Côtés', 'Angles'], 'lignes': [
                    ['rectangle', '4 côtés, opposés de même longueur', '4 angles droits'], ['carré', '4 côtés de même longueur', '4 angles droits']]},
                {'type': 'piege', 'erreur': 'On dit qu’une figure est un rectangle sans vérifier ses angles.', 'correction': 'Vérifie les 4 angles avec l’équerre. Un seul angle non droit suffit.'},
                bq('Une figure a 4 côtés, mais un angle n’est pas droit. C’est :', ['ni un carré ni un rectangle', 'un rectangle', 'un carré'], 'Le carré et le rectangle ont 4 angles droits.'),
            ]),
            ('Le triangle', [
                {'type': 'visuel', 'visuel': figure(13, 6, poly((1, 5), (6, 5), (3, 1)), poly((8, 1), (8, 5), (12, 5))), 'legende': 'Un triangle, puis un triangle rectangle.'},
                {'type': 'explique', 'texte': 'Un triangle a **3 côtés** et **3 sommets**. S’il a un angle droit, c’est un **triangle rectangle**.'},
                bq('Combien de sommets a un triangle ?', ['3', '4', '2'], 'Un triangle a 3 côtés et 3 sommets.'),
            ]),
        ],
        a_toi=[
            q('Combien d’angles droits a un rectangle ?', ['4', '2', '1'], 'Les 4 angles d’un rectangle sont droits.'),
            q('Quel outil vérifie un angle droit ?', ['l’équerre', 'le compas', 'la gomme'], 'Le coin de l’équerre est un angle droit.'),
            q('Un triangle a un angle droit. C’est :', ['un triangle rectangle', 'un rectangle', 'un carré'], 'Un triangle avec un angle droit est un triangle rectangle.'),
        ],
        sources=[src(BO, 'L’élève sait dire qu’un rectangle a quatre sommets, quatre angles droits, quatre côtés et', 'Décrire le rectangle'),
                 src(BO, 'Il sait alors dire si l’angle est aigu (plus petit qu’un angle droit) ou obtus (plus grand', 'Angle aigu, angle obtus')]),

    'MA-C2-CE1-GEO-03': dict(duree=6, essentiel=
        'Le cercle est une ligne ronde et fermée. Le disque est la surface à l’intérieur.\n'
        'Le centre est au milieu. On trace un cercle avec un compas.',
        parties=[
            ('Cercle ou disque ?', [
                {'type': 'observe', 'consigne': 'Regarde une pièce de monnaie.', 'exemples': [
                    'Son bord est un cercle.', 'La pièce entière est un disque.']},
                {'type': 'visuel', 'visuel': {'type': 'figure', 'largeur': 12, 'hauteur': 7, 'elements': [
                    {'forme': 'cercle', 'centre': [3, 3.5], 'rayon': 2.5}, {'forme': 'point', 'en': [3, 3.5], 'nom': 'O'},
                    {'forme': 'cercle', 'centre': [9, 3.5], 'rayon': 2.5, 'plein': True}]}, 'legende': 'À gauche, un cercle de centre O. À droite, un disque.'},
                vocabulaire(2, 'Cercle', 'Disque', 'Centre'),
                bq('Une assiette posée sur la table a la forme :', ['d’un disque', 'd’un cercle', 'd’un carré'], 'L’assiette est pleine : c’est un disque. Son bord est un cercle.'),
            ]),
            ('Tracer un cercle', [
                {'type': 'methode', 'titre': 'Pour tracer un cercle au compas', 'etapes': [
                    'Marque le centre avec une croix.',
                    'Plante la pointe du compas sur le centre.',
                    'Tourne le compas sans changer son écartement.']},
                {'type': 'piege', 'erreur': 'On bouge la pointe pendant le tracé.', 'correction': 'La pointe reste sur le centre. Sinon, le cercle n’est pas rond.'},
                bq('Où plante-t-on la pointe du compas ?', ['sur le centre', 'sur le cercle', 'n’importe où'], 'La pointe reste sur le centre du cercle.'),
            ]),
        ],
        a_toi=[
            q('Le bord d’une roue est :', ['un cercle', 'un disque', 'un carré'], 'Le bord est une ligne : c’est un cercle.'),
            q('Quel outil sert à tracer un cercle ?', ['le compas', 'l’équerre', 'la règle'], 'On trace un cercle avec un compas.'),
            q('Comment s’appelle le point au milieu d’un cercle ?', ['le centre', 'le sommet', 'le côté'], 'C’est le centre du cercle.'),
        ],
        sources=[src(BO, 'disque, cercle, centre', 'Vocabulaire du cercle'),
                 src(BO, 'L’élève sait tracer un cercle avec un compas.', 'Tracer au compas')]),

    'MA-C2-CE1-DATA-01': dict(duree=6, essentiel=
        'Dans un diagramme en barres, chaque barre montre un nombre.\n'
        'Plus la barre est haute, plus le nombre est grand.\n'
        'Lis le nombre sur l’axe, en face du haut de la barre.',
        parties=[
            ('Lire un diagramme', [
                {'type': 'observe', 'consigne': 'Une classe a voté pour son fruit préféré.', 'exemples': [
                    '4 élèves aiment l’orange.', '12 élèves aiment la fraise.', '8 élèves aiment la banane.', '2 élèves aiment le kiwi.']},
                {'type': 'visuel', 'visuel': {'type': 'diagramme', 'titre': 'Fruit préféré', 'unite': 'élèves', 'pas': 2, 'barres': [
                    {'nom': 'orange', 'valeur': 4}, {'nom': 'fraise', 'valeur': 12}, {'nom': 'banane', 'valeur': 8}, {'nom': 'kiwi', 'valeur': 2}]},
                 'legende': 'Le fruit préféré des élèves de la classe.'},
                {'type': 'methode', 'titre': 'Pour lire une barre', 'etapes': [
                    'Trouve la barre du fruit.',
                    'Suis le haut de la barre jusqu’à l’axe.',
                    'Lis le nombre sur l’axe.']},
                bq('Combien d’élèves aiment la banane ?', ['8', '12', '4'], 'La barre « banane » monte jusqu’à 8.'),
            ]),
            ('Répondre à une question', [
                {'type': 'explique', 'texte': 'Le fruit **le plus aimé** a la barre la plus haute. Ici, c’est la fraise.'},
                {'type': 'exemple-resolu', 'enonce': 'Combien d’élèves de plus aiment la fraise que la banane ?', 'etapes': [
                    'Fraise : 12. Banane : 8.', 'On cherche l’écart : 12 − 8 = 4.'],
                 'conclusion': '4 élèves de plus aiment la fraise.'},
                {'type': 'piege', 'erreur': 'On compte les traits de l’axe au lieu de lire les nombres.', 'correction': 'L’axe va de 2 en 2. Lis le nombre écrit.'},
            ]),
        ],
        a_toi=[
            q('Quel fruit est le moins aimé ?', ['le kiwi', 'l’orange', 'la fraise'], 'La barre du kiwi est la plus basse : 2.'),
            q('Combien d’élèves aiment l’orange ?', ['4', '2', '8'], 'La barre « orange » monte jusqu’à 4.'),
            q('Combien d’élèves ont voté en tout ?', ['26', '24', '12'], '4 + 12 + 8 + 2 = 26.'),
        ],
        sources=[src(BO, 'Lire et interpréter les données d’un diagramme en barres', 'Lire un diagramme en barres'),
                 src(BO, 'L’élève sait répondre à des questions dont les réponses se lisent sur un diagramme en', 'Répondre à une question')]),

    'MA-C2-CE1-ESP-01': dict(duree=6, essentiel=
        'Pour situer un objet, on utilise des mots de position.\n'
        'Sur, sous, devant, derrière, entre, à gauche, à droite, près, loin.',
        parties=[
            ('Les mots de position', [
                {'type': 'observe', 'consigne': 'Imagine la chambre de Lina.', 'exemples': [
                    'Le chat dort sous le lit.', 'La lampe est sur la table.', 'Le tapis est entre le lit et l’armoire.']},
                {'type': 'tableau', 'titre': 'Des mots qui vont par deux', 'colonnes': ['Mot', 'Son contraire'], 'lignes': [
                    ['sur', 'sous'], ['devant', 'derrière'], ['à gauche', 'à droite'], ['au-dessus', 'en dessous'], ['près', 'loin']]},
                bq('Le contraire de « devant » est :', ['derrière', 'sous', 'loin'], 'Devant et derrière vont ensemble.'),
            ]),
            ('Gauche et droite', [
                {'type': 'explique', 'texte': 'La **gauche** et la **droite** dépendent de celui qui regarde. Lève la main qui tient ton crayon.'},
                {'type': 'piege', 'erreur': 'Face à face, on croit avoir la même droite.', 'correction': 'Face à toi, ma droite est de ton côté gauche.'},
                {'type': 'exemple-resolu', 'enonce': 'Trois enfants sont en rang : Léo, Sam, Mia. Qui est entre les deux autres ?', 'etapes': [
                    'Léo est au début. Mia est à la fin.', 'Sam est au milieu.'],
                 'conclusion': 'Sam est entre Léo et Mia.'},
            ]),
        ],
        a_toi=[
            q('Le chat est sous la table. La table est :', ['au-dessus du chat', 'sous le chat', 'derrière le chat'], 'Si le chat est sous la table, la table est au-dessus.'),
            q('Le contraire de « près » est :', ['loin', 'entre', 'sur'], 'Près et loin vont ensemble.'),
            q('Rang : Tom, Ana, Zoé. Qui est entre Tom et Zoé ?', ['Ana', 'Tom', 'Zoé'], 'Ana est au milieu du rang.'),
        ],
        sources=[src(BO, 'Connaitre et utiliser le vocabulaire lié aux positions relatives', 'Vocabulaire des positions'),
                 src(BO, 'sur, sous, entre, devant, derrière, au-dessus, en dessous ;', 'Liste des mots de position')]),
}

ecrire(COURS)
