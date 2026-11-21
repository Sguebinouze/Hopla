"""Lot de cours : découverte du monde au CP (histoire-géographie et sciences, programmes 2026).
Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-cp-monde.py
    python3 scripts/cours/pages.py content/cours/HG-C2-CP-*.json content/cours/ST-C2-CP-*.json

Cycle 2 : phrases de 12 mots au plus, bloquant. Sources : extraits vérifiés du référentiel.
"""
from commun import bq, ecrire, q, source_referentiel as ref

COURS = {
    # ---------------------------------------------------------------- Histoire
    'HG-C2-CP-HIST-01': dict(duree=5, essentiel=
        'La Terre tourne sur elle-même.\n'
        'Le côté éclairé par le Soleil a le jour. L’autre a la nuit.\n'
        'Il y a quatre saisons : printemps, été, automne, hiver.',
        parties=[
            ('Le jour et la nuit', [
                {'type': 'observe', 'consigne': 'Dans le noir, éclaire un globe avec une lampe.', 'exemples': [
                    'Un côté est éclairé : il y fait jour.', 'L’autre côté est sombre : il y fait nuit.', 'Fais tourner le globe : la nuit avance.']},
                {'type': 'piege', 'erreur': 'On croit que le Soleil s’éteint la nuit.', 'correction': 'Le Soleil brille toujours. C’est la Terre qui tourne.'},
                bq('Pourquoi fait-il nuit ?', ['notre côté de la Terre est à l’ombre', 'le Soleil s’éteint', 'la Lune cache le Soleil'], 'La Terre tourne sur elle-même.'),
            ]),
            ('Les saisons', [
                {'type': 'tableau', 'titre': 'Les quatre saisons en France', 'colonnes': ['Saison', 'Ce qu’on voit'], 'lignes': [
                    ['printemps', 'des fleurs et des bourgeons'], ['été', 'de la chaleur, de longues journées'],
                    ['automne', 'des feuilles qui tombent'], ['hiver', 'du froid, des journées courtes']]},
                bq('En quelle saison fait-il le plus chaud ?', ['en été', 'en hiver', 'en automne'], 'Les journées sont longues et chaudes.'),
            ]),
        ],
        a_toi=[
            q('En quelle saison les feuilles tombent-elles ?', ['en automne', 'au printemps', 'en été'], 'Les arbres perdent leurs feuilles.'),
            q('Combien y a-t-il de saisons ?', ['4', '2', '12'], 'Printemps, été, automne, hiver.'),
            q('La nuit, le Soleil :', ['éclaire l’autre côté de la Terre', 's’éteint', 'tombe dans la mer'], 'Il ne s’éteint jamais.'),
        ],
        sources=[ref('HG-C2-CP-HIST-01', 'Jour, nuit et saisons')]),

    'HG-C2-CP-HIST-02': dict(duree=5, essentiel=
        'Une année a 12 mois.\n'
        'Une semaine a 7 jours.\n'
        'Une journée a 24 heures.',
        parties=[
            ('Les jours de la semaine', [
                {'type': 'tableau', 'titre': 'La semaine', 'colonnes': ['Ordre', 'Jour'], 'lignes': [
                    ['1', 'lundi'], ['2', 'mardi'], ['3', 'mercredi'], ['4', 'jeudi'], ['5', 'vendredi'], ['6', 'samedi'], ['7', 'dimanche']]},
                bq('Quel jour vient après mercredi ?', ['jeudi', 'mardi', 'vendredi'], 'Mercredi, jeudi.'),
            ]),
            ('Les mois de l’année', [
                {'type': 'tableau', 'titre': 'L’année', 'colonnes': ['Mois', 'Nom'], 'lignes': [
                    ['1', 'janvier'], ['2', 'février'], ['3', 'mars'], ['4', 'avril'], ['5', 'mai'], ['6', 'juin'],
                    ['7', 'juillet'], ['8', 'août'], ['9', 'septembre'], ['10', 'octobre'], ['11', 'novembre'], ['12', 'décembre']]},
                {'type': 'piege', 'erreur': 'On croit que la semaine commence le dimanche.', 'correction': 'Sur nos calendriers, elle commence le lundi.'},
            ]),
        ],
        a_toi=[
            q('Combien de mois dans une année ?', ['12', '7', '24'], 'De janvier à décembre.'),
            q('Quel mois vient après mars ?', ['avril', 'mai', 'février'], 'Mars, avril.'),
            q('Combien d’heures dans une journée ?', ['24', '12', '7'], 'Le jour et la nuit ensemble.'),
        ],
        sources=[ref('HG-C2-CP-HIST-02', 'Le calendrier')]),

    'HG-C2-CP-HIST-03': dict(duree=5, essentiel=
        'Hier est passé. Aujourd’hui, c’est maintenant. Demain viendra.\n'
        'Une frise range les évènements dans l’ordre.\n'
        'Mes grands-parents sont nés avant mes parents.',
        parties=[
            ('Hier, aujourd’hui, demain', [
                {'type': 'tableau', 'titre': 'Les temps', 'colonnes': ['Hier', 'Aujourd’hui', 'Demain'], 'lignes': [
                    ['j’ai joué', 'je joue', 'je jouerai']]},
                bq('Si aujourd’hui est lundi, demain sera :', ['mardi', 'dimanche', 'mercredi'], 'Lundi, mardi.'),
            ]),
            ('Ranger dans l’ordre', [
                {'type': 'observe', 'consigne': 'Ma journée, dans l’ordre.', 'exemples': [
                    'Le matin, je me lève.', 'À midi, je mange.', 'Le soir, je me couche.']},
                {'type': 'observe', 'consigne': 'Ma famille, des plus âgés aux plus jeunes.', 'exemples': [
                    'Mes grands-parents.', 'Mes parents, mes oncles et mes tantes.', 'Moi, mes frères, mes sœurs et mes cousins.']},
                {'type': 'piege', 'erreur': 'On croit que le temps passé peut revenir.', 'correction': 'Le temps passé ne revient jamais.'},
            ]),
        ],
        a_toi=[
            q('Hier, nous … au parc.', ['sommes allés', 'allons', 'irons'], 'Hier, c’est le passé.'),
            q('Qui est né en premier ?', ['ma grand-mère', 'ma mère', 'moi'], 'Les grands-parents sont les plus âgés.'),
            q('Que fais-tu en premier le matin ?', ['je me lève', 'je me couche', 'je dine'], 'La journée commence au lever.'),
        ],
        sources=[ref('HG-C2-CP-HIST-03', 'Situer des évènements dans le temps')]),

    'HG-C2-CP-HIST-04': dict(duree=4, essentiel=
        'Pour mesurer le temps, on utilise des outils.\n'
        'Le sablier mesure une courte durée.\n'
        'La montre, la pendule et le réveil donnent l’heure.',
        parties=[
            ('Des outils', [
                {'type': 'tableau', 'titre': 'À quoi ça sert ?', 'colonnes': ['Outil', 'Il sert à'], 'lignes': [
                    ['sablier', 'mesurer quelques minutes'], ['pendule', 'lire l’heure à la maison'],
                    ['montre', 'lire l’heure partout'], ['réveil', 'sonner à l’heure choisie']]},
                {'type': 'visuel', 'visuel': {'type': 'horloge', 'heures': 7, 'minutes': 0}, 'legende': 'Le réveil sonne à 7 heures.'},
                bq('Quel outil sonne le matin ?', ['le réveil', 'le sablier', 'le calendrier'], 'On choisit son heure.'),
            ]),
            ('Aiguilles ou chiffres', [
                {'type': 'explique', 'texte': 'Une montre à aiguilles est analogique. Une montre à chiffres est numérique.'},
                {'type': 'piege', 'erreur': 'On croit que le sablier donne l’heure.', 'correction': 'Il mesure une durée. Il ne dit pas l’heure.'},
            ]),
        ],
        a_toi=[
            q('Quand tout le sable est tombé :', ['la durée est finie', 'il est midi', 'le jour se lève'], 'Le sablier mesure une durée.'),
            q('Une montre à chiffres est :', ['numérique', 'analogique', 'un sablier'], 'Elle affiche des chiffres.'),
            q('Pour lire l’heure au poignet, on a :', ['une montre', 'une pendule', 'un sablier'], 'On la porte sur soi.'),
        ],
        sources=[ref('HG-C2-CP-HIST-04', 'Outils de mesure du temps')]),

    # -------------------------------------------------------------- Géographie
    'HG-C2-CP-GEO-01': dict(duree=5, essentiel=
        'Pour dire où est une chose, j’utilise des mots de position.\n'
        'À gauche, à droite, devant, derrière, au-dessus, en dessous.\n'
        'Un plan montre un lieu vu du dessus.',
        parties=[
            ('Les mots de position', [
                {'type': 'observe', 'consigne': 'Dans la classe.', 'exemples': [
                    'Le tableau est devant les élèves.', 'La fenêtre est à gauche de la porte.', 'Le cartable est sous la table.']},
                bq('« Le chat est sur le lit. » Le lit est :', ['sous le chat', 'sur le chat', 'derrière le chat'], 'Le chat est au-dessus.'),
            ]),
            ('Lire un plan', [
                {'type': 'methode', 'titre': 'Pour suivre un trajet sur un plan', 'etapes': [
                    'Trouve l’endroit où tu es.', 'Trouve l’endroit où tu vas.', 'Suis le chemin avec ton doigt.']},
                {'type': 'piege', 'erreur': 'On croit qu’un plan montre les choses de face.', 'correction': 'Le plan montre tout vu du dessus, comme un oiseau.'},
            ]),
        ],
        a_toi=[
            q('Un plan montre un lieu vu :', ['du dessus', 'de face', 'de dos'], 'Comme un oiseau qui vole.'),
            q('Le contraire de « devant » :', ['derrière', 'dessus', 'à gauche'], 'Devant, derrière.'),
            q('« Le ballon est sous la table. » La table est :', ['au-dessus du ballon', 'sous le ballon', 'dans le ballon'], 'Sous, au-dessus.'),
        ],
        sources=[ref('HG-C2-CP-GEO-01', 'Se repérer autour de l’école')]),

    'HG-C2-CP-GEO-02': dict(duree=5, essentiel=
        'La Terre est couverte surtout d’océans.\n'
        'Les terres forment six continents.\n'
        'La France est en Europe.',
        parties=[
            ('Continents et océans', [
                {'type': 'tableau', 'titre': 'Les six continents', 'colonnes': ['Continent', 'Un pays'], 'lignes': [
                    ['Afrique', 'Maroc'], ['Amérique', 'Brésil'], ['Antarctique', 'aucun pays'], ['Asie', 'Chine'], ['Europe', 'France'], ['Océanie', 'Australie']]},
                {'type': 'explique', 'texte': 'Les trois plus grands océans sont le Pacifique, l’Atlantique et l’océan Indien.'},
                bq('Sur quel continent est la France ?', ['l’Europe', 'l’Asie', 'l’Afrique'], 'La France est en Europe.'),
            ]),
            ('Globe et planisphère', [
                {'type': 'explique', 'texte': 'Le globe est rond comme la Terre. Le planisphère est une carte plate du monde.'},
                {'type': 'explique', 'texte': 'Des territoires français sont aussi sur d’autres océans, comme La Réunion.'},
                {'type': 'piege', 'erreur': 'On croit que les océans sont séparés.', 'correction': 'Ils se touchent tous. Le globe le montre bien.'},
            ]),
        ],
        a_toi=[
            q('Quel est le plus grand océan ?', ['le Pacifique', 'l’Atlantique', 'l’océan Indien'], 'C’est le plus grand du monde.'),
            q('Une carte plate du monde s’appelle :', ['un planisphère', 'un globe', 'un plan'], 'Le globe, lui, est rond.'),
            q('Combien de continents ?', ['6', '3', '12'], 'Afrique, Amérique, Antarctique, Asie, Europe, Océanie.'),
        ],
        sources=[ref('HG-C2-CP-GEO-02', 'Continents et océans')]),

    'HG-C2-CP-GEO-03': dict(duree=4, essentiel=
        'Chaque lieu de l’école a un usage.\n'
        'On apprend en classe. On joue dans la cour.\n'
        'On mange au réfectoire.',
        parties=[
            ('Les lieux et leur usage', [
                {'type': 'tableau', 'titre': 'Dans l’école', 'colonnes': ['Lieu', 'On y'], 'lignes': [
                    ['la classe', 'apprend'], ['la cour', 'joue à la récréation'], ['le réfectoire', 'mange'],
                    ['les sanitaires', 'se lave les mains'], ['le préau', 's’abrite de la pluie'], ['le portail', 'entre et sort']]},
                bq('Où mange-t-on à midi ?', ['au réfectoire', 'dans la cour', 'au portail'], 'C’est la cantine.'),
            ]),
            ('Se déplacer dans l’école', [
                {'type': 'observe', 'consigne': 'Le matin, mon trajet.', 'exemples': [
                    'Je passe le portail.', 'Je traverse la cour.', 'J’entre dans ma classe.']},
                {'type': 'piege', 'erreur': 'On croit qu’on peut courir partout.', 'correction': 'Dans les couloirs, on marche. C’est plus sûr.'},
            ]),
        ],
        a_toi=[
            q('Où joue-t-on à la récréation ?', ['dans la cour', 'au réfectoire', 'aux sanitaires'], 'La cour sert à jouer.'),
            q('Où se lave-t-on les mains ?', ['aux sanitaires', 'dans la cour', 'au portail'], 'Il y a des lavabos.'),
            q('Par où entre-t-on dans l’école ?', ['par le portail', 'par la fenêtre', 'par le préau'], 'Il s’ouvre le matin.'),
        ],
        sources=[ref('HG-C2-CP-GEO-03', 'Les lieux de l’école')]),

    'HG-C2-CP-GEO-04': dict(duree=4, essentiel=
        'Les quatre points cardinaux : nord, sud, est, ouest.\n'
        'Sur une carte, le nord est souvent en haut.\n'
        'Le Soleil se lève à l’est et se couche à l’ouest.',
        parties=[
            ('Sur une carte', [
                {'type': 'tableau', 'titre': 'Carte avec le nord en haut', 'colonnes': ['Position', 'Point cardinal'], 'lignes': [
                    ['en haut', 'nord'], ['en bas', 'sud'], ['à droite', 'est'], ['à gauche', 'ouest']]},
                bq('Sur une carte, en bas, c’est souvent :', ['le sud', 'le nord', 'l’est'], 'Le nord est en haut, le sud en bas.'),
            ]),
            ('Avec le Soleil', [
                {'type': 'explique', 'texte': 'Le matin, le Soleil se lève à l’est. Le soir, il se couche à l’ouest.'},
                {'type': 'piege', 'erreur': 'On confond l’est et l’ouest.', 'correction': 'Sur la carte, l’ouest est à gauche, l’est à droite.'},
            ]),
        ],
        a_toi=[
            q('Où se lève le Soleil ?', ['à l’est', 'à l’ouest', 'au sud'], 'Il se couche à l’ouest.'),
            q('Le contraire du nord :', ['le sud', 'l’est', 'l’ouest'], 'Nord et sud sont opposés.'),
            q('Combien de points cardinaux ?', ['4', '2', '8'], 'Nord, sud, est, ouest.'),
        ],
        sources=[ref('HG-C2-CP-GEO-04', 'Points cardinaux')]),

    'HG-C2-CP-GEO-05': dict(duree=4, essentiel=
        'Des êtres humains vivent sur presque tous les continents.\n'
        'Ils sont très nombreux à certains endroits, comme en Asie.\n'
        'L’Antarctique, très froid, n’a pas d’habitants permanents.',
        parties=[
            ('Beaucoup ou peu d’habitants', [
                {'type': 'tableau', 'titre': 'Où vivent les humains ?', 'colonnes': ['Endroit', 'Habitants'], 'lignes': [
                    ['Chine, Inde', 'très nombreux'], ['Europe', 'nombreux'], ['désert du Sahara', 'très peu'], ['Antarctique', 'aucun habitant permanent']]},
                bq('Où vivent beaucoup de gens ?', ['en Asie', 'au Sahara', 'en Antarctique'], 'La Chine et l’Inde sont très peuplées.'),
            ]),
            ('Pourquoi ?', [
                {'type': 'explique', 'texte': 'Les humains vivent plus nombreux près de l’eau. Ils aiment les climats doux.'},
                {'type': 'piege', 'erreur': 'On croit que les humains sont répartis partout pareil.', 'correction': 'Ils sont nombreux à certains endroits et rares ailleurs.'},
            ]),
        ],
        a_toi=[
            q('Quel continent n’a pas d’habitants permanents ?', ['l’Antarctique', 'l’Europe', 'l’Afrique'], 'Il y fait trop froid.'),
            q('Dans un désert, il y a :', ['peu d’habitants', 'beaucoup d’habitants', 'des villes partout'], 'Il y a très peu d’eau.'),
            q('Les humains vivent plus nombreux près :', ['de l’eau', 'des glaciers', 'des volcans'], 'L’eau est indispensable.'),
        ],
        sources=[ref('HG-C2-CP-GEO-05', 'Le monde est peuplé')]),

    # ---------------------------------------------------------------- Sciences
    'ST-C2-CP-MAT-01': dict(duree=5, essentiel=
        'Pour comparer des masses, on utilise une balance.\n'
        'Le plateau qui porte l’objet le plus lourd descend.\n'
        'Le thermomètre mesure la température, en degrés Celsius (°C).',
        parties=[
            ('Lourd ou léger ?', [
                {'type': 'observe', 'consigne': 'Soupèse des objets.', 'exemples': [
                    'Un gros ballon peut être léger.', 'Une petite bille en verre peut être lourde.', 'Gros ne veut pas dire lourd.']},
                bq('Sur la balance, le plateau qui descend porte l’objet :', ['le plus lourd', 'le plus léger', 'le plus gros'], 'L’objet lourd fait descendre son plateau.'),
            ]),
            ('Lire un thermomètre', [
                {'type': 'methode', 'titre': 'Pour lire la température', 'etapes': [
                    'Tiens le thermomètre par le haut.', 'Mets ton œil au niveau du liquide.', 'Lis le nombre, par exemple 20 °C.']},
                {'type': 'piege', 'erreur': 'On tient le thermomètre par le bas.', 'correction': 'La main le réchauffe. Tiens-le par le haut.'},
            ]),
        ],
        a_toi=[
            q('La température se mesure avec :', ['un thermomètre', 'une balance', 'une règle'], 'Il s’exprime en °C.'),
            q('Un objet gros est-il toujours lourd ?', ['pas toujours', 'toujours', 'jamais'], 'Un ballon est gros et léger.'),
            q('°C veut dire :', ['degré Celsius', 'centimètre', 'cuillère'], 'C’est l’unité de température.'),
        ],
        sources=[ref('ST-C2-CP-MAT-01', 'Masses et température')]),

    'ST-C2-CP-MAT-02': dict(duree=4, essentiel=
        'L’eau peut être liquide : pluie, rivière, mer.\n'
        'L’eau peut être solide : glace, neige, grêle.\n'
        'Les nuages sont faits de minuscules gouttes d’eau.',
        parties=[
            ('Dans la nature', [
                {'type': 'tableau', 'titre': 'L’eau autour de nous', 'colonnes': ['Liquide', 'Solide'], 'lignes': [
                    ['pluie', 'neige'], ['rivière', 'glacier'], ['mer', 'banquise'], ['cascade', 'grêle']]},
                bq('La grêle, c’est de l’eau :', ['solide', 'liquide', 'chaude'], 'Ce sont des billes de glace.'),
            ]),
            ('Elle change', [
                {'type': 'piege', 'erreur': 'On croit que la neige n’est pas de l’eau.', 'correction': 'La neige est de l’eau solide. Au chaud, elle fond.'},
                bq('Un glacier est fait d’eau :', ['solide', 'liquide', 'sucrée'], 'C’est de la glace.'),
            ]),
        ],
        a_toi=[
            q('La pluie est de l’eau :', ['liquide', 'solide', 'gelée'], 'Elle coule.'),
            q('Que devient la neige au soleil ?', ['de l’eau liquide', 'du sable', 'de la grêle'], 'Elle fond.'),
            q('La banquise, c’est :', ['de la mer gelée', 'une rivière', 'un nuage'], 'On la trouve près des pôles.'),
        ],
        sources=[ref('ST-C2-CP-MAT-02', 'L’eau solide et liquide')]),

    'ST-C2-CP-VIV-01': dict(duree=5, essentiel=
        'Un être vivant se nourrit, grandit et meurt.\n'
        'Un caillou n’est pas vivant.\n'
        'Le miel et le nid sont fabriqués par des êtres vivants.',
        parties=[
            ('Trier', [
                {'type': 'tableau', 'titre': 'Trois groupes', 'colonnes': ['Vivant', 'Non vivant', 'Fabriqué par un vivant'], 'lignes': [
                    ['chat', 'caillou', 'miel'], ['arbre', 'eau', 'nid'], ['champignon', 'sable', 'toile d’araignée']]},
                {'type': 'methode', 'titre': 'Pour savoir si c’est vivant', 'etapes': [
                    'Est-ce que ça se nourrit ?', 'Est-ce que ça grandit ?', 'Est-ce que ça meurt ?']},
                bq('Le nid de l’oiseau est :', ['fabriqué par un vivant', 'vivant', 'un caillou'], 'L’oiseau l’a construit.'),
            ]),
            ('Attention', [
                {'type': 'piege', 'erreur': 'On croit que tout ce qui bouge est vivant.', 'correction': 'Le vent bouge, mais il n’est pas vivant.'},
            ]),
        ],
        a_toi=[
            q('Une fleur est :', ['vivante', 'non vivante', 'fabriquée'], 'Elle se nourrit et grandit.'),
            q('Le miel est fabriqué par :', ['les abeilles', 'les vaches', 'les arbres'], 'Avec le nectar des fleurs.'),
            q('Un caillou :', ['n’est pas vivant', 'grandit', 'se nourrit'], 'Il ne nait pas et ne meurt pas.'),
        ],
        sources=[ref('ST-C2-CP-VIV-01', 'Vivant, non vivant')]),

    'ST-C2-CP-ENV-01': dict(duree=5, essentiel=
        'Autour de l’école vivent des animaux et des plantes.\n'
        'Chacun vit dans un milieu : la mare, le jardin, la forêt.\n'
        'On les observe sans leur faire de mal.',
        parties=[
            ('Qui vit où ?', [
                {'type': 'tableau', 'titre': 'Des milieux proches', 'colonnes': ['Milieu', 'Des êtres vivants'], 'lignes': [
                    ['mare', 'grenouille, nénuphar'], ['jardin', 'ver de terre, rosier'], ['forêt', 'écureuil, chêne'], ['prairie', 'papillon, herbe']]},
                bq('Où vit la grenouille ?', ['dans la mare', 'dans le désert', 'sur le toit'], 'Elle a besoin d’eau.'),
            ]),
            ('Observer', [
                {'type': 'methode', 'titre': 'Pour observer', 'etapes': [
                    'Regarde de près, sans toucher.', 'Dessine ce que tu vois.', 'Note le lieu et la date.']},
                {'type': 'piege', 'erreur': 'On emporte l’animal pour l’observer.', 'correction': 'On l’observe là où il vit, puis on le laisse.'},
            ]),
        ],
        a_toi=[
            q('Le ver de terre vit :', ['dans la terre', 'dans la mer', 'dans les arbres'], 'Il creuse des galeries.'),
            q('L’écureuil vit souvent :', ['dans la forêt', 'dans la mare', 'dans la mer'], 'Il grimpe aux arbres.'),
            q('Quand on observe un animal :', ['on ne lui fait pas de mal', 'on l’emporte', 'on le réveille'], 'On le respecte.'),
        ],
        sources=[ref('ST-C2-CP-ENV-01', 'Observer son environnement proche')]),

    'ST-C2-CP-ENV-02': dict(duree=4, essentiel=
        'Les humains transforment leur environnement.\n'
        'Ils construisent des routes. Ils plantent des parcs.\n'
        'Je respecte la nature : je ne jette rien par terre.',
        parties=[
            ('Des changements', [
                {'type': 'observe', 'consigne': 'Ce que font les humains.', 'exemples': [
                    'Un champ devient un parking.', 'Des déchets salissent une plage.', 'Un parc est planté d’arbres.']},
                bq('Quel geste aide la nature ?', ['jeter ses déchets à la poubelle', 'arracher des fleurs', 'laisser un papier par terre'], 'Les déchets ne restent pas dans la nature.'),
            ]),
            ('Respecter la nature', [
                {'type': 'piege', 'erreur': 'On croit qu’un petit papier par terre ne gêne pas.', 'correction': 'Un animal peut l’avaler. Il met longtemps à disparaitre.'},
            ]),
        ],
        a_toi=[
            q('Construire une route :', ['transforme l’environnement', 'ne change rien', 'fait pousser des arbres'], 'Les champs et les bois reculent.'),
            q('En forêt, on :', ['garde ses déchets', 'casse les branches', 'arrache les fleurs'], 'On les jette plus tard dans une poubelle.'),
            q('Planter un arbre :', ['aide la nature', 'abime la nature', 'salit la rue'], 'L’arbre abrite des animaux.'),
        ],
        sources=[ref('ST-C2-CP-ENV-02', 'Agir pour l’environnement')]),

    'ST-C2-CP-ENV-03': dict(duree=4, essentiel=
        'Je trie mes déchets : chacun dans la bonne poubelle.\n'
        'Je ferme le robinet. J’éteins la lumière en sortant.\n'
        'Les piles usées vont dans une boite spéciale.',
        parties=[
            ('Des gestes simples', [
                {'type': 'tableau', 'titre': 'Pourquoi ?', 'colonnes': ['Geste', 'Il sert à'], 'lignes': [
                    ['fermer le robinet', 'économiser l’eau'], ['éteindre la lumière', 'économiser l’énergie'],
                    ['trier les déchets', 'recycler'], ['rapporter les piles', 'ne pas polluer']]},
                bq('Une bouteille en plastique vide va :', ['au tri', 'par terre', 'dans la rivière'], 'On la recycle.'),
            ]),
            ('Les piles', [
                {'type': 'piege', 'erreur': 'On jette les piles à la poubelle.', 'correction': 'Les piles polluent. On les rapporte dans un bac de collecte.'},
            ]),
        ],
        a_toi=[
            q('Quand je me brosse les dents, je :', ['ferme le robinet', 'laisse couler l’eau', 'prends un bain'], 'J’économise l’eau.'),
            q('Quand je quitte une pièce, j’éteins :', ['la lumière', 'le frigo', 'le chauffe-eau'], 'J’économise l’énergie.'),
            q('Où va une pile usée ?', ['dans un bac de collecte', 'dans la poubelle', 'dans la rivière'], 'Elle pollue.'),
        ],
        sources=[ref('ST-C2-CP-ENV-03', 'Gestes pour l’environnement')]),

    'ST-C2-CP-CORPS-01': dict(duree=5, essentiel=
        'Les aliments se rangent en familles.\n'
        'Fruits et légumes, féculents, produits laitiers, viandes et poissons…\n'
        'Un aliment est d’origine animale, végétale ou minérale.',
        parties=[
            ('Les familles', [
                {'type': 'tableau', 'titre': 'Les familles d’aliments', 'colonnes': ['Famille', 'Exemples'], 'lignes': [
                    ['fruits et légumes', 'pomme, carotte'], ['viandes, poissons, œufs', 'poulet, sardine'],
                    ['produits laitiers', 'lait, yaourt'], ['féculents et céréales', 'pâtes, riz'],
                    ['matières grasses', 'beurre, huile'], ['boissons', 'eau']]},
                bq('Les pâtes sont des :', ['féculents', 'produits laitiers', 'fruits'], 'Comme le riz et le pain.'),
            ]),
            ('D’où viennent-ils ?', [
                {'type': 'tableau', 'titre': 'L’origine', 'colonnes': ['Origine', 'Exemples'], 'lignes': [
                    ['animale', 'lait, œuf, viande'], ['végétale', 'pomme, carotte, riz'], ['minérale', 'sel, eau'], ['produit transformé', 'pain, gâteau']]},
                {'type': 'piege', 'erreur': 'On croit que le pain pousse dans les champs.', 'correction': 'Le blé pousse. Avec sa farine, on fabrique le pain.'},
            ]),
        ],
        a_toi=[
            q('Le fromage est un :', ['produit laitier', 'féculent', 'légume'], 'Il est fait avec du lait.'),
            q('Le sel est d’origine :', ['minérale', 'animale', 'végétale'], 'Il vient de la mer ou du sol.'),
            q('Le lait est d’origine :', ['animale', 'végétale', 'minérale'], 'Il vient de la vache.'),
        ],
        sources=[ref('ST-C2-CP-CORPS-01', 'Catégories et origine des aliments')]),

    'ST-C2-CP-CORPS-02': dict(duree=5, essentiel=
        'Mon squelette est fait d’os.\n'
        'Les os se rejoignent aux articulations : épaule, coude, genou.\n'
        'Les articulations me permettent de bouger.',
        parties=[
            ('Les articulations', [
                {'type': 'tableau', 'titre': 'Où sont-elles ?', 'colonnes': ['Partie du corps', 'Articulations'], 'lignes': [
                    ['bras', 'épaule, coude, poignet'], ['jambe', 'hanche, genou, cheville'], ['tête', 'cou']]},
                bq('Quelle articulation est au milieu du bras ?', ['le coude', 'le genou', 'la cheville'], 'Il plie le bras.'),
            ]),
            ('Plier ou tourner', [
                {'type': 'observe', 'consigne': 'Bouge doucement.', 'exemples': [
                    'Le coude plie et déplie le bras.', 'Le genou plie et déplie la jambe.', 'L’épaule, le poignet et la cheville tournent.']},
                {'type': 'piege', 'erreur': 'On croit que le genou peut tourner dans tous les sens.', 'correction': 'Le genou plie et déplie. Il ne tourne pas.'},
            ]),
        ],
        a_toi=[
            q('Quelle articulation relie la main au bras ?', ['le poignet', 'la cheville', 'le genou'], 'Il fait tourner la main.'),
            q('Le genou est dans :', ['la jambe', 'le bras', 'le cou'], 'Au milieu de la jambe.'),
            q('Les os forment :', ['le squelette', 'les cheveux', 'la peau'], 'Le squelette soutient le corps.'),
        ],
        sources=[ref('ST-C2-CP-CORPS-02', 'Croissance et mouvement')]),

    'ST-C2-CP-SANTE-01': dict(duree=5, essentiel=
        'Pour être en forme, je dors bien et je bouge chaque jour.\n'
        'Je mange varié. Je me lave les mains et les dents.\n'
        'Je limite le temps passé devant les écrans.',
        parties=[
            ('Ma journée', [
                {'type': 'tableau', 'titre': 'Une bonne journée', 'colonnes': ['Moment', 'Ce qui m’aide'], 'lignes': [
                    ['matin', 'petit déjeuner, brossage des dents'], ['journée', 'jeux, sport, récréation'],
                    ['soir', 'calme, pas d’écran avant de dormir'], ['nuit', 'une longue nuit de sommeil']]},
                bq('Avant de dormir, il vaut mieux :', ['lire une histoire', 'jouer sur une tablette', 'regarder la télé'], 'Les écrans gênent le sommeil.'),
            ]),
            ('Se laver les mains', [
                {'type': 'methode', 'titre': 'Pour bien se laver les mains', 'etapes': [
                    'Mouille tes mains.', 'Frotte avec du savon, entre les doigts aussi.', 'Rince.', 'Sèche.']},
                {'type': 'piege', 'erreur': 'On se lave les mains seulement si elles sont sales.', 'correction': 'Les microbes sont invisibles. Lave-les avant de manger.'},
            ]),
        ],
        a_toi=[
            q('Quand se brosse-t-on les dents ?', ['après les repas', 'une fois par semaine', 'jamais le soir'], 'Matin et soir au moins.'),
            q('Un enfant a besoin :', ['de longues nuits', 'de peu de sommeil', 'de dormir le jour seulement'], 'Le sommeil aide à grandir.'),
            q('Bouger chaque jour, c’est :', ['bon pour la santé', 'dangereux', 'inutile'], 'Le corps devient plus fort.'),
        ],
        sources=[ref('ST-C2-CP-SANTE-01', 'Hygiène de vie et santé')]),

    'ST-C2-CP-OBJ-01': dict(duree=4, essentiel=
        'Un objet technique est fabriqué par les humains.\n'
        'Il répond à un besoin : écrire, s’habiller, se déplacer.\n'
        'Une branche n’est pas un objet technique. Un stylo, si.',
        parties=[
            ('Fabriqué ou naturel ?', [
                {'type': 'tableau', 'titre': 'De la matière à l’objet', 'colonnes': ['Matière', 'Objet'], 'lignes': [
                    ['bois', 'cuillère'], ['argile', 'tuile'], ['laine de mouton', 'pull']]},
                bq('Lequel est un objet technique ?', ['une gomme', 'une feuille d’arbre', 'un caillou'], 'Quelqu’un l’a fabriquée.'),
            ]),
            ('Un objet pour un besoin', [
                {'type': 'tableau', 'titre': 'À quoi ça sert ?', 'colonnes': ['Besoin', 'Objets'], 'lignes': [
                    ['rester au sec', 'parapluie, imperméable'], ['se déplacer', 'vélo, trottinette'], ['écrire', 'crayon, stylo']]},
                {'type': 'piege', 'erreur': 'On croit que tout objet utile est un objet technique.', 'correction': 'Une branche peut servir. Mais personne ne l’a fabriquée.'},
            ]),
        ],
        a_toi=[
            q('Avec la laine du mouton, on fabrique :', ['un pull', 'une tuile', 'une cuillère'], 'On tricote la laine.'),
            q('Pour venir à l’école, on peut utiliser :', ['un vélo', 'une gomme', 'une tuile'], 'C’est un objet pour se déplacer.'),
            q('Une feuille d’arbre est :', ['un objet naturel', 'un objet technique', 'un outil'], 'Elle pousse sur l’arbre.'),
        ],
        sources=[ref('ST-C2-CP-OBJ-01', 'Les objets techniques')]),
}

ecrire(COURS)
