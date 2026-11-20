"""Lot de cours : français CE2. Écrit les cours en brouillon (auteur ia).

    python3 scripts/cours/lot-ce2-francais.py

Cycle 2 : phrases de 12 mots au plus, bloquant. Les pages des extraits sont retrouvées ensuite.
"""
from commun import bq, ecrire, q, src, vocabulaire

BO = 'bo41-2024-francais-c2'

COURS = {
    'FR-C2-CE2-CONJ-01': dict(duree=9, essentiel=
        'Au présent, la terminaison change avec le sujet.\n'
        'Faire : je fais, nous faisons, vous faites, ils font.\n'
        'Aller : je vais, nous allons, ils vont.\n'
        'Prendre : je prends, nous prenons, ils prennent.',
        parties=[
            ('Des verbes à connaitre', [
                {'type': 'tableau', 'titre': 'Présent de verbes fréquents', 'colonnes': ['Sujet', 'faire', 'aller', 'dire', 'venir'], 'lignes': [
                    ['je', 'fais', 'vais', 'dis', 'viens'], ['tu', 'fais', 'vas', 'dis', 'viens'], ['il, elle, on', 'fait', 'va', 'dit', 'vient'],
                    ['nous', 'faisons', 'allons', 'disons', 'venons'], ['vous', 'faites', 'allez', 'dites', 'venez'], ['ils, elles', 'font', 'vont', 'disent', 'viennent']]},
                bq('Complète : vous … vos devoirs.', ['faites', 'faisez', 'fait'], 'Vous faites, comme vous dites.'),
            ]),
            ('Pouvoir, voir, vouloir, prendre', [
                {'type': 'tableau', 'titre': 'Présent', 'colonnes': ['Sujet', 'pouvoir', 'voir', 'vouloir', 'prendre'], 'lignes': [
                    ['je', 'peux', 'vois', 'veux', 'prends'], ['tu', 'peux', 'vois', 'veux', 'prends'], ['il, elle, on', 'peut', 'voit', 'veut', 'prend'],
                    ['nous', 'pouvons', 'voyons', 'voulons', 'prenons'], ['vous', 'pouvez', 'voyez', 'voulez', 'prenez'], ['ils, elles', 'peuvent', 'voient', 'veulent', 'prennent']]},
                {'type': 'piege', 'erreur': 'On écrit « je peut » ou « tu veut ».', 'correction': 'Avec je et tu : je peux, tu veux. Le t est pour il.'},
                bq('Complète : ils … le bus.', ['prennent', 'prenent', 'prends'], 'Deux n : ils prennent.'),
            ]),
        ],
        a_toi=[
            q('Complète : nous … au cinéma.', ['allons', 'vont', 'allez'], 'Aller avec nous.'),
            q('Complète : elle … la vérité.', ['dit', 'dis', 'disent'], 'Avec elle : dit.'),
            q('Complète : je … venir.', ['veux', 'veut', 'voulons'], 'Avec je : veux.'),
        ],
        sources=[src(BO, '(faire, aller, dire, venir, pouvoir, voir, vouloir, prendre).', 'Verbes du 3e groupe')]),

    'FR-C2-CE2-CONJ-02': dict(duree=9, essentiel=
        'L’imparfait raconte le passé : je jouais, nous jouions.\n'
        'Terminaisons : -ais, -ais, -ait, -ions, -iez, -aient.\n'
        'Le futur raconte l’avenir : je jouerai, nous jouerons.\n'
        'Terminaisons : -rai, -ras, -ra, -rons, -rez, -ront.',
        parties=[
            ('L’imparfait', [
                {'type': 'tableau', 'titre': 'Imparfait', 'colonnes': ['Sujet', 'jouer', 'être', 'avoir'], 'lignes': [
                    ['je', 'jouais', 'étais', 'avais'], ['tu', 'jouais', 'étais', 'avais'], ['il, elle, on', 'jouait', 'était', 'avait'],
                    ['nous', 'jouions', 'étions', 'avions'], ['vous', 'jouiez', 'étiez', 'aviez'], ['ils, elles', 'jouaient', 'étaient', 'avaient']]},
                bq('Complète : hier, nous … dans le jardin.', ['jouions', 'jouerons', 'jouons'], 'Hier : imparfait, -ions.'),
            ]),
            ('Le futur', [
                {'type': 'tableau', 'titre': 'Futur', 'colonnes': ['Sujet', 'jouer', 'être', 'avoir'], 'lignes': [
                    ['je', 'jouerai', 'serai', 'aurai'], ['tu', 'joueras', 'seras', 'auras'], ['il, elle, on', 'jouera', 'sera', 'aura'],
                    ['nous', 'jouerons', 'serons', 'aurons'], ['vous', 'jouerez', 'serez', 'aurez'], ['ils, elles', 'joueront', 'seront', 'auront']]},
                {'type': 'methode', 'titre': 'Pour le futur d’un verbe en -er', 'etapes': [
                    'Garde l’infinitif : jouer.',
                    'Ajoute la terminaison : -ai, -as, -a, -ons, -ez, -ont.']},
                {'type': 'piege', 'erreur': 'On oublie le e : je jourai.', 'correction': 'On garde l’infinitif entier : je jouerai.'},
            ]),
        ],
        a_toi=[
            q('Complète : demain, tu … à l’école.', ['seras', 'étais', 'es'], 'Demain : futur.'),
            q('Complète : autrefois, ils … une ferme.', ['avaient', 'auront', 'ont'], 'Autrefois : imparfait.'),
            q('Complète : vous … une chanson demain.', ['chanterez', 'chantiez', 'chantez'], 'Futur avec vous : -rez.'),
        ],
        sources=[src(BO, 'Apprendre à conjuguer au présent, à l’imparfait, au futur', 'Imparfait et futur')]),

    'FR-C2-CE2-CONJ-03': dict(duree=9, essentiel=
        'Le passé composé a deux mots : un auxiliaire et un participe passé.\n'
        'Avec avoir : nous avons joué.\n'
        'Avec être, le participe s’accorde avec le sujet : elle est allée.',
        parties=[
            ('Avoir ou être', [
                vocabulaire(2, 'Participe passé'),
                {'type': 'tableau', 'titre': 'Passé composé', 'colonnes': ['Sujet', 'jouer (avoir)', 'aller (être)'], 'lignes': [
                    ['je', 'ai joué', 'suis allé(e)'], ['tu', 'as joué', 'es allé(e)'], ['il / elle', 'a joué', 'est allé / allée'],
                    ['nous', 'avons joué', 'sommes allé(e)s'], ['vous', 'avez joué', 'êtes allé(e)s'], ['ils / elles', 'ont joué', 'sont allés / allées']]},
                bq('Complète : j’… mangé une pomme.', ['ai', 'suis', 'a'], 'Manger se conjugue avec avoir.'),
            ]),
            ('Accorder avec être', [
                {'type': 'explique', 'texte': 'Avec être, le participe s’accorde comme un adjectif : elles sont **parties**.'},
                {'type': 'piege', 'erreur': '« Elles ont parties. »', 'correction': 'Partir se conjugue avec être : elles sont parties.'},
                bq('Complète : Lisa est …', ['venue', 'venu', 'venus'], 'Lisa : féminin singulier.'),
            ]),
        ],
        a_toi=[
            q('Complète : nous … fini.', ['avons', 'sommes', 'ont'], 'Finir se conjugue avec avoir.'),
            q('Complète : les garçons sont …', ['arrivés', 'arrivé', 'arrivées'], 'Masculin pluriel.'),
            q('Quel est l’auxiliaire dans « il est tombé » ?', ['être', 'avoir', 'tomber'], 'Est vient du verbe être.'),
        ],
        sources=[src(BO, 'et au passé composé de l’indicatif être et avoir, les verbes', 'Passé composé')]),

    'FR-C2-CE2-ORTH-01': dict(duree=7, essentiel=
        'Le verbe s’accorde avec son sujet.\n'
        'Je trouve le sujet en demandant : qui est-ce qui ?\n'
        'Sujet au pluriel : le verbe prend souvent -nt. Les enfants jouent.',
        parties=[
            ('Trouver le sujet', [
                vocabulaire(2, 'Sujet'),
                {'type': 'methode', 'titre': 'Pour accorder le verbe', 'etapes': [
                    'Trouve le verbe.',
                    'Demande : qui est-ce qui fait l’action ?',
                    'Accorde le verbe avec la réponse.']},
                bq('Dans « Mes amis chantent », le sujet est :', ['Mes amis', 'chantent', 'amis seulement'], 'Qui est-ce qui chante ? Mes amis.'),
            ]),
            ('Changer de personne', [
                {'type': 'observe', 'consigne': 'Le verbe change avec le sujet.', 'exemples': [
                    'Tu parles à Léa.', 'Léo parle à Léa.', 'Ils parlent à Léa.']},
                {'type': 'piege', 'erreur': 'On écrit -nt après « il ».', 'correction': 'Il est singulier : il parle. Ils est pluriel : ils parlent.'},
            ]),
        ],
        a_toi=[
            q('Complète : les chats …', ['miaulent', 'miaule', 'miaules'], 'Pluriel : -nt.'),
            q('Complète : tu …', ['ris', 'rit', 'rient'], 'Avec tu : s.'),
            q('Complète : Léa et Tom …', ['dansent', 'danse', 'danses'], 'Deux sujets : pluriel.'),
        ],
        sources=[src(BO, 'Identifier, dans des situations simples, la relation sujet-', 'Relation sujet-verbe')]),

    'FR-C2-CE2-ORTH-02': dict(duree=8, essentiel=
        'Au pluriel, la plupart des noms prennent un s.\n'
        'Les noms en -eau prennent un x : des bateaux.\n'
        'Les noms en -al deviennent -aux : un cheval, des chevaux.',
        parties=[
            ('Pluriels particuliers', [
                {'type': 'tableau', 'titre': 'Pluriels', 'colonnes': ['Singulier', 'Pluriel', 'Règle'], 'lignes': [
                    ['un chat', 'des chats', '+ s'], ['un bateau', 'des bateaux', '-eau → + x'], ['un cheval', 'des chevaux', '-al → -aux'], ['un bijou', 'des bijoux', '7 noms en -ou prennent x']]},
                {'type': 'explique', 'texte': 'Sept noms en -ou prennent un x. Ce sont : bijou, caillou, chou, genou, hibou, joujou, pou.'},
                bq('Pluriel de « journal » ?', ['journaux', 'journals', 'journaus'], '-al devient -aux.'),
            ]),
            ('Le féminin', [
                {'type': 'tableau', 'titre': 'Féminins qui s’entendent', 'colonnes': ['Masculin', 'Féminin'], 'lignes': [
                    ['un lecteur', 'une lectrice'], ['un chanteur', 'une chanteuse'], ['un lion', 'une lionne'], ['un boulanger', 'une boulangère']]},
                {'type': 'piege', 'erreur': 'Des trous → des troux.', 'correction': 'Trou n’est pas dans la liste des sept : des trous.'},
            ]),
        ],
        a_toi=[
            q('Pluriel de « gâteau » ?', ['gâteaux', 'gâteaus', 'gâtaux'], '-eau prend un x.'),
            q('Pluriel de « genou » ?', ['genoux', 'genous', 'genaux'], 'Un des 7 noms en -ou avec x.'),
            q('Féminin de « directeur » ?', ['directrice', 'directeuse', 'directeure'], 'Comme lecteur, lectrice.'),
        ],
        sources=[src(BO, 'des marques d’accord de pluriels irréguliers pour les noms', 'Pluriels irréguliers')]),

    'FR-C2-CE2-GRAM-01': dict(duree=8, essentiel=
        'Les classes de mots : déterminant, nom, adjectif, verbe, pronom, adverbe.\n'
        'L’adverbe précise un verbe ou un adjectif : très, vite, souvent.\n'
        'Il ne change jamais.',
        parties=[
            ('Classer les mots', [
                vocabulaire(2, 'Déterminant', 'Adjectif', 'Pronom', 'Adverbe'),
                {'type': 'observe', 'consigne': 'Lis : « Léa court très vite. »', 'exemples': [
                    'Léa : nom propre.', 'court : verbe.', 'très, vite : adverbes.']},
                bq('Dans « Il parle doucement », « doucement » est :', ['un adverbe', 'un adjectif', 'un nom'], 'Il précise comment il parle.'),
            ]),
            ('Adjectif ou adverbe ?', [
                {'type': 'methode', 'titre': 'Pour les distinguer', 'etapes': [
                    'L’adjectif accompagne un nom et s’accorde.',
                    'L’adverbe précise un verbe ou un adjectif.',
                    'L’adverbe ne s’accorde jamais.']},
                {'type': 'piege', 'erreur': 'On accorde l’adverbe : elles courent vites.', 'correction': 'Vite est un adverbe : elles courent vite.'},
            ]),
        ],
        a_toi=[
            q('Quel mot est un adverbe ?', ['souvent', 'soleil', 'souriant'], 'Il est invariable.'),
            q('Dans « une très belle fleur », « belle » est :', ['un adjectif', 'un adverbe', 'un verbe'], 'Il précise le nom fleur.'),
            q('Dans « Nous mangeons », « Nous » est :', ['un pronom', 'un nom', 'un déterminant'], 'Il remplace des personnes.'),
        ],
        sources=[src(BO, 'verbe, le pronom personnel sujet et l’adverbe.', 'Classes de mots au CE2')]),

    'FR-C2-CE2-GRAM-02': dict(duree=6, essentiel=
        'Le groupe sujet dit qui fait l’action.\n'
        'On peut le remplacer par un pronom : il, elle, ils, elles.\n'
        'Les enfants jouent → Ils jouent.',
        parties=[
            ('Repérer le groupe sujet', [
                {'type': 'methode', 'titre': 'Pour trouver le groupe sujet', 'etapes': [
                    'Encadre avec « c’est… qui » : ce sont les enfants qui jouent.',
                    'Le groupe encadré est le sujet.']},
                bq('Dans « Le petit chien aboie », le groupe sujet est :', ['Le petit chien', 'aboie', 'petit'], 'C’est le petit chien qui aboie.'),
            ]),
            ('Le remplacer par un pronom', [
                {'type': 'tableau', 'titre': 'Remplacer', 'colonnes': ['Groupe sujet', 'Pronom'], 'lignes': [
                    ['Le chat', 'il'], ['Ma sœur', 'elle'], ['Les garçons', 'ils'], ['Léa et Zoé', 'elles'], ['Tom et Léa', 'ils']]},
                {'type': 'piege', 'erreur': 'Tom et Léa → elles.', 'correction': 'Un garçon et une fille : ils.'},
            ]),
        ],
        a_toi=[
            q('Par quel pronom remplacer « Les filles » ?', ['elles', 'ils', 'elle'], 'Féminin pluriel.'),
            q('Par quel pronom remplacer « Mon oncle » ?', ['il', 'elle', 'ils'], 'Masculin singulier.'),
            q('Dans « Les oiseaux du parc chantent », le groupe sujet est :', ['Les oiseaux du parc', 'du parc', 'chantent'], 'Ce sont les oiseaux du parc qui chantent.'),
        ],
        sources=[src(BO, 'Il substitue à un groupe nominal sujet un pronom', 'Remplacer le sujet')]),

    'FR-C2-CE2-GRAM-03': dict(duree=6, essentiel=
        'À la forme négative, deux mots entourent le verbe : ne… pas.\n'
        'On utilise aussi ne… jamais, ne… plus, ne… rien.\n'
        'Devant une voyelle, ne devient n’ : il n’aime pas.',
        parties=[
            ('Transformer une phrase', [
                {'type': 'observe', 'consigne': 'Compare.', 'exemples': [
                    'Jean, ferme la porte.', 'Jean, ne ferme pas la porte.', 'Ne et pas entourent le verbe.']},
                bq('Forme négative de « Je mange » ?', ['Je ne mange pas.', 'Je mange pas.', 'Je ne pas mange.'], 'Ne avant le verbe, pas après.'),
            ]),
            ('Les autres négations', [
                {'type': 'tableau', 'titre': 'Négations', 'colonnes': ['Phrase', 'Négation'], 'lignes': [
                    ['Il pleut.', 'Il ne pleut pas.'], ['Il joue toujours.', 'Il ne joue jamais.'], ['Il dort encore.', 'Il ne dort plus.'], ['Il voit tout.', 'Il ne voit rien.']]},
                {'type': 'piege', 'erreur': 'On oublie le ne : « Je veux pas ».', 'correction': 'À l’écrit, on met les deux mots : je ne veux pas.'},
            ]),
        ],
        a_toi=[
            q('Forme négative de « Elle aime le lait » ?', ['Elle n’aime pas le lait.', 'Elle ne aime pas le lait.', 'Elle aime pas le lait.'], 'Devant une voyelle : n’.'),
            q('Contraire de « Il rit toujours » ?', ['Il ne rit jamais.', 'Il ne rit pas toujours.', 'Il rit jamais.'], 'Toujours → ne… jamais.'),
            q('Quelle phrase est négative ?', ['Nous ne partons plus.', 'Nous partons.', 'Partons !'], 'Ne… plus.'),
        ],
        sources=[src(BO, 'Il transforme des phrases de différents types à la forme', 'Forme négative')]),

    'FR-C2-CE2-LEX-01': dict(duree=6, essentiel=
        'Un préfixe se place au début d’un mot et change son sens.\n'
        'Dé-, in-, im-, mal- donnent souvent un sens contraire.\n'
        'Immobile : pas mobile. Malhabile : pas habile.',
        parties=[
            ('Des préfixes négatifs', [
                vocabulaire(2, 'Préfixe'),
                {'type': 'tableau', 'titre': 'Préfixes', 'colonnes': ['Préfixe', 'Exemple', 'Sens'], 'lignes': [
                    ['dé-', 'défaire', 'le contraire de faire'], ['in-', 'inutile', 'pas utile'], ['im-', 'impossible', 'pas possible'], ['mal-', 'malheureux', 'pas heureux']]},
                bq('Que veut dire « inconnu » ?', ['pas connu', 'très connu', 'connu de tous'], 'In- donne un sens contraire.'),
            ]),
            ('D’autres préfixes', [
                {'type': 'explique', 'texte': '**Re-** veut dire « encore » : refaire, relire. **Pré-** veut dire « avant » : préhistoire.'},
                {'type': 'piege', 'erreur': 'On croit que « indien » contient le préfixe in-.', 'correction': '« dien » n’existe pas. Ce n’est pas un préfixe ici.'},
            ]),
        ],
        a_toi=[
            q('Que veut dire « relire » ?', ['lire encore', 'ne pas lire', 'lire avant'], 'Re- : encore.'),
            q('Contraire de « honnête » ?', ['malhonnête', 'déhonnête', 'inhonnête'], 'Avec mal-.'),
            q('Contraire de « coller » ?', ['décoller', 'incoller', 'malcoller'], 'Avec dé-.'),
        ],
        sources=[src(BO, 'L’élève identifie un sens négatif dans les préfixes dé-, mal-,', 'Préfixes négatifs')]),

    'FR-C2-CE2-LEX-02': dict(duree=6, essentiel=
        'Une famille de mots partage le même radical.\n'
        'Observation, observer, observable : un nom, un verbe, un adjectif.\n'
        'La famille aide à comprendre et à écrire un mot.',
        parties=[
            ('Trouver la partie commune', [
                vocabulaire(2, 'Famille de mots', 'Radical'),
                {'type': 'observe', 'consigne': 'Regarde ces mots.', 'exemples': [
                    'dent, dentiste, dentifrice', 'La partie commune est dent.']},
                bq('Quel mot est de la famille de « terre » ?', ['terrain', 'tarte', 'tirer'], 'Même radical : terr-.'),
            ]),
            ('Classer la famille', [
                {'type': 'tableau', 'titre': 'Une famille', 'colonnes': ['Nom', 'Verbe', 'Adjectif'], 'lignes': [
                    ['observation', 'observer', 'observable'], ['la danse', 'danser', 'dansant'], ['la peinture', 'peindre', 'peint']]},
                {'type': 'piege', 'erreur': 'On met « chapeau » dans la famille de « chat ».', 'correction': 'Le sens n’a rien à voir. Une famille partage aussi le sens.'},
            ]),
        ],
        a_toi=[
            q('Quel mot n’est pas de la famille de « fleur » ?', ['flèche', 'fleuriste', 'fleurir'], 'Flèche n’a pas le même sens.'),
            q('Le verbe de la famille de « jardin » est :', ['jardiner', 'jardinier', 'jardinage'], 'Jardiner est un verbe.'),
            q('Quel est le radical de « chanteur » ?', ['chant', 'eur', 'chanteu'], 'Le radical chant- se retrouve dans chanter et chanson.'),
        ],
        sources=[src(BO, 'Il opère des dérivations en identifiant la partie commune', 'Familles de mots')]),

    'FR-C2-CE2-LEX-03': dict(duree=6, essentiel=
        'Pour éviter de répéter, on utilise un synonyme ou un mot générique.\n'
        'La voiture, l’automobile, le véhicule.\n'
        'Pomme, poire et cerise sont des fruits.',
        parties=[
            ('Synonymes', [
                vocabulaire(2, 'Synonyme'),
                {'type': 'tableau', 'titre': 'Synonymes', 'colonnes': ['Mot', 'Synonyme'], 'lignes': [['content', 'joyeux'], ['commencer', 'débuter'], ['un bateau', 'un navire'], ['rapide', 'vif']]},
                bq('Synonyme de « effrayé » ?', ['apeuré', 'joyeux', 'calme'], 'Les deux disent avoir peur.'),
            ]),
            ('Mots génériques', [
                {'type': 'explique', 'texte': 'Un mot générique regroupe d’autres mots : **outil** pour marteau, scie et pince.'},
                {'type': 'piege', 'erreur': 'On remplace « le chien » par « le chat ».', 'correction': 'Ce n’est pas le même animal. Dis plutôt : l’animal.'},
            ]),
        ],
        a_toi=[
            q('Mot générique pour « violon, piano, flûte » ?', ['instruments', 'meubles', 'animaux'], 'Ce sont des instruments de musique.'),
            q('Synonyme de « débuter » ?', ['commencer', 'finir', 'courir'], 'Même sens.'),
            q('« Le loup… Le loup… » Par quoi remplacer le second ?', ['L’animal', 'Le mouton', 'La forêt'], 'Mot générique.'),
        ],
        sources=[src(BO, 'L’élève mobilise des synonymes, termes génériques ou', 'Synonymes et génériques')]),

    'FR-C2-CE2-LECT-01': dict(duree=6, essentiel=
        'Un récit raconte une histoire.\n'
        'Un texte informatif donne des informations vraies.\n'
        'Un texte prescriptif dit comment faire : recette, règle du jeu.',
        parties=[
            ('Trois types de textes', [
                {'type': 'tableau', 'titre': 'Reconnaitre un texte', 'colonnes': ['Type', 'Il sert à', 'Exemple'], 'lignes': [
                    ['récit', 'raconter', 'un conte, une histoire'], ['informatif', 'informer', 'un documentaire'], ['prescriptif', 'dire comment faire', 'une recette, une notice']]},
                bq('Une règle du jeu est un texte :', ['prescriptif', 'récit', 'informatif'], 'Elle dit comment jouer.'),
            ]),
            ('Les indices', [
                {'type': 'methode', 'titre': 'Pour reconnaitre le type', 'etapes': [
                    'Des personnages et une histoire ? Récit.',
                    'Des faits vrais, des titres, des photos ? Informatif.',
                    'Des étapes et des verbes d’ordre ? Prescriptif.']},
                {'type': 'piege', 'erreur': 'On croit qu’un texte sur un animal est toujours un récit.', 'correction': 'S’il donne des faits vrais, c’est un documentaire.'},
            ]),
        ],
        a_toi=[
            q('« Mélange la farine et les œufs. » vient :', ['d’une recette', 'd’un conte', 'd’un poème'], 'C’est un texte prescriptif.'),
            q('« Le guépard court à 100 km/h. » vient :', ['d’un documentaire', 'd’une recette', 'd’un conte'], 'Information vraie.'),
            q('« Il était une fois un roi… » est :', ['un récit', 'une notice', 'un texte informatif'], 'Il raconte une histoire.'),
        ],
        sources=[src(BO, 'Différencier le type narratif du type informatif et prescriptif', 'Types de textes')]),

    'FR-C2-CE2-LECT-02': dict(duree=6, essentiel=
        'Un texte ne dit pas tout.\n'
        'Je cherche des indices pour comprendre ce qui n’est pas écrit.\n'
        '« Il ouvre son parapluie. » : on comprend qu’il pleut.',
        parties=[
            ('Chercher les indices', [
                {'type': 'methode', 'titre': 'Pour lire entre les lignes', 'etapes': [
                    'Repère les mots importants.',
                    'Demande-toi ce qu’ils montrent.',
                    'Vérifie avec le reste du texte.']},
                {'type': 'exemple-resolu', 'enonce': '« Nina souffle les bougies. Tout le monde chante. »', 'etapes': [
                    'Indice 1 : des bougies à souffler.', 'Indice 2 : tout le monde chante.'],
                 'conclusion': 'C’est l’anniversaire de Nina.'},
                bq('« Paul grelotte et met son écharpe. » Il fait :', ['froid', 'chaud', 'nuit'], 'Grelotter : trembler de froid.'),
            ]),
            ('Ne pas inventer', [
                {'type': 'piege', 'erreur': 'On imagine une réponse sans indice.', 'correction': 'Chaque idée doit s’appuyer sur un mot du texte.'},
            ]),
        ],
        a_toi=[
            q('« Lou bâille et se frotte les yeux. » Lou est :', ['fatiguée', 'en colère', 'affamée'], 'Bâiller montre la fatigue.'),
            q('« Le chien remue la queue en voyant son maitre. » Le chien est :', ['content', 'triste', 'malade'], 'Remuer la queue montre la joie.'),
            q('« Max essuie la sueur de son front. » Il fait :', ['chaud', 'froid', 'nuit'], 'On transpire quand il fait chaud.'),
        ],
        sources=[src(BO, 'Comprendre ce qui est implicite (inférences) en s’appuyant sur des indices explicites', 'Inférences')]),

    'FR-C2-CE2-LECT-03': dict(duree=6, essentiel=
        'Dans un texte, un personnage peut être désigné par plusieurs mots.\n'
        'Le lion, il, le roi des animaux : c’est le même personnage.\n'
        'Je relis la phrase d’avant pour savoir qui est désigné.',
        parties=[
            ('Les pronoms', [
                {'type': 'observe', 'consigne': 'Lis : « Zoé appelle son chat. Elle le cherche partout. »', 'exemples': [
                    'Elle désigne Zoé.', 'Le désigne le chat.']},
                bq('« Max a perdu sa balle. Il la cherche. » Que désigne « la » ?', ['la balle', 'Max', 'le chat'], 'Il cherche sa balle.'),
            ]),
            ('Les autres noms', [
                {'type': 'exemple-resolu', 'enonce': '« Le lion rugit. Le roi des animaux a faim. »', 'etapes': [
                    'On cherche qui est le roi des animaux.', 'C’est un autre nom pour le lion.'],
                 'conclusion': 'Le roi des animaux désigne le lion.'},
                {'type': 'piege', 'erreur': 'On croit qu’un nouveau nom est un nouveau personnage.', 'correction': 'Vérifie : souvent, c’est le même personnage, dit autrement.'},
            ]),
        ],
        a_toi=[
            q('« La sorcière prit son balai. La vieille femme s’envola. » Qui s’envole ?', ['la sorcière', 'une autre femme', 'le balai'], 'La vieille femme est la sorcière.'),
            q('« Tom donne un os au chien. Celui-ci le mange. » Qui mange ?', ['le chien', 'Tom', 'l’os'], 'Celui-ci désigne le chien.'),
            q('« Les élèves entrent. Ils s’assoient. » Qui s’assoit ?', ['les élèves', 'la maitresse', 'on ne sait pas'], 'Ils reprend les élèves.'),
        ],
        sources=[src(BO, 'Se repérer dans la chaine anaphorique', 'Reprises')]),

    'FR-C2-CE2-ECOU-01': dict(duree=5, essentiel=
        'Pour retenir un message long, je repère les informations importantes.\n'
        'Je les relie entre elles.\n'
        'À la fin, je redis l’essentiel avec mes mots.',
        parties=[
            ('Écouter avec un but', [
                {'type': 'methode', 'titre': 'Pendant l’écoute', 'etapes': [
                    'Sache ce que tu cherches avant d’écouter.',
                    'Retiens les mots clés.',
                    'Relie-les : qui, quoi, où, quand, pourquoi.']},
                bq('Pendant l’écoute, je retiens :', ['les mots clés', 'tous les mots', 'rien'], 'Les mots clés suffisent.'),
            ]),
            ('Redire l’essentiel', [
                {'type': 'exemple-resolu', 'enonce': 'Tu entends : « Les abeilles butinent les fleurs. Elles fabriquent le miel dans la ruche. »', 'etapes': [
                    'Mots clés : abeilles, fleurs, miel, ruche.'],
                 'conclusion': 'Les abeilles butinent les fleurs pour faire le miel.'},
                {'type': 'piege', 'erreur': 'On retient seulement la dernière phrase.', 'correction': 'Relie toutes les informations importantes.'},
            ]),
        ],
        a_toi=[
            q('Pour bien écouter, je :', ['sais ce que je cherche', 'parle en même temps', 'regarde ailleurs'], 'L’écoute est active.'),
            q('Redire l’essentiel, c’est :', ['dire les idées importantes avec ses mots', 'tout répéter', 'inventer'], 'On garde le sens.'),
            q('Quels mots aident à relier les informations ?', ['qui, quoi, où, quand', 'oui, non', 'bonjour'], 'Ce sont des questions utiles.'),
        ],
        sources=[src(BO, 'Repérer, mémoriser et relier entre elles plusieurs informations importantes', 'Écouter et relier')]),

    'FR-C2-CE2-ORTH-03': dict(duree=6, essentiel=
        'L’accent aigu é se prononce [é] : un éléphant.\n'
        'L’accent grave è se prononce [è] : une flèche.\n'
        'L’accent circonflexe ê se prononce aussi [è] : une fête.',
        parties=[
            ('Trois accents', [
                {'type': 'tableau', 'titre': 'Les accents sur le e', 'colonnes': ['Accent', 'Son', 'Exemples'], 'lignes': [
                    ['é (aigu)', '[é]', 'été, école'], ['è (grave)', '[è]', 'mère, élève'], ['ê (circonflexe)', '[è]', 'tête, forêt']]},
                bq('Quel mot a un accent grave ?', ['frère', 'été', 'fête'], 'Le è de frère.'),
            ]),
            ('Quand mettre un accent ?', [
                {'type': 'explique', 'texte': 'Pas d’accent sur le e devant deux consonnes : **belle**, **terre**. Pas d’accent devant un x : **exercice**.'},
                {'type': 'piege', 'erreur': 'On écrit « bèlle ».', 'correction': 'Devant deux consonnes, le e n’a pas d’accent : belle.'},
            ]),
        ],
        a_toi=[
            q('Comment écrit-on ce mot ? une f…te', ['fête', 'fète', 'féte'], 'Accent circonflexe.'),
            q('Comment écrit-on ce mot ? l’…cole', ['école', 'ècole', 'êcole'], 'Accent aigu.'),
            q('Quel mot est bien écrit ?', ['terre', 'tèrre', 'térre'], 'Pas d’accent devant deux consonnes.'),
        ],
        sources=[src(BO, 'Tenir compte des accents', 'Accents')]),

    'FR-C2-CE2-ORTH-04': dict(duree=6, essentiel=
        'Pour écrire un mot, je pense à sa famille.\n'
        'Beau → beauté. Dent → dentiste.\n'
        'Le radical s’écrit de la même façon dans toute la famille.',
        parties=[
            ('S’aider de la famille', [
                {'type': 'tableau', 'titre': 'Familles', 'colonnes': ['Mot connu', 'Mot à écrire'], 'lignes': [['beau', 'beauté'], ['dent', 'dentiste'], ['coiffer', 'coiffeur'], ['lait', 'laitier']]},
                bq('Comment écrit-on le métier de celui qui vend le lait ?', ['laitier', 'létier', 'laitié'], 'Lait garde son ai.'),
            ]),
            ('Préfixes et suffixes', [
                {'type': 'methode', 'titre': 'Pour écrire un mot long', 'etapes': [
                    'Cherche le radical.',
                    'Repère le préfixe ou le suffixe.',
                    'Écris chaque morceau avec son orthographe.']},
                {'type': 'piege', 'erreur': 'On écrit « dantiste ».', 'correction': 'Dentiste vient de dent : en, pas an.'},
            ]),
        ],
        a_toi=[
            q('Comment écrit-on une petite fille ?', ['une fillette', 'une fiette', 'une filette'], 'Fille + -ette.'),
            q('Quel mot aide à écrire « grandir » ?', ['grand', 'gras', 'gland'], 'Même famille.'),
            q('Comment écrit-on le contraire de « faire » avec dé- ?', ['défaire', 'déffaire', 'défère'], 'Dé + faire.'),
        ],
        sources=[src(BO, 'S’appuyer sur des critères morphologiques (radical, préfixe et suffixe) et analogiques pou', 'Écrire grâce à la famille')]),

    'FR-C2-CE2-DICT-01': dict(duree=7, essentiel=
        'Un même son peut s’écrire de plusieurs façons.\n'
        'Le son [o] : o, au, eau. Le son [é] : é, er, ez.\n'
        'Le son [s] : s, ss, c, ç.',
        parties=[
            ('Plusieurs écritures', [
                {'type': 'tableau', 'titre': 'Sons et écritures', 'colonnes': ['Son', 'Écritures', 'Exemples'], 'lignes': [
                    ['[o]', 'o, au, eau', 'vélo, auto, bateau'], ['[é]', 'é, er, ez', 'été, chanter, nez'], ['[an]', 'an, en, am, em', 'maman, dent, jambe, temps'], ['[s]', 's, ss, c, ç', 'sac, tasse, ciel, garçon']]},
                bq('Comment écrit-on ? un chap…', ['chapeau', 'chapo', 'chapau'], 'Famille des mots en -eau.'),
            ]),
            ('Choisir la bonne écriture', [
                {'type': 'methode', 'titre': 'Pour choisir', 'etapes': [
                    'Pense à un mot de la même famille.',
                    'Cherche un mot qui rime et que tu sais écrire.',
                    'Vérifie dans le dictionnaire.']},
                {'type': 'piege', 'erreur': 'On écrit « anpoule ».', 'correction': 'Devant p ou b, on écrit m : ampoule.'},
            ]),
        ],
        a_toi=[
            q('Comment écrit-on ? une …mpe', ['lampe', 'lanpe', 'lempe'], 'Devant p : am.'),
            q('Comment écrit-on ? un garç…', ['garçon', 'garcon', 'garsson'], 'Ç devant o.'),
            q('Comment écrit-on ? un oi…', ['oiseau', 'oisau', 'oiso'], 'Oiseau finit par -eau.'),
        ],
        sources=[src(BO, 'Il transcrit correctement les phonèmes pouvant s’écrire à l’aide de plusieurs graphèmes', 'Un son, plusieurs écritures')]),

    'FR-C2-CE2-ECR-01': dict(duree=6, essentiel=
        'Après avoir écrit, je relis mon texte.\n'
        'Je vérifie les majuscules, les points, les accords et les mots oubliés.\n'
        'Je relis une fois pour chaque vérification.',
        parties=[
            ('Relire méthodiquement', [
                {'type': 'methode', 'titre': 'Pour relire', 'etapes': [
                    'Une majuscule au début, un point à la fin ?',
                    'Les noms et adjectifs sont-ils accordés ?',
                    'Les verbes sont-ils accordés avec le sujet ?',
                    'Manque-t-il un mot ?']},
                {'type': 'exemple-resolu', 'enonce': 'Corrige : « les chats dort. »', 'etapes': [
                    'Majuscule : Les.', 'Les chats : pluriel, donc dorment.'],
                 'conclusion': 'Les chats dorment.'},
                bq('Quelle phrase est correcte ?', ['Mes sœurs jouent.', 'mes sœurs jouent.', 'Mes sœur joue.'], 'Majuscule et accords.'),
            ]),
            ('Corriger', [
                {'type': 'piege', 'erreur': 'On relit en lisant vite, comme une histoire.', 'correction': 'On relit lentement, mot par mot.'},
            ]),
        ],
        a_toi=[
            q('Quelle phrase est correcte ?', ['Le vent souffle fort.', 'le vent souffle fort', 'Le vent soufflent fort.'], 'Majuscule, point, accord.'),
            q('Que manque-t-il ? « Le chat sur le lit. »', ['un verbe', 'un point', 'une majuscule'], 'Le chat dort sur le lit.'),
            q('Combien de fois relire ?', ['une fois par vérification', 'jamais', 'une seule fois vite'], 'Une chose à la fois.'),
        ],
        sources=[src(BO, 'de relire son texte méthodiquement', 'Relire son texte')]),

    'FR-C2-CE2-LECT-04': dict(duree=6, essentiel=
        'Un poème est écrit en vers, souvent avec des rimes.\n'
        'Une pièce de théâtre est écrite pour être jouée.\n'
        'Un récit d’aventure ou policier raconte une histoire pleine de suspense.',
        parties=[
            ('Reconnaitre le genre', [
                {'type': 'tableau', 'titre': 'Genres', 'colonnes': ['Genre', 'Indices'], 'lignes': [
                    ['poème', 'lignes courtes, rimes'], ['théâtre', 'noms des personnages, répliques'], ['récit d’aventure', 'voyage, dangers, héros'], ['récit policier', 'enquête, indices, coupable']]},
                bq('Un texte avec des noms de personnages avant chaque réplique est :', ['du théâtre', 'un poème', 'un documentaire'], 'Il est écrit pour être joué.'),
            ]),
            ('Lire un genre', [
                {'type': 'explique', 'texte': 'Dans un récit policier, un enquêteur cherche des indices. Il trouve le coupable.'},
                {'type': 'piege', 'erreur': 'On croit qu’un poème doit toujours rimer.', 'correction': 'Certains poèmes n’ont pas de rimes.'},
            ]),
        ],
        a_toi=[
            q('Un détective cherche un voleur. C’est un récit :', ['policier', 'documentaire', 'poétique'], 'Il y a une enquête.'),
            q('Un texte en vers est :', ['un poème', 'une recette', 'une affiche'], 'Les vers sont des lignes de poème.'),
            q('Une pièce de théâtre est faite pour :', ['être jouée', 'être chantée seulement', 'informer'], 'Des acteurs la jouent.'),
        ],
        sources=[src(BO, 'Il différencie les caractéristiques des genres et types les plus courants', 'Genres de textes')]),

    'FR-C2-CE2-LECT-05': dict(duree=6, essentiel=
        'Certaines lettres s’écrivent mais ne s’entendent pas : ils chantent, le lait.\n'
        'À l’oral, on fait parfois une liaison : les amis se dit « lé-z-amis ».\n'
        'La liaison se fait devant une voyelle.',
        parties=[
            ('Les lettres muettes', [
                {'type': 'observe', 'consigne': 'Lis à voix haute.', 'exemples': [
                    'Ils chantent : on n’entend pas -ent.', 'Le lait : on n’entend pas le t.', 'Un chat : on n’entend pas le t.']},
                bq('Dans « ils jouent », on entend :', ['jou', 'jouent', 'jou-ent'], 'Le -ent est muet.'),
            ]),
            ('Les liaisons', [
                {'type': 'tableau', 'titre': 'Liaisons', 'colonnes': ['Écrit', 'On dit'], 'lignes': [['les amis', 'lé-z-amis'], ['un enfant', 'un-n-enfant'], ['petit ours', 'peti-t-ours']]},
                {'type': 'piege', 'erreur': 'On fait la liaison devant une consonne : les-z-chats.', 'correction': 'Pas de liaison devant une consonne : les chats.'},
            ]),
        ],
        a_toi=[
            q('Où fait-on une liaison ?', ['les oiseaux', 'les chiens', 'les tables'], 'Oiseaux commence par une voyelle.'),
            q('Quelle lettre de « chat » est muette ?', ['t', 'c', 'h'], 'Le t ne s’entend pas.'),
            q('Comment se dit « deux enfants » ?', ['deu-z-enfants', 'deu-enfants', 'deu-t-enfants'], 'Le x se prononce z.'),
        ],
        sources=[src(BO, 'Repérer les lettres muettes et décoder les mots inconnus', 'Lettres muettes')]),

    'FR-C2-CE2-DICT-02': dict(duree=6, essentiel=
        'En dictée, j’écoute toute la phrase avant d’écrire.\n'
        'Je pense aux accords du nom et du verbe.\n'
        'Je relis pour vérifier chaque accord.',
        parties=[
            ('Pendant la dictée', [
                {'type': 'exemple-resolu', 'enonce': 'Dictée : « Les oiseaux chantaient dans les arbres. »', 'etapes': [
                    'Les oiseaux : pluriel en -x.', 'Ils chantaient : imparfait, -aient.', 'Les arbres : pluriel en -s.'],
                 'conclusion': 'Chaque accord se justifie.'},
                bq('Comment écrit-on ? Les enfants … (jouer, imparfait).', ['jouaient', 'jouait', 'jouais'], 'Ils : -aient.'),
            ]),
            ('Relire', [
                {'type': 'methode', 'titre': 'Après la dictée', 'etapes': [
                    'Relis les groupes du nom.',
                    'Relis les verbes et leurs sujets.',
                    'Relis les majuscules et les points.']},
                {'type': 'piege', 'erreur': 'On écrit les mots comme on les entend : « les oiso chant ».', 'correction': 'On pense aux lettres muettes et aux accords.'},
            ]),
        ],
        a_toi=[
            q('Quelle phrase est correcte ?', ['Les chevaux galopaient.', 'Les chevals galopait.', 'Les chevaux galopait.'], 'Chevaux, galopaient.'),
            q('Quelle phrase est correcte ?', ['Nous serons à l’heure.', 'Nous seront à l’heure.', 'Nous serrons à l’heure.'], 'Futur avec nous : -rons.'),
            q('Que vérifie-t-on en relisant ?', ['les accords et la ponctuation', 'la couleur de l’encre', 'la longueur'], 'Une chose à la fois.'),
        ],
        sources=[src(BO, 'réalise des dictées en lien avec l’étude de la langue', 'Dictées')]),
}

ecrire(COURS)
