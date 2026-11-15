// CM1, calcul mental, quatre opérations et égalités à trous.
// Source : programme de mathématiques du cycle 3 (BO n°16 du 17 avril 2025), pages 7 et 9.
// Décimaux du CM1 : au plus deux chiffres après la virgule, calculs exacts sur des entiers de centièmes.
import { decaler, depuisEntier } from './decimaux';
import { creerGenerateur, fr, frDecimal } from './outils';

/** Écriture française d'un nombre de centièmes : 1234 → « 12,34 ». */
export const cent = (n: number) => frDecimal(depuisEntier(n, 2));
/** Même nombre avec exactement deux décimales, pour aligner les virgules : 4570 → « 45,70 ». */
export const cent2 = (n: number) => `${fr(Math.floor(n / 100))},${String(n % 100).padStart(2, '0')}`;

// ─────────── Procédures de calcul mental

export const proceduresCm1 = creerGenerateur({
  id: 'procedures-calcul-cm1',
  competence: 'MA-C3-CM1-CALC-01',
  cycle: 3,
  description: 'Ajouter ou soustraire 8, 9, 18, 19…, multiplier par 4, 5 ou 8, multiplier un chiffre par des dizaines ou des centaines.',
  generer(a, d) {
    if (d === 1) {
      const k = a.choisir([8, 9, 18, 19, 28, 29, 38, 39]);
      const rond = k + (k % 10 === 9 ? 1 : 2);
      const ecart = rond - k;
      const plus = a.suivant() < 0.5;
      const n = a.entier(plus ? 100 : 150, 9999);
      const r = plus ? n + k : n - k;
      const etape = plus ? n + rond : n - rond;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${fr(n)} ${plus ? '+' : '−'} ${k}`,
        reponse: String(r),
        indice: `${k} = ${rond} − ${ecart}. Calcule d’abord avec ${rond}.`,
        explication: plus
          ? `Ajouter ${k}, c’est ajouter ${rond} puis enlever ${ecart}. ${fr(n)} + ${rond} = ${fr(etape)}. ${fr(etape)} − ${ecart} = ${fr(r)}.`
          : `Soustraire ${k}, c’est soustraire ${rond} puis ajouter ${ecart}. ${fr(n)} − ${rond} = ${fr(etape)}. ${fr(etape)} + ${ecart} = ${fr(r)}.`,
      };
    }
    if (d === 2) {
      const k = a.choisir([4, 5, 8]);
      const n = a.entier(12, k === 5 ? 999 : 125);
      const r = n * k;
      const explication =
        k === 4
          ? `Multiplier par 4, c’est prendre le double du double. Le double de ${n} est ${fr(2 * n)}. Le double de ${fr(2 * n)} est ${fr(r)}.`
          : k === 8
            ? `Multiplier par 8, c’est doubler trois fois. ${n} → ${fr(2 * n)} → ${fr(4 * n)} → ${fr(r)}.`
            : `Multiplier par 5, c’est multiplier par 10 puis prendre la moitié. ${n} × 10 = ${fr(10 * n)}. La moitié de ${fr(10 * n)} est ${fr(r)}.`;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${n} × ${k}`,
        reponse: String(r),
        indice: k === 5 ? '5 est la moitié de 10.' : k === 4 ? '4 = 2 × 2.' : '8 = 2 × 2 × 2.',
        explication,
      };
    }
    if (a.suivant() < 0.6) {
      const c = a.entier(2, 9);
      const p = a.choisir([10, 100]);
      const m = a.entier(2, 9) * p;
      const [x, y] = a.suivant() < 0.5 ? [c, m] : [m, c];
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${fr(x)} × ${fr(y)}`,
        reponse: String(c * m),
        indice: `${fr(m)}, c’est ${m / p} ${p === 10 ? 'dizaines' : 'centaines'}.`,
        explication: `${c} × ${m / p} ${p === 10 ? 'dizaines' : 'centaines'} = ${c * (m / p)} ${p === 10 ? 'dizaines' : 'centaines'}, soit ${fr(c * m)}.`,
      };
    }
    // Distributivité dans des cas simples : 6 × 21 = 6 × 20 + 6 × 1.
    const c = a.entier(3, 9);
    const dz = a.entier(1, 9) * 10;
    const u = a.entier(1, 3);
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${c} × ${dz + u}`,
      reponse: String(c * (dz + u)),
      indice: `${dz + u} = ${dz} + ${u}.`,
      explication: `${c} × ${dz + u} = ${c} × ${dz} + ${c} × ${u} = ${c * dz} + ${c * u} = ${fr(c * (dz + u))}.`,
    };
  },
});

// ─────────── Calculer avec la numération : × 10, 100, 1 000 ; décimal × ou ÷ 10 ; ajouts sans retenue

const RANGS = [
  { nom: 'centaines', centiemes: 10000 },
  { nom: 'dizaines', centiemes: 1000 },
  { nom: 'unités', centiemes: 100 },
  { nom: 'dixièmes', centiemes: 10 },
  { nom: 'centièmes', centiemes: 1 },
];

export const numerationCalculCm1 = creerGenerateur({
  id: 'numeration-calcul-cm1',
  competence: 'MA-C3-CM1-CALC-02',
  cycle: 3,
  description: 'Multiplier un entier par 10, 100, 1 000 ; multiplier ou diviser un décimal par 10 ; ajouter des dixièmes ou centièmes sans retenue.',
  generer(a, d) {
    if (d === 1) {
      const p = a.choisir([10, 100, 1000]);
      const n = a.entier(2, p === 1000 ? 999 : 9999);
      const k = String(p).length - 1;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${fr(n)} × ${fr(p)}`,
        reponse: String(n * p),
        indice: `Chaque chiffre prend une valeur ${fr(p)} fois plus grande.`,
        explication: `Multiplier par ${fr(p)}, c’est décaler chaque chiffre de ${k} rang${k > 1 ? 's' : ''} vers la gauche. On écrit ${k} zéro${k > 1 ? 's' : ''} à droite : ${fr(n)} × ${fr(p)} = ${fr(n * p)}.`,
      };
    }
    if (d === 2) {
      const fois = a.suivant() < 0.5;
      // × 10 : jusqu'à deux décimales ; ÷ 10 : au plus une, pour rester aux centièmes.
      const dec = fois ? a.entier(1, 2) : a.entier(0, 1);
      let n = a.entier(dec === 0 ? 11 : 10 ** dec + 1, 9999);
      if (n % 10 === 0) n += 1;
      const x = depuisEntier(n, dec);
      const r = decaler(x, fois ? 1 : -1);
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${frDecimal(x)} ${fois ? '×' : '÷'} 10`,
        reponse: r,
        indice: `Chaque chiffre prend une valeur 10 fois plus ${fois ? 'grande' : 'petite'}.`,
        explication: `${fois ? 'Multiplier' : 'Diviser'} par 10, c’est décaler chaque chiffre d’un rang vers la ${fois ? 'gauche' : 'droite'}. ${frDecimal(x)} ${fois ? '×' : '÷'} 10 = ${frDecimal(r)}.`,
      };
    }
    // Ajouter ou soustraire des unités, dizaines, centaines, dixièmes ou centièmes, sans retenue.
    let n = a.entier(101, 99999);
    if (n % 10 === 0) n += 1;
    const rg = a.choisir(RANGS.filter((x) => x.centiemes <= n));
    const chiffre = Math.floor(n / rg.centiemes) % 10;
    const plus = chiffre === 0 || (chiffre < 9 && a.suivant() < 0.5);
    const k = plus ? a.entier(1, 9 - chiffre) : a.entier(1, chiffre);
    const terme = k * rg.centiemes;
    const r = plus ? n + terme : n - terme;
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${cent(n)} ${plus ? '+' : '−'} ${cent(terme)}`,
      reponse: depuisEntier(r, 2),
      indice: `${cent(terme)}, c’est ${k} ${k > 1 ? rg.nom : rg.nom.slice(0, -1)}. Un seul chiffre change.`,
      explication: `On ${plus ? 'ajoute' : 'enlève'} ${k} ${k > 1 ? rg.nom : rg.nom.slice(0, -1)}. Le chiffre des ${rg.nom} passe de ${chiffre} à ${plus ? chiffre + k : chiffre - k}. ${cent(n)} ${plus ? '+' : '−'} ${cent(terme)} = ${cent(r)}.`,
    };
  },
});

// ─────────── Additions et soustractions posées de décimaux

export const additionDecimauxCm1 = creerGenerateur({
  id: 'addition-decimaux-cm1',
  competence: 'MA-C3-CM1-OPE-01',
  cycle: 3,
  description: 'Poser et effectuer des additions et des soustractions de nombres décimaux.',
  generer(a, d) {
    // Chaque nombre en centièmes ; d1 : un chiffre après la virgule pour les deux.
    const tirer = (dec: number, max: number) => {
      const n = a.entier(10 ** dec, max * 10 ** dec);
      return (n % 10 === 0 && dec > 0 ? n + 1 : n) * 10 ** (2 - dec);
    };
    if (d < 3) {
      const x = tirer(d === 1 ? 1 : a.entier(0, 2), d === 1 ? 99 : 999);
      const y = tirer(d === 1 ? 1 : a.entier(1, 2), d === 1 ? 99 : 999);
      const r = x + y;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${cent(x)} + ${cent(y)}`,
        reponse: depuisEntier(r, 2),
        indice: 'Pose l’addition en alignant les virgules. Complète avec des zéros si besoin.',
        explication: `On aligne les virgules : ${cent2(x)} + ${cent2(y)}. On calcule rang par rang, de droite à gauche, avec les retenues. Le résultat est ${cent(r)}.`,
      };
    }
    let x = tirer(a.entier(0, 2), 999);
    let y = tirer(a.entier(1, 2), 999);
    if (x === y) x += 100;
    if (x < y) [x, y] = [y, x];
    const r = x - y;
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${cent(x)} − ${cent(y)}`,
      reponse: depuisEntier(r, 2),
      indice: 'Pose la soustraction en alignant les virgules. Écris autant de chiffres après la virgule en haut et en bas.',
      explication: `On aligne les virgules : ${cent2(x)} − ${cent2(y)}. On calcule rang par rang, de droite à gauche. Le résultat est ${cent(r)}. Vérifie : ${cent(r)} + ${cent(y)} = ${cent(x)}.`,
    };
  },
});

// ─────────── Multiplications posées : deux entiers, un décimal par un entier inférieur à 10

export const multiplicationsCm1 = creerGenerateur({
  id: 'multiplications-cm1',
  competence: 'MA-C3-CM1-OPE-02',
  cycle: 3,
  description: 'Poser et effectuer la multiplication de deux entiers, ou d’un décimal par un entier inférieur à 10.',
  generer(a, d) {
    if (d < 3) {
      const x = a.entier(d === 1 ? 102 : 101, d === 1 ? 999 : 999);
      const y = d === 1 ? a.entier(3, 9) : a.entier(12, 99);
      const r = x * y;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${x} × ${y}`,
        reponse: String(r),
        indice: d === 1 ? 'Pose la multiplication. Multiplie les unités, puis les dizaines, puis les centaines, avec les retenues.' : 'Pose la multiplication : une ligne pour les unités, une ligne pour les dizaines.',
        explication:
          d === 1
            ? `${x} × ${y} = ${fr(r)}. Vérifie l’ordre de grandeur : ${Math.round(x / 100) * 100} × ${y} = ${fr(Math.round(x / 100) * 100 * y)}.`
            : `${x} × ${y % 10} = ${fr(x * (y % 10))}. ${x} × ${y - (y % 10)} = ${fr(x * (y - (y % 10)))}. ${fr(x * (y % 10))} + ${fr(x * (y - (y % 10)))} = ${fr(r)}.`,
      };
    }
    const dec = a.entier(1, 2);
    let n = a.entier(10 ** dec + 1, 99 * 10 ** dec);
    if (n % 10 === 0) n += 1;
    const k = a.entier(2, 9);
    const x = depuisEntier(n, dec);
    const r = depuisEntier(n * k, dec);
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${frDecimal(x)} × ${k}`,
      reponse: r,
      indice: 'Calcule sans la virgule. Place-la ensuite : autant de chiffres après la virgule que dans le nombre décimal.',
      explication: `${fr(n)} × ${k} = ${fr(n * k)}. ${frDecimal(x)} a ${dec} chiffre${dec > 1 ? 's' : ''} après la virgule, le produit aussi. ${frDecimal(x)} × ${k} = ${frDecimal(r)}.`,
    };
  },
});

// ─────────── Division euclidienne par un diviseur à un chiffre

const PAQUETS: [string, string][] = [
  ['œufs', 'boites'], ['crayons', 'trousses'], ['photos', 'pages'], ['livres', 'cartons'], ['gâteaux', 'sachets'],
];

export const divisionCm1 = creerGenerateur({
  id: 'division-cm1',
  competence: 'MA-C3-CM1-OPE-03',
  cycle: 3,
  description: 'Poser et effectuer une division euclidienne par un diviseur à un chiffre : quotient et reste.',
  generer(a, d) {
    const b = a.entier(2, 9);
    const n = a.entier(d === 1 ? 20 : 1000, d === 1 ? 999 : 9999);
    const q = Math.floor(n / b);
    const r = n % b;
    const egalite = `${fr(n)} = ${b} × ${fr(q)} + ${r}, avec ${r} < ${b}.`;
    const quotient = a.suivant() < 0.5;
    if (d < 3) {
      return {
        gabarit: 'saisie',
        consigne: `Dans la division euclidienne de ${fr(n)} par ${b}, quel est le ${quotient ? 'quotient' : 'reste'} ?`,
        reponse: String(quotient ? q : r),
        indice: quotient ? `Cherche combien de fois ${b} il y a dans ${fr(n)}.` : `Le reste est toujours plus petit que ${b}.`,
        explication: `${egalite} Le quotient est ${fr(q)} et le reste est ${r}.`,
      };
    }
    const [objets, contenants] = a.choisir(PAQUETS);
    return {
      gabarit: 'saisie',
      consigne: `On range ${fr(n)} ${objets} dans des ${contenants} de ${b}. ${quotient ? `Combien de ${contenants} pleines obtient-on ?` : `Combien de ${objets} reste-t-il ?`}`.replace('cartons pleines', 'cartons pleins').replace('sachets pleines', 'sachets pleins'),
      reponse: String(quotient ? q : r),
      indice: `Divise ${fr(n)} par ${b}.`,
      explication: `${egalite} On remplit ${fr(q)} ${contenants}, et il reste ${r} ${objets}.`,
    };
  },
});

// ─────────── Égalités à trous

export const egalitesTrousCm1 = creerGenerateur({
  id: 'egalites-trous-cm1',
  competence: 'MA-C3-CM1-ALG-01',
  cycle: 3,
  description: 'Trouver le nombre manquant dans une égalité à trous, y compris avec un calcul de chaque côté.',
  generer(a, d) {
    if (d === 1) {
      const x = a.entier(10, 500);
      const y = a.entier(10, 500);
      const forme = a.entier(0, 2);
      if (forme === 0) {
        return {
          gabarit: 'saisie',
          consigne: `Complète : ${x} + … = ${x + y}`,
          reponse: String(y),
          indice: 'Cherche ce qu’il faut ajouter. Tu peux soustraire.',
          explication: `${x + y} − ${x} = ${y}. Vérifie : ${x} + ${y} = ${x + y}.`,
        };
      }
      if (forme === 1) {
        return {
          gabarit: 'saisie',
          consigne: `Complète : … − ${x} = ${y}`,
          reponse: String(x + y),
          indice: 'Le nombre cherché est plus grand que les deux autres.',
          explication: `${y} + ${x} = ${x + y}. Vérifie : ${x + y} − ${x} = ${y}.`,
        };
      }
      return {
        gabarit: 'saisie',
        consigne: `Complète : ${x + y} − … = ${y}`,
        reponse: String(x),
        indice: `Combien faut-il enlever à ${x + y} pour obtenir ${y} ?`,
        explication: `${x + y} − ${y} = ${x}. Vérifie : ${x + y} − ${x} = ${y}.`,
      };
    }
    if (d === 2) {
      const x = a.entier(2, 9);
      const y = a.entier(2, 12);
      const forme = a.entier(0, 2);
      if (forme === 2) {
        return {
          gabarit: 'saisie',
          consigne: `Complète : … ÷ ${x} = ${y}`,
          reponse: String(x * y),
          indice: 'La division et la multiplication sont liées.',
          explication: `${y} × ${x} = ${x * y}. Vérifie : ${x * y} ÷ ${x} = ${y}.`,
        };
      }
      return {
        gabarit: 'saisie',
        consigne: forme === 0 ? `Complète : ${x} × … = ${x * y}` : `Complète : … × ${x} = ${x * y}`,
        reponse: String(y),
        indice: `Cherche dans la table de ${x}.`,
        explication: `${x} × ${y} = ${x * y}. Le nombre manquant est ${y}.`,
      };
    }
    // Un calcul de chaque côté du signe = : 178 − … = 6 × 8.
    const p = a.entier(2, 9);
    const q = a.entier(2, 9);
    const produit = p * q;
    const forme = a.entier(0, 3);
    if (forme === 0) {
      const x = produit + a.entier(10, 200);
      return {
        gabarit: 'saisie',
        consigne: `Complète : ${x} − … = ${p} × ${q}`,
        reponse: String(x - produit),
        indice: `Calcule d’abord ${p} × ${q}.`,
        explication: `${p} × ${q} = ${produit}. On cherche ${x} − … = ${produit}. ${x} − ${produit} = ${x - produit}.`,
      };
    }
    if (forme === 1) {
      const x = a.entier(1, produit - 1);
      return {
        gabarit: 'saisie',
        consigne: `Complète : … + ${x} = ${p} × ${q}`,
        reponse: String(produit - x),
        indice: `Calcule d’abord ${p} × ${q}.`,
        explication: `${p} × ${q} = ${produit}. ${produit} − ${x} = ${produit - x}. Vérifie : ${produit - x} + ${x} = ${produit}.`,
      };
    }
    if (forme === 2) {
      const x = a.entier(10, 99);
      const ecart = a.entier(1, 9);
      return {
        gabarit: 'saisie',
        consigne: `Complète : ${p} × ${q} + ${x} = … + ${x - ecart}`,
        reponse: String(produit + ecart),
        indice: 'Calcule le membre de gauche. Cherche ensuite ce qu’il faut ajouter à droite.',
        explication: `${p} × ${q} + ${x} = ${produit} + ${x} = ${produit + x}. ${produit + x} − ${x - ecart} = ${produit + ecart}.`,
      };
    }
    // Deux produits égaux : 4 × 15 = … × 6.
    const k = a.choisir([2, 3, 4, 5, 6].filter((m) => m !== q));
    const m = p * k;
    return {
      gabarit: 'saisie',
      consigne: `Complète : ${m} × ${q} = … × ${q * k}`,
      reponse: String(p),
      indice: `Calcule d’abord ${m} × ${q}.`,
      explication: `${m} × ${q} = ${m * q}. ${m * q} ÷ ${q * k} = ${p}. Vérifie : ${p} × ${q * k} = ${m * q}.`,
    };
  },
});

