// 5e, calcul littéral et algébrique : substitution, développer, factoriser, réduire ; équations ax = c et x + b = c.
// Source : programme de mathématiques du cycle 4 (arrêté du 18 février 2026, BO n°10 du 5 mars 2026), p. 41 et 42.
import { depuisEntier } from './decimaux';
import { choix, creerGenerateur, frDecimal } from './outils';
import { ecrireRelatif } from './relatifs-c4';

/** « 3x + 5 », « x − 4 », « 2x » : coefficient 1 non écrit, signe moins typographique. */
const affine = (a: number, b: number) => {
  const terme = a === 1 ? 'x' : `${a}x`;
  return b === 0 ? terme : `${terme} ${b > 0 ? '+' : '−'} ${Math.abs(b)}`;
};
const dec = (dixiemes: number) => frDecimal(depuisEntier(dixiemes, 1));

// ─────────── Calculer une expression littérale par substitution

export const substitution5e = creerGenerateur({
  id: 'substitution-5e',
  competence: 'MA-C4-5E-LIT-01',
  cycle: 4,
  description: 'Calculer la valeur d’une expression littérale en remplaçant la lettre par un nombre.',
  generer(a, d) {
    const k = a.entier(2, 9);
    const b = a.entier(1, 20);
    if (d === 1) {
      const x = a.entier(2, 12);
      return {
        gabarit: 'saisie',
        consigne: `Calcule ${affine(k, b)} pour x = ${x}.`,
        reponse: String(k * x + b),
        indice: `${k}x, c’est ${k} × x.`,
        explication: `${k} × ${x} + ${b} = ${k * x} + ${b} = ${k * x + b}.`,
      };
    }
    if (d === 2) {
      const x = a.entier(2, 9);
      return {
        gabarit: 'saisie',
        consigne: `Calcule x² − ${k}x + ${b} pour x = ${x}.`,
        reponse: ecrireRelatif(x * x - k * x + b),
        indice: 'x², c’est x × x. Calcule les produits avant les sommes.',
        explication: `${x}² − ${k} × ${x} + ${b} = ${x * x} − ${k * x} + ${b} = ${ecrireRelatif(x * x - k * x + b)}.`,
      };
    }
    // Valeur décimale de x : calcul exact en dixièmes.
    const xd = a.entier(11, 99);
    const resultat = k * xd + b * 10;
    return {
      gabarit: 'saisie',
      consigne: `Calcule ${affine(k, b)} pour x = ${dec(xd)}.`,
      reponse: depuisEntier(resultat, 1),
      indice: `Remplace x par ${dec(xd)}, puis calcule ${k} × ${dec(xd)}.`,
      explication: `${k} × ${dec(xd)} = ${dec(k * xd)}. ${dec(k * xd)} + ${b} = ${dec(resultat)}.`,
    };
  },
});

// ─────────── Réduire, développer, factoriser

export const developper5e = creerGenerateur({
  id: 'developper-factoriser-5e',
  competence: 'MA-C4-5E-LIT-02',
  cycle: 4,
  description: 'Réduire ax + bx ; développer k(a + b) ; factoriser ka + kb.',
  generer(a, d) {
    if (d === 1) {
      const x1 = a.entier(3, 12);
      const x2 = a.entier(2, 9);
      const b = a.entier(1, 15);
      const plus = a.suivant() < 0.6 || x1 <= x2;
      const coef = plus ? x1 + x2 : x1 - x2;
      const reponse = affine(coef, b);
      // Pièges : additionner aussi la constante, multiplier les coefficients.
      return {
        gabarit: 'qcm',
        consigne: `Réduis : ${x1}x ${plus ? '+' : '−'} ${x2}x + ${b}`,
        ...choix(a, reponse, [[`${coef + b}x`, 'termes-non-semblables-additionnes'], [affine(x1 * x2, b), 'coefficients-multiplies'], [`${coef === 1 ? '' : coef}x² + ${b}`, 'x-plus-x-carre']], () => affine(coef + 1, b)),
        reponse,
        indice: 'On regroupe les termes en x entre eux. Le nombre seul reste à part.',
        explication: `${x1}x ${plus ? '+' : '−'} ${x2}x = ${affine(coef, 0)}. On ne peut pas l’ajouter à ${b}. Résultat : ${reponse}.`,
      };
    }
    const k = a.entier(2, 9);
    const p = a.entier(2, 6);
    const q = a.entier(1, 12);
    const moins = a.suivant() < 0.4;
    const b = moins ? -q : q;
    if (d === 2) {
      const reponse = affine(k * p, k * b);
      return {
        gabarit: 'qcm',
        consigne: `Développe : ${k}(${affine(p, b)})`,
        ...choix(a, reponse, [[affine(k * p, b), 'distributivite-incomplete'], [affine(p, k * b), 'distributivite-incomplete'], [affine(k + p, k + b), 'addition-au-lieu-produit']], () => affine(k * p, k * b + 1)),
        reponse,
        indice: 'Multiplie chaque terme de la parenthèse par le facteur devant.',
        explication: `${k} × ${p}x = ${k * p}x et ${k} × ${Math.abs(b)} = ${k * Math.abs(b)}. Donc ${k}(${affine(p, b)}) = ${reponse}.`,
      };
    }
    const reponse = `${k}(${affine(p, b)})`;
    return {
      gabarit: 'qcm',
      consigne: `Factorise ${affine(k * p, k * b)} en mettant ${k} en facteur.`,
      ...choix(a, reponse, [[`${k}(${affine(p, k * b)})`, 'factorisation-incomplete'], [`${k}(${affine(k * p, b)})`, 'factorisation-incomplete'], [`${k * p}(x ${b > 0 ? '+' : '−'} ${Math.abs(b)})`, 'factorisation-incomplete']], () => `${k}(${affine(p + 1, b)})`),
      reponse,
      indice: `Cherche le facteur commun à ${k * p} et ${k * Math.abs(b)}.`,
      explication: `${k * p}x = ${k} × ${p}x et ${k * Math.abs(b)} = ${k} × ${Math.abs(b)}. On met ${k} en facteur : ${reponse}.`,
    };
  },
});

// ─────────── Équations x + b = c et ax = c

export const equations5e = creerGenerateur({
  id: 'equations-5e',
  competence: 'MA-C4-5E-EQ-01',
  cycle: 4,
  description: 'Résoudre des équations x + b = c et ax = c par l’opération inverse ; modéliser un problème.',
  generer(a, d) {
    if (d === 1) {
      const b = a.entier(2, 50);
      const x = a.entier(2, 80);
      return {
        gabarit: 'saisie',
        consigne: `Résous l’équation : x + ${b} = ${x + b}`,
        reponse: String(x),
        indice: 'Pour retrouver x, on fait l’opération inverse de l’addition.',
        explication: `x = ${x + b} − ${b} = ${x}. Vérification : ${x} + ${b} = ${x + b}.`,
      };
    }
    if (d === 2) {
      const k = a.entier(2, 12);
      const x = a.entier(2, 25);
      return {
        gabarit: 'saisie',
        consigne: `Résous l’équation : ${k}x = ${k * x}`,
        reponse: String(x),
        indice: `${k}x signifie ${k} × x. L’opération inverse est la division.`,
        explication: `x = ${k * x} ÷ ${k} = ${x}. Vérification : ${k} × ${x} = ${k * x}.`,
      };
    }
    // Problème à mettre en équation.
    const problemes: [(n: number, k: number) => string, (k: number) => string, number][] = [
      [(n, k) => `Le ${['', '', 'double', 'triple', 'quadruple'][k]} d’un nombre vaut ${n * k}. Quel est ce nombre ?`, (k) => `${k}x`, 0],
      [(n, k) => `Léa a ${k} fois plus de billes que Tom. Elle en a ${n * k}. Combien Tom en a-t-il ?`, (k) => `${k}x`, 0],
      [(n, k) => `On ajoute ${k * 7} à un nombre et on obtient ${n + k * 7}. Quel est ce nombre ?`, (k) => `x + ${k * 7}`, 1],
    ];
    const [enonce, equation, addition] = a.choisir(problemes);
    const k = a.entier(2, 4);
    const n = a.entier(5, 60);
    return {
      gabarit: 'saisie',
      consigne: enonce(n, k),
      reponse: String(n),
      indice: 'Appelle x le nombre cherché et écris une équation.',
      explication: addition
        ? `${equation(k)} = ${n + k * 7}, donc x = ${n + k * 7} − ${k * 7} = ${n}.`
        : `${equation(k)} = ${n * k}, donc x = ${n * k} ÷ ${k} = ${n}.`,
    };
  },
});
