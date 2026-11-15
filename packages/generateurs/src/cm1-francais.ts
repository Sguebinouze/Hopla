// CM1, étude de la langue. Source : programme de français du cycle 3 (BO n°16 du 17 avril 2025), pages 14, 17 et 18.
// Temps du CM1 : présent, imparfait, futur, passé composé. Verbes : être, avoir, 1er et 2e groupes,
// faire, aller, dire, venir, pouvoir, voir, vouloir, prendre.
import { creerGenerateur, options, type Aleatoire } from './outils';

// ─────────── Données de conjugaison

export type Temps = 'présent' | 'imparfait' | 'futur';
const NOM_TEMPS: Record<Temps, string> = { présent: 'au présent', imparfait: 'à l’imparfait', futur: 'au futur' };

const FIN_1 = ['e', 'es', 'e', 'ons', 'ez', 'ent'];
const FIN_2 = ['is', 'is', 'it', 'issons', 'issez', 'issent'];
const FIN_IMPARFAIT = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'];
const FIN_FUTUR = ['ai', 'as', 'a', 'ons', 'ez', 'ont'];

interface Irregulier {
  present: string[];
  imparfait: string;
  futur: string;
  participe: string;
}

const IRREGULIERS: Record<string, Irregulier> = {
  être: { present: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'], imparfait: 'ét', futur: 'ser', participe: 'été' },
  avoir: { present: ['ai', 'as', 'a', 'avons', 'avez', 'ont'], imparfait: 'av', futur: 'aur', participe: 'eu' },
  faire: { present: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'], imparfait: 'fais', futur: 'fer', participe: 'fait' },
  aller: { present: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'], imparfait: 'all', futur: 'ir', participe: 'allé' },
  dire: { present: ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'], imparfait: 'dis', futur: 'dir', participe: 'dit' },
  venir: { present: ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'], imparfait: 'ven', futur: 'viendr', participe: 'venu' },
  pouvoir: { present: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'], imparfait: 'pouv', futur: 'pourr', participe: 'pu' },
  voir: { present: ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'], imparfait: 'voy', futur: 'verr', participe: 'vu' },
  vouloir: { present: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'], imparfait: 'voul', futur: 'voudr', participe: 'voulu' },
  prendre: { present: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'], imparfait: 'pren', futur: 'prendr', participe: 'pris' },
};

export const VERBES_1 = ['chanter', 'jouer', 'parler', 'regarder', 'aimer', 'écouter', 'travailler', 'danser', 'dessiner', 'ranger'];
/** Verbes en -ger et -cer : manger, nous mangeons ; lancer, nous lançons. */
export const VERBES_1_GC = ['manger', 'nager', 'partager', 'commencer', 'lancer', 'avancer'];
export const VERBES_2 = ['finir', 'choisir', 'grandir', 'remplir', 'réussir', 'obéir', 'réfléchir'];
export const VERBES_3 = ['faire', 'aller', 'dire', 'venir', 'pouvoir', 'voir', 'vouloir', 'prendre'];

/** Radical d'un verbe en -ger ou -cer devant une terminaison qui commence par a ou o. */
function radical1(verbe: string, fin: string): string {
  const r = verbe.slice(0, -2);
  if (/^[ao]/.test(fin)) {
    if (r.endsWith('g')) return `${r}e`;
    if (r.endsWith('c')) return `${r.slice(0, -1)}ç`;
  }
  return r;
}

export function conjuguer(verbe: string, temps: Temps, rang: number): string {
  const irr = IRREGULIERS[verbe];
  if (irr) {
    if (temps === 'présent') return irr.present[rang]!;
    return temps === 'imparfait' ? irr.imparfait + FIN_IMPARFAIT[rang] : irr.futur + FIN_FUTUR[rang];
  }
  const r = verbe.slice(0, -2);
  if (VERBES_2.includes(verbe)) {
    if (temps === 'présent') return r + FIN_2[rang];
    return temps === 'imparfait' ? `${r}iss${FIN_IMPARFAIT[rang]}` : verbe + FIN_FUTUR[rang];
  }
  if (temps === 'futur') return verbe + FIN_FUTUR[rang];
  const fin = temps === 'présent' ? FIN_1[rang]! : FIN_IMPARFAIT[rang]!;
  return radical1(verbe, fin) + fin;
}

export function participe(verbe: string): string {
  return IRREGULIERS[verbe]?.participe ?? (VERBES_2.includes(verbe) ? `${verbe.slice(0, -2)}i` : `${verbe.slice(0, -2)}é`);
}

const PRONOMS: [string, number][] = [['je', 0], ['tu', 1], ['il', 2], ['elle', 2], ['nous', 3], ['vous', 4], ['ils', 5], ['elles', 5]];
const AUX_AVOIR = IRREGULIERS.avoir!.present;
const AUX_ETRE = IRREGULIERS.être!.present;
const voyelle = (s: string) => /^[aeéèêiîouyh]/i.test(s);
/** « je » s'élide devant une voyelle : « j’aime », « J’ai ». */
const sujet = (p: string, forme: string, majuscule = false) => {
  const s = p === 'je' && voyelle(forme) ? 'j’' : `${p} `;
  return majuscule ? s[0]!.toUpperCase() + s.slice(1) : s;
};

const groupeDe = (v: string) => (VERBES_2.includes(v) ? '2e groupe' : VERBES_3.includes(v) || v === 'être' || v === 'avoir' ? '3e groupe' : '1er groupe');

// ─────────── Présent, imparfait, futur

export const conjugaisonCm1 = creerGenerateur({
  id: 'conjugaison-cm1',
  competence: 'FR-C3-CM1-CONJ-01',
  cycle: 3,
  description: 'Conjuguer au présent, à l’imparfait et au futur être, avoir, les 1er et 2e groupes et huit verbes du 3e groupe.',
  generer(a, d) {
    const temps: Temps = d === 1 ? 'présent' : d === 2 ? a.choisir(['imparfait', 'futur'] as const) : a.choisir(['présent', 'imparfait', 'futur'] as const);
    const verbe = d === 3 ? a.choisir([...VERBES_3, ...VERBES_1_GC]) : a.choisir([...VERBES_1, ...VERBES_2, 'être', 'avoir']);
    const [p, r] = a.choisir(PRONOMS);
    const forme = conjuguer(verbe, temps, r);
    const autres = (['présent', 'imparfait', 'futur'] as const).filter((t) => t !== temps).map((t) => conjuguer(verbe, t, r));
    const pieges = [...autres, conjuguer(verbe, temps, (r + 3) % 6), conjuguer(verbe, temps, (r + 1) % 6)];
    const regle =
      temps === 'imparfait'
        ? 'À l’imparfait, la marque du temps est -ai- ou -i-.'
        : temps === 'futur'
          ? 'Au futur, la marque du temps est -r-.'
          : groupeDe(verbe) === '3e groupe'
            ? `Au présent, ${verbe} a des formes particulières, à connaitre par cœur.`
            : `Au présent, ${verbe} est un verbe du ${groupeDe(verbe)}.`;
    const gc = VERBES_1_GC.includes(verbe) && /ç|ge[ao]/.test(forme) ? ` Devant a ou o, on écrit ${verbe.includes('g') ? 'ge' : 'ç'} pour garder le son.` : '';
    return {
      gabarit: 'qcm',
      consigne: `Conjugue « ${verbe} » ${NOM_TEMPS[temps]} : ${sujet(p, forme).trim()} …`,
      options: options(a, forme, pieges, () => conjuguer(verbe, a.choisir(['présent', 'imparfait', 'futur'] as const), a.entier(0, 5))),
      reponse: forme,
      indice: temps === 'présent' ? 'Repère le groupe du verbe, puis la personne.' : temps === 'imparfait' ? 'Cherche la marque du temps : -ai- ou -i-.' : 'Cherche la marque du temps : -r-.',
      explication: `${regle}${gc} On écrit : ${sujet(p, forme)}${forme}.`,
    };
  },
});

// ─────────── Passé composé : auxiliaire et participe passé, infinitif, négation

const COMPLEMENTS: Record<string, string> = {
  chanter: 'une chanson', regarder: 'le ciel', écouter: 'la radio', dessiner: 'un château', ranger: 'la chambre', manger: 'la soupe',
  finir: 'le gâteau', choisir: 'un livre', remplir: 'le seau', faire: 'la vaisselle', dire: 'la vérité', voir: 'ce film', prendre: 'le bus',
};

export const passeComposeCm1 = creerGenerateur({
  id: 'passe-compose-cm1',
  competence: 'FR-C3-CM1-CONJ-02',
  cycle: 3,
  description: 'Former le passé composé, retrouver l’infinitif d’un verbe au passé composé, placer la négation.',
  generer(a, d) {
    if (d < 3) {
      const verbe = d === 1 ? a.choisir([...VERBES_1, ...VERBES_2]) : a.choisir([...VERBES_3, 'être', 'avoir']);
      const avecEtre = verbe === 'aller' || verbe === 'venir';
      // Avec être, seules les 3es personnes : le genre du sujet est alors connu.
      const [p, r] = avecEtre ? a.choisir(PRONOMS.filter(([x]) => x.startsWith('il') || x.startsWith('elle'))) : a.choisir(PRONOMS);
      const pp = participe(verbe);
      const accord = avecEtre ? (p.startsWith('elle') ? 'e' : '') + (r === 5 ? 's' : '') : '';
      const aux = (avecEtre ? AUX_ETRE : AUX_AVOIR)[r]!;
      const forme = `${aux} ${pp}${accord}`;
      const autreAux = (avecEtre ? AUX_AVOIR : AUX_ETRE)[r]!;
      const faute = accord ? `${aux} ${pp}` : pp.endsWith('s') ? `${aux} ${pp.slice(0, -1)}t` : `${aux} ${pp}s`;
      const pieges = [`${autreAux} ${pp}`, `${aux} ${verbe}`, faute, `${IRREGULIERS[avecEtre ? 'être' : 'avoir']!.imparfait}${FIN_IMPARFAIT[r]} ${pp}${accord}`];
      return {
        gabarit: 'qcm',
        consigne: `Conjugue « ${verbe} » au passé composé : ${sujet(p, aux).trim()} …`,
        options: options(a, forme, pieges, () => `${aux} ${pp}t`),
        reponse: forme,
        indice: 'Le passé composé a deux parties : l’auxiliaire au présent, puis le participe passé.',
        explication: `Auxiliaire ${avecEtre ? 'être' : 'avoir'} au présent, puis le participe passé « ${pp} ».${avecEtre ? ' Avec être, le participe passé s’accorde avec le sujet.' : ''} On écrit : ${sujet(p, aux)}${forme}.`,
      };
    }
    const verbe = a.choisir(Object.keys(COMPLEMENTS));
    const [p, r] = a.choisir(PRONOMS);
    const aux = AUX_AVOIR[r]!;
    const pp = participe(verbe);
    const c = COMPLEMENTS[verbe]!;
    if (a.suivant() < 0.5) {
      const S = sujet(p, aux, true).trim();
      const Sn = p === 'je' ? 'Je' : S;
      const juste = `${Sn} n’${aux} pas ${pp} ${c}.`;
      return {
        gabarit: 'qcm',
        consigne: `Écris à la forme négative : ${S}${S.endsWith('’') ? '' : ' '}${aux} ${pp} ${c}.`,
        options: options(a, juste, [`${Sn} n’${aux} ${pp} pas ${c}.`, `${Sn} ne pas ${aux} ${pp} ${c}.`, `${S}${S.endsWith('’') ? '' : ' '}${aux} pas ${pp} ${c}.`], () => `${Sn} n’${aux} ${pp} ${c} pas.`),
        reponse: juste,
        indice: 'Au passé composé, la négation entoure l’auxiliaire.',
        explication: `« ne » (ou « n’ » devant une voyelle) se place avant l’auxiliaire, « pas » juste après. On écrit : ${juste}`,
      };
    }
    const autres = a.melanger(Object.keys(COMPLEMENTS).filter((v) => v !== verbe)).slice(0, 2);
    return {
      gabarit: 'qcm',
      consigne: `Quel est l’infinitif du verbe conjugué dans « ${sujet(p, aux)}${aux} ${pp} ${c} » ?`,
      options: options(a, verbe, [pp, ...autres], () => a.choisir(VERBES_1)),
      reponse: verbe,
      indice: 'Le participe passé porte le sens du verbe. Cherche le verbe à l’infinitif qui lui correspond.',
      explication: `« ${aux} » est l’auxiliaire avoir. « ${pp} » est le participe passé du verbe ${verbe}. L’infinitif est « ${verbe} ».`,
    };
  },
});

// ─────────── Accord sujet-verbe : nom noyau, plusieurs noms

interface Sujet {
  texte: string;
  rang: number;
  noyau?: string;
}
const SUJETS_SIMPLES: Sujet[] = [
  { texte: 'Le garçon', rang: 2 }, { texte: 'Les enfants', rang: 5 }, { texte: 'Ma sœur', rang: 2 }, { texte: 'Mes cousins', rang: 5 },
  { texte: 'Nous', rang: 3 }, { texte: 'Vous', rang: 4 }, { texte: 'Tu', rang: 1 }, { texte: 'Ces filles', rang: 5 },
];
const SUJETS_NOYAU: Sujet[] = [
  { texte: 'Les enfants du quartier', rang: 5, noyau: 'enfants' }, { texte: 'Le frère de mes amis', rang: 2, noyau: 'frère' },
  { texte: 'La mère de mes amis', rang: 2, noyau: 'mère' }, { texte: 'Les élèves de la classe', rang: 5, noyau: 'élèves' },
  { texte: 'Les cousins de Léa', rang: 5, noyau: 'cousins' }, { texte: 'La fille des voisins', rang: 2, noyau: 'fille' },
  { texte: 'Les amies de ma sœur', rang: 5, noyau: 'amies' }, { texte: 'Le fils des boulangers', rang: 2, noyau: 'fils' },
];
const SUJETS_PLUSIEURS: Sujet[] = [
  { texte: 'Léa et Tom', rang: 5 }, { texte: 'Paul et son cousin', rang: 5 }, { texte: 'Ma sœur et moi', rang: 3 },
  { texte: 'Ton frère et toi', rang: 4 }, { texte: 'Inès et Nora', rang: 5 }, { texte: 'Mon père et ma mère', rang: 5 },
];
const ACTIONS: [string, string][] = [
  ['jouer', 'dans la cour'], ['chanter', 'très fort'], ['regarder', 'le ciel'], ['finir', 'le travail'], ['prendre', 'le train'],
  ['faire', 'du vélo'], ['aller', 'à la piscine'], ['venir', 'à la fête'], ['manger', 'à la cantine'], ['grandir', 'vite'],
];

export const accordSujetVerbeCm1 = creerGenerateur({
  id: 'accord-sujet-verbe-cm1',
  competence: 'FR-C3-CM1-ORTH-01',
  cycle: 3,
  description: 'Repérer le sujet, en particulier le nom noyau d’un groupe nominal, et accorder le verbe.',
  generer(a, d) {
    const s = a.choisir(d === 1 ? SUJETS_SIMPLES : d === 2 ? SUJETS_NOYAU : SUJETS_PLUSIEURS);
    const [verbe, suite] = a.choisir(ACTIONS);
    const temps: Temps = d === 3 ? a.choisir(['présent', 'imparfait', 'futur'] as const) : 'présent';
    const forme = conjuguer(verbe, temps, s.rang);
    const formes = [0, 1, 2, 3, 4, 5].map((r) => conjuguer(verbe, temps, r)).filter((f) => f !== forme);
    const personne = ['1re personne du singulier', '2e personne du singulier', '3e personne du singulier', '1re personne du pluriel', '2e personne du pluriel', '3e personne du pluriel'][s.rang];
    const pourquoi = s.noyau
      ? `Le nom noyau du sujet est « ${s.noyau} ».`
      : s.texte.includes(' et ')
        ? `Le sujet est formé de plusieurs noms : « ${s.texte} ».`
        : `Le sujet est « ${s.texte} ».`;
    return {
      gabarit: 'qcm',
      consigne: `Choisis la bonne forme du verbe « ${verbe} » ${NOM_TEMPS[temps]} : ${s.texte} … ${suite}.`,
      options: options(a, forme, a.melanger(formes), () => a.choisir(formes)),
      reponse: forme,
      indice: d === 2 ? 'Cherche le nom principal du groupe sujet, celui qu’on ne peut pas supprimer.' : 'Qui fait l’action ? Remplace le sujet par un pronom.',
      explication: `${pourquoi} Le verbe est à la ${personne}. On écrit : ${s.texte} ${forme} ${suite}.`,
    };
  },
});

// ─────────── Accords dans le groupe nominal : genre et nombre

const NOMS = ['voisin', 'cousin', 'marchand', 'client', 'candidat', 'lapin'];
const ADJ_AVANT = ['petit', 'grand', 'joli'];
const ADJ_APRES = ['blond', 'brun', 'poli', 'content', 'prudent', 'gourmand', 'bavard'];
const DETERMINANTS: [string, string, string][] = [['le', 'la', 'les'], ['un', 'une', 'des'], ['mon', 'ma', 'mes'], ['ce', 'cette', 'ces'], ['son', 'sa', 'ses']];

export const accordGnCm1 = creerGenerateur({
  id: 'accord-gn-cm1',
  competence: 'FR-C3-CM1-ORTH-02',
  cycle: 3,
  description: 'Mettre un groupe nominal au pluriel, au féminin ou au féminin pluriel : variations régulières.',
  generer(a, d) {
    const nom = a.choisir(NOMS);
    const avant = a.suivant() < 0.4;
    const adj = a.choisir(avant ? ADJ_AVANT : ADJ_APRES);
    // « des petits voisins » s'écrit plutôt « de petits voisins » : on évite ce cas.
    const det = a.choisir(DETERMINANTS.filter((x) => !(avant && x[0] === 'un')));
    const feminin = d >= 2;
    const pluriel = d !== 2;
    const gn = (dt: string, n: string, x: string) => (avant ? `${dt} ${x} ${n}` : `${dt} ${n} ${x}`);
    const fin = (feminin ? 'e' : '') + (pluriel ? 's' : '');
    const detCible = pluriel ? det[2] : det[1];
    const juste = gn(detCible, nom + fin, adj + fin);
    const cible = d === 1 ? 'pluriel' : d === 2 ? 'féminin' : 'féminin pluriel';
    const pieges = [
      gn(detCible, nom + fin, adj + (pluriel ? 's' : '')),
      gn(detCible, nom + fin, adj),
      gn(detCible, nom + (pluriel ? 's' : ''), adj + fin),
      gn(pluriel ? det[1] : det[0], nom + fin, adj + fin),
    ];
    return {
      gabarit: 'qcm',
      consigne: `Écris au ${cible} : ${gn(det[0], nom, adj)}`,
      options: options(a, juste, pieges, () => gn(detCible, nom, adj)),
      reponse: juste,
      indice: 'Le nom noyau donne son genre et son nombre au déterminant et à l’adjectif.',
      explication: `Le nom « ${nom} » devient « ${nom + fin} ». Le déterminant et l’adjectif s’accordent avec lui : ${juste}.`,
    };
  },
});

// ─────────── Accord du participe passé avec être

interface SujetGenre {
  texte: string;
  feminin: boolean;
  pluriel: boolean;
}
const SUJETS_ETRE: SujetGenre[] = [
  { texte: 'Léa', feminin: true, pluriel: false }, { texte: 'Mon oncle', feminin: false, pluriel: false },
  { texte: 'Les filles', feminin: true, pluriel: true }, { texte: 'Les garçons', feminin: false, pluriel: true },
  { texte: 'Ma tante', feminin: true, pluriel: false }, { texte: 'Elles', feminin: true, pluriel: true },
  { texte: 'Ils', feminin: false, pluriel: true }, { texte: 'Tom et Léa', feminin: false, pluriel: true },
  { texte: 'Inès et Nora', feminin: true, pluriel: true }, { texte: 'Le chat', feminin: false, pluriel: false },
  { texte: 'Paul et Hugo', feminin: false, pluriel: true }, { texte: 'Ma mère et mon père', feminin: false, pluriel: true },
  { texte: 'Ma cousine', feminin: true, pluriel: false }, { texte: 'Mes cousines', feminin: true, pluriel: true },
];
const VERBES_ETRE: [string, string, string][] = [
  ['arriver', 'arrivé', 'en retard'], ['partir', 'parti', 'tôt'], ['tomber', 'tombé', 'dans la boue'], ['rester', 'resté', 'à la maison'],
  ['entrer', 'entré', 'dans la classe'], ['sortir', 'sorti', 'du garage'], ['venir', 'venu', 'à la fête'], ['aller', 'allé', 'au marché'],
  ['monter', 'monté', 'au grenier'], ['descendre', 'descendu', 'à la cave'], ['rentrer', 'rentré', 'hier soir'],
];

export const participeEtreCm1 = creerGenerateur({
  id: 'participe-etre-cm1',
  competence: 'FR-C3-CM1-ORTH-03',
  cycle: 3,
  description: 'Accorder le participe passé avec le sujet quand le verbe est conjugué avec être.',
  generer(a, d) {
    // Difficulté 1 : sujet au singulier ; 2 : au pluriel ; 3 : plusieurs noms, ou tous les sujets.
    const plusieurs = (x: SujetGenre) => x.texte.includes(' et ');
    const liste = d === 1 ? SUJETS_ETRE.filter((x) => !x.pluriel) : d === 2 ? SUJETS_ETRE.filter((x) => x.pluriel && !plusieurs(x)) : a.suivant() < 0.7 ? SUJETS_ETRE.filter(plusieurs) : SUJETS_ETRE;
    const s = a.choisir(liste);
    const [verbe, pp, suite] = a.choisir(VERBES_ETRE);
    const aux = s.pluriel ? 'sont' : 'est';
    const fin = (s.feminin ? 'e' : '') + (s.pluriel ? 's' : '');
    const forme = pp + fin;
    const genre = `${s.feminin ? 'féminin' : 'masculin'} ${s.pluriel ? 'pluriel' : 'singulier'}`;
    return {
      gabarit: 'qcm',
      consigne: `Complète avec le participe passé du verbe « ${verbe} » : ${s.texte} ${aux} … ${suite}.`,
      options: a.melanger([pp, `${pp}e`, `${pp}s`, `${pp}es`]),
      reponse: forme,
      indice: 'Avec l’auxiliaire être, le participe passé s’accorde avec le sujet. Cherche son genre et son nombre.',
      explication: `Le sujet « ${s.texte} » est au ${genre}.${s.texte.includes(' et ') && !s.feminin ? ' Un nom masculin suffit pour accorder au masculin.' : ''} On écrit : ${s.texte} ${aux} ${forme} ${suite}.`,
    };
  },
});

// ─────────── Les déterminants

const NATURES = ['article défini', 'article indéfini', 'déterminant possessif', 'déterminant démonstratif'] as const;
type Nature = (typeof NATURES)[number];
const NATURE_DE: Record<string, Nature> = {
  le: 'article défini', la: 'article défini', les: 'article défini',
  un: 'article indéfini', une: 'article indéfini', des: 'article indéfini',
  mon: 'déterminant possessif', ma: 'déterminant possessif', mes: 'déterminant possessif', ton: 'déterminant possessif',
  ta: 'déterminant possessif', tes: 'déterminant possessif', son: 'déterminant possessif', sa: 'déterminant possessif',
  ses: 'déterminant possessif', notre: 'déterminant possessif', nos: 'déterminant possessif', votre: 'déterminant possessif',
  vos: 'déterminant possessif', leurs: 'déterminant possessif',
  ce: 'déterminant démonstratif', cet: 'déterminant démonstratif', cette: 'déterminant démonstratif', ces: 'déterminant démonstratif',
};
// Chaque phrase contient au moins un article et un déterminant possessif ou démonstratif.
// « des » y est toujours l'article indéfini (jamais « de » + « les »).
const PHRASES_DETERMINANTS = [
  'Le chat dort sur ce coussin.', 'Ma sœur range les livres.', 'Cette maison a des volets bleus.', 'Notre voisin promène un chien.',
  'Les enfants jouent avec leurs ballons.', 'Une poule picore ces graines.', 'Mon frère cherche la clé.', 'Ces fleurs poussent dans le jardin de votre voisin.',
  'Un oiseau chante sur cet arbre.', 'Tes amis regardent les étoiles.', 'La maitresse lit une histoire à ses élèves.', 'Nos cousins visitent le musée.',
  'Le boulanger vend des croissants à mon père.', 'Sa tante plante un pommier.', 'Ton chien court après une balle.', 'La voiture de mon oncle est rouge.',
  'Cet enfant mange une pomme.', 'Vos chaussures sont sous le lit.', 'Le facteur apporte un colis à ma voisine.', 'Ce tableau montre une forêt.',
  'Les élèves ouvrent leurs cahiers.', 'Ta grand-mère tricote un bonnet.', 'Une souris se cache dans ce placard.', 'Notre maitre raconte une légende.',
  'Le vent emporte mes dessins.', 'Ces enfants préparent un spectacle.', 'Un pompier sauve le chat de ma voisine.', 'Mon cousin collectionne des timbres.',
  'La lune éclaire cette plage.', 'Votre fille chante une chanson.', 'Le jardinier taille ces rosiers.', 'Sa sœur prend le train.',
];
// Difficulté 3 : pièges entre « ses » et « ces », « des » article indéfini, « leurs », « cet ».
const PHRASES_PIEGES = [
  'Ces enfants rangent ses affaires.', 'Ses amis aiment ces chansons.', 'Des oiseaux nichent dans ces arbres.', 'Léa range ses crayons dans des boites.',
  'Ces fleurs ont des pétales jaunes.', 'Tom prête ses jeux à des copains.', 'Cet élève oublie ses lunettes.', 'Les voisins promènent leurs chiens.',
  'Ces chats dorment sur des coussins.', 'Nora offre des bonbons à ses cousins.', 'Leurs parents visitent ces châteaux.', 'Cet arbre perd ses feuilles.',
  'Des enfants jouent avec leurs ballons.', 'Ses sœurs cueillent des cerises.', 'Ces élèves écoutent leurs camarades.',
];
const PIEGES = ['ces', 'ses', 'des', 'leurs', 'cet'];
const RAISON_NATURE: Record<Nature, string> = {
  'article défini': 'Il désigne un être ou une chose précise, connue.',
  'article indéfini': 'Il désigne un être ou une chose quelconque, pas encore connue.',
  'déterminant possessif': 'Il indique à qui appartient la chose.',
  'déterminant démonstratif': 'Il montre la chose dont on parle.',
};
const ASTUCE: Record<string, string> = {
  ces: ' On peut dire « ces … -là » : il montre.',
  ses: ' On peut dire « les siens » ou « les siennes » : il indique à qui.',
  des: ' C’est le pluriel de « un » ou de « une ».',
  leurs: ' Il indique que la chose appartient à plusieurs personnes.',
  cet: ' « Cet » remplace « ce » devant une voyelle.',
};

export const determinantsCm1 = creerGenerateur({
  id: 'determinants-cm1',
  competence: 'FR-C3-CM1-GRAM-01',
  cycle: 3,
  description: 'Identifier et nommer les articles définis et indéfinis, les déterminants possessifs et démonstratifs.',
  generer(a, d) {
    const piege = d === 3 && a.suivant() < 0.6;
    const phrase = a.choisir(piege ? PHRASES_PIEGES : PHRASES_DETERMINANTS);
    const mots = phrase.replace(/[.!?]/g, '').split(' ');
    const permis = (m: string) => {
      const n = NATURE_DE[m.toLowerCase()];
      if (!n) return false;
      if (piege) return PIEGES.includes(m.toLowerCase());
      return d === 1 ? n.startsWith('article') : d === 2 ? !n.startsWith('article') : true;
    };
    const mot = a.choisir(mots.filter(permis));
    const nature = NATURE_DE[mot.toLowerCase()]!;
    return {
      gabarit: 'qcm',
      consigne: `Dans la phrase « ${phrase} », quelle est la nature du déterminant « ${mot} » ?`,
      options: a.melanger([...NATURES]),
      reponse: nature,
      indice: 'Le déterminant précise-t-il une chose connue, une chose quelconque, à qui elle appartient, ou la montre-t-il ?',
      explication: `« ${mot} » est un ${nature}. ${RAISON_NATURE[nature]}${ASTUCE[mot.toLowerCase()] ?? ''}`,
    };
  },
});

// ─────────── Remplacer un groupe nominal par un pronom personnel

/** Groupe sujet, suite de la phrase, pronom attendu. */
const GN_SUJETS: [string, string, string][] = [
  ['Le boulanger', 'prépare le pain.', 'il'], ['La maitresse', 'corrige les cahiers.', 'elle'], ['Les enfants', 'jouent dans la cour.', 'ils'],
  ['Les filles', 'chantent une chanson.', 'elles'], ['Mes cousines', 'arrivent demain.', 'elles'], ['Ton frère', 'range sa chambre.', 'il'],
  ['Cette voiture', 'roule trop vite.', 'elle'], ['Les garçons', 'construisent une cabane.', 'ils'], ['Ma grand-mère', 'tricote un bonnet.', 'elle'],
  ['Les oiseaux', 'volent vers le sud.', 'ils'], ['Le facteur', 'distribue le courrier.', 'il'], ['Les poules', 'picorent du grain.', 'elles'],
  ['Mon voisin', 'tond la pelouse.', 'il'], ['Ces fleurs', 'sentent bon.', 'elles'], ['La directrice', 'accueille les parents.', 'elle'],
  ['Les pompiers', 'éteignent le feu.', 'ils'], ['Sa sœur', 'apprend une poésie.', 'elle'], ['Les vaches', 'broutent dans le pré.', 'elles'],
  ['Ce chien', 'aboie la nuit.', 'il'], ['Mes sœurs', 'préparent un gâteau.', 'elles'], ['Le train', 'entre en gare.', 'il'],
  ['Les élèves', 'écoutent la consigne.', 'ils'], ['Une souris', 'grignote du fromage.', 'elle'], ['Les chats', 'dorment au soleil.', 'ils'],
  ['Ta tante', 'habite à Lyon.', 'elle'], ['Les feuilles', 'tombent en automne.', 'elles'], ['Un camion', 'bloque la rue.', 'il'],
];
const GN_PLUSIEURS: [string, string, string][] = [
  ['Léa et Inès', 'dessinent un château.', 'elles'], ['Tom et Léa', 'font du vélo.', 'ils'], ['Hugo et Sami', 'regardent un film.', 'ils'],
  ['Ma sœur et moi', 'préparons un gâteau.', 'nous'], ['Ton frère et toi', 'rangez la classe.', 'vous'], ['Toi et moi', 'partons demain.', 'nous'],
  ['Nora et sa mère', 'visitent le musée.', 'elles'], ['Paul et son père', 'pêchent au bord du lac.', 'ils'], ['Jade et Rose', 'jouent aux cartes.', 'elles'],
  ['Le chat et le chien', 'dorment ensemble.', 'ils'], ['Mon cousin et moi', 'allons à la piscine.', 'nous'], ['Toi et ta sœur', 'chantez juste.', 'vous'],
  ['La poule et la cane', 'traversent la cour.', 'elles'], ['Lina et Tom', 'lisent une bande dessinée.', 'ils'], ['Ma tante et mon oncle', 'arrivent ce soir.', 'ils'],
  ['Léo et moi', 'construisons une cabane.', 'nous'], ['Ta mère et toi', 'partez en voyage.', 'vous'], ['Inès et sa cousine', 'cueillent des fleurs.', 'elles'],
  ['Sami et Paul', 'courent dans le parc.', 'ils'], ['Rose et moi', 'écrivons une lettre.', 'nous'], ['Hugo et toi', 'jouez au ballon.', 'vous'],
  ['La vache et le veau', 'broutent dans le pré.', 'ils'], ['Ma sœur et ma cousine', 'dansent bien.', 'elles'], ['Le maitre et les élèves', 'sortent dans la cour.', 'ils'],
  ['Nora et Jade', 'préparent un exposé.', 'elles'], ['Ton père et toi', 'lavez la voiture.', 'vous'],
];
/** Sujet, verbe, groupe complément, pronom attendu. Verbes à initiale consonne : pas d'élision « l’ ». */
const GN_OBJETS: [string, string, string, string][] = [
  ['Léa', 'regarde', 'le film', 'le'], ['Tom', 'range', 'la vaisselle', 'la'], ['Nora', 'cherche', 'les jouets', 'les'], ['Hugo', 'lave', 'son vélo', 'le'],
  ['Inès', 'porte', 'ses chaussures', 'les'], ['Sami', 'mange', 'cette pomme', 'la'], ['Le peintre', 'termine', 'le tableau', 'le'],
  ['Maman', 'prépare', 'la table', 'la'], ['Les enfants', 'cueillent', 'les fleurs', 'les'], ['Jade', 'termine', 'sa lettre', 'la'],
  ['Le chat', 'guette', 'la souris', 'la'], ['Papa', 'répare', 'le robinet', 'le'], ['Les élèves', 'rangent', 'leurs cahiers', 'les'],
  ['Paul', 'nourrit', 'son poisson', 'le'], ['La fermière', 'trait', 'la vache', 'la'], ['Rose', 'plie', 'ses vêtements', 'les'],
  ['Le jardinier', 'taille', 'la haie', 'la'], ['Lina', 'connait', 'cette chanson', 'la'], ['Le maitre', 'corrige', 'les copies', 'les'],
  ['Léo', 'construit', 'la cabane', 'la'], ['Ma sœur', 'garde', 'le bébé', 'le'], ['Hugo', 'ferme', 'la porte', 'la'],
  ['Les pompiers', 'sauvent', 'le chat', 'le'], ['Nora', 'décore', 'le sapin', 'le'], ['Tom', 'ramasse', 'les feuilles', 'les'],
  ['Le boulanger', 'cuit', 'le pain', 'le'],
];

export const pronomsCm1 = creerGenerateur({
  id: 'pronoms-cm1',
  competence: 'FR-C3-CM1-GRAM-02',
  cycle: 3,
  description: 'Remplacer un groupe nominal sujet par un pronom personnel sujet, un groupe nominal objet par un pronom objet.',
  generer(a, d) {
    if (d < 3) {
      const [gn, suite, pronom] = a.choisir(d === 1 ? GN_SUJETS : GN_PLUSIEURS);
      const choix = d === 1 ? ['il', 'elle', 'ils', 'elles'] : ['ils', 'elles', 'nous', 'vous', 'il'];
      return {
        gabarit: 'qcm',
        consigne: `Par quel pronom peux-tu remplacer « ${gn} » dans « ${gn} ${suite} » ?`,
        options: options(a, pronom, a.melanger(choix), () => a.choisir(choix)),
        reponse: pronom,
        indice: d === 1 ? 'Le groupe sujet est-il masculin ou féminin ? Singulier ou pluriel ?' : 'Si « moi » fait partie du sujet, pense à « nous ». Si c’est « toi », pense à « vous ».',
        explication: `« ${gn} » est le groupe sujet. On le remplace par « ${pronom} » : ${pronom[0]!.toUpperCase()}${pronom.slice(1)} ${suite}`,
      };
    }
    const [qui, verbe, gn, pronom] = a.choisir(GN_OBJETS);
    const phrase = (p: string) => `${qui} ${p} ${verbe}.`;
    return {
      gabarit: 'qcm',
      consigne: `Remplace « ${gn} » par un pronom dans « ${qui} ${verbe} ${gn}. »`,
      options: a.melanger(['le', 'la', 'les', 'lui'].map(phrase)),
      reponse: phrase(pronom),
      indice: 'Le pronom complément se place devant le verbe. Il a le même genre et le même nombre que le groupe remplacé.',
      explication: `« ${gn} » est le complément d’objet du verbe. On le remplace par « ${pronom} », placé devant le verbe : ${phrase(pronom)}`,
    };
  },
});

// ─────────── Complément d'objet ou complément circonstanciel ; COD ou COI

// Phrases rédigées et annotées : [S|sujet], [D|COD], [I|COI], [C|complément circonstanciel].
// Présent, sauf avec « hier » ou un repère passé : passé composé.
const PHRASES_COD = [
  '[S|Léa] range [D|ses livres] [C|après le diner].', '[C|Chaque matin], [S|le chat] mange [D|sa pâtée].',
  '[S|Les élèves] écrivent [D|une lettre] [C|en silence].', '[S|Mon père] répare [D|le vélo] [C|dans le garage].',
  '[C|Pendant la récréation], [S|Tom] dessine [D|un dragon].', '[S|La fermière] nourrit [D|les poules] [C|tous les matins].',
  '[S|Nora] lit [D|un roman] [C|sous la couette].', '[C|Pendant les vacances], [S|les enfants] construisent [D|une cabane].',
  '[S|Hugo] a perdu [D|son écharpe] [C|hier].', '[S|Le boulanger] prépare [D|le pain] [C|avant l’aube].',
  '[C|Le dimanche], [S|ma grand-mère] cuisine [D|une tarte].', '[S|Sami] arrose [D|les fleurs] [C|avec soin].',
  '[S|Les joueurs] lancent [D|le ballon] [C|sur le terrain].', '[C|Ce soir], [S|nous] regardons [D|un film].',
  '[S|Inès] a rangé [D|sa chambre] [C|ce matin].', '[S|Le maitre] corrige [D|les cahiers] [C|dans son bureau].',
  '[S|Le pêcheur] attrape [D|un poisson] [C|près du pont].',
];
const PHRASES_COI = [
  '[S|Léa] parle [I|à son frère] [C|pendant le repas].', '[S|Le chien] obéit [I|à son maitre] [C|sans hésiter].',
  '[C|Chaque soir], [S|Tom] pense [I|à ses vacances].', '[S|Les élèves] répondent [I|à la maitresse] [C|dans la classe].',
  '[C|Le samedi], [S|mon oncle] téléphone [I|à sa sœur].', '[S|Nora] rêve [I|de son voyage] [C|depuis des semaines].',
  '[S|Hugo] se souvient [I|de cette histoire] [C|avec plaisir].', '[S|Les enfants] ressemblent [I|à leur mère].',
  '[C|Hier], [S|Inès] a écrit [I|à sa grand-mère].', '[S|Le bébé] sourit [I|à sa maman] [C|dans son berceau].',
  '[S|L’entraineur] parle [I|aux joueurs] [C|avant le match].', '[S|Sami] joue [I|du piano] [C|tous les soirs].',
  '[S|Jade] doute [I|de sa réponse] [C|pendant le contrôle].', '[S|Les voisins] s’occupent [I|de notre chat] [C|pendant les vacances].',
  '[S|Lina] a pensé [I|à son anniversaire] [C|toute la journée].', '[C|Ce matin], [S|la directrice] a parlé [I|aux parents].',
  '[S|Les touristes] profitent [I|du soleil] [C|sur la plage].',
];
const FONCTIONS_1 = ['complément d’objet', 'complément circonstanciel', 'sujet'];
const FONCTIONS_3 = ['COD', 'COI', 'complément circonstanciel'];

export const complementsCm1 = creerGenerateur({
  id: 'complements-cm1',
  competence: 'FR-C3-CM1-GRAM-03',
  cycle: 3,
  description: 'Distinguer complément d’objet et complément circonstanciel, puis COD et COI.',
  generer(a, d) {
    const source = a.choisir(d === 1 ? PHRASES_COD : d === 2 ? PHRASES_COI : [...PHRASES_COD, ...PHRASES_COI]);
    const groupes = [...source.matchAll(/\[([SDIC])\|([^\]]+)\]/g)].map((m) => ({ code: m[1]!, texte: m[2]! }));
    const phrase = source.replace(/\[[SDIC]\|([^\]]+)\]/g, '$1');
    const objet = groupes.find((g) => g.code === 'D' || g.code === 'I')!;
    const cc = groupes.find((g) => g.code === 'C');
    const sujet = groupes.find((g) => g.code === 'S')!;
    const cible = d === 3 ? (cc && a.suivant() < 0.3 ? cc : objet) : a.choisir([objet, objet, sujet, ...(cc ? [cc, cc] : [])]);
    const reponse =
      cible.code === 'S' ? 'sujet' : cible.code === 'C' ? 'complément circonstanciel' : d === 3 ? (cible.code === 'I' ? 'COI' : 'COD') : 'complément d’objet';
    const verbe = phrase.replace(/^[^,]+, /, '').slice(sujet.texte.length + 1).split(' ')[0]!;
    const explication =
      cible.code === 'C'
        ? `« ${cible.texte} » peut être déplacé ou supprimé : la phrase garde son sens. C’est un complément circonstanciel.`
        : cible.code === 'S'
          ? `« ${cible.texte} » indique qui fait l’action. C’est le sujet.`
          : d === 3
            ? cible.code === 'I'
              ? `« ${cible.texte} » complète le verbe et commence par une préposition (${cible.texte.split(' ')[0]}). C’est un COI.`
              : `« ${cible.texte} » complète le verbe directement, sans préposition. C’est un COD.`
            : `« ${cible.texte} » complète le verbe « ${verbe} ». On ne peut ni le déplacer ni le supprimer. C’est un complément d’objet.`;
    return {
      gabarit: 'qcm',
      consigne: `Dans « ${phrase} », quelle est la fonction du groupe « ${cible.texte} » ?`,
      options: a.melanger(d === 3 ? FONCTIONS_3 : FONCTIONS_1),
      reponse,
      indice: d === 3 ? 'Le COI est relié au verbe par une préposition (à, de). Le COD est relié directement.' : 'Essaie de déplacer ou de supprimer le groupe. Si la phrase garde son sens, c’est un complément circonstanciel.',
      explication,
    };
  },
});

// ─────────── Synonymes et antonymes

/** Mot, synonyme, antonyme, deux mots sans rapport de sens. */
const VOCABULAIRE: { mot: string; classe: 'adjectif' | 'verbe' | 'nom'; syn: string; ant: string; autres: [string, string] }[] = [
  // Adjectifs
  { mot: 'content', classe: 'adjectif', syn: 'heureux', ant: 'triste', autres: ['pressé', 'curieux'] },
  { mot: 'beau', classe: 'adjectif', syn: 'joli', ant: 'laid', autres: ['lourd', 'lent'] },
  { mot: 'facile', classe: 'adjectif', syn: 'simple', ant: 'difficile', autres: ['rapide', 'propre'] },
  { mot: 'calme', classe: 'adjectif', syn: 'tranquille', ant: 'agité', autres: ['petit', 'froid'] },
  { mot: 'courageux', classe: 'adjectif', syn: 'brave', ant: 'peureux', autres: ['bavard', 'grand'] },
  { mot: 'gentil', classe: 'adjectif', syn: 'aimable', ant: 'méchant', autres: ['rapide', 'lourd'] },
  { mot: 'riche', classe: 'adjectif', syn: 'fortuné', ant: 'pauvre', autres: ['joyeux', 'bruyant'] },
  { mot: 'propre', classe: 'adjectif', syn: 'net', ant: 'sale', autres: ['léger', 'vieux'] },
  { mot: 'sombre', classe: 'adjectif', syn: 'obscur', ant: 'clair', autres: ['lent', 'poli'] },
  { mot: 'large', classe: 'adjectif', syn: 'vaste', ant: 'étroit', autres: ['doux', 'sale'] },
  { mot: 'fatigué', classe: 'adjectif', syn: 'épuisé', ant: 'reposé', autres: ['mouillé', 'poli'] },
  { mot: 'triste', classe: 'adjectif', syn: 'malheureux', ant: 'gai', autres: ['fragile', 'lent'] },
  { mot: 'joyeux', classe: 'adjectif', syn: 'gai', ant: 'triste', autres: ['lourd', 'rond'] },
  { mot: 'ancien', classe: 'adjectif', syn: 'vieux', ant: 'moderne', autres: ['rapide', 'mouillé'] },
  { mot: 'bruyant', classe: 'adjectif', syn: 'sonore', ant: 'silencieux', autres: ['carré', 'sucré'] },
  { mot: 'méchant', classe: 'adjectif', syn: 'cruel', ant: 'gentil', autres: ['jaune', 'long'] },
  { mot: 'solide', classe: 'adjectif', syn: 'robuste', ant: 'fragile', autres: ['bavard', 'sucré'] },
  { mot: 'drôle', classe: 'adjectif', syn: 'amusant', ant: 'ennuyeux', autres: ['épais', 'rond'] },
  // Verbes
  { mot: 'commencer', classe: 'verbe', syn: 'débuter', ant: 'finir', autres: ['courir', 'chanter'] },
  { mot: 'aimer', classe: 'verbe', syn: 'adorer', ant: 'détester', autres: ['marcher', 'prêter'] },
  { mot: 'monter', classe: 'verbe', syn: 'grimper', ant: 'descendre', autres: ['dormir', 'manger'] },
  { mot: 'crier', classe: 'verbe', syn: 'hurler', ant: 'chuchoter', autres: ['lire', 'compter'] },
  { mot: 'trouver', classe: 'verbe', syn: 'découvrir', ant: 'perdre', autres: ['sauter', 'laver'] },
  { mot: 'donner', classe: 'verbe', syn: 'offrir', ant: 'prendre', autres: ['nager', 'dessiner'] },
  { mot: 'finir', classe: 'verbe', syn: 'terminer', ant: 'commencer', autres: ['voler', 'manger'] },
  { mot: 'construire', classe: 'verbe', syn: 'bâtir', ant: 'détruire', autres: ['chanter', 'lire'] },
  { mot: 'accepter', classe: 'verbe', syn: 'admettre', ant: 'refuser', autres: ['courir', 'peindre'] },
  { mot: 'entrer', classe: 'verbe', syn: 'pénétrer', ant: 'sortir', autres: ['coudre', 'jouer'] },
  { mot: 'gagner', classe: 'verbe', syn: 'remporter', ant: 'perdre', autres: ['laver', 'écrire'] },
  { mot: 'cacher', classe: 'verbe', syn: 'dissimuler', ant: 'montrer', autres: ['sauter', 'boire'] },
  { mot: 'réparer', classe: 'verbe', syn: 'arranger', ant: 'casser', autres: ['dormir', 'compter'] },
  // Noms
  { mot: 'début', classe: 'nom', syn: 'commencement', ant: 'fin', autres: ['bruit', 'repas'] },
  { mot: 'peur', classe: 'nom', syn: 'frayeur', ant: 'courage', autres: ['chaleur', 'route'] },
  { mot: 'joie', classe: 'nom', syn: 'bonheur', ant: 'tristesse', autres: ['cuisine', 'saison'] },
  { mot: 'victoire', classe: 'nom', syn: 'succès', ant: 'défaite', autres: ['voyage', 'chanson'] },
  { mot: 'ami', classe: 'nom', syn: 'camarade', ant: 'ennemi', autres: ['cartable', 'nuage'] },
  { mot: 'courage', classe: 'nom', syn: 'bravoure', ant: 'lâcheté', autres: ['tableau', 'soupe'] },
  { mot: 'richesse', classe: 'nom', syn: 'fortune', ant: 'pauvreté', autres: ['pluie', 'chemise'] },
  { mot: 'paix', classe: 'nom', syn: 'tranquillité', ant: 'guerre', autres: ['fourchette', 'montagne'] },
  { mot: 'question', classe: 'nom', syn: 'interrogation', ant: 'réponse', autres: ['bateau', 'pomme'] },
  { mot: 'colère', classe: 'nom', syn: 'fureur', ant: 'calme', autres: ['lampe', 'cheval'] },
  { mot: 'force', classe: 'nom', syn: 'vigueur', ant: 'faiblesse', autres: ['plume', 'carton'] },
  { mot: 'beauté', classe: 'nom', syn: 'splendeur', ant: 'laideur', autres: ['fenêtre', 'neige'] },
];

export const synonymesCm1 = creerGenerateur({
  id: 'synonymes-antonymes-cm1',
  competence: 'FR-C3-CM1-VOC-01',
  cycle: 3,
  description: 'Trouver un synonyme ou un antonyme de même classe grammaticale : noms, verbes, adjectifs.',
  generer(a: Aleatoire, d) {
    const v = a.choisir(VOCABULAIRE);
    // Difficulté 1 : synonymes ; 2 : antonymes ; 3 : les deux, mot demandé à partir de sa définition.
    const synonyme = d === 1 || (d === 3 && a.suivant() < 0.5);
    const reponse = synonyme ? v.syn : v.ant;
    const piege = synonyme ? v.ant : v.syn;
    const relation = synonyme ? 'synonyme' : 'antonyme';
    return {
      gabarit: 'qcm',
      consigne:
        d === 3
          ? `Quel mot a un sens ${synonyme ? 'proche' : 'contraire'} de « ${v.mot} » ?`
          : `Quel mot est un ${relation} de « ${v.mot} » ?`,
      options: a.melanger([reponse, piege, ...v.autres]),
      reponse,
      indice: synonyme ? 'Un synonyme est un mot de sens proche.' : 'Un antonyme est un mot de sens contraire.',
      explication: `« ${reponse} » a un sens ${synonyme ? 'proche' : 'contraire'} de « ${v.mot} » : c’est un ${relation}. Les deux mots sont des ${v.classe}s. « ${piege} » est un ${synonyme ? 'antonyme' : 'synonyme'}.`,
    };
  },
});
