// 6e, étude de la langue. Source : programme de français du cycle 3 (BO n°16 du 17 avril 2025).
import { choix, creerGenerateur, erreursDe } from './outils';

// ─────────── Données de conjugaison

type Groupe = 1 | 2 | 3;
interface Verbe {
  infinitif: string;
  groupe: Groupe;
  /** Radical du futur et du conditionnel. */
  futur: string;
  /** Radical de l'imparfait (celui de « nous » au présent). */
  imparfait: string;
  /** Impératif présent : tu, nous, vous. Absent si l'usage est rare (pouvoir, vouloir). */
  imperatif?: [string, string, string];
  /** Présent de l'indicatif à la 2e personne du singulier (piège de l'impératif). */
  presentTu: string;
}

const premier = (inf: string): Verbe => {
  const r = inf.slice(0, -2);
  return { infinitif: inf, groupe: 1, futur: inf, imparfait: r, imperatif: [`${r}e`, `${r}ons`, `${r}ez`], presentTu: `${r}es` };
};
const deuxieme = (inf: string): Verbe => {
  const r = inf.slice(0, -2);
  return { infinitif: inf, groupe: 2, futur: inf, imparfait: `${r}iss`, imperatif: [`${r}is`, `${r}issons`, `${r}issez`], presentTu: `${r}is` };
};

export const VERBES_6E: Verbe[] = [
  ...['chanter', 'parler', 'regarder', 'écouter', 'aimer', 'travailler', 'raconter', 'fermer'].map(premier),
  ...['finir', 'choisir', 'grandir', 'réussir', 'remplir', 'obéir', 'réfléchir'].map(deuxieme),
  { infinitif: 'être', groupe: 3, futur: 'ser', imparfait: 'ét', imperatif: ['sois', 'soyons', 'soyez'], presentTu: 'es' },
  { infinitif: 'avoir', groupe: 3, futur: 'aur', imparfait: 'av', imperatif: ['aie', 'ayons', 'ayez'], presentTu: 'as' },
  { infinitif: 'faire', groupe: 3, futur: 'fer', imparfait: 'fais', imperatif: ['fais', 'faisons', 'faites'], presentTu: 'fais' },
  { infinitif: 'aller', groupe: 3, futur: 'ir', imparfait: 'all', imperatif: ['va', 'allons', 'allez'], presentTu: 'vas' },
  { infinitif: 'dire', groupe: 3, futur: 'dir', imparfait: 'dis', imperatif: ['dis', 'disons', 'dites'], presentTu: 'dis' },
  { infinitif: 'venir', groupe: 3, futur: 'viendr', imparfait: 'ven', imperatif: ['viens', 'venons', 'venez'], presentTu: 'viens' },
  { infinitif: 'pouvoir', groupe: 3, futur: 'pourr', imparfait: 'pouv', presentTu: 'peux' },
  { infinitif: 'voir', groupe: 3, futur: 'verr', imparfait: 'voy', imperatif: ['vois', 'voyons', 'voyez'], presentTu: 'vois' },
  { infinitif: 'vouloir', groupe: 3, futur: 'voudr', imparfait: 'voul', presentTu: 'veux' },
  { infinitif: 'prendre', groupe: 3, futur: 'prendr', imparfait: 'pren', imperatif: ['prends', 'prenons', 'prenez'], presentTu: 'prends' },
];

const PERSONNES = ['je', 'tu', 'il', 'nous', 'vous', 'ils'] as const;
const FIN_CONDITIONNEL = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'];
const FIN_FUTUR = ['ai', 'as', 'a', 'ons', 'ez', 'ont'];
const elide = (p: string, forme: string) => (p === 'je' && /^[aeéèêiouh]/.test(forme) ? 'j’' : `${p} `);

// ─────────── Conditionnel présent

export const conditionnel6e = creerGenerateur({
  id: 'conditionnel-6e',
  competence: 'FR-C3-6E-CONJ-02',
  cycle: 3,
  description: 'Conjuguer au conditionnel présent être, avoir, les verbes des 1er et 2e groupes et huit verbes du 3e groupe.',
  generer(a, d) {
    const groupe: Groupe = d === 1 ? 1 : d === 2 ? 2 : 3;
    const v = a.choisir(VERBES_6E.filter((x) => (groupe === 3 ? x.groupe === 3 : x.groupe === groupe) || (d === 2 && x.groupe === 1)));
    const r = a.entier(0, 5);
    const p = PERSONNES[r]!;
    const forme = v.futur + FIN_CONDITIONNEL[r];
    const futur = v.futur + FIN_FUTUR[r];
    const imparfait = v.imparfait + FIN_CONDITIONNEL[r];
    const autrePersonne = v.futur + FIN_CONDITIONNEL[(r + 2) % 6];
    return {
      gabarit: 'qcm',
      consigne: `Conjugue « ${v.infinitif} » au conditionnel présent : ${elide(p, forme).trim()} …`,
      ...choix(a, forme, [[futur, 'futur-conditionnel'], [imparfait, 'imparfait-conditionnel'], [autrePersonne, 'accord-personne']], () => v.futur + a.choisir(FIN_CONDITIONNEL)),
      reponse: forme,
      indice: 'Conditionnel présent = radical du futur + terminaisons de l’imparfait.',
      explication: `Le radical du futur est « ${v.futur}- ». On ajoute la terminaison de l’imparfait -${FIN_CONDITIONNEL[r]} : ${elide(p, forme)}${forme}.${r === 0 ? ` Ne confonds pas avec le futur : ${elide(p, futur)}${futur}.` : ''}`,
    };
  },
});

// ─────────── Impératif présent

const NOMS_PERSONNES = ['2e personne du singulier', '1re personne du pluriel', '2e personne du pluriel'];

export const imperatif6e = creerGenerateur({
  id: 'imperatif-6e',
  competence: 'FR-C3-6E-CONJ-01',
  cycle: 3,
  description: 'Conjuguer à l’impératif présent.',
  generer(a, d) {
    const groupe: Groupe = d === 1 ? 1 : d === 2 ? 2 : 3;
    const v = a.choisir(VERBES_6E.filter((x) => x.imperatif && x.groupe === groupe));
    const imp = v.imperatif!;
    // Difficulté 1 : surtout la 2e personne du singulier, où l'on oublie le -s absent.
    const r = d === 1 && a.suivant() < 0.6 ? 0 : a.entier(0, 2);
    const forme = imp[r]!;
    const pieges: [string, string][] = [[v.presentTu, 'imperatif-present'], ...imp.filter((x) => x !== forme).map((x): [string, string] => [x, 'accord-personne']), [v.infinitif, 'infinitif-au-lieu-conjugue']];
    const regle =
      v.groupe === 1 && r === 0
        ? 'À la 2e personne du singulier, les verbes du 1er groupe ne prennent pas de -s.'
        : v.groupe === 3 && ['être', 'avoir', 'aller', 'faire', 'dire'].includes(v.infinitif)
          ? `Le verbe ${v.infinitif} a des formes particulières à l’impératif.`
          : 'L’impératif s’emploie sans sujet exprimé.';
    return {
      gabarit: 'qcm',
      consigne: `Conjugue « ${v.infinitif} » à l’impératif présent, ${NOMS_PERSONNES[r]}.`,
      ...choix(a, forme, pieges, () => `${v.imparfait}ez`),
      reponse: forme,
      indice: 'L’impératif n’a que trois personnes et pas de sujet.',
      explication: `${regle} La bonne forme est « ${forme} ».`,
    };
  },
});

// ─────────── Accord du participe passé avec être

export const SUJETS_ETRE: { texte: string; feminin: boolean; pluriel: boolean }[] = [
  { texte: 'Léa', feminin: true, pluriel: false }, { texte: 'Mon oncle', feminin: false, pluriel: false },
  { texte: 'Les filles', feminin: true, pluriel: true }, { texte: 'Les garçons', feminin: false, pluriel: true },
  { texte: 'Mes cousines', feminin: true, pluriel: true }, { texte: 'Ma tante', feminin: true, pluriel: false },
  { texte: 'Elles', feminin: true, pluriel: true }, { texte: 'Ils', feminin: false, pluriel: true },
  { texte: 'Tom et Léa', feminin: false, pluriel: true }, { texte: 'Inès et sa sœur', feminin: true, pluriel: true },
];
export const PARTICIPES_ETRE: [string, string, string][] = [
  ['arriver', 'arrivé', 'en retard'], ['partir', 'parti', 'tôt'], ['tomber', 'tombé', 'dans l’escalier'],
  ['venir', 'venu', 'à la fête'], ['rester', 'resté', 'à la maison'], ['sortir', 'sorti', 'dans le jardin'],
  ['entrer', 'entré', 'dans la classe'], ['monter', 'monté', 'au grenier'], ['descendre', 'descendu', 'à la cave'],
  ['aller', 'allé', 'au marché'],
];

export const participePasseEtre6e = creerGenerateur({
  id: 'participe-passe-etre-6e',
  competence: 'FR-C3-6E-ORTH-01',
  cycle: 3,
  description: 'Accorder le participe passé employé avec l’auxiliaire être.',
  generer(a, d) {
    const sujets = d === 1 ? SUJETS_ETRE.slice(0, 4) : d === 2 ? SUJETS_ETRE.slice(0, 8) : SUJETS_ETRE;
    const s = a.choisir(sujets);
    const [inf, pp, suite] = a.choisir(PARTICIPES_ETRE);
    const forme = pp + (s.feminin ? 'e' : '') + (s.pluriel ? 's' : '');
    const aux = s.pluriel ? 'sont' : 'est';
    const mixte = s.texte === 'Tom et Léa';
    return {
      gabarit: 'qcm',
      consigne: `Choisis la bonne forme du verbe « ${inf} » : ${s.texte} ${aux} … ${suite}.`,
      options: a.melanger([pp, `${pp}e`, `${pp}s`, `${pp}es`]),
      erreurs: erreursDe([pp, `${pp}e`, `${pp}s`, `${pp}es`], forme, [pp, `${pp}e`, `${pp}s`, `${pp}es`].map((x) => [x, 'accord-etre'] as const)),
      reponse: forme,
      indice: 'Avec l’auxiliaire être, le participe passé s’accorde avec le sujet.',
      explication: `Le sujet est « ${s.texte} » : ${s.feminin ? 'féminin' : 'masculin'} ${s.pluriel ? 'pluriel' : 'singulier'}.${mixte ? ' Un masculin et un féminin ensemble donnent un masculin pluriel.' : ''} On écrit : ${s.texte} ${aux} ${forme}.`,
    };
  },
});

// ─────────── Fonctions : attribut du sujet, COD, COI, complément circonstanciel

export const FONCTIONS = ['attribut du sujet', 'COD', 'COI', 'complément circonstanciel'] as const;
type Fonction = (typeof FONCTIONS)[number];
// Le groupe à analyser est entre crochets.
export const PHRASES_FONCTIONS: Record<Fonction, string[]> = {
  'attribut du sujet': ['Le ciel devient [gris].', 'Ma sœur est [infirmière].', 'Ce gâteau semble [délicieux].',
    'Les élèves restent [calmes].', 'Le chat parait [fatigué].', 'Ton idée est [excellente].', 'Le lac demeure [gelé] tout l’hiver.'],
  COD: ['Le chat mange [la souris].', 'Léa lit [un roman].', 'Nous préparons [le dîner].', 'Le vent emporte [les feuilles].',
    'Mon frère répare [son vélo].', 'Elle regarde [le ciel gris].', 'Les enfants construisent [une cabane].'],
  COI: ['Je pense [à mes vacances].', 'Il parle [de son voyage].', 'Nous obéissons [au règlement].', 'Tu ressembles [à ton père].',
    'Elle se souvient [de cette histoire].'],
  'complément circonstanciel': ['Nous partirons [demain].', 'Le chat dort [sous la table].', 'Les oiseaux chantent [le matin].',
    'Il ne sort pas [à cause de la pluie].', '[Dans la forêt], les promeneurs se perdent.'],
};
const EXPLICATIONS_FONCTIONS: Record<Fonction, string> = {
  'attribut du sujet': 'Le verbe est un verbe d’état. Le groupe donne une caractéristique du sujet.',
  COD: 'Le groupe complète le verbe directement, sans préposition. On ne peut pas le déplacer.',
  COI: 'Le groupe complète le verbe. Il est introduit par une préposition (à, de).',
  'complément circonstanciel': 'Le groupe indique une circonstance. On peut le déplacer ou le supprimer.',
};

export const fonctions6e = creerGenerateur({
  id: 'fonctions-6e',
  competence: 'FR-C3-6E-GRAM-01',
  cycle: 3,
  description: 'Distinguer attribut du sujet, COD, COI et complément circonstanciel.',
  generer(a, d) {
    // Difficulté 1 : attribut ou COD, l'opposition demandée par le programme.
    const choix = d === 1 ? (['attribut du sujet', 'COD'] as Fonction[]) : [...FONCTIONS];
    const f = a.choisir(choix);
    const brute = a.choisir(PHRASES_FONCTIONS[f]);
    const groupe = brute.match(/\[(.+?)\]/)![1]!;
    const phrase = brute.replace(/[[\]]/g, '');
    return {
      gabarit: 'qcm',
      consigne: `Dans « ${phrase} », quelle est la fonction de « ${groupe} » ?`,
      options: a.melanger([...FONCTIONS]),
      erreurs: Object.fromEntries(FONCTIONS.filter((x) => x !== f).map((x) => [x,
        ['COD', 'COI'].includes(x) && ['COD', 'COI'].includes(f) ? 'cod-coi-confondus'
          : (x === 'attribut du sujet' && f === 'COD') || (f === 'attribut du sujet' && x === 'COD') ? 'attribut-cod-confondus' : 'fonction-grammaticale-confondue'])),
      reponse: f,
      indice: 'Repère le verbe. Est-ce un verbe d’état ? Le groupe peut-il être déplacé ?',
      explication: `« ${groupe} » est ${f === 'COD' || f === 'COI' ? 'un ' : f === 'attribut du sujet' ? "l’" : 'un '}${f}. ${EXPLICATIONS_FONCTIONS[f]}`,
    };
  },
});

// ─────────── Phrase simple, phrase complexe : compter les propositions

// Chaque verbe conjugué est précédé d'un astérisque.
export const PHRASES_PROPOSITIONS = [
  'Le soleil se *lève sur la mer.', 'Les élèves *écoutent la maitresse.', 'Mon frère *joue au football le samedi.',
  'Il *pleut, nous *restons à la maison.', 'Léa *lit et son frère *dessine.', 'Je *pense que tu *as raison.',
  'Quand la cloche *sonne, les élèves *sortent.', 'Le chien *aboie car il *entend un bruit.',
  'Elle *ouvre la porte, *regarde dehors et *sourit.', 'Si tu *veux, nous *irons au parc quand il *fera beau.',
  'Le train *part à huit heures.', 'Nous *savons que la Terre *tourne autour du Soleil.',
];

export const propositions6e = creerGenerateur({
  id: 'propositions-6e',
  competence: 'FR-C3-6E-GRAM-02',
  cycle: 3,
  description: 'Distinguer phrase simple et phrase complexe en comptant les propositions.',
  generer(a) {
    const brute = a.choisir(PHRASES_PROPOSITIONS);
    const verbes = brute.match(/\*([\p{L}’']+)/gu)!.map((v) => v.slice(1));
    const n = verbes.length;
    const phrase = brute.replace(/\*/g, '');
    return {
      gabarit: 'qcm',
      consigne: `Combien de propositions la phrase « ${phrase} » contient-elle ?`,
      options: ['1', '2', '3', '4'],
      erreurs: Object.fromEntries([n - 1, n + 1].filter((k) => k >= 1 && k <= 4).map((k) => [String(k), 'verbes-mal-comptes'])),
      reponse: String(n),
      indice: 'Compte les verbes conjugués.',
      explication: `Les verbes conjugués sont : ${verbes.join(', ')}. Il y a ${n} proposition${n > 1 ? 's' : ''}. C’est une phrase ${n > 1 ? 'complexe' : 'simple'}.`,
    };
  },
});

// ─────────── Conjonctions de coordination et de subordination

export const COORDINATION = ['mais', 'ou', 'et', 'donc', 'or', 'ni', 'car'];
export const SUBORDINATION = ['quand', 'parce que', 'si', 'lorsque', 'puisque', 'comme', 'que'];
const PHRASES_CONJONCTIONS: [string, string][] = [
  ['Je reste ici car il pleut.', 'car'], ['Il voulait venir mais il était malade.', 'mais'],
  ['Tu prends du thé ou du café ?', 'ou'], ['Je pense, donc je suis.', 'donc'], ['Léa chante et Tom danse.', 'et'],
  ['Je reste ici parce qu’il pleut.', 'parce que'], ['Quand il fait beau, nous sortons.', 'quand'],
  ['Si tu viens, préviens-moi.', 'si'], ['Lorsque la nuit tombe, les étoiles apparaissent.', 'lorsque'],
  ['Puisque tu insistes, je viens.', 'puisque'], ['Je crois que tu as raison.', 'que'],
];
const CLASSES_CONJ = ['conjonction de coordination', 'conjonction de subordination', 'préposition', 'adverbe'];

export const conjonctions6e = creerGenerateur({
  id: 'conjonctions-6e',
  competence: 'FR-C3-6E-GRAM-03',
  cycle: 3,
  description: 'Distinguer conjonction de coordination et conjonction de subordination.',
  generer(a) {
    const [phrase, mot] = a.choisir(PHRASES_CONJONCTIONS);
    const coord = COORDINATION.includes(mot);
    const reponse = coord ? CLASSES_CONJ[0]! : CLASSES_CONJ[1]!;
    return {
      gabarit: 'qcm',
      consigne: `Dans « ${phrase} », quelle est la classe de « ${mot} » ?`,
      options: a.melanger(CLASSES_CONJ),
      erreurs: Object.fromEntries(CLASSES_CONJ.filter((c) => c !== reponse).map((c) => [c, c.startsWith('conjonction') ? 'conjonction-confondue' : 'classe-grammaticale-confondue'])),
      reponse,
      indice: 'Mais, ou, et, donc, or, ni, car : ce sont les conjonctions de coordination.',
      explication: coord
        ? `« ${mot} » relie deux éléments de même niveau. C’est une conjonction de coordination.`
        : `« ${mot} » introduit une proposition subordonnée. C’est une conjonction de subordination.`,
    };
  },
});

// ─────────── Antonymes de même classe grammaticale

// [mot, classe, antonyme de même classe, deux mots de la même famille mais d'une autre classe, un synonyme]
const ANTONYMES: [string, string, string, string, string, string][] = [
  ['rapide', 'adjectif', 'lent', 'lentement', 'lenteur', 'vif'],
  ['gentil', 'adjectif', 'méchant', 'méchamment', 'méchanceté', 'aimable'],
  ['joyeux', 'adjectif', 'triste', 'tristement', 'tristesse', 'gai'],
  ['fort', 'adjectif', 'faible', 'faiblement', 'faiblesse', 'puissant'],
  ['propre', 'adjectif', 'sale', 'salement', 'saleté', 'net'],
  ['courageux', 'adjectif', 'lâche', 'lâchement', 'lâcheté', 'brave'],
  ['aimer', 'verbe', 'détester', 'détestable', 'haine', 'adorer'],
  ['la joie', 'nom', 'la tristesse', 'triste', 'tristement', 'le bonheur'],
  ['le début', 'nom', 'la fin', 'finir', 'final', 'le commencement'],
  ['souvent', 'adverbe', 'rarement', 'rare', 'rareté', 'fréquemment'],
  ['vite', 'adverbe', 'lentement', 'lent', 'lenteur', 'rapidement'],
  ['allumer', 'verbe', 'éteindre', 'extinction', 'éteint', 'enflammer'],
];

export const antonymes6e = creerGenerateur({
  id: 'antonymes-6e',
  competence: 'FR-C3-6E-VOC-01',
  cycle: 3,
  description: 'Donner un antonyme qui respecte la classe grammaticale du mot.',
  generer(a) {
    const [mot, classe, antonyme, autre1, autre2, synonyme] = a.choisir(ANTONYMES);
    return {
      gabarit: 'qcm',
      consigne: `Quel mot est le contraire du mot « ${mot} » et appartient à la même classe grammaticale ?`,
      options: a.melanger([antonyme, autre1, autre2, synonyme]),
      erreurs: { [synonyme]: 'synonyme-antonyme-confondus' },
      reponse: antonyme,
      indice: `« ${mot} » est un ${classe}. Cherche un ${classe} de sens opposé.`,
      explication: `« ${antonyme} » est un ${classe} de sens contraire. « ${synonyme} » a un sens proche. Les autres mots ne sont pas des ${classe}s.`,
    };
  },
});
