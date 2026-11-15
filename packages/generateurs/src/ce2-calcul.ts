// CE2, calcul mental (nombres et résultats jusqu'à 10 000).
// Source : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024), p. 22-23.
import { creerGenerateur, fr } from './outils';

const TROU = '…';

// ─────────── Tables d'addition dans les deux sens, pour la fluence (p. 22 : quinze égalités en une minute)

export const tablesAdditionCe2 = creerGenerateur({
  id: 'tables-addition-ce2',
  competence: 'MA-C2-CE2-CALC-05',
  cycle: 2,
  description: 'Compléter des égalités à trou avec les tables d’addition, dans les deux sens.',
  generer(a, d) {
    // Les tables de 1 à 10 ; les sommes qui franchissent la dizaine sont plus fréquentes en difficulté 2 et 3.
    let x = a.entier(1, 10);
    let y = a.entier(1, 10);
    if (d > 1 && x + y <= 10 && a.suivant() < 0.6) [x, y] = [a.entier(4, 9), a.entier(4, 9)];
    const s = x + y;
    const formes = [
      { consigne: `${x} + ${y} = ${TROU}`, reponse: s },
      { consigne: `${x} + ${TROU} = ${s}`, reponse: y },
      { consigne: `${TROU} + ${y} = ${s}`, reponse: x },
      { consigne: `${s} = ${x} + ${TROU}`, reponse: y },
      { consigne: `${s} − ${x} = ${TROU}`, reponse: y },
    ];
    const f = d === 1 ? a.choisir(formes.slice(0, 2)) : d === 2 ? a.choisir(formes.slice(1, 4)) : a.choisir(formes.slice(2));
    return {
      gabarit: 'saisie',
      consigne: `Complète : ${f.consigne}`,
      reponse: String(f.reponse),
      indice: f.reponse === s ? `Pars de ${Math.max(x, y)} et avance de ${Math.min(x, y)}.` : `Cherche ce qui manque pour aller jusqu’à ${s}.`,
      explication: `${x} + ${y} = ${s}. Le nombre cherché est ${f.reponse}.`,
    };
  },
});

// ─────────── Faits multiplicatifs usuels : listes du programme de CE2 (p. 22)

const DOUBLES = [
  Array.from({ length: 19 }, (_, i) => i + 2),
  [20, 25, 30, 35, 40, 45, 50, 60, 75],
  [100, 150, 200, 250, 300, 400, 500, 600],
];
const MOITIES = [
  Array.from({ length: 19 }, (_, i) => 2 * (i + 2)),
  [40, 50, 60, 70, 80, 90, 100, 120, 150],
  [200, 300, 400, 500, 600, 800, 1000, 1200],
];
// Sans le facteur 1, trivial : 1 × 60, 1 × 25 ou 2 × 1 ne sont pas demandés.
const DECOMPOSITIONS_60 = [2, 3, 4, 5, 6];

export const faitsMultiplicatifsCe2 = creerGenerateur({
  id: 'faits-multiplicatifs-ce2',
  competence: 'MA-C2-CE2-CALC-02',
  cycle: 2,
  description: 'Doubles, moitiés, multiples de 25 et décompositions de 60 du programme de CE2, en égalités à trou.',
  generer(a, d) {
    const type = a.entier(0, 2);
    if (type === 2) {
      if (d === 3) {
        // Décompositions multiplicatives de 60 : 60 = 4 × …
        const k = a.choisir(DECOMPOSITIONS_60);
        return {
          gabarit: 'saisie',
          consigne: `Complète : 60 = ${k} × ${TROU}`,
          reponse: String(60 / k),
          indice: 'Pense aux décompositions de 60.',
          explication: `${k} × ${60 / k} = 60. Le nombre manquant est ${60 / k}.`,
        };
      }
      const k = a.entier(2, 4);
      const trou = d === 2 && a.suivant() < 0.5;
      return {
        gabarit: 'saisie',
        consigne: trou ? `Complète : ${k * 25} = ${TROU} × 25` : `Complète : ${k} × 25 = ${TROU}`,
        reponse: String(trou ? k : k * 25),
        indice: '4 fois 25, c’est 100.',
        explication: `${k} × 25 = ${k * 25}. Le nombre manquant est ${trou ? k : k * 25}.`,
      };
    }
    if (type === 1) {
      // Moitié : 2 × … = 70 ou 1 000 = 2 × …
      const n = a.choisir(MOITIES[d - 1]!);
      const sens = a.suivant() < 0.5;
      return {
        gabarit: 'saisie',
        consigne: sens ? `Complète : 2 × ${TROU} = ${fr(n)}` : `Complète : ${fr(n)} = 2 × ${TROU}`,
        reponse: String(n / 2),
        indice: `Cherche la moitié de ${fr(n)}.`,
        explication: `La moitié de ${fr(n)} est ${fr(n / 2)}. 2 × ${fr(n / 2)} = ${fr(n)}.`,
      };
    }
    const n = a.choisir(DOUBLES[d - 1]!);
    return {
      gabarit: 'saisie',
      consigne: `Complète : 2 × ${fr(n)} = ${TROU}`,
      reponse: String(2 * n),
      indice: 'Le double, c’est deux fois le même nombre.',
      explication: `${fr(n)} + ${fr(n)} = ${fr(2 * n)}. Le double de ${fr(n)} est ${fr(2 * n)}.`,
    };
  },
});

// ─────────── Multiplier par 10 ou par 100

export const numerationCalculCe2 = creerGenerateur({
  id: 'numeration-calcul-ce2',
  competence: 'MA-C2-CE2-CALC-03',
  cycle: 2,
  description: 'Multiplier un nombre entier par 10 ou par 100, retrouver le facteur manquant.',
  generer(a, d) {
    if (d === 3) {
      const cent = a.suivant() < 0.5;
      const f = cent ? 100 : 10;
      const n = cent ? a.entier(2, 99) : a.entier(11, 999);
      return {
        gabarit: 'saisie',
        consigne: `Complète : ${n} × ${TROU} = ${fr(n * f)}`,
        reponse: String(f),
        indice: cent ? 'Une unité devient-elle une dizaine ou une centaine ?' : 'Combien de zéros ont été ajoutés ?',
        explication: `${fr(n * f)} a ${cent ? 'deux zéros' : 'un zéro'} de plus que ${n}. ${n} × ${f} = ${fr(n * f)}.`,
      };
    }
    const cent = d === 2;
    const n = cent ? a.entier(2, 99) : a.entier(11, 999);
    const f = cent ? 100 : 10;
    const ordre = a.suivant() < 0.5;
    return {
      gabarit: 'saisie',
      consigne: ordre ? `Calcule : ${n} × ${f}` : `Calcule : ${f} × ${n}`,
      reponse: String(n * f),
      indice: cent ? 'Une unité devient une centaine.' : 'Une unité devient une dizaine.',
      explication: cent
        ? `Chaque chiffre prend une valeur 100 fois plus grande. ${n} × 100 = ${fr(n * f)}.`
        : `Chaque chiffre prend une valeur 10 fois plus grande. ${n} × 10 = ${fr(n * f)}.`,
    };
  },
});

// ─────────── Procédures : + 8, 9, 18… 39 ; − 9… 39 ; × 4, × 8 ; × dizaines ; 23 × 7

export const proceduresCe2 = creerGenerateur({
  id: 'procedures-ce2',
  competence: 'MA-C2-CE2-CALC-04',
  cycle: 2,
  description: 'Procédures de calcul mental du programme de CE2.',
  generer(a, d) {
    if (d === 1) {
      if (a.suivant() < 0.6) {
        const k = a.choisir([8, 9, 18, 19, 28, 29, 38, 39]);
        const rond = k + (k % 10 === 8 ? 2 : 1);
        const n = a.entier(100, 9900);
        return {
          gabarit: 'saisie',
          consigne: `Calcule : ${fr(n)} + ${k}`,
          reponse: String(n + k),
          indice: `Ajoute ${rond}, puis enlève ${rond - k}.`,
          explication: `${fr(n)} + ${rond} = ${fr(n + rond)}. Puis ${fr(n + rond)} − ${rond - k} = ${fr(n + k)}.`,
        };
      }
      const k = a.choisir([9, 19, 29, 39]);
      const n = a.entier(100, 9999);
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${fr(n)} − ${k}`,
        reponse: String(n - k),
        indice: `Enlève ${k + 1}, puis ajoute 1.`,
        explication: `${fr(n)} − ${k + 1} = ${fr(n - k - 1)}. Puis ${fr(n - k - 1)} + 1 = ${fr(n - k)}.`,
      };
    }
    if (d === 2) {
      const huit = a.suivant() < 0.4;
      const n = a.entier(11, huit ? 99 : 250);
      const etapes = huit ? [2 * n, 4 * n, 8 * n] : [2 * n, 4 * n];
      const f = huit ? 8 : 4;
      const calculs = etapes.map((v, i) => `2 × ${fr(i === 0 ? n : etapes[i - 1]!)} = ${fr(v)}`);
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${f} × ${n}`,
        reponse: String(f * n),
        indice: huit ? 'Multiplie par 2, trois fois de suite.' : 'Multiplie par 2, puis encore par 2.',
        explication: `${calculs.join('. ')}. Donc ${f} × ${n} = ${fr(f * n)}.`,
      };
    }
    if (a.suivant() < 0.4) {
      // Nombre inférieur à 10 multiplié par un nombre entier de dizaines : 9 × 40.
      const x = a.entier(2, 9);
      const k = a.entier(2, 9);
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${x} × ${k * 10}`,
        reponse: String(x * k * 10),
        indice: `${k * 10}, c’est ${k} × 10.`,
        explication: `${x} × ${k} = ${x * k}. Puis ${x * k} × 10 = ${x * k * 10}.`,
      };
    }
    // Distributivité : 23 × 7 = 20 × 7 + 3 × 7.
    const dz = a.entier(1, 9);
    const u = a.entier(1, 9);
    const grand = dz * 10 + u;
    const petit = a.entier(2, 9);
    const ordre = a.suivant() < 0.5;
    return {
      gabarit: 'saisie',
      consigne: ordre ? `Calcule : ${grand} × ${petit}` : `Calcule : ${petit} × ${grand}`,
      reponse: String(grand * petit),
      indice: `${grand} fois ${petit}, c’est ${dz * 10} fois ${petit} plus ${u} fois ${petit}.`,
      explication: `${dz * 10} × ${petit} = ${dz * 10 * petit}. ${u} × ${petit} = ${u * petit}. ${dz * 10 * petit} + ${u * petit} = ${grand * petit}.`,
    };
  },
});
