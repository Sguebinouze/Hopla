"""Lot de cours : maths CE1, nombres et calcul. Écrit les cours en brouillon (auteur ia).

    python3 scripts/cours/lot-ce1-maths-nombres.py

Phrases de 12 mots au plus (cycle 2). Les pages des extraits sont retrouvées ensuite dans les PDF archivés.
"""
import json, os

RACINE = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..'))
BO = 'bo41-2024-maths-c2'
LIVRET = 'eduscol-livret-maths-ce1-2025'
FRAC = 'eduscol-fractions-ce1-cm2-2025'


def q(consigne, options, explication):
    """Question : la première option est la bonne réponse."""
    return {'consigne': consigne, 'options': options, 'reponse': options[0], 'explication': explication}


def bq(consigne, options, explication):
    return {'type': 'question', **q(consigne, options, explication)}


def src(id_, extrait, appui, page=None):
    return {'id': id_, 'page': page, 'extrait': extrait, 'appui': appui}


def barres(*b):
    return {'type': 'fractions', 'barres': [{'parts': p, 'coloriees': c, 'nom': f'{c}/{p}'} for p, c in b]}


COURS = {
    'MA-C2-CE1-NUM-01': dict(duree=8, essentiel=
        'Un nombre à 3 chiffres a des **centaines**, des **dizaines**, des **unités**.\n'
        '635, c’est 6 centaines, 3 dizaines et 5 unités.\n635 = 600 + 30 + 5.\nOn l’écrit six-cent-trente-cinq.',
        parties=[
            ('Centaines, dizaines, unités', [
                {'type': 'observe', 'consigne': 'Regarde comment on range 635 dans le tableau.', 'exemples': [
                    '6 paquets de cent.', '3 paquets de dix.', '5 unités toutes seules.']},
                {'type': 'tableau', 'titre': 'Le nombre 635', 'colonnes': ['Centaines', 'Dizaines', 'Unités'], 'lignes': [['6', '3', '5']]},
                {'type': 'explique', 'texte': 'Chaque chiffre a une place. Le **6** vaut 6 centaines, donc 600. Le **3** vaut 3 dizaines, donc 30. Le **5** vaut 5 unités.'},
                bq('Dans 482, que vaut le chiffre 8 ?', ['8 dizaines', '8 unités', '8 centaines'], 'Le 8 est à la place des dizaines. Il vaut 80.'),
            ]),
            ('Décomposer un nombre', [
                {'type': 'methode', 'titre': 'Pour décomposer un nombre', 'etapes': [
                    'Lis le chiffre des centaines : 6, donc 600.',
                    'Lis le chiffre des dizaines : 3, donc 30.',
                    'Lis le chiffre des unités : 5.',
                    'Écris la somme : 635 = 600 + 30 + 5.']},
                {'type': 'piege', 'erreur': 'Dans 407, on oublie le 0.', 'correction': '407, c’est 4 centaines, 0 dizaine et 7 unités. 407 = 400 + 7.'},
                bq('Quelle écriture est égale à 352 ?', ['300 + 50 + 2', '3 + 5 + 2', '300 + 5 + 2'], '3 centaines, 5 dizaines, 2 unités : 300 + 50 + 2.'),
            ]),
            ('Écrire le nombre en lettres', [
                {'type': 'exemple-resolu', 'enonce': 'Écris 635 en lettres.', 'etapes': [
                    '600 se dit six-cents. Devant un autre nombre, on écrit six-cent.',
                    '35 se dit trente-cinq.', 'On relie les mots par des traits d’union.'],
                 'conclusion': '635 s’écrit six-cent-trente-cinq.'},
            ]),
        ],
        a_toi=[
            q('Combien de centaines dans 728 ?', ['7', '2', '8'], '728 = 700 + 20 + 8. Il y a 7 centaines.'),
            q('Quel nombre fait 5 centaines, 0 dizaine et 9 unités ?', ['509', '59', '590'], '500 + 9 = 509. Le 0 garde la place des dizaines.'),
            q('Comment écrit-on 240 en lettres ?', ['deux-cent-quarante', 'deux-cents-quarante', 'vingt-quatre'], 'Deux-cent prend un s seulement à la fin du nombre.'),
        ],
        sources=[src(BO, 'L’élève sait écrire en chiffres un nombre dicté. Il sait également lire un nombre écrit en chiffres et l’écrire en lettres.', 'Ce que l’élève de CE1 doit savoir faire', 11),
                 src(BO, 'décomposition additive sous la forme 600 + 30 + 5', 'Décomposer un nombre')]),

    'MA-C2-CE1-NUM-02': dict(duree=7, essentiel=
        'Pour comparer deux nombres, regarde d’abord les centaines.\nPuis compare les dizaines, puis les unités.\n'
        '234 < 239 : mêmes centaines, mêmes dizaines, 4 est plus petit que 9.',
        parties=[
            ('Comparer deux nombres', [
                {'type': 'observe', 'consigne': 'Compare les chiffres de gauche à droite.', 'exemples': [
                    '412 et 398 : 4 centaines contre 3 centaines.', '256 et 263 : mêmes centaines, 5 dizaines contre 6.', '734 et 731 : seules les unités changent.']},
                {'type': 'methode', 'titre': 'Pour comparer deux nombres', 'etapes': [
                    'Compare les centaines. La plus grande gagne.',
                    'Si elles sont égales, compare les dizaines.',
                    'Si elles sont encore égales, compare les unités.']},
                {'type': 'tableau', 'titre': 'Les signes', 'colonnes': ['Signe', 'Se lit', 'Exemple'], 'lignes': [
                    ['<', 'est plus petit que', '398 < 412'], ['>', 'est plus grand que', '263 > 256'], ['=', 'est égal à', '500 = 500']]},
                {'type': 'piege', 'erreur': 'On croit que 98 est plus grand que 120. On regarde le 9.', 'correction': '98 n’a pas de centaines. 120 a une centaine. 120 est plus grand.'},
                bq('Quel nombre est le plus grand ?', ['503', '499', '350'], '503 a 5 centaines. C’est le plus de centaines.'),
            ]),
            ('Ranger et encadrer', [
                {'type': 'exemple-resolu', 'enonce': 'Range du plus petit au plus grand : 243, 234, 239.', 'etapes': [
                    'Les trois nombres ont 2 centaines.', 'Dizaines : 3, 3 et 4. 243 est le plus grand.', 'Pour 234 et 239, compare les unités : 4 puis 9.'],
                 'conclusion': '234 < 239 < 243'},
                {'type': 'explique', 'texte': '**Encadrer**, c’est trouver le nombre juste avant et juste après. 727 est entre 720 et 730.'},
                bq('727 est entre quelles dizaines ?', ['720 et 730', '700 et 800', '727 et 728'], '72 dizaines, c’est 720. La dizaine suivante est 730.'),
            ]),
        ],
        a_toi=[
            q('Quel signe va entre 645 et 654 ?', ['<', '>', '='], 'Mêmes centaines. 4 dizaines contre 5 dizaines : 645 < 654.'),
            q('Range du plus grand au plus petit : 812, 821, 128.', ['821, 812, 128', '128, 812, 821', '812, 821, 128'], '821 > 812 > 128.'),
            q('Quel nombre est entre 360 et 370 ?', ['365', '356', '376'], '365 a 36 dizaines, comme 360.'),
        ],
        sources=[src(BO, 'L’élève sait ordonner dans l’ordre croissant ou décroissant un ensemble pouvant aller', 'Ce que l’élève de CE1 doit savoir faire', 11)]),

    'MA-C2-CE1-FRAC-01': dict(duree=8, essentiel=
        'Une fraction dit combien de parts égales on prend.\n'
        'Dans 3/8, le **dénominateur** 8 dit en combien de parts on coupe. Le **numérateur** 3 dit combien de parts on prend.',
        parties=[
            ('Des parts égales', [
                {'type': 'observe', 'consigne': 'Cette barre est coupée en 8 parts égales.', 'exemples': [
                    '3 parts sont coloriées.', 'On écrit 3/8.', 'On lit : trois huitièmes.']},
                {'type': 'visuel', 'visuel': barres((8, 3)), 'legende': '3 parts coloriées sur 8 parts égales.'},
                {'type': 'explique', 'texte': 'Les parts doivent être **égales**. Sinon, ce n’est pas une fraction.'},
                bq('Une barre est coupée en 4 parts égales. 1 part est coloriée. Quelle fraction ?', ['1/4', '4/1', '1/3'], 'On coupe en 4. On prend 1 part : 1/4.'),
            ]),
            ('Lire une fraction', [
                {'type': 'tableau', 'titre': 'Les noms des parts', 'colonnes': ['Fraction', 'Se lit'], 'lignes': [
                    ['1/2', 'un demi'], ['1/3', 'un tiers'], ['1/4', 'un quart'], ['2/5', 'deux cinquièmes'], ['3/10', 'trois dixièmes']]},
                {'type': 'methode', 'titre': 'Pour écrire une fraction', 'etapes': [
                    'Compte toutes les parts : c’est le nombre du bas.',
                    'Compte les parts coloriées : c’est le nombre du haut.']},
                {'type': 'piege', 'erreur': '2 parts sont coloriées, 3 sont blanches. On écrit 2/3.', 'correction': 'Le nombre du bas compte toutes les parts. Ici, 2/5.'},
                {'type': 'visuel', 'visuel': barres((5, 2)), 'legende': '2 parts coloriées sur 5 parts en tout : 2/5.'},
                bq('Comment lit-on 3/4 ?', ['trois quarts', 'trois quatre', 'quatre tiers'], '4 parts : des quarts. On en prend 3.'),
            ]),
        ],
        a_toi=[
            q('Une pizza est coupée en 6 parts égales. Tom en mange 5. Quelle fraction ?', ['5/6', '6/5', '1/6'], '6 parts en tout. Tom en prend 5 : 5/6.'),
            q('Que dit le nombre du bas d’une fraction ?', ['En combien de parts on coupe', 'Combien de parts on prend', 'Combien il reste'], 'C’est le dénominateur : le nombre de parts égales.'),
            q('Comment écrit-on un demi ?', ['1/2', '2/1', '1/3'], 'Une part sur deux parts égales : 1/2.'),
        ],
        sources=[src(BO, 'Les fractions rencontrées au CE1 ont un dénominateur égal à 2, 3, 4, 5, 6, 8 ou 10.', 'Dénominateurs utilisés au CE1', 12),
                 src(LIVRET, 'les fractions rencontrées sont les fractions d’un tout', 'Fractions d’un tout, en parts égales'),
                 src(FRAC, 'le dénominateur indique le nombre total de parts égales', 'Sens du dénominateur et du numérateur')]),

    'MA-C2-CE1-FRAC-03': dict(duree=7, essentiel=
        'Avec le même dénominateur, on ajoute ou on retire seulement les numérateurs.\n'
        '1/5 + 2/5 = 3/5. 2/3 − 1/3 = 1/3. Le dénominateur ne change pas.',
        parties=[
            ('Ajouter des parts', [
                {'type': 'observe', 'consigne': 'Léa mange 1/5 du gâteau. Puis elle mange 2/5.', 'exemples': [
                    'Les parts ont la même taille : des cinquièmes.', 'Elle mange 1 part, puis 2 parts.', 'En tout, 3 parts : 3/5.']},
                {'type': 'visuel', 'visuel': barres((5, 1), (5, 2), (5, 3)), 'legende': '1/5 plus 2/5, c’est 3/5.'},
                {'type': 'explique', 'texte': 'On ajoute des cinquièmes à des cinquièmes. On compte les parts : **1 + 2 = 3**. Les parts restent des cinquièmes.'},
                {'type': 'piege', 'erreur': 'On écrit 1/5 + 2/5 = 3/10.', 'correction': 'Le gâteau est toujours coupé en 5. On garde 5 en bas : 3/5.'},
                bq('Combien font 2/8 + 3/8 ?', ['5/8', '5/16', '6/8'], '2 huitièmes plus 3 huitièmes : 5 huitièmes.'),
            ]),
            ('Retirer des parts', [
                {'type': 'methode', 'titre': 'Pour ajouter ou retirer', 'etapes': [
                    'Vérifie que les dénominateurs sont pareils.',
                    'Ajoute ou retire les numérateurs.',
                    'Garde le même dénominateur.']},
                {'type': 'exemple-resolu', 'enonce': 'Il reste 4/6 d’une tarte. On en mange 1/6. Combien reste-t-il ?', 'etapes': [
                    'Les parts sont des sixièmes.', 'On retire 1 part à 4 parts : 4 − 1 = 3.'],
                 'conclusion': 'Il reste 3/6 de la tarte.'},
                bq('Combien font 7/10 − 2/10 ?', ['5/10', '5/0', '9/10'], '7 dixièmes moins 2 dixièmes : 5 dixièmes.'),
            ]),
        ],
        a_toi=[
            q('Combien font 1/4 + 2/4 ?', ['3/4', '3/8', '2/4'], '1 quart plus 2 quarts : 3 quarts.'),
            q('Combien font 5/6 − 3/6 ?', ['2/6', '2/0', '8/6'], '5 sixièmes moins 3 sixièmes : 2 sixièmes.'),
            q('Marc mange 1/10 d’un gâteau. Ange en mange 3/10. Ensemble ?', ['4/10', '4/20', '3/10'], '1 dixième plus 3 dixièmes : 4 dixièmes.'),
        ],
        sources=[src(BO, 'Additionner et soustraire des fractions de même dénominateur.', 'Ce que l’élève de CE1 doit savoir faire', 13),
                 src(FRAC, 'L’élève sait additionner et soustraire des fractions de même dénominateur', 'Ajouter et retirer en gardant le dénominateur')]),

    'MA-C2-CE1-OPE-01': dict(duree=6, essentiel=
        'Un nombre **pair** se partage en 2 sans reste. Il se termine par 0, 2, 4, 6 ou 8.\n'
        'Un nombre **impair** se termine par 1, 3, 5, 7 ou 9.',
        parties=[
            ('Faire des paires', [
                {'type': 'observe', 'consigne': 'On range 7 jetons par paires.', 'exemples': [
                    'On fait 3 paires.', 'Il reste 1 jeton tout seul.', '7 est donc impair.']},
                {'type': 'visuel', 'visuel': {'type': 'grille', 'lignes': 4, 'colonnes': 2, 'coloriees': 7}, 'legende': '7 jetons rangés par 2 : il en reste un seul.'},
                {'type': 'explique', 'texte': 'Avec 8 jetons, on fait 4 paires. Il ne reste rien. 8 est **pair**.'},
                bq('Avec 10 jetons, reste-t-il un jeton seul ?', ['Non, 10 est pair', 'Oui, 10 est impair', 'Oui, il en reste 2'], 'On fait 5 paires. Il ne reste rien.'),
            ]),
            ('Regarder le dernier chiffre', [
                {'type': 'methode', 'titre': 'Pour savoir si un nombre est pair', 'etapes': [
                    'Regarde seulement le chiffre des unités.',
                    'S’il vaut 0, 2, 4, 6 ou 8, le nombre est pair.',
                    'Sinon, il est impair.']},
                {'type': 'piege', 'erreur': 'On croit que 57 est pair car 5 est grand.', 'correction': 'Seul le dernier chiffre compte. 57 finit par 7 : il est impair.'},
                {'type': 'exemple-resolu', 'enonce': 'Donne les nombres pairs entre 767 et 778.', 'etapes': [
                    'Cherche les nombres qui finissent par 0, 2, 4, 6 ou 8.'],
                 'conclusion': '768, 770, 772, 774, 776.'},
            ]),
        ],
        a_toi=[
            q('Quel nombre est pair ?', ['348', '351', '765'], '348 finit par 8 : il est pair.'),
            q('Quel nombre est impair ?', ['129', '200', '416'], '129 finit par 9 : il est impair.'),
            q('Quel est le nombre pair juste après 45 ?', ['46', '47', '44'], '46 finit par 6. Il vient juste après 45.'),
        ],
        sources=[src(BO, 'L’élève sait dire si un nombre est pair ou impair.', 'Ce que l’élève de CE1 doit savoir faire', 14),
                 src(BO, 'L’élève sait donner tous les nombres pairs compris en 767 et 778.', 'Exemple des nombres pairs entre 767 et 778')]),

    'MA-C2-CE1-CALC-01': dict(duree=7, essentiel=
        'Les tables d’addition se savent par cœur, dans les deux sens.\n'
        '8 + 5 = 13. Donc 8 + … = 13 se complète avec 5.',
        parties=[
            ('Passer par 10', [
                {'type': 'observe', 'consigne': 'Calcule 8 + 5 en deux sauts.', 'exemples': [
                    '8 + 2 = 10.', 'Il reste 3 à ajouter.', '10 + 3 = 13.']},
                {'type': 'visuel', 'visuel': {'type': 'droite', 'min': 6, 'max': 15, 'depart': 8, 'saut': 5}, 'legende': 'De 8, on avance de 5 : on arrive à 13.'},
                {'type': 'explique', 'texte': 'Passer par **10** aide à trouver vite. Ensuite, le résultat doit venir sans compter.'},
                bq('Combien font 7 + 6 ?', ['13', '12', '14'], '7 + 3 = 10. Puis 10 + 3 = 13.'),
            ]),
            ('Dans les deux sens', [
                {'type': 'methode', 'titre': 'Pour compléter 4 + … = 12', 'etapes': [
                    'Cherche ce qu’il manque à 4 pour aller à 12.',
                    'Pense à la table : 4 + 8 = 12.',
                    'Écris 8.']},
                {'type': 'piege', 'erreur': 'On ajoute les deux nombres : 4 + 12 = 16.', 'correction': 'Le 12 est le total. On cherche ce qui manque : 8.'},
                bq('Complète : 10 = 7 + …', ['3', '17', '4'], '7 + 3 = 10.'),
            ]),
        ],
        a_toi=[
            q('Combien font 9 + 4 ?', ['13', '14', '12'], '9 + 1 = 10. Puis 10 + 3 = 13.'),
            q('Complète : 6 + … = 11', ['5', '17', '6'], '6 + 5 = 11.'),
            q('Complète : … + 7 = 15', ['8', '22', '7'], '8 + 7 = 15.'),
        ],
        sources=[src(BO, 'L’élève sait compléter des « égalités à trou » du type : 4 + … = 12 ; 5 + 3 = … ; 10 = 7 + …', 'Ce que l’élève de CE1 doit savoir faire', 14)]),

    'MA-C2-CE1-CALC-02': dict(duree=8, essentiel=
        '4 × 3, c’est 4 fois 3. 4 × 3 = 3 × 4 = 12.\n'
        'Une table connue aide à trouver une autre table. 7 × 7 = 6 × 7 + 7.',
        parties=[
            ('Plusieurs fois le même nombre', [
                {'type': 'observe', 'consigne': 'Un potager a 4 rangs de 3 salades.', 'exemples': [
                    '3 + 3 + 3 + 3 = 12.', 'On écrit 4 × 3 = 12.', 'On lit : 4 fois 3.']},
                {'type': 'visuel', 'visuel': {'type': 'grille', 'lignes': 4, 'colonnes': 3, 'coloriees': 12}, 'legende': '4 rangs de 3 : 12 salades.'},
                {'type': 'explique', 'texte': 'On peut aussi compter 3 colonnes de 4. **3 × 4 = 4 × 3**. Le résultat ne change pas.'},
                bq('Combien font 5 × 2 ?', ['10', '7', '52'], '2 + 2 + 2 + 2 + 2 = 10.'),
            ]),
            ('Retrouver un résultat', [
                {'type': 'methode', 'titre': 'Pour retrouver 7 × 7', 'etapes': [
                    'Pars d’un résultat connu : 6 × 7 = 42.',
                    'Ajoute encore un 7 : 42 + 7.',
                    'Tu trouves 7 × 7 = 49.']},
                {'type': 'piege', 'erreur': 'On ajoute au lieu de multiplier : 4 × 3 = 7.', 'correction': '4 × 3, c’est 4 fois 3, pas 4 plus 3. Cela fait 12.'},
                bq('Complète : 4 × … = 12', ['3', '8', '16'], '4 × 3 = 12.'),
            ]),
        ],
        a_toi=[
            q('Combien font 3 × 7 ?', ['21', '10', '24'], '3 × 7 = 7 × 3 = 21.'),
            q('Complète : … × 5 = 30', ['6', '25', '35'], '6 × 5 = 30.'),
            q('Combien font 8 × 7 ?', ['56', '54', '15'], '7 × 7 = 49. Puis 49 + 7 = 56.'),
        ],
        sources=[src(BO, 'L’élève peut ainsi compléter des « égalités à trou » du type : 4 × … = 12 ; 5 × 3 = … ;', 'Ce que l’élève de CE1 doit savoir faire', 14),
                 src(LIVRET, 'La construction de la table de 7 s’opère en prenant appui sur la commutativité', 'Retrouver une table avec une table connue')]),

    'MA-C2-CE1-CALC-03': dict(duree=7, essentiel=
        'Le **double** d’un nombre, c’est 2 fois ce nombre. Le double de 25 est 50.\n'
        'La **moitié**, c’est partager en 2 parts égales. La moitié de 70 est 35.',
        parties=[
            ('Le double', [
                {'type': 'observe', 'consigne': 'Le double, c’est le nombre ajouté à lui-même.', 'exemples': [
                    'Le double de 7 : 7 + 7 = 14.', 'Le double de 25 : 25 + 25 = 50.', 'Le double de 30 : 30 + 30 = 60.']},
                {'type': 'tableau', 'titre': 'Doubles à savoir', 'colonnes': ['Nombre', 'Double'], 'lignes': [
                    ['15', '30'], ['25', '50'], ['35', '70'], ['40', '80'], ['50', '100']]},
                bq('Quel est le double de 45 ?', ['90', '80', '47'], '45 + 45 = 90.'),
            ]),
            ('La moitié', [
                {'type': 'explique', 'texte': 'La moitié fait le chemin inverse. Le double de 35 est 70. Donc la **moitié** de 70 est 35.'},
                {'type': 'methode', 'titre': 'Pour trouver la moitié de 70', 'etapes': [
                    'Coupe 70 en 60 et 10.', 'La moitié de 60 est 30.', 'La moitié de 10 est 5.', '30 + 5 = 35.']},
                {'type': 'piege', 'erreur': 'On confond la moitié et le double. On trouve 80 pour 40.', 'correction': 'La moitié est plus petite. La moitié de 40 est 20.'},
                bq('Quelle est la moitié de 90 ?', ['45', '180', '40'], '45 + 45 = 90. La moitié de 90 est 45.'),
            ]),
            ('Compter par 25', [
                {'type': 'explique', 'texte': 'Les **multiples de 25** sont utiles. On compte par 25 : 25, 50, 75, 100.'},
                bq('Combien font 3 × 25 ?', ['75', '50', '100'], '25 + 25 + 25 = 75.'),
            ]),
        ],
        a_toi=[
            q('Quel est le double de 12 ?', ['24', '22', '14'], '12 + 12 = 24.'),
            q('Quelle est la moitié de 100 ?', ['50', '200', '25'], '50 + 50 = 100.'),
            q('Combien font 4 × 25 ?', ['100', '75', '125'], '25, 50, 75, 100.'),
        ],
        sources=[src(BO, 'les doubles des nombres de 1 à 15 ;', 'Ce que l’élève de CE1 doit savoir faire', 14),
                 src(BO, 'les moitiés des dizaines entières 40, 50, 60, 70, 80, 90 et 100 ;', 'Moitiés à connaitre'),
                 src(BO, 'L’élève connait les multiples de 25 suivants', 'Multiples de 25')]),

    'MA-C2-CE1-CALC-04': dict(duree=6, essentiel=
        'Pour ajouter des dizaines, change seulement le chiffre des dizaines. 234 + 60 = 294.\n'
        'Multiplier par 10, c’est changer les unités en dizaines. 72 × 10 = 720.',
        parties=[
            ('Ajouter ou retirer des dizaines', [
                {'type': 'observe', 'consigne': 'Calcule 234 + 60.', 'exemples': [
                    '60, c’est 6 dizaines.', '234 a 3 dizaines. 3 + 6 = 9 dizaines.', 'Les centaines et les unités ne bougent pas : 294.']},
                {'type': 'methode', 'titre': 'Pour ajouter des dizaines ou des centaines', 'etapes': [
                    'Trouve le chiffre qui change : dizaines ou centaines.',
                    'Ajoute ou retire sur ce chiffre seulement.',
                    'Recopie les autres chiffres.']},
                bq('Combien font 458 − 30 ?', ['428', '455', '158'], '5 dizaines moins 3 dizaines : 2 dizaines. 428.'),
                bq('Combien font 315 + 200 ?', ['515', '335', '317'], '3 centaines plus 2 centaines : 5 centaines. 515.'),
            ]),
            ('Multiplier par 10', [
                {'type': 'explique', 'texte': '10 fois une unité, c’est une dizaine. Chaque chiffre avance d’un rang. On écrit un **0** à droite.'},
                {'type': 'exemple-resolu', 'enonce': 'Calcule 72 × 10.', 'etapes': [
                    '72, c’est 7 dizaines et 2 unités.', 'Fois 10 : 7 centaines et 2 dizaines.'],
                 'conclusion': '72 × 10 = 720.'},
                {'type': 'piege', 'erreur': 'On écrit 72 × 10 = 82.', 'correction': 'On a ajouté 10 au lieu de multiplier. 72 × 10 = 720.'},
            ]),
        ],
        a_toi=[
            q('Combien font 624 + 50 ?', ['674', '629', '1124'], '2 dizaines plus 5 dizaines : 7 dizaines. 674.'),
            q('Combien font 36 × 10 ?', ['360', '46', '306'], '36 × 10 = 360.'),
            q('Combien font 780 − 400 ?', ['380', '740', '776'], '7 centaines moins 4 centaines : 3 centaines. 380.'),
        ],
        sources=[src(BO, 'L’élève s’appuie sur la numération pour effectuer rapidement et mentalement des', 'Ce que l’élève de CE1 doit savoir faire', 15)]),

    'MA-C2-CE1-CALC-05': dict(duree=8, essentiel=
        'Pour ajouter 19, ajoute 20 puis enlève 1.\nPour ajouter 29, ajoute 30 puis enlève 1.\n'
        'Le nombre finit par 0 ou 1 ? Ajoute directement : 40 + 19 = 59.',
        parties=[
            ('Ajouter 9, 19 ou 29', [
                {'type': 'observe', 'consigne': 'Calcule 58 + 19 en deux étapes.', 'exemples': [
                    '19, c’est 20 moins 1.', '58 + 20 = 78.', '78 − 1 = 77.']},
                {'type': 'visuel', 'visuel': {'type': 'droite', 'min': 56, 'max': 80, 'depart': 58, 'saut': 19}, 'legende': 'De 58, on avance de 19 : on arrive à 77.'},
                {'type': 'methode', 'titre': 'Pour ajouter 19', 'etapes': [
                    'Ajoute 2 dizaines.', 'Enlève 1 unité.', 'Pour 9, ajoute 10 et enlève 1. Pour 29, ajoute 30 et enlève 1.']},
                bq('Combien font 47 + 19 ?', ['66', '67', '76'], '47 + 20 = 67. Puis 67 − 1 = 66.'),
            ]),
            ('Quand ce n’est pas utile', [
                {'type': 'explique', 'texte': 'Avec 40 + 19, il n’y a pas de retenue. On ajoute directement : **59**.'},
                {'type': 'piege', 'erreur': 'On oublie d’enlever 1 : 58 + 19 = 78.', 'correction': 'On a ajouté 20, soit 1 de trop. On enlève 1 : 77.'},
                bq('Combien font 61 + 29 ?', ['90', '91', '80'], '61 + 30 = 91. Puis 91 − 1 = 90.'),
            ]),
        ],
        a_toi=[
            q('Combien font 35 + 9 ?', ['44', '45', '34'], '35 + 10 = 45. Puis 45 − 1 = 44.'),
            q('Combien font 126 + 29 ?', ['155', '156', '145'], '126 + 30 = 156. Puis 156 − 1 = 155.'),
            q('Combien font 80 + 19 ?', ['99', '98', '100'], '80 finit par 0 : on ajoute directement. 99.'),
        ],
        sources=[src(BO, 'L’élève sait ajouter 9, 19 ou 29 à un nombre en ajoutant 10, 20 ou 30, puis en', 'Ce que l’élève de CE1 doit savoir faire', 15),
                 src(LIVRET, 'pour ajouter 19 à 58, je peux ajouter 20 et soustraire', 'Exemple 58 + 19'),
                 src(LIVRET, 'lorsque le chiffre des unités du nombre initial est 0 ou 1', 'Quand la procédure n’est pas utile')]),

    'MA-C2-CE1-PB-01': dict(duree=9, essentiel=
        'Dans un problème, cherche le **tout** et les **parties**.\n'
        'Si tu cherches le tout, ajoute les parties. Si tu cherches une partie, retire l’autre partie au tout.',
        parties=[
            ('Le tout et les parties', [
                {'type': 'observe', 'consigne': 'Lis le problème.', 'exemples': [
                    'J’ai 227 billes en tout.', '113 billes sont dans le coffre vert.', 'Les autres sont dans le coffre rouge.', 'Combien de billes dans le coffre rouge ?']},
                {'type': 'tableau', 'titre': 'Le schéma en barres', 'colonnes': ['Tout', 'Partie 1', 'Partie 2'], 'lignes': [['227 billes', '113 billes', '?']]},
                {'type': 'explique', 'texte': 'On cherche une **partie**. On retire l’autre partie au tout : 227 − 113 = 114.'},
                bq('Combien de billes dans le coffre rouge ?', ['114', '340', '113'], '227 − 113 = 114. Vérifie : 113 + 114 = 227.'),
            ]),
            ('Choisir le calcul', [
                {'type': 'methode', 'titre': 'Pour résoudre un problème', 'etapes': [
                    'Lis et trouve ce qu’on cherche.',
                    'Dessine le tout et les parties.',
                    'Choisis : ajouter ou retirer.',
                    'Calcule, puis fais une phrase réponse.']},
                {'type': 'exemple-resolu', 'enonce': 'Lina a 35 cartes. Elle en gagne 18. Combien en a-t-elle ?', 'etapes': [
                    'Les parties : 35 et 18.', 'On cherche le tout : on ajoute.', '35 + 18 = 53.'],
                 'conclusion': 'Lina a 53 cartes.'},
                {'type': 'piege', 'erreur': 'On ajoute tous les nombres de l’énoncé.', 'correction': 'Regarde ce qu’on cherche. Pour une partie, on retire.'},
            ]),
        ],
        a_toi=[
            q('Un bus a 42 places. 27 sont prises. Combien de places libres ?', ['15', '69', '25'], 'On cherche une partie : 42 − 27 = 15.'),
            q('Tom a 64 billes. Il en perd 20. Combien lui en reste-t-il ?', ['44', '84', '40'], 'On retire : 64 − 20 = 44.'),
            q('Une classe a 13 filles et 14 garçons. Combien d’élèves ?', ['27', '1', '17'], 'On cherche le tout : 13 + 14 = 27.'),
        ],
        sources=[src(BO, 'Les élèves doivent traiter au moins dix problèmes par semaine', 'Ce que l’élève de CE1 doit savoir faire', 17),
                 src(BO, 'sur un schéma en barre pour modéliser', 'Schéma en barres'),
                 src(LIVRET, 'représenter à l’aide d’un schéma en barres', 'Problèmes parties-tout et schéma en barres')]),

    'MA-C2-CE1-PB-02': dict(duree=7, essentiel=
        '« 75 de plus » ou « 75 de moins » : c’est un problème de comparaison.\n'
        'Pour trouver le plus grand, ajoute l’écart. Pour trouver le plus petit, retire l’écart.',
        parties=[
            ('De plus, de moins', [
                {'type': 'observe', 'consigne': 'Lis le problème.', 'exemples': [
                    'Léo a 188 billes.', 'Lucie en a 75 de plus que Léo.', 'Combien de billes a Lucie ?']},
                {'type': 'explique', 'texte': 'Lucie a **plus** que Léo. On ajoute l’écart : 188 + 75 = 263.'},
                bq('Combien de billes a Lucie ?', ['263', '113', '188'], '188 + 75 = 263.'),
            ]),
            ('Trouver l’écart', [
                {'type': 'methode', 'titre': 'Pour un problème de comparaison', 'etapes': [
                    'Repère les deux personnes.',
                    'Repère l’écart : de plus ou de moins.',
                    'Qui a le plus ? Ajoute l’écart à l’autre.',
                    'Qui a le moins ? Retire l’écart à l’autre.']},
                {'type': 'piege', 'erreur': '« De moins » fait toujours retirer.', 'correction': '« Paul a 12 de moins que Zoé, il a 30 ». Zoé a plus : 30 + 12.'},
                {'type': 'exemple-resolu', 'enonce': 'Sam a 54 €. Mia a 39 €. Combien Sam a-t-il de plus ?', 'etapes': [
                    'On cherche l’écart.', '54 − 39 = 15.'],
                 'conclusion': 'Sam a 15 € de plus que Mia.'},
            ]),
        ],
        a_toi=[
            q('Ana a 120 images. Noé en a 30 de moins. Combien en a Noé ?', ['90', '150', '30'], 'Noé a moins : 120 − 30 = 90.'),
            q('Une tour mesure 45 m. Une autre mesure 20 m de plus. Combien ?', ['65 m', '25 m', '20 m'], '45 + 20 = 65.'),
            q('Lou a 8 ans. Sa sœur a 13 ans. Combien d’années d’écart ?', ['5', '21', '13'], '13 − 8 = 5.'),
        ],
        sources=[src(BO, 'L’élève sait résoudre des problèmes additifs de comparaison lorsque deux des trois', 'Ce que l’élève de CE1 doit savoir faire', 17)]),

    'MA-C2-CE1-PB-03': dict(duree=8, essentiel=
        'Pour trouver le tout, multiplie.\n8 paquets de 7, c’est 8 × 7 = 56.\n'
        'Pour partager, cherche dans la table : 56 = 8 × 7.',
        parties=[
            ('Chercher le tout', [
                {'type': 'observe', 'consigne': 'Il y a 8 paquets de 7 biscuits.', 'exemples': [
                    'Chaque paquet a 7 biscuits.', 'On a 8 fois 7 biscuits.', '8 × 7 = 56.']},
                {'type': 'visuel', 'visuel': {'type': 'grille', 'lignes': 8, 'colonnes': 7, 'coloriees': 56}, 'legende': '8 rangs de 7 : 56 biscuits.'},
                bq('5 boites de 6 œufs. Combien d’œufs ?', ['30', '11', '36'], '5 × 6 = 30.'),
            ]),
            ('Chercher le nombre de parts ou une part', [
                {'type': 'methode', 'titre': 'Pour un partage', 'etapes': [
                    'Repère le tout : 56 biscuits.',
                    'Repère ce qu’on connait : 7 par paquet.',
                    'Cherche dans la table : … × 7 = 56.',
                    'Réponds : 8 paquets.']},
                {'type': 'exemple-resolu', 'enonce': 'On partage 24 bonbons entre 4 enfants. Combien chacun ?', 'etapes': [
                    'Chaque enfant a la même part.', '4 × … = 24. Dans la table de 4 : 4 × 6 = 24.'],
                 'conclusion': 'Chaque enfant a 6 bonbons.'},
                {'type': 'piege', 'erreur': 'On ajoute 24 et 4.', 'correction': 'C’est un partage en parts égales. On cherche 4 × … = 24.'},
            ]),
        ],
        a_toi=[
            q('3 rangées de 9 chaises. Combien de chaises ?', ['27', '12', '39'], '3 × 9 = 27.'),
            q('20 crayons en paquets de 5. Combien de paquets ?', ['4', '25', '15'], '4 × 5 = 20.'),
            q('On partage 18 billes entre 3 amis. Combien chacun ?', ['6', '15', '21'], '3 × 6 = 18.'),
        ],
        sources=[src(BO, 'L’élève sait résoudre des problèmes multiplicatifs consistant à rechercher la valeur du', 'Ce que l’élève de CE1 doit savoir faire', 18)]),
}


for competence, c in COURS.items():
    cours = {
        'competence': competence, 'duree': c['duree'], 'essentiel': c['essentiel'],
        'parties': [{'titre': t, 'blocs': b} for t, b in c['parties']],
        'a_toi': c['a_toi'], 'sources': c['sources'],
        'statut': 'brouillon', 'auteur': 'ia', 'relu_par': None,
    }
    chemin = os.path.join(RACINE, 'content', 'cours', f'{competence}.json')
    with open(chemin, 'w', encoding='utf-8') as f:
        json.dump(cours, f, ensure_ascii=False, indent=2)
        f.write('\n')
print(len(COURS), 'cours écrits')
