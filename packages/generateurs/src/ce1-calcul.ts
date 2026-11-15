// CE1, calcul mental. Source : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024).
import { creerGenerateur, qte } from './outils';

const TROU = '…';

// ─────────── Tables d'addition, dans les deux sens

export const tablesAdditionCe1 = creerGenerateur({
  id: 'tables-addition-ce1',
  competence: 'MA-C2-CE1-CALC-01',
  cycle: 2,
  description: 'Compléter des égalités à trou avec les tables d’addition.',
  generer(a, d) {
    const x = a.entier(1, 10);
    const y = a.entier(1, 10);
    const s = x + y;
    const formes = [
      { consigne: `${x} + ${y} = ${TROU}`, reponse: s },
      { consigne: `${x} + ${TROU} = ${s}`, reponse: y },
      { consigne: `${s} = ${x} + ${TROU}`, reponse: y },
      { consigne: `${TROU} + ${y} = ${s}`, reponse: x },
    ];
    const f = d === 1 ? formes[0]! : d === 2 ? formes[1]! : a.choisir(formes.slice(2));
    return {
      gabarit: 'saisie',
      consigne: `Complète : ${f.consigne}`,
      reponse: String(f.reponse),
      indice: d === 1 ? `Pars de ${Math.max(x, y)} et avance de ${Math.min(x, y)}.` : `Cherche ce qui manque pour aller jusqu’à ${s}.`,
      explication: `${x} + ${y} = ${s}. Le nombre manquant est ${f.reponse}.`,
    };
  },
});

// ─────────── Tables de multiplication, dans les deux sens

export const tablesMultiplicationCe1 = creerGenerateur({
  id: 'tables-multiplication-ce1',
  competence: 'MA-C2-CE1-CALC-02',
  cycle: 2,
  description: 'Compléter des égalités à trou avec les tables de multiplication.',
  generer(a, d) {
    const x = a.choisir(d === 1 ? [2, 5, 10] : d === 2 ? [3, 4] : [2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const y = a.entier(d === 3 ? 1 : 0, 10);
    const p = x * y;
    const formes = [
      { consigne: `${x} × ${y} = ${TROU}`, reponse: p },
      { consigne: `${x} × ${TROU} = ${p}`, reponse: y },
      { consigne: `${p} = ${x} × ${TROU}`, reponse: y },
    ];
    const f = d === 3 ? a.choisir(formes.slice(1)) : formes[0]!;
    return {
      gabarit: 'saisie',
      consigne: `Complète : ${f.consigne}`,
      reponse: String(f.reponse),
      indice: `Récite la table de ${x}.`,
      explication: `${x} × ${y} = ${p}. ${x} fois ${y}, c’est ${p}. Le nombre manquant est ${f.reponse}.`,
    };
  },
});

// ─────────── Doubles, moitiés, multiples de 25 (listes du programme)

const DOUBLES = [
  Array.from({ length: 15 }, (_, i) => i + 1),
  [20, 25, 30, 35, 40, 45, 50],
  [100, 150, 200, 250, 300, 500],
];
const MOITIES = [
  Array.from({ length: 15 }, (_, i) => 2 * (i + 1)),
  [40, 50, 60, 70, 80, 90, 100],
  [200, 300, 400, 500, 600, 1000],
];

export const doublesMoitiesCe1 = creerGenerateur({
  id: 'doubles-moities-ce1',
  competence: 'MA-C2-CE1-CALC-03',
  cycle: 2,
  description: 'Connaitre les doubles, les moitiés et les premiers multiples de 25.',
  generer(a, d) {
    const type = a.entier(0, d === 3 ? 3 : 2);
    if (type === 3) {
      const k = a.entier(1, 4);
      const trou = a.suivant() < 0.5;
      return {
        gabarit: 'saisie',
        consigne: trou ? `Complète : ${k * 25} = ${TROU} × 25` : `Complète : ${k} × 25 = ${TROU}`,
        reponse: String(trou ? k : k * 25),
        indice: '4 fois 25, c’est 100.',
        explication: `${k} × 25 = ${k * 25}.`,
      };
    }
    if (type === 1) {
      const n = a.choisir(MOITIES[d - 1]!);
      return {
        gabarit: 'saisie',
        consigne: `Quelle est la moitié de ${n} ?`,
        reponse: String(n / 2),
        indice: 'Cherche le nombre qui, ajouté à lui-même, donne ce nombre.',
        explication: `${n / 2} + ${n / 2} = ${n}. La moitié de ${n} est ${n / 2}.`,
      };
    }
    const n = a.choisir(DOUBLES[d - 1]!);
    if (type === 2) {
      return {
        gabarit: 'saisie',
        consigne: `Complète : 2 × ${TROU} = ${2 * n}`,
        reponse: String(n),
        indice: `Cherche la moitié de ${2 * n}.`,
        explication: `2 × ${n} = ${2 * n}. Le nombre manquant est ${n}.`,
      };
    }
    return {
      gabarit: 'saisie',
      consigne: `Quel est le double de ${n} ?`,
      reponse: String(2 * n),
      indice: 'Le double, c’est deux fois le même nombre.',
      explication: `${n} + ${n} = ${2 * n}. Le double de ${n} est ${2 * n}.`,
    };
  },
});

// ─────────── Calculer avec la numération : dizaines, centaines, × 10

export const numerationCalculCe1 = creerGenerateur({
  id: 'numeration-calcul-ce1',
  competence: 'MA-C2-CE1-CALC-04',
  cycle: 2,
  description: 'Ajouter ou soustraire des dizaines ou des centaines, multiplier par 10.',
  generer(a, d) {
    if (d === 3) {
      const n = a.entier(2, 99);
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${n} × 10`,
        reponse: String(n * 10),
        indice: 'Une unité devient une dizaine.',
        explication: `Chaque chiffre prend une valeur 10 fois plus grande. ${n} × 10 = ${n * 10}.`,
      };
    }
    const n = a.entier(101, 899);
    const c = Math.floor(n / 100);
    const dz = Math.floor(n / 10) % 10;
    if (d === 1) {
      const ajout = dz < 9 && (dz === 0 || a.suivant() < 0.5);
      const k = ajout ? a.entier(1, 9 - dz) : a.entier(1, dz);
      const r = ajout ? n + 10 * k : n - 10 * k;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${n} ${ajout ? '+' : '−'} ${10 * k}`,
        reponse: String(r),
        indice: `${10 * k}, c’est ${qte(k, 'dizaine')}.`,
        explication: `${ajout ? 'On ajoute' : 'On retire'} ${qte(k, 'dizaine')}. ${qte(dz, 'dizaine')} ${ajout ? '+' : '−'} ${qte(k, 'dizaine')} = ${qte(ajout ? dz + k : dz - k, 'dizaine')}. ${n} ${ajout ? '+' : '−'} ${10 * k} = ${r}.`,
      };
    }
    if (a.suivant() < 0.5) {
      // Retenue sur les dizaines, comme 746 + 80.
      const base = c * 100 + a.entier(2, 9) * 10 + (n % 10);
      const b = Math.floor(base / 10) % 10;
      const k = a.entier(10 - b, 9);
      const r = base + 10 * k;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${base} + ${10 * k}`,
        reponse: String(r),
        indice: '10 dizaines font 1 centaine.',
        explication: `${b} dizaines + ${k} dizaines = ${b + k} dizaines. ${b + k} dizaines, c’est 1 centaine et ${qte(b + k - 10, 'dizaine')}. ${base} + ${10 * k} = ${r}.`,
      };
    }
    const ajout = c < 9 && (c === 1 || a.suivant() < 0.5);
    const k = ajout ? a.entier(1, 9 - c) : a.entier(1, c - 1);
    const r = ajout ? n + 100 * k : n - 100 * k;
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${n} ${ajout ? '+' : '−'} ${100 * k}`,
      reponse: String(r),
      indice: `${100 * k}, c’est ${qte(k, 'centaine')}.`,
      explication: `${ajout ? 'On ajoute' : 'On retire'} ${qte(k, 'centaine')}. Les dizaines et les unités ne changent pas. ${n} ${ajout ? '+' : '−'} ${100 * k} = ${r}.`,
    };
  },
});

// ─────────── Procédures : + 9, 19, 29 ; − 9 ; passer la dizaine ; moitié ; 13 × 7

export const proceduresCe1 = creerGenerateur({
  id: 'procedures-ce1',
  competence: 'MA-C2-CE1-CALC-05',
  cycle: 2,
  description: 'Procédures de calcul mental du programme de CE1.',
  generer(a, d) {
    if (d === 1) {
      if (a.suivant() < 0.7) {
        const k = a.choisir([9, 19, 29]);
        const n = a.entier(10, 95 - k) * 10 + a.entier(2, 9);
        const r = n + k;
        return {
          gabarit: 'saisie',
          consigne: `Calcule : ${n} + ${k}`,
          reponse: String(r),
          indice: `Ajoute ${k + 1}, puis enlève 1.`,
          explication: `${n} + ${k + 1} = ${r + 1}. Puis ${r + 1} − 1 = ${r}.`,
        };
      }
      const n = a.entier(20, 999);
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${n} − 9`,
        reponse: String(n - 9),
        indice: 'Enlève 10, puis ajoute 1.',
        explication: `${n} − 10 = ${n - 10}. Puis ${n - 10} + 1 = ${n - 9}.`,
      };
    }
    if (d === 2) {
      if (a.suivant() < 0.6) {
        const u = a.entier(1, 7);
        const n = a.entier(2, 99) * 10 + u;
        const k = a.entier(u + 1, 9);
        const dizaine = n - u;
        return {
          gabarit: 'saisie',
          consigne: `Calcule : ${n} − ${k}`,
          reponse: String(n - k),
          indice: `Descends d’abord jusqu’à ${dizaine}.`,
          explication: `${n} − ${u} = ${dizaine}. Il reste ${k - u} à enlever. ${dizaine} − ${k - u} = ${n - k}.`,
        };
      }
      const centaines = a.entier(1, 9) * 100;
      const reste = a.entier(1, 49) * 2;
      const n = centaines + reste;
      return {
        gabarit: 'saisie',
        consigne: `Quelle est la moitié de ${n} ?`,
        reponse: String(n / 2),
        indice: `Écris ${n} = ${centaines} + ${reste}.`,
        explication: `${n} = ${centaines} + ${reste}. La moitié de ${centaines} est ${centaines / 2}. La moitié de ${reste} est ${reste / 2}. ${centaines / 2} + ${reste / 2} = ${n / 2}.`,
      };
    }
    const grand = a.entier(11, 19);
    const petit = a.entier(2, 9);
    const u = grand - 10;
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${grand} × ${petit}`,
      reponse: String(grand * petit),
      indice: `${grand} fois ${petit}, c’est 10 fois ${petit} plus ${u} fois ${petit}.`,
      explication: `10 × ${petit} = ${10 * petit}. ${u} × ${petit} = ${u * petit}. ${10 * petit} + ${u * petit} = ${grand * petit}.`,
    };
  },
});
