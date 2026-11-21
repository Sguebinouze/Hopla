"""Lot de cours : français 5e (programme 2026). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-5e-francais.py
    python3 scripts/cours/pages.py content/cours/FR-C4-5E-*.json

Cycle 4 : phrases de 25 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
Exemples inventés pour le cours ; œuvres citées par leur titre, sans extrait.
"""
from commun import bq, ecrire, q, source_referentiel as ref

COURS = {
    'FR-C4-5E-GRAM-01': dict(duree=6, essentiel=
        'Une phrase a un type : déclarative, interrogative ou injonctive.\n'
        'Elle a aussi des formes : affirmative ou négative, et parfois exclamative.\n'
        '« Ne parle pas si fort ! » est injonctive, négative et exclamative.',
        parties=[
            ('Type et formes', [
                {'type': 'tableau', 'titre': 'Analyser une phrase', 'colonnes': ['Phrase', 'Type', 'Formes'], 'lignes': [
                    ['Le train part à midi.', 'déclarative', 'affirmative'], ['Ne vient-il pas ?', 'interrogative', 'négative'],
                    ['Ferme la porte !', 'injonctive', 'affirmative, exclamative'], ['Comme il fait froid !', 'déclarative', 'affirmative, exclamative']]},
                bq('« N’oublie jamais ton sac. » est :', ['injonctive et négative', 'interrogative et négative', 'déclarative et affirmative'], 'Un ordre, avec la négation ne… jamais.'),
            ]),
            ('L’exclamation est une forme', [
                {'type': 'piege', 'erreur': 'On classe « Range ta chambre ! » dans un type « exclamatif ».', 'correction': 'Le type est injonctif : c’est un ordre. Le point d’exclamation ajoute la forme exclamative.'},
            ]),
        ],
        a_toi=[
            q('« Personne n’est venu. » est à la forme :', ['négative', 'affirmative', 'interrogative'], 'Ne… personne est une négation.'),
            q('« Viens-tu demain ? » est de type :', ['interrogatif', 'injonctif', 'déclaratif'], 'Elle pose une question.'),
            q('« Quelle chance nous avons ! » est :', ['déclarative et exclamative', 'injonctive', 'interrogative'], 'Elle constate un fait avec émotion.'),
        ],
        sources=[ref('FR-C4-5E-GRAM-01', 'Types et formes de phrases')]),

    'FR-C4-5E-GRAM-02': dict(duree=7, essentiel=
        'Une phrase simple a un seul verbe conjugué ; une phrase complexe en a plusieurs. Une phrase non verbale n’en a aucun.\n'
        'Les propositions d’une phrase complexe sont juxtaposées, coordonnées ou subordonnées.\n'
        '« Il pleut, nous restons. » : deux propositions juxtaposées, séparées par une virgule.',
        parties=[
            ('Trois façons de relier', [
                {'type': 'tableau', 'titre': 'Relier des propositions', 'colonnes': ['Lien', 'Outil', 'Exemple'], 'lignes': [
                    ['juxtaposition', 'virgule, point-virgule, deux-points', 'Il pleut, nous restons.'], ['coordination', 'mais, ou, et, donc, or, ni, car', 'Il pleut, donc nous restons.'],
                    ['subordination', 'quand, parce que, si, qui, que…', 'Nous restons parce qu’il pleut.']]},
                bq('« Je lis car j’aime les histoires. » Les propositions sont :', ['coordonnées', 'juxtaposées', 'subordonnées'], 'Car est une conjonction de coordination.'),
            ]),
            ('La phrase non verbale', [
                {'type': 'observe', 'consigne': 'Des phrases sans verbe conjugué.', 'exemples': ['Silence !', 'Quelle belle journée !', 'Défense de fumer.']},
                {'type': 'piege', 'erreur': 'On compte un infinitif comme verbe conjugué : « Il veut partir » serait une phrase complexe.', 'correction': 'Partir est à l’infinitif. La phrase a un seul verbe conjugué : elle est simple.'},
            ]),
        ],
        a_toi=[
            q('« Quand la nuit tombe, les chouettes chassent. » contient :', ['une subordination', 'une juxtaposition', 'aucun verbe'], 'Quand introduit une proposition subordonnée.'),
            q('« Attention, chien méchant ! » est une phrase :', ['non verbale', 'simple', 'complexe'], 'Aucun verbe conjugué.'),
            q('« Le vent souffle ; la mer se creuse. » Les propositions sont :', ['juxtaposées', 'coordonnées', 'subordonnées'], 'Un point-virgule les sépare.'),
        ],
        sources=[ref('FR-C4-5E-GRAM-02', 'Phrase simple, complexe, non verbale')]),

    'FR-C4-5E-GRAM-03': dict(duree=8, essentiel=
        'Le sujet commande l’accord du verbe. Le COD et le COI complètent le verbe ; l’attribut suit un verbe d’état.\n'
        'Les compléments circonstanciels précisent le lieu, le temps, la cause ou la manière. On peut souvent les déplacer.\n'
        '« Le skieur descend avec prudence » : « avec prudence » est CC de manière.',
        parties=[
            ('Les fonctions autour du verbe', [
                {'type': 'tableau', 'titre': 'Repérer les fonctions', 'colonnes': ['Fonction', 'Question', 'Exemple'], 'lignes': [
                    ['sujet', 'qui est-ce qui ?', 'Le skieur descend.'], ['COD', 'verbe + qui ? quoi ?', 'Il dévale la piste.'], ['COI', 'verbe + à qui ? de quoi ?', 'Il pense à sa course.'],
                    ['attribut du sujet', 'après un verbe d’état', 'Il semble confiant.']]},
                bq('Dans « Elle reste calme », « calme » est :', ['attribut du sujet', 'COD', 'CC de manière'], 'Rester est un verbe d’état.'),
            ]),
            ('Les compléments circonstanciels', [
                {'type': 'tableau', 'titre': 'Quatre circonstances', 'colonnes': ['CC', 'Question', 'Exemple'], 'lignes': [
                    ['de lieu', 'où ?', 'sur la piste'], ['de temps', 'quand ?', 'ce matin'], ['de cause', 'pourquoi ?', 'à cause du brouillard'], ['de manière', 'comment ?', 'avec prudence, prudemment']]},
                {'type': 'piege', 'erreur': 'On prend « à sa course » pour un CC de lieu.', 'correction': 'On ne peut ni le supprimer ni le déplacer sans changer le sens : c’est un COI de penser.'},
            ]),
        ],
        a_toi=[
            q('Dans « Il parle doucement », « doucement » est :', ['CC de manière', 'COD', 'attribut du sujet'], 'Comment parle-t-il ?'),
            q('Dans « Nous rentrons à cause de l’orage », le CC est de :', ['cause', 'temps', 'manière'], 'Pourquoi rentrons-nous ?'),
            q('Dans « Tom offre un livre à sa sœur », « à sa sœur » est :', ['COI', 'COD', 'CC de lieu'], 'Il offre à qui ?'),
        ],
        sources=[ref('FR-C4-5E-GRAM-03', 'Fonctions dans la phrase')]),

    'FR-C4-5E-GRAM-04': dict(duree=7, essentiel=
        'Un déterminant accompagne un nom : le chat. Un pronom remplace un nom ou un groupe nominal : je le vois.\n'
        'Les pronoms personnels désignent les personnes : je, tu, il, le, lui, leur…\n'
        'Les pronoms démonstratifs montrent : celui-ci, cela. Les pronoms indéfinis restent vagues : quelqu’un, rien, chacun.',
        parties=[
            ('Pronom ou déterminant ?', [
                {'type': 'tableau', 'titre': 'Le même mot, deux classes', 'colonnes': ['Phrase', 'Mot', 'Classe'], 'lignes': [
                    ['Le chat dort.', 'le', 'déterminant, devant un nom'], ['Je le vois.', 'le', 'pronom, devant un verbe'],
                    ['Leur maison est grande.', 'leur', 'déterminant'], ['Je leur parle.', 'leur', 'pronom']]},
                bq('Dans « Ces fleurs, je les arrose », « les » est :', ['un pronom', 'un déterminant', 'un nom'], 'Il remplace « ces fleurs » devant le verbe.'),
            ]),
            ('Trois familles de pronoms', [
                {'type': 'tableau', 'titre': 'Pronoms', 'colonnes': ['Famille', 'Exemples'], 'lignes': [
                    ['personnels', 'je, tu, il, nous, me, te, le, la, lui, leur, eux'], ['démonstratifs', 'celui, celle, ceux, celles, ce, ceci, cela, ça'], ['indéfinis', 'on, quelqu’un, personne, rien, chacun, tout']]},
                {'type': 'piege', 'erreur': 'On écrit « je leurs parle ».', 'correction': 'Leur pronom est invariable. Seul le déterminant prend un s : leurs livres.'},
            ]),
        ],
        a_toi=[
            q('Dans « Chacun a reçu un cadeau », « chacun » est un pronom :', ['indéfini', 'démonstratif', 'personnel'], 'Il désigne des personnes de façon vague.'),
            q('Dans « Prends celui-ci », « celui-ci » est un pronom :', ['démonstratif', 'indéfini', 'personnel'], 'Il montre un objet.'),
            q('Dans « La porte grince », « la » est :', ['un déterminant', 'un pronom', 'un adverbe'], 'Il accompagne le nom porte.'),
        ],
        sources=[ref('FR-C4-5E-GRAM-04', 'Déterminant ou pronom')]),

    'FR-C4-5E-GRAM-05': dict(duree=7, essentiel=
        'Au discours direct, on rapporte les paroles telles quelles, entre guillemets : Léa dit : « Je viens. »\n'
        'Au discours indirect, on les intègre dans une subordonnée : Léa dit qu’elle vient.\n'
        'Pour passer de l’un à l’autre, on adapte les pronoms, la ponctuation et parfois les temps.',
        parties=[
            ('Passer de l’un à l’autre', [
                {'type': 'tableau', 'titre': 'Transformer', 'colonnes': ['Discours direct', 'Discours indirect'], 'lignes': [
                    ['Léa dit : « Je viens. »', 'Léa dit qu’elle vient.'], ['Tom demande : « Viens-tu ? »', 'Tom demande si je viens.'],
                    ['Il demande : « Où vas-tu ? »', 'Il demande où je vais.'], ['Elle lui dit : « Range ta chambre. »', 'Elle lui dit de ranger sa chambre.']]},
                bq('« Le guide annonce : “Nous partons.” » au discours indirect :', ['Le guide annonce qu’ils partent.', 'Le guide annonce : nous partons.', 'Le guide annonce si nous partons.'], 'Que introduit la subordonnée ; nous devient ils.'),
            ]),
            ('Ce qui change', [
                {'type': 'methode', 'titre': 'Pour passer au discours indirect', 'etapes': [
                    'Supprime les guillemets et les deux-points.', 'Introduis la subordonnée par que, si ou un mot interrogatif.', 'Adapte les pronoms et les possessifs.', 'Transforme l’impératif en de + infinitif.']},
                {'type': 'piege', 'erreur': 'On garde les pronoms : « Léa dit qu’je viens ».', 'correction': 'Le je de Léa devient elle : Léa dit qu’elle vient.'},
            ]),
        ],
        a_toi=[
            q('« Il me demande : “Es-tu prêt ?” » au discours indirect :', ['Il me demande si je suis prêt.', 'Il me demande que je suis prêt.', 'Il me demande es-tu prêt.'], 'Une question fermée devient si + proposition.'),
            q('Au discours direct, les paroles sont placées :', ['entre guillemets', 'dans une subordonnée', 'entre parenthèses'], 'On les rapporte telles quelles.'),
            q('« Ferme la fenêtre », lui dit-elle. Au discours indirect :', ['Elle lui dit de fermer la fenêtre.', 'Elle lui dit qu’il ferme la fenêtre ?', 'Elle lui dit : ferme.'], 'L’impératif devient de + infinitif.'),
        ],
        sources=[ref('FR-C4-5E-GRAM-05', 'Discours direct et indirect')]),

    'FR-C4-5E-CONJ-01': dict(duree=8, essentiel=
        'Chaque temps simple de l’indicatif a son temps composé : l’auxiliaire est au temps simple correspondant.\n'
        'Passé simple : il chanta ; passé antérieur : il eut chanté.\n'
        'Futur : il chantera ; futur antérieur : il aura chanté.',
        parties=[
            ('Temps simples et temps composés', [
                {'type': 'tableau', 'titre': 'L’indicatif', 'colonnes': ['Temps simple', 'Exemple', 'Temps composé', 'Exemple'], 'lignes': [
                    ['présent', 'il chante', 'passé composé', 'il a chanté'], ['imparfait', 'il chantait', 'plus-que-parfait', 'il avait chanté'],
                    ['passé simple', 'il chanta', 'passé antérieur', 'il eut chanté'], ['futur', 'il chantera', 'futur antérieur', 'il aura chanté']]},
                bq('« Elle fut partie » est au :', ['passé antérieur', 'plus-que-parfait', 'passé simple'], 'Auxiliaire être au passé simple, puis le participe passé.'),
            ]),
            ('Identifier un temps composé', [
                {'type': 'methode', 'titre': 'Pour nommer le temps', 'etapes': [
                    'Repère l’auxiliaire et le participe passé.', 'Donne le temps de l’auxiliaire seul.', 'Cherche le temps composé qui lui correspond.']},
                {'type': 'piege', 'erreur': 'On dit que « il a chanté » est au présent, car a est au présent.', 'correction': 'L’auxiliaire est au présent, donc le verbe est au passé composé.'},
            ]),
        ],
        a_toi=[
            q('« Nous aurons fini » est au :', ['futur antérieur', 'futur', 'passé composé'], 'Auxiliaire au futur + participe passé.'),
            q('« Ils avaient compris » est au :', ['plus-que-parfait', 'passé antérieur', 'imparfait'], 'Auxiliaire à l’imparfait.'),
            q('Le passé antérieur de « il arrive » est :', ['il fut arrivé', 'il était arrivé', 'il sera arrivé'], 'Être au passé simple : il fut.'),
        ],
        sources=[ref('FR-C4-5E-CONJ-01', 'Identifier un temps de l’indicatif')]),

    'FR-C4-5E-CONJ-02': dict(duree=7, essentiel=
        'Le radical de certains verbes change selon la personne ou le temps.\n'
        'Manger garde un e devant a et o : nous mangeons. Commencer prend une cédille : nous commençons.\n'
        'Appeler et jeter doublent la consonne : j’appelle, je jette. Acheter prend un accent : j’achète.',
        parties=[
            ('Verbes en -er à radical variable', [
                {'type': 'tableau', 'titre': 'Au présent', 'colonnes': ['Verbe', 'je', 'nous'], 'lignes': [
                    ['manger', 'je mange', 'nous mangeons'], ['commencer', 'je commence', 'nous commençons'], ['appeler', 'j’appelle', 'nous appelons'],
                    ['jeter', 'je jette', 'nous jetons'], ['acheter', 'j’achète', 'nous achetons']]},
                bq('« Nous … nos affaires. » (ranger, présent)', ['rangeons', 'rangons', 'rangeont'], 'On garde le e pour que le g se prononce [ʒ].'),
            ]),
            ('Verbes du 3e groupe', [
                {'type': 'tableau', 'titre': 'Trois radicaux au présent', 'colonnes': ['Verbe', 'je', 'nous', 'ils'], 'lignes': [
                    ['venir', 'je viens', 'nous venons', 'ils viennent'], ['prendre', 'je prends', 'nous prenons', 'ils prennent'], ['boire', 'je bois', 'nous buvons', 'ils boivent']]},
                {'type': 'piege', 'erreur': 'On écrit « ils prenent ».', 'correction': 'Le n est doublé : ils prennent, comme ils viennent.'},
            ]),
        ],
        a_toi=[
            q('« Tu … ton frère. » (appeler, présent)', ['appelles', 'appeles', 'appèles'], 'Appeler double le l devant un e muet.'),
            q('« Nous … la leçon. » (commencer, présent)', ['commençons', 'commencons', 'commenceons'], 'La cédille garde le son [s].'),
            q('« Ils … demain. » (venir, présent)', ['viennent', 'venent', 'vienent'], 'Radical vienn- à la 3e personne du pluriel.'),
        ],
        sources=[ref('FR-C4-5E-CONJ-02', 'Radicaux des verbes')]),

    'FR-C4-5E-ORTH-01': dict(duree=6, essentiel=
        'Le verbe s’accorde avec le noyau du sujet, même si un complément les sépare : le bruit des vagues berce les campeurs.\n'
        'Plusieurs noms sujets coordonnés valent un pluriel : Léa et Tom partent.\n'
        'Le sujet peut aussi être placé après le verbe.',
        parties=[
            ('Le noyau du sujet', [
                {'type': 'exemple-resolu', 'enonce': '« Le bruit des vagues berc… les campeurs. »', 'etapes': [
                    'Qu’est-ce qui berce ? Le bruit des vagues.', 'Le noyau est bruit, au singulier. Des vagues complète bruit.'],
                 'conclusion': 'Le bruit des vagues berce les campeurs.'},
                bq('« Les feuilles de cet arbre … en automne. » (tomber, présent)', ['tombent', 'tombe', 'tombes'], 'Le noyau est feuilles, au pluriel.'),
            ]),
            ('Plusieurs sujets', [
                {'type': 'tableau', 'titre': 'Cas particuliers', 'colonnes': ['Sujet', 'Accord', 'Exemple'], 'lignes': [
                    ['deux noms coordonnés', 'pluriel', 'Le chat et le chien dorment.'], ['toi et moi', '1re personne du pluriel', 'Toi et moi partirons.'], ['sujet inversé', 'avec le sujet placé après', 'Au loin brillent les phares.']]},
                {'type': 'piege', 'erreur': 'On accorde avec le nom le plus proche : « Le bruit des vagues bercent ».', 'correction': 'On cherche le noyau du sujet : bruit, au singulier.'},
            ]),
        ],
        a_toi=[
            q('« La voix de mes amis … » (résonner, présent)', ['résonne', 'résonnent', 'résonnes'], 'Le noyau est voix.'),
            q('« Ma sœur et moi … au cinéma. » (aller, présent)', ['allons', 'vont', 'va'], 'Ma sœur et moi = nous.'),
            q('« Dans la cour … les élèves. » (jouer, présent)', ['jouent', 'joue', 'joues'], 'Sujet inversé au pluriel.'),
        ],
        sources=[ref('FR-C4-5E-ORTH-01', 'Accord sujet-verbe complexe')]),

    'FR-C4-5E-ORTH-02': dict(duree=8, essentiel=
        'Avec être, le participe passé s’accorde avec le sujet : elles sont parties.\n'
        'Avec avoir, il s’accorde avec le COD seulement si celui-ci est placé avant : ces lettres, je les ai écrites.\n'
        'Il ne s’accorde jamais avec un COI : je leur ai écrit.',
        parties=[
            ('COD avant, COD après, COI', [
                {'type': 'tableau', 'titre': 'Accorder avec avoir', 'colonnes': ['Phrase', 'Complément', 'Accord'], 'lignes': [
                    ['J’ai écrit des lettres.', 'COD après', 'non'], ['Ces lettres, je les ai écrites.', 'COD les, avant', 'oui : écrites'],
                    ['Les lettres que j’ai écrites…', 'COD que, avant', 'oui : écrites'], ['Mes amies ? Je leur ai écrit.', 'COI leur', 'non']]},
                bq('« Ses cousines, il les a … » (inviter)', ['invitées', 'invité', 'invités'], 'Les, COD placé avant, remplace cousines.'),
            ]),
            ('Distinguer COD et COI', [
                {'type': 'explique', 'texte': 'On écrit à quelqu’un : leur est COI. On écrit quelque chose : les est COD.'},
                {'type': 'piege', 'erreur': 'On accorde avec leur : « Je leur ai écrits ».', 'correction': 'Leur est un COI : le participe passé reste invariable.'},
            ]),
        ],
        a_toi=[
            q('« Les histoires qu’il a … » (raconter)', ['racontées', 'raconté', 'racontés'], 'Que, COD placé avant, remplace histoires.'),
            q('« Mes parents ? Je leur ai … » (téléphoner)', ['téléphoné', 'téléphonés', 'téléphonées'], 'Leur est un COI.'),
            q('« Elles se sont … tôt. » (lever)', ['levées', 'levé', 'levés'], 'Accord avec le sujet, qui est aussi le COD se.'),
        ],
        sources=[ref('FR-C4-5E-ORTH-02', 'Accord du participe passé')]),

    'FR-C4-5E-VOC-01': dict(duree=6, essentiel=
        'Un mot construit est formé d’un radical, parfois d’un préfixe avant, et d’un suffixe après.\n'
        'Le préfixe pré- signifie « avant » : préhistoire. Le suffixe -able signifie « qui peut être » : lavable.\n'
        'Connaitre le sens des préfixes et des suffixes aide à comprendre un mot nouveau.',
        parties=[
            ('Préfixes fréquents', [
                {'type': 'tableau', 'titre': 'Des préfixes', 'colonnes': ['Préfixe', 'Sens', 'Exemple'], 'lignes': [
                    ['pré-', 'avant', 'préhistoire'], ['re-, ré-', 'de nouveau', 'relire'], ['in-, im-, il-, ir-', 'contraire', 'impossible, illisible'], ['anti-', 'contre', 'antivol'], ['sous-, sub-', 'sous', 'sous-marin']]},
                bq('« Irréparable » signifie :', ['qui ne peut pas être réparé', 'qui est réparé', 'qui répare'], 'ir- : contraire ; -able : qui peut être.'),
            ]),
            ('Suffixes fréquents', [
                {'type': 'tableau', 'titre': 'Des suffixes', 'colonnes': ['Suffixe', 'Sens', 'Exemple'], 'lignes': [
                    ['-able, -ible', 'qui peut être', 'lavable, lisible'], ['-eur, -euse', 'qui fait l’action', 'nageur'], ['-ette', 'petit', 'fillette'], ['-ment', 'manière (adverbe)', 'lentement'], ['-age', 'action', 'lavage']]},
                {'type': 'piege', 'erreur': 'On croit que tout mot qui commence par re- a un préfixe : « regarder », « renard ».', 'correction': 'On vérifie qu’il reste un mot de base : relire = re + lire. Renard n’est pas construit ainsi.'},
            ]),
        ],
        a_toi=[
            q('Dans « fillette », le suffixe -ette signifie :', ['petit', 'contraire', 'avant'], 'Une petite fille.'),
            q('Quel mot contient un préfixe de sens contraire ?', ['impatient', 'important', 'imprimer'], 'Impatient = qui n’est pas patient.'),
            q('Un « antidouleur » sert :', ['contre la douleur', 'avant la douleur', 'à augmenter la douleur'], 'Anti- signifie contre.'),
        ],
        sources=[ref('FR-C4-5E-VOC-01', 'Préfixes et suffixes')]),

    'FR-C4-5E-VOC-02': dict(duree=5, essentiel=
        'On adapte sa façon de parler à la situation : c’est le registre de langue.\n'
        'Le registre familier s’emploie entre proches ; le registre courant, dans la plupart des situations ; le registre soutenu, à l’écrit ou dans un cadre officiel.\n'
        'Une bagnole, une voiture, une automobile désignent le même objet dans trois registres.',
        parties=[
            ('Trois registres', [
                {'type': 'tableau', 'titre': 'Un même sens', 'colonnes': ['Familier', 'Courant', 'Soutenu'], 'lignes': [
                    ['une bagnole', 'une voiture', 'une automobile'], ['un bouquin', 'un livre', 'un ouvrage'], ['bosser', 'travailler', 'œuvrer'], ['T’as vu ?', 'Tu as vu ?', 'As-tu vu ?']]},
                bq('« Je suis crevé » appartient au registre :', ['familier', 'courant', 'soutenu'], 'En registre courant : je suis fatigué.'),
            ]),
            ('Choisir le bon registre', [
                {'type': 'piege', 'erreur': 'On croit que le registre familier est une faute.', 'correction': 'Il convient entre amis. Il est mal choisi dans une lettre officielle ou une rédaction.'},
            ]),
        ],
        a_toi=[
            q('Dans une lettre au principal, on écrit :', ['Je vous prie de bien vouloir m’excuser.', 'Désolé, j’ai zappé.', 'Excuse, j’ai oublié.'], 'Le registre soutenu convient.'),
            q('« Un ouvrage » appartient au registre :', ['soutenu', 'familier', 'courant'], 'En registre courant : un livre.'),
            q('« Il a pas compris » appartient au registre :', ['familier', 'soutenu', 'courant'], 'Le ne de la négation manque.'),
        ],
        sources=[ref('FR-C4-5E-VOC-02', 'Registres de langue')]),

    'FR-C4-5E-VOC-03': dict(duree=6, essentiel=
        'Des synonymes ont un sens proche : rapide, véloce. Des antonymes ont un sens contraire : monter, descendre.\n'
        'Des homonymes se prononcent de la même façon mais ont des sens différents : ver, verre, vert, vers.\n'
        'Un mot générique englobe des mots spécifiques : fleur englobe rose, tulipe, iris.',
        parties=[
            ('Cinq relations', [
                {'type': 'tableau', 'titre': 'Relations de sens', 'colonnes': ['Relation', 'Exemple'], 'lignes': [
                    ['synonymie', 'effrayé, apeuré'], ['antonymie', 'ouvrir, fermer'], ['homonymie', 'sain, saint, sein, cinq'], ['générique', 'outil'], ['spécifiques', 'marteau, scie, tournevis']]},
                bq('« Mer » et « mère » sont :', ['des homonymes', 'des synonymes', 'des antonymes'], 'Même prononciation, sens différents.'),
            ]),
            ('Éviter les répétitions', [
                {'type': 'explique', 'texte': 'Pour ne pas répéter « le chien », on écrit « l’animal » : on remplace un mot spécifique par un générique.'},
                {'type': 'piege', 'erreur': 'On croit que deux synonymes s’emploient toujours l’un pour l’autre.', 'correction': 'Le sens est proche, pas identique : on dit « un vieil ami », pas « un âgé ami ».'},
            ]),
        ],
        a_toi=[
            q('L’antonyme de « généreux » est :', ['avare', 'gentil', 'riche'], 'Sens contraire, même classe : adjectif.'),
            q('« Meuble » par rapport à « armoire » est un mot :', ['générique', 'spécifique', 'antonyme'], 'Il englobe armoire, table, chaise.'),
            q('Un synonyme de « débuter » est :', ['commencer', 'terminer', 'durer'], 'Sens proche.'),
        ],
        sources=[ref('FR-C4-5E-VOC-03', 'Relations de sens')]),

    'FR-C4-5E-LECT-01': dict(duree=7, essentiel=
        'Le narrateur est celui qui raconte. Il peut être un personnage de l’histoire ou rester extérieur.\n'
        'Le point de vue est interne quand on voit par les yeux d’un personnage ; omniscient quand le narrateur sait tout.\n'
        'Les figures de style créent des images : comparaison, métaphore, personnification.',
        parties=[
            ('Narrateur et point de vue', [
                {'type': 'tableau', 'titre': 'Trois points de vue', 'colonnes': ['Point de vue', 'Ce qu’on sait', 'Exemple'], 'lignes': [
                    ['interne', 'ce que voit et pense un personnage', 'Je sentis mon cœur s’emballer.'], ['externe', 'seulement ce qu’on peut observer', 'Un homme entra et s’assit.'],
                    ['omniscient', 'tout, y compris les pensées de chacun', 'Chacun, en silence, redoutait la suite.']]},
                bq('« Je n’osais pas ouvrir la porte. » Le narrateur est :', ['un personnage de l’histoire', 'extérieur à l’histoire', 'absent'], 'Il dit je et vit l’action.'),
            ]),
            ('Trois figures de style', [
                {'type': 'tableau', 'titre': 'Des images', 'colonnes': ['Figure', 'Exemple'], 'lignes': [
                    ['comparaison, avec un outil : comme, tel', 'La lune brillait comme une pièce d’argent.'], ['métaphore, sans outil', 'La lune, pièce d’argent, brillait.'], ['personnification', 'Le vent hurlait sa colère.']]},
                {'type': 'piege', 'erreur': 'On confond l’auteur et le narrateur.', 'correction': 'L’auteur écrit le livre. Le narrateur raconte l’histoire : ce peut être un personnage inventé.'},
            ]),
        ],
        a_toi=[
            q('« Ses yeux étaient deux étoiles. » est :', ['une métaphore', 'une comparaison', 'une personnification'], 'Pas d’outil de comparaison.'),
            q('« La maison dormait. » est :', ['une personnification', 'une comparaison', 'une métaphore'], 'Une maison ne dort pas : on lui prête un comportement humain.'),
            q('Un narrateur qui connait les pensées de tous les personnages adopte un point de vue :', ['omniscient', 'interne', 'externe'], 'Il sait tout.'),
        ],
        sources=[ref('FR-C4-5E-LECT-01', 'Outils d’analyse d’un texte')]),

    'FR-C4-5E-LECT-02': dict(duree=7, essentiel=
        'Le héros d’un récit de chevalerie quitte son monde, affronte des épreuves et revient transformé.\n'
        'Il défend des valeurs : courage, loyauté, courtoisie, protection des plus faibles.\n'
        'Dans le roman de Chrétien de Troyes, Perceval, jeune naïf, devient chevalier au fil de ses épreuves.',
        parties=[
            ('Le parcours du héros', [
                {'type': 'methode', 'titre': 'Analyser le parcours', 'etapes': [
                    'Situation de départ : qui est le héros, que lui manque-t-il ?', 'Départ : pourquoi quitte-t-il son monde ?', 'Épreuves : combats, tentations, quêtes.',
                    'Aides et obstacles : qui l’aide, qui s’oppose à lui ?', 'Retour : qu’a-t-il appris, comment a-t-il changé ?']},
                bq('Un personnage qui aide le héros s’appelle :', ['un adjuvant', 'un opposant', 'un narrateur'], 'Celui qui fait obstacle est un opposant.'),
            ]),
            ('Les valeurs du chevalier', [
                {'type': 'tableau', 'titre': 'Valeurs chevaleresques', 'colonnes': ['Valeur', 'Ce qu’elle demande'], 'lignes': [
                    ['courage', 'affronter le danger'], ['loyauté', 'rester fidèle à son seigneur et à sa parole'], ['courtoisie', 'être poli et respectueux, surtout envers les dames'], ['charité', 'protéger les faibles']]},
                {'type': 'piege', 'erreur': 'On croit que le héros est parfait dès le début.', 'correction': 'Il commet des erreurs et apprend : Perceval se trompe souvent avant de devenir un vrai chevalier.'},
            ]),
        ],
        a_toi=[
            q('Chrétien de Troyes a écrit ses romans au :', ['XIIe siècle', 'XVIIe siècle', 'XIXe siècle'], 'Au Moyen Âge.'),
            q('La loyauté consiste à :', ['rester fidèle à sa parole', 'combattre sans règles', 's’enrichir'], 'Une valeur du chevalier.'),
            q('À la fin de son parcours, le héros est souvent :', ['transformé', 'exactement le même', 'oublié'], 'Les épreuves l’ont fait grandir.'),
        ],
        sources=[ref('FR-C4-5E-LECT-02', 'Héros et chevaliers')]),

    'FR-C4-5E-LECT-03': dict(duree=6, essentiel=
        'Au Moyen Âge, on récite les chansons de geste, comme la Chanson de Roland, à la fin du XIe siècle.\n'
        'Au XVIIe siècle, La Fontaine écrit ses Fables et Molière ses comédies.\n'
        'Au XIXe siècle, Victor Hugo, Jules Verne et Maupassant publient romans, poèmes et nouvelles.',
        parties=[
            ('Une frise des œuvres', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1090, 'date': 'fin du XIe siècle', 'evenement': 'La Chanson de Roland.'},
                    {'annee': 1180, 'date': 'XIIe siècle', 'evenement': 'Romans de Chrétien de Troyes.'},
                    {'annee': 1668, 'date': '1668', 'evenement': 'Premières Fables de La Fontaine.'},
                    {'annee': 1862, 'date': '1862', 'evenement': 'Les Misérables, Victor Hugo.'}]},
                bq('Les Fables de La Fontaine datent du :', ['XVIIe siècle', 'Moyen Âge', 'XIXe siècle'], 'Les premières paraissent en 1668.'),
            ]),
            ('Trois époques', [
                {'type': 'tableau', 'titre': 'Auteurs et genres', 'colonnes': ['Époque', 'Auteurs', 'Genres'], 'lignes': [
                    ['Moyen Âge', 'auteur anonyme de la Chanson de Roland, Chrétien de Troyes', 'chanson de geste, roman de chevalerie'],
                    ['XVIIe siècle', 'La Fontaine, Molière, Perrault', 'fable, comédie, conte'], ['XIXe siècle', 'Hugo, Verne, Maupassant', 'roman, poésie, nouvelle']]},
                {'type': 'piege', 'erreur': 'On place Molière au Moyen Âge, car ses pièces sont anciennes.', 'correction': 'Molière vit au XVIIe siècle, sous Louis XIV.'},
            ]),
        ],
        a_toi=[
            q('Molière écrit des :', ['comédies', 'chansons de geste', 'romans de science-fiction'], 'Des pièces de théâtre comiques.'),
            q('Jules Verne vit au :', ['XIXe siècle', 'XVIIe siècle', 'Moyen Âge'], 'Le Tour du monde en 80 jours paraît en 1872.'),
            q('La Chanson de Roland est :', ['une chanson de geste', 'une fable', 'une comédie'], 'Elle raconte des exploits guerriers.'),
        ],
        sources=[ref('FR-C4-5E-LECT-03', 'Repères d’histoire littéraire')]),

    'FR-C4-5E-ECR-01': dict(duree=6, essentiel=
        'L’idée principale est ce que l’auteur veut dire dans un paragraphe.\n'
        'Les autres phrases l’expliquent ou l’illustrent par des exemples.\n'
        'On la formule en une phrase, avec ses propres mots.',
        parties=[
            ('La repérer', [
                {'type': 'methode', 'titre': 'Pour trouver l’idée principale', 'etapes': [
                    'Lis le paragraphe en entier.', 'Demande-toi : de quoi parle-t-il ? Qu’en dit-il ?', 'Mets de côté les exemples et les détails.', 'Formule l’idée en une phrase.']},
                bq('Un paragraphe parle des écrans le soir, de la lumière bleue et des nuits plus courtes. L’idée principale :', ['Les écrans le soir nuisent au sommeil.', 'La lumière est bleue.', 'Les nuits sont courtes.'], 'Les détails servent cette idée.'),
            ]),
            ('Idée ou exemple ?', [
                {'type': 'piege', 'erreur': 'On recopie la première phrase du paragraphe.', 'correction': 'L’idée principale n’est pas toujours au début. On la reformule avec ses mots.'},
            ]),
        ],
        a_toi=[
            q('L’idée principale d’un paragraphe :', ['dit l’essentiel en une phrase', 'cite tous les exemples', 'est toujours la dernière phrase'], 'On garde l’essentiel.'),
            q('« Par exemple, les abeilles pollinisent les fleurs. » Cette phrase est :', ['un exemple', 'l’idée principale', 'une conclusion'], 'Par exemple annonce une illustration.'),
            q('Pour formuler l’idée principale, on utilise :', ['ses propres mots', 'les mots exacts du texte seulement', 'des abréviations'], 'On reformule.'),
        ],
        sources=[ref('FR-C4-5E-ECR-01', 'L’idée principale')]),

    'FR-C4-5E-ECR-02': dict(duree=7, essentiel=
        'La thèse est l’opinion défendue. Un argument est une raison qui la soutient. Un exemple illustre l’argument par un fait précis.\n'
        'Thèse : il faut lire. Argument : la lecture enrichit le vocabulaire. Exemple : les romans font découvrir des mots rares.\n'
        'Chaque argument gagne à être suivi d’un exemple.',
        parties=[
            ('Thèse, argument, exemple', [
                {'type': 'tableau', 'titre': 'Défendre une thèse', 'colonnes': ['Élément', 'Question', 'Exemple'], 'lignes': [
                    ['thèse', 'que penses-tu ?', 'Le vélo est le meilleur moyen d’aller au collège.'], ['argument', 'pourquoi ?', 'Il est bon pour la santé.'], ['exemple', 'par exemple ?', 'Vingt minutes de vélo par jour suffisent pour faire de l’exercice.']]},
                bq('« Les jeux vidéo développent les réflexes. » est :', ['un argument', 'une thèse', 'un exemple'], 'C’est une raison qui soutient une opinion.'),
            ]),
            ('Relier', [
                {'type': 'observe', 'consigne': 'Des connecteurs utiles.', 'exemples': ['pour annoncer un argument : d’abord, de plus, enfin', 'pour annoncer un exemple : par exemple, ainsi', 'pour conclure : donc, c’est pourquoi']},
                {'type': 'piege', 'erreur': 'On donne un exemple sans dire quelle idée il prouve.', 'correction': 'L’argument vient d’abord, l’exemple le prouve ensuite.'},
            ]),
        ],
        a_toi=[
            q('« Je pense qu’il faut interdire les portables en classe. » est :', ['une thèse', 'un exemple', 'un argument'], 'C’est l’opinion défendue.'),
            q('« Ainsi, mon frère a appris l’anglais grâce aux séries. » est :', ['un exemple', 'une thèse', 'une conclusion'], 'Un fait précis qui illustre.'),
            q('Pour ajouter un argument, on écrit :', ['de plus', 'par exemple', 'donc'], 'De plus annonce une nouvelle raison.'),
        ],
        sources=[ref('FR-C4-5E-ECR-02', 'Argument et exemple')]),

    'FR-C4-5E-ECR-03': dict(duree=6, essentiel=
        'Réviser un texte, c’est le relire et l’améliorer selon des critères précis.\n'
        'On vérifie la consigne, la cohérence, les répétitions, la ponctuation, puis l’orthographe.\n'
        'On relit une fois par critère.',
        parties=[
            ('Une grille de révision', [
                {'type': 'tableau', 'titre': 'Critères', 'colonnes': ['Critère', 'Question à se poser'], 'lignes': [
                    ['consigne', 'Ai-je fait tout ce qui était demandé ?'], ['cohérence', 'L’histoire se suit-elle sans contradiction ?'], ['répétitions', 'Ai-je répété des mots ?'],
                    ['ponctuation', 'Chaque phrase a-t-elle une majuscule et un point ?'], ['orthographe', 'Les accords sont-ils justes ?']]},
                bq('Pour éviter de répéter « il » cinq fois, on peut écrire :', ['le chevalier, Perceval, le jeune homme', 'il, il, il', 'lui, lui, lui'], 'On varie les reprises nominales.'),
            ]),
            ('Varier les reprises', [
                {'type': 'explique', 'texte': 'Perceval quitte sa mère. Le jeune homme rêve d’armures. Le futur chevalier part vers la cour du roi.'},
                {'type': 'piege', 'erreur': 'On corrige seulement l’orthographe.', 'correction': 'Un texte sans faute peut être incohérent ou hors sujet : on vérifie tous les critères.'},
            ]),
        ],
        a_toi=[
            q('Relire une fois par critère permet :', ['de repérer plus d’erreurs', 'd’aller plus vite', 'd’éviter de relire'], 'L’attention se concentre sur un point.'),
            q('Vérifier que l’histoire ne se contredit pas, c’est vérifier :', ['la cohérence', 'la ponctuation', 'l’orthographe'], 'Un personnage mort ne revient pas sans explication.'),
            q('Une reprise nominale de « le loup » :', ['l’animal', 'il', 'le'], 'Un nom remplace un autre nom.'),
        ],
        sources=[ref('FR-C4-5E-ECR-03', 'Réviser son texte')]),

    'FR-C4-5E-ECOU-01': dict(duree=5, essentiel=
        'Pour retenir une présentation orale, on repère le sujet, le plan et les informations clés.\n'
        'On note des mots-clés, pas des phrases entières.\n'
        'Des abréviations et des symboles font gagner du temps.',
        parties=[
            ('Prendre des notes', [
                {'type': 'tableau', 'titre': 'Abréviations utiles', 'colonnes': ['Abréviation', 'Sens'], 'lignes': [
                    ['ex.', 'exemple'], ['→', 'entraine, conséquence'], ['=', 'égal, signifie'], ['+', 'plus, et'], ['qqch', 'quelque chose']]},
                bq('Pendant un exposé, on note :', ['des mots-clés', 'chaque phrase en entier', 'rien du tout'], 'On garde l’essentiel.'),
            ]),
            ('Écouter activement', [
                {'type': 'methode', 'titre': 'Pendant une présentation sur les volcans', 'etapes': [
                    'Note le sujet annoncé au début.', 'Repère les mots qui annoncent les parties : d’abord, ensuite.', 'Note le nom, le lieu, la cause.', 'Relis tes notes juste après pour les compléter.']},
                {'type': 'piege', 'erreur': 'On essaie de tout écrire et on perd le fil.', 'correction': 'On écoute d’abord, puis on note le mot-clé.'},
            ]),
        ],
        a_toi=[
            q('Le symbole → signifie :', ['entraine', 'égal', 'moins'], 'Il marque une conséquence.'),
            q('Les mots « d’abord, ensuite, enfin » annoncent :', ['les parties de la présentation', 'un exemple', 'une question'], 'Ils structurent l’exposé.'),
            q('Juste après l’écoute, on :', ['relit et complète ses notes', 'jette ses notes', 'recopie au hasard'], 'Les souvenirs sont encore frais.'),
        ],
        sources=[ref('FR-C4-5E-ECOU-01', 'Écouter et mémoriser')]),

    'FR-C4-5E-VOC-04': dict(duree=6, essentiel=
        'Pour comprendre un mot inconnu, on s’appuie sur le contexte : les mots autour donnent des indices.\n'
        'On s’appuie aussi sur sa formation : radical, préfixe, suffixe, origine latine ou grecque.\n'
        'On vérifie ensuite dans le dictionnaire.',
        parties=[
            ('Par la formation', [
                {'type': 'tableau', 'titre': 'Des racines', 'colonnes': ['Racine', 'Origine et sens', 'Mot'], 'lignes': [
                    ['bell-', 'latin bellum, la guerre', 'belliqueux : qui aime la guerre'], ['aqua-', 'latin aqua, l’eau', 'aquatique'], ['chrono-', 'grec khronos, le temps', 'chronomètre'], ['-phone', 'grec phônê, la voix', 'téléphone']]},
                bq('« Un animal aquatique » vit :', ['dans l’eau', 'dans les arbres', 'dans le désert'], 'Aqua- vient du latin aqua, l’eau.'),
            ]),
            ('Par le contexte', [
                {'type': 'exemple-resolu', 'enonce': '« Affamé, le loup dévora le repas en un instant. » Que signifie « dévora » ?', 'etapes': [
                    'Indice : le loup est affamé.', 'Indice : en un instant.'],
                 'conclusion': 'Dévorer signifie manger très vite, avec avidité.'},
                {'type': 'piege', 'erreur': 'On devine le sens et on ne vérifie pas.', 'correction': 'Le dictionnaire confirme ou corrige l’hypothèse.'},
            ]),
        ],
        a_toi=[
            q('Un « chronomètre » mesure :', ['le temps', 'la température', 'la longueur'], 'Khronos : le temps ; mètre : mesure.'),
            q('« Il resta impassible malgré les cris. » Impassible signifie :', ['calme, sans réaction', 'en colère', 'très bruyant'], 'Malgré les cris : il ne réagit pas.'),
            q('Après avoir deviné le sens d’un mot, on :', ['le vérifie dans le dictionnaire', 'l’oublie', 'le remplace au hasard'], 'On confirme l’hypothèse.'),
        ],
        sources=[ref('FR-C4-5E-VOC-04', 'Déduire le sens d’un mot')]),

    'FR-C4-5E-ORTH-03': dict(duree=6, essentiel=
        'Certaines lettres muettes s’expliquent par l’origine du mot.\n'
        'Le p de « temps » vient du latin tempus : on le retrouve dans « temporel ».\n'
        'Un mot de la même famille aide à trouver la lettre muette : long, longueur.',
        parties=[
            ('Des familles de mots', [
                {'type': 'tableau', 'titre': 'La lettre muette s’entend ailleurs', 'colonnes': ['Mot', 'Lettre muette', 'Mot de la famille'], 'lignes': [
                    ['temps', 'p', 'temporel'], ['corps', 'p', 'corporel'], ['doigt', 'g', 'digital'], ['sang', 'g', 'sanguin'], ['grand', 'd', 'grandeur']]},
                bq('Quelle lettre muette termine « long » ?', ['g', 'd', 't'], 'Longueur, allonger.'),
            ]),
            ('Utiliser la famille', [
                {'type': 'methode', 'titre': 'Pour écrire la fin d’un mot', 'etapes': [
                    'Cherche un mot de la même famille.', 'Écoute si la lettre s’y prononce.', 'Vérifie dans le dictionnaire.']},
                {'type': 'piege', 'erreur': 'On écrit « le tems ».', 'correction': 'Le p vient du latin tempus : temps, temporel, temporaire.'},
            ]),
        ],
        a_toi=[
            q('« Corps » s’écrit avec un p, comme dans :', ['corporel', 'correct', 'cordon'], 'Même famille, du latin corpus.'),
            q('Quelle lettre muette termine « sang » ?', ['g', 't', 'd'], 'Sanguin.'),
            q('Le mot « digital » est de la famille de :', ['doigt', 'dire', 'digne'], 'Du latin digitus, le doigt.'),
        ],
        sources=[ref('FR-C4-5E-ORTH-03', 'Étymologie et orthographe')]),

    'FR-C4-5E-GRAM-06': dict(duree=5, essentiel=
        'L’oral familier et l’écrit normé ne construisent pas les phrases de la même façon.\n'
        'À l’oral, on omet souvent le ne de la négation ; à l’écrit, il est obligatoire.\n'
        'À l’oral, on pose une question par l’intonation ; à l’écrit, on préfère l’inversion ou « est-ce que ».',
        parties=[
            ('Comparer', [
                {'type': 'tableau', 'titre': 'Oral familier, écrit normé', 'colonnes': ['Tournure', 'Oral familier', 'Écrit normé'], 'lignes': [
                    ['négation', 'Je sais pas.', 'Je ne sais pas.'], ['interrogation', 'Tu viens ?', 'Viens-tu ?'], ['reprise', 'Mon frère, il joue au foot.', 'Mon frère joue au football.'], ['pronom', 'On y va.', 'Nous y allons.']]},
                bq('À l’écrit, « Je comprends pas » devient :', ['Je ne comprends pas.', 'Je comprends pas.', 'Comprends pas.'], 'Le ne est obligatoire à l’écrit.'),
            ]),
            ('Choisir', [
                {'type': 'piege', 'erreur': 'On croit que l’oral familier est faux.', 'correction': 'Il convient à la conversation. Dans une rédaction, on emploie l’écrit normé.'},
            ]),
        ],
        a_toi=[
            q('À l’écrit normé, « Tu vas où ? » devient :', ['Où vas-tu ?', 'Tu vas où ?', 'Où tu vas ?'], 'Inversion du sujet.'),
            q('« Ma mère, elle travaille tard » contient :', ['une reprise par un pronom', 'une négation', 'une inversion'], 'Elle reprend ma mère.'),
            q('À l’écrit, « On est partis » devient plutôt :', ['Nous sommes partis.', 'On est partis.', 'Nous est partis.'], 'Nous remplace on.'),
        ],
        sources=[ref('FR-C4-5E-GRAM-06', 'Grammaire de l’oral et de l’écrit')]),

    'FR-C4-5E-CONJ-03': dict(duree=7, essentiel=
        'Dans un récit au passé, le passé simple raconte les actions principales, brèves et successives.\n'
        'L’imparfait décrit le décor, les personnages et les habitudes.\n'
        'Le plus-que-parfait exprime une action antérieure aux autres.',
        parties=[
            ('Trois temps, trois rôles', [
                {'type': 'tableau', 'titre': 'Valeurs des temps du récit', 'colonnes': ['Temps', 'Valeur', 'Exemple'], 'lignes': [
                    ['plus-que-parfait', 'antériorité', 'Il avait plu toute la nuit.'], ['imparfait', 'description', 'Le chemin était boueux.'], ['passé simple', 'action de premier plan', 'Le cheval glissa.']]},
                bq('« Chaque matin, il se levait à l’aube. » L’imparfait exprime :', ['une habitude', 'une action brève', 'une antériorité'], 'Chaque matin : une action répétée.'),
            ]),
            ('Écrire un récit', [
                {'type': 'exemple-resolu', 'enonce': 'Mets les verbes au bon temps : « La nuit (tomber) depuis une heure. Il (faire) froid. Soudain, un cri (retentir). »', 'etapes': [
                    'Tomber : antérieur aux autres faits, plus-que-parfait : était tombée.', 'Faire : description, imparfait : faisait.', 'Retentir : action soudaine, passé simple : retentit.'],
                 'conclusion': 'La nuit était tombée depuis une heure. Il faisait froid. Soudain, un cri retentit.'},
                {'type': 'piege', 'erreur': 'On met toutes les actions à l’imparfait.', 'correction': 'Les actions qui font avancer l’histoire sont au passé simple.'},
            ]),
        ],
        a_toi=[
            q('Après « soudain », on emploie souvent :', ['le passé simple', 'l’imparfait', 'le présent'], 'Une action brève qui surgit.'),
            q('« Le ciel était gris. » L’imparfait sert à :', ['décrire', 'raconter une action brève', 'exprimer l’antériorité'], 'C’est le décor.'),
            q('« Il retrouva la clé qu’il avait perdue. » « avait perdue » exprime :', ['une antériorité', 'une description', 'une habitude'], 'Il l’a perdue avant de la retrouver.'),
        ],
        sources=[ref('FR-C4-5E-CONJ-03', 'Valeurs des temps du récit')]),

    'FR-C4-5E-DICT-01': dict(duree=6, essentiel=
        'Une dictée d’auteur demande d’écouter chaque phrase en entier avant d’écrire.\n'
        'On relit ensuite plusieurs fois, en cherchant une difficulté à la fois.\n'
        'Les points à surveiller en 5e : accords sujet-verbe éloignés, participes passés, radicaux variables, lettres muettes.',
        parties=[
            ('Relire par étapes', [
                {'type': 'methode', 'titre': 'Pour relire une dictée', 'etapes': [
                    'Relis pour le sens : aucun mot ne manque.', 'Relis les verbes : trouve le noyau du sujet.', 'Relis les participes passés : être, avoir et place du COD.',
                    'Relis les groupes nominaux : genre et nombre.', 'Relis les mots invariables et les lettres muettes.']},
                {'type': 'piege', 'erreur': 'On relit tout d’un coup, une seule fois.', 'correction': 'Une relecture par difficulté permet de repérer davantage d’erreurs.'},
            ]),
            ('Un exemple', [
                {'type': 'exemple-resolu', 'enonce': 'Dictée : « Les branches que le vent avait arrachées jonchaient le chemin. »', 'etapes': [
                    'Arrachées : avoir, COD que, mis pour branches, placé avant : féminin pluriel.', 'Jonchaient : le sujet est les branches, au pluriel.'],
                 'conclusion': 'Chaque accord se justifie.'},
                bq('« Le cri des mouettes … le silence. » (troubler, imparfait)', ['troublait', 'troublaient', 'troublais'], 'Le noyau du sujet est cri.'),
            ]),
        ],
        a_toi=[
            q('« Les maisons que nous avons … » (visiter)', ['visitées', 'visité', 'visités'], 'COD que, placé avant, mis pour maisons.'),
            q('« Ils … leur chemin. » (reprendre, présent)', ['reprennent', 'reprenent', 'reprendent'], 'Radical reprenn- à la 3e personne du pluriel.'),
            q('Pour relire un participe passé, on regarde d’abord :', ['l’auxiliaire', 'la longueur du mot', 'la première lettre'], 'Être ou avoir.'),
        ],
        sources=[ref('FR-C4-5E-DICT-01', 'Dictée et relecture')]),
}

ecrire(COURS)
