"""Lot de cours : physique-chimie, SVT et technologie 5e. Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-5e-sciences.py
    python3 scripts/cours/pages.py content/cours/PC-C4-5E-*.json content/cours/SV-C4-5E-*.json content/cours/TE-C4-5E-*.json

Cycle 4 : phrases de 25 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
"""
from commun import bq, ecrire, q, source_referentiel as ref

COURS = {
    # ---------------------------------------------------------- Physique-chimie
    'PC-C4-5E-MAT-01': dict(duree=8, essentiel=
        'Un corps pur contient une seule espèce chimique ; un mélange en contient plusieurs.\n'
        'Lors d’un changement d’état, la masse se conserve, mais le volume change : quand l’eau gèle, son volume augmente.\n'
        'Un corps pur change d’état à température constante : l’eau pure fond à 0 °C et bout à 100 °C.',
        parties=[
            ('Les changements d’état', [
                {'type': 'tableau', 'titre': 'Noms des changements d’état', 'colonnes': ['De', 'Vers', 'Nom'], 'lignes': [
                    ['solide', 'liquide', 'fusion'], ['liquide', 'solide', 'solidification'], ['liquide', 'gaz', 'vaporisation'], ['gaz', 'liquide', 'liquéfaction']]},
                bq('La buée sur une vitre froide est due à :', ['une liquéfaction', 'une fusion', 'une solidification'], 'La vapeur d’eau de l’air devient liquide.'),
            ]),
            ('Masse et volume', [
                {'type': 'exemple-resolu', 'enonce': 'On congèle 500 g d’eau liquide. Quelle est la masse de la glace obtenue ?', 'etapes': [
                    'La masse se conserve lors d’un changement d’état.', 'Le volume augmente : la bouteille peut éclater.'],
                 'conclusion': 'La glace pèse 500 g.'},
                {'type': 'piege', 'erreur': 'On croit que la glace est plus lourde que l’eau, car elle prend plus de place.', 'correction': 'Le volume augmente, la masse ne change pas. C’est pourquoi la glace flotte.'},
            ]),
        ],
        a_toi=[
            q('L’eau minérale est :', ['un mélange', 'un corps pur', 'un gaz'], 'Elle contient de l’eau et des sels minéraux.'),
            q('Le passage de l’état solide à l’état liquide s’appelle :', ['la fusion', 'la vaporisation', 'la liquéfaction'], 'Comme un glaçon qui fond.'),
            q('Pendant l’ébullition de l’eau pure, la température :', ['reste constante', 'augmente sans cesse', 'diminue'], 'Elle reste à 100 °C tant que l’eau bout.'),
        ],
        sources=[ref('PC-C4-5E-MAT-01', 'États de la matière, mélanges')]),

    'PC-C4-5E-TRANS-01': dict(duree=7, essentiel=
        'Lors d’une transformation chimique, des réactifs disparaissent et de nouveaux produits apparaissent.\n'
        'Une combustion a besoin d’un combustible, du dioxygène de l’air et d’une source de chaleur pour démarrer.\n'
        'Le carbone brule dans le dioxygène : il se forme du dioxyde de carbone, qui trouble l’eau de chaux.',
        parties=[
            ('Réactifs et produits', [
                {'type': 'tableau', 'titre': 'Deux combustions', 'colonnes': ['Combustion', 'Réactifs', 'Produits'], 'lignes': [
                    ['du carbone', 'carbone, dioxygène', 'dioxyde de carbone'], ['du méthane, gaz de cuisine', 'méthane, dioxygène', 'dioxyde de carbone, eau']]},
                bq('Lors d’une combustion, le dioxygène est :', ['un réactif', 'un produit', 'absent'], 'Il est consommé.'),
            ]),
            ('Le triangle du feu', [
                {'type': 'explique', 'texte': 'Pour éteindre un feu, on supprime un des trois éléments : le combustible, le dioxygène ou la chaleur.'},
                {'type': 'piege', 'erreur': 'On croit que le bois disparait sans rien produire en brulant.', 'correction': 'Il se transforme : il se forme du dioxyde de carbone, de l’eau et des cendres.'},
            ]),
        ],
        a_toi=[
            q('Quel gaz trouble l’eau de chaux ?', ['le dioxyde de carbone', 'le dioxygène', 'le diazote'], 'C’est son test caractéristique.'),
            q('Couvrir une casserole en feu avec un couvercle supprime :', ['le dioxygène', 'le combustible', 'la chaleur'], 'L’air ne peut plus arriver.'),
            q('Dans une transformation chimique, les produits :', ['apparaissent', 'disparaissent', 'restent identiques aux réactifs'], 'De nouvelles espèces se forment.'),
        ],
        sources=[ref('PC-C4-5E-TRANS-01', 'Les transformations chimiques')]),

    'PC-C4-5E-NRJ-01': dict(duree=7, essentiel=
        'L’énergie existe sous plusieurs formes : cinétique, liée au mouvement ; électrique ; thermique ; lumineuse ; chimique, stockée dans les aliments ou les carburants.\n'
        'Un convertisseur transforme une forme en une autre. Une partie est toujours perdue, souvent en chaleur.\n'
        'L’énergie se mesure en joules (J).',
        parties=[
            ('Des conversions', [
                {'type': 'tableau', 'titre': 'Convertisseurs', 'colonnes': ['Convertisseur', 'Énergie reçue', 'Énergie utile'], 'lignes': [
                    ['éolienne', 'cinétique du vent', 'électrique'], ['panneau photovoltaïque', 'lumineuse', 'électrique'], ['moteur électrique', 'électrique', 'cinétique'], ['radiateur', 'électrique', 'thermique']]},
                bq('Dans une éolienne, l’énergie du vent est :', ['cinétique', 'chimique', 'lumineuse'], 'Elle est liée au mouvement de l’air.'),
            ]),
            ('Sources d’énergie', [
                {'type': 'tableau', 'titre': 'Renouvelables ou non', 'colonnes': ['Renouvelables', 'Non renouvelables'], 'lignes': [
                    ['solaire, éolien, hydraulique', 'pétrole, gaz naturel, charbon'], ['biomasse, géothermie', 'uranium']]},
                {'type': 'piege', 'erreur': 'On dit qu’un appareil « produit » de l’énergie à partir de rien.', 'correction': 'Il la convertit : l’énergie reçue est égale à l’énergie utile plus les pertes.'},
            ]),
        ],
        a_toi=[
            q('Un moteur électrique convertit l’énergie électrique en énergie :', ['cinétique', 'chimique', 'nucléaire'], 'Il met un objet en mouvement.'),
            q('L’unité de l’énergie est :', ['le joule', 'le watt', 'le volt'], 'Symbole J.'),
            q('Une ampoule chauffe en éclairant. Cette chaleur est :', ['une perte', 'l’énergie utile', 'impossible'], 'L’énergie utile est la lumière.'),
        ],
        sources=[ref('PC-C4-5E-NRJ-01', 'Sources et conversions d’énergie')]),

    'PC-C4-5E-ELEC-01': dict(duree=8, essentiel=
        'Dans un circuit en série, les dipôles forment une seule boucle : si une lampe est dévissée, tout s’éteint.\n'
        'Dans un circuit en dérivation, il y a plusieurs boucles : chaque branche fonctionne indépendamment.\n'
        'L’intensité du courant se mesure en ampères (A) ; la tension, en volts (V).',
        parties=[
            ('Série ou dérivation ?', [
                {'type': 'tableau', 'titre': 'Comparer', 'colonnes': ['Critère', 'Série', 'Dérivation'], 'lignes': [
                    ['nombre de boucles', 'une seule', 'plusieurs'], ['une lampe dévissée', 'tout s’éteint', 'les autres branches restent allumées'], ['exemple', 'guirlande ancienne', 'prises d’une maison']]},
                bq('Les lampes d’une maison sont branchées :', ['en dérivation', 'en série', 'au hasard'], 'On peut éteindre une pièce sans éteindre les autres.'),
            ]),
            ('Mesurer', [
                {'type': 'tableau', 'titre': 'Deux grandeurs', 'colonnes': ['Grandeur', 'Unité', 'Appareil', 'Branchement'], 'lignes': [
                    ['intensité', 'ampère (A)', 'ampèremètre', 'en série'], ['tension', 'volt (V)', 'voltmètre', 'en dérivation, aux bornes du dipôle']]},
                {'type': 'piege', 'erreur': 'On croit que la première lampe d’une série « use » le courant et brille plus.', 'correction': 'En série, l’intensité est la même en tout point du circuit.'},
            ]),
        ],
        a_toi=[
            q('Un voltmètre se branche :', ['en dérivation', 'en série', 'sans fil'], 'Aux bornes du dipôle.'),
            q('Dans un circuit en série, on dévisse une lampe. Les autres :', ['s’éteignent', 'brillent plus', 'ne changent pas'], 'La boucle est ouverte.'),
            q('L’intensité s’exprime en :', ['ampères', 'volts', 'joules'], 'Symbole A.'),
        ],
        sources=[ref('PC-C4-5E-ELEC-01', 'Circuits électriques')]),

    'PC-C4-5E-MVT-01': dict(duree=7, essentiel=
        'La trajectoire d’un objet peut être rectiligne, circulaire ou curviligne.\n'
        'Sa vitesse moyenne est v = d ÷ t : un cycliste qui parcourt 30 km en 2 h roule en moyenne à 15 km/h.\n'
        'Le mouvement est uniforme si la vitesse est constante, accéléré si elle augmente, ralenti si elle diminue.',
        parties=[
            ('Calculer une vitesse', [
                {'type': 'exemple-resolu', 'enonce': 'Un train parcourt 450 km en 1,5 h. Quelle est sa vitesse moyenne ?', 'etapes': [
                    'v = d ÷ t.', 'v = 450 ÷ 1,5 = 300.'],
                 'conclusion': 'Le train roule en moyenne à 300 km/h.'},
                bq('Une coureuse parcourt 100 m en 20 s. Sa vitesse moyenne :', ['5 m/s', '2 000 m/s', '0,2 m/s'], '100 ÷ 20 = 5.'),
            ]),
            ('Décrire le mouvement', [
                {'type': 'tableau', 'titre': 'Trajectoire et vitesse', 'colonnes': ['Objet', 'Trajectoire', 'Vitesse'], 'lignes': [
                    ['voiture qui démarre en ligne droite', 'rectiligne', 'accélérée'], ['nacelle d’une grande roue', 'circulaire', 'uniforme'], ['balle lancée', 'curviligne', 'variable']]},
                {'type': 'piege', 'erreur': 'On utilise des unités qui ne vont pas ensemble : 30 km en 30 min donne 1 km/h.', 'correction': '30 min = 0,5 h. v = 30 ÷ 0,5 = 60 km/h.'},
            ]),
        ],
        a_toi=[
            q('Une voiture roule 120 km en 2 h. Vitesse moyenne :', ['60 km/h', '240 km/h', '122 km/h'], '120 ÷ 2 = 60.'),
            q('Un objet dont la vitesse diminue a un mouvement :', ['ralenti', 'accéléré', 'uniforme'], 'Comme une voiture qui freine.'),
            q('La trajectoire d’une bille qui tombe verticalement est :', ['rectiligne', 'circulaire', 'curviligne'], 'Elle suit une ligne droite.'),
        ],
        sources=[ref('PC-C4-5E-MVT-01', 'Mouvement et vitesse')]),

    'PC-C4-5E-LUM-01': dict(duree=6, essentiel=
        'Une source primaire produit sa propre lumière : le Soleil, une flamme, une lampe allumée.\n'
        'Un objet diffusant renvoie la lumière qu’il reçoit : la Lune, un livre, un mur.\n'
        'La lumière se propage en ligne droite : derrière un objet opaque se forme une ombre.',
        parties=[
            ('Produire ou renvoyer', [
                {'type': 'tableau', 'titre': 'Classer', 'colonnes': ['Sources primaires', 'Objets diffusants'], 'lignes': [
                    ['Soleil, étoiles', 'Lune, planètes'], ['flamme d’une bougie', 'feuille de papier'], ['écran allumé', 'écran éteint']]},
                bq('La Lune est :', ['un objet diffusant', 'une source primaire', 'une étoile'], 'Elle renvoie la lumière du Soleil.'),
            ]),
            ('Propagation et ombres', [
                {'type': 'explique', 'texte': 'Dans le vide, la lumière se déplace à environ 300 000 km/s. On représente son trajet par un rayon : une droite fléchée.'},
                {'type': 'piege', 'erreur': 'On croit qu’on voit un objet parce que l’œil envoie de la lumière.', 'correction': 'On voit un objet parce qu’il envoie, ou renvoie, de la lumière qui entre dans l’œil.'},
            ]),
        ],
        a_toi=[
            q('Pour voir un livre dans le noir complet, il faut :', ['l’éclairer', 'le regarder fixement', 'fermer les yeux'], 'Un objet diffusant doit recevoir de la lumière.'),
            q('Le trajet de la lumière se représente par :', ['une droite fléchée', 'un cercle', 'une ligne courbe'], 'La lumière se propage en ligne droite.'),
            q('Une bougie allumée est :', ['une source primaire', 'un objet diffusant', 'un objet opaque seulement'], 'Elle produit sa lumière.'),
        ],
        sources=[ref('PC-C4-5E-LUM-01', 'Sources de lumière')]),

    'PC-C4-5E-SOL-01': dict(duree=7, essentiel=
        'Un solide soluble se dissout dans un liquide, le solvant : on obtient une solution. Le sucre est soluble dans l’eau.\n'
        'Quand on ne peut plus dissoudre de soluté, la solution est saturée.\n'
        'Deux liquides miscibles se mélangent ; l’huile et l’eau sont non miscibles. Lors d’une dissolution, la masse se conserve.',
        parties=[
            ('Dissolution', [
                {'type': 'tableau', 'titre': 'Vocabulaire', 'colonnes': ['Mot', 'Exemple dans l’eau sucrée'], 'lignes': [
                    ['soluté', 'le sucre'], ['solvant', 'l’eau'], ['solution', 'l’eau sucrée'], ['saturée', 'du sucre reste au fond malgré l’agitation']]},
                bq('On dissout 5 g de sel dans 100 g d’eau. La masse de la solution :', ['105 g', '100 g', '95 g'], 'La masse se conserve.'),
            ]),
            ('Miscibilité', [
                {'type': 'observe', 'consigne': 'Mélanger deux liquides.', 'exemples': ['eau et sirop : miscibles, un seul liquide', 'eau et huile : non miscibles, deux couches', 'l’huile, moins dense, reste au-dessus']},
                {'type': 'piege', 'erreur': 'On dit que le sucre « fond » dans le thé.', 'correction': 'Il se dissout. La fusion est le passage du solide au liquide sous l’effet de la chaleur.'},
            ]),
        ],
        a_toi=[
            q('Dans l’eau salée, le sel est :', ['le soluté', 'le solvant', 'la solution'], 'C’est lui qu’on dissout.'),
            q('L’eau et l’huile sont :', ['non miscibles', 'miscibles', 'solubles'], 'Elles forment deux couches.'),
            q('Une solution saturée :', ['ne peut plus dissoudre de soluté', 'ne contient pas de soluté', 'est forcément chaude'], 'Le surplus reste au fond.'),
        ],
        sources=[ref('PC-C4-5E-SOL-01', 'Solubilité et miscibilité')]),

    'PC-C4-5E-TEST-01': dict(duree=6, essentiel=
        'Un test caractéristique permet d’identifier une espèce chimique.\n'
        'Le sulfate de cuivre anhydre blanc devient bleu au contact de l’eau. L’eau de chaux se trouble avec le dioxyde de carbone.\n'
        'Une bûchette incandescente se rallume dans le dioxygène. Le dihydrogène produit une petite détonation près d’une flamme.',
        parties=[
            ('Quatre tests', [
                {'type': 'tableau', 'titre': 'Tests caractéristiques', 'colonnes': ['Espèce', 'Réactif ou test', 'Résultat'], 'lignes': [
                    ['eau', 'sulfate de cuivre anhydre', 'blanc → bleu'], ['dioxyde de carbone', 'eau de chaux', 'trouble blanc'], ['dioxygène', 'bûchette incandescente', 'elle se rallume'], ['dihydrogène', 'flamme', 'petite détonation']]},
                bq('Une bûchette incandescente se rallume dans un tube. Le tube contient :', ['du dioxygène', 'du dioxyde de carbone', 'de l’eau'], 'Le dioxygène ravive la combustion.'),
            ]),
            ('Utiliser un test', [
                {'type': 'exemple-resolu', 'enonce': 'Un liquide incolore est-il de l’eau ?', 'etapes': [
                    'On dépose une goutte sur du sulfate de cuivre anhydre.', 'Il devient bleu.'],
                 'conclusion': 'Le liquide contient de l’eau.'},
                {'type': 'piege', 'erreur': 'On conclut qu’un liquide est de l’eau pure parce que le test est positif.', 'correction': 'Le test montre seulement la présence d’eau : le liquide peut être un mélange.'},
            ]),
        ],
        a_toi=[
            q('Le sulfate de cuivre anhydre bleuit. Cela prouve la présence :', ['d’eau', 'de dioxygène', 'de sel'], 'C’est le test de l’eau.'),
            q('On souffle dans de l’eau de chaux : elle se trouble. L’air expiré contient :', ['du dioxyde de carbone', 'du dihydrogène', 'du sucre'], 'Produit par la respiration.'),
            q('Le dihydrogène est mis en évidence par :', ['une petite détonation près d’une flamme', 'l’eau de chaux', 'le sulfate de cuivre'], 'Un « aboiement » caractéristique.'),
        ],
        sources=[ref('PC-C4-5E-TEST-01', 'Tests caractéristiques')]),

    'PC-C4-5E-AIR-01': dict(duree=5, essentiel=
        'L’air est un mélange de gaz : environ 78 % de diazote et 21 % de dioxygène.\n'
        'Le reste, environ 1 %, est formé d’autres gaz, dont l’argon et le dioxyde de carbone.\n'
        'L’air a une masse : 1 L d’air pèse environ 1,2 g.',
        parties=[
            ('La composition', [
                {'type': 'tableau', 'titre': 'Dans 100 L d’air', 'colonnes': ['Gaz', 'Volume'], 'lignes': [
                    ['diazote', 'environ 78 L'], ['dioxygène', 'environ 21 L'], ['autres gaz', 'environ 1 L']]},
                bq('Le gaz le plus abondant dans l’air est :', ['le diazote', 'le dioxygène', 'le dioxyde de carbone'], 'Environ 78 %.'),
            ]),
            ('L’air a une masse', [
                {'type': 'explique', 'texte': 'Un ballon gonflé à la pompe pèse un peu plus lourd qu’avant : on y a ajouté de l’air, qui a une masse.'},
                {'type': 'piege', 'erreur': 'On croit que l’air est formé surtout de dioxygène.', 'correction': 'Le dioxygène ne représente qu’environ un cinquième de l’air.'},
            ]),
        ],
        a_toi=[
            q('Dans l’air, le dioxygène représente environ :', ['21 %', '78 %', '50 %'], 'Environ un cinquième.'),
            q('L’air est :', ['un mélange', 'un corps pur', 'un liquide'], 'Il contient plusieurs gaz.'),
            q('2 L d’air pèsent environ :', ['2,4 g', '24 g', '0 g'], '1 L pèse environ 1,2 g.'),
        ],
        sources=[ref('PC-C4-5E-AIR-01', 'La composition de l’air')]),

    'PC-C4-5E-PHYS-01': dict(duree=6, essentiel=
        'Lors d’une transformation physique, l’espèce chimique reste la même : la glace qui fond reste de l’eau.\n'
        'Lors d’un mélange, les espèces sont réunies sans changer.\n'
        'Lors d’une transformation chimique, de nouvelles espèces apparaissent : le bois qui brule donne du dioxyde de carbone.',
        parties=[
            ('Classer', [
                {'type': 'tableau', 'titre': 'Trois situations', 'colonnes': ['Situation', 'Type', 'Pourquoi'], 'lignes': [
                    ['un glaçon fond', 'transformation physique', 'toujours de l’eau'], ['du sel dans l’eau', 'mélange', 'eau et sel, toujours présents'], ['une bougie brule', 'transformation chimique', 'dioxyde de carbone et eau apparaissent']]},
                bq('Du fer qui rouille subit :', ['une transformation chimique', 'une transformation physique', 'un mélange'], 'La rouille est une nouvelle espèce.'),
            ]),
            ('Des indices', [
                {'type': 'observe', 'consigne': 'Signes d’une transformation chimique.', 'exemples': ['un gaz se dégage', 'une couleur change', 'de la chaleur ou de la lumière est produite', 'un test caractéristique devient positif']},
                {'type': 'piege', 'erreur': 'On croit qu’une dissolution est une transformation chimique, car le sucre disparait.', 'correction': 'Le sucre est toujours là : on le goute. C’est un mélange.'},
            ]),
        ],
        a_toi=[
            q('L’eau qui bout subit :', ['une transformation physique', 'une transformation chimique', 'un mélange'], 'La vapeur reste de l’eau.'),
            q('Un gâteau qui cuit subit :', ['une transformation chimique', 'une transformation physique', 'un mélange'], 'De nouvelles espèces se forment.'),
            q('Mélanger du sable et des cailloux, c’est :', ['un mélange', 'une transformation chimique', 'une fusion'], 'Rien ne change de nature.'),
        ],
        sources=[ref('PC-C4-5E-PHYS-01', 'Transformation physique ou chimique')]),

    # ---------------------------------------------------------------------- SVT
    'SV-C4-5E-CORPS-01': dict(duree=7, essentiel=
        'Pendant un effort, les muscles consomment plus de dioxygène et de nutriments.\n'
        'Le cœur bat plus vite et la respiration s’accélère : le sang apporte davantage de dioxygène aux muscles.\n'
        'Le système nerveux commande les muscles : le cerveau envoie des messages par la moelle épinière et les nerfs.',
        parties=[
            ('Ce qui change pendant l’effort', [
                {'type': 'tableau', 'titre': 'Au repos et pendant une course', 'colonnes': ['Mesure', 'Au repos', 'Pendant la course'], 'lignes': [
                    ['fréquence cardiaque', 'environ 70 battements par minute', 'jusqu’à 180 ou plus'], ['fréquence respiratoire', 'environ 15 mouvements par minute', 'plus de 30'], ['besoin des muscles en dioxygène', 'faible', 'élevé']]},
                bq('Pourquoi le cœur bat-il plus vite pendant un effort ?', ['pour apporter plus de dioxygène aux muscles', 'pour refroidir le corps', 'pour digérer'], 'Le sang transporte le dioxygène.'),
            ]),
            ('Un effort bien mené', [
                {'type': 'observe', 'consigne': 'Des règles de santé.', 'exemples': ['s’échauffer avant l’effort', 'boire de l’eau', 'récupérer après l’effort', 'le dopage est dangereux et interdit']},
                {'type': 'piege', 'erreur': 'On croit que les poumons envoient directement l’air aux muscles.', 'correction': 'Le dioxygène passe des poumons dans le sang, et le sang le transporte jusqu’aux muscles.'},
            ]),
        ],
        a_toi=[
            q('Le message qui commande un muscle part :', ['du cerveau', 'de l’estomac', 'du cœur'], 'Il passe par la moelle épinière et les nerfs.'),
            q('Pendant un effort, la fréquence respiratoire :', ['augmente', 'diminue', 'ne change pas'], 'On respire plus vite.'),
            q('Après l’effort, le cœur :', ['revient peu à peu à son rythme de repos', 'reste rapide pour toujours', 's’arrête'], 'C’est la récupération.'),
        ],
        sources=[ref('SV-C4-5E-CORPS-01', 'Effort physique et organisme')]),

    'SV-C4-5E-NUT-01': dict(duree=7, essentiel=
        'Tous les êtres vivants ont besoin de matière et d’énergie. Ils respirent : ils prélèvent du dioxygène et rejettent du dioxyde de carbone.\n'
        'Les animaux prélèvent leur nourriture dans leur milieu.\n'
        'Les plantes vertes produisent leur matière à partir de lumière, d’eau, de sels minéraux et de dioxyde de carbone.',
        parties=[
            ('Animaux et végétaux', [
                {'type': 'tableau', 'titre': 'Les besoins nutritifs', 'colonnes': ['Besoin', 'Animaux', 'Plantes vertes'], 'lignes': [
                    ['matière', 'nourriture prélevée', 'produite à partir de matière minérale'], ['énergie', 'tirée des aliments', 'lumière du Soleil'], ['respiration', 'oui', 'oui, jour et nuit']]},
                bq('Une plante verte produit sa matière grâce :', ['à la lumière', 'à la nourriture qu’elle mange', 'au sucre du sol'], 'Elle utilise aussi eau, sels minéraux et CO₂.'),
            ]),
            ('Producteurs et consommateurs', [
                {'type': 'explique', 'texte': 'Les plantes vertes sont des producteurs : toute la matière des chaines alimentaires vient d’elles. Les animaux sont des consommateurs.'},
                {'type': 'piege', 'erreur': 'On croit que les plantes ne respirent pas.', 'correction': 'Elles respirent jour et nuit, comme les animaux. Le jour, elles produisent aussi de la matière.'},
            ]),
        ],
        a_toi=[
            q('Tous les êtres vivants rejettent en respirant :', ['du dioxyde de carbone', 'du dioxygène seulement', 'de l’azote'], 'Ils prélèvent du dioxygène.'),
            q('Les plantes vertes sont des :', ['producteurs', 'consommateurs', 'décomposeurs'], 'Elles fabriquent leur matière.'),
            q('Une plante verte prélève dans le sol :', ['de l’eau et des sels minéraux', 'du sucre', 'du dioxygène seulement'], 'Par ses racines.'),
        ],
        sources=[ref('SV-C4-5E-NUT-01', 'La nutrition des organismes')]),

    'SV-C4-5E-REPRO-01': dict(duree=7, essentiel=
        'La reproduction sexuée fait intervenir deux gamètes, un mâle et un femelle, qui fusionnent lors de la fécondation.\n'
        'La reproduction asexuée se fait à partir d’un seul individu, sans fécondation : bouture, stolon, tubercule.\n'
        'Le fraisier se reproduit par ses graines, et aussi par ses stolons.',
        parties=[
            ('Sexuée ou asexuée ?', [
                {'type': 'tableau', 'titre': 'Deux modes', 'colonnes': ['Critère', 'Sexuée', 'Asexuée'], 'lignes': [
                    ['nombre de parents', 'deux', 'un seul'], ['fécondation', 'oui', 'non'], ['descendants', 'différents des parents', 'identiques au parent'], ['exemples', 'graines, œufs', 'stolons, boutures, tubercules']]},
                bq('Une pomme de terre qui germe et donne une nouvelle plante :', ['reproduction asexuée', 'reproduction sexuée', 'fécondation'], 'Un tubercule, un seul parent.'),
            ]),
            ('La rencontre des gamètes', [
                {'type': 'observe', 'consigne': 'Des modalités de rencontre.', 'exemples': ['fécondation externe, dans l’eau : la truite, la grenouille', 'fécondation interne : les mammifères, les oiseaux', 'chez les plantes, le pollen est transporté par le vent ou les insectes']},
                {'type': 'piege', 'erreur': 'On croit que les plantes n’ont pas de reproduction sexuée.', 'correction': 'La fleur produit des gamètes : après la pollinisation et la fécondation, elle donne des graines.'},
            ]),
        ],
        a_toi=[
            q('Lors de la fécondation, fusionnent :', ['un gamète mâle et un gamète femelle', 'deux plantes', 'deux œufs'], 'Elle forme une cellule-œuf.'),
            q('Une bouture donne une plante :', ['identique à la plante de départ', 'différente', 'sans feuilles'], 'Reproduction asexuée.'),
            q('Chez la truite, la fécondation est :', ['externe', 'interne', 'absente'], 'Elle a lieu dans l’eau.'),
        ],
        sources=[ref('SV-C4-5E-REPRO-01', 'Modes de reproduction')]),

    'SV-C4-5E-CLIM-01': dict(duree=6, essentiel=
        'La météo décrit le temps qu’il fait à un moment donné. Le climat décrit le temps moyen d’une région sur au moins 30 ans.\n'
        'On distingue des zones chaudes, tempérées et froides.\n'
        'Chaque zone climatique abrite des êtres vivants adaptés : forêt équatoriale, savane, désert, forêt tempérée, toundra.',
        parties=[
            ('Zones climatiques et milieux', [
                {'type': 'tableau', 'titre': 'Des climats et leurs milieux', 'colonnes': ['Climat', 'Caractères', 'Milieu'], 'lignes': [
                    ['équatorial', 'chaud et humide toute l’année', 'forêt dense'], ['désertique', 'très sec', 'désert, plantes rares'], ['tempéré', 'saisons marquées, températures modérées', 'forêt de feuillus, prairies'], ['polaire', 'très froid', 'toundra, banquise']]},
                bq('« Il pleut à Brest aujourd’hui. » C’est :', ['la météo', 'le climat', 'une zone climatique'], 'Le temps d’un jour.'),
            ]),
            ('Des êtres vivants adaptés', [
                {'type': 'explique', 'texte': 'Le cactus stocke l’eau dans sa tige et ses épines limitent les pertes. L’ours polaire a une épaisse couche de graisse.'},
                {'type': 'piege', 'erreur': 'On croit que le climat change d’une année à l’autre.', 'correction': 'Une année peut être plus chaude : c’est une variation. Le climat se calcule sur au moins 30 ans.'},
            ]),
        ],
        a_toi=[
            q('Le climat se calcule sur :', ['au moins 30 ans', 'un jour', 'une semaine'], 'C’est une moyenne.'),
            q('La forêt dense pousse sous un climat :', ['équatorial', 'polaire', 'désertique'], 'Chaud et humide.'),
            q('Les épines du cactus :', ['limitent les pertes d’eau', 'attirent la pluie', 'produisent des graines'], 'Une adaptation au climat sec.'),
        ],
        sources=[ref('SV-C4-5E-CLIM-01', 'Météo et climat')]),

    'SV-C4-5E-CLASS-01': dict(duree=6, essentiel=
        'On classe les êtres vivants selon les caractères qu’ils possèdent en commun, pas selon leur mode de vie.\n'
        'Les groupes s’emboitent : les mammifères, qui ont poils et mamelles, sont inclus dans les vertébrés, qui ont un squelette interne.\n'
        'La chauve-souris a des poils et des mamelles : elle est rangée avec les mammifères, pas avec les oiseaux.',
        parties=[
            ('Des groupes emboités', [
                {'type': 'tableau', 'titre': 'Caractères partagés', 'colonnes': ['Groupe', 'Caractère', 'Exemples'], 'lignes': [
                    ['vertébrés', 'squelette interne', 'truite, grenouille, poule, chat'], ['tétrapodes', 'quatre membres', 'grenouille, poule, chat'], ['oiseaux', 'plumes', 'poule, pigeon'], ['mammifères', 'poils, mamelles', 'chat, chauve-souris, baleine']]},
                bq('La baleine est rangée avec :', ['les mammifères', 'les poissons', 'les oiseaux'], 'Elle a des poils et allaite ses petits.'),
            ]),
            ('Classer sans se tromper', [
                {'type': 'piege', 'erreur': 'On range la chauve-souris avec les oiseaux, car elle vole.', 'correction': 'Voler est un mode de vie. On classe selon les caractères : poils et mamelles, donc mammifère.'},
            ]),
        ],
        a_toi=[
            q('Un squelette interne caractérise :', ['les vertébrés', 'les insectes', 'les plantes'], 'Os et colonne vertébrale.'),
            q('La poule et le chat partagent :', ['quatre membres et un squelette interne', 'des plumes', 'des poils'], 'Ce sont des tétrapodes.'),
            q('On classe les êtres vivants selon :', ['les caractères qu’ils possèdent', 'leur lieu de vie', 'leur taille'], 'Les attributs partagés.'),
        ],
        sources=[ref('SV-C4-5E-CLASS-01', 'Classer les êtres vivants')]),

    'SV-C4-5E-ECO-01': dict(duree=7, essentiel=
        'Un écosystème réunit un milieu et les êtres vivants qui y vivent, reliés par des relations alimentaires.\n'
        'Dans une mare, l’algue est mangée par le têtard, lui-même mangé par la libellule.\n'
        'Les activités humaines modifient les écosystèmes : pollution, destruction des milieux, espèces introduites.',
        parties=[
            ('Les relations alimentaires', [
                {'type': 'tableau', 'titre': 'Les rôles dans un écosystème', 'colonnes': ['Rôle', 'Exemples dans une mare'], 'lignes': [
                    ['producteurs', 'algues, plantes aquatiques'], ['consommateurs', 'têtard, libellule, poisson, héron'], ['décomposeurs', 'bactéries, champignons, vers']]},
                bq('Dans « algue → têtard → libellule », la flèche signifie :', ['est mangé par', 'mange', 'vit avec'], 'Elle suit le trajet de la matière.'),
            ]),
            ('L’effet des activités humaines', [
                {'type': 'explique', 'texte': 'Des engrais emportés par la pluie font proliférer les algues. En se décomposant, elles privent l’eau de dioxygène : les poissons meurent.'},
                {'type': 'piege', 'erreur': 'On croit qu’une espèce introduite enrichit toujours l’écosystème.', 'correction': 'Certaines deviennent envahissantes et menacent les espèces locales.'},
            ]),
        ],
        a_toi=[
            q('Les décomposeurs :', ['transforment la matière morte en matière minérale', 'produisent de la lumière', 'mangent les prédateurs'], 'Ils recyclent la matière.'),
            q('Si les algues d’une mare disparaissent, les têtards :', ['manquent de nourriture', 'ne sont pas touchés', 'se multiplient'], 'Tout le réseau est relié.'),
            q('Un exemple d’activité humaine qui modifie un écosystème :', ['la pollution d’une rivière', 'le cycle des saisons', 'la pluie'], 'Elle change le milieu.'),
        ],
        sources=[ref('SV-C4-5E-ECO-01', 'Les écosystèmes')]),

    'SV-C4-5E-TERRE-01': dict(duree=7, essentiel=
        'La Terre est la troisième planète du système solaire. Elle s’est formée il y a environ 4,6 milliards d’années.\n'
        'Les géologues découpent son histoire en grandes périodes, grâce aux roches et aux fossiles.\n'
        'Les dinosaures disparaissent il y a 66 millions d’années ; notre espèce apparait il y a environ 300 000 ans.',
        parties=[
            ('Le temps des géologues', [
                {'type': 'tableau', 'titre': 'Quelques repères', 'colonnes': ['Il y a environ', 'Évènement'], 'lignes': [
                    ['4,6 milliards d’années', 'formation de la Terre'], ['3,5 milliards d’années', 'premières traces de vie'], ['66 millions d’années', 'disparition des dinosaures'], ['300 000 ans', 'apparition d’Homo sapiens']]},
                bq('La Terre s’est formée il y a environ :', ['4,6 milliards d’années', '6 000 ans', '66 millions d’années'], 'Les roches les plus anciennes permettent de le dater.'),
            ]),
            ('Les fossiles', [
                {'type': 'explique', 'texte': 'Un fossile est un reste ou une trace d’être vivant conservé dans une roche. Il renseigne sur les espèces et les milieux du passé.'},
                {'type': 'piege', 'erreur': 'On croit que les humains ont vécu à l’époque des dinosaures.', 'correction': 'Plus de 60 millions d’années séparent la fin des dinosaures et l’apparition des humains.'},
            ]),
        ],
        a_toi=[
            q('Les dinosaures ont disparu il y a environ :', ['66 millions d’années', '66 000 ans', '4,6 milliards d’années'], 'Bien avant l’apparition des humains.'),
            q('Un fossile est :', ['une trace d’être vivant conservée dans une roche', 'une roche volcanique', 'un minéral précieux'], 'Il témoigne du passé.'),
            q('La Terre est la … planète à partir du Soleil.', ['troisième', 'première', 'cinquième'], 'Après Mercure et Vénus.'),
        ],
        sources=[ref('SV-C4-5E-TERRE-01', 'La Terre et les temps géologiques')]),

    'SV-C4-5E-PLANT-01': dict(duree=7, essentiel=
        'Les racines prélèvent l’eau et les sels minéraux, qui montent dans la sève brute.\n'
        'Les feuilles prélèvent le dioxyde de carbone de l’air et produisent des sucres à la lumière.\n'
        'La sève élaborée transporte ces sucres vers les organes de stockage, comme la pomme de terre.',
        parties=[
            ('Prélever, produire, stocker', [
                {'type': 'tableau', 'titre': 'Les organes de la plante', 'colonnes': ['Organe', 'Rôle'], 'lignes': [
                    ['racines', 'prélèvent eau et sels minéraux'], ['feuilles', 'prélèvent le CO₂ et produisent les sucres à la lumière'], ['tiges', 'transportent les sèves'], ['tubercule, graine, fruit', 'stockent des réserves']]},
                bq('Où la plante produit-elle ses sucres ?', ['dans les feuilles', 'dans les racines', 'dans le tubercule'], 'Les feuilles vertes captent la lumière.'),
            ]),
            ('Deux sèves', [
                {'type': 'tableau', 'titre': 'Sève brute et sève élaborée', 'colonnes': ['Sève', 'Contenu', 'Trajet'], 'lignes': [
                    ['brute', 'eau et sels minéraux', 'des racines vers les feuilles'], ['élaborée', 'eau et sucres', 'des feuilles vers tous les organes']]},
                {'type': 'piege', 'erreur': 'On croit que la plante puise sa nourriture toute faite dans le sol.', 'correction': 'Elle prélève de la matière minérale et fabrique elle-même sa matière organique.'},
            ]),
        ],
        a_toi=[
            q('La sève brute contient :', ['de l’eau et des sels minéraux', 'des sucres', 'du dioxygène seulement'], 'Elle part des racines.'),
            q('La pomme de terre est :', ['un organe de stockage', 'une racine qui absorbe l’eau', 'une feuille'], 'Un tubercule riche en réserves.'),
            q('Les feuilles prélèvent dans l’air :', ['du dioxyde de carbone', 'du diazote', 'des sels minéraux'], 'Pour produire les sucres.'),
        ],
        sources=[ref('SV-C4-5E-PLANT-01', 'Nutrition de la plante verte')]),

    # ------------------------------------------------------------- Technologie
    'TE-C4-5E-EVO-01': dict(duree=6, essentiel=
        'Pour une même fonction, plusieurs principes techniques se succèdent.\n'
        'Pour éclairer, on est passé de la bougie à la lampe à incandescence, puis à la lampe fluocompacte et à la DEL.\n'
        'Les objets évoluent avec les besoins, les matériaux, les énergies disponibles et les progrès techniques.',
        parties=[
            ('L’évolution de l’éclairage', [
                {'type': 'tableau', 'titre': 'Une même fonction : éclairer', 'colonnes': ['Solution', 'Principe', 'Limite'], 'lignes': [
                    ['bougie', 'combustion de la cire', 'faible lumière, risque d’incendie'], ['lampe à incandescence', 'filament chauffé par le courant', 'beaucoup de chaleur perdue'], ['DEL', 'composant électronique qui émet de la lumière', 'consomme peu, dure longtemps']]},
                bq('Quelle lampe consomme le moins d’énergie pour la même lumière ?', ['la DEL', 'la lampe à incandescence', 'la bougie'], 'Elle perd peu d’énergie en chaleur.'),
            ]),
            ('Pourquoi les objets évoluent', [
                {'type': 'observe', 'consigne': 'Des raisons.', 'exemples': ['un nouveau besoin : éclairer sans flamme', 'un nouveau matériau ou composant', 'des contraintes : consommer moins, polluer moins']},
                {'type': 'piege', 'erreur': 'On croit qu’un objet nouveau est toujours meilleur sur tous les plans.', 'correction': 'On compare selon des critères : cout, consommation, durée de vie, recyclage.'},
            ]),
        ],
        a_toi=[
            q('La lampe à incandescence perd beaucoup d’énergie sous forme de :', ['chaleur', 'son', 'mouvement'], 'Le filament chauffe.'),
            q('DEL signifie :', ['diode électroluminescente', 'détecteur électrique local', 'dynamo électrique légère'], 'Un composant électronique.'),
            q('Pour comparer deux solutions techniques, on utilise :', ['des critères', 'la couleur seulement', 'le hasard'], 'Cout, consommation, durée de vie…'),
        ],
        sources=[ref('TE-C4-5E-EVO-01', 'L’évolution des objets')]),

    'TE-C4-5E-NUM-01': dict(duree=7, essentiel=
        'Les données sont enregistrées dans des fichiers, rangés dans des dossiers. L’extension indique le type : .jpg pour une image, .mp3 pour un son.\n'
        'L’unité d’information est le bit ; un octet vaut 8 bits. On compte en kilooctets, mégaoctets, gigaoctets.\n'
        'Pour se protéger : mots de passe robustes, mises à jour, méfiance envers les messages suspects.',
        parties=[
            ('Fichiers et unités', [
                {'type': 'tableau', 'titre': 'Unités d’information', 'colonnes': ['Unité', 'Valeur approchée', 'Exemple'], 'lignes': [
                    ['octet (o)', '8 bits', 'un caractère'], ['kilooctet (ko)', 'environ mille octets', 'un court texte'], ['mégaoctet (Mo)', 'environ un million d’octets', 'une photo'], ['gigaoctet (Go)', 'environ un milliard d’octets', 'un film']]},
                bq('« vacances.jpg » est probablement :', ['une image', 'un son', 'un texte'], 'L’extension .jpg désigne une image.'),
            ]),
            ('Cybersécurité', [
                {'type': 'methode', 'titre': 'Les bons réflexes', 'etapes': [
                    'Choisis un mot de passe long, différent pour chaque compte.', 'Installe les mises à jour.', 'N’ouvre pas les pièces jointes ni les liens d’un message inattendu.', 'Sauvegarde tes fichiers importants.']},
                {'type': 'piege', 'erreur': 'On utilise le même mot de passe partout.', 'correction': 'Si un site est piraté, tous les comptes deviennent accessibles : un mot de passe par compte.'},
            ]),
        ],
        a_toi=[
            q('Un octet vaut :', ['8 bits', '10 bits', '1 000 bits'], 'C’est l’unité de base du stockage.'),
            q('Un message qui demande ton mot de passe « en urgence » est souvent :', ['une tentative d’hameçonnage', 'un message fiable', 'une mise à jour'], 'On ne donne jamais son mot de passe.'),
            q('Un film pèse plutôt :', ['plusieurs gigaoctets', 'quelques octets', 'quelques kilooctets'], 'Une vidéo contient beaucoup de données.'),
        ],
        sources=[ref('TE-C4-5E-NUM-01', 'Données et cybersécurité')]),

    'TE-C4-5E-DD-01': dict(duree=6, essentiel=
        'Le cycle de vie d’un objet compte cinq étapes : extraction des matières premières, fabrication, transport, utilisation, fin de vie.\n'
        'Pour choisir un objet durable, on regarde sa consommation, sa durée de vie, sa réparabilité et son recyclage.\n'
        'Une note de réparabilité indique s’il sera facile à réparer.',
        parties=[
            ('Des critères de choix', [
                {'type': 'tableau', 'titre': 'Comparer deux smartphones', 'colonnes': ['Critère', 'Modèle A', 'Modèle B'], 'lignes': [
                    ['réparabilité', 'batterie remplaçable', 'batterie collée'], ['durée des mises à jour', 'longue', 'courte'], ['matériaux recyclés', 'oui', 'non']]},
                bq('Quel modèle est le plus durable ?', ['le modèle A', 'le modèle B', 'aucune différence'], 'Il se répare et reste à jour plus longtemps.'),
            ]),
            ('À chaque étape', [
                {'type': 'observe', 'consigne': 'Limiter l’impact.', 'exemples': ['extraction : utiliser des matériaux recyclés', 'utilisation : choisir un appareil économe', 'fin de vie : réparer, donner, puis recycler']},
                {'type': 'piege', 'erreur': 'On croit que l’utilisation est toujours l’étape qui pollue le plus.', 'correction': 'Pour un smartphone, la fabrication pèse souvent le plus : le garder longtemps compte beaucoup.'},
            ]),
        ],
        a_toi=[
            q('La première étape du cycle de vie est :', ['l’extraction des matières premières', 'le recyclage', 'l’utilisation'], 'Il faut d’abord des matériaux.'),
            q('Un objet facile à réparer :', ['dure plus longtemps', 'pollue davantage', 'coute toujours plus cher à l’usage'], 'On évite d’en racheter un.'),
            q('En fin de vie, l’ordre à privilégier :', ['réparer, réutiliser, recycler', 'jeter, acheter, oublier', 'recycler d’abord'], 'Le recyclage vient en dernier.'),
        ],
        sources=[ref('TE-C4-5E-DD-01', 'Choisir un objet durable')]),

    'TE-C4-5E-ENER-01': dict(duree=6, essentiel=
        'La chaine d’énergie d’un objet comporte quatre fonctions : alimenter, distribuer, convertir, transmettre.\n'
        'Dans une trottinette électrique : la batterie alimente, le variateur distribue, le moteur convertit, la roue transmet.\n'
        'L’énergie entre sous une forme et sort sous une autre : électrique en entrée, mécanique en sortie.',
        parties=[
            ('Quatre fonctions', [
                {'type': 'tableau', 'titre': 'La trottinette électrique', 'colonnes': ['Fonction', 'Composant', 'Énergie'], 'lignes': [
                    ['alimenter', 'batterie', 'électrique'], ['distribuer', 'variateur', 'électrique'], ['convertir', 'moteur', 'électrique → mécanique'], ['transmettre', 'roue', 'mécanique']]},
                bq('Dans la chaine d’énergie, le moteur sert à :', ['convertir', 'alimenter', 'distribuer'], 'Il transforme l’énergie électrique en énergie mécanique.'),
            ]),
            ('Un autre exemple', [
                {'type': 'explique', 'texte': 'Dans un sèche-cheveux, la prise alimente, l’interrupteur distribue, la résistance convertit en chaleur et le ventilateur souffle l’air chaud.'},
                {'type': 'piege', 'erreur': 'On place l’interrupteur dans la chaine d’information.', 'correction': 'Il laisse passer ou coupe l’énergie : il distribue, dans la chaine d’énergie.'},
            ]),
        ],
        a_toi=[
            q('La batterie d’un vélo électrique sert à :', ['alimenter', 'convertir', 'transmettre'], 'Elle stocke et fournit l’énergie.'),
            q('Le variateur sert à :', ['distribuer l’énergie selon la demande', 'stocker l’énergie', 'faire tourner la roue'], 'Il dose l’énergie envoyée au moteur.'),
            q('En sortie d’un moteur, l’énergie est :', ['mécanique', 'chimique', 'lumineuse'], 'Elle met en mouvement.'),
        ],
        sources=[ref('TE-C4-5E-ENER-01', 'La chaine d’énergie')]),

    'TE-C4-5E-PROG-01': dict(duree=6, essentiel=
        'Un programme associe une action à une condition, souvent avec un paramètre : un seuil, une durée, une vitesse.\n'
        'Modifier ce paramètre change le comportement de l’objet sans changer le programme.\n'
        'Si l’on augmente le seuil de luminosité, la lampe s’allume plus tôt le soir.',
        parties=[
            ('Lire le programme', [
                {'type': 'methode', 'titre': 'Éclairage automatique', 'etapes': [
                    'Répéter indéfiniment :', 'si la luminosité mesurée est inférieure à 300, allumer la lampe ;', 'sinon, éteindre la lampe.']},
                bq('On remplace 300 par 400. Le soir, la lampe s’allume :', ['plus tôt', 'plus tard', 'jamais'], 'La luminosité passe sous 400 avant de passer sous 300.'),
            ]),
            ('Tester les modifications', [
                {'type': 'methode', 'titre': 'Pour modifier un paramètre', 'etapes': [
                    'Repère le paramètre dans le programme.', 'Change une seule valeur à la fois.', 'Teste et observe le résultat.', 'Garde la valeur qui répond au besoin.']},
                {'type': 'piege', 'erreur': 'On change plusieurs paramètres à la fois.', 'correction': 'On ne saurait plus lequel a produit l’effet observé.'},
            ]),
        ],
        a_toi=[
            q('Un seuil dans un programme est :', ['une valeur qui déclenche une action', 'un capteur', 'un fil électrique'], 'Au-dessus ou en dessous, l’action change.'),
            q('Pour que le ventilateur tourne plus longtemps, on modifie :', ['la durée dans le programme', 'la couleur du boitier', 'le capteur de lumière'], 'C’est un paramètre.'),
            q('Quand on teste une modification, on change :', ['une seule valeur à la fois', 'tout le programme', 'tous les paramètres ensemble'], 'Pour identifier l’effet.'),
        ],
        sources=[ref('TE-C4-5E-PROG-01', 'Modifier un programme')]),

    'TE-C4-5E-ENV-01': dict(duree=6, essentiel=
        'Les interacteurs d’un objet sont les éléments extérieurs avec lesquels il est en relation : utilisateur, sol, météo, énergie.\n'
        'L’ergonomie adapte l’objet à l’utilisateur : poignée à la bonne hauteur, commandes faciles d’accès.\n'
        'La sécurité protège l’utilisateur et les autres : freins, éclairage, protections.',
        parties=[
            ('Les interacteurs', [
                {'type': 'tableau', 'titre': 'La trottinette électrique', 'colonnes': ['Interacteur', 'Contrainte pour la conception'], 'lignes': [
                    ['utilisateur', 'guidon réglable, commandes simples'], ['route', 'roues adaptées aux bosses'], ['pluie', 'composants étanches'], ['chargeur', 'prise compatible, charge sûre']]},
                bq('Un guidon réglable en hauteur répond à une exigence :', ['d’ergonomie', 'de recyclage', 'd’esthétique seulement'], 'Il s’adapte à la taille de l’utilisateur.'),
            ]),
            ('Ergonomie et sécurité', [
                {'type': 'observe', 'consigne': 'Des choix de conception.', 'exemples': ['frein à portée de main', 'feu avant et arrière', 'bords arrondis', 'béquille stable']},
                {'type': 'piege', 'erreur': 'On ne pense qu’à l’utilisateur.', 'correction': 'On liste tous les interacteurs : sol, météo, piétons, énergie. Chacun impose des contraintes.'},
            ]),
        ],
        a_toi=[
            q('La pluie est, pour une trottinette :', ['un interacteur', 'un composant', 'une fonction'], 'Un élément extérieur qui impose l’étanchéité.'),
            q('Un feu arrière répond à une exigence de :', ['sécurité', 'ergonomie', 'recyclage'], 'Être vu des autres usagers.'),
            q('L’ergonomie cherche à :', ['adapter l’objet à l’utilisateur', 'réduire le prix', 'changer la couleur'], 'Confort et facilité d’usage.'),
        ],
        sources=[ref('TE-C4-5E-ENV-01', 'Interacteurs, ergonomie, sécurité')]),

    'TE-C4-5E-DATA-01': dict(duree=5, essentiel=
        'Un objet peut être décrit par des descripteurs : marque, masse, électrique ou non.\n'
        'Chaque descripteur a un type de donnée : chaine de caractères pour un texte, nombre, ou booléen pour vrai ou faux.\n'
        'Vélo : marque (texte), masse en kg (nombre), électrique (booléen).',
        parties=[
            ('Trois types de données', [
                {'type': 'tableau', 'titre': 'Décrire un vélo', 'colonnes': ['Descripteur', 'Valeur', 'Type'], 'lignes': [
                    ['marque', 'Rapido', 'chaine de caractères'], ['masse (kg)', '14,5', 'nombre'], ['nombre de vitesses', '7', 'nombre'], ['électrique', 'faux', 'booléen']]},
                bq('« Possède un antivol : vrai » est une donnée de type :', ['booléen', 'nombre', 'chaine de caractères'], 'Elle ne peut valoir que vrai ou faux.'),
            ]),
            ('Choisir le bon type', [
                {'type': 'piege', 'erreur': 'On enregistre une masse comme texte : « quatorze kilos ».', 'correction': 'Un nombre permet de comparer et de calculer : 14,5.'},
            ]),
        ],
        a_toi=[
            q('La couleur d’un vélo est une donnée de type :', ['chaine de caractères', 'booléen', 'nombre'], 'C’est un texte : rouge, bleu…'),
            q('Un booléen peut valoir :', ['vrai ou faux', 'n’importe quel nombre', 'un mot'], 'Deux valeurs seulement.'),
            q('Le prix d’un objet est une donnée de type :', ['nombre', 'booléen', 'chaine de caractères'], 'On peut le comparer et calculer.'),
        ],
        sources=[ref('TE-C4-5E-DATA-01', 'Décrire un objet par des données')]),

    'TE-C4-5E-RES-01': dict(duree=6, essentiel=
        'Un réseau local relie des terminaux : ordinateurs, imprimantes, tablettes.\n'
        'Ils sont reliés à un commutateur par des câbles, ou à un point d’accès par Wi-Fi.\n'
        'Chaque terminal a une adresse qui l’identifie, comme une adresse postale.',
        parties=[
            ('Les composants', [
                {'type': 'tableau', 'titre': 'Le réseau de la salle de technologie', 'colonnes': ['Composant', 'Rôle'], 'lignes': [
                    ['terminaux', 'envoient et reçoivent des données'], ['commutateur', 'relie les terminaux et dirige les données'], ['câbles réseau', 'liaison filaire'], ['point d’accès Wi-Fi', 'liaison sans fil'], ['box ou routeur', 'relie le réseau local à Internet']]},
                bq('Le commutateur sert à :', ['relier les terminaux entre eux', 'imprimer', 'stocker l’électricité'], 'Il dirige les données vers le bon terminal.'),
            ]),
            ('Identifier chaque terminal', [
                {'type': 'explique', 'texte': 'Pour qu’un document parte vers la bonne imprimante, chaque appareil a une adresse IP unique sur le réseau.'},
                {'type': 'piege', 'erreur': 'On croit que le Wi-Fi est Internet.', 'correction': 'Le Wi-Fi relie les appareils au réseau local. C’est la box qui donne accès à Internet.'},
            ]),
        ],
        a_toi=[
            q('Une imprimante en réseau est :', ['un terminal', 'un commutateur', 'un câble'], 'Elle reçoit des données.'),
            q('Une liaison Wi-Fi est :', ['sans fil', 'filaire', 'impossible au collège'], 'Elle passe par les ondes.'),
            q('Pourquoi chaque terminal a-t-il une adresse ?', ['pour recevoir les données qui lui sont destinées', 'pour décorer', 'pour consommer moins'], 'Comme une adresse postale.'),
        ],
        sources=[ref('TE-C4-5E-RES-01', 'Le réseau local')]),

    'TE-C4-5E-INFO-01': dict(duree=6, essentiel=
        'La chaine d’information d’un objet acquiert, traite et communique des informations.\n'
        'Un capteur acquiert ; un microcontrôleur traite grâce à un programme ; une interface humain-machine communique.\n'
        'Thermostat : capteur de température, microcontrôleur, écran et boutons.',
        parties=[
            ('Trois fonctions', [
                {'type': 'tableau', 'titre': 'Le thermostat', 'colonnes': ['Fonction', 'Composant'], 'lignes': [
                    ['acquérir', 'capteur de température'], ['traiter', 'microcontrôleur et son programme'], ['communiquer', 'écran, voyant'], ['recevoir une consigne', 'boutons']]},
                bq('Dans un thermostat, le microcontrôleur sert à :', ['traiter l’information', 'mesurer la température', 'afficher l’heure seulement'], 'Il compare la mesure à la consigne.'),
            ]),
            ('L’interface humain-machine', [
                {'type': 'explique', 'texte': 'L’IHM permet à l’utilisateur de donner des ordres à l’objet et d’en recevoir des informations : boutons, écran tactile, voyants, sons.'},
                {'type': 'piege', 'erreur': 'On confond capteur et actionneur.', 'correction': 'Le capteur prend une information. L’actionneur agit : moteur, lampe, résistance chauffante.'},
            ]),
        ],
        a_toi=[
            q('Un détecteur de mouvement est :', ['un capteur', 'un microcontrôleur', 'un actionneur'], 'Il acquiert une information.'),
            q('Un écran tactile fait partie de :', ['l’interface humain-machine', 'la chaine d’énergie', 'la batterie'], 'Il permet de dialoguer avec l’objet.'),
            q('La fonction « traiter » est assurée par :', ['le microcontrôleur', 'le capteur', 'le boitier'], 'Il exécute le programme.'),
        ],
        sources=[ref('TE-C4-5E-INFO-01', 'Capteurs, microcontrôleur, IHM')]),

    'TE-C4-5E-MAT-01': dict(duree=6, essentiel=
        'Les matériaux se regroupent en familles : métaux, plastiques, bois, verre, composites.\n'
        'On les choisit selon leurs propriétés : résistance, masse, conduction de la chaleur et de l’électricité, prix, recyclage.\n'
        'Une casserole en inox conduit la chaleur ; son manche en plastique isole.',
        parties=[
            ('Familles et propriétés', [
                {'type': 'tableau', 'titre': 'Des familles de matériaux', 'colonnes': ['Famille', 'Exemples', 'Propriétés'], 'lignes': [
                    ['métaux', 'acier, aluminium, cuivre', 'résistants, conducteurs'], ['plastiques', 'PVC, polypropylène', 'légers, isolants, faciles à mouler'],
                    ['bois', 'chêne, pin', 'renouvelable, isolant'], ['verre', 'verre de vitre', 'transparent, fragile'], ['composites', 'fibre de carbone', 'très légers et résistants']]},
                bq('Pourquoi le manche d’une casserole est-il en plastique ?', ['parce qu’il isole de la chaleur', 'parce qu’il conduit l’électricité', 'parce qu’il est transparent'], 'On peut la saisir sans se bruler.'),
            ]),
            ('Choisir un matériau', [
                {'type': 'piege', 'erreur': 'On choisit un matériau sur un seul critère.', 'correction': 'On compare plusieurs propriétés : un cadre de vélo en carbone est léger, mais cher et difficile à recycler.'},
            ]),
        ],
        a_toi=[
            q('Les fils électriques sont en cuivre car il est :', ['conducteur', 'isolant', 'transparent'], 'Il laisse passer le courant.'),
            q('Un matériau composite associe :', ['plusieurs matériaux', 'un seul métal', 'du verre seulement'], 'Comme la fibre de carbone et une résine.'),
            q('Le bois est un matériau :', ['renouvelable', 'fossile', 'métallique'], 'Les arbres repoussent.'),
        ],
        sources=[ref('TE-C4-5E-MAT-01', 'Les familles de matériaux')]),
}

ecrire(COURS)
