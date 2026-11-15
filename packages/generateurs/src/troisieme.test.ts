// Justesse des générateurs de 3e (programme 2026). Chaque oracle recalcule la réponse depuis la consigne, avec ses
// propres règles ou des tables ressaisies ici, sans réutiliser la logique des générateurs.
import { describe, expect, it } from 'vitest';
import { generateur } from './index';
import { DIFFICULTES, GRAINES, calculer, partout, proche, val } from './oracles';
import { GENERATEURS_TROISIEME } from './troisieme';

const nombres = (s: string) => [...s.replace(/(\d)[\s  ](?=\d{3}\b)/g, '$1').matchAll(/−?\d+(?:,\d+)?/g)].map((m) => val(m[0]));
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
/** « ⁻¹² » → −12 */
const exposant = (s: string) => (s.startsWith('⁻') ? -1 : 1) * Number([...s.replace('⁻', '')].map((c) => SUP.indexOf(c)).join(''));
const PUISSANCE = /(\w+)(⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g;
const enX = (expr: string, x: number) =>
  calculer(expr.replace(/\(([^()]+)\)²/g, '($1)($1)').replace(/x²/g, `(${x})*(${x})`).replace(/(\d)\(/g, '$1*(').replace(/^x\(/, `(${x})*(`).replace(/(\d)x/g, `$1*(${x})`)
    .replace(/x/g, `(${x})`).replace(/\)\(/g, ')*(').replace(/\*/g, '×'));
const estPremier = (n: number) => n > 1 && [...Array(Math.floor(Math.sqrt(n)) + 1).keys()].slice(2).every((d) => n % d !== 0);
const pgcd = (a: number, b: number): number => (b ? pgcd(b, a % b) : Math.abs(a));

describe('justesse 3e nombres et calculs', () => {
  it('décomposition en facteurs premiers : une seule option est un produit de premiers égal au nombre', () => {
    partout('decomposition-facteurs-premiers-3e', (item) => {
      const n = nombres(item.consigne)[0]!;
      const valeur = (o: string) => o.split(' × ').map((f) => {
        const m = f.match(/^(\d+)(⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?$/)!;
        return [Number(m[1]), m[2] ? exposant(m[2]) : 1] as const;
      });
      const juste = (o: string) => valeur(o).every(([p]) => estPremier(p)) && valeur(o).reduce((s, [p, e]) => s * p ** e, 1) === n;
      expect(item.options!.filter(juste), item.consigne).toEqual([item.reponse]);
    });
  });

  it('fraction irréductible', () => {
    partout('fraction-irreductible-3e', (item) => {
      const [, n, d] = item.consigne.match(/(\d+)\/(\d+)/)!.map(Number);
      const [p, q] = item.reponse.split('/').map(Number);
      expect(p! * d!).toBe(q! * n!);
      expect(pgcd(p!, q!)).toBe(1);
    });
  });

  it('puissances d’exposant négatif', () => {
    partout('puissances-negatives-3e', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const [, , e] = c.match(/(10)(⁻[⁰¹²³⁴⁵⁶⁷⁸⁹]+)/)!;
        expect(proche(val(item.reponse), 10 ** exposant(e!))).toBe(true);
      } else if (d === 2) {
        const [, b, e] = c.match(/(\d+)(⁻[⁰¹²³⁴⁵⁶⁷⁸⁹]+)/)!;
        expect(item.reponse).toBe(`1/${Number(b) ** -exposant(e!)}`);
      } else {
        const [, b, e] = item.reponse.match(/^(\d+)(⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)$/)!;
        const cible = c.includes('1/') ? 1 / Number(c.match(/1\/(\d+)/)![1]) : val(c.match(/(0,\d+)/)![1]!);
        expect(proche(Number(b) ** exposant(e!), cible), c).toBe(true);
      }
    });
  });

  it('produits et quotients de puissances', () => {
    partout('operations-puissances-3e', (item) => {
      const expr = item.consigne.split(' : ')[1]!;
      const termes = [...expr.matchAll(PUISSANCE)].map((m) => exposant(m[2]!));
      const ops = [...expr.matchAll(/[×÷]/g)].map((m) => m[0]);
      const attendu = termes.slice(1).reduce((s, e, i) => (ops[i] === '×' ? s + e : s - e), termes[0]!);
      const [, base, e] = item.reponse.match(/^(\w+?)(⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)$/)!;
      expect(base).toBe([...expr.matchAll(PUISSANCE)][0]![1]);
      expect(exposant(e!), item.consigne).toBe(attendu);
    });
  });

  it('notation scientifique : même valeur, mantisse entre 1 et 10', () => {
    const valeur = (s: string) => {
      const m = s.match(/^([\d,  ]+) × 10(⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)$/);
      return m ? val(m[1]!.replace(/[  ]/g, '')) * 10 ** exposant(m[2]!) : val(s.replace(/[  ]/g, ''));
    };
    partout('notation-scientifique-3e', (item) => {
      const nombre = item.consigne.match(/(?:de|scientifique :) (.+?)( \?)?$/)![1]!;
      const juste = (o: string) => {
        const m = val(o.split(' × ')[0]!);
        return m >= 1 && m < 10 && Math.abs(valeur(o) / valeur(nombre) - 1) < 1e-9;
      };
      expect(item.options!.filter(juste), item.consigne).toEqual([item.reponse]);
    });
  });

  it('équations x² = a', () => {
    partout('equation-carre-3e', (item) => {
      const n = nombres(item.consigne.replace('x²', 'x'));
      const a = n.length === 2 ? n[1]! - n[0]! : n[0]!;
      const r = Math.sqrt(a);
      const attendu = a < 0 ? 'aucune solution' : Number.isInteger(r) ? `x = −${r} ou x = ${r}` : `x = −√${a} ou x = √${a}`;
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('développer, factoriser, identités : une seule option égale à l’expression', () => {
    for (const id of ['double-distributivite-3e', 'identites-remarquables-3e']) {
      partout(id, (item) => {
        const depart = item.consigne.split(' : ')[1]!;
        const egal = (e: string) => [2, 5, -3].every((x) => proche(enX(e, x), enX(depart, x)));
        expect(item.options!.filter(egal), item.consigne).toEqual([item.reponse]);
        if (item.consigne.startsWith('Factorise')) expect(item.reponse.startsWith('(')).toBe(true);
        else expect(item.reponse).not.toMatch(/\(/);
      });
    }
  });

  it('équation produit nul : les deux solutions annulent le produit', () => {
    partout('equation-produit-nul-3e', (item) => {
      const gauche = item.consigne.split(' : ')[1]!.replace(' = 0', '');
      const solutions = item.reponse.match(/^x = (.+) ou x = (.+)$/)!.slice(1).map(val);
      expect(solutions[0]).toBeLessThan(solutions[1]!);
      for (const s of solutions) expect(proche(enX(gauche, s), 0), `${item.consigne} ${s}`).toBe(true);
    });
  });

  it('inéquations : même ensemble de solutions', () => {
    const vrai = (g: number, s: string, d: number) => (s === '⩾' ? g >= d : s === '⩽' ? g <= d : s === '>' ? g > d : g < d);
    partout('inequation-3e', (item) => {
      const [, gauche, s, droite] = item.consigne.match(/: (.+) ([⩾⩽<>]) (.+)$/)!;
      const [, s2, v] = item.reponse.match(/^x ([⩾⩽<>]) (.+)$/)!;
      const borne = val(v!);
      for (const x of [borne - 1, borne, borne + 1, borne + 0.5]) expect(vrai(x, s2!, borne), item.consigne).toBe(vrai(enX(gauche!, x), s!, val(droite!)));
    });
  });
});

describe('justesse 3e géométrie', () => {
  it('Thalès : calcul et réciproque', () => {
    partout('thales-3e', (item, d) => {
      const c = item.consigne;
      const lg = (nom: string) => val(c.match(new RegExp(`${nom} = (\\d+(?:,\\d+)?) cm`))![1]!);
      if (d === 3) {
        const egaux = proche(lg('AM') / lg('AB'), lg('AN') / lg('AC'));
        expect(item.reponse).toBe(egaux ? 'Oui, d’après la réciproque du théorème de Thalès' : 'Non, d’après la contraposée du théorème de Thalès');
      } else if (c.includes('Calcule MN')) expect(proche(val(item.reponse), (lg('BC') * lg('AM')) / lg('AB'))).toBe(true);
      else expect(proche(val(item.reponse), (lg('AM') * lg('BC')) / lg('MN'))).toBe(true);
    });
  });

  it('trigonométrie : rapports, côtés, hypoténuse', () => {
    partout('trigonometrie-3e', (item, d) => {
      const c = item.consigne;
      const droit = c.match(/rectangle en (\w)/)![1]!;
      const [, gauche, sommet, droite] = c.match(/\((\w)(\w)̂(\w)\)/)!;
      const autre = [gauche, droite].find((l) => l !== droit)!;
      const seg = (p: string, q: string) => [p, q].sort().join('');
      const [adj, opp, hyp] = [seg(sommet!, droit), seg(autre, droit), seg(sommet!, autre)];
      const rapport = c.match(/(cos|sin|tan)\(/)![1]!;
      if (d === 1) {
        expect(item.reponse).toBe({ cos: `${adj}/${hyp}`, sin: `${opp}/${hyp}`, tan: `${opp}/${adj}` }[rapport]);
        return;
      }
      const lg = (nom: string) => val(c.match(new RegExp(`${nom} = (\\d+(?:,\\d+)?) cm`))![1]!);
      const v = val(c.match(/\) = (\d+(?:,\d+)?)/)![1]!);
      if (d === 3) {
        const cote = rapport === 'cos' ? adj : opp;
        expect(proche(val(item.reponse), lg(cote) / v)).toBe(true);
      } else if (rapport === 'tan') expect(proche(val(item.reponse), lg(adj) * v)).toBe(true);
      else expect(proche(val(item.reponse), lg(hyp) * v)).toBe(true);
    });
  });

  it('volume de la boule', () => {
    partout('volume-boule-3e', (item) => {
      const c = item.consigne;
      if (c.startsWith('On multiplie')) {
        expect(Number(item.reponse)).toBe(nombres(c)[0]! ** 3);
        return;
      }
      const n = nombres(c)[0]!;
      const r = c.includes('diamètre') ? n / 2 : n;
      const v = (4 / 3) * Math.PI * r ** 3 / (c.includes('demi-boule') ? 2 : 1);
      expect(Number(item.reponse)).toBe(Math.round(v));
    });
  });

  it('sections et sphère', () => {
    const QUALITATIF: [RegExp, string][] = [
      [/pavé droit par un plan parallèle/, 'un rectangle identique à cette face'], [/cube par/, 'un carré identique à cette face'],
      [/cylindre par un plan perpendiculaire/, 'un disque de même rayon que la base'], [/cylindre par un plan parallèle/, 'un rectangle'],
      [/une boule par un plan\./, 'un disque'], [/une sphère par un plan\./, 'un cercle'], [/passe par son centre/, 'un grand cercle, de même rayon que la sphère'],
    ];
    partout('sections-solides-3e', (item, d) => {
      const c = item.consigne;
      const n = nombres(c);
      if (c.startsWith('Quels points')) {
        expect(item.reponse).toBe(c.includes('la sphère') ? `les points situés à exactement ${n[0]} cm de O` : `les points situés à ${n[0]} cm ou moins de O`);
      } else if (d === 1) expect(item.reponse).toBe(QUALITATIF.find(([re]) => re.test(c))![1]);
      else if (d === 2) {
        if (c.includes('pavé')) expect(item.reponse).toBe(`un rectangle de ${n[3]} cm sur ${n[4]} cm`);
        else if (c.includes('perpendiculaire')) expect(item.reponse).toBe(`un disque de rayon ${n[0]} cm`);
        else expect(item.reponse).toBe(`un rectangle de ${2 * n[0]!} cm sur ${n[1]} cm`);
      } else expect(Number(item.reponse) ** 2).toBe(n[0]! ** 2 - n[1]! ** 2);
    });
  });

  // Coordonnées arbitraires pour vérifier les égalités de vecteurs sans règle de lettres.
  const point = (l: string) => {
    const k = l.charCodeAt(0);
    return [(k * 7) % 23, (k * 11) % 19] as const;
  };
  const vecteur = (s: string) => {
    if (s === 'le vecteur nul') return [0, 0];
    const m = s.match(/^(2 × )?vecteur (\w)(\w)$/)!;
    const [a, b] = [point(m[2]!), point(m[3]!)];
    const k = m[1] ? 2 : 1;
    return [k * (b[0] - a[0]), k * (b[1] - a[1])];
  };

  it('vecteurs : parallélogramme, opposé, translation', () => {
    partout('vecteurs-3e', (item) => {
      const c = item.consigne;
      if (c.startsWith('Quel est l’opposé')) {
        const v = vecteur(c.match(/(vecteur \w\w)/)![1]!);
        expect(item.options!.filter((o) => { const w = vecteur(o); return w[0] === -v[0]! && w[1] === -v[1]!; })).toEqual([item.reponse]);
      } else if (c.startsWith('L’image')) {
        const [, z, x, y, w] = c.match(/point (\w) par la translation de vecteur (\w)(\w) est le point (\w)/)!;
        // Coordonnées : X, Y, Z quelconques non alignés ; W = Z + XY.
        const P: Record<string, [number, number]> = { [x!]: [0, 0], [y!]: [5, 1], [z!]: [1, 4] };
        P[w!] = [P[z!]![0] + 5, P[z!]![1] + 1];
        const parallelogramme = (q: string) => {
          const [a, b, cc, dd] = [...q].map((l) => P[l]!);
          return a![0] + cc![0] === b![0] + dd![0] && a![1] + cc![1] === b![1] + dd![1];
        };
        expect(item.options!.filter(parallelogramme)).toEqual([item.reponse]);
      } else {
        const [, nom, depart] = c.match(/^(\w{4}) est un parallélogramme\. Quel vecteur est égal au vecteur (\w\w)/)!;
        const [a, b, cc, dd] = [...nom!];
        const P: Record<string, [number, number]> = { [a!]: [0, 0], [b!]: [4, 0], [cc!]: [5, 3], [dd!]: [1, 3] };
        const v = (s: string) => { const [p, q] = [...s.replace('vecteur ', '')]; return [P[q!]![0] - P[p!]![0], P[q!]![1] - P[p!]![1]]; };
        const cible = v(depart!);
        expect(item.options!.filter((o) => { const w = v(o); return w[0] === cible[0] && w[1] === cible[1]; })).toEqual([item.reponse]);
      }
    });
  });

  it('relation de Chasles : somme recalculée avec des coordonnées', () => {
    partout('relation-chasles-3e', (item) => {
      const expr = item.consigne.split(' : ')[1]!.replace(' = ?', '');
      const termes = [...expr.matchAll(/(^|[+−]) ?vecteur (\w\w)/g)];
      const somme = termes.reduce((s, m) => {
        const v = vecteur(`vecteur ${m[2]}`);
        const k = m[1] === '−' ? -1 : 1;
        return [s[0]! + k * v[0]!, s[1]! + k * v[1]!];
      }, [0, 0]);
      expect(item.options!.filter((o) => { const w = vecteur(o); return w[0] === somme[0] && w[1] === somme[1]; }), item.consigne).toEqual([item.reponse]);
    });
  });
});

describe('justesse 3e données et fonctions', () => {
  it('effectifs cumulés, médiane, quartiles', () => {
    partout('quartiles-3e', (item, d) => {
      const c = item.consigne;
      const paires = [...c.matchAll(/(\d+) \((\d+) \p{L}+\)/gu)].map((m) => [Number(m[1]), Number(m[2])] as const);
      const liste = paires.flatMap(([v, e]) => Array<number>(e).fill(v)).sort((x, y) => x - y);
      const n = liste.length;
      if (d === 1) {
        const v = Number(c.match(/de la valeur (\d+)/)![1]);
        expect(Number(item.reponse)).toBe(liste.filter((x) => x <= v).length);
      } else if (d === 2) {
        const m = n % 2 ? liste[(n - 1) / 2]! : (liste[n / 2 - 1]! + liste[n / 2]!) / 2;
        expect(proche(val(item.reponse), m)).toBe(true);
      } else {
        const p = c.includes('premier') ? 0.25 : 0.75;
        // Plus petite valeur telle qu'au moins p des valeurs lui soient inférieures ou égales.
        const q = liste.find((x) => liste.filter((y) => y <= x).length >= p * n)!;
        expect(Number(item.reponse)).toBe(q);
      }
    });
  });

  it('probabilité de la réunion', () => {
    partout('probabilite-reunion-3e', (item, d) => {
      const c = item.consigne;
      if (d === 3) {
        const n = nombres(c)[0];
        const k = nombres(c).at(-1);
        const cartes = [...Array(n!).keys()].map((i) => i + 1);
        const favorables = cartes.filter((x) => x % 2 === 0 || x % k! === 0).length;
        expect(proche(val(item.reponse), favorables / n!)).toBe(true);
        const [p, q] = item.reponse.split('/').map(Number);
        expect(pgcd(p!, q!)).toBe(1);
        return;
      }
      const [pa, pb, x] = nombres(c.replace(/P\(A ∪ B\)|P\(A ∩ B\)|P\(A\)|P\(B\)/g, ''));
      const attendu = c.includes('Calcule P(A ∪ B)') ? pa! + pb! - x! : pa! + pb! - x!;
      expect(proche(val(item.reponse), attendu)).toBe(true);
    });
  });

  it('évolutions en pourcentage', () => {
    const evol = (p: number) => (Math.abs(p) < 1e-9 ? 'aucune évolution' : `${p > 0 ? 'hausse' : 'baisse'} de ${String(Math.round(Math.abs(p) * 100) / 100).replace('.', ',')} %`);
    partout('evolution-pourcentage-3e', (item, d) => {
      const c = item.consigne;
      if (d < 3) {
        const [depart, arrivee] = nombres(c);
        expect(proche(Number(item.reponse), (Math.abs(arrivee! - depart!) / depart!) * 100)).toBe(true);
        return;
      }
      const etapes = [...c.matchAll(/une (hausse|baisse) de (\d+) %/g)].map((m) => (m[1] === 'hausse' ? 1 : -1) * Number(m[2]));
      const coef = etapes.reduce((s, t) => s * (1 + t / 100), 1);
      expect(item.reponse).toBe(evol((coef - 1) * 100));
    });
  });

  it('image et antécédent', () => {
    partout('image-antecedent-3e', (item, d) => {
      const c = item.consigne;
      if (d === 2) {
        const xs = nombres(c.match(/x : ([^.]+)\./)![1]!);
        const ys = nombres(c.match(/f\(x\) : ([^.]+)\./)![1]!);
        const cible = val(c.match(/de (−?\d+) par f/)![1]!);
        expect(val(item.reponse)).toBe(c.includes('l’image') ? ys[xs.indexOf(cible)] : xs[ys.indexOf(cible)]);
        return;
      }
      const expr = c.match(/f\(x\) = (.+?)\. /)![1]!;
      const cible = val(c.match(/de (−?\d+) par f/)![1]!);
      if (d === 1) expect(proche(val(item.reponse), enX(expr, cible))).toBe(true);
      else expect(proche(enX(expr, val(item.reponse)), cible)).toBe(true);
    });
  });

  it('fonctions linéaires', () => {
    partout('fonctions-lineaires-3e', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const [, a, x] = c.match(/f\(x\) = (−?[\d,]+)x\. Calcule f\((−?\d+)\)/)!;
        expect(proche(val(item.reponse), val(a!) * val(x!))).toBe(true);
        return;
      }
      const [, x0, y0] = c.match(/f\((\d+)\) = (−?[\d,]+)/)!;
      const coef = val(y0!) / val(x0!);
      if (d === 2) expect(proche(val(item.reponse), coef)).toBe(true);
      else expect(proche(val(item.reponse), coef * val(c.match(/Calcule f\((−?\d+)\)/)![1]!))).toBe(true);
    });
  });

  it('fonctions affines', () => {
    partout('fonctions-affines-3e', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const expr = c.match(/f\(x\) = (.+?)\. /)![1]!.replace(/^(−?\d+) ([+−]) (\d*)x$/, (_, b, s, k) => `${s === '−' ? '−' : ''}${k || 1}x + (${b})`);
        const [, a, b] = item.reponse.match(/a = (−?\d+) et b = (−?\d+)/)!;
        expect(proche(enX(expr, 0), val(b!))).toBe(true);
        expect(proche(enX(expr, 1) - enX(expr, 0), val(a!))).toBe(true);
      } else if (d === 2) {
        const [, b, x1, y1] = nombres(c);
        expect(proche(val(item.reponse), (y1! - b!) / x1!)).toBe(true);
      } else {
        const points = [...c.matchAll(/f\((−?\d+)\) = (−?\d+)/g)].map((m) => [val(m[1]!), val(m[2]!)] as const);
        const expr = item.reponse.replace('f(x) = ', '');
        for (const [x, y] of points) expect(proche(enX(expr, x), y), item.consigne).toBe(true);
      }
    });
  });
});

describe('justesse 3e français', () => {
  it('phrase emphatique : règles de repérage', () => {
    partout('phrase-emphatique-3e', (item) => {
      const phrase = item.consigne.match(/« (.+) »/)![1]!;
      const segments = phrase.split(', ');
      const attendu = /^C’est .*( qui | que | qu’)/.test(phrase) ? 'tournure présentative (c’est… qui, c’est… que)'
        : segments.length === 1 ? 'aucune : phrase neutre'
          : /^(cette|ce|ces|ta|ton|tes|mes|à|de|du) /.test(segments.at(-1)!) ? 'détachement en fin de phrase' : 'détachement en tête de phrase';
      expect(item.reponse, phrase).toBe(attendu);
    });
  });

  it('pronoms relatifs : réponses ressaisies', () => {
    const R: [string, string][] = [
      ['livre … je parle', 'dont'], ['maison … nous habitons', 'où'], ['film … nous avons vu', 'que'], ['élève … est absent', 'qui'],
      ['ami … je suis fier', 'dont'], ['jour … il est né', 'où'], ['avec … je répare', 'lequel'], ['à … tu parles', 'qui'],
      ['concours … je participe', 'auquel'], ['ville … je rêve', 'dont'], ['près … nous habitons', 'duquel'], ['sans … il ne peut', 'lesquels'],
      ['questions … je pense', 'auxquelles'], ['tableau … elle est fière', 'dont'], ['au bord de … nous', 'laquelle'], ['pour … il est parti', 'lesquelles'],
      ['à … je ne m’attendais', 'laquelle'], ['par … nous sommes passés', 'lequel'],
    ];
    partout('pronom-relatif-3e', (item) => expect(item.reponse).toBe(R.find(([k]) => item.consigne.includes(k))![1]));
  });

  it('connecteurs : la réponse appartient à la classe logique ressaisie', () => {
    const CLASSES: Record<string, string[]> = {
      consequence: ['donc', 'par conséquent', 'ainsi'], opposition: ['pourtant', 'cependant', 'néanmoins', 'en revanche'],
      cause: ['en effet'], ajout: ['de plus', 'en outre', 'd’ailleurs'], exemple: ['par exemple'],
    };
    const RELATION: [string, string][] = [
      ['Il pleuvait', 'consequence'], ['beaucoup révisé', 'opposition'], ['au chaud', 'cause'], ['vélo est léger', 'ajout'], ['vitamine C', 'exemple'],
      ['magasin était fermé', 'consequence'], ['adore le sport', 'opposition'], ['trop long', 'ajout'], ['abeilles', 'cause'], ['glissante', 'consequence'],
      ['dinosaures', 'exemple'], ['épuisée', 'opposition'], ['semblait simple', 'opposition'], ['forêts', 'consequence'], ['économique', 'ajout'],
      ['témoin ment', 'cause'], ['immense succès', 'ajout'], ['la montagne', 'opposition'],
    ];
    partout('connecteurs-logiques-3e', (item) => {
      const relation = RELATION.find(([k]) => item.consigne.includes(k))![1];
      expect(CLASSES[relation]).toContain(item.reponse);
      for (const o of item.options!.filter((x) => x !== item.reponse)) expect(CLASSES[relation]).not.toContain(o);
    });
  });

  it('discours rapporté : repères formels', () => {
    partout('discours-indirect-libre-3e', (item) => {
      const phrase = item.consigne.replace('Lis cette phrase : ', '').replace(/ Comment les paroles.+$/, '');
      const attendu = phrase.includes('«') ? 'discours direct'
        : /(déclara|demanda|expliqua|promit|répondit|ordonna) /.test(phrase) ? 'discours indirect'
          : /[.?!] \p{Lu}/u.test(phrase) ? 'discours indirect libre' : 'récit, sans paroles rapportées';
      expect(item.reponse, phrase).toBe(attendu);
    });
  });

  it('subjonctif passé : auxiliaire au subjonctif présent accordé avec le sujet', () => {
    const AUX: Record<string, string[]> = { 'j’': ['aie', 'sois'], tu: ['aies', 'sois'], il: ['ait', 'soit'], elle: ['ait', 'soit'], nous: ['ayons', 'soyons'], vous: ['ayez', 'soyez'], ils: ['aient', 'soient'], elles: ['aient', 'soient'] };
    partout('subjonctif-passe-3e', (item) => {
      const phrase = item.consigne.split(' : ')[1]!;
      const avant = phrase.split('…')[0]!.replace(/ (nous|vous) (nous|vous) $/, ' $1 ');
      const sujet = avant.endsWith('j’') ? 'j’' : avant.trim().split(/[ ’]/).at(-1)!;
      // Auxiliaire être : verbes de mouvement de la liste usuelle et verbes pronominaux.
      const infinitif = item.consigne.match(/« (.+?) »/)![1]!;
      const etre = ['partir', 'arriver', 'revenir', 'venir', 'sortir', 'tomber', 'rester', 'aller'].includes(infinitif) || /(nous nous|vous vous) …/.test(phrase);
      const ok = (o: string) => AUX[sujet]![etre ? 1 : 0] === o.split(' ')[0] && o.split(' ').length === 2;
      expect(item.options!.filter(ok), item.consigne).toEqual([item.reponse]);
    });
  });

  it('identifier un temps : table ressaisie', () => {
    const TEMPS: Record<string, string> = {
      'ils chantaient': 'imparfait de l’indicatif', 'nous finirons': 'futur simple', 'tu chanterais': 'conditionnel présent', 'elle a pris': 'passé composé',
      'je chantai': 'passé simple', 'vous partiez': 'imparfait de l’indicatif', 'il viendra': 'futur simple', 'elles firent': 'passé simple',
      'nous avions fini': 'plus-que-parfait', 'tu auras compris': 'futur antérieur', 'qu’il vienne': 'subjonctif présent', 'ils eurent vu': 'passé antérieur',
      'je serais parti': 'conditionnel passé', 'que nous ayons fini': 'subjonctif passé', 'vous fûtes': 'passé simple', 'nous prendrions': 'conditionnel présent',
      'que nous voyions': 'subjonctif présent', 'je courrai': 'futur simple', 'je courrais': 'conditionnel présent', 'elles se seront levées': 'futur antérieur',
      'il aurait fallu': 'conditionnel passé', 'vous eûtes fini': 'passé antérieur', 'j’étais allé': 'plus-que-parfait', 'qu’elle soit sortie': 'subjonctif passé',
      'ils crurent': 'passé simple', 'tu acquerras': 'futur simple', 'nous mourrions': 'conditionnel présent', 'elle fut partie': 'passé antérieur',
    };
    partout('identifier-temps-3e', (item) => expect(item.reponse).toBe(TEMPS[item.consigne.match(/« (.+?) »/)![1]!]));
  });

  it('valeurs du conditionnel : repères', () => {
    partout('valeurs-conditionnel-3e', (item) => {
      const phrase = item.consigne.match(/« (.+?) », quelle/)![1]!;
      const attendu = /^(Selon|D’après|Le suspect)/.test(phrase) ? 'information non confirmée'
        : /^(Si |Au cas où|Que ferais)/.test(phrase) ? 'hypothèse'
          : /^(Pourrais|Auriez|Je voudrais)/.test(phrase) ? 'politesse'
            : /(aimerais|aimerait|voudrions)/.test(phrase) ? 'souhait' : 'futur dans le passé';
      expect(item.reponse, phrase).toBe(attendu);
    });
  });

  it('participe passé avec avoir : accord avec le COD placé avant, jamais avec « dont »', () => {
    const GN: Record<string, string> = {
      fleurs: 'fp', gâteau: 'ms', lettre: 'fs', livres: 'mp', photos: 'fp', robe: 'fs', chansons: 'fp', exercices: 'mp', décision: 'fs', erreurs: 'fp',
      clés: 'fp', efforts: 'mp', aventure: 'fs', difficultés: 'fp', maison: 'fs', cadeaux: 'mp',
    };
    partout('accord-participe-cod-relatif-3e', (item) => {
      const phrase = item.consigne.split(' : ')[1]!;
      const formes = [...item.options!].sort((x, y) => x.length - y.length);
      const base = formes[0]!;
      if (phrase.includes(' dont ')) return expect(item.reponse).toBe(base);
      const nom = Object.keys(GN).find((k) => phrase.includes(k))!;
      const genre = GN[nom]!;
      const fin = genre === 'ms' ? '' : genre === 'fs' ? 'e' : genre === 'fp' ? 'es' : base.endsWith('s') ? '' : 's';
      expect(item.reponse, phrase).toBe(base + fin);
    });
  });

  it('accord sujet-verbe : singulier pour les pronoms distributifs, noyau du groupe nominal sinon', () => {
    partout('accord-sujets-complexes-3e', (item) => {
      const phrase = item.consigne.split(' : ')[1]!;
      const pluriel = /^Les /.test(phrase);
      // Le verbe attendu ne se termine pas par s (3e personne du singulier) ou se termine par -ent/-ont (pluriel).
      if (pluriel) expect(item.reponse).toMatch(/(ent|ont)$/);
      else expect(item.reponse).toMatch(/(a|t|e|it)$/);
    });
  });

  it('accord et fonction de l’adjectif', () => {
    partout('accord-adjectif-fonctions-3e', (item) => {
      const c = item.consigne;
      if (c.includes('quelle est la fonction')) {
        const phrase = c.match(/« (.+?) », quelle/)![1]!;
        const adj = c.match(/fonction de « (.+) » \?/)![1]!;
        const i = phrase.toLowerCase().indexOf(adj);
        const avant = phrase.slice(0, i).trim();
        const apres = phrase.slice(i + adj.length);
        const attendu = avant === '' || avant.endsWith(',') || apres.startsWith(' et') && avant.endsWith(',') ? 'apposition'
          : /(sont vraiment|semble|paraissent bien|trouve ces exercices|restèrent|semblent très)$/.test(avant) ? 'attribut' : 'épithète';
        expect(item.reponse, phrase).toBe(attendu);
        return;
      }
      // Accord : les noms qualifiés, ressaisis avec leur genre et leur nombre.
      const ACCORD: [string, string][] = [
        ['rues', 'fp'], ['histoires', 'fp'], ['randonneurs', 'mp'], ['sœur semble', 'fs'], ['chaussures', 'fp'], ['La mer', 'fs'], ['pommes', 'fp'],
        ['voiture et un camion', 'mp'], ['petite fille', 'fs'], ['exercices', 'mp'], ['fleurs', 'fp'], ['cousines', 'fp'], ['veste et un pantalon', 'mp'],
        ['enfants', 'mp'], ['vieille maison', 'fs'], ['légendes', 'fp'], ['questions', 'fp'], ['deux sœurs', 'fp'],
      ];
      const genre = ACCORD.find(([k]) => c.includes(k))![1];
      const r = item.reponse.toLowerCase();
      if (genre === 'fp') expect(r).toMatch(/es$/);
      else if (genre === 'mp') expect(r).toMatch(/s$/);
      else expect(r).toMatch(/e$/);
    });
  });

  it('connotation, racines, radicaux, homophones : tables ressaisies', () => {
    const PEJORATIFS = ['canasson', 'masure', 'navet', 'puanteur', 'chauffard', 'torchon', 'pitance', 'jaunâtre', 'politicard', 'guimbarde', 'reluquer', 'maigrichon',
      'écrivaillon', 'jacasser', 'blanchâtre', 'rougeaud', 'taudis', 'gribouillis'];
    const MELIORATIFS = ['destrier', 'demeure', 'chef-d’œuvre', 'parfum', 'festin', 'doré', 'homme d’État', 'contempler', 'svelte', 'immaculé', 'vermeil'];
    partout('denotation-connotation-3e', (item) => {
      const cible = item.consigne.match(/connotation (\p{L}+)/u)![1];
      if (cible === 'péjorative') expect(PEJORATIFS).toContain(item.reponse);
      else if (cible === 'méliorative') expect(MELIORATIFS).toContain(item.reponse);
      else {
        expect(PEJORATIFS).not.toContain(item.reponse);
        expect(MELIORATIFS).not.toContain(item.reponse);
      }
      expect(item.options!.filter((o) => (cible === 'péjorative' ? PEJORATIFS : cible === 'méliorative' ? MELIORATIFS : []).includes(o))).toHaveLength(cible === 'neutre' ? 0 : 1);
    });
    const SENS: Record<string, string> = {
      chrono: 'le temps', géo: 'la terre', bio: 'la vie', graph: 'écrire', phon: 'le son, la voix', micro: 'petit', télé: 'loin', hydr: 'l’eau', poly: 'plusieurs',
      anthropo: 'l’être humain', démo: 'le peuple', phile: 'qui aime', phobe: 'qui craint', omni: 'tout', vore: 'qui mange', cide: 'qui tue', biblio: 'le livre',
      hippo: 'le cheval', thermo: 'la chaleur', psych: 'l’esprit', archéo: 'ancien', ortho: 'droit, correct', pyro: 'le feu', xéno: 'l’étranger', cardio: 'le cœur',
      auto: 'soi-même', mégalo: 'grand',
    };
    partout('racines-savantes-3e', (item) => {
      const [, mot, element] = item.consigne.match(/« (.+?) », que signifie l’élément « (.+?) »/)!;
      expect(mot).toContain(element);
      expect(item.reponse).toBe(SENS[element!]);
    });
    const RADICAUX: [string, string][] = [
      ['je … plus souvent', 'courrais'], ['je … ce film', 'verrais'], ['nous … une carte', 'enverrions'], ['Tu … venir', 'pourrais'], ['tu … tes devoirs', 'fasses'],
      ['nous … patients', 'soyons'], ['vous … à l’heure', 'soyez'], ['vous … raison', 'ayez'], ['il … de froid', 'mourrait'], ['il … ses amis', 'croie'],
      ['il … assez vite', 'coure'], ['vous … le médecin', 'voyiez'], ['vous … de l’expérience', 'acquerriez'], ['j’… ce colis', 'envoie'], ['ils … contents', 'soient'],
      ['elle … le monde', 'parcourrait'], ['nous … une décision', 'prenions'], ['tu … ce problème', 'résolves'], ['je … ce château', 'acquerrais'],
    ];
    partout('radicaux-verbaux-3e', (item) => expect(item.reponse).toBe(RADICAUX.find(([k]) => item.consigne.includes(k))![1]));
    const HOMO: [string, string][] = [
      ['mal au', 'cou'], ['marin regarde', 'mer'], ['boulanger', 'pain'], ['de fées', 'conte'], ['passons à table', 'faim'], ['boit un', 'verre'], ['jardinier', 'seau'],
      ['du village célèbre', 'maire'], ['cerfs', 'rennes'], ['animal de la ferme', 'porc'], ['trois …', 'fois'], ['euros au loto', 'cent'], ['arriver au village', 'voie'],
      ['cavalier', 'rênes'], ['bon sens', 'sensé'], ['ta leçon', 'censé'], ['entre au', 'port'], ['chevalier', 'foi'], ['trop mangé', 'foie'], ['accident', 'sang'],
      ['dire au revoir', 'sans'], ['récréation', 'cour'], ['pantalon', 'court'],
    ];
    partout('homophones-lexicaux-3e', (item) => expect(item.reponse).toBe(HOMO.find(([k]) => item.consigne.includes(k))![1]));
  });
});

describe('variété 3e', () => {
  // Domaines fermés : corpus rédigés à la main ou valeurs en nombre limité.
  const FERMES: Record<string, number> = {
    'decomposition-facteurs-premiers-3e': 15, 'identites-remarquables-3e': 18, 'puissances-negatives-3e': 6, 'equation-carre-3e': 11, 'volume-boule-3e': 25, 'sections-solides-3e': 9,
    'phrase-emphatique-3e': 8, 'pronom-relatif-3e': 6, 'connecteurs-logiques-3e': 6, 'discours-indirect-libre-3e': 6, 'subjonctif-passe-3e': 6,
    'identifier-temps-3e': 8, 'valeurs-conditionnel-3e': 6, 'accord-participe-cod-relatif-3e': 6, 'accord-sujets-complexes-3e': 6,
    'accord-adjectif-fonctions-3e': 6, 'denotation-connotation-3e': 8, 'racines-savantes-3e': 15, 'radicaux-verbaux-3e': 6, 'homophones-lexicaux-3e': 7,
  };
  it.each(GENERATEURS_TROISIEME.filter((g) => !g.id.endsWith('-2020')).map((g) => g.id))('%s : assez de consignes distinctes, d1 différente de d3', (id) => {
    const consignes = DIFFICULTES.map((d) => new Set(GRAINES.map((s) => generateur(id).generer(s, d).consigne)));
    for (const ens of consignes) expect(ens.size).toBeGreaterThanOrEqual(FERMES[id] ?? 25);
    expect([...consignes[0]!].some((x) => !consignes[2]!.has(x))).toBe(true);
  });
});
