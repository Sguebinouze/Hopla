"""Lot de cours : anglais 5e (programme 2025), 4e et 3e (programme 2020). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-anglais-cycle4.py
    python3 scripts/cours/pages.py content/cours/LV-C4-*.json

Cycle 4 : phrases de 25 mots au plus (alerte), pas de bloc vocabulaire. Anglais britannique.
"""
from commun import bq, ecrire, q, source_referentiel as ref


def mots(titre, *paires):
    return {'type': 'tableau', 'titre': titre, 'colonnes': ['Anglais', 'Français'], 'lignes': [list(p) for p in paires]}


COURS = {
    # ---------------------------------------------------------------------- 5e
    'LV-C4-5E-UK-01': dict(duree=6, essentiel=
        'Le Royaume-Uni réunit quatre nations : l’Angleterre, l’Écosse, le pays de Galles et l’Irlande du Nord.\n'
        'C’est une monarchie parlementaire : le roi Charles III règne, le Parlement de Westminster vote les lois.\n'
        'Le drapeau, l’Union Jack, superpose les croix de saint Georges, saint André et saint Patrick.',
        parties=[
            ('Quatre nations', [
                {'type': 'tableau', 'titre': 'Les nations', 'colonnes': ['Nation', 'Capitale', 'Symbole'], 'lignes': [
                    ['England', 'London', 'la rose'], ['Scotland', 'Edinburgh', 'le chardon'], ['Wales', 'Cardiff', 'le poireau, la jonquille'], ['Northern Ireland', 'Belfast', 'le trèfle, le lin']]},
                bq('La Grande-Bretagne est :', ['l’ile qui porte l’Angleterre, l’Écosse et le pays de Galles', 'le nom de l’Angleterre seule', 'le Royaume-Uni avec l’Irlande'], 'L’Irlande du Nord est sur une autre ile.'),
            ]),
            ('Les institutions', [
                {'type': 'explique', 'texte': 'Le roi est le chef de l’État, mais il ne gouverne pas. Le gouvernement est dirigé par le Prime Minister, issu de la majorité à la House of Commons.'},
                {'type': 'piege', 'erreur': 'On emploie England pour parler de tout le Royaume-Uni.', 'correction': 'England est une seule nation. Le pays entier est the United Kingdom.'},
            ]),
        ],
        a_toi=[
            q('Le Parlement britannique siège à :', ['Westminster', 'Buckingham', 'Édimbourg'], 'À Londres.'),
            q('La croix de saint André représente :', ['l’Écosse', 'l’Angleterre', 'le pays de Galles'], 'Une croix blanche en X sur fond bleu.'),
            q('Au Royaume-Uni, le chef du gouvernement est :', ['le Prime Minister', 'le roi', 'le maire de Londres'], 'Le roi règne mais ne gouverne pas.'),
        ],
        sources=[ref('LV-C4-5E-UK-01', 'Le Royaume-Uni, ses nations et ses institutions')]),

    'LV-C4-5E-QUOT-01': dict(duree=5, essentiel=
        'Les saisons : spring, summer, autumn (fall en anglais américain), winter.\n'
        'Les repas : breakfast, lunch, dinner. Au Royaume-Uni, le déjeuner est souvent rapide : un sandwich ou un packed lunch.\n'
        'Pour décrire un mode de vie, on utilise le présent simple et les adverbes de fréquence.',
        parties=[
            ('Saisons et repas', [
                mots('Le quotidien', ('in spring', 'au printemps'), ('in autumn', 'en automne'), ('a packed lunch', 'un repas apporté de la maison'), ('a school bus', 'un bus scolaire'), ('the weekend', 'le weekend')),
                bq('« Fall » est le mot américain pour :', ['autumn', 'winter', 'spring'], 'Les feuilles tombent.'),
            ]),
            ('Décrire une journée', [
                {'type': 'explique', 'texte': '« In winter, Sam usually takes the bus to school. He has a packed lunch and gets home at four. »'},
                {'type': 'piege', 'erreur': 'On écrit « in the summer of » partout, ou « on spring ».', 'correction': 'Avec une saison, on emploie in : in spring, in summer.'},
            ]),
        ],
        a_toi=[
            q('« Lunch » est le repas de :', ['midi', 'du matin', 'du soir'], 'Le déjeuner.'),
            q('Quelle forme est juste ?', ['in winter', 'on winter', 'at winter'], 'In + saison.'),
            q('« He usually walks to school. » décrit :', ['une habitude', 'une action en cours', 'un projet'], 'Présent simple + usually.'),
        ],
        sources=[ref('LV-C4-5E-QUOT-01', 'Le quotidien et les saisons')]),

    'LV-C4-5E-ECOLE-01': dict(duree=5, essentiel=
        'Les matières : maths, English, history, geography, science, PE (sport), art, music.\n'
        'Beaucoup d’établissements britanniques imposent un uniforme : blazer, tie, jumper.\n'
        'Après les cours, les élèves rejoignent souvent des clubs : drama club, chess club, football team.',
        parties=[
            ('La vie scolaire', [
                mots('À l’école', ('a timetable', 'un emploi du temps'), ('a subject', 'une matière'), ('PE', 'l’EPS'), ('a uniform', 'un uniforme'), ('break', 'la récréation')),
                bq('« PE » désigne :', ['l’éducation physique', 'la physique', 'l’anglais'], 'Physical Education.'),
            ]),
            ('Les loisirs', [
                {'type': 'explique', 'texte': '« I’m in the drama club. We meet on Wednesdays after school. »'},
                {'type': 'piege', 'erreur': 'On écrit les matières avec une majuscule partout, comme « History ».', 'correction': 'Seules les langues prennent une majuscule : English, French, mais history.'},
            ]),
        ],
        a_toi=[
            q('« Break » à l’école est :', ['la récréation', 'la cantine', 'la sortie'], 'Une pause.'),
            q('Quelle matière prend toujours une majuscule ?', ['Spanish', 'maths', 'art'], 'Les langues.'),
            q('« Drama club » est un club de :', ['théâtre', 'cuisine', 'danse'], 'Drama : théâtre.'),
        ],
        sources=[ref('LV-C4-5E-ECOLE-01', 'École et loisirs')]),

    'LV-C4-5E-IMAG-01': dict(duree=5, essentiel=
        'La littérature de langue anglaise a créé des personnages connus dans le monde entier.\n'
        'Alice (Lewis Carroll) entre au Pays des merveilles, Peter Pan (J. M. Barrie) vit au Pays imaginaire.\n'
        'Sherlock Holmes (Arthur Conan Doyle) enquête dans un Londres bien réel.',
        parties=[
            ('Personnages et mondes', [
                {'type': 'tableau', 'titre': 'Des héros', 'colonnes': ['Personnage', 'Auteur', 'Monde'], 'lignes': [
                    ['Alice', 'Lewis Carroll', 'imaginaire : Wonderland'], ['Peter Pan', 'J. M. Barrie', 'imaginaire : Neverland'], ['Sherlock Holmes', 'Arthur Conan Doyle', 'réel : Londres, Baker Street'], ['Oliver Twist', 'Charles Dickens', 'réel : Londres pauvre']]},
                bq('Peter Pan vit à :', ['Neverland', 'Wonderland', 'Baker Street'], 'Le pays où l’on ne grandit pas.'),
            ]),
            ('Réel ou imaginaire ?', [
                {'type': 'methode', 'titre': 'Situer un récit', 'etapes': ['Repère les lieux : existent-ils vraiment ?', 'Repère les êtres : animaux qui parlent, fées ?', 'Conclus : monde réel, imaginaire, ou les deux.']},
                {'type': 'piege', 'erreur': 'On croit que Sherlock Holmes a existé.', 'correction': 'C’est un personnage inventé, placé dans un Londres réel.'},
            ]),
        ],
        a_toi=[
            q('Alice in Wonderland a été écrit par :', ['Lewis Carroll', 'Charles Dickens', 'J. M. Barrie'], 'En 1865.'),
            q('Sherlock Holmes est :', ['un détective', 'un pirate', 'un magicien'], 'Il enquête.'),
            q('Un monde où les animaux parlent est :', ['imaginaire', 'réel', 'historique'], 'Il n’existe pas.'),
        ],
        sources=[ref('LV-C4-5E-IMAG-01', 'Le réel et l’imaginaire')]),

    'LV-C4-5E-LANG-01': dict(duree=5, essentiel=
        'L’anglais se parle sur tous les continents, avec des accents et des mots différents.\n'
        'Anglais britannique et américain : flat / apartment, lift / elevator, biscuit / cookie, holiday / vacation.\n'
        'L’orthographe change aussi : colour / color, centre / center.',
        parties=[
            ('Deux variantes', [
                {'type': 'tableau', 'titre': 'Royaume-Uni et États-Unis', 'colonnes': ['Français', 'British English', 'American English'], 'lignes': [
                    ['appartement', 'flat', 'apartment'], ['ascenseur', 'lift', 'elevator'], ['vacances', 'holiday', 'vacation'], ['poubelle', 'bin', 'trash can'], ['football', 'football', 'soccer']]},
                bq('« Elevator » est un mot :', ['américain', 'britannique', 'australien'], 'Lift au Royaume-Uni.'),
            ]),
            ('Des traditions', [
                {'type': 'explique', 'texte': 'Thanksgiving se fête aux États-Unis, Burns Night en Écosse, Australia Day en Australie.'},
                {'type': 'piege', 'erreur': 'On pense qu’une seule version de l’anglais est correcte.', 'correction': 'Les deux sont correctes. On reste cohérent dans un même texte.'},
            ]),
        ],
        a_toi=[
            q('« Colour » est l’orthographe :', ['britannique', 'américaine', 'fautive'], 'Color aux États-Unis.'),
            q('« Vacation » veut dire :', ['vacances', 'vaccination', 'vocation'], 'Mot américain.'),
            q('Aux États-Unis, le football européen s’appelle :', ['soccer', 'football', 'rugby'], 'Football y désigne un autre sport.'),
        ],
        sources=[ref('LV-C4-5E-LANG-01', 'Une langue, des pays')]),

    'LV-C4-5E-PASSE-01': dict(duree=6, essentiel=
        'Le prétérit raconte une action terminée dans le passé : Yesterday, I visited my aunt.\n'
        'Verbes réguliers : -ed. Verbes irréguliers à apprendre : go → went, see → saw, have → had.\n'
        'Négation et question avec did : I didn’t go. Did you go?',
        parties=[
            ('Former le prétérit', [
                {'type': 'tableau', 'titre': 'Trois formes', 'colonnes': ['Forme', 'Régulier', 'Irrégulier'], 'lignes': [
                    ['affirmative', 'I played.', 'I went.'], ['négative', 'I didn’t play.', 'I didn’t go.'], ['interrogative', 'Did you play?', 'Did you go?']]},
                bq('« Last summer, we … to Spain. »', ['went', 'goed', 'go'], 'Go est irrégulier.'),
            ]),
            ('Repères de temps', [
                mots('Le passé', ('yesterday', 'hier'), ('last week', 'la semaine dernière'), ('two days ago', 'il y a deux jours'), ('in 2020', 'en 2020')),
                {'type': 'piege', 'erreur': 'On écrit « I didn’t went ».', 'correction': 'Après did, le verbe reste à la base : I didn’t go.'},
            ]),
        ],
        a_toi=[
            q('Le prétérit de « see » est :', ['saw', 'seed', 'seen'], 'Irrégulier.'),
            q('« Did you … the film? »', ['like', 'liked', 'likes'], 'Did + base verbale.'),
            q('« Two days ago » veut dire :', ['il y a deux jours', 'dans deux jours', 'depuis deux jours'], 'Ago : il y a.'),
        ],
        sources=[ref('LV-C4-5E-PASSE-01', 'Raconter au passé')]),

    'LV-C4-5E-FUT-01': dict(duree=5, essentiel=
        'I would like to + verbe exprime un souhait : I would like to visit New York.\n'
        'Will + verbe exprime une décision ou une prédiction : I’ll help you. It will rain tomorrow.\n'
        'Les marqueurs : tomorrow, next week, one day, in the future.',
        parties=[
            ('Souhait et futur', [
                mots('Projets', ('I’d like to be a vet.', 'J’aimerais être vétérinaire.'), ('I’ll call you tomorrow.', 'Je t’appellerai demain.'), ('One day, I will travel.', 'Un jour, je voyagerai.'), ('Will you come?', 'Viendras-tu ?')),
                bq('« I’ll » est la contraction de :', ['I will', 'I would', 'I all'], 'Will.'),
            ]),
            ('Will ne change pas', [
                {'type': 'piege', 'erreur': 'On écrit « She wills come » ou « I will to come ».', 'correction': 'Will + base verbale, sans -s ni to : she will come.'},
            ]),
        ],
        a_toi=[
            q('« I would like to learn Japanese. » exprime :', ['un souhait', 'une obligation', 'un regret'], 'Would like.'),
            q('Quelle phrase est juste ?', ['He will be late.', 'He wills be late.', 'He will to be late.'], 'Will + base.'),
            q('« Next week » veut dire :', ['la semaine prochaine', 'la semaine dernière', 'cette semaine'], 'Next : prochain.'),
        ],
        sources=[ref('LV-C4-5E-FUT-01', 'Souhaits et projets')]),

    'LV-C4-5E-GOUT-01': dict(duree=5, essentiel=
        'Les verbes de gout se suivent de -ing : I love reading, I can’t stand waiting.\n'
        'Des adjectifs nuancent : great, awesome, boring, awful.\n'
        'L’exclamation renforce : What a great film! How boring!',
        parties=[
            ('Une échelle de gouts', [
                mots('Du plus au moins', ('I’m crazy about…', 'je suis fou de…'), ('I love / I like…', 'j’adore / j’aime…'), ('I don’t mind…', 'ça ne me dérange pas…'), ('I can’t stand…', 'je ne supporte pas…')),
                bq('« I can’t stand rap. » veut dire :', ['Je ne supporte pas le rap.', 'Je ne peux pas danser sur du rap.', 'J’aime bien le rap.'], 'Can’t stand : ne pas supporter.'),
            ]),
            ('L’exclamation', [
                {'type': 'tableau', 'titre': 'What ou how ?', 'colonnes': ['Structure', 'Exemple'], 'lignes': [
                    ['What a + adjectif + nom', 'What a nice day!'], ['How + adjectif', 'How funny!']]},
                {'type': 'piege', 'erreur': 'On écrit « I like play football » sans -ing.', 'correction': 'Après like, love, hate : verbe en -ing. I like playing football.'},
            ]),
        ],
        a_toi=[
            q('« I love … books. »', ['reading', 'read', 'to reads'], 'Love + -ing.'),
            q('Quelle exclamation est juste ?', ['What a beautiful house!', 'How a beautiful house!', 'What beautiful a house!'], 'What a + adjectif + nom.'),
            q('« Boring » veut dire :', ['ennuyeux', 'génial', 'effrayant'], 'Le contraire d’interesting.'),
        ],
        sources=[ref('LV-C4-5E-GOUT-01', 'Gouts et préférences')]),

    'LV-C4-5E-INTER-01': dict(duree=5, essentiel=
        'Accord : I agree. You’re right. Désaccord : I don’t agree. I’m not sure.\n'
        'Permission : Can I…? May I…? Réponse : Yes, of course. Sorry, you can’t.\n'
        'Aide : Can you help me, please? Could you repeat, please?',
        parties=[
            ('Accord et désaccord', [
                mots('Réagir', ('I agree with you.', 'Je suis d’accord avec toi.'), ('I don’t agree.', 'Je ne suis pas d’accord.'), ('You’re right.', 'Tu as raison.'), ('I’m not sure.', 'Je ne suis pas sûr.')),
                bq('« You’re right » veut dire :', ['Tu as raison.', 'Tu es à droite.', 'Tu écris.'], 'Right : juste.'),
            ]),
            ('Permission et aide', [
                mots('En classe', ('May I open the window?', 'Puis-je ouvrir la fenêtre ?'), ('Could you repeat, please?', 'Pourriez-vous répéter ?'), ('How do you say « stylo » in English?', 'Comment dit-on « stylo » en anglais ?')),
                {'type': 'piege', 'erreur': 'On dit « I am agree ».', 'correction': 'Agree est un verbe : I agree, I don’t agree.'},
            ]),
        ],
        a_toi=[
            q('Quelle phrase est juste ?', ['I agree with you.', 'I am agree with you.', 'I agree you.'], 'Agree with.'),
            q('Pour demander poliment de répéter :', ['Could you repeat, please?', 'Repeat!', 'You repeat?'], 'Could… please.'),
            q('« May I go out? » sert à :', ['demander la permission', 'donner un ordre', 'exprimer un souhait'], 'May : permission polie.'),
        ],
        sources=[ref('LV-C4-5E-INTER-01', 'Accord, désaccord, aide')]),

    'LV-C4-5E-GRAM-01': dict(duree=5, essentiel=
        'Au présent simple, la question et la négation se forment avec do, ou does pour he, she, it.\n'
        'Do you like cats? Does she like cats? I don’t like cats. She doesn’t like cats.\n'
        'Après does et doesn’t, le verbe perd son -s.',
        parties=[
            ('Do ou does', [
                {'type': 'tableau', 'titre': 'Question et négation', 'colonnes': ['Sujet', 'Question', 'Négation'], 'lignes': [
                    ['I, you, we, they', 'Do you play?', 'We don’t play.'], ['he, she, it', 'Does he play?', 'He doesn’t play.']]},
                bq('« … your parents work on Saturdays? »', ['Do', 'Does', 'Are'], 'Parents : they.'),
            ]),
            ('Réponses courtes', [
                {'type': 'explique', 'texte': 'Does she speak German? Yes, she does. / No, she doesn’t.'},
                {'type': 'piege', 'erreur': 'On écrit « Does he likes music? ».', 'correction': 'Le -s est porté par does : Does he like music?'},
            ]),
        ],
        a_toi=[
            q('« My cat … eat fish. »', ['doesn’t', 'don’t', 'isn’t'], 'It : doesn’t.'),
            q('Réponse courte à « Do you swim? » :', ['Yes, I do.', 'Yes, I swim.', 'Yes, I am.'], 'Reprise de do.'),
            q('Quelle question est juste ?', ['Where does she live?', 'Where does she lives?', 'Where she lives?'], 'Does + base.'),
        ],
        sources=[ref('LV-C4-5E-GRAM-01', 'Do, does : négation et question')]),

    'LV-C4-5E-GRAM-02': dict(duree=6, essentiel=
        'Adjectif court : -er than, the -est. tall → taller than → the tallest.\n'
        'Adjectif long : more… than, the most… famous → more famous than → the most famous.\n'
        'Égalité : as… as. Irréguliers : good → better → the best, bad → worse → the worst.',
        parties=[
            ('Comparatif et superlatif', [
                {'type': 'tableau', 'titre': 'Comparer', 'colonnes': ['Adjectif', 'Comparatif', 'Superlatif'], 'lignes': [
                    ['tall', 'taller than', 'the tallest'], ['big', 'bigger than', 'the biggest'], ['happy', 'happier than', 'the happiest'], ['famous', 'more famous than', 'the most famous'], ['good', 'better than', 'the best']]},
                bq('« The Nile is … river in Africa. »', ['the longest', 'the most long', 'longer'], 'Adjectif court : -est.'),
            ]),
            ('L’égalité', [
                {'type': 'explique', 'texte': '« My brother is as tall as my father. » Ils ont la même taille.'},
                {'type': 'piege', 'erreur': 'On écrit « more tall » ou « gooder ».', 'correction': 'Adjectif court : taller. Irrégulier : better.'},
            ]),
        ],
        a_toi=[
            q('Le comparatif de « bad » est :', ['worse', 'badder', 'more bad'], 'Irrégulier.'),
            q('« This film is … than the book. »', ['more interesting', 'interestinger', 'most interesting'], 'Adjectif long.'),
            q('« As fast as » exprime :', ['l’égalité', 'la supériorité', 'l’infériorité'], 'Aussi… que.'),
        ],
        sources=[ref('LV-C4-5E-GRAM-02', 'Comparatif et superlatif')]),

    'LV-C4-5E-GRAM-03': dict(duree=4, essentiel=
        'Adverbes de fréquence : always, usually, often, sometimes, rarely, never.\n'
        'Ils se placent avant le verbe : I often play tennis.\n'
        'Mais après be : She is always late.',
        parties=[
            ('Du plus au moins fréquent', [
                mots('Fréquence', ('always', 'toujours'), ('usually', 'd’habitude'), ('often', 'souvent'), ('sometimes', 'parfois'), ('never', 'jamais')),
                bq('« I never eat meat. » veut dire :', ['Je ne mange jamais de viande.', 'Je mange souvent de la viande.', 'Je mange parfois de la viande.'], 'Never : jamais.'),
            ]),
            ('La place', [
                {'type': 'tableau', 'titre': 'Où placer l’adverbe ?', 'colonnes': ['Cas', 'Exemple'], 'lignes': [
                    ['avant le verbe', 'He often reads.'], ['après be', 'He is often tired.']]},
                {'type': 'piege', 'erreur': 'On écrit « I play often tennis ».', 'correction': 'L’adverbe se place avant le verbe : I often play tennis.'},
            ]),
        ],
        a_toi=[
            q('Quelle phrase est juste ?', ['She is never late.', 'She never is late.', 'She is late never.'], 'Après be.'),
            q('Quelle phrase est juste ?', ['We usually walk to school.', 'We walk usually to school.', 'Usually we walks to school.'], 'Avant le verbe.'),
            q('« Sometimes » veut dire :', ['parfois', 'souvent', 'toujours'], 'De temps en temps.'),
        ],
        sources=[ref('LV-C4-5E-GRAM-03', 'Les adverbes de fréquence')]),

    'LV-C4-5E-GRAM-04': dict(duree=5, essentiel=
        'Should exprime un conseil : You should sleep more. Shouldn’t, un conseil de ne pas faire.\n'
        'Could exprime une suggestion : You could ask your teacher.\n'
        'Comme tous les modaux, ils sont suivis du verbe sans to.',
        parties=[
            ('Conseiller', [
                mots('Conseils', ('You should drink water.', 'Tu devrais boire de l’eau.'), ('You shouldn’t eat so many sweets.', 'Tu ne devrais pas manger autant de bonbons.'), ('You could take the bus.', 'Tu pourrais prendre le bus.'), ('What should I do?', 'Que devrais-je faire ?')),
                bq('« You should see a doctor. » est :', ['un conseil', 'un ordre', 'une interdiction'], 'Should : conseil.'),
            ]),
            ('La construction', [
                {'type': 'piege', 'erreur': 'On écrit « You should to rest ».', 'correction': 'Pas de to après should : You should rest.'},
            ]),
        ],
        a_toi=[
            q('Quelle phrase est juste ?', ['He should study more.', 'He shoulds study more.', 'He should to study more.'], 'Should + base.'),
            q('« You could try again. » est :', ['une suggestion', 'une obligation', 'une interdiction'], 'Could : suggestion.'),
            q('« Tu ne devrais pas crier » se dit :', ['You shouldn’t shout.', 'You mustn’t shouting.', 'You don’t should shout.'], 'Shouldn’t.'),
        ],
        sources=[ref('LV-C4-5E-GRAM-04', 'Conseiller avec should et could')]),

    # ---------------------------------------------------------------------- 4e
    'LV-C4-4E-PASS-01': dict(duree=6, essentiel=
        'Le prétérit raconte un évènement terminé et daté : Last year, I went to Scotland.\n'
        'Le -ed se prononce /t/ (walked), /d/ (played) ou /ɪd/ après t ou d (visited, needed).\n'
        'Did forme la question et la négation, suivi de la base verbale.',
        parties=[
            ('Réguliers et irréguliers', [
                {'type': 'tableau', 'titre': 'Verbes irréguliers fréquents', 'colonnes': ['Base', 'Prétérit', 'Sens'], 'lignes': [
                    ['buy', 'bought', 'acheter'], ['eat', 'ate', 'manger'], ['take', 'took', 'prendre'], ['come', 'came', 'venir'], ['write', 'wrote', 'écrire']]},
                bq('« Yesterday, I … a new phone. »', ['bought', 'buyed', 'buy'], 'Buy est irrégulier.'),
            ]),
            ('Raconter', [
                {'type': 'methode', 'titre': 'Récit au passé', 'etapes': ['Situe le moment : last Saturday.', 'Enchaine : first, then, after that.', 'Conclus : in the end, it was great.']},
                {'type': 'piege', 'erreur': 'On prononce « visited » sans syllabe en plus.', 'correction': 'Après t ou d, -ed se prononce /ɪd/ : visit-id.'},
            ]),
        ],
        a_toi=[
            q('Le prétérit de « take » est :', ['took', 'taked', 'taken'], 'Irrégulier.'),
            q('Dans quel verbe -ed se prononce /ɪd/ ?', ['wanted', 'played', 'walked'], 'Après t.'),
            q('« We didn’t … the film. »', ['see', 'saw', 'seen'], 'Did + base.'),
        ],
        sources=[ref('LV-C4-4E-PASS-01', 'Raconter au prétérit')]),

    'LV-C4-4E-PRES-01': dict(duree=5, essentiel=
        'Le présent simple exprime une habitude ou une vérité : I play tennis on Mondays.\n'
        'Be + -ing exprime une action en cours : I am playing tennis now.\n'
        'Certains verbes d’état restent au présent simple : like, know, want, understand.',
        parties=[
            ('Habitude ou action en cours', [
                {'type': 'tableau', 'titre': 'Deux présents', 'colonnes': ['Présent', 'Emploi', 'Marqueurs'], 'lignes': [
                    ['simple', 'habitude, vérité', 'every day, usually, on Sundays'], ['be + -ing', 'action en cours', 'now, at the moment, look!']]},
                bq('« Listen! Someone … the piano. »', ['is playing', 'plays', 'play'], 'Listen! : en ce moment.'),
            ]),
            ('Verbes d’état', [
                {'type': 'explique', 'texte': 'On dit I know the answer, et pas I am knowing the answer.'},
                {'type': 'piege', 'erreur': 'On écrit « I am liking this song ».', 'correction': 'Like est un verbe d’état : I like this song.'},
            ]),
        ],
        a_toi=[
            q('« She … to school by bike every day. »', ['goes', 'is going', 'go'], 'Habitude.'),
            q('Quelle phrase est juste ?', ['I understand you.', 'I am understanding you.', 'I understanding you.'], 'Verbe d’état.'),
            q('« At the moment » appelle :', ['be + -ing', 'le présent simple', 'le prétérit'], 'En ce moment.'),
        ],
        sources=[ref('LV-C4-4E-PRES-01', 'Présent simple ou be + -ing')]),

    'LV-C4-4E-COMP-01': dict(duree=5, essentiel=
        'Comparatif : taller than, more expensive than. Superlatif : the tallest, the most expensive.\n'
        'Préférence : I prefer cats to dogs. I’d rather stay at home.\n'
        'Infériorité : less expensive than, not as tall as.',
        parties=[
            ('Comparer pour choisir', [
                mots('Préférences', ('I prefer tea to coffee.', 'Je préfère le thé au café.'), ('I’d rather read.', 'Je préfère lire.'), ('It’s cheaper than the other one.', 'C’est moins cher que l’autre.'), ('It’s the best film ever!', 'C’est le meilleur film du monde !')),
                bq('« I prefer summer … winter. »', ['to', 'than', 'that'], 'Prefer… to.'),
            ]),
            ('Moins que', [
                {'type': 'explique', 'texte': '« The train is less expensive than the plane. » « My room is not as big as yours. »'},
                {'type': 'piege', 'erreur': 'On écrit « more cheap than ».', 'correction': 'Cheap est court : cheaper than.'},
            ]),
        ],
        a_toi=[
            q('« Moins cher que » se dit :', ['less expensive than', 'more cheap than', 'less cheaper than'], 'Less + adjectif.'),
            q('« I’d rather » veut dire :', ['je préfèrerais', 'j’ai déjà', 'je dois'], 'Would rather.'),
            q('Le superlatif de « expensive » est :', ['the most expensive', 'the expensivest', 'the more expensive'], 'Adjectif long.'),
        ],
        sources=[ref('LV-C4-4E-COMP-01', 'Comparer et exprimer ses préférences')]),

    'LV-C4-4E-LIRE-01': dict(duree=5, essentiel=
        'Dans un document de la vie courante, on cherche une information précise sans tout traduire.\n'
        'Un menu : starters, main courses, desserts. Un horaire : departure, arrival, platform.\n'
        'Une annonce : for sale, free, opening hours.',
        parties=[
            ('Repérer l’information', [
                {'type': 'exemple-resolu', 'enonce': 'Horaire : « Train to York, departure 10:15, platform 4, arrival 12:40. » À quelle heure arrive le train ?', 'etapes': [
                    'Je cherche le mot qui veut dire arrivée : arrival.', 'Je lis l’heure à côté : 12:40.'],
                 'conclusion': 'Le train arrive à York à 12 h 40.'},
                bq('« Opening hours » indique :', ['les heures d’ouverture', 'le prix', 'l’adresse'], 'Open : ouvrir.'),
            ]),
            ('Mots utiles', [
                mots('Documents', ('starter', 'entrée'), ('main course', 'plat principal'), ('departure', 'départ'), ('for sale', 'à vendre'), ('free', 'gratuit, libre')),
                {'type': 'piege', 'erreur': 'On lit « free » comme « frais ».', 'correction': 'Free veut dire gratuit ou libre.'},
            ]),
        ],
        a_toi=[
            q('« Main course » est :', ['le plat principal', 'le cours principal', 'le dessert'], 'Au restaurant.'),
            q('« Departure » veut dire :', ['départ', 'arrivée', 'retard'], 'Le train part.'),
            q('« Free entry » veut dire :', ['entrée gratuite', 'entrée fraiche', 'sortie libre'], 'Free : gratuit.'),
        ],
        sources=[ref('LV-C4-4E-LIRE-01', 'Documents de la vie courante')]),

    'LV-C4-4E-PANN-01': dict(duree=4, essentiel=
        'Les panneaux publics sont courts : un ordre, une interdiction ou une information.\n'
        'Exit (sortie), No entry (entrée interdite), Wet floor (sol glissant), Out of order (en panne).\n'
        'À Londres, « Mind the gap » invite à faire attention à l’espace entre le quai et le métro.',
        parties=[
            ('Panneaux courants', [
                mots('Signes', ('Exit / Way out', 'Sortie'), ('No entry', 'Entrée interdite'), ('Push / Pull', 'Poussez / Tirez'), ('Out of order', 'En panne'), ('Keep off the grass', 'Pelouse interdite'), ('Mind the gap', 'Attention à la marche')),
                bq('« Out of order » sur une machine veut dire :', ['en panne', 'en ordre', 'en vente'], 'Elle ne marche pas.'),
            ]),
            ('Lire un panneau', [
                {'type': 'piege', 'erreur': 'On confond « Push » et « Pull ».', 'correction': 'Push : pousser. Pull : tirer.'},
            ]),
        ],
        a_toi=[
            q('« No entry » veut dire :', ['Entrée interdite', 'Pas d’entrée payante', 'Entrée libre'], 'Interdiction.'),
            q('« Wet floor » prévient d’un :', ['sol glissant', 'sol sale', 'sol fragile'], 'Wet : mouillé.'),
            q('« Keep off the grass » veut dire :', ['Ne marchez pas sur la pelouse.', 'Gardez l’herbe.', 'Tondez la pelouse.'], 'Keep off : rester à l’écart.'),
        ],
        sources=[ref('LV-C4-4E-PANN-01', 'Panneaux et signes')]),

    'LV-C4-4E-DIAL-01': dict(duree=5, essentiel=
        'Demander un chemin : Excuse me, how do I get to the station? Is it far?\n'
        'Indiquer : go straight on, turn left, take the second street on the right, it’s opposite the bank.\n'
        'Demander un prix ou un horaire : How much is a ticket? What time does the next bus leave?',
        parties=[
            ('Le chemin', [
                mots('Directions', ('Go straight on.', 'Allez tout droit.'), ('Turn left / right.', 'Tournez à gauche / droite.'), ('Take the first street on the left.', 'Prenez la première rue à gauche.'), ('It’s opposite the church.', 'C’est en face de l’église.'), ('It’s on the corner.', 'C’est au coin.')),
                bq('« Opposite » veut dire :', ['en face de', 'à côté de', 'derrière'], 'De l’autre côté.'),
            ]),
            ('Prix et horaire', [
                {'type': 'explique', 'texte': '« Excuse me, how much is a return ticket to Bath? » « It’s twenty pounds. »'},
                {'type': 'piege', 'erreur': 'On commence par « Hey you! » pour demander.', 'correction': 'On attire l’attention poliment : Excuse me…'},
            ]),
        ],
        a_toi=[
            q('« Go straight on » veut dire :', ['Allez tout droit.', 'Tournez à droite.', 'Faites demi-tour.'], 'Straight : droit.'),
            q('« A return ticket » est :', ['un aller-retour', 'un aller simple', 'un remboursement'], 'Return : retour.'),
            q('Pour demander poliment son chemin, on commence par :', ['Excuse me', 'Sorry for you', 'Hello you'], 'Excuse me.'),
        ],
        sources=[ref('LV-C4-4E-DIAL-01', 'Demander un renseignement')]),

    'LV-C4-4E-FUT-01': dict(duree=5, essentiel=
        'Be going to exprime un projet déjà décidé : I’m going to visit my cousins this summer.\n'
        'Will exprime une décision prise sur le moment ou une prédiction : I’ll answer the phone.\n'
        'Be going to sert aussi quand un indice annonce la suite : Look at the clouds, it’s going to rain.',
        parties=[
            ('Going to ou will', [
                {'type': 'tableau', 'titre': 'Deux futurs', 'colonnes': ['Forme', 'Emploi', 'Exemple'], 'lignes': [
                    ['be going to', 'projet décidé, indice présent', 'I’m going to learn the guitar.'], ['will', 'décision immédiate, prédiction', 'I’ll help you. People will live on Mars.']]},
                bq('Le téléphone sonne : « I … get it! »', ['’ll', '’m going to', 'am'], 'Décision sur le moment.'),
            ]),
            ('Parler de ses projets', [
                {'type': 'explique', 'texte': '« Next year, I’m going to join a football club. I think I’ll love it. »'},
                {'type': 'piege', 'erreur': 'On oublie be : « I going to travel ».', 'correction': 'Be est obligatoire : I am going to travel.'},
            ]),
        ],
        a_toi=[
            q('« She … study medicine. » (projet décidé)', ['is going to', 'will to', 'goes to'], 'Be going to.'),
            q('« I think it will snow. » est :', ['une prédiction', 'un projet décidé', 'une habitude'], 'Will : prédiction.'),
            q('Quelle phrase est juste ?', ['We are going to move.', 'We going to move.', 'We are going move.'], 'Be + going to + base.'),
        ],
        sources=[ref('LV-C4-4E-FUT-01', 'Parler de ses projets')]),

    'LV-C4-4E-CULT-01': dict(duree=5, essentiel=
        'Chaque pays anglophone a sa monnaie : la livre sterling au Royaume-Uni, le dollar aux États-Unis, l’euro en Irlande.\n'
        'Des lieux connus : la statue de la Liberté à New York, l’opéra de Sydney, les Highlands en Écosse.\n'
        'Voyager de façon responsable : prendre le train quand c’est possible, respecter les lieux et les habitants.',
        parties=[
            ('Repères', [
                {'type': 'tableau', 'titre': 'Pays anglophones', 'colonnes': ['Pays', 'Capitale', 'Monnaie'], 'lignes': [
                    ['United Kingdom', 'London', 'pound sterling'], ['Ireland', 'Dublin', 'euro'], ['United States', 'Washington, D.C.', 'US dollar'], ['Canada', 'Ottawa', 'Canadian dollar'], ['Australia', 'Canberra', 'Australian dollar']]},
                bq('En Irlande, on paie en :', ['euros', 'livres sterling', 'dollars'], 'L’Irlande est dans la zone euro.'),
            ]),
            ('Voyager responsable', [
                mots('Gestes', ('Take the train.', 'Prends le train.'), ('Respect local customs.', 'Respecte les coutumes locales.'), ('Don’t leave litter.', 'Ne laisse pas de déchets.')),
                {'type': 'piege', 'erreur': 'On croit que la capitale de l’Australie est Sydney.', 'correction': 'C’est Canberra. Sydney est la plus grande ville.'},
            ]),
        ],
        a_toi=[
            q('La capitale du Canada est :', ['Ottawa', 'Toronto', 'Montréal'], 'Pas la plus grande ville.'),
            q('La statue de la Liberté se trouve à :', ['New York', 'Washington', 'Boston'], 'Offerte par la France.'),
            q('« Litter » veut dire :', ['des déchets', 'une lettre', 'une litière'], 'Don’t leave litter.'),
        ],
        sources=[ref('LV-C4-4E-CULT-01', 'Voyages dans les pays anglophones')]),

    'LV-C4-4E-QUANT-01': dict(duree=5, essentiel=
        'Many et a few vont avec un nom dénombrable : many friends, a few apples.\n'
        'Much et a little vont avec un nom indénombrable : much money, a little water.\n'
        'A lot of va avec les deux. Some s’emploie à l’affirmative, any à la négative et dans les questions.',
        parties=[
            ('Dénombrable ou non', [
                {'type': 'tableau', 'titre': 'Quantités', 'colonnes': ['Quantité', 'Dénombrable', 'Indénombrable'], 'lignes': [
                    ['beaucoup', 'many / a lot of', 'much / a lot of'], ['un peu', 'a few', 'a little'], ['du, des', 'some / any', 'some / any']]},
                bq('« There isn’t … milk. »', ['much', 'many', 'a few'], 'Milk est indénombrable.'),
            ]),
            ('Some et any', [
                {'type': 'explique', 'texte': 'I’ve got some bread. I haven’t got any bread. Have you got any bread?'},
                {'type': 'piege', 'erreur': 'On écrit « many informations » ou « an advice ».', 'correction': 'Information et advice sont indénombrables : much information, some advice.'},
            ]),
        ],
        a_toi=[
            q('« How … brothers have you got? »', ['many', 'much', 'little'], 'Brothers se comptent.'),
            q('« Are there … eggs? »', ['any', 'some', 'much'], 'Question : any.'),
            q('« A little » s’emploie avec :', ['un nom indénombrable', 'un nom au pluriel', 'un verbe'], 'A little sugar.'),
        ],
        sources=[ref('LV-C4-4E-QUANT-01', 'Exprimer la quantité')]),

    'LV-C4-4E-PRON-01': dict(duree=5, essentiel=
        'Pronoms compléments : me, you, him, her, it, us, them. Ils se placent après le verbe ou la préposition.\n'
        'Pronoms réfléchis : myself, yourself, himself, herself, itself, ourselves, yourselves, themselves.\n'
        'Le réfléchi s’emploie quand le sujet agit sur lui-même : She hurt herself.',
        parties=[
            ('Compléments', [
                {'type': 'tableau', 'titre': 'Pronoms', 'colonnes': ['Sujet', 'Complément', 'Réfléchi'], 'lignes': [
                    ['I', 'me', 'myself'], ['he', 'him', 'himself'], ['she', 'her', 'herself'], ['we', 'us', 'ourselves'], ['they', 'them', 'themselves']]},
                bq('« Ask … ! » (les enfants)', ['them', 'they', 'their'], 'Complément pluriel.'),
            ]),
            ('Réfléchis', [
                {'type': 'explique', 'texte': '« Did you make this cake yourself? » « Enjoy yourselves! »'},
                {'type': 'piege', 'erreur': 'On traduit « je me lève » par « I get myself up ».', 'correction': 'Beaucoup de verbes pronominaux français ne le sont pas en anglais : I get up.'},
            ]),
        ],
        a_toi=[
            q('« He cut … with a knife. »', ['himself', 'him', 'hisself'], 'Il s’est coupé.'),
            q('« Can you help … ? » (moi)', ['me', 'I', 'myself'], 'Complément.'),
            q('« Je me lave » se dit le plus souvent :', ['I wash.', 'I wash me.', 'I me wash.'], 'Le réfléchi n’est pas utile ici.'),
        ],
        sources=[ref('LV-C4-4E-PRON-01', 'Pronoms compléments et réfléchis')]),

    'LV-C4-4E-ART-01': dict(duree=5, essentiel=
        'A devant un son consonne (a dog), an devant un son voyelle (an apple, an hour).\n'
        'The désigne une chose précise ou déjà connue : the dog in the garden.\n'
        'Pas d’article pour une généralité, un repas, un sport ou la plupart des pays : I like dogs. I play tennis. France.',
        parties=[
            ('A, an, the', [
                {'type': 'tableau', 'titre': 'Choisir l’article', 'colonnes': ['Cas', 'Exemple'], 'lignes': [
                    ['son consonne', 'a book, a university'], ['son voyelle', 'an egg, an hour'], ['chose précise', 'the book on the table'], ['généralité', 'Books are useful.']]},
                bq('« … hour ago »', ['an', 'a', 'the'], 'Le h ne se prononce pas.'),
            ]),
            ('Sans article', [
                mots('Pas d’article', ('I have breakfast at seven.', 'repas'), ('She plays football.', 'sport'), ('Cats are cute.', 'généralité'), ('I live in France.', 'pays')),
                {'type': 'piege', 'erreur': 'On écrit « I love the chocolate » pour une généralité.', 'correction': 'Généralité : pas d’article. I love chocolate.'},
            ]),
        ],
        a_toi=[
            q('« She is … engineer. »', ['an', 'a', 'the'], 'Son voyelle.'),
            q('Quelle phrase est juste ?', ['I play basketball.', 'I play the basketball.', 'I play a basketball.'], 'Sport : pas d’article.'),
            q('Quel pays prend « the » ?', ['the United States', 'the France', 'the Spain'], 'Les noms au pluriel ou composés de United.'),
        ],
        sources=[ref('LV-C4-4E-ART-01', 'A, an, the ou rien')]),

    # ---------------------------------------------------------------------- 3e
    'LV-C4-3E-PERF-01': dict(duree=6, essentiel=
        'Le present perfect (have + participe passé) relie le passé au présent : I have visited London.\n'
        'Il sert à parler d’une expérience (ever, never) ou d’une durée avec since (point de départ) et for (durée).\n'
        'Si le moment est daté (yesterday, in 2020), on emploie le prétérit.',
        parties=[
            ('Former le present perfect', [
                {'type': 'tableau', 'titre': 'Have + participe passé', 'colonnes': ['Forme', 'Exemple'], 'lignes': [
                    ['affirmative', 'She has seen this film.'], ['négative', 'I haven’t finished.'], ['interrogative', 'Have you ever been to Ireland?']]},
                bq('« I … my keys! » (je ne les ai plus)', ['have lost', 'lost', 'am losing'], 'Conséquence dans le présent.'),
            ]),
            ('Since ou for', [
                {'type': 'tableau', 'titre': 'Depuis', 'colonnes': ['Mot', 'Suivi de', 'Exemple'], 'lignes': [
                    ['since', 'un point de départ', 'since 2022, since Monday'], ['for', 'une durée', 'for three years, for a week']]},
                {'type': 'piege', 'erreur': 'On écrit « I live here since 2020 ».', 'correction': 'Avec since, on emploie le present perfect : I have lived here since 2020.'},
            ]),
            ('Present perfect ou prétérit', [
                {'type': 'explique', 'texte': 'I have been to Rome (expérience, sans date). I went to Rome last year (moment précis).'},
            ]),
        ],
        a_toi=[
            q('« She has worked here … ten years. »', ['for', 'since', 'during'], 'Une durée.'),
            q('« We … to Spain in 2023. »', ['went', 'have gone', 'have been'], 'Date précise : prétérit.'),
            q('« Have you ever … sushi? »', ['eaten', 'ate', 'eat'], 'Participe passé.'),
        ],
        sources=[ref('LV-C4-3E-PERF-01', 'Le present perfect')]),

    'LV-C4-3E-MOD-01': dict(duree=6, essentiel=
        'Should : conseil. Must ou have to : obligation. Mustn’t : interdiction. Don’t have to : absence d’obligation.\n'
        'May et might : possibilité. Must : forte probabilité. Can’t : impossibilité logique.\n'
        'Les modaux sont suivis de la base verbale, sans to.',
        parties=[
            ('Obligation et conseil', [
                {'type': 'tableau', 'titre': 'Modaux', 'colonnes': ['Modal', 'Sens', 'Exemple'], 'lignes': [
                    ['should', 'conseil', 'You should rest.'], ['must / have to', 'obligation', 'You must wear a seatbelt.'], ['mustn’t', 'interdiction', 'You mustn’t smoke here.'], ['don’t have to', 'pas obligatoire', 'You don’t have to come.']]},
                bq('« You don’t have to pay. » veut dire :', ['Ce n’est pas obligatoire de payer.', 'Il est interdit de payer.', 'Tu dois payer.'], 'Absence d’obligation.'),
            ]),
            ('Probabilité', [
                {'type': 'tableau', 'titre': 'Du moins au plus sûr', 'colonnes': ['Modal', 'Degré', 'Exemple'], 'lignes': [
                    ['might', 'possible', 'It might rain.'], ['may', 'possible', 'She may be at home.'], ['must', 'très probable', 'He must be tired.'], ['can’t', 'impossible', 'It can’t be true.']]},
                {'type': 'piege', 'erreur': 'On confond « mustn’t » et « don’t have to ».', 'correction': 'Mustn’t : c’est interdit. Don’t have to : ce n’est pas nécessaire.'},
            ]),
        ],
        a_toi=[
            q('« He has run for hours. He … be exhausted. »', ['must', 'mustn’t', 'shouldn’t'], 'Déduction forte.'),
            q('« Tu ne dois pas toucher ça » se dit :', ['You mustn’t touch that.', 'You don’t have to touch that.', 'You might not touch that.'], 'Interdiction.'),
            q('« It might snow. » exprime :', ['une possibilité', 'une certitude', 'une obligation'], 'Might.'),
        ],
        sources=[ref('LV-C4-3E-MOD-01', 'Les modaux')]),

    'LV-C4-3E-PASS-01': dict(duree=5, essentiel=
        'Le passif met en avant ce qui subit l’action : be + participe passé.\n'
        'L’auteur de l’action est introduit par by : The Mona Lisa was painted by Leonardo da Vinci.\n'
        'Be porte le temps : is made (présent), was built (prétérit), will be opened (futur).',
        parties=[
            ('Former le passif', [
                {'type': 'tableau', 'titre': 'Actif et passif', 'colonnes': ['Actif', 'Passif'], 'lignes': [
                    ['Shakespeare wrote Hamlet.', 'Hamlet was written by Shakespeare.'], ['They make cars here.', 'Cars are made here.'], ['They will open the museum.', 'The museum will be opened.']]},
                bq('« The Eiffel Tower … in 1889. »', ['was built', 'built', 'is building'], 'Passif au prétérit.'),
            ]),
            ('Avec ou sans by', [
                {'type': 'explique', 'texte': 'Quand l’auteur est inconnu ou évident, on l’omet : My bike was stolen.'},
                {'type': 'piege', 'erreur': 'On oublie be : « The window broken by Tom ».', 'correction': 'Be est obligatoire : The window was broken by Tom.'},
            ]),
        ],
        a_toi=[
            q('Le passif de « They speak English here » :', ['English is spoken here.', 'English speaks here.', 'English was speak here.'], 'Be + participe passé.'),
            q('Dans un passif, l’auteur est introduit par :', ['by', 'of', 'from'], 'By.'),
            q('« My phone … » (on me l’a volé hier)', ['was stolen', 'stole', 'is stealing'], 'Prétérit passif.'),
        ],
        sources=[ref('LV-C4-3E-PASS-01', 'Le passif')]),

    'LV-C4-3E-REL-01': dict(duree=6, essentiel=
        'Les relatifs : who pour une personne, which pour une chose, where pour un lieu, whose pour la possession.\n'
        'Les connecteurs : because (cause), so (conséquence), but et although (opposition), however (cependant).\n'
        'Ils relient les idées et rendent un texte plus clair.',
        parties=[
            ('Les relatifs', [
                {'type': 'tableau', 'titre': 'Relier deux phrases', 'colonnes': ['Relatif', 'Pour', 'Exemple'], 'lignes': [
                    ['who', 'une personne', 'the girl who lives next door'], ['which', 'une chose', 'the book which I read'], ['where', 'un lieu', 'the town where I was born'], ['whose', 'la possession', 'the boy whose dog is lost']]},
                bq('« The woman … car is red is my aunt. »', ['whose', 'who', 'which'], 'La voiture de la femme.'),
            ]),
            ('Les connecteurs', [
                mots('Relier des idées', ('because', 'parce que'), ('so', 'donc'), ('although', 'bien que'), ('however', 'cependant'), ('as a result', 'par conséquent')),
                {'type': 'piege', 'erreur': 'On emploie which pour une personne.', 'correction': 'Pour une personne : who. The teacher who…'},
            ]),
        ],
        a_toi=[
            q('« This is the house … I grew up. »', ['where', 'which', 'who'], 'Un lieu.'),
            q('« It was raining, … we stayed home. »', ['so', 'because', 'although'], 'Conséquence.'),
            q('« … it was late, she kept working. »', ['Although', 'Because', 'So'], 'Opposition.'),
        ],
        sources=[ref('LV-C4-3E-REL-01', 'Relatifs et connecteurs')]),

    'LV-C4-3E-IND-01': dict(duree=6, essentiel=
        'Le discours indirect rapporte des paroles : He said (that) he was tired.\n'
        'Après un verbe au passé, les temps reculent : present → prétérit, will → would, can → could.\n'
        'Une question rapportée garde l’ordre sujet + verbe : She asked where I lived.',
        parties=[
            ('Rapporter une phrase', [
                {'type': 'tableau', 'titre': 'Direct et indirect', 'colonnes': ['Direct', 'Indirect'], 'lignes': [
                    ['« I am hungry. »', 'He said he was hungry.'], ['« I will come. »', 'She said she would come.'], ['« I can swim. »', 'He said he could swim.'], ['« I saw it. »', 'She said she had seen it.']]},
                bq('« I like pizza », said Tom. → Tom said he … pizza.', ['liked', 'likes', 'like'], 'Recul du temps.'),
            ]),
            ('Rapporter une question', [
                {'type': 'explique', 'texte': '« Where do you live? » → She asked me where I lived. « Are you ready? » → He asked if I was ready.'},
                {'type': 'piege', 'erreur': 'On garde l’ordre de la question : « She asked where did I live ».', 'correction': 'Ordre affirmatif : She asked where I lived.'},
            ]),
        ],
        a_toi=[
            q('« I will help you. » → She said she … help me.', ['would', 'will', 'can'], 'Will devient would.'),
            q('Quelle phrase est juste ?', ['He asked me what time it was.', 'He asked me what time was it.', 'He asked me what time is it?'], 'Ordre sujet + verbe.'),
            q('« Do you like jazz? » → He asked … I liked jazz.', ['if', 'that', 'what'], 'Question fermée : if.'),
        ],
        sources=[ref('LV-C4-3E-IND-01', 'Le discours indirect')]),

    'LV-C4-3E-OPIN-01': dict(duree=5, essentiel=
        'Donner son avis : I think that…, In my opinion…, As far as I’m concerned…\n'
        'Accord et désaccord : I agree with you. I totally disagree. I see your point, but…\n'
        'Argumenter : firstly, secondly, for example, that’s why.',
        parties=[
            ('Exprimer un avis', [
                mots('Opinion', ('In my opinion,…', 'À mon avis,…'), ('I strongly believe that…', 'Je crois fermement que…'), ('I see your point, but…', 'Je comprends ton idée, mais…'), ('I totally disagree.', 'Je ne suis pas du tout d’accord.')),
                bq('« I see your point, but… » sert à :', ['nuancer avant de contredire', 'approuver totalement', 'changer de sujet'], 'On reconnait l’idée de l’autre.'),
            ]),
            ('Construire un argument', [
                {'type': 'methode', 'titre': 'Un paragraphe argumenté', 'etapes': ['Annonce ton avis : In my opinion, school uniforms are useful.', 'Donne une raison : Firstly, everybody looks the same.', 'Illustre : For example, nobody is judged on their clothes.', 'Conclus : That’s why I support them.']},
                {'type': 'piege', 'erreur': 'On écrit « According to me ».', 'correction': 'On dit In my opinion ou I think.'},
            ]),
        ],
        a_toi=[
            q('« À mon avis » se dit :', ['In my opinion', 'According to me', 'For my opinion'], 'Tournure correcte.'),
            q('« That’s why » introduit :', ['une conséquence', 'un exemple', 'une opposition'], 'C’est pourquoi.'),
            q('Quelle phrase exprime un désaccord ?', ['I don’t agree at all.', 'I couldn’t agree more.', 'You’re absolutely right.'], 'Pas du tout d’accord.'),
        ],
        sources=[ref('LV-C4-3E-OPIN-01', 'Donner son avis')]),

    'LV-C4-3E-LIRE-01': dict(duree=5, essentiel=
        'Une lettre amicale commence par Dear… ou Hi… et se termine par Love, Best wishes ou See you soon.\n'
        'On y repère le récit (au prétérit), les sentiments (I was so happy, I miss you) et les souhaits (I hope, I can’t wait to).\n'
        'Le contexte aide à comprendre les mots inconnus.',
        parties=[
            ('Lire une lettre', [
                {'type': 'exemple-resolu', 'enonce': '« Dear Lou, last week we moved to Leeds. I miss you so much! I hope you can visit in July. I can’t wait to see you. Love, Mia »', 'etapes': [
                    'Récit : la famille de Mia a déménagé à Leeds.', 'Sentiment : Lou lui manque (I miss you).', 'Souhait : elle espère une visite en juillet.'],
                 'conclusion': 'Mia raconte son déménagement, dit que son amie lui manque et l’invite.'},
                bq('« I miss you » veut dire :', ['Tu me manques.', 'Je te rate.', 'Je t’attends.'], 'Attention au sens.'),
            ]),
            ('Exprimer des sentiments', [
                mots('Sentiments et souhaits', ('I was so excited.', 'J’étais très impatient.'), ('I felt lonely.', 'Je me sentais seul.'), ('I hope you’re well.', 'J’espère que tu vas bien.'), ('I can’t wait to…', 'J’ai hâte de…')),
                {'type': 'piege', 'erreur': 'On traduit « I miss you » par « je te manque ».', 'correction': 'C’est l’inverse : tu me manques.'},
            ]),
        ],
        a_toi=[
            q('« I can’t wait to see you » veut dire :', ['J’ai hâte de te voir.', 'Je ne peux pas te voir.', 'Je ne veux pas attendre.'], 'Impatience.'),
            q('Une formule de fin de lettre amicale :', ['Best wishes', 'Dear Sir', 'To whom it may concern'], 'Les autres sont formelles.'),
            q('« Lonely » veut dire :', ['seul, isolé', 'joyeux', 'aimé'], 'Un sentiment.'),
        ],
        sources=[ref('LV-C4-3E-LIRE-01', 'Lettres et récits')]),

    'LV-C4-3E-SOC-01': dict(duree=5, essentiel=
        'Au Royaume-Uni, beaucoup d’élèves portent un uniforme ; le collège français correspond à peu près à secondary school.\n'
        'Aux États-Unis, les classes s’appellent grades : middle school puis high school, souvent avec un bus scolaire jaune.\n'
        'Comparer des systèmes, c’est repérer ressemblances et différences, sans juger.',
        parties=[
            ('Trois écoles', [
                {'type': 'tableau', 'titre': 'Comparer', 'colonnes': ['Critère', 'France', 'Royaume-Uni', 'États-Unis'], 'lignes': [
                    ['après le primaire', 'collège puis lycée', 'secondary school', 'middle school puis high school'], ['tenue', 'libre en général', 'uniforme fréquent', 'libre en général, parfois uniforme'], ['repas', 'cantine', 'school dinner ou packed lunch', 'cafeteria']]},
                bq('Aux États-Unis, une classe s’appelle :', ['a grade', 'a year', 'a form'], 'Seventh grade, eighth grade…'),
            ]),
            ('Comparer à l’oral', [
                {'type': 'explique', 'texte': '« In France, we don’t wear a uniform, whereas many British pupils do. »'},
                {'type': 'piege', 'erreur': 'On généralise : « All American pupils take the yellow bus. »', 'correction': 'On nuance : many, most, often.'},
            ]),
        ],
        a_toi=[
            q('« Whereas » exprime :', ['une opposition', 'une cause', 'un lieu'], 'Alors que.'),
            q('« High school » correspond plutôt au :', ['lycée', 'primaire', 'collège seul'], 'Les dernières années.'),
            q('Pour nuancer une comparaison, on dit :', ['many pupils', 'all pupils', 'every pupil'], 'Pas de généralité abusive.'),
        ],
        sources=[ref('LV-C4-3E-SOC-01', 'École et société')]),

    'LV-C4-3E-ENV-01': dict(duree=5, essentiel=
        'Pour parler d’environnement : climate change, pollution, waste, recycling, renewable energy.\n'
        'Des gestes : reduce, reuse, recycle ; save energy ; use public transport.\n'
        'Pour proposer : We should…, Why don’t we…?, It’s important to…',
        parties=[
            ('Le vocabulaire', [
                mots('Environnement', ('climate change', 'changement climatique'), ('waste', 'déchets, gaspillage'), ('renewable energy', 'énergie renouvelable'), ('plastic bottles', 'bouteilles en plastique'), ('to save energy', 'économiser l’énergie')),
                bq('« Reduce, reuse, recycle » veut dire :', ['réduire, réutiliser, recycler', 'réparer, revendre, recycler', 'refuser, ranger, recycler'], 'Les trois R.'),
            ]),
            ('Proposer des actions', [
                {'type': 'explique', 'texte': '« Why don’t we start a recycling club at school? We should also turn off the lights when we leave. »'},
                {'type': 'piege', 'erreur': 'On écrit « the pollution is a problem » pour une généralité.', 'correction': 'Généralité : pas d’article. Pollution is a problem.'},
            ]),
        ],
        a_toi=[
            q('« Waste » veut dire :', ['déchets, gaspillage', 'eau', 'vent'], 'Don’t waste water.'),
            q('« Why don’t we…? » sert à :', ['proposer', 'interdire', 'raconter'], 'Une suggestion.'),
            q('L’énergie solaire est :', ['renewable', 'polluting', 'wasteful'], 'Renouvelable.'),
        ],
        sources=[ref('LV-C4-3E-ENV-01', 'The environment')]),

    'LV-C4-3E-CONS-01': dict(duree=6, essentiel=
        'Want / would like + personne + to + verbe : I want you to come. She’d like me to help.\n'
        'Make + personne + base verbale : obliger. Let + personne + base verbale : laisser, permettre.\n'
        'Enjoy, stop, finish + -ing : I enjoy reading. Stop talking!',
        parties=[
            ('Vouloir que quelqu’un fasse', [
                {'type': 'explique', 'texte': 'Le français dit « je veux que tu viennes ». L’anglais dit I want you to come, sans that.'},
                bq('« Mes parents veulent que je travaille » :', ['My parents want me to work.', 'My parents want that I work.', 'My parents want I work.'], 'Want + me + to.'),
            ]),
            ('Make et let', [
                {'type': 'tableau', 'titre': 'Faire faire, laisser faire', 'colonnes': ['Verbe', 'Sens', 'Exemple'], 'lignes': [
                    ['make', 'obliger', 'My mum makes me tidy my room.'], ['let', 'permettre', 'My dad lets me stay up late.'], ['enjoy + -ing', 'aimer faire', 'I enjoy swimming.'], ['stop + -ing', 'arrêter de', 'Stop shouting!']]},
                {'type': 'piege', 'erreur': 'On écrit « She made me to clean » ou « I enjoy to dance ».', 'correction': 'Make + base : made me clean. Enjoy + -ing : enjoy dancing.'},
            ]),
        ],
        a_toi=[
            q('« The teacher let us … early. »', ['leave', 'to leave', 'leaving'], 'Let + base verbale.'),
            q('« I’d like you … me. »', ['to help', 'help', 'helping'], 'Would like + personne + to.'),
            q('« He finished … his homework. »', ['doing', 'to do', 'do'], 'Finish + -ing.'),
        ],
        sources=[ref('LV-C4-3E-CONS-01', 'Want someone to, make, let')]),
}

ecrire(COURS)
