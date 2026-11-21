"""Lot de cours : anglais 6e (programme 2025). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-anglais-6e.py
    python3 scripts/cours/pages.py content/cours/LV-C3-6E*.json

Cycle 3 : phrases de 20 mots au plus (alerte). Anglais britannique.
"""
from commun import bq, ecrire, q, source_referentiel as ref


def mots(titre, *paires):
    return {'type': 'tableau', 'titre': titre, 'colonnes': ['Anglais', 'Français'], 'lignes': [list(p) for p in paires]}


COURS = {
    'LV-C3-6E-GRAM-01': dict(duree=6, essentiel=
        'Be (être) au présent : I am, you are, he / she / it is, we are, they are.\n'
        'Have got (avoir) : I have got, he has got. À l’oral, on contracte : I’m, he’s, I’ve got.\n'
        'Négation : I’m not, he hasn’t got. Question : Are you…? Has she got…?',
        parties=[
            ('Be et have got', [
                {'type': 'tableau', 'titre': 'Au présent', 'colonnes': ['Sujet', 'be', 'have got'], 'lignes': [
                    ['I', 'am (I’m)', 'have got (I’ve got)'], ['you, we, they', 'are (you’re)', 'have got (we’ve got)'], ['he, she, it', 'is (he’s)', 'has got (she’s got)']]},
                bq('« She … eleven. »', ['is', 'are', 'am'], 'She : is.'),
            ]),
            ('Négation et question', [
                {'type': 'tableau', 'titre': 'Trois formes', 'colonnes': ['Forme', 'be', 'have got'], 'lignes': [
                    ['affirmative', 'He is tired.', 'He has got a dog.'], ['négative', 'He isn’t tired.', 'He hasn’t got a dog.'], ['interrogative', 'Is he tired?', 'Has he got a dog?']]},
                {'type': 'piege', 'erreur': 'On traduit « j’ai onze ans » par « I have eleven ».', 'correction': 'Pour l’âge, on emploie be : I am eleven.'},
            ]),
        ],
        a_toi=[
            q('« They … got a big house. »', ['have', 'has', 'are'], 'They : have got.'),
            q('La question de « You are French. » est :', ['Are you French?', 'You are French?', 'Do you French?'], 'Be passe devant le sujet.'),
            q('« J’ai douze ans » se dit :', ['I am twelve.', 'I have twelve.', 'I have got twelve.'], 'L’âge se dit avec be.'),
        ],
        sources=[ref('LV-C3-6E-GRAM-01', 'Be et have got au présent')]),

    'LV-C3-6E-GRAM-02': dict(duree=6, essentiel=
        'Au présent simple, le verbe prend un -s avec he, she, it : she plays.\n'
        'Après -s, -sh, -ch, -x, -o, on ajoute -es : he watches, she goes.\n'
        'Négation : I don’t play, she doesn’t play. Après doesn’t, le verbe n’a plus de -s.',
        parties=[
            ('Le -s de la 3e personne', [
                {'type': 'tableau', 'titre': 'Present simple', 'colonnes': ['Sujet', 'Affirmatif', 'Négatif'], 'lignes': [
                    ['I, you, we, they', 'I play', 'I don’t play'], ['he, she, it', 'she plays', 'she doesn’t play']]},
                bq('« My brother … football every Sunday. »', ['plays', 'play', 'playing'], 'He : -s.'),
            ]),
            ('-s ou -es ?', [
                mots('Orthographe', ('watch → watches', 'regarder'), ('go → goes', 'aller'), ('do → does', 'faire'), ('study → studies', 'étudier')),
                {'type': 'piege', 'erreur': 'On écrit « she doesn’t plays ».', 'correction': 'Le -s est déjà dans does : she doesn’t play.'},
            ]),
        ],
        a_toi=[
            q('« He … TV in the evening. »', ['watches', 'watchs', 'watch'], 'Après -ch : -es.'),
            q('« We … like spinach. »', ['don’t', 'doesn’t', 'aren’t'], 'We : don’t.'),
            q('Quelle phrase est juste ?', ['Tom doesn’t eat meat.', 'Tom don’t eat meat.', 'Tom doesn’t eats meat.'], 'Doesn’t + verbe sans -s.'),
        ],
        sources=[ref('LV-C3-6E-GRAM-02', 'Le -s du présent simple')]),

    'LV-C3-6E-GRAM-03': dict(duree=5, essentiel=
        'Can : savoir ou pouvoir. Can’t : ne pas savoir, ne pas avoir le droit.\n'
        'Must : obligation. Mustn’t : interdiction.\n'
        'Ces verbes ne changent jamais et sont suivis du verbe sans to : she can swim.',
        parties=[
            ('Quatre sens', [
                {'type': 'tableau', 'titre': 'Modaux', 'colonnes': ['Modal', 'Sens', 'Exemple'], 'lignes': [
                    ['can', 'capacité, permission', 'I can swim. You can go.'], ['can’t', 'incapacité, refus', 'You can’t use your phone.'], ['must', 'obligation', 'You must wear a helmet.'], ['mustn’t', 'interdiction', 'You mustn’t run.']]},
                bq('« You mustn’t eat in class. » exprime :', ['une interdiction', 'une obligation', 'une capacité'], 'Mustn’t : défense de.'),
            ]),
            ('La construction', [
                {'type': 'explique', 'texte': 'Pas de -s, pas de to : she can dance, he must go.'},
                {'type': 'piege', 'erreur': 'On écrit « she cans swim » ou « he must to go ».', 'correction': 'Modal + verbe nu : she can swim, he must go.'},
            ]),
        ],
        a_toi=[
            q('« Can I borrow your pen? » sert à :', ['demander la permission', 'donner un ordre', 'interdire'], 'Can : permission.'),
            q('Quelle phrase est juste ?', ['He can play the guitar.', 'He cans play the guitar.', 'He can to play the guitar.'], 'Can + verbe nu.'),
            q('« Tu dois faire tes devoirs » se dit :', ['You must do your homework.', 'You mustn’t do your homework.', 'You can’t do your homework.'], 'Must : obligation.'),
        ],
        sources=[ref('LV-C3-6E-GRAM-03', 'Can, can’t, must, mustn’t')]),

    'LV-C3-6E-GRAM-04': dict(duree=5, essentiel=
        'Le possessif dépend du possesseur : his pour un garçon, her pour une fille, its pour un objet ou un animal.\n'
        'Le génitif : possesseur + ’s + objet. Tom’s bike, le vélo de Tom.\n'
        'Avec un pluriel en -s, on met seulement l’apostrophe : my parents’ car.',
        parties=[
            ('Les possessifs', [
                {'type': 'tableau', 'titre': 'Déterminants possessifs', 'colonnes': ['Sujet', 'Possessif', 'Exemple'], 'lignes': [
                    ['I', 'my', 'my sister'], ['you', 'your', 'your room'], ['he', 'his', 'his mother'], ['she', 'her', 'her father'], ['it', 'its', 'its tail'], ['we / they', 'our / their', 'our school, their dog']]},
                bq('« Paul loves … grandmother. »', ['his', 'her', 'its'], 'Le possesseur est Paul.'),
            ]),
            ('Le génitif', [
                mots('’s', ('Emma’s cat', 'le chat d’Emma'), ('my brother’s room', 'la chambre de mon frère'), ('the girls’ bags', 'les sacs des filles')),
                {'type': 'piege', 'erreur': 'On écrit « the bike of Tom ».', 'correction': 'Pour une personne, on utilise le génitif : Tom’s bike.'},
            ]),
        ],
        a_toi=[
            q('« Lisa and … brother » :', ['her', 'his', 'its'], 'La possesseure est Lisa.'),
            q('« La voiture de mon père » se dit :', ['my father’s car', 'the car of my father’s', 'my car’s father'], 'Possesseur + ’s.'),
            q('« The dog wags … tail. »', ['its', 'it’s', 'his'], 'Its : son, pour un animal. It’s = it is.'),
        ],
        sources=[ref('LV-C3-6E-GRAM-04', 'Possessifs et génitif')]),

    'LV-C3-6E-GRAM-05': dict(duree=5, essentiel=
        'There is + singulier, there are + pluriel : il y a.\n'
        'Le pluriel se forme le plus souvent avec -s : cats. Après -s, -sh, -ch, -x : -es (boxes).\n'
        'Pluriels irréguliers : child → children, man → men, woman → women, foot → feet, tooth → teeth, mouse → mice.',
        parties=[
            ('There is, there are', [
                {'type': 'explique', 'texte': 'There is a bed in my room. There are two windows. Is there a garden? No, there isn’t.'},
                bq('« … three bedrooms in my house. »', ['There are', 'There is', 'They are'], 'Pluriel : there are.'),
            ]),
            ('Les pluriels', [
                mots('Irréguliers', ('a child → children', 'enfant'), ('a man → men', 'homme'), ('a foot → feet', 'pied'), ('a tooth → teeth', 'dent'), ('a mouse → mice', 'souris')),
                {'type': 'piege', 'erreur': 'On écrit « childs » ou « foots ».', 'correction': 'Ces pluriels sont irréguliers : children, feet.'},
            ]),
        ],
        a_toi=[
            q('Le pluriel de « box » est :', ['boxes', 'boxs', 'boxen'], 'Après -x : -es.'),
            q('« … a cat on the sofa. »', ['There is', 'There are', 'It are'], 'Un seul chat.'),
            q('Le pluriel de « woman » est :', ['women', 'womans', 'womens'], 'Pluriel irrégulier.'),
        ],
        sources=[ref('LV-C3-6E-GRAM-05', 'There is, there are et les pluriels')]),

    'LV-C3-6E-GRAM-06': dict(duree=5, essentiel=
        'Who : qui. What : quoi, quel. Where : où. When : quand. Why : pourquoi. How : comment.\n'
        'Le mot interrogatif ouvre la question, puis vient l’auxiliaire : Where do you live?\n'
        'How se combine : how old, how many, how much, how often.',
        parties=[
            ('Les mots interrogatifs', [
                mots('Questions', ('Who is your best friend?', 'Qui est ton meilleur ami ?'), ('What is your name?', 'Comment t’appelles-tu ?'), ('Where do you live?', 'Où habites-tu ?'), ('When is your birthday?', 'Quand est ton anniversaire ?'), ('Why are you late?', 'Pourquoi es-tu en retard ?'), ('How are you?', 'Comment vas-tu ?')),
                bq('Pour demander un lieu, on utilise :', ['where', 'when', 'who'], 'Where : où.'),
            ]),
            ('L’ordre des mots', [
                {'type': 'methode', 'titre': 'Construire une question', 'etapes': ['Mot interrogatif : Where', 'Auxiliaire : do / does, ou be', 'Sujet : you', 'Verbe : live ?']},
                {'type': 'piege', 'erreur': 'On écrit « Where you live? ».', 'correction': 'Il faut l’auxiliaire : Where do you live?'},
            ]),
        ],
        a_toi=[
            q('« … often do you play tennis? »', ['How', 'What', 'Who'], 'How often : combien de fois.'),
            q('Quelle question est juste ?', ['What time does the film start?', 'What time the film starts?', 'What time does the film starts?'], 'Does + verbe nu.'),
            q('« Why » appelle une réponse avec :', ['because', 'but', 'when'], 'Because : parce que.'),
        ],
        sources=[ref('LV-C3-6E-GRAM-06', 'Les mots interrogatifs')]),

    'LV-C3-6E-VOC-01': dict(duree=5, essentiel=
        'La famille : parents, brother, sister, grandparents, uncle, aunt, cousin.\n'
        'Le portrait physique : tall, short, slim, long hair, blue eyes.\n'
        'Le caractère : kind, funny, shy, clever, lazy.',
        parties=[
            ('La famille', [
                mots('Ma famille', ('my parents', 'mes parents'), ('my grandparents', 'mes grands-parents'), ('my uncle / my aunt', 'mon oncle / ma tante'), ('my cousin', 'mon cousin, ma cousine'), ('an only child', 'un enfant unique')),
                bq('« My mother’s brother » est :', ['my uncle', 'my cousin', 'my grandfather'], 'Le frère de ma mère.'),
            ]),
            ('Le portrait', [
                {'type': 'explique', 'texte': '« My sister is tall and slim. She has got long brown hair. She is funny but a bit lazy. »'},
                {'type': 'piege', 'erreur': 'On confond « parents » et « relatives ».', 'correction': 'Parents : le père et la mère. Relatives : les membres de la famille.'},
            ]),
        ],
        a_toi=[
            q('« Shy » veut dire :', ['timide', 'drôle', 'paresseux'], 'Il parle peu.'),
            q('« She has got curly hair. » Ses cheveux sont :', ['bouclés', 'raides', 'courts'], 'Curly : bouclé.'),
            q('« My aunt’s daughter » est :', ['my cousin', 'my sister', 'my niece'], 'La fille de ma tante.'),
        ],
        sources=[ref('LV-C3-6E-VOC-01', 'Famille et portrait')]),

    'LV-C3-6E-VOC-02': dict(duree=5, essentiel=
        'La journée au présent simple : I get up, I have breakfast, I go to school, I go to bed.\n'
        'Les pièces de la maison : kitchen, living room, bedroom, bathroom, garden.\n'
        'Les mots then, after that, finally ordonnent le récit.',
        parties=[
            ('Ma journée', [
                {'type': 'methode', 'titre': 'Raconter sa journée', 'etapes': ['First, I get up at seven.', 'Then, I have breakfast in the kitchen.', 'After that, I go to school by bus.', 'Finally, I go to bed at nine.']},
                bq('« I have a shower » se passe dans :', ['the bathroom', 'the kitchen', 'the garden'], 'Bathroom : salle de bains.'),
            ]),
            ('La maison', [
                mots('Les pièces', ('the kitchen', 'la cuisine'), ('the living room', 'le salon'), ('the bedroom', 'la chambre'), ('the bathroom', 'la salle de bains'), ('upstairs / downstairs', 'à l’étage / en bas')),
                {'type': 'piege', 'erreur': 'On écrit « I go at school ».', 'correction': 'On dit « I go to school ».'},
            ]),
        ],
        a_toi=[
            q('« Living room » veut dire :', ['salon', 'chambre', 'cuisine'], 'On y vit ensemble.'),
            q('« After that » veut dire :', ['ensuite', 'avant', 'enfin'], 'Pour enchainer.'),
            q('Quelle phrase est juste ?', ['I go to school at eight.', 'I go at school at eight.', 'I go school at eight.'], 'Go to school.'),
        ],
        sources=[ref('LV-C3-6E-VOC-02', 'Journée et maison')]),

    'LV-C3-6E-VOC-03': dict(duree=5, essentiel=
        'Les dizaines finissent par -ty : twenty, thirty, forty… jusqu’à one hundred.\n'
        'L’heure : six o’clock (6 h), quarter past six (6 h 15), half past six (6 h 30).\n'
        'Quarter to seven : 6 h 45.\n'
        'Past : après l’heure. To : avant l’heure suivante.',
        parties=[
            ('Compter', [
                mots('Nombres', ('thirteen / thirty', '13 / 30'), ('fourteen / forty', '14 / 40'), ('fifty-five', '55'), ('ninety-nine', '99'), ('one hundred', '100')),
                bq('« Forty » s’écrit sans :', ['u', 'r', 't'], 'Four, mais forty.'),
            ]),
            ('Dire l’heure', [
                {'type': 'tableau', 'titre': 'Quelle heure est-il ?', 'colonnes': ['Anglais', 'Heure'], 'lignes': [
                    ['It’s nine o’clock.', '9 h'], ['It’s quarter past nine.', '9 h 15'], ['It’s half past nine.', '9 h 30'], ['It’s quarter to ten.', '9 h 45']]},
                {'type': 'piege', 'erreur': 'On lit « half past nine » comme 8 h 30.', 'correction': 'Past : après. Half past nine, c’est 9 h 30.'},
            ]),
        ],
        a_toi=[
            q('« Quarter to eight » :', ['7 h 45', '8 h 15', '8 h 45'], 'Huit heures moins le quart.'),
            q('« Sixty-three » :', ['63', '36', '73'], 'Sixty : 60.'),
            q('Pour demander l’heure, on dit :', ['What time is it?', 'How time is it?', 'What hour it is?'], 'What time.'),
        ],
        sources=[ref('LV-C3-6E-VOC-03', 'Nombres et heure')]),

    'LV-C3-6E-VOC-04': dict(duree=5, essentiel=
        'Le Royaume-Uni réunit l’Angleterre, l’Écosse, le pays de Galles et l’Irlande du Nord.\n'
        'Nationalités : English, Scottish, Welsh, Irish, British, American. Elles prennent une majuscule.\n'
        'Fêtes : Bonfire Night le 5 novembre, Thanksgiving aux États-Unis, St Patrick’s Day le 17 mars.',
        parties=[
            ('Pays et nationalités', [
                {'type': 'tableau', 'titre': 'Royaume-Uni', 'colonnes': ['Pays', 'Capitale', 'Nationalité'], 'lignes': [
                    ['England', 'London', 'English'], ['Scotland', 'Edinburgh', 'Scottish'], ['Wales', 'Cardiff', 'Welsh'], ['Northern Ireland', 'Belfast', 'Northern Irish']]},
                bq('Une personne du pays de Galles est :', ['Welsh', 'Wales', 'Walish'], 'Wales → Welsh.'),
            ]),
            ('Les fêtes', [
                {'type': 'tableau', 'titre': 'Calendrier', 'colonnes': ['Fête', 'Date', 'Où'], 'lignes': [
                    ['St Patrick’s Day', '17 mars', 'Irlande, et ailleurs'], ['Halloween', '31 octobre', 'pays anglophones'], ['Bonfire Night', '5 novembre', 'Royaume-Uni'], ['Thanksgiving', '4e jeudi de novembre', 'États-Unis']]},
                {'type': 'piege', 'erreur': 'On écrit les nationalités avec une minuscule : « french ».', 'correction': 'En anglais, elles prennent une majuscule : French.'},
            ]),
        ],
        a_toi=[
            q('Bonfire Night a lieu le :', ['5 novembre', '31 octobre', '25 décembre'], 'Avec des feux de joie.'),
            q('La capitale de l’Écosse est :', ['Edinburgh', 'Glasgow', 'Cardiff'], 'Édimbourg.'),
            q('Comment écrit-on « français » en anglais ?', ['French', 'french', 'France'], 'Avec une majuscule.'),
        ],
        sources=[ref('LV-C3-6E-VOC-04', 'Pays, nationalités et fêtes')]),

    'LV-C3-6E-COM-01': dict(duree=5, essentiel=
        'Saluer : Hello! Hi! Good morning! Prendre congé : Goodbye! See you later!\n'
        'Demander des nouvelles : How are you? Répondre : I’m fine, thanks. And you?\n'
        'Demander de l’aide : Can you help me, please? Remercier : Thank you very much.',
        parties=[
            ('Échanger', [
                mots('Formules', ('How are you?', 'Comment vas-tu ?'), ('I’m fine, thanks.', 'Bien, merci.'), ('Nice to meet you.', 'Enchanté.'), ('Can you help me, please?', 'Peux-tu m’aider ?'), ('You’re welcome.', 'De rien.')),
                bq('On répond à « Thank you! » par :', ['You’re welcome.', 'Nice to meet you.', 'Goodbye.'], 'De rien.'),
            ]),
            ('Se présenter', [
                {'type': 'explique', 'texte': '« Hi! My name is Léo. I’m eleven. I live in Lyon. »'},
                {'type': 'piege', 'erreur': 'On répond « I’m fine » à « How old are you? ».', 'correction': 'How old : quel âge. On répond I’m eleven.'},
            ]),
        ],
        a_toi=[
            q('« See you later! » veut dire :', ['À plus tard !', 'Bonjour !', 'Merci !'], 'Pour prendre congé.'),
            q('Pour demander de l’aide, on dit :', ['Can you help me, please?', 'Help you me?', 'I help you.'], 'Can you… please.'),
            q('« Nice to meet you » se dit :', ['quand on rencontre quelqu’un', 'pour remercier', 'pour s’excuser'], 'Enchanté.'),
        ],
        sources=[ref('LV-C3-6E-COM-01', 'Saluer, demander, remercier')]),

    'LV-C3-6E-GRAM-07': dict(duree=4, essentiel=
        'L’impératif donne un ordre ou une consigne. Il n’a pas de sujet : Open your book!\n'
        'À la forme négative, on ajoute don’t : Don’t talk!\n'
        'Let’s + verbe propose de faire ensemble : Let’s go!',
        parties=[
            ('Consignes de classe', [
                mots('En classe', ('Open your book.', 'Ouvre ton livre.'), ('Listen and repeat.', 'Écoute et répète.'), ('Don’t talk.', 'Ne parle pas.'), ('Sit down, please.', 'Assieds-toi, s’il te plait.'), ('Let’s start!', 'Commençons !')),
                bq('« Don’t forget your homework! » veut dire :', ['N’oublie pas tes devoirs !', 'Oublie tes devoirs !', 'Fais tes devoirs !'], 'Don’t : négatif.'),
            ]),
            ('La forme', [
                {'type': 'piege', 'erreur': 'On écrit « You open your book! » pour un ordre.', 'correction': 'L’impératif n’a pas de sujet : Open your book!'},
            ]),
        ],
        a_toi=[
            q('« Close the door! » est :', ['un ordre', 'une question', 'une description'], 'Impératif.'),
            q('« Ne cours pas ! » se dit :', ['Don’t run!', 'Not run!', 'You don’t run!'], 'Don’t + verbe.'),
            q('« Let’s play! » veut dire :', ['Jouons !', 'Laisse-moi jouer !', 'Il joue !'], 'Let’s : proposition.'),
        ],
        sources=[ref('LV-C3-6E-GRAM-07', 'L’impératif')]),

    'LV-C3-6E-GRAM-08': dict(duree=5, essentiel=
        'Le présent be + -ing décrit une action en cours : I am reading, she is running.\n'
        'On l’emploie avec now, at the moment, look!\n'
        'Orthographe : swim → swimming, write → writing.',
        parties=[
            ('Former be + -ing', [
                {'type': 'tableau', 'titre': 'En ce moment', 'colonnes': ['Sujet', 'Forme', 'Exemple'], 'lignes': [
                    ['I', 'am + -ing', 'I am eating.'], ['you, we, they', 'are + -ing', 'They are playing.'], ['he, she, it', 'is + -ing', 'She is sleeping.']]},
                bq('« Look! The baby … »', ['is crying', 'cries', 'cry'], 'Look! : action en cours.'),
            ]),
            ('L’orthographe', [
                mots('-ing', ('swim → swimming', 'consonne doublée'), ('run → running', 'consonne doublée'), ('write → writing', 'e final supprimé'), ('play → playing', 'sans changement')),
                {'type': 'piege', 'erreur': 'On oublie be : « She reading. »', 'correction': 'Be est obligatoire : She is reading.'},
            ]),
        ],
        a_toi=[
            q('« We … dinner now. »', ['are having', 'having', 'is having'], 'We : are.'),
            q('Le -ing de « dance » est :', ['dancing', 'danceing', 'dancting'], 'Le e final tombe.'),
            q('Be + -ing exprime :', ['une action en cours', 'une habitude', 'une action passée'], 'En ce moment.'),
        ],
        sources=[ref('LV-C3-6E-GRAM-08', 'Le présent be + -ing')]),

    'LV-C3-6E-GRAM-09': dict(duree=5, essentiel=
        'Pronoms compléments : me, you, him, her, it, us, them. On les place après le verbe : I like him.\n'
        'This (ceci, proche) et that (cela, loin) au singulier.\n'
        'These (proches) et those (loin) au pluriel.',
        parties=[
            ('Pronoms compléments', [
                {'type': 'tableau', 'titre': 'Sujet et complément', 'colonnes': ['Sujet', 'Complément', 'Exemple'], 'lignes': [
                    ['I', 'me', 'Help me!'], ['he', 'him', 'I know him.'], ['she', 'her', 'Call her.'], ['we', 'us', 'Wait for us.'], ['they', 'them', 'I love them.']]},
                bq('« I like Sam. I play with … »', ['him', 'he', 'his'], 'Complément : him.'),
            ]),
            ('This, that, these, those', [
                {'type': 'tableau', 'titre': 'Démonstratifs', 'colonnes': ['Distance', 'Singulier', 'Pluriel'], 'lignes': [
                    ['proche', 'this book', 'these books'], ['loin', 'that car', 'those cars']]},
                {'type': 'piege', 'erreur': 'On écrit « this shoes ».', 'correction': 'Au pluriel : these shoes.'},
            ]),
        ],
        a_toi=[
            q('« Look at … birds over there! » (loin)', ['those', 'these', 'this'], 'Pluriel, loin.'),
            q('« Can you help … ? » (nous)', ['us', 'we', 'our'], 'Complément : us.'),
            q('« I don’t know … » (elle)', ['her', 'she', 'hers'], 'Complément : her.'),
        ],
        sources=[ref('LV-C3-6E-GRAM-09', 'Pronoms et démonstratifs')]),

    'LV-C3-6E-GRAM-10': dict(duree=4, essentiel=
        'Les prépositions situent : in (dans), on (sur), under (sous), behind (derrière), in front of (devant).\n'
        'Next to : à côté de. Between : entre deux choses.\n'
        'Question : Where is my bag? Réponse : It’s under your chair.',
        parties=[
            ('Situer', [
                mots('Prépositions', ('in', 'dans'), ('on', 'sur'), ('under', 'sous'), ('between', 'entre'), ('next to', 'à côté de'), ('in front of / behind', 'devant / derrière')),
                bq('« The bank is between the café and the shop. » La banque est :', ['entre le café et le magasin', 'derrière le café', 'devant le magasin'], 'Between : entre.'),
            ]),
            ('Où est-il ?', [
                {'type': 'piege', 'erreur': 'On écrit « in front the school ».', 'correction': 'Il faut of : in front of the school.'},
            ]),
        ],
        a_toi=[
            q('« Behind » veut dire :', ['derrière', 'devant', 'à côté'], 'Le contraire de in front of.'),
            q('« The cat is on the bed. » Le chat est :', ['sur le lit', 'sous le lit', 'dans le lit'], 'On : sur.'),
            q('« Where are my keys? » « … the drawer. » (dans)', ['In', 'On', 'At'], 'In : dans.'),
        ],
        sources=[ref('LV-C3-6E-GRAM-10', 'Les prépositions de lieu')]),

    'LV-C3-6E-VOC-05': dict(duree=5, essentiel=
        'Vêtements : a T-shirt, a jumper, trousers, jeans, a skirt, shoes, trainers.\n'
        'Corps : head, arm, hand, leg, foot (feet), eyes, ears.\n'
        '« I’m wearing jeans. » « My leg hurts. » : j’ai mal à la jambe.',
        parties=[
            ('Les vêtements', [
                mots('Vêtements', ('a jumper', 'un pull'), ('trousers', 'un pantalon'), ('a coat', 'un manteau'), ('trainers', 'des baskets'), ('a cap', 'une casquette')),
                bq('« Trousers » est toujours :', ['au pluriel', 'au singulier', 'féminin'], 'Comme jeans.'),
            ]),
            ('Le corps', [
                mots('Corps', ('head', 'tête'), ('shoulder', 'épaule'), ('knee', 'genou'), ('foot / feet', 'pied / pieds'), ('My head hurts.', 'J’ai mal à la tête.')),
                {'type': 'piege', 'erreur': 'On dit « I have mal at my head ».', 'correction': 'On dit « My head hurts » ou « I’ve got a headache ».'},
            ]),
        ],
        a_toi=[
            q('« Knee » veut dire :', ['genou', 'cou', 'nez'], 'Au milieu de la jambe.'),
            q('« I’m wearing a coat. » veut dire :', ['Je porte un manteau.', 'J’achète un manteau.', 'Je range un manteau.'], 'Wear : porter.'),
            q('« J’ai mal au pied » se dit :', ['My foot hurts.', 'My foot is mal.', 'I hurt foot.'], 'Hurt : faire mal.'),
        ],
        sources=[ref('LV-C3-6E-VOC-05', 'Vêtements et corps')]),

    'LV-C3-6E-VOC-06': dict(duree=5, essentiel=
        'Les repas : breakfast (matin), lunch (midi), dinner (soir).\n'
        'Les besoins : I’m hungry (j’ai faim), I’m thirsty (j’ai soif), I’m tired (je suis fatigué).\n'
        'En anglais, ces besoins se disent avec be, pas avec have.',
        parties=[
            ('Repas et aliments', [
                mots('À table', ('breakfast', 'petit déjeuner'), ('lunch', 'déjeuner'), ('dinner', 'diner'), ('bread / cheese', 'pain / fromage'), ('chicken / fish', 'poulet / poisson'), ('vegetables / fruit', 'légumes / fruits')),
                bq('Le repas du soir se dit :', ['dinner', 'breakfast', 'lunch'], 'Dinner.'),
            ]),
            ('Exprimer un besoin', [
                {'type': 'explique', 'texte': '« I’m thirsty. Can I have some water, please? »'},
                {'type': 'piege', 'erreur': 'On traduit « j’ai faim » par « I have hungry ».', 'correction': 'On dit I am hungry, avec be.'},
            ]),
        ],
        a_toi=[
            q('« I’m thirsty » veut dire :', ['J’ai soif.', 'J’ai faim.', 'J’ai froid.'], 'Thirsty : soif.'),
            q('« J’ai froid » se dit :', ['I’m cold.', 'I have cold.', 'I’m hot.'], 'Avec be.'),
            q('« Vegetables » veut dire :', ['des légumes', 'des fruits', 'des gâteaux'], 'Carottes, haricots…'),
        ],
        sources=[ref('LV-C3-6E-VOC-06', 'La nourriture et les besoins')]),
}

ecrire(COURS)
