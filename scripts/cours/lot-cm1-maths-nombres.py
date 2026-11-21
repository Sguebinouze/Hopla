"""Lot de cours : maths CM1, nombres, calcul et problèmes. Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-cm1-maths-nombres.py
    python3 scripts/cours/pages.py content/cours/MA-C3-CM1-*.json

Cycle 3 : phrases de 20 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
Orthographe des nombres : rectifications de 1990 (traits d'union partout).
"""
from commun import barres, bq, ecrire, q, source_referentiel as ref, vocabulaire

COURS = {
    'MA-C3-CM1-NUM-01': dict(duree=7, essentiel=
        'Un grand nombre se lit par classes de trois chiffres : les mille, puis les unités.\n'
        'Dans 482 615, le chiffre 8 vaut 8 dizaines de mille, soit 80 000.\n'
        '1 centaine de mille = 10 dizaines de mille = 100 000 unités.',
        parties=[
            ('Le tableau de numération', [
                {'type': 'tableau', 'titre': 'Le nombre 482 615, classe par classe', 'colonnes': ['Classe', 'centaines', 'dizaines', 'unités'], 'lignes': [
                    ['des mille', '4', '8', '2'], ['des unités', '6', '1', '5']]},
                {'type': 'explique', 'texte': '482 615 = 400 000 + 80 000 + 2 000 + 600 + 10 + 5.'},
                bq('Dans 735 209, que vaut le chiffre 3 ?', ['30 000', '3 000', '300'], 'Le 3 est au rang des dizaines de mille.'),
            ]),
            ('Chiffre de ou nombre de ?', [
                {'type': 'explique', 'texte': 'Dans 482 615, le chiffre des centaines est 6. Le nombre de centaines est 4 826 : on lit tout ce qui est à gauche, centaines comprises.'},
                {'type': 'piege', 'erreur': 'On confond le chiffre des centaines et le nombre de centaines.', 'correction': 'Le chiffre est un seul chiffre. Le nombre compte toutes les centaines : 4 826.'},
            ]),
        ],
        a_toi=[
            q('Combien de dizaines de mille dans 100 000 ?', ['10', '100', '1 000'], '10 × 10 000 = 100 000.'),
            q('Quel est le nombre de milliers dans 56 700 ?', ['56', '6', '567'], 'On lit tout ce qui est à gauche du rang des milliers, lui compris.'),
            q('300 000 + 4 000 + 50 + 2 = ?', ['304 052', '340 052', '300 452'], '3 centaines de mille, 4 unités de mille, 5 dizaines, 2 unités.'),
        ],
        sources=[ref('MA-C3-CM1-NUM-01', 'Valeur des chiffres selon leur position')]),

    'MA-C3-CM1-NUM-02': dict(duree=7, essentiel=
        'On relie tous les mots d’un nombre par des traits d’union.\n'
        'Mille ne prend jamais de s.\n'
        'Cent et vingt prennent un s s’ils sont multipliés et terminent le nombre : deux-cents, quatre-vingts.',
        parties=[
            ('Écrire en lettres', [
                {'type': 'exemple-resolu', 'enonce': 'Écris 245 380 en lettres.', 'etapes': [
                    'Je lis la classe des mille : 245, deux-cent-quarante-cinq-mille.',
                    'Je lis la classe des unités : 380, trois-cent-quatre-vingts.'],
                 'conclusion': 'deux-cent-quarante-cinq-mille-trois-cent-quatre-vingts'},
                bq('Comment écrit-on 80 ?', ['quatre-vingts', 'quatre-vingt', 'quatres-vingts'], 'Vingt est multiplié par 4 et termine le nombre : il prend un s.'),
            ]),
            ('Le s de cent et de vingt', [
                {'type': 'tableau', 'titre': 'Avec ou sans s', 'colonnes': ['Avec s', 'Sans s'], 'lignes': [
                    ['deux-cents (200)', 'deux-cent-un (201)'], ['quatre-vingts (80)', 'quatre-vingt-trois (83)'], ['six-cents (600)', 'six-cent-mille (600 000)']]},
                {'type': 'piege', 'erreur': 'On écrit trois-cents-mille.', 'correction': 'Devant mille, cent reste sans s : trois-cent-mille.'},
            ]),
        ],
        a_toi=[
            q('1 000 s’écrit :', ['mille', 'milles', 'un-mille'], 'Mille est invariable.'),
            q('700 s’écrit :', ['sept-cents', 'sept-cent', 'septs-cents'], 'Cent est multiplié et termine le nombre.'),
            q('Quel nombre s’écrit soixante-douze-mille-quatre ?', ['72 004', '72 400', '720 004'], '72 mille et 4 unités.'),
        ],
        sources=[ref('MA-C3-CM1-NUM-02', 'Écrire les nombres en lettres')]),

    'MA-C3-CM1-NUM-03': dict(duree=6, essentiel=
        'Le nombre qui a le plus de chiffres est le plus grand.\n'
        'S’ils ont autant de chiffres, on compare de gauche à droite.\n'
        '45 280 < 45 820 : mêmes milliers, puis 2 centaines contre 8.',
        parties=[
            ('Comparer', [
                {'type': 'methode', 'titre': 'Pour comparer deux grands nombres', 'etapes': [
                    'Compte les chiffres de chaque nombre.', 'S’ils en ont autant, compare le premier chiffre à gauche.', 'S’il est égal, passe au chiffre suivant.']},
                {'type': 'piege', 'erreur': 'On croit que 98 765 > 102 000, car 9 > 1.', 'correction': '102 000 a six chiffres, 98 765 en a cinq. Donc 98 765 < 102 000.'},
                bq('Quel signe entre 504 300 et 540 300 ?', ['<', '>', '='], 'Mêmes centaines de mille, puis 0 dizaine de mille contre 4.'),
            ]),
            ('Encadrer et intercaler', [
                {'type': 'observe', 'consigne': 'Placer un nombre entre deux autres.', 'exemples': [
                    'Entre deux milliers : 47 000 < 47 650 < 48 000.',
                    'Entre deux dizaines de mille : 40 000 < 47 650 < 50 000.',
                    'Un nombre entre 39 998 et 40 001 : 39 999 ou 40 000.']},
            ]),
        ],
        a_toi=[
            q('Range du plus petit au plus grand.', ['7 210 < 70 210 < 72 010', '70 210 < 7 210 < 72 010', '72 010 < 70 210 < 7 210'], '7 210 n’a que quatre chiffres.'),
            q('Encadre 365 820 entre deux centaines de mille.', ['300 000 et 400 000', '360 000 et 370 000', '365 000 et 366 000'], 'Le chiffre des centaines de mille est 3.'),
            q('Quel nombre est entre 99 990 et 100 000 ?', ['99 995', '100 005', '99 985'], '99 990 < 99 995 < 100 000.'),
        ],
        sources=[ref('MA-C3-CM1-NUM-03', 'Comparer, encadrer, intercaler')]),

    'MA-C3-CM1-NUM-04': dict(duree=6, essentiel=
        'Un multiple de 2 se termine par 0, 2, 4, 6 ou 8.\n'
        'Un multiple de 5 se termine par 0 ou 5. Un multiple de 10 se termine par 0.\n'
        '24 est un multiple de 6, car 6 × 4 = 24. On dit aussi que 6 est un diviseur de 24.',
        parties=[
            ('Reconnaitre les multiples', [
                {'type': 'tableau', 'titre': 'Multiple de…', 'colonnes': ['Nombre', 'de 2', 'de 5', 'de 10'], 'lignes': [
                    ['70', 'oui', 'oui', 'oui'], ['35', 'non', 'oui', 'non'], ['48', 'oui', 'non', 'non']]},
                bq('Lequel est un multiple de 5 ?', ['135', '152', '208'], 'Il se termine par 5.'),
            ]),
            ('Multiple et diviseur', [
                vocabulaire(3, 'Diviseur'),
                {'type': 'exemple-resolu', 'enonce': '7 est-il un diviseur de 42 ?', 'etapes': [
                    'Je cherche 7 × ? = 42.', '7 × 6 = 42.'],
                 'conclusion': 'Oui : 42 est un multiple de 7, et 7 est un diviseur de 42.'},
                {'type': 'piege', 'erreur': 'On croit que 10 est un multiple de 20.', 'correction': 'C’est l’inverse : 20 = 10 × 2, donc 20 est un multiple de 10.'},
            ]),
        ],
        a_toi=[
            q('Quel nombre est multiple de 2, de 5 et de 10 ?', ['380', '385', '382'], 'Il se termine par 0.'),
            q('9 est-il un diviseur de 54 ?', ['oui, car 9 × 6 = 54', 'non', 'seulement si 54 est impair'], '54 est dans la table de 9.'),
            q('Quel nombre n’est pas un multiple de 2 ?', ['77', '70', '76'], '77 se termine par 7.'),
        ],
        sources=[ref('MA-C3-CM1-NUM-04', 'Multiples et diviseurs')]),

    'MA-C3-CM1-FRAC-01': dict(duree=7, essentiel=
        'Une fraction est plus grande que 1 quand son numérateur dépasse son dénominateur.\n'
        '7/4 = 4/4 + 3/4 = 1 + 3/4.\n'
        '7/4 est donc entre 1 et 2.',
        parties=[
            ('Plus d’une unité', [
                vocabulaire(3, 'Numérateur', 'Dénominateur'),
                {'type': 'visuel', 'visuel': barres((4, 4), (4, 3)), 'legende': '7/4, c’est 4 quarts et encore 3 quarts : 1 + 3/4.'},
                bq('5/3 est :', ['plus grand que 1', 'plus petit que 1', 'égal à 1'], '5 dépasse 3.'),
            ]),
            ('Décomposer', [
                {'type': 'exemple-resolu', 'enonce': 'Écris 17/5 comme un entier plus une fraction plus petite que 1.', 'etapes': [
                    'Dans 17, il y a 3 fois 5, soit 15, et il reste 2.', '17/5 = 15/5 + 2/5 = 3 + 2/5.'],
                 'conclusion': '17/5 = 3 + 2/5. Elle est entre 3 et 4.'},
                {'type': 'explique', 'texte': 'Dans l’autre sens : 2 + 1/3 = 6/3 + 1/3 = 7/3.'},
                {'type': 'piege', 'erreur': 'On lit 7/4 comme 7 + 4.', 'correction': '7/4 veut dire 7 quarts : 1 + 3/4.'},
            ]),
        ],
        a_toi=[
            q('9/2 = ?', ['4 + 1/2', '9 + 2', '2 + 1/9'], '9 demis : 8 demis font 4, il reste 1/2.'),
            q('Entre quels entiers se trouve 11/3 ?', ['3 et 4', '11 et 12', '1 et 2'], '11/3 = 3 + 2/3.'),
            q('1 + 2/5 = ?', ['7/5', '3/5', '12/5'], '1 = 5/5, et 5/5 + 2/5 = 7/5.'),
        ],
        sources=[ref('MA-C3-CM1-FRAC-01', 'Fractions supérieures à 1')]),

    'MA-C3-CM1-FRAC-02': dict(duree=6, essentiel=
        'Même dénominateur : la plus grande fraction a le plus grand numérateur. 5/8 > 3/8.\n'
        'Même numérateur : la plus grande a le plus petit dénominateur. 2/3 > 2/5.\n'
        '7/6 > 1, car 7 > 6.',
        parties=[
            ('Même dénominateur', [
                {'type': 'visuel', 'visuel': barres((8, 5), (8, 3)), 'legende': '5 huitièmes contre 3 huitièmes : 5/8 > 3/8.'},
                bq('Quelle fraction est la plus grande ?', ['7/10', '3/10', '5/10'], 'Même dénominateur : 7 est le plus grand numérateur.'),
            ]),
            ('Même numérateur', [
                {'type': 'visuel', 'visuel': barres((3, 2), (5, 2)), 'legende': 'Les tiers sont plus grands que les cinquièmes : 2/3 > 2/5.'},
                {'type': 'piege', 'erreur': 'On croit que 1/5 > 1/3, car 5 > 3.', 'correction': 'Plus on partage, plus les parts sont petites : 1/5 < 1/3.'},
            ]),
        ],
        a_toi=[
            q('Quel signe entre 3/4 et 3/8 ?', ['>', '<', '='], 'Les quarts sont plus grands que les huitièmes.'),
            q('Quelle fraction est plus petite que 1 ?', ['5/6', '6/5', '9/4'], 'Son numérateur est plus petit que son dénominateur.'),
            q('Range du plus petit au plus grand : 2/9, 7/9, 4/9.', ['2/9 < 4/9 < 7/9', '7/9 < 4/9 < 2/9', '4/9 < 2/9 < 7/9'], 'Même dénominateur : on range les numérateurs.'),
        ],
        sources=[ref('MA-C3-CM1-FRAC-02', 'Comparer des fractions')]),

    'MA-C3-CM1-FRAC-03': dict(duree=6, essentiel=
        'Pour additionner des fractions de même dénominateur, on additionne les numérateurs.\n'
        'On garde le dénominateur : 3/7 + 2/7 = 5/7.\n'
        'Pour soustraire, on soustrait les numérateurs : 9/10 − 4/10 = 5/10.',
        parties=[
            ('Additionner', [
                {'type': 'visuel', 'visuel': barres((7, 3), (7, 2), (7, 5)), 'legende': '3 septièmes plus 2 septièmes : 5 septièmes.'},
                {'type': 'piege', 'erreur': 'On additionne aussi les dénominateurs : 3/7 + 2/7 = 5/14.', 'correction': 'On compte toujours des septièmes : 5/7.'},
                bq('2/9 + 5/9 = ?', ['7/9', '7/18', '10/9'], '2 + 5 = 7 neuvièmes.'),
            ]),
            ('Au-delà de 1', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 5/6 + 4/6.', 'etapes': [
                    '5 + 4 = 9 : on obtient 9/6.', '9/6 = 6/6 + 3/6 = 1 + 3/6.'],
                 'conclusion': '5/6 + 4/6 = 9/6, soit 1 + 3/6.'},
            ]),
        ],
        a_toi=[
            q('11/12 − 7/12 = ?', ['4/12', '4/0', '18/12'], '11 − 7 = 4 douzièmes.'),
            q('3/5 + 4/5 = ?', ['7/5', '7/10', '12/5'], '3 + 4 = 7 cinquièmes.'),
            q('1 − 3/8 = ?', ['5/8', '2/8', '3/8'], '1 = 8/8, et 8 − 3 = 5.'),
        ],
        sources=[ref('MA-C3-CM1-FRAC-03', 'Additionner et soustraire des fractions')]),

    'MA-C3-CM1-FRAC-04': dict(duree=5, essentiel=
        'Prendre 1/4 d’une quantité, c’est la partager en 4 parts égales.\n'
        '1/4 de 20 €, c’est 20 € ÷ 4 = 5 €.\n'
        '1/3 d’une heure, c’est 60 min ÷ 3 = 20 min.',
        parties=[
            ('Partager', [
                {'type': 'visuel', 'visuel': {'type': 'grille', 'lignes': 4, 'colonnes': 5, 'coloriees': 5}, 'legende': '20 jetons en 4 rangées égales : 1/4 de 20, c’est une rangée, soit 5.'},
                bq('1/5 de 35 = ?', ['7', '40', '175'], '35 ÷ 5 = 7.'),
            ]),
            ('Avec des grandeurs', [
                {'type': 'exemple-resolu', 'enonce': 'Combien de centimètres dans 1/10 de mètre ?', 'etapes': [
                    '1 m = 100 cm.', '100 ÷ 10 = 10.'],
                 'conclusion': '1/10 de mètre, c’est 10 cm.'},
                {'type': 'piege', 'erreur': 'On multiplie par 4 au lieu de diviser.', 'correction': 'Un quart est plus petit que le tout : on divise par 4.'},
            ]),
        ],
        a_toi=[
            q('1/2 de 3 kg = ?', ['1,5 kg', '6 kg', '1 kg'], '3 ÷ 2 = 1,5.'),
            q('1/4 d’heure = ?', ['15 min', '25 min', '4 min'], '60 ÷ 4 = 15.'),
            q('1/3 de 27 élèves = ?', ['9', '24', '81'], '27 ÷ 3 = 9.'),
        ],
        sources=[ref('MA-C3-CM1-FRAC-04', 'Fraction d’une quantité')]),

    'MA-C3-CM1-DEC-01': dict(duree=7, essentiel=
        'Un dixième s’écrit 1/10 ou 0,1. Un centième s’écrit 1/100 ou 0,01.\n'
        '34/10 = 3,4 et 257/100 = 2,57.\n'
        '3 + 4/10 + 7/100 = 3,47.',
        parties=[
            ('Dixièmes et centièmes', [
                {'type': 'tableau', 'titre': 'Le nombre 3,47', 'colonnes': ['unités', 'dixièmes', 'centièmes'], 'lignes': [['3', '4', '7']]},
                {'type': 'explique', 'texte': '10 centièmes font 1 dixième. 10 dixièmes font 1 unité.'},
                bq('128/100 = ?', ['1,28', '12,8', '128,100'], '128 centièmes : 1 unité, 2 dixièmes, 8 centièmes.'),
            ]),
            ('Attention au zéro', [
                {'type': 'exemple-resolu', 'enonce': 'Écris 6/100 avec une virgule.', 'etapes': [
                    '6 centièmes : 0 unité, 0 dixième, 6 centièmes.'],
                 'conclusion': '6/100 = 0,06.'},
                {'type': 'piege', 'erreur': 'On écrit 6/100 = 0,6.', 'correction': '0,6, c’est 6 dixièmes. 6 centièmes s’écrivent 0,06.'},
            ]),
        ],
        a_toi=[
            q('5 + 3/10 = ?', ['5,3', '5,03', '53'], '3 dixièmes après la virgule.'),
            q('0,45 = ?', ['45/100', '45/10', '4/100 + 5/10'], '45 centièmes.'),
            q('2 + 9/100 = ?', ['2,09', '2,9', '2,90'], '0 dixième, 9 centièmes.'),
        ],
        sources=[ref('MA-C3-CM1-DEC-01', 'Fractions décimales et écriture à virgule')]),

    'MA-C3-CM1-DEC-02': dict(duree=6, essentiel=
        'On compare d’abord les parties entières.\n'
        'Si elles sont égales, on compare les dixièmes, puis les centièmes.\n'
        '3,7 > 3,65 : 7 dixièmes contre 6 dixièmes.',
        parties=[
            ('Comparer', [
                {'type': 'tableau', 'titre': '3,7 ou 3,65 ?', 'colonnes': ['Nombre', 'unités', 'dixièmes', 'centièmes'], 'lignes': [
                    ['3,7', '3', '7', '0'], ['3,65', '3', '6', '5']]},
                {'type': 'piege', 'erreur': 'On croit que 3,65 > 3,7, car 65 > 7.', 'correction': 'Écris 3,70 : 70 centièmes contre 65 centièmes. Donc 3,7 > 3,65.'},
                bq('Quel signe entre 12,08 et 12,8 ?', ['<', '>', '='], '0 dixième contre 8 dixièmes.'),
            ]),
            ('Ranger et intercaler', [
                {'type': 'exemple-resolu', 'enonce': 'Range dans l’ordre croissant : 2,5 ; 2,05 ; 2,45.', 'etapes': [
                    'Même partie entière : 2.', 'Dixièmes : 5, 0 et 4.'],
                 'conclusion': '2,05 < 2,45 < 2,5.'},
                {'type': 'explique', 'texte': 'Entre 4,3 et 4,4, on trouve 4,35 : on passe aux centièmes.'},
            ]),
        ],
        a_toi=[
            q('Quel est le plus grand nombre ?', ['0,9', '0,85', '0,19'], '9 dixièmes, c’est le plus de dixièmes.'),
            q('Un nombre entre 7,1 et 7,2 :', ['7,15', '7,25', '7,05'], '7,10 < 7,15 < 7,20.'),
            q('Range dans l’ordre décroissant : 1,4 ; 1,04 ; 1,44.', ['1,44 > 1,4 > 1,04', '1,04 > 1,4 > 1,44', '1,4 > 1,44 > 1,04'], '1,44 = 144 centièmes, 1,4 = 140, 1,04 = 104.'),
        ],
        sources=[ref('MA-C3-CM1-DEC-02', 'Comparer et ranger des décimaux')]),

    'MA-C3-CM1-DEC-03': dict(duree=5, essentiel=
        'La partie entière de 8,73 est 8.\n'
        'L’arrondi à l’unité est l’entier le plus proche : l’arrondi de 8,73 est 9.\n'
        'Si le chiffre des dixièmes est 5 ou plus, on arrondit à l’entier du dessus.',
        parties=[
            ('Partie entière et arrondi', [
                vocabulaire(3, 'Arrondi'),
                {'type': 'tableau', 'titre': 'Exemples', 'colonnes': ['Nombre', 'Partie entière', 'Arrondi à l’unité'], 'lignes': [
                    ['8,73', '8', '9'], ['12,4', '12', '12'], ['5,5', '5', '6'], ['0,38', '0', '0']]},
                bq('Quel est l’arrondi de 14,6 ?', ['15', '14', '14,6'], '6 dixièmes : on passe au-dessus.'),
            ]),
            ('Regarder les dixièmes', [
                {'type': 'methode', 'titre': 'Pour arrondir à l’unité', 'etapes': [
                    'Lis le chiffre des dixièmes.', 'De 0 à 4 : garde la partie entière.', 'De 5 à 9 : ajoute 1 à la partie entière.']},
                {'type': 'piege', 'erreur': 'On croit que l’arrondi de 6,49 est 7.', 'correction': 'Le chiffre des dixièmes est 4 : l’arrondi est 6.'},
            ]),
        ],
        a_toi=[
            q('Quelle est la partie entière de 9,99 ?', ['9', '10', '99'], 'On lit ce qui est avant la virgule.'),
            q('Quel est l’arrondi de 3,25 ?', ['3', '4', '3,3'], '2 dixièmes : on garde 3.'),
            q('Quel est l’arrondi de 19,5 ?', ['20', '19', '19,5'], '5 dixièmes : on passe à 20.'),
        ],
        sources=[ref('MA-C3-CM1-DEC-03', 'Partie entière et arrondi')]),

    'MA-C3-CM1-CALC-01': dict(duree=6, essentiel=
        'Ajouter 29, c’est ajouter 30 puis retirer 1.\n'
        'Multiplier par 4, c’est doubler deux fois.\n'
        'Multiplier par 5, c’est multiplier par 10 puis prendre la moitié.',
        parties=[
            ('Ajouter ou retirer 9, 19, 29…', [
                {'type': 'observe', 'consigne': 'On arrondit à la dizaine, puis on corrige.', 'exemples': [
                    '147 + 29 = 147 + 30 − 1 = 176', '85 − 19 = 85 − 20 + 1 = 66', '63 + 38 = 63 + 40 − 2 = 101']},
                {'type': 'piege', 'erreur': 'Pour 85 − 19, on retire 20 puis encore 1.', 'correction': 'On a retiré 1 de trop : on rajoute 1. 85 − 19 = 66.'},
                bq('64 + 38 = ?', ['102', '101', '92'], '64 + 40 = 104, puis 104 − 2 = 102.'),
            ]),
            ('Multiplier par 4, 5, 8', [
                {'type': 'observe', 'consigne': 'Des chemins plus courts.', 'exemples': [
                    '23 × 4 : 23 × 2 = 46, puis 46 × 2 = 92', '36 × 5 : 36 × 10 = 360, puis 360 ÷ 2 = 180', '7 × 8 : 14, 28, 56 (trois doubles)', '6 × 300 = 6 × 3 × 100 = 1 800']},
                bq('18 × 5 = ?', ['90', '85', '180'], '18 × 10 = 180, puis la moitié : 90.'),
            ]),
        ],
        a_toi=[
            q('125 − 39 = ?', ['86', '84', '96'], '125 − 40 = 85, puis 85 + 1 = 86.'),
            q('4 × 700 = ?', ['2 800', '280', '28 000'], '4 × 7 = 28, puis × 100.'),
            q('15 × 4 = ?', ['60', '19', '45'], '15 × 2 = 30, puis 30 × 2 = 60.'),
        ],
        sources=[ref('MA-C3-CM1-CALC-01', 'Procédures de calcul mental')]),

    'MA-C3-CM1-CALC-02': dict(duree=6, essentiel=
        'Multiplier par 10, c’est rendre chaque chiffre 10 fois plus grand : 47 × 10 = 470.\n'
        '47 × 100 = 4 700 et 47 × 1 000 = 47 000.\n'
        '3,6 × 10 = 36 et 3,6 ÷ 10 = 0,36.',
        parties=[
            ('Multiplier par 10, 100, 1 000', [
                {'type': 'tableau', 'titre': '3,6 × 10', 'colonnes': ['Nombre', 'dizaines', 'unités', 'dixièmes', 'centièmes'], 'lignes': [
                    ['3,6', '', '3', '6', ''], ['36', '3', '6', '', '']]},
                {'type': 'piege', 'erreur': 'On croit que multiplier par 10, c’est ajouter un zéro : 3,6 × 10 = 3,60.', 'correction': '3,60 = 3,6. Chaque chiffre avance d’un rang : 36.'},
                bq('250 × 100 = ?', ['25 000', '2 500', '250 000'], 'Chaque chiffre avance de deux rangs.'),
            ]),
            ('Diviser par 10, ajouter des dixièmes', [
                {'type': 'observe', 'consigne': 'Chaque chiffre recule d’un rang, ou on ajoute au bon rang.', 'exemples': [
                    '4,8 ÷ 10 = 0,48', '52 ÷ 10 = 5,2', '5,24 + 0,3 = 5,54', '7,15 + 0,02 = 7,17']},
                bq('4,8 ÷ 10 = ?', ['0,48', '48', '4,08'], 'Les 4 unités deviennent 4 dixièmes.'),
            ]),
        ],
        a_toi=[
            q('7,15 + 0,02 = ?', ['7,17', '7,35', '9,15'], 'On ajoute 2 centièmes.'),
            q('63 × 1 000 = ?', ['63 000', '6 300', '630 000'], 'Trois rangs plus loin.'),
            q('0,9 × 10 = ?', ['9', '0,09', '90'], '9 dixièmes × 10 = 9 unités.'),
        ],
        sources=[ref('MA-C3-CM1-CALC-02', 'Calculer avec la numération')]),

    'MA-C3-CM1-OPE-01': dict(duree=7, essentiel=
        'On aligne les virgules les unes sous les autres.\n'
        'On complète avec des zéros si besoin : 12,5 = 12,50.\n'
        'On calcule comme avec des entiers, puis on place la virgule du résultat.',
        parties=[
            ('Addition', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 12,5 + 7,86.', 'etapes': [
                    'J’écris 12,50 au-dessus de 7,86, virgule sous virgule.',
                    'Centièmes : 0 + 6 = 6. Dixièmes : 5 + 8 = 13, je pose 3 et je retiens 1.',
                    'Unités : 2 + 7 + 1 = 10, je pose 0 et je retiens 1. Dizaines : 1 + 1 = 2.'],
                 'conclusion': '12,5 + 7,86 = 20,36.'},
                {'type': 'piege', 'erreur': 'On aligne les derniers chiffres au lieu des virgules.', 'correction': 'Virgule sous virgule : les dixièmes restent sous les dixièmes.'},
            ]),
            ('Soustraction', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 15 − 3,45.', 'etapes': [
                    'J’écris 15,00 au-dessus de 3,45.', 'Je soustrais rang par rang, avec les retenues.'],
                 'conclusion': '15 − 3,45 = 11,55.'},
                bq('10 − 2,4 = ?', ['7,6', '8,4', '7,4'], '10,0 − 2,4 = 7,6.'),
            ]),
        ],
        a_toi=[
            q('4,7 + 2,15 = ?', ['6,85', '6,22', '2,62'], '4,70 + 2,15 = 6,85.'),
            q('Avant de poser 9,3 + 1,25, on écrit 9,3 :', ['9,30', '93', '9,03'], 'Même nombre de chiffres après la virgule.'),
            q('8,4 − 3,75 = ?', ['4,65', '5,35', '4,75'], '8,40 − 3,75 = 4,65.'),
        ],
        sources=[ref('MA-C3-CM1-OPE-01', 'Additionner et soustraire des décimaux')]),

    'MA-C3-CM1-OPE-02': dict(duree=8, essentiel=
        'On multiplie par les unités, puis par les dizaines en décalant d’un rang.\n'
        'On additionne les produits partiels.\n'
        'Pour un décimal, on calcule sans la virgule, puis on la replace.',
        parties=[
            ('Deux entiers', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 236 × 14.', 'etapes': [
                    '236 × 4 = 944.', '236 × 10 = 2 360 : c’est la ligne décalée.', '944 + 2 360 = 3 304.'],
                 'conclusion': '236 × 14 = 3 304.'},
                {'type': 'piege', 'erreur': 'On oublie le zéro de décalage sur la deuxième ligne.', 'correction': 'Le 1 de 14 vaut 1 dizaine : on multiplie par 10.'},
                bq('45 × 12 = ?', ['540', '450', '135'], '45 × 2 = 90 et 45 × 10 = 450. 90 + 450 = 540.'),
            ]),
            ('Un décimal par un entier', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 3,25 × 6.', 'etapes': [
                    'Sans la virgule : 325 × 6 = 1 950.', '3,25 a deux chiffres après la virgule : le résultat aussi.'],
                 'conclusion': '3,25 × 6 = 19,50, soit 19,5.'},
            ]),
        ],
        a_toi=[
            q('1,4 × 3 = ?', ['4,2', '42', '0,42'], '14 × 3 = 42, avec un chiffre après la virgule.'),
            q('312 × 20 = ?', ['6 240', '624', '6 024'], '312 × 2 = 624, puis × 10.'),
            q('125 × 8 = ?', ['1 000', '800', '1 250'], '125 × 8 = 1 000.'),
        ],
        sources=[ref('MA-C3-CM1-OPE-02', 'Poser une multiplication')]),

    'MA-C3-CM1-OPE-03': dict(duree=8, essentiel=
        'Dans 47 ÷ 5, 47 est le dividende et 5 le diviseur.\n'
        '47 = 5 × 9 + 2 : le quotient est 9 et le reste est 2.\n'
        'Le reste est toujours plus petit que le diviseur.',
        parties=[
            ('Le vocabulaire', [
                vocabulaire(3, 'Dividende', 'Diviseur', 'Quotient', 'Reste'),
                bq('Dans 36 = 5 × 7 + 1, quel est le reste ?', ['1', '7', '5'], 'Le reste est ce qui ne peut plus être partagé.'),
            ]),
            ('Poser la division', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 857 ÷ 4.', 'etapes': [
                    'Dans 8 centaines : 2 fois 4, soit 8. Reste 0.',
                    'J’abaisse 5 dizaines : 1 fois 4. Reste 1.',
                    'J’abaisse 7 : dans 17 unités, 4 fois 4, soit 16. Reste 1.'],
                 'conclusion': '857 = 4 × 214 + 1. Le quotient est 214, le reste est 1.'},
                {'type': 'methode', 'titre': 'Pour vérifier', 'etapes': [
                    'Calcule diviseur × quotient + reste.', 'Tu dois retrouver le dividende.', 'Vérifie que le reste est plus petit que le diviseur.']},
                {'type': 'piege', 'erreur': 'On garde un reste plus grand que le diviseur.', 'correction': 'S’il reste 6 quand on divise par 5, on peut encore mettre 5 une fois.'},
            ]),
        ],
        a_toi=[
            q('53 ÷ 6 : quotient et reste ?', ['8, reste 5', '9, reste 1', '8, reste 6'], '6 × 8 = 48 et 53 − 48 = 5.'),
            q('Quel est le reste de 100 ÷ 7 ?', ['2', '3', '14'], '7 × 14 = 98 et 100 − 98 = 2.'),
            q('Quel est le quotient de 96 ÷ 3 ?', ['32', '33', '31'], '3 × 32 = 96, le reste est 0.'),
        ],
        sources=[ref('MA-C3-CM1-OPE-03', 'Division euclidienne')]),

    'MA-C3-CM1-ALG-01': dict(duree=5, essentiel=
        'Une égalité à trous cache un nombre : 25 + … = 63.\n'
        'Pour le trouver, on utilise l’opération inverse : 63 − 25 = 38.\n'
        'Les deux membres d’une égalité ont toujours la même valeur.',
        parties=[
            ('L’opération inverse', [
                {'type': 'observe', 'consigne': 'Chaque trou se trouve avec l’opération inverse.', 'exemples': [
                    '25 + … = 63 : 63 − 25 = 38', '… − 17 = 30 : 30 + 17 = 47', '7 × … = 56 : 56 ÷ 7 = 8']},
                bq('6 × … = 42 ?', ['7', '36', '48'], '42 ÷ 6 = 7.'),
            ]),
            ('Un calcul de chaque côté', [
                {'type': 'exemple-resolu', 'enonce': 'Complète : 12 + 8 = … + 15.', 'etapes': [
                    'Le membre de gauche vaut 20.', '… + 15 = 20, donc … = 5.'],
                 'conclusion': '12 + 8 = 5 + 15.'},
                {'type': 'piege', 'erreur': 'Pour 12 + 8 = … + 15, on écrit 20.', 'correction': 'Le trou n’est pas le résultat. Les deux côtés valent 20 : le trou vaut 5.'},
            ]),
        ],
        a_toi=[
            q('… − 17 = 30 ?', ['47', '13', '30'], '30 + 17 = 47.'),
            q('40 + 5 = 30 + … ?', ['15', '45', '5'], 'Les deux côtés valent 45.'),
            q('… × 9 = 72 ?', ['8', '63', '81'], '72 ÷ 9 = 8.'),
        ],
        sources=[ref('MA-C3-CM1-ALG-01', 'Égalités à trous')]),

    'MA-C3-CM1-PB-01': dict(duree=7, essentiel=
        'Un problème peut demander deux ou trois calculs.\n'
        'Chaque calcul donne un résultat intermédiaire utile pour la suite.\n'
        'À la fin, on vérifie qu’on répond bien à la question posée.',
        parties=[
            ('Un exemple', [
                {'type': 'exemple-resolu', 'enonce': 'Léo achète 3 cahiers à 2,50 € et une trousse à 8 €. Il paie avec 20 €. Combien lui rend-on ?', 'etapes': [
                    'Les cahiers : 3 × 2,50 = 7,50 €.', 'Le total : 7,50 + 8 = 15,50 €.', 'La monnaie : 20 − 15,50 = 4,50 €.'],
                 'conclusion': 'On lui rend 4,50 €.'},
            ]),
            ('La méthode', [
                {'type': 'methode', 'titre': 'Pour un problème en plusieurs étapes', 'etapes': [
                    'Lis tout l’énoncé, puis la question.', 'Cherche ce qu’il faut savoir avant de répondre.',
                    'Calcule chaque étape et écris ce qu’elle donne.', 'Réponds par une phrase.']},
                {'type': 'piege', 'erreur': 'On donne le résultat d’une étape intermédiaire.', 'correction': 'Relis la question : 15,50 € est le prix, pas la monnaie rendue.'},
            ]),
        ],
        a_toi=[
            q('Un car transporte 48 élèves. 15 descendent, puis 9 montent. Combien d’élèves ?', ['42', '72', '24'], '48 − 15 = 33, puis 33 + 9 = 42.'),
            q('4 places à 7 € et 2 boissons à 3 €. Quel est le total ?', ['34 €', '14 €', '40 €'], '28 + 6 = 34.'),
            q('Une classe a 120 € et achète 5 livres à 18 €. Que reste-t-il ?', ['30 €', '90 €', '102 €'], '5 × 18 = 90, puis 120 − 90 = 30.'),
        ],
        sources=[ref('MA-C3-CM1-PB-01', 'Problèmes en plusieurs étapes')]),

    'MA-C3-CM1-PB-02': dict(duree=6, essentiel=
        '« 3 fois plus » : on multiplie. Léa a 4 billes, Tom 3 fois plus : 12 billes.\n'
        '« 3 fois moins » : on divise. 12 ÷ 3 = 4.\n'
        '« Combien de fois » : on cherche le facteur. 12 = 4 × 3, donc 3 fois.',
        parties=[
            ('Fois plus, fois moins', [
                {'type': 'exemple-resolu', 'enonce': 'Un pull coûte 30 €. Un manteau coûte 4 fois plus. Quel est le prix du manteau ?', 'etapes': [
                    '« 4 fois plus » : on multiplie par 4.', '30 × 4 = 120.'],
                 'conclusion': 'Le manteau coûte 120 €.'},
                {'type': 'piege', 'erreur': 'On confond « 3 fois plus » et « 3 de plus ».', 'correction': '4 et 3 de plus : 7. 4 et 3 fois plus : 12.'},
            ]),
            ('Combien de fois ?', [
                {'type': 'exemple-resolu', 'enonce': 'Une baguette coûte 1 €, un gâteau 6 €. Combien de fois plus cher est le gâteau ?', 'etapes': [
                    'Je cherche 1 × ? = 6.'],
                 'conclusion': 'Le gâteau est 6 fois plus cher.'},
                bq('Combien de fois 7 dans 56 ?', ['8', '49', '63'], '7 × 8 = 56.'),
            ]),
        ],
        a_toi=[
            q('Un chat pèse 5 kg, un chien 6 fois plus. Combien pèse le chien ?', ['30 kg', '11 kg', '1 kg'], '5 × 6 = 30.'),
            q('Une tour mesure 80 m, une maison 10 fois moins. La maison mesure :', ['8 m', '70 m', '800 m'], '80 ÷ 10 = 8.'),
            q('Ali a 9 ans, son père 36 ans. Combien de fois plus âgé est le père ?', ['4', '27', '45'], '9 × 4 = 36.'),
        ],
        sources=[ref('MA-C3-CM1-PB-02', 'Comparaison multiplicative')]),

    'MA-C3-CM1-PROP-01': dict(duree=7, essentiel=
        'Deux quantités sont proportionnelles si l’une s’obtient toujours en multipliant l’autre par le même nombre.\n'
        'Si 3 cahiers coûtent 6 €, 6 cahiers coûtent 2 fois plus : 12 €.\n'
        '9 cahiers = 3 cahiers + 6 cahiers, donc 6 € + 12 € = 18 €.',
        parties=[
            ('Fois plus, fois moins', [
                {'type': 'exemple-resolu', 'enonce': '4 croissants coûtent 5 €. Combien coûtent 12 croissants ?', 'etapes': [
                    '12, c’est 3 fois 4.', 'Le prix aussi est multiplié par 3 : 5 × 3 = 15.'],
                 'conclusion': '12 croissants coûtent 15 €.'},
                {'type': 'exemple-resolu', 'enonce': 'Pour 6 personnes, il faut 300 g de farine. Combien pour 2 personnes ?', 'etapes': [
                    '2, c’est 3 fois moins que 6.', '300 ÷ 3 = 100.'],
                 'conclusion': 'Il faut 100 g de farine.'},
            ]),
            ('Additionner des quantités', [
                {'type': 'explique', 'texte': 'On peut aussi décomposer : 5 kg = 2 kg + 3 kg. Le prix de 5 kg est la somme des deux prix.'},
                {'type': 'piege', 'erreur': 'On ajoute au lieu de multiplier : 4 devient 12, donc 5 € devient 13 €.', 'correction': '12 est 3 fois 4 : le prix est aussi multiplié par 3.'},
                bq('2 kg de pommes coûtent 6 €. Combien coûtent 6 kg ?', ['18 €', '10 €', '12 €'], '6 kg, c’est 3 fois 2 kg : 6 × 3 = 18.'),
            ]),
        ],
        a_toi=[
            q('5 stylos coûtent 4 €. Combien coûtent 15 stylos ?', ['12 €', '14 €', '8 €'], '15 = 3 × 5, donc 4 × 3 = 12.'),
            q('En 2 h, un randonneur fait 8 km. En 5 h, à la même allure ?', ['20 km', '11 km', '16 km'], '4 h : 16 km, 1 h : 4 km, donc 5 h : 20 km.'),
            q('3 places coûtent 21 €. Combien coûte 1 place ?', ['7 €', '18 €', '63 €'], '21 ÷ 3 = 7.'),
        ],
        sources=[ref('MA-C3-CM1-PROP-01', 'Proportionnalité')]),
}

ecrire(COURS)
