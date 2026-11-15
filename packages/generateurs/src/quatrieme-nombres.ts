// 4e, nombres et calculs (programme 2026) : relatifs (produit, quotient, enchainements), fractions (simplifier,
// multiplier, diviser), puissances, racine carrée, distributivité, équations ax + b = c.
// Source : programme de mathématiques du cycle 4 (arrêté du 18 février 2026, BO n°10 du 5 mars 2026), p. 42 et 43.
import { creerGenerateur, fr, options, optionsNumeriques } from './outils';
import { ecrireRelatif, ecrireTerme } from './relatifs-c4';

const pgcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : pgcd(y, x % y));
/** Fraction irréductible, signe devant : (−6, 8) → « −3/4 » ; entier si possible. */
export const irreductible = (n: number, d: number) => {
  const g = pgcd(n, d);
  const [a, b] = [n / g, d / g];
  const signe = a * b < 0 ? '−' : '';
  return Math.abs(b) === 1 ? `${signe}${Math.abs(a)}` : `${signe}${Math.abs(a)}/${Math.abs(b)}`;
};
/** Inverse d'un entier : item de repli quand la fraction tirée vaut 1. */
const diviserParDefaut = (n: number) => ({
  gabarit: 'saisie' as const,
  consigne: `Quel est l’inverse de ${n} ? Écris-le sous forme de fraction.`,
  reponse: `1/${n}`,
  indice: 'L’inverse d’un nombre a, c’est le nombre qui, multiplié par a, donne 1.',
  explication: `${n} × 1/${n} = 1, donc l’inverse de ${n} est 1/${n}.`,
});
const nonNul = (a: { entier: (x: number, y: number) => number; suivant: () => number }, max: number) => a.entier(1, max) * (a.suivant() < 0.5 ? -1 : 1);

// ─────────── Multiplier et diviser des relatifs

export const produitRelatifs4e = creerGenerateur({
  id: 'produit-relatifs-4e',
  competence: 'MA-C4-4E-REL-01',
  cycle: 4,
  description: 'Multiplier et diviser des nombres relatifs : règle des signes.',
  generer(a, d) {
    const x = nonNul(a, d === 1 ? 9 : 12);
    const y = d === 1 ? -a.entier(1, 9) * Math.sign(x) * (a.suivant() < 0.5 ? 1 : -1) : nonNul(a, 12);
    if (d < 3) {
      const r = x * y;
      const reponse = ecrireRelatif(r);
      return {
        gabarit: 'qcm',
        consigne: `Calcule : ${ecrireTerme(x)} × ${ecrireTerme(y)}`,
        options: options(a, reponse, [ecrireRelatif(-r), ecrireRelatif(x + y), ecrireRelatif(-(x + y))], () => ecrireRelatif(r + a.entier(-3, 3))),
        reponse,
        indice: 'Deux facteurs de même signe : produit positif. De signes contraires : produit négatif.',
        explication: `${Math.abs(x)} × ${Math.abs(y)} = ${Math.abs(r)}. Les signes sont ${x * y > 0 ? 'identiques : le produit est positif' : 'contraires : le produit est négatif'}. Résultat : ${reponse}.`,
      };
    }
    // Quotient exact.
    const q = nonNul(a, 12);
    const diviseur = a.entier(2, 9) * (a.suivant() < 0.5 ? -1 : 1);
    const dividende = q * diviseur;
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${ecrireTerme(dividende)} ÷ ${ecrireTerme(diviseur)}`,
      reponse: ecrireRelatif(q),
      indice: 'La règle des signes de la division est la même que celle de la multiplication.',
      explication: `${Math.abs(dividende)} ÷ ${Math.abs(diviseur)} = ${Math.abs(q)}. Les signes sont ${q > 0 ? 'identiques : quotient positif' : 'contraires : quotient négatif'}. Résultat : ${ecrireRelatif(q)}.`,
    };
  },
});

export const enchainementsRelatifs4e = creerGenerateur({
  id: 'enchainements-relatifs-4e',
  competence: 'MA-C4-4E-REL-02',
  cycle: 4,
  description: 'Calculer un enchainement d’opérations avec des nombres relatifs, en respectant les priorités.',
  generer(a, d) {
    const x = nonNul(a, 9);
    const y = nonNul(a, 9);
    const z = nonNul(a, 9);
    let expr: string;
    let r: number;
    if (d === 1) {
      expr = `${ecrireTerme(x)} + ${ecrireTerme(y)} × ${ecrireTerme(z)}`;
      r = x + y * z;
    } else if (d === 2) {
      expr = `${ecrireTerme(x)} × ${ecrireTerme(y)} − ${ecrireTerme(z)} × ${ecrireTerme(x)}`;
      r = x * y - z * x;
    } else {
      expr = `(${ecrireTerme(x)} − ${ecrireTerme(y)}) × ${ecrireTerme(z)}`;
      r = (x - y) * z;
    }
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${expr}`,
      reponse: ecrireRelatif(r),
      indice: 'Parenthèses d’abord, puis multiplications, puis additions et soustractions.',
      explication: d === 1
        ? `${ecrireTerme(y)} × ${ecrireTerme(z)} = ${ecrireRelatif(y * z)}. Puis ${ecrireRelatif(x)} + ${ecrireTerme(y * z)} = ${ecrireRelatif(r)}.`
        : d === 2
          ? `${ecrireRelatif(x * y)} − ${ecrireTerme(z * x)} = ${ecrireRelatif(r)}.`
          : `${ecrireTerme(x)} − ${ecrireTerme(y)} = ${ecrireRelatif(x - y)}. Puis ${ecrireTerme(x - y)} × ${ecrireTerme(z)} = ${ecrireRelatif(r)}.`,
    };
  },
});

// ─────────── Fractions : simplifier, multiplier, diviser

export const simplifierFraction4e = creerGenerateur({
  id: 'simplifier-fraction-4e',
  competence: 'MA-C4-4E-FRAC-01',
  cycle: 4,
  description: 'Simplifier une fraction jusqu’à la forme irréductible.',
  generer(a, d) {
    const premiers = d === 1 ? [2, 3, 5] : [2, 3, 5, 7];
    let num = a.entier(1, 11);
    let den = a.entier(num + 1, 13);
    while (pgcd(num, den) !== 1) den += 1;
    const k = d === 1 ? a.choisir(premiers) : a.choisir(premiers) * a.choisir(d === 2 ? [1, 2] : [2, 3, 4, 6]);
    num *= k;
    den *= k;
    return {
      gabarit: 'saisie',
      consigne: `Écris la fraction ${num}/${den} sous forme irréductible.`,
      reponse: irreductible(num, den),
      indice: 'Divise le numérateur et le dénominateur par un même diviseur commun, jusqu’à ce qu’il n’en reste plus.',
      explication: `${num} et ${den} sont divisibles par ${k}. ${num} ÷ ${k} = ${num / k} et ${den} ÷ ${k} = ${den / k}. ${num}/${den} = ${irreductible(num, den)}.`,
    };
  },
});

export const multiplierFractions4e = creerGenerateur({
  id: 'multiplier-fractions-4e',
  competence: 'MA-C4-4E-FRAC-02',
  cycle: 4,
  description: 'Multiplier des fractions et prendre une fraction d’une fraction ou d’un nombre.',
  generer(a, d) {
    const [d1, d2] = [a.entier(2, 9), a.entier(2, 9)];
    const [n1, n2] = [a.entier(1, d1 - 1), a.entier(1, d2 - 1)];
    if (d === 3) {
      const n = d1 * a.entier(2, 12);
      return {
        gabarit: 'saisie',
        consigne: `Calcule ${n1}/${d1} de ${n}.`,
        reponse: irreductible(n1 * n, d1),
        indice: `Prendre ${n1}/${d1} de ${n}, c’est multiplier ${n} par ${n1}/${d1}.`,
        explication: `${n1}/${d1} × ${n} = ${n1 * n}/${d1} = ${irreductible(n1 * n, d1)}.`,
      };
    }
    const s1 = d === 2 && a.suivant() < 0.5 ? -1 : 1;
    const reponse = irreductible(s1 * n1 * n2, d1 * d2);
    const terme1 = s1 < 0 ? `(−${n1}/${d1})` : `${n1}/${d1}`;
    return {
      gabarit: 'saisie',
      consigne: `Calcule et donne le résultat sous forme irréductible : ${terme1} × ${n2}/${d2}`,
      reponse,
      indice: 'On multiplie les numérateurs entre eux et les dénominateurs entre eux, puis on simplifie.',
      explication: `${s1 < 0 ? '−' : ''}${n1} × ${n2} = ${ecrireRelatif(s1 * n1 * n2)} et ${d1} × ${d2} = ${d1 * d2}. ${ecrireRelatif(s1 * n1 * n2)}/${d1 * d2} = ${reponse}.`,
    };
  },
});

export const diviserFractions4e = creerGenerateur({
  id: 'diviser-fractions-4e',
  competence: 'MA-C4-4E-FRAC-03',
  cycle: 4,
  description: 'Déterminer l’inverse d’un nombre ou d’une fraction ; diviser des fractions.',
  generer(a, d) {
    const [d1, d2] = [a.entier(2, 9), a.entier(2, 9)];
    const [n1, n2] = [a.entier(1, d1 - 1), a.entier(1, d2 - 1)];
    if (d === 1 && n1 === d1) return { ...diviserParDefaut(d1) };
    if (d === 1) {
      const entier = a.suivant() < 0.4;
      const reponse = entier ? `1/${d1}` : irreductible(d1, n1);
      return {
        gabarit: 'qcm',
        consigne: `Quel est l’inverse de ${entier ? d1 : `${n1}/${d1}`} ?`,
        options: optionsNumeriques(a, reponse, entier ? [`${d1}`, `1/${d1 + 1}`, `${d1}/2`] : [`${n1}/${d1}`, irreductible(d1 + n1, d1), `1/${n1 * d1}`], () => `${a.entier(1, 9)}/${a.entier(2, 9)}`),
        reponse,
        indice: 'L’inverse d’un nombre a, c’est le nombre qui, multiplié par a, donne 1.',
        explication: entier
          ? `${d1} × 1/${d1} = 1, donc l’inverse de ${d1} est 1/${d1}.`
          : `${n1}/${d1} × ${d1}/${n1} = 1, donc l’inverse de ${n1}/${d1} est ${d1}/${n1}${reponse !== `${d1}/${n1}` ? ` = ${reponse}` : ''}.`,
      };
    }
    if (d === 3) {
      // Partage en portions : réponse entière par construction.
      const m = a.entier(2, 9);
      const portion = irreductible(1, a.choisir([2, 3, 4, 5, 8, 10]));
      const [pn, pd] = portion.split('/').map(Number) as [number, number];
      const total = irreductible(m * pn, pd);
      return {
        gabarit: 'saisie',
        consigne: `On répartit ${total} L de jus dans des verres de ${portion} L. Combien de verres remplit-on ?`,
        reponse: String(m),
        indice: 'Divise la quantité totale par le contenu d’un verre.',
        explication: `${total} ÷ ${portion} = ${total} × ${pd} = ${m}. On remplit ${m} verres.`,
      };
    }
    const reponse = irreductible(n1 * d2, d1 * n2);
    return {
      gabarit: 'saisie',
      consigne: `Calcule et donne le résultat sous forme irréductible : ${n1}/${d1} ÷ ${n2}/${d2}`,
      reponse,
      indice: 'Diviser par une fraction, c’est multiplier par son inverse.',
      explication: `${n1}/${d1} ÷ ${n2}/${d2} = ${n1}/${d1} × ${d2}/${n2} = ${n1 * d2}/${d1 * n2} = ${reponse}.`,
    };
  },
});

// ─────────── Puissances d'exposant entier naturel

export const puissances4e = creerGenerateur({
  id: 'puissances-4e',
  competence: 'MA-C4-4E-PUIS-01',
  cycle: 4,
  description: 'Calculer une puissance ; produit de puissances d’un même nombre ou de même exposant.',
  generer(a, d) {
    if (d === 1) {
      const b = a.choisir([2, 3, 5, 10, -2, -3]);
      const n = b === 10 ? a.entier(2, 6) : Math.abs(b) === 2 ? a.entier(2, 6) : a.entier(2, 4);
      const r = b ** n;
      const ecrit = b < 0 ? `(${ecrireRelatif(b)})` : String(b);
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${ecrit}${'⁰¹²³⁴⁵⁶⁷⁸⁹'[n]}`,
        reponse: ecrireRelatif(r),
        indice: `C’est ${ecrit} multiplié ${n} fois par lui-même.`,
        explication: `${Array(n).fill(ecrit).join(' × ')} = ${ecrireRelatif(r).replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}.`,
      };
    }
    const b = a.choisir([2, 3, 5, 7, 10, 'a']);
    const m = a.entier(2, 7);
    const n = a.entier(2, 7);
    const sup = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    const exp = (k: number) => String(k).split('').map((c) => sup[Number(c)]).join('');
    if (d === 2) {
      return {
        gabarit: 'qcm',
        consigne: `Écris sous la forme d’une seule puissance : ${b}${exp(m)} × ${b}${exp(n)}`,
        options: options(a, `${b}${exp(m + n)}`, [`${b}${exp(m * n)}`, `${b}${exp(m + n + 1)}`, `${b}${exp(m + n - 1)}`], () => `${b}${exp(m + n + 2)}`),
        reponse: `${b}${exp(m + n)}`,
        indice: 'Pour multiplier des puissances d’un même nombre, on additionne les exposants.',
        explication: `${b}${exp(m)} × ${b}${exp(n)} = ${b}${exp(m + n)}, car on a ${m} + ${n} = ${m + n} facteurs ${b}.`,
      };
    }
    const [x, y] = a.melanger([2, 3, 5]).slice(0, 2) as [number, number];
    return {
      gabarit: 'qcm',
      consigne: `Écris sous la forme d’une seule puissance : ${x}${exp(m)} × ${y}${exp(m)}`,
      options: options(a, `${x * y}${exp(m)}`, [`${x * y}${exp(2 * m)}`, `${x + y}${exp(m)}`, `${x * y}${exp(m + 1)}`], () => `${x * y + 1}${exp(m)}`),
      reponse: `${x * y}${exp(m)}`,
      indice: 'Même exposant : on multiplie les nombres et on garde l’exposant.',
      explication: `${x}${exp(m)} × ${y}${exp(m)} = (${x} × ${y})${exp(m)} = ${x * y}${exp(m)}.`,
    };
  },
});

// ─────────── Racine carrée

export const racineCarree4e = creerGenerateur({
  id: 'racine-carree-4e',
  competence: 'MA-C4-4E-RAC-01',
  cycle: 4,
  description: 'Racine carrée d’un carré parfait ; encadrer une racine carrée par deux entiers consécutifs.',
  generer(a, d) {
    if (d === 1) {
      const n = a.entier(0, 15);
      return {
        gabarit: 'saisie',
        consigne: `Calcule : √${n * n}`,
        reponse: String(n),
        indice: 'Cherche le nombre positif dont le carré vaut ce nombre.',
        explication: `${n}² = ${n * n} et ${n} ≥ 0, donc √${n * n} = ${n}.`,
      };
    }
    const n = a.entier(2, 14);
    const m = n * n + a.entier(1, 2 * n);
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `√${m} est compris entre deux entiers consécutifs. Quel est le plus petit des deux ?`,
        reponse: String(n),
        indice: 'Cherche les deux carrés parfaits qui encadrent ce nombre.',
        explication: `${n}² = ${n * n} et ${n + 1}² = ${(n + 1) ** 2}. ${n * n} < ${m} < ${(n + 1) ** 2}, donc ${n} < √${m} < ${n + 1}.`,
      };
    }
    const aire = n * n;
    return {
      gabarit: 'saisie',
      consigne: `Un carré a une aire de ${fr(aire)} cm². Calcule la longueur de son côté, en cm.`,
      reponse: String(n),
      indice: 'Le côté est la racine carrée de l’aire.',
      explication: `Côté = √${aire} = ${n} cm, car ${n}² = ${aire}.`,
    };
  },
});

// ─────────── Développer et factoriser

const affine = (k: number, b: number) => `${k === 1 ? '' : k === -1 ? '−' : ecrireRelatif(k)}x${b === 0 ? '' : ` ${b > 0 ? '+' : '−'} ${Math.abs(b)}`}`;

export const developper4e = creerGenerateur({
  id: 'developper-factoriser-4e',
  competence: 'MA-C4-4E-LIT-01',
  cycle: 4,
  description: 'Développer et factoriser avec la distributivité simple, y compris avec des nombres relatifs.',
  generer(a, d) {
    const k = d === 1 ? a.entier(2, 9) : nonNul(a, 9);
    const p = a.entier(2, 7);
    const q = nonNul(a, 9);
    if (d < 3) {
      const reponse = affine(k * p, k * q);
      const facteur = k < 0 ? `(${ecrireRelatif(k)})` : String(k);
      return {
        gabarit: 'qcm',
        consigne: `Développe : ${facteur}(${affine(p, q)})`,
        options: options(a, reponse, [affine(k * p, q), affine(k * p, -k * q), affine(p, k * q)], () => affine(k * p, k * q + 1)),
        reponse,
        indice: 'Multiplie chaque terme de la parenthèse, en respectant les signes.',
        explication: `${facteur} × ${p}x = ${affine(k * p, 0)} et ${facteur} × ${ecrireTerme(q)} = ${ecrireRelatif(k * q)}. Résultat : ${reponse}.`,
      };
    }
    // Factoriser par un facteur commun contenant x.
    const c = a.entier(2, 9);
    const reponse = `x(${affine(c, q)})`;
    const terme = `${Math.abs(q) === 1 ? '' : Math.abs(q)}x`;
    return {
      gabarit: 'qcm',
      consigne: `Factorise en mettant x en facteur : ${c}x² ${q > 0 ? '+' : '−'} ${terme}`,
      options: options(a, reponse, [`x(${c}x² ${q > 0 ? '+' : '−'} ${Math.abs(q)})`, `${c}x(x ${q > 0 ? '+' : '−'} ${Math.abs(q)})`, `x(${affine(c + Math.abs(q), 0)})`], () => `x(${affine(c, q + 1)})`),
      reponse,
      indice: 'Les deux termes ont x en commun.',
      explication: `${c}x² = x × ${c}x et ${terme} = x × ${Math.abs(q)}. On met x en facteur : ${reponse}.`,
    };
  },
});

// ─────────── Équations ax + b = c

export const equations4e = creerGenerateur({
  id: 'equations-4e',
  competence: 'MA-C4-4E-EQ-01',
  cycle: 4,
  description: 'Résoudre une équation du premier degré ax + b = c, puis ax + b = cx + d ; mettre un problème en équation.',
  generer(a, d) {
    const x = d === 1 ? a.entier(1, 12) : nonNul(a, 12);
    const k = a.entier(2, 9);
    const b = nonNul(a, 20);
    if (d < 3) {
      const c = k * x + b;
      return {
        gabarit: 'saisie',
        consigne: `Résous l’équation : ${affine(k, b)} = ${ecrireRelatif(c)}`,
        reponse: ecrireRelatif(x),
        indice: 'Isole d’abord le terme en x, puis divise par son coefficient.',
        explication: `${k}x = ${ecrireRelatif(c)} ${b > 0 ? '−' : '+'} ${Math.abs(b)} = ${ecrireRelatif(k * x)}. x = ${ecrireRelatif(k * x)} ÷ ${k} = ${ecrireRelatif(x)}.`,
      };
    }
    const c2 = a.entier(1, k - 1);
    const dd = (k - c2) * x + b;
    return {
      gabarit: 'saisie',
      consigne: `Résous l’équation : ${affine(k, b)} = ${affine(c2, dd)}`,
      reponse: ecrireRelatif(x),
      indice: 'Regroupe les termes en x d’un côté et les nombres de l’autre.',
      explication: `${k}x − ${c2}x = ${ecrireRelatif(dd)} ${b > 0 ? '−' : '+'} ${Math.abs(b)}, soit ${k - c2}x = ${ecrireRelatif(dd - b)}. x = ${ecrireRelatif(x)}.`,
    };
  },
});
