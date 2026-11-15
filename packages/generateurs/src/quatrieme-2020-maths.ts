// 4e, mathématiques, programme 2020 (BO n°31 du 30 juillet 2020), notions placées en 4e par les repères annuels de
// progression (BO n°22 du 29 mai 2019). Quand le périmètre est celui d'un générateur du programme 2026, on le reprend
// (`reprendre`) ; sinon, générateur propre : puissances de 10, médiane, probabilités, Thalès (triangles emboîtés),
// cosinus, grandeurs quotients, agrandissement et réduction.
import { depuisEntier } from './decimaux';
import { choix, creerGenerateur, erreursDe, fr, frDecimal, reprendre } from './outils';
import { quatriemeProportionnelle4e } from './quatrieme-donnees';
import { pythagore4e, translations4e, volumesPyramideCone4e } from './quatrieme-geometrie';
import {
  developper4e, diviserFractions4e, equations4e, multiplierFractions4e, produitRelatifs4e, puissances4e, racineCarree4e,
  simplifierFraction4e,
} from './quatrieme-nombres';
import { decomposition3e, notationScientifique3e } from './troisieme-nombres';

const dec = (n: number, c: number) => frDecimal(depuisEntier(n, c));
const SANS_IRREDUCTIBLE = (c: string) =>
  c.replace(/^Écris la fraction (\S+) sous forme irréductible\.$/, 'Simplifie au maximum la fraction $1.')
    .replace('Calcule et donne le résultat sous forme irréductible : ', 'Calcule et simplifie le résultat au maximum : ');

// ─────────── Reprises : même périmètre qu'au programme 2026

export const produitRelatifs4e2020 = reprendre(produitRelatifs4e, { id: 'produit-relatifs-4e-2020', competence: 'MA-C4-4E-REL-51' });
export const simplifierFraction4e2020 = reprendre(simplifierFraction4e, {
  id: 'simplifier-fraction-4e-2020', competence: 'MA-C4-4E-FRAC-51', description: 'Simplifier une fraction au maximum.', consigne: SANS_IRREDUCTIBLE,
});
export const multiplierFractions4e2020 = reprendre(multiplierFractions4e, { id: 'multiplier-fractions-4e-2020', competence: 'MA-C4-4E-FRAC-52', consigne: SANS_IRREDUCTIBLE });
export const diviserFractions4e2020 = reprendre(diviserFractions4e, { id: 'diviser-fractions-4e-2020', competence: 'MA-C4-4E-FRAC-53', consigne: SANS_IRREDUCTIBLE });
export const decomposition4e2020 = reprendre(decomposition3e, { id: 'decomposition-facteurs-premiers-4e-2020', competence: 'MA-C4-4E-DIV-51' });
export const racineCarree4e2020 = reprendre(racineCarree4e, { id: 'racine-carree-4e-2020', competence: 'MA-C4-4E-RAC-51' });
export const puissances4e2020 = reprendre(puissances4e, { id: 'puissances-4e-2020', competence: 'MA-C4-4E-PUIS-52' });
export const notationScientifique4e2020 = reprendre(notationScientifique3e, { id: 'notation-scientifique-4e-2020', competence: 'MA-C4-4E-SCI-51' });
export const developper4e2020 = reprendre(developper4e, { id: 'developper-factoriser-4e-2020', competence: 'MA-C4-4E-LIT-51' });
export const equations4e2020 = reprendre(equations4e, { id: 'equations-4e-2020', competence: 'MA-C4-4E-EQ-51' });
export const proportionnelle4e2020 = reprendre(quatriemeProportionnelle4e, { id: 'quatrieme-proportionnelle-4e-2020', competence: 'MA-C4-4E-PROP-51' });
export const pythagore4e2020 = reprendre(pythagore4e, { id: 'pythagore-4e-2020', competence: 'MA-C4-4E-PYTH-51' });
export const volumes4e2020 = reprendre(volumesPyramideCone4e, { id: 'volumes-pyramide-cone-4e-2020', competence: 'MA-C4-4E-VOL-51' });
export const translations4e2020 = reprendre(translations4e, { id: 'translations-4e-2020', competence: 'MA-C4-4E-TRANS-51' });

// ─────────── Puissances de 10 et préfixes

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
/** Exposant en chiffres supérieurs : −3 → « ⁻³ ». */
const exposant = (n: number) => (n < 0 ? '⁻' : '') + [...String(Math.abs(n))].map((c) => SUP[Number(c)]).join('');
const puissance10 = (n: number) => `10${exposant(n)}`;
/** Écriture décimale de 10ⁿ : 10³ → « 1 000 », 10⁻² → « 0,01 ». */
const decimal10 = (n: number) => (n >= 0 ? fr(10 ** n) : `0,${'0'.repeat(-n - 1)}1`);
const PREFIXES: [string, string, number][] = [
  ['nano', 'n', -9], ['micro', 'µ', -6], ['milli', 'm', -3], ['kilo', 'k', 3], ['méga', 'M', 6], ['giga', 'G', 9],
];
/** [symbole, nom, exposants admis] : pas de mégagramme ni de nano-octet. */
const UNITES: [string, string, number[]][] = [
  ['m', 'mètre', [-9, -6, -3, 3, 6, 9]], ['g', 'gramme', [-9, -6, -3, 3]], ['W', 'watt', [-9, -6, -3, 3, 6, 9]], ['o', 'octet', [3, 6, 9]],
];

export const puissancesDix4e2020 = creerGenerateur({
  id: 'puissances-dix-4e-2020',
  competence: 'MA-C4-4E-PUIS-51',
  cycle: 4,
  description: 'Passer d’une puissance de 10 à son écriture décimale, exposants positifs et négatifs ; préfixes de nano à giga.',
  generer(a, d) {
    if (d < 3) {
      const n = d === 1 ? a.entier(2, 9) : -a.entier(1, 7);
      const versDecimal = a.suivant() < 0.5;
      if (versDecimal) {
        const reponse = decimal10(n);
        const pieges: [string, string?][] = [[decimal10(n > 0 ? n + 1 : n - 1), 'puissance-dix-rang'], [decimal10(n > 0 ? n - 1 : n + 1), 'puissance-dix-rang']];
        if (n < 0) pieges.push([`−${fr(10 ** -n)}`, 'exposant-negatif-signe']);
        else pieges.push([String(10 * n)]);
        return {
          gabarit: 'qcm',
          consigne: `Quelle est l’écriture décimale de ${puissance10(n)} ?`,
          ...choix(a, reponse, pieges, () => decimal10(a.entier(-8, 9)), { numerique: n > 0 }),
          reponse,
          indice: n > 0 ? `10${exposant(n)}, c’est 1 suivi de ${n} zéros.` : `10${exposant(n)} = 1 ÷ 10${exposant(-n)} : le chiffre 1 est à la ${-n === 1 ? '1re' : `${-n}e`} place après la virgule.`,
          explication: n > 0
            ? `${puissance10(n)} = ${Array(n).fill('10').join(' × ')} = ${reponse}.`
            : `${puissance10(n)} = 1 ÷ ${fr(10 ** -n)} = ${reponse}.`,
        };
      }
      const reponse = puissance10(n);
      return {
        gabarit: 'qcm',
        consigne: `Quelle puissance de 10 est égale à ${decimal10(n)} ?`,
        ...choix(a, reponse, [[puissance10(n > 0 ? n + 1 : n - 1), 'puissance-dix-rang'], [puissance10(n > 0 ? n - 1 : n + 1), 'puissance-dix-rang'], [puissance10(-n), n < 0 ? 'exposant-negatif-signe' : undefined]], () => puissance10(a.entier(-9, 9))),
        reponse,
        indice: n > 0 ? 'Compte les zéros qui suivent le chiffre 1.' : 'Repère la place du chiffre 1 dans la partie décimale : l’exposant est l’opposé de ce rang.',
        explication: n > 0 ? `${decimal10(n)} s’écrit avec ${n} zéros : c’est ${reponse}.` : `${decimal10(n)} = 1 ÷ ${fr(10 ** -n)} = ${reponse}.`,
      };
    }
    const [u, unite, admis] = a.choisir(UNITES);
    const [nom, symbole, e] = a.choisir(PREFIXES.filter((p) => admis.includes(p[2])));
    const reponse = puissance10(e);
    return {
      gabarit: 'qcm',
      consigne: `Le préfixe « ${nom} » (symbole ${symbole}) indique une puissance de 10. Complète : 1 ${symbole}${u} = … ${u}`,
      ...choix(a, reponse, [[puissance10(-e), 'exposant-negatif-signe'], [puissance10(e > 0 ? e + 3 : e - 3), 'puissance-dix-rang'], [puissance10(e > 0 ? e - 3 : e + 3), 'puissance-dix-rang']], () => puissance10(a.choisir([-9, -6, -3, 3, 6, 9]))),
      reponse,
      indice: 'Kilo, méga, giga : 10³, 10⁶, 10⁹. Milli, micro, nano : 10⁻³, 10⁻⁶, 10⁻⁹.',
      explication: `${nom[0]!.toUpperCase()}${nom.slice(1)} signifie ${puissance10(e)}, soit ${decimal10(e)} : 1 ${symbole}${u} = ${reponse} ${u}, c’est-à-dire ${decimal10(e)} ${unite}${e > 0 ? 's' : ''}.`,
    };
  },
});

// ─────────── Médiane

const CONTEXTES_SERIE: [string, number, number][] = [
  ['Notes sur 20 obtenues à un contrôle', 4, 20],
  ['Nombres de buts marqués par une équipe à chaque match', 0, 9],
  ['Temps de trajet, en minutes, de quelques élèves', 5, 45],
  ['Nombres de livres lus cette année par des élèves', 1, 25],
  ['Tailles, en cm, de jeunes plants de tomates', 10, 40],
];

export const mediane4e2020 = creerGenerateur({
  id: 'mediane-4e-2020',
  competence: 'MA-C4-4E-STAT-51',
  cycle: 4,
  description: 'Déterminer la médiane d’une série donnée par une liste ou par un tableau d’effectifs.',
  generer(a, d) {
    if (d < 3) {
      const [contexte, min, max] = a.choisir(CONTEXTES_SERIE);
      const n = d === 1 ? a.choisir([5, 7, 9]) : a.choisir([6, 8, 10]);
      const valeurs = Array.from({ length: n }, () => a.entier(min, max));
      const tries = [...valeurs].sort((x, y) => x - y);
      const m10 = n % 2 ? tries[(n - 1) / 2]! * 10 : (tries[n / 2 - 1]! + tries[n / 2]!) * 5;
      return {
        gabarit: 'saisie',
        consigne: `${contexte} : ${valeurs.join(' ; ')}. Détermine la médiane de cette série.`,
        reponse: depuisEntier(m10, 1),
        indice: 'Range les valeurs dans l’ordre croissant. La médiane partage la série en deux groupes de même effectif.',
        explication: n % 2
          ? `Rangées : ${tries.join(' ; ')}. Il y a ${n} valeurs : la médiane est la ${(n + 1) / 2}e, soit ${dec(m10, 1)}.`
          : `Rangées : ${tries.join(' ; ')}. Il y a ${n} valeurs : la médiane est entre la ${n / 2}e et la ${n / 2 + 1}e, soit (${tries[n / 2 - 1]} + ${tries[n / 2]}) ÷ 2 = ${dec(m10, 1)}.`,
      };
    }
    // Tableau d'effectifs : pointures consécutives.
    const debut = a.entier(35, 40);
    const effectifs = [0, 1, 2, 3].map(() => a.entier(1, 7));
    const pointures = effectifs.map((_, i) => debut + i);
    const serie = pointures.flatMap((p, i) => Array(effectifs[i]!).fill(p) as number[]);
    const n = serie.length;
    const m10 = n % 2 ? serie[(n - 1) / 2]! * 10 : (serie[n / 2 - 1]! + serie[n / 2]!) * 5;
    const premier = `${effectifs[0]} élève${effectifs[0]! > 1 ? 's chaussent' : ' chausse'} du ${pointures[0]}`;
    const suite = pointures.slice(1).map((p, i) => `${effectifs[i + 1]} du ${p}`);
    const texte = `${[premier, ...suite.slice(0, -1)].join(', ')} et ${suite.at(-1)}`;
    return {
      gabarit: 'saisie',
      consigne: `Pointures des élèves d’un club : ${texte}. Détermine la médiane des pointures.`,
      reponse: depuisEntier(m10, 1),
      indice: 'Calcule l’effectif total, puis repère le rang de la valeur du milieu en cumulant les effectifs.',
      explication: n % 2
        ? `Effectif total : ${n}. La médiane est la ${(n + 1) / 2}e valeur de la série rangée : ${dec(m10, 1)}.`
        : `Effectif total : ${n}. La médiane est entre la ${n / 2}e valeur (${serie[n / 2 - 1]}) et la ${n / 2 + 1}e (${serie[n / 2]}) : ${dec(m10, 1)}.`,
    };
  },
});

// ─────────── Probabilités : évènement contraire, situations non équiprobables

const EVENEMENTS: [string, string][] = [
  ['qu’il pleuve demain', 'qu’il ne pleuve pas'],
  ['que le bus soit en retard', 'qu’il ne soit pas en retard'],
  ['qu’une ampoule tombe en panne avant un an', 'qu’elle ne tombe pas en panne avant un an'],
  ['de gagner à un jeu de grattage', 'de ne pas gagner'],
  ['qu’une joueuse réussisse son lancer franc', 'qu’elle le rate'],
  ['qu’une graine germe', 'qu’elle ne germe pas'],
];
const COULEURS_ROUE = ['rouge', 'bleu', 'vert', 'jaune'];

export const probabilites4e2020 = creerGenerateur({
  id: 'probabilites-4e-2020',
  competence: 'MA-C4-4E-PROBA-51',
  cycle: 4,
  description: 'Probabilité de l’évènement contraire ; situations simples non équiprobables (dé truqué, roue).',
  generer(a, d) {
    if (d === 1) {
      const [ev, contraire] = a.choisir(EVENEMENTS);
      const k = 5 * a.entier(1, 19);
      return {
        gabarit: 'saisie',
        consigne: `La probabilité ${ev} est ${dec(k, 2)}. Quelle est la probabilité ${contraire} ?`,
        reponse: depuisEntier(100 - k, 2),
        indice: 'Un évènement et son contraire ont des probabilités dont la somme vaut 1.',
        explication: `1 − ${dec(k, 2)} = ${dec(100 - k, 2)}.`,
      };
    }
    if (d === 2) {
      const de = a.suivant() < 0.5;
      const nb = de ? 6 : 4;
      // Probabilités en centièmes, multiples de 5, la dernière au moins 0,05.
      let p: number[];
      do p = Array.from({ length: nb - 1 }, () => 5 * a.entier(1, de ? 5 : 8)); while (p.reduce((x, y) => x + y, 0) > 95);
      const reste = 100 - p.reduce((x, y) => x + y, 0);
      const consigne = de
        ? `Un dé à six faces est truqué. Les probabilités d’obtenir 1, 2, 3, 4 et 5 sont ${p.map((x) => dec(x, 2)).join(' ; ')}. Quelle est la probabilité d’obtenir 6 ?`
        : `Une roue a quatre secteurs de tailles différentes. Les probabilités de tomber sur le ${COULEURS_ROUE[0]}, le ${COULEURS_ROUE[1]} et le ${COULEURS_ROUE[2]} sont respectivement ${p.map((x) => dec(x, 2)).join(' ; ')}. Quelle est la probabilité de tomber sur le ${COULEURS_ROUE[3]} ?`;
      return {
        gabarit: 'saisie',
        consigne,
        reponse: depuisEntier(reste, 2),
        indice: 'La somme des probabilités de toutes les issues vaut 1.',
        explication: `${p.map((x) => dec(x, 2)).join(' + ')} = ${dec(100 - reste, 2)}, donc la probabilité cherchée vaut 1 − ${dec(100 - reste, 2)} = ${dec(reste, 2)}.`,
      };
    }
    let r: number, b: number, v: number;
    do [r, b, v] = [a.entier(1, 9), a.entier(1, 9), a.entier(1, 9)]; while (r === b + v);
    const n = r + b + v;
    const reponse = `${b + v}/${n}`;
    return {
      gabarit: 'qcm',
      consigne: `Un sac contient ${r} boule${r > 1 ? 's rouges' : ' rouge'}, ${b} bleue${b > 1 ? 's' : ''} et ${v} verte${v > 1 ? 's' : ''}. On tire une boule au hasard. Quelle est la probabilité de ne pas tirer une boule rouge ?`,
      ...choix(a, reponse, [[`${r}/${n}`, 'evenement-contraire'], [`${b + v}/${r}`, b + v < r ? 'probabilite-favorables-sur-autres' : 'probabilite-superieure-a-1'], [`1/${n}`]], () => `${a.entier(1, n - 1)}/${n}`, { numerique: true }),
      reponse,
      indice: 'Ne pas tirer une boule rouge, c’est tirer une bleue ou une verte.',
      explication: `Il y a ${n} boules, dont ${b + v} ne sont pas rouges : la probabilité vaut ${reponse}. On peut aussi calculer 1 − ${r}/${n}.`,
    };
  },
});

// ─────────── Théorème de Thalès dans les triangles emboîtés

const LETTRES = 'ABCDEFGHIJKLMNPRSTUV';
const RAPPORTS: [number, number][] = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [4, 5]];
const THALES_OUI = 'Oui, d’après la réciproque du théorème de Thalès';
const THALES_NON = 'Non, car les quotients ne sont pas égaux';
const CONTEXTE_EMBOITES = 'Dans le triangle ABC, M est sur [AB], N est sur [AC] et (MN) // (BC).';

export const thales4e2020 = creerGenerateur({
  id: 'thales-emboites-4e-2020',
  competence: 'MA-C4-4E-THAL-51',
  cycle: 4,
  description: 'Théorème de Thalès et sa réciproque dans la configuration des triangles emboîtés.',
  generer(a, d) {
    const [p, q] = a.choisir(RAPPORTS);
    const u = a.entier(1, 4);
    const v = a.entier(1, 5);
    const w = a.entier(1, 5);
    // AM/AB = AN/AC = MN/BC = p/q.
    const [am, ab, an, ac, mn, bc] = [p * u, q * u, p * w, q * w, p * v, q * v];
    if (d === 1) {
      return {
        gabarit: 'saisie',
        consigne: `${CONTEXTE_EMBOITES} AM = ${am} cm, AB = ${ab} cm et BC = ${bc} cm. Calcule MN, en cm.`,
        reponse: String(mn),
        indice: 'D’après le théorème de Thalès : AM/AB = AN/AC = MN/BC.',
        explication: `AM/AB = MN/BC, donc MN = BC × AM ÷ AB = ${bc} × ${am} ÷ ${ab} = ${mn}. MN mesure ${mn} cm.`,
      };
    }
    if (d === 2) {
      const chercheAC = a.suivant() < 0.5;
      return chercheAC
        ? {
          gabarit: 'saisie',
          consigne: `${CONTEXTE_EMBOITES} AN = ${an} cm, MN = ${mn} cm et BC = ${bc} cm. Calcule AC, en cm.`,
          reponse: String(ac),
          indice: 'Choisis les deux quotients égaux qui contiennent trois longueurs connues : AN/AC et MN/BC.',
          explication: `AN/AC = MN/BC, donc AC = AN × BC ÷ MN = ${an} × ${bc} ÷ ${mn} = ${ac}. AC mesure ${ac} cm.`,
        }
        : {
          gabarit: 'saisie',
          consigne: `${CONTEXTE_EMBOITES} AB = ${ab} cm, MN = ${mn} cm et BC = ${bc} cm. Calcule AM, en cm.`,
          reponse: String(am),
          indice: 'Choisis les deux quotients égaux qui contiennent trois longueurs connues : AM/AB et MN/BC.',
          explication: `AM/AB = MN/BC, donc AM = AB × MN ÷ BC = ${ab} × ${mn} ÷ ${bc} = ${am}. AM mesure ${am} cm.`,
        };
    }
    const paralleles = a.suivant() < 0.5;
    const an2 = an + (paralleles ? 0 : 1);
    const reponse = paralleles ? THALES_OUI : THALES_NON;
    const opts = a.melanger([THALES_OUI, THALES_NON, 'Oui, d’après le théorème de Thalès', 'On ne peut pas conclure']);
    return {
      gabarit: 'qcm',
      consigne: `Les points A, M, B sont alignés dans cet ordre, ainsi que A, N, C. AM = ${am} cm, AB = ${ab} cm, AN = ${an2} cm et AC = ${ac} cm. Les droites (MN) et (BC) sont-elles parallèles ?`,
      options: opts,
      erreurs: erreursDe(opts, reponse, [[THALES_OUI, 'quotients-mal-compares'], [THALES_NON, 'quotients-mal-compares'], ['Oui, d’après le théorème de Thalès', 'thales-reciproque-confondus']]),
      reponse,
      indice: 'Compare les quotients AM/AB et AN/AC. Le théorème sert à calculer, sa réciproque à prouver un parallélisme.',
      explication: `AM/AB = ${am}/${ab} et AN/AC = ${an2}/${ac}. ${paralleles ? `Les deux quotients valent ${p}/${q} et les points sont alignés dans le même ordre : les droites sont parallèles.` : 'Les produits en croix diffèrent, donc les quotients ne sont pas égaux : les droites ne sont pas parallèles.'}`,
    };
  },
});

// ─────────── Cosinus d'un angle aigu dans un triangle rectangle

export const cosinus4e2020 = creerGenerateur({
  id: 'cosinus-4e-2020',
  competence: 'MA-C4-4E-COS-51',
  cycle: 4,
  description: 'Utiliser le cosinus d’un angle aigu d’un triangle rectangle pour calculer une longueur.',
  generer(a, d) {
    const [r, x, y] = a.melanger([...LETTRES]).slice(0, 3);
    // Rectangle en r, angle aigu en x : adjacent [rx], opposé [ry], hypoténuse [xy].
    const seg = (s: string, t: string) => [s, t].sort().join('');
    const [adj, opp, hyp] = [seg(r!, x!), seg(r!, y!), seg(x!, y!)];
    const triangle = [r, x, y].sort().join('');
    const angle = `${y}${x}̂${r}`;
    const contexte = `Le triangle ${triangle} est rectangle en ${r}.`;
    if (d === 1) {
      const reponse = `${adj}/${hyp}`;
      return {
        gabarit: 'qcm',
        consigne: `${contexte} Quelle égalité donne cos(${angle}) ?`,
        ...choix(a, reponse, [[`${hyp}/${adj}`, 'trigo-rapport-inverse'], [`${opp}/${hyp}`, 'trigo-rapport-confondu'], [`${opp}/${adj}`, 'trigo-rapport-confondu']], () => `${adj}/${opp}`),
        reponse,
        indice: 'Cosinus d’un angle aigu = côté adjacent ÷ hypoténuse.',
        explication: `L’hypoténuse est [${hyp}], le côté opposé à l’angle droit. Le côté adjacent à l’angle ${angle} est [${adj}]. Donc cos(${angle}) = ${reponse}.`,
      };
    }
    const valeur = a.choisir([2, 4, 5, 6, 8]);
    const v = dec(valeur, 1);
    if (d === 2) {
      const h = a.entier(5, 20);
      const reponse = depuisEntier(h * valeur, 1);
      return {
        gabarit: 'saisie',
        consigne: `${contexte} ${hyp} = ${h} cm et cos(${angle}) = ${v}. Calcule ${adj}, en cm.`,
        reponse,
        indice: `cos(${angle}) = ${adj}/${hyp}. Multiplie l’hypoténuse par le cosinus.`,
        explication: `cos(${angle}) = ${adj}/${hyp}, donc ${adj} = ${hyp} × cos(${angle}) = ${h} × ${v} = ${dec(h * valeur, 1)} cm.`,
      };
    }
    const h = 5 * a.entier(1, 6);
    const cote = depuisEntier(h * valeur, 1);
    return {
      gabarit: 'saisie',
      consigne: `${contexte} ${adj} = ${frDecimal(cote)} cm et cos(${angle}) = ${v}. Calcule l’hypoténuse ${hyp}, en cm.`,
      reponse: String(h),
      indice: `cos(${angle}) = ${adj}/${hyp} : l’hypoténuse est au dénominateur.`,
      explication: `cos(${angle}) = ${adj}/${hyp}, donc ${hyp} = ${adj} ÷ cos(${angle}) = ${frDecimal(cote)} ÷ ${v} = ${h} cm.`,
    };
  },
});

// ─────────── Grandeurs quotients : vitesse, débit

const MOBILES: [string, number[]][] = [
  ['Un cycliste roule', [12, 14, 16, 18, 20, 22, 24]],
  ['Une coureuse court', [8, 9, 10, 11, 12, 14]],
  ['Une voiture roule', [50, 60, 70, 80, 90, 110, 130]],
  ['Un train roule', [120, 140, 160, 180, 200, 240, 300]],
];
const DUREES: [number, string][] = [[1, '30 min'], [2, '1 h'], [3, '1 h 30 min'], [4, '2 h'], [5, '2 h 30 min'], [6, '3 h']];

export const grandeursQuotients4e2020 = creerGenerateur({
  id: 'grandeurs-quotients-4e-2020',
  competence: 'MA-C4-4E-GRAN-51',
  cycle: 4,
  description: 'Vitesse moyenne, distance, durée ; conversion de km/h en m/s ; débit.',
  generer(a, d) {
    const [mobile, vitesses] = a.choisir(MOBILES);
    const vitesse = a.choisir(vitesses);
    const [demi, duree] = a.choisir(DUREES);
    const distance10 = vitesse * demi * 5; // en dixièmes de km
    if (d === 1) {
      return {
        gabarit: 'saisie',
        consigne: `${mobile} à la vitesse moyenne de ${vitesse} km/h pendant ${duree}. Quelle distance parcourt-${mobile.startsWith('Une') ? 'elle' : 'il'}, en km ?`,
        reponse: depuisEntier(distance10, 1),
        indice: 'Distance = vitesse × durée, avec la durée en heures.',
        explication: `${duree} = ${dec(demi * 5, 1)} h. ${vitesse} × ${dec(demi * 5, 1)} = ${dec(distance10, 1)} km.`,
      };
    }
    if (d === 2) {
      const consigne = `${mobile} et parcourt ${dec(distance10, 1)} km en ${duree}. Quelle est sa vitesse moyenne, en km/h ?`;
      return {
        gabarit: 'saisie',
        consigne,
        reponse: String(vitesse),
        indice: 'Vitesse moyenne = distance ÷ durée, avec la durée en heures.',
        explication: `${duree} = ${dec(demi * 5, 1)} h. ${dec(distance10, 1)} ÷ ${dec(demi * 5, 1)} = ${vitesse} km/h.`,
      };
    }
    const cas = a.entier(0, 2);
    if (cas === 0) {
      const k = a.entier(1, 8);
      return {
        gabarit: 'saisie',
        consigne: `Convertis ${18 * k} km/h en m/s.`,
        reponse: String(5 * k),
        indice: '1 km = 1 000 m et 1 h = 3 600 s.',
        explication: `${18 * k} km/h = ${fr(18000 * k)} m en 3 600 s. ${fr(18000 * k)} ÷ 3 600 = ${5 * k} m/s.`,
      };
    }
    if (cas === 1) {
      const ms = a.entier(2, 30);
      return {
        gabarit: 'saisie',
        consigne: `Un objet se déplace à ${ms} m/s. Quelle est sa vitesse en km/h ?`,
        reponse: depuisEntier(ms * 36, 1),
        indice: 'En 1 h, soit 3 600 s, il parcourt 3 600 fois plus de mètres qu’en 1 s.',
        explication: `${ms} × 3 600 = ${fr(ms * 3600)} m en 1 h, soit ${dec(ms * 36, 1)} km/h.`,
      };
    }
    const debit = a.choisir([6, 8, 10, 12, 15, 20, 25]);
    const minutes = a.entier(3, 20);
    return {
      gabarit: 'saisie',
      consigne: `Un robinet a un débit de ${debit} L par minute. Il remplit une cuve de ${debit * minutes} L. Combien de minutes faut-il ?`,
      reponse: String(minutes),
      indice: 'Durée = volume ÷ débit.',
      explication: `${debit * minutes} ÷ ${debit} = ${minutes}. Il faut ${minutes} minutes.`,
    };
  },
});

// ─────────── Agrandissement et réduction

const RAPPORTS_K: [number, string][] = [[5, '0,5'], [15, '1,5'], [20, '2'], [25, '2,5'], [30, '3'], [40, '4']];
const FIGURES_AIRE = ['Un rectangle', 'Un triangle', 'Un disque', 'Un terrain'];
const SOLIDES = ['Un pavé droit', 'Une pyramide', 'Un cône', 'Une maquette de maison'];

export const agrandissement4e2020 = creerGenerateur({
  id: 'agrandissement-4e-2020',
  competence: 'MA-C4-4E-AGR-51',
  cycle: 4,
  description: 'Effet d’un agrandissement ou d’une réduction de rapport k sur les longueurs (× k), les aires (× k²) et les volumes (× k³).',
  generer(a, d) {
    const [k10, k] = a.choisir(RAPPORTS_K);
    const nature = k10 < 10 ? 'réduction' : 'agrandissement';
    if (d === 1) {
      const l = 2 * a.entier(1, 12);
      return {
        gabarit: 'saisie',
        consigne: `On fait un${nature === 'réduction' ? 'e' : ''} ${nature} de rapport ${k} d’un triangle. Un côté mesure ${l} cm. Combien mesure le côté correspondant, en cm ?`,
        reponse: depuisEntier(l * k10, 1),
        indice: 'Toutes les longueurs sont multipliées par le rapport k.',
        explication: `${l} × ${k} = ${dec(l * k10, 1)} cm.`,
      };
    }
    if (d === 2) {
      const aire = 4 * a.entier(1, 15);
      const fois = (n: number, e: number) => depuisEntier(n * k10 ** e, e);
      const reponse = frDecimal(fois(aire, 2));
      const figure = a.choisir(FIGURES_AIRE);
      return {
        gabarit: 'qcm',
        consigne: `${figure} a une aire de ${aire} cm². On en fait un${nature === 'réduction' ? 'e' : ''} ${nature} de rapport ${k}. Quelle est l’aire obtenue, en cm² ?`,
        ...choix(a, reponse, [[frDecimal(fois(aire, 1)), 'aire-proportionnelle-longueur'], [frDecimal(fois(aire, 3)), 'aire-cube-au-lieu-carre'], [frDecimal(depuisEntier(aire * k10 * 2, 1))]], () => fr(aire + a.entier(1, 30)), { numerique: true }),
        reponse,
        indice: 'Dans un agrandissement ou une réduction de rapport k, les aires sont multipliées par k².',
        explication: `k² = ${k} × ${k} = ${dec(k10 * k10, 2)}. ${aire} × ${dec(k10 * k10, 2)} = ${reponse} cm².`,
      };
    }
    const volume = 8 * a.entier(1, 12);
    const fois = (n: number, e: number) => depuisEntier(n * k10 ** e, e);
    const reponse = frDecimal(fois(volume, 3));
    const solide = a.choisir(SOLIDES);
    return {
      gabarit: 'qcm',
      consigne: `${solide} a un volume de ${volume} cm³. On en fait un${nature === 'réduction' ? 'e' : ''} ${nature} de rapport ${k}. Quel est le volume obtenu, en cm³ ?`,
      ...choix(a, reponse, [[frDecimal(fois(volume, 1)), 'volume-proportionnel-longueur'], [frDecimal(fois(volume, 2)), 'volume-carre-au-lieu-cube'], [frDecimal(depuisEntier(volume * k10 * 3, 1)), 'cube-triple']], () => fr(volume + a.entier(1, 50)), { numerique: true }),
      reponse,
      indice: 'Dans un agrandissement ou une réduction de rapport k, les volumes sont multipliés par k³.',
      explication: `k³ = ${k} × ${k} × ${k} = ${dec(k10 ** 3, 3)}. ${volume} × ${dec(k10 ** 3, 3)} = ${reponse} cm³.`,
    };
  },
});

export const GENERATEURS_QUATRIEME_2020_MATHS = [
  produitRelatifs4e2020, simplifierFraction4e2020, multiplierFractions4e2020, diviserFractions4e2020, decomposition4e2020,
  racineCarree4e2020, puissancesDix4e2020, puissances4e2020, notationScientifique4e2020, developper4e2020, equations4e2020,
  mediane4e2020, probabilites4e2020, proportionnelle4e2020, thales4e2020, pythagore4e2020, cosinus4e2020, volumes4e2020,
  grandeursQuotients4e2020, agrandissement4e2020, translations4e2020,
];
