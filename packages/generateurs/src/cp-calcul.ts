// CP, calcul mental et opérations. Source : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024).
// Tous les nombres en jeu et tous les résultats restent inférieurs ou égaux à 100.
import { creerGenerateur, qte } from './outils';

const TROU = '…';

// ─────────── Tables d'addition, dans les deux sens (termes de 0 à 10)

export const tablesAdditionCp = creerGenerateur({
  id: 'tables-addition-cp',
  competence: 'MA-C2-CP-CALC-01',
  cycle: 2,
  description: 'Compléter des égalités à trou avec les tables d’addition.',
  generer(a, d) {
    const x = a.entier(d === 1 ? 1 : 0, 10);
    const y = a.entier(d === 1 ? 1 : 0, 10);
    const s = x + y;
    const formes = [
      { consigne: `${x} + ${y} = ${TROU}`, reponse: s },
      { consigne: `${x} + ${TROU} = ${s}`, reponse: y },
      { consigne: `${TROU} + ${y} = ${s}`, reponse: x },
      { consigne: `${s} = ${x} + ${TROU}`, reponse: y },
    ];
    const f = d === 1 ? formes[0]! : d === 2 ? a.choisir(formes.slice(1, 3)) : formes[3]!;
    return {
      gabarit: 'saisie',
      consigne: `Complète : ${f.consigne}`,
      reponse: String(f.reponse),
      indice: d === 1 ? `Pars de ${Math.max(x, y)} et avance de ${Math.min(x, y)}.` : `Cherche ce qui manque pour aller jusqu’à ${s}.`,
      explication: `${x} + ${y} = ${s}. Le nombre manquant est ${f.reponse}.`,
    };
  },
});

// ─────────── Doubles et moitiés (listes du programme de CP)

const DOUBLES_CP = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50];
const MOITIES_CP = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 40, 60, 80, 100];

export const doublesMoitiesCp = creerGenerateur({
  id: 'doubles-moities-cp',
  competence: 'MA-C2-CP-CALC-02',
  cycle: 2,
  description: 'Connaitre les doubles des nombres de 1 à 10 et des dizaines, les moitiés des nombres pairs usuels.',
  generer(a, d) {
    const moitie = d === 2 || (d === 3 && a.suivant() < 0.5);
    if (d === 3) {
      if (moitie) {
        const n = a.choisir(MOITIES_CP);
        return {
          gabarit: 'saisie',
          consigne: `Complète : moitié de ${TROU} = ${n / 2}`,
          reponse: String(n),
          indice: `Cherche le double de ${n / 2}.`,
          explication: `${n / 2} + ${n / 2} = ${n}. La moitié de ${n} est ${n / 2}.`,
        };
      }
      const n = a.choisir(DOUBLES_CP);
      return {
        gabarit: 'saisie',
        consigne: `Complète : double de ${TROU} = ${2 * n}`,
        reponse: String(n),
        indice: `Cherche la moitié de ${2 * n}.`,
        explication: `${n} + ${n} = ${2 * n}. Le double de ${n} est ${2 * n}.`,
      };
    }
    if (moitie) {
      const n = a.choisir(MOITIES_CP);
      return {
        gabarit: 'saisie',
        consigne: `Quelle est la moitié de ${n} ?`,
        reponse: String(n / 2),
        indice: 'Partage en deux parts égales.',
        explication: `${n / 2} + ${n / 2} = ${n}. La moitié de ${n} est ${n / 2}.`,
      };
    }
    const n = a.choisir(DOUBLES_CP);
    return {
      gabarit: 'saisie',
      consigne: `Quel est le double de ${n} ?`,
      reponse: String(2 * n),
      indice: 'Le double, c’est deux fois le même nombre.',
      explication: `${n} + ${n} = ${2 * n}. Le double de ${n} est ${2 * n}.`,
    };
  },
});

// ─────────── Ajouter ou soustraire 1, 2, 10, des dizaines entières

export const numerationCalculCp = creerGenerateur({
  id: 'numeration-calcul-cp',
  competence: 'MA-C2-CP-CALC-03',
  cycle: 2,
  description: 'Ajouter ou soustraire 1 ou 2, 10, puis 20, 30… 90 à un nombre.',
  generer(a, d) {
    if (d === 1) {
      const k = a.choisir([1, 2]);
      const ajout = a.suivant() < 0.5;
      const n = ajout ? a.entier(3, 100 - k) : a.entier(4, 99);
      const r = ajout ? n + k : n - k;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${n} ${ajout ? '+' : '−'} ${k}`,
        visuel: { type: 'droite', min: Math.min(n, r) - 2, max: Math.min(100, Math.max(n, r) + 2), depart: n, saut: ajout ? k : -k },
        reponse: String(r),
        indice: ajout ? 'Avance d’un pas pour chaque unité.' : 'Recule d’un pas pour chaque unité.',
        explication: k === 1
          ? `Le nombre juste ${ajout ? 'après' : 'avant'} ${n} est ${r}. ${n} ${ajout ? '+' : '−'} 1 = ${r}.`
          : `${n} ${ajout ? '+' : '−'} 1 = ${ajout ? n + 1 : n - 1}. Puis ${ajout ? n + 1 : n - 1} ${ajout ? '+' : '−'} 1 = ${r}.`,
      };
    }
    const n = a.entier(10, 99);
    const dz = Math.floor(n / 10);
    // Plus grand nombre de dizaines qu'on peut ajouter sans dépasser 100, ou retirer.
    const maxAjout = Math.floor((100 - n) / 10);
    const ajout = d === 2 ? maxAjout >= 1 && (dz < 1 || a.suivant() < 0.5) : maxAjout >= 2 && (dz < 2 || a.suivant() < 0.5);
    const k = d === 2 ? 1 : a.entier(2, ajout ? maxAjout : dz);
    const r = ajout ? n + 10 * k : n - 10 * k;
    const signe = ajout ? '+' : '−';
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${n} ${signe} ${10 * k}`,
      reponse: String(r),
      indice: `${10 * k}, c’est ${qte(k, 'dizaine')}.`,
      explication: `${ajout ? 'On ajoute' : 'On enlève'} ${qte(k, 'dizaine')}. ${qte(dz, 'dizaine')} ${signe} ${qte(k, 'dizaine')} = ${qte(ajout ? dz + k : dz - k, 'dizaine')}. ${n} ${signe} ${10 * k} = ${r}.`,
    };
  },
});

// ─────────── Complément à la dizaine supérieure

export const complementDizaineCp = creerGenerateur({
  id: 'complement-dizaine-cp',
  competence: 'MA-C2-CP-CALC-04',
  cycle: 2,
  description: 'Trouver le complément à 10, puis le complément d’un nombre à la dizaine supérieure.',
  generer(a, d) {
    const u = a.entier(1, 9);
    const dz = d === 1 ? 0 : a.entier(1, 9);
    const n = 10 * dz + u;
    const cible = n - u + 10;
    const c = 10 - u;
    const formes = [`${n} + ${TROU} = ${cible}`, `${TROU} + ${n} = ${cible}`, `${cible} = ${n} + ${TROU}`];
    const forme = d === 3 ? a.choisir(formes.slice(1)) : formes[0]!;
    return {
      gabarit: 'saisie',
      consigne: `Complète : ${forme}`,
      reponse: String(c),
      indice: `Combien faut-il ajouter à ${u} pour faire 10 ?`,
      explication: dz === 0
        ? `${u} + ${c} = 10. Le nombre manquant est ${c}.`
        : `${n}, c’est ${qte(dz, 'dizaine')} et ${qte(u, 'unité')}. ${u} + ${c} = 10. Donc ${n} + ${c} = ${cible}.`,
    };
  },
});

// ─────────── Ajouter un nombre à un chiffre (avec ou sans passage de la dizaine), ajouter 9

export const ajouterUnChiffreCp = creerGenerateur({
  id: 'ajouter-un-chiffre-cp',
  competence: 'MA-C2-CP-CALC-05',
  cycle: 2,
  description: 'Ajouter un nombre inférieur à 9 sans ou avec passage de la dizaine, ajouter 9.',
  generer(a, d) {
    const dz = a.entier(1, 8);
    if (d === 1) {
      const u = a.entier(0, 7);
      const k = a.entier(1, Math.min(8, 9 - u));
      const n = 10 * dz + u;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${n} + ${k}`,
        reponse: String(n + k),
        indice: 'Ajoute seulement aux unités.',
        explication: `${u} + ${k} = ${u + k}. Les dizaines ne changent pas. ${n} + ${k} = ${n + k}.`,
      };
    }
    if (d === 2) {
      const u = a.entier(3, 9);
      const k = a.entier(11 - u, 8);
      const n = 10 * dz + u;
      const dizaine = n - u + 10;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${n} + ${k}`,
        reponse: String(n + k),
        indice: `Va d’abord jusqu’à ${dizaine}.`,
        explication: `${n} + ${10 - u} = ${dizaine}. Il reste ${k - (10 - u)} à ajouter. ${dizaine} + ${k - (10 - u)} = ${n + k}.`,
      };
    }
    const n = 10 * dz + a.entier(2, 9);
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${n} + 9`,
      reponse: String(n + 9),
      indice: 'Ajoute 10, puis enlève 1.',
      explication: `${n} + 10 = ${n + 10}. Puis ${n + 10} − 1 = ${n + 9}.`,
    };
  },
});

// ─────────── Procédures : retirer d'une dizaine entière, moitié d'un nombre pair, ajouter deux nombres

export const proceduresCp = creerGenerateur({
  id: 'procedures-cp',
  competence: 'MA-C2-CP-CALC-06',
  cycle: 2,
  description: 'Soustraire un nombre à un chiffre d’une dizaine entière, prendre la moitié d’un nombre pair, ajouter deux nombres.',
  generer(a, d) {
    if (d === 1) {
      const dz = a.entier(2, 10);
      const k = a.entier(1, 9);
      const n = 10 * dz;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${n} − ${k}`,
        reponse: String(n - k),
        indice: 'Casse une dizaine en 10 unités.',
        explication: `${n}, c’est ${n - 10} + 10. 10 − ${k} = ${10 - k}. ${n - 10} + ${10 - k} = ${n - k}.`,
      };
    }
    if (d === 2) {
      const dizaines = a.choisir([20, 40, 60, 80]);
      const unites = a.choisir([2, 4, 6, 8]);
      const n = dizaines + unites;
      return {
        gabarit: 'saisie',
        consigne: `Quelle est la moitié de ${n} ?`,
        reponse: String(n / 2),
        indice: `Écris ${n} = ${dizaines} + ${unites}.`,
        explication: `${n} = ${dizaines} + ${unites}. La moitié de ${dizaines} est ${dizaines / 2}. La moitié de ${unites} est ${unites / 2}. ${dizaines / 2} + ${unites / 2} = ${n / 2}.`,
      };
    }
    const x = a.entier(11, 79);
    const y = a.entier(11, 99 - x);
    const dx = x - (x % 10);
    const dy = y - (y % 10);
    const u = (x % 10) + (y % 10);
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${x} + ${y}`,
      reponse: String(x + y),
      indice: 'Ajoute les dizaines entre elles. Puis les unités entre elles.',
      explication: `${dx} + ${dy} = ${dx + dy}. ${x % 10} + ${y % 10} = ${u}. ${dx + dy} + ${u} = ${x + y}.`,
    };
  },
});

// ─────────── Addition et soustraction : opérations inverses

export const additionSoustractionCp = creerGenerateur({
  id: 'addition-soustraction-cp',
  competence: 'MA-C2-CP-OPE-01',
  cycle: 2,
  description: 'Utiliser une addition connue pour trouver une soustraction, reconnaitre une égalité juste.',
  generer(a, d) {
    const x = d === 1 ? a.entier(2, 10) : a.entier(11, 60);
    const y = d === 1 ? a.entier(2, 10) : a.entier(5, 99 - x);
    const s = x + y;
    if (d === 3) {
      const juste = `${s} − ${y} = ${x}`;
      const pieges = [`${y} − ${s} = ${x}`, `${x} − ${y} = ${s}`, `${s} + ${y} = ${x}`];
      return {
        gabarit: 'qcm',
        consigne: `On sait que ${x} + ${y} = ${s}. Quelle égalité est juste ?`,
        options: a.melanger([juste, ...pieges]),
        reponse: juste,
        indice: 'Dans une soustraction, on part du plus grand nombre.',
        explication: `${x} + ${y} = ${s}. Si on enlève ${y} à ${s}, il reste ${x}. Donc ${juste}.`,
      };
    }
    const retire = a.suivant() < 0.5 ? y : x;
    const reste = s - retire;
    return {
      gabarit: 'saisie',
      consigne: `On sait que ${x} + ${y} = ${s}. Combien fait ${s} − ${retire} ?`,
      reponse: String(reste),
      indice: 'La soustraction défait l’addition.',
      explication: `${x} + ${y} = ${s}. Donc ${s} − ${retire} = ${reste}.`,
    };
  },
});

// ─────────── Additions en colonnes

export const additionColonnesCp = creerGenerateur({
  id: 'addition-colonnes-cp',
  competence: 'MA-C2-CP-OPE-02',
  cycle: 2,
  description: 'Calculer une addition de deux ou trois nombres à un ou deux chiffres, posée en colonnes.',
  generer(a, d) {
    let termes: number[];
    if (d === 1) {
      // Sans retenue.
      const x = a.entier(11, 80);
      const ux = x % 10;
      const y = a.entier(1, Math.floor((99 - x) / 10)) * 10 + a.entier(0, 9 - ux);
      termes = [x, y];
    } else if (d === 2) {
      // Avec une retenue.
      const ux = a.entier(2, 9);
      const uy = a.entier(10 - ux, 9);
      const dx = a.entier(1, 7);
      const dy = a.entier(1, 8 - dx);
      termes = [10 * dx + ux, 10 * dy + uy];
    } else {
      const x = a.entier(11, 40);
      const y = a.entier(2, 9);
      const z = a.entier(11, 99 - x - y);
      termes = a.melanger([x, y, z]);
    }
    const somme = termes.reduce((p, q) => p + q, 0);
    const unites = termes.reduce((p, q) => p + (q % 10), 0);
    const dizaines = termes.reduce((p, q) => p + Math.floor(q / 10), 0);
    const listeDizaines = termes.filter((t) => t >= 10).map((t) => Math.floor(t / 10)).join(' + ');
    const retenue = Math.floor(unites / 10);
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${termes.join(' + ')}`,
      reponse: String(somme),
      indice: 'Pose l’addition. Les unités sous les unités.',
      explication: retenue === 0
        ? `Unités : ${termes.map((t) => t % 10).join(' + ')} = ${unites}. Dizaines : ${listeDizaines} = ${dizaines}. Le résultat est ${somme}.`
        : `Unités : ${termes.map((t) => t % 10).join(' + ')} = ${unites}. J’écris ${unites % 10}, je retiens ${retenue}. Dizaines : ${listeDizaines} + ${retenue} = ${dizaines + retenue}. Le résultat est ${somme}.`,
    };
  },
});
