// CM1, nombres entiers, fractions et nombres décimaux.
// Source : programme de mathématiques du cycle 3 (BO n°16 du 17 avril 2025), pages 5 et 6.
// Champ du CM1 : entiers jusqu'à 999 999, dénominateurs inférieurs ou égaux à 20 (100 pour les fractions
// décimales), décimaux avec au plus deux chiffres après la virgule.
import { comparerDecimaux, depuisEntier } from './decimaux';
import { enLettres } from './lettres';
import { creerGenerateur, fr, frDecimal, options, optionsNumeriques, type Aleatoire } from './outils';

const RANGS_SG = ['unité', 'dizaine', 'centaine', 'millier', 'dizaine de milliers', 'centaine de milliers'];
const RANGS_PL = ['unités', 'dizaines', 'centaines', 'milliers', 'dizaines de milliers', 'centaines de milliers'];
const rang = (c: number, i: number) => `${c} ${c > 1 ? RANGS_PL[i] : RANGS_SG[i]}`;
const chiffre = (n: number, i: number) => Math.floor(n / 10 ** i) % 10;

/** Décomposition complète d'un entier, du plus grand rang au plus petit : « 4 dizaines de milliers, 5 milliers… ». */
function decomposition(n: number): string {
  const morceaux: string[] = [];
  for (let i = String(n).length - 1; i >= 0; i--) morceaux.push(rang(chiffre(n, i), i));
  return morceaux.join(', ');
}

export const pgcd = (x: number, y: number): number => (y === 0 ? x : pgcd(y, x % y));
const signe = (c: number) => (c === 0 ? '=' : c < 0 ? '<' : '>');

// ─────────── Valeur des chiffres et relations entre unités de numération

export const valeurChiffresCm1 = creerGenerateur({
  id: 'valeur-chiffres-cm1',
  competence: 'MA-C3-CM1-NUM-01',
  cycle: 3,
  description: 'Valeur d’un chiffre selon sa position, décomposition, nombre de dizaines, centaines ou milliers.',
  generer(a, d) {
    if (d === 1) {
      const n = a.entier(1000, 99999);
      const i = a.entier(0, String(n).length - 1);
      const c = chiffre(n, i);
      return {
        gabarit: 'saisie',
        consigne: `Quel est le chiffre des ${RANGS_PL[i]} dans ${fr(n)} ?`,
        reponse: String(c),
        indice: 'Nomme chaque rang en partant de la droite : unités, dizaines, centaines, milliers…',
        explication: `${fr(n)}, c’est ${decomposition(n)}. Le chiffre des ${RANGS_PL[i]} est ${c}.`,
      };
    }
    if (d === 2) {
      const n = a.entier(100000, 999999);
      const termes: string[] = [];
      for (let i = 5; i >= 0; i--) if (chiffre(n, i) > 0) termes.push(rang(chiffre(n, i), i));
      const ecrits = a.suivant() < 0.4 ? a.melanger(termes) : termes;
      return {
        gabarit: 'saisie',
        consigne: `Écris en chiffres : ${ecrits.join(' + ')}.`,
        reponse: String(n),
        indice: 'Range les termes du plus grand rang au plus petit. Mets un 0 dans chaque rang vide.',
        explication: `Il y a ${decomposition(n)}. Le nombre est ${fr(n)}.`,
      };
    }
    const n = a.entier(10000, 999999);
    const i = a.entier(1, 3);
    const r = Math.floor(n / 10 ** i);
    return {
      gabarit: 'saisie',
      consigne: `Combien y a-t-il de ${RANGS_PL[i]} en tout dans ${fr(n)} ?`,
      reponse: String(r),
      indice: `Garde tous les chiffres jusqu’au rang des ${RANGS_PL[i]}.`,
      explication: `1 ${RANGS_SG[i]} vaut ${fr(10 ** i)}. ${fr(n)} = ${fr(r)} × ${fr(10 ** i)} + ${fr(n % 10 ** i)}. Il y a ${fr(r)} ${RANGS_PL[i]} en tout.`,
    };
  },
});

// ─────────── Nombres en lettres jusqu'à 999 999

/** Un nombre qui contient souvent les pièges de l'écriture en lettres : 70 à 99, 80, 100, 200. */
function nombreAPieges(a: Aleatoire, milliersMin: number, milliersMax: number): number {
  const fin = () => a.choisir([80, 200, 71, 91, 300, 21, 99, 180, 400, 1, 0, a.entier(100, 999), a.entier(10, 99)]);
  const milliers = a.suivant() < 0.4 ? a.choisir([80, 200, 300, 71, 91, 100, 21].filter((m) => m >= milliersMin && m <= milliersMax).concat(milliersMin)) : a.entier(milliersMin, milliersMax);
  return milliers * 1000 + fin();
}

export const nombresLettresCm1 = creerGenerateur({
  id: 'nombres-lettres-cm1',
  competence: 'MA-C3-CM1-NUM-02',
  cycle: 3,
  description: 'Écrire en chiffres un nombre donné en lettres, et en lettres un nombre donné en chiffres, jusqu’à 999 999.',
  generer(a, d) {
    if (d < 3) {
      const n = d === 1 ? nombreAPieges(a, 2, 99) : nombreAPieges(a, 100, 999);
      return {
        gabarit: 'saisie',
        consigne: `Écris en chiffres : ${enLettres(n)}.`,
        reponse: String(n),
        indice: 'Repère le mot « mille ». Ce qui est avant compte les milliers, ce qui est après compte les unités.',
        explication: `Avant le mot « mille », on lit ${fr(Math.floor(n / 1000))} : ce sont les milliers. ${n % 1000 ? `Après, on lit ${fr(n % 1000)}.` : 'Rien ne suit : les trois derniers chiffres sont des 0.'} Le nombre s’écrit ${fr(n)}.`,
      };
    }
    const n = nombreAPieges(a, 2, 999);
    const juste = enLettres(n);
    const pieges = [juste.replace(/-mille\b/, '-milles')];
    const s = String(n);
    const i = a.entier(0, s.length - 2);
    const echange = Number(s.slice(0, i) + s[i + 1] + s[i] + s.slice(i + 2));
    if (s[0] !== '0' && echange !== n && echange >= 1000) pieges.push(enLettres(echange));
    pieges.push(enLettres(n + 1000 * a.choisir([1, 10, -1].filter((k) => n + 1000 * k >= 2000 && n + 1000 * k <= 999999))));
    return {
      gabarit: 'qcm',
      consigne: `Comment s’écrit ${fr(n)} en lettres ?`,
      options: options(a, juste, pieges, () => enLettres(n + a.entier(1, 9) * 10)),
      reponse: juste,
      indice: '« Mille » ne prend jamais de s. Lis d’abord la classe des milliers, puis celle des unités.',
      explication: `${fr(n)} : on lit d’abord ${fr(Math.floor(n / 1000))} milliers${n % 1000 ? `, puis ${fr(n % 1000)}` : ''}. On écrit « ${juste} ». Tous les mots sont reliés par des traits d’union.`,
    };
  },
});

// ─────────── Comparer, ranger, intercaler des entiers

/** Un nombre voisin : deux chiffres échangés ou un chiffre modifié, avec autant de chiffres. */
function voisin(a: Aleatoire, n: number): number {
  const s = String(n).split('');
  for (let essai = 0; essai < 20; essai++) {
    const t = [...s];
    const i = a.entier(0, t.length - 1);
    if (a.suivant() < 0.5) {
      const j = a.entier(0, t.length - 1);
      [t[i], t[j]] = [t[j]!, t[i]!];
    } else t[i] = String(a.entier(0, 9));
    const m = Number(t.join(''));
    if (t[0] !== '0' && m !== n) return m;
  }
  return n + 1;
}

export const comparerEntiersCm1 = creerGenerateur({
  id: 'comparer-entiers-cm1',
  competence: 'MA-C3-CM1-NUM-03',
  cycle: 3,
  description: 'Comparer, ranger et intercaler des nombres entiers jusqu’à 999 999.',
  generer(a, d) {
    if (d === 1) {
      const x = a.entier(1000, 999999);
      const y = a.suivant() < 0.1 ? x : voisin(a, x);
      const s = signe(Math.sign(x - y));
      return {
        gabarit: 'qcm',
        consigne: `Complète avec <, > ou = : ${fr(x)} … ${fr(y)}`,
        options: ['<', '>', '='],
        reponse: s,
        indice: 'Compte les chiffres. S’il y en a autant, compare chiffre à chiffre en partant de la gauche.',
        explication:
          x === y
            ? `Les deux nombres sont identiques : ${fr(x)} = ${fr(y)}.`
            : `Le premier chiffre différent, en partant de la gauche, décide. ${fr(x)} ${s} ${fr(y)}.`,
      };
    }
    if (d === 2) {
      const base = a.entier(10000, 999999);
      const valeurs = new Set([base]);
      for (let k = 0; valeurs.size < 4 && k < 50; k++) valeurs.add(voisin(a, base));
      for (let k = 1; valeurs.size < 4; k++) valeurs.add(base + k * 1000);
      const liste = [...valeurs];
      const grand = a.suivant() < 0.5;
      const tri = [...liste].sort((x, y) => x - y);
      const cible = grand ? tri[3]! : tri[0]!;
      return {
        gabarit: 'qcm',
        consigne: `Quel est le plus ${grand ? 'grand' : 'petit'} de ces nombres ?`,
        options: a.melanger(liste.map(fr)),
        reponse: fr(cible),
        indice: 'Compare d’abord le nombre de chiffres, puis les chiffres de gauche à droite.',
        explication: `Rangés dans l’ordre croissant : ${tri.map(fr).join(' < ')}. Le plus ${grand ? 'grand' : 'petit'} est ${fr(cible)}.`,
      };
    }
    const pas = a.choisir([100, 1000]);
    const bas = a.entier(pas === 100 ? 10 : 2, pas === 100 ? 9998 : 998) * pas;
    const haut = bas + pas;
    const dedans = bas + a.entier(1, pas - 1);
    const pieges = [haut + a.entier(1, pas - 1), bas - a.entier(1, pas - 1), dedans + 10 * pas];
    return {
      gabarit: 'qcm',
      consigne: `Quel nombre est compris entre ${fr(bas)} et ${fr(haut)} ?`,
      options: optionsNumeriques(a, fr(dedans), pieges.map(fr), () => fr(haut + a.entier(1, 5 * pas))),
      reponse: fr(dedans),
      indice: `Le nombre cherché est plus grand que ${fr(bas)} et plus petit que ${fr(haut)}.`,
      explication: `${fr(bas)} < ${fr(dedans)} < ${fr(haut)}. Les autres nombres sont en dehors de l’intervalle.`,
    };
  },
});

// ─────────── Multiples et diviseurs

export const multiplesCm1 = creerGenerateur({
  id: 'multiples-cm1',
  competence: 'MA-C3-CM1-NUM-04',
  cycle: 3,
  description: 'Reconnaitre un multiple de 2, 5 ou 10 ; un multiple ou un diviseur d’un nombre inférieur ou égal à 10.',
  generer(a, d) {
    if (d === 3) {
      let n = 0;
      let p = 0;
      let non: number[] = [];
      do {
        p = a.entier(3, 10);
        n = p * a.entier(3, 12);
        non = [2, 3, 4, 5, 6, 7, 8, 9, 10].filter((k) => n % k !== 0);
      } while (non.length < 3);
      return {
        gabarit: 'qcm',
        consigne: `Lequel de ces nombres est un diviseur de ${n} ?`,
        options: optionsNumeriques(a, String(p), a.melanger(non).map(String), () => String(a.choisir(non))),
        reponse: String(p),
        indice: 'Cherche dans les tables de multiplication : quelle table contient ce nombre ?',
        explication: `${p} × ${n / p} = ${n}. Donc ${p} est un diviseur de ${n}. Les autres nombres ne divisent pas ${n} sans reste.`,
      };
    }
    const k = d === 1 ? a.choisir([2, 5, 10]) : a.entier(3, 9);
    const max = d === 1 ? 9999 : 100;
    const m = k * a.entier(d === 1 ? 10 : 2, Math.floor(max / k));
    const non = () => {
      let x: number;
      do x = a.entier(d === 1 ? 100 : 10, max); while (x % k === 0);
      return x;
    };
    const regle: Record<number, string> = {
      2: 'Un multiple de 2 se termine par 0, 2, 4, 6 ou 8.',
      5: 'Un multiple de 5 se termine par 0 ou 5.',
      10: 'Un multiple de 10 se termine par 0.',
    };
    return {
      gabarit: 'qcm',
      consigne: `Lequel de ces nombres est un multiple de ${k} ?`,
      options: optionsNumeriques(a, String(m), [non(), non(), non()].map(String), () => String(non())),
      reponse: String(m),
      indice: regle[k] ?? `Cherche le nombre qui s’obtient en multipliant ${k} par un nombre entier.`,
      explication: `${regle[k] ? `${regle[k]} ` : ''}${m} = ${k} × ${m / k}. Donc ${m} est un multiple de ${k}.`,
    };
  },
});

// ─────────── Fractions supérieures à 1 : entier + fraction, encadrement

export const fractionsEntiersCm1 = creerGenerateur({
  id: 'fractions-entiers-cm1',
  competence: 'MA-C3-CM1-FRAC-01',
  cycle: 3,
  description: 'Écrire une fraction supérieure à 1 comme un entier plus une fraction inférieure à 1, et inversement ; l’encadrer.',
  generer(a, d) {
    const den = a.entier(2, d === 3 ? 20 : 10);
    const e = a.entier(1, d === 1 ? 5 : 9);
    const r = a.entier(1, den - 1);
    const num = e * den + r;
    const calcul = `${e} × ${den} = ${e * den}, et ${num} = ${e * den} + ${r}. Donc ${num}/${den} = ${e} + ${r}/${den}.`;
    if (d === 1) {
      const entre = (x: number) => `entre ${x} et ${x + 1}`;
      return {
        gabarit: 'qcm',
        consigne: `Entre quels nombres entiers consécutifs se trouve ${num}/${den} ?`,
        options: options(a, entre(e), [entre(e - 1), entre(e + 1), entre(r)], () => entre(e + a.entier(2, 5))),
        reponse: entre(e),
        indice: `Cherche combien de fois ${den}/${den}, c’est-à-dire 1, il y a dans ${num}/${den}.`,
        explication: `${calcul} ${num}/${den} est donc ${entre(e)}.`,
      };
    }
    if (d === 2) {
      const entier = a.suivant() < 0.5;
      return {
        gabarit: 'saisie',
        consigne: entier ? `Complète : ${num}/${den} = … + ${r}/${den}` : `Complète : ${num}/${den} = ${e} + …/${den}`,
        reponse: String(entier ? e : r),
        indice: `${den}/${den} = 1. Cherche combien de fois ${den} il y a dans ${num}.`,
        explication: calcul,
      };
    }
    return {
      gabarit: 'saisie',
      consigne: `Complète : ${e} + ${r}/${den} = …/${den}`,
      reponse: String(num),
      indice: `1 = ${den}/${den}. Écris ${e} comme une fraction de dénominateur ${den}.`,
      explication: `${e} = ${e * den}/${den}. ${e * den}/${den} + ${r}/${den} = ${num}/${den}.`,
    };
  },
});

// ─────────── Comparer des fractions

export const comparerFractionsCm1 = creerGenerateur({
  id: 'comparer-fractions-cm1',
  competence: 'MA-C3-CM1-FRAC-02',
  cycle: 3,
  description: 'Comparer des fractions de même dénominateur ou de même numérateur, ou une fraction et un entier.',
  generer(a, d) {
    let gauche: string;
    let droite: string;
    let c: number;
    let explication: string;
    let indice: string;
    if (d === 1) {
      const den = a.entier(3, 20);
      const p = a.entier(1, 2 * den);
      // Pas d'égalité évidente du type 3/8 = 3/8.
      let q = a.entier(1, 2 * den - 1);
      if (q >= p) q += 1;
      [gauche, droite, c] = [`${p}/${den}`, `${q}/${den}`, Math.sign(p - q)];
      indice = 'Les deux fractions ont le même dénominateur : compare les numérateurs.';
      explication = `Même dénominateur ${den} : les parts ont la même taille. On compare les nombres de parts : ${p} ${signe(c)} ${q}. Donc ${gauche} ${signe(c)} ${droite}.`;
    } else if (d === 2 && a.suivant() < 0.5) {
      const p = a.entier(1, 9);
      let x = a.entier(2, 20);
      let y = a.entier(2, 20);
      if (x === y) y = x === 20 ? 19 : x + 1;
      [gauche, droite, c] = [`${p}/${x}`, `${p}/${y}`, Math.sign(y - x)];
      indice = 'Même numérateur : plus le dénominateur est grand, plus chaque part est petite.';
      explication = `Partager l’unité en ${x} donne des parts ${x < y ? 'plus grandes' : 'plus petites'} qu’en ${y}. Avec ${p} part${p > 1 ? 's' : ''} de chaque, ${gauche} ${signe(c)} ${droite}.`;
    } else {
      // Fraction et entier : 1 à la difficulté 2, un entier plus grand à la difficulté 3.
      const n = d === 2 ? 1 : a.entier(1, 6);
      const den = a.entier(2, d === 2 ? 12 : 20);
      let p = Math.max(1, n * den + a.entier(-(den - 1), den - 1));
      // Difficulté 2 : pas d'égalité évidente du type 2/2 = 1.
      if (d === 2 && p === den) p += a.suivant() < 0.5 ? -1 : 1;
      const entierAGauche = a.suivant() < 0.5;
      c = Math.sign(p - n * den) * (entierAGauche ? -1 : 1);
      [gauche, droite] = entierAGauche ? [String(n), `${p}/${den}`] : [`${p}/${den}`, String(n)];
      indice = `Écris ${n} comme une fraction de dénominateur ${den}.`;
      explication = `${n} = ${n * den}/${den}. On compare ${p}/${den} et ${n * den}/${den} : ${gauche} ${signe(c)} ${droite}.`;
    }
    return {
      gabarit: 'qcm',
      consigne: `Complète avec <, > ou = : ${gauche} … ${droite}`,
      options: ['<', '>', '='],
      reponse: signe(c),
      indice,
      explication,
    };
  },
});

// ─────────── Additionner et soustraire des fractions de même dénominateur

export const additionnerFractionsCm1 = creerGenerateur({
  id: 'additionner-fractions-cm1',
  competence: 'MA-C3-CM1-FRAC-03',
  cycle: 3,
  description: 'Additionner et soustraire des fractions de même dénominateur, ou un entier et une fraction.',
  generer(a, d) {
    // Le résultat n'est jamais un entier ni une fraction simplifiable : une seule écriture attendue.
    for (;;) {
      const den = a.entier(3, d === 3 ? 20 : 12);
      if (d === 3) {
        const n = a.entier(1, 4);
        const p = a.entier(1, den - 1);
        const plus = a.suivant() < 0.5;
        const r = plus ? n * den + p : n * den - p;
        if (pgcd(r, den) !== 1) continue;
        return {
          gabarit: 'saisie',
          consigne: `Calcule : ${n} ${plus ? '+' : '−'} ${p}/${den}`,
          reponse: `${r}/${den}`,
          indice: `Écris ${n} comme une fraction de dénominateur ${den}.`,
          explication: `${n} = ${n * den}/${den}. ${n * den} ${plus ? '+' : '−'} ${p} = ${r}. Le résultat est ${r}/${den}.`,
        };
      }
      const plus = d === 1 || a.suivant() < 0.5;
      const p = a.entier(1, d === 1 ? den - 2 : 2 * den);
      const q = plus ? a.entier(1, d === 1 ? den - 1 - p : 2 * den) : a.entier(1, p - 1 || 1);
      const r = plus ? p + q : p - q;
      if (r <= 0 || q <= 0 || pgcd(r, den) !== 1 || (d === 1 && r >= den)) continue;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${p}/${den} ${plus ? '+' : '−'} ${q}/${den}`,
        reponse: `${r}/${den}`,
        indice: 'Le dénominateur ne change pas : il donne la taille des parts.',
        explication: `Les deux fractions comptent des parts de même taille. ${p} ${plus ? '+' : '−'} ${q} = ${r}. Le résultat est ${r}/${den}.`,
      };
    }
  },
});

// ─────────── Fraction unitaire d'une quantité ou d'une grandeur

const PARTS: [string, number][] = [['la moitié', 2], ['le tiers', 3], ['le quart', 4]];
const OBJETS = ['billes', 'images', 'cartes', 'perles', 'timbres', 'bonbons'];
const GRANDEURS: { phrase: (n: string, k: number) => string; question: string; unite: string; reponse: string }[] = [
  { phrase: (n, k) => `Un ruban mesure ${n} cm. Léa en coupe 1/${k}.`, question: 'Quelle longueur coupe-t-elle ?', unite: 'cm', reponse: 'Elle coupe' },
  { phrase: (n, k) => `Une bouteille contient ${n} cL. Tom en boit 1/${k}.`, question: 'Quelle quantité boit-il ?', unite: 'cL', reponse: 'Il boit' },
  { phrase: (n, k) => `Un trajet mesure ${n} m. Nora en parcourt 1/${k}.`, question: 'Quelle distance parcourt-elle ?', unite: 'm', reponse: 'Elle parcourt' },
];

export const fractionQuantiteCm1 = creerGenerateur({
  id: 'fraction-quantite-cm1',
  competence: 'MA-C3-CM1-FRAC-04',
  cycle: 3,
  description: 'Calculer une fraction unitaire d’une quantité ou d’une grandeur.',
  generer(a, d) {
    if (d === 1) {
      const [mot, k] = a.choisir(PARTS);
      const m = a.entier(2, 25);
      const objet = a.choisir(OBJETS);
      return {
        gabarit: 'saisie',
        consigne: `Calcule ${mot} de ${k * m} ${objet}.`,
        reponse: String(m),
        indice: `Partage en ${k} parts égales.`,
        explication: `Prendre ${mot}, c’est partager en ${k} parts égales et en prendre une. ${k * m} ÷ ${k} = ${m}. C’est ${m} ${objet}.`,
      };
    }
    if (d === 2) {
      const k = a.entier(5, 10);
      const m = a.entier(2, 20);
      return {
        gabarit: 'saisie',
        consigne: `Calcule 1/${k} de ${fr(k * m)}.`,
        reponse: String(m),
        indice: `1/${k} d’un nombre, c’est ce nombre partagé en ${k} parts égales.`,
        explication: `${fr(k * m)} ÷ ${k} = ${m}. Donc 1/${k} de ${fr(k * m)} vaut ${m}.`,
      };
    }
    const k = a.choisir([2, 3, 4, 5, 6, 8, 10, 12, 15, 20]);
    const m = a.entier(2, Math.floor(500 / k));
    const g = a.choisir(GRANDEURS);
    return {
      gabarit: 'saisie',
      consigne: `${g.phrase(fr(k * m), k)} ${g.question} Réponds en ${g.unite}.`,
      reponse: String(m),
      indice: `Partage ${fr(k * m)} ${g.unite} en ${k} parts égales.`,
      explication: `${fr(k * m)} ÷ ${k} = ${m}. ${g.reponse} ${m} ${g.unite}.`,
    };
  },
});

// ─────────── Fractions décimales et écriture à virgule (dixièmes et centièmes)

export const fractionsDecimalesCm1 = creerGenerateur({
  id: 'fractions-decimales-cm1',
  competence: 'MA-C3-CM1-DEC-01',
  cycle: 3,
  description: 'Passer d’une fraction décimale ou d’une somme de fractions décimales à l’écriture à virgule, et inversement.',
  generer(a, d) {
    if (d === 1) {
      const k = a.entier(1, 2);
      let n = a.entier(10 ** k + 1, k === 1 ? 9999 : 99999);
      if (n % 10 === 0) n += 1;
      const r = depuisEntier(n, k);
      return {
        gabarit: 'saisie',
        consigne: `Écris sous forme décimale : ${fr(n)}/${10 ** k}`,
        reponse: r,
        indice: k === 1 ? 'Dans 10 dixièmes, il y a 1 unité.' : 'Dans 100 centièmes, il y a 1 unité.',
        explication: `${fr(n)}/${10 ** k}, c’est ${fr(n)} ${k === 1 ? 'dixièmes' : 'centièmes'}. ${10 ** k} ${k === 1 ? 'dixièmes' : 'centièmes'} font 1 unité. ${fr(n)}/${10 ** k} = ${frDecimal(r)}.`,
      };
    }
    if (d === 2) {
      const e = a.entier(1, 999);
      const dx = a.suivant() < 0.25 ? 0 : a.entier(1, 9);
      const ct = a.entier(1, 9);
      const termes = [String(e), dx ? `${dx}/10` : '', `${ct}/100`].filter(Boolean);
      const ecrits = a.suivant() < 0.3 ? a.melanger(termes) : termes;
      const r = `${e},${dx}${ct}`;
      return {
        gabarit: 'saisie',
        consigne: `Écris sous forme décimale : ${ecrits.join(' + ')}`,
        reponse: r,
        indice: 'Le chiffre des dixièmes vient juste après la virgule, puis celui des centièmes.',
        explication: `Il y a ${e} unité${Number(e) > 1 ? 's' : ''}, ${dx} dixième${dx > 1 ? 's' : ''} et ${ct} centième${ct > 1 ? 's' : ''}. Le nombre est ${frDecimal(r)}.`,
      };
    }
    const k = a.entier(1, 2);
    let n = a.entier(11, 9999);
    if (n % 10 === 0) n += 1;
    const x = depuisEntier(n, k);
    return {
      gabarit: 'saisie',
      consigne: `Complète : ${frDecimal(x)} = …/${10 ** k}`,
      reponse: String(n),
      indice: k === 1 ? 'Combien de dixièmes y a-t-il en tout dans ce nombre ?' : 'Combien de centièmes y a-t-il en tout dans ce nombre ?',
      explication: `1 unité = ${10 ** k} ${k === 1 ? 'dixièmes' : 'centièmes'}. ${frDecimal(x)}, c’est ${fr(n)} ${k === 1 ? 'dixièmes' : 'centièmes'}. ${frDecimal(x)} = ${fr(n)}/${10 ** k}.`,
    };
  },
});

// ─────────── Comparer, ranger, intercaler des décimaux (au plus deux décimales)

export const comparerDecimauxCm1 = creerGenerateur({
  id: 'comparer-decimaux-cm1',
  competence: 'MA-C3-CM1-DEC-02',
  cycle: 3,
  description: 'Comparer, ranger et intercaler des nombres décimaux qui ont au plus deux chiffres après la virgule.',
  generer(a, d) {
    if (d === 1) {
      const e = a.entier(0, 99);
      const forme = a.entier(0, 3);
      let x: string;
      let y: string;
      if (forme === 0) {
        // Égalité déguisée : 3,7 et 3,70.
        const dx = a.entier(1, 9);
        [x, y] = [`${e},${dx}`, `${e},${dx}0`];
      } else {
        // Un dixième contre deux décimales : le piège « 3,45 > 3,5 parce que 45 > 5 ».
        const dx = a.entier(1, 8);
        const autre = a.entier(10, 99);
        [x, y] = [`${e},${dx}`, `${e},${autre % 10 === 0 ? autre + 1 : autre}`];
      }
      if (a.suivant() < 0.5) [x, y] = [y, x];
      const c = comparerDecimaux(x, y);
      return {
        gabarit: 'qcm',
        consigne: `Complète avec <, > ou = : ${frDecimal(x)} … ${frDecimal(y)}`,
        options: ['<', '>', '='],
        reponse: signe(c),
        indice: 'Les parties entières sont égales : compare les dixièmes, puis les centièmes.',
        explication:
          c === 0
            ? `Un zéro à la fin de la partie décimale ne change pas la valeur : ${frDecimal(x)} = ${frDecimal(y)}.`
            : `On compare les dixièmes, puis les centièmes. ${frDecimal(x)} ${signe(c)} ${frDecimal(y)}. Le nombre de chiffres après la virgule ne compte pas.`,
      };
    }
    if (d === 2) {
      const e = a.entier(0, 50);
      const valeurs = new Set<string>();
      while (valeurs.size < 4) {
        const dec = a.entier(1, 2);
        const n = (e + a.entier(0, 1)) * 10 ** dec + a.entier(1, 10 ** dec - 1);
        valeurs.add(depuisEntier(n, dec));
      }
      const liste = [...valeurs];
      const grand = a.suivant() < 0.5;
      const tri = [...liste].sort(comparerDecimaux);
      const cible = grand ? tri[3]! : tri[0]!;
      return {
        gabarit: 'qcm',
        consigne: `Quel est le plus ${grand ? 'grand' : 'petit'} de ces nombres ?`,
        options: a.melanger(liste.map(frDecimal)),
        reponse: frDecimal(cible),
        indice: 'Compare d’abord les parties entières, puis les dixièmes, puis les centièmes.',
        explication: `Rangés dans l’ordre croissant : ${tri.map(frDecimal).join(' < ')}.`,
      };
    }
    // Intercaler entre deux dixièmes consécutifs : 4,2 < 4,25 < 4,3.
    const bas = a.entier(10, 999);
    const dedans = bas * 10 + a.entier(1, 9);
    const pieges = [(bas + 1) * 10 + a.entier(1, 9), (bas - 1) * 10 + a.entier(1, 9), bas * 10 + 10 * a.entier(2, 5)];
    const enCentiemes = (n: number) => frDecimal(depuisEntier(n, 2));
    const borne = (b: number) => frDecimal(depuisEntier(b, 1));
    const borne2 = (b: number) => frDecimal(`${Math.floor(b / 10)},${b % 10}0`);
    return {
      gabarit: 'qcm',
      consigne: `Quel nombre est compris entre ${borne(bas)} et ${borne(bas + 1)} ?`,
      options: optionsNumeriques(a, enCentiemes(dedans), pieges.map(enCentiemes), () => enCentiemes((bas + 2) * 10 + a.entier(0, 9))),
      reponse: enCentiemes(dedans),
      indice: `Écris les deux bornes avec deux chiffres après la virgule : ${borne2(bas)} et ${borne2(bas + 1)}.`,
      explication: `${borne2(bas)} < ${enCentiemes(dedans)} < ${borne2(bas + 1)}. Les autres nombres sont en dehors de l’intervalle.`,
    };
  },
});

// ─────────── Partie entière et arrondi à l'unité

export const arrondiCm1 = creerGenerateur({
  id: 'arrondi-cm1',
  competence: 'MA-C3-CM1-DEC-03',
  cycle: 3,
  description: 'Donner la partie entière et l’arrondi à l’unité d’un nombre décimal.',
  generer(a, d) {
    let centiemes: number;
    if (d === 2 || (d === 1 && a.suivant() < 0.5)) {
      const dixiemes = a.entier(11, 9999);
      centiemes = 10 * (dixiemes % 10 === 0 ? dixiemes + 1 : dixiemes);
    } else {
      const n = a.entier(101, 99999);
      centiemes = n % 100 === 0 ? n + 1 : n;
    }
    // Cas limites : x,5 ; x,49 ; x,95 vers l'entier suivant.
    if (d === 3 && a.suivant() < 0.4) centiemes = a.entier(1, 999) * 100 + a.choisir([50, 49, 51, 95, 5]);
    const x = depuisEntier(centiemes, 2);
    const entiere = Math.floor(centiemes / 100);
    if (d === 1) {
      return {
        gabarit: 'saisie',
        consigne: `Donne la partie entière de ${frDecimal(x)}.`,
        reponse: String(entiere),
        indice: 'La partie entière est écrite avant la virgule.',
        explication: `${frDecimal(x)} est compris entre ${fr(entiere)} et ${fr(entiere + 1)}. Sa partie entière est ${fr(entiere)}.`,
      };
    }
    const reste = centiemes % 100;
    const arrondi = reste >= 50 ? entiere + 1 : entiere;
    return {
      gabarit: 'saisie',
      consigne: `Donne l’arrondi à l’unité de ${frDecimal(x)}.`,
      reponse: String(arrondi),
      indice: 'Regarde le chiffre des dixièmes.',
      explication: `${frDecimal(x)} est entre ${fr(entiere)} et ${fr(entiere + 1)}. Le chiffre des dixièmes est ${Math.floor(reste / 10)}. ${reste >= 50 ? 'Il vaut 5 ou plus : on prend l’entier supérieur.' : 'Il est inférieur à 5 : on garde l’entier inférieur.'} L’arrondi est ${fr(arrondi)}.`,
    };
  },
});
