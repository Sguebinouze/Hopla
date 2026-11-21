"""Lot de cours : physique-chimie, SVT et technologie 3e. Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-3e-sciences.py
    python3 scripts/cours/pages.py content/cours/PC-C4-3E-*.json content/cours/SV-C4-3E-*.json content/cours/TE-C4-3E-*.json

Cycle 4 : phrases de 25 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
Valeurs physiques arrondies ; prix de l'électricité donné comme hypothèse de calcul.
"""
from commun import bq, ecrire, q, source_referentiel as ref

COURS = {
    # ---------------------------------------------------------- Physique-chimie
    'PC-C4-3E-ATOM-01': dict(duree=7, essentiel=
        'Un atome est formé d’un noyau, chargé positivement, et d’électrons, chargés négativement, qui se déplacent autour.\n'
        'L’atome est environ 100 000 fois plus grand que son noyau : il est surtout constitué de vide. Il est électriquement neutre.\n'
        'Un ion est un atome qui a perdu ou gagné un ou plusieurs électrons : Na⁺, Cl⁻.',
        parties=[
            ('Ordres de grandeur', [
                {'type': 'tableau', 'titre': 'Tailles', 'colonnes': ['Objet', 'Taille environ'], 'lignes': [
                    ['atome', '10⁻¹⁰ m'], ['noyau', '10⁻¹⁵ m'], ['rapport atome sur noyau', '10⁵, soit 100 000']]},
                bq('Pourquoi dit-on que l’atome est surtout constitué de vide ?', ['le noyau est 100 000 fois plus petit que l’atome', 'il ne contient rien', 'les électrons sont immobiles'], 'Presque toute la masse est dans un minuscule noyau.'),
            ]),
            ('Les ions', [
                {'type': 'tableau', 'titre': 'Gagner ou perdre des électrons', 'colonnes': ['Ion', 'Formation', 'Charge'], 'lignes': [
                    ['Na⁺', 'l’atome de sodium perd 1 électron', 'positive'], ['Cl⁻', 'l’atome de chlore gagne 1 électron', 'négative'], ['Cu²⁺', 'l’atome de cuivre perd 2 électrons', 'positive']]},
                {'type': 'piege', 'erreur': 'On croit qu’un ion positif a gagné des charges positives.', 'correction': 'Il a perdu des électrons, négatifs : il lui reste plus de charges positives que de négatives.'},
            ]),
        ],
        a_toi=[
            q('Un atome est électriquement :', ['neutre', 'positif', 'négatif'], 'Il a autant de charges positives que négatives.'),
            q('L’ion Fe²⁺ provient d’un atome de fer qui a :', ['perdu 2 électrons', 'gagné 2 électrons', 'perdu 2 noyaux'], 'Charge 2+.'),
            q('Les électrons sont chargés :', ['négativement', 'positivement', 'ils ne sont pas chargés'], 'Le noyau est positif.'),
        ],
        sources=[ref('PC-C4-3E-ATOM-01', 'Structure de l’atome')]),

    'PC-C4-3E-GRAV-01': dict(duree=7, essentiel=
        'La masse, en kilogrammes, mesure la quantité de matière : elle ne change pas d’un lieu à l’autre.\n'
        'Le poids, en newtons, est la force d’attraction exercée par l’astre : P = m × g. Sur Terre, g ≈ 9,8 N/kg ; sur la Lune, 1,6 N/kg.\n'
        'La gravitation est une attraction entre deux corps ayant une masse : elle augmente avec les masses et diminue avec la distance.',
        parties=[
            ('Masse ou poids ?', [
                {'type': 'tableau', 'titre': 'Un astronaute de 80 kg', 'colonnes': ['Lieu', 'Masse', 'Poids'], 'lignes': [
                    ['Terre', '80 kg', '80 × 9,8 ≈ 784 N'], ['Lune', '80 kg', '80 × 1,6 = 128 N']]},
                bq('Sur la Lune, la masse d’un astronaute :', ['reste la même', 'est six fois plus faible', 'est nulle'], 'C’est son poids qui diminue.'),
            ]),
            ('La gravitation', [
                {'type': 'explique', 'texte': 'La Terre attire la Lune et la maintient sur son orbite. La Lune attire aussi la Terre : c’est l’origine des marées.'},
                {'type': 'piege', 'erreur': 'On dit « je pèse 50 kg ».', 'correction': 'C’est la masse qui vaut 50 kg. Le poids, en newtons, vaut environ 490 N sur Terre.'},
            ]),
        ],
        a_toi=[
            q('Le poids se mesure avec :', ['un dynamomètre', 'une balance', 'un thermomètre'], 'En newtons.'),
            q('Un objet de 2 kg a sur Terre un poids d’environ :', ['19,6 N', '2 N', '0,2 N'], '2 × 9,8.'),
            q('La force de gravitation entre deux corps diminue quand :', ['la distance augmente', 'les masses augmentent', 'il fait nuit'], 'Plus loin, moins d’attraction.'),
        ],
        sources=[ref('PC-C4-3E-GRAV-01', 'Poids et gravitation')]),

    'PC-C4-3E-NRJ-01': dict(duree=7, essentiel=
        'Un objet en mouvement possède une énergie cinétique : Ec = ½ × m × v², avec m en kg, v en m/s et Ec en joules.\n'
        'L’énergie cinétique est proportionnelle au carré de la vitesse : à 100 km/h, une voiture a quatre fois plus d’énergie qu’à 50 km/h.\n'
        'En cas de choc, cette énergie se transforme en déformations : c’est pourquoi la vitesse est si dangereuse.',
        parties=[
            ('Calculer', [
                {'type': 'exemple-resolu', 'enonce': 'Une voiture de 1 000 kg roule à 20 m/s, soit 72 km/h. Quelle est son énergie cinétique ?', 'etapes': [
                    'Ec = ½ × 1 000 × 20².', 'Ec = 500 × 400 = 200 000.'],
                 'conclusion': 'Ec = 200 000 J, soit 200 kJ.'},
                bq('Si la vitesse double, l’énergie cinétique est multipliée par :', ['4', '2', '8'], 'Elle dépend de v².'),
            ]),
            ('Sécurité routière', [
                {'type': 'tableau', 'titre': 'Distance d’arrêt', 'colonnes': ['Étape', 'Ce qui se passe'], 'lignes': [
                    ['distance de réaction', 'le conducteur voit le danger et réagit ; la voiture continue à la même vitesse'], ['distance de freinage', 'la voiture freine ; elle augmente comme le carré de la vitesse']]},
                {'type': 'piege', 'erreur': 'On oublie de convertir la vitesse : Ec = ½ × 1 000 × 72².', 'correction': 'La vitesse doit être en m/s : 72 km/h = 20 m/s.'},
            ]),
        ],
        a_toi=[
            q('Une balle de 0,5 kg lancée à 10 m/s a une énergie cinétique de :', ['25 J', '50 J', '2,5 J'], '½ × 0,5 × 100.'),
            q('La distance d’arrêt est la somme :', ['des distances de réaction et de freinage', 'de la vitesse et du temps', 'de deux freinages'], 'Réaction puis freinage.'),
            q('Un objet immobile a une énergie cinétique :', ['nulle', 'maximale', 'négative'], 'v = 0.'),
        ],
        sources=[ref('PC-C4-3E-NRJ-01', 'L’énergie cinétique')]),

    'PC-C4-3E-PUIS-01': dict(duree=7, essentiel=
        'La puissance électrique d’un appareil vaut P = U × I : en watts, avec U en volts et I en ampères.\n'
        'L’énergie consommée vaut E = P × t : une lampe de 10 W allumée 5 h consomme 50 Wh.\n'
        'La facture d’électricité compte l’énergie en kilowattheures (kWh).',
        parties=[
            ('Puissance et énergie', [
                {'type': 'tableau', 'titre': 'Des appareils', 'colonnes': ['Appareil', 'Puissance', 'Durée', 'Énergie'], 'lignes': [
                    ['lampe à DEL', '10 W', '5 h', '50 Wh'], ['radiateur', '2 000 W', '3 h', '6 kWh'], ['four', '2 500 W', '0,5 h', '1,25 kWh']]},
                bq('Un appareil fonctionne sous 230 V avec un courant de 2 A. Sa puissance :', ['460 W', '232 W', '115 W'], 'P = 230 × 2.'),
            ]),
            ('Calculer un cout', [
                {'type': 'exemple-resolu', 'enonce': 'Le radiateur consomme 6 kWh. Si le kWh coute 0,20 €, combien coute son utilisation ?', 'etapes': [
                    '6 × 0,20 = 1,20.'],
                 'conclusion': 'Elle coute 1,20 €.'},
                {'type': 'piege', 'erreur': 'On confond puissance et énergie : « ce radiateur consomme 2 000 W ».', 'correction': 'La puissance est en watts. L’énergie consommée dépend aussi de la durée : en Wh ou kWh.'},
            ]),
        ],
        a_toi=[
            q('Une bouilloire de 2 000 W chauffe 3 min, soit 0,05 h. Énergie :', ['100 Wh', '6 000 Wh', '40 Wh'], '2 000 × 0,05.'),
            q('La puissance s’exprime en :', ['watts', 'joules', 'volts'], 'Symbole W.'),
            q('1 kWh = ?', ['1 000 Wh', '100 Wh', '3 600 Wh'], 'Kilo signifie mille.'),
        ],
        sources=[ref('PC-C4-3E-PUIS-01', 'Puissance et énergie électrique')]),

    'PC-C4-3E-SIG-01': dict(duree=7, essentiel=
        'Un signal sonore a besoin d’un milieu matériel ; dans l’air, il va à environ 340 m/s. La lumière se propage aussi dans le vide, à environ 300 000 km/s.\n'
        'La distance parcourue par un signal vaut d = v × t.\n'
        'La fréquence d’un son, en hertz, indique s’il est grave ou aigu.',
        parties=[
            ('Calculer une distance', [
                {'type': 'exemple-resolu', 'enonce': 'Pendant un orage, on entend le tonnerre 6 s après avoir vu l’éclair. À quelle distance est l’orage ?', 'etapes': [
                    'La lumière arrive presque instantanément.', 'd = v × t = 340 × 6 = 2 040 m.'],
                 'conclusion': 'L’orage est à environ 2 km.'},
                bq('Un sonar envoie un son dans l’eau, à 1 500 m/s. L’écho revient en 2 s. Profondeur :', ['1 500 m', '3 000 m', '750 m'], 'Le son fait l’aller et le retour : 1 500 × 2 ÷ 2.'),
            ]),
            ('Fréquence', [
                {'type': 'tableau', 'titre': 'Sons et fréquences', 'colonnes': ['Domaine', 'Fréquence'], 'lignes': [
                    ['infrasons', 'moins de 20 Hz'], ['sons audibles par l’humain', '20 Hz à 20 000 Hz'], ['ultrasons', 'plus de 20 000 Hz']]},
                {'type': 'piege', 'erreur': 'Pour un écho, on oublie que le signal fait un aller-retour.', 'correction': 'La distance jusqu’à l’obstacle vaut la moitié de v × t.'},
            ]),
        ],
        a_toi=[
            q('Un son grave a une fréquence :', ['basse', 'élevée', 'nulle'], 'Les aigus ont une fréquence élevée.'),
            q('La lumière met environ combien de temps pour parcourir 300 000 km ?', ['1 s', '1 min', '1 h'], 'Elle va à 300 000 km/s.'),
            q('Le son ne se propage pas dans :', ['le vide', 'l’eau', 'l’acier'], 'Il faut de la matière.'),
        ],
        sources=[ref('PC-C4-3E-SIG-01', 'Signaux sonores et lumineux')]),

    'PC-C4-3E-IONS-01': dict(duree=7, essentiel=
        'Une solution acide contient plus d’ions hydrogène H⁺ que d’ions hydroxyde OH⁻. Une solution basique en contient moins. Une solution neutre en contient autant.\n'
        'Un acide réagit avec certains métaux : dans l’acide chlorhydrique, le fer est attaqué et du dihydrogène se dégage.\n'
        'Il se forme aussi des ions fer Fe²⁺, que la soude révèle par un précipité vert.',
        parties=[
            ('pH et ions', [
                {'type': 'tableau', 'titre': 'Caractère d’une solution', 'colonnes': ['Solution', 'pH', 'Ions majoritaires'], 'lignes': [
                    ['acide', 'inférieur à 7', 'H⁺'], ['neutre', '7', 'autant de H⁺ que de OH⁻'], ['basique', 'supérieur à 7', 'OH⁻']]},
                bq('Une solution riche en ions OH⁻ est :', ['basique', 'acide', 'neutre'], 'Son pH est supérieur à 7.'),
            ]),
            ('Acide et métal', [
                {'type': 'tableau', 'titre': 'Fer et acide chlorhydrique', 'colonnes': ['Observation', 'Test', 'Conclusion'], 'lignes': [
                    ['des bulles se forment', 'petite détonation près d’une flamme', 'dihydrogène'], ['la solution contient de nouveaux ions', 'précipité vert avec la soude', 'ions Fe²⁺']]},
                {'type': 'piege', 'erreur': 'On croit que le fer disparait sans laisser de trace.', 'correction': 'Ses atomes deviennent des ions Fe²⁺ dissous : ils sont toujours là, dans la solution.'},
            ]),
        ],
        a_toi=[
            q('Le gaz dégagé quand un acide attaque le fer est :', ['le dihydrogène', 'le dioxygène', 'le dioxyde de carbone'], 'Il produit une petite détonation.'),
            q('Les ions H⁺ caractérisent une solution :', ['acide', 'basique', 'neutre'], 'pH inférieur à 7.'),
            q('Un précipité vert avec la soude révèle :', ['les ions Fe²⁺', 'les ions Cu²⁺', 'l’eau'], 'Les ions Cu²⁺ donnent un précipité bleu.'),
        ],
        sources=[ref('PC-C4-3E-IONS-01', 'Ions H⁺ et OH⁻')]),

    'PC-C4-3E-UNIV-01': dict(duree=6, essentiel=
        'Le système solaire comprend le Soleil, huit planètes et de nombreux petits corps. Il fait partie d’une galaxie, la Voie lactée, qui compte des centaines de milliards d’étoiles.\n'
        'L’année-lumière est la distance parcourue par la lumière en un an : environ 9 500 milliards de km.\n'
        'La lumière du Soleil met environ 8 minutes pour atteindre la Terre.',
        parties=[
            ('Des distances immenses', [
                {'type': 'tableau', 'titre': 'Ordres de grandeur', 'colonnes': ['Distance', 'Valeur environ'], 'lignes': [
                    ['Terre-Lune', '384 000 km, un peu plus d’une seconde-lumière'], ['Terre-Soleil', '150 millions de km, environ 8 minutes-lumière'], ['étoile la plus proche du Soleil', '4,2 années-lumière'], ['diamètre de la Voie lactée', 'environ 100 000 années-lumière']]},
                bq('L’année-lumière est une unité de :', ['distance', 'durée', 'vitesse'], 'Une distance parcourue en un an.'),
            ]),
            ('Regarder loin, c’est regarder dans le passé', [
                {'type': 'explique', 'texte': 'La lumière d’une étoile située à 100 années-lumière est partie il y a 100 ans. On la voit telle qu’elle était à ce moment-là.'},
                {'type': 'piege', 'erreur': 'On croit que l’année-lumière mesure un temps.', 'correction': 'Malgré son nom, c’est une distance : celle que parcourt la lumière en une année.'},
            ]),
        ],
        a_toi=[
            q('Notre galaxie s’appelle :', ['la Voie lactée', 'Andromède', 'le système solaire'], 'Elle contient le système solaire.'),
            q('Si le Soleil s’éteignait, on s’en apercevrait au bout d’environ :', ['8 minutes', 'une seconde', 'une année'], 'Le temps que met sa lumière.'),
            q('Le système solaire compte :', ['8 planètes', '9 planètes', '12 planètes'], 'De Mercure à Neptune.'),
        ],
        sources=[ref('PC-C4-3E-UNIV-01', 'L’Univers et ses distances')]),

    'PC-C4-3E-GES-01': dict(duree=6, essentiel=
        'Les combustions de l’essence, du gazole, du gaz ou du charbon libèrent du dioxyde de carbone, un gaz à effet de serre.\n'
        'Le méthane, issu notamment de l’élevage, est un autre gaz à effet de serre.\n'
        'La corrosion est la dégradation d’un métal par son environnement : le fer rouille au contact du dioxygène et de l’eau.',
        parties=[
            ('Gaz à effet de serre', [
                {'type': 'tableau', 'titre': 'Origines', 'colonnes': ['Gaz', 'Formule', 'Origine humaine'], 'lignes': [
                    ['dioxyde de carbone', 'CO₂', 'combustions : transports, chauffage, industrie'], ['méthane', 'CH₄', 'élevage, rizières, décharges'], ['protoxyde d’azote', 'N₂O', 'engrais agricoles']]},
                bq('La combustion de l’essence libère surtout :', ['du dioxyde de carbone et de l’eau', 'du dioxygène', 'du diazote'], 'Comme toute combustion complète d’un carburant.'),
            ]),
            ('La corrosion', [
                {'type': 'tableau', 'titre': 'Protéger le fer', 'colonnes': ['Protection', 'Principe'], 'lignes': [
                    ['peinture', 'isole le fer de l’air et de l’eau'], ['galvanisation', 'couche de zinc qui se corrode à la place du fer'], ['acier inoxydable', 'alliage qui ne rouille pas']]},
                {'type': 'piege', 'erreur': 'On croit que la rouille se forme dans l’air sec.', 'correction': 'Il faut à la fois du dioxygène et de l’eau : le fer rouille surtout en milieu humide.'},
            ]),
        ],
        a_toi=[
            q('La rouille se forme sous l’action :', ['du dioxygène et de l’eau', 'du diazote seul', 'du froid'], 'Les deux sont nécessaires.'),
            q('Le méthane provient notamment :', ['de l’élevage', 'des éoliennes', 'des panneaux solaires'], 'La digestion des ruminants en produit.'),
            q('Galvaniser un objet, c’est le recouvrir de :', ['zinc', 'plastique', 'cuivre'], 'Le zinc protège le fer.'),
        ],
        sources=[ref('PC-C4-3E-GES-01', 'Gaz à effet de serre et corrosion')]),

    'PC-C4-3E-BILAN-01': dict(duree=6, essentiel=
        'Un convertisseur reçoit de l’énergie et en restitue une partie sous forme utile. Le reste est perdu, souvent en chaleur.\n'
        'Énergie reçue = énergie utile + énergie perdue.\n'
        'Le rendement vaut énergie utile ÷ énergie reçue. Une lampe qui reçoit 100 J et produit 10 J de lumière a un rendement de 0,1, soit 10 %.',
        parties=[
            ('Établir un bilan', [
                {'type': 'tableau', 'titre': 'Deux convertisseurs', 'colonnes': ['Convertisseur', 'Reçue', 'Utile', 'Perdue', 'Rendement'], 'lignes': [
                    ['lampe à incandescence', '100 J électrique', '10 J lumineuse', '90 J thermique', '10 %'], ['moteur électrique', '100 J électrique', '90 J mécanique', '10 J thermique', '90 %']]},
                bq('Un moteur reçoit 500 J et fournit 400 J utiles. Rendement :', ['80 %', '125 %', '20 %'], '400 ÷ 500 = 0,8.'),
            ]),
            ('Un rendement jamais supérieur à 1', [
                {'type': 'explique', 'texte': 'Aucun appareil ne crée d’énergie : l’énergie utile est toujours inférieure ou égale à l’énergie reçue.'},
                {'type': 'piege', 'erreur': 'On trouve un rendement de 125 %.', 'correction': 'On a inversé le calcul : c’est utile ÷ reçue, jamais l’inverse.'},
            ]),
        ],
        a_toi=[
            q('Une lampe reçoit 50 J et en perd 40 J en chaleur. Énergie lumineuse :', ['10 J', '90 J', '40 J'], '50 − 40.'),
            q('Le rendement d’une lampe à DEL est :', ['meilleur que celui d’une lampe à incandescence', 'moins bon', 'identique'], 'Elle perd moins en chaleur.'),
            q('Un rendement de 0,25 signifie :', ['25 % de l’énergie reçue est utile', '25 J sont perdus', 'l’appareil ne marche pas'], '0,25 = 25 %.'),
        ],
        sources=[ref('PC-C4-3E-BILAN-01', 'Bilan énergétique')]),

    'PC-C4-3E-RAYO-01': dict(duree=6, essentiel=
        'Un corps qui absorbe un rayonnement reçoit de l’énergie et s’échauffe ; un corps sombre absorbe plus qu’un corps clair.\n'
        'La Terre reçoit le rayonnement du Soleil et émet à son tour un rayonnement infrarouge.\n'
        'Les gaz à effet de serre absorbent une partie de ce rayonnement infrarouge : ils retiennent la chaleur près du sol.',
        parties=[
            ('Absorber, émettre', [
                {'type': 'tableau', 'titre': 'Des exemples', 'colonnes': ['Situation', 'Explication'], 'lignes': [
                    ['une voiture noire au soleil chauffe plus qu’une blanche', 'le noir absorbe plus le rayonnement'], ['un radiateur chauffe la pièce à distance', 'il émet un rayonnement infrarouge'], ['la neige fond lentement au soleil', 'elle renvoie beaucoup de rayonnement']]},
                bq('En été, pour avoir moins chaud, on porte plutôt des vêtements :', ['clairs', 'noirs', 'épais et sombres'], 'Ils absorbent moins le rayonnement.'),
            ]),
            ('L’effet de serre', [
                {'type': 'explique', 'texte': 'Sans effet de serre naturel, la température moyenne de la Terre serait d’environ −18 °C au lieu de 15 °C. Les rejets humains le renforcent.'},
                {'type': 'piege', 'erreur': 'On croit que l’effet de serre est entièrement néfaste.', 'correction': 'L’effet naturel rend la Terre habitable. C’est son renforcement par les activités humaines qui réchauffe le climat.'},
            ]),
        ],
        a_toi=[
            q('Les gaz à effet de serre absorbent surtout :', ['le rayonnement infrarouge émis par la Terre', 'la lumière visible du Soleil', 'le son'], 'Ils retiennent la chaleur.'),
            q('Sans effet de serre naturel, la Terre serait :', ['beaucoup plus froide', 'plus chaude', 'identique'], 'Environ −18 °C en moyenne.'),
            q('Un corps sombre au soleil :', ['s’échauffe davantage', 'reste froid', 'émet de la lumière visible'], 'Il absorbe plus.'),
        ],
        sources=[ref('PC-C4-3E-RAYO-01', 'Rayonnement et effet de serre')]),

    'PC-C4-3E-ELEM-01': dict(duree=5, essentiel=
        'La matière est de même nature partout dans l’Univers : on y retrouve les éléments du tableau périodique.\n'
        'L’hydrogène et l’hélium sont de loin les éléments les plus abondants de l’Univers.\n'
        'Les éléments plus lourds, comme le carbone, l’oxygène ou le fer, ont été formés dans les étoiles : le fer de notre sang en vient.',
        parties=[
            ('D’où viennent les éléments ?', [
                {'type': 'tableau', 'titre': 'Origine des éléments', 'colonnes': ['Éléments', 'Origine'], 'lignes': [
                    ['hydrogène, hélium', 'formés peu après le Big Bang'], ['carbone, oxygène, azote', 'formés au cœur des étoiles'], ['fer et éléments plus lourds', 'étoiles massives et explosions d’étoiles']]},
                bq('Les éléments les plus abondants de l’Univers sont :', ['l’hydrogène et l’hélium', 'le fer et l’or', 'l’oxygène et le carbone'], 'Ils forment l’essentiel des étoiles.'),
            ]),
            ('Poussières d’étoiles', [
                {'type': 'explique', 'texte': 'Les atomes de carbone de notre corps ont été fabriqués dans des étoiles disparues, avant la formation du système solaire.'},
                {'type': 'piege', 'erreur': 'On croit que la Terre est faite d’une matière différente de celle des étoiles.', 'correction': 'Les spectres de la lumière des étoiles montrent les mêmes éléments que sur Terre.'},
            ]),
        ],
        a_toi=[
            q('Le fer de notre sang a été formé :', ['dans des étoiles', 'dans notre estomac', 'dans les volcans'], 'Par des réactions au cœur des étoiles.'),
            q('Le Soleil est surtout composé :', ['d’hydrogène et d’hélium', 'de fer', 'd’eau'], 'Comme la plupart des étoiles.'),
            q('Les éléments présents dans l’Univers sont :', ['les mêmes que sur Terre', 'tous inconnus sur Terre', 'différents d’une galaxie à l’autre'], 'La matière est de même nature partout.'),
        ],
        sources=[ref('PC-C4-3E-ELEM-01', 'Les éléments dans l’Univers')]),

    'PC-C4-3E-UNIT-01': dict(duree=5, essentiel=
        'L’unité d’énergie du système international est le joule (J). On utilise aussi le kilowattheure (kWh), surtout pour l’électricité.\n'
        '1 Wh = 3 600 J, car 1 W pendant 3 600 s. Donc 1 kWh = 3 600 000 J.\n'
        'Pour comparer des énergies, on les exprime dans la même unité.',
        parties=[
            ('Convertir', [
                {'type': 'tableau', 'titre': 'Correspondances', 'colonnes': ['Énergie', 'En joules'], 'lignes': [
                    ['1 Wh', '3 600 J'], ['1 kWh', '3 600 000 J, soit 3,6 × 10⁶ J'], ['1 kJ', '1 000 J']]},
                bq('2 kWh = ?', ['7 200 000 J', '7 200 J', '2 000 J'], '2 × 3 600 000.'),
            ]),
            ('Comparer des ordres de grandeur', [
                {'type': 'tableau', 'titre': 'Quelques énergies', 'colonnes': ['Situation', 'Énergie environ'], 'lignes': [
                    ['recharger un smartphone', '15 Wh'], ['une douche chaude de 5 minutes', '1 à 2 kWh'], ['les aliments d’une journée pour un adolescent', '3 kWh, soit environ 10 000 kJ']]},
                {'type': 'piege', 'erreur': 'On convertit 1 kWh en 1 000 J.', 'correction': '1 kWh = 1 000 Wh, et chaque Wh vaut 3 600 J : 3 600 000 J.'},
            ]),
        ],
        a_toi=[
            q('7 200 J = ?', ['2 Wh', '7,2 Wh', '2 kWh'], '7 200 ÷ 3 600.'),
            q('L’unité d’énergie du système international est :', ['le joule', 'le watt', 'le kilowattheure'], 'Symbole J.'),
            q('Un kilowattheure correspond à :', ['1 000 W pendant 1 heure', '1 W pendant 1 000 heures seulement', '1 000 J'], '1 kW × 1 h.'),
        ],
        sources=[ref('PC-C4-3E-UNIT-01', 'Unités d’énergie')]),

    # ---------------------------------------------------------------------- SVT
    'SV-C4-3E-GEN-01': dict(duree=8, essentiel=
        'Le noyau de chaque cellule contient des chromosomes, formés d’ADN. Chez l’être humain, il y en a 46, soit 23 paires.\n'
        'Un gène est une portion d’ADN qui gouverne un caractère héréditaire. Un gène peut exister sous plusieurs versions : les allèles.\n'
        'Chaque enfant reçoit un chromosome de chaque paire de son père et de sa mère : il est unique.',
        parties=[
            ('Du chromosome au gène', [
                {'type': 'tableau', 'titre': 'Les supports de l’hérédité', 'colonnes': ['Élément', 'Définition'], 'lignes': [
                    ['chromosome', 'long filament d’ADN dans le noyau'], ['ADN', 'molécule qui porte l’information génétique'], ['gène', 'portion d’ADN qui gouverne un caractère'], ['allèle', 'version d’un gène, par exemple pour le groupe sanguin']]},
                bq('Combien de chromosomes contient une cellule humaine ?', ['46', '23', '92'], '23 paires.'),
            ]),
            ('L’unicité', [
                {'type': 'explique', 'texte': 'Deux frères ont les mêmes parents, mais chacun a reçu une combinaison différente d’allèles. Seuls les vrais jumeaux ont les mêmes allèles.'},
                {'type': 'piege', 'erreur': 'On croit qu’un gène et un allèle sont la même chose.', 'correction': 'Le gène gouverne un caractère, par exemple le groupe sanguin. Les allèles sont ses versions : A, B ou O.'},
            ]),
        ],
        a_toi=[
            q('Chaque parent transmet à l’enfant :', ['un chromosome de chaque paire', 'tous ses chromosomes', 'un seul chromosome'], '23 chromosomes chacun.'),
            q('L’ADN se trouve dans :', ['le noyau des cellules', 'le sang seulement', 'les os seulement'], 'Dans les chromosomes.'),
            q('Les allèles A, B et O sont des versions du gène :', ['du groupe sanguin', 'de la couleur des yeux', 'de la taille'], 'Un gène, plusieurs allèles.'),
        ],
        sources=[ref('SV-C4-3E-GEN-01', 'Génétique et hérédité')]),

    'SV-C4-3E-EVO-01': dict(duree=8, essentiel=
        'Les êtres vivants partagent des caractères hérités d’ancêtres communs : ils sont apparentés.\n'
        'Les fossiles montrent que des espèces ont disparu et que d’autres sont apparues : les espèces évoluent.\n'
        'Des variations apparaissent au hasard ; la sélection naturelle favorise les individus les mieux adaptés à leur milieu, qui ont plus de descendants.',
        parties=[
            ('Parenté et ancêtre commun', [
                {'type': 'explique', 'texte': 'Le bras humain, l’aile de la chauve-souris et la nageoire de la baleine ont les mêmes os, disposés pareil. Ils viennent d’un ancêtre commun.'},
                bq('Des caractères partagés entre espèces indiquent :', ['un ancêtre commun', 'un hasard sans signification', 'un même lieu de vie'], 'Ils ont été hérités.'),
            ]),
            ('La sélection naturelle', [
                {'type': 'methode', 'titre': 'Des bactéries résistantes', 'etapes': [
                    'Dans une population de bactéries, une variation au hasard rend quelques-unes résistantes à un antibiotique.', 'L’antibiotique tue les autres.',
                    'Les résistantes survivent et se multiplient.', 'La population devient résistante.']},
                {'type': 'piege', 'erreur': 'On croit qu’un individu se transforme pour s’adapter à son milieu.', 'correction': 'Les variations apparaissent au hasard. Le milieu trie ensuite les individus qui survivent et se reproduisent.'},
            ]),
        ],
        a_toi=[
            q('La théorie de la sélection naturelle est proposée par :', ['Charles Darwin', 'Louis Pasteur', 'Marie Curie'], 'En 1859.'),
            q('Les fossiles prouvent que :', ['des espèces ont disparu et d’autres sont apparues', 'les espèces ne changent jamais', 'la Terre a 6 000 ans'], 'Ils témoignent du passé.'),
            q('Les variations génétiques apparaissent :', ['au hasard', 'selon les besoins de l’individu', 'jamais'], 'Le milieu les trie ensuite.'),
        ],
        sources=[ref('SV-C4-3E-EVO-01', 'L’évolution des êtres vivants')]),

    'SV-C4-3E-IMMU-01': dict(duree=8, essentiel=
        'La peau et les muqueuses empêchent la plupart des micro-organismes d’entrer. S’ils pénètrent, une réaction rapide se déclenche : inflammation, phagocytose.\n'
        'Des lymphocytes produisent ensuite des anticorps ou détruisent les cellules infectées. L’organisme garde la mémoire du microbe.\n'
        'Un vaccin prépare l’organisme à reconnaitre un microbe avant même de le rencontrer.',
        parties=[
            ('Les défenses de l’organisme', [
                {'type': 'tableau', 'titre': 'Trois niveaux', 'colonnes': ['Défense', 'Action'], 'lignes': [
                    ['barrières', 'peau, muqueuses, larmes, mucus'], ['réaction rapide', 'inflammation ; les phagocytes avalent les microbes'], ['réaction adaptative', 'les lymphocytes produisent des anticorps spécifiques et gardent la mémoire']]},
                bq('La phagocytose consiste à :', ['avaler et détruire un microbe', 'produire un vaccin', 'désinfecter la peau'], 'Réalisée par des globules blancs.'),
            ]),
            ('Aider l’organisme', [
                {'type': 'tableau', 'titre': 'Vaccins, antiseptiques, antibiotiques', 'colonnes': ['Moyen', 'Rôle'], 'lignes': [
                    ['vaccin', 'crée une mémoire immunitaire, avant l’infection'], ['antiseptique', 'tue les microbes sur la peau ou une plaie'], ['antibiotique', 'tue les bactéries dans l’organisme, pas les virus']]},
                {'type': 'piege', 'erreur': 'On croit qu’un vaccin soigne une maladie déjà déclarée.', 'correction': 'Il prévient : il prépare la mémoire immunitaire avant le contact avec le microbe.'},
            ]),
        ],
        a_toi=[
            q('Les anticorps sont produits par :', ['les lymphocytes', 'les globules rouges', 'la peau'], 'Des globules blancs spécialisés.'),
            q('Pour désinfecter une plaie, on utilise :', ['un antiseptique', 'un antibiotique', 'un vaccin'], 'Il agit sur la peau.'),
            q('La mémoire immunitaire permet :', ['une réaction plus rapide lors d’une seconde infection', 'de ne jamais être malade', 'de produire des microbes'], 'C’est le principe de la vaccination.'),
        ],
        sources=[ref('SV-C4-3E-IMMU-01', 'Immunité et santé')]),

    'SV-C4-3E-DIG-01': dict(duree=7, essentiel=
        'Dans le tube digestif, les aliments sont transformés en nutriments par des enzymes digestives.\n'
        'L’amylase de la salive commence à transformer l’amidon du pain en sucres simples. Les protéines deviennent des acides aminés, les lipides des acides gras.\n'
        'Les nutriments traversent la paroi de l’intestin grêle et passent dans le sang.',
        parties=[
            ('Les enzymes', [
                {'type': 'tableau', 'titre': 'Transformations', 'colonnes': ['Aliment', 'Nutriments obtenus', 'Où ?'], 'lignes': [
                    ['amidon', 'glucose', 'bouche, puis intestin grêle'], ['protéines', 'acides aminés', 'estomac, puis intestin grêle'], ['lipides', 'acides gras et glycérol', 'intestin grêle']]},
                bq('L’amylase salivaire transforme :', ['l’amidon', 'les protéines', 'les graisses'], 'Le pain mâché longtemps devient sucré.'),
            ]),
            ('L’absorption', [
                {'type': 'explique', 'texte': 'La paroi de l’intestin grêle porte des millions de replis, les villosités. Leur grande surface favorise le passage des nutriments dans le sang.'},
                {'type': 'piege', 'erreur': 'On croit que la digestion est seulement mécanique, par la mastication.', 'correction': 'Le broyage aide, mais ce sont les enzymes qui transforment chimiquement les aliments.'},
            ]),
        ],
        a_toi=[
            q('Les protéines sont transformées en :', ['acides aminés', 'glucose', 'acides gras'], 'Ce sont leurs briques.'),
            q('Les nutriments passent dans le sang au niveau :', ['de l’intestin grêle', 'de l’œsophage', 'de la bouche'], 'Grâce aux villosités.'),
            q('Une enzyme digestive :', ['transforme chimiquement un aliment', 'broie les aliments', 'transporte le sang'], 'Chacune agit sur un type d’aliment.'),
        ],
        sources=[ref('SV-C4-3E-DIG-01', 'Digestion et nutriments')]),

    'SV-C4-3E-CLIM-01': dict(duree=7, essentiel=
        'Depuis le début de l’ère industrielle, la température moyenne de la Terre a augmenté de plus de 1 °C.\n'
        'Ce réchauffement est dû principalement aux gaz à effet de serre rejetés par les activités humaines, surtout la combustion des énergies fossiles.\n'
        'Il a des conséquences : recul des glaciers, montée du niveau des mers, déplacement des espèces.',
        parties=[
            ('Des preuves', [
                {'type': 'tableau', 'titre': 'Observations', 'colonnes': ['Observation', 'Lien avec le réchauffement'], 'lignes': [
                    ['les glaciers des Alpes reculent', 'la glace fond plus vite qu’elle ne se reforme'], ['le niveau des mers monte', 'dilatation de l’eau et fonte des glaces'], ['des espèces remontent vers le nord ou en altitude', 'elles suivent les températures qui leur conviennent'], ['les coraux blanchissent', 'l’eau de mer est trop chaude']]},
                bq('La principale cause du réchauffement actuel est :', ['les gaz à effet de serre d’origine humaine', 'l’activité des volcans', 'la distance au Soleil'], 'Selon les rapports du GIEC.'),
            ]),
            ('Agir', [
                {'type': 'observe', 'consigne': 'Deux types de réponses.', 'exemples': ['atténuer : réduire les émissions, énergies renouvelables, sobriété', 'adapter : végétaliser les villes, protéger les côtes, changer les cultures']},
                {'type': 'piege', 'erreur': 'On croit qu’un hiver froid contredit le réchauffement climatique.', 'correction': 'Le climat se mesure en moyenne sur plusieurs décennies : un hiver froid relève de la météo.'},
            ]),
        ],
        a_toi=[
            q('Le GIEC est :', ['un groupe d’experts qui évalue les connaissances sur le climat', 'un parti politique', 'une entreprise pétrolière'], 'Il publie des rapports scientifiques.'),
            q('La montée du niveau des mers s’explique par :', ['la dilatation de l’eau et la fonte des glaces', 'l’augmentation des pluies seulement', 'les marées'], 'L’eau chaude occupe plus de volume.'),
            q('Atténuer le changement climatique, c’est :', ['réduire les émissions de gaz à effet de serre', 'construire des digues', 'planter des cultures nouvelles'], 'Agir sur la cause.'),
        ],
        sources=[ref('SV-C4-3E-CLIM-01', 'Le changement climatique')]),

    'SV-C4-3E-RESS-01': dict(duree=6, essentiel=
        'Une ressource renouvelable se reconstitue à l’échelle humaine : eau, bois, poissons, si on ne les exploite pas trop vite.\n'
        'Une ressource non renouvelable ne se reconstitue pas à notre échelle : pétrole, charbon, gaz, minerais.\n'
        'Une gestion durable prélève une ressource sans dépasser sa capacité à se renouveler.',
        parties=[
            ('Classer', [
                {'type': 'tableau', 'titre': 'Des ressources', 'colonnes': ['Renouvelables', 'Non renouvelables'], 'lignes': [
                    ['eau douce', 'pétrole'], ['bois des forêts', 'charbon, gaz naturel'], ['poissons', 'minerais : fer, cuivre, lithium']]},
                bq('Le pétrole s’est formé en :', ['des millions d’années', 'quelques années', 'quelques siècles'], 'Ce que nous brulons ne se reformera pas à notre échelle.'),
            ]),
            ('Gérer durablement', [
                {'type': 'tableau', 'titre': 'Des choix', 'colonnes': ['Ressource', 'Gestion durable'], 'lignes': [
                    ['poissons', 'quotas de pêche, tailles minimales'], ['forêts', 'replanter autant qu’on coupe'], ['métaux', 'recycler les appareils']]},
                {'type': 'piege', 'erreur': 'On croit qu’une ressource renouvelable est inépuisable.', 'correction': 'Exploitée trop vite, elle s’épuise aussi : la surpêche a fait disparaitre certains stocks de poissons.'},
            ]),
        ],
        a_toi=[
            q('Un quota de pêche limite :', ['la quantité de poissons pêchés', 'le nombre de bateaux construits', 'la taille des ports'], 'Pour laisser les populations se renouveler.'),
            q('Le lithium des batteries est une ressource :', ['non renouvelable', 'renouvelable', 'inépuisable'], 'Un minerai.'),
            q('Recycler un téléphone permet :', ['de récupérer des métaux', 'de produire du pétrole', 'de créer de l’eau'], 'On économise des minerais.'),
        ],
        sources=[ref('SV-C4-3E-RESS-01', 'Les ressources naturelles')]),

    'SV-C4-3E-BIOD-01': dict(duree=7, essentiel=
        'La biodiversité recule rapidement. Les principales menaces sont la destruction des milieux, la surexploitation, la pollution, le changement climatique et les espèces envahissantes.\n'
        'Le frelon asiatique, arrivé par accident en France, chasse les abeilles.\n'
        'Des solutions existent : aires protégées, corridors écologiques, agriculture plus respectueuse, lutte contre les espèces envahissantes.',
        parties=[
            ('Cinq menaces', [
                {'type': 'tableau', 'titre': 'Menaces et exemples', 'colonnes': ['Menace', 'Exemple'], 'lignes': [
                    ['destruction des milieux', 'zones humides asséchées, forêts rasées'], ['surexploitation', 'surpêche'], ['pollution', 'pesticides, plastiques'], ['changement climatique', 'coraux qui blanchissent'], ['espèces envahissantes', 'frelon asiatique']]},
                bq('Le frelon asiatique menace surtout :', ['les abeilles', 'les poissons', 'les arbres'], 'Il les chasse devant les ruches.'),
            ]),
            ('Préserver', [
                {'type': 'explique', 'texte': 'Une haie replantée entre deux bois relie des populations isolées. Les animaux circulent, se nourrissent et se reproduisent mieux.'},
                {'type': 'piege', 'erreur': 'On croit que protéger une seule espèce emblématique suffit.', 'correction': 'Il faut protéger son milieu et tout l’écosystème dont elle dépend.'},
            ]),
        ],
        a_toi=[
            q('Une espèce envahissante est :', ['une espèce introduite qui prolifère et nuit aux espèces locales', 'une espèce très rare', 'une espèce protégée'], 'Comme le frelon asiatique.'),
            q('Un corridor écologique permet :', ['aux espèces de circuler entre deux milieux', 'de chasser plus facilement', 'de construire des routes'], 'Il relie les populations.'),
            q('La surpêche est une forme de :', ['surexploitation', 'pollution', 'reproduction'], 'On prélève plus que la population ne se renouvelle.'),
        ],
        sources=[ref('SV-C4-3E-BIOD-01', 'Biodiversité et êtres humains')]),

    'SV-C4-3E-PHEN-01': dict(duree=6, essentiel=
        'Le phénotype est l’ensemble des caractères observables d’un individu. Le génotype est l’ensemble de ses allèles.\n'
        'Le phénotype dépend du génotype, mais aussi de l’environnement.\n'
        'Des vrais jumeaux ont les mêmes gènes mais peuvent avoir des peaux plus ou moins bronzées selon leur exposition au soleil.',
        parties=[
            ('Gènes et environnement', [
                {'type': 'tableau', 'titre': 'Des exemples', 'colonnes': ['Caractère', 'Rôle des gènes', 'Rôle de l’environnement'], 'lignes': [
                    ['groupe sanguin', 'total', 'aucun'], ['couleur de peau', 'important', 'exposition au soleil'], ['taille adulte', 'important', 'alimentation, santé'], ['couleur des hortensias', 'présent', 'acidité du sol']]},
                bq('Le groupe sanguin dépend :', ['uniquement des allèles hérités', 'de l’alimentation', 'du climat'], 'L’environnement ne le change pas.'),
            ]),
            ('Ne pas tout attribuer aux gènes', [
                {'type': 'piege', 'erreur': 'On croit que tous nos caractères sont fixés à la naissance par nos gènes.', 'correction': 'Beaucoup de caractères dépendent aussi du mode de vie et du milieu.'},
            ]),
        ],
        a_toi=[
            q('Le génotype désigne :', ['l’ensemble des allèles d’un individu', 'son apparence', 'son milieu de vie'], 'Son patrimoine génétique.'),
            q('Les muscles d’un sportif entrainé dépendent aussi :', ['de l’environnement, ici l’entrainement', 'uniquement des gènes', 'du groupe sanguin'], 'Le phénotype évolue avec le mode de vie.'),
            q('Des vrais jumeaux ont :', ['les mêmes allèles', 'des allèles différents', 'des groupes sanguins différents'], 'Ils viennent de la même cellule-œuf.'),
        ],
        sources=[ref('SV-C4-3E-PHEN-01', 'Génotype, phénotype, environnement')]),

    'SV-C4-3E-MEIO-01': dict(duree=7, essentiel=
        'La méiose produit les cellules reproductrices : elles ne contiennent qu’un chromosome de chaque paire, soit 23 chez l’être humain.\n'
        'Le chromosome de chaque paire est choisi au hasard : chaque parent peut produire des millions de gamètes différents.\n'
        'À la fécondation, deux gamètes s’unissent : la cellule-œuf retrouve 46 chromosomes et une combinaison d’allèles unique.',
        parties=[
            ('Méiose et fécondation', [
                {'type': 'tableau', 'titre': 'Le nombre de chromosomes', 'colonnes': ['Cellule', 'Nombre de chromosomes'], 'lignes': [
                    ['cellule ordinaire', '46, soit 23 paires'], ['gamète : ovule ou spermatozoïde', '23, un de chaque paire'], ['cellule-œuf', '46 : 23 de chaque parent']]},
                bq('Un spermatozoïde humain contient :', ['23 chromosomes', '46 chromosomes', '92 chromosomes'], 'Un de chaque paire.'),
            ]),
            ('Pourquoi chacun est unique', [
                {'type': 'explique', 'texte': 'Avec 23 paires, chaque parent peut fabriquer plus de 8 millions de gamètes différents. La rencontre de deux gamètes multiplie encore les combinaisons.'},
                {'type': 'piege', 'erreur': 'On croit que l’enfant reçoit une moitié fixe et identique des chromosomes de chaque parent.', 'correction': 'Il reçoit un chromosome de chaque paire, choisi au hasard : deux enfants n’ont pas les mêmes.'},
            ]),
        ],
        a_toi=[
            q('La méiose produit :', ['les gamètes', 'les cellules de la peau', 'les globules rouges'], 'Les cellules reproductrices.'),
            q('La cellule-œuf contient :', ['46 chromosomes', '23 chromosomes', '69 chromosomes'], '23 + 23.'),
            q('Deux enfants des mêmes parents :', ['n’ont pas les mêmes allèles, sauf vrais jumeaux', 'ont toujours les mêmes allèles', 'n’ont aucun allèle commun'], 'Le hasard de la méiose et de la fécondation.'),
        ],
        sources=[ref('SV-C4-3E-MEIO-01', 'Méiose, fécondation, diversité')]),

    # ------------------------------------------------------------- Technologie
    'TE-C4-3E-EVO-01': dict(duree=7, essentiel=
        'Une innovation de rupture change profondément les usages ; une innovation incrémentale améliore un objet existant.\n'
        'Le smartphone a réuni téléphone, appareil photo et ordinateur : c’est une innovation de rupture.\n'
        'Les intelligences artificielles apprennent à partir de données. Leurs résultats peuvent reproduire les biais de ces données.',
        parties=[
            ('Rupture ou amélioration ?', [
                {'type': 'tableau', 'titre': 'Deux types d’innovation', 'colonnes': ['Type', 'Exemple'], 'lignes': [
                    ['rupture', 'passage de la lampe à incandescence à la DEL ; smartphone'], ['incrémentale', 'un smartphone avec un meilleur appareil photo']]},
                bq('Le passage du disque vinyle à l’écoute en ligne est :', ['une innovation de rupture', 'une innovation incrémentale', 'une absence d’innovation'], 'Les usages changent complètement.'),
            ]),
            ('Comment une IA apprend', [
                {'type': 'tableau', 'titre': 'Trois apprentissages', 'colonnes': ['Apprentissage', 'Principe', 'Exemple'], 'lignes': [
                    ['supervisé', 'données étiquetées avec la bonne réponse', 'photos marquées « chat » ou « chien »'], ['non supervisé', 'l’IA regroupe des données sans étiquettes', 'classer des clients par habitudes'], ['par renforcement', 'récompenses ou pénalités après chaque essai', 'apprendre à jouer à un jeu']]},
                {'type': 'piege', 'erreur': 'On croit qu’une IA est objective parce que c’est une machine.', 'correction': 'Si les données d’apprentissage sont déséquilibrées, l’IA reproduit ces biais. Elle peut aussi se tromper.'},
            ]),
        ],
        a_toi=[
            q('Un biais d’une IA peut venir :', ['des données d’apprentissage', 'de la couleur de l’écran', 'de la météo'], 'Des données déséquilibrées donnent des résultats déséquilibrés.'),
            q('Une IA entrainée avec des photos étiquetées utilise un apprentissage :', ['supervisé', 'non supervisé', 'par renforcement'], 'Chaque exemple porte la bonne réponse.'),
            q('Une innovation incrémentale :', ['améliore un objet existant', 'invente un usage totalement nouveau', 'supprime un objet'], 'Une petite évolution.'),
        ],
        sources=[ref('TE-C4-3E-EVO-01', 'Innovations et intelligence artificielle')]),

    'TE-C4-3E-ENER-01': dict(duree=6, essentiel=
        'Le schéma bloc de la chaine d’énergie montre les fonctions alimenter, distribuer, convertir, transmettre, et l’énergie qui circule entre elles.\n'
        'Portail automatique : batterie (alimenter) → variateur (distribuer) → moteur (convertir) → engrenages (transmettre).\n'
        'On indique la nature de l’énergie à chaque étape : électrique, puis mécanique.',
        parties=[
            ('Le schéma bloc', [
                {'type': 'tableau', 'titre': 'Portail automatique', 'colonnes': ['Fonction', 'Constituant', 'Énergie en sortie'], 'lignes': [
                    ['alimenter', 'batterie', 'électrique'], ['distribuer', 'variateur', 'électrique dosée'], ['convertir', 'moteur', 'mécanique de rotation'], ['transmettre', 'engrenages', 'mécanique, vers le vantail']]},
                bq('Dans ce schéma, quel constituant change la nature de l’énergie ?', ['le moteur', 'la batterie', 'le variateur'], 'Électrique → mécanique.'),
            ]),
            ('Des pertes', [
                {'type': 'explique', 'texte': 'À chaque conversion, une partie de l’énergie est perdue, surtout en chaleur. Le moteur d’un portail chauffe quand il fonctionne longtemps.'},
                {'type': 'piege', 'erreur': 'On place le moteur dans « transmettre ».', 'correction': 'Le moteur convertit l’énergie. Les engrenages, poulies ou chaines la transmettent.'},
            ]),
        ],
        a_toi=[
            q('Le variateur sert à :', ['distribuer l’énergie selon la commande', 'stocker l’énergie', 'convertir en chaleur'], 'Il dose l’énergie envoyée au moteur.'),
            q('Un panneau solaire, en entrée d’une chaine, sert à :', ['alimenter', 'transmettre', 'distribuer'], 'Il fournit l’énergie électrique.'),
            q('Dans un vélo électrique, la chaine assure la fonction :', ['transmettre', 'convertir', 'alimenter'], 'Elle transmet la rotation à la roue.'),
        ],
        sources=[ref('TE-C4-3E-ENER-01', 'Schéma de la chaine d’énergie')]),

    'TE-C4-3E-NUMER-01': dict(duree=7, essentiel=
        'Une grandeur analogique varie de façon continue, comme la tension fournie par un capteur de température.\n'
        'Un convertisseur la transforme en nombre : c’est une donnée numérique, exploitable par le microcontrôleur.\n'
        'Les données numériques sont codées en binaire, avec des 0 et des 1 : les bits. Avec 8 bits, on code 256 valeurs.',
        parties=[
            ('Analogique et numérique', [
                {'type': 'tableau', 'titre': 'Comparer', 'colonnes': ['Critère', 'Analogique', 'Numérique'], 'lignes': [
                    ['valeurs', 'continues', 'en nombre limité'], ['exemple', 'tension du capteur', 'nombre lu par le microcontrôleur'], ['support', 'aiguille, signal électrique', 'bits : 0 et 1']]},
                bq('Avec 8 bits, combien de valeurs différentes peut-on coder ?', ['256', '8', '16'], '2⁸ = 256.'),
            ]),
            ('Le binaire', [
                {'type': 'tableau', 'titre': 'Des nombres en binaire', 'colonnes': ['Décimal', 'Binaire'], 'lignes': [
                    ['2', '10'], ['5', '101'], ['13', '1101'], ['255', '1111 1111']]},
                {'type': 'piege', 'erreur': 'On lit « 101 » en binaire comme cent un.', 'correction': 'En binaire, 101 = 1 × 4 + 0 × 2 + 1 × 1 = 5.'},
            ]),
        ],
        a_toi=[
            q('En binaire, 110 vaut :', ['6', '110', '3'], '4 + 2 + 0.'),
            q('Un bit peut valoir :', ['0 ou 1', 'de 0 à 9', 'n’importe quel nombre'], 'Deux états.'),
            q('Avec 10 bits, on code :', ['1 024 valeurs', '100 valeurs', '20 valeurs'], '2¹⁰ = 1 024.'),
        ],
        sources=[ref('TE-C4-3E-NUMER-01', 'Analogique et numérique')]),

    'TE-C4-3E-RES-01': dict(duree=7, essentiel=
        'Internet relie entre eux des millions de réseaux. Une information y est découpée en paquets.\n'
        'Des routeurs dirigent chaque paquet vers sa destination, grâce à son adresse IP : c’est le routage.\n'
        'Un serveur DNS traduit un nom de site, lisible par un humain, en adresse IP.',
        parties=[
            ('Le trajet d’un message', [
                {'type': 'methode', 'titre': 'Un message de Lyon à Montréal', 'etapes': [
                    'Le message est découpé en paquets numérotés.', 'Chaque paquet porte l’adresse IP de destination.', 'Des routeurs choisissent le chemin, paquet par paquet.', 'À l’arrivée, les paquets sont remis dans l’ordre.']},
                bq('Le rôle d’un routeur est de :', ['diriger les paquets vers leur destination', 'stocker les sites web', 'afficher les pages'], 'Il choisit le chemin.'),
            ]),
            ('Pourquoi des paquets ?', [
                {'type': 'explique', 'texte': 'Si un câble est coupé, les paquets prennent un autre chemin. Le réseau continue de fonctionner.'},
                {'type': 'piege', 'erreur': 'On croit qu’un message suit toujours un seul chemin direct.', 'correction': 'Les paquets d’un même message peuvent emprunter des chemins différents.'},
            ]),
        ],
        a_toi=[
            q('Le DNS sert à :', ['traduire un nom de site en adresse IP', 'découper les paquets', 'chiffrer les mots de passe'], 'Comme un annuaire.'),
            q('Internet est :', ['un réseau de réseaux', 'un seul ordinateur géant', 'un site web'], 'Des millions de réseaux interconnectés.'),
            q('Un paquet de données contient notamment :', ['l’adresse IP de destination', 'la couleur du message', 'le nom du routeur'], 'Pour être acheminé.'),
        ],
        sources=[ref('TE-C4-3E-RES-01', 'Internet et routage')]),

    'TE-C4-3E-REP-01': dict(duree=6, essentiel=
        'Pour dépanner un objet, on formule des hypothèses sur la cause de la panne, puis on les teste une par une.\n'
        'On commence par les causes les plus simples à vérifier.\n'
        'Une lampe de bureau ne s’allume plus : on vérifie la prise, puis l’ampoule, puis l’interrupteur. Une pièce cassée peut être refaite sur mesure.',
        parties=[
            ('Un protocole', [
                {'type': 'tableau', 'titre': 'La lampe ne s’allume plus', 'colonnes': ['Hypothèse', 'Test', 'Résultat'], 'lignes': [
                    ['pas de courant', 'brancher un autre appareil sur la prise', 'fonctionne : la prise est bonne'], ['ampoule grillée', 'essayer une ampoule neuve', 'la lampe s’allume : panne trouvée'], ['interrupteur défectueux', 'tester au multimètre', 'inutile ici']]},
                bq('Pourquoi tester d’abord la prise ?', ['c’est la vérification la plus simple', 'c’est toujours la cause', 'pour gagner du courant'], 'On va du plus simple au plus long à vérifier.'),
            ]),
            ('Réparer', [
                {'type': 'explique', 'texte': 'Le clip cassé d’un boitier peut être modélisé en 3D et imprimé. La réparation prolonge la vie de l’objet.'},
                {'type': 'piege', 'erreur': 'On change plusieurs pièces en même temps.', 'correction': 'On ne saurait plus laquelle était en panne : un test à la fois.'},
            ]),
        ],
        a_toi=[
            q('Pour tester la continuité d’un fil, on utilise :', ['un multimètre', 'une balance', 'un thermomètre'], 'Il vérifie que le courant passe.'),
            q('Réparer un objet plutôt que le remplacer :', ['réduit les déchets', 'augmente toujours le cout', 'est interdit'], 'Il dure plus longtemps.'),
            q('Une hypothèse de panne doit être :', ['testée', 'acceptée sans vérification', 'ignorée'], 'Le test la confirme ou l’écarte.'),
        ],
        sources=[ref('TE-C4-3E-REP-01', 'Dépanner et réparer')]),

    'TE-C4-3E-PROG-01': dict(duree=7, essentiel=
        'Pour programmer une fonctionnalité, on identifie d’abord les données : entrées des capteurs, sorties vers les actionneurs, variables.\n'
        'Alarme : si la porte s’ouvre et que l’alarme est activée, alors la sirène sonne.\n'
        'Le même algorithme peut s’écrire en blocs ou en langage textuel, comme Python.',
        parties=[
            ('Données et algorithme', [
                {'type': 'tableau', 'titre': 'L’alarme', 'colonnes': ['Donnée', 'Type', 'Rôle'], 'lignes': [
                    ['porte_ouverte', 'booléen', 'entrée du capteur'], ['alarme_active', 'booléen', 'état choisi par l’utilisateur'], ['sirene', 'commande', 'sortie vers l’actionneur']]},
                bq('La sirène sonne si :', ['la porte est ouverte ET l’alarme est activée', 'la porte est ouverte OU l’alarme est activée', 'l’alarme est désactivée'], 'Les deux conditions sont nécessaires.'),
            ]),
            ('En langage textuel', [
                {'type': 'explique', 'texte': 'En Python : « if porte_ouverte and alarme_active: sonner() ». Le mot and correspond au bloc ET.'},
                {'type': 'piege', 'erreur': 'On teste seulement le cas où tout fonctionne.', 'correction': 'On teste les quatre combinaisons : porte ouverte ou fermée, alarme activée ou non.'},
            ]),
        ],
        a_toi=[
            q('En Python, l’opérateur ET s’écrit :', ['and', 'or', 'not'], 'or correspond à OU.'),
            q('Un capteur fournit au programme :', ['une entrée', 'une sortie', 'une boucle'], 'Le programme lit sa valeur.'),
            q('Pour valider le programme de l’alarme, on teste :', ['toutes les combinaisons d’entrées', 'une seule situation', 'rien'], 'Quatre cas ici.'),
        ],
        sources=[ref('TE-C4-3E-PROG-01', 'Programmer une fonctionnalité')]),

    'TE-C4-3E-MAT-01': dict(duree=6, essentiel=
        'Une pièce subit des sollicitations : flexion, traction, compression, torsion.\n'
        'On choisit un matériau qui résiste à ces sollicitations et un procédé adapté à sa forme.\n'
        'On tient compte aussi du cout, de la masse et de l’impact environnemental. Une étagère en flexion sera en bois ou en acier plié plutôt qu’en plastique fin.',
        parties=[
            ('Les sollicitations', [
                {'type': 'tableau', 'titre': 'Des exemples', 'colonnes': ['Sollicitation', 'Exemple'], 'lignes': [
                    ['flexion', 'une étagère chargée de livres'], ['traction', 'un câble de téléphérique'], ['compression', 'un pied de table'], ['torsion', 'un tournevis qu’on fait tourner']]},
                bq('Un câble qui soutient une charge subit surtout :', ['une traction', 'une compression', 'une flexion'], 'On tire dessus.'),
            ]),
            ('Justifier un choix', [
                {'type': 'methode', 'titre': 'Choisir le matériau d’une étagère', 'etapes': [
                    'Identifie la sollicitation : flexion.', 'Liste les matériaux possibles : bois, acier, plastique.', 'Compare résistance, cout, masse, recyclage.', 'Choisis le procédé : découpe pour le bois, pliage pour l’acier.']},
                {'type': 'piege', 'erreur': 'On choisit le matériau le plus résistant sans regarder les autres critères.', 'correction': 'Un matériau trop lourd, trop cher ou non recyclable peut être un mauvais choix.'},
            ]),
        ],
        a_toi=[
            q('Un pied de table subit surtout :', ['une compression', 'une traction', 'une torsion'], 'Le poids appuie dessus.'),
            q('Pour une pièce en tôle d’acier, un procédé adapté est :', ['le pliage', 'l’impression 3D en plastique', 'le moulage du bois'], 'La tôle se plie.'),
            q('Un critère environnemental dans le choix d’un matériau :', ['sa recyclabilité', 'sa couleur', 'son nom'], 'Que devient-il en fin de vie ?'),
        ],
        sources=[ref('TE-C4-3E-MAT-01', 'Choisir un matériau et un procédé')]),

    'TE-C4-3E-DD-01': dict(duree=6, essentiel=
        'Pour évaluer un objet, on utilise des critères : performance, cout, note de réparabilité ou de durabilité, classe énergétique.\n'
        'Le développement durable repose sur trois piliers : environnemental, économique et social.\n'
        'Un lave-linge noté 8,5 sur 10 et classé A est préférable, sur ces critères, à un modèle noté 5 et classé D.',
        parties=[
            ('Comparer', [
                {'type': 'tableau', 'titre': 'Deux lave-linge', 'colonnes': ['Critère', 'Modèle 1', 'Modèle 2'], 'lignes': [
                    ['note de réparabilité', '8,5/10', '5/10'], ['classe énergétique', 'A', 'D'], ['prix d’achat', 'plus élevé', 'plus bas'], ['cout sur 10 ans', 'plus bas', 'plus élevé']]},
                bq('Sur 10 ans, le modèle le plus avantageux est :', ['le modèle 1', 'le modèle 2', 'aucun'], 'Il consomme moins et se répare mieux.'),
            ]),
            ('Les trois piliers', [
                {'type': 'tableau', 'titre': 'Argumenter', 'colonnes': ['Pilier', 'Question'], 'lignes': [
                    ['environnemental', 'consommation, matériaux, recyclage ?'], ['économique', 'cout d’achat et d’usage ?'], ['social', 'conditions de fabrication, emplois de réparation ?']]},
                {'type': 'piege', 'erreur': 'On ne regarde que le prix d’achat.', 'correction': 'Le cout d’usage et la durée de vie comptent autant : un appareil bon marché peut couter plus cher au final.'},
            ]),
        ],
        a_toi=[
            q('La classe énergétique va de :', ['A à G', '1 à 10', 'rouge à vert sans lettre'], 'A est la plus économe.'),
            q('Les trois piliers du développement durable sont :', ['environnemental, économique, social', 'cout, poids, couleur', 'air, eau, terre'], 'Ils doivent être équilibrés.'),
            q('Une note de réparabilité élevée signifie :', ['que l’objet se répare facilement', 'qu’il ne tombe jamais en panne', 'qu’il est jetable'], 'Pièces disponibles, démontage facile.'),
        ],
        sources=[ref('TE-C4-3E-DD-01', 'Réparabilité et étiquette énergie')]),

    'TE-C4-3E-PROJ-01': dict(duree=6, essentiel=
        'Un projet technique suit des étapes : analyse du besoin, cahier des charges, recherche de solutions, conception, réalisation, tests.\n'
        'On le planifie avec un diagramme des tâches, qui montre qui fait quoi et quand.\n'
        'Des revues de projet font le point ; l’écoconception réduit l’impact environnemental dès la conception.',
        parties=[
            ('Planifier', [
                {'type': 'tableau', 'titre': 'Planning d’un projet de six semaines', 'colonnes': ['Tâche', 'Durée', 'Semaines'], 'lignes': [
                    ['recherche d’idées', '1 semaine', 'semaine 1'], ['modélisation', '2 semaines', 'semaines 2 et 3'], ['fabrication', '2 semaines', 'semaines 4 et 5'], ['tests', '1 semaine', 'semaine 6']]},
                bq('Si la modélisation prend une semaine de retard, les tests :', ['sont décalés', 'commencent quand même en semaine 6', 'sont supprimés'], 'Les tâches s’enchainent.'),
            ]),
            ('Revue de projet et écoconception', [
                {'type': 'explique', 'texte': 'Lors d’une revue de projet, l’équipe compare l’avancement au planning et décide des ajustements. L’écoconception choisit des matériaux recyclés et un objet démontable.'},
                {'type': 'piege', 'erreur': 'On pense à l’environnement seulement à la fin du projet.', 'correction': 'C’est lors de la conception que les choix pèsent le plus : matériaux, démontage, consommation.'},
            ]),
        ],
        a_toi=[
            q('Une revue de projet sert à :', ['faire le point sur l’avancement', 'vendre le produit', 'remplacer le cahier des charges'], 'On ajuste le planning.'),
            q('L’écoconception intervient :', ['dès la conception', 'seulement au recyclage', 'jamais'], 'Les choix initiaux comptent le plus.'),
            q('Un diagramme des tâches montre :', ['l’enchainement des tâches dans le temps', 'le prix des matériaux', 'le schéma électrique'], 'Comme un diagramme de Gantt.'),
        ],
        sources=[ref('TE-C4-3E-PROJ-01', 'Gérer un projet technique')]),

    'TE-C4-3E-TEST-01': dict(duree=6, essentiel=
        'Pour valider une solution, on la teste par une simulation ou par un protocole de mesures.\n'
        'On compare les résultats aux exigences du cahier des charges et on calcule les écarts.\n'
        'Exigence : autonomie de 2 h. Mesure : 1 h 40. Écart : 20 min, l’exigence n’est pas atteinte.',
        parties=[
            ('Comparer aux exigences', [
                {'type': 'tableau', 'titre': 'Validation d’un robot', 'colonnes': ['Exigence', 'Valeur attendue', 'Mesure', 'Validé ?'], 'lignes': [
                    ['autonomie', '2 h', '1 h 40', 'non, écart de 20 min'], ['vitesse', 'au moins 0,5 m/s', '0,6 m/s', 'oui'], ['masse', 'au plus 2 kg', '1,8 kg', 'oui']]},
                bq('Une mesure de 0,6 m/s pour une exigence d’au moins 0,5 m/s :', ['est validée', 'n’est pas validée', 'n’a pas de sens'], '0,6 ≥ 0,5.'),
            ]),
            ('Réduire un écart', [
                {'type': 'explique', 'texte': 'Pour gagner 20 min d’autonomie, on peut choisir une batterie plus puissante, alléger le robot ou réduire sa vitesse.'},
                {'type': 'piege', 'erreur': 'On valide une solution sur un seul essai.', 'correction': 'On répète les mesures dans les mêmes conditions pour s’assurer du résultat.'},
            ]),
        ],
        a_toi=[
            q('Un écart, en validation, est :', ['la différence entre la mesure et l’exigence', 'une panne', 'un nouveau besoin'], 'Il dit si l’objectif est atteint.'),
            q('Une simulation permet :', ['de tester une solution sur ordinateur avant de la fabriquer', 'de fabriquer plus vite', 'de remplacer le cahier des charges'], 'On économise du temps et des matériaux.'),
            q('Exigence : masse au plus 3 kg. Mesure : 3,4 kg. La solution :', ['n’est pas validée', 'est validée', 'est parfaite'], '3,4 > 3.'),
        ],
        sources=[ref('TE-C4-3E-TEST-01', 'Valider une solution par des tests')]),
}

ecrire(COURS)
