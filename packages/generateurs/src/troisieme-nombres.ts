// 3e, nombres et calculs (programme 2026) : décomposition en facteurs premiers, fractions irréductibles, puissances
// d'exposant négatif, produits et quotients de puissances, notation scientifique, équations x² = a, double
// distributivité, identités remarquables, équations produit nul, inéquations ax ⩾ b.
// Source : programme de mathématiques du cycle 4 (arrêté du 18 février 2026, BO n°10 du 5 mars 2026), p. 43 et 44.
import { decaler, depuisEntier } from './decimaux';
import { creerGenerateur, fr, frDecimal, options } from './outils';
import { ecrireRelatif } from './relatifs-c4';

const pgcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : pgcd(y, x % y));
const CHIFFRES_EXPOSANT = '⁰¹²³⁴⁵⁶⁷⁸⁹';
/** Exposant en caractères supérieurs : −3 → « ⁻³ ». */
export const exposant = (n: number) => (n < 0 ? '⁻' : '') + [...String(Math.abs(n))].map((c) => CHIFFRES_EXPOSANT[Number(c)]).join('');
const puissance = (base: string | number, n: number) => `${base}${exposant(n)}`;
const signe = (a: { suivant: () => number }) => (a.suivant() < 0.5 ? -1 : 1);
/** Relatif dans un produit : parenthèses s'il est négatif. */
const facteurRelatif = (n: number) => (n < 0 ? `(${ecrireRelatif(n)})` : String(n));

/** Écriture d'un polynôme c2 x² + c1 x + c0, sans terme nul ni coefficient 1 inutile. */
export function polynome(c2: number, c1: number, c0: number): string {
  const termes: [number, string][] = [[c2, 'x²'], [c1, 'x'], [c0, '']];
  let s = '';
  for (const [c, partie] of termes) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const corps = partie && abs === 1 ? partie : `${abs}${partie}`;
    s += s === '' ? `${c < 0 ? '−' : ''}${corps}` : ` ${c < 0 ? '−' : '+'} ${corps}`;
  }
  return s || '0';
}
/** « x + 3 », « 2x − 5 » */
export const affine = (k: number, b: number) => polynome(0, k, b);

// ─────────── Décomposition en produit de facteurs premiers

const PREMIERS = [2, 3, 5, 7, 11, 13];
/** Décomposition d'un entier ≥ 2 : liste [premier, exposant]. */
export function decomposer(n: number): [number, number][] {
  const res: [number, number][] = [];
  let reste = n;
  for (let p = 2; p * p <= reste; p++) {
    let e = 0;
    while (reste % p === 0) {
      reste /= p;
      e++;
    }
    if (e) res.push([p, e]);
  }
  if (reste > 1) res.push([reste, 1]);
  return res;
}
const ecrireDecomposition = (f: [number | string, number][]) => f.map(([p, e]) => (e === 1 ? String(p) : puissance(p, e))).join(' × ');

export const decomposition3e = creerGenerateur({
  id: 'decomposition-facteurs-premiers-3e',
  competence: 'MA-C4-3E-DIV-01',
  cycle: 4,
  description: 'Décomposer un entier positif en produit de facteurs premiers.',
  generer(a, d) {
    const max = d === 1 ? 120 : d === 2 ? 600 : 3000;
    let f: [number, number][] = [];
    let n = 1;
    // Au moins deux facteurs premiers distincts et une puissance, pour que les pièges aient un sens.
    while (f.length < 2 || f.every(([, e]) => e === 1) || n > max || n < 12) {
      const choix = a.melanger(PREMIERS.slice(0, d === 1 ? 3 : d === 2 ? 4 : 6)).slice(0, a.entier(2, 3)).sort((x, y) => x - y);
      f = choix.map((p) => [p, p < 5 ? a.entier(1, d === 1 ? 3 : 4) : a.entier(1, 2)]);
      n = f.reduce((s, [p, e]) => s * p ** e, 1);
    }
    const reponse = ecrireDecomposition(f);
    const i = f.findIndex(([, e]) => e >= 2);
    const [p, e] = f[i]!;
    // Piège 1 : un facteur non premier (égalité juste, mais pas une décomposition en facteurs premiers).
    const nonPremier = ecrireDecomposition(f.map(([q, x], j): [number, number] => (j === i ? [q ** 2, 1] : [q, x])).concat(e > 2 ? [[p, e - 2]] : []).sort((x, y) => x[0] - y[0]));
    // Pièges 2 et 3 : exposant faux.
    const plus = ecrireDecomposition(f.map(([q, x], j): [number, number] => (j === i ? [q, x + 1] : [q, x])));
    const autre = f.length > 1 ? f.findIndex((_, j) => j !== i) : i;
    const moins = ecrireDecomposition(f.map(([q, x], j): [number, number] => (j === autre ? [q, x + 1] : j === i ? [q, x - 1] : [q, x])));
    return {
      gabarit: 'qcm',
      consigne: `Quelle est la décomposition de ${fr(n)} en produit de facteurs premiers ?`,
      options: options(a, reponse, [nonPremier, plus, moins], () => ecrireDecomposition(f.map(([q, x]): [number, number] => [q, x + a.entier(1, 2)]))),
      reponse,
      indice: 'Divise par 2 tant que c’est possible, puis par 3, par 5, par 7… Chaque facteur doit être un nombre premier.',
      explication: `On divise successivement par des nombres premiers : ${fr(n)} = ${reponse}. ${p ** 2} n’est pas premier, il ne peut pas apparaitre.`,
    };
  },
});

// ─────────── Fraction irréductible

const PREMIERS_ENTRE_EUX = (max: number) => {
  const res: [number, number][] = [];
  for (let q = 2; q <= max; q++) for (let p = 1; p < q; p++) if (pgcd(p, q) === 1) res.push([p, q]);
  return res;
};

export const irreductible3e = creerGenerateur({
  id: 'fraction-irreductible-3e',
  competence: 'MA-C4-3E-FRAC-01',
  cycle: 4,
  description: 'Rendre une fraction irréductible à l’aide des décompositions en facteurs premiers.',
  generer(a, d) {
    const [p, q] = a.choisir(PREMIERS_ENTRE_EUX(d === 1 ? 9 : d === 2 ? 12 : 15));
    const g = a.choisir(d === 1 ? [4, 6, 8, 9, 10, 12] : d === 2 ? [12, 14, 15, 18, 21, 24] : [18, 24, 28, 30, 36, 42, 45]);
    const [n, m] = [p * g, q * g];
    const commun = ecrireDecomposition(decomposer(g));
    return {
      gabarit: 'saisie',
      consigne: `Rends la fraction ${n}/${m} irréductible.`,
      reponse: `${p}/${q}`,
      indice: 'Décompose le numérateur et le dénominateur en facteurs premiers, puis simplifie par les facteurs communs.',
      explication: `${n} = ${ecrireDecomposition(decomposer(n))} et ${m} = ${ecrireDecomposition(decomposer(m))}. Facteurs communs : ${commun} = ${g}. Donc ${n}/${m} = ${p}/${q}.`,
    };
  },
});

// ─────────── Puissances d'exposant négatif

export const puissancesNegatives3e = creerGenerateur({
  id: 'puissances-negatives-3e',
  competence: 'MA-C4-3E-PUIS-01',
  cycle: 4,
  description: 'Utiliser la définition des puissances d’exposant négatif.',
  generer(a, d) {
    if (d === 1) {
      const n = a.entier(1, 6);
      const reponse = depuisEntier(1, n);
      return {
        gabarit: 'qcm',
        consigne: `Quelle est l’écriture décimale de ${puissance(10, -n)} ?`,
        options: options(a, reponse, [depuisEntier(1, n + 1), n > 1 ? depuisEntier(1, n - 1) : '10', `−${fr(10 ** n)}`], () => depuisEntier(1, n + 2)),
        reponse,
        indice: `10 puissance −n, c’est 1 divisé par 10 puissance n.`,
        explication: `${puissance(10, -n)} = 1/${fr(10 ** n)} = ${reponse}. Le chiffre un est en position ${n} derrière la virgule.`,
      };
    }
    if (d === 2) {
      const base = a.entier(2, 5);
      const n = a.entier(1, base === 2 ? 5 : 3);
      return {
        gabarit: 'saisie',
        consigne: `Écris ${puissance(base, -n)} sous la forme d’une fraction.`,
        reponse: `1/${base ** n}`,
        indice: 'a puissance −n est l’inverse de a puissance n.',
        explication: `${puissance(base, -n)} = 1/${puissance(base, n)} = 1/${base ** n}.`,
      };
    }
    // Écrire un nombre sous la forme d'une puissance d'exposant négatif.
    if (a.suivant() < 0.5) {
      const n = a.entier(2, 7);
      const reponse = puissance(10, -n);
      return {
        gabarit: 'qcm',
        consigne: `Écris ${depuisEntier(1, n)} sous la forme d’une puissance de 10.`,
        options: options(a, reponse, [puissance(10, n), puissance(10, -(n + 1)), puissance(10, -(n - 1))], () => puissance(10, -(n + 2))),
        reponse,
        indice: 'Repère le rang du chiffre un après la virgule.',
        explication: `${depuisEntier(1, n)} = 1/${fr(10 ** n)} = ${reponse}.`,
      };
    }
    const base = a.choisir([2, 3, 5]);
    const n = a.entier(2, base === 2 ? 6 : 4);
    const reponse = puissance(base, -n);
    return {
      gabarit: 'qcm',
      consigne: `Écris 1/${base ** n} sous la forme d’une puissance de ${base}.`,
      options: options(a, reponse, [puissance(base, n), `−${puissance(base, n)}`, puissance(base, -(n + 1))], () => puissance(base, -(n + 2))),
      reponse,
      indice: `Écris d’abord ${base ** n} comme une puissance de ${base}.`,
      explication: `${base ** n} = ${puissance(base, n)}, donc 1/${base ** n} = 1/${puissance(base, n)} = ${reponse}.`,
    };
  },
});

// ─────────── Multiplier et diviser des puissances

export const operationsPuissances3e = creerGenerateur({
  id: 'operations-puissances-3e',
  competence: 'MA-C4-3E-PUIS-02',
  cycle: 4,
  description: 'Multiplier et diviser des puissances d’un même nombre, exposants relatifs.',
  generer(a, d) {
    const base = a.choisir(d === 1 ? ['10', '2', '3'] : ['10', '2', '5', 'a', 'x']);
    let m = a.entier(2, 9) * signe(a);
    let n = a.entier(2, 9) * signe(a);
    if (d === 1) [m, n] = [Math.abs(m), -Math.abs(n)];
    if (d < 3) {
      const div = d === 2;
      const r = div ? m - n : m + n;
      const reponse = puissance(base, r);
      const pieges = div ? [puissance(base, m + n), puissance(base, n - m)] : [puissance(base, m * n), puissance(base, m - n)];
      return {
        gabarit: 'qcm',
        consigne: `Écris sous la forme d’une seule puissance : ${puissance(base, m)} ${div ? '÷' : '×'} ${puissance(base, n)}`,
        options: options(a, reponse, pieges, () => puissance(base, r + a.entier(1, 3) * signe(a))),
        reponse,
        indice: div ? 'Pour diviser deux puissances d’un même nombre, on soustrait les exposants.' : 'Pour multiplier deux puissances d’un même nombre, on additionne les exposants.',
        explication: div ? `On soustrait les exposants : ${ecrireRelatif(m)} − ${facteurRelatif(n)} = ${ecrireRelatif(r)}. Résultat : ${reponse}.` : `On additionne les exposants : ${ecrireRelatif(m)} + ${facteurRelatif(n)} = ${ecrireRelatif(r)}. Résultat : ${reponse}.`,
      };
    }
    // Enchainement : (b^m × b^n) ÷ b^p.
    const p = a.entier(1, 9) * signe(a);
    const r = m + n - p;
    const reponse = puissance(base, r);
    return {
      gabarit: 'qcm',
      consigne: `Écris sous la forme d’une seule puissance : ${puissance(base, m)} × ${puissance(base, n)} ÷ ${puissance(base, p)}`,
      options: options(a, reponse, [puissance(base, m + n + p), puissance(base, m * n - p), puissance(base, p - m - n)], () => puissance(base, r + a.entier(1, 3) * signe(a))),
      reponse,
      indice: 'Additionne les exposants du produit, puis soustrais celui du diviseur.',
      explication: `${ecrireRelatif(m)} + ${facteurRelatif(n)} − ${facteurRelatif(p)} = ${ecrireRelatif(r)}. Résultat : ${reponse}.`,
    };
  },
});

// ─────────── Notation scientifique

const scientifique = (mantisse: string, n: number) => `${mantisse} × ${puissance(10, n)}`;

export const notationScientifique3e = creerGenerateur({
  id: 'notation-scientifique-3e',
  competence: 'MA-C4-3E-SCI-01',
  cycle: 4,
  description: 'Déterminer la notation scientifique d’un nombre décimal.',
  generer(a, d) {
    // Mantisse à un ou deux chiffres significatifs : 4 ; 4,5 ; 1,25.
    const chiffres = a.choisir([1, 2, 2, 3]);
    let k = a.entier(10 ** (chiffres - 1), 10 ** chiffres - 1);
    while (chiffres > 1 && k % 10 === 0) k = a.entier(10 ** (chiffres - 1), 10 ** chiffres - 1);
    const mantisse = depuisEntier(k, chiffres - 1);
    const n = d === 1 ? a.entier(3, 8) : d === 2 ? -a.entier(2, 6) : a.entier(-6, 9) || 4;
    const reponse = scientifique(mantisse, n);
    const decale = (x: number) => decaler(mantisse, x);
    let consigne: string;
    let pieges: string[];
    if (d < 3) {
      const nombre = frDecimal(decale(n));
      consigne = `Quelle est la notation scientifique de ${nombre} ?`;
      pieges = [scientifique(mantisse, n > 0 ? n - 1 : n + 1), scientifique(mantisse, -n), `${decale(1)} × ${puissance(10, n - 1)}`];
    } else {
      // Nombre déjà écrit avec une puissance de 10, mais mantisse hors de [1 ; 10[.
      const decalage = a.choisir([-2, -1, 1, 2]);
      consigne = `Écris en notation scientifique : ${frDecimal(decale(decalage))} × ${puissance(10, n - decalage)}`;
      pieges = [scientifique(mantisse, n - 2 * decalage), scientifique(mantisse, n - decalage), `${decale(decalage)} × ${puissance(10, n - decalage + 1)}`];
    }
    return {
      gabarit: 'qcm',
      consigne,
      options: options(a, reponse, pieges.filter((p) => p !== reponse), () => scientifique(mantisse, n + a.entier(2, 3))),
      reponse,
      indice: 'Notation scientifique : a × 10ⁿ avec a supérieur ou égal à 1 et strictement inférieur à 10.',
      explication: `Le nombre devant la puissance de 10 doit être entre 1 et 10 : ${mantisse}. On compte le décalage de la virgule : ${reponse}.`,
    };
  },
});

// ─────────── Équations x² = a

export const equationCarre3e = creerGenerateur({
  id: 'equation-carre-3e',
  competence: 'MA-C4-3E-RAC-01',
  cycle: 4,
  description: 'Résoudre une équation de la forme x² = a.',
  generer(a, d) {
    const formes = d === 1 ? ['carre'] : d === 2 ? ['carre', 'carre', 'negatif', 'decale'] : ['non-carre', 'non-carre', 'decale', 'negatif'];
    const forme = a.choisir(formes);
    const r = a.entier(2, d === 1 ? 12 : 15);
    let valeur = r * r;
    if (forme === 'negatif') valeur = -a.entier(1, 50);
    if (forme === 'non-carre') {
      do valeur = a.entier(2, 99);
      while (Number.isInteger(Math.sqrt(valeur)));
    }
    const b = a.entier(1, 20);
    const consigne = forme === 'decale' ? `Résous l’équation : x² + ${b} = ${valeur + b}` : `Résous l’équation : x² = ${ecrireRelatif(valeur)}`;
    const AUCUNE = 'aucune solution';
    const deux = (s: string) => `x = −${s} ou x = ${s}`;
    const reponse = valeur < 0 ? AUCUNE : forme === 'non-carre' ? deux(`√${valeur}`) : deux(String(r));
    const pieges = valeur < 0 ? [deux(`√${-valeur}`), `x = −√${-valeur}`, `x = ${-valeur / 2}`.replace('.', ',')]
      : forme === 'non-carre' ? [`x = √${valeur}`, deux(String(valeur)), AUCUNE]
        : [`x = ${r}`, deux(String(valeur)), `x = ${(valeur / 2).toString().replace('.', ',')}`];
    return {
      gabarit: 'qcm',
      consigne,
      options: options(a, reponse, pieges, () => deux(String(r + 1))),
      reponse,
      indice: 'Un carré n’est jamais négatif. Si a est positif, x² = a a deux solutions opposées : √a et −√a.',
      explication: valeur < 0
        ? `Un carré est toujours positif ou nul : il ne peut pas valoir ${ecrireRelatif(valeur)}. L’équation n’a ${AUCUNE}.`
        : `${forme === 'decale' ? `On isole x² : x² = ${valeur + b} − ${b} = ${valeur}. ` : ''}${valeur} est positif : deux solutions opposées. ${forme === 'non-carre' ? `${valeur} n’est pas un carré parfait, on garde √${valeur}.` : `${r}² = ${valeur}.`} Solutions : ${reponse}.`,
    };
  },
});

// ─────────── Double distributivité

export const doubleDistributivite3e = creerGenerateur({
  id: 'double-distributivite-3e',
  competence: 'MA-C4-3E-LIT-01',
  cycle: 4,
  description: 'Développer avec la double distributivité, factoriser avec un facteur commun apparent.',
  generer(a, d) {
    const p = a.entier(1, 9) * (d === 1 ? 1 : signe(a));
    const q = a.entier(1, 9) * (d === 1 ? 1 : signe(a));
    if (d < 3) {
      const k = d === 2 && a.suivant() < 0.5 ? a.entier(2, 5) : 1;
      // (kx + p)(x + q) = kx² + (kq + p)x + pq
      const reponse = polynome(k, k * q + p, p * q);
      return {
        gabarit: 'qcm',
        consigne: `Développe et réduis : (${affine(k, p)})(${affine(1, q)})`,
        options: options(a, reponse, [polynome(k, 0, p * q), polynome(k, k * q + p, p + q), polynome(k, k * q - p, -p * q), polynome(0, k + 1, p * q)].filter((x) => x !== reponse), () => polynome(k, k * q + p + a.entier(1, 3), p * q)),
        reponse,
        indice: 'Chaque terme de la première parenthèse multiplie chaque terme de la seconde : quatre produits.',
        explication: `${affine(k, 0)} × x = ${polynome(k, 0, 0)} ; ${affine(k, 0)} × ${facteurRelatif(q)} = ${polynome(0, k * q, 0)} ; ${facteurRelatif(p)} × x = ${polynome(0, p, 0)} ; ${facteurRelatif(p)} × ${facteurRelatif(q)} = ${ecrireRelatif(p * q)}. On réduit : ${reponse}.`,
      };
    }
    // Facteur commun apparent : (x + p)(bx + c) + (x + p)(ex + f) = (x + p)((b + e)x + (c + f)).
    const b = a.entier(1, 5);
    let e = a.entier(1, 5) * signe(a);
    if (b + e === 0) e += 1;
    const c = a.entier(1, 9) * signe(a);
    let f = a.entier(1, 9) * signe(a);
    // Pas de facteur au carré déguisé : (x + p)(x + p).
    if (b + e === 1 && c + f === p) f += f > 0 ? -1 : 1;
    const facteur = `(${affine(1, p)})`;
    const reponse = `${facteur}(${affine(b + e, c + f)})`;
    const pieges = [`${facteur}(${affine(b - e, c - f)})`, `${facteur}²(${affine(b + e, c + f)})`, `${facteur}(${affine(b * e, c * f)})`];
    return {
      gabarit: 'qcm',
      consigne: `Factorise : ${facteur}(${affine(b, c)}) + ${facteur}(${affine(e, f)})`,
      options: options(a, reponse, pieges.filter((x) => x !== reponse), () => `${facteur}(${affine(b + e, c + f + a.entier(1, 3))})`),
      reponse,
      indice: `Le facteur commun ${facteur} est apparent : mets-le devant, puis additionne ce qui reste.`,
      explication: `Le facteur commun est ${facteur}. Il reste (${affine(b, c)}) + (${affine(e, f)}) = ${affine(b + e, c + f)}. Résultat : ${reponse}.`,
    };
  },
});

// ─────────── Identités remarquables

export const identites3e = creerGenerateur({
  id: 'identites-remarquables-3e',
  competence: 'MA-C4-3E-LIT-02',
  cycle: 4,
  description: 'Développer et factoriser avec les trois identités remarquables.',
  generer(a, d) {
    const k = d === 1 ? 1 : a.choisir([1, 1, 2, 3]);
    let b = a.entier(1, 9);
    // (2x − 2)² se factoriserait encore : b premier avec k.
    while (pgcd(k, b) !== 1) b = a.entier(1, 9);
    const kx = k === 1 ? 'x' : `${k}x`;
    const forme = a.choisir(d === 1 ? ['somme', 'difference'] : ['somme', 'difference', 'produit']);
    if (d < 3) {
      const [depart, reponse, pieges] =
        forme === 'somme'
          ? [`(${kx} + ${b})²`, polynome(k * k, 2 * k * b, b * b), [polynome(k * k, 0, b * b), polynome(k * k, k * b, b * b), polynome(k * k, 2 * k * b, 2 * b)]]
          : forme === 'difference'
            ? [`(${kx} − ${b})²`, polynome(k * k, -2 * k * b, b * b), [polynome(k * k, 0, -b * b), polynome(k * k, -2 * k * b, -b * b), polynome(k * k, 2 * k * b, b * b)]]
            : [`(${kx} − ${b})(${kx} + ${b})`, polynome(k * k, 0, -b * b), [polynome(k * k, 0, b * b), polynome(k * k, -2 * k * b, -b * b), polynome(k * k, -2 * k * b, b * b)]];
      return {
        gabarit: 'qcm',
        consigne: `Développe avec une identité remarquable : ${depart}`,
        options: options(a, reponse, pieges.filter((x) => x !== reponse), () => polynome(k * k, a.entier(1, 9), b * b + 1)),
        reponse,
        indice: forme === 'produit' ? '(a − b)(a + b) = a² − b².' : forme === 'somme' ? '(a + b)² = a² + 2ab + b².' : '(a − b)² = a² − 2ab + b².',
        explication: `Ici a = ${kx} et b = ${b}. ${forme === 'produit' ? `a² − b² = ${polynome(k * k, 0, 0)} − ${b * b}` : `a² = ${polynome(k * k, 0, 0)}, 2ab = ${2 * k * b}x, b² = ${b * b}`}. Résultat : ${reponse}.`,
      };
    }
    // Factoriser.
    const [depart, reponse, pieges] =
      forme === 'somme'
        ? [polynome(k * k, 2 * k * b, b * b), `(${kx} + ${b})²`, [`(${kx} − ${b})²`, `(${kx} + ${2 * b})²`, `(${kx} − ${b})(${kx} + ${b})`]]
        : forme === 'difference'
          ? [polynome(k * k, -2 * k * b, b * b), `(${kx} − ${b})²`, [`(${kx} + ${b})²`, `(${kx} − ${b})(${kx} + ${b})`, `(${kx} − ${2 * b})²`]]
          : [polynome(k * k, 0, -b * b), `(${kx} − ${b})(${kx} + ${b})`, [`(${kx} − ${b})²`, `(${kx} + ${b})²`, `(${b} − ${kx})(${b} + ${kx})`]];
    return {
      gabarit: 'qcm',
      consigne: `Factorise avec une identité remarquable : ${depart}`,
      options: options(a, reponse, pieges, () => `(${kx} + ${b + 1})²`),
      reponse,
      indice: 'Repère les deux carrés, puis regarde s’il reste un double produit et son signe.',
      explication: `${polynome(k * k, 0, 0)} = (${kx})² et ${b * b} = ${b}². ${forme === 'produit' ? 'C’est une différence de deux carrés' : `Le double produit vaut ${2 * k * b}x`}. Résultat : ${reponse}.`,
    };
  },
});

// ─────────── Équation produit nul

const fractionOuEntier = (n: number, m: number) => {
  const g = pgcd(n, m);
  const [p, q] = [n / g, m / g];
  const s = p * q < 0 ? '−' : '';
  return Math.abs(q) === 1 ? `${s}${Math.abs(p)}` : `${s}${Math.abs(p)}/${Math.abs(q)}`;
};
const solutions = (x: [number, number], y: [number, number]) => {
  const [u, v] = [x[0] / x[1], y[0] / y[1]] ;
  const [premier, second] = u <= v ? [x, y] : [y, x];
  return `x = ${fractionOuEntier(...premier)} ou x = ${fractionOuEntier(...second)}`;
};

export const produitNul3e = creerGenerateur({
  id: 'equation-produit-nul-3e',
  competence: 'MA-C4-3E-EQ-01',
  cycle: 4,
  description: 'Résoudre une équation produit nul.',
  generer(a, d) {
    const k = d === 3 ? a.entier(2, 5) : 1;
    const q = a.entier(1, 9) * (d === 1 ? 1 : signe(a));
    let p = a.entier(1, 9) * (d === 1 ? 1 : signe(a));
    // Deux solutions distinctes : p/k ≠ −q.
    while (p === -q * k) p = a.entier(1, 9) * (d === 1 ? 1 : signe(a));
    // (kx − p)(x + q) = 0 ⇔ x = p/k ou x = −q
    const reponse = solutions([p, k], [-q, 1]);
    const pieges = [solutions([-p, k], [q, 1]), solutions([p, k], [q, 1]), k > 1 && p !== -q ? solutions([p, 1], [-q, 1]) : `x = ${fractionOuEntier(p, k)}`];
    return {
      gabarit: 'qcm',
      consigne: `Résous l’équation : (${affine(k, -p)})(${affine(1, q)}) = 0`,
      options: options(a, reponse, pieges.filter((x) => x !== reponse), () => solutions([p + 1, k], [-q, 1])),
      reponse,
      indice: 'Un produit est nul si et seulement si l’un de ses facteurs est nul.',
      explication: `${affine(k, -p)} = 0 donne x = ${fractionOuEntier(p, k)} ; ${affine(1, q)} = 0 donne x = ${ecrireRelatif(-q)}. Solutions : ${reponse}.`,
    };
  },
});

// ─────────── Inéquations du premier degré

const SENS: Record<string, string> = { '⩾': '⩽', '⩽': '⩾', '>': '<', '<': '>' };

export const inequation3e = creerGenerateur({
  id: 'inequation-3e',
  competence: 'MA-C4-3E-INEQ-01',
  cycle: 4,
  description: 'Résoudre une inéquation du premier degré du type ax ⩾ b, y compris avec a négatif.',
  generer(a, d) {
    const k = a.entier(2, 9) * (d === 1 ? 1 : d === 2 ? -1 : signe(a));
    const s = a.entier(1, 9) * signe(a);
    const symbole = a.choisir(['⩾', '⩽', '>', '<']);
    const b = d === 3 ? a.entier(1, 9) * signe(a) : 0;
    const droite = k * s + b;
    const gauche = d === 3 ? affine(k, b) : affine(k, 0);
    const final = k < 0 ? SENS[symbole]! : symbole;
    const reponse = `x ${final} ${ecrireRelatif(s)}`;
    const pieges = [`x ${k < 0 ? symbole : SENS[symbole]} ${ecrireRelatif(s)}`, `x ${final} ${ecrireRelatif(-s)}`, `x ${symbole} ${ecrireRelatif(droite - k - b)}`];
    return {
      gabarit: 'qcm',
      consigne: `Résous l’inéquation : ${gauche} ${symbole} ${ecrireRelatif(droite)}`,
      options: options(a, reponse, pieges.filter((x) => x !== reponse), () => `x ${final} ${ecrireRelatif(s + a.entier(1, 3))}`),
      reponse,
      indice: 'On divise les deux membres par le coefficient de x. S’il est négatif, le sens de l’inégalité change.',
      explication: `${b ? `On ${b > 0 ? `soustrait ${b}` : `ajoute ${-b}`} : ${affine(k, 0)} ${symbole} ${ecrireRelatif(droite - b)}. ` : ''}On divise par ${ecrireRelatif(k)}${k < 0 ? ', négatif : le sens change' : ', positif : le sens ne change pas'}. Résultat : ${reponse}.`,
    };
  },
});
