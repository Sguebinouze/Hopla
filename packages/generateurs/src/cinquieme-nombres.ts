// 5e, nombres et calculs : priorités opératoires, distributivité, divisibilité, nombres relatifs,
// fractions, puissances (carrés et cubes). Source : programme de mathématiques du cycle 4
// (arrêté du 18 février 2026, BO n°10 du 5 mars 2026), p. 40 et 41.
import { creerGenerateur, fr, options, optionsNumeriques } from './outils';
import { ecrireRelatif, ecrireTerme } from './relatifs-c4';

const pgcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : pgcd(y, x % y));
/** Fraction irréductible écrite « a/b » (entier si b = 1). */
const fraction = (n: number, d: number) => {
  const g = pgcd(n, d);
  return d / g === 1 ? ecrireRelatif(n / g) : `${n < 0 ? '−' : ''}${Math.abs(n) / g}/${d / g}`;
};

// ─────────── Priorités opératoires

export const priorites5e = creerGenerateur({
  id: 'priorites-5e',
  competence: 'MA-C4-5E-OPE-01',
  cycle: 4,
  description: 'Calculer une expression en respectant les priorités opératoires, avec ou sans parenthèses.',
  generer(a, d) {
    const x = a.entier(2, 20);
    const y = a.entier(2, 9);
    const z = a.entier(2, 9);
    if (d === 1) {
      const plus = a.suivant() < 0.5 || x * y <= z;
      const r = plus ? x + y * z : x * y - z;
      const expr = plus ? `${x} + ${y} × ${z}` : `${x} × ${y} − ${z}`;
      const gaucheDroite = plus ? (x + y) * z : x * (y - z);
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${expr}`,
        reponse: String(r),
        indice: 'La multiplication est prioritaire sur l’addition et la soustraction.',
        explication: plus
          ? `On calcule d’abord ${y} × ${z} = ${y * z}. Puis ${x} + ${y * z} = ${r}. Attention : (${x} + ${y}) × ${z} donnerait ${gaucheDroite}.`
          : `On calcule d’abord ${x} × ${y} = ${x * y}. Puis ${x * y} − ${z} = ${r}.`,
      };
    }
    if (d === 2) {
      const w = a.entier(2, 9);
      const r = (x + y) * z - w;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : (${x} + ${y}) × ${z} − ${w}`,
        reponse: String(r),
        indice: 'Calcule d’abord entre parenthèses, puis la multiplication, puis la soustraction.',
        explication: `${x} + ${y} = ${x + y}. ${x + y} × ${z} = ${(x + y) * z}. ${(x + y) * z} − ${w} = ${r}.`,
      };
    }
    // Division et parenthèses imbriquées.
    const q = a.entier(2, 9);
    const dividende = q * y;
    const w = a.entier(1, 9);
    const r = x - dividende / y + w * z;
    if (r < 0) {
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${x + dividende} − ${dividende} ÷ ${y} + ${w} × ${z}`,
        reponse: String(x + dividende - q + w * z),
        indice: 'Effectue d’abord la division et la multiplication, de gauche à droite.',
        explication: `${dividende} ÷ ${y} = ${q} et ${w} × ${z} = ${w * z}. Puis ${x + dividende} − ${q} + ${w * z} = ${x + dividende - q + w * z}.`,
      };
    }
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${x} − ${dividende} ÷ ${y} + ${w} × ${z}`,
      reponse: String(r),
      indice: 'Effectue d’abord la division et la multiplication, de gauche à droite.',
      explication: `${dividende} ÷ ${y} = ${q} et ${w} × ${z} = ${w * z}. Puis ${x} − ${q} + ${w * z} = ${r}.`,
    };
  },
});

// ─────────── Distributivité simple sur des exemples numériques

export const distributivite5e = creerGenerateur({
  id: 'distributivite-5e',
  competence: 'MA-C4-5E-OPE-02',
  cycle: 4,
  description: 'Utiliser la distributivité simple pour calculer mentalement.',
  generer(a, d) {
    const k = a.entier(3, 19);
    if (d === 1) {
      const n = a.choisir([99, 101, 98, 102, 999, 1001]);
      const proche = Math.round(n / 100) * 100;
      return {
        gabarit: 'saisie',
        consigne: `Calcule astucieusement : ${k} × ${fr(n)}`,
        reponse: String(k * n),
        indice: `Écris ${n} = ${proche} ${n > proche ? '+' : '−'} ${Math.abs(n - proche)}.`,
        explication: `${k} × ${n} = ${k} × ${proche} ${n > proche ? '+' : '−'} ${k} × ${Math.abs(n - proche)} = ${fr(k * proche)} ${n > proche ? '+' : '−'} ${k * Math.abs(n - proche)} = ${fr(k * n)}.`,
      };
    }
    if (d === 2) {
      const x = a.entier(11, 89);
      const somme = a.choisir([10, 100]);
      const y = somme - x % somme;
      return {
        gabarit: 'saisie',
        consigne: `Calcule astucieusement : ${k} × ${x} + ${k} × ${y}`,
        reponse: String(k * (x + y)),
        indice: `Mets ${k} en facteur.`,
        explication: `${k} × ${x} + ${k} × ${y} = ${k} × (${x} + ${y}) = ${k} × ${x + y} = ${fr(k * (x + y))}.`,
      };
    }
    // Trouver le facteur commun et le terme manquant.
    const x = a.entier(2, 30);
    const y = a.entier(2, 30);
    return {
      gabarit: 'saisie',
      consigne: `Complète : ${k} × ${x} + ${k} × ${y} = ${k} × …`,
      reponse: String(x + y),
      indice: 'k × a + k × b = k × (a + b).',
      explication: `${k} × ${x} + ${k} × ${y} = ${k} × (${x} + ${y}) = ${k} × ${x + y}.`,
    };
  },
});

// ─────────── Critères de divisibilité par 2, 3, 5, 9, 10

const sommeChiffres = (n: number) => String(n).split('').reduce((s, c) => s + Number(c), 0);

export const divisibilite5e = creerGenerateur({
  id: 'divisibilite-5e',
  competence: 'MA-C4-5E-DIV-01',
  cycle: 4,
  description: 'Utiliser les critères de divisibilité par 2, 3, 5, 9 et 10.',
  generer(a, d) {
    const diviseur = d === 1 ? a.choisir([2, 5, 10]) : d === 2 ? a.choisir([3, 9]) : a.choisir([3, 9, 2, 5]);
    // Un seul nombre divisible parmi les options.
    const multiple = diviseur * a.entier(Math.ceil(100 / diviseur), Math.floor(9999 / diviseur));
    const pieges: number[] = [];
    while (pieges.length < 3) {
      const n = a.entier(100, 9999);
      if (n % diviseur !== 0 && !pieges.includes(n)) pieges.push(n);
    }
    const regle: Record<number, string> = {
      2: 'son chiffre des unités est 0, 2, 4, 6 ou 8',
      5: 'son chiffre des unités est 0 ou 5',
      10: 'son chiffre des unités est 0',
      3: `la somme de ses chiffres (${sommeChiffres(multiple)}) est un multiple de 3`,
      9: `la somme de ses chiffres (${sommeChiffres(multiple)}) est un multiple de 9`,
    };
    return {
      gabarit: 'qcm',
      consigne: `Lequel de ces nombres est divisible par ${diviseur} ?`,
      options: a.melanger([multiple, ...pieges].map(String)),
      reponse: String(multiple),
      indice: diviseur === 3 || diviseur === 9 ? `Additionne les chiffres de chaque nombre.` : 'Regarde le chiffre des unités.',
      explication: `${fr(multiple)} est divisible par ${diviseur} car ${regle[diviseur]}.`,
    };
  },
});

// ─────────── Nombres relatifs : opposé, comparaison, soustraction

export const comparerRelatifs5e = creerGenerateur({
  id: 'comparer-relatifs-5e',
  competence: 'MA-C4-5E-REL-02',
  cycle: 4,
  description: 'Opposé d’un nombre relatif ; comparer et ranger des nombres relatifs.',
  generer(a, d) {
    if (d === 1) {
      const n = a.entier(1, 50) * (a.suivant() < 0.5 ? -1 : 1);
      return {
        gabarit: 'saisie',
        consigne: `Quel est l’opposé de ${ecrireRelatif(n)} ?`,
        reponse: ecrireRelatif(-n),
        indice: 'Deux nombres opposés ont la même distance à zéro et des signes contraires.',
        explication: `L’opposé de ${ecrireRelatif(n)} est ${ecrireRelatif(-n)} : leur somme vaut 0.`,
      };
    }
    // Décimaux relatifs écrits avec une décimale.
    const valeurs = new Set<number>();
    while (valeurs.size < 4) valeurs.add(a.entier(-99, 99) / 10);
    const liste = [...valeurs];
    const plusGrand = a.suivant() < 0.5;
    const cible = plusGrand ? Math.max(...liste) : Math.min(...liste);
    const ecrire = (x: number) => ecrireRelatif(Math.round(x * 10) / 10).replace('.', ',');
    if (d === 2) {
      // Piège principal : comparer les distances à zéro sans tenir compte du signe.
      return {
        gabarit: 'qcm',
        consigne: `Quel est le plus ${plusGrand ? 'grand' : 'petit'} de ces nombres ?`,
        options: a.melanger(liste.map(ecrire)),
        reponse: ecrire(cible),
        indice: 'Un nombre négatif est plus petit qu’un nombre positif. Entre deux négatifs, le plus petit est le plus loin de zéro.',
        explication: `Rangés dans l’ordre croissant : ${[...liste].sort((x, y) => x - y).map(ecrire).join(' < ')}.`,
      };
    }
    const [x, y] = liste as [number, number];
    const signe = x < y ? '<' : '>';
    return {
      gabarit: 'qcm',
      consigne: `Complète avec < ou > : ${ecrire(x)} … ${ecrire(y)}`,
      options: ['<', '>'].concat('='),
      reponse: signe,
      indice: 'Place les deux nombres sur une droite graduée : le plus petit est à gauche.',
      explication: `${ecrire(x)} est à ${x < y ? 'gauche' : 'droite'} de ${ecrire(y)} sur la droite graduée. Donc ${ecrire(x)} ${signe} ${ecrire(y)}.`,
    };
  },
});

export const soustraireRelatifs5e = creerGenerateur({
  id: 'soustraire-relatifs-5e',
  competence: 'MA-C4-5E-REL-03',
  cycle: 4,
  description: 'Soustraire des nombres relatifs (ajouter l’opposé) ; enchainer additions et soustractions.',
  generer(a, d) {
    const nonNul = (max: number) => a.entier(1, max) * (a.suivant() < 0.5 ? -1 : 1);
    if (d < 3) {
      const x = nonNul(d === 1 ? 10 : 25);
      const y = d === 1 ? a.entier(1, 10) * (a.suivant() < 0.3 ? 1 : -1) : nonNul(25);
      const r = x - y;
      const reponse = ecrireRelatif(r);
      // Pièges : additionner au lieu de soustraire, oublier un signe.
      return {
        gabarit: 'qcm',
        consigne: `Calcule : ${ecrireTerme(x)} − ${ecrireTerme(y)}`,
        options: options(a, reponse, [ecrireRelatif(x + y), ecrireRelatif(-r), ecrireRelatif(-x - y)], () => ecrireRelatif(r + a.entier(-4, 4))),
        reponse,
        indice: 'Soustraire un nombre, c’est ajouter son opposé.',
        explication: `${ecrireTerme(x)} − ${ecrireTerme(y)} = ${ecrireTerme(x)} + ${ecrireTerme(-y)} = ${reponse}.`,
      };
    }
    const x = nonNul(20);
    const y = nonNul(20);
    const z = nonNul(20);
    const r = x - y + z;
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${ecrireTerme(x)} − ${ecrireTerme(y)} + ${ecrireTerme(z)}`,
      reponse: ecrireRelatif(r),
      indice: 'Transforme chaque soustraction en addition de l’opposé.',
      explication: `${ecrireTerme(x)} + ${ecrireTerme(-y)} + ${ecrireTerme(z)} = ${ecrireRelatif(r)}.`,
    };
  },
});

// ─────────── Fractions : additionner et soustraire, dénominateurs quelconques ; comparer

export const fractions5e = creerGenerateur({
  id: 'fractions-5e',
  competence: 'MA-C4-5E-FRAC-01',
  cycle: 4,
  description: 'Additionner et soustraire des fractions de dénominateurs quelconques ; comparer des fractions.',
  generer(a, d) {
    if (d === 1) {
      // Un dénominateur multiple de l'autre.
      const b = a.entier(2, 9);
      const k = a.entier(2, 4);
      const n1 = a.entier(1, b - 1);
      const n2 = a.entier(1, b * k - 1);
      const plus = a.suivant() < 0.6 || n1 * k <= n2;
      const num = plus ? n1 * k + n2 : n1 * k - n2;
      const reponse = fraction(num, b * k);
      return {
        gabarit: 'qcm',
        consigne: `Calcule et simplifie si possible : ${n1}/${b} ${plus ? '+' : '−'} ${n2}/${b * k}`,
        options: optionsNumeriques(a, reponse, [`${plus ? n1 + n2 : Math.abs(n1 - n2)}/${b + b * k}`, `${plus ? n1 + n2 : Math.abs(n1 - n2)}/${b * k}`, fraction(num + k, b * k)], () => `${a.entier(1, 20)}/${b * k}`),
        reponse,
        indice: `Écris ${n1}/${b} avec le dénominateur ${b * k}.`,
        explication: `${n1}/${b} = ${n1 * k}/${b * k}. ${n1 * k}/${b * k} ${plus ? '+' : '−'} ${n2}/${b * k} = ${num}/${b * k}${fraction(num, b * k) !== `${num}/${b * k}` ? ` = ${reponse}` : ''}.`,
      };
    }
    if (d === 2) {
      // Dénominateurs premiers entre eux : dénominateur commun = produit.
      const [b1, b2] = a.melanger([2, 3, 4, 5, 7]).slice(0, 2) as [number, number];
      const n1 = a.entier(1, b1 - 1);
      const n2 = a.entier(1, b2 - 1);
      const num = n1 * b2 + n2 * b1;
      const reponse = fraction(num, b1 * b2);
      return {
        gabarit: 'qcm',
        consigne: `Calcule et simplifie si possible : ${n1}/${b1} + ${n2}/${b2}`,
        options: optionsNumeriques(a, reponse, [`${n1 + n2}/${b1 + b2}`, `${n1 + n2}/${b1 * b2}`, `${n1 * n2}/${b1 * b2}`], () => `${a.entier(1, 30)}/${b1 * b2}`),
        reponse,
        indice: `Prends ${b1 * b2} comme dénominateur commun.`,
        explication: `${n1}/${b1} = ${n1 * b2}/${b1 * b2} et ${n2}/${b2} = ${n2 * b1}/${b1 * b2}. Somme : ${num}/${b1 * b2}${reponse !== `${num}/${b1 * b2}` ? ` = ${reponse}` : ''}. On n’additionne jamais les dénominateurs.`,
      };
    }
    // Comparer deux fractions de dénominateurs différents.
    const [b1, b2] = a.melanger([3, 4, 5, 6, 7, 8, 9]).slice(0, 2) as [number, number];
    let n1 = a.entier(1, 2 * b1);
    const n2 = a.entier(1, 2 * b2);
    if (n1 * b2 === n2 * b1) n1 += 1;
    const signe = n1 * b2 < n2 * b1 ? '<' : '>';
    return {
      gabarit: 'qcm',
      consigne: `Complète avec < ou > : ${n1}/${b1} … ${n2}/${b2}`,
      options: ['<', '>', '='],
      reponse: signe,
      indice: 'Écris les deux fractions avec le même dénominateur.',
      explication: `${n1}/${b1} = ${n1 * b2}/${b1 * b2} et ${n2}/${b2} = ${n2 * b1}/${b1 * b2}. ${n1 * b2} ${signe} ${n2 * b1}, donc ${n1}/${b1} ${signe} ${n2}/${b2}.`,
    };
  },
});

// ─────────── Puissances : carrés et cubes

export const carresCubes5e = creerGenerateur({
  id: 'carres-cubes-5e',
  competence: 'MA-C4-5E-PUIS-01',
  cycle: 4,
  description: 'Connaitre les carrés de 0 à 12 et le cube de 10 ; calculer avec des carrés et des cubes.',
  generer(a, d) {
    if (d === 1) {
      const n = a.entier(0, 12);
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${n}²`,
        reponse: String(n * n),
        indice: `${n}², c’est ${n} × ${n}.`,
        explication: `${n}² = ${n} × ${n} = ${n * n}. Ce n’est pas ${n} × 2.`,
      };
    }
    if (d === 2) {
      const n = a.entier(2, 12);
      const carre = a.suivant() < 0.7;
      return carre
        ? {
            gabarit: 'saisie', consigne: `Complète : …² = ${n * n}`, reponse: String(n),
            indice: 'Cherche le nombre qui, multiplié par lui-même, donne ce résultat.',
            explication: `${n} × ${n} = ${n * n}, donc ${n}² = ${n * n}.`,
          }
        : {
            gabarit: 'saisie', consigne: `Calcule : ${n > 5 ? 10 : n}³`, reponse: String((n > 5 ? 10 : n) ** 3),
            indice: 'Le cube, c’est le nombre multiplié trois fois par lui-même.',
            explication: `${n > 5 ? 10 : n}³ = ${n > 5 ? 10 : n} × ${n > 5 ? 10 : n} × ${n > 5 ? 10 : n} = ${fr((n > 5 ? 10 : n) ** 3)}.`,
          };
    }
    const x = a.entier(2, 9);
    const y = a.entier(2, 9);
    const z = a.entier(2, 5);
    const r = x * x + y * z;
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${x}² + ${y} × ${z}`,
      reponse: String(r),
      indice: 'Les puissances se calculent avant les multiplications et les additions.',
      explication: `${x}² = ${x * x}. ${y} × ${z} = ${y * z}. ${x * x} + ${y * z} = ${r}.`,
    };
  },
});
