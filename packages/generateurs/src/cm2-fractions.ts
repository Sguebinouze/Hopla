// CM2, fractions. Source : programme de mathématiques du cycle 3 (BO n°16 du 17 avril 2025).
// Au CM2, les dénominateurs ne dépassent pas 60 (hors fractions décimales).
import { depuisEntier } from './decimaux';
import { creerGenerateur, frDecimal, signeOppose } from './outils';

// ─────────── Fractions supérieures à 1 : entier + fraction, encadrement

export const fractionsSuperieuresCm2 = creerGenerateur({
  id: 'fractions-superieures-cm2',
  competence: 'MA-C3-CM2-FRAC-01',
  cycle: 3,
  description: 'Écrire une fraction supérieure à 1 comme un entier plus une fraction inférieure à 1, et inversement ; l’encadrer.',
  generer(a, d) {
    const den = d === 1 ? a.entier(2, 10) : a.entier(3, d === 2 ? 12 : 25);
    const entier = a.entier(1, d === 1 ? 5 : 9);
    const reste = a.entier(1, den - 1);
    const num = entier * den + reste;
    if (d === 1) {
      return {
        gabarit: 'saisie',
        consigne: `Complète : ${num}/${den} = ${entier} + …/${den}`,
        reponse: String(reste),
        indice: `Combien de fois ${den}/${den} dans ${num}/${den} ? Une unité, c’est ${den}/${den}.`,
        explication: `${entier} = ${entier * den}/${den}. ${num} − ${entier * den} = ${reste}. Donc ${num}/${den} = ${entier} + ${reste}/${den}.`,
      };
    }
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `Complète : ${entier} + ${reste}/${den} = …/${den}`,
        reponse: String(num),
        indice: `Une unité, c’est ${den}/${den}. Écris ${entier} avec le dénominateur ${den}.`,
        explication: `${entier} = ${entier * den}/${den}. ${entier * den}/${den} + ${reste}/${den} = ${num}/${den}.`,
      };
    }
    return {
      gabarit: 'saisie',
      consigne: `Complète l’encadrement entre deux entiers consécutifs : … < ${num}/${den} < ${entier + 1}`,
      reponse: String(entier),
      indice: `Cherche le plus grand multiple de ${den} inférieur à ${num}.`,
      explication: `${entier} × ${den} = ${entier * den} et ${entier + 1} × ${den} = ${(entier + 1) * den}. ${num} est entre les deux. Donc ${entier} < ${num}/${den} < ${entier + 1}.`,
    };
  },
});

// ─────────── Comparer des fractions

export const comparerFractionsCm2 = creerGenerateur({
  id: 'comparer-fractions-cm2',
  competence: 'MA-C3-CM2-FRAC-02',
  cycle: 3,
  description: 'Comparer deux fractions : même dénominateur, même numérateur, dénominateurs multiples l’un de l’autre.',
  generer(a, d) {
    let x: [number, number];
    let y: [number, number];
    let explication: string;
    if (d === 1) {
      const den = a.entier(3, 20);
      const p = a.entier(1, 2 * den);
      let q = a.entier(1, 2 * den);
      if (q === p) q = p + 1;
      x = [p, den];
      y = [q, den];
      explication = `Les dénominateurs sont égaux : on compare les numérateurs, ${p} et ${q}.`;
    } else if (d === 2) {
      const num = a.entier(1, 9);
      const p = a.entier(2, 15);
      let q = a.entier(2, 15);
      if (q === p) q = p + 1;
      x = [num, p];
      y = [num, q];
      explication = `Les numérateurs sont égaux. Plus on partage en parts nombreuses, plus chaque part est petite.`;
    } else {
      const petit = a.entier(2, 10);
      const k = a.entier(2, Math.min(5, Math.floor(60 / petit)));
      const grand = petit * k;
      const egalite = a.suivant() < 0.25;
      let p: number;
      let q: number;
      // Pas de fraction égale à 1, pas de comparaison évidente (l'une plus petite que 1, l'autre plus grande).
      do {
        p = a.entier(1, 2 * petit - 1);
        q = egalite ? p * k : a.entier(1, 2 * grand - 1);
      } while (p === petit || q === grand || p < petit !== q < grand);
      x = [p, petit];
      y = [q, grand];
      if (a.suivant() < 0.5) [x, y] = [y, x];
      explication = `On écrit ${p}/${petit} avec le dénominateur ${grand} : ${p}/${petit} = ${p * k}/${grand}. On compare ensuite ${p * k}/${grand} et ${q}/${grand}.`;
    }
    const gauche = x[0] * y[1];
    const droite = y[0] * x[1];
    const signe = gauche < droite ? '<' : gauche > droite ? '>' : '=';
    return {
      gabarit: 'qcm',
      consigne: `Complète avec <, > ou = : ${x[0]}/${x[1]} … ${y[0]}/${y[1]}`,
      options: ['<', '>', '='],
      erreurs: (() => {
        // En d3, l'erreur typique compare les numérateurs sans tenir compte des dénominateurs.
        const naif = x[0] < y[0] ? '<' : x[0] > y[0] ? '>' : '=';
        const e: Record<string, string> = d === 3 && naif !== signe ? { [naif]: 'denominateurs-ignores' } : {};
        return { ...signeOppose(signe, d === 2 ? 'fraction-unitaire-inversee' : 'signe-comparaison-inverse'), ...e };
      })(),
      reponse: signe,
      indice: d === 1 ? 'Même dénominateur : regarde les numérateurs.' : d === 2 ? 'Même numérateur : regarde la taille des parts.' : 'Écris les deux fractions avec le même dénominateur.',
      explication: `${explication} ${x[0]}/${x[1]} ${signe} ${y[0]}/${y[1]}.`,
    };
  },
});

// ─────────── Additionner et soustraire des fractions

export const additionnerFractionsCm2 = creerGenerateur({
  id: 'additionner-fractions-cm2',
  competence: 'MA-C3-CM2-FRAC-03',
  cycle: 3,
  description: 'Additionner et soustraire des fractions de même dénominateur ou de dénominateurs multiples l’un de l’autre.',
  generer(a, d) {
    if (d === 3 && a.suivant() < 0.4) {
      // Un entier moins une fraction : 2 − 3/5.
      const den = a.entier(2, 12);
      const e = a.entier(1, 4);
      const p = a.entier(1, e * den - 1);
      const r = e * den - p;
      return {
        gabarit: 'saisie',
        consigne: `Complète : ${e} − ${p}/${den} = …/${den}`,
        reponse: String(r),
        indice: `Écris ${e} avec le dénominateur ${den}.`,
        explication: `${e} = ${e * den}/${den}. ${e * den}/${den} − ${p}/${den} = ${r}/${den}.`,
      };
    }
    const petit = a.entier(2, d === 1 ? 20 : 10);
    const k = d === 1 ? 1 : a.entier(2, Math.min(6, Math.floor(60 / petit)));
    const grand = petit * k;
    let p = a.entier(1, petit + 3);
    let q = a.entier(1, grand + 5);
    // Pas de fraction égale à 1 (6/6 + 30/30) : elle n'exerce pas la règle.
    if (p % petit === 0) p += 1;
    if (q % grand === 0) q += 1;
    const soustraction = a.suivant() < 0.4 && p * k > q;
    const r = soustraction ? p * k - q : p * k + q;
    const op = soustraction ? '−' : '+';
    return {
      gabarit: 'saisie',
      consigne: `Complète : ${p}/${petit} ${op} ${q}/${grand} = …/${grand}`,
      reponse: String(r),
      indice: k === 1 ? 'Même dénominateur : on calcule avec les numérateurs, le dénominateur ne change pas.' : `Écris ${p}/${petit} avec le dénominateur ${grand}.`,
      explication: `${k === 1 ? '' : `${p}/${petit} = ${p * k}/${grand}, car ${petit} × ${k} = ${grand}. `}${p * k}/${grand} ${op} ${q}/${grand} = ${r}/${grand}.`,
    };
  },
});

// ─────────── Produit d'un entier et d'une fraction

export const entierFoisFractionCm2 = creerGenerateur({
  id: 'entier-fois-fraction-cm2',
  competence: 'MA-C3-CM2-FRAC-04',
  cycle: 3,
  description: 'Calculer le produit d’un nombre entier et d’une fraction.',
  generer(a, d) {
    let den = a.entier(2, d === 1 ? 10 : 20);
    let num = a.entier(1, d === 1 ? den - 1 : den + 3);
    let n = a.entier(2, d === 1 ? 6 : 12);
    // Difficulté 3 : toujours un produit supérieur à 1 et non entier, à écrire « entier + fraction ».
    while (d === 3 && (n * num < den || (n * num) % den === 0)) {
      den = a.entier(3, 20);
      num = a.entier(1, den + 3);
      n = a.entier(2, 12);
    }
    const produit = n * num;
    if (d !== 3) {
      return {
        gabarit: 'saisie',
        consigne: `Complète : ${n} × ${num}/${den} = …/${den}`,
        reponse: String(produit),
        indice: `${n} × ${num}/${den}, c’est ${num}/${den} ajouté ${n} fois.`,
        explication: `${n} fois ${num} part${num > 1 ? 's' : ''} de 1/${den}, cela fait ${n} × ${num} = ${produit} part${produit > 1 ? 's' : ''}. ${n} × ${num}/${den} = ${produit}/${den}.`,
      };
    }
    const e = Math.floor(produit / den);
    const reste = produit % den;
    return {
      gabarit: 'saisie',
      consigne: `Complète : ${n} × ${num}/${den} = ${e} + …/${den}`,
      reponse: String(reste),
      indice: `Calcule d’abord ${n} × ${num}/${den} sous forme d’une seule fraction.`,
      explication: `${n} × ${num}/${den} = ${produit}/${den}. Or ${e} = ${e * den}/${den} et ${produit} − ${e * den} = ${reste}. Donc ${produit}/${den} = ${e} + ${reste}/${den}.`,
    };
  },
});

// ─────────── Fraction d'une quantité ou d'une grandeur

const UNITES = ['€', 'm', 'kg', 'L', 'km'];
const NOMS_FRACTIONS: Record<number, string> = { 2: 'demi', 3: 'tiers', 4: 'quart' };

export const fractionQuantiteCm2 = creerGenerateur({
  id: 'fraction-quantite-cm2',
  competence: 'MA-C3-CM2-FRAC-05',
  cycle: 3,
  description: 'Calculer une fraction d’une quantité ou d’une grandeur, numérateur quelconque.',
  generer(a, d) {
    const den = d === 1 ? a.entier(2, 5) : a.entier(3, 10);
    const num = d === 1 ? 1 : a.entier(2, den - 1);
    const g = { unite: a.choisir(UNITES) };
    // Difficulté 3 : une part décimale (3/4 de 10 € = 7,5 €).
    const partDixiemes = d === 3 ? a.entier(5, 60) : a.entier(2, 20) * 10;
    const total = depuisEntier(partDixiemes * den, 1);
    const part = depuisEntier(partDixiemes, 1);
    const r = depuisEntier(partDixiemes * num, 1);
    const nomFraction = num === 1 && NOMS_FRACTIONS[den] ? `le ${NOMS_FRACTIONS[den]}` : `${num}/${den}`;
    return {
      gabarit: 'saisie',
      consigne: `Calcule ${num}/${den} de ${frDecimal(total)} ${g.unite}.`,
      reponse: r,
      indice: `Cherche d’abord 1/${den} de ${frDecimal(total)} ${g.unite}.`,
      explication: `1/${den} de ${frDecimal(total)}, c’est ${frDecimal(total)} ÷ ${den} = ${frDecimal(part)}. ${num === 1 ? '' : `${num}/${den}, c’est ${num} fois plus : ${num} × ${frDecimal(part)} = ${frDecimal(r)}. `}Donc ${nomFraction} de ${frDecimal(total)} ${g.unite}, c’est ${frDecimal(r)} ${g.unite}.`,
    };
  },
});
