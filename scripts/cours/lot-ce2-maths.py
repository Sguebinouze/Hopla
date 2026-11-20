"""Lot de cours : maths CE2. Écrit les cours en brouillon (auteur ia).

    python3 scripts/cours/lot-ce2-maths.py

Cycle 2 : phrases de 12 mots au plus, bloquant. Les pages des extraits sont retrouvées ensuite.
"""
from commun import BO, barres, bq, ecrire, q, src, vocabulaire


def ref(competence_extrait, appui):
    return src(BO, competence_extrait, appui)


COURS = {
    'MA-C2-CE2-NUM-01': dict(duree=7, essentiel=
        'Un nombre à 4 chiffres a milliers, centaines, dizaines et unités.\n'
        '4 635 = 4 000 + 600 + 30 + 5.\n'
        '1 millier = 10 centaines = 100 dizaines = 1 000 unités.',
        parties=[
            ('Le millier', [
                {'type': 'tableau', 'titre': 'Le nombre 4 635', 'colonnes': ['Milliers', 'Centaines', 'Dizaines', 'Unités'], 'lignes': [['4', '6', '3', '5']]},
                {'type': 'explique', 'texte': 'Dix paquets de cent font **un millier**. On écrit 1 000.'},
                bq('Dans 7 248, que vaut le 7 ?', ['7 milliers', '7 centaines', '7 unités'], 'Il est au rang des milliers : 7 000.'),
            ]),
            ('Décomposer', [
                {'type': 'methode', 'titre': 'Pour décomposer un nombre', 'etapes': [
                    'Lis chaque chiffre avec son rang.',
                    'Écris la valeur de chaque chiffre.',
                    'Ajoute : 4 000 + 600 + 30 + 5.']},
                {'type': 'piege', 'erreur': 'Dans 3 045, on oublie le 0.', 'correction': '3 045 = 3 000 + 40 + 5. Il n’y a pas de centaine.'},
                bq('Quel nombre fait 2 milliers et 9 unités ?', ['2 009', '209', '2 900'], 'Le 0 garde la place des centaines et des dizaines.'),
            ]),
        ],
        a_toi=[
            q('Combien de centaines dans 1 millier ?', ['10', '100', '1 000'], '10 × 100 = 1 000.'),
            q('Quel nombre est égal à 5 000 + 300 + 7 ?', ['5 307', '5 370', '537'], 'Pas de dizaine : 0 au rang des dizaines.'),
            q('Dans 6 512, combien de dizaines en tout ?', ['651', '1', '65'], '6 512 = 651 dizaines et 2 unités.'),
        ],
        sources=[ref('Les connaissances et savoir-faire attendus concernent les nombres jusqu’à 10 000.', 'Nombres jusqu’à 10 000')]),

    'MA-C2-CE2-NUM-02': dict(duree=6, essentiel=
        'On écrit les nombres en lettres avec des traits d’union.\n'
        '4 635 s’écrit quatre-mille-six-cent-trente-cinq.\n'
        'Mille ne prend jamais de s.',
        parties=[
            ('Écrire en lettres', [
                {'type': 'methode', 'titre': 'Pour écrire un nombre en lettres', 'etapes': [
                    'Lis les milliers : quatre-mille.',
                    'Lis le reste : six-cent-trente-cinq.',
                    'Relie tous les mots par des traits d’union.']},
                {'type': 'tableau', 'titre': 'Règles d’accord', 'colonnes': ['Mot', 'Règle', 'Exemple'], 'lignes': [
                    ['mille', 'jamais de s', 'trois-mille'], ['cent', 's à la fin seulement', 'deux-cents, deux-cent-un'], ['vingt', 's dans quatre-vingts seul', 'quatre-vingts, quatre-vingt-un']]},
                bq('Comment écrit-on 3 000 ?', ['trois-mille', 'trois-milles', 'trois mille s'], 'Mille est invariable.'),
            ]),
            ('Lire un nombre', [
                {'type': 'piege', 'erreur': 'On écrit 4 600 pour « quatre-mille-six ».', 'correction': 'Quatre-mille-six, c’est 4 006. Les zéros gardent les places.'},
                bq('Comment écrit-on « deux-mille-quarante » ?', ['2 040', '2 400', '240'], '2 milliers et 4 dizaines.'),
            ]),
        ],
        a_toi=[
            q('Comment écrit-on 800 ?', ['huit-cents', 'huit-cent', 'huit-centes'], 'Cent prend un s à la fin du nombre.'),
            q('Quel nombre est « cinq-mille-trois-cent-dix » ?', ['5 310', '5 301', '53 010'], '5 milliers, 3 centaines, 1 dizaine.'),
            q('Comment écrit-on 80 ?', ['quatre-vingts', 'quatre-vingt', 'huitante'], 'Quatre-vingts prend un s.'),
        ],
        sources=[ref('L’élève sait écrire en chiffres un nombre dicté.', 'Écrire un nombre dicté')]),

    'MA-C2-CE2-NUM-03': dict(duree=6, essentiel=
        'Pour comparer deux nombres, on compare d’abord le nombre de chiffres.\n'
        'Puis on compare les milliers, les centaines, les dizaines, les unités.\n'
        '4 618 est entre 4 610 et 4 620.',
        parties=[
            ('Comparer et ranger', [
                {'type': 'methode', 'titre': 'Pour comparer deux nombres', 'etapes': [
                    'Plus de chiffres : le nombre est plus grand.',
                    'Même nombre de chiffres : compare de gauche à droite.',
                    'Le premier chiffre différent décide.']},
                {'type': 'exemple-resolu', 'enonce': 'Range dans l’ordre croissant : 6 243 ; 6 234 ; 6 239.', 'etapes': [
                    'Mêmes milliers, mêmes centaines.', 'Dizaines : 4, 3, 3.', 'Pour 6 234 et 6 239, unités : 4 et 9.'],
                 'conclusion': '6 234 < 6 239 < 6 243'},
                bq('Quel nombre est le plus grand ?', ['7 002', '6 999', '999'], '7 milliers contre 6.'),
            ]),
            ('Encadrer', [
                {'type': 'explique', 'texte': '4 618 a 461 dizaines. Il est entre **4 610** et **4 620**.'},
                {'type': 'piege', 'erreur': 'On croit que 999 > 1 000.', 'correction': '999 a 3 chiffres, 1 000 en a 4. 1 000 est plus grand.'},
            ]),
        ],
        a_toi=[
            q('Quel signe va entre 5 304 et 5 340 ?', ['<', '>', '='], '0 dizaine contre 4 dizaines.'),
            q('4 725 est entre quelles centaines ?', ['4 700 et 4 800', '4 000 et 5 000', '4 720 et 4 730'], '47 centaines.'),
            q('Range dans l’ordre croissant : 3 100 ; 1 300 ; 3 010.', ['1 300 ; 3 010 ; 3 100', '3 100 ; 3 010 ; 1 300', '3 010 ; 1 300 ; 3 100'], 'Compare les milliers, puis les centaines.'),
        ],
        sources=[ref('L’élève sait ordonner dans l’ordre croissant ou décroissant un ensemble pouvant aller', 'Ranger des nombres')]),

    'MA-C2-CE2-FRAC-01': dict(duree=6, essentiel=
        'Une fraction dit combien de parts égales on prend.\n'
        'Dans 3/4, on coupe en 4 parts égales. On en prend 3.\n'
        'Au CE2, le nombre du bas va jusqu’à 12.',
        parties=[
            ('Lire et écrire', [
                {'type': 'visuel', 'visuel': barres((4, 3)), 'legende': '3 parts coloriées sur 4 : trois quarts.'},
                {'type': 'tableau', 'titre': 'Lire une fraction', 'colonnes': ['Fraction', 'Se lit'], 'lignes': [
                    ['1/2', 'un demi'], ['2/3', 'deux tiers'], ['3/4', 'trois quarts'], ['5/12', 'cinq douzièmes']]},
                bq('Comment lit-on 7/10 ?', ['sept dixièmes', 'sept dix', 'dix septièmes'], '10 parts : des dixièmes.'),
            ]),
            ('Toutes les parts', [
                {'type': 'piege', 'erreur': 'On compte seulement les parts blanches en bas.', 'correction': 'Le nombre du bas compte toutes les parts.'},
                {'type': 'explique', 'texte': 'Si toutes les parts sont coloriées, la fraction vaut 1 : 4/4 = 1.'},
                bq('Une bande coupée en 6, toute coloriée. Quelle fraction ?', ['6/6', '1/6', '0/6'], 'Toutes les parts : 6/6 = 1.'),
            ]),
        ],
        a_toi=[
            q('Une pizza en 8 parts. Tom en mange 3. Quelle fraction ?', ['3/8', '8/3', '5/8'], '3 parts sur 8.'),
            q('Que vaut 9/9 ?', ['1', '9', '0'], 'Toutes les parts.'),
            q('Comment lit-on 2/5 ?', ['deux cinquièmes', 'deux cinq', 'cinq demis'], '5 parts : des cinquièmes.'),
        ],
        sources=[ref('Les fractions rencontrées au CE2 ont un dénominateur inférieur ou égal à douze et sont tou', 'Fractions au CE2')]),

    'MA-C2-CE2-FRAC-02': dict(duree=6, essentiel=
        'Deux fractions peuvent être égales.\n'
        'Chaque part coupée en deux : deux fois plus de parts.\n'
        '3/4 = 6/8. 1/2 = 2/4 = 4/8.',
        parties=[
            ('Couper les parts', [
                {'type': 'visuel', 'visuel': barres((4, 3), (8, 6)), 'legende': '3/4 et 6/8 colorient la même longueur.'},
                {'type': 'explique', 'texte': 'On a coupé chaque quart en deux. On obtient des huitièmes. Il y en a deux fois plus.'},
                bq('Complète : 1/2 = …/4', ['2', '1', '4'], 'Un demi, c’est deux quarts.'),
            ]),
            ('Trouver le nombre manquant', [
                {'type': 'methode', 'titre': 'Pour compléter 2/3 = …/6', 'etapes': [
                    'Compare les nombres du bas : 6 = 2 × 3.',
                    'Multiplie aussi le nombre du haut par 2.',
                    '2/3 = 4/6.']},
                {'type': 'piege', 'erreur': 'On ajoute : 2/3 = 5/6.', 'correction': 'On multiplie le haut et le bas par le même nombre.'},
            ]),
        ],
        a_toi=[
            q('Complète : 1/3 = …/6', ['2', '3', '1'], '6 = 2 × 3, donc 1 × 2 = 2.'),
            q('Quelle fraction est égale à 1/2 ?', ['5/10', '2/10', '1/10'], '5 dixièmes, c’est la moitié.'),
            q('Complète : 3/4 = …/12', ['9', '6', '12'], '12 = 3 × 4, donc 3 × 3 = 9.'),
        ],
        sources=[ref('L’élève sait déterminer le numérateur manquant dans l’égalité', 'Égalités de fractions')]),

    'MA-C2-CE2-FRAC-03': dict(duree=7, essentiel=
        'Même nombre du bas : le plus grand nombre du haut gagne.\n'
        'Même nombre du haut : les plus grandes parts gagnent.\n'
        '5/12 < 7/12. 5/12 < 5/8.',
        parties=[
            ('Même dénominateur', [
                {'type': 'visuel', 'visuel': barres((12, 5), (12, 7)), 'legende': '5/12 colorie moins que 7/12.'},
                bq('Quelle fraction est la plus grande ?', ['4/5', '2/5', '3/5'], 'Même taille de parts : 4 parts, c’est le plus.'),
            ]),
            ('Même numérateur', [
                {'type': 'explique', 'texte': 'Un huitième est plus grand qu’un douzième. Donc 5 huitièmes dépassent 5 douzièmes.'},
                {'type': 'piege', 'erreur': 'On croit que 1/12 > 1/8, car 12 > 8.', 'correction': 'Plus on coupe en parts, plus elles sont petites.'},
                {'type': 'exemple-resolu', 'enonce': 'Compare 5/6 et 7/12.', 'etapes': [
                    '12 = 2 × 6, donc 5/6 = 10/12.', '10/12 > 7/12.'],
                 'conclusion': '5/6 > 7/12'},
            ]),
        ],
        a_toi=[
            q('Quel signe va entre 3/10 et 7/10 ?', ['<', '>', '='], '3 dixièmes, moins que 7 dixièmes.'),
            q('Quel signe va entre 2/3 et 2/6 ?', ['>', '<', '='], 'Les tiers sont plus grands que les sixièmes.'),
            q('Quelle fraction est la plus petite ?', ['1/10', '1/4', '1/2'], 'Les dixièmes sont les plus petites parts.'),
        ],
        sources=[ref('L’élève sait comparer des fractions ayant le même numérateur et justifier sa réponse', 'Comparer des fractions')]),

    'MA-C2-CE2-FRAC-04': dict(duree=6, essentiel=
        'Même nombre du bas : on ajoute ou retire les nombres du haut.\n'
        '3/8 + 2/8 = 5/8.\n'
        'Sinon, on transforme d’abord : 1/2 + 1/4 = 2/4 + 1/4 = 3/4.',
        parties=[
            ('Même dénominateur', [
                {'type': 'visuel', 'visuel': barres((8, 3), (8, 2), (8, 5)), 'legende': '3 huitièmes plus 2 huitièmes font 5 huitièmes.'},
                bq('Combien font 4/10 + 3/10 ?', ['7/10', '7/20', '1/10'], '4 + 3 = 7 dixièmes.'),
            ]),
            ('Dénominateurs différents', [
                {'type': 'methode', 'titre': 'Pour calculer 1/2 + 1/4', 'etapes': [
                    'Écris le demi en quarts : 1/2 = 2/4.',
                    'Ajoute : 2/4 + 1/4 = 3/4.']},
                {'type': 'piege', 'erreur': '1/2 + 1/4 = 2/6.', 'correction': 'On n’ajoute pas les nombres du bas.'},
            ]),
        ],
        a_toi=[
            q('Combien font 5/6 − 2/6 ?', ['3/6', '3/0', '7/6'], '5 − 2 = 3 sixièmes.'),
            q('Combien font 1/3 + 1/6 ?', ['3/6', '2/9', '2/6'], '1/3 = 2/6, puis 2/6 + 1/6.'),
            q('Combien font 1 − 1/4 ?', ['3/4', '0', '1/4'], '1 = 4/4, puis 4/4 − 1/4.'),
        ],
        sources=[ref('L’élève sait additionner et soustraire des fractions de même dénominateur en', 'Additionner des fractions')]),

    'MA-C2-CE2-CALC-01': dict(duree=7, essentiel=
        'On connait les tables de multiplication par cœur, de 2 à 9.\n'
        '6 × 7 = 42 et 7 × 6 = 42.\n'
        'On les utilise dans les deux sens : 42 = 6 × 7.',
        parties=[
            ('Retenir les tables', [
                {'type': 'tableau', 'titre': 'Résultats difficiles', 'colonnes': ['Calcul', 'Résultat'], 'lignes': [
                    ['6 × 7', '42'], ['7 × 8', '56'], ['6 × 8', '48'], ['8 × 9', '72'], ['7 × 9', '63']]},
                {'type': 'methode', 'titre': 'Pour retrouver un résultat', 'etapes': [
                    'Pars d’un résultat connu : 5 × 8 = 40.',
                    'Ajoute un 8 : 6 × 8 = 48.']},
                bq('Combien font 9 × 6 ?', ['54', '45', '56'], '10 × 6 = 60, moins 6.'),
            ]),
            ('Dans les deux sens', [
                {'type': 'explique', 'texte': 'Savoir 7 × 8 = 56, c’est aussi savoir que 56 = 7 × 8.'},
                {'type': 'piege', 'erreur': 'On confond 7 × 8 et 7 + 8.', 'correction': '7 × 8, c’est 8 fois 7 : 56. 7 + 8 = 15.'},
                bq('Complète : 36 = … × 9', ['4', '3', '6'], '4 × 9 = 36.'),
            ]),
        ],
        a_toi=[
            q('Combien font 8 × 8 ?', ['64', '56', '48'], 'Huit fois huit.'),
            q('Complète : … × 7 = 49', ['7', '6', '8'], '7 × 7 = 49.'),
            q('Combien font 3 × 9 ?', ['27', '24', '39'], '9 + 9 + 9.'),
        ],
        sources=[ref('À la fin du CE2, l’élève peut compléter douze égalités de ce type en une minute.', 'Tables de multiplication')]),

    'MA-C2-CE2-CALC-02': dict(duree=6, essentiel=
        'Doubles utiles : 2 × 150 = 300, 2 × 500 = 1 000.\n'
        'Multiples de 25 : 25, 50, 75, 100.\n'
        '60 = 2 × 30 = 3 × 20 = 4 × 15 = 5 × 12 = 6 × 10.',
        parties=[
            ('Doubles et moitiés', [
                {'type': 'tableau', 'titre': 'Doubles et moitiés', 'colonnes': ['Nombre', 'Double', 'Moitié'], 'lignes': [
                    ['50', '100', '25'], ['150', '300', '75'], ['500', '1 000', '250'], ['1 000', '2 000', '500']]},
                bq('Quelle est la moitié de 300 ?', ['150', '600', '100'], '150 + 150 = 300.'),
            ]),
            ('25 et 60', [
                {'type': 'explique', 'texte': '4 × 25 = 100. Quatre pièces de 25 centimes font 1 €.'},
                {'type': 'explique', 'texte': '60 se décompose de plusieurs façons. C’est utile pour les minutes : 60 min = 4 × 15 min.'},
                {'type': 'piege', 'erreur': 'On croit que 3 × 25 = 65.', 'correction': '25, 50, 75 : 3 × 25 = 75.'},
            ]),
        ],
        a_toi=[
            q('Combien font 2 × 250 ?', ['500', '450', '2 500'], '250 + 250.'),
            q('Complète : 60 = 5 × …', ['12', '10', '15'], '5 × 12 = 60.'),
            q('Combien font 8 × 25 ?', ['200', '100', '250'], '4 × 25 = 100, deux fois.'),
        ],
        sources=[ref('L’élève connait les multiples de 25 suivants', 'Faits numériques utiles')]),

    'MA-C2-CE2-CALC-03': dict(duree=6, essentiel=
        'Multiplier par 10 : chaque unité devient une dizaine. 724 × 10 = 7 240.\n'
        'Multiplier par 100 : chaque unité devient une centaine. 36 × 100 = 3 600.',
        parties=[
            ('Par 10', [
                {'type': 'observe', 'consigne': 'Calcule 724 × 10.', 'exemples': [
                    '7 centaines deviennent 7 milliers.', '2 dizaines deviennent 2 centaines.', '4 unités deviennent 4 dizaines.', 'Résultat : 7 240.']},
                bq('Combien font 58 × 10 ?', ['580', '5 800', '68'], 'Chaque chiffre gagne un rang.'),
            ]),
            ('Par 100', [
                {'type': 'explique', 'texte': 'Multiplier par 100, c’est multiplier par 10, puis encore par 10.'},
                {'type': 'piege', 'erreur': 'On ajoute 100 : 36 × 100 = 136.', 'correction': 'Multiplier n’est pas ajouter. 36 × 100 = 3 600.'},
            ]),
        ],
        a_toi=[
            q('Combien font 45 × 100 ?', ['4 500', '450', '145'], '45 centaines.'),
            q('Combien font 10 × 306 ?', ['3 060', '316', '30 600'], '306 dizaines.'),
            q('Complète : … × 10 = 920', ['92', '9 200', '910'], '92 dizaines = 920.'),
        ],
        sources=[ref('lors d’une multiplication par 10, une unité devient une dizaine', 'Multiplier par 10')]),

    'MA-C2-CE2-CALC-04': dict(duree=7, essentiel=
        'Pour ajouter 9, j’ajoute 10 puis j’enlève 1.\n'
        'Pour multiplier par 4, je double puis je double encore.\n'
        '23 × 7 = 20 × 7 + 3 × 7 = 140 + 21 = 161.',
        parties=[
            ('Ajouter ou retirer 9, 19, 29…', [
                {'type': 'tableau', 'titre': 'Astuces', 'colonnes': ['Pour…', 'Je fais…', 'Exemple'], 'lignes': [
                    ['+ 9', '+ 10 − 1', '47 + 9 = 56'], ['+ 39', '+ 40 − 1', '25 + 39 = 64'], ['− 19', '− 20 + 1', '83 − 19 = 64'], ['+ 8', '+ 10 − 2', '36 + 8 = 44']]},
                bq('Combien font 64 − 29 ?', ['35', '33', '93'], '64 − 30 = 34, puis + 1.'),
            ]),
            ('Multiplier vite', [
                {'type': 'methode', 'titre': 'Pour calculer 4 × 37', 'etapes': [
                    'Double : 2 × 37 = 74.',
                    'Double encore : 2 × 74 = 148.']},
                {'type': 'explique', 'texte': 'Pour multiplier par 8, on double trois fois.'},
                {'type': 'exemple-resolu', 'enonce': 'Calcule 23 × 7.', 'etapes': [
                    '20 × 7 = 140.', '3 × 7 = 21.', '140 + 21 = 161.'],
                 'conclusion': '23 × 7 = 161'},
                {'type': 'piege', 'erreur': 'Pour − 19, on enlève 20 et on enlève encore 1.', 'correction': 'On a enlevé 1 de trop. On rajoute 1.'},
            ]),
        ],
        a_toi=[
            q('Combien font 56 + 19 ?', ['75', '74', '76'], '56 + 20 = 76, puis − 1.'),
            q('Combien font 4 × 25 ?', ['100', '50', '125'], '2 × 25 = 50, puis 2 × 50.'),
            q('Combien font 12 × 6 ?', ['72', '62', '66'], '10 × 6 + 2 × 6 = 60 + 12.'),
        ],
        sources=[ref('L’élève sait que multiplier par 4 revient à multiplier par 2 et encore par 2.', 'Multiplier par 4')]),

    'MA-C2-CE2-CALC-05': dict(duree=5, essentiel=
        'Les tables d’addition se savent par cœur, dans les deux sens.\n'
        '8 + 7 = 15, donc 15 − 7 = 8.\n'
        'On complète vite : 4 + … = 12.',
        parties=[
            ('Calculer sans compter', [
                {'type': 'methode', 'titre': 'Passer par 10', 'etapes': [
                    '8 + 7 : ajoute 2 pour faire 10.',
                    'Il reste 5 à ajouter : 15.']},
                bq('Combien font 9 + 6 ?', ['15', '14', '16'], '9 + 1 = 10, puis + 5.'),
            ]),
            ('Dans les deux sens', [
                {'type': 'explique', 'texte': 'Si 6 + 7 = 13, alors 13 − 7 = 6 et 13 − 6 = 7.'},
                {'type': 'piege', 'erreur': 'Dans 10 = 7 + …, on ajoute 10 et 7.', 'correction': 'On cherche ce qui manque à 7 pour faire 10 : 3.'},
            ]),
        ],
        a_toi=[
            q('Complète : 5 + … = 13', ['8', '18', '7'], '5 + 8 = 13.'),
            q('Combien font 14 − 6 ?', ['8', '7', '20'], '6 + 8 = 14.'),
            q('Complète : 11 = 4 + …', ['7', '15', '6'], '4 + 7 = 11.'),
        ],
        sources=[ref('À la fin du CE2, l’élève peut compléter quinze égalités de ce type en une minute.', 'Tables d’addition')]),

    'MA-C2-CE2-OPE-01': dict(duree=8, essentiel=
        'Pour poser une addition, on aligne les unités sous les unités.\n'
        'On calcule de droite à gauche, sans oublier les retenues.\n'
        'Le résultat d’une addition est une somme. Celui d’une soustraction est une différence.',
        parties=[
            ('L’addition posée', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 3 721 + 4 054.', 'etapes': [
                    'Unités : 1 + 4 = 5.', 'Dizaines : 2 + 5 = 7.', 'Centaines : 7 + 0 = 7.', 'Milliers : 3 + 4 = 7.'],
                 'conclusion': 'La somme est 7 775.'},
                {'type': 'piege', 'erreur': 'On aligne les nombres à gauche.', 'correction': 'On aligne à droite : unités sous unités.'},
                bq('Combien font 2 468 + 1 352 ?', ['3 820', '3 710', '3 810'], 'Attention aux retenues.'),
            ]),
            ('La soustraction posée', [
                {'type': 'methode', 'titre': 'Pour poser 602 − 375', 'etapes': [
                    'Unités : 2 − 5, impossible. Prends une dizaine.',
                    'Il n’y a pas de dizaine : prends une centaine.',
                    'Calcule rang par rang. Résultat : 227.',
                    'Vérifie : 227 + 375 = 602.']},
                {'type': 'explique', 'texte': 'La **différence** entre 60 et 37 est 23.'},
            ]),
        ],
        a_toi=[
            q('Combien font 5 000 − 1 250 ?', ['3 750', '4 250', '3 850'], 'Vérifie : 3 750 + 1 250 = 5 000.'),
            q('La somme de 1 500 et 2 700 est :', ['4 200', '1 200', '3 200'], '1 500 + 2 700.'),
            q('Comment vérifier une soustraction ?', ['par une addition', 'par une multiplication', 'on ne peut pas'], 'Différence + nombre retiré = nombre de départ.'),
        ],
        sources=[ref('L’élève sait traiter les additions et les soustractions posées avec des nombres entiers', 'Opérations posées')]),

    'MA-C2-CE2-OPE-02': dict(duree=8, essentiel=
        'Pour multiplier par un nombre à deux chiffres, on décompose.\n'
        '548 × 16 = 548 × 6 + 548 × 10.\n'
        '3 288 + 5 480 = 8 768.',
        parties=[
            ('Par un chiffre', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 548 × 6.', 'etapes': [
                    '6 × 8 = 48 : j’écris 8, je retiens 4.', '6 × 4 = 24, + 4 = 28 : j’écris 8, je retiens 2.', '6 × 5 = 30, + 2 = 32.'],
                 'conclusion': '548 × 6 = 3 288'},
                bq('Combien font 123 × 3 ?', ['369', '366', '126'], '3 × 3, 3 × 2, 3 × 1.'),
            ]),
            ('Par deux chiffres', [
                {'type': 'methode', 'titre': 'Pour poser 548 × 16', 'etapes': [
                    'Ligne 1 : 548 × 6 = 3 288.',
                    'Ligne 2 : 548 × 10 = 5 480. Le 0 se place au rang des unités.',
                    'Ajoute les deux lignes : 8 768.']},
                {'type': 'piege', 'erreur': 'On oublie le 0 de la deuxième ligne.', 'correction': 'On multiplie par 1 dizaine : on décale d’un rang.'},
            ]),
        ],
        a_toi=[
            q('Combien font 25 × 12 ?', ['300', '250', '275'], '25 × 10 + 25 × 2 = 250 + 50.'),
            q('Combien font 34 × 5 ?', ['170', '150', '39'], '30 × 5 + 4 × 5.'),
            q('Dans 46 × 13, la deuxième ligne vaut :', ['460', '46', '138'], '46 × 10.'),
        ],
        sources=[ref('Par exemple, l’élève sait calculer 16 × 548 ou 548 × 16 en posant l’opération avec le', 'Multiplication posée')]),

    'MA-C2-CE2-OPE-03': dict(duree=7, essentiel=
        'La division est l’inverse de la multiplication.\n'
        '7 × 13 = 91, donc 91 ÷ 7 = 13 et 91 ÷ 13 = 7.\n'
        'Diviser, c’est chercher combien de fois un nombre est dans un autre.',
        parties=[
            ('Le signe ÷', [
                {'type': 'observe', 'consigne': 'On partage 24 bonbons entre 4 enfants.', 'exemples': [
                    'Chacun reçoit le même nombre.', '4 × 6 = 24.', 'Donc 24 ÷ 4 = 6.']},
                bq('Combien font 35 ÷ 5 ?', ['7', '30', '40'], '5 × 7 = 35.'),
            ]),
            ('S’appuyer sur les tables', [
                {'type': 'methode', 'titre': 'Pour calculer 56 ÷ 8', 'etapes': [
                    'Cherche dans la table de 8.',
                    '8 × 7 = 56.',
                    'Donc 56 ÷ 8 = 7.']},
                {'type': 'piege', 'erreur': 'On écrit 8 ÷ 56 = 7.', 'correction': 'On écrit d’abord le nombre partagé : 56 ÷ 8.'},
            ]),
        ],
        a_toi=[
            q('Combien font 42 ÷ 6 ?', ['7', '6', '8'], '6 × 7 = 42.'),
            q('Si 9 × 12 = 108, combien font 108 ÷ 9 ?', ['12', '9', '117'], 'Opération inverse.'),
            q('Combien font 81 ÷ 9 ?', ['9', '8', '72'], '9 × 9 = 81.'),
        ],
        sources=[ref('L’élève comprend que la division est l’opération inverse de la multiplication.', 'Sens de la division')]),

    'MA-C2-CE2-PB-01': dict(duree=7, essentiel=
        'Je cherche le tout : j’ajoute les parties.\n'
        'Je cherche une partie : je retire l’autre partie au tout.\n'
        'Un schéma en barres m’aide à choisir.',
        parties=[
            ('Chercher le tout ou une partie', [
                {'type': 'exemple-resolu', 'enonce': 'Une ville a 3 817 habitants. 1 292 habitants arrivent. Combien d’habitants maintenant ?', 'etapes': [
                    'On cherche le tout.', '3 817 + 1 292 = 5 109.'],
                 'conclusion': 'La ville a 5 109 habitants.'},
                {'type': 'tableau', 'titre': 'Schéma en barres', 'colonnes': ['Tout', 'Partie 1', 'Partie 2'], 'lignes': [['?', '3 817', '1 292']]},
                bq('Un stade a 8 000 places. 6 450 sont occupées. Places libres ?', ['1 550', '14 450', '2 550'], '8 000 − 6 450.'),
            ]),
            ('Vérifier', [
                {'type': 'methode', 'titre': 'Pour vérifier sa réponse', 'etapes': [
                    'Estime : 3 800 + 1 300, c’est environ 5 100.',
                    'Compare avec ton calcul.',
                    'Écris une phrase réponse.']},
                {'type': 'piege', 'erreur': 'On ajoute tous les nombres de l’énoncé.', 'correction': 'Repère d’abord ce qu’on cherche : le tout ou une partie.'},
            ]),
        ],
        a_toi=[
            q('Un livre a 320 pages. Lou en a lu 145. Combien en reste-t-il ?', ['175', '465', '185'], '320 − 145.'),
            q('2 classes : 27 et 28 élèves. Combien en tout ?', ['55', '1', '45'], '27 + 28.'),
            q('Un vélo coute 1 250 €. Paul a 980 €. Combien lui manque-t-il ?', ['270 €', '2 230 €', '370 €'], '1 250 − 980.'),
        ],
        sources=[ref('des problèmes en une étape avec des nombres entiers supérieurs à 1 000 ;', 'Problèmes additifs')]),

    'MA-C2-CE2-PB-02': dict(duree=8, essentiel=
        'Un problème en deux étapes demande deux calculs.\n'
        'Je trouve d’abord le résultat intermédiaire.\n'
        'Puis je l’utilise pour répondre à la question.',
        parties=[
            ('Deux étapes', [
                {'type': 'exemple-resolu', 'enonce': 'Léo a 188 billes. Lucie en a 75 de plus. Combien en ont-ils ensemble ?', 'etapes': [
                    'Étape 1 : Lucie a 188 + 75 = 263 billes.', 'Étape 2 : ensemble, 188 + 263 = 451.'],
                 'conclusion': 'Ils ont 451 billes ensemble.'},
                {'type': 'methode', 'titre': 'Pour un problème en deux étapes', 'etapes': [
                    'Lis la question finale.',
                    'Cherche ce qu’il faut savoir d’abord.',
                    'Calcule ce résultat intermédiaire.',
                    'Utilise-le pour répondre.']},
                bq('Un cahier coute 3 €. J’en achète 4 et je paie avec 20 €. Monnaie rendue ?', ['8 €', '12 €', '17 €'], '4 × 3 = 12, puis 20 − 12.'),
            ]),
            ('Ne pas s’arrêter trop tôt', [
                {'type': 'piege', 'erreur': 'On répond 263, le nombre de billes de Lucie.', 'correction': 'Relis la question : on demande le total des deux.'},
            ]),
        ],
        a_toi=[
            q('Tom a 50 €. Il achète un livre à 12 € et un jeu à 25 €. Il lui reste :', ['13 €', '37 €', '38 €'], '12 + 25 = 37, puis 50 − 37.'),
            q('3 boites de 12 œufs et 5 œufs de plus. Combien d’œufs ?', ['41', '36', '20'], '3 × 12 = 36, puis + 5.'),
            q('Mia a 40 images, Sam 15 de moins. Ensemble ?', ['65', '25', '55'], 'Sam : 25. Puis 40 + 25.'),
        ],
        sources=[ref('L’élève rencontre des problèmes de comparaison qui se traitent en deux étapes.', 'Problèmes en deux étapes')]),

    'MA-C2-CE2-PB-03': dict(duree=7, essentiel=
        'Je cherche le tout : je multiplie. 6 boites de 12, c’est 6 × 12 = 72.\n'
        'Je cherche une part : je divise. 72 € pour 6 livres : 72 ÷ 6 = 12 €.\n'
        'Je cherche le nombre de parts : combien de fois 12 dans 72 ?',
        parties=[
            ('Trois questions', [
                {'type': 'tableau', 'titre': 'Même situation, trois questions', 'colonnes': ['On cherche', 'Calcul', 'Réponse'], 'lignes': [
                    ['le prix total de 6 livres à 12 €', '6 × 12', '72 €'], ['le prix d’un livre si 6 livres coutent 72 €', '72 ÷ 6', '12 €'], ['le nombre de livres à 12 € pour 72 €', '72 ÷ 12', '6 livres']]},
                bq('8 rangées de 9 chaises. Combien de chaises ?', ['72', '17', '81'], '8 × 9.'),
            ]),
            ('Choisir', [
                {'type': 'piege', 'erreur': 'On multiplie dès qu’on voit deux nombres.', 'correction': 'Si on connait le total, on divise.'},
                bq('45 élèves en équipes de 5. Combien d’équipes ?', ['9', '50', '40'], '5 × 9 = 45.'),
            ]),
        ],
        a_toi=[
            q('4 paquets de 25 feuilles. Combien de feuilles ?', ['100', '29', '75'], '4 × 25.'),
            q('63 € partagés entre 7 amis. Chacun reçoit :', ['9 €', '56 €', '70 €'], '63 ÷ 7.'),
            q('Un stylo coute 3 €. Combien de stylos pour 27 € ?', ['9', '24', '30'], '27 ÷ 3.'),
        ],
        sources=[ref('conduit à étendre le champ numérique sur lequel portent les problèmes multiplicatifs', 'Problèmes multiplicatifs')]),

    'MA-C2-CE2-PB-04': dict(duree=7, essentiel=
        '« 4 fois plus » : je multiplie par 4.\n'
        '« 4 fois moins » : je divise par 4.\n'
        '« 4 de plus » : j’ajoute 4. Attention à ne pas confondre.',
        parties=[
            ('Fois plus, de plus', [
                {'type': 'exemple-resolu', 'enonce': 'Un casque coute 32 €. La trottinette coute 4 fois plus cher.', 'etapes': [
                    '4 fois plus : 4 × 32.', '4 × 32 = 128.'],
                 'conclusion': 'La trottinette coute 128 €.'},
                {'type': 'tableau', 'titre': 'Ne pas confondre', 'colonnes': ['Expression', 'Calcul', 'Avec 20'], 'lignes': [
                    ['3 fois plus', '× 3', '60'], ['3 de plus', '+ 3', '23'], ['3 fois moins', '÷ 3', '20 ÷ 3 ne tombe pas juste'], ['4 fois moins', '÷ 4', '5']]},
                bq('Léa a 6 ans. Son père a 6 fois plus. Âge du père ?', ['36 ans', '12 ans', '42 ans'], '6 × 6.'),
            ]),
            ('Fois moins', [
                {'type': 'piege', 'erreur': '« 5 fois moins que 40 » : 40 − 5 = 35.', 'correction': 'Fois moins : on divise. 40 ÷ 5 = 8.'},
                bq('Un chat pèse 4 kg. Une souris pèse 100 fois moins… Que fait-on ?', ['on divise', 'on multiplie', 'on ajoute'], 'Fois moins : division.'),
            ]),
        ],
        a_toi=[
            q('Un crayon coute 2 €. Un livre coute 7 fois plus. Prix du livre ?', ['14 €', '9 €', '5 €'], '7 × 2.'),
            q('Tom a 24 billes. Sami en a 3 fois moins. Sami a :', ['8 billes', '21 billes', '72 billes'], '24 ÷ 3.'),
            q('Ana a 10 €. Zoé a 5 € de plus. Zoé a :', ['15 €', '50 €', '2 €'], 'De plus : on ajoute.'),
        ],
        sources=[ref('L’élève comprend le sens des locutions « fois plus » et « fois moins » et les distingue de', 'Fois plus, fois moins')]),

    'MA-C2-CE2-GM-01': dict(duree=7, essentiel=
        'Les unités de longueur : km, m, dm, cm, mm.\n'
        '1 m = 10 dm = 100 cm = 1 000 mm. 1 cm = 10 mm. 1 km = 1 000 m.\n'
        '3 cm 4 mm = 34 mm.',
        parties=[
            ('Les unités', [
                {'type': 'tableau', 'titre': 'Relations', 'colonnes': ['Unité', 'Vaut'], 'lignes': [
                    ['1 km', '1 000 m'], ['1 m', '10 dm = 100 cm'], ['1 dm', '10 cm'], ['1 cm', '10 mm']]},
                {'type': 'visuel', 'visuel': {'type': 'regle', 'graduations': 6, 'debut': 0, 'fin': 3.4}, 'legende': 'Le trait mesure 3 cm et 4 mm, soit 34 mm.'},
                bq('Combien de mm dans 5 cm ?', ['50', '5', '500'], '1 cm = 10 mm.'),
            ]),
            ('Convertir', [
                {'type': 'exemple-resolu', 'enonce': 'Écris 5 km 750 m en mètres.', 'etapes': [
                    '5 km = 5 000 m.', '5 000 + 750 = 5 750.'],
                 'conclusion': '5 km 750 m = 5 750 m.'},
                {'type': 'piege', 'erreur': 'On écrit 2 m 5 cm = 25 cm.', 'correction': '2 m = 200 cm. Donc 2 m 5 cm = 205 cm.'},
            ]),
        ],
        a_toi=[
            q('Combien de cm dans 3 m ?', ['300', '30', '3 000'], '1 m = 100 cm.'),
            q('Écris 1 m 7 cm en cm.', ['107 cm', '17 cm', '170 cm'], '100 + 7.'),
            q('Quelle unité pour mesurer une fourmi ?', ['le mm', 'le km', 'le m'], 'Elle est minuscule.'),
        ],
        sources=[ref('L’élève sait que 1 cm = 10 mm et 1 m = 1 000 mm.', 'Unités de longueur')]),

    'MA-C2-CE2-GM-02': dict(duree=7, essentiel=
        'Masses : 1 t = 1 000 kg et 1 kg = 1 000 g.\n'
        'Contenances : 1 L = 10 dL = 100 cL.\n'
        '780 cL = 7 L et 80 cL.',
        parties=[
            ('Les masses', [
                {'type': 'tableau', 'titre': 'Unités de masse', 'colonnes': ['Unité', 'Exemple'], 'lignes': [
                    ['tonne (t)', 'une voiture pèse environ 1 t'], ['kilogramme (kg)', 'un sac de pommes de terre'], ['gramme (g)', 'une feuille de papier']]},
                bq('Combien de g dans 3 kg ?', ['3 000', '300', '30'], '1 kg = 1 000 g.'),
            ]),
            ('Les contenances', [
                {'type': 'tableau', 'titre': 'Unités de contenance', 'colonnes': ['Unité', 'Exemple'], 'lignes': [
                    ['litre (L)', 'une grande bouteille d’eau'], ['décilitre (dL)', 'un petit verre'], ['centilitre (cL)', 'une cuillère à soupe, environ 1 cL']]},
                {'type': 'exemple-resolu', 'enonce': 'Écris 780 cL en litres et centilitres.', 'etapes': [
                    '100 cL = 1 L.', '780 cL = 700 cL + 80 cL.'],
                 'conclusion': '780 cL = 7 L et 80 cL.'},
                {'type': 'piege', 'erreur': 'On écrit 1 L = 10 cL.', 'correction': '1 L = 10 dL = 100 cL.'},
            ]),
        ],
        a_toi=[
            q('Combien de cL dans 2 L ?', ['200', '20', '2 000'], '1 L = 100 cL.'),
            q('Combien de kg dans 2 t ?', ['2 000', '200', '20'], '1 t = 1 000 kg.'),
            q('Une canette contient plutôt :', ['33 cL', '33 L', '3 cL'], 'Une canette fait 33 cL.'),
        ],
        sources=[ref('L’élève sait convertir entre les unités gramme et kilogramme :', 'Masses et contenances')]),

    'MA-C2-CE2-GM-03': dict(duree=7, essentiel=
        'Un prix s’écrit avec une virgule : 2,05 € = 2 € et 5 centimes.\n'
        'Pour rendre la monnaie, on complète jusqu’à la somme donnée.\n'
        '3,68 € payés avec 5 € : on rend 1,32 €.',
        parties=[
            ('Écrire et ajouter des prix', [
                {'type': 'visuel', 'visuel': {'type': 'monnaie', 'valeurs': [2, 0.5, 0.2, 0.05]}, 'legende': '2 € + 50 c + 20 c + 5 c = 2,75 €.'},
                {'type': 'methode', 'titre': 'Pour ajouter deux prix', 'etapes': [
                    'Ajoute les euros.',
                    'Ajoute les centimes.',
                    '100 centimes font 1 € de plus.']},
                bq('Combien font 1,50 € + 2,70 € ?', ['4,20 €', '3,20 €', '3,120 €'], '3 € + 120 c = 4,20 €.'),
            ]),
            ('Rendre la monnaie', [
                {'type': 'exemple-resolu', 'enonce': 'Un livre coute 3,68 €. On paie avec 5 €.', 'etapes': [
                    'De 3,68 € à 3,70 € : 2 c.', 'De 3,70 € à 4 € : 30 c.', 'De 4 € à 5 € : 1 €.'],
                 'conclusion': 'On rend 1 € + 30 c + 2 c = 1,32 €.'},
                {'type': 'piege', 'erreur': 'On écrit 2,5 € pour 2 € et 5 centimes.', 'correction': 'Les centimes s’écrivent avec deux chiffres : 2,05 €.'},
            ]),
        ],
        a_toi=[
            q('On paie 2,40 € avec 5 €. Monnaie ?', ['2,60 €', '3,60 €', '2,40 €'], '2,40 + 2,60 = 5.'),
            q('Comment écrit-on 7 € et 9 centimes ?', ['7,09 €', '7,9 €', '79 €'], 'Deux chiffres après la virgule.'),
            q('Combien font 0,75 € + 0,25 € ?', ['1 €', '0,100 €', '0,95 €'], '75 c + 25 c = 100 c.'),
        ],
        sources=[ref('L’élève sait rendre la monnaie en procédant par ajouts successifs', 'Rendre la monnaie')]),

    'MA-C2-CE2-GM-04': dict(duree=7, essentiel=
        '1 h = 60 min. 2 h 20 min = 120 + 20 = 140 min.\n'
        'Pour une durée, je passe par l’heure pile.\n'
        'De 15 h 40 à 16 h 05, il passe 25 min.',
        parties=[
            ('Convertir', [
                {'type': 'methode', 'titre': 'Pour convertir 2 h 20 min', 'etapes': [
                    '2 h = 2 × 60 = 120 min.',
                    'Ajoute 20 min : 140 min.']},
                bq('Combien de minutes dans 1 h 15 min ?', ['75', '115', '65'], '60 + 15.'),
            ]),
            ('Calculer une durée ou un horaire', [
                {'type': 'visuel', 'visuel': {'type': 'horloge', 'heures': 15, 'minutes': 40}, 'legende': 'Il est 15 h 40.'},
                {'type': 'exemple-resolu', 'enonce': 'Le film commence à 15 h 40 et dure 45 min. À quelle heure finit-il ?', 'etapes': [
                    'De 15 h 40 à 16 h : 20 min.', 'Il reste 25 min.'],
                 'conclusion': 'Le film finit à 16 h 25.'},
                {'type': 'piege', 'erreur': 'On écrit 15 h 40 + 45 min = 15 h 85.', 'correction': 'Une heure a 60 minutes. On passe à 16 h.'},
            ]),
        ],
        a_toi=[
            q('Durée de 9 h 50 à 10 h 20 ?', ['30 min', '70 min', '20 min'], '10 min + 20 min.'),
            q('Combien de minutes dans 3 h ?', ['180', '300', '90'], '3 × 60.'),
            q('Il est 11 h 45. Dans 30 min, il sera :', ['12 h 15', '11 h 75', '12 h 45'], '15 min jusqu’à midi, puis 15 min.'),
        ],
        sources=[ref('L’élève sait déterminer le nombre de minutes qu’il y a dans deux heures et vingt minutes.', 'Heures et minutes')]),

    'MA-C2-CE2-GEO-01': dict(duree=7, essentiel=
        'Un cube a 6 faces carrées, 12 arêtes et 8 sommets.\n'
        'Un pavé a 6 faces rectangulaires, 12 arêtes et 8 sommets.\n'
        'Les faces d’une pyramide sont des triangles, sauf la base.',
        parties=[
            ('Décrire un solide', [
                vocabulaire(2, 'Face', 'Arête', 'Sommet'),
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'pave'}, 'legende': 'Un pavé : les arêtes cachées sont en pointillés.'},
                bq('Combien de sommets a un pavé ?', ['8', '6', '12'], '4 en haut, 4 en bas.'),
            ]),
            ('La pyramide', [
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'pyramide-triangulaire'}, 'legende': 'Une pyramide à base triangulaire : 4 faces triangulaires.'},
                {'type': 'explique', 'texte': 'Les faces triangulaires d’une pyramide se rejoignent en un sommet. La base peut être un triangle, un carré…'},
                {'type': 'piege', 'erreur': 'On compte seulement les faces visibles.', 'correction': 'Sur un dessin, les traits en pointillés montrent ce qui est caché.'},
            ]),
        ],
        a_toi=[
            q('Combien d’arêtes a un cube ?', ['12', '8', '6'], '4 + 4 + 4.'),
            q('Les faces d’un cube sont des :', ['carrés', 'triangles', 'rectangles non carrés'], 'Toutes pareilles.'),
            q('Une pyramide à base carrée a combien de faces ?', ['5', '4', '6'], '1 carré et 4 triangles.'),
        ],
        sources=[ref('justifier sa nature en indiquant le nombre et la nature de ses faces', 'Décrire un solide')]),

    'MA-C2-CE2-GEO-02': dict(duree=6, essentiel=
        'Un polygone est une figure fermée faite de segments.\n'
        'On le nomme selon son nombre de côtés.\n'
        '3 côtés : triangle. 4 : quadrilatère. 5 : pentagone. 6 : hexagone.',
        parties=[
            ('Nommer un polygone', [
                {'type': 'tableau', 'titre': 'Les polygones', 'colonnes': ['Côtés', 'Nom'], 'lignes': [['3', 'triangle'], ['4', 'quadrilatère'], ['5', 'pentagone'], ['6', 'hexagone']]},
                {'type': 'visuel', 'visuel': {'type': 'figure', 'largeur': 12, 'hauteur': 6, 'quadrillage': True, 'elements': [
                    {'forme': 'polygone', 'sommets': [[1, 4], [3, 1], [5, 4], [4, 5.5], [2, 5.5]]}, {'forme': 'polygone', 'sommets': [[7, 3], [8.5, 1], [10.5, 1], [11.5, 3], [10.5, 5], [8.5, 5]]}]},
                 'legende': 'Un pentagone, puis un hexagone.'},
                bq('Un polygone à 5 côtés est :', ['un pentagone', 'un hexagone', 'un triangle'], 'Penta veut dire cinq.'),
            ]),
            ('Polygone ou pas ?', [
                {'type': 'piege', 'erreur': 'On croit qu’un disque est un polygone.', 'correction': 'Un disque a un bord rond. Un polygone n’a que des côtés droits.'},
                {'type': 'explique', 'texte': 'Le carré, le rectangle et le losange sont des **quadrilatères**.'},
            ]),
        ],
        a_toi=[
            q('Un hexagone a combien de côtés ?', ['6', '5', '8'], 'Hexa veut dire six.'),
            q('Un carré est un :', ['quadrilatère', 'pentagone', 'triangle'], 'Il a 4 côtés.'),
            q('Quelle figure n’est pas un polygone ?', ['le cercle', 'le triangle', 'le rectangle'], 'Le cercle n’a pas de côté droit.'),
        ],
        sources=[ref('polygone, triangle, quadrilatère, pentagone et hexagone', 'Polygones')]),

    'MA-C2-CE2-GEO-03': dict(duree=6, essentiel=
        'Tous les points d’un cercle sont à la même distance du centre.\n'
        'Cette distance est le rayon.\n'
        'Le diamètre passe par le centre. Il mesure deux rayons.',
        parties=[
            ('Centre, rayon, diamètre', [
                {'type': 'visuel', 'visuel': {'type': 'figure', 'largeur': 9, 'hauteur': 8, 'elements': [
                    {'forme': 'cercle', 'centre': [4.5, 4], 'rayon': 3}, {'forme': 'point', 'en': [4.5, 4], 'nom': 'O'},
                    {'forme': 'segment', 'de': [1.5, 4], 'a': [7.5, 4], 'accent': True}, {'forme': 'segment', 'de': [4.5, 4], 'a': [4.5, 1]}]},
                 'legende': 'En couleur, un diamètre. Le trait vertical est un rayon.'},
                vocabulaire(2, 'Cercle', 'Centre'),
                bq('Le rayon mesure 4 cm. Le diamètre mesure :', ['8 cm', '2 cm', '4 cm'], 'Deux rayons.'),
            ]),
            ('Tracer au compas', [
                {'type': 'methode', 'titre': 'Pour tracer un cercle de rayon 3 cm', 'etapes': [
                    'Écarte le compas de 3 cm sur la règle.',
                    'Plante la pointe sur le centre.',
                    'Tourne sans changer l’écartement.']},
                {'type': 'piege', 'erreur': 'On écarte le compas de la longueur du diamètre.', 'correction': 'L’écartement du compas est le rayon.'},
            ]),
        ],
        a_toi=[
            q('Diamètre 10 cm. Rayon ?', ['5 cm', '20 cm', '10 cm'], 'La moitié.'),
            q('Le diamètre passe par :', ['le centre', 'un seul point du cercle', 'nulle part'], 'Il traverse le cercle par le centre.'),
            q('L’écartement du compas correspond :', ['au rayon', 'au diamètre', 'au centre'], 'Du centre au bord.'),
        ],
        sources=[ref('disque, cercle, centre, rayon, diamètre', 'Vocabulaire du cercle')]),

    'MA-C2-CE2-DATA-01': dict(duree=6, essentiel=
        'Dans un tableau à double entrée, on croise ligne et colonne.\n'
        'Dans un diagramme, une graduation peut valoir plus que 1.\n'
        'Je lis l’échelle avant de lire les barres.',
        parties=[
            ('Le tableau à double entrée', [
                {'type': 'tableau', 'titre': 'Comment viennent les élèves', 'colonnes': ['Transport', 'Filles', 'Garçons'], 'lignes': [
                    ['à pied', '77', '65'], ['en vélo', '29', '18'], ['en voiture', '24', '24'], ['en bus', '18', '27']]},
                {'type': 'methode', 'titre': 'Pour lire une case', 'etapes': [
                    'Trouve la ligne : en vélo.',
                    'Trouve la colonne : garçons.',
                    'Lis la case au croisement : 18.']},
                bq('Combien de filles viennent à pied ?', ['77', '65', '142'], 'Ligne « à pied », colonne « filles ».'),
            ]),
            ('Le diagramme avec une échelle', [
                {'type': 'visuel', 'visuel': {'type': 'diagramme', 'titre': 'Livres empruntés', 'unite': 'livres', 'pas': 5, 'barres': [
                    {'nom': 'lundi', 'valeur': 20}, {'nom': 'mardi', 'valeur': 35}, {'nom': 'jeudi', 'valeur': 15}, {'nom': 'vendredi', 'valeur': 25}]},
                 'legende': 'Chaque graduation vaut 5 livres.'},
                {'type': 'piege', 'erreur': 'On compte les graduations : mardi, 7 livres.', 'correction': 'Une graduation vaut 5. 7 × 5 = 35 livres.'},
            ]),
        ],
        a_toi=[
            q('Combien de garçons viennent en bus ?', ['27', '18', '45'], 'Ligne « en bus », colonne « garçons ».'),
            q('Combien de livres le vendredi ?', ['25', '5', '20'], 'La barre monte à 25.'),
            q('Quel jour a eu le plus d’emprunts ?', ['mardi', 'lundi', 'jeudi'], '35 livres.'),
        ],
        sources=[ref('Lire et interpréter les données d’un tableau à double entrée', 'Tableau à double entrée')]),
}

ecrire(COURS)
