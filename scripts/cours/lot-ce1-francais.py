"""Lot de cours : français CE1. Écrit les cours en brouillon (auteur ia).

    python3 scripts/cours/lot-ce1-francais.py

Phrases de 12 mots au plus (cycle 2). Les pages des extraits sont retrouvées ensuite dans les PDF archivés.
"""
from commun import bq, ecrire, q, src, vocabulaire

BO = 'bo41-2024-francais-c2'

COURS = {
    'FR-C2-CE1-GRAM-01': dict(duree=9, essentiel=
        'Dans une phrase, chaque mot a une classe.\n'
        'Le **déterminant** est devant le nom : le, une, des.\n'
        'Le **nom** désigne une personne, un animal ou une chose.\n'
        'L’**adjectif** dit comment est le nom. Le **verbe** dit ce que fait le sujet.\n'
        'Le **pronom** remplace un nom : il, elle, ils, elles.',
        parties=[
            ('Le groupe du nom', [
                {'type': 'observe', 'consigne': 'Lis la phrase : « Le petit chat dort. »', 'exemples': [
                    '« Le » est un déterminant.', '« petit » est un adjectif.', '« chat » est un nom.', '« dort » est un verbe.']},
                vocabulaire(2, 'Déterminant', 'Nom', 'Adjectif'),
                {'type': 'explique', 'texte': 'Un **nom propre** commence par une majuscule. Il désigne une personne ou un lieu précis : Léa, Marseille.'},
                bq('Dans « une robe rouge », quel mot est un adjectif ?', ['rouge', 'une', 'robe'], 'Rouge dit comment est la robe.'),
            ]),
            ('Le verbe et le pronom', [
                vocabulaire(2, 'Verbe', 'Pronom'),
                {'type': 'methode', 'titre': 'Pour trouver le verbe', 'etapes': [
                    'Change le moment : aujourd’hui, hier, demain.',
                    'Le mot qui change est le verbe.',
                    'Exemple : il dort, il dormait, il dormira.']},
                {'type': 'methode', 'titre': 'Pour trouver un nom', 'etapes': [
                    'Cherche un mot qu’on peut mettre après « le », « la » ou « un ».',
                    'Le chat, la table, un ami : ce sont des noms.']},
                {'type': 'piege', 'erreur': 'On croit que « il » est un nom.', 'correction': '« Il » remplace un nom. C’est un pronom.'},
                bq('Dans « Elle chante », quel mot est un pronom ?', ['Elle', 'chante', 'aucun'], 'Elle remplace le nom d’une fille ou d’une femme.'),
            ]),
            ('Trier les mots', [
                {'type': 'tableau', 'titre': 'Les classes de mots', 'colonnes': ['Classe', 'Exemples'], 'lignes': [
                    ['déterminant', 'le, la, un, des, mon, cette'], ['nom commun', 'chat, maison, joie'], ['nom propre', 'Tom, Paris, la Loire'],
                    ['adjectif', 'petit, rouge, joyeux'], ['verbe', 'manger, courir, être'], ['pronom', 'je, tu, il, elle, nous, vous, ils, elles']]},
                bq('Quel mot est un nom propre ?', ['Lyon', 'ville', 'grande'], 'Lyon désigne une ville précise. Il a une majuscule.'),
            ]),
        ],
        a_toi=[
            q('Dans « Le vieux chien aboie », quel mot est le verbe ?', ['aboie', 'chien', 'vieux'], 'Hier, il aboyait : aboie change avec le temps.'),
            q('Dans « mes bottes vertes », quel mot est un déterminant ?', ['mes', 'bottes', 'vertes'], 'Mes est placé devant le nom bottes.'),
            q('Quel mot est un adjectif ?', ['gentil', 'garçon', 'courir'], 'Gentil dit comment est quelqu’un.'),
        ],
        sources=[src(BO, 'Différencier et nommer les principales classes de mots : le', 'Classes de mots au CE1'),
                 src(BO, 'désignent une personne, un lieu en particulier : Astérix,', 'Le nom propre')]),

    'FR-C2-CE1-GRAM-02': dict(duree=7, essentiel=
        'La phrase **déclarative** raconte ou informe. Elle finit par un point.\n'
        'La phrase **interrogative** pose une question. Elle finit par un point d’interrogation.\n'
        'La phrase **impérative** donne un ordre ou un conseil.',
        parties=[
            ('Trois types de phrases', [
                {'type': 'observe', 'consigne': 'Lis ces trois phrases.', 'exemples': [
                    'Le chien court dans le jardin.', 'Le chien court-il dans le jardin ?', 'Cours dans le jardin !']},
                {'type': 'tableau', 'titre': 'Les types de phrases', 'colonnes': ['Type', 'Elle sert à', 'Exemple'], 'lignes': [
                    ['déclarative', 'dire, raconter', 'Il pleut.'], ['interrogative', 'poser une question', 'Pleut-il ?'], ['impérative', 'donner un ordre', 'Ferme la fenêtre.']]},
                bq('« Ferme la porte. » est une phrase :', ['impérative', 'interrogative', 'déclarative'], 'Elle donne un ordre.'),
            ]),
            ('Reconnaitre le type', [
                {'type': 'methode', 'titre': 'Pour trouver le type d’une phrase', 'etapes': [
                    'Regarde le signe à la fin.',
                    'Un point d’interrogation ? Elle est interrogative.',
                    'Un ordre, sans sujet devant le verbe ? Elle est impérative.',
                    'Sinon, elle est déclarative.']},
                {'type': 'piege', 'erreur': 'On croit qu’une phrase impérative finit toujours par un point d’exclamation.', 'correction': 'Elle peut finir par un point : « Range ta chambre. »'},
                {'type': 'explique', 'texte': 'Une phrase peut aussi être **négative** : « Il ne pleut pas. » Les mots ne et pas entourent le verbe.'},
                bq('« Où habites-tu ? » est une phrase :', ['interrogative', 'impérative', 'déclarative'], 'Elle pose une question et finit par un point d’interrogation.'),
            ]),
        ],
        a_toi=[
            q('« Les oiseaux chantent le matin. » est une phrase :', ['déclarative', 'interrogative', 'impérative'], 'Elle donne une information.'),
            q('Quelle phrase est impérative ?', ['Lave-toi les mains.', 'Tu te laves les mains.', 'Te laves-tu les mains ?'], 'Elle donne un ordre, sans sujet devant le verbe.'),
            q('Quelle phrase est négative ?', ['Je ne dors pas.', 'Je dors.', 'Dors-tu ?'], 'Ne et pas entourent le verbe dors.'),
        ],
        sources=[src(BO, 'Reconnaitre et utiliser les trois types de phrases, en lien', 'Types de phrases au CE1')]),

    'FR-C2-CE1-CONJ-01': dict(duree=9, essentiel=
        'Au présent, le verbe change avec le sujet.\n'
        'Être : je suis, tu es, il est.\nNous sommes, vous êtes, ils sont.\n'
        'Avoir : j’ai, tu as, il a.\nNous avons, vous avez, ils ont.\n'
        'Chanter : je chante, tu chantes, il chante.\nNous chantons, vous chantez, ils chantent.',
        parties=[
            ('Être et avoir', [
                {'type': 'observe', 'consigne': 'Le présent dit ce qui se passe maintenant.', 'exemples': [
                    'Aujourd’hui, je suis content.', 'Maintenant, nous avons faim.', 'En ce moment, ils sont à la piscine.']},
                {'type': 'tableau', 'titre': 'Être et avoir au présent', 'colonnes': ['Sujet', 'Être', 'Avoir'], 'lignes': [
                    ['je', 'suis', 'ai'], ['tu', 'es', 'as'], ['il, elle, on', 'est', 'a'], ['nous', 'sommes', 'avons'], ['vous', 'êtes', 'avez'], ['ils, elles', 'sont', 'ont']]},
                bq('Complète : nous … en classe.', ['sommes', 'sont', 'êtes'], 'Avec nous, être fait sommes.'),
            ]),
            ('Les verbes en -er', [
                {'type': 'explique', 'texte': 'Les verbes comme chanter, jouer, parler finissent par **-er**. On garde le radical, on change la terminaison.'},
                {'type': 'tableau', 'titre': 'Chanter au présent', 'colonnes': ['Sujet', 'Verbe', 'Terminaison'], 'lignes': [
                    ['je', 'chante', '-e'], ['tu', 'chantes', '-es'], ['il, elle, on', 'chante', '-e'], ['nous', 'chantons', '-ons'], ['vous', 'chantez', '-ez'], ['ils, elles', 'chantent', '-ent']]},
                {'type': 'methode', 'titre': 'Pour conjuguer un verbe en -er', 'etapes': [
                    'Enlève -er : jouer donne jou-.',
                    'Ajoute la terminaison du sujet : nous jouons.']},
                {'type': 'piege', 'erreur': 'On écrit « tu joue ».', 'correction': 'Avec tu, le verbe prend un s : tu joues.'},
                bq('Complète : vous … au ballon.', ['jouez', 'jouent', 'jouons'], 'Avec vous, la terminaison est -ez.'),
            ]),
        ],
        a_toi=[
            q('Complète : ils … un chat.', ['ont', 'sont', 'avons'], 'Avoir avec ils : ils ont.'),
            q('Complète : tu … une chanson.', ['chantes', 'chante', 'chantent'], 'Avec tu, on ajoute -es.'),
            q('Complète : elles … dans la cour.', ['parlent', 'parles', 'parlez'], 'Avec elles, la terminaison est -ent.'),
        ],
        sources=[src(BO, 'Apprendre à conjuguer au présent, à l’imparfait, au futur', 'Conjuguer être, avoir et les verbes en -er')]),

    'FR-C2-CE1-CONJ-02': dict(duree=7, essentiel=
        'L’**infinitif** est le nom du verbe. On le trouve dans le dictionnaire.\n'
        'Pour le trouver, dis « il faut » devant le verbe.\n'
        'Tu chantes : il faut chanter. L’infinitif est chanter.',
        parties=[
            ('Radical et terminaison', [
                vocabulaire(2, 'Infinitif', 'Radical', 'Terminaison'),
                {'type': 'observe', 'consigne': 'Regarde le verbe plier à plusieurs moments.', 'exemples': [
                    'Ils plieront.', 'Tu as plié.', 'Vous pliez.', 'Le radical pli- ne change pas.']},
                bq('Quel est le radical de « nous dansons » ?', ['dans-', '-ons', 'dansons'], 'Danser : on garde dans- et on change la fin.'),
            ]),
            ('Trouver l’infinitif', [
                {'type': 'methode', 'titre': 'Pour trouver l’infinitif', 'etapes': [
                    'Repère le verbe conjugué : vous pliez.',
                    'Dis « il faut » devant : il faut plier.',
                    'Écris l’infinitif : plier.']},
                {'type': 'exemple-resolu', 'enonce': 'Quel est l’infinitif de « elles regardaient » ?', 'etapes': [
                    'Le radical est regard-.', 'Il faut regarder.'],
                 'conclusion': 'L’infinitif est regarder.'},
                {'type': 'piege', 'erreur': 'On garde la terminaison : l’infinitif de « tu joues » serait joues.', 'correction': 'L’infinitif finit par -er : jouer.'},
            ]),
        ],
        a_toi=[
            q('Quel est l’infinitif de « nous mangeons » ?', ['manger', 'mangeons', 'mange'], 'Il faut manger.'),
            q('Quel est l’infinitif de « tu as sauté » ?', ['sauter', 'avoir', 'sauté'], 'Le verbe qui dit l’action est sauter.'),
            q('Quel est l’infinitif de « ils dessineront » ?', ['dessiner', 'dessineront', 'dessin'], 'Il faut dessiner.'),
        ],
        sources=[src(BO, 'Identifier le radical et la terminaison d’un verbe du', 'Radical et terminaison'),
                 src(BO, 'Exemple : ils plieront, tu as plié, vous pliez, elles plièrent,', 'Exemple du verbe plier')]),

    'FR-C2-CE1-ORTH-01': dict(duree=8, essentiel=
        'Dans le groupe du nom, le déterminant, le nom et l’adjectif s’accordent.\n'
        'Au pluriel, on ajoute souvent un **s** : des chats noirs.\n'
        'Au féminin, on ajoute souvent un **e** : une petite poule.',
        parties=[
            ('Le pluriel', [
                {'type': 'observe', 'consigne': 'Compare.', 'exemples': [
                    'un chat noir', 'des chats noirs', 'Le s ne s’entend pas, mais il s’écrit.']},
                {'type': 'explique', 'texte': 'Le déterminant donne le signal : des, les, mes, trois. Alors le nom et l’adjectif prennent un **s**.'},
                bq('Comment écrit-on « des ballon rouge » ?', ['des ballons rouges', 'des ballons rouge', 'des ballon rouges'], 'Des annonce le pluriel : ballons et rouges prennent un s.'),
            ]),
            ('Le féminin', [
                {'type': 'observe', 'consigne': 'Compare.', 'exemples': [
                    'un petit lapin', 'une petite lapine', 'L’adjectif prend un e.']},
                {'type': 'methode', 'titre': 'Pour accorder le groupe du nom', 'etapes': [
                    'Regarde le déterminant : masculin ou féminin ?',
                    'Singulier ou pluriel ?',
                    'Accorde le nom et l’adjectif.']},
                {'type': 'piege', 'erreur': 'On oublie le e qui ne s’entend pas : une robe bleu.', 'correction': 'La robe est féminine : une robe bleue.'},
                {'type': 'exemple-resolu', 'enonce': 'Je suis bleue. Suis-je la mer ou l’océan ?', 'etapes': [
                    'Bleue a un e : c’est un féminin.', 'On dit la mer, mais un océan.'],
                 'conclusion': 'Je suis la mer.'},
            ]),
        ],
        a_toi=[
            q('Complète : les fleurs …', ['jaunes', 'jaune', 'jaunent'], 'Les fleurs : pluriel, donc jaunes.'),
            q('Complète : une … souris', ['petite', 'petit', 'petits'], 'Une souris : féminin, donc petite.'),
            q('Quel groupe est bien écrit ?', ['des amis gentils', 'des ami gentils', 'des amis gentil'], 'Ami et gentil prennent un s au pluriel.'),
        ],
        sources=[src(BO, 'pluriel en –s, féminin en –e', 'Marques d’accord'),
                 src(BO, 'Il résout des devinettes orthographiques comme Je suis', 'Devinette orthographique')]),

    'FR-C2-CE1-ORTH-02': dict(duree=8, essentiel=
        'Le verbe s’accorde avec son sujet.\n'
        'Sujet au pluriel : le verbe finit souvent par **-nt**.\n'
        'Le chat joue. Les chats jouent.',
        parties=[
            ('Trouver le sujet', [
                vocabulaire(2, 'Sujet'),
                {'type': 'methode', 'titre': 'Pour trouver le sujet', 'etapes': [
                    'Trouve le verbe : jouent.',
                    'Pose la question : qui est-ce qui joue ?',
                    'La réponse est le sujet : les enfants.']},
                bq('Dans « Ma sœur lit un livre », quel est le sujet ?', ['Ma sœur', 'un livre', 'lit'], 'Qui est-ce qui lit ? Ma sœur.'),
            ]),
            ('Accorder le verbe', [
                {'type': 'observe', 'consigne': 'Écoute : le verbe se dit pareil.', 'exemples': [
                    'Un enfant chante.', 'Des enfants chantent.', 'On n’entend pas -nt, mais on l’écrit.']},
                {'type': 'explique', 'texte': 'Deux sujets reliés par **et** font un pluriel. Léa et Tom chantent.'},
                {'type': 'piege', 'erreur': 'On accorde avec le mot voisin : les fleurs du jardin pousse.', 'correction': 'Qui pousse ? Les fleurs. Donc : les fleurs du jardin poussent.'},
                bq('Complète : Lucas et Inès …', ['dansent', 'danse', 'danses'], 'Deux sujets : le verbe prend -nt.'),
            ]),
        ],
        a_toi=[
            q('Complète : les oiseaux …', ['chantent', 'chante', 'chantes'], 'Les oiseaux : pluriel, donc -nt.'),
            q('Complète : le bébé …', ['pleure', 'pleurent', 'pleures'], 'Le bébé : un seul, donc pleure.'),
            q('Quelle phrase est bien écrite ?', ['Les élèves écoutent.', 'Les élèves écoute.', 'Les élève écoutent.'], 'Élèves prend un s, écoutent prend -nt.'),
        ],
        sources=[src(BO, 'verbal (marque de pluriel des verbes = nt).', 'Pluriel des verbes')]),

    'FR-C2-CE1-LECT-01': dict(duree=8, essentiel=
        'Pour comprendre un texte, je cherche qui, où, quand, quoi.\n'
        'Je trouve qui un pronom remplace.\n'
        'Je devine ce que le texte ne dit pas, grâce aux indices.\n'
        'Je vérifie ma réponse en relisant le texte.',
        parties=[
            ('Retrouver une information', [
                {'type': 'observe', 'consigne': 'Lis : « Le lundi, Nina va à la piscine avec sa tante. »', 'exemples': [
                    'Qui ? Nina et sa tante.', 'Où ? À la piscine.', 'Quand ? Le lundi.']},
                bq('Avec qui Nina va-t-elle à la piscine ?', ['avec sa tante', 'avec sa mère', 'toute seule'], 'Le texte dit : « avec sa tante ».'),
            ]),
            ('Qui est « il » ?', [
                {'type': 'observe', 'consigne': 'Lis : « Paul a un chien. Il l’emmène au parc. »', 'exemples': [
                    '« Il » remplace Paul.', '« l’ » remplace le chien.']},
                {'type': 'methode', 'titre': 'Pour savoir qui un pronom remplace', 'etapes': [
                    'Cherche les noms dans la phrase d’avant.',
                    'Remplace le pronom par chaque nom.',
                    'Garde celui qui a du sens.']},
                bq('« Léa appelle son frère. Il arrive vite. » Qui arrive ?', ['le frère', 'Léa', 'on ne sait pas'], 'Il remplace un nom masculin : le frère.'),
            ]),
            ('Deviner ce qui n’est pas écrit', [
                {'type': 'exemple-resolu', 'enonce': '« Tom met son bonnet. Dehors, il neige. » En quelle saison est-on ?', 'etapes': [
                    'Indice 1 : un bonnet.', 'Indice 2 : il neige.'],
                 'conclusion': 'On est en hiver. Le texte ne le dit pas, les indices le montrent.'},
                {'type': 'piege', 'erreur': 'On répond avec ce qu’on imagine, sans indice.', 'correction': 'Chaque réponse s’appuie sur un mot du texte.'},
            ]),
        ],
        a_toi=[
            q('« Sami ouvre son parapluie. » Quel temps fait-il ?', ['Il pleut.', 'Il fait chaud.', 'Il neige.'], 'On ouvre un parapluie quand il pleut.'),
            q('« La maitresse sourit à Tom. Elle l’aide. » Qui aide ?', ['la maitresse', 'Tom', 'personne'], 'Elle remplace la maitresse, qui fait l’action.'),
            q('« Max bâille et ferme les yeux. » Comment est Max ?', ['fatigué', 'en colère', 'affamé'], 'Bâiller et fermer les yeux : Max a sommeil.'),
        ],
        sources=[src(BO, 'Comprendre ce qui est implicite dans le texte (inférences)', 'Inférences'),
                 src(BO, 'Se repérer dans la chaine anaphorique (qui relie un nom à', 'Reprises par un pronom')]),

    'FR-C2-CE1-VOC-01': dict(duree=6, essentiel=
        'Certains mots sont **généraux** : animal, fruit, meuble.\n'
        'D’autres sont **précis** : chien, pomme, chaise.\n'
        'On les range du plus général au plus précis.',
        parties=[
            ('Des boites de mots', [
                {'type': 'observe', 'consigne': 'Ces mots vont dans la même boite.', 'exemples': [
                    'pomme, banane, cerise : des fruits.', 'chaise, table, lit : des meubles.', 'chien, chat, lapin : des animaux.']},
                bq('Quel mot range « tulipe, rose, marguerite » ?', ['fleurs', 'fruits', 'arbres'], 'Ce sont trois sortes de fleurs.'),
            ]),
            ('Du général au précis', [
                {'type': 'tableau', 'titre': 'Du plus général au plus précis', 'colonnes': ['Général', 'Plus précis', 'Très précis'], 'lignes': [
                    ['aliment', 'laitage', 'fromage'], ['animal', 'oiseau', 'moineau'], ['véhicule', 'voiture', 'taxi']]},
                {'type': 'methode', 'titre': 'Pour ranger des mots', 'etapes': [
                    'Cherche le mot qui contient tous les autres.',
                    'Puis celui qui contient le dernier.',
                    'Finis par le mot le plus précis.']},
                {'type': 'piege', 'erreur': 'On met « fruit » dans la boite « pomme ».', 'correction': 'La pomme est un fruit. Le fruit est la grande boite.'},
            ]),
        ],
        a_toi=[
            q('Range du plus général au plus précis.', ['vêtement, chaussure, botte', 'botte, chaussure, vêtement', 'chaussure, vêtement, botte'], 'Une botte est une chaussure, qui est un vêtement.'),
            q('Quel mot est le plus précis ?', ['sardine', 'poisson', 'animal'], 'La sardine est une sorte de poisson.'),
            q('Quel mot ne va pas avec les autres ?', ['carotte', 'fraise', 'prune'], 'La carotte est un légume, les autres sont des fruits.'),
        ],
        sources=[src(BO, 'Percevoir de grandes catégories et hiérarchiser les termes', 'Classer les mots'),
                 src(BO, 'L’élève perçoit le lien entre les mots aliment > laitage >', 'Exemple aliment, laitage, fromage')]),

    'FR-C2-CE1-VOC-02': dict(duree=6, essentiel=
        'On forme un contraire avec **in-** ou **dé-** au début du mot.\n'
        'Visible, invisible. Ranger, déranger.\n'
        'Devant b, m ou p, in- devient im- : possible, impossible.',
        parties=[
            ('Les préfixes in- et dé-', [
                vocabulaire(2, 'Contraire', 'Préfixe'),
                {'type': 'observe', 'consigne': 'Regarde ce qui change.', 'exemples': [
                    'visible → invisible', 'monter → démonter', 'coller → décoller']},
                bq('Quel est le contraire de « faire » ?', ['défaire', 'infaire', 'refaire'], 'Dé- forme le contraire : défaire.'),
            ]),
            ('in- devient im-', [
                {'type': 'explique', 'texte': 'Devant **b**, **m** ou **p**, on écrit **im-** : impossible, immobile, imbuvable.'},
                {'type': 'methode', 'titre': 'Pour former un contraire', 'etapes': [
                    'Essaie in- ou dé- devant le mot.',
                    'Vérifie que le mot existe.',
                    'Devant b, m, p, écris im-.']},
                {'type': 'piege', 'erreur': 'On croit que tous les mots en in- sont des contraires.', 'correction': '« Inviter » n’est pas le contraire de « viter ». Ce mot n’existe pas.'},
                bq('Quel est le contraire de « patient » ?', ['impatient', 'inpatient', 'dépatient'], 'Devant p, on écrit im-.'),
            ]),
        ],
        a_toi=[
            q('Quel est le contraire de « boucher » ?', ['déboucher', 'imboucher', 'reboucher'], 'Dé- forme le contraire : déboucher.'),
            q('Quel est le contraire de « connu » ?', ['inconnu', 'déconnu', 'imconnu'], 'In- forme le contraire : inconnu.'),
            q('Quel est le contraire de « mobile » ?', ['immobile', 'inmobile', 'démobile'], 'Devant m, in- devient im-.'),
        ],
        sources=[src(BO, 'Il identifie des contraires construits avec les préfixes in- ou', 'Contraires avec in- et dé-'),
                 src(BO, 'dé- (visible/invisible, ranger/déranger, monter/démonter)', 'Exemples de contraires')]),

    'FR-C2-CE1-VOC-03': dict(duree=7, essentiel=
        'Un mot peut être formé d’un autre mot.\n'
        'Celui qui chante est un chanteur. Celui qui fait le pain est un boulanger.\n'
        'Un parapluie protège de la pluie.',
        parties=[
            ('Les métiers en -eur et -er', [
                vocabulaire(2, 'Suffixe'),
                {'type': 'tableau', 'titre': 'Qui fait quoi ?', 'colonnes': ['Il ou elle…', 'C’est'], 'lignes': [
                    ['chante', 'un chanteur, une chanteuse'], ['coiffe', 'un coiffeur, une coiffeuse'], ['fait le pain', 'un boulanger, une boulangère'], ['vend la viande', 'un boucher, une bouchère']]},
                bq('Celui qui danse est :', ['un danseur', 'un dansier', 'un dansage'], 'Danser, danseur : on ajoute -eur.'),
            ]),
            ('Les mots en para-, anti-, multi-', [
                {'type': 'tableau', 'titre': 'Trois préfixes', 'colonnes': ['Préfixe', 'Sens', 'Exemple'], 'lignes': [
                    ['para-', 'qui protège de', 'un parapluie'], ['anti-', 'contre', 'un antivol'], ['multi-', 'plusieurs', 'multicolore']]},
                {'type': 'methode', 'titre': 'Pour comprendre un mot nouveau', 'etapes': [
                    'Cherche un mot que tu connais dedans.',
                    'Regarde le début et la fin du mot.',
                    'Devine le sens, puis vérifie dans le dictionnaire.']},
                {'type': 'piege', 'erreur': 'On croit qu’un parasol protège de la pluie.', 'correction': 'Para- veut dire « qui protège de ». Le parasol protège du soleil.'},
                bq('Un ballon multicolore a :', ['plusieurs couleurs', 'une seule couleur', 'aucune couleur'], 'Multi- veut dire plusieurs.'),
            ]),
        ],
        a_toi=[
            q('Celui qui nage est :', ['un nageur', 'un nagier', 'un nageant'], 'Nager, nageur.'),
            q('Un antivol sert :', ['contre le vol', 'à voler', 'à rouler vite'], 'Anti- veut dire contre.'),
            q('Celle qui jardine est :', ['une jardinière', 'une jardineuse', 'une jardinante'], 'Le jardinier, la jardinière.'),
        ],
        sources=[src(BO, 'Il enrichit sa connaissance des principaux affixes', 'Préfixes et suffixes'),
                 src(BO, '(parapluie), multi (multicolore), anti (antivol), etc. eur/euse', 'Exemples d’affixes')]),

    'FR-C2-CE1-VOC-04': dict(duree=6, essentiel=
        'Au **sens propre**, les mots disent exactement ce qui se passe.\n'
        'Au **sens figuré**, ils forment une image.\n'
        '« Avoir une faim de loup » veut dire avoir très faim.',
        parties=[
            ('Deux sens pour une expression', [
                {'type': 'observe', 'consigne': 'Compare.', 'exemples': [
                    'Le loup a faim : sens propre.', 'J’ai une faim de loup : j’ai très faim.']},
                {'type': 'tableau', 'titre': 'Des expressions imagées', 'colonnes': ['Expression', 'Ce qu’elle veut dire'], 'lignes': [
                    ['avoir une peur bleue', 'avoir très peur'], ['prendre ses jambes à son cou', 'partir en courant'], ['donner sa langue au chat', 'renoncer à trouver'], ['avoir la tête dans les nuages', 'être distrait']]},
                bq('« Il pleut des cordes » veut dire :', ['il pleut très fort', 'des cordes tombent du ciel', 'il fait beau'], 'C’est une image : la pluie est forte.'),
            ]),
            ('Comprendre une image', [
                {'type': 'methode', 'titre': 'Pour comprendre une expression', 'etapes': [
                    'Demande-toi si c’est possible pour de vrai.',
                    'Si non, cherche l’image.',
                    'Relis la phrase pour vérifier.']},
                {'type': 'piege', 'erreur': 'On prend l’expression au pied de la lettre.', 'correction': 'Une peur bleue n’a pas de couleur. C’est une grande peur.'},
            ]),
        ],
        a_toi=[
            q('« Être muet comme une carpe » veut dire :', ['ne rien dire', 'être un poisson', 'parler fort'], 'La carpe ne parle pas : on ne dit rien.'),
            q('Quelle phrase est au sens propre ?', ['Le chat boit du lait.', 'J’ai un chat dans la gorge.', 'Il n’y a pas un chat.'], 'Le chat boit vraiment du lait.'),
            q('« Tomber dans les pommes » veut dire :', ['s’évanouir', 'cueillir des pommes', 'trébucher'], 'C’est une expression imagée.'),
        ],
        sources=[src(BO, 'Comprendre la différence entre sens propre/sens figuré.', 'Sens propre et sens figuré'),
                 src(BO, 'Il comprend que le sens de ces expressions n’est pas', 'Expressions imagées')]),

    'FR-C2-CE1-LECT-02': dict(duree=7, essentiel=
        'Ces sons se ressemblent : p/b, t/d, f/v, ch/j, s/z.\n'
        'Une seule lettre change le sens : pain, bain.\n'
        'Main sur la gorge : avec b, d, v, j, z, elle vibre.',
        parties=[
            ('Des sons jumeaux', [
                {'type': 'observe', 'consigne': 'Dis ces mots à voix haute.', 'exemples': [
                    'pain, bain', 'toit, doigt', 'chou, joue']},
                {'type': 'tableau', 'titre': 'Sons proches', 'colonnes': ['Son', 'Son proche', 'Exemples'], 'lignes': [
                    ['p', 'b', 'pain, bain'], ['t', 'd', 'toit, doigt'], ['f', 'v', 'fer, ver'], ['ch', 'j', 'chou, joue'], ['s', 'z', 'poisson, poison']]},
                bq('Quel mot désigne ce qu’on prend pour se laver ?', ['bain', 'pain', 'main'], 'Bain commence par b.'),
            ]),
            ('Bien les distinguer', [
                {'type': 'methode', 'titre': 'Pour ne pas confondre', 'etapes': [
                    'Pose la main sur ta gorge.',
                    'Dis le son lentement.',
                    'Si la gorge vibre, c’est b, d, v, j ou z.']},
                {'type': 'piege', 'erreur': 'On écrit « poisson » pour un produit dangereux.', 'correction': 'Le poison est dangereux, avec un s qui chante z. Le poisson nage.'},
            ]),
        ],
        a_toi=[
            q('Quel mot désigne un animal qui vit dans la terre ?', ['ver', 'fer', 'vert'], 'Le ver de terre. Il commence par v.'),
            q('Quel mot complète : je mange une … de pain ?', ['tranche', 'trange', 'dranche'], 'Une tranche de pain.'),
            q('Quel mot désigne une partie du visage ?', ['joue', 'chou', 'jour'], 'La joue, avec j.'),
        ],
        sources=[src(BO, 'Avoir mémorisé l’ensemble des CGP dans tous les types', 'Sons proches')]),

    'FR-C2-CE1-LECT-03': dict(duree=7, essentiel=
        'Le **conte** commence souvent par « Il était une fois ». Il y a de la magie.\n'
        'La **fable** raconte une histoire d’animaux et donne une leçon.\n'
        'Le **poème** a des vers et souvent des rimes.\n'
        'Le **documentaire** donne des informations vraies.',
        parties=[
            ('Quatre genres de textes', [
                {'type': 'tableau', 'titre': 'Les genres', 'colonnes': ['Genre', 'Comment le reconnaitre'], 'lignes': [
                    ['conte', 'Il était une fois, des fées, des ogres'], ['fable', 'des animaux qui parlent, une leçon à la fin'], ['poème', 'des lignes courtes, des rimes'], ['documentaire', 'des faits vrais, des photos, des titres']]},
                bq('« Il était une fois une princesse… » est le début :', ['d’un conte', 'd’un documentaire', 'd’une recette'], 'Il était une fois : c’est un conte.'),
            ]),
            ('Reconnaitre le genre', [
                {'type': 'methode', 'titre': 'Pour trouver le genre d’un texte', 'etapes': [
                    'Regarde sa forme : lignes courtes, titres, images ?',
                    'Lis le début.',
                    'Demande-toi : c’est vrai ou inventé ?']},
                {'type': 'piege', 'erreur': 'On croit qu’un texte sur des animaux est toujours une fable.', 'correction': 'Un texte vrai sur les loups est un documentaire.'},
                bq('« Le lion vit en Afrique. Il mange de la viande. » C’est :', ['un documentaire', 'un conte', 'une fable'], 'Ce sont des informations vraies.'),
            ]),
        ],
        a_toi=[
            q('Un renard parle, et le texte finit par une leçon. C’est :', ['une fable', 'un documentaire', 'une recette'], 'Animaux qui parlent et leçon : une fable.'),
            q('Un texte avec des rimes, en lignes courtes, est :', ['un poème', 'un conte', 'un documentaire'], 'Les vers et les rimes font le poème.'),
            q('Dans quel texte trouve-t-on des fées et un ogre ?', ['un conte', 'un documentaire', 'une fable'], 'La magie est dans les contes.'),
        ],
        sources=[src(BO, 'Se familiariser aux différents genres et types de textes.', 'Genres de textes'),
                 src(BO, 'L’élève reconnait, lors des lectures orales d’un adulte, les', 'Conte, fable, poème')]),

    'FR-C2-CE1-ECOU-01': dict(duree=6, essentiel=
        'Pour bien écouter, je regarde celui qui parle.\n'
        'Je repère les mots importants et l’ordre des étapes.\n'
        'Les mots d’abord, puis, ensuite, enfin m’aident à retenir l’ordre.',
        parties=[
            ('Repérer l’important', [
                {'type': 'observe', 'consigne': 'Écoute la consigne lue par l’adulte.', 'exemples': [
                    '« D’abord, tu tailles ton crayon. »', '« Puis, tu écris la date. »', '« Enfin, tu soulignes le titre. »']},
                {'type': 'methode', 'titre': 'Pour retenir une consigne', 'etapes': [
                    'Regarde la personne qui parle.',
                    'Compte les étapes sur tes doigts.',
                    'Redis la consigne dans ta tête.']},
                bq('Que faut-il faire en premier ?', ['tailler son crayon', 'écrire la date', 'souligner le titre'], 'D’abord annonce la première étape.'),
            ]),
            ('L’ordre des étapes', [
                {'type': 'explique', 'texte': 'Les mots **d’abord**, **puis**, **ensuite**, **enfin** donnent l’ordre. Écoute-les bien.'},
                {'type': 'piege', 'erreur': 'On commence par la dernière chose entendue.', 'correction': 'Cherche le mot d’abord. Il dit par où commencer.'},
            ]),
        ],
        a_toi=[
            q('« D’abord mets ton manteau, puis prends ton sac. » Que fais-tu en dernier ?', ['prendre son sac', 'mettre son manteau', 'fermer la porte'], 'Puis vient après d’abord.'),
            q('Quel mot annonce la dernière étape ?', ['enfin', 'd’abord', 'puis'], 'Enfin annonce la fin.'),
            q('Pour bien écouter, je :', ['regarde celui qui parle', 'range mon cartable', 'parle à mon voisin'], 'Regarder aide à rester attentif.'),
        ],
        sources=[src(BO, 'Maintenir une attention active pendant quelques minutes', 'Écouter pour comprendre')]),

    'FR-C2-CE1-ECR-01': dict(duree=7, essentiel=
        'Les mots **d’abord**, **puis**, **ensuite**, **enfin** relient les phrases dans l’ordre.\n'
        '**Mais** annonce une opposition. **Car** donne une raison.',
        parties=[
            ('Raconter dans l’ordre', [
                {'type': 'observe', 'consigne': 'Lis ces phrases.', 'exemples': [
                    'D’abord, je mets mes chaussettes.', 'Puis, je mets mes chaussures.', 'Enfin, je fais mes lacets.']},
                {'type': 'explique', 'texte': 'Ces petits mots s’appellent des **connecteurs**. Ils montrent l’ordre des actions.'},
                bq('Quel mot va au début d’un récit ?', ['d’abord', 'enfin', 'ensuite'], 'D’abord ouvre le récit.'),
            ]),
            ('Mais et car', [
                {'type': 'tableau', 'titre': 'Deux connecteurs utiles', 'colonnes': ['Mot', 'Sert à', 'Exemple'], 'lignes': [
                    ['mais', 'opposer', 'Il fait beau, mais il fait froid.'], ['car', 'expliquer', 'Je mets un bonnet car il fait froid.']]},
                {'type': 'methode', 'titre': 'Pour écrire un petit texte', 'etapes': [
                    'Écris tes actions dans l’ordre.',
                    'Commence chaque phrase par un connecteur.',
                    'Relis : l’ordre est-il clair ?']},
                {'type': 'piege', 'erreur': 'On répète « et puis » à chaque phrase.', 'correction': 'Varie : d’abord, puis, ensuite, enfin.'},
                bq('Complète : je reste à la maison … je suis malade.', ['car', 'mais', 'd’abord'], 'Car donne la raison.'),
            ]),
        ],
        a_toi=[
            q('Complète : j’ai couru vite, … j’ai raté le bus.', ['mais', 'car', 'd’abord'], 'Mais montre une opposition.'),
            q('Quel mot annonce la fin ?', ['enfin', 'puis', 'car'], 'Enfin termine le récit.'),
            q('Range : Ensuite… / D’abord… / Enfin…', ['D’abord, ensuite, enfin', 'Enfin, d’abord, ensuite', 'Ensuite, enfin, d’abord'], 'D’abord, puis ensuite, et enfin.'),
        ],
        sources=[src(BO, 'Insérer des connecteurs pour rendre cohérent', 'Connecteurs'),
                 src(BO, 'Il utilise des termes comme d’abord, pour commencer,', 'Exemples de connecteurs')]),

    'FR-C2-CE1-ORTH-03': dict(duree=8, essentiel=
        'Le **c** fait ss devant e, i, y. Ailleurs, il fait k. Le **ç** fait ss devant a, o, u.\n'
        'Le **g** fait j devant e, i, y. Ailleurs, il fait g. Le **ge** fait j devant a, o.\n'
        'Le **s** entre deux voyelles fait z. Pour faire ss, on double le s.',
        parties=[
            ('La lettre c', [
                {'type': 'observe', 'consigne': 'Écoute le c.', 'exemples': [
                    'un cadeau, un cube : k.', 'une cerise, un citron : ss.', 'un garçon, un glaçon : ss avec ç.']},
                {'type': 'explique', 'texte': 'Devant **a**, **o**, **u**, on met une cédille pour entendre ss : ç.'},
                bq('Comment écrit-on le mot ? un ma…on', ['maçon', 'macon', 'masson'], 'Devant o, on écrit ç pour entendre ss.'),
            ]),
            ('La lettre g', [
                {'type': 'observe', 'consigne': 'Écoute le g.', 'exemples': [
                    'un gâteau, une gomme : g.', 'une girafe, un genou : j.', 'un pigeon : ge devant o.']},
                bq('Dans quel mot le g fait-il j ?', ['gilet', 'gare', 'gourde'], 'Devant i, le g fait j.'),
            ]),
            ('La lettre s', [
                {'type': 'tableau', 'titre': 'Le s', 'colonnes': ['Écriture', 'Son', 'Exemple'], 'lignes': [
                    ['s entre deux voyelles', 'z', 'une rose'], ['ss entre deux voyelles', 'ss', 'une tasse'], ['s au début', 'ss', 'le soleil']]},
                {'type': 'piege', 'erreur': 'On écrit « poison » pour l’animal qui nage.', 'correction': 'Pour entendre ss entre deux voyelles, on double le s : poisson.'},
                bq('Comment écrit-on le mot ? une cai…e', ['caisse', 'caise', 'caice'], 'Entre deux voyelles, ss fait ss.'),
            ]),
        ],
        a_toi=[
            q('Dans quel mot le c fait-il ss ?', ['ciel', 'carte', 'col'], 'Devant i, le c fait ss.'),
            q('Comment écrit-on ? nous man…ons', ['mangeons', 'mangons', 'manjons'], 'Pour entendre j devant o, on écrit ge.'),
            q('Dans quel mot le s fait-il z ?', ['maison', 'masse', 'sac'], 'Un s entre deux voyelles fait z.'),
        ],
        sources=[src(BO, 'Classer par analogie et mémoriser les mots les plus', 'Lettres à plusieurs sons'),
                 src(BO, 'variable : s prononcé –ss ou –z, c prononcé –ss ou –k, g', 'Les lettres s, c, g')]),

    'FR-C2-CE1-ORTH-04': dict(duree=6, essentiel=
        'Beaucoup de mots finissent par une lettre muette : on l’écrit sans l’entendre.\n'
        'Pour la trouver, je cherche un mot de la même famille.\n'
        'Blanc, blanche. Chat, chaton. Gros, grossir.',
        parties=[
            ('La lettre qui ne s’entend pas', [
                {'type': 'observe', 'consigne': 'Dis ces mots.', 'exemples': [
                    'un chat : le t ne s’entend pas.', 'un chaton : le t s’entend.']},
                {'type': 'methode', 'titre': 'Pour trouver la lettre muette', 'etapes': [
                    'Cherche un mot de la même famille.',
                    'Écoute la lettre qui s’entend.',
                    'Écris-la à la fin du premier mot.']},
                bq('Quelle est la lettre muette de « gran… » ?', ['d', 't', 's'], 'Grande : on entend le d.'),
            ]),
            ('Des familles pour s’aider', [
                {'type': 'tableau', 'titre': 'Mot de la famille', 'colonnes': ['Mot', 'Mot de la famille', 'Lettre muette'], 'lignes': [
                    ['blanc', 'blanche', 'c'], ['chant', 'chanter', 't'], ['surpris', 'surprise', 's'], ['sang', 'sanguin', 'g']]},
                {'type': 'piege', 'erreur': 'On écrit « un camion » avec un t.', 'correction': 'Certains mots n’ont pas de lettre muette. Vérifie avec la famille.'},
            ]),
        ],
        a_toi=[
            q('Quelle est la lettre muette de « lai… » (boisson) ?', ['t', 's', 'd'], 'Laitier, laitage : on entend le t.'),
            q('Quel mot aide à écrire « gros » ?', ['grossir', 'grand', 'gras'], 'Grossir est de la même famille.'),
            q('Comment écrit-on le contraire de « court » ?', ['long', 'lon', 'lont'], 'Longue : on entend le g.'),
        ],
        sources=[src(BO, 'Être capable d’anticiper une lettre muette finale à l’aide', 'Lettre muette finale'),
                 src(BO, 'chant/chanter, surpris/surprise, etc.', 'Exemples de familles')]),

    'FR-C2-CE1-VOC-05': dict(duree=6, essentiel=
        'Pour éviter une répétition, prends un **synonyme** ou un mot plus général.\n'
        'La voiture, l’automobile, le véhicule.\n'
        'On peut aussi utiliser un pronom : elle.',
        parties=[
            ('Remplacer un mot', [
                vocabulaire(2, 'Synonyme'),
                {'type': 'observe', 'consigne': 'Lis ce texte.', 'exemples': [
                    'Le chien court. Le chien saute. Le chien aboie.', 'Mieux : Le chien court. L’animal saute. Il aboie.']},
                bq('Quel mot remplace « la maison » ?', ['l’habitation', 'la rue', 'le toit'], 'Une maison est une habitation.'),
            ]),
            ('Choisir le bon mot', [
                {'type': 'methode', 'titre': 'Pour éviter une répétition', 'etapes': [
                    'Repère le mot répété.',
                    'Cherche un synonyme, un mot plus général ou un pronom.',
                    'Relis : le sens reste-t-il le même ?']},
                {'type': 'piege', 'erreur': 'On prend un mot qui change le sens : le chien, le chat.', 'correction': 'Le chat est un autre animal. Dis plutôt : l’animal.'},
                {'type': 'tableau', 'titre': 'Des mots pour remplacer', 'colonnes': ['Mot', 'Pour le remplacer'], 'lignes': [
                    ['la voiture', 'l’automobile, le véhicule'], ['le garçon', 'l’enfant, il'], ['dire', 'demander, répondre, expliquer']]},
            ]),
        ],
        a_toi=[
            q('Quel mot remplace « le vélo » ?', ['la bicyclette', 'la moto', 'la roue'], 'Vélo et bicyclette veulent dire la même chose.'),
            q('« La fillette joue. La fillette rit. » Par quoi remplacer le 2e « la fillette » ?', ['Elle', 'Il', 'Le garçon'], 'Elle remplace la fillette.'),
            q('Quel mot est plus général que « tulipe » ?', ['fleur', 'rose', 'jardin'], 'Une tulipe est une fleur.'),
        ],
        sources=[src(BO, 'Mobiliser les mots rencontrés en contexte en fonction des', 'Réemployer le vocabulaire'),
                 src(BO, 'répétitions grâce à l’emploi de synonymes ou de termes', 'Éviter les répétitions')]),

    'FR-C2-CE1-DICT-01': dict(duree=7, essentiel=
        'En dictée, j’écoute toute la phrase avant d’écrire.\n'
        'J’accorde le groupe du nom : des petites sœurs.\n'
        'J’accorde le verbe avec son sujet : elles jouent.\n'
        'Je relis une fois pour chaque accord.',
        parties=[
            ('Avant d’écrire', [
                {'type': 'methode', 'titre': 'Pendant la dictée', 'etapes': [
                    'Écoute toute la phrase.',
                    'Répète-la dans ta tête.',
                    'Écris groupe de mots par groupe de mots.']},
                bq('Que fais-tu en premier ?', ['écouter toute la phrase', 'écrire le premier mot', 'relire'], 'Écouter d’abord aide à comprendre la phrase.'),
            ]),
            ('Relire pour accorder', [
                {'type': 'exemple-resolu', 'enonce': 'Dictée : « Les petites sœurs jouent. »', 'etapes': [
                    'Les annonce un pluriel : petites, sœurs.', 'Sœurs est féminin : petites prend un e.', 'Qui joue ? Les sœurs : jouent.'],
                 'conclusion': 'Les petites sœurs jouent.'},
                {'type': 'methode', 'titre': 'Pour relire', 'etapes': [
                    'Relis le groupe du nom : s, e ?',
                    'Relis le verbe : qui fait l’action ?',
                    'Vérifie les majuscules et les points.']},
                {'type': 'piege', 'erreur': 'On relit tout en une seule fois.', 'correction': 'Relis plusieurs fois, en cherchant une chose à chaque fois.'},
            ]),
        ],
        a_toi=[
            q('Quelle phrase est bien écrite ?', ['Les grands chiens aboient.', 'Les grand chiens aboie.', 'Les grands chien aboient.'], 'Grands, chiens au pluriel ; aboient avec -nt.'),
            q('Quelle phrase est bien écrite ?', ['Mes amies sont gentilles.', 'Mes amie sont gentille.', 'Mes amies est gentilles.'], 'Féminin pluriel : amies, gentilles. Elles sont.'),
            q('Quand je relis, je vérifie :', ['les accords, les majuscules et les points', 'seulement le premier mot', 'la couleur du stylo'], 'On relit pour chaque accord.'),
        ],
        sources=[src(BO, 'Il réalise des dictées en lien avec l’étude de la langue.', 'Dictées au CE1'),
                 src(BO, 'Réaliser des accords en genre et en nombre dans le', 'Accords à réaliser')]),
}

ecrire(COURS)
