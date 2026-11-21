"""Lot de cours : maths CP. Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-cp-maths.py
    python3 scripts/cours/pages.py content/cours/MA-C2-CP-*.json

Cycle 2 : phrases de 12 mots au plus, bloquant. Au CP, des phrases plus courtes encore,
du concret (bûchettes, billes, monnaie) avant la règle. Sources : extraits du référentiel.
"""
from commun import bq, ecrire, q, source_referentiel as ref, vocabulaire

COURS = {
    'MA-C2-CP-NUM-01': dict(duree=5, essentiel=
        '10 unités font 1 dizaine.\n'
        '34, c’est 3 dizaines et 4 unités.\n'
        '34 = 30 + 4.',
        parties=[
            ('Faire des paquets de dix', [
                {'type': 'observe', 'consigne': 'Compte 34 bûchettes.', 'exemples': [
                    'Je fais des paquets de 10.', 'J’ai 3 paquets.', 'Il reste 4 bûchettes seules.']},
                {'type': 'visuel', 'visuel': {'type': 'grille', 'lignes': 4, 'colonnes': 10, 'coloriees': 34}, 'legende': '3 rangées de 10 et encore 4 : 34.'},
                bq('Dans 52, combien de dizaines ?', ['5', '2', '52'], '52, c’est 5 dizaines et 2 unités.'),
            ]),
            ('Écrire le nombre', [
                {'type': 'tableau', 'titre': 'Le nombre 34', 'colonnes': ['Dizaines', 'Unités'], 'lignes': [['3', '4']]},
                {'type': 'piege', 'erreur': 'On écrit 304 pour 30 et 4.', 'correction': '3 dizaines et 4 unités s’écrivent 34.'},
            ]),
        ],
        a_toi=[
            q('6 dizaines et 2 unités, c’est :', ['62', '26', '8'], '60 + 2 = 62.'),
            q('47, c’est :', ['40 + 7', '4 + 7', '70 + 4'], '4 dizaines, donc 40, et 7 unités.'),
            q('Combien d’unités dans une dizaine ?', ['10', '1', '100'], 'Un paquet de dix.'),
        ],
        sources=[ref('MA-C2-CP-NUM-01', 'Dizaines, unités, représentations d’un nombre')]),

    'MA-C2-CP-NUM-02': dict(duree=5, essentiel=
        'Les dizaines : dix, vingt, trente, quarante, cinquante.\n'
        '21 s’écrit vingt-et-un. 34 s’écrit trente-quatre.\n'
        'On relie les mots par des traits d’union.',
        parties=[
            ('Les dizaines', [
                {'type': 'tableau', 'titre': 'Les dizaines en lettres', 'colonnes': ['Nombre', 'En lettres'], 'lignes': [
                    ['10', 'dix'], ['20', 'vingt'], ['30', 'trente'], ['40', 'quarante'], ['50', 'cinquante']]},
                bq('40 s’écrit :', ['quarante', 'quatorze', 'quatre'], 'Quarante, c’est 4 dizaines.'),
            ]),
            ('De onze à dix-neuf', [
                {'type': 'observe', 'consigne': 'De 11 à 16, chaque nombre a son nom.', 'exemples': [
                    'onze (11), douze (12), treize (13)',
                    'quatorze (14), quinze (15), seize (16)',
                    'puis dix-sept (17), dix-huit (18), dix-neuf (19)']},
                {'type': 'piege', 'erreur': 'On écrit dix-un pour 11.', 'correction': '11 s’écrit onze. On dit dix-sept seulement à partir de 17.'},
            ]),
        ],
        a_toi=[
            q('Comment écrit-on 25 ?', ['vingt-cinq', 'deux-cinq', 'vingt-quinze'], '2 dizaines, vingt, et 5, cinq.'),
            q('Quatorze, c’est :', ['14', '40', '4'], 'Quatorze est entre treize et quinze.'),
            q('31 s’écrit :', ['trente-et-un', 'treize-et-un', 'trente-un-un'], 'Trente, et un.'),
        ],
        sources=[ref('MA-C2-CP-NUM-02', 'Écrire les nombres en lettres jusqu’à 50')]),

    'MA-C2-CP-NUM-03': dict(duree=5, essentiel=
        'Pour comparer, regarde d’abord les dizaines.\n'
        'Si elles sont égales, regarde les unités.\n'
        '< veut dire « plus petit que ». > veut dire « plus grand que ».',
        parties=[
            ('Comparer deux nombres', [
                {'type': 'observe', 'consigne': 'Regarde les dizaines, puis les unités.', 'exemples': [
                    '45 et 52 : 4 dizaines contre 5. Donc 45 < 52.',
                    '67 et 63 : mêmes dizaines. 7 contre 3. Donc 67 > 63.',
                    '38 et 38 : les deux sont pareils. 38 = 38.']},
                {'type': 'piege', 'erreur': 'On croit que 9 est plus grand que 12.', 'correction': '12 a une dizaine. 9 n’en a pas. Donc 9 < 12.'},
                bq('Quel signe va entre 29 et 31 ?', ['<', '>', '='], '2 dizaines contre 3 : 29 est plus petit.'),
            ]),
            ('Ranger des nombres', [
                {'type': 'exemple-resolu', 'enonce': 'Range du plus petit au plus grand : 42, 24, 40.', 'etapes': [
                    '24 a 2 dizaines : c’est le plus petit.',
                    '40 et 42 ont 4 dizaines. 0 est plus petit que 2.'],
                 'conclusion': '24 < 40 < 42.'},
            ]),
        ],
        a_toi=[
            q('Quel nombre est le plus grand ?', ['71', '17', '70'], '71 et 70 ont 7 dizaines. 1 est plus grand que 0.'),
            q('Quel nombre est entre 38 et 40 ?', ['39', '37', '41'], '38, 39, 40.'),
            q('Quel signe va entre 56 et 65 ?', ['<', '>', '='], '5 dizaines contre 6 : 56 est plus petit.'),
        ],
        sources=[ref('MA-C2-CP-NUM-03', 'Comparer avec =, < et >')]),

    'MA-C2-CP-NUM-04': dict(duree=5, essentiel=
        'De 2 en 2 : 4, 6, 8, 10, 12.\n'
        'De 10 en 10 : 13, 23, 33, 43.\n'
        'De 10 en 10, seul le chiffre des dizaines change.',
        parties=[
            ('De deux en deux', [
                {'type': 'visuel', 'visuel': {'type': 'droite', 'min': 0, 'max': 12, 'depart': 4, 'saut': 2}, 'legende': 'De 4, j’avance de 2 : j’arrive à 6.'},
                {'type': 'observe', 'consigne': 'Compte de 2 en 2.', 'exemples': [
                    '2, 4, 6, 8, 10, 12', '1, 3, 5, 7, 9, 11', 'À rebours : 20, 18, 16, 14']},
                bq('Après 8, 10, 12, on dit :', ['14', '13', '16'], 'On avance de 2.'),
            ]),
            ('De dix en dix', [
                {'type': 'observe', 'consigne': 'Compte de 10 en 10.', 'exemples': [
                    '5, 15, 25, 35, 45', '61, 71, 81, 91', 'À rebours : 90, 80, 70, 60']},
                {'type': 'piege', 'erreur': 'De 10 en 10, on change le chiffre des unités.', 'correction': 'Les unités restent pareilles : 14, 24, 34.'},
                bq('Quel nombre suit : 32, 42, 52 ?', ['62', '53', '60'], 'Le chiffre des dizaines avance de 1.'),
            ]),
        ],
        a_toi=[
            q('Quel nombre manque : 15, 25, …, 45 ?', ['35', '30', '40'], 'On avance de 10.'),
            q('Compte à rebours de 10 en 10 : 70, 60, …', ['50', '59', '80'], 'On recule d’une dizaine.'),
            q('Compte de 2 en 2 : 11, 13, 15, …', ['17', '16', '25'], '15 + 2 = 17.'),
        ],
        sources=[ref('MA-C2-CP-NUM-04', 'Compter de un en un, de deux en deux, de dix en dix')]),

    'MA-C2-CP-NUM-05': dict(duree=4, essentiel=
        'Les nombres ordinaux donnent une place dans une file.\n'
        'premier (1er), deuxième (2e), troisième (3e)… vingtième (20e).',
        parties=[
            ('La place dans la file', [
                {'type': 'observe', 'consigne': 'La course est finie.', 'exemples': [
                    'Léo arrive le premier.', 'Inès arrive deuxième.', 'Sam arrive troisième.']},
                {'type': 'tableau', 'titre': 'Les ordinaux', 'colonnes': ['Nombre', 'Ordinal', 'En abrégé'], 'lignes': [
                    ['1', 'premier', '1er'], ['2', 'deuxième', '2e'], ['3', 'troisième', '3e'], ['10', 'dixième', '10e'], ['20', 'vingtième', '20e']]},
                bq('Les enfants font la file : A, B, C, D. Place de C ?', ['troisième', 'deuxième', 'quatrième'], 'On compte depuis le début : A, B, C.'),
            ]),
            ('Écrire en abrégé', [
                {'type': 'piege', 'erreur': 'On écrit 1e pour premier.', 'correction': 'On écrit 1er pour premier et 1re pour première.'},
            ]),
        ],
        a_toi=[
            q('Le 5e, c’est le :', ['cinquième', 'cinq', 'quinze'], 'On ajoute -ième à cinq.'),
            q('Quel est le premier mois de l’année ?', ['janvier', 'mars', 'décembre'], 'L’année commence en janvier.'),
            q('Rond, carré, rond, carré. La 4e forme est :', ['un carré', 'un rond', 'un triangle'], '1er rond, 2e carré, 3e rond, 4e carré.'),
        ],
        sources=[ref('MA-C2-CP-NUM-05', 'Nombres ordinaux')]),

    'MA-C2-CP-OPE-01': dict(duree=5, essentiel=
        'Ajouter, c’est le signe +. Retirer, c’est le signe −.\n'
        '5 + 3 = 8, donc 8 − 3 = 5.\n'
        'La soustraction défait l’addition.',
        parties=[
            ('Gagner, perdre', [
                {'type': 'observe', 'consigne': 'Suis les billes de Nina.', 'exemples': [
                    'Nina a 5 billes. Elle en gagne 3 : 5 + 3 = 8.',
                    'Puis elle en perd 3 : 8 − 3 = 5.',
                    'Elle revient à 5 billes.']},
                bq('Si 6 + 4 = 10, alors 10 − 4 = ?', ['6', '14', '4'], 'On défait l’addition : on revient à 6.'),
            ]),
            ('Trouver une soustraction', [
                {'type': 'methode', 'titre': 'Pour calculer 9 − 4', 'etapes': [
                    'Pense : 4 + ? = 9.', '4 + 5 = 9.', 'Donc 9 − 4 = 5.']},
                {'type': 'piege', 'erreur': 'On écrit 3 − 8 au lieu de 8 − 3.', 'correction': 'On part du nombre de départ, puis on retire.'},
            ]),
        ],
        a_toi=[
            q('7 + 2 = 9, donc 9 − 2 = ?', ['7', '11', '2'], 'On revient au départ.'),
            q('Le signe − veut dire :', ['retirer', 'ajouter', 'égal'], 'On enlève.'),
            q('Quelle égalité est vraie ?', ['10 − 3 = 7', '10 − 3 = 13', '10 + 3 = 7'], '7 + 3 = 10.'),
        ],
        sources=[ref('MA-C2-CP-OPE-01', 'La soustraction, inverse de l’addition')]),

    'MA-C2-CP-OPE-02': dict(duree=6, essentiel=
        'On aligne les unités sous les unités.\n'
        'On aligne les dizaines sous les dizaines.\n'
        'On calcule d’abord les unités. 10 unités font une retenue.',
        parties=[
            ('Sans retenue', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 32 + 14.', 'etapes': [
                    'Unités : 2 + 4 = 6.', 'Dizaines : 3 + 1 = 4.'],
                 'conclusion': '32 + 14 = 46.'},
                bq('23 + 41 = ?', ['64', '55', '46'], 'Unités : 3 + 1 = 4. Dizaines : 2 + 4 = 6.'),
            ]),
            ('Avec une retenue', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 27 + 15.', 'etapes': [
                    'Unités : 7 + 5 = 12.',
                    'J’écris 2. Je retiens 1 dizaine.',
                    'Dizaines : 1 + 2 + 1 = 4.'],
                 'conclusion': '27 + 15 = 42.'},
                {'type': 'tableau', 'titre': '27 + 15 en colonnes', 'colonnes': ['Ligne', 'Dizaines', 'Unités'], 'lignes': [
                    ['retenue', '1', ''], ['27', '2', '7'], ['+ 15', '1', '5'], ['résultat', '4', '2']]},
                {'type': 'piege', 'erreur': 'On écrit 12 dans la colonne des unités.', 'correction': 'On écrit 2. La dizaine part en retenue.'},
            ]),
        ],
        a_toi=[
            q('12 + 5 + 21 = ?', ['38', '37', '28'], 'Unités : 2 + 5 + 1 = 8. Dizaines : 1 + 2 = 3.'),
            q('36 + 18 = ?', ['54', '44', '414'], '6 + 8 = 14 : j’écris 4, je retiens 1.'),
            q('Où écrit-on la retenue ?', ['au-dessus des dizaines', 'sous le résultat', 'nulle part'], 'Elle s’ajoute aux dizaines.'),
        ],
        sources=[ref('MA-C2-CP-OPE-02', 'Poser une addition')]),

    'MA-C2-CP-CALC-01': dict(duree=5, essentiel=
        'Connaitre ses tables, c’est répondre vite : 7 + 3 = 10.\n'
        'On trouve aussi le nombre qui manque : 7 + … = 10.\n'
        '3 + 9 et 9 + 3 donnent le même résultat.',
        parties=[
            ('Faire 10', [
                {'type': 'observe', 'consigne': 'Toutes ces additions font 10.', 'exemples': [
                    '5 + 5 = 10', '6 + 4 = 10', '8 + 2 = 10']},
                bq('4 + … = 9 ?', ['5', '13', '4'], '4 + 5 = 9.'),
            ]),
            ('Passer par 10', [
                {'type': 'methode', 'titre': 'Pour calculer 8 + 6', 'etapes': [
                    'Complète 8 jusqu’à 10 : 8 + 2.', 'Il reste 4 à ajouter.', '10 + 4 = 14.']},
                {'type': 'piege', 'erreur': 'On croit que 3 + 9 et 9 + 3 sont différents.', 'correction': 'C’est pareil : 12. Commence par le plus grand.'},
            ]),
        ],
        a_toi=[
            q('7 + 8 = ?', ['15', '14', '16'], '7 + 3 = 10, puis 10 + 5 = 15.'),
            q('6 + … = 10 ?', ['4', '16', '5'], '6 + 4 = 10.'),
            q('9 + 4 = ?', ['13', '12', '14'], '9 + 1 = 10, puis 10 + 3 = 13.'),
        ],
        sources=[ref('MA-C2-CP-CALC-01', 'Tables d’addition')]),

    'MA-C2-CP-CALC-02': dict(duree=5, essentiel=
        'Le double de 6, c’est 6 + 6 = 12.\n'
        'La moitié de 12, c’est 6, car 6 + 6 = 12.\n'
        'Le double de 20 est 40. La moitié de 40 est 20.',
        parties=[
            ('Les doubles', [
                {'type': 'tableau', 'titre': 'Doubles à connaitre', 'colonnes': ['Nombre', 'Double'], 'lignes': [
                    ['1', '2'], ['2', '4'], ['3', '6'], ['4', '8'], ['5', '10'], ['6', '12'], ['7', '14'], ['8', '16'], ['9', '18'], ['10', '20'],
                    ['20', '40'], ['30', '60'], ['40', '80'], ['50', '100']]},
                bq('Le double de 8 est :', ['16', '10', '4'], '8 + 8 = 16.'),
            ]),
            ('Les moitiés', [
                {'type': 'visuel', 'visuel': {'type': 'grille', 'lignes': 2, 'colonnes': 7, 'coloriees': 14}, 'legende': '14 jetons en 2 rangées égales : 7 dans chacune.'},
                {'type': 'piege', 'erreur': 'On confond double et moitié.', 'correction': 'Le double est plus grand. La moitié est plus petite.'},
                bq('La moitié de 18 est :', ['9', '8', '36'], '9 + 9 = 18.'),
            ]),
        ],
        a_toi=[
            q('La moitié de 100 est :', ['50', '200', '10'], '50 + 50 = 100.'),
            q('Le double de 30 est :', ['60', '15', '33'], '30 + 30 = 60.'),
            q('La moitié de 14 est :', ['7', '28', '6'], '7 + 7 = 14.'),
        ],
        sources=[ref('MA-C2-CP-CALC-02', 'Doubles et moitiés')]),

    'MA-C2-CP-CALC-03': dict(duree=5, essentiel=
        'Ajouter 10, c’est ajouter une dizaine : 34 + 10 = 44.\n'
        'Les unités ne changent pas.\n'
        'Ajouter 30, c’est ajouter 3 dizaines : 25 + 30 = 55.',
        parties=[
            ('Ajouter des dizaines', [
                {'type': 'observe', 'consigne': 'Seules les dizaines changent.', 'exemples': [
                    '34 + 10 = 44', '34 + 20 = 54', '34 − 10 = 24']},
                {'type': 'piege', 'erreur': 'Pour 23 + 10, on change le chiffre des unités.', 'correction': 'On change le chiffre des dizaines : 33.'},
                bq('56 + 10 = ?', ['66', '57', '76'], 'Une dizaine de plus.'),
            ]),
            ('Ajouter 1 ou 2', [
                {'type': 'observe', 'consigne': 'Attention au passage de la dizaine.', 'exemples': [
                    '39 + 1 = 40', '48 + 2 = 50', '60 − 1 = 59']},
                bq('71 − 20 = ?', ['51', '69', '91'], 'On retire 2 dizaines.'),
            ]),
        ],
        a_toi=[
            q('45 + 30 = ?', ['75', '48', '85'], '4 dizaines plus 3 dizaines : 7 dizaines.'),
            q('59 + 1 = ?', ['60', '510', '58'], 'On passe à la dizaine suivante.'),
            q('88 − 10 = ?', ['78', '87', '98'], 'Une dizaine de moins.'),
        ],
        sources=[ref('MA-C2-CP-CALC-03', 'Ajouter 10, c’est ajouter une dizaine')]),

    'MA-C2-CP-CALC-04': dict(duree=5, essentiel=
        'Les compléments à 10 se savent par cœur : 3 + 7 = 10.\n'
        'De 37 à 40, il faut 3.\n'
        'Car 7 + 3 = 10.',
        parties=[
            ('Les compléments à 10', [
                {'type': 'tableau', 'titre': 'Pour faire 10', 'colonnes': ['Nombre', 'Complément à 10'], 'lignes': [
                    ['1', '9'], ['2', '8'], ['3', '7'], ['4', '6'], ['5', '5'], ['6', '4'], ['7', '3'], ['8', '2'], ['9', '1']]},
                bq('6 + … = 10 ?', ['4', '5', '16'], '6 + 4 = 10.'),
            ]),
            ('Jusqu’à la dizaine', [
                {'type': 'exemple-resolu', 'enonce': 'Combien ajouter à 64 pour arriver à 70 ?', 'etapes': [
                    'Regarde les unités : 4.', '4 + 6 = 10.'],
                 'conclusion': 'Il faut ajouter 6 : 64 + 6 = 70.'},
                {'type': 'piege', 'erreur': 'On cherche le complément à 100.', 'correction': 'La dizaine juste après 64, c’est 70.'},
            ]),
        ],
        a_toi=[
            q('28 + … = 30 ?', ['2', '8', '12'], '8 + 2 = 10.'),
            q('53 + … = 60 ?', ['7', '3', '17'], '3 + 7 = 10.'),
            q('Quelle est la dizaine juste après 46 ?', ['50', '40', '47'], '46, 47, 48, 49, 50.'),
        ],
        sources=[ref('MA-C2-CP-CALC-04', 'Compléter à la dizaine supérieure')]),

    'MA-C2-CP-CALC-05': dict(duree=5, essentiel=
        'Pour 38 + 5, on passe par 40.\n'
        '38 + 2 = 40, puis 40 + 3 = 43.\n'
        'Ajouter 9, c’est ajouter 10, puis retirer 1.',
        parties=[
            ('Passer la dizaine', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 47 + 6.', 'etapes': [
                    '47 + 3 = 50 : j’arrive à la dizaine.', '6, c’est 3 + 3. Il reste 3.', '50 + 3 = 53.'],
                 'conclusion': '47 + 6 = 53.'},
                {'type': 'visuel', 'visuel': {'type': 'droite', 'min': 44, 'max': 56, 'depart': 47, 'saut': 6}, 'legende': 'De 47, j’avance de 6 : j’arrive à 53.'},
            ]),
            ('Ajouter 9', [
                {'type': 'methode', 'titre': 'Pour calculer 25 + 9', 'etapes': [
                    'Ajoute 10 : 25 + 10 = 35.', 'Retire 1 : 35 − 1 = 34.', 'Donc 25 + 9 = 34.']},
                {'type': 'piege', 'erreur': 'On ajoute 10 et on oublie de retirer 1.', 'correction': '9, c’est 10 moins 1.'},
                bq('16 + 9 = ?', ['25', '26', '24'], '16 + 10 = 26, puis 26 − 1 = 25.'),
            ]),
        ],
        a_toi=[
            q('58 + 4 = ?', ['62', '52', '612'], '58 + 2 = 60, puis 60 + 2 = 62.'),
            q('37 + 9 = ?', ['46', '47', '36'], '37 + 10 = 47, puis 47 − 1 = 46.'),
            q('29 + 3 = ?', ['32', '31', '212'], '29 + 1 = 30, puis 30 + 2 = 32.'),
        ],
        sources=[ref('MA-C2-CP-CALC-05', 'Ajouter un nombre à un chiffre')]),

    'MA-C2-CP-CALC-06': dict(duree=6, essentiel=
        'Pour 32 + 25, on ajoute les dizaines, puis les unités.\n'
        '30 + 20 = 50. 2 + 5 = 7. Donc 57.\n'
        '50 − 3 = 47 : on recule de 3.',
        parties=[
            ('Ajouter deux nombres', [
                {'type': 'exemple-resolu', 'enonce': 'Calcule 43 + 24.', 'etapes': [
                    'Dizaines : 40 + 20 = 60.', 'Unités : 3 + 4 = 7.', '60 + 7 = 67.'],
                 'conclusion': '43 + 24 = 67.'},
                bq('21 + 36 = ?', ['57', '56', '47'], '20 + 30 = 50. 1 + 6 = 7.'),
            ]),
            ('Moitié et dizaine entière', [
                {'type': 'exemple-resolu', 'enonce': 'Trouve la moitié de 28.', 'etapes': [
                    '28 = 20 + 8.', 'La moitié de 20 est 10. La moitié de 8 est 4.'],
                 'conclusion': '10 + 4 = 14. La moitié de 28 est 14.'},
                {'type': 'observe', 'consigne': 'Retire un petit nombre d’une dizaine entière.', 'exemples': [
                    '40 − 1 = 39', '40 − 3 = 37', '40 − 8 = 32']},
                {'type': 'piege', 'erreur': 'Pour 60 − 4, on écrit 64.', 'correction': 'Retirer fait reculer : 60 − 4 = 56.'},
            ]),
        ],
        a_toi=[
            q('52 + 31 = ?', ['83', '82', '73'], '50 + 30 = 80. 2 + 1 = 3.'),
            q('70 − 5 = ?', ['65', '75', '64'], 'On recule de 5 à partir de 70.'),
            q('La moitié de 46 est :', ['23', '22', '92'], 'Moitié de 40 : 20. Moitié de 6 : 3.'),
        ],
        sources=[ref('MA-C2-CP-CALC-06', 'Décomposer pour calculer')]),

    'MA-C2-CP-PB-01': dict(duree=6, essentiel=
        'Je lis le problème. Je cherche ce qu’on demande.\n'
        'Le tout, c’est une partie plus l’autre partie.\n'
        'Pour trouver une partie, je retire l’autre partie du tout.',
        parties=[
            ('Chercher le tout', [
                {'type': 'exemple-resolu', 'enonce': 'Un bouquet a 12 roses et 7 tulipes. Combien de fleurs ?', 'etapes': [
                    'On cherche le tout : toutes les fleurs.', '12 + 7 = 19.'],
                 'conclusion': 'Il y a 19 fleurs.'},
                bq('Tom a 8 billes. Il en gagne 5. Combien en a-t-il ?', ['13', '3', '85'], '8 + 5 = 13.'),
            ]),
            ('Chercher une partie', [
                {'type': 'exemple-resolu', 'enonce': 'Il y a 25 élèves. 14 sont des filles. Combien de garçons ?', 'etapes': [
                    'On cherche une partie : les garçons.', '25 − 14 = 11.'],
                 'conclusion': 'Il y a 11 garçons.'},
                {'type': 'piege', 'erreur': 'On additionne tous les nombres du problème.', 'correction': 'Demande-toi : je cherche le tout ou une partie ?'},
            ]),
        ],
        a_toi=[
            q('Sur 20 bonbons, 6 sont rouges. Les autres sont verts. Combien de verts ?', ['14', '26', '16'], '20 − 6 = 14.'),
            q('Léa a 30 €. Elle dépense 10 €. Combien lui reste-t-il ?', ['20 €', '40 €', '10 €'], '30 − 10 = 20.'),
            q('Il y a 15 garçons et 12 filles. Combien d’enfants ?', ['27', '3', '25'], '15 + 12 = 27.'),
        ],
        sources=[ref('MA-C2-CP-PB-01', 'Problèmes parties-tout')]),

    'MA-C2-CP-PB-02': dict(duree=6, essentiel=
        'Certains problèmes se font en deux calculs.\n'
        'Je trouve d’abord un résultat utile.\n'
        'Puis je m’en sers pour répondre.',
        parties=[
            ('Un exemple', [
                {'type': 'exemple-resolu', 'enonce': 'Un bus transporte 18 enfants. 6 descendent, puis 4 montent. Combien d’enfants maintenant ?', 'etapes': [
                    '18 − 6 = 12.', '12 + 4 = 16.'],
                 'conclusion': 'Il y a 16 enfants dans le bus.'},
            ]),
            ('La méthode', [
                {'type': 'methode', 'titre': 'Pour un problème en deux étapes', 'etapes': [
                    'Lis tout le problème.', 'Trouve ce qu’on demande.', 'Fais le premier calcul.', 'Utilise son résultat pour le deuxième.']},
                {'type': 'piege', 'erreur': 'On répond après le premier calcul.', 'correction': 'Relis la question. A-t-on vraiment répondu ?'},
                bq('Lina a 9 billes rouges et 7 bleues. Elle en donne 5. Combien lui en reste-t-il ?', ['11', '16', '21'], '9 + 7 = 16, puis 16 − 5 = 11.'),
            ]),
        ],
        a_toi=[
            q('J’ai 10 images. J’en reçois 8, puis j’en donne 3. Combien en ai-je ?', ['15', '21', '5'], '10 + 8 = 18, puis 18 − 3 = 15.'),
            q('Un panier a 12 pommes et 9 poires. On mange 6 fruits. Combien en reste-t-il ?', ['15', '27', '21'], '12 + 9 = 21, puis 21 − 6 = 15.'),
            q('Il y a 25 places. 11 enfants s’assoient, puis 6 autres. Combien de places libres ?', ['8', '14', '19'], '11 + 6 = 17, puis 25 − 17 = 8.'),
        ],
        sources=[ref('MA-C2-CP-PB-02', 'Problèmes en deux étapes')]),

    'MA-C2-CP-PB-03': dict(duree=6, essentiel=
        '3 boites de 4 œufs : 4 + 4 + 4 = 12 œufs.\n'
        'Partager 12 en 3 parts égales : 4 chacun.',
        parties=[
            ('Plusieurs fois la même quantité', [
                {'type': 'visuel', 'visuel': {'type': 'grille', 'lignes': 3, 'colonnes': 4, 'coloriees': 12}, 'legende': '3 rangées de 4 : 12.'},
                {'type': 'exemple-resolu', 'enonce': '5 enfants ont chacun 3 billes. Combien de billes en tout ?', 'etapes': [
                    '3 + 3 + 3 + 3 + 3 = 15.'],
                 'conclusion': 'Il y a 15 billes en tout.'},
            ]),
            ('Partager en parts égales', [
                {'type': 'exemple-resolu', 'enonce': 'On partage 20 bonbons entre 4 enfants. Combien chacun ?', 'etapes': [
                    'On donne un bonbon à chacun : 4 bonbons partent.', 'On recommence jusqu’au bout : 5 tours.'],
                 'conclusion': 'Chaque enfant a 5 bonbons.'},
                {'type': 'piege', 'erreur': 'On donne plus à un enfant qu’à un autre.', 'correction': 'Parts égales : chacun reçoit la même quantité.'},
                bq('On range 18 crayons par paquets de 6. Combien de paquets ?', ['3', '12', '24'], '6 + 6 + 6 = 18.'),
            ]),
        ],
        a_toi=[
            q('4 sacs de 5 pommes. Combien de pommes ?', ['20', '9', '45'], '5 + 5 + 5 + 5 = 20.'),
            q('On partage 12 gâteaux entre 2 enfants. Combien chacun ?', ['6', '10', '24'], '6 + 6 = 12.'),
            q('Avec 15 cartes, on fait des paquets de 3. Combien de paquets ?', ['5', '12', '18'], '3 + 3 + 3 + 3 + 3 = 15.'),
        ],
        sources=[ref('MA-C2-CP-PB-03', 'Problèmes multiplicatifs et de partage')]),

    'MA-C2-CP-LONG-01': dict(duree=5, essentiel=
        'On mesure en centimètres (cm) ou en mètres (m).\n'
        '1 m = 100 cm.\n'
        'Une trousse mesure environ 20 cm. Une porte, environ 2 m.',
        parties=[
            ('Mesurer avec la règle', [
                {'type': 'visuel', 'visuel': {'type': 'regle', 'graduations': 10, 'debut': 0, 'fin': 6}, 'legende': 'Le trait mesure 6 cm.'},
                {'type': 'methode', 'titre': 'Pour mesurer un trait', 'etapes': [
                    'Pose le 0 de la règle au bout du trait.', 'Lis le nombre à l’autre bout.', 'Écris l’unité : cm.']},
                {'type': 'piege', 'erreur': 'On commence à mesurer au 1 de la règle.', 'correction': 'On commence toujours au 0.'},
            ]),
            ('Des longueurs à connaitre', [
                {'type': 'tableau', 'titre': 'Environ combien ?', 'colonnes': ['Objet', 'Longueur'], 'lignes': [
                    ['une gomme', '3 cm'], ['une trousse', '20 cm'], ['une table', '1 m'], ['une porte', '2 m']]},
                bq('Un trait va du 0 au 9. Il mesure :', ['9 cm', '10 cm', '8 cm'], 'On lit le nombre au bout du trait.'),
            ]),
        ],
        a_toi=[
            q('1 m, c’est :', ['100 cm', '10 cm', '1 cm'], 'Un mètre fait cent centimètres.'),
            q('Une trousse mesure environ :', ['20 cm', '2 cm', '1 m'], 'Elle tient dans le cartable.'),
            q('Pour mesurer la cour, on compte en :', ['mètres', 'centimètres', 'litres'], 'La cour est très grande.'),
        ],
        sources=[ref('MA-C2-CP-LONG-01', 'Mètre et centimètre')]),

    'MA-C2-CP-MONN-01': dict(duree=5, essentiel=
        'Pièces : 1 € et 2 €. Billets : 5 €, 10 €, 20 €, 50 €.\n'
        'Pour compter, commence par les plus gros billets.\n'
        'Puis ajoute les pièces.',
        parties=[
            ('Compter une somme', [
                {'type': 'visuel', 'visuel': {'type': 'monnaie', 'valeurs': [20, 10, 2, 1]}, 'legende': '20 + 10 + 2 + 1 = 33 €.'},
                {'type': 'piege', 'erreur': 'On compte les pièces sans regarder leur valeur.', 'correction': 'Une pièce de 2 € vaut 2 euros, pas 1.'},
                bq('Un billet de 10 € et trois pièces de 2 € font :', ['16 €', '13 €', '5 €'], '10 + 2 + 2 + 2 = 16.'),
            ]),
            ('Rendre la monnaie', [
                {'type': 'exemple-resolu', 'enonce': 'Un livre coûte 7 €. Je paie avec 10 €. Combien me rend-on ?', 'etapes': [
                    'De 7 à 10, il manque 3.'],
                 'conclusion': 'On me rend 3 €.'},
            ]),
        ],
        a_toi=[
            q('50 € + 20 € + 5 € = ?', ['75 €', '70 €', '57 €'], 'Commence par le plus gros billet.'),
            q('Un jouet coûte 15 €. Je donne 20 €. On me rend :', ['5 €', '15 €', '35 €'], 'De 15 à 20, il manque 5.'),
            q('Combien de pièces de 2 € pour faire 10 € ?', ['5', '10', '2'], '2 + 2 + 2 + 2 + 2 = 10.'),
        ],
        sources=[ref('MA-C2-CP-MONN-01', 'Compter la monnaie')]),

    'MA-C2-CP-TEMPS-01': dict(duree=4, essentiel=
        'La petite aiguille montre les heures.\n'
        'La grande aiguille montre les minutes.\n'
        'Grande aiguille sur le 12 : c’est une heure juste.',
        parties=[
            ('Lire l’heure', [
                {'type': 'visuel', 'visuel': {'type': 'horloge', 'heures': 3, 'minutes': 0}, 'legende': 'La petite aiguille est sur le 3. Il est 3 heures.'},
                bq('Petite aiguille sur le 8, grande sur le 12. Il est :', ['8 heures', '12 heures', '20 heures'], 'La petite aiguille donne l’heure.'),
            ]),
            ('Ne pas confondre', [
                {'type': 'visuel', 'visuel': {'type': 'horloge', 'heures': 10, 'minutes': 0}, 'legende': 'Il est 10 heures.'},
                {'type': 'piege', 'erreur': 'On confond les deux aiguilles.', 'correction': 'La petite donne l’heure. La grande est sur le 12.'},
            ]),
        ],
        a_toi=[
            q('Quelle aiguille donne l’heure ?', ['la petite', 'la grande', 'aucune'], 'La grande donne les minutes.'),
            q('Petite aiguille sur le 6, grande sur le 12 :', ['6 heures', '12 heures', '6 minutes'], 'Une heure juste.'),
            q('Midi, c’est :', ['12 heures', '0 heure', '6 heures'], 'Le milieu de la journée.'),
        ],
        sources=[ref('MA-C2-CP-TEMPS-01', 'Lire les heures entières')]),

    'MA-C2-CP-GEO-01': dict(duree=5, essentiel=
        'Le cube a 6 faces carrées, toutes pareilles.\n'
        'Le pavé a 6 faces, comme une boite à chaussures.\n'
        'La boule roule. Le cylindre et le cône aussi.',
        parties=[
            ('Cube et pavé', [
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'cube'}, 'legende': 'Un cube : 6 faces carrées.'},
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'pave'}, 'legende': 'Un pavé : 6 faces.'},
                {'type': 'piege', 'erreur': 'On croit que le cube et le pavé sont pareils.', 'correction': 'Le cube a toutes ses faces carrées et pareilles.'},
                bq('Une boite à chaussures a la forme :', ['d’un pavé', 'd’un cube', 'd’une boule'], 'Ses faces ne sont pas toutes carrées.'),
            ]),
            ('Ce qui roule', [
                {'type': 'visuel', 'visuel': {'type': 'solide', 'solide': 'cylindre'}, 'legende': 'Un cylindre, comme une boite de conserve.'},
                {'type': 'tableau', 'titre': 'Des objets', 'colonnes': ['Solide', 'Objet'], 'lignes': [
                    ['boule', 'ballon'], ['cylindre', 'boite de conserve'], ['cône', 'cornet de glace']]},
            ]),
        ],
        a_toi=[
            q('Combien de faces a un cube ?', ['6', '4', '8'], 'Haut, bas, devant, derrière, gauche, droite.'),
            q('Un ballon a la forme :', ['d’une boule', 'd’un cube', 'd’un cône'], 'Il roule dans tous les sens.'),
            q('Un dé a la forme :', ['d’un cube', 'd’un cylindre', 'd’un cône'], 'Ses 6 faces sont des carrés.'),
        ],
        sources=[ref('MA-C2-CP-GEO-01', 'Reconnaitre les solides')]),

    'MA-C2-CP-GEO-02': dict(duree=5, essentiel=
        'Le triangle a 3 côtés et 3 sommets.\n'
        'Le carré et le rectangle ont 4 côtés et 4 sommets.\n'
        'Les 4 côtés du carré sont égaux. Le disque n’a pas de sommet.',
        parties=[
            ('Côtés et sommets', [
                vocabulaire(2, 'Côté', 'Sommet', 'Disque'),
                {'type': 'visuel', 'visuel': {'type': 'figure', 'largeur': 6, 'hauteur': 5, 'quadrillage': True, 'elements': [
                    {'forme': 'polygone', 'sommets': [[1, 4], [5, 4], [3, 1]]}]}, 'legende': 'Un triangle : 3 côtés, 3 sommets.'},
                {'type': 'visuel', 'visuel': {'type': 'figure', 'largeur': 7, 'hauteur': 4, 'quadrillage': True, 'elements': [
                    {'forme': 'polygone', 'sommets': [[1, 1], [6, 1], [6, 3], [1, 3]]}]}, 'legende': 'Un rectangle : 4 côtés, 4 sommets.'},
                bq('Combien de sommets a un carré ?', ['4', '3', '0'], 'Un sommet à chaque coin.'),
            ]),
            ('Comparer les figures', [
                {'type': 'tableau', 'titre': 'Les figures', 'colonnes': ['Figure', 'Côtés', 'Sommets'], 'lignes': [
                    ['triangle', '3', '3'], ['carré', '4, tous égaux', '4'], ['rectangle', '4', '4'], ['disque', 'aucun', 'aucun']]},
                {'type': 'piege', 'erreur': 'On compte deux fois le même sommet.', 'correction': 'Pose un doigt sur un sommet, puis fais le tour.'},
            ]),
        ],
        a_toi=[
            q('Combien de côtés a un triangle ?', ['3', '4', '2'], 'Tri veut dire trois.'),
            q('Quelle figure a 4 côtés égaux ?', ['le carré', 'le triangle', 'le disque'], 'Ses 4 côtés ont la même longueur.'),
            q('Une pièce de monnaie posée à plat a la forme :', ['d’un disque', 'd’un carré', 'd’un triangle'], 'Elle est toute ronde.'),
        ],
        sources=[ref('MA-C2-CP-GEO-02', 'Côtés et sommets des figures')]),

    'MA-C2-CP-DON-01': dict(duree=5, essentiel=
        'Un tableau range des informations en lignes et en colonnes.\n'
        'On y lit qui a le plus et qui a le moins.\n'
        'On peut calculer combien de plus et combien en tout.',
        parties=[
            ('Lire le tableau', [
                {'type': 'tableau', 'titre': 'Le fruit préféré de la classe', 'colonnes': ['Fruit', 'Élèves'], 'lignes': [
                    ['pomme', '8'], ['banane', '5'], ['fraise', '11']]},
                {'type': 'visuel', 'visuel': {'type': 'diagramme', 'titre': 'Le fruit préféré', 'unite': 'élèves', 'pas': 2, 'barres': [
                    {'nom': 'pomme', 'valeur': 8}, {'nom': 'banane', 'valeur': 5}, {'nom': 'fraise', 'valeur': 11}]}, 'legende': 'Les mêmes résultats, en barres.'},
                bq('Quel fruit est le plus aimé ?', ['la fraise', 'la pomme', 'la banane'], '11, c’est le plus grand nombre.'),
            ]),
            ('Calculer avec le tableau', [
                {'type': 'exemple-resolu', 'enonce': 'Combien d’élèves de plus pour la fraise que pour la pomme ?', 'etapes': [
                    'Fraise : 11. Pomme : 8.', '11 − 8 = 3.'],
                 'conclusion': '3 élèves de plus aiment la fraise.'},
                {'type': 'piege', 'erreur': 'On lit la mauvaise ligne.', 'correction': 'Pose ton doigt sur la ligne, puis glisse jusqu’au nombre.'},
            ]),
        ],
        a_toi=[
            q('Combien d’élèves aiment la banane ?', ['5', '8', '11'], 'On lit la ligne banane.'),
            q('Quel fruit est le moins aimé ?', ['la banane', 'la pomme', 'la fraise'], '5, c’est le plus petit nombre.'),
            q('Combien d’élèves en tout ?', ['24', '19', '13'], '8 + 5 + 11 = 24.'),
        ],
        sources=[ref('MA-C2-CP-DON-01', 'Organiser et lire des données')]),
}

ecrire(COURS)
