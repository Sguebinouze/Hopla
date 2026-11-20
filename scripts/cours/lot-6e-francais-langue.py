"""Lot de cours : français 6e, étude de la langue (grammaire, conjugaison, orthographe, vocabulaire).

    python3 scripts/cours/lot-6e-francais-langue.py

Cycle 3 : phrases de 20 mots au plus. Les pages des extraits sont retrouvées ensuite dans les PDF archivés.
"""
from commun import bq, ecrire, q, src, vocabulaire

BO = 'bo16-2025-francais-c3'

COURS = {
    'FR-C3-6E-GRAM-02': dict(duree=9, essentiel=
        'Une proposition est organisée autour d’un verbe conjugué.\n'
        'Une phrase simple a un seul verbe conjugué. Une phrase complexe en a plusieurs.\n'
        'Les propositions peuvent être juxtaposées (virgule), coordonnées (mais, et, car…) ou subordonnées (quand, parce que…).',
        parties=[
            ('Compter les propositions', [
                vocabulaire(3, 'Proposition'),
                {'type': 'observe', 'consigne': 'Compte les verbes conjugués.', 'exemples': [
                    '« Les élèves sortent. » : un verbe, une proposition.', '« Quand la cloche sonne, les élèves sortent. » : deux verbes, deux propositions.']},
                {'type': 'methode', 'titre': 'Phrase simple ou phrase complexe ?', 'etapes': [
                    'Souligne les verbes conjugués. Un infinitif ne compte pas.',
                    'Un seul verbe conjugué : phrase simple.',
                    'Plusieurs : phrase complexe, avec autant de propositions que de verbes conjugués.']},
                {'type': 'piege', 'erreur': '« Il veut partir » compte deux propositions.', 'correction': '« Partir » est à l’infinitif. Il n’y a qu’un verbe conjugué : c’est une phrase simple.'},
                bq('Combien de propositions dans « Le chien aboie, le chat s’enfuit et la poule caquette » ?', ['trois', 'deux', 'une'], 'Trois verbes conjugués : aboie, s’enfuit, caquette.'),
            ]),
            ('Relier les propositions', [
                {'type': 'tableau', 'titre': 'Trois façons de relier', 'colonnes': ['Mode', 'Outil', 'Exemple'], 'lignes': [
                    ['juxtaposition', 'une virgule, un point-virgule', 'Il pleut, je reste.'], ['coordination', 'mais, ou, et, donc, or, ni, car', 'Il pleut, donc je reste.'], ['subordination', 'quand, parce que, si, comme…', 'Je reste parce qu’il pleut.']]},
                {'type': 'explique', 'texte': 'Dans la subordination, une proposition dépend de l’autre. La **subordonnée** ne peut pas vivre seule : « parce qu’il pleut » n’est pas une phrase.'},
                bq('Dans « Je mange car j’ai faim », les propositions sont :', ['coordonnées', 'juxtaposées', 'subordonnées'], 'Car est une conjonction de coordination.'),
            ]),
        ],
        a_toi=[
            q('« Le soleil se lève sur la mer. » est une phrase :', ['simple', 'complexe', 'nominale'], 'Un seul verbe conjugué : se lève.'),
            q('« Lorsque tu arriveras, nous partirons. » Les propositions sont :', ['subordonnée et principale', 'juxtaposées', 'coordonnées'], 'Lorsque introduit une subordonnée.'),
            q('Combien de propositions dans « Elle ouvre la porte, regarde dehors et sourit » ?', ['trois', 'une', 'deux'], 'Ouvre, regarde, sourit.'),
        ],
        sources=[src(BO, 'Distinguer phrase simple et phrase complexe à partir du repérage des propositions', 'Phrase simple et complexe'),
                 src(BO, 'Comprendre la notion de proposition', 'Notion de proposition')]),

    'FR-C3-6E-GRAM-03': dict(duree=8, essentiel=
        'Les conjonctions de coordination sont : mais, ou, et, donc, or, ni, car.\n'
        'Elles relient deux éléments de même rang, qui pourraient exister seuls.\n'
        'Les conjonctions de subordination (quand, parce que, si, comme, lorsque, que…) introduisent une proposition qui dépend d’une autre.',
        parties=[
            ('Coordination', [
                vocabulaire(3, 'Conjonction de coordination'),
                {'type': 'observe', 'consigne': 'Supprime la conjonction : chaque partie tient-elle seule ?', 'exemples': [
                    '« Il pleut, mais je sors. » → « Il pleut. » / « Je sors. »', 'Les deux propositions restent des phrases : elles sont de même rang.']},
                {'type': 'explique', 'texte': 'Pour retenir la liste : **mais, ou, et, donc, or, ni, car**.'},
                bq('Quel mot est une conjonction de coordination ?', ['donc', 'quand', 'parce que'], 'Donc fait partie de la liste.'),
            ]),
            ('Subordination', [
                vocabulaire(3, 'Conjonction de subordination'),
                {'type': 'observe', 'consigne': 'Supprime la partie introduite par « parce que ».', 'exemples': [
                    '« Je reste parce qu’il pleut. » → « Je reste. » tient seule.', '« Parce qu’il pleut. » ne tient pas seule : c’est une subordonnée.']},
                {'type': 'tableau', 'titre': 'Même sens, deux constructions', 'colonnes': ['Conjonction', 'Type', 'Exemple'], 'lignes': [
                    ['car', 'coordination', 'Je reste, car il pleut.'], ['parce que', 'subordination', 'Je reste parce qu’il pleut.']]},
                {'type': 'piege', 'erreur': 'On croit que « car » et « parce que » ont le même rôle grammatical.', 'correction': 'Le sens est proche, la construction diffère : car coordonne, parce que subordonne.'},
                bq('Dans « Si tu veux, nous jouerons », « si » est :', ['une conjonction de subordination', 'une conjonction de coordination', 'un adverbe'], 'Si introduit une proposition qui dépend de la principale.'),
            ]),
        ],
        a_toi=[
            q('Quelle conjonction n’est pas de coordination ?', ['lorsque', 'or', 'ni'], 'Lorsque introduit une subordonnée.'),
            q('Dans « Il est fatigué, donc il se couche », « donc » est :', ['une conjonction de coordination', 'une conjonction de subordination', 'un verbe'], 'Donc est dans la liste mais, ou, et, donc, or, ni, car.'),
            q('Quelle phrase contient une subordonnée ?', ['Je sais que tu viendras.', 'Tu viens et je pars.', 'Viens, je pars.'], 'Que introduit une proposition subordonnée.'),
        ],
        sources=[src(BO, 'Distinguer le rôle de la conjonction de coordination et celui de la conjonction de subordination', 'Conjonctions'),
                 src(BO, 'Approfondir les notions de juxtaposition, de coordination, de subordination', 'Juxtaposition, coordination, subordination')]),

    'FR-C3-6E-GRAM-04': dict(duree=8, essentiel=
        'Un pronom personnel remplace un nom ou un groupe nominal : son antécédent.\n'
        'Le, la, l’, les sont COD. Lui, leur sont COI (à quelqu’un).\n'
        'Pour trouver l’antécédent, je remplace le pronom par le groupe nominal et je vérifie le sens.',
        parties=[
            ('Pronom et antécédent', [
                vocabulaire(3, 'Antécédent'),
                {'type': 'observe', 'consigne': 'Lis : « Le roi parla à ses soldats et leur donna des ordres. »', 'exemples': [
                    '« leur » reprend « à ses soldats ».', 'On vérifie : le roi donna des ordres à ses soldats.']},
                bq('« Léa a perdu sa clé. Elle la cherche. » Que remplace « la » ?', ['sa clé', 'Léa', 'elle'], 'Elle cherche sa clé.'),
            ]),
            ('La fonction du pronom', [
                {'type': 'tableau', 'titre': 'Pronoms personnels et fonctions', 'colonnes': ['Fonction', 'Pronoms', 'Exemple'], 'lignes': [
                    ['sujet', 'je, tu, il, elle, on, nous, vous, ils, elles', 'Ils partent.'], ['COD', 'me, te, le, la, l’, nous, vous, les', 'Je les vois.'], ['COI', 'me, te, lui, nous, vous, leur', 'Je leur parle.']]},
                {'type': 'methode', 'titre': 'Pour trouver la fonction d’un pronom', 'etapes': [
                    'Remplace le pronom par son antécédent.',
                    'Pose la question : qui ? quoi ? à qui ?',
                    'Qui fait l’action : sujet. Quoi ou qui après le verbe : COD. À qui : COI.']},
                {'type': 'piege', 'erreur': 'On ajoute un s à « leur » devant un verbe : je leurs parle.', 'correction': 'Le pronom leur est invariable : je leur parle.'},
                bq('Dans « Je lui écris », la fonction de « lui » est :', ['COI', 'COD', 'sujet'], 'J’écris à quelqu’un : lui est COI.'),
            ]),
        ],
        a_toi=[
            q('« Les enfants ont vu les cygnes et les ont nourris. » Que remplace le second « les » ?', ['les cygnes', 'les enfants', 'nourris'], 'Ils ont nourri les cygnes.'),
            q('Dans « Nous la regardons », « la » est :', ['COD', 'COI', 'sujet'], 'Nous regardons quoi ? La : COD.'),
            q('Quelle phrase est correcte ?', ['Je leur ai dit bonjour.', 'Je leurs ai dit bonjour.', 'Je leurent ai dit bonjour.'], 'Leur pronom ne prend jamais de s.'),
        ],
        sources=[src(BO, 'Mettre en relation un pronom personnel avec son antécédent', 'Pronom et antécédent'),
                 src(BO, 'Identifier aisément les pronoms personnels et préciser leur fonction', 'Fonction des pronoms')]),

    'FR-C3-6E-GRAM-05': dict(duree=8, essentiel=
        'L’adjectif épithète est placé à côté du nom et s’accorde avec lui : une robe rouge.\n'
        'Le complément du nom est un groupe nominal introduit par une préposition : une robe de soirée.\n'
        'Les deux précisent le nom, et on peut les supprimer.',
        parties=[
            ('L’épithète', [
                vocabulaire(3, 'Épithète'),
                {'type': 'observe', 'consigne': 'Observe le groupe nominal.', 'exemples': [
                    'une petite maison blanche', '« petite » et « blanche » sont des adjectifs épithètes.', 'Ils s’accordent avec maison : féminin singulier.']},
                bq('Dans « un vieux château », « vieux » est :', ['épithète', 'complément du nom', 'attribut'], 'Adjectif placé à côté du nom.'),
            ]),
            ('Le complément du nom', [
                vocabulaire(3, 'Complément du nom'),
                {'type': 'tableau', 'titre': 'Comparer', 'colonnes': ['Groupe nominal', 'Expansion', 'Fonction'], 'lignes': [
                    ['une robe rouge', 'rouge (adjectif)', 'épithète'], ['une robe de soirée', 'de soirée (préposition + nom)', 'complément du nom'], ['un verre à pied', 'à pied', 'complément du nom']]},
                {'type': 'methode', 'titre': 'Pour distinguer', 'etapes': [
                    'Regarde la nature du mot : adjectif ou groupe nominal ?',
                    'Cherche une préposition devant : de, à, en, sans, pour…',
                    'Adjectif seul : épithète. Préposition + nom : complément du nom.']},
                {'type': 'piege', 'erreur': 'On prend « de soirée » pour un adjectif épithète.', 'correction': 'Soirée est un nom, introduit par la préposition de : c’est un complément du nom.'},
                bq('Dans « une tasse en porcelaine », « en porcelaine » est :', ['complément du nom', 'épithète', 'COD'], 'Préposition en + nom.'),
            ]),
        ],
        a_toi=[
            q('Dans « des chaussures de sport neuves », « neuves » est :', ['épithète', 'complément du nom', 'COD'], 'Adjectif accordé avec chaussures.'),
            q('Dans « un moulin à vent », « à vent » est :', ['complément du nom', 'épithète', 'attribut'], 'Préposition à + nom vent.'),
            q('Quel groupe contient un complément du nom ?', ['la porte du jardin', 'la porte verte', 'la grande porte'], 'Du = de + le : préposition + nom.'),
        ],
        sources=[src(BO, 'Identifier et différencier sans ambigüité adjectif/groupe adjectival de fonction épithète et groupe nominal prépositionnel de', 'Épithète et complément du nom')]),

    'FR-C3-6E-CONJ-01': dict(duree=8, essentiel=
        'L’impératif sert à donner un ordre, un conseil ou une consigne.\n'
        'Il n’a que trois personnes et pas de sujet : chante, chantons, chantez.\n'
        'Les verbes en -er ne prennent pas de s à la 2e personne du singulier : chante, va.',
        parties=[
            ('Former l’impératif', [
                {'type': 'tableau', 'titre': 'Impératif présent', 'colonnes': ['Verbe', '2e sing.', '1re plur.', '2e plur.'], 'lignes': [
                    ['chanter', 'chante', 'chantons', 'chantez'], ['finir', 'finis', 'finissons', 'finissez'], ['prendre', 'prends', 'prenons', 'prenez'],
                    ['être', 'sois', 'soyons', 'soyez'], ['avoir', 'aie', 'ayons', 'ayez'], ['aller', 'va', 'allons', 'allez'], ['faire', 'fais', 'faisons', 'faites'], ['dire', 'dis', 'disons', 'dites']]},
                {'type': 'explique', 'texte': 'L’impératif se forme comme le présent de l’indicatif, sans sujet. Mais les verbes en -er perdent leur s : tu chantes devient **chante**.'},
                bq('Impératif de « finir » à la 2e personne du pluriel ?', ['finissez', 'finisez', 'finirez'], 'Vous finissez → finissez.'),
            ]),
            ('Pièges', [
                {'type': 'piege', 'erreur': 'On écrit « Manges ta soupe ».', 'correction': 'Verbe en -er : pas de s. Mange ta soupe.'},
                {'type': 'explique', 'texte': 'Devant en et y, on ajoute un s pour faire la liaison : **vas-y**, **manges-en**.'},
                {'type': 'methode', 'titre': 'Pour reconnaitre l’impératif', 'etapes': [
                    'Cherche le sujet : il n’y en a pas.',
                    'Vérifie la personne : tu, nous ou vous.',
                    'Le sens : ordre, conseil, consigne.']},
                bq('Quelle forme est correcte ?', ['Va au tableau.', 'Vas au tableau.', 'Vat au tableau.'], 'Aller fait va à l’impératif.'),
            ]),
        ],
        a_toi=[
            q('Impératif de « être » à la 2e personne du pluriel ?', ['soyez', 'êtes', 'soyiez'], 'Être : sois, soyons, soyez.'),
            q('Impératif de « regarder », 2e personne du singulier ?', ['regarde', 'regardes', 'regardez'], 'Pas de s pour un verbe en -er.'),
            q('Quelle phrase est à l’impératif ?', ['Prenez vos cahiers.', 'Vous prenez vos cahiers.', 'Prendrez-vous vos cahiers ?'], 'Pas de sujet : impératif.'),
        ],
        sources=[src(BO, 'Conjugaisons à mémoriser et à maîtriser : impératif présent, conditionnel présent des verbes être et avoir, des verbes des', 'Impératif présent'),
                 src(BO, 'Identifier les marques de temps pour le conditionnel présent et l’impératif présent', 'Marques de l’impératif')]),

    'FR-C3-6E-CONJ-02': dict(duree=9, essentiel=
        'Le conditionnel présent exprime un souhait, une demande polie ou un fait imaginé.\n'
        'On prend le radical du futur et on ajoute les terminaisons de l’imparfait : -ais, -ais, -ait, -ions, -iez, -aient.\n'
        'Je chanterais, nous irions, ils prendraient.',
        parties=[
            ('Former le conditionnel', [
                {'type': 'observe', 'consigne': 'Compare futur et conditionnel.', 'exemples': [
                    'Futur : je chanterai.', 'Conditionnel : je chanterais.', 'Même radical chanter-, terminaison de l’imparfait.']},
                {'type': 'tableau', 'titre': 'Conditionnel présent', 'colonnes': ['Sujet', 'chanter', 'être', 'avoir', 'aller'], 'lignes': [
                    ['je', 'chanterais', 'serais', 'aurais', 'irais'], ['tu', 'chanterais', 'serais', 'aurais', 'irais'], ['il, elle, on', 'chanterait', 'serait', 'aurait', 'irait'],
                    ['nous', 'chanterions', 'serions', 'aurions', 'irions'], ['vous', 'chanteriez', 'seriez', 'auriez', 'iriez'], ['ils, elles', 'chanteraient', 'seraient', 'auraient', 'iraient']]},
                {'type': 'tableau', 'titre': 'Radicaux irréguliers', 'colonnes': ['Verbe', 'Conditionnel'], 'lignes': [
                    ['faire', 'je ferais'], ['venir', 'je viendrais'], ['pouvoir', 'je pourrais'], ['voir', 'je verrais'], ['vouloir', 'je voudrais'], ['dire', 'je dirais'], ['prendre', 'je prendrais']]},
            ]),
            ('Futur ou conditionnel ?', [
                {'type': 'methode', 'titre': 'Pour choisir entre -rai et -rais', 'etapes': [
                    'Remplace « je » par « nous ».',
                    'Nous chanterons : c’est le futur, on écrit -rai.',
                    'Nous chanterions : c’est le conditionnel, on écrit -rais.']},
                {'type': 'piege', 'erreur': '« Si j’étais riche, j’achèterai un bateau. »', 'correction': 'C’est une situation imaginée : j’achèterais (nous achèterions).'},
                bq('Complète : je … bien un gâteau.', ['mangerais', 'mangerai', 'mangeais'], 'Souhait : nous mangerions → conditionnel.'),
            ]),
        ],
        a_toi=[
            q('Conditionnel de « pouvoir » avec « vous » ?', ['vous pourriez', 'vous pourrez', 'vous pouviez'], 'Radical pourr- + -iez.'),
            q('« Pourriez-vous m’aider ? » exprime :', ['une demande polie', 'une action passée', 'un ordre'], 'Le conditionnel adoucit la demande.'),
            q('Complète : s’il faisait beau, nous … à la plage.', ['irions', 'irons', 'allions'], 'Situation imaginée : conditionnel.'),
        ],
        sources=[src(BO, 'Identifier les marques de temps pour le conditionnel présent et l’impératif présent', 'Marques du conditionnel'),
                 src(BO, 'premier et deuxième groupes, des verbes irréguliers du troisième groupe : faire, aller, dire, venir, pouvoir, voir, vouloir, prendre', 'Verbes à conjuguer')]),

    'FR-C3-6E-CONJ-03': dict(duree=9, essentiel=
        'Dans un récit au passé, l’imparfait sert au décor, aux descriptions et aux habitudes.\n'
        'Le passé simple sert aux actions de premier plan, qui font avancer l’histoire.\n'
        'Le présent peut exprimer une vérité générale ou rendre un récit plus vivant.',
        parties=[
            ('Imparfait et passé simple', [
                {'type': 'observe', 'consigne': 'Lis : « Il pleuvait depuis le matin quand le chevalier arriva au château. »', 'exemples': [
                    '« pleuvait » : imparfait, le décor, une action longue.', '« arriva » : passé simple, une action brève qui fait avancer le récit.']},
                {'type': 'tableau', 'titre': 'Valeurs des temps du récit', 'colonnes': ['Temps', 'Valeur', 'Exemple'], 'lignes': [
                    ['imparfait', 'description, décor', 'La forêt était sombre.'], ['imparfait', 'habitude', 'Chaque soir, il lisait.'], ['passé simple', 'action ponctuelle de premier plan', 'Soudain, il ouvrit la porte.']]},
                {'type': 'methode', 'titre': 'Pour choisir le temps', 'etapes': [
                    'L’action fait-elle avancer l’histoire ? Passé simple.',
                    'Décrit-elle le décor, un personnage, une habitude ? Imparfait.',
                    'Les mots soudain, tout à coup annoncent souvent le passé simple.']},
                bq('« Le vent soufflait. Tout à coup, une porte claqua. » « claqua » exprime :', ['une action soudaine', 'une description', 'une habitude'], 'Tout à coup : action ponctuelle.'),
            ]),
            ('Les valeurs du présent', [
                {'type': 'tableau', 'titre': 'Le présent', 'colonnes': ['Valeur', 'Exemple'], 'lignes': [
                    ['ce qui se passe maintenant', 'Je lis ce cours.'], ['vérité générale', 'La Terre tourne autour du Soleil.'], ['présent de narration', 'Il avance. Soudain, un loup surgit !']]},
                {'type': 'piege', 'erreur': 'On mélange présent et passé simple dans le même récit.', 'correction': 'On choisit un système de temps et on le garde : présent, ou imparfait et passé simple.'},
            ]),
        ],
        a_toi=[
            q('« Chaque été, nous allions à la mer. » L’imparfait exprime :', ['une habitude', 'une action soudaine', 'une vérité générale'], 'Chaque été : action répétée.'),
            q('« L’eau bout à 100 °C. » Ce présent exprime :', ['une vérité générale', 'une action passée', 'un ordre'], 'C’est toujours vrai.'),
            q('Quel temps convient ? « Le loup … sur la chèvre. »', ['se jeta', 'se jetait', 'se jettera'], 'Action brève de premier plan : passé simple.'),
        ],
        sources=[src(BO, 'Initier à la notion de valeurs des temps par observation, comparaison, opposition de phrases et textes rencontrés : des temps', 'Valeurs des temps')]),

    'FR-C3-6E-ORTH-01': dict(duree=8, essentiel=
        'Avec l’auxiliaire être, le participe passé s’accorde en genre et en nombre avec le sujet.\n'
        'Elle est partie. Ils sont partis. Elles sont parties.\n'
        'Si les sujets sont masculin et féminin, on accorde au masculin pluriel : Tom et Léa sont arrivés.',
        parties=[
            ('Accorder avec le sujet', [
                vocabulaire(3, 'Participe passé', 'Auxiliaire'),
                {'type': 'observe', 'consigne': 'Compare.', 'exemples': [
                    'Le train est parti.', 'La voiture est partie.', 'Les trains sont partis.', 'Les voitures sont parties.']},
                {'type': 'methode', 'titre': 'Pour accorder le participe passé avec être', 'etapes': [
                    'Repère l’auxiliaire être : est, sont, était, sera…',
                    'Trouve le sujet : qui est-ce qui est parti ?',
                    'Accorde : + e au féminin, + s au pluriel.']},
                bq('Complète : mes sœurs sont …', ['arrivées', 'arrivés', 'arrivé'], 'Sujet féminin pluriel : -ées.'),
            ]),
            ('Cas particuliers', [
                {'type': 'piege', 'erreur': 'On accorde avec le mot le plus proche : la mère et le fils sont venue.', 'correction': 'Sujets de genres différents : masculin pluriel, venus.'},
                {'type': 'explique', 'texte': 'Pour entendre l’accord, remplace par un verbe comme prendre. Elle est **prise** : on entend le e, donc elle est **partie**.'},
                bq('Complète : Nina et Paul sont …', ['tombés', 'tombées', 'tombé'], 'Un garçon et une fille : masculin pluriel.'),
            ]),
        ],
        a_toi=[
            q('Complète : la neige est …', ['tombée', 'tombé', 'tombés'], 'La neige : féminin singulier.'),
            q('Complète : les enfants sont …', ['sortis', 'sorti', 'sorties'], 'Les enfants : masculin pluriel.'),
            q('Quelle phrase est correcte ?', ['Les fleurs sont fanées.', 'Les fleurs sont fané.', 'Les fleurs sont fanés.'], 'Féminin pluriel : fanées.'),
        ],
        sources=[src(BO, 'Maîtriser l’accord du participe passé employé avec l’auxiliaire être', 'Participe passé avec être')]),

    'FR-C3-6E-ORTH-02': dict(duree=9, essentiel=
        'Des homophones se prononcent pareil mais n’ont ni la même nature ni la même orthographe.\n'
        'Pour choisir, on remplace : a par avait, est par était, sont par étaient, ont par avaient.\n'
        'Ces = ceux-ci ; ses = les siens. Où indique le lieu ; ou = ou bien.',
        parties=[
            ('Les verbes et les autres mots', [
                vocabulaire(3, 'Homophones'),
                {'type': 'tableau', 'titre': 'Remplacer pour choisir', 'colonnes': ['Homophones', 'Astuce', 'Exemple'], 'lignes': [
                    ['a / à', 'a → avait', 'Il a faim. Il va à l’école.'], ['est / et', 'est → était', 'Le ciel est bleu et calme.'],
                    ['sont / son', 'sont → étaient', 'Ils sont là avec son chien.'], ['ont / on', 'ont → avaient ; on → il', 'Ils ont froid. On rentre.'],
                    ['ces / ses', 'ces → ceux-ci ; ses → les siens', 'Ces livres sont à lui : ce sont ses livres.'], ['ou / où', 'ou → ou bien', 'Tu viens ou pas ? Où vas-tu ?'], ['ce / se', 'se devant un verbe pronominal', 'Ce chat se lave.']]},
                bq('Complète : il … parti … la plage.', ['est, à', 'et, a', 'est, a'], 'Il était parti (est), vers la plage (à).'),
            ]),
            ('S’entrainer à raisonner', [
                {'type': 'methode', 'titre': 'Pour choisir le bon homophone', 'etapes': [
                    'Repère le mot douteux dans la phrase.',
                    'Essaie la substitution : avait, était, étaient, avaient, ou bien.',
                    'Si la phrase garde son sens, c’est le verbe ou le mot testé.']},
                {'type': 'piege', 'erreur': '« Ils on gagné. »', 'correction': 'Ils avaient gagné : c’est le verbe avoir, ils ont gagné.'},
                bq('Complète : … amis viennent avec … parents.', ['Ses, leurs', 'Ces, leurs', 'Ses, leur'], 'Les siens : ses. Les parents d’eux : leurs.'),
            ]),
        ],
        a_toi=[
            q('Complète : … vas-tu ?', ['Où', 'Ou', 'Oû'], 'Question sur le lieu.'),
            q('Complète : les élèves … fini leur travail.', ['ont', 'on', 'onts'], 'Les élèves avaient fini : ont.'),
            q('Complète : Léo … Max … partis.', ['et, sont', 'est, son', 'et, son'], 'Léo et Max étaient partis.'),
        ],
        sources=[src(BO, 'Améliorer son orthographe grammaticale dans le cadre de la production d’écrits ou d’exercices d’entraînement', 'Orthographe grammaticale')]),

    'FR-C3-6E-ORTH-03': dict(duree=6, essentiel=
        'Les mots invariables ne changent jamais : ni genre, ni nombre, ni conjugaison.\n'
        'On les apprend par cœur, par familles : parmi, malgré, désormais, autrefois, néanmoins, longtemps, beaucoup, toujours.\n'
        'Beaucoup de mots en -ment sont des adverbes invariables.',
        parties=[
            ('Des mots à connaitre', [
                {'type': 'tableau', 'titre': 'Mots invariables fréquents', 'colonnes': ['Sens', 'Mots'], 'lignes': [
                    ['temps', 'autrefois, désormais, longtemps, toujours, aussitôt, bientôt, jamais'], ['lieu', 'ailleurs, dehors, partout, parmi'], ['quantité', 'beaucoup, trop, assez, davantage'], ['opposition', 'malgré, néanmoins, pourtant, cependant']]},
                {'type': 'explique', 'texte': 'Certains se ressemblent : aussitôt, bientôt, plutôt, tôt prennent tous un **ô**.'},
                bq('Comment s’écrit le mot ?', ['malgré', 'malgrés', 'malgrè'], 'Malgré : invariable, accent aigu.'),
            ]),
            ('Pièges fréquents', [
                {'type': 'piege', 'erreur': 'On écrit « parmis » ou « toujour ».', 'correction': 'Parmi n’a pas de s. Toujours en a toujours un.'},
                {'type': 'methode', 'titre': 'Pour mémoriser', 'etapes': [
                    'Regroupe les mots par famille de sons : tôt, bientôt, aussitôt.',
                    'Repère la lettre difficile.',
                    'Écris-les dans une phrase à toi.']},
            ]),
        ],
        a_toi=[
            q('Quelle orthographe est correcte ?', ['désormais', 'dorénavent', 'désormait'], 'Désormais se termine par -ais.'),
            q('Quelle orthographe est correcte ?', ['longtemps', 'longtemp', 'lontemps'], 'Longtemps : g et ps.'),
            q('Quel mot est invariable ?', ['ailleurs', 'ailés', 'aimable'], 'Ailleurs est un adverbe.'),
        ],
        sources=[src(BO, 'Écrire correctement les mots fréquents en situation autonome', 'Mots fréquents')]),

    'FR-C3-6E-ORTH-04': dict(duree=8, essentiel=
        'Le verbe s’accorde avec le noyau du groupe sujet, même éloigné ou placé après lui.\n'
        'Plusieurs sujets : le verbe est au pluriel.\n'
        'Avec « qui », le verbe s’accorde avec l’antécédent : les enfants qui jouent ; c’est moi qui suis.',
        parties=[
            ('Sujet inversé ou éloigné', [
                {'type': 'observe', 'consigne': 'Trouve le sujet.', 'exemples': [
                    '« Dans la forêt vivent des loups. » Qui vit ? des loups : sujet inversé.', '« Les chiens de mon voisin aboient. » Qui aboie ? les chiens, pas mon voisin.']},
                {'type': 'methode', 'titre': 'Pour trouver le sujet', 'etapes': [
                    'Pose la question « qui est-ce qui ? » devant le verbe.',
                    'Encadre la réponse par « c’est… qui » : ce sont des loups qui vivent.',
                    'Repère le nom noyau du groupe et accorde avec lui.']},
                bq('Complète : les feuilles de l’arbre …', ['tombent', 'tombe', 'tombes'], 'Le noyau est feuilles : pluriel.'),
            ]),
            ('Plusieurs sujets et « qui »', [
                {'type': 'explique', 'texte': 'Avec plusieurs sujets, le verbe est au pluriel : le chat et le chien **dorment**. Avec toi et moi, on accorde avec nous : toi et moi **partons**.'},
                {'type': 'piege', 'erreur': '« C’est moi qui est le plus grand. »', 'correction': 'Qui reprend moi : c’est moi qui suis le plus grand.'},
                bq('Complète : ce sont mes amis qui …', ['chantent', 'chante', 'chantes'], 'Qui reprend mes amis : pluriel.'),
            ]),
        ],
        a_toi=[
            q('Complète : au loin … les cloches.', ['sonnent', 'sonne', 'sonnes'], 'Sujet inversé : les cloches.'),
            q('Complète : ma sœur et moi … au cinéma.', ['allons', 'vont', 'va'], 'Ma sœur et moi = nous.'),
            q('Complète : c’est toi qui … raison.', ['as', 'a', 'ont'], 'Qui reprend toi : tu as.'),
        ],
        sources=[src(BO, 'Identifier le groupe sujet et raisonner sur l’accord sujet/verbe', 'Accord sujet-verbe')]),

    'FR-C3-6E-ORTH-05': dict(duree=8, essentiel=
        'Avec l’auxiliaire avoir, le participe passé ne s’accorde jamais avec le sujet.\n'
        'Il s’accorde avec le COD si celui-ci est placé avant le verbe : « Ces fleurs, je les ai cueillies. »\n'
        'Si le COD est après, pas d’accord : j’ai cueilli des fleurs.',
        parties=[
            ('Où est le COD ?', [
                {'type': 'observe', 'consigne': 'Compare.', 'exemples': [
                    'J’ai cueilli des fleurs. → COD après : cueilli.', 'Je les ai cueillies. → les = les fleurs, placé avant : cueillies.']},
                {'type': 'methode', 'titre': 'Pour accorder le participe passé avec avoir', 'etapes': [
                    'Pose la question « quoi ? » après le participe : j’ai cueilli quoi ?',
                    'Le COD est-il avant le verbe ? Le plus souvent, c’est un pronom : l’, la, les.',
                    'Si oui, accorde avec ce COD. Sinon, n’accorde pas.']},
                bq('Complète : ces lettres, je les ai …', ['écrites', 'écrit', 'écrits'], 'Les = ces lettres, féminin pluriel, placé avant.'),
            ]),
            ('Pièges', [
                {'type': 'piege', 'erreur': '« Elles ont mangées. »', 'correction': 'Avec avoir, jamais d’accord avec le sujet : elles ont mangé.'},
                {'type': 'exemple-resolu', 'enonce': 'La robe ? Ma tante l’a cousue.', 'etapes': [
                    'L’ reprend la robe : féminin singulier.', 'Le COD est avant l’auxiliaire avoir.'],
                 'conclusion': 'On écrit cousue.'},
            ]),
        ],
        a_toi=[
            q('Complète : les gâteaux, nous les avons …', ['mangés', 'mangé', 'mangées'], 'Les = les gâteaux, masculin pluriel, avant.'),
            q('Complète : Léa a … une histoire.', ['raconté', 'racontée', 'racontés'], 'COD après le verbe : pas d’accord.'),
            q('Complète : ta chanson, je l’ai …', ['entendue', 'entendu', 'entendues'], 'L’ = ta chanson, féminin singulier.'),
        ],
        sources=[src(BO, 'Accorder le participe passé avec le complément d’objet direct (COD) pour les verbes étudiés et conjugués avec l’auxiliaire', 'Participe passé avec avoir')]),

    'FR-C3-6E-ORTH-06': dict(duree=7, essentiel=
        'Dans le groupe nominal, le déterminant et les adjectifs s’accordent avec le nom noyau.\n'
        'Les adjectifs éloignés aussi : de vieilles maisons blanches aux volets bleus.\n'
        'Je cherche le nom noyau, son genre et son nombre, puis j’accorde chaque mot qui en dépend.',
        parties=[
            ('La chaine d’accords', [
                {'type': 'observe', 'consigne': 'Repère les accords.', 'exemples': [
                    'de vieilles maisons blanches aux volets bleus', 'vieilles et blanches → maisons : féminin pluriel.', 'bleus → volets : masculin pluriel.']},
                {'type': 'methode', 'titre': 'Pour accorder un groupe nominal', 'etapes': [
                    'Trouve chaque nom noyau.',
                    'Relie chaque adjectif à son nom, même s’il est loin.',
                    'Accorde en genre et en nombre.']},
                bq('Complète : des chemins … et …', ['étroits, sinueux', 'étroites, sinueuses', 'étroit, sinueux'], 'Chemins : masculin pluriel.'),
            ]),
            ('Cas délicats', [
                {'type': 'piege', 'erreur': '« Une veste et un pantalon noir » quand les deux sont noirs.', 'correction': 'L’adjectif qui qualifie deux noms se met au pluriel, au masculin s’ils sont de genres différents : noirs.'},
                {'type': 'explique', 'texte': 'Les adjectifs de couleur tirés d’un nom ne s’accordent pas : des yeux **marron**, des robes **orange**.'},
                bq('Quel groupe est bien accordé ?', ['des chaussettes marron', 'des chaussettes marrons', 'des chaussette marron'], 'Marron est un nom employé comme adjectif.'),
            ]),
        ],
        a_toi=[
            q('Complète : de … nuits …', ['longues, froides', 'longs, froids', 'longue, froide'], 'Nuits : féminin pluriel.'),
            q('Complète : une table et une chaise …', ['neuves', 'neufs', 'neuve'], 'Deux noms féminins : féminin pluriel.'),
            q('Quel groupe est bien accordé ?', ['les grandes voiles blanches du navire', 'les grandes voile blanche du navire', 'les grands voiles blancs du navire'], 'Voile de bateau est féminin.'),
        ],
        sources=[src(BO, 'Maîtriser la chaîne d’accords dans le groupe nominal, en lien avec l’analyse grammaticale', 'Chaîne d’accords')]),

    'FR-C3-6E-VOC-01': dict(duree=6, essentiel=
        'Un antonyme est un mot de sens contraire, de la même classe grammaticale.\n'
        'Rapide (adjectif) → lent (adjectif). Rapidement (adverbe) → lentement (adverbe).\n'
        'Un synonyme a un sens proche, lui aussi de la même classe.',
        parties=[
            ('Respecter la classe du mot', [
                vocabulaire(3, 'Antonyme', 'Synonyme'),
                {'type': 'tableau', 'titre': 'Antonymes de même classe', 'colonnes': ['Mot', 'Classe', 'Antonyme'], 'lignes': [
                    ['monter', 'verbe', 'descendre'], ['la joie', 'nom', 'la tristesse'], ['généreux', 'adjectif', 'avare'], ['souvent', 'adverbe', 'rarement']]},
                {'type': 'piege', 'erreur': 'Le contraire de « rapide » serait « lentement ».', 'correction': 'Rapide est un adjectif, lentement un adverbe. L’antonyme est lent.'},
                bq('Antonyme de « la victoire » ?', ['la défaite', 'perdre', 'vaincu'], 'Un nom pour un nom.'),
            ]),
            ('Former un antonyme', [
                {'type': 'explique', 'texte': 'Certains antonymes se forment avec un préfixe : **in-** (inutile), **im-** (impossible), **dés-** (désordre), **mal-** (malhonnête).'},
                bq('Antonyme de « honnête » ?', ['malhonnête', 'inhonnête', 'déshonnête'], 'Le préfixe mal- forme ce contraire.'),
            ]),
        ],
        a_toi=[
            q('Antonyme de « accepter » ?', ['refuser', 'refus', 'accord'], 'Un verbe pour un verbe.'),
            q('Synonyme de « effrayé » ?', ['apeuré', 'peur', 'effrayer'], 'Un adjectif pour un adjectif.'),
            q('Antonyme de « légal » ?', ['illégal', 'inlégal', 'délégal'], 'Devant l, in- devient il-.'),
        ],
        sources=[src(BO, 'Donner des exemples de synonymes et d’antonymes qui respectent la classe grammaticale du mot cible', 'Synonymes et antonymes')]),

    'FR-C3-6E-VOC-02': dict(duree=7, essentiel=
        'Face à un mot inconnu, j’ai trois stratégies.\n'
        'Déduire le sens grâce au contexte ; analyser sa formation (radical, préfixe, suffixe) ; vérifier dans le dictionnaire.\n'
        'Je choisis la stratégie la plus efficace, puis je vérifie que le sens trouvé convient à la phrase.',
        parties=[
            ('Trois stratégies', [
                {'type': 'tableau', 'titre': 'Comprendre un mot inconnu', 'colonnes': ['Stratégie', 'Exemple'], 'lignes': [
                    ['le contexte', '« Affamé, il dévora son repas en un instant. » Dévorer : manger très vite.'], ['la formation du mot', 'Incassable : in- (pas) + cass- + -able (qui peut) : qui ne peut pas casser.'], ['le dictionnaire', 'Pour vérifier, ou quand les deux autres ne suffisent pas.']]},
                bq('« Le chemin était si étroit qu’on y passait à peine. » « étroit » veut dire :', ['peu large', 'très long', 'en pente'], 'On y passait à peine : il est peu large.'),
            ]),
            ('Choisir et vérifier', [
                {'type': 'methode', 'titre': 'Devant un mot inconnu', 'etapes': [
                    'Relis la phrase et celle d’avant : le contexte aide-t-il ?',
                    'Cherche un mot connu à l’intérieur.',
                    'Propose un sens, remplace le mot et relis.',
                    'Vérifie dans le dictionnaire, en choisissant le sens qui convient.']},
                {'type': 'piege', 'erreur': 'On prend la première définition du dictionnaire.', 'correction': 'Un mot a souvent plusieurs sens. Choisis celui qui convient à la phrase.'},
                {'type': 'exemple-resolu', 'enonce': '« Le chat est nyctalope. »', 'etapes': [
                    'Nyct- vient du grec : la nuit.', '-ope vient d’un mot grec lié à la vue.'],
                 'conclusion': 'Un nyctalope voit la nuit.'},
            ]),
        ],
        a_toi=[
            q('« Impardonnable » veut dire :', ['qu’on ne peut pas pardonner', 'qu’on pardonne vite', 'qui pardonne'], 'Im- (pas) + pardonn- + -able.'),
            q('Quelle stratégie utiliser en premier pour un mot dans un texte ?', ['relire le contexte', 'sauter le mot', 'demander la réponse'], 'Le contexte donne souvent la clé.'),
            q('Dans « une mine de crayon », « mine » désigne :', ['la pointe qui écrit', 'un visage', 'un lieu d’extraction'], 'Le contexte choisit le sens.'),
        ],
        sources=[src(BO, 'Choisir, de manière autonome, les stratégies les plus efficaces pour comprendre un mot inconnu en prenant l’initiative de', 'Stratégies face au mot inconnu')]),

    'FR-C3-6E-VOC-03': dict(duree=7, essentiel=
        'Un mot simple ne peut pas être découpé : terre.\n'
        'Un mot dérivé est formé d’un radical et d’un préfixe ou d’un suffixe : terrain, déterrer.\n'
        'Un mot composé réunit plusieurs mots : pomme de terre, porte-monnaie.',
        parties=[
            ('Trois sortes de mots', [
                vocabulaire(3, 'Mot dérivé', 'Mot composé'),
                {'type': 'tableau', 'titre': 'Simple, dérivé, composé', 'colonnes': ['Mot', 'Sorte', 'Formation'], 'lignes': [
                    ['terre', 'simple', 'un seul élément'], ['terrain', 'dérivé', 'terr- + -ain'], ['enterrer', 'dérivé', 'en- + terr- + -er'], ['pomme de terre', 'composé', 'pomme + de + terre'], ['arc-en-ciel', 'composé', 'arc + en + ciel']]},
                bq('« Malheureux » est un mot :', ['dérivé', 'simple', 'composé'], 'Mal- + heureux.'),
            ]),
            ('Décomposer pour comprendre', [
                {'type': 'methode', 'titre': 'Pour analyser un mot', 'etapes': [
                    'Cherche le radical, la partie qui porte le sens.',
                    'Repère un préfixe au début, un suffixe à la fin.',
                    'Plusieurs mots réunis, avec ou sans trait d’union : mot composé.']},
                {'type': 'piege', 'erreur': 'On croit que « table » est dérivé, à cause du -able.', 'correction': 'On ne peut pas enlever -able : « t » n’est pas un mot. Table est un mot simple.'},
            ]),
        ],
        a_toi=[
            q('« Chou-fleur » est un mot :', ['composé', 'dérivé', 'simple'], 'Deux noms réunis.'),
            q('Quel mot est dérivé de « dent » ?', ['dentiste', 'dentelle', 'accident'], 'Dentiste : dent + -iste.'),
            q('« Soleil » est un mot :', ['simple', 'dérivé', 'composé'], 'On ne peut pas le découper.'),
        ],
        sources=[src(BO, 'Différencier les mots simples, dérivés et composés', 'Mots simples, dérivés, composés')]),

    'FR-C3-6E-VOC-04': dict(duree=7, essentiel=
        'L’étymologie est l’origine d’un mot. Beaucoup de mots français viennent du latin ou du grec.\n'
        'Géographie vient du grec gê (la terre) et graphein (écrire).\n'
        'Le sens d’un mot peut évoluer au fil des siècles.',
        parties=[
            ('Des racines grecques et latines', [
                vocabulaire(3, 'Étymologie'),
                {'type': 'tableau', 'titre': 'Quelques racines', 'colonnes': ['Racine', 'Origine', 'Sens', 'Exemples'], 'lignes': [
                    ['géo-', 'grec', 'terre', 'géographie, géologie'], ['bio-', 'grec', 'vie', 'biologie'], ['-graphe', 'grec', 'écrire', 'autographe'],
                    ['aqua-', 'latin', 'eau', 'aquarium, aquatique'], ['télé-', 'grec', 'loin', 'téléphone, télescope'], ['-cide', 'latin', 'qui tue', 'insecticide']]},
                bq('Que signifie « hydro- » dans « hydravion » ?', ['eau', 'air', 'feu'], 'Du grec hudôr, l’eau : un avion qui se pose sur l’eau.'),
            ]),
            ('Le sens évolue', [
                {'type': 'explique', 'texte': '« Étonner » vient du latin et voulait dire frapper comme le tonnerre. Aujourd’hui, il signifie surprendre.'},
                {'type': 'methode', 'titre': 'Pour utiliser l’étymologie', 'etapes': [
                    'Repère une racine connue dans le mot.',
                    'Rapproche-le de mots de la même famille.',
                    'Vérifie dans un dictionnaire qui donne l’étymologie.']},
                {'type': 'piege', 'erreur': 'On croit que tous les mots en -graphe ont un rapport avec les graphiques.', 'correction': 'Graphe vient du grec « écrire » : un autographe est une signature écrite de sa propre main.'},
            ]),
        ],
        a_toi=[
            q('Que signifie « bio- » ?', ['vie', 'livre', 'terre'], 'Biologie : science de la vie.'),
            q('Un « télescope » permet de voir :', ['loin', 'petit', 'sous l’eau'], 'Télé- : loin.'),
            q('« Aquatique » a un rapport avec :', ['l’eau', 'l’air', 'la terre'], 'Aqua : eau en latin.'),
        ],
        sources=[src(BO, 'Se sensibiliser à l’étymologie et à l’évolution du sens des mots', 'Étymologie')]),

    'FR-C3-6E-VOC-05': dict(duree=6, essentiel=
        'Il existe trois registres de langue : familier, courant et soutenu.\n'
        'Une bagnole (familier), une voiture (courant), une automobile (soutenu).\n'
        'On choisit le registre selon la situation et la personne à qui l’on s’adresse.',
        parties=[
            ('Trois registres', [
                vocabulaire(3, 'Registre de langue'),
                {'type': 'tableau', 'titre': 'Les registres', 'colonnes': ['Familier', 'Courant', 'Soutenu'], 'lignes': [
                    ['une bagnole', 'une voiture', 'une automobile'], ['bosser', 'travailler', 'œuvrer'], ['T’as vu ?', 'Tu as vu ?', 'Avez-vous vu ?'], ['Ça caille.', 'Il fait froid.', 'La température est fort basse.']]},
                bq('« Avoir la frousse » appartient au registre :', ['familier', 'courant', 'soutenu'], 'En registre courant : avoir peur.'),
            ]),
            ('Choisir le bon registre', [
                {'type': 'methode', 'titre': 'Pour choisir', 'etapes': [
                    'À qui je parle ou j’écris ? Un ami, un adulte, une institution ?',
                    'Dans quelle situation ? À l’oral entre amis, en classe, dans une lettre officielle ?',
                    'En classe, à l’écrit : registre courant au minimum.']},
                {'type': 'piege', 'erreur': 'On écrit « T’inquiète » dans une rédaction.', 'correction': 'À l’écrit scolaire, on écrit : Ne t’inquiète pas.'},
            ]),
        ],
        a_toi=[
            q('Quel mot appartient au registre soutenu ?', ['demeure', 'baraque', 'maison'], 'Demeure est soutenu, maison courant, baraque familier.'),
            q('Équivalent courant de « bouquin » ?', ['livre', 'ouvrage', 'bouquiner'], 'Bouquin est familier ; ouvrage est soutenu.'),
            q('Dans une lettre au maire, j’utilise le registre :', ['soutenu ou courant', 'familier', 'n’importe lequel'], 'Situation officielle.'),
        ],
        sources=[src(BO, 'durablement, en respectant le registre de langue', 'Registre de langue'),
                 src(BO, 'À l’oral et à l’écrit, utiliser à bon escient le vocabulaire spécifique issus de différents univers de référence et se l’approprier', 'Vocabulaire et registre')]),

    'FR-C3-6E-DICT-01': dict(duree=7, essentiel=
        'Avant d’écrire, j’écoute la phrase entière et je repère les groupes de mots.\n'
        'Pendant que j’écris, je pense aux accords : groupe nominal, sujet et verbe, participe passé.\n'
        'Je relis plusieurs fois, en cherchant une seule chose à chaque relecture.',
        parties=[
            ('Pendant la dictée', [
                {'type': 'methode', 'titre': 'Pendant la dictée', 'etapes': [
                    'Écoute la phrase entière avant d’écrire.',
                    'Écris par groupes de mots, sans te presser.',
                    'Laisse une ligne sur deux pour corriger.']},
                {'type': 'exemple-resolu', 'enonce': 'Dictée : « Les vieilles maisons que nous avons visitées étaient abandonnées. »', 'etapes': [
                    'vieilles maisons : féminin pluriel.', 'que = les maisons, COD placé avant avoir : visitées.', 'étaient : le sujet est les maisons.', 'abandonnées : attribut accordé avec maisons.'],
                 'conclusion': 'Chaque accord se justifie par une règle.'},
            ]),
            ('Relire avec méthode', [
                {'type': 'tableau', 'titre': 'Une relecture pour chaque point', 'colonnes': ['Relecture', 'Je vérifie'], 'lignes': [
                    ['1', 'les groupes nominaux : déterminant, nom, adjectifs'], ['2', 'les verbes : sujet, temps, terminaison'], ['3', 'les participes passés : être, avoir et COD'], ['4', 'les homophones, la ponctuation, les majuscules']]},
                {'type': 'piege', 'erreur': 'On relit une seule fois, vite, en lisant le sens.', 'correction': 'On relit lentement, une fois par type d’erreur.'},
            ]),
        ],
        a_toi=[
            q('Quelle phrase est correcte ?', ['Les lettres que j’ai reçues sont arrivées.', 'Les lettres que j’ai reçu sont arrivés.', 'Les lettres que j’ai reçues sont arrivé.'], 'Que = les lettres, avant avoir ; sont arrivées avec être.'),
            q('Quelle phrase est correcte ?', ['Les oiseaux migrateurs repartent.', 'Les oiseaux migrateur repartent.', 'Les oiseaux migrateurs repart.'], 'Groupe nominal et verbe au pluriel.'),
            q('Que vérifie-t-on en relisant les verbes ?', ['le sujet, le temps, la terminaison', 'les majuscules', 'la longueur des phrases'], 'Une relecture pour chaque point.'),
        ],
        sources=[src(BO, 'Prendre en compte les normes de l’écrit pour réviser un texte', 'Normes de l’écrit')]),
}

ecrire(COURS)
