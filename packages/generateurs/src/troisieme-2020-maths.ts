// 3e, mathématiques, programme 2020 (BO n°31 du 30 juillet 2020), notions placées en 3e par les repères annuels de
// progression (BO n°22 du 29 mai 2019). Reprises des générateurs au même périmètre ; générateurs propres pour la
// factorisation de a² − b², l'étendue, les expériences à deux épreuves (tableau à double entrée, sans arbre), les
// triangles semblables, les homothéties et les rotations.
import { depuisEntier } from './decimaux';
import { choix, creerGenerateur, erreursDe, frDecimal, reprendre, type Piege } from './outils';
import { coefficientMultiplicateur4e } from './quatrieme-donnees';
import { affines3e, imageAntecedent3e, lineaires3e } from './troisieme-donnees';
import { sections3e, thales3e, trigonometrie3e, volumeBoule3e } from './troisieme-geometrie';
import {
  doubleDistributivite3e, equationCarre3e, irreductible3e, operationsPuissances3e, produitNul3e, puissancesNegatives3e,
} from './troisieme-nombres';

const dec = (n: number, c: number) => frDecimal(depuisEntier(n, c));
/** Décimal signé en dixièmes, avec le signe moins typographique : −25 → « −2,5 ». */
const signe = (n10: number) => (n10 < 0 ? `−${dec(-n10, 1)}` : dec(n10, 1));
const pgcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : pgcd(y, x % y));
/** Fraction irréductible « p/q » (entier si q divise p). */
const fraction = (p: number, q: number) => {
  const g = pgcd(p, q);
  return q / g === 1 ? String(p / g) : `${p / g}/${q / g}`;
};

// ─────────── Reprises : même périmètre qu'au programme 2026 (ou qu'en 4e pour le coefficient multiplicateur)

export const irreductible3e2020 = reprendre(irreductible3e, { id: 'fraction-irreductible-3e-2020', competence: 'MA-C4-3E-FRAC-51' });
export const puissancesNegatives3e2020 = reprendre(puissancesNegatives3e, { id: 'puissances-negatives-3e-2020', competence: 'MA-C4-3E-PUIS-51' });
export const operationsPuissances3e2020 = reprendre(operationsPuissances3e, { id: 'operations-puissances-3e-2020', competence: 'MA-C4-3E-PUIS-52' });
export const doubleDistributivite3e2020 = reprendre(doubleDistributivite3e, { id: 'double-distributivite-3e-2020', competence: 'MA-C4-3E-LIT-51' });
export const produitNul3e2020 = reprendre(produitNul3e, { id: 'equation-produit-nul-3e-2020', competence: 'MA-C4-3E-EQ-51' });
export const equationCarre3e2020 = reprendre(equationCarre3e, { id: 'equation-carre-3e-2020', competence: 'MA-C4-3E-RAC-51' });
export const coefficient3e2020 = reprendre(coefficientMultiplicateur4e, { id: 'coefficient-multiplicateur-3e-2020', competence: 'MA-C4-3E-PCT-51' });
export const imageAntecedent3e2020 = reprendre(imageAntecedent3e, { id: 'image-antecedent-3e-2020', competence: 'MA-C4-3E-FONC-51' });
export const lineaires3e2020 = reprendre(lineaires3e, { id: 'fonctions-lineaires-3e-2020', competence: 'MA-C4-3E-LIN-51' });
export const affines3e2020 = reprendre(affines3e, { id: 'fonctions-affines-3e-2020', competence: 'MA-C4-3E-AFF-51' });
export const volumeBoule3e2020 = reprendre(volumeBoule3e, { id: 'volume-boule-3e-2020', competence: 'MA-C4-3E-BOULE-51' });
export const sections3e2020 = reprendre(sections3e, { id: 'sections-solides-3e-2020', competence: 'MA-C4-3E-SECT-51' });
export const thales3e2020 = reprendre(thales3e, { id: 'thales-3e-2020', competence: 'MA-C4-3E-THAL-51' });
export const trigonometrie3e2020 = reprendre(trigonometrie3e, { id: 'trigonometrie-3e-2020', competence: 'MA-C4-3E-TRIG-51' });

// ─────────── Factoriser a² − b²

/** Monôme : (1, 'x') → « x », (3, 'x') → « 3x ». */
const mono = (k: number) => (k === 1 ? 'x' : `${k}x`);
const solutions = (p: number, q: number) => `x = −${fraction(p, q)} ou x = ${fraction(p, q)}`;

export const differenceCarres3e2020 = creerGenerateur({
  id: 'difference-carres-3e-2020',
  competence: 'MA-C4-3E-LIT-52',
  cycle: 4,
  description: 'Factoriser une expression de la forme a² − b² et l’utiliser pour résoudre une équation produit.',
  generer(a, d) {
    const k = d === 1 ? 1 : a.entier(2, 5);
    let n = a.entier(1, 12);
    while (pgcd(n, k) !== 1) n = a.entier(1, 12);
    const carre = k === 1 ? 'x²' : `${k * k}x²`;
    if (d < 3) {
      const reponse = `(${mono(k)} − ${n})(${mono(k)} + ${n})`;
      return {
        gabarit: 'qcm',
        consigne: `Factorise : ${carre} − ${n * n}`,
        ...choix(a, reponse, [
          [`(${mono(k)} − ${n})²`, 'identite-confondue'], [`(${mono(k)} + ${n})²`, 'identite-confondue'],
          [`(${mono(k)} − ${n * n})(${mono(k)} + ${n * n})`, 'racine-non-extraite'], [k > 1 ? `(${mono(k * k)} − ${n})(${mono(k * k)} + ${n})` : undefined, 'racine-non-extraite'],
        ], () => `(${mono(k)} − ${n + 1})(${mono(k)} + ${n + 1})`),
        reponse,
        indice: 'a² − b² = (a − b)(a + b). Repère a et b en prenant les racines carrées des deux carrés.',
        explication: `${carre} = (${mono(k)})² et ${n * n} = ${n}². Donc ${carre} − ${n * n} = ${reponse}.`,
      };
    }
    const reponse = solutions(n, k);
    return {
      gabarit: 'qcm',
      consigne: `Résous l’équation : ${carre} − ${n * n} = 0`,
      ...choix(a, reponse, [
        [`x = ${fraction(n, k)}`, 'produit-nul-une-solution'], [solutions(n * n, k * k), 'racine-non-extraite'],
        [k > 1 ? solutions(n, 1) : solutions(n * n, 2), k > 1 ? 'produit-nul-coefficient' : 'carre-moitie'],
      ], () => solutions(n + 1, k)),
      reponse,
      indice: 'Factorise avec a² − b² = (a − b)(a + b), puis applique la règle du produit nul.',
      explication: `${carre} − ${n * n} = (${mono(k)} − ${n})(${mono(k)} + ${n}). Un produit est nul si l’un de ses facteurs est nul : ${mono(k)} = ${n} ou ${mono(k)} = −${n}, donc ${reponse}.`,
    };
  },
});

// ─────────── Étendue

const CONTEXTES_ETENDUE: [string, number, number, string][] = [
  ['Températures relevées à midi, en °C', 4, 30, '°C'],
  ['Notes sur 20 obtenues à un contrôle', 3, 20, ''],
  ['Tailles, en cm, des joueurs d’une équipe', 150, 195, 'cm'],
  ['Masses, en kg, de quelques valises', 8, 25, 'kg'],
  ['Durées de trajet, en minutes, de quelques élèves', 5, 50, 'min'],
];

export const etendue3e2020 = creerGenerateur({
  id: 'etendue-3e-2020',
  competence: 'MA-C4-3E-STAT-51',
  cycle: 4,
  description: 'Calculer l’étendue d’une série, comparer la dispersion de deux séries, retrouver une valeur à partir de l’étendue.',
  generer(a, d) {
    const [contexte, min, max] = a.choisir(CONTEXTES_ETENDUE);
    const serie = (n: number) => Array.from({ length: n }, () => a.entier(min, max));
    const etendue = (v: number[]) => Math.max(...v) - Math.min(...v);
    if (d === 1) {
      const v = serie(a.entier(6, 9));
      return {
        gabarit: 'saisie',
        consigne: `${contexte} : ${v.join(' ; ')}. Calcule l’étendue de cette série.`,
        reponse: String(etendue(v)),
        indice: 'Étendue = plus grande valeur − plus petite valeur.',
        explication: `Plus grande valeur : ${Math.max(...v)}. Plus petite : ${Math.min(...v)}. Étendue : ${Math.max(...v)} − ${Math.min(...v)} = ${etendue(v)}.`,
      };
    }
    if (d === 2) {
      const [A, B] = [serie(6), serie(6)];
      const [eA, eB] = [etendue(A), etendue(B)];
      const reponse = eA > eB ? 'la série A' : eA < eB ? 'la série B' : 'les deux séries ont la même étendue';
      const opts = a.melanger(['la série A', 'la série B', 'les deux séries ont la même étendue']);
      // Erreur typique : prendre la plus grande valeur pour l'étendue.
      const [mA, mB] = [Math.max(...A), Math.max(...B)];
      const naif = mA > mB ? 'la série A' : mA < mB ? 'la série B' : 'les deux séries ont la même étendue';
      return {
        gabarit: 'qcm',
        consigne: `${contexte}. Série A : ${A.join(' ; ')}. Série B : ${B.join(' ; ')}. Quelle série est la plus dispersée, au sens de l’étendue ?`,
        options: opts,
        erreurs: erreursDe(opts, reponse, [[naif, 'etendue-maximum']]),
        reponse,
        indice: 'Calcule l’étendue de chaque série : la plus grande étendue indique la série la plus dispersée.',
        explication: `Étendue de A : ${Math.max(...A)} − ${Math.min(...A)} = ${eA}. Étendue de B : ${Math.max(...B)} − ${Math.min(...B)} = ${eB}.`,
      };
    }
    // Valeur manquante : la plus grande (ou la plus petite) de la série.
    const v = serie(5);
    const e = etendue(v) + a.entier(2, 8);
    // La plus petite valeur reste positive ; sinon on cherche la plus grande.
    const plusGrande = a.suivant() < 0.5 || Math.max(...v) - e < 1;
    const x = plusGrande ? Math.min(...v) + e : Math.max(...v) - e;
    const liste = [...v];
    liste.splice(a.entier(0, 5), 0, Number.NaN);
    const texte = liste.map((y) => (Number.isNaN(y) ? 'x' : String(y))).join(' ; ');
    return {
      gabarit: 'saisie',
      consigne: `${contexte} : ${texte}. L’étendue de la série est ${e} et x est la plus ${plusGrande ? 'grande' : 'petite'} valeur. Quelle est la valeur de x ?`,
      reponse: String(x),
      indice: 'Étendue = plus grande valeur − plus petite valeur. Écris cette égalité avec x.',
      explication: plusGrande
        ? `La plus petite valeur est ${Math.min(...v)}. x − ${Math.min(...v)} = ${e}, donc x = ${Math.min(...v)} + ${e} = ${x}.`
        : `La plus grande valeur est ${Math.max(...v)}. ${Math.max(...v)} − x = ${e}, donc x = ${Math.max(...v)} − ${e} = ${x}.`,
    };
  },
});

// ─────────── Expériences à deux épreuves : tableau à double entrée

const estPremier = (n: number) => n > 1 && Array.from({ length: n - 2 }, (_, i) => i + 2).every((k) => n % k !== 0);
/** Évènements sur un nombre : [libellé, test]. */
const EVENEMENTS_NOMBRE = (n: number): [string, (x: number) => boolean][] => [
  ['un nombre pair', (x) => x % 2 === 0], ['un multiple de 3', (x) => x % 3 === 0], ['un nombre premier', estPremier],
  [`un nombre supérieur ou égal à ${Math.ceil(n * 0.6)}`, (x) => x >= Math.ceil(n * 0.6)], ['un multiple de 5', (x) => x % 5 === 0],
];

export const deuxEpreuves3e2020 = creerGenerateur({
  id: 'deux-epreuves-3e-2020',
  competence: 'MA-C4-3E-PROBA-51',
  cycle: 4,
  description: 'Calculer une probabilité par dénombrement, pour une épreuve puis pour deux épreuves (tableau à double entrée).',
  generer(a, d) {
    const qcmFraction = (favorables: number, total: number, consigne: string, explication: string, pieges: Piege[]) => {
      const reponse = fraction(favorables, total);
      return {
        gabarit: 'qcm' as const,
        consigne,
        ...choix(a, reponse, pieges, () => fraction(a.entier(1, total - 1), total), { numerique: true }),
        reponse,
        indice: d === 1 ? 'Compte les issues favorables et le nombre total d’issues, toutes équiprobables.' : 'Dresse un tableau à double entrée de toutes les issues, puis compte les cases favorables.',
        explication,
      };
    };
    if (d === 1) {
      const n = a.choisir([10, 12, 15, 20, 25, 30]);
      const evenements = EVENEMENTS_NOMBRE(n).filter(([, t]) => {
        const k = Array.from({ length: n }, (_, i) => i + 1).filter(t).length;
        return k > 0 && k < n;
      });
      const [libelle, test] = a.choisir(evenements);
      const fav = Array.from({ length: n }, (_, i) => i + 1).filter(test);
      return qcmFraction(fav.length, n,
        `Un sac contient ${n} boules numérotées de 1 à ${n}. On en tire une au hasard. Quelle est la probabilité de tirer ${libelle} ?`,
        `Issues favorables : ${fav.join(', ')}, soit ${fav.length} sur ${n}. Probabilité : ${fav.length}/${n}${pgcd(fav.length, n) > 1 ? ` = ${fraction(fav.length, n)}` : ''}.`,
        [[fraction(n - fav.length, n), 'evenement-contraire'], [fav.length < n - fav.length ? fraction(fav.length, n - fav.length) : undefined, 'probabilite-favorables-sur-autres'], [fraction(1, n)]]);
    }
    if (d === 2) {
      // Pièce et dé, ou deux roues numérotées.
      const roues = a.suivant() < 0.4;
      const [m, n] = roues ? [a.entier(3, 5), a.entier(3, 6)] : [2, a.choisir([4, 6, 8])];
      const experience = roues
        ? `On fait tourner une roue à ${m} secteurs égaux numérotés de 1 à ${m}, puis une seconde roue à ${n} secteurs égaux numérotés de 1 à ${n}.`
        : `On lance une pièce équilibrée, puis un dé équilibré à ${n} faces numérotées de 1 à ${n}.`;
      let libelle: string;
      let test: (x: number, y: number) => boolean;
      if (roues) {
        const s = a.entier(3, m + n - 1);
        [libelle, test] = a.choisir<[string, (x: number, y: number) => boolean]>([
          [`une somme égale à ${s}`, (x, y) => x + y === s], ['deux nombres égaux', (x, y) => x === y], [`une somme supérieure ou égale à ${s}`, (x, y) => x + y >= s],
        ]);
      } else {
        const cote = a.choisir(['pile', 'face']);
        const ix = cote === 'pile' ? 1 : 2;
        const [lib, t] = a.choisir(EVENEMENTS_NOMBRE(n).filter(([l]) => !l.includes('multiple de 5') || n >= 5));
        [libelle, test] = [`${cote} et ${lib}`, (x, y) => x === ix && t(y)];
      }
      let fav = 0;
      for (let x = 1; x <= m; x++) for (let y = 1; y <= n; y++) if (test(x, y)) fav++;
      return qcmFraction(fav, m * n,
        `${experience} Quelle est la probabilité d’obtenir ${libelle} ?`,
        `Le tableau à double entrée compte ${m} × ${n} = ${m * n} issues équiprobables, dont ${fav} favorable${fav > 1 ? 's' : ''}. Probabilité : ${fav}/${m * n}${pgcd(fav, m * n) > 1 ? ` = ${fraction(fav, m * n)}` : ''}.`,
        [[fav < m + n ? fraction(fav, m + n) : undefined, 'probabilites-additionnees'], [fav < m * n - fav ? fraction(fav, m * n - fav) : undefined, 'probabilite-favorables-sur-autres'], [fraction(1, m * n)]]);
    }
    // Deux dés à six faces : somme, produit, double.
    const s = a.entier(3, 11);
    const p = a.choisir([4, 6, 12]);
    const [libelle, test] = a.choisir<[string, (x: number, y: number) => boolean]>([
      [`une somme égale à ${s}`, (x, y) => x + y === s], [`une somme supérieure ou égale à ${s}`, (x, y) => x + y >= s],
      ['un double', (x, y) => x === y], ['un produit pair', (x, y) => (x * y) % 2 === 0], [`un produit égal à ${p}`, (x, y) => x * y === p],
    ]);
    let fav = 0;
    for (let x = 1; x <= 6; x++) for (let y = 1; y <= 6; y++) if (test(x, y)) fav++;
    return qcmFraction(fav, 36,
      `On lance deux dés équilibrés à six faces. Quelle est la probabilité d’obtenir ${libelle} ?`,
      `Le tableau à double entrée compte 36 issues équiprobables, dont ${fav} favorable${fav > 1 ? 's' : ''}. Probabilité : ${fav}/36${pgcd(fav, 36) > 1 ? ` = ${fraction(fav, 36)}` : ''}.`,
      [[fav < 12 ? fraction(fav, 12) : undefined, 'probabilites-additionnees'], [fav < 36 - fav ? fraction(fav, 36 - fav) : undefined, 'probabilite-favorables-sur-autres'], [fraction(36 - fav, 36), 'evenement-contraire']]);
  },
});

// ─────────── Triangles semblables

const SEMBLABLES_OUI = 'Oui, ils sont semblables';
const SEMBLABLES_NON = 'Non, ils ne sont pas semblables';

export const semblables3e2020 = creerGenerateur({
  id: 'triangles-semblables-3e-2020',
  competence: 'MA-C4-3E-SEMB-51',
  cycle: 4,
  description: 'Reconnaitre des triangles semblables par leurs angles ou par la proportionnalité de leurs côtés ; calculer une longueur.',
  generer(a, d) {
    if (d === 1) {
      const x = 5 * a.entier(6, 14);
      const y = 5 * a.entier(6, 14);
      const z = 180 - x - y; // au moins 40°
      const oui = a.suivant() < 0.5;
      const z2 = oui ? z : z + 5 * a.entier(1, 3) * (a.suivant() < 0.5 ? 1 : -1);
      const [p, q] = a.melanger([y, z2]) as [number, number];
      // Les angles de DEF peuvent retomber sur ceux de ABC dans un autre ordre : on compare les ensembles.
      const tri = (t: number[]) => [...t].sort((u, v) => u - v).join(',');
      const reponse = tri([x, y, z]) === tri([p, q, 180 - p - q]) ? SEMBLABLES_OUI : SEMBLABLES_NON;
      const opts = a.melanger([SEMBLABLES_OUI, SEMBLABLES_NON, 'On ne peut pas savoir']);
      return {
        gabarit: 'qcm',
        erreurs: { [reponse === SEMBLABLES_OUI ? SEMBLABLES_NON : SEMBLABLES_OUI]: 'semblables-critere' },
        consigne: `Le triangle ABC a deux angles de ${x}° et ${y}°. Le triangle DEF a deux angles de ${p}° et ${q}°. Ces triangles sont-ils semblables ?`,
        options: opts,
        reponse,
        indice: 'Calcule le troisième angle de chaque triangle : la somme des angles vaut 180°. Deux triangles qui ont les mêmes angles sont semblables.',
        explication: `ABC : ${x}°, ${y}° et ${z}°. DEF : ${p}°, ${q}° et ${180 - p - q}°. ${reponse === SEMBLABLES_OUI ? 'Les trois angles sont égaux deux à deux : les triangles sont semblables.' : 'Les angles ne sont pas les mêmes : les triangles ne sont pas semblables.'}`,
      };
    }
    // Côtés de ABC (entiers), rapport k en dixièmes.
    const cotes = [a.entier(3, 9), a.entier(3, 9), a.entier(3, 9)].sort((u, v) => u - v);
    if (cotes[0]! + cotes[1]! <= cotes[2]!) cotes[2] = cotes[0]! + cotes[1]! - 1;
    const k10 = a.choisir([15, 20, 25, 30, 5]);
    const images = cotes.map((c) => c * k10);
    if (d === 2) {
      if (a.suivant() < 0.5) {
        const j = a.entier(0, 2);
        images[j] = images[j]! + 10;
      }
      // Proportionnalité des côtés rangés dans l'ordre croissant, vérifiée par produits en croix.
      const [tA, tD] = [[...cotes].sort((u, v) => u - v), [...images].sort((u, v) => u - v)];
      const oui = tD.every((v, i) => v * tA[0]! === tD[0]! * tA[i]!);
      const reponse = oui ? SEMBLABLES_OUI : SEMBLABLES_NON;
      const opts = a.melanger([SEMBLABLES_OUI, SEMBLABLES_NON, 'On ne peut pas savoir']);
      return {
        gabarit: 'qcm',
        consigne: `Le triangle ABC a des côtés de ${cotes.join(' cm, ')} cm. Le triangle DEF a des côtés de ${images.map((c) => dec(c, 1)).join(' cm, ')} cm. Ces triangles sont-ils semblables ?`,
        options: opts,
        erreurs: erreursDe(opts, reponse, [[oui ? SEMBLABLES_NON : SEMBLABLES_OUI, 'semblables-critere']]),
        reponse,
        indice: 'Range les côtés dans l’ordre croissant et calcule les quotients des côtés correspondants : ils doivent être égaux.',
        explication: oui
          ? `Chaque côté de DEF vaut ${dec(k10, 1)} fois le côté correspondant de ABC : ${cotes.map((c) => `${c} × ${dec(k10, 1)} = ${dec(c * k10, 1)}`).join(' ; ')}. Les longueurs sont proportionnelles : les triangles sont semblables.`
          : `Les côtés rangés dans l’ordre croissant ne sont pas multipliés par un même nombre : les longueurs ne sont pas proportionnelles, les triangles ne sont pas semblables.`,
      };
    }
    const [ab, bc] = [cotes[0]!, cotes[1]!];
    const [de, ef] = [images[0]!, images[1]!];
    return {
      gabarit: 'saisie',
      consigne: `Les triangles ABC et DEF sont semblables : A correspond à D, B à E et C à F. AB = ${ab} cm, BC = ${bc} cm et DE = ${dec(de, 1)} cm. Calcule EF, en cm.`,
      reponse: depuisEntier(ef, 1),
      indice: 'Les longueurs des côtés correspondants sont proportionnelles : EF/BC = DE/AB.',
      explication: `Le rapport est DE ÷ AB = ${dec(de, 1)} ÷ ${ab} = ${dec(k10, 1)}. EF = BC × ${dec(k10, 1)} = ${bc} × ${dec(k10, 1)} = ${dec(ef, 1)} cm.`,
    };
  },
});

// ─────────── Homothéties et rotations

export const transformations3e2020 = creerGenerateur({
  id: 'homotheties-rotations-3e-2020',
  competence: 'MA-C4-3E-HOM-51',
  cycle: 4,
  description: 'Effet d’une rotation et d’une homothétie (rapport positif ou négatif) sur les longueurs et les aires ; rapport d’une homothétie.',
  generer(a, d) {
    const k10 = a.choisir([5, 15, 20, 25, 30, 40]) * (d >= 2 && a.suivant() < 0.5 ? -1 : 1);
    const k = signe(k10);
    const absK = dec(Math.abs(k10), 1);
    if (d === 1) {
      const l = 2 * a.entier(1, 12);
      if (a.suivant() < 0.35) {
        const angle = a.choisir([30, 45, 60, 90, 120]);
        return {
          gabarit: 'saisie',
          consigne: `Par une rotation d’angle ${angle}°, un segment de ${l} cm a pour image un segment de quelle longueur, en cm ?`,
          reponse: String(l),
          indice: 'Une rotation fait tourner la figure sans la déformer.',
          explication: `Une rotation conserve les longueurs : l’image mesure aussi ${l} cm. L’angle de ${angle}° indique seulement de combien la figure tourne.`,
        };
      }
      return {
        gabarit: 'saisie',
        consigne: `Par une homothétie de rapport ${k}, un segment de ${l} cm a pour image un segment de quelle longueur, en cm ?`,
        reponse: depuisEntier(l * k10, 1),
        indice: 'Une homothétie de rapport k multiplie les longueurs par k (par −k si k est négatif).',
        explication: `${l} × ${k} = ${dec(l * k10, 1)}. L’image mesure ${dec(l * k10, 1)} cm.`,
      };
    }
    if (d === 2) {
      const aire = 4 * a.entier(1, 12);
      const reponse = dec(aire * k10 * k10, 2);
      return {
        gabarit: 'qcm',
        consigne: `Une figure a une aire de ${aire} cm². Quelle est l’aire de son image par une homothétie de rapport ${k}, en cm² ?`,
        ...choix(a, reponse, [
          [dec(aire * Math.abs(k10), 1), 'aire-proportionnelle-longueur'], [k10 < 0 ? `−${reponse}` : undefined, 'rapport-negatif-longueur'],
          [dec(aire * 2 * Math.abs(k10), 1)],
        ], () => String(aire + a.entier(1, 40)), { numerique: k10 > 0 }),
        reponse,
        indice: `Une homothétie de rapport k multiplie les aires par k². Ici k² = ${absK} × ${absK}.`,
        explication: `k² = ${k} × ${k} = ${dec(k10 * k10, 2)}. ${aire} × ${dec(k10 * k10, 2)} = ${reponse} cm².`,
      };
    }
    // Rapport à partir de OA, OA' et de la position.
    const oa = a.entier(2, 8);
    const oa2 = oa * Math.abs(k10);
    const memeCote = k10 > 0;
    const reponse = k;
    // Inverse du rapport, arrondi au centième : piège OA ÷ OA’.
    const inverse = dec(Math.round((1000 * oa) / oa2), 2);
    return {
      gabarit: 'qcm',
      consigne: `A’ est l’image de A par une homothétie de centre O. OA = ${oa} cm, OA’ = ${dec(oa2, 1)} cm, et A’ est ${memeCote ? 'du même côté de O que A' : 'de l’autre côté de O par rapport à A'}. Quel est le rapport de l’homothétie ?`,
      ...choix(a, reponse, [[signe(-k10), 'rapport-signe'], [memeCote ? inverse : `−${inverse}`, 'coefficient-inverse']], () => signe(a.choisir([5, 15, 20, 25, 30, 40]) * (memeCote ? 1 : -1)), { numerique: memeCote }),
      reponse,
      indice: 'La distance à O est multipliée par la valeur absolue du rapport. Le rapport est négatif si A’ est de l’autre côté de O.',
      explication: `OA’ ÷ OA = ${dec(oa2, 1)} ÷ ${oa} = ${absK}. A’ est ${memeCote ? 'du même côté : le rapport est positif' : 'de l’autre côté : le rapport est négatif'}, il vaut ${reponse}.`,
    };
  },
});

export const GENERATEURS_TROISIEME_2020_MATHS = [
  irreductible3e2020, puissancesNegatives3e2020, operationsPuissances3e2020, doubleDistributivite3e2020, differenceCarres3e2020,
  produitNul3e2020, equationCarre3e2020, etendue3e2020, deuxEpreuves3e2020, coefficient3e2020, imageAntecedent3e2020,
  lineaires3e2020, affines3e2020, volumeBoule3e2020, sections3e2020, thales3e2020, trigonometrie3e2020, semblables3e2020,
  transformations3e2020,
];
