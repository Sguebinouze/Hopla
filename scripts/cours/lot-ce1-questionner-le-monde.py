"""Lot de cours : Questionner le monde, CE1. Écrit les cours en brouillon (auteur ia).

    python3 scripts/cours/lot-ce1-questionner-le-monde.py

Cycle 2 : phrases de 12 mots au plus, bloquant. Les pages des extraits sont retrouvées ensuite.
"""
from commun import bq, ecrire, q, src

BO = 'bo31-2020-cycles-2-3-4'

COURS = {
    'QM-C2-CE1-MAT-01': dict(duree=6, essentiel=
        'L’eau peut être liquide, solide ou gazeuse.\n'
        'Quand il fait très froid, l’eau gèle : elle devient de la glace.\n'
        'Quand la glace chauffe, elle fond : elle redevient liquide.',
        parties=[
            ('Liquide ou solide', [
                {'type': 'observe', 'consigne': 'Mets un glaçon dans une assiette.', 'exemples': [
                    'Au début, le glaçon est dur : c’est de l’eau solide.', 'Peu à peu, il fond.', 'À la fin, il reste une flaque d’eau liquide.']},
                {'type': 'tableau', 'titre': 'Les états de l’eau', 'colonnes': ['État', 'Exemple'], 'lignes': [
                    ['solide', 'glaçon, neige, grêle'], ['liquide', 'pluie, eau du robinet'], ['gazeux', 'vapeur d’eau, invisible']]},
                bq('La neige est de l’eau :', ['solide', 'liquide', 'gazeuse'], 'La neige est faite de petits cristaux de glace.'),
            ]),
            ('Dans la vie de tous les jours', [
                {'type': 'explique', 'texte': 'L’eau gèle quand il fait moins de 0 °C. Au-dessus, la glace fond.'},
                {'type': 'piege', 'erreur': 'On croit que l’eau disparait quand une flaque sèche.', 'correction': 'Elle devient de la vapeur d’eau, invisible, dans l’air.'},
                bq('Que fait un bonhomme de neige au soleil ?', ['il fond', 'il gèle', 'il grandit'], 'La chaleur transforme la neige en eau liquide.'),
            ]),
        ],
        a_toi=[
            q('Dans le congélateur, l’eau devient :', ['de la glace', 'de la vapeur', 'du lait'], 'Le congélateur est très froid.'),
            q('À quelle température l’eau gèle-t-elle ?', ['0 °C', '20 °C', '100 °C'], 'Sous 0 °C, l’eau devient glace.'),
            q('La pluie est de l’eau :', ['liquide', 'solide', 'gazeuse'], 'Elle coule et forme des flaques.'),
        ],
        sources=[src(BO, 'Identifier un changement d’état de l’eau dans un phénomène de la vie quotidienne.', 'Changement d’état de l’eau')]),

    'QM-C2-CE1-VIV-01': dict(duree=7, essentiel=
        'Un être vivant nait, grandit, se nourrit, se reproduit et meurt.\n'
        'Les animaux et les végétaux sont vivants. Un caillou ne l’est pas.\n'
        'De la graine à la plante : c’est un cycle de vie.',
        parties=[
            ('Est-ce vivant ?', [
                {'type': 'tableau', 'titre': 'Trier', 'colonnes': ['Animal', 'Végétal', 'Minéral'], 'lignes': [['chat, abeille', 'arbre, fleur', 'caillou, sable']]},
                {'type': 'methode', 'titre': 'Pour savoir si c’est vivant', 'etapes': [
                    'Est-ce que ça nait ?',
                    'Est-ce que ça grandit et se nourrit ?',
                    'Est-ce que ça se reproduit et meurt ?']},
                bq('Un arbre est-il vivant ?', ['oui', 'non', 'seulement l’été'], 'Il nait d’une graine, grandit et meurt.'),
            ]),
            ('Le cycle de vie', [
                {'type': 'observe', 'consigne': 'Le cycle de vie de la grenouille.', 'exemples': [
                    'La grenouille pond des œufs dans l’eau.', 'Un têtard sort de l’œuf.', 'Le têtard perd sa queue et devient grenouille.']},
                {'type': 'piege', 'erreur': 'On croit qu’une plante n’est pas vivante, car elle ne bouge pas.', 'correction': 'Une plante grandit, se nourrit et fait des graines. Elle est vivante.'},
                bq('Que devient un têtard ?', ['une grenouille', 'un poisson', 'un serpent'], 'C’est une étape du cycle de vie.'),
            ]),
        ],
        a_toi=[
            q('Lequel n’est pas vivant ?', ['un caillou', 'un champignon', 'une fourmi'], 'Un caillou ne nait pas et ne grandit pas.'),
            q('De quoi sort un poussin ?', ['d’un œuf', 'd’une graine', 'd’une fleur'], 'La poule pond des œufs.'),
            q('Que plante-t-on pour avoir une fleur ?', ['une graine', 'un caillou', 'une feuille morte'], 'La graine germe et donne une plante.'),
        ],
        sources=[src(BO, 'Le cycle de vie des êtres vivants.', 'Cycle de vie')]),

    'QM-C2-CE1-VIV-02': dict(duree=6, essentiel=
        'Chaque animal a son régime alimentaire.\n'
        'Herbivore : mange des plantes. Carnivore : mange d’autres animaux. Omnivore : mange de tout.\n'
        'Une chaine alimentaire montre qui mange qui.',
        parties=[
            ('Trois régimes', [
                {'type': 'tableau', 'titre': 'Qui mange quoi ?', 'colonnes': ['Régime', 'Il mange', 'Exemples'], 'lignes': [
                    ['herbivore', 'des plantes', 'lapin, vache'], ['carnivore', 'des animaux', 'loup, chouette'], ['omnivore', 'de tout', 'ours, sanglier, humain']]},
                bq('La vache est :', ['herbivore', 'carnivore', 'omnivore'], 'Elle mange de l’herbe.'),
            ]),
            ('Les chaines alimentaires', [
                {'type': 'observe', 'consigne': 'Lis la chaine de gauche à droite.', 'exemples': [
                    'herbe → lapin → renard', 'Le lapin mange l’herbe.', 'Le renard mange le lapin.']},
                {'type': 'piege', 'erreur': 'On lit la flèche « est mangé par » à l’envers.', 'correction': 'La flèche va de celui qui est mangé vers celui qui mange.'},
                bq('Dans « feuille → chenille → mésange », qui mange la chenille ?', ['la mésange', 'la feuille', 'personne'], 'La flèche va vers la mésange.'),
            ]),
        ],
        a_toi=[
            q('Le loup est :', ['carnivore', 'herbivore', 'omnivore'], 'Il mange d’autres animaux.'),
            q('Un animal qui mange de tout est :', ['omnivore', 'herbivore', 'carnivore'], 'Comme l’ours.'),
            q('Au début d’une chaine alimentaire, on trouve :', ['une plante', 'un loup', 'un aigle'], 'Les plantes nourrissent les herbivores.'),
        ],
        sources=[src(BO, 'Régimes alimentaires de quelques animaux.', 'Régimes alimentaires')]),

    'QM-C2-CE1-SAN-01': dict(duree=6, essentiel=
        'On mange varié : fruits, légumes, féculents, laitages, viande ou poisson.\n'
        'On boit de l’eau. On limite le sucre et le gras.\n'
        'On dort bien, on bouge chaque jour, on se lave les mains.',
        parties=[
            ('Les familles d’aliments', [
                {'type': 'tableau', 'titre': 'Familles d’aliments', 'colonnes': ['Famille', 'Exemples'], 'lignes': [
                    ['fruits et légumes', 'pomme, carotte'], ['féculents', 'pain, pâtes, riz'], ['produits laitiers', 'lait, yaourt, fromage'], ['viande, poisson, œufs', 'poulet, sardine'], ['sucres et graisses', 'bonbons, beurre']]},
                bq('Les pâtes sont des :', ['féculents', 'fruits', 'produits laitiers'], 'Elles donnent de l’énergie.'),
            ]),
            ('Prendre soin de soi', [
                {'type': 'methode', 'titre': 'Une bonne journée', 'etapes': [
                    'Prends un petit déjeuner.',
                    'Bois de l’eau quand tu as soif.',
                    'Bouge au moins une heure.',
                    'Couche-toi tôt pour bien dormir.']},
                {'type': 'piege', 'erreur': 'On croit que le jus de fruit remplace l’eau.', 'correction': 'Il contient beaucoup de sucre. La seule boisson indispensable est l’eau.'},
            ]),
        ],
        a_toi=[
            q('Quelle boisson est indispensable ?', ['l’eau', 'le soda', 'le sirop'], 'Le corps a besoin d’eau chaque jour.'),
            q('Le yaourt est un :', ['produit laitier', 'féculent', 'légume'], 'Il est fait avec du lait.'),
            q('Quand faut-il se laver les mains ?', ['avant de manger', 'seulement le dimanche', 'jamais'], 'Pour éliminer les microbes.'),
        ],
        sources=[src(BO, 'Catégories d’aliments, leur origine.', 'Catégories d’aliments')]),

    'QM-C2-CE1-OBJ-01': dict(duree=6, essentiel=
        'Un circuit électrique simple : une pile, des fils, une lampe.\n'
        'Pour que la lampe brille, le circuit doit être fermé.\n'
        'Les métaux conduisent le courant. Le plastique et le bois ne le conduisent pas.',
        parties=[
            ('Allumer une lampe', [
                {'type': 'methode', 'titre': 'Pour allumer une lampe', 'etapes': [
                    'Relie un fil à une borne de la pile.',
                    'Relie ce fil à la lampe.',
                    'Relie un autre fil de la lampe à l’autre borne.']},
                {'type': 'piege', 'erreur': 'On relie la lampe à une seule borne.', 'correction': 'Le courant doit faire le tour : une borne, la lampe, l’autre borne.'},
                bq('La lampe s’éteint si le circuit est :', ['ouvert', 'fermé', 'neuf'], 'Le courant ne passe plus.'),
            ]),
            ('Conducteur ou isolant ?', [
                {'type': 'tableau', 'titre': 'Tester des objets', 'colonnes': ['Conducteur', 'Isolant'], 'lignes': [['clé en métal', 'règle en plastique'], ['trombone', 'gomme'], ['papier aluminium', 'crayon en bois']]},
                bq('Un trombone est :', ['conducteur', 'isolant', 'vivant'], 'Il est en métal.'),
            ]),
        ],
        a_toi=[
            q('Une gomme est :', ['isolante', 'conductrice', 'électrique'], 'Le courant ne passe pas.'),
            q('Que faut-il pour allumer une lampe ?', ['une pile, des fils, un circuit fermé', 'seulement une lampe', 'de l’eau'], 'Le circuit fait une boucle.'),
            q('Un interrupteur sert à :', ['ouvrir ou fermer le circuit', 'changer la pile', 'colorer la lumière'], 'Il allume et éteint.'),
        ],
        sources=[src(BO, 'Exemples de bon conducteurs et d’isolants.', 'Conducteurs et isolants')]),

    'QM-C2-CE1-OBJ-02': dict(duree=5, essentiel=
        'Une prise de courant est dangereuse : elle peut électriser ou tuer.\n'
        'On ne met jamais les doigts ou un objet dans une prise.\n'
        'On ne touche pas un appareil électrique avec les mains mouillées.',
        parties=[
            ('Pile ou prise', [
                {'type': 'tableau', 'titre': 'Deux sources d’électricité', 'colonnes': ['Source', 'Danger'], 'lignes': [['pile plate de classe', 'sans danger pour les expériences'], ['prise de la maison', 'très dangereuse']]},
                bq('Peut-on faire des expériences avec une prise ?', ['non, jamais', 'oui, seul', 'oui, avec les mains mouillées'], 'Le courant de la prise peut tuer.'),
            ]),
            ('Les règles de sécurité', [
                {'type': 'methode', 'titre': 'Je reste en sécurité', 'etapes': [
                    'Je ne touche pas une prise ou un fil abimé.',
                    'Je n’utilise pas d’appareil près de l’eau.',
                    'Je ne grimpe pas sur un poteau électrique.',
                    'J’appelle un adulte en cas de problème.']},
                {'type': 'piege', 'erreur': 'On croit qu’un fil dénudé est sans danger s’il est petit.', 'correction': 'Un fil abimé peut électriser. Préviens un adulte.'},
            ]),
        ],
        a_toi=[
            q('Avec les mains mouillées, on peut toucher un sèche-cheveux branché ?', ['non', 'oui', 'seulement s’il est éteint'], 'L’eau conduit le courant.'),
            q('Que faire devant un fil électrique abimé ?', ['prévenir un adulte', 'le toucher', 'le réparer seul'], 'Un adulte coupe le courant.'),
            q('Quelle source est sans danger pour une expérience ?', ['une pile plate', 'une prise', 'un poteau électrique'], 'La pile a une faible tension.'),
        ],
        sources=[src(BO, 'Règles élémentaires de sécurité', 'Sécurité électrique')]),

    'QM-C2-CE1-ESP-01': dict(duree=6, essentiel=
        'Mots de position : devant, derrière, à gauche, à droite, entre, près.\n'
        'Un plan montre un lieu vu de dessus.\n'
        'La légende explique les dessins du plan.',
        parties=[
            ('Lire un plan', [
                {'type': 'observe', 'consigne': 'Imagine le plan de ta classe, vu du plafond.', 'exemples': [
                    'Les tables sont des rectangles.', 'La porte est un trait ouvert.', 'Le tableau est un trait épais.']},
                {'type': 'methode', 'titre': 'Pour lire un plan', 'etapes': [
                    'Lis le titre.',
                    'Regarde la légende.',
                    'Repère un point connu, comme la porte.']},
                bq('Un plan montre un lieu vu :', ['de dessus', 'de côté', 'de dessous'], 'Comme un oiseau qui vole au-dessus.'),
            ]),
            ('Décrire un trajet', [
                {'type': 'exemple-resolu', 'enonce': 'Va de la porte au bureau de la maitresse.', 'etapes': [
                    'Avance tout droit jusqu’au tableau.', 'Tourne à gauche.', 'Le bureau est devant toi.'],
                 'conclusion': 'Un trajet se décrit pas à pas.'},
                {'type': 'piege', 'erreur': 'On oublie que la gauche dépend du sens de marche.', 'correction': 'Tourne le plan dans ton sens, ou imagine-toi dedans.'},
            ]),
        ],
        a_toi=[
            q('À quoi sert la légende d’un plan ?', ['à expliquer les dessins', 'à décorer', 'à écrire son nom'], 'Elle dit ce que montre chaque dessin.'),
            q('Le contraire de « près » est :', ['loin', 'devant', 'sous'], 'Près et loin vont ensemble.'),
            q('Sur un plan, une table est souvent :', ['un rectangle', 'un rond rouge', 'une flèche'], 'Vue de dessus, une table est un rectangle.'),
        ],
        sources=[src(BO, 'Vocabulaire permettant de définir des positions', 'Vocabulaire des positions')]),

    'QM-C2-CE1-ESP-02': dict(duree=7, essentiel=
        'La Terre a cinq océans et six continents.\n'
        'Les continents : Afrique, Amérique, Antarctique, Asie, Europe, Océanie.\n'
        'La France est en Europe. Le globe est une petite Terre.',
        parties=[
            ('Continents et océans', [
                {'type': 'tableau', 'titre': 'Sur le globe', 'colonnes': ['Continents', 'Océans'], 'lignes': [
                    ['Afrique, Amérique, Antarctique', 'Atlantique, Pacifique, Indien'], ['Asie, Europe, Océanie', 'Arctique, Austral']]},
                {'type': 'explique', 'texte': 'Sur une carte, l’eau des océans est en bleu. Les terres sont en vert ou en jaune.'},
                bq('Sur quel continent est la France ?', ['l’Europe', 'l’Afrique', 'l’Asie'], 'La France est un pays d’Europe.'),
            ]),
            ('Situer la France', [
                {'type': 'explique', 'texte': 'La France touche la Manche, la Méditerranée et l’océan Atlantique.'},
                {'type': 'piege', 'erreur': 'On confond pays et continent.', 'correction': 'La France est un pays. L’Europe est un continent avec beaucoup de pays.'},
                bq('Quel océan borde l’ouest de la France ?', ['l’océan Atlantique', 'l’océan Pacifique', 'l’océan Indien'], 'Il est à l’ouest de la France.'),
            ]),
        ],
        a_toi=[
            q('Combien d’océans compte la Terre ?', ['5', '2', '10'], 'Atlantique, Pacifique, Indien, Arctique, Austral.'),
            q('L’Antarctique est :', ['un continent couvert de glace', 'un océan', 'un pays'], 'Il est au pôle Sud.'),
            q('Sur une carte, les océans sont :', ['en bleu', 'en rouge', 'en noir'], 'Le bleu montre l’eau.'),
        ],
        sources=[src(BO, 'Repérer la position de sa région, de la France,', 'Situer la France')]),

    'QM-C2-CE1-TPS-01': dict(duree=6, essentiel=
        'Une semaine a 7 jours. Une année a 12 mois et 4 saisons.\n'
        'Les saisons : printemps, été, automne, hiver.\n'
        'Une journée dure 24 heures. Une heure dure 60 minutes.',
        parties=[
            ('Jours, mois, saisons', [
                {'type': 'tableau', 'titre': 'Le calendrier', 'colonnes': ['Unité', 'Combien ?'], 'lignes': [
                    ['jours dans une semaine', '7'], ['mois dans une année', '12'], ['saisons dans une année', '4'], ['jours dans une année', '365, parfois 366']]},
                bq('Combien de mois dans une année ?', ['12', '7', '4'], 'De janvier à décembre.'),
            ]),
            ('Tout revient', [
                {'type': 'explique', 'texte': 'Jours, semaines et saisons reviennent toujours dans le même ordre. On dit que le temps est **cyclique**.'},
                {'type': 'methode', 'titre': 'Pour lire un calendrier', 'etapes': [
                    'Trouve le mois.',
                    'Trouve la ligne de la semaine.',
                    'Lis le jour et la date.']},
                {'type': 'piege', 'erreur': 'On croit que tous les mois ont 30 jours.', 'correction': 'Février a 28 ou 29 jours. D’autres mois ont 31 jours.'},
            ]),
        ],
        a_toi=[
            q('Quelle saison vient après l’hiver ?', ['le printemps', 'l’été', 'l’automne'], 'Puis l’été, puis l’automne.'),
            q('Quel jour vient après mardi ?', ['mercredi', 'lundi', 'jeudi'], 'Lundi, mardi, mercredi.'),
            q('Combien de jours dans une semaine ?', ['7', '5', '10'], 'Du lundi au dimanche.'),
        ],
        sources=[src(BO, 'Le caractère cyclique des jours, des semaines,', 'Le temps cyclique')]),

    'QM-C2-CE1-TPS-02': dict(duree=6, essentiel=
        'Autrefois, pas de télévision, peu de voitures, pas de portable.\n'
        'Photos, objets et souvenirs des grands-parents nous le racontent.\n'
        'Certaines choses ont changé, d’autres sont restées.',
        parties=[
            ('Comparer hier et aujourd’hui', [
                {'type': 'tableau', 'titre': 'Il y a longtemps et aujourd’hui', 'colonnes': ['Autrefois', 'Aujourd’hui'], 'lignes': [
                    ['lettre par la poste', 'message sur un téléphone'], ['lavage du linge à la main', 'machine à laver'], ['éclairage à la bougie', 'lampe électrique'], ['école avec un encrier', 'école avec des tablettes']]},
                bq('Autrefois, pour écrire à l’école, on utilisait :', ['une plume et un encrier', 'une tablette', 'un ordinateur'], 'On trempait la plume dans l’encre.'),
            ]),
            ('Chercher des traces', [
                {'type': 'methode', 'titre': 'Pour savoir comment on vivait', 'etapes': [
                    'Regarde de vieilles photos.',
                    'Observe des objets anciens.',
                    'Interroge tes grands-parents.']},
                {'type': 'piege', 'erreur': 'On croit que tout a changé.', 'correction': 'On mange encore du pain, on joue encore à la marelle.'},
            ]),
        ],
        a_toi=[
            q('Qui peut raconter la vie d’autrefois ?', ['les grands-parents', 'un bébé', 'un robot'], 'Ils ont vécu ces changements.'),
            q('Quel objet n’existait pas pour tes arrière-grands-parents enfants ?', ['le téléphone portable', 'la bougie', 'le livre'], 'Il est récent.'),
            q('Une vieille photo est :', ['une trace du passé', 'une invention', 'un jeu vidéo'], 'Elle montre comment on vivait.'),
        ],
        sources=[src(BO, 'Au CE1 : les élèves étudient l\'évolution des modes de vie et des événements remarquables à', 'Évolution des modes de vie')]),

    'QM-C2-CE1-ESP-03': dict(duree=6, essentiel=
        'Il existe plusieurs paysages : littoral, montagne, campagne, ville, désert.\n'
        'On les reconnait au relief, à l’eau, aux plantes, aux constructions.\n'
        'Les humains transforment les paysages : routes, champs, maisons.',
        parties=[
            ('Reconnaitre un paysage', [
                {'type': 'tableau', 'titre': 'Des paysages', 'colonnes': ['Paysage', 'Ce qu’on voit'], 'lignes': [
                    ['littoral', 'la mer, une plage, un port'], ['montagne', 'des sommets, des pentes, de la neige'], ['campagne', 'des champs, des fermes, des villages'], ['ville', 'des immeubles, des rues, beaucoup de monde'], ['désert', 'du sable ou des cailloux, très peu de plantes']]},
                bq('Un port et une plage sont dans un paysage de :', ['littoral', 'montagne', 'désert'], 'Le littoral est au bord de la mer.'),
            ]),
            ('Observer une photo', [
                {'type': 'methode', 'titre': 'Pour décrire un paysage', 'etapes': [
                    'Regarde le premier plan, en bas de la photo.',
                    'Puis le second plan, au milieu.',
                    'Puis l’arrière-plan, au fond.',
                    'Cherche ce que les humains ont construit.']},
                {'type': 'piege', 'erreur': 'On croit qu’un champ est naturel.', 'correction': 'Un champ est cultivé par les humains.'},
            ]),
        ],
        a_toi=[
            q('Des sommets enneigés appartiennent à :', ['la montagne', 'la ville', 'le littoral'], 'La neige reste en altitude.'),
            q('Beaucoup d’immeubles et de rues, c’est :', ['la ville', 'la campagne', 'le désert'], 'Beaucoup de monde y vit.'),
            q('Une route est :', ['construite par les humains', 'naturelle', 'un animal'], 'Les humains aménagent les paysages.'),
        ],
        sources=[src(BO, 'Reconnaître différents paysages : les littoraux,', 'Différents paysages')]),

    'QM-C2-CE1-TPS-03': dict(duree=5, essentiel=
        'Une famille compte plusieurs générations : enfants, parents, grands-parents.\n'
        'Mes parents sont nés avant moi. Mes grands-parents sont nés avant mes parents.\n'
        'Un arbre généalogique montre les générations.',
        parties=[
            ('Les générations', [
                {'type': 'tableau', 'titre': 'Trois générations', 'colonnes': ['Génération', 'Qui ?'], 'lignes': [
                    ['1re', 'les grands-parents'], ['2e', 'les parents, les oncles et tantes'], ['3e', 'les enfants, les cousins']]},
                bq('Qui est né en premier ?', ['le grand-père', 'le père', 'l’enfant'], 'Il appartient à la génération la plus ancienne.'),
            ]),
            ('L’arbre généalogique', [
                {'type': 'explique', 'texte': 'Dans un arbre généalogique, les plus anciens sont en haut. Les plus jeunes sont en bas.'},
                {'type': 'piege', 'erreur': 'On croit que les cousins sont d’une autre génération.', 'correction': 'Les cousins sont de la même génération que toi.'},
            ]),
        ],
        a_toi=[
            q('Le père de ma mère est :', ['mon grand-père', 'mon oncle', 'mon cousin'], 'C’est la génération des grands-parents.'),
            q('Mes cousins sont :', ['de ma génération', 'de la génération de mes parents', 'de la génération de mes grands-parents'], 'Ce sont les enfants de mes oncles et tantes.'),
            q('Dans un arbre généalogique, les plus anciens sont :', ['en haut', 'en bas', 'au milieu'], 'On descend vers les plus jeunes.'),
        ],
        sources=[src(BO, 'Les générations vivantes et la mémoire familiale', 'Générations')]),
}

ecrire(COURS)
