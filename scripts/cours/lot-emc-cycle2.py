"""Lot de cours : EMC cycle 2, CP, CE1, CE2 (programme 2024). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-emc-cycle2.py
    python3 scripts/cours/pages.py content/cours/EM-C2-*.json

Cycle 2 : phrases de 12 mots au plus (bloquant). Ton chaleureux, une action par consigne.
Numéros d'urgence : 15 (SAMU), 17 (police), 18 (pompiers), 112 (européen), 119 (enfance en danger).
"""
from commun import bq, ecrire, q, source_referentiel as ref

COURS = {
    # ----------------------------------------------------------------------- CP
    'EM-C2-CP-SOI-01': dict(duree=5, essentiel=
        'Je peux ressentir de la joie, de la tristesse, de la peur.\n'
        'Je peux aussi ressentir de la colère ou de la surprise.\n'
        'Je dis ce que je ressens avec des mots, sans taper.',
        parties=[
            ('Nommer mes émotions', [
                {'type': 'tableau', 'titre': 'Cinq émotions', 'colonnes': ['Émotion', 'Exemple'], 'lignes': [
                    ['joie', 'Je ris avec mes amis.'], ['tristesse', 'Mon doudou est perdu.'], ['peur', 'L’orage gronde.'], ['colère', 'On a cassé mon dessin.'], ['surprise', 'Un cadeau inattendu !']]},
                bq('Ton ami a cassé ton jouet. Que fais-tu ?', ['Je dis que je suis en colère.', 'Je le tape.', 'Je crie très fort.'], 'Les mots aident à se calmer.'),
            ]),
            ('Se calmer', [
                {'type': 'methode', 'titre': 'Quand je suis en colère', 'etapes': ['Je respire lentement.', 'Je compte jusqu’à cinq.', 'Je dis ce qui ne va pas.']},
                {'type': 'piege', 'erreur': 'On croit que la colère est interdite.', 'correction': 'Toutes les émotions sont normales. On apprend à les dire.'},
            ]),
        ],
        a_toi=[
            q('Tu pleures car ton chat est malade. Tu ressens :', ['de la tristesse', 'de la joie', 'de la surprise'], 'Tu as du chagrin.'),
            q('Pour dire ta colère, tu utilises :', ['des mots', 'tes poings', 'des cris'], 'Les mots, sans violence.'),
            q('Les émotions sont :', ['normales', 'interdites', 'rares'], 'Tout le monde en ressent.'),
        ],
        sources=[ref('EM-C2-CP-SOI-01', 'Mes émotions')]),

    'EM-C2-CP-REG-01': dict(duree=5, essentiel=
        'À l’école, des règles nous permettent de bien vivre ensemble.\n'
        'J’ai des droits : apprendre, être protégé, être respecté.\n'
        'J’ai des devoirs : respecter les autres et les règles.',
        parties=[
            ('Les règles de la classe', [
                {'type': 'tableau', 'titre': 'Droits et devoirs', 'colonnes': ['J’ai le droit de…', 'Je dois…'], 'lignes': [
                    ['apprendre', 'écouter la maitresse ou le maitre'], ['parler', 'lever la main'], ['jouer', 'respecter les autres']]},
                bq('Pour parler en classe, je :', ['lève la main', 'crie mon idée', 'coupe la parole'], 'Chacun parle à son tour.'),
            ]),
            ('Les adultes de l’école', [
                {'type': 'explique', 'texte': 'Les adultes de l’école m’aident et me protègent. Je peux leur parler.'},
                {'type': 'piege', 'erreur': 'On croit que les règles servent à punir.', 'correction': 'Les règles protègent chacun. Elles aident à apprendre.'},
            ]),
        ],
        a_toi=[
            q('À l’école, j’ai le droit :', ['d’apprendre', 'de taper', 'de casser'], 'C’est un droit pour tous.'),
            q('Si un camarade me fait mal, je :', ['le dis à un adulte', 'le tape', 'ne dis rien'], 'Les adultes me protègent.'),
            q('Les règles servent à :', ['bien vivre ensemble', 'punir', 'rien'], 'Elles protègent chacun.'),
        ],
        sources=[ref('EM-C2-CP-REG-01', 'Les règles de l’école')]),

    'EM-C2-CP-DRO-01': dict(duree=5, essentiel=
        'Mon corps m’appartient.\n'
        'Personne n’a le droit de me toucher si je ne veux pas.\n'
        'Si quelque chose me gêne, j’en parle à un adulte de confiance.',
        parties=[
            ('Je respecte mon corps', [
                {'type': 'explique', 'texte': 'Je peux dire non. Je respecte aussi le corps des autres.'},
                bq('Un adulte me demande de garder un secret qui me gêne. Je :', ['en parle à un adulte de confiance', 'garde le secret', 'n’en parle à personne'], 'Un secret qui fait mal doit être dit.'),
            ]),
            ('À qui parler ?', [
                {'type': 'observe', 'consigne': 'Des adultes de confiance.', 'exemples': ['mes parents', 'ma maitresse ou mon maitre', 'l’infirmière de l’école', 'le 119, un numéro gratuit']},
                {'type': 'piege', 'erreur': 'On croit qu’on sera grondé si on parle.', 'correction': 'Ce n’est jamais la faute de l’enfant. Parler, c’est se protéger.'},
            ]),
        ],
        a_toi=[
            q('Mon corps :', ['m’appartient', 'appartient à tout le monde', 'n’est pas à moi'], 'Je décide pour mon corps.'),
            q('Un secret qui me rend triste, je :', ['le dis à un adulte de confiance', 'le garde pour moi', 'l’oublie'], 'Parler me protège.'),
            q('Le 119 est un numéro pour :', ['les enfants en danger', 'commander une pizza', 'appeler un ami'], 'Il est gratuit.'),
        ],
        sources=[ref('EM-C2-CP-DRO-01', 'Mon corps, mes droits')]),

    'EM-C2-CP-REP-01': dict(duree=4, essentiel=
        'Le drapeau français est bleu, blanc, rouge.\n'
        'L’hymne national est La Marseillaise.\n'
        'Ce sont des symboles de la République française.',
        parties=[
            ('Le drapeau', [
                {'type': 'observe', 'consigne': 'Où voit-on le drapeau ?', 'exemples': ['sur la mairie', 'sur l’école', 'lors des fêtes nationales']},
                bq('Les couleurs du drapeau français sont :', ['bleu, blanc, rouge', 'vert, blanc, rouge', 'bleu, jaune, rouge'], 'Dans cet ordre, de gauche à droite.'),
            ]),
            ('L’hymne', [
                {'type': 'explique', 'texte': 'La Marseillaise se chante lors des fêtes nationales. On l’écoute debout, avec respect.'},
                {'type': 'piege', 'erreur': 'On croit que l’hymne est une chanson comme les autres.', 'correction': 'C’est le chant de la République. On le respecte.'},
            ]),
        ],
        a_toi=[
            q('L’hymne national s’appelle :', ['La Marseillaise', 'Frère Jacques', 'Au clair de la lune'], 'Le chant de la République.'),
            q('Le drapeau flotte souvent sur :', ['la mairie', 'la boulangerie', 'le parc'], 'Un bâtiment public.'),
            q('Quelle couleur est au milieu du drapeau ?', ['blanc', 'bleu', 'rouge'], 'Bleu, blanc, rouge.'),
        ],
        sources=[ref('EM-C2-CP-REP-01', 'Le drapeau et la Marseillaise')]),

    'EM-C2-CP-SEC-01': dict(duree=5, essentiel=
        'Dans la rue, je traverse sur le passage piéton.\n'
        'J’attends que le bonhomme soit vert.\n'
        'À la maison, je ne touche pas aux prises.',
        parties=[
            ('Dans la rue', [
                {'type': 'methode', 'titre': 'Pour traverser', 'etapes': ['Je m’arrête au bord du trottoir.', 'J’attends le bonhomme vert.', 'Je regarde à gauche, puis à droite.', 'Je traverse sans courir.']},
                bq('Le bonhomme est rouge. Je :', ['m’arrête', 'traverse vite', 'cours'], 'Rouge veut dire stop.'),
            ]),
            ('À la maison', [
                {'type': 'observe', 'consigne': 'Des dangers à éviter.', 'exemples': ['les prises électriques', 'les produits ménagers', 'les médicaments', 'la cuisinière chaude']},
                {'type': 'piege', 'erreur': 'On croit qu’un produit coloré est un jus.', 'correction': 'On ne goute jamais un produit inconnu. On demande à un adulte.'},
            ]),
        ],
        a_toi=[
            q('Pour traverser, je vais :', ['au passage piéton', 'entre deux voitures', 'n’importe où'], 'C’est l’endroit prévu.'),
            q('Une prise électrique, je :', ['n’y touche pas', 'y mets un doigt', 'y mets une fourchette'], 'Le courant est dangereux.'),
            q('Un médicament trouvé par terre, je :', ['le donne à un adulte', 'le goute', 'le garde'], 'Il peut être dangereux.'),
        ],
        sources=[ref('EM-C2-CP-SEC-01', 'Les dangers autour de moi')]),

    'EM-C2-CP-CIDE-01': dict(duree=4, essentiel=
        'Tous les enfants du monde ont des droits.\n'
        'Ils ont le droit d’être protégés et soignés.\nIls ont le droit d’aller à l’école et de jouer.\n'
        'Presque tous les pays ont signé le texte de ces droits.',
        parties=[
            ('Des droits pour tous les enfants', [
                {'type': 'tableau', 'titre': 'Quelques droits', 'colonnes': ['Droit', 'Exemple'], 'lignes': [
                    ['être protégé', 'personne ne doit me faire de mal'], ['être soigné', 'je vais chez le médecin'], ['aller à l’école', 'j’apprends à lire'], ['jouer', 'je joue à la récréation']]},
                bq('Tous les enfants ont le droit :', ['d’aller à l’école', 'de conduire une voiture', 'de voter'], 'Pour apprendre.'),
            ]),
            ('Un texte important', [
                {'type': 'explique', 'texte': 'La Convention des droits de l’enfant date de 1989. On la fête le 20 novembre.'},
                {'type': 'piege', 'erreur': 'On croit que ces droits concernent seulement les enfants français.', 'correction': 'Ils concernent tous les enfants du monde.'},
            ]),
        ],
        a_toi=[
            q('Jouer est :', ['un droit de l’enfant', 'interdit', 'réservé aux adultes'], 'Les enfants ont le droit de jouer.'),
            q('Les droits de l’enfant concernent :', ['tous les enfants du monde', 'seulement les enfants riches', 'seulement les grands'], 'Chaque enfant.'),
            q('La journée des droits de l’enfant est le :', ['20 novembre', '14 juillet', '1er janvier'], 'Chaque année.'),
        ],
        sources=[ref('EM-C2-CP-CIDE-01', 'Les droits de l’enfant')]),

    'EM-C2-CP-HYG-01': dict(duree=4, essentiel=
        'Je me lave les mains avant de manger et après les toilettes.\n'
        'Je me brosse les dents matin et soir.\n'
        'Je tousse ou j’éternue dans mon coude.',
        parties=[
            ('Se laver les mains', [
                {'type': 'methode', 'titre': 'Bien se laver les mains', 'etapes': ['Je mouille mes mains.', 'Je mets du savon.', 'Je frotte partout, entre les doigts.', 'Je rince et je sèche.']},
                bq('Je me lave les mains :', ['avant de manger', 'seulement le dimanche', 'jamais'], 'Pour enlever les microbes.'),
            ]),
            ('Protéger les autres', [
                {'type': 'explique', 'texte': 'Les microbes passent d’une personne à l’autre. Le coude les arrête.'},
                {'type': 'piege', 'erreur': 'On tousse dans sa main.', 'correction': 'La main touche tout ensuite. On tousse dans son coude.'},
            ]),
        ],
        a_toi=[
            q('Quand j’éternue, je mets :', ['mon coude', 'ma main', 'rien'], 'Le coude arrête les microbes.'),
            q('Je me brosse les dents :', ['matin et soir', 'une fois par semaine', 'jamais'], 'Pour garder des dents saines.'),
            q('Après les toilettes, je :', ['me lave les mains', 'joue tout de suite', 'mange'], 'Avec du savon.'),
        ],
        sources=[ref('EM-C2-CP-HYG-01', 'Prendre soin de son corps')]),

    'EM-C2-CP-COL-01': dict(duree=4, essentiel=
        'Le matériel de la classe appartient à tous.\n'
        'J’en prends soin pour que chacun puisse l’utiliser.\n'
        'Je range après avoir utilisé un livre ou un jeu.',
        parties=[
            ('Prendre soin', [
                {'type': 'observe', 'consigne': 'Le matériel commun.', 'exemples': ['les livres de la bibliothèque', 'les jeux de la cour', 'les feutres de la classe']},
                bq('Après avoir lu un livre de la classe, je :', ['le range', 'le laisse par terre', 'le garde'], 'Un autre pourra le lire.'),
            ]),
            ('Pourquoi ?', [
                {'type': 'piege', 'erreur': 'On croit que le matériel commun n’est à personne.', 'correction': 'Il est à tout le monde. On en prend soin ensemble.'},
            ]),
        ],
        a_toi=[
            q('Un feutre de la classe sans bouchon, je :', ['remets le bouchon', 'le jette', 'le laisse sécher'], 'Il servira encore.'),
            q('Le matériel de la classe est :', ['à tout le monde', 'à personne', 'à moi seul'], 'On le partage.'),
            q('Après un jeu, je :', ['range les pièces', 'les éparpille', 'les cache'], 'Pour les prochains joueurs.'),
        ],
        sources=[ref('EM-C2-CP-COL-01', 'Respecter le matériel commun')]),

    # ---------------------------------------------------------------------- CE1
    'EM-C2-CE1-ALT-01': dict(duree=5, essentiel=
        'Je fais attention aux émotions des autres.\n'
        'Je propose mon aide à un camarade seul ou triste.\n'
        'Je refuse les moqueries.',
        parties=[
            ('S’entraider', [
                {'type': 'observe', 'consigne': 'Des gestes d’entraide.', 'exemples': ['Je propose à un camarade seul de jouer.', 'J’aide un ami à ramasser ses affaires.', 'J’explique une consigne à un voisin.']},
                bq('Un camarade pleure dans la cour. Je :', ['lui demande ce qui ne va pas', 'me moque de lui', 'fais comme si de rien n’était'], 'Je fais attention à lui.'),
            ]),
            ('Refuser les moqueries', [
                {'type': 'piege', 'erreur': 'On croit que se moquer, c’est juste pour rire.', 'correction': 'La moquerie blesse. On peut rire avec quelqu’un, pas de quelqu’un.'},
            ]),
        ],
        a_toi=[
            q('Un nouvel élève est seul. Je :', ['l’invite à jouer', 'l’ignore', 'me moque de lui'], 'Je l’accueille.'),
            q('Se moquer de quelqu’un :', ['le blesse', 'le fait rire', 'n’a aucun effet'], 'La moquerie fait mal.'),
            q('S’entraider, c’est :', ['s’aider les uns les autres', 's’ignorer', 'se disputer'], 'Chacun aide l’autre.'),
        ],
        sources=[ref('EM-C2-CE1-ALT-01', 'Respecter les autres')]),

    'EM-C2-CE1-REG-01': dict(duree=5, essentiel=
        'Les règles de la vie collective protègent chacun.\n'
        'Je repère un danger et je préviens un adulte.\n'
        'En cas d’urgence, j’appelle le 15, le 17 ou le 18.',
        parties=[
            ('Des règles pour tous', [
                {'type': 'observe', 'consigne': 'Dans la cour.', 'exemples': ['Je ne pousse pas.', 'Je joue sans faire mal.', 'Je respecte les jeux des autres.']},
                bq('Un camarade est tombé et saigne. Je :', ['préviens un adulte', 'le laisse', 'continue de jouer'], 'L’adulte va l’aider.'),
            ]),
            ('Les numéros d’urgence', [
                {'type': 'tableau', 'titre': 'Qui appeler ?', 'colonnes': ['Numéro', 'Pour quoi ?'], 'lignes': [
                    ['15', 'un malade, un blessé'], ['17', 'la police'], ['18', 'un feu, un accident'], ['112', 'une urgence, partout en Europe']]},
                {'type': 'piege', 'erreur': 'On appelle les secours pour jouer.', 'correction': 'Les numéros d’urgence servent seulement en cas de danger.'},
            ]),
        ],
        a_toi=[
            q('Pour un feu, j’appelle le :', ['18', '15', '17'], 'Ce sont les pompiers.'),
            q('Pour un malade, j’appelle le :', ['15', '18', '17'], 'C’est le SAMU.'),
            q('Je vois un danger dans la cour. Je :', ['préviens un adulte', 'ne dis rien', 'me cache'], 'L’adulte peut agir.'),
        ],
        sources=[ref('EM-C2-CE1-REG-01', 'Les règles et la sécurité')]),

    'EM-C2-CE1-REP-01': dict(duree=4, essentiel=
        'La devise de la République est « Liberté, Égalité, Fraternité ».\n'
        'On la lit sur les mairies et les écoles.\n'
        'Le drapeau, La Marseillaise et Marianne sont d’autres symboles.',
        parties=[
            ('Les symboles', [
                {'type': 'tableau', 'titre': 'Les symboles de la République', 'colonnes': ['Symbole', 'À retenir'], 'lignes': [
                    ['drapeau', 'bleu, blanc, rouge'], ['hymne', 'La Marseillaise'], ['devise', 'Liberté, Égalité, Fraternité'], ['Marianne', 'une femme qui représente la République']]},
                bq('La devise de la République est :', ['Liberté, Égalité, Fraternité', 'Un pour tous, tous pour un', 'Travail, Jeu, Repos'], 'Elle est sur les mairies.'),
            ]),
            ('Comprendre la devise', [
                {'type': 'explique', 'texte': 'Liberté : je peux penser et parler. Égalité : on a tous les mêmes droits. Fraternité : on s’entraide.'},
                {'type': 'piege', 'erreur': 'On croit que Marianne est une vraie personne célèbre.', 'correction': 'Marianne est un symbole. Elle représente la République.'},
            ]),
        ],
        a_toi=[
            q('Marianne représente :', ['la République', 'une reine', 'une actrice'], 'Son buste est dans les mairies.'),
            q('Fraternité veut dire :', ['s’entraider', 'se disputer', 'être seul'], 'Comme des frères et sœurs.'),
            q('Égalité veut dire :', ['les mêmes droits pour tous', 'la même taille pour tous', 'les mêmes vêtements'], 'Devant la loi.'),
        ],
        sources=[ref('EM-C2-CE1-REP-01', 'Les symboles de la République')]),

    'EM-C2-CE1-DIV-01': dict(duree=4, essentiel=
        'Nous sommes tous différents.\n'
        'Ces différences sont une richesse.\n'
        'Je refuse de me moquer de quelqu’un pour sa différence.',
        parties=[
            ('Tous différents', [
                {'type': 'observe', 'consigne': 'Des différences.', 'exemples': ['Inès porte des lunettes.', 'Léo est petit.', 'Sami parle deux langues.', 'Emma est en fauteuil roulant.']},
                bq('Inès porte des lunettes. C’est :', ['une différence, pas une raison de se moquer', 'une raison de rire', 'interdit'], 'On la respecte.'),
            ]),
            ('Refuser les préjugés', [
                {'type': 'piege', 'erreur': 'On croit que les filles ne jouent pas au foot.', 'correction': 'C’est un préjugé. Chacun peut jouer à ce qu’il aime.'},
            ]),
        ],
        a_toi=[
            q('Les différences entre nous sont :', ['une richesse', 'un problème', 'interdites'], 'On apprend des autres.'),
            q('« Les garçons ne dansent pas » est :', ['un préjugé', 'une vérité', 'une règle'], 'Chacun peut danser.'),
            q('Un camarade parle une autre langue à la maison. C’est :', ['une richesse', 'une faute', 'interdit'], 'Il connait deux langues.'),
        ],
        sources=[ref('EM-C2-CE1-DIV-01', 'La différence, une richesse')]),

    'EM-C2-CE1-LAI-01': dict(duree=4, essentiel=
        'Chacun est libre de croire ou de ne pas croire.\n'
        'À l’école publique, chacun est respecté, quelle que soit sa religion.\n'
        'Le français est la langue de la République.',
        parties=[
            ('La liberté de croire', [
                {'type': 'explique', 'texte': 'À l’école, on n’impose pas de religion. On respecte les croyances de chacun.'},
                bq('À l’école publique, chacun est respecté :', ['quelle que soit sa religion', 's’il a la même religion que les autres', 'jamais'], 'C’est la laïcité.'),
            ]),
            ('Une langue commune', [
                {'type': 'explique', 'texte': 'À l’école, on apprend en français. On peut aussi parler d’autres langues à la maison.'},
                {'type': 'piege', 'erreur': 'On croit qu’on doit avoir la même religion pour être amis.', 'correction': 'On peut être amis et croire différemment.'},
            ]),
        ],
        a_toi=[
            q('Chacun est libre :', ['de croire ou de ne pas croire', 'd’imposer sa religion', 'de se moquer des autres'], 'C’est une liberté.'),
            q('La langue de la République est :', ['le français', 'l’anglais', 'le latin'], 'On apprend en français.'),
            q('Un ami a une autre religion que moi. Je :', ['le respecte', 'me moque', 'l’ignore'], 'Chacun est libre.'),
        ],
        sources=[ref('EM-C2-CE1-LAI-01', 'Laïcité et langue française')]),

    'EM-C2-CE1-CIV-01': dict(duree=4, essentiel=
        'Je dis bonjour, s’il te plait, merci et pardon.\n'
        'J’écoute quand quelqu’un parle.\n'
        'La politesse aide à bien vivre ensemble.',
        parties=[
            ('Les mots magiques', [
                {'type': 'tableau', 'titre': 'Quand les dire ?', 'colonnes': ['Mot', 'Quand ?'], 'lignes': [
                    ['bonjour', 'j’arrive'], ['s’il te plait', 'je demande'], ['merci', 'on m’aide'], ['pardon', 'je bouscule quelqu’un']]},
                bq('Un camarade me prête sa gomme. Je dis :', ['merci', 'pardon', 'au revoir'], 'Je le remercie.'),
            ]),
            ('Écouter', [
                {'type': 'piege', 'erreur': 'On coupe la parole pour aller plus vite.', 'correction': 'On attend son tour. Chacun a le droit de finir.'},
            ]),
        ],
        a_toi=[
            q('Je bouscule quelqu’un sans le faire exprès. Je dis :', ['pardon', 'merci', 'bonjour'], 'Je m’excuse.'),
            q('Pour demander un crayon, je dis :', ['s’il te plait', 'donne', 'vite'], 'Je demande poliment.'),
            q('Quand quelqu’un parle, je :', ['l’écoute', 'parle plus fort', 'pars'], 'J’attends mon tour.'),
        ],
        sources=[ref('EM-C2-CE1-CIV-01', 'La politesse et la civilité')]),

    'EM-C2-CE1-ALERT-01': dict(duree=5, essentiel=
        'Devant un danger, je me protège d’abord.\n'
        'Puis j’alerte : j’appelle le bon numéro.\n'
        'Je dis mon nom, le lieu et ce qui se passe.',
        parties=[
            ('Passer un message d’alerte', [
                {'type': 'methode', 'titre': 'Au téléphone', 'etapes': ['Je donne mon nom.', 'Je dis où je suis.', 'Je dis ce qui se passe.', 'Je ne raccroche pas avant qu’on me le dise.']},
                bq('Au téléphone avec les secours, je dis d’abord :', ['qui je suis et où je suis', 'mon jeu préféré', 'rien'], 'Les secours doivent me trouver.'),
            ]),
            ('Le bon numéro', [
                {'type': 'tableau', 'titre': 'Numéros d’urgence', 'colonnes': ['Numéro', 'Situation'], 'lignes': [
                    ['15', 'une personne malade ou blessée'], ['17', 'une bagarre, un vol'], ['18', 'un feu'], ['112', 'toute urgence']]},
                {'type': 'piege', 'erreur': 'On raccroche très vite.', 'correction': 'On attend que les secours aient tout compris.'},
            ]),
        ],
        a_toi=[
            q('Mamie ne se réveille pas. J’appelle le :', ['15', '17', '18'], 'Le SAMU soigne.'),
            q('Je vois de la fumée dans un immeuble. J’appelle le :', ['18', '15', '17'], 'Les pompiers.'),
            q('Avant d’alerter, je :', ['me mets en sécurité', 'm’approche du danger', 'filme'], 'Je me protège d’abord.'),
        ],
        sources=[ref('EM-C2-CE1-ALERT-01', 'Donner l’alerte')]),

    'EM-C2-CE1-HARC-01': dict(duree=5, essentiel=
        'Le harcèlement, c’est être blessé souvent par les mêmes personnes.\n'
        'Il y a l’auteur, la cible et les témoins.\n'
        'Si je suis cible ou témoin, j’en parle à un adulte.',
        parties=[
            ('Reconnaitre le harcèlement', [
                {'type': 'tableau', 'titre': 'Trois rôles', 'colonnes': ['Rôle', 'Ce qu’il fait'], 'lignes': [
                    ['auteur', 'il se moque ou fait mal, encore et encore'], ['cible', 'elle subit les moqueries ou les coups'], ['témoin', 'il voit ce qui se passe']]},
                bq('Se moquer de quelqu’un tous les jours, c’est :', ['du harcèlement', 'un jeu', 'normal'], 'C’est répété et blessant.'),
            ]),
            ('Agir', [
                {'type': 'observe', 'consigne': 'Ce que je peux faire.', 'exemples': ['Je refuse de rire avec l’auteur.', 'Je reste avec la cible.', 'J’en parle à un adulte.', 'Le 3018 aide aussi, gratuitement.']},
                {'type': 'piege', 'erreur': 'On croit que parler à un adulte, c’est rapporter.', 'correction': 'Parler protège la cible. C’est courageux.'},
            ]),
        ],
        a_toi=[
            q('Je vois un camarade harcelé. Je :', ['en parle à un adulte', 'ris avec les autres', 'ne dis rien'], 'Le témoin peut aider.'),
            q('Le harcèlement est :', ['répété', 'arrivé une seule fois', 'un jeu'], 'Il se répète.'),
            q('Parler du harcèlement, c’est :', ['protéger la cible', 'rapporter', 'interdit'], 'C’est courageux.'),
        ],
        sources=[ref('EM-C2-CE1-HARC-01', 'Le harcèlement')]),

    # ---------------------------------------------------------------------- CE2
    'EM-C2-CE2-BIEN-01': dict(duree=5, essentiel=
        'Le bien commun appartient à tous : le parc, l’école, la rivière.\n'
        'J’en prends soin pour que chacun en profite.\n'
        'Protéger l’environnement, c’est aussi protéger le bien commun.',
        parties=[
            ('Prendre soin', [
                {'type': 'observe', 'consigne': 'Des biens communs.', 'exemples': ['le parc de la ville', 'la bibliothèque', 'la rivière', 'l’air que nous respirons']},
                bq('Le parc appartient :', ['à tous', 'au jardinier seul', 'à personne'], 'Chacun en profite.'),
            ]),
            ('Intérêt de chacun, intérêt de tous', [
                {'type': 'explique', 'texte': 'Je pourrais jeter mon papier par terre. Mais le parc serait sale pour tous.'},
                {'type': 'piege', 'erreur': 'On croit qu’un bien commun n’est à personne.', 'correction': 'Il est à tout le monde. Chacun doit le respecter.'},
            ]),
        ],
        a_toi=[
            q('Au parc, mon papier va :', ['dans la poubelle', 'par terre', 'dans l’herbe'], 'Le parc reste propre.'),
            q('L’air que nous respirons est :', ['un bien commun', 'à une seule personne', 'à vendre'], 'Il est à tous.'),
            q('Abimer un banc public, c’est :', ['abimer le bien de tous', 'sans importance', 'autorisé'], 'Il sert à tout le monde.'),
        ],
        sources=[ref('EM-C2-CE2-BIEN-01', 'Le bien commun')]),

    'EM-C2-CE2-SERV-01': dict(duree=5, essentiel=
        'Des services publics aident tout le monde.\n'
        'Les pompiers, la police, l’hôpital et l’école sont au service de tous.\n'
        'Des associations aident aussi les personnes.',
        parties=[
            ('Au service de tous', [
                {'type': 'tableau', 'titre': 'Qui fait quoi ?', 'colonnes': ['Service', 'Rôle'], 'lignes': [
                    ['pompiers (18)', 'éteindre les feux, secourir'], ['police (17)', 'protéger les personnes'], ['hôpital', 'soigner'], ['école', 'instruire tous les enfants']]},
                bq('Les pompiers viennent :', ['quand il y a un incendie', 'pour livrer les colis', 'pour faire les courses'], 'Leur numéro est le 18.'),
            ]),
            ('Les associations', [
                {'type': 'explique', 'texte': 'Des bénévoles distribuent des repas ou aident des personnes malades.'},
                {'type': 'piege', 'erreur': 'On croit que l’école publique est payante.', 'correction': 'Elle est gratuite pour tous les enfants.'},
            ]),
        ],
        a_toi=[
            q('Pour soigner un malade, on va :', ['à l’hôpital', 'à la mairie', 'à la poste'], 'Un service public de santé.'),
            q('Un bénévole :', ['aide sans être payé', 'est toujours payé', 'est un policier'], 'Il donne de son temps.'),
            q('L’école publique est :', ['gratuite', 'payante', 'réservée aux riches'], 'Pour tous les enfants.'),
        ],
        sources=[ref('EM-C2-CE2-SERV-01', 'Les services publics')]),

    'EM-C2-CE2-REP-01': dict(duree=5, essentiel=
        'Le président de la République est élu par les citoyens.\n'
        'Le maire dirige la commune avec le conseil municipal.\n'
        'Le maire s’occupe des écoles et célèbre les mariages.',
        parties=[
            ('Le maire', [
                {'type': 'tableau', 'titre': 'Ce que fait le maire', 'colonnes': ['Rôle', 'Exemple'], 'lignes': [
                    ['écoles', 'il entretient les bâtiments'], ['état civil', 'il célèbre les mariages'], ['sécurité', 'il prend des décisions pour la commune'], ['projets', 'parcs, piscines, routes']]},
                bq('Qui célèbre les mariages ?', ['le maire', 'le président', 'le boulanger'], 'À la mairie.'),
            ]),
            ('Des élus', [
                {'type': 'explique', 'texte': 'Les habitants votent pour le conseil municipal. Le conseil choisit le maire.'},
                {'type': 'piege', 'erreur': 'On croit que le maire est choisi par le président.', 'correction': 'Il est élu par le conseil municipal, lui-même élu par les habitants.'},
            ]),
        ],
        a_toi=[
            q('Le maire travaille à :', ['la mairie', 'l’hôpital', 'la gare'], 'C’est le bâtiment de la commune.'),
            q('Le président de la République est :', ['élu par les citoyens', 'nommé par le maire', 'choisi au hasard'], 'Par un vote.'),
            q('Les bâtiments de l’école sont entretenus par :', ['la commune', 'les élèves', 'le président'], 'Le maire s’en occupe.'),
        ],
        sources=[ref('EM-C2-CE2-REP-01', 'Le maire et le président')]),

    'EM-C2-CE2-DEV-01': dict(duree=4, essentiel=
        'La devise de la République est « Liberté, Égalité, Fraternité ».\n'
        'Les trois mots vont ensemble.\n'
        'Ma liberté s’arrête là où commence celle des autres.',
        parties=[
            ('Trois mots', [
                {'type': 'tableau', 'titre': 'Comprendre la devise', 'colonnes': ['Mot', 'Exemple'], 'lignes': [
                    ['Liberté', 'Je peux dire ce que je pense, sans blesser.'], ['Égalité', 'Filles et garçons ont les mêmes droits.'], ['Fraternité', 'J’aide un camarade en difficulté.']]},
                bq('« Filles et garçons ont les mêmes droits. » C’est :', ['l’égalité', 'la liberté', 'la fraternité'], 'Les mêmes droits pour tous.'),
            ]),
            ('Des liens', [
                {'type': 'piege', 'erreur': 'On croit que la liberté permet de tout faire.', 'correction': 'Ma liberté ne doit pas blesser les autres.'},
            ]),
        ],
        a_toi=[
            q('Aider un camarade, c’est :', ['la fraternité', 'l’égalité', 'la liberté'], 'S’entraider.'),
            q('La devise est écrite sur :', ['la façade de l’école', 'les voitures', 'les arbres'], 'Et sur les mairies.'),
            q('La liberté permet :', ['de penser et de parler sans blesser', 'de tout faire', 'de taper'], 'Elle a des limites.'),
        ],
        sources=[ref('EM-C2-CE2-DEV-01', 'Liberté, Égalité, Fraternité')]),

    'EM-C2-CE2-INT-01': dict(duree=4, essentiel=
        'L’intérêt particulier sert une seule personne.\n'
        'L’intérêt général sert tout le monde.\n'
        'Une piste cyclable sert à tous les habitants : c’est l’intérêt général.',
        parties=[
            ('Pour une personne ou pour tous ?', [
                {'type': 'tableau', 'titre': 'Trier', 'colonnes': ['Intérêt particulier', 'Intérêt général'], 'lignes': [
                    ['ma piscine', 'la piscine municipale'], ['mon jardin', 'le parc de la ville'], ['mon vélo', 'la piste cyclable']]},
                bq('Une bibliothèque municipale sert :', ['l’intérêt général', 'l’intérêt d’une seule personne', 'personne'], 'Tout le monde peut y aller.'),
            ]),
            ('Faire des choix', [
                {'type': 'piege', 'erreur': 'On croit que l’intérêt général, c’est ce que je préfère.', 'correction': 'C’est ce qui est bon pour tous. Même si cela me gêne un peu.'},
            ]),
        ],
        a_toi=[
            q('Construire une école sert :', ['l’intérêt général', 'une seule famille', 'personne'], 'Tous les enfants en profitent.'),
            q('Mon cadeau d’anniversaire relève de :', ['l’intérêt particulier', 'l’intérêt général', 'la République'], 'Il est à moi.'),
            q('L’intérêt général sert :', ['tout le monde', 'le maire seul', 'les riches'], 'Tous les habitants.'),
        ],
        sources=[ref('EM-C2-CE2-INT-01', 'L’intérêt général')]),

    'EM-C2-CE2-VOTE-01': dict(duree=5, essentiel=
        'En conseil d’élèves, on décide ensemble par un vote.\n'
        'Le projet qui a le plus de voix gagne : c’est la majorité.\n'
        'Je respecte le résultat, même si j’ai voté autrement.',
        parties=[
            ('Voter', [
                {'type': 'tableau', 'titre': 'Le vote de la classe', 'colonnes': ['Projet', 'Voix'], 'lignes': [
                    ['jardin', '15'], ['fresque', '10']]},
                bq('Quel projet gagne ?', ['le jardin', 'la fresque', 'aucun'], '15 voix, c’est plus que 10.'),
            ]),
            ('Respecter le résultat', [
                {'type': 'methode', 'titre': 'Pour un vote juste', 'etapes': ['Chacun présente son idée.', 'On écoute tout le monde.', 'Chacun vote une seule fois.', 'On compte les voix.']},
                {'type': 'piege', 'erreur': 'On boude quand son projet perd.', 'correction': 'La majorité décide. On participe quand même au projet choisi.'},
            ]),
        ],
        a_toi=[
            q('Dans un vote, chaque élève vote :', ['une seule fois', 'autant qu’il veut', 'jamais'], 'Une voix par personne.'),
            q('La majorité, c’est :', ['le plus grand nombre de voix', 'le plus petit nombre', 'l’avis du maitre'], 'Le plus de voix.'),
            q('Mon projet a perdu. Je :', ['respecte le résultat', 'boude', 'refuse de participer'], 'C’est la règle du vote.'),
        ],
        sources=[ref('EM-C2-CE2-VOTE-01', 'Décider ensemble')]),

    'EM-C2-CE2-ECO-01': dict(duree=4, essentiel=
        'Des gestes simples protègent l’environnement.\n'
        'J’éteins la lumière et je ferme le robinet.\n'
        'Je trie le papier et je ne gaspille pas.',
        parties=[
            ('Des éco-gestes', [
                {'type': 'tableau', 'titre': 'Gestes et effets', 'colonnes': ['Geste', 'Ce qu’il économise'], 'lignes': [
                    ['éteindre la lumière', 'l’électricité'], ['fermer le robinet', 'l’eau'], ['trier le papier', 'des arbres'], ['finir son assiette', 'la nourriture']]},
                bq('En me brossant les dents, je :', ['ferme le robinet', 'laisse couler l’eau', 'ouvre deux robinets'], 'L’eau ne coule pas pour rien.'),
            ]),
            ('Ensemble', [
                {'type': 'piege', 'erreur': 'On croit qu’un seul geste ne sert à rien.', 'correction': 'Si chacun le fait, cela fait une grande différence.'},
            ]),
        ],
        a_toi=[
            q('Je quitte la classe vide. Je :', ['éteins la lumière', 'laisse tout allumé', 'ouvre la fenêtre'], 'J’économise l’électricité.'),
            q('Le papier usagé va :', ['au bac de tri', 'par terre', 'dans le lavabo'], 'Il sera recyclé.'),
            q('Gaspiller, c’est :', ['utiliser plus que nécessaire', 'économiser', 'recycler'], 'On jette sans besoin.'),
        ],
        sources=[ref('EM-C2-CE2-ECO-01', 'Les éco-gestes')]),
}

ecrire(COURS)
