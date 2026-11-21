"""Lot de cours : français 4e (programme 2020, en vigueur en 4e jusqu'en 2026-2027). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-4e-francais.py
    python3 scripts/cours/pages.py content/cours/FR-C4-4E-*.json

Cycle 4 : phrases de 25 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
Œuvres citées par leur titre et leur date, sans extrait ; exemples inventés.
"""
from commun import bq, ecrire, q, source_referentiel as ref

COURS = {
    'FR-C4-4E-GRAM-51': dict(duree=7, essentiel=
        'La subordonnée relative complète un nom, son antécédent. Elle commence par un pronom relatif : qui, que, dont, où, lequel.\n'
        'La subordonnée conjonctive complète souvent un verbe. Elle commence par la conjonction que, qui n’a pas d’antécédent.\n'
        '« Le livre que je lis » : relative. « Je sais que tu viens » : conjonctive.',
        parties=[
            ('Deux « que »', [
                {'type': 'tableau', 'titre': 'Relative ou conjonctive ?', 'colonnes': ['Phrase', 'Que complète', 'Subordonnée'], 'lignes': [
                    ['Le livre que je lis est épais.', 'le nom livre, son antécédent', 'relative'], ['Je sais que tu viens.', 'le verbe sais', 'conjonctive'],
                    ['La ville où je suis né est loin.', 'le nom ville', 'relative'], ['Il pense que la pluie cessera.', 'le verbe pense', 'conjonctive']]},
                bq('« L’ami dont je te parle arrive. » La subordonnée est :', ['relative', 'conjonctive', 'interrogative'], 'Dont reprend l’antécédent ami.'),
            ]),
            ('Le test', [
                {'type': 'methode', 'titre': 'Pour distinguer', 'etapes': [
                    'Cherche un nom juste avant que : c’est peut-être l’antécédent.', 'Remplace que par ce nom : « je lis le livre ». Si ça marche, que est un pronom relatif.', 'Sinon, que est une conjonction : la subordonnée est conjonctive.']},
                {'type': 'piege', 'erreur': 'On croit que toute subordonnée qui commence par que est relative.', 'correction': 'Après un verbe comme penser, savoir ou dire, que est le plus souvent une conjonction.'},
            ]),
        ],
        a_toi=[
            q('« Je crois qu’il a raison. » La subordonnée est :', ['conjonctive', 'relative', 'indépendante'], 'Que complète le verbe crois.'),
            q('Dans « La maison qui brule », l’antécédent est :', ['maison', 'brule', 'qui'], 'Qui reprend le nom maison.'),
            q('Lequel est un pronom relatif ?', ['dont', 'parce que', 'si'], 'Dont reprend un antécédent.'),
        ],
        sources=[ref('FR-C4-4E-GRAM-51', 'Relative ou conjonctive')]),

    'FR-C4-4E-GRAM-52': dict(duree=6, essentiel=
        'Une interrogative indirecte pose une question à l’intérieur d’une phrase, après un verbe comme demander, savoir ou ignorer.\n'
        'Elle commence par si, qui, ce que, où, quand, comment ou pourquoi.\n'
        'Elle ne garde ni l’inversion du sujet ni le point d’interrogation : « Où vas-tu ? » devient « Je me demande où tu vas. »',
        parties=[
            ('Transformer', [
                {'type': 'tableau', 'titre': 'Interrogation directe et indirecte', 'colonnes': ['Directe', 'Indirecte'], 'lignes': [
                    ['Viens-tu ?', 'Je me demande si tu viens.'], ['Qui a appelé ?', 'Dis-moi qui a appelé.'], ['Que veux-tu ?', 'Je ne sais pas ce que tu veux.'], ['Pourquoi pleure-t-il ?', 'J’ignore pourquoi il pleure.']]},
                bq('« Quand partez-vous ? » à l’interrogation indirecte :', ['Je vous demande quand vous partez.', 'Je vous demande quand partez-vous ?', 'Je vous demande que vous partez.'], 'Pas d’inversion, pas de point d’interrogation.'),
            ]),
            ('Les erreurs fréquentes', [
                {'type': 'piege', 'erreur': 'On écrit « Je me demande qu’est-ce que tu fais ».', 'correction': '« Qu’est-ce que » devient « ce que » : je me demande ce que tu fais.'},
            ]),
        ],
        a_toi=[
            q('« Est-il prêt ? » à l’interrogation indirecte :', ['Je me demande s’il est prêt.', 'Je me demande est-il prêt.', 'Je me demande qu’il est prêt.'], 'Une question fermée devient si.'),
            q('Une interrogative indirecte se termine par :', ['un point', 'un point d’interrogation', 'des guillemets'], 'La phrase entière n’est pas une question.'),
            q('« J’ignore comment il a fait. » La subordonnée est :', ['interrogative indirecte', 'relative', 'conjonctive de cause'], 'Elle dépend du verbe ignorer.'),
        ],
        sources=[ref('FR-C4-4E-GRAM-52', 'Interrogative indirecte')]),

    'FR-C4-4E-GRAM-53': dict(duree=6, essentiel=
        'L’apposition apporte une précision sur un nom ou un pronom. Elle en est séparée par une virgule ou par deux-points.\n'
        'Elle peut être un groupe nominal, un adjectif ou un participe : « Paris, capitale de la France, attire les touristes. »\n'
        'L’apposition désigne la même réalité que le nom ; on peut la supprimer sans rendre la phrase fausse.',
        parties=[
            ('Apposition, épithète, complément du nom', [
                {'type': 'tableau', 'titre': 'Comparer', 'colonnes': ['Exemple', 'Fonction'], 'lignes': [
                    ['Paris, capitale de la France, attire les touristes.', 'apposition'], ['Une ville immense', 'épithète, sans virgule'],
                    ['La capitale de la France', 'complément du nom, sans virgule'], ['Épuisé, le coureur s’assit.', 'apposition, détachée en tête']]},
                bq('Dans « Léa, fatiguée, s’endormit », « fatiguée » est :', ['apposé', 'épithète', 'attribut du sujet'], 'Il est détaché par des virgules.'),
            ]),
            ('La virgule change le sens', [
                {'type': 'explique', 'texte': '« Les élèves, fatigués, sont rentrés » : tous les élèves sont fatigués. « Les élèves fatigués sont rentrés » : seulement ceux qui l’étaient.'},
                {'type': 'piege', 'erreur': 'On confond apposition et complément du nom : « la tour Eiffel, monument de Paris ».', 'correction': 'Monument de Paris désigne la tour Eiffel elle-même, et la virgule le détache : c’est une apposition.'},
            ]),
        ],
        a_toi=[
            q('Dans « Victor Hugo, écrivain célèbre, est né en 1802 », « écrivain célèbre » est :', ['une apposition', 'un complément du nom', 'un COD'], 'Il désigne Victor Hugo et il est détaché.'),
            q('Une apposition est généralement séparée du nom par :', ['une virgule', 'une préposition', 'rien'], 'Ou par deux-points.'),
            q('Dans « une robe de soie », « de soie » est :', ['un complément du nom', 'une apposition', 'un attribut'], 'Pas de virgule, une préposition.'),
        ],
        sources=[ref('FR-C4-4E-GRAM-53', 'L’apposition')]),

    'FR-C4-4E-GRAM-54': dict(duree=7, essentiel=
        'Le complément circonstanciel de conséquence exprime le résultat d’une action.\n'
        'Il est introduit par si bien que, de sorte que, si… que, tellement… que, au point de.\n'
        'La cause répond à « pourquoi ? » ; le but, à « dans quelle intention ? » ; la conséquence, à « avec quel résultat ? ».',
        parties=[
            ('Cause, conséquence, but', [
                {'type': 'tableau', 'titre': 'Trois relations', 'colonnes': ['Relation', 'Outils', 'Exemple'], 'lignes': [
                    ['cause', 'parce que, car, puisque, comme', 'Les routes sont bloquées parce qu’il a neigé.'], ['conséquence', 'si bien que, de sorte que, tellement… que', 'Il a neigé, si bien que les routes sont bloquées.'],
                    ['but', 'pour que, afin que, pour, afin de', 'On sale les routes pour qu’elles restent praticables.']]},
                bq('« Il a tellement couru qu’il est épuisé. » La subordonnée exprime :', ['la conséquence', 'la cause', 'le but'], 'Épuisé est le résultat de la course.'),
            ]),
            ('Ne pas confondre', [
                {'type': 'piege', 'erreur': 'On confond but et conséquence : « Il travaille pour réussir » serait une conséquence.', 'correction': 'Pour réussir exprime une intention, pas un résultat obtenu : c’est un but.'},
            ]),
        ],
        a_toi=[
            q('« Il pleuvait si fort que le match fut annulé. » C’est :', ['une conséquence', 'une cause', 'un but'], 'Si… que : le résultat de la pluie.'),
            q('« Je me dépêche afin d’arriver à l’heure. » C’est :', ['un but', 'une conséquence', 'une cause'], 'Une intention.'),
            q('« Comme il était malade, il resta au lit. » C’est :', ['une cause', 'une conséquence', 'un but'], 'Comme introduit la cause en tête de phrase.'),
        ],
        sources=[ref('FR-C4-4E-GRAM-54', 'Complément de conséquence')]),

    'FR-C4-4E-GRAM-55': dict(duree=6, essentiel=
        'Un déterminant accompagne un nom ; un pronom le remplace.\n'
        'Le pronom possessif indique à qui appartient la chose : le mien, la tienne, les leurs. « Mon vélo est rouge, le tien est bleu. »\n'
        'Le pronom démonstratif désigne en montrant : celui, celle-ci, ceux-là, ce, cela.',
        parties=[
            ('Pronom ou déterminant ?', [
                {'type': 'tableau', 'titre': 'Possessifs et démonstratifs', 'colonnes': ['Classe', 'Déterminant', 'Pronom'], 'lignes': [
                    ['possessif', 'mon vélo, leurs livres', 'le mien, les leurs'], ['démonstratif', 'ce vélo, ces livres', 'celui-ci, ceux-là']]},
                bq('Dans « Ta trousse est pleine, la mienne est vide », « la mienne » est :', ['un pronom possessif', 'un déterminant possessif', 'un pronom démonstratif'], 'Il remplace « ma trousse ».'),
            ]),
            ('Accorder', [
                {'type': 'explique', 'texte': 'Le pronom possessif s’accorde avec la chose possédée et varie selon le possesseur : le sien, la sienne, les siens, les siennes.'},
                {'type': 'piege', 'erreur': 'On écrit « le leurs ».', 'correction': 'Le leur (une chose), les leurs (plusieurs choses).'},
            ]),
        ],
        a_toi=[
            q('Dans « Prends celle-là », « celle-là » est :', ['un pronom démonstratif', 'un déterminant démonstratif', 'un pronom possessif'], 'Il désigne en montrant.'),
            q('« Nos places sont prises, mais … sont libres. » (à vous)', ['les vôtres', 'vos', 'les votres'], 'Pronom possessif pluriel, avec accent circonflexe.'),
            q('Dans « cette maison », « cette » est :', ['un déterminant démonstratif', 'un pronom démonstratif', 'un pronom possessif'], 'Il accompagne le nom maison.'),
        ],
        sources=[ref('FR-C4-4E-GRAM-55', 'Démonstratifs et possessifs')]),

    'FR-C4-4E-GRAM-56': dict(duree=5, essentiel=
        'Le comparatif compare deux éléments : plus grand que, aussi grand que, moins grand que.\n'
        'Le superlatif relatif place un élément au-dessus ou au-dessous de tous : le plus grand, le moins grand.\n'
        'Certains adjectifs ont des formes particulières : bon donne meilleur, le meilleur.',
        parties=[
            ('Les degrés de l’adjectif', [
                {'type': 'tableau', 'titre': 'Comparatif et superlatif', 'colonnes': ['Degré', 'Exemple'], 'lignes': [
                    ['comparatif de supériorité', 'Léa est plus rapide que Tom.'], ['comparatif d’égalité', 'Léa est aussi rapide que Tom.'], ['comparatif d’infériorité', 'Léa est moins rapide que Tom.'],
                    ['superlatif relatif', 'Léa est la plus rapide de la classe.'], ['superlatif absolu', 'Léa est très rapide.']]},
                bq('« C’est le sommet le plus haut des Alpes. » C’est :', ['un superlatif', 'un comparatif', 'une apposition'], 'Le plus haut de tous.'),
            ]),
            ('Formes particulières', [
                {'type': 'piege', 'erreur': 'On écrit « plus bon que ».', 'correction': 'Bon a un comparatif particulier : meilleur que. Le superlatif est le meilleur.'},
            ]),
        ],
        a_toi=[
            q('« Ce gâteau est … que l’autre. » (bon, supériorité)', ['meilleur', 'plus bon', 'le meilleur'], 'Comparatif irrégulier.'),
            q('« Il est très calme. » C’est un :', ['superlatif absolu', 'comparatif d’égalité', 'superlatif relatif'], 'Très, sans comparaison.'),
            q('« Ce film est aussi long que le premier. » C’est un comparatif :', ['d’égalité', 'de supériorité', 'd’infériorité'], 'Aussi… que.'),
        ],
        sources=[ref('FR-C4-4E-GRAM-56', 'Comparatif et superlatif')]),

    'FR-C4-4E-GRAM-57': dict(duree=5, essentiel=
        'À la forme impersonnelle, le pronom il ne désigne personne et ne remplace rien.\n'
        'Certains verbes ne s’emploient qu’ainsi : il pleut, il neige, il faut.\n'
        'D’autres peuvent l’être : « il est arrivé un accident ». Le sujet réel est alors placé après le verbe.',
        parties=[
            ('Reconnaitre', [
                {'type': 'tableau', 'titre': 'Il désigne-t-il quelqu’un ?', 'colonnes': ['Phrase', 'Il', 'Forme'], 'lignes': [
                    ['Il pleut.', 'ne désigne personne', 'impersonnelle'], ['Il faut partir.', 'ne désigne personne', 'impersonnelle'], ['Il manque deux élèves.', 'ne désigne personne', 'impersonnelle'], ['Il arrive en retard.', 'désigne un garçon', 'personnelle']]},
                bq('Dans « Il est interdit de fumer », la forme est :', ['impersonnelle', 'personnelle', 'passive'], 'Il ne représente personne.'),
            ]),
            ('Le sujet réel', [
                {'type': 'explique', 'texte': '« Il manque deux élèves » signifie « deux élèves manquent ». Il est le sujet grammatical ; deux élèves est le sujet réel.'},
                {'type': 'piege', 'erreur': 'On accorde le verbe avec le sujet réel : « Il manquent deux élèves ».', 'correction': 'Le verbe s’accorde avec il : il manque, au singulier.'},
            ]),
        ],
        a_toi=[
            q('« Il … trois jours avant les vacances. » (rester, présent)', ['reste', 'restent', 'restes'], 'Accord avec il.'),
            q('Lequel est à la forme impersonnelle ?', ['Il neige depuis ce matin.', 'Il chante bien.', 'Il mange une pomme.'], 'Il ne désigne personne.'),
            q('Dans « Il faut lire », il est :', ['un pronom impersonnel', 'un pronom qui remplace un garçon', 'un déterminant'], 'Falloir ne s’emploie qu’à la forme impersonnelle.'),
        ],
        sources=[ref('FR-C4-4E-GRAM-57', 'Forme impersonnelle')]),

    'FR-C4-4E-GRAM-58': dict(duree=6, essentiel=
        'Le sujet peut être éloigné du verbe par des compléments, ou placé après lui.\n'
        'Pour le trouver, on pose la question « qui est-ce qui ? » ou « qu’est-ce qui ? » devant le verbe.\n'
        '« Dans la forêt vivaient des loups » : le sujet de vivaient est « des loups ».',
        parties=[
            ('Repérer le sujet', [
                {'type': 'tableau', 'titre': 'Des sujets difficiles à voir', 'colonnes': ['Phrase', 'Verbe', 'Sujet'], 'lignes': [
                    ['Dans la forêt vivaient des loups.', 'vivaient', 'des loups'], ['Les enfants, chaque matin, courent au parc.', 'courent', 'les enfants'], ['Les feuilles que le vent emporte tourbillonnent.', 'tourbillonnent', 'les feuilles'], ['Que disent les élèves ?', 'disent', 'les élèves']]},
                bq('« Au bout du chemin se dressaient deux tours. » Le sujet est :', ['deux tours', 'le chemin', 'au bout'], 'Qu’est-ce qui se dressait ?'),
            ]),
            ('Accorder', [
                {'type': 'piege', 'erreur': 'Dans « Les feuilles que le vent emporte », on écrit « emportent ».', 'correction': 'Le sujet d’emporte est le vent : singulier. Celui de tourbillonnent est les feuilles.'},
            ]),
        ],
        a_toi=[
            q('« Sur la place … les musiciens. » (jouer, présent)', ['jouent', 'joue', 'jouons'], 'Le sujet inversé est les musiciens.'),
            q('« Les lettres que m’envoie ma sœur … » Le sujet de « envoie » est :', ['ma sœur', 'les lettres', 'que'], 'Qui est-ce qui envoie ?'),
            q('Pour trouver le sujet, on pose la question :', ['qui est-ce qui… ?', 'à qui… ?', 'où… ?'], 'Devant le verbe.'),
        ],
        sources=[ref('FR-C4-4E-GRAM-58', 'Sujet éloigné du verbe')]),

    'FR-C4-4E-CONJ-51': dict(duree=7, essentiel=
        'Le subjonctif passé se forme avec l’auxiliaire au subjonctif présent et le participe passé : qu’il ait fini, qu’elle soit partie.\n'
        'Le conditionnel passé se forme avec l’auxiliaire au conditionnel présent : il aurait fini, elle serait partie.\n'
        'Le conditionnel passé exprime souvent un regret ou une action qui ne s’est pas réalisée.',
        parties=[
            ('Former', [
                {'type': 'tableau', 'titre': 'Deux temps composés', 'colonnes': ['Personne', 'Subjonctif passé', 'Conditionnel passé'], 'lignes': [
                    ['je', 'que j’aie fini', 'j’aurais fini'], ['il, elle', 'qu’il ait fini', 'il aurait fini'], ['nous', 'que nous soyons partis', 'nous serions partis'], ['ils, elles', 'qu’ils soient partis', 'ils seraient partis']]},
                bq('« Il aurait aimé venir » est au :', ['conditionnel passé', 'subjonctif passé', 'plus-que-parfait'], 'Avoir au conditionnel présent + participe passé.'),
            ]),
            ('Les emplois', [
                {'type': 'explique', 'texte': '« Si j’avais su, je serais venu » : le conditionnel passé exprime une action qui ne s’est pas produite.'},
                {'type': 'piege', 'erreur': 'On confond « j’aurais » (conditionnel) et « j’aurai » (futur).', 'correction': 'Remplace par il : « il aurait » au conditionnel, « il aura » au futur.'},
            ]),
        ],
        a_toi=[
            q('« Je doute qu’elle … partie. »', ['soit', 'est', 'serait'], 'Douter que entraine le subjonctif.'),
            q('« Si tu m’avais prévenu, je t’… attendu. »', ['aurais', 'aurai', 'avais'], 'Conditionnel passé : action non réalisée.'),
            q('« qu’ils aient compris » est au :', ['subjonctif passé', 'conditionnel passé', 'passé composé'], 'Avoir au subjonctif présent.'),
        ],
        sources=[ref('FR-C4-4E-CONJ-51', 'Passés du subjonctif et du conditionnel')]),

    'FR-C4-4E-CONJ-52': dict(duree=7, essentiel=
        'À la voix active, le sujet fait l’action. À la voix passive, le sujet la subit.\n'
        'Le COD de la phrase active devient sujet ; le sujet devient complément d’agent, introduit par par ou de.\n'
        'Le verbe se construit avec être, conjugué au temps de la phrase active, et le participe passé accordé avec le sujet.',
        parties=[
            ('Transformer', [
                {'type': 'tableau', 'titre': 'Même temps, deux voix', 'colonnes': ['Temps', 'Voix active', 'Voix passive'], 'lignes': [
                    ['présent', 'Le chat mange la souris.', 'La souris est mangée par le chat.'], ['passé composé', 'Le chat a mangé la souris.', 'La souris a été mangée par le chat.'],
                    ['futur', 'Le chat mangera la souris.', 'La souris sera mangée par le chat.'], ['imparfait', 'Tous admiraient la chanteuse.', 'La chanteuse était admirée de tous.']]},
                bq('« Le jury a choisi les gagnantes » à la voix passive :', ['Les gagnantes ont été choisies par le jury.', 'Les gagnantes sont choisies par le jury.', 'Le jury a été choisi par les gagnantes.'], 'Passé composé : a été + participe passé accordé.'),
            ]),
            ('Ne pas confondre', [
                {'type': 'piege', 'erreur': 'On croit que « Elle est partie » est au passif.', 'correction': 'Partir n’a pas de COD : c’est un passé composé avec être, à la voix active.'},
            ]),
        ],
        a_toi=[
            q('À la voix passive, le complément d’agent est souvent introduit par :', ['par', 'à', 'que'], 'Ou parfois par de.'),
            q('« La lettre sera lue par Tom. » La phrase active est :', ['Tom lira la lettre.', 'Tom lit la lettre.', 'Tom a lu la lettre.'], 'Sera lue : futur.'),
            q('Seuls peuvent passer au passif les verbes qui ont :', ['un COD', 'un COI', 'un attribut'], 'Le COD devient sujet.'),
        ],
        sources=[ref('FR-C4-4E-CONJ-52', 'Voix passive')]),

    'FR-C4-4E-CONJ-53': dict(duree=8, essentiel=
        'Le subjonctif présent s’emploie après des verbes de volonté, d’obligation ou de sentiment : il faut que, je veux que, je doute que.\n'
        'Terminaisons : -e, -es, -e, -ions, -iez, -ent. Que je chante, que nous finissions.\n'
        'Plusieurs verbes sont irréguliers : que tu ailles, que nous fassions, qu’il veuille, que je sois, que j’aie.',
        parties=[
            ('Verbes réguliers', [
                {'type': 'tableau', 'titre': 'Au subjonctif présent', 'colonnes': ['Personne', 'chanter', 'finir'], 'lignes': [
                    ['que je', 'chante', 'finisse'], ['que tu', 'chantes', 'finisses'], ['qu’il', 'chante', 'finisse'], ['que nous', 'chantions', 'finissions'], ['qu’ils', 'chantent', 'finissent']]},
                bq('« Il faut que nous … » (finir)', ['finissions', 'finissons', 'finirons'], 'Subjonctif : -ions.'),
            ]),
            ('Verbes irréguliers', [
                {'type': 'tableau', 'titre': 'À retenir', 'colonnes': ['Verbe', 'que je', 'que nous'], 'lignes': [
                    ['être', 'sois', 'soyons'], ['avoir', 'aie', 'ayons'], ['aller', 'aille', 'allions'], ['faire', 'fasse', 'fassions'], ['vouloir', 'veuille', 'voulions'], ['pouvoir', 'puisse', 'puissions']]},
                {'type': 'piege', 'erreur': 'On écrit « que nous soyions » ou « que nous ayions ».', 'correction': 'Pas de i après le y : que nous soyons, que nous ayons.'},
            ]),
        ],
        a_toi=[
            q('« Je veux que tu … là. » (être)', ['sois', 'es', 'serais'], 'Vouloir que + subjonctif.'),
            q('« Il faut que j’… à la gare. » (aller)', ['aille', 'alle', 'irai'], 'Radical irrégulier aill-.'),
            q('« Bien qu’il … fatigué, il continue. » (être)', ['soit', 'est', 'était'], 'Bien que entraine le subjonctif.'),
        ],
        sources=[ref('FR-C4-4E-CONJ-53', 'Subjonctif présent')]),

    'FR-C4-4E-ORTH-51': dict(duree=7, essentiel=
        'Avec avoir, le participe passé s’accorde avec le COD placé avant le verbe.\n'
        'C’est souvent le cas quand le COD est un pronom personnel : « Ces fleurs, je les ai cueillies. »\n'
        'Pour accorder, on cherche ce que le pronom remplace : son genre et son nombre décident.',
        parties=[
            ('Le pronom COD', [
                {'type': 'tableau', 'titre': 'Accorder avec le, la, l’, les, me, te, nous, vous', 'colonnes': ['Phrase', 'Le pronom remplace', 'Accord'], 'lignes': [
                    ['Ces fleurs, je les ai cueillies.', 'ces fleurs, féminin pluriel', 'cueillies'], ['Ta lettre ? Je l’ai lue.', 'ta lettre, féminin singulier', 'lue'], ['Léa dit : « Tom m’a aidée. »', 'Léa, féminin singulier', 'aidée'], ['Les garçons ? Je les ai vus.', 'les garçons, masculin pluriel', 'vus']]},
                bq('« Mes clés ? Je les ai … » (perdre)', ['perdues', 'perdu', 'perdus'], 'Les remplace mes clés, féminin pluriel.'),
            ]),
            ('Pas d’accord', [
                {'type': 'piege', 'erreur': 'On accorde avec le pronom COI : « Mes sœurs ? Je leur ai parlées. »', 'correction': 'Leur est COI : pas d’accord. Je leur ai parlé.'},
            ]),
        ],
        a_toi=[
            q('« Ces chansons, nous les avons … » (chanter)', ['chantées', 'chanté', 'chantés'], 'Les : chansons, féminin pluriel.'),
            q('Une fille écrit : « Mes parents m’ont … » (appeler)', ['appelée', 'appelé', 'appelés'], 'M’ désigne la fille.'),
            q('« Nous avons … des pommes. » (acheter)', ['acheté', 'achetées', 'achetés'], 'Le COD est après le verbe.'),
        ],
        sources=[ref('FR-C4-4E-ORTH-51', 'Participe passé avec avoir')]),

    'FR-C4-4E-ORTH-52': dict(duree=6, essentiel=
        'Avec le pronom relatif sujet qui, le verbe s’accorde avec l’antécédent : « C’est moi qui suis venu. »\n'
        'Plusieurs sujets de personnes différentes : la 1re personne l’emporte sur les autres, la 2e sur la 3e.\n'
        '« Toi et moi partirons » ; « Léa et toi partirez ».',
        parties=[
            ('Le relatif qui', [
                {'type': 'tableau', 'titre': 'Accord avec l’antécédent', 'colonnes': ['Phrase', 'Antécédent', 'Personne'], 'lignes': [
                    ['C’est moi qui suis venu.', 'moi', '1re du singulier'], ['C’est toi qui as gagné.', 'toi', '2e du singulier'], ['C’est nous qui avons fini.', 'nous', '1re du pluriel']]},
                bq('« C’est vous qui … raison. » (avoir)', ['avez', 'a', 'ont'], 'L’antécédent est vous.'),
            ]),
            ('Plusieurs personnes', [
                {'type': 'tableau', 'titre': 'Qui l’emporte ?', 'colonnes': ['Sujets', 'Équivaut à', 'Exemple'], 'lignes': [
                    ['toi et moi', 'nous', 'Toi et moi partirons.'], ['Léa et toi', 'vous', 'Léa et toi partirez.'], ['Léa et lui', 'ils', 'Léa et lui partiront.']]},
                {'type': 'piege', 'erreur': 'On écrit « C’est moi qui a gagné ».', 'correction': 'Qui reprend moi : le verbe est à la 1re personne. C’est moi qui ai gagné.'},
            ]),
        ],
        a_toi=[
            q('« C’est moi qui … le gâteau. » (faire, passé composé)', ['ai fait', 'a fait', 'as fait'], '1re personne du singulier.'),
            q('« Ton frère et toi … invités. » (être, présent)', ['êtes', 'sont', 'sommes'], 'Ton frère et toi = vous.'),
            q('« Ma mère et moi … » (sortir, présent)', ['sortons', 'sortent', 'sort'], 'Ma mère et moi = nous.'),
        ],
        sources=[ref('FR-C4-4E-ORTH-52', 'Accord du verbe, cas complexes')]),

    'FR-C4-4E-ORTH-53': dict(duree=6, essentiel=
        'Les participes passés se terminent par -é (chanté), -i (fini), -u (vendu), ou par une consonne muette : -s, -t.\n'
        'Pour trouver la consonne muette, on met le participe au féminin : pris, prise ; fait, faite ; offert, offerte.\n'
        'Pour distinguer -é et -er, on remplace par vendu ou vendre.',
        parties=[
            ('La consonne muette', [
                {'type': 'tableau', 'titre': 'Le féminin révèle la fin', 'colonnes': ['Féminin', 'Masculin'], 'lignes': [
                    ['prise', 'pris'], ['faite', 'fait'], ['offerte', 'offert'], ['assise', 'assis'], ['écrite', 'écrit']]},
                bq('Participe passé de « conduire » au masculin :', ['conduit', 'conduis', 'conduie'], 'Au féminin : conduite.'),
            ]),
            ('-é ou -er ?', [
                {'type': 'methode', 'titre': 'Pour choisir', 'etapes': [
                    'Remplace le verbe par vendre ou vendu.', 'Si vendu convient : participe passé, -é.', 'Si vendre convient : infinitif, -er.']},
                {'type': 'piege', 'erreur': 'On écrit « Il a mangé » et « Il va mangé ».', 'correction': '« Il va vendre » : infinitif, il va manger. « Il a vendu » : participe, il a mangé.'},
            ]),
        ],
        a_toi=[
            q('« Il a … la vérité. » (dire)', ['dit', 'dis', 'di'], 'Au féminin : dite.'),
            q('« Elle a … sa veste sur la chaise. » (mettre)', ['mis', 'mit', 'mi'], 'Avec avoir, pas d’accord ici. Au féminin : mise.'),
            q('« Je vais … le repas. » (préparer)', ['préparer', 'préparé', 'préparez'], 'Je vais vendre : infinitif.'),
        ],
        sources=[ref('FR-C4-4E-ORTH-53', 'Participes passés')]),

    'FR-C4-4E-VOC-51': dict(duree=5, essentiel=
        'Des mots de sens voisin peuvent exprimer une même idée avec plus ou moins de force.\n'
        'On les classe par degré d’intensité : tiède < chaud < brulant.\n'
        'Choisir le bon degré rend l’expression précise.',
        parties=[
            ('Graduer', [
                {'type': 'tableau', 'titre': 'Du plus faible au plus fort', 'colonnes': ['Idée', 'Gradation'], 'lignes': [
                    ['température', 'tiède, chaud, brulant'], ['peur', 'inquiétude, peur, terreur'], ['colère', 'agacement, colère, fureur'], ['joie', 'contentement, joie, euphorie']]},
                bq('Lequel exprime la peur la plus forte ?', ['l’épouvante', 'l’inquiétude', 'la crainte'], 'L’épouvante est une peur extrême.'),
            ]),
            ('Choisir le mot juste', [
                {'type': 'piege', 'erreur': 'On emploie toujours le mot le plus fort pour faire de l’effet.', 'correction': 'Un mot trop fort sonne faux : un léger retard ne provoque pas une fureur.'},
            ]),
        ],
        a_toi=[
            q('Range du plus faible au plus fort :', ['murmurer, parler, crier', 'crier, parler, murmurer', 'parler, crier, murmurer'], 'Le volume augmente.'),
            q('Lequel est le plus fort ?', ['adorer', 'aimer', 'apprécier'], 'Adorer est le degré le plus élevé.'),
            q('Un degré plus faible que « froid » :', ['frais', 'glacial', 'gelé'], 'Frais < froid < glacial.'),
        ],
        sources=[ref('FR-C4-4E-VOC-51', 'Degrés d’intensité')]),

    'FR-C4-4E-VOC-52': dict(duree=6, essentiel=
        'La dérivation peut changer la classe d’un mot : rapide (adjectif) donne rapidement (adverbe) et rapidité (nom).\n'
        'Les adjectifs en -ant donnent des adverbes en -amment ; ceux en -ent, des adverbes en -emment.\n'
        'Prudent donne prudemment ; puissant donne puissamment.',
        parties=[
            ('Changer de classe', [
                {'type': 'tableau', 'titre': 'Une famille, plusieurs classes', 'colonnes': ['Adjectif', 'Adverbe', 'Nom'], 'lignes': [
                    ['rapide', 'rapidement', 'rapidité'], ['doux', 'doucement', 'douceur'], ['prudent', 'prudemment', 'prudence'], ['puissant', 'puissamment', 'puissance']]},
                bq('L’adverbe formé sur « évident » est :', ['évidemment', 'évidamment', 'évidentement'], '-ent donne -emment.'),
            ]),
            ('Les pièges d’orthographe', [
                {'type': 'explique', 'texte': '-emment et -amment se prononcent de la même façon. On regarde l’adjectif : prudent avec e, puissant avec a.'},
                {'type': 'piege', 'erreur': 'On écrit « gentillement ».', 'correction': 'L’adverbe de gentil est gentiment, sans double l.'},
            ]),
        ],
        a_toi=[
            q('L’adverbe formé sur « bruyant » est :', ['bruyamment', 'bruyemment', 'bruyantement'], '-ant donne -amment.'),
            q('Le nom formé sur « libre » est :', ['liberté', 'librement', 'libérer'], 'Librement est un adverbe, libérer un verbe.'),
            q('« Lentement » est :', ['un adverbe', 'un adjectif', 'un nom'], 'Formé sur lent avec -ment.'),
        ],
        sources=[ref('FR-C4-4E-VOC-52', 'Dérivation et classe des mots')]),

    'FR-C4-4E-VOC-53': dict(duree=5, essentiel=
        'Un mot polysémique a plusieurs sens. L’ensemble de ces sens forme son champ sémantique.\n'
        '« Pièce » désigne une partie d’un logement, une monnaie, une œuvre de théâtre.\n'
        'C’est le contexte qui indique le sens.',
        parties=[
            ('Plusieurs sens', [
                {'type': 'tableau', 'titre': 'Le mot « pièce »', 'colonnes': ['Contexte', 'Sens'], 'lignes': [
                    ['Cette maison a cinq pièces.', 'partie d’un logement'], ['Il a trouvé une pièce de deux euros.', 'monnaie'], ['Nous avons vu une pièce de Molière.', 'œuvre de théâtre'], ['Il manque une pièce au puzzle.', 'élément d’un ensemble']]},
                bq('« Le chef d’orchestre lève sa baguette. » Ici, baguette désigne :', ['un bâton pour diriger', 'un pain', 'un outil de magie'], 'Le contexte musical décide.'),
            ]),
            ('Champ sémantique ou champ lexical ?', [
                {'type': 'piege', 'erreur': 'On confond champ sémantique et champ lexical.', 'correction': 'Le champ sémantique regroupe les sens d’un mot. Le champ lexical regroupe des mots liés à un même thème.'},
            ]),
        ],
        a_toi=[
            q('Le champ sémantique d’un mot, c’est :', ['les différents sens d’un même mot', 'les mots d’un même thème', 'l’origine d’un mot'], 'Il concerne un seul mot.'),
            q('« La souris de l’ordinateur » : souris désigne :', ['un appareil', 'un animal', 'un fromage'], 'Le contexte informatique.'),
            q('« Mer, vague, sable, plage » forment :', ['un champ lexical', 'un champ sémantique', 'une famille de mots'], 'Des mots liés au thème de la mer.'),
        ],
        sources=[ref('FR-C4-4E-VOC-53', 'Champ sémantique')]),

    'FR-C4-4E-DISC-51': dict(duree=6, essentiel=
        'Au discours indirect, les paroles sont intégrées dans une subordonnée, sans guillemets.\n'
        'On adapte les pronoms, les possessifs et, si le verbe introducteur est au passé, les temps.\n'
        'Hugo répond : « Je suis fatigué. » devient « Hugo répond qu’il est fatigué. »',
        parties=[
            ('La concordance des temps', [
                {'type': 'tableau', 'titre': 'Verbe introducteur au passé', 'colonnes': ['Discours direct', 'Discours indirect'], 'lignes': [
                    ['Il dit : « Je suis fatigué. »', 'Il a dit qu’il était fatigué.'], ['Il dit : « J’ai fini. »', 'Il a dit qu’il avait fini.'], ['Il dit : « Je viendrai. »', 'Il a dit qu’il viendrait.']]},
                bq('Elle a annoncé : « Je partirai demain. » Au discours indirect :', ['Elle a annoncé qu’elle partirait le lendemain.', 'Elle a annoncé qu’elle partirai demain.', 'Elle a annoncé : je partirai.'], 'Futur → conditionnel ; demain → le lendemain.'),
            ]),
            ('Les repères de temps et de lieu', [
                {'type': 'tableau', 'titre': 'Ils changent aussi', 'colonnes': ['Direct', 'Indirect, au passé'], 'lignes': [
                    ['aujourd’hui', 'ce jour-là'], ['demain', 'le lendemain'], ['hier', 'la veille'], ['ici', 'là']]},
                {'type': 'piege', 'erreur': 'On garde « demain » au discours indirect passé.', 'correction': 'Le moment de référence a changé : demain devient le lendemain.'},
            ]),
        ],
        a_toi=[
            q('Il a affirmé : « J’ai tout compris. » Au discours indirect :', ['Il a affirmé qu’il avait tout compris.', 'Il a affirmé qu’il a tout compris.', 'Il a affirmé : il avait tout compris.'], 'Passé composé → plus-que-parfait.'),
            q('Au discours indirect passé, « hier » devient :', ['la veille', 'le lendemain', 'ce jour-là'], 'Le jour d’avant.'),
            q('Le discours indirect se reconnait à :', ['une subordonnée sans guillemets', 'des guillemets et des tirets', 'un point d’exclamation'], 'Les paroles sont intégrées au récit.'),
        ],
        sources=[ref('FR-C4-4E-DISC-51', 'Paroles rapportées indirectement')]),

    'FR-C4-4E-LITT-51': dict(duree=7, essentiel=
        'La poésie lyrique exprime les sentiments du poète, souvent à la première personne.\n'
        'La poésie amoureuse traverse les époques : Ronsard et Louise Labé au XVIe siècle, Victor Hugo au XIXe, Apollinaire au XXe.\n'
        'Ses procédés : le je, l’apostrophe à l’être aimé, les images, le rythme et les rimes.',
        parties=[
            ('Les procédés lyriques', [
                {'type': 'tableau', 'titre': 'Reconnaitre le lyrisme', 'colonnes': ['Procédé', 'Effet'], 'lignes': [
                    ['première personne', 'le poète parle de lui'], ['apostrophe', 'il s’adresse directement à l’être aimé'], ['champ lexical des sentiments', 'amour, souffrance, manque'],
                    ['images', 'comparaisons et métaphores, souvent tirées de la nature'], ['rythme, rimes', 'musicalité du poème']]},
                bq('« Ô toi que j’aime » contient :', ['une apostrophe', 'une comparaison', 'une interrogation indirecte'], 'Le poète s’adresse directement à quelqu’un.'),
            ]),
            ('À travers les siècles', [
                {'type': 'tableau', 'titre': 'Quelques poètes', 'colonnes': ['Siècle', 'Poète', 'Thème fréquent'], 'lignes': [
                    ['XVIe', 'Ronsard, Louise Labé', 'la beauté qui passe, la rose, le temps'], ['XIXe', 'Victor Hugo, Marceline Desbordes-Valmore', 'l’amour, le souvenir'], ['XXe', 'Apollinaire', 'l’amour perdu, le temps qui s’écoule']]},
                {'type': 'piege', 'erreur': 'On croit que le je du poème est toujours le poète lui-même.', 'correction': 'Le je lyrique peut être un personnage ou une voix inventée : on parle de « je lyrique ».'},
            ]),
        ],
        a_toi=[
            q('La poésie lyrique exprime surtout :', ['des sentiments', 'des faits scientifiques', 'des consignes'], 'Elle vient de la lyre, l’instrument du poète.'),
            q('Ronsard écrit au :', ['XVIe siècle', 'XIXe siècle', 'Moyen Âge'], 'C’est un poète de la Renaissance.'),
            q('Un poème lyrique est souvent écrit à la :', ['première personne', 'troisième personne seulement', 'deuxième personne seulement'], 'Le poète dit je.'),
        ],
        sources=[ref('FR-C4-4E-LITT-51', 'Dire l’amour')]),

    'FR-C4-4E-LITT-52': dict(duree=7, essentiel=
        'Au XVIIe siècle, la tragédie et la comédie mettent en scène des conflits entre l’individu et la société.\n'
        'Dans Le Cid de Corneille (1637), Rodrigue doit choisir entre son amour pour Chimène et l’honneur de sa famille.\n'
        'Molière, dans ses comédies, se moque des défauts : l’avarice, la vanité, l’hypocrisie.',
        parties=[
            ('Tragédie et comédie', [
                {'type': 'tableau', 'titre': 'Comparer', 'colonnes': ['Critère', 'Tragédie', 'Comédie'], 'lignes': [
                    ['personnages', 'rois, héros, nobles', 'bourgeois, valets'], ['conflit', 'devoir contre passion', 'défaut ridicule contre bon sens'], ['dénouement', 'souvent malheureux', 'heureux, souvent un mariage'], ['but', 'émouvoir', 'faire rire et corriger les mœurs']]},
                bq('Le dilemme de Rodrigue oppose :', ['l’amour et l’honneur', 'l’argent et la santé', 'la ville et la campagne'], 'Venger son père, c’est blesser Chimène.'),
            ]),
            ('Des comédies de Molière', [
                {'type': 'tableau', 'titre': 'Trois pièces', 'colonnes': ['Pièce', 'Date', 'Défaut moqué'], 'lignes': [
                    ['L’Avare', '1668', 'l’avarice d’Harpagon'], ['Le Bourgeois gentilhomme', '1670', 'la vanité de M. Jourdain'], ['Les Fourberies de Scapin', '1671', 'l’autorité ridicule des pères']]},
                {'type': 'piege', 'erreur': 'On croit qu’une comédie ne parle de rien de sérieux.', 'correction': 'Elle fait rire pour faire réfléchir aux défauts de la société.'},
            ]),
        ],
        a_toi=[
            q('Un dilemme est :', ['un choix difficile entre deux exigences', 'une dispute', 'un monologue'], 'Comme celui de Rodrigue.'),
            q('Harpagon, dans L’Avare, est :', ['avare', 'généreux', 'courageux'], 'Molière se moque de son avarice.'),
            q('Le dénouement d’une comédie est souvent :', ['heureux', 'tragique', 'absent'], 'Souvent un mariage.'),
        ],
        sources=[ref('FR-C4-4E-LITT-52', 'Individu et société')]),

    'FR-C4-4E-LITT-53': dict(duree=7, essentiel=
        'Le récit réaliste du XIXe siècle décrit le monde tel qu’il est, avec précision : Balzac, Maupassant. Zola pousse cette démarche dans le naturalisme.\n'
        'Le récit fantastique fait surgir un évènement étrange dans un cadre réaliste.\n'
        'Le lecteur hésite entre une explication rationnelle et une explication surnaturelle, comme dans Le Horla de Maupassant (1887).',
        parties=[
            ('Réaliste ou fantastique ?', [
                {'type': 'tableau', 'titre': 'Deux types de récits', 'colonnes': ['Critère', 'Réaliste', 'Fantastique'], 'lignes': [
                    ['cadre', 'vrai, précis, daté', 'réaliste au départ'], ['évènement', 'possible', 'étrange, inexpliqué'], ['effet', 'faire voir la société', 'faire douter, inquiéter'], ['exemples', 'Boule de suif, Maupassant', 'Le Horla, Maupassant ; La Vénus d’Ille, Mérimée']]},
                bq('Dans un récit fantastique, le lecteur :', ['hésite entre deux explications', 'sait tout de suite que c’est de la magie', 'lit un conte de fées'], 'Est-ce réel ou imaginaire ?'),
            ]),
            ('Les marques du doute', [
                {'type': 'observe', 'consigne': 'Des indices du fantastique.', 'exemples': ['un narrateur souvent à la première personne', 'des modalisateurs : il me sembla, peut-être, je crus voir', 'la nuit, la solitude, un objet étrange']},
                {'type': 'piege', 'erreur': 'On classe dans le fantastique un récit où les fées existent sans surprise.', 'correction': 'C’est du merveilleux. Le fantastique repose sur le doute.'},
            ]),
        ],
        a_toi=[
            q('« Il me sembla que la statue avait bougé. » Cette phrase marque :', ['le doute', 'une certitude', 'une description réaliste'], 'Il me sembla : un modalisateur.'),
            q('Zola est un écrivain :', ['naturaliste', 'fantastique', 'du Moyen Âge'], 'Il pousse loin la démarche réaliste.'),
            q('Le Horla a été écrit par :', ['Maupassant', 'Molière', 'Ronsard'], 'En 1887.'),
        ],
        sources=[ref('FR-C4-4E-LITT-53', 'Réalisme et fantastique')]),

    'FR-C4-4E-LITT-54': dict(duree=6, essentiel=
        'Un fait peut se vérifier ; une opinion est un avis.\n'
        'Pour vérifier une information, on cherche qui la publie et quand, puis on la recoupe avec d’autres sources.\n'
        'Une photo sortie de son contexte peut faire croire à un évènement inventé.',
        parties=[
            ('Fait ou opinion ?', [
                {'type': 'tableau', 'titre': 'Distinguer', 'colonnes': ['Phrase', 'Nature'], 'lignes': [
                    ['Le collège compte 600 élèves.', 'fait'], ['Ce collège est le meilleur de la ville.', 'opinion'], ['Il a plu 40 mm hier à Lyon.', 'fait'], ['Il fait un temps horrible.', 'opinion']]},
                bq('« Ce film est le plus réussi de l’année. » C’est :', ['une opinion', 'un fait', 'une source'], 'C’est un jugement.'),
            ]),
            ('Vérifier', [
                {'type': 'methode', 'titre': 'Avant de partager une information', 'etapes': [
                    'Qui l’a publiée ? Un média connu, un inconnu ?', 'Quand ? L’information est-elle récente ?', 'D’autres sources sérieuses disent-elles la même chose ?', 'Pour une image, cherche son origine par une recherche d’image inversée.']},
                {'type': 'piege', 'erreur': 'On croit une information parce qu’elle est beaucoup partagée.', 'correction': 'Le nombre de partages ne prouve rien. Seules des sources fiables et recoupées comptent.'},
            ]),
        ],
        a_toi=[
            q('Recouper une information, c’est :', ['la comparer avec d’autres sources', 'la partager', 'la réécrire'], 'Plusieurs sources indépendantes.'),
            q('« Le match a été remporté 2 à 1. » C’est :', ['un fait', 'une opinion', 'une rumeur'], 'Il se vérifie.'),
            q('Une recherche d’image inversée permet :', ['de retrouver l’origine d’une photo', 'de modifier une photo', 'd’agrandir une photo'], 'On voit où et quand elle a été publiée.'),
        ],
        sources=[ref('FR-C4-4E-LITT-54', 'Informer, s’informer, déformer')]),

    'FR-C4-4E-ORAL-51': dict(duree=5, essentiel=
        'Un discours oral a une visée : informer, convaincre, émouvoir ou divertir.\n'
        'Une publicité radio cherche à persuader d’acheter.\n'
        'Ce qui est dit clairement est explicite ; ce qui est suggéré sans être dit est implicite.',
        parties=[
            ('Quatre visées', [
                {'type': 'tableau', 'titre': 'Reconnaitre la visée', 'colonnes': ['Visée', 'Exemple'], 'lignes': [
                    ['informer', 'un bulletin météo'], ['convaincre', 'un débat, une publicité'], ['émouvoir', 'un témoignage'], ['divertir', 'un sketch']]},
                bq('Un candidat explique pourquoi il faut voter pour lui. Visée :', ['convaincre', 'divertir', 'informer seulement'], 'Il cherche à faire adhérer.'),
            ]),
            ('Explicite et implicite', [
                {'type': 'explique', 'texte': '« Tu as vu l’heure ? » ne demande pas l’heure : la phrase suggère que la personne est en retard. C’est implicite.'},
                {'type': 'piege', 'erreur': 'On ne retient que les mots prononcés.', 'correction': 'Le ton, la musique et ce qui est sous-entendu comptent aussi.'},
            ]),
        ],
        a_toi=[
            q('Un journal radio du matin a pour visée principale :', ['informer', 'divertir', 'émouvoir'], 'Il rapporte des faits.'),
            q('« Il fait froid ici… » pour demander de fermer la fenêtre : la demande est :', ['implicite', 'explicite', 'absente'], 'Elle est suggérée.'),
            q('Un humoriste sur scène veut surtout :', ['divertir', 'informer', 'convaincre'], 'Faire rire.'),
        ],
        sources=[ref('FR-C4-4E-ORAL-51', 'Visées d’un discours oral')]),

    'FR-C4-4E-IMG-51': dict(duree=6, essentiel=
        'Analyser une image, c’est décrire ce qu’on voit, puis expliquer les choix de l’auteur.\n'
        'On observe le cadrage, le plan, l’angle de vue, la composition, la lumière et les couleurs.\n'
        'Une contre-plongée grandit le personnage et lui donne de la puissance.',
        parties=[
            ('Les outils', [
                {'type': 'tableau', 'titre': 'Vocabulaire de l’image', 'colonnes': ['Notion', 'Exemples et effets'], 'lignes': [
                    ['plan', 'plan d’ensemble : décor ; gros plan : émotion du visage'], ['angle de vue', 'plongée : écrase ; contre-plongée : grandit'],
                    ['composition', 'lignes de force, premier plan, arrière-plan'], ['couleurs', 'chaudes : énergie ; froides : calme ou tristesse']]},
                bq('Un personnage photographié d’en haut paraît :', ['petit, vulnérable', 'puissant', 'immense'], 'C’est une plongée.'),
            ]),
            ('Décrire puis interpréter', [
                {'type': 'methode', 'titre': 'Pour analyser une affiche', 'etapes': [
                    'Identifie : auteur, date, nature de l’image.', 'Décris : personnages, décor, texte, couleurs.', 'Analyse : plan, angle, composition.', 'Interprète : quelle intention, quel effet sur le spectateur ?']},
                {'type': 'piege', 'erreur': 'On donne son avis avant d’avoir décrit l’image.', 'correction': 'On part de ce qu’on voit : chaque interprétation s’appuie sur un élément visible.'},
            ]),
        ],
        a_toi=[
            q('Un gros plan sur un visage sert surtout à montrer :', ['une émotion', 'le décor', 'la foule'], 'On voit l’expression de près.'),
            q('Un plan d’ensemble montre :', ['le décor et la situation', 'un détail', 'les yeux d’un personnage'], 'Vue large.'),
            q('Des couleurs froides créent souvent une impression de :', ['calme ou tristesse', 'colère', 'chaleur'], 'Bleus, verts, gris.'),
        ],
        sources=[ref('FR-C4-4E-IMG-51', 'Analyser une image fixe')]),

    'FR-C4-4E-LECT-51': dict(duree=6, essentiel=
        'Pour justifier une interprétation, on cite le texte entre guillemets, puis on explique ce que la citation montre.\n'
        'Une citation seule ne prouve rien : il faut faire le lien avec l’idée.\n'
        '« Il serrait les poings » : la citation montre sa colère retenue.',
        parties=[
            ('Idée, citation, explication', [
                {'type': 'methode', 'titre': 'Construire une justification', 'etapes': [
                    'Énonce ton idée : le personnage est en colère.', 'Cite le texte : « il serrait les poings ».', 'Explique : ce geste montre une colère qu’il retient.']},
                bq('Après une citation, il faut :', ['expliquer ce qu’elle montre', 'passer à autre chose', 'la recopier deux fois'], 'L’explication fait le lien avec l’idée.'),
            ]),
            ('Bien citer', [
                {'type': 'tableau', 'titre': 'Les règles', 'colonnes': ['Règle', 'Exemple'], 'lignes': [
                    ['citer exactement, entre guillemets', '« il serrait les poings »'], ['couper avec […]', '« il serrait […] les poings »'], ['intégrer à sa phrase', 'Le narrateur précise qu’« il serrait les poings ».']]},
                {'type': 'piege', 'erreur': 'On cite un long passage sans dire quels mots comptent.', 'correction': 'On choisit quelques mots précis et on les commente.'},
            ]),
        ],
        a_toi=[
            q('« Elle baissa les yeux et rougit. » Cette citation montre plutôt :', ['sa gêne', 'sa colère', 'sa joie bruyante'], 'Baisser les yeux, rougir : des signes de gêne.'),
            q('Pour supprimer des mots dans une citation, on utilise :', ['[…]', '( )', '< >'], 'Les crochets signalent une coupure.'),
            q('Une interprétation solide s’appuie sur :', ['des citations commentées', 'une impression', 'le résumé du livre'], 'Idée, citation, explication.'),
        ],
        sources=[ref('FR-C4-4E-LECT-51', 'Justifier son interprétation')]),
}

ecrire(COURS)
