"""Lot de cours : histoire-géographie 4e (programme 2020). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-4e-histoire-geographie.py
    python3 scripts/cours/pages.py content/cours/HG-C4-4E-*.json

Cycle 4 : phrases de 25 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
Chiffres mondiaux arrondis et formulés comme des ordres de grandeur.
"""
from commun import bq, ecrire, q, source_referentiel as ref

COURS = {
    # ------------------------------------------------------------------ Histoire
    'HG-C4-4E-HIST-01': dict(duree=8, essentiel=
        'Aux XVIIe et XVIIIe siècles, des navires partis des ports européens échangent en Afrique des marchandises contre des captifs.\n'
        'Les captifs sont déportés vers les plantations d’Amérique et réduits en esclavage. Sucre, café et coton reviennent en Europe : c’est le commerce triangulaire.\n'
        'En France, l’esclavage est aboli en 1794, rétabli en 1802, puis aboli définitivement en 1848.',
        parties=[
            ('Le commerce triangulaire', [
                {'type': 'methode', 'titre': 'Les trois étapes', 'etapes': [
                    'Départ d’Europe, de Nantes ou Bordeaux : tissus, armes, alcool.', 'Sur les côtes d’Afrique : ces marchandises sont échangées contre des captifs.',
                    'Traversée de l’Atlantique : les captifs sont vendus aux planteurs d’Amérique.', 'Retour en Europe : sucre, café, coton, tabac.']},
                bq('Quel port français s’enrichit le plus de la traite au XVIIIe siècle ?', ['Nantes', 'Strasbourg', 'Lyon'], 'Premier port négrier français.'),
            ]),
            ('L’esclavage dans les colonies', [
                {'type': 'explique', 'texte': 'À Saint-Domingue, les esclaves travaillent dans les plantations de canne à sucre. Le Code noir de 1685 les considère comme des biens.'},
                {'type': 'frise', 'reperes': [
                    {'annee': 1685, 'date': '1685', 'evenement': 'Code noir.'},
                    {'annee': 1794, 'date': '1794', 'evenement': 'Première abolition.'},
                    {'annee': 1804, 'date': '1804', 'evenement': 'Indépendance d’Haïti.'},
                    {'annee': 1848, 'date': '1848', 'evenement': 'Abolition définitive, avec Victor Schœlcher.'}]},
                {'type': 'piege', 'erreur': 'On croit que les esclaves ont accepté leur sort sans résister.', 'correction': 'Ils résistent : fuites, révoltes. En 1791, la révolte de Saint-Domingue mène à l’indépendance d’Haïti.'},
            ]),
        ],
        a_toi=[
            q('Le Code noir de 1685 :', ['encadre l’esclavage dans les colonies françaises', 'abolit l’esclavage', 'crée la République'], 'Il traite les esclaves comme des biens.'),
            q('L’esclavage est aboli définitivement en France en :', ['1848', '1794', '1685'], 'Après un rétablissement en 1802.'),
            q('Que rapportent les navires en Europe ?', ['du sucre, du café, du coton', 'des captifs', 'des armes'], 'Des produits des plantations.'),
        ],
        sources=[ref('HG-C4-4E-HIST-01', 'Traites négrières et esclavage')]),

    'HG-C4-4E-HIST-02': dict(duree=7, essentiel=
        'Au XVIIIe siècle, les philosophes des Lumières veulent éclairer les esprits par la raison.\n'
        'Ils défendent la liberté, la tolérance et critiquent la monarchie absolue.\n'
        'Leurs idées circulent dans les livres, l’Encyclopédie, les salons et les cafés.',
        parties=[
            ('Des philosophes et leurs idées', [
                {'type': 'tableau', 'titre': 'Les Lumières', 'colonnes': ['Philosophe', 'Œuvre', 'Idée'], 'lignes': [
                    ['Montesquieu', 'De l’esprit des lois (1748)', 'séparer les pouvoirs législatif, exécutif et judiciaire'], ['Voltaire', 'Traité sur la tolérance (1763)', 'tolérance religieuse'],
                    ['Rousseau', 'Du contrat social (1762)', 'la souveraineté appartient au peuple'], ['Diderot et d’Alembert', 'l’Encyclopédie', 'diffuser les savoirs']]},
                bq('Qui propose de séparer les pouvoirs ?', ['Montesquieu', 'Voltaire', 'Louis XIV'], 'Dans De l’esprit des lois.'),
            ]),
            ('La diffusion des idées', [
                {'type': 'explique', 'texte': 'Les livres critiques sont parfois interdits. Ils circulent malgré tout, imprimés à l’étranger et lus dans les salons.'},
                {'type': 'piege', 'erreur': 'On croit que les philosophes des Lumières veulent tous supprimer le roi.', 'correction': 'Beaucoup veulent limiter son pouvoir, pas forcément le supprimer.'},
            ]),
        ],
        a_toi=[
            q('Les Lumières font confiance avant tout à :', ['la raison', 'la tradition', 'la force'], 'Pour éclairer les esprits.'),
            q('Voltaire défend :', ['la tolérance religieuse', 'la monarchie absolue', 'la censure'], 'Dans le Traité sur la tolérance.'),
            q('L’Encyclopédie a pour but de :', ['diffuser les connaissances', 'raconter la vie du roi', 'interdire les livres'], 'Dirigée par Diderot et d’Alembert.'),
        ],
        sources=[ref('HG-C4-4E-HIST-02', 'L’Europe des Lumières')]),

    'HG-C4-4E-HIST-03': dict(duree=8, essentiel=
        'La Révolution française met fin à la monarchie absolue et à la société d’ordres. Le 26 aout 1789, l’Assemblée adopte la Déclaration des droits de l’homme et du citoyen.\n'
        'La République est proclamée en 1792.\n'
        'Napoléon Bonaparte prend le pouvoir en 1799 et devient empereur en 1804. Il conserve certains acquis : le Code civil, l’égalité devant la loi.',
        parties=[
            ('Les grandes étapes', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1789, 'date': '1789', 'evenement': 'États généraux, prise de la Bastille, Déclaration des droits.'},
                    {'annee': 1792, 'date': '1792', 'evenement': 'Proclamation de la République.'},
                    {'annee': 1799, 'date': '1799', 'evenement': 'Coup d’État de Bonaparte.'},
                    {'annee': 1804, 'date': '1804', 'evenement': 'Napoléon empereur ; Code civil.'},
                    {'annee': 1815, 'date': '1815', 'evenement': 'Défaite de Waterloo.'}]},
                bq('La République est proclamée en :', ['1792', '1789', '1804'], 'Après la chute de la monarchie.'),
            ]),
            ('Ce qui reste de cette période', [
                {'type': 'tableau', 'titre': 'Des héritages', 'colonnes': ['Domaine', 'Héritage'], 'lignes': [
                    ['politique', 'souveraineté nationale, droits de l’homme'], ['société', 'fin des privilèges, égalité devant la loi'], ['administration', 'départements, préfets, lycées, Code civil']]},
                {'type': 'piege', 'erreur': 'On croit que Napoléon prolonge la République démocratique.', 'correction': 'Il gouverne de façon autoritaire : censure, pouvoir personnel. Il garde certains acquis de 1789.'},
            ]),
        ],
        a_toi=[
            q('Le Code civil de 1804 :', ['rassemble les lois civiles de la France', 'rétablit les privilèges', 'crée les départements'], 'Il fixe l’égalité devant la loi.'),
            q('Les préfets, créés en 1800, représentent :', ['l’État dans chaque département', 'les paysans', 'l’Église'], 'Une administration centralisée.'),
            q('Napoléon est battu définitivement à :', ['Waterloo', 'Austerlitz', 'Bouvines'], 'En 1815.'),
        ],
        sources=[ref('HG-C4-4E-HIST-03', 'La Révolution et l’Empire')]),

    'HG-C4-4E-HIST-04': dict(duree=8, essentiel=
        'L’industrialisation commence au Royaume-Uni à la fin du XVIIIe siècle, puis gagne l’Europe au XIXe siècle.\n'
        'Machines à vapeur, charbon, acier et chemin de fer transforment la production, les villes et les campagnes.\n'
        'Une nouvelle classe sociale apparait, les ouvriers, et de nouvelles idées : le socialisme, le syndicalisme.',
        parties=[
            ('Produire autrement', [
                {'type': 'tableau', 'titre': 'Les moteurs de l’industrialisation', 'colonnes': ['Facteur', 'Rôle'], 'lignes': [
                    ['énergie', 'charbon, vapeur, puis électricité et pétrole'], ['innovations', 'machines textiles, hauts fourneaux'], ['transports', 'chemins de fer, bateaux à vapeur'], ['capitaux', 'banques et sociétés par actions']]},
                bq('L’industrialisation commence d’abord :', ['au Royaume-Uni', 'en Chine', 'aux États-Unis'], 'À la fin du XVIIIe siècle.'),
            ]),
            ('Une société transformée', [
                {'type': 'explique', 'texte': 'Les ouvriers, hommes, femmes et enfants, travaillent de longues journées pour de bas salaires. Ils s’organisent en syndicats, autorisés en France en 1884.'},
                {'type': 'explique', 'texte': 'En 1848, Karl Marx et Friedrich Engels publient le Manifeste du Parti communiste.'},
                {'type': 'piege', 'erreur': 'On croit que l’industrialisation touche toute l’Europe en même temps.', 'correction': 'Elle se diffuse par étapes : Royaume-Uni, puis Belgique, France, Allemagne.'},
            ]),
        ],
        a_toi=[
            q('Le prolétariat désigne :', ['les ouvriers qui vendent leur force de travail', 'les patrons d’usine', 'les paysans propriétaires'], 'Ils ne possèdent pas les moyens de production.'),
            q('Les syndicats sont autorisés en France en :', ['1884', '1789', '1944'], 'Par la loi Waldeck-Rousseau.'),
            q('Une région industrielle du XIXe siècle comporte :', ['usines, cheminées, terrils, cités ouvrières', 'châteaux forts', 'champs sans villages'], 'Comme dans le bassin minier du Nord.'),
        ],
        sources=[ref('HG-C4-4E-HIST-04', 'La révolution industrielle')]),

    'HG-C4-4E-HIST-05': dict(duree=8, essentiel=
        'Au XIXe siècle, les puissances européennes conquièrent de vastes territoires en Afrique et en Asie.\n'
        'La conquête de l’Algérie commence en 1830. À la fin du siècle, l’empire colonial français s’étend de l’Afrique de l’Ouest à l’Indochine.\n'
        'Dans les colonies, colons et colonisés n’ont pas les mêmes droits.',
        parties=[
            ('Pourquoi coloniser ?', [
                {'type': 'tableau', 'titre': 'Les motivations', 'colonnes': ['Motivation', 'Exemple'], 'lignes': [
                    ['économique', 'matières premières, débouchés pour l’industrie'], ['stratégique', 'ports et escales pour la flotte'], ['politique', 'puissance et prestige national'], ['idéologique', 'prétendue « mission civilisatrice »']]},
                bq('La conquête de l’Algérie commence en :', ['1830', '1885', '1962'], 'Elle dure plusieurs décennies.'),
            ]),
            ('La société coloniale', [
                {'type': 'explique', 'texte': 'En Algérie, le code de l’indigénat impose aux colonisés des règles et des punitions spéciales. Ils sont privés de la plupart des droits politiques.'},
                {'type': 'explique', 'texte': 'La colonisation rencontre des résistances, comme celle de l’émir Abd el-Kader en Algérie.'},
                {'type': 'piege', 'erreur': 'On croit que la « mission civilisatrice » décrit la réalité.', 'correction': 'C’est un discours qui justifie la domination. Les colonisés subissent violences et inégalités.'},
            ]),
        ],
        a_toi=[
            q('Un colon est :', ['un Européen installé dans une colonie', 'un habitant colonisé', 'un soldat ennemi'], 'Il bénéficie de droits que les colonisés n’ont pas.'),
            q('L’Indochine est une colonie française située en :', ['Asie', 'Afrique', 'Amérique'], 'Le Vietnam, le Laos et le Cambodge actuels.'),
            q('Le code de l’indigénat :', ['impose des règles spéciales aux colonisés', 'donne le droit de vote à tous', 'abolit la colonisation'], 'Il institue l’inégalité.'),
        ],
        sources=[ref('HG-C4-4E-HIST-05', 'Conquêtes et sociétés coloniales')]),

    'HG-C4-4E-HIST-06': dict(duree=7, essentiel=
        'En 1848, le suffrage universel masculin est instauré : tous les hommes de plus de 21 ans peuvent voter.\n'
        'Après le Second Empire, la IIIe République, née en 1870, s’enracine grâce aux lois sur les libertés, l’école et la laïcité.\n'
        'Les femmes restent exclues du vote jusqu’en 1944.',
        parties=[
            ('Une République qui s’enracine', [
                {'type': 'tableau', 'titre': 'Les grandes lois', 'colonnes': ['Année', 'Loi'], 'lignes': [
                    ['1881', 'liberté de la presse, liberté de réunion'], ['1881-1882', 'école gratuite, laïque et obligatoire'], ['1884', 'liberté syndicale'], ['1905', 'séparation des Églises et de l’État']]},
                bq('La loi de 1905 établit :', ['la séparation des Églises et de l’État', 'le vote des femmes', 'l’école obligatoire'], 'L’État ne reconnait ni ne finance aucun culte.'),
            ]),
            ('L’affaire Dreyfus', [
                {'type': 'explique', 'texte': 'En 1894, le capitaine Dreyfus, juif, est condamné à tort pour trahison. L’affaire divise la France jusqu’à sa réhabilitation en 1906.'},
                {'type': 'piege', 'erreur': 'On croit que le suffrage de 1848 est vraiment universel.', 'correction': 'Il exclut les femmes : il est seulement masculin.'},
            ]),
        ],
        a_toi=[
            q('La IIIe République est proclamée en :', ['1870', '1848', '1958'], 'Après la défaite contre la Prusse.'),
            q('Les femmes votent en France grâce à une ordonnance de :', ['1944', '1848', '1905'], 'Elles votent pour la première fois en 1945.'),
            q('Dreyfus est :', ['un officier condamné à tort', 'un président', 'un philosophe des Lumières'], 'Il est réhabilité en 1906.'),
        ],
        sources=[ref('HG-C4-4E-HIST-06', 'Voter et la IIIe République')]),

    'HG-C4-4E-HIST-07': dict(duree=6, essentiel=
        'Au XIXe siècle, le Code civil de 1804 place la femme mariée sous l’autorité de son mari.\n'
        'Beaucoup de femmes travaillent : à la ferme, à l’usine, comme domestiques. Leurs salaires sont plus bas que ceux des hommes.\n'
        'Peu à peu, elles obtiennent des droits : lycées publics pour les filles en 1880, libre disposition de leur salaire en 1907.',
        parties=[
            ('Des droits limités', [
                {'type': 'tableau', 'titre': 'La femme mariée selon le Code civil', 'colonnes': ['Domaine', 'Situation'], 'lignes': [
                    ['autorité', 'elle doit obéissance à son mari'], ['argent', 'elle ne gère pas ses biens'], ['politique', 'elle ne vote pas']]},
                bq('En 1907, les femmes mariées obtiennent :', ['le droit de disposer de leur salaire', 'le droit de vote', 'le droit d’être élues députées'], 'Elles peuvent gérer l’argent qu’elles gagnent.'),
            ]),
            ('Des combats', [
                {'type': 'explique', 'texte': 'Hubertine Auclert milite pour le vote des femmes dès les années 1870. Marie Curie reçoit deux prix Nobel, en 1903 et 1911.'},
                {'type': 'piege', 'erreur': 'On croit que les femmes ne travaillaient pas au XIXe siècle.', 'correction': 'Elles travaillent beaucoup, mais leur travail est moins payé et peu reconnu.'},
            ]),
        ],
        a_toi=[
            q('Le Code civil de 1804 place la femme mariée sous l’autorité :', ['de son mari', 'du préfet', 'du maire'], 'Elle lui doit obéissance.'),
            q('Hubertine Auclert milite pour :', ['le droit de vote des femmes', 'la monarchie', 'la colonisation'], 'Elle est une figure du féminisme.'),
            q('Marie Curie est :', ['une scientifique deux fois prix Nobel', 'une reine', 'une philosophe des Lumières'], 'En physique puis en chimie.'),
        ],
        sources=[ref('HG-C4-4E-HIST-07', 'Les femmes au XIXe siècle')]),

    # ---------------------------------------------------------------- Géographie
    'HG-C4-4E-GEO-01': dict(duree=7, essentiel=
        'Depuis 2007, plus de la moitié de l’humanité vit en ville.\n'
        'Une ville s’organise du centre vers les périphéries : centre-ville, banlieues, espaces périurbains.\n'
        'Dans les pays pauvres, une partie des habitants vit dans des quartiers précaires, les bidonvilles.',
        parties=[
            ('Du centre aux périphéries', [
                {'type': 'tableau', 'titre': 'Les espaces d’une ville', 'colonnes': ['Espace', 'Caractères'], 'lignes': [
                    ['centre', 'commerces, monuments, bureaux, forte densité'], ['banlieue', 'quartiers résidentiels, grands ensembles, zones d’activités'], ['périurbain', 'maisons individuelles en campagne, longs trajets'], ['bidonville', 'habitat précaire, sans services de base']]},
                bq('Le périurbain, c’est :', ['des espaces à la campagne où vivent des citadins', 'le centre historique', 'un quartier d’affaires'], 'On y vit, mais on travaille souvent en ville.'),
            ]),
            ('L’étalement urbain', [
                {'type': 'explique', 'texte': 'Les villes grandissent en occupant de plus en plus d’espace. Cet étalement grignote les terres agricoles et allonge les déplacements.'},
                {'type': 'piege', 'erreur': 'On croit que toutes les grandes villes sont dans les pays riches.', 'correction': 'Beaucoup des plus grandes agglomérations sont en Asie, en Afrique et en Amérique latine.'},
            ]),
        ],
        a_toi=[
            q('Depuis 2007, la majorité de l’humanité vit :', ['en ville', 'à la campagne', 'sur les côtes'], 'C’est l’urbanisation du monde.'),
            q('Un bidonville est :', ['un quartier d’habitat précaire', 'un quartier d’affaires', 'une ville nouvelle'], 'Souvent sans eau courante ni égouts.'),
            q('L’étalement urbain a pour conséquence :', ['la réduction des terres agricoles', 'la baisse des déplacements', 'la disparition des banlieues'], 'La ville avance sur la campagne.'),
        ],
        sources=[ref('HG-C4-4E-GEO-01', 'L’urbanisation du monde')]),

    'HG-C4-4E-GEO-02': dict(duree=7, essentiel=
        'Environ 300 millions de personnes vivent dans un autre pays que celui où elles sont nées.\n'
        'On migre pour travailler, étudier, rejoindre sa famille, fuir une guerre ou une catastrophe.\n'
        'Une grande partie des migrations se fait entre pays du Sud, pas seulement du Sud vers le Nord.',
        parties=[
            ('Des migrations variées', [
                {'type': 'tableau', 'titre': 'Types de migrants', 'colonnes': ['Type', 'Exemple'], 'lignes': [
                    ['migrant de travail', 'un ouvrier indien dans les pays du Golfe'], ['réfugié', 'une famille syrienne qui fuit la guerre'], ['étudiant', 'un étudiant espagnol en Italie avec Erasmus'], ['migrant climatique', 'des paysans chassés par la sécheresse']]},
                bq('Un réfugié est une personne qui :', ['fuit une guerre ou des persécutions', 'part en vacances', 'change de région dans son pays'], 'Elle demande la protection d’un autre pays.'),
            ]),
            ('Des effets dans les deux pays', [
                {'type': 'explique', 'texte': 'Les migrants envoient souvent de l’argent à leur famille. Ces envois comptent beaucoup dans l’économie de certains pays de départ.'},
                {'type': 'piege', 'erreur': 'On croit que tous les migrants vont vers l’Europe ou l’Amérique du Nord.', 'correction': 'Beaucoup migrent vers un pays voisin, par exemple en Afrique de l’Ouest ou en Asie.'},
            ]),
        ],
        a_toi=[
            q('Un étudiant Erasmus qui part un an à l’étranger effectue :', ['une mobilité internationale', 'une migration interne', 'un exode rural'], 'Il franchit une frontière.'),
            q('Les pays du Golfe attirent surtout :', ['des migrants de travail', 'des réfugiés climatiques', 'des retraités'], 'Pour les chantiers et les services.'),
            q('Les migrations entre pays du Sud sont :', ['très nombreuses', 'inexistantes', 'interdites'], 'Elles représentent une grande part des migrations.'),
        ],
        sources=[ref('HG-C4-4E-GEO-02', 'Un monde de migrants')]),

    'HG-C4-4E-GEO-03': dict(duree=6, essentiel=
        'Le tourisme international représente plus d’un milliard d’arrivées chaque année. La France est le pays le plus visité au monde.\n'
        'Le tourisme crée des emplois et des revenus, mais il peut abimer les milieux et faire monter les prix.\n'
        'Chaque été, la population des stations balnéaires de la Méditerranée est multipliée.',
        parties=[
            ('Des espaces touristiques', [
                {'type': 'tableau', 'titre': 'Types de tourisme', 'colonnes': ['Tourisme', 'Espaces'], 'lignes': [
                    ['balnéaire', 'littoraux : Côte d’Azur, Baléares'], ['de montagne', 'stations de ski, randonnée'], ['urbain et culturel', 'Paris, Rome, Venise'], ['vert', 'campagnes, parcs naturels']]},
                bq('Une station balnéaire est située :', ['au bord de la mer', 'en haute montagne', 'en centre-ville'], 'Pour les bains de mer.'),
            ]),
            ('Effets positifs et négatifs', [
                {'type': 'tableau', 'titre': 'Les effets du tourisme', 'colonnes': ['Positifs', 'Négatifs'], 'lignes': [
                    ['emplois, revenus', 'emplois saisonniers et précaires'], ['équipements : routes, aéroports', 'littoraux bétonnés, pollution'], ['échanges culturels', 'surfréquentation, hausse des loyers']]},
                {'type': 'piege', 'erreur': 'On croit que le tourisme profite toujours aux habitants.', 'correction': 'À Venise, la surfréquentation pousse des habitants à partir, chassés par les prix.'},
            ]),
        ],
        a_toi=[
            q('Le pays le plus visité au monde est :', ['la France', 'le Japon', 'le Brésil'], 'Paris, la Côte d’Azur, les Alpes…'),
            q('La surfréquentation touristique provoque :', ['l’usure des sites et la gêne des habitants', 'la baisse des prix', 'la fermeture des hôtels'], 'Trop de visiteurs au même endroit.'),
            q('Un emploi saisonnier dure :', ['une partie de l’année', 'toute la vie', 'un jour'], 'Le temps de la saison touristique.'),
        ],
        sources=[ref('HG-C4-4E-GEO-03', 'Le tourisme et ses espaces')]),

    'HG-C4-4E-GEO-04': dict(duree=7, essentiel=
        'Les océans couvrent environ 70 % de la surface de la Terre. La grande majorité des marchandises échangées dans le monde voyage par mer.\n'
        'Les mers fournissent des ressources : poissons, pétrole, gaz. Chaque État contrôle une zone économique exclusive de 200 milles marins.\n'
        'Ces espaces sont aussi des sources de tensions et des milieux fragiles.',
        parties=[
            ('Des routes maritimes', [
                {'type': 'tableau', 'titre': 'Passages stratégiques', 'colonnes': ['Passage', 'Relie'], 'lignes': [
                    ['canal de Suez', 'Méditerranée et mer Rouge'], ['canal de Panama', 'Atlantique et Pacifique'], ['détroit de Malacca', 'océan Indien et mer de Chine'], ['détroit d’Ormuz', 'golfe Persique et océan Indien']]},
                bq('Un porte-conteneurs entre Shanghai et Rotterdam passe souvent par :', ['le canal de Suez', 'le canal de Panama', 'le détroit de Béring'], 'Le plus court chemin entre l’Asie et l’Europe.'),
            ]),
            ('Ressources et fragilité', [
                {'type': 'explique', 'texte': 'Grâce à ses territoires d’outre-mer, la France possède l’une des plus grandes zones économiques exclusives du monde.'},
                {'type': 'piege', 'erreur': 'On croit que les ressources de la mer sont inépuisables.', 'correction': 'La surpêche fait reculer de nombreuses espèces. La pollution plastique menace les milieux marins.'},
            ]),
        ],
        a_toi=[
            q('Une ZEE s’étend jusqu’à :', ['200 milles marins des côtes', '12 km', 'l’autre rive de l’océan'], 'Environ 370 km.'),
            q('Le canal de Panama relie :', ['l’Atlantique et le Pacifique', 'la Méditerranée et la mer Rouge', 'la Manche et la mer du Nord'], 'À travers l’Amérique centrale.'),
            q('Le principal moyen de transport des marchandises mondiales est :', ['le bateau', 'l’avion', 'le camion'], 'Les porte-conteneurs transportent d’énormes volumes.'),
        ],
        sources=[ref('HG-C4-4E-GEO-04', 'Mers et océans')]),

    'HG-C4-4E-GEO-05': dict(duree=6, essentiel=
        'Les métropoles mondiales, comme New York, Londres, Tokyo ou Paris, concentrent les sièges sociaux, les bourses et les grands aéroports.\n'
        'Elles commandent les flux de marchandises, de capitaux et d’informations : ce sont des centres de la mondialisation.\n'
        'D’autres villes sont moins connectées et restent à l’écart.',
        parties=[
            ('Ce que concentre une métropole', [
                {'type': 'tableau', 'titre': 'Fonctions d’une métropole mondiale', 'colonnes': ['Fonction', 'Exemple à Londres'], 'lignes': [
                    ['finance', 'la City, la Bourse'], ['transport', 'aéroport d’Heathrow'], ['culture', 'musées, universités'], ['pouvoir', 'sièges de grandes entreprises']]},
                bq('Un CBD est :', ['un quartier d’affaires', 'un quartier pauvre', 'un parc'], 'Central Business District : tours de bureaux.'),
            ]),
            ('Inégalement connectées', [
                {'type': 'explique', 'texte': 'Paris possède La Défense, deux grands aéroports et des lignes à grande vitesse. Une petite ville de l’intérieur de l’Afrique dispose de peu de liaisons internationales.'},
                {'type': 'piege', 'erreur': 'On croit qu’une métropole est seulement une ville très peuplée.', 'correction': 'Ce qui compte, ce sont les fonctions de commandement et les connexions, pas seulement la population.'},
            ]),
        ],
        a_toi=[
            q('Le quartier d’affaires de Paris s’appelle :', ['La Défense', 'Montmartre', 'le Marais'], 'Il concentre les tours de bureaux.'),
            q('Un hub est :', ['un grand nœud de correspondances', 'un quartier résidentiel', 'un musée'], 'Par exemple un grand aéroport.'),
            q('Une métropole mondiale se définit surtout par :', ['ses fonctions de commandement', 'sa superficie', 'son climat'], 'Finance, sièges, échanges.'),
        ],
        sources=[ref('HG-C4-4E-GEO-05', 'Villes connectées à la mondialisation')]),

    'HG-C4-4E-GEO-06': dict(duree=7, essentiel=
        'Les États-Unis sont la première puissance économique mondiale.\n'
        'Leur territoire s’organise autour de façades maritimes : la Mégalopolis de Boston à Washington sur l’Atlantique, la Californie sur le Pacifique.\n'
        'Le Sud et l’Ouest, la Sun Belt, attirent habitants et entreprises ; le Nord-Est industriel a connu un déclin.',
        parties=[
            ('Les espaces moteurs', [
                {'type': 'tableau', 'titre': 'Organisation du territoire', 'colonnes': ['Espace', 'Caractères'], 'lignes': [
                    ['Mégalopolis', 'chapelet de métropoles de Boston à Washington, dont New York'], ['Californie', 'Silicon Valley, Los Angeles, ports du Pacifique'], ['Sun Belt', 'Sud et Ouest ensoleillés, en forte croissance'], ['Nord-Est des Grands Lacs', 'ancienne région industrielle, la Rust Belt']]},
                bq('La Silicon Valley concentre :', ['les géants du numérique', 'les mines de charbon', 'les champs de coton'], 'En Californie, près de San Francisco.'),
            ]),
            ('Ouverts sur le monde', [
                {'type': 'explique', 'texte': 'Les grands ports, comme Los Angeles et New York, et les aéroports relient les États-Unis à l’Asie et à l’Europe.'},
                {'type': 'piege', 'erreur': 'On croit que tout le territoire américain est riche et dynamique.', 'correction': 'Certaines régions rurales et anciennes villes industrielles connaissent pauvreté et déclin.'},
            ]),
        ],
        a_toi=[
            q('La Mégalopolis américaine s’étend :', ['de Boston à Washington', 'de Los Angeles à San Diego', 'du Texas à la Floride'], 'Sur la façade atlantique.'),
            q('La Sun Belt désigne :', ['le Sud et l’Ouest des États-Unis', 'le Nord industriel', 'l’Alaska'], 'La « ceinture du soleil ».'),
            q('Une façade maritime est :', ['un littoral ouvert sur le monde, avec de grands ports', 'une plage touristique', 'une frontière terrestre'], 'Elle concentre activités et échanges.'),
        ],
        sources=[ref('HG-C4-4E-GEO-06', 'Les États-Unis et la mondialisation')]),

    'HG-C4-4E-GEO-07': dict(duree=7, essentiel=
        'L’Afrique de l’Ouest connait une forte croissance de sa population et de ses villes.\n'
        'Lagos, au Nigeria, est l’une des plus grandes villes d’Afrique. Le Nigeria est le pays le plus peuplé du continent.\n'
        'La région exporte des ressources, comme le pétrole et le cacao, par ses ports : Lagos, Abidjan, Dakar, Lomé.',
        parties=[
            ('Ressources et ports', [
                {'type': 'tableau', 'titre': 'Quelques ressources', 'colonnes': ['Pays', 'Ressource'], 'lignes': [
                    ['Nigeria', 'pétrole'], ['Côte d’Ivoire', 'cacao, premier producteur mondial'], ['Ghana', 'or, cacao'], ['Niger', 'uranium']]},
                bq('La Côte d’Ivoire est le premier producteur mondial de :', ['cacao', 'pétrole', 'café'], 'Le cacao sert à fabriquer le chocolat.'),
            ]),
            ('Une intégration inégale', [
                {'type': 'explique', 'texte': 'Les ports et les capitales littorales sont reliés au monde. L’intérieur, comme le Sahel, reste plus isolé et plus pauvre.'},
                {'type': 'piege', 'erreur': 'On croit que l’Afrique de l’Ouest exporte surtout des produits fabriqués.', 'correction': 'Elle exporte surtout des matières premières, peu transformées sur place.'},
            ]),
        ],
        a_toi=[
            q('Le pays le plus peuplé d’Afrique est :', ['le Nigeria', 'le Sénégal', 'le Mali'], 'Plus de 200 millions d’habitants.'),
            q('Le Sahel est une région :', ['semi-aride, au sud du Sahara', 'littorale et humide', 'montagneuse et enneigée'], 'Une bande sèche entre désert et savane.'),
            q('Abidjan est :', ['un grand port de Côte d’Ivoire', 'une capitale enclavée', 'une ville du Nigeria'], 'Sur le golfe de Guinée.'),
        ],
        sources=[ref('HG-C4-4E-GEO-07', 'L’Afrique de l’Ouest')]),
}

ecrire(COURS)
