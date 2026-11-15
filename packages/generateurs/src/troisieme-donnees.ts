// 3e, données, proportionnalité et fonctions (programme 2026) : effectifs cumulés, médiane et quartiles, probabilité
// de la réunion, évolutions en pourcentage, image et antécédent, fonctions linéaires et affines.
// Source : programme de mathématiques du cycle 4 (arrêté du 18 février 2026, BO n°10 du 5 mars 2026), p. 50 à 53.
import { depuisEntier } from './decimaux';
import { choix, creerGenerateur, fr, qte } from './outils';
import { ecrireRelatif } from './relatifs-c4';
import { affine } from './troisieme-nombres';

const pgcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : pgcd(y, x % y));
const fraction = (n: number, d: number) => {
  const g = pgcd(n, d);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
};
/** Décimal exact écrit à la française : 19.5 → « 19,5 ». */
const dec = (x: number) => String(Math.round(x * 100) / 100).replace('.', ',').replace('-', '−');
const signe = (a: { suivant: () => number }) => (a.suivant() < 0.5 ? -1 : 1);
/** Relatif dans un calcul : parenthèses s'il est négatif. */
const par = (n: number) => (n < 0 ? `(${ecrireRelatif(n)})` : String(n));
const rangTexte = (r: number) => (r === 1 ? '1re' : `${r}e`);
/** Décimal exact au centième près, sinon rien (pour écarter un piège non décimal). */
const decExact = (x: number) => (Math.abs(x * 100 - Math.round(x * 100)) < 1e-9 ? dec(x) : undefined);

// ─────────── Effectifs cumulés, médiane, quartiles

const CONTEXTES_STAT = [
  { titre: 'Pointures relevées dans une classe', debut: [35, 39], pas: 1, individu: 'élève' },
  { titre: 'Notes sur 20 à un contrôle', debut: [5, 9], pas: 2, individu: 'élève' },
  { titre: 'Nombre de buts marqués par match', debut: [0, 1], pas: 1, individu: 'match' },
  { titre: 'Nombre de frères et sœurs des élèves', debut: [0, 0], pas: 1, individu: 'élève' },
  { titre: 'Temps de trajet en minutes', debut: [5, 10], pas: 5, individu: 'élève' },
];

export const quartiles3e = creerGenerateur({
  id: 'quartiles-3e',
  competence: 'MA-C4-3E-STAT-01',
  cycle: 4,
  description: 'Calculer des effectifs cumulés, la médiane et les quartiles d’une série donnée par un tableau d’effectifs.',
  generer(a, d) {
    const c = a.choisir(CONTEXTES_STAT);
    const k = a.entier(4, d === 1 ? 5 : 6);
    const debut = a.entier(c.debut[0]!, c.debut[1]!);
    const valeurs = Array.from({ length: k }, (_, i) => debut + i * c.pas);
    const effectifs = valeurs.map(() => a.entier(1, d === 1 ? 6 : 9));
    const n = effectifs.reduce((s, e) => s + e, 0);
    const cumules = effectifs.map((_, i) => effectifs.slice(0, i + 1).reduce((s, e) => s + e, 0));
    const valeurDeRang = (rang: number) => valeurs[cumules.findIndex((x) => x >= rang)]!;
    const serie = valeurs.map((v, i) => `${v} (${qte(effectifs[i]!, c.individu)})`).join(', ');
    const tableau = `${c.titre} : ${serie}.`;
    const listeCumules = `Effectifs cumulés croissants : ${cumules.join(' ; ')}.`;
    if (d === 1) {
      const j = a.entier(1, k - 1);
      return {
        gabarit: 'saisie',
        consigne: `${tableau} Quel est l’effectif cumulé croissant de la valeur ${valeurs[j]} ?`,
        reponse: String(cumules[j]),
        indice: 'Additionne les effectifs de cette valeur et de toutes les valeurs plus petites.',
        explication: `${effectifs.slice(0, j + 1).join(' + ')} = ${cumules[j]}.`,
      };
    }
    if (d === 2) {
      const mediane = n % 2 ? valeurDeRang((n + 1) / 2) : (valeurDeRang(n / 2) + valeurDeRang(n / 2 + 1)) / 2;
      return {
        gabarit: 'saisie',
        consigne: `${tableau} Détermine la médiane de cette série.`,
        reponse: dec(mediane),
        indice: 'Range les valeurs dans l’ordre et cherche celle du milieu à l’aide des effectifs cumulés.',
        explication: `Effectif total : ${n}. ${listeCumules} ${n % 2 ? `La médiane est la ${rangTexte((n + 1) / 2)} valeur : ${dec(mediane)}.` : `La médiane est la moyenne des ${rangTexte(n / 2)} et ${rangTexte(n / 2 + 1)} valeurs : ${dec(mediane)}.`}`,
      };
    }
    const premier = a.suivant() < 0.5;
    const rang = Math.ceil((premier ? n : 3 * n) / 4);
    const q = valeurDeRang(rang);
    return {
      gabarit: 'saisie',
      consigne: `${tableau} Détermine le ${premier ? 'premier' : 'troisième'} quartile de cette série.`,
      reponse: String(q),
      indice: `${premier ? 'Q1' : 'Q3'} est la plus petite valeur telle qu’au moins ${premier ? '25' : '75'} % des valeurs lui soient inférieures ou égales.`,
      explication: `Effectif total : ${n}. ${premier ? '25' : '75'} % de ${n} = ${dec((premier ? n : 3 * n) / 4)}${(premier ? n : 3 * n) % 4 ? `, on prend le rang entier suivant : ${rang}` : ` : c’est le rang ${rang}`}. ${listeCumules} La ${rangTexte(rang)} valeur est ${q}.`,
    };
  },
});

// ─────────── Probabilité de la réunion

export const probaReunion3e = creerGenerateur({
  id: 'probabilite-reunion-3e',
  competence: 'MA-C4-3E-PROBA-01',
  cycle: 4,
  description: 'Appliquer la relation P(A ∪ B) + P(A ∩ B) = P(A) + P(B).',
  generer(a, d) {
    if (d < 3) {
      // En centièmes, multiples de 5.
      const pa = 5 * a.entier(4, 14);
      const pb = 5 * a.entier(3, 12);
      // P(A ∩ B) < min(P(A), P(B)) et P(A ∪ B) ⩽ 1.
      const inter = 5 * a.entier(Math.max(1, (pa + pb - 100) / 5), Math.min(pa, pb) / 5 - 1);
      const union = pa + pb - inter;
      const [A, B, I, U] = [pa, pb, inter, union].map((x) => depuisEntier(x, 2));
      if (d === 1) {
        return {
          gabarit: 'saisie',
          consigne: `P(A) = ${A}, P(B) = ${B} et P(A ∩ B) = ${I}. Calcule P(A ∪ B).`,
          reponse: U!,
          indice: 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B).',
          explication: `P(A ∪ B) = ${A} + ${B} − ${I} = ${U}. On retire P(A ∩ B), comptée deux fois.`,
        };
      }
      return {
        gabarit: 'saisie',
        consigne: `P(A) = ${A}, P(B) = ${B} et P(A ∪ B) = ${U}. Calcule P(A ∩ B).`,
        reponse: I!,
        indice: 'P(A ∩ B) = P(A) + P(B) − P(A ∪ B).',
        explication: `P(A ∩ B) = ${A} + ${B} − ${U} = ${I}.`,
      };
    }
    // Cartes numérotées de 1 à n : A « pair », B « multiple de k ».
    const n = a.entier(10, 30);
    const k = a.choisir([3, 5, 7]);
    const nA = Math.floor(n / 2);
    const nB = Math.floor(n / k);
    const nI = Math.floor(n / (2 * k));
    const nU = nA + nB - nI;
    const reponse = fraction(nU, n);
    return {
      gabarit: 'saisie',
      consigne: `On tire au hasard une carte parmi ${n} cartes numérotées de 1 à ${n}. A : « le numéro est pair ». B : « le numéro est un multiple de ${k} ». Calcule P(A ∪ B) sous forme de fraction irréductible.`,
      reponse,
      indice: `Compte les cartes de A, celles de B, puis celles qui sont dans les deux (multiples de ${2 * k}).`,
      explication: `P(A) = ${nA}/${n}, P(B) = ${nB}/${n}, P(A ∩ B) = ${nI}/${n}. P(A ∪ B) = (${nA} + ${nB} − ${nI})/${n} = ${nU}/${n}${reponse === `${nU}/${n}` ? '' : ` = ${reponse}`}.`,
    };
  },
});

// ─────────── Traduire une évolution en pourcentage

const CONTEXTES_EVOL = [
  { sujet: 'Le prix d’un vélo', unite: '€', pronom: 'il' },
  { sujet: 'Le nombre d’abonnés d’un club', unite: '', pronom: 'il' },
  { sujet: 'La population d’un village', unite: 'habitants', pronom: 'elle' },
  { sujet: 'Le prix d’un abonnement', unite: '€', pronom: 'il' },
  { sujet: 'Le nombre de visiteurs d’un musée', unite: '', pronom: 'il' },
  { sujet: 'La facture d’électricité d’une famille', unite: '€', pronom: 'elle' },
];
const evolution = (p: number) => (p > 0 ? `hausse de ${dec(p)} %` : p < 0 ? `baisse de ${dec(-p)} %` : 'aucune évolution');

export const evolutionPourcentage3e = creerGenerateur({
  id: 'evolution-pourcentage-3e',
  competence: 'MA-C4-3E-PCT-01',
  cycle: 4,
  description: 'Traduire une augmentation ou une diminution en pourcentage, y compris des évolutions successives.',
  generer(a, d) {
    if (d < 3) {
      const c = a.choisir(CONTEXTES_EVOL);
      const t = a.choisir([5, 10, 15, 20, 25, 30, 40, 50, 60, 75]);
      const hausse = d === 1 || a.suivant() < 0.4;
      const depart = 20 * a.entier(1, 30);
      const variation = (depart * t) / 100;
      const arrivee = hausse ? depart + variation : depart - variation;
      const unite = c.unite ? ` ${c.unite}` : '';
      return {
        gabarit: 'saisie',
        consigne: `${c.sujet} passe de ${fr(depart)}${unite} à ${fr(arrivee)}${unite}. De quel pourcentage a-t-${c.pronom} ${hausse ? 'augmenté' : 'diminué'} ?`,
        reponse: String(t),
        indice: 'Calcule la variation, puis divise-la par la valeur de départ.',
        explication: `Variation : ${fr(variation)}. ${fr(variation)} ÷ ${fr(depart)} = ${depuisEntier(t, 2)}, soit ${t} %.`,
      };
    }
    const t1 = a.choisir([10, 20, 25, 30, 40, 50]);
    const t2 = a.choisir([10, 20, 25, 30, 40, 50]);
    const hausseDabord = a.suivant() < 0.5;
    // Coefficients en centièmes : (100 + t1)(100 − t2) / 10 000.
    const produit = (100 + t1) * (100 - t2);
    const p = (produit - 10000) / 100;
    const reponse = evolution(p);
    const naif = evolution(t1 - t2);
    const [premiere, seconde] = hausseDabord ? [`une hausse de ${t1} %`, `une baisse de ${t2} %`] : [`une baisse de ${t2} %`, `une hausse de ${t1} %`];
    return {
      gabarit: 'qcm',
      consigne: `Un prix subit ${premiere}, puis ${seconde}. Quelle est l’évolution globale ?`,
      ...choix(a, reponse, [[naif, 'pourcentages-additionnes'], [evolution(-p), 'hausse-baisse-confondues'], [evolution(p + (p > 0 ? 10 : -10))]], () => evolution(p + a.entier(1, 9))),
      reponse,
      indice: 'Les pourcentages ne s’additionnent pas : on multiplie les coefficients multiplicateurs.',
      explication: `${hausseDabord ? `${depuisEntier(100 + t1, 2)} × ${depuisEntier(100 - t2, 2)}` : `${depuisEntier(100 - t2, 2)} × ${depuisEntier(100 + t1, 2)}`} = ${depuisEntier(produit, 4)}. Le prix est multiplié par ${depuisEntier(produit, 4)} : c’est une ${reponse === 'aucune évolution' ? 'évolution nulle' : reponse}.`,
    };
  },
});

// ─────────── Image et antécédent

export const imageAntecedent3e = creerGenerateur({
  id: 'image-antecedent-3e',
  competence: 'MA-C4-3E-FONC-01',
  cycle: 4,
  description: 'Utiliser le vocabulaire image et antécédent, avec une formule ou un tableau de valeurs.',
  generer(a, d) {
    if (d === 1) {
      const carre = a.suivant() < 0.4;
      const k = a.entier(2, 9) * signe(a);
      const b = a.entier(1, 9) * signe(a);
      const x = a.entier(1, 9) * signe(a);
      const expr = carre ? `x² ${b < 0 ? '−' : '+'} ${Math.abs(b)}` : affine(k, b);
      const y = carre ? x * x + b : k * x + b;
      return {
        gabarit: 'saisie',
        consigne: `On donne f(x) = ${expr}. Calcule l’image de ${ecrireRelatif(x)} par f.`,
        reponse: ecrireRelatif(y),
        indice: 'L’image de a, c’est f(a) : remplace x par a dans la formule.',
        explication: `f(${ecrireRelatif(x)}) = ${carre ? `${par(x)}² ${b < 0 ? '−' : '+'} ${Math.abs(b)}` : `${ecrireRelatif(k)} × ${par(x)} ${b < 0 ? '−' : '+'} ${Math.abs(b)}`} = ${ecrireRelatif(y)}.`,
      };
    }
    if (d === 2) {
      // Tableau de valeurs : images distinctes, pour qu'un antécédent soit unique.
      const debut = a.entier(-3, 0);
      const xs = Array.from({ length: 6 }, (_, i) => debut + i);
      const ys = a.melanger(Array.from({ length: 19 }, (_, i) => i - 9)).slice(0, 6);
      // On interroge de préférence un nombre présent dans les deux lignes : le piège image/antécédent existe.
      const communs = xs.filter((x) => ys.includes(x));
      const cible = communs.length ? a.choisir(communs) : a.choisir(xs);
      const demandeImage = a.suivant() < 0.5;
      const image = ys[xs.indexOf(cible)]!;
      const antecedent = ys.includes(cible) ? xs[ys.indexOf(cible)]! : undefined;
      const tableau = `x : ${xs.map(ecrireRelatif).join(' ; ')}. f(x) : ${ys.map(ecrireRelatif).join(' ; ')}.`;
      if (demandeImage || antecedent === undefined) {
        const reponse = ecrireRelatif(image);
        return {
          gabarit: 'qcm',
          consigne: `Tableau de valeurs d’une fonction f. ${tableau} Quelle est l’image de ${ecrireRelatif(cible)} par f ?`,
          ...choix(a, reponse, [[antecedent === undefined ? undefined : ecrireRelatif(antecedent), 'image-antecedent-confondus'], [ys[(xs.indexOf(cible) + 1) % 6] === undefined ? undefined : ecrireRelatif(ys[(xs.indexOf(cible) + 1) % 6]!), 'lecture-tableau-decalee'], [ecrireRelatif(-image)]], () => ecrireRelatif(image + a.entier(10, 20))),
          reponse,
          indice: 'L’image se lit sur la ligne f(x), sous la valeur de x.',
          explication: `Sous x = ${ecrireRelatif(cible)}, on lit f(x) = ${reponse}. L’image de ${ecrireRelatif(cible)} est ${reponse}.`,
        };
      }
      const reponse = ecrireRelatif(antecedent);
      return {
        gabarit: 'qcm',
        consigne: `Tableau de valeurs d’une fonction f. ${tableau} Quel est l’antécédent de ${ecrireRelatif(cible)} par f ?`,
        ...choix(a, reponse, [[ecrireRelatif(image), 'image-antecedent-confondus'], [ecrireRelatif(xs[(xs.indexOf(antecedent) + 1) % 6]!), 'lecture-tableau-decalee'], [ecrireRelatif(-antecedent)]], () => ecrireRelatif(antecedent + a.entier(10, 20))),
        reponse,
        indice: 'Un antécédent se lit sur la ligne x, au-dessus de la valeur cherchée dans la ligne f(x).',
        explication: `On cherche ${ecrireRelatif(cible)} dans la ligne f(x) : il est sous x = ${reponse}. L’antécédent de ${ecrireRelatif(cible)} est ${reponse}.`,
      };
    }
    // Antécédent par le calcul : ax + b = y.
    const k = a.entier(2, 9) * signe(a);
    const b = a.entier(1, 12) * signe(a);
    const x = a.entier(1, 12) * signe(a);
    const y = k * x + b;
    return {
      gabarit: 'saisie',
      consigne: `On donne f(x) = ${affine(k, b)}. Calcule l’antécédent de ${ecrireRelatif(y)} par f.`,
      reponse: ecrireRelatif(x),
      indice: `Résous l’équation ${affine(k, b)} = ${ecrireRelatif(y)}.`,
      explication: `${affine(k, b)} = ${ecrireRelatif(y)} donne ${affine(k, 0)} = ${ecrireRelatif(y - b)}, donc x = ${ecrireRelatif(y - b)} ÷ ${k < 0 ? `(${ecrireRelatif(k)})` : k} = ${ecrireRelatif(x)}.`,
    };
  },
});

// ─────────── Fonctions linéaires

export const lineaires3e = creerGenerateur({
  id: 'fonctions-lineaires-3e',
  competence: 'MA-C4-3E-LIN-01',
  cycle: 4,
  description: 'Calculer une image, retrouver le coefficient d’une fonction linéaire, l’utiliser.',
  generer(a, d) {
    // Coefficient en dixièmes : entier ou décimal à un chiffre.
    const c10 = d === 1 ? 10 * a.entier(2, 9) * signe(a) : a.choisir([5, 12, 15, 20, 25, 30, 35, 40, 45, 60]) * signe(a);
    const c = c10 / 10;
    if (d === 1) {
      const x = a.entier(2, 12) * signe(a);
      return {
        gabarit: 'saisie',
        consigne: `f est la fonction linéaire f(x) = ${affine(c, 0)}. Calcule f(${ecrireRelatif(x)}).`,
        reponse: ecrireRelatif(c * x),
        indice: 'Multiplie x par le coefficient.',
        explication: `f(${ecrireRelatif(x)}) = ${ecrireRelatif(c)} × ${par(x)} = ${ecrireRelatif(c * x)}.`,
      };
    }
    // x0 multiple de 10 ou pair : images entières.
    const x0 = 2 * a.entier(1, 9);
    const y0 = (c10 * x0) / 10;
    const yTexte = dec(y0);
    const cTexte = dec(c);
    if (d === 2) {
      return {
        gabarit: 'qcm',
        consigne: `f est une fonction linéaire et f(${x0}) = ${yTexte}. Quel est son coefficient ?`,
        // Pièges : quotient inversé, soustraction, signe oublié.
        ...choix(a, cTexte, [[decExact(x0 / y0), 'coefficient-inverse'], [decExact(y0 - x0), 'soustrait-au-lieu-de-diviser'], [dec(-c), 'regle-signes']], () => dec(c + a.entier(1, 5))),
        reponse: cTexte,
        indice: 'f(x) = ax : le coefficient a est le quotient f(x) ÷ x.',
        explication: `a = f(${x0}) ÷ ${x0} = ${yTexte} ÷ ${x0} = ${cTexte}.`,
      };
    }
    const x1 = a.entier(2, 15) * signe(a);
    const y1 = (c10 * x1) / 10;
    return {
      gabarit: 'saisie',
      consigne: `f est une fonction linéaire et f(${x0}) = ${yTexte}. Calcule f(${ecrireRelatif(x1)}).`,
      reponse: dec(y1),
      indice: 'Retrouve d’abord le coefficient, puis calcule l’image demandée.',
      explication: `Le coefficient est ${yTexte} ÷ ${x0} = ${cTexte}. f(${ecrireRelatif(x1)}) = ${cTexte} × ${par(x1)} = ${dec(y1)}.`,
    };
  },
});

// ─────────── Fonctions affines

const expression = (k: number, b: number) => `f(x) = ${affine(k, b)}`;

export const affines3e = creerGenerateur({
  id: 'fonctions-affines-3e',
  competence: 'MA-C4-3E-AFF-01',
  cycle: 4,
  description: 'Reconnaitre les coefficients d’une fonction affine et les déterminer à partir de deux points.',
  generer(a, d) {
    const k = a.entier(1, 6) * signe(a);
    const b = a.entier(1, 9) * signe(a);
    if (d === 1) {
      // Écriture parfois inversée : b + kx.
      const inverse = a.suivant() < 0.5;
      const ecrite = inverse ? `${ecrireRelatif(b)} ${k < 0 ? '−' : '+'} ${Math.abs(k) === 1 ? '' : Math.abs(k)}x` : affine(k, b);
      const coef = (p: number, q: number) => `a = ${ecrireRelatif(p)} et b = ${ecrireRelatif(q)}`;
      const reponse = coef(k, b);
      return {
        gabarit: 'qcm',
        consigne: `f(x) = ${ecrite}. Quels sont les coefficients a et b, avec f(x) = ax + b ?`,
        ...choix(a, reponse, [[coef(b, k), 'coefficients-a-b-inverses'], [coef(-k, b), 'regle-signes'], [coef(k, -b), 'regle-signes']], () => coef(k + 1, b)),
        reponse,
        indice: 'a est le nombre qui multiplie x ; b est le nombre seul.',
        explication: `Le nombre qui multiplie x est ${ecrireRelatif(k)}, le nombre seul est ${ecrireRelatif(b)} : ${reponse}.`,
      };
    }
    if (d === 2) {
      const x1 = a.entier(1, 5);
      const y1 = k * x1 + b;
      const reponse = ecrireRelatif(k);
      return {
        gabarit: 'qcm',
        consigne: `La droite qui représente la fonction affine f passe par les points (0 ; ${ecrireRelatif(b)}) et (${x1} ; ${ecrireRelatif(y1)}). Quel est le coefficient a ?`,
        ...choix(a, reponse, [[ecrireRelatif(y1 - b === k ? y1 : y1 - b), 'coefficient-sans-division'], [ecrireRelatif(b), 'ordonnee-origine-pour-coefficient'], [ecrireRelatif(-k), 'regle-signes']], () => ecrireRelatif(k + a.entier(1, 4))),
        reponse,
        indice: 'a = (différence des ordonnées) ÷ (différence des abscisses).',
        explication: `a = (${ecrireRelatif(y1)} − ${ecrireRelatif(b)}) ÷ (${x1} − 0) = ${ecrireRelatif(y1 - b)} ÷ ${x1} = ${reponse}.`.replace(/− (−\d+)/g, '− ($1)'),
      };
    }
    const x1 = a.entier(-4, 2);
    const x2 = x1 + a.entier(1, 4);
    const [y1, y2] = [k * x1 + b, k * x2 + b];
    const reponse = expression(k, b);
    const pieges: [string, string][] = [[expression(k, y1), 'ordonnee-origine-pour-coefficient'], [expression(-k, b), 'regle-signes'], [expression(k, -b), 'regle-signes']];
    return {
      gabarit: 'qcm',
      consigne: `f est une fonction affine telle que f(${ecrireRelatif(x1)}) = ${ecrireRelatif(y1)} et f(${ecrireRelatif(x2)}) = ${ecrireRelatif(y2)}. Quelle est son expression ?`,
      ...choix(a, reponse, pieges, () => expression(k + 1, b)),
      reponse,
      indice: 'Calcule a avec les deux points, puis trouve b en remplaçant x par une valeur connue.',
      explication: `a = (${ecrireRelatif(y2)} − ${par(y1)}) ÷ (${ecrireRelatif(x2)} − ${par(x1)}) = ${ecrireRelatif(y2 - y1)} ÷ ${x2 - x1} = ${ecrireRelatif(k)}. Puis b = ${ecrireRelatif(y1)} − ${par(k)} × ${par(x1)} = ${ecrireRelatif(b)}.`,
    };
  },
});
