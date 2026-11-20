"""Lot de cours : maths 6e, nombres, calcul, fractions, proportionnalité, algèbre et algorithmique.

    python3 scripts/cours/lot-6e-maths-nombres.py

Cycle 3 : phrases de 20 mots au plus. Les pages des extraits sont retrouvées ensuite dans les PDF archivés.
"""
from commun import bq, ecrire, q, src, vocabulaire

BO = 'bo16-2025-maths-c3'

COURS = {
    'MA-C3-6E-DEC-01': dict(duree=8, essentiel=
        'Pour comparer deux décimaux, on compare d’abord les parties entières.\n'
        'Si elles sont égales, on compare les dixièmes, puis les centièmes, puis les millièmes.\n'
        '2,5 > 2,45 car 5 dixièmes est plus grand que 4 dixièmes.',
        parties=[
            ('Comparer chiffre par chiffre', [
                {'type': 'observe', 'consigne': 'Compare 2,5 et 2,45.', 'exemples': [
                    'Parties entières : 2 et 2, elles sont égales.', 'Dixièmes : 5 et 4. Or 5 > 4.', 'Donc 2,5 > 2,45, même si 45 > 5.']},
                {'type': 'tableau', 'titre': 'Les deux nombres rangés par rang', 'colonnes': ['Nombre', 'Unités', 'Dixièmes', 'Centièmes'], 'lignes': [
                    ['2,5', '2', '5', '0'], ['2,45', '2', '4', '5']]},
                {'type': 'methode', 'titre': 'Pour comparer deux nombres décimaux', 'etapes': [
                    'Compare les parties entières.',
                    'Si elles sont égales, compare les chiffres des dixièmes.',
                    'Continue rang par rang jusqu’à trouver deux chiffres différents.',
                    'Tu peux ajouter des zéros à droite : 2,5 = 2,50.']},
                {'type': 'piege', 'erreur': 'On croit que 2,45 > 2,5 parce que 45 > 5.', 'correction': 'On ne compare pas les parties décimales comme des entiers. On compare rang par rang : 2,50 > 2,45.'},
                bq('Quel nombre est le plus grand ?', ['3,7', '3,68', '3,069'], 'Dixièmes : 7, 6 et 0. Le plus grand est 3,7.'),
            ]),
            ('Ranger des décimaux', [
                {'type': 'exemple-resolu', 'enonce': 'Range dans l’ordre croissant : 4,08 ; 4,8 ; 4,1 ; 4,018.', 'etapes': [
                    'Toutes les parties entières valent 4.',
                    'On écrit avec trois décimales : 4,080 ; 4,800 ; 4,100 ; 4,018.',
                    'On compare 80, 800, 100 et 18 millièmes.'],
                 'conclusion': '4,018 < 4,08 < 4,1 < 4,8'},
                bq('Quel nombre est compris entre 1,2 et 1,3 ?', ['1,25', '1,35', '1,195'], '1,20 < 1,25 < 1,30.'),
            ]),
        ],
        a_toi=[
            q('Quel signe va entre 0,7 et 0,69 ?', ['>', '<', '='], '0,70 > 0,69 : 7 dixièmes contre 6 dixièmes.'),
            q('Range dans l’ordre décroissant : 5,3 ; 5,03 ; 5,33.', ['5,33 ; 5,3 ; 5,03', '5,03 ; 5,3 ; 5,33', '5,3 ; 5,33 ; 5,03'], 'En centièmes : 533, 530, 503.'),
            q('Quel nombre est égal à 6,40 ?', ['6,4', '6,04', '64'], 'Un zéro à droite de la partie décimale ne change pas le nombre.'),
        ],
        sources=[src(BO, 'Comparer deux nombres décimaux', 'Comparer des décimaux en 6e'),
                 src(BO, 'Ordonner une liste de nombres décimaux', 'Ranger des décimaux')]),

    'MA-C3-6E-DEC-02': dict(duree=8, essentiel=
        'Multiplier par 10, 100 ou 1 000 : chaque chiffre prend une valeur 10, 100 ou 1 000 fois plus grande.\n'
        'Diviser par 10, 100 ou 1 000 : chaque chiffre prend une valeur 10, 100 ou 1 000 fois plus petite.\n'
        'Multiplier par 0,1, c’est diviser par 10. Multiplier par 0,01, c’est diviser par 100.',
        parties=[
            ('Multiplier par 10, 100, 1 000', [
                {'type': 'observe', 'consigne': 'Calcule 3,45 × 100.', 'exemples': [
                    '3 unités deviennent 3 centaines.', '4 dixièmes deviennent 4 dizaines.', '5 centièmes deviennent 5 unités.', '3,45 × 100 = 345.']},
                {'type': 'explique', 'texte': 'Ce n’est pas la virgule qui se déplace : ce sont les chiffres qui changent de rang. Le résultat est le même que si la virgule glissait vers la droite.'},
                {'type': 'piege', 'erreur': 'On ajoute des zéros à droite : 3,45 × 100 = 3,4500.', 'correction': '3,4500 = 3,45. Ajouter des zéros après la virgule ne multiplie pas. Le bon résultat est 345.'},
                bq('Combien font 0,6 × 1 000 ?', ['600', '0,6000', '6'], '6 dixièmes × 1 000 = 6 centaines.'),
            ]),
            ('Diviser par 10, 100, 1 000', [
                {'type': 'methode', 'titre': 'Pour diviser par 10, 100 ou 1 000', 'etapes': [
                    'Compte les zéros du diviseur : 1, 2 ou 3.',
                    'Chaque chiffre recule d’autant de rangs vers la droite.',
                    'Complète par des zéros si besoin : 72,1 ÷ 1 000 = 0,0721.']},
                bq('Combien font 58 ÷ 100 ?', ['0,58', '5,8', '5 800'], '5 dizaines deviennent 5 dixièmes : 0,58.'),
            ]),
            ('Multiplier par 0,1, 0,01, 0,001', [
                {'type': 'explique', 'texte': '0,1 est un dixième. Prendre un dixième d’un nombre, c’est le diviser par 10. Ainsi 45 × 0,01 = 45 ÷ 100 = 0,45.'},
                {'type': 'tableau', 'titre': 'Deux écritures du même calcul', 'colonnes': ['Multiplier par', 'C’est diviser par'], 'lignes': [
                    ['0,1', '10'], ['0,01', '100'], ['0,001', '1 000']]},
                bq('Combien font 7 × 0,1 ?', ['0,7', '70', '7,1'], '7 × 0,1 = 7 ÷ 10 = 0,7.'),
            ]),
        ],
        a_toi=[
            q('Combien font 2,07 × 10 ?', ['20,7', '2,070', '207'], 'Chaque chiffre gagne un rang : 20,7.'),
            q('Combien font 4,5 ÷ 1 000 ?', ['0,0045', '0,045', '4 500'], 'Chaque chiffre recule de trois rangs.'),
            q('Combien font 360 × 0,01 ?', ['3,6', '36', '0,36'], '360 ÷ 100 = 3,6.'),
        ],
        sources=[src(BO, 'L’élève applique de manière automatique la procédure de multiplication d’un nombre décimal par 1, par 10, par 100 ou par 1 000,', 'Multiplier par 10, 100, 1 000'),
                 src(BO, 'Multiplier un nombre entier ou un nombre décimal par 0,1, par 0,01, et par 0,001', 'Multiplier par 0,1, 0,01, 0,001')]),

    'MA-C3-6E-DEC-03': dict(duree=8, essentiel=
        'Une fraction décimale a pour dénominateur 10, 100, 1 000…\n'
        '1/10 = 0,1 ; 1/100 = 0,01 ; 1/1 000 = 0,001.\n'
        '4 107/1 000 = 4 + 107/1 000 = 4 + 1/10 + 7/1 000 = 4,107.',
        parties=[
            ('Fractions décimales et écriture à virgule', [
                vocabulaire(3, 'Numérateur', 'Dénominateur'),
                {'type': 'tableau', 'titre': 'Les rangs après la virgule', 'colonnes': ['Rang', 'Fraction', 'Écriture à virgule'], 'lignes': [
                    ['dixième', '1/10', '0,1'], ['centième', '1/100', '0,01'], ['millième', '1/1 000', '0,001']]},
                bq('Comment s’écrit 37/100 ?', ['0,37', '3,7', '0,037'], '37 centièmes : 0,37.'),
            ]),
            ('D’une écriture à l’autre', [
                {'type': 'exemple-resolu', 'enonce': 'Écris 4 + 1/10 + 7/1 000 avec une virgule.', 'etapes': [
                    '4 unités.', '1 dixième : chiffre 1 au rang des dixièmes.', '0 centième.', '7 millièmes : chiffre 7 au rang des millièmes.'],
                 'conclusion': '4 + 1/10 + 7/1 000 = 4,107'},
                {'type': 'methode', 'titre': 'Pour passer de 4,107 à une fraction décimale', 'etapes': [
                    'Compte les chiffres après la virgule : 3.',
                    'Le dénominateur est donc 1 000.',
                    'Le numérateur est le nombre sans virgule : 4 107.',
                    '4,107 = 4 107/1 000.']},
                {'type': 'piege', 'erreur': 'On écrit 7/1 000 = 0,7.', 'correction': '7 millièmes s’écrit au troisième rang : 0,007.'},
                bq('Quelle fraction est égale à 2,3 ?', ['23/10', '23/100', '2/3'], 'Un chiffre après la virgule : dénominateur 10.'),
            ]),
        ],
        a_toi=[
            q('Comment s’écrit 5 + 4/100 ?', ['5,04', '5,4', '5,004'], '4 centièmes : deuxième rang après la virgule.'),
            q('Quelle fraction est égale à 0,019 ?', ['19/1 000', '19/100', '19/10'], 'Trois chiffres après la virgule : 1 000.'),
            q('Que vaut 125/100 ?', ['1,25', '12,5', '0,125'], '125 centièmes = 1 unité et 25 centièmes.'),
        ],
        sources=[src(BO, 'L’élève passe de manière automatique d’une écriture sous forme de fraction décimale ou de somme de fractions décimales à', 'Fractions décimales et écriture à virgule')]),

    'MA-C3-6E-DEC-04': dict(duree=7, essentiel=
        'Arrondir, c’est remplacer un nombre par la valeur la plus proche à la précision demandée.\n'
        'On regarde le chiffre suivant : de 0 à 4, on garde ; de 5 à 9, on ajoute 1.\n'
        'L’arrondi au dixième de 3,476 est 3,5.',
        parties=[
            ('La valeur la plus proche', [
                vocabulaire(3, 'Arrondi'),
                {'type': 'observe', 'consigne': 'Arrondis 3,476 au dixième.', 'exemples': [
                    '3,476 est entre 3,4 et 3,5.', 'Le chiffre des centièmes est 7.', '7 ≥ 5 : on arrondit à 3,5.']},
                {'type': 'methode', 'titre': 'Pour arrondir', 'etapes': [
                    'Repère le rang de la précision demandée.',
                    'Regarde le chiffre juste à sa droite.',
                    'De 0 à 4 : on garde le chiffre. De 5 à 9 : on ajoute 1.',
                    'On efface les chiffres suivants.']},
                bq('Quel est l’arrondi à l’unité de 12,6 ?', ['13', '12', '12,6'], 'Le chiffre des dixièmes est 6 : on arrondit à 13.'),
            ]),
            ('Cas délicats', [
                {'type': 'exemple-resolu', 'enonce': 'Arrondis 4,98 au dixième.', 'etapes': [
                    'Le chiffre des centièmes est 8, on augmente le dixième.', '9 dixièmes + 1 dixième = 10 dixièmes = 1 unité.'],
                 'conclusion': 'L’arrondi au dixième de 4,98 est 5,0.'},
                {'type': 'piege', 'erreur': 'On tronque : l’arrondi de 2,68 au dixième serait 2,6.', 'correction': '2,68 est plus proche de 2,7 que de 2,6. L’arrondi est 2,7.'},
                {'type': 'explique', 'texte': 'Certains nombres ne sont pas décimaux. On utilise leur arrondi : 1/3 ≈ 0,33 au centième.'},
            ]),
        ],
        a_toi=[
            q('Arrondi au centième de 7,253 ?', ['7,25', '7,26', '7,3'], 'Le millième est 3 : on garde 7,25.'),
            q('Arrondi à l’unité de 0,5 ?', ['1', '0', '0,5'], 'Le dixième est 5 : on augmente, l’arrondi est 1.'),
            q('Arrondi au dixième de 9,96 ?', ['10,0', '9,9', '9,10'], '9,9 + 0,1 = 10,0.'),
        ],
        sources=[src(BO, 'Donner la valeur arrondie à l’unité, au dixième ou au centième, d’un nombre décimal', 'Arrondir un décimal'),
                 src(BO, 'Déterminer ou connaître la valeur arrondie de certains nombres non décimaux', 'Arrondi d’un nombre non décimal')]),

    'MA-C3-6E-DEC-05': dict(duree=9, essentiel=
        'Pour multiplier deux décimaux, on multiplie sans tenir compte des virgules.\n'
        'Le résultat a autant de chiffres après la virgule que les deux facteurs réunis.\n'
        'On vérifie avec un ordre de grandeur.',
        parties=[
            ('Un nouveau sens de la multiplication', [
                {'type': 'observe', 'consigne': 'Un rectangle mesure 2,5 cm sur 0,4 cm.', 'exemples': [
                    'Son aire est 2,5 × 0,4 cm².', 'Ce n’est plus une addition répétée : on ne peut pas ajouter 2,5 « 0,4 fois ».', '2,5 × 0,4 = 1 : l’aire est 1 cm².']},
                {'type': 'explique', 'texte': 'Multiplier par un nombre plus petit que 1 donne un résultat **plus petit** que le nombre de départ.'},
                bq('2,5 × 0,4 est-il plus petit que 2,5 ?', ['oui', 'non', 'on ne peut pas savoir'], '0,4 < 1, donc le produit est plus petit que 2,5.'),
            ]),
            ('La technique', [
                {'type': 'methode', 'titre': 'Pour calculer 3,6 × 1,25', 'etapes': [
                    'Calcule sans les virgules : 36 × 125 = 4 500.',
                    'Compte les décimales : 1 dans 3,6 et 2 dans 1,25, soit 3.',
                    'Place la virgule : 4,500 = 4,5.',
                    'Ordre de grandeur : 4 × 1 = 4. Le résultat est cohérent.']},
                {'type': 'piege', 'erreur': 'On aligne les virgules comme pour une addition.', 'correction': 'Pour multiplier, on aligne les chiffres à droite et on place la virgule à la fin.'},
                {'type': 'exemple-resolu', 'enonce': 'Calcule 0,3 × 0,2.', 'etapes': [
                    '3 × 2 = 6.', 'Deux décimales en tout.'],
                 'conclusion': '0,3 × 0,2 = 0,06'},
                bq('Combien font 1,2 × 0,5 ?', ['0,6', '6', '0,06'], '12 × 5 = 60, deux décimales : 0,60.'),
            ]),
        ],
        a_toi=[
            q('Combien font 4,5 × 2 ?', ['9', '8,10', '0,9'], '45 × 2 = 90, une décimale : 9,0.'),
            q('Combien font 0,7 × 0,8 ?', ['0,56', '5,6', '0,056'], '7 × 8 = 56, deux décimales.'),
            q('Ordre de grandeur de 19,8 × 3,1 ?', ['60', '6', '600'], '20 × 3 = 60.'),
        ],
        sources=[src(BO, 'Calculer le produit de deux nombres décimaux', 'Multiplier deux décimaux'),
                 src(BO, 'Contrôler les résultats à l’aide d’ordres de grandeur', 'Ordre de grandeur')]),

    'MA-C3-6E-DEC-06': dict(duree=8, essentiel=
        'Pour diviser un décimal par un entier, on pose la division.\n'
        'On place la virgule au quotient au moment où l’on abaisse le chiffre des dixièmes.\n'
        'On vérifie par une multiplication : 7,5 ÷ 3 = 2,5 car 2,5 × 3 = 7,5.',
        parties=[
            ('Partager une quantité décimale', [
                {'type': 'observe', 'consigne': 'Trois amis se partagent 7,50 € à parts égales.', 'exemples': [
                    '7 € ÷ 3 : 2 € chacun, il reste 1 €.', '1 € = 10 dixièmes. Avec les 5 dixièmes, cela fait 15 dixièmes.', '15 dixièmes ÷ 3 = 5 dixièmes. Chacun a 2,50 €.']},
                bq('Combien font 8,4 ÷ 2 ?', ['4,2', '4,02', '42'], '8 ÷ 2 = 4 et 4 dixièmes ÷ 2 = 2 dixièmes.'),
            ]),
            ('La division posée', [
                {'type': 'methode', 'titre': 'Pour poser 9,36 ÷ 4', 'etapes': [
                    'Divise la partie entière : 9 ÷ 4 = 2, reste 1.',
                    'Abaisse le 3 et place la virgule au quotient : 2,…',
                    '13 ÷ 4 = 3, reste 1. Abaisse le 6 : 16 ÷ 4 = 4.',
                    '9,36 ÷ 4 = 2,34. Vérifie : 2,34 × 4 = 9,36.']},
                {'type': 'explique', 'texte': 'Si la division ne s’arrête pas, on ajoute des zéros au dividende : 1 = 1,0 = 1,00. On continue jusqu’à la précision voulue.'},
                {'type': 'piege', 'erreur': 'On oublie la virgule au quotient : 9,36 ÷ 4 = 234.', 'correction': 'Ordre de grandeur : 9 ÷ 4 ≈ 2. Le quotient est 2,34.'},
                bq('Combien font 3 ÷ 4 ?', ['0,75', '1,33', '0,34'], '3 = 3,00. 300 centièmes ÷ 4 = 75 centièmes.'),
            ]),
        ],
        a_toi=[
            q('Combien font 6,3 ÷ 3 ?', ['2,1', '2,01', '21'], '6 ÷ 3 = 2 et 3 dixièmes ÷ 3 = 1 dixième.'),
            q('Combien font 12,5 ÷ 5 ?', ['2,5', '2,05', '25'], '2,5 × 5 = 12,5.'),
            q('5 cahiers coûtent 8,50 €. Prix d’un cahier ?', ['1,70 €', '1,07 €', '3,50 €'], '8,50 ÷ 5 = 1,70.'),
        ],
        sources=[src(BO, 'Diviser un nombre décimal par un nombre entier non nul inférieur à 10', 'Division décimale'),
                 src(BO, 'Résoudre des problèmes mettant en jeu des divisions décimales', 'Problèmes de division décimale')]),

    'MA-C3-6E-DIV-01': dict(duree=9, essentiel=
        'Diviser a par b, c’est trouver q et r tels que a = b × q + r avec r < b.\n'
        'a est le dividende, b le diviseur, q le quotient, r le reste.\n'
        '347 = 12 × 28 + 11 et 11 < 12.',
        parties=[
            ('Le vocabulaire', [
                vocabulaire(3, 'Dividende', 'Diviseur', 'Quotient', 'Reste'),
                {'type': 'observe', 'consigne': 'On range 347 œufs dans des boites de 12.', 'exemples': [
                    'On remplit 28 boites : 12 × 28 = 336.', 'Il reste 347 − 336 = 11 œufs.', 'On écrit 347 = 12 × 28 + 11.']},
                bq('Dans 50 = 7 × 7 + 1, quel est le reste ?', ['1', '7', '50'], 'Le reste est 1, et 1 < 7.'),
            ]),
            ('Poser la division', [
                {'type': 'methode', 'titre': 'Pour diviser 347 par 12', 'etapes': [
                    'Prends assez de chiffres : 34 ÷ 12 = 2, reste 10.',
                    'Abaisse le 7 : 107 ÷ 12 = 8, reste 11.',
                    'Le quotient est 28, le reste est 11.',
                    'Vérifie : 12 × 28 + 11 = 347 et 11 < 12.']},
                {'type': 'piege', 'erreur': 'On écrit 347 = 12 × 27 + 23.', 'correction': 'C’est vrai, mais 23 > 12 : on peut encore remplir une boite. Le reste doit être plus petit que le diviseur.'},
                bq('Quel est le quotient de 100 par 8 ?', ['12', '12,5', '4'], '8 × 12 = 96, reste 4.'),
            ]),
            ('Choisir la bonne réponse au problème', [
                {'type': 'exemple-resolu', 'enonce': '130 élèves partent en sortie. Un car a 48 places. Combien faut-il de cars ?', 'etapes': [
                    '130 = 48 × 2 + 34.', 'Deux cars ne suffisent pas : il reste 34 élèves.'],
                 'conclusion': 'Il faut 3 cars.'},
            ]),
        ],
        a_toi=[
            q('Quel est le reste de 75 divisé par 9 ?', ['3', '8', '0'], '9 × 8 = 72, 75 − 72 = 3.'),
            q('Quelle égalité traduit la division euclidienne de 60 par 7 ?', ['60 = 7 × 8 + 4', '60 = 7 × 7 + 11', '60 = 8 × 7 + 5'], 'Le reste 4 est plus petit que 7.'),
            q('200 billes en sachets de 15. Combien de sachets pleins ?', ['13', '14', '15'], '15 × 13 = 195, reste 5.'),
        ],
        sources=[src(BO, 'Effectuer la division euclidienne d’un nombre entier par un nombre entier inférieur à 100', 'Division euclidienne'),
                 src(BO, 'Résoudre des problèmes mettant en jeu des divisions euclidiennes', 'Problèmes de division euclidienne')]),

    'MA-C3-6E-FRAC-01': dict(duree=7, essentiel=
        'À connaitre par cœur : 1/4 = 0,25 ; 1/2 = 0,5 ; 3/4 = 0,75.\n'
        '3/2 = 1,5 ; 4/2 = 2 ; 5/2 = 2,5.\n'
        '1/4 + 1/4 = 1/2 ; 1/2 + 1/4 = 3/4 ; 1 − 1/4 = 3/4.',
        parties=[
            ('Fractions et décimaux usuels', [
                {'type': 'tableau', 'titre': 'Les écritures à connaitre', 'colonnes': ['Fraction', 'Écriture décimale'], 'lignes': [
                    ['1/4', '0,25'], ['1/2', '0,5'], ['3/4', '0,75'], ['3/2', '1,5'], ['4/2', '2'], ['5/2', '2,5']]},
                {'type': 'visuel', 'visuel': {'type': 'fractions', 'barres': [{'parts': 4, 'coloriees': 1, 'nom': '1/4'}, {'parts': 2, 'coloriees': 1, 'nom': '1/2'}, {'parts': 4, 'coloriees': 3, 'nom': '3/4'}]}, 'legende': 'Un quart, un demi et trois quarts de la même bande.'},
                bq('Quelle écriture est égale à 0,75 ?', ['3/4', '7/5', '1/75'], '3 quarts : 0,25 + 0,25 + 0,25 = 0,75.'),
            ]),
            ('Calculer avec des quarts et des demis', [
                {'type': 'methode', 'titre': 'Pour calculer 1/2 + 1/4', 'etapes': [
                    'Écris le demi en quarts : 1/2 = 2/4.',
                    'Ajoute les quarts : 2/4 + 1/4 = 3/4.']},
                {'type': 'piege', 'erreur': 'On ajoute numérateurs et dénominateurs : 1/2 + 1/4 = 2/6.', 'correction': 'On ajoute des parts de même taille. 1/2 = 2/4, donc 1/2 + 1/4 = 3/4.'},
                bq('Combien font 1 − 1/2 ?', ['1/2', '0', '1/4'], 'Un entier, c’est deux demis. 2/2 − 1/2 = 1/2.'),
            ]),
        ],
        a_toi=[
            q('Combien font 1/4 + 1/4 ?', ['1/2', '2/8', '1/8'], '2/4 = 1/2.'),
            q('Comment s’écrit 5/2 en décimal ?', ['2,5', '5,2', '0,52'], '5 demis = 2 unités et 1 demi.'),
            q('Combien font 3/4 − 1/2 ?', ['1/4', '2/2', '1/2'], '3/4 − 2/4 = 1/4.'),
        ],
        sources=[src(BO, 'L’élève sait passer de manière automatique d’une écriture fractionnaire à une écriture décimale, et inversement, dans les cas', 'Fractions usuelles')]),

    'MA-C3-6E-FRAC-02': dict(duree=8, essentiel=
        'Pour prendre une fraction d’un nombre, on divise par le dénominateur puis on multiplie par le numérateur.\n'
        '2/3 de 12 : 12 ÷ 3 = 4, puis 2 × 4 = 8.\n'
        'On peut aussi écrire 2/3 × 12 = 8.',
        parties=[
            ('Fraction d’une quantité', [
                {'type': 'observe', 'consigne': 'Calcule les 2/3 de 12 œufs.', 'exemples': [
                    'Un tiers de 12 œufs : 12 ÷ 3 = 4 œufs.', 'Deux tiers : 2 × 4 = 8 œufs.']},
                {'type': 'visuel', 'visuel': {'type': 'grille', 'lignes': 3, 'colonnes': 4, 'coloriees': 8}, 'legende': '12 œufs en 3 rangées de 4 : 2 rangées sur 3, soit 8 œufs.'},
                bq('Combien font les 3/4 de 20 € ?', ['15 €', '5 €', '60 €'], '20 ÷ 4 = 5, puis 3 × 5 = 15.'),
            ]),
            ('La fraction comme opérateur', [
                {'type': 'explique', 'texte': 'Prendre les 2/3 de 12, c’est calculer 2/3 × 12. On peut aussi faire 2 × 12 = 24, puis 24 ÷ 3 = 8.'},
                {'type': 'methode', 'titre': 'Pour calculer a/b de N', 'etapes': [
                    'Divise N par b.',
                    'Multiplie le résultat par a.',
                    'Si N ÷ b ne tombe pas juste, multiplie d’abord par a.']},
                {'type': 'piege', 'erreur': 'On multiplie par le dénominateur : 2/3 de 12 = 36.', 'correction': 'Une fraction plus petite que 1 donne une partie, donc un résultat plus petit que 12.'},
                bq('Combien font les 3/4 de 10 m ?', ['7,5 m', '7 m', '13,3 m'], '3 × 10 = 30, puis 30 ÷ 4 = 7,5.'),
            ]),
        ],
        a_toi=[
            q('Les 2/5 de 25 ?', ['10', '5', '50'], '25 ÷ 5 = 5, puis 2 × 5 = 10.'),
            q('Les 5/6 d’une classe de 24 élèves sont demi-pensionnaires. Combien ?', ['20', '4', '29'], '24 ÷ 6 = 4, puis 5 × 4 = 20.'),
            q('Combien font 1/3 × 21 ?', ['7', '63', '24'], 'Un tiers de 21 : 21 ÷ 3 = 7.'),
        ],
        sources=[src(BO, 'Utiliser une multiplication pour appliquer une fraction à un nombre entier', 'Fraction d’un nombre')]),

    'MA-C3-6E-FRAC-03': dict(duree=9, essentiel=
        'Pour additionner ou soustraire deux fractions, on les écrit avec le même dénominateur.\n'
        'On ajoute ou on soustrait les numérateurs, on garde le dénominateur.\n'
        '1/3 + 5/6 = 2/6 + 5/6 = 7/6.',
        parties=[
            ('Même dénominateur', [
                {'type': 'observe', 'consigne': 'Calcule 3/7 + 2/7.', 'exemples': [
                    'Ce sont des septièmes.', '3 septièmes + 2 septièmes = 5 septièmes.', '3/7 + 2/7 = 5/7.']},
                bq('Combien font 9/10 − 4/10 ?', ['5/10', '5/0', '13/10'], '9 dixièmes − 4 dixièmes = 5 dixièmes.'),
            ]),
            ('Dénominateurs différents', [
                {'type': 'methode', 'titre': 'Pour calculer 1/3 + 5/6', 'etapes': [
                    'Cherche si un dénominateur est un multiple de l’autre : 6 = 2 × 3.',
                    'Transforme : 1/3 = 2/6 (on multiplie haut et bas par 2).',
                    'Ajoute : 2/6 + 5/6 = 7/6.']},
                {'type': 'piege', 'erreur': '1/3 + 5/6 = 6/9.', 'correction': 'On n’ajoute jamais les dénominateurs. On ramène au même dénominateur.'},
                {'type': 'exemple-resolu', 'enonce': 'Calcule 3/4 − 3/8.', 'etapes': [
                    '8 = 2 × 4, donc 3/4 = 6/8.', '6/8 − 3/8 = 3/8.'],
                 'conclusion': '3/4 − 3/8 = 3/8'},
                bq('Combien font 1/2 + 3/10 ?', ['8/10', '4/12', '4/10'], '1/2 = 5/10, et 5/10 + 3/10 = 8/10.'),
            ]),
            ('Avec un entier', [
                {'type': 'explique', 'texte': 'Un entier s’écrit comme une fraction : 2 = 10/5. Donc 2 + 1/5 = 10/5 + 1/5 = 11/5.'},
            ]),
        ],
        a_toi=[
            q('Combien font 2/9 + 5/9 ?', ['7/9', '7/18', '10/9'], 'Même dénominateur : 2 + 5 = 7.'),
            q('Combien font 5/6 − 1/3 ?', ['3/6', '4/3', '4/6'], '1/3 = 2/6, puis 5/6 − 2/6 = 3/6.'),
            q('Combien font 1 + 3/4 ?', ['7/4', '4/4', '4/5'], '1 = 4/4, puis 4/4 + 3/4 = 7/4.'),
        ],
        sources=[src(BO, 'Additionner et soustraire des fractions', 'Additionner des fractions')]),

    'MA-C3-6E-FRAC-04': dict(duree=8, essentiel=
        'a/b est le nombre qui, multiplié par b, donne a : b × a/b = a.\n'
        'C’est le résultat exact de la division de a par b : 7/4 = 7 ÷ 4 = 1,75.\n'
        'Certaines fractions ne sont pas des décimaux : 1/3 = 0,333…',
        parties=[
            ('La fraction quotient', [
                {'type': 'observe', 'consigne': 'On partage une bande de 3 cm en 4 parts égales.', 'exemples': [
                    'Chaque part mesure 3 ÷ 4 cm.', 'C’est le quart de 3 cm : 3/4 cm.', '3 ÷ 4 = 0,75 : chaque part mesure 0,75 cm.']},
                {'type': 'explique', 'texte': '3/4 a deux sens qui donnent le même nombre : trois quarts de l’unité, et le quart de 3.'},
                bq('Quel nombre multiplié par 5 donne 2 ?', ['2/5', '5/2', '10'], 'Par définition, 5 × 2/5 = 2.'),
            ]),
            ('Égalités à trous', [
                {'type': 'methode', 'titre': 'Pour compléter 6 × … = 13', 'etapes': [
                    'Le nombre cherché multiplié par 6 donne 13.',
                    'C’est le quotient de 13 par 6.',
                    'On écrit 13/6.']},
                {'type': 'piege', 'erreur': 'On répond 6/13.', 'correction': 'Le numérateur est le résultat de la multiplication : 6 × 13/6 = 13.'},
                bq('Complète : 3 × … = 7', ['7/3', '3/7', '4'], '3 × 7/3 = 7.'),
            ]),
            ('Sur une demi-droite graduée', [
                {'type': 'exemple-resolu', 'enonce': 'Place 7/4 sur une demi-droite graduée en quarts.', 'etapes': [
                    'Chaque unité est partagée en 4.', 'On compte 7 quarts depuis 0.', '7/4 = 4/4 + 3/4 = 1 + 3/4.'],
                 'conclusion': '7/4 est entre 1 et 2, aux trois quarts du chemin.'},
            ]),
        ],
        a_toi=[
            q('Quelle est l’écriture décimale de 9/4 ?', ['2,25', '2,4', '0,44'], '9 ÷ 4 = 2,25.'),
            q('Complète : 8 × … = 3', ['3/8', '8/3', '5'], '8 × 3/8 = 3.'),
            q('Quelle fraction n’est pas un nombre décimal ?', ['2/3', '3/4', '7/10'], '2 ÷ 3 = 0,666… ne s’arrête jamais.'),
        ],
        sources=[src(BO, 'Relier une fraction au résultat exact de la division de son numérateur par son dénominateur', 'Fraction quotient'),
                 src(BO, 'Compléter des égalités à trous multiplicatives', 'Égalités à trous')]),

    'MA-C3-6E-FRAC-05': dict(duree=8, essentiel=
        'On ne change pas une fraction en multipliant numérateur et dénominateur par le même nombre : 2/3 = 4/6.\n'
        'Avec le même dénominateur, la plus grande fraction a le plus grand numérateur.\n'
        '7/3 = 2 + 1/3 : 7/3 est entre 2 et 3.',
        parties=[
            ('Fractions égales', [
                {'type': 'observe', 'consigne': 'Compare 2/3 et 4/6 sur deux bandes identiques.', 'exemples': [
                    'On coupe chaque tiers en deux.', '2 tiers deviennent 4 sixièmes.', 'La partie coloriée est la même.']},
                {'type': 'visuel', 'visuel': {'type': 'fractions', 'barres': [{'parts': 3, 'coloriees': 2, 'nom': '2/3'}, {'parts': 6, 'coloriees': 4, 'nom': '4/6'}]}, 'legende': '2/3 et 4/6 recouvrent la même longueur.'},
                bq('Quelle fraction est égale à 3/5 ?', ['6/10', '3/10', '5/3'], 'On multiplie haut et bas par 2.'),
            ]),
            ('Comparer', [
                {'type': 'methode', 'titre': 'Pour comparer deux fractions', 'etapes': [
                    'Même dénominateur : compare les numérateurs. 3/5 < 4/5.',
                    'Sinon, écris-les avec le même dénominateur : 2/3 = 8/12 et 3/4 = 9/12.',
                    'Compare ensuite les numérateurs : 8/12 < 9/12.']},
                {'type': 'piege', 'erreur': 'On croit que 1/8 > 1/4 car 8 > 4.', 'correction': 'Plus on partage, plus les parts sont petites. 1/8 < 1/4.'},
                bq('Quelle fraction est la plus grande ?', ['5/6', '2/3', '1/2'], 'En sixièmes : 5/6, 4/6 et 3/6.'),
            ]),
            ('Encadrer entre deux entiers', [
                {'type': 'exemple-resolu', 'enonce': 'Encadre 17/5 entre deux entiers consécutifs.', 'etapes': [
                    '17 = 5 × 3 + 2.', 'Donc 17/5 = 3 + 2/5.'],
                 'conclusion': '3 < 17/5 < 4'},
            ]),
        ],
        a_toi=[
            q('Quel signe va entre 3/7 et 5/7 ?', ['<', '>', '='], 'Même dénominateur : 3 < 5.'),
            q('Entre quels entiers est 11/4 ?', ['2 et 3', '1 et 2', '11 et 12'], '11/4 = 2 + 3/4.'),
            q('Quelle fraction est égale à 1 ?', ['7/7', '1/7', '7/1'], '7 septièmes font une unité.'),
        ],
        sources=[src(BO, 'Comparer et encadrer des fractions', 'Comparer des fractions'),
                 src(BO, 'Établir des égalités de fractions', 'Fractions égales')]),

    'MA-C3-6E-PCT-01': dict(duree=8, essentiel=
        'Un pourcentage est une proportion sur 100 : 25 % = 25/100.\n'
        'Prendre 25 % de 80, c’est calculer 25/100 × 80 = 20.\n'
        'À connaitre : 50 % = la moitié, 25 % = le quart, 10 % = le dixième.',
        parties=[
            ('Le sens d’un pourcentage', [
                vocabulaire(3, 'Pourcentage'),
                {'type': 'observe', 'consigne': '40 % des élèves d’un collège viennent à pied.', 'exemples': [
                    'Sur 100 élèves, 40 viennent à pied.', 'Sur 200 élèves, 80 viennent à pied.', 'La proportion reste la même : 40 sur 100.']},
                {'type': 'tableau', 'titre': 'Pourcentages usuels', 'colonnes': ['Pourcentage', 'Fraction', 'Calcul'], 'lignes': [
                    ['50 %', '1/2', 'diviser par 2'], ['25 %', '1/4', 'diviser par 4'], ['75 %', '3/4', 'diviser par 4, multiplier par 3'], ['10 %', '1/10', 'diviser par 10'], ['100 %', '1', 'le tout']]},
                bq('Combien font 50 % de 36 ?', ['18', '50', '72'], '50 %, c’est la moitié.'),
            ]),
            ('Appliquer un pourcentage', [
                {'type': 'methode', 'titre': 'Pour calculer 30 % de 70 €', 'etapes': [
                    'Calcule 10 % : 70 ÷ 10 = 7 €.',
                    '30 %, c’est 3 fois 10 % : 3 × 7 = 21 €.']},
                {'type': 'exemple-resolu', 'enonce': 'Un jeu coûte 40 €. Il est soldé à −25 %. Quel est son nouveau prix ?', 'etapes': [
                    '25 % de 40 € = 40 ÷ 4 = 10 €.', 'Nouveau prix : 40 − 10 = 30 €.'],
                 'conclusion': 'Le jeu coûte 30 €.'},
                {'type': 'piege', 'erreur': 'On soustrait le pourcentage directement : 40 − 25 = 15 €.', 'correction': '25 % n’est pas 25 €. On calcule d’abord 25 % de 40 €.'},
            ]),
        ],
        a_toi=[
            q('Combien font 10 % de 250 ?', ['25', '2,5', '240'], '250 ÷ 10 = 25.'),
            q('Combien font 75 % de 60 ?', ['45', '15', '75'], '60 ÷ 4 = 15, puis 3 × 15 = 45.'),
            q('Sur 20 élèves, 5 portent des lunettes. Quel pourcentage ?', ['25 %', '5 %', '20 %'], '5/20 = 25/100.'),
        ],
        sources=[src(BO, 'Appliquer un pourcentage à une grandeur ou à un nombre', 'Appliquer un pourcentage'),
                 src(BO, 'Comprendre le sens d’un pourcentage', 'Sens d’un pourcentage')]),

    'MA-C3-6E-PROP-01': dict(duree=9, essentiel=
        'Deux grandeurs sont proportionnelles si l’on passe de l’une à l’autre en multipliant toujours par le même nombre.\n'
        'Linéarité : si la quantité est multipliée par 4, le prix est multiplié par 4.\n'
        'Retour à l’unité : on calcule d’abord le prix d’un objet.',
        parties=[
            ('Reconnaitre une situation de proportionnalité', [
                {'type': 'observe', 'consigne': 'Des pommes coûtent 2 € le kilo.', 'exemples': [
                    '1 kg coûte 2 €.', '3 kg coûtent 6 €.', '5 kg coûtent 10 €.', 'Le prix au kilo est toujours 2 € : c’est proportionnel.']},
                {'type': 'tableau', 'titre': 'Prix des pommes', 'colonnes': ['Masse (kg)', 'Prix (€)'], 'lignes': [['1', '2'], ['3', '6'], ['5', '10']]},
                {'type': 'piege', 'erreur': 'On croit que l’âge et la taille sont proportionnels.', 'correction': 'À 10 ans on ne mesure pas deux fois sa taille de 5 ans. Ce n’est pas proportionnel.'},
                bq('Un taxi prend 3 € de départ, puis 1 € par km. Le prix est-il proportionnel à la distance ?', ['non', 'oui', 'parfois'], 'Pour 0 km, on paie déjà 3 €. Ce n’est pas proportionnel.'),
            ]),
            ('Trois procédures', [
                {'type': 'methode', 'titre': 'Linéarité multiplicative', 'etapes': [
                    '3 kg coûtent 6 €.',
                    '12 kg, c’est 4 fois plus.',
                    'Le prix est 4 fois plus grand : 4 × 6 = 24 €.']},
                {'type': 'methode', 'titre': 'Linéarité additive', 'etapes': [
                    '3 kg coûtent 6 € et 5 kg coûtent 10 €.',
                    '8 kg = 3 kg + 5 kg.',
                    'Prix : 6 + 10 = 16 €.']},
                {'type': 'methode', 'titre': 'Retour à l’unité', 'etapes': [
                    '4 cahiers coûtent 10 €.',
                    '1 cahier coûte 10 ÷ 4 = 2,50 €.',
                    '7 cahiers coûtent 7 × 2,50 = 17,50 €.']},
                bq('6 croissants coûtent 7,20 €. Combien coûtent 3 croissants ?', ['3,60 €', '4,20 €', '14,40 €'], '3, c’est la moitié de 6 : 7,20 ÷ 2.'),
            ]),
        ],
        a_toi=[
            q('5 m de tissu coûtent 40 €. Combien coûtent 15 m ?', ['120 €', '50 €', '80 €'], '15 = 3 × 5, donc 3 × 40.'),
            q('Une recette pour 4 personnes demande 200 g de farine. Pour 6 personnes ?', ['300 g', '400 g', '250 g'], '1 personne : 50 g. 6 × 50 = 300.'),
            q('Un robinet remplit 12 L en 3 min. Combien en 5 min ?', ['20 L', '15 L', '36 L'], '1 min : 4 L. 5 × 4 = 20.'),
        ],
        sources=[src(BO, 'Résoudre un problème de proportionnalité en choisissant une procédure adaptée : propriété de linéarité pour la multiplication', 'Procédures de proportionnalité'),
                 src(BO, 'Identifier si une situation relève du « modèle » de la proportionnalité', 'Reconnaitre la proportionnalité')]),

    'MA-C3-6E-ALG-01': dict(duree=7, essentiel=
        'Un motif évolutif change d’une étape à l’autre selon une règle.\n'
        'On cherche ce qui reste fixe et ce qui s’ajoute à chaque étape.\n'
        'Étapes de 3, 5, 7 allumettes : on ajoute 2. À l’étape n, il y a 2 × n + 1 allumettes.',
        parties=[
            ('Repérer la régularité', [
                {'type': 'observe', 'consigne': 'Une frise de triangles en allumettes.', 'exemples': [
                    'Étape 1 : 3 allumettes.', 'Étape 2 : 5 allumettes.', 'Étape 3 : 7 allumettes.', 'Chaque nouveau triangle ajoute 2 allumettes.']},
                {'type': 'tableau', 'titre': 'Nombre d’allumettes', 'colonnes': ['Étape', 'Allumettes', 'Calcul'], 'lignes': [
                    ['1', '3', '1 + 2 × 1'], ['2', '5', '1 + 2 × 2'], ['3', '7', '1 + 2 × 3'], ['10', '21', '1 + 2 × 10']]},
                bq('Combien d’allumettes à l’étape 4 ?', ['9', '8', '12'], '7 + 2 = 9.'),
            ]),
            ('Prévoir une étape lointaine', [
                {'type': 'methode', 'titre': 'Pour trouver une étape lointaine', 'etapes': [
                    'Repère ce qui est présent dès le départ : 1 allumette.',
                    'Repère ce qui s’ajoute à chaque étape : 2 allumettes.',
                    'Écris le calcul pour l’étape voulue : 1 + 2 × 50 = 101.']},
                {'type': 'piege', 'erreur': 'On calcule l’étape 10 en doublant l’étape 5 : 2 × 11 = 22.', 'correction': 'Le départ fixe n’est compté qu’une fois. Étape 10 : 1 + 2 × 10 = 21.'},
            ]),
        ],
        a_toi=[
            q('Suite 4, 7, 10, 13… Quel nombre suit ?', ['16', '15', '17'], 'On ajoute 3 à chaque fois.'),
            q('Un motif a 5 carrés à l’étape 1 et gagne 4 carrés par étape. Étape 3 ?', ['13', '12', '15'], '5 + 4 + 4 = 13.'),
            q('Avec la règle 1 + 2 × n, combien d’allumettes à l’étape 100 ?', ['201', '200', '102'], '1 + 200 = 201.'),
        ],
        sources=[src(BO, 'Identifier la structure d’un motif évolutif en repérant une régularité et en identifiant une structure', 'Motifs évolutifs'),
                 src(BO, 'Trouver le nombre d’éléments pour une étape donnée dans une suite de motifs évolutive', 'Étape donnée')]),

    'MA-C3-6E-ALGO-01': dict(duree=7, essentiel=
        'Un programme est une suite d’instructions exécutées dans l’ordre.\n'
        'Une boucle « répéter n fois » évite d’écrire n fois les mêmes instructions.\n'
        'Répéter 4 fois : avancer de 50, tourner de 90°. On obtient un carré.',
        parties=[
            ('Exécuter une séquence', [
                {'type': 'observe', 'consigne': 'Le lutin part en regardant vers la droite.', 'exemples': [
                    'Avancer de 50 pas.', 'Tourner de 90° vers la gauche.', 'Avancer de 50 pas.', 'Il a tracé deux côtés d’un carré.']},
                {'type': 'methode', 'titre': 'Pour exécuter un programme', 'etapes': [
                    'Lis les instructions une par une, dans l’ordre.',
                    'Note la position et l’orientation après chacune.',
                    'Dans une boucle, refais le bloc le nombre de fois indiqué.']},
                bq('Combien de côtés trace « répéter 3 fois : avancer de 60, tourner de 120° » ?', ['3', '6', '120'], 'Chaque tour de boucle trace un côté : un triangle équilatéral.'),
            ]),
            ('Écrire une boucle', [
                {'type': 'exemple-resolu', 'enonce': 'Écris un programme pour tracer un carré de côté 50.', 'etapes': [
                    'Un carré a 4 côtés égaux et 4 angles droits.', 'Le bloc à répéter : avancer de 50, tourner de 90°.'],
                 'conclusion': 'Répéter 4 fois : avancer de 50, tourner de 90°.'},
                {'type': 'piege', 'erreur': 'On place « tourner » hors de la boucle.', 'correction': 'Le lutin avancerait 4 fois tout droit. Le virage doit être répété avec le côté.'},
            ]),
        ],
        a_toi=[
            q('Que trace « répéter 6 fois : avancer de 40, tourner de 60° » ?', ['un hexagone', 'un carré', 'un triangle'], '6 côtés égaux : un hexagone.'),
            q('Quel bloc trace un carré ?', ['répéter 4 fois : avancer 30, tourner 90°', 'répéter 2 fois : avancer 30, tourner 90°', 'répéter 4 fois : avancer 30, tourner 60°'], '4 côtés et 4 angles droits.'),
            q('Une boucle sert à :', ['répéter des instructions', 'effacer le dessin', 'changer de couleur'], 'Elle répète un bloc d’instructions.'),
        ],
        sources=[src(BO, 'Produire et exécuter une séquence d’instructions', 'Séquences d’instructions')]),
}

ecrire(COURS)
