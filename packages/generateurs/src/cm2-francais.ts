// CM2, étude de la langue. Source : programme de français du cycle 3 (BO n°16 du 17 avril 2025).
// Au CM2 : passé simple et plus-que-parfait (être, avoir, 1er et 2e groupes, huit verbes du 3e groupe),
// accord du participe passé avec être et avec avoir (COD placé avant), forme négative des temps composés,
// attribut, COD, COI, compléments circonstanciels de temps, de lieu, de cause, sujet inversé,
// prépositions, pronoms personnels compléments, phrase complexe.
import { creerGenerateur, options } from './outils';

const PERSONNES = ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles'] as const;
type Personne = (typeof PERSONNES)[number];
const RANG: Record<Personne, number> = { je: 0, tu: 1, il: 2, elle: 2, nous: 3, vous: 4, ils: 5, elles: 5 };
const elide = (p: Personne, forme: string) => (p === 'je' && /^[aeéèêiouh]/.test(forme) ? 'j’' : `${p} `);

// ─────────── Passé simple

/** Modèles de terminaisons du passé simple, de « je » à « ils ». */
const FINS_PS = {
  a: ['ai', 'as', 'a', 'âmes', 'âtes', 'èrent'],
  i: ['is', 'is', 'it', 'îmes', 'îtes', 'irent'],
  u: ['us', 'us', 'ut', 'ûmes', 'ûtes', 'urent'],
  in: ['ins', 'ins', 'int', 'înmes', 'întes', 'inrent'],
};
const FINS_IMPARFAIT = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'];

interface VerbePs { infinitif: string; groupe: 1 | 2 | 3; radical: string; fins: keyof typeof FINS_PS; imparfait: string }
const ps1 = (inf: string): VerbePs => ({ infinitif: inf, groupe: 1, radical: inf.slice(0, -2), fins: 'a', imparfait: inf.slice(0, -2) });
const ps2 = (inf: string): VerbePs => ({ infinitif: inf, groupe: 2, radical: inf.slice(0, -2), fins: 'i', imparfait: `${inf.slice(0, -2)}iss` });

export const VERBES_PS: VerbePs[] = [
  // Premier groupe sans variation du radical (pas de -cer, -ger, -yer, -eler, -eter).
  ...['chanter', 'parler', 'regarder', 'marcher', 'arriver', 'entrer', 'demander', 'écouter', 'tomber', 'trouver', 'raconter', 'jouer'].map(ps1),
  ...['finir', 'choisir', 'grandir', 'réussir', 'remplir', 'obéir', 'réfléchir', 'bondir', 'saisir'].map(ps2),
  { infinitif: 'être', groupe: 3, radical: 'f', fins: 'u', imparfait: 'ét' },
  { infinitif: 'avoir', groupe: 3, radical: 'e', fins: 'u', imparfait: 'av' },
  { infinitif: 'faire', groupe: 3, radical: 'f', fins: 'i', imparfait: 'fais' },
  { infinitif: 'aller', groupe: 3, radical: 'all', fins: 'a', imparfait: 'all' },
  { infinitif: 'dire', groupe: 3, radical: 'd', fins: 'i', imparfait: 'dis' },
  { infinitif: 'venir', groupe: 3, radical: 'v', fins: 'in', imparfait: 'ven' },
  { infinitif: 'pouvoir', groupe: 3, radical: 'p', fins: 'u', imparfait: 'pouv' },
  { infinitif: 'voir', groupe: 3, radical: 'v', fins: 'i', imparfait: 'voy' },
  { infinitif: 'vouloir', groupe: 3, radical: 'voul', fins: 'u', imparfait: 'voul' },
  { infinitif: 'prendre', groupe: 3, radical: 'pr', fins: 'i', imparfait: 'pren' },
];
const passeSimple = (v: VerbePs, r: number) => v.radical + FINS_PS[v.fins][r];

export const passeSimpleCm2 = creerGenerateur({
  id: 'passe-simple-cm2',
  competence: 'FR-C3-CM2-CONJ-01',
  cycle: 3,
  description: 'Conjuguer au passé simple être, avoir, les verbes des 1er et 2e groupes et huit verbes du 3e groupe.',
  generer(a, d) {
    // Difficulté 1 : 3e personne (la plus fréquente dans les récits), être, avoir et 1er groupe.
    const liste = d === 1
      ? VERBES_PS.filter((v) => v.groupe === 1 || ['être', 'avoir'].includes(v.infinitif))
      : d === 2 ? VERBES_PS.filter((v) => v.groupe !== 3) : VERBES_PS.filter((v) => v.groupe === 3);
    const v = a.choisir(liste);
    const p = a.choisir(d === 1 ? (['il', 'elle', 'ils', 'elles'] as const) : PERSONNES);
    const r = RANG[p];
    const forme = passeSimple(v, r);
    const imparfait = v.imparfait + FINS_IMPARFAIT[r];
    const autres = [0, 1, 2, 3, 4, 5].filter((k) => k !== r).map((k) => passeSimple(v, k));
    return {
      gabarit: 'qcm',
      consigne: `Conjugue « ${v.infinitif} » au passé simple : ${elide(p, forme).trim()} …`,
      options: options(a, forme, [imparfait, ...a.melanger(autres)], () => passeSimple(v, a.entier(0, 5))),
      reponse: forme,
      indice: v.groupe === 1 || v.infinitif === 'aller'
        ? 'Verbes en -er au passé simple : -ai, -as, -a, -âmes, -âtes, -èrent.'
        : v.fins === 'i' ? 'Terminaisons en i : -is, -is, -it, -îmes, -îtes, -irent.'
        : v.fins === 'u' ? 'Terminaisons en u : -us, -us, -ut, -ûmes, -ûtes, -urent.'
        : 'Venir : je vins, il vint, nous vînmes, ils vinrent.',
      explication: `Au passé simple, « ${v.infinitif} » prend la terminaison -${FINS_PS[v.fins][r]} avec « ${p} » : ${elide(p, forme)}${forme}. « ${imparfait} » est à l’imparfait.`,
    };
  },
});

// ─────────── Plus-que-parfait

const AVAIS = ['avais', 'avais', 'avait', 'avions', 'aviez', 'avaient'];
const ETAIS = ['étais', 'étais', 'était', 'étions', 'étiez', 'étaient'];
const AI = ['ai', 'as', 'a', 'avons', 'avez', 'ont'];
const SUIS = ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'];

export const VERBES_PQP: { infinitif: string; participe: string; etre: boolean }[] = [
  ...([['chanter', 'chanté'], ['parler', 'parlé'], ['finir', 'fini'], ['choisir', 'choisi'], ['faire', 'fait'], ['dire', 'dit'],
    ['prendre', 'pris'], ['voir', 'vu'], ['pouvoir', 'pu'], ['vouloir', 'voulu'], ['être', 'été'], ['avoir', 'eu']] as const)
    .map(([infinitif, participe]) => ({ infinitif, participe, etre: false })),
  ...([['aller', 'allé'], ['venir', 'venu'], ['partir', 'parti'], ['arriver', 'arrivé'], ['tomber', 'tombé'], ['rester', 'resté']] as const)
    .map(([infinitif, participe]) => ({ infinitif, participe, etre: true })),
];

export const plusQueParfaitCm2 = creerGenerateur({
  id: 'plus-que-parfait-cm2',
  competence: 'FR-C3-CM2-CONJ-02',
  cycle: 3,
  description: 'Conjuguer au plus-que-parfait : auxiliaire à l’imparfait et participe passé, accordé avec être.',
  generer(a, d) {
    const liste = d === 1 ? VERBES_PQP.filter((v) => !v.etre) : d === 2 ? VERBES_PQP : VERBES_PQP.filter((v) => v.etre || ['être', 'avoir', 'faire', 'prendre'].includes(v.infinitif));
    const v = a.choisir(liste);
    // Avec être, on garde il, elle, ils, elles : le genre du sujet est connu.
    const p = a.choisir(v.etre ? (['il', 'elle', 'ils', 'elles'] as const) : PERSONNES);
    const r = RANG[p];
    const accord = v.etre ? (p === 'elle' || p === 'elles' ? 'e' : '') + (r === 5 ? 's' : '') : '';
    const aux = v.etre ? ETAIS : AVAIS;
    const forme = `${aux[r]} ${v.participe}${accord}`;
    const passeCompose = `${(v.etre ? SUIS : AI)[r]} ${v.participe}${accord}`;
    const mauvaisAux = `${(v.etre ? AVAIS : ETAIS)[r]} ${v.participe}`;
    const mauvaisAccord = v.etre ? `${aux[r]} ${v.participe}${accord === '' ? 'e' : accord === 'e' ? '' : accord === 's' ? 'es' : 's'}` : `${aux[(r + 3) % 6]} ${v.participe}`;
    return {
      gabarit: 'qcm',
      consigne: `Conjugue « ${v.infinitif} » au plus-que-parfait : ${elide(p, forme).trim()} …`,
      options: options(a, forme, [passeCompose, mauvaisAccord, mauvaisAux], () => `${aux[a.entier(0, 5)]} ${v.participe}`),
      reponse: forme,
      indice: 'Plus-que-parfait = auxiliaire être ou avoir à l’imparfait + participe passé.',
      explication: `« ${v.infinitif} » se conjugue avec l’auxiliaire ${v.etre ? 'être' : 'avoir'}. À l’imparfait : ${elide(p, aux[r]!)}${aux[r]}. On ajoute le participe passé « ${v.participe}${accord} »${v.etre ? ', accordé avec le sujet' : ''}. « ${passeCompose} » est au passé composé.`,
    };
  },
});

// ─────────── Accord du participe passé avec être

interface Sujet { texte: string; feminin: boolean; pluriel: boolean; noyau?: string }
const SUJETS_SIMPLES: Sujet[] = [
  { texte: 'Ma tante', feminin: true, pluriel: false }, { texte: 'Mon oncle', feminin: false, pluriel: false },
  { texte: 'Les voisines', feminin: true, pluriel: true }, { texte: 'Mes cousins', feminin: false, pluriel: true },
  { texte: 'Elles', feminin: true, pluriel: true }, { texte: 'Ils', feminin: false, pluriel: true },
];
const SUJETS_COORDONNES: Sujet[] = [
  { texte: 'Tom et Léa', feminin: false, pluriel: true }, { texte: 'Inès et Nora', feminin: true, pluriel: true },
  { texte: 'Mon père et ma tante', feminin: false, pluriel: true }, { texte: 'Ma sœur et ma mère', feminin: true, pluriel: true },
];
// Groupes sujets avec un complément du nom : l'accord se fait avec le nom noyau.
const SUJETS_NOYAU: Sujet[] = [
  { texte: 'La mère des enfants', feminin: true, pluriel: false, noyau: 'mère' },
  { texte: 'Les amis de Léa', feminin: false, pluriel: true, noyau: 'amis' },
  { texte: 'Le fils des voisines', feminin: false, pluriel: false, noyau: 'fils' },
  { texte: 'Les sœurs de mon père', feminin: true, pluriel: true, noyau: 'sœurs' },
  { texte: 'Le frère des jumelles', feminin: false, pluriel: false, noyau: 'frère' },
  { texte: 'Les filles du boulanger', feminin: true, pluriel: true, noyau: 'filles' },
  { texte: 'La directrice de l’école', feminin: true, pluriel: false, noyau: 'directrice' },
  { texte: 'Les joueuses de l’équipe', feminin: true, pluriel: true, noyau: 'joueuses' },
];
export const PARTICIPES_ETRE_CM2: [string, string, string][] = [
  ['arriver', 'arrivé', 'en retard'], ['partir', 'parti', 'très tôt'], ['tomber', 'tombé', 'dans la boue'],
  ['venir', 'venu', 'à la fête'], ['rester', 'resté', 'à la maison'], ['sortir', 'sorti', 'sous la pluie'],
  ['entrer', 'entré', 'dans le magasin'], ['monter', 'monté', 'au grenier'], ['descendre', 'descendu', 'à la cave'],
  ['revenir', 'revenu', 'de vacances'],
];

export const participePasseEtreCm2 = creerGenerateur({
  id: 'participe-passe-etre-cm2',
  competence: 'FR-C3-CM2-ORTH-01',
  cycle: 3,
  description: 'Accorder le participe passé employé avec être avec le sujet, en repérant le nom noyau.',
  generer(a, d) {
    const sujets = d === 1 ? SUJETS_SIMPLES : d === 2 ? [...SUJETS_SIMPLES, ...SUJETS_COORDONNES] : [...SUJETS_NOYAU, ...SUJETS_COORDONNES];
    const s = a.choisir(sujets);
    const [inf, pp, suite] = a.choisir(PARTICIPES_ETRE_CM2);
    const aux = a.suivant() < 0.5 ? (s.pluriel ? 'sont' : 'est') : s.pluriel ? 'étaient' : 'était';
    const forme = pp + (s.feminin ? 'e' : '') + (s.pluriel ? 's' : '');
    const coordonne = s.texte.includes(' et ');
    return {
      gabarit: 'qcm',
      consigne: `Choisis la bonne forme du verbe « ${inf} » : ${s.texte} ${aux} … ${suite}.`,
      options: a.melanger([pp, `${pp}e`, `${pp}s`, `${pp}es`]),
      reponse: forme,
      indice: 'Avec l’auxiliaire être, le participe passé s’accorde avec le sujet. Cherche le nom noyau du sujet.',
      explication: `${s.noyau ? `Le nom noyau du sujet est « ${s.noyau} ». ` : ''}Le sujet est ${s.feminin ? 'féminin' : 'masculin'} ${s.pluriel ? 'pluriel' : 'singulier'}.${coordonne && !s.feminin ? ' Un masculin et un féminin ensemble donnent un masculin pluriel.' : ''} On écrit : ${s.texte} ${aux} ${forme}.`,
    };
  },
});

// ─────────── Accord du participe passé avec avoir

interface Objet { gn: string; demonstratif: string; feminin: boolean; pluriel: boolean; famille: 'fleur' | 'texte' | 'plat' | 'objet' }
export const OBJETS_COD: Objet[] = [
  { gn: 'les fleurs', demonstratif: 'Ces fleurs', feminin: true, pluriel: true, famille: 'fleur' },
  { gn: 'la rose', demonstratif: 'Cette rose', feminin: true, pluriel: false, famille: 'fleur' },
  { gn: 'les tulipes', demonstratif: 'Ces tulipes', feminin: true, pluriel: true, famille: 'fleur' },
  { gn: 'les champignons', demonstratif: 'Ces champignons', feminin: false, pluriel: true, famille: 'fleur' },
  { gn: 'le muguet', demonstratif: 'Ce muguet', feminin: false, pluriel: false, famille: 'fleur' },
  { gn: 'la lettre', demonstratif: 'Cette lettre', feminin: true, pluriel: false, famille: 'texte' },
  { gn: 'les lettres', demonstratif: 'Ces lettres', feminin: true, pluriel: true, famille: 'texte' },
  { gn: 'les poèmes', demonstratif: 'Ces poèmes', feminin: false, pluriel: true, famille: 'texte' },
  { gn: 'les histoires', demonstratif: 'Ces histoires', feminin: true, pluriel: true, famille: 'texte' },
  { gn: 'le message', demonstratif: 'Ce message', feminin: false, pluriel: false, famille: 'texte' },
  { gn: 'la tarte', demonstratif: 'Cette tarte', feminin: true, pluriel: false, famille: 'plat' },
  { gn: 'les crêpes', demonstratif: 'Ces crêpes', feminin: true, pluriel: true, famille: 'plat' },
  { gn: 'les tartes', demonstratif: 'Ces tartes', feminin: true, pluriel: true, famille: 'plat' },
  { gn: 'les gâteaux', demonstratif: 'Ces gâteaux', feminin: false, pluriel: true, famille: 'plat' },
  { gn: 'la soupe', demonstratif: 'Cette soupe', feminin: true, pluriel: false, famille: 'plat' },
  { gn: 'les clés', demonstratif: 'Ces clés', feminin: true, pluriel: true, famille: 'objet' },
  { gn: 'les lunettes', demonstratif: 'Ces lunettes', feminin: true, pluriel: true, famille: 'objet' },
  { gn: 'les jouets', demonstratif: 'Ces jouets', feminin: false, pluriel: true, famille: 'objet' },
  { gn: 'la valise', demonstratif: 'Cette valise', feminin: true, pluriel: false, famille: 'objet' },
];
// Chaque verbe déclare les compléments de temps ou de manière qui lui conviennent,
// et la fin de phrase de la difficulté 3 (au singulier, au pluriel).
interface VerbeCod { infinitif: string; participe: string; famille: Objet['famille']; complements: string[]; fin: [string, string] }
const VERBES_COD: VerbeCod[] = [
  { infinitif: 'cueillir', participe: 'cueilli', famille: 'fleur', complements: ['ce matin', 'dans le jardin', 'au bord du chemin'], fin: ['sent bon', 'sentent bon'] },
  { infinitif: 'choisir', participe: 'choisi', famille: 'fleur', complements: ['au marché', 'avec soin', 'chez le fleuriste'], fin: ['est magnifique', 'sont magnifiques'] },
  { infinitif: 'écrire', participe: 'écrit', famille: 'texte', complements: ['avec soin', 'hier soir', 'pendant les vacances'], fin: ['est très drôle', 'sont très drôles'] },
  { infinitif: 'lire', participe: 'lu', famille: 'texte', complements: ['à voix haute', 'hier soir', 'en classe'], fin: ['me plait', 'me plaisent'] },
  { infinitif: 'préparer', participe: 'préparé', famille: 'plat', complements: ['avec soin', 'pour le gouter', 'ce matin'], fin: ['sent bon', 'sentent bon'] },
  { infinitif: 'gouter', participe: 'gouté', famille: 'plat', complements: ['à la fête', 'hier', 'au dessert'], fin: ['avait bon gout', 'avaient bon gout'] },
  { infinitif: 'perdre', participe: 'perdu', famille: 'objet', complements: ['hier', 'dans le train', 'au parc'], fin: ['est introuvable', 'sont introuvables'] },
  { infinitif: 'ranger', participe: 'rangé', famille: 'objet', complements: ['avec soin', 'ce matin', 'dans le placard'], fin: ['est dans le placard', 'sont dans le placard'] },
  { infinitif: 'prendre', participe: 'pris', famille: 'objet', complements: ['ce matin', 'en partant', 'par erreur'], fin: ['est dans la voiture', 'sont dans la voiture'] },
];
const SUJETS_AVOIR = [['Léa', 'a'], ['Tom', 'a'], ['Ma grand-mère', 'a'], ['Les filles', 'ont'], ['Mes cousines', 'ont'], ['Nous', 'avons'], ['Vous', 'avez']] as const;
// Difficulté 3 : un sujet long sépare le COD « que » du participe passé.
const SUJETS_LOINTAINS = [
  ['ma grand-mère de Bretagne', 'a'], ['le voisin du troisième étage', 'a'], ['les enfants de la classe de CM2', 'ont'],
  ['mon oncle de Lyon', 'a'], ['la boulangère de la rue des Lilas', 'a'], ['mes cousines de Marseille', 'ont'],
] as const;
/** Minuscule initiale, sauf pour un nom propre : « Mon frère » devient « mon frère », « Nous » devient « nous ». */
const minuscule = (s: string) => (/^(Mon|Ma|Mes|Le|La|Les|Nos|Nous|Vous|Ces|Ce|Cette)( |$)/.test(s) ? s[0]!.toLowerCase() + s.slice(1) : s);

export const participePasseAvoirCm2 = creerGenerateur({
  id: 'participe-passe-avoir-cm2',
  competence: 'FR-C3-CM2-ORTH-02',
  cycle: 3,
  description: 'Accorder le participe passé employé avec avoir : avec le COD placé avant, jamais avec le sujet.',
  generer(a, d) {
    const v = a.choisir(VERBES_COD);
    const famille = OBJETS_COD.filter((x) => x.famille === v.famille);
    // Difficulté 3 : surtout des féminins pluriels, l'accord le plus visible.
    const fp = famille.filter((x) => x.feminin && x.pluriel);
    const o = d === 3 && a.suivant() < 0.7 ? a.choisir(fp) : a.choisir(famille);
    const pp = v.participe;
    const accord = (o.feminin ? 'e' : '') + (o.pluriel ? 's' : '');
    const accorde = pp.endsWith('s') && accord === 's' ? pp : pp + accord;
    const complement = a.choisir(v.complements);
    let phrase: string;
    let reponse: string;
    let explication: string;
    if (d === 1) {
      // COD placé après le verbe : pas d'accord, même avec un sujet féminin pluriel.
      const [sujet, aux] = a.choisir(SUJETS_AVOIR);
      phrase = `${sujet} ${aux} … ${o.gn} ${complement}.`;
      reponse = pp;
      explication = `Le COD « ${o.gn} » est placé après le verbe. Avec avoir, le participe passé ne s’accorde pas, même avec le sujet : « ${pp} ».`;
    } else if (d === 2) {
      const [sujet, aux] = a.choisir(SUJETS_AVOIR);
      const pronom = o.pluriel ? 'les ' : 'l’';
      phrase = `${o.demonstratif}, ${minuscule(sujet)} ${pronom}${aux} … ${complement}.`;
      reponse = accorde;
      explication = `Le COD est le pronom « ${pronom.trim()} », qui remplace « ${o.gn} ». Il est placé avant le verbe et il est ${o.feminin ? 'féminin' : 'masculin'} ${o.pluriel ? 'pluriel' : 'singulier'}. Le participe passé s’accorde avec lui : « ${accorde} ».`;
    } else {
      const [sujet, aux] = a.choisir(SUJETS_LOINTAINS);
      phrase = `${o.gn[0]!.toUpperCase()}${o.gn.slice(1)} que ${sujet} ${aux} … ${v.fin[o.pluriel ? 1 : 0]}.`;
      reponse = accorde;
      explication = `Le COD est « que », qui remplace « ${o.gn} ». Il est placé avant le verbe et il est ${o.feminin ? 'féminin' : 'masculin'} ${o.pluriel ? 'pluriel' : 'singulier'}. Le participe passé s’accorde avec lui, pas avec le sujet : « ${accorde} ».`;
    }
    return {
      gabarit: 'qcm',
      consigne: `Choisis la bonne forme du verbe « ${v.infinitif} » : ${phrase}`,
      options: a.melanger([...new Set([pp, `${pp}e`, pp.endsWith('s') ? pp : `${pp}s`, `${pp}es`])]),
      reponse,
      indice: 'Avec avoir, cherche le COD : se trouve-t-il avant ou après le verbe ?',
      explication,
    };
  },
});

// ─────────── Attribut du sujet, COD, COI

type Fonction = 'attribut du sujet' | 'COD' | 'COI';
// Phrases entièrement rédigées, une liste par difficulté ; le groupe à analyser est entre crochets.
export const PHRASES_FONCTIONS_CM2: Record<Fonction, string[]>[] = [
  {
    'attribut du sujet': ['Mon frère est [calme].', 'La soupe est [chaude].', 'Ces enfants semblent [heureux].', 'Le ciel devient [gris].',
      'Ma cousine reste [prudente].', 'Le chemin parait [long].', 'Les pommes sont [mûres].', 'Le chat semble [fatigué].',
      'Mes sœurs sont [contentes].', 'Le lac reste [gelé].'],
    COD: ['Le jardinier arrose [les fleurs].', 'Nina dessine [un cheval].', 'Nous écoutons [la radio].', 'Mon père conduit [le camion].',
      'Le boulanger prépare [le pain].', 'Elle ouvre [la fenêtre].', 'Les élèves rangent [leurs cahiers].', 'Tom lit [un roman].',
      'Le chat attrape [une souris].', 'Léa cherche [sa clé].'],
    COI: ['Il téléphone [à sa grand-mère].', 'Je pense [à mes vacances].', 'Le chien obéit [à son maitre].', 'Tu ressembles [à ton père].',
      'Nous parlons [à la directrice].', 'Le bébé sourit [à sa mère].', 'Les joueurs obéissent [à l’arbitre].', 'Léa écrit [à son cousin].',
      'Tom répond [à la maitresse].', 'Elle pense [à son anniversaire].'],
  },
  {
    'attribut du sujet': ['Après la longue randonnée, les marcheurs semblent [très fatigués].', 'Depuis sa victoire au tournoi, ma sœur est [très fière d’elle].',
      'À la fin de l’hiver, la rivière devient [boueuse et rapide].', 'Malgré le bruit de l’orage, le vieux chien reste [parfaitement calme].',
      'Au coucher du soleil, le ciel de la plage devient [rose et orangé].', 'Le jour de la rentrée, les nouveaux élèves paraissent [un peu inquiets].',
      'Pendant tout le spectacle, les enfants de la crèche sont restés [très sages].', 'Après plusieurs heures de cuisson, la confiture devient [épaisse].',
      'Depuis le début de la semaine, notre voisine semble [de très bonne humeur].', 'Un jour, mon petit frère deviendra [pilote d’avion].'],
    COD: ['Chaque matin, le jardinier arrose [les fleurs du jardin public].', 'Pour l’anniversaire de Léa, son père prépare [un énorme gâteau au chocolat].',
      'Le soir, au coin du feu, ma grand-mère raconte [une vieille légende bretonne].', 'Pendant les vacances, nous avons visité [le château de Versailles].',
      'Dans son atelier, le menuisier fabrique [une grande table en chêne].', 'Avec patience, mon frère répare [le vieux vélo rouillé du grenier].',
      'Au marché, la marchande vend [les premières fraises de la saison].', 'En classe, les élèves écoutent [l’histoire du Petit Prince].',
      'Le week-end dernier, mes parents ont repeint [la porte du garage].', 'Sur la plage, les enfants construisent [un immense château de sable].'],
    COI: ['Chaque dimanche, Malik téléphone [à ses grands-parents de Marseille].', 'Pendant la récréation, les élèves parlent [au directeur de l’école].',
      'Depuis plusieurs semaines, Inès pense [à son prochain voyage en Italie].', 'Sur le terrain, les joueurs obéissent [aux règles du jeu].',
      'En grandissant, mon cousin ressemble [à son grand-père paternel].', 'Au début de sa lettre, Léa s’adresse [à sa correspondante anglaise].',
      'À la fin du spectacle, le public sourit [aux acrobates du cirque].', 'Tous les soirs, Hugo écrit [à son meilleur ami de Lyon].',
      'Dans son discours, le maire a pensé [aux habitants du village].', 'Après la course, le gagnant répond [aux questions des journalistes].'],
  },
  {
    'attribut du sujet': ['Après sa chute, le cycliste était [couvert de boue].', 'Un jour, ma cousine deviendra [vétérinaire].',
      'Malgré la pluie, le match restera [passionnant].', 'Pendant la nuit, la mer paraissait [calme].', 'À cette époque, mon grand-père était [boulanger].',
      'Avec le temps, ces deux voisins sont devenus [amis].', 'La semaine dernière, la petite chatte semblait [malade].',
      'En quelques minutes, le ciel est devenu [menaçant].', 'Au fil des années, la vieille maison était devenue [une ruine].',
      'Toute sa vie, ce marin restera [un aventurier].'],
    COD: ['Ce cadeau, ma sœur [le] garde précieusement.', 'Cette chanson, nous [la] chantons tous les jours.', 'Mes cahiers, je [les] range dans mon cartable.',
      'Le facteur sonne : maman [l’]accueille.', 'Ces photos, mon père [les] a encadrées.', 'Le vieux pont menaçait de tomber : on [l’]a réparé.',
      'Cette histoire, je [la] connais par cœur.', 'La nuit, on entend [le cri de la chouette].', 'Avant le départ, vérifie [l’heure du train].',
      'Pendant la sortie, j’ai perdu [mon bonnet de laine].'],
    COI: ['Mon frère se souvient [de ses vacances au ski].', 'Les enfants s’occupent [du jardin potager].', 'Nous avons parlé [de ton projet].',
      'Léa rêve [d’un voyage en Islande].', 'La maitresse doute [de la réponse].', 'Le chat profite [du soleil].', 'Ma grand-mère [lui] écrit chaque semaine.',
      'Sur le terrain, les joueurs [leur] obéissent sans discuter.', 'Quand il voit ses amis, Tom [leur] sourit.', 'Pour finir sa maquette, Inès a besoin [de ton aide].'],
  },
];
const EXPLICATIONS_FONCTION: Record<Fonction, string> = {
  'attribut du sujet': 'Le verbe est un verbe d’état : le groupe donne une caractéristique du sujet. C’est un attribut du sujet.',
  COD: 'Le verbe n’est pas un verbe d’état. Le groupe complète le verbe sans préposition : c’est un COD.',
  COI: 'Le groupe complète le verbe. Il est introduit par une préposition (à, de) : c’est un COI.',
};

export const fonctionsCm2 = creerGenerateur({
  id: 'fonctions-cm2',
  competence: 'FR-C3-CM2-GRAM-01',
  cycle: 3,
  description: 'Différencier attribut du sujet et complément d’objet, puis COD et COI.',
  generer(a, d) {
    const f = a.choisir(['attribut du sujet', 'COD', 'COI'] as Fonction[]);
    const brute = a.choisir(PHRASES_FONCTIONS_CM2[d - 1]![f]);
    const groupe = brute.match(/\[(.+?)\]/)![1]!;
    const phrase = brute.replace(/[[\]]/g, '');
    if (d === 1) {
      return {
        gabarit: 'qcm',
        consigne: `Dans « ${phrase} », quelle est la fonction de « ${groupe} » ?`,
        options: a.melanger(['attribut du sujet', 'complément d’objet', 'complément circonstanciel']),
        reponse: f === 'attribut du sujet' ? f : 'complément d’objet',
        indice: 'Repère le verbe. Est-ce un verbe d’état comme être, devenir, sembler, paraitre, rester ?',
        explication: f === 'attribut du sujet'
          ? EXPLICATIONS_FONCTION[f]
          : `Le verbe n’est pas un verbe d’état. « ${groupe} » complète le verbe et ne peut être ni déplacé ni supprimé : c’est un complément d’objet.`,
      };
    }
    const pronom = ['le', 'la', 'les', 'l’', 'lui', 'leur'].includes(groupe);
    return {
      gabarit: 'qcm',
      consigne: `Dans « ${phrase} », quelle est la fonction de « ${groupe} » ?`,
      options: a.melanger(['attribut du sujet', 'COD', 'COI']),
      reponse: f,
      indice: 'Verbe d’état : attribut. Sinon, regarde si le complément est introduit par une préposition (à, de).',
      explication: pronom
        ? `« ${groupe} » est un pronom complément placé devant le verbe. ${f === 'COD' ? 'Le, la, l’, les remplacent un COD.' : 'Lui et leur remplacent un COI introduit par « à ».'} C’est un ${f}.`
        : EXPLICATIONS_FONCTION[f],
    };
  },
});

// ─────────── Compléments circonstanciels de temps, de lieu, de cause

type Circonstance = 'temps' | 'lieu' | 'cause';
// Le groupe à analyser est entre crochets. Une liste par difficulté.
export const PHRASES_CC: Record<Circonstance, string[]>[] = [
  {
    temps: ['Nous partirons [demain].', 'Le magasin ouvre [à neuf heures].', 'Les hirondelles reviennent [au printemps].',
      'Il a neigé [cette nuit].', 'Léo se lève [à sept heures].', 'Le marché a lieu [chaque samedi].', 'Nous dinons [le soir].',
      'Ma tante arrive [lundi].', 'Le film commence [à vingt heures].', 'Les feuilles tombent [en automne].'],
    lieu: ['Le chat dort [sur le canapé].', 'Les poissons nagent [dans la rivière].', 'Mon oncle habite [à Marseille].',
      'Les enfants jouent [dans la cour].', 'Le ballon roule [sous la voiture].', 'Nous mangeons [à la cantine].',
      'Un écureuil grimpe [dans l’arbre].', 'Les vaches broutent [dans le pré].', 'Le facteur attend [devant la porte].'],
    cause: ['Le match est annulé [à cause de la pluie].', 'Le chiot tremble [de froid].', 'Tom est absent [à cause d’un rhume].',
      'Les plantes ont séché [faute d’eau].', 'Elle rougit [de honte].', 'Il pleure [de joie].', 'La route est fermée [à cause de la neige].',
      'Le bébé pleure [de faim].', 'Le spectacle est reporté [en raison de l’orage].'],
  },
  {
    temps: ['[Pendant les grandes vacances d’été], nous partons à la montagne.', '[Tous les mercredis après-midi], Lina va à la piscine.',
      '[Le lendemain de la fête], la maison était en désordre.', '[Depuis le début de l’année], la classe élève des phasmes.',
      '[Au lever du soleil], les oiseaux chantent.', '[Chaque soir avant le diner], Hugo fait ses devoirs.',
      '[Il y a deux jours], une tempête a frappé la côte.', '[À la fin du spectacle], le public a applaudi.',
      '[L’hiver dernier], le lac était gelé.', '[Le premier jour des vacances], nous avons rangé le grenier.'],
    lieu: ['[Au fond du jardin de mes grands-parents], un vieux cerisier fleurit.', '[Sur la plus haute branche du chêne], une pie a fait son nid.',
      '[Derrière la grande maison blanche], il y a un potager.', '[Au bord de la mer], le vent souffle fort.',
      '[Sous le pont de pierre], les péniches passent lentement.', '[Dans la cuisine de la cantine], les cuisiniers préparent le repas.',
      '[Au sommet de la montagne], la neige ne fond jamais.', '[Près de la fontaine du village], des enfants jouent.',
      '[Entre les deux immeubles], un petit parc a été aménagé.', '[À l’entrée du musée], un guide accueille les visiteurs.'],
    cause: ['[À cause de la violente tempête], l’école est fermée.', '[Grâce à l’aide de ses camarades], Léo a terminé sa maquette.',
      '[Par peur du gros chien noir], le facteur reste au portail.', '[En raison des travaux], le bus est en retard.',
      '[À cause d’une panne d’électricité], le magasin a fermé.', '[Grâce au vent], le voilier avance vite.',
      '[Par manque d’entrainement], l’équipe a perdu.', '[Pour cause de grève], le train est supprimé.',
      '[Grâce à ses lunettes neuves], Inès lit sans difficulté.'],
  },
  {
    temps: ['[Quand la cloche sonne], les élèves rangent leurs affaires.', '[Lorsque le soleil se couche], les chauves-souris sortent.',
      '[Dès que tu arriveras], nous passerons à table.', 'Les enfants se sont tus [au moment où le conteur a commencé].',
      '[Avant que la nuit tombe], rentre les vélos.', '[Pendant que maman lit], papa cuisine.', '[Après avoir mangé], nous irons au parc.',
      'Le chien aboie [chaque fois que quelqu’un sonne].', '[Tant que la pluie dure], nous restons à l’intérieur.'],
    lieu: ['[Là où passe la rivière], la terre est fertile.', 'Nous camperons [là où les arbres font de l’ombre].',
      '[Au pied de l’immense falaise qui domine la baie], des phoques se reposent.', '[Partout où il va], son chien le suit.',
      'Le chat se cache [sous le lit de la chambre d’amis].', '[Au milieu de la forêt de sapins], se cache une cabane.',
      '[De l’autre côté de la rue], une boulangerie vient d’ouvrir.', '[Tout en haut de la tour Eiffel], les touristes admirent Paris.',
      '[À travers les volets fermés], la lumière passe.', '[Le long du canal], des pêcheurs attendent.'],
    cause: ['[Comme il pleuvait], le pique-nique a été annulé.', 'Le bébé pleure [parce qu’il a faim].',
      'Nous restons à l’intérieur [parce qu’il fait trop froid].', '[Comme la route était glissante], le car roulait lentement.',
      '[Puisque tu as fini], tu peux sortir.', 'Léa a réussi [parce qu’elle s’est bien entrainée].',
      '[Comme le musée était fermé], nous sommes allés au parc.', 'Il a mis son manteau [parce que le vent soufflait fort].',
      '[Puisqu’il neige], nous ferons un bonhomme de neige.'],
  },
];
const QUESTIONS_CC: Record<Circonstance, string> = { temps: 'Quand ?', lieu: 'Où ?', cause: 'Pourquoi ?' };

export const complementsCirconstancielsCm2 = creerGenerateur({
  id: 'complements-circonstanciels-cm2',
  competence: 'FR-C3-CM2-GRAM-02',
  cycle: 3,
  description: 'Différencier les compléments circonstanciels de temps, de lieu et de cause.',
  generer(a, d) {
    const c = a.choisir(['temps', 'lieu', 'cause'] as Circonstance[]);
    const brute = a.choisir(PHRASES_CC[d - 1]![c]);
    const groupe = brute.match(/\[(.+?)\]/)![1]!;
    const phrase = brute.replace(/[[\]]/g, '');
    const nom = (x: Circonstance) => `complément circonstanciel de ${x}`;
    return {
      gabarit: 'qcm',
      consigne: `Dans « ${phrase} », quelle est la fonction de « ${groupe} » ?`,
      options: a.melanger((['temps', 'lieu', 'cause'] as Circonstance[]).map(nom)),
      reponse: nom(c),
      indice: d === 3 ? 'Le complément peut contenir un verbe. Pose les questions : quand ? où ? pourquoi ?' : 'Pose les questions : quand ? où ? pourquoi ?',
      explication: `« ${groupe} » répond à la question « ${QUESTIONS_CC[c]} ». On peut le déplacer ou le supprimer. C’est un ${nom(c)}.`,
    };
  },
});

// ─────────── Sujet inversé

// Difficulté 1 : incises de dialogue. [réplique, deux groupes qui ne sont pas le sujet, type]
// Le verbe d'incise dépend du type : question (demander), affirmation (dire, répondre), exclamation (s'écrier, dire).
type Replique = 'question' | 'affirmation' | 'exclamation';
const REPLIQUES: [string, string, string, Replique][] = [
  ['Où es-tu ?', 'tu', 'Où', 'question'], ['Qui veut du gâteau ?', 'Qui', 'gâteau', 'question'], ['Tu viens jouer ?', 'Tu', 'jouer', 'question'],
  ['Nous partons demain.', 'Nous', 'demain', 'affirmation'], ['Il fait froid.', 'Il', 'froid', 'affirmation'],
  ['Vous êtes en retard.', 'Vous', 'retard', 'affirmation'], ['Le train arrive !', 'Le train', 'arrive', 'exclamation'],
  ['Tu as gagné !', 'Tu', 'gagné', 'exclamation'], ['Attention, il glisse !', 'il', 'Attention', 'exclamation'],
];
const INCISES: Record<Replique, [string, string][]> = {
  question: [['demande', 'demandent']],
  affirmation: [['dit', 'disent'], ['répond', 'répondent'], ['explique', 'expliquent']],
  exclamation: [['s’écrie', 's’écrient'], ['dit', 'disent']],
};
const LOCUTEURS = [['Léa', false], ['le facteur', false], ['la maitresse', false], ['mon grand-père', false], ['les enfants', true], ['mes cousines', true]] as const;
const INVERSIONS_COURTES: [string, string, string, string, string][] = [
  ['Dans la forêt vivent des loups.', 'vivent', 'des loups', 'la forêt', 'Dans la forêt'],
  ['Soudain, au loin, apparurent deux cavaliers.', 'apparurent', 'deux cavaliers', 'Soudain', 'au loin'],
  ['Alors, sur son cheval blanc, arriva le prince.', 'arriva', 'le prince', 'son cheval blanc', 'Alors'],
  ['Dans le ciel brillent les étoiles.', 'brillent', 'les étoiles', 'le ciel', 'Dans le ciel'],
  ['Sous le pont passent les péniches.', 'passent', 'les péniches', 'le pont', 'Sous le pont'],
  ['Sur la table trainent des miettes.', 'trainent', 'des miettes', 'la table', 'Sur la table'],
];
// Difficulté 2 : phrases rédigées, long complément en tête. [phrase, verbe, sujet, deux groupes placés avant le verbe]
const INVERSIONS_LONGUES: [string, string, string, string, string][] = [
  ['Au fond du vieux jardin de mes grands-parents pousse un immense cerisier.', 'pousse', 'un immense cerisier', 'Au fond du vieux jardin', 'mes grands-parents'],
  ['Sur la plus haute colline de la région se dresse un château fort.', 'se dresse', 'un château fort', 'Sur la plus haute colline', 'la région'],
  ['Au bord du petit étang du village vit une famille de canards.', 'vit', 'une famille de canards', 'Au bord du petit étang', 'du village'],
  ['Derrière les grilles rouillées du parc se cache un jardin secret.', 'se cache', 'un jardin secret', 'les grilles rouillées', 'du parc'],
  ['Le long du chemin des écoliers poussent des mûres sauvages.', 'poussent', 'des mûres sauvages', 'Le long du chemin', 'des écoliers'],
  ['Au milieu de la grande prairie broutent les chevaux du fermier.', 'broutent', 'les chevaux du fermier', 'la grande prairie', 'Au milieu'],
  ['Dans la vitrine de la boulangerie brillent les gâteaux de la fête.', 'brillent', 'les gâteaux de la fête', 'la vitrine', 'la boulangerie'],
  ['Sous les branches du vieux tilleul dort un chat roux.', 'dort', 'un chat roux', 'les branches', 'du vieux tilleul'],
  ['Au sommet du clocher de l’église sonnent les cloches du dimanche.', 'sonnent', 'les cloches du dimanche', 'Au sommet du clocher', 'l’église'],
  ['Tout au bout de la rue principale se trouve la boulangerie de mon oncle.', 'se trouve', 'la boulangerie de mon oncle', 'la rue principale', 'Tout au bout'],
  ['Dans le grenier de la vieille maison dorment des malles poussiéreuses.', 'dorment', 'des malles poussiéreuses', 'le grenier', 'la vieille maison'],
  ['Au pied de la montagne s’étend un lac aux eaux claires.', 's’étend', 'un lac aux eaux claires', 'la montagne', 'Au pied'],
  ['Sur les rochers de la côte se reposent les phoques.', 'se reposent', 'les phoques', 'les rochers', 'la côte'],
  ['Entre les deux immeubles du quartier passe une petite rue pavée.', 'passe', 'une petite rue pavée', 'les deux immeubles', 'du quartier'],
  ['Au-dessus des toits de la ville volent des milliers d’étourneaux.', 'volent', 'des milliers d’étourneaux', 'des toits', 'la ville'],
  ['Près de la fontaine de la place jouent les enfants du quartier.', 'jouent', 'les enfants du quartier', 'la fontaine', 'la place'],
  ['Dans la grande cage du zoo tourne un ours brun.', 'tourne', 'un ours brun', 'la grande cage', 'du zoo'],
  ['Au fond de l’océan vivent des poissons étranges.', 'vivent', 'des poissons étranges', 'l’océan', 'Au fond'],
  ['Sur l’étagère de ma chambre trônent mes coupes de judo.', 'trônent', 'mes coupes de judo', 'l’étagère', 'ma chambre'],
  ['À l’entrée du musée attend un guide souriant.', 'attend', 'un guide souriant', 'l’entrée', 'du musée'],
  ['Derrière la colline aux moulins se cache un petit village.', 'se cache', 'un petit village', 'la colline aux moulins', 'Derrière la colline'],
  ['Au bord de la route départementale fleurissent les coquelicots.', 'fleurissent', 'les coquelicots', 'la route départementale', 'Au bord'],
  ['Dans le ciel d’été passent les hirondelles.', 'passent', 'les hirondelles', 'le ciel', 'Dans le ciel d’été'],
  ['Au loin, sur la mer calme, avance un grand voilier.', 'avance', 'un grand voilier', 'Au loin', 'la mer calme'],
  ['Chaque soir, au cœur de la forêt, chante un rossignol.', 'chante', 'un rossignol', 'la forêt', 'Chaque soir'],
  ['Dans la cour de l’école résonnent les cris des élèves.', 'résonnent', 'les cris des élèves', 'la cour de l’école', 'la cour'],
  ['Au premier étage de l’immeuble habite une vieille dame.', 'habite', 'une vieille dame', 'Au premier étage', 'l’immeuble'],
  ['Sous le pont de pierre coule une rivière tranquille.', 'coule', 'une rivière tranquille', 'le pont de pierre', 'Sous le pont'],
  ['Sur le rebord de la fenêtre se chauffent deux chats.', 'se chauffent', 'deux chats', 'la fenêtre', 'le rebord'],
  ['Au milieu du lac flotte une petite barque.', 'flotte', 'une petite barque', 'du lac', 'Au milieu du lac'],
];
// Difficulté 3 : sujet inversé dans une proposition relative. [antécédent, verbe singulier, verbe pluriel, fin de phrase]
const RELATIVES: [string, string, string, string][] = [
  ['Le gâteau', 'prépare', 'préparent', 'sent bon'], ['Les lettres', 'écrit', 'écrivent', 'sont très drôles'],
  ['La chanson', 'chante', 'chantent', 'me plait'], ['Le livre', 'lit', 'lisent', 'est passionnant'],
  ['Les dessins', 'fait', 'font', 'sont affichés'], ['La maison', 'habite', 'habitent', 'est grande'],
];
const SUJETS_RELATIVES = [['ma tante', false], ['mon grand-père', false], ['la voisine', false], ['Léo', false], ['mes cousins', true], ['les élèves de CM2', true]] as const;

export const sujetInverseCm2 = creerGenerateur({
  id: 'sujet-inverse-cm2',
  competence: 'FR-C3-CM2-GRAM-03',
  cycle: 3,
  description: 'Identifier le sujet placé après le verbe.',
  generer(a, d) {
    let phrase: string;
    let verbe: string;
    let sujet: string;
    let pieges: string[];
    if (d === 1 && a.suivant() < 0.6) {
      const [replique, p1, p2, type] = a.choisir(REPLIQUES);
      const [loc, pluriel] = a.choisir(LOCUTEURS);
      verbe = a.choisir(INCISES[type])[pluriel ? 1 : 0];
      sujet = loc;
      const texte = replique.endsWith('.') ? `« ${replique.slice(0, -1)} »,` : `« ${replique} »`;
      phrase = `${texte} ${verbe} ${loc}.`;
      pieges = [p1, p2];
    } else if (d === 1) {
      const [p, v, s, p1, p2] = a.choisir(INVERSIONS_COURTES);
      [phrase, verbe, sujet, pieges] = [p, v, s, [p1, p2]];
    } else if (d === 2) {
      const [p, v, s, p1, p2] = a.choisir(INVERSIONS_LONGUES);
      [phrase, verbe, sujet, pieges] = [p, v, s, [p1, p2]];
    } else {
      const [antecedent, v1, v2, fin] = a.choisir(RELATIVES);
      const [s, pluriel] = a.choisir(SUJETS_RELATIVES);
      verbe = pluriel ? v2 : v1;
      const que = /^[aeéèêiouh]/.test(verbe) ? 'qu’' : 'que ';
      phrase = `${antecedent} ${que}${verbe} ${s} ${fin}.`;
      sujet = s;
      pieges = [antecedent, 'que'];
    }
    return {
      gabarit: 'qcm',
      consigne: `Dans « ${phrase} », quel est le sujet du verbe « ${verbe} » ?`,
      options: a.melanger([sujet, ...pieges]),
      reponse: sujet,
      indice: `Pose la question « Qui est-ce qui ${verbe} ? » ou encadre avec « c’est… qui ».`,
      explication: `C’est « ${sujet} » qui ${verbe}. Le sujet est placé après le verbe : on dit qu’il est inversé. Le verbe s’accorde avec lui.`,
    };
  },
});

// ─────────── Prépositions, conjonctions, adverbes

type Classe = 'préposition' | 'conjonction de coordination' | 'conjonction de subordination' | 'adverbe';
// Le mot à analyser est entre crochets ; « [a|b] » propose plusieurs mots possibles au même endroit.
export const PHRASES_CLASSES: Partial<Record<Classe, string[]>>[] = [
  {
    préposition: ['Le chat dort [sous|sur] le lit.', 'Je pars [avec|sans] mon frère.', 'Nous allons [chez] nos grands-parents.',
      'Ce cadeau est [pour] toi.', 'La clé est [dans] mon sac.', 'Le ballon roule [vers] la route.', 'Elle s’assoit [entre] ses amies.',
      'Il marche [derrière|devant] moi.', 'Nous jouons [après] l’école.'],
    'conjonction de coordination': ['Il fait beau [mais] il fait froid.', 'Veux-tu du lait [ou] du jus ?', 'Léa chante [et] Tom danse.',
      'Je reste ici [car] il pleut.', 'Le magasin est fermé, [donc] nous rentrons.'],
    adverbe: ['Mon frère court [vite|lentement].', 'Nous allons [souvent|parfois] à la piscine.', 'Ce film est [très|assez] drôle.',
      'Il ne ment [jamais].', 'Les vacances arrivent [bientôt].', 'Tu travailles [beaucoup|peu].'],
  },
  {
    préposition: ['Malik construit une cabane [avec] les planches du vieux hangar.', 'Les enfants jouent [dans] la cour de l’école.', 'Le facteur s’arrête [devant|derrière] la maison du maire.',
      'Le train part [pour|vers] Lyon à huit heures.', 'Elle a reçu une lettre [de] sa correspondante anglaise.', 'Le chat se cache [sous] le canapé du salon.'],
    'conjonction de coordination': ['Il voulait venir [mais] il était malade.', 'Tu peux prendre le bus [ou] le métro.',
      'Elle range ses livres [et] ses cahiers.', 'Le gardien a sifflé, [donc] le match est fini.'],
    'conjonction de subordination': ['Je me lève [quand|lorsque] le réveil sonne.', 'Je reste à la maison [parce que] je suis malade.',
      '[Si] tu viens, apporte ton ballon.', 'Je sais [que] tu as raison.', '[Puisque] tu insistes, je viens avec toi.',
      'Nous rentrerons [dès que] la pluie s’arrêtera.', 'Le spectacle commencera [lorsque] tout le monde sera assis.'],
    adverbe: ['Le vieux chien marche [lentement|difficilement] dans le jardin.', 'Mon grand-père se lève [toujours|souvent] de bonne heure.',
      'Les élèves écoutent [attentivement] la maitresse.', 'Il fait [vraiment] froid ce matin.'],
  },
  {
    préposition: ['Nous avons marché [jusqu’à] la plage.', 'Le ballon est [près de|loin de] la cage.', 'Il est resté chez lui [à cause de] la neige.',
      'Elle a réussi [grâce à] ton aide.', 'Les oiseaux volent [au-dessus de] la maison.', 'Il s’assoit [à côté de] son frère.',
      'Il habite [en face de] l’école.'],
    'conjonction de coordination': ['Il n’aime ni le thé [ni] le café.', 'Je voulais sortir, [or] il pleuvait.',
      'Il était tard, [donc] nous sommes rentrés.', 'Elle est fatiguée [car] elle a couru.', 'Tu viens [ou] tu restes ?'],
    'conjonction de subordination': ['[Comme] il pleuvait, nous sommes restés.', 'Range ta chambre [avant que] maman arrive.',
      'Il lit [pendant que] sa sœur dessine.', 'Nous partirons [dès que] le soleil se lèvera.', 'Il est parti [parce qu’]il était en retard.'],
    adverbe: ['Il s’est arrêté [tout à coup].', 'Nous viendrons [peut-être] demain.', 'Elle a [presque] fini.', 'Il a [déjà] mangé.',
      'Ils sont arrivés [ensemble].', 'Elle parle [doucement|calmement].', 'Nous sommes [bientôt] arrivés.'],
  },
];
const RAPPELS_CLASSES: Record<Classe, string> = {
  préposition: 'Une préposition introduit un complément : à, de, avec, dans, pour, sans, chez… Elle peut compter plusieurs mots : à cause de, grâce à.',
  'conjonction de coordination': 'Mais, ou, et, donc, or, ni, car relient deux éléments de même niveau : ce sont les conjonctions de coordination.',
  'conjonction de subordination': 'Une conjonction de subordination introduit une proposition qui dépend d’une autre.',
  adverbe: 'Un adverbe est invariable. Il précise le sens d’un verbe, d’un adjectif ou d’un autre adverbe.',
};

export const classesMotsCm2 = creerGenerateur({
  id: 'classes-mots-cm2',
  competence: 'FR-C3-CM2-GRAM-04',
  cycle: 3,
  description: 'Identifier prépositions, conjonctions de coordination et de subordination, adverbes.',
  generer(a, d) {
    const corpus = PHRASES_CLASSES[d - 1]!;
    const c = a.choisir(Object.keys(corpus) as Classe[]);
    const brute = a.choisir(corpus[c]!);
    const choix = brute.match(/\[(.+?)\]/)![1]!.split('|');
    const mot = a.choisir(choix);
    const phrase = brute.replace(/\[.+?\]/, mot);
    const affiche = mot.charAt(0).toLowerCase() + mot.slice(1);
    return {
      gabarit: 'qcm',
      consigne: `Dans « ${phrase} », quelle est la classe ${affiche.includes(' ') || affiche.includes('-') || affiche.endsWith('’') ? 'de « ' : 'du mot « '}${affiche} » ?`,
      options: a.melanger(['préposition', 'conjonction de coordination', 'conjonction de subordination', 'adverbe']),
      reponse: c,
      indice: 'Le mot introduit-il un groupe nominal, relie-t-il deux éléments, introduit-il une proposition, ou précise-t-il un verbe ?',
      explication: `« ${affiche} » est ${c === 'adverbe' ? 'un adverbe' : c === 'préposition' ? 'une préposition' : `une ${c}`}. ${RAPPELS_CLASSES[c]}`,
    };
  },
});

// ─────────── Pronoms personnels compléments d'objet

interface VerbePronom { il: string; tu: string; coi: boolean }
// Verbes qui conviennent à n'importe quelle personne comme complément.
const VERBES_PRONOM: VerbePronom[] = [
  { il: 'regarde', tu: 'regardes', coi: false }, { il: 'écoute', tu: 'écoutes', coi: false }, { il: 'aide', tu: 'aides', coi: false },
  { il: 'attend', tu: 'attends', coi: false }, { il: 'cherche', tu: 'cherches', coi: false }, { il: 'appelle', tu: 'appelles', coi: false },
  { il: 'parle', tu: 'parles', coi: true }, { il: 'téléphone', tu: 'téléphones', coi: true }, { il: 'répond', tu: 'réponds', coi: true },
  { il: 'sourit', tu: 'souris', coi: true }, { il: 'écrit', tu: 'écris', coi: true },
];
// [groupe nominal, féminin, pluriel]
// [groupe nominal, féminin, pluriel] ; pas de possessif son, sa, ses, qui sonnerait faux avec « Tu ».
const PERSONNES_GN: [string, boolean, boolean][] = [
  ['le facteur', false, false], ['le voisin', false, false], ['ce garçon', false, false], ['mon cousin', false, false],
  ['la maitresse', true, false], ['la boulangère', true, false], ['cette fille', true, false], ['ma cousine', true, false],
  ['les enfants', false, true], ['les jumeaux', false, true], ['mes amis', false, true], ['ces voisines', true, true],
];
/** « le facteur » devient « au facteur », « les enfants » devient « aux enfants ». */
const avecA = (gn: string) => (gn.startsWith('le ') ? `au ${gn.slice(3)}` : gn.startsWith('les ') ? `aux ${gn.slice(4)}` : `à ${gn}`);
const voyelle = (s: string) => /^[aeéèêiouh]/.test(s);

export const pronomsComplementsCm2 = creerGenerateur({
  id: 'pronoms-complements-cm2',
  competence: 'FR-C3-CM2-GRAM-06',
  cycle: 3,
  description: 'Remplacer un complément d’objet par le pronom personnel qui convient et le placer devant le verbe.',
  generer(a, d) {
    const verbes = d === 1 ? VERBES_PRONOM.filter((v) => !v.coi) : VERBES_PRONOM;
    const v = a.choisir(verbes);
    const [gn, feminin, pluriel] = a.choisir(PERSONNES_GN);
    const tu = d === 3 && a.suivant() < 0.5;
    const sujet = tu ? 'Tu' : a.choisir(['Léa', 'Tom', 'Inès', 'Hugo', 'Malik']);
    const forme = tu ? v.tu : v.il;
    const negatif = d === 3;
    const complement = v.coi ? avecA(gn) : gn;
    const pronom = v.coi ? (pluriel ? 'leur' : 'lui') : pluriel ? 'les' : feminin ? 'la' : 'le';
    const devant = (p: string) => (['le', 'la'].includes(p) && voyelle(forme) ? 'l’' : `${p} `);
    const neg = (p: string) => (negatif ? `ne ${p}` : p);
    const fin = negatif ? ' pas' : '';
    const ne = negatif ? (voyelle(forme) ? 'n’' : 'ne ') : '';
    const phrase = `${sujet} ${ne}${forme}${fin} ${complement}.`;
    const construire = (p: string) => `${sujet} ${neg(devant(p))}${forme}${fin}.`;
    const reponse = construire(pronom);
    const autres = ['le', 'la', 'les', 'lui', 'leur'].filter((p) => p !== pronom);
    const pieges = [
      ...a.melanger(autres).slice(0, 2).map(construire),
      // Pronom mal placé : avant « ne », ou après le verbe.
      negatif ? `${sujet} ${pronom} ${ne}${forme} pas.` : `${sujet} ${forme} ${pronom}.`,
    ];
    return {
      gabarit: 'qcm',
      consigne: `Remplace « ${complement} » par un pronom personnel : ${phrase}`,
      options: options(a, reponse, pieges, () => construire(a.choisir(autres))),
      reponse,
      indice: v.coi ? 'Le complément est introduit par « à » : c’est un COI.' : 'Le complément suit le verbe sans préposition : c’est un COD.',
      explication: v.coi
        ? `« ${complement} » est un COI ${pluriel ? 'pluriel' : 'singulier'}. On le remplace par « ${pronom} », placé devant le verbe${negatif ? ', après « ne »' : ''}. On écrit : ${reponse}`
        : `« ${complement} » est un COD ${feminin ? 'féminin' : 'masculin'} ${pluriel ? 'pluriel' : 'singulier'}. On le remplace par « ${pronom} », placé devant le verbe${negatif ? ', après « ne »' : ''}. On écrit : ${reponse}`,
    };
  },
});

// ─────────── Forme négative aux temps composés

const AUX_AVOIR = { pc: ['ai', 'as', 'a', 'avons', 'avez', 'ont'], pqp: ['avais', 'avais', 'avait', 'avions', 'aviez', 'avaient'] };
const AUX_ETRE = { pc: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'], pqp: ['étais', 'étais', 'était', 'étions', 'étiez', 'étaient'] };
// [sujet, rang de conjugaison, féminin]
const SUJETS_NEG: [string, number, boolean][] = [
  ['Léa', 2, true], ['Tom', 2, false], ['Tu', 1, false], ['Nous', 3, false], ['Vous', 4, false], ['Les enfants', 5, false],
  ['Mes cousines', 5, true], ['Mon frère', 2, false], ['Elles', 5, true],
];
type Adverbe = 'pas' | 'jamais';
// Chaque groupe verbal déclare les adverbes qui lui donnent un sens :
// « jamais » seulement pour une expérience de la vie, sans repère ponctuel (hier, ce matin) ;
// « ne… plus » n'est pas proposé, car il suppose une action habituelle qui cesse.
interface GroupeNeg { participe: string; suite: string; adverbes: Adverbe[] }
const GROUPES_AVOIR: GroupeNeg[] = [
  { participe: 'fini', suite: 'les exercices', adverbes: ['pas'] }, { participe: 'mangé', suite: 'la soupe', adverbes: ['pas'] },
  { participe: 'compris', suite: 'la consigne', adverbes: ['pas'] }, { participe: 'fait', suite: 'la vaisselle hier soir', adverbes: ['pas'] },
  { participe: 'rangé', suite: 'le grenier ce matin', adverbes: ['pas'] }, { participe: 'pris', suite: 'le bus ce matin', adverbes: ['pas'] },
  { participe: 'vu', suite: 'ce film', adverbes: ['pas', 'jamais'] }, { participe: 'lu', suite: 'ce roman', adverbes: ['pas', 'jamais'] },
  { participe: 'pris', suite: 'l’avion', adverbes: ['pas', 'jamais'] }, { participe: 'gouté', suite: 'ce fromage', adverbes: ['pas', 'jamais'] },
  { participe: 'visité', suite: 'le château de Versailles', adverbes: ['pas', 'jamais'] },
];
const GROUPES_ETRE: GroupeNeg[] = [
  { participe: 'arrivé', suite: 'à l’heure', adverbes: ['pas'] }, { participe: 'venu', suite: 'à la fête', adverbes: ['pas'] },
  { participe: 'sorti', suite: 'hier soir', adverbes: ['pas'] }, { participe: 'resté', suite: 'à la maison', adverbes: ['pas'] },
  { participe: 'allé', suite: 'à la mer', adverbes: ['pas', 'jamais'] }, { participe: 'monté', suite: 'à cheval', adverbes: ['pas', 'jamais'] },
  { participe: 'allé', suite: 'au Japon', adverbes: ['pas', 'jamais'] }, { participe: 'tombé', suite: 'de vélo', adverbes: ['pas', 'jamais'] },
];
// Difficulté 3 : un pronom complément (forme élidée devant l'auxiliaire), et les sujets avec lesquels il sonne juste.
interface GroupePronom extends GroupeNeg { pronom: string; sujets: number[] }
const GROUPES_PRONOM: GroupePronom[] = [
  { pronom: 'l’', participe: 'vu', suite: 'hier', adverbes: ['pas'], sujets: [1, 2, 3, 4, 5] },
  { pronom: 'lui', participe: 'parlé', suite: 'ce matin', adverbes: ['pas'], sujets: [1, 2, 3, 4, 5] },
  { pronom: 'leur', participe: 'répondu', suite: 'tout de suite', adverbes: ['pas'], sujets: [1, 2, 3, 4, 5] },
  { pronom: 'les', participe: 'rangés', suite: 'dans le placard', adverbes: ['pas'], sujets: [1, 2, 3, 4, 5] },
  { pronom: 'm’', participe: 'appelé', suite: 'hier soir', adverbes: ['pas'], sujets: [1, 2, 4, 5] },
  { pronom: 'nous', participe: 'attendus', suite: 'à la gare', adverbes: ['pas'], sujets: [1, 2, 4, 5] },
  { pronom: 'l’', participe: 'oublié', suite: '', adverbes: ['pas', 'jamais'], sujets: [1, 2, 3, 4, 5] },
  { pronom: 'lui', participe: 'écrit', suite: '', adverbes: ['pas', 'jamais'], sujets: [1, 2, 3, 4, 5] },
  { pronom: 'leur', participe: 'menti', suite: '', adverbes: ['pas', 'jamais'], sujets: [1, 2, 3, 4, 5] },
  { pronom: 'les', participe: 'rencontrés', suite: '', adverbes: ['pas', 'jamais'], sujets: [1, 2, 3, 4, 5] },
];

export const negationTempsComposesCm2 = creerGenerateur({
  id: 'negation-temps-composes-cm2',
  competence: 'FR-C3-CM2-CONJ-03',
  cycle: 3,
  description: 'Mettre à la forme négative un verbe au passé composé ou au plus-que-parfait.',
  generer(a, d) {
    const temps = d === 1 ? 'pc' : a.choisir(['pc', 'pqp'] as const);
    let sujet: string;
    let aux: string;
    let avant = '';
    let apres: string;
    let adverbes: Adverbe[];
    if (d === 3) {
      const g = a.choisir(GROUPES_PRONOM);
      const [s, r] = a.choisir(SUJETS_NEG.filter(([, rang]) => g.sujets.includes(rang)));
      [sujet, aux, avant, adverbes] = [s, AUX_AVOIR[temps][r]!, g.pronom, g.adverbes];
      apres = g.suite ? `${g.participe} ${g.suite}` : g.participe;
    } else if (d === 2 && a.suivant() < 0.5) {
      const g = a.choisir(GROUPES_ETRE);
      const [s, r, feminin] = a.choisir(SUJETS_NEG);
      [sujet, aux, adverbes] = [s, AUX_ETRE[temps][r]!, g.adverbes];
      apres = `${g.participe}${feminin ? 'e' : ''}${r >= 3 ? 's' : ''} ${g.suite}`;
    } else {
      const g = a.choisir(GROUPES_AVOIR);
      const [s, r] = a.choisir(SUJETS_NEG);
      [sujet, aux, adverbes] = [s, AUX_AVOIR[temps][r]!, g.adverbes];
      apres = `${g.participe} ${g.suite}`;
    }
    const adv: Adverbe = d === 1 ? 'pas' : a.choisir(adverbes);
    const groupe = avant ? (avant.endsWith('’') ? `${avant}${aux}` : `${avant} ${aux}`) : aux;
    const phrase = `${sujet} ${groupe} ${apres}.`;
    const ne = voyelle(groupe) ? 'n’' : 'ne ';
    const reponse = `${sujet} ${ne}${groupe} ${adv} ${apres}.`;
    const [participe, ...reste] = apres.split(' ');
    const pieges = [
      `${sujet} ${ne}${groupe} ${participe} ${adv}${reste.length ? ` ${reste.join(' ')}` : ''}.`,
      avant ? `${sujet} ${groupe} ${adv} ${apres}.` : `${sujet} ne ${groupe} ${adv} ${apres}.`,
      `${sujet} ${adv} ${ne}${groupe} ${apres}.`,
      avant ? `${sujet} ne ${adv} ${groupe} ${apres}.` : `${sujet} ${ne}${groupe} ${apres} ${adv}.`,
    ].filter((p) => p !== reponse);
    return {
      gabarit: 'qcm',
      consigne: `Mets à la forme négative avec « ne … ${adv} » : ${phrase}`,
      options: options(a, reponse, a.melanger(pieges).slice(0, 3), () => `${sujet} ${adv} ${groupe} ${apres}.`),
      reponse,
      indice: 'Aux temps composés, la négation encadre l’auxiliaire.',
      explication: `L’auxiliaire est « ${aux} ». « ${ne.trim()} » se place devant${avant ? ` le pronom « ${avant} » et` : ''} l’auxiliaire, « ${adv} » juste après l’auxiliaire. On écrit : ${reponse}`,
    };
  },
});

// ─────────── Phrase simple ou complexe

// Chaque verbe conjugué est précédé d'un astérisque ; les infinitifs et les participes ne le sont pas.
export const PHRASES_VERBES_CM2 = [
  'Le petit chat *dort sur le canapé.', 'Mes parents *aiment voyager en train.', 'Après le repas, nous *irons nous promener.',
  'Le facteur *apporte une lettre.', 'Ma sœur *veut apprendre à nager.', 'Chaque matin, le boulanger *prépare des croissants.',
  'Il *faut ranger ta chambre.', 'Demain, nous *visiterons le musée.', 'Les élèves *écoutent la maitresse avec attention.',
  'Il *pleut, nous *restons à la maison.', 'Léa *chante et Tom *joue du piano.', 'Je *crois que tu *as raison.',
  'Quand la nuit *tombe, les chouettes *sortent.', 'Le chien *aboie parce qu’il *a peur.', 'Si tu *veux, nous *irons au parc.',
  'Elle *ouvre la porte, *regarde dehors et *sourit.', 'Le film *commence quand tout le monde *est assis.',
  'Je *pense que tu *dois partir maintenant.', 'Nous *savons que la Terre *tourne autour du Soleil.',
  'Quand il *fait beau, nous *allons à la plage et nous *jouons.',
];
const nbVerbes = (p: string) => (p.match(/\*/g) ?? []).length;
const sansMarques = (p: string) => p.replace(/\*/g, '');

export const phraseComplexeCm2 = creerGenerateur({
  id: 'phrase-complexe-cm2',
  competence: 'FR-C3-CM2-GRAM-05',
  cycle: 3,
  description: 'Distinguer phrase simple et phrase complexe en repérant les verbes conjugués.',
  generer(a, d) {
    const simples = PHRASES_VERBES_CM2.filter((p) => nbVerbes(p) === 1);
    const complexes = PHRASES_VERBES_CM2.filter((p) => nbVerbes(p) > 1);
    if (d === 3) {
      const brute = a.choisir(PHRASES_VERBES_CM2);
      const verbes = brute.match(/\*([\p{L}’']+)/gu)!.map((v) => v.slice(1));
      const n = verbes.length;
      return {
        gabarit: 'qcm',
        consigne: `Combien de verbes conjugués la phrase « ${sansMarques(brute)} » contient-elle ?`,
        options: ['1', '2', '3', '4'],
        reponse: String(n),
        indice: 'Un verbe conjugué change avec le sujet et le temps. Un infinitif ne compte pas.',
        explication: `Verbe${n > 1 ? 's' : ''} conjugué${n > 1 ? 's' : ''} : ${verbes.join(', ')}. ${n > 1 ? 'Plusieurs verbes conjugués : c’est une phrase complexe.' : 'Un seul verbe conjugué : c’est une phrase simple.'}`,
      };
    }
    const chercheComplexe = d === 1;
    const bonne = a.choisir(chercheComplexe ? complexes : simples);
    const autres = a.melanger(chercheComplexe ? simples : complexes).slice(0, 3);
    const verbes = bonne.match(/\*([\p{L}’']+)/gu)!.map((v) => v.slice(1));
    return {
      gabarit: 'qcm',
      consigne: `Quelle phrase est une phrase ${chercheComplexe ? 'complexe' : 'simple'} ?`,
      options: a.melanger([bonne, ...autres].map(sansMarques)),
      reponse: sansMarques(bonne),
      indice: 'Compte les verbes conjugués de chaque phrase.',
      explication: `« ${sansMarques(bonne)} » contient ${verbes.length > 1 ? `${verbes.length} verbes conjugués (${verbes.join(', ')})` : `un seul verbe conjugué (${verbes[0]})`}. C’est une phrase ${chercheComplexe ? 'complexe' : 'simple'}. Les autres en contiennent ${chercheComplexe ? 'un seul' : 'plusieurs'}.`,
    };
  },
});
