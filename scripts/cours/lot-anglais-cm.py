"""Lot de cours : anglais CM1 (programme 2026) et CM2 (programme 2020). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-anglais-cm.py
    python3 scripts/cours/pages.py content/cours/LV-C3-CM*.json

Cycle 3 : phrases de 20 mots au plus (alerte). Anglais britannique.
"""
from commun import bq, ecrire, q, source_referentiel as ref


def mots(titre, *paires):
    return {'type': 'tableau', 'titre': titre, 'colonnes': ['Anglais', 'Français'], 'lignes': [list(p) for p in paires]}


COURS = {
    # ---------------------------------------------------------------------- CM1
    'LV-C3-CM1-INTO-01': dict(duree=5, essentiel=
        'À l’oral, la voix monte à la fin d’une question fermée : « Are you hungry? »\n'
        'Elle descend à la fin d’une affirmation : « You’re hungry. »\n'
        'Une exclamation est dite avec plus de force : « Great! »',
        parties=[
            ('Trois intonations', [
                {'type': 'tableau', 'titre': 'Écouter la voix', 'colonnes': ['Phrase', 'Type', 'Intonation'], 'lignes': [
                    ['You’re hungry.', 'affirmation', 'la voix descend'], ['Are you hungry?', 'question', 'la voix monte'], ['Great!', 'exclamation', 'la voix est forte']]},
                bq('« Is it your bike? » est :', ['une question', 'une affirmation', 'une exclamation'], 'Le verbe est avant le sujet, la voix monte.'),
            ]),
            ('L’ordre des mots', [
                {'type': 'explique', 'texte': 'Dans une question, le verbe passe souvent devant le sujet : « You are » devient « Are you? ».'},
                {'type': 'piege', 'erreur': 'On pose une question en gardant l’ordre de l’affirmation : « You are hungry? »', 'correction': 'À l’écrit, on inverse : « Are you hungry? »'},
            ]),
        ],
        a_toi=[
            q('Dans une question fermée, la voix :', ['monte à la fin', 'descend à la fin', 'reste plate'], 'On attend yes ou no.'),
            q('« She is tired. » est :', ['une affirmation', 'une question', 'une exclamation'], 'Sujet puis verbe.'),
            q('La question de « It is cold. » est :', ['Is it cold?', 'It is cold?', 'Cold it is?'], 'Le verbe passe devant.'),
        ],
        sources=[ref('LV-C3-CM1-INTO-01', 'Question ou affirmation ?')]),

    'LV-C3-CM1-QUES-01': dict(duree=5, essentiel=
        'Les mots interrogatifs anglais commencent souvent par wh- : what, where, when, who, why.\n'
        'How veut dire comment ; how old, quel âge ; how many, combien.\n'
        '« When is your birthday? » : quand est ton anniversaire ?',
        parties=[
            ('Les mots en wh-', [
                mots('Mots interrogatifs', ('What?', 'Quoi ? Quel ?'), ('Where?', 'Où ?'), ('When?', 'Quand ?'), ('Who?', 'Qui ?'), ('Why?', 'Pourquoi ?'), ('How?', 'Comment ?')),
                bq('« Why are you sad? » veut dire :', ['Pourquoi es-tu triste ?', 'Quand es-tu triste ?', 'Qui est triste ?'], 'Why : pourquoi.'),
            ]),
            ('How + un mot', [
                mots('Questions avec how', ('How old are you?', 'Quel âge as-tu ?'), ('How many cats?', 'Combien de chats ?'), ('How much is it?', 'Combien ça coute ?')),
                {'type': 'piege', 'erreur': 'On confond « where » et « when ».', 'correction': 'Where : où, un lieu. When : quand, un moment.'},
            ]),
        ],
        a_toi=[
            q('« When » veut dire :', ['quand', 'où', 'qui'], 'Pour un moment.'),
            q('Pour demander combien de frères, on dit :', ['How many brothers?', 'How old brothers?', 'Who brothers?'], 'How many : combien de.'),
            q('« Who is your teacher? » veut dire :', ['Qui est ton professeur ?', 'Où est ton professeur ?', 'Comment va ton professeur ?'], 'Who : qui.'),
        ],
        sources=[ref('LV-C3-CM1-QUES-01', 'Les mots interrogatifs')]),

    'LV-C3-CM1-PRON-01': dict(duree=5, essentiel=
        'He désigne un garçon ou un homme, she une fille ou une femme, they plusieurs personnes.\n'
        'Les possessifs changent selon le possesseur : my, your, his, her.\n'
        '« This is Tom. His dog is black. » : le chien de Tom est noir.',
        parties=[
            ('Pronoms et possessifs', [
                {'type': 'tableau', 'titre': 'Qui ? À qui ?', 'colonnes': ['Pronom', 'Possessif', 'Exemple'], 'lignes': [
                    ['I', 'my', 'my bike'], ['you', 'your', 'your bag'], ['he', 'his', 'his dog'], ['she', 'her', 'her cat'], ['they', 'their', 'their house']]},
                bq('« This is Léa. … cat is white. »', ['Her', 'His', 'My'], 'Le chat appartient à Léa : her.'),
            ]),
            ('His ou her ?', [
                {'type': 'explique', 'texte': 'En anglais, le possessif dépend du possesseur. « His mother » : la mère d’un garçon. « Her father » : le père d’une fille.'},
                {'type': 'piege', 'erreur': 'On accorde avec l’objet, comme en français : « Tom and her sister ».', 'correction': 'Le possesseur est Tom, un garçon : his sister.'},
            ]),
        ],
        a_toi=[
            q('« Sam and … brother » (Sam est un garçon)', ['his', 'her', 'their'], 'Le possesseur est un garçon.'),
            q('« They » désigne :', ['plusieurs personnes', 'une fille', 'un garçon'], 'Ils ou elles.'),
            q('« Her bike » est le vélo :', ['d’une fille', 'd’un garçon', 'de plusieurs personnes'], 'Her : à elle.'),
        ],
        sources=[ref('LV-C3-CM1-PRON-01', 'De qui parle-t-on ?')]),

    'LV-C3-CM1-GOUT-01': dict(duree=5, essentiel=
        'On exprime ses gouts du plus fort au plus faible : I love, I like, I don’t like, I hate.\n'
        '« My favourite food is pizza. » : mon plat préféré est la pizza.\n'
        '« I love pizza but I hate carrots. » : but relie deux gouts opposés.',
        parties=[
            ('Une échelle', [
                mots('Du plus au moins', ('I love', 'j’adore'), ('I like', 'j’aime'), ('I don’t like', 'je n’aime pas'), ('I hate', 'je déteste')),
                bq('« I hate spiders. » veut dire :', ['Je déteste les araignées.', 'J’adore les araignées.', 'J’ai une araignée.'], 'Hate : détester.'),
            ]),
            ('Favourite', [
                {'type': 'explique', 'texte': '« What’s your favourite colour? » « My favourite colour is purple. »'},
                {'type': 'piege', 'erreur': 'On met favourite après le nom : « my colour favourite ».', 'correction': 'L’adjectif se place avant le nom : my favourite colour.'},
            ]),
        ],
        a_toi=[
            q('« I love chocolate. » veut dire :', ['J’adore le chocolat.', 'Je déteste le chocolat.', 'Je mange du chocolat.'], 'Love : le plus fort.'),
            q('Pour relier deux gouts opposés, on utilise :', ['but', 'and', 'or'], 'But : mais.'),
            q('Quelle phrase est juste ?', ['My favourite sport is tennis.', 'My sport favourite is tennis.', 'Favourite my sport is tennis.'], 'Favourite avant le nom.'),
        ],
        sources=[ref('LV-C3-CM1-GOUT-01', 'Exprimer ses gouts')]),

    'LV-C3-CM1-MODAL-01': dict(duree=6, essentiel=
        'Can exprime la capacité ou l’autorisation : « I can swim. » « Can I go to the toilet, please? »\n'
        'Can’t exprime l’incapacité ou le refus.\n'
        'Must exprime l’obligation, mustn’t l’interdiction : « You mustn’t run in the corridor. »',
        parties=[
            ('Can et can’t', [
                mots('Pouvoir, savoir', ('I can swim.', 'Je sais nager.'), ('I can’t fly.', 'Je ne peux pas voler.'), ('Can I go out?', 'Est-ce que je peux sortir ?'), ('Yes, you can.', 'Oui, tu peux.')),
                bq('« Can I open the window? » veut dire :', ['Est-ce que je peux ouvrir la fenêtre ?', 'Je sais ouvrir la fenêtre.', 'Ouvre la fenêtre !'], 'On demande une autorisation.'),
            ]),
            ('Must et mustn’t', [
                mots('Règles', ('You must wear a helmet.', 'Tu dois porter un casque.'), ('You mustn’t shout.', 'Tu ne dois pas crier.')),
                {'type': 'piege', 'erreur': 'On ajoute un s ou to après can : « She cans to swim ».', 'correction': 'Can ne change jamais et se suit du verbe seul : she can swim.'},
            ]),
        ],
        a_toi=[
            q('« You mustn’t run. » veut dire :', ['Tu ne dois pas courir.', 'Tu dois courir.', 'Tu sais courir.'], 'Mustn’t : interdiction.'),
            q('Quelle phrase est juste ?', ['He can ride a bike.', 'He cans ride a bike.', 'He can to ride a bike.'], 'Can ne change pas.'),
            q('Pour une obligation, on utilise :', ['must', 'can', 'like'], 'Must : devoir.'),
        ],
        sources=[ref('LV-C3-CM1-MODAL-01', 'Pouvoir et devoir')]),

    'LV-C3-CM1-PREP-01': dict(duree=5, essentiel=
        'Les prépositions de lieu disent où se trouve quelque chose : in, on, under, next to, behind.\n'
        '« The cat is under the table. » : le chat est sous la table.\n'
        'Avec les verbes d’action, on les suit : « Put the book on the shelf! »',
        parties=[
            ('Où est le chat ?', [
                mots('Prépositions de lieu', ('in', 'dans'), ('on', 'sur'), ('under', 'sous'), ('next to', 'à côté de'), ('behind', 'derrière'), ('in front of', 'devant')),
                bq('« The ball is behind the door. » veut dire :', ['La balle est derrière la porte.', 'La balle est devant la porte.', 'La balle est sur la porte.'], 'Behind : derrière.'),
            ]),
            ('Agir', [
                {'type': 'explique', 'texte': '« Put your bag under your chair. » : mets ton sac sous ta chaise.'},
                {'type': 'piege', 'erreur': 'On confond in et on.', 'correction': 'In : à l’intérieur. On : posé dessus.'},
            ]),
        ],
        a_toi=[
            q('« The pen is in the box. » Le stylo est :', ['dans la boite', 'sur la boite', 'sous la boite'], 'In : dans.'),
            q('« Next to » veut dire :', ['à côté de', 'derrière', 'sous'], 'Juste à côté.'),
            q('« The cup is on the table. » La tasse est :', ['sur la table', 'sous la table', 'à côté de la table'], 'On : sur.'),
        ],
        sources=[ref('LV-C3-CM1-PREP-01', 'Se repérer dans l’espace')]),

    'LV-C3-CM1-QUOT-01': dict(duree=5, essentiel=
        'On raconte sa journée avec le présent simple : « I get up at seven. »\n'
        '« I go to school by bus. » : je vais à l’école en bus.\n'
        'Les moments : in the morning, in the afternoon, in the evening, at night.',
        parties=[
            ('Ma journée', [
                mots('Activités quotidiennes', ('I get up at seven.', 'Je me lève à sept heures.'), ('I have breakfast.', 'Je prends mon petit déjeuner.'), ('I go to school by bus.', 'Je vais à l’école en bus.'), ('I do my homework.', 'Je fais mes devoirs.'), ('I go to bed at nine.', 'Je me couche à neuf heures.')),
                bq('« I go to school on foot. » veut dire :', ['Je vais à l’école à pied.', 'Je vais à l’école en bus.', 'Je joue au foot à l’école.'], 'On foot : à pied.'),
            ]),
            ('Les moments de la journée', [
                {'type': 'explique', 'texte': 'In the morning : le matin. In the afternoon : l’après-midi. In the evening : le soir. At night : la nuit.'},
                {'type': 'piege', 'erreur': 'On dit « in the night ».', 'correction': 'On dit « at night ».'},
            ]),
        ],
        a_toi=[
            q('« I do my homework in the afternoon. » veut dire :', ['Je fais mes devoirs l’après-midi.', 'Je fais mes devoirs le matin.', 'Je fais mes devoirs la nuit.'], 'Afternoon : après-midi.'),
            q('« By bike » veut dire :', ['à vélo', 'à pied', 'en voiture'], 'Bike : vélo.'),
            q('Quelle expression est juste ?', ['at night', 'in the night', 'on night'], 'At night.'),
        ],
        sources=[ref('LV-C3-CM1-QUOT-01', 'Ma journée')]),

    'LV-C3-CM1-NOMB-01': dict(duree=5, essentiel=
        'Les dizaines finissent par -ty : twenty, thirty, forty, fifty… One hundred, c’est 100.\n'
        'Pour la date, on utilise les nombres ordinaux : first, second, third, twelfth.\n'
        '« My birthday is on the twelfth of March. » : mon anniversaire est le 12 mars.',
        parties=[
            ('Compter jusqu’à 100', [
                mots('Les dizaines', ('twenty', '20'), ('thirty', '30'), ('forty', '40'), ('fifty', '50'), ('sixty-five', '65'), ('one hundred', '100')),
                bq('« Forty-two » veut dire :', ['42', '24', '14'], 'Forty : 40.'),
            ]),
            ('Les dates', [
                mots('Ordinaux', ('first (1st)', 'premier'), ('second (2nd)', 'deuxième'), ('third (3rd)', 'troisième'), ('twelfth (12th)', 'douzième'), ('twentieth (20th)', 'vingtième')),
                {'type': 'piege', 'erreur': 'On confond « fourteen » et « forty ».', 'correction': 'Fourteen : 14. Forty : 40, sans u.'},
            ]),
        ],
        a_toi=[
            q('« Thirty » veut dire :', ['30', '13', '3'], 'Avec -ty.'),
            q('« The first of May » veut dire :', ['le 1er mai', 'le 5 mai', 'le 10 mai'], 'First : premier.'),
            q('Comment dit-on 100 ?', ['one hundred', 'ten', 'one thousand'], 'Hundred : cent.'),
        ],
        sources=[ref('LV-C3-CM1-NOMB-01', 'Nombres et dates')]),

    'LV-C3-CM1-ADJ-01': dict(duree=5, essentiel=
        'Un adjectif décrit une personne, un animal ou un objet : big, small, old, new.\n'
        'Beaucoup d’adjectifs ont un contraire : big et small, fast et slow.\n'
        '« The elephant is big. The mouse is small. »',
        parties=[
            ('Adjectifs et contraires', [
                mots('Contraires', ('big / small', 'grand / petit'), ('old / young', 'vieux / jeune'), ('fast / slow', 'rapide / lent'), ('hot / cold', 'chaud / froid'), ('happy / sad', 'content / triste')),
                bq('Le contraire de « fast » est :', ['slow', 'big', 'old'], 'Fast : rapide.'),
            ]),
            ('Décrire', [
                {'type': 'explique', 'texte': '« The tortoise is slow. The rabbit is fast. » : la tortue est lente, le lapin est rapide.'},
                {'type': 'piege', 'erreur': 'On accorde l’adjectif : « the bigs dogs ».', 'correction': 'En anglais, l’adjectif ne s’accorde pas : the big dogs.'},
            ]),
        ],
        a_toi=[
            q('Le contraire de « old » pour une personne est :', ['young', 'new', 'small'], 'Young : jeune.'),
            q('« The giraffe is tall. » veut dire :', ['La girafe est grande.', 'La girafe est petite.', 'La girafe est rapide.'], 'Tall : grand en hauteur.'),
            q('Quelle forme est juste ?', ['two small cats', 'two smalls cats', 'two cats smalls'], 'L’adjectif est invariable et avant le nom.'),
        ],
        sources=[ref('LV-C3-CM1-ADJ-01', 'Décrire avec des adjectifs')]),

    'LV-C3-CM1-LIRE-01': dict(duree=5, essentiel=
        'Pour lire un message court, on cherche les informations utiles : quoi, quand, où, qui.\n'
        '« Party on Saturday at 3 pm! » : une fête samedi à 15 h.\n'
        'Les mots connus et les nombres aident à comprendre.',
        parties=[
            ('Lire une invitation', [
                {'type': 'exemple-resolu', 'enonce': 'Invitation : « Come to my birthday party! Saturday 10th May, 3 pm, 12 Rose Street. Love, Emma. »', 'etapes': [
                    'Quoi ? Une fête d’anniversaire.', 'Quand ? Samedi 10 mai, à 15 h.', 'Où ? 12 Rose Street.', 'Qui ? Emma.'],
                 'conclusion': 'Emma invite à son anniversaire samedi 10 mai à 15 h.'},
                bq('« pm » après une heure signifie :', ['l’après-midi ou le soir', 'le matin', 'minuit'], '3 pm : 15 h.'),
            ]),
            ('Repérer l’essentiel', [
                {'type': 'piege', 'erreur': 'On cherche à traduire chaque mot.', 'correction': 'On cherche d’abord les réponses à quoi, quand, où et qui.'},
            ]),
        ],
        a_toi=[
            q('« 9 am » correspond à :', ['9 h du matin', '21 h', 'minuit'], 'Am : le matin.'),
            q('Dans une invitation, « Street » indique :', ['une rue', 'une heure', 'un prénom'], 'L’adresse.'),
            q('Pour comprendre un message, on cherche :', ['quoi, quand, où, qui', 'chaque mot', 'seulement le titre'], 'L’information utile.'),
        ],
        sources=[ref('LV-C3-CM1-LIRE-01', 'Lire un message court')]),

    'LV-C3-CM1-RECET-01': dict(duree=5, essentiel=
        'Une recette ou une règle de jeu donne des instructions à l’impératif : « Mix the flour and the eggs. »\n'
        'Les mots first, then, finally indiquent l’ordre.\n'
        '« Bake for 20 minutes. » : faire cuire 20 minutes.',
        parties=[
            ('Des verbes de recette', [
                mots('En cuisine', ('mix', 'mélanger'), ('pour', 'verser'), ('cut', 'couper'), ('add', 'ajouter'), ('bake', 'cuire au four')),
                bq('« Add the sugar. » veut dire :', ['Ajoute le sucre.', 'Mélange le sucre.', 'Coupe le sucre.'], 'Add : ajouter.'),
            ]),
            ('L’ordre', [
                {'type': 'methode', 'titre': 'Pancakes', 'etapes': ['First, mix the flour and the eggs.', 'Then, add the milk.', 'Finally, cook in a pan.']},
                {'type': 'piege', 'erreur': 'On suit les étapes dans le désordre.', 'correction': 'First, then, finally : d’abord, ensuite, enfin.'},
            ]),
        ],
        a_toi=[
            q('« First » veut dire :', ['d’abord', 'enfin', 'ensuite'], 'La première étape.'),
            q('« Cut the apples. » veut dire :', ['Coupe les pommes.', 'Mange les pommes.', 'Lave les pommes.'], 'Cut : couper.'),
            q('« Bake » veut dire :', ['cuire au four', 'mélanger', 'verser'], 'Dans le four.'),
        ],
        sources=[ref('LV-C3-CM1-RECET-01', 'Suivre une recette')]),

    'LV-C3-CM1-EPEL-01': dict(duree=5, essentiel=
        'Pour écrire un mot épelé, on reconnait chaque lettre à l’oral.\n'
        'Certaines lettres sonnent différemment du français : A (éï), E (i), I (aï), G (dji), J (djéï).\n'
        'C-A-T s’écrit cat.',
        parties=[
            ('Des lettres à bien entendre', [
                {'type': 'tableau', 'titre': 'Lettres pièges', 'colonnes': ['Lettre', 'Se dit à peu près'], 'lignes': [
                    ['A', 'éï'], ['E', 'i'], ['I', 'aï'], ['G', 'dji'], ['J', 'djéï'], ['Y', 'ouaï']]},
                bq('On entend « dji-éï-em-i ». Le mot écrit est :', ['GAME', 'JAMI', 'GEMI'], 'G (dji), A (éï), M, E (i).'),
            ]),
            ('Demander d’épeler', [
                {'type': 'explique', 'texte': '« How do you spell your name? » « S-A-M. »'},
                {'type': 'piege', 'erreur': 'On écrit I quand on entend « i ».', 'correction': '« i » correspond à la lettre E. La lettre I se dit « aï ».'},
            ]),
        ],
        a_toi=[
            q('La lettre A se dit à peu près :', ['éï', 'a', 'i'], 'Comme dans « name ».'),
            q('On entend « di-ô-dji ». Le mot est :', ['DOG', 'DAG', 'DIG'], 'D, O, G.'),
            q('« Spell » veut dire :', ['épeler', 'parler', 'écrire vite'], 'Dire les lettres une à une.'),
        ],
        sources=[ref('LV-C3-CM1-EPEL-01', 'Épeler en anglais')]),

    'LV-C3-CM1-CONV-01': dict(duree=5, essentiel=
        'On salue selon le moment : good morning le matin, good afternoon l’après-midi, good evening le soir.\n'
        'On présente quelqu’un : « This is my friend Sam. »\n'
        'On prend congé : « See you tomorrow! », « Goodbye! »',
        parties=[
            ('Commencer', [
                mots('Saluer', ('Good morning!', 'Bonjour ! (matin)'), ('Good afternoon!', 'Bonjour ! (après-midi)'), ('Good evening!', 'Bonsoir !'), ('Nice to meet you.', 'Enchanté.')),
                bq('À 16 h, on dit plutôt :', ['Good afternoon!', 'Good morning!', 'Good night!'], 'L’après-midi.'),
            ]),
            ('Finir', [
                {'type': 'explique', 'texte': '« Good night! » se dit avant d’aller dormir, pas pour saluer quand on arrive le soir.'},
                {'type': 'piege', 'erreur': 'On dit « Good night » quand on arrive le soir.', 'correction': 'Quand on arrive, on dit « Good evening ». « Good night » sert à se quitter pour dormir.'},
            ]),
        ],
        a_toi=[
            q('« Nice to meet you. » veut dire :', ['Enchanté.', 'À demain.', 'Bonne nuit.'], 'Quand on rencontre quelqu’un.'),
            q('« See you tomorrow! » veut dire :', ['À demain !', 'À ce soir !', 'Bonjour !'], 'Tomorrow : demain.'),
            q('Pour présenter ta sœur, tu dis :', ['This is my sister.', 'I am my sister.', 'She my sister.'], 'This is…'),
        ],
        sources=[ref('LV-C3-CM1-CONV-01', 'Commencer et finir une conversation')]),

    'LV-C3-CM1-SOUH-01': dict(duree=5, essentiel=
        '« I would like » exprime un souhait poliment : « I would like an orange juice, please. »\n'
        'On l’écrit souvent I’d like.\n'
        'Pour proposer : « Would you like a biscuit? » On répond « Yes, please » ou « No, thank you ».',
        parties=[
            ('Souhaiter', [
                mots('Être poli', ('I’d like a sandwich, please.', 'Je voudrais un sandwich, s’il vous plait.'), ('Would you like some water?', 'Voudrais-tu de l’eau ?'), ('Yes, please.', 'Oui, s’il te plait.'), ('No, thank you.', 'Non, merci.')),
                bq('« Would you like a cake? » veut dire :', ['Voudrais-tu un gâteau ?', 'Aimes-tu les gâteaux ?', 'As-tu un gâteau ?'], 'Une proposition polie.'),
            ]),
            ('Like ou would like ?', [
                {'type': 'piege', 'erreur': 'On confond « I like » et « I would like ».', 'correction': 'I like : j’aime, en général. I would like : je voudrais, maintenant.'},
            ]),
        ],
        a_toi=[
            q('Au café, pour commander poliment, on dit :', ['I’d like a hot chocolate, please.', 'I like hot chocolate.', 'Hot chocolate!'], 'I would like.'),
            q('On refuse poliment avec :', ['No, thank you.', 'No!', 'I hate it.'], 'Avec merci.'),
            q('« I’d like » est l’abréviation de :', ['I would like', 'I did like', 'I do like'], 'Je voudrais.'),
        ],
        sources=[ref('LV-C3-CM1-SOUH-01', 'Exprimer un souhait')]),

    'LV-C3-CM1-CULT-01': dict(duree=5, essentiel=
        'Les pays anglophones ont des habitudes différentes des nôtres.\n'
        'Au Royaume-Uni, les voitures roulent à gauche, et les élèves portent souvent un uniforme.\n'
        'Le petit déjeuner anglais traditionnel est salé : œufs, bacon, haricots.',
        parties=[
            ('Similitudes et différences', [
                {'type': 'tableau', 'titre': 'France et Royaume-Uni', 'colonnes': ['Domaine', 'France', 'Royaume-Uni'], 'lignes': [
                    ['circulation', 'à droite', 'à gauche'], ['école', 'pas d’uniforme en général', 'uniforme souvent obligatoire'], ['monnaie', 'euro', 'livre sterling'], ['petit déjeuner traditionnel', 'sucré', 'salé']]},
                bq('Au Royaume-Uni, les voitures roulent :', ['à gauche', 'à droite', 'au milieu'], 'Attention en traversant !'),
            ]),
            ('Comparer sans juger', [
                {'type': 'piege', 'erreur': 'On pense qu’une habitude différente est bizarre ou fausse.', 'correction': 'Elle est différente, pas meilleure ni moins bonne.'},
            ]),
        ],
        a_toi=[
            q('Un « school uniform » est :', ['un uniforme scolaire', 'un cartable', 'un emploi du temps'], 'Les mêmes vêtements pour tous.'),
            q('Au Royaume-Uni, on paie en :', ['livres sterling', 'euros', 'dollars'], 'The pound.'),
            q('Comparer deux cultures, c’est :', ['repérer ce qui est pareil et différent', 'dire laquelle est la meilleure', 'se moquer'], 'Sans juger.'),
        ],
        sources=[ref('LV-C3-CM1-CULT-01', 'Repères culturels')]),

    # ---------------------------------------------------------------------- CM2
    'LV-C3-CM2-MSG-01': dict(duree=5, essentiel=
        'Pour comprendre une annonce, on cherche l’information essentielle : où, quand, quoi.\n'
        '« The train to London leaves at ten o’clock from platform two. »\n'
        'Le train pour Londres part à 10 h, voie 2.',
        parties=[
            ('Repérer l’essentiel', [
                {'type': 'exemple-resolu', 'enonce': 'Annonce : « The bus to Oxford leaves at half past nine from stop B. »', 'etapes': [
                    'Destination : Oxford.', 'Heure : half past nine, 9 h 30.', 'Lieu : arrêt B.'],
                 'conclusion': 'Le bus pour Oxford part à 9 h 30 de l’arrêt B.'},
                bq('« Half past nine » veut dire :', ['9 h 30', '9 h 15', '8 h 30'], 'Half : la moitié de l’heure.'),
            ]),
            ('L’heure', [
                mots('Dire l’heure', ('ten o’clock', '10 h'), ('quarter past ten', '10 h 15'), ('half past ten', '10 h 30'), ('quarter to eleven', '10 h 45')),
                {'type': 'piege', 'erreur': 'On lit « quarter to eleven » comme 11 h 15.', 'correction': 'To : moins. Onze heures moins le quart, soit 10 h 45.'},
            ]),
        ],
        a_toi=[
            q('« Platform » désigne :', ['un quai, une voie', 'un billet', 'un horaire'], 'Dans une gare.'),
            q('« Quarter past three » veut dire :', ['3 h 15', '2 h 45', '3 h 30'], 'Past : après.'),
            q('« The train leaves at six o’clock. » Le train part à :', ['6 h', '16 h 30', '7 h'], 'O’clock : heure pile.'),
        ],
        sources=[ref('LV-C3-CM2-MSG-01', 'Comprendre une annonce')]),

    'LV-C3-CM2-ANN-01': dict(duree=5, essentiel=
        'Pour inviter, on dit quoi, quand et où : « Come to my birthday party on Saturday at three o’clock! »\n'
        'On situe dans le temps avec on (jour) et at (heure), dans l’espace avec at ou in.\n'
        'On ajoute une formule pour répondre : « Please reply by Friday. »',
        parties=[
            ('Écrire une invitation', [
                {'type': 'methode', 'titre': 'Une invitation', 'etapes': ['What? Come to my party!', 'When? On Saturday at three o’clock.', 'Where? At my house, 5 Park Road.', 'Please reply by Friday.']},
                bq('« On Sunday at 2 pm » indique :', ['le jour et l’heure', 'le lieu', 'le prénom'], 'On : jour ; at : heure.'),
            ]),
            ('Faire une annonce', [
                {'type': 'explique', 'texte': '« Attention please! The school show is on Friday at six in the gym. »'},
                {'type': 'piege', 'erreur': 'On oublie de préciser l’heure ou le lieu.', 'correction': 'Une invitation complète répond à quoi, quand et où.'},
            ]),
        ],
        a_toi=[
            q('« Please reply » veut dire :', ['Merci de répondre', 'Merci de venir', 'Merci d’apporter un cadeau'], 'Reply : répondre.'),
            q('« The show is in the gym. » Le spectacle a lieu :', ['dans le gymnase', 'dans le jardin', 'à la gare'], 'Gym : gymnase.'),
            q('Quelle forme est juste ?', ['on Saturday', 'at Saturday', 'in Saturday'], 'On avec un jour.'),
        ],
        sources=[ref('LV-C3-CM2-ANN-01', 'Annoncer, inviter')]),

    'LV-C3-CM2-REN-01': dict(duree=5, essentiel=
        'Pour demander un prix : « How much is the T-shirt? » « It’s ten pounds. »\n'
        'Pour une quantité : « How many apples do you want? » « Four, please. »\n'
        'Pour un horaire : « What time does the shop open? »',
        parties=[
            ('Au magasin', [
                mots('Dialogue', ('Can I help you?', 'Je peux vous aider ?'), ('How much is it?', 'Combien ça coute ?'), ('It’s five pounds.', 'Ça coute cinq livres.'), ('Here you are.', 'Voilà.'), ('Thank you, goodbye!', 'Merci, au revoir !')),
                bq('« How much are the shoes? » veut dire :', ['Combien coutent les chaussures ?', 'Combien de chaussures ?', 'Où sont les chaussures ?'], 'How much : combien, pour un prix.'),
            ]),
            ('Much ou many ?', [
                {'type': 'explique', 'texte': 'How many + objets qu’on compte : how many apples. How much pour un prix ou une quantité non comptable.'},
                {'type': 'piege', 'erreur': 'On dit « How many is it? » pour un prix.', 'correction': 'Pour un prix : How much is it?'},
            ]),
        ],
        a_toi=[
            q('« What time does the museum open? » veut dire :', ['À quelle heure ouvre le musée ?', 'Combien coute le musée ?', 'Où est le musée ?'], 'What time : à quelle heure.'),
            q('« Can I help you? » est dit par :', ['le vendeur', 'le client', 'le chauffeur de bus'], 'Il propose son aide.'),
            q('Pour demander combien de bananes, on dit :', ['How many bananas?', 'How much bananas?', 'What bananas?'], 'On les compte.'),
        ],
        sources=[ref('LV-C3-CM2-REN-01', 'Faire des achats')]),

    'LV-C3-CM2-REAC-01': dict(duree=5, essentiel=
        'On réagit à une proposition : « Let’s play football. » « Yes, good idea! » ou « Sorry, I can’t. »\n'
        'On félicite : « Well done! », « Congratulations! »\n'
        'On remercie et on s’excuse : « Thank you! », « Sorry! »',
        parties=[
            ('Accepter, refuser', [
                mots('Réagir', ('Let’s go to the park!', 'Allons au parc !'), ('Good idea!', 'Bonne idée !'), ('OK, why not?', 'D’accord, pourquoi pas ?'), ('Sorry, I can’t.', 'Désolé, je ne peux pas.')),
                bq('« Let’s play cards! » veut dire :', ['Jouons aux cartes !', 'Je joue aux cartes.', 'Tu joues aux cartes ?'], 'Let’s : proposition.'),
            ]),
            ('Féliciter', [
                mots('Bravo', ('Well done!', 'Bravo !'), ('Congratulations!', 'Félicitations !'), ('Good job!', 'Beau travail !')),
                {'type': 'piege', 'erreur': 'On refuse sèchement : « No! »', 'correction': 'On refuse poliment : « Sorry, I can’t. »'},
            ]),
        ],
        a_toi=[
            q('« Well done! » veut dire :', ['Bravo !', 'Bien cuit !', 'Bonne nuit !'], 'Pour féliciter.'),
            q('Pour refuser poliment, on dit :', ['Sorry, I can’t.', 'No!', 'Let’s go!'], 'Avec sorry.'),
            q('« Let’s » sert à :', ['faire une proposition', 'poser une question', 'refuser'], 'Let’s : faisons.'),
        ],
        sources=[ref('LV-C3-CM2-REAC-01', 'Accepter, refuser, féliciter')]),

    'LV-C3-CM2-VET-01': dict(duree=5, essentiel=
        'Les vêtements : a jumper, trousers, a skirt, a dress, trainers.\n'
        'Pour dire ce qu’on porte maintenant : « I’m wearing a blue jumper. »\n'
        '« Trousers » est toujours au pluriel.',
        parties=[
            ('Les vêtements', [
                mots('Vêtements', ('a jumper', 'un pull'), ('trousers', 'un pantalon'), ('a skirt', 'une jupe'), ('a dress', 'une robe'), ('trainers', 'des baskets'), ('a jacket', 'une veste')),
                bq('« A dress » veut dire :', ['une robe', 'une jupe', 'un pull'], 'Elle couvre le haut et le bas.'),
            ]),
            ('Ce que je porte', [
                {'type': 'explique', 'texte': '« Today, I’m wearing black trousers and white trainers. » : aujourd’hui, je porte un pantalon noir et des baskets blanches.'},
                {'type': 'piege', 'erreur': 'On dit « a trouser ».', 'correction': 'Trousers est toujours au pluriel : my trousers are black.'},
            ]),
        ],
        a_toi=[
            q('« I’m wearing a jacket. » veut dire :', ['Je porte une veste.', 'J’achète une veste.', 'J’aime les vestes.'], 'Wear : porter.'),
            q('« Trainers » veut dire :', ['des baskets', 'des entraineurs', 'des chaussettes'], 'Pour le sport.'),
            q('« A jumper » veut dire :', ['un pull', 'un sauteur', 'une jupe'], 'Pour avoir chaud.'),
        ],
        sources=[ref('LV-C3-CM2-VET-01', 'Les vêtements')]),

    'LV-C3-CM2-VILLE-01': dict(duree=5, essentiel=
        'La ville : a park, a library, a hospital, a station, a museum.\n'
        '« There is » pour un seul lieu, « there are » pour plusieurs : il y a.\n'
        '« There is a big park next to the library. »',
        parties=[
            ('Les lieux', [
                mots('En ville', ('a station', 'une gare'), ('a hospital', 'un hôpital'), ('a museum', 'un musée'), ('a swimming pool', 'une piscine'), ('a flat', 'un appartement'), ('a house', 'une maison')),
                bq('« A museum » veut dire :', ['un musée', 'une musique', 'une mosquée'], 'On y voit des œuvres.'),
            ]),
            ('Il y a', [
                {'type': 'explique', 'texte': '« There is a cinema. There are two parks. » : il y a un cinéma, il y a deux parcs.'},
                {'type': 'piege', 'erreur': 'On dit « there is two parks ».', 'correction': 'Au pluriel, on dit « there are » : there are two parks.'},
            ]),
        ],
        a_toi=[
            q('« There are three schools. » veut dire :', ['Il y a trois écoles.', 'Il y avait trois écoles.', 'Ils ont trois écoles.'], 'There are : il y a.'),
            q('« A flat » veut dire :', ['un appartement', 'un plat', 'une maison'], 'Dans un immeuble.'),
            q('Complète : « There … a hospital. »', ['is', 'are', 'am'], 'Un seul lieu.'),
        ],
        sources=[ref('LV-C3-CM2-VILLE-01', 'La ville')]),

    'LV-C3-CM2-DD-01': dict(duree=5, essentiel=
        'Pour protéger la planète, on recycle, on économise l’énergie et on choisit des transports propres.\n'
        '« Recycle your bottles and turn off the lights! »\n'
        'Les consignes sont à l’impératif.',
        parties=[
            ('Des gestes', [
                mots('Protéger la planète', ('Recycle!', 'Recycle !'), ('Turn off the lights!', 'Éteins les lumières !'), ('Save water!', 'Économise l’eau !'), ('Walk or cycle!', 'Marche ou va à vélo !'), ('Don’t waste food!', 'Ne gaspille pas la nourriture !')),
                bq('« Turn off the tap! » veut dire :', ['Ferme le robinet !', 'Ouvre le robinet !', 'Change le robinet !'], 'Turn off : éteindre, fermer.'),
            ]),
            ('L’impératif négatif', [
                {'type': 'explique', 'texte': 'Pour interdire, on ajoute « Don’t » : « Don’t throw rubbish on the ground! »'},
                {'type': 'piege', 'erreur': 'On confond « turn on » et « turn off ».', 'correction': 'Turn on : allumer. Turn off : éteindre.'},
            ]),
        ],
        a_toi=[
            q('« Save energy! » veut dire :', ['Économise l’énergie !', 'Dépense l’énergie !', 'Achète de l’énergie !'], 'Save : économiser.'),
            q('« Don’t waste paper! » veut dire :', ['Ne gaspille pas le papier !', 'Recycle le papier !', 'Achète du papier !'], 'Waste : gaspiller.'),
            q('« Cycle to school » veut dire :', ['aller à l’école à vélo', 'aller à l’école à pied', 'recycler à l’école'], 'Cycle : faire du vélo.'),
        ],
        sources=[ref('LV-C3-CM2-DD-01', 'Protéger la planète')]),

    'LV-C3-CM2-IMAG-01': dict(duree=5, essentiel=
        'Les pays de langue anglaise ont leurs contes et légendes.\n'
        'Robin Hood vit dans la forêt de Sherwood : il vole les riches pour aider les pauvres.\n'
        'Le roi Arthur et les chevaliers de la Table ronde sont une autre légende britannique.',
        parties=[
            ('Des légendes', [
                {'type': 'tableau', 'titre': 'Personnages célèbres', 'colonnes': ['Personnage', 'Ce qu’on raconte'], 'lignes': [
                    ['Robin Hood', 'un hors-la-loi de la forêt de Sherwood qui aide les pauvres'], ['King Arthur', 'un roi qui retire l’épée Excalibur d’un rocher'], ['Nessie', 'un monstre qui vivrait dans le Loch Ness, en Écosse']]},
                bq('Robin Hood vit dans :', ['la forêt de Sherwood', 'un château', 'le Loch Ness'], 'Avec ses compagnons.'),
            ]),
            ('Lire une légende', [
                {'type': 'explique', 'texte': '« Robin Hood lives in Sherwood Forest. He helps the poor. » : il aide les pauvres.'},
                {'type': 'piege', 'erreur': 'On croit que ces légendes racontent des faits prouvés.', 'correction': 'Ce sont des récits transmis et embellis : on ne sait pas ce qui est vrai.'},
            ]),
        ],
        a_toi=[
            q('L’épée du roi Arthur s’appelle :', ['Excalibur', 'Durandal', 'Sherwood'], 'Il la retire d’un rocher.'),
            q('« He helps the poor. » veut dire :', ['Il aide les pauvres.', 'Il vole les pauvres.', 'Il est pauvre.'], 'Help : aider.'),
            q('Le Loch Ness se trouve en :', ['Écosse', 'Irlande', 'Angleterre'], 'Au nord du Royaume-Uni.'),
        ],
        sources=[ref('LV-C3-CM2-IMAG-01', 'Contes et légendes')]),

    'LV-C3-CM2-TPS-01': dict(duree=6, essentiel=
        'Des mots repères situent l’action : yesterday (hier), today (aujourd’hui), tomorrow (demain).\n'
        'Au passé, beaucoup de verbes prennent -ed : « Yesterday, I played tennis. »\n'
        'Pour le futur proche, on dit « going to » : « Tomorrow, I’m going to swim. »',
        parties=[
            ('Passé, présent, futur', [
                {'type': 'tableau', 'titre': 'Trois moments', 'colonnes': ['Moment', 'Repère', 'Exemple'], 'lignes': [
                    ['passé', 'yesterday', 'I played tennis.'], ['présent', 'today, every day', 'I play tennis.'], ['futur', 'tomorrow', 'I’m going to play tennis.']]},
                bq('« Yesterday, I watched a film. » se passe :', ['hier', 'aujourd’hui', 'demain'], 'Yesterday et -ed.'),
            ]),
            ('Repérer le temps', [
                {'type': 'methode', 'titre': 'Pour savoir quand', 'etapes': ['Cherche un mot repère : yesterday, tomorrow.', 'Regarde la fin du verbe : -ed indique souvent le passé.', 'Repère going to pour le futur.']},
                {'type': 'piege', 'erreur': 'On croit que tous les verbes au passé finissent par -ed.', 'correction': 'Certains sont irréguliers : go devient went, have devient had.'},
            ]),
        ],
        a_toi=[
            q('« Tomorrow, I’m going to visit my grandma. » se passe :', ['demain', 'hier', 'maintenant'], 'Going to : futur.'),
            q('« Yesterday, I went to the cinema. » Le verbe « went » vient de :', ['go', 'want', 'wait'], 'Un verbe irrégulier.'),
            q('« I played » est au :', ['passé', 'présent', 'futur'], '-ed.'),
        ],
        sources=[ref('LV-C3-CM2-TPS-01', 'Hier, aujourd’hui, demain')]),

    'LV-C3-CM2-PORT-01': dict(duree=5, essentiel=
        'Pour décrire l’apparence : « She has got long brown hair. » « He is tall. »\n'
        'Pour le caractère : funny, kind, shy, clever.\n'
        'En anglais, la couleur des cheveux se place juste avant hair.',
        parties=[
            ('L’apparence', [
                mots('Décrire', ('tall / short', 'grand / petit'), ('long / short hair', 'cheveux longs / courts'), ('blond, brown, black hair', 'cheveux blonds, bruns, noirs'), ('blue eyes', 'yeux bleus'), ('glasses', 'des lunettes')),
                bq('« He has got short black hair. » veut dire :', ['Il a les cheveux courts et noirs.', 'Il a les cheveux longs.', 'Il est petit et brun.'], 'Short : courts.'),
            ]),
            ('Le caractère', [
                mots('Caractère', ('funny', 'drôle'), ('kind', 'gentil'), ('shy', 'timide'), ('clever', 'intelligent')),
                {'type': 'piege', 'erreur': 'On dit « She has got hair long. »', 'correction': 'Les adjectifs viennent avant le nom : long brown hair.'},
            ]),
        ],
        a_toi=[
            q('« She is kind. » veut dire :', ['Elle est gentille.', 'Elle est grande.', 'Elle est timide.'], 'Kind : gentil.'),
            q('« Shy » veut dire :', ['timide', 'drôle', 'intelligent'], 'Il parle peu.'),
            q('Quelle phrase est juste ?', ['He has got blue eyes.', 'He has got eyes blue.', 'He has blue got eyes.'], 'Adjectif avant le nom.'),
        ],
        sources=[ref('LV-C3-CM2-PORT-01', 'Faire un portrait')]),

    'LV-C3-CM2-GEO-01': dict(duree=5, essentiel=
        'Le Royaume-Uni réunit quatre pays : England, Scotland, Wales et Northern Ireland.\n'
        'Leurs capitales sont London, Edinburgh, Cardiff et Belfast.\n'
        'On parle aussi anglais aux États-Unis, au Canada, en Australie, en Irlande…',
        parties=[
            ('Quatre pays', [
                {'type': 'tableau', 'titre': 'Le Royaume-Uni', 'colonnes': ['Pays', 'En français', 'Capitale'], 'lignes': [
                    ['England', 'Angleterre', 'London'], ['Scotland', 'Écosse', 'Edinburgh'], ['Wales', 'pays de Galles', 'Cardiff'], ['Northern Ireland', 'Irlande du Nord', 'Belfast']]},
                bq('La capitale de l’Écosse est :', ['Edinburgh', 'London', 'Cardiff'], 'Édimbourg en français.'),
            ]),
            ('D’autres pays anglophones', [
                {'type': 'observe', 'consigne': 'On parle anglais…', 'exemples': ['aux États-Unis : Washington', 'au Canada, avec le français : Ottawa', 'en Australie : Canberra', 'en Irlande : Dublin']},
                {'type': 'piege', 'erreur': 'On croit que Royaume-Uni et Angleterre, c’est pareil.', 'correction': 'L’Angleterre est l’un des quatre pays du Royaume-Uni.'},
            ]),
        ],
        a_toi=[
            q('« Wales » veut dire :', ['le pays de Galles', 'la baleine', 'l’Irlande'], 'Capitale : Cardiff.'),
            q('Le Royaume-Uni compte :', ['4 pays', '2 pays', '50 pays'], 'Angleterre, Écosse, Galles, Irlande du Nord.'),
            q('La capitale de l’Australie est :', ['Canberra', 'Sydney', 'Londres'], 'Pas Sydney.'),
        ],
        sources=[ref('LV-C3-CM2-GEO-01', 'Le Royaume-Uni et ses pays')]),

    'LV-C3-CM2-ADJ-01': dict(duree=4, essentiel=
        'En anglais, l’adjectif se place avant le nom : a red car.\n'
        'Il ne s’accorde jamais : two red cars, pas « two reds cars ».\n'
        'On peut en mettre plusieurs : a big black dog.',
        parties=[
            ('Avant le nom', [
                {'type': 'tableau', 'titre': 'Comparer', 'colonnes': ['Français', 'Anglais'], 'lignes': [
                    ['une voiture rouge', 'a red car'], ['deux voitures rouges', 'two red cars'], ['un gros chien noir', 'a big black dog']]},
                bq('Comment dit-on « des chats noirs » ?', ['black cats', 'blacks cats', 'cats black'], 'L’adjectif ne prend pas de s.'),
            ]),
            ('Invariable', [
                {'type': 'piege', 'erreur': 'On met un s à l’adjectif : « smalls houses ».', 'correction': 'Seul le nom prend un s : small houses.'},
            ]),
        ],
        a_toi=[
            q('Quelle forme est juste ?', ['a green apple', 'an apple green', 'a apple green'], 'Adjectif avant le nom.'),
            q('« Three big trees » veut dire :', ['trois grands arbres', 'trois arbres verts', 'un grand arbre'], 'Big : grand.'),
            q('En anglais, l’adjectif :', ['ne s’accorde jamais', 's’accorde en nombre', 's’accorde en genre'], 'Il reste invariable.'),
        ],
        sources=[ref('LV-C3-CM2-ADJ-01', 'La place de l’adjectif')]),

    'LV-C3-CM2-GEN-01': dict(duree=5, essentiel=
        'Pour dire à qui appartient quelque chose, on écrit le possesseur, puis ’s, puis l’objet.\n'
        '« Tom’s bike » : le vélo de Tom.\n'
        '« My mother’s car » : la voiture de ma mère.',
        parties=[
            ('Construire le génitif', [
                {'type': 'tableau', 'titre': 'Français et anglais', 'colonnes': ['Français', 'Anglais'], 'lignes': [
                    ['le vélo de Tom', 'Tom’s bike'], ['la voiture de ma mère', 'my mother’s car'], ['le chien de Léa', 'Léa’s dog']]},
                bq('« Le cartable de Sam » se dit :', ['Sam’s schoolbag', 'the schoolbag Sam', 'schoolbag’s Sam'], 'Possesseur + ’s + objet.'),
            ]),
            ('L’ordre est inversé', [
                {'type': 'explique', 'texte': 'En français, on dit l’objet puis le possesseur. En anglais, le possesseur vient d’abord.'},
                {'type': 'piege', 'erreur': 'On met le ’s sur l’objet : « bike’s Tom ».', 'correction': 'Le ’s va sur le possesseur : Tom’s bike.'},
            ]),
        ],
        a_toi=[
            q('« Emma’s cat » veut dire :', ['le chat d’Emma', 'Emma est un chat', 'les chats d’Emma'], 'Le chat appartient à Emma.'),
            q('« La maison de mon père » se dit :', ['my father’s house', 'the house my father', 'my house’s father'], 'Possesseur d’abord.'),
            q('Dans « Paul’s pen », le possesseur est :', ['Paul', 'pen', 's'], 'Il porte le ’s.'),
        ],
        sources=[ref('LV-C3-CM2-GEN-01', 'Le génitif ’s')]),

    'LV-C3-CM2-NEG-01': dict(duree=6, essentiel=
        'Au présent, la question se forme avec do, ou does pour he, she, it : « Do you like cats? »\n'
        'La négation se forme avec don’t ou doesn’t : « He doesn’t play tennis. »\n'
        'Avec does et doesn’t, le verbe perd son s : she plays, she doesn’t play.',
        parties=[
            ('Questions', [
                {'type': 'tableau', 'titre': 'Do ou does ?', 'colonnes': ['Sujet', 'Question', 'Réponse courte'], 'lignes': [
                    ['I, you, we, they', 'Do you like cats?', 'Yes, I do. / No, I don’t.'], ['he, she, it', 'Does she like cats?', 'Yes, she does. / No, she doesn’t.']]},
                bq('« … Tom play the piano? »', ['Does', 'Do', 'Is'], 'Tom = he : does.'),
            ]),
            ('Négations', [
                {'type': 'explique', 'texte': 'I don’t eat meat. She doesn’t eat meat. Le s de « eats » disparait après doesn’t.'},
                {'type': 'piege', 'erreur': 'On écrit « She doesn’t plays. »', 'correction': 'Le s est déjà dans does : she doesn’t play.'},
            ]),
        ],
        a_toi=[
            q('« We … like spiders. »', ['don’t', 'doesn’t', 'not'], 'We : don’t.'),
            q('Quelle phrase est juste ?', ['He doesn’t like fish.', 'He don’t like fish.', 'He doesn’t likes fish.'], 'Doesn’t + verbe sans s.'),
            q('« Do you play football? » Tu joues : tu réponds :', ['Yes, I do.', 'Yes, I play.', 'Yes, I am.'], 'Réponse courte avec do.'),
        ],
        sources=[ref('LV-C3-CM2-NEG-01', 'Questions et négations')]),

    'LV-C3-CM2-BEC-01': dict(duree=4, essentiel=
        '« Why? » veut dire pourquoi ?\n'
        'On répond avec « because » : parce que.\n'
        '« I like summer because it’s hot. » : j’aime l’été parce qu’il fait chaud.',
        parties=[
            ('Donner une raison', [
                mots('Why et because', ('Why do you like dogs?', 'Pourquoi aimes-tu les chiens ?'), ('Because they are funny.', 'Parce qu’ils sont drôles.'), ('I’m tired because I ran.', 'Je suis fatigué parce que j’ai couru.')),
                bq('« Because » veut dire :', ['parce que', 'pourquoi', 'mais'], 'Pour expliquer.'),
            ]),
            ('Relier deux idées', [
                {'type': 'piege', 'erreur': 'On répond à « Why? » sans « because ».', 'correction': 'On commence la réponse par because : Because it’s fun.'},
            ]),
        ],
        a_toi=[
            q('« Why are you happy? » veut dire :', ['Pourquoi es-tu content ?', 'Quand es-tu content ?', 'Es-tu content ?'], 'Why : pourquoi.'),
            q('Complète : « I like winter … I love snow. »', ['because', 'but', 'why'], 'On donne une raison.'),
            q('« I don’t like this film because it’s boring. » Le film est :', ['ennuyeux', 'drôle', 'long'], 'Boring : ennuyeux.'),
        ],
        sources=[ref('LV-C3-CM2-BEC-01', 'Because')]),

    'LV-C3-CM2-PREP-01': dict(duree=5, essentiel=
        'At pour une heure : at 8 o’clock.\n'
        'On pour un jour ou une date : on Monday, on the 3rd of June.\n'
        'In pour un mois, une saison, une année : in July, in summer, in 2026.',
        parties=[
            ('Trois prépositions de temps', [
                {'type': 'tableau', 'titre': 'At, on, in', 'colonnes': ['Préposition', 'Avec', 'Exemple'], 'lignes': [
                    ['at', 'une heure', 'at 8 o’clock, at noon'], ['on', 'un jour, une date', 'on Monday, on my birthday'], ['in', 'un mois, une saison, une année', 'in July, in winter, in 2026']]},
                bq('Complète : « My birthday is … May. »', ['in', 'on', 'at'], 'Un mois : in.'),
            ]),
            ('Du plus précis au plus large', [
                {'type': 'explique', 'texte': 'At : un instant précis. On : une journée. In : une période plus longue.'},
                {'type': 'piege', 'erreur': 'On dit « in Monday ».', 'correction': 'Avec un jour, on emploie on : on Monday.'},
            ]),
        ],
        a_toi=[
            q('Complète : « The film starts … 7 pm. »', ['at', 'on', 'in'], 'Une heure : at.'),
            q('Complète : « We go skiing … winter. »', ['in', 'on', 'at'], 'Une saison : in.'),
            q('Complète : « I have football … Wednesday. »', ['on', 'in', 'at'], 'Un jour : on.'),
        ],
        sources=[ref('LV-C3-CM2-PREP-01', 'In, on, at')]),
}

ecrire(COURS)
