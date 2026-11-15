// 6e, nombres, calculs et fractions. Source : programme de mathématiques du cycle 3 (BO n°16 du 17 avril 2025).
import { comparerDecimaux, decaler, depuisEntier, normaliserDecimal } from './decimaux';
import { creerGenerateur, fr, frDecimal, optionsNumeriques, type Aleatoire } from './outils';

const PUISSANCES = [10, 100, 1000];
const nomPuissance = (p: number) => fr(p);

/** Un décimal positif tiré au hasard : partie entière dans [min, max], au plus `dec` décimales. */
function decimal(a: Aleatoire, min: number, max: number, dec: number): string {
  return depuisEntier(a.entier(min * 10 ** dec, max * 10 ** dec), dec);
}

// ─────────── Comparer et ranger des décimaux

export const comparerDecimaux6e = creerGenerateur({
  id: 'comparer-decimaux-6e',
  competence: 'MA-C3-6E-DEC-01',
  cycle: 3,
  description: 'Comparer et ranger des nombres décimaux, y compris quand leur nombre de décimales diffère.',
  generer(a, d) {
    if (d === 3) {
      const x = decimal(a, 0, 20, 2);
      const forme = a.entier(0, 2);
      // Égalité déguisée (3,7 et 3,70), décimale ajoutée, ou nombre voisin.
      const y = forme === 0 ? (x.includes(',') ? `${x}0` : `${x},0`) : forme === 1 ? (x.includes(',') ? `${x}${a.entier(1, 9)}` : `${x},${a.entier(1, 9)}`) : decimal(a, 0, 20, 3);
      const c = comparerDecimaux(x, y);
      const signe = c === 0 ? '=' : c < 0 ? '<' : '>';
      return {
        gabarit: 'qcm',
        consigne: `Complète avec <, > ou = : ${frDecimal(x)} … ${frDecimal(y)}`,
        options: ['<', '>', '='],
        reponse: signe,
        indice: 'Écris les deux nombres avec autant de décimales. Compare ensuite chiffre à chiffre.',
        explication:
          c === 0
            ? `Un zéro à la fin de la partie décimale ne change pas la valeur : ${frDecimal(x)} = ${frDecimal(y)}.`
            : `On compare rang par rang, en partant de la gauche. ${frDecimal(x)} ${signe} ${frDecimal(y)}.`,
      };
    }
    const e = a.entier(0, 30);
    const valeurs = new Set<string>();
    while (valeurs.size < 4) {
      const dec = a.entier(1, 3);
      // Difficulté 2 : parties entières voisines, comme 9,99 et 10,1.
      const base = d === 2 ? e + a.entier(0, 1) : e;
      valeurs.add(normaliserDecimal(depuisEntier(base * 10 ** dec + a.entier(1, 10 ** dec - 1), dec)));
    }
    const liste = [...valeurs];
    const plusGrand = d === 1;
    const tri = [...liste].sort(comparerDecimaux);
    const cible = plusGrand ? tri[3]! : tri[0]!;
    return {
      gabarit: 'qcm',
      consigne: `Quel est le plus ${plusGrand ? 'grand' : 'petit'} de ces nombres ?`,
      options: a.melanger(liste.map(frDecimal)),
      reponse: frDecimal(cible),
      indice: 'Compare d’abord les parties entières, puis les dixièmes, puis les centièmes.',
      explication: `Rangés dans l’ordre croissant : ${tri.map(frDecimal).join(' < ')}. Le nombre de chiffres après la virgule ne compte pas.`,
    };
  },
});

// ─────────── Multiplier et diviser par 10, 100, 1 000 ; multiplier par 0,1 ; 0,01 ; 0,001

export const multiplierDiviser6e = creerGenerateur({
  id: 'multiplier-diviser-10-6e',
  competence: 'MA-C3-6E-DEC-02',
  cycle: 3,
  description: 'Multiplier ou diviser un décimal par 10, 100, 1 000 ; multiplier par 0,1, 0,01, 0,001.',
  generer(a, d) {
    const x = decimal(a, 1, d === 1 ? 99 : 999, a.entier(0, 2));
    const i = a.entier(0, 2);
    const p = PUISSANCES[i]!;
    const k = i + 1;
    if (d === 1) {
      const r = decaler(x, k);
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${frDecimal(x)} × ${nomPuissance(p)}`,
        reponse: r,
        indice: `Chaque chiffre prend une valeur ${nomPuissance(p)} fois plus grande.`,
        explication: `Multiplier par ${nomPuissance(p)}, c’est décaler chaque chiffre de ${k} rang${k > 1 ? 's' : ''} vers la gauche. ${frDecimal(x)} × ${nomPuissance(p)} = ${frDecimal(r)}.`,
      };
    }
    const r = decaler(x, -k);
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${frDecimal(x)} ÷ ${nomPuissance(p)}`,
        reponse: r,
        indice: `Chaque chiffre prend une valeur ${nomPuissance(p)} fois plus petite.`,
        explication: `Diviser par ${nomPuissance(p)}, c’est décaler chaque chiffre de ${k} rang${k > 1 ? 's' : ''} vers la droite. ${frDecimal(x)} ÷ ${nomPuissance(p)} = ${frDecimal(r)}.`,
      };
    }
    const facteur = decaler('1', -k);
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${frDecimal(x)} × ${facteur}`,
      reponse: r,
      indice: `Multiplier par ${facteur}, c’est diviser par ${nomPuissance(p)}.`,
      explication: `${facteur} = 1/${nomPuissance(p)}. Multiplier par ${facteur} revient à diviser par ${nomPuissance(p)}. ${frDecimal(x)} × ${facteur} = ${frDecimal(r)}.`,
    };
  },
});

// ─────────── Fractions décimales et écriture à virgule

export const fractionsDecimales6e = creerGenerateur({
  id: 'fractions-decimales-6e',
  competence: 'MA-C3-6E-DEC-03',
  cycle: 3,
  description: 'Passer d’une fraction décimale ou d’une somme de fractions décimales à l’écriture à virgule.',
  generer(a, d) {
    if (d === 3) {
      const k = a.entier(1, 3);
      const n = a.entier(1, 9);
      const x = decaler(String(n), -k);
      const den = (j: number) => nomPuissance(10 ** j);
      return {
        gabarit: 'qcm',
        consigne: `Quelle fraction est égale à ${x} ?`,
        options: a.melanger([1, 2, 3].map((j) => `${n}/${den(j)}`).concat(`${n * 10}/10`)),
        reponse: `${n}/${den(k)}`,
        indice: 'Repère le rang du dernier chiffre : dixièmes, centièmes ou millièmes.',
        explication: `Le chiffre ${n} est au rang des ${['dixièmes', 'centièmes', 'millièmes'][k - 1]}. ${x} = ${n}/${den(k)}.`,
      };
    }
    if (d === 1) {
      const k = a.entier(1, 3);
      const n = a.entier(1, 10 ** k * 5);
      const r = decaler(String(n), -k);
      return {
        gabarit: 'saisie',
        consigne: `Écris sous forme décimale : ${fr(n)}/${nomPuissance(10 ** k)}`,
        reponse: r,
        indice: `Diviser par ${nomPuissance(10 ** k)}, c’est décaler les chiffres de ${k} rang${k > 1 ? 's' : ''} vers la droite.`,
        explication: `${fr(n)}/${nomPuissance(10 ** k)} = ${frDecimal(r)}.`,
      };
    }
    const e = a.entier(1, 99);
    const dixiemes = a.entier(0, 9);
    const milliemes = a.entier(1, 9);
    const r = normaliserDecimal(`${e},${dixiemes}0${milliemes}`);
    const termes = [String(e), dixiemes ? `${dixiemes}/10` : '', `${milliemes}/1${' '}000`].filter(Boolean);
    return {
      gabarit: 'saisie',
      consigne: `Écris sous forme décimale : ${termes.join(' + ')}`,
      reponse: r,
      indice: 'Place chaque chiffre dans son rang. Mets un zéro dans le rang vide.',
      explication: `Il y a ${e} unités, ${dixiemes} dixième${dixiemes > 1 ? 's' : ''}, 0 centième et ${milliemes} millième${milliemes > 1 ? 's' : ''}. Le nombre est ${frDecimal(r)}.`,
    };
  },
});

// ─────────── Arrondir

const RANGS = [
  { nom: 'à l’unité', dec: 0, suivant: 'des dixièmes' },
  { nom: 'au dixième', dec: 1, suivant: 'des centièmes' },
  { nom: 'au centième', dec: 2, suivant: 'des millièmes' },
];

export const arrondir6e = creerGenerateur({
  id: 'arrondir-6e',
  competence: 'MA-C3-6E-DEC-04',
  cycle: 3,
  description: 'Donner l’arrondi d’un décimal à l’unité, au dixième ou au centième.',
  generer(a, d) {
    const rang = RANGS[d - 1]!;
    const tirage = a.entier(1000, 99999);
    const milliemes = tirage % 10 === 0 ? tirage + 1 : tirage;
    const x = depuisEntier(milliemes, 3);
    const pas = 10 ** (3 - rang.dec);
    const arrondi = Math.round(milliemes / pas);
    const r = depuisEntier(arrondi, rang.dec);
    const chiffre = Math.floor(milliemes / (pas / 10)) % 10;
    const bas = depuisEntier(Math.floor(milliemes / pas), rang.dec);
    const haut = depuisEntier(Math.floor(milliemes / pas) + 1, rang.dec);
    return {
      gabarit: 'saisie',
      consigne: `Donne l’arrondi ${rang.nom} de ${frDecimal(x)}.`,
      reponse: r,
      indice: `Regarde le chiffre ${rang.suivant}.`,
      explication: `${frDecimal(x)} est entre ${frDecimal(bas)} et ${frDecimal(haut)}. Le chiffre ${rang.suivant} est ${chiffre}. ${chiffre >= 5 ? 'Il vaut 5 ou plus : on prend la valeur supérieure.' : 'Il est inférieur à 5 : on garde la valeur inférieure.'} L’arrondi est ${frDecimal(r)}.`,
    };
  },
});

// ─────────── Multiplier deux décimaux

export const multiplierDecimaux6e = creerGenerateur({
  id: 'multiplier-decimaux-6e',
  competence: 'MA-C3-6E-DEC-05',
  cycle: 3,
  description: 'Calculer le produit de deux nombres décimaux.',
  generer(a, d) {
    const p = d === 1 ? 1 : a.entier(1, 2);
    const q = d === 3 ? a.entier(1, 2) : a.entier(0, 1);
    const tA = a.entier(2, d === 1 ? 99 : 999);
    const tB = a.entier(2, d === 3 ? 99 : 9);
    // Pas de zéro final : chaque facteur garde ses décimales.
    const A = tA % 10 === 0 ? tA + 1 : tA;
    const B = q > 0 && tB % 10 === 0 ? tB + 1 : tB;
    const x = depuisEntier(A, p);
    const y = depuisEntier(B, q);
    const r = depuisEntier(A * B, p + q);
    const n = x.split(',')[1]?.length ?? 0;
    const m = y.split(',')[1]?.length ?? 0;
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${frDecimal(x)} × ${frDecimal(y)}`,
      reponse: r,
      indice: 'Calcule sans les virgules. Compte ensuite les chiffres après la virgule.',
      explication: `${fr(Number(x.replace(',', '')))} × ${fr(Number(y.replace(',', '')))} = ${fr(Number(x.replace(',', '')) * Number(y.replace(',', '')))}. Les facteurs ont ${n + m} chiffre${n + m > 1 ? 's' : ''} après la virgule en tout. ${frDecimal(x)} × ${frDecimal(y)} = ${frDecimal(r)}.`,
    };
  },
});

// ─────────── Diviser un décimal par un entier inférieur à 10

export const diviserDecimal6e = creerGenerateur({
  id: 'diviser-decimal-6e',
  competence: 'MA-C3-6E-DEC-06',
  cycle: 3,
  description: 'Diviser un nombre décimal par un nombre entier non nul inférieur à 10.',
  generer(a, d) {
    const diviseur = a.entier(2, 9);
    const dec = d === 1 ? 1 : 2;
    const Q = a.entier(10, d === 3 ? 9999 : 999);
    const q = depuisEntier(Q, dec);
    const x = depuisEntier(Q * diviseur, dec);
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${frDecimal(x)} ÷ ${diviseur}`,
      reponse: q,
      indice: 'Pose la division. Place la virgule au quotient quand tu abaisses le premier chiffre après la virgule.',
      explication: `${frDecimal(q)} × ${diviseur} = ${frDecimal(x)}. Donc ${frDecimal(x)} ÷ ${diviseur} = ${frDecimal(q)}.`,
    };
  },
});

// ─────────── Division euclidienne

export const divisionEuclidienne6e = creerGenerateur({
  id: 'division-euclidienne-6e',
  competence: 'MA-C3-6E-DIV-01',
  cycle: 3,
  description: 'Effectuer la division euclidienne d’un entier par un entier inférieur à 100.',
  generer(a, d) {
    const diviseur = d === 1 ? a.entier(2, 9) : d === 2 ? a.entier(11, 25) : a.entier(26, 99);
    const quotient = a.entier(d === 1 ? 10 : 5, d === 1 ? 999 : 99);
    const reste = a.entier(0, diviseur - 1);
    const dividende = diviseur * quotient + reste;
    const chercheReste = a.suivant() < 0.5;
    return {
      gabarit: 'saisie',
      consigne: `Dans la division euclidienne de ${fr(dividende)} par ${diviseur}, quel est le ${chercheReste ? 'reste' : 'quotient'} ?`,
      reponse: String(chercheReste ? reste : quotient),
      indice: 'Le reste est toujours plus petit que le diviseur.',
      explication: `${fr(dividende)} = ${diviseur} × ${fr(quotient)} + ${reste}, et ${reste} < ${diviseur}. Le quotient est ${fr(quotient)}, le reste est ${reste}.`,
    };
  },
});

// ─────────── Fractions et décimaux usuels (automatismes)

const USUELS: [string, string][] = [['1/4', '0,25'], ['1/2', '0,5'], ['3/4', '0,75'], ['3/2', '1,5'], ['4/2', '2'], ['5/2', '2,5']];
/** Écriture la plus simple d'un nombre de quarts : 2 → 1/2, 4 → 1, 6 → 3/2. */
function quarts(k: number): string {
  if (k % 4 === 0) return String(k / 4);
  if (k % 2 === 0) return `${k / 2}/2`;
  return `${k}/4`;
}

export const fractionsUsuelles6e = creerGenerateur({
  id: 'fractions-usuelles-6e',
  competence: 'MA-C3-6E-FRAC-01',
  cycle: 3,
  description: 'Automatismes : fractions usuelles et écritures décimales, égalités avec quarts et demis.',
  generer(a, d) {
    if (d === 3) {
      const termes = [1, 2, 3];
      const x = a.choisir([...termes, 4]);
      const y = a.choisir(termes);
      const soustraction = a.suivant() < 0.5 && x > y;
      const r = soustraction ? x - y : x + y;
      const ecrireX = x === 4 ? '1' : quarts(x);
      const pieges = [r + 1, r - 1, r + 2, soustraction ? x + y : Math.abs(x - y)].filter((k) => k > 0 && k !== r).map(quarts);
      return {
        gabarit: 'qcm',
        consigne: `Complète : ${ecrireX} ${soustraction ? '−' : '+'} ${quarts(y)} = …`,
        options: optionsNumeriques(a, quarts(r), pieges, () => quarts(a.entier(1, 8))),
        reponse: quarts(r),
        indice: 'Écris tout en quarts : 1/2 = 2/4 et 1 = 4/4.',
        explication: `En quarts : ${x}/4 ${soustraction ? '−' : '+'} ${y}/4 = ${r}/4.${quarts(r) === `${r}/4` ? '' : ` ${r}/4 = ${quarts(r)}.`}`,
      };
    }
    const [f, dec] = a.choisir(USUELS);
    const autresDec = USUELS.map((u) => u[1]).filter((v) => v !== dec);
    const autresF = USUELS.map((u) => u[0]).filter((v) => v !== f && v !== '4/2');
    if (d === 1) {
      const naif = f.replace('/', ',');
      return {
        gabarit: 'qcm',
        consigne: `Quelle est l\u2019écriture décimale de ${f} ?`,
        options: optionsNumeriques(a, dec, [naif, ...a.melanger(autresDec)], () => a.choisir(autresDec)),
        reponse: dec,
        indice: `${f}, c\u2019est ${f.split('/')[0]} divisé par ${f.split('/')[1]}.`,
        explication: `${f.split('/')[0]} ÷ ${f.split('/')[1]} = ${dec}. Donc ${f} = ${dec}.`,
      };
    }
    const naif = dec.includes(',') ? [`${dec.replace(',', '')}/10`] : [];
    return {
      gabarit: 'qcm',
      consigne: `Quelle fraction est égale à ${dec} ?`,
      options: optionsNumeriques(a, f, [...naif, ...a.melanger(autresF)], () => a.choisir(autresF)),
      reponse: f,
      indice: 'Divise le numérateur par le dénominateur pour vérifier.',
      explication: `${f.split('/')[0]} ÷ ${f.split('/')[1]} = ${dec}. Donc ${dec} = ${f}.`,
    };
  },
});

// ─────────── Appliquer une fraction à un nombre entier

const QUANTITES = [['œufs', 'œuf'], ['m', 'm'], ['élèves', 'élève'], ['billes', 'bille'], ['€', '€']];

export const fractionDunNombre6e = creerGenerateur({
  id: 'fraction-dun-nombre-6e',
  competence: 'MA-C3-6E-FRAC-02',
  cycle: 3,
  description: 'Calculer une fraction d’une quantité ou d’un nombre entier.',
  generer(a, d) {
    const den = a.entier(d === 1 ? 2 : 3, 10);
    const n = d === 1 ? 1 : a.entier(2, den - 1);
    const part = a.entier(2, 12);
    const total = den * part;
    const r = n * part;
    const [unite] = a.choisir(QUANTITES);
    const consigne = d === 3 ? `Calcule : ${n}/${den} × ${total}` : `Calcule ${n}/${den} de ${total} ${unite}.`;
    const suffixe = d === 3 ? '' : ` ${unite}`;
    return {
      gabarit: 'saisie',
      consigne,
      reponse: String(r),
      indice: `Cherche d’abord 1/${den} de ${total}.`,
      explication: `1/${den} de ${total}, c’est ${total} ÷ ${den} = ${part}. ${n === 1 ? '' : `${n}/${den}, c’est ${n} fois plus : ${n} × ${part} = ${r}. `}Le résultat est ${r}${suffixe}.`,
    };
  },
});

// ─────────── Additionner et soustraire des fractions

function pgcd(x: number, y: number): number {
  return y === 0 ? x : pgcd(y, x % y);
}

export const fractionsOperations6e = creerGenerateur({
  id: 'fractions-operations-6e',
  competence: 'MA-C3-6E-FRAC-03',
  cycle: 3,
  description: 'Additionner et soustraire des fractions dont un dénominateur est multiple de l\u2019autre.',
  generer(a, d) {
    const petit = a.entier(2, 6);
    const k = d === 1 ? 1 : a.entier(2, 3);
    const grand = petit * k;
    const x = a.entier(1, petit + 2);
    const y = a.entier(1, grand + 3);
    const soustraction = a.suivant() < 0.4 && x * k > y;
    const numerateur = soustraction ? x * k - y : x * k + y;
    const reponse = `${numerateur}/${grand}`;
    // Erreurs classiques : ajouter numérateurs et dénominateurs, oublier de convertir.
    const pieges = soustraction
      ? [`${Math.abs(x - y)}/${grand}`, `${numerateur}/${petit}`, `${x * k + y}/${grand}`]
      : [`${x + y}/${petit + grand}`, `${x + y}/${grand}`, `${numerateur}/${petit}`];
    const g = pgcd(numerateur, grand);
    return {
      gabarit: 'qcm',
      consigne: `Calcule : ${x}/${petit} ${soustraction ? '−' : '+'} ${y}/${grand}`,
      options: optionsNumeriques(a, reponse, pieges, () => `${a.entier(1, 3 * grand)}/${grand}`),
      reponse,
      indice: k === 1 ? 'Les dénominateurs sont égaux : calcule avec les numérateurs.' : `Écris ${x}/${petit} avec le dénominateur ${grand}.`,
      explication: `${k === 1 ? '' : `${x}/${petit} = ${x * k}/${grand}. `}${x * k}/${grand} ${soustraction ? '−' : '+'} ${y}/${grand} = ${reponse}.${g > 1 ? ` On peut simplifier : ${reponse} = ${numerateur / g}/${grand / g}.` : ''}`,
    };
  },
});

// ─────────── Pourcentages

const POURCENTAGES: Record<number, string> = { 10: 'un dixième', 20: 'un cinquième', 25: 'un quart', 50: 'la moitié', 75: 'trois quarts' };

export const pourcentages6e = creerGenerateur({
  id: 'pourcentages-6e',
  competence: 'MA-C3-6E-PCT-01',
  cycle: 3,
  description: 'Appliquer un pourcentage simple à une grandeur ou à un nombre.',
  generer(a, d) {
    const t = a.choisir(d === 1 ? [50, 10] : d === 2 ? [25, 20, 10] : [75, 20, 25]);
    const n = a.entier(1, d === 3 ? 50 : 20) * 20;
    const r = (n * t) / 100;
    const contexte = d === 1 ? `de ${n}` : `de ${n} €`;
    return {
      gabarit: 'saisie',
      consigne: `Calcule ${t} % ${contexte}.`,
      reponse: String(r),
      indice: `${t} %, c’est ${t}/100.`,
      explication: `${t} % = ${t}/100, c’est ${POURCENTAGES[t]}. ${t}/100 × ${n} = ${r}.`,
    };
  },
});
