// Justesse des générateurs de géométrie : chaque réponse est recalculée à partir de la figure dessinée
// ou de la consigne, sans réutiliser la logique des générateurs.
import { describe, expect, it } from 'vitest';
import { NON_PATRONS, PATRONS_CUBE, PHRASES_FAUSSES, PHRASES_VRAIES } from './geometrie-plane';
import { partout, tous, val } from './oracles';
import type { ElementFigure, Item, Point } from './types';

const elements = (item: Item): ElementFigure[] => (item.visuel?.type === 'figure' ? item.visuel.elements : []);
const de = <F extends ElementFigure['forme']>(item: Item, forme: F) =>
  elements(item).filter((e): e is Extract<ElementFigure, { forme: F }> => e.forme === forme);
const dist = (p: Point, q: Point) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const pres = (x: number, y: number, e = 0.15) => Math.abs(x - y) < e;
const nombres = (t: string) => [...t.matchAll(/\d+(,\d+)?/g)].map((m) => val(m[0]));

/** Nombre d'axes de symétrie d'un polygone : droites par le centre de gravité et un sommet ou un milieu de côté. */
function axes(sommets: Point[]): number {
  const n = sommets.length;
  const g: Point = [sommets.reduce((s, p) => s + p[0], 0) / n, sommets.reduce((s, p) => s + p[1], 0) / n];
  const candidats: number[] = [];
  for (let i = 0; i < n; i++) {
    const p = sommets[i]!;
    const q = sommets[(i + 1) % n]!;
    for (const m of [p, [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2] as Point]) {
      const ang = (Math.atan2(m[1] - g[1], m[0] - g[0]) + Math.PI) % Math.PI;
      if (!candidats.some((c) => pres(c, ang, 0.02) || pres(Math.abs(c - ang), Math.PI, 0.02))) candidats.push(ang);
    }
  }
  return candidats.filter((ang) => {
    const [ux, uy] = [Math.cos(ang), Math.sin(ang)];
    return sommets.every((p) => {
      const [x, y] = [p[0] - g[0], p[1] - g[1]];
      const k = x * ux + y * uy;
      const r: Point = [g[0] + 2 * k * ux - x, g[1] + 2 * k * uy - y];
      return sommets.some((s) => dist(s, r) < 0.2);
    });
  }).length;
}

/** Un assemblage de 6 carrés se plie-t-il en cube ? On fait rouler un dé sur les cases et on note la face posée. */
function plieEnCube(cases: [number, number][]): boolean {
  type V = [number, number, number];
  const neg = (v: V): V => [-v[0], -v[1], -v[2]];
  const cle = (c: [number, number]) => `${c[0]},${c[1]}`;
  const etat = new Map<string, { bas: V; est: V; sud: V }>([[cle(cases[0]!), { bas: [0, 0, -1], est: [1, 0, 0], sud: [0, 1, 0] }]]);
  const file = [cases[0]!];
  const ens = new Set(cases.map(cle));
  while (file.length) {
    const c = file.shift()!;
    const o = etat.get(cle(c))!;
    const voisins: [[number, number], { bas: V; est: V; sud: V }][] = [
      [[c[0] + 1, c[1]], { bas: o.est, est: neg(o.bas), sud: o.sud }],
      [[c[0] - 1, c[1]], { bas: neg(o.est), est: o.bas, sud: o.sud }],
      [[c[0], c[1] + 1], { bas: o.sud, est: o.est, sud: neg(o.bas) }],
      [[c[0], c[1] - 1], { bas: neg(o.sud), est: o.est, sud: o.bas }],
    ];
    for (const [v, ov] of voisins) {
      if (ens.has(cle(v)) && !etat.has(cle(v))) { etat.set(cle(v), ov); file.push(v); }
    }
  }
  return etat.size === 6 && new Set([...etat.values()].map((o) => o.bas.join(','))).size === 6;
}

/** Forme canonique d'un assemblage, aux rotations et retournements près. */
function canonique(cases: [number, number][]): string {
  const formes: string[] = [];
  for (let t = 0; t < 8; t++) {
    const pts = cases.map(([x, y]) => {
      let [a, b] = [x, y];
      for (let r = 0; r < t % 4; r++) [a, b] = [b, -a];
      return t >= 4 ? [-a, b] : [a, b];
    });
    const mx = Math.min(...pts.map((p) => p[0]!));
    const my = Math.min(...pts.map((p) => p[1]!));
    formes.push(pts.map(([a, b]) => `${a! - mx},${b! - my}`).sort().join(' '));
  }
  return formes.sort()[0]!;
}

describe('géométrie : figures de référence et cercle', () => {
  it('cercle-ce1 : le nom correspond à la figure dessinée, le centre est bien le centre', () => {
    partout('cercle-ce1', (item, d) => {
      if (d === 3) {
        const c = de(item, 'cercle')[0]!;
        const p = de(item, 'point').find((x) => x.nom === item.reponse)!;
        expect(dist(p.en, c.centre)).toBeLessThan(0.01);
        return;
      }
      const f = elements(item)[0]!;
      if (f.forme === 'cercle') expect(item.reponse).toBe(f.plein ? 'un disque' : 'un cercle');
      else if (f.forme === 'polygone') {
        const s = f.sommets;
        if (s.length === 3) expect(item.reponse).toBe('un triangle');
        else expect(item.reponse).toBe(pres(dist(s[0]!, s[1]!), dist(s[1]!, s[2]!)) ? 'un carré' : 'un rectangle');
      }
    });
  });

  for (const id of ['cercle-ce2', 'cercle-cm1', 'cercle-cm2']) {
    it(`${id} : rayon ou diamètre d’après le segment dessiné, longueurs justes, position d’un point`, () => {
      partout(id, (item, d) => {
        if (d === 1) {
          const c = de(item, 'cercle')[0]!;
          const s = de(item, 'segment').find((x) => x.accent)!;
          const unBoutAuCentre = dist(s.de, c.centre) < 0.01 || dist(s.a, c.centre) < 0.01;
          const milieu: Point = [(s.de[0] + s.a[0]) / 2, (s.de[1] + s.a[1]) / 2];
          if (unBoutAuCentre) expect(item.reponse).toBe('un rayon');
          else {
            expect(dist(milieu, c.centre)).toBeLessThan(0.15);
            expect(pres(dist(s.de, c.centre), c.rayon) && pres(dist(s.a, c.centre), c.rayon)).toBe(true);
            expect(item.reponse).toBe('un diamètre');
          }
          return;
        }
        const [x] = nombres(item.consigne);
        if (/rayon de [\d,]+ cm/.test(item.consigne) && /diamètre/.test(item.consigne.split('.').at(-1)!) && !/Où/.test(item.consigne)) {
          expect(val(item.reponse)).toBeCloseTo(2 * x!, 9);
        } else if (/diamètre de [\d,]+ cm/.test(item.consigne)) {
          expect(val(item.reponse)).toBeCloseTo(x! / 2, 9);
        } else {
          const [r, dd] = nombres(item.consigne);
          expect(item.reponse).toBe(dd === r ? 'sur le cercle' : dd! < r! ? 'à l’intérieur du disque, pas sur le cercle' : 'à l’extérieur du disque');
        }
      });
    });
  }
});

describe('géométrie : polygones et figures usuelles', () => {
  it('polygones-ce2 et polygones-cm2 : nombre de côtés et nom d’après la figure', () => {
    const NOMS = { 3: 'un triangle', 4: 'un quadrilatère', 5: 'un pentagone', 6: 'un hexagone' } as Record<number, string>;
    for (const id of ['polygones-ce2', 'polygones-cm2']) {
      partout(id, (item) => {
        const p = de(item, 'polygone')[0];
        if (!p) return;
        const n = p.sommets.length;
        // Polygone convexe sans sommet en double.
        expect(new Set(p.sommets.map((s) => s.join(','))).size).toBe(n);
        if (/Combien de côtés/.test(item.consigne)) expect(item.reponse).toBe(String(n));
        else expect(item.reponse).toBe(NOMS[n]);
      });
    }
    partout('polygones-cm2', (item, d) => {
      if (d !== 2) return;
      const n = { 'un quadrilatère': 4, 'un pentagone': 5, 'un hexagone': 6 }[item.consigne.match(/a (un \p{L}+) \?/u)![1]!]!;
      const attendu = /diagonales/.test(item.consigne) ? (n * (n - 3)) / 2 : n;
      expect(item.reponse).toBe(String(attendu));
    });
  });

  it('droites-cm1 : perpendiculaires, parallèles ou sécantes d’après les droites dessinées', () => {
    partout('droites-cm1', (item, d) => {
      if (d === 1) {
        const [a, b] = de(item, 'droite');
        const u = [a!.a[0] - a!.de[0], a!.a[1] - a!.de[1]];
        const v = [b!.a[0] - b!.de[0], b!.a[1] - b!.de[1]];
        const n = Math.hypot(u[0]!, u[1]!) * Math.hypot(v[0]!, v[1]!);
        const cos = (u[0]! * v[0]! + u[1]! * v[1]!) / n;
        const sin = (u[0]! * v[1]! - u[1]! * v[0]!) / n;
        expect(item.reponse).toBe(Math.abs(cos) < 0.03 ? 'perpendiculaires' : Math.abs(sin) < 0.03 ? 'parallèles' : 'ni parallèles, ni perpendiculaires');
      }
      if (d === 3) {
        const [, , forme, c1, c2] = item.consigne.match(/(\w{4}) est un (rectangle|losange).*côtés \[(\w\w)\] et \[(\w\w)\]/u)! as unknown as string[];
        const nom = item.consigne.slice(0, 4);
        const rang = (x: string) => nom.indexOf(x);
        const cote = (s: string) => [rang(s[0]!), rang(s[1]!)].sort().join('');
        const opposes = new Set([cote(c1!), cote(c2!)]).size === 2 && cote(c1!).split('').every((x) => !cote(c2!).includes(x));
        expect(item.reponse).toBe(opposes ? 'parallèles' : forme === 'rectangle' ? 'perpendiculaires' : 'ni parallèles, ni perpendiculaires');
      }
    });
  });

  it('figures-cm1 : nature d’un triangle d’après ses côtés, phrases vraies', () => {
    partout('figures-cm1', (item, d) => {
      if (d === 1) {
        const cotes = nombres(item.consigne.split('.')[0]!);
        const egaux = new Set(cotes).size;
        const droit = /Il a un angle droit/.test(item.consigne);
        expect(item.reponse).toBe(egaux === 1 ? 'un triangle équilatéral' : egaux === 2 ? 'un triangle isocèle' : droit ? 'un triangle rectangle' : 'un triangle quelconque');
        // Inégalité triangulaire, et l'angle droit annoncé est vrai (réciproque de Pythagore).
        const [x, y, z] = [...cotes].sort((u, v) => u - v);
        expect(x! + y!).toBeGreaterThan(z!);
        expect(x! * x! + y! * y! === z! * z!).toBe(droit);
      }
      if (d === 3) {
        expect(PHRASES_VRAIES).toContain(item.reponse);
        for (const o of item.options!.filter((x) => x !== item.reponse)) expect(PHRASES_FAUSSES).toContain(o);
      }
    });
  });
});

describe('géométrie : symétrie', () => {
  it('axes de symétrie comptés sur la figure dessinée', () => {
    for (const id of ['symetrie-cm1', 'symetrie-cm2']) {
      partout(id, (item) => {
        if (!/axes de symétrie/.test(item.consigne)) return;
        const f = elements(item)[0]!;
        if (f.forme === 'cercle') expect(item.reponse).toBe('une infinité');
        else if (f.forme === 'polygone') expect(item.reponse).toBe(String(axes(f.sommets)));
      });
    }
  });

  it('symétrique d’une case : même distance de l’autre côté de l’axe', () => {
    for (const id of ['symetrie-cm1', 'symetrie-cm2']) {
      partout(id, (item) => {
        const c = de(item, 'case')[0];
        const axe = de(item, 'axe')[0];
        if (!c || !axe) return;
        const nom = (col: number, lig: number) => `${'ABCDEFGHIJ'[col]}${lig + 1}`;
        let attendu: string;
        if (axe.de[0] === axe.a[0]) attendu = nom(2 * axe.de[0] - 1 - c.colonne, c.ligne);
        else if (axe.de[1] === axe.a[1]) attendu = nom(c.colonne, 2 * axe.de[1] - 1 - c.ligne);
        else attendu = nom(c.ligne, c.colonne);
        expect(item.reponse).toBe(attendu);
        expect(item.consigne).toContain(nom(c.colonne, c.ligne));
      });
    }
  });
});

describe('géométrie : solides', () => {
  it('les 11 patrons du cube sont distincts et se plient ; les autres assemblages ne se plient pas', () => {
    expect(PATRONS_CUBE.every(plieEnCube)).toBe(true);
    expect(new Set(PATRONS_CUBE.map(canonique)).size).toBe(11);
    for (const p of NON_PATRONS) {
      expect(p).toHaveLength(6);
      expect(plieEnCube(p), JSON.stringify(p)).toBe(false);
    }
  });

  it('patron dessiné : réponse conforme au pliage', () => {
    for (const id of ['solides-cm1', 'solides-cm2']) {
      partout(id, (item) => {
        if (!/patron de cube/.test(item.consigne)) return;
        const cases = de(item, 'case').map((c): [number, number] => [c.colonne, c.ligne]);
        expect(item.reponse).toBe(plieEnCube(cases) ? 'Oui' : 'Non');
      });
    }
  });

  it('prismes droits : faces, sommets, arêtes ; faces d’un pavé ; aire du patron', () => {
    tous('solides-cm1', 2, (item) => {
      const n = { triangulaire: 3, carrée: 4, pentagonale: 5, hexagonale: 6 }[item.consigne.match(/base (\p{L}+)/u)![1]!]!;
      const quoi = /faces/.test(item.consigne) ? 'f' : /sommets/.test(item.consigne) ? 's' : 'a';
      const attendu = /pyramide/.test(item.consigne)
        ? { f: n + 1, s: n + 1, a: 2 * n }[quoi]
        : { f: n + 2, s: 2 * n, a: 3 * n }[quoi];
      expect(item.reponse).toBe(String(attendu));
    });
    tous('solides-cm2', 3, (item) => {
      const [l, m, p] = nombres(item.consigne);
      expect(val(item.reponse)).toBe(2 * (l! * m! + l! * p! + m! * p!));
    });
    tous('solides-cm2', 2, (item) => expect(item.reponse).toBe('2'));
  });
});

describe('géométrie : programmes de construction', () => {
  it('longueurs et figures obtenues', () => {
    partout('construction-cm2', (item) => {
      const n = nombres(item.consigne);
      if (/cercle de centre \w qui passe par/.test(item.consigne)) expect(val(item.reponse)).toBe(n[0]);
      else if (/Place le point \w sur ce segment/.test(item.consigne)) expect(val(item.reponse)).toBe(n[0]! - n[1]!);
      else if (/Trace un diamètre/.test(item.consigne)) expect(val(item.reponse)).toBe(2 * n[0]!);
      else if (/perpendiculaire/.test(item.consigne)) expect(item.reponse).toBe(item.consigne.match(/rectangle (\w{4})/)![1]![3]);
      else if (/diagonale/.test(item.consigne)) expect(item.reponse).toBe('deux triangles rectangles');
      else {
        const [ab, x, y] = n;
        expect(x).toBe(y);
        expect(ab).not.toBe(x);
        expect(ab!).toBeLessThan(2 * x!);
        expect(item.reponse).toBe('un triangle isocèle');
      }
    });
  });
});
