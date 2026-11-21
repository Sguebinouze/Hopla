"""Lot de cours : maths 3e (programme 2020, en vigueur en 3e jusqu'en 2027-2028). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-3e-maths.py
    python3 scripts/cours/pages.py content/cours/MA-C4-3E-*.json

Cycle 4 : phrases de 25 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
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
    'MA-C4-3E-FRAC-51': dict(duree=6, essentiel=
        'Une fraction est irréductible quand son numérateur et son dénominateur n’ont plus de diviseur commun autre que 1.\n'
        'Pour la rendre irréductible, on décompose numérateur et dénominateur en facteurs premiers, puis on simplifie les facteurs communs.\n'
        '84/126 = (2² × 3 × 7)/(2 × 3² × 7) = 2/3.',
        parties=[
            ('Avec les facteurs premiers', [
                {'type': 'exemple-resolu', 'enonce': 'Rends irréductible 120/144.', 'etapes': [
                    '120 = 2³ × 3 × 5 et 144 = 2⁴ × 3².', 'Facteurs communs : 2³ × 3 = 24.', '120/144 = 5/6.'],
                 'conclusion': '120/144 = 5/6, fraction irréductible.'},
                bq('Rends irréductible 45/75.', ['3/5', '9/15', '15/25'], '45 = 3² × 5 et 75 = 3 × 5² : on divise par 15.'),
            ]),
            ('Avec le plus grand diviseur commun', [
                {'type': 'explique', 'texte': 'Diviser numérateur et dénominateur par leur plus grand diviseur commun donne directement la fraction irréductible : 84 et 126 ont 42 pour plus grand diviseur commun.'},
                {'type': 'piege', 'erreur': 'On s’arrête à 42/63 en pensant avoir fini.', 'correction': '42 et 63 sont encore divisibles par 21 : 42/63 = 2/3.'},
            ]),
        ],
        a_toi=[
            q('Rends irréductible 36/48.', ['3/4', '6/8', '9/12'], 'On divise par 12.'),
            q('Quelle fraction est irréductible ?', ['14/15', '14/21', '15/25'], '14 = 2 × 7 et 15 = 3 × 5.'),
            q('Rends irréductible 210/330.', ['7/11', '21/33', '70/110'], 'On divise par 30.'),
        ],
        sources=[ref('MA-C4-3E-FRAC-51', 'Fraction irréductible')]),

    'MA-C4-3E-PUIS-51': dict(duree=6, essentiel=
        'Pour un nombre a non nul et un entier n positif, a⁻ⁿ est l’inverse de aⁿ : a⁻ⁿ = 1/aⁿ.\n'
        '2⁻³ = 1/2³ = 1/8 ; 10⁻² = 1/100 = 0,01.\n'
        'Par convention, a⁰ = 1.',
        parties=[
            ('Calculer', [
                {'type': 'tableau', 'titre': 'Puissances d’exposant négatif', 'colonnes': ['Puissance', 'Inverse', 'Valeur'], 'lignes': [
                    ['2⁻³', '1/2³', '1/8 = 0,125'], ['5⁻¹', '1/5', '0,2'], ['10⁻⁴', '1/10⁴', '0,000 1'], ['(−2)⁻²', '1/(−2)²', '1/4']]},
                bq('4⁻² = ?', ['1/16', '−16', '−8'], '1/4² = 1/16.'),
            ]),
            ('Un exposant négatif ne rend pas négatif', [
                {'type': 'piege', 'erreur': 'On écrit 2⁻³ = −8.', 'correction': 'Le signe moins de l’exposant indique l’inverse, pas l’opposé : 2⁻³ = 1/8, un nombre positif.'},
            ]),
        ],
        a_toi=[
            q('3⁻² = ?', ['1/9', '−9', '−6'], '1/3².'),
            q('10⁰ = ?', ['1', '0', '10'], 'Par convention.'),
            q('Quelle écriture est égale à 0,001 ?', ['10⁻³', '10³', '−10³'], '1/1 000.'),
        ],
        sources=[ref('MA-C4-3E-PUIS-51', 'Puissances d’exposant négatif')]),

    'MA-C4-3E-PUIS-52': dict(duree=7, essentiel=
        'Pour un même nombre a non nul et des exposants entiers relatifs m et n : aᵐ × aⁿ = aᵐ⁺ⁿ et aᵐ ÷ aⁿ = aᵐ⁻ⁿ.\n'
        'De plus, (aᵐ)ⁿ = aᵐˣⁿ.\n'
        '10⁵ ÷ 10⁸ = 10⁻³ ; 2⁴ × 2⁻⁶ = 2⁻².',
        parties=[
            ('Trois règles', [
                {'type': 'tableau', 'titre': 'Calculer avec les exposants', 'colonnes': ['Règle', 'Exemple'], 'lignes': [
                    ['aᵐ × aⁿ = aᵐ⁺ⁿ', '10⁻² × 10⁷ = 10⁵'], ['aᵐ ÷ aⁿ = aᵐ⁻ⁿ', '3⁵ ÷ 3² = 3³'], ['(aᵐ)ⁿ = aᵐˣⁿ', '(2³)² = 2⁶']]},
                bq('10⁵ ÷ 10⁸ = ?', ['10⁻³', '10³', '10¹³'], '5 − 8 = −3.'),
            ]),
            ('En notation scientifique', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule (3 × 10⁴) × (2 × 10⁻⁷).', 'etapes': [
                    'On regroupe : (3 × 2) × (10⁴ × 10⁻⁷).', '= 6 × 10⁻³.'],
                 'conclusion': 'Le résultat est 6 × 10⁻³.'},
                {'type': 'piege', 'erreur': 'On applique la règle à des nombres différents : 2³ × 3⁴ = 6⁷.', 'correction': 'Les règles ne valent que pour un même nombre. 2³ × 3⁴ = 8 × 81 = 648.'},
            ]),
        ],
        a_toi=[
            q('2⁴ × 2⁻⁶ = ?', ['2⁻²', '2¹⁰', '4⁻²'], '4 + (−6) = −2.'),
            q('(10²)³ = ?', ['10⁶', '10⁵', '10⁸'], '2 × 3 = 6.'),
            q('7³ ÷ 7⁻¹ = ?', ['7⁴', '7²', '7⁻³'], '3 − (−1) = 4.'),
        ],
        sources=[ref('MA-C4-3E-PUIS-52', 'Produits et quotients de puissances')]),

    'MA-C4-3E-LIT-51': dict(duree=7, essentiel=
        'Double distributivité : (a + b)(c + d) = ac + ad + bc + bd.\n'
        '(x + 2)(x + 5) = x² + 5x + 2x + 10 = x² + 7x + 10.\n'
        'Pour factoriser, on repère un facteur commun, parfois une parenthèse entière.',
        parties=[
            ('Développer', [
                {'type': 'exemple-resolu', 'enonce': 'Développe et réduis (2x − 1)(x + 3).', 'etapes': [
                    '2x × x + 2x × 3 − 1 × x − 1 × 3.', '= 2x² + 6x − x − 3.', '= 2x² + 5x − 3.'],
                 'conclusion': '(2x − 1)(x + 3) = 2x² + 5x − 3.'},
                bq('Développe (x + 4)(x − 1).', ['x² + 3x − 4', 'x² − 4', 'x² + 5x − 4'], '−x + 4x = 3x et 4 × (−1) = −4.'),
            ]),
            ('Factoriser avec une parenthèse commune', [
                {'type': 'explique', 'texte': '(x + 1)(x + 4) + (x + 1)(2x − 3) : le facteur commun est (x + 1). On obtient (x + 1)(x + 4 + 2x − 3) = (x + 1)(3x + 1).'},
                {'type': 'piege', 'erreur': 'On oublie des produits : (x + 2)(x + 5) = x² + 10.', 'correction': 'Chaque terme de la première parenthèse multiplie chaque terme de la seconde : quatre produits.'},
            ]),
        ],
        a_toi=[
            q('Développe (x + 3)(x + 3).', ['x² + 6x + 9', 'x² + 9', 'x² + 3x + 9'], 'Quatre produits : x², 3x, 3x, 9.'),
            q('Factorise 5x² + 10x.', ['5x(x + 2)', '5(x² + 10x)', 'x(5x + 2)'], 'Facteur commun 5x.'),
            q('Développe (3 − x)(2 + x).', ['6 + x − x²', '6 − x²', '6 + 5x − x²'], '6 + 3x − 2x − x².'),
        ],
        sources=[ref('MA-C4-3E-LIT-51', 'Double distributivité')]),

    'MA-C4-3E-LIT-52': dict(duree=7, essentiel=
        'Pour tous nombres a et b : a² − b² = (a − b)(a + b).\n'
        'x² − 9 = x² − 3² = (x − 3)(x + 3).\n'
        'Cette factorisation permet de résoudre des équations comme x² − 16 = 0.',
        parties=[
            ('Reconnaitre une différence de deux carrés', [
                {'type': 'tableau', 'titre': 'Factoriser', 'colonnes': ['Expression', 'a et b', 'Factorisation'], 'lignes': [
                    ['x² − 9', 'x et 3', '(x − 3)(x + 3)'], ['4x² − 25', '2x et 5', '(2x − 5)(2x + 5)'], ['49 − x²', '7 et x', '(7 − x)(7 + x)']]},
                bq('Factorise x² − 64.', ['(x − 8)(x + 8)', '(x − 8)²', '(x − 32)(x + 32)'], '64 = 8².'),
            ]),
            ('Résoudre', [
                {'type': 'exemple-resolu', 'enonce': 'Résous x² − 16 = 0.', 'etapes': [
                    'x² − 16 = (x − 4)(x + 4).', '(x − 4)(x + 4) = 0 : un produit est nul si l’un de ses facteurs est nul.', 'x − 4 = 0 ou x + 4 = 0.'],
                 'conclusion': 'Les solutions sont 4 et −4.'},
                {'type': 'piege', 'erreur': 'On factorise x² + 9 en (x − 3)(x + 3).', 'correction': 'La formule vaut pour une différence. (x − 3)(x + 3) = x² − 9.'},
            ]),
        ],
        a_toi=[
            q('Factorise 9x² − 1.', ['(3x − 1)(3x + 1)', '(9x − 1)(9x + 1)', '(3x − 1)²'], '9x² = (3x)².'),
            q('(x − 5)(x + 5) = ?', ['x² − 25', 'x² + 25', 'x² − 10x − 25'], 'C’est a² − b².'),
            q('Les solutions de x² − 100 = 0 sont :', ['10 et −10', '10 seulement', '50 et −50'], '(x − 10)(x + 10) = 0.'),
        ],
        sources=[ref('MA-C4-3E-LIT-52', 'Factoriser a² − b²')]),

    'MA-C4-3E-EQ-51': dict(duree=6, essentiel=
        'Un produit est nul si et seulement si l’un au moins de ses facteurs est nul.\n'
        '(x − 2)(x + 5) = 0 donne x − 2 = 0 ou x + 5 = 0, soit x = 2 ou x = −5.\n'
        'Une équation produit nul peut donc avoir deux solutions.',
        parties=[
            ('Résoudre', [
                {'type': 'exemple-resolu', 'enonce': 'Résous (2x − 6)(x + 1) = 0.', 'etapes': [
                    '2x − 6 = 0 ou x + 1 = 0.', '2x = 6, soit x = 3 ; ou x = −1.'],
                 'conclusion': 'Les solutions sont 3 et −1.'},
                bq('Résous x(x − 7) = 0.', ['x = 0 ou x = 7', 'x = 7 seulement', 'x = −7'], 'Le facteur x peut être nul.'),
            ]),
            ('Se ramener à un produit nul', [
                {'type': 'explique', 'texte': 'Pour résoudre x² = 5x, on écrit x² − 5x = 0, puis on factorise : x(x − 5) = 0. Solutions : 0 et 5.'},
                {'type': 'piege', 'erreur': 'On divise les deux membres de x² = 5x par x et on trouve seulement x = 5.', 'correction': 'Diviser par x suppose x non nul : on perd la solution 0.'},
            ]),
        ],
        a_toi=[
            q('Résous (x + 3)(x − 4) = 0.', ['x = −3 ou x = 4', 'x = 3 ou x = −4', 'x = 12'], 'Chaque facteur peut être nul.'),
            q('Résous (3x − 9)(2x + 8) = 0.', ['x = 3 ou x = −4', 'x = 9 ou x = −8', 'x = −3 ou x = 4'], '3x = 9 ; 2x = −8.'),
            q('Un produit de deux facteurs est nul :', ['si l’un au moins des facteurs est nul', 'si les deux sont égaux', 'jamais'], 'C’est la propriété du produit nul.'),
        ],
        sources=[ref('MA-C4-3E-EQ-51', 'Équation produit nul')]),

    'MA-C4-3E-RAC-51': dict(duree=6, essentiel=
        'Si a > 0, l’équation x² = a a deux solutions : √a et −√a.\n'
        'Si a = 0, elle a une seule solution : 0. Si a < 0, elle n’a pas de solution, car un carré n’est jamais négatif.\n'
        'x² = 49 : x = 7 ou x = −7.',
        parties=[
            ('Trois cas', [
                {'type': 'tableau', 'titre': 'Résoudre x² = a', 'colonnes': ['Équation', 'Solutions'], 'lignes': [
                    ['x² = 49', '7 et −7'], ['x² = 10', '√10 et −√10, environ 3,16 et −3,16'], ['x² = 0', '0'], ['x² = −4', 'aucune']]},
                bq('Résous x² = 81.', ['9 et −9', '9 seulement', '40,5'], 'Deux nombres ont pour carré 81.'),
            ]),
            ('Dans un problème', [
                {'type': 'explique', 'texte': 'Un carré a une aire de 50 cm². Son côté c vérifie c² = 50. Une longueur est positive : c = √50 ≈ 7,07 cm.'},
                {'type': 'piege', 'erreur': 'On oublie la solution négative : x² = 25 donne seulement x = 5.', 'correction': '(−5)² = 25 aussi. Dans une équation, on garde les deux, sauf si le contexte l’interdit.'},
            ]),
        ],
        a_toi=[
            q('Combien de solutions a x² = −9 ?', ['aucune', 'une', 'deux'], 'Un carré est toujours positif ou nul.'),
            q('Résous x² = 2.', ['√2 et −√2', '1 et −1', '4'], 'Environ 1,41 et −1,41.'),
            q('Un carré a une aire de 64 m². Son côté mesure :', ['8 m', '−8 m', '32 m'], 'Une longueur est positive.'),
        ],
        sources=[ref('MA-C4-3E-RAC-51', 'Résoudre x² = a')]),

    'MA-C4-3E-STAT-51': dict(duree=6, essentiel=
        'L’étendue d’une série est la différence entre sa plus grande et sa plus petite valeur.\n'
        'Série 4 ; 9 ; 15 ; 7 : étendue 15 − 4 = 11.\n'
        'Elle mesure la dispersion : deux séries de même moyenne peuvent être plus ou moins dispersées.',
        parties=[
            ('Comparer deux séries', [
                {'type': 'tableau', 'titre': 'Notes de deux élèves', 'colonnes': ['Élève', 'Notes', 'Moyenne', 'Étendue'], 'lignes': [
                    ['Léa', '10 ; 10 ; 11 ; 9', '10', '2'], ['Tom', '5 ; 8 ; 12 ; 15', '10', '10']]},
                bq('Quel élève a les résultats les plus réguliers ?', ['Léa', 'Tom', 'aucun des deux'], 'Son étendue est plus petite.'),
            ]),
            ('Moyenne, médiane, étendue', [
                {'type': 'explique', 'texte': 'La moyenne et la médiane donnent une valeur centrale. L’étendue renseigne sur l’écart entre les extrêmes.'},
                {'type': 'piege', 'erreur': 'On calcule l’étendue avec la première et la dernière valeur de la liste.', 'correction': 'On prend la plus grande et la plus petite valeur, où qu’elles soient.'},
            ]),
        ],
        a_toi=[
            q('Étendue de 12 ; 3 ; 18 ; 7 ; 10 :', ['15', '6', '10'], '18 − 3.'),
            q('Une étendue de 0 signifie :', ['que toutes les valeurs sont égales', 'que la moyenne vaut 0', 'que la série est vide'], 'Aucun écart.'),
            q('Températures : −3 °C et 8 °C au minimum et au maximum. Étendue :', ['11 °C', '5 °C', '8 °C'], '8 − (−3) = 11.'),
        ],
        sources=[ref('MA-C4-3E-STAT-51', 'Étendue')]),

    'MA-C4-3E-PROBA-51': dict(duree=7, essentiel=
        'Dans une situation d’équiprobabilité, P(A) = nombre d’issues favorables ÷ nombre d’issues possibles.\n'
        'Pour deux épreuves, on dénombre les issues avec un tableau à double entrée ou un arbre.\n'
        'Avec deux dés, il y a 6 × 6 = 36 issues, dont 6 doubles : P(double) = 6/36 = 1/6.',
        parties=[
            ('Un tableau à double entrée', [
                {'type': 'tableau', 'titre': 'On lance deux pièces', 'colonnes': ['Pièce 1 \\ Pièce 2', 'Pile', 'Face'], 'lignes': [
                    ['Pile', 'PP', 'PF'], ['Face', 'FP', 'FF']]},
                bq('Avec deux pièces, P(au moins un pile) = ?', ['3/4', '1/2', '1/4'], 'PP, PF et FP : 3 issues sur 4.'),
            ]),
            ('Deux dés', [
                {'type': 'exemple-resolu', 'enonce': 'On lance deux dés. Quelle est la probabilité que la somme fasse 7 ?', 'etapes': [
                    'Il y a 36 issues équiprobables.', 'Somme 7 : (1 ; 6), (2 ; 5), (3 ; 4), (4 ; 3), (5 ; 2), (6 ; 1), soit 6 issues.', '6/36 = 1/6.'],
                 'conclusion': 'P(somme = 7) = 1/6.'},
                {'type': 'piege', 'erreur': 'On compte (1 ; 6) et (6 ; 1) comme une seule issue.', 'correction': 'Les deux dés sont distincts : ce sont deux issues différentes.'},
            ]),
        ],
        a_toi=[
            q('Avec deux dés, P(somme = 12) = ?', ['1/36', '1/12', '1/6'], 'Seulement (6 ; 6).'),
            q('Avec deux dés, combien d’issues possibles ?', ['36', '12', '6'], '6 × 6.'),
            q('Avec deux pièces, P(deux faces) = ?', ['1/4', '1/2', '1/3'], 'Une issue sur quatre.'),
        ],
        sources=[ref('MA-C4-3E-PROBA-51', 'Probabilités et dénombrement')]),

    'MA-C4-3E-PCT-51': dict(duree=7, essentiel=
        'Augmenter de t %, c’est multiplier par 1 + t/100. Baisser de t %, c’est multiplier par 1 − t/100.\n'
        'Hausse de 20 % : × 1,2. Baisse de 15 % : × 0,85.\n'
        'Des évolutions successives se traduisent en multipliant les coefficients.',
        parties=[
            ('Appliquer', [
                {'type': 'tableau', 'titre': 'Coefficients multiplicateurs', 'colonnes': ['Évolution', 'Coefficient', 'Sur 80 €'], 'lignes': [
                    ['+ 20 %', '1,2', '96 €'], ['− 15 %', '0,85', '68 €'], ['+ 5 %', '1,05', '84 €'], ['− 50 %', '0,5', '40 €']]},
                bq('Une baisse de 30 % correspond à un coefficient de :', ['0,7', '0,3', '1,3'], '1 − 0,3.'),
            ]),
            ('Évolutions successives et retour en arrière', [
                {'type': 'exemple-resolu', 'enonce': 'Un prix augmente de 10 %, puis baisse de 10 %. Quelle est l’évolution globale ?', 'etapes': [
                    '1,1 × 0,9 = 0,99.', 'Le prix est multiplié par 0,99.'],
                 'conclusion': 'Il baisse de 1 % au total.'},
                {'type': 'explique', 'texte': 'Après une hausse de 25 %, un objet coute 75 €. Son prix initial est 75 ÷ 1,25 = 60 €.'},
                {'type': 'piege', 'erreur': 'Pour retrouver le prix avant une hausse de 25 %, on retire 25 % de 75 €.', 'correction': 'Les 25 % portaient sur le prix initial : on divise par 1,25.'},
            ]),
        ],
        a_toi=[
            q('Une hausse de 3 % correspond à un coefficient de :', ['1,03', '1,3', '0,03'], '1 + 0,03.'),
            q('Deux hausses successives de 10 % font une hausse de :', ['21 %', '20 %', '11 %'], '1,1 × 1,1 = 1,21.'),
            q('Après une baisse de 20 %, un objet coute 40 €. Prix initial :', ['50 €', '48 €', '32 €'], '40 ÷ 0,8.'),
        ],
        sources=[ref('MA-C4-3E-PCT-51', 'Coefficient multiplicateur')]),

    'MA-C4-3E-FONC-51': dict(duree=7, essentiel=
        'Une fonction f associe à chaque nombre x un unique nombre f(x), son image.\n'
        'Si f(a) = b, on dit que b est l’image de a, et que a est un antécédent de b.\n'
        'Avec f(x) = 2x + 1 : l’image de 3 est 7 ; un antécédent de 9 est 4.',
        parties=[
            ('Image et antécédent', [
                {'type': 'tableau', 'titre': 'f(x) = x²', 'colonnes': ['x', '−3', '0', '2', '3'], 'lignes': [
                    ['f(x)', '9', '0', '4', '9']]},
                bq('Avec ce tableau, les antécédents de 9 par f sont :', ['−3 et 3', '81', '3 seulement'], 'f(−3) = f(3) = 9.'),
            ]),
            ('Calculer', [
                {'type': 'exemple-resolu', 'enonce': 'f(x) = 2x + 1. Trouve un antécédent de 9.', 'etapes': [
                    'On cherche x tel que 2x + 1 = 9.', '2x = 8, donc x = 4.', 'Vérification : f(4) = 2 × 4 + 1 = 9.'],
                 'conclusion': '4 est un antécédent de 9.'},
                {'type': 'piege', 'erreur': 'On confond image et antécédent : « l’image de 9 est 4 ».', 'correction': 'L’image se calcule à partir de x : f(4) = 9. 9 est l’image de 4 ; 4 est un antécédent de 9.'},
            ]),
        ],
        a_toi=[
            q('f(x) = 3x − 2. f(5) = ?', ['13', '15', '1'], '3 × 5 − 2.'),
            q('Un nombre a, par une fonction :', ['une seule image', 'plusieurs images', 'aucune image'], 'C’est la définition d’une fonction.'),
            q('f(x) = 5x. Un antécédent de 20 est :', ['4', '100', '15'], '5 × 4 = 20.'),
        ],
        sources=[ref('MA-C4-3E-FONC-51', 'Image et antécédent')]),

    'MA-C4-3E-LIN-51': dict(duree=6, essentiel=
        'Une fonction linéaire s’écrit f(x) = ax ; a est son coefficient.\n'
        'Elle traduit une situation de proportionnalité : a est le coefficient de proportionnalité. Sa représentation graphique est une droite qui passe par l’origine.\n'
        'f(x) = 3x : f(4) = 12. Si f(5) = 10, alors a = 10 ÷ 5 = 2.',
        parties=[
            ('Calculer et retrouver a', [
                {'type': 'tableau', 'titre': 'f(x) = 3x', 'colonnes': ['x', '−1', '0', '2', '4'], 'lignes': [
                    ['f(x)', '−3', '0', '6', '12']]},
                bq('f est linéaire et f(6) = 15. Le coefficient a vaut :', ['2,5', '9', '90'], '15 ÷ 6.'),
            ]),
            ('Pourcentages et fonctions linéaires', [
                {'type': 'explique', 'texte': 'Augmenter un prix de 20 %, c’est appliquer la fonction linéaire f(x) = 1,2x.'},
                {'type': 'piege', 'erreur': 'On croit que f(x) = 2x + 3 est linéaire.', 'correction': 'f(0) = 3 ≠ 0 : sa droite ne passe pas par l’origine. Elle est affine, pas linéaire.'},
            ]),
        ],
        a_toi=[
            q('La droite d’une fonction linéaire passe toujours par :', ['l’origine du repère', 'le point (1 ; 1)', 'le point (0 ; 1)'], 'f(0) = a × 0 = 0.'),
            q('f(x) = −2x. f(−3) = ?', ['6', '−6', '−5'], '(−2) × (−3).'),
            q('Une baisse de 10 % est traduite par :', ['f(x) = 0,9x', 'f(x) = 0,1x', 'f(x) = x − 10'], 'Coefficient 1 − 0,1.'),
        ],
        sources=[ref('MA-C4-3E-LIN-51', 'Fonctions linéaires')]),

    'MA-C4-3E-AFF-51': dict(duree=7, essentiel=
        'Une fonction affine s’écrit f(x) = ax + b. Sa représentation graphique est une droite.\n'
        'a est le coefficient directeur : il donne la pente. b est l’ordonnée à l’origine : f(0) = b.\n'
        'f(x) = 2x − 3 : a = 2 et b = −3.',
        parties=[
            ('Reconnaitre', [
                {'type': 'tableau', 'titre': 'Des fonctions', 'colonnes': ['Fonction', 'a', 'b', 'Type'], 'lignes': [
                    ['f(x) = 2x − 3', '2', '−3', 'affine'], ['g(x) = 5x', '5', '0', 'linéaire, donc affine'], ['h(x) = 4', '0', '4', 'constante, donc affine'], ['k(x) = x²', 'aucun', 'aucun', 'ni linéaire ni affine']]},
                bq('Un taxi facture 4 € de prise en charge et 1,50 € par km. Le prix pour x km est :', ['f(x) = 1,5x + 4', 'f(x) = 4x + 1,5', 'f(x) = 5,5x'], 'a = 1,5 par km, b = 4 au départ.'),
            ]),
            ('Retrouver a et b', [
                {'type': 'exemple-resolu', 'enonce': 'f est affine, f(1) = 5 et f(3) = 9. Trouve f(x).', 'etapes': [
                    'a = (9 − 5) ÷ (3 − 1) = 2.', 'f(1) = 2 × 1 + b = 5, donc b = 3.'],
                 'conclusion': 'f(x) = 2x + 3.'},
                {'type': 'piege', 'erreur': 'On lit b comme la valeur de f(1).', 'correction': 'b est la valeur de f en 0 : là où la droite coupe l’axe des ordonnées.'},
            ]),
        ],
        a_toi=[
            q('f(x) = −x + 6. Ordonnée à l’origine :', ['6', '−1', '0'], 'f(0) = 6.'),
            q('Si a > 0, la droite d’une fonction affine :', ['monte de gauche à droite', 'descend', 'est horizontale'], 'La fonction est croissante.'),
            q('f est affine, f(0) = 2 et f(2) = 8. Coefficient a :', ['3', '6', '4'], '(8 − 2) ÷ 2.'),
        ],
        sources=[ref('MA-C4-3E-AFF-51', 'Fonctions affines')]),

    'MA-C4-3E-BOULE-51': dict(duree=6, essentiel=
        'Le volume d’une boule de rayon r est V = 4/3 × π × r³.\n'
        'Boule de rayon 3 cm : 4/3 × π × 27 = 36π ≈ 113 cm³.\n'
        'L’aire de la sphère de rayon r est 4 × π × r².',
        parties=[
            ('Calculer', [
                {'type': 'tableau', 'titre': 'Volumes de boules', 'colonnes': ['Rayon', 'Calcul', 'Volume'], 'lignes': [
                    ['3 cm', '4/3 × π × 27', '36π ≈ 113 cm³'], ['6 cm', '4/3 × π × 216', '288π ≈ 905 cm³'], ['1 m', '4/3 × π × 1', '≈ 4,19 m³']]},
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'boule'}, 'legende': 'Une boule : tous ses points sont à une distance du centre inférieure ou égale au rayon.'},
                bq('Une balle a un diamètre de 10 cm. Le rayon à utiliser est :', ['5 cm', '10 cm', '20 cm'], 'Le rayon vaut la moitié du diamètre.'),
            ]),
            ('L’effet du rayon', [
                {'type': 'explique', 'texte': 'Quand le rayon double, le volume est multiplié par 2³ = 8. Une boule de rayon 6 cm contient 8 fois plus qu’une boule de rayon 3 cm.'},
                {'type': 'piege', 'erreur': 'On met le rayon au carré dans la formule du volume.', 'correction': 'Le volume utilise r³. Le carré r² sert pour l’aire de la sphère.'},
            ]),
        ],
        a_toi=[
            q('Si le rayon d’une boule est multiplié par 3, son volume est multiplié par :', ['27', '9', '3'], '3³ = 27.'),
            q('Le volume d’une boule de rayon r est :', ['4/3 × π × r³', '4 × π × r²', 'π × r²'], 'Le cube du rayon.'),
            q('Volume exact d’une boule de rayon 3 cm :', ['36π cm³', '12π cm³', '27π cm³'], '4/3 × 27 = 36.'),
        ],
        sources=[ref('MA-C4-3E-BOULE-51', 'Volume de la boule')]),

    'MA-C4-3E-SECT-51': dict(duree=6, essentiel=
        'La sphère est formée des points situés à une même distance du centre ; la boule contient aussi tous les points intérieurs.\n'
        'Un plan coupe une sphère selon un cercle et une boule selon un disque.\n'
        'La section d’un pavé par un plan parallèle à une face est un rectangle identique à cette face.',
        parties=[
            ('Nature des sections', [
                {'type': 'tableau', 'titre': 'Sections planes', 'colonnes': ['Solide', 'Plan', 'Section'], 'lignes': [
                    ['pavé', 'parallèle à une face', 'rectangle identique à la face'], ['pavé', 'parallèle à une arête', 'rectangle'], ['cylindre', 'perpendiculaire à l’axe', 'disque de même rayon'], ['cylindre', 'parallèle à l’axe', 'rectangle'], ['boule', 'quelconque', 'disque']]},
                bq('Un plan perpendiculaire à l’axe d’un cylindre le coupe selon :', ['un disque de même rayon', 'un rectangle', 'un triangle'], 'Comme une tranche de saucisson.'),
            ]),
            ('Calculer le rayon d’une section', [
                {'type': 'exemple-resolu', 'enonce': 'Une boule de centre O a un rayon de 5 cm. Un plan la coupe à 3 cm de O. Quel est le rayon de la section ?', 'etapes': [
                    'Le centre O, le centre H de la section et un point M du bord forment un triangle rectangle en H.', 'OM² = OH² + HM², soit 25 = 9 + HM².', 'HM² = 16, donc HM = 4.'],
                 'conclusion': 'La section est un disque de rayon 4 cm.'},
                {'type': 'piege', 'erreur': 'On croit que toutes les sections d’une boule ont le même rayon.', 'correction': 'Plus le plan est loin du centre, plus la section est petite. Elle est la plus grande quand le plan passe par le centre.'},
            ]),
        ],
        a_toi=[
            q('Un plan qui passe par le centre d’une sphère la coupe selon :', ['un grand cercle', 'un point', 'un petit cercle'], 'Même rayon que la sphère.'),
            q('Un plan parallèle à l’axe d’un cylindre le coupe selon :', ['un rectangle', 'un disque', 'un cercle'], 'Ses côtés sont la hauteur et une corde de la base.'),
            q('La différence entre sphère et boule :', ['la boule contient l’intérieur', 'la sphère est plus grande', 'aucune'], 'La sphère est seulement la surface.'),
        ],
        sources=[ref('MA-C4-3E-SECT-51', 'Sphère, boule, sections')]),

    'MA-C4-3E-THAL-51': dict(duree=8, essentiel=
        'Les droites (BM) et (CN) se coupent en A. Si (MN) et (BC) sont parallèles, alors AM/AB = AN/AC = MN/BC.\n'
        'Le théorème s’applique aussi quand A est entre M et B : c’est la configuration du papillon.\n'
        'Sa réciproque prouve un parallélisme si les points sont alignés dans le même ordre.',
        parties=[
            ('La configuration du papillon', [
                {'type': 'visuel', 'visuel': figure(9, 7,
                    seg((1, 6), (8, 6)), seg((3, 1), (5.5, 1), accent=True), seg((1, 6), (5.5, 1)), seg((8, 6), (3, 1)),
                    pt(1, 6, 'B'), pt(8, 6, 'C'), pt(4.32, 2.32, 'A'), pt(5.5, 1, 'M'), pt(3, 1, 'N')),
                 'legende': 'A est entre B et M, et entre C et N. (MN) est parallèle à (BC).'},
                {'type': 'exemple-resolu', 'enonce': 'AM = 2 cm, AB = 6 cm, BC = 9 cm, et (MN) // (BC). Calcule MN.', 'etapes': [
                    'Les droites (BM) et (CN) se coupent en A, et (MN) // (BC).', 'D’après le théorème de Thalès : AM/AB = MN/BC.', '2/6 = MN/9, donc MN = 9 × 2 ÷ 6 = 3.'],
                 'conclusion': 'MN = 3 cm.'},
                bq('Dans cette figure, AN = 1,5 cm. AC = ?', ['4,5 cm', '0,5 cm', '3 cm'], 'AN/AC = 2/6, donc AC = 1,5 × 3.'),
            ]),
            ('La réciproque', [
                {'type': 'explique', 'texte': 'Si AM/AB = AN/AC et si les points A, M, B et A, N, C sont dans le même ordre, alors (MN) et (BC) sont parallèles.'},
                {'type': 'piege', 'erreur': 'On applique la réciproque sans vérifier l’ordre des points.', 'correction': 'Des quotients égaux ne suffisent pas : M et N doivent être du même côté de A, ou tous deux de l’autre côté.'},
            ]),
        ],
        a_toi=[
            q('Pour appliquer le théorème de Thalès, il faut :', ['deux droites parallèles', 'un angle droit', 'un triangle isocèle'], '(MN) // (BC).'),
            q('AM/AB = 3/5 et BC = 10 cm, avec (MN) // (BC). MN = ?', ['6 cm', '16,7 cm', '15 cm'], '10 × 3 ÷ 5.'),
            q('AM/AB = 0,4 et AN/AC = 0,5. Les droites (MN) et (BC) sont :', ['non parallèles', 'parallèles', 'perpendiculaires'], 'Les quotients sont différents.'),
        ],
        sources=[ref('MA-C4-3E-THAL-51', 'Théorème de Thalès')]),

    'MA-C4-3E-TRIG-51': dict(duree=8, essentiel=
        'Dans un triangle rectangle, pour un angle aigu : cosinus = adjacent ÷ hypoténuse ; sinus = opposé ÷ hypoténuse ; tangente = opposé ÷ adjacent.\n'
        'ABC rectangle en A : sin(ABC) = AC/BC ; tan(ABC) = AC/AB.\n'
        'On choisit la formule qui relie la longueur cherchée aux données.',
        parties=[
            ('Choisir la bonne formule', [
                {'type': 'tableau', 'titre': 'Angle B, triangle rectangle en A', 'colonnes': ['Rapport', 'Formule', 'Côtés'], 'lignes': [
                    ['cosinus', 'AB/BC', 'adjacent sur hypoténuse'], ['sinus', 'AC/BC', 'opposé sur hypoténuse'], ['tangente', 'AC/AB', 'opposé sur adjacent']]},
                bq('On connait l’hypoténuse et l’angle B. On cherche le côté opposé à B. On utilise :', ['le sinus', 'le cosinus', 'la tangente'], 'Opposé et hypoténuse.'),
            ]),
            ('Des calculs', [
                {'type': 'exemple-resolu', 'enonce': 'On se place à 20 m d’un arbre. On voit son sommet sous un angle de 35°. Quelle est sa hauteur ?', 'etapes': [
                    'Le triangle est rectangle au pied de l’arbre.', 'tan(35°) = hauteur ÷ 20.', 'hauteur = 20 × tan(35°) ≈ 14,0.'],
                 'conclusion': 'L’arbre mesure environ 14 m.'},
                {'type': 'explique', 'texte': 'Pour trouver un angle, on utilise la touche inverse : si tan(B) = 3/4, alors B ≈ 36,9°.'},
                {'type': 'piege', 'erreur': 'On utilise une formule de trigonométrie dans un triangle qui n’est pas rectangle.', 'correction': 'Ces formules ne valent que dans un triangle rectangle.'},
            ]),
        ],
        a_toi=[
            q('BC = 10 cm et l’angle B mesure 30°. AC = BC × sin(30°) = ?', ['5 cm', '8,66 cm', '20 cm'], 'sin(30°) = 0,5.'),
            q('La tangente d’un angle aigu est :', ['opposé ÷ adjacent', 'adjacent ÷ hypoténuse', 'opposé ÷ hypoténuse'], 'Elle n’utilise pas l’hypoténuse.'),
            q('cos(B) = 0,5. L’angle B mesure :', ['60°', '30°', '45°'], 'cos(60°) = 0,5.'),
        ],
        sources=[ref('MA-C4-3E-TRIG-51', 'Trigonométrie')]),

    'MA-C4-3E-SEMB-51': dict(duree=7, essentiel=
        'Deux triangles sont semblables s’ils ont leurs angles deux à deux égaux.\n'
        'De façon équivalente, leurs côtés sont proportionnels : 3, 4, 5 et 6, 8, 10 forment des triangles semblables, de rapport 2.\n'
        'On utilise ce rapport pour calculer une longueur.',
        parties=[
            ('Reconnaitre', [
                {'type': 'tableau', 'titre': 'Deux critères', 'colonnes': ['Critère', 'Exemple'], 'lignes': [
                    ['angles deux à deux égaux', '40°, 60°, 80° et 40°, 60°, 80°'], ['côtés proportionnels', '3, 4, 5 et 6, 8, 10 : rapport 2']]},
                bq('Deux triangles ont deux angles de 50° et 70°. Leurs troisièmes angles :', ['sont égaux, les triangles sont semblables', 'sont différents', 'mesurent 50°'], '180 − 50 − 70 = 60° dans les deux.'),
            ]),
            ('Calculer', [
                {'type': 'exemple-resolu', 'enonce': 'ABC et DEF sont semblables. AB = 4, BC = 6 ; DE = 6, côté homologue de AB. Calcule EF.', 'etapes': [
                    'Rapport : DE ÷ AB = 6 ÷ 4 = 1,5.', 'EF = BC × 1,5 = 6 × 1,5 = 9.'],
                 'conclusion': 'EF = 9.'},
                {'type': 'piege', 'erreur': 'On associe les côtés dans le désordre.', 'correction': 'On associe les côtés homologues : ceux qui sont opposés aux angles égaux.'},
            ]),
        ],
        a_toi=[
            q('Côtés 5, 7, 9 et 10, 14, 18 : les triangles sont :', ['semblables', 'non semblables', 'identiques'], 'Rapport 2 pour chaque côté.'),
            q('Deux triangles semblables de rapport 3. Un côté de 2 cm devient :', ['6 cm', '5 cm', '18 cm'], '2 × 3.'),
            q('Deux triangles semblables ont toujours :', ['les mêmes angles', 'les mêmes côtés', 'la même aire'], 'Leurs angles sont égaux deux à deux.'),
        ],
        sources=[ref('MA-C4-3E-SEMB-51', 'Triangles semblables')]),

    'MA-C4-3E-HOM-51': dict(duree=7, essentiel=
        'Une rotation fait tourner une figure autour d’un centre, d’un angle donné. Elle conserve les longueurs, les angles et les aires.\n'
        'Une homothétie de centre O et de rapport k agrandit ou réduit une figure : les longueurs sont multipliées par |k|, les aires par k².\n'
        'Si k < 0, l’image est de l’autre côté de O. Rapport −2 : longueurs × 2, aires × 4.',
        parties=[
            ('Rotation et homothétie', [
                {'type': 'tableau', 'titre': 'Ce que conservent les transformations', 'colonnes': ['Transformation', 'Longueurs', 'Angles', 'Aires'], 'lignes': [
                    ['rotation', 'conservées', 'conservés', 'conservées'], ['homothétie de rapport k', '× |k|', 'conservés', '× k²']]},
                bq('Homothétie de rapport 0,5. Une aire de 20 cm² devient :', ['5 cm²', '10 cm²', '40 cm²'], '20 × 0,5².'),
            ]),
            ('Le signe du rapport', [
                {'type': 'explique', 'texte': 'Avec k = 3, l’image de A est sur la demi-droite [OA), trois fois plus loin. Avec k = −3, elle est de l’autre côté de O.'},
                {'type': 'explique', 'texte': 'La symétrie centrale est à la fois une rotation de 180° et une homothétie de rapport −1.'},
                {'type': 'piege', 'erreur': 'On croit qu’un rapport négatif réduit les longueurs.', 'correction': 'Le signe indique le côté de O. C’est la valeur absolue qui agrandit ou réduit.'},
            ]),
        ],
        a_toi=[
            q('Une rotation de 90° transforme un segment de 4 cm en un segment de :', ['4 cm', '8 cm', '2 cm'], 'Les longueurs sont conservées.'),
            q('Homothétie de rapport −3. Une longueur de 2 cm devient :', ['6 cm', '−6 cm', '9 cm'], 'On multiplie par |−3| = 3.'),
            q('Une homothétie conserve :', ['les angles', 'les longueurs', 'les aires'], 'Seule la taille change.'),
        ],
        sources=[ref('MA-C4-3E-HOM-51', 'Homothéties et rotations')]),

    'MA-C4-3E-GEO-01': dict(duree=6, essentiel=
        'Sur la Terre, un point est repéré par sa latitude et sa longitude.\n'
        'La latitude mesure l’écart à l’équateur, de 0° à 90° Nord ou Sud. La longitude mesure l’écart au méridien de Greenwich, de 0° à 180° Est ou Ouest.\n'
        'Paris est à environ 49° N et 2° E.',
        parties=[
            ('Parallèles et méridiens', [
                {'type': 'tableau', 'titre': 'Les repères', 'colonnes': ['Ligne', 'Ce qu’elle repère', 'Ligne de référence'], 'lignes': [
                    ['parallèle', 'la latitude', 'l’équateur, 0°'], ['méridien', 'la longitude', 'le méridien de Greenwich, 0°']]},
                bq('Le pôle Nord a pour latitude :', ['90° N', '0°', '180° E'], 'Il est le plus loin possible de l’équateur, au nord.'),
            ]),
            ('Lire des coordonnées', [
                {'type': 'tableau', 'titre': 'Quelques villes', 'colonnes': ['Ville', 'Latitude', 'Longitude'], 'lignes': [
                    ['Paris', 'environ 49° N', 'environ 2° E'], ['Quito', 'environ 0°', 'environ 78° O'], ['Sydney', 'environ 34° S', 'environ 151° E']]},
                {'type': 'piege', 'erreur': 'On inverse latitude et longitude.', 'correction': 'La latitude se lit nord ou sud, la longitude est ou ouest. On donne d’abord la latitude.'},
            ]),
        ],
        a_toi=[
            q('Quito est presque sur l’équateur. Sa latitude est proche de :', ['0°', '90°', '180°'], 'L’équateur a pour latitude 0°.'),
            q('La longitude se mesure à partir :', ['du méridien de Greenwich', 'de l’équateur', 'du pôle Sud'], 'Près de Londres.'),
            q('Une ville à 34° S est située :', ['dans l’hémisphère Sud', 'dans l’hémisphère Nord', 'sur l’équateur'], 'S comme Sud.'),
        ],
        sources=[ref('MA-C4-3E-GEO-01', 'Latitude et longitude')]),

    'MA-C4-3E-ALGO-01': dict(duree=7, essentiel=
        'Un long programme se décompose en sous-programmes, chacun chargé d’une tâche.\n'
        'Une boucle « répéter jusqu’à » s’arrête quand une condition devient vraie ; une condition « si… alors… sinon » choisit entre deux actions.\n'
        'Répéter jusqu’à n = 1 : si n est pair alors n ← n ÷ 2, sinon n ← 3n + 1.',
        parties=[
            ('Suivre le programme', [
                {'type': 'tableau', 'titre': 'Départ n = 6', 'colonnes': ['Étape', 'n pair ?', 'Nouvelle valeur'], 'lignes': [
                    ['1', 'oui', '3'], ['2', 'non', '10'], ['3', 'oui', '5'], ['4', 'non', '16'], ['5 à 8', 'oui', '8, 4, 2, 1']]},
                bq('Combien d’étapes pour passer de 6 à 1 ?', ['8', '6', '16'], '6, 3, 10, 5, 16, 8, 4, 2, 1.'),
            ]),
            ('Décomposer', [
                {'type': 'methode', 'titre': 'Dessiner une rangée de maisons', 'etapes': [
                    'Écris un sous-programme « carré » et un sous-programme « triangle ».', 'Écris « maison » : carré, puis triangle posé dessus.', 'Programme principal : répéter 5 fois maison, puis avancer.']},
                {'type': 'piege', 'erreur': 'On écrit une boucle « répéter jusqu’à » dont la condition ne devient jamais vraie.', 'correction': 'La boucle tourne sans fin. On vérifie que la variable évolue vers la condition d’arrêt.'},
            ]),
        ],
        a_toi=[
            q('Avec ce programme, depuis n = 5, la valeur suivante est :', ['16', '2,5', '15'], '5 est impair : 3 × 5 + 1.'),
            q('Un sous-programme sert à :', ['regrouper des instructions réutilisables', 'arrêter le programme', 'afficher une erreur'], 'On l’appelle autant de fois que nécessaire.'),
            q('« Répéter jusqu’à n = 1 » s’arrête :', ['quand n vaut 1', 'au bout de 10 tours', 'jamais'], 'La condition devient vraie.'),
        ],
        sources=[ref('MA-C4-3E-ALGO-01', 'Boucles et conditions combinées')]),
}

ecrire(COURS)
