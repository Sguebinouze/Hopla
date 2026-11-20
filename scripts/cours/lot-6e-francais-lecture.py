"""Lot de cours : français 6e, lecture, littérature, écriture et oral.

    python3 scripts/cours/lot-6e-francais-lecture.py

Cycle 3 : phrases de 20 mots au plus. Les pages des extraits sont retrouvées ensuite dans les PDF archivés.
Œuvres citées : patrimoine ancien (Bible, mythes grecs, Ovide, Molière, Perrault, Leprince de Beaumont, Verne, Kipling).
"""
from commun import bq, ecrire, q, src, vocabulaire

BO = 'bo16-2025-francais-c3'

COURS = {
    'FR-C3-6E-LITT-01': dict(duree=9, essentiel=
        'Les récits des origines racontent comment le monde, les êtres ou les choses sont apparus.\n'
        'On trouve des textes fondateurs comme la Genèse, des mythes grecs et des contes étiologiques.\n'
        'Ces récits ne cherchent pas à prouver : ils donnent du sens et transmettent des valeurs.',
        parties=[
            ('Des récits pour expliquer le monde', [
                vocabulaire(3, 'Mythe'),
                {'type': 'tableau', 'titre': 'Trois sortes de récits des origines', 'colonnes': ['Récit', 'Exemple', 'Ce qu’il explique'], 'lignes': [
                    ['texte fondateur', 'la Genèse, premier livre de la Bible', 'la création du monde en six jours, puis le repos'], ['mythe grec', 'Prométhée vole le feu aux dieux', 'comment les humains ont reçu le feu'], ['conte étiologique', 'Kipling, « Comment le léopard eut ses taches »', 'l’origine d’un trait d’animal']]},
                {'type': 'explique', 'texte': 'Étiologique vient du grec aitia, la cause. Un conte étiologique invente une cause à ce que l’on observe.'},
                bq('Un récit qui explique pourquoi le zèbre a des rayures est :', ['un conte étiologique', 'un documentaire', 'une fable'], 'Il invente une origine à un trait d’animal.'),
            ]),
            ('Comparer les récits', [
                {'type': 'observe', 'consigne': 'Dans les Métamorphoses, Ovide raconte des transformations.', 'exemples': [
                    'Arachné défie Athéna au tissage et devient araignée.', 'Narcisse, amoureux de son reflet, devient une fleur.', 'Le récit explique un nom et punit un excès d’orgueil.']},
                {'type': 'methode', 'titre': 'Pour comparer deux récits des origines', 'etapes': [
                    'Repère ce que chaque récit explique.',
                    'Repère les personnages : dieux, héros, animaux.',
                    'Cherche la valeur transmise : obéissance, modestie, ruse…',
                    'Note les ressemblances et les différences.']},
                {'type': 'piege', 'erreur': 'On lit un mythe comme un récit historique.', 'correction': 'Un mythe ne raconte pas des faits vérifiés. Il propose une explication symbolique.'},
            ]),
        ],
        a_toi=[
            q('Dans le mythe, que vole Prométhée aux dieux ?', ['le feu', 'la foudre', 'l’eau'], 'Il donne le feu aux humains.'),
            q('En quoi Arachné est-elle transformée ?', ['en araignée', 'en fleur', 'en oiseau'], 'D’où le nom de la classe des arachnides.'),
            q('Un conte étiologique raconte :', ['l’origine inventée d’une chose', 'une enquête policière', 'la vie d’un savant'], 'Aitia : la cause.'),
        ],
        sources=[src(BO, 'Créer, recréer le monde : récits des origines (récit, fiction)', 'Entrée du programme'),
                 src(BO, 'découvre au moins un texte fondateur (issu notamment des religions monothéistes) et quelques mythes et contes étiologiques', 'Textes fondateurs, mythes, contes étiologiques')]),

    'FR-C3-6E-LITT-02': dict(duree=9, essentiel=
        'Un poème est souvent écrit en vers, regroupés en strophes. Les rimes font revenir un même son en fin de vers.\n'
        'La comparaison rapproche deux éléments avec un outil (comme, tel). La métaphore les rapproche sans outil.\n'
        'La personnification donne des traits humains à ce qui ne l’est pas.',
        parties=[
            ('La forme du poème', [
                vocabulaire(3, 'Vers', 'Strophe', 'Rime'),
                {'type': 'tableau', 'titre': 'Disposition des rimes', 'colonnes': ['Nom', 'Schéma', 'Exemple de sons'], 'lignes': [
                    ['rimes plates', 'AABB', 'jour, amour, nuit, bruit'], ['rimes croisées', 'ABAB', 'jour, nuit, amour, bruit'], ['rimes embrassées', 'ABBA', 'jour, nuit, bruit, amour']]},
                bq('Une strophe de quatre vers s’appelle :', ['un quatrain', 'un tercet', 'un distique'], 'Quatre vers : quatrain. Trois : tercet. Deux : distique.'),
            ]),
            ('Les images poétiques', [
                vocabulaire(3, 'Comparaison', 'Métaphore', 'Personnification'),
                {'type': 'tableau', 'titre': 'Reconnaitre une image', 'colonnes': ['Image', 'Exemple'], 'lignes': [
                    ['comparaison', 'La lune, comme un ballon d’argent, flotte sur la ville.'], ['métaphore', 'La lune est un ballon d’argent.'], ['personnification', 'Le vent chante dans les arbres.']]},
                {'type': 'methode', 'titre': 'Pour identifier une image', 'etapes': [
                    'Repère les deux éléments rapprochés.',
                    'Cherche un outil : comme, tel, pareil à, ressembler. S’il y en a un, c’est une comparaison.',
                    'Sans outil, c’est une métaphore.',
                    'Une chose agit comme un humain ? C’est une personnification.']},
                {'type': 'piege', 'erreur': 'On croit qu’un poème doit toujours rimer.', 'correction': 'Le vers libre existe. La poésie tient d’abord à ses images et à son rythme.'},
                bq('« La mer gronde de colère » est :', ['une personnification', 'une comparaison', 'une rime'], 'La mer reçoit un sentiment humain.'),
            ]),
        ],
        a_toi=[
            q('« Ses yeux brillaient comme des étoiles » est :', ['une comparaison', 'une métaphore', 'une personnification'], 'L’outil comme est présent.'),
            q('« Ce chemin est un serpent de pierre » est :', ['une métaphore', 'une comparaison', 'une rime'], 'Rapprochement sans outil.'),
            q('Rimes AABB : ce sont des rimes :', ['plates', 'croisées', 'embrassées'], 'Deux à deux, à la suite.'),
        ],
        sources=[src(BO, 'Chanter et enchanter le monde : mots et merveilles (poésie)', 'Entrée du programme'),
                 src(BO, 'etc.), la force de la poésie réside dans ses images et son pouvoir d’évocation.', 'Force des images')]),

    'FR-C3-6E-LITT-03': dict(duree=9, essentiel=
        'Au théâtre, le texte est fait de répliques et de didascalies. La pièce se découpe en actes et en scènes.\n'
        'Dans une comédie, la ruse fait avancer l’action et fait rire.\n'
        'Dans Les Fourberies de Scapin, de Molière, le valet Scapin trompe Géronte pour lui soutirer de l’argent.',
        parties=[
            ('Le vocabulaire du théâtre', [
                vocabulaire(3, 'Réplique', 'Didascalie', 'Aparté'),
                {'type': 'tableau', 'titre': 'Autres mots du théâtre', 'colonnes': ['Mot', 'Sens'], 'lignes': [
                    ['acte', 'grande partie de la pièce'], ['scène', 'partie d’un acte, qui change à chaque entrée ou sortie d’un personnage'], ['monologue', 'longue réplique d’un personnage seul en scène'], ['dialogue', 'échange de répliques entre personnages']]},
                bq('Une indication sur le ton ou les gestes, écrite par l’auteur, est :', ['une didascalie', 'une réplique', 'un aparté'], 'Elle n’est pas prononcée par les acteurs.'),
            ]),
            ('La ruse en action', [
                {'type': 'observe', 'consigne': 'Les Fourberies de Scapin, comédie de Molière (1671).', 'exemples': [
                    'Scapin, valet rusé, aide son jeune maitre Léandre.', 'Il fait croire à Géronte que son fils est retenu sur une galère turque.', 'Géronte, avare, répète : « Que diable allait-il faire dans cette galère ? »', 'Il finit par payer la rançon inventée.']},
                {'type': 'explique', 'texte': 'Le comique naît du décalage : le spectateur connait la ruse, la victime ne la voit pas. On parle de comique de situation et de comique de répétition.'},
                {'type': 'methode', 'titre': 'Pour analyser une ruse au théâtre', 'etapes': [
                    'Qui trompe, et qui est trompé ?',
                    'Quel est le but de la ruse ?',
                    'Quels moyens : mensonge, déguisement, cachette ?',
                    'Qu’est-ce qui fait rire le spectateur ?']},
                {'type': 'piege', 'erreur': 'On croit que Scapin est le fils de Géronte.', 'correction': 'Scapin est le valet de Léandre. Léandre est le fils de Géronte.'},
            ]),
        ],
        a_toi=[
            q('Qui a écrit Les Fourberies de Scapin ?', ['Molière', 'Jules Verne', 'Charles Perrault'], 'Comédie de Molière, 1671.'),
            q('Un personnage parle seul en scène longuement : c’est :', ['un monologue', 'un dialogue', 'une didascalie'], 'Mono : un seul.'),
            q('Pourquoi Scapin invente-t-il l’histoire de la galère ?', ['pour obtenir de l’argent de Géronte', 'pour partir en voyage', 'pour sauver Géronte'], 'La rançon sert à aider Léandre.'),
        ],
        sources=[src(BO, 'Se masquer, jouer, déjouer : ruses en action (théâtre)', 'Entrée du programme'),
                 src(BO, 'et comique que constitue la ruse, à s’interroger sur les modalités et les enjeux de sa mise en scène, et sur les valeurs qui sous-', 'Ressort comique de la ruse')]),

    'FR-C3-6E-LITT-04': dict(duree=9, essentiel=
        'Un récit d’aventure lance un héros loin de chez lui, face à des épreuves.\n'
        'Le schéma narratif : situation initiale, élément déclencheur, péripéties, résolution, situation finale.\n'
        'Le Tour du monde en quatre-vingts jours, de Jules Verne, en est un exemple célèbre.',
        parties=[
            ('Le schéma narratif', [
                {'type': 'tableau', 'titre': 'Le Tour du monde en quatre-vingts jours (Jules Verne, 1872)', 'colonnes': ['Étape', 'Dans le roman'], 'lignes': [
                    ['situation initiale', 'Phileas Fogg, gentleman anglais, mène une vie réglée à Londres.'], ['élément déclencheur', 'Il parie qu’il fera le tour du monde en quatre-vingts jours.'],
                    ['péripéties', 'Avec son domestique Passepartout, il traverse mers et continents, poursuivi par l’inspecteur Fix.'], ['résolution', 'Il croit avoir perdu, mais il a gagné un jour en voyageant vers l’est.'], ['situation finale', 'Il gagne son pari et épouse Aouda.']]},
                bq('Quel est l’élément déclencheur ?', ['le pari de Phileas Fogg', 'la vie réglée à Londres', 'le mariage avec Aouda'], 'C’est lui qui lance l’aventure.'),
            ]),
            ('Le héros et ses épreuves', [
                {'type': 'explique', 'texte': 'Le héros d’aventure quitte un monde connu. Ses épreuves le révèlent : courage, ruse, fidélité. Ulysse dans l’Odyssée et Robinson Crusoé sont d’autres héros célèbres.'},
                {'type': 'methode', 'titre': 'Pour analyser un récit d’aventure', 'etapes': [
                    'Repère le départ et sa cause.',
                    'Liste les épreuves dans l’ordre.',
                    'Note ce que le héros apprend ou montre.',
                    'Compare la situation finale à la situation initiale.']},
                {'type': 'piege', 'erreur': 'On confond péripéties et élément déclencheur.', 'correction': 'L’élément déclencheur arrive une fois, au début. Les péripéties sont les épreuves qui suivent.'},
            ]),
        ],
        a_toi=[
            q('Qui est le domestique de Phileas Fogg ?', ['Passepartout', 'Fix', 'Vendredi'], 'Vendredi est le compagnon de Robinson Crusoé.'),
            q('Quelle étape termine le schéma narratif ?', ['la situation finale', 'les péripéties', 'l’élément déclencheur'], 'Elle montre ce qui a changé.'),
            q('Pourquoi Fogg gagne-t-il un jour ?', ['il voyage vers l’est', 'il prend un raccourci', 'il triche'], 'Il voyage vers l’est et traverse les fuseaux horaires : il gagne un jour.'),
        ],
        sources=[src(BO, 'Partir à l’aventure ! (récit, fiction)', 'Entrée du programme')]),

    'FR-C3-6E-LITT-05': dict(duree=9, essentiel=
        'Le monstre inspire la peur par son corps, sa force ou sa cruauté.\n'
        'Il peut aussi inspirer la pitié : sa différence cache parfois une part d’humanité.\n'
        'Le récit de monstre transmet souvent une leçon sur la peur, l’apparence ou le courage.',
        parties=[
            ('Des monstres célèbres', [
                {'type': 'tableau', 'titre': 'Monstres et héros', 'colonnes': ['Monstre', 'Récit', 'Héros'], 'lignes': [
                    ['le Cyclope Polyphème', 'l’Odyssée d’Homère', 'Ulysse, qui l’aveugle par la ruse'], ['le Minotaure', 'mythe grec', 'Thésée, aidé du fil d’Ariane'], ['Méduse', 'mythe grec', 'Persée, qui évite son regard grâce à un bouclier'], ['le loup', 'Le Petit Chaperon rouge, de Perrault', 'aucun : la fillette est dévorée']]},
                bq('Quel héros affronte le Minotaure ?', ['Thésée', 'Ulysse', 'Persée'], 'Il sort du labyrinthe grâce au fil d’Ariane.'),
            ]),
            ('Derrière le monstre, un être humain', [
                {'type': 'observe', 'consigne': 'La Belle et la Bête, conte de Madame Leprince de Beaumont (1757).', 'exemples': [
                    'La Bête effraie par son apparence.', 'Elle se montre bonne et généreuse envers la Belle.', 'L’amour de la Belle la délivre : elle redevient un prince.']},
                {'type': 'methode', 'titre': 'Pour dégager la leçon d’un récit de monstre', 'etapes': [
                    'Décris le monstre : corps, comportement.',
                    'Repère ce qu’éprouvent les autres personnages : peur, dégout, pitié.',
                    'Observe ce qui change à la fin.',
                    'Formule la leçon en une phrase.']},
                {'type': 'piege', 'erreur': 'On croit que tous les monstres sont méchants.', 'correction': 'La Bête est bonne. Le récit apprend à ne pas juger sur l’apparence.'},
            ]),
        ],
        a_toi=[
            q('Quelle est la leçon de La Belle et la Bête ?', ['ne pas juger sur l’apparence', 'se méfier des inconnus', 'obéir à ses parents'], 'La bonté compte plus que l’apparence.'),
            q('Comment Persée échappe-t-il au regard de Méduse ?', ['grâce à un bouclier', 'en fermant les yeux pour toujours', 'grâce au fil d’Ariane'], 'Il regarde son reflet dans le bouclier.'),
            q('Qui aveugle le Cyclope Polyphème ?', ['Ulysse', 'Thésée', 'Hercule'], 'Épisode de l’Odyssée.'),
        ],
        sources=[src(BO, 'Rencontrer des monstres : expérience de l’autre, expérience de soi (récit, fiction)', 'Entrée du programme'),
                 src(BO, 'lectures cursives, l’élève est invité à découvrir la part d’humanité d’un personnage monstrueux inspirant la peur ou la', 'Part d’humanité du monstre')]),

    'FR-C3-6E-LECT-01': dict(duree=8, essentiel=
        'Pour rattacher un texte à un genre, on observe les personnages, le cadre, la structure et le style.\n'
        'Le conte merveilleux a de la magie, la fable une morale, le mythe des dieux.\n'
        'Le théâtre est fait de répliques, la poésie de vers et d’images.',
        parties=[
            ('Les indices du genre', [
                {'type': 'tableau', 'titre': 'Reconnaitre un genre', 'colonnes': ['Genre', 'Indices'], 'lignes': [
                    ['conte merveilleux', 'Il était une fois, lieu et temps flous, magie, fin heureuse'], ['fable', 'récit court, souvent des animaux, une morale'], ['mythe', 'dieux et héros, explication du monde'],
                    ['récit d’aventure', 'voyage, épreuves, héros courageux'], ['théâtre', 'noms des personnages, répliques, didascalies'], ['poésie', 'vers, strophes, rimes, images']]},
                bq('Un texte en vers, avec des animaux, qui finit par une morale, est :', ['une fable', 'un mythe', 'un conte merveilleux'], 'La morale est la marque de la fable.'),
            ]),
            ('Justifier sa réponse', [
                {'type': 'methode', 'titre': 'Pour rattacher un texte à un genre', 'etapes': [
                    'Observe la forme : prose, vers, répliques ?',
                    'Repère les personnages et le cadre.',
                    'Cherche la structure : morale, schéma narratif, scènes.',
                    'Cite deux indices précis du texte pour justifier.']},
                {'type': 'piege', 'erreur': 'On se fie à un seul indice : il y a un animal, donc c’est une fable.', 'correction': 'Un conte ou un récit d’aventure peut avoir des animaux. Cherche plusieurs indices.'},
            ]),
        ],
        a_toi=[
            q('« Il était une fois une fée… » annonce :', ['un conte merveilleux', 'un documentaire', 'une pièce de théâtre'], 'Formule d’ouverture et magie.'),
            q('Un texte présenté avec le nom des personnages devant chaque réplique est :', ['du théâtre', 'un poème', 'un mythe'], 'Les répliques sont la marque du théâtre.'),
            q('Un récit qui explique pourquoi les saisons existent, avec des dieux, est :', ['un mythe', 'une fable', 'un récit d’aventure'], 'Dieux et explication du monde.'),
        ],
        sources=[src(BO, 'Dégager les principales caractéristiques d’un texte et le rattacher à un genre', 'Rattacher un texte à un genre')]),

    'FR-C3-6E-LECT-02': dict(duree=8, essentiel=
        'Un texte ne dit pas tout : il faut repérer l’implicite grâce aux indices.\n'
        'Les connecteurs marquent les liens logiques : cause (car, parce que), conséquence (donc, si bien que), opposition (mais, pourtant).\n'
        'Un personnage peut être repris par d’autres noms : Hercule, le héros, le fils de Zeus.',
        parties=[
            ('Les reprises nominales', [
                {'type': 'observe', 'consigne': 'Lis : « Hercule s’avança. Le héros leva sa massue. Le fils de Zeus n’avait peur de rien. »', 'exemples': [
                    '« Le héros » reprend Hercule.', '« Le fils de Zeus » reprend aussi Hercule.', 'Les reprises évitent la répétition et apportent une information.']},
                bq('« Le Petit Poucet ramassa des cailloux. Le garçon les mit dans sa poche. » « Le garçon » désigne :', ['le Petit Poucet', 'un autre enfant', 'le père'], 'C’est une reprise nominale.'),
            ]),
            ('Les liens logiques', [
                {'type': 'tableau', 'titre': 'Connecteurs logiques', 'colonnes': ['Lien', 'Connecteurs', 'Exemple'], 'lignes': [
                    ['cause', 'car, parce que, puisque', 'Il fuit, car il a peur.'], ['conséquence', 'donc, alors, si bien que', 'Il a peur, donc il fuit.'], ['opposition', 'mais, pourtant, cependant', 'Il a peur, pourtant il avance.']]},
                {'type': 'piege', 'erreur': 'On confond cause et conséquence.', 'correction': 'La cause vient avant dans le temps : il a peur (cause), il fuit (conséquence).'},
            ]),
            ('L’implicite', [
                {'type': 'exemple-resolu', 'enonce': '« Quand Lou rentra, ses bottes laissèrent des traces de boue sur le carrelage. »', 'etapes': [
                    'Le texte ne dit pas le temps qu’il faisait.', 'Indice : de la boue sur les bottes.'],
                 'conclusion': 'Il a sans doute plu, ou Lou a marché dans la terre mouillée.'},
                {'type': 'methode', 'titre': 'Pour lire l’implicite', 'etapes': [
                    'Repère les indices : gestes, objets, paroles.',
                    'Formule une déduction.',
                    'Vérifie qu’elle ne contredit rien dans le texte.']},
            ]),
        ],
        a_toi=[
            q('« Il était épuisé, si bien qu’il s’endormit aussitôt. » Le lien est :', ['de conséquence', 'de cause', 'd’opposition'], 'Si bien que introduit la conséquence.'),
            q('« Elle était riche, pourtant elle vivait simplement. » Le lien est :', ['d’opposition', 'de cause', 'de conséquence'], 'Le connecteur pourtant marque l’opposition.'),
            q('« Le roi… Le souverain… Le vieil homme… » Ces mots :', ['désignent le même personnage', 'désignent trois personnages', 'sont des lieux'], 'Ce sont des reprises nominales.'),
        ],
        sources=[src(BO, 'Repérer les informations explicites et implicites, les liens logiques, les reprises nominales', 'Implicite, liens logiques, reprises')]),

    'FR-C3-6E-LECT-03': dict(duree=7, essentiel=
        'Avant d’utiliser un document, j’identifie sa nature : article, photographie, carte, extrait de roman…\n'
        'J’identifie aussi sa source : auteur, date, éditeur ou site.\n'
        'Un document signé, daté et publié par un organisme reconnu est plus fiable.',
        parties=[
            ('Nature et source', [
                {'type': 'tableau', 'titre': 'Questions à poser', 'colonnes': ['Question', 'Où trouver la réponse'], 'lignes': [
                    ['Qu’est-ce que c’est ?', 'la forme : texte, image, graphique, carte'], ['Qui l’a écrit ?', 'le nom de l’auteur, sous le titre ou à la fin'], ['Quand ?', 'la date de publication'], ['Où est-il publié ?', 'le journal, le livre, le site']]},
                bq('Pour savoir qui a écrit un article, je cherche :', ['la signature', 'la photo', 'le titre'], 'L’auteur signe son article.'),
            ]),
            ('Juger la fiabilité', [
                {'type': 'methode', 'titre': 'Pour juger si un document est fiable', 'etapes': [
                    'L’auteur est-il connu, compétent sur le sujet ?',
                    'Le document est-il daté et récent si le sujet évolue ?',
                    'La publication est-elle sérieuse : encyclopédie, journal, institution ?',
                    'Les informations sont-elles confirmées par une autre source ?']},
                {'type': 'piege', 'erreur': 'On croit une information parce qu’elle est partagée des milliers de fois.', 'correction': 'Le nombre de partages ne prouve rien. On vérifie la source.'},
                {'type': 'exemple-resolu', 'enonce': 'Deux documents sur les volcans : un message anonyme sur un réseau social, un article d’encyclopédie signé par un géologue.', 'etapes': [
                    'Le premier n’a ni auteur ni date.', 'Le second est signé par un spécialiste et publié par un éditeur reconnu.'],
                 'conclusion': 'L’article d’encyclopédie est plus fiable.'},
            ]),
        ],
        a_toi=[
            q('Quel document est le plus fiable sur la santé ?', ['une brochure du ministère de la Santé', 'un message anonyme', 'une publicité'], 'Source officielle, identifiée.'),
            q('Que vérifier en premier sur une photo trouvée sur internet ?', ['sa source et sa date', 'ses couleurs', 'sa taille'], 'Une photo peut être sortie de son contexte.'),
            q('Un extrait de roman est un document :', ['de fiction', 'scientifique', 'statistique'], 'Il raconte une histoire inventée.'),
        ],
        sources=[src(BO, 'Identifier la nature et la source des documents', 'Nature et source des documents')]),

    'FR-C3-6E-ECR-01': dict(duree=8, essentiel=
        'Résumer, c’est réduire un texte en gardant l’essentiel, dans l’ordre.\n'
        'On supprime les détails, les descriptions et les dialogues.\n'
        'On reformule avec ses propres mots, au présent, sans donner son avis.',
        parties=[
            ('Garder l’essentiel', [
                vocabulaire(3, 'Résumé'),
                {'type': 'methode', 'titre': 'Les étapes du résumé', 'etapes': [
                    'Lis le texte en entier et repère le sujet.',
                    'Découpe-le en étapes et donne un titre à chacune.',
                    'Pour chaque étape, écris une phrase : qui fait quoi ?',
                    'Relie les phrases avec des connecteurs, sans ajouter d’avis.']},
                {'type': 'piege', 'erreur': 'On recopie des phrases du texte.', 'correction': 'Un résumé reformule. On garde seulement les noms propres et les mots clés.'},
            ]),
            ('Un exemple', [
                {'type': 'exemple-resolu', 'enonce': 'Résume en trois phrases Le Petit Chaperon rouge, de Perrault.', 'etapes': [
                    'Une fillette traverse le bois pour porter une galette à sa mère-grand.', 'Elle renseigne le loup, qui arrive avant elle et dévore la grand-mère.', 'Le loup, couché dans le lit, dévore aussi la fillette.'],
                 'conclusion': 'Trois phrases, dans l’ordre, sans dialogues ni détails.'},
                bq('Que supprime-t-on dans un résumé ?', ['les dialogues et les détails', 'les personnages principaux', 'l’ordre des évènements'], 'On garde l’essentiel, dans l’ordre.'),
            ]),
        ],
        a_toi=[
            q('À quel temps rédige-t-on souvent un résumé ?', ['au présent', 'au futur', 'au conditionnel'], 'Le présent rend le résumé clair.'),
            q('Un résumé contient-il l’avis de celui qui l’écrit ?', ['non', 'oui', 'seulement à la fin'], 'Le résumé reste fidèle au texte.'),
            q('Quelle phrase résume le mieux « Le lièvre et la tortue » ?', ['Une tortue lente gagne une course contre un lièvre trop sûr de lui.', 'Le lièvre a de grandes oreilles.', 'J’adore cette fable.'], 'Elle dit l’essentiel de l’histoire.'),
        ],
        sources=[src(BO, 'Écrire pour résumer et/ou synthétiser', 'Résumer')]),

    'FR-C3-6E-ECR-02': dict(duree=8, essentiel=
        'Réviser son texte, c’est le relire pour l’améliorer et le corriger.\n'
        'Je vérifie le sens, puis la ponctuation, les accords, la conjugaison et les homophones.\n'
        'Je remplace les répétitions par des reprises ou des synonymes.',
        parties=[
            ('Relire en plusieurs passages', [
                {'type': 'tableau', 'titre': 'Grille de relecture', 'colonnes': ['Passage', 'Je vérifie'], 'lignes': [
                    ['sens', 'mon texte répond à la consigne et se comprend'], ['phrases', 'majuscules, points, virgules'], ['accords', 'groupes nominaux, sujet et verbe'], ['verbes', 'temps cohérents, terminaisons'], ['mots', 'homophones, répétitions']]},
                {'type': 'exemple-resolu', 'enonce': 'Corrige : « les enfant mange dans la cantine il on faim »', 'etapes': [
                    'Majuscule et point : Les… cantine. Ils…', 'Accords : enfants, mangent.', 'Homophone : ils ont faim (avaient).'],
                 'conclusion': 'Les enfants mangent à la cantine. Ils ont faim.'},
            ]),
            ('Améliorer le style', [
                {'type': 'methode', 'titre': 'Pour améliorer une phrase', 'etapes': [
                    'Repère les mots répétés.',
                    'Remplace par un pronom, un synonyme ou une reprise nominale.',
                    'Choisis un verbe précis plutôt que faire, dire, mettre.']},
                {'type': 'piege', 'erreur': 'On relit une seule fois, rapidement.', 'correction': 'On relit plusieurs fois, en cherchant un seul type d’erreur à chaque passage.'},
                bq('Quel verbe est plus précis que « dire » dans « Il dit à voix basse » ?', ['chuchoter', 'parler', 'faire'], 'Chuchoter contient l’idée de voix basse.'),
            ]),
        ],
        a_toi=[
            q('Quelle phrase est correcte ?', ['Les oiseaux chantent dans les arbres.', 'Les oiseau chante dans les arbre.', 'Les oiseaux chante dans les arbres.'], 'Pluriel du groupe nominal et du verbe.'),
            q('Que vérifie-t-on en premier ?', ['que le texte a du sens et répond à la consigne', 'les accents', 'la longueur'], 'Le sens d’abord.'),
            q('Par quoi remplacer le second « le chevalier » dans « Le chevalier entra. Le chevalier salua le roi. » ?', ['Il', 'Elle', 'Le roi'], 'Un pronom évite la répétition.'),
        ],
        sources=[src(BO, 'Prendre en compte les normes de l’écrit pour réviser un texte', 'Réviser un texte'),
                 src(BO, 'Améliorer tout ou partie de son texte à partir de son autoévaluation et/ou de pistes données par l’enseignant et ses pairs', 'Améliorer son texte')]),

    'FR-C3-6E-ECOU-01': dict(duree=7, essentiel=
        'Reformuler, c’est redire avec ses propres mots ce qu’on a entendu, sans changer le sens.\n'
        'On reformule ce qui est dit (explicite) et ce qui est sous-entendu (implicite).\n'
        '« Il reste trois places » peut se reformuler : la salle est presque pleine.',
        parties=[
            ('Écouter activement', [
                {'type': 'methode', 'titre': 'Pendant l’écoute', 'etapes': [
                    'Écoute en sachant pourquoi : quelle information chercher ?',
                    'Note quelques mots clés, pas des phrases.',
                    'Repère les connecteurs : d’abord, mais, donc.']},
                bq('Pendant l’écoute, je note :', ['des mots clés', 'tout, mot à mot', 'rien'], 'Les mots clés aident à reformuler ensuite.'),
            ]),
            ('Reformuler', [
                {'type': 'tableau', 'titre': 'Dit et sous-entendu', 'colonnes': ['On entend', 'Reformulation'], 'lignes': [
                    ['« Il reste trois places. »', 'La salle est presque pleine.'], ['« Prenez vos parapluies cet après-midi. »', 'Il va pleuvoir.'], ['« Le train aura vingt minutes de retard. »', 'Nous arriverons plus tard que prévu.']]},
                {'type': 'piege', 'erreur': 'On répète la phrase entendue mot pour mot.', 'correction': 'Reformuler, c’est changer les mots en gardant le sens.'},
                {'type': 'explique', 'texte': 'Pour vérifier sa compréhension, on peut commencer par : « Si j’ai bien compris… »'},
            ]),
        ],
        a_toi=[
            q('« La cantine sera fermée jeudi. » Reformulation correcte ?', ['Jeudi, on ne pourra pas déjeuner à la cantine.', 'La cantine ferme tous les jours.', 'Jeudi, la cantine sert des frites.'], 'Même sens, autres mots.'),
            q('« N’oubliez pas vos gants demain. » Ce qui est sous-entendu :', ['il fera froid', 'il fera chaud', 'il y aura un match'], 'On prend des gants quand il fait froid.'),
            q('Reformuler, c’est :', ['redire avec ses mots sans changer le sens', 'répéter mot pour mot', 'donner son avis'], 'Le sens est gardé.'),
        ],
        sources=[src(BO, 'Montrer sa compréhension notamment en reformulant avec ses mots des informations explicites et implicites d’un texte', 'Reformuler')]),
}

ecrire(COURS)
