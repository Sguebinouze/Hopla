// Justesse des générateurs du CM2 : chaque oracle recalcule la réponse à partir de la consigne.
import { describe, expect, it } from 'vitest';
import { GENERATEURS_CM2 } from './cm2';
import { PHRASES_VERBES_CM2 } from './cm2-francais';
import { enLettres } from './index';
import { calculJuste, calculer, egaliteVraie, partout, proche, val } from './oracles';
import type { Item } from './types';

// ───────────────────────── Outils d'oracle propres au CM2

/** Tous les nombres d'une consigne, dans l'ordre (écriture française : « 1 225 », « 13,45 »). */
const NOMBRE = /\d{1,3}(?:[\s  ]\d{3})+(?:,\d+)?|\d+(?:,\d+)?/g;
const nombres = (s: string): number[] => (s.match(NOMBRE) ?? []).map(val);
/** Les nombres d'une consigne tels qu'ils sont écrits. */
const ecritures = (s: string): string[] => s.match(NOMBRE) ?? [];
const decimalesDe = (s: string) => s.split(',')[1]?.length ?? 0;

/** Lecture d'un nombre écrit en lettres (orthographe de 1990), indépendante de enLettres. */
const MOTS: Record<string, number> = {
  zéro: 0, un: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10, onze: 11, douze: 12,
  treize: 13, quatorze: 14, quinze: 15, seize: 16, vingt: 20, vingts: 20, trente: 30, quarante: 40, cinquante: 50, soixante: 60,
};
function lireLettres(texte: string): number {
  let total = 0;
  let groupe = 0;
  let precedent = '';
  for (const mot of texte.split('-')) {
    if (mot === 'et') continue;
    if (mot === 'cent' || mot === 'cents') groupe = (groupe || 1) * 100;
    else if (mot === 'mille') { total += (groupe || 1) * 1000; groupe = 0; }
    else if (mot === 'million' || mot === 'millions') { total += groupe * 1e6; groupe = 0; }
    else if (mot === 'milliard' || mot === 'milliards') { total += groupe * 1e9; groupe = 0; }
    else if ((mot === 'vingt' || mot === 'vingts') && precedent === 'quatre') groupe += 80 - 4;
    else if (mot in MOTS) groupe += MOTS[mot]!;
    else throw new Error(`Mot inconnu : ${mot} dans ${texte}`);
    precedent = mot;
  }
  return total + groupe;
}

/** Durée écrite « 1 h 5 min 20 s » ou instant « 14 h 05 min 20 s », en secondes. */
const secondes = (s: string) => {
  const h = s.match(/(\d+) h/);
  const m = s.match(/(\d+) min/);
  const sec = s.match(/(\d+) s\b/);
  return (h ? Number(h[1]) * 3600 : 0) + (m ? Number(m[1]) * 60 : 0) + (sec ? Number(sec[1]) : 0);
};

const signe = (x: number, y: number) => (proche(x, y) ? '=' : x < y ? '<' : '>');

/** L'unique option qui vérifie la propriété est la réponse. */
const seuleOption = (item: Item, ok: (o: string) => boolean) => {
  expect(item.options!.filter(ok), `${item.consigne} ${item.options}`).toEqual([item.reponse]);
};

// ───────────────────────── Mathématiques

describe('justesse CM2 : nombres entiers', () => {
  it('lecture en lettres (oracle) : valeurs de référence', () => {
    expect(lireLettres('deux-millions-trois-cent-mille')).toBe(2_300_000);
    expect(lireLettres('quatre-vingts-millions-quatre-vingt-mille-quatre-vingt-dix-neuf')).toBe(80_080_099);
    expect(lireLettres('sept-cent-vingt-et-un-millions-soixante-et-onze-mille-deux-cents')).toBe(721_071_200);
  });

  it('grands nombres en lettres', () => {
    partout('nombres-lettres-cm2', (item, d) => {
      if (d < 3) {
        const texte = item.consigne.match(/^Écris en chiffres : (.+)\.$/)![1]!;
        expect(Number(item.reponse), item.consigne).toBe(lireLettres(texte));
        expect(Number(item.reponse)).toBeLessThan(1e9);
      } else {
        const n = nombres(item.consigne)[0]!;
        expect(lireLettres(item.reponse), item.consigne).toBe(n);
        seuleOption(item, (o) => o === enLettres(n));
      }
    });
  });

  it('valeur des chiffres et unités de numération', () => {
    const RANGS: Record<string, number> = {
      unités: 1, dizaines: 10, centaines: 100, milliers: 1e3, 'dizaines de milliers': 1e4, 'centaines de milliers': 1e5,
      millions: 1e6, 'dizaines de millions': 1e7, 'centaines de millions': 1e8,
    };
    partout('valeur-chiffres-cm2', (item) => {
      const c = item.consigne;
      const chiffre = c.match(/chiffre des (.+) dans (.+) \?/);
      const combien = c.match(/Combien y a-t-il de (.+) en tout dans (.+) \?/);
      const forme = c.match(/formé de (.+) millions?, (.+) milliers? et (.+) unités?\./);
      if (chiffre) expect(Number(item.reponse), c).toBe(Math.floor(val(chiffre[2]!) / RANGS[chiffre[1]!]!) % 10);
      else if (combien) expect(Number(item.reponse), c).toBe(Math.floor(val(combien[2]!) / RANGS[combien[1]!]!));
      else expect(Number(item.reponse), c).toBe(val(forme![1]!) * 1e6 + val(forme![2]!) * 1e3 + val(forme![3]!));
    });
  });

  it('comparer, ranger, encadrer', () => {
    partout('comparer-entiers-cm2', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const [x, y] = c.split(': ')[1]!.split(' … ').map(val);
        expect(item.reponse, c).toBe(signe(x!, y!));
      } else if (d === 2) {
        const v = item.options!.map(val);
        expect(val(item.reponse)).toBe(c.includes('grand') ? Math.max(...v) : Math.min(...v));
      } else {
        const [n, haut] = c.split(' < ').slice(1).map(val);
        expect(Number(item.reponse), c).toBe(Math.floor(n! / 1e6) * 1e6);
        expect(haut).toBe(Number(item.reponse) + 1e6);
      }
    });
  });

  it('diviseurs et multiples', () => {
    const nbDiviseurs = (n: number) => { let k = 0; for (let i = 1; i <= n; i++) if (n % i === 0) k++; return k; };
    partout('diviseurs-multiples-cm2', (item) => {
      const c = item.consigne;
      const [x, y] = nombres(c);
      if (c.includes('multiple commun')) seuleOption(item, (o) => val(o) % x! === 0 && val(o) % y! === 0);
      else if (c.includes('diviseur commun')) seuleOption(item, (o) => x! % val(o) === 0 && y! % val(o) === 0);
      else if (c.includes('multiple de')) seuleOption(item, (o) => val(o) % x! === 0);
      else if (c.includes('diviseur de')) seuleOption(item, (o) => x! % val(o) === 0);
      else {
        expect(Number(item.reponse), c).toBe(nbDiviseurs(x!));
        expect(x).toBeLessThanOrEqual(30);
      }
      if (c.includes('commun') && c.includes('diviseur')) expect(Math.max(x!, y!)).toBeLessThanOrEqual(30);
      if (c.includes('multiple commun')) expect(Math.max(x!, y!)).toBeLessThan(15);
    });
  });
});

describe('justesse CM2 : fractions', () => {
  /** Toutes les fractions « a/b » d'une consigne ont un dénominateur d'au plus 60 (programme du CM2). */
  const denominateursCm2 = (c: string) => {
    for (const m of c.matchAll(/\d+\/(\d+)/g)) expect(Number(m[1]), c).toBeLessThanOrEqual(60);
  };

  it('fractions supérieures à 1', () => {
    partout('fractions-superieures-cm2', (item) => {
      denominateursCm2(item.consigne);
      if (!item.consigne.includes('<')) return egaliteVraie(item);
      const [p, q, haut] = nombres(item.consigne.split(': ')[1]!);
      expect(p! % q!).not.toBe(0);
      expect(Number(item.reponse), item.consigne).toBe(Math.floor(p! / q!));
      expect(haut).toBe(Number(item.reponse) + 1);
    });
  });

  it('comparer des fractions', () => {
    partout('comparer-fractions-cm2', (item) => {
      denominateursCm2(item.consigne);
      const [a, b, c, e] = nombres(item.consigne.split(': ')[1]!);
      const g = a! * e!;
      const dr = c! * b!;
      expect(item.reponse, item.consigne).toBe(g === dr ? '=' : g < dr ? '<' : '>');
    });
  });

  it('additionner, soustraire, entier × fraction', () => {
    for (const id of ['additionner-fractions-cm2', 'entier-fois-fraction-cm2']) {
      partout(id, (item) => {
        denominateursCm2(item.consigne);
        egaliteVraie(item);
      });
    }
  });

  it('fraction d’une quantité', () => {
    partout('fraction-quantite-cm2', (item) => {
      const [p, q, total] = nombres(item.consigne);
      expect(proche(val(item.reponse) * q!, p! * total!), item.consigne).toBe(true);
    });
  });
});

describe('justesse CM2 : décimaux', () => {
  it('fractions décimales et écriture à virgule', () => {
    partout('fractions-decimales-cm2', (item) => {
      const ecrire = item.consigne.match(/^Écris sous forme décimale : (.+)$/);
      if (ecrire) {
        expect(proche(calculer(ecrire[1]!), val(item.reponse)), item.consigne).toBe(true);
        expect(decimalesDe(item.reponse)).toBeLessThanOrEqual(3);
      } else egaliteVraie(item);
    });
  });

  it('comparer, ranger, intercaler', () => {
    partout('comparer-decimaux-cm2', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const [x, y] = c.split(': ')[1]!.split(' … ').map(val);
        expect(item.reponse, c).toBe(signe(x!, y!));
      } else if (d === 2) {
        const v = item.options!.map(val);
        expect(val(item.reponse)).toBe(c.includes('grand') ? Math.max(...v) : Math.min(...v));
      } else {
        const [bas, haut] = c.match(/entre (.+) et (.+) \?/)!.slice(1).map(val);
        seuleOption(item, (o) => val(o) > bas! + 1e-9 && val(o) < haut! - 1e-9);
      }
      for (const o of item.options ?? []) if (/\d/.test(o)) expect(decimalesDe(o)).toBeLessThanOrEqual(3);
    });
  });

  it('partie entière et arrondi à l’unité', () => {
    partout('arrondi-unite-cm2', (item) => {
      const x = nombres(item.consigne)[0]!;
      const milliemes = Math.round(x * 1000);
      const attendu = item.consigne.includes('partie entière')
        ? Math.floor(milliemes / 1000)
        : Math.floor(milliemes / 1000) + (milliemes % 1000 >= 500 ? 1 : 0);
      expect(Number(item.reponse), item.consigne).toBe(attendu);
    });
  });
});

describe('justesse CM2 : calcul', () => {
  it('× et ÷ par 10, 100, 1 000 (résultats limités aux millièmes)', () => {
    partout('multiplier-diviser-10-cm2', (item) => {
      if (item.consigne.startsWith('Complète')) egaliteVraie(item);
      else calculJuste(item);
      for (const n of [item.reponse, ...ecritures(item.consigne)]) expect(decimalesDe(n), item.consigne).toBeLessThanOrEqual(3);
    });
  });

  it('calcul mental sur les entiers', () => {
    partout('calcul-mental-entiers-cm2', calculJuste);
  });

  it('calcul mental sur les décimaux', () => {
    partout('calcul-mental-decimaux-cm2', (item) => {
      const moitie = item.consigne.match(/moitié de (.+)\.$/);
      const double = item.consigne.match(/double de (.+)\.$/);
      if (moitie) expect(proche(val(item.reponse), val(moitie[1]!) / 2), item.consigne).toBe(true);
      else if (double) expect(proche(val(item.reponse), 2 * val(double[1]!)), item.consigne).toBe(true);
      else calculJuste(item);
    });
  });

  it('parenthèses : une ou deux paires, résultat entier positif', () => {
    partout('parentheses-cm2', (item) => {
      expect(item.consigne).toMatch(/\(/);
      expect((item.consigne.match(/\(/g) ?? []).length).toBeLessThanOrEqual(2);
      expect(Number.isInteger(val(item.reponse)) && val(item.reponse) > 0).toBe(true);
      calculJuste(item);
    });
  });

  it('décimal × entier, division décimale par un diviseur à un chiffre', () => {
    partout('multiplier-decimal-entier-cm2', (item) => {
      calculJuste(item);
      expect(Number.isInteger(nombres(item.consigne.split('×')[1]!)[0])).toBe(true);
    });
    partout('division-decimale-cm2', (item) => {
      calculJuste(item);
      expect(item.consigne).toMatch(/÷ \d$/);
      expect(decimalesDe(item.reponse)).toBeLessThanOrEqual(3);
    });
  });

  it('égalités à trous', () => {
    partout('egalites-trous-cm2', egaliteVraie);
  });

  it('programmes de calcul : exécution pas à pas', () => {
    partout('programme-calcul-cm2', (item) => {
      const phrases = item.consigne.split(/(?<=\.) /);
      let n = Number(phrases[0]!.match(/^Choisis (\d+)\.$/)![1]);
      for (const p of phrases.slice(1, -1)) {
        const k = Number(p.match(/\d+/)?.[0]);
        if (p.startsWith('Ajoute')) n += k;
        else if (p.startsWith('Retire')) n -= k;
        else if (p.startsWith('Multiplie')) n *= k;
        else if (p.startsWith('Prends la moitié')) n /= 2;
        else throw new Error(`Instruction inconnue : ${p}`);
      }
      expect(Number(item.reponse), item.consigne).toBe(n);
      expect(Number.isInteger(n) && n >= 0).toBe(true);
    });
  });
});

describe('justesse CM2 : problèmes, proportionnalité, probabilités', () => {
  it('problèmes à plusieurs étapes', () => {
    partout('problemes-etapes-cm2', (item) => {
      const c = item.consigne;
      const n = nombres(c);
      let attendu: number;
      if (c.includes('bus')) attendu = n[0]! - n[1]! + n[2]!;
      else if (c.includes('ville')) attendu = n[0]! - n[1]! + n[2]!;
      else if (c.includes('cahiers')) attendu = n[3]! - (n[0]! * n[1]! + n[2]!);
      else if (c.includes('camion')) attendu = n[0]! * n[1]! + n[2]! * n[3]!;
      else if (c.includes('musée')) attendu = n[1]! + n[0]! * n[2]! - n[3]!;
      else attendu = (n[1]! * n[2]! + n[3]!) / n[0]!;
      expect(proche(val(item.reponse), attendu), c).toBe(true);
      expect(attendu).toBeGreaterThan(0);
    });
  });

  it('comparaison multiplicative', () => {
    partout('comparaison-multiplicative-cm2', (item) => {
      const c = item.consigne;
      const [x, y] = nombres(c);
      const attendu = c.includes('Combien de fois') ? x! / y! : c.includes('fois plus') ? x! * y! : x! / y!;
      expect(proche(val(item.reponse), attendu), c).toBe(true);
    });
  });

  it('proportionnalité : la réponse respecte le rapport donné', () => {
    partout('proportionnalite-cm2', (item) => {
      const c = item.consigne;
      const [q1, v1] = nombres(c);
      const cible = nombres(c.slice(c.lastIndexOf('. ') + 2))[0]!;
      expect(proche(val(item.reponse), (v1! / q1!) * cible), c).toBe(true);
      // Pas de « 1 cahiers » : toutes les quantités d'objets sont au pluriel.
      expect(c).not.toMatch(/(^|\. |Combien \p{L}+ )1 /u);
    });
  });

  it('probabilités : a chances sur b', () => {
    const evenementDe = (texte: string): ((n: number) => boolean) => {
      if (texte === 'un nombre pair') return (n) => n % 2 === 0;
      if (texte === 'un nombre impair') return (n) => n % 2 === 1;
      if (texte === 'un multiple de 3') return (n) => n % 3 === 0;
      const sup = texte.match(/supérieur à (\d)/);
      if (sup) return (n) => n > Number(sup[1]);
      const inf = texte.match(/inférieur à (\d)/);
      if (inf) return (n) => n < Number(inf[1]);
      const k = Number(texte.match(/^le (\d)$/)![1]);
      return (n) => n === k;
    };
    partout('probabilites-cm2', (item) => {
      const c = item.consigne;
      const sur = Number(c.match(/chances sur (\d+)/)![1]);
      let attendu: number;
      if (c.includes('un dé à 6 faces')) {
        expect(sur).toBe(6);
        const ev = evenementDe(c.match(/d’obtenir (.+) \?$/)![1]!);
        attendu = [1, 2, 3, 4, 5, 6].filter(ev).length;
      } else if (c.includes('urne')) {
        const boules = [...c.matchAll(/(\d+) boules? (\p{L}+)/gu)].map((m) => ({ n: Number(m[1]), couleur: m[2]!.replace(/s$/, '') }));
        const total = boules.reduce((s, b) => s + b.n, 0);
        expect(sur).toBe(total);
        const couleur = c.match(/tirer une boule (\p{L}+) \?$/u)![1]!;
        const favorables = boules.filter((b) => b.couleur === couleur).reduce((s, b) => s + b.n, 0);
        attendu = c.includes('ne pas tirer') ? total - favorables : favorables;
      } else if (c.includes('pièces')) {
        expect(sur).toBe(4);
        const issues = [['P', 'P'], ['P', 'F'], ['F', 'P'], ['F', 'F']];
        const piles = (i: string[]) => i.filter((x) => x === 'P').length;
        const ev = c.match(/d’obtenir (.+) \?$/)![1]!;
        const test = ev === 'deux fois pile' ? (i: string[]) => piles(i) === 2
          : ev === 'deux fois face' ? (i: string[]) => piles(i) === 0
          : ev === 'au moins une fois pile' ? (i: string[]) => piles(i) >= 1
          : (i: string[]) => piles(i) === 1;
        attendu = issues.filter(test).length;
      } else {
        expect(sur).toBe(36);
        const somme = c.match(/égale à (\d+)/);
        attendu = 0;
        for (let x = 1; x <= 6; x++) for (let y = 1; y <= 6; y++) if (somme ? x + y === Number(somme[1]) : x === y) attendu++;
      }
      expect(Number(item.reponse), c).toBe(attendu);
    });
  });
});

describe('justesse CM2 : grandeurs', () => {
  it('aire du carré et du rectangle', () => {
    partout('aires-cm2', (item) => {
      const c = item.consigne;
      const n = nombres(c);
      let attendu: number;
      if (c.startsWith('Calcule l’aire d’un rectangle')) attendu = n[0]! * n[1]!;
      else if (c.startsWith('Calcule l’aire d’un carré')) attendu = n[0]! * n[0]!;
      else if (c.startsWith('Un carré')) attendu = Math.sqrt(n[0]!);
      else attendu = n[0]! / n[1]!;
      expect(Number(item.reponse), c).toBe(attendu);
    });
  });

  it('conversions d’aires (résultats limités aux millièmes)', () => {
    const rang: Record<string, number> = { 'm²': 0, 'dm²': 1, 'cm²': 2 };
    partout('convertir-aires-cm2', (item) => {
      const [, x, de, vers] = item.consigne.match(/Convertis (.+) (\S+²) en (\S+²)\./)!;
      expect(proche(val(item.reponse), val(x!) * 100 ** (rang[vers!]! - rang[de!]!)), item.consigne).toBe(true);
      expect(decimalesDe(item.reponse)).toBeLessThanOrEqual(3);
    });
  });

  it('angles : nature et mesures à partir de l’angle droit', () => {
    partout('angles-cm2', (item) => {
      const c = item.consigne;
      const n = nombres(c);
      if (item.gabarit === 'qcm') {
        expect(item.reponse, c).toBe(n[0]! < 90 ? 'aigu' : n[0] === 90 ? 'droit' : 'obtus');
        return;
      }
      let attendu: number;
      if (c.includes('moitié d’un angle droit')) attendu = 45;
      else if (c.includes('tiers d’un angle droit')) attendu = 30;
      else if (c.includes('fois plus grand')) attendu = n[0]! * n[1]!;
      else if (c.includes('en deux parties')) attendu = n[0]! / 2;
      else if (c.includes('pour obtenir un angle droit')) attendu = 90 - n[0]!;
      else attendu = n[0]! + n[1]!;
      expect(Number(item.reponse), c).toBe(attendu);
      // Au cours moyen : angles saillants seulement.
      expect(attendu).toBeGreaterThan(0);
      expect(attendu).toBeLessThan(180);
    });
  });

  it('durées : heures, minutes, secondes', () => {
    partout('durees-cm2', (item, d) => {
      const c = item.consigne;
      if (d === 1) expect(Number(item.reponse), c).toBe(secondes(c.match(/Convertis (.+) en secondes/)![1]!));
      else if (d === 2) {
        expect(secondes(item.reponse), c).toBe(Number(c.match(/(\d+) secondes/)![1]));
        expect(item.reponse).toMatch(/^\d+ min( [1-5]?\d s)?$/);
      } else {
        const [, debut, fin] = c.match(/à (.+?) et se termine à (.+?)\./)!;
        expect(secondes(item.reponse), c).toBe(secondes(fin!) - secondes(debut!));
        seuleOption(item, (o) => secondes(o) === secondes(fin!) - secondes(debut!));
      }
    });
  });
});

// ───────────────────────── Français

describe('justesse CM2 : conjugaison', () => {
  const RANG: Record<string, number> = { 'j’': 0, je: 0, tu: 1, il: 2, elle: 2, nous: 3, vous: 4, ils: 5, elles: 5 };
  const sujetDe = (c: string) => c.match(/: (j’|\p{L}+) …$/u)![1]!;
  const verbeDe = (c: string) => c.match(/« (\p{L}+) »/u)![1]!;

  it('passé simple', () => {
    const IRREGULIERS: Record<string, string[]> = {
      être: ['fus', 'fus', 'fut', 'fûmes', 'fûtes', 'furent'], avoir: ['eus', 'eus', 'eut', 'eûmes', 'eûtes', 'eurent'],
      faire: ['fis', 'fis', 'fit', 'fîmes', 'fîtes', 'firent'], aller: ['allai', 'allas', 'alla', 'allâmes', 'allâtes', 'allèrent'],
      dire: ['dis', 'dis', 'dit', 'dîmes', 'dîtes', 'dirent'], venir: ['vins', 'vins', 'vint', 'vînmes', 'vîntes', 'vinrent'],
      pouvoir: ['pus', 'pus', 'put', 'pûmes', 'pûtes', 'purent'], voir: ['vis', 'vis', 'vit', 'vîmes', 'vîtes', 'virent'],
      vouloir: ['voulus', 'voulus', 'voulut', 'voulûmes', 'voulûtes', 'voulurent'], prendre: ['pris', 'pris', 'prit', 'prîmes', 'prîtes', 'prirent'],
    };
    partout('passe-simple-cm2', (item) => {
      const inf = verbeDe(item.consigne);
      const r = RANG[sujetDe(item.consigne)]!;
      const rad = inf.slice(0, -2);
      const attendu = IRREGULIERS[inf]?.[r]
        ?? (inf.endsWith('er') ? rad + ['ai', 'as', 'a', 'âmes', 'âtes', 'èrent'][r] : rad + ['is', 'is', 'it', 'îmes', 'îtes', 'irent'][r]);
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('plus-que-parfait', () => {
    const PARTICIPES: Record<string, string> = {
      chanter: 'chanté', parler: 'parlé', finir: 'fini', choisir: 'choisi', faire: 'fait', dire: 'dit', prendre: 'pris', voir: 'vu',
      pouvoir: 'pu', vouloir: 'voulu', être: 'été', avoir: 'eu', aller: 'allé', venir: 'venu', partir: 'parti', arriver: 'arrivé',
      tomber: 'tombé', rester: 'resté',
    };
    const AVEC_ETRE = ['aller', 'venir', 'partir', 'arriver', 'tomber', 'rester'];
    partout('plus-que-parfait-cm2', (item) => {
      const inf = verbeDe(item.consigne);
      const sujet = sujetDe(item.consigne);
      const r = RANG[sujet]!;
      const etre = AVEC_ETRE.includes(inf);
      const aux = (etre ? ['étais', 'étais', 'était', 'étions', 'étiez', 'étaient'] : ['avais', 'avais', 'avait', 'avions', 'aviez', 'avaient'])[r];
      const accord = etre ? (sujet.startsWith('elle') ? 'e' : '') + (sujet.endsWith('s') ? 's' : '') : '';
      expect(item.reponse, item.consigne).toBe(`${aux} ${PARTICIPES[inf]}${accord}`);
    });
  });
});

describe('justesse CM2 : accords du participe passé', () => {
  it('avec être : accord avec le nom noyau du sujet', () => {
    // Genre (f) et nombre (p) des noms noyaux et des sujets employés.
    const NOMS: Record<string, [boolean, boolean]> = {
      tante: [true, false], oncle: [false, false], voisines: [true, true], cousins: [false, true], mère: [true, false],
      amis: [false, true], chat: [false, false], sœurs: [true, true], frère: [false, false], filles: [true, true],
      directrice: [true, false], joueuses: [true, true], Elles: [true, true], Ils: [false, true],
      Tom: [false, false], Léa: [true, false], Inès: [true, false], Nora: [true, false], père: [false, false], fils: [false, false],
      sœur: [true, false],
    };
    const PP: Record<string, string> = {
      arriver: 'arrivé', partir: 'parti', tomber: 'tombé', venir: 'venu', rester: 'resté', sortir: 'sorti', entrer: 'entré',
      monter: 'monté', descendre: 'descendu', revenir: 'revenu',
    };
    partout('participe-passe-etre-cm2', (item) => {
      const [, inf, sujet, aux] = item.consigne.match(/« (\p{L}+) » : (.+?) (est|sont|était|étaient) …/u)!;
      const parties = sujet!.split(' et ');
      const noyaux = parties.map((p) => { const mots = p.split(' '); return NOMS[mots.length === 1 ? mots[0]! : mots[1]!]!; });
      const feminin = noyaux.every(([f]) => f);
      const pluriel = parties.length > 1 || noyaux[0]![1];
      expect(['sont', 'étaient'].includes(aux!), item.consigne).toBe(pluriel);
      expect(item.reponse, item.consigne).toBe(PP[inf!]! + (feminin ? 'e' : '') + (pluriel ? 's' : ''));
    });
  });

  it('avec avoir : accord avec le COD placé avant, jamais avec le sujet', () => {
    const NOMS: Record<string, [boolean, boolean]> = {
      fleurs: [true, true], rose: [true, false], tulipes: [true, true], champignons: [false, true], bouquet: [false, false],
      lettre: [true, false], lettres: [true, true], poèmes: [false, true], histoires: [true, true], message: [false, false],
      muguet: [false, false], tarte: [true, false], crêpes: [true, true], tartes: [true, true], gâteaux: [false, true], soupe: [true, false],
      clés: [true, true], lunettes: [true, true], jouets: [false, true], valise: [true, false],
    };
    const PP: Record<string, string> = {
      cueillir: 'cueilli', choisir: 'choisi', écrire: 'écrit', lire: 'lu', préparer: 'préparé', gouter: 'gouté', perdre: 'perdu',
      ranger: 'rangé', prendre: 'pris',
    };
    partout('participe-passe-avoir-cm2', (item, d) => {
      const [, inf, phrase] = item.consigne.match(/« (\p{L}+) » : (.+)$/u)!;
      const pp = PP[inf!]!;
      const relatif = / que .+ (a|ont) …/.test(phrase!);
      const pronom = phrase!.match(/,.+\s(l’|les )(?:a|ont|avons|avez) …/)?.[1];
      // Progression : COD après le verbe, puis pronom l’/les, puis relatif « que ».
      expect([relatif, Boolean(pronom)], item.consigne).toEqual([d === 3, d === 2]);
      if (d === 1) return expect(item.reponse, item.consigne).toBe(pp);
      const [f, p] = NOMS[phrase!.split(/[ ,]/)[1]!]!;
      if (pronom) expect(pronom === 'les ', item.consigne).toBe(p);
      const fin = (f ? 'e' : '') + (p ? 's' : '');
      expect(item.reponse, item.consigne).toBe(pp.endsWith('s') && fin === 's' ? pp : pp + fin);
    });
  });
});

describe('justesse CM2 : grammaire', () => {
  it('attribut du sujet, COD, COI', () => {
    const ETAT = /(?<!\p{L})(est|sont|était|étaient|semble|semblent|semblait|semblaient|devient|deviennent|deviendra|deviendront|devenu|devenue|devenus|devenues|reste|restent|restera|resteront|restés|parait|paraissent|paraissait|paraissaient)(?!\p{L})/u;
    partout('fonctions-cm2', (item) => {
      const phrase = item.consigne.match(/« (.+?) »/)![1]!;
      const groupe = item.consigne.match(/de « (.+) » \?/)![1]!;
      const prep = /^(à |au |aux |de |du |des |d’)/.test(groupe);
      let attendu: string;
      if (['le', 'la', 'les', 'l’'].includes(groupe)) attendu = 'COD';
      else if (['lui', 'leur'].includes(groupe)) attendu = 'COI';
      else if (ETAT.test(phrase)) attendu = 'attribut du sujet';
      else attendu = prep ? 'COI' : 'COD';
      if (item.options!.includes('complément d’objet') && attendu !== 'attribut du sujet') attendu = 'complément d’objet';
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('compléments circonstanciels de temps, de lieu, de cause', () => {
    const INDICES: Record<string, RegExp> = {
      temps: /demain|heures|printemps|nuit|samedi|soir|lundi|automne|vacances|mercredis|lendemain|depuis|lever|il y a|fin du|hiver|premier jour|quand|lorsque|dès que|au moment|avant|pendant|après|chaque fois|tant que/i,
      lieu: /(?<!\p{L})(sur|dans|sous|entre) |Marseille|cantine|devant|au fond|derrière|au bord|au sommet|près de|à l’entrée|là où|partout où|au pied|au milieu|côté|tout en haut|à travers|le long/iu,
      cause: /à cause|de froid|faute|de honte|de joie|de faim|en raison|grâce|par peur|par manque|pour cause|(?<!\p{L})comme(?!\p{L})|parce qu|puisqu/iu,
    };
    partout('complements-circonstanciels-cm2', (item) => {
      const groupe = item.consigne.match(/de « (.+) » \?/)![1]!;
      const types = Object.keys(INDICES).filter((t) => INDICES[t]!.test(groupe));
      expect(types, groupe).toHaveLength(1);
      expect(item.reponse).toBe(`complément circonstanciel de ${types[0]}`);
    });
  });

  it('sujet inversé : placé après le verbe et accordé avec lui', () => {
    const pluriel = (gn: string) => /^(les|des|deux|mes|ces)\s/.test(gn);
    partout('sujet-inverse-cm2', (item) => {
      const phrase = item.consigne.match(/^Dans « (.+) », quel est/)![1]!;
      const verbe = item.consigne.match(/du verbe « (.+) » \?$/)![1]!;
      const position = phrase.search(new RegExp(`(?<!\\p{L})${verbe}(?!\\p{L})`, 'u'));
      expect(position, item.consigne).toBeGreaterThanOrEqual(0);
      const ok = (o: string) => phrase.indexOf(o) > position && pluriel(o) === /nt$/.test(verbe);
      seuleOption(item, ok);
    });
  });

  it('classes de mots', () => {
    const LISTES: Record<string, string[]> = {
      préposition: ['à', 'de', 'avec', 'dans', 'sur', 'sous', 'pour', 'sans', 'chez', 'vers', 'entre', 'derrière', 'devant', 'après',
        'jusqu’à', 'près de', 'loin de', 'à cause de', 'grâce à', 'au-dessus de', 'à côté de', 'en face de'],
      'conjonction de coordination': ['mais', 'ou', 'et', 'donc', 'or', 'ni', 'car'],
      'conjonction de subordination': ['quand', 'lorsque', 'parce que', 'parce qu’', 'si', 'que', 'puisque', 'comme', 'dès que', 'avant que', 'pendant que'],
      adverbe: ['vite', 'lentement', 'souvent', 'parfois', 'très', 'assez', 'jamais', 'bientôt', 'beaucoup', 'peu', 'difficilement', 'toujours',
        'attentivement', 'vraiment', 'tout à coup', 'peut-être', 'presque', 'déjà', 'ensemble', 'doucement', 'calmement'],
    };
    partout('classes-mots-cm2', (item) => {
      const mot = item.consigne.match(/classe (?:du mot|de) « (.+) » \?$/)![1]!;
      expect(LISTES[item.reponse], item.consigne).toContain(mot);
      expect(item.consigne.toLowerCase()).toContain(mot);
    });
  });

  it('phrase simple ou complexe : nombre de verbes conjugués', () => {
    const verbes = (phrase: string) => {
      const source = PHRASES_VERBES_CM2.find((p) => p.replace(/\*/g, '') === phrase);
      if (!source) throw new Error(`Phrase inconnue : ${phrase}`);
      return (source.match(/\*/g) ?? []).length;
    };
    partout('phrase-complexe-cm2', (item, d) => {
      if (d === 3) expect(Number(item.reponse)).toBe(verbes(item.consigne.match(/« (.+) »/)![1]!));
      else seuleOption(item, (o) => (item.consigne.includes('complexe') ? verbes(o) > 1 : verbes(o) === 1));
    });
  });

  it('pronoms personnels compléments : bon pronom, placé devant le verbe', () => {
    partout('pronoms-complements-cm2', (item) => {
      const [, gn, phrase] = item.consigne.match(/^Remplace « (.+?) » par un pronom personnel : (.+)$/)!;
      // Choix du pronom : COI introduit par « à », sinon COD ; genre et nombre lus sur le déterminant.
      const coi = /^(à|au|aux) /.test(gn!);
      const pluriel = /^(aux|à (ses|mes|ces|les)|les|ses|mes|ces) /.test(gn!);
      const feminin = /^(à )?(la|sa|ma|cette) /.test(gn!);
      const pronom = coi ? (pluriel ? 'leur' : 'lui') : pluriel ? 'les' : feminin ? 'la' : 'le';
      // Place : on retire le complément, puis on met le pronom devant le verbe (après « ne »).
      const mots = phrase!.replace(` ${gn}.`, '').split(' ');
      const negatif = mots.includes('pas');
      if (negatif) mots.pop();
      let verbe = mots.pop()!;
      const sujet = mots[0]!;
      if (verbe.startsWith('n’')) verbe = verbe.slice(2);
      const devant = ['le', 'la'].includes(pronom) && /^[aeéèêiouh]/.test(verbe) ? 'l’' : `${pronom} `;
      const attendu = `${sujet} ${negatif ? 'ne ' : ''}${devant}${verbe}${negatif ? ' pas' : ''}.`;
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('forme négative aux temps composés : ne devant l’auxiliaire, adverbe juste après', () => {
    const AUX = 'ai|as|a|avons|avez|ont|avais|avait|avions|aviez|avaient|suis|es|est|sommes|êtes|sont|étais|était|étions|étiez|étaient';
    partout('negation-temps-composes-cm2', (item) => {
      const [, adv, phrase] = item.consigne.match(/« ne … (\p{L}+) » : (.+)$/u)!;
      const forme = new RegExp(`(?<!\\p{L})(ne |n’)((?:l’|m’|lui |leur |les |nous )?)(${AUX}) ${adv} `, 'u');
      const m = item.reponse.match(forme);
      expect(m, item.consigne).not.toBeNull();
      // Élision : « n’ » seulement devant une voyelle.
      expect(m![1] === 'n’', item.consigne).toBe(/^[aeéèêiouh]/.test(m![2]! + m![3]!));
      // Sans la négation, on retrouve la phrase de départ.
      expect(item.reponse.replace(m![1]!, '').replace(` ${adv} `, ' '), item.consigne).toBe(phrase);
    });
  });
});

describe('qualité CM2 : phrases sensées en français', () => {
  const FRANCAIS = GENERATEURS_CM2.filter((g) => g.competences[0]!.startsWith('FR-'));
  const textes = (item: Item) => [item.consigne, item.reponse, item.indice, item.explication, ...(item.options ?? [])];
  const NOMS_PROPRES = new Set(['Léa', 'Tom', 'Inès', 'Nora', 'Hugo', 'Malik', 'Léo', 'Lina', 'Nina', 'Sami', 'Jade']);

  it('pas de majuscule après une virgule, sauf nom propre', () => {
    for (const g of FRANCAIS) {
      partout(g.id, (item) => {
        for (const t of textes(item)) {
          for (const m of t.matchAll(/, (\p{Lu}\p{Ll}*)/gu)) expect(NOMS_PROPRES.has(m[1]!), `${g.id} : ${t}`).toBe(true);
        }
      });
    }
  });

  it('pas de « jamais » ni de « plus » avec un repère ponctuel (hier, ce matin, ce soir, aujourd’hui)', () => {
    for (const g of FRANCAIS) {
      partout(g.id, (item) => {
        for (const t of textes(item)) {
          for (const phrase of t.split(/(?<=[.!?])\s/)) {
            const negation = /(?<!\p{L})(jamais|plus)(?!\p{L})/iu.test(phrase);
            const ponctuel = /(?<!\p{L})(hier|ce matin|ce soir|aujourd’hui)(?!\p{L})/iu.test(phrase);
            expect(negation && ponctuel, `${g.id} : ${phrase}`).toBe(false);
          }
        }
      });
    }
  });

  it('pas de « avec soin » avec perdre, oublier ou casser', () => {
    for (const g of FRANCAIS) {
      partout(g.id, (item) => {
        const tout = textes(item).join(' ');
        if (/avec soin/.test(tout)) expect(tout, `${g.id} : ${item.consigne}`).not.toMatch(/perd|oubli|cass/);
      });
    }
  });
});

describe('qualité CM2 : accords et variété', () => {
  it('pas de pluriel après « 1 » (« 1 milliers ») dans les consignes et explications', () => {
    const INVARIABLES = new Set(['fois', 'pas', 'mois', 'temps', 'cours', 'poids', 'prix', 'repas', 'bras', 'corps', 'dos', 'fils']);
    for (const g of GENERATEURS_CM2) {
      partout(g.id, (item) => {
        for (const texte of [item.consigne, item.explication, item.indice]) {
          for (const m of texte.matchAll(/(?<![\d,\s  ]|\d[\s  ])1 (\p{L}+s)(?!\p{L})/gu)) {
            expect(INVARIABLES.has(m[1]!), `${g.id} : ${texte}`).toBe(true);
          }
        }
      });
    }
  });

  it('variété : au moins 25 consignes distinctes par difficulté, et la difficulté 1 différente de la 3', () => {
    const CORRIGES = [
      'fonctions-cm2', 'complements-circonstanciels-cm2', 'sujet-inverse-cm2', 'classes-mots-cm2', 'participe-passe-avoir-cm2',
      'pronoms-complements-cm2', 'negation-temps-composes-cm2', 'entier-fois-fraction-cm2', 'arrondi-unite-cm2',
      'comparer-fractions-cm2', 'valeur-chiffres-cm2', 'programme-calcul-cm2',
    ];
    for (const id of CORRIGES) {
      const consignes: Record<number, Set<string>> = { 1: new Set(), 2: new Set(), 3: new Set() };
      partout(id, (item, d) => consignes[d]!.add(item.consigne));
      for (const d of [1, 2, 3]) expect(consignes[d]!.size, `${id} difficulté ${d}`).toBeGreaterThanOrEqual(25);
      const communes = [...consignes[1]!].filter((c) => consignes[3]!.has(c)).length;
      expect(communes, `${id} : consignes communes aux difficultés 1 et 3`).toBe(0);
    }
  });

  it('progression : la difficulté 3 demande « entier + fraction » ; l’arrondi travaille les cas limites', () => {
    partout('entier-fois-fraction-cm2', (item, d) => {
      if (d === 3) expect(item.consigne).toMatch(/= \d+ \+ …\/\d+$/);
    });
    partout('arrondi-unite-cm2', (item, d) => {
      if (d !== 3) return;
      const x = nombres(item.consigne)[0]!;
      const millieme = Math.round(x * 1000) % 1000;
      const dizaine = Math.floor(x) % 10 === 9 && millieme >= 500;
      expect(dizaine || (millieme >= 470 && millieme <= 530), item.consigne).toBe(true);
    });
    partout('comparer-fractions-cm2', (item, d) => {
      if (d !== 3) return;
      const [a, b, c, e] = nombres(item.consigne.split(': ')[1]!);
      expect(a === b || c === e, item.consigne).toBe(false);
      expect(a! < b! === c! < e!, item.consigne).toBe(true);
    });
  });
});
