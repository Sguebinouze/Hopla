"""Lot de cours : physique-chimie, SVT et technologie 4e. Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-4e-sciences.py
    python3 scripts/cours/pages.py content/cours/PC-C4-4E-*.json content/cours/SV-C4-4E-*.json content/cours/TE-C4-4E-*.json

Cycle 4 : phrases de 25 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
"""
from commun import bq, ecrire, q, source_referentiel as ref

COURS = {
    # ---------------------------------------------------------- Physique-chimie
    'PC-C4-4E-MAT-01': dict(duree=7, essentiel=
        'La masse volumique d’une substance est sa masse divisée par son volume : ρ = m ÷ V.\n'
        '1 L d’eau a une masse de 1 kg : la masse volumique de l’eau est 1 kg/L, soit 1 g/cm³.\n'
        'Un objet flotte sur un liquide si sa masse volumique est plus petite que celle du liquide.',
        parties=[
            ('Calculer et identifier', [
                {'type': 'exemple-resolu', 'enonce': 'Un cube de métal a une masse de 54 g et un volume de 20 cm³. De quel métal s’agit-il ?', 'etapes': [
                    'ρ = 54 ÷ 20 = 2,7 g/cm³.', 'On compare au tableau : l’aluminium a une masse volumique de 2,7 g/cm³.'],
                 'conclusion': 'Le cube est en aluminium.'},
                {'type': 'tableau', 'titre': 'Quelques masses volumiques', 'colonnes': ['Substance', 'ρ (g/cm³)'], 'lignes': [
                    ['huile', 'environ 0,92'], ['eau', '1'], ['aluminium', '2,7'], ['fer', 'environ 7,9'], ['or', 'environ 19,3']]},
                bq('Un objet de 30 g et de 60 cm³, placé dans l’eau :', ['flotte', 'coule', 'se dissout'], 'ρ = 0,5 g/cm³, moins que l’eau.'),
            ]),
            ('Unités', [
                {'type': 'piege', 'erreur': 'On divise le volume par la masse.', 'correction': 'ρ = m ÷ V : la masse au numérateur. L’unité le rappelle : g/cm³.'},
            ]),
        ],
        a_toi=[
            q('L’huile flotte sur l’eau car :', ['sa masse volumique est plus petite', 'elle est plus lourde', 'elle est chaude'], '0,92 < 1.'),
            q('Un bloc de fer de 10 cm³ a une masse d’environ :', ['79 g', '7,9 g', '790 g'], 'm = ρ × V = 7,9 × 10.'),
            q('1 g/cm³ = ?', ['1 kg/L', '1 000 kg/L', '1 g/L'], '1 L = 1 000 cm³, 1 kg = 1 000 g.'),
        ],
        sources=[ref('PC-C4-4E-MAT-01', 'La masse volumique')]),

    'PC-C4-4E-ATOM-01': dict(duree=7, essentiel=
        'La matière est faite d’atomes, minuscules : environ un dix-milliardième de mètre.\n'
        'Les atomes s’assemblent en molécules. La formule d’une molécule indique ses atomes et leur nombre.\n'
        'H₂O contient 2 atomes d’hydrogène et 1 atome d’oxygène.',
        parties=[
            ('Lire une formule', [
                {'type': 'tableau', 'titre': 'Des molécules', 'colonnes': ['Molécule', 'Formule', 'Atomes'], 'lignes': [
                    ['eau', 'H₂O', '2 H, 1 O'], ['dioxygène', 'O₂', '2 O'], ['dioxyde de carbone', 'CO₂', '1 C, 2 O'], ['méthane', 'CH₄', '1 C, 4 H']]},
                bq('Combien d’atomes contient une molécule de CO₂ ?', ['3', '2', '1'], '1 carbone et 2 oxygène.'),
            ]),
            ('Corps purs simples et composés', [
                {'type': 'explique', 'texte': 'Le dioxygène O₂ n’a qu’une sorte d’atome : c’est un corps pur simple. L’eau H₂O en a deux sortes : c’est un corps pur composé.'},
                {'type': 'piege', 'erreur': 'On lit le chiffre en indice comme s’appliquant à tous les atomes : H₂O aurait 2 O.', 'correction': 'L’indice s’applique à l’atome juste avant : H₂ signifie 2 atomes d’hydrogène.'},
            ]),
        ],
        a_toi=[
            q('Dans CH₄, il y a :', ['1 atome de carbone et 4 d’hydrogène', '4 atomes de carbone', '1 atome de chaque'], 'L’indice 4 porte sur H.'),
            q('Le symbole de l’oxygène est :', ['O', 'Ox', 'Og'], 'Une seule lettre majuscule.'),
            q('Le dioxygène est un corps pur :', ['simple', 'composé', 'mélangé'], 'Une seule sorte d’atome.'),
        ],
        sources=[ref('PC-C4-4E-ATOM-01', 'Atomes et molécules')]),

    'PC-C4-4E-TRANS-01': dict(duree=7, essentiel=
        'Lors d’une transformation chimique, les atomes des réactifs se réarrangent pour former les produits.\n'
        'On l’écrit par une équation de réaction : réactifs → produits. La combustion du carbone s’écrit C + O₂ → CO₂.\n'
        'Les atomes se conservent : il y en a autant de chaque sorte des deux côtés de la flèche.',
        parties=[
            ('Écrire une équation', [
                {'type': 'tableau', 'titre': 'Des équations ajustées', 'colonnes': ['Réaction', 'Équation'], 'lignes': [
                    ['combustion du carbone', 'C + O₂ → CO₂'], ['combustion du méthane', 'CH₄ + 2 O₂ → CO₂ + 2 H₂O'], ['formation de l’eau', '2 H₂ + O₂ → 2 H₂O']]},
                bq('Dans C + O₂ → CO₂, les réactifs sont :', ['C et O₂', 'CO₂', 'C et CO₂'], 'Ils sont à gauche de la flèche.'),
            ]),
            ('Compter les atomes', [
                {'type': 'exemple-resolu', 'enonce': 'Vérifie l’équation CH₄ + 2 O₂ → CO₂ + 2 H₂O.', 'etapes': [
                    'À gauche : 1 C, 4 H, 4 O.', 'À droite : 1 C, 4 H, 2 + 2 = 4 O.'],
                 'conclusion': 'Chaque atome est conservé : l’équation est ajustée.'},
                {'type': 'piege', 'erreur': 'On change une formule pour équilibrer : H₂O devient H₂O₂.', 'correction': 'On ne touche pas aux formules. On ajoute des nombres devant les molécules.'},
            ]),
        ],
        a_toi=[
            q('Dans 2 H₂ + O₂ → 2 H₂O, combien d’atomes d’hydrogène à droite ?', ['4', '2', '1'], '2 molécules de 2 atomes.'),
            q('Lors d’une transformation chimique, les atomes :', ['se conservent', 'disparaissent', 'se multiplient'], 'Ils se réarrangent.'),
            q('Le produit de la combustion du carbone est :', ['CO₂', 'O₂', 'H₂O'], 'Le dioxyde de carbone.'),
        ],
        sources=[ref('PC-C4-4E-TRANS-01', 'Équations de réaction')]),

    'PC-C4-4E-FORCE-01': dict(duree=7, essentiel=
        'Une action mécanique peut s’exercer par contact, comme la main qui pousse une porte, ou à distance, comme la Terre qui attire la Lune.\n'
        'On la modélise par une force, représentée par une flèche.\n'
        'Une force a un point d’application, une direction, un sens et une valeur en newtons (N), mesurée au dynamomètre.',
        parties=[
            ('Contact ou distance ?', [
                {'type': 'tableau', 'titre': 'Des interactions', 'colonnes': ['Situation', 'Type'], 'lignes': [
                    ['la main pousse une porte', 'contact'], ['le pied frappe un ballon', 'contact'], ['la Terre attire un objet qui tombe', 'à distance'], ['un aimant attire un trombone', 'à distance']]},
                bq('Un aimant attire un clou sans le toucher. C’est une action :', ['à distance', 'de contact', 'impossible'], 'Il n’y a pas de contact.'),
            ]),
            ('Représenter une force', [
                {'type': 'tableau', 'titre': 'Caractéristiques d’une force', 'colonnes': ['Caractéristique', 'Sur la flèche'], 'lignes': [
                    ['point d’application', 'origine de la flèche'], ['direction', 'la droite qui porte la flèche'], ['sens', 'la pointe'], ['valeur', 'la longueur, selon une échelle']]},
                {'type': 'piege', 'erreur': 'On confond direction et sens.', 'correction': 'La direction est la droite, verticale par exemple. Le sens précise vers le haut ou vers le bas.'},
            ]),
        ],
        a_toi=[
            q('La valeur d’une force s’exprime en :', ['newtons', 'kilogrammes', 'joules'], 'Symbole N.'),
            q('La Terre attire un objet vers :', ['le bas, vers son centre', 'le haut', 'le côté'], 'Direction verticale, sens vers le bas.'),
            q('Pour mesurer une force, on utilise :', ['un dynamomètre', 'une balance', 'un thermomètre'], 'Un ressort gradué.'),
        ],
        sources=[ref('PC-C4-4E-FORCE-01', 'Interactions et forces')]),

    'PC-C4-4E-ELEC-01': dict(duree=8, essentiel=
        'En série, l’intensité est la même partout, et la tension du générateur est la somme des tensions des dipôles.\n'
        'En dérivation, la tension est la même aux bornes de chaque branche, et l’intensité principale est la somme des intensités des branches.\n'
        'La loi d’Ohm relie tension, résistance et intensité : U = R × I.',
        parties=[
            ('Les lois d’additivité', [
                {'type': 'tableau', 'titre': 'Série et dérivation', 'colonnes': ['Grandeur', 'Série', 'Dérivation'], 'lignes': [
                    ['intensité', 'la même partout', 'I = I₁ + I₂'], ['tension', 'U = U₁ + U₂', 'la même aux bornes de chaque branche']]},
                bq('En dérivation, I₁ = 0,2 A et I₂ = 0,3 A. Intensité principale :', ['0,5 A', '0,1 A', '0,06 A'], 'I = I₁ + I₂.'),
            ]),
            ('La loi d’Ohm', [
                {'type': 'exemple-resolu', 'enonce': 'Une résistance de 100 Ω est traversée par un courant de 0,05 A. Quelle est la tension à ses bornes ?', 'etapes': [
                    'U = R × I.', 'U = 100 × 0,05 = 5.'],
                 'conclusion': 'U = 5 V.'},
                {'type': 'piege', 'erreur': 'On utilise des milliampères dans la loi d’Ohm : U = 100 × 50.', 'correction': 'L’intensité doit être en ampères : 50 mA = 0,05 A.'},
            ]),
        ],
        a_toi=[
            q('En série, U générateur = 6 V et U₁ = 4 V. U₂ = ?', ['2 V', '10 V', '6 V'], '6 = 4 + U₂.'),
            q('R = 200 Ω et I = 0,03 A. U = ?', ['6 V', '600 V', '0,6 V'], '200 × 0,03.'),
            q('La résistance s’exprime en :', ['ohms', 'volts', 'ampères'], 'Symbole Ω.'),
        ],
        sources=[ref('PC-C4-4E-ELEC-01', 'Lois de l’électricité')]),

    'PC-C4-4E-COMB-01': dict(duree=7, essentiel=
        'Une combustion consomme un combustible et du dioxygène.\n'
        'Complète, elle donne du dioxyde de carbone et de l’eau, avec une flamme bleue.\n'
        'Incomplète, par manque de dioxygène, elle donne une flamme jaune, de la suie et du monoxyde de carbone, un gaz mortel et inodore.',
        parties=[
            ('Réactifs et produits', [
                {'type': 'tableau', 'titre': 'Combustion du gaz de cuisine', 'colonnes': ['Critère', 'Complète', 'Incomplète'], 'lignes': [
                    ['flamme', 'bleue', 'jaune, fumée'], ['produits', 'dioxyde de carbone, eau', 'monoxyde de carbone, carbone (suie), dioxyde de carbone, eau'], ['danger', 'faible', 'intoxication au monoxyde de carbone']]},
                bq('Une flamme jaune qui noircit la casserole indique :', ['une combustion incomplète', 'une combustion complète', 'l’absence de combustion'], 'La suie est du carbone non brulé.'),
            ]),
            ('Se protéger', [
                {'type': 'observe', 'consigne': 'Contre le monoxyde de carbone.', 'exemples': ['aérer chaque jour', 'faire entretenir chaudières et poêles', 'installer un détecteur de monoxyde de carbone', 'ne jamais faire tourner un moteur dans un local fermé']},
                {'type': 'piege', 'erreur': 'On croit qu’on sentirait un gaz dangereux.', 'correction': 'Le monoxyde de carbone est inodore et invisible : seul un détecteur le repère.'},
            ]),
        ],
        a_toi=[
            q('Le monoxyde de carbone a pour formule :', ['CO', 'CO₂', 'O₂'], 'Un seul atome d’oxygène.'),
            q('Pour tester la présence de dioxyde de carbone, on utilise :', ['l’eau de chaux', 'le sulfate de cuivre', 'une flamme'], 'Elle se trouble.'),
            q('Une combustion incomplète est due à :', ['un manque de dioxygène', 'un excès de dioxygène', 'trop d’eau'], 'Le combustible ne brule pas entièrement.'),
        ],
        sources=[ref('PC-C4-4E-COMB-01', 'Les combustions')]),

    'PC-C4-4E-PH-01': dict(duree=7, essentiel=
        'Le pH d’une solution est un nombre entre 0 et 14. On le mesure au papier pH ou au pH-mètre.\n'
        'pH < 7 : solution acide. pH = 7 : neutre. pH > 7 : basique.\n'
        'Diluer une solution acide ou basique rapproche son pH de 7.',
        parties=[
            ('Classer les solutions', [
                {'type': 'tableau', 'titre': 'Des pH courants', 'colonnes': ['Solution', 'pH environ', 'Caractère'], 'lignes': [
                    ['jus de citron', '2', 'acide'], ['vinaigre', '3', 'acide'], ['eau pure', '7', 'neutre'], ['eau savonneuse', '9 à 10', 'basique'], ['déboucheur', '13 à 14', 'basique']]},
                bq('Une solution de pH 11 est :', ['basique', 'acide', 'neutre'], '11 > 7.'),
            ]),
            ('Dilution et sécurité', [
                {'type': 'explique', 'texte': 'On ajoute de l’eau au vinaigre : son pH augmente et se rapproche de 7, sans jamais le dépasser.'},
                {'type': 'piege', 'erreur': 'On verse l’eau dans un acide concentré.', 'correction': 'On verse toujours l’acide dans l’eau, doucement, avec lunettes et gants : le mélange peut projeter.'},
            ]),
        ],
        a_toi=[
            q('Une solution de pH 2 est :', ['très acide', 'neutre', 'basique'], 'Bien en dessous de 7.'),
            q('On dilue une solution basique de pH 12. Son pH :', ['diminue vers 7', 'augmente vers 14', 'devient acide'], 'Il se rapproche de 7.'),
            q('L’eau pure a un pH de :', ['7', '0', '14'], 'Elle est neutre.'),
        ],
        sources=[ref('PC-C4-4E-PH-01', 'Acide, neutre ou basique')]),

    'PC-C4-4E-MASSE-01': dict(duree=6, essentiel=
        'Lors d’une transformation chimique, la masse totale se conserve : les atomes se réarrangent sans disparaitre.\n'
        '12 g de carbone et 32 g de dioxygène donnent 44 g de dioxyde de carbone.\n'
        'Si un gaz s’échappe d’un récipient ouvert, la balance indique une masse plus faible.',
        parties=[
            ('Masse des réactifs, masse des produits', [
                {'type': 'exemple-resolu', 'enonce': 'On brule 12 g de carbone dans 32 g de dioxygène. Quelle masse de dioxyde de carbone obtient-on ?', 'etapes': [
                    'La masse totale se conserve.', '12 + 32 = 44.'],
                 'conclusion': 'On obtient 44 g de dioxyde de carbone.'},
                bq('6 g de réactifs réagissent entièrement. La masse des produits est :', ['6 g', 'moins de 6 g', 'plus de 6 g'], 'Les atomes se conservent.'),
            ]),
            ('Récipient ouvert ou fermé', [
                {'type': 'tableau', 'titre': 'Vinaigre et bicarbonate', 'colonnes': ['Récipient', 'Masse lue', 'Explication'], 'lignes': [
                    ['fermé', 'constante', 'le gaz produit reste dans le récipient'], ['ouvert', 'diminue', 'le dioxyde de carbone s’échappe dans l’air']]},
                {'type': 'piege', 'erreur': 'On conclut que la masse diminue lors de la réaction.', 'correction': 'La masse ne disparait pas : le gaz est simplement parti dans l’air.'},
            ]),
        ],
        a_toi=[
            q('Une bougie qui brule semble perdre de la masse car :', ['les produits gazeux partent dans l’air', 'la matière disparait', 'la flamme est légère'], 'Dioxyde de carbone et vapeur d’eau s’échappent.'),
            q('La conservation de la masse s’explique par :', ['la conservation des atomes', 'la disparition des molécules', 'la chaleur'], 'Les atomes se réarrangent.'),
            q('4 g de dihydrogène réagissent avec 32 g de dioxygène. Masse d’eau :', ['36 g', '28 g', '128 g'], '4 + 32.'),
        ],
        sources=[ref('PC-C4-4E-MASSE-01', 'Conservation de la masse')]),

    'PC-C4-4E-PERIO-01': dict(duree=6, essentiel=
        'Le tableau périodique range tous les éléments chimiques connus, dans l’ordre de leur numéro atomique.\n'
        'Chaque élément a un symbole : une majuscule, parfois suivie d’une minuscule. H pour l’hydrogène, Fe pour le fer.\n'
        'Une formule chimique se lit en atomes : H₂O, deux atomes d’hydrogène et un atome d’oxygène.',
        parties=[
            ('Des symboles', [
                {'type': 'tableau', 'titre': 'Éléments courants', 'colonnes': ['Élément', 'Symbole'], 'lignes': [
                    ['hydrogène', 'H'], ['carbone', 'C'], ['azote', 'N'], ['oxygène', 'O'], ['fer', 'Fe'], ['cuivre', 'Cu']]},
                bq('Le symbole du cuivre est :', ['Cu', 'C', 'Cr'], 'Du latin cuprum.'),
            ]),
            ('Un tableau organisé', [
                {'type': 'explique', 'texte': 'Le chimiste Mendeleïev propose le premier tableau périodique en 1869. Les éléments d’une même colonne ont des propriétés voisines.'},
                {'type': 'piege', 'erreur': 'On écrit les symboles à deux lettres avec deux majuscules : CU.', 'correction': 'Seule la première lettre est une majuscule : Cu. CO désigne autre chose : carbone et oxygène.'},
            ]),
        ],
        a_toi=[
            q('N est le symbole de :', ['l’azote', 'le sodium', 'le néon'], 'Du latin nitrogenium.'),
            q('NH₃ contient :', ['1 atome d’azote et 3 d’hydrogène', '3 atomes d’azote', '1 atome de chaque'], 'L’indice 3 porte sur H.'),
            q('Les éléments sont rangés selon :', ['leur numéro atomique', 'leur couleur', 'leur date de découverte'], 'De 1, l’hydrogène, à 118.'),
        ],
        sources=[ref('PC-C4-4E-PERIO-01', 'Le tableau périodique')]),

    'PC-C4-4E-REL-01': dict(duree=5, essentiel=
        'Un mouvement se décrit toujours par rapport à un objet de référence : le référentiel.\n'
        'Assis dans un train, je suis immobile par rapport au wagon, mais en mouvement par rapport au quai.\n'
        'La trajectoire aussi dépend du référentiel.',
        parties=[
            ('Choisir un référentiel', [
                {'type': 'tableau', 'titre': 'Un passager dans un train qui roule', 'colonnes': ['Référentiel', 'Le passager est'], 'lignes': [
                    ['le wagon', 'immobile'], ['le quai', 'en mouvement'], ['un autre train qui roule à la même vitesse, dans le même sens', 'immobile']]},
                bq('Pour un observateur au sol, un satellite géostationnaire semble :', ['immobile', 'tourner très vite', 'tomber'], 'Il tourne avec la Terre.'),
            ]),
            ('La trajectoire change', [
                {'type': 'explique', 'texte': 'La valve d’une roue de vélo décrit un cercle pour le cycliste. Pour un piéton immobile, elle décrit une suite d’arches.'},
                {'type': 'piege', 'erreur': 'On dit qu’un objet « bouge » sans préciser par rapport à quoi.', 'correction': 'Un mouvement n’a de sens que par rapport à un référentiel choisi.'},
            ]),
        ],
        a_toi=[
            q('Par rapport à la route, un conducteur qui roule est :', ['en mouvement', 'immobile', 'sans référentiel'], 'Il se déplace par rapport à la route.'),
            q('Par rapport à sa voiture, le même conducteur est :', ['immobile', 'en mouvement', 'en chute libre'], 'Il reste à sa place.'),
            q('Un référentiel est :', ['l’objet par rapport auquel on décrit le mouvement', 'une unité de vitesse', 'un instrument de mesure'], 'Le quai, le wagon, le sol…'),
        ],
        sources=[ref('PC-C4-4E-REL-01', 'La relativité du mouvement')]),

    'PC-C4-4E-SON-01': dict(duree=6, essentiel=
        'Le son a besoin d’un milieu matériel pour se propager : il ne se propage pas dans le vide.\n'
        'Dans l’air, sa vitesse est d’environ 340 m/s ; il va plus vite dans l’eau et dans les solides.\n'
        'L’oreille humaine entend les sons de 20 Hz à 20 000 Hz. Au-delà de 85 dB, une exposition prolongée abime l’audition.',
        parties=[
            ('La propagation', [
                {'type': 'tableau', 'titre': 'Vitesse du son', 'colonnes': ['Milieu', 'Vitesse environ'], 'lignes': [
                    ['air', '340 m/s'], ['eau', '1 500 m/s'], ['acier', '5 000 m/s'], ['vide', 'pas de propagation']]},
                bq('On voit l’éclair avant d’entendre le tonnerre car :', ['la lumière est beaucoup plus rapide que le son', 'le son part plus tard', 'l’éclair est plus proche'], 'La lumière va à environ 300 000 km/s.'),
            ]),
            ('Protéger son audition', [
                {'type': 'tableau', 'titre': 'Niveaux sonores', 'colonnes': ['Situation', 'Niveau'], 'lignes': [
                    ['conversation', 'environ 60 dB'], ['seuil de danger', '85 dB'], ['concert', 'jusqu’à 105 dB'], ['seuil de douleur', '120 dB']]},
                {'type': 'piege', 'erreur': 'On croit qu’une perte d’audition se remarque tout de suite.', 'correction': 'Elle peut s’installer lentement et durer toute la vie : on limite le volume et la durée d’écoute.'},
            ]),
        ],
        a_toi=[
            q('Le tonnerre arrive 3 s après l’éclair. L’orage est à environ :', ['1 km', '3 km', '100 m'], '340 × 3 ≈ 1 000 m.'),
            q('Un son de 30 000 Hz est :', ['un ultrason', 'un infrason', 'audible par l’humain'], 'Au-delà de 20 000 Hz.'),
            q('Dans le vide de l’espace, le son :', ['ne se propage pas', 'va plus vite', 'va moins vite'], 'Il faut de la matière.'),
        ],
        sources=[ref('PC-C4-4E-SON-01', 'Le son se propage')]),

    'PC-C4-4E-SECU-01': dict(duree=6, essentiel=
        'Un court-circuit ou un trop grand nombre d’appareils branchés provoque une surintensité : les fils chauffent et peuvent prendre feu.\n'
        'Le fusible fond et le disjoncteur coupe le courant pour protéger l’installation.\n'
        'La prise de terre et le disjoncteur différentiel protègent les personnes de l’électrocution.',
        parties=[
            ('Protéger l’installation', [
                {'type': 'tableau', 'titre': 'Dangers et protections', 'colonnes': ['Danger', 'Protection'], 'lignes': [
                    ['surintensité : multiprise surchargée', 'fusible, disjoncteur'], ['court-circuit', 'fusible, disjoncteur'], ['contact avec un appareil défectueux', 'prise de terre, disjoncteur différentiel']]},
                bq('Une multiprise surchargée chauffe car :', ['l’intensité est trop grande', 'la tension est nulle', 'les appareils sont éteints'], 'C’est une surintensité.'),
            ]),
            ('Les bons gestes', [
                {'type': 'observe', 'consigne': 'Des règles.', 'exemples': ['ne pas brancher de multiprises les unes sur les autres', 'couper le disjoncteur avant toute intervention', 'éloigner les appareils électriques de l’eau']},
                {'type': 'piege', 'erreur': 'On remplace un fusible grillé par un fusible plus gros pour qu’il ne fonde plus.', 'correction': 'Il ne protégerait plus : les fils pourraient chauffer jusqu’à l’incendie.'},
            ]),
        ],
        a_toi=[
            q('Le rôle d’un fusible est de :', ['couper le courant en cas de surintensité', 'augmenter la tension', 'éclairer'], 'Il fond.'),
            q('La prise de terre protège surtout :', ['les personnes', 'les ampoules', 'les piles'], 'Elle évacue le courant de fuite.'),
            q('Avant de changer une prise, on :', ['coupe le disjoncteur', 'garde le courant pour vérifier', 'mouille ses mains'], 'On travaille hors tension.'),
        ],
        sources=[ref('PC-C4-4E-SECU-01', 'Électricité et sécurité')]),

    # ---------------------------------------------------------------------- SVT
    'SV-C4-4E-NERF-01': dict(duree=8, essentiel=
        'Un organe des sens capte une information et envoie un message nerveux, par un nerf, vers un centre nerveux : le cerveau ou la moelle épinière.\n'
        'Le centre nerveux élabore une réponse, transmise par un nerf jusqu’aux muscles.\n'
        'Les messages circulent dans des cellules spécialisées, les neurones, reliés par des synapses.',
        parties=[
            ('Le trajet du message', [
                {'type': 'methode', 'titre': 'Je touche un objet brulant', 'etapes': [
                    'La peau capte la chaleur : c’est le récepteur.', 'Un nerf sensitif conduit le message vers la moelle épinière.', 'La moelle épinière élabore une réponse immédiate : c’est un réflexe.', 'Un nerf moteur commande les muscles : je retire la main.']},
                bq('Dans un réflexe de retrait, le centre nerveux est :', ['la moelle épinière', 'l’estomac', 'le cœur'], 'La réponse est très rapide.'),
            ]),
            ('Neurones et synapses', [
                {'type': 'explique', 'texte': 'Au niveau d’une synapse, le message passe d’un neurone à l’autre grâce à des molécules chimiques. Alcool, cannabis et nicotine perturbent ce passage.'},
                {'type': 'piege', 'erreur': 'On croit que les nerfs prennent des décisions.', 'correction': 'Les nerfs transportent les messages. Ce sont les centres nerveux qui élaborent les réponses.'},
            ]),
        ],
        a_toi=[
            q('Un neurone est :', ['une cellule nerveuse', 'un muscle', 'un os'], 'Il transmet le message nerveux.'),
            q('Le nerf qui conduit le message vers un muscle est :', ['moteur', 'sensitif', 'digestif'], 'Il commande le mouvement.'),
            q('L’alcool agit sur le système nerveux au niveau :', ['des synapses', 'des os', 'des poumons'], 'Il perturbe le passage des messages.'),
        ],
        sources=[ref('SV-C4-4E-NERF-01', 'Système nerveux et cerveau')]),

    'SV-C4-4E-REPRO-01': dict(duree=7, essentiel=
        'À partir de la puberté, sous l’action d’hormones, les testicules produisent des spermatozoïdes en continu.\n'
        'Les ovaires libèrent en général un ovule par cycle d’environ 28 jours. Sans fécondation, la muqueuse de l’utérus s’élimine : ce sont les règles.\n'
        'Des moyens de contraception permettent de choisir le moment d’avoir un enfant ; le préservatif protège aussi des infections sexuellement transmissibles.',
        parties=[
            ('Le fonctionnement des appareils reproducteurs', [
                {'type': 'tableau', 'titre': 'À partir de la puberté', 'colonnes': ['Appareil', 'Organe producteur', 'Cellules produites'], 'lignes': [
                    ['masculin', 'testicules', 'spermatozoïdes, en continu'], ['féminin', 'ovaires', 'un ovule environ tous les 28 jours']]},
                bq('Les règles correspondent à :', ['l’élimination de la muqueuse de l’utérus', 'la libération d’un ovule', 'la fécondation'], 'Elles ont lieu en l’absence de fécondation.'),
            ]),
            ('Des comportements responsables', [
                {'type': 'tableau', 'titre': 'Contraception et protection', 'colonnes': ['Moyen', 'Rôle'], 'lignes': [
                    ['préservatif', 'empêche la rencontre des gamètes et protège des IST'], ['pilule', 'empêche l’ovulation, ne protège pas des IST']]},
                {'type': 'piege', 'erreur': 'On croit que la pilule protège des infections sexuellement transmissibles.', 'correction': 'Seul le préservatif protège des IST. Le respect du consentement de chacun est indispensable.'},
            ]),
        ],
        a_toi=[
            q('Les spermatozoïdes sont produits par :', ['les testicules', 'les ovaires', 'l’utérus'], 'En continu à partir de la puberté.'),
            q('Le seul moyen qui protège des IST est :', ['le préservatif', 'la pilule', 'le stérilet'], 'Il fait barrière.'),
            q('Un cycle menstruel dure en moyenne :', ['28 jours', '7 jours', '1 an'], 'Il peut varier selon les personnes.'),
        ],
        sources=[ref('SV-C4-4E-REPRO-01', 'Puberté et reproduction')]),

    'SV-C4-4E-GEOL-01': dict(duree=8, essentiel=
        'La surface de la Terre est découpée en plaques lithosphériques qui se déplacent de quelques centimètres par an.\n'
        'À leurs frontières, les mouvements provoquent des séismes et du volcanisme.\n'
        'Au Japon, à la frontière de plusieurs plaques, séismes et éruptions sont fréquents.',
        parties=[
            ('Les frontières de plaques', [
                {'type': 'tableau', 'titre': 'Trois mouvements', 'colonnes': ['Mouvement', 'Ce qui se passe', 'Exemple'], 'lignes': [
                    ['divergence', 'les plaques s’écartent, un nouveau plancher océanique se forme', 'dorsale de l’Atlantique, Islande'], ['convergence', 'une plaque plonge sous l’autre : séismes, volcans explosifs', 'Japon, Andes'], ['coulissage', 'les plaques glissent l’une contre l’autre : séismes', 'faille de San Andreas']]},
                bq('Les plaques lithosphériques se déplacent d’environ :', ['quelques centimètres par an', 'quelques mètres par jour', 'un kilomètre par an'], 'Comme la croissance des ongles.'),
            ]),
            ('Un séisme', [
                {'type': 'explique', 'texte': 'Un séisme naît d’une rupture des roches en profondeur, au foyer. L’épicentre est le point de la surface situé juste au-dessus.'},
                {'type': 'piege', 'erreur': 'On croit que les séismes se produisent n’importe où au hasard.', 'correction': 'La plupart se situent aux frontières des plaques.'},
            ]),
        ],
        a_toi=[
            q('L’épicentre d’un séisme est :', ['le point de la surface au-dessus du foyer', 'le centre de la Terre', 'le cratère d’un volcan'], 'Le foyer est en profondeur.'),
            q('À une dorsale océanique, les plaques :', ['s’écartent', 'se rapprochent', 'restent immobiles'], 'Un nouveau plancher se forme.'),
            q('Les volcans explosifs se trouvent surtout dans les zones de :', ['convergence', 'divergence', 'plaine'], 'Une plaque plonge sous l’autre.'),
        ],
        sources=[ref('SV-C4-4E-GEOL-01', 'Séismes, volcans et plaques')]),

    'SV-C4-4E-ALIM-01': dict(duree=6, essentiel=
        'Les aliments apportent de l’énergie et des matériaux pour construire et entretenir le corps.\n'
        'Les féculents apportent l’énergie. Viandes, poissons, œufs et légumineuses apportent les protéines. Fruits et légumes apportent vitamines et fibres.\n'
        'Les besoins varient selon l’âge, la croissance et l’activité physique.',
        parties=[
            ('Les groupes d’aliments', [
                {'type': 'tableau', 'titre': 'Apports principaux', 'colonnes': ['Groupe', 'Apport'], 'lignes': [
                    ['féculents', 'énergie'], ['viandes, poissons, œufs, légumineuses', 'protéines'], ['produits laitiers', 'calcium, protéines'], ['fruits et légumes', 'vitamines, fibres'], ['matières grasses', 'énergie, à consommer avec modération']]},
                bq('Le poisson apporte surtout :', ['des protéines', 'des fibres', 'des sucres'], 'Elles construisent et réparent les muscles.'),
            ]),
            ('Des besoins variables', [
                {'type': 'explique', 'texte': 'Un adolescent en croissance et une personne très active ont des besoins plus élevés qu’une personne âgée sédentaire.'},
                {'type': 'piege', 'erreur': 'On croit qu’un aliment suffit à lui seul.', 'correction': 'Aucun aliment ne contient tout : la variété assure tous les apports.'},
            ]),
        ],
        a_toi=[
            q('Le calcium, utile aux os, se trouve surtout dans :', ['les produits laitiers', 'les pâtes', 'l’huile'], 'Lait, yaourt, fromage.'),
            q('Les besoins en énergie augmentent avec :', ['l’activité physique', 'le sommeil', 'le froid seulement'], 'Les muscles consomment plus.'),
            q('Les lentilles sont riches en :', ['protéines', 'vitamine C', 'calcium'], 'Ce sont des légumineuses.'),
        ],
        sources=[ref('SV-C4-4E-ALIM-01', 'Besoins alimentaires')]),

    'SV-C4-4E-MICRO-01': dict(duree=7, essentiel=
        'Les micro-organismes sont partout : dans l’air, le sol, l’eau et dans notre corps. La plupart sont inoffensifs ou utiles.\n'
        'Notre intestin abrite des milliards de bactéries, le microbiote, qui aident la digestion.\n'
        'Les antibiotiques tuent les bactéries, mais ils n’ont aucun effet sur les virus.',
        parties=[
            ('Utiles ou pathogènes', [
                {'type': 'tableau', 'titre': 'Des micro-organismes', 'colonnes': ['Micro-organisme', 'Effet'], 'lignes': [
                    ['bactéries du yaourt', 'transforment le lait'], ['levures', 'font lever le pain'], ['bactéries du microbiote', 'aident la digestion'], ['virus de la grippe', 'provoque une maladie']]},
                bq('Un micro-organisme qui provoque une maladie est dit :', ['pathogène', 'utile', 'inoffensif'], 'Il cause une infection.'),
            ]),
            ('Les antibiotiques', [
                {'type': 'explique', 'texte': 'Utiliser des antibiotiques sans raison favorise des bactéries résistantes. On les prend seulement sur prescription, jusqu’au bout du traitement.'},
                {'type': 'piege', 'erreur': 'On prend un antibiotique contre un rhume ou une grippe.', 'correction': 'Ce sont des maladies dues à des virus : les antibiotiques n’agissent pas sur eux.'},
            ]),
        ],
        a_toi=[
            q('Les antibiotiques agissent sur :', ['les bactéries', 'les virus', 'tous les micro-organismes'], 'Pas sur les virus.'),
            q('Le microbiote intestinal :', ['aide la digestion', 'provoque toujours des maladies', 'n’existe pas'], 'Des milliards de bactéries utiles.'),
            q('Prendre des antibiotiques sans raison favorise :', ['des bactéries résistantes', 'une meilleure santé', 'la disparition des virus'], 'Les bactéries s’adaptent.'),
        ],
        sources=[ref('SV-C4-4E-MICRO-01', 'Le monde microbien')]),

    'SV-C4-4E-RISQ-01': dict(duree=6, essentiel=
        'Un aléa est un phénomène naturel possible : séisme, inondation, éruption. Les enjeux sont les personnes et les biens exposés.\n'
        'Le risque existe quand un aléa menace des enjeux. Un séisme dans un désert vide ne crée pas de risque majeur.\n'
        'On réduit le risque par la prévision, la prévention et la protection.',
        parties=[
            ('Aléa, enjeux, risque', [
                {'type': 'tableau', 'titre': 'Comparer', 'colonnes': ['Situation', 'Aléa', 'Enjeux', 'Risque'], 'lignes': [
                    ['séisme dans un désert', 'fort', 'très faibles', 'faible'], ['séisme sous une grande ville', 'fort', 'très forts', 'majeur'], ['crue dans une vallée habitée', 'moyen', 'forts', 'élevé']]},
                bq('Les enjeux désignent :', ['les personnes et les biens exposés', 'la force du séisme', 'la météo'], 'Ce qui peut être touché.'),
            ]),
            ('Réduire le risque', [
                {'type': 'tableau', 'titre': 'Trois types de mesures', 'colonnes': ['Mesure', 'Exemple'], 'lignes': [
                    ['prévision', 'surveiller un volcan, vigilance météo'], ['prévention', 'interdire de construire en zone inondable, exercices'], ['protection', 'digues, bâtiments parasismiques']]},
                {'type': 'piege', 'erreur': 'On croit qu’on peut supprimer l’aléa.', 'correction': 'On ne peut pas empêcher un séisme. On agit sur les enjeux : leur exposition et leur vulnérabilité.'},
            ]),
        ],
        a_toi=[
            q('Construire une digue est une mesure de :', ['protection', 'prévision', 'prévention seulement'], 'Elle protège des inondations.'),
            q('Surveiller un volcan avec des capteurs, c’est de la :', ['prévision', 'protection', 'reconstruction'], 'On anticipe l’éruption.'),
            q('Un risque majeur suppose :', ['un aléa et des enjeux importants', 'un aléa seul', 'des enjeux sans aléa'], 'Les deux ensemble.'),
        ],
        sources=[ref('SV-C4-4E-RISQ-01', 'Aléas et risques naturels')]),

    'SV-C4-4E-POP-01': dict(duree=6, essentiel=
        'L’effectif d’une population varie selon les naissances, les morts, les arrivées et les départs.\n'
        'Les ressources disponibles et les prédateurs influencent ces variations.\n'
        'Quand les lynx sont nombreux, les lièvres diminuent ; puis les lynx, privés de nourriture, diminuent à leur tour.',
        parties=[
            ('Ce qui fait varier une population', [
                {'type': 'tableau', 'titre': 'Facteurs', 'colonnes': ['L’effectif augmente si…', 'L’effectif diminue si…'], 'lignes': [
                    ['les naissances sont nombreuses', 'les morts sont nombreuses'], ['la nourriture abonde', 'la nourriture manque'], ['les prédateurs sont rares', 'les prédateurs sont nombreux']]},
                bq('Les lièvres deviennent rares. Les lynx vont :', ['diminuer', 'augmenter', 'rester stables'], 'Leur nourriture manque.'),
            ]),
            ('Des cycles', [
                {'type': 'explique', 'texte': 'Les effectifs des lynx et des lièvres du Canada varient en cycles d’une dizaine d’années, les pics des lynx suivant ceux des lièvres.'},
                {'type': 'piege', 'erreur': 'On croit que les prédateurs finissent par faire disparaitre leurs proies.', 'correction': 'Quand les proies se raréfient, les prédateurs diminuent aussi : les proies peuvent se reconstituer.'},
            ]),
        ],
        a_toi=[
            q('L’effectif d’une population est :', ['le nombre d’individus', 'la taille des individus', 'leur âge moyen'], 'On compte les individus.'),
            q('Une population augmente si :', ['les naissances dépassent les morts', 'les morts dépassent les naissances', 'la nourriture manque'], 'Le solde est positif.'),
            q('Dans le cycle lynx-lièvres, le pic des lynx arrive :', ['après celui des lièvres', 'avant celui des lièvres', 'au hasard'], 'Ils ont d’abord besoin de proies.'),
        ],
        sources=[ref('SV-C4-4E-POP-01', 'Dynamique des populations')]),

    'SV-C4-4E-HYG-01': dict(duree=6, essentiel=
        'Le cerveau a besoin de sommeil pour fixer les apprentissages : le manque de sommeil réduit l’attention et la mémorisation.\n'
        'Les écrans le soir retardent l’endormissement.\n'
        'L’alcool, le tabac et le cannabis perturbent le fonctionnement des neurones et peuvent entrainer une dépendance.',
        parties=[
            ('Le sommeil', [
                {'type': 'tableau', 'titre': 'Ce qui aide ou gêne', 'colonnes': ['Aide le sommeil', 'Gêne le sommeil'], 'lignes': [
                    ['horaires réguliers', 'écrans juste avant de dormir'], ['chambre calme et sombre', 'boissons excitantes : soda, café'], ['activité physique dans la journée', 'notifications la nuit']]},
                bq('Le manque de sommeil diminue :', ['l’attention et la mémoire', 'la taille', 'la vue'], 'Le cerveau récupère et trie pendant le sommeil.'),
            ]),
            ('Les substances', [
                {'type': 'explique', 'texte': 'Le cerveau des adolescents est encore en développement. Il est plus sensible aux effets de l’alcool, du tabac et du cannabis.'},
                {'type': 'piege', 'erreur': 'On croit qu’on peut rattraper toutes ses nuits courtes le week-end.', 'correction': 'Le rythme irrégulier dérègle l’horloge du corps : la régularité compte autant que la durée.'},
            ]),
        ],
        a_toi=[
            q('La lumière des écrans le soir :', ['retarde l’endormissement', 'aide à dormir', 'n’a aucun effet'], 'Elle trompe l’horloge du corps.'),
            q('Une dépendance, c’est :', ['ne plus pouvoir se passer d’une substance', 'un bon sommeil', 'une allergie'], 'Le cerveau réclame la substance.'),
            q('Pendant le sommeil, le cerveau :', ['consolide les souvenirs', 's’arrête complètement', 'oublie tout'], 'Il fixe ce qu’on a appris.'),
        ],
        sources=[ref('SV-C4-4E-HYG-01', 'Cerveau et hygiène de vie')]),

    'SV-C4-4E-VENT-01': dict(duree=6, essentiel=
        'Le Soleil chauffe inégalement la Terre : plus à l’équateur qu’aux pôles.\n'
        'Ces différences de température créent des mouvements de l’air, les vents, et de l’eau des océans, les courants.\n'
        'Le Gulf Stream apporte des eaux chaudes vers l’Europe de l’Ouest et adoucit son climat.',
        parties=[
            ('Les vents', [
                {'type': 'explique', 'texte': 'L’air chaud, plus léger, s’élève : la pression baisse au sol. L’air plus froid arrive pour le remplacer : c’est le vent.'},
                {'type': 'tableau', 'titre': 'Brise de mer et brise de terre', 'colonnes': ['Moment', 'Plus chaud', 'Le vent souffle'], 'lignes': [
                    ['journée', 'la terre', 'de la mer vers la terre'], ['nuit', 'la mer', 'de la terre vers la mer']]},
                bq('Le vent souffle des zones de :', ['hautes pressions vers les basses pressions', 'basses vers hautes pressions', 'pressions égales'], 'L’air va combler le vide relatif.'),
            ]),
            ('Les courants océaniques', [
                {'type': 'explique', 'texte': 'Les courants transportent la chaleur des régions tropicales vers les hautes latitudes. Les eaux froides et denses plongent près des pôles.'},
                {'type': 'piege', 'erreur': 'On croit que l’hiver doux de Brest s’explique seulement par sa latitude.', 'correction': 'À la même latitude, le Canada est bien plus froid : le Gulf Stream réchauffe l’Europe de l’Ouest.'},
            ]),
        ],
        a_toi=[
            q('La journée, au bord de la mer, la brise souffle :', ['de la mer vers la terre', 'de la terre vers la mer', 'verticalement'], 'La terre se réchauffe plus vite.'),
            q('Le Gulf Stream est :', ['un courant océanique chaud', 'un vent froid', 'une montagne sous-marine'], 'Il part du golfe du Mexique.'),
            q('Le moteur des vents et des courants est :', ['l’énergie du Soleil', 'la rotation de la Lune', 'les volcans'], 'Il chauffe inégalement la Terre.'),
        ],
        sources=[ref('SV-C4-4E-VENT-01', 'Vents et courants océaniques')]),

    'SV-C4-4E-PRES-01': dict(duree=6, essentiel=
        'Les activités humaines fragmentent et dégradent les milieux : routes, villes, pollution.\n'
        'Des solutions existent : trames vertes et bleues, zones protégées, stations d’épuration.\n'
        'Un passage à faune sous une autoroute reconnecte deux forêts et permet aux animaux de circuler.',
        parties=[
            ('Des solutions', [
                {'type': 'tableau', 'titre': 'Préserver et restaurer', 'colonnes': ['Solution', 'Effet'], 'lignes': [
                    ['trame verte : haies, bois reliés', 'les espèces terrestres circulent'], ['trame bleue : rivières sans barrage infranchissable', 'les poissons remontent les cours d’eau'],
                    ['parc national, réserve naturelle', 'les espèces et milieux sont protégés'], ['station d’épuration', 'les eaux usées sont nettoyées avant de rejoindre les rivières']]},
                bq('Une passe à poissons permet de :', ['franchir un barrage', 'pêcher plus', 'arrêter les poissons'], 'Elle rétablit la continuité de la rivière.'),
            ]),
            ('Argumenter', [
                {'type': 'methode', 'titre': 'Pour défendre une solution', 'etapes': [
                    'Décris le problème : quel milieu, quelle espèce menacée ?', 'Présente la solution.', 'Explique son effet, preuves à l’appui.', 'Indique ses limites, comme son cout.']},
                {'type': 'piege', 'erreur': 'On croit qu’une zone protégée isolée suffit.', 'correction': 'Si elle n’est reliée à rien, les populations s’isolent : il faut aussi des corridors.'},
            ]),
        ],
        a_toi=[
            q('La fragmentation d’un milieu, c’est :', ['son découpage par des routes ou des villes', 'sa protection', 'sa pollution sonore seulement'], 'Les populations sont séparées.'),
            q('Replanter des haies entre les champs, c’est :', ['restaurer une trame verte', 'construire une digue', 'traiter les eaux usées'], 'Les animaux circulent d’un bois à l’autre.'),
            q('Une station d’épuration :', ['nettoie les eaux usées', 'produit de l’eau de mer', 'pompe l’eau des nappes'], 'Avant le rejet dans la nature.'),
        ],
        sources=[ref('SV-C4-4E-PRES-01', 'Préserver et restaurer les milieux')]),

    # ------------------------------------------------------------- Technologie
    'TE-C4-4E-NUM-01': dict(duree=6, essentiel=
        'Tout ce que l’on publie et laisse en ligne forme notre identité numérique.\n'
        'Les cookies, ou témoins de connexion, enregistrent notre navigation ; la géolocalisation révèle où nous sommes.\n'
        'Les œuvres en ligne sont protégées par le droit d’auteur : on vérifie leur licence avant de les réutiliser.',
        parties=[
            ('Maitriser ses traces', [
                {'type': 'tableau', 'titre': 'Des réglages utiles', 'colonnes': ['Situation', 'Bon réflexe'], 'lignes': [
                    ['bandeau de cookies', 'refuser les cookies non nécessaires'], ['application qui demande la position', 'autoriser seulement pendant l’utilisation, si c’est utile'], ['profil sur un réseau social', 'compte privé, peu d’informations personnelles']]},
                bq('Accepter tous les cookies d’un site permet :', ['de suivre ta navigation', 'de protéger ton ordinateur', 'd’accélérer Internet'], 'Ils servent souvent à la publicité ciblée.'),
            ]),
            ('Respecter les auteurs', [
                {'type': 'explique', 'texte': 'Une image sous licence Creative Commons peut être réutilisée en respectant ses conditions, par exemple en citant l’auteur.'},
                {'type': 'piege', 'erreur': 'On croit qu’une image trouvée sur Internet est libre de droits.', 'correction': 'Par défaut, elle appartient à son auteur. On vérifie la licence ou on demande l’autorisation.'},
            ]),
        ],
        a_toi=[
            q('Ton identité numérique comprend :', ['tout ce que tu publies et ce qu’on publie sur toi', 'seulement ton mot de passe', 'ton adresse postale seulement'], 'Elle se construit au fil du temps.'),
            q('Les cookies sont :', ['des fichiers qui enregistrent ta navigation', 'des virus', 'des mots de passe'], 'Ils sont aussi appelés témoins de connexion.'),
            q('Pour réutiliser une photo trouvée en ligne, on vérifie :', ['sa licence', 'sa taille', 'sa couleur'], 'Le droit d’auteur s’applique.'),
        ],
        sources=[ref('TE-C4-4E-NUM-01', 'Usage raisonné du numérique')]),

    'TE-C4-4E-DD-01': dict(duree=6, essentiel=
        'Pour choisir entre plusieurs objets qui répondent au même besoin, on les compare selon des critères.\n'
        'Critères possibles : consommation d’énergie, durée de vie, bilan carbone, prix, recyclage.\n'
        'Une lampe à DEL consomme beaucoup moins et dure beaucoup plus longtemps qu’une lampe halogène.',
        parties=[
            ('Comparer', [
                {'type': 'tableau', 'titre': 'Éclairer la classe', 'colonnes': ['Critère', 'Lampe à DEL', 'Lampe halogène'], 'lignes': [
                    ['puissance pour un même éclairage', 'faible', 'élevée'], ['durée de vie', 'très longue', 'courte'], ['prix d’achat', 'plus élevé', 'plus faible'], ['cout sur plusieurs années', 'plus faible', 'plus élevé']]},
                bq('Sur plusieurs années, la lampe la plus économique est :', ['la lampe à DEL', 'la lampe halogène', 'aucune différence'], 'Elle consomme peu et dure longtemps.'),
            ]),
            ('Le bilan carbone', [
                {'type': 'explique', 'texte': 'Le bilan carbone additionne les gaz à effet de serre émis à toutes les étapes du cycle de vie de l’objet.'},
                {'type': 'piege', 'erreur': 'On choisit seulement selon le prix d’achat.', 'correction': 'Un objet moins cher peut couter plus à l’usage et durer moins longtemps.'},
            ]),
        ],
        a_toi=[
            q('L’étiquette énergie classe les appareils de :', ['A à G', '1 à 100', 'rouge à bleu sans lettres'], 'A est le plus économe.'),
            q('Le bilan carbone d’un objet tient compte :', ['de tout son cycle de vie', 'de sa couleur', 'de son seul transport'], 'De l’extraction à la fin de vie.'),
            q('Pour comparer deux objets, on utilise :', ['les mêmes critères pour chacun', 'des critères différents', 'son intuition'], 'Une comparaison juste.'),
        ],
        sources=[ref('TE-C4-4E-DD-01', 'Comparer des objets')]),

    'TE-C4-4E-MAT-01': dict(duree=6, essentiel=
        'La forme d’une pièce dépend de son procédé de fabrication et de son matériau.\n'
        'Le plastique se moule ou s’imprime en 3D ; le bois se découpe et s’assemble ; le métal se plie, se perce ou se moule.\n'
        'Une coque de téléphone en plastique est obtenue par moulage.',
        parties=[
            ('Procédés', [
                {'type': 'tableau', 'titre': 'Matériaux et procédés', 'colonnes': ['Procédé', 'Principe', 'Exemple'], 'lignes': [
                    ['moulage', 'matière chaude injectée dans un moule', 'coque en plastique'], ['découpe', 'on enlève la matière en trop', 'support en bois'], ['pliage', 'on déforme une tôle', 'boitier en aluminium'], ['impression 3D', 'on ajoute la matière couche par couche', 'prototype en plastique']]},
                bq('Une pièce fabriquée couche par couche est obtenue par :', ['impression 3D', 'moulage', 'pliage'], 'C’est une fabrication additive.'),
            ]),
            ('Choisir', [
                {'type': 'piege', 'erreur': 'On choisit un procédé sans penser à la quantité à produire.', 'correction': 'Un moule coute cher : il est rentable pour des milliers de pièces. Pour un prototype, l’impression 3D convient mieux.'},
            ]),
        ],
        a_toi=[
            q('Pour fabriquer des milliers de coques identiques, on choisit :', ['le moulage', 'l’impression 3D', 'la découpe à la main'], 'Rapide une fois le moule fait.'),
            q('La découpe est un procédé :', ['par enlèvement de matière', 'par ajout de matière', 'par fusion'], 'On retire ce qui dépasse.'),
            q('L’impression 3D est particulièrement adaptée pour :', ['un prototype', 'un million de pièces', 'une poutre en acier'], 'Peu de pièces, forme libre.'),
        ],
        sources=[ref('TE-C4-4E-MAT-01', 'Matériaux et procédés')]),

    'TE-C4-4E-INFO-01': dict(duree=6, essentiel=
        'La chaine d’information d’un objet assure trois fonctions : acquérir, traiter, communiquer.\n'
        'Dans un éclairage automatique, le détecteur de présence acquiert, le microcontrôleur traite, le signal commande la lampe.\n'
        'Chaque constituant correspond à une fonction.',
        parties=[
            ('Associer constituants et fonctions', [
                {'type': 'tableau', 'titre': 'Des objets', 'colonnes': ['Objet', 'Acquérir', 'Traiter', 'Communiquer'], 'lignes': [
                    ['éclairage automatique', 'détecteur de présence', 'microcontrôleur', 'signal vers la lampe'], ['alarme', 'capteur d’ouverture', 'carte programmable', 'sirène, message'], ['station météo', 'capteurs de température', 'microcontrôleur', 'écran']]},
                bq('Dans une alarme, le capteur d’ouverture de porte :', ['acquiert une information', 'traite l’information', 'communique'], 'Il détecte l’ouverture.'),
            ]),
            ('Information et énergie', [
                {'type': 'piege', 'erreur': 'On confond chaine d’information et chaine d’énergie.', 'correction': 'La chaine d’information décide ; la chaine d’énergie agit : alimenter, distribuer, convertir, transmettre.'},
            ]),
        ],
        a_toi=[
            q('La fonction « traiter » est assurée par :', ['le microcontrôleur', 'le capteur', 'la lampe'], 'Il exécute le programme.'),
            q('Un écran qui affiche la température :', ['communique', 'acquiert', 'convertit l’énergie'], 'Il transmet l’information à l’utilisateur.'),
            q('Les trois fonctions de la chaine d’information sont :', ['acquérir, traiter, communiquer', 'alimenter, distribuer, convertir', 'mesurer, couper, coller'], 'Dans cet ordre.'),
        ],
        sources=[ref('TE-C4-4E-INFO-01', 'La chaine d’information')]),

    'TE-C4-4E-RES-01': dict(duree=7, essentiel=
        'Sur un réseau local, chaque appareil a une adresse IP unique, formée de quatre nombres entre 0 et 255 : 192.168.1.20.\n'
        'Les appareils d’un même réseau local partagent le début de leur adresse, par exemple 192.168.1.\n'
        'Pour ajouter un objet, on lui donne une adresse libre du même réseau.',
        parties=[
            ('Paramétrer une adresse', [
                {'type': 'tableau', 'titre': 'Le réseau de la classe', 'colonnes': ['Appareil', 'Adresse IP'], 'lignes': [
                    ['box', '192.168.1.1'], ['ordinateur 1', '192.168.1.10'], ['ordinateur 2', '192.168.1.11'], ['nouvelle imprimante', '192.168.1.20']]},
                bq('Quelle adresse donner à un nouvel ordinateur de ce réseau ?', ['192.168.1.30', '192.168.2.30', '192.168.1.10'], 'Même début, nombre final libre.'),
            ]),
            ('Résoudre un problème', [
                {'type': 'methode', 'titre': 'Un appareil ne communique pas', 'etapes': [
                    'Vérifie le câble ou la connexion Wi-Fi.', 'Vérifie que l’adresse commence comme les autres.', 'Vérifie qu’aucun autre appareil n’a la même adresse.', 'Teste la liaison avec la commande ping.']},
                {'type': 'piege', 'erreur': 'On donne à deux appareils la même adresse IP.', 'correction': 'Les données ne savent plus où aller : chaque adresse doit être unique.'},
            ]),
        ],
        a_toi=[
            q('Quelle adresse IP est invalide ?', ['192.168.1.300', '192.168.1.30', '10.0.0.1'], 'Chaque nombre va de 0 à 255.'),
            q('La commande ping sert à :', ['tester si un appareil répond', 'imprimer', 'changer de mot de passe'], 'Elle envoie un message et attend la réponse.'),
            q('Deux appareils d’un même réseau local ont :', ['le même début d’adresse', 'la même adresse complète', 'des adresses sans rapport'], 'Seul le dernier nombre change.'),
        ],
        sources=[ref('TE-C4-4E-RES-01', 'Réseau local et adresse IP')]),

    'TE-C4-4E-PROG-01': dict(duree=6, essentiel=
        'Pour ajouter une fonctionnalité, on analyse les données du capteur, puis on complète le programme.\n'
        'Serre automatique : si la température dépasse 30 °C, alors le ventilateur se met en marche.\n'
        'On teste ensuite dans plusieurs situations pour valider la modification.',
        parties=[
            ('Compléter', [
                {'type': 'methode', 'titre': 'Programme de la serre', 'etapes': [
                    'Répéter indéfiniment :', 'lire la température ;', 'si la température > 30, alors allumer le ventilateur ;', 'sinon, éteindre le ventilateur.']},
                bq('La température est de 28 °C. Le ventilateur est :', ['éteint', 'allumé', 'cassé'], '28 n’est pas supérieur à 30.'),
            ]),
            ('Tester et valider', [
                {'type': 'tableau', 'titre': 'Plan de test', 'colonnes': ['Température simulée', 'Attendu', 'Observé'], 'lignes': [
                    ['25 °C', 'ventilateur éteint', 'à noter'], ['30 °C', 'ventilateur éteint', 'à noter'], ['32 °C', 'ventilateur allumé', 'à noter']]},
                {'type': 'piege', 'erreur': 'On teste seulement un cas qui marche.', 'correction': 'On teste aussi la valeur limite, ici 30 °C, et les cas opposés.'},
            ]),
        ],
        a_toi=[
            q('La valeur 30 °C est, pour le programme :', ['un seuil', 'un capteur', 'un actionneur'], 'Elle déclenche le changement.'),
            q('Pour valider un programme, on :', ['le teste dans plusieurs situations', 'le relit une fois', 'le copie'], 'Y compris les cas limites.'),
            q('Pour allumer le ventilateur dès 28 °C, on modifie :', ['le seuil', 'le capteur', 'le ventilateur'], 'On remplace 30 par 28.'),
        ],
        sources=[ref('TE-C4-4E-PROG-01', 'Compléter et tester un programme')]),

    'TE-C4-4E-CONT-01': dict(duree=6, essentiel=
        'Un cahier des charges décrit ce que doit faire un objet et les contraintes à respecter : cout, sécurité, environnement, normes.\n'
        'Les normes et labels garantissent certaines qualités.\n'
        'Un jouet vendu en Europe doit porter le marquage CE et ne pas contenir de petites pièces avant 3 ans.',
        parties=[
            ('Contraintes et exigences', [
                {'type': 'tableau', 'titre': 'Un jouet pour enfant de 2 ans', 'colonnes': ['Contrainte', 'Exigence'], 'lignes': [
                    ['sécurité', 'pas de petites pièces, pas de bords coupants'], ['santé', 'peinture sans substances toxiques'], ['réglementation', 'marquage CE'], ['cout', 'prix de vente maximal']]},
                bq('Le marquage CE indique que le produit :', ['respecte les exigences européennes', 'est fabriqué en Europe', 'est gratuit'], 'Il ne dit pas où il a été fabriqué.'),
            ]),
            ('Normes et labels', [
                {'type': 'explique', 'texte': 'Une norme fixe des règles communes, par exemple la forme d’une prise. Un label signale une qualité, comme un faible impact environnemental.'},
                {'type': 'piege', 'erreur': 'On croit que CE signifie « fabriqué en Europe ».', 'correction': 'C’est une déclaration de conformité aux règles européennes, quel que soit le pays de fabrication.'},
            ]),
        ],
        a_toi=[
            q('Un cahier des charges décrit :', ['les fonctions et les contraintes d’un objet', 'le mode d’emploi seulement', 'le prix de vente seulement'], 'Il guide la conception.'),
            q('Une norme sert à :', ['fixer des règles communes', 'faire de la publicité', 'augmenter le prix'], 'Par exemple la forme des prises.'),
            q('Les petites pièces sont interdites dans les jouets avant 3 ans à cause du risque :', ['d’étouffement', 'd’incendie', 'd’électrocution'], 'Les jeunes enfants les portent à la bouche.'),
        ],
        sources=[ref('TE-C4-4E-CONT-01', 'Contraintes et cahier des charges')]),

    'TE-C4-4E-PERF-01': dict(duree=6, essentiel=
        'Pour mesurer une performance, on choisit l’appareil adapté et on suit un protocole précis.\n'
        'Vitesse : mètre et chronomètre. Autonomie : chronomètre, batterie chargée à 100 %. Consommation : wattmètre.\n'
        'On répète la mesure et on note les résultats dans un tableau.',
        parties=[
            ('Choisir l’appareil', [
                {'type': 'tableau', 'titre': 'Performances et appareils', 'colonnes': ['Performance', 'Appareil', 'Unité'], 'lignes': [
                    ['vitesse', 'mètre et chronomètre', 'm/s'], ['autonomie', 'chronomètre', 'h, min'], ['consommation électrique', 'wattmètre', 'W, Wh'], ['masse', 'balance', 'g, kg']]},
                bq('Pour mesurer l’énergie consommée par un appareil branché, on utilise :', ['un wattmètre', 'un chronomètre seul', 'un thermomètre'], 'Il se branche entre la prise et l’appareil.'),
            ]),
            ('Suivre un protocole', [
                {'type': 'methode', 'titre': 'Mesurer l’autonomie d’un robot', 'etapes': [
                    'Charge la batterie à 100 %.', 'Lance le robot sur un parcours défini et démarre le chronomètre.', 'Arrête le chronomètre quand le robot s’arrête.', 'Recommence trois fois et calcule la moyenne.']},
                {'type': 'piege', 'erreur': 'On compare deux robots testés dans des conditions différentes.', 'correction': 'Même parcours, même charge de départ : sinon la comparaison n’a pas de sens.'},
            ]),
        ],
        a_toi=[
            q('Un robot parcourt 6 m en 3 s. Sa vitesse :', ['2 m/s', '18 m/s', '0,5 m/s'], '6 ÷ 3.'),
            q('Pourquoi répéter une mesure ?', ['pour limiter l’effet des erreurs', 'pour perdre du temps', 'pour changer d’unité'], 'On calcule une moyenne.'),
            q('Un protocole est :', ['une suite d’étapes précises à suivre', 'un appareil de mesure', 'un résultat'], 'Il permet de reproduire la mesure.'),
        ],
        sources=[ref('TE-C4-4E-PERF-01', 'Mesurer une performance')]),

    'TE-C4-4E-DATA-01': dict(duree=6, essentiel=
        'Un tableur range les données dans des cellules repérées par une colonne et une ligne : A1, B3.\n'
        'Une formule commence par = : =MOYENNE(B2:B10) calcule la moyenne des cellules B2 à B10.\n'
        'Trier range les lignes dans un ordre ; filtrer n’affiche que celles qui respectent une condition.',
        parties=[
            ('Calculer', [
                {'type': 'tableau', 'titre': 'Des formules', 'colonnes': ['Formule', 'Résultat'], 'lignes': [
                    ['=SOMME(B2:B10)', 'somme des valeurs'], ['=MOYENNE(B2:B10)', 'moyenne'], ['=MAX(B2:B10)', 'plus grande valeur'], ['=MIN(B2:B10)', 'plus petite valeur']]},
                bq('Pour trouver la température la plus élevée relevée, on utilise :', ['=MAX(…)', '=MIN(…)', '=SOMME(…)'], 'MAX renvoie la plus grande valeur.'),
            ]),
            ('Trier et filtrer', [
                {'type': 'explique', 'texte': 'Trier les relevés du plus chaud au plus froid montre les extrêmes. Filtrer « > 25 » n’affiche que les moments où il a fait plus de 25 °C.'},
                {'type': 'piege', 'erreur': 'On trie une seule colonne et les données se mélangent.', 'correction': 'On trie toutes les colonnes ensemble pour que chaque heure garde sa température.'},
            ]),
        ],
        a_toi=[
            q('Une formule de tableur commence par :', ['=', '+', '#'], 'Sinon c’est du texte.'),
            q('Filtrer des données, c’est :', ['n’afficher que celles qui respectent une condition', 'les supprimer toutes', 'les colorier'], 'Les autres sont masquées, pas effacées.'),
            q('La cellule C4 se trouve :', ['colonne C, ligne 4', 'colonne 4, ligne C', 'feuille C, page 4'], 'Lettre pour la colonne, nombre pour la ligne.'),
        ],
        sources=[ref('TE-C4-4E-DATA-01', 'Trier et filtrer dans un tableur')]),

    'TE-C4-4E-MVT-01': dict(duree=7, essentiel=
        'Les mécanismes de transmission transmettent un mouvement de rotation : engrenages, poulies-courroie, pignons-chaîne.\n'
        'Le système pignon-crémaillère transforme une rotation en translation.\n'
        'Sur un vélo, la chaîne transmet la rotation du pédalier à la roue arrière.',
        parties=[
            ('Transmettre', [
                {'type': 'tableau', 'titre': 'Des mécanismes', 'colonnes': ['Mécanisme', 'Mouvement', 'Sens de rotation'], 'lignes': [
                    ['engrenage', 'rotation → rotation', 'inversé'], ['poulies-courroie', 'rotation → rotation', 'identique'], ['pignons-chaîne', 'rotation → rotation', 'identique'], ['pignon-crémaillère', 'rotation → translation', 'sans objet']]},
                bq('Deux roues dentées en contact tournent :', ['en sens inverse', 'dans le même sens', 'sans tourner'], 'Les dents poussent dans l’autre sens.'),
            ]),
            ('Le rapport de vitesse', [
                {'type': 'explique', 'texte': 'Un pédalier de 48 dents entraine un pignon de 16 dents : la roue fait 3 tours quand le pédalier en fait 1.'},
                {'type': 'piege', 'erreur': 'On croit qu’un grand plateau fait tourner la roue moins vite.', 'correction': 'Plus le plateau a de dents par rapport au pignon, plus la roue tourne vite à chaque tour de pédale.'},
            ]),
        ],
        a_toi=[
            q('Une porte de garage qui monte grâce à un moteur peut utiliser :', ['un pignon et une crémaillère', 'une seule poulie', 'un ressort seul'], 'La rotation devient translation.'),
            q('Plateau de 40 dents, pignon de 20 dents. Pour 1 tour de pédalier, la roue fait :', ['2 tours', '0,5 tour', '20 tours'], '40 ÷ 20.'),
            q('Avec une courroie, les deux poulies tournent :', ['dans le même sens', 'en sens inverse', 'de façon aléatoire'], 'La courroie les entraine pareil.'),
        ],
        sources=[ref('TE-C4-4E-MVT-01', 'Engrenages, courroies, chaînes')]),

    'TE-C4-4E-LOG-01': dict(duree=6, essentiel=
        'Une condition peut combiner plusieurs tests avec ET, OU, NON.\n'
        'A ET B est vrai si les deux sont vrais. A OU B est vrai si au moins l’un est vrai. NON A inverse A.\n'
        'Si (présence ET nuit) alors allumer la lampe.',
        parties=[
            ('Trois opérateurs', [
                {'type': 'tableau', 'titre': 'Tables de vérité', 'colonnes': ['présence', 'nuit', 'présence ET nuit', 'présence OU nuit'], 'lignes': [
                    ['faux', 'faux', 'faux', 'faux'], ['vrai', 'faux', 'faux', 'vrai'], ['faux', 'vrai', 'faux', 'vrai'], ['vrai', 'vrai', 'vrai', 'vrai']]},
                bq('Il fait jour et quelqu’un passe. « présence ET nuit » est :', ['faux', 'vrai', 'impossible'], 'Nuit est faux.'),
            ]),
            ('Choisir le bon opérateur', [
                {'type': 'explique', 'texte': 'Une alarme sonne si la porte s’ouvre OU si la fenêtre s’ouvre. Une ouverture suffit.'},
                {'type': 'piege', 'erreur': 'On met ET là où une seule condition suffit.', 'correction': 'Avec ET, l’alarme ne sonnerait que si porte et fenêtre s’ouvraient en même temps.'},
            ]),
        ],
        a_toi=[
            q('NON(vrai) vaut :', ['faux', 'vrai', 'vrai et faux'], 'NON inverse la valeur.'),
            q('Vrai OU faux vaut :', ['vrai', 'faux', 'rien'], 'Il suffit qu’un des deux soit vrai.'),
            q('Un arrosage se déclenche si le sol est sec ET s’il ne pleut pas. On écrit :', ['sec ET NON pluie', 'sec OU pluie', 'NON sec ET pluie'], 'Les deux conditions doivent être vraies.'),
        ],
        sources=[ref('TE-C4-4E-LOG-01', 'Variables, ET, OU, NON')]),

    'TE-C4-4E-REP-01': dict(duree=5, essentiel=
        'À l’atelier, on porte les équipements de protection individuelle adaptés : lunettes, blouse, chaussures fermées.\n'
        'Cheveux attachés, pas de bijoux ni d’écharpe près d’une machine qui tourne.\n'
        'On utilise un outil en bon état, et on connait l’emplacement de l’arrêt d’urgence.',
        parties=[
            ('Les règles', [
                {'type': 'tableau', 'titre': 'Machines et protections', 'colonnes': ['Situation', 'Protection'], 'lignes': [
                    ['perceuse', 'lunettes, cheveux attachés, pièce fixée dans un étau'], ['scie', 'lunettes, mains loin de la lame'], ['colle chaude', 'attention aux brulures, support adapté'], ['machine qui tourne', 'pas de gants, pas de manches flottantes']]},
                bq('À la perceuse, on porte :', ['des lunettes de protection', 'des gants en laine', 'une écharpe'], 'Contre les projections de copeaux.'),
            ]),
            ('En cas de problème', [
                {'type': 'methode', 'titre': 'Les bons réflexes', 'etapes': [
                    'Appuie sur l’arrêt d’urgence.', 'Préviens immédiatement l’enseignant.', 'Ne touche pas une machine en panne.']},
                {'type': 'piege', 'erreur': 'On porte des gants sur une perceuse pour se protéger.', 'correction': 'Un gant peut être happé par la pièce qui tourne et entrainer la main.'},
            ]),
        ],
        a_toi=[
            q('Pourquoi attacher ses cheveux près d’une machine qui tourne ?', ['pour éviter qu’ils soient happés', 'pour mieux voir', 'pour le style'], 'Une machine peut les entrainer.'),
            q('L’arrêt d’urgence sert à :', ['couper immédiatement la machine', 'la démarrer', 'la nettoyer'], 'Un gros bouton rouge.'),
            q('Pour percer une pièce, on la tient :', ['dans un étau', 'à la main', 'avec le pied'], 'Elle ne doit pas tourner avec le foret.'),
        ],
        sources=[ref('TE-C4-4E-REP-01', 'Sécurité à l’atelier')]),
}

ecrire(COURS)
