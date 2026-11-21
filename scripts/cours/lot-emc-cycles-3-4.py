"""Lot de cours : EMC cycles 3 et 4, CM1 à 3e (programme 2024). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-emc-cycles-3-4.py
    python3 scripts/cours/pages.py content/cours/EM-C3-*.json content/cours/EM-C4-*.json

Cycle 3 : 20 mots par phrase (alerte). Cycle 4 : 25 mots (alerte). Sources : extraits vérifiés du référentiel.
"""
from commun import bq, ecrire, q, source_referentiel as ref, vocabulaire

COURS = {
    # ---------------------------------------------------------------------- CM1
    'EM-C3-CM1-CIV-01': dict(duree=5, essentiel=
        'Le civisme, c’est respecter les règles et agir pour la vie en commun.\n'
        'La civilité, ce sont les règles de politesse et de respect au quotidien.\n'
        'Je dis bonjour, je laisse ma place à une personne âgée dans le bus.',
        parties=[
            ('Civisme et civilité', [
                {'type': 'tableau', 'titre': 'Deux notions', 'colonnes': ['Notion', 'Exemples'], 'lignes': [
                    ['civilité', 'saluer, remercier, tenir la porte, laisser sa place'], ['civisme', 'respecter la loi, voter, protéger le bien commun']]},
                bq('Laisser sa place assise à une personne âgée, c’est :', ['un geste de civilité', 'une obligation de la loi', 'une incivilité'], 'Un geste de respect.'),
            ]),
            ('Pourquoi ?', [
                {'type': 'piege', 'erreur': 'On croit que la politesse est démodée.', 'correction': 'Elle montre qu’on respecte les autres et rend la vie en commun plus agréable.'},
            ]),
        ],
        a_toi=[
            q('Voter aux élections est un acte de :', ['civisme', 'civilité', 'politesse'], 'On participe à la vie de la cité.'),
            q('Tenir la porte à quelqu’un est un geste de :', ['civilité', 'civisme', 'justice'], 'Un geste de politesse.'),
            q('Le civisme concerne :', ['la vie en commun et le respect des règles', 'seulement la politesse', 'les loisirs'], 'On agit pour tous.'),
        ],
        sources=[ref('EM-C3-CM1-CIV-01', 'Civisme et civilité')]),

    'EM-C3-CM1-NUM-01': dict(duree=5, essentiel=
        'En ligne, je respecte les autres comme dans la vie réelle.\n'
        'Je protège mes informations personnelles et je vérifie la source avant de partager.\n'
        'Je limite mon temps d’écran et mes usages inutiles : c’est la sobriété numérique.',
        parties=[
            ('Des règles en ligne', [
                {'type': 'tableau', 'titre': 'Les bons réflexes', 'colonnes': ['Situation', 'Réflexe'], 'lignes': [
                    ['on me demande mon adresse', 'je ne la donne pas'], ['une information étonnante', 'je vérifie qui l’a écrite'], ['un message blessant', 'je ne le partage pas et j’en parle à un adulte'], ['une vidéo de plus', 'je sais m’arrêter']]},
                bq('Avant de partager une information, je :', ['vérifie qui l’a écrite', 'la partage vite', 'ajoute des émojis'], 'La source dit si elle est fiable.'),
            ]),
            ('Respect en ligne', [
                {'type': 'piege', 'erreur': 'On croit qu’un message méchant en ligne compte moins.', 'correction': 'Il blesse autant. Le cyberharcèlement est puni par la loi.'},
            ]),
        ],
        a_toi=[
            q('Mon mot de passe, je le donne :', ['à personne, sauf mes parents', 'à mes amis', 'à un site inconnu'], 'Il protège mes comptes.'),
            q('La sobriété numérique consiste à :', ['éviter les usages inutiles', 'acheter plus d’écrans', 'rester connecté tout le temps'], 'Les écrans consomment de l’énergie.'),
            q('Un camarade reçoit des insultes en ligne. Je :', ['en parle à un adulte', 'like les messages', 'ajoute un commentaire'], 'Le témoin peut agir.'),
        ],
        sources=[ref('EM-C3-CM1-NUM-01', 'Citoyen du numérique')]),

    'EM-C3-CM1-DEM-01': dict(duree=5, essentiel=
        'Démocratie vient du grec : le pouvoir du peuple.\n'
        'En démocratie, les citoyens élisent leurs représentants par le vote.\n'
        'Au suffrage direct, les électeurs choisissent eux-mêmes leurs élus, par exemple le président de la République.',
        parties=[
            ('Le pouvoir du peuple', [
                vocabulaire(3, 'Démocratie', 'Citoyen'),
                bq('En démocratie, le pouvoir appartient :', ['aux citoyens', 'à un roi', 'à l’armée'], 'Ils votent pour choisir leurs représentants.'),
            ]),
            ('Le vote', [
                {'type': 'tableau', 'titre': 'Les règles du vote', 'colonnes': ['Règle', 'Pourquoi'], 'lignes': [
                    ['vote secret, dans l’isoloir', 'chacun choisit librement'], ['une personne, une voix', 'égalité entre électeurs'], ['dès 18 ans pour les citoyens français', 'âge de la majorité']]},
                {'type': 'piege', 'erreur': 'On croit que la démocratie, c’est faire tout ce que veut la majorité.', 'correction': 'La majorité décide, mais elle doit respecter les droits de chacun.'},
            ]),
        ],
        a_toi=[
            q('L’isoloir permet :', ['de voter en secret', 'de compter les voix', 'de choisir les candidats'], 'Personne ne voit le choix.'),
            q('En France, on vote dès :', ['18 ans', '16 ans', '21 ans'], 'L’âge de la majorité.'),
            q('Démocratie signifie :', ['le pouvoir du peuple', 'le pouvoir d’un seul', 'le pouvoir des riches'], 'Du grec dêmos, le peuple.'),
        ],
        sources=[ref('EM-C3-CM1-DEM-01', 'La démocratie')]),

    'EM-C3-CM1-EGA-01': dict(duree=5, essentiel=
        'Tous les êtres humains sont égaux en droits et en dignité.\n'
        'Discriminer, c’est traiter moins bien quelqu’un à cause de son origine, son sexe, son handicap ou sa religion.\n'
        'Les discriminations sont interdites par la loi.',
        parties=[
            ('Reconnaitre une discrimination', [
                {'type': 'tableau', 'titre': 'Des exemples', 'colonnes': ['Situation', 'Discrimination ?'], 'lignes': [
                    ['refuser un enfant dans une équipe à cause de son origine', 'oui'], ['refuser un élève qui n’a pas sa tenue de sport', 'non, c’est une règle commune'], ['payer moins une femme pour le même travail', 'oui']]},
                bq('Refuser un enfant dans un club à cause de son handicap, c’est :', ['une discrimination', 'une règle normale', 'un jeu'], 'C’est interdit.'),
            ]),
            ('Agir', [
                {'type': 'piege', 'erreur': 'On croit qu’une petite remarque sur l’origine de quelqu’un est sans importance.', 'correction': 'Ces remarques blessent et peuvent mener à l’exclusion. On les refuse.'},
            ]),
        ],
        a_toi=[
            q('Être égaux en droits signifie :', ['avoir les mêmes droits', 'être identiques', 'avoir le même âge'], 'Quelles que soient nos différences.'),
            q('Les discriminations sont :', ['interdites par la loi', 'autorisées', 'obligatoires'], 'Elles sont punies.'),
            q('Je suis témoin d’une discrimination. Je :', ['en parle à un adulte', 'ris', 'ne fais rien'], 'Je refuse l’injustice.'),
        ],
        sources=[ref('EM-C3-CM1-EGA-01', 'Égalité et discriminations')]),

    'EM-C3-CM1-FRA-01': dict(duree=5, essentiel=
        'La fraternité est une valeur de la République : elle invite à l’entraide et à la solidarité.\n'
        'L’empathie, c’est comprendre ce que ressent l’autre.\n'
        'Dans un débat, je respecte ceux qui ne pensent pas comme moi.',
        parties=[
            ('L’empathie', [
                {'type': 'explique', 'texte': 'Mon camarade est triste après une mauvaise note. Je comprends ce qu’il ressent, et je l’aide.'},
                bq('Comprendre ce que ressent l’autre, c’est :', ['l’empathie', 'la colère', 'l’indifférence'], 'Se mettre à sa place.'),
            ]),
            ('Débattre avec respect', [
                {'type': 'methode', 'titre': 'Les règles du débat', 'etapes': ['J’écoute jusqu’au bout.', 'Je lève la main pour parler.', 'Je donne mon avis avec une raison.', 'Je critique les idées, pas les personnes.']},
                {'type': 'piege', 'erreur': 'On croit que celui qui crie le plus fort a raison.', 'correction': 'Ce sont les arguments qui comptent, pas la force de la voix.'},
            ]),
        ],
        a_toi=[
            q('La fraternité invite à :', ['l’entraide', 'la compétition', 'l’indifférence'], 'Elle relie les citoyens.'),
            q('Dans un débat, on critique :', ['les idées', 'les personnes', 'les vêtements'], 'On respecte chacun.'),
            q('Un ami est triste. Faire preuve d’empathie, c’est :', ['essayer de comprendre ce qu’il ressent', 'se moquer', 'partir'], 'Se mettre à sa place.'),
        ],
        sources=[ref('EM-C3-CM1-FRA-01', 'Fraternité et empathie')]),

    'EM-C3-CM1-INC-01': dict(duree=4, essentiel=
        'Une incivilité est un comportement qui ne respecte pas les règles de la vie en commun.\n'
        'Jeter un papier par terre, cracher, tagger un mur : ce sont des incivilités.\n'
        'Elles gênent tout le monde et dégradent les lieux partagés.',
        parties=[
            ('Reconnaitre', [
                {'type': 'tableau', 'titre': 'Des incivilités', 'colonnes': ['Incivilité', 'Conséquence'], 'lignes': [
                    ['jeter un papier par terre', 'la rue est sale pour tous'], ['dégrader un banc', 'la commune doit payer la réparation'], ['faire du bruit la nuit', 'les voisins ne dorment pas'], ['bousculer sans s’excuser', 'la personne se sent méprisée']]},
                bq('Tagger le mur de l’école est :', ['une incivilité', 'une œuvre autorisée', 'un geste de civisme'], 'C’est une dégradation.'),
            ]),
            ('Qui paie ?', [
                {'type': 'piege', 'erreur': 'On croit qu’abimer un bien public ne coute rien à personne.', 'correction': 'Les réparations sont payées avec l’argent de tous, par les impôts.'},
            ]),
        ],
        a_toi=[
            q('Les incivilités :', ['nuisent à la vie en commun', 'n’ont aucun effet', 'sont des politesses'], 'Elles gênent tout le monde.'),
            q('Réparer un banc dégradé est payé par :', ['l’argent public, donc de tous', 'personne', 'le banc'], 'Les impôts.'),
            q('Cracher par terre est :', ['une incivilité', 'une règle', 'un geste poli'], 'Cela salit les lieux partagés.'),
        ],
        sources=[ref('EM-C3-CM1-INC-01', 'Les incivilités')]),

    'EM-C3-CM1-DIG-01': dict(duree=4, essentiel=
        'Chaque être humain a une dignité : il mérite le respect, quelle que soit sa situation.\n'
        'On ne se moque pas d’une personne sans abri, malade ou en difficulté.\n'
        'Respecter la dignité, c’est traiter chacun comme une personne, jamais comme un objet.',
        parties=[
            ('Respecter chacun', [
                {'type': 'observe', 'consigne': 'Des situations.', 'exemples': ['Je dis bonjour à l’agent d’entretien.', 'Je ne filme pas une personne en difficulté pour me moquer.', 'Je parle poliment à une personne sans abri.']},
                bq('Filmer une personne qui tombe pour se moquer, c’est :', ['une atteinte à sa dignité', 'drôle', 'autorisé'], 'On ne la respecte pas.'),
            ]),
            ('Un principe de la loi', [
                {'type': 'piege', 'erreur': 'On croit que le respect se mérite par l’argent ou la réussite.', 'correction': 'La dignité appartient à chaque être humain, sans condition.'},
            ]),
        ],
        a_toi=[
            q('Une personne sans abri a :', ['la même dignité que tous', 'moins de droits', 'aucun droit'], 'Chaque être humain.'),
            q('Respecter la dignité, c’est :', ['traiter chacun comme une personne', 'se moquer', 'ignorer'], 'Jamais comme un objet.'),
            q('La dignité dépend :', ['de rien : chacun l’a', 'de l’argent', 'des vêtements'], 'Elle est la même pour tous.'),
        ],
        sources=[ref('EM-C3-CM1-DIG-01', 'La dignité humaine')]),

    # ---------------------------------------------------------------------- CM2
    'EM-C3-CM2-CIT-01': dict(duree=6, essentiel=
        'La nationalité est le lien entre une personne et un État. Les Français majeurs sont citoyens : ils ont des droits politiques.\n'
        'Droits politiques : voter, se présenter aux élections. Droits civils : se marier, posséder un bien, aller en justice.\n'
        'À 18 ans, une citoyenne française peut voter et se présenter aux élections.',
        parties=[
            ('Deux sortes de droits', [
                {'type': 'tableau', 'titre': 'Droits civils et politiques', 'colonnes': ['Droits', 'Exemples', 'Pour qui ?'], 'lignes': [
                    ['civils', 'se marier, posséder un bien, signer un contrat', 'toutes les personnes'], ['politiques', 'voter, être élu', 'les citoyens majeurs']]},
                bq('Voter est un droit :', ['politique', 'civil', 'religieux'], 'Il permet de participer aux choix collectifs.'),
            ]),
            ('Citoyen européen', [
                {'type': 'explique', 'texte': 'Un citoyen d’un autre pays de l’Union européenne qui vit en France peut voter aux élections municipales et européennes.'},
                {'type': 'piege', 'erreur': 'On croit qu’un enfant n’a aucun droit.', 'correction': 'Il a des droits civils et les droits de l’enfant. Il aura les droits politiques à sa majorité.'},
            ]),
        ],
        a_toi=[
            q('Un citoyen français peut voter à partir de :', ['18 ans', '16 ans', '25 ans'], 'À la majorité.'),
            q('Se marier est un droit :', ['civil', 'politique', 'militaire'], 'Il concerne la vie privée.'),
            q('La nationalité est le lien entre :', ['une personne et un État', 'deux amis', 'une ville et sa région'], 'Être Français, par exemple.'),
        ],
        sources=[ref('EM-C3-CM2-CIT-01', 'Citoyenneté et nationalité')]),

    'EM-C3-CM2-DEV-01': dict(duree=5, essentiel=
        'Le citoyen a des droits, mais aussi des devoirs.\n'
        'Il respecte les lois, paie l’impôt, participe à la défense du pays et protège l’environnement.\n'
        'Voter est un droit, et aussi un devoir civique.',
        parties=[
            ('Les devoirs', [
                {'type': 'tableau', 'titre': 'Devoirs du citoyen', 'colonnes': ['Devoir', 'Pourquoi'], 'lignes': [
                    ['respecter les lois', 'vivre ensemble en sécurité'], ['payer l’impôt', 'financer écoles, hôpitaux, routes'], ['voter', 'choisir ses représentants'], ['protéger l’environnement', 'préserver le bien commun']]},
                bq('Les impôts servent notamment à financer :', ['les écoles et les hôpitaux', 'les vacances des élus seulement', 'rien'], 'Des services pour tous.'),
            ]),
            ('Droits et devoirs vont ensemble', [
                {'type': 'piege', 'erreur': 'On croit qu’on peut réclamer ses droits sans respecter ses devoirs.', 'correction': 'Les droits de chacun reposent sur le respect des devoirs par tous.'},
            ]),
        ],
        a_toi=[
            q('Respecter la loi est :', ['un devoir du citoyen', 'facultatif', 'réservé aux adultes célèbres'], 'Pour tous.'),
            q('L’impôt finance :', ['les services publics', 'les jeux vidéo', 'les supermarchés'], 'École, santé, routes.'),
            q('Protéger l’environnement est :', ['un devoir de chacun', 'l’affaire des seuls scientifiques', 'interdit'], 'Le bien commun.'),
        ],
        sources=[ref('EM-C3-CM2-DEV-01', 'Les devoirs du citoyen')]),

    'EM-C3-CM2-SYM-01': dict(duree=5, essentiel=
        'Les symboles de la République sont le drapeau tricolore, La Marseillaise, la devise, Marianne et le 14 juillet.\n'
        'La France est membre de l’Union européenne.\n'
        'Sur la mairie flottent le drapeau français et le drapeau européen aux douze étoiles.',
        parties=[
            ('Symboles de la République', [
                {'type': 'tableau', 'titre': 'À connaitre', 'colonnes': ['Symbole', 'Ce qu’il faut savoir'], 'lignes': [
                    ['drapeau', 'bleu, blanc, rouge'], ['hymne', 'La Marseillaise'], ['devise', 'Liberté, Égalité, Fraternité'], ['Marianne', 'figure de la République'], ['fête nationale', 'le 14 juillet']]},
                bq('Le drapeau européen compte :', ['douze étoiles', '27 étoiles', 'une étoile par pays'], 'Le nombre ne change pas avec les membres.'),
            ]),
            ('La France dans l’Union européenne', [
                {'type': 'explique', 'texte': 'La France est l’un des pays fondateurs de la construction européenne. Elle partage l’euro avec de nombreux pays.'},
                {'type': 'piege', 'erreur': 'On croit que les douze étoiles représentent douze pays.', 'correction': 'Douze est un symbole de perfection et d’unité. Leur nombre ne dépend pas des membres.'},
            ]),
        ],
        a_toi=[
            q('La fête nationale est le :', ['14 juillet', '1er mai', '11 novembre'], 'Depuis 1880.'),
            q('La monnaie partagée par la France et de nombreux pays européens est :', ['l’euro', 'le franc', 'le dollar'], 'Depuis 2002 en pièces et billets.'),
            q('Marianne représente :', ['la République', 'une reine', 'l’Europe'], 'Son buste est dans les mairies.'),
        ],
        sources=[ref('EM-C3-CM2-SYM-01', 'Symboles et Union européenne')]),

    'EM-C3-CM2-LIB-01': dict(duree=5, essentiel=
        'Les libertés fondamentales protègent chacun : liberté d’expression, d’opinion, d’association.\n'
        'Les droits fondamentaux garantissent l’éducation et la santé.\n'
        'Ces libertés ont des limites : la liberté d’expression n’autorise ni l’insulte ni la menace.',
        parties=[
            ('Des libertés', [
                {'type': 'tableau', 'titre': 'Libertés et limites', 'colonnes': ['Liberté', 'Limite'], 'lignes': [
                    ['expression', 'pas d’insulte, pas de menace, pas d’appel à la haine'], ['association', 'respecter la loi'], ['opinion', 'ne pas imposer son avis par la force']]},
                bq('La liberté d’expression permet :', ['de dire ce que l’on pense sans insulter', 'd’insulter qui on veut', 'de menacer'], 'Elle a des limites.'),
            ]),
            ('Pourquoi des limites ?', [
                {'type': 'piege', 'erreur': 'On croit qu’une liberté sans limite protège mieux.', 'correction': 'Sans limite, la liberté de l’un écraserait celle des autres.'},
            ]),
        ],
        a_toi=[
            q('Créer un club avec des amis relève de la liberté :', ['d’association', 'de la presse', 'religieuse'], 'Se regrouper autour d’un projet.'),
            q('Aller à l’école est :', ['un droit fondamental', 'un privilège', 'interdit'], 'Le droit à l’éducation.'),
            q('Menacer quelqu’un en ligne est :', ['interdit par la loi', 'protégé par la liberté d’expression', 'sans conséquence'], 'C’est une limite.'),
        ],
        sources=[ref('EM-C3-CM2-LIB-01', 'Libertés et droits fondamentaux')]),

    'EM-C3-CM2-LOI-01': dict(duree=6, essentiel=
        'Une loi peut être proposée par le gouvernement ou par des parlementaires.\n'
        'Elle est débattue et votée par l’Assemblée nationale et le Sénat : c’est le Parlement.\n'
        'Le président de la République la promulgue, puis elle est publiée au Journal officiel.',
        parties=[
            ('Les étapes', [
                {'type': 'methode', 'titre': 'Comment nait une loi', 'etapes': [
                    'Proposition : par le gouvernement ou par des députés ou sénateurs.', 'Débat et vote à l’Assemblée nationale.', 'Débat et vote au Sénat.', 'Promulgation par le président, publication au Journal officiel.']},
                bq('La loi est votée par :', ['le Parlement', 'le maire', 'les juges'], 'Assemblée nationale et Sénat.'),
            ]),
            ('Le Parlement', [
                {'type': 'tableau', 'titre': 'Deux assemblées', 'colonnes': ['Assemblée', 'Membres', 'Élus par'], 'lignes': [
                    ['Assemblée nationale', 'députés', 'les citoyens, directement'], ['Sénat', 'sénateurs', 'des élus locaux']]},
                {'type': 'piege', 'erreur': 'On croit que le président de la République écrit et vote seul les lois.', 'correction': 'Ce sont les parlementaires qui votent la loi. Le président la promulgue.'},
            ]),
        ],
        a_toi=[
            q('Les députés siègent :', ['à l’Assemblée nationale', 'au Sénat', 'à la mairie'], 'Ils sont élus directement.'),
            q('Une loi entre en vigueur après sa publication au :', ['Journal officiel', 'journal télévisé', 'bulletin scolaire'], 'Elle devient connue de tous.'),
            q('Promulguer une loi, c’est :', ['la signer pour la rendre applicable', 'la refuser', 'la proposer'], 'Rôle du président.'),
        ],
        sources=[ref('EM-C3-CM2-LOI-01', 'Comment nait une loi')]),

    'EM-C3-CM2-FET-01': dict(duree=4, essentiel=
        'Le 14 juillet est la fête nationale depuis 1880.\n'
        'Il rappelle la prise de la Bastille, le 14 juillet 1789, et la fête de la Fédération, en 1790.\n'
        'Marianne, femme coiffée d’un bonnet phrygien, représente la République.',
        parties=[
            ('Le 14 juillet', [
                {'type': 'tableau', 'titre': 'Deux évènements', 'colonnes': ['Date', 'Évènement'], 'lignes': [
                    ['14 juillet 1789', 'prise de la Bastille'], ['14 juillet 1790', 'fête de la Fédération, réunion des Français'], ['1880', 'le 14 juillet devient fête nationale']]},
                bq('Le 14 juillet devient fête nationale en :', ['1880', '1789', '1958'], 'Sous la IIIe République.'),
            ]),
            ('Marianne', [
                {'type': 'explique', 'texte': 'Le bonnet phrygien de Marianne est un symbole de liberté. Son visage figure sur les timbres et les pièces.'},
                {'type': 'piege', 'erreur': 'On croit que le 14 juillet célèbre seulement une bataille.', 'correction': 'Il célèbre aussi l’unité des Français, avec la fête de la Fédération.'},
            ]),
        ],
        a_toi=[
            q('Le bonnet de Marianne s’appelle :', ['le bonnet phrygien', 'la couronne', 'le béret'], 'Un symbole de liberté.'),
            q('La prise de la Bastille date de :', ['1789', '1790', '1880'], 'Le 14 juillet.'),
            q('Le 14 juillet, on célèbre :', ['la fête nationale', 'la fin d’une guerre', 'le premier jour de l’été'], 'Avec un défilé à Paris.'),
        ],
        sources=[ref('EM-C3-CM2-FET-01', 'Le 14 Juillet et Marianne')]),

    'EM-C3-CM2-DIS-01': dict(duree=5, essentiel=
        'Le racisme, le sexisme et le harcèlement sont des atteintes aux personnes.\n'
        'Ils sont punis par la loi.\n'
        'Refuser un logement à quelqu’un à cause de son origine est une discrimination interdite.',
        parties=[
            ('Des atteintes punies', [
                {'type': 'tableau', 'titre': 'Reconnaitre', 'colonnes': ['Atteinte', 'Définition'], 'lignes': [
                    ['racisme', 'mépriser ou rejeter quelqu’un à cause de son origine'], ['sexisme', 'mépriser ou rejeter quelqu’un à cause de son sexe'], ['harcèlement', 'agresser quelqu’un de façon répétée'], ['discrimination', 'traiter quelqu’un moins bien pour l’un de ces motifs']]},
                bq('« Les filles sont nulles en maths » est :', ['un propos sexiste', 'une vérité', 'une blague sans conséquence'], 'C’est un préjugé.'),
            ]),
            ('Agir', [
                {'type': 'observe', 'consigne': 'Des recours.', 'exemples': ['en parler à un adulte de confiance', 'le 3018 contre le harcèlement', 'le Défenseur des droits, qui aide les victimes de discriminations']},
                {'type': 'piege', 'erreur': 'On croit qu’une moquerie raciste « pour rire » n’est pas grave.', 'correction': 'Elle blesse et peut être punie. L’intention de rire ne l’excuse pas.'},
            ]),
        ],
        a_toi=[
            q('Le racisme est :', ['puni par la loi', 'autorisé', 'une opinion comme une autre'], 'C’est un délit.'),
            q('Le Défenseur des droits aide :', ['les victimes de discriminations', 'les candidats aux élections', 'les sportifs'], 'Une autorité indépendante.'),
            q('Exclure une fille d’un jeu parce qu’elle est une fille, c’est :', ['du sexisme', 'une règle du jeu', 'normal'], 'Un rejet à cause du sexe.'),
        ],
        sources=[ref('EM-C3-CM2-DIS-01', 'Lutter contre les discriminations')]),

    'EM-C3-CM2-LAI-01': dict(duree=5, essentiel=
        'La laïcité protège la liberté de conscience : chacun peut croire ou ne pas croire.\n'
        'À l’école publique, personne ne peut imposer sa religion aux autres.\n'
        'Personne ne peut être exclu à cause de sa religion.',
        parties=[
            ('Ce que garantit la laïcité', [
                {'type': 'tableau', 'titre': 'À l’école publique', 'colonnes': ['La laïcité…', 'Exemple'], 'lignes': [
                    ['protège la liberté de croire ou de ne pas croire', 'chaque élève est accueilli'], ['interdit d’imposer ses croyances', 'on ne force personne à prier'], ['assure la neutralité des enseignants', 'ils ne montrent pas leur religion']]},
                bq('À l’école publique, un élève peut :', ['croire ou ne pas croire', 'imposer sa religion', 'refuser un cours au nom de sa religion'], 'La laïcité protège chacun.'),
            ]),
            ('Vivre ensemble', [
                {'type': 'piege', 'erreur': 'On croit que la laïcité est contre les religions.', 'correction': 'Elle les protège toutes, et protège aussi ceux qui n’en ont pas.'},
            ]),
        ],
        a_toi=[
            q('La laïcité protège :', ['la liberté de conscience', 'une seule religion', 'personne'], 'Croire ou ne pas croire.'),
            q('Les enseignants de l’école publique sont :', ['neutres', 'tous de la même religion', 'chargés d’enseigner une religion'], 'C’est la neutralité.'),
            q('Exclure un élève à cause de sa religion est :', ['interdit', 'autorisé', 'obligatoire'], 'Chacun est accueilli.'),
        ],
        sources=[ref('EM-C3-CM2-LAI-01', 'La laïcité à l’école')]),

    # ----------------------------------------------------------------------- 6e
    'EM-C3-6E-REP-01': dict(duree=6, essentiel=
        'En démocratie, des représentants élus portent la parole de ceux qui les ont choisis.\n'
        'Au collège, les élèves élisent deux délégués de classe. Les citoyens élisent leurs conseillers municipaux, leurs députés, leurs députés européens.\n'
        'Un représentant rend compte de son action à ceux qu’il représente.',
        parties=[
            ('Du délégué au député européen', [
                {'type': 'tableau', 'titre': 'Des représentants', 'colonnes': ['Représentant', 'Élu par', 'Où ?'], 'lignes': [
                    ['délégué de classe', 'les élèves de la classe', 'conseil de classe'], ['conseiller municipal', 'les habitants de la commune', 'conseil municipal'], ['député', 'les citoyens d’une circonscription', 'Assemblée nationale'], ['député européen', 'les citoyens de l’Union', 'Parlement européen']]},
                bq('Le délégué de classe :', ['porte la parole des élèves', 'décide seul des notes', 'remplace le professeur'], 'Il représente sa classe.'),
            ]),
            ('Le rôle du délégué', [
                {'type': 'methode', 'titre': 'Être délégué', 'etapes': ['Écouter les avis de la classe.', 'Les présenter au conseil de classe.', 'Rendre compte à la classe de ce qui a été dit.']},
                {'type': 'piege', 'erreur': 'On croit que le délégué défend seulement ses amis.', 'correction': 'Il représente tous les élèves de la classe.'},
            ]),
        ],
        a_toi=[
            q('Les députés européens siègent au :', ['Parlement européen', 'Sénat', 'conseil municipal'], 'À Strasbourg et Bruxelles.'),
            q('Rendre compte, c’est :', ['expliquer ce qu’on a fait à ceux qu’on représente', 'se taire', 'décider seul'], 'Le représentant informe.'),
            q('Combien de délégués par classe au collège ?', ['2', '1', '5'], 'Élus par les élèves.'),
        ],
        sources=[ref('EM-C3-6E-REP-01', 'Représenter les autres')]),

    'EM-C3-6E-LAI-01': dict(duree=6, essentiel=
        'La laïcité garantit la liberté de conscience : chacun est libre de croire ou de ne pas croire.\n'
        'L’État est neutre : il ne reconnait et ne finance aucun culte, depuis la loi de 1905.\n'
        'À l’école, la laïcité protège les élèves de toute pression religieuse ou politique.',
        parties=[
            ('Trois principes', [
                {'type': 'tableau', 'titre': 'La laïcité', 'colonnes': ['Principe', 'Ce qu’il signifie'], 'lignes': [
                    ['liberté de conscience', 'croire, ne pas croire, changer de religion'], ['séparation', 'l’État et les religions sont indépendants'], ['égalité', 'tous les citoyens sont égaux, quelle que soit leur croyance']]},
                bq('La loi de 1905 :', ['sépare les Églises et l’État', 'crée l’école obligatoire', 'donne le droit de vote aux femmes'], 'L’État ne finance aucun culte.'),
            ]),
            ('À l’école', [
                {'type': 'explique', 'texte': 'Depuis 2004, les élèves des écoles, collèges et lycées publics ne portent pas de signes religieux ostensibles. Les personnels, eux, sont neutres.'},
                {'type': 'piege', 'erreur': 'On croit que la laïcité interdit les religions dans la société.', 'correction': 'Chacun peut pratiquer sa religion librement, dans le respect de la loi.'},
            ]),
        ],
        a_toi=[
            q('La neutralité de l’État signifie qu’il :', ['ne favorise aucune religion', 'interdit toutes les religions', 'impose une religion'], 'Il traite tous les citoyens de façon égale.'),
            q('La liberté de conscience permet :', ['de croire ou de ne pas croire', 'd’imposer sa foi', 'de refuser la loi'], 'Chacun choisit.'),
            q('À l’école, la laïcité protège les élèves :', ['de toute pression religieuse', 'des notes', 'des devoirs'], 'Chacun peut se forger son avis.'),
        ],
        sources=[ref('EM-C3-6E-LAI-01', 'La laïcité à l’École')]),

    'EM-C3-6E-VIE-01': dict(duree=5, essentiel=
        'Chacun a droit au respect de sa vie privée et de son image.\n'
        'Publier la photo d’un camarade demande son accord, et celui de ses parents.\n'
        'Sur internet, ces droits s’appliquent aussi.',
        parties=[
            ('Le droit à l’image', [
                {'type': 'tableau', 'titre': 'Avant de publier', 'colonnes': ['Situation', 'Ce qu’il faut'], 'lignes': [
                    ['photo d’un ami', 'son accord et celui de ses parents'], ['vidéo d’un professeur', 'son accord'], ['photo de groupe en sortie', 'l’accord de chaque personne reconnaissable']]},
                bq('Pour publier la photo d’un camarade, il faut :', ['son accord', 'rien', 'qu’elle soit drôle'], 'Et celui de ses parents.'),
            ]),
            ('La vie privée', [
                {'type': 'piege', 'erreur': 'On croit qu’un message privé reste toujours privé.', 'correction': 'Il peut être copié et partagé. On ne confie pas en ligne ce qu’on ne voudrait pas voir publié.'},
            ]),
        ],
        a_toi=[
            q('Diffuser la photo de quelqu’un sans son accord :', ['porte atteinte à son droit à l’image', 'est toujours autorisé', 'n’a aucune conséquence'], 'C’est interdit.'),
            q('La vie privée comprend :', ['l’adresse, la santé, la famille', 'les notes publiques d’un match', 'la météo'], 'Ce qui ne regarde que soi.'),
            q('Un ami me demande de retirer une photo de lui. Je :', ['la retire', 'la laisse', 'la partage davantage'], 'Je respecte son droit.'),
        ],
        sources=[ref('EM-C3-6E-VIE-01', 'Vie privée et numérique')]),

    'EM-C3-6E-INT-01': dict(duree=5, essentiel=
        'L’intérêt général est ce qui profite à l’ensemble de la société, pas seulement à quelques-uns.\n'
        'Il prend aussi en compte les générations futures.\n'
        'Une piste cyclable peut gêner des automobilistes, mais elle sert à tous et protège l’environnement.',
        parties=[
            ('Intérêts particuliers et intérêt général', [
                {'type': 'tableau', 'titre': 'Une piste cyclable', 'colonnes': ['Point de vue', 'Intérêt'], 'lignes': [
                    ['automobiliste', 'moins de place sur la route'], ['cycliste', 'plus de sécurité'], ['société', 'moins de pollution, meilleure santé'], ['générations futures', 'un air plus sain']]},
                bq('L’intérêt général prend en compte :', ['toute la société, y compris les générations futures', 'les plus riches', 'une seule personne'], 'Il pense aussi à demain.'),
            ]),
            ('Débattre', [
                {'type': 'piege', 'erreur': 'On croit que l’intérêt général est la somme des intérêts de chacun.', 'correction': 'Il faut parfois arbitrer : un projet peut gêner certains et servir à tous.'},
            ]),
        ],
        a_toi=[
            q('Construire un hôpital sert :', ['l’intérêt général', 'un intérêt particulier', 'personne'], 'Toute la population.'),
            q('Les générations futures sont :', ['les personnes qui vivront plus tard', 'les personnes âgées', 'les enfants d’aujourd’hui seulement'], 'Ceux qui viendront après nous.'),
            q('Qui décide de l’intérêt général en démocratie ?', ['les élus, après débat', 'une seule entreprise', 'le hasard'], 'Ils arbitrent entre les intérêts.'),
        ],
        sources=[ref('EM-C3-6E-INT-01', 'L’intérêt général')]),

    'EM-C3-6E-TRAC-01': dict(duree=5, essentiel=
        'Tout ce que je publie ou cherche en ligne laisse des traces numériques. Une photo publiée peut circuler longtemps, même supprimée.\n'
        'Je protège mes données personnelles : nom, adresse, photos, mots de passe.\n'
        'En France, avant 15 ans, l’inscription sur un réseau social demande l’accord d’un parent : c’est la majorité numérique.',
        parties=[
            ('Des traces', [
                {'type': 'tableau', 'titre': 'Traces et protections', 'colonnes': ['Trace', 'Protection'], 'lignes': [
                    ['photos publiées', 'compte privé, publier peu'], ['recherches', 'navigation privée, refuser les cookies inutiles'], ['position', 'désactiver la géolocalisation'], ['mots de passe', 'longs, différents, jamais partagés']]},
                bq('Une photo supprimée d’un réseau social :', ['peut avoir été copiée et continuer à circuler', 'disparait toujours partout', 'n’a jamais existé'], 'Internet n’oublie pas.'),
            ]),
            ('La majorité numérique', [
                {'type': 'piege', 'erreur': 'On croit qu’on peut s’inscrire seul sur tous les réseaux sociaux à 11 ans.', 'correction': 'Avant 15 ans, l’accord d’un parent est demandé en France.'},
            ]),
        ],
        a_toi=[
            q('Une donnée personnelle est par exemple :', ['mon adresse', 'la capitale de la France', 'la météo'], 'Elle permet de m’identifier.'),
            q('La majorité numérique est fixée à :', ['15 ans', '18 ans', '10 ans'], 'En France.'),
            q('Pour limiter mes traces, je peux :', ['désactiver la géolocalisation', 'tout publier', 'partager mon mot de passe'], 'Moins de données diffusées.'),
        ],
        sources=[ref('EM-C3-6E-TRAC-01', 'Traces et majorité numérique')]),

    # ----------------------------------------------------------------------- 5e
    'EM-C4-5E-EGA-01': dict(duree=6, essentiel=
        'L’égalité entre les femmes et les hommes est un principe de la République, inscrit dans la Constitution.\n'
        'Elle est le fruit de combats : droit de vote des femmes en 1944, loi sur la parité en 2000.\n'
        'Des inégalités persistent, notamment dans les salaires et la répartition des tâches domestiques.',
        parties=[
            ('Des conquêtes', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1944, 'date': '1944', 'evenement': 'Droit de vote des femmes.'},
                    {'annee': 1965, 'date': '1965', 'evenement': 'Les femmes peuvent travailler sans l’accord de leur mari.'},
                    {'annee': 1972, 'date': '1972', 'evenement': 'Principe d’égalité de salaire pour un même travail.'},
                    {'annee': 2000, 'date': '2000', 'evenement': 'Loi sur la parité en politique.'}]},
                bq('La loi sur la parité de 2000 impose :', ['autant de femmes que d’hommes sur les listes électorales', 'le vote des femmes', 'l’égalité de taille'], 'Pour plus de femmes élues.'),
            ]),
            ('Des inégalités qui persistent', [
                {'type': 'explique', 'texte': 'À poste comparable, les femmes gagnent encore en moyenne moins que les hommes. Elles assurent une plus grande part des tâches domestiques.'},
                {'type': 'piege', 'erreur': 'On croit que l’égalité est entièrement atteinte puisque la loi l’impose.', 'correction': 'L’égalité en droit existe ; l’égalité dans les faits progresse mais reste incomplète.'},
            ]),
        ],
        a_toi=[
            q('La parité signifie :', ['autant de femmes que d’hommes', 'plus de femmes que d’hommes', 'aucune femme'], 'Une représentation égale.'),
            q('Les Françaises votent pour la première fois en :', ['1945', '1848', '2000'], 'Après l’ordonnance de 1944.'),
            q('L’égalité de salaire pour un même travail est :', ['un principe de la loi', 'interdite', 'facultative'], 'Depuis 1972.'),
        ],
        sources=[ref('EM-C4-5E-EGA-01', 'Égalité femmes-hommes')]),

    'EM-C4-5E-DIS-01': dict(duree=6, essentiel=
        'Une discrimination est un traitement défavorable fondé sur un critère interdit par la loi : origine, sexe, handicap, religion, orientation sexuelle…\n'
        'C’est un délit, puni par la loi.\n'
        'Le racisme, l’antisémitisme et le harcèlement sont des atteintes aux personnes, elles aussi punies.',
        parties=[
            ('Des atteintes punies', [
                {'type': 'tableau', 'titre': 'Définitions', 'colonnes': ['Atteinte', 'Définition'], 'lignes': [
                    ['racisme', 'hostilité envers une personne en raison de son origine'], ['antisémitisme', 'hostilité envers les Juifs'], ['harcèlement', 'agissements répétés qui dégradent la vie de la victime'], ['discrimination', 'traitement défavorable fondé sur un critère interdit']]},
                bq('Refuser un emploi à quelqu’un à cause de son nom d’origine étrangère est :', ['une discrimination punie par la loi', 'un choix libre', 'une simple préférence'], 'L’origine est un critère interdit.'),
            ]),
            ('Recours', [
                {'type': 'observe', 'consigne': 'Vers qui se tourner ?', 'exemples': ['un adulte de l’établissement', 'le 3018, contre le harcèlement', 'le Défenseur des droits', 'la police ou la gendarmerie pour porter plainte']},
                {'type': 'piege', 'erreur': 'On croit que le harcèlement en ligne n’est pas puni.', 'correction': 'Le cyberharcèlement est un délit, même quand chacun n’a envoyé qu’un seul message.'},
            ]),
        ],
        a_toi=[
            q('L’antisémitisme désigne l’hostilité envers :', ['les Juifs', 'les étrangers en général', 'les femmes'], 'C’est un délit.'),
            q('Une discrimination repose sur :', ['un critère interdit par la loi', 'une règle commune à tous', 'les résultats scolaires'], 'Origine, sexe, handicap…'),
            q('Le 3018 est un numéro contre :', ['le harcèlement', 'les incendies', 'les accidents de la route'], 'Il est gratuit.'),
        ],
        sources=[ref('EM-C4-5E-DIS-01', 'Discriminations et harcèlement')]),

    'EM-C4-5E-SOL-01': dict(duree=6, essentiel=
        'La solidarité nationale consiste à aider ceux qui en ont besoin grâce à l’effort de tous.\n'
        'Elle passe par l’impôt, la Sécurité sociale, les aides des collectivités et l’action des associations.\n'
        'Grâce à la Sécurité sociale, une grande partie des frais médicaux est remboursée.',
        parties=[
            ('Les acteurs de la solidarité', [
                {'type': 'tableau', 'titre': 'Qui aide ?', 'colonnes': ['Acteur', 'Exemple'], 'lignes': [
                    ['État', 'aides au logement, bourses scolaires'], ['Sécurité sociale', 'remboursement des soins, retraites'], ['collectivités', 'cantine à tarif réduit, aide aux personnes âgées'], ['associations', 'distribution de repas, accompagnement']]},
                bq('Une bourse scolaire est une forme de :', ['solidarité nationale', 'récompense sportive', 'punition'], 'Elle aide les familles aux revenus modestes.'),
            ]),
            ('Un principe', [
                {'type': 'piege', 'erreur': 'On croit que la solidarité ne profite qu’aux plus pauvres.', 'correction': 'Chacun peut en bénéficier : maladie, accident, retraite concernent tout le monde.'},
            ]),
        ],
        a_toi=[
            q('La solidarité nationale est financée surtout par :', ['les impôts et les cotisations', 'les dons des entreprises seulement', 'les loteries'], 'L’effort de tous.'),
            q('Une association caritative :', ['aide des personnes en difficulté', 'vote les lois', 'lève l’impôt'], 'Grâce à des bénévoles.'),
            q('Être remboursé d’une consultation médicale, c’est grâce à :', ['la Sécurité sociale', 'la mairie', 'l’école'], 'L’Assurance maladie.'),
        ],
        sources=[ref('EM-C4-5E-SOL-01', 'La solidarité')]),

    'EM-C4-5E-IMP-01': dict(duree=5, essentiel=
        'L’impôt est une contribution obligatoire versée à l’État et aux collectivités.\n'
        'Il finance les services publics : écoles, hôpitaux, routes, police, justice. Il permet aussi la solidarité.\n'
        'La TVA, payée sur les achats, est l’impôt qui rapporte le plus à l’État.',
        parties=[
            ('Des impôts', [
                {'type': 'tableau', 'titre': 'Quelques impôts', 'colonnes': ['Impôt', 'Qui paie ?'], 'lignes': [
                    ['TVA', 'tout acheteur, sur le prix d’un produit'], ['impôt sur le revenu', 'les ménages, selon leurs revenus'], ['taxe foncière', 'les propriétaires'], ['impôt sur les sociétés', 'les entreprises, sur leurs bénéfices']]},
                bq('Quand un adolescent achète un livre, il paie :', ['la TVA', 'l’impôt sur le revenu', 'la taxe foncière'], 'Elle est incluse dans le prix.'),
            ]),
            ('Un impôt progressif', [
                {'type': 'explique', 'texte': 'L’impôt sur le revenu est progressif : plus les revenus sont élevés, plus la part payée est importante.'},
                {'type': 'piege', 'erreur': 'On croit que seuls les adultes qui travaillent paient des impôts.', 'correction': 'Tout le monde paie la TVA sur ses achats, même les enfants.'},
            ]),
        ],
        a_toi=[
            q('L’impôt sert à financer :', ['les services publics', 'des entreprises privées seulement', 'rien'], 'École, santé, sécurité.'),
            q('Un impôt progressif :', ['augmente avec les revenus', 'est le même pour tous', 'diminue avec les revenus'], 'Comme l’impôt sur le revenu.'),
            q('L’impôt est :', ['obligatoire', 'facultatif', 'réservé aux riches'], 'Une contribution de chacun.'),
        ],
        sources=[ref('EM-C4-5E-IMP-01', 'L’impôt et la solidarité')]),

    'EM-C4-5E-SECU-01': dict(duree=5, essentiel=
        'Créée en 1945, la Sécurité sociale protège contre les risques de la vie : maladie, accident du travail, vieillesse, charges de famille.\n'
        'Elle est financée surtout par les cotisations sur les salaires.\n'
        'Une consultation chez le médecin est remboursée en partie par l’Assurance maladie.',
        parties=[
            ('Les branches', [
                {'type': 'tableau', 'titre': 'La Sécurité sociale', 'colonnes': ['Branche', 'Risque couvert'], 'lignes': [
                    ['maladie', 'soins, médicaments, hôpital'], ['accidents du travail', 'blessures au travail'], ['vieillesse', 'retraites'], ['famille', 'allocations familiales'], ['autonomie', 'personnes âgées ou handicapées dépendantes']]},
                bq('Les retraites sont versées par la branche :', ['vieillesse', 'famille', 'maladie'], 'Elle couvre le risque de l’âge.'),
            ]),
            ('Un système solidaire', [
                {'type': 'explique', 'texte': 'Chacun cotise selon ses moyens et reçoit selon ses besoins. Les bien-portants paient pour les malades, les actifs pour les retraités.'},
                {'type': 'piege', 'erreur': 'On croit que les soins sont gratuits parce qu’on ne paie rien chez le médecin.', 'correction': 'Ils sont financés par les cotisations de tous. On ne voit simplement pas toujours la facture.'},
            ]),
        ],
        a_toi=[
            q('La Sécurité sociale a été créée en :', ['1945', '1905', '1981'], 'À la Libération.'),
            q('Les allocations familiales relèvent de la branche :', ['famille', 'maladie', 'vieillesse'], 'Elles aident les familles.'),
            q('La Sécurité sociale est financée surtout par :', ['les cotisations', 'les amendes', 'la vente de médicaments'], 'Prélevées sur les salaires.'),
        ],
        sources=[ref('EM-C4-5E-SECU-01', 'La Sécurité sociale')]),

    'EM-C4-5E-RISQ-01': dict(duree=5, essentiel=
        'Inondations, tempêtes, séismes, accidents industriels : ce sont des risques majeurs.\n'
        'L’État, les communes et la sécurité civile organisent la prévention et les secours.\n'
        'Au collège, un plan prévoit les gestes à faire, et des exercices permettent de s’entrainer.',
        parties=[
            ('Prévenir et secourir', [
                {'type': 'tableau', 'titre': 'Qui fait quoi ?', 'colonnes': ['Acteur', 'Rôle'], 'lignes': [
                    ['État, préfet', 'déclenche les plans de secours, alerte la population'], ['commune, maire', 'informe les habitants, accueille les sinistrés'], ['sécurité civile, pompiers', 'évacuent, secourent'], ['citoyens', 'connaissent les bons gestes, aident les voisins']]},
                bq('Lors d’une inondation, les sinistrés sont accueillis par :', ['la commune', 'l’école privée', 'personne'], 'Le maire organise l’accueil.'),
            ]),
            ('Être prêt', [
                {'type': 'observe', 'consigne': 'Les bons réflexes.', 'exemples': ['écouter la radio et suivre les consignes', 'ne pas aller chercher les enfants à l’école : ils y sont protégés', 'garder un sac avec eau, lampe et papiers']},
                {'type': 'piege', 'erreur': 'On croit que les exercices d’alerte sont inutiles.', 'correction': 'Ils permettent de réagir vite et calmement le jour où le danger est réel.'},
            ]),
        ],
        a_toi=[
            q('En cas d’alerte, aller chercher son enfant à l’école est :', ['déconseillé : il y est protégé', 'obligatoire', 'conseillé'], 'L’école applique son plan de sécurité.'),
            q('La sécurité civile :', ['protège et secourt la population', 'vote les lois', 'fixe les impôts'], 'Avec les pompiers.'),
            q('Un risque majeur peut être :', ['une inondation ou un séisme', 'une panne de téléphone', 'un retard de bus'], 'Il menace beaucoup de personnes.'),
        ],
        sources=[ref('EM-C4-5E-RISQ-01', 'Face aux risques majeurs')]),

    # ----------------------------------------------------------------------- 4e
    'EM-C4-4E-LIB-01': dict(duree=6, essentiel=
        'Les libertés individuelles s’exercent seul : liberté d’aller et venir, de conscience, d’expression.\n'
        'Les libertés collectives s’exercent à plusieurs : liberté de réunion, d’association, de manifestation, droit syndical.\n'
        'Elles sont garanties par des textes : Déclaration de 1789, Constitution, Convention européenne des droits de l’homme.',
        parties=[
            ('Individuelles ou collectives', [
                {'type': 'tableau', 'titre': 'Classer les libertés', 'colonnes': ['Individuelles', 'Collectives'], 'lignes': [
                    ['aller et venir', 'réunion'], ['conscience', 'association'], ['expression', 'manifestation'], ['respect de la vie privée', 'droit syndical']]},
                bq('La liberté de manifester est une liberté :', ['collective', 'individuelle', 'religieuse'], 'Elle s’exerce à plusieurs.'),
            ]),
            ('Des textes qui protègent', [
                {'type': 'tableau', 'titre': 'Textes', 'colonnes': ['Texte', 'Date'], 'lignes': [
                    ['Déclaration des droits de l’homme et du citoyen', '1789'], ['Préambule de la Constitution', '1946'], ['Convention européenne des droits de l’homme', '1950']]},
                {'type': 'piege', 'erreur': 'On croit que les libertés existent sans être garanties.', 'correction': 'Elles reposent sur des textes et sur des juges qui les font respecter.'},
            ]),
        ],
        a_toi=[
            q('Créer une association de quartier relève de la liberté :', ['d’association', 'de conscience', 'd’aller et venir'], 'Une liberté collective.'),
            q('Voyager librement dans son pays relève de la liberté :', ['d’aller et venir', 'de réunion', 'syndicale'], 'Une liberté individuelle.'),
            q('La Déclaration des droits de l’homme et du citoyen date de :', ['1789', '1905', '1958'], 'Pendant la Révolution.'),
        ],
        sources=[ref('EM-C4-4E-LIB-01', 'Les libertés')]),

    'EM-C4-4E-ORD-01': dict(duree=5, essentiel=
        'Les libertés ont des limites : celles des autres et la défense de l’ordre public, c’est-à-dire la sécurité, la tranquillité et la santé publiques.\n'
        'La liberté d’expression ne permet ni l’injure, ni la diffamation, ni l’incitation à la haine.\n'
        'Une manifestation doit être déclarée ; elle peut être interdite en cas de danger grave.',
        parties=[
            ('Des limites fixées par la loi', [
                {'type': 'tableau', 'titre': 'Libertés et limites', 'colonnes': ['Liberté', 'Limite'], 'lignes': [
                    ['expression', 'interdiction de l’injure, de la diffamation, de l’incitation à la haine'], ['manifestation', 'déclaration préalable, interdiction possible si trouble grave'], ['aller et venir', 'restrictions en cas de crise sanitaire ou de danger']]},
                bq('La diffamation consiste à :', ['accuser publiquement quelqu’un d’un fait faux qui porte atteinte à son honneur', 'donner son avis', 'critiquer un film'], 'Elle est punie par la loi.'),
            ]),
            ('Équilibre', [
                {'type': 'piege', 'erreur': 'On croit que toute limite à une liberté est une atteinte à la démocratie.', 'correction': 'En démocratie, les limites sont fixées par la loi et contrôlées par des juges indépendants.'},
            ]),
        ],
        a_toi=[
            q('L’ordre public comprend :', ['la sécurité, la tranquillité et la santé publiques', 'le rangement des classes', 'l’ordre alphabétique'], 'Ce qui protège la vie collective.'),
            q('Appeler à la haine contre un groupe est :', ['interdit par la loi', 'protégé par la liberté d’expression', 'sans conséquence'], 'C’est une limite.'),
            q('Les limites aux libertés sont fixées par :', ['la loi', 'chaque citoyen', 'le hasard'], 'Et contrôlées par les juges.'),
        ],
        sources=[ref('EM-C4-4E-ORD-01', 'Libertés et ordre public')]),

    'EM-C4-4E-JUS-01': dict(duree=7, essentiel=
        'La justice règle les conflits et punit les infractions. Elle est indépendante des autres pouvoirs.\n'
        'Toute personne poursuivie est présumée innocente jusqu’à sa condamnation et a droit à un avocat.\n'
        'Les mineurs sont jugés par une justice spéciale, qui privilégie l’éducation : juge des enfants, tribunal pour enfants.',
        parties=[
            ('L’organisation', [
                {'type': 'tableau', 'titre': 'Juridictions pénales', 'colonnes': ['Juridiction', 'Juge'], 'lignes': [
                    ['tribunal de police', 'les contraventions'], ['tribunal correctionnel', 'les délits'], ['cour d’assises', 'les crimes'], ['tribunal pour enfants', 'les mineurs']]},
                bq('Un vol est un délit. Il est jugé par :', ['le tribunal correctionnel', 'la cour d’assises', 'le conseil municipal'], 'Les délits relèvent du correctionnel.'),
            ]),
            ('Les droits des justiciables', [
                {'type': 'tableau', 'titre': 'Garanties', 'colonnes': ['Droit', 'Contenu'], 'lignes': [
                    ['présomption d’innocence', 'innocent tant que la culpabilité n’est pas prouvée'], ['droit à un avocat', 'être défendu'], ['droit de faire appel', 'être rejugé par une autre juridiction']]},
                {'type': 'piege', 'erreur': 'On croit qu’une personne arrêtée est forcément coupable.', 'correction': 'Seul un jugement peut établir la culpabilité.'},
            ]),
        ],
        a_toi=[
            q('Un crime, comme un meurtre, est jugé par :', ['la cour d’assises', 'le tribunal de police', 'le juge des enfants seulement'], 'Avec des jurés citoyens.'),
            q('La présomption d’innocence signifie :', ['être considéré innocent jusqu’au jugement', 'être toujours innocent', 'ne pas être jugé'], 'La preuve revient à l’accusation.'),
            q('La justice des mineurs privilégie :', ['l’éducation', 'la sanction la plus sévère', 'l’absence de règles'], 'Pour aider le mineur à changer.'),
        ],
        sources=[ref('EM-C4-4E-JUS-01', 'La justice')]),

    'EM-C4-4E-DEF-01': dict(duree=6, essentiel=
        'Les forces de sécurité intérieure, police et gendarmerie, protègent les personnes et les biens. La sécurité civile et les pompiers portent secours.\n'
        'Les armées défendent le territoire et les intérêts de la France.\n'
        'De nouveaux enjeux apparaissent : cyberattaques, guerre informationnelle, c’est-à-dire la manipulation de l’information.',
        parties=[
            ('Qui protège ?', [
                {'type': 'tableau', 'titre': 'Les acteurs', 'colonnes': ['Acteur', 'Mission'], 'lignes': [
                    ['police nationale', 'sécurité surtout en ville'], ['gendarmerie nationale', 'sécurité surtout en zone rurale ; statut militaire'], ['sécurité civile, pompiers', 'secours, incendies, catastrophes'], ['armées', 'défense du territoire, opérations extérieures']]},
                bq('La gendarmerie nationale :', ['a un statut militaire', 'est une entreprise privée', 'vote les lois'], 'Elle assure la sécurité surtout en zone rurale.'),
            ]),
            ('La guerre informationnelle', [
                {'type': 'explique', 'texte': 'Des États ou des groupes diffusent de fausses informations pour diviser une population ou influencer une élection.'},
                {'type': 'piege', 'erreur': 'On croit que la défense concerne seulement les militaires.', 'correction': 'Chaque citoyen y participe : vérifier ses sources, se protéger en ligne, participer à la Journée défense et citoyenneté.'},
            ]),
        ],
        a_toi=[
            q('Une cyberattaque vise :', ['des systèmes informatiques', 'des forêts', 'des rivières'], 'Pirater, bloquer, voler des données.'),
            q('La Journée défense et citoyenneté concerne :', ['tous les jeunes Français', 'seulement les militaires', 'les retraités'], 'Elle informe sur la défense.'),
            q('Lors d’un incendie de forêt, interviennent :', ['les pompiers et la sécurité civile', 'les juges', 'les députés'], 'Ils protègent les habitants.'),
        ],
        sources=[ref('EM-C4-4E-DEF-01', 'Sécurité et défense')]),

    'EM-C4-4E-DROIT-01': dict(duree=6, essentiel=
        'Dans un État de droit, l’État lui-même est soumis au droit.\n'
        'Les règles sont hiérarchisées : la Constitution est au sommet, puis les traités, les lois, puis les décrets.\n'
        'La justice est indépendante : une loi contraire à la Constitution peut être censurée par le Conseil constitutionnel.',
        parties=[
            ('La hiérarchie des normes', [
                {'type': 'tableau', 'titre': 'Du sommet à la base', 'colonnes': ['Niveau', 'Norme'], 'lignes': [
                    ['1', 'Constitution'], ['2', 'traités internationaux'], ['3', 'lois votées par le Parlement'], ['4', 'décrets et arrêtés du gouvernement et des administrations']]},
                bq('Une loi doit respecter :', ['la Constitution', 'les décrets', 'les arrêtés municipaux'], 'La Constitution est au sommet.'),
            ]),
            ('Contrôler le pouvoir', [
                {'type': 'explique', 'texte': 'Si une loi porte atteinte à un droit garanti par la Constitution, le Conseil constitutionnel peut l’annuler.'},
                {'type': 'piege', 'erreur': 'On croit que les dirigeants sont au-dessus des lois.', 'correction': 'Dans un État de droit, tous, dirigeants compris, doivent respecter le droit.'},
            ]),
        ],
        a_toi=[
            q('Le Conseil constitutionnel peut :', ['censurer une loi contraire à la Constitution', 'élire le président', 'juger les vols'], 'Il contrôle la conformité des lois.'),
            q('Au sommet de la hiérarchie des normes se trouve :', ['la Constitution', 'le décret', 'le règlement intérieur'], 'Le texte fondamental.'),
            q('Dans un État de droit, le gouvernement :', ['doit respecter le droit', 'fait ce qu’il veut', 'juge les citoyens'], 'Personne n’est au-dessus des lois.'),
        ],
        sources=[ref('EM-C4-4E-DROIT-01', 'L’État de droit')]),

    'EM-C4-4E-COLL-01': dict(duree=5, essentiel=
        'Les libertés collectives permettent d’agir ensemble : se réunir, s’associer, manifester, adhérer à un syndicat, publier un journal.\n'
        'La loi de 1901 encadre la liberté d’association ; celle de 1884 a autorisé les syndicats.\n'
        'Ces libertés sont essentielles à la démocratie : elles permettent aux citoyens de faire entendre leur voix.',
        parties=[
            ('Des libertés et leurs lois', [
                {'type': 'tableau', 'titre': 'Repères', 'colonnes': ['Liberté', 'Loi'], 'lignes': [
                    ['presse', '1881'], ['syndicale', '1884'], ['association', '1901']]},
                bq('La liberté d’association est encadrée par la loi de :', ['1901', '1789', '1958'], 'On parle d’« association loi 1901 ».'),
            ]),
            ('Agir ensemble', [
                {'type': 'observe', 'consigne': 'Des exemples.', 'exemples': ['créer une association de quartier', 'manifester pour le climat', 'adhérer à un syndicat de salariés', 'publier un journal de collège']},
                {'type': 'piege', 'erreur': 'On croit qu’un syndicat est un parti politique.', 'correction': 'Un syndicat défend les intérêts des travailleurs ; un parti cherche à exercer le pouvoir.'},
            ]),
        ],
        a_toi=[
            q('Un syndicat défend :', ['les intérêts des travailleurs', 'un candidat aux élections', 'une religion'], 'Salaires, conditions de travail.'),
            q('Publier un journal relève de la liberté :', ['de la presse', 'syndicale', 'd’aller et venir'], 'Depuis la loi de 1881.'),
            q('Les libertés collectives permettent :', ['d’agir à plusieurs', 'de voter seul', 'd’éviter les lois'], 'Réunion, association, manifestation.'),
        ],
        sources=[ref('EM-C4-4E-COLL-01', 'Les libertés collectives')]),

    'EM-C4-4E-ENV-01': dict(duree=5, essentiel=
        'Chacun a le droit de vivre dans un environnement équilibré et sain. Ce droit figure dans la Charte de l’environnement, intégrée à la Constitution en 2005.\n'
        'La police de l’environnement contrôle le respect de ce droit.\n'
        'Les inspecteurs de l’Office français de la biodiversité contrôlent par exemple les rejets d’une usine dans une rivière.',
        parties=[
            ('Qui contrôle ?', [
                {'type': 'tableau', 'titre': 'La police de l’environnement', 'colonnes': ['Acteur', 'Exemple de mission'], 'lignes': [
                    ['Office français de la biodiversité', 'contrôler les rejets dans les rivières, lutter contre le braconnage'], ['gendarmerie', 'enquêter sur les dépôts sauvages de déchets'], ['inspecteurs des installations classées', 'contrôler les usines à risque']]},
                bq('Un dépôt sauvage de déchets dans une forêt est :', ['une infraction punie', 'autorisé', 'sans importance'], 'La police de l’environnement peut sanctionner.'),
            ]),
            ('Un droit et un devoir', [
                {'type': 'piege', 'erreur': 'On croit que protéger l’environnement est seulement l’affaire de l’État.', 'correction': 'La Charte fixe aussi un devoir pour chaque personne : préserver et améliorer l’environnement.'},
            ]),
        ],
        a_toi=[
            q('La Charte de l’environnement fait partie :', ['de la Constitution', 'du règlement intérieur', 'du Code de la route'], 'Depuis 2005.'),
            q('L’Office français de la biodiversité :', ['protège les milieux naturels et contrôle les atteintes', 'vote les lois', 'gère les écoles'], 'C’est une police de l’environnement.'),
            q('Préserver l’environnement est :', ['un devoir de chacun', 'facultatif', 'réservé aux scientifiques'], 'Selon la Charte.'),
        ],
        sources=[ref('EM-C4-4E-ENV-01', 'La police de l’environnement')]),

    # ----------------------------------------------------------------------- 3e
    'EM-C4-3E-CONST-01': dict(duree=7, essentiel=
        'La Constitution de 1958 fonde la Ve République. Elle garantit les droits et libertés et organise la séparation des pouvoirs.\n'
        'Son article 1 affirme que la France est une République indivisible, laïque, démocratique et sociale.\n'
        'Elle a évolué : depuis 1962, le président est élu au suffrage universel direct ; depuis 2000, son mandat dure 5 ans.',
        parties=[
            ('La séparation des pouvoirs', [
                {'type': 'tableau', 'titre': 'Trois pouvoirs', 'colonnes': ['Pouvoir', 'Qui l’exerce ?'], 'lignes': [
                    ['législatif : faire les lois', 'Parlement : Assemblée nationale et Sénat'], ['exécutif : appliquer les lois', 'président de la République et gouvernement'], ['judiciaire : juger', 'magistrats indépendants']]},
                bq('Le pouvoir législatif appartient :', ['au Parlement', 'au président seul', 'aux juges'], 'Il vote les lois.'),
            ]),
            ('Une Constitution qui évolue', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1958, 'date': '1958', 'evenement': 'Adoption par référendum.'},
                    {'annee': 1962, 'date': '1962', 'evenement': 'Élection du président au suffrage universel direct.'},
                    {'annee': 2000, 'date': '2000', 'evenement': 'Quinquennat.'},
                    {'annee': 2005, 'date': '2005', 'evenement': 'Charte de l’environnement.'}]},
                {'type': 'piege', 'erreur': 'On croit que la Constitution est figée depuis 1958.', 'correction': 'Elle a été révisée de nombreuses fois, par le Parlement réuni en Congrès ou par référendum.'},
            ]),
        ],
        a_toi=[
            q('La séparation des pouvoirs sert à :', ['éviter qu’un seul pouvoir décide de tout', 'supprimer les élections', 'renforcer le roi'], 'Idée de Montesquieu.'),
            q('Le président est élu pour :', ['5 ans', '7 ans', '4 ans'], 'Depuis le quinquennat.'),
            q('La Constitution de la Ve République date de :', ['1958', '1789', '1946'], 'Adoptée par référendum.'),
        ],
        sources=[ref('EM-C4-3E-CONST-01', 'La Constitution de la Ve République')]),

    'EM-C4-3E-EUR-01': dict(duree=7, essentiel=
        'L’Union européenne a des institutions communes : le Parlement européen, élu par les citoyens, la Commission, le Conseil de l’UE et le Conseil européen.\n'
        'La citoyenneté européenne s’ajoute à la nationalité : un citoyen européen qui habite en France peut voter aux élections municipales et européennes.\n'
        'Le Conseil de l’Europe, distinct de l’UE, défend les droits de l’homme avec la Cour européenne des droits de l’homme.',
        parties=[
            ('Les institutions de l’Union', [
                {'type': 'tableau', 'titre': 'Qui fait quoi ?', 'colonnes': ['Institution', 'Rôle'], 'lignes': [
                    ['Commission européenne', 'propose les lois européennes, veille à leur application'], ['Parlement européen', 'vote les lois avec le Conseil ; élu tous les 5 ans'], ['Conseil de l’UE', 'ministres des États ; vote les lois'], ['Conseil européen', 'chefs d’État et de gouvernement ; fixe les grandes orientations']]},
                bq('Les députés européens sont élus :', ['au suffrage universel direct, tous les 5 ans', 'par les présidents', 'par la Commission'], 'Par les citoyens de l’Union.'),
            ]),
            ('Ne pas confondre', [
                {'type': 'piege', 'erreur': 'On confond le Conseil de l’Europe et le Conseil européen.', 'correction': 'Le Conseil de l’Europe rassemble plus de 40 États pour les droits de l’homme. Le Conseil européen est une institution de l’UE.'},
            ]),
        ],
        a_toi=[
            q('La Cour européenne des droits de l’homme siège à :', ['Strasbourg', 'Bruxelles', 'Paris'], 'Elle dépend du Conseil de l’Europe.'),
            q('Les lois européennes sont proposées par :', ['la Commission européenne', 'le Conseil de l’Europe', 'les maires'], 'Elle a l’initiative.'),
            q('Un Italien qui vit en France peut voter aux élections :', ['municipales et européennes', 'présidentielles', 'législatives'], 'Grâce à la citoyenneté européenne.'),
        ],
        sources=[ref('EM-C4-3E-EUR-01', 'Les institutions européennes')]),

    'EM-C4-3E-OPI-01': dict(duree=6, essentiel=
        'L’opinion publique est l’ensemble des idées partagées par une population ; elle pèse sur les décisions des élus.\n'
        'Les médias informent et les sondages mesurent l’opinion à un moment donné.\n'
        'La désinformation diffuse volontairement de fausses informations ; le complotisme explique les évènements par un complot caché, sans preuve.',
        parties=[
            ('S’informer', [
                {'type': 'methode', 'titre': 'Avant de partager une vidéo choc', 'etapes': [
                    'Qui l’a publiée ? Un média identifié, un compte anonyme ?', 'De quand date-t-elle ?', 'D’autres sources fiables la confirment-elles ?', 'Une recherche d’image inversée retrouve-t-elle son origine ?']},
                bq('Un sondage mesure :', ['l’opinion d’un échantillon à un moment donné', 'la vérité', 'le résultat d’une élection future à coup sûr'], 'Il donne une tendance.'),
            ]),
            ('Repérer le complotisme', [
                {'type': 'tableau', 'titre': 'Des indices', 'colonnes': ['Indice', 'Exemple'], 'lignes': [
                    ['tout s’expliquerait par un groupe caché', '« on nous cache la vérité »'], ['l’absence de preuve devient une preuve', '« s’il n’y a rien, c’est qu’ils ont tout effacé »'], ['les sources sérieuses sont rejetées', '« les médias mentent tous »']]},
                {'type': 'piege', 'erreur': 'On croit qu’une information est vraie parce qu’elle est partagée des milliers de fois.', 'correction': 'Le nombre de partages ne prouve rien. Seules des sources fiables et vérifiables comptent.'},
            ]),
        ],
        a_toi=[
            q('La désinformation consiste à :', ['diffuser volontairement une fausse information', 'se tromper de bonne foi', 'vérifier une source'], 'L’intention de tromper.'),
            q('Un discours complotiste :', ['explique tout par un complot caché, sans preuve', 'cite des sources vérifiées', 'accepte la contradiction'], 'Il rejette les preuves contraires.'),
            q('Pour vérifier une information, on :', ['croise plusieurs sources fiables', 'la partage vite', 'regarde le nombre de likes'], 'On recoupe.'),
        ],
        sources=[ref('EM-C4-3E-OPI-01', 'Opinion et information')]),

    'EM-C4-3E-ENG-01': dict(duree=6, essentiel=
        'Les citoyens votent à plusieurs élections : municipales, départementales, régionales, législatives, présidentielle, européennes. Ils peuvent aussi être consultés par référendum.\n'
        'On peut s’engager de nombreuses façons : dans un parti, un syndicat, une association, ou au collège comme délégué.\n'
        'S’engager, c’est agir pour une cause au service des autres.',
        parties=[
            ('Les élections', [
                {'type': 'tableau', 'titre': 'Qui élit-on ?', 'colonnes': ['Élection', 'Élus', 'Durée du mandat'], 'lignes': [
                    ['municipales', 'conseillers municipaux', '6 ans'], ['législatives', 'députés', '5 ans'], ['présidentielle', 'président de la République', '5 ans'], ['européennes', 'députés européens', '5 ans']]},
                bq('Un référendum consiste à :', ['demander aux citoyens de répondre par oui ou non à une question', 'élire un maire', 'nommer un ministre'], 'Les citoyens décident directement.'),
            ]),
            ('Des formes d’engagement', [
                {'type': 'observe', 'consigne': 'S’engager au collège et ailleurs.', 'exemples': ['être délégué de classe ou éco-délégué', 'participer au conseil de la vie collégienne', 'être bénévole dans une association', 'devenir pompier volontaire, à partir de 16 ans']},
                {'type': 'piege', 'erreur': 'On croit que s’engager, c’est seulement voter.', 'correction': 'Le vote est essentiel, mais on s’engage aussi au quotidien dans des associations ou des projets.'},
            ]),
        ],
        a_toi=[
            q('Les députés sont élus lors des élections :', ['législatives', 'municipales', 'européennes'], 'Pour 5 ans.'),
            q('Un éco-délégué :', ['mène des actions pour l’environnement au collège', 'note les élèves', 'remplace le principal'], 'Un engagement scolaire.'),
            q('S’engager dans une association, c’est :', ['agir pour une cause', 'payer un impôt', 'voter une loi'], 'Souvent comme bénévole.'),
        ],
        sources=[ref('EM-C4-3E-ENG-01', 'Voter et s’engager')]),

    'EM-C4-3E-ALER-01': dict(duree=5, essentiel=
        'Un lanceur d’alerte révèle, de bonne foi et dans l’intérêt général, une menace ou une infraction grave dont il a connaissance.\n'
        'La loi le protège contre les représailles, par exemple un licenciement.\n'
        'Les médias sociaux permettent de diffuser une alerte rapidement, mais aussi des rumeurs : il faut vérifier.',
        parties=[
            ('Le lanceur d’alerte', [
                {'type': 'explique', 'texte': 'Une salariée découvre qu’une usine pollue une rivière. Elle le signale aux autorités : elle est lanceuse d’alerte.'},
                bq('Un lanceur d’alerte agit :', ['dans l’intérêt général', 'pour se venger', 'pour gagner de l’argent'], 'De bonne foi.'),
            ]),
            ('Médias sociaux et débat', [
                {'type': 'tableau', 'titre': 'Atouts et risques', 'colonnes': ['Atouts', 'Risques'], 'lignes': [
                    ['diffusion rapide d’une alerte', 'propagation de rumeurs'], ['parole donnée à tous', 'harcèlement, haine en ligne'], ['mobilisation citoyenne', 'bulles de filtre : on ne voit que ce qui confirme ses idées']]},
                {'type': 'piege', 'erreur': 'On croit que toute révélation sur les réseaux est une alerte fiable.', 'correction': 'Une alerte repose sur des faits vérifiables, transmis de bonne foi.'},
            ]),
        ],
        a_toi=[
            q('La loi protège le lanceur d’alerte contre :', ['les représailles', 'les impôts', 'les élections'], 'Par exemple un licenciement.'),
            q('Une bulle de filtre :', ['montre surtout des contenus qui confirment nos idées', 'protège des virus', 'filtre l’eau'], 'Les algorithmes sélectionnent pour nous.'),
            q('Avant de relayer une alerte vue en ligne, on :', ['vérifie les faits', 'la partage à tous', 'ajoute des détails'], 'Pour ne pas propager une rumeur.'),
        ],
        sources=[ref('EM-C4-3E-ALER-01', 'Lanceurs d’alerte et médias sociaux')]),

    'EM-C4-3E-LAIC-01': dict(duree=6, essentiel=
        'La République est laïque : l’autorité politique est indépendante des autorités religieuses.\n'
        'L’État ne reconnait et ne finance aucun culte ; il garantit le libre exercice de tous, dans le respect de l’ordre public.\n'
        'Les responsables religieux peuvent participer au débat public, comme tous les citoyens, dans le cadre de la loi.',
        parties=[
            ('Les principes', [
                {'type': 'tableau', 'titre': 'La laïcité de la République', 'colonnes': ['Principe', 'Texte'], 'lignes': [
                    ['séparation des Églises et de l’État', 'loi de 1905'], ['République laïque', 'article 1 de la Constitution de 1958'], ['neutralité de l’école publique', 'loi de 2004 sur les signes religieux']]},
                bq('La laïcité de la République est inscrite dans :', ['la Constitution', 'le Code de la route', 'aucun texte'], 'À l’article 1.'),
            ]),
            ('Neutralité et liberté', [
                {'type': 'explique', 'texte': 'L’État et ses agents sont neutres. Les citoyens, eux, sont libres d’exprimer leurs convictions, dans le respect de la loi et de l’ordre public.'},
                {'type': 'piege', 'erreur': 'On croit que la laïcité oblige chaque citoyen à cacher ses croyances partout.', 'correction': 'La neutralité s’impose à l’État et à ses agents. Dans l’espace public, les citoyens restent libres, dans le cadre de la loi.'},
            ]),
        ],
        a_toi=[
            q('Un agent de l’État dans ses fonctions doit être :', ['neutre', 'religieux', 'militant'], 'Il sert tous les citoyens.'),
            q('L’État ne finance :', ['aucun culte', 'qu’un seul culte', 'tous les cultes à égalité'], 'Depuis 1905.'),
            q('Un responsable religieux peut :', ['participer au débat public dans le cadre de la loi', 'imposer une loi religieuse', 'diriger l’État'], 'Comme tout citoyen.'),
        ],
        sources=[ref('EM-C4-3E-LAIC-01', 'Une République laïque')]),
}

ecrire(COURS)
