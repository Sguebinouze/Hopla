// Justesse des générateurs du CM1 : chaque oracle recalcule la réponse à partir de la consigne,
// sans réutiliser la logique ni les listes des générateurs.
import { describe, expect, it } from 'vitest';
import { enLettres } from './lettres';
import { GENERATEURS_CM1 } from './cm1';
import { serie } from './index';
import { DIFFICULTES, GRAINES, calculJuste, calculer, egaliteVraie, partout, proche, val } from './oracles';
import type { Item } from './types';

/** Nombres écrits à la française dans un texte : « 1 234 », « 6,40 ». */
const nombres = (s: string): number[] => (s.match(/\d+(?:[  ]\d{3})*(?:,\d+)?/g) ?? []).map(val);
const decimales = (s: string) => s.replace(/\s/g, '').split(',')[1]?.length ?? 0;
const centimes = (x: number) => Math.round(x * 100);
/** Fraction « p/q » ou entier « n » → [numérateur, dénominateur]. */
const rationnel = (s: string): [number, number] => {
  const [p, q] = s.trim().split('/');
  return [Number(p), q ? Number(q) : 1];
};
const pgcd = (x: number, y: number): number => (y === 0 ? x : pgcd(y, x % y));
const denominateurs = (s: string) => [...s.matchAll(/\d+\/(\d+)/g)].map((m) => Number(m[1]));

// ───────────────────────── Nombres entiers

describe('justesse CM1 : nombres entiers', () => {
  const PUISSANCE: Record<string, number> = {
    unité: 1, dizaine: 10, centaine: 100, millier: 1000, 'dizaine de millier': 10000, 'centaine de millier': 100000,
  };
  const singulier = (s: string) => s.split(' ').map((m) => m.replace(/s$/, '')).join(' ');

  it('valeur des chiffres, décomposition, nombre de dizaines ou de centaines', () => {
    partout('valeur-chiffres-cm1', (item) => {
      const c = item.consigne;
      const chiffre = c.match(/^Quel est le chiffre des (.+) dans (.+) \?$/);
      const tout = c.match(/^Combien y a-t-il de (.+) en tout dans (.+) \?$/);
      if (chiffre) {
        const p = PUISSANCE[singulier(chiffre[1]!)]!;
        expect(Number(item.reponse), c).toBe(Math.floor(val(chiffre[2]!) / p) % 10);
      } else if (tout) {
        expect(Number(item.reponse), c).toBe(Math.floor(val(tout[2]!) / PUISSANCE[singulier(tout[1]!)]!));
      } else {
        const termes = c.replace(/^Écris en chiffres : /, '').replace(/\.$/, '').split(' + ');
        const total = termes.reduce((s, t) => {
          const [, n, rang] = t.match(/^(\d+) (.+)$/)!;
          return s + Number(n) * PUISSANCE[singulier(rang!)]!;
        }, 0);
        expect(Number(item.reponse), c).toBe(total);
      }
      expect(Number(item.reponse)).toBeLessThanOrEqual(999999);
    });
  });

  it('écriture en lettres : valeurs de référence jusqu’à 999 999', () => {
    const ref: Record<number, string> = {
      204080: 'deux-cent-quatre-mille-quatre-vingts', 80200: 'quatre-vingt-mille-deux-cents', 71091: 'soixante-et-onze-mille-quatre-vingt-onze',
      300001: 'trois-cent-mille-un', 999999: 'neuf-cent-quatre-vingt-dix-neuf-mille-neuf-cent-quatre-vingt-dix-neuf', 21021: 'vingt-et-un-mille-vingt-et-un',
    };
    for (const [n, l] of Object.entries(ref)) expect(enLettres(Number(n))).toBe(l);
  });

  it('nombres en lettres : chiffres et lettres concordent', () => {
    partout('nombres-lettres-cm1', (item, d) => {
      if (d < 3) {
        const lettres = item.consigne.match(/^Écris en chiffres : (.+)\.$/)![1]!;
        expect(enLettres(Number(item.reponse))).toBe(lettres);
      } else {
        const n = val(item.consigne.match(/s’écrit (.+) en lettres/)![1]!);
        expect(item.reponse).toBe(enLettres(n));
        expect(item.options!.filter((o) => o === enLettres(n))).toHaveLength(1);
      }
      expect(Number(item.reponse) || 0).toBeLessThanOrEqual(999999);
    });
  });

  it('comparer, ranger, intercaler', () => {
    partout('comparer-entiers-cm1', (item) => {
      const c = item.consigne;
      if (c.startsWith('Complète')) {
        const [x, y] = c.split(': ')[1]!.split(' … ').map(val);
        expect(item.reponse, c).toBe(x! < y! ? '<' : x! > y! ? '>' : '=');
      } else if (c.includes('compris entre')) {
        const [bas, haut] = nombres(c);
        const dedans = item.options!.filter((o) => val(o) > bas! && val(o) < haut!);
        expect(dedans, c).toEqual([item.reponse]);
      } else {
        const v = item.options!.map(val);
        expect(val(item.reponse)).toBe(c.includes('grand') ? Math.max(...v) : Math.min(...v));
      }
    });
  });

  it('multiples et diviseurs : une seule option convient', () => {
    partout('multiples-cm1', (item, d) => {
      const [k] = nombres(item.consigne);
      const v = item.options!.map(val);
      const bons = item.consigne.includes('multiple') ? v.filter((x) => x % k! === 0) : v.filter((x) => k! % x === 0);
      expect(bons, item.consigne).toEqual([val(item.reponse)]);
      if (d === 1) expect([2, 5, 10]).toContain(k);
      if (d === 3) for (const x of v) expect(x).toBeLessThanOrEqual(10);
      else expect(k).toBeLessThanOrEqual(10);
    });
  });
});

// ───────────────────────── Fractions

describe('justesse CM1 : fractions', () => {
  it('fractions supérieures à 1 : encadrement et décomposition', () => {
    partout('fractions-entiers-cm1', (item) => {
      const c = item.consigne;
      if (c.startsWith('Entre')) {
        const [p, q] = rationnel(c.match(/(\d+\/\d+)/)![1]!);
        expect(p % q, c).not.toBe(0);
        const e = Math.floor(p / q);
        expect(item.reponse).toBe(`entre ${e} et ${e + 1}`);
        const justes = item.options!.filter((o) => {
          const [a, b] = nombres(o);
          return b === a! + 1 && a! * q < p && p < b * q;
        });
        expect(justes).toEqual([item.reponse]);
      } else egaliteVraie(item);
      for (const den of denominateurs(c)) expect(den).toBeLessThanOrEqual(20);
    });
  });

  it('comparer des fractions (produits en croix exacts)', () => {
    partout('comparer-fractions-cm1', (item) => {
      const [g, dr] = item.consigne.split(': ')[1]!.split(' … ');
      const [a, b] = rationnel(g!);
      const [x, y] = rationnel(dr!);
      expect(item.reponse, item.consigne).toBe(a * y < x * b ? '<' : a * y > x * b ? '>' : '=');
      for (const den of denominateurs(item.consigne)) expect(den).toBeLessThanOrEqual(20);
    });
  });

  it('additionner et soustraire : résultat exact, non simplifiable, même dénominateur', () => {
    partout('additionner-fractions-cm1', (item) => {
      calculJuste(item);
      const [p, q] = rationnel(item.reponse);
      expect(pgcd(p, q)).toBe(1);
      expect(p % q).not.toBe(0);
      expect(denominateurs(item.consigne).every((den) => den === q && den <= 20), item.consigne).toBe(true);
    });
  });

  it('fraction unitaire d’une quantité', () => {
    const MOTS: Record<string, number> = { 'la moitié': 2, 'le tiers': 3, 'le quart': 4 };
    partout('fraction-quantite-cm1', (item) => {
      const c = item.consigne;
      const mot = Object.keys(MOTS).find((m) => c.includes(m));
      const k = mot ? MOTS[mot]! : Number(c.match(/1\/(\d+)/)![1]);
      const n = val(c.match(/(?:de|mesure|contient) (\d+(?:[  ]\d{3})*)/)![1]!);
      expect(Number(item.reponse) * k, c).toBe(n);
      expect(k).toBeLessThanOrEqual(20);
    });
  });
});

// ───────────────────────── Nombres décimaux (au plus deux décimales)

describe('justesse CM1 : nombres décimaux', () => {
  it('fractions décimales et écriture à virgule', () => {
    partout('fractions-decimales-cm1', (item) => {
      const ecrire = item.consigne.match(/^Écris sous forme décimale : (.+)$/);
      if (ecrire) expect(proche(calculer(ecrire[1]!), val(item.reponse)), item.consigne).toBe(true);
      else egaliteVraie(item);
      for (const den of denominateurs(item.consigne)) expect([10, 100]).toContain(den);
      expect(decimales(item.reponse)).toBeLessThanOrEqual(2);
    });
  });

  it('comparer, ranger, intercaler des décimaux', () => {
    partout('comparer-decimaux-cm1', (item) => {
      const c = item.consigne;
      if (c.startsWith('Complète')) {
        const [x, y] = c.split(': ')[1]!.split(' … ').map((s) => centimes(val(s)));
        expect(item.reponse, c).toBe(x! < y! ? '<' : x! > y! ? '>' : '=');
      } else if (c.includes('compris entre')) {
        const [bas, haut] = nombres(c).map(centimes);
        expect(item.options!.filter((o) => centimes(val(o)) > bas! && centimes(val(o)) < haut!), c).toEqual([item.reponse]);
      } else {
        const v = item.options!.map(val);
        expect(val(item.reponse)).toBe(c.includes('grand') ? Math.max(...v) : Math.min(...v));
      }
      for (const n of [c, ...(item.options ?? [])].join(' ').match(/\d+,\d+/g) ?? []) expect(decimales(n)).toBeLessThanOrEqual(2);
    });
  });

  it('partie entière et arrondi à l’unité', () => {
    partout('arrondi-cm1', (item) => {
      const x = item.consigne.match(/de (.+)\.$/)![1]!;
      const h = centimes(val(x));
      const attendu = item.consigne.includes('partie entière') ? Math.floor(h / 100) : Math.floor((h + 50) / 100);
      expect(Number(item.reponse), item.consigne).toBe(attendu);
      expect(decimales(x)).toBeLessThanOrEqual(2);
    });
  });
});

// ───────────────────────── Calcul et opérations

describe('justesse CM1 : calcul', () => {
  it('procédures de calcul mental', () => {
    partout('procedures-calcul-cm1', (item, d) => {
      calculJuste(item);
      if (d === 1) expect([8, 9, 18, 19, 28, 29, 38, 39]).toContain(nombres(item.consigne)[1]);
      if (d === 2) expect([4, 5, 8]).toContain(nombres(item.consigne)[1]);
    });
  });

  it('calculer avec la numération : décimaux aux centièmes au plus', () => {
    partout('numeration-calcul-cm1', (item, d) => {
      calculJuste(item);
      expect(decimales(item.reponse)).toBeLessThanOrEqual(2);
      if (d === 2) expect(item.consigne).toMatch(/[×÷] 10$/);
      if (d === 3) {
        // Sans retenue : un seul chiffre diffère entre le nombre de départ et le résultat.
        const [x] = item.consigne.replace('Calcule : ', '').split(/ [+−] /);
        const a = String(centimes(val(x!))).padStart(7, '0');
        const b = String(centimes(val(item.reponse))).padStart(7, '0');
        expect([...a].filter((ch, i) => ch !== b[i]), item.consigne).toHaveLength(1);
      }
    });
  });

  it('additions et soustractions de décimaux', () => {
    partout('addition-decimaux-cm1', (item) => {
      calculJuste(item);
      for (const n of item.consigne.match(/\d+,\d+/g) ?? []) expect(decimales(n)).toBeLessThanOrEqual(2);
      expect(val(item.reponse)).toBeGreaterThan(0);
    });
  });

  it('multiplications posées', () => {
    partout('multiplications-cm1', (item, d) => {
      calculJuste(item);
      if (d === 3) expect(nombres(item.consigne)[1]).toBeLessThan(10);
    });
  });

  it('division euclidienne par un diviseur à un chiffre', () => {
    partout('division-cm1', (item) => {
      const [n, b] = nombres(item.consigne);
      expect(b).toBeLessThan(10);
      const quotient = /quotient|pleine|plein/.test(item.consigne);
      expect(Number(item.reponse), item.consigne).toBe(quotient ? Math.floor(n! / b!) : n! % b!);
    });
  });

  it('égalités à trous', () => {
    partout('egalites-trous-cm1', (item) => {
      egaliteVraie(item);
      expect(Number.isInteger(Number(item.reponse)) && Number(item.reponse) >= 0).toBe(true);
    });
  });
});

// ───────────────────────── Problèmes et proportionnalité

describe('justesse CM1 : problèmes', () => {
  it('problèmes en plusieurs étapes', () => {
    partout('problemes-etapes-cm1', (item) => {
      const c = item.consigne;
      const n = nombres(c).map(centimes);
      let attendu: number;
      if (c.includes('adhérents')) attendu = n[0]! + n[1]! - n[2]!;
      else if (c.includes('camion')) attendu = n[0]! - n[1]! - n[2]! - n[3]!;
      else if (c.includes('cahiers')) attendu = n[3]! - (n[0]! / 100) * n[1]! - n[2]!;
      else if (c.includes('théâtre')) attendu = (n[0]! / 100) * n[1]! - n[2]!;
      else if (c.includes('magazine')) attendu = n[3]! - (n[0]! / 100) * n[1]! - n[2]!;
      else attendu = n[1]! + (n[0]! / 100) * n[2]!;
      expect(centimes(val(item.reponse)), c).toBe(attendu);
      expect(attendu).toBeGreaterThan(0);
    });
  });

  it('comparaison multiplicative', () => {
    partout('comparaison-multiplicative-cm1', (item) => {
      const c = item.consigne;
      const [x, y] = nombres(c);
      let attendu: number;
      if (c.includes('Combien de fois')) attendu = x! / y!;
      else if (/C’est \d+ fois plus qu/.test(c)) attendu = x! / y!;
      else if (/C’est \d+ fois moins qu/.test(c)) attendu = x! * y!;
      else if (/en a \d+ fois plus/.test(c)) attendu = x! * y!;
      else attendu = x! / y!;
      expect(Number(item.reponse), c).toBe(attendu);
      expect(Number.isInteger(attendu)).toBe(true);
    });
  });

  it('proportionnalité : la réponse respecte le rapport donné', () => {
    partout('proportionnalite-cm1', (item) => {
      const n = nombres(item.consigne);
      const [q1, v1] = n;
      if (n.length === 5) expect(proche(n[3]! / n[2]!, v1! / q1!), item.consigne).toBe(true);
      expect(proche(Number(item.reponse), (v1! / q1!) * n[n.length - 1]!), item.consigne).toBe(true);
      expect(n[n.length - 1]).toBeGreaterThan(1);
    });
  });
});

// ───────────────────────── Grandeurs et mesures

describe('justesse CM1 : grandeurs', () => {
  const EXPOSANTS: Record<string, Record<string, number>> = {
    'longueurs-cm1': { mm: -3, cm: -2, dm: -1, m: 0, dam: 1, hm: 2, km: 3 },
    'masses-cm1': { mg: -3, cg: -2, dg: -1, g: 0, dag: 1, hg: 2, kg: 3, t: 6 },
    'contenances-cm1': { mL: -3, cL: -2, dL: -1, L: 0, daL: 1, hL: 2 },
  };
  it('conversions : relations entre unités, deux décimales au plus', () => {
    for (const [id, exp] of Object.entries(EXPOSANTS)) {
      partout(id, (item) => {
        const [, x, de, vers] = item.consigne.match(/^Convertis (.+) (\S+) en (\S+)\.$/)!;
        expect(de! in exp && vers! in exp, item.consigne).toBe(true);
        expect(proche(val(item.reponse), val(x!) * 10 ** (exp[de!]! - exp[vers!]!)), item.consigne).toBe(true);
        expect(decimales(item.reponse)).toBeLessThanOrEqual(2);
        expect(decimales(x!)).toBeLessThanOrEqual(2);
      });
    }
  });

  it('périmètre d’un polygone', () => {
    partout('perimetre-cm1', (item) => {
      const c = item.consigne;
      const n = nombres(c);
      let attendu: number;
      if (c.includes('un périmètre de')) attendu = c.includes('carré') ? n[0]! / 4 : n[0]! - n[1]! - n[2]!;
      else if (c.includes('carré')) attendu = 4 * n[0]!;
      else if (c.includes('rectangle')) attendu = 2 * (n[0]! + n[1]!);
      else attendu = n.reduce((s, x) => s + x, 0);
      expect(Number(item.reponse), c).toBe(attendu);
      if (c.includes('triangle a un périmètre')) {
        const [x, y, z] = [n[1]!, n[2]!, attendu];
        expect(x < y + z && y < x + z && z < x + y, c).toBe(true);
      }
    });
  });

  it('aires par pavage et comparaison', () => {
    partout('aires-cm1', (item) => {
      const c = item.consigne;
      const n = nombres(c);
      if (c.includes('figure A')) {
        const [a, b] = [n[0]! * n[1]!, n[2]! * n[3]!];
        expect(item.reponse, c).toBe(a === b ? 'les deux ont la même aire' : a > b ? 'la figure A' : 'la figure B');
      } else if (c.includes('demi-carreaux')) expect(Number(item.reponse), c).toBe(n[0]! + n[1]! / 2);
      else if (c.includes('deux rectangles')) expect(Number(item.reponse), c).toBe(n[0]! * n[1]! + n[2]! * n[3]!);
      else expect(Number(item.reponse), c).toBe(n[0]! * n[1]!);
    });
  });

  it('heures et minutes', () => {
    const duree = (s: string) => {
      const h = s.match(/(\d+) h/);
      const m = s.match(/(\d+) min/) ?? s.match(/h (\d+)$/);
      return (h ? Number(h[1]) * 60 : 0) + (m ? Number(m[1]) : 0);
    };
    const horaire = (s: string) => {
      const [, h, m] = s.match(/(\d+) h (\d+)/)!;
      return Number(h) * 60 + Number(m);
    };
    partout('durees-cm1', (item) => {
      const c = item.consigne;
      if (c.startsWith('Convertis')) expect(Number(item.reponse)).toBe(duree(c.match(/Convertis (.+) en minutes/)![1]!));
      else if (c.includes('minutes en heures')) {
        expect(duree(item.reponse)).toBe(Number(c.match(/(\d+) minutes/)![1]));
        expect(item.reponse).toMatch(/^(\d+ h)?( ?[1-5]?\d min)?$/);
      } else if (c.includes('commence')) {
        const [debut, fin] = [...c.matchAll(/(\d+ h \d+)/g)].map((m) => horaire(m[1]!));
        expect(duree(item.reponse), c).toBe(fin! - debut!);
      } else {
        const debut = horaire(c.match(/part à (\d+ h \d+)/)![1]!);
        const [marche, bus] = [...c.matchAll(/(\d+) min/g)].map((m) => Number(m[1]));
        expect(horaire(item.reponse), c).toBe(debut + marche! + bus!);
        expect(item.reponse).toMatch(/^\d+ h [0-5]\d$/);
      }
    });
  });
});

// ───────────────────────── Français

/** Conjugaison de référence, écrite indépendamment du générateur. */
const PRESENT_3E: Record<string, string[]> = {
  être: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'], avoir: ['ai', 'as', 'a', 'avons', 'avez', 'ont'],
  faire: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'], aller: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'],
  dire: ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'], venir: ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'],
  pouvoir: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'], voir: ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'],
  vouloir: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'], prendre: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'],
};
const IMPARFAIT_3E: Record<string, string> = {
  être: 'ét', avoir: 'av', faire: 'fais', aller: 'all', dire: 'dis', venir: 'ven', pouvoir: 'pouv', voir: 'voy', vouloir: 'voul', prendre: 'pren',
};
const FUTUR_3E: Record<string, string> = {
  être: 'ser', avoir: 'aur', faire: 'fer', aller: 'ir', dire: 'dir', venir: 'viendr', pouvoir: 'pourr', voir: 'verr', vouloir: 'voudr', prendre: 'prendr',
};
const PARTICIPES_3E: Record<string, string> = {
  être: 'été', avoir: 'eu', faire: 'fait', aller: 'allé', dire: 'dit', venir: 'venu', pouvoir: 'pu', voir: 'vu', vouloir: 'voulu', prendre: 'pris',
};
const TERMINAISONS = {
  imparfait: ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'],
  futur: ['ai', 'as', 'a', 'ons', 'ez', 'ont'],
  present1: ['e', 'es', 'e', 'ons', 'ez', 'ent'],
  present2: ['is', 'is', 'it', 'issons', 'issez', 'issent'],
};
const RANG: Record<string, number> = { 'j’': 0, je: 0, tu: 1, il: 2, elle: 2, nous: 3, vous: 4, ils: 5, elles: 5 };

function reference(inf: string, temps: string, r: number): string {
  if (PRESENT_3E[inf]) {
    if (temps === 'présent') return PRESENT_3E[inf]![r]!;
    return temps === 'imparfait' ? IMPARFAIT_3E[inf] + TERMINAISONS.imparfait[r]! : FUTUR_3E[inf] + TERMINAISONS.futur[r]!;
  }
  const rad = inf.slice(0, -2);
  if (inf.endsWith('ir')) {
    if (temps === 'présent') return rad + TERMINAISONS.present2[r];
    return temps === 'imparfait' ? `${rad}iss${TERMINAISONS.imparfait[r]}` : inf + TERMINAISONS.futur[r];
  }
  if (temps === 'futur') return inf + TERMINAISONS.futur[r];
  const fin = temps === 'présent' ? TERMINAISONS.present1[r]! : TERMINAISONS.imparfait[r]!;
  // Devant a ou o : manger → mangeons, lancer → lançons.
  let base = rad;
  if (/^[ao]/.test(fin) && base.endsWith('g')) base += 'e';
  if (/^[ao]/.test(fin) && base.endsWith('c')) base = `${base.slice(0, -1)}ç`;
  return base + fin;
}
const tempsDe = (c: string) => (c.includes('au présent') ? 'présent' : c.includes('à l’imparfait') ? 'imparfait' : 'futur');
const participeRef = (inf: string) => PARTICIPES_3E[inf] ?? (inf.endsWith('ir') ? `${inf.slice(0, -2)}i` : `${inf.slice(0, -2)}é`);

describe('justesse CM1 : conjugaison', () => {
  it('valeurs de référence', () => {
    expect(reference('manger', 'présent', 3)).toBe('mangeons');
    expect(reference('manger', 'imparfait', 0)).toBe('mangeais');
    expect(reference('manger', 'imparfait', 3)).toBe('mangions');
    expect(reference('commencer', 'présent', 3)).toBe('commençons');
    expect(reference('finir', 'imparfait', 5)).toBe('finissaient');
    expect(reference('venir', 'futur', 4)).toBe('viendrez');
  });

  it('présent, imparfait, futur', () => {
    partout('conjugaison-cm1', (item) => {
      const inf = item.consigne.match(/« (\p{L}+) »/u)![1]!;
      const pronom = item.consigne.match(/: (j’|\p{L}+) …$/u)![1]!;
      expect(item.reponse, item.consigne).toBe(reference(inf, tempsDe(item.consigne), RANG[pronom]!));
      // « je » s'élide devant une voyelle.
      if (RANG[pronom] === 0) expect(pronom === 'j’', item.consigne).toBe(/^[aeéèêiouh]/.test(item.reponse));
    });
  });

  it('passé composé : formation, négation, infinitif', () => {
    const AUX_AVOIR = ['ai', 'as', 'a', 'avons', 'avez', 'ont'];
    const AUX_ETRE = ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'];
    const INFINITIF_DE: Record<string, string> = Object.fromEntries(Object.entries(PARTICIPES_3E).map(([i, p]) => [p, i]));
    partout('passe-compose-cm1', (item) => {
      const c = item.consigne;
      if (c.includes('au passé composé')) {
        const inf = c.match(/« (\p{L}+) »/u)![1]!;
        const pronom = c.match(/: (j’|\p{L}+) …$/u)![1]!;
        const r = RANG[pronom]!;
        const etre = inf === 'aller' || inf === 'venir';
        const accord = etre ? (pronom.startsWith('elle') ? 'e' : '') + (r === 5 ? 's' : '') : '';
        expect(item.reponse, c).toBe(`${(etre ? AUX_ETRE : AUX_AVOIR)[r]} ${participeRef(inf)}${accord}`);
      } else if (c.startsWith('Écris à la forme négative')) {
        const phrase = c.replace('Écris à la forme négative : ', '');
        const m = phrase.match(/^(J’|\p{L}+ )(\p{L}+) (.+)\.$/u)!;
        const sujet = m[1] === 'J’' ? 'Je' : m[1]!.trim();
        expect(item.reponse, c).toBe(`${sujet} n’${m[2]} pas ${m[3]}.`);
      } else {
        const groupe = c.match(/« (.+) »/)![1]!.replace('j’', 'j’ ').split(' ');
        const pp = groupe[2]!;
        const attendu = INFINITIF_DE[pp] ?? (pp.endsWith('é') ? `${pp.slice(0, -1)}er` : `${pp.slice(0, -1)}ir`);
        expect(item.reponse, c).toBe(attendu);
      }
    });
  });
});

describe('justesse CM1 : orthographe grammaticale', () => {
  it('accord sujet-verbe : nom noyau, plusieurs noms, pronoms', () => {
    const DET_PLURIEL = ['les', 'des', 'mes', 'tes', 'ses', 'nos', 'vos', 'leurs', 'ces'];
    partout('accord-sujet-verbe-cm1', (item) => {
      const c = item.consigne;
      const inf = c.match(/« (\p{L}+) »/u)![1]!;
      const sujet = c.match(/ : (.+?) … /)![1]!;
      const premier = sujet.split(' ')[0]!.toLowerCase();
      let r: number;
      if (sujet.includes(' et ')) r = /\bmoi\b/.test(sujet) ? 3 : /\btoi\b/.test(sujet) ? 4 : 5;
      else if (premier in RANG) r = RANG[premier]!;
      else r = DET_PLURIEL.includes(premier) ? 5 : 2;
      expect(item.reponse, c).toBe(reference(inf, tempsDe(c), r));
    });
  });

  it('accords dans le groupe nominal', () => {
    const DET: Record<string, [string, string]> = { le: ['la', 'les'], un: ['une', 'des'], mon: ['ma', 'mes'], ce: ['cette', 'ces'], son: ['sa', 'ses'] };
    partout('accord-gn-cm1', (item) => {
      const [, cible, gn] = item.consigne.match(/^Écris au (pluriel|féminin pluriel|féminin) : (.+)$/)!;
      const feminin = cible!.startsWith('féminin');
      const pluriel = cible!.endsWith('pluriel');
      const [det, ...mots] = gn!.split(' ');
      const attendu = [pluriel ? DET[det!]![1] : DET[det!]![0], ...mots.map((m) => m + (feminin ? 'e' : '') + (pluriel ? 's' : ''))].join(' ');
      expect(item.reponse, item.consigne).toBe(attendu);
      expect(item.reponse.startsWith('des ') && ['petits', 'grands', 'jolis', 'petites', 'grandes', 'jolies'].includes(item.reponse.split(' ')[1]!)).toBe(false);
    });
  });

  it('participe passé avec être : accord avec le sujet', () => {
    // Genre et nombre annotés à la main pour chaque sujet (f : féminin, p : pluriel).
    const GENRE: Record<string, string> = {
      Léa: 'f', 'Mon oncle': '', 'Les filles': 'fp', 'Les garçons': 'p', 'Ma tante': 'f', Elles: 'fp', Ils: 'p', 'Tom et Léa': 'p',
      'Inès et Nora': 'fp', 'Le chat': '', 'Ma cousine': 'f', 'Mes cousines': 'fp', 'Paul et Hugo': 'p', 'Ma mère et mon père': 'p',
    };
    const PP: Record<string, string> = { partir: 'parti', sortir: 'sorti', venir: 'venu', descendre: 'descendu' };
    partout('participe-etre-cm1', (item) => {
      const [, inf, sujet, aux] = item.consigne.match(/« (\p{L}+) » : (.+) (est|sont) …/u)!;
      const g = GENRE[sujet!];
      expect(g, sujet).toBeDefined();
      expect(aux).toBe(g!.includes('p') ? 'sont' : 'est');
      const pp = PP[inf!] ?? `${inf!.slice(0, -2)}é`;
      expect(item.reponse, item.consigne).toBe(pp + (g!.includes('f') ? 'e' : '') + (g!.includes('p') ? 's' : ''));
    });
  });
});

describe('justesse CM1 : grammaire et vocabulaire', () => {
  it('nature des déterminants', () => {
    const LISTES: Record<string, string[]> = {
      'article défini': ['le', 'la', 'les', 'l’'],
      'article indéfini': ['un', 'une', 'des'],
      'déterminant possessif': ['mon', 'ton', 'son', 'ma', 'ta', 'sa', 'mes', 'tes', 'ses', 'notre', 'votre', 'leur', 'nos', 'vos', 'leurs'],
      'déterminant démonstratif': ['ce', 'cet', 'cette', 'ces'],
    };
    partout('determinants-cm1', (item, d) => {
      const [, phrase, mot] = item.consigne.match(/« (.+) », quelle est la nature du déterminant « (.+) » \?/)!;
      expect(phrase!.split(/[ .]/)).toContain(mot);
      const nature = Object.keys(LISTES).find((n) => LISTES[n]!.includes(mot!.toLowerCase()));
      expect(item.reponse, item.consigne).toBe(nature);
      if (d === 1) expect(nature!.startsWith('article')).toBe(true);
      if (d === 2) expect(nature!.startsWith('déterminant')).toBe(true);
    });
  });

  it('remplacer par un pronom personnel', () => {
    const FILLES = ['Léa', 'Inès', 'Nora', 'Jade', 'Lina', 'Rose'];
    const GARCONS = ['Tom', 'Hugo', 'Sami', 'Paul', 'Léo'];
    const FEM = ['la', 'ma', 'ta', 'sa', 'cette', 'une'];
    const MASC = ['le', 'mon', 'ton', 'son', 'ce', 'un'];
    const NOMS_FEMININS_PLURIELS = ['filles', 'cousines', 'poules', 'fleurs', 'vaches', 'sœurs', 'feuilles'];
    const genre = (gn: string): 'f' | 'm' => {
      const [premier, nom] = gn.split(' ');
      if (FILLES.includes(premier!)) return 'f';
      if (GARCONS.includes(premier!)) return 'm';
      const det = premier!.toLowerCase();
      if (FEM.includes(det)) return 'f';
      if (MASC.includes(det)) return 'm';
      return NOMS_FEMININS_PLURIELS.includes(nom!) ? 'f' : 'm';
    };
    partout('pronoms-cm1', (item) => {
      const c = item.consigne;
      const sujet = c.match(/^Par quel pronom peux-tu remplacer « (.+?) » dans/);
      if (sujet) {
        const gn = sujet[1]!;
        let attendu: string;
        if (gn.includes(' et ')) {
          const parties = gn.split(' et ');
          if (parties.some((p) => p.toLowerCase() === 'moi')) attendu = 'nous';
          else if (parties.some((p) => p.toLowerCase() === 'toi')) attendu = 'vous';
          else attendu = parties.every((p) => genre(p) === 'f') ? 'elles' : 'ils';
        } else {
          const pluriel = ['les', 'mes', 'tes', 'ses', 'ces', 'des', 'leurs'].includes(gn.split(' ')[0]!.toLowerCase());
          attendu = genre(gn) === 'f' ? (pluriel ? 'elles' : 'elle') : pluriel ? 'ils' : 'il';
        }
        expect(item.reponse, c).toBe(attendu);
      } else {
        const [, gn, phrase] = c.match(/^Remplace « (.+) » par un pronom dans « (.+)\. »$/)!;
        const reste = phrase!.replace(` ${gn}`, '').split(' ');
        const verbe = reste.pop();
        const qui = reste.join(' ');
        const det = gn!.split(' ')[0]!;
        const pronom = ['les', 'ses', 'ces', 'mes', 'leurs'].includes(det) ? 'les' : FEM.includes(det) ? 'la' : 'le';
        expect(item.reponse, c).toBe(`${qui} ${pronom} ${verbe}.`);
      }
    });
  });

  it('fonctions : sujet, complément d’objet (COD, COI), complément circonstanciel', () => {
    const CC = /^(après|avant|dans|ce matin|ce soir|pendant|chaque|sous|en |depuis|avec|sans|hier|sur|près|tous les|toute la|le dimanche|le samedi)/i;
    partout('complements-cm1', (item, d) => {
      const [, phrase, groupe] = item.consigne.match(/^Dans « (.+) », quelle est la fonction du groupe « (.+) » \?$/)!;
      let attendu: string;
      if (phrase!.startsWith(`${groupe},`) || CC.test(groupe!)) attendu = 'complément circonstanciel';
      else if (phrase!.replace(/^[^,]+, /, '').startsWith(`${groupe} `)) attendu = 'sujet';
      else if (d === 3) attendu = /^(à|au|aux|de|du|des|d’)\s/.test(groupe!) ? 'COI' : 'COD';
      else attendu = 'complément d’objet';
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('synonymes et antonymes', () => {
    // Couples de référence : [synonyme, antonyme].
    const REF: Record<string, [string, string]> = {
      content: ['heureux', 'triste'], beau: ['joli', 'laid'], facile: ['simple', 'difficile'], calme: ['tranquille', 'agité'],
      courageux: ['brave', 'peureux'], gentil: ['aimable', 'méchant'], riche: ['fortuné', 'pauvre'], propre: ['net', 'sale'],
      sombre: ['obscur', 'clair'], large: ['vaste', 'étroit'], fatigué: ['épuisé', 'reposé'], triste: ['malheureux', 'gai'],
      commencer: ['débuter', 'finir'], aimer: ['adorer', 'détester'], monter: ['grimper', 'descendre'], crier: ['hurler', 'chuchoter'],
      trouver: ['découvrir', 'perdre'], début: ['commencement', 'fin'], peur: ['frayeur', 'courage'], joie: ['bonheur', 'tristesse'],
      victoire: ['succès', 'défaite'], joyeux: ['gai', 'triste'], ancien: ['vieux', 'moderne'], bruyant: ['sonore', 'silencieux'],
      méchant: ['cruel', 'gentil'], solide: ['robuste', 'fragile'], drôle: ['amusant', 'ennuyeux'], donner: ['offrir', 'prendre'],
      finir: ['terminer', 'commencer'], construire: ['bâtir', 'détruire'], accepter: ['admettre', 'refuser'], entrer: ['pénétrer', 'sortir'],
      gagner: ['remporter', 'perdre'], cacher: ['dissimuler', 'montrer'], réparer: ['arranger', 'casser'], ami: ['camarade', 'ennemi'],
      courage: ['bravoure', 'lâcheté'], richesse: ['fortune', 'pauvreté'], paix: ['tranquillité', 'guerre'], question: ['interrogation', 'réponse'],
      colère: ['fureur', 'calme'], force: ['vigueur', 'faiblesse'], beauté: ['splendeur', 'laideur'],
    };
    expect(Object.keys(REF).length).toBeGreaterThanOrEqual(40);
    partout('synonymes-antonymes-cm1', (item: Item) => {
      const m = item.consigne.match(/(?:un (synonyme|antonyme)|a un sens (proche|contraire)) de « (.+) » \?/)!;
      const relation = m[1] ?? (m[2] === 'proche' ? 'synonyme' : 'antonyme');
      const mot = m[3];
      const [syn, ant] = REF[mot!]!;
      expect(item.reponse, item.consigne).toBe(relation === 'synonyme' ? syn : ant);
      expect(item.options).toContain(relation === 'synonyme' ? ant : syn);
    });
  });
});

// ───────────────────────── Qualité de la langue et variété

describe('CM1 : qualité des textes générés', () => {
  const PRENOMS = ['Léa', 'Tom', 'Nora', 'Hugo', 'Inès', 'Sami', 'Jade', 'Rose', 'Lina', 'Paul', 'Léo', 'Lucie', 'Maya', 'Elsa', 'Malo', 'Noé', 'Enzo'];
  const textes = (item: Item) => [item.consigne, item.indice, item.explication, ...(item.options ?? [])];
  // Passé composé (le trou « … » d'une consigne tient la place du participe) ou imparfait.
  const PASSE = /\b(ai|as|a|avons|avez|ont|suis|es|est|sommes|êtes|sont) (\p{L}+(é|i|u|is|it)(e|s|es)?(?!\p{L})|…)|\p{L}(ait|aient)(?!\p{L})/u;

  it('pas de majuscule après une virgule, sauf pour un prénom', () => {
    for (const g of GENERATEURS_CM1) {
      partout(g.id, (item) => {
        for (const t of textes(item)) {
          for (const m of t.matchAll(/, (\p{Lu}\p{L}*)/gu)) expect(PRENOMS, `${g.id} : ${t}`).toContain(m[1]);
        }
      });
    }
  });

  it('« hier » jamais avec un verbe au présent', () => {
    for (const g of GENERATEURS_CM1) {
      partout(g.id, (item) => {
        for (const t of textes(item)) {
          // Phrases citées entre guillemets, puis phrases du texte hors citations ; un groupe cité seul (« hier ») n'est pas une phrase.
          const citees = [...t.matchAll(/« ([^»]+) »/g)].map((m) => m[1]!);
          const phrases = [...citees, ...t.replace(/« [^»]+ »/g, '« »').split(/(?<=[.?!])\s/)];
          for (const phrase of phrases) {
            if (/\bhier\b/i.test(phrase) && phrase.split(' ').length >= 3) expect(phrase, `${g.id} : ${phrase}`).toMatch(PASSE);
          }
        }
      });
    }
  });

  it('élision devant un prénom à voyelle, orthographe de 1990 (« coute »)', () => {
    for (const g of GENERATEURS_CM1) {
      partout(g.id, (item) => {
        for (const t of textes(item)) {
          expect(t, `${g.id} : ${t}`).not.toMatch(/\b(que|de) [AEIOUYÉÈÊ]\p{Ll}/u);
          expect(t, `${g.id} : ${t}`).not.toMatch(/coût/);
        }
      });
    }
  });

  it('variété : au moins 25 consignes distinctes par difficulté, la difficulté 1 différente de la 3', () => {
    const corriges = ['complements-cm1', 'determinants-cm1', 'pronoms-cm1', 'synonymes-antonymes-cm1', 'comparaison-multiplicative-cm1', 'comparer-fractions-cm1'];
    for (const id of corriges) {
      const g = GENERATEURS_CM1.find((x) => x.id === id)!;
      const consignes = DIFFICULTES.map((d) => new Set(GRAINES.map((graine) => g.generer(graine, d).consigne)));
      for (const [i, c] of consignes.entries()) expect(c.size, `${id} difficulté ${i + 1}`).toBeGreaterThanOrEqual(25);
      expect([...consignes[0]!].some((c) => !consignes[2]!.has(c)), id).toBe(true);
      expect(serie(id, 10, 1000, 1).length).toBe(10);
    }
  });

  it('comparer des fractions : pas d’égalité évidente en difficulté 1 et 2', () => {
    for (const d of [1, 2] as const) {
      for (const graine of GRAINES) {
        const item = GENERATEURS_CM1.find((x) => x.id === 'comparer-fractions-cm1')!.generer(graine, d);
        const [g, dr] = item.consigne.split(': ')[1]!.split(' … ');
        const [a, b] = rationnel(g!);
        const [x, y] = rationnel(dr!);
        expect(a * y === x * b, item.consigne).toBe(false);
      }
    }
  });
});
