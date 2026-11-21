"""Lot de cours : Questionner le monde, CE2. Écrit les cours en brouillon (auteur ia).

    python3 scripts/cours/lot-ce2-questionner-le-monde.py
    python3 scripts/cours/pages.py content/cours/QM-C2-CE2-*.json

Cycle 2 : phrases de 12 mots au plus, bloquant. Le CE2 approfondit le CE1 : l'état gazeux,
les milieux lointains, les grandes périodes historiques, l'organisation de la ville.
"""
from commun import bq, ecrire, q, src

BO = 'bo31-2020-cycles-2-3-4'

COURS = {
    'QM-C2-CE2-MAT-01': dict(duree=7, essentiel=
        'La matière existe sous trois états : solide, liquide ou gazeux.\n'
        'L’air est un gaz. On ne le voit pas, mais il existe.\n'
        'L’eau chauffée devient vapeur. La vapeur refroidie redevient de l’eau.',
        parties=[
            ('Trois états', [
                {'type': 'tableau', 'titre': 'Les trois états', 'colonnes': ['État', 'Sa forme', 'Exemples'], 'lignes': [
                    ['solide', 'il garde sa forme', 'caillou, glaçon'],
                    ['liquide', 'il prend la forme du récipient', 'eau, lait'],
                    ['gazeux', 'il occupe tout l’espace', 'air, vapeur d’eau']]},
                bq('Le lait dans un verre est :', ['liquide', 'solide', 'gazeux'], 'Il prend la forme du verre.'),
            ]),
            ('L’air existe', [
                {'type': 'observe', 'consigne': 'Trois expériences avec de l’air.', 'exemples': [
                    'Je gonfle un ballon : l’air le remplit.',
                    'Je plonge un verre retourné dans l’eau : l’eau n’y entre pas.',
                    'Je bouche une seringue et j’appuie : l’air se laisse serrer.']},
                {'type': 'piege', 'erreur': 'On croit qu’un verre vide ne contient rien.', 'correction': 'Il est plein d’air. L’air prend de la place.'},
                bq('Pourquoi l’eau n’entre pas dans le verre retourné ?', ['il est plein d’air', 'il est trop petit', 'l’eau est trop froide'], 'L’air occupe la place.'),
            ]),
            ('L’eau change d’état', [
                {'type': 'explique', 'texte': 'L’eau bout à 100 °C : elle devient vapeur. Sur une vitre froide, la vapeur redevient de l’eau. C’est la condensation.'},
                bq('Les gouttes sur la vitre de la salle de bains viennent :', ['de la vapeur d’eau', 'du savon', 'de la vitre'], 'La vapeur touche la vitre froide et redevient liquide.'),
            ]),
        ],
        a_toi=[
            q('L’air est :', ['un gaz', 'un liquide', 'un solide'], 'Il occupe tout l’espace.'),
            q('À quelle température l’eau bout-elle ?', ['100 °C', '0 °C', '37 °C'], 'Elle devient alors vapeur.'),
            q('Quand la vapeur refroidit, elle devient :', ['de l’eau liquide', 'de l’air', 'du sable'], 'C’est la condensation.'),
        ],
        sources=[src(BO, 'Tout ce qui est lié à l’état gazeux est abordé en CE2.', 'L’air et l’état gazeux au CE2')]),

    'QM-C2-CE2-VIV-01': dict(duree=6, essentiel=
        'Un être vivant nait, grandit, se reproduit et meurt.\n'
        'C’est son cycle de vie.\n'
        'Certains animaux changent de forme en grandissant : c’est la métamorphose.',
        parties=[
            ('Le cycle du papillon', [
                {'type': 'tableau', 'titre': 'De l’œuf au papillon', 'colonnes': ['Étape', 'Ce qui se passe'], 'lignes': [
                    ['œuf', 'le papillon pond sur une feuille'],
                    ['chenille', 'elle mange et grossit'],
                    ['chrysalide', 'elle se transforme à l’abri'],
                    ['papillon', 'il vole et pond à son tour']]},
                {'type': 'piege', 'erreur': 'On croit que la chenille est un autre animal.', 'correction': 'La chenille est le papillon jeune. Il change de forme.'},
                bq('Que devient la chrysalide ?', ['un papillon', 'une chenille', 'un œuf'], 'C’est la dernière étape de la métamorphose.'),
            ]),
            ('Le cycle d’une plante', [
                {'type': 'observe', 'consigne': 'Le cycle du haricot.', 'exemples': [
                    'La graine germe dans la terre humide.',
                    'La plante grandit et fait des fleurs.',
                    'Les fleurs donnent des fruits pleins de graines.']},
                bq('Une fleur donne :', ['un fruit avec des graines', 'une chenille', 'des racines'], 'Les graines feront de nouvelles plantes.'),
            ]),
        ],
        a_toi=[
            q('Dans quel ordre ?', ['œuf, chenille, chrysalide, papillon', 'chenille, œuf, papillon, chrysalide', 'papillon, chrysalide, œuf, chenille'], 'Le papillon pond, et le cycle recommence.'),
            q('Quand une graine se met à pousser, on dit qu’elle :', ['germe', 'fond', 'vole'], 'Une petite racine et une tige sortent.'),
            q('Changer de forme en grandissant, c’est :', ['la métamorphose', 'la condensation', 'la germination'], 'Comme la chenille qui devient papillon.'),
        ],
        sources=[src(BO, 'Le cycle de vie des êtres vivants.', 'Cycle de vie')]),

    'QM-C2-CE2-VIV-02': dict(duree=6, essentiel=
        'Une plante a besoin d’eau, de lumière et de sels minéraux.\n'
        'Ses racines puisent l’eau et les sels minéraux dans le sol.\n'
        'Sans eau, elle fane. Sans lumière, elle jaunit.',
        parties=[
            ('Une expérience', [
                {'type': 'observe', 'consigne': 'Trois pots de haricots, pendant deux semaines.', 'exemples': [
                    'Pot 1, au soleil et arrosé : la plante pousse bien.',
                    'Pot 2, au soleil sans eau : la plante fane.',
                    'Pot 3, dans un placard et arrosé : la plante jaunit.']},
                {'type': 'methode', 'titre': 'Pour réussir l’expérience', 'etapes': [
                    'Change une seule chose à la fois.',
                    'Garde tout le reste pareil.',
                    'Observe et note chaque jour.']},
                bq('Pourquoi la plante du placard jaunit-elle ?', ['elle manque de lumière', 'elle manque d’eau', 'elle a trop chaud'], 'Seule la lumière change entre les pots 1 et 3.'),
            ]),
            ('Dans le sol', [
                {'type': 'explique', 'texte': 'Les racines tiennent la plante. Elles puisent l’eau et les sels minéraux du sol.'},
                {'type': 'piege', 'erreur': 'On croit que la plante mange la terre.', 'correction': 'Elle prend seulement l’eau et les sels minéraux. La terre reste.'},
            ]),
        ],
        a_toi=[
            q('Par où la plante boit-elle ?', ['par ses racines', 'par ses fleurs', 'par ses fruits'], 'Les racines sont dans le sol.'),
            q('Une plante privée de lumière :', ['jaunit', 'fleurit plus', 'devient bleue'], 'Elle a besoin de lumière pour vivre.'),
            q('De quoi une plante a-t-elle besoin ?', ['d’eau, de lumière, de sels minéraux', 'de sucre et de lait', 'seulement de terre'], 'Ce sont ses besoins vitaux.'),
        ],
        sources=[src(BO, 'Quelques besoins vitaux des végétaux.', 'Besoins des végétaux')]),

    'QM-C2-CE2-CORPS-01': dict(duree=6, essentiel=
        'Quand je grandis, ma taille, ma masse et ma pointure augmentent.\n'
        'Vers 6 ans, les dents de lait tombent.\n'
        'Des dents définitives poussent : on les garde toute sa vie.',
        parties=[
            ('Mesurer sa croissance', [
                {'type': 'tableau', 'titre': 'Les mesures', 'colonnes': ['Je mesure', 'Avec', 'Unité'], 'lignes': [
                    ['ma taille', 'une toise', 'centimètre'],
                    ['ma masse', 'une balance', 'kilogramme'],
                    ['mon pied', 'un mesureur de pointure', 'pointure']]},
                bq('Pour mesurer sa taille, on utilise :', ['une toise', 'une balance', 'un thermomètre'], 'La toise se lit en centimètres.'),
            ]),
            ('Les dents', [
                {'type': 'explique', 'texte': 'Un enfant a 20 dents de lait. Un adulte a 32 dents définitives.'},
                {'type': 'piege', 'erreur': 'On croit que chaque dent définitive remplace une dent de lait.', 'correction': 'Certaines molaires poussent au fond, sans remplacer de dent.'},
                bq('Combien de dents a un adulte ?', ['32', '20', '10'], 'Ce sont les dents définitives.'),
            ]),
        ],
        a_toi=[
            q('Combien de dents de lait a un enfant ?', ['20', '32', '12'], 'Elles tombent peu à peu.'),
            q('Ma masse se mesure en :', ['kilogrammes', 'centimètres', 'litres'], 'On se pèse sur une balance.'),
            q('Une dent définitive :', ['reste toute la vie', 'tombe à 10 ans', 'repousse si on la perd'], 'Il faut en prendre soin.'),
        ],
        sources=[src(BO, 'Modifications de la dentition.', 'Croissance et dentition')]),

    'QM-C2-CE2-OBJ-01': dict(duree=7, essentiel=
        'Un conducteur laisse passer le courant : les métaux.\n'
        'Un isolant ne le laisse pas passer : plastique, bois, verre.\n'
        'L’interrupteur ouvre ou ferme le circuit. Le courant de la prise est dangereux.',
        parties=[
            ('Fabriquer un testeur', [
                {'type': 'methode', 'titre': 'Tester un objet', 'etapes': [
                    'Fais un circuit avec une pile, une lampe et trois fils.',
                    'Laisse deux fils libres, sans les relier.',
                    'Pose l’objet entre les deux fils libres.',
                    'La lampe brille : l’objet est conducteur.']},
                {'type': 'tableau', 'titre': 'Résultats', 'colonnes': ['Conducteur', 'Isolant'], 'lignes': [
                    ['cuillère en métal', 'cuillère en bois'], ['clé', 'bouchon'], ['pièce de monnaie', 'verre']]},
                bq('La lampe reste éteinte avec un bouchon. Le bouchon est :', ['isolant', 'conducteur', 'cassé'], 'Le courant ne le traverse pas.'),
            ]),
            ('Pile ou prise ?', [
                {'type': 'tableau', 'titre': 'D’où vient le courant ?', 'colonnes': ['Avec une pile', 'Avec la prise'], 'lignes': [
                    ['lampe de poche', 'grille-pain'], ['télécommande', 'lave-linge']]},
                {'type': 'explique', 'texte': 'Le courant d’une petite pile ne fait pas de mal. Celui de la prise peut tuer.'},
                {'type': 'piege', 'erreur': 'On croit que l’eau ne conduit pas le courant.', 'correction': 'L’eau du robinet le conduit. Jamais d’appareil branché près du bain.'},
            ]),
        ],
        a_toi=[
            q('Une clé en métal est :', ['conductrice', 'isolante', 'vivante'], 'Les métaux conduisent le courant.'),
            q('L’interrupteur sert à :', ['ouvrir ou fermer le circuit', 'recharger la pile', 'changer de couleur'], 'Circuit ouvert, la lampe s’éteint.'),
            q('Quel courant est dangereux ?', ['celui de la prise', 'celui d’une petite pile', 'aucun'], 'Il ne faut jamais toucher une prise.'),
        ],
        sources=[src(BO, 'Exemples de bon conducteurs et d’isolants.', 'Conducteurs, isolants, sécurité')]),

    'QM-C2-CE2-NUM-01': dict(duree=5, essentiel=
        'Un ordinateur : écran, clavier, souris et unité centrale.\n'
        'Le clavier et la souris envoient des informations à l’ordinateur.\n'
        'L’écran les affiche. L’unité centrale calcule et garde les fichiers.',
        parties=[
            ('Les parties de l’ordinateur', [
                {'type': 'tableau', 'titre': 'À quoi ça sert ?', 'colonnes': ['Élément', 'Son rôle'], 'lignes': [
                    ['clavier', 'écrire des lettres et des chiffres'],
                    ['souris', 'montrer et cliquer'],
                    ['écran', 'afficher'],
                    ['unité centrale', 'calculer et enregistrer'],
                    ['imprimante', 'mettre sur papier']]},
                bq('Pour écrire un texte, j’utilise :', ['le clavier', 'l’écran', 'l’imprimante'], 'Chaque touche donne une lettre.'),
            ]),
            ('Entrer et sortir', [
                {'type': 'explique', 'texte': 'Le clavier et la souris font entrer les informations. L’écran et l’imprimante les font sortir.'},
                {'type': 'piege', 'erreur': 'On croit que l’écran est l’ordinateur.', 'correction': 'L’écran affiche seulement. C’est l’unité centrale qui calcule.'},
                bq('L’imprimante fait :', ['sortir les informations', 'entrer les informations', 'calculer'], 'Elle met le travail sur papier.'),
            ]),
        ],
        a_toi=[
            q('Où l’ordinateur garde-t-il les fichiers ?', ['dans l’unité centrale', 'dans la souris', 'dans l’écran'], 'Elle enregistre le travail.'),
            q('La souris sert à :', ['montrer et cliquer', 'imprimer', 'afficher'], 'Elle déplace la flèche à l’écran.'),
            q('Que fais-tu avant d’éteindre ?', ['j’enregistre mon travail', 'je débranche l’écran', 'rien'], 'Sinon, le travail peut être perdu.'),
        ],
        sources=[src(BO, 'Décrire l’architecture simple d’un dispositif informatique.', 'Matériel informatique')]),

    'QM-C2-CE2-ESP-01': dict(duree=6, essentiel=
        'Le Soleil est une étoile. La Terre est une planète.\n'
        'En un jour, la Terre fait un tour sur elle-même.\n'
        'Elle tourne autour du Soleil en un an. La Lune tourne autour de la Terre.',
        parties=[
            ('Le jour et la nuit', [
                {'type': 'observe', 'consigne': 'Éclaire un globe avec une lampe, dans le noir.', 'exemples': [
                    'Un côté du globe est éclairé : il y fait jour.',
                    'L’autre côté est dans l’ombre : il y fait nuit.',
                    'Fais tourner le globe : le jour et la nuit avancent.']},
                {'type': 'piege', 'erreur': 'On croit que le Soleil tourne autour de la Terre.', 'correction': 'C’est la Terre qui tourne, sur elle-même et autour du Soleil.'},
                bq('Pourquoi y a-t-il le jour et la nuit ?', ['la Terre tourne sur elle-même', 'le Soleil s’éteint', 'la Lune cache le Soleil'], 'Un côté est éclairé, puis l’autre.'),
            ]),
            ('Le Soleil, la Terre, la Lune', [
                {'type': 'tableau', 'titre': 'Qui tourne autour de qui ?', 'colonnes': ['Astre', 'Il tourne autour', 'En combien de temps ?'], 'lignes': [
                    ['la Terre', 'du Soleil', 'un an'], ['la Lune', 'de la Terre', 'environ un mois']]},
                {'type': 'explique', 'texte': 'La Lune ne fait pas de lumière. Le Soleil l’éclaire.'},
            ]),
        ],
        a_toi=[
            q('Le Soleil est :', ['une étoile', 'une planète', 'un satellite'], 'Il fait sa propre lumière.'),
            q('Combien de temps la Terre met-elle pour tourner autour du Soleil ?', ['un an', 'un jour', 'une heure'], 'Environ 365 jours.'),
            q('Autour de quoi tourne la Lune ?', ['autour de la Terre', 'autour de Mars', 'elle ne bouge pas'], 'Elle met environ un mois.'),
        ],
        sources=[src(BO, 'Savoir que la Terre fait partie d’un univers très vaste composé de différents types d’astres.', 'La Terre et les astres')]),

    'QM-C2-CE2-GEO-01': dict(duree=6, essentiel=
        'Sur la Terre, il existe des milieux très différents.\n'
        'Le désert est très sec. La banquise est très froide.\n'
        'La forêt tropicale est chaude et humide. En montagne, il fait plus froid.',
        parties=[
            ('Quatre milieux', [
                {'type': 'tableau', 'titre': 'Des milieux du monde', 'colonnes': ['Milieu', 'Climat', 'Exemple'], 'lignes': [
                    ['désert', 'très peu de pluie', 'le Sahara'],
                    ['banquise', 'très froid, eau gelée', 'l’Arctique'],
                    ['forêt tropicale', 'chaud, beaucoup de pluie', 'l’Amazonie'],
                    ['montagne', 'plus froid en altitude', 'les Alpes']]},
                bq('Dans quel milieu pleut-il très peu ?', ['le désert', 'la forêt tropicale', 'la banquise'], 'C’est ce qui fait un désert.'),
            ]),
            ('Vivre dans ces milieux', [
                {'type': 'explique', 'texte': 'Les habitants adaptent leur maison et leurs vêtements au climat.'},
                {'type': 'piege', 'erreur': 'On croit qu’un désert est toujours chaud.', 'correction': 'Un désert est un lieu où il pleut très peu. Il peut être froid.'},
                bq('Où trouve-t-on beaucoup d’arbres et de pluie ?', ['dans la forêt tropicale', 'dans le désert', 'sur la banquise'], 'Comme en Amazonie.'),
            ]),
        ],
        a_toi=[
            q('La banquise, c’est :', ['de l’eau de mer gelée', 'du sable', 'une forêt'], 'On la trouve près des pôles.'),
            q('Plus on monte en montagne, plus il fait :', ['froid', 'chaud', 'humide'], 'C’est pourquoi les sommets sont enneigés.'),
            q('Le Sahara est :', ['un désert', 'une banquise', 'une forêt'], 'Il est en Afrique.'),
        ],
        sources=[src(BO, 'Au CE2, on commence l’étude de l’espace géographique terrestre à travers quelques milieux géographiques caractéristiques.', 'Milieux géographiques')]),

    'QM-C2-CE2-TPS-01': dict(duree=7, essentiel=
        'L’histoire se découpe en grandes périodes.\n'
        'Préhistoire, Antiquité, Moyen Âge, Temps modernes, époque contemporaine.\n'
        'Une frise chronologique les place dans l’ordre.',
        parties=[
            ('La frise des périodes', [
                {'type': 'frise', 'reperes': [
                    {'annee': -3300, 'date': 'vers 3300 av. J.-C.', 'evenement': 'L’écriture est inventée. La Préhistoire se termine.'},
                    {'annee': 476, 'date': '476', 'evenement': 'Fin de l’Empire romain d’Occident. Le Moyen Âge commence.'},
                    {'annee': 1492, 'date': '1492', 'evenement': 'Christophe Colomb arrive en Amérique. Les Temps modernes commencent.'},
                    {'annee': 1789, 'date': '1789', 'evenement': 'La Révolution française. L’époque contemporaine commence.'}]},
                bq('Quelle période vient juste après l’Antiquité ?', ['le Moyen Âge', 'la Préhistoire', 'les Temps modernes'], 'Elle commence en 476.'),
            ]),
            ('Des personnages', [
                {'type': 'tableau', 'titre': 'Qui a vécu quand ?', 'colonnes': ['Période', 'Personnage'], 'lignes': [
                    ['Antiquité', 'Vercingétorix, chef gaulois'],
                    ['Moyen Âge', 'Charlemagne, empereur'],
                    ['Temps modernes', 'Louis XIV, roi de France'],
                    ['époque contemporaine', 'Marie Curie, savante']]},
                {'type': 'piege', 'erreur': 'Avant Jésus-Christ, on croit que 3000 est plus récent que 500.', 'correction': 'Avant J.-C., plus le nombre est grand, plus c’est ancien.'},
            ]),
        ],
        a_toi=[
            q('Quelle invention termine la Préhistoire ?', ['l’écriture', 'la roue', 'la voiture'], 'Vers 3300 av. J.-C.'),
            q('Dans quelle période vivons-nous ?', ['l’époque contemporaine', 'le Moyen Âge', 'l’Antiquité'], 'Elle commence en 1789.'),
            q('Charlemagne a vécu :', ['au Moyen Âge', 'pendant la Préhistoire', 'à l’époque contemporaine'], 'Il est devenu empereur en 800.'),
        ],
        sources=[src(BO, 'Le repérage des grandes périodes historiques se travaille au CE2.', 'Grandes périodes')]),

    'QM-C2-CE2-ORG-01': dict(duree=6, essentiel=
        'Une ville ou un village a des espaces pour chaque activité.\n'
        'On y habite, on y travaille, on y achète, on s’y soigne.\n'
        'Une ville compte plus d’habitants et de bâtiments qu’un village.',
        parties=[
            ('Les espaces et leurs fonctions', [
                {'type': 'tableau', 'titre': 'À quoi sert ce lieu ?', 'colonnes': ['Activité', 'Lieux'], 'lignes': [
                    ['habiter', 'maisons, immeubles'],
                    ['travailler', 'usines, bureaux, champs'],
                    ['acheter', 'magasins, marché'],
                    ['se soigner', 'hôpital, pharmacie'],
                    ['apprendre', 'école, collège'],
                    ['se détendre', 'parc, stade, piscine'],
                    ['décider pour la commune', 'mairie']]},
                bq('Où se réunit le conseil municipal ?', ['à la mairie', 'à l’usine', 'au stade'], 'Le maire y travaille.'),
            ]),
            ('Village ou ville ?', [
                {'type': 'tableau', 'titre': 'Comparer', 'colonnes': ['Village', 'Ville'], 'lignes': [
                    ['peu d’habitants', 'beaucoup d’habitants'], ['surtout des maisons', 'des maisons et des immeubles'], ['des champs autour', 'des bus, parfois un métro']]},
                {'type': 'piege', 'erreur': 'On confond quartier et ville.', 'correction': 'Une ville est faite de plusieurs quartiers.'},
            ]),
        ],
        a_toi=[
            q('Dans une usine, on :', ['travaille', 'se soigne', 'apprend à lire'], 'On y fabrique des objets.'),
            q('Où trouve-t-on des immeubles ?', ['surtout en ville', 'surtout dans les champs', 'sur la banquise'], 'Beaucoup de gens y habitent.'),
            q('Une ville est faite de plusieurs :', ['quartiers', 'villages', 'pays'], 'Chaque quartier a ses rues.'),
        ],
        sources=[src(BO, 'Comprendre qu’un espace est organisé', 'Organisation de l’espace')]),

    'QM-C2-CE2-CART-01': dict(duree=6, essentiel=
        'Une carte a un titre, une légende, une échelle et une orientation.\n'
        'La légende explique les couleurs et les symboles.\n'
        'La flèche indique le nord.',
        parties=[
            ('Les éléments d’une carte', [
                {'type': 'tableau', 'titre': 'Lire une carte', 'colonnes': ['Élément', 'Il dit'], 'lignes': [
                    ['titre', 'de quoi parle la carte'],
                    ['légende', 'ce que veulent dire couleurs et symboles'],
                    ['échelle', 'les vraies distances'],
                    ['orientation', 'où est le nord']]},
                bq('Pour savoir ce que veut dire un symbole, je lis :', ['la légende', 'le titre', 'l’échelle'], 'Elle explique chaque symbole.'),
            ]),
            ('Méthode', [
                {'type': 'methode', 'titre': 'Avant de lire une carte', 'etapes': [
                    'Je lis le titre.',
                    'Je lis la légende.',
                    'Je cherche la flèche du nord.',
                    'Je regarde l’échelle pour les distances.']},
                {'type': 'piege', 'erreur': 'On croit que le nord est toujours en haut.', 'correction': 'Le plus souvent, oui. Mais vérifie toujours la flèche du nord.'},
                bq('Les quatre points cardinaux sont :', ['nord, sud, est, ouest', 'haut, bas, droite, gauche', 'devant, derrière, dessus, dessous'], 'Ils servent à s’orienter.'),
            ]),
        ],
        a_toi=[
            q('L’échelle sert à :', ['connaitre les vraies distances', 'trouver le nord', 'lire le titre'], 'Par exemple, 1 cm pour 1 km.'),
            q('La flèche du nord donne :', ['l’orientation', 'la légende', 'le titre'], 'Elle montre la direction du nord.'),
            q('Que lis-tu en premier ?', ['le titre', 'l’échelle', 'rien'], 'Il dit de quoi parle la carte.'),
        ],
        sources=[src(BO, 'Éléments constitutifs d’une carte : titre, échelle, orientation, légende.', 'Lire une carte')]),

    'QM-C2-CE2-HYG-01': dict(duree=5, essentiel=
        'Bouger chaque jour rend le cœur et les muscles plus forts.\n'
        'Pendant l’effort, le cœur bat vite et on respire vite.\n'
        'Le repos et le sommeil aident le corps à récupérer.',
        parties=[
            ('Pendant l’effort', [
                {'type': 'observe', 'consigne': 'Cours une minute, puis pose la main sur ton cœur.', 'exemples': [
                    'Ton cœur bat plus vite.',
                    'Tu respires plus vite.',
                    'Tu as chaud et tu transpires.']},
                {'type': 'explique', 'texte': 'Pour bouger, les muscles tirent sur les os. Ils ont besoin de plus d’air.'},
                bq('Après une course, mon cœur bat :', ['plus vite', 'moins vite', 'pareil'], 'Il envoie plus de sang aux muscles.'),
            ]),
            ('Bouger et se reposer', [
                {'type': 'methode', 'titre': 'Une journée en forme', 'etapes': [
                    'Bouge au moins une heure : jeux, vélo, sport.',
                    'Fais des pauses quand tu es fatigué.',
                    'Dors assez : un enfant a besoin de longues nuits.']},
                {'type': 'piege', 'erreur': 'On croit que se reposer, c’est être paresseux.', 'correction': 'Le repos fait partie de la santé. Le corps récupère.'},
            ]),
        ],
        a_toi=[
            q('Pendant l’effort, je respire :', ['plus vite', 'moins vite', 'plus du tout'], 'Les muscles ont besoin de plus d’air.'),
            q('Qu’est-ce qui aide le corps à récupérer ?', ['le sommeil', 'les écrans le soir', 'les bonbons'], 'Pendant la nuit, le corps se répare.'),
            q('Pour bouger, les muscles tirent sur :', ['les os', 'les cheveux', 'les dents'], 'Les os forment le squelette.'),
        ],
        sources=[src(BO, 'Effets positifs d’une pratique physique régulière sur l’organisme.', 'Activité physique et santé')]),
}

ecrire(COURS)
