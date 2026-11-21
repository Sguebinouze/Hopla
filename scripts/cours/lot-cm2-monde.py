"""Lot de cours : histoire-géographie et sciences CM2. Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-cm2-monde.py
    python3 scripts/cours/pages.py content/cours/HG-C3-CM2-*.json content/cours/ST-C3-CM2-*.json

Cycle 3 : phrases de 20 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
Chiffres qui changent (membres de la zone euro) : formulés sans nombre précis.
"""
from commun import bq, ecrire, q, source_referentiel as ref, vocabulaire

COURS = {
    # ------------------------------------------------------------------ Histoire
    'HG-C3-CM2-HIST-01': dict(duree=8, essentiel=
        'La République est proclamée pour la première fois en 1792. La Ve République, celle d’aujourd’hui, date de 1958.\n'
        'À partir de 1870, la IIIe République s’installe durablement et diffuse ses symboles.\n'
        'Elle développe l’école, les libertés et les droits des citoyens.',
        parties=[
            ('Les étapes de la République', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1792, 'date': '1792', 'evenement': 'Ire République.'},
                    {'annee': 1848, 'date': '1848', 'evenement': 'IIe République : suffrage universel masculin, abolition de l’esclavage.'},
                    {'annee': 1870, 'date': '1870', 'evenement': 'IIIe République.'},
                    {'annee': 1958, 'date': '1958', 'evenement': 'Ve République.'}]},
                bq('Sous quelle République vivons-nous aujourd’hui ?', ['la Ve', 'la IIIe', 'la Ire'], 'La Ve République date de 1958.'),
            ]),
            ('Les symboles et les libertés', [
                {'type': 'tableau', 'titre': 'Les symboles de la République', 'colonnes': ['Symbole', 'Ce qu’il faut savoir'], 'lignes': [
                    ['Marianne', 'la figure de la République'], ['le drapeau bleu, blanc, rouge', 'sur les bâtiments publics'],
                    ['La Marseillaise', 'hymne national depuis 1879'], ['le 14 juillet', 'fête nationale depuis 1880'], ['Liberté, Égalité, Fraternité', 'la devise']]},
                {'type': 'explique', 'texte': 'La IIIe République accorde des libertés : liberté de la presse en 1881, liberté de créer un syndicat en 1884.'},
                {'type': 'piege', 'erreur': 'On croit que la République existe sans interruption depuis 1792.', 'correction': 'Des rois et des empereurs ont gouverné entre les Républiques, au XIXe siècle.'},
            ]),
        ],
        a_toi=[
            q('La fête nationale française est le :', ['14 juillet', '11 novembre', '1er mai'], 'Fête nationale depuis 1880.'),
            q('La devise de la République est :', ['Liberté, Égalité, Fraternité', 'Travail, Famille, Patrie', 'Un pour tous, tous pour un'], 'Elle est inscrite sur les mairies et les écoles.'),
            q('L’hymne national est :', ['La Marseillaise', 'Le Chant des partisans', 'Frère Jacques'], 'Hymne national depuis 1879.'),
        ],
        sources=[ref('HG-C3-CM2-HIST-01', 'Le temps de la République')]),

    'HG-C3-CM2-HIST-02': dict(duree=8, essentiel=
        'Au XIXe siècle, la France entre dans l’âge industriel.\n'
        'La machine à vapeur, qui fonctionne au charbon, fait tourner les usines et avancer les trains.\n'
        'Beaucoup de paysans quittent les campagnes pour travailler en ville : c’est l’exode rural.',
        parties=[
            ('Énergies et machines', [
                {'type': 'tableau', 'titre': 'Des énergies nouvelles', 'colonnes': ['Énergie', 'Ce qu’elle permet'], 'lignes': [
                    ['charbon', 'chauffer l’eau des machines à vapeur'], ['vapeur', 'faire tourner les usines, avancer les trains et les bateaux'],
                    ['électricité, fin du XIXe siècle', 'éclairer, faire tourner des moteurs'], ['pétrole, fin du XIXe siècle', 'faire rouler les premières automobiles']]},
                bq('Quelle énergie fait fonctionner la machine à vapeur ?', ['le charbon', 'le vent', 'l’électricité'], 'On brule le charbon pour chauffer l’eau.'),
            ]),
            ('Villes et campagnes', [
                {'type': 'explique', 'texte': 'Les villes grandissent autour des usines et des gares. Les campagnes perdent des habitants, mais les machines agricoles apparaissent.'},
                {'type': 'piege', 'erreur': 'On croit qu’au XIXe siècle, tous les Français vivent en ville.', 'correction': 'Vers 1900, la majorité des Français vit encore à la campagne.'},
            ]),
        ],
        a_toi=[
            q('L’exode rural, c’est :', ['le départ des paysans vers les villes', 'un voyage en train', 'une nouvelle machine'], 'Ils viennent travailler à l’usine.'),
            q('Au XIXe siècle, quel moyen de transport se développe ?', ['le chemin de fer', 'l’avion', 'la fusée'], 'Les trains roulent grâce à la vapeur.'),
            q('Le charbon est extrait :', ['dans les mines', 'dans les forêts', 'dans la mer'], 'Les mineurs creusent des galeries.'),
        ],
        sources=[ref('HG-C3-CM2-HIST-02', 'L’âge industriel')]),

    'HG-C3-CM2-HIST-03': dict(duree=8, essentiel=
        'La Première Guerre mondiale dure de 1914 à 1918. Les soldats combattent dans des tranchées.\n'
        'La Seconde Guerre mondiale dure de 1939 à 1945. La France est occupée, des Français entrent en Résistance.\n'
        'Les nazis organisent le génocide des Juifs : environ six millions sont assassinés.',
        parties=[
            ('Deux guerres mondiales', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1914, 'date': '1914', 'evenement': 'Début de la Première Guerre mondiale.'},
                    {'annee': 1918, 'date': '11 novembre 1918', 'evenement': 'Armistice.'},
                    {'annee': 1939, 'date': '1939', 'evenement': 'Début de la Seconde Guerre mondiale.'},
                    {'annee': 1945, 'date': '8 mai 1945', 'evenement': 'Fin de la guerre en Europe.'}]},
                {'type': 'explique', 'texte': 'En 1916, la bataille de Verdun dure des mois. Les soldats français sont surnommés les poilus.'},
                bq('Que commémore-t-on le 11 novembre ?', ['la fin de la Première Guerre mondiale', 'la prise de la Bastille', 'la fin de la Seconde Guerre mondiale'], 'L’armistice est signé le 11 novembre 1918.'),
            ]),
            ('Occupation, Résistance, génocide', [
                {'type': 'explique', 'texte': 'En 1940, l’Allemagne nazie occupe la France. Le 18 juin, le général de Gaulle appelle à continuer le combat depuis Londres.'},
                {'type': 'explique', 'texte': 'Les Juifs sont persécutés, déportés et assassinés dans des camps d’extermination, comme Auschwitz. C’est la Shoah.'},
                {'type': 'piege', 'erreur': 'On croit que les deux guerres mondiales se sont suivies sans pause.', 'correction': 'Plus de vingt ans les séparent : de 1918 à 1939.'},
            ]),
        ],
        a_toi=[
            q('La Seconde Guerre mondiale se termine en Europe le :', ['8 mai 1945', '11 novembre 1918', '14 juillet 1789'], 'C’est un jour férié en France.'),
            q('Le 18 juin 1940, le général de Gaulle :', ['appelle à résister depuis Londres', 'signe l’armistice', 'devient roi'], 'C’est l’appel du 18 juin.'),
            q('Le génocide des Juifs s’appelle aussi :', ['la Shoah', 'la Résistance', 'l’armistice'], 'Environ six millions de Juifs sont assassinés.'),
        ],
        sources=[ref('HG-C3-CM2-HIST-03', 'Les deux guerres mondiales')]),

    'HG-C3-CM2-HIST-04': dict(duree=6, essentiel=
        'En 1881 et 1882, les lois Jules Ferry rendent l’école primaire gratuite, laïque et obligatoire.\n'
        'Tous les enfants de 6 à 13 ans doivent aller à l’école.\n'
        'L’école apprend à lire, écrire, compter, et à aimer la République.',
        parties=[
            ('Gratuite, laïque, obligatoire', [
                {'type': 'tableau', 'titre': 'Les lois Ferry', 'colonnes': ['Mot', 'Sens'], 'lignes': [
                    ['gratuite (1881)', 'les familles ne paient pas'], ['laïque (1882)', 'pas d’enseignement religieux à l’école publique'], ['obligatoire (1882)', 'tous les enfants de 6 à 13 ans']]},
                bq('L’école laïque, c’est une école :', ['sans enseignement religieux', 'payante', 'réservée aux garçons'], 'La religion relève des familles.'),
            ]),
            ('Une journée de classe vers 1900', [
                {'type': 'observe', 'consigne': 'Dans la classe.', 'exemples': [
                    'Le tableau noir, la carte de France, les plumes et l’encrier.', 'La leçon de morale le matin.', 'Le certificat d’études à la fin de l’école primaire.']},
                {'type': 'piege', 'erreur': 'On croit qu’avant Jules Ferry, aucun enfant n’allait à l’école.', 'correction': 'Beaucoup y allaient déjà, mais l’école n’était ni gratuite ni obligatoire pour tous.'},
            ]),
        ],
        a_toi=[
            q('Les lois Ferry rendent l’école :', ['gratuite, laïque et obligatoire', 'payante et religieuse', 'facultative'], 'En 1881 et 1882.'),
            q('Vers 1900, les élèves écrivent avec :', ['une plume et de l’encre', 'un stylo à bille', 'une tablette'], 'Ils trempent la plume dans l’encrier.'),
            q('À la fin de l’école primaire, on passe :', ['le certificat d’études', 'le baccalauréat', 'le permis'], 'Un examen important à l’époque.'),
        ],
        sources=[ref('HG-C3-CM2-HIST-04', 'L’école de Jules Ferry')]),

    'HG-C3-CM2-HIST-05': dict(duree=6, essentiel=
        'En 1848, le suffrage universel masculin est établi : tous les hommes de plus de 21 ans peuvent voter.\n'
        'En 1944, les femmes obtiennent le droit de vote. Elles votent pour la première fois en 1945.\n'
        'Depuis 1974, on peut voter dès 18 ans.',
        parties=[
            ('La conquête du droit de vote', [
                vocabulaire(3, 'Démocratie', 'Citoyen'),
                {'type': 'frise', 'reperes': [
                    {'annee': 1848, 'date': '1848', 'evenement': 'Suffrage universel masculin.'},
                    {'annee': 1944, 'date': '1944', 'evenement': 'Droit de vote des femmes.'},
                    {'annee': 1974, 'date': '1974', 'evenement': 'Droit de vote à 18 ans.'}]},
                bq('En quelle année les femmes obtiennent-elles le droit de vote en France ?', ['1944', '1848', '1789'], 'Près d’un siècle après les hommes.'),
            ]),
            ('Droits et devoirs', [
                {'type': 'tableau', 'titre': 'Le citoyen', 'colonnes': ['Droits', 'Devoirs'], 'lignes': [
                    ['voter', 'respecter la loi'], ['s’exprimer librement', 'payer ses impôts'], ['être protégé par la justice', 'respecter les autres']]},
                {'type': 'piege', 'erreur': 'On croit que le suffrage universel de 1848 concerne tout le monde.', 'correction': 'Il est seulement masculin : les femmes en sont exclues jusqu’en 1944.'},
            ]),
        ],
        a_toi=[
            q('Le suffrage universel masculin date de :', ['1848', '1944', '1958'], 'Sous la IIe République.'),
            q('Aujourd’hui, on peut voter dès :', ['18 ans', '21 ans', '16 ans'], 'Depuis 1974.'),
            q('Respecter la loi est :', ['un devoir du citoyen', 'un droit seulement', 'facultatif'], 'Tous les citoyens doivent la respecter.'),
        ],
        sources=[ref('HG-C3-CM2-HIST-05', 'Droits et devoirs du citoyen')]),

    'HG-C3-CM2-HIST-06': dict(duree=7, essentiel=
        'Au XIXe siècle, les ouvriers travaillent souvent plus de 12 heures par jour, dans le bruit et le danger.\n'
        'Les mineurs descendent extraire le charbon dans des galeries étroites. Des enfants travaillent aussi.\n'
        'Peu à peu, des lois protègent les travailleurs, et les ouvriers s’organisent en syndicats.',
        parties=[
            ('À la mine et à l’usine', [
                {'type': 'tableau', 'titre': 'Les dangers', 'colonnes': ['Lieu', 'Dangers'], 'lignes': [
                    ['la mine', 'éboulements, coups de grisou, poussière qui abime les poumons'], ['l’usine', 'machines sans protection, bruit, longues journées']]},
                bq('Le coup de grisou est :', ['une explosion de gaz dans la mine', 'une grève', 'une machine'], 'Le grisou est un gaz qui peut exploser.'),
            ]),
            ('Le travail des enfants', [
                {'type': 'explique', 'texte': 'Des enfants travaillent à la mine dès 10 ans. En 1841, une loi interdit le travail des moins de 8 ans dans les grandes usines.'},
                {'type': 'piege', 'erreur': 'On croit que la loi de 1841 met fin au travail des enfants.', 'correction': 'Elle fixe seulement un âge minimum. D’autres lois, plus tard, le relèvent.'},
            ]),
        ],
        a_toi=[
            q('Les mineurs extraient :', ['du charbon', 'du blé', 'du coton'], 'Pour alimenter les machines à vapeur.'),
            q('Un syndicat sert à :', ['défendre les droits des travailleurs', 'construire des usines', 'vendre du charbon'], 'Autorisé en France en 1884.'),
            q('Au XIXe siècle, une journée d’ouvrier dure souvent :', ['plus de 12 heures', '4 heures', '7 heures'], 'Les journées sont très longues.'),
        ],
        sources=[ref('HG-C3-CM2-HIST-06', 'Travailler à la mine et à l’usine')]),

    'HG-C3-CM2-HIST-07': dict(duree=6, essentiel=
        'Après 1945, des pays d’Europe décident de s’unir pour ne plus se faire la guerre.\n'
        'En 1951, six pays créent la CECA, pour mettre en commun le charbon et l’acier.\n'
        'Aujourd’hui, l’Union européenne compte 27 pays. L’euro est la monnaie de la plupart d’entre eux.',
        parties=[
            ('Les étapes', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1951, 'date': '1951', 'evenement': 'CECA : six pays.'},
                    {'annee': 1957, 'date': '1957', 'evenement': 'Traité de Rome : la Communauté économique européenne.'},
                    {'annee': 1992, 'date': '1992', 'evenement': 'Traité de Maastricht : l’Union européenne.'},
                    {'annee': 2002, 'date': '2002', 'evenement': 'Pièces et billets en euros.'}]},
                bq('Pourquoi les pays d’Europe s’unissent-ils après 1945 ?', ['pour garder la paix', 'pour faire la guerre', 'pour changer de langue'], 'Ils sortent de deux guerres mondiales.'),
            ]),
            ('Les six pays fondateurs', [
                {'type': 'observe', 'consigne': 'Les pays de la CECA en 1951.', 'exemples': ['France, Allemagne de l’Ouest, Italie', 'Belgique, Pays-Bas, Luxembourg']},
                {'type': 'piege', 'erreur': 'On croit que tous les pays d’Europe sont dans l’Union européenne.', 'correction': 'La Suisse ou la Norvège, par exemple, n’en font pas partie.'},
            ]),
        ],
        a_toi=[
            q('Combien de pays compte l’Union européenne aujourd’hui ?', ['27', '6', '50'], 'Elle s’est agrandie peu à peu.'),
            q('Les pièces et billets en euros circulent depuis :', ['2002', '1951', '1789'], 'Ils remplacent le franc en France.'),
            q('La CECA met en commun :', ['le charbon et l’acier', 'le blé et le vin', 'les armées'], 'Les industries utiles pour faire la guerre.'),
        ],
        sources=[ref('HG-C3-CM2-HIST-07', 'La construction européenne')]),

    # ---------------------------------------------------------------- Géographie
    'HG-C3-CM2-GEO-01': dict(duree=6, essentiel=
        'Aller à l’école, au travail ou faire ses courses : ce sont les mobilités du quotidien.\n'
        'Pour les longues distances, on prend le TGV, l’avion ou la voiture sur l’autoroute.\n'
        'En France, les grands réseaux de transport partent de Paris, en étoile.',
        parties=[
            ('Le quotidien et les longues distances', [
                {'type': 'tableau', 'titre': 'Se déplacer', 'colonnes': ['Distance', 'Modes de transport', 'Exemple'], 'lignes': [
                    ['courte, en ville', 'marche, vélo, bus, tramway, métro', 'aller à l’école'], ['moyenne', 'voiture, train régional', 'aller travailler dans la ville voisine'],
                    ['longue', 'TGV, avion, autoroute', 'Paris-Marseille en TGV : environ 3 heures']]},
                bq('Pour aller de Paris à Marseille rapidement en train, on prend :', ['le TGV', 'le tramway', 'le métro'], 'Environ trois heures de trajet.'),
            ]),
            ('Un réseau en étoile', [
                {'type': 'explique', 'texte': 'Les lignes de TGV et les autoroutes relient Paris aux grandes villes. Aller d’une région à une autre oblige parfois à passer par Paris.'},
                {'type': 'piege', 'erreur': 'On croit qu’en ville, la voiture est toujours le plus rapide.', 'correction': 'Avec les embouteillages, le métro ou le vélo vont souvent plus vite.'},
            ]),
        ],
        a_toi=[
            q('Aller chaque jour à l’école, c’est une mobilité :', ['du quotidien', 'internationale', 'exceptionnelle'], 'Elle se répète tous les jours.'),
            q('Le grand aéroport de Paris s’appelle :', ['Roissy-Charles-de-Gaulle', 'gare de Lyon', 'port du Havre'], 'Le plus grand aéroport de France.'),
            q('Le réseau des TGV en France est :', ['en étoile autour de Paris', 'en cercle', 'sans centre'], 'Les lignes partent de Paris.'),
        ],
        sources=[ref('HG-C3-CM2-GEO-01', 'Se déplacer en France et ailleurs')]),

    'HG-C3-CM2-GEO-02': dict(duree=6, essentiel=
        'Internet relie des milliards d’ordinateurs, de téléphones et de tablettes.\n'
        'Les données passent par des câbles, des antennes et des satellites, et sont stockées dans des centres de données.\n'
        'On l’utilise pour communiquer, s’informer, apprendre ou acheter.',
        parties=[
            ('Comment ça marche ?', [
                {'type': 'methode', 'titre': 'Le trajet d’un message vidéo', 'etapes': [
                    'Ta tablette envoie l’image à la box ou à une antenne.', 'Les données voyagent par des câbles, parfois sous l’océan.',
                    'Elles passent par des centres de données remplis de serveurs.', 'Elles arrivent sur l’écran de ta cousine, au Canada.']},
                bq('Où sont stockées les données d’Internet ?', ['dans des centres de données', 'dans les nuages du ciel', 'dans les satellites seulement'], 'Des bâtiments remplis d’ordinateurs, les serveurs.'),
            ]),
            ('Des usages et des précautions', [
                {'type': 'tableau', 'titre': 'Usages et précautions', 'colonnes': ['Usage', 'Précaution'], 'lignes': [
                    ['communiquer', 'ne pas donner son adresse ni ses mots de passe'], ['s’informer', 'vérifier la source'], ['jouer, regarder des vidéos', 'limiter son temps d’écran']]},
                {'type': 'piege', 'erreur': 'On croit que tout ce qu’on lit sur Internet est vrai.', 'correction': 'N’importe qui peut publier : on vérifie la source et on compare.'},
            ]),
        ],
        a_toi=[
            q('Un serveur est :', ['un ordinateur qui stocke et envoie des données', 'une personne au restaurant', 'un câble'], 'Ils sont rassemblés dans des centres de données.'),
            q('Avant de croire une information en ligne, on :', ['vérifie la source', 'la partage vite', 'regarde les images'], 'Qui l’a écrite ? Est-ce sérieux ?'),
            q('Sur Internet, on ne donne jamais :', ['ses mots de passe', 'son avis sur un livre', 'le nom de son école à son enseignant'], 'Ils protègent tes comptes.'),
        ],
        sources=[ref('HG-C3-CM2-GEO-02', 'Communiquer avec l’Internet')]),

    'HG-C3-CM2-GEO-03': dict(duree=6, essentiel=
        'Mieux habiter, c’est rendre son lieu de vie plus agréable et moins polluant.\n'
        'On plante des arbres et des jardins en ville : ils rafraichissent l’air en été.\n'
        'On trie ses déchets pour qu’ils soient recyclés.',
        parties=[
            ('La nature en ville', [
                {'type': 'tableau', 'titre': 'Des aménagements', 'colonnes': ['Aménagement', 'Ce qu’il apporte'], 'lignes': [
                    ['arbres, parcs', 'ombre et fraicheur, oiseaux et insectes'], ['jardins partagés', 'légumes, rencontres entre voisins'], ['toits végétalisés', 'isolation des bâtiments, eau de pluie retenue']]},
                bq('En été, les arbres en ville :', ['rafraichissent l’air', 'réchauffent les rues', 'polluent l’air'], 'Ils font de l’ombre et évaporent de l’eau.'),
            ]),
            ('Trier et recycler', [
                {'type': 'methode', 'titre': 'Pour trier ses déchets', 'etapes': [
                    'Regarde les consignes de ta commune : les couleurs des bacs changent selon les villes.', 'Mets le verre dans le conteneur à verre.',
                    'Mets les emballages et les papiers dans le bac de tri.', 'Mets les épluchures au compost.']},
                {'type': 'piege', 'erreur': 'On croit que recycler suffit.', 'correction': 'Le mieux est de produire moins de déchets : réutiliser, réparer, éviter les emballages.'},
            ]),
        ],
        a_toi=[
            q('Un jardin partagé est :', ['un jardin cultivé par des voisins', 'un parc privé', 'un champ de blé'], 'On y jardine ensemble.'),
            q('Les épluchures de légumes vont :', ['au compost', 'au conteneur à verre', 'dans le bac des papiers'], 'Elles deviennent de la terre fertile.'),
            q('Le meilleur déchet est celui :', ['qu’on ne produit pas', 'qu’on brule', 'qu’on jette dans la rue'], 'Moins de déchets, moins de pollution.'),
        ],
        sources=[ref('HG-C3-CM2-GEO-03', 'Mieux habiter')]),

    'HG-C3-CM2-GEO-04': dict(duree=6, essentiel=
        'Les transports ne polluent pas tous autant.\n'
        'La voiture et l’avion rejettent beaucoup de gaz à effet de serre ; le train en rejette beaucoup moins.\n'
        'La marche et le vélo ne polluent pas et sont bons pour la santé.',
        parties=[
            ('Comparer les modes de transport', [
                vocabulaire(3, 'Effet de serre'),
                {'type': 'tableau', 'titre': 'Pollution par voyageur, du moins au plus polluant', 'colonnes': ['Mode', 'Pollution'], 'lignes': [
                    ['marche, vélo', 'aucune'], ['train, métro, tramway', 'faible'], ['bus, covoiturage', 'moyenne'], ['voiture avec une seule personne', 'forte'], ['avion', 'très forte']]},
                bq('Pour un même trajet, lequel pollue le moins ?', ['le TGV', 'l’avion', 'la voiture avec une seule personne'], 'Le train électrique rejette peu de CO₂.'),
            ]),
            ('Des mobilités durables', [
                {'type': 'observe', 'consigne': 'Des solutions.', 'exemples': ['aller à l’école à pied ou à vélo', 'prendre le bus ou le tramway', 'partager une voiture : le covoiturage']},
                {'type': 'piege', 'erreur': 'On croit qu’une voiture électrique ne pollue pas du tout.', 'correction': 'Sa fabrication et sa batterie polluent. Elle pollue moins en roulant.'},
            ]),
        ],
        a_toi=[
            q('Le covoiturage, c’est :', ['partager une voiture à plusieurs', 'conduire très vite', 'louer un vélo'], 'Moins de voitures sur la route.'),
            q('Quel mode de transport ne rejette aucun gaz ?', ['le vélo', 'le bus', 'l’avion'], 'On pédale avec ses jambes.'),
            q('Les gaz à effet de serre :', ['retiennent la chaleur autour de la Terre', 'refroidissent la Terre', 'n’existent pas'], 'Ils réchauffent le climat.'),
        ],
        sources=[ref('HG-C3-CM2-GEO-04', 'Se déplacer durablement')]),

    'HG-C3-CM2-GEO-05': dict(duree=5, essentiel=
        'Des câbles sous-marins relient les continents et transportent la plupart des données d’Internet.\n'
        'En France, la fibre arrive surtout dans les villes ; certaines campagnes et montagnes sont mal couvertes.\n'
        'Dans le monde, une partie de l’Afrique subsaharienne reste peu connectée.',
        parties=[
            ('Les infrastructures', [
                {'type': 'tableau', 'titre': 'Ce qui fait marcher Internet', 'colonnes': ['Infrastructure', 'Rôle'], 'lignes': [
                    ['câbles sous-marins', 'relier les continents'], ['fibre optique', 'apporter un accès rapide aux logements'], ['antennes relais', 'connecter les téléphones'], ['satellites', 'connecter les lieux isolés']]},
                bq('Qu’est-ce qui relie l’Europe à l’Amérique pour Internet ?', ['des câbles sous-marins', 'des routes', 'des fleuves'], 'Ils sont posés au fond de l’océan.'),
            ]),
            ('Des inégalités', [
                {'type': 'explique', 'texte': 'Une zone blanche est un lieu où le téléphone portable ne capte pas, ou très mal.'},
                {'type': 'piege', 'erreur': 'On croit que tout le monde a Internet chez soi.', 'correction': 'Dans le monde, une partie des habitants n’y a pas encore accès.'},
            ]),
        ],
        a_toi=[
            q('Une zone blanche est un lieu :', ['mal couvert par le réseau', 'couvert de neige', 'sans habitants'], 'Le téléphone n’y capte pas bien.'),
            q('En France, la fibre est surtout installée :', ['dans les villes', 'en haute montagne', 'au milieu des forêts'], 'Là où vivent beaucoup d’habitants.'),
            q('Un satellite permet de connecter :', ['des lieux isolés', 'seulement les grandes villes', 'les sous-marins'], 'Il capte et renvoie le signal depuis l’espace.'),
        ],
        sources=[ref('HG-C3-CM2-GEO-05', 'Inégalement connectés')]),

    'HG-C3-CM2-GEO-06': dict(duree=6, essentiel=
        'Un écoquartier est un quartier conçu pour consommer moins d’énergie et laisser plus de place à la nature.\n'
        'Ses bâtiments sont bien isolés, souvent équipés de panneaux solaires et de toits végétalisés.\n'
        'On y circule à pied, à vélo ou en transport en commun.',
        parties=[
            ('Ce qu’on y trouve', [
                {'type': 'tableau', 'titre': 'Dans un écoquartier', 'colonnes': ['Élément', 'But'], 'lignes': [
                    ['bâtiments isolés', 'moins de chauffage'], ['panneaux solaires', 'produire de l’électricité'], ['récupérateurs d’eau de pluie', 'arroser sans gaspiller'],
                    ['pistes cyclables, rues piétonnes', 'moins de voitures'], ['composteurs partagés', 'réduire les déchets']]},
                bq('Les panneaux solaires servent à :', ['produire de l’électricité', 'chauffer la rue', 'recycler le verre'], 'Ils transforment la lumière du Soleil.'),
            ]),
            ('Vivre ensemble', [
                {'type': 'explique', 'texte': 'Un écoquartier mêle logements, commerces, écoles et espaces verts. Tout est proche : on se déplace moins loin.'},
                {'type': 'piege', 'erreur': 'On croit qu’un écoquartier est un quartier sans habitants, juste des jardins.', 'correction': 'C’est un vrai quartier, avec des logements et des services.'},
            ]),
        ],
        a_toi=[
            q('Dans un écoquartier, on se déplace surtout :', ['à pied, à vélo, en transport en commun', 'en avion', 'en voiture seulement'], 'Les rues laissent peu de place aux voitures.'),
            q('Un toit végétalisé est :', ['couvert de plantes', 'couvert de neige', 'en métal'], 'Il isole et retient l’eau de pluie.'),
            q('Un bâtiment bien isolé :', ['consomme moins d’énergie pour se chauffer', 'consomme plus d’électricité', 'n’a pas de fenêtres'], 'La chaleur ne s’échappe pas.'),
        ],
        sources=[ref('HG-C3-CM2-GEO-06', 'Habiter un écoquartier')]),

    # ------------------------------------------------------------------ Sciences
    'ST-C3-CM2-MAT-01': dict(duree=6, essentiel=
        'Un matériau naturel existe dans la nature : bois, laine, pierre, coton.\n'
        'Un matériau fabriqué est produit par l’être humain : plastique, verre, acier.\n'
        'On classe les matériaux selon leurs propriétés : dur ou souple, transparent ou opaque, conducteur ou non.',
        parties=[
            ('Naturel ou fabriqué ?', [
                {'type': 'tableau', 'titre': 'Des matériaux', 'colonnes': ['Naturels', 'Fabriqués', 'Fabriqué à partir de'], 'lignes': [
                    ['bois', 'papier', 'bois'], ['sable', 'verre', 'sable'], ['laine', 'plastique', 'pétrole']]},
                bq('Le verre est un matériau :', ['fabriqué', 'naturel', 'vivant'], 'On l’obtient en chauffant du sable.'),
            ]),
            ('Des propriétés', [
                {'type': 'tableau', 'titre': 'Trier selon une propriété', 'colonnes': ['Propriété', 'Oui', 'Non'], 'lignes': [
                    ['laisse passer le courant électrique', 'cuivre, fer', 'bois, plastique'], ['attiré par un aimant', 'fer', 'cuivre, aluminium'], ['flotte sur l’eau', 'bois, liège', 'pierre, fer']]},
                {'type': 'piege', 'erreur': 'On croit que tous les métaux sont attirés par un aimant.', 'correction': 'Le fer l’est, mais pas le cuivre ni l’aluminium.'},
            ]),
        ],
        a_toi=[
            q('Le plastique est fabriqué à partir :', ['du pétrole', 'du sable', 'de la laine'], 'Le pétrole est transformé en usine.'),
            q('Quel matériau laisse passer le courant électrique ?', ['le cuivre', 'le bois', 'le plastique'], 'Les fils électriques sont en cuivre.'),
            q('Le coton est un matériau :', ['naturel', 'fabriqué', 'métallique'], 'Il pousse sur une plante.'),
        ],
        sources=[ref('ST-C3-CM2-MAT-01', 'Matériaux naturels ou fabriqués')]),

    'ST-C3-CM2-MAT-02': dict(duree=6, essentiel=
        'La masse se mesure avec une balance, en grammes ou en kilogrammes.\n'
        'Le volume d’un liquide se mesure avec une éprouvette graduée, en litres ou en millilitres.\n'
        '1 L = 100 cL = 1 000 mL. 1 L d’eau a une masse d’environ 1 kg.',
        parties=[
            ('Mesurer un volume', [
                {'type': 'methode', 'titre': 'Lire une éprouvette graduée', 'etapes': [
                    'Pose l’éprouvette sur une table bien plate.', 'Place tes yeux à la hauteur du liquide.', 'Lis la graduation au niveau du liquide.']},
                {'type': 'tableau', 'titre': 'Unités de volume', 'colonnes': ['Unité', 'Vaut'], 'lignes': [
                    ['1 litre (L)', '100 cL = 1 000 mL'], ['1 centilitre (cL)', '10 mL']]},
                bq('250 mL = ?', ['25 cL', '2,5 cL', '250 cL'], '10 mL = 1 cL.'),
            ]),
            ('Masse ou volume ?', [
                {'type': 'explique', 'texte': '250 mL d’eau ont une masse de 250 g. Mais 250 mL d’huile pèsent moins : l’huile est plus légère que l’eau.'},
                {'type': 'piege', 'erreur': 'On croit que masse et volume sont la même chose.', 'correction': 'Le volume est la place occupée, la masse se lit sur la balance.'},
            ]),
        ],
        a_toi=[
            q('1 L = ?', ['1 000 mL', '100 mL', '10 mL'], '1 L = 1 000 mL.'),
            q('Pour mesurer le volume d’un liquide, on utilise :', ['une éprouvette graduée', 'une balance', 'un thermomètre'], 'Elle porte des graduations.'),
            q('La masse s’exprime en :', ['grammes', 'litres', 'mètres'], 'Elle se lit sur la balance.'),
        ],
        sources=[ref('ST-C3-CM2-MAT-02', 'Masse et volume')]),

    'ST-C3-CM2-NRJ-01': dict(duree=7, essentiel=
        'L’énergie permet de chauffer, d’éclairer, de mettre en mouvement.\n'
        'Un dispositif convertit une forme d’énergie en une autre : l’éolienne transforme l’énergie du vent en électricité.\n'
        'Le soleil, le vent et l’eau sont renouvelables ; le charbon, le pétrole et le gaz ne le sont pas.',
        parties=[
            ('Des conversions', [
                {'type': 'tableau', 'titre': 'Dispositifs et énergies', 'colonnes': ['Dispositif', 'Énergie reçue', 'Énergie produite'], 'lignes': [
                    ['éolienne', 'mouvement du vent', 'électrique'], ['panneau solaire', 'lumière', 'électrique'], ['lampe', 'électrique', 'lumière et chaleur'], ['muscles', 'chimique, des aliments', 'mouvement et chaleur']]},
                bq('Un panneau solaire transforme la lumière en :', ['énergie électrique', 'vent', 'charbon'], 'Il produit de l’électricité.'),
            ]),
            ('Renouvelable ou non ?', [
                vocabulaire(3, 'Énergie renouvelable'),
                {'type': 'tableau', 'titre': 'Les sources d’énergie', 'colonnes': ['Renouvelables', 'Non renouvelables'], 'lignes': [
                    ['soleil, vent', 'charbon, pétrole'], ['eau des barrages, bois', 'gaz naturel, uranium']]},
                {'type': 'piege', 'erreur': 'On croit que le pétrole se reforme vite.', 'correction': 'Il met des millions d’années à se former : il n’est pas renouvelable.'},
            ]),
        ],
        a_toi=[
            q('Quelle source d’énergie est renouvelable ?', ['le vent', 'le charbon', 'le pétrole'], 'Le vent souffle sans s’épuiser.'),
            q('Une lampe allumée produit de la lumière et :', ['de la chaleur', 'du vent', 'de l’eau'], 'Elle chauffe un peu.'),
            q('Nos muscles fonctionnent grâce à l’énergie :', ['des aliments', 'du vent', 'des piles'], 'L’énergie chimique des aliments.'),
        ],
        sources=[ref('ST-C3-CM2-NRJ-01', 'Les formes d’énergie')]),

    'ST-C3-CM2-ELEC-01': dict(duree=7, essentiel=
        'Pour qu’une lampe brille, il faut un circuit fermé : une boucle sans coupure, de la pile à la lampe.\n'
        'L’interrupteur ouvre ou ferme le circuit.\n'
        'Le courant du secteur, celui des prises, est dangereux : on ne fait jamais d’expérience avec.',
        parties=[
            ('Le circuit en boucle', [
                {'type': 'tableau', 'titre': 'Les éléments', 'colonnes': ['Élément', 'Rôle'], 'lignes': [
                    ['pile', 'fournit l’énergie électrique'], ['fils', 'conduisent le courant'], ['interrupteur', 'ouvre ou ferme le circuit'], ['lampe', 'transforme l’énergie en lumière']]},
                bq('Interrupteur ouvert : la lampe…', ['ne brille pas', 'brille plus fort', 'brille quand même'], 'Le circuit est coupé : le courant ne passe plus.'),
            ]),
            ('La sécurité', [
                {'type': 'observe', 'consigne': 'Les règles de sécurité.', 'exemples': [
                    'Ne jamais introduire d’objet dans une prise.', 'Ne pas toucher un appareil électrique avec les mains mouillées.', 'Ne jamais relier directement les deux bornes d’une pile : c’est un court-circuit.']},
                {'type': 'piege', 'erreur': 'On croit qu’une prise est sans danger comme une pile.', 'correction': 'Le courant des prises peut tuer. Les expériences se font seulement avec des piles.'},
            ]),
        ],
        a_toi=[
            q('Pour qu’une lampe brille, le circuit doit être :', ['fermé', 'ouvert', 'coupé'], 'Le courant fait une boucle.'),
            q('Relier les deux bornes d’une pile avec un fil seul, c’est :', ['un court-circuit', 'un circuit normal', 'un interrupteur'], 'La pile chauffe et s’abime.'),
            q('Les expériences électriques en classe se font avec :', ['des piles', 'les prises de courant', 'des fils dénudés branchés au mur'], 'Le courant du secteur est dangereux.'),
        ],
        sources=[ref('ST-C3-CM2-ELEC-01', 'Le circuit électrique')]),

    'ST-C3-CM2-ALIM-01': dict(duree=7, essentiel=
        'Les aliments traversent le tube digestif : bouche, œsophage, estomac, intestin grêle, gros intestin.\n'
        'Ils sont broyés et transformés en nutriments.\n'
        'Dans l’intestin grêle, les nutriments passent dans le sang. Les déchets sont rejetés.',
        parties=[
            ('Le trajet des aliments', [
                {'type': 'tableau', 'titre': 'Le tube digestif', 'colonnes': ['Organe', 'Ce qui s’y passe'], 'lignes': [
                    ['bouche', 'les dents broient, la salive mouille'], ['œsophage', 'les aliments descendent'], ['estomac', 'les aliments sont brassés et transformés'],
                    ['intestin grêle', 'les nutriments passent dans le sang'], ['gros intestin', 'les déchets s’accumulent avant d’être rejetés']]},
                bq('Où les nutriments passent-ils dans le sang ?', ['dans l’intestin grêle', 'dans la bouche', 'dans l’œsophage'], 'Sa paroi est très fine et très longue.'),
            ]),
            ('Des sucs digestifs', [
                {'type': 'explique', 'texte': 'La salive, le suc de l’estomac et les sucs du foie et du pancréas transforment les aliments.'},
                {'type': 'piege', 'erreur': 'On croit que les aliments vont dans les poumons.', 'correction': 'L’œsophage mène à l’estomac. La trachée, devant, mène aux poumons.'},
            ]),
        ],
        a_toi=[
            q('Quel organe suit la bouche ?', ['l’œsophage', 'l’estomac', 'l’intestin grêle'], 'Il descend vers l’estomac.'),
            q('Dans l’estomac, les aliments sont :', ['brassés et transformés', 'rejetés', 'broyés par les dents'], 'Le suc gastrique agit.'),
            q('Les nutriments sont transportés vers les organes par :', ['le sang', 'l’air', 'les os'], 'Ils passent de l’intestin dans le sang.'),
        ],
        sources=[ref('ST-C3-CM2-ALIM-01', 'La digestion')]),

    'ST-C3-CM2-ALIM-02': dict(duree=6, essentiel=
        'Le cœur est un muscle qui pompe le sang dans tout le corps.\n'
        'Le sang apporte aux organes les nutriments et le dioxygène.\n'
        'Les artères partent du cœur, les veines y reviennent.',
        parties=[
            ('Le transport par le sang', [
                {'type': 'tableau', 'titre': 'Ce que transporte le sang', 'colonnes': ['Quoi ?', 'D’où ?', 'Vers où ?'], 'lignes': [
                    ['nutriments', 'intestin grêle', 'tous les organes'], ['dioxygène', 'poumons', 'tous les organes'], ['dioxyde de carbone', 'tous les organes', 'poumons, puis rejeté']]},
                bq('Le sang prend le dioxygène dans :', ['les poumons', 'l’estomac', 'le cerveau'], 'L’air y entre à chaque inspiration.'),
            ]),
            ('Pendant un effort', [
                {'type': 'explique', 'texte': 'Pendant une course, les muscles ont besoin de plus de dioxygène et de nutriments. Le cœur bat plus vite.'},
                {'type': 'piege', 'erreur': 'On croit que les artères ramènent le sang au cœur.', 'correction': 'Les artères partent du cœur. Les veines ramènent le sang au cœur.'},
            ]),
        ],
        a_toi=[
            q('Le cœur est :', ['un muscle', 'un os', 'un poumon'], 'Il se contracte pour pomper le sang.'),
            q('Les veines :', ['ramènent le sang au cœur', 'partent du cœur', 'transportent de l’air'], 'Les artères partent du cœur.'),
            q('Pendant un effort, le cœur :', ['bat plus vite', 's’arrête', 'bat moins vite'], 'Les muscles ont plus de besoins.'),
        ],
        sources=[ref('ST-C3-CM2-ALIM-02', 'La circulation sanguine')]),

    'ST-C3-CM2-ALIM-03': dict(duree=6, essentiel=
        'Les aliments apportent l’énergie pour bouger et la matière pour grandir.\n'
        'Un repas équilibré associe des légumes, un féculent, une protéine, un produit laitier et un fruit.\n'
        'L’eau est la seule boisson indispensable. Les produits gras et sucrés sont à limiter.',
        parties=[
            ('Les familles d’aliments', [
                {'type': 'tableau', 'titre': 'Rôle des aliments', 'colonnes': ['Famille', 'Exemples', 'Rôle'], 'lignes': [
                    ['fruits et légumes', 'pomme, carotte', 'vitamines, fibres'], ['féculents', 'pain, pâtes, riz', 'énergie'],
                    ['viande, poisson, œufs, légumes secs', 'poulet, lentilles', 'construire les muscles'], ['produits laitiers', 'lait, yaourt, fromage', 'calcium pour les os']]},
                bq('Les féculents apportent surtout :', ['de l’énergie', 'du calcium', 'de l’eau'], 'Pain, pâtes et riz donnent de l’énergie.'),
            ]),
            ('De bonnes habitudes', [
                {'type': 'observe', 'consigne': 'Des comportements favorables à la santé.', 'exemples': [
                    'prendre un petit déjeuner', 'boire de l’eau plutôt que des sodas', 'manger varié, à heures régulières', 'bouger chaque jour']},
                {'type': 'piege', 'erreur': 'On croit qu’un aliment est bon ou mauvais en soi.', 'correction': 'C’est l’équilibre sur la journée qui compte. Un gâteau de temps en temps n’est pas un problème.'},
            ]),
        ],
        a_toi=[
            q('Les produits laitiers apportent :', ['du calcium pour les os', 'surtout du sucre', 'des fibres'], 'Le calcium solidifie les os.'),
            q('La seule boisson indispensable est :', ['l’eau', 'le soda', 'le jus de fruits'], 'Le corps en a besoin chaque jour.'),
            q('Les lentilles font partie de la famille :', ['viande, poisson, œufs, légumes secs', 'produits laitiers', 'produits sucrés'], 'Ce sont des légumes secs.'),
        ],
        sources=[ref('ST-C3-CM2-ALIM-03', 'Bien se nourrir')]),

    'ST-C3-CM2-ALIM-04': dict(duree=6, essentiel=
        'Des microorganismes servent à fabriquer des aliments : les levures font lever le pain, des bactéries transforment le lait en yaourt.\n'
        'D’autres microbes abiment les aliments.\n'
        'Pour conserver, on les ralentit ou on les détruit : froid, chaleur, séchage, sel, sucre.',
        parties=[
            ('Transformer', [
                vocabulaire(3, 'Microorganisme'),
                {'type': 'tableau', 'titre': 'Des transformations', 'colonnes': ['Aliment de départ', 'Microorganisme', 'Aliment obtenu'], 'lignes': [
                    ['pâte à pain', 'levure', 'pain'], ['lait', 'ferments, des bactéries', 'yaourt, fromage'], ['jus de raisin', 'levure', 'vin']]},
                bq('Qu’est-ce qui fait gonfler la pâte à pain ?', ['la levure', 'le sel', 'le froid'], 'Elle produit un gaz qui fait des bulles.'),
            ]),
            ('Conserver', [
                {'type': 'tableau', 'titre': 'Procédés de conservation', 'colonnes': ['Procédé', 'Exemple'], 'lignes': [
                    ['froid', 'réfrigérateur, congélateur'], ['chaleur', 'conserves, lait stérilisé'], ['séchage', 'fruits secs, pâtes'], ['sel ou sucre', 'jambon salé, confiture']]},
                {'type': 'piege', 'erreur': 'On croit que le réfrigérateur tue les microbes.', 'correction': 'Le froid les ralentit seulement. Il faut respecter la date limite.'},
            ]),
        ],
        a_toi=[
            q('Le froid du réfrigérateur :', ['ralentit les microbes', 'tue tous les microbes', 'fait pousser les microbes'], 'Il ne les détruit pas.'),
            q('La confiture se conserve grâce :', ['au sucre', 'au sel', 'à la levure'], 'Beaucoup de sucre empêche les microbes de se développer.'),
            q('Le yaourt est fabriqué grâce à :', ['des bactéries', 'du sable', 'du vinaigre'], 'Des ferments transforment le lait.'),
        ],
        sources=[ref('ST-C3-CM2-ALIM-04', 'Produire et conserver les aliments')]),

    'ST-C3-CM2-VIV-01': dict(duree=7, essentiel=
        'Une graine germe, la jeune plante pousse, puis elle fleurit.\n'
        'Après la pollinisation, la fleur se transforme en fruit, qui contient des graines.\n'
        'Ces graines sont dispersées et donnent de nouvelles plantes : le cycle recommence.',
        parties=[
            ('De la graine au fruit', [
                vocabulaire(3, 'Pollinisation'),
                {'type': 'methode', 'titre': 'Le cycle du haricot', 'etapes': [
                    'La graine germe : une racine, puis une tige sortent.', 'La plante pousse et fait des feuilles.', 'Elle fleurit.',
                    'Les fleurs pollinisées deviennent des gousses : ce sont les fruits.', 'Les gousses contiennent de nouvelles graines.']},
                bq('Dans quoi se trouvent les graines ?', ['dans le fruit', 'dans la racine', 'dans les feuilles'], 'La fleur devient un fruit plein de graines.'),
            ]),
            ('Les besoins', [
                {'type': 'tableau', 'titre': 'Ce dont la plante a besoin', 'colonnes': ['Étape', 'Besoins'], 'lignes': [
                    ['germination', 'eau, air, chaleur'], ['croissance', 'eau, lumière, sels minéraux du sol']]},
                {'type': 'piege', 'erreur': 'On croit qu’une graine a besoin de lumière pour germer.', 'correction': 'Elle germe dans le noir si elle a de l’eau et de la chaleur. La plante a ensuite besoin de lumière.'},
            ]),
        ],
        a_toi=[
            q('Qui transporte souvent le pollen d’une fleur à l’autre ?', ['les insectes', 'les poissons', 'les vers de terre'], 'Les abeilles, par exemple.'),
            q('Après la pollinisation, la fleur devient :', ['un fruit', 'une racine', 'une graine seule'], 'Le fruit contient les graines.'),
            q('Pour germer, une graine a besoin :', ['d’eau et de chaleur', 'de lumière seulement', 'de sel'], 'Et d’air.'),
        ],
        sources=[ref('ST-C3-CM2-VIV-01', 'Le cycle d’une plante à fleurs')]),

    'ST-C3-CM2-OBJ-01': dict(duree=5, essentiel=
        'Un objet technique est fabriqué par l’être humain pour répondre à un besoin. Un objet naturel ne l’est pas : un caillou, une plume.\n'
        'Les objets évoluent avec les besoins, les matériaux et les techniques.\n'
        'Le téléphone est passé du cadran au portable, puis au smartphone.',
        parties=[
            ('Technique ou naturel ?', [
                {'type': 'tableau', 'titre': 'Trier', 'colonnes': ['Objets techniques', 'Objets naturels'], 'lignes': [
                    ['un téléphone, une chaise', 'un caillou, une coquille'], ['un vélo, une paire de ciseaux', 'une branche, une plume']]},
                bq('Lequel est un objet technique ?', ['une paire de ciseaux', 'un coquillage', 'une pomme de pin'], 'Il a été fabriqué pour couper.'),
            ]),
            ('L’évolution du téléphone', [
                {'type': 'observe', 'consigne': 'Du XXe au XXIe siècle.', 'exemples': [
                    'téléphone fixe à cadran : on tourne un disque pour composer le numéro', 'téléphone portable, à partir des années 1990', 'smartphone : téléphone, appareil photo et Internet dans un seul objet']},
                {'type': 'piege', 'erreur': 'On croit qu’un objet évolue seulement pour être plus beau.', 'correction': 'Il évolue surtout pour répondre à de nouveaux besoins, avec de nouvelles techniques.'},
            ]),
        ],
        a_toi=[
            q('Un caillou est un objet :', ['naturel', 'technique', 'électrique'], 'Personne ne l’a fabriqué.'),
            q('Un objet technique répond à :', ['un besoin', 'une saison', 'un hasard'], 'Il est fabriqué dans un but.'),
            q('Le smartphone réunit :', ['téléphone, appareil photo et Internet', 'seulement le téléphone', 'une radio et une télévision à cadran'], 'Plusieurs fonctions dans un objet.'),
        ],
        sources=[ref('ST-C3-CM2-OBJ-01', 'Objets techniques et besoins')]),

    'ST-C3-CM2-LUM-01': dict(duree=6, essentiel=
        'La lumière se déplace en ligne droite depuis sa source.\n'
        'Un objet opaque l’arrête : derrière lui se forme une ombre.\n'
        'Dans la journée, l’ombre d’un bâton change de direction et de longueur. Elle est la plus courte vers midi.',
        parties=[
            ('Transparent, translucide, opaque', [
                {'type': 'tableau', 'titre': 'Classer les objets', 'colonnes': ['Catégorie', 'La lumière…', 'Exemple'], 'lignes': [
                    ['transparent', 'passe, on voit à travers', 'vitre'], ['translucide', 'passe, mais on ne voit pas net', 'papier calque'], ['opaque', 'ne passe pas', 'mur, carton']]},
                bq('Un mur est :', ['opaque', 'transparent', 'translucide'], 'Il arrête la lumière.'),
            ]),
            ('L’ombre du Soleil', [
                {'type': 'tableau', 'titre': 'L’ombre d’un bâton dans la journée', 'colonnes': ['Moment', 'Soleil', 'Ombre'], 'lignes': [
                    ['matin', 'bas, à l’est', 'longue, vers l’ouest'], ['vers midi', 'au plus haut', 'la plus courte'], ['soir', 'bas, à l’ouest', 'longue, vers l’est']]},
                {'type': 'piege', 'erreur': 'On croit que l’ombre est toujours au même endroit.', 'correction': 'Le Soleil semble se déplacer dans le ciel : l’ombre tourne avec lui, à l’opposé.'},
            ]),
        ],
        a_toi=[
            q('La lumière se propage :', ['en ligne droite', 'en zigzag', 'en cercle'], 'Une ombre a des bords nets pour cette raison.'),
            q('Vers midi, l’ombre d’un bâton est :', ['la plus courte', 'la plus longue', 'absente toute l’année'], 'Le Soleil est au plus haut.'),
            q('Le matin, le Soleil est à l’est. L’ombre est vers :', ['l’ouest', 'l’est', 'le Soleil'], 'À l’opposé de la source.'),
        ],
        sources=[ref('ST-C3-CM2-LUM-01', 'Lumière et ombres')]),

    'ST-C3-CM2-MEL-01': dict(duree=7, essentiel=
        'On sépare un mélange par tamisage, décantation, filtration ou évaporation.\n'
        'L’évaporation permet de récupérer le sel dissous dans l’eau.\n'
        'Lors d’une dissolution, la masse se conserve : 100 g d’eau et 10 g de sel donnent 110 g d’eau salée.',
        parties=[
            ('Quatre techniques', [
                vocabulaire(3, 'Mélange'),
                {'type': 'tableau', 'titre': 'Séparer', 'colonnes': ['Technique', 'Ce qu’elle sépare', 'Exemple'], 'lignes': [
                    ['tamisage', 'des grains de tailles différentes', 'sable et cailloux'], ['décantation', 'un solide qui tombe au fond', 'eau boueuse'],
                    ['filtration', 'un solide non dissous', 'eau et terre'], ['évaporation', 'un solide dissous', 'sel des marais salants']]},
                bq('Pour récupérer le sel dissous dans l’eau, on utilise :', ['l’évaporation', 'la filtration', 'le tamisage'], 'L’eau s’évapore, le sel reste.'),
            ]),
            ('La masse se conserve', [
                {'type': 'exemple-resolu', 'enonce': 'On dissout 10 g de sel dans 100 g d’eau. Quelle est la masse de l’eau salée ?', 'etapes': [
                    'Le sel ne disparait pas : il est dissous.', '100 + 10 = 110.'],
                 'conclusion': 'L’eau salée pèse 110 g.'},
                {'type': 'piege', 'erreur': 'On croit que le sel dissous a disparu.', 'correction': 'On ne le voit plus, mais il est toujours là : la balance le prouve, et l’eau est salée.'},
            ]),
        ],
        a_toi=[
            q('On dissout 20 g de sucre dans 200 g d’eau. L’eau sucrée pèse :', ['220 g', '200 g', '180 g'], 'La masse se conserve : 200 + 20.'),
            q('Pour retenir la terre de l’eau boueuse, on utilise :', ['un filtre', 'un aimant', 'une loupe'], 'Le filtre retient la terre.'),
            q('Dans les marais salants, le sel est récupéré par :', ['évaporation', 'filtration', 'tamisage'], 'Le soleil et le vent évaporent l’eau.'),
        ],
        sources=[ref('ST-C3-CM2-MEL-01', 'Séparer un mélange')]),

    'ST-C3-CM2-MVT-01': dict(duree=6, essentiel=
        'Un mouvement est rectiligne quand la trajectoire est une ligne droite, circulaire quand c’est un cercle.\n'
        'Un objet peut être immobile pour un observateur et en mouvement pour un autre : tout dépend du point de vue.\n'
        'Pour décrire un mouvement, on mesure aussi la distance parcourue et la durée.',
        parties=[
            ('Rectiligne ou circulaire ?', [
                {'type': 'tableau', 'titre': 'Des mouvements', 'colonnes': ['Objet', 'Mouvement'], 'lignes': [
                    ['nacelle d’une grande roue', 'circulaire'], ['bille qui roule sur une table droite', 'rectiligne'], ['aiguille d’une horloge', 'circulaire'], ['ascenseur', 'rectiligne']]},
                bq('La pointe d’une hélice qui tourne a un mouvement :', ['circulaire', 'rectiligne', 'immobile'], 'Elle décrit un cercle.'),
            ]),
            ('Le point de vue', [
                {'type': 'explique', 'texte': 'Dans un train, Léa est immobile par rapport à son siège. Pour Tom, resté sur le quai, elle se déplace.'},
                vocabulaire(3, 'Vitesse'),
                {'type': 'piege', 'erreur': 'On dit qu’un objet bouge ou ne bouge pas, sans préciser.', 'correction': 'On précise toujours par rapport à quoi : au quai, au siège, au sol.'},
            ]),
        ],
        a_toi=[
            q('Par rapport au quai, un passager assis dans un train qui roule est :', ['en mouvement', 'immobile', 'en mouvement circulaire'], 'Il s’éloigne du quai.'),
            q('Un ascenseur a un mouvement :', ['rectiligne', 'circulaire', 'en zigzag'], 'Il monte et descend en ligne droite.'),
            q('Pour calculer une vitesse, il faut :', ['une distance et une durée', 'une masse et un volume', 'une température'], 'Par exemple, en kilomètres par heure.'),
        ],
        sources=[ref('ST-C3-CM2-MVT-01', 'Décrire un mouvement')]),

    'ST-C3-CM2-CLASS-01': dict(duree=7, essentiel=
        'Un organisme est un être vivant entier. Il est formé d’appareils, eux-mêmes formés d’organes.\n'
        'L’appareil digestif comprend l’estomac, l’intestin… Le cœur est un organe de l’appareil circulatoire.\n'
        'On classe les êtres vivants selon les attributs qu’ils partagent.',
        parties=[
            ('Organisme, appareil, organe', [
                {'type': 'tableau', 'titre': 'Du plus grand au plus petit', 'colonnes': ['Niveau', 'Exemple'], 'lignes': [
                    ['organisme', 'un être humain'], ['appareil', 'l’appareil respiratoire'], ['organe', 'un poumon'], ['cellule', 'une cellule du poumon']]},
                vocabulaire(3, 'Cellule'),
                bq('L’estomac est :', ['un organe', 'un appareil', 'un organisme'], 'Il fait partie de l’appareil digestif.'),
            ]),
            ('Des groupes emboités', [
                {'type': 'explique', 'texte': 'Le chat et l’humain ont des poils et des mamelles : ce sont des mammifères. Avec la poule et la truite, ils ont un squelette interne : ce sont des vertébrés.'},
                {'type': 'piege', 'erreur': 'On classe la baleine avec les poissons, car elle vit dans l’eau.', 'correction': 'Elle a des poils et allaite ses petits : c’est un mammifère.'},
            ]),
        ],
        a_toi=[
            q('Le cœur fait partie de l’appareil :', ['circulatoire', 'digestif', 'respiratoire'], 'Il fait circuler le sang.'),
            q('Les mammifères ont :', ['des poils et des mamelles', 'des plumes', 'des écailles et des nageoires'], 'Ils allaitent leurs petits.'),
            q('Un être vivant entier est :', ['un organisme', 'un organe', 'un appareil'], 'Il est fait d’appareils et d’organes.'),
        ],
        sources=[ref('ST-C3-CM2-CLASS-01', 'Organiser et classer le vivant')]),

    'ST-C3-CM2-TERRE-01': dict(duree=6, essentiel=
        'Le Soleil est une étoile. Huit planètes tournent autour de lui ; la Terre est la troisième.\n'
        'La Terre fait le tour du Soleil en un an. Elle tourne sur elle-même en 24 heures : c’est le jour et la nuit.\n'
        'La Lune est le satellite de la Terre.',
        parties=[
            ('Le système solaire', [
                {'type': 'observe', 'consigne': 'Les huit planètes, de la plus proche à la plus éloignée du Soleil.', 'exemples': [
                    'Mercure, Vénus, Terre, Mars : petites et rocheuses.', 'Jupiter, Saturne, Uranus, Neptune : géantes et gazeuses.']},
                bq('La Terre est la … planète à partir du Soleil.', ['3e', '1re', '5e'], 'Après Mercure et Vénus.'),
            ]),
            ('Jour, nuit et année', [
                {'type': 'tableau', 'titre': 'Deux mouvements de la Terre', 'colonnes': ['Mouvement', 'Durée', 'Conséquence'], 'lignes': [
                    ['tourner sur elle-même', '24 heures', 'le jour et la nuit'], ['tourner autour du Soleil', 'environ 365 jours', 'une année']]},
                {'type': 'piege', 'erreur': 'On croit que le Soleil tourne autour de la Terre.', 'correction': 'C’est la Terre qui tourne sur elle-même : le Soleil semble se déplacer dans le ciel.'},
            ]),
        ],
        a_toi=[
            q('Le Soleil est :', ['une étoile', 'une planète', 'un satellite'], 'Il produit sa propre lumière.'),
            q('La Terre tourne sur elle-même en :', ['24 heures', '1 an', '1 mois'], 'D’où le jour et la nuit.'),
            q('La Lune tourne autour :', ['de la Terre', 'de Mars', 'de Jupiter'], 'C’est notre satellite.'),
        ],
        sources=[ref('ST-C3-CM2-TERRE-01', 'La Terre dans le système solaire')]),

    'ST-C3-CM2-METEO-01': dict(duree=5, essentiel=
        'La météo décrit le temps qu’il fait un jour donné, à un endroit.\n'
        'Le climat est le temps moyen d’une région, observé sur de longues années.\n'
        'En France métropolitaine, le climat est surtout tempéré.',
        parties=[
            ('Météo ou climat ?', [
                {'type': 'tableau', 'titre': 'Deux notions', 'colonnes': ['Critère', 'Météo', 'Climat'], 'lignes': [
                    ['durée', 'un jour, quelques jours', 'au moins 30 ans'], ['exemple', 'il pleut à Lille demain', 'les hivers sont doux en Bretagne']]},
                bq('« Demain, il fera 25 °C à Nice. » C’est :', ['la météo', 'le climat', 'une saison'], 'Le temps d’un jour précis.'),
            ]),
            ('Des climats et des instruments', [
                {'type': 'observe', 'consigne': 'Quelques climats du monde.', 'exemples': ['polaire : très froid toute l’année', 'tropical : chaud, avec une saison des pluies', 'désertique : très sec']},
                {'type': 'piege', 'erreur': 'On croit qu’un hiver froid prouve que le climat ne se réchauffe pas.', 'correction': 'Un jour froid, c’est la météo. Le climat se mesure sur de longues années.'},
            ]),
        ],
        a_toi=[
            q('Le climat se calcule sur :', ['de longues années', 'une journée', 'une semaine'], 'C’est une moyenne.'),
            q('Le pluviomètre mesure :', ['la quantité de pluie', 'la température', 'le vent'], 'En millimètres.'),
            q('Un climat très sec est :', ['désertique', 'polaire', 'tempéré'], 'Il pleut très rarement.'),
        ],
        sources=[ref('ST-C3-CM2-METEO-01', 'Météo et climat')]),

    'ST-C3-CM2-RISQ-01': dict(duree=6, essentiel=
        'La Terre est active : séismes, éruptions volcaniques et tempêtes peuvent être dangereux.\n'
        'Pendant un séisme, on s’abrite sous une table solide, loin des fenêtres.\n'
        'À l’école, on s’entraine aux bons gestes lors des exercices de sécurité.',
        parties=[
            ('Des phénomènes naturels', [
                {'type': 'tableau', 'titre': 'Phénomènes et signes', 'colonnes': ['Phénomène', 'Ce qui se passe'], 'lignes': [
                    ['séisme', 'le sol tremble'], ['éruption volcanique', 'lave, cendres et gaz sortent du volcan'], ['tempête', 'vents très violents'], ['inondation', 'l’eau déborde et envahit les terres']]},
                bq('Pendant un séisme, il faut :', ['s’abriter sous une table solide', 'prendre l’ascenseur', 'se mettre près des fenêtres'], 'La table protège des chutes d’objets.'),
            ]),
            ('Les bons gestes', [
                {'type': 'methode', 'titre': 'En cas de danger', 'etapes': [
                    'Écoute les consignes des adultes.', 'Applique le geste appris pendant les exercices.', 'Pour appeler les secours, compose le 112.']},
                {'type': 'piege', 'erreur': 'Pendant une inondation, on va chercher ses affaires à la cave.', 'correction': 'On monte en hauteur, jamais à la cave ni au sous-sol.'},
            ]),
        ],
        a_toi=[
            q('En cas d’inondation, on :', ['monte en hauteur', 'descend à la cave', 'traverse l’eau à pied'], 'L’eau envahit d’abord les parties basses.'),
            q('Le numéro d’urgence européen est le :', ['112', '118', '100'], 'Il fonctionne dans toute l’Europe.'),
            q('Une éruption volcanique rejette :', ['de la lave, des cendres et des gaz', 'de la neige', 'de l’eau de mer seulement'], 'Le magma sort du volcan.'),
        ],
        sources=[ref('ST-C3-CM2-RISQ-01', 'Séismes, volcans et risques')]),

    'ST-C3-CM2-ECO-01': dict(duree=6, essentiel=
        'Un écosystème réunit un milieu de vie et les êtres vivants qui l’habitent.\n'
        'Les espèces ont des relations : la prédation, quand l’une mange l’autre ; la coopération, quand elles s’entraident.\n'
        'Elles peuvent aussi être en compétition pour la nourriture ou la lumière.',
        parties=[
            ('Trois relations', [
                vocabulaire(3, 'Biodiversité'),
                {'type': 'tableau', 'titre': 'Les relations entre espèces', 'colonnes': ['Relation', 'Exemple'], 'lignes': [
                    ['prédation', 'la grenouille mange la libellule'], ['coopération', 'l’abeille se nourrit de la fleur et transporte son pollen'], ['compétition', 'deux arbres poussent côte à côte vers la lumière']]},
                bq('Le héron mange des poissons. C’est :', ['de la prédation', 'de la coopération', 'de la compétition'], 'Le héron est le prédateur.'),
            ]),
            ('La mare', [
                {'type': 'observe', 'consigne': 'Un écosystème de la mare.', 'exemples': ['le milieu : l’eau, la vase, les pierres', 'les êtres vivants : plantes, grenouilles, libellules, escargots']},
                {'type': 'piege', 'erreur': 'On croit que les prédateurs sont nuisibles pour l’écosystème.', 'correction': 'Ils évitent que leurs proies se multiplient trop : ils participent à l’équilibre.'},
            ]),
        ],
        a_toi=[
            q('L’abeille et la fleur s’entraident. C’est :', ['de la coopération', 'de la prédation', 'de la compétition'], 'Chacune y gagne.'),
            q('Un écosystème comprend :', ['un milieu et des êtres vivants', 'seulement des animaux', 'seulement de l’eau'], 'Et leurs relations.'),
            q('Deux oiseaux qui mangent les mêmes graines sont en :', ['compétition', 'coopération', 'prédation'], 'Ils se disputent la même nourriture.'),
        ],
        sources=[ref('ST-C3-CM2-ECO-01', 'Les relations dans un écosystème')]),

    'ST-C3-CM2-CHAIN-01': dict(duree=6, essentiel=
        'Une chaine alimentaire relie des êtres vivants par « est mangé par ».\n'
        'Les végétaux sont toujours au début : ils fabriquent leur matière grâce à la lumière.\n'
        'Plusieurs chaines reliées forment un réseau alimentaire. Les décomposeurs recyclent la matière morte.',
        parties=[
            ('Lire une chaine', [
                {'type': 'observe', 'consigne': 'Une chaine dans la prairie.', 'exemples': ['herbe → criquet → grenouille → héron', 'La flèche signifie « est mangé par ».']},
                bq('Dans « herbe → criquet → grenouille », qui mange le criquet ?', ['la grenouille', 'l’herbe', 'personne'], 'La flèche va du mangé vers le mangeur.'),
            ]),
            ('Producteurs, consommateurs, décomposeurs', [
                vocabulaire(3, 'Décomposeur'),
                {'type': 'tableau', 'titre': 'Les rôles', 'colonnes': ['Rôle', 'Exemples'], 'lignes': [
                    ['producteurs', 'herbe, algues, arbres'], ['consommateurs', 'criquet, grenouille, héron'], ['décomposeurs', 'vers de terre, champignons, bactéries']]},
                {'type': 'piege', 'erreur': 'On commence une chaine par un animal.', 'correction': 'Une chaine commence toujours par un végétal.'},
            ]),
        ],
        a_toi=[
            q('Au début d’une chaine alimentaire, on trouve :', ['un végétal', 'un prédateur', 'un décomposeur'], 'Il produit sa propre matière.'),
            q('Le ver de terre est :', ['un décomposeur', 'un producteur', 'un prédateur du héron'], 'Il transforme les feuilles mortes.'),
            q('Plusieurs chaines reliées forment :', ['un réseau alimentaire', 'une seule chaine', 'un écosystème vide'], 'Un animal mange souvent plusieurs espèces.'),
        ],
        sources=[ref('ST-C3-CM2-CHAIN-01', 'Chaines et réseaux alimentaires')]),

    'ST-C3-CM2-PUB-01': dict(duree=6, essentiel=
        'À la puberté, le corps se transforme : on grandit vite, des poils apparaissent, la voix change.\n'
        'Les organes reproducteurs deviennent capables de fonctionner.\n'
        'Chez les filles arrivent les premières règles ; chez les garçons, les testicules produisent des spermatozoïdes.',
        parties=[
            ('Les changements', [
                {'type': 'tableau', 'titre': 'À la puberté', 'colonnes': ['Filles', 'Garçons'], 'lignes': [
                    ['les seins se développent', 'la voix devient plus grave : c’est la mue'], ['les hanches s’élargissent', 'les épaules s’élargissent'], ['premières règles', 'production de spermatozoïdes']]},
                bq('La mue, chez les garçons, c’est :', ['le changement de la voix', 'la perte des cheveux', 'la chute des dents'], 'La voix devient plus grave.'),
            ]),
            ('Pouvoir se reproduire', [
                {'type': 'explique', 'texte': 'Après la puberté, les ovaires libèrent des ovules et les testicules produisent des spermatozoïdes. Le corps devient capable de se reproduire.'},
                {'type': 'piege', 'erreur': 'On croit que la puberté arrive au même âge pour tous.', 'correction': 'Elle commence souvent entre 8 et 14 ans : chacun a son rythme.'},
            ]),
        ],
        a_toi=[
            q('Chez les filles, les ovaires libèrent :', ['des ovules', 'des spermatozoïdes', 'du lait'], 'Ce sont les cellules reproductrices féminines.'),
            q('Les testicules produisent :', ['des spermatozoïdes', 'des ovules', 'de la salive'], 'Ce sont les cellules reproductrices masculines.'),
            q('Les changements de la puberté sont :', ['normaux', 'une maladie', 'rares'], 'Tout le monde passe par là.'),
        ],
        sources=[ref('ST-C3-CM2-PUB-01', 'Les changements de la puberté')]),

    'ST-C3-CM2-FONC-01': dict(duree=6, essentiel=
        'Un objet technique répond à un besoin : par exemple, s’éclairer dans le noir.\n'
        'Pour cela, il assure des fonctions techniques : produire de la lumière, fournir de l’énergie.\n'
        'Chaque fonction est réalisée par une solution technique : une LED, une pile.',
        parties=[
            ('Besoin, fonction, solution', [
                {'type': 'tableau', 'titre': 'La lampe de poche', 'colonnes': ['Fonction technique', 'Solution technique'], 'lignes': [
                    ['produire de la lumière', 'LED ou ampoule'], ['fournir l’énergie', 'pile ou batterie'], ['commander l’allumage', 'interrupteur'], ['être tenue en main', 'boitier']]},
                bq('Dans une lampe de poche, l’interrupteur sert à :', ['commander l’allumage', 'produire la lumière', 'fournir l’énergie'], 'C’est sa fonction technique.'),
            ]),
            ('Plusieurs solutions', [
                {'type': 'explique', 'texte': 'Une même fonction peut avoir plusieurs solutions. Pour fournir l’énergie : une pile, une batterie, ou une dynamo qu’on tourne.'},
                {'type': 'piege', 'erreur': 'On confond la fonction et la solution : « la fonction est la pile ».', 'correction': 'La fonction est un verbe : fournir l’énergie. La solution est l’objet : la pile.'},
            ]),
        ],
        a_toi=[
            q('« Fournir l’énergie » est :', ['une fonction technique', 'une solution technique', 'un besoin'], 'Elle commence par un verbe.'),
            q('La pile est :', ['une solution technique', 'une fonction', 'un besoin'], 'C’est l’élément qui réalise la fonction.'),
            q('Le besoin auquel répond un parapluie :', ['se protéger de la pluie', 'mesurer la pluie', 'faire pleuvoir'], 'Pourquoi a-t-on fabriqué cet objet ?'),
        ],
        sources=[ref('ST-C3-CM2-FONC-01', 'Besoin, fonction, solution')]),

    'ST-C3-CM2-CYCLE-01': dict(duree=6, essentiel=
        'Le cycle de vie d’un objet compte cinq étapes : extraction des matières premières, fabrication, transport, utilisation, fin de vie.\n'
        'Chaque étape consomme de l’énergie et peut polluer.\n'
        'Réparer, réutiliser et recycler réduisent l’impact sur l’environnement.',
        parties=[
            ('Les étapes', [
                {'type': 'methode', 'titre': 'Le cycle de vie d’un t-shirt en coton', 'etapes': [
                    'Extraction : on cultive le coton.', 'Fabrication : on file, on tisse, on teint, on coud.', 'Transport : le t-shirt voyage jusqu’au magasin.',
                    'Utilisation : on le porte et on le lave.', 'Fin de vie : on le donne, on le recycle ou on le jette.']},
                bq('Quelle est la première étape du cycle de vie d’un objet ?', ['l’extraction des matières premières', 'l’utilisation', 'le recyclage'], 'Il faut d’abord des matériaux.'),
            ]),
            ('Faire de bons choix', [
                {'type': 'observe', 'consigne': 'Des choix qui limitent l’impact.', 'exemples': ['réparer plutôt que racheter', 'donner ou vendre ce qu’on n’utilise plus', 'choisir des objets durables, fabriqués près de chez soi']},
                {'type': 'piege', 'erreur': 'On croit que seule la fin de vie pollue.', 'correction': 'La fabrication et le transport polluent souvent beaucoup plus.'},
            ]),
        ],
        a_toi=[
            q('Donner un vêtement trop petit, c’est :', ['le réutiliser', 'le recycler en usine', 'l’extraire'], 'Il sert à quelqu’un d’autre.'),
            q('Combien d’étapes compte le cycle de vie d’un objet ?', ['5', '2', '10'], 'Extraction, fabrication, transport, utilisation, fin de vie.'),
            q('Réparer un vélo plutôt qu’en acheter un neuf :', ['réduit l’impact sur l’environnement', 'pollue davantage', 'ne change rien'], 'Pas de nouvelle fabrication.'),
        ],
        sources=[ref('ST-C3-CM2-CYCLE-01', 'Cycle de vie d’un objet')]),

    'ST-C3-CM2-PROG-01': dict(duree=6, essentiel=
        'Un objet programmable reçoit des informations grâce à des capteurs.\n'
        'Un programme décide quoi faire.\n'
        'Des actionneurs agissent : une lampe s’allume, un moteur tourne, une sonnerie retentit.',
        parties=[
            ('Capteur, programme, actionneur', [
                {'type': 'tableau', 'titre': 'Des objets programmables', 'colonnes': ['Objet', 'Capteur', 'Actionneur'], 'lignes': [
                    ['éclairage public', 'détecteur de présence', 'lampe'], ['porte automatique', 'détecteur de mouvement', 'moteur'], ['radiateur avec thermostat', 'capteur de température', 'résistance chauffante']]},
                bq('Dans une porte automatique, le moteur est :', ['un actionneur', 'un capteur', 'un programme'], 'Il fait bouger la porte.'),
            ]),
            ('La chaine', [
                {'type': 'methode', 'titre': 'Comment fonctionne l’éclairage automatique', 'etapes': [
                    'Le détecteur repère un passant : c’est l’information.', 'Le programme décide : allumer.', 'La lampe s’allume : c’est l’action.']},
                {'type': 'piege', 'erreur': 'On croit que la lampe « voit » le passant.', 'correction': 'C’est le capteur qui détecte. La lampe ne fait qu’agir.'},
            ]),
        ],
        a_toi=[
            q('Un capteur sert à :', ['recevoir une information', 'faire bouger un objet', 'décider'], 'Il détecte la lumière, un mouvement, la température…'),
            q('Dans un radiateur, le thermostat contient :', ['un capteur de température', 'un moteur', 'une lampe'], 'Il mesure la température de la pièce.'),
            q('Une sonnerie qui retentit est :', ['un actionneur', 'un capteur', 'une information'], 'Elle agit.'),
        ],
        sources=[ref('ST-C3-CM2-PROG-01', 'Capteurs et actionneurs')]),

    'ST-C3-CM2-ALGO-01': dict(duree=6, essentiel=
        'Un algorithme est une suite d’instructions pour faire agir un robot.\n'
        'Une boucle répète des instructions : « répéter 4 fois ».\n'
        'Une condition fait choisir : « si un obstacle est devant, alors tourner, sinon avancer ».',
        parties=[
            ('Répéter', [
                {'type': 'exemple-resolu', 'enonce': 'Que trace le robot ? « Répéter 4 fois : avancer de 10, tourner à droite de 90°. »', 'etapes': [
                    'Il avance, puis tourne d’un quart de tour.', 'Après 4 fois, il a fait un tour complet et revient au départ.'],
                 'conclusion': 'Il trace un carré.'},
                bq('Pour tracer un triangle équilatéral, on répète 3 fois : avancer, puis tourner de :', ['120°', '90°', '60°'], '3 × 120° = 360° : un tour complet.'),
            ]),
            ('Choisir avec une condition', [
                {'type': 'methode', 'titre': 'Un robot aspirateur', 'etapes': [
                    'Si le capteur détecte un obstacle, alors tourner.', 'Sinon, avancer.', 'Répéter tant que la batterie n’est pas vide.']},
                {'type': 'piege', 'erreur': 'On écrit toutes les instructions une par une, même quand elles se répètent.', 'correction': 'Une boucle rend le programme plus court et plus clair.'},
            ]),
        ],
        a_toi=[
            q('« Si… alors… sinon » est :', ['une condition', 'une boucle', 'un capteur'], 'Elle fait choisir entre deux actions.'),
            q('« Répéter 6 fois » est :', ['une boucle', 'une condition', 'un actionneur'], 'Elle répète des instructions.'),
            q('Un algorithme est :', ['une suite d’instructions', 'un robot', 'un écran'], 'Le robot l’exécute.'),
        ],
        sources=[ref('ST-C3-CM2-ALGO-01', 'Programmer un robot')]),
}

ecrire(COURS)
