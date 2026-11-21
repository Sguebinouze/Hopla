"""Lot de cours : maths 4e (programme 2020, en vigueur en 4e jusqu'en 2026-2027). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-4e-maths.py
    python3 scripts/cours/pages.py content/cours/MA-C4-4E-*.json

Cycle 4 : phrases de 25 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
Pas de bloc vocabulaire : le glossaire n'a pas encore de définitions de cycle 4.
"""
from commun import bq, ecrire, q, source_referentiel as ref


def figure(largeur, hauteur, *elements, quadrillage=True):
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
    'MA-C4-4E-REL-51': dict(duree=7, essentiel=
        'Le produit ou le quotient de deux nombres de même signe est positif ; de signes contraires, il est négatif.\n'
        '(−3) × (+4) = −12 ; (−20) ÷ (−5) = 4.\n'
        'Pour un produit de plusieurs facteurs, on compte les facteurs négatifs : un nombre pair donne un résultat positif.',
        parties=[
            ('La règle des signes', [
                {'type': 'tableau', 'titre': 'Signe d’un produit ou d’un quotient', 'colonnes': ['Signes des deux nombres', 'Signe du résultat', 'Exemple'], 'lignes': [
                    ['+ et +', '+', '(+3) × (+4) = 12'], ['− et −', '+', '(−3) × (−4) = 12'], ['+ et −', '−', '(+3) × (−4) = −12'], ['− et +', '−', '(−20) ÷ (+5) = −4']]},
                bq('(−6) × (−7) = ?', ['42', '−42', '−13'], 'Deux facteurs négatifs : le produit est positif.'),
            ]),
            ('Plusieurs facteurs', [
                {'type': 'exemple-resolu', 'enonce': 'Quel est le signe de (−2) × (+5) × (−1) × (−3) ?', 'etapes': [
                    'On compte les facteurs négatifs : 3.', '3 est impair : le produit est négatif.', '2 × 5 × 1 × 3 = 30.'],
                 'conclusion': 'Le produit vaut −30.'},
                {'type': 'piege', 'erreur': 'On applique la règle des signes à l’addition : (−3) + (−4) = 7.', 'correction': 'La règle des signes vaut pour × et ÷ seulement. (−3) + (−4) = −7.'},
            ]),
        ],
        a_toi=[
            q('(−36) ÷ (+4) = ?', ['−9', '9', '−32'], 'Signes contraires : quotient négatif.'),
            q('(−1) × (−1) × (−1) × (−1) = ?', ['1', '−1', '−4'], 'Quatre facteurs négatifs : nombre pair.'),
            q('(−2,5) × 4 = ?', ['−10', '10', '1,5'], 'Signes contraires.'),
        ],
        sources=[ref('MA-C4-4E-REL-51', 'Multiplier, diviser des relatifs')]),

    'MA-C4-4E-FRAC-51': dict(duree=6, essentiel=
        'Simplifier une fraction, c’est diviser son numérateur et son dénominateur par un même nombre.\n'
        '18/24 = 9/12 = 3/4 : on a divisé par 2, puis par 3.\n'
        'Une fraction est irréductible quand on ne peut plus la simplifier.',
        parties=[
            ('Simplifier', [
                {'type': 'methode', 'titre': 'Pour simplifier 45/60', 'etapes': [
                    '45 et 60 sont divisibles par 5 : 45/60 = 9/12.', '9 et 12 sont divisibles par 3 : 9/12 = 3/4.', '3 et 4 n’ont plus de diviseur commun autre que 1.']},
                bq('Simplifie 14/35.', ['2/5', '7/5', '14/5'], 'On divise par 7.'),
            ]),
            ('Utiliser les critères de divisibilité', [
                {'type': 'explique', 'texte': 'Pour 126/84, la somme des chiffres de chacun est divisible par 3. On peut donc diviser par 3 : 42/28, puis par 14 : 3/2.'},
                {'type': 'piege', 'erreur': 'On soustrait le même nombre en haut et en bas : 18/24 = 15/21.', 'correction': 'On divise par le même nombre, on ne soustrait pas. 15/21 ne vaut pas 18/24.'},
            ]),
        ],
        a_toi=[
            q('Simplifie 30/45.', ['2/3', '6/9', '3/5'], 'On divise par 15 ; 6/9 n’est pas irréductible.'),
            q('Quelle fraction est irréductible ?', ['7/9', '6/9', '10/15'], '7 et 9 n’ont que 1 comme diviseur commun.'),
            q('Simplifie 48/64.', ['3/4', '6/8', '4/3'], 'On divise par 16.'),
        ],
        sources=[ref('MA-C4-4E-FRAC-51', 'Simplifier une fraction')]),

    'MA-C4-4E-FRAC-52': dict(duree=6, essentiel=
        'Pour multiplier deux fractions, on multiplie les numérateurs entre eux et les dénominateurs entre eux.\n'
        '2/3 × 5/7 = 10/21.\n'
        'Prendre une fraction d’un nombre, c’est multiplier : 3/4 de 20 = 3/4 × 20 = 15.',
        parties=[
            ('Multiplier', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 4/9 × 3/8 et simplifie.', 'etapes': [
                    '4/9 × 3/8 = (4 × 3)/(9 × 8) = 12/72.', '12/72 = 1/6.'],
                 'conclusion': '4/9 × 3/8 = 1/6.'},
                bq('3/5 × 2/7 = ?', ['6/35', '5/12', '6/12'], 'Numérateurs entre eux, dénominateurs entre eux.'),
            ]),
            ('Simplifier avant de calculer', [
                {'type': 'explique', 'texte': 'Dans 4/9 × 3/8, on peut simplifier 4 avec 8 et 3 avec 9 avant de multiplier : 1/3 × 1/2 = 1/6.'},
                {'type': 'piege', 'erreur': 'On réduit au même dénominateur avant de multiplier.', 'correction': 'C’est utile pour additionner, pas pour multiplier : on multiplie directement.'},
            ]),
        ],
        a_toi=[
            q('2/3 de 27 = ?', ['18', '9', '81'], '27 ÷ 3 × 2 = 18.'),
            q('5/6 × 3/10 = ?', ['1/4', '15/16', '8/60'], '15/60 = 1/4.'),
            q('7 × 2/7 = ?', ['2', '14/49', '9/7'], '14/7 = 2.'),
        ],
        sources=[ref('MA-C4-4E-FRAC-52', 'Multiplier des fractions')]),

    'MA-C4-4E-FRAC-53': dict(duree=7, essentiel=
        'L’inverse d’un nombre non nul a est le nombre 1/a : leur produit vaut 1. L’inverse de 2/5 est 5/2.\n'
        'Diviser par une fraction, c’est multiplier par son inverse.\n'
        '3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8.',
        parties=[
            ('L’inverse', [
                {'type': 'tableau', 'titre': 'Des inverses', 'colonnes': ['Nombre', 'Inverse', 'Vérification'], 'lignes': [
                    ['4', '1/4', '4 × 1/4 = 1'], ['2/5', '5/2', '2/5 × 5/2 = 1'], ['0,5', '2', '0,5 × 2 = 1'], ['0', 'pas d’inverse', 'aucun nombre × 0 ne donne 1']]},
                bq('L’inverse de 7/3 est :', ['3/7', '−7/3', '7/3'], '7/3 × 3/7 = 1.'),
            ]),
            ('Diviser par une fraction', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 2/3 ÷ 4/9.', 'etapes': [
                    'On multiplie par l’inverse de 4/9 : 2/3 × 9/4.', '= 18/12 = 3/2.'],
                 'conclusion': '2/3 ÷ 4/9 = 3/2.'},
                {'type': 'piege', 'erreur': 'On confond inverse et opposé : l’inverse de 5 serait −5.', 'correction': 'L’opposé de 5 est −5 : leur somme vaut 0. L’inverse est 1/5 : leur produit vaut 1.'},
            ]),
        ],
        a_toi=[
            q('5 ÷ 1/2 = ?', ['10', '2,5', '5/2'], '5 × 2 = 10.'),
            q('L’inverse de 0,25 est :', ['4', '−0,25', '0,75'], '0,25 × 4 = 1.'),
            q('3/5 ÷ 3/10 = ?', ['2', '9/50', '1/2'], '3/5 × 10/3 = 30/15 = 2.'),
        ],
        sources=[ref('MA-C4-4E-FRAC-53', 'Inverse, diviser des fractions')]),

    'MA-C4-4E-DIV-51': dict(duree=7, essentiel=
        'Un nombre premier a exactement deux diviseurs : 1 et lui-même. 2, 3, 5, 7, 11, 13 sont premiers ; 1 ne l’est pas.\n'
        'Tout entier supérieur à 1 se décompose en produit de facteurs premiers.\n'
        '60 = 2 × 2 × 3 × 5 = 2² × 3 × 5.',
        parties=[
            ('Décomposer', [
                {'type': 'methode', 'titre': 'Décomposer 84', 'etapes': [
                    'Divise par le plus petit nombre premier possible : 84 ÷ 2 = 42.', 'Recommence : 42 ÷ 2 = 21.', '21 n’est pas pair : 21 ÷ 3 = 7.', '7 est premier : on s’arrête. 84 = 2² × 3 × 7.']},
                bq('Décompose 90.', ['2 × 3² × 5', '2 × 45', '9 × 10'], '90 = 2 × 45 = 2 × 3 × 15 = 2 × 3 × 3 × 5.'),
            ]),
            ('Simplifier grâce aux facteurs premiers', [
                {'type': 'explique', 'texte': '84/126 = (2² × 3 × 7)/(2 × 3² × 7). On barre les facteurs communs 2, 3 et 7 : il reste 2/3.'},
                {'type': 'piege', 'erreur': 'On croit que 1 est un nombre premier.', 'correction': '1 n’a qu’un seul diviseur. Un nombre premier en a exactement deux.'},
            ]),
        ],
        a_toi=[
            q('Lequel est premier ?', ['29', '27', '33'], '27 = 3 × 9 et 33 = 3 × 11.'),
            q('La décomposition de 126 est :', ['2 × 3² × 7', '2 × 63', '6 × 21'], 'Seuls des facteurs premiers.'),
            q('Les nombres premiers inférieurs à 20 sont au nombre de :', ['8', '10', '6'], '2, 3, 5, 7, 11, 13, 17, 19.'),
        ],
        sources=[ref('MA-C4-4E-DIV-51', 'Décomposer en facteurs premiers')]),

    'MA-C4-4E-RAC-51': dict(duree=6, essentiel=
        'La racine carrée d’un nombre positif a est le nombre positif dont le carré vaut a : √81 = 9, car 9² = 81.\n'
        'Les carrés parfaits de 1 à 144 ont une racine entière.\n'
        'Sinon, on encadre : √50 est compris entre 7 et 8, car 49 < 50 < 64.',
        parties=[
            ('Carrés parfaits', [
                {'type': 'tableau', 'titre': 'Racines à connaitre', 'colonnes': ['a', '1 ; 4 ; 9 ; 16', '25 ; 36 ; 49 ; 64', '81 ; 100 ; 121 ; 144'], 'lignes': [
                    ['√a', '1 ; 2 ; 3 ; 4', '5 ; 6 ; 7 ; 8', '9 ; 10 ; 11 ; 12']]},
                bq('√121 = ?', ['11', '60,5', '12'], '11² = 121.'),
            ]),
            ('Encadrer', [
                {'type': 'exemple-resolu', 'enonce': 'Entre quels entiers consécutifs se trouve √30 ?', 'etapes': [
                    'Les carrés autour de 30 sont 25 et 36.', '25 < 30 < 36, donc 5 < √30 < 6.'],
                 'conclusion': '√30 est compris entre 5 et 6.'},
                {'type': 'piege', 'erreur': 'On croit que √50 = 25, la moitié de 50.', 'correction': 'La racine carrée n’est pas la moitié : 25² = 625. √50 ≈ 7,07.'},
            ]),
        ],
        a_toi=[
            q('√144 = ?', ['12', '72', '14'], '12 × 12 = 144.'),
            q('√70 est compris entre :', ['8 et 9', '7 et 8', '35 et 36'], '64 < 70 < 81.'),
            q('Un carré a une aire de 49 cm². Son côté mesure :', ['7 cm', '24,5 cm', '12,25 cm'], '√49 = 7.'),
        ],
        sources=[ref('MA-C4-4E-RAC-51', 'Racine carrée')]),

    'MA-C4-4E-PUIS-51': dict(duree=6, essentiel=
        '10ⁿ, avec n positif, s’écrit 1 suivi de n zéros : 10⁴ = 10 000.\n'
        '10⁻ⁿ s’écrit 0, suivi de n − 1 zéros, puis 1 : 10⁻³ = 0,001. Par convention, 10⁰ = 1.\n'
        'Les préfixes indiquent des puissances de 10 : kilo = 10³, milli = 10⁻³.',
        parties=[
            ('Écriture décimale', [
                {'type': 'tableau', 'titre': 'Puissances de 10', 'colonnes': ['Puissance', 'Écriture décimale'], 'lignes': [
                    ['10⁶', '1 000 000'], ['10²', '100'], ['10⁰', '1'], ['10⁻²', '0,01'], ['10⁻⁶', '0,000 001']]},
                bq('10⁻⁴ = ?', ['0,000 1', '−10 000', '0,000 01'], 'Le 1 est au 4e rang après la virgule.'),
            ]),
            ('Les préfixes', [
                {'type': 'tableau', 'titre': 'De nano à giga', 'colonnes': ['Préfixe', 'Symbole', 'Puissance'], 'lignes': [
                    ['giga', 'G', '10⁹'], ['méga', 'M', '10⁶'], ['kilo', 'k', '10³'], ['milli', 'm', '10⁻³'], ['micro', 'µ', '10⁻⁶'], ['nano', 'n', '10⁻⁹']]},
                {'type': 'piege', 'erreur': 'On croit que 10⁻³ est un nombre négatif.', 'correction': '10⁻³ = 0,001 : c’est un nombre positif, plus petit que 1.'},
            ]),
        ],
        a_toi=[
            q('1 km = ?', ['10³ m', '10⁻³ m', '10² m'], 'Kilo signifie 10³.'),
            q('1 mm = ?', ['10⁻³ m', '10³ m', '10⁻² m'], 'Milli signifie 10⁻³.'),
            q('Un gigaoctet vaut :', ['10⁹ octets', '10⁶ octets', '10³ octets'], 'Giga signifie 10⁹.'),
        ],
        sources=[ref('MA-C4-4E-PUIS-51', 'Puissances de 10 et préfixes')]),

    'MA-C4-4E-PUIS-52': dict(duree=6, essentiel=
        'aⁿ désigne le produit de n facteurs égaux à a : 3⁴ = 3 × 3 × 3 × 3 = 81.\n'
        'Pour multiplier deux puissances d’un même nombre, on additionne les exposants : 2³ × 2⁴ = 2⁷.\n'
        'Attention aux signes : (−2)⁴ = 16, mais −2⁴ = −16.',
        parties=[
            ('Calculer', [
                {'type': 'tableau', 'titre': 'Des puissances', 'colonnes': ['Expression', 'Produit', 'Valeur'], 'lignes': [
                    ['3⁴', '3 × 3 × 3 × 3', '81'], ['(−2)³', '(−2) × (−2) × (−2)', '−8'], ['(−2)⁴', '(−2) × (−2) × (−2) × (−2)', '16'], ['−2⁴', '−(2 × 2 × 2 × 2)', '−16']]},
                bq('5³ = ?', ['125', '15', '25'], '5 × 5 × 5.'),
            ]),
            ('Produit de puissances', [
                {'type': 'explique', 'texte': '2³ × 2⁴ = (2 × 2 × 2) × (2 × 2 × 2 × 2) : sept facteurs 2, donc 2⁷ = 128.'},
                {'type': 'piege', 'erreur': 'On multiplie les exposants : 2³ × 2⁴ = 2¹².', 'correction': 'On compte les facteurs : 3 + 4 = 7. 2³ × 2⁴ = 2⁷.'},
            ]),
        ],
        a_toi=[
            q('(−3)² = ?', ['9', '−9', '−6'], '(−3) × (−3) = 9.'),
            q('10² × 10³ = ?', ['10⁵', '10⁶', '100⁵'], '2 + 3 = 5.'),
            q('−3² = ?', ['−9', '9', '6'], 'Le carré porte sur 3 seulement.'),
        ],
        sources=[ref('MA-C4-4E-PUIS-52', 'Puissances d’un nombre')]),

    'MA-C4-4E-SCI-51': dict(duree=6, essentiel=
        'La notation scientifique d’un nombre est a × 10ⁿ, avec a compris entre 1 et 10 (10 exclu) et n entier.\n'
        '5 600 000 = 5,6 × 10⁶ ; 0,0042 = 4,2 × 10⁻³.\n'
        'Elle sert à écrire les très grands et les très petits nombres.',
        parties=[
            ('Écrire en notation scientifique', [
                {'type': 'methode', 'titre': 'Pour écrire 0,0042', 'etapes': [
                    'Place la virgule après le premier chiffre non nul : 4,2.', 'Compte de combien de rangs la virgule a bougé : 3.', 'Vers la droite : exposant négatif. 0,0042 = 4,2 × 10⁻³.']},
                bq('380 000 en notation scientifique :', ['3,8 × 10⁵', '38 × 10⁴', '3,8 × 10⁴'], 'La virgule recule de 5 rangs.'),
            ]),
            ('Des exemples en sciences', [
                {'type': 'tableau', 'titre': 'Ordres de grandeur', 'colonnes': ['Grandeur', 'Valeur'], 'lignes': [
                    ['distance Terre-Soleil', 'environ 1,5 × 10⁸ km'], ['vitesse de la lumière', 'environ 3 × 10⁵ km/s'], ['taille d’une cellule', 'environ 1 × 10⁻⁵ m']]},
                {'type': 'piege', 'erreur': 'On écrit 38 × 10⁴ et on dit que c’est la notation scientifique.', 'correction': 'Le nombre devant doit être entre 1 et 10 : 3,8 × 10⁵.'},
            ]),
        ],
        a_toi=[
            q('0,000 7 en notation scientifique :', ['7 × 10⁻⁴', '7 × 10⁴', '0,7 × 10⁻³'], 'La virgule avance de 4 rangs.'),
            q('2,1 × 10³ = ?', ['2 100', '210', '0,002 1'], 'La virgule avance de 3 rangs vers la droite.'),
            q('Laquelle est une notation scientifique ?', ['6,02 × 10²³', '60,2 × 10²²', '0,602 × 10²⁴'], 'Le premier nombre est entre 1 et 10.'),
        ],
        sources=[ref('MA-C4-4E-SCI-51', 'Notation scientifique')]),

    'MA-C4-4E-LIT-51': dict(duree=7, essentiel=
        'Développer, c’est transformer un produit en une somme : k(a + b) = ka + kb. 3(2x + 5) = 6x + 15.\n'
        'Factoriser, c’est l’inverse : on met en évidence un facteur commun. 4x² + 9x = x(4x + 9).\n'
        'Réduire, c’est regrouper les termes de même nature : 3x² + 2x − x² + 5x = 2x² + 7x.',
        parties=[
            ('Développer', [
                {'type': 'tableau', 'titre': 'Des développements', 'colonnes': ['Produit', 'Somme'], 'lignes': [
                    ['3(2x + 5)', '6x + 15'], ['−2(x − 4)', '−2x + 8'], ['x(x + 3)', 'x² + 3x']]},
                bq('Développe 5(2x − 3).', ['10x − 15', '10x − 3', '7x − 15'], '5 × 2x − 5 × 3.'),
            ]),
            ('Factoriser et réduire', [
                {'type': 'exemple-resolu', 'enonce': 'Factorise 6x + 9.', 'etapes': [
                    'Facteur commun à 6x et 9 : 3.', '6x + 9 = 3 × 2x + 3 × 3 = 3(2x + 3).'],
                 'conclusion': '6x + 9 = 3(2x + 3).'},
                {'type': 'piege', 'erreur': 'On écrit −2(x − 4) = −2x − 8.', 'correction': 'On multiplie −2 par −4 : (−2) × (−4) = +8. Donc −2x + 8.'},
            ]),
        ],
        a_toi=[
            q('Factorise 7x + 14.', ['7(x + 2)', '7(x + 14)', '21x'], '14 = 7 × 2.'),
            q('Réduis 4x + 3 − x + 2.', ['3x + 5', '5x + 5', '8x'], '4x − x = 3x et 3 + 2 = 5.'),
            q('Développe −(x + 6).', ['−x − 6', '−x + 6', 'x − 6'], 'Le signe moins change chaque signe.'),
        ],
        sources=[ref('MA-C4-4E-LIT-51', 'Développer et factoriser')]),

    'MA-C4-4E-EQ-51': dict(duree=8, essentiel=
        'On peut ajouter ou soustraire un même nombre aux deux membres d’une équation. On peut aussi les multiplier ou les diviser par un même nombre non nul.\n'
        '3x + 4 = 19 donne 3x = 15, puis x = 5.\n'
        'On regroupe les termes en x dans un membre, les nombres dans l’autre.',
        parties=[
            ('Résoudre pas à pas', [
                {'type': 'exemple-resolu', 'enonce': 'Résous 5x − 7 = 2x + 8.', 'etapes': [
                    'Je soustrais 2x aux deux membres : 3x − 7 = 8.', 'J’ajoute 7 : 3x = 15.', 'Je divise par 3 : x = 5.', 'Vérification : 5 × 5 − 7 = 18 et 2 × 5 + 8 = 18.'],
                 'conclusion': 'La solution est 5.'},
                bq('Résous 4x − 3 = 9.', ['x = 3', 'x = 1,5', 'x = 12'], '4x = 12, puis x = 3.'),
            ]),
            ('Avec des parenthèses', [
                {'type': 'explique', 'texte': '2(x + 3) = 14. On développe : 2x + 6 = 14. Puis 2x = 8, donc x = 4.'},
                {'type': 'piege', 'erreur': 'On passe un terme de l’autre côté sans changer son signe.', 'correction': 'On fait la même opération des deux côtés : soustraire 2x, ajouter 7. Le signe change de lui-même.'},
            ]),
        ],
        a_toi=[
            q('Résous 7x + 2 = 3x + 18.', ['x = 4', 'x = 2', 'x = 5'], '4x = 16.'),
            q('Résous −2x = 10.', ['x = −5', 'x = 5', 'x = 12'], 'On divise par −2.'),
            q('Le double d’un nombre augmenté de 5 vaut 17. Ce nombre est :', ['6', '11', '8,5'], '2x + 5 = 17, donc x = 6.'),
        ],
        sources=[ref('MA-C4-4E-EQ-51', 'Équations du premier degré')]),

    'MA-C4-4E-STAT-51': dict(duree=7, essentiel=
        'La médiane partage une série rangée dans l’ordre croissant en deux parties de même effectif.\n'
        'Avec un nombre impair de valeurs, c’est la valeur du milieu : 4 ; 7 ; 9 ; 12 ; 15 a pour médiane 9.\n'
        'Avec un nombre pair, on prend la moyenne des deux valeurs du milieu.',
        parties=[
            ('Trouver la médiane', [
                {'type': 'tableau', 'titre': 'Deux séries rangées', 'colonnes': ['Série', 'Effectif', 'Médiane'], 'lignes': [
                    ['4 ; 7 ; 9 ; 12 ; 15', '5', '9, la 3e valeur'], ['3 ; 5 ; 8 ; 10', '4', '(5 + 8) ÷ 2 = 6,5']]},
                bq('Médiane de 12 ; 3 ; 8 ; 15 ; 6 :', ['8', '6', '12'], 'On range d’abord : 3 ; 6 ; 8 ; 12 ; 15.'),
            ]),
            ('Avec un tableau d’effectifs', [
                {'type': 'tableau', 'titre': 'Notes de 15 élèves', 'colonnes': ['Note', '8', '10', '12', '15'], 'lignes': [
                    ['Effectif', '3', '5', '4', '3'], ['Effectif cumulé', '3', '8', '12', '15']]},
                {'type': 'explique', 'texte': '15 valeurs : la médiane est la 8e. L’effectif cumulé atteint 8 à la note 10 : la médiane est 10.'},
                {'type': 'piege', 'erreur': 'On cherche le milieu sans ranger la série.', 'correction': 'La médiane n’a de sens que sur une série rangée dans l’ordre.'},
            ]),
        ],
        a_toi=[
            q('Médiane de 2 ; 4 ; 6 ; 8 ; 10 ; 12 :', ['7', '6', '8'], '(6 + 8) ÷ 2 = 7.'),
            q('Dans une série de 21 valeurs rangées, la médiane est :', ['la 11e valeur', 'la 10e valeur', 'la moyenne'], '10 valeurs de chaque côté.'),
            q('Série 1 ; 1 ; 2 ; 50. Médiane :', ['1,5', '13,5', '2'], '(1 + 2) ÷ 2. La moyenne serait 13,5.'),
        ],
        sources=[ref('MA-C4-4E-STAT-51', 'Médiane')]),

    'MA-C4-4E-PROBA-51': dict(duree=6, essentiel=
        'La probabilité de l’évènement contraire de A est 1 − P(A).\n'
        'La somme des probabilités de toutes les issues vaut 1.\n'
        'Dans une situation non équiprobable, comme une roue aux secteurs inégaux, chaque issue a sa propre probabilité.',
        parties=[
            ('L’évènement contraire', [
                {'type': 'exemple-resolu', 'enonce': 'La probabilité qu’il pleuve demain est 0,3. Quelle est la probabilité qu’il ne pleuve pas ?', 'etapes': [
                    '« Ne pas pleuvoir » est le contraire de « pleuvoir ».', '1 − 0,3 = 0,7.'],
                 'conclusion': 'La probabilité est 0,7.'},
                bq('P(A) = 0,35. P(non A) = ?', ['0,65', '0,35', '1,35'], '1 − 0,35.'),
            ]),
            ('Situation non équiprobable', [
                {'type': 'tableau', 'titre': 'Une roue : rouge sur une moitié, bleu et vert sur un quart chacun', 'colonnes': ['Couleur', 'Probabilité'], 'lignes': [
                    ['rouge', '1/2'], ['bleu', '1/4'], ['vert', '1/4'], ['total', '1']]},
                {'type': 'piege', 'erreur': 'Trois couleurs, donc une chance sur trois pour chacune.', 'correction': 'Les secteurs n’ont pas la même taille : les issues ne sont pas équiprobables.'},
            ]),
        ],
        a_toi=[
            q('Avec cette roue, P(ne pas obtenir rouge) = ?', ['1/2', '2/3', '1/4'], '1 − 1/2.'),
            q('Un sac contient 4 billes rouges et 6 bleues. P(bleue) = ?', ['0,6', '0,4', '6'], '6 ÷ 10.'),
            q('Les probabilités des issues d’une expérience ont pour somme :', ['1', '0', '100'], 'Une issue se réalise forcément.'),
        ],
        sources=[ref('MA-C4-4E-PROBA-51', 'Évènement contraire')]),

    'MA-C4-4E-PROP-51': dict(duree=7, essentiel=
        'Dans un tableau de proportionnalité, la quatrième proportionnelle se calcule par le produit en croix.\n'
        'Si 3 kg coutent 12 €, alors 5 kg coutent 5 × 12 ÷ 3 = 20 €.\n'
        'Partager selon un rapport 2 : 3, c’est partager en 5 parts égales : 2 pour l’un, 3 pour l’autre.',
        parties=[
            ('Le produit en croix', [
                {'type': 'tableau', 'titre': 'Masse et prix', 'colonnes': ['Masse (kg)', '3', '5'], 'lignes': [
                    ['Prix (€)', '12', 'x = 5 × 12 ÷ 3 = 20']]},
                bq('4 L d’essence coutent 7 €. 10 L coutent :', ['17,50 €', '13 €', '28 €'], '10 × 7 ÷ 4 = 17,5.'),
            ]),
            ('Partager selon un rapport', [
                {'type': 'exemple-resolu', 'enonce': 'Partage 35 € entre Léa et Tom selon le rapport 2 : 3.', 'etapes': [
                    '2 + 3 = 5 parts.', 'Une part : 35 ÷ 5 = 7 €.', 'Léa : 2 × 7 = 14 €. Tom : 3 × 7 = 21 €.'],
                 'conclusion': 'Léa reçoit 14 €, Tom 21 €.'},
                {'type': 'piege', 'erreur': 'Pour le rapport 2 : 3, on divise par 2 puis par 3.', 'correction': 'On additionne les parts : 5 parts en tout.'},
            ]),
        ],
        a_toi=[
            q('5 cahiers coutent 7 €. 8 cahiers coutent :', ['11,20 €', '10 €', '5,60 €'], '8 × 7 ÷ 5 = 11,2.'),
            q('Partage 60 bonbons selon le rapport 1 : 2 :', ['20 et 40', '30 et 30', '15 et 45'], '3 parts de 20.'),
            q('Une recette : 150 g de farine pour 4 personnes. Pour 6 personnes :', ['225 g', '200 g', '100 g'], '6 × 150 ÷ 4 = 225.'),
        ],
        sources=[ref('MA-C4-4E-PROP-51', 'Quatrième proportionnelle')]),

    'MA-C4-4E-VOL-51': dict(duree=7, essentiel=
        'Volume d’une pyramide : aire de la base × hauteur ÷ 3.\n'
        'Volume d’un cône de révolution : π × r² × h ÷ 3.\n'
        'Une pyramide occupe le tiers du volume d’un prisme de même base et de même hauteur.',
        parties=[
            ('Pyramide et cône', [
                {'type': 'tableau', 'titre': 'Deux formules', 'colonnes': ['Solide', 'Formule', 'Exemple'], 'lignes': [
                    ['pyramide', 'B × h ÷ 3', 'B = 12 cm², h = 5 cm : 20 cm³'], ['cône', 'π × r² × h ÷ 3', 'r = 3 cm, h = 4 cm : 12π ≈ 37,7 cm³']]},
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'cone'}, 'legende': 'Un cône de révolution : une base en disque et un sommet.'},
                bq('Pyramide de base 9 cm² et de hauteur 10 cm. Volume :', ['30 cm³', '90 cm³', '19 cm³'], '9 × 10 ÷ 3.'),
            ]),
            ('Le tiers', [
                {'type': 'explique', 'texte': 'On remplit un cylindre avec le contenu d’un cône de même base et de même hauteur : il faut trois cônes.'},
                {'type': 'piege', 'erreur': 'On oublie de diviser par 3.', 'correction': 'B × h donne le volume du prisme ou du cylindre. La pyramide et le cône en font le tiers.'},
            ]),
        ],
        a_toi=[
            q('Un cylindre a un volume de 90 cm³. Un cône de même base et même hauteur a un volume de :', ['30 cm³', '90 cm³', '270 cm³'], 'Le tiers.'),
            q('Pyramide de base carrée de 6 cm de côté et de hauteur 5 cm. Volume :', ['60 cm³', '180 cm³', '30 cm³'], '36 × 5 ÷ 3 = 60.'),
            q('Dans la formule du cône, r désigne :', ['le rayon de la base', 'la hauteur', 'le diamètre'], 'La base est un disque.'),
        ],
        sources=[ref('MA-C4-4E-VOL-51', 'Volume pyramide et cône')]),

    'MA-C4-4E-GRAN-51': dict(duree=7, essentiel=
        'Une vitesse moyenne est une distance divisée par une durée : 150 km en 2 h donnent 75 km/h.\n'
        'Un débit est un volume divisé par une durée : 120 L en 4 min donnent 30 L/min.\n'
        'Pour passer des km/h aux m/s, on divise par 3,6 : 36 km/h = 10 m/s.',
        parties=[
            ('Vitesse', [
                {'type': 'tableau', 'titre': 'Trois calculs', 'colonnes': ['On cherche', 'Formule', 'Exemple'], 'lignes': [
                    ['la vitesse', 'v = d ÷ t', '150 km en 2 h : 75 km/h'], ['la distance', 'd = v × t', '80 km/h pendant 1,5 h : 120 km'], ['la durée', 't = d ÷ v', '200 km à 80 km/h : 2,5 h = 2 h 30 min']]},
                bq('90 km/h = ? m/s', ['25 m/s', '324 m/s', '9 m/s'], '90 ÷ 3,6 = 25.'),
            ]),
            ('Pourquoi 3,6 ?', [
                {'type': 'explique', 'texte': '1 km/h, c’est 1 000 m en 3 600 s, soit 1 000 ÷ 3 600 m/s. Donc on divise par 3,6.'},
                {'type': 'piege', 'erreur': 'On lit 2,5 h comme 2 h 50 min.', 'correction': '0,5 h = 30 min. 2,5 h = 2 h 30 min.'},
            ]),
        ],
        a_toi=[
            q('Un robinet a un débit de 12 L/min. En 5 min, il coule :', ['60 L', '17 L', '2,4 L'], '12 × 5.'),
            q('10 m/s = ? km/h', ['36 km/h', '10 km/h', '2,8 km/h'], '10 × 3,6.'),
            q('Une course de 21 km en 1 h 30 min. Vitesse moyenne :', ['14 km/h', '19,5 km/h', '7 km/h'], '21 ÷ 1,5.'),
        ],
        sources=[ref('MA-C4-4E-GRAN-51', 'Vitesse et débit')]),

    'MA-C4-4E-AGR-51': dict(duree=6, essentiel=
        'Dans un agrandissement ou une réduction de rapport k, les longueurs sont multipliées par k.\n'
        'Les aires sont multipliées par k², les volumes par k³. Les angles ne changent pas.\n'
        'Rapport 3 : longueurs × 3, aires × 9, volumes × 27.',
        parties=[
            ('L’effet du rapport', [
                {'type': 'tableau', 'titre': 'Rapport k', 'colonnes': ['Grandeur', 'Multipliée par', 'k = 2', 'k = 0,5'], 'lignes': [
                    ['longueur', 'k', '× 2', '× 0,5'], ['aire', 'k²', '× 4', '× 0,25'], ['volume', 'k³', '× 8', '× 0,125'], ['angle', 'inchangé', '=', '=']]},
                bq('Un carré de 5 cm² est agrandi de rapport 2. Sa nouvelle aire :', ['20 cm²', '10 cm²', '25 cm²'], '5 × 2² = 20.'),
            ]),
            ('Agrandissement ou réduction ?', [
                {'type': 'explique', 'texte': 'Si k > 1, c’est un agrandissement. Si 0 < k < 1, c’est une réduction : une maquette au 1/100 a pour rapport 0,01.'},
                {'type': 'piege', 'erreur': 'On multiplie l’aire par k, comme les longueurs.', 'correction': 'Un carré dont le côté double a une aire quatre fois plus grande : k² = 4.'},
            ]),
        ],
        a_toi=[
            q('Un cube de 80 cm³ est réduit de rapport 0,5. Nouveau volume :', ['10 cm³', '40 cm³', '20 cm³'], '80 × 0,5³ = 80 × 0,125.'),
            q('Rapport 3 : un angle de 40° devient :', ['40°', '120°', '360°'], 'Les angles sont conservés.'),
            q('Un rapport de 1,5 correspond à :', ['un agrandissement', 'une réduction', 'aucun changement'], '1,5 > 1.'),
        ],
        sources=[ref('MA-C4-4E-AGR-51', 'Agrandissement et réduction')]),

    'MA-C4-4E-THAL-51': dict(duree=8, essentiel=
        'Dans un triangle ABC, M est sur [AB] et N sur [AC]. Si (MN) est parallèle à (BC), alors AM/AB = AN/AC = MN/BC.\n'
        'C’est le théorème de Thalès : il sert à calculer des longueurs.\n'
        'Sa réciproque prouve un parallélisme : si AM/AB = AN/AC, alors (MN) et (BC) sont parallèles.',
        parties=[
            ('Calculer une longueur', [
                {'type': 'visuel', 'visuel': figure(8, 8,
                    {'forme': 'polygone', 'sommets': [[4, 1], [1, 7], [7, 7]]}, seg((2.5, 4), (5.5, 4), accent=True),
                    pt(4, 1, 'A'), pt(1, 7, 'B'), pt(7, 7, 'C'), pt(2.5, 4, 'M'), pt(5.5, 4, 'N')),
                 'legende': '(MN) est parallèle à (BC) : AM/AB = AN/AC = MN/BC.'},
                {'type': 'exemple-resolu', 'enonce': 'AM = 3 cm, AB = 6 cm, BC = 8 cm et (MN) // (BC). Calcule MN.', 'etapes': [
                    'Les droites (MN) et (BC) sont parallèles : on applique le théorème de Thalès.', 'AM/AB = MN/BC, soit 3/6 = MN/8.', 'MN = 8 × 3 ÷ 6 = 4.'],
                 'conclusion': 'MN = 4 cm.'},
                bq('Même figure : AN = 2,5 cm. AC = ?', ['5 cm', '1,25 cm', '3 cm'], 'AN/AC = 3/6, donc AC = 2,5 × 6 ÷ 3.'),
            ]),
            ('La réciproque', [
                {'type': 'explique', 'texte': 'AM = 2, AB = 5, AN = 3, AC = 7,5. AM/AB = 0,4 et AN/AC = 0,4. Les points sont dans le même ordre : (MN) // (BC).'},
                {'type': 'piege', 'erreur': 'On écrit AM/MB = MN/BC.', 'correction': 'On compare les côtés des deux triangles AMN et ABC : AM/AB, pas AM/MB.'},
            ]),
        ],
        a_toi=[
            q('Le théorème de Thalès s’applique si :', ['(MN) est parallèle à (BC)', 'le triangle est rectangle', 'M est le milieu de [AB]'], 'C’est l’hypothèse du théorème.'),
            q('AM/AB = 2/5 et BC = 10 cm, avec (MN) // (BC). MN = ?', ['4 cm', '25 cm', '5 cm'], '10 × 2 ÷ 5.'),
            q('Pour prouver que deux droites sont parallèles, on utilise :', ['la réciproque du théorème de Thalès', 'le théorème de Pythagore', 'la médiane'], 'On compare les quotients.'),
        ],
        sources=[ref('MA-C4-4E-THAL-51', 'Thalès, triangles emboîtés')]),

    'MA-C4-4E-PYTH-51': dict(duree=8, essentiel=
        'Dans un triangle rectangle, le carré de l’hypoténuse est égal à la somme des carrés des deux autres côtés.\n'
        'ABC rectangle en A : BC² = AB² + AC².\n'
        'Réciproquement, si BC² = AB² + AC², alors le triangle est rectangle en A.',
        parties=[
            ('Calculer une longueur', [
                {'type': 'visuel', 'visuel': figure(6, 5, {'forme': 'polygone', 'sommets': [[1, 4], [5, 4], [1, 1]]}, pt(1, 4, 'A'), pt(5, 4, 'B'), pt(1, 1, 'C')),
                 'legende': 'AB = 4, AC = 3 : BC² = 16 + 9 = 25, donc BC = 5.'},
                {'type': 'exemple-resolu', 'enonce': 'ABC est rectangle en A, BC = 13 cm, AB = 5 cm. Calcule AC.', 'etapes': [
                    'BC² = AB² + AC², soit 169 = 25 + AC².', 'AC² = 169 − 25 = 144.', 'AC = √144 = 12.'],
                 'conclusion': 'AC = 12 cm.'},
                bq('Triangle rectangle de côtés de l’angle droit 6 cm et 8 cm. Hypoténuse :', ['10 cm', '14 cm', '48 cm'], '36 + 64 = 100.'),
            ]),
            ('Prouver qu’un triangle est rectangle ou non', [
                {'type': 'tableau', 'titre': 'On compare le carré du plus grand côté à la somme des deux autres', 'colonnes': ['Côtés', 'Calcul', 'Conclusion'], 'lignes': [
                    ['6 ; 8 ; 10', '100 = 36 + 64', 'rectangle'], ['5 ; 6 ; 8', '64 ≠ 25 + 36 = 61', 'pas rectangle']]},
                {'type': 'piege', 'erreur': 'On écrit BC = AB + AC.', 'correction': 'Ce sont les carrés qui s’additionnent : 3 + 4 ≠ 5, mais 9 + 16 = 25.'},
            ]),
        ],
        a_toi=[
            q('L’hypoténuse est :', ['le côté opposé à l’angle droit', 'le plus petit côté', 'un côté de l’angle droit'], 'C’est aussi le plus long.'),
            q('Hypoténuse 10 cm, un côté 6 cm. L’autre côté :', ['8 cm', '4 cm', '16 cm'], '100 − 36 = 64.'),
            q('Un triangle de côtés 7, 24 et 25 est-il rectangle ?', ['oui', 'non', 'on ne peut pas savoir'], '49 + 576 = 625 = 25².'),
        ],
        sources=[ref('MA-C4-4E-PYTH-51', 'Théorème de Pythagore')]),

    'MA-C4-4E-COS-51': dict(duree=7, essentiel=
        'Dans un triangle rectangle, le cosinus d’un angle aigu est le quotient du côté adjacent par l’hypoténuse.\n'
        'ABC rectangle en A : cos(ABC) = AB/BC.\n'
        'Le cosinus est toujours compris entre 0 et 1. On le calcule à la calculatrice, réglée en degrés.',
        parties=[
            ('Calculer un côté adjacent', [
                {'type': 'exemple-resolu', 'enonce': 'ABC est rectangle en A, BC = 10 cm et l’angle ABC mesure 60°. Calcule AB.', 'etapes': [
                    'cos(ABC) = AB/BC.', 'cos(60°) = AB/10.', 'AB = 10 × cos(60°) = 10 × 0,5 = 5.'],
                 'conclusion': 'AB = 5 cm.'},
                bq('cos(ABC) = AB/BC. AB est :', ['le côté adjacent à l’angle B', 'l’hypoténuse', 'le côté opposé à l’angle B'], 'Il touche l’angle B et n’est pas l’hypoténuse.'),
            ]),
            ('Calculer l’hypoténuse', [
                {'type': 'explique', 'texte': 'AB = 4 cm et l’angle B mesure 60°. cos(60°) = 4/BC, donc BC = 4 ÷ cos(60°) = 4 ÷ 0,5 = 8 cm.'},
                {'type': 'piege', 'erreur': 'On prend le côté opposé à l’angle au numérateur.', 'correction': 'Le cosinus utilise le côté adjacent, celui qui forme l’angle avec l’hypoténuse.'},
            ]),
        ],
        a_toi=[
            q('ABC rectangle en A, BC = 20 cm, cos(B) = 0,6. AB = ?', ['12 cm', '33,3 cm', '0,03 cm'], '20 × 0,6 = 12.'),
            q('Le cosinus d’un angle aigu est :', ['compris entre 0 et 1', 'plus grand que 1', 'négatif'], 'Le côté adjacent est plus court que l’hypoténuse.'),
            q('Pour calculer cos(35°), la calculatrice doit être réglée en :', ['degrés', 'radians', 'grades'], 'Les angles sont donnés en degrés.'),
        ],
        sources=[ref('MA-C4-4E-COS-51', 'Cosinus d’un angle')]),

    'MA-C4-4E-TRANS-51': dict(duree=7, essentiel=
        'La translation qui transforme A en B fait glisser la figure comme de A vers B : même direction, même sens, même longueur.\n'
        'Si cette translation transforme C en D, alors ABDC est un parallélogramme.\n'
        'Une translation conserve les longueurs, les angles, les aires et le parallélisme.',
        parties=[
            ('Construire une image', [
                {'type': 'visuel', 'visuel': figure(7, 7, seg((1, 4), (4, 2), accent=True), seg((2, 6), (5, 4)), pt(1, 4, 'A'), pt(4, 2, 'B'), pt(2, 6, 'C'), pt(5, 4, 'D')),
                 'legende': 'De A à B : 3 carreaux à droite, 2 vers le haut. On fait le même glissement depuis C pour obtenir D.'},
                {'type': 'methode', 'titre': 'Construire l’image D de C', 'etapes': [
                    'Repère le glissement de A vers B.', 'Applique le même glissement à partir de C.', 'Vérifie que ABDC est un parallélogramme.']},
                bq('La translation qui transforme A en B transforme C en D. Alors :', ['ABDC est un parallélogramme', 'ABCD est un carré', 'A, B, C, D sont alignés'], 'Les segments [AB] et [CD] sont parallèles et de même longueur.'),
            ]),
            ('Ce qui est conservé', [
                {'type': 'piege', 'erreur': 'On écrit ABCD au lieu de ABDC pour le parallélogramme.', 'correction': 'L’ordre des sommets compte : A va en B et C va en D, donc les sommets se suivent A, B, D, C.'},
            ]),
        ],
        a_toi=[
            q('Par une translation, un segment de 6 cm a pour image un segment de :', ['6 cm', '12 cm', '3 cm'], 'Les longueurs sont conservées.'),
            q('Une translation est un :', ['glissement', 'demi-tour', 'pliage'], 'Sans rotation ni retournement.'),
            q('L’image d’une droite par une translation est :', ['une droite parallèle', 'une droite perpendiculaire', 'un point'], 'La direction est conservée.'),
        ],
        sources=[ref('MA-C4-4E-TRANS-51', 'Translations')]),

    'MA-C4-4E-REP-01': dict(duree=6, essentiel=
        'Dans un pavé droit, on repère un point par trois coordonnées : abscisse, ordonnée et altitude.\n'
        'L’origine est un sommet du pavé, de coordonnées (0 ; 0 ; 0).\n'
        'Dans un cube de côté 1, le sommet opposé à l’origine a pour coordonnées (1 ; 1 ; 1).',
        parties=[
            ('Trois axes', [
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'pave'}, 'legende': 'Les trois arêtes issues de l’origine portent les trois axes.'},
                {'type': 'tableau', 'titre': 'Pavé de longueur 4, largeur 3, hauteur 2', 'colonnes': ['Point', 'Coordonnées'], 'lignes': [
                    ['origine', '(0 ; 0 ; 0)'], ['sommet sur l’axe des abscisses', '(4 ; 0 ; 0)'], ['sommet au-dessus de l’origine', '(0 ; 0 ; 2)'], ['sommet opposé à l’origine', '(4 ; 3 ; 2)']]},
                bq('Dans ce pavé, le centre de la face du dessus a pour coordonnées :', ['(2 ; 1,5 ; 2)', '(4 ; 3 ; 2)', '(2 ; 1,5 ; 0)'], 'Milieu en longueur et en largeur, altitude maximale.'),
            ]),
            ('L’ordre compte', [
                {'type': 'piege', 'erreur': 'On écrit l’altitude en premier.', 'correction': 'L’ordre est toujours abscisse, ordonnée, altitude.'},
            ]),
        ],
        a_toi=[
            q('Un point d’altitude 0 est :', ['sur la face du dessous', 'sur la face du dessus', 'au centre du pavé'], 'La face qui contient l’origine.'),
            q('Dans un cube de côté 1, le point (1 ; 0 ; 1) est :', ['un sommet', 'le centre', 'hors du cube'], 'Chaque coordonnée vaut 0 ou 1.'),
            q('Combien de coordonnées pour repérer un point dans l’espace ?', ['3', '2', '1'], 'Abscisse, ordonnée, altitude.'),
        ],
        sources=[ref('MA-C4-4E-REP-01', 'Se repérer dans un pavé droit')]),

    'MA-C4-4E-ALGO-01': dict(duree=6, essentiel=
        'Une variable est une case mémoire qui porte un nom et contient une valeur qui peut changer.\n'
        'Une condition « si… alors… sinon » choisit entre deux actions.\n'
        'Une boucle répète des instructions, un nombre de fois donné ou jusqu’à ce qu’une condition soit vraie.',
        parties=[
            ('Variable et condition', [
                {'type': 'methode', 'titre': 'Programme d’un jeu', 'etapes': [
                    'Mettre score à 0.', 'Répéter 5 fois : si la réponse est juste, ajouter 3 à score.', 'Si score > 10, dire « Gagné », sinon dire « Perdu ».']},
                bq('Le joueur donne 4 bonnes réponses. Le programme dit :', ['Gagné', 'Perdu', 'rien'], 'score = 12, et 12 > 10.'),
            ]),
            ('Suivre l’évolution d’une variable', [
                {'type': 'tableau', 'titre': 'Valeur de score', 'colonnes': ['Bonnes réponses', 'score'], 'lignes': [
                    ['0', '0'], ['1', '3'], ['2', '6'], ['3', '9'], ['4', '12']]},
                {'type': 'piege', 'erreur': 'On oublie d’initialiser la variable au début.', 'correction': 'Sans « mettre score à 0 », la valeur de la partie précédente reste en mémoire.'},
            ]),
        ],
        a_toi=[
            q('Avec 3 bonnes réponses, le programme dit :', ['Perdu', 'Gagné', 'rien'], 'score = 9, et 9 n’est pas supérieur à 10.'),
            q('« Répéter jusqu’à ce que score > 20 » est :', ['une boucle', 'une variable', 'une entrée'], 'Elle s’arrête quand la condition devient vraie.'),
            q('Une variable :', ['contient une valeur qui peut changer', 'est toujours égale à 0', 'est une instruction'], 'Comme le score.'),
        ],
        sources=[ref('MA-C4-4E-ALGO-01', 'Variables et conditions')]),
}

ecrire(COURS)
