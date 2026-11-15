// Justesse des générateurs 6e (compléments : géométrie, volumes, données, probabilités).
// Chaque oracle recalcule la réponse depuis la consigne, avec ses propres règles.
import { describe, expect, it } from 'vitest';
import { generateur } from './index';
import { DIFFICULTES, GRAINES, partout, proche, val } from './oracles';
import { GENERATEURS_SIXIEME } from './sixieme';

/** Nombres d'une consigne, dans l'ordre : « 7,9 cm » → 7,9. */
const nombres = (s: string) => [...s.matchAll(/\d+(?:,\d+)?/g)].map((m) => val(m[0]));

describe('justesse 6e géométrie', () => {
  it('milieu : moitié, double, et milieu seulement sur le segment', () => {
    partout('milieu-6e', (item, d) => {
      const [x] = nombres(item.consigne.replace(/\[.+?\]/g, ''));
      if (d === 1) expect(proche(val(item.reponse), x! / 2)).toBe(true);
      else if (d === 2) expect(proche(val(item.reponse), 2 * x!)).toBe(true);
      else {
        const [l1, l2] = nombres(item.consigne.split('. ')[1]!);
        const surSegment = item.consigne.includes('est sur le segment');
        expect(item.reponse).toBe(surSegment && l1 === l2 ? 'Oui' : 'Non');
      }
    });
  });

  it('cercle : rayon et diamètre, vocabulaire, position d’un point', () => {
    const MOTS: [RegExp, string][] = [
      [/centre à un point/, 'un rayon'], [/en passant par le centre/, 'un diamètre'], [/deux points quelconques/, 'une corde'],
      [/même distance du centre/, 'un cercle'], [/inférieure ou égale/, 'un disque'],
    ];
    partout('cercle-6e', (item) => {
      const c = item.consigne;
      const n = nombres(c);
      if (/Calcule son diamètre|Calcule \w\w?N/.test(c) || /est un diamètre/.test(c)) expect(proche(val(item.reponse), 2 * n[n.length - 1]!), c).toBe(true);
      else if (/Calcule son rayon/.test(c)) expect(proche(val(item.reponse), n[0]! / 2)).toBe(true);
      else if (/est sur ce cercle/.test(c)) expect(proche(val(item.reponse), n[0]!)).toBe(true);
      else if (/Où est M/.test(c)) {
        const [r, dist] = n;
        expect(item.reponse).toBe(dist === r ? 'sur le cercle' : dist! < r! ? 'à l’intérieur du disque, pas sur le cercle' : 'à l’extérieur du disque');
      } else expect(item.reponse).toBe(MOTS.find(([re]) => re.test(c))![1]);
    });
  });

  it('médiatrice : équidistance aux extrémités', () => {
    partout('mediatrice-6e', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        expect(item.reponse).toMatch(/milieu|même distance/);
        expect(item.reponse).not.toMatch(/sans angle droit|seulement/);
      } else if (d === 2) expect(item.reponse).toBe(c.match(/= ([\d,]+) cm/)![1]);
      else {
        const [l1, l2] = nombres(c);
        expect(item.reponse).toBe(l1 === l2 ? 'Oui' : 'Non');
      }
      // Le point étudié n'est jamais une extrémité du segment.
      const point = c.match(/(?:Le point|est-il) (\w)/)?.[1];
      const segment = c.match(/\[(\w)(\w)\]/);
      if (point && segment) expect([segment[1], segment[2]]).not.toContain(point);
    });
  });

  it('angles : nature, supplémentaires, opposés par le sommet, adjacents', () => {
    partout('angles-6e', (item, d) => {
      const x = nombres(item.consigne)[0]!;
      if (d === 1) {
        const nature = x === 0 ? 'nul' : x < 90 ? 'aigu' : x === 90 ? 'droit' : x < 180 ? 'obtus' : x === 180 ? 'plat' : 'plein';
        expect(item.reponse).toBe(`un angle ${nature}`);
      } else if (item.consigne.includes('opposé par le sommet')) expect(Number(item.reponse)).toBe(x);
      else expect(Number(item.reponse) + x).toBe(180);
    });
  });

  it('bissectrice : moitié de l’angle', () => {
    partout('bissectrice-6e', (item, d) => {
      const [x] = nombres(item.consigne);
      if (d === 1) expect(Number(item.reponse) * 2).toBe(x);
      else if (d === 2) expect(Number(item.reponse)).toBe(2 * x!);
      else expect(Number(item.reponse) * 2 + x!).toBe(180);
    });
  });

  it('triangles : somme 180°, triangles particuliers, inégalité triangulaire', () => {
    partout('triangles-angles-6e', (item, d) => {
      const n = nombres(item.consigne);
      if (d === 1) expect(Number(item.reponse) + n[0]! + n[1]!).toBe(180);
      else if (d === 2) {
        const c = item.consigne;
        if (c.includes('rectangle')) expect(Number(item.reponse) + 90 + n[0]!).toBe(180);
        else if (c.includes('L’angle B mesure')) expect(Number(item.reponse) + 2 * n[0]!).toBe(180);
        else expect(2 * Number(item.reponse) + n[0]!).toBe(180);
      } else {
        const [a, b, c] = n.sort((x, y) => x - y);
        expect(item.reponse).toBe(c! < a! + b! ? 'Oui' : 'Non');
      }
    });
  });

  it('symétrie axiale : axes, conservation, distance à l’axe', () => {
    const AXES: Record<string, string> = {
      'un carré': '4', 'un rectangle (non carré)': '2', 'un triangle équilatéral': '3', 'un triangle isocèle (non équilatéral)': '1',
      'un losange (non carré)': '2', 'un triangle quelconque': '0', 'un cercle': 'une infinité',
    };
    partout('symetrie-6e', (item, d) => {
      const c = item.consigne;
      if (d === 1) expect(item.reponse).toBe(AXES[c.match(/a (.+) \?/)![1]!]);
      else if (d === 2) expect(item.reponse).toBe(c.match(/(\d+(?:,\d+)?)(?: cm|°)/)![1]);
      else {
        const x = nombres(c.replace(/A′|\(d\)/g, ''))[0]!;
        expect(proche(val(item.reponse), c.includes('Calcule AA′') ? 2 * x : x / 2), c).toBe(true);
      }
    });
  });
});

describe('justesse 6e volumes et espace', () => {
  it('volumes : produit des dimensions de l’assemblage', () => {
    partout('volumes-6e', (item, d) => {
      const n = nombres(item.consigne.replace(/1 cm³/g, ''));
      if (d === 1) expect(Number(item.reponse)).toBe(n[0]! * n[1]!);
      else if (d === 2) expect(Number(item.reponse)).toBe(n[0]! * n[1]! * n[2]!);
      else {
        const va = n[0]! * n[1]! * n[2]!;
        const vb = n[3]! * n[4]! * n[5]!;
        expect(item.reponse).toBe(va === vb ? 'Ils ont le même volume' : va > vb ? 'Le pavé A' : 'Le pavé B');
      }
    });
  });

  it('solides : description, faces, arêtes, sommets (Euler), assemblages', () => {
    partout('solides-6e', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const attendu = /triangulaires identiques et trois|hexagonales/.test(c) ? 'un prisme droit' : /deux bases en forme de disque/.test(c) ? 'un cylindre'
          : /une base en forme de disque/.test(c) ? 'un cône' : /six faces carrées/.test(c) ? 'un cube' : /base carrée et quatre/.test(c) ? 'une pyramide'
            : /aucune face plane/.test(c) ? 'une boule' : 'un pavé droit';
        expect(item.reponse).toBe(attendu);
        // Jamais deux réponses justes : cube, pavé droit et prisme droit s'emboitent.
        const famille = ['un cube', 'un pavé droit', 'un prisme droit'];
        if (famille.includes(item.reponse)) expect(item.options!.filter((o) => famille.includes(o))).toEqual([item.reponse]);
      } else if (d === 2) {
        // Base à n côtés : prisme (n + 2 faces, 3n arêtes, 2n sommets), pyramide (n + 1, 2n, n + 1).
        const cotes = /triangulaire/.test(c) ? 3 : /hexagonale/.test(c) ? 6 : 4;
        const prisme = /prisme|cube|pavé/.test(c);
        const val3 = prisme ? { faces: cotes + 2, arêtes: 3 * cotes, sommets: 2 * cotes } : { faces: cotes + 1, arêtes: 2 * cotes, sommets: cotes + 1 };
        const element = c.match(/Combien (?:de |d’)(\p{L}+)/u)![1] as keyof typeof val3;
        expect(Number(item.reponse), c).toBe(val3[element]);
        expect(val3.faces + val3.sommets - val3.arêtes).toBe(2);
      } else {
        const n = nombres(c);
        expect(Number(item.reponse)).toBe(c.includes('Combien en manque') ? n[0]! ** 3 - n[1]! : n[0]! ** 3);
      }
    });
  });
});

describe('justesse 6e données et probabilités', () => {
  it('données : maximum, minimum, filtre, diagramme circulaire', () => {
    const PARTS: Record<string, number> = { 'la moitié': 2, 'le quart': 4, 'le tiers': 3, 'le cinquième': 5, 'le dixième': 10 };
    partout('donnees-6e', (item, d) => {
      const c = item.consigne;
      if (d === 3) {
        const total = nombres(c)[0]!;
        const part = Object.keys(PARTS).find((p) => c.includes(`occupe ${p}`))!;
        expect(Number(item.reponse) * PARTS[part]!).toBe(total);
        return;
      }
      const paires = [...c.matchAll(/(\p{L}+) : (\d+)/gu)].map((m) => [m[1]!, Number(m[2])] as const);
      expect(paires).toHaveLength(5);
      if (d === 1) {
        const valeurs = paires.map((p) => p[1]);
        const cible = /plus (chaud|plu|de|d’)/.test(c.split('. ').at(-1)!) && !/moins/.test(c.split('. ').at(-1)!) ? Math.max(...valeurs) : Math.min(...valeurs);
        expect(item.reponse).toBe(paires.find((p) => p[1] === cible)![0]);
      } else {
        const seuil = nombres(c.split('. ').at(-1)!)[0]!;
        expect(Number(item.reponse)).toBe(paires.filter((p) => p[1] > seuil).length);
      }
    });
  });

  it('probabilités : écriture décimale, urne, valeurs impossibles, fréquence', () => {
    partout('probabilites-6e', (item, d) => {
      const c = item.consigne;
      const n = nombres(c);
      if (d === 1) expect(proche(val(item.reponse), n[0]! / n[1]!)).toBe(true);
      else if (d === 2) expect(proche(val(item.reponse), n[0]! / (n[0]! + n[1]!))).toBe(true);
      else if (c.startsWith('Lequel')) expect(item.options!.filter((o) => val(o) < 0 || val(o) > 1)).toEqual([item.reponse]);
      else expect(proche(val(item.reponse), n[1]! / n[0]!)).toBe(true);
    });
  });
});

describe('variété 6e (compléments)', () => {
  // Domaines fermés : peu de consignes possibles, la variété vient des valeurs ou des options.
  const FERMES: Record<string, number> = { 'mediatrice-6e': 3, 'symetrie-6e': 7, 'solides-6e': 8 };
  it.each(GENERATEURS_SIXIEME.map((g) => g.id))('%s : assez de consignes distinctes, d1 différente de d3', (id) => {
    const consignes = DIFFICULTES.map((d) => new Set(GRAINES.map((s) => generateur(id).generer(s, d).consigne)));
    for (const ens of consignes) expect(ens.size).toBeGreaterThanOrEqual(FERMES[id] ?? 25);
    expect([...consignes[0]!].some((x) => !consignes[2]!.has(x))).toBe(true);
  });
});
