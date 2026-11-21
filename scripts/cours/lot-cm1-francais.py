"""Lot de cours : français CM1. Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-cm1-francais.py
    python3 scripts/cours/pages.py content/cours/FR-C3-CM1-*.json

Cycle 3 : phrases de 20 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
"""
from commun import bq, ecrire, q, source_referentiel as ref, vocabulaire

COURS = {
    'FR-C3-CM1-CONJ-01': dict(duree=8, essentiel=
        'Le présent dit ce qui se passe maintenant. L’imparfait raconte le passé. Le futur annonce ce qui arrivera.\n'
        'Imparfait : -ais, -ais, -ait, -ions, -iez, -aient.\n'
        'Futur : -rai, -ras, -ra, -rons, -rez, -ront.',
        parties=[
            ('Trois temps', [
                {'type': 'tableau', 'titre': 'À la première personne', 'colonnes': ['Verbe', 'Présent', 'Imparfait', 'Futur'], 'lignes': [
                    ['chanter', 'je chante', 'je chantais', 'je chanterai'], ['finir', 'je finis', 'je finissais', 'je finirai'],
                    ['être', 'je suis', 'j’étais', 'je serai'], ['avoir', 'j’ai', 'j’avais', 'j’aurai'],
                    ['aller', 'je vais', 'j’allais', 'j’irai'], ['faire', 'je fais', 'je faisais', 'je ferai'],
                    ['dire', 'je dis', 'je disais', 'je dirai'], ['venir', 'je viens', 'je venais', 'je viendrai'],
                    ['pouvoir', 'je peux', 'je pouvais', 'je pourrai'], ['voir', 'je vois', 'je voyais', 'je verrai'],
                    ['vouloir', 'je veux', 'je voulais', 'je voudrai'], ['prendre', 'je prends', 'je prenais', 'je prendrai']]},
                bq('Demain, nous (finir) le livre.', ['finirons', 'finissons', 'finissions'], 'Demain : futur, terminaison -rons.'),
            ]),
            ('Ne pas confondre', [
                {'type': 'piege', 'erreur': 'On écrit « nous chantions » pour parler de maintenant.', 'correction': 'Au présent : nous chantons. La terminaison -ions est celle de l’imparfait.'},
                {'type': 'explique', 'texte': 'Au futur, plusieurs verbes changent de radical : j’irai, je ferai, je viendrai, je pourrai, je verrai, je voudrai.'},
            ]),
        ],
        a_toi=[
            q('Hier, il (faire) beau.', ['faisait', 'fera', 'fait'], 'Hier : imparfait.'),
            q('Demain, vous (venir) avec nous.', ['viendrez', 'venez', 'veniez'], 'Futur de venir : radical viendr-.'),
            q('Ils (prendre) le bus chaque jour.', ['prennent', 'prenaient', 'prendront'], 'Une habitude actuelle : présent.'),
        ],
        sources=[ref('FR-C3-CM1-CONJ-01', 'Présent, imparfait, futur')]),

    'FR-C3-CM1-CONJ-02': dict(duree=7, essentiel=
        'Le passé composé a deux parties : l’auxiliaire avoir ou être au présent, et le participe passé.\n'
        'J’ai mangé. Elle est partie.\n'
        'À la forme négative, ne et pas encadrent l’auxiliaire : je n’ai pas mangé.',
        parties=[
            ('Deux parties', [
                vocabulaire(3, 'Auxiliaire', 'Participe passé'),
                {'type': 'tableau', 'titre': 'Des participes passés', 'colonnes': ['Infinitif', 'Participe passé'], 'lignes': [
                    ['chanter', 'chanté'], ['finir', 'fini'], ['prendre', 'pris'], ['faire', 'fait'], ['venir', 'venu'],
                    ['voir', 'vu'], ['dire', 'dit'], ['pouvoir', 'pu'], ['vouloir', 'voulu'], ['aller', 'allé']]},
                bq('Tu (finir) ton travail.', ['as fini', 'es fini', 'as finis'], 'Auxiliaire avoir et participe fini.'),
            ]),
            ('Retrouver l’infinitif et la négation', [
                {'type': 'explique', 'texte': 'Dans « nous avons vu », le participe est vu : l’infinitif est voir.'},
                {'type': 'piege', 'erreur': 'On écrit « je n’ai mangé pas ».', 'correction': 'La négation encadre l’auxiliaire : je n’ai pas mangé.'},
            ]),
        ],
        a_toi=[
            q('Quel est l’infinitif de « ils ont pris » ?', ['prendre', 'prier', 'pris'], 'Pris est le participe passé de prendre.'),
            q('Forme négative de « elle est venue » :', ['elle n’est pas venue', 'elle n’est venue pas', 'elle pas est venue'], 'Ne et pas autour de l’auxiliaire.'),
            q('Nous (voir) un film.', ['avons vu', 'sommes vus', 'avons voir'], 'Auxiliaire avoir et participe vu.'),
        ],
        sources=[ref('FR-C3-CM1-CONJ-02', 'Le passé composé')]),

    'FR-C3-CM1-ORTH-01': dict(duree=7, essentiel=
        'Le verbe s’accorde avec son sujet.\n'
        'Pour trouver le sujet, on pose la question « qui est-ce qui ? » devant le verbe.\n'
        'Dans un groupe nominal sujet, c’est le nom noyau qui commande : les fleurs du jardin poussent.',
        parties=[
            ('Trouver le sujet', [
                {'type': 'methode', 'titre': 'Pour accorder le verbe', 'etapes': [
                    'Trouve le verbe.', 'Pose « qui est-ce qui ? » devant lui.', 'Dans le groupe sujet, repère le nom noyau.', 'Accorde le verbe avec ce noyau.']},
                {'type': 'exemple-resolu', 'enonce': 'Accorde : « Le chien des voisins (aboyer). »', 'etapes': [
                    'Qui est-ce qui aboie ? Le chien des voisins.', 'Le noyau est chien, au singulier.'],
                 'conclusion': 'Le chien des voisins aboie.'},
            ]),
            ('Le piège du nom le plus proche', [
                {'type': 'piege', 'erreur': 'On accorde avec le nom le plus proche : « le chat des voisins dorment ».', 'correction': 'Le noyau est chat : le chat des voisins dort.'},
                bq('La boite de crayons (être) pleine.', ['est', 'sont', 'es'], 'Le noyau est boite, au singulier.'),
            ]),
        ],
        a_toi=[
            q('Les élèves de CM1 (partir) en sortie.', ['partent', 'part', 'partes'], 'Le noyau est élèves, au pluriel.'),
            q('Quel est le sujet de « Dans la mare nagent les canards » ?', ['les canards', 'la mare', 'nagent'], 'Qui est-ce qui nage ? Les canards.'),
            q('Le bruit des vagues (calmer) les enfants.', ['calme', 'calment', 'calmes'], 'Le noyau est bruit, au singulier.'),
        ],
        sources=[ref('FR-C3-CM1-ORTH-01', 'Accord du verbe avec le sujet')]),

    'FR-C3-CM1-ORTH-02': dict(duree=7, essentiel=
        'Dans le groupe nominal, le déterminant et l’adjectif s’accordent avec le nom.\n'
        'Un petit chat noir, des petits chats noirs, une petite chatte noire.\n'
        'Au pluriel, on ajoute souvent -s, parfois -x : des jeux, des chevaux.',
        parties=[
            ('Genre et nombre', [
                {'type': 'tableau', 'titre': 'Transformer un groupe nominal', 'colonnes': ['Masculin singulier', 'Féminin singulier', 'Masculin pluriel', 'Féminin pluriel'], 'lignes': [
                    ['un ami fidèle', 'une amie fidèle', 'des amis fidèles', 'des amies fidèles'],
                    ['le grand lion', 'la grande lionne', 'les grands lions', 'les grandes lionnes']]},
                bq('Au féminin : « un voisin gentil » devient :', ['une voisine gentille', 'une voisine gentil', 'une voisin gentille'], 'Le déterminant, le nom et l’adjectif changent.'),
            ]),
            ('Pluriels en -x', [
                {'type': 'observe', 'consigne': 'Des pluriels à connaitre.', 'exemples': [
                    'un jeu, des jeux ; un gâteau, des gâteaux', 'un cheval, des chevaux ; un journal, des journaux',
                    'bijou, caillou, chou, genou, hibou, joujou, pou : -oux']},
                {'type': 'piege', 'erreur': 'On écrit « des chevals ».', 'correction': 'Les noms en -al font -aux, sauf bal, carnaval, chacal, festival, récital, régal.'},
            ]),
        ],
        a_toi=[
            q('Pluriel de « un beau château » :', ['de beaux châteaux', 'des beau châteaus', 'des beaux château'], 'Beau devient beaux, château devient châteaux.'),
            q('Pluriel de « un genou » :', ['des genoux', 'des genous', 'des genouxs'], 'Genou fait partie des sept noms en -oux.'),
            q('Pluriel de « un festival » :', ['des festivals', 'des festivaux', 'des festivales'], 'Festival est une exception : il prend un s.'),
        ],
        sources=[ref('FR-C3-CM1-ORTH-02', 'Accords dans le groupe nominal')]),

    'FR-C3-CM1-ORTH-03': dict(duree=6, essentiel=
        'Avec l’auxiliaire être, le participe passé s’accorde avec le sujet.\n'
        'Il est parti. Elle est partie. Ils sont partis. Elles sont parties.\n'
        'Pour vérifier, remplace par un adjectif : elle est grande, elle est partie.',
        parties=[
            ('Accorder avec le sujet', [
                vocabulaire(3, 'Participe passé'),
                {'type': 'tableau', 'titre': 'Partir au passé composé', 'colonnes': ['Sujet', 'Verbe', 'Accord'], 'lignes': [
                    ['il', 'est parti', 'masculin singulier'], ['elle', 'est partie', 'féminin singulier : -e'],
                    ['ils', 'sont partis', 'masculin pluriel : -s'], ['elles', 'sont parties', 'féminin pluriel : -es']]},
                bq('Les filles sont (arrivé).', ['arrivées', 'arrivés', 'arrivé'], 'Sujet féminin pluriel : -es.'),
            ]),
            ('Être ou avoir ?', [
                {'type': 'piege', 'erreur': 'On accorde aussi avec avoir : « elles ont mangées ».', 'correction': 'Avec avoir, on n’accorde pas avec le sujet : elles ont mangé.'},
            ]),
        ],
        a_toi=[
            q('Mon frère est (tombé).', ['tombé', 'tombée', 'tombés'], 'Sujet masculin singulier.'),
            q('Nous avons (chanté).', ['chanté', 'chantés', 'chantées'], 'Auxiliaire avoir : pas d’accord avec le sujet.'),
            q('Mes cousines sont (venu).', ['venues', 'venus', 'venu'], 'Sujet féminin pluriel.'),
        ],
        sources=[ref('FR-C3-CM1-ORTH-03', 'Participe passé avec être')]),

    'FR-C3-CM1-GRAM-01': dict(duree=6, essentiel=
        'Le déterminant se place devant le nom et en indique le genre et le nombre.\n'
        'Articles définis : le, la, l’, les. Articles indéfinis : un, une, des.\n'
        'Possessifs : mon, ton, son, notre, votre, leur… Démonstratifs : ce, cet, cette, ces.',
        parties=[
            ('Les familles de déterminants', [
                {'type': 'tableau', 'titre': 'Les déterminants', 'colonnes': ['Famille', 'Déterminants', 'Exemple'], 'lignes': [
                    ['article défini', 'le, la, l’, les', 'le livre'], ['article indéfini', 'un, une, des', 'une pomme'],
                    ['possessif', 'mon, ma, mes, ton, son, notre, votre, leur…', 'notre classe'], ['démonstratif', 'ce, cet, cette, ces', 'cet arbre']]},
                bq('Dans « cette maison », cette est :', ['un démonstratif', 'un possessif', 'un article indéfini'], 'Il montre la maison.'),
            ]),
            ('Ces ou ses ?', [
                {'type': 'piege', 'erreur': 'On confond ces et ses.', 'correction': 'Ces montre : ces arbres-là. Ses dit à qui : ses jouets, les jouets de Léo.'},
            ]),
        ],
        a_toi=[
            q('« Notre » est un déterminant :', ['possessif', 'démonstratif', 'défini'], 'Il indique à qui appartient la chose.'),
            q('Quel article est indéfini ?', ['une', 'la', 'les'], 'Une pomme : pas une pomme précise.'),
            q('Léo range … affaires.', ['ses', 'ces', 'c’est'], 'Les affaires de Léo.'),
        ],
        sources=[ref('FR-C3-CM1-GRAM-01', 'Les déterminants')]),

    'FR-C3-CM1-GRAM-02': dict(duree=6, essentiel=
        'Un pronom remplace un nom ou un groupe nominal, pour éviter une répétition.\n'
        'Pronoms sujets : je, tu, il, elle, on, nous, vous, ils, elles.\n'
        'Pronoms objets : le, la, l’, les, lui, leur. Léa lit le livre : elle le lit.',
        parties=[
            ('Remplacer le sujet', [
                {'type': 'observe', 'consigne': 'Le groupe sujet devient un pronom.', 'exemples': [
                    'Mes parents préparent le repas : ils préparent le repas.', 'La maîtresse explique : elle explique.', 'Tom et moi jouons : nous jouons.']},
                bq('Remplace : « Les oiseaux chantent. »', ['Ils chantent.', 'Elles chantent.', 'Il chante.'], 'Oiseaux est masculin pluriel.'),
            ]),
            ('Remplacer le complément', [
                {'type': 'observe', 'consigne': 'Le complément devient un pronom placé avant le verbe.', 'exemples': [
                    'Je regarde le film : je le regarde.', 'Tom parle à sa sœur : Tom lui parle.', 'Je donne la pomme à Paul : je la lui donne.']},
                {'type': 'piege', 'erreur': 'On croit que « le » est toujours un déterminant.', 'correction': 'Devant un verbe, « le » est un pronom : je le vois.'},
            ]),
        ],
        a_toi=[
            q('Dans « Je les regarde », les est :', ['un pronom', 'un déterminant', 'un verbe'], 'Il est placé devant le verbe.'),
            q('« Nous écrivons à nos amis » devient : nous … écrivons.', ['leur', 'les', 'lui'], 'À nos amis : pluriel, pronom leur.'),
            q('« Léa et Inès dansent » devient :', ['Elles dansent.', 'Ils dansent.', 'Elle danse.'], 'Deux filles : elles.'),
        ],
        sources=[ref('FR-C3-CM1-GRAM-02', 'Remplacer par un pronom')]),

    'FR-C3-CM1-GRAM-03': dict(duree=8, essentiel=
        'Le complément d’objet complète le verbe : on ne peut ni le supprimer ni le déplacer.\n'
        'Le complément circonstanciel dit où, quand, comment : on peut le supprimer ou le déplacer.\n'
        'COD : sans préposition, je mange une pomme. COI : avec préposition, je parle à Léa.',
        parties=[
            ('Objet ou circonstanciel ?', [
                {'type': 'exemple-resolu', 'enonce': 'Analyse : « Ce matin, Léo écrit une lettre à sa grand-mère. »', 'etapes': [
                    'Ce matin : on peut le déplacer. C’est un complément circonstanciel de temps.',
                    'Une lettre : il écrit quoi ? C’est un COD.',
                    'À sa grand-mère : il écrit à qui ? C’est un COI.'],
                 'conclusion': 'Un complément circonstanciel, un COD et un COI.'},
                {'type': 'piege', 'erreur': 'On croit que tout groupe après le verbe est un COD.', 'correction': '« Il dort dans son lit » : dans son lit dit où. C’est un complément circonstanciel.'},
            ]),
            ('COD ou COI ?', [
                {'type': 'tableau', 'titre': 'Les questions à poser', 'colonnes': ['Complément', 'Question', 'Exemple'], 'lignes': [
                    ['COD', 'verbe + quoi ? qui ?', 'Je mange une pomme.'], ['COI', 'verbe + à quoi ? de qui ?…', 'Je parle à Léa.'],
                    ['circonstanciel', 'où ? quand ? comment ?', 'Je pars demain.']]},
                bq('Dans « Nous regardons un film », un film est :', ['un COD', 'un COI', 'le sujet'], 'Nous regardons quoi ? Sans préposition.'),
            ]),
        ],
        a_toi=[
            q('Dans « Je pense à mes vacances », à mes vacances est :', ['un COI', 'un COD', 'un complément circonstanciel'], 'Je pense à quoi ? Avec la préposition à.'),
            q('Dans « Elle chante le soir », le soir est :', ['un complément circonstanciel de temps', 'un COD', 'un COI'], 'On peut le déplacer : le soir, elle chante.'),
            q('Dans « Il se souvient de son voyage », de son voyage est :', ['un COI', 'un COD', 'le sujet'], 'Il se souvient de quoi ? Préposition de.'),
        ],
        sources=[ref('FR-C3-CM1-GRAM-03', 'Compléments du verbe')]),

    'FR-C3-CM1-VOC-01': dict(duree=5, essentiel=
        'Un synonyme a un sens proche : content, joyeux.\n'
        'Un antonyme a un sens contraire : grand, petit.\n'
        'Le synonyme ou l’antonyme est de la même classe que le mot : un adjectif pour un adjectif.',
        parties=[
            ('Sens proche, sens contraire', [
                vocabulaire(3, 'Synonyme', 'Antonyme'),
                {'type': 'observe', 'consigne': 'Un synonyme et un antonyme pour chaque mot.', 'exemples': [
                    'beau : joli (synonyme), laid (antonyme)', 'commencer : débuter (synonyme), finir (antonyme)', 'la joie : le bonheur (synonyme), la tristesse (antonyme)']},
                bq('Quel est un synonyme de « effrayé » ?', ['apeuré', 'courageux', 'effrayer'], 'Même sens, même classe : adjectif.'),
            ]),
            ('Avec un préfixe', [
                {'type': 'explique', 'texte': 'Certains antonymes se forment avec un préfixe : possible, impossible ; faire, défaire ; lisible, illisible.'},
                {'type': 'piege', 'erreur': 'On donne un mot d’une autre classe : rapide, lentement.', 'correction': 'Rapide est un adjectif : son antonyme est lent.'},
            ]),
        ],
        a_toi=[
            q('Quel est l’antonyme de « monter » ?', ['descendre', 'grimper', 'montée'], 'Un verbe de sens contraire.'),
            q('Quel est l’antonyme de « possible » ?', ['impossible', 'probable', 'possiblement'], 'Le préfixe im- donne le contraire.'),
            q('Quel est un synonyme de « débuter » ?', ['commencer', 'terminer', 'début'], 'Même sens, et un verbe.'),
        ],
        sources=[ref('FR-C3-CM1-VOC-01', 'Synonymes et antonymes')]),

    'FR-C3-CM1-LECT-01': dict(duree=6, essentiel=
        'Une information explicite est écrite dans le texte.\n'
        'Une information implicite n’est pas écrite : on la déduit grâce à des indices.\n'
        'Pour justifier une déduction, on cite les mots du texte qui l’appuient.',
        parties=[
            ('Dit ou pas dit ?', [
                {'type': 'observe', 'consigne': 'Lis : « Léa enleva ses bottes pleines de boue et secoua son parapluie. »', 'exemples': [
                    'Explicite : Léa enlève ses bottes.', 'Implicite : il pleut, ou il a plu.', 'Indices : boue, parapluie.']},
                bq('« Tom souffla les dix bougies de son gâteau. » Que comprend-on ?', ['c’est son anniversaire', 'il a froid', 'il fait la cuisine'], 'Indices : bougies, gâteau, dix.'),
            ]),
            ('Justifier', [
                {'type': 'methode', 'titre': 'Pour trouver l’implicite', 'etapes': [
                    'Lis la question.', 'Cherche des indices dans le texte.', 'Déduis ce qu’ils montrent.', 'Cite les mots qui appuient ta réponse.']},
                {'type': 'piege', 'erreur': 'On invente une information sans indice.', 'correction': 'Chaque déduction s’appuie sur des mots du texte.'},
            ]),
        ],
        a_toi=[
            q('« Le chien grognait devant la porte, poils hérissés. » Le chien est sans doute :', ['inquiet', 'endormi', 'joyeux'], 'Indices : grognait, poils hérissés.'),
            q('Une information explicite est :', ['écrite dans le texte', 'devinée', 'inventée'], 'On la lit directement.'),
            q('« Elle claquait des dents et remonta son écharpe. » Il fait :', ['froid', 'chaud', 'nuit'], 'Indices : claquer des dents, écharpe.'),
        ],
        sources=[ref('FR-C3-CM1-LECT-01', 'Explicite et implicite')]),

    'FR-C3-CM1-LECT-02': dict(duree=6, essentiel=
        'Un récit raconte une histoire, en paragraphes, avec un narrateur.\n'
        'Un poème s’écrit en vers, souvent avec des rimes, regroupés en strophes.\n'
        'Une pièce de théâtre donne les répliques des personnages, avec leur nom et des didascalies.',
        parties=[
            ('Reconnaitre à la mise en page', [
                vocabulaire(3, 'Vers', 'Strophe', 'Réplique', 'Didascalie'),
                {'type': 'tableau', 'titre': 'Trois façons d’écrire', 'colonnes': ['Genre', 'Mise en page', 'Indice'], 'lignes': [
                    ['récit', 'des paragraphes', 'un narrateur raconte'], ['poème', 'des vers et des strophes', 'des retours à la ligne, souvent des rimes'],
                    ['théâtre', 'des répliques', 'le nom du personnage avant chaque réplique']]},
                bq('« MARIE (en riant). Tu es en retard ! » Cet extrait vient :', ['d’une pièce de théâtre', 'd’un poème', 'd’un récit'], 'Le nom du personnage, puis sa réplique.'),
            ]),
            ('Attention', [
                {'type': 'piege', 'erreur': 'On croit qu’un poème rime toujours.', 'correction': 'Certains poèmes n’ont pas de rimes. Ce qui compte, c’est l’écriture en vers.'},
            ]),
        ],
        a_toi=[
            q('Un texte écrit en vers est :', ['un poème', 'une recette', 'un article'], 'Chaque vers va à la ligne.'),
            q('Les indications pour les acteurs s’appellent des :', ['didascalies', 'strophes', 'paragraphes'], 'Souvent en italique ou entre parenthèses.'),
            q('Un groupe de vers s’appelle :', ['une strophe', 'une réplique', 'un chapitre'], 'Une strophe est séparée par une ligne blanche.'),
        ],
        sources=[ref('FR-C3-CM1-LECT-02', 'Théâtre, poème, récit')]),

    'FR-C3-CM1-LECT-03': dict(duree=5, essentiel=
        'Avant de lire un document, je cherche sa nature : article, carte, affiche, graphique, photo…\n'
        'Je cherche sa source : qui l’a produit, où et quand.\n'
        'Puis j’y prélève l’information qui répond à ma question.',
        parties=[
            ('Nature', [
                {'type': 'tableau', 'titre': 'Quel document pour quoi ?', 'colonnes': ['Nature', 'On y trouve'], 'lignes': [
                    ['article de journal', 'un fait, une date'], ['carte', 'un lieu, une distance'], ['affiche', 'un évènement, une date'], ['graphique', 'une évolution, des chiffres']]},
                bq('Pour savoir où se trouve une ville, on utilise :', ['une carte', 'une recette', 'un poème'], 'Une carte situe les lieux.'),
            ]),
            ('Source', [
                {'type': 'methode', 'titre': 'Pour lire un document', 'etapes': [
                    'Lis le titre.', 'Cherche la source, souvent en bas.', 'Repère la date.', 'Cherche l’information demandée.']},
                {'type': 'piege', 'erreur': 'On croit un document sans regarder sa source.', 'correction': 'Une source connue et datée permet de vérifier l’information.'},
            ]),
        ],
        a_toi=[
            q('La source d’un document indique :', ['d’où il vient', 'sa couleur', 'sa longueur'], 'Qui l’a produit, où et quand.'),
            q('Un document daté de 1990 parle :', ['de cette époque', 'forcément d’aujourd’hui', 'de l’avenir'], 'La date situe l’information.'),
            q('Pour montrer comment une température change, on utilise :', ['un graphique', 'une affiche', 'un conte'], 'Il montre une évolution.'),
        ],
        sources=[ref('FR-C3-CM1-LECT-03', 'Nature et source d’un document')]),

    'FR-C3-CM1-ECOU-01': dict(duree=5, essentiel=
        'J’écoute en me demandant : de quoi parle-t-on, qui parle, pour quoi faire ?\n'
        'Je note quelques mots clés, pas des phrases entières.\n'
        'À la fin, je redis l’essentiel en une ou deux phrases.',
        parties=[
            ('Une annonce', [
                {'type': 'observe', 'consigne': 'Annonce : « Le train de 14 h 20 pour Lyon partira avec 15 minutes de retard, voie 3. »', 'exemples': [
                    'Quoi ? Un retard.', 'Quel train ? Celui de 14 h 20, pour Lyon.', 'Où ? Voie 3.']},
                bq('Ce train partira à :', ['14 h 35', '14 h 20', '15 h 20'], '14 h 20 + 15 min = 14 h 35.'),
            ]),
            ('Bien écouter', [
                {'type': 'methode', 'titre': 'Pour retenir un message', 'etapes': [
                    'Écoute le début : il annonce souvent le sujet.', 'Note qui, quoi, où, quand.', 'Redis l’essentiel avec tes mots.']},
                {'type': 'piege', 'erreur': 'On veut tout retenir mot à mot.', 'correction': 'Retiens les mots clés : qui, quoi, où, quand.'},
            ]),
        ],
        a_toi=[
            q('Pour retenir un message, je note :', ['des mots clés', 'tout le message', 'rien'], 'Quelques mots suffisent.'),
            q('Un reportage sert surtout à :', ['informer', 'vendre un produit', 'raconter un conte'], 'Il présente des faits.'),
            q('Une consigne orale se retient mieux si je :', ['la redis dans ma tête', 'regarde ailleurs', 'parle en même temps'], 'Reformuler aide à mémoriser.'),
        ],
        sources=[ref('FR-C3-CM1-ECOU-01', 'Comprendre un message oral')]),

    'FR-C3-CM1-ECR-01': dict(duree=7, essentiel=
        'Un texte cohérent suit un ordre logique.\n'
        'Des connecteurs relient les phrases : d’abord, ensuite, puis, enfin, mais, car, donc.\n'
        'On évite les répétitions avec des pronoms ou des synonymes, et on garde le même temps.',
        parties=[
            ('Relier et reprendre', [
                {'type': 'exemple-resolu', 'enonce': 'Améliore : « Le loup sort. Le loup voit une chèvre. Le loup court. »', 'etapes': [
                    'Je relie avec des connecteurs : soudain, aussitôt.', 'Je remplace « le loup » par il, puis par l’animal.'],
                 'conclusion': 'Le loup sort de la forêt. Soudain, il aperçoit une chèvre. Aussitôt, l’animal se met à courir.'},
                {'type': 'tableau', 'titre': 'Des connecteurs', 'colonnes': ['Pour…', 'Connecteurs'], 'lignes': [
                    ['ordonner', 'd’abord, ensuite, puis, enfin'], ['opposer', 'mais, pourtant'], ['expliquer', 'car, parce que'], ['conclure', 'donc, alors']]},
            ]),
            ('Garder le même temps', [
                {'type': 'piege', 'erreur': 'On change de temps sans raison : « il marchait quand il voit un chat ».', 'correction': 'On garde le passé : il marchait quand il a vu un chat.'},
                bq('Quel connecteur exprime la cause ?', ['car', 'ensuite', 'enfin'], 'Car explique pourquoi.'),
            ]),
        ],
        a_toi=[
            q('Pour éviter de répéter « la fusée », j’écris :', ['elle', 'il', 'les fusées'], 'Fusée est féminin singulier.'),
            q('Quel connecteur termine une suite d’actions ?', ['enfin', 'd’abord', 'mais'], 'Enfin annonce la dernière étape.'),
            q('Quel connecteur oppose deux idées ?', ['mais', 'puis', 'donc'], 'Il est fatigué, mais il continue.'),
        ],
        sources=[ref('FR-C3-CM1-ECR-01', 'Cohérence d’un texte')]),

    'FR-C3-CM1-VOC-02': dict(duree=6, essentiel=
        'Le contexte aide à deviner le sens d’un mot inconnu.\n'
        'La formation du mot aide aussi : un préfixe, un radical, un suffixe.\n'
        'On vérifie ensuite dans le dictionnaire.',
        parties=[
            ('Découper le mot', [
                vocabulaire(3, 'Mot dérivé'),
                {'type': 'exemple-resolu', 'enonce': '« Il trouva la porte infranchissable et dut faire demi-tour. » Que veut dire infranchissable ?', 'etapes': [
                    'in- : le contraire.', 'franchir : passer.', '-able : qu’on peut.'],
                 'conclusion': 'Infranchissable : qu’on ne peut pas passer. Le contexte le confirme : il fait demi-tour.'},
                {'type': 'tableau', 'titre': 'Préfixes et suffixes', 'colonnes': ['Élément', 'Sens', 'Exemple'], 'lignes': [
                    ['re-', 'de nouveau', 'refaire'], ['dé-', 'le contraire', 'défaire'], ['pré-', 'avant', 'prévoir'],
                    ['-eur', 'celui qui fait', 'chanteur'], ['-ette', 'petit', 'maisonnette'], ['-able', 'qu’on peut', 'lavable']]},
            ]),
            ('Attention', [
                {'type': 'piege', 'erreur': 'On croit que « re » au début est toujours un préfixe.', 'correction': 'Dans renard ou regarder, re ne veut pas dire « de nouveau ».'},
                bq('« Illisible » veut dire :', ['qu’on ne peut pas lire', 'qu’on lit vite', 'qu’on lit deux fois'], 'il- : le contraire ; -ible : qu’on peut.'),
            ]),
        ],
        a_toi=[
            q('Le suffixe -ette indique souvent :', ['quelque chose de petit', 'le contraire', 'une action'], 'Une fillette, une maisonnette.'),
            q('« Prévoir », c’est voir :', ['avant', 'de nouveau', 'mal'], 'Le préfixe pré- veut dire avant.'),
            q('Un « nageur » est :', ['celui qui nage', 'un petit nage', 'le contraire de nager'], 'Le suffixe -eur : celui qui fait.'),
        ],
        sources=[ref('FR-C3-CM1-VOC-02', 'Comprendre un mot inconnu')]),

    'FR-C3-CM1-VOC-03': dict(duree=5, essentiel=
        'Un mot polysémique a plusieurs sens.\n'
        'Le contexte, ou la matière étudiée, permet de choisir le bon sens.\n'
        'En maths, une opération est un calcul. À l’hôpital, c’est une intervention.',
        parties=[
            ('Plusieurs sens', [
                {'type': 'observe', 'consigne': 'Un même mot, des sens différents.', 'exemples': [
                    'la souris du chat, la souris de l’ordinateur', 'la règle du jeu, la règle pour tracer',
                    'la carte de géographie, la carte à jouer', 'le côté d’un carré, le côté gauche']},
                bq('En maths, « le volume d’une boite » désigne :', ['la place qu’elle occupe', 'le son', 'un livre'], 'Le contexte des maths donne le sens.'),
            ]),
            ('Selon la matière', [
                {'type': 'piege', 'erreur': 'On garde le sens courant dans une autre matière.', 'correction': 'En géométrie, une droite est une ligne sans fin, pas le contraire de gauche.'},
            ]),
        ],
        a_toi=[
            q('« La règle de grammaire » est :', ['une loi à suivre', 'un objet pour tracer', 'un dessin'], 'Le contexte parle de langue.'),
            q('En musique, une « note » est :', ['un son', 'une appréciation', 'un message'], 'Do, ré, mi…'),
            q('« La souris » dans « clique avec la souris » est :', ['un appareil', 'un animal', 'un fromage'], 'On parle d’ordinateur.'),
        ],
        sources=[ref('FR-C3-CM1-VOC-03', 'Mots polysémiques')]),

    'FR-C3-CM1-ORTH-04': dict(duree=5, essentiel=
        'Les mots invariables ne changent jamais : toujours, souvent, beaucoup, aussi, avec.\n'
        'On les apprend par cœur, en s’aidant des familles de mots et des régularités.\n'
        'Les adverbes en -ment se forment souvent sur le féminin : doux, douce, doucement.',
        parties=[
            ('Des régularités', [
                {'type': 'observe', 'consigne': 'Des mots qui se ressemblent.', 'exemples': [
                    'Adverbes en -ment : lentement, rapidement, doucement.', 'Mots invariables fréquents : avant, après, depuis, malgré, toujours.',
                    'Mots en -tion : la récréation, la punition, l’addition.']},
                bq('Quel adverbe est formé sur « doux » ?', ['doucement', 'doussement', 'douxment'], 'Féminin douce, puis -ment.'),
            ]),
            ('Familles de mots', [
                {'type': 'explique', 'texte': 'Les mots d’une même famille gardent le même radical : grand, grandir, grandeur.'},
                {'type': 'piege', 'erreur': 'On met beaucoup au pluriel : « beaucoups ».', 'correction': 'Beaucoup est invariable : il ne prend jamais de s.'},
            ]),
        ],
        a_toi=[
            q('Quel mot est invariable ?', ['souvent', 'souvenir', 'grand'], 'Un adverbe ne varie pas.'),
            q('Quel mot est bien écrit ?', ['toujours', 'toujour', 'toujoure'], 'Toujours prend un s.'),
            q('Quel mot est de la famille de « grand » ?', ['grandeur', 'grenier', 'garder'], 'Même radical : grand.'),
        ],
        sources=[ref('FR-C3-CM1-ORTH-04', 'Mots fréquents et invariables')]),

    'FR-C3-CM1-GRAM-04': dict(duree=6, essentiel=
        'Trois types de phrases : déclarative, interrogative, impérative.\n'
        'Une phrase peut aussi être exclamative, pour exprimer une émotion.\n'
        'Forme négative : ne… pas, ne… jamais, ne… plus, ne… rien.',
        parties=[
            ('Les types', [
                {'type': 'tableau', 'titre': 'Types de phrases', 'colonnes': ['Type', 'Elle sert à', 'Exemple'], 'lignes': [
                    ['déclarative', 'dire, informer', 'Il pleut.'], ['interrogative', 'poser une question', 'Pleut-il ?'],
                    ['impérative', 'donner un ordre, un conseil', 'Prends ton parapluie.'], ['exclamative', 'exprimer une émotion', 'Quelle pluie !']]},
                bq('« Ferme la porte. » est une phrase :', ['impérative', 'interrogative', 'exclamative'], 'Elle donne un ordre.'),
            ]),
            ('Transformer', [
                {'type': 'observe', 'consigne': 'Une phrase, plusieurs formes.', 'exemples': [
                    'Tu viens. Viens-tu ? Est-ce que tu viens ?', 'Il mange encore. Il ne mange plus.', 'Je vois quelque chose. Je ne vois rien.']},
                {'type': 'piege', 'erreur': 'On oublie le ne à l’écrit : « je sais pas ».', 'correction': 'À l’écrit, on met les deux mots : je ne sais pas.'},
            ]),
        ],
        a_toi=[
            q('Forme négative de « Il a encore faim » :', ['Il n’a plus faim.', 'Il a pas faim.', 'Il n’a encore faim.'], 'Encore devient ne… plus.'),
            q('Quelle phrase est interrogative ?', ['Viens-tu demain ?', 'Viens demain.', 'Quel beau jour !'], 'Elle pose une question.'),
            q('Quelle phrase est exclamative ?', ['Comme il est grand !', 'Il est grand.', 'Est-il grand ?'], 'Elle exprime une émotion.'),
        ],
        sources=[ref('FR-C3-CM1-GRAM-04', 'Types et formes de phrases')]),

    'FR-C3-CM1-GRAM-05': dict(duree=6, essentiel=
        'La nature, ou classe, d’un mot ne change pas : nom, verbe, adjectif, déterminant, pronom…\n'
        'La fonction dit le rôle du mot dans la phrase : sujet, complément…\n'
        'Un même nom peut être sujet dans une phrase et complément dans une autre.',
        parties=[
            ('Nature et fonction', [
                {'type': 'observe', 'consigne': 'Le mot souris dans deux phrases.', 'exemples': [
                    'Le chat mange la souris : souris est un nom, complément du verbe.', 'La souris mange le fromage : souris est un nom, sujet du verbe.']},
                {'type': 'tableau', 'titre': '« Le petit chat dort. »', 'colonnes': ['Groupe', 'Nature', 'Fonction'], 'lignes': [
                    ['le petit chat', 'groupe nominal', 'sujet'], ['dort', 'verbe', 'verbe de la phrase']]},
            ]),
            ('Ne pas confondre', [
                {'type': 'piege', 'erreur': 'On répond « sujet » quand on demande la nature.', 'correction': 'Sujet est une fonction. La nature, c’est nom, verbe, adjectif…'},
                bq('Quelle est la nature de « rapide » ?', ['adjectif', 'sujet', 'verbe'], 'Rapide décrit un nom.'),
            ]),
        ],
        a_toi=[
            q('Dans « Paul court », la fonction de Paul est :', ['sujet', 'nom', 'verbe'], 'Paul fait l’action : il est sujet.'),
            q('La nature d’un mot change-t-elle selon la phrase ?', ['non', 'oui', 'seulement au pluriel'], 'Seule la fonction change.'),
            q('Dans « Je lis un livre », la nature de « livre » est :', ['nom', 'COD', 'verbe'], 'COD est sa fonction ; sa nature est nom.'),
        ],
        sources=[ref('FR-C3-CM1-GRAM-05', 'Nature et fonction')]),

    'FR-C3-CM1-GRAM-06': dict(duree=5, essentiel=
        'Un groupe nominal est organisé autour d’un nom : le nom noyau.\n'
        'Le déterminant est devant le nom. L’adjectif peut être avant ou après.\n'
        'Dans « la belle maison blanche », maison est le nom noyau.',
        parties=[
            ('Trouver le noyau', [
                {'type': 'exemple-resolu', 'enonce': 'Trouve le nom noyau de « un gros chien noir ».', 'etapes': [
                    'Je retire ce qui peut partir : gros, noir.', 'Il reste un chien.'],
                 'conclusion': 'Le nom noyau est chien.'},
                {'type': 'piege', 'erreur': 'On prend l’adjectif pour le noyau.', 'correction': 'Le noyau est le nom qu’on ne peut pas supprimer.'},
            ]),
            ('Les éléments du groupe', [
                vocabulaire(3, 'Épithète'),
                {'type': 'tableau', 'titre': '« la belle maison blanche »', 'colonnes': ['Mot', 'Nature'], 'lignes': [
                    ['la', 'déterminant'], ['belle', 'adjectif'], ['maison', 'nom noyau'], ['blanche', 'adjectif']]},
                bq('Quel est le nom noyau de « les jolies fleurs rouges » ?', ['fleurs', 'jolies', 'rouges'], 'Jolies et rouges peuvent être retirés.'),
            ]),
        ],
        a_toi=[
            q('Dans « un vieux livre », vieux est :', ['un adjectif', 'un nom', 'un déterminant'], 'Il décrit le livre.'),
            q('Quel groupe est un groupe nominal ?', ['ma petite sœur', 'courir vite', 'très lentement'], 'Il est organisé autour du nom sœur.'),
            q('Dans « cette longue route », le déterminant est :', ['cette', 'longue', 'route'], 'Il est placé devant le nom.'),
        ],
        sources=[ref('FR-C3-CM1-GRAM-06', 'Le groupe nominal')]),

    'FR-C3-CM1-ORTH-05': dict(duree=5, essentiel=
        'Certains noms et verbes se ressemblent : le travail, il travaille.\n'
        'Après un déterminant, c’est un nom. Après un pronom sujet, c’est un verbe.\n'
        'Le nom prend -s au pluriel. Le verbe prend -nt avec ils ou elles.',
        parties=[
            ('Nom ou verbe ?', [
                {'type': 'observe', 'consigne': 'Le mot avant aide à choisir.', 'exemples': [
                    'un appel, j’appelle', 'le réveil, il se réveille', 'le conseil, je conseille', 'des portes, ils portent']},
                bq('Ils … la table. (ranger)', ['rangent', 'ranges', 'rangé'], 'Après ils, c’est un verbe : -nt.'),
            ]),
            ('Les marques du pluriel', [
                {'type': 'piege', 'erreur': 'On écrit « ils portes ».', 'correction': 'Après ils, c’est un verbe : ils portent.'},
            ]),
        ],
        a_toi=[
            q('Les … du jardin. (fleur)', ['fleurs', 'fleurent', 'fleure'], 'Après les, c’est un nom : -s.'),
            q('Le … sonne à 7 heures.', ['réveil', 'réveille', 'réveilles'], 'Après le, c’est un nom.'),
            q('Elles … leurs amies. (appeler)', ['appellent', 'appels', 'appelles'], 'Après elles, c’est un verbe : -nt.'),
        ],
        sources=[ref('FR-C3-CM1-ORTH-05', 'Distinguer le nom et le verbe')]),

    'FR-C3-CM1-CONJ-03': dict(duree=7, essentiel=
        'Verbes en -cer : ç devant a et o. Nous lançons.\n'
        'Verbes en -ger : e après g devant a et o. Nous mangeons.\n'
        'Appeler et jeter doublent la consonne devant un e muet : j’appelle, je jette.',
        parties=[
            ('Le radical change', [
                {'type': 'tableau', 'titre': 'Des verbes du premier groupe', 'colonnes': ['Verbe', 'Ce qui change', 'Exemples'], 'lignes': [
                    ['lancer', 'ç devant a, o', 'nous lançons, il lançait'], ['manger', 'ge devant a, o', 'nous mangeons, je mangeais'],
                    ['appeler', 'll devant e muet', 'j’appelle, nous appelons'], ['jeter', 'tt devant e muet', 'je jette, nous jetons'],
                    ['acheter, lever', 'è devant e muet', 'j’achète, je lève'], ['nettoyer, essuyer', 'i devant e muet', 'je nettoie, il essuie']]},
                bq('Nous (placer) les chaises.', ['plaçons', 'placons', 'placeons'], 'Devant o, la cédille garde le son « s ».'),
            ]),
            ('Pourquoi ?', [
                {'type': 'explique', 'texte': 'Ces changements gardent le même son au radical : « s » dans lancer, « j » dans manger.'},
                {'type': 'piege', 'erreur': 'On écrit « nous mangons ».', 'correction': 'Pour garder le son « j », on ajoute un e : nous mangeons.'},
            ]),
        ],
        a_toi=[
            q('J’(appeler) mon frère.', ['appelle', 'apelle', 'appele'], 'Devant e muet, appeler double le l.'),
            q('Il (essuyer) la table.', ['essuie', 'essuye', 'essuit'], 'Le y devient i devant e muet.'),
            q('Nous (nager) vite.', ['nageons', 'nagons', 'nagions'], 'Un e garde le son « j » devant o.'),
        ],
        sources=[ref('FR-C3-CM1-CONJ-03', 'Verbes du premier groupe à radical variable')]),

    'FR-C3-CM1-ORTH-06': dict(duree=5, essentiel=
        'Les noms, déterminants, adjectifs et pronoms varient en genre et en nombre.\n'
        'Le verbe varie en personne, en nombre et en temps.\n'
        'Les adverbes, prépositions et conjonctions sont invariables : très, avec, et.',
        parties=[
            ('Qui varie ?', [
                {'type': 'tableau', 'titre': 'Classes de mots', 'colonnes': ['Classe', 'Varie selon', 'Exemple'], 'lignes': [
                    ['nom', 'nombre, parfois genre', 'un ami, des amies'], ['adjectif', 'genre et nombre', 'grand, grandes'],
                    ['déterminant', 'genre et nombre', 'le, la, les'], ['verbe', 'personne, nombre, temps', 'je chante, ils chantaient'],
                    ['adverbe, préposition', 'ne varie pas', 'très, avec']]},
                bq('Quel mot varie en genre et en nombre ?', ['petit', 'souvent', 'avec'], 'C’est un adjectif.'),
            ]),
            ('Adjectif ou adverbe ?', [
                {'type': 'piege', 'erreur': 'On croit que l’adjectif est invariable, comme l’adverbe.', 'correction': 'L’adjectif s’accorde : des robes rouges. L’adverbe non : des robes très belles.'},
            ]),
        ],
        a_toi=[
            q('Le verbe varie selon :', ['la personne, le nombre et le temps', 'le genre seulement', 'rien'], 'Je chante, nous chantions…'),
            q('Quel mot est invariable ?', ['avec', 'beau', 'chanter'], 'Avec est une préposition.'),
            q('Dans « des chats très doux », quel mot ne varie pas ?', ['très', 'chats', 'doux'], 'Très est un adverbe.'),
        ],
        sources=[ref('FR-C3-CM1-ORTH-06', 'Mots variables et invariables')]),

    'FR-C3-CM1-ECR-02': dict(duree=5, essentiel=
        'Avant de chercher, je relis la question pour savoir ce que je cherche.\n'
        'Je surligne seulement les passages qui y répondent.\n'
        'Je laisse de côté les informations intéressantes mais inutiles pour cette question.',
        parties=[
            ('Un exemple', [
                {'type': 'exemple-resolu', 'enonce': 'Question : que mange le hérisson ? Texte : « Le hérisson vit dans les haies. Il mange des insectes, des vers et des escargots. Il hiberne en hiver. »', 'etapes': [
                    'Utile : il mange des insectes, des vers et des escargots.', 'Inutile ici : il vit dans les haies, il hiberne.'],
                 'conclusion': 'Le hérisson mange des insectes, des vers et des escargots.'},
            ]),
            ('La méthode', [
                {'type': 'methode', 'titre': 'Pour trier les informations', 'etapes': [
                    'Relis la question.', 'Cherche ses mots clés dans le texte.', 'Surligne la réponse.', 'Écris-la avec tes mots.']},
                {'type': 'piege', 'erreur': 'On recopie tout le paragraphe.', 'correction': 'On garde seulement ce qui répond à la question.'},
            ]),
        ],
        a_toi=[
            q('Question : où vit le hérisson ? Réponse utile :', ['dans les haies', 'il hiberne', 'il mange des vers'], 'Seule cette phrase dit où.'),
            q('Pour trier, je commence par :', ['relire la question', 'recopier le texte', 'lire la fin'], 'Je sais ainsi ce que je cherche.'),
            q('Une information hors sujet :', ['je la laisse de côté', 'je la recopie', 'je l’invente'], 'Elle ne répond pas à la question.'),
        ],
        sources=[ref('FR-C3-CM1-ECR-02', 'Trier les informations utiles')]),

    'FR-C3-CM1-DICT-01': dict(duree=6, essentiel=
        'Avant d’écrire, j’écoute la phrase en entier.\n'
        'J’écris, puis je relis plusieurs fois, en cherchant une chose à la fois.\n'
        'Je vérifie les accords : le verbe avec son sujet, puis chaque groupe nominal.',
        parties=[
            ('Relire une chose à la fois', [
                {'type': 'methode', 'titre': 'Pour relire une dictée', 'etapes': [
                    'Relis pour le sens : il ne manque aucun mot.', 'Relis les verbes : trouve leur sujet.',
                    'Relis les groupes nominaux : genre et nombre.', 'Relis les homophones : a ou à, et ou est, son ou sont.']},
                {'type': 'piege', 'erreur': 'On relit une seule fois, d’un coup.', 'correction': 'Une relecture par vérification : on repère mieux les erreurs.'},
            ]),
            ('Un exemple', [
                {'type': 'exemple-resolu', 'enonce': 'Dictée : « Les oiseaux du parc chantaient sous les branches fleuries. »', 'etapes': [
                    'Chantaient : le sujet est les oiseaux, au pluriel, donc -aient.', 'Les branches fleuries : féminin pluriel, donc -es.'],
                 'conclusion': 'Les accords sont vérifiés un par un.'},
                bq('« Il … parti à l’école. »', ['est', 'et', 'ai'], 'On peut dire « il était parti » : c’est le verbe être.'),
            ]),
        ],
        a_toi=[
            q('Quand on relit un verbe, on vérifie :', ['son accord avec le sujet', 'sa couleur', 'sa longueur'], 'Le sujet commande le verbe.'),
            q('« Les … fleuries »', ['branches', 'branche', 'branchent'], 'Après les : un nom au pluriel.'),
            q('« Elle … à Paris. »', ['est', 'a', 'et'], 'On peut dire « elle était à Paris » : verbe être.'),
        ],
        sources=[ref('FR-C3-CM1-DICT-01', 'Dictée et relecture')]),
}

ecrire(COURS)
