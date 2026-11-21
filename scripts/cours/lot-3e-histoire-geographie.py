"""Lot de cours : histoire-géographie 3e (programme 2020). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-3e-histoire-geographie.py
    python3 scripts/cours/pages.py content/cours/HG-C4-3E-*.json

Cycle 4 : phrases de 25 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
Bilans humains arrondis, donnés comme ordres de grandeur.
"""
from commun import bq, ecrire, q, source_referentiel as ref

COURS = {
    # ------------------------------------------------------------------ Histoire
    'HG-C4-3E-HIST-01': dict(duree=8, essentiel=
        'La Première Guerre mondiale (1914-1918) est une guerre totale : elle mobilise les soldats, mais aussi les civils, l’économie et la propagande.\n'
        'Les soldats subissent des violences extrêmes dans les tranchées. En 1916, la bataille de Verdun dure dix mois.\n'
        'Les civils sont aussi visés : en 1915, l’Empire ottoman commet le génocide des Arméniens.',
        parties=[
            ('Une guerre totale', [
                {'type': 'tableau', 'titre': 'Tout un pays mobilisé', 'colonnes': ['Domaine', 'Exemple'], 'lignes': [
                    ['militaire', 'des millions de soldats mobilisés'], ['économique', 'les usines fabriquent des obus ; les femmes remplacent les hommes'], ['financier', 'emprunts auprès de la population'], ['moral', 'propagande et censure']]},
                bq('Pourquoi parle-t-on de « guerre totale » ?', ['toute la société est mobilisée', 'tous les pays du monde combattent', 'elle ne fait aucune victime civile'], 'Soldats, civils, économie, propagande.'),
            ]),
            ('Violences de masse', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1914, 'date': '1914', 'evenement': 'Début de la guerre.'},
                    {'annee': 1915, 'date': '1915', 'evenement': 'Génocide des Arméniens.'},
                    {'annee': 1916, 'date': '1916', 'evenement': 'Verdun, la Somme.'},
                    {'annee': 1918, 'date': '11 novembre 1918', 'evenement': 'Armistice.'}]},
                {'type': 'explique', 'texte': 'La guerre fait environ 10 millions de morts militaires. Le traité de Versailles, en 1919, impose de lourdes conditions à l’Allemagne.'},
                {'type': 'piege', 'erreur': 'On croit que la Grande Guerre ne concerne que les soldats.', 'correction': 'Les civils subissent occupations, déportations, bombardements et, pour les Arméniens, un génocide.'},
            ]),
        ],
        a_toi=[
            q('Le génocide des Arméniens est commis par :', ['l’Empire ottoman', 'l’Allemagne', 'la France'], 'En 1915.'),
            q('La bataille de Verdun a lieu en :', ['1916', '1914', '1918'], 'Elle dure dix mois.'),
            q('Le traité de Versailles est signé en :', ['1919', '1918', '1914'], 'Il fixe la paix avec l’Allemagne.'),
        ],
        sources=[ref('HG-C4-3E-HIST-01', 'La Première Guerre mondiale')]),

    'HG-C4-3E-HIST-02': dict(duree=8, essentiel=
        'Dans l’entre-deux-guerres, des régimes totalitaires s’installent : l’URSS de Staline et l’Allemagne nazie de Hitler.\n'
        'Ils reposent sur un parti unique, le culte du chef, la propagande, la terreur et l’embrigadement de la jeunesse.\n'
        'Les démocraties, comme la France, sont fragilisées par la crise ; en 1936, le Front populaire y obtient des réformes sociales.',
        parties=[
            ('Deux totalitarismes', [
                {'type': 'tableau', 'titre': 'Comparer', 'colonnes': ['Critère', 'URSS de Staline', 'Allemagne de Hitler'], 'lignes': [
                    ['arrivée au pouvoir', 'années 1920', '1933, chancelier'], ['idéologie', 'communisme', 'nazisme, racisme, antisémitisme'], ['terreur', 'goulag, Grande Terreur', 'Gestapo, camps de concentration'], ['économie', 'collectivisation, plans', 'réarmement, grands travaux']]},
                bq('Un régime totalitaire se caractérise par :', ['un parti unique et la terreur', 'des élections libres', 'la liberté de la presse'], 'Il contrôle toute la société.'),
            ]),
            ('La démocratie en France', [
                {'type': 'explique', 'texte': 'En 1936, le Front populaire de Léon Blum accorde deux semaines de congés payés et la semaine de 40 heures.'},
                {'type': 'piege', 'erreur': 'On croit que Hitler a pris le pouvoir par un coup d’État.', 'correction': 'Il est nommé chancelier légalement en 1933, puis supprime en quelques mois toutes les libertés.'},
            ]),
        ],
        a_toi=[
            q('Le goulag désigne :', ['les camps de travail forcé en URSS', 'un parti politique', 'une loi sociale'], 'Des millions de personnes y sont envoyées.'),
            q('Les congés payés sont obtenus en France en :', ['1936', '1918', '1945'], 'Par le Front populaire.'),
            q('Les lois de Nuremberg (1935) :', ['privent les Juifs allemands de leurs droits', 'créent les congés payés', 'fondent l’URSS'], 'Elles traduisent l’antisémitisme nazi.'),
        ],
        sources=[ref('HG-C4-3E-HIST-02', 'Démocraties et totalitarismes')]),

    'HG-C4-3E-HIST-03': dict(duree=8, essentiel=
        'La Seconde Guerre mondiale (1939-1945) est une guerre d’anéantissement : l’ennemi doit être détruit, civils compris.\n'
        'Elle fait plus de 50 millions de morts, en majorité des civils. Elle se termine après les bombes atomiques sur Hiroshima et Nagasaki.\n'
        'Les nazis commettent le génocide des Juifs, environ six millions de victimes, et celui des Tziganes.',
        parties=[
            ('Une guerre mondiale', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1939, 'date': '1939', 'evenement': 'L’Allemagne envahit la Pologne.'},
                    {'annee': 1941, 'date': '1941', 'evenement': 'Attaque de l’URSS ; Pearl Harbor.'},
                    {'annee': 1943, 'date': '1943', 'evenement': 'Défaite allemande à Stalingrad.'},
                    {'annee': 1945, 'date': '1945', 'evenement': 'Capitulation de l’Allemagne, puis du Japon.'}]},
                bq('Pourquoi parle-t-on de « guerre d’anéantissement » ?', ['l’objectif est de détruire l’ennemi, civils compris', 'elle est courte', 'elle oppose seulement deux pays'], 'Les civils sont des cibles.'),
            ]),
            ('Les génocides', [
                {'type': 'explique', 'texte': 'Les Juifs sont exclus, enfermés dans des ghettos, fusillés, puis déportés vers des centres de mise à mort. À Auschwitz-Birkenau, plus d’un million de personnes sont assassinées.'},
                {'type': 'explique', 'texte': 'Les Tziganes sont aussi victimes d’un génocide. Ces crimes sont jugés au procès de Nuremberg, en 1945-1946.'},
                {'type': 'piege', 'erreur': 'On croit que le génocide des Juifs a lieu seulement dans les camps.', 'correction': 'Plus d’un million de Juifs sont d’abord fusillés à l’est par des unités mobiles, avant les chambres à gaz.'},
            ]),
        ],
        a_toi=[
            q('Le génocide des Juifs est appelé :', ['la Shoah', 'la Résistance', 'le Front populaire'], 'Un mot hébreu signifiant catastrophe.'),
            q('Les bombes atomiques sont lancées en 1945 sur :', ['Hiroshima et Nagasaki', 'Berlin et Rome', 'Londres et Paris'], 'Le Japon capitule ensuite.'),
            q('La défaite allemande à Stalingrad a lieu en :', ['1943', '1939', '1945'], 'Un tournant de la guerre.'),
        ],
        sources=[ref('HG-C4-3E-HIST-03', 'La Seconde Guerre mondiale')]),

    'HG-C4-3E-HIST-04': dict(duree=8, essentiel=
        'En juin 1940, la France est vaincue. Le maréchal Pétain signe l’armistice et reçoit les pleins pouvoirs : la République laisse place au régime de Vichy.\n'
        'Vichy collabore avec l’occupant nazi et participe à la persécution des Juifs.\n'
        'Le 18 juin 1940, depuis Londres, de Gaulle appelle à continuer le combat. La Résistance s’organise en France.',
        parties=[
            ('Vichy et la collaboration', [
                {'type': 'tableau', 'titre': 'Le régime de Vichy', 'colonnes': ['Aspect', 'Contenu'], 'lignes': [
                    ['régime', 'autoritaire, fin de la République'], ['devise', 'Travail, Famille, Patrie'], ['antisémitisme', 'statut des Juifs dès octobre 1940'], ['collaboration', 'rafle du Vél d’Hiv en juillet 1942, par la police française']]},
                bq('La devise du régime de Vichy est :', ['Travail, Famille, Patrie', 'Liberté, Égalité, Fraternité', 'Ordre et Progrès'], 'Elle remplace la devise républicaine.'),
            ]),
            ('La Résistance', [
                {'type': 'explique', 'texte': 'Les résistants publient des journaux clandestins, sabotent, renseignent les Alliés. Jean Moulin unifie les mouvements en créant le Conseil national de la Résistance en 1943.'},
                {'type': 'frise', 'reperes': [
                    {'annee': 1940, 'date': 'juin 1940', 'evenement': 'Défaite, appel du 18 juin, armistice.'},
                    {'annee': 1942, 'date': 'juillet 1942', 'evenement': 'Rafle du Vél d’Hiv.'},
                    {'annee': 1943, 'date': '1943', 'evenement': 'Création du CNR.'},
                    {'annee': 1944, 'date': '1944', 'evenement': 'Débarquement le 6 juin ; libération de Paris le 25 aout.'}]},
                {'type': 'piege', 'erreur': 'On croit que Vichy était forcé par les nazis de persécuter les Juifs.', 'correction': 'Vichy adopte de lui-même des lois antisémites et sa police organise des rafles.'},
            ]),
        ],
        a_toi=[
            q('Jean Moulin est :', ['un résistant qui unifie les mouvements', 'un ministre de Vichy', 'un général allemand'], 'Il crée le CNR.'),
            q('Le débarquement de Normandie a lieu le :', ['6 juin 1944', '18 juin 1940', '8 mai 1945'], 'Il ouvre la libération de la France.'),
            q('Collaborer, pour Vichy, c’est :', ['coopérer avec l’occupant nazi', 'résister', 'rester neutre'], 'Politique, économique, policière.'),
        ],
        sources=[ref('HG-C4-3E-HIST-04', 'Vichy, collaboration, Résistance')]),

    'HG-C4-3E-HIST-05': dict(duree=7, essentiel=
        'Après 1945, les peuples colonisés réclament leur indépendance. Les empires coloniaux s’effondrent.\n'
        'Certaines indépendances sont obtenues par la négociation ou la lutte non violente, comme l’Inde en 1947 avec Gandhi.\n'
        'D’autres passent par la guerre, comme en Algérie (1954-1962).',
        parties=[
            ('Des chemins différents', [
                {'type': 'tableau', 'titre': 'Des indépendances', 'colonnes': ['Pays', 'Date', 'Modalité'], 'lignes': [
                    ['Inde', '1947', 'lutte non violente, partition avec le Pakistan'], ['Indochine', '1954', 'guerre, défaite française à Diên Biên Phu'], ['Afrique subsaharienne française', '1960', 'négociation, pour la plupart'], ['Algérie', '1962', 'guerre, accords d’Évian']]},
                bq('L’Algérie devient indépendante en :', ['1962', '1947', '1830'], 'Après huit ans de guerre.'),
            ]),
            ('Pourquoi en 1945 ?', [
                {'type': 'explique', 'texte': 'Les métropoles sont affaiblies par la guerre. Les colonisés ont combattu pour elles et réclament les droits promis. L’ONU défend le droit des peuples à disposer d’eux-mêmes.'},
                {'type': 'piege', 'erreur': 'On croit que toutes les indépendances ont été obtenues par la guerre.', 'correction': 'Beaucoup ont été négociées, comme la plupart des colonies françaises d’Afrique subsaharienne en 1960.'},
            ]),
        ],
        a_toi=[
            q('Gandhi mène une lutte :', ['non violente', 'armée', 'navale'], 'Désobéissance civile, boycott.'),
            q('Les accords d’Évian mettent fin à la guerre :', ['d’Algérie', 'd’Indochine', 'de Corée'], 'En 1962.'),
            q('Décoloniser, c’est :', ['accéder à l’indépendance pour une colonie', 'conquérir un territoire', 'créer un empire'], 'La fin de la domination coloniale.'),
        ],
        sources=[ref('HG-C4-3E-HIST-05', 'Les indépendances')]),

    'HG-C4-3E-HIST-06': dict(duree=8, essentiel=
        'De 1947 à 1991, les États-Unis et l’URSS s’affrontent sans guerre directe entre eux : c’est la guerre froide.\n'
        'Deux modèles s’opposent : démocratie libérale et capitalisme à l’Ouest, communisme et parti unique à l’Est.\n'
        'Le mur de Berlin, construit en 1961, coupe la ville en deux jusqu’en 1989.',
        parties=[
            ('Deux blocs', [
                {'type': 'tableau', 'titre': 'Est contre Ouest', 'colonnes': ['Critère', 'Bloc de l’Ouest', 'Bloc de l’Est'], 'lignes': [
                    ['puissance', 'États-Unis', 'URSS'], ['politique', 'démocratie libérale', 'parti communiste unique'], ['économie', 'capitalisme', 'économie planifiée'], ['alliance militaire', 'OTAN (1949)', 'pacte de Varsovie (1955)']]},
                bq('Pourquoi parle-t-on de guerre « froide » ?', ['les deux Grands ne s’affrontent pas directement', 'elle a lieu en hiver', 'elle se déroule au pôle Nord'], 'Les conflits sont indirects.'),
            ]),
            ('Des crises', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1948, 'date': '1948-1949', 'evenement': 'Blocus de Berlin.'},
                    {'annee': 1950, 'date': '1950-1953', 'evenement': 'Guerre de Corée.'},
                    {'annee': 1961, 'date': '1961', 'evenement': 'Construction du mur de Berlin.'},
                    {'annee': 1962, 'date': '1962', 'evenement': 'Crise des missiles de Cuba.'},
                    {'annee': 1991, 'date': '1991', 'evenement': 'Disparition de l’URSS.'}]},
                {'type': 'piege', 'erreur': 'On croit que la guerre froide n’a fait aucun mort.', 'correction': 'Les Grands ne se battent pas directement, mais des guerres comme celles de Corée et du Vietnam font des millions de victimes.'},
            ]),
        ],
        a_toi=[
            q('La crise de Cuba, en 1962, concerne :', ['des missiles soviétiques installés à Cuba', 'le mur de Berlin', 'la guerre de Corée'], 'Le monde frôle la guerre nucléaire.'),
            q('L’OTAN est l’alliance militaire :', ['du bloc de l’Ouest', 'du bloc de l’Est', 'des pays non alignés'], 'Créée en 1949.'),
            q('La guerre froide prend fin avec :', ['la disparition de l’URSS en 1991', 'la construction du mur', 'la crise de Cuba'], 'Le bloc de l’Est s’effondre.'),
        ],
        sources=[ref('HG-C4-3E-HIST-06', 'La guerre froide')]),

    'HG-C4-3E-HIST-07': dict(duree=7, essentiel=
        'Après 1945, des États européens s’unissent pour garantir la paix et la prospérité.\n'
        'En 1957, six pays signent le traité de Rome, qui crée la Communauté économique européenne. En 1992, le traité de Maastricht crée l’Union européenne.\n'
        'Des réalisations concrètes en découlent : libre circulation, euro, programme Erasmus.',
        parties=[
            ('Les étapes', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1951, 'date': '1951', 'evenement': 'CECA : charbon et acier.'},
                    {'annee': 1957, 'date': '1957', 'evenement': 'Traité de Rome : CEE.'},
                    {'annee': 1992, 'date': '1992', 'evenement': 'Traité de Maastricht : Union européenne.'},
                    {'annee': 2002, 'date': '2002', 'evenement': 'Pièces et billets en euros.'},
                    {'annee': 2004, 'date': '2004', 'evenement': 'Entrée de dix nouveaux pays.'}]},
                bq('Le traité de Maastricht crée :', ['l’Union européenne', 'la CECA', 'l’OTAN'], 'En 1992.'),
            ]),
            ('Des réalisations concrètes', [
                {'type': 'tableau', 'titre': 'Ce que l’Europe change', 'colonnes': ['Réalisation', 'Effet'], 'lignes': [
                    ['espace Schengen', 'pas de contrôle aux frontières intérieures'], ['euro', 'une monnaie commune à la plupart des membres'], ['Erasmus', 'études à l’étranger'], ['politique agricole commune', 'aides aux agriculteurs']]},
                {'type': 'piege', 'erreur': 'On croit que tous les pays de l’Union utilisent l’euro.', 'correction': 'Certains gardent leur monnaie, comme la Suède ou la Pologne.'},
            ]),
        ],
        a_toi=[
            q('L’Union européenne compte aujourd’hui :', ['27 États', '6 États', '50 États'], 'Le Royaume-Uni l’a quittée en 2020.'),
            q('L’espace Schengen permet :', ['de circuler sans contrôle aux frontières intérieures', 'de voter dans tous les pays', 'de ne pas payer d’impôts'], 'Libre circulation des personnes.'),
            q('Le programme Erasmus concerne :', ['les études à l’étranger', 'l’agriculture', 'la défense'], 'Des millions d’étudiants en ont profité.'),
        ],
        sources=[ref('HG-C4-3E-HIST-07', 'La construction européenne')]),

    'HG-C4-3E-HIST-08': dict(duree=7, essentiel=
        'À la Libération, le Gouvernement provisoire, dirigé par de Gaulle, rétablit la République.\n'
        'Elle s’élargit : les femmes obtiennent le droit de vote en 1944 et votent pour la première fois en 1945.\n'
        'Inspirées du programme du Conseil national de la Résistance, des réformes sociales sont adoptées : Sécurité sociale, nationalisations.',
        parties=[
            ('Des réformes', [
                {'type': 'tableau', 'titre': 'Refonder la République', 'colonnes': ['Date', 'Réforme'], 'lignes': [
                    ['1944', 'droit de vote des femmes'], ['1945', 'création de la Sécurité sociale'], ['1945-1946', 'nationalisations : Renault, électricité, banques'], ['1946', 'Constitution de la IVe République']]},
                bq('La Sécurité sociale est créée en :', ['1945', '1936', '1958'], 'Elle protège contre la maladie et la vieillesse.'),
            ]),
            ('Le programme du CNR', [
                {'type': 'explique', 'texte': 'Adopté en mars 1944, il prévoit le retour de la démocratie, une sécurité sociale pour tous et la nationalisation des grandes entreprises.'},
                {'type': 'piege', 'erreur': 'On croit que les Françaises votent depuis 1848.', 'correction': 'Le suffrage de 1848 était seulement masculin. Les femmes votent pour la première fois en 1945.'},
            ]),
        ],
        a_toi=[
            q('Nationaliser une entreprise, c’est :', ['la faire passer sous le contrôle de l’État', 'la vendre à l’étranger', 'la fermer'], 'Comme Renault en 1945.'),
            q('Le programme du CNR a été rédigé par :', ['la Résistance', 'le régime de Vichy', 'les Alliés'], 'En 1944.'),
            q('La IVe République est fondée en :', ['1946', '1958', '1870'], 'Par une nouvelle Constitution.'),
        ],
        sources=[ref('HG-C4-3E-HIST-08', 'Refonder la République (1944-1947)')]),

    'HG-C4-3E-HIST-09': dict(duree=7, essentiel=
        'En 1958, en pleine guerre d’Algérie, le général de Gaulle revient au pouvoir. La Constitution de la Ve République est adoptée par référendum.\n'
        'Elle renforce le pouvoir exécutif. Depuis 1962, le président est élu au suffrage universel direct.\n'
        'Le régime connait l’alternance en 1981 et des cohabitations, quand président et majorité de l’Assemblée sont opposés.',
        parties=[
            ('Les institutions', [
                {'type': 'tableau', 'titre': 'La Ve République', 'colonnes': ['Institution', 'Rôle'], 'lignes': [
                    ['président de la République', 'élu pour 5 ans ; nomme le Premier ministre, peut dissoudre l’Assemblée'], ['gouvernement', 'conduit la politique de la nation'], ['Parlement : Assemblée nationale et Sénat', 'vote les lois'], ['Conseil constitutionnel', 'vérifie que les lois respectent la Constitution']]},
                bq('Depuis 1962, le président est élu :', ['au suffrage universel direct', 'par les députés', 'par le Sénat'], 'Par tous les électeurs.'),
            ]),
            ('Alternance et cohabitation', [
                {'type': 'explique', 'texte': 'En 1981, François Mitterrand, socialiste, est élu : c’est la première alternance de la Ve République. En 1986, une première cohabitation commence.'},
                {'type': 'piege', 'erreur': 'On croit que le mandat présidentiel a toujours duré 5 ans.', 'correction': 'Il était de 7 ans. Le quinquennat est adopté par référendum en 2000.'},
            ]),
        ],
        a_toi=[
            q('L’alternance, c’est :', ['le passage du pouvoir d’un camp politique à l’autre', 'une guerre civile', 'un référendum'], 'Comme en 1981.'),
            q('Une cohabitation :', ['associe un président et une majorité opposés', 'réunit deux présidents', 'supprime l’Assemblée'], 'Le président nomme un Premier ministre de l’autre camp.'),
            q('Le Conseil constitutionnel :', ['vérifie que les lois respectent la Constitution', 'élit le président', 'commande l’armée'], 'Il peut censurer une loi.'),
        ],
        sources=[ref('HG-C4-3E-HIST-09', 'La Ve République')]),

    'HG-C4-3E-HIST-10': dict(duree=7, essentiel=
        'Des années 1950 aux années 1970, la France connait une forte croissance : les Trente Glorieuses. La consommation de masse se développe.\n'
        'La société change : exode rural, baby-boom, place nouvelle des jeunes et des femmes.\n'
        'Des lois accompagnent ces changements : majorité à 18 ans en 1974, loi Veil sur l’IVG en 1975, abolition de la peine de mort en 1981.',
        parties=[
            ('Une société transformée', [
                {'type': 'tableau', 'titre': 'Des changements', 'colonnes': ['Domaine', 'Évolution'], 'lignes': [
                    ['économie', 'croissance forte, plein emploi jusqu’au choc pétrolier de 1973'], ['consommation', 'voiture, télévision, réfrigérateur, supermarchés'], ['population', 'baby-boom, exode rural, immigration de travail'], ['jeunesse', 'Mai 1968 : contestation des étudiants et grèves']]},
                bq('Les Trente Glorieuses désignent :', ['une période de forte croissance', 'une guerre', 'un parti politique'], 'De la fin de la guerre aux années 1970.'),
            ]),
            ('Des lois', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1965, 'date': '1965', 'evenement': 'Les femmes peuvent travailler sans l’autorisation de leur mari.'},
                    {'annee': 1974, 'date': '1974', 'evenement': 'Majorité à 18 ans.'},
                    {'annee': 1975, 'date': '1975', 'evenement': 'Loi Veil.'},
                    {'annee': 1981, 'date': '1981', 'evenement': 'Abolition de la peine de mort.'}]},
                {'type': 'piege', 'erreur': 'On croit que la croissance des Trente Glorieuses profite à tous de la même façon.', 'correction': 'Des bidonvilles existent encore, et les ouvriers immigrés vivent souvent dans des conditions difficiles.'},
            ]),
        ],
        a_toi=[
            q('La loi Veil date de :', ['1975', '1945', '1981'], 'Défendue par Simone Veil.'),
            q('La peine de mort est abolie en France en :', ['1981', '1945', '1968'], 'À l’initiative de Robert Badinter.'),
            q('Le premier choc pétrolier, en 1973, entraine :', ['la fin des Trente Glorieuses et la montée du chômage', 'le baby-boom', 'Mai 1968'], 'Le prix du pétrole flambe.'),
        ],
        sources=[ref('HG-C4-3E-HIST-10', 'La société française (1950-1980)')]),

    'HG-C4-3E-HIST-11': dict(duree=7, essentiel=
        'Le 9 novembre 1989, le mur de Berlin tombe. L’Allemagne est réunifiée en 1990, l’URSS disparait en 1991.\n'
        'Les États-Unis restent la seule superpuissance, mais de nouveaux conflits éclatent : guerres en ex-Yougoslavie, génocide des Tutsi au Rwanda en 1994.\n'
        'Le terrorisme islamiste frappe, notamment le 11 septembre 2001 aux États-Unis.',
        parties=[
            ('Repères', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1989, 'date': '1989', 'evenement': 'Chute du mur de Berlin.'},
                    {'annee': 1991, 'date': '1991', 'evenement': 'Fin de l’URSS.'},
                    {'annee': 1994, 'date': '1994', 'evenement': 'Génocide des Tutsi au Rwanda.'},
                    {'annee': 2001, 'date': '2001', 'evenement': 'Attentats du 11 septembre.'},
                    {'annee': 2022, 'date': '2022', 'evenement': 'Invasion de l’Ukraine par la Russie.'}]},
                bq('Le mur de Berlin tombe le :', ['9 novembre 1989', '11 septembre 2001', '13 aout 1961'], 'La guerre froide touche à sa fin.'),
            ]),
            ('Un monde plus instable', [
                {'type': 'explique', 'texte': 'Après la guerre froide, les conflits sont souvent régionaux ou internes aux États. Des organisations terroristes frappent partout dans le monde, y compris en France en 2015.'},
                {'type': 'piege', 'erreur': 'On croit que la fin de la guerre froide a apporté la paix partout.', 'correction': 'De nombreuses guerres éclatent : Balkans, Afrique des Grands Lacs, Moyen-Orient, puis Ukraine.'},
            ]),
        ],
        a_toi=[
            q('Le génocide des Tutsi a lieu au :', ['Rwanda', 'Kosovo', 'Vietnam'], 'En 1994.'),
            q('L’Allemagne est réunifiée en :', ['1990', '1961', '2002'], 'Un an après la chute du mur.'),
            q('Les attentats du 11 septembre 2001 frappent :', ['les États-Unis', 'la France', 'le Royaume-Uni'], 'New York et Washington.'),
        ],
        sources=[ref('HG-C4-3E-HIST-11', 'Le monde après 1989')]),

    # ---------------------------------------------------------------- Géographie
    'HG-C4-3E-GEO-01': dict(duree=7, essentiel=
        'Une aire urbaine, ou aire d’attraction d’une ville, regroupe une ville-centre, ses banlieues et une couronne périurbaine.\n'
        'La grande majorité des Français vit dans ces espaces urbains.\n'
        'Chaque jour, des habitants des communes périurbaines rejoignent la ville pour travailler : ce sont des mobilités pendulaires.',
        parties=[
            ('Du centre à la couronne', [
                {'type': 'tableau', 'titre': 'Organisation d’une aire urbaine', 'colonnes': ['Espace', 'Caractères'], 'lignes': [
                    ['ville-centre', 'emplois, commerces, administrations'], ['banlieue', 'logements collectifs, zones d’activités'], ['couronne périurbaine', 'lotissements, villages, terres agricoles'], ['réseaux', 'routes, rocades, transports en commun']]},
                bq('Les mobilités pendulaires sont :', ['des trajets quotidiens domicile-travail', 'des voyages touristiques', 'des migrations internationales'], 'Aller-retour chaque jour.'),
            ]),
            ('Des défis', [
                {'type': 'explique', 'texte': 'L’étalement périurbain allonge les trajets en voiture et grignote les terres agricoles. Les villes développent tramways, pistes cyclables et parkings relais.'},
                {'type': 'piege', 'erreur': 'On croit que les habitants du périurbain sont des ruraux comme les autres.', 'correction': 'Ils vivent à la campagne mais dépendent de la ville pour l’emploi et les services.'},
            ]),
        ],
        a_toi=[
            q('Un parking relais permet :', ['de laisser sa voiture pour prendre les transports en commun', 'de stationner en centre-ville', 'de recharger son téléphone'], 'Il limite les voitures en ville.'),
            q('La couronne périurbaine est :', ['un espace en partie rural sous influence de la ville', 'le centre historique', 'un quartier d’affaires'], 'Lotissements et villages.'),
            q('L’étalement urbain a pour conséquence :', ['des trajets plus longs', 'moins de voitures', 'plus de terres agricoles'], 'La ville s’étend.'),
        ],
        sources=[ref('HG-C4-3E-GEO-01', 'Les aires urbaines')]),

    'HG-C4-3E-GEO-02': dict(duree=7, essentiel=
        'Les espaces productifs créent des richesses : espaces industriels, agricoles, touristiques et d’affaires.\n'
        'Ils se transforment avec la mondialisation : certaines industries disparaissent, d’autres se concentrent près des métropoles et des littoraux.\n'
        'À Toulouse, l’aéronautique emploie des dizaines de milliers de personnes autour d’Airbus.',
        parties=[
            ('Des espaces variés', [
                {'type': 'tableau', 'titre': 'Exemples en France', 'colonnes': ['Type', 'Exemple'], 'lignes': [
                    ['industriel', 'aéronautique à Toulouse'], ['agricole', 'grandes cultures de la Beauce'], ['touristique', 'stations de ski des Alpes'], ['d’affaires', 'La Défense, près de Paris'], ['industrialo-portuaire', 'Dunkerque, Fos-sur-Mer']]},
                bq('Un technopôle associe :', ['entreprises de pointe, universités et centres de recherche', 'champs et fermes', 'plages et hôtels'], 'Comme autour de Toulouse ou Grenoble.'),
            ]),
            ('Des mutations', [
                {'type': 'explique', 'texte': 'La Lorraine a perdu une grande partie de sa sidérurgie. Les zones industrialo-portuaires attirent les industries qui importent leurs matières premières par la mer.'},
                {'type': 'piege', 'erreur': 'On croit que l’industrie a disparu de France.', 'correction': 'Elle emploie moins, mais reste forte dans l’aéronautique, le luxe, l’agroalimentaire ou la pharmacie.'},
            ]),
        ],
        a_toi=[
            q('La désindustrialisation désigne :', ['le recul des emplois industriels', 'la création d’usines', 'l’exode rural'], 'Fermetures d’usines, comme en Lorraine.'),
            q('La Beauce est un espace productif :', ['agricole', 'touristique', 'd’affaires'], 'Céréales sur de grandes exploitations.'),
            q('Les industries lourdes s’installent souvent :', ['sur les littoraux, près des ports', 'en haute montagne', 'en centre-ville'], 'Pour importer et exporter par la mer.'),
        ],
        sources=[ref('HG-C4-3E-GEO-02', 'Les espaces productifs')]),

    'HG-C4-3E-GEO-03': dict(duree=6, essentiel=
        'Les espaces de faible densité comptent peu d’habitants au kilomètre carré : campagnes isolées, montagnes.\n'
        'Ils ont des contraintes : services éloignés, vieillissement de la population.\n'
        'Mais ils ont des atouts : tourisme vert, agriculture de qualité, énergies renouvelables, nouveaux habitants en télétravail.',
        parties=[
            ('Contraintes et atouts', [
                {'type': 'tableau', 'titre': 'Les espaces de faible densité', 'colonnes': ['Contraintes', 'Atouts'], 'lignes': [
                    ['médecins et écoles éloignés', 'cadre de vie, nature'], ['peu de transports en commun', 'tourisme vert, randonnée'], ['population âgée', 'produits locaux, labels'], ['emplois rares', 'télétravail, éoliennes, panneaux solaires']]},
                bq('Une densité faible signifie :', ['peu d’habitants au km²', 'beaucoup d’habitants au km²', 'un territoire petit'], 'Le nombre d’habitants rapporté à la surface.'),
            ]),
            ('Revitaliser', [
                {'type': 'explique', 'texte': 'Dans un village de Lozère, une ancienne ferme accueille des gîtes et un espace de télétravail. Des maisons France services regroupent les démarches administratives.'},
                {'type': 'piege', 'erreur': 'On croit que tous les espaces ruraux perdent des habitants.', 'correction': 'Certains en gagnent, grâce au télétravail, au tourisme ou à la proximité d’une ville.'},
            ]),
        ],
        a_toi=[
            q('La Lozère est un département :', ['peu dense', 'très urbanisé', 'littoral'], 'L’un des moins peuplés de France.'),
            q('Un atout des espaces de faible densité :', ['le tourisme vert', 'les embouteillages', 'les grands aéroports'], 'Nature et randonnée.'),
            q('Le télétravail permet :', ['de vivre loin de son lieu de travail', 'd’éviter Internet', 'de supprimer les villes'], 'Grâce à une bonne connexion.'),
        ],
        sources=[ref('HG-C4-3E-GEO-03', 'Les espaces de faible densité')]),

    'HG-C4-3E-GEO-04': dict(duree=6, essentiel=
        'Aménager le territoire, c’est agir pour réduire les inégalités entre territoires et les rendre plus attractifs.\n'
        'De nombreux acteurs interviennent : État, régions, départements, intercommunalités, communes, Union européenne, entreprises, habitants.\n'
        'Une ligne à grande vitesse, la fibre optique ou une maison de santé sont des aménagements.',
        parties=[
            ('Les acteurs', [
                {'type': 'tableau', 'titre': 'Qui aménage ?', 'colonnes': ['Acteur', 'Exemple d’action'], 'lignes': [
                    ['État', 'lignes à grande vitesse, autoroutes'], ['région', 'lycées, trains régionaux'], ['département', 'collèges, routes départementales'], ['commune ou intercommunalité', 'écoles, transports urbains'], ['Union européenne', 'fonds pour les régions en difficulté']]},
                bq('En France, les collèges relèvent :', ['du département', 'de la commune', 'de la région'], 'Les lycées relèvent de la région.'),
            ]),
            ('Des choix discutés', [
                {'type': 'explique', 'texte': 'Un projet d’aménagement peut susciter des oppositions : protection de la nature, cout, nuisances. Une concertation avec les habitants est organisée.'},
                {'type': 'piege', 'erreur': 'On croit que l’État décide seul de tous les aménagements.', 'correction': 'Les collectivités territoriales ont de nombreuses compétences et l’Union européenne finance des projets.'},
            ]),
        ],
        a_toi=[
            q('Les lycées sont construits et entretenus par :', ['la région', 'le département', 'la commune'], 'Une compétence régionale.'),
            q('Un désert médical est :', ['une zone qui manque de médecins', 'un désert de sable', 'un hôpital vide'], 'Un enjeu d’aménagement.'),
            q('Une concertation sert à :', ['recueillir l’avis des habitants sur un projet', 'imposer un projet', 'voter une loi'], 'Avant de décider.'),
        ],
        sources=[ref('HG-C4-3E-GEO-04', 'Aménager le territoire')]),

    'HG-C4-3E-GEO-05': dict(duree=7, essentiel=
        'La France possède des territoires ultramarins dans les océans Atlantique, Indien et Pacifique : Guadeloupe, Martinique, Guyane, La Réunion, Mayotte, Polynésie, Nouvelle-Calédonie…\n'
        'Ils lui donnent l’une des plus grandes zones économiques exclusives du monde.\n'
        'Ils ont des contraintes : éloignement, insularité, risques naturels, chômage élevé.',
        parties=[
            ('Atouts et contraintes', [
                {'type': 'tableau', 'titre': 'Les territoires ultramarins', 'colonnes': ['Atouts', 'Contraintes'], 'lignes': [
                    ['zone économique exclusive immense', 'éloignement de la métropole'], ['biodiversité exceptionnelle', 'cyclones, volcans, séismes'], ['tourisme', 'cout de la vie élevé'], ['centre spatial de Kourou en Guyane', 'chômage plus fort qu’en métropole']]},
                bq('Le centre spatial de Kourou se trouve en :', ['Guyane', 'Martinique', 'Polynésie'], 'Près de l’équateur, idéal pour lancer des fusées.'),
            ]),
            ('Des statuts différents', [
                {'type': 'explique', 'texte': 'La Guadeloupe, la Martinique, la Guyane, La Réunion et Mayotte sont des départements et régions d’outre-mer. D’autres territoires, comme la Polynésie française, ont plus d’autonomie.'},
                {'type': 'piege', 'erreur': 'On croit que les territoires ultramarins sont des pays étrangers.', 'correction': 'Ils font partie de la France ; leurs habitants sont des citoyens français.'},
            ]),
        ],
        a_toi=[
            q('La Réunion se situe dans l’océan :', ['Indien', 'Atlantique', 'Pacifique'], 'À l’est de Madagascar.'),
            q('La ZEE de la France est immense grâce :', ['aux territoires ultramarins', 'à la Méditerranée', 'aux fleuves'], 'Ils sont dispersés sur tous les océans.'),
            q('Un risque fréquent aux Antilles :', ['les cyclones', 'les avalanches', 'le grand froid'], 'Pendant la saison cyclonique.'),
        ],
        sources=[ref('HG-C4-3E-GEO-05', 'Les territoires ultramarins')]),

    'HG-C4-3E-GEO-06': dict(duree=7, essentiel=
        'L’Union européenne réunit 27 États et environ 450 millions d’habitants.\n'
        'Son cœur économique est une dorsale urbaine qui va de Londres à Milan. La France y occupe une position de carrefour.\n'
        'Dans les régions transfrontalières, des milliers de personnes traversent chaque jour une frontière pour travailler, comme les Lorrains au Luxembourg.',
        parties=[
            ('Un territoire organisé', [
                {'type': 'tableau', 'titre': 'Les espaces de l’Union', 'colonnes': ['Espace', 'Caractères'], 'lignes': [
                    ['dorsale européenne', 'métropoles, industries, grands axes, de Londres à Milan'], ['façades maritimes', 'grands ports : Rotterdam, Anvers, Hambourg'], ['périphéries', 'régions moins riches, à l’est et au sud'], ['régions transfrontalières', 'coopération de part et d’autre des frontières']]},
                bq('Le plus grand port d’Europe est :', ['Rotterdam', 'Marseille', 'Lisbonne'], 'Aux Pays-Bas.'),
            ]),
            ('Vivre une frontière', [
                {'type': 'explique', 'texte': 'Les salaires plus élevés au Luxembourg attirent des travailleurs frontaliers. Les routes et les trains sont saturés aux heures de pointe.'},
                {'type': 'piege', 'erreur': 'On croit que la frontière a disparu avec Schengen.', 'correction': 'Les contrôles ont presque disparu, mais les lois, les salaires et les impôts restent différents.'},
            ]),
        ],
        a_toi=[
            q('Un travailleur frontalier :', ['vit dans un pays et travaille dans un pays voisin', 'travaille à la douane', 'habite à l’étranger sans travailler'], 'Il traverse la frontière chaque jour.'),
            q('L’Union européenne compte environ :', ['450 millions d’habitants', '45 millions', '4,5 milliards'], 'Une des plus grandes populations du monde.'),
            q('La dorsale européenne est :', ['l’espace le plus riche et dense de l’Union', 'une chaine de montagnes', 'une frontière'], 'De Londres à Milan.'),
        ],
        sources=[ref('HG-C4-3E-GEO-06', 'L’Union européenne')]),

    'HG-C4-3E-GEO-07': dict(duree=7, essentiel=
        'La France est l’une des grandes puissances mondiales : membre permanent du Conseil de sécurité de l’ONU, puissance nucléaire, grande économie.\n'
        'Son influence culturelle passe par la langue française, parlée sur tous les continents, le tourisme, la gastronomie et la mode.\n'
        'L’Union européenne pèse aussi dans le monde : c’est l’une des premières puissances commerciales.',
        parties=[
            ('Les formes de la puissance', [
                {'type': 'tableau', 'titre': 'La France dans le monde', 'colonnes': ['Domaine', 'Exemples'], 'lignes': [
                    ['géopolitique', 'membre permanent du Conseil de sécurité, armée présente à l’étranger'], ['économique', 'grandes entreprises, luxe, aéronautique'], ['culturel', 'francophonie, cinéma, musées'], ['maritime', 'l’une des plus grandes ZEE du monde']]},
                bq('Combien de membres permanents compte le Conseil de sécurité ?', ['5', '15', '27'], 'États-Unis, Russie, Chine, Royaume-Uni, France.'),
            ]),
            ('L’Europe dans le monde', [
                {'type': 'explique', 'texte': 'L’Union européenne négocie d’une seule voix les accords commerciaux. Elle est aussi le premier donateur d’aide au développement.'},
                {'type': 'piege', 'erreur': 'On réduit la puissance à la force militaire.', 'correction': 'La puissance est aussi économique et culturelle : c’est le « soft power », l’influence par l’attraction.'},
            ]),
        ],
        a_toi=[
            q('La francophonie désigne :', ['l’ensemble des personnes et pays qui parlent français', 'un parti politique', 'une région de France'], 'Sur tous les continents.'),
            q('Le « soft power » est :', ['l’influence par la culture et l’attraction', 'la puissance militaire', 'une monnaie'], 'Une puissance douce.'),
            q('Un membre permanent du Conseil de sécurité peut :', ['bloquer une décision par son veto', 'élire le secrétaire général seul', 'quitter l’ONU sans conséquence'], 'Le droit de veto.'),
        ],
        sources=[ref('HG-C4-3E-GEO-07', 'La France et l’Europe dans le monde')]),
}

ecrire(COURS)
