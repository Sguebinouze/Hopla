"""Lot de cours : histoire-géographie et sciences CM1 (programmes 2026). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-cm1-monde.py
    python3 scripts/cours/pages.py content/cours/HG-C3-CM1-*.json content/cours/ST-C3-CM1-*.json

Cycle 3 : phrases de 20 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
Repères historiques : ceux du programme (bo22-2026-histoire-geo-c2-c3, CM1).
"""
from commun import bq, ecrire, q, source_referentiel as ref, vocabulaire

COURS = {
    # ------------------------------------------------------------------ Histoire
    'HG-C3-CM1-HIST-01': dict(duree=8, essentiel=
        'Au Moyen Âge (476-1492), les campagnes sont organisées en seigneuries.\n'
        'Le seigneur protège les paysans dans son château ; en échange, ils lui doivent des taxes et des corvées.\n'
        'L’Église encadre la vie de chacun, aide les pauvres et les malades, et fait bâtir églises romanes puis gothiques.',
        parties=[
            ('La seigneurie', [
                {'type': 'tableau', 'titre': 'Qui fait quoi ?', 'colonnes': ['Groupe', 'Rôle', 'Obligations'], 'lignes': [
                    ['le seigneur', 'protège et rend la justice', 'combat pour son suzerain'],
                    ['les paysannes et paysans', 'cultivent la terre', 'taxes et corvées pour le seigneur, dime pour l’Église'],
                    ['le clergé', 'prie, soigne, enseigne', 'encadre la paroisse']]},
                {'type': 'explique', 'texte': 'Le château protège les habitants, loge le seigneur et montre sa puissance.'},
                bq('La corvée, c’est :', ['un travail gratuit pour le seigneur', 'un impôt payé au roi', 'une fête au village'], 'Les paysans travaillent sur les terres du seigneur sans être payés.'),
            ]),
            ('Art roman et art gothique', [
                {'type': 'tableau', 'titre': 'Deux styles d’églises', 'colonnes': ['Style', 'Murs et fenêtres', 'Exemple'], 'lignes': [
                    ['roman (XIe-XIIe s.)', 'murs épais, petites fenêtres, arcs arrondis', 'abbaye de Cluny'],
                    ['gothique (XIIe-XIIIe s.)', 'murs plus fins, grands vitraux, arcs brisés, grande hauteur', 'Notre-Dame de Paris']]},
                {'type': 'piege', 'erreur': 'On croit que le Moyen Âge est une période figée.', 'correction': 'Il dure près de mille ans : villes, foires et cathédrales s’y développent.'},
            ]),
        ],
        a_toi=[
            q('La dime est versée :', ['à l’Église', 'au roi', 'aux marchands'], 'C’est une part des récoltes.'),
            q('Notre-Dame de Paris est de style :', ['gothique', 'roman', 'moderne'], 'Grands vitraux et grande hauteur.'),
            q('Le Moyen Âge va de :', ['476 à 1492', '1492 à 1789', '52 av. J.-C. à 476'], 'De la fin de l’Empire romain d’Occident à Christophe Colomb.'),
        ],
        sources=[ref('HG-C3-CM1-HIST-01', 'La vie quotidienne au Moyen Âge')]),

    'HG-C3-CM1-HIST-02': dict(duree=8, essentiel=
        'François Ier (1515-1547) est un roi mécène : il accueille Léonard de Vinci et diffuse la Renaissance.\n'
        'Henri IV (1589-1610) ramène la paix entre catholiques et protestants avec l’édit de Nantes (1598).\n'
        'Louis XIV (1643-1715) gouverne seul : Versailles montre son pouvoir absolu.',
        parties=[
            ('Trois rois', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1515, 'date': '1515', 'evenement': 'François Ier devient roi.'},
                    {'annee': 1598, 'date': '1598', 'evenement': 'Édit de Nantes signé par Henri IV.'},
                    {'annee': 1643, 'date': '1643', 'evenement': 'Début du règne de Louis XIV.'},
                    {'annee': 1715, 'date': '1715', 'evenement': 'Mort de Louis XIV.'}]},
                {'type': 'tableau', 'titre': 'Comment chacun incarne le pouvoir', 'colonnes': ['Roi', 'Ce qu’il fait'], 'lignes': [
                    ['François Ier', 'protège les artistes, comme Léonard de Vinci, mort en France en 1519'],
                    ['Henri IV', 'met fin aux guerres de religion'], ['Louis XIV', 'gouverne seul, depuis le château de Versailles']]},
                bq('Quel roi signe l’édit de Nantes ?', ['Henri IV', 'Louis XIV', 'François Ier'], 'En 1598, pour apaiser catholiques et protestants.'),
            ]),
            ('La société d’ordres', [
                {'type': 'tableau', 'titre': 'Trois ordres', 'colonnes': ['Ordre', 'Qui ?'], 'lignes': [
                    ['clergé', 'les hommes et femmes d’Église'], ['noblesse', 'les nobles, qui ont des privilèges'], ['tiers état', 'tous les autres, surtout des paysans']]},
                {'type': 'piege', 'erreur': 'On croit que le tiers état est le plus petit ordre.', 'correction': 'C’est l’immense majorité de la population.'},
            ]),
        ],
        a_toi=[
            q('Un mécène est quelqu’un qui :', ['aide et protège des artistes', 'fait la guerre', 'collecte les impôts'], 'Comme François Ier avec Léonard de Vinci.'),
            q('Le château de Versailles montre :', ['le pouvoir absolu du roi', 'la puissance de l’Église', 'la vie des paysans'], 'Louis XIV y vit avec sa Cour.'),
            q('Les paysans appartiennent :', ['au tiers état', 'à la noblesse', 'au clergé'], 'Le tiers état regroupe la majorité.'),
        ],
        sources=[ref('HG-C3-CM1-HIST-02', 'La monarchie en France')]),

    'HG-C3-CM1-HIST-03': dict(duree=8, essentiel=
        'Grâce à la caravelle, à la boussole et à de meilleures cartes, les Européens explorent le monde.\n'
        '1492 : Christophe Colomb débarque en Amérique. 1519-1522 : l’expédition de Magellan fait le tour du monde.\n'
        'Les Européens fondent des empires coloniaux et organisent la traite des esclaves africains.',
        parties=[
            ('Naviguer au grand large', [
                {'type': 'tableau', 'titre': 'Des inventions', 'colonnes': ['Invention', 'À quoi elle sert'], 'lignes': [
                    ['caravelle', 'un navire rapide qui remonte le vent'], ['boussole', 'indiquer le nord'], ['astrolabe', 'se repérer avec les étoiles'], ['cartes', 'tracer et suivre les routes']]},
                bq('Quel instrument indique le nord ?', ['la boussole', 'la caravelle', 'le gouvernail'], 'Son aiguille pointe vers le nord.'),
            ]),
            ('Conquêtes et traite', [
                {'type': 'explique', 'texte': 'En Amérique, les populations amérindiennes sont massacrées, réduites en esclavage, et décimées par des maladies venues d’Europe.'},
                {'type': 'explique', 'texte': 'Des Africains sont déportés vers les plantations d’Amérique : c’est la traite. Le Code noir de 1685 encadre l’esclavage dans les colonies françaises.'},
                {'type': 'observe', 'consigne': 'Des produits venus des colonies.', 'exemples': ['la tomate', 'le chocolat', 'la pomme de terre', 'le sucre de canne']},
                {'type': 'piege', 'erreur': 'On croit que Colomb savait qu’il arrivait sur un nouveau continent.', 'correction': 'Il pensait avoir atteint les Indes, en Asie.'},
            ]),
        ],
        a_toi=[
            q('En quelle année Colomb débarque-t-il en Amérique ?', ['1492', '1515', '1789'], 'C’est aussi la fin du Moyen Âge.'),
            q('La traite, c’est :', ['le commerce d’esclaves africains', 'une route maritime', 'un impôt'], 'Des Africains sont déportés vers l’Amérique.'),
            q('Quel produit vient d’Amérique ?', ['la pomme de terre', 'le blé', 'le raisin'], 'Elle arrive en Europe après les conquêtes.'),
        ],
        sources=[ref('HG-C3-CM1-HIST-03', 'Explorations et conquêtes')]),

    'HG-C3-CM1-HIST-04': dict(duree=7, essentiel=
        'En 1789, le royaume connait une crise : le pain est cher et l’État manque d’argent.\n'
        'Au printemps, les Français rédigent des cahiers de doléances et les États généraux se réunissent.\n'
        '14 juillet : prise de la Bastille. 4 aout : abolition des privilèges. 26 aout : Déclaration des droits.',
        parties=[
            ('Les évènements de 1789', [
                {'type': 'tableau', 'titre': 'L’année 1789', 'colonnes': ['Date', 'Évènement'], 'lignes': [
                    ['printemps', 'cahiers de doléances et réunion des États généraux'], ['14 juillet', 'prise de la Bastille'],
                    ['nuit du 4 aout', 'abolition des privilèges'], ['26 aout', 'Déclaration des droits de l’homme et du citoyen'],
                    ['5 et 6 octobre', 'marche des femmes sur Versailles']]},
                bq('Que se passe-t-il le 14 juillet 1789 ?', ['la prise de la Bastille', 'la mort de Louis XIV', 'l’édit de Nantes'], 'C’est aujourd’hui la fête nationale.'),
            ]),
            ('Les femmes en 1789', [
                {'type': 'explique', 'texte': 'Les 5 et 6 octobre, des Parisiennes marchent jusqu’à Versailles pour réclamer du pain. Elles ramènent le roi à Paris.'},
                {'type': 'piege', 'erreur': 'On croit que la Révolution met fin à la royauté dès 1789.', 'correction': 'En 1789, le roi reste en place, mais son pouvoir n’est plus absolu.'},
            ]),
        ],
        a_toi=[
            q('Dans les cahiers de doléances, les Français écrivent :', ['leurs plaintes et leurs souhaits', 'des recettes', 'des poèmes'], 'Ils sont rédigés avant les États généraux.'),
            q('La nuit du 4 aout 1789, on abolit :', ['les privilèges', 'la monarchie', 'l’Église'], 'Les nobles et le clergé perdent leurs avantages.'),
            q('Pourquoi les femmes marchent-elles sur Versailles ?', ['pour réclamer du pain', 'pour une fête', 'pour visiter le château'], 'Le pain est très cher.'),
        ],
        sources=[ref('HG-C3-CM1-HIST-04', '1789, une année révolutionnaire')]),

    'HG-C3-CM1-HIST-05': dict(duree=7, essentiel=
        'Les philosophes des Lumières défendent la liberté, l’égalité et la raison.\n'
        'En 1789, la société d’ordres disparait : tous sont égaux devant la loi.\n'
        'Le pouvoir n’appartient plus au roi seul : il vient de la nation. C’est la souveraineté nationale.',
        parties=[
            ('Les idées des Lumières', [
                {'type': 'tableau', 'titre': 'Des philosophes', 'colonnes': ['Philosophe', 'Une idée'], 'lignes': [
                    ['Montesquieu', 'séparer les pouvoirs pour éviter qu’un seul décide de tout'], ['Voltaire', 'tolérer toutes les religions'],
                    ['Rousseau', 'le peuple doit décider des lois'], ['Diderot', 'diffuser les savoirs dans l’Encyclopédie']]},
                bq('Montesquieu propose de :', ['séparer les pouvoirs', 'garder un roi absolu', 'supprimer les lois'], 'Personne ne doit avoir tous les pouvoirs.'),
            ]),
            ('De nouveaux principes', [
                vocabulaire(3, 'Citoyen'),
                {'type': 'explique', 'texte': 'La Déclaration du 26 aout 1789 commence ainsi : « Les hommes naissent et demeurent libres et égaux en droits. »'},
                {'type': 'tableau', 'titre': 'Avant et après 1789', 'colonnes': ['Ancien Régime', 'Après 1789'], 'lignes': [
                    ['trois ordres, des privilèges', 'égalité devant la loi'], ['le roi décide seul', 'le pouvoir vient de la nation'], ['sujets du roi', 'citoyens']]},
                {'type': 'piege', 'erreur': 'On croit que tous obtiennent les mêmes droits politiques dès 1789.', 'correction': 'Les femmes et les plus pauvres n’ont pas encore le droit de vote.'},
            ]),
        ],
        a_toi=[
            q('La souveraineté nationale veut dire que le pouvoir vient :', ['de la nation', 'du roi seul', 'de l’Église'], 'Les citoyens et leurs représentants décident.'),
            q('Après 1789, devant la loi, tous sont :', ['égaux', 'classés en trois ordres', 'privilégiés'], 'Les privilèges sont abolis.'),
            q('L’Encyclopédie est dirigée par :', ['Diderot', 'Louis XIV', 'Colomb'], 'Elle rassemble les savoirs de l’époque.'),
        ],
        sources=[ref('HG-C3-CM1-HIST-05', 'Fin de l’Ancien Régime et nouveaux principes')]),

    # ---------------------------------------------------------------- Géographie
    'HG-C3-CM1-GEO-01': dict(duree=6, essentiel=
        'On ne mange pas de la même façon partout : la ration est très riche dans certains pays, insuffisante ailleurs.\n'
        'Un produit agricole sort de la ferme ; un produit transformé passe par une usine.\n'
        'De la ferme au magasin, un aliment suit une chaine de production.',
        parties=[
            ('Des différences', [
                {'type': 'tableau', 'titre': 'Se nourrir dans le monde', 'colonnes': ['Situation', 'Exemples de pays'], 'lignes': [
                    ['ration très riche', 'États-Unis, France'], ['ration insuffisante', 'Haïti, Madagascar']]},
                {'type': 'explique', 'texte': 'La sous-nutrition, c’est ne pas manger assez. La malnutrition, c’est manger mal : trop peu ou trop, sans équilibre.'},
                bq('Ne pas manger assez, c’est :', ['la sous-nutrition', 'la suralimentation', 'un régime'], 'Le corps manque d’énergie.'),
            ]),
            ('La chaine d’un yaourt', [
                {'type': 'methode', 'titre': 'Du lait au yaourt', 'etapes': [
                    'À la ferme, on trait les vaches : le lait est un produit agricole.', 'À l’usine, on ajoute des ferments : le yaourt est un produit transformé.',
                    'Des camions frigorifiques le transportent.', 'Le magasin le vend.']},
                {'type': 'piege', 'erreur': 'On croit qu’un aliment acheté au magasin est forcément transformé.', 'correction': 'Une pomme ou une carotte restent des produits agricoles.'},
            ]),
        ],
        a_toi=[
            q('Lequel est un produit transformé ?', ['un biscuit', 'une pomme', 'un œuf frais'], 'Il est fabriqué en usine.'),
            q('Le lait sorti de la ferme est :', ['un produit agricole', 'un produit transformé', 'un produit minéral'], 'Il n’a pas encore été transformé.'),
            q('La malnutrition, c’est :', ['une alimentation déséquilibrée', 'un repas de fête', 'une recette'], 'Trop peu ou trop, sans équilibre.'),
        ],
        sources=[ref('HG-C3-CM1-GEO-01', 'Se nourrir dans le monde')]),

    'HG-C3-CM1-GEO-02': dict(duree=6, essentiel=
        'Dans le monde, tout le monde n’a pas le même accès à l’eau potable, à la santé ou à l’école.\n'
        'Ces inégalités séparent des pays riches et des pays en développement, et existent aussi à l’intérieur d’un pays.\n'
        'On décrit le monde par grandes aires régionales : Europe, Afrique subsaharienne, Asie de l’Est…',
        parties=[
            ('Les aires régionales', [
                {'type': 'tableau', 'titre': 'Les aires régionales du programme', 'colonnes': ['Continent', 'Aires'], 'lignes': [
                    ['Afrique', 'Afrique subsaharienne, Maghreb'], ['Amérique', 'Amérique du Nord, Amérique du Sud'],
                    ['Asie', 'Asie du Sud-Est, Asie de l’Est'], ['Europe', 'Europe'], ['Océanie', 'Océanie']]},
                bq('Le Maroc, l’Algérie et la Tunisie forment :', ['le Maghreb', 'l’Asie de l’Est', 'l’Océanie'], 'Le Maghreb est au nord de l’Afrique.'),
            ]),
            ('L’accès à l’eau', [
                {'type': 'explique', 'texte': 'Dans certaines régions, il faut marcher longtemps pour chercher de l’eau. Ailleurs, elle coule au robinet.'},
                {'type': 'piege', 'erreur': 'On croit que les inégalités existent seulement entre pays.', 'correction': 'Dans un même pays, des quartiers ou des régions sont plus favorisés que d’autres.'},
            ]),
        ],
        a_toi=[
            q('L’eau potable est une eau :', ['qu’on peut boire sans danger', 'salée', 'gelée'], 'Elle est propre et sûre.'),
            q('Le Japon et la Chine sont en :', ['Asie de l’Est', 'Asie du Sud-Est', 'Océanie'], 'Deux pays de l’Asie de l’Est.'),
            q('Les inégalités d’accès à l’école existent :', ['entre pays et à l’intérieur des pays', 'seulement en Europe', 'nulle part'], 'Elles se voient à plusieurs échelles.'),
        ],
        sources=[ref('HG-C3-CM1-GEO-02', 'Les inégalités dans le monde')]),

    'HG-C3-CM1-GEO-03': dict(duree=5, essentiel=
        'Pour se déplacer, on marche, on roule à vélo, ou on prend la voiture, le train, le bateau, l’avion.\n'
        'Chaque mode de transport a ses infrastructures : route, gare, station, port, aéroport.\n'
        'On mesure un déplacement en kilomètres ou en temps de trajet.',
        parties=[
            ('Modes et infrastructures', [
                {'type': 'tableau', 'titre': 'Qui va avec quoi ?', 'colonnes': ['Mode de transport', 'Infrastructure'], 'lignes': [
                    ['vélo', 'voie cyclable'], ['voiture', 'route'], ['métro', 'station'], ['train', 'gare'], ['bateau', 'port'], ['avion', 'aéroport']]},
                bq('Un avion décolle :', ['d’un aéroport', 'd’un port', 'd’une gare'], 'L’aéroport a des pistes.'),
            ]),
            ('Distance en kilomètres ou en temps', [
                {'type': 'explique', 'texte': 'Paris-Lyon, c’est environ 400 km par la route. En TGV, cela prend environ 2 heures.'},
                {'type': 'piege', 'erreur': 'On croit que plus c’est loin, plus c’est long.', 'correction': 'Un trajet court en ville peut durer plus longtemps qu’un trajet long en TGV.'},
            ]),
        ],
        a_toi=[
            q('On peut mesurer un trajet :', ['en kilomètres ou en temps', 'seulement en kilomètres', 'en litres'], 'Deux façons de mesurer.'),
            q('Un bateau accoste dans :', ['un port', 'une gare', 'une station'], 'Le port est au bord de l’eau.'),
            q('Quel mode de transport ne rejette pas de fumée ?', ['la marche', 'la voiture à essence', 'l’avion'], 'On se déplace avec ses jambes.'),
        ],
        sources=[ref('HG-C3-CM1-GEO-03', 'Se déplacer')]),

    'HG-C3-CM1-GEO-04': dict(duree=5, essentiel=
        'Internet relie des ordinateurs du monde entier.\n'
        'Les données voyagent surtout par des câbles, sous les océans et sur les continents, et aussi par satellite.\n'
        'L’accès à Internet est inégal : très bon en Europe ou en Amérique du Nord, faible dans une partie de l’Afrique.',
        parties=[
            ('Comment ça marche ?', [
                {'type': 'explique', 'texte': 'Ton message part de ta box et rejoint de grands câbles. Il traverse parfois l’océan par un câble sous-marin.'},
                {'type': 'piege', 'erreur': 'On croit qu’Internet passe surtout par les satellites.', 'correction': 'La plupart des données passent par des câbles sous-marins.'},
                bq('Entre l’Europe et l’Amérique, les données passent surtout par :', ['des câbles sous-marins', 'des pigeons', 'des avions'], 'Des câbles posés au fond de l’Atlantique.'),
            ]),
            ('Un accès inégal', [
                {'type': 'tableau', 'titre': 'Accès à Internet', 'colonnes': ['Aire régionale', 'Accès'], 'lignes': [
                    ['Europe, Amérique du Nord', 'très bien reliées'], ['Afrique subsaharienne', 'faiblement reliée']]},
                {'type': 'explique', 'texte': 'En France aussi, la 5G arrive d’abord dans les villes, plus tard dans les campagnes.'},
            ]),
        ],
        a_toi=[
            q('Internet repose sur :', ['des câbles et des satellites', 'des fils de laine', 'la radio seulement'], 'Un réseau mondial.'),
            q('Une aire faiblement reliée à Internet :', ['une partie de l’Afrique subsaharienne', 'l’Europe', 'l’Amérique du Nord'], 'Les câbles et les antennes y sont moins nombreux.'),
            q('En France, la 5G est d’abord installée :', ['dans les villes', 'en haute montagne', 'en mer'], 'Là où vivent beaucoup d’habitants.'),
        ],
        sources=[ref('HG-C3-CM1-GEO-04', 'Communiquer avec Internet')]),

    # ------------------------------------------------------------------ Sciences
    'ST-C3-CM1-MAT-01': dict(duree=7, essentiel=
        'Un mélange est homogène si on ne distingue plus ses constituants, hétérogène si on les voit.\n'
        'On sépare un mélange par tamisage, décantation ou filtration.\n'
        'Le sel et le sucre se dissolvent dans l’eau ; au-delà d’une certaine quantité, ils ne se dissolvent plus.',
        parties=[
            ('Homogène ou hétérogène ?', [
                vocabulaire(3, 'Mélange'),
                {'type': 'tableau', 'titre': 'Des mélanges', 'colonnes': ['Homogène', 'Hétérogène'], 'lignes': [
                    ['eau sucrée', 'eau et sable'], ['sirop dilué', 'huile et eau'], ['eau salée', 'cailloux et gravier']]},
                bq('L’eau salée est un mélange :', ['homogène', 'hétérogène', 'impossible'], 'On ne voit plus le sel.'),
            ]),
            ('Séparer', [
                {'type': 'tableau', 'titre': 'Trois techniques', 'colonnes': ['Technique', 'Comment', 'Exemple'], 'lignes': [
                    ['tamisage', 'des tamis, des plus larges aux plus fins', 'cailloux, gravier, sable'],
                    ['décantation', 'on attend que le solide tombe au fond', 'eau boueuse'],
                    ['filtration', 'un filtre retient le solide', 'eau et terre, filtre à café']]},
                {'type': 'piege', 'erreur': 'On croit qu’on peut récupérer le sel dissous avec un filtre.', 'correction': 'Le sel dissous traverse le filtre. C’est même le signe qu’il est dissous.'},
            ]),
        ],
        a_toi=[
            q('Pour séparer des cailloux du sable, on utilise :', ['un tamis', 'un aimant', 'un thermomètre'], 'Le sable passe, les cailloux restent.'),
            q('Lequel se dissout dans l’eau ?', ['le sucre', 'le sable', 'le gravier'], 'On ne le voit plus.'),
            q('Si on ajoute trop de sel, il :', ['ne se dissout plus', 'disparait toujours', 'devient du sucre'], 'L’eau est saturée.'),
        ],
        sources=[ref('ST-C3-CM1-MAT-01', 'Mélanges et séparations')]),

    'ST-C3-CM1-MVT-01': dict(duree=5, essentiel=
        'Pour décrire un déplacement, on mesure la distance parcourue et la durée.\n'
        'La distance se mesure avec un mètre ou un décamètre, en mètres ou en kilomètres.\n'
        'La durée se mesure avec un chronomètre, entre l’instant de départ et l’instant d’arrivée.',
        parties=[
            ('Mesurer', [
                vocabulaire(3, 'Distance'),
                {'type': 'tableau', 'titre': 'Instruments et unités', 'colonnes': ['Grandeur', 'Instrument', 'Unités'], 'lignes': [
                    ['distance', 'mètre, décamètre', 'm, km'], ['durée', 'chronomètre', 's, min']]},
                bq('Pour mesurer la durée d’une course, on utilise :', ['un chronomètre', 'une balance', 'un thermomètre'], 'Il mesure le temps écoulé.'),
            ]),
            ('Une expérience', [
                {'type': 'methode', 'titre': 'Mesurer le trajet d’une petite voiture', 'etapes': [
                    'Marque le point de départ et le point d’arrivée.', 'Mesure la distance entre les deux.', 'Chronomètre le trajet.', 'Recommence pour vérifier ta mesure.']},
                {'type': 'piege', 'erreur': 'On fait une seule mesure et on la croit exacte.', 'correction': 'On répète la mesure : les résultats varient un peu.'},
            ]),
        ],
        a_toi=[
            q('Une distance s’exprime en :', ['mètres', 'secondes', 'grammes'], 'C’est une longueur.'),
            q('Une durée se mesure entre :', ['deux instants', 'deux points', 'deux masses'], 'Le départ et l’arrivée.'),
            q('Pourquoi répéter une mesure ?', ['pour vérifier le résultat', 'pour perdre du temps', 'pour changer d’unité'], 'Une mesure peut varier.'),
        ],
        sources=[ref('ST-C3-CM1-MVT-01', 'Mesurer distances et durées')]),

    'ST-C3-CM1-SIG-01': dict(duree=7, essentiel=
        'Un matériau transparent laisse passer la lumière, un translucide la laisse passer en partie, un opaque l’arrête.\n'
        'Un objet opaque éclairé a une ombre propre, sur sa partie non éclairée. Il projette une ombre portée sur un écran.\n'
        'L’ombre portée est toujours à l’opposé de la source de lumière.',
        parties=[
            ('Laisser passer la lumière', [
                vocabulaire(3, 'Signal'),
                {'type': 'tableau', 'titre': 'Trier les matériaux', 'colonnes': ['Transparent', 'Translucide', 'Opaque'], 'lignes': [
                    ['vitre', 'papier calque', 'carton'], ['eau claire', 'verre dépoli', 'bois']]},
                bq('Le papier calque est :', ['translucide', 'opaque', 'transparent'], 'La lumière passe, mais on ne voit pas net au travers.'),
            ]),
            ('Les ombres', [
                {'type': 'explique', 'texte': 'Plus l’objet est proche de la lampe, plus son ombre portée est grande.'},
                {'type': 'piege', 'erreur': 'On croit que l’ombre est du côté de la lampe.', 'correction': 'L’ombre portée est à l’opposé de la source, derrière l’objet.'},
                bq('Le matin, le Soleil est à l’est. L’ombre d’un arbre est vers :', ['l’ouest', 'l’est', 'le Soleil'], 'Elle est à l’opposé de la source.'),
            ]),
        ],
        a_toi=[
            q('Un matériau qui arrête la lumière est :', ['opaque', 'transparent', 'translucide'], 'Il fait de l’ombre.'),
            q('La partie non éclairée de l’objet est :', ['l’ombre propre', 'l’ombre portée', 'la source'], 'Elle est sur l’objet lui-même.'),
            q('Pour agrandir l’ombre portée, on approche l’objet :', ['de la lampe', 'de l’écran', 'du sol'], 'Plus près de la source, ombre plus grande.'),
        ],
        sources=[ref('ST-C3-CM1-SIG-01', 'Lumière et ombres')]),

    'ST-C3-CM1-VIV-01': dict(duree=7, essentiel=
        'Une espèce regroupe des êtres vivants qui peuvent se reproduire ensemble et avoir des petits eux-mêmes féconds.\n'
        'On classe les êtres vivants en groupes emboités, selon les attributs qu’ils possèdent.\n'
        'Une clé de détermination aide à identifier une espèce par une suite de questions.',
        parties=[
            ('Classer selon ce qu’ils ont', [
                {'type': 'tableau', 'titre': 'Quatre animaux, leurs attributs', 'colonnes': ['Attribut', 'Qui le possède ?'], 'lignes': [
                    ['squelette interne', 'chat, poule, truite'], ['quatre membres', 'chat, poule'], ['poils', 'chat'], ['plumes', 'poule']]},
                {'type': 'explique', 'texte': 'Les groupes s’emboitent : chat et poule ont quatre membres ; avec la truite, ils ont tous un squelette interne. L’escargot n’en a pas.'},
                bq('Qui est le plus proche du chat ?', ['la poule', 'la truite', 'l’escargot'], 'Ils partagent le plus d’attributs.'),
            ]),
            ('La clé de détermination', [
                {'type': 'methode', 'titre': 'Utiliser une clé', 'etapes': [
                    'Lis la première question : a-t-il des plumes ?', 'Suis la flèche oui ou non.', 'Continue jusqu’au nom de l’espèce.']},
                {'type': 'piege', 'erreur': 'On classe selon ce que l’animal n’a pas, ou selon son lieu de vie.', 'correction': 'On classe selon les attributs qu’il possède : la baleine a des poils et allaite, comme le chat.'},
            ]),
        ],
        a_toi=[
            q('Une espèce regroupe des individus qui :', ['peuvent se reproduire ensemble', 'vivent au même endroit', 'ont la même couleur'], 'Et leurs petits sont féconds.'),
            q('Le chat et la poule ont tous les deux :', ['quatre membres et un squelette interne', 'des plumes', 'des poils'], 'Ils sont dans les mêmes groupes emboités.'),
            q('Une clé de détermination sert à :', ['identifier une espèce', 'ouvrir une porte', 'mesurer un animal'], 'Par une suite de questions.'),
        ],
        sources=[ref('ST-C3-CM1-VIV-01', 'Classer les êtres vivants')]),

    'ST-C3-CM1-VIV-02': dict(duree=7, essentiel=
        'Chez les animaux, la vie commence par une fécondation, interne ou externe.\n'
        'Les ovipares pondent des œufs : l’embryon s’y développe. Les vivipares portent le petit dans leur ventre.\n'
        'Une fécondation externe donne toujours des ovipares ; une fécondation interne, des ovipares ou des vivipares.',
        parties=[
            ('Fécondation interne ou externe', [
                vocabulaire(3, 'Fécondation'),
                {'type': 'tableau', 'titre': 'Des exemples', 'colonnes': ['Animal', 'Fécondation', 'Reproduction'], 'lignes': [
                    ['grenouille', 'externe, dans l’eau', 'ovipare'], ['truite', 'externe, dans l’eau', 'ovipare'],
                    ['poule', 'interne', 'ovipare'], ['chatte', 'interne', 'vivipare']]},
                bq('La poule pond des œufs : elle est :', ['ovipare', 'vivipare', 'végétale'], 'L’embryon se développe dans l’œuf.'),
            ]),
            ('Les étapes du développement', [
                {'type': 'methode', 'titre': 'De la fécondation à la naissance', 'etapes': [
                    'Fécondation : un embryon commence à se former.', 'Développement de l’embryon, dans l’œuf ou dans le ventre de la mère.', 'Éclosion ou naissance du petit ou de la larve.']},
                {'type': 'piege', 'erreur': 'On croit que tous les animaux à fécondation interne sont vivipares.', 'correction': 'La poule a une fécondation interne, mais elle pond des œufs.'},
            ]),
        ],
        a_toi=[
            q('Un animal qui porte son petit dans son ventre est :', ['vivipare', 'ovipare', 'carnivore'], 'Comme les mammifères.'),
            q('Chez la grenouille, la fécondation est :', ['externe', 'interne', 'absente'], 'Elle a lieu dans l’eau.'),
            q('Que sort-il de l’œuf de grenouille ?', ['un têtard', 'une grenouille adulte', 'un poisson'], 'C’est une larve.'),
        ],
        sources=[ref('ST-C3-CM1-VIV-02', 'Ovipares et vivipares')]),

    'ST-C3-CM1-ECO-01': dict(duree=7, essentiel=
        'Un écosystème, c’est un milieu de vie, les êtres vivants qui l’habitent et leurs relations.\n'
        'Un réseau alimentaire relie qui mange qui ; la flèche va du mangé vers le mangeur.\n'
        'Si une espèce disparait ou se multiplie, tout le réseau est touché.',
        parties=[
            ('Le réseau alimentaire', [
                vocabulaire(3, 'Biodiversité'),
                {'type': 'observe', 'consigne': 'Dans une mare.', 'exemples': [
                    'algues → têtard → libellule', 'algues → escargot → poisson', 'libellule → grenouille → héron']},
                {'type': 'piege', 'erreur': 'On met la flèche du mangeur vers le mangé.', 'correction': 'La flèche suit la matière : du mangé vers le mangeur.'},
                bq('Dans « algues → escargot », qui mange qui ?', ['l’escargot mange les algues', 'les algues mangent l’escargot', 'personne'], 'La flèche va vers le mangeur.'),
            ]),
            ('Les actions humaines', [
                {'type': 'explique', 'texte': 'La surpêche fait disparaitre des poissons : leurs prédateurs manquent de nourriture. Une espèce invasive, comme le frelon asiatique, mange des abeilles.'},
            ]),
        ],
        a_toi=[
            q('Un écosystème comprend :', ['un milieu, des êtres vivants et leurs relations', 'seulement des animaux', 'seulement des plantes'], 'Les trois ensemble.'),
            q('Si les poissons d’un lac disparaissent, le héron :', ['manque de nourriture', 'n’est pas touché', 'mange des pierres'], 'Tout le réseau est relié.'),
            q('Au début d’un réseau alimentaire, on trouve :', ['des végétaux', 'des prédateurs', 'des humains'], 'Ils produisent leur propre matière.'),
        ],
        sources=[ref('ST-C3-CM1-ECO-01', 'Écosystèmes et réseaux alimentaires')]),

    'ST-C3-CM1-TER-01': dict(duree=6, essentiel=
        'Le thermomètre mesure la température en degrés Celsius (°C).\n'
        'Le pluviomètre mesure la pluie en millimètres (mm) ; l’anémomètre mesure la vitesse du vent.\n'
        'On note les mesures chaque jour dans un tableau, puis on les représente par un graphique.',
        parties=[
            ('Des capteurs', [
                {'type': 'tableau', 'titre': 'Les instruments de la station météo', 'colonnes': ['Instrument', 'Il mesure', 'Unité'], 'lignes': [
                    ['thermomètre', 'la température', '°C'], ['pluviomètre', 'la quantité de pluie', 'mm'], ['anémomètre', 'la vitesse du vent', 'km/h'], ['girouette', 'la direction du vent', 'nord, sud, est, ouest']]},
                bq('Pour mesurer la pluie, on utilise :', ['un pluviomètre', 'un anémomètre', 'une girouette'], 'Il recueille l’eau de pluie.'),
            ]),
            ('Suivre les variations', [
                {'type': 'explique', 'texte': '1 mm de pluie, c’est 1 litre d’eau tombé sur 1 mètre carré.'},
                {'type': 'piege', 'erreur': 'On mesure la température en plein soleil.', 'correction': 'On la mesure à l’ombre, toujours au même endroit et à la même heure.'},
            ]),
        ],
        a_toi=[
            q('La vitesse du vent se mesure avec :', ['un anémomètre', 'un thermomètre', 'un pluviomètre'], 'Ses coupelles tournent avec le vent.'),
            q('La pluie se mesure en :', ['millimètres', 'degrés', 'kilogrammes'], 'Hauteur d’eau tombée.'),
            q('Pour comparer les températures d’une semaine, on fait :', ['un graphique', 'une recette', 'une carte de France'], 'Il montre l’évolution.'),
        ],
        sources=[ref('ST-C3-CM1-TER-01', 'Mesures météorologiques')]),

    'ST-C3-CM1-CORPS-01': dict(duree=6, essentiel=
        'Le cerveau est un organe protégé par le crâne.\n'
        'Il reçoit les informations des sens, commande les mouvements, permet de parler, de mémoriser et de ressentir des émotions.\n'
        'Pour bien apprendre : se concentrer sur une tâche, répéter souvent, et bien dormir.',
        parties=[
            ('Ce que fait le cerveau', [
                {'type': 'tableau', 'titre': 'Les grandes fonctions', 'colonnes': ['Fonction', 'Exemple'], 'lignes': [
                    ['percevoir', 'voir, entendre, sentir'], ['commander', 'bouger la main'], ['parler', 'trouver ses mots'], ['mémoriser', 'retenir une poésie'], ['ressentir', 'la joie, la peur'], ['rêver', 'pendant le sommeil']]},
                {'type': 'explique', 'texte': 'Les illusions d’optique montrent que le cerveau interprète ce que voient nos yeux : il peut se tromper.'},
                bq('Où se trouve le cerveau ?', ['dans le crâne', 'dans le ventre', 'dans la poitrine'], 'Le crâne le protège.'),
            ]),
            ('Mieux apprendre', [
                {'type': 'methode', 'titre': 'Pour mémoriser une leçon', 'etapes': [
                    'Éloigne les écrans et les bruits.', 'Lis, puis cache et redis avec tes mots.', 'Recommence le lendemain, puis quelques jours plus tard.', 'Dors bien : le sommeil range les souvenirs.']},
                {'type': 'piege', 'erreur': 'On croit qu’on apprend mieux en faisant deux choses à la fois.', 'correction': 'L’attention marche mieux sur une seule tâche.'},
            ]),
        ],
        a_toi=[
            q('Quand on révise plusieurs fois, espacé dans le temps :', ['on retient mieux', 'on oublie plus vite', 'ça ne change rien'], 'La mémoire se renforce.'),
            q('Une illusion d’optique montre que :', ['le cerveau interprète ce qu’on voit', 'les yeux sont malades', 'la lumière ment'], 'Il peut se tromper.'),
            q('Quelle fonction n’est pas commandée par le cerveau ?', ['aucune de ces fonctions', 'parler', 'bouger'], 'Il commande toutes ces fonctions.'),
        ],
        sources=[ref('ST-C3-CM1-CORPS-01', 'Le cerveau')]),

    'ST-C3-CM1-CORPS-02': dict(duree=5, essentiel=
        'La puberté est la période où le corps de l’enfant devient progressivement celui d’un adulte.\n'
        'La taille et la masse augmentent vite, des poils apparaissent, les seins se développent, les hanches s’élargissent.\n'
        'Elle ne commence pas au même âge pour tous : ces différences sont normales.',
        parties=[
            ('Les changements', [
                {'type': 'tableau', 'titre': 'À la puberté', 'colonnes': ['Changement', 'Chez qui ?'], 'lignes': [
                    ['taille et masse augmentent vite', 'filles et garçons'], ['poils sous les bras et au pubis', 'filles et garçons'],
                    ['seins qui se développent, hanches qui s’élargissent', 'surtout les filles'], ['organes génitaux qui se développent', 'filles et garçons']]},
                bq('Pendant la puberté, la taille :', ['augmente vite', 'diminue', 'ne change pas'], 'Les courbes de croissance montrent une forte hausse.'),
            ]),
            ('Chacun son rythme', [
                {'type': 'explique', 'texte': 'La puberté commence le plus souvent entre 8 et 14 ans. Certains changent tôt, d’autres plus tard.'},
                {'type': 'piege', 'erreur': 'On croit qu’un enfant qui change plus tard est anormal.', 'correction': 'Chacun a son rythme. On respecte le corps des autres.'},
            ]),
        ],
        a_toi=[
            q('La puberté commence :', ['à des âges différents', 'le même jour pour tous', 'à 18 ans'], 'Chacun a son rythme.'),
            q('Ces changements sont :', ['normaux', 'des maladies', 'rares'], 'Tout le monde passe par la puberté.'),
            q('Face aux changements des autres, on :', ['les respecte', 'se moque', 'les montre du doigt'], 'Le respect du corps de chacun.'),
        ],
        sources=[ref('ST-C3-CM1-CORPS-02', 'La puberté')]),

    'ST-C3-CM1-OBJ-01': dict(duree=6, essentiel=
        'Un objet technique est fait de composants qui assurent chacun une fonction.\n'
        'Dans une lampe torche : la pile fournit l’énergie, l’interrupteur commande, la LED éclaire, le boitier protège.\n'
        'Un croquis légendé montre ces composants et leur rôle.',
        parties=[
            ('Composants et fonctions', [
                {'type': 'tableau', 'titre': 'La lampe torche', 'colonnes': ['Composant', 'Fonction'], 'lignes': [
                    ['pile', 'fournir l’énergie'], ['interrupteur', 'allumer et éteindre'], ['LED', 'produire la lumière'], ['réflecteur', 'diriger la lumière'], ['boitier', 'protéger et tenir en main']]},
                bq('Dans la lampe torche, qui fournit l’énergie ?', ['la pile', 'le boitier', 'le réflecteur'], 'Sans pile, rien ne s’allume.'),
            ]),
            ('Le croquis', [
                {'type': 'methode', 'titre': 'Pour faire un croquis', 'etapes': [
                    'Dessine l’objet simplement, au crayon.', 'Trace un trait vers chaque composant.', 'Écris son nom et sa fonction.']},
                {'type': 'piege', 'erreur': 'On dessine tous les détails, comme une photo.', 'correction': 'Un croquis est simple : il montre seulement ce qui sert à comprendre.'},
            ]),
        ],
        a_toi=[
            q('L’interrupteur sert à :', ['allumer et éteindre', 'protéger', 'produire la lumière'], 'Il ouvre ou ferme le circuit.'),
            q('Un croquis légendé indique :', ['les composants et leur rôle', 'le prix de l’objet', 'la couleur exacte'], 'C’est un dessin qui explique.'),
            q('Sur un vélo, quelle partie sert à freiner ?', ['les freins', 'la selle', 'la sonnette'], 'Chaque composant a une fonction.'),
        ],
        sources=[ref('ST-C3-CM1-OBJ-01', 'Fonctionnement d’un objet technique')]),

    'ST-C3-CM1-PROG-01': dict(duree=6, essentiel=
        'Un programme est une suite d’instructions, exécutées dans l’ordre.\n'
        'Une boucle répète des instructions : « répéter 4 fois ».\n'
        'Traduire un programme en langage naturel, c’est dire avec des mots ce qu’il fait.',
        parties=[
            ('Lire un programme', [
                {'type': 'exemple-resolu', 'enonce': 'Programme : « Quand le drapeau est cliqué, répéter 4 fois : avancer de 50 pas, tourner de 90° à droite. »', 'etapes': [
                    'Le personnage avance, puis tourne d’un quart de tour.', 'Il le fait 4 fois : il revient à son point de départ.'],
                 'conclusion': 'Il trace un carré.'},
                bq('Combien de fois s’exécute « avancer » dans ce programme ?', ['4 fois', '1 fois', '50 fois'], 'La boucle répète 4 fois.'),
            ]),
            ('Écrire un programme', [
                {'type': 'methode', 'titre': 'Pour programmer un déplacement', 'etapes': [
                    'Décris le trajet avec des mots.', 'Découpe-le en actions simples.', 'Repère ce qui se répète : c’est une boucle.', 'Teste, puis corrige.']},
                {'type': 'piege', 'erreur': 'On croit que l’ordre des instructions n’a pas d’importance.', 'correction': 'Tourner puis avancer ne donne pas le même trajet qu’avancer puis tourner.'},
            ]),
        ],
        a_toi=[
            q('Une boucle sert à :', ['répéter des instructions', 'arrêter le programme', 'changer de couleur'], 'Répéter 4 fois, répéter jusqu’à…'),
            q('Pour tracer un triangle équilatéral, on répète 3 fois avancer et tourner de :', ['120°', '90°', '60°'], '3 × 120° = 360° : un tour complet.'),
            q('Un programme s’exécute :', ['dans l’ordre des instructions', 'au hasard', 'à l’envers'], 'Une instruction après l’autre.'),
        ],
        sources=[ref('ST-C3-CM1-PROG-01', 'Programmer un objet')]),

    'ST-C3-CM1-MAT-03': dict(duree=5, essentiel=
        'La balance mesure la masse d’un objet, en grammes ou en kilogrammes.\n'
        'Pour peser un liquide, on pose d’abord le récipient vide, puis on appuie sur « tare » : la balance affiche 0.\n'
        'Sans tare, on soustrait la masse du récipient vide à celle du récipient plein.',
        parties=[
            ('Utiliser la tare', [
                {'type': 'methode', 'titre': 'Peser 200 g d’eau', 'etapes': [
                    'Pose le verre vide sur la balance.', 'Appuie sur « tare » : elle affiche 0 g.', 'Verse l’eau jusqu’à lire 200 g.']},
                bq('La touche « tare » sert à :', ['ne pas compter le récipient', 'allumer la balance', 'changer d’unité'], 'La balance repart de 0.'),
            ]),
            ('Par le calcul', [
                {'type': 'exemple-resolu', 'enonce': 'Un bocal vide pèse 150 g. Plein de riz, il pèse 650 g. Quelle est la masse du riz ?', 'etapes': [
                    '650 − 150 = 500.'],
                 'conclusion': 'Le riz pèse 500 g.'},
                {'type': 'piege', 'erreur': 'On lit la masse du bocal plein comme celle du riz.', 'correction': 'Il faut retirer la masse du bocal.'},
            ]),
        ],
        a_toi=[
            q('Un seau vide pèse 1 kg, plein il pèse 6 kg. Le contenu pèse :', ['5 kg', '7 kg', '6 kg'], '6 − 1 = 5.'),
            q('Après la tare, la balance affiche :', ['0', 'la masse du récipient', '100'], 'Le récipient n’est plus compté.'),
            q('La masse se mesure avec :', ['une balance', 'un chronomètre', 'une règle'], 'En grammes ou kilogrammes.'),
        ],
        sources=[ref('ST-C3-CM1-MAT-03', 'Mesurer une masse')]),

    'ST-C3-CM1-TECH-03': dict(duree=5, essentiel=
        'Un objet technique évolue avec les époques, les lieux et les besoins.\n'
        'Le train est passé de la locomotive à vapeur aux trains électriques et au TGV.\n'
        'Les vêtements sont passés des peaux de bêtes à la laine, au coton, puis aux fibres synthétiques.',
        parties=[
            ('L’évolution du train', [
                {'type': 'tableau', 'titre': 'Du XIXe siècle à aujourd’hui', 'colonnes': ['Époque', 'Train', 'Énergie'], 'lignes': [
                    ['XIXe siècle', 'locomotive à vapeur', 'charbon'], ['XXe siècle', 'locomotive diesel ou électrique', 'gazole, électricité'], ['depuis 1981', 'TGV', 'électricité']]},
                bq('La première énergie des trains était :', ['le charbon', 'l’électricité', 'le vent'], 'Il chauffait l’eau de la machine à vapeur.'),
            ]),
            ('L’évolution des textiles', [
                {'type': 'observe', 'consigne': 'Des matières pour s’habiller.', 'exemples': [
                    'Préhistoire : peaux de bêtes.', 'Puis laine et lin, tissés.', 'Coton, puis fibres synthétiques au XXe siècle.']},
                {'type': 'piege', 'erreur': 'On croit qu’un objet nouveau remplace partout l’ancien.', 'correction': 'Selon les lieux et les besoins, plusieurs versions existent en même temps.'},
            ]),
        ],
        a_toi=[
            q('Le TGV fonctionne à :', ['l’électricité', 'la vapeur', 'la voile'], 'Il prend le courant par la caténaire.'),
            q('Les premiers vêtements étaient en :', ['peaux de bêtes', 'nylon', 'coton synthétique'], 'À la Préhistoire.'),
            q('Un objet évolue pour :', ['répondre à de nouveaux besoins', 'changer de nom', 'rester identique'], 'Nouvelles exigences, nouvelles technologies.'),
        ],
        sources=[ref('ST-C3-CM1-TECH-03', 'Évolution d’un objet technique')]),
}

ecrire(COURS)
