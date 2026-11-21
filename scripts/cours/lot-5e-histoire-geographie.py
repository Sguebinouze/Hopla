"""Lot de cours : histoire-géographie 5e. Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-5e-histoire-geographie.py
    python3 scripts/cours/pages.py content/cours/HG-C4-5E-*.json

Cycle 4 : phrases de 25 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
Chiffres mondiaux arrondis et formulés comme des ordres de grandeur.
"""
from commun import bq, ecrire, q, source_referentiel as ref

COURS = {
    # ------------------------------------------------------------------ Histoire
    'HG-C4-5E-HIST-01': dict(duree=7, essentiel=
        'Au Moyen Âge, trois mondes se partagent la Méditerranée : l’Empire byzantin, l’Occident chrétien et le monde musulman.\n'
        'Ils se combattent, comme lors des croisades à partir de 1095, mais ils échangent aussi des marchandises et des savoirs.\n'
        'Le papier et les chiffres dits arabes arrivent ainsi en Europe.',
        parties=[
            ('Trois mondes', [
                {'type': 'tableau', 'titre': 'Autour de la Méditerranée', 'colonnes': ['Monde', 'Capitale', 'Souverain', 'Religion'], 'lignes': [
                    ['Empire byzantin', 'Constantinople', 'empereur', 'chrétiens orthodoxes'], ['Occident chrétien', 'Aix-la-Chapelle sous Charlemagne', 'empereur, puis rois', 'chrétiens catholiques'],
                    ['monde musulman', 'Bagdad sous les Abbassides', 'calife', 'musulmans']]},
                bq('En 800, Charlemagne est couronné empereur à :', ['Rome', 'Bagdad', 'Constantinople'], 'Par le pape Léon III.'),
            ]),
            ('Guerres et échanges', [
                {'type': 'explique', 'texte': 'En 1095, le pape Urbain II appelle à la croisade pour prendre Jérusalem. Les croisés la conquièrent en 1099.'},
                {'type': 'explique', 'texte': 'Les marchands de Venise et de Gênes commercent avec les ports musulmans et byzantins : épices, soie, papier.'},
                {'type': 'piege', 'erreur': 'On croit que ces trois mondes n’ont connu que la guerre.', 'correction': 'Ils commercent, traduisent les livres des uns et des autres, et partagent des savoirs.'},
            ]),
        ],
        a_toi=[
            q('Le souverain du monde musulman s’appelle :', ['le calife', 'le pape', 'le basileus'], 'Il est chef politique et religieux.'),
            q('La première croisade est lancée en :', ['1095', '800', '1492'], 'Par le pape Urbain II.'),
            q('Quel savoir arrive en Europe par le monde musulman ?', ['les chiffres dits arabes', 'l’imprimerie', 'la boussole électrique'], 'Ils viennent de l’Inde, transmis par les savants arabes.'),
        ],
        sources=[ref('HG-C4-5E-HIST-01', 'Chrétientés et islam')]),

    'HG-C4-5E-HIST-02': dict(duree=7, essentiel=
        'Dans l’Occident féodal, un vassal prête hommage à un seigneur plus puissant. Il reçoit un fief en échange de sa fidélité.\n'
        'Les paysans vivent dans la seigneurie et travaillent pour le seigneur.\n'
        'À partir du XIe siècle, les villes se développent et les rois capétiens renforcent leur pouvoir.',
        parties=[
            ('Seigneurs et vassaux', [
                {'type': 'tableau', 'titre': 'L’hommage', 'colonnes': ['Le vassal', 'Le seigneur'], 'lignes': [
                    ['jure fidélité', 'protège son vassal'], ['l’aide à la guerre', 'lui donne un fief, souvent une terre'], ['le conseille', 'rend la justice']]},
                bq('Le fief est :', ['une terre donnée au vassal', 'un impôt payé au roi', 'une arme'], 'Il est donné en échange de la fidélité.'),
            ]),
            ('Une société en mouvement', [
                {'type': 'observe', 'consigne': 'Trois évolutions du XIe au XIIIe siècle.', 'exemples': ['Les paysans défrichent des forêts pour cultiver.', 'Les villes grandissent autour des marchés.', 'Le roi capétien impose peu à peu son autorité aux seigneurs.']},
                {'type': 'piege', 'erreur': 'On croit que le roi commande directement tout le royaume dès 987.', 'correction': 'Au début, les Capétiens contrôlent un petit domaine. Les grands seigneurs sont parfois plus puissants qu’eux.'},
            ]),
        ],
        a_toi=[
            q('Prêter hommage, c’est :', ['jurer fidélité à un seigneur', 'payer une taxe', 'partir en croisade'], 'Le vassal devient « l’homme » du seigneur.'),
            q('Les Capétiens règnent à partir de :', ['987', '1789', '800'], 'Avec Hugues Capet.'),
            q('Défricher, c’est :', ['couper la forêt pour cultiver', 'construire un château', 'fonder une ville'], 'Les terres cultivées s’étendent.'),
        ],
        sources=[ref('HG-C4-5E-HIST-02', 'L’Occident féodal')]),

    'HG-C4-5E-HIST-03': dict(duree=7, essentiel=
        'Aux XVe et XVIe siècles, les humanistes redécouvrent les textes antiques, et l’imprimerie diffuse les livres.\n'
        'En 1517, Luther critique l’Église : c’est le début de la Réforme protestante.\n'
        'Le pouvoir des rois de France se renforce jusqu’à Louis XIV, roi absolu.',
        parties=[
            ('Une frise', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1450, 'date': 'vers 1450', 'evenement': 'Gutenberg met au point l’imprimerie.'},
                    {'annee': 1517, 'date': '1517', 'evenement': 'Luther critique l’Église.'},
                    {'annee': 1598, 'date': '1598', 'evenement': 'Édit de Nantes.'},
                    {'annee': 1661, 'date': '1661', 'evenement': 'Louis XIV gouverne seul.'}]},
                bq('Qui lance la Réforme protestante en 1517 ?', ['Luther', 'Louis XIV', 'Gutenberg'], 'Il critique notamment la vente des indulgences.'),
            ]),
            ('Deux grands empires', [
                {'type': 'explique', 'texte': 'Au XVIe siècle, Charles Quint règne sur l’Espagne, le Saint-Empire et des terres d’Amérique. Soliman le Magnifique dirige l’Empire ottoman.'},
                {'type': 'piege', 'erreur': 'On croit que la Renaissance invente tout à partir de rien.', 'correction': 'Les humanistes s’inspirent des auteurs de l’Antiquité grecque et romaine.'},
            ]),
        ],
        a_toi=[
            q('L’imprimerie est mise au point vers :', ['1450', '1789', '800'], 'Par Gutenberg, à Mayence.'),
            q('Un humaniste :', ['étudie les textes antiques et place l’humain au centre', 'refuse de lire', 'combat dans les croisades'], 'Comme Érasme.'),
            q('Soliman le Magnifique dirige :', ['l’Empire ottoman', 'le Saint-Empire', 'la France'], 'Au XVIe siècle.'),
        ],
        sources=[ref('HG-C4-5E-HIST-03', 'Renaissance, réformes et roi absolu')]),

    'HG-C4-5E-HIST-04': dict(duree=7, essentiel=
        'L’Empire byzantin, héritier de l’Empire romain d’Orient, a pour capitale Constantinople. Son empereur est aussi le protecteur de l’Église.\n'
        'En Occident, Charlemagne est couronné empereur à Rome en 800 par le pape.\n'
        'Dans les deux empires, le souverain s’appuie sur la religion chrétienne.',
        parties=[
            ('Byzance', [
                {'type': 'tableau', 'titre': 'L’Empire byzantin', 'colonnes': ['Repère', 'À retenir'], 'lignes': [
                    ['capitale', 'Constantinople, aujourd’hui Istanbul'], ['langue', 'le grec'], ['empereur célèbre', 'Justinien, au VIe siècle'], ['monument', 'la basilique Sainte-Sophie']]},
                bq('La capitale de l’Empire byzantin est :', ['Constantinople', 'Rome', 'Aix-la-Chapelle'], 'Aujourd’hui Istanbul.'),
            ]),
            ('Charlemagne', [
                {'type': 'explique', 'texte': 'Charlemagne contrôle son empire grâce aux comtes et aux missi dominici, envoyés qui vérifient que ses ordres sont appliqués.'},
                {'type': 'piege', 'erreur': 'On croit que Charlemagne a inventé l’école.', 'correction': 'Il développe les écoles dans les monastères et les cathédrales, mais elles existaient déjà.'},
            ]),
        ],
        a_toi=[
            q('Charlemagne est couronné empereur en :', ['800', '1515', '476'], 'À Rome, par le pape.'),
            q('Les missi dominici sont :', ['des envoyés de Charlemagne', 'des moines byzantins', 'des marchands'], 'Ils contrôlent les comtes.'),
            q('À Byzance, on parle surtout :', ['grec', 'latin', 'arabe'], 'Le grec est la langue de l’Empire.'),
        ],
        sources=[ref('HG-C4-5E-HIST-04', 'Byzance et l’Europe carolingienne')]),

    'HG-C4-5E-HIST-05': dict(duree=7, essentiel=
        'Au VIIe siècle, en Arabie, Mahomet prêche une nouvelle religion monothéiste : l’islam. Son départ pour Médine, en 622, ouvre le calendrier musulman.\n'
        'Ses successeurs, les califes, conquièrent un vaste empire, de l’Espagne à l’Inde.\n'
        'Bagdad, capitale des Abbassides, devient un grand centre de savoir jusqu’à sa prise par les Mongols en 1258.',
        parties=[
            ('Naissance et expansion', [
                {'type': 'frise', 'reperes': [
                    {'annee': 622, 'date': '622', 'evenement': 'Hégire : départ de Mahomet pour Médine.'},
                    {'annee': 711, 'date': '711', 'evenement': 'Les armées arabes entrent en Espagne.'},
                    {'annee': 762, 'date': '762', 'evenement': 'Fondation de Bagdad.'},
                    {'annee': 1258, 'date': '1258', 'evenement': 'Prise de Bagdad par les Mongols.'}]},
                bq('Le livre sacré des musulmans est :', ['le Coran', 'la Bible', 'la Torah'], 'Les musulmans le considèrent comme la parole de Dieu.'),
            ]),
            ('Bagdad, ville de savoir', [
                {'type': 'explique', 'texte': 'Les savants de Bagdad traduisent en arabe des textes grecs, persans et indiens. Ils font progresser les mathématiques, l’astronomie et la médecine.'},
                {'type': 'piege', 'erreur': 'On croit que l’empire arabe est uniquement peuplé de musulmans.', 'correction': 'Des chrétiens et des juifs y vivent aussi : ils paient un impôt particulier.'},
            ]),
        ],
        a_toi=[
            q('L’année 622 marque :', ['le début du calendrier musulman', 'la fondation de Bagdad', 'la mort de Charlemagne'], 'C’est l’Hégire.'),
            q('Les Abbassides ont pour capitale :', ['Bagdad', 'La Mecque', 'Cordoue'], 'Fondée en 762.'),
            q('Bagdad est prise en 1258 par :', ['les Mongols', 'les croisés', 'les Byzantins'], 'La ville est en grande partie détruite.'),
        ],
        sources=[ref('HG-C4-5E-HIST-05', 'De la naissance de l’islam à Bagdad')]),

    'HG-C4-5E-HIST-06': dict(duree=6, essentiel=
        'La seigneurie est le domaine d’un seigneur, autour de son château.\n'
        'Les paysans lui paient des taxes, comme la taille, et lui doivent des corvées. Ils paient aussi pour utiliser son moulin ou son four.\n'
        'Du XIe au XIIIe siècle, les paysans défrichent et produisent davantage.',
        parties=[
            ('Les droits du seigneur', [
                {'type': 'tableau', 'titre': 'Ce que doivent les paysans', 'colonnes': ['Obligation', 'Contenu'], 'lignes': [
                    ['taille', 'une taxe en argent ou en nature'], ['corvée', 'des jours de travail gratuit sur les terres du seigneur'], ['banalités', 'payer pour utiliser le moulin, le four, le pressoir'], ['dime', 'une part des récoltes pour l’Église']]},
                bq('Les banalités sont des taxes pour :', ['utiliser le moulin ou le four du seigneur', 'aller à la messe', 'se marier'], 'Le seigneur possède ces équipements.'),
            ]),
            ('Produire plus', [
                {'type': 'observe', 'consigne': 'Des progrès agricoles.', 'exemples': ['la charrue, qui retourne mieux la terre', 'le collier d’épaule, qui permet au cheval de tirer plus fort', 'les moulins à eau et à vent']},
                {'type': 'piege', 'erreur': 'On croit que tous les paysans sont des serfs.', 'correction': 'Beaucoup sont libres : les serfs, eux, ne peuvent pas quitter la seigneurie.'},
            ]),
        ],
        a_toi=[
            q('La corvée est :', ['un travail gratuit pour le seigneur', 'une taxe en argent', 'une fête'], 'Les paysans travaillent sur la réserve du seigneur.'),
            q('Un serf :', ['ne peut pas quitter la seigneurie', 'est un seigneur', 'est un marchand'], 'Il est attaché à la terre.'),
            q('La charrue sert à :', ['retourner la terre', 'moudre le grain', 'tisser'], 'Elle prépare les champs.'),
        ],
        sources=[ref('HG-C4-5E-HIST-06', 'Seigneurs et paysans')]),

    'HG-C4-5E-HIST-07': dict(duree=6, essentiel=
        'À partir du XIe siècle, les villes grandissent grâce au commerce et à l’artisanat.\n'
        'Les habitants des villes, les bourgeois, obtiennent des seigneurs des chartes de franchise qui leur donnent des libertés.\n'
        'Les foires de Champagne attirent les marchands de toute l’Europe.',
        parties=[
            ('Marchands et artisans', [
                {'type': 'tableau', 'titre': 'La ville médiévale', 'colonnes': ['Qui ?', 'Ce qu’ils font'], 'lignes': [
                    ['marchands', 'achètent et revendent, parfois très loin'], ['artisans', 'fabriquent : drapiers, forgerons, boulangers'], ['métiers', 'regroupent les artisans d’une même profession, avec des règles'], ['bourgeois', 'gouvernent parfois leur ville']]},
                bq('Une charte de franchise donne aux habitants d’une ville :', ['des libertés', 'un château', 'une armée'], 'Le seigneur leur accorde des droits.'),
            ]),
            ('Les foires', [
                {'type': 'explique', 'texte': 'Dans les foires de Champagne, les marchands italiens et flamands échangent draps, épices et soieries.'},
                {'type': 'piege', 'erreur': 'On croit qu’au Moyen Âge, la majorité de la population vit en ville.', 'correction': 'Les villes grandissent, mais l’immense majorité vit toujours à la campagne.'},
            ]),
        ],
        a_toi=[
            q('Les habitants des villes au Moyen Âge sont appelés :', ['les bourgeois', 'les serfs', 'les vassaux'], 'Ils vivent dans le bourg, la ville.'),
            q('Les foires de Champagne sont :', ['de grands marchés', 'des batailles', 'des fêtes religieuses'], 'Des marchands de toute l’Europe s’y retrouvent.'),
            q('Un métier, au Moyen Âge, regroupe :', ['les artisans d’une même profession', 'tous les paysans', 'les chevaliers'], 'Il fixe des règles de travail.'),
        ],
        sources=[ref('HG-C4-5E-HIST-07', 'Les villes au Moyen Âge')]),

    'HG-C4-5E-HIST-08': dict(duree=7, essentiel=
        'Du XIIe au XVe siècle, les rois capétiens puis valois agrandissent leur domaine et imposent leur autorité aux seigneurs.\n'
        'Philippe Auguste remporte la bataille de Bouvines en 1214.\n'
        'Pendant la guerre de Cent Ans (1337-1453), les rois de France l’emportent finalement sur les Anglais.',
        parties=[
            ('Des rois de plus en plus puissants', [
                {'type': 'frise', 'reperes': [
                    {'annee': 987, 'date': '987', 'evenement': 'Hugues Capet devient roi.'},
                    {'annee': 1214, 'date': '1214', 'evenement': 'Victoire de Philippe Auguste à Bouvines.'},
                    {'annee': 1337, 'date': '1337', 'evenement': 'Début de la guerre de Cent Ans.'},
                    {'annee': 1453, 'date': '1453', 'evenement': 'Fin de la guerre de Cent Ans.'}]},
                bq('Qui gagne la bataille de Bouvines en 1214 ?', ['Philippe Auguste', 'Louis XIV', 'Charlemagne'], 'Il bat une coalition menée par l’empereur.'),
            ]),
            ('Les moyens du pouvoir', [
                {'type': 'tableau', 'titre': 'Comment le roi s’impose', 'colonnes': ['Moyen', 'Exemple'], 'lignes': [
                    ['la guerre', 'Bouvines, guerre de Cent Ans'], ['la justice', 'Saint Louis rend la justice'], ['l’impôt', 'des impôts réguliers à la fin du Moyen Âge'], ['l’administration', 'des baillis représentent le roi']]},
                {'type': 'piege', 'erreur': 'On croit que la guerre de Cent Ans dure exactement cent ans, sans pause.', 'correction': 'Elle dure 116 ans, avec des trêves entre les combats.'},
            ]),
        ],
        a_toi=[
            q('Jeanne d’Arc combat pendant :', ['la guerre de Cent Ans', 'les croisades', 'les guerres de Religion'], 'Elle délivre Orléans en 1429.'),
            q('La guerre de Cent Ans oppose la France à :', ['l’Angleterre', 'l’Espagne', 'l’Empire ottoman'], 'De 1337 à 1453.'),
            q('Les baillis sont :', ['des représentants du roi', 'des paysans', 'des moines'], 'Ils appliquent ses décisions dans les provinces.'),
        ],
        sources=[ref('HG-C4-5E-HIST-08', 'Capétiens et Valois')]),

    'HG-C4-5E-HIST-09': dict(duree=7, essentiel=
        'Les humanistes, comme Érasme, étudient les textes antiques et placent l’être humain au centre de leur réflexion.\n'
        'L’imprimerie, mise au point par Gutenberg vers 1450, diffuse rapidement leurs idées.\n'
        'Après la Réforme de Luther (1517), la France connait les guerres de Religion, jusqu’à l’édit de Nantes en 1598.',
        parties=[
            ('Humanisme et imprimerie', [
                {'type': 'explique', 'texte': 'Avant l’imprimerie, chaque livre est copié à la main. Avec les caractères mobiles, on imprime des centaines d’exemplaires.'},
                bq('Qui met au point l’imprimerie à caractères mobiles en Europe ?', ['Gutenberg', 'Luther', 'Érasme'], 'Vers 1450, à Mayence.'),
            ]),
            ('Réformes et guerres de Religion', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1517, 'date': '1517', 'evenement': 'Luther critique l’Église.'},
                    {'annee': 1562, 'date': '1562', 'evenement': 'Début des guerres de Religion en France.'},
                    {'annee': 1572, 'date': '1572', 'evenement': 'Massacre de la Saint-Barthélemy.'},
                    {'annee': 1598, 'date': '1598', 'evenement': 'Édit de Nantes.'}]},
                {'type': 'piege', 'erreur': 'On croit que l’édit de Nantes rend la France protestante.', 'correction': 'Le catholicisme reste la religion du roi. L’édit accorde aux protestants la liberté de culte, dans certaines limites.'},
            ]),
        ],
        a_toi=[
            q('L’édit de Nantes est signé par :', ['Henri IV', 'François Ier', 'Louis XIV'], 'En 1598.'),
            q('Les protestants sont des chrétiens qui :', ['suivent les idées de la Réforme', 'obéissent au pape', 'sont musulmans'], 'Ils rejettent l’autorité du pape.'),
            q('La Saint-Barthélemy, en 1572, est :', ['un massacre de protestants', 'une victoire royale', 'une découverte'], 'À Paris, puis dans d’autres villes.'),
        ],
        sources=[ref('HG-C4-5E-HIST-09', 'Humanisme et réformes')]),

    'HG-C4-5E-HIST-10': dict(duree=7, essentiel=
        'En 1492, Christophe Colomb atteint l’Amérique. Les Espagnols et les Portugais conquièrent de vastes territoires.\n'
        'Au XVIe siècle, Charles Quint règne sur un empire immense, de l’Espagne à l’Amérique.\n'
        'En face, Soliman le Magnifique dirige l’Empire ottoman, qui assiège Vienne en 1529.',
        parties=[
            ('Deux empires rivaux', [
                {'type': 'tableau', 'titre': 'Au XVIe siècle', 'colonnes': ['Critère', 'Charles Quint', 'Soliman le Magnifique'], 'lignes': [
                    ['empire', 'Espagne, Saint-Empire, Pays-Bas, Amérique', 'Empire ottoman'], ['capitale', 'pas de capitale fixe', 'Istanbul'], ['religion', 'catholique', 'musulman']]},
                bq('En 1529, l’armée de Soliman assiège :', ['Vienne', 'Paris', 'Rome'], 'Elle ne parvient pas à prendre la ville.'),
            ]),
            ('Les conquêtes en Amérique', [
                {'type': 'explique', 'texte': 'Cortés détruit l’Empire aztèque en 1521, Pizarro l’Empire inca à partir de 1532. Les populations amérindiennes sont décimées par la guerre et les maladies.'},
                {'type': 'piege', 'erreur': 'On croit que Colomb voulait découvrir un nouveau continent.', 'correction': 'Il cherchait une route vers l’Asie par l’ouest.'},
            ]),
        ],
        a_toi=[
            q('L’Empire aztèque est détruit par :', ['Cortés', 'Pizarro', 'Magellan'], 'En 1521.'),
            q('Charles Quint règne notamment sur :', ['l’Espagne', 'l’Empire ottoman', 'l’Angleterre'], 'Et sur le Saint-Empire.'),
            q('Pourquoi les Amérindiens meurent-ils en grand nombre ?', ['à cause de la guerre et des maladies venues d’Europe', 'à cause du froid seulement', 'ils ne meurent pas'], 'Ils n’ont aucune défense contre ces maladies.'),
        ],
        sources=[ref('HG-C4-5E-HIST-10', 'Charles Quint, Soliman, découvertes')]),

    'HG-C4-5E-HIST-11': dict(duree=7, essentiel=
        'De François Ier à Louis XIV, le pouvoir royal se renforce.\n'
        'En 1539, l’ordonnance de Villers-Cotterêts impose le français dans les actes officiels.\n'
        'Louis XIV gouverne seul à partir de 1661 : il est un monarque absolu de droit divin et fait de Versailles le symbole de son pouvoir.',
        parties=[
            ('Les étapes', [
                {'type': 'tableau', 'titre': 'Des rois et leurs actes', 'colonnes': ['Roi', 'Règne', 'Acte'], 'lignes': [
                    ['François Ier', '1515-1547', 'ordonnance de Villers-Cotterêts (1539)'], ['Henri IV', '1589-1610', 'édit de Nantes (1598)'], ['Louis XIII', '1610-1643', 'gouverne avec Richelieu'], ['Louis XIV', '1643-1715', 'Versailles, monarchie absolue']]},
                bq('L’ordonnance de Villers-Cotterêts impose :', ['le français dans les actes officiels', 'la religion protestante', 'l’école obligatoire'], 'À la place du latin.'),
            ]),
            ('La monarchie absolue', [
                {'type': 'explique', 'texte': 'Le roi absolu concentre tous les pouvoirs : il fait les lois, rend la justice, lève les impôts. Il dit tenir son pouvoir de Dieu.'},
                {'type': 'piege', 'erreur': 'On croit que Louis XIV gouverne seul dès 1643.', 'correction': 'Il devient roi enfant. Il gouverne seul à partir de 1661, à la mort de Mazarin.'},
            ]),
        ],
        a_toi=[
            q('Un roi « de droit divin » :', ['dit tenir son pouvoir de Dieu', 'est élu par le peuple', 'n’a aucun pouvoir'], 'Personne ne peut contester son autorité.'),
            q('Louis XIV gouverne seul à partir de :', ['1661', '1643', '1715'], 'À la mort de Mazarin.'),
            q('Le roi absolu :', ['fait les lois, rend la justice et lève les impôts', 'partage son pouvoir avec une assemblée élue', 'obéit aux seigneurs'], 'Il concentre les pouvoirs.'),
        ],
        sources=[ref('HG-C4-5E-HIST-11', 'De François Ier au roi absolu')]),

    # ---------------------------------------------------------------- Géographie
    'HG-C4-5E-GEO-01': dict(duree=7, essentiel=
        'La Terre compte plus de 8 milliards d’habitants. La population augmente surtout en Afrique et en Asie du Sud.\n'
        'En Europe et au Japon, elle vieillit et augmente peu.\n'
        'La croissance de la population pose des défis : nourrir, loger, soigner, scolariser.',
        parties=[
            ('Des dynamiques différentes', [
                {'type': 'tableau', 'titre': 'Deux situations', 'colonnes': ['Critère', 'Afrique subsaharienne', 'Europe'], 'lignes': [
                    ['naissances', 'nombreuses', 'peu nombreuses'], ['population', 'jeune, en forte croissance', 'vieillissante, en faible croissance'], ['défis', 'écoles, emplois', 'retraites, soins des personnes âgées']]},
                bq('Le pays le plus peuplé du monde est :', ['l’Inde', 'la France', 'le Brésil'], 'Plus de 1,4 milliard d’habitants.'),
            ]),
            ('Croissance et développement', [
                {'type': 'explique', 'texte': 'Quand un pays se développe, la mortalité baisse d’abord, puis la natalité. La population augmente vite entre les deux.'},
                {'type': 'piege', 'erreur': 'On croit que la population augmente partout au même rythme.', 'correction': 'Elle baisse déjà dans certains pays, comme le Japon, et augmente vite dans d’autres.'},
            ]),
        ],
        a_toi=[
            q('Une population vieillissante compte :', ['de plus en plus de personnes âgées', 'beaucoup d’enfants', 'peu d’adultes'], 'Comme en Europe.'),
            q('La population mondiale est d’environ :', ['8 milliards', '800 millions', '80 milliards'], 'Plus de 8 milliards aujourd’hui.'),
            q('Où la population augmente-t-elle le plus vite ?', ['en Afrique subsaharienne', 'en Europe', 'au Japon'], 'Les naissances y sont nombreuses.'),
        ],
        sources=[ref('HG-C4-5E-GEO-01', 'Démographie et développement')]),

    'HG-C4-5E-GEO-02': dict(duree=6, essentiel=
        'L’eau douce, l’énergie et les terres agricoles sont des ressources limitées.\n'
        'Une population en croissance en a besoin de plus en plus.\n'
        'Quand l’eau disponible ne suffit pas aux besoins, on parle de stress hydrique.',
        parties=[
            ('Trois ressources', [
                {'type': 'tableau', 'titre': 'Des ressources sous pression', 'colonnes': ['Ressource', 'Problème', 'Solution possible'], 'lignes': [
                    ['eau douce', 'manque dans les régions sèches', 'irrigation économe, recyclage des eaux usées'], ['énergie', 'pétrole, gaz et charbon s’épuisent et polluent', 'énergies renouvelables, sobriété'],
                    ['terres agricoles', 'grignotées par les villes', 'agriculture plus productive et durable']]},
                bq('Le stress hydrique, c’est :', ['un manque d’eau par rapport aux besoins', 'une inondation', 'une eau trop salée seulement'], 'Les besoins dépassent l’eau disponible.'),
            ]),
            ('Ménager les ressources', [
                {'type': 'explique', 'texte': 'Un développement durable répond aux besoins d’aujourd’hui sans empêcher les générations futures de répondre aux leurs.'},
                {'type': 'piege', 'erreur': 'On croit que l’eau ne manque que dans les déserts.', 'correction': 'Des régions d’Espagne ou du sud de la France connaissent aussi des sécheresses.'},
            ]),
        ],
        a_toi=[
            q('Une énergie qui ne s’épuise pas est dite :', ['renouvelable', 'fossile', 'nucléaire'], 'Soleil, vent, eau.'),
            q('Le développement durable cherche à :', ['préserver les ressources pour l’avenir', 'consommer le plus possible', 'arrêter toute production'], 'Il pense aux générations futures.'),
            q('Le pétrole est une énergie :', ['fossile', 'renouvelable', 'inépuisable'], 'Formée en millions d’années.'),
        ],
        sources=[ref('HG-C4-5E-GEO-02', 'Des ressources limitées')]),

    'HG-C4-5E-GEO-03': dict(duree=7, essentiel=
        'Le climat de la Terre se réchauffe, surtout à cause des gaz à effet de serre rejetés par les activités humaines.\n'
        'Le niveau de la mer monte, les sécheresses et les canicules deviennent plus fréquentes.\n'
        'Les sociétés réduisent leurs émissions et s’adaptent pour se protéger des risques.',
        parties=[
            ('Des effets', [
                {'type': 'tableau', 'titre': 'Effets du changement climatique', 'colonnes': ['Effet', 'Conséquence'], 'lignes': [
                    ['montée du niveau de la mer', 'érosion des côtes, littoraux menacés'], ['canicules plus fréquentes', 'danger pour la santé, récoltes abimées'], ['fonte des glaciers', 'moins d’eau douce en été']]},
                bq('Quelle activité rejette beaucoup de gaz à effet de serre ?', ['bruler du pétrole ou du charbon', 'planter des arbres', 'faire du vélo'], 'La combustion rejette du CO₂.'),
            ]),
            ('Prévenir et s’adapter', [
                {'type': 'observe', 'consigne': 'Des réponses.', 'exemples': ['réduire les émissions : transports en commun, énergies renouvelables', 'adapter les villes : arbres, toits clairs', 'reculer les habitations menacées par la mer']},
                {'type': 'piege', 'erreur': 'On confond une journée froide et le climat.', 'correction': 'Le climat est une moyenne sur au moins 30 ans. Une journée froide relève de la météo.'},
            ]),
        ],
        a_toi=[
            q('S’adapter au changement climatique, c’est par exemple :', ['planter des arbres en ville contre la chaleur', 'construire au bord de la mer', 'rejeter plus de CO₂'], 'Les arbres font de l’ombre et rafraichissent.'),
            q('La montée du niveau de la mer menace surtout :', ['les littoraux', 'les montagnes', 'les déserts'], 'Les côtes basses peuvent être inondées.'),
            q('Les gaz à effet de serre :', ['retiennent la chaleur autour de la Terre', 'refroidissent la Terre', 'protègent des séismes'], 'Leur augmentation réchauffe le climat.'),
        ],
        sources=[ref('HG-C4-5E-GEO-03', 'Climat et risques')]),

    'HG-C4-5E-GEO-04': dict(duree=7, essentiel=
        'La richesse est très inégalement répartie : le PIB par habitant de la Suisse dépasse plus de 100 fois celui du Burundi.\n'
        'Le PIB mesure la richesse produite. L’IDH ajoute la santé et l’éducation.\n'
        'Les inégalités existent aussi à l’intérieur des pays, entre quartiers ou régions.',
        parties=[
            ('Deux indicateurs', [
                {'type': 'tableau', 'titre': 'Mesurer le développement', 'colonnes': ['Indicateur', 'Ce qu’il mesure'], 'lignes': [
                    ['PIB par habitant', 'la richesse produite dans un pays, divisée par le nombre d’habitants'], ['IDH, entre 0 et 1', 'espérance de vie, durée de scolarisation et revenu']]},
                bq('L’IDH prend en compte :', ['la santé, l’éducation et le revenu', 'seulement la richesse', 'la superficie du pays'], 'Il est plus complet que le PIB.'),
            ]),
            ('À toutes les échelles', [
                {'type': 'explique', 'texte': 'Dans une grande ville comme Rio de Janeiro, des quartiers très riches côtoient des favelas, quartiers pauvres construits sans autorisation.'},
                {'type': 'piege', 'erreur': 'On croit que tous les habitants d’un pays riche sont riches.', 'correction': 'Le PIB par habitant est une moyenne : il cache les écarts entre habitants.'},
            ]),
        ],
        a_toi=[
            q('Un IDH proche de 1 indique :', ['un développement élevé', 'un pays très pauvre', 'un pays sans habitants'], 'L’IDH va de 0 à 1.'),
            q('Le PIB par habitant est :', ['une moyenne', 'le salaire de chaque habitant', 'le nombre d’habitants'], 'Il ne montre pas les écarts.'),
            q('Une favela est :', ['un quartier pauvre', 'un quartier d’affaires', 'une plage'], 'Construite souvent sans autorisation.'),
        ],
        sources=[ref('HG-C4-5E-GEO-04', 'Richesse et pauvreté dans le monde')]),

    'HG-C4-5E-GEO-05': dict(duree=6, essentiel=
        'Plus de 2 milliards de personnes n’ont pas accès à une eau potable gérée en toute sécurité.\n'
        'L’accès à l’énergie est aussi inégal : des centaines de millions de personnes vivent sans électricité, surtout en Afrique subsaharienne.\n'
        'Mieux utiliser l’eau et l’énergie permet d’en consommer moins.',
        parties=[
            ('Un accès inégal', [
                {'type': 'tableau', 'titre': 'Des écarts', 'colonnes': ['Ressource', 'Pays riches', 'Pays pauvres'], 'lignes': [
                    ['eau', 'au robinet, potable', 'puits, rivières, parfois loin'], ['énergie', 'électricité partout', 'coupures, ou pas de réseau']]},
                bq('Où l’accès à l’électricité est-il le plus faible ?', ['en Afrique subsaharienne', 'en Europe', 'en Amérique du Nord'], 'Beaucoup de villages ne sont pas raccordés.'),
            ]),
            ('Mieux utiliser', [
                {'type': 'observe', 'consigne': 'Des solutions.', 'exemples': ['irrigation au goutte-à-goutte', 'récupération de l’eau de pluie', 'panneaux solaires dans les villages isolés', 'isolation des bâtiments']},
                {'type': 'piege', 'erreur': 'On croit que l’eau potable est gratuite et illimitée.', 'correction': 'La rendre potable et l’acheminer coute de l’énergie et de l’argent.'},
            ]),
        ],
        a_toi=[
            q('L’irrigation au goutte-à-goutte permet :', ['d’économiser l’eau', 'de gaspiller l’eau', 'de produire de l’électricité'], 'L’eau va directement aux racines.'),
            q('Dans un village isolé sans réseau, une solution pour l’électricité :', ['des panneaux solaires', 'une centrale nucléaire', 'un câble sous-marin'], 'Ils produisent sur place.'),
            q('Rendre l’eau potable demande :', ['de l’énergie et de l’argent', 'rien du tout', 'seulement de la pluie'], 'Il faut la traiter et la transporter.'),
        ],
        sources=[ref('HG-C4-5E-GEO-05', 'L’eau et l’énergie')]),

    'HG-C4-5E-GEO-06': dict(duree=7, essentiel=
        'Environ 700 millions de personnes souffrent de la faim dans le monde.\n'
        'L’agriculture productive produit beaucoup grâce aux machines et aux engrais, mais elle peut épuiser les sols et polluer l’eau.\n'
        'L’agriculture durable cherche à bien nourrir sans abimer l’environnement.',
        parties=[
            ('Nourrir plus de 8 milliards de personnes', [
                {'type': 'tableau', 'titre': 'Deux agricultures', 'colonnes': ['Critère', 'Agriculture productive', 'Agriculture durable'], 'lignes': [
                    ['moyens', 'machines, engrais chimiques, pesticides', 'rotation des cultures, engrais naturels'], ['avantages', 'rendements élevés', 'sols et eau préservés'], ['limites', 'pollution, sols épuisés', 'rendements parfois plus faibles']]},
                bq('La sous-alimentation, c’est :', ['ne pas manger assez', 'manger trop', 'manger équilibré'], 'Le corps manque d’énergie.'),
            ]),
            ('Pourquoi la faim ?', [
                {'type': 'explique', 'texte': 'La planète produit assez de nourriture. La faim vient surtout de la pauvreté, des guerres et des catastrophes climatiques.'},
                {'type': 'piege', 'erreur': 'On croit que la faim vient d’un manque de nourriture sur Terre.', 'correction': 'Elle vient surtout de l’impossibilité d’acheter ou de produire assez, à cause de la pauvreté ou des conflits.'},
            ]),
        ],
        a_toi=[
            q('L’agriculture productive utilise beaucoup :', ['de machines et d’engrais', 'de chevaux', 'de main-d’œuvre sans outils'], 'Pour des rendements élevés.'),
            q('Une cause principale de la faim est :', ['la pauvreté', 'l’excès de nourriture', 'la pluie'], 'Les familles ne peuvent pas acheter assez.'),
            q('L’agriculture durable cherche à :', ['nourrir sans abimer l’environnement', 'produire sans limite', 'abandonner les cultures'], 'Elle préserve sols et eau.'),
        ],
        sources=[ref('HG-C4-5E-GEO-06', 'Nourrir l’humanité')]),
}

ecrire(COURS)
