// Géométrie plane et solides, du CE1 au CM2 : cercle, polygones, droites, figures usuelles, symétrie, patrons.
// Sources : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024), p. 34 et 36 ;
// programme de mathématiques du cycle 3 (BO n°16 du 17 avril 2025), p. 20 à 22.
// Les figures sont décrites en unités de carreau ; l'app les dessine (visuel « figure »).
import { depuisEntier } from './decimaux';
import { choix, creerGenerateur, frDecimal, reprendre, tous, type Aleatoire, type Piege } from './outils';
import type { ElementFigure, Point, Visuel } from './types';

const r1 = (x: number) => Math.round(x * 10) / 10;
const LETTRES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T'] as const;
const noms = (a: Aleatoire, n: number) => a.melanger(LETTRES).slice(0, n);
/** Point à distance `d` de `c`, dans la direction `angle` (degrés). */
const polaire = (c: Point, d: number, angle: number): Point => [r1(c[0] + d * Math.cos((angle * Math.PI) / 180)), r1(c[1] - d * Math.sin((angle * Math.PI) / 180))];
const figure = (largeur: number, hauteur: number, elements: ElementFigure[], extra: Partial<Extract<Visuel, { type: 'figure' }>> = {}): Visuel =>
  ({ type: 'figure', largeur, hauteur, elements, ...extra });
/** Polygone régulier à n côtés, centré, tourné de `rotation` degrés. */
export const regulier = (n: number, c: Point, r: number, rotation = 90): Point[] =>
  Array.from({ length: n }, (_, k) => polaire(c, r, rotation + (360 * k) / n));
const cm = (dixiemes: number) => frDecimal(depuisEntier(dixiemes, 1));

// ─────────────────────────────────────────── Figures de référence dessinées

type NomFigure = 'un cercle' | 'un disque' | 'un carré' | 'un rectangle' | 'un triangle';
/** Dessin d'une figure de référence, de taille et de position variables, dans un carré de 8 sur 8. */
function dessin(a: Aleatoire, nom: NomFigure): ElementFigure {
  const r = a.choisir([2.5, 3, 3.5]);
  const c: Point = [4 + a.choisir([-0.5, 0, 0.5]), 4 + a.choisir([-0.5, 0, 0.5])];
  if (nom === 'un cercle' || nom === 'un disque') return { forme: 'cercle', centre: c, rayon: r, plein: nom === 'un disque' };
  if (nom === 'un carré') { const k = a.choisir([4, 5, 6]); const o = (8 - k) / 2; return { forme: 'polygone', sommets: [[o, o], [o + k, o], [o + k, o + k], [o, o + k]] }; }
  if (nom === 'un rectangle') {
    const [l, h] = a.choisir([[7, 4], [7, 3], [6, 3], [3, 6], [4, 7], [7, 5]] as const);
    const [x, y] = [(8 - l) / 2, (8 - h) / 2];
    return { forme: 'polygone', sommets: [[x, y], [x + l, y], [x + l, y + h], [x, y + h]] };
  }
  return { forme: 'polygone', sommets: a.choisir([[[4, 1], [7.5, 7], [0.5, 7]], [[1, 1], [7, 4], [2, 7.5]], [[0.5, 6.5], [7.5, 6.5], [5, 1]], [[1, 2], [7, 1], [4, 7]]] as Point[][]) };
}

/** Cercle de centre (5, 5) et de rayon 3,5 avec un segment en couleur : rayon ou diamètre. */
function segmentDuCercle(a: Aleatoire, nature: 'rayon' | 'diametre') {
  const [O, P, Q] = ['O', ...noms(a, 2)] as [string, string, string];
  const c: Point = [5, 5];
  const angle = a.choisir([20, 35, 50, 160, 200, 215, 300, 330]);
  const p = polaire(c, 3.5, angle);
  const q = polaire(c, 3.5, angle + 180);
  const elements: ElementFigure[] = [
    { forme: 'cercle', centre: c, rayon: 3.5 },
    { forme: 'point', en: c, nom: O },
    nature === 'rayon' ? { forme: 'segment', de: c, a: p, accent: true } : { forme: 'segment', de: q, a: p, accent: true },
    { forme: 'point', en: p, nom: P },
    ...(nature === 'diametre' ? [{ forme: 'point', en: q, nom: Q } as ElementFigure] : []),
  ];
  return { visuel: figure(10, 10, elements), O, P, Q };
}

// ─────────────────────────────────────────── CE1 : cercle, disque, centre

export const cercleCe1 = creerGenerateur({
  id: 'cercle-ce1',
  competence: 'MA-C2-CE1-GEO-03',
  cycle: 2,
  description: 'Reconnaitre et nommer le cercle, le disque, le carré, le rectangle et le triangle ; repérer le centre du cercle.',
  generer(a, d) {
    if (d <= 2) {
      const possibles: NomFigure[] = d === 1 ? ['un cercle', 'un carré', 'un rectangle', 'un triangle'] : ['un cercle', 'un disque'];
      const nom = a.choisir(possibles);
      const opts: NomFigure[] = d === 1 ? ['un cercle', 'un carré', 'un rectangle', 'un triangle'] : ['un cercle', 'un disque', 'un carré'];
      return {
        gabarit: 'qcm',
        consigne: 'Comment s’appelle cette figure ?',
        visuel: figure(8, 8, [dessin(a, nom)]),
        options: a.melanger(opts),
        erreurs: tous(opts, nom, nom === 'un disque' || nom === 'un cercle' ? 'cercle-disque-confondus' : 'figures-confondues'),
        reponse: nom,
        indice: d === 1 ? 'Compte les côtés. Un cercle n’a pas de côté.' : 'Le disque est colorié à l’intérieur.',
        explication: nom === 'un disque' ? 'Elle est coloriée à l’intérieur : c’est un disque.'
          : nom === 'un cercle' ? (d === 1 ? 'Elle est toute ronde, sans côté : c’est un cercle.' : 'Seul le bord est tracé : c’est un cercle.')
            : `${nom === 'un triangle' ? 'Elle a 3 côtés' : nom === 'un carré' ? 'Elle a 4 côtés égaux et 4 angles droits' : 'Elle a 4 angles droits'} : c’est ${nom}.`,
      };
    }
    // Le centre : le seul point à égale distance de tous les points du cercle.
    const [C, M, N] = noms(a, 3) as [string, string, string];
    const c: Point = [5, 5];
    const surCercle = polaire(c, 3.5, a.entier(0, 7) * 45 + 20);
    const dedans = polaire(c, 1.8, a.entier(0, 7) * 45 + 40);
    return {
      gabarit: 'qcm',
      consigne: 'Quel point est le centre du cercle ?',
      visuel: figure(10, 10, [
        { forme: 'cercle', centre: c, rayon: 3.5 },
        { forme: 'point', en: c, nom: C }, { forme: 'point', en: surCercle, nom: M }, { forme: 'point', en: dedans, nom: N },
      ]),
      options: a.melanger([C, M, N]),
      erreurs: tous([C, M, N], C, 'centre-mal-repere'),
      reponse: C,
      indice: 'Le centre est au milieu du cercle.',
      explication: `Le point ${C} est au milieu du cercle : c’est le centre.`,
    };
  },
});

// ─────────────────────────────────────────── CE2 : polygones et losange

const POLYGONES = [[3, 'un triangle'], [4, 'un quadrilatère'], [5, 'un pentagone'], [6, 'un hexagone']] as const;

const DESCRIPTIONS_CE2: [string, string][] = [
  ['Elle a 4 côtés égaux et 4 angles droits.', 'un carré'],
  ['Elle a 4 côtés égaux, sans angle droit.', 'un losange'],
  ['Elle a 4 angles droits. Ses côtés ne sont pas tous égaux.', 'un rectangle'],
  ['Elle a 3 côtés et un angle droit.', 'un triangle rectangle'],
];

export const polygonesCe2 = creerGenerateur({
  id: 'polygones-ce2',
  competence: 'MA-C2-CE2-GEO-02',
  cycle: 2,
  description: 'Nommer un polygone selon son nombre de côtés ; reconnaitre le carré, le rectangle, le losange, le triangle rectangle.',
  generer(a, d) {
    const [n, nom] = a.choisir(POLYGONES);
    const sommets = regulier(n, [5, 5], 4, a.choisir([90, 75, 100, 60]));
    if (d === 1) {
      const reponse = String(n);
      return {
        gabarit: 'qcm',
        consigne: 'Combien de côtés a cette figure ?',
        visuel: figure(10, 10, [{ forme: 'polygone', sommets }]),
        ...choix(a, reponse, [[String(n + 1), 'cotes-mal-comptes'], [String(n - 1), 'cotes-mal-comptes'], [String(n + 2)]], () => String(a.entier(3, 8)), { numerique: true }),
        reponse,
        indice: 'Suis le bord avec ton doigt. Compte chaque côté une fois.',
        explication: `Elle a ${n} côtés et ${n} sommets.`,
      };
    }
    if (d === 2) {
      const opts = POLYGONES.map(([, x]) => x);
      return {
        gabarit: 'qcm',
        consigne: 'Comment s’appelle ce polygone ?',
        visuel: figure(10, 10, [{ forme: 'polygone', sommets }]),
        options: a.melanger([...opts]),
        erreurs: tous(opts, nom, 'polygones-confondus'),
        reponse: nom,
        indice: 'Compte ses côtés. Penta veut dire cinq, hexa veut dire six.',
        explication: `Il a ${n} côtés : c’est ${nom}.`,
      };
    }
    const [description, figureNom] = a.choisir(DESCRIPTIONS_CE2);
    const opts = DESCRIPTIONS_CE2.map(([, x]) => x);
    return {
      gabarit: 'qcm',
      consigne: `${description} Quelle est cette figure ?`,
      options: a.melanger(opts),
      erreurs: tous(opts, figureNom, 'figures-confondues'),
      reponse: figureNom,
      indice: 'Regarde les côtés égaux et les angles droits.',
      explication: `${description} C’est ${figureNom}.`,
    };
  },
});

// ─────────────────────────────────────────── CE2 : cercle, centre, rayon, diamètre

export const cercleCe2 = creerGenerateur({
  id: 'cercle-ce2',
  competence: 'MA-C2-CE2-GEO-03',
  cycle: 2,
  description: 'Connaitre le centre, le rayon et le diamètre d’un cercle ; le diamètre mesure deux rayons.',
  generer(a, d) {
    if (d === 1) {
      const nature = a.choisir(['rayon', 'diametre'] as const);
      const { visuel } = segmentDuCercle(a, nature);
      const reponse = nature === 'rayon' ? 'un rayon' : 'un diamètre';
      const opts = ['un rayon', 'un diamètre', 'un côté'];
      return {
        gabarit: 'qcm',
        consigne: 'Comment s’appelle le segment en couleur ?',
        visuel,
        options: a.melanger(opts),
        erreurs: tous(opts, reponse, 'rayon-diametre-confondus'),
        reponse,
        indice: 'Le rayon part du centre. Le diamètre traverse le cercle par le centre.',
        explication: nature === 'rayon' ? 'Il va du centre jusqu’au cercle : c’est un rayon.' : 'Il traverse le cercle en passant par le centre : c’est un diamètre.',
      };
    }
    const r = a.entier(2, 15);
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `Un cercle a un rayon de ${r} cm. Combien de cm mesure son diamètre ?`,
        reponse: String(2 * r),
        indice: 'Le diamètre mesure deux rayons.',
        explication: `Diamètre : 2 × ${r} = ${2 * r} cm.`,
      };
    }
    return {
      gabarit: 'saisie',
      consigne: `Un cercle a un diamètre de ${2 * r} cm. Combien de cm mesure son rayon ?`,
      reponse: String(r),
      indice: 'Le rayon mesure la moitié du diamètre.',
      explication: `Rayon : la moitié de ${2 * r}, c’est ${r} cm.`,
    };
  },
});

// ─────────────────────────────────────────── CM1 (et CM2) : cercle et disque, distance au centre

export const cercleCm1 = creerGenerateur({
  id: 'cercle-cm1',
  competence: 'MA-C3-CM1-GEO-01',
  cycle: 3,
  description: 'Reconnaitre rayon et diamètre ; passer de l’un à l’autre ; situer un point par sa distance au centre.',
  generer(a, d) {
    if (d === 1) {
      const nature = a.choisir(['rayon', 'diametre'] as const);
      const { visuel, O, P, Q } = segmentDuCercle(a, nature);
      const reponse = nature === 'rayon' ? 'un rayon' : 'un diamètre';
      const opts = ['un rayon', 'un diamètre', 'un côté', 'une droite'];
      return {
        gabarit: 'qcm',
        consigne: `Le cercle a pour centre ${O}. Comment s’appelle le segment ${nature === 'rayon' ? `[${O}${P}]` : `[${Q}${P}]`}, en couleur ?`,
        visuel,
        options: a.melanger(opts),
        erreurs: tous(opts, reponse, 'rayon-diametre-confondus'),
        reponse,
        indice: 'Un rayon relie le centre au cercle. Un diamètre relie deux points du cercle en passant par le centre.',
        explication: nature === 'rayon'
          ? `Le segment relie le centre ${O} à un point du cercle : c’est un rayon.`
          : `Le segment relie deux points du cercle et passe par le centre ${O} : c’est un diamètre.`,
      };
    }
    if (d === 2) {
      const t = a.entier(4, 30) * 5; // rayon en dixièmes : 2 cm à 15 cm, demi-centimètres compris
      return a.suivant() < 0.5
        ? {
            gabarit: 'saisie', consigne: `Un cercle a un rayon de ${cm(t)} cm. Combien mesure son diamètre, en cm ?`,
            reponse: cm(2 * t), indice: 'Le diamètre mesure deux rayons.',
            explication: `Diamètre = 2 × rayon = 2 × ${cm(t)} = ${cm(2 * t)} cm.`,
          }
        : {
            gabarit: 'saisie', consigne: `Un cercle a un diamètre de ${cm(2 * t)} cm. Combien mesure son rayon, en cm ?`,
            reponse: cm(t), indice: 'Le rayon mesure la moitié du diamètre.',
            explication: `Rayon = diamètre ÷ 2 = ${cm(2 * t)} ÷ 2 = ${cm(t)} cm.`,
          };
    }
    const r = a.entier(3, 8);
    const [M] = noms(a, 1) as [string];
    const cas = a.choisir(['sur', 'dedans', 'dehors'] as const);
    const dist = cas === 'sur' ? r : cas === 'dedans' ? a.entier(1, r - 1) : a.entier(r + 1, r + 4);
    const reponse = cas === 'sur' ? 'sur le cercle' : cas === 'dedans' ? 'à l’intérieur du disque, pas sur le cercle' : 'à l’extérieur du disque';
    const opts = ['sur le cercle', 'à l’intérieur du disque, pas sur le cercle', 'à l’extérieur du disque'];
    return {
      gabarit: 'qcm',
      consigne: `Un cercle a pour centre O et pour rayon ${r} cm. Le point ${M} est à ${dist} cm de O. Où se trouve ${M} ?`,
      options: a.melanger(opts),
      erreurs: tous(opts, reponse, 'distance-centre'),
      reponse,
      indice: `Compare la distance ${M}O au rayon.`,
      explication: cas === 'sur' ? `${M}O = ${r} cm, égal au rayon : ${M} est sur le cercle.`
        : cas === 'dedans' ? `${M}O = ${dist} cm, moins que le rayon (${r} cm) : ${M} est à l’intérieur du disque.`
          : `${M}O = ${dist} cm, plus que le rayon (${r} cm) : ${M} est à l’extérieur du disque.`,
    };
  },
});

export const cercleCm2 = reprendre(cercleCm1, {
  id: 'cercle-cm2', competence: 'MA-C3-CM2-GEO-01',
  description: 'Cercle et disque au CM2 : rayon et diamètre, distance d’un point au centre.',
});

// ─────────────────────────────────────────── CM1 : droites perpendiculaires et parallèles

const RELATIONS = ['perpendiculaires', 'parallèles', 'ni parallèles, ni perpendiculaires'] as const;

export const droitesCm1 = creerGenerateur({
  id: 'droites-cm1',
  competence: 'MA-C3-CM1-GEO-02',
  cycle: 3,
  description: 'Reconnaitre des droites perpendiculaires et des droites parallèles ; les côtés d’un rectangle et d’un losange.',
  generer(a, d) {
    if (d === 1) {
      const relation = a.choisir(RELATIONS);
      const angle = a.choisir([0, 15, 30, 60, 75, 105, 120, 150]);
      const autre = relation === 'perpendiculaires' ? angle + 90 : relation === 'parallèles' ? angle : angle + a.choisir([40, 55, 125, 140]);
      const c1: Point = relation === 'parallèles' ? polaire([5, 5], 1.6, angle + 90) : [5, 5];
      const c2: Point = relation === 'parallèles' ? polaire([5, 5], 1.6, angle - 90) : [5, 5];
      const droite = (c: Point, ang: number, nom: string): ElementFigure =>
        ({ forme: 'droite', de: polaire(c, 4, ang), a: polaire(c, 4, ang + 180), nom });
      const [d1, d2] = a.choisir([['d', 'e'], ['d₁', 'd₂'], ['f', 'g']] as const);
      return {
        gabarit: 'qcm',
        consigne: `Comment sont les droites ${d1} et ${d2} ?`,
        visuel: figure(10, 10, [droite(c1, angle, d1), droite(c2, autre, d2)]),
        options: a.melanger([...RELATIONS]),
        erreurs: tous(RELATIONS, relation, 'perpendiculaires-paralleles'),
        reponse: relation,
        indice: 'Se coupent-elles ? Si oui, forment-elles un angle droit ? Vérifie avec ton équerre.',
        explication: relation === 'perpendiculaires' ? 'Elles se coupent en formant un angle droit : elles sont perpendiculaires.'
          : relation === 'parallèles' ? 'Elles ne se coupent jamais, même prolongées : elles sont parallèles.'
            : 'Elles se coupent, mais sans former d’angle droit.',
      };
    }
    if (d === 2) {
      const questions: [string, string, string][] = [
        ['Deux droites qui se coupent en formant un angle droit sont…', 'perpendiculaires', 'Perpendiculaire veut dire : qui forme un angle droit.'],
        ['Deux droites qui ne se coupent jamais, même prolongées, sont…', 'parallèles', 'Comme les deux rails d’une voie ferrée.'],
        ['Avec quel instrument vérifie-t-on un angle droit ?', 'une équerre', 'L’équerre a un angle droit.'],
        ['Avec quel instrument trace-t-on un cercle ?', 'un compas', 'La pointe du compas se pose sur le centre.'],
        ['Avec quel instrument mesure-t-on la longueur d’un segment ?', 'une règle graduée', 'Les graduations donnent les centimètres et les millimètres.'],
        ['Les deux bords d’une règle droite sont…', 'parallèles', 'Ils restent à la même distance l’un de l’autre.'],
        ['Les lignes d’un cahier sont…', 'parallèles', 'Elles ne se croisent jamais.'],
        ['Une droite horizontale et une droite verticale qui se croisent sont…', 'perpendiculaires', 'Elles forment un angle droit.'],
        ['Dans un carré, deux côtés qui se suivent sont…', 'perpendiculaires', 'Les 4 angles d’un carré sont droits.'],
        ['Dans un carré, deux côtés opposés sont…', 'parallèles', 'Les côtés opposés d’un carré ne se coupent jamais.'],
        ['Le bord haut et le bord gauche d’une feuille sont…', 'perpendiculaires', 'Le coin d’une feuille est un angle droit.'],
      ];
      const [q, reponse, aide] = a.choisir(questions);
      const opts = reponse.startsWith('un') ? ['une équerre', 'un compas', 'une règle graduée'] : [...RELATIONS];
      return {
        gabarit: 'qcm', consigne: q, options: a.melanger(opts), erreurs: tous(opts, reponse, 'vocabulaire-geometrie'),
        reponse, indice: aide, explication: `Réponse : ${reponse}. ${aide}`,
      };
    }
    // Côtés d'un rectangle ou d'un losange (non carré) : opposés parallèles, consécutifs perpendiculaires ou non.
    const forme = a.choisir(['rectangle', 'losange'] as const);
    const [A, B, C, D] = a.choisir([['A', 'B', 'C', 'D'], ['E', 'F', 'G', 'H'], ['M', 'N', 'P', 'Q'], ['R', 'S', 'T', 'U']] as const);
    const opposes = a.suivant() < 0.5;
    const [cote1, cote2] = opposes ? [`[${A}${B}]`, `[${C}${D}]`] : a.choisir([[`[${A}${B}]`, `[${B}${C}]`], [`[${B}${C}]`, `[${C}${D}]`], [`[${D}${A}]`, `[${A}${B}]`]]);
    const reponse = opposes ? 'parallèles' : forme === 'rectangle' ? 'perpendiculaires' : 'ni parallèles, ni perpendiculaires';
    return {
      gabarit: 'qcm',
      consigne: `${A}${B}${C}${D} est un ${forme}${forme === 'losange' ? ' qui n’est pas un carré' : ''}. Comment sont ses côtés ${cote1} et ${cote2} ?`,
      options: a.melanger([...RELATIONS]),
      erreurs: tous(RELATIONS, reponse, 'proprietes-figures'),
      reponse,
      indice: opposes ? 'Ce sont deux côtés opposés.' : 'Ce sont deux côtés qui se suivent. Y a-t-il un angle droit ?',
      explication: opposes ? `Dans un ${forme}, les côtés opposés sont parallèles.`
        : forme === 'rectangle' ? 'Un rectangle a 4 angles droits : deux côtés qui se suivent sont perpendiculaires.'
          : 'Un losange qui n’est pas un carré n’a pas d’angle droit : ces côtés se coupent sans être perpendiculaires.',
    };
  },
});

// ─────────────────────────────────────────── CM1 : triangles et quadrilatères particuliers

const TRIANGLES = ['un triangle équilatéral', 'un triangle isocèle', 'un triangle rectangle', 'un triangle quelconque'] as const;
export const PHRASES_VRAIES = [
  'Un carré est un rectangle particulier.', 'Un carré est un losange particulier.', 'Un triangle équilatéral est aussi isocèle.',
  'Un rectangle a ses côtés opposés parallèles.', 'Un losange a ses 4 côtés de même longueur.',
];
export const PHRASES_FAUSSES = [
  'Un losange a toujours 4 angles droits.', 'Un rectangle a toujours 4 côtés égaux.', 'Un triangle équilatéral a un angle droit.',
  'Un triangle isocèle a toujours 3 côtés égaux.', 'Un carré n’est pas un rectangle.', 'Un triangle peut avoir 2 angles droits.',
];

export const figuresCm1 = creerGenerateur({
  id: 'figures-cm1',
  competence: 'MA-C3-CM1-GEO-03',
  cycle: 3,
  description: 'Reconnaitre les triangles particuliers et les quadrilatères usuels à partir de leurs propriétés.',
  generer(a, d) {
    if (d === 1) {
      const sorte = a.choisir(TRIANGLES);
      let cotes: number[];
      if (sorte === 'un triangle équilatéral') { const x = a.entier(3, 9); cotes = [x, x, x]; }
      else if (sorte === 'un triangle isocèle') { const x = a.entier(4, 9); let y = a.entier(2, 2 * x - 1); if (y === x) y = x - 1; cotes = a.melanger([x, x, y]); }
      else if (sorte === 'un triangle rectangle') { const k = a.entier(1, 2); cotes = a.choisir([[3, 4, 5], [6, 8, 10], [5, 12, 13]]).map((v) => v * k); }
      else {
        const rectangle = (c: number[]) => { const [x, y, z] = [...c].sort((u, v) => u - v) as [number, number, number]; return x * x + y * y === z * z; };
        do { cotes = [a.entier(3, 9), a.entier(3, 9), a.entier(3, 9)]; }
        while (new Set(cotes).size < 3 || Math.max(...cotes) * 2 >= cotes.reduce((s, v) => s + v, 0) || rectangle(cotes));
      }
      const droit = sorte === 'un triangle rectangle';
      return {
        gabarit: 'qcm',
        consigne: `Un triangle a des côtés de ${cotes.join(' cm, ').replace(/, (\d+)$/, ' et $1')} cm.${droit ? ' Il a un angle droit.' : ' Il n’a pas d’angle droit.'} Quelle est sa nature ?`,
        options: a.melanger([...TRIANGLES]),
        erreurs: tous(TRIANGLES, sorte, 'triangles-particuliers'),
        reponse: sorte,
        indice: 'Compte les côtés de même longueur, puis regarde s’il y a un angle droit.',
        explication: sorte === 'un triangle équilatéral' ? 'Ses 3 côtés ont la même longueur : il est équilatéral.'
          : sorte === 'un triangle isocèle' ? 'Exactement 2 côtés ont la même longueur : il est isocèle.'
            : droit ? 'Il a un angle droit : c’est un triangle rectangle.' : 'Ses côtés sont tous différents et il n’a pas d’angle droit : il est quelconque.',
      };
    }
    if (d === 2) {
      const c = a.entier(3, 12);
      let l = a.entier(3, 12);
      if (l === c) l = c + 2;
      const cas: [string, string][] = [
        [`Ses 4 côtés mesurent ${c} cm. Il a 4 angles droits.`, 'un carré'],
        [`Ses côtés mesurent ${Math.max(c, l)} cm, ${Math.min(c, l)} cm, ${Math.max(c, l)} cm et ${Math.min(c, l)} cm. Il a 4 angles droits.`, 'un rectangle'],
        [`Ses 4 côtés mesurent ${c} cm. Il n’a aucun angle droit.`, 'un losange'],
      ];
      const [desc, reponse] = a.choisir(cas);
      const opts = ['un carré', 'un rectangle', 'un losange', 'un triangle'];
      return {
        gabarit: 'qcm', consigne: `Un quadrilatère est décrit ainsi : « ${desc} » De quelle figure s’agit-il ?`,
        options: a.melanger(opts), erreurs: tous(opts, reponse, 'quadrilateres-confondus'), reponse,
        indice: 'Regarde les longueurs des côtés et les angles droits.',
        explication: `${desc} C’est ${reponse}.`,
      };
    }
    const vraie = a.choisir(PHRASES_VRAIES);
    const fausses = a.melanger(PHRASES_FAUSSES).slice(0, 3);
    return {
      gabarit: 'qcm', consigne: 'Quelle phrase est vraie ?', options: a.melanger([vraie, ...fausses]),
      erreurs: tous([vraie, ...fausses], vraie, 'proprietes-figures'), reponse: vraie,
      indice: 'Pense aux définitions : côtés égaux, angles droits, côtés parallèles.',
      explication: `${vraie} Les autres phrases contredisent une définition.`,
    };
  },
});

// ─────────────────────────────────────────── Symétrie axiale (CM1, CM2)

/** Figures dont on compte les axes de symétrie, avec leur dessin. */
export function figureAxes(nom: string): ElementFigure {
  const c: Point = [5, 5];
  switch (nom) {
    case 'un carré': return { forme: 'polygone', sommets: [[2, 2], [8, 2], [8, 8], [2, 8]] };
    case 'un rectangle': return { forme: 'polygone', sommets: [[1, 3], [9, 3], [9, 7], [1, 7]] };
    case 'un losange': return { forme: 'polygone', sommets: [[5, 1], [8, 5], [5, 9], [2, 5]] };
    case 'un triangle équilatéral': return { forme: 'polygone', sommets: regulier(3, [5, 5.6], 4.2) };
    case 'un triangle isocèle': return { forme: 'polygone', sommets: [[5, 1], [7.5, 9], [2.5, 9]] };
    case 'un triangle quelconque': return { forme: 'polygone', sommets: [[1, 3], [9, 1], [5, 9]] };
    case 'un pentagone régulier': return { forme: 'polygone', sommets: regulier(5, c, 4.3) };
    case 'un hexagone régulier': return { forme: 'polygone', sommets: regulier(6, c, 4.3, 0) };
    case 'un parallélogramme': return { forme: 'polygone', sommets: [[1, 7], [3, 3], [9, 3], [7, 7]] };
    default: return { forme: 'cercle', centre: c, rayon: 4 };
  }
}
const AXES_CM1 = [['un carré', '4'], ['un rectangle', '2'], ['un losange', '2'], ['un triangle équilatéral', '3'], ['un triangle isocèle', '1'], ['un triangle quelconque', '0'], ['un cercle', 'une infinité']] as const;
const AXES_CM2 = [...AXES_CM1, ['un pentagone régulier', '5'], ['un hexagone régulier', '6'], ['un parallélogramme', '0']] as const;
const VALEURS_AXES = ['0', '1', '2', '3', '4', '5', '6', 'une infinité'];

function axesDeSymetrie(a: Aleatoire, liste: readonly (readonly [string, string])[]) {
  const [nom, reponse] = a.choisir(liste);
  const pieges = a.melanger(VALEURS_AXES.filter((v) => v !== reponse)).slice(0, 3);
  const opts = a.melanger([reponse, ...pieges]);
  return {
    gabarit: 'qcm' as const,
    consigne: `Cette figure est ${nom}. Combien d’axes de symétrie a-t-elle ?`,
    visuel: figure(10, 10, [figureAxes(nom)]),
    options: opts,
    erreurs: tous(opts, reponse, 'axes-symetrie'),
    reponse,
    indice: 'Un axe de symétrie partage la figure en deux moitiés qui se superposent par pliage.',
    explication: reponse === 'une infinité' ? 'Toute droite qui passe par le centre du cercle est un axe de symétrie.'
      : reponse === '0' ? `Aucun pliage ne superpose les deux moitiés : ${nom.replace(/^un /, 'ce ')} n’a pas d’axe de symétrie.`
        : `${nom[0]!.toUpperCase()}${nom.slice(1)} a ${reponse} axe${reponse === '1' ? '' : 's'} de symétrie.`,
  };
}

const COLONNES = 'ABCDEFGHIJ';
const nomCase = (colonne: number, ligne: number) => `${COLONNES[colonne]}${ligne + 1}`;

/**
 * Symétrique d'une case sur papier quadrillé repéré (colonnes A, B, C…, lignes 1, 2, 3…).
 * Axe vertical entre deux colonnes, horizontal entre deux lignes, ou diagonale du quadrillage.
 */
function caseSymetrique(a: Aleatoire, axes: readonly ('vertical' | 'horizontal' | 'diagonale')[]) {
  const n = 8;
  const axe = a.choisir(axes);
  let col: number, lig: number, sc: number, sl: number;
  let trait: ElementFigure;
  let entre = 0; // carreaux entre la case et l'axe (axe vertical ou horizontal)
  if (axe === 'diagonale') {
    do { col = a.entier(0, n - 1); lig = a.entier(0, n - 1); } while (col === lig);
    [sc, sl] = [lig, col];
    trait = { forme: 'axe', de: [0, 0], a: [n, n] };
  } else {
    const k = a.entier(3, 5); // l'axe passe entre le rang k − 1 et le rang k
    let p = a.entier(Math.max(0, 2 * k - n), k - 1);
    let ps = 2 * k - 1 - p;
    if (a.suivant() < 0.5) [p, ps] = [ps, p];
    entre = Math.abs(p - ps) / 2 - 0.5;
    const q = a.entier(0, n - 1);
    if (axe === 'vertical') { [col, lig, sc, sl] = [p, q, ps, q]; trait = { forme: 'axe', de: [k, 0], a: [k, n] }; }
    else { [col, lig, sc, sl] = [q, p, q, ps]; trait = { forme: 'axe', de: [0, k], a: [n, k] }; }
  }
  const reponse = nomCase(sc, sl);
  const pieges: Piege[] = [
    [nomCase(col, lig), 'symetrique-non-retourne'],
    ...[[sc + 1, sl], [sc - 1, sl], [sc, sl + 1], [sc, sl - 1]]
      .filter(([x, y]) => x! >= 0 && x! < n && y! >= 0 && y! < n)
      .map(([x, y]): Piege => [nomCase(x!, y!), 'symetrique-decale']),
  ];
  return {
    gabarit: 'qcm' as const,
    consigne: `Quelle case est la symétrique de la case colorée ${nomCase(col, lig)} par rapport à l’axe en pointillés ?`,
    visuel: figure(n, n, [{ forme: 'case', colonne: col, ligne: lig, accent: true }, trait], { quadrillage: true, reperes: true }),
    ...choix(a, reponse, pieges, () => nomCase(a.entier(0, n - 1), a.entier(0, n - 1))),
    reponse,
    indice: axe === 'diagonale' ? 'Par rapport à cette diagonale, le rang de la colonne et celui de la ligne s’échangent.'
      : 'Compte les carreaux entre la case et l’axe. Le symétrique est à la même distance, de l’autre côté.',
    explication: axe === 'diagonale'
      ? `${nomCase(col, lig)} est en colonne ${col + 1}, ligne ${lig + 1}. Son symétrique est en colonne ${sc + 1}, ligne ${sl + 1} : ${reponse}.`
      : `${entre === 0 ? 'La case touche l’axe' : `Il y a ${entre} carreau${entre > 1 ? 'x' : ''} entre la case et l’axe`}. Son symétrique est à la même distance, de l’autre côté : ${reponse}.`,
  };
}

const LETTRES_SYMETRIQUES = ['A', 'H', 'M', 'T', 'U', 'V', 'W', 'Y'];
const LETTRES_NON = ['F', 'G', 'J', 'L', 'N', 'P', 'R', 'S', 'Z'];

export const symetrieCm1 = creerGenerateur({
  id: 'symetrie-cm1',
  competence: 'MA-C3-CM1-SYM-01',
  cycle: 3,
  description: 'Reconnaitre les axes de symétrie d’une figure ; trouver le symétrique d’une case par rapport à un axe vertical ou horizontal.',
  generer(a, d) {
    if (d === 1) {
      const x = a.choisir(LETTRES_SYMETRIQUES);
      const opts = a.melanger([x, ...a.melanger(LETTRES_NON).slice(0, 3)]);
      return {
        gabarit: 'qcm', consigne: 'Quelle lettre majuscule a un axe de symétrie vertical ?', options: opts,
        erreurs: tous(opts, x, 'axes-symetrie'), reponse: x,
        indice: 'Imagine un miroir posé debout au milieu de la lettre.',
        explication: `Pliée en son milieu, la lettre ${x} se superpose à elle-même.`,
      };
    }
    if (d === 2) return axesDeSymetrie(a, AXES_CM1);
    return caseSymetrique(a, ['vertical', 'horizontal']);
  },
});

export const symetrieCm2 = creerGenerateur({
  id: 'symetrie-cm2',
  competence: 'MA-C3-CM2-SYM-01',
  cycle: 3,
  description: 'Symétrique d’une case sur quadrillage par rapport à un axe vertical, horizontal ou diagonal ; axes de symétrie des polygones.',
  generer(a, d) {
    if (d === 1) return caseSymetrique(a, ['vertical', 'horizontal']);
    if (d === 2) return axesDeSymetrie(a, AXES_CM2);
    return caseSymetrique(a, ['diagonale']);
  },
});

// ─────────────────────────────────────────── Solides : prismes droits, patrons du cube et du pavé

/** Les 11 patrons du cube, en cases (colonne, ligne). */
export const PATRONS_CUBE: [number, number][][] = [
  [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]], [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [0, 2]],
  [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]], [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [2, 2]],
  [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [3, 2]], [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [2, 2]],
  [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [3, 2]], [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]],
  [[0, 0], [1, 0], [2, 0], [2, 1], [3, 1], [4, 1]], [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [1, 2]],
  [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 1]],
];
/** Assemblages de 6 carrés qui ne sont pas des patrons du cube. */
export const NON_PATRONS: [number, number][][] = [
  [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]], [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]],
  [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 1]], [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1], [3, 1]],
  [[0, 0], [1, 0], [2, 0], [3, 0], [1, 1], [2, 1]], [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [2, 3]],
];
const PRISMES = [[3, 'triangulaire', 'triangles'], [5, 'pentagonale', 'pentagones'], [6, 'hexagonale', 'hexagones']] as const;

function patronCube(a: Aleatoire) {
  const oui = a.suivant() < 0.5;
  const cases = a.choisir(oui ? PATRONS_CUBE : NON_PATRONS);
  const larg = Math.max(...cases.map(([x]) => x)) + 1;
  const haut = Math.max(...cases.map(([, y]) => y)) + 1;
  const reponse = oui ? 'Oui' : 'Non';
  return {
    gabarit: 'qcm' as const,
    consigne: 'Cet assemblage de 6 carrés est-il un patron de cube ?',
    visuel: figure(larg, haut, cases.map(([colonne, ligne]): ElementFigure => ({ forme: 'case', colonne, ligne })), { quadrillage: true }),
    options: ['Oui', 'Non'].concat('On ne peut pas savoir'),
    erreurs: tous(['Oui', 'Non', 'On ne peut pas savoir'], reponse, 'patron-cube'),
    reponse,
    indice: 'Imagine le pliage : chaque face du cube doit être couverte une seule fois.',
    explication: oui ? 'En pliant, les 6 carrés couvrent chacun une face différente du cube.' : 'En pliant, deux carrés se superposent et une face du cube reste ouverte.',
  };
}

export const solidesCm1 = creerGenerateur({
  id: 'solides-cm1',
  competence: 'MA-C3-CM1-SOL-01',
  cycle: 3,
  description: 'Décrire un prisme droit (faces, sommets, arêtes) ; reconnaitre un patron du cube.',
  generer(a, d) {
    const [n, base, nature] = a.choisir(PRISMES);
    if (d === 1) {
      const reponse = `2 ${nature} et ${n} rectangles`;
      const opts = [reponse, `${n} ${nature} et 2 rectangles`, `2 ${nature} et ${n + 1} rectangles`, `${n + 2} rectangles`];
      return {
        gabarit: 'qcm', consigne: `Quelles sont les faces d’un prisme droit à base ${base} ?`, options: a.melanger(opts),
        erreurs: tous(opts, reponse, 'faces-prisme'), reponse,
        indice: 'Un prisme droit a deux bases identiques et des faces latérales rectangulaires.',
        explication: `Deux bases ${base === 'triangulaire' ? 'triangulaires' : base + 's'} (${nature}) et une face rectangulaire par côté de la base : ${n} rectangles.`,
      };
    }
    if (d === 2) {
      const pyramide = a.suivant() < 0.4;
      const [m, baseP] = a.choisir([[3, 'triangulaire'], [4, 'carrée'], [5, 'pentagonale'], [6, 'hexagonale']] as const);
      const quoi = a.choisir(['faces', 'sommets', 'arêtes'] as const);
      const valeur = pyramide ? { faces: m + 1, sommets: m + 1, arêtes: 2 * m }[quoi] : { faces: n + 2, sommets: 2 * n, arêtes: 3 * n }[quoi];
      const reponse = String(valeur);
      const solide = pyramide ? `une pyramide à base ${baseP}` : `un prisme droit à base ${base}`;
      return {
        gabarit: 'qcm', consigne: `Combien ${quoi === 'arêtes' ? 'd’' : 'de '}${quoi} a ${solide} ?`,
        ...choix(a, reponse, pyramide ? [[String(m)], [String(m + 2)], [String(2 * m + 1)], [String(3 * m)]] : [[String(n + 2)], [String(2 * n)], [String(3 * n)], [String(n)]], () => String(a.entier(4, 20)), { numerique: true }),
        reponse,
        indice: pyramide ? `La base a ${m} côtés. Toutes les faces latérales se rejoignent au sommet de la pyramide.` : `La base a ${n} côtés et ${n} sommets. Il y a deux bases.`,
        explication: pyramide
          ? `${m + 1} faces (la base et ${m} triangles), ${m + 1} sommets (${m} sur la base et le sommet), ${2 * m} arêtes (${m} sur la base et ${m} vers le sommet).`
          : `${n + 2} faces (2 bases et ${n} rectangles), ${2 * n} sommets (${n} par base), ${3 * n} arêtes (${n} sur chaque base et ${n} entre les bases).`,
      };
    }
    return patronCube(a);
  },
});

export const solidesCm2 = creerGenerateur({
  id: 'solides-cm2',
  competence: 'MA-C3-CM2-SOL-01',
  cycle: 3,
  description: 'Reconnaitre un patron du cube ; faces d’un pavé et de son patron.',
  generer(a, d) {
    if (d === 1) return patronCube(a);
    const [l, m, p] = (() => { const v = new Set<number>(); while (v.size < 3) v.add(a.entier(2, 9)); return [...v].sort((x, y) => y - x); })() as [number, number, number];
    if (d === 2) {
      const [x, y] = a.choisir([[l, m], [l, p], [m, p]] as const);
      return {
        gabarit: 'qcm', consigne: `Un pavé mesure ${l} cm de long, ${m} cm de large et ${p} cm de haut. Combien de ses faces mesurent ${x} cm sur ${y} cm ?`,
        ...choix(a, '2', [['1'], ['4'], ['6'], ['3']], () => String(a.entier(1, 6)), { numerique: true }),
        reponse: '2',
        indice: 'Les faces d’un pavé vont par paires : une face et la face opposée sont identiques.',
        explication: `Le pavé a 6 faces rectangulaires, identiques deux à deux. Deux faces mesurent ${x} cm sur ${y} cm.`,
      };
    }
    const reponse = String(2 * (l * m + l * p + m * p));
    return {
      gabarit: 'saisie',
      consigne: `On découpe le patron d’un pavé de ${l} cm, ${m} cm et ${p} cm. Quelle est l’aire totale du patron, en cm² ?`,
      reponse,
      indice: 'Calcule l’aire de chaque paire de faces identiques, puis ajoute.',
      explication: `2 × (${l} × ${m}) + 2 × (${l} × ${p}) + 2 × (${m} × ${p}) = ${2 * l * m} + ${2 * l * p} + ${2 * m * p} = ${reponse} cm².`,
    };
  },
});

// ─────────────────────────────────────────── CM2 : polygones, trapèzes

const DESCRIPTIONS_CM2: [string, string][] = [
  ['Il a exactement une paire de côtés parallèles et aucun angle droit.', 'un trapèze'],
  ['Il a exactement une paire de côtés parallèles et deux angles droits.', 'un trapèze rectangle'],
  ['Il a 4 côtés de même longueur, sans angle droit.', 'un losange'],
  ['Il a 4 angles droits et ses côtés ne sont pas tous égaux.', 'un rectangle'],
];

export const polygonesCm2 = creerGenerateur({
  id: 'polygones-cm2',
  competence: 'MA-C3-CM2-GEO-02',
  cycle: 3,
  description: 'Nommer les polygones usuels (pentagone, hexagone, trapèze, trapèze rectangle) d’après leur définition.',
  generer(a, d) {
    if (d === 1) {
      const [n, nom] = a.choisir(POLYGONES);
      const opts = POLYGONES.map(([, x]) => x);
      return {
        gabarit: 'qcm', consigne: 'Comment s’appelle ce polygone ?', visuel: figure(10, 10, [{ forme: 'polygone', sommets: regulier(n, [5, 5], a.choisir([3.5, 4, 4.5]), a.choisir([90, 70, 110, 45])) }]),
        options: a.melanger([...opts]), erreurs: tous(opts, nom, 'polygones-confondus'), reponse: nom,
        indice: 'Compte ses côtés : penta signifie cinq, hexa signifie six.', explication: `Il a ${n} côtés : c’est ${nom}.`,
      };
    }
    if (d === 2) {
      const [n, nom] = a.choisir(POLYGONES.slice(1));
      const quoi = a.choisir(['côtés', 'sommets', 'diagonales'] as const);
      const valeur = quoi === 'diagonales' ? (n * (n - 3)) / 2 : n;
      const reponse = String(valeur);
      const k = n - 3;
      return {
        gabarit: 'qcm', consigne: `Combien de ${quoi} a ${nom} ?`,
        ...choix(a, reponse, [[String(n)], [String(n + 1)], [String(n - 1)], [String(valeur + 1)]], () => String(a.entier(2, 9)), { numerique: true }),
        reponse,
        indice: quoi === 'diagonales' ? 'Une diagonale relie deux sommets qui ne se suivent pas.' : `Le préfixe du nom donne le nombre de ${quoi}.`,
        explication: quoi === 'diagonales'
          ? `Chaque sommet est relié à ${k} sommet${k > 1 ? 's' : ''} non voisin${k > 1 ? 's' : ''}. Chaque diagonale est comptée deux fois : ${n} × ${k} ÷ 2 = ${valeur}.`
          : `${nom[0]!.toUpperCase()}${nom.slice(1)} a ${n} ${quoi}.`,
      };
    }
    const [desc, reponse] = a.choisir(DESCRIPTIONS_CM2);
    const opts = DESCRIPTIONS_CM2.map(([, x]) => x);
    return {
      gabarit: 'qcm', consigne: `Un quadrilatère est décrit ainsi : « ${desc} » De quelle figure s’agit-il ?`,
      options: a.melanger(opts), erreurs: tous(opts, reponse, 'quadrilateres-confondus'), reponse,
      indice: 'Un trapèze a une seule paire de côtés parallèles.', explication: `${desc} C’est ${reponse}.`,
    };
  },
});

// ─────────────────────────────────────────── CM2 : programmes de construction

export const constructionCm2 = creerGenerateur({
  id: 'construction-cm2',
  competence: 'MA-C3-CM2-GEO-03',
  cycle: 3,
  description: 'Suivre un programme de construction et en prévoir le résultat : longueurs, points, nature de la figure obtenue.',
  generer(a, d) {
    const [A, B, M] = noms(a, 3) as [string, string, string];
    if (d === 1) {
      const l = a.entier(6, 15);
      const x = a.entier(1, l - 1);
      return a.suivant() < 0.5
        ? {
            gabarit: 'saisie', consigne: `Trace le segment [${A}${B}] de ${l} cm. Trace le cercle de centre ${A} qui passe par ${B}. Quel est le rayon de ce cercle, en cm ?`,
            reponse: String(l), indice: `Le rayon est la distance entre le centre ${A} et un point du cercle.`,
            explication: `${B} est sur le cercle de centre ${A} : le rayon est ${A}${B} = ${l} cm.`,
          }
        : {
            gabarit: 'saisie', consigne: `Trace le segment [${A}${B}] de ${l} cm. Place le point ${M} sur ce segment, à ${x} cm de ${A}. Combien mesure ${M}${B}, en cm ?`,
            reponse: String(l - x), indice: `${A}${M} + ${M}${B} = ${A}${B}.`, explication: `${M}${B} = ${l} − ${x} = ${l - x} cm.`,
          };
    }
    if (d === 2) {
      if (a.suivant() < 0.5) {
        const r = a.entier(2, 9);
        return {
          gabarit: 'saisie', consigne: `Trace un cercle de centre O et de rayon ${r} cm. Trace un diamètre [${A}${B}]. Combien mesure ${A}${B}, en cm ?`,
          reponse: String(2 * r), indice: 'Un diamètre mesure deux rayons.', explication: `${A}${B} = 2 × ${r} = ${2 * r} cm.`,
        };
      }
      const [P, Q, R, S] = a.choisir([['A', 'B', 'C', 'D'], ['E', 'F', 'G', 'H'], ['M', 'N', 'P', 'Q']] as const);
      const opts = [P, Q, R, S].filter((x) => x !== P);
      return {
        gabarit: 'qcm', consigne: `Trace un rectangle ${P}${Q}${R}${S}. Trace la droite perpendiculaire à la droite (${P}${Q}) qui passe par ${P}. Par quel autre sommet passe-t-elle ?`,
        options: a.melanger(opts), erreurs: tous(opts, S, 'proprietes-figures'), reponse: S,
        indice: `Dans un rectangle, les côtés [${P}${Q}] et [${S}${P}] forment un angle droit.`,
        explication: `L’angle en ${P} est droit : la perpendiculaire à (${P}${Q}) passant par ${P} contient le côté [${P}${S}], donc le sommet ${S}.`,
      };
    }
    if (a.suivant() < 0.5) {
      const opts = ['deux triangles rectangles', 'deux rectangles', 'deux carrés', 'deux losanges'];
      const [P, Q, R, S] = a.choisir([['A', 'B', 'C', 'D'], ['E', 'F', 'G', 'H'], ['M', 'N', 'P', 'Q']] as const);
      return {
        gabarit: 'qcm', consigne: `Trace un carré ${P}${Q}${R}${S}. Trace la diagonale [${P}${R}]. Quelles figures obtiens-tu ?`,
        options: a.melanger(opts), erreurs: tous(opts, 'deux triangles rectangles', 'proprietes-figures'), reponse: 'deux triangles rectangles',
        indice: 'Une diagonale relie deux sommets opposés. Combien de côtés a chaque morceau ?',
        explication: 'La diagonale coupe le carré en deux triangles. Chacun garde un angle droit du carré : ce sont deux triangles rectangles.',
      };
    }
    const x = a.entier(4, 9);
    const y = a.choisir([2, 3, x + 2, x + 3].filter((v) => v !== x && v < 2 * x));
    const opts = ['un triangle isocèle', 'un triangle équilatéral', 'un triangle rectangle', 'un carré'];
    return {
      gabarit: 'qcm', consigne: `Trace un segment [${A}${B}] de ${y} cm. Place un point ${M} à ${x} cm de ${A} et à ${x} cm de ${B}. Quelle figure forme le triangle ${A}${B}${M} ?`,
      options: a.melanger(opts), erreurs: tous(opts, 'un triangle isocèle', 'triangles-particuliers'), reponse: 'un triangle isocèle',
      indice: `Compare ${M}${A}, ${M}${B} et ${A}${B}.`,
      explication: `${M}${A} = ${M}${B} = ${x} cm et ${A}${B} = ${y} cm : deux côtés seulement sont égaux, le triangle est isocèle.`,
    };
  },
});

export const GENERATEURS_GEOMETRIE = {
  ce1: [cercleCe1],
  ce2: [polygonesCe2, cercleCe2],
  cm1: [cercleCm1, droitesCm1, figuresCm1, symetrieCm1, solidesCm1],
  cm2: [cercleCm2, polygonesCm2, constructionCm2, symetrieCm2, solidesCm2],
};
