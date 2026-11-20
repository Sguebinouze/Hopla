"""Lot de cours : histoire-géographie 6e. Écrit les cours en brouillon (auteur ia).

    python3 scripts/cours/lot-6e-histoire-geographie.py

Cycle 3 : phrases de 20 mots au plus. Les pages des extraits sont retrouvées ensuite dans les PDF archivés.
Dates : connaissances établies et stables (repères du programme de 6e).
"""
from commun import bq, ecrire, q, src, vocabulaire

PROG = 'eduscol-cycle-3-2023'


def frise(*reperes):
    return {'type': 'frise', 'reperes': [{'annee': a, 'date': d, 'evenement': e} for a, d, e in reperes]}


COURS = {
    'HG-C3-6E-HIST-01': dict(duree=9, essentiel=
        'Les premiers humains apparaissent en Afrique. Homo sapiens, notre espèce, y vit il y a environ 300 000 ans.\n'
        'Chasseurs-cueilleurs nomades, les humains peuplent peu à peu toute la Terre.\n'
        'Vers 10 000 avant J.-C., au Proche-Orient, ils deviennent agriculteurs : c’est le Néolithique.\n'
        'Vers 3300 avant J.-C., l’écriture est inventée en Mésopotamie : c’est la fin de la Préhistoire.',
        parties=[
            ('Les débuts de l’humanité', [
                vocabulaire(3, 'Préhistoire', 'Nomade'),
                {'type': 'explique', 'texte': 'Les plus anciens fossiles d’Homo sapiens ont été trouvés en Afrique. Notre espèce quitte ensuite l’Afrique et se répand en Asie, en Europe, en Australie, puis en Amérique.'},
                {'type': 'explique', 'texte': 'Les humains taillent des outils de pierre, maitrisent le feu et peignent les parois des grottes, comme à Chauvet ou à Lascaux.'},
                bq('Sur quel continent apparait Homo sapiens ?', ['l’Afrique', 'l’Europe', 'l’Asie'], 'Les plus anciens fossiles de notre espèce y ont été découverts.'),
            ]),
            ('Des chasseurs-cueilleurs aux agriculteurs', [
                {'type': 'tableau', 'titre': 'Deux modes de vie', 'colonnes': ['Comparer', 'Paléolithique', 'Néolithique'], 'lignes': [
                    ['nourriture', 'chasse, pêche, cueillette', 'agriculture, élevage'], ['habitat', 'campements, abris', 'villages'], ['mode de vie', 'nomade', 'sédentaire']]},
                bq('Quand l’agriculture apparait-elle au Proche-Orient ?', ['vers 10 000 avant J.-C.', 'vers 300 000 avant J.-C.', 'vers 500 après J.-C.'], 'C’est le début du Néolithique dans cette région.'),
            ]),
            ('Les premiers États', [
                {'type': 'explique', 'texte': 'En Mésopotamie et en Égypte naissent les premiers **États**. Des rois gouvernent, lèvent des impôts et font tenir des comptes par des scribes.'},
                {'type': 'piege', 'erreur': 'On croit que les humains de la Préhistoire vivaient avec les dinosaures.', 'correction': 'Les dinosaures non aviens ont disparu il y a environ 66 millions d’années, bien avant les premiers humains.'},
            ]),
            ('Les repères', [
                frise((-300000, 'vers 300 000 av. J.-C.', 'Homo sapiens en Afrique.'), (-10000, 'vers 10 000 av. J.-C.', 'Début du Néolithique au Proche-Orient.'), (-3300, 'vers 3300 av. J.-C.', 'Invention de l’écriture en Mésopotamie.')),
            ]),
        ],
        a_toi=[
            q('Qu’est-ce qui marque la fin de la Préhistoire ?', ['l’invention de l’écriture', 'l’invention du feu', 'la disparition des dinosaures'], 'L’Histoire commence avec les premiers écrits.'),
            q('Un chasseur-cueilleur est :', ['nomade', 'sédentaire', 'agriculteur'], 'Il se déplace pour trouver sa nourriture.'),
            q('Où l’écriture est-elle inventée ?', ['en Mésopotamie', 'en Grèce', 'en Gaule'], 'Vers 3300 avant J.-C.'),
        ],
        sources=[src(PROG, 'Thème 1 - La longue histoire de l’humanité et des migrations', 'Thème du programme de 6e'),
                 src(PROG, 'humaines dans l’agriculture et l’élevage se produisent à des', 'Néolithique')]),

    'HG-C3-6E-HIST-04': dict(duree=8, essentiel=
        'Au Néolithique, les humains cultivent des plantes et élèvent des animaux.\n'
        'Ils deviennent sédentaires et construisent des villages.\n'
        'Ce changement commence vers 10 000 avant J.-C. au Proche-Orient, et plus tard ailleurs.',
        parties=[
            ('Produire sa nourriture', [
                vocabulaire(3, 'Néolithique', 'Sédentaire'),
                {'type': 'observe', 'consigne': 'Au Proche-Orient, dans le Croissant fertile.', 'exemples': [
                    'Les humains sèment du blé et de l’orge.', 'Ils domestiquent moutons, chèvres, bœufs et porcs.', 'Ils stockent les récoltes dans des poteries.']},
                bq('Que veut dire « domestiquer » un animal ?', ['l’élever et le garder près de soi', 'le chasser', 'le dessiner'], 'L’animal vit avec les humains, qui l’élèvent.'),
            ]),
            ('Vivre au village', [
                {'type': 'explique', 'texte': 'Les villages grandissent. On y trouve des maisons, des greniers, des outils de pierre polie et des poteries. Le travail se partage : agriculteurs, potiers, tisserands.'},
                {'type': 'explique', 'texte': 'L’agriculture n’apparait pas partout en même temps. En Gaule, elle arrive vers 6000 à 5000 avant J.-C.'},
                {'type': 'piege', 'erreur': 'On croit que la « révolution » néolithique s’est faite en quelques années.', 'correction': 'Elle s’étale sur des milliers d’années, à des moments différents selon les régions.'},
                bq('Pourquoi les agriculteurs deviennent-ils sédentaires ?', ['ils doivent surveiller leurs champs et leurs troupeaux', 'ils n’aiment plus voyager', 'ils ont inventé la voiture'], 'Les cultures demandent une présence toute l’année.'),
            ]),
        ],
        a_toi=[
            q('Quelle plante est cultivée parmi les premières au Proche-Orient ?', ['le blé', 'le maïs', 'la pomme de terre'], 'Maïs et pomme de terre viennent d’Amérique.'),
            q('Un outil typique du Néolithique est :', ['la hache en pierre polie', 'l’épée en fer', 'la charrue en acier'], 'La pierre est polie au Néolithique.'),
            q('Le Néolithique commence au Proche-Orient vers :', ['10 000 av. J.-C.', '3300 av. J.-C.', '1000 apr. J.-C.'], 'Plusieurs millénaires avant l’écriture.'),
        ],
        sources=[src(PROG, 'La « révolution » néolithique', 'Révolution néolithique'),
                 src(PROG, 'communautés humaines comme l’entrée des activités', 'Agriculture et élevage')]),

    'HG-C3-6E-HIST-05': dict(duree=9, essentiel=
        'En Mésopotamie et en Égypte naissent les premiers États, dirigés par des rois.\n'
        'Vers 3300 avant J.-C., l’écriture cunéiforme est inventée en Mésopotamie, sur des tablettes d’argile.\n'
        'En Égypte, le pharaon règne sur un royaume unifié. Les scribes écrivent en hiéroglyphes.',
        parties=[
            ('Des États au bord des fleuves', [
                vocabulaire(3, 'État'),
                {'type': 'tableau', 'titre': 'Deux civilisations', 'colonnes': ['Comparer', 'Mésopotamie', 'Égypte'], 'lignes': [
                    ['fleuves', 'Tigre et Euphrate', 'Nil'], ['pouvoir', 'rois de cités-États, puis empires', 'pharaon, roi-dieu'], ['écriture', 'cunéiforme', 'hiéroglyphes'], ['monuments', 'ziggourats', 'pyramides, temples']]},
                bq('Quel fleuve traverse l’Égypte ?', ['le Nil', 'le Tigre', 'le Rhône'], 'Ses crues fertilisent les terres.'),
            ]),
            ('Pourquoi écrire ?', [
                {'type': 'explique', 'texte': 'Les premiers écrits servent à compter : récoltes, impôts, troupeaux. L’écriture sert ensuite aux lois, aux prières et aux récits.'},
                {'type': 'explique', 'texte': 'Vers 1750 avant J.-C., le roi Hammurabi de Babylone fait graver un recueil de lois sur une stèle.'},
                {'type': 'piege', 'erreur': 'On croit que les hiéroglyphes ont toujours été compris.', 'correction': 'Leur sens fut oublié. Champollion les a déchiffrés en 1822 grâce à la pierre de Rosette.'},
                bq('Sur quoi écrit-on en Mésopotamie ?', ['des tablettes d’argile', 'du papier', 'des tablettes numériques'], 'On les marque avec un roseau taillé en coin.'),
            ]),
            ('Les repères', [
                frise((-3300, 'vers 3300 av. J.-C.', 'Écriture cunéiforme en Mésopotamie.'), (-3100, 'vers 3100 av. J.-C.', 'Unification de l’Égypte.'), (-1750, 'vers 1750 av. J.-C.', 'Code de Hammurabi à Babylone.')),
            ]),
        ],
        a_toi=[
            q('Comment s’appelle le roi de l’Égypte ancienne ?', ['le pharaon', 'l’empereur', 'le consul'], 'Il est considéré comme un dieu.'),
            q('À quoi servent d’abord les premiers écrits ?', ['à compter et gérer', 'à écrire des romans', 'à envoyer des lettres d’amour'], 'Récoltes, impôts, troupeaux.'),
            q('Qui a déchiffré les hiéroglyphes ?', ['Champollion', 'Hammurabi', 'Ramsès II'], 'En 1822, grâce à la pierre de Rosette.'),
        ],
        sources=[src(PROG, 'Premiers États, premières écritures', 'Premiers États, premières écritures'),
                 src(PROG, 'dans le cadre de l’Orient ancien et peut concerner l’Égypte ou', 'Égypte et Mésopotamie')]),

    'HG-C3-6E-HIST-02': dict(duree=9, essentiel=
        'Au Ier millénaire avant J.-C., trois peuples de la Méditerranée laissent un héritage commun.\n'
        'Les Grecs vivent en cités rivales mais partagent une langue, des dieux et des jeux. Athènes invente la démocratie.\n'
        'Rome raconte sa fondation par un mythe. Les Hébreux croient en un dieu unique.',
        parties=[
            ('Trois peuples, trois héritages', [
                {'type': 'tableau', 'titre': 'Héritages de l’Antiquité', 'colonnes': ['Peuple', 'Lieu', 'Héritage'], 'lignes': [
                    ['Grecs', 'Athènes, Sparte, les cités', 'démocratie, Jeux olympiques, théâtre'], ['Romains', 'Rome', 'mythe de fondation, droit, latin'], ['Hébreux', 'Jérusalem', 'monothéisme, Bible hébraïque']]},
                bq('Quel peuple croit en un dieu unique ?', ['les Hébreux', 'les Grecs', 'les Romains'], 'Les Grecs et les Romains sont polythéistes.'),
            ]),
            ('Histoire ou fiction ?', [
                vocabulaire(3, 'Archéologie', 'Mythe'),
                {'type': 'explique', 'texte': 'Les récits anciens mêlent faits et légendes. L’archéologie permet de confronter ces récits aux traces matérielles.'},
                {'type': 'methode', 'titre': 'Pour distinguer histoire et fiction', 'etapes': [
                    'Repère qui raconte et à quelle époque.',
                    'Cherche ce que les fouilles confirment ou non.',
                    'Sépare ce qui est prouvé de ce qui est cru.']},
                {'type': 'piege', 'erreur': 'On prend Romulus et Rémus pour des personnages historiques prouvés.', 'correction': 'C’est une légende. Les fouilles montrent des villages sur le Palatin au VIIIe siècle avant J.-C.'},
            ]),
        ],
        a_toi=[
            q('Dans quelle cité naît la démocratie ?', ['Athènes', 'Sparte', 'Rome'], 'Au VIe siècle avant J.-C.'),
            q('Quelle science étudie les traces matérielles du passé ?', ['l’archéologie', 'l’astronomie', 'la géologie'], 'Elle confronte récits et vestiges.'),
            q('Les Grecs et les Romains sont :', ['polythéistes', 'monothéistes', 'sans religion'], 'Ils croient en plusieurs dieux.'),
        ],
        sources=[src(PROG, 'Thème 2 - Récits fondateurs, croyances et citoyenneté dans la Méditerranée antique', 'Thème du programme'),
                 src(PROG, 'confronter à plusieurs reprises faits historiques et croyances.', 'Faits et croyances')]),

    'HG-C3-6E-HIST-06': dict(duree=10, essentiel=
        'Les Grecs vivent dans des cités indépendantes et souvent rivales, comme Athènes et Sparte.\n'
        'Ils partagent une langue, les dieux de l’Olympe, les récits d’Homère et les Jeux olympiques, créés en 776 avant J.-C.\n'
        'À Athènes, à la fin du VIe siècle avant J.-C., naît la démocratie. Seuls les hommes libres nés de parents athéniens sont citoyens.',
        parties=[
            ('Un monde de cités', [
                vocabulaire(3, 'Cité', 'Polythéisme'),
                {'type': 'explique', 'texte': 'Chaque cité a ses lois, son armée et ses dieux protecteurs. Athéna protège Athènes. Les Grecs fondent aussi des colonies, comme Marseille vers 600 avant J.-C.'},
                bq('Comment s’appelle le dieu principal des Grecs ?', ['Zeus', 'Jupiter', 'Osiris'], 'Jupiter est son équivalent romain.'),
            ]),
            ('Ce qui unit les Grecs', [
                {'type': 'tableau', 'titre': 'Une culture commune', 'colonnes': ['Élément', 'Exemple'], 'lignes': [
                    ['langue', 'le grec'], ['dieux', 'Zeus, Héra, Athéna, Apollon, sur l’Olympe'], ['récits', 'l’Iliade et l’Odyssée, attribuées à Homère'], ['sanctuaires', 'Olympie, Delphes'], ['jeux', 'Jeux olympiques en l’honneur de Zeus, dès 776 avant J.-C.']]},
                {'type': 'piege', 'erreur': 'On croit que la Grèce antique formait un seul pays.', 'correction': 'Les cités étaient indépendantes et se faisaient parfois la guerre.'},
            ]),
            ('La démocratie athénienne', [
                vocabulaire(3, 'Démocratie', 'Citoyen'),
                {'type': 'explique', 'texte': 'Vers 508 avant J.-C., Clisthène donne le pouvoir aux citoyens. Ils votent les lois à l’Ecclésia, l’assemblée réunie sur la colline de la Pnyx.'},
                {'type': 'tableau', 'titre': 'Qui est citoyen à Athènes ?', 'colonnes': ['Habitant', 'Citoyen ?'], 'lignes': [
                    ['homme libre, majeur, de parents athéniens', 'oui'], ['femme', 'non'], ['étranger (métèque)', 'non'], ['esclave', 'non']]},
                bq('Les femmes d’Athènes sont-elles citoyennes ?', ['non', 'oui', 'seulement à Sparte'], 'Elles sont exclues de la vie politique.'),
            ]),
            ('Les repères', [
                frise((-776, '776 av. J.-C.', 'Premiers Jeux olympiques.'), (-600, 'vers 600 av. J.-C.', 'Fondation de Marseille par des Grecs.'), (-508, 'vers 508 av. J.-C.', 'Réformes de Clisthène à Athènes.')),
            ]),
        ],
        a_toi=[
            q('Où se tiennent les Jeux olympiques antiques ?', ['à Olympie', 'à Athènes', 'à Rome'], 'Dans le sanctuaire de Zeus.'),
            q('L’Ecclésia est :', ['l’assemblée des citoyens', 'un temple', 'une armée'], 'Les citoyens y votent les lois.'),
            q('Qui protège Athènes ?', ['Athéna', 'Zeus', 'Poséidon'], 'Son temple est le Parthénon.'),
        ],
        sources=[src(PROG, 'Le monde des cités grecques', 'Le monde des cités grecques'),
                 src(PROG, 'Que sait-on de l’univers culturel commun des Grecs vivant', 'Culture commune'),
                 src(PROG, 'dans des cités rivales ? Dans quelles conditions la démocratie', 'Naissance de la démocratie')]),

    'HG-C3-6E-HIST-07': dict(duree=8, essentiel=
        'Selon la légende, Romulus fonde Rome en 753 avant J.-C., après avoir tué son frère Rémus.\n'
        'L’archéologie montre des villages sur la colline du Palatin dès le VIIIe siècle avant J.-C.\n'
        'Rome utilise ce mythe pour affirmer sa grandeur et sa domination.',
        parties=[
            ('La légende de la fondation', [
                {'type': 'observe', 'consigne': 'Le récit raconté par les auteurs romains.', 'exemples': [
                    'Les jumeaux Romulus et Rémus sont abandonnés sur le Tibre.', 'Une louve les nourrit.', 'Devenus adultes, ils fondent une ville. Romulus tue Rémus et donne son nom à Rome.']},
                {'type': 'explique', 'texte': 'Les Romains font aussi descendre leur peuple du héros troyen Énée, chanté par le poète Virgile.'},
                bq('Quel animal nourrit Romulus et Rémus selon la légende ?', ['une louve', 'une ourse', 'une chèvre'], 'La louve est devenue un symbole de Rome.'),
            ]),
            ('Ce que dit l’histoire', [
                {'type': 'tableau', 'titre': 'Mythe et histoire', 'colonnes': ['Le mythe dit', 'Les historiens savent'], 'lignes': [
                    ['Romulus fonde Rome en 753 av. J.-C.', 'Des villages existent sur le Palatin au VIIIe siècle av. J.-C.'], ['Rome est fondée d’un coup', 'Les villages se regroupent peu à peu'], ['Romulus est le premier roi', 'Rome est gouvernée par des rois, dont des Étrusques, avant la République en 509 av. J.-C.']]},
                {'type': 'piege', 'erreur': 'On croit que la date de 753 avant J.-C. a été prouvée par les fouilles.', 'correction': 'Elle a été calculée par des auteurs romains bien plus tard. C’est une date légendaire.'},
                {'type': 'explique', 'texte': 'Le mythe est mis en scène sur des monnaies, des statues et des fresques. La louve devient un emblème du pouvoir romain.'},
            ]),
            ('Les repères', [
                frise((-753, '753 av. J.-C.', 'Date légendaire de la fondation de Rome.'), (-509, '509 av. J.-C.', 'Début de la République romaine.')),
            ]),
        ],
        a_toi=[
            q('Sur quelle colline trouve-t-on les premiers villages de Rome ?', ['le Palatin', 'l’Olympe', 'l’Acropole'], 'Les fouilles y montrent des cabanes du VIIIe siècle.'),
            q('Quel héros troyen les Romains donnent-ils pour ancêtre ?', ['Énée', 'Ulysse', 'Achille'], 'Virgile raconte son histoire dans l’Énéide.'),
            q('Pourquoi Rome met-elle en scène sa légende ?', ['pour affirmer sa grandeur', 'pour amuser les enfants', 'pour vendre des statues'], 'Le mythe justifie sa domination.'),
        ],
        sources=[src(PROG, 'Rome du mythe à l’histoire', 'Rome du mythe à l’histoire'),
                 src(PROG, 'permet-il à Rome d’asseoir sa domination et comment est-il', 'Usage du mythe')]),

    'HG-C3-6E-HIST-08': dict(duree=9, essentiel=
        'Les Hébreux sont un peuple du Proche-Orient. Dans un monde polythéiste, ils croient en un dieu unique : c’est le monothéisme.\n'
        'Leurs croyances et leur histoire sont racontées dans la Bible hébraïque.\n'
        'Après la destruction du Temple de Jérusalem en 587 avant J.-C., l’exil à Babylone renforce cette foi.',
        parties=[
            ('Un dieu unique', [
                vocabulaire(3, 'Monothéisme'),
                {'type': 'explique', 'texte': 'La Bible hébraïque raconte l’alliance entre Dieu et le peuple hébreu, avec Abraham puis Moïse. La Torah en forme les cinq premiers livres.'},
                bq('Comment appelle-t-on la croyance en un dieu unique ?', ['le monothéisme', 'le polythéisme', 'la mythologie'], 'Mono : un seul.'),
            ]),
            ('Récit biblique et histoire', [
                {'type': 'tableau', 'titre': 'Ce que disent les sources', 'colonnes': ['Récit biblique', 'Ce qu’apportent l’histoire et l’archéologie'], 'lignes': [
                    ['les rois David et Salomon règnent sur Jérusalem', 'une inscription du IXe siècle av. J.-C. mentionne la « maison de David »'], ['le Temple de Jérusalem est détruit', 'Nabuchodonosor, roi de Babylone, prend Jérusalem en 587 av. J.-C.'], ['le peuple part en exil', 'une partie des habitants est déportée à Babylone']]},
                {'type': 'explique', 'texte': 'Beaucoup de textes bibliques sont écrits entre le VIIIe et le VIe siècle avant J.-C. Plusieurs le sont pendant ou après l’exil.'},
                {'type': 'piege', 'erreur': 'On croit que la Bible a été écrite en une seule fois, par un seul auteur.', 'correction': 'C’est un ensemble de textes écrits sur plusieurs siècles.'},
            ]),
            ('Les repères', [
                frise((-1000, 'vers 1000 av. J.-C.', 'Règne de David selon la Bible.'), (-587, '587 av. J.-C.', 'Destruction du Temple de Jérusalem et exil à Babylone.')),
            ]),
        ],
        a_toi=[
            q('Quel roi détruit le Temple de Jérusalem en 587 av. J.-C. ?', ['Nabuchodonosor', 'Hammurabi', 'Auguste'], 'Roi de Babylone.'),
            q('Comment s’appellent les cinq premiers livres de la Bible hébraïque ?', ['la Torah', 'le Coran', 'l’Odyssée'], 'Ils racontent notamment Abraham et Moïse.'),
            q('Les peuples voisins des Hébreux étaient surtout :', ['polythéistes', 'monothéistes', 'chrétiens'], 'Ils croyaient en plusieurs dieux.'),
        ],
        sources=[src(PROG, 'La naissance du monothéisme juif dans un monde polythéiste', 'Monothéisme juif'),
                 src(PROG, 'Les récits mythiques et bibliques sont mis en relation avec les', 'Récits et archéologie')]),

    'HG-C3-6E-HIST-09': dict(duree=9, essentiel=
        'Le christianisme naît en Judée, dans l’Empire romain, au Ier siècle. Les chrétiens croient que Jésus est le fils de Dieu.\n'
        'Ils refusent le culte de l’empereur et sont parfois persécutés, sous Néron puis sous Dioclétien.\n'
        'En 313, Constantin autorise le christianisme. En 380, Théodose en fait la religion officielle.',
        parties=[
            ('Jésus et les premiers chrétiens', [
                {'type': 'explique', 'texte': 'Jésus est un Juif de Galilée. Il prêche vers l’an 30 et meurt crucifié à Jérusalem sous le gouverneur romain Ponce Pilate.'},
                {'type': 'explique', 'texte': 'Ses disciples affirment qu’il est ressuscité. Les apôtres, comme Paul de Tarse, diffusent ce message dans le monde grec et romain. Leurs textes forment le Nouveau Testament.'},
                bq('Dans quelle région naît le christianisme ?', ['en Judée', 'en Gaule', 'en Égypte'], 'Une province de l’Empire romain.'),
            ]),
            ('Persécutés, puis reconnus', [
                {'type': 'tableau', 'titre': 'Les chrétiens et le pouvoir romain', 'colonnes': ['Date', 'Évènement'], 'lignes': [
                    ['64', 'Persécution sous Néron, après l’incendie de Rome'], ['303', 'Grande persécution sous Dioclétien'], ['313', 'Constantin autorise le culte chrétien (édit de Milan)'], ['380', 'Théodose fait du christianisme la religion officielle']]},
                {'type': 'piege', 'erreur': 'On croit que les chrétiens ont été persécutés sans interruption pendant trois siècles.', 'correction': 'Les persécutions sont ponctuelles, souvent locales, avec deux grandes vagues.'},
                bq('Pourquoi les chrétiens sont-ils persécutés ?', ['ils refusent le culte de l’empereur', 'ils refusent de payer le pain', 'ils parlent grec'], 'Pour Rome, c’est un refus d’obéir.'),
            ]),
            ('Les repères', [
                frise((30, 'vers 30', 'Crucifixion de Jésus à Jérusalem.'), (313, '313', 'Constantin autorise le christianisme.'), (380, '380', 'Le christianisme devient religion officielle.')),
            ]),
        ],
        a_toi=[
            q('Quel empereur autorise le christianisme en 313 ?', ['Constantin', 'Néron', 'Auguste'], 'Il se convertit lui-même.'),
            q('Le Nouveau Testament réunit :', ['des textes sur Jésus et les premiers chrétiens', 'les lois de Rome', 'les récits d’Homère'], 'Évangiles et lettres des apôtres.'),
            q('En quelle année le christianisme devient-il religion officielle ?', ['380', '64', '27 av. J.-C.'], 'Sous Théodose.'),
        ],
        sources=[src(PROG, 'Des chrétiens dans l’empire', 'Des chrétiens dans l’empire'),
                 src(PROG, 'Le christianisme issu du judaïsme se développe dans le', 'Naissance du christianisme')]),

    'HG-C3-6E-GEO-01': dict(duree=9, essentiel=
        'Une métropole est une grande ville qui concentre habitants, activités et pouvoirs.\n'
        'Elle a des fonctions économiques, politiques et culturelles, et attire des flux de personnes et de marchandises.\n'
        'Résidents, travailleurs qui font la navette, touristes : chacun l’habite à sa façon.',
        parties=[
            ('Qu’est-ce qu’une métropole ?', [
                vocabulaire(3, 'Métropole'),
                {'type': 'tableau', 'titre': 'Les espaces d’une métropole', 'colonnes': ['Espace', 'Caractéristiques'], 'lignes': [
                    ['centre', 'monuments, commerces, bureaux, sièges du pouvoir'], ['quartier des affaires', 'tours de bureaux, sièges d’entreprises'], ['banlieues', 'logements, zones d’activités, centres commerciaux'], ['espace périurbain', 'lotissements au contact de la campagne']]},
                bq('Quelle fonction joue une métropole capitale ?', ['politique', 'agricole', 'aucune'], 'Elle accueille le gouvernement.'),
            ]),
            ('Habiter et circuler', [
                {'type': 'explique', 'texte': 'Chaque jour, des habitants font la navette entre leur domicile en périphérie et leur travail au centre. Ce sont les **migrations pendulaires**.'},
                {'type': 'tableau', 'titre': 'Deux métropoles', 'colonnes': ['Comparer', 'Pays développé', 'Pays en développement'], 'lignes': [
                    ['exemple', 'Paris', 'Lagos (Nigeria)'], ['atouts', 'emplois, transports, culture', 'emplois, croissance rapide'], ['difficultés', 'embouteillages, prix des logements', 'quartiers informels, manque d’eau et de transports']]},
                {'type': 'piege', 'erreur': 'On croit qu’une métropole s’arrête à la limite de sa commune.', 'correction': 'La métropole s’étend bien au-delà, avec ses banlieues et son espace périurbain.'},
            ]),
        ],
        a_toi=[
            q('Les trajets quotidiens domicile-travail s’appellent :', ['des migrations pendulaires', 'des migrations saisonnières', 'des voyages'], 'Comme le balancier d’une pendule.'),
            q('Où se trouvent souvent les tours de bureaux ?', ['dans le quartier des affaires', 'dans l’espace rural', 'dans les ports de pêche'], 'Les sièges d’entreprises s’y regroupent.'),
            q('Quelle difficulté touche beaucoup de métropoles des pays en développement ?', ['les quartiers informels', 'le manque d’habitants', 'l’absence de commerce'], 'La croissance est plus rapide que les équipements.'),
        ],
        sources=[src(PROG, 'Thème 1 - Habiter une métropole', 'Thème du programme'),
                 src(PROG, 'Il s’agit de caractériser ce qu’est une métropole, en insistant', 'Caractériser une métropole')]),

    'HG-C3-6E-GEO-05': dict(duree=7, essentiel=
        'La ville de demain doit loger plus d’habitants tout en polluant moins.\n'
        'On imagine des transports moins polluants, des bâtiments économes, plus de nature et des circuits courts.\n'
        'C’est un exercice de prospective : on envisage plusieurs futurs possibles.',
        parties=[
            ('Les défis de la ville', [
                {'type': 'tableau', 'titre': 'Problèmes et réponses', 'colonnes': ['Problème', 'Réponse possible'], 'lignes': [
                    ['embouteillages, pollution', 'tramway, pistes cyclables, covoiturage'], ['chaleur en été', 'arbres, parcs, toits végétalisés'], ['approvisionnement lointain', 'jardins partagés, agriculture urbaine, circuits courts'], ['consommation d’énergie', 'bâtiments isolés, panneaux solaires']]},
                bq('Quel moyen de transport pollue le moins en ville ?', ['le vélo', 'la voiture individuelle', 'le camion'], 'Il ne rejette aucun gaz.'),
            ]),
            ('Imaginer et débattre', [
                {'type': 'methode', 'titre': 'Pour imaginer la ville du futur', 'etapes': [
                    'Pars d’un problème réel de ta ville.',
                    'Propose une solution précise.',
                    'Demande-toi qui en profite et ce qu’elle coûte.',
                    'Compare avec d’autres propositions.']},
                {'type': 'explique', 'texte': 'Un **écoquartier** combine logements économes, transports doux, espaces verts et mixité des habitants.'},
                {'type': 'piege', 'erreur': 'On imagine seulement des gadgets : voitures volantes, robots.', 'correction': 'La ville durable repose surtout sur des choix simples : se déplacer, se loger, se nourrir autrement.'},
            ]),
        ],
        a_toi=[
            q('Un toit végétalisé sert à :', ['rafraichir le bâtiment et accueillir la nature', 'garer des voitures', 'faire du bruit'], 'La végétation limite la chaleur.'),
            q('Un circuit court, c’est :', ['acheter des produits venus de près, avec peu d’intermédiaires', 'un trajet en voiture', 'une piste de course'], 'Cela réduit les transports.'),
            q('Un écoquartier cherche à :', ['réduire son impact sur l’environnement', 'augmenter le trafic', 'supprimer les parcs'], 'C’est un quartier durable.'),
        ],
        sources=[src(PROG, 'La ville de demain', 'La ville de demain'),
                 src(PROG, 'la prospective territoriale, à imaginer la ville du futur : comment', 'Prospective territoriale')]),

    'HG-C3-6E-GEO-02': dict(duree=8, essentiel=
        'Un espace de faible densité compte peu d’habitants au kilomètre carré.\n'
        'Ce sont des espaces à fortes contraintes (désert, haute montagne, grand froid, forêt dense) ou des campagnes agricoles.\n'
        'Certains sont riches et liés aux villes, d’autres se vident.',
        parties=[
            ('Mesurer le peuplement', [
                vocabulaire(3, 'Densité de population'),
                {'type': 'exemple-resolu', 'enonce': 'Une commune de 50 km² compte 500 habitants. Quelle est sa densité ?', 'etapes': [
                    'Densité = habitants ÷ superficie.', '500 ÷ 50 = 10.'],
                 'conclusion': '10 habitants par km² : c’est une faible densité.'},
                bq('Un espace de faible densité a :', ['peu d’habitants par km²', 'beaucoup d’habitants par km²', 'aucun habitant'], 'Il est peu peuplé.'),
            ]),
            ('Deux sortes d’espaces peu peuplés', [
                {'type': 'tableau', 'titre': 'Espaces de faible densité', 'colonnes': ['Type', 'Exemples', 'Activités'], 'lignes': [
                    ['espace à fortes contraintes', 'Sahara, Grand Nord, Himalaya, Amazonie', 'élevage nomade, tourisme, mines'], ['campagne agricole riche', 'grandes plaines du Middle West américain', 'grandes exploitations mécanisées'], ['campagne en déprise', 'certaines régions rurales isolées', 'peu d’emplois, départ des jeunes']]},
                {'type': 'piege', 'erreur': 'On croit que faible densité veut dire pauvreté.', 'correction': 'Certaines campagnes peu peuplées sont très riches grâce à une agriculture moderne.'},
            ]),
        ],
        a_toi=[
            q('Quel espace est de faible densité ?', ['le Sahara', 'Tokyo', 'Paris'], 'Le désert est très peu peuplé.'),
            q('Densité d’un territoire de 100 km² avec 2 000 habitants ?', ['20 hab./km²', '200 hab./km²', '2 hab./km²'], '2 000 ÷ 100 = 20.'),
            q('Une campagne « en déprise » :', ['perd des habitants et des activités', 'gagne des habitants', 'devient une métropole'], 'Les jeunes partent, les services ferment.'),
        ],
        sources=[src(PROG, 'Thème 2 - Habiter un espace de faible densité', 'Thème du programme'),
                 src(PROG, 'tout autant des espaces riches intégrés aux dynamiques', 'Espaces agricoles riches ou en déprise')]),

    'HG-C3-6E-GEO-06': dict(duree=8, essentiel=
        'Certains espaces imposent de fortes contraintes : chaleur et sécheresse, froid, altitude, forêt dense.\n'
        'Les sociétés s’y adaptent selon leurs traditions et leurs moyens techniques.\n'
        'Ces espaces sont souvent riches en biodiversité et fragiles.',
        parties=[
            ('Des contraintes et des adaptations', [
                {'type': 'tableau', 'titre': 'S’adapter', 'colonnes': ['Espace', 'Contrainte', 'Adaptation'], 'lignes': [
                    ['désert chaud', 'manque d’eau, chaleur', 'oasis, irrigation, élevage nomade'], ['haute montagne', 'pentes, froid, altitude', 'cultures en terrasses, élevage, stations de ski'], ['milieu polaire', 'froid, nuit polaire', 'habitat isolé, chasse, pêche'], ['forêt équatoriale', 'végétation dense, humidité', 'clairières cultivées, cueillette']]},
                bq('Une oasis permet de vivre dans le désert grâce à :', ['l’eau', 'le vent', 'la neige'], 'Une source ou une nappe d’eau permet de cultiver.'),
            ]),
            ('Représentations et dynamiques', [
                {'type': 'explique', 'texte': 'Ces espaces sont parfois vus comme hostiles, ou comme des lieux sauvages à préserver. Ils attirent aujourd’hui touristes, mines et projets de protection.'},
                {'type': 'piege', 'erreur': 'On croit que ces espaces sont vides d’humains.', 'correction': 'Ils sont peu peuplés, mais des sociétés y vivent depuis longtemps.'},
                bq('Pourquoi protège-t-on la forêt amazonienne ?', ['pour sa biodiversité très riche', 'pour ses autoroutes', 'pour ses métropoles'], 'Elle abrite une multitude d’espèces.'),
            ]),
        ],
        a_toi=[
            q('Les cultures en terrasses répondent à quelle contrainte ?', ['la pente', 'le froid', 'la sécheresse'], 'Elles créent des surfaces planes.'),
            q('Quel espace est à forte contrainte de froid ?', ['le Grand Nord', 'le Sahara', 'la vallée du Nil'], 'Le froid limite les cultures.'),
            q('Un éleveur nomade du désert :', ['se déplace avec ses troupeaux', 'vit dans un immeuble', 'cultive du riz'], 'Il suit les points d’eau et les pâturages.'),
        ],
        sources=[src(PROG, 'Certains espaces présentent des contraintes particulières pour', 'Espaces à fortes contraintes'),
                 src(PROG, 'l’occupation humaine. Les sociétés, suivant leurs traditions', 'Adaptation des sociétés')]),

    'HG-C3-6E-GEO-03': dict(duree=8, essentiel=
        'Les littoraux attirent de plus en plus d’habitants et d’activités.\n'
        'Un littoral industrialo-portuaire accueille un grand port et des usines : Rotterdam, Shanghai, Le Havre.\n'
        'Un littoral touristique accueille plages, hôtels et ports de plaisance : la Côte d’Azur, Cancún.',
        parties=[
            ('Deux types de littoraux', [
                vocabulaire(3, 'Littoral'),
                {'type': 'tableau', 'titre': 'Comparer', 'colonnes': ['Comparer', 'Industrialo-portuaire', 'Touristique'], 'lignes': [
                    ['exemples', 'Rotterdam, Shanghai, Le Havre', 'Côte d’Azur, Cancún, Baléares'], ['aménagements', 'quais, grues, conteneurs, raffineries', 'plages, hôtels, marinas, promenades'], ['habitants', 'dockers, ouvriers', 'touristes, saisonniers, résidents']]},
                bq('Quel port est le premier d’Europe ?', ['Rotterdam', 'Marseille', 'Brest'], 'Aux Pays-Bas, à l’embouchure du Rhin.'),
            ]),
            ('Pourquoi s’installer au bord de la mer ?', [
                {'type': 'explique', 'texte': 'La mer permet le commerce mondial par porte-conteneurs. Elle attire aussi les touristes pour le climat et les loisirs.'},
                {'type': 'piege', 'erreur': 'On croit qu’un littoral n’a qu’une seule activité.', 'correction': 'Marseille est à la fois un grand port industriel et une ville touristique.'},
            ]),
        ],
        a_toi=[
            q('Un littoral avec grues et conteneurs est :', ['industrialo-portuaire', 'touristique', 'agricole'], 'Les conteneurs servent au commerce maritime.'),
            q('Un port de plaisance accueille :', ['des bateaux de loisir', 'des pétroliers', 'des sous-marins'], 'Il sert au tourisme.'),
            q('Pourquoi le commerce mondial passe-t-il par la mer ?', ['les navires transportent beaucoup à faible coût', 'les avions sont interdits', 'les routes n’existent pas'], 'Un porte-conteneurs emporte des milliers de boites.'),
        ],
        sources=[src(PROG, 'Thème 3 - Habiter les littoraux', 'Thème du programme'),
                 src(PROG, 'sur les espaces littoraux à vocation industrialo-portuaire et/ou', 'Industrialo-portuaire et touristique')]),

    'HG-C3-6E-GEO-07': dict(duree=7, essentiel=
        'Les littoraux concentrent une part croissante de la population mondiale : c’est la littoralisation.\n'
        'Ils sont vulnérables : érosion, tempêtes, montée du niveau de la mer, pollution.\n'
        'En France, la loi Littoral de 1986 et le Conservatoire du littoral protègent les côtes.',
        parties=[
            ('Des espaces attractifs', [
                {'type': 'explique', 'texte': 'Ports, industries, tourisme et cadre de vie attirent populations et activités. Les côtes se couvrent de constructions.'},
                bq('Comment appelle-t-on la concentration croissante sur les côtes ?', ['la littoralisation', 'la désertification', 'la métropolisation'], 'Le mot vient de littoral.'),
            ]),
            ('Des espaces fragiles et protégés', [
                {'type': 'tableau', 'titre': 'Menaces et réponses', 'colonnes': ['Menace', 'Réponse'], 'lignes': [
                    ['érosion des plages et des falaises', 'reculer les constructions, replanter les dunes'], ['montée du niveau de la mer', 'digues, relocalisation de quartiers'], ['bétonnage', 'loi Littoral (1986) : limiter les constructions près du rivage'], ['disparition des espaces naturels', 'achat de terrains par le Conservatoire du littoral (créé en 1975)']]},
                {'type': 'piege', 'erreur': 'On croit qu’une digue règle tout.', 'correction': 'Une digue protège un lieu mais peut aggraver l’érosion plus loin. Il faut parfois reculer.'},
                bq('Quel organisme achète des terrains pour protéger les côtes françaises ?', ['le Conservatoire du littoral', 'le Sénat', 'l’Office du tourisme'], 'Créé en 1975.'),
            ]),
        ],
        a_toi=[
            q('Quelle loi limite les constructions près du rivage en France ?', ['la loi Littoral', 'la loi Montagne', 'le Code de la route'], 'Votée en 1986.'),
            q('Quel risque menace les littoraux avec le réchauffement climatique ?', ['la montée du niveau de la mer', 'la sécheresse des glaciers', 'les avalanches'], 'Les eaux montent et les côtes reculent.'),
            q('Replanter une dune sert à :', ['retenir le sable', 'construire un port', 'attirer les voitures'], 'Les plantes fixent le sable.'),
        ],
        sources=[src(PROG, 'Les littoraux concentrent une part accrue de la population', 'Littoralisation'),
                 src(PROG, 'd’aménagement, les conditions naturelles, leur vulnérabilité', 'Vulnérabilité')]),

    'HG-C3-6E-GEO-04': dict(duree=8, essentiel=
        'La Terre compte plus de 8 milliards d’habitants, très inégalement répartis.\n'
        'Trois grands foyers rassemblent l’essentiel de la population : l’Asie de l’Est, l’Asie du Sud et l’Europe.\n'
        'Les déserts, les montagnes et les régions froides sont presque vides. Plus de la moitié des humains vivent en ville.',
        parties=[
            ('Où vivent les humains ?', [
                vocabulaire(3, 'Foyer de population'),
                {'type': 'tableau', 'titre': 'Grands foyers et vides', 'colonnes': ['Foyers de population', 'Espaces presque vides'], 'lignes': [
                    ['Asie de l’Est (Chine, Japon)', 'Sahara'], ['Asie du Sud (Inde, Bangladesh)', 'Sibérie, Grand Nord canadien'], ['Europe', 'Amazonie'], ['foyers secondaires : nord-est des États-Unis, golfe de Guinée', 'Himalaya, Antarctique']]},
                bq('Quel est le grand foyer de population de l’Inde ?', ['l’Asie du Sud', 'l’Asie de l’Est', 'l’Europe'], 'L’Inde est le pays le plus peuplé du monde.'),
            ]),
            ('Expliquer l’inégale répartition', [
                {'type': 'explique', 'texte': 'Les foyers anciens se trouvent dans des plaines fertiles, près des fleuves et des côtes, au climat favorable. L’histoire compte aussi : ces régions sont peuplées depuis des millénaires.'},
                {'type': 'piege', 'erreur': 'On croit que le climat explique tout.', 'correction': 'L’histoire, l’économie et les choix des sociétés comptent autant que le climat.'},
                {'type': 'explique', 'texte': 'Depuis 2007 environ, plus de la moitié de l’humanité vit en ville. Les grandes villes grandissent surtout en Asie et en Afrique.'},
            ]),
        ],
        a_toi=[
            q('Combien d’habitants compte la Terre aujourd’hui ?', ['plus de 8 milliards', 'environ 1 milliard', 'environ 80 millions'], 'Le cap des 8 milliards a été franchi fin 2022.'),
            q('Quel espace est presque vide d’habitants ?', ['le Sahara', 'la vallée du Gange', 'la plaine de Chine du Nord'], 'Le désert offre peu d’eau.'),
            q('Où vit aujourd’hui plus de la moitié de l’humanité ?', ['en ville', 'à la campagne', 'en montagne'], 'Depuis 2007 environ.'),
        ],
        sources=[src(PROG, 'Thème 4 - Le monde habité', 'Thème du programme'),
                 src(PROG, 'Où sont les femmes et les hommes sur la Terre ? Comment', 'Répartition de la population')]),
}

ecrire(COURS)
