"""Lot de cours : français CM2 (programme 2025). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-cm2-francais.py
    python3 scripts/cours/pages.py content/cours/FR-C3-CM2-*.json

Cycle 3 : phrases de 20 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
Exemples inventés pour le cours : aucun extrait d'œuvre protégée.
"""
from commun import bq, ecrire, q, source_referentiel as ref, vocabulaire

COURS = {
    'FR-C3-CM2-CONJ-01': dict(duree=8, essentiel=
        'Le passé simple sert aux actions brèves d’un récit au passé.\n'
        '1er groupe : je chantai, il chanta, ils chantèrent. 2e groupe : je finis, il finit, ils finirent.\n'
        'Être : il fut, ils furent. Avoir : il eut, ils eurent.',
        parties=[
            ('Les terminaisons', [
                {'type': 'tableau', 'titre': 'Au passé simple', 'colonnes': ['Personne', 'chanter', 'finir', 'être', 'avoir'], 'lignes': [
                    ['je', 'chantai', 'finis', 'fus', 'eus'], ['tu', 'chantas', 'finis', 'fus', 'eus'], ['il, elle', 'chanta', 'finit', 'fut', 'eut'],
                    ['nous', 'chantâmes', 'finîmes', 'fûmes', 'eûmes'], ['vous', 'chantâtes', 'finîtes', 'fûtes', 'eûtes'], ['ils, elles', 'chantèrent', 'finirent', 'furent', 'eurent']]},
                bq('« Ils … la porte. » (ouvrir, 3e personne du pluriel)', ['ouvrirent', 'ouvrèrent', 'ouvraient'], 'Ouvrir se conjugue comme les verbes en -ir : ils ouvrirent.'),
            ]),
            ('Des verbes à retenir', [
                {'type': 'tableau', 'titre': 'À la 3e personne', 'colonnes': ['Verbe', 'il, elle', 'ils, elles'], 'lignes': [
                    ['faire', 'fit', 'firent'], ['aller', 'alla', 'allèrent'], ['dire', 'dit', 'dirent'], ['venir', 'vint', 'vinrent'],
                    ['pouvoir', 'put', 'purent'], ['voir', 'vit', 'virent'], ['vouloir', 'voulut', 'voulurent'], ['prendre', 'prit', 'prirent']]},
                {'type': 'piege', 'erreur': 'On écrit « je chanta » ou « il chantat ».', 'correction': 'Je chantai, avec -ai. Il chanta, sans t pour les verbes du 1er groupe.'},
            ]),
        ],
        a_toi=[
            q('« Nous … contents. » (être, passé simple)', ['fûmes', 'étions', 'furent'], 'Être au passé simple : nous fûmes.'),
            q('« Elle … son manteau. » (prendre, passé simple)', ['prit', 'prenait', 'prenda'], 'Prendre : il prit, elle prit.'),
            q('« Les enfants … vers la mer. » (aller, passé simple)', ['allèrent', 'allirent', 'allaient'], 'Aller est du 3e groupe, mais se conjugue en -a au passé simple : ils allèrent.'),
        ],
        sources=[ref('FR-C3-CM2-CONJ-01', 'Le passé simple')]),

    'FR-C3-CM2-CONJ-02': dict(duree=6, essentiel=
        'Le plus-que-parfait est un temps composé : auxiliaire à l’imparfait, suivi du participe passé.\n'
        'J’avais fini. Nous étions partis.\n'
        'Il exprime une action passée qui a eu lieu avant une autre action passée.',
        parties=[
            ('Former le plus-que-parfait', [
                vocabulaire(3, 'Auxiliaire', 'Participe passé'),
                {'type': 'tableau', 'titre': 'Au plus-que-parfait', 'colonnes': ['Personne', 'finir (avoir)', 'venir (être)'], 'lignes': [
                    ['je', 'avais fini', 'étais venu, venue'], ['tu', 'avais fini', 'étais venu, venue'], ['il, elle', 'avait fini', 'était venu, venue'],
                    ['nous', 'avions fini', 'étions venus, venues'], ['vous', 'aviez fini', 'étiez venus, venues'], ['ils, elles', 'avaient fini', 'étaient venus, venues']]},
                bq('« Elles … venues. » (plus-que-parfait)', ['étaient', 'avaient', 'sont'], 'Venir se conjugue avec être, à l’imparfait : étaient.'),
            ]),
            ('Avant une autre action', [
                {'type': 'explique', 'texte': 'Quand Léa arriva, le film avait commencé. Le film a commencé avant l’arrivée de Léa.'},
                {'type': 'piege', 'erreur': 'On met l’auxiliaire au présent : « il a fini » au lieu de « il avait fini ».', 'correction': 'Au plus-que-parfait, l’auxiliaire est à l’imparfait.'},
            ]),
        ],
        a_toi=[
            q('« Nous … fini nos devoirs. » (plus-que-parfait)', ['avions', 'avons', 'étions'], 'Avoir à l’imparfait : nous avions.'),
            q('Le plus-que-parfait est formé de :', ['l’auxiliaire à l’imparfait et le participe passé', 'l’auxiliaire au présent et le participe passé', 'un seul mot'], 'C’est un temps composé.'),
            q('« Quand je suis arrivé, il … parti. »', ['était', 'est', 'sera'], 'Il est parti avant mon arrivée.'),
        ],
        sources=[ref('FR-C3-CM2-CONJ-02', 'Le plus-que-parfait')]),

    'FR-C3-CM2-CONJ-03': dict(duree=6, essentiel=
        'Aux temps composés, la négation encadre l’auxiliaire : ne devant, pas après.\n'
        'Léa a fini. → Léa n’a pas fini.\n'
        'Avec un pronom complément, ne se place devant le pronom : Tom l’a vu. → Tom ne l’a pas vu.',
        parties=[
            ('Encadrer l’auxiliaire', [
                {'type': 'tableau', 'titre': 'Forme affirmative et forme négative', 'colonnes': ['Affirmative', 'Négative'], 'lignes': [
                    ['Léa a fini ses exercices.', 'Léa n’a pas fini ses exercices.'], ['Il était venu.', 'Il n’était jamais venu.'],
                    ['Tom l’a vu.', 'Tom ne l’a pas vu.'], ['Nous avions encore faim.', 'Nous n’avions plus faim.']]},
                bq('Mets à la forme négative : « Ils sont partis. »', ['Ils ne sont pas partis.', 'Ils ne sont partis pas.', 'Ils sont ne pas partis.'], 'Ne et pas encadrent l’auxiliaire.'),
            ]),
            ('Ne pas oublier ne', [
                {'type': 'piege', 'erreur': 'À l’écrit, on oublie ne : « Il a pas compris ».', 'correction': 'À l’écrit, la négation a deux mots : il n’a pas compris.'},
            ]),
        ],
        a_toi=[
            q('Mets à la forme négative : « Elle les a appelés. »', ['Elle ne les a pas appelés.', 'Elle les n’a pas appelés.', 'Elle ne les a appelés pas.'], 'Ne avant le pronom, pas après l’auxiliaire.'),
            q('« Il avait déjà mangé. » À la forme négative avec jamais :', ['Il n’avait jamais mangé.', 'Il avait jamais mangé.', 'Il n’avait mangé jamais.'], 'Jamais se place après l’auxiliaire.'),
            q('Dans « Je n’ai pas dormi », l’auxiliaire est :', ['ai', 'dormi', 'pas'], 'Ne et pas l’encadrent.'),
        ],
        sources=[ref('FR-C3-CM2-CONJ-03', 'Forme négative aux temps composés')]),

    'FR-C3-CM2-ORTH-01': dict(duree=7, essentiel=
        'Avec l’auxiliaire être, le participe passé s’accorde avec le sujet, en genre et en nombre.\n'
        'Les filles sont parties. Le chat est rentré.\n'
        'Pour bien accorder, on repère le nom noyau du groupe sujet.',
        parties=[
            ('Accorder avec le sujet', [
                {'type': 'tableau', 'titre': 'Le participe passé de partir', 'colonnes': ['Sujet', 'Accord'], 'lignes': [
                    ['Le garçon est', 'parti'], ['La fille est', 'partie'], ['Les garçons sont', 'partis'], ['Les filles sont', 'parties']]},
                bq('« Mes cousines sont … hier. » (arriver)', ['arrivées', 'arrivé', 'arrivés'], 'Le sujet est féminin pluriel.'),
            ]),
            ('Le nom noyau', [
                {'type': 'exemple-resolu', 'enonce': '« La mère des enfants est parti… »', 'etapes': [
                    'Qui est parti ? La mère des enfants.', 'Le nom noyau est mère : féminin singulier.'],
                 'conclusion': 'La mère des enfants est partie.'},
                {'type': 'piege', 'erreur': 'On accorde avec le nom le plus proche : « est partis », à cause d’enfants.', 'correction': 'On accorde avec le noyau du sujet, mère : partie.'},
            ]),
        ],
        a_toi=[
            q('« Les feuilles sont … » (tomber)', ['tombées', 'tombés', 'tombé'], 'Feuilles : féminin pluriel.'),
            q('« Le chien des voisins est … » (sortir)', ['sorti', 'sortis', 'sortie'], 'Le noyau est chien : masculin singulier.'),
            q('« Léa et Inès sont … en retard. » (venir)', ['venues', 'venu', 'venus'], 'Deux filles : féminin pluriel.'),
        ],
        sources=[ref('FR-C3-CM2-ORTH-01', 'Participe passé avec être')]),

    'FR-C3-CM2-ORTH-02': dict(duree=8, essentiel=
        'Avec l’auxiliaire avoir, le participe passé ne s’accorde jamais avec le sujet.\n'
        'Il s’accorde avec le COD seulement si le COD est placé avant le verbe.\n'
        'Léa a cueilli des fleurs. Les fleurs que Léa a cueillies sont sur la table.',
        parties=[
            ('Où est le COD ?', [
                {'type': 'tableau', 'titre': 'Accord ou pas ?', 'colonnes': ['Phrase', 'COD', 'Accord'], 'lignes': [
                    ['Elles ont mangé.', 'aucun', 'non : mangé'], ['Léa a cueilli des fleurs.', 'après le verbe', 'non : cueilli'],
                    ['Les fleurs que Léa a cueillies…', 'que, mis pour fleurs, avant', 'oui : cueillies'], ['Ces lettres, je les ai lues.', 'les, mis pour lettres, avant', 'oui : lues']]},
                bq('« Mes sœurs ont … un gâteau. » (préparer)', ['préparé', 'préparées', 'préparés'], 'Avec avoir, pas d’accord avec le sujet. Le COD est après.'),
            ]),
            ('La méthode', [
                {'type': 'methode', 'titre': 'Pour accorder avec avoir', 'etapes': [
                    'Cherche le COD : verbe + qui ? ou quoi ?', 'S’il est après le verbe, ou absent : pas d’accord.', 'S’il est avant : accorde avec ce qu’il remplace.']},
                {'type': 'piege', 'erreur': 'On accorde avec le sujet : « Elles ont chantées ».', 'correction': 'Avec avoir, jamais d’accord avec le sujet : elles ont chanté.'},
            ]),
        ],
        a_toi=[
            q('« Les images que tu as … » (dessiner)', ['dessinées', 'dessiné', 'dessinés'], 'Que remplace images, placé avant : féminin pluriel.'),
            q('« Ils ont … toute la nuit. » (dormir)', ['dormi', 'dormis', 'dormie'], 'Pas de COD : pas d’accord.'),
            q('« Ta veste, je l’ai … » (trouver)', ['trouvée', 'trouvé', 'trouvés'], 'L’ remplace veste, placé avant : féminin singulier.'),
        ],
        sources=[ref('FR-C3-CM2-ORTH-02', 'Participe passé avec avoir')]),

    'FR-C3-CM2-GRAM-01': dict(duree=8, essentiel=
        'L’attribut du sujet suit un verbe d’état : être, paraitre, sembler, devenir, rester. Il donne une qualité au sujet.\n'
        'Le COD suit directement le verbe, sans préposition. Le COI est introduit par à ou de.\n'
        'Ma sœur devient pilote : attribut. Il mange une pomme : COD. Il parle à son voisin : COI.',
        parties=[
            ('Attribut ou COD ?', [
                {'type': 'tableau', 'titre': 'Comparer', 'colonnes': ['Phrase', 'Verbe', 'Fonction du mot souligné'], 'lignes': [
                    ['Ma sœur devient pilote.', 'devenir, verbe d’état', 'pilote : attribut du sujet'], ['Ma sœur rencontre une pilote.', 'rencontrer, verbe d’action', 'une pilote : COD']]},
                {'type': 'explique', 'texte': 'L’attribut désigne le sujet lui-même : ma sœur = pilote. Le COD désigne autre chose que le sujet.'},
                bq('Dans « Le ciel reste gris », « gris » est :', ['attribut du sujet', 'COD', 'COI'], 'Rester est un verbe d’état.'),
            ]),
            ('COD ou COI ?', [
                {'type': 'observe', 'consigne': 'Avec ou sans préposition.', 'exemples': [
                    'Tom regarde la mer : la mer, COD, sans préposition.', 'Tom pense à la mer : à la mer, COI, avec à.', 'Tom parle de son voyage : de son voyage, COI, avec de.']},
                {'type': 'piege', 'erreur': 'On croit que tout groupe après le verbe est un COD.', 'correction': 'Après un verbe d’état, c’est un attribut. Avec à ou de, c’est souvent un COI.'},
            ]),
        ],
        a_toi=[
            q('Dans « Il parle à son voisin », « à son voisin » est :', ['COI', 'COD', 'attribut du sujet'], 'Il est introduit par à.'),
            q('Dans « Ces fruits semblent mûrs », « mûrs » est :', ['attribut du sujet', 'COD', 'COI'], 'Sembler est un verbe d’état.'),
            q('Dans « Léa lit un roman », « un roman » est :', ['COD', 'COI', 'attribut du sujet'], 'Léa lit quoi ? Un roman, sans préposition.'),
        ],
        sources=[ref('FR-C3-CM2-GRAM-01', 'Attribut du sujet, COD, COI')]),

    'FR-C3-CM2-GRAM-02': dict(duree=6, essentiel=
        'Les compléments circonstanciels donnent des précisions sur l’action. On peut souvent les déplacer ou les supprimer.\n'
        'Le CC de temps répond à quand ? Le CC de lieu répond à où ?\n'
        'Le CC de cause répond à pourquoi ? Il commence souvent par parce que, à cause de, grâce à.',
        parties=[
            ('Trois questions', [
                {'type': 'tableau', 'titre': 'Les compléments circonstanciels', 'colonnes': ['Complément', 'Question', 'Exemple'], 'lignes': [
                    ['de temps', 'quand ?', 'Hier soir, il a neigé.'], ['de lieu', 'où ?', 'Il a neigé sur la montagne.'], ['de cause', 'pourquoi ?', 'Le match est annulé à cause de l’orage.']]},
                bq('Dans « Elle reste à la maison parce qu’elle est malade », le CC de cause est :', ['parce qu’elle est malade', 'à la maison', 'elle reste'], 'Pourquoi reste-t-elle ? Parce qu’elle est malade.'),
            ]),
            ('Déplacer, supprimer', [
                {'type': 'observe', 'consigne': 'Un CC peut bouger dans la phrase.', 'exemples': [
                    'À cause de la pluie, la sortie est annulée.', 'La sortie est annulée à cause de la pluie.', 'La sortie est annulée.']},
                {'type': 'piege', 'erreur': 'On confond CC de lieu et COI : « Il pense à la mer ».', 'correction': 'On ne peut pas supprimer « à la mer » : c’est un COI. Un CC peut se supprimer.'},
            ]),
        ],
        a_toi=[
            q('Dans « Pendant les vacances, nous irons à Lyon », « pendant les vacances » est :', ['CC de temps', 'CC de lieu', 'CC de cause'], 'Quand irons-nous ? Pendant les vacances.'),
            q('Dans « Grâce à toi, j’ai réussi », « grâce à toi » est :', ['CC de cause', 'CC de temps', 'COD'], 'Pourquoi ai-je réussi ? Grâce à toi.'),
            q('Dans « Les enfants jouent dans la cour », le CC de lieu est :', ['dans la cour', 'les enfants', 'jouent'], 'Où jouent-ils ? Dans la cour.'),
        ],
        sources=[ref('FR-C3-CM2-GRAM-02', 'Compléments circonstanciels de temps, de lieu, de cause')]),

    'FR-C3-CM2-GRAM-03': dict(duree=5, essentiel=
        'Le sujet est parfois placé après le verbe : c’est un sujet inversé.\n'
        'On le trouve dans une question, après un dialogue, ou après un complément de lieu.\n'
        'Sur la colline se dresse un château : le sujet de « se dresse » est « un château ».',
        parties=[
            ('Où le trouver ?', [
                {'type': 'tableau', 'titre': 'Des sujets inversés', 'colonnes': ['Situation', 'Exemple', 'Sujet'], 'lignes': [
                    ['une question', 'Où vas-tu ?', 'tu'], ['après un dialogue', '« Viens ! » cria Léa.', 'Léa'], ['après un CC de lieu', 'Dans le jardin poussent des roses.', 'des roses']]},
                bq('Dans « Au loin brillaient les lumières du port », le sujet est :', ['les lumières du port', 'au loin', 'le port'], 'Qui est-ce qui brillait ? Les lumières du port.'),
            ]),
            ('Accorder le verbe', [
                {'type': 'methode', 'titre': 'Pour trouver le sujet', 'etapes': [
                    'Repère le verbe conjugué.', 'Demande : qui est-ce qui… ? ou qu’est-ce qui… ?', 'Accorde le verbe avec la réponse, même si elle est après.']},
                {'type': 'piege', 'erreur': 'On écrit « Dans le jardin pousse des roses ».', 'correction': 'Le sujet est des roses, au pluriel : poussent.'},
            ]),
        ],
        a_toi=[
            q('Dans « Que veulent les élèves ? », le sujet est :', ['les élèves', 'que', 'veulent'], 'Qui est-ce qui veut ? Les élèves.'),
            q('« Sur la branche … deux oiseaux. » (chanter, présent)', ['chantent', 'chante', 'chantes'], 'Le sujet deux oiseaux est au pluriel.'),
            q('Dans « “J’ai gagné !” s’écria Tom », le sujet de « s’écria » est :', ['Tom', 'je', 'gagné'], 'Qui s’écria ? Tom.'),
        ],
        sources=[ref('FR-C3-CM2-GRAM-03', 'Le sujet inversé')]),

    'FR-C3-CM2-GRAM-04': dict(duree=7, essentiel=
        'Les prépositions, les conjonctions et les adverbes sont des mots invariables.\n'
        'La préposition introduit un complément : à, de, dans, par, pour, avec, sans, sous, sur, chez.\n'
        'Les conjonctions relient. Les adverbes modifient le sens d’un verbe, d’un adjectif ou d’un autre adverbe.',
        parties=[
            ('Quatre classes de mots invariables', [
                vocabulaire(3, 'Conjonction de coordination', 'Conjonction de subordination'),
                {'type': 'tableau', 'titre': 'Des exemples', 'colonnes': ['Classe', 'Exemples'], 'lignes': [
                    ['préposition', 'à, de, dans, par, pour, avec, sans, sous, sur, chez, vers'], ['conjonction de coordination', 'mais, ou, et, donc, or, ni, car'],
                    ['conjonction de subordination', 'quand, parce que, si, comme, lorsque, que'], ['adverbe', 'vite, souvent, très, hier, bien, lentement']]},
                bq('Dans « Il part avec son frère », « avec » est :', ['une préposition', 'une conjonction', 'un adverbe'], 'Avec introduit le groupe « son frère ».'),
            ]),
            ('Les reconnaitre', [
                {'type': 'observe', 'consigne': 'Une phrase, quatre mots invariables.', 'exemples': [
                    'Hier, Léa marchait très vite dans la rue, car elle était en retard.',
                    'Hier, très, vite : adverbes. Dans : préposition. Car : conjonction de coordination.']},
                {'type': 'piege', 'erreur': 'On écrit « des enfants très sages » avec « très » au pluriel.', 'correction': 'Un adverbe est invariable : très ne prend jamais de s.'},
            ]),
        ],
        a_toi=[
            q('Dans « Je reste car il pleut », « car » est :', ['une conjonction de coordination', 'une préposition', 'un adverbe'], 'Car fait partie de mais, ou, et, donc, or, ni, car.'),
            q('Dans « Il parle doucement », « doucement » est :', ['un adverbe', 'un adjectif', 'une préposition'], 'Il précise comment il parle.'),
            q('Dans « Quand la cloche sonne, on sort », « quand » est :', ['une conjonction de subordination', 'une préposition', 'un nom'], 'Il introduit une proposition subordonnée.'),
        ],
        sources=[ref('FR-C3-CM2-GRAM-04', 'Prépositions, conjonctions, adverbes')]),

    'FR-C3-CM2-GRAM-05': dict(duree=6, essentiel=
        'Une phrase simple contient un seul verbe conjugué.\n'
        'Une phrase complexe contient plusieurs verbes conjugués : elle a plusieurs propositions.\n'
        'Quand la cloche sonne, les élèves sortent : deux verbes conjugués, deux propositions.',
        parties=[
            ('Compter les verbes conjugués', [
                vocabulaire(3, 'Proposition'),
                {'type': 'tableau', 'titre': 'Simple ou complexe ?', 'colonnes': ['Phrase', 'Verbes conjugués', 'Type'], 'lignes': [
                    ['Les élèves sortent dans la cour.', 'sortent', 'simple'], ['Quand la cloche sonne, les élèves sortent.', 'sonne, sortent', 'complexe'],
                    ['Il pleut, nous restons à l’abri et nous lisons.', 'pleut, restons, lisons', 'complexe']]},
                bq('Combien de propositions dans « Léa chante et Tom danse » ?', ['2', '1', '3'], 'Deux verbes conjugués : chante et danse.'),
            ]),
            ('Attention à l’infinitif', [
                {'type': 'piege', 'erreur': 'On compte « jouer » dans « Il aime jouer » comme un verbe conjugué.', 'correction': 'Jouer est à l’infinitif. La phrase a un seul verbe conjugué, aime : elle est simple.'},
            ]),
        ],
        a_toi=[
            q('« Le soleil brille sur la plage. » est une phrase :', ['simple', 'complexe', 'sans verbe'], 'Un seul verbe conjugué : brille.'),
            q('« Je pense que tu as raison. » est une phrase :', ['complexe', 'simple', 'sans verbe'], 'Deux verbes conjugués : pense, as.'),
            q('Une proposition est organisée autour :', ['d’un verbe conjugué', 'd’un nom', 'd’un adjectif'], 'Il y a une proposition par verbe conjugué.'),
        ],
        sources=[ref('FR-C3-CM2-GRAM-05', 'Phrase simple et phrase complexe')]),

    'FR-C3-CM2-GRAM-06': dict(duree=6, essentiel=
        'Pour éviter une répétition, on remplace le COD par le, la, l’ ou les, placé devant le verbe.\n'
        'On remplace un COI introduit par à par lui ou leur.\n'
        'Léa regarde les oiseaux. → Léa les regarde. Tom parle à sa sœur. → Tom lui parle.',
        parties=[
            ('COD ou COI ?', [
                {'type': 'tableau', 'titre': 'Les pronoms compléments', 'colonnes': ['Complément', 'Singulier', 'Pluriel'], 'lignes': [
                    ['COD', 'le, la, l’', 'les'], ['COI introduit par à', 'lui', 'leur']]},
                bq('« J’écris à mes grands-parents. » → « Je … écris. »', ['leur', 'les', 'lui'], 'COI au pluriel, introduit par à : leur.'),
            ]),
            ('Leur ou leurs ?', [
                {'type': 'explique', 'texte': 'Devant un verbe, leur est un pronom : il ne prend jamais de s. Je leur parle.'},
                {'type': 'piege', 'erreur': 'On écrit « je leurs parle ».', 'correction': 'Leur pronom est invariable. Leurs avec s se place devant un nom : leurs livres.'},
            ]),
        ],
        a_toi=[
            q('« Tom range sa chambre. » → « Tom … range. »', ['la', 'lui', 'leur'], 'COD féminin singulier : la.'),
            q('« Je téléphone à mon ami. » → « Je … téléphone. »', ['lui', 'le', 'leur'], 'COI singulier, introduit par à : lui.'),
            q('« Nous regardons les étoiles. » → « Nous … regardons. »', ['les', 'leur', 'la'], 'COD au pluriel : les.'),
        ],
        sources=[ref('FR-C3-CM2-GRAM-06', 'Pronoms compléments d’objet')]),

    'FR-C3-CM2-LECT-01': dict(duree=6, essentiel=
        'On reconnait un genre littéraire à des critères : sa forme, ses personnages, sa façon de raconter.\n'
        'Une fable met en scène des animaux et finit par une morale. Le théâtre est écrit pour être joué.\n'
        'Un récit policier raconte une enquête ; la science-fiction imagine un futur ou d’autres mondes.',
        parties=[
            ('Des critères', [
                {'type': 'tableau', 'titre': 'Les principaux genres', 'colonnes': ['Genre', 'Critères'], 'lignes': [
                    ['conte', 'il était une fois, merveilleux, épreuves, fin heureuse'], ['fable', 'souvent en vers, animaux, morale'],
                    ['roman', 'récit long, en chapitres'], ['poésie', 'vers, rimes, images'], ['théâtre', 'répliques, didascalies, pour être joué'],
                    ['bande dessinée', 'cases, bulles, dessins']]},
                bq('Un texte avec des répliques et des didascalies est :', ['une pièce de théâtre', 'un conte', 'une fable'], 'Il est écrit pour être joué.'),
            ]),
            ('Récit policier et science-fiction', [
                {'type': 'observe', 'consigne': 'Deux genres de récits.', 'exemples': [
                    'Récit policier : un mystère, des indices, un enquêteur, un coupable.', 'Science-fiction : des robots, des voyages dans l’espace, un futur inventé.']},
                {'type': 'piege', 'erreur': 'On croit qu’un texte avec des animaux est forcément une fable.', 'correction': 'Il faut aussi une morale. Un roman ou un conte peuvent avoir des animaux.'},
            ]),
        ],
        a_toi=[
            q('Un texte qui se termine par une morale est souvent :', ['une fable', 'un roman policier', 'une bande dessinée'], 'La morale donne une leçon.'),
            q('Un texte avec des indices et un enquêteur est :', ['un récit policier', 'un poème', 'un conte'], 'Il raconte une enquête.'),
            q('Un texte avec des cases et des bulles est :', ['une bande dessinée', 'une pièce de théâtre', 'une fable'], 'Les bulles contiennent les paroles.'),
        ],
        sources=[ref('FR-C3-CM2-LECT-01', 'Les genres littéraires')]),

    'FR-C3-CM2-LECT-02': dict(duree=5, essentiel=
        'Un document composite mêle textes et images : une page de manuel, un article, une affiche.\n'
        'On y repère le titre, les intertitres, les légendes, les encadrés, les schémas et la source.\n'
        'Chaque élément a un rôle : on ne lit pas forcément de haut en bas.',
        parties=[
            ('Les éléments', [
                {'type': 'tableau', 'titre': 'Le rôle de chaque élément', 'colonnes': ['Élément', 'Rôle'], 'lignes': [
                    ['titre', 'annonce le sujet'], ['intertitre', 'annonce une partie'], ['légende', 'explique une image'],
                    ['encadré', 'met en valeur une information'], ['schéma', 'montre comment ça marche'], ['source', 'dit d’où vient le document']]},
                bq('Le petit texte sous une photo s’appelle :', ['une légende', 'un intertitre', 'une source'], 'Il explique ce que montre la photo.'),
            ]),
            ('Lire avec méthode', [
                {'type': 'methode', 'titre': 'Pour lire une page documentaire', 'etapes': [
                    'Lis le titre et regarde les images.', 'Lis les intertitres pour voir les parties.', 'Va à la partie qui répond à ta question.', 'Vérifie la source.']},
                {'type': 'piege', 'erreur': 'On lit seulement le texte principal.', 'correction': 'Les légendes et les encadrés contiennent souvent l’information cherchée.'},
            ]),
        ],
        a_toi=[
            q('L’intertitre annonce :', ['une partie du document', 'le nom de l’auteur', 'la date'], 'Il découpe le document.'),
            q('Pour savoir d’où vient un document, on lit :', ['la source', 'le titre', 'la légende'], 'Elle donne l’auteur, le site ou le livre.'),
            q('Un schéma sert à :', ['montrer comment ça marche', 'donner une opinion', 'raconter une histoire'], 'Un dessin simplifié avec des flèches.'),
        ],
        sources=[ref('FR-C3-CM2-LECT-02', 'Lire un document composite')]),

    'FR-C3-CM2-LECT-03': dict(duree=6, essentiel=
        'Une réponse se trouve parfois dans plusieurs passages, ou dans un texte et une image.\n'
        'On prélève chaque information, puis on les relie.\n'
        'Faire une inférence, c’est comprendre ce que le texte ne dit pas directement, grâce aux indices.',
        parties=[
            ('Croiser les indices', [
                {'type': 'exemple-resolu', 'enonce': 'Le texte dit : « Il a neigé toute la nuit. » L’image montre des skis devant la porte. Que va faire la famille ?', 'etapes': [
                    'Indice du texte : il y a de la neige.', 'Indice de l’image : des skis sont prêts.'],
                 'conclusion': 'La famille va skier.'},
                bq('« Léo enfila son maillot et attrapa sa serviette. » Où va Léo ?', ['à la piscine', 'à l’école', 'au cinéma'], 'Maillot et serviette sont des indices.'),
            ]),
            ('Justifier', [
                {'type': 'methode', 'titre': 'Pour répondre', 'etapes': [
                    'Relis la question.', 'Souligne les indices dans chaque passage.', 'Relie-les pour répondre.', 'Cite les indices pour justifier.']},
                {'type': 'piege', 'erreur': 'On répond avec ce qu’on imagine, sans indice.', 'correction': 'Chaque réponse doit s’appuyer sur des mots du texte ou de l’image.'},
            ]),
        ],
        a_toi=[
            q('« Elle grelottait et ses doigts étaient bleus. » Elle a :', ['froid', 'chaud', 'faim'], 'Grelotter et doigts bleus : des indices.'),
            q('Faire une inférence, c’est :', ['comprendre ce qui n’est pas écrit, grâce aux indices', 'recopier une phrase', 'inventer une suite'], 'On relie les indices.'),
            q('Pour justifier une réponse, on :', ['cite des mots du texte', 'dit « je le sens »', 'regarde le titre seulement'], 'Les indices prouvent la réponse.'),
        ],
        sources=[ref('FR-C3-CM2-LECT-03', 'Prélever et croiser des informations')]),

    'FR-C3-CM2-ECOU-01': dict(duree=5, essentiel=
        'À l’oral, on reconnait plusieurs genres de discours : un récit, une explication, une consigne, un point de vue.\n'
        'Chaque genre a ses mots repères.\n'
        '« À mon avis » annonce un point de vue ; « d’abord, ensuite » organisent une consigne ou un récit.',
        parties=[
            ('Les mots repères', [
                {'type': 'tableau', 'titre': 'Reconnaitre à l’écoute', 'colonnes': ['Genre', 'But', 'Mots repères'], 'lignes': [
                    ['récit', 'raconter', 'il était une fois, un jour, soudain'], ['explication', 'faire comprendre', 'parce que, c’est pourquoi'],
                    ['consigne', 'faire faire', 'verbes à l’impératif, d’abord, ensuite'], ['point de vue', 'donner son avis', 'je pense que, à mon avis']]},
                bq('« Je pense que les écrans devraient être interdits le soir. » C’est :', ['un point de vue', 'un récit', 'une consigne'], 'Je pense que : la personne donne son avis.'),
            ]),
            ('Écouter activement', [
                {'type': 'piege', 'erreur': 'On croit qu’un point de vue est une vérité.', 'correction': 'C’est un avis : une autre personne peut penser autrement.'},
            ]),
        ],
        a_toi=[
            q('« Découpe le carton, puis colle-le sur la feuille. » C’est :', ['une consigne', 'un récit', 'un point de vue'], 'Des verbes à l’impératif.'),
            q('« Un soir d’hiver, un loup frappa à la porte. » C’est :', ['un récit', 'une explication', 'une consigne'], 'Il raconte une histoire.'),
            q('« Les feuilles tombent parce que l’arbre manque de lumière. » C’est :', ['une explication', 'un récit', 'un point de vue'], 'Parce que : on fait comprendre.'),
        ],
        sources=[ref('FR-C3-CM2-ECOU-01', 'Les genres de discours')]),

    'FR-C3-CM2-ECR-01': dict(duree=7, essentiel=
        'Dans un récit, un dialogue rapporte les paroles des personnages.\n'
        'On ouvre les guillemets, on met un tiret à chaque changement de personnage, puis on ferme les guillemets.\n'
        'Un verbe de parole dit qui parle et comment : demanda, répondit, murmura, s’écria.',
        parties=[
            ('La ponctuation du dialogue', [
                {'type': 'exemple-resolu', 'enonce': 'Écris le dialogue entre Léa et Tom.', 'etapes': [
                    '« Tu viens ? demanda Léa.', '– J’arrive ! répondit Tom. »'],
                 'conclusion': 'Guillemets au début et à la fin, tiret quand Tom prend la parole.'},
                bq('Quel signe marque un changement de personnage dans un dialogue ?', ['le tiret', 'la virgule', 'les parenthèses'], 'Chaque nouvelle réplique commence par un tiret.'),
            ]),
            ('Varier les verbes de parole', [
                {'type': 'tableau', 'titre': 'Au lieu de « dit »', 'colonnes': ['Le personnage…', 'Verbe'], 'lignes': [
                    ['pose une question', 'demanda'], ['répond', 'répondit'], ['parle tout bas', 'murmura, chuchota'], ['crie', 's’écria, hurla']]},
                {'type': 'piege', 'erreur': 'On répète « dit » à chaque réplique.', 'correction': 'Un verbe précis montre le ton : murmura, s’exclama.'},
            ]),
        ],
        a_toi=[
            q('Un dialogue commence par :', ['des guillemets ouvrants', 'un point', 'un tiret seulement'], 'On ouvre les guillemets.'),
            q('« Chut ! … Inès. » Quel verbe convient ?', ['chuchota', 'hurla', 'demanda'], 'Chut : on parle tout bas.'),
            q('Dans « “Où vas-tu ?” demanda Tom », le sujet de « demanda » est :', ['Tom', 'tu', 'où'], 'Le sujet est inversé après la réplique.'),
        ],
        sources=[ref('FR-C3-CM2-ECR-01', 'Écrire un dialogue')]),

    'FR-C3-CM2-VOC-01': dict(duree=5, essentiel=
        'Les mots du dictionnaire sont rangés dans l’ordre alphabétique, lettre après lettre.\n'
        'Les mots repères, en haut de page, indiquent le premier et le dernier mot de la page.\n'
        'L’article donne la classe du mot, ses sens numérotés et des exemples.',
        parties=[
            ('Trouver le mot', [
                {'type': 'methode', 'titre': 'Pour chercher « boussole »', 'etapes': [
                    'Ouvre le dictionnaire à la lettre B.', 'Regarde les mots repères en haut des pages.', 'Compare lettre par lettre : bou… après bon….', 'Lis tout l’article.']},
                bq('Lequel vient en premier dans le dictionnaire ?', ['bouclier', 'boussole', 'bouteille'], 'b-o-u-c avant b-o-u-s et b-o-u-t.'),
            ]),
            ('Lire l’article', [
                {'type': 'tableau', 'titre': 'Les abréviations', 'colonnes': ['Abréviation', 'Sens'], 'lignes': [
                    ['n. m.', 'nom masculin'], ['n. f.', 'nom féminin'], ['adj.', 'adjectif'], ['v.', 'verbe'], ['adv.', 'adverbe']]},
                {'type': 'piege', 'erreur': 'On lit seulement le premier sens.', 'correction': 'Un mot a souvent plusieurs sens numérotés : on choisit celui qui convient à la phrase.'},
            ]),
        ],
        a_toi=[
            q('« adj. » signifie :', ['adjectif', 'adverbe', 'article'], 'Comme « joli, adj. ».'),
            q('Dans le dictionnaire, on cherche un verbe conjugué à :', ['l’infinitif', 'l’imparfait', 'la 3e personne'], '« Courait » se cherche à « courir ».'),
            q('Les mots repères en haut de page servent à :', ['savoir quels mots sont sur la page', 'donner la définition', 'écrire le mot'], 'Premier et dernier mot de la page.'),
        ],
        sources=[ref('FR-C3-CM2-VOC-01', 'Utiliser le dictionnaire')]),

    'FR-C3-CM2-VOC-02': dict(duree=6, essentiel=
        'Un mot polysémique a plusieurs sens.\n'
        'Le sens propre est le sens premier, concret. Le sens figuré est une image.\n'
        '« Un cœur de pierre » : au sens figuré, une personne insensible.',
        parties=[
            ('Propre ou figuré ?', [
                {'type': 'tableau', 'titre': 'Des exemples', 'colonnes': ['Sens propre', 'Sens figuré'], 'lignes': [
                    ['une pierre dure', 'un cœur de pierre : insensible'], ['une montagne haute', 'une montagne de devoirs : beaucoup'],
                    ['un sommet glacé', 'un accueil glacé : froid, peu aimable'], ['dévorer un gâteau', 'dévorer un livre : le lire avec passion']]},
                bq('« Il a dévoré ce roman. » Le verbe est employé au sens :', ['figuré', 'propre', 'inconnu'], 'Il ne l’a pas mangé : il l’a lu avec passion.'),
            ]),
            ('Le contexte décide', [
                {'type': 'piege', 'erreur': 'On prend toujours le premier sens du dictionnaire.', 'correction': 'C’est la phrase qui dit quel sens choisir.'},
            ]),
        ],
        a_toi=[
            q('« Elle a une mémoire d’éléphant. » Cela veut dire :', ['elle se souvient de tout', 'elle est très grosse', 'elle a une trompe'], 'Sens figuré : une très bonne mémoire.'),
            q('« Le chat a grimpé dans l’arbre. » Le mot « arbre » est au sens :', ['propre', 'figuré', 'imagé'], 'C’est un vrai arbre.'),
            q('« Il pleut des cordes » signifie :', ['il pleut très fort', 'des cordes tombent', 'il fait beau'], 'Une image pour une pluie forte.'),
        ],
        sources=[ref('FR-C3-CM2-VOC-02', 'Sens propre et sens figuré')]),

    'FR-C3-CM2-VOC-03': dict(duree=5, essentiel=
        'Chaque discipline a ses mots précis.\n'
        'En géographie, un fleuve se jette dans la mer, une rivière dans un autre cours d’eau.\n'
        'Employer le mot juste rend le propos clair et exact.',
        parties=[
            ('Des mots par univers', [
                {'type': 'tableau', 'titre': 'Le mot juste', 'colonnes': ['Univers', 'Mot courant', 'Mot précis'], 'lignes': [
                    ['géographie', 'grande rivière qui va à la mer', 'fleuve'], ['sciences', 'combien ça pèse', 'masse, en grammes'],
                    ['histoire', 'cent ans', 'siècle'], ['arts', 'tableau qui montre une personne', 'portrait']]},
                bq('La Loire se jette dans l’océan Atlantique. C’est :', ['un fleuve', 'une rivière', 'un ruisseau'], 'Elle rejoint l’océan.'),
            ]),
            ('Choisir', [
                {'type': 'piege', 'erreur': 'On emploie des mots vagues : « le truc », « la chose ».', 'correction': 'On cherche le mot exact, dans la leçon ou le dictionnaire.'},
            ]),
        ],
        a_toi=[
            q('En arts, une œuvre en volume, taillée ou modelée, s’appelle :', ['une sculpture', 'un portrait', 'un dessin'], 'On peut en faire le tour.'),
            q('En histoire, une période de cent ans est :', ['un siècle', 'un millénaire', 'une décennie'], 'Un millénaire dure mille ans.'),
            q('En sciences, une balance mesure :', ['la masse', 'la longueur', 'la durée'], 'En grammes ou en kilogrammes.'),
        ],
        sources=[ref('FR-C3-CM2-VOC-03', 'Le mot juste selon l’univers de référence')]),

    'FR-C3-CM2-ORTH-03': dict(duree=6, essentiel=
        'Les noms en -al font leur pluriel en -aux : un cheval, des chevaux.\n'
        'Les noms en -eu et -eau prennent un x : des jeux, des bateaux. Sept noms en -ou prennent un x.\n'
        'Certains féminins sont irréguliers : beau, belle ; vieux, vieille ; le roi, la reine.',
        parties=[
            ('Les pluriels en x', [
                {'type': 'tableau', 'titre': 'Pluriels particuliers', 'colonnes': ['Finale', 'Règle', 'Exceptions'], 'lignes': [
                    ['-al', 'des chevaux, des journaux', 'bals, carnavals, festivals, récitals'], ['-eu, -eau', 'des jeux, des bateaux', 'pneus, bleus'],
                    ['-ou', 'des clous, des trous', 'bijoux, cailloux, choux, genoux, hiboux, joujoux, poux'], ['-ail', 'des rails, des détails', 'travaux, vitraux, coraux, émaux']]},
                bq('Le pluriel de « un caillou » est :', ['des cailloux', 'des caillous', 'des caillaux'], 'Caillou fait partie des sept noms en -oux.'),
            ]),
            ('Des féminins irréguliers', [
                {'type': 'observe', 'consigne': 'Le féminin change beaucoup.', 'exemples': [
                    'beau, belle ; nouveau, nouvelle ; vieux, vieille', 'fou, folle ; doux, douce ; long, longue', 'le roi, la reine ; le héros, l’héroïne']},
                {'type': 'piege', 'erreur': 'On écrit « des festivaux ».', 'correction': 'Festival est une exception : des festivals.'},
            ]),
        ],
        a_toi=[
            q('Le pluriel de « un journal » est :', ['des journaux', 'des journals', 'des journauxs'], '-al devient -aux.'),
            q('Le pluriel de « un genou » est :', ['des genoux', 'des genous', 'des genaux'], 'Un des sept noms en -oux.'),
            q('Le féminin de « vieux » est :', ['vieille', 'vieuse', 'vieuxe'], 'Un féminin irrégulier.'),
        ],
        sources=[ref('FR-C3-CM2-ORTH-03', 'Pluriels et féminins particuliers')]),

    'FR-C3-CM2-GRAM-07': dict(duree=6, essentiel=
        'L’adjectif épithète est placé à côté du nom : un chat noir.\n'
        'L’adjectif attribut du sujet est relié au sujet par un verbe d’état : le chat est noir.\n'
        'Le complément du nom précise le nom, souvent après de ou à : le chat de Léa.',
        parties=[
            ('Trois fonctions', [
                vocabulaire(3, 'Épithète', 'Complément du nom'),
                {'type': 'tableau', 'titre': 'Comparer', 'colonnes': ['Groupe', 'Fonction'], 'lignes': [
                    ['un chat noir', 'noir : épithète de chat'], ['le chat est noir', 'noir : attribut du sujet'], ['le chat de Léa', 'de Léa : complément du nom chat']]},
                bq('Dans « une robe de soirée », « de soirée » est :', ['complément du nom', 'épithète', 'attribut du sujet'], 'Il précise le nom robe, introduit par de.'),
            ]),
            ('Le verbe d’état', [
                {'type': 'piege', 'erreur': 'On croit que l’adjectif est épithète dans « la mer semble calme ».', 'correction': 'Sembler est un verbe d’état : calme est attribut du sujet.'},
            ]),
        ],
        a_toi=[
            q('Dans « Les enfants sont joyeux », « joyeux » est :', ['attribut du sujet', 'épithète', 'complément du nom'], 'Relié au sujet par être.'),
            q('Dans « une grande maison », « grande » est :', ['épithète', 'attribut du sujet', 'complément du nom'], 'Il est à côté du nom.'),
            q('Dans « un verre à pied », « à pied » est :', ['complément du nom', 'épithète', 'COI'], 'Il précise le nom verre.'),
        ],
        sources=[ref('FR-C3-CM2-GRAM-07', 'Épithète, attribut, complément du nom')]),

    'FR-C3-CM2-GRAM-08': dict(duree=6, essentiel=
        'Une phrase peut être déclarative, interrogative, exclamative ou injonctive.\n'
        'Elle peut être à la forme affirmative ou négative.\n'
        'On peut transformer une phrase sans changer son sens : « Vous avez visité ce musée. » → « Avez-vous visité ce musée ? »',
        parties=[
            ('Transformer', [
                {'type': 'tableau', 'titre': 'Une phrase, plusieurs types', 'colonnes': ['Type', 'Phrase'], 'lignes': [
                    ['déclaratif', 'Vous avez déjà visité ce musée.'], ['interrogatif', 'Avez-vous déjà visité ce musée ?'],
                    ['exclamatif', 'Comme vous avez aimé ce musée !'], ['injonctif', 'Visitez ce musée.']]},
                bq('Quelle phrase est interrogative ?', ['Est-ce que tu viens demain ?', 'Viens demain.', 'Tu viens demain.'], 'Elle pose une question et finit par un point d’interrogation.'),
            ]),
            ('Avec des phrases longues', [
                {'type': 'exemple-resolu', 'enonce': 'Mets à la forme négative : « Les élèves de CM2 ont visité le château avec leur maitresse. »', 'etapes': [
                    'Le verbe est « ont visité », au passé composé.', 'Ne et pas encadrent l’auxiliaire ont.'],
                 'conclusion': 'Les élèves de CM2 n’ont pas visité le château avec leur maitresse.'},
                {'type': 'piege', 'erreur': 'Dans une question avec inversion, on oublie le trait d’union : « Avez vous ».', 'correction': 'Le verbe et le pronom inversé sont reliés par un trait d’union : avez-vous.'},
            ]),
        ],
        a_toi=[
            q('« Ferme la fenêtre. » est une phrase :', ['injonctive', 'interrogative', 'exclamative'], 'Elle donne un ordre.'),
            q('Transforme en question : « Il a fini son livre. »', ['A-t-il fini son livre ?', 'Il a fini son livre !', 'Il n’a pas fini son livre.'], 'On inverse le sujet : a-t-il.'),
            q('« Quel beau voyage nous avons fait ! » est une phrase :', ['exclamative', 'déclarative', 'injonctive'], 'Elle exprime un sentiment fort.'),
        ],
        sources=[ref('FR-C3-CM2-GRAM-08', 'Types et formes de phrases')]),

    'FR-C3-CM2-GRAM-09': dict(duree=7, essentiel=
        'La nature, ou classe, dit ce qu’est un mot : nom, verbe, adjectif, pronom, déterminant…\n'
        'Les groupes ont aussi une nature : groupe nominal, groupe verbal, groupe prépositionnel.\n'
        'La fonction dit le rôle du mot ou du groupe dans la phrase : sujet, COD, complément circonstanciel…',
        parties=[
            ('Nature des groupes', [
                {'type': 'tableau', 'titre': 'Trois groupes', 'colonnes': ['Groupe', 'Il est construit autour', 'Exemple'], 'lignes': [
                    ['groupe nominal', 'd’un nom', 'le petit chat'], ['groupe verbal', 'd’un verbe', 'mange sa pâtée'], ['groupe prépositionnel', 'd’une préposition', 'dans le jardin']]},
                bq('« dans le jardin » est :', ['un groupe prépositionnel', 'un groupe nominal', 'un groupe verbal'], 'Il commence par la préposition dans.'),
            ]),
            ('Nature ou fonction ?', [
                {'type': 'exemple-resolu', 'enonce': 'Dans « Le chat dort dans le jardin », analyse « dans le jardin ».', 'etapes': [
                    'Nature : groupe prépositionnel.', 'Fonction : complément circonstanciel de lieu.'],
                 'conclusion': 'Un même groupe a une nature et une fonction.'},
                {'type': 'piege', 'erreur': 'On répond « sujet » quand on demande la nature.', 'correction': 'Sujet est une fonction. La nature serait groupe nominal ou pronom.'},
            ]),
        ],
        a_toi=[
            q('Quelle est la nature de « elle » ?', ['pronom', 'nom', 'sujet'], 'Sujet est sa fonction, pronom sa nature.'),
            q('« les grandes vacances » est :', ['un groupe nominal', 'un groupe prépositionnel', 'un groupe verbal'], 'Il est construit autour du nom vacances.'),
            q('Dans « Tom lit », la fonction de « Tom » est :', ['sujet', 'nom propre', 'groupe nominal'], 'Nom propre est sa nature.'),
        ],
        sources=[ref('FR-C3-CM2-GRAM-09', 'Nature des mots et des groupes')]),

    'FR-C3-CM2-ORTH-04': dict(duree=5, essentiel=
        'Les noms féminins en -tion sont très nombreux : la récréation, la natation.\n'
        'Les noms féminins en -ée prennent un e, sauf ceux en -té : la journée, mais la liberté.\n'
        'Les noms masculins finissent par -ail, -eil, -euil ; les féminins par -aille, -eille, -euille.',
        parties=[
            ('-ée ou -té ?', [
                {'type': 'tableau', 'titre': 'Noms féminins', 'colonnes': ['Finale', 'Exemples', 'À retenir'], 'lignes': [
                    ['-ée', 'la journée, l’année, la fusée', 'presque toujours un e'], ['-té', 'la liberté, la beauté, la santé', 'sauf la dictée, la montée, la jetée, la portée, la pâtée']]},
                bq('Quel mot est bien écrit ?', ['la liberté', 'la libertée', 'la libertét'], 'Les noms féminins en -té ne prennent pas de e.'),
            ]),
            ('-ail ou -aille ?', [
                {'type': 'tableau', 'titre': 'Masculin ou féminin', 'colonnes': ['Masculin', 'Féminin'], 'lignes': [
                    ['le travail, l’éventail', 'la bataille, la paille'], ['le soleil, le réveil', 'l’abeille, la bouteille'], ['le fauteuil, l’écureuil', 'la feuille']]},
                {'type': 'piege', 'erreur': 'On écrit « le travaille ».', 'correction': 'Travail est masculin : -ail, sans le e final.'},
            ]),
        ],
        a_toi=[
            q('Quel mot est bien écrit ?', ['l’abeille', 'l’abeil', 'l’abeill'], 'Nom féminin : -eille.'),
            q('Quel mot est bien écrit ?', ['la dictée', 'la dicté', 'la dictét'], 'Une exception : la dictée prend un e.'),
            q('Quel mot est bien écrit ?', ['le fauteuil', 'le fauteuille', 'le fauteil'], 'Nom masculin : -euil.'),
        ],
        sources=[ref('FR-C3-CM2-ORTH-04', 'Finales de noms fréquentes')]),

    'FR-C3-CM2-ORTH-05': dict(duree=6, essentiel=
        'Au féminin, certains adjectifs changent de finale : heureux, heureuse ; neuf, neuve ; léger, légère.\n'
        'D’autres doublent la consonne : cruel, cruelle ; bon, bonne.\n'
        'Les adjectifs en -al font leur pluriel en -aux : normal, normaux.',
        parties=[
            ('Former le féminin', [
                {'type': 'tableau', 'titre': 'Les finales qui changent', 'colonnes': ['Masculin', 'Féminin'], 'lignes': [
                    ['-eux : heureux', '-euse : heureuse'], ['-f : neuf', '-ve : neuve'], ['-er : léger', '-ère : légère'], ['-el : cruel', '-elle : cruelle']]},
                bq('Le féminin de « sportif » est :', ['sportive', 'sportife', 'sportiffe'], '-f devient -ve.'),
            ]),
            ('Former le pluriel', [
                {'type': 'observe', 'consigne': 'Les adjectifs en -al.', 'exemples': [
                    'un résultat normal, des résultats normaux', 'un conseil amical, des conseils amicaux', 'mais : des chantiers navals, des moments banals']},
                {'type': 'piege', 'erreur': 'On écrit « des fleurs normaux ».', 'correction': 'Au féminin pluriel, on ajoute -es : des fleurs normales.'},
            ]),
        ],
        a_toi=[
            q('Le féminin de « curieux » est :', ['curieuse', 'curieuxe', 'curieusse'], '-eux devient -euse.'),
            q('Le masculin pluriel de « principal » est :', ['principaux', 'principals', 'principales'], '-al devient -aux.'),
            q('Le féminin de « premier » est :', ['première', 'premiere', 'premièr'], '-er devient -ère, avec un accent grave.'),
        ],
        sources=[ref('FR-C3-CM2-ORTH-05', 'Féminin et pluriel des adjectifs')]),

    'FR-C3-CM2-ECR-02': dict(duree=6, essentiel=
        'Comparer deux documents, c’est chercher leurs points communs, leurs différences, et ce qu’ils apportent chacun.\n'
        'On présente la comparaison dans un tableau, puis dans un texte court.\n'
        'Des mots aident à comparer : tous les deux, alors que, en revanche, de plus.',
        parties=[
            ('Organiser la comparaison', [
                {'type': 'tableau', 'titre': 'Une photo et un texte sur un volcan', 'colonnes': ['Critère', 'Photo', 'Texte'], 'lignes': [
                    ['ce qu’on apprend', 'la couleur de la lave, la fumée', 'la température de la lave, la date'], ['point commun', 'le même volcan', 'le même volcan']]},
                bq('Pour opposer deux documents, on peut écrire :', ['alors que', 'de plus', 'tous les deux'], 'Alors que marque une différence.'),
            ]),
            ('Rédiger', [
                {'type': 'methode', 'titre': 'Pour écrire la comparaison', 'etapes': [
                    'Présente les deux documents : nature, titre, auteur.', 'Écris leurs points communs.', 'Écris leurs différences.', 'Dis ce que l’un apporte à l’autre.']},
                {'type': 'piege', 'erreur': 'On décrit un document, puis l’autre, sans les relier.', 'correction': 'Comparer, c’est mettre les informations face à face.'},
            ]),
        ],
        a_toi=[
            q('Pour dire ce qu’ont les deux documents, on écrit :', ['tous les deux', 'en revanche', 'alors que'], 'Il annonce un point commun.'),
            q('Deux documents qui se complètent :', ['apportent chacun des informations différentes', 'disent exactement la même chose', 'se contredisent'], 'L’un ajoute à l’autre.'),
            q('Avant de comparer, on :', ['présente les deux documents', 'donne son avis', 'recopie le premier'], 'Nature, titre, auteur.'),
        ],
        sources=[ref('FR-C3-CM2-ECR-02', 'Écrire pour comparer deux documents')]),

    'FR-C3-CM2-LECT-04': dict(duree=6, essentiel=
        'Certains personnages sont si connus qu’ils servent de références.\n'
        'Un héros qui revient chez lui après un long voyage rappelle Ulysse, dans l’Odyssée d’Homère.\n'
        'Relier un texte à une autre œuvre aide à mieux le comprendre.',
        parties=[
            ('Des personnages célèbres', [
                {'type': 'tableau', 'titre': 'Quelques références', 'colonnes': ['Personnage', 'Œuvre', 'Ce qu’on retient'], 'lignes': [
                    ['Ulysse', 'l’Odyssée, Homère', 'un long voyage de retour, plein d’épreuves'], ['Robinson Crusoé', 'Daniel Defoe', 'un naufragé seul sur une ile'],
                    ['Phileas Fogg', 'Le Tour du monde en 80 jours, Jules Verne', 'un pari et une course contre la montre'], ['Pinocchio', 'Carlo Collodi', 'un pantin dont le nez s’allonge quand il ment']]},
                bq('Un naufragé qui survit seul sur une ile rappelle :', ['Robinson Crusoé', 'Pinocchio', 'Phileas Fogg'], 'C’est l’histoire de Daniel Defoe.'),
            ]),
            ('Faire des liens', [
                {'type': 'methode', 'titre': 'Pour relier deux œuvres', 'etapes': [
                    'Repère le personnage, le lieu, l’action.', 'Cherche une œuvre qui leur ressemble.', 'Dis ce qui est pareil et ce qui change.']},
                {'type': 'piege', 'erreur': 'On croit que deux histoires semblables sont identiques.', 'correction': 'Un auteur reprend souvent une idée connue pour raconter autre chose.'},
            ]),
        ],
        a_toi=[
            q('L’Odyssée a été écrite par :', ['Homère', 'Jules Verne', 'La Fontaine'], 'Un poète de la Grèce antique.'),
            q('Un pantin dont le nez s’allonge quand il ment :', ['Pinocchio', 'Ulysse', 'Robinson'], 'Le personnage de Carlo Collodi.'),
            q('Un pari pour faire le tour du monde en 80 jours :', ['Phileas Fogg', 'Ulysse', 'Pinocchio'], 'Le héros de Jules Verne.'),
        ],
        sources=[ref('FR-C3-CM2-LECT-04', 'Mettre en relation avec d’autres œuvres')]),

    'FR-C3-CM2-DICT-01': dict(duree=6, essentiel=
        'Avant d’écrire, j’écoute la phrase en entier.\n'
        'Je relis plusieurs fois, en cherchant une chose à la fois : les verbes, les groupes nominaux, les participes passés.\n'
        'Pour chaque participe passé, je regarde l’auxiliaire : être ou avoir.',
        parties=[
            ('Relire les participes passés', [
                {'type': 'methode', 'titre': 'Pour relire une dictée de CM2', 'etapes': [
                    'Relis pour le sens : il ne manque aucun mot.', 'Relis les verbes : trouve leur sujet, même inversé.',
                    'Relis les participes passés : être ou avoir ?', 'Relis les groupes nominaux : genre et nombre.']},
                {'type': 'piege', 'erreur': 'On accorde un participe passé avec avoir comme avec être.', 'correction': 'Avec avoir, on cherche le COD placé avant. Avec être, on accorde avec le sujet.'},
            ]),
            ('Un exemple', [
                {'type': 'exemple-resolu', 'enonce': 'Dictée : « Les hirondelles étaient revenues, et les enfants les avaient aperçues. »', 'etapes': [
                    'Revenues : auxiliaire être, sujet les hirondelles, féminin pluriel.', 'Aperçues : auxiliaire avoir, COD les, mis pour hirondelles, placé avant.'],
                 'conclusion': 'Les deux participes passés s’accordent au féminin pluriel.'},
                bq('« Les lettres que j’ai … » (écrire)', ['écrites', 'écrit', 'écrits'], 'Que remplace lettres, placé avant : féminin pluriel.'),
            ]),
        ],
        a_toi=[
            q('« Elles sont … tôt. » (partir)', ['parties', 'parti', 'partis'], 'Avec être : accord avec le sujet.'),
            q('« Ils ont … la porte. » (fermer)', ['fermé', 'fermés', 'fermée'], 'Le COD est après : pas d’accord.'),
            q('Quand tu relis un verbe, tu vérifies :', ['son accord avec le sujet', 'sa longueur', 'sa première lettre'], 'Le sujet commande le verbe.'),
        ],
        sources=[ref('FR-C3-CM2-DICT-01', 'Dictée et relecture')]),
}

ecrire(COURS)
