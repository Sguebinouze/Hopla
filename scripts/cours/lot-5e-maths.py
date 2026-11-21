"""Lot de cours : maths 5e (programme 2026). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-5e-maths.py
    python3 scripts/cours/pages.py content/cours/MA-C4-5E-*.json

Cycle 4 : phrases de 25 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
Le glossaire n'a pas encore de définitions de cycle 4 : pas de bloc vocabulaire, les définitions sont dans le texte.
"""
from commun import bq, ecrire, q, source_referentiel as ref


def figure(largeur, hauteur, *elements, quadrillage=True):
    return {'type': 'figure', 'largeur': largeur, 'hauteur': hauteur, 'quadrillage': quadrillage, 'elements': list(elements)}


def pt(x, y, nom=None):
    e = {'forme': 'point', 'en': [x, y]}
    if nom:
        e['nom'] = nom
    return e


COURS = {
    'MA-C4-5E-OPE-01': dict(duree=7, essentiel=
        'On effectue d’abord les calculs entre parenthèses.\n'
        'Puis les multiplications et les divisions, de gauche à droite.\n'
        'Enfin les additions et les soustractions, de gauche à droite. 3 + 4 × 5 = 3 + 20 = 23.',
        parties=[
            ('L’ordre des calculs', [
                {'type': 'tableau', 'titre': 'Des exemples', 'colonnes': ['Expression', 'Étapes', 'Résultat'], 'lignes': [
                    ['3 + 4 × 5', '3 + 20', '23'], ['(3 + 4) × 5', '7 × 5', '35'], ['20 − 12 ÷ 4', '20 − 3', '17'], ['18 ÷ 3 × 2', '6 × 2', '12']]},
                bq('30 − 6 × 2 + 1 = ?', ['19', '49', '17'], '6 × 2 = 12, puis 30 − 12 + 1 = 19.'),
            ]),
            ('De gauche à droite', [
                {'type': 'piege', 'erreur': 'On calcule 18 ÷ 3 × 2 en commençant par 3 × 2 : 18 ÷ 6 = 3.', 'correction': 'Multiplication et division ont la même priorité : on va de gauche à droite. 18 ÷ 3 = 6, puis 6 × 2 = 12.'},
            ]),
        ],
        a_toi=[
            q('2 + 3 × 4 = ?', ['14', '20', '24'], 'La multiplication d’abord : 3 × 4 = 12.'),
            q('(2 + 3) × 4 = ?', ['20', '14', '9'], 'La parenthèse d’abord : 5 × 4.'),
            q('24 ÷ 4 × 2 = ?', ['12', '3', '6'], 'De gauche à droite : 24 ÷ 4 = 6, puis 6 × 2 = 12.'),
        ],
        sources=[ref('MA-C4-5E-OPE-01', 'Priorités opératoires')]),

    'MA-C4-5E-OPE-02': dict(duree=6, essentiel=
        'Pour tous nombres k, a et b : k × (a + b) = k × a + k × b. C’est la distributivité.\n'
        'Elle sert à calculer mentalement : 7 × 102 = 7 × 100 + 7 × 2 = 714.\n'
        'Dans l’autre sens, on factorise : 13 × 7 + 13 × 3 = 13 × 10 = 130.',
        parties=[
            ('Développer pour calculer', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 9 × 98 sans poser l’opération.', 'etapes': [
                    '98 = 100 − 2.', '9 × 98 = 9 × 100 − 9 × 2.', '900 − 18 = 882.'],
                 'conclusion': '9 × 98 = 882.'},
                bq('15 × 11 = ?', ['165', '155', '151'], '15 × 10 + 15 × 1 = 150 + 15.'),
            ]),
            ('Factoriser pour calculer', [
                {'type': 'explique', 'texte': '25 × 17 + 25 × 3 : le facteur 25 est commun. On écrit 25 × (17 + 3) = 25 × 20 = 500.'},
                {'type': 'piege', 'erreur': 'On écrit 7 × (100 + 2) = 7 × 100 + 2.', 'correction': 'On multiplie chaque terme de la parenthèse : 7 × 100 + 7 × 2.'},
            ]),
        ],
        a_toi=[
            q('8 × 103 = ?', ['824', '811', '8 024'], '800 + 24.'),
            q('6 × 99 = ?', ['594', '606', '596'], '6 × 100 − 6 × 1 = 600 − 6.'),
            q('25 × 17 + 25 × 3 = ?', ['500', '425', '75'], '25 × (17 + 3) = 25 × 20.'),
        ],
        sources=[ref('MA-C4-5E-OPE-02', 'Distributivité simple')]),

    'MA-C4-5E-DIV-01': dict(duree=6, essentiel=
        'Un nombre est divisible par 2 s’il se termine par 0, 2, 4, 6 ou 8. Par 5, s’il se termine par 0 ou 5. Par 10, s’il se termine par 0.\n'
        'Il est divisible par 3 si la somme de ses chiffres est divisible par 3.\n'
        'Il est divisible par 9 si la somme de ses chiffres est divisible par 9.',
        parties=[
            ('La somme des chiffres', [
                {'type': 'tableau', 'titre': 'Tester 3 et 9', 'colonnes': ['Nombre', 'Somme des chiffres', 'Divisible par 3', 'Divisible par 9'], 'lignes': [
                    ['471', '4 + 7 + 1 = 12', 'oui', 'non'], ['738', '7 + 3 + 8 = 18', 'oui', 'oui'], ['512', '5 + 1 + 2 = 8', 'non', 'non']]},
                bq('Lequel est divisible par 9 ?', ['4 653', '4 652', '1 234'], '4 + 6 + 5 + 3 = 18, divisible par 9.'),
            ]),
            ('Liens entre les critères', [
                {'type': 'explique', 'texte': 'Un nombre divisible par 9 est aussi divisible par 3, car 9 = 3 × 3. L’inverse est faux : 12 est divisible par 3, pas par 9.'},
                {'type': 'piege', 'erreur': 'On regarde le dernier chiffre pour tester la divisibilité par 3 : « 471 finit par 1, donc non ».', 'correction': 'Pour 3 et 9, on additionne tous les chiffres.'},
            ]),
        ],
        a_toi=[
            q('85 est divisible par :', ['5', '2', '3'], 'Il se termine par 5. 8 + 5 = 13 n’est pas divisible par 3.'),
            q('2 340 est divisible par :', ['2, 3, 5, 9 et 10', '2 et 10 seulement', '3 et 9 seulement'], 'Il finit par 0 et 2 + 3 + 4 + 0 = 9.'),
            q('Un nombre divisible par 9 est toujours divisible par :', ['3', '2', '5'], '9 = 3 × 3.'),
        ],
        sources=[ref('MA-C4-5E-DIV-01', 'Critères de divisibilité')]),

    'MA-C4-5E-REL-01': dict(duree=7, essentiel=
        'Deux relatifs de même signe : on additionne leurs distances à zéro et on garde le signe. (−5) + (−3) = −8.\n'
        'Deux relatifs de signes contraires : on soustrait leurs distances à zéro.\n'
        'Le résultat prend le signe de celui qui est le plus loin de zéro. (−7) + (+4) = −3.',
        parties=[
            ('Sur la droite graduée', [
                {'type': 'exemple-resolu', 'enonce': 'Il fait −7 °C. La température monte de 4 degrés. Quelle température fait-il ?', 'etapes': [
                    'On part de −7 sur la droite graduée.', 'On avance de 4 vers la droite : −6, −5, −4, −3.'],
                 'conclusion': '(−7) + (+4) = −3. Il fait −3 °C.'},
                bq('(+6) + (−9) = ?', ['−3', '+3', '−15'], 'Signes contraires : 9 − 6 = 3, signe de −9.'),
            ]),
            ('La règle', [
                {'type': 'tableau', 'titre': 'Additionner deux relatifs', 'colonnes': ['Calcul', 'Signes', 'Résultat'], 'lignes': [
                    ['(−5) + (−3)', 'mêmes', '−8'], ['(+2) + (+7)', 'mêmes', '+9'], ['(−7) + (+4)', 'contraires', '−3'], ['(−2) + (+2)', 'contraires', '0']]},
                {'type': 'piege', 'erreur': 'On écrit (−5) + (−3) = +8 : « moins et moins font plus ».', 'correction': 'Cette phrase ne vaut pas pour l’addition. Deux dettes de 5 € et 3 € font une dette de 8 € : −8.'},
            ]),
        ],
        a_toi=[
            q('(−4) + (−6) = ?', ['−10', '+10', '+2'], 'Même signe : 4 + 6, on garde le signe moins.'),
            q('(+8) + (−3) = ?', ['+5', '−5', '+11'], '8 − 3 = 5, signe de +8.'),
            q('(−12) + (+5) = ?', ['−7', '+7', '−17'], '12 − 5 = 7, signe de −12.'),
        ],
        sources=[ref('MA-C4-5E-REL-01', 'Additionner des relatifs')]),

    'MA-C4-5E-REL-02': dict(duree=6, essentiel=
        'Deux nombres opposés ont la même distance à zéro et des signes contraires : l’opposé de −7 est 7.\n'
        'Un nombre négatif est plus petit qu’un nombre positif.\n'
        'Entre deux négatifs, le plus petit est le plus éloigné de zéro : −5 < −2.',
        parties=[
            ('Comparer', [
                {'type': 'tableau', 'titre': 'Comparer deux relatifs', 'colonnes': ['Cas', 'Exemple'], 'lignes': [
                    ['un négatif et un positif', '−8 < 3'], ['deux positifs', '2,5 < 4'], ['deux négatifs', '−4 < −2,5']]},
                bq('Quel signe entre −7 et −3 ?', ['<', '>', '='], '−7 est plus loin de zéro, à gauche.'),
            ]),
            ('Ranger', [
                {'type': 'exemple-resolu', 'enonce': 'Range dans l’ordre croissant : 0,5 ; −2 ; −3,5.', 'etapes': [
                    'Le seul positif est le plus grand : 0,5.', 'Entre −2 et −3,5, le plus loin de zéro est −3,5.'],
                 'conclusion': '−3,5 < −2 < 0,5.'},
                {'type': 'piege', 'erreur': 'On croit que −5 > −2, car 5 > 2.', 'correction': 'Sur la droite graduée, −5 est à gauche de −2 : −5 < −2.'},
            ]),
        ],
        a_toi=[
            q('L’opposé de −4,2 est :', ['4,2', '−4,2', '0'], 'Même distance à zéro, signe contraire.'),
            q('Range dans l’ordre croissant.', ['−1,5 < −1 < 0,2', '−1 < −1,5 < 0,2', '0,2 < −1 < −1,5'], '−1,5 est plus loin de zéro que −1.'),
            q('Quel est le plus petit ?', ['−9', '−1', '0'], 'Le plus éloigné de zéro, côté négatif.'),
        ],
        sources=[ref('MA-C4-5E-REL-02', 'Opposé, comparer des relatifs')]),

    'MA-C4-5E-REL-03': dict(duree=7, essentiel=
        'Soustraire un nombre, c’est ajouter son opposé : a − b = a + (−b).\n'
        '(−3) − (−8) = (−3) + (+8) = 5.\n'
        'Pour enchainer additions et soustractions, on transforme d’abord chaque soustraction en addition.',
        parties=[
            ('Ajouter l’opposé', [
                {'type': 'tableau', 'titre': 'Transformer la soustraction', 'colonnes': ['Soustraction', 'Addition', 'Résultat'], 'lignes': [
                    ['4 − 9', '4 + (−9)', '−5'], ['(−2) − (+6)', '(−2) + (−6)', '−8'], ['(−3) − (−8)', '(−3) + (+8)', '5']]},
                bq('(−5) − (−2) = ?', ['−3', '−7', '+3'], '(−5) + (+2) = −3.'),
            ]),
            ('Enchainer', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 5 − 8 + 2.', 'etapes': [
                    '5 − 8 = 5 + (−8) = −3.', '−3 + 2 = −1.'],
                 'conclusion': '5 − 8 + 2 = −1.'},
                {'type': 'piege', 'erreur': 'On change le signe du premier nombre aussi : (−3) − (−8) = 3 + 8.', 'correction': 'Seul le nombre soustrait change de signe : (−3) + (+8).'},
            ]),
        ],
        a_toi=[
            q('(+3) − (+7) = ?', ['−4', '+4', '+10'], '3 + (−7) = −4.'),
            q('(−1) − (−1) = ?', ['0', '−2', '+2'], '(−1) + (+1) = 0.'),
            q('2 − 10 + 3 = ?', ['−5', '−11', '5'], '2 − 10 = −8, puis −8 + 3 = −5.'),
        ],
        sources=[ref('MA-C4-5E-REL-03', 'Soustraire des relatifs')]),

    'MA-C4-5E-FRAC-01': dict(duree=7, essentiel=
        'Pour additionner, soustraire ou comparer deux fractions, on les écrit avec le même dénominateur.\n'
        '1/3 + 1/4 = 4/12 + 3/12 = 7/12.\n'
        'On multiplie le numérateur et le dénominateur d’une fraction par le même nombre : sa valeur ne change pas.',
        parties=[
            ('Réduire au même dénominateur', [
                {'type': 'methode', 'titre': 'Pour calculer 5/6 − 1/4', 'etapes': [
                    'Cherche un multiple commun à 6 et 4 : 12.', '5/6 = 10/12 et 1/4 = 3/12.', '10/12 − 3/12 = 7/12.']},
                bq('1/2 + 1/3 = ?', ['5/6', '2/5', '1/6'], '3/6 + 2/6 = 5/6.'),
            ]),
            ('Comparer', [
                {'type': 'exemple-resolu', 'enonce': 'Compare 3/4 et 5/7.', 'etapes': [
                    'Dénominateur commun : 28.', '3/4 = 21/28 et 5/7 = 20/28.', '21/28 > 20/28.'],
                 'conclusion': '3/4 > 5/7.'},
                {'type': 'piege', 'erreur': 'On additionne les dénominateurs : 1/3 + 1/4 = 2/7.', 'correction': 'On ne peut additionner que des parts de même taille : on passe en douzièmes.'},
            ]),
        ],
        a_toi=[
            q('3/4 − 1/6 = ?', ['7/12', '2/2', '1/12'], '9/12 − 2/12 = 7/12.'),
            q('Quel signe entre 2/3 et 5/8 ?', ['>', '<', '='], '16/24 > 15/24.'),
            q('2/5 + 1/10 = ?', ['1/2', '3/15', '3/10'], '4/10 + 1/10 = 5/10 = 1/2.'),
        ],
        sources=[ref('MA-C4-5E-FRAC-01', 'Additionner et comparer des fractions')]),

    'MA-C4-5E-PUIS-01': dict(duree=6, essentiel=
        'Le carré d’un nombre est ce nombre multiplié par lui-même : 7² = 7 × 7 = 49.\n'
        'Le cube de 10 est 10³ = 10 × 10 × 10 = 1 000.\n'
        'Dans un calcul, la puissance passe avant la multiplication : 2 × 3² = 2 × 9 = 18.',
        parties=[
            ('Les carrés à connaitre', [
                {'type': 'tableau', 'titre': 'Carrés de 0 à 12', 'colonnes': ['n', '0 à 4', '5 à 8', '9 à 12'], 'lignes': [
                    ['n²', '0 ; 1 ; 4 ; 9 ; 16', '25 ; 36 ; 49 ; 64', '81 ; 100 ; 121 ; 144']]},
                bq('9² = ?', ['81', '18', '99'], '9 × 9 = 81.'),
            ]),
            ('Priorité des puissances', [
                {'type': 'tableau', 'titre': 'Avec ou sans parenthèses', 'colonnes': ['Expression', 'Calcul', 'Résultat'], 'lignes': [
                    ['2 × 3²', '2 × 9', '18'], ['(2 × 3)²', '6²', '36'], ['3 + 4²', '3 + 16', '19']]},
                {'type': 'piege', 'erreur': 'On écrit 7² = 14.', 'correction': '7² = 7 × 7 = 49. Le 2 ne multiplie pas : il dit combien de fois on écrit 7.'},
            ]),
        ],
        a_toi=[
            q('12² = ?', ['144', '24', '122'], '12 × 12 = 144.'),
            q('3 + 4² = ?', ['19', '49', '11'], 'La puissance d’abord : 4² = 16.'),
            q('2³ = ?', ['8', '6', '9'], '2 × 2 × 2 = 8.'),
        ],
        sources=[ref('MA-C4-5E-PUIS-01', 'Carrés et cubes')]),

    'MA-C4-5E-LIT-01': dict(duree=6, essentiel=
        'Une expression littérale contient une ou plusieurs lettres qui représentent des nombres.\n'
        '3x signifie 3 × x. x² signifie x × x.\n'
        'Pour calculer sa valeur, on remplace la lettre par le nombre donné : pour x = 4, 3x + 5 = 3 × 4 + 5 = 17.',
        parties=[
            ('Remplacer la lettre', [
                {'type': 'tableau', 'titre': 'Pour x = 3', 'colonnes': ['Expression', 'Calcul', 'Valeur'], 'lignes': [
                    ['2x + 1', '2 × 3 + 1', '7'], ['x²', '3 × 3', '9'], ['4(x + 2)', '4 × (3 + 2)', '20'], ['10 − x', '10 − 3', '7']]},
                bq('Pour x = 5, 2x − 1 = ?', ['9', '24', '4'], '2 × 5 − 1 = 9.'),
            ]),
            ('Le signe × caché', [
                {'type': 'piege', 'erreur': 'Pour x = 4, on lit 3x comme 34.', 'correction': '3x = 3 × x = 3 × 4 = 12. On rétablit le signe ×.'},
            ]),
        ],
        a_toi=[
            q('Pour x = 4, x² + 1 = ?', ['17', '9', '81'], '4 × 4 + 1 = 17.'),
            q('Pour a = 2, 5a = ?', ['10', '52', '7'], '5 × 2 = 10.'),
            q('Pour x = 0, 7x + 3 = ?', ['3', '10', '73'], '7 × 0 + 3 = 3.'),
        ],
        sources=[ref('MA-C4-5E-LIT-01', 'Substituer une valeur')]),

    'MA-C4-5E-LIT-02': dict(duree=7, essentiel=
        'Réduire, c’est regrouper les termes de même nature : 5x + 2x = 7x.\n'
        'Développer, c’est appliquer la distributivité : 3(2x + 4) = 6x + 12.\n'
        'Factoriser, c’est faire l’inverse : 4x + 8 = 4(x + 2).',
        parties=[
            ('Réduire', [
                {'type': 'tableau', 'titre': 'Peut-on réduire ?', 'colonnes': ['Expression', 'Réduite'], 'lignes': [
                    ['5x + 2x', '7x'], ['6x − 2x', '4x'], ['3x + 4', 'déjà réduite'], ['2x + 3 + x + 1', '3x + 4']]},
                bq('Réduis 9a − 4a.', ['5a', '5', '13a'], '9 − 4 = 5, on garde a.'),
            ]),
            ('Développer et factoriser', [
                {'type': 'exemple-resolu', 'enonce': 'Développe 2(x + 7), puis factorise 3x + 12.', 'etapes': [
                    '2(x + 7) = 2 × x + 2 × 7 = 2x + 14.', '3x + 12 = 3 × x + 3 × 4 = 3(x + 4).'],
                 'conclusion': 'Développer et factoriser sont deux sens de la même égalité.'},
                {'type': 'piege', 'erreur': 'On réduit 3x + 4 en 7x.', 'correction': '3x et 4 ne sont pas de même nature : on ne peut pas les additionner.'},
            ]),
        ],
        a_toi=[
            q('Développe 5(x + 3).', ['5x + 15', '5x + 3', '8x'], '5 × x + 5 × 3.'),
            q('Factorise 6x + 18.', ['6(x + 3)', '6(x + 18)', '24x'], '18 = 6 × 3.'),
            q('Réduis x + x + x.', ['3x', 'x³', '3 + x'], 'Trois fois x.'),
        ],
        sources=[ref('MA-C4-5E-LIT-02', 'Développer, factoriser, réduire')]),

    'MA-C4-5E-EQ-01': dict(duree=7, essentiel=
        'Résoudre une équation, c’est trouver la valeur de l’inconnue qui rend l’égalité vraie.\n'
        'Pour x + b = c, on soustrait b : x = c − b. Pour ax = c, on divise par a : x = c ÷ a.\n'
        'On vérifie toujours en remplaçant x par la solution.',
        parties=[
            ('Résoudre', [
                {'type': 'tableau', 'titre': 'Deux types d’équations', 'colonnes': ['Équation', 'Opération', 'Solution'], 'lignes': [
                    ['x + 7 = 15', '15 − 7', 'x = 8'], ['x + 9 = 4', '4 − 9', 'x = −5'], ['3x = 21', '21 ÷ 3', 'x = 7'], ['4x = 10', '10 ÷ 4', 'x = 2,5']]},
                bq('Résous 5x = 35.', ['x = 7', 'x = 30', 'x = 175'], '35 ÷ 5 = 7. Vérification : 5 × 7 = 35.'),
            ]),
            ('Mettre un problème en équation', [
                {'type': 'exemple-resolu', 'enonce': 'Léa gagne 12 billes et en a maintenant 30. Combien en avait-elle ?', 'etapes': [
                    'Je note x le nombre de billes au départ.', 'x + 12 = 30.', 'x = 30 − 12 = 18.', 'Vérification : 18 + 12 = 30.'],
                 'conclusion': 'Léa avait 18 billes.'},
                {'type': 'piege', 'erreur': 'Pour 3x = 21, on soustrait 3 : x = 18.', 'correction': '3x veut dire 3 × x : on divise par 3.'},
            ]),
        ],
        a_toi=[
            q('Résous x + 9 = 4.', ['x = −5', 'x = 13', 'x = 5'], '4 − 9 = −5.'),
            q('Résous 4x = 10.', ['x = 2,5', 'x = 6', 'x = 40'], '10 ÷ 4 = 2,5.'),
            q('Trois cahiers identiques coutent 7,50 €. Quelle équation donne le prix x d’un cahier ?', ['3x = 7,5', 'x + 3 = 7,5', 'x = 3 × 7,5'], '3 fois le prix d’un cahier donne 7,50 €.'),
        ],
        sources=[ref('MA-C4-5E-EQ-01', 'Équations x + b = c et ax = c')]),

    'MA-C4-5E-VOL-01': dict(duree=8, essentiel=
        'Volume d’un pavé droit : longueur × largeur × hauteur. Volume d’un cube : côté × côté × côté.\n'
        'Volume d’un prisme droit ou d’un cylindre : aire de la base × hauteur. Pour le cylindre, l’aire de la base est π × r².\n'
        '1 dm³ = 1 L = 1 000 cm³ ; 1 cm³ = 1 mL.',
        parties=[
            ('Des formules', [
                {'type': 'tableau', 'titre': 'Volumes', 'colonnes': ['Solide', 'Formule', 'Exemple'], 'lignes': [
                    ['pavé droit', 'L × l × h', '5 × 4 × 3 = 60 cm³'], ['cube', 'c × c × c', '3 × 3 × 3 = 27 cm³'],
                    ['prisme droit', 'aire de la base × h', '6 cm² × 10 cm = 60 cm³'], ['cylindre', 'π × r² × h', 'π × 2² × 5 = 20π ≈ 62,8 cm³']]},
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'cylindre'}, 'legende': 'Un cylindre : deux disques de même rayon et une hauteur.'},
                bq('Volume d’un pavé de 10 cm × 5 cm × 2 cm :', ['100 cm³', '17 cm³', '50 cm³'], '10 × 5 × 2 = 100.'),
            ]),
            ('Volumes et capacités', [
                {'type': 'tableau', 'titre': 'Correspondances', 'colonnes': ['Volume', 'Capacité'], 'lignes': [
                    ['1 m³', '1 000 L'], ['1 dm³', '1 L'], ['1 cm³', '1 mL']]},
                {'type': 'piege', 'erreur': 'On convertit 1 dm³ en 10 cm³, comme 1 dm = 10 cm.', 'correction': '1 dm³ = 10 cm × 10 cm × 10 cm = 1 000 cm³.'},
            ]),
        ],
        a_toi=[
            q('Volume d’un cube de 3 cm de côté :', ['27 cm³', '9 cm³', '18 cm³'], '3 × 3 × 3.'),
            q('2,5 L = ?', ['2 500 cm³', '250 cm³', '25 cm³'], '1 L = 1 000 cm³.'),
            q('Un prisme droit a une base de 8 cm² et une hauteur de 5 cm. Son volume :', ['40 cm³', '13 cm³', '80 cm³'], 'Aire de la base × hauteur.'),
        ],
        sources=[ref('MA-C4-5E-VOL-01', 'Volumes et capacités')]),

    'MA-C4-5E-SYM-01': dict(duree=7, essentiel=
        'Le symétrique du point A par rapport au point O est le point A′ tel que O est le milieu de [AA′].\n'
        'La symétrie centrale est un demi-tour autour de O.\n'
        'Elle conserve les longueurs, les angles, les aires et l’alignement. L’image d’une droite est une droite parallèle.',
        parties=[
            ('Construire le symétrique d’un point', [
                {'type': 'visuel', 'visuel': figure(8, 6, {'forme': 'segment', 'de': [1, 1], 'a': [7, 5]}, pt(1, 1, 'A'), pt(4, 3, 'O'), pt(7, 5, 'A′')),
                 'legende': 'O est le milieu de [AA′] : 3 carreaux à droite et 2 vers le bas, deux fois.'},
                {'type': 'methode', 'titre': 'Avec la règle et le compas', 'etapes': [
                    'Trace la demi-droite [AO).', 'Reporte la longueur AO de l’autre côté de O, au compas.', 'Place A′ : OA′ = OA.']},
                bq('A′ est le symétrique de A par rapport à O. Alors :', ['O est le milieu de [AA′]', 'A est le milieu de [OA′]', 'AA′ = AO'], 'C’est la définition.'),
            ]),
            ('Ce qui est conservé', [
                {'type': 'tableau', 'titre': 'Propriétés', 'colonnes': ['Figure', 'Image par symétrie centrale'], 'lignes': [
                    ['segment de 4 cm', 'segment de 4 cm'], ['angle de 35°', 'angle de 35°'], ['droite (d)', 'droite parallèle à (d)'], ['cercle de rayon 2 cm', 'cercle de rayon 2 cm']]},
                {'type': 'piege', 'erreur': 'On confond avec la symétrie axiale et on « plie ».', 'correction': 'La symétrie centrale est un demi-tour autour d’un point, pas un pliage le long d’une droite.'},
            ]),
        ],
        a_toi=[
            q('Par symétrie centrale, un segment de 5 cm a pour image :', ['un segment de 5 cm', 'un segment de 10 cm', 'un point'], 'Les longueurs sont conservées.'),
            q('Le symétrique de O par rapport à O est :', ['O lui-même', 'aucun point', 'un point à 1 cm'], 'Le centre ne bouge pas.'),
            q('L’image d’une droite par une symétrie centrale est :', ['une droite parallèle', 'une droite perpendiculaire', 'un cercle'], 'Le demi-tour garde la direction.'),
        ],
        sources=[ref('MA-C4-5E-SYM-01', 'Symétrie centrale')]),

    'MA-C4-5E-ANG-01': dict(duree=7, essentiel=
        'Deux droites coupées par une sécante forment des angles alternes-internes et des angles correspondants.\n'
        'Si les deux droites sont parallèles, ces angles sont égaux deux à deux.\n'
        'Réciproquement, si deux angles alternes-internes ou correspondants sont égaux, les droites sont parallèles.',
        parties=[
            ('Reconnaitre les angles', [
                {'type': 'tableau', 'titre': 'Deux droites (d) et (d′), une sécante (s)', 'colonnes': ['Angles', 'Position'], 'lignes': [
                    ['alternes-internes', 'de part et d’autre de (s), entre (d) et (d′)'], ['correspondants', 'du même côté de (s), l’un entre les droites, l’autre à l’extérieur, à la même place sur chaque droite']]},
                bq('(d) et (d′) sont parallèles. Un angle mesure 65°. Son correspondant mesure :', ['65°', '115°', '25°'], 'Droites parallèles : angles correspondants égaux.'),
            ]),
            ('Prouver un parallélisme', [
                {'type': 'exemple-resolu', 'enonce': 'Deux angles alternes-internes mesurent 48° et 48°. Les droites sont-elles parallèles ?', 'etapes': [
                    'Les angles alternes-internes sont égaux.', 'Propriété : si deux angles alternes-internes sont égaux, les droites sont parallèles.'],
                 'conclusion': 'Les droites sont parallèles.'},
                {'type': 'piege', 'erreur': 'On affirme que deux angles alternes-internes sont toujours égaux.', 'correction': 'Ils ne sont égaux que si les droites sont parallèles.'},
            ]),
        ],
        a_toi=[
            q('Deux angles alternes-internes mesurent 50° et 52°. Les droites sont :', ['non parallèles', 'parallèles', 'perpendiculaires'], 'Les angles ne sont pas égaux.'),
            q('Des angles alternes-internes sont situés :', ['de part et d’autre de la sécante, entre les deux droites', 'du même côté de la sécante', 'hors des deux droites'], 'Alternes : de part et d’autre. Internes : entre les droites.'),
            q('Pour prouver que deux droites sont parallèles, on peut montrer que :', ['deux angles correspondants sont égaux', 'elles se coupent', 'elles sont longues'], 'C’est la réciproque de la propriété.'),
        ],
        sources=[ref('MA-C4-5E-ANG-01', 'Angles et parallélisme')]),

    'MA-C4-5E-TRI-01': dict(duree=7, essentiel=
        'L’aire d’un triangle est égale à base × hauteur ÷ 2.\n'
        'Une hauteur est la droite qui passe par un sommet et qui est perpendiculaire au côté opposé.\n'
        'Une médiane joint un sommet au milieu du côté opposé. La médiatrice d’un côté est perpendiculaire à ce côté en son milieu.',
        parties=[
            ('L’aire', [
                {'type': 'visuel', 'visuel': figure(8, 6, {'forme': 'polygone', 'sommets': [[1, 5], [7, 5], [3, 1]]}, {'forme': 'segment', 'de': [3, 1], 'a': [3, 5], 'accent': True}),
                 'legende': 'Base 6 carreaux, hauteur 4 carreaux : aire 6 × 4 ÷ 2 = 12 carreaux.'},
                bq('Base 10 cm, hauteur 3 cm. Aire du triangle :', ['15 cm²', '30 cm²', '13 cm²'], '10 × 3 ÷ 2 = 15.'),
            ]),
            ('Trois droites remarquables', [
                {'type': 'tableau', 'titre': 'Dans un triangle', 'colonnes': ['Droite', 'Définition'], 'lignes': [
                    ['hauteur', 'passe par un sommet, perpendiculaire au côté opposé'], ['médiane', 'passe par un sommet et le milieu du côté opposé'], ['médiatrice', 'perpendiculaire à un côté, en son milieu']]},
                {'type': 'piege', 'erreur': 'On oublie de diviser par 2 : aire = base × hauteur.', 'correction': 'Le triangle est la moitié d’un rectangle de mêmes base et hauteur : on divise par 2.'},
            ]),
        ],
        a_toi=[
            q('Base 8 cm, hauteur 5 cm. Aire :', ['20 cm²', '40 cm²', '13 cm²'], '8 × 5 ÷ 2 = 20.'),
            q('La droite qui passe par un sommet et le milieu du côté opposé est :', ['une médiane', 'une hauteur', 'une médiatrice'], 'Médiane : milieu.'),
            q('Une hauteur est toujours :', ['perpendiculaire au côté opposé', 'parallèle à un côté', 'de même longueur qu’un côté'], 'Elle forme un angle droit avec la base.'),
        ],
        sources=[ref('MA-C4-5E-TRI-01', 'Aire du triangle, hauteurs')]),

    'MA-C4-5E-PARA-01': dict(duree=7, essentiel=
        'Un parallélogramme a ses côtés opposés parallèles et de même longueur, et ses diagonales qui se coupent en leur milieu.\n'
        'Diagonales de même longueur : rectangle. Diagonales perpendiculaires : losange. Les deux : carré.\n'
        'Aire d’un parallélogramme : base × hauteur.',
        parties=[
            ('Les parallélogrammes particuliers', [
                {'type': 'tableau', 'titre': 'Propriétés des diagonales', 'colonnes': ['Quadrilatère', 'Diagonales'], 'lignes': [
                    ['parallélogramme', 'se coupent en leur milieu'], ['rectangle', 'se coupent en leur milieu, même longueur'],
                    ['losange', 'se coupent en leur milieu, perpendiculaires'], ['carré', 'même milieu, même longueur, perpendiculaires']]},
                bq('Un parallélogramme dont les diagonales sont perpendiculaires est :', ['un losange', 'un rectangle', 'un trapèze'], 'C’est une propriété caractéristique du losange.'),
            ]),
            ('Aire', [
                {'type': 'visuel', 'visuel': figure(9, 6, {'forme': 'polygone', 'sommets': [[1, 5], [6, 5], [8, 1], [3, 1]]}, {'forme': 'segment', 'de': [3, 1], 'a': [3, 5], 'accent': True}),
                 'legende': 'Base 5 carreaux, hauteur 4 carreaux : aire 20 carreaux.'},
                {'type': 'piege', 'erreur': 'On multiplie les deux côtés : 5 × la longueur du côté oblique.', 'correction': 'On multiplie la base par la hauteur, perpendiculaire à la base.'},
            ]),
        ],
        a_toi=[
            q('Un parallélogramme dont les diagonales ont la même longueur est :', ['un rectangle', 'un losange', 'un trapèze'], 'Propriété caractéristique du rectangle.'),
            q('Base 7 cm, hauteur 3 cm. Aire du parallélogramme :', ['21 cm²', '10,5 cm²', '20 cm²'], '7 × 3 = 21.'),
            q('Dans tout parallélogramme, les diagonales :', ['se coupent en leur milieu', 'sont perpendiculaires', 'ont la même longueur'], 'Les deux autres propriétés sont particulières.'),
        ],
        sources=[ref('MA-C4-5E-PARA-01', 'Parallélogrammes')]),

    'MA-C4-5E-STAT-01': dict(duree=7, essentiel=
        'L’effectif d’une valeur est le nombre de fois où elle apparait. L’effectif total est la somme des effectifs.\n'
        'La fréquence est l’effectif divisé par l’effectif total. Elle s’écrit en fraction, en décimal ou en pourcentage.\n'
        'La moyenne est la somme des valeurs divisée par leur nombre : 12, 15, 9 et 16 donnent 52 ÷ 4 = 13.',
        parties=[
            ('Effectifs et fréquences', [
                {'type': 'tableau', 'titre': 'Moyen de transport de 25 élèves', 'colonnes': ['Moyen', 'Effectif', 'Fréquence'], 'lignes': [
                    ['à pied', '10', '10/25 = 0,4 = 40 %'], ['bus', '8', '8/25 = 0,32 = 32 %'], ['voiture', '5', '5/25 = 0,2 = 20 %'], ['vélo', '2', '2/25 = 0,08 = 8 %']]},
                bq('6 élèves sur 24 viennent à vélo. Fréquence :', ['25 %', '6 %', '4 %'], '6 ÷ 24 = 0,25 = 25 %.'),
            ]),
            ('La moyenne', [
                {'type': 'exemple-resolu', 'enonce': 'Notes de Tom : 12, 15, 9, 16. Quelle est sa moyenne ?', 'etapes': [
                    'Somme : 12 + 15 + 9 + 16 = 52.', 'Nombre de notes : 4.', '52 ÷ 4 = 13.'],
                 'conclusion': 'La moyenne est 13.'},
                {'type': 'piege', 'erreur': 'On divise par le nombre de valeurs différentes.', 'correction': 'On divise par le nombre total de valeurs, même si certaines se répètent.'},
            ]),
        ],
        a_toi=[
            q('Moyenne de 8, 10 et 12 :', ['10', '30', '9'], '30 ÷ 3 = 10.'),
            q('La somme de toutes les fréquences vaut :', ['1, soit 100 %', '0', 'l’effectif total'], 'Chaque élève est compté une fois.'),
            q('Moyenne de 5, 5, 5 et 9 :', ['6', '7', '5'], '24 ÷ 4 = 6.'),
        ],
        sources=[ref('MA-C4-5E-STAT-01', 'Fréquences et moyenne')]),

    'MA-C4-5E-PROBA-01': dict(duree=6, essentiel=
        'Une probabilité est un nombre compris entre 0 et 1. Un évènement impossible a pour probabilité 0, un évènement certain 1.\n'
        'Quand toutes les issues ont la même chance, p = nombre d’issues favorables ÷ nombre d’issues possibles.\n'
        'La probabilité de l’évènement contraire est 1 − p.',
        parties=[
            ('Équiprobabilité', [
                {'type': 'visuel', 'visuel': {'type': 'urne', 'boules': [{'couleur': 'rouge', 'nombre': 3}, {'couleur': 'bleue', 'nombre': 5}]},
                 'legende': '8 boules indiscernables au toucher.'},
                {'type': 'tableau', 'titre': 'On tire une boule au hasard', 'colonnes': ['Évènement', 'Probabilité'], 'lignes': [
                    ['tirer une rouge', '3/8'], ['tirer une bleue', '5/8'], ['tirer une verte', '0'], ['tirer une rouge ou une bleue', '1']]},
                bq('Avec un dé équilibré, P(obtenir 4) = ?', ['1/6', '4/6', '1/4'], 'Une issue favorable sur six.'),
            ]),
            ('L’évènement contraire', [
                {'type': 'explique', 'texte': '« Ne pas obtenir 4 » est le contraire de « obtenir 4 ». Sa probabilité est 1 − 1/6 = 5/6.'},
                {'type': 'piege', 'erreur': 'On donne une probabilité de 3/2.', 'correction': 'Une probabilité ne dépasse jamais 1 : le nombre de cas favorables est au plus égal au nombre de cas possibles.'},
            ]),
        ],
        a_toi=[
            q('Avec un dé équilibré, P(obtenir un nombre pair) = ?', ['1/2', '1/6', '2/6'], '3 issues favorables sur 6.'),
            q('P(A) = 0,3. P(contraire de A) = ?', ['0,7', '0,3', '1,3'], '1 − 0,3 = 0,7.'),
            q('Un évènement certain a pour probabilité :', ['1', '0', '100'], 'Il se réalise toujours.'),
        ],
        sources=[ref('MA-C4-5E-PROBA-01', 'Probabilités simples')]),

    'MA-C4-5E-PROP-01': dict(duree=6, essentiel=
        'Prendre t % d’une quantité, c’est la multiplier par t puis diviser par 100 : 20 % de 150 = 150 × 20 ÷ 100 = 30.\n'
        'Pour exprimer une part en pourcentage, on divise la part par le total puis on multiplie par 100.\n'
        '12 élèves sur 30 : 12 ÷ 30 = 0,4, soit 40 %.',
        parties=[
            ('Appliquer un pourcentage', [
                {'type': 'exemple-resolu', 'enonce': 'Un jeu coute 40 €. Il est soldé à −25 %. Quel est son nouveau prix ?', 'etapes': [
                    'Réduction : 40 × 25 ÷ 100 = 10 €.', 'Nouveau prix : 40 − 10 = 30 €.'],
                 'conclusion': 'Le jeu coute 30 €.'},
                bq('10 % de 80 = ?', ['8', '10', '0,8'], '80 × 10 ÷ 100 = 8.'),
            ]),
            ('Calculer un pourcentage', [
                {'type': 'tableau', 'titre': 'Des pourcentages à connaitre', 'colonnes': ['Pourcentage', 'Fraction', 'Exemple sur 60'], 'lignes': [
                    ['50 %', '1/2', '30'], ['25 %', '1/4', '15'], ['10 %', '1/10', '6'], ['75 %', '3/4', '45']]},
                {'type': 'piege', 'erreur': 'On croit qu’une baisse de 20 % puis une hausse de 20 % ramènent au prix de départ.', 'correction': '100 € − 20 % = 80 €, puis 80 € + 20 % = 96 €. Les 20 % ne portent pas sur le même nombre.'},
            ]),
        ],
        a_toi=[
            q('50 % de 36 = ?', ['18', '50', '3,6'], 'La moitié de 36.'),
            q('9 élèves sur 45 portent des lunettes. Pourcentage :', ['20 %', '9 %', '45 %'], '9 ÷ 45 = 0,2.'),
            q('Un pull à 60 € baisse de 10 %. Nouveau prix :', ['54 €', '50 €', '59 €'], '10 % de 60 = 6, et 60 − 6 = 54.'),
        ],
        sources=[ref('MA-C4-5E-PROP-01', 'Pourcentages')]),

    'MA-C4-5E-PROP-02': dict(duree=6, essentiel=
        'Un tableau est de proportionnalité si l’on passe de la première ligne à la seconde en multipliant toujours par le même nombre.\n'
        'Ce nombre est le coefficient de proportionnalité.\n'
        '2 ; 3 ; 5 et 8 ; 12 ; 20 : chaque quotient vaut 4, le tableau est de proportionnalité.',
        parties=[
            ('Tester', [
                {'type': 'tableau', 'titre': 'Proportionnel ?', 'colonnes': ['Ligne 1', 'Ligne 2', 'Quotients', 'Conclusion'], 'lignes': [
                    ['2 ; 3 ; 5', '8 ; 12 ; 20', '4 ; 4 ; 4', 'oui, coefficient 4'], ['1 ; 2 ; 3', '5 ; 8 ; 11', '5 ; 4 ; 3,67', 'non']]},
                bq('Masse (kg) : 2 ; 5. Prix (€) : 7 ; 17,50. Coefficient :', ['3,5', '5', '2,5'], '7 ÷ 2 = 3,5 et 17,5 ÷ 5 = 3,5.'),
            ]),
            ('Utiliser le coefficient', [
                {'type': 'explique', 'texte': 'Avec un coefficient de 3,5 €/kg, 8 kg coutent 8 × 3,5 = 28 €.'},
                {'type': 'piege', 'erreur': 'On conclut à la proportionnalité en vérifiant une seule colonne.', 'correction': 'Il faut que tous les quotients soient égaux.'},
            ]),
        ],
        a_toi=[
            q('3 ; 6 ; 9 et 4 ; 8 ; 12 : ce tableau est-il de proportionnalité ?', ['oui', 'non', 'on ne peut pas savoir'], 'Chaque quotient vaut 4/3.'),
            q('L’âge et la taille d’un enfant sont-ils proportionnels ?', ['non', 'oui', 'toujours'], 'À 10 ans, on ne mesure pas le double de sa taille à 5 ans.'),
            q('Coefficient 1,5. Pour 6, on obtient :', ['9', '7,5', '4'], '6 × 1,5 = 9.'),
        ],
        sources=[ref('MA-C4-5E-PROP-02', 'Reconnaitre la proportionnalité')]),

    'MA-C4-5E-FONC-01': dict(duree=6, essentiel=
        'Une formule exprime une grandeur en fonction d’une autre : P = 3 × m donne le prix P pour une masse m.\n'
        'Pour calculer, on remplace la lettre par sa valeur : pour m = 5 kg, P = 3 × 5 = 15 €.\n'
        'Un tableau de valeurs rassemble plusieurs calculs.',
        parties=[
            ('Calculer avec une formule', [
                {'type': 'tableau', 'titre': 'Périmètre d’un carré : P = 4 × c', 'colonnes': ['c (cm)', '1', '2,5', '5', '8'], 'lignes': [
                    ['P (cm)', '4', '10', '20', '32']]},
                bq('Aire d’un carré : A = c². Pour c = 6 cm, A = ?', ['36 cm²', '12 cm²', '24 cm²'], '6 × 6 = 36.'),
            ]),
            ('Lire une formule', [
                {'type': 'explique', 'texte': 'Une voiture roule à 80 km/h. La distance parcourue est d = 80 × t, où t est la durée en heures.'},
                {'type': 'piege', 'erreur': 'On remplace la lettre sans tenir compte des unités : t = 30 min, donc d = 80 × 30.', 'correction': 't est en heures : 30 min = 0,5 h, donc d = 80 × 0,5 = 40 km.'},
            ]),
        ],
        a_toi=[
            q('d = 80 × t. Pour t = 2 h, d = ?', ['160 km', '82 km', '40 km'], '80 × 2 = 160.'),
            q('P = 4 × c. Pour c = 2,5 cm, P = ?', ['10 cm', '6,5 cm', '8 cm'], '4 × 2,5 = 10.'),
            q('Prix = 2 × n + 3. Pour n = 4, prix = ?', ['11', '14', '9'], '2 × 4 + 3 = 11.'),
        ],
        sources=[ref('MA-C4-5E-FONC-01', 'Formules et tableaux de valeurs')]),

    'MA-C4-5E-DEC-01': dict(duree=6, essentiel=
        'Pour diviser par un nombre décimal, on multiplie le dividende et le diviseur par 10, 100 ou 1 000 pour que le diviseur devienne entier.\n'
        'Le quotient ne change pas : 4,8 ÷ 0,6 = 48 ÷ 6 = 8.\n'
        'Diviser par un nombre plus petit que 1 donne un résultat plus grand.',
        parties=[
            ('Rendre le diviseur entier', [
                {'type': 'tableau', 'titre': 'Des divisions', 'colonnes': ['Division', 'On multiplie par', 'Division équivalente', 'Quotient'], 'lignes': [
                    ['4,8 ÷ 0,6', '10', '48 ÷ 6', '8'], ['7,5 ÷ 0,25', '100', '750 ÷ 25', '30'], ['12 ÷ 0,4', '10', '120 ÷ 4', '30']]},
                bq('3,6 ÷ 0,9 = ?', ['4', '0,4', '40'], '36 ÷ 9 = 4.'),
            ]),
            ('Un résultat plus grand', [
                {'type': 'explique', 'texte': '5 ÷ 0,5 = 10 : il y a 10 demis dans 5. Diviser par 0,5, c’est multiplier par 2.'},
                {'type': 'piege', 'erreur': 'On multiplie seulement le diviseur : 4,8 ÷ 0,6 devient 4,8 ÷ 6.', 'correction': 'On multiplie les deux nombres par le même nombre : 48 ÷ 6.'},
            ]),
        ],
        a_toi=[
            q('5 ÷ 0,5 = ?', ['10', '2,5', '0,1'], '50 ÷ 5 = 10.'),
            q('2,4 ÷ 0,08 = ?', ['30', '3', '0,3'], '240 ÷ 8 = 30.'),
            q('Diviser 6 par 0,2 donne un résultat :', ['plus grand que 6', 'plus petit que 6', 'égal à 6'], '6 ÷ 0,2 = 30.'),
        ],
        sources=[ref('MA-C4-5E-DEC-01', 'Diviser par un décimal')]),

    'MA-C4-5E-REP-01': dict(duree=6, essentiel=
        'Dans un repère, un point est repéré par deux nombres : son abscisse, lue sur l’axe horizontal, puis son ordonnée, sur l’axe vertical.\n'
        'A(3 ; −2) : abscisse 3, ordonnée −2.\n'
        'L’origine O a pour coordonnées (0 ; 0).',
        parties=[
            ('Lire et placer', [
                {'type': 'methode', 'titre': 'Pour placer A(3 ; −2)', 'etapes': [
                    'Pars de l’origine O.', 'Avance de 3 vers la droite : c’est l’abscisse.', 'Descends de 2 : l’ordonnée est négative.', 'Place le point A.']},
                bq('Le point B(−4 ; 1) a pour abscisse :', ['−4', '1', '4'], 'L’abscisse est le premier nombre.'),
            ]),
            ('Des positions particulières', [
                {'type': 'tableau', 'titre': 'Où est le point ?', 'colonnes': ['Coordonnées', 'Position'], 'lignes': [
                    ['(0 ; 0)', 'à l’origine'], ['(5 ; 0)', 'sur l’axe des abscisses'], ['(0 ; −3)', 'sur l’axe des ordonnées'], ['(−2 ; −1)', 'en bas à gauche de l’origine']]},
                {'type': 'piege', 'erreur': 'On inverse l’ordre : A(3 ; −2) placé à 3 en hauteur.', 'correction': 'L’abscisse vient toujours en premier, sur l’axe horizontal.'},
            ]),
        ],
        a_toi=[
            q('Un point sur l’axe des abscisses a pour ordonnée :', ['0', '1', 'son abscisse'], 'Il n’est ni au-dessus ni en dessous.'),
            q('Le point C(−1 ; 4) est :', ['à gauche de l’axe vertical, au-dessus de l’axe horizontal', 'à droite et en dessous', 'à l’origine'], 'Abscisse négative, ordonnée positive.'),
            q('Les coordonnées de l’origine sont :', ['(0 ; 0)', '(1 ; 1)', '(0 ; 1)'], 'Le point de départ des deux axes.'),
        ],
        sources=[ref('MA-C4-5E-REP-01', 'Se repérer dans le plan')]),

    'MA-C4-5E-TRI-02': dict(duree=7, essentiel=
        'Un triangle est constructible si la plus grande longueur est strictement inférieure à la somme des deux autres.\n'
        'Si elle est égale à cette somme, les trois points sont alignés : le triangle est aplati.\n'
        'La somme des angles d’un triangle vaut 180°.',
        parties=[
            ('L’inégalité triangulaire', [
                {'type': 'tableau', 'titre': 'Constructible ?', 'colonnes': ['Longueurs (cm)', 'Test', 'Conclusion'], 'lignes': [
                    ['3 ; 4 ; 6', '3 + 4 = 7 > 6', 'constructible'], ['3 ; 4 ; 9', '3 + 4 = 7 < 9', 'impossible'], ['4 ; 5 ; 9', '4 + 5 = 9', 'aplati, points alignés']]},
                bq('Peut-on construire un triangle de côtés 5 cm, 6 cm et 12 cm ?', ['non', 'oui', 'il est aplati'], '5 + 6 = 11 < 12.'),
            ]),
            ('La somme des angles', [
                {'type': 'exemple-resolu', 'enonce': 'Un triangle a deux angles de 50° et 60°. Combien mesure le troisième ?', 'etapes': [
                    '50 + 60 = 110.', '180 − 110 = 70.'],
                 'conclusion': 'Le troisième angle mesure 70°.'},
                {'type': 'methode', 'titre': 'Construire un triangle de côtés 6 cm, 4 cm et 5 cm', 'etapes': [
                    'Trace le plus grand côté [AB] de 6 cm.', 'Trace un arc de centre A et de rayon 4 cm.', 'Trace un arc de centre B et de rayon 5 cm.', 'Le point C est à l’intersection des arcs.']},
                {'type': 'piege', 'erreur': 'On teste seulement deux côtés au hasard.', 'correction': 'On compare la plus grande longueur à la somme des deux autres.'},
            ]),
        ],
        a_toi=[
            q('Un triangle a des angles de 90° et 35°. Le troisième mesure :', ['55°', '65°', '125°'], '180 − 90 − 35 = 55.'),
            q('Longueurs 4 cm, 5 cm, 9 cm :', ['les trois points sont alignés', 'le triangle est constructible', 'c’est impossible'], '4 + 5 = 9.'),
            q('Un triangle équilatéral a trois angles de :', ['60°', '90°', '45°'], '180 ÷ 3 = 60.'),
        ],
        sources=[ref('MA-C4-5E-TRI-02', 'Construire un triangle')]),

    'MA-C4-5E-ALGO-01': dict(duree=6, essentiel=
        'Un programme reçoit des entrées, effectue des instructions et produit des sorties.\n'
        'Entrée : un nombre. Instructions : le multiplier par 3, puis ajouter 2. Sortie pour 4 : 14.\n'
        'Pour prévoir le résultat, on exécute les instructions une à une, dans l’ordre.',
        parties=[
            ('Entrées et sorties', [
                {'type': 'tableau', 'titre': 'Programme : × 3, puis + 2', 'colonnes': ['Entrée', 'Après × 3', 'Sortie'], 'lignes': [
                    ['4', '12', '14'], ['0', '0', '2'], ['−1', '−3', '−1']]},
                bq('Avec ce programme, quelle est la sortie pour 10 ?', ['32', '30', '36'], '10 × 3 = 30, puis 30 + 2 = 32.'),
            ]),
            ('Avec une condition', [
                {'type': 'methode', 'titre': 'Programme', 'etapes': [
                    'Demander un nombre n.', 'Si n est pair, dire n ÷ 2.', 'Sinon, dire 3 × n + 1.']},
                {'type': 'explique', 'texte': 'Pour n = 6, le programme dit 3. Pour n = 5, il dit 16.'},
                {'type': 'piege', 'erreur': 'On applique les deux branches de la condition.', 'correction': 'Une seule branche s’exécute : celle que le test désigne.'},
            ]),
        ],
        a_toi=[
            q('Avec le programme pair ou impair, la sortie pour n = 7 est :', ['22', '3,5', '21'], '7 est impair : 3 × 7 + 1 = 22.'),
            q('Dans « demander un nombre », le nombre est :', ['une entrée', 'une sortie', 'une boucle'], 'Le programme le reçoit.'),
            q('Programme « + 5, puis × 2 ». Sortie pour 3 :', ['16', '11', '13'], '3 + 5 = 8, puis 8 × 2 = 16.'),
        ],
        sources=[ref('MA-C4-5E-ALGO-01', 'Programmes : entrées et sorties')]),
}

ecrire(COURS)
