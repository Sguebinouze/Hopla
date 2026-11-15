// CM2, calcul mental, opérations et algèbre. Source : programme de mathématiques du cycle 3 (BO n°16 du 17 avril 2025).
// Au CM2 : décimal × entier (le produit de deux décimaux est en 6e), division décimale par un diviseur à un chiffre.
import { decaler, depuisEntier } from './decimaux';
import { creerGenerateur, fr, frDecimal, type Aleatoire } from './outils';

/** Un décimal positif : `entier` dans [min, max], au plus `dec` décimales, sans zéro final. */
function decimal(a: Aleatoire, min: number, max: number, dec: number): string {
  let n = a.entier(min * 10 ** dec, max * 10 ** dec);
  if (dec > 0 && n % 10 === 0) n += a.entier(1, 9);
  return depuisEntier(n, dec);
}
const decimales = (x: string) => x.split(',')[1]?.length ?? 0;
const sansVirgule = (x: string) => Number(x.replace(',', ''));

// ─────────── × et ÷ par 10, 100, 1 000

export const multiplierDiviser10Cm2 = creerGenerateur({
  id: 'multiplier-diviser-10-cm2',
  competence: 'MA-C3-CM2-CALC-01',
  cycle: 3,
  description: 'Multiplier ou diviser mentalement un nombre décimal par 10, 100 ou 1 000.',
  generer(a, d) {
    const k = a.entier(1, 3);
    const p = fr(10 ** k);
    const fois = d === 1 || (d === 3 && a.suivant() < 0.5);
    // Au CM2, les décimaux s'arrêtent aux millièmes : le résultat d'une division n'a pas plus de trois décimales.
    const x = decimal(a, 1, d === 1 ? 99 : 999, fois ? a.entier(1, 3) : a.entier(0, 3 - k));
    const r = decaler(x, fois ? k : -k);
    const op = fois ? '×' : '÷';
    const sens = fois ? 'gauche' : 'droite';
    if (d === 3) {
      return {
        gabarit: 'saisie',
        consigne: `Complète : ${frDecimal(x)} ${op} … = ${frDecimal(r)}`,
        reponse: String(10 ** k),
        indice: 'Compare la place du chiffre des unités avant et après le calcul.',
        explication: `Chaque chiffre s’est décalé de ${k} rang${k > 1 ? 's' : ''} vers la ${sens}. On a ${fois ? 'multiplié' : 'divisé'} par ${p}. ${frDecimal(x)} ${op} ${p} = ${frDecimal(r)}.`,
      };
    }
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${frDecimal(x)} ${op} ${p}`,
      reponse: r,
      indice: `Chaque chiffre prend une valeur ${p} fois plus ${fois ? 'grande' : 'petite'}.`,
      explication: `${fois ? 'Multiplier' : 'Diviser'} par ${p}, c’est décaler chaque chiffre de ${k} rang${k > 1 ? 's' : ''} vers la ${sens}. ${frDecimal(x)} ${op} ${p} = ${frDecimal(r)}.`,
    };
  },
});

// ─────────── Calcul mental sur les entiers

export const calculMentalEntiersCm2 = creerGenerateur({
  id: 'calcul-mental-entiers-cm2',
  competence: 'MA-C3-CM2-CALC-02',
  cycle: 3,
  description: 'Ajouter ou soustraire 9, 19…, 99 ; multiplier des dizaines, centaines, milliers ; diviser par 4 ou 8 ; distributivité.',
  generer(a, d) {
    if (d === 1) {
      const b = a.choisir([8, 9, 18, 19, 28, 29, 38, 39, 48, 49, 58, 59, 68, 69, 78, 79, 88, 89, 98, 99]);
      const n = a.entier(100, 9999);
      const ajout = a.suivant() < 0.5 || n < b + 10;
      const rond = b + (b % 10 === 9 ? 1 : 2);
      const ecart = rond - b;
      const r = ajout ? n + b : n - b;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${fr(n)} ${ajout ? '+' : '−'} ${b}`,
        reponse: String(r),
        indice: `${b} = ${rond} − ${ecart}.`,
        explication: ajout
          ? `On ajoute ${rond}, puis on retire ${ecart}. ${fr(n)} + ${rond} = ${fr(n + rond)}. ${fr(n + rond)} − ${ecart} = ${fr(r)}.`
          : `On retire ${rond}, puis on ajoute ${ecart}. ${fr(n)} − ${rond} = ${fr(n - rond)}. ${fr(n - rond)} + ${ecart} = ${fr(r)}.`,
      };
    }
    if (d === 2) {
      const x = a.entier(2, 9);
      const y = a.entier(2, 9);
      const i = a.entier(1, 3);
      const j = a.entier(1, 3);
      const X = x * 10 ** i;
      const Y = y * 10 ** j;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${fr(X)} × ${fr(Y)}`,
        reponse: String(X * Y),
        indice: `Calcule ${x} × ${y}, puis compte les zéros.`,
        explication: `${x} × ${y} = ${x * y}. Il y a ${i + j} zéro${i + j > 1 ? 's' : ''} en tout dans les deux facteurs. ${fr(X)} × ${fr(Y)} = ${fr(X * Y)}.`,
      };
    }
    if (a.suivant() < 0.5) {
      const div = a.choisir([4, 8]);
      const q = a.entier(div === 4 ? 12 : 11, div === 4 ? 250 : 125);
      const n = q * div;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${fr(n)} ÷ ${div}`,
        reponse: String(q),
        indice: `Diviser par ${div}, c’est prendre la moitié ${div === 4 ? 'deux' : 'trois'} fois.`,
        explication: `La moitié de ${fr(n)} est ${fr(n / 2)}. La moitié de ${fr(n / 2)} est ${fr(n / 4)}.${div === 8 ? ` La moitié de ${fr(n / 4)} est ${fr(n / 8)}.` : ''} ${fr(n)} ÷ ${div} = ${fr(q)}.`,
      };
    }
    // Distributivité : 23 × 11 = 23 × 10 + 23 × 1 ; 15 × 99 = 15 × 100 − 15.
    const n = a.entier(12, 99);
    const m = a.choisir([11, 12, 21, 101, 99, 9]);
    const base = m > 50 ? 100 : m > 15 ? 20 : 10;
    const ecart = m - base;
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${n} × ${m}`,
      reponse: String(n * m),
      indice: `${m} = ${base} ${ecart > 0 ? '+' : '−'} ${Math.abs(ecart)}.`,
      explication: `${n} × ${m} = ${n} × ${base} ${ecart > 0 ? '+' : '−'} ${n} × ${Math.abs(ecart)}. ${fr(n * base)} ${ecart > 0 ? '+' : '−'} ${fr(n * Math.abs(ecart))} = ${fr(n * m)}.`,
    };
  },
});

// ─────────── Calcul mental sur les décimaux

export const calculMentalDecimauxCm2 = creerGenerateur({
  id: 'calcul-mental-decimaux-cm2',
  competence: 'MA-C3-CM2-CALC-03',
  cycle: 3,
  description: 'Sommes simples de décimaux, double et moitié d’un décimal, multiplier un décimal par 5 ou 50.',
  generer(a, d) {
    if (d === 1) {
      if (a.suivant() < 0.5) {
        // Deux décimaux inférieurs à 10, un chiffre après la virgule.
        const x = a.entier(11, 99);
        let y = a.entier(11, 99);
        if (y % 10 === 0) y += 1;
        const r = depuisEntier(x + y, 1);
        return {
          gabarit: 'saisie',
          consigne: `Calcule : ${frDecimal(depuisEntier(x, 1))} + ${frDecimal(depuisEntier(y, 1))}`,
          reponse: r,
          indice: 'Ajoute les unités, puis les dixièmes. Dix dixièmes font une unité.',
          explication: `Unités : ${Math.floor(x / 10)} + ${Math.floor(y / 10)} = ${Math.floor(x / 10) + Math.floor(y / 10)}. Dixièmes : ${x % 10} + ${y % 10} = ${(x % 10) + (y % 10)}. Le résultat est ${frDecimal(r)}.`,
        };
      }
      // Un entier ajouté à un décimal, avec retenue sur les unités.
      const x = decimal(a, 1, 99, a.entier(1, 2));
      const e = a.entier(2, 99);
      const r = depuisEntier(sansVirgule(x) + e * 10 ** decimales(x), decimales(x));
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${frDecimal(x)} + ${e}`,
        reponse: r,
        indice: 'Ajoute l’entier à la partie entière. La partie décimale ne change pas.',
        explication: `${x.split(',')[0]} + ${e} = ${Number(x.split(',')[0]) + e}. La partie décimale reste ${x.split(',')[1]}. Le résultat est ${frDecimal(r)}.`,
      };
    }
    if (d === 2) {
      const forme = a.entier(0, 2);
      if (forme === 0) {
        // Moitié d'un nombre impair jusqu'à 15.
        const n = a.choisir([1, 3, 5, 7, 9, 11, 13, 15]);
        const r = depuisEntier(n * 5, 1);
        return {
          gabarit: 'saisie',
          consigne: `Calcule la moitié de ${n}.`,
          reponse: r,
          indice: `${n} = ${n - 1} + 1. Prends la moitié de chaque morceau.`,
          explication: `La moitié de ${n - 1} est ${(n - 1) / 2}. La moitié de 1 est 0,5. La moitié de ${n} est ${frDecimal(r)}.`,
        };
      }
      const dec = a.entier(1, 2);
      if (forme === 1) {
        const x = decimal(a, 0, 49, dec);
        const r = depuisEntier(2 * sansVirgule(x), decimales(x));
        return {
          gabarit: 'saisie',
          consigne: `Calcule le double de ${frDecimal(x)}.`,
          reponse: r,
          indice: 'Double la partie entière, puis la partie décimale.',
          explication: `Le double de ${frDecimal(x)}, c’est ${frDecimal(x)} + ${frDecimal(x)} = ${frDecimal(r)}.`,
        };
      }
      // Moitié d'un décimal : chaque morceau est pair, ou presque.
      let n = 2 * a.entier(6, 499);
      if (n % 10 === 0) n += 2;
      const x = depuisEntier(n, dec);
      const r = depuisEntier(n / 2, dec);
      return {
        gabarit: 'saisie',
        consigne: `Calcule la moitié de ${frDecimal(x)}.`,
        reponse: r,
        indice: 'Partage la partie entière, puis la partie décimale.',
        explication: `${frDecimal(r)} + ${frDecimal(r)} = ${frDecimal(x)}. La moitié de ${frDecimal(x)} est donc ${frDecimal(r)}.`,
      };
    }
    const facteur = a.choisir([5, 50]);
    const x = decimal(a, 0, 40, a.entier(1, 2));
    const r = depuisEntier(sansVirgule(x) * facteur, decimales(x));
    const fois = facteur === 5 ? 10 : 100;
    const etape = decaler(x, facteur === 5 ? 1 : 2);
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${frDecimal(x)} × ${facteur}`,
      reponse: r,
      indice: `Multiplier par ${facteur}, c’est multiplier par ${fois}, puis prendre la moitié.`,
      explication: `${frDecimal(x)} × ${fois} = ${frDecimal(etape)}. La moitié de ${frDecimal(etape)} est ${frDecimal(r)}. Donc ${frDecimal(x)} × ${facteur} = ${frDecimal(r)}.`,
    };
  },
});

// ─────────── Calculs avec parenthèses

export const parenthesesCm2 = creerGenerateur({
  id: 'parentheses-cm2',
  competence: 'MA-C3-CM2-OPE-01',
  cycle: 3,
  description: 'Effectuer un calcul contenant une ou deux paires de parenthèses.',
  generer(a, d) {
    if (d === 1) {
      const x = a.entier(5, 60);
      const y = a.entier(2, 40);
      const z = a.entier(2, 9);
      const w = a.entier(10, 200);
      const forme = a.entier(0, 2);
      const [expr, r, etape, fin] =
        forme === 0 ? [`(${x} + ${y}) × ${z}`, (x + y) * z, `${x} + ${y} = ${x + y}`, `${x + y} × ${z}`]
        : forme === 1 ? [`${z} × (${x + y} − ${y})`, z * x, `${x + y} − ${y} = ${x}`, `${z} × ${x}`]
        : [`${x * z + w} − (${x} × ${z})`, w, `${x} × ${z} = ${x * z}`, `${x * z + w} − ${x * z}`];
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${expr}`,
        reponse: String(r),
        indice: 'Calcule d’abord ce qui est entre parenthèses.',
        explication: `Entre parenthèses : ${etape}. Ensuite : ${fin} = ${fr(r)}.`,
      };
    }
    // Deux paires de parenthèses.
    const p = a.entier(2, 30);
    const q = a.entier(2, 30);
    const s = a.entier(3, 20);
    const t = a.entier(1, s - 1);
    const forme = d === 2 ? a.entier(0, 1) : a.entier(1, 2);
    if (forme === 0) {
      const r = p + q + (s - t);
      return {
        gabarit: 'saisie',
        consigne: `Calcule : (${p} + ${q}) + (${s} − ${t})`,
        reponse: String(r),
        indice: 'Calcule chaque parenthèse, puis le résultat.',
        explication: `${p} + ${q} = ${p + q}. ${s} − ${t} = ${s - t}. ${p + q} + ${s - t} = ${r}.`,
      };
    }
    if (forme === 1) {
      const r = (p + q) * (s - t);
      return {
        gabarit: 'saisie',
        consigne: `Calcule : (${p} + ${q}) × (${s} − ${t})`,
        reponse: String(r),
        indice: 'Calcule chaque parenthèse, puis multiplie les deux résultats.',
        explication: `${p} + ${q} = ${p + q}. ${s} − ${t} = ${s - t}. ${p + q} × ${s - t} = ${fr(r)}.`,
      };
    }
    // Un quotient exact : (x + y) ÷ (c − e).
    const div = a.entier(2, 9);
    const k = a.entier(2, 30);
    const c = div + a.entier(1, 20);
    const e = c - div;
    const x = a.entier(1, k * div - 1);
    const y = k * div - x;
    return {
      gabarit: 'saisie',
      consigne: `Calcule : (${x} + ${y}) ÷ (${c} − ${e})`,
      reponse: String(k),
      indice: 'Calcule chaque parenthèse, puis divise.',
      explication: `${x} + ${y} = ${k * div}. ${c} − ${e} = ${div}. ${k * div} ÷ ${div} = ${k}.`,
    };
  },
});

// ─────────── Multiplier un décimal par un entier

export const multiplierDecimalEntierCm2 = creerGenerateur({
  id: 'multiplier-decimal-entier-cm2',
  competence: 'MA-C3-CM2-OPE-02',
  cycle: 3,
  description: 'Poser et effectuer la multiplication d’un nombre décimal par un nombre entier.',
  generer(a, d) {
    const x = decimal(a, 0, d === 1 ? 50 : 200, d === 3 ? a.entier(2, 3) : a.entier(1, 2));
    const n = d === 1 ? a.entier(2, 9) : d === 2 ? a.entier(11, 99) : a.entier(101, 999);
    const r = depuisEntier(sansVirgule(x) * n, decimales(x));
    const k = decimales(x);
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${frDecimal(x)} × ${fr(n)}`,
      reponse: r,
      indice: 'Calcule sans la virgule, puis place-la : autant de chiffres après la virgule que dans le nombre décimal.',
      explication: `${fr(sansVirgule(x))} × ${fr(n)} = ${fr(sansVirgule(x) * n)}. ${frDecimal(x)} a ${k} chiffre${k > 1 ? 's' : ''} après la virgule. Donc ${frDecimal(x)} × ${fr(n)} = ${frDecimal(r)}.`,
    };
  },
});

// ─────────── Division décimale par un diviseur à un chiffre

export const divisionDecimaleCm2 = creerGenerateur({
  id: 'division-decimale-cm2',
  competence: 'MA-C3-CM2-OPE-03',
  cycle: 3,
  description: 'Division décimale d’un entier ou d’un décimal par un diviseur à un chiffre, quotient exact.',
  generer(a, d) {
    if (d === 1 || (d === 3 && a.suivant() < 0.5)) {
      // Dividende entier : avec 2, 4, 5 ou 8, le quotient s'arrête aux millièmes au plus.
      const div = d === 1 ? a.choisir([2, 4, 5]) : a.choisir([4, 8]);
      let n = a.entier(div + 1, d === 1 ? 99 : 999);
      if (n % div === 0) n += 1;
      const milliemes = (n * 1000) / div;
      const q = depuisEntier(milliemes, 3);
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${fr(n)} ÷ ${div}`,
        reponse: q,
        indice: `Pose la division. Quand il reste quelque chose, écris la virgule au quotient et abaisse un zéro.`,
        explication: `${fr(n)} = ${fr(n)},000. On continue la division après la virgule. ${frDecimal(q)} × ${div} = ${fr(n)}, donc ${fr(n)} ÷ ${div} = ${frDecimal(q)}.`,
      };
    }
    const div = a.entier(2, 9);
    const dec = d === 2 ? a.entier(1, 2) : a.entier(2, 3);
    let Q = a.entier(10, d === 2 ? 999 : 9999);
    if (Q % 10 === 0) Q += 1;
    const q = depuisEntier(Q, dec);
    const x = depuisEntier(Q * div, dec);
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${frDecimal(x)} ÷ ${div}`,
      reponse: q,
      indice: 'Pose la division. Écris la virgule au quotient quand tu abaisses le premier chiffre après la virgule.',
      explication: `${frDecimal(q)} × ${div} = ${frDecimal(x)}. Donc ${frDecimal(x)} ÷ ${div} = ${frDecimal(q)}.`,
    };
  },
});

// ─────────── Égalités à trous

export const egalitesTrousCm2 = creerGenerateur({
  id: 'egalites-trous-cm2',
  competence: 'MA-C3-CM2-ALG-01',
  cycle: 3,
  description: 'Trouver le nombre manquant dans une égalité à trous, avec un calcul de chaque côté.',
  generer(a, d) {
    const b = a.entier(3, 12);
    const c = a.entier(3, 12);
    const droite = b * c;
    if (d === 1) {
      const x = a.entier(10, 500);
      const k = a.entier(10, 500);
      const plus = a.suivant() < 0.5;
      return plus
        ? {
            gabarit: 'saisie',
            consigne: `Complète : … + ${k} = ${x + k}`,
            reponse: String(x),
            indice: 'Cherche le nombre qui, ajouté au second, donne le résultat.',
            explication: `${x + k} − ${k} = ${x}. Vérification : ${x} + ${k} = ${x + k}.`,
          }
        : {
            gabarit: 'saisie',
            consigne: `Complète : ${x + k} − … = ${x}`,
            reponse: String(k),
            indice: 'Calcule l’écart entre les deux nombres.',
            explication: `${x + k} − ${x} = ${k}. Vérification : ${x + k} − ${k} = ${x}.`,
          };
    }
    if (d === 2) {
      const total = droite + a.entier(10, 200);
      const r = total - droite;
      return {
        gabarit: 'saisie',
        consigne: `Complète : ${total} − … = ${b} × ${c}`,
        reponse: String(r),
        indice: `Calcule d’abord ${b} × ${c}.`,
        explication: `${b} × ${c} = ${droite}. On cherche ce qu’il faut retirer à ${total} pour obtenir ${droite} : ${total} − ${droite} = ${r}.`,
      };
    }
    // Un facteur manquant : 7 × … = 100 − 16.
    const f = a.entier(3, 9);
    const r = a.entier(3, 15);
    const p = f * r;
    const s = a.entier(1, p - 1);
    const membre = a.suivant() < 0.5 ? `${p - s} + ${s}` : `${p + s} − ${s}`;
    return {
      gabarit: 'saisie',
      consigne: `Complète : ${f} × … = ${membre}`,
      reponse: String(r),
      indice: `Calcule d’abord le membre de droite. Cherche ensuite dans la table de ${f}.`,
      explication: `${membre} = ${p}. ${f} × ${r} = ${p}. Le nombre manquant est ${r}.`,
    };
  },
});

// ─────────── Programmes de calcul

interface Instruction { texte: string; appliquer: (n: number) => number; trace: (n: number) => string }

function instruction(a: Aleatoire, n: number, premiere: boolean): Instruction {
  const k = a.entier(2, premiere ? 9 : 5);
  const choix = a.entier(0, 3);
  const res = premiere ? 'au nombre choisi' : 'au résultat';
  const deRes = premiere ? 'du nombre choisi' : 'du résultat';
  if (choix === 0) return { texte: `Ajoute ${k} ${res}.`, appliquer: (x) => x + k, trace: (x) => `${fr(x)} + ${k} = ${fr(x + k)}` };
  if (choix === 1 && n > k) return { texte: `Retire ${k} ${deRes}.`, appliquer: (x) => x - k, trace: (x) => `${fr(x)} − ${k} = ${fr(x - k)}` };
  if (choix === 2 && n % 2 === 0) return { texte: `Prends la moitié du ${premiere ? 'nombre choisi' : 'résultat'}.`, appliquer: (x) => x / 2, trace: (x) => `${fr(x)} ÷ 2 = ${fr(x / 2)}` };
  return { texte: `Multiplie le ${premiere ? 'nombre choisi' : 'résultat'} par ${k}.`, appliquer: (x) => x * k, trace: (x) => `${fr(x)} × ${k} = ${fr(x * k)}` };
}

export const programmeCalculCm2 = creerGenerateur({
  id: 'programme-calcul-cm2',
  competence: 'MA-C3-CM2-ALG-02',
  cycle: 3,
  description: 'Exécuter un programme de calcul de deux ou trois instructions.',
  generer(a, d) {
    const depart = a.entier(2, d === 3 ? 50 : 20);
    const etapes = d === 1 ? 2 : 3;
    const lignes: string[] = [];
    const traces: string[] = [];
    let n = depart;
    for (let i = 0; i < etapes; i++) {
      const ins = instruction(a, n, i === 0);
      lignes.push(ins.texte);
      traces.push(ins.trace(n));
      n = ins.appliquer(n);
    }
    return {
      gabarit: 'saisie',
      consigne: `Choisis ${depart}. ${lignes.join(' ')} Quel nombre obtiens-tu ?`,
      reponse: String(n),
      indice: 'Effectue les instructions une par une, dans l’ordre. Note chaque résultat.',
      explication: `${traces.join('. ')}. On obtient ${fr(n)}.`,
    };
  },
});
