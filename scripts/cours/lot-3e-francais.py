"""Lot de cours : français 3e (programme 2020, en vigueur en 3e jusqu'en 2027-2028). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-3e-francais.py
    python3 scripts/cours/pages.py content/cours/FR-C4-3E-*.json

Cycle 4 : phrases de 25 mots au plus (alerte). Sources : extraits vérifiés du référentiel.
Œuvres citées par leur titre et leur date, sans extrait ; exemples inventés.
"""
from commun import bq, ecrire, q, source_referentiel as ref

COURS = {
    'FR-C4-3E-GRAM-51': dict(duree=7, essentiel=
        'Le pronom relatif dépend de sa fonction dans la subordonnée relative.\n'
        'Qui est sujet ; que est COD ; dont remplace un complément introduit par de ; où exprime le lieu ou le temps.\n'
        '« Le film que j’ai vu » : que est COD de vu. « Le film dont je parle » : dont est complément de parle.',
        parties=[
            ('Choisir le relatif', [
                {'type': 'tableau', 'titre': 'Fonction du relatif', 'colonnes': ['Relatif', 'Fonction', 'Exemple'], 'lignes': [
                    ['qui', 'sujet', 'Le train qui arrive vient de Lyon.'], ['que', 'COD', 'Le film que j’ai vu était long.'], ['dont', 'complément introduit par de', 'Le film dont je parle est sorti hier.'],
                    ['où', 'complément de lieu ou de temps', 'La ville où je vis. Le jour où il est parti.'], ['lequel, auquel, duquel', 'après une préposition', 'L’ami auquel je pense.']]},
                bq('« Le livre … tu m’as parlé. »', ['dont', 'que', 'où'], 'On parle de quelque chose : dont.'),
            ]),
            ('Retrouver la fonction', [
                {'type': 'methode', 'titre': 'Pour choisir', 'etapes': [
                    'Remplace le relatif par son antécédent : « je parle du film ».', 'Regarde la construction du verbe : parler de.', 'Choisis le relatif qui correspond : de → dont.']},
                {'type': 'piege', 'erreur': 'On écrit « le film que je parle ».', 'correction': 'On parle de quelque chose : le film dont je parle.'},
            ]),
        ],
        a_toi=[
            q('« La maison … je suis né est vendue. »', ['où', 'que', 'dont'], 'Un lieu.'),
            q('« L’amie … j’attends est en retard. »', ['que', 'qui', 'dont'], 'J’attends quelqu’un : COD.'),
            q('Dans « L’élève qui parle », qui est :', ['sujet de parle', 'COD de parle', 'complément du nom'], 'Qui est-ce qui parle ?'),
        ],
        sources=[ref('FR-C4-3E-GRAM-51', 'Fonction du pronom relatif')]),

    'FR-C4-3E-GRAM-52': dict(duree=7, essentiel=
        'Une subordonnée a une fonction dans la phrase, comme un groupe de mots.\n'
        'La relative complète un nom, son antécédent. La conjonctive introduite par que est souvent COD du verbe principal.\n'
        'Les circonstancielles sont compléments circonstanciels : temps, cause, but, condition…',
        parties=[
            ('Trois fonctions', [
                {'type': 'tableau', 'titre': 'Fonction des subordonnées', 'colonnes': ['Phrase', 'Subordonnée', 'Fonction'], 'lignes': [
                    ['Je crois que tu as raison.', 'que tu as raison', 'COD de crois'], ['Le chien qui aboie est à moi.', 'qui aboie', 'complément de l’antécédent chien'], ['Quand il pleut, je lis.', 'quand il pleut', 'CC de temps']]},
                bq('« J’espère qu’il viendra. » La subordonnée est :', ['COD de espère', 'CC de temps', 'complément du nom'], 'J’espère quoi ? Qu’il viendra.'),
            ]),
            ('Le test du remplacement', [
                {'type': 'explique', 'texte': 'On remplace la subordonnée par un groupe de mots : « Je crois que tu as raison » devient « Je crois cela ». Cela est COD.'},
                {'type': 'piege', 'erreur': 'On donne la nature à la place de la fonction : « c’est une conjonctive ».', 'correction': 'Conjonctive est la nature. La fonction répond à la question : quel rôle joue-t-elle ?'},
            ]),
        ],
        a_toi=[
            q('« Je sortirai si le soleil revient. » La subordonnée est :', ['CC de condition', 'COD', 'complément du nom'], 'Si introduit une condition.'),
            q('« La lettre que j’ai reçue » : la relative complète :', ['le nom lettre', 'le verbe reçue', 'le sujet je'], 'Lettre est l’antécédent.'),
            q('« Il pense que la sortie est annulée. » Fonction de la subordonnée :', ['COD de pense', 'sujet', 'CC de cause'], 'Il pense quoi ?'),
        ],
        sources=[ref('FR-C4-3E-GRAM-52', 'Fonction des subordonnées')]),

    'FR-C4-3E-GRAM-53': dict(duree=6, essentiel=
        'Les pronoms indéfinis désignent de façon vague : personne, rien, chacun, quelqu’un, aucun, plusieurs.\n'
        'Les pronoms interrogatifs posent une question : qui, que, quoi, lequel.\n'
        'Les pronoms adverbiaux en et y remplacent un complément : « J’y vais », « J’en veux ».',
        parties=[
            ('Reconnaitre', [
                {'type': 'tableau', 'titre': 'Des pronoms', 'colonnes': ['Phrase', 'Pronom', 'Classe'], 'lignes': [
                    ['Personne n’est venu.', 'personne', 'indéfini'], ['Qui parle ?', 'qui', 'interrogatif'], ['Je vais à Lyon. J’y vais.', 'y', 'adverbial, remplace à Lyon'],
                    ['Tu veux du pain ? J’en veux.', 'en', 'adverbial, remplace du pain'], ['Le livre qui est là', 'qui', 'relatif']]},
                bq('Dans « Lequel préfères-tu ? », « lequel » est un pronom :', ['interrogatif', 'relatif', 'indéfini'], 'Il pose une question.'),
            ]),
            ('Un même mot, deux classes', [
                {'type': 'piege', 'erreur': 'On confond qui interrogatif et qui relatif.', 'correction': 'Le relatif a un antécédent : « l’ami qui parle ». L’interrogatif n’en a pas : « Qui parle ? »'},
            ]),
        ],
        a_toi=[
            q('Dans « Chacun a reçu un livre », « chacun » est :', ['un pronom indéfini', 'un déterminant', 'un pronom interrogatif'], 'Il désigne chaque personne de façon générale.'),
            q('« Tu penses à ton voyage ? » « Oui, j’… pense. »', ['y', 'en', 'le'], 'Penser à : y.'),
            q('« Tu parles de ce film ? » « Oui, j’… parle. »', ['en', 'y', 'lui'], 'Parler de : en.'),
        ],
        sources=[ref('FR-C4-3E-GRAM-53', 'Les autres pronoms')]),

    'FR-C4-3E-GRAM-54': dict(duree=6, essentiel=
        'La subordonnée infinitive a un verbe à l’infinitif et son propre sujet. Elle suit un verbe de perception, ou laisser et faire.\n'
        '« J’entends les oiseaux chanter » : les oiseaux est le sujet de chanter.\n'
        'La subordonnée participiale a un participe et son propre sujet : « Le travail terminé, ils partirent. »',
        parties=[
            ('L’infinitive', [
                {'type': 'tableau', 'titre': 'Après un verbe de perception', 'colonnes': ['Phrase', 'Infinitive', 'Sujet de l’infinitif'], 'lignes': [
                    ['J’entends les oiseaux chanter.', 'les oiseaux chanter', 'les oiseaux'], ['Je regarde la pluie tomber.', 'la pluie tomber', 'la pluie'], ['Il laisse son chien courir.', 'son chien courir', 'son chien']]},
                bq('Dans « Je vois les enfants jouer », le sujet de jouer est :', ['les enfants', 'je', 'vois'], 'Ce sont les enfants qui jouent.'),
            ]),
            ('La participiale', [
                {'type': 'explique', 'texte': '« La nuit tombant, les promeneurs rentrèrent. » La nuit est le sujet de tombant, différent du sujet de la principale.'},
                {'type': 'piege', 'erreur': 'On prend tout participe en tête de phrase pour une participiale : « Épuisé, il dormit ».', 'correction': 'Épuisé n’a pas de sujet propre : c’est une apposition à il. La participiale a son propre sujet.'},
            ]),
        ],
        a_toi=[
            q('« Le repas terminé, nous sortîmes. » La subordonnée est :', ['participiale', 'infinitive', 'relative'], 'Le repas est le sujet de terminé.'),
            q('« J’écoute la mer gronder. » La subordonnée est :', ['infinitive', 'participiale', 'conjonctive'], 'Gronder a pour sujet la mer.'),
            q('Une subordonnée infinitive suit souvent un verbe :', ['de perception', 'd’état', 'impersonnel'], 'Voir, entendre, sentir, regarder.'),
        ],
        sources=[ref('FR-C4-3E-GRAM-54', 'Infinitives et participiales')]),

    'FR-C4-3E-GRAM-55': dict(duree=6, essentiel=
        'L’attribut du COD exprime une qualité attribuée au COD par l’intermédiaire du verbe.\n'
        'Il suit des verbes comme trouver, juger, rendre, nommer, élire, considérer comme.\n'
        '« Je trouve ce film drôle » : drôle est attribut du COD ce film.',
        parties=[
            ('Distinguer', [
                {'type': 'tableau', 'titre': 'Trois fonctions de l’adjectif', 'colonnes': ['Phrase', 'Fonction de « drôle »'], 'lignes': [
                    ['Ce film est drôle.', 'attribut du sujet'], ['Je trouve ce film drôle.', 'attribut du COD'], ['J’ai vu un film drôle.', 'épithète']]},
                bq('Dans « On a élu Léa déléguée », « déléguée » est :', ['attribut du COD', 'épithète', 'attribut du sujet'], 'On a élu Léa : COD. Déléguée la qualifie par le verbe.'),
            ]),
            ('Le test', [
                {'type': 'explique', 'texte': 'On transforme la phrase : « Je trouve ce film drôle » devient « Je trouve que ce film est drôle ». L’attribut du COD devient attribut du sujet.'},
                {'type': 'piege', 'erreur': 'On confond attribut du COD et épithète : « Je trouve ce film drôle ».', 'correction': 'On peut remplacer ce film par le : « Je le trouve drôle ». Drôle reste : il n’est pas épithète.'},
            ]),
        ],
        a_toi=[
            q('Dans « Ce bruit rend Tom nerveux », « nerveux » est :', ['attribut du COD', 'épithète', 'COI'], 'Rendre + COD + attribut.'),
            q('L’attribut du COD s’accorde avec :', ['le COD', 'le sujet', 'le verbe'], '« Je trouve ces films drôles. »'),
            q('Dans « Je juge cette idée excellente », le COD est :', ['cette idée', 'excellente', 'je'], 'Excellente en est l’attribut.'),
        ],
        sources=[ref('FR-C4-3E-GRAM-55', 'Attribut du COD')]),

    'FR-C4-3E-GRAM-56': dict(duree=8, essentiel=
        'Les compléments circonstanciels précisent les circonstances de l’action.\n'
        'Ils expriment le temps, le lieu, la manière, le moyen, la cause, la conséquence, le but, l’opposition, la condition ou la comparaison.\n'
        '« Malgré la pluie, nous sortons » : opposition. « Il court comme un lapin » : comparaison.',
        parties=[
            ('Dix sens', [
                {'type': 'tableau', 'titre': 'Les compléments circonstanciels', 'colonnes': ['Sens', 'Exemple'], 'lignes': [
                    ['temps', 'Dès l’aube, il partit.'], ['lieu', 'Il vit à la montagne.'], ['manière', 'Il parle avec calme.'], ['moyen', 'Il ouvre la porte avec une clé.'], ['cause', 'Il tremble de froid.'],
                    ['conséquence', 'Il a tant couru qu’il est épuisé.'], ['but', 'Il économise pour partir.'], ['opposition', 'Malgré la pluie, nous sortons.'], ['condition', 'En cas de pluie, le match est reporté.'], ['comparaison', 'Il court comme un lapin.']]},
                bq('« Bien qu’il soit fatigué, il continue. » Le complément exprime :', ['l’opposition', 'la cause', 'le but'], 'Bien que : une idée contraire.'),
            ]),
            ('Moyen ou manière ?', [
                {'type': 'explique', 'texte': 'Le moyen répond à « avec quoi ? » : avec une clé. La manière répond à « comment ? » : avec calme, doucement.'},
                {'type': 'piege', 'erreur': 'On confond cause et but : « Il économise pour partir » serait une cause.', 'correction': 'Partir est l’objectif visé, pas ce qui provoque l’action : c’est un but.'},
            ]),
        ],
        a_toi=[
            q('« Si tu viens, nous jouerons. » Le complément exprime :', ['la condition', 'le temps', 'la cause'], 'Si : une condition.'),
            q('« Elle écrit avec un stylo plume. » Le complément exprime :', ['le moyen', 'la manière', 'le lieu'], 'Avec quoi ?'),
            q('« Il est resté chez lui à cause de la grève. » Le complément exprime :', ['la cause', 'le but', 'l’opposition'], 'Pourquoi est-il resté ?'),
        ],
        sources=[ref('FR-C4-3E-GRAM-56', 'Tous les compléments circonstanciels')]),

    'FR-C4-3E-CONJ-51': dict(duree=6, essentiel=
        'Le subjonctif passé se forme avec l’auxiliaire avoir ou être au subjonctif présent, suivi du participe passé.\n'
        '« Je suis content que tu sois venu. » « Il faut que tu aies fini. »\n'
        'Il exprime une action accomplie, antérieure à celle du verbe principal ou à un moment donné.',
        parties=[
            ('Former', [
                {'type': 'tableau', 'titre': 'Subjonctif passé', 'colonnes': ['Personne', 'finir', 'partir'], 'lignes': [
                    ['que je', 'aie fini', 'sois parti, partie'], ['que tu', 'aies fini', 'sois parti, partie'], ['qu’il, qu’elle', 'ait fini', 'soit parti, partie'], ['que nous', 'ayons fini', 'soyons partis, parties'], ['qu’ils, qu’elles', 'aient fini', 'soient partis, parties']]},
                bq('« Je doute qu’il … compris. »', ['ait', 'a', 'est'], 'Douter que + subjonctif.'),
            ]),
            ('Présent ou passé ?', [
                {'type': 'explique', 'texte': '« Je veux que tu finisses » : l’action est à venir. « Je veux que tu aies fini avant midi » : l’action sera terminée à ce moment-là.'},
                {'type': 'piege', 'erreur': 'On écrit « qu’il aie ».', 'correction': 'À la 3e personne : qu’il ait. Que j’aie prend un e.'},
            ]),
        ],
        a_toi=[
            q('« Bien qu’elle … partie tôt, elle est arrivée en retard. »', ['soit', 'ait', 'est'], 'Partir se conjugue avec être.'),
            q('« Il faut que nous … terminé ce soir. »', ['ayons', 'avons', 'ayions'], 'Pas de i après le y.'),
            q('Le subjonctif passé exprime une action :', ['accomplie', 'future', 'habituelle'], 'Elle est terminée à un moment donné.'),
        ],
        sources=[ref('FR-C4-3E-CONJ-51', 'Subjonctif passé')]),

    'FR-C4-3E-CONJ-52': dict(duree=7, essentiel=
        'Au futur et au conditionnel, de nombreux verbes irréguliers changent de radical : voir → je verrai, je verrais.\n'
        'Pouvoir, courir, mourir et envoyer doublent le r : je pourrais, je courrai, il mourra, j’enverrai.\n'
        'Au subjonctif présent, certains radicaux sont à retenir : qu’il fasse, que nous sachions, qu’elle puisse.',
        parties=[
            ('Futur et conditionnel', [
                {'type': 'tableau', 'titre': 'Radicaux irréguliers', 'colonnes': ['Verbe', 'Futur', 'Conditionnel'], 'lignes': [
                    ['voir', 'je verrai', 'je verrais'], ['pouvoir', 'je pourrai', 'je pourrais'], ['savoir', 'je saurai', 'je saurais'], ['envoyer', 'j’enverrai', 'j’enverrais'], ['aller', 'j’irai', 'j’irais']]},
                bq('« Si j’avais le temps, je … ce film. » (voir)', ['verrais', 'voirais', 'verais'], 'Radical verr-, terminaison du conditionnel.'),
            ]),
            ('Subjonctif', [
                {'type': 'tableau', 'titre': 'Radicaux du subjonctif', 'colonnes': ['Verbe', 'que je', 'que nous'], 'lignes': [
                    ['faire', 'fasse', 'fassions'], ['savoir', 'sache', 'sachions'], ['pouvoir', 'puisse', 'puissions'], ['aller', 'aille', 'allions']]},
                {'type': 'piege', 'erreur': 'On écrit « je courirai » ou « je pourai ».', 'correction': 'Courir et pouvoir ont deux r au futur : je courrai, je pourrai.'},
            ]),
        ],
        a_toi=[
            q('« Demain, il … te voir. » (venir, futur)', ['viendra', 'venira', 'viendrera'], 'Radical viendr-.'),
            q('« Il faut que vous … la réponse. » (savoir)', ['sachiez', 'savez', 'saviez'], 'Subjonctif de savoir.'),
            q('« Nous … une lettre demain. » (envoyer, futur)', ['enverrons', 'envoyerons', 'envoirons'], 'Radical enverr-.'),
        ],
        sources=[ref('FR-C4-3E-CONJ-52', 'Radicaux des verbes irréguliers')]),

    'FR-C4-3E-CONJ-53': dict(duree=6, essentiel=
        'Le subjonctif imparfait appartient surtout à la langue littéraire : qu’il chantât, qu’il partît, qu’il fût.\n'
        'À la 3e personne du singulier, il se distingue du passé simple par l’accent circonflexe et, pour les verbes en -er, par le t final.\n'
        'Le subjonctif plus-que-parfait se forme avec l’auxiliaire au subjonctif imparfait : qu’il eût chanté.',
        parties=[
            ('Distinguer du passé simple', [
                {'type': 'tableau', 'titre': '3e personne du singulier', 'colonnes': ['Verbe', 'Passé simple', 'Subjonctif imparfait'], 'lignes': [
                    ['chanter', 'il chanta', 'qu’il chantât'], ['partir', 'il partit', 'qu’il partît'], ['être', 'il fut', 'qu’il fût'], ['avoir', 'il eut', 'qu’il eût']]},
                bq('« Il fallait qu’il partît. » « partît » est au :', ['subjonctif imparfait', 'passé simple', 'imparfait de l’indicatif'], 'Accent circonflexe, après il fallait que.'),
            ]),
            ('Un temps littéraire', [
                {'type': 'explique', 'texte': 'Aujourd’hui, à l’oral et dans l’écrit courant, on le remplace par le subjonctif présent : « Il fallait qu’il parte. »'},
                {'type': 'piege', 'erreur': 'On écrit le passé simple avec un accent : « il partît vers le nord ».', 'correction': 'Le passé simple n’a pas d’accent : il partit. L’accent marque le subjonctif imparfait.'},
            ]),
        ],
        a_toi=[
            q('« Bien qu’il fût tard, il travaillait. » « fût » est au :', ['subjonctif imparfait', 'passé simple', 'futur'], 'Après bien que, avec un accent.'),
            q('« Il eut chanté » est au :', ['passé antérieur', 'subjonctif plus-que-parfait', 'subjonctif imparfait'], 'Pas d’accent : indicatif.'),
            q('Dans le langage courant, « qu’il chantât » se remplace par :', ['qu’il chante', 'il chanta', 'il chantait'], 'Le subjonctif présent.'),
        ],
        sources=[ref('FR-C4-3E-CONJ-53', 'Subjonctif imparfait')]),

    'FR-C4-3E-CONJ-54': dict(duree=7, essentiel=
        'Certaines conjonctions sont suivies du subjonctif : bien que, pour que, afin que, avant que, sans que, à condition que.\n'
        'D’autres sont suivies de l’indicatif : parce que, puisque, pendant que, alors que, après que.\n'
        '« Bien qu’il fasse froid » ; « Parce qu’il fait froid ».',
        parties=[
            ('Subjonctif ou indicatif ?', [
                {'type': 'tableau', 'titre': 'Le mode après la conjonction', 'colonnes': ['Subjonctif', 'Indicatif'], 'lignes': [
                    ['bien que, quoique', 'parce que, puisque'], ['pour que, afin que', 'pendant que, tandis que'], ['avant que, jusqu’à ce que', 'après que, depuis que'], ['sans que, à condition que', 'alors que, si']]},
                bq('« Je rentre avant qu’il … nuit. » (faire)', ['fasse', 'fait', 'fera'], 'Avant que + subjonctif.'),
            ]),
            ('Après que', [
                {'type': 'explique', 'texte': 'Après que exprime un fait réalisé : on emploie l’indicatif. « Après qu’il est parti, nous avons dîné. »'},
                {'type': 'piege', 'erreur': 'On écrit « après qu’il soit parti », par analogie avec avant que.', 'correction': 'Avant que présente un fait pas encore réalisé : subjonctif. Après que présente un fait réalisé : indicatif.'},
            ]),
        ],
        a_toi=[
            q('« Je t’explique pour que tu … » (comprendre)', ['comprennes', 'comprends', 'comprendras'], 'Pour que + subjonctif.'),
            q('« Puisqu’il … beau, sortons. » (faire)', ['fait', 'fasse', 'ferait'], 'Puisque + indicatif.'),
            q('« Attends jusqu’à ce qu’il … » (revenir)', ['revienne', 'revient', 'reviendra'], 'Jusqu’à ce que + subjonctif.'),
        ],
        sources=[ref('FR-C4-3E-CONJ-54', 'Mode après une conjonction')]),

    'FR-C4-3E-CONJ-55': dict(duree=5, essentiel=
        'Falloir ne se conjugue qu’à la 3e personne du singulier, avec il impersonnel : il faut, il faudra, qu’il faille.\n'
        'Valoir se conjugue à toutes les personnes : je vaux, il vaut, nous valons, ils valent.\n'
        'Au futur et au conditionnel, leur radical devient faudr- et vaudr- : il faudra, il vaudrait.',
        parties=[
            ('Deux verbes irréguliers', [
                {'type': 'tableau', 'titre': 'À la 3e personne du singulier', 'colonnes': ['Temps', 'falloir', 'valoir'], 'lignes': [
                    ['présent', 'il faut', 'il vaut'], ['imparfait', 'il fallait', 'il valait'], ['futur', 'il faudra', 'il vaudra'], ['conditionnel', 'il faudrait', 'il vaudrait'], ['subjonctif', 'qu’il faille', 'qu’il vaille']]},
                bq('« Il … mieux partir maintenant. » (valoir, conditionnel)', ['vaudrait', 'valerait', 'vaudrais'], 'Radical vaudr- et terminaison -ait.'),
            ]),
            ('Ne pas confondre', [
                {'type': 'piege', 'erreur': 'On écrit « Je doute qu’il faut partir ».', 'correction': 'Après douter que, on emploie le subjonctif : je doute qu’il faille partir.'},
            ]),
        ],
        a_toi=[
            q('« Ces timbres … cher. » (valoir, présent)', ['valent', 'vaux', 'vaut'], '3e personne du pluriel.'),
            q('« Je doute qu’il … partir si tôt. » (falloir)', ['faille', 'faut', 'fallait'], 'Subjonctif de falloir.'),
            q('« Il … du courage. » (falloir, futur)', ['faudra', 'fallera', 'faudrait'], 'Futur : faudr- + a.'),
        ],
        sources=[ref('FR-C4-3E-CONJ-55', 'Falloir et valoir')]),

    'FR-C4-3E-ORTH-51': dict(duree=6, essentiel=
        'Dans une relative, que est souvent COD du verbe de la subordonnée.\n'
        'Placé avant le verbe, il commande l’accord du participe passé avec avoir. Il prend le genre et le nombre de son antécédent.\n'
        '« Les lettres que j’ai écrites » : que reprend lettres, féminin pluriel.',
        parties=[
            ('Remonter à l’antécédent', [
                {'type': 'methode', 'titre': 'Pour accorder', 'etapes': [
                    'Repère que et son antécédent.', 'Vérifie que que est COD : « j’ai écrit les lettres ».', 'Accorde le participe passé avec l’antécédent.']},
                bq('« Les chansons que nous avons … » (apprendre)', ['apprises', 'appris', 'apprise'], 'Que reprend chansons, féminin pluriel.'),
            ]),
            ('Quand que n’est pas COD', [
                {'type': 'explique', 'texte': '« Les heures que j’ai dormi » : que indique une durée, ce n’est pas un COD. Le participe reste invariable.'},
                {'type': 'piege', 'erreur': 'On accorde avec le sujet de la relative : « Les fleurs que Tom a cueillis ».', 'correction': 'On accorde avec l’antécédent de que : fleurs, donc cueillies.'},
            ]),
        ],
        a_toi=[
            q('« La robe que tu as … est belle. » (choisir)', ['choisie', 'choisi', 'choisis'], 'Que reprend robe.'),
            q('« Les efforts qu’il a … ont payé. » (faire)', ['faits', 'fait', 'faites'], 'Que reprend efforts, masculin pluriel.'),
            q('« Les deux heures qu’il a … » (marcher)', ['marché', 'marchées', 'marchés'], 'Que indique une durée, pas un COD.'),
        ],
        sources=[ref('FR-C4-3E-ORTH-51', 'Participe passé et COD relatif')]),

    'FR-C4-3E-ORTH-52': dict(duree=5, essentiel=
        'L’adjectif ou le participe apposé s’accorde avec le nom ou le pronom qu’il qualifie, même séparé par une virgule.\n'
        '« Épuisés, les randonneurs s’arrêtent. »\n'
        'Il faut repérer le nom qualifié, parfois placé loin dans la phrase.',
        parties=[
            ('Trouver le nom qualifié', [
                {'type': 'tableau', 'titre': 'Des appositions', 'colonnes': ['Phrase', 'Nom qualifié', 'Accord'], 'lignes': [
                    ['Épuisés, les randonneurs s’arrêtent.', 'randonneurs', 'masculin pluriel'], ['Ravie, Léa sourit.', 'Léa', 'féminin singulier'], ['Les filles, inquiètes, attendaient.', 'filles', 'féminin pluriel']]},
                bq('« … par le bruit, les chattes s’enfuirent. » (effrayer)', ['Effrayées', 'Effrayés', 'Effrayé'], 'Qualifie chattes : féminin pluriel.'),
            ]),
            ('Attention au sujet', [
                {'type': 'piege', 'erreur': 'On laisse l’adjectif en tête de phrase au masculin singulier par défaut.', 'correction': 'On cherche le nom qualifié : souvent le sujet qui suit.'},
            ]),
        ],
        a_toi=[
            q('« … de leur victoire, les joueuses chantaient. » (fier)', ['Fières', 'Fiers', 'Fier'], 'Qualifie joueuses.'),
            q('« Les enfants, … , s’endormirent. » (fatigué)', ['fatigués', 'fatigué', 'fatiguées'], 'Enfants : masculin pluriel ici.'),
            q('L’adjectif apposé s’accorde avec :', ['le nom qu’il qualifie', 'le verbe', 'le premier mot de la phrase'], 'Même s’il est séparé par une virgule.'),
        ],
        sources=[ref('FR-C4-3E-ORTH-52', 'Accord des mots apposés')]),

    'FR-C4-3E-ORTH-53': dict(duree=6, essentiel=
        'Quand le sujet comporte un complément du nom, le verbe s’accorde avec le noyau : « Le panier de pommes est lourd. »\n'
        'Avec un pronom indéfini comme chacun, aucun, personne, le verbe est au singulier : « Chacun de nous a sa place. »\n'
        'Avec la plupart de, il est au pluriel : « La plupart des élèves sont venus. »',
        parties=[
            ('Cas délicats', [
                {'type': 'tableau', 'titre': 'Accords du verbe', 'colonnes': ['Sujet', 'Accord', 'Exemple'], 'lignes': [
                    ['nom + complément du nom', 'avec le noyau', 'Le panier de pommes est lourd.'], ['chacun de…', 'singulier', 'Chacun de nous a sa place.'], ['aucun de…', 'singulier', 'Aucun des élèves n’est absent.'], ['la plupart de…', 'pluriel', 'La plupart des élèves sont venus.']]},
                bq('« Chacun des joueurs … son maillot. » (porter, présent)', ['porte', 'portent', 'portes'], 'Chacun : singulier.'),
            ]),
            ('Trouver le noyau', [
                {'type': 'piege', 'erreur': 'On accorde avec le complément le plus proche : « Le bruit des moteurs gênent ».', 'correction': 'Le noyau est bruit : le bruit des moteurs gêne.'},
            ]),
        ],
        a_toi=[
            q('« La liste des invités … longue. » (être, présent)', ['est', 'sont', 'es'], 'Le noyau est liste.'),
            q('« Personne ne … la réponse. » (connaitre, présent)', ['connait', 'connaissent', 'connais'], 'Personne : singulier.'),
            q('« La plupart des spectateurs … partis. » (être, présent)', ['sont', 'est', 'êtes'], 'La plupart : pluriel.'),
        ],
        sources=[ref('FR-C4-3E-ORTH-53', 'Accords du verbe délicats')]),

    'FR-C4-3E-DISC-51': dict(duree=7, essentiel=
        'Au discours direct, les paroles sont citées entre guillemets. Au discours indirect, elles sont rapportées dans une subordonnée.\n'
        'Le discours indirect libre mêle les deux : pas de guillemets ni de verbe introducteur, mais le ton du personnage reste.\n'
        '« Paul regarda la lettre. Elle ne reviendrait donc jamais. » : la pensée de Paul est rapportée librement.',
        parties=[
            ('Trois façons de rapporter', [
                {'type': 'tableau', 'titre': 'Une même pensée', 'colonnes': ['Discours', 'Exemple'], 'lignes': [
                    ['direct', 'Paul pensa : « Elle ne reviendra jamais ! »'], ['indirect', 'Paul pensa qu’elle ne reviendrait jamais.'], ['indirect libre', 'Paul regarda la lettre. Elle ne reviendrait donc jamais !']]},
                bq('Le discours indirect libre se reconnait à :', ['l’absence de guillemets et de verbe introducteur', 'des tirets', 'une subordonnée introduite par que'], 'Les paroles se fondent dans le récit.'),
            ]),
            ('Les indices', [
                {'type': 'observe', 'consigne': 'Ce qui trahit le discours indirect libre.', 'exemples': ['des exclamations ou des questions au milieu du récit', 'des mots familiers propres au personnage', 'le temps et la personne du récit, mais la voix du personnage']},
                {'type': 'piege', 'erreur': 'On attribue au narrateur des pensées qui sont celles du personnage.', 'correction': 'On cherche à qui appartiennent l’émotion et les mots : souvent au personnage.'},
            ]),
        ],
        a_toi=[
            q('« Il ferma la porte. Quelle journée, tout de même ! » La seconde phrase est au discours :', ['indirect libre', 'direct', 'indirect'], 'Exclamation du personnage, sans guillemets.'),
            q('« Elle dit qu’elle partirait. » est au discours :', ['indirect', 'direct', 'indirect libre'], 'Une subordonnée introduite par que.'),
            q('Le discours direct utilise :', ['des guillemets ou des tirets', 'une subordonnée', 'seulement le récit'], 'Les paroles sont citées.'),
        ],
        sources=[ref('FR-C4-3E-DISC-51', 'Discours indirect libre')]),

    'FR-C4-3E-DISC-52': dict(duree=6, essentiel=
        'Un connecteur logique exprime la relation entre deux idées.\n'
        'Cause : car, en effet. Conséquence : donc, ainsi, c’est pourquoi. Opposition : mais, pourtant, cependant. Addition : de plus, en outre.\n'
        '« Il a révisé ; pourtant, il a échoué » : opposition.',
        parties=[
            ('Choisir le connecteur', [
                {'type': 'tableau', 'titre': 'Relations logiques', 'colonnes': ['Relation', 'Connecteurs'], 'lignes': [
                    ['cause', 'car, en effet'], ['conséquence', 'donc, ainsi, c’est pourquoi'], ['opposition', 'mais, pourtant, cependant, néanmoins'], ['addition', 'de plus, en outre, par ailleurs'], ['illustration', 'par exemple, notamment']]},
                bq('« Il pleuvait ; … , le match a eu lieu. »', ['pourtant', 'donc', 'en effet'], 'Le match a lieu malgré la pluie : opposition.'),
            ]),
            ('Dans une argumentation', [
                {'type': 'explique', 'texte': 'Les connecteurs guident le lecteur : ils annoncent un nouvel argument, un exemple ou une conclusion.'},
                {'type': 'piege', 'erreur': 'On met « donc » partout pour relier les idées.', 'correction': 'Donc annonce une conséquence. Si la seconde idée s’oppose à la première, on choisit mais ou pourtant.'},
            ]),
        ],
        a_toi=[
            q('« Il est malade ; … , il reste chez lui. »', ['c’est pourquoi', 'pourtant', 'par exemple'], 'Une conséquence.'),
            q('« Il reste chez lui ; … , il est malade. »', ['en effet', 'pourtant', 'donc'], 'La seconde idée explique la première.'),
            q('« Le vélo est bon pour la santé ; … , il ne pollue pas. »', ['de plus', 'cependant', 'car'], 'Un argument de plus.'),
        ],
        sources=[ref('FR-C4-3E-DISC-52', 'Connecteurs logiques')]),

    'FR-C4-3E-VOC-51': dict(duree=6, essentiel=
        'Beaucoup de mots savants sont formés de racines grecques ou latines.\n'
        'Géographie vient du grec géo, la terre, et graphie, écrire : décrire la terre.\n'
        'Connaitre quelques racines permet de comprendre de nombreux mots.',
        parties=[
            ('Racines grecques', [
                {'type': 'tableau', 'titre': 'Du grec', 'colonnes': ['Racine', 'Sens', 'Exemples'], 'lignes': [
                    ['bio', 'vie', 'biologie, biographie'], ['logie', 'étude, science', 'zoologie'], ['chrono', 'temps', 'chronologie'], ['phone', 'son, voix', 'téléphone, microphone'], ['hydro', 'eau', 'hydravion']]},
                bq('« Biographie » signifie :', ['récit d’une vie', 'étude des plantes', 'écriture de la terre'], 'Bio : vie ; graphie : écrire.'),
            ]),
            ('Racines latines', [
                {'type': 'tableau', 'titre': 'Du latin', 'colonnes': ['Racine', 'Sens', 'Exemples'], 'lignes': [
                    ['aqua', 'eau', 'aquarium, aquatique'], ['omni', 'tout', 'omnivore, omniprésent'], ['vore', 'qui mange', 'carnivore, herbivore'], ['pater, patr', 'père', 'paternel, patrie']]},
                {'type': 'piege', 'erreur': 'On décompose au hasard : « hippopotame » viendrait de « hippie ».', 'correction': 'Hippos signifie cheval, potamos fleuve : le cheval du fleuve. On vérifie dans le dictionnaire.'},
            ]),
        ],
        a_toi=[
            q('Un animal omnivore mange :', ['de tout', 'seulement de la viande', 'seulement des plantes'], 'Omni : tout ; vore : qui mange.'),
            q('La chronologie est :', ['l’étude de l’ordre des évènements dans le temps', 'l’étude des sons', 'l’étude de l’eau'], 'Chrono : temps.'),
            q('Un hydravion se pose :', ['sur l’eau', 'sur la neige', 'dans le désert'], 'Hydro : eau.'),
        ],
        sources=[ref('FR-C4-3E-VOC-51', 'Racines grecques et latines')]),

    'FR-C4-3E-VOC-52': dict(duree=5, essentiel=
        'La dénotation est le sens de base d’un mot, celui du dictionnaire.\n'
        'La connotation est la nuance qu’il ajoute : méliorative, valorisante, ou péjorative, dévalorisante.\n'
        '« Demeure », « maison », « masure » désignent un logement : le premier valorise, le dernier dévalorise.',
        parties=[
            ('Trois nuances', [
                {'type': 'tableau', 'titre': 'Un même sens, des connotations', 'colonnes': ['Mélioratif', 'Neutre', 'Péjoratif'], 'lignes': [
                    ['demeure', 'maison', 'masure'], ['svelte', 'mince', 'maigrichon'], ['économe', 'qui dépense peu', 'radin'], ['coursier', 'cheval', 'canasson']]},
                bq('« Une masure » est un terme :', ['péjoratif', 'mélioratif', 'neutre'], 'Il désigne une maison misérable.'),
            ]),
            ('Repérer un point de vue', [
                {'type': 'explique', 'texte': 'Le choix des mots révèle l’opinion de celui qui écrit. Dire « ce gamin » plutôt que « cet enfant » montre une distance ou du mépris.'},
                {'type': 'piege', 'erreur': 'On croit que deux synonymes sont toujours interchangeables.', 'correction': 'Leur connotation peut différer : « économe » et « radin » ne donnent pas la même image.'},
            ]),
        ],
        a_toi=[
            q('Lequel est mélioratif ?', ['svelte', 'maigrichon', 'mince'], 'Il valorise.'),
            q('La dénotation d’un mot est :', ['son sens de base', 'son origine', 'sa nuance positive'], 'Le sens du dictionnaire.'),
            q('« Un canasson » est :', ['un mot péjoratif pour cheval', 'un cheval de course', 'un mot soutenu'], 'Il dévalorise.'),
        ],
        sources=[ref('FR-C4-3E-VOC-52', 'Nuances de sens')]),

    'FR-C4-3E-VOC-53': dict(duree=6, essentiel=
        'Les modalisateurs montrent comment l’auteur considère ce qu’il dit : certain, douteux, approuvé ou critiqué.\n'
        'Ce sont des adverbes, des verbes, des adjectifs ou le conditionnel : « Il viendra sans doute » ; « ce prétendu expert ».\n'
        'Le conditionnel signale aussi une information non confirmée : « Le ministre aurait démissionné. »',
        parties=[
            ('Des marques', [
                {'type': 'tableau', 'titre': 'Les modalisateurs', 'colonnes': ['Marque', 'Exemple', 'Ce qu’elle montre'], 'lignes': [
                    ['adverbe', 'certainement, peut-être', 'certitude ou doute'], ['verbe', 'il semble que, je crois', 'doute'], ['adjectif', 'prétendu, soi-disant', 'jugement défavorable'], ['conditionnel', 'il aurait démissionné', 'information non confirmée']]},
                bq('« Le suspect aurait quitté la ville. » Le conditionnel indique :', ['une information non confirmée', 'un souhait', 'un ordre'], 'Le journaliste ne l’affirme pas.'),
            ]),
            ('Lire la presse', [
                {'type': 'explique', 'texte': 'Un journaliste prudent écrit « selon la police » ou emploie le conditionnel tant qu’un fait n’est pas vérifié.'},
                {'type': 'piege', 'erreur': 'On lit une phrase au conditionnel comme un fait établi.', 'correction': 'Le conditionnel journalistique signale qu’il faut attendre une confirmation.'},
            ]),
        ],
        a_toi=[
            q('« Ce soi-disant champion » exprime :', ['un jugement défavorable', 'une certitude', 'une admiration'], 'L’auteur doute de ce titre.'),
            q('« Il viendra peut-être. » exprime :', ['un doute', 'une certitude', 'un ordre'], 'Peut-être : incertitude.'),
            q('« Il est évident que tu as raison. » exprime :', ['une certitude', 'un doute', 'une information non confirmée'], 'Évident : aucun doute.'),
        ],
        sources=[ref('FR-C4-3E-VOC-53', 'Modalisation')]),

    'FR-C4-3E-LITT-51': dict(duree=7, essentiel=
        'Dans une autobiographie, l’auteur raconte sa propre vie : auteur, narrateur et personnage principal sont la même personne.\n'
        'Rousseau, dans Les Confessions, veut se montrer tel qu’il est, sans rien cacher.\n'
        'Il existe d’autres formes : mémoires, journal intime, autoportrait, roman autobiographique.',
        parties=[
            ('Les formes', [
                {'type': 'tableau', 'titre': 'Écrire sur soi', 'colonnes': ['Forme', 'Caractère', 'Exemple'], 'lignes': [
                    ['autobiographie', 'récit rétrospectif de sa vie', 'Rousseau, Les Confessions'], ['mémoires', 'sa vie liée aux évènements historiques', 'Chateaubriand, Mémoires d’outre-tombe'],
                    ['journal intime', 'notes datées, au jour le jour', 'Anne Frank, Journal'], ['roman autobiographique', 'vie de l’auteur, avec des éléments inventés', 'souvent avec un autre nom pour le héros']]},
                bq('Un récit écrit au jour le jour, avec des dates, est :', ['un journal intime', 'des mémoires', 'une biographie'], 'Comme le Journal d’Anne Frank.'),
            ]),
            ('Pourquoi se raconter ?', [
                {'type': 'observe', 'consigne': 'Des raisons d’écrire sur soi.', 'exemples': ['se comprendre', 'se justifier', 'témoigner d’une époque', 'garder la mémoire']},
                {'type': 'piege', 'erreur': 'On confond autobiographie et biographie.', 'correction': 'La biographie raconte la vie d’un autre. Dans l’autobiographie, on raconte sa propre vie.'},
            ]),
        ],
        a_toi=[
            q('Dans une autobiographie, le narrateur est :', ['l’auteur lui-même', 'un personnage inventé', 'un témoin extérieur'], 'Auteur, narrateur et personnage se confondent.'),
            q('Les Mémoires d’outre-tombe ont été écrits par :', ['Chateaubriand', 'Rousseau', 'Anne Frank'], 'Publiés après sa mort.'),
            q('Anne Frank a écrit son journal pendant :', ['la Seconde Guerre mondiale', 'la Révolution française', 'le Moyen Âge'], 'Cachée à Amsterdam.'),
        ],
        sources=[ref('FR-C4-3E-LITT-51', 'Se raconter, se représenter')]),

    'FR-C4-3E-LITT-52': dict(duree=7, essentiel=
        'La satire critique les défauts d’une société en s’en moquant.\n'
        'Ses procédés sont l’ironie, qui dit le contraire de ce qu’on pense, l’exagération et la caricature.\n'
        'Dans Candide (1759), Voltaire se moque de l’optimisme par l’ironie : son héros traverse les pires malheurs en répétant que tout va bien.',
        parties=[
            ('Les procédés', [
                {'type': 'tableau', 'titre': 'Se moquer pour critiquer', 'colonnes': ['Procédé', 'Exemple'], 'lignes': [
                    ['ironie', 'dire « Quelle belle journée ! » sous l’orage'], ['exagération', 'grossir un défaut jusqu’au ridicule'], ['caricature', 'dessin qui déforme les traits d’un puissant'], ['regard naïf', 'un étranger découvre les coutumes et les trouve absurdes']]},
                bq('L’ironie consiste à :', ['dire le contraire de ce qu’on pense pour se moquer', 'raconter sa vie', 'décrire avec précision'], 'Le lecteur comprend le vrai sens.'),
            ]),
            ('Des œuvres satiriques', [
                {'type': 'tableau', 'titre': 'Quelques exemples', 'colonnes': ['Œuvre', 'Cible'], 'lignes': [
                    ['Montesquieu, Lettres persanes (1721)', 'les mœurs et le pouvoir en France'], ['Voltaire, Candide (1759)', 'l’optimisme, la guerre, l’intolérance'], ['Daumier, caricatures (XIXe siècle)', 'les hommes politiques, les juges']]},
                {'type': 'piege', 'erreur': 'On lit une phrase ironique au premier degré.', 'correction': 'On repère le décalage entre ce qui est dit et la situation : c’est lui qui révèle la critique.'},
            ]),
        ],
        a_toi=[
            q('Candide a été écrit par :', ['Voltaire', 'Rousseau', 'Molière'], 'En 1759.'),
            q('Une caricature :', ['déforme pour critiquer', 'représente fidèlement', 'raconte une vie'], 'Elle exagère les traits.'),
            q('Les Lettres persanes utilisent :', ['le regard de voyageurs étrangers', 'un journal intime', 'des poèmes lyriques'], 'Des Persans découvrent la France.'),
        ],
        sources=[ref('FR-C4-3E-LITT-52', 'Dénoncer les travers de la société')]),

    'FR-C4-3E-LITT-53': dict(duree=7, essentiel=
        'Du romantisme à nos jours, les poètes proposent des visions personnelles du monde.\n'
        'La forme se libère : poème en prose avec Baudelaire, vers sans ponctuation chez Apollinaire, vers libre et langage courant chez Prévert.\n'
        'Rimbaud, dans « Le Dormeur du val » (1870), dénonce la guerre par une image paisible qui se révèle tragique.',
        parties=[
            ('Des poètes et des formes', [
                {'type': 'tableau', 'titre': 'Repères', 'colonnes': ['Poète', 'Œuvre', 'Forme'], 'lignes': [
                    ['Victor Hugo', 'Les Contemplations (1856)', 'vers réguliers, lyrisme romantique'], ['Baudelaire', 'Petits poèmes en prose (1869)', 'prose poétique'],
                    ['Rimbaud', '« Le Dormeur du val » (1870)', 'sonnet'], ['Apollinaire', 'Alcools (1913)', 'vers sans ponctuation'], ['Prévert', 'Paroles (1946)', 'vers libres, langage courant']]},
                bq('Un poème sans rimes ni mètre régulier est en :', ['vers libres', 'alexandrins', 'prose narrative'], 'Le rythme vient d’ailleurs.'),
            ]),
            ('Lire un poème', [
                {'type': 'methode', 'titre': 'Analyser une vision poétique', 'etapes': [
                    'Repère le thème et le regard du poète.', 'Observe la forme : vers, strophes, ponctuation.', 'Relève les images : comparaisons, métaphores.', 'Dis l’effet produit sur toi.']},
                {'type': 'piege', 'erreur': 'On croit qu’un texte sans rimes n’est pas un poème.', 'correction': 'La poésie tient aussi au rythme, aux images et au travail sur la langue.'},
            ]),
        ],
        a_toi=[
            q('Un sonnet compte :', ['14 vers', '12 vers', '8 vers'], 'Deux quatrains et deux tercets.'),
            q('Prévert écrit souvent :', ['en vers libres, avec des mots simples', 'en alexandrins stricts', 'en latin'], 'Dans Paroles.'),
            q('Le poème en prose :', ['n’est pas découpé en vers', 'a toujours des rimes', 'est une pièce de théâtre'], 'Comme chez Baudelaire.'),
        ],
        sources=[ref('FR-C4-3E-LITT-53', 'Visions poétiques du monde')]),

    'FR-C4-3E-LITT-54': dict(duree=7, essentiel=
        'Au XXe siècle, face aux guerres et aux dictatures, des écrivains s’engagent.\n'
        'Pendant l’Occupation, Paul Éluard écrit « Liberté » (1942), poème de la Résistance diffusé clandestinement.\n'
        'D’autres témoignent après coup, comme Primo Levi dans Si c’est un homme (1947), sur les camps d’extermination.',
        parties=[
            ('Des écrivains engagés', [
                {'type': 'tableau', 'titre': 'Écrire contre l’oppression', 'colonnes': ['Auteur', 'Œuvre', 'Engagement'], 'lignes': [
                    ['Paul Éluard', '« Liberté » (1942)', 'poème de la Résistance'], ['Primo Levi', 'Si c’est un homme (1947)', 'témoignage sur Auschwitz'], ['George Orwell', '1984 (1949)', 'roman contre le totalitarisme'], ['Elie Wiesel', 'La Nuit (1958)', 'témoignage sur la déportation']]},
                bq('Pendant l’Occupation, la poésie de la Résistance circule :', ['clandestinement', 'dans les journaux officiels', 'à la radio d’État'], 'Elle est interdite.'),
            ]),
            ('Pourquoi écrire ?', [
                {'type': 'observe', 'consigne': 'Les buts de l’écrivain engagé.', 'exemples': ['dénoncer une injustice', 'donner du courage', 'témoigner pour ne pas oublier', 'faire réfléchir le lecteur']},
                {'type': 'piege', 'erreur': 'On croit qu’un roman comme 1984 raconte des faits réels.', 'correction': 'Orwell invente un monde pour alerter sur les dangers réels des régimes totalitaires.'},
            ]),
        ],
        a_toi=[
            q('Un écrivain engagé :', ['met son écriture au service d’une cause', 'n’écrit que pour divertir', 'refuse de publier'], 'Il prend position.'),
            q('Primo Levi témoigne sur :', ['les camps d’extermination', 'la Révolution française', 'la conquête spatiale'], 'Il a été déporté à Auschwitz.'),
            q('« Liberté » de Paul Éluard date de :', ['1942', '1789', '1968'], 'Pendant l’Occupation.'),
        ],
        sources=[ref('FR-C4-3E-LITT-54', 'Agir dans la cité : individu et pouvoir')]),

    'FR-C4-3E-LITT-55': dict(duree=6, essentiel=
        'Le récit d’anticipation imagine un futur à partir des progrès scientifiques : Jules Verne décrit le sous-marin Nautilus dans Vingt mille lieues sous les mers (1870).\n'
        'L’utopie imagine une société idéale. La dystopie imagine une société cauchemardesque, souvent contrôlée par la technique.\n'
        'Ces récits interrogent les espoirs et les dangers du progrès.',
        parties=[
            ('Trois genres', [
                {'type': 'tableau', 'titre': 'Imaginer l’avenir', 'colonnes': ['Genre', 'Caractère', 'Exemple'], 'lignes': [
                    ['anticipation', 'futur imaginé à partir de la science', 'Jules Verne, Vingt mille lieues sous les mers'], ['utopie', 'société idéale', 'Thomas More, Utopia (1516)'], ['dystopie', 'société oppressive', 'Huxley, Le Meilleur des mondes (1932) ; Bradbury, Fahrenheit 451 (1953)']]},
                bq('Une dystopie décrit :', ['une société oppressive', 'une société idéale', 'la vie d’un savant'], 'C’est l’inverse de l’utopie.'),
            ]),
            ('Ce que disent ces récits', [
                {'type': 'explique', 'texte': 'Dans Fahrenheit 451, les livres sont brulés. Le roman alerte sur une société qui renonce à penser.'},
                {'type': 'piege', 'erreur': 'On croit que la science-fiction ne parle que du futur.', 'correction': 'Elle parle souvent du présent : elle grossit des tendances actuelles pour les faire voir.'},
            ]),
        ],
        a_toi=[
            q('Le mot utopie vient du grec et signifie :', ['nulle part', 'partout', 'demain'], 'Un lieu qui n’existe pas.'),
            q('Jules Verne écrit des récits :', ['d’anticipation', 'autobiographiques', 'tragiques du XVIIe siècle'], 'Il imagine des inventions à venir.'),
            q('Dans Fahrenheit 451, on brule :', ['des livres', 'des forêts', 'des ordinateurs'], 'Le titre évoque la température à laquelle le papier s’enflamme.'),
        ],
        sources=[ref('FR-C4-3E-LITT-55', 'Progrès et rêves scientifiques')]),

    'FR-C4-3E-ORAL-51': dict(duree=6, essentiel=
        'Dans un débat, on exprime une opinion, on la justifie par des arguments et des exemples.\n'
        'On réfute un argument adverse en montrant ses limites, sans attaquer la personne.\n'
        'On écoute et on respecte la parole de l’autre : « Je comprends ton argument, mais je pense au contraire que… »',
        parties=[
            ('Prendre la parole', [
                {'type': 'tableau', 'titre': 'Des formules utiles', 'colonnes': ['Pour…', 'Formule'], 'lignes': [
                    ['donner son avis', 'À mon sens… Je suis convaincu que…'], ['concéder', 'Certes… Il est vrai que…'], ['réfuter', 'Cependant… Ton exemple ne prouve pas que…'], ['relancer', 'Que réponds-tu à… ?']]},
                bq('« Certes, les écrans aident à apprendre, mais… » Ce début :', ['concède un point avant de réfuter', 'insulte l’adversaire', 'change de sujet'], 'Certes : on reconnait un argument.'),
            ]),
            ('Les règles du débat', [
                {'type': 'observe', 'consigne': 'Pour un débat respectueux.', 'exemples': ['attendre son tour', 'reformuler l’argument de l’autre avant d’y répondre', 'critiquer les idées, jamais les personnes', 'appuyer ses arguments sur des faits']},
                {'type': 'piege', 'erreur': 'On répond « c’est n’importe quoi » sans argument.', 'correction': 'On explique pourquoi l’argument ne tient pas, avec une raison ou un fait.'},
            ]),
        ],
        a_toi=[
            q('Réfuter un argument, c’est :', ['montrer qu’il n’est pas valable', 'le répéter', 'l’ignorer'], 'Avec une raison.'),
            q('Concéder, c’est :', ['reconnaitre en partie la valeur d’un argument adverse', 'abandonner le débat', 'couper la parole'], 'Certes…, mais…'),
            q('Dans un débat, on critique :', ['les idées', 'les personnes', 'l’apparence des autres'], 'Le respect est la règle.'),
        ],
        sources=[ref('FR-C4-3E-ORAL-51', 'Débattre et défendre une opinion')]),

    'FR-C4-3E-LECT-51': dict(duree=7, essentiel=
        'Un registre est la tonalité d’un texte, l’effet qu’il cherche à produire sur le lecteur.\n'
        'Lyrique : sentiments ; tragique : fatalité ; comique : rire ; épique : exploits grandioses ; pathétique : pitié ; satirique : moquerie critique.\n'
        'Le registre pathétique cherche à émouvoir par la souffrance d’un personnage.',
        parties=[
            ('Six registres', [
                {'type': 'tableau', 'titre': 'Registres et effets', 'colonnes': ['Registre', 'Effet recherché', 'Indices'], 'lignes': [
                    ['lyrique', 'partager des émotions', 'je, sentiments, apostrophes'], ['tragique', 'terreur et pitié face au destin', 'fatalité, mort, dilemme'], ['comique', 'faire rire', 'quiproquos, exagération, jeux de mots'],
                    ['épique', 'admiration', 'combats, hyperboles, héros'], ['pathétique', 'pitié, larmes', 'souffrance, plaintes'], ['satirique', 'critique par le rire', 'ironie, caricature']]},
                bq('Un récit de bataille où le héros affronte seul cent ennemis relève du registre :', ['épique', 'lyrique', 'comique'], 'Exploits et exagérations.'),
            ]),
            ('Pathétique ou tragique ?', [
                {'type': 'explique', 'texte': 'Le pathétique montre une souffrance pour émouvoir. Le tragique y ajoute la fatalité : le personnage ne peut pas échapper à son destin.'},
                {'type': 'piege', 'erreur': 'On confond registre et genre : « le texte est une tragédie, donc il est forcément tragique ».', 'correction': 'Le genre est la forme de l’œuvre. Le registre est l’effet produit : une comédie peut contenir un passage pathétique.'},
            ]),
        ],
        a_toi=[
            q('Un texte qui fait rire par des quiproquos relève du registre :', ['comique', 'épique', 'pathétique'], 'Le malentendu crée le rire.'),
            q('Un personnage condamné par le destin, quoi qu’il fasse : registre', ['tragique', 'comique', 'satirique'], 'La fatalité.'),
            q('Le registre lyrique exprime :', ['des sentiments personnels', 'des exploits guerriers', 'une critique sociale'], 'Souvent à la première personne.'),
        ],
        sources=[ref('FR-C4-3E-LECT-51', 'Registres et effets sur le lecteur')]),

    'FR-C4-3E-ECR-51': dict(duree=6, essentiel=
        'Réviser un texte, c’est l’améliorer : cohérence, enchainement des idées, précision du vocabulaire, syntaxe et orthographe.\n'
        'On remplace les tournures lourdes : « Il y a des gens qui pensent » devient « Certains pensent ».\n'
        'On relit une fois par critère, à voix basse si possible.',
        parties=[
            ('Alléger et préciser', [
                {'type': 'tableau', 'titre': 'Avant, après', 'colonnes': ['Avant', 'Après'], 'lignes': [
                    ['Il y a des gens qui pensent que…', 'Certains pensent que…'], ['Il a fait un truc bien.', 'Il a accompli un exploit.'], ['Il dit que c’est vrai. Il dit aussi que…', 'Il affirme que c’est vrai et ajoute que…'], ['C’est une chose importante.', 'C’est un enjeu majeur.']]},
                bq('« Il y a un garçon qui court » devient plutôt :', ['Un garçon court.', 'Il y a un garçon courant.', 'Il y a un garçon qui court vite.'], 'On supprime « il y a… qui ».'),
            ]),
            ('Une grille de révision', [
                {'type': 'methode', 'titre': 'Relire en quatre passages', 'etapes': [
                    'Le sens : la consigne est-elle respectée, les idées s’enchainent-elles ?', 'Le vocabulaire : chaque mot vague est-il remplacé ?', 'Les phrases : sont-elles complètes, pas trop longues ?', 'L’orthographe : accords, conjugaisons, homophones.']},
                {'type': 'piege', 'erreur': 'On réécrit tout le texte au lieu de corriger ce qui ne va pas.', 'correction': 'On garde ce qui fonctionne et on améliore point par point.'},
            ]),
        ],
        a_toi=[
            q('« Faire » est souvent un verbe :', ['trop vague, à remplacer', 'toujours précis', 'interdit'], 'Fabriquer, réaliser, accomplir…'),
            q('Un texte cohérent :', ['ne se contredit pas et suit un ordre logique', 'n’a aucune faute d’orthographe', 'est très long'], 'Les idées s’enchainent.'),
            q('« Il y a des élèves qui travaillent » devient :', ['Des élèves travaillent.', 'Il y a des élèves travaillant.', 'Il y a des élèves.'], 'Plus direct.'),
        ],
        sources=[ref('FR-C4-3E-ECR-51', 'Améliorer son écrit')]),
}

ecrire(COURS)
