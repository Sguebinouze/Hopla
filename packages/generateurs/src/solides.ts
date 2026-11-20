// Solides dessinés en perspective cavalière : le modèle 3D sert au dessin et prouve les nombres de
// faces, d'arêtes et de sommets annoncés par les générateurs (voir solides.test.ts).
import type { NomSolide, Point } from './types';

type P3 = readonly [number, number, number];
type Polyedre = { sommets: P3[]; faces: number[][] };

/** Une ligne du dessin : visible (trait plein) ou cachée (pointillés). */
export type LigneSolide = { points: Point[]; cache: boolean };
export type DessinSolide = { largeur: number; hauteur: number; fond: Point[][]; lignes: LigneSolide[] };

const boite = (l: number, h: number, p: number): Polyedre => ({
  sommets: [[0, 0, 0], [l, 0, 0], [l, h, 0], [0, h, 0], [0, 0, p], [l, 0, p], [l, h, p], [0, h, p]],
  faces: [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [3, 2, 6, 7], [0, 3, 7, 4], [1, 2, 6, 5]],
});

/** Polyèdres : x vers la droite, y vers le haut, z vers le fond. */
export const POLYEDRES: Partial<Record<NomSolide, Polyedre>> = {
  cube: boite(2, 2, 2),
  pave: boite(3.4, 1.7, 1.8),
  pyramide: {
    sommets: [[0, 0, 0], [2.6, 0, 0], [2.6, 0, 2.6], [0, 0, 2.6], [1.3, 2.6, 1.3]],
    faces: [[0, 1, 2, 3], [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]],
  },
  'pyramide-triangulaire': {
    sommets: [[0, 0, 0], [2.4, 0, 0], [3, 0, 2.4], [1.8, 2.4, 0.8]],
    faces: [[0, 1, 2], [0, 1, 3], [1, 2, 3], [2, 0, 3]],
  },
  'prisme-triangulaire': {
    sommets: [[0, 0, 0], [2.4, 0, 0], [1.2, 1.9, 0], [0, 0, 2.8], [2.4, 0, 2.8], [1.2, 1.9, 2.8]],
    faces: [[0, 1, 2], [3, 4, 5], [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]],
  },
};

/** `s` et `t` se suivent sur le contour de la face `f`. */
const cote = (f: number[], s: number, t: number) =>
  f.some((x, i) => { const y = f[(i + 1) % f.length]; return (x === s && y === t) || (x === t && y === s); });

/** Arêtes d'un polyèdre : côtés de ses faces, chacun compté une fois. */
export function aretes(p: Polyedre): [number, number][] {
  const vues = new Map<string, [number, number]>();
  for (const f of p.faces) {
    f.forEach((s, i) => {
      const t = f[(i + 1) % f.length]!;
      vues.set(`${Math.min(s, t)}-${Math.max(s, t)}`, [Math.min(s, t), Math.max(s, t)]);
    });
  }
  return [...vues.values()];
}

// Perspective cavalière : fuyantes à 45°, coefficient de réduction 0,5.
const C = 0.5 * Math.SQRT1_2;
const projeter = ([x, y, z]: P3): Point => [x + C * z, -(y + C * z)];
/** Direction de projection : deux points alignés selon elle ont la même image. */
const VUE: P3 = [-C, -C, 1];

const moins = (a: P3, b: P3): P3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const vectoriel = (a: P3, b: P3): P3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const scalaire = (a: P3, b: P3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const centre = (pts: P3[]): P3 => {
  const n = pts.length;
  return [pts.reduce((s, p) => s + p[0], 0) / n, pts.reduce((s, p) => s + p[1], 0) / n, pts.reduce((s, p) => s + p[2], 0) / n];
};

/** Faces tournées vers l'observateur (normale sortante opposée à la direction de projection). */
export function facesVisibles(p: Polyedre): boolean[] {
  const g = centre(p.sommets);
  return p.faces.map((f) => {
    const [a, b, c] = f.map((i) => p.sommets[i]!) as [P3, P3, P3];
    let n = vectoriel(moins(b, a), moins(c, a));
    if (scalaire(n, moins(centre(f.map((i) => p.sommets[i]!)), g)) < 0) n = [-n[0], -n[1], -n[2]];
    return scalaire(n, VUE) < 0;
  });
}

/** Ellipse échantillonnée de l'angle `de` à l'angle `a` (le bas de l'écran est l'avant). */
function arc(cx: number, cy: number, rx: number, ry: number, de: number, a: number): Point[] {
  const n = 24;
  return Array.from({ length: n + 1 }, (_, k): Point => {
    const t = de + ((a - de) * k) / n;
    return [cx + rx * Math.cos(t), cy + ry * Math.sin(t)];
  });
}

function courbe(nom: 'cylindre' | 'cone' | 'boule'): { fond: Point[][]; lignes: LigneSolide[] } {
  const r = 1.3;
  const e = 0.4; // aplatissement des ellipses
  if (nom === 'boule') {
    return {
      fond: [arc(0, 0, r, r, 0, 2 * Math.PI)],
      lignes: [
        { points: arc(0, 0, r, r, 0, 2 * Math.PI), cache: false },
        { points: arc(0, 0, r, r * e, 0, Math.PI), cache: false },
        { points: arc(0, 0, r, r * e, Math.PI, 2 * Math.PI), cache: true },
      ],
    };
  }
  const h = 2.8;
  const base = [
    { points: arc(0, 0, r, r * e, 0, Math.PI), cache: false },
    { points: arc(0, 0, r, r * e, Math.PI, 2 * Math.PI), cache: true },
  ];
  if (nom === 'cone') {
    return {
      fond: [[[0, -h], [r, 0], ...arc(0, 0, r, r * e, 0, Math.PI), [-r, 0]]],
      lignes: [...base, { points: [[-r, 0], [0, -h], [r, 0]], cache: false }],
    };
  }
  return {
    fond: [[[-r, -h], [r, -h], ...arc(0, 0, r, r * e, 0, Math.PI)], arc(0, -h, r, r * e, 0, 2 * Math.PI)],
    lignes: [
      ...base,
      { points: arc(0, -h, r, r * e, 0, 2 * Math.PI), cache: false },
      { points: [[-r, 0], [-r, -h]], cache: false },
      { points: [[r, 0], [r, -h]], cache: false },
    ],
  };
}

/** Dessin d'un solide, recadré : origine en haut à gauche, en unités. */
export function dessinSolide(nom: NomSolide): DessinSolide {
  let fond: Point[][];
  let lignes: LigneSolide[];
  const p = POLYEDRES[nom];
  if (p) {
    const visibles = facesVisibles(p);
    const pts = p.sommets.map(projeter);
    fond = p.faces.filter((_, i) => visibles[i]).map((f) => f.map((i) => pts[i]!));
    lignes = aretes(p).map(([s, t]) => ({
      points: [pts[s]!, pts[t]!],
      // Une arête est cachée quand ses deux faces le sont.
      cache: !p.faces.some((f, i) => visibles[i] && cote(f, s, t)),
    }));
  } else {
    ({ fond, lignes } = courbe(nom as 'cylindre' | 'cone' | 'boule'));
  }
  const tous = lignes.flatMap((l) => l.points);
  const x0 = Math.min(...tous.map((q) => q[0]));
  const y0 = Math.min(...tous.map((q) => q[1]));
  const decaler = (q: Point): Point => [q[0] - x0, q[1] - y0];
  return {
    largeur: Math.max(...tous.map((q) => q[0])) - x0,
    hauteur: Math.max(...tous.map((q) => q[1])) - y0,
    fond: fond.map((f) => f.map(decaler)),
    lignes: lignes.map((l) => ({ ...l, points: l.points.map(decaler) })),
  };
}

/** Faces, arêtes et sommets d'un polyèdre du modèle. */
export function compter(nom: NomSolide): { faces: number; aretes: number; sommets: number } | null {
  const p = POLYEDRES[nom];
  return p ? { faces: p.faces.length, aretes: aretes(p).length, sommets: p.sommets.length } : null;
}
