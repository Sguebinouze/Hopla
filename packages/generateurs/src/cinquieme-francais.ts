// 5e, grammaire de la phrase : types et formes, phrase simple ou complexe, fonctions, déterminants et pronoms,
// paroles rapportées. Source : programme de français du cycle 4 (arrêté du 18 février 2026, BO n°10 du 5 mars 2026), p. 30 et 31.
// Toutes les phrases sont rédigées et annotées à la main : aucune combinatoire.
import { creerGenerateur, erreursDe } from './outils';

// ─────────── Types et formes de phrases

type TypePhrase = 'déclarative' | 'interrogative' | 'injonctive';
/** [phrase, type, négative, exclamative] */
export const PHRASES_TYPES: [string, TypePhrase, boolean, boolean][] = [
  ['Le train part à huit heures.', 'déclarative', false, false],
  ['Le train ne part pas ce soir.', 'déclarative', true, false],
  ['Quel beau voyage nous avons fait !', 'déclarative', false, true],
  ['Je n’ai jamais vu un ciel pareil !', 'déclarative', true, true],
  ['Viendras-tu à la fête samedi ?', 'interrogative', false, false],
  ['Pourquoi ne réponds-tu pas ?', 'interrogative', true, false],
  ['Est-ce que la bibliothèque est ouverte ?', 'interrogative', false, false],
  ['N’as-tu rien oublié ?', 'interrogative', true, false],
  ['Range ta chambre avant le diner.', 'injonctive', false, false],
  ['Ne touche plus à ce vase.', 'injonctive', true, false],
  ['Fermez la porte en sortant.', 'injonctive', false, false],
  ['Ne parle pas si fort !', 'injonctive', true, true],
  ['Les élèves écoutent la conteuse.', 'déclarative', false, false],
  ['Personne ne connait la réponse.', 'déclarative', true, false],
  ['Comme ce paysage est magnifique !', 'déclarative', false, true],
  ['Où as-tu rangé les ciseaux ?', 'interrogative', false, false],
  ['Ne te penche pas par la fenêtre.', 'injonctive', true, false],
  ['Prenez votre cahier de brouillon.', 'injonctive', false, false],
  ['Il ne pleut plus depuis une semaine.', 'déclarative', true, false],
  ['Qui a laissé la lumière allumée ?', 'interrogative', false, false],
  ['Que tu es drôle !', 'déclarative', false, true],
  ['Ne mangez rien avant la piscine.', 'injonctive', true, false],
  ['Vas-tu enfin te décider ?', 'interrogative', false, false],
  ['Nous ne partirons jamais sans toi.', 'déclarative', true, false],
  ['Arrose les plantes chaque soir.', 'injonctive', false, false],
  ['Ce film ne m’a pas plu du tout.', 'déclarative', true, false],
  ['Pourquoi le ciel est-il bleu ?', 'interrogative', false, false],
  ['Faites attention à la marche !', 'injonctive', false, true],
  ['Rien ne bouge dans la maison.', 'déclarative', true, false],
  ['Combien coute ce livre ?', 'interrogative', false, false],
];

export const typesFormes5e = creerGenerateur({
  id: 'types-formes-5e',
  competence: 'FR-C4-5E-GRAM-01',
  cycle: 4,
  description: 'Identifier le type d’une phrase (déclarative, interrogative, injonctive) et ses formes (négative, exclamative).',
  generer(a, d) {
    const [phrase, type, negative, exclamative] = a.choisir(PHRASES_TYPES);
    if (d === 1) {
      return {
        gabarit: 'qcm',
        consigne: `« ${phrase} » Quel est le type de cette phrase ?`,
        options: a.melanger(['déclarative', 'interrogative', 'injonctive']),
        erreurs: erreursDe(['déclarative', 'interrogative', 'injonctive'], type, ['déclarative', 'interrogative', 'injonctive'].map((t) => [t, 'type-phrase-confondu'] as const)),
        reponse: type,
        indice: 'Déclarative : elle affirme. Interrogative : elle questionne. Injonctive : elle donne un ordre ou un conseil.',
        explication: `C’est une phrase ${type} : ${type === 'déclarative' ? 'elle donne une information ou exprime un jugement' : type === 'interrogative' ? 'elle pose une question' : 'elle donne un ordre ou un conseil'}.`,
      };
    }
    if (d === 2) {
      return {
        gabarit: 'qcm',
        consigne: `« ${phrase} » Cette phrase est-elle à la forme négative ?`,
        options: a.melanger(['Oui', 'Non']).concat('On ne peut pas savoir'),
        reponse: negative ? 'Oui' : 'Non',
        indice: 'La forme négative se repère à « ne » (ou « n’ ») associé à pas, plus, jamais, rien, personne.',
        explication: negative
          ? 'La phrase contient une négation (« ne » ou « n’ » avec pas, plus, jamais, rien ou personne) : elle est à la forme négative.'
          : 'La phrase ne contient pas de négation : elle est à la forme affirmative.',
      };
    }
    const formes = [negative ? 'négative' : 'affirmative', exclamative ? 'exclamative' : 'non exclamative'].join(' et ');
    const reponse = `${type}, ${formes}`;
    const autres = (['déclarative', 'interrogative', 'injonctive'] as const).flatMap((t) =>
      ['affirmative', 'négative'].flatMap((n) => ['exclamative', 'non exclamative'].map((e) => `${t}, ${n} et ${e}`)));
    return {
      gabarit: 'qcm',
      consigne: `« ${phrase} » Quels sont le type et les formes de cette phrase ?`,
      options: a.melanger([reponse, ...a.melanger(autres.filter((x) => x !== reponse && (x.startsWith(type) || x.includes(formes)))).slice(0, 3)]),
      reponse,
      indice: 'Cherche d’abord le type, puis la négation, puis la marque de l’exclamation.',
      explication: `Type : ${type}. Formes : ${formes}.`,
    };
  },
});

// ─────────── Phrase simple, complexe, non verbale ; relations entre propositions

type Structure = 'simple' | 'complexe' | 'non verbale';
type Relation = 'juxtaposition' | 'coordination' | 'subordination' | null;
/** [phrase, structure, relation entre propositions] */
export const PHRASES_STRUCTURES: [string, Structure, Relation][] = [
  ['Le vent souffle sur la plage.', 'simple', null],
  ['Silence !', 'non verbale', null],
  ['Défense de fumer.', 'non verbale', null],
  ['Quelle belle journée !', 'non verbale', null],
  ['Les nuages arrivent, la pluie commence.', 'complexe', 'juxtaposition'],
  ['Il fait froid, nous rentrons.', 'complexe', 'juxtaposition'],
  ['Le chien aboie et le chat s’enfuit.', 'complexe', 'coordination'],
  ['Je voulais venir mais j’étais malade.', 'complexe', 'coordination'],
  ['Elle est restée car il pleuvait.', 'complexe', 'coordination'],
  ['Nous partirons quand le soleil se lèvera.', 'complexe', 'subordination'],
  ['Je pense que tu as raison.', 'complexe', 'subordination'],
  ['Le livre que tu m’as prêté est passionnant.', 'complexe', 'subordination'],
  ['Les élèves de la classe préparent un spectacle.', 'simple', null],
  ['Après le match, les joueurs saluent le public.', 'simple', null],
  ['Fin de la partie.', 'non verbale', null],
  ['Au loup !', 'non verbale', null],
  ['Le maire inaugure la nouvelle médiathèque.', 'simple', null],
  ['La mer monte, les enfants reculent.', 'complexe', 'juxtaposition'],
  ['Il travaille beaucoup, donc il progresse.', 'complexe', 'coordination'],
  ['Si tu veux, nous irons au cinéma.', 'complexe', 'subordination'],
  ['La ville où j’habite est très calme.', 'complexe', 'subordination'],
  ['Chaque matin, mon grand-père promène son chien.', 'simple', null],
  ['Interdiction de stationner devant le portail.', 'non verbale', null],
  ['Le spectacle commence, les lumières s’éteignent.', 'complexe', 'juxtaposition'],
  ['Tu peux venir ou tu peux rester ici.', 'complexe', 'coordination'],
  ['Elle a réussi parce qu’elle a beaucoup travaillé.', 'complexe', 'subordination'],
  ['Le facteur dépose une lettre dans la boite.', 'simple', null],
  ['Bonne nuit, les enfants.', 'non verbale', null],
];

export const phraseComplexe5e = creerGenerateur({
  id: 'phrase-complexe-5e',
  competence: 'FR-C4-5E-GRAM-02',
  cycle: 4,
  description: 'Distinguer phrase simple, phrase complexe et phrase non verbale ; nommer la relation entre les propositions.',
  generer(a, d) {
    if (d < 3) {
      const pool = d === 1 ? PHRASES_STRUCTURES.filter((p) => p[1] !== 'complexe' || p[2] !== 'subordination') : PHRASES_STRUCTURES;
      const [phrase, structure] = a.choisir(pool);
      return {
        gabarit: 'qcm',
        consigne: `« ${phrase} » Cette phrase est-elle simple, complexe ou non verbale ?`,
        options: a.melanger(['simple', 'complexe', 'non verbale']),
        reponse: structure,
        indice: 'Compte les verbes conjugués : aucun, un seul, ou plusieurs.',
        explication: structure === 'non verbale'
          ? 'La phrase ne contient aucun verbe conjugué : elle est non verbale.'
          : structure === 'simple'
            ? 'La phrase contient un seul verbe conjugué : elle est simple.'
            : 'La phrase contient plusieurs verbes conjugués, donc plusieurs propositions : elle est complexe.',
      };
    }
    const [phrase, , relation] = a.choisir(PHRASES_STRUCTURES.filter((p) => p[2] !== null));
    return {
      gabarit: 'qcm',
      consigne: `« ${phrase} » Comment les propositions de cette phrase sont-elles reliées ?`,
      options: a.melanger(['juxtaposition', 'coordination', 'subordination']),
      erreurs: erreursDe(['juxtaposition', 'coordination', 'subordination'], relation!, ['juxtaposition', 'coordination', 'subordination'].map((t) => [t, 'liaison-propositions-confondue'] as const)),
      reponse: relation!,
      indice: 'Juxtaposition : une virgule. Coordination : mais, ou, et, donc, or, ni, car. Subordination : un mot subordonnant (que, quand, si, qui, où, parce que…).',
      explication: relation === 'juxtaposition'
        ? 'Les propositions sont séparées par une virgule, sans mot de liaison : c’est une juxtaposition.'
        : relation === 'coordination'
          ? 'Les propositions sont reliées par une conjonction de coordination : c’est une coordination.'
          : 'Une proposition dépend de l’autre et commence par un mot subordonnant : c’est une subordination.',
    };
  },
});

// ─────────── Fonctions dans la phrase

type Fonction = 'sujet' | 'COD' | 'COI' | 'attribut du sujet' | 'CC de lieu' | 'CC de temps' | 'CC de cause' | 'CC de manière';
/** [phrase, groupe, fonction, niveau] : niveau 1 sujet, COD, attribut ; 2 COI, CC ; 3 cas plus délicats. */
export const PHRASES_FONCTIONS: [string, string, Fonction, 1 | 2 | 3][] = [
  ['Les randonneurs atteignent le sommet.', 'Les randonneurs', 'sujet', 1],
  ['Les randonneurs atteignent le sommet.', 'le sommet', 'COD', 1],
  ['Ma sœur deviendra architecte.', 'architecte', 'attribut du sujet', 1],
  ['Le gardien ferme les grilles du parc.', 'les grilles du parc', 'COD', 1],
  ['Cette histoire semble incroyable.', 'incroyable', 'attribut du sujet', 1],
  ['Le chat de la voisine dort au soleil.', 'Le chat de la voisine', 'sujet', 1],
  ['Les élèves rendent leur exposé.', 'leur exposé', 'COD', 1],
  ['Ces fruits paraissent mûrs.', 'mûrs', 'attribut du sujet', 1],
  ['Le boulanger prépare des croissants.', 'Le boulanger', 'sujet', 1],
  ['Mon frère est très patient.', 'très patient', 'attribut du sujet', 1],
  ['Nous parlons de nos projets.', 'de nos projets', 'COI', 2],
  ['Les enfants obéissent à leurs parents.', 'à leurs parents', 'COI', 2],
  ['Le concert aura lieu dans le parc.', 'dans le parc', 'CC de lieu', 2],
  ['Le concert aura lieu samedi soir.', 'samedi soir', 'CC de temps', 2],
  ['La route est fermée à cause de la neige.', 'à cause de la neige', 'CC de cause', 2],
  ['Le skieur descend la piste avec prudence.', 'avec prudence', 'CC de manière', 2],
  ['Je pense souvent à mes grands-parents.', 'à mes grands-parents', 'COI', 2],
  ['Les hirondelles reviennent au printemps.', 'au printemps', 'CC de temps', 2],
  ['Les touristes se promènent sur le port.', 'sur le port', 'CC de lieu', 2],
  ['Il a renoncé à son voyage faute d’argent.', 'faute d’argent', 'CC de cause', 2],
  ['Elle répond calmement aux questions.', 'calmement', 'CC de manière', 2],
  ['Le maire se souvient de cette tempête.', 'de cette tempête', 'COI', 2],
  ['Au fond du jardin pousse un vieux cerisier.', 'un vieux cerisier', 'sujet', 3],
  ['Au fond du jardin pousse un vieux cerisier.', 'Au fond du jardin', 'CC de lieu', 3],
  ['Grâce à ses efforts, Malik a réussi son examen.', 'Grâce à ses efforts', 'CC de cause', 3],
  ['Grâce à ses efforts, Malik a réussi son examen.', 'son examen', 'COD', 3],
  ['Ce gâteau, je l’ai préparé hier.', 'hier', 'CC de temps', 3],
  ['Sans un mot, la conteuse referma son livre.', 'Sans un mot', 'CC de manière', 3],
  ['Mes cousins restent silencieux pendant le film.', 'silencieux', 'attribut du sujet', 3],
  ['Le professeur a rendu les copies aux élèves.', 'aux élèves', 'COI', 3],
  ['Dans la nuit, les loups hurlaient.', 'les loups', 'sujet', 3],
  ['Tous les étés, nous campons au bord du lac.', 'Tous les étés', 'CC de temps', 3],
];
const FONCTIONS: Fonction[] = ['sujet', 'COD', 'COI', 'attribut du sujet', 'CC de lieu', 'CC de temps', 'CC de cause', 'CC de manière'];

export const fonctions5e = creerGenerateur({
  id: 'fonctions-5e',
  competence: 'FR-C4-5E-GRAM-03',
  cycle: 4,
  description: 'Identifier sujet, COD, COI, attribut du sujet et compléments circonstanciels de lieu, temps, cause, manière.',
  generer(a, d) {
    const [phrase, groupe, fonction] = a.choisir(PHRASES_FONCTIONS.filter((p) => p[3] === d));
    // Pièges proches : fonctions de la même famille.
    const famille = fonction.startsWith('CC') ? FONCTIONS.filter((f) => f.startsWith('CC')) : ['sujet', 'COD', 'COI', 'attribut du sujet'];
    const pieges = a.melanger(famille.filter((f) => f !== fonction)).slice(0, 2).concat(a.choisir(FONCTIONS.filter((f) => !famille.includes(f))));
    return {
      gabarit: 'qcm',
      consigne: `Dans « ${phrase} », quelle est la fonction de « ${groupe} » ?`,
      options: a.melanger([fonction, ...pieges]),
      erreurs: erreursDe(pieges, fonction, pieges.map((p) => [p, 'fonction-grammaticale-confondue'] as const)),
      reponse: fonction,
      indice: 'Manipule le groupe : peut-on le supprimer ou le déplacer ? Est-il relié au verbe par une préposition ?',
      explication: {
        sujet: `« ${groupe} » commande l’accord du verbe : c’est le sujet. On l’encadre par « c’est… qui ».`,
        COD: `« ${groupe} » complète le verbe sans préposition et ne peut pas être déplacé : c’est un COD.`,
        COI: `« ${groupe} » complète le verbe par l’intermédiaire d’une préposition : c’est un COI.`,
        'attribut du sujet': `Le verbe est un verbe attributif. « ${groupe} » donne une caractéristique du sujet : c’est un attribut du sujet.`,
        'CC de lieu': `« ${groupe} » peut être déplacé ou supprimé et répond à « où ? » : c’est un CC de lieu.`,
        'CC de temps': `« ${groupe} » peut être déplacé ou supprimé et répond à « quand ? » : c’est un CC de temps.`,
        'CC de cause': `« ${groupe} » peut être déplacé ou supprimé et répond à « pourquoi ? » : c’est un CC de cause.`,
        'CC de manière': `« ${groupe} » peut être déplacé ou supprimé et répond à « comment ? » : c’est un CC de manière.`,
      }[fonction],
    };
  },
});

// ─────────── Déterminant ou pronom ; classes de pronoms

/** [phrase, mot, classe] */
export const PHRASES_DET_PRO: [string, string, 'déterminant' | 'pronom'][] = [
  ['Je le regarde chaque soir.', 'le', 'pronom'], ['Le chat dort sur le canapé.', 'Le', 'déterminant'],
  ['Elle les a rangés dans le placard.', 'les', 'pronom'], ['Les feuilles tombent déjà.', 'Les', 'déterminant'],
  ['Nous leur avons écrit une lettre.', 'leur', 'pronom'], ['Ils ont oublié leur parapluie.', 'leur', 'déterminant'],
  ['Tu la connais depuis longtemps ?', 'la', 'pronom'], ['La porte grince un peu.', 'La', 'déterminant'],
  ['Je l’ai vue au marché.', 'l’', 'pronom'], ['L’oiseau chante dans l’arbre.', 'L’', 'déterminant'],
  ['Ces fleurs sentent bon.', 'Ces', 'déterminant'], ['Celles-ci sentent meilleur.', 'Celles-ci', 'pronom'],
  ['Chaque élève a reçu un livre.', 'Chaque', 'déterminant'], ['Chacun a reçu un livre.', 'Chacun', 'pronom'],
  ['Mon vélo est rouge, le tien est vert.', 'le tien', 'pronom'], ['Mon vélo est rouge.', 'Mon', 'déterminant'],
  ['Plusieurs voisins sont venus.', 'Plusieurs', 'déterminant'], ['Plusieurs sont venus.', 'Plusieurs', 'pronom'],
  ['Quelques amis nous attendent.', 'Quelques', 'déterminant'], ['Quelques-uns nous attendent.', 'Quelques-uns', 'pronom'],
  ['Cette robe te va bien.', 'Cette', 'déterminant'], ['Cela me fait plaisir.', 'Cela', 'pronom'],
];
const PRONOMS_CLASSES: [string, 'personnel' | 'démonstratif' | 'indéfini'][] = [
  ['elle', 'personnel'], ['nous', 'personnel'], ['leur (dans « je leur parle »)', 'personnel'], ['lui', 'personnel'], ['eux', 'personnel'],
  ['celui-ci', 'démonstratif'], ['cela', 'démonstratif'], ['ceux', 'démonstratif'], ['celle-là', 'démonstratif'], ['ça', 'démonstratif'],
  ['quelqu’un', 'indéfini'], ['personne', 'indéfini'], ['chacun', 'indéfini'], ['rien', 'indéfini'], ['plusieurs (employé seul)', 'indéfini'],
];

export const determinantsPronoms5e = creerGenerateur({
  id: 'determinants-pronoms-5e',
  competence: 'FR-C4-5E-GRAM-04',
  cycle: 4,
  description: 'Distinguer déterminant et pronom ; identifier les pronoms personnels, démonstratifs et indéfinis.',
  generer(a, d) {
    if (d < 3) {
      // d1 : le, la, les, l’ ; d2 : leur, chaque, plusieurs, possessifs, démonstratifs.
      const simples = PHRASES_DET_PRO.slice(0, 10).filter((p) => !p[1].startsWith('leur'));
      const [phrase, mot, classe] = a.choisir(d === 1 ? simples : PHRASES_DET_PRO.filter((p) => !simples.includes(p)));
      return {
        gabarit: 'qcm',
        consigne: `Dans « ${phrase} », « ${mot} » est-il un déterminant ou un pronom ?`,
        options: a.melanger(['un déterminant', 'un pronom']).concat('un adverbe'),
        erreurs: erreursDe(['un déterminant', 'un pronom'], `un ${classe}`, [['un déterminant', 'determinant-pronom-confondus'], ['un pronom', 'determinant-pronom-confondus']]),
        reponse: `un ${classe}`,
        indice: 'Un déterminant accompagne un nom. Un pronom remplace un nom ou un groupe nominal.',
        explication: classe === 'déterminant'
          ? `« ${mot} » accompagne un nom : c’est un déterminant.`
          : `« ${mot} » remplace un nom ou un groupe nominal : c’est un pronom.`,
      };
    }
    const [pronom, classe] = a.choisir(PRONOMS_CLASSES);
    return {
      gabarit: 'qcm',
      consigne: `À quelle classe appartient le pronom « ${pronom} » ?`,
      options: a.melanger(['pronom personnel', 'pronom démonstratif', 'pronom indéfini']),
      reponse: `pronom ${classe}`,
      indice: 'Personnel : il désigne une personne de la conjugaison. Démonstratif : il montre. Indéfini : il reste vague.',
      explication: `« ${pronom.split(' (')[0]} » est un pronom ${classe}.`,
    };
  },
});

// ─────────── Discours direct et indirect

/** [phrase au discours direct, la même au discours indirect, piège] */
export const PAROLES: [string, string, string][] = [
  ['Léa dit : « Je viens demain. »', 'Léa dit qu’elle vient demain.', 'Léa dit qu’elle viens demain.'],
  ['Tom demande : « As-tu fini ? »', 'Tom demande si j’ai fini.', 'Tom demande qu’as-tu fini.'],
  ['Le guide annonce : « Nous partons à midi. »', 'Le guide annonce qu’ils partent à midi.', 'Le guide annonce qu’ils partirent à midi.'],
  ['Maman me dit : « Range ta chambre. »', 'Maman me dit de ranger ma chambre.', 'Maman me dit que range ta chambre.'],
  ['Inès affirme : « J’ai perdu mes clés. »', 'Inès affirme qu’elle a perdu ses clés.', 'Inès affirme que j’ai perdu mes clés.'],
  ['Le maitre demande : « Qui a terminé ? »', 'Le maitre demande qui a terminé.', 'Le maitre demande : qui a terminé.'],
  ['Hugo répond : « Je suis fatigué. »', 'Hugo répond qu’il est fatigué.', 'Hugo répond qu’il suis fatigué.'],
  ['Elle me demande : « Où habites-tu ? »', 'Elle me demande où j’habite.', 'Elle me demande où habites-tu.'],
  ['Le médecin conseille : « Reposez-vous. »', 'Le médecin conseille de se reposer.', 'Le médecin conseille que reposez-vous.'],
  ['Sami déclare : « Je gagnerai la course. »', 'Sami déclare qu’il gagnera la course.', 'Sami déclare qu’il gagnerai la course.'],
];
/** Phrases à classer : [phrase, discours] */
export const DISCOURS: [string, 'direct' | 'indirect'][] = [
  ...PAROLES.map(([direct]) => [direct, 'direct'] as [string, 'direct']),
  ...PAROLES.map(([, indirect]) => [indirect, 'indirect'] as [string, 'indirect']),
];

export const paroles5e = creerGenerateur({
  id: 'paroles-rapportees-5e',
  competence: 'FR-C4-5E-GRAM-05',
  cycle: 4,
  description: 'Identifier le discours direct et le discours indirect ; passer de l’un à l’autre.',
  generer(a, d) {
    if (d === 1) {
      const [phrase, discours] = a.choisir(DISCOURS);
      return {
        gabarit: 'qcm',
        consigne: `${phrase} Les paroles sont-elles rapportées au discours direct ou au discours indirect ?`,
        options: a.melanger(['au discours direct', 'au discours indirect']).concat('ce ne sont pas des paroles'),
        erreurs: erreursDe(['au discours direct', 'au discours indirect'], `au discours ${discours}`, [['au discours direct', 'paroles-rapportees-confondues'], ['au discours indirect', 'paroles-rapportees-confondues']]),
        reponse: `au discours ${discours}`,
        indice: 'Discours direct : deux-points et guillemets, paroles telles quelles. Discours indirect : paroles intégrées après « que », « si », « de »…',
        explication: discours === 'direct'
          ? 'Les paroles sont citées telles quelles, après deux-points et entre guillemets : discours direct.'
          : 'Les paroles sont intégrées au récit par un mot subordonnant, sans guillemets : discours indirect.',
      };
    }
    const i = a.entier(0, PAROLES.length - 1);
    const [direct, indirect, piege] = PAROLES[i]!;
    const autre = PAROLES[(i + a.entier(1, PAROLES.length - 1)) % PAROLES.length]![1];
    return {
      gabarit: 'qcm',
      consigne: d === 2
        ? `${direct} Quelle phrase rapporte ces paroles au discours indirect ?`
        : `${direct} Choisis la transposition correcte au discours indirect.`,
      options: a.melanger(d === 2 ? [indirect, piege, autre] : [indirect, piege, direct.replace(' : « ', ' que « ')]),
      erreurs: erreursDe(d === 2 ? [piege] : [piege, direct.replace(' : « ', ' que « ')], indirect, [[piege, 'discours-indirect-transposition'], [direct.replace(' : « ', ' que « '), 'discours-indirect-guillemets']]),
      reponse: indirect,
      indice: 'Au discours indirect, les pronoms, les possessifs et les temps s’adaptent au récit.',
      explication: `On supprime les deux-points et les guillemets, on introduit les paroles par un mot subordonnant et on adapte les pronoms : ${indirect}`,
    };
  },
});
