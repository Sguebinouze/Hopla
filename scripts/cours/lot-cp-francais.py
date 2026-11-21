"""Lot de cours : français CP. Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-cp-francais.py
    python3 scripts/cours/pages.py content/cours/FR-C2-CP-*.json

Cycle 2 : phrases de 12 mots au plus, bloquant. Au CP, l'enfant apprend à lire : phrases très
courtes, mots simples à déchiffrer. Sources : extraits vérifiés du référentiel.
"""
from commun import bq, ecrire, q, source_referentiel as ref, vocabulaire

COURS = {
    'FR-C2-CP-LECT-01': dict(duree=5, essentiel=
        'Les lettres écrivent les sons.\n'
        'Un son peut s’écrire avec plusieurs lettres : ou, on, ch.\n'
        'Le son « o » s’écrit o, au ou eau.',
        parties=[
            ('Des lettres pour un son', [
                {'type': 'observe', 'consigne': 'Écoute le son « ou ».', 'exemples': ['loup', 'roue', 'mouton']},
                {'type': 'tableau', 'titre': 'Des sons et leurs lettres', 'colonnes': ['Son', 'Lettres', 'Exemple'], 'lignes': [
                    ['« ou »', 'ou', 'loup'], ['« on »', 'on', 'pont'], ['« ch »', 'ch', 'chat'], ['« o »', 'o, au, eau', 'vélo, chaud, bateau']]},
                bq('Dans « chat », quel son entends-tu au début ?', ['« ch »', '« s »', '« c »'], 'c et h ensemble font « ch ».'),
            ]),
            ('Trouver le son', [
                {'type': 'methode', 'titre': 'Pour trouver un son', 'etapes': [
                    'Dis le mot lentement.', 'Écoute chaque son.', 'Cherche les lettres de ce son.']},
                {'type': 'piege', 'erreur': 'On lit o puis u dans « ou ».', 'correction': 'o et u ensemble font un seul son : « ou ».'},
            ]),
        ],
        a_toi=[
            q('Quel mot contient le son « on » ?', ['ballon', 'bulle', 'balai'], 'bal-lon : on entend « on ».'),
            q('Dans « bateau », le son « o » s’écrit :', ['eau', 'o', 'au'], 'ba-teau.'),
            q('Combien de lettres pour le son « ch » ?', ['2', '1', '3'], 'c et h.'),
        ],
        sources=[ref('FR-C2-CP-LECT-01', 'Associer lettres et sons')]),

    'FR-C2-CP-LECT-02': dict(duree=5, essentiel=
        'Un mot se découpe en syllabes.\n'
        'On tape une fois dans les mains par syllabe.\n'
        'la-pin : 2 syllabes. pa-pi-llon : 3 syllabes.',
        parties=[
            ('Compter les syllabes', [
                {'type': 'observe', 'consigne': 'Tape dans tes mains à chaque syllabe.', 'exemples': [
                    'chat : 1 syllabe', 'vé-lo : 2 syllabes', 'é-lé-phant : 3 syllabes']},
                bq('Combien de syllabes dans « papillon » ?', ['3', '2', '8'], 'pa-pi-llon.'),
            ]),
            ('Première et dernière syllabe', [
                {'type': 'exemple-resolu', 'enonce': 'Trouve la première et la dernière syllabe de « moto ».', 'etapes': [
                    'Je découpe : mo-to.', 'La première est mo. La dernière est to.'],
                 'conclusion': 'mo, puis to.'},
                {'type': 'piege', 'erreur': 'On compte les lettres au lieu des syllabes.', 'correction': 'Une syllabe, c’est un coup dans les mains.'},
                bq('Quelle est la première syllabe de « lapin » ?', ['la', 'pin', 'l'], 'la-pin.'),
            ]),
        ],
        a_toi=[
            q('Quelle est la dernière syllabe de « canard » ?', ['nard', 'ca', 'd'], 'ca-nard.'),
            q('Quel mot a une seule syllabe ?', ['pain', 'lapin', 'tortue'], 'On tape une seule fois.'),
            q('Combien de syllabes dans « vélo » ?', ['2', '1', '4'], 'vé-lo.'),
        ],
        sources=[ref('FR-C2-CP-LECT-02', 'Déchiffrer des syllabes')]),

    'FR-C2-CP-ORTH-01': dict(duree=5, essentiel=
        'Certaines lettres ne s’entendent pas : ce sont des lettres muettes.\n'
        'Pour les trouver, je cherche un mot de la même famille.\n'
        'lait, laitier : on entend le t.',
        parties=[
            ('Entendre la lettre muette', [
                vocabulaire(2, 'Famille de mots'),
                {'type': 'observe', 'consigne': 'Le mot de la famille fait entendre la lettre.', 'exemples': [
                    'chat, chaton : t', 'grand, grande : d', 'gris, grise : s']},
                bq('Quelle est la lettre muette de « petit » ?', ['t', 'e', 's'], 'On dit petite : on entend le t.'),
            ]),
            ('Méthode', [
                {'type': 'methode', 'titre': 'Pour trouver une lettre muette', 'etapes': [
                    'Cherche un mot de la même famille.', 'Dis-le à voix haute.', 'Écoute la lettre de la fin.']},
                {'type': 'piege', 'erreur': 'On oublie le t de « dent ».', 'correction': 'Pense à dentiste : on entend le t.'},
            ]),
        ],
        a_toi=[
            q('« Bavard » finit par un d car on dit :', ['bavarder', 'bave', 'bateau'], 'Dans bavarder, on entend le d.'),
            q('Quelle lettre finit « tapis » ? Pense à tapisser.', ['s', 't', 'd'], 'Dans tapisser, on entend le s.'),
            q('Quelle lettre muette finit « rang » ? Pense à ranger.', ['g', 't', 's'], 'Dans ranger, on entend le g.'),
        ],
        sources=[ref('FR-C2-CP-ORTH-01', 'Lettres muettes')]),

    'FR-C2-CP-ORTH-02': dict(duree=6, essentiel=
        'Devant m, b ou p, on écrit m : jambe, pompe.\n'
        'Entre deux voyelles, s fait le son « z » : rose.\n'
        'Pour entendre « s » entre deux voyelles, on écrit ss : tasse.',
        parties=[
            ('m devant m, b, p', [
                {'type': 'observe', 'consigne': 'Regarde la lettre avant m, b ou p.', 'exemples': ['chambre', 'tambour', 'pompier']},
                {'type': 'piege', 'erreur': 'On écrit « janbe ».', 'correction': 'Devant b, on écrit m : jambe.'},
                bq('Complète : une la…pe', ['m', 'n'], 'Devant p, on écrit m : lampe.'),
            ]),
            ('s ou ss', [
                {'type': 'tableau', 'titre': 'Écoute la différence', 'colonnes': ['s : son « z »', 'ss : son « s »'], 'lignes': [
                    ['rose', 'tasse'], ['poison', 'poisson'], ['désert', 'dessert']]},
                bq('Dans « cousin », le s se lit :', ['« z »', '« s »', '« ch »'], 'Il est entre deux voyelles : ou et i.'),
            ]),
        ],
        a_toi=[
            q('Quel mot est bien écrit ?', ['tambour', 'tanbour', 'tammbour'], 'Devant b, on écrit m.'),
            q('Complète : une ca…erole (son « s »)', ['ss', 's', 'z'], 'Entre deux voyelles, ss fait « s ».'),
            q('Complète : une po…me', ['m', 'n'], 'Devant m, on écrit m : pomme.'),
        ],
        sources=[ref('FR-C2-CP-ORTH-02', 'm devant m, b, p ; valeur du s')]),

    'FR-C2-CP-ORTH-03': dict(duree=5, essentiel=
        'Au pluriel, on ajoute souvent un s : un chat, des chats.\n'
        'Au féminin, l’adjectif prend souvent un e : petit, petite.\n'
        'Ce s et ce e ne s’entendent pas toujours.',
        parties=[
            ('Le pluriel', [
                vocabulaire(2, 'Nom', 'Adjectif'),
                {'type': 'tableau', 'titre': 'Un ou plusieurs', 'colonnes': ['Singulier', 'Pluriel'], 'lignes': [
                    ['un ballon rouge', 'des ballons rouges'], ['le vélo', 'les vélos']]},
                {'type': 'piege', 'erreur': 'On oublie le s, car on ne l’entend pas.', 'correction': 'Après des ou les, pense au s.'},
                bq('Au pluriel, « une fleur » devient :', ['des fleurs', 'des fleur', 'une fleurs'], 'Plusieurs fleurs : un s.'),
            ]),
            ('Le féminin', [
                {'type': 'observe', 'consigne': 'L’adjectif change avec le nom.', 'exemples': [
                    'un petit garçon, une petite fille', 'un chat gris, une souris grise']},
                bq('Au féminin, « grand » devient :', ['grande', 'grands', 'grand'], 'On ajoute un e.'),
            ]),
        ],
        a_toi=[
            q('Quel groupe est au pluriel ?', ['les vélos', 'le vélo', 'un vélo'], 'Les : plusieurs vélos.'),
            q('Complète : des pomme… vertes', ['s', 'e', 'x'], 'Des pommes : plusieurs.'),
            q('Une robe vert… ?', ['e', 's', 't'], 'Robe est féminin : verte.'),
        ],
        sources=[ref('FR-C2-CP-ORTH-03', 'Singulier, pluriel, féminin')]),

    'FR-C2-CP-GRAM-01': dict(duree=4, essentiel=
        'Une phrase commence par une majuscule.\n'
        'Elle finit par un point.\n'
        'Une question finit par un point d’interrogation : ?',
        parties=[
            ('Reconnaitre une phrase', [
                {'type': 'observe', 'consigne': 'Regarde le début et la fin.', 'exemples': [
                    'Le chat dort.', 'Où est mon ballon ?', 'Il fait beau !']},
                bq('Quelle phrase est bien écrite ?', ['Le chien aboie.', 'le chien aboie.', 'Le chien aboie'], 'Majuscule au début, point à la fin.'),
            ]),
            ('La question', [
                {'type': 'piege', 'erreur': 'On oublie la majuscule après un point.', 'correction': 'Après un point, une nouvelle phrase commence : majuscule.'},
                bq('Quelle phrase est une question ?', ['Tu viens ?', 'Tu viens.', 'Viens !'], 'Elle finit par ?.'),
            ]),
        ],
        a_toi=[
            q('Une phrase commence par :', ['une majuscule', 'un point', 'une virgule'], 'Comme le L de « Le chat dort. ».'),
            q('« Il pleut. Je reste ici. » Combien de phrases ?', ['2', '1', '5'], 'Deux points, deux phrases.'),
            q('« Quel âge as-tu » finit par :', ['?', '.', '!'], 'C’est une question.'),
        ],
        sources=[ref('FR-C2-CP-GRAM-01', 'La phrase simple')]),

    'FR-C2-CP-CONJ-01': dict(duree=6, essentiel=
        'Être et avoir sont deux verbes très utiles.\n'
        'Je suis content. J’ai un chat.\n'
        'Nous sommes à l’école. Nous avons un livre.',
        parties=[
            ('Les deux verbes', [
                vocabulaire(2, 'Verbe'),
                {'type': 'tableau', 'titre': 'Au présent', 'colonnes': ['Qui ?', 'être', 'avoir'], 'lignes': [
                    ['je', 'suis', 'ai (j’ai)'], ['tu', 'es', 'as'], ['il, elle', 'est', 'a'],
                    ['nous', 'sommes', 'avons'], ['vous', 'êtes', 'avez'], ['ils, elles', 'sont', 'ont']]},
                bq('Nous … contents.', ['sommes', 'avons', 'sont'], 'Être avec nous : nous sommes.'),
            ]),
            ('Ne pas confondre', [
                {'type': 'piege', 'erreur': 'On écrit « tu a ».', 'correction': 'Avec tu, on écrit tu as. Avec il, on écrit il a.'},
                bq('Tu … un vélo.', ['as', 'a', 'es'], 'Avoir avec tu : tu as.'),
            ]),
        ],
        a_toi=[
            q('Ils … petits.', ['sont', 'ont', 'est'], 'Être avec ils : ils sont.'),
            q('J’… froid.', ['ai', 'suis', 'a'], 'Avoir avec je : j’ai.'),
            q('Vous … gentils.', ['êtes', 'avez', 'sont'], 'Être avec vous : vous êtes.'),
        ],
        sources=[ref('FR-C2-CP-CONJ-01', 'Être et avoir au présent')]),

    'FR-C2-CP-VOC-01': dict(duree=5, essentiel=
        'Les mots d’une même famille se ressemblent.\n'
        'Ils parlent de la même chose.\n'
        'jardin, jardiner, jardinier.',
        parties=[
            ('Des familles', [
                vocabulaire(2, 'Famille de mots'),
                {'type': 'observe', 'consigne': 'Chaque ligne est une famille.', 'exemples': [
                    'dent, dentiste, dentifrice', 'fleur, fleurir, fleuriste', 'la danse, danser, le danseur']},
                bq('Quel mot est de la famille de « dent » ?', ['dentiste', 'dans', 'danse'], 'Le dentiste soigne les dents.'),
            ]),
            ('Attention aux faux amis', [
                {'type': 'piege', 'erreur': 'On croit que « lait » et « laid » sont de la même famille.', 'correction': 'Ils se ressemblent, mais leur sens est différent.'},
            ]),
        ],
        a_toi=[
            q('Quel verbe va avec « la danse » ?', ['danser', 'dent', 'dessin'], 'La danse, danser.'),
            q('Quel mot n’est pas de la famille de « fleur » ?', ['flûte', 'fleuriste', 'fleurir'], 'La flûte ne parle pas de fleurs.'),
            q('Le jardinier travaille dans le :', ['jardin', 'garage', 'grenier'], 'Jardin, jardinier.'),
        ],
        sources=[ref('FR-C2-CP-VOC-01', 'Familles de mots')]),

    'FR-C2-CP-LECT-03': dict(duree=5, essentiel=
        'Pour comprendre, je cherche qui, où et quoi.\n'
        'Qui ? Le personnage. Où ? Le lieu.\n'
        'Quoi ? Ce que fait le personnage.',
        parties=[
            ('Qui, où, quoi ?', [
                {'type': 'observe', 'consigne': 'Lis : « Tom joue au ballon dans le jardin. »', 'exemples': [
                    'Qui ? Tom.', 'Où ? Dans le jardin.', 'Quoi ? Il joue au ballon.']},
                bq('« Mila lit un livre dans sa chambre. » Où est Mila ?', ['dans sa chambre', 'dans le jardin', 'à l’école'], 'C’est écrit dans la phrase.'),
            ]),
            ('Méthode', [
                {'type': 'methode', 'titre': 'Pour répondre à une question', 'etapes': [
                    'Lis la phrase.', 'Lis la question.', 'Cherche la réponse dans la phrase.']},
                {'type': 'piege', 'erreur': 'On répond avec une idée à soi.', 'correction': 'La réponse est écrite dans le texte.'},
            ]),
        ],
        a_toi=[
            q('« Le chat dort sur le lit. » Qui dort ?', ['le chat', 'le lit', 'le chien'], 'Le chat est le personnage.'),
            q('« Papa fait une soupe. » Que fait papa ?', ['une soupe', 'un gâteau', 'la sieste'], 'C’est écrit dans la phrase.'),
            q('« Le chien court au parc. » Où court-il ?', ['au parc', 'à la plage', 'au lit'], 'Le lieu : au parc.'),
        ],
        sources=[ref('FR-C2-CP-LECT-03', 'Comprendre un texte lu')]),

    'FR-C2-CP-ECOU-01': dict(duree=4, essentiel=
        'J’écoute jusqu’au bout avant d’agir.\n'
        'Je retiens les mots importants : quoi faire, avec quoi.\n'
        'Si je n’ai pas compris, je demande de répéter.',
        parties=[
            ('Les mots importants', [
                {'type': 'observe', 'consigne': 'Consigne : « Prends ton crayon bleu et entoure le chat. »', 'exemples': [
                    'Quoi faire ? Entourer.', 'Avec quoi ? Le crayon bleu.', 'Quoi entourer ? Le chat.']},
                bq('« Colorie la maison en rouge. » Quelle couleur ?', ['rouge', 'bleu', 'vert'], 'Le mot important : rouge.'),
            ]),
            ('Bien écouter', [
                {'type': 'methode', 'titre': 'Pour bien écouter', 'etapes': [
                    'Regarde la personne qui parle.', 'Écoute jusqu’au bout.', 'Redis la consigne dans ta tête.', 'Puis agis.']},
                {'type': 'piege', 'erreur': 'On commence avant la fin de la consigne.', 'correction': 'Attends la fin : il manque peut-être une information.'},
            ]),
        ],
        a_toi=[
            q('Que fais-tu si tu n’as pas compris ?', ['je demande de répéter', 'je devine', 'je ne fais rien'], 'On a le droit de demander.'),
            q('« Range ton cahier dans ton cartable. » Où ?', ['dans le cartable', 'sur la table', 'dans la trousse'], 'Le lieu : le cartable.'),
            q('Quand faut-il commencer ?', ['à la fin de la consigne', 'au premier mot', 'avant la consigne'], 'On écoute tout d’abord.'),
        ],
        sources=[ref('FR-C2-CP-ECOU-01', 'Comprendre un message entendu')]),

    'FR-C2-CP-VOC-02': dict(duree=5, essentiel=
        'L’alphabet a 26 lettres, de A à Z.\n'
        'Pour ranger des mots, je regarde leur première lettre.\n'
        'bateau vient avant chat, car b vient avant c.',
        parties=[
            ('L’alphabet', [
                {'type': 'observe', 'consigne': 'Dis l’alphabet dans l’ordre.', 'exemples': [
                    'A B C D E F G', 'H I J K L M N', 'O P Q R S T U', 'V W X Y Z']},
                bq('Quelle lettre vient après M ?', ['N', 'L', 'O'], 'L, M, N.'),
            ]),
            ('Ranger des mots', [
                {'type': 'exemple-resolu', 'enonce': 'Range : lion, âne, tigre.', 'etapes': [
                    'âne commence par a.', 'lion commence par l.', 'tigre commence par t.'],
                 'conclusion': 'âne, lion, tigre.'},
                {'type': 'piege', 'erreur': 'On range les mots du plus court au plus long.', 'correction': 'On range selon la première lettre.'},
            ]),
        ],
        a_toi=[
            q('Quel mot vient en premier ?', ['arbre', 'zèbre', 'maison'], 'a vient avant m et z.'),
            q('Quelle lettre vient avant D ?', ['C', 'E', 'B'], 'B, C, D.'),
            q('Range : pomme, cerise, fraise. Le 2e mot est :', ['fraise', 'pomme', 'cerise'], 'cerise, fraise, pomme.'),
        ],
        sources=[ref('FR-C2-CP-VOC-02', 'L’ordre alphabétique')]),

    'FR-C2-CP-VOC-03': dict(duree=4, essentiel=
        'On peut ranger les mots par catégorie.\n'
        'Pomme, poire, banane : ce sont des fruits.\n'
        'Chaise, table, lit : ce sont des meubles.',
        parties=[
            ('Des catégories', [
                {'type': 'tableau', 'titre': 'Ranger les mots', 'colonnes': ['Catégorie', 'Des mots'], 'lignes': [
                    ['fruits', 'pomme, poire'], ['animaux', 'chien, lion'], ['meubles', 'chaise, lit'], ['vêtements', 'pull, jupe']]},
                bq('Le pantalon est :', ['un vêtement', 'un fruit', 'un meuble'], 'On le porte sur soi.'),
            ]),
            ('Trouver l’intrus', [
                {'type': 'piege', 'erreur': 'On range un mot avec ceux qui lui ressemblent à l’écrit.', 'correction': 'On range selon le sens : la poule est un animal.'},
                bq('Quel mot n’est pas un animal ?', ['table', 'chat', 'lapin'], 'La table est un meuble.'),
            ]),
        ],
        a_toi=[
            q('Chaussette, bonnet, robe sont des :', ['vêtements', 'fruits', 'meubles'], 'On les porte.'),
            q('Quel mot est un fruit ?', ['la cerise', 'la chaise', 'la chemise'], 'La cerise se mange.'),
            q('Trouve l’intrus : lion, tigre, armoire.', ['armoire', 'lion', 'tigre'], 'L’armoire est un meuble.'),
        ],
        sources=[ref('FR-C2-CP-VOC-03', 'Catégories de mots')]),

    'FR-C2-CP-DICT-01': dict(duree=4, essentiel=
        'Je dis le mot lentement.\n'
        'J’écris chaque son, dans l’ordre.\n'
        'Je relis : est-ce bien le mot entendu ?',
        parties=[
            ('Son par son', [
                {'type': 'exemple-resolu', 'enonce': 'Écris le mot « moto ».', 'etapes': [
                    'J’entends « m », « o », « t », « o ».', 'J’écris m, o, t, o.'],
                 'conclusion': 'moto'},
            ]),
            ('Syllabe par syllabe', [
                {'type': 'methode', 'titre': 'Pour écrire un mot long', 'etapes': [
                    'Découpe le mot en syllabes : ca-na-pé.', 'Écris chaque syllabe.', 'Relis le mot en entier.']},
                {'type': 'piege', 'erreur': 'On oublie un son du milieu.', 'correction': 'Relis en suivant avec le doigt.'},
                bq('On entend « lu-ne ». Comment s’écrit ce mot ?', ['lune', 'lunne', 'lnue'], 'lu, puis ne.'),
            ]),
        ],
        a_toi=[
            q('Quel mot entends-tu : ra-di-o ?', ['radio', 'rado', 'raido'], 'ra, di, o.'),
            q('Il manque une syllabe : ca … pé. Laquelle ?', ['na', 'pa', 'ca'], 'ca-na-pé.'),
            q('Que fais-tu après avoir écrit ?', ['je relis', 'je cache', 'j’efface tout'], 'Je vérifie chaque son.'),
        ],
        sources=[ref('FR-C2-CP-DICT-01', 'Encoder des mots')]),

    'FR-C2-CP-ECR-01': dict(duree=4, essentiel=
        'Les mots d’une phrase vont dans le bon ordre.\n'
        'Le premier mot prend une majuscule.\n'
        'La phrase finit par un point.',
        parties=[
            ('Remettre en ordre', [
                {'type': 'exemple-resolu', 'enonce': 'Range les mots : dort / chat / le', 'etapes': [
                    'Qui ? le chat.', 'Que fait-il ? Il dort.'],
                 'conclusion': 'Le chat dort.'},
                bq('Range : mange / Léo / une pomme', ['Léo mange une pomme.', 'Une pomme mange Léo.', 'Mange Léo une pomme.'], 'Qui ? Léo. Que fait-il ? Il mange une pomme.'),
            ]),
            ('Majuscule et point', [
                {'type': 'piege', 'erreur': 'On oublie la majuscule du premier mot.', 'correction': 'Au début, « le » devient « Le ».'},
            ]),
        ],
        a_toi=[
            q('Range : saute / la grenouille', ['La grenouille saute.', 'Saute la grenouille.', 'la grenouille saute'], 'Qui saute ? La grenouille.'),
            q('Range : joue / Zoé / au ballon', ['Zoé joue au ballon.', 'Au ballon Zoé joue.', 'Joue Zoé au ballon.'], 'Qui ? Zoé. Que fait-elle ? Elle joue.'),
            q('Le premier mot d’une phrase prend :', ['une majuscule', 'un point', 'un s'], 'Le point va à la fin.'),
        ],
        sources=[ref('FR-C2-CP-ECR-01', 'Composer une phrase')]),

    'FR-C2-CP-LECT-04': dict(duree=5, essentiel=
        'Dans les contes, on retrouve souvent les mêmes personnages.\n'
        'Le loup et l’ogre sont méchants. La fée aide.\n'
        'Le roi et la reine vivent dans un château.',
        parties=[
            ('Les personnages', [
                {'type': 'tableau', 'titre': 'Qui fait quoi ?', 'colonnes': ['Personnage', 'Souvent'], 'lignes': [
                    ['le loup', 'il est rusé et veut manger'], ['la fée', 'elle aide avec sa baguette'],
                    ['la sorcière', 'elle jette des sorts'], ['l’ogre', 'il est grand et fait peur'], ['le roi, la reine', 'ils vivent au château']]},
                bq('Qui a une baguette magique ?', ['la fée', 'le loup', 'l’ogre'], 'La fée aide grâce à la magie.'),
            ]),
            ('Dans quels contes ?', [
                {'type': 'observe', 'consigne': 'Des contes et leurs personnages.', 'exemples': [
                    'Le Petit Chaperon rouge : le loup.', 'Le Petit Poucet : l’ogre.', 'Cendrillon : la fée.']},
                {'type': 'piege', 'erreur': 'On croit que tous les personnages sont gentils.', 'correction': 'Un conte oppose souvent un héros à un méchant.'},
            ]),
        ],
        a_toi=[
            q('Dans quel conte trouve-t-on un ogre ?', ['Le Petit Poucet', 'Cendrillon', 'Boucle d’or'], 'Poucet trompe l’ogre.'),
            q('Où vit souvent le roi ?', ['dans un château', 'dans une grotte', 'dans un terrier'], 'Avec la reine.'),
            q('Le loup du Petit Chaperon rouge est :', ['méchant', 'gentil', 'magique'], 'Il veut manger la fillette.'),
        ],
        sources=[ref('FR-C2-CP-LECT-04', 'Personnages types des contes')]),

    'FR-C2-CP-DICT-02': dict(duree=5, essentiel=
        'J’écoute toute la phrase.\n'
        'J’écris mot après mot, avec un espace entre deux mots.\n'
        'Majuscule au début, point à la fin. Puis je relis.',
        parties=[
            ('La méthode', [
                {'type': 'methode', 'titre': 'Pour écrire une phrase dictée', 'etapes': [
                    'Écoute la phrase en entier.', 'Répète-la dans ta tête.', 'Écris le premier mot avec une majuscule.',
                    'Écris les autres mots, séparés par un espace.', 'Mets le point, puis relis.']},
            ]),
            ('Un exemple', [
                {'type': 'exemple-resolu', 'enonce': 'Dictée : « Le lapin mange. »', 'etapes': [
                    'Le : une majuscule.', 'lapin, mange : je laisse un espace entre les mots.'],
                 'conclusion': 'Le lapin mange.'},
                {'type': 'piege', 'erreur': 'On colle les mots : « lelapin ».', 'correction': 'Laisse un espace entre deux mots.'},
                bq('Combien de mots dans « Il fait beau. » ?', ['3', '2', '9'], 'Il, fait, beau.'),
            ]),
        ],
        a_toi=[
            q('Entre deux mots, je laisse :', ['un espace', 'un point', 'une majuscule'], 'Les mots ne se touchent pas.'),
            q('Quelle phrase est bien écrite ?', ['Le bébé dort.', 'lebébé dort.', 'Le bébé dort'], 'Majuscule, espaces et point.'),
            q('À la fin de la dictée, je :', ['relis', 'déchire', 'recopie tout'], 'Je vérifie chaque mot.'),
        ],
        sources=[ref('FR-C2-CP-DICT-02', 'Écrire sous la dictée')]),
}

ecrire(COURS)
