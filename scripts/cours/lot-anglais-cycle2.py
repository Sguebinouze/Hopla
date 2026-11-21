"""Lot de cours : anglais CP (programme 2026), CE1 et CE2 (programme 2020). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-anglais-cycle2.py
    python3 scripts/cours/pages.py content/cours/LV-C2-*.json

Cycle 2 : phrases de 12 mots au plus (bloquant). Anglais britannique (colour, mum, rubber).
"""
from commun import bq, ecrire, q, source_referentiel as ref


def mots(titre, *paires):
    return {'type': 'tableau', 'titre': titre, 'colonnes': ['Anglais', 'Français'], 'lignes': [list(p) for p in paires]}


COURS = {
    # ----------------------------------------------------------------------- CP
    'LV-C2-CP-SAL-01': dict(duree=4, essentiel=
        '« Hello! » veut dire bonjour.\n'
        '« Goodbye! » veut dire au revoir.\n'
        'Le matin, on peut dire « Good morning! ».',
        parties=[
            ('Dire bonjour', [
                mots('Saluer', ('Hello!', 'Bonjour !'), ('Hi!', 'Salut !'), ('Good morning!', 'Bonjour ! (le matin)'), ('Goodbye! Bye!', 'Au revoir !')),
                bq('Comment dit-on « au revoir » ?', ['Goodbye!', 'Hello!', 'Thank you!'], 'Goodbye, ou Bye.'),
            ]),
            ('En classe', [
                {'type': 'explique', 'texte': 'La maitresse dit « Hello, children! ». Les élèves répondent « Hello! ».'},
                {'type': 'piege', 'erreur': 'On dit « Good morning » le soir.', 'correction': 'Morning, c’est le matin. Le soir, on dit « Hello ».'},
            ]),
        ],
        a_toi=[
            q('« Hello! » veut dire :', ['Bonjour !', 'Merci !', 'Au revoir !'], 'On le dit en arrivant.'),
            q('« Hi! » veut dire :', ['Salut !', 'Pardon !', 'Oui !'], 'C’est familier.'),
            q('Le matin, on peut dire :', ['Good morning!', 'Good night!', 'Goodbye!'], 'Morning : le matin.'),
        ],
        sources=[ref('LV-C2-CP-SAL-01', 'Saluer')]),

    'LV-C2-CP-QUES-01': dict(duree=4, essentiel=
        '« Who? » veut dire qui ?\n'
        '« What? » veut dire quoi ? « Where? » veut dire où ?\n'
        '« Where is the cat? » : où est le chat ?',
        parties=[
            ('Trois mots de question', [
                mots('Questions', ('Who?', 'Qui ?'), ('What?', 'Quoi ? Qu’est-ce que ?'), ('Where?', 'Où ?')),
                bq('« Where is the dog? » veut dire :', ['Où est le chien ?', 'Qui est le chien ?', 'C’est un chien ?'], 'Where : où.'),
            ]),
            ('Écouter la question', [
                {'type': 'observe', 'consigne': 'Des questions.', 'exemples': ['Who is it? : qui est-ce ?', 'What is it? : qu’est-ce que c’est ?', 'Where is Tom? : où est Tom ?']},
                {'type': 'piege', 'erreur': 'On confond « who » et « where ».', 'correction': 'Who : qui. Where : où.'},
            ]),
        ],
        a_toi=[
            q('« Who? » veut dire :', ['Qui ?', 'Où ?', 'Quoi ?'], 'Pour une personne.'),
            q('« What is it? » veut dire :', ['Qu’est-ce que c’est ?', 'Où est-ce ?', 'Qui est-ce ?'], 'What : quoi.'),
            q('Pour demander où est le chat, on dit :', ['Where is the cat?', 'Who is the cat?', 'What is the cat?'], 'Where : où.'),
        ],
        sources=[ref('LV-C2-CP-QUES-01', 'Qui, quoi, où ?')]),

    'LV-C2-CP-GOUT-01': dict(duree=4, essentiel=
        '« I like » veut dire j’aime.\n'
        '« I don’t like » veut dire je n’aime pas.\n'
        '« I like apples. » : j’aime les pommes.',
        parties=[
            ('J’aime', [
                mots('Mes gouts', ('I like apples.', 'J’aime les pommes.'), ('I like cats.', 'J’aime les chats.'), ('I don’t like carrots.', 'Je n’aime pas les carottes.')),
                bq('« I like bananas. » veut dire :', ['J’aime les bananes.', 'Je n’aime pas les bananes.', 'Je mange une banane.'], 'I like : j’aime.'),
            ]),
            ('Je n’aime pas', [
                {'type': 'piege', 'erreur': 'On confond « I like » et « I don’t like ».', 'correction': 'Don’t ajoute la négation : je n’aime pas.'},
            ]),
        ],
        a_toi=[
            q('« I don’t like milk. » veut dire :', ['Je n’aime pas le lait.', 'J’aime le lait.', 'Je bois du lait.'], 'Don’t : la négation.'),
            q('Pour dire « j’aime les chats », on dit :', ['I like cats.', 'I don’t like cats.', 'Where is the cat?'], 'I like.'),
            q('« I like » veut dire :', ['j’aime', 'je veux', 'je vois'], 'Pour ses gouts.'),
        ],
        sources=[ref('LV-C2-CP-GOUT-01', 'J’aime, je n’aime pas')]),

    'LV-C2-CP-HUM-01': dict(duree=4, essentiel=
        '« I’m happy! » veut dire je suis content.\n'
        '« I’m sad. » veut dire je suis triste.\n'
        'On peut aussi être « angry », en colère.',
        parties=[
            ('Les émotions', [
                mots('Comment je me sens', ('happy', 'content'), ('sad', 'triste'), ('angry', 'en colère'), ('surprised', 'surpris')),
                bq('« I’m sad. » veut dire :', ['Je suis triste.', 'Je suis content.', 'Je suis surpris.'], 'Sad : triste.'),
            ]),
            ('Le visage aide', [
                {'type': 'explique', 'texte': 'Regarde le visage : un sourire, c’est happy. Des larmes, c’est sad.'},
                {'type': 'piege', 'erreur': 'On confond « happy » et « angry ».', 'correction': 'Happy : content. Angry : en colère.'},
            ]),
        ],
        a_toi=[
            q('« Happy » veut dire :', ['content', 'triste', 'fatigué'], 'Avec un grand sourire.'),
            q('« Angry » veut dire :', ['en colère', 'content', 'surpris'], 'Les sourcils froncés.'),
            q('Un cadeau inattendu. Tu es :', ['surprised', 'sad', 'angry'], 'Surpris.'),
        ],
        sources=[ref('LV-C2-CP-HUM-01', 'Les émotions')]),

    'LV-C2-CP-NOMB-01': dict(duree=4, essentiel=
        'On compte de 1 à 10 en anglais.\n'
        'One, two, three, four, five.\n'
        'Six, seven, eight, nine, ten.',
        parties=[
            ('De 1 à 10', [
                mots('Les nombres', ('one', '1'), ('two', '2'), ('three', '3'), ('four', '4'), ('five', '5'), ('six', '6'), ('seven', '7'), ('eight', '8'), ('nine', '9'), ('ten', '10')),
                bq('« Three » veut dire :', ['3', '2', '10'], 'One, two, three.'),
            ]),
            ('Une comptine', [
                {'type': 'explique', 'texte': '« One, two, buckle my shoe » aide à retenir les nombres.'},
                {'type': 'piege', 'erreur': 'On confond « two » et « ten ».', 'correction': 'Two : 2. Ten : 10.'},
            ]),
        ],
        a_toi=[
            q('« Five » veut dire :', ['5', '4', '9'], 'One, two, three, four, five.'),
            q('Comment dit-on 8 ?', ['eight', 'six', 'nine'], 'Seven, eight, nine.'),
            q('« Ten » veut dire :', ['10', '2', '7'], 'Le dernier nombre.'),
        ],
        sources=[ref('LV-C2-CP-NOMB-01', 'Les nombres')]),

    'LV-C2-CP-CORPS-01': dict(duree=4, essentiel=
        '« Head » veut dire tête.\n'
        'La comptine « Head, Shoulders, Knees and Toes » nomme les parties du corps.\n'
        'On touche chaque partie en chantant.',
        parties=[
            ('Les parties du corps', [
                mots('Le corps', ('head', 'tête'), ('shoulders', 'épaules'), ('knees', 'genoux'), ('toes', 'orteils'), ('eyes', 'yeux'), ('nose', 'nez')),
                bq('« Knees » veut dire :', ['genoux', 'épaules', 'yeux'], 'On les touche en chantant.'),
            ]),
            ('Chanter et toucher', [
                {'type': 'piege', 'erreur': 'On croit que « toes » veut dire doigts.', 'correction': 'Toes : orteils, les doigts de pied.'},
            ]),
        ],
        a_toi=[
            q('« Head » veut dire :', ['tête', 'main', 'pied'], 'En haut du corps.'),
            q('« Nose » veut dire :', ['nez', 'bouche', 'oreille'], 'Au milieu du visage.'),
            q('« Eyes » veut dire :', ['yeux', 'oreilles', 'genoux'], 'Pour voir.'),
        ],
        sources=[ref('LV-C2-CP-CORPS-01', 'Les parties du corps')]),

    'LV-C2-CP-ACT-01': dict(duree=4, essentiel=
        'Une consigne dit ce qu’il faut faire.\n'
        '« Clap your hands! » : on tape dans ses mains.\n'
        'Dans « Simon says », on obéit seulement si Simon le dit.',
        parties=[
            ('Des consignes', [
                mots('Agir', ('Clap your hands!', 'Tape dans tes mains !'), ('Jump!', 'Saute !'), ('Sit down!', 'Assieds-toi !'), ('Stand up!', 'Lève-toi !')),
                bq('« Jump! » veut dire :', ['Saute !', 'Assieds-toi !', 'Tourne !'], 'On saute.'),
            ]),
            ('Le jeu « Simon says »', [
                {'type': 'explique', 'texte': '« Simon says jump! » : on saute. « Jump! » tout seul : on ne bouge pas.'},
                {'type': 'piege', 'erreur': 'On obéit à toutes les consignes.', 'correction': 'On obéit seulement quand on entend « Simon says ».'},
            ]),
        ],
        a_toi=[
            q('« Sit down! » veut dire :', ['Assieds-toi !', 'Lève-toi !', 'Saute !'], 'Sur ta chaise.'),
            q('« Stand up! » veut dire :', ['Lève-toi !', 'Assieds-toi !', 'Cours !'], 'Debout.'),
            q('« Simon says clap your hands! » Tu :', ['tapes dans tes mains', 'ne bouges pas', 'sautes'], 'Simon l’a dit.'),
        ],
        sources=[ref('LV-C2-CP-ACT-01', 'Comprendre et agir')]),

    'LV-C2-CP-PRES-01': dict(duree=4, essentiel=
        '« I’m six. » veut dire j’ai six ans.\n'
        '« My favourite colour is green. » : ma couleur préférée est le vert.\n'
        '« I like cats. » : j’aime les chats.',
        parties=[
            ('Parler de moi', [
                mots('Me présenter', ('I’m six.', 'J’ai six ans.'), ('My favourite colour is blue.', 'Ma couleur préférée est le bleu.'), ('I like dogs.', 'J’aime les chiens.')),
                bq('« I’m seven. » veut dire :', ['J’ai sept ans.', 'Je suis le septième.', 'J’aime le sept.'], 'On dit son âge.'),
            ]),
            ('L’âge', [
                {'type': 'piege', 'erreur': 'On traduit mot à mot : « I have six ».', 'correction': 'En anglais, on dit « I’m six » : je suis six.'},
            ]),
        ],
        a_toi=[
            q('Pour dire « j’ai six ans », on dit :', ['I’m six.', 'I have six.', 'I like six.'], 'Avec I’m.'),
            q('« My favourite colour is red. » veut dire :', ['Ma couleur préférée est le rouge.', 'J’ai une voiture rouge.', 'Je n’aime pas le rouge.'], 'Favourite : préféré.'),
            q('« Favourite » veut dire :', ['préféré', 'couleur', 'joli'], 'Ce qu’on aime le plus.'),
        ],
        sources=[ref('LV-C2-CP-PRES-01', 'Parler de soi')]),

    'LV-C2-CP-ANIM-01': dict(duree=4, essentiel=
        '« Look! A dog. » : regarde, un chien.\n'
        'Les animaux familiers : a cat, a dog, a fish, a bird.\n'
        'On montre l’animal en disant son nom.',
        parties=[
            ('Les animaux', [
                mots('Animaux familiers', ('a cat', 'un chat'), ('a dog', 'un chien'), ('a fish', 'un poisson'), ('a bird', 'un oiseau'), ('a rabbit', 'un lapin')),
                bq('« A rabbit » veut dire :', ['un lapin', 'un chat', 'un oiseau'], 'Il a de grandes oreilles.'),
            ]),
            ('Regarde !', [
                {'type': 'piege', 'erreur': 'On confond « fish » et « bird ».', 'correction': 'Fish : poisson, dans l’eau. Bird : oiseau, dans le ciel.'},
            ]),
        ],
        a_toi=[
            q('« A cat » veut dire :', ['un chat', 'un chien', 'un poisson'], 'Il miaule.'),
            q('Comment dit-on « un chien » ?', ['a dog', 'a bird', 'a cat'], 'Il aboie.'),
            q('« Look! » veut dire :', ['Regarde !', 'Écoute !', 'Saute !'], 'On montre quelque chose.'),
        ],
        sources=[ref('LV-C2-CP-ANIM-01', 'Les animaux familiers')]),

    'LV-C2-CP-CLAR-01': dict(duree=4, essentiel=
        '« Sorry, I don’t understand. » : pardon, je ne comprends pas.\n'
        '« Can you repeat, please? » : tu peux répéter, s’il te plait ?\n'
        'Demander de répéter est normal quand on apprend.',
        parties=[
            ('Demander de l’aide', [
                mots('Phrases utiles', ('I don’t understand.', 'Je ne comprends pas.'), ('Can you repeat, please?', 'Tu peux répéter, s’il te plait ?'), ('Slowly, please.', 'Lentement, s’il te plait.')),
                bq('Tu ne comprends pas. Tu dis :', ['Sorry, I don’t understand.', 'Hello!', 'I like apples.'], 'Pour demander de l’aide.'),
            ]),
            ('Oser demander', [
                {'type': 'piege', 'erreur': 'On a honte de dire qu’on ne comprend pas.', 'correction': 'Demander, c’est la bonne façon d’apprendre.'},
            ]),
        ],
        a_toi=[
            q('« Please » veut dire :', ['s’il te plait', 'merci', 'pardon'], 'Pour demander poliment.'),
            q('« Can you repeat? » veut dire :', ['Tu peux répéter ?', 'Tu peux venir ?', 'Tu peux chanter ?'], 'Repeat : répéter.'),
            q('« Slowly » veut dire :', ['lentement', 'vite', 'fort'], 'Pour mieux comprendre.'),
        ],
        sources=[ref('LV-C2-CP-CLAR-01', 'Je ne comprends pas')]),

    'LV-C2-CP-COUL-01': dict(duree=4, essentiel=
        'Les couleurs : red, blue, green, yellow.\n'
        'En anglais, la couleur se place avant le nom.\n'
        '« A red apple » : une pomme rouge.',
        parties=[
            ('Les couleurs', [
                mots('Couleurs', ('red', 'rouge'), ('blue', 'bleu'), ('green', 'vert'), ('yellow', 'jaune'), ('black', 'noir'), ('white', 'blanc')),
                bq('« Yellow » veut dire :', ['jaune', 'vert', 'bleu'], 'Comme le soleil.'),
            ]),
            ('Avant le nom', [
                {'type': 'explique', 'texte': '« A yellow sun » : un soleil jaune. La couleur vient avant.'},
                {'type': 'piege', 'erreur': 'On dit « an apple red ».', 'correction': 'La couleur vient avant le nom : a red apple.'},
            ]),
        ],
        a_toi=[
            q('« A blue car » veut dire :', ['une voiture bleue', 'une voiture rouge', 'un ciel bleu'], 'Blue : bleu.'),
            q('Comment dit-on « vert » ?', ['green', 'red', 'white'], 'Comme l’herbe.'),
            q('Quelle phrase est juste ?', ['a black cat', 'a cat black', 'black a cat'], 'La couleur avant le nom.'),
        ],
        sources=[ref('LV-C2-CP-COUL-01', 'Les couleurs')]),

    'LV-C2-CP-FAM-01': dict(duree=4, essentiel=
        '« This is my mum. » : voici ma maman.\n'
        'La famille : mum, dad, brother, sister.\n'
        'On présente sa famille avec « This is my… ».',
        parties=[
            ('Ma famille', [
                mots('La famille', ('mum', 'maman'), ('dad', 'papa'), ('brother', 'frère'), ('sister', 'sœur'), ('grandma', 'mamie'), ('grandpa', 'papi')),
                bq('« This is my sister. » veut dire :', ['Voici ma sœur.', 'Voici mon frère.', 'Voici ma maman.'], 'Sister : sœur.'),
            ]),
            ('Présenter', [
                {'type': 'piege', 'erreur': 'On confond « brother » et « sister ».', 'correction': 'Brother : frère. Sister : sœur.'},
            ]),
        ],
        a_toi=[
            q('« Dad » veut dire :', ['papa', 'maman', 'frère'], 'Le père.'),
            q('Pour présenter ton frère, tu dis :', ['This is my brother.', 'This is my sister.', 'This is my dad.'], 'Brother : frère.'),
            q('« Grandma » veut dire :', ['mamie', 'papi', 'tante'], 'La grand-mère.'),
        ],
        sources=[ref('LV-C2-CP-FAM-01', 'Ma famille')]),

    # ---------------------------------------------------------------------- CE1
    'LV-C2-CE1-ORAL-01': dict(duree=4, essentiel=
        'En classe d’anglais, on entend des consignes.\n'
        '« Stand up! » : lève-toi. « Sit down! » : assieds-toi.\n'
        '« Listen! » : écoute. « Look! » : regarde.',
        parties=[
            ('Les consignes de la classe', [
                mots('Consignes', ('Listen!', 'Écoute !'), ('Look!', 'Regarde !'), ('Open your book!', 'Ouvre ton livre !'), ('Close your book!', 'Ferme ton livre !'), ('Be quiet!', 'Silence !')),
                bq('« Listen! » veut dire :', ['Écoute !', 'Regarde !', 'Écris !'], 'Avec les oreilles.'),
            ]),
            ('Ouvrir, fermer', [
                {'type': 'piege', 'erreur': 'On confond « open » et « close ».', 'correction': 'Open : ouvre. Close : ferme.'},
            ]),
        ],
        a_toi=[
            q('« Close your book! » veut dire :', ['Ferme ton livre !', 'Ouvre ton livre !', 'Lis ton livre !'], 'Close : fermer.'),
            q('« Be quiet! » veut dire :', ['Silence !', 'Chante !', 'Viens !'], 'On ne parle plus.'),
            q('« Look! » veut dire :', ['Regarde !', 'Écoute !', 'Assieds-toi !'], 'Avec les yeux.'),
        ],
        sources=[ref('LV-C2-CE1-ORAL-01', 'Consignes de classe')]),

    'LV-C2-CE1-VOC-01': dict(duree=4, essentiel=
        'On reconnait des mots familiers en anglais.\n'
        'Des couleurs : red, blue. Des nombres : one, two.\n'
        'De la famille : mum, dad. Des animaux : cat, dog.',
        parties=[
            ('Quatre familles de mots', [
                {'type': 'tableau', 'titre': 'Trier les mots', 'colonnes': ['Couleurs', 'Nombres', 'Famille', 'Animaux'], 'lignes': [
                    ['red', 'one', 'mum', 'cat'], ['blue', 'two', 'dad', 'dog'], ['green', 'three', 'sister', 'bird']]},
                bq('« Red » veut dire :', ['rouge', 'lit', 'roue'], 'Une couleur.'),
            ]),
            ('Bien écouter', [
                {'type': 'piege', 'erreur': 'On croit qu’un mot anglais se lit comme en français.', 'correction': 'On écoute d’abord le mot. Sa prononciation est souvent différente.'},
            ]),
        ],
        a_toi=[
            q('« Dog » est :', ['un animal', 'une couleur', 'un nombre'], 'Un chien.'),
            q('« Two » est :', ['un nombre', 'un animal', 'une couleur'], '2.'),
            q('« Mum » fait partie de :', ['la famille', 'des couleurs', 'des animaux'], 'Maman.'),
        ],
        sources=[ref('LV-C2-CE1-VOC-01', 'Premiers mots')]),

    'LV-C2-CE1-CORPS-01': dict(duree=4, essentiel=
        'On suit des consignes qui parlent du corps.\n'
        '« Clap your hands! » : tape dans tes mains.\n'
        '« Touch your nose! » : touche ton nez.',
        parties=[
            ('Gestes et corps', [
                mots('Consignes', ('Clap your hands!', 'Tape dans tes mains !'), ('Touch your nose!', 'Touche ton nez !'), ('Stamp your feet!', 'Tape des pieds !'), ('Turn around!', 'Tourne-toi !')),
                bq('« Touch your head! » veut dire :', ['Touche ta tête !', 'Tourne la tête !', 'Lève la tête !'], 'Touch : touche. Head : tête.'),
            ]),
            ('Plusieurs consignes', [
                {'type': 'explique', 'texte': '« Stand up, clap your hands, sit down! » : trois gestes, dans l’ordre.'},
                {'type': 'piege', 'erreur': 'On confond « hands » et « feet ».', 'correction': 'Hands : mains. Feet : pieds.'},
            ]),
        ],
        a_toi=[
            q('« Stamp your feet! » veut dire :', ['Tape des pieds !', 'Tape dans tes mains !', 'Saute !'], 'Feet : pieds.'),
            q('« Turn around! » veut dire :', ['Tourne-toi !', 'Assieds-toi !', 'Cours !'], 'On fait un tour.'),
            q('« Hands » veut dire :', ['mains', 'pieds', 'genoux'], 'Pour applaudir.'),
        ],
        sources=[ref('LV-C2-CE1-CORPS-01', 'Gestes et corps')]),

    'LV-C2-CE1-CONV-01': dict(duree=4, essentiel=
        '« How are you? » : comment vas-tu ?\n'
        '« I’m fine, thank you. » : je vais bien, merci.\n'
        'Pour partir, on dit « Goodbye! » ou « See you! ».',
        parties=[
            ('Demander des nouvelles', [
                mots('Petite conversation', ('How are you?', 'Comment vas-tu ?'), ('I’m fine, thank you.', 'Je vais bien, merci.'), ('Thank you!', 'Merci !'), ('See you!', 'À bientôt !')),
                bq('« How are you? » veut dire :', ['Comment vas-tu ?', 'Quel âge as-tu ?', 'Où habites-tu ?'], 'On demande des nouvelles.'),
            ]),
            ('Répondre', [
                {'type': 'piege', 'erreur': 'On répond « I’m six » à « How are you? ».', 'correction': 'On dit comment on va : I’m fine.'},
            ]),
        ],
        a_toi=[
            q('« Thank you! » veut dire :', ['Merci !', 'Bonjour !', 'Pardon !'], 'Pour remercier.'),
            q('« I’m fine. » veut dire :', ['Je vais bien.', 'Je suis triste.', 'J’ai faim.'], 'Fine : bien.'),
            q('« See you! » veut dire :', ['À bientôt !', 'Regarde !', 'Bonjour !'], 'Pour partir.'),
        ],
        sources=[ref('LV-C2-CE1-CONV-01', 'Saluer, demander des nouvelles')]),

    'LV-C2-CE1-PRES-01': dict(duree=4, essentiel=
        '« My name is Léa. » : je m’appelle Léa.\n'
        '« I’m eight. » : j’ai huit ans.\n'
        '« I live in Lyon. » : j’habite à Lyon.',
        parties=[
            ('Se présenter', [
                mots('Trois informations', ('My name is Tom.', 'Je m’appelle Tom.'), ('I’m eight.', 'J’ai huit ans.'), ('I live in Paris.', 'J’habite à Paris.')),
                bq('« I live in Nantes. » veut dire :', ['J’habite à Nantes.', 'J’aime Nantes.', 'Je vais à Nantes.'], 'Live : habiter.'),
            ]),
            ('Poser les questions', [
                {'type': 'observe', 'consigne': 'Les questions.', 'exemples': ['What’s your name? : comment t’appelles-tu ?', 'How old are you? : quel âge as-tu ?', 'Where do you live? : où habites-tu ?']},
                {'type': 'piege', 'erreur': 'On répond « I’m Lyon » pour dire où on habite.', 'correction': 'On dit « I live in Lyon ».'},
            ]),
        ],
        a_toi=[
            q('« What’s your name? » veut dire :', ['Comment t’appelles-tu ?', 'Quel âge as-tu ?', 'Où habites-tu ?'], 'Name : nom.'),
            q('« How old are you? » veut dire :', ['Quel âge as-tu ?', 'Comment vas-tu ?', 'Qui es-tu ?'], 'Old : âgé.'),
            q('Pour dire « je m’appelle Sam », on dit :', ['My name is Sam.', 'I live in Sam.', 'I’m Sam years.'], 'My name is…'),
        ],
        sources=[ref('LV-C2-CE1-PRES-01', 'Se présenter')]),

    'LV-C2-CE1-NUM-01': dict(duree=4, essentiel=
        'De 11 à 20, il faut retenir chaque nombre.\n'
        'Eleven, twelve, thirteen, fourteen, fifteen.\n'
        'Sixteen, seventeen, eighteen, nineteen, twenty.',
        parties=[
            ('De 11 à 20', [
                mots('Les nombres', ('eleven', '11'), ('twelve', '12'), ('thirteen', '13'), ('fifteen', '15'), ('eighteen', '18'), ('twenty', '20')),
                bq('« Twelve » veut dire :', ['12', '20', '2'], 'Après eleven.'),
            ]),
            ('La fin en -teen', [
                {'type': 'explique', 'texte': 'De 13 à 19, les nombres finissent par -teen : thirteen, fourteen…'},
                {'type': 'piege', 'erreur': 'On confond « thirteen » et « thirty ».', 'correction': 'Thirteen : 13. Thirty : 30.'},
            ]),
        ],
        a_toi=[
            q('« Fifteen » veut dire :', ['15', '50', '5'], 'Five + teen.'),
            q('Comment dit-on 20 ?', ['twenty', 'twelve', 'two'], 'Twenty.'),
            q('« Nineteen » veut dire :', ['19', '9', '90'], 'Nine + teen.'),
        ],
        sources=[ref('LV-C2-CE1-NUM-01', 'Compter jusqu’à 20')]),

    'LV-C2-CE1-ANIM-01': dict(duree=4, essentiel=
        'Des animaux familiers : a cat, a dog, a bird.\n'
        'D’autres : a fish, a rabbit, a mouse.\n'
        '« I have got a dog. » : j’ai un chien.',
        parties=[
            ('Nommer les animaux', [
                mots('Les animaux', ('a cat', 'un chat'), ('a dog', 'un chien'), ('a mouse', 'une souris'), ('a horse', 'un cheval'), ('a cow', 'une vache')),
                bq('« A horse » veut dire :', ['un cheval', 'une maison', 'une vache'], 'On peut le monter.'),
            ]),
            ('Avoir un animal', [
                {'type': 'explique', 'texte': '« I have got a cat. » : j’ai un chat.'},
                {'type': 'piege', 'erreur': 'On confond « mouse » et « house ».', 'correction': 'Mouse : souris. House : maison.'},
            ]),
        ],
        a_toi=[
            q('« A mouse » veut dire :', ['une souris', 'une maison', 'un oiseau'], 'Elle est petite.'),
            q('« A cow » veut dire :', ['une vache', 'un chat', 'un cochon'], 'Elle donne du lait.'),
            q('« I have got a fish. » veut dire :', ['J’ai un poisson.', 'Je mange un poisson.', 'Je vois un poisson.'], 'Have got : avoir.'),
        ],
        sources=[ref('LV-C2-CE1-ANIM-01', 'Les animaux')]),

    'LV-C2-CE1-VET-01': dict(duree=4, essentiel=
        'Des vêtements : a hat, a coat, a T-shirt.\n'
        'Les chaussures : shoes.\n'
        '« A red hat » : un chapeau rouge.',
        parties=[
            ('Les vêtements', [
                mots('S’habiller', ('a hat', 'un chapeau'), ('a coat', 'un manteau'), ('a T-shirt', 'un tee-shirt'), ('shoes', 'des chaussures'), ('socks', 'des chaussettes')),
                bq('« A coat » veut dire :', ['un manteau', 'un chapeau', 'un chat'], 'Pour l’hiver.'),
            ]),
            ('Avec une couleur', [
                {'type': 'piege', 'erreur': 'On dit « a hat blue ».', 'correction': 'La couleur vient avant : a blue hat.'},
            ]),
        ],
        a_toi=[
            q('« Shoes » veut dire :', ['des chaussures', 'des chaussettes', 'un chapeau'], 'Aux pieds.'),
            q('« A hat » veut dire :', ['un chapeau', 'un chat', 'un manteau'], 'Sur la tête.'),
            q('Comment dit-on « un tee-shirt vert » ?', ['a green T-shirt', 'a T-shirt green', 'green a T-shirt'], 'Couleur avant le nom.'),
        ],
        sources=[ref('LV-C2-CE1-VET-01', 'Les vêtements')]),

    'LV-C2-CE1-SENT-01': dict(duree=4, essentiel=
        '« I’m happy. » : je suis content.\n'
        '« I’m tired. » : je suis fatigué.\n'
        '« I like apples. » : j’aime les pommes.',
        parties=[
            ('Comment je me sens', [
                mots('Mes sentiments', ('I’m happy.', 'Je suis content.'), ('I’m sad.', 'Je suis triste.'), ('I’m tired.', 'Je suis fatigué.'), ('I’m hungry.', 'J’ai faim.')),
                bq('« I’m tired. » veut dire :', ['Je suis fatigué.', 'Je suis content.', 'J’ai faim.'], 'On a envie de dormir.'),
            ]),
            ('Ce que j’aime', [
                {'type': 'piege', 'erreur': 'On traduit « I’m hungry » par « je suis faim ».', 'correction': 'En français, on dit « j’ai faim ».'},
            ]),
        ],
        a_toi=[
            q('« I’m hungry. » veut dire :', ['J’ai faim.', 'Je suis triste.', 'Je suis fatigué.'], 'On veut manger.'),
            q('Pour dire « je suis content », on dit :', ['I’m happy.', 'I’m sad.', 'I’m tired.'], 'Happy : content.'),
            q('« I like bananas. » veut dire :', ['J’aime les bananes.', 'J’ai une banane.', 'Je n’aime pas les bananes.'], 'I like : j’aime.'),
        ],
        sources=[ref('LV-C2-CE1-SENT-01', 'Dire comment on se sent')]),

    'LV-C2-CE1-SOUH-01': dict(duree=4, essentiel=
        '« Can I have a pencil, please? » : je peux avoir un crayon, s’il te plait ?\n'
        '« I want an apple. » : je veux une pomme.\n'
        'On dit « please » pour être poli.',
        parties=[
            ('Demander', [
                mots('Demander poliment', ('Can I have a pencil, please?', 'Je peux avoir un crayon ?'), ('Can I have some water, please?', 'Je peux avoir de l’eau ?'), ('Here you are.', 'Tiens, voilà.')),
                bq('Pour demander une gomme poliment, on dit :', ['Can I have a rubber, please?', 'Rubber!', 'I like rubbers.'], 'Avec please.'),
            ]),
            ('Remercier', [
                {'type': 'explique', 'texte': 'On te donne le crayon : « Here you are. » Tu réponds : « Thank you! »'},
                {'type': 'piege', 'erreur': 'On oublie « please ».', 'correction': 'Please rend la demande polie.'},
            ]),
        ],
        a_toi=[
            q('« Here you are. » veut dire :', ['Tiens, voilà.', 'Tu es ici.', 'Viens ici.'], 'On donne quelque chose.'),
            q('« I want a cake. » veut dire :', ['Je veux un gâteau.', 'J’aime les gâteaux.', 'J’ai un gâteau.'], 'Want : vouloir.'),
            q('Après avoir reçu quelque chose, on dit :', ['Thank you!', 'Please!', 'Hello!'], 'On remercie.'),
        ],
        sources=[ref('LV-C2-CE1-SOUH-01', 'Dire ce que l’on veut')]),

    # ---------------------------------------------------------------------- CE2
    'LV-C2-CE2-PRES-01': dict(duree=4, essentiel=
        '« This is my friend Sam. » : voici mon ami Sam.\n'
        '« He is nine. » : il a neuf ans. Pour une fille, on dit « she ».\n'
        '« She lives in Lille. » : elle habite à Lille.',
        parties=[
            ('Présenter quelqu’un', [
                mots('He et she', ('This is my friend Sam.', 'Voici mon ami Sam.'), ('He is nine.', 'Il a neuf ans.'), ('This is my sister Lou.', 'Voici ma sœur Lou.'), ('She is six.', 'Elle a six ans.')),
                bq('Pour présenter une fille, on dit :', ['She is…', 'He is…', 'I am…'], 'She : elle.'),
            ]),
            ('Le -s de lives', [
                {'type': 'explique', 'texte': 'I live, mais he lives, she lives : on ajoute un s.'},
                {'type': 'piege', 'erreur': 'On dit « he are nine ».', 'correction': 'Avec he ou she, on dit « is » : he is nine.'},
            ]),
        ],
        a_toi=[
            q('« He is ten. » veut dire :', ['Il a dix ans.', 'Elle a dix ans.', 'J’ai dix ans.'], 'He : il.'),
            q('Complète : « She … in Paris. »', ['lives', 'live', 'living'], 'Avec she, on ajoute un s.'),
            q('« This is my friend. » veut dire :', ['Voici mon ami.', 'J’ai un ami.', 'Mon ami est là-bas.'], 'This is : voici.'),
        ],
        sources=[ref('LV-C2-CE2-PRES-01', 'Présenter quelqu’un')]),

    'LV-C2-CE2-QUES-01': dict(duree=4, essentiel=
        '« Where do you live? » : où habites-tu ?\n'
        '« Have you got a brother? » : as-tu un frère ?\n'
        'On répond « Yes, I have » ou « No, I haven’t ».',
        parties=[
            ('Des questions', [
                mots('Questions et réponses', ('Where do you live?', 'Où habites-tu ?'), ('I live in Lyon.', 'J’habite à Lyon.'), ('Have you got a pet?', 'As-tu un animal ?'), ('Yes, I have.', 'Oui.'), ('No, I haven’t.', 'Non.')),
                bq('« Have you got a sister? » veut dire :', ['As-tu une sœur ?', 'Où est ta sœur ?', 'Qui est ta sœur ?'], 'Have you got : as-tu.'),
            ]),
            ('Répondre court', [
                {'type': 'piege', 'erreur': 'On répond seulement « Yes » ou « No ».', 'correction': 'On ajoute : « Yes, I have » ou « No, I haven’t ».'},
            ]),
        ],
        a_toi=[
            q('« Where do you live? » veut dire :', ['Où habites-tu ?', 'Comment vas-tu ?', 'Quel âge as-tu ?'], 'Where : où.'),
            q('Tu as un chien. Tu réponds :', ['Yes, I have.', 'No, I haven’t.', 'I’m a dog.'], 'Oui.'),
            q('« A pet » veut dire :', ['un animal de compagnie', 'un petit', 'un ami'], 'Chat, chien, lapin…'),
        ],
        sources=[ref('LV-C2-CE2-QUES-01', 'Poser des questions')]),

    'LV-C2-CE2-HIST-01': dict(duree=4, essentiel=
        'Pour suivre une histoire, on regarde les images.\n'
        'On repère les mots connus.\n'
        '« The bear is hungry. He eats honey. » : l’ours a faim, il mange du miel.',
        parties=[
            ('Comprendre une histoire', [
                mots('Mots de l’histoire', ('the bear', 'l’ours'), ('hungry', 'affamé'), ('he eats', 'il mange'), ('honey', 'du miel')),
                bq('« The bear is hungry. » veut dire :', ['L’ours a faim.', 'L’ours dort.', 'L’ours est triste.'], 'Hungry : faim.'),
            ]),
            ('Les aides', [
                {'type': 'methode', 'titre': 'Pour suivre une histoire', 'etapes': ['Je regarde les images.', 'J’écoute les mots que je connais.', 'Je devine le reste.']},
                {'type': 'piege', 'erreur': 'On abandonne si on ne comprend pas tous les mots.', 'correction': 'Les mots connus et les images suffisent souvent.'},
            ]),
        ],
        a_toi=[
            q('« He eats » veut dire :', ['il mange', 'il boit', 'il dort'], 'Eat : manger.'),
            q('Pour comprendre une histoire, j’utilise :', ['les images et les mots connus', 'seulement le titre', 'rien'], 'Ce sont des aides.'),
            q('« Honey » veut dire :', ['du miel', 'du lait', 'du pain'], 'Les ours l’adorent.'),
        ],
        sources=[ref('LV-C2-CE2-HIST-01', 'Suivre une histoire')]),

    'LV-C2-CE2-DATE-01': dict(duree=5, essentiel=
        'Les jours de la semaine prennent une majuscule en anglais.\n'
        '« Today is Monday. » : aujourd’hui, c’est lundi.\n'
        '« The third of May » : le trois mai.',
        parties=[
            ('Les jours', [
                mots('La semaine', ('Monday', 'lundi'), ('Tuesday', 'mardi'), ('Wednesday', 'mercredi'), ('Thursday', 'jeudi'), ('Friday', 'vendredi'), ('Saturday', 'samedi'), ('Sunday', 'dimanche')),
                bq('« Friday » veut dire :', ['vendredi', 'samedi', 'lundi'], 'Avant le week-end.'),
            ]),
            ('Les mois', [
                {'type': 'observe', 'consigne': 'Des mois.', 'exemples': ['January : janvier', 'May : mai', 'July : juillet', 'December : décembre']},
                {'type': 'piege', 'erreur': 'On écrit les jours sans majuscule : monday.', 'correction': 'En anglais, jours et mois prennent une majuscule : Monday, May.'},
            ]),
        ],
        a_toi=[
            q('« Sunday » veut dire :', ['dimanche', 'samedi', 'lundi'], 'Le dernier jour de la semaine.'),
            q('Comment dit-on « mercredi » ?', ['Wednesday', 'Thursday', 'Tuesday'], 'Le jour sans école en France.'),
            q('« Today is Tuesday. » veut dire :', ['Aujourd’hui, c’est mardi.', 'Demain, c’est mardi.', 'Hier, c’était mardi.'], 'Today : aujourd’hui.'),
        ],
        sources=[ref('LV-C2-CE2-DATE-01', 'La date')]),

    'LV-C2-CE2-POL-01': dict(duree=4, essentiel=
        '« Sorry! » : pardon.\n'
        '« That’s OK. » : ce n’est pas grave.\n'
        '« Please » et « thank you » rendent une demande polie.',
        parties=[
            ('S’excuser', [
                mots('Politesse', ('Sorry!', 'Pardon !'), ('That’s OK.', 'Ce n’est pas grave.'), ('Excuse me.', 'Excusez-moi.'), ('You’re welcome.', 'De rien.')),
                bq('Tu bouscules quelqu’un. Tu dis :', ['Sorry!', 'Hello!', 'Yes!'], 'Pour s’excuser.'),
            ]),
            ('Répondre', [
                {'type': 'explique', 'texte': '« Thank you! » « You’re welcome. » : merci, de rien.'},
                {'type': 'piege', 'erreur': 'On répond « Thank you » à « Thank you ».', 'correction': 'On répond « You’re welcome » : de rien.'},
            ]),
        ],
        a_toi=[
            q('« You’re welcome. » veut dire :', ['De rien.', 'Bienvenue chez moi.', 'Merci.'], 'Après un merci.'),
            q('« That’s OK. » veut dire :', ['Ce n’est pas grave.', 'C’est fini.', 'C’est l’heure.'], 'On accepte l’excuse.'),
            q('Pour demander pardon à un adulte, on dit :', ['Excuse me.', 'Bye!', 'Look!'], 'Excuse me.'),
        ],
        sources=[ref('LV-C2-CE2-POL-01', 'Politesse et excuses')]),

    'LV-C2-CE2-EPEL-01': dict(duree=5, essentiel=
        'L’alphabet anglais a les mêmes lettres, mais elles se disent autrement.\n'
        'Pour épeler, on dit chaque lettre : « Tom : T-O-M. »\n'
        '« How do you spell it? » : comment ça s’écrit ?',
        parties=[
            ('Des lettres pièges', [
                {'type': 'tableau', 'titre': 'Lettres qui sonnent différemment', 'colonnes': ['Lettre', 'Se dit à peu près'], 'lignes': [
                    ['A', 'éï'], ['E', 'i'], ['I', 'aï'], ['J', 'djéï'], ['G', 'dji'], ['R', 'ar']]},
                bq('La lettre I se dit à peu près :', ['aï', 'i', 'é'], 'Comme dans « I like ».'),
            ]),
            ('Épeler son prénom', [
                {'type': 'explique', 'texte': '« My name is Léa. L-E-A. »'},
                {'type': 'piege', 'erreur': 'On confond les lettres E et I.', 'correction': 'E se dit « i ». I se dit « aï ».'},
            ]),
        ],
        a_toi=[
            q('« How do you spell it? » veut dire :', ['Comment ça s’écrit ?', 'Comment tu vas ?', 'Quel âge as-tu ?'], 'Spell : épeler.'),
            q('La lettre E se dit à peu près :', ['i', 'eu', 'aï'], 'Comme dans « tea ».'),
            q('C-A-T s’écrit :', ['cat', 'kat', 'cate'], 'Un chat.'),
        ],
        sources=[ref('LV-C2-CE2-EPEL-01', 'Épeler')]),

    'LV-C2-CE2-FAM-01': dict(duree=4, essentiel=
        'La maison a des pièces : kitchen, bedroom, bathroom.\n'
        '« My mum is in the kitchen. » : ma maman est dans la cuisine.\n'
        '« In » veut dire dans.',
        parties=[
            ('Les pièces', [
                mots('La maison', ('the kitchen', 'la cuisine'), ('the bedroom', 'la chambre'), ('the bathroom', 'la salle de bain'), ('the living room', 'le salon'), ('the garden', 'le jardin')),
                bq('« The bedroom » veut dire :', ['la chambre', 'la cuisine', 'le salon'], 'Bed : lit.'),
            ]),
            ('Qui est où ?', [
                {'type': 'explique', 'texte': '« My dad is in the garden. » : papa est dans le jardin.'},
                {'type': 'piege', 'erreur': 'On confond « bedroom » et « bathroom ».', 'correction': 'Bedroom : chambre, avec un lit. Bathroom : salle de bain.'},
            ]),
        ],
        a_toi=[
            q('« The kitchen » veut dire :', ['la cuisine', 'le jardin', 'la chambre'], 'On y cuisine.'),
            q('« My sister is in the bathroom. » veut dire :', ['Ma sœur est dans la salle de bain.', 'Ma sœur est dans la chambre.', 'Ma sœur est au jardin.'], 'Bath : bain.'),
            q('« The garden » veut dire :', ['le jardin', 'le garage', 'le salon'], 'Dehors, avec des fleurs.'),
        ],
        sources=[ref('LV-C2-CE2-FAM-01', 'La famille et la maison')]),

    'LV-C2-CE2-METEO-01': dict(duree=4, essentiel=
        '« What’s the weather like? » : quel temps fait-il ?\n'
        '« It’s sunny. » : il fait soleil.\n'
        '« It’s raining. » : il pleut.',
        parties=[
            ('Le temps qu’il fait', [
                mots('La météo', ('It’s sunny.', 'Il fait soleil.'), ('It’s raining.', 'Il pleut.'), ('It’s cold.', 'Il fait froid.'), ('It’s hot.', 'Il fait chaud.'), ('It’s windy.', 'Il y a du vent.')),
                bq('« It’s cold. » veut dire :', ['Il fait froid.', 'Il fait chaud.', 'Il pleut.'], 'On met un manteau.'),
            ]),
            ('Dire « il fait »', [
                {'type': 'piege', 'erreur': 'On traduit « il fait » par « he makes ».', 'correction': 'Pour la météo, on dit « It’s… » : it’s sunny.'},
            ]),
        ],
        a_toi=[
            q('« It’s windy. » veut dire :', ['Il y a du vent.', 'Il neige.', 'Il fait chaud.'], 'Wind : vent.'),
            q('Il pleut. On dit :', ['It’s raining.', 'It’s sunny.', 'It’s hot.'], 'Rain : pluie.'),
            q('« It’s hot. » veut dire :', ['Il fait chaud.', 'Il fait froid.', 'Il pleut.'], 'L’été.'),
        ],
        sources=[ref('LV-C2-CE2-METEO-01', 'La météo')]),

    'LV-C2-CE2-FETE-01': dict(duree=4, essentiel=
        'Les pays anglophones fêtent Halloween, Christmas et Thanksgiving.\n'
        '« Happy Halloween! Trick or treat? » : des bonbons ou un sort ?\n'
        '« Merry Christmas! » : joyeux Noël !',
        parties=[
            ('Des fêtes', [
                {'type': 'tableau', 'titre': 'Fêtes des pays anglophones', 'colonnes': ['Fête', 'Date', 'Formule'], 'lignes': [
                    ['Halloween', '31 octobre', 'Trick or treat?'], ['Christmas', '25 décembre', 'Merry Christmas!'], ['Thanksgiving', 'fin novembre, aux États-Unis', 'Happy Thanksgiving!']]},
                bq('« Merry Christmas! » veut dire :', ['Joyeux Noël !', 'Bonne année !', 'Joyeux anniversaire !'], 'Le 25 décembre.'),
            ]),
            ('Bon anniversaire', [
                {'type': 'explique', 'texte': '« Happy birthday! » : joyeux anniversaire !'},
                {'type': 'piege', 'erreur': 'On croit que Thanksgiving se fête en France.', 'correction': 'C’est une fête des États-Unis et du Canada.'},
            ]),
        ],
        a_toi=[
            q('« Trick or treat? » se dit à :', ['Halloween', 'Noël', 'Pâques'], 'Les enfants demandent des bonbons.'),
            q('« Happy birthday! » veut dire :', ['Joyeux anniversaire !', 'Joyeux Noël !', 'Bonne journée !'], 'Pour un anniversaire.'),
            q('Halloween a lieu le :', ['31 octobre', '25 décembre', '1er janvier'], 'Fin octobre.'),
        ],
        sources=[ref('LV-C2-CE2-FETE-01', 'Fêtes et coutumes')]),

    'LV-C2-CE2-ECOLE-01': dict(duree=4, essentiel=
        'Les objets de la classe : a pencil, a rubber, a ruler.\n'
        'Le cartable : a schoolbag.\n'
        '« Take your ruler! » : prends ta règle !',
        parties=[
            ('Ma trousse', [
                mots('Objets de la classe', ('a pencil', 'un crayon'), ('a pen', 'un stylo'), ('a rubber', 'une gomme'), ('a ruler', 'une règle'), ('a schoolbag', 'un cartable')),
                bq('« A ruler » veut dire :', ['une règle', 'une gomme', 'un crayon'], 'Pour tracer droit.'),
            ]),
            ('Des consignes', [
                {'type': 'explique', 'texte': '« Take your pencil! » : prends ton crayon. « Put it in your schoolbag! » : mets-le dans ton cartable.'},
                {'type': 'piege', 'erreur': 'On confond « pen » et « pencil ».', 'correction': 'Pen : stylo. Pencil : crayon.'},
            ]),
        ],
        a_toi=[
            q('« A rubber » veut dire :', ['une gomme', 'une règle', 'un stylo'], 'Pour effacer.'),
            q('« A schoolbag » veut dire :', ['un cartable', 'une trousse', 'un livre'], 'On y range ses affaires.'),
            q('« A pen » veut dire :', ['un stylo', 'un crayon', 'une gomme'], 'Il écrit à l’encre.'),
        ],
        sources=[ref('LV-C2-CE2-ECOLE-01', 'Les objets de la classe')]),

    'LV-C2-CE2-SPORT-01': dict(duree=4, essentiel=
        '« I play football. » : je joue au football.\n'
        '« I can swim. » : je sais nager.\n'
        '« Can you ride a bike? » : sais-tu faire du vélo ?',
        parties=[
            ('Play et can', [
                mots('Sports', ('I play football.', 'Je joue au football.'), ('I play tennis.', 'Je joue au tennis.'), ('I can swim.', 'Je sais nager.'), ('I can’t skate.', 'Je ne sais pas patiner.')),
                bq('« I can swim. » veut dire :', ['Je sais nager.', 'Je veux nager.', 'J’aime nager.'], 'Can : savoir, pouvoir.'),
            ]),
            ('Can’t', [
                {'type': 'piege', 'erreur': 'On confond « can » et « can’t ».', 'correction': 'Can : je sais. Can’t : je ne sais pas.'},
            ]),
        ],
        a_toi=[
            q('« I play tennis. » veut dire :', ['Je joue au tennis.', 'Je regarde le tennis.', 'Je sais jouer au tennis.'], 'Play : jouer.'),
            q('« I can’t swim. » veut dire :', ['Je ne sais pas nager.', 'Je sais nager.', 'J’aime nager.'], 'Can’t : la négation.'),
            q('« Can you ride a bike? » veut dire :', ['Sais-tu faire du vélo ?', 'As-tu un vélo ?', 'Où est ton vélo ?'], 'Ride a bike : faire du vélo.'),
        ],
        sources=[ref('LV-C2-CE2-SPORT-01', 'Sports et loisirs')]),

    'LV-C2-CE2-JOUR-01': dict(duree=4, essentiel=
        '« I get up. » : je me lève.\n'
        '« I go to school. » : je vais à l’école.\n'
        '« I go to bed. » : je vais au lit.',
        parties=[
            ('Ma journée', [
                mots('Les moments de la journée', ('in the morning', 'le matin'), ('I get up.', 'Je me lève.'), ('I have breakfast.', 'Je prends mon petit déjeuner.'), ('I go to school.', 'Je vais à l’école.'), ('in the evening', 'le soir')),
                bq('« I go to bed. » veut dire :', ['Je vais au lit.', 'Je me lève.', 'Je vais à l’école.'], 'Bed : lit.'),
            ]),
            ('Dans l’ordre', [
                {'type': 'piege', 'erreur': 'On confond « get up » et « go to bed ».', 'correction': 'Get up : se lever, le matin. Go to bed : se coucher, le soir.'},
            ]),
        ],
        a_toi=[
            q('« I get up. » veut dire :', ['Je me lève.', 'Je me couche.', 'Je mange.'], 'Le matin.'),
            q('« Breakfast » veut dire :', ['le petit déjeuner', 'le diner', 'le gouter'], 'Le premier repas.'),
            q('« In the evening » veut dire :', ['le soir', 'le matin', 'à midi'], 'Après l’école.'),
        ],
        sources=[ref('LV-C2-CE2-JOUR-01', 'Ma journée')]),

    'LV-C2-CE2-MAG-01': dict(duree=4, essentiel=
        'Des lieux de la ville : the bakery, the park, the library.\n'
        '« How much is it? » : combien ça coute ?\n'
        '« It’s two pounds. » : ça coute deux livres.',
        parties=[
            ('Les lieux', [
                mots('En ville', ('the bakery', 'la boulangerie'), ('the park', 'le parc'), ('the library', 'la bibliothèque'), ('the supermarket', 'le supermarché'), ('the post office', 'la poste')),
                bq('« The bakery » veut dire :', ['la boulangerie', 'la bibliothèque', 'le parc'], 'On y achète du pain.'),
            ]),
            ('Demander un prix', [
                {'type': 'explique', 'texte': '« How much is the cake? » « It’s three pounds. » : il coute trois livres.'},
                {'type': 'piege', 'erreur': 'On croit que « library » veut dire librairie.', 'correction': 'Library : bibliothèque. Une librairie se dit « bookshop ».'},
            ]),
        ],
        a_toi=[
            q('« How much is it? » veut dire :', ['Combien ça coute ?', 'Où est-ce ?', 'Qu’est-ce que c’est ?'], 'Pour un prix.'),
            q('« The library » veut dire :', ['la bibliothèque', 'la librairie', 'la boulangerie'], 'On y emprunte des livres.'),
            q('« The park » veut dire :', ['le parc', 'la poste', 'le parking'], 'Avec des arbres et des jeux.'),
        ],
        sources=[ref('LV-C2-CE2-MAG-01', 'Au magasin')]),

    'LV-C2-CE2-DRAP-01': dict(duree=4, essentiel=
        'Le drapeau du Royaume-Uni s’appelle l’Union Jack.\n'
        'Au Royaume-Uni, on paie en livres : the pound.\n'
        'Aux États-Unis, on paie en dollars : the dollar.',
        parties=[
            ('Drapeaux', [
                {'type': 'tableau', 'titre': 'Deux pays', 'colonnes': ['Pays', 'Drapeau', 'Monnaie'], 'lignes': [
                    ['Royaume-Uni', 'Union Jack : bleu, blanc, rouge, avec des croix', 'pound'], ['États-Unis', 'Stars and Stripes : étoiles et bandes', 'dollar']]},
                bq('Le drapeau américain a :', ['des étoiles et des bandes', 'une feuille d’érable', 'trois bandes verticales'], 'Stars and Stripes.'),
            ]),
            ('Monnaies', [
                {'type': 'piege', 'erreur': 'On croit qu’on paie en euros à Londres.', 'correction': 'Au Royaume-Uni, on paie en livres sterling.'},
            ]),
        ],
        a_toi=[
            q('Aux États-Unis, on paie en :', ['dollars', 'livres', 'euros'], 'The dollar.'),
            q('Le drapeau du Royaume-Uni s’appelle :', ['l’Union Jack', 'Stars and Stripes', 'le tricolore'], 'Avec des croix.'),
            q('« Pound » veut dire :', ['livre, la monnaie', 'dollar', 'euro'], 'Au Royaume-Uni.'),
        ],
        sources=[ref('LV-C2-CE2-DRAP-01', 'Drapeaux et monnaies')]),

    'LV-C2-CE2-FOOD-01': dict(duree=4, essentiel=
        'Des aliments : bread, milk, an apple, cheese.\n'
        '« I like pizza. » : j’aime la pizza.\n'
        '« I don’t like fish. » : je n’aime pas le poisson.',
        parties=[
            ('La nourriture', [
                mots('Aliments', ('bread', 'du pain'), ('milk', 'du lait'), ('cheese', 'du fromage'), ('an apple', 'une pomme'), ('chicken', 'du poulet')),
                bq('« Cheese » veut dire :', ['du fromage', 'du poulet', 'du pain'], 'On le mange avec du pain.'),
            ]),
            ('Mes gouts', [
                {'type': 'explique', 'texte': '« Do you like milk? » « Yes, I do. » ou « No, I don’t. »'},
                {'type': 'piege', 'erreur': 'On dit « a apple ».', 'correction': 'Devant une voyelle, on dit « an » : an apple.'},
            ]),
        ],
        a_toi=[
            q('« Bread » veut dire :', ['du pain', 'du beurre', 'du lait'], 'À la boulangerie.'),
            q('Quelle forme est juste ?', ['an apple', 'a apple', 'an banana'], 'An devant une voyelle.'),
            q('« Do you like milk? » « Yes, I do. » veut dire :', ['Oui, j’aime le lait.', 'Non, je n’aime pas le lait.', 'J’ai du lait.'], 'Yes : oui.'),
        ],
        sources=[ref('LV-C2-CE2-FOOD-01', 'La nourriture')]),
}

ecrire(COURS)
