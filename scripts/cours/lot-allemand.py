"""Lot de cours : allemand 5e (programme 2025), 4e et 3e (programme 2020). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-allemand.py
    python3 scripts/cours/pages.py content/cours/AL-C4-*.json

Cycle 4 : phrases de 25 mots au plus (alerte), pas de bloc vocabulaire.
"""
from commun import bq, ecrire, q, source_referentiel as ref


def mots(titre, *paires):
    return {'type': 'tableau', 'titre': titre, 'colonnes': ['Allemand', 'Français'], 'lignes': [list(p) for p in paires]}


COURS = {
    # ---------------------------------------------------------------------- 5e
    'AL-C4-5E-PRES-01': dict(duree=5, essentiel=
        'Se présenter : Ich heiße Léa. Ich bin zwölf Jahre alt. Ich komme aus Frankreich. Ich wohne in Lyon.\n'
        'Les questions : Wie heißt du? Wie alt bist du? Woher kommst du? Wo wohnst du?\n'
        'En allemand, tous les noms prennent une majuscule : das Jahr, die Stadt.',
        parties=[
            ('Se présenter', [
                mots('Questions et réponses', ('Wie heißt du?', 'Comment t’appelles-tu ?'), ('Wie alt bist du?', 'Quel âge as-tu ?'), ('Woher kommst du?', 'D’où viens-tu ?'), ('Wo wohnst du?', 'Où habites-tu ?')),
                bq('« Ich bin dreizehn Jahre alt. » donne :', ['l’âge', 'le nom', 'la ville'], 'Jahre alt : ans.'),
            ]),
            ('Wo ou woher ?', [
                {'type': 'explique', 'texte': 'Wo : où l’on est. Woher : d’où l’on vient. Ich wohne in Paris, aber ich komme aus Marseille.'},
                {'type': 'piege', 'erreur': 'On répond « Ich habe zwölf Jahre » pour l’âge.', 'correction': 'L’âge se dit avec sein : Ich bin zwölf Jahre alt.'},
            ]),
        ],
        a_toi=[
            q('« Woher kommst du? » veut dire :', ['D’où viens-tu ?', 'Où habites-tu ?', 'Comment vas-tu ?'], 'Woher : d’où.'),
            q('« J’habite à Nantes » se dit :', ['Ich wohne in Nantes.', 'Ich komme in Nantes.', 'Ich bin aus Nantes.'], 'Wohnen : habiter.'),
            q('En allemand, les noms communs prennent :', ['une majuscule', 'une minuscule', 'un accent'], 'Das Haus, die Schule.'),
        ],
        sources=[ref('AL-C4-5E-PRES-01', 'Se présenter')]),

    'AL-C4-5E-PRAES-01': dict(duree=6, essentiel=
        'Au présent, la terminaison change avec le sujet : ich wohne, du wohnst, er wohnt, wir wohnen, ihr wohnt, sie wohnen.\n'
        'Sein et haben sont irréguliers : ich bin, du bist, er ist ; ich habe, du hast, er hat.\n'
        'Sie avec une majuscule est le vouvoiement : Wohnen Sie hier?',
        parties=[
            ('Les terminaisons', [
                {'type': 'tableau', 'titre': 'Présent', 'colonnes': ['Sujet', 'wohnen', 'sein', 'haben'], 'lignes': [
                    ['ich', 'wohne', 'bin', 'habe'], ['du', 'wohnst', 'bist', 'hast'], ['er, sie, es', 'wohnt', 'ist', 'hat'], ['wir', 'wohnen', 'sind', 'haben'], ['ihr', 'wohnt', 'seid', 'habt']]},
                bq('« Du … einen Hund. »', ['hast', 'hat', 'habe'], 'Du : -st.'),
            ]),
            ('Sie et sie', [
                {'type': 'explique', 'texte': 'sie wohnt : elle habite. sie wohnen : ils habitent. Sie wohnen : vous habitez (politesse).'},
                {'type': 'piege', 'erreur': 'On écrit « er habt ».', 'correction': 'Haben est irrégulier : er hat.'},
            ]),
        ],
        a_toi=[
            q('« Wir … aus Deutschland. »', ['sind', 'seid', 'ist'], 'Wir sind.'),
            q('« Ihr … Fußball. » (spielen)', ['spielt', 'spielen', 'spielst'], 'Ihr : -t.'),
            q('« Haben Sie Zeit? » est :', ['une question polie', 'une question à un ami', 'un ordre'], 'Sie : vous.'),
        ],
        sources=[ref('AL-C4-5E-PRAES-01', 'Le présent')]),

    'AL-C4-5E-ART-01': dict(duree=6, essentiel=
        'Chaque nom a un genre : der (masculin), die (féminin), das (neutre). Au pluriel : die.\n'
        'Articles indéfinis : ein (masculin, neutre), eine (féminin).\n'
        'Kein, keine nient un nom : Ich habe keine Katze.',
        parties=[
            ('Les trois genres', [
                {'type': 'tableau', 'titre': 'Articles', 'colonnes': ['Genre', 'Défini', 'Indéfini', 'Négatif'], 'lignes': [
                    ['masculin', 'der Hund', 'ein Hund', 'kein Hund'], ['féminin', 'die Katze', 'eine Katze', 'keine Katze'], ['neutre', 'das Pferd', 'ein Pferd', 'kein Pferd'], ['pluriel', 'die Hunde', '(pas d’article)', 'keine Hunde']]},
                bq('« Das Mädchen » (la fille) est :', ['neutre', 'féminin', 'masculin'], 'Le genre ne suit pas toujours le sexe.'),
            ]),
            ('Apprendre le genre', [
                {'type': 'methode', 'titre': 'Retenir', 'etapes': ['Apprends chaque nom avec son article.', 'Note quelques indices : les noms en -ung, -heit, -keit sont féminins.', 'Les noms en -chen sont neutres.']},
                {'type': 'piege', 'erreur': 'On donne au nom le genre du mot français : « die Sonne » serait masculin.', 'correction': 'Le genre allemand est indépendant : die Sonne, der Mond.'},
            ]),
        ],
        a_toi=[
            q('« … Zeitung » (le journal, féminin)', ['die', 'der', 'das'], 'Les noms en -ung sont féminins.'),
            q('« Ich habe … Bruder. » (pas de)', ['keinen', 'nicht', 'kein'], 'Kein devant un nom ; masculin complément : keinen.'),
            q('Les noms en -chen sont :', ['neutres', 'féminins', 'masculins'], 'Das Brötchen.'),
        ],
        sources=[ref('AL-C4-5E-ART-01', 'Der, die, das et kein')]),

    'AL-C4-5E-FAM-01': dict(duree=5, essentiel=
        'La famille : der Vater, die Mutter, die Eltern, der Bruder, die Schwester, die Großeltern.\n'
        'Mein devant un nom masculin ou neutre, meine devant un nom féminin ou pluriel.\n'
        'Das ist mein Bruder. Das sind meine Eltern.',
        parties=[
            ('Les membres de la famille', [
                mots('Familie', ('der Vater / die Mutter', 'le père / la mère'), ('die Eltern', 'les parents'), ('der Bruder / die Schwester', 'le frère / la sœur'), ('die Geschwister', 'les frères et sœurs'), ('der Onkel / die Tante', 'l’oncle / la tante')),
                bq('« Die Großeltern » sont :', ['les grands-parents', 'les parents', 'les cousins'], 'Groß : grand.'),
            ]),
            ('Mein ou meine', [
                {'type': 'tableau', 'titre': 'Possessif', 'colonnes': ['Genre', 'Exemple'], 'lignes': [
                    ['masculin', 'mein Vater'], ['féminin', 'meine Mutter'], ['neutre', 'mein Pferd'], ['pluriel', 'meine Eltern']]},
                {'type': 'piege', 'erreur': 'On écrit « meine Vater ».', 'correction': 'Vater est masculin : mein Vater.'},
            ]),
        ],
        a_toi=[
            q('« … Schwester heißt Anna. »', ['Meine', 'Mein', 'Meinen'], 'Schwester est féminin.'),
            q('« Die Geschwister » désigne :', ['les frères et sœurs', 'les grands-parents', 'les enfants'], 'Un mot collectif.'),
            q('« Das sind meine Eltern. » veut dire :', ['Ce sont mes parents.', 'C’est mon père.', 'Ce sont mes amis.'], 'Eltern : parents.'),
        ],
        sources=[ref('AL-C4-5E-FAM-01', 'La famille')]),

    'AL-C4-5E-SCHU-01': dict(duree=5, essentiel=
        'Les matières : Mathe, Deutsch, Englisch, Geschichte, Erdkunde (géographie), Biologie, Sport, Kunst, Musik.\n'
        'Les lieux : das Klassenzimmer, die Turnhalle, der Schulhof, die Mensa.\n'
        'En Allemagne, les notes vont de 1 (sehr gut) à 6 (ungenügend) : 1 est la meilleure.',
        parties=[
            ('Matières et lieux', [
                mots('Die Schule', ('das Fach', 'la matière'), ('Erdkunde', 'géographie'), ('Kunst', 'arts plastiques'), ('die Turnhalle', 'le gymnase'), ('der Schulhof', 'la cour'), ('die Mensa', 'la cantine')),
                bq('« Erdkunde » est :', ['la géographie', 'l’histoire', 'la physique'], 'Erde : la Terre.'),
            ]),
            ('La journée d’un élève', [
                {'type': 'explique', 'texte': 'Les cours commencent souvent vers 8 h. Dans beaucoup d’écoles, ils finissent en début d’après-midi ; les écoles à journée complète se développent.'},
                {'type': 'piege', 'erreur': 'On croit qu’un 6 est une bonne note.', 'correction': 'En Allemagne, 1 est la meilleure note et 6 la plus mauvaise.'},
            ]),
        ],
        a_toi=[
            q('Une note de 1 en Allemagne est :', ['excellente', 'très mauvaise', 'moyenne'], 'Sehr gut.'),
            q('« Mein Lieblingsfach ist Kunst. » La matière préférée est :', ['les arts plastiques', 'la musique', 'le sport'], 'Kunst : art.'),
            q('« Die Mensa » est :', ['la cantine', 'la classe', 'la bibliothèque'], 'On y déjeune.'),
        ],
        sources=[ref('AL-C4-5E-SCHU-01', 'L’école')]),

    'AL-C4-5E-GOUT-01': dict(duree=5, essentiel=
        'Mögen + nom : Ich mag Pizza. Verbe + gern : Ich spiele gern Tennis.\n'
        'Lieber marque la préférence, am liebsten le plus haut degré : Ich lese lieber. Am liebsten schwimme ich.\n'
        'Lieblings- forme un nom : mein Lieblingsfach, meine Lieblingsfarbe.',
        parties=[
            ('Gern, lieber, am liebsten', [
                {'type': 'tableau', 'titre': 'Une échelle', 'colonnes': ['Degré', 'Exemple', 'Sens'], 'lignes': [
                    ['gern', 'Ich spiele gern Fußball.', 'j’aime jouer au foot'], ['lieber', 'Ich spiele lieber Tennis.', 'je préfère le tennis'], ['am liebsten', 'Am liebsten schwimme ich.', 'ce que je préfère, c’est nager']]},
                bq('« Ich tanze nicht gern. » veut dire :', ['Je n’aime pas danser.', 'Je danse souvent.', 'Je ne danse pas bien.'], 'Nicht gern.'),
            ]),
            ('Mögen et Lieblings-', [
                {'type': 'explique', 'texte': 'Ich mag Hunde. Mein Lieblingstier ist der Hund.'},
                {'type': 'piege', 'erreur': 'On écrit « Ich mag spielen Fußball ».', 'correction': 'Avec un verbe, on emploie gern : Ich spiele gern Fußball.'},
            ]),
        ],
        a_toi=[
            q('« Mon sport préféré » se dit :', ['mein Lieblingssport', 'mein Sport lieber', 'mein gern Sport'], 'Lieblings- + nom.'),
            q('« Ich esse lieber Fisch. » exprime :', ['une préférence', 'un dégout', 'une obligation'], 'Lieber.'),
            q('« Ich mag … » se complète par :', ['un nom', 'un verbe conjugué', 'gern'], 'Ich mag Musik.'),
        ],
        sources=[ref('AL-C4-5E-GOUT-01', 'Gouts et préférences')]),

    'AL-C4-5E-ZAHL-01': dict(duree=5, essentiel=
        'De 21 à 99, on dit l’unité avant la dizaine : einundzwanzig (21), fünfunddreißig (35).\n'
        'L’heure : acht Uhr (8 h), Viertel nach acht (8 h 15), Viertel vor neun (8 h 45).\n'
        'Halb neun veut dire 8 h 30 : la moitié de l’heure avant neuf heures.',
        parties=[
            ('Compter', [
                mots('Zahlen', ('zwanzig', '20'), ('einundzwanzig', '21'), ('dreißig', '30'), ('siebenundvierzig', '47'), ('hundert', '100')),
                bq('« Dreiundsechzig » :', ['63', '36', '73'], 'Drei und sechzig : 3 et 60.'),
            ]),
            ('Dire l’heure', [
                {'type': 'tableau', 'titre': 'Wie spät ist es?', 'colonnes': ['Allemand', 'Heure'], 'lignes': [
                    ['Es ist acht Uhr.', '8 h'], ['Es ist Viertel nach acht.', '8 h 15'], ['Es ist halb neun.', '8 h 30'], ['Es ist Viertel vor neun.', '8 h 45']]},
                {'type': 'piege', 'erreur': 'On lit « halb neun » comme 9 h 30.', 'correction': 'Halb neun : la demie avant neuf heures, soit 8 h 30.'},
            ]),
        ],
        a_toi=[
            q('« Halb sieben » :', ['6 h 30', '7 h 30', '7 h 15'], 'La demie avant sept.'),
            q('« Achtundzwanzig » :', ['28', '82', '18'], 'Acht und zwanzig.'),
            q('« Viertel nach zwei » :', ['2 h 15', '1 h 45', '2 h 45'], 'Nach : après.'),
        ],
        sources=[ref('AL-C4-5E-ZAHL-01', 'Nombres et heure')]),

    'AL-C4-5E-VERB-01': dict(duree=6, essentiel=
        'Dans la phrase déclarative, le verbe conjugué est toujours en 2e position : Heute spiele ich Fußball.\n'
        'Question avec mot interrogatif : le mot, puis le verbe. Wo wohnst du?\n'
        'Question fermée (oui ou non) : le verbe en tête. Spielst du Tennis?',
        parties=[
            ('Le verbe en 2e position', [
                {'type': 'tableau', 'titre': 'Position 2', 'colonnes': ['Position 1', 'Verbe', 'Suite'], 'lignes': [
                    ['Ich', 'spiele', 'heute Fußball.'], ['Heute', 'spiele', 'ich Fußball.'], ['Am Samstag', 'gehe', 'ich ins Kino.']]},
                bq('Quelle phrase est juste ?', ['Morgen fahre ich nach Berlin.', 'Morgen ich fahre nach Berlin.', 'Morgen ich nach Berlin fahre.'], 'Le verbe reste 2e.'),
            ]),
            ('Les questions', [
                mots('Questions', ('Was machst du?', 'Que fais-tu ?'), ('Wann beginnt der Film?', 'Quand commence le film ?'), ('Warum lachst du?', 'Pourquoi ris-tu ?'), ('Hast du einen Hund?', 'As-tu un chien ?')),
                {'type': 'piege', 'erreur': 'On garde l’ordre français après un complément : « Heute ich spiele ».', 'correction': 'Si un complément ouvre la phrase, le sujet passe après le verbe : Heute spiele ich.'},
            ]),
        ],
        a_toi=[
            q('« Wo … du? » (wohnen)', ['wohnst', 'du wohnst', 'wohnen'], 'Mot interrogatif + verbe + sujet.'),
            q('Une question fermée commence par :', ['le verbe', 'le sujet', 'un mot interrogatif'], 'Kommst du?'),
            q('« Nach der Schule … ich Hausaufgaben. »', ['mache', 'ich mache', 'machen'], 'Le verbe en 2e position.'),
        ],
        sources=[ref('AL-C4-5E-VERB-01', 'Verbe en 2e position et questions')]),

    'AL-C4-5E-LAND-01': dict(duree=5, essentiel=
        'On parle allemand en Allemagne (Berlin), en Autriche (Vienne), en Suisse (Berne, avec d’autres langues) et au Liechtenstein (Vaduz).\n'
        'L’allemand est aussi une langue officielle au Luxembourg et en Belgique.\n'
        'Les points cardinaux : der Norden, der Süden, der Osten, der Westen.',
        parties=[
            ('Les pays germanophones', [
                {'type': 'tableau', 'titre': 'Pays et capitales', 'colonnes': ['Pays', 'En allemand', 'Capitale'], 'lignes': [
                    ['Allemagne', 'Deutschland', 'Berlin'], ['Autriche', 'Österreich', 'Wien'], ['Suisse', 'die Schweiz', 'Bern'], ['Liechtenstein', 'Liechtenstein', 'Vaduz']]},
                bq('La capitale de l’Autriche est :', ['Vienne', 'Berne', 'Munich'], 'Wien.'),
            ]),
            ('Situer', [
                {'type': 'explique', 'texte': 'Hamburg liegt im Norden von Deutschland. München liegt im Süden.'},
                {'type': 'piege', 'erreur': 'On pense que tous les Suisses parlent allemand.', 'correction': 'La Suisse a quatre langues nationales : allemand, français, italien, romanche.'},
            ]),
        ],
        a_toi=[
            q('« Der Osten » est :', ['l’est', 'l’ouest', 'le sud'], 'Osten : est.'),
            q('« Österreich » est :', ['l’Autriche', 'l’Australie', 'l’Allemagne de l’Est'], 'Capitale : Wien.'),
            q('« München liegt im Süden. » Munich est :', ['au sud', 'au nord', 'à l’ouest'], 'Süden : sud.'),
        ],
        sources=[ref('AL-C4-5E-LAND-01', 'Les pays germanophones')]),

    'AL-C4-5E-MOD-01': dict(duree=6, essentiel=
        'Les verbes de modalité : können (pouvoir, savoir), müssen (devoir), wollen (vouloir), dürfen (avoir le droit), mögen (aimer), möchten (voudrais).\n'
        'Au singulier, ils changent de voyelle : ich kann, ich muss, ich will, ich darf.\n'
        'L’infinitif se place en fin de phrase : Ich kann gut schwimmen.',
        parties=[
            ('La conjugaison', [
                {'type': 'tableau', 'titre': 'Au présent', 'colonnes': ['Sujet', 'können', 'müssen', 'wollen'], 'lignes': [
                    ['ich', 'kann', 'muss', 'will'], ['du', 'kannst', 'musst', 'willst'], ['er, sie, es', 'kann', 'muss', 'will'], ['wir', 'können', 'müssen', 'wollen']]},
                bq('« Er … heute nicht kommen. » (pouvoir)', ['kann', 'könnt', 'können'], 'Er kann, sans terminaison.'),
            ]),
            ('L’infinitif à la fin', [
                {'type': 'explique', 'texte': 'Ich möchte ein Eis essen. Du darfst hier nicht rauchen.'},
                {'type': 'piege', 'erreur': 'On écrit « Ich will. » au sens de « je vais ».', 'correction': 'Wollen exprime la volonté, pas le futur.'},
            ]),
        ],
        a_toi=[
            q('« Ich möchte » veut dire :', ['je voudrais', 'je dois', 'je peux'], 'Souhait poli.'),
            q('Quelle phrase est juste ?', ['Ich muss jetzt gehen.', 'Ich muss gehen jetzt.', 'Ich gehen muss jetzt.'], 'Infinitif à la fin.'),
            q('« Du darfst » exprime :', ['une permission', 'une obligation', 'une capacité'], 'Dürfen : avoir le droit.'),
        ],
        sources=[ref('AL-C4-5E-MOD-01', 'Les verbes de modalité')]),

    'AL-C4-5E-NEG-01': dict(duree=5, essentiel=
        'Kein nie un nom précédé de ein ou sans article : Ich habe einen Hund → Ich habe keinen Hund.\n'
        'Nicht nie tout le reste : un verbe, un adjectif, un nom avec article défini.\n'
        'Ich spiele nicht. Das ist nicht mein Buch.',
        parties=[
            ('Kein ou nicht', [
                {'type': 'tableau', 'titre': 'Choisir', 'colonnes': ['Phrase affirmative', 'Négation'], 'lignes': [
                    ['Ich habe eine Katze.', 'Ich habe keine Katze.'], ['Ich trinke Milch.', 'Ich trinke keine Milch.'], ['Ich schwimme.', 'Ich schwimme nicht.'], ['Das Buch ist teuer.', 'Das Buch ist nicht teuer.']]},
                bq('« Ich habe … Zeit. »', ['keine', 'nicht', 'kein'], 'Nom sans article : kein ; Zeit est féminin.'),
            ]),
            ('Le bon réflexe', [
                {'type': 'methode', 'titre': 'Choisir', 'etapes': ['Y a-t-il un nom avec ein ou sans article ?', 'Oui : kein, accordé comme ein.', 'Non : nicht.']},
                {'type': 'piege', 'erreur': 'On écrit « Ich habe nicht einen Bruder ».', 'correction': 'Devant ein + nom : Ich habe keinen Bruder.'},
            ]),
        ],
        a_toi=[
            q('« Ich spiele … Klavier. » (pas de piano)', ['kein', 'nicht', 'keine'], 'Nom sans article, neutre : kein.'),
            q('« Er ist … müde. »', ['nicht', 'kein', 'keine'], 'Adjectif : nicht.'),
            q('« Wir kommen heute … . »', ['nicht', 'kein', 'keinen'], 'Verbe : nicht.'),
        ],
        sources=[ref('AL-C4-5E-NEG-01', 'Nicht ou kein')]),

    'AL-C4-5E-PERF-01': dict(duree=6, essentiel=
        'Le parfait raconte le passé à l’oral : haben conjugué + participe passé en fin de phrase.\n'
        'Le participe passé des verbes réguliers se forme avec ge- et -t : spielen → gespielt, machen → gemacht.\n'
        'Gestern habe ich Fußball gespielt.',
        parties=[
            ('Former le parfait', [
                {'type': 'tableau', 'titre': 'Participes réguliers', 'colonnes': ['Infinitif', 'Participe', 'Exemple'], 'lignes': [
                    ['spielen', 'gespielt', 'Ich habe Tennis gespielt.'], ['kaufen', 'gekauft', 'Wir haben Brot gekauft.'], ['hören', 'gehört', 'Er hat Musik gehört.'], ['machen', 'gemacht', 'Hast du deine Hausaufgaben gemacht?']]},
                bq('« Am Wochenende habe ich ein Buch … »', ['gekauft', 'kaufen', 'gekaufen'], 'Ge- + kauf + -t.'),
            ]),
            ('La place du participe', [
                {'type': 'explique', 'texte': 'Haben est en 2e position, le participe ferme la phrase : Ich habe gestern lange Musik gehört.'},
                {'type': 'piege', 'erreur': 'On place le participe juste après haben : « Ich habe gespielt Fußball ».', 'correction': 'Le participe va à la fin : Ich habe Fußball gespielt.'},
            ]),
        ],
        a_toi=[
            q('Le participe de « machen » est :', ['gemacht', 'gemachen', 'machte'], 'Ge- -t.'),
            q('Quelle phrase est juste ?', ['Er hat Musik gehört.', 'Er hat gehört Musik.', 'Er gehört hat Musik.'], 'Participe à la fin.'),
            q('« Gestern » veut dire :', ['hier', 'demain', 'aujourd’hui'], 'Repère du passé.'),
        ],
        sources=[ref('AL-C4-5E-PERF-01', 'Le parfait')]),

    'AL-C4-5E-COMP-01': dict(duree=5, essentiel=
        'Le comparatif ajoute -er à l’adjectif et se suit de als : Berlin ist größer als Bonn.\n'
        'L’égalité se dit so… wie : Ich bin so groß wie mein Bruder.\n'
        'Gut a un comparatif irrégulier : besser.',
        parties=[
            ('Comparer', [
                {'type': 'tableau', 'titre': 'Comparatifs', 'colonnes': ['Adjectif', 'Comparatif', 'Exemple'], 'lignes': [
                    ['schön', 'schöner', 'Der Park ist schöner als der Platz.'], ['schnell', 'schneller', 'Das Auto ist schneller als das Rad.'], ['alt', 'älter', 'Mein Opa ist älter als meine Oma.'], ['gut', 'besser', 'Pizza ist besser als Suppe.']]},
                bq('« Mathe ist … als Deutsch. » (difficile : schwer)', ['schwerer', 'mehr schwer', 'schwerest'], 'Schwer + -er.'),
            ]),
            ('Als ou wie', [
                {'type': 'piege', 'erreur': 'On écrit « größer wie ».', 'correction': 'Après un comparatif : als. Pour l’égalité : so… wie.'},
            ]),
        ],
        a_toi=[
            q('Le comparatif de « gut » est :', ['besser', 'guter', 'mehr gut'], 'Irrégulier.'),
            q('« Ich bin so alt … du. »', ['wie', 'als', 'dass'], 'Égalité : so… wie.'),
            q('« Kleiner als » veut dire :', ['plus petit que', 'aussi petit que', 'le plus petit'], 'Comparatif + als.'),
        ],
        sources=[ref('AL-C4-5E-COMP-01', 'Comparer')]),

    # ---------------------------------------------------------------------- 4e
    'AL-C4-4E-MOD-01': dict(duree=5, essentiel=
        'Können : capacité. Müssen : obligation. Dürfen : permission. Wollen : volonté.\n'
        'Nicht dürfen exprime l’interdiction ; nicht müssen, l’absence d’obligation.\n'
        'Le verbe de modalité est en 2e position, l’infinitif en fin de phrase.',
        parties=[
            ('Quatre sens', [
                {'type': 'tableau', 'titre': 'Modalités', 'colonnes': ['Verbe', 'Sens', 'Exemple'], 'lignes': [
                    ['können', 'capacité', 'Ich kann Gitarre spielen.'], ['müssen', 'obligation', 'Du musst aufräumen.'], ['dürfen', 'permission', 'Darf ich rausgehen?'], ['wollen', 'volonté', 'Wir wollen ans Meer fahren.']]},
                bq('« Darf ich das Fenster öffnen? » sert à :', ['demander la permission', 'exprimer une capacité', 'donner un ordre'], 'Dürfen.'),
            ]),
            ('Interdiction ou pas d’obligation', [
                {'type': 'tableau', 'titre': 'Attention', 'colonnes': ['Phrase', 'Sens'], 'lignes': [
                    ['Du darfst hier nicht rauchen.', 'c’est interdit'], ['Du musst nicht kommen.', 'ce n’est pas obligatoire']]},
                {'type': 'piege', 'erreur': 'On traduit « tu ne dois pas » par « du musst nicht ».', 'correction': 'Pour interdire : du darfst nicht. Du musst nicht : tu n’es pas obligé.'},
            ]),
        ],
        a_toi=[
            q('« Tu n’as pas le droit de courir ici » :', ['Du darfst hier nicht laufen.', 'Du musst hier nicht laufen.', 'Du kannst hier laufen.'], 'Interdiction.'),
            q('« Ich muss nicht arbeiten. » veut dire :', ['Je ne suis pas obligé de travailler.', 'Je n’ai pas le droit de travailler.', 'Je ne veux pas travailler.'], 'Absence d’obligation.'),
            q('« Sie will Ärztin werden. » exprime :', ['une volonté', 'une obligation', 'une permission'], 'Wollen.'),
        ],
        sources=[ref('AL-C4-4E-MOD-01', 'Les verbes de modalité')]),

    'AL-C4-4E-AKK-01': dict(duree=6, essentiel=
        'Le complément d’objet direct est à l’accusatif.\n'
        'Seul le masculin change : der → den, ein → einen, kein → keinen, mein → meinen.\n'
        'Le féminin, le neutre et le pluriel ne changent pas : Ich sehe die Katze, das Haus, die Kinder.',
        parties=[
            ('Le masculin à l’accusatif', [
                {'type': 'tableau', 'titre': 'Nominatif et accusatif', 'colonnes': ['Genre', 'Nominatif', 'Accusatif'], 'lignes': [
                    ['masculin', 'der / ein Hund', 'den / einen Hund'], ['féminin', 'die / eine Katze', 'die / eine Katze'], ['neutre', 'das / ein Pferd', 'das / ein Pferd'], ['pluriel', 'die Hunde', 'die Hunde']]},
                bq('« Ich habe … Bruder. »', ['einen', 'ein', 'eine'], 'Complément masculin.'),
            ]),
            ('Repérer le complément', [
                {'type': 'methode', 'titre': 'Trouver l’accusatif', 'etapes': ['Trouve le verbe : Ich kaufe…', 'Demande « quoi ? » : un pull.', 'Pull se dit der Pullover : masculin, donc einen Pullover.']},
                {'type': 'piege', 'erreur': 'On écrit « Ich sehe der Mann ».', 'correction': 'Complément masculin : Ich sehe den Mann.'},
            ]),
        ],
        a_toi=[
            q('« Wir besuchen … Onkel. »', ['unseren', 'unser', 'unsere'], 'Onkel masculin, complément.'),
            q('« Ich esse … Apfel. »', ['einen', 'ein', 'eine'], 'Der Apfel.'),
            q('Au féminin, l’accusatif :', ['ne change pas', 'devient den', 'devient dem'], 'Die reste die.'),
        ],
        sources=[ref('AL-C4-4E-AKK-01', 'L’accusatif')]),

    'AL-C4-4E-TRENN-01': dict(duree=5, essentiel=
        'Beaucoup de verbes ont une particule séparable : aufstehen, fernsehen, einkaufen, anfangen.\n'
        'Au présent, la particule part en fin de phrase : Ich stehe um sieben Uhr auf.\n'
        'L’heure se donne avec um : um acht Uhr, um halb neun.',
        parties=[
            ('La particule à la fin', [
                {'type': 'tableau', 'titre': 'Verbes séparables', 'colonnes': ['Infinitif', 'Sens', 'Exemple'], 'lignes': [
                    ['aufstehen', 'se lever', 'Ich stehe um 7 Uhr auf.'], ['fernsehen', 'regarder la télé', 'Er sieht abends fern.'], ['einkaufen', 'faire les courses', 'Wir kaufen am Samstag ein.'], ['anfangen', 'commencer', 'Die Schule fängt um 8 Uhr an.']]},
                bq('« Ich … um 7 Uhr … » (aufstehen)', ['stehe … auf', 'aufstehe … ', 'stehe auf … '], 'La particule part à la fin.'),
            ]),
            ('Ma journée', [
                {'type': 'methode', 'titre': 'Raconter', 'etapes': ['Um 7 Uhr stehe ich auf.', 'Dann frühstücke ich.', 'Um 8 Uhr fängt die Schule an.', 'Abends sehe ich fern.']},
                {'type': 'piege', 'erreur': 'On écrit « Ich aufstehe ».', 'correction': 'Au présent, on sépare : Ich stehe auf.'},
            ]),
        ],
        a_toi=[
            q('« Wann … der Film … ? » (anfangen)', ['fängt … an', 'anfängt … ', 'fängt an …'], 'Particule à la fin.'),
            q('« À huit heures » se dit :', ['um acht Uhr', 'an acht Uhr', 'in acht Uhr'], 'Um + heure.'),
            q('« Fernsehen » veut dire :', ['regarder la télévision', 'voir de loin', 'téléphoner'], 'Fern : loin.'),
        ],
        sources=[ref('AL-C4-4E-TRENN-01', 'Ma journée')]),

    'AL-C4-4E-PERF-01': dict(duree=6, essentiel=
        'Le parfait se forme avec haben ou sein + participe passé en fin de phrase.\n'
        'Sein s’emploie avec les verbes de déplacement ou de changement d’état : Ich bin nach Berlin gefahren.\n'
        'Beaucoup de participes sont irréguliers : gegessen, getrunken, gesehen, gegangen.',
        parties=[
            ('Haben ou sein', [
                {'type': 'tableau', 'titre': 'Auxiliaire', 'colonnes': ['Auxiliaire', 'Verbes', 'Exemple'], 'lignes': [
                    ['haben', 'la plupart des verbes', 'Ich habe Pizza gegessen.'], ['sein', 'déplacement, changement', 'Wir sind ins Kino gegangen.'], ['sein', 'sein, bleiben', 'Er ist zu Hause geblieben.']]},
                bq('« Letzten Sommer … wir nach Spanien geflogen. »', ['sind', 'haben', 'ist'], 'Déplacement : sein.'),
            ]),
            ('Participes irréguliers', [
                mots('Partizipien', ('essen → gegessen', 'manger'), ('trinken → getrunken', 'boire'), ('sehen → gesehen', 'voir'), ('gehen → gegangen', 'aller'), ('aufstehen → aufgestanden', 'se lever')),
                {'type': 'piege', 'erreur': 'On écrit « Ich habe nach Paris gefahren ».', 'correction': 'Fahren est un déplacement : Ich bin nach Paris gefahren.'},
            ]),
        ],
        a_toi=[
            q('Le participe de « trinken » est :', ['getrunken', 'getrinkt', 'trankt'], 'Irrégulier.'),
            q('« Er … spät aufgestanden. »', ['ist', 'hat', 'wird'], 'Changement d’état : sein.'),
            q('« Hast du den Film … ? »', ['gesehen', 'gesieht', 'sehen'], 'Sehen → gesehen.'),
        ],
        sources=[ref('AL-C4-4E-PERF-01', 'Raconter au parfait')]),

    'AL-C4-4E-WEG-01': dict(duree=5, essentiel=
        'Demander : Entschuldigung, wie komme ich zum Bahnhof? Wo ist die Post?\n'
        'Indiquer : geradeaus, links, rechts, die erste Straße links, gegenüber von der Bank.\n'
        'Zum (zu dem) devant un nom masculin ou neutre, zur (zu der) devant un nom féminin.',
        parties=[
            ('Le chemin', [
                mots('Wegbeschreibung', ('Gehen Sie geradeaus.', 'Allez tout droit.'), ('Biegen Sie links ab.', 'Tournez à gauche.'), ('Nehmen Sie die zweite Straße rechts.', 'Prenez la deuxième rue à droite.'), ('Das ist gegenüber vom Rathaus.', 'C’est en face de la mairie.'), ('Ist es weit?', 'Est-ce loin ?')),
                bq('« Geradeaus » veut dire :', ['tout droit', 'à droite', 'en face'], 'Gerade : droit.'),
            ]),
            ('Zum ou zur', [
                {'type': 'tableau', 'titre': 'Aller à', 'colonnes': ['Nom', 'Exemple'], 'lignes': [
                    ['der Bahnhof', 'zum Bahnhof'], ['das Museum', 'zum Museum'], ['die Post', 'zur Post']]},
                {'type': 'piege', 'erreur': 'On confond « rechts » et « links ».', 'correction': 'Rechts : à droite. Links : à gauche.'},
            ]),
        ],
        a_toi=[
            q('« Wie komme ich … Schule? »', ['zur', 'zum', 'zu der die'], 'Die Schule : zur.'),
            q('« Links » veut dire :', ['à gauche', 'à droite', 'tout droit'], 'Le contraire de rechts.'),
            q('Pour aborder quelqu’un poliment :', ['Entschuldigung', 'Tschüss', 'Hallo du'], 'Excusez-moi.'),
        ],
        sources=[ref('AL-C4-4E-WEG-01', 'Demander son chemin')]),

    'AL-C4-4E-REISE-01': dict(duree=5, essentiel=
        'Quelques villes : Berlin, Hamburg, München, Köln en Allemagne ; Wien et Salzburg en Autriche ; Zürich en Suisse.\n'
        'Des lieux connus : la porte de Brandebourg à Berlin, le château de Neuschwanstein, le Rhin.\n'
        'Le train : der Bahnhof, das Gleis, die Fahrkarte, abfahren, ankommen, umsteigen.',
        parties=[
            ('Lieux et villes', [
                {'type': 'tableau', 'titre': 'Repères', 'colonnes': ['Lieu', 'Pays', 'À savoir'], 'lignes': [
                    ['das Brandenburger Tor', 'Allemagne', 'symbole de Berlin et de la réunification'], ['Schloss Neuschwanstein', 'Allemagne', 'château de Bavière'], ['Salzburg', 'Autriche', 'ville natale de Mozart'], ['der Rhein', 'Suisse, Allemagne, Pays-Bas…', 'grand fleuve d’Europe']]},
                bq('Mozart est né à :', ['Salzbourg', 'Vienne', 'Berlin'], 'En Autriche.'),
            ]),
            ('Prendre le train', [
                mots('Am Bahnhof', ('eine Fahrkarte nach Köln', 'un billet pour Cologne'), ('Der Zug fährt um 9 Uhr ab.', 'Le train part à 9 h.'), ('auf Gleis 4', 'voie 4'), ('Ich muss in Mainz umsteigen.', 'Je dois changer à Mayence.')),
                {'type': 'piege', 'erreur': 'On confond « abfahren » et « ankommen ».', 'correction': 'Abfahren : partir. Ankommen : arriver.'},
            ]),
        ],
        a_toi=[
            q('« Das Gleis » est :', ['la voie, le quai', 'le billet', 'le guichet'], 'Auf Gleis 3.'),
            q('« Umsteigen » veut dire :', ['changer de train', 'descendre', 'réserver'], 'Correspondance.'),
            q('La porte de Brandebourg se trouve à :', ['Berlin', 'Munich', 'Hambourg'], 'Brandenburger Tor.'),
        ],
        sources=[ref('AL-C4-4E-REISE-01', 'Voyager en pays germanophone')]),

    'AL-C4-4E-REFL-01': dict(duree=5, essentiel=
        'Un verbe pronominal se conjugue avec un pronom réfléchi : sich waschen, sich freuen, sich interessieren.\n'
        'Pronoms à l’accusatif : mich, dich, sich, uns, euch, sich.\n'
        'Ich wasche mich. Wir freuen uns auf die Ferien.',
        parties=[
            ('La conjugaison', [
                {'type': 'tableau', 'titre': 'Sich waschen', 'colonnes': ['Sujet', 'Verbe', 'Pronom'], 'lignes': [
                    ['ich', 'wasche', 'mich'], ['du', 'wäschst', 'dich'], ['er, sie, es', 'wäscht', 'sich'], ['wir', 'waschen', 'uns'], ['ihr', 'wascht', 'euch']]},
                bq('« Wir … uns für Musik. » (sich interessieren)', ['interessieren', 'interessiert', 'interessiere'], 'Wir + -en.'),
            ]),
            ('Verbes fréquents', [
                mots('Reflexive Verben', ('sich freuen auf', 'se réjouir de (à venir)'), ('sich interessieren für', 's’intéresser à'), ('sich beeilen', 'se dépêcher'), ('sich setzen', 's’asseoir')),
                {'type': 'piege', 'erreur': 'On écrit « Du wäschst sich ».', 'correction': 'Le pronom suit le sujet : du wäschst dich.'},
            ]),
        ],
        a_toi=[
            q('« Ich freue … auf Weihnachten. »', ['mich', 'sich', 'mir'], 'Ich → mich.'),
            q('« Ihr müsst … beeilen! »', ['euch', 'sich', 'uns'], 'Ihr → euch.'),
            q('« Sie interessiert sich für Sport. » veut dire :', ['Elle s’intéresse au sport.', 'Elle fait du sport.', 'Elle déteste le sport.'], 'Sich interessieren für.'),
        ],
        sources=[ref('AL-C4-4E-REFL-01', 'Les verbes pronominaux')]),

    'AL-C4-4E-FUT-01': dict(duree=5, essentiel=
        'Pour parler de l’avenir, l’allemand emploie souvent le présent avec un repère de temps : Morgen fahre ich nach Wien.\n'
        'Le futur se forme aussi avec werden + infinitif en fin de phrase : Ich werde Arzt werden.\n'
        'Werden : ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden.',
        parties=[
            ('Deux façons', [
                {'type': 'tableau', 'titre': 'L’avenir', 'colonnes': ['Forme', 'Exemple'], 'lignes': [
                    ['présent + repère', 'Nächste Woche besuche ich meine Oma.'], ['werden + infinitif', 'Im Sommer werde ich viel lesen.']]},
                bq('« Du … bestimmt Erfolg haben. »', ['wirst', 'wird', 'werdest'], 'Du wirst.'),
            ]),
            ('Repères de temps', [
                mots('Zeitangaben', ('morgen', 'demain'), ('nächste Woche', 'la semaine prochaine'), ('in zwei Jahren', 'dans deux ans'), ('später', 'plus tard')),
                {'type': 'piege', 'erreur': 'On écrit « Ich werde morgen gehen ins Kino ».', 'correction': 'L’infinitif ferme la phrase : Ich werde morgen ins Kino gehen.'},
            ]),
        ],
        a_toi=[
            q('« Morgen spiele ich Tennis. » parle :', ['de l’avenir', 'du passé', 'd’une habitude'], 'Morgen : demain.'),
            q('Quelle phrase est juste ?', ['Wir werden nächstes Jahr umziehen.', 'Wir werden umziehen nächstes Jahr.', 'Wir umziehen werden nächstes Jahr.'], 'Infinitif à la fin.'),
            q('« In zwei Jahren » veut dire :', ['dans deux ans', 'il y a deux ans', 'depuis deux ans'], 'In : dans.'),
        ],
        sources=[ref('AL-C4-4E-FUT-01', 'Le futur avec werden')]),

    'AL-C4-4E-PRON-01': dict(duree=6, essentiel=
        'Accusatif : mich, dich, ihn, sie, es, uns, euch, sie. Datif : mir, dir, ihm, ihr, ihm, uns, euch, ihnen.\n'
        'Certains verbes demandent le datif : helfen, danken, gefallen, gehören.\n'
        'Ich sehe ihn (accusatif). Ich helfe ihm (datif).',
        parties=[
            ('Deux séries', [
                {'type': 'tableau', 'titre': 'Pronoms compléments', 'colonnes': ['Sujet', 'Accusatif', 'Datif'], 'lignes': [
                    ['ich', 'mich', 'mir'], ['du', 'dich', 'dir'], ['er', 'ihn', 'ihm'], ['sie', 'sie', 'ihr'], ['wir', 'uns', 'uns']]},
                bq('« Kannst du … helfen? » (moi)', ['mir', 'mich', 'ich'], 'Helfen + datif.'),
            ]),
            ('Verbes au datif', [
                mots('Avec le datif', ('Das gefällt mir.', 'Ça me plait.'), ('Ich danke dir.', 'Je te remercie.'), ('Das Buch gehört ihm.', 'Le livre lui appartient.'), ('Ich helfe ihnen.', 'Je les aide.')),
                {'type': 'piege', 'erreur': 'On écrit « Ich helfe dich ».', 'correction': 'Helfen se construit avec le datif : Ich helfe dir.'},
            ]),
        ],
        a_toi=[
            q('« Ich liebe … » (lui)', ['ihn', 'ihm', 'er'], 'Lieben + accusatif.'),
            q('« Gefällt … der Film? » (à toi)', ['dir', 'dich', 'du'], 'Gefallen + datif.'),
            q('« Ich danke … » (vous, tutoiement pluriel)', ['euch', 'ihnen', 'sie'], 'Ihr → euch.'),
        ],
        sources=[ref('AL-C4-4E-PRON-01', 'Pronoms à l’accusatif et au datif')]),

    'AL-C4-4E-QUANT-01': dict(duree=5, essentiel=
        'Viel s’emploie avec un nom au singulier : viel Zeit, viel Geld. Viele avec un pluriel : viele Freunde.\n'
        'De même : wenig Zeit, wenige Leute.\n'
        'Einige et ein paar : quelques. Alle : tous.',
        parties=[
            ('Singulier ou pluriel', [
                {'type': 'tableau', 'titre': 'Quantités', 'colonnes': ['Sens', 'Singulier', 'Pluriel'], 'lignes': [
                    ['beaucoup', 'viel Wasser', 'viele Bücher'], ['peu', 'wenig Geld', 'wenige Leute'], ['quelques', '(pluriel seulement)', 'einige / ein paar Freunde'], ['tous', '(pluriel seulement)', 'alle Schüler']]},
                bq('« Ich habe … Hausaufgaben. »', ['viele', 'viel', 'vielen'], 'Hausaufgaben est au pluriel.'),
            ]),
            ('Ein paar ou ein Paar', [
                {'type': 'explique', 'texte': 'Ein paar Äpfel : quelques pommes. Ein Paar Schuhe : une paire de chaussures.'},
                {'type': 'piege', 'erreur': 'On écrit « viele Zeit ».', 'correction': 'Zeit est au singulier : viel Zeit.'},
            ]),
        ],
        a_toi=[
            q('« Er trinkt … Milch. » (peu)', ['wenig', 'wenige', 'einige'], 'Singulier.'),
            q('« Ein paar » veut dire :', ['quelques', 'une paire', 'beaucoup'], 'Avec p minuscule.'),
            q('« … Schüler sind da. » (tous)', ['Alle', 'Viel', 'Wenig'], 'Alle : tous.'),
        ],
        sources=[ref('AL-C4-4E-QUANT-01', 'Viel, viele, wenig, alle')]),

    # ---------------------------------------------------------------------- 3e
    'AL-C4-3E-WEIL-01': dict(duree=6, essentiel=
        'Weil (parce que) et dass (que) ouvrent une subordonnée : le verbe conjugué va à la fin.\n'
        'Ich bleibe zu Hause, weil ich krank bin. Ich glaube, dass er recht hat.\n'
        'Une virgule sépare toujours la principale de la subordonnée.',
        parties=[
            ('Le verbe à la fin', [
                {'type': 'tableau', 'titre': 'Subordonnées', 'colonnes': ['Principale', 'Subordonnée'], 'lignes': [
                    ['Ich lerne Deutsch,', 'weil ich nach Berlin fahren möchte.'], ['Ich finde,', 'dass Sport wichtig ist.'], ['Sie sagt,', 'dass sie keine Zeit hat.']]},
                bq('« Ich komme nicht, weil ich … »', ['keine Zeit habe', 'habe keine Zeit', 'keine habe Zeit'], 'Verbe conjugué à la fin.'),
            ]),
            ('Donner son avis', [
                mots('Meinung', ('Ich finde, dass…', 'Je trouve que…'), ('Ich glaube, dass…', 'Je crois que…'), ('Meiner Meinung nach…', 'À mon avis…')),
                {'type': 'piege', 'erreur': 'On garde l’ordre de la principale : « weil ich bin müde ».', 'correction': 'Dans une subordonnée, le verbe conjugué ferme la phrase : weil ich müde bin.'},
            ]),
        ],
        a_toi=[
            q('Quelle phrase est juste ?', ['Ich glaube, dass sie kommt.', 'Ich glaube, dass sie kommt nicht morgen.', 'Ich glaube, dass kommt sie.'], 'Verbe à la fin.'),
            q('« Weil » veut dire :', ['parce que', 'que', 'mais'], 'Cause.'),
            q('Avant weil ou dass, on met :', ['une virgule', 'un point', 'rien'], 'Toujours une virgule.'),
        ],
        sources=[ref('AL-C4-3E-WEIL-01', 'Weil et dass')]),

    'AL-C4-3E-DAT-01': dict(duree=6, essentiel=
        'Après mit, bei, nach, von, zu, aus (et seit), on emploie toujours le datif.\n'
        'Au datif : der → dem, die → der, das → dem, pluriel die → den (+ -n au nom).\n'
        'Contractions : zum (zu dem), zur (zu der), beim (bei dem), vom (von dem).',
        parties=[
            ('Les formes', [
                {'type': 'tableau', 'titre': 'Datif', 'colonnes': ['Genre', 'Nominatif', 'Datif'], 'lignes': [
                    ['masculin', 'der / ein Freund', 'dem / einem Freund'], ['féminin', 'die / eine Freundin', 'der / einer Freundin'], ['neutre', 'das / ein Kind', 'dem / einem Kind'], ['pluriel', 'die Freunde', 'den Freunden']]},
                bq('« Ich fahre mit … Bus. »', ['dem', 'den', 'der'], 'Mit + datif ; der Bus.'),
            ]),
            ('Prépositions et pronoms', [
                mots('Avec le datif', ('mit meiner Schwester', 'avec ma sœur'), ('bei meinen Großeltern', 'chez mes grands-parents'), ('nach der Schule', 'après l’école'), ('Kommst du mit mir?', 'Tu viens avec moi ?')),
                {'type': 'piege', 'erreur': 'On écrit « mit mein Vater ».', 'correction': 'Mit + datif : mit meinem Vater.'},
            ]),
        ],
        a_toi=[
            q('« Ich wohne bei … Tante. »', ['meiner', 'meine', 'meinem'], 'Die Tante, datif : der → meiner.'),
            q('« Zum » est la contraction de :', ['zu dem', 'zu der', 'zu den'], 'Zum Bahnhof.'),
            q('« Ich spiele mit … Kindern. »', ['den', 'die', 'dem'], 'Pluriel datif : den + -n.'),
        ],
        sources=[ref('AL-C4-3E-DAT-01', 'Le datif')]),

    'AL-C4-3E-KOMP-01': dict(duree=5, essentiel=
        'Comparatif : -er + als. Superlatif : am …sten. schnell → schneller → am schnellsten.\n'
        'Les adjectifs courts prennent souvent un Umlaut : alt → älter → am ältesten, groß → größer → am größten.\n'
        'Irréguliers : gut → besser → am besten ; viel → mehr → am meisten ; gern → lieber → am liebsten.',
        parties=[
            ('Trois degrés', [
                {'type': 'tableau', 'titre': 'Degrés', 'colonnes': ['Adjectif', 'Comparatif', 'Superlatif'], 'lignes': [
                    ['klein', 'kleiner', 'am kleinsten'], ['alt', 'älter', 'am ältesten'], ['gut', 'besser', 'am besten'], ['viel', 'mehr', 'am meisten'], ['gern', 'lieber', 'am liebsten']]},
                bq('« Die Zugspitze ist … Berg Deutschlands. »', ['der höchste', 'der hochste', 'am höher'], 'Hoch → der höchste.'),
            ]),
            ('Égalité', [
                {'type': 'explique', 'texte': 'Lisa ist so groß wie Tom. Lisa ist nicht so groß wie Tom.'},
                {'type': 'piege', 'erreur': 'On écrit « mehr schnell als ».', 'correction': 'L’allemand ajoute -er : schneller als.'},
            ]),
        ],
        a_toi=[
            q('Le superlatif de « gut » :', ['am besten', 'am gutesten', 'am bessersten'], 'Irrégulier.'),
            q('« Er ist … als ich. » (âgé : alt)', ['älter', 'alter', 'mehr alt'], 'Avec Umlaut.'),
            q('« Am liebsten » exprime :', ['la préférence la plus forte', 'l’égalité', 'l’obligation'], 'Gern → lieber → am liebsten.'),
        ],
        sources=[ref('AL-C4-3E-KOMP-01', 'Comparer')]),

    'AL-C4-3E-FUT-01': dict(duree=5, essentiel=
        'Pour un projet : Ich möchte Ingenieurin werden. Nach dem Abitur werde ich studieren.\n'
        'Le présent avec un repère de temps suffit souvent : Nächstes Jahr mache ich ein Praktikum.\n'
        'Les métiers ont une forme féminine en -in : der Lehrer, die Lehrerin.',
        parties=[
            ('Les métiers', [
                mots('Berufe', ('der Arzt / die Ärztin', 'le médecin'), ('der Lehrer / die Lehrerin', 'le professeur'), ('der Ingenieur / die Ingenieurin', 'l’ingénieur'), ('der Koch / die Köchin', 'le cuisinier'), ('das Praktikum', 'le stage')),
                bq('La forme féminine de « der Informatiker » :', ['die Informatikerin', 'die Informatikere', 'die Informatik'], '-in.'),
            ]),
            ('Parler de son avenir', [
                {'type': 'explique', 'texte': 'Später möchte ich als Tierärztin arbeiten, weil ich Tiere liebe.'},
                {'type': 'piege', 'erreur': 'On écrit « Ich möchte ein Arzt werden ».', 'correction': 'Pas d’article devant un métier : Ich möchte Arzt werden.'},
            ]),
        ],
        a_toi=[
            q('Quelle phrase est juste ?', ['Sie wird Lehrerin.', 'Sie wird eine Lehrerin werden sein.', 'Sie werdet Lehrerin.'], 'Pas d’article.'),
            q('« Das Praktikum » est :', ['le stage', 'la pratique sportive', 'le bac'], 'En entreprise.'),
            q('« Später » veut dire :', ['plus tard', 'avant', 'souvent'], 'Repère de futur.'),
        ],
        sources=[ref('AL-C4-3E-FUT-01', 'Projets et métiers')]),

    'AL-C4-3E-PRET-01': dict(duree=5, essentiel=
        'Le prétérit sert surtout à l’écrit et dans les récits : Es war einmal… (il était une fois).\n'
        'À l’oral, on l’emploie pour sein, haben et les verbes de modalité : ich war, ich hatte, ich konnte, ich musste.\n'
        'Aux 1re et 3e personnes du singulier, ces formes n’ont pas de terminaison : ich war, er war.',
        parties=[
            ('Les formes utiles', [
                {'type': 'tableau', 'titre': 'Prétérit', 'colonnes': ['Infinitif', 'ich / er', 'wir / sie'], 'lignes': [
                    ['sein', 'war', 'waren'], ['haben', 'hatte', 'hatten'], ['können', 'konnte', 'konnten'], ['müssen', 'musste', 'mussten'], ['wollen', 'wollte', 'wollten']]},
                bq('« Gestern … ich krank. »', ['war', 'bin', 'wäre'], 'Sein au prétérit.'),
            ]),
            ('Reconnaitre le prétérit', [
                {'type': 'explique', 'texte': 'Dans un conte : Es war einmal ein König. Er hatte drei Töchter.'},
                {'type': 'piege', 'erreur': 'On ajoute une terminaison : « ich warte » pour « j’étais ».', 'correction': 'Ich war. Warten est un autre verbe (attendre).'},
            ]),
        ],
        a_toi=[
            q('« Wir … keine Zeit. » (prétérit de haben)', ['hatten', 'hatte', 'haben'], 'Wir : -en.'),
            q('« Es war einmal » ouvre :', ['un conte', 'une recette', 'une lettre officielle'], 'Il était une fois.'),
            q('« Ich konnte nicht kommen. » veut dire :', ['Je n’ai pas pu venir.', 'Je ne peux pas venir.', 'Je ne viendrai pas.'], 'Können au prétérit.'),
        ],
        sources=[ref('AL-C4-3E-PRET-01', 'Le prétérit')]),

    'AL-C4-3E-GESCH-01': dict(duree=6, essentiel=
        'Le mur de Berlin est construit en 1961 par la RDA ; il sépare Berlin-Est de Berlin-Ouest.\n'
        'Il tombe le 9 novembre 1989. L’Allemagne est réunifiée le 3 octobre 1990, jour de la fête nationale.\n'
        'L’Allemagne est un État fédéral : 16 Länder, un Parlement fédéral (Bundestag), un chancelier.',
        parties=[
            ('Du mur à la réunification', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1949, 'date': '1949', 'evenement': 'Deux États : RFA à l’ouest, RDA à l’est.'},
                    {'annee': 1961, 'date': '13 aout 1961', 'evenement': 'Construction du mur de Berlin.'},
                    {'annee': 1989, 'date': '9 novembre 1989', 'evenement': 'Chute du mur.'},
                    {'annee': 1990, 'date': '3 octobre 1990', 'evenement': 'Réunification.'}]},
                bq('Le Tag der Deutschen Einheit célèbre :', ['la réunification', 'la chute du mur', 'la construction du mur'], 'Le 3 octobre.'),
            ]),
            ('Le fédéralisme', [
                mots('Institutions', ('der Bundestag', 'le Parlement fédéral'), ('der Bundeskanzler / die Bundeskanzlerin', 'le chef du gouvernement'), ('das Bundesland', 'l’État fédéré (Land)'), ('die Hauptstadt Berlin', 'la capitale Berlin')),
                {'type': 'piege', 'erreur': 'On confond la chute du mur (1989) et la réunification (1990).', 'correction': 'Le mur tombe le 9 novembre 1989, la réunification a lieu le 3 octobre 1990.'},
            ]),
        ],
        a_toi=[
            q('Le mur de Berlin est tombé en :', ['1989', '1961', '1990'], 'Le 9 novembre.'),
            q('L’Allemagne compte :', ['16 Länder', '13 régions', '50 États'], 'Bundesländer.'),
            q('Le Bundestag est :', ['le Parlement fédéral', 'le gouvernement d’un Land', 'la Cour suprême'], 'À Berlin.'),
        ],
        sources=[ref('AL-C4-3E-GESCH-01', 'Repères d’histoire allemande')]),

    'AL-C4-3E-REL-01': dict(duree=6, essentiel=
        'Le pronom relatif reprend le genre du nom : der Mann, der… ; die Frau, die… ; das Kind, das…\n'
        'Dans la relative, le verbe conjugué va à la fin : Das ist der Junge, der neben mir wohnt.\n'
        'Si le pronom est complément, il prend son cas : der Film, den ich gesehen habe.',
        parties=[
            ('Former une relative', [
                {'type': 'tableau', 'titre': 'Relatifs', 'colonnes': ['Nom', 'Sujet', 'Complément (accusatif)'], 'lignes': [
                    ['der Mann', 'der dort steht', 'den ich kenne'], ['die Frau', 'die dort steht', 'die ich kenne'], ['das Kind', 'das dort steht', 'das ich kenne'], ['die Leute', 'die dort stehen', 'die ich kenne']]},
                bq('« Das ist das Buch, … ich lese. »', ['das', 'der', 'den'], 'Das Buch, neutre.'),
            ]),
            ('Le verbe à la fin', [
                {'type': 'piege', 'erreur': 'On écrit « die Stadt, die ist schön ».', 'correction': 'Verbe à la fin : die Stadt, die schön ist.'},
            ]),
        ],
        a_toi=[
            q('« Der Hund, … du siehst, ist mein Hund. »', ['den', 'der', 'dem'], 'Complément masculin.'),
            q('Quelle phrase est juste ?', ['Die Frau, die hier wohnt, ist Ärztin.', 'Die Frau, die wohnt hier, ist Ärztin.', 'Die Frau, wohnt hier, ist Ärztin.'], 'Verbe à la fin.'),
            q('Le relatif s’accorde en genre avec :', ['le nom qu’il reprend', 'le sujet de la principale', 'le verbe'], 'Der Mann, der…'),
        ],
        sources=[ref('AL-C4-3E-REL-01', 'La relative')]),

    'AL-C4-3E-UMW-01': dict(duree=5, essentiel=
        'Die Umwelt : l’environnement. Der Müll : les déchets. Den Müll trennen : trier les déchets.\n'
        'En Allemagne, beaucoup de bouteilles sont consignées : le Pfand est rendu quand on rapporte la bouteille.\n'
        'Pour proposer : Man sollte… (on devrait), Wir können… (nous pouvons).',
        parties=[
            ('Vocabulaire', [
                mots('Umwelt', ('der Müll', 'les déchets'), ('den Müll trennen', 'trier les déchets'), ('das Pfand', 'la consigne'), ('erneuerbare Energien', 'les énergies renouvelables'), ('Energie sparen', 'économiser l’énergie')),
                bq('« Den Müll trennen » veut dire :', ['trier les déchets', 'jeter les déchets', 'bruler les déchets'], 'Trennen : séparer.'),
            ]),
            ('Proposer des gestes', [
                {'type': 'explique', 'texte': 'Man sollte mit dem Fahrrad zur Schule fahren. Wir können weniger Plastik kaufen.'},
                {'type': 'piege', 'erreur': 'On place l’infinitif après « man sollte » : « Man sollte sparen Wasser ».', 'correction': 'L’infinitif va à la fin : Man sollte Wasser sparen.'},
            ]),
        ],
        a_toi=[
            q('« Das Pfand » est :', ['la consigne', 'la poubelle', 'le recyclage'], 'Rendue au retour.'),
            q('« Man sollte » veut dire :', ['on devrait', 'on doit', 'on peut'], 'Un conseil.'),
            q('« Energie sparen » veut dire :', ['économiser l’énergie', 'produire de l’énergie', 'acheter de l’énergie'], 'Sparen : économiser.'),
        ],
        sources=[ref('AL-C4-3E-UMW-01', 'Environnement : die Umwelt')]),

    'AL-C4-3E-PASS-01': dict(duree=5, essentiel=
        'Le passif se forme avec werden + participe passé en fin de phrase : Das Haus wird gebaut.\n'
        'Au prétérit : wurde + participe. Der Brief wurde gestern geschrieben.\n'
        'L’auteur de l’action est introduit par von + datif : von meiner Mutter.',
        parties=[
            ('Former le passif', [
                {'type': 'tableau', 'titre': 'Actif et passif', 'colonnes': ['Actif', 'Passif'], 'lignes': [
                    ['Man baut eine Schule.', 'Eine Schule wird gebaut.'], ['Goethe schrieb Faust.', 'Faust wurde von Goethe geschrieben.'], ['Der Koch kocht die Suppe.', 'Die Suppe wird vom Koch gekocht.']]},
                bq('« Das Auto … repariert. » (présent)', ['wird', 'ist', 'hat'], 'Werden + participe.'),
            ]),
            ('Von + datif', [
                {'type': 'piege', 'erreur': 'On confond werden passif et werden futur.', 'correction': 'Werden + participe : passif. Werden + infinitif : futur.'},
            ]),
        ],
        a_toi=[
            q('« Hier … Deutsch gesprochen. »', ['wird', 'werden', 'ist'], 'Passif présent.'),
            q('« Die Mauer wurde 1961 gebaut. » est au :', ['passif prétérit', 'futur', 'parfait actif'], 'Wurde + participe.'),
            q('L’auteur de l’action est introduit par :', ['von', 'mit', 'durch den'], 'Von + datif.'),
        ],
        sources=[ref('AL-C4-3E-PASS-01', 'Le passif')]),

    'AL-C4-3E-IND-01': dict(duree=5, essentiel=
        'Une question rapportée sans mot interrogatif commence par ob (si) : Er fragt, ob ich komme.\n'
        'Avec un mot interrogatif, on le garde : Sie fragt, wo ich wohne.\n'
        'Dans les deux cas, le verbe conjugué va à la fin.',
        parties=[
            ('Rapporter une question', [
                {'type': 'tableau', 'titre': 'Direct et indirect', 'colonnes': ['Question directe', 'Question indirecte'], 'lignes': [
                    ['Kommst du?', 'Er fragt, ob ich komme.'], ['Wo wohnst du?', 'Sie fragt, wo ich wohne.'], ['Wann beginnt der Film?', 'Ich weiß nicht, wann der Film beginnt.']]},
                bq('« Hast du Hunger? » → Sie fragt, … ich Hunger habe.', ['ob', 'dass', 'wenn'], 'Question fermée : ob.'),
            ]),
            ('Ob ou wenn', [
                {'type': 'piege', 'erreur': 'On traduit « si » par wenn dans une question rapportée.', 'correction': 'Question rapportée : ob. Wenn exprime une condition ou un moment.'},
            ]),
        ],
        a_toi=[
            q('Quelle phrase est juste ?', ['Ich frage, wie spät es ist.', 'Ich frage, wie spät ist es.', 'Ich frage, ob wie spät es ist.'], 'Verbe à la fin.'),
            q('« Weißt du, ob er kommt? » veut dire :', ['Sais-tu s’il vient ?', 'Sais-tu quand il vient ?', 'Sais-tu qu’il vient ?'], 'Ob : si.'),
            q('Dans une question indirecte, le verbe conjugué est :', ['à la fin', 'en 1re position', 'en 2e position'], 'Comme dans toute subordonnée.'),
        ],
        sources=[ref('AL-C4-3E-IND-01', 'Interrogation indirecte')]),

    'AL-C4-3E-KONN-01': dict(duree=6, essentiel=
        'Denn (car) et aber (mais) ne changent pas l’ordre : le verbe reste en 2e position après le sujet.\n'
        'Deshalb (c’est pourquoi) et trotzdem (malgré tout) occupent la 1re place : le verbe vient juste après.\n'
        'Weil, au contraire, renvoie le verbe à la fin.',
        parties=[
            ('Trois comportements', [
                {'type': 'tableau', 'titre': 'Place du verbe', 'colonnes': ['Connecteur', 'Exemple'], 'lignes': [
                    ['denn, aber', 'Ich bleibe zu Hause, denn ich bin krank.'], ['deshalb, trotzdem', 'Ich bin krank, deshalb bleibe ich zu Hause.'], ['weil', 'Ich bleibe zu Hause, weil ich krank bin.']]},
                bq('« Es regnet, trotzdem … spazieren. »', ['gehe ich', 'ich gehe', 'ich spazieren gehe'], 'Trotzdem en 1re place : verbe puis sujet.'),
            ]),
            ('Le sens', [
                mots('Konnektoren', ('denn', 'car'), ('aber', 'mais'), ('deshalb', 'c’est pourquoi'), ('trotzdem', 'malgré tout, quand même')),
                {'type': 'piege', 'erreur': 'On écrit « deshalb ich bleibe ».', 'correction': 'Après deshalb, le verbe passe avant le sujet : deshalb bleibe ich.'},
            ]),
        ],
        a_toi=[
            q('« Ich lerne viel, denn ich … gute Noten. »', ['will', 'gute Noten will', 'will ich'], 'Denn : ordre normal.'),
            q('« Deshalb » exprime :', ['une conséquence', 'une cause', 'une opposition'], 'C’est pourquoi.'),
            q('« Er ist müde, … spielt er weiter. »', ['trotzdem', 'denn', 'weil'], 'Malgré tout.'),
        ],
        sources=[ref('AL-C4-3E-KONN-01', 'Deshalb, trotzdem, denn')]),
}

ecrire(COURS)
