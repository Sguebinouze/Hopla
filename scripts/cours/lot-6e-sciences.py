"""Lot de cours : sciences et technologie 6e. Écrit les cours en brouillon (auteur ia).

    python3 scripts/cours/lot-6e-sciences.py

Cycle 3 : phrases de 20 mots au plus. Les pages des extraits sont retrouvées ensuite dans les PDF archivés.
"""
from commun import bq, ecrire, q, src, vocabulaire

PROG = 'eduscol-cycle-3-2023'

COURS = {
    'ST-C3-6E-MAT-01': dict(duree=8, essentiel=
        'La matière existe à l’état solide, liquide ou gazeux.\n'
        'L’eau pure gèle à 0 °C et bout à 100 °C, sous la pression atmosphérique normale.\n'
        'Pendant un changement d’état d’un corps pur, la température reste constante.',
        parties=[
            ('Trois états', [
                {'type': 'tableau', 'titre': 'Les états de la matière', 'colonnes': ['État', 'Forme', 'Volume', 'Exemple'], 'lignes': [
                    ['solide', 'propre', 'propre', 'glaçon, fer'], ['liquide', 'prend la forme du récipient', 'propre', 'eau, huile'], ['gazeux', 'occupe tout l’espace', 'variable', 'vapeur d’eau, air']]},
                vocabulaire(3, 'Changement d’état'),
                {'type': 'tableau', 'titre': 'Noms des changements d’état', 'colonnes': ['Passage', 'Nom'], 'lignes': [
                    ['solide → liquide', 'fusion'], ['liquide → solide', 'solidification'], ['liquide → gaz', 'vaporisation'], ['gaz → liquide', 'liquéfaction']]},
                bq('Un glaçon qui fond subit :', ['une fusion', 'une solidification', 'une vaporisation'], 'Solide vers liquide.'),
            ]),
            ('Mesurer une température de changement d’état', [
                {'type': 'methode', 'titre': 'Expérience : chauffer de la glace', 'etapes': [
                    'Place de la glace pilée dans un tube avec un thermomètre.',
                    'Relève la température toutes les minutes.',
                    'Trace la courbe : un palier apparait à 0 °C pendant la fusion.']},
                {'type': 'piege', 'erreur': 'On croit que la température monte pendant que la glace fond.', 'correction': 'Pour l’eau pure, elle reste à 0 °C tant qu’il reste de la glace.'},
                {'type': 'explique', 'texte': 'On classe aussi les matériaux selon leurs propriétés : conduire la chaleur, flotter, être attiré par un aimant, résister.'},
            ]),
        ],
        a_toi=[
            q('À quelle température l’eau pure bout-elle ?', ['100 °C', '0 °C', '50 °C'], 'Sous la pression atmosphérique normale.'),
            q('La buée sur un miroir est :', ['une liquéfaction', 'une fusion', 'une solidification'], 'La vapeur d’eau redevient liquide.'),
            q('Un liquide prend :', ['la forme de son récipient', 'toujours la même forme', 'tout l’espace disponible'], 'Il a un volume propre mais pas de forme propre.'),
        ],
        sources=[src(PROG, 'Mesurer des températures de changement', 'Changements d’état')]),

    'ST-C3-6E-MAT-02': dict(duree=8, essentiel=
        'La masse se mesure en kilogrammes, le volume en litres ou en m³ : 1 L = 1 dm³.\n'
        'On sépare un mélange par décantation, filtration ou évaporation.\n'
        'L’air est un mélange : environ 78 % de diazote et 21 % de dioxygène.',
        parties=[
            ('Masse et volume', [
                {'type': 'tableau', 'titre': 'Unités', 'colonnes': ['Grandeur', 'Unités', 'Relations'], 'lignes': [
                    ['masse', 'kg, g, mg', '1 kg = 1 000 g'], ['volume', 'L, mL, m³, dm³, cm³', '1 L = 1 dm³ ; 1 mL = 1 cm³']]},
                {'type': 'piege', 'erreur': 'On confond masse et volume : un kilo de plumes prend la même place qu’un kilo de plomb.', 'correction': 'Même masse, mais les plumes occupent un volume bien plus grand.'},
                bq('Combien de mL dans 1 L ?', ['1 000', '100', '10'], '1 L = 1 000 mL.'),
            ]),
            ('Séparer un mélange', [
                vocabulaire(3, 'Mélange'),
                {'type': 'tableau', 'titre': 'Techniques de séparation', 'colonnes': ['Technique', 'Principe', 'Exemple'], 'lignes': [
                    ['décantation', 'on laisse reposer, le solide tombe au fond', 'eau boueuse'], ['filtration', 'un filtre retient les particules solides', 'café'], ['évaporation', 'l’eau s’évapore, le solide dissous reste', 'marais salants']]},
                {'type': 'explique', 'texte': 'L’eau salée est un mélange homogène : on ne distingue pas le sel. La filtration ne le retient pas ; l’évaporation, si.'},
                bq('Comment récupérer le sel de l’eau de mer ?', ['par évaporation', 'par filtration', 'par décantation'], 'Le sel dissous traverse le filtre.'),
            ]),
            ('L’air', [
                {'type': 'tableau', 'titre': 'Composition de l’air sec', 'colonnes': ['Gaz', 'Proportion'], 'lignes': [['diazote', 'environ 78 %'], ['dioxygène', 'environ 21 %'], ['autres gaz', 'environ 1 %']]},
            ]),
        ],
        a_toi=[
            q('Quel gaz est le plus abondant dans l’air ?', ['le diazote', 'le dioxygène', 'le dioxyde de carbone'], 'Environ 78 %.'),
            q('Pour séparer du sable et de l’eau, on peut :', ['filtrer', 'évaporer seulement', 'congeler'], 'Le filtre retient le sable.'),
            q('Combien de cm³ dans 1 L ?', ['1 000', '100', '10'], '1 L = 1 dm³ = 1 000 cm³.'),
        ],
        sources=[src(PROG, 'Rechercher et exploiter des informations', 'Masse, volume, mélanges')]),

    'ST-C3-6E-MVT-01': dict(duree=8, essentiel=
        'La vitesse moyenne est la distance parcourue divisée par la durée : v = d ÷ t.\n'
        'Une voiture qui parcourt 150 km en 2 h roule à 75 km/h en moyenne.\n'
        'La Terre tourne sur elle-même en un jour et autour du Soleil en une année.',
        parties=[
            ('Calculer une vitesse moyenne', [
                vocabulaire(3, 'Vitesse'),
                {'type': 'methode', 'titre': 'Pour calculer une vitesse moyenne', 'etapes': [
                    'Repère la distance et la durée.',
                    'Vérifie les unités : km et h donnent des km/h.',
                    'Divise la distance par la durée.']},
                {'type': 'exemple-resolu', 'enonce': 'Un cycliste parcourt 30 km en 1 h 30 min.', 'etapes': [
                    '1 h 30 min = 1,5 h.', '30 ÷ 1,5 = 20.'],
                 'conclusion': 'Sa vitesse moyenne est 20 km/h.'},
                {'type': 'piege', 'erreur': 'On écrit 1 h 30 min = 1,3 h.', 'correction': '30 min, c’est une demi-heure : 1,5 h.'},
                bq('Un train fait 600 km en 3 h. Vitesse moyenne ?', ['200 km/h', '1 800 km/h', '603 km/h'], '600 ÷ 3 = 200.'),
            ]),
            ('Les mouvements de la Terre', [
                {'type': 'tableau', 'titre': 'Deux mouvements', 'colonnes': ['Mouvement', 'Durée', 'Conséquence'], 'lignes': [
                    ['rotation sur elle-même', 'environ 24 h', 'jour et nuit'], ['révolution autour du Soleil', 'environ 365 jours et un quart', 'l’année']]},
                {'type': 'explique', 'texte': 'Le quart de jour de chaque année s’accumule : tous les quatre ans, on ajoute le 29 février. C’est une année bissextile.'},
            ]),
        ],
        a_toi=[
            q('Une voiture roule 2 h à 90 km/h. Distance ?', ['180 km', '45 km', '92 km'], 'd = v × t = 90 × 2.'),
            q('Que dure une rotation de la Terre sur elle-même ?', ['environ 24 h', 'environ 365 jours', 'environ 1 mois'], 'C’est un jour.'),
            q('Un piéton fait 5 km en 1 h. Sa vitesse ?', ['5 km/h', '50 km/h', '0,5 km/h'], '5 ÷ 1 = 5.'),
        ],
        sources=[src(PROG, 'Calculer la valeur de la vitesse à partir de la', 'Vitesse moyenne')]),

    'ST-C3-6E-NRJ-01': dict(duree=8, essentiel=
        'L’énergie existe sous plusieurs formes : thermique, électrique, lumineuse, de mouvement, chimique.\n'
        'Un objet convertit une forme d’énergie en une autre : une lampe convertit l’énergie électrique en lumière et en chaleur.\n'
        'Les ressources renouvelables se reconstituent vite ; les fossiles (pétrole, charbon, gaz) s’épuisent.',
        parties=[
            ('Formes et conversions', [
                {'type': 'tableau', 'titre': 'Conversions d’énergie', 'colonnes': ['Objet', 'Énergie reçue', 'Énergie produite'], 'lignes': [
                    ['lampe', 'électrique', 'lumineuse et thermique'], ['éolienne', 'de mouvement (vent)', 'électrique'], ['panneau solaire', 'lumineuse', 'électrique'], ['muscle', 'chimique (aliments)', 'de mouvement et thermique']]},
                bq('Une éolienne convertit l’énergie du vent en énergie :', ['électrique', 'chimique', 'lumineuse'], 'Le vent fait tourner un alternateur.'),
            ]),
            ('Ressources renouvelables ou non', [
                vocabulaire(3, 'Énergie renouvelable'),
                {'type': 'tableau', 'titre': 'Ressources', 'colonnes': ['Renouvelables', 'Non renouvelables'], 'lignes': [
                    ['soleil', 'pétrole'], ['vent', 'charbon'], ['eau des barrages', 'gaz naturel'], ['bois', 'uranium']]},
                {'type': 'piege', 'erreur': 'On croit que l’électricité est une source d’énergie.', 'correction': 'L’électricité est produite à partir d’une ressource : charbon, uranium, vent, eau, soleil.'},
                bq('Quelle ressource n’est pas renouvelable ?', ['le charbon', 'le vent', 'le soleil'], 'Il a mis des millions d’années à se former.'),
            ]),
        ],
        a_toi=[
            q('Un radiateur électrique produit surtout de l’énergie :', ['thermique', 'lumineuse', 'de mouvement'], 'Il chauffe.'),
            q('Le pétrole est une énergie :', ['fossile, non renouvelable', 'renouvelable', 'inépuisable'], 'Ses réserves s’épuisent.'),
            q('Quelle énergie stockent les aliments ?', ['chimique', 'électrique', 'lumineuse'], 'Le corps la libère par la digestion et la respiration.'),
        ],
        sources=[src(PROG, 'Identifier différentes formes d’énergie', 'Formes d’énergie')]),

    'ST-C3-6E-SIG-01': dict(duree=8, essentiel=
        'La Terre tourne sur elle-même : la moitié éclairée par le Soleil est dans le jour, l’autre dans la nuit.\n'
        'L’axe de la Terre est incliné : au fil de l’année, la durée du jour change.\n'
        'En France, les jours sont longs en été et courts en hiver.',
        parties=[
            ('Le jour et la nuit', [
                {'type': 'observe', 'consigne': 'On éclaire un globe avec une lampe et on le fait tourner.', 'exemples': [
                    'Une moitié du globe est toujours éclairée.', 'Quand le globe tourne, un point passe du côté éclairé au côté sombre.', 'Le Soleil semble se lever à l’est et se coucher à l’ouest.']},
                {'type': 'piege', 'erreur': 'On croit que le Soleil tourne autour de la Terre en un jour.', 'correction': 'C’est la Terre qui tourne sur elle-même. Le mouvement du Soleil n’est qu’apparent.'},
                bq('Pourquoi y a-t-il des jours et des nuits ?', ['la Terre tourne sur elle-même', 'le Soleil s’éteint la nuit', 'la Lune cache le Soleil'], 'Rotation en environ 24 h.'),
            ]),
            ('Les saisons', [
                {'type': 'tableau', 'titre': 'En France', 'colonnes': ['Moment', 'Durée du jour'], 'lignes': [
                    ['solstice d’été (vers le 21 juin)', 'le plus long jour de l’année'], ['équinoxes (vers le 21 mars et le 22 septembre)', 'jour et nuit à peu près égaux'], ['solstice d’hiver (vers le 21 décembre)', 'le plus court jour de l’année']]},
                {'type': 'explique', 'texte': 'Les saisons viennent de l’inclinaison de l’axe de la Terre. Elles ne viennent pas de la distance au Soleil.'},
            ]),
        ],
        a_toi=[
            q('Quand le jour est-il le plus long en France ?', ['au solstice d’été', 'au solstice d’hiver', 'à l’équinoxe'], 'Vers le 21 juin.'),
            q('De quel côté le Soleil semble-t-il se lever ?', ['à l’est', 'à l’ouest', 'au nord'], 'La Terre tourne vers l’est.'),
            q('Les saisons sont dues :', ['à l’inclinaison de l’axe de la Terre', 'à la distance Terre-Soleil', 'à la Lune'], 'L’axe reste incliné tout au long de l’orbite.'),
        ],
        sources=[src(PROG, 'Interpréter l’alternance du jour et de la nuit', 'Jour et nuit')]),

    'ST-C3-6E-ELEC-01': dict(duree=8, essentiel=
        'Un circuit électrique simple forme une boucle fermée : pile, fils, interrupteur, lampe.\n'
        'Si la boucle est ouverte, le courant ne circule pas.\n'
        'Un signal transporte une information : lumière d’un phare, son d’une sirène, onde radio.',
        parties=[
            ('Le circuit à une boucle', [
                {'type': 'methode', 'titre': 'Pour réaliser un circuit', 'etapes': [
                    'Relie une borne de la pile à la lampe.',
                    'Relie la lampe à l’interrupteur.',
                    'Relie l’interrupteur à l’autre borne de la pile.',
                    'Ferme l’interrupteur : la lampe brille.']},
                {'type': 'tableau', 'titre': 'Conducteurs et isolants', 'colonnes': ['Conducteurs', 'Isolants'], 'lignes': [['cuivre, fer, aluminium', 'plastique, bois sec, verre, caoutchouc']]},
                {'type': 'piege', 'erreur': 'On relie les deux fils de la lampe à la même borne de la pile.', 'correction': 'Le courant doit faire une boucle complète, d’une borne à l’autre.'},
                bq('L’interrupteur ouvert, la lampe :', ['est éteinte', 'brille plus fort', 'brille pareil'], 'La boucle est coupée.'),
            ]),
            ('Signaux et information', [
                vocabulaire(3, 'Signal'),
                {'type': 'tableau', 'titre': 'Des signaux', 'colonnes': ['Signal', 'Nature', 'Information'], 'lignes': [
                    ['feu tricolore', 'lumineux', 's’arrêter ou passer'], ['sirène', 'sonore', 'danger, alerte'], ['télécommande', 'infrarouge', 'changer de chaine'], ['téléphone', 'onde radio', 'voix, messages']]},
            ]),
        ],
        a_toi=[
            q('Quel matériau est un isolant ?', ['le plastique', 'le cuivre', 'le fer'], 'Il ne laisse pas passer le courant.'),
            q('Un feu rouge transmet un signal :', ['lumineux', 'sonore', 'olfactif'], 'Il se voit.'),
            q('Pour que le courant passe, le circuit doit être :', ['fermé', 'ouvert', 'coupé'], 'Une boucle complète.'),
        ],
        sources=[src(PROG, 'Identifier différents signaux pour', 'Signaux')]),

    'ST-C3-6E-VIV-01': dict(duree=9, essentiel=
        'Tous les êtres vivants sont faits de cellules : c’est l’unité du vivant.\n'
        'On classe les êtres vivants selon les caractères qu’ils partagent, et non selon où ils vivent.\n'
        'Les groupes sont emboités : les mammifères font partie des vertébrés.',
        parties=[
            ('La cellule', [
                vocabulaire(3, 'Cellule'),
                {'type': 'explique', 'texte': 'Au microscope, on observe des cellules : celles de l’oignon, de la joue, d’une feuille. Certains êtres vivants n’ont qu’une seule cellule, comme les bactéries.'},
                bq('Qu’ont en commun tous les êtres vivants ?', ['ils sont faits de cellules', 'ils ont des poumons', 'ils ont des feuilles'], 'La cellule est l’unité du vivant.'),
            ]),
            ('Classer en groupes emboités', [
                {'type': 'tableau', 'titre': 'Caractères partagés', 'colonnes': ['Groupe', 'Caractère', 'Exemples'], 'lignes': [
                    ['vertébrés', 'squelette interne avec colonne vertébrale', 'chat, truite, grenouille, aigle'], ['mammifères', 'poils, mamelles', 'chat, baleine, chauve-souris'], ['oiseaux', 'plumes', 'aigle, manchot'], ['insectes', 'six pattes', 'abeille, fourmi']]},
                {'type': 'piege', 'erreur': 'On range la baleine avec les poissons parce qu’elle vit dans l’eau.', 'correction': 'La baleine a des mamelles et des poils à la naissance : c’est un mammifère.'},
                bq('La chauve-souris est :', ['un mammifère', 'un oiseau', 'un insecte'], 'Elle a des poils et allaite ses petits.'),
            ]),
        ],
        a_toi=[
            q('Quel caractère partagent tous les oiseaux ?', ['les plumes', 'le vol', 'le bec rouge'], 'Le manchot a des plumes mais ne vole pas.'),
            q('Une araignée a :', ['huit pattes', 'six pattes', 'quatre pattes'], 'Ce n’est pas un insecte.'),
            q('On classe les êtres vivants selon :', ['les caractères qu’ils partagent', 'l’endroit où ils vivent', 'leur taille'], 'C’est la classification scientifique.'),
        ],
        sources=[src(PROG, 'Lire et interpréter des arbres de parenté', 'Classification')]),

    'ST-C3-6E-VIV-02': dict(duree=8, essentiel=
        'Un fossile est un reste ou une trace d’être vivant conservé dans une roche.\n'
        'Les fossiles montrent que la biodiversité a changé : des espèces sont apparues, d’autres ont disparu.\n'
        'Il y a environ 66 millions d’années, une crise a fait disparaitre les dinosaures non aviens.',
        parties=[
            ('Les fossiles, témoins du passé', [
                vocabulaire(3, 'Fossile', 'Biodiversité'),
                {'type': 'explique', 'texte': 'Les ammonites, les trilobites et les dinosaures ne vivent plus aujourd’hui. On les connait par leurs fossiles.'},
                bq('Un fossile se trouve le plus souvent :', ['dans une roche', 'dans l’air', 'dans un arbre vivant'], 'Il est conservé dans les couches de roches.'),
            ]),
            ('Des crises de la biodiversité', [
                {'type': 'tableau', 'titre': 'Deux grandes crises', 'colonnes': ['Date', 'Évènement'], 'lignes': [
                    ['il y a environ 252 millions d’années', 'la plus grande extinction : disparition des trilobites'], ['il y a environ 66 millions d’années', 'disparition des dinosaures non aviens et des ammonites']]},
                {'type': 'piege', 'erreur': 'On croit que tous les dinosaures ont disparu.', 'correction': 'Les oiseaux descendent de dinosaures : ce sont des dinosaures aviens.'},
                {'type': 'explique', 'texte': 'Aujourd’hui, les activités humaines font disparaitre des espèces à un rythme très rapide.'},
            ]),
        ],
        a_toi=[
            q('Quand les dinosaures non aviens disparaissent-ils ?', ['il y a environ 66 millions d’années', 'il y a 10 000 ans', 'il y a 2 000 ans'], 'Lors d’une grande crise.'),
            q('Les ammonites sont :', ['des animaux disparus connus par leurs fossiles', 'des plantes actuelles', 'des roches'], 'Elles ont disparu avec les dinosaures.'),
            q('Quels animaux actuels descendent de dinosaures ?', ['les oiseaux', 'les chats', 'les poissons'], 'Ce sont des dinosaures aviens.'),
        ],
        sources=[src(PROG, 'Biodiversité actuelle et passée', 'Biodiversité actuelle et passée')]),

    'ST-C3-6E-ALIM-01': dict(duree=7, essentiel=
        'Des microorganismes transforment les aliments : levures pour le pain, bactéries pour le yaourt et le fromage.\n'
        'D’autres les abiment. Pour conserver, on limite leur développement.\n'
        'Froid, chaleur, salage, séchage et conserves empêchent les microorganismes de se multiplier.',
        parties=[
            ('Des microorganismes utiles', [
                vocabulaire(3, 'Microorganisme'),
                {'type': 'tableau', 'titre': 'Fabrication', 'colonnes': ['Aliment', 'Microorganisme', 'Rôle'], 'lignes': [
                    ['pain', 'levure', 'fait lever la pâte'], ['yaourt', 'bactéries lactiques', 'transforment le lait'], ['fromage', 'bactéries, moisissures', 'donnent goût et texture']]},
                bq('Qu’est-ce qui fait lever la pâte à pain ?', ['la levure', 'le sel', 'le four'], 'Elle produit un gaz qui gonfle la pâte.'),
            ]),
            ('Conserver les aliments', [
                {'type': 'tableau', 'titre': 'Techniques de conservation', 'colonnes': ['Technique', 'Principe'], 'lignes': [
                    ['réfrigérateur, congélateur', 'le froid ralentit ou stoppe les microorganismes'], ['stérilisation, pasteurisation', 'la chaleur les détruit'], ['séchage, salage', 'l’eau manque, ils ne se développent plus']]},
                {'type': 'piege', 'erreur': 'On croit que le congélateur tue tous les microorganismes.', 'correction': 'Il les endort. Une fois décongelé, l’aliment doit être consommé vite.'},
            ]),
        ],
        a_toi=[
            q('Le yaourt est fabriqué grâce à :', ['des bactéries', 'des virus', 'du sucre seul'], 'Les bactéries lactiques transforment le lait.'),
            q('Le saucisson sec se conserve grâce :', ['au séchage et au sel', 'au congélateur', 'à la lumière'], 'Sans eau, les microorganismes ne se développent pas.'),
            q('Pourquoi mettre le lait ouvert au réfrigérateur ?', ['le froid ralentit les microorganismes', 'pour qu’il soit sucré', 'pour qu’il change de couleur'], 'Il se conserve plus longtemps.'),
        ],
        sources=[src(PROG, 'Production et conservation des aliments', 'Production et conservation')]),

    'ST-C3-6E-VIV-03': dict(duree=7, essentiel=
        'La pollinisation est le transport du pollen d’une fleur à une autre de la même espèce.\n'
        'Le pollen est transporté par les insectes ou par le vent.\n'
        'Après la fécondation, la fleur se transforme en fruit qui contient des graines.',
        parties=[
            ('De la fleur au fruit', [
                vocabulaire(3, 'Pollinisation', 'Fécondation'),
                {'type': 'observe', 'consigne': 'Suis une fleur de cerisier au printemps.', 'exemples': [
                    'Une abeille transporte le pollen d’une fleur à l’autre.', 'Les pétales tombent.', 'Le pistil grossit et devient une cerise, avec un noyau qui contient la graine.']},
                bq('Que devient la fleur après la fécondation ?', ['un fruit', 'une racine', 'une feuille'], 'Le fruit protège les graines.'),
            ]),
            ('Le rôle des pollinisateurs', [
                {'type': 'explique', 'texte': 'Les abeilles, bourdons et papillons sont des pollinisateurs. Sans eux, beaucoup de plantes cultivées donneraient peu de fruits.'},
                {'type': 'piege', 'erreur': 'On croit que l’abeille fabrique le fruit.', 'correction': 'Elle transporte le pollen. C’est la plante qui forme le fruit après la fécondation.'},
                bq('Quel autre agent transporte le pollen ?', ['le vent', 'la lune', 'le sol'], 'Le blé et les graminées sont pollinisés par le vent.'),
            ]),
        ],
        a_toi=[
            q('Qu’est-ce que la pollinisation ?', ['le transport du pollen', 'la chute des feuilles', 'la germination'], 'D’une fleur à une autre.'),
            q('Où se trouvent les graines ?', ['dans le fruit', 'dans les racines', 'dans les pétales'], 'Le fruit vient de la fleur.'),
            q('Pourquoi protéger les abeilles ?', ['elles pollinisent les cultures', 'elles mangent les fruits', 'elles chassent les oiseaux'], 'Elles permettent la formation des fruits.'),
        ],
        sources=[src(PROG, 'pollinisation dans la transformation de la', 'Pollinisation')]),

    'ST-C3-6E-VIE-01': dict(duree=7, essentiel=
        'La vie est possible sur Terre grâce à l’eau liquide, à une atmosphère et à des températures modérées.\n'
        'La Terre est à une bonne distance du Soleil : ni trop chaude, ni trop froide.\n'
        'L’atmosphère contient du dioxygène et nous protège d’une partie des rayons du Soleil.',
        parties=[
            ('Une planète particulière', [
                {'type': 'tableau', 'titre': 'Comparer trois planètes', 'colonnes': ['Planète', 'Eau liquide', 'Température moyenne'], 'lignes': [
                    ['Vénus', 'non', 'environ 460 °C'], ['Terre', 'oui', 'environ 15 °C'], ['Mars', 'non en surface aujourd’hui', 'environ −60 °C']]},
                bq('Pourquoi l’eau n’est-elle pas liquide sur Vénus ?', ['il y fait beaucoup trop chaud', 'il y fait trop froid', 'il n’y a pas de Soleil'], 'Environ 460 °C en moyenne.'),
            ]),
            ('Le rôle de l’atmosphère', [
                {'type': 'explique', 'texte': 'L’atmosphère garde une partie de la chaleur et filtre une partie des rayons ultraviolets grâce à la couche d’ozone.'},
                {'type': 'piege', 'erreur': 'On croit que la vie a besoin seulement d’oxygène.', 'correction': 'Il faut d’abord de l’eau liquide. Certains microorganismes vivent sans dioxygène.'},
            ]),
        ],
        a_toi=[
            q('Quelle condition est indispensable à la vie connue ?', ['l’eau liquide', 'la glace', 'le sable'], 'Toute la vie connue en dépend.'),
            q('La couche d’ozone filtre :', ['une partie des ultraviolets', 'la pluie', 'les sons'], 'Elle protège les êtres vivants.'),
            q('La température moyenne de la Terre est d’environ :', ['15 °C', '100 °C', '−100 °C'], 'Elle permet l’eau liquide.'),
        ],
        sources=[src(PROG, 'Décrire les conditions qui permettent la présence de la vie sur Terre', 'Conditions de la vie')]),

    'ST-C3-6E-CLIM-01': dict(duree=8, essentiel=
        'Les mesures montrent que la température moyenne de la Terre augmente depuis plus d’un siècle.\n'
        'La cause principale : les gaz à effet de serre émis par les activités humaines, surtout le dioxyde de carbone.\n'
        'Conséquences : fonte des glaciers, montée du niveau de la mer, vagues de chaleur.',
        parties=[
            ('L’effet de serre', [
                vocabulaire(3, 'Effet de serre'),
                {'type': 'explique', 'texte': 'Sans effet de serre naturel, la Terre serait très froide. Mais les humains ajoutent des gaz qui retiennent trop de chaleur.'},
                {'type': 'tableau', 'titre': 'D’où viennent les émissions ?', 'colonnes': ['Activité', 'Gaz'], 'lignes': [
                    ['brûler du charbon, du pétrole, du gaz', 'dioxyde de carbone'], ['élevage, rizières', 'méthane'], ['déforestation', 'dioxyde de carbone libéré']]},
                bq('Quel gaz à effet de serre est le plus émis par les humains ?', ['le dioxyde de carbone', 'le dioxygène', 'le diazote'], 'Il vient surtout des énergies fossiles.'),
            ]),
            ('Argumenter avec des données', [
                {'type': 'methode', 'titre': 'Pour construire un argument', 'etapes': [
                    'Lis la source des données : qui a mesuré, quand ?',
                    'Décris la tendance d’un graphique sur longue durée.',
                    'Relie-la à une cause, avec un fait mesuré.',
                    'Ne confonds pas une journée froide et le climat.']},
                {'type': 'piege', 'erreur': '« Il a neigé cet hiver, donc le climat ne se réchauffe pas. »', 'correction': 'La météo décrit un jour. Le climat se mesure sur des dizaines d’années.'},
            ]),
        ],
        a_toi=[
            q('Quelle différence entre météo et climat ?', ['la météo décrit un jour, le climat des dizaines d’années', 'il n’y a aucune différence', 'le climat change chaque heure'], 'Le climat est une moyenne sur longue durée.'),
            q('Quelle conséquence du réchauffement ?', ['la fonte des glaciers', 'la baisse du niveau de la mer', 'plus de glace aux pôles'], 'Les glaciers reculent partout.'),
            q('Quelle action réduit les émissions ?', ['utiliser le vélo plutôt que la voiture', 'laisser les lumières allumées', 'déboiser'], 'Moins d’énergie fossile brûlée.'),
        ],
        sources=[src(PROG, 'Construire une argumentation relative au réchauffement climatique récent', 'Réchauffement climatique')]),

    'ST-C3-6E-ECO-01': dict(duree=7, essentiel=
        'Le peuplement d’un milieu change au fil des saisons.\n'
        'Certains animaux migrent, hibernent ou changent de pelage ; certaines plantes perdent leurs feuilles.\n'
        'Ces changements sont liés à la température, à la lumière et à la nourriture disponible.',
        parties=[
            ('S’adapter aux saisons', [
                {'type': 'tableau', 'titre': 'Comportements en hiver', 'colonnes': ['Être vivant', 'Comportement'], 'lignes': [
                    ['hirondelle', 'migre vers l’Afrique'], ['marmotte, hérisson', 'hibernent'], ['lièvre variable', 'pelage blanc en hiver'], ['chêne', 'perd ses feuilles'], ['plantes annuelles', 'passent l’hiver sous forme de graines']]},
                bq('Que fait l’hirondelle à l’automne ?', ['elle migre vers des pays chauds', 'elle hiberne', 'elle change de plumes'], 'Elle suit les insectes dont elle se nourrit.'),
            ]),
            ('Pourquoi ces changements ?', [
                {'type': 'explique', 'texte': 'En hiver, il fait froid, les jours sont courts et la nourriture manque. Chaque espèce répond à sa façon.'},
                {'type': 'piege', 'erreur': 'On croit que les animaux absents en hiver sont morts.', 'correction': 'Beaucoup ont migré, se cachent ou hibernent.'},
            ]),
        ],
        a_toi=[
            q('Un animal qui hiberne :', ['dort et ralentit son corps tout l’hiver', 'part à l’étranger', 'change de couleur'], 'Comme la marmotte.'),
            q('Pourquoi beaucoup d’arbres perdent-ils leurs feuilles ?', ['pour limiter les pertes d’eau en hiver', 'parce qu’ils meurent', 'pour faire de la place'], 'Ils entrent en vie ralentie.'),
            q('Le peuplement d’un milieu en hiver est :', ['différent de celui de l’été', 'identique toute l’année', 'toujours vide'], 'Il varie avec les saisons.'),
        ],
        sources=[src(PROG, 'Suivre les changements de peuplement au cours des saisons', 'Saisons et peuplement')]),

    'ST-C3-6E-VEG-01': dict(duree=8, essentiel=
        'Les végétaux verts fabriquent leur propre matière : ce sont des producteurs primaires.\n'
        'Ils ont besoin de lumière, d’eau, de sels minéraux et de dioxyde de carbone.\n'
        'Ils sont à la base des chaines alimentaires.',
        parties=[
            ('Les besoins des plantes', [
                {'type': 'observe', 'consigne': 'Expérience : trois pots de haricots.', 'exemples': [
                    'Pot 1 : lumière et eau. Le haricot grandit bien.', 'Pot 2 : sans lumière. Il jaunit et s’affaiblit.', 'Pot 3 : sans eau. Il fane.']},
                {'type': 'methode', 'titre': 'Pour tester un besoin', 'etapes': [
                    'Ne change qu’un seul facteur à la fois.',
                    'Garde un pot témoin dans les bonnes conditions.',
                    'Compare les résultats après quelques jours.']},
                bq('Pourquoi garde-t-on un pot témoin ?', ['pour comparer', 'pour décorer', 'pour arroser deux fois'], 'Il montre ce qui se passe dans les bonnes conditions.'),
            ]),
            ('À la base des chaines alimentaires', [
                {'type': 'explique', 'texte': 'Les feuilles captent la lumière et le dioxyde de carbone de l’air. Les racines puisent l’eau et les sels minéraux du sol.'},
                {'type': 'tableau', 'titre': 'Une chaine alimentaire', 'colonnes': ['Maillon', 'Exemple'], 'lignes': [['producteur', 'herbe'], ['consommateur 1', 'lapin'], ['consommateur 2', 'renard']]},
                {'type': 'piege', 'erreur': 'On croit que la plante mange la terre.', 'correction': 'Elle prend dans le sol seulement de l’eau et des sels minéraux. Sa matière vient surtout du dioxyde de carbone de l’air.'},
            ]),
        ],
        a_toi=[
            q('Quel gaz de l’air la plante utilise-t-elle pour produire sa matière ?', ['le dioxyde de carbone', 'le diazote', 'l’hélium'], 'Grâce à la lumière.'),
            q('Par où la plante puise-t-elle l’eau ?', ['par les racines', 'par les fleurs', 'par les fruits'], 'Avec les sels minéraux du sol.'),
            q('Au début d’une chaine alimentaire, on trouve :', ['un végétal', 'un carnivore', 'un décomposeur'], 'C’est le producteur.'),
        ],
        sources=[src(PROG, 'production primaire', 'Production primaire')]),

    'ST-C3-6E-DECOMP-01': dict(duree=7, essentiel=
        'Après leur mort, les êtres vivants sont décomposés par des êtres vivants du sol : vers de terre, champignons, bactéries.\n'
        'La matière est transformée en éléments minéraux.\n'
        'Les plantes réutilisent ces éléments : la matière circule en cycle.',
        parties=[
            ('Les décomposeurs', [
                vocabulaire(3, 'Décomposeur'),
                {'type': 'observe', 'consigne': 'Dans la litière d’une forêt.', 'exemples': [
                    'En surface, des feuilles entières.', 'Plus bas, des feuilles trouées et grignotées.', 'Encore plus bas, de l’humus sombre.']},
                bq('Quel être vivant aide à décomposer les feuilles mortes ?', ['le ver de terre', 'le renard', 'le chêne'], 'Il mange et brasse la litière.'),
            ]),
            ('Le cycle de la matière', [
                {'type': 'tableau', 'titre': 'Un cycle', 'colonnes': ['Étape', 'Ce qui se passe'], 'lignes': [
                    ['1', 'la plante produit de la matière'], ['2', 'des animaux la mangent'], ['3', 'à leur mort, les décomposeurs transforment la matière'], ['4', 'les sels minéraux retournent au sol et nourrissent la plante']]},
                {'type': 'piege', 'erreur': 'On croit que les feuilles mortes disparaissent toutes seules.', 'correction': 'Ce sont des êtres vivants du sol qui les transforment.'},
                {'type': 'explique', 'texte': 'Le compost utilise ce cycle : les restes de cuisine deviennent un engrais naturel.'},
            ]),
        ],
        a_toi=[
            q('L’humus est :', ['de la matière décomposée du sol', 'une roche', 'un insecte'], 'Il est riche en éléments minéraux.'),
            q('Les champignons du sol sont des :', ['décomposeurs', 'producteurs', 'prédateurs'], 'Ils transforment la matière morte.'),
            q('Pourquoi faire un compost ?', ['pour recycler les déchets en engrais', 'pour attirer les loups', 'pour polluer'], 'La matière retourne au sol.'),
        ],
        sources=[src(PROG, 'décomposée après leur mort (exemple du sol)', 'Décomposition')]),

    'ST-C3-6E-REPRO-01': dict(duree=8, essentiel=
        'Chez l’être humain, la fécondation est interne : elle a lieu dans le corps de la femme.\n'
        'Un ovule et un spermatozoïde s’unissent pour former une cellule-œuf.\n'
        'L’embryon se développe dans l’utérus pendant environ neuf mois, nourri par le placenta.',
        parties=[
            ('Les cellules reproductrices', [
                {'type': 'tableau', 'titre': 'Organes et cellules', 'colonnes': ['Comparer', 'Femme', 'Homme'], 'lignes': [
                    ['organes producteurs', 'ovaires', 'testicules'], ['cellules reproductrices', 'ovules', 'spermatozoïdes']]},
                vocabulaire(3, 'Fécondation'),
                bq('Où sont produits les ovules ?', ['dans les ovaires', 'dans l’utérus', 'dans le cœur'], 'Les ovaires produisent les ovules.'),
            ]),
            ('Le développement de l’embryon', [
                {'type': 'explique', 'texte': 'La cellule-œuf se divise et s’installe dans l’utérus. Le placenta et le cordon ombilical apportent nourriture et dioxygène, et évacuent les déchets.'},
                {'type': 'piege', 'erreur': 'On croit que le bébé respire de l’air dans l’utérus.', 'correction': 'Il reçoit le dioxygène du sang de sa mère par le placenta.'},
                {'type': 'explique', 'texte': 'L’être humain est **vivipare** : le petit se développe dans le corps de la mère et nait vivant.'},
            ]),
        ],
        a_toi=[
            q('Où se développe l’embryon ?', ['dans l’utérus', 'dans l’estomac', 'dans un œuf pondu'], 'L’être humain est vivipare.'),
            q('Que forme l’union d’un ovule et d’un spermatozoïde ?', ['une cellule-œuf', 'un placenta', 'un ovaire'], 'C’est la fécondation.'),
            q('Combien de temps dure environ une grossesse ?', ['9 mois', '3 mois', '18 mois'], 'Environ 9 mois.'),
        ],
        sources=[src(PROG, 'fécondation interne et le développement vivipare', 'Reproduction humaine')]),

    'ST-C3-6E-RESS-01': dict(duree=7, essentiel=
        'Les humains exploitent des ressources : eau, sols, forêts, poissons, minerais.\n'
        'Une exploitation raisonnée prélève sans épuiser et laisse la ressource se renouveler.\n'
        'Des aménagements favorisent la biodiversité : haies, mares, prairies fleuries, passages pour la faune.',
        parties=[
            ('Prélever sans épuiser', [
                {'type': 'tableau', 'titre': 'Exemples', 'colonnes': ['Ressource', 'Surexploitation', 'Exploitation raisonnée'], 'lignes': [
                    ['poissons', 'pêche trop intensive, stocks effondrés', 'quotas, tailles minimales'], ['forêts', 'coupes rases sans replanter', 'gestion durable, replantation'], ['eau', 'gaspillage, nappes vidées', 'irrigation économe, récupération de pluie']]},
                bq('Pourquoi fixer des quotas de pêche ?', ['pour laisser les poissons se reproduire', 'pour vendre plus cher', 'pour polluer moins les bateaux'], 'La ressource se renouvelle.'),
            ]),
            ('Aménager pour la biodiversité', [
                {'type': 'methode', 'titre': 'Pour concevoir un aménagement', 'etapes': [
                    'Observe le lieu : quelles espèces, quels manques ?',
                    'Choisis un aménagement : haie, mare, nichoir, hôtel à insectes.',
                    'Prévois son entretien et le suivi des espèces.']},
                {'type': 'piege', 'erreur': 'On croit qu’un hôtel à insectes suffit à protéger la biodiversité.', 'correction': 'Il faut aussi des plantes variées, sans pesticides, et des milieux reliés entre eux.'},
            ]),
        ],
        a_toi=[
            q('Une haie favorise la biodiversité car :', ['elle abrite oiseaux et insectes', 'elle bloque la pluie', 'elle chasse les animaux'], 'C’est un refuge et un couloir.'),
            q('Une exploitation raisonnée :', ['préserve la ressource pour l’avenir', 'prélève tout le plus vite possible', 'interdit toute exploitation'], 'On prélève sans épuiser.'),
            q('Quelle action économise l’eau ?', ['récupérer l’eau de pluie', 'laisser couler le robinet', 'arroser à midi en été'], 'L’eau de pluie sert à arroser.'),
        ],
        sources=[src(PROG, 'Justifier la nécessité d’une exploitation raisonnée des ressources', 'Exploitation raisonnée')]),
}

ecrire(COURS)
