"""Lot de cours : maths CM2, nombres, calcul et problèmes. Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-cm2-maths-nombres.py
    python3 scripts/cours/pages.py content/cours/MA-C3-CM2-*.json

Cycle 3 : phrases de 20 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
Orthographe des nombres : rectifications de 1990 (traits d'union partout).
"""
from commun import barres, bq, ecrire, q, source_referentiel as ref, vocabulaire

COURS = {
    'MA-C3-CM2-ENT-01': dict(duree=7, essentiel=
        'Au CM2, on lit les nombres jusqu’à 999 999 999, classe par classe : les millions, les mille, puis les unités.\n'
        'On laisse un espace entre deux classes : 452 300 718.\n'
        '1 million = 1 000 milliers = 1 000 000.',
        parties=[
            ('Trois classes', [
                {'type': 'tableau', 'titre': 'Le nombre 452 300 718', 'colonnes': ['Classe', 'centaines', 'dizaines', 'unités'], 'lignes': [
                    ['des millions', '4', '5', '2'], ['des mille', '3', '0', '0'], ['des unités', '7', '1', '8']]},
                {'type': 'explique', 'texte': 'On lit : quatre-cent-cinquante-deux-millions-trois-cent-mille-sept-cent-dix-huit.'},
                bq('Quel nombre vient juste après 2 999 999 ?', ['3 000 000', '2 999 990', '30 000 000'], '2 999 999 + 1 = 3 000 000.'),
            ]),
            ('Les zéros comptent', [
                {'type': 'piege', 'erreur': 'On écrit deux-millions-cinq-mille ainsi : 25 000.', 'correction': 'Chaque classe garde ses trois chiffres : 2 005 000.'},
                {'type': 'observe', 'consigne': 'La suite des nombres au passage d’une classe.', 'exemples': [
                    '999 999 + 1 = 1 000 000', '9 999 999 + 1 = 10 000 000', '99 999 999 + 1 = 100 000 000']},
            ]),
        ],
        a_toi=[
            q('Combien de milliers dans 1 million ?', ['1 000', '100', '10 000'], '1 000 × 1 000 = 1 000 000.'),
            q('Comment écrit-on trente-millions-quarante-mille en chiffres ?', ['30 040 000', '30 400 000', '3 040 000'], '30 millions, 040 mille, 000 unités.'),
            q('Quel nombre vient juste avant 100 000 000 ?', ['99 999 999', '99 999 000', '10 000 000'], '100 000 000 − 1 = 99 999 999.'),
        ],
        sources=[ref('MA-C3-CM2-ENT-01', 'Suite écrite et orale jusqu’à 999 999 999')]),

    'MA-C3-CM2-ENT-02': dict(duree=6, essentiel=
        'La valeur d’un chiffre dépend de son rang.\n'
        'Dans 586 304 127, le chiffre 8 est au rang des dizaines de millions : il vaut 80 000 000.\n'
        'Son nombre de milliers est 586 304 : on lit tout ce qui est à gauche, milliers compris.',
        parties=[
            ('Rang et valeur', [
                {'type': 'tableau', 'titre': 'Les chiffres de 586 304 127', 'colonnes': ['Chiffre', 'Rang', 'Valeur'], 'lignes': [
                    ['5', 'centaines de millions', '500 000 000'], ['8', 'dizaines de millions', '80 000 000'], ['6', 'millions', '6 000 000'], ['3', 'centaines de mille', '300 000']]},
                bq('Dans 241 786 053, que vaut le chiffre 4 ?', ['40 000 000', '4 000 000', '400 000'], 'Le 4 est au rang des dizaines de millions.'),
            ]),
            ('Chiffre de ou nombre de ?', [
                {'type': 'explique', 'texte': 'Dans 586 304 127, le chiffre des milliers est 4. Le nombre de milliers est 586 304.'},
                {'type': 'piege', 'erreur': 'On répond 4 quand on demande le nombre de milliers.', 'correction': 'Le nombre de milliers compte tous les milliers : 586 304.'},
            ]),
        ],
        a_toi=[
            q('Dans 73 652 910, quel est le chiffre des centaines de mille ?', ['6', '3', '5'], '7 dizaines de millions, 3 millions, 6 centaines de mille.'),
            q('Combien de dizaines de mille dans 1 000 000 ?', ['100', '10', '1 000'], '100 × 10 000 = 1 000 000.'),
            q('Quel est le nombre de millions dans 47 300 000 ?', ['47', '7', '473'], 'On lit tout ce qui est à gauche du rang des millions, lui compris.'),
        ],
        sources=[ref('MA-C3-CM2-ENT-02', 'Valeur des chiffres selon leur position')]),

    'MA-C3-CM2-ENT-03': dict(duree=6, essentiel=
        'Le nombre qui a le plus de chiffres est le plus grand.\n'
        'S’ils ont autant de chiffres, on compare de gauche à droite.\n'
        '3 450 000 < 3 504 000 : mêmes millions, puis 4 centaines de mille contre 5.',
        parties=[
            ('Comparer', [
                {'type': 'methode', 'titre': 'Pour comparer deux grands nombres', 'etapes': [
                    'Compte les chiffres de chaque nombre.', 'S’ils en ont autant, compare le premier chiffre à gauche.', 'S’il est égal, passe au chiffre suivant.']},
                {'type': 'piege', 'erreur': 'On croit que 987 654 > 1 002 000, car 9 > 1.', 'correction': '1 002 000 a sept chiffres, 987 654 en a six. Donc 987 654 < 1 002 000.'},
                bq('Quel signe entre 12 700 000 et 12 070 000 ?', ['>', '<', '='], 'Mêmes millions, puis 7 centaines de mille contre 0.'),
            ]),
            ('Encadrer et intercaler', [
                {'type': 'observe', 'consigne': 'Placer 6 750 400 entre deux autres nombres.', 'exemples': [
                    'Entre deux millions : 6 000 000 < 6 750 400 < 7 000 000.',
                    'Entre deux centaines de mille : 6 700 000 < 6 750 400 < 6 800 000.',
                    'Un nombre intercalé : 6 750 399 < 6 750 400 < 6 750 401.']},
            ]),
        ],
        a_toi=[
            q('Encadre 52 380 000 entre deux dizaines de millions.', ['50 000 000 et 60 000 000', '52 000 000 et 53 000 000', '5 000 000 et 6 000 000'], 'Le chiffre des dizaines de millions est 5.'),
            q('Quel nombre est entre 4 999 998 et 5 000 001 ?', ['4 999 999', '5 000 002', '4 999 997'], '4 999 998 < 4 999 999 < 5 000 001.'),
            q('Range du plus petit au plus grand.', ['890 000 < 8 900 000 < 9 800 000', '8 900 000 < 890 000 < 9 800 000', '9 800 000 < 8 900 000 < 890 000'], '890 000 n’a que six chiffres.'),
        ],
        sources=[ref('MA-C3-CM2-ENT-03', 'Comparer, encadrer, intercaler')]),

    'MA-C3-CM2-ENT-04': dict(duree=7, essentiel=
        'Un diviseur de 24 est un nombre qui divise 24 sans reste.\n'
        '24 = 4 × 6 : 4 et 6 sont des diviseurs de 24.\n'
        'Les diviseurs de 24 sont 1, 2, 3, 4, 6, 8, 12 et 24. 1 et le nombre lui-même sont toujours des diviseurs.',
        parties=[
            ('Chercher par paires', [
                {'type': 'methode', 'titre': 'Trouver tous les diviseurs de 36', 'etapes': [
                    'Cherche les produits égaux à 36 : 1 × 36, 2 × 18, 3 × 12, 4 × 9, 6 × 6.',
                    'Essaie 5 : 36 n’est pas dans la table de 5.', 'Arrête-toi quand les paires se répètent.',
                    'Les diviseurs : 1, 2, 3, 4, 6, 9, 12, 18, 36.']},
                bq('Lequel est un diviseur de 36 ?', ['9', '5', '8'], '36 = 9 × 4.'),
            ]),
            ('Diviseur ou multiple ?', [
                {'type': 'explique', 'texte': '30 = 6 × 5. On dit que 6 est un diviseur de 30, et que 30 est un multiple de 6.'},
                {'type': 'piege', 'erreur': 'On dit que 30 est un diviseur de 6.', 'correction': 'Le diviseur est le plus petit des deux : 6 divise 30.'},
            ]),
        ],
        a_toi=[
            q('Quels sont les diviseurs de 18 ?', ['1, 2, 3, 6, 9, 18', '1, 2, 3, 6, 9', '2, 3, 6, 9'], '1 × 18, 2 × 9, 3 × 6.'),
            q('Combien de diviseurs a 7 ?', ['2', '1', '7'], 'Seulement 1 et 7.'),
            q('Lequel n’est pas un diviseur de 100 ?', ['30', '25', '20'], '100 = 25 × 4 = 20 × 5, mais 100 n’est pas dans la table de 30.'),
        ],
        sources=[ref('MA-C3-CM2-ENT-04', 'Diviseurs d’un nombre entier')]),

    'MA-C3-CM2-FRAC-01': dict(duree=6, essentiel=
        'Une fraction plus grande que 1 s’écrit comme un entier plus une fraction plus petite que 1.\n'
        '7/3, c’est 3 tiers, 3 tiers, et encore 1 tiers : 7/3 = 2 + 1/3.\n'
        'On cherche combien de fois le dénominateur entre dans le numérateur : 7 = 3 × 2 + 1.',
        parties=[
            ('Voir les unités', [
                {'type': 'visuel', 'visuel': barres((3, 3), (3, 3), (3, 1)), 'legende': '7/3 : deux unités entières et encore 1/3.'},
                {'type': 'methode', 'titre': 'Décomposer 11/4', 'etapes': [
                    'Combien de fois 4 dans 11 ? 2 fois, car 4 × 2 = 8.', 'Il reste 11 − 8 = 3.', '11/4 = 2 + 3/4.']},
                bq('9/4 = ?', ['2 + 1/4', '4 + 1/9', '3 + 1/4'], '9 = 4 × 2 + 1.'),
            ]),
            ('Aller jusqu’au bout', [
                {'type': 'piege', 'erreur': 'On écrit 11/4 = 1 + 7/4.', 'correction': '7/4 est encore plus grand que 1. On continue : 11/4 = 2 + 3/4.'},
            ]),
        ],
        a_toi=[
            q('13/5 = ?', ['2 + 3/5', '3 + 2/5', '1 + 8/5'], '13 = 5 × 2 + 3.'),
            q('10/3 = ?', ['3 + 1/3', '3 + 10/3', '2 + 1/3'], '10 = 3 × 3 + 1.'),
            q('3 + 1/2 = ?', ['7/2', '4/2', '5/2'], '3 = 6/2, et 6/2 + 1/2 = 7/2.'),
        ],
        sources=[ref('MA-C3-CM2-FRAC-01', 'Fraction supérieure à 1')]),

    'MA-C3-CM2-FRAC-02': dict(duree=7, essentiel=
        'Même dénominateur : la plus grande fraction a le plus grand numérateur. 5/8 > 3/8.\n'
        'Même numérateur : la plus grande a le plus petit dénominateur. 2/3 > 2/5.\n'
        'Sinon, on écrit les fractions avec le même dénominateur : 2/3 = 4/6, donc 2/3 < 5/6.',
        parties=[
            ('Comparer à 1', [
                {'type': 'tableau', 'titre': 'Plus petite, égale ou plus grande que 1', 'colonnes': ['Fraction', 'Comparée à 1'], 'lignes': [
                    ['3/4', 'plus petite : numérateur < dénominateur'], ['5/5', 'égale : numérateur = dénominateur'], ['7/5', 'plus grande : numérateur > dénominateur']]},
                bq('Quel signe entre 7/5 et 1 ?', ['>', '<', '='], '7 > 5 : la fraction dépasse 1.'),
            ]),
            ('Des dénominateurs différents', [
                {'type': 'visuel', 'visuel': barres((3, 2), (6, 5)), 'legende': '2/3, c’est 4 sixièmes : moins que 5/6.'},
                {'type': 'piege', 'erreur': 'On croit que 2/9 > 2/7, car 9 > 7.', 'correction': 'Les neuvièmes sont plus petits que les septièmes : 2/9 < 2/7.'},
            ]),
        ],
        a_toi=[
            q('Quel signe entre 3/4 et 5/8 ?', ['>', '<', '='], '3/4 = 6/8, et 6/8 > 5/8.'),
            q('Quel signe entre 2/7 et 2/9 ?', ['>', '<', '='], 'Même numérateur : les septièmes sont plus grands.'),
            q('Laquelle est la plus grande ?', ['5/6', '2/3', '1/2'], '5/6, 4/6 et 3/6.'),
        ],
        sources=[ref('MA-C3-CM2-FRAC-02', 'Comparer des fractions')]),

    'MA-C3-CM2-FRAC-03': dict(duree=6, essentiel=
        'Pour additionner deux fractions de même dénominateur, on additionne les numérateurs : 3/8 + 4/8 = 7/8.\n'
        'On garde le dénominateur : on compte des huitièmes.\n'
        'On soustrait de la même façon : 9/10 − 4/10 = 5/10.',
        parties=[
            ('Même dénominateur', [
                {'type': 'visuel', 'visuel': barres((8, 3), (8, 4), (8, 7)), 'legende': '3 huitièmes plus 4 huitièmes font 7 huitièmes.'},
                {'type': 'piege', 'erreur': 'On écrit 2/5 + 1/5 = 3/10.', 'correction': 'On ajoute des cinquièmes : 2/5 + 1/5 = 3/5.'},
                bq('5/6 − 2/6 = ?', ['3/6', '3/0', '7/6'], '5 sixièmes moins 2 sixièmes.'),
            ]),
            ('Avec des demis et des quarts', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 1/2 + 1/4.', 'etapes': [
                    '1/2 = 2/4.', '2/4 + 1/4 = 3/4.'],
                 'conclusion': '1/2 + 1/4 = 3/4.'},
            ]),
        ],
        a_toi=[
            q('3/8 + 4/8 = ?', ['7/8', '7/16', '12/8'], 'On ajoute les numérateurs.'),
            q('9/10 − 4/10 = ?', ['5/10', '5/0', '13/10'], 'On garde les dixièmes.'),
            q('1/2 + 1/4 = ?', ['3/4', '2/6', '1/6'], '1/2 = 2/4.'),
        ],
        sources=[ref('MA-C3-CM2-FRAC-03', 'Additionner et soustraire des fractions')]),

    'MA-C3-CM2-FRAC-04': dict(duree=5, essentiel=
        'Multiplier une fraction par un entier, c’est l’ajouter plusieurs fois.\n'
        '4 × 2/3 = 2/3 + 2/3 + 2/3 + 2/3 = 8/3.\n'
        'On multiplie le numérateur par l’entier, et on garde le dénominateur.',
        parties=[
            ('Une addition répétée', [
                {'type': 'visuel', 'visuel': barres((3, 2), (3, 2), (3, 2), (3, 2)), 'legende': '4 fois 2 tiers : 8 tiers en tout, soit 8/3 = 2 + 2/3.'},
                bq('3 × 2/5 = ?', ['6/5', '6/15', '5/5'], '3 fois 2 cinquièmes : 6 cinquièmes.'),
            ]),
            ('Le dénominateur ne change pas', [
                {'type': 'piege', 'erreur': 'On multiplie aussi le dénominateur : 3 × 2/5 = 6/15.', 'correction': 'On compte toujours des cinquièmes : 3 × 2/5 = 6/5.'},
            ]),
        ],
        a_toi=[
            q('5 × 1/4 = ?', ['5/4', '5/20', '1/20'], '5 quarts.'),
            q('6 × 1/3 = ?', ['2', '6/18', '1/18'], '6/3 = 2.'),
            q('2 × 3/10 = ?', ['6/10', '6/20', '5/10'], '2 fois 3 dixièmes.'),
        ],
        sources=[ref('MA-C3-CM2-FRAC-04', 'Produit d’un entier et d’une fraction')]),

    'MA-C3-CM2-FRAC-05': dict(duree=6, essentiel=
        'Pour prendre 2/3 de 12 €, on partage 12 € en 3 parts égales, puis on prend 2 parts.\n'
        '12 ÷ 3 = 4, et 4 × 2 = 8 : 2/3 de 12 €, c’est 8 €.\n'
        '3/4 de 100 m : 100 ÷ 4 = 25, et 25 × 3 = 75 m.',
        parties=[
            ('Partager puis prendre', [
                {'type': 'visuel', 'visuel': {'type': 'grille', 'lignes': 3, 'colonnes': 4, 'coloriees': 8}, 'legende': '12 jetons en 3 rangées : 2 rangées sur 3, c’est 8 jetons.'},
                bq('3/5 de 20 = ?', ['12', '4', '15'], '20 ÷ 5 = 4, et 4 × 3 = 12.'),
            ]),
            ('Avec des grandeurs', [
                {'type': 'observe', 'consigne': 'Des fractions de grandeurs.', 'exemples': [
                    '1/4 d’heure = 60 min ÷ 4 = 15 min.', '3/4 d’heure = 15 min × 3 = 45 min.', '1/2 kg = 1 000 g ÷ 2 = 500 g.']},
                {'type': 'piege', 'erreur': 'On divise par le numérateur : 2/3 de 12 = 12 ÷ 2.', 'correction': 'On divise par le dénominateur, puis on multiplie par le numérateur.'},
            ]),
        ],
        a_toi=[
            q('2/3 de 30 élèves = ?', ['20', '10', '15'], '30 ÷ 3 = 10, et 10 × 2 = 20.'),
            q('3/4 d’une heure = ?', ['45 min', '30 min', '34 min'], '60 ÷ 4 = 15, et 15 × 3 = 45.'),
            q('1/5 de 100 € = ?', ['20 €', '5 €', '50 €'], '100 ÷ 5 = 20.'),
        ],
        sources=[ref('MA-C3-CM2-FRAC-05', 'Fraction d’une quantité ou d’une grandeur')]),

    'MA-C3-CM2-DEC-01': dict(duree=6, essentiel=
        'Une fraction décimale a pour dénominateur 10, 100 ou 1 000.\n'
        '347/100 = 3,47 : 3 unités, 4 dixièmes, 7 centièmes.\n'
        '3 + 4/10 + 7/100 s’écrit aussi 3,47.',
        parties=[
            ('Fraction et virgule', [
                {'type': 'tableau', 'titre': 'Deux écritures du même nombre', 'colonnes': ['Avec des fractions', 'Avec une virgule'], 'lignes': [
                    ['25/10', '2,5'], ['347/100', '3,47'], ['3 + 4/10 + 7/100', '3,47'], ['5 + 8/1 000', '5,008']]},
                bq('4 + 6/100 = ?', ['4,06', '4,6', '4,006'], '6 centièmes : le 6 est au 2e rang après la virgule.'),
            ]),
            ('Le bon rang', [
                {'type': 'piege', 'erreur': 'On écrit 5 + 8/1 000 = 5,8.', 'correction': '8 millièmes : le 8 va au 3e rang. 5,008.'},
            ]),
        ],
        a_toi=[
            q('25/10 = ?', ['2,5', '25,10', '0,25'], '25 dixièmes = 2 unités et 5 dixièmes.'),
            q('1 234/1 000 = ?', ['1,234', '12,34', '123,4'], '1 234 millièmes.'),
            q('7 + 3/10 + 5/100 = ?', ['7,35', '7,53', '7,035'], '3 dixièmes, 5 centièmes.'),
        ],
        sources=[ref('MA-C3-CM2-DEC-01', 'Des fractions décimales à l’écriture à virgule')]),

    'MA-C3-CM2-DEC-02': dict(duree=7, essentiel=
        'On compare d’abord les parties entières.\n'
        'Si elles sont égales, on compare les dixièmes, puis les centièmes, puis les millièmes.\n'
        '3,8 > 3,75 : même partie entière, puis 8 dixièmes contre 7.',
        parties=[
            ('Comparer', [
                {'type': 'methode', 'titre': 'Pour comparer 3,8 et 3,75', 'etapes': [
                    'Parties entières : 3 et 3, égales.', 'Dixièmes : 8 et 7. 8 > 7.', 'Donc 3,8 > 3,75.']},
                {'type': 'piege', 'erreur': 'On croit que 3,75 > 3,8, car 75 > 8.', 'correction': 'On compare rang par rang : 3,8 = 3,80, et 80 centièmes > 75 centièmes.'},
                bq('Quel signe entre 2,09 et 2,1 ?', ['<', '>', '='], '0 dixième contre 1 dixième.'),
            ]),
            ('Encadrer, intercaler, ranger', [
                {'type': 'observe', 'consigne': 'Autour de 7,46.', 'exemples': [
                    'Entre deux entiers : 7 < 7,46 < 8.', 'Entre deux dixièmes : 7,4 < 7,46 < 7,5.', 'Entre 7,4 et 7,5, il y a aussi 7,41, 7,45, 7,499…']},
            ]),
        ],
        a_toi=[
            q('Range dans l’ordre croissant.', ['2,09 < 2,1 < 2,25', '2,1 < 2,09 < 2,25', '2,25 < 2,1 < 2,09'], '2,09 = 2,090 ; 2,1 = 2,100 ; 2,25 = 2,250.'),
            q('Encadre 7,46 entre deux dixièmes.', ['7,4 et 7,5', '7 et 8', '7,45 et 7,47'], 'Le chiffre des dixièmes est 4.'),
            q('Quel nombre est entre 4,5 et 4,6 ?', ['4,55', '4,65', '4,05'], '4,50 < 4,55 < 4,60.'),
        ],
        sources=[ref('MA-C3-CM2-DEC-02', 'Comparer et ranger des décimaux')]),

    'MA-C3-CM2-DEC-03': dict(duree=5, essentiel=
        'La partie entière de 7,6 est 7 : c’est ce qui est avant la virgule.\n'
        'L’arrondi à l’entier de 7,6 est 8 : c’est l’entier le plus proche.\n'
        'Si le chiffre des dixièmes est 5 ou plus, on arrondit à l’entier au-dessus.',
        parties=[
            ('Partie entière et arrondi', [
                vocabulaire(3, 'Arrondi'),
                {'type': 'tableau', 'titre': 'Quelques nombres', 'colonnes': ['Nombre', 'Partie entière', 'Arrondi à l’entier'], 'lignes': [
                    ['7,6', '7', '8'], ['7,2', '7', '7'], ['7,5', '7', '8'], ['12,09', '12', '12']]},
                bq('L’arrondi à l’entier de 4,49 est :', ['4', '5', '4,5'], '4 dixièmes : on reste à 4.'),
            ]),
            ('Ne pas confondre', [
                {'type': 'piege', 'erreur': 'On croit que l’arrondi de 7,6 est 7.', 'correction': '7 est la partie entière. 7,6 est plus près de 8 : l’arrondi est 8.'},
            ]),
        ],
        a_toi=[
            q('La partie entière de 12,9 est :', ['12', '13', '9'], 'Ce qui est avant la virgule.'),
            q('L’arrondi à l’entier de 12,9 est :', ['13', '12', '12,9'], '12,9 est tout près de 13.'),
            q('L’arrondi à l’entier de 3,5 est :', ['4', '3', '3,5'], 'Dixièmes à 5 : on arrondit au-dessus.'),
        ],
        sources=[ref('MA-C3-CM2-DEC-03', 'Partie entière et arrondi')]),

    'MA-C3-CM2-CALC-01': dict(duree=5, essentiel=
        'Multiplier par 10, c’est rendre chaque chiffre 10 fois plus grand : il avance d’un rang vers la gauche.\n'
        '3,47 × 10 = 34,7. 3,47 × 100 = 347. 3,47 × 1 000 = 3 470.\n'
        'Si un rang est vide, on écrit un 0.',
        parties=[
            ('Les chiffres changent de rang', [
                {'type': 'tableau', 'titre': '3,47 multiplié', 'colonnes': ['Calcul', 'Résultat'], 'lignes': [
                    ['3,47 × 10', '34,7'], ['3,47 × 100', '347'], ['3,47 × 1 000', '3 470']]},
                bq('0,6 × 100 = ?', ['60', '0,600', '6'], 'Les 6 dixièmes deviennent 6 dizaines.'),
            ]),
            ('Attention au zéro', [
                {'type': 'piege', 'erreur': 'On ajoute un 0 à droite : 3,47 × 10 = 3,470.', 'correction': '3,470 = 3,47. Chaque chiffre doit avancer d’un rang : 34,7.'},
            ]),
        ],
        a_toi=[
            q('2,05 × 10 = ?', ['20,5', '2,050', '205'], 'Chaque chiffre avance d’un rang.'),
            q('4,3 × 1 000 = ?', ['4 300', '4,3000', '430'], 'Trois rangs vers la gauche.'),
            q('0,25 × 100 = ?', ['25', '2,5', '250'], 'Deux rangs vers la gauche.'),
        ],
        sources=[ref('MA-C3-CM2-CALC-01', 'Multiplier un décimal par 10, 100, 1 000')]),

    'MA-C3-CM2-CALC-02': dict(duree=5, essentiel=
        'Ajouter 9, c’est ajouter 10, puis enlever 1. Ajouter 19, c’est ajouter 20, puis enlever 1.\n'
        'Ajouter 8 ou 28 : on ajoute 10 ou 30, puis on enlève 2.\n'
        'Pour soustraire, on fait l’inverse : − 19, c’est − 20, puis + 1.',
        parties=[
            ('Arrondir puis corriger', [
                {'type': 'visuel', 'visuel': {'type': 'droite', 'min': 45, 'max': 70, 'depart': 47, 'saut': 19}, 'legende': 'De 47, on avance de 19 : on arrive à 66.'},
                {'type': 'exemple-resolu', 'enonce': 'Calcule 47 + 19.', 'etapes': ['47 + 20 = 67.', '67 − 1 = 66.'], 'conclusion': '47 + 19 = 66.'},
                bq('83 − 28 = ?', ['55', '51', '65'], '83 − 30 = 53, puis 53 + 2 = 55.'),
            ]),
            ('Dans quel sens corriger ?', [
                {'type': 'piege', 'erreur': 'Pour 74 − 19, on fait 74 − 20 − 1.', 'correction': 'On a enlevé 1 de trop : on le rajoute. 74 − 20 + 1 = 55.'},
            ]),
        ],
        a_toi=[
            q('56 + 29 = ?', ['85', '75', '86'], '56 + 30 = 86, puis 86 − 1 = 85.'),
            q('74 − 19 = ?', ['55', '53', '45'], '74 − 20 = 54, puis 54 + 1 = 55.'),
            q('125 − 8 = ?', ['117', '113', '127'], '125 − 10 = 115, puis 115 + 2 = 117.'),
        ],
        sources=[ref('MA-C3-CM2-CALC-02', 'Ajouter ou soustraire 8, 9, 18, 19, 28, 29')]),

    'MA-C3-CM2-CALC-03': dict(duree=5, essentiel=
        'Le double d’un nombre, c’est ce nombre ajouté à lui-même, ou multiplié par 2.\n'
        'Pour un décimal, on double la partie entière et la partie décimale : double de 3,6 = 6 + 1,2 = 7,2.\n'
        'Double de 2,5 = 5. Double de 0,75 = 1,5.',
        parties=[
            ('Doubler en deux morceaux', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule le double de 3,6.', 'etapes': [
                    'Double de 3 : 6.', 'Double de 0,6 : 1,2.', '6 + 1,2 = 7,2.'],
                 'conclusion': 'Le double de 3,6 est 7,2.'},
                bq('Le double de 1,4 est :', ['2,8', '2,4', '1,8'], 'Double de 1 : 2. Double de 0,4 : 0,8.'),
            ]),
            ('Les dixièmes qui débordent', [
                {'type': 'piege', 'erreur': 'On écrit : double de 3,6 = 6,12.', 'correction': '12 dixièmes, c’est 1 unité et 2 dixièmes. Le double est 7,2.'},
            ]),
        ],
        a_toi=[
            q('Le double de 4,5 est :', ['9', '8,10', '8,5'], '4,5 + 4,5 = 9.'),
            q('Le double de 1,7 est :', ['3,4', '2,14', '3,7'], '2 + 1,4 = 3,4.'),
            q('Le double de 0,25 est :', ['0,5', '0,050', '0,45'], '25 centièmes × 2 = 50 centièmes.'),
        ],
        sources=[ref('MA-C3-CM2-CALC-03', 'Double d’un nombre décimal')]),

    'MA-C3-CM2-OPE-01': dict(duree=6, essentiel=
        'Dans un calcul avec des parenthèses, on calcule d’abord ce qui est entre parenthèses.\n'
        '3 × (4 + 5) = 3 × 9 = 27.\n'
        'Avec deux paires : (20 − 8) − (3 + 2) = 12 − 5 = 7.',
        parties=[
            ('D’abord les parenthèses', [
                {'type': 'methode', 'titre': 'Pour calculer (12 − 2) × (3 + 1)', 'etapes': [
                    'Calcule la première parenthèse : 12 − 2 = 10.', 'Calcule la seconde : 3 + 1 = 4.', 'Termine : 10 × 4 = 40.']},
                bq('(6 + 4) × 5 = ?', ['50', '26', '30'], '6 + 4 = 10, puis 10 × 5 = 50.'),
            ]),
            ('Les parenthèses changent le résultat', [
                {'type': 'observe', 'consigne': 'Les mêmes nombres, des parenthèses à des places différentes.', 'exemples': [
                    '(10 − 4) − 2 = 6 − 2 = 4', '10 − (4 − 2) = 10 − 2 = 8']},
                {'type': 'piege', 'erreur': 'On calcule 3 × (4 + 5) comme 3 × 4, puis + 5.', 'correction': 'La parenthèse se calcule d’abord : 3 × 9 = 27.'},
            ]),
        ],
        a_toi=[
            q('30 − (10 + 5) = ?', ['15', '25', '35'], '10 + 5 = 15, puis 30 − 15 = 15.'),
            q('(12 − 2) × (3 + 1) = ?', ['40', '37', '14'], '10 × 4 = 40.'),
            q('(8 + 2) × (7 − 7) = ?', ['0', '10', '80'], '10 × 0 = 0.'),
        ],
        sources=[ref('MA-C3-CM2-OPE-01', 'Calculs avec parenthèses')]),

    'MA-C3-CM2-OPE-02': dict(duree=7, essentiel=
        'Pour calculer 4,35 × 6, on pose 435 × 6 sans s’occuper de la virgule : 2 610.\n'
        '4,35 a deux chiffres après la virgule : le résultat aussi. 4,35 × 6 = 26,10 = 26,1.\n'
        'Un ordre de grandeur permet de vérifier : 4 × 6 = 24.',
        parties=[
            ('Poser l’opération', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 4,35 × 6.', 'etapes': [
                    '6 × 5 = 30 : j’écris 0, je retiens 3.', '6 × 3 = 18, plus 3 = 21 : j’écris 1, je retiens 2.',
                    '6 × 4 = 24, plus 2 = 26 : j’écris 26. J’obtiens 2 610.', 'Deux chiffres après la virgule : 26,10.'],
                 'conclusion': '4,35 × 6 = 26,1.'},
                bq('1,25 × 3 = ?', ['3,75', '37,5', '0,375'], '125 × 3 = 375, deux chiffres après la virgule.'),
            ]),
            ('Vérifier', [
                {'type': 'piege', 'erreur': 'On place la virgule au hasard : 4,35 × 6 = 261.', 'correction': 'Ordre de grandeur : 4 × 6 = 24. Le résultat est proche de 24, donc 26,1.'},
            ]),
        ],
        a_toi=[
            q('2,5 × 4 = ?', ['10', '8,20', '1'], '25 × 4 = 100, un chiffre après la virgule : 10,0.'),
            q('12,4 × 5 = ?', ['62', '6,2', '620'], '124 × 5 = 620, un chiffre après la virgule : 62,0.'),
            q('Un ordre de grandeur de 9,8 × 7 :', ['70', '7', '700'], '9,8 est proche de 10.'),
        ],
        sources=[ref('MA-C3-CM2-OPE-02', 'Multiplication posée d’un décimal par un entier')]),

    'MA-C3-CM2-OPE-03': dict(duree=8, essentiel=
        'On peut continuer une division après les unités : on écrit la virgule au quotient.\n'
        'Le reste est alors changé en dixièmes, puis en centièmes.\n'
        '17 ÷ 4 = 4,25, car 4 × 4,25 = 17.',
        parties=[
            ('Continuer après la virgule', [
                vocabulaire(3, 'Dividende', 'Diviseur'),
                {'type': 'exemple-resolu', 'enonce': 'Calcule 17 ÷ 4.', 'etapes': [
                    '17 ÷ 4 = 4, reste 1. J’écris 4 et la virgule.', '1 unité = 10 dixièmes. 10 ÷ 4 = 2, reste 2.',
                    '2 dixièmes = 20 centièmes. 20 ÷ 4 = 5, reste 0.'],
                 'conclusion': '17 ÷ 4 = 4,25.'},
                bq('9 ÷ 2 = ?', ['4,5', '4,1', '4'], '9 ÷ 2 = 4 reste 1, et 10 dixièmes ÷ 2 = 5 dixièmes.'),
            ]),
            ('Quand ça ne s’arrête pas', [
                {'type': 'explique', 'texte': '10 ÷ 3 = 3,333… Le reste vaut toujours 1 : on s’arrête à la précision demandée.'},
                {'type': 'piege', 'erreur': 'On s’arrête au reste : 17 ÷ 4 = 4 reste 1.', 'correction': 'C’est juste en division euclidienne. Si on demande un quotient décimal, on continue : 4,25.'},
            ]),
        ],
        a_toi=[
            q('21 ÷ 4 = ?', ['5,25', '5,1', '5,4'], '5 reste 1 ; 10 ÷ 4 = 2 reste 2 ; 20 ÷ 4 = 5.'),
            q('3 ÷ 5 = ?', ['0,6', '0,5', '1,6'], '3 unités = 30 dixièmes, 30 ÷ 5 = 6.'),
            q('Pour vérifier 17 ÷ 4 = 4,25, on calcule :', ['4 × 4,25', '17 × 4', '4,25 ÷ 17'], '4 × 4,25 doit redonner 17.'),
        ],
        sources=[ref('MA-C3-CM2-OPE-03', 'Division décimale')]),

    'MA-C3-CM2-PB-01': dict(duree=7, essentiel=
        'Un problème en plusieurs étapes demande plusieurs calculs.\n'
        'On cherche d’abord ce qu’il faut connaitre pour répondre : c’est une question intermédiaire.\n'
        'On peut mélanger addition, soustraction, multiplication et division.',
        parties=[
            ('Un exemple', [
                {'type': 'exemple-resolu', 'enonce': 'Lina achète 3 cahiers à 2,40 € et un stylo à 1,50 €. Elle paie avec 10 €. Combien lui rend-on ?', 'etapes': [
                    'Prix des cahiers : 3 × 2,40 = 7,20 €.', 'Prix total : 7,20 + 1,50 = 8,70 €.', 'Monnaie : 10 − 8,70 = 1,30 €.'],
                 'conclusion': 'On lui rend 1,30 €.'},
                bq('3 cars de 52 places emmènent 140 élèves. Combien de places restent libres ?', ['16', '36', '88'], '3 × 52 = 156, puis 156 − 140 = 16.'),
            ]),
            ('La méthode', [
                {'type': 'methode', 'titre': 'Pour résoudre', 'etapes': [
                    'Lis tout l’énoncé et repère la question.', 'Demande-toi : que dois-je savoir avant ?', 'Calcule étape par étape, en écrivant ce que tu trouves.', 'Vérifie que ta réponse a du sens.']},
                {'type': 'piege', 'erreur': 'On utilise tous les nombres de l’énoncé, dans l’ordre où ils viennent.', 'correction': 'On choisit les calculs selon la question, pas selon l’ordre des nombres.'},
            ]),
        ],
        a_toi=[
            q('4 packs de 6 bouteilles. On en boit 9. Combien en reste-t-il ?', ['15', '1', '19'], '4 × 6 = 24, puis 24 − 9 = 15.'),
            q('3 livres à 12 €, avec une réduction de 5 € sur le total. On paie :', ['31 €', '41 €', '21 €'], '3 × 12 = 36, puis 36 − 5 = 31.'),
            q('96 billes partagées entre 4 enfants. Chacun en donne 5. Il en garde :', ['19', '24', '91'], '96 ÷ 4 = 24, puis 24 − 5 = 19.'),
        ],
        sources=[ref('MA-C3-CM2-PB-01', 'Problèmes en plusieurs étapes')]),

    'MA-C3-CM2-PB-02': dict(duree=6, essentiel=
        '« 3 fois plus » : on multiplie. Tom a 12 billes, Léa en a 3 fois plus : 12 × 3 = 36.\n'
        '« 4 fois moins » : on divise. 36 ÷ 4 = 9.\n'
        '« Combien de fois plus ? » : on divise le grand nombre par le petit. 45 ÷ 9 = 5 fois.',
        parties=[
            ('Fois plus, fois moins', [
                {'type': 'tableau', 'titre': 'Trois questions', 'colonnes': ['On lit', 'On calcule'], 'lignes': [
                    ['3 fois plus que 12', '12 × 3 = 36'], ['4 fois moins que 36', '36 ÷ 4 = 9'], ['45, combien de fois 9 ?', '45 ÷ 9 = 5']]},
                bq('Un vélo coute 120 €, une trottinette 3 fois moins. La trottinette coute :', ['40 €', '360 €', '117 €'], '120 ÷ 3 = 40.'),
            ]),
            ('Fois plus ou de plus ?', [
                {'type': 'piege', 'erreur': 'On confond « 3 fois plus » et « 3 de plus ».', 'correction': '3 fois plus que 12 : 36. 3 de plus que 12 : 15.'},
            ]),
        ],
        a_toi=[
            q('Ana a 8 €, son frère 4 fois plus. Il a :', ['32 €', '12 €', '2 €'], '8 × 4 = 32.'),
            q('Un trajet de 60 km, un autre 3 fois moins long. Il mesure :', ['20 km', '57 km', '180 km'], '60 ÷ 3 = 20.'),
            q('42 est combien de fois plus grand que 7 ?', ['6 fois', '35 fois', '49 fois'], '42 ÷ 7 = 6.'),
        ],
        sources=[ref('MA-C3-CM2-PB-02', 'Comparaison multiplicative')]),

    'MA-C3-CM2-ALG-01': dict(duree=5, essentiel=
        'Pour trouver le nombre manquant, on utilise l’opération inverse.\n'
        '25 + … = 63 : on calcule 63 − 25 = 38.\n'
        '… × 7 = 56 : on calcule 56 ÷ 7 = 8.',
        parties=[
            ('L’opération inverse', [
                {'type': 'tableau', 'titre': 'Des égalités à trous', 'colonnes': ['Égalité', 'Calcul', 'Nombre manquant'], 'lignes': [
                    ['25 + … = 63', '63 − 25', '38'], ['100 − … = 37', '100 − 37', '63'], ['… × 7 = 56', '56 ÷ 7', '8'], ['… − 15 = 40', '40 + 15', '55']]},
                bq('9 × … = 72', ['8', '63', '81'], '72 ÷ 9 = 8.'),
            ]),
            ('Toujours vérifier', [
                {'type': 'piege', 'erreur': 'Pour 100 − … = 37, on calcule 100 + 37.', 'correction': 'On cherche ce qu’on enlève à 100 : 100 − 37 = 63. Vérifie : 100 − 63 = 37.'},
            ]),
        ],
        a_toi=[
            q('… − 15 = 40', ['55', '25', '45'], '40 + 15 = 55.'),
            q('4,5 + … = 10', ['5,5', '6,5', '14,5'], '10 − 4,5 = 5,5.'),
            q('… ÷ 6 = 7', ['42', '13', '1'], '7 × 6 = 42.'),
        ],
        sources=[ref('MA-C3-CM2-ALG-01', 'Égalités à trous')]),

    'MA-C3-CM2-ALG-02': dict(duree=6, essentiel=
        'Un programme de calcul est une suite d’étapes à appliquer à un nombre de départ.\n'
        '« Choisis un nombre, multiplie-le par 3, ajoute 5. » Avec 4 : 4 × 3 = 12, puis 12 + 5 = 17.\n'
        'Pour retrouver le départ, on remonte les étapes avec les opérations inverses.',
        parties=[
            ('Exécuter', [
                {'type': 'tableau', 'titre': 'Multiplie par 3, puis ajoute 5', 'colonnes': ['Départ', '× 3', '+ 5'], 'lignes': [
                    ['4', '12', '17'], ['10', '30', '35'], ['0', '0', '5']]},
                bq('« Ajoute 4, puis multiplie par 2. » Avec 6, on obtient :', ['20', '16', '14'], '6 + 4 = 10, puis 10 × 2 = 20.'),
            ]),
            ('Remonter le programme', [
                {'type': 'exemple-resolu', 'enonce': 'Avec « × 3, puis + 5 », on obtient 20. Quel était le nombre de départ ?', 'etapes': [
                    'J’enlève 5 : 20 − 5 = 15.', 'Je divise par 3 : 15 ÷ 3 = 5.'],
                 'conclusion': 'Le nombre de départ est 5.'},
                {'type': 'piege', 'erreur': 'On remonte dans le même ordre : 20 ÷ 3, puis − 5.', 'correction': 'On défait la dernière étape en premier : − 5, puis ÷ 3.'},
            ]),
        ],
        a_toi=[
            q('« × 3, puis + 5 ». Avec 7, on obtient :', ['26', '36', '15'], '7 × 3 = 21, puis 21 + 5 = 26.'),
            q('« × 3, puis + 5 ». On obtient 23. Le départ était :', ['6', '9', '84'], '23 − 5 = 18, puis 18 ÷ 3 = 6.'),
            q('« Enlève 2, puis divise par 4. » Avec 30, on obtient :', ['7', '28', '5,5'], '30 − 2 = 28, puis 28 ÷ 4 = 7.'),
        ],
        sources=[ref('MA-C3-CM2-ALG-02', 'Programmes de calcul')]),

    'MA-C3-CM2-PROP-01': dict(duree=7, essentiel=
        'Deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n'
        'Si 3 croissants coutent 2,70 €, 6 croissants coutent le double : 5,40 €.\n'
        '9 croissants, c’est 3 + 6 : 2,70 + 5,40 = 8,10 €.',
        parties=[
            ('Multiplier ou ajouter', [
                {'type': 'tableau', 'titre': 'Prix des croissants', 'colonnes': ['Croissants', '3', '6', '9', '12'], 'lignes': [
                    ['Prix (€)', '2,70', '5,40', '8,10', '10,80']]},
                {'type': 'explique', 'texte': '6 = 3 × 2, donc le prix est multiplié par 2. 9 = 3 + 6, donc on ajoute les prix.'},
                bq('4 cahiers coutent 6 €. 8 cahiers coutent :', ['12 €', '10 €', '24 €'], '8 = 4 × 2 : le prix double.'),
            ]),
            ('Proportionnel ou pas ?', [
                {'type': 'piege', 'erreur': 'On croit que la taille d’un enfant est proportionnelle à son âge.', 'correction': 'À 4 ans, on ne mesure pas le double de sa taille à 2 ans. Ce n’est pas proportionnel.'},
            ]),
        ],
        a_toi=[
            q('2 kg de pommes coutent 5 €. 6 kg coutent :', ['15 €', '9 €', '30 €'], '6 = 2 × 3, donc 5 × 3 = 15.'),
            q('250 g de farine pour 4 personnes. Pour 12 personnes :', ['750 g', '258 g', '1 000 g'], '12 = 4 × 3.'),
            q('5 places de cinéma coutent 40 €, 2 places coutent 16 €. 7 places coutent :', ['56 €', '47 €', '280 €'], '7 = 5 + 2, donc 40 + 16 = 56.'),
        ],
        sources=[ref('MA-C3-CM2-PROP-01', 'Proportionnalité par linéarité')]),
}

ecrire(COURS)
