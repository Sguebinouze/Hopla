// CM2, nombres entiers et décimaux. Source : programme de mathématiques du cycle 3 (BO n°16 du 17 avril 2025).
// Au CM2 : entiers jusqu'à 999 999 999, décimaux jusqu'aux millièmes, arrondi à l'unité seulement.
import { comparerDecimaux, decaler, depuisEntier, normaliserDecimal } from './decimaux';
import { enLettres } from './lettres';
import { choix, creerGenerateur, erreurLongueurDecimale, fr, frDecimal, optionsNumeriques, qte, type Aleatoire } from './outils';

/** Un grand nombre « lisible » : quelques classes non nulles, des zéros intercalés. */
function grandNombre(a: Aleatoire, chiffresMax: number): number {
  const classes = [a.entier(1, chiffresMax <= 7 ? 9 : 999), a.entier(0, 999), a.entier(0, 999)];
  // Des zéros pour exercer la lecture (deux-millions-trois-cent-mille).
  if (a.suivant() < 0.4) classes[1] = a.entier(0, 9) * 100;
  if (a.suivant() < 0.4) classes[2] = a.choisir([0, a.entier(1, 9) * 100, a.entier(1, 99)]);
  return classes[0]! * 1e6 + classes[1]! * 1e3 + classes[2]!;
}

// ─────────── Grands nombres en lettres

export const nombresLettresCm2 = creerGenerateur({
  id: 'nombres-lettres-cm2',
  competence: 'MA-C3-CM2-ENT-01',
  cycle: 3,
  description: 'Écrire en chiffres ou en lettres des nombres entiers jusqu’à 999 999 999.',
  generer(a, d) {
    const n = grandNombre(a, d === 1 ? 7 : 9);
    if (d !== 3) {
      return {
        gabarit: 'saisie',
        consigne: `Écris en chiffres : ${enLettres(n)}.`,
        reponse: String(n),
        indice: 'Repère les mots « million » et « mille » : ils séparent les classes.',
        explication: `Classe des millions : ${Math.floor(n / 1e6)}. Classe des milliers : ${Math.floor(n / 1e3) % 1000}. Classe des unités : ${n % 1000}. Le nombre s’écrit ${fr(n)}.`,
      };
    }
    // Pièges : un chiffre déplacé dans une autre classe, ou l'accord oublié de « cent » et « vingt ».
    const millions = Math.floor(n / 1e6);
    const candidats: [string, string?][] = [
      [millions > 0 ? enLettres((n % 1e6) + Math.floor(millions / 10) * 1e6 + (millions % 10) * 1e5) : '', 'classes-nombre'],
      [enLettres(n + 1e6)],
      [enLettres(Math.floor(n / 10)), 'classes-nombre'],
    ];
    const pieges = candidats.filter((p) => Boolean(p[0]));
    const sansS = enLettres(n).replace(/(cent|vingt)s(?=-millions?|$)/, '$1');
    if (sansS !== enLettres(n)) pieges.unshift([sansS, 'accord-cent-vingt']);
    return {
      gabarit: 'qcm',
      consigne: `Comment s’écrit ${fr(n)} en lettres ?`,
      ...choix(a, enLettres(n), pieges, () => enLettres(n + a.entier(1, 9) * 1000)),
      reponse: enLettres(n),
      indice: 'Lis le nombre classe par classe : millions, milliers, puis unités.',
      explication: `${fr(n)} se lit classe par classe. On écrit : ${enLettres(n)}. « Mille » est invariable, « million » prend un s au pluriel.`,
    };
  },
});

// ─────────── Valeur des chiffres, unités de numération

const RANGS = [
  { nom: 'unités', valeur: 1 }, { nom: 'dizaines', valeur: 10 }, { nom: 'centaines', valeur: 100 },
  { nom: 'milliers', valeur: 1e3 }, { nom: 'dizaines de milliers', valeur: 1e4 }, { nom: 'centaines de milliers', valeur: 1e5 },
  { nom: 'millions', valeur: 1e6 }, { nom: 'dizaines de millions', valeur: 1e7 }, { nom: 'centaines de millions', valeur: 1e8 },
];

export const valeurChiffresCm2 = creerGenerateur({
  id: 'valeur-chiffres-cm2',
  competence: 'MA-C3-CM2-ENT-02',
  cycle: 3,
  description: 'Chiffre d’un rang, nombre d’unités d’un rang, décomposition en unités de numération.',
  generer(a, d) {
    if (d === 1) {
      const n = a.entier(10_000_000, 999_999_999);
      const i = a.entier(3, 8);
      const rang = RANGS[i]!;
      const chiffre = Math.floor(n / rang.valeur) % 10;
      return {
        gabarit: 'saisie',
        consigne: `Quel est le chiffre des ${rang.nom} dans ${fr(n)} ?`,
        reponse: String(chiffre),
        indice: 'Sépare le nombre en classes : millions, milliers, unités.',
        explication: `Dans ${fr(n)}, le chiffre des ${rang.nom} est ${chiffre}. Il vaut ${fr(chiffre * rang.valeur)}.`,
      };
    }
    if (d === 2) {
      const n = a.entier(1_000_000, 99_999_999);
      const rang = RANGS[a.choisir([2, 3, 4, 6])]!;
      const nombre = Math.floor(n / rang.valeur);
      return {
        gabarit: 'saisie',
        consigne: `Combien y a-t-il de ${rang.nom} en tout dans ${fr(n)} ?`,
        reponse: String(nombre),
        indice: `Cache les chiffres situés à droite du chiffre des ${rang.nom}.`,
        explication: `On cherche combien de fois ${fr(rang.valeur)} il y a dans ${fr(n)}. On garde les chiffres jusqu’au rang des ${rang.nom} : ${fr(nombre)}.`,
      };
    }
    // Décomposition : trois morceaux dans des classes différentes, parfois au-delà de 9 (25 milliers).
    const millions = a.entier(1, 999);
    const milliers = a.entier(1, 99);
    const unites = a.entier(1, 999);
    const n = millions * 1e6 + milliers * 1e3 + unites;
    return {
      gabarit: 'saisie',
      consigne: `Écris en chiffres le nombre formé de ${qte(millions, 'million')}, ${qte(milliers, 'millier')} et ${qte(unites, 'unité')}.`,
      reponse: String(n),
      indice: 'Écris chaque classe avec trois chiffres. Complète avec des zéros si besoin.',
      explication: `${qte(millions, 'million')} = ${fr(millions * 1e6)}. ${qte(milliers, 'millier')} = ${fr(milliers * 1e3)}. On ajoute ${fr(unites)} : ${fr(n)}.`,
    };
  },
});

// ─────────── Comparer, ranger, encadrer

export const comparerEntiersCm2 = creerGenerateur({
  id: 'comparer-entiers-cm2',
  competence: 'MA-C3-CM2-ENT-03',
  cycle: 3,
  description: 'Comparer, ranger et encadrer des nombres entiers jusqu’à 999 999 999.',
  generer(a, d) {
    if (d === 1) {
      let x = a.entier(1_000_000, 999_999_999);
      const s = String(x).split('');
      // Deux chiffres échangés, ou un nombre de chiffres différent.
      const forme = a.entier(0, 3);
      let y: number;
      if (forme === 0) y = Math.floor(x / 10);
      else if (forme === 3) y = x;
      else {
        const i = a.entier(1, s.length - 2);
        [s[i], s[i + 1]] = [s[i + 1]!, s[i]!];
        y = Number(s.join(''));
      }
      if (a.suivant() < 0.5) [x, y] = [y, x];
      const signe = x < y ? '<' : x > y ? '>' : '=';
      return {
        gabarit: 'qcm',
        consigne: `Complète avec <, > ou = : ${fr(x)} … ${fr(y)}`,
        options: ['<', '>', '='],
        reponse: signe,
        indice: 'Compte d’abord les chiffres. Compare ensuite rang par rang, en partant de la gauche.',
        explication:
          signe === '='
            ? `Les deux nombres ont les mêmes chiffres aux mêmes rangs : ${fr(x)} = ${fr(y)}.`
            : `${String(x).length === String(y).length ? 'Les deux nombres ont autant de chiffres. On compare rang par rang, depuis la gauche.' : 'Le nombre qui a le plus de chiffres est le plus grand.'} ${fr(x)} ${signe} ${fr(y)}.`,
      };
    }
    if (d === 2) {
      // Quatre nombres formés des mêmes chiffres : il faut comparer rang par rang.
      const base = String(a.entier(10_000_000, 99_999_999)).split('');
      const valeurs = new Set<number>();
      for (let k = 0; valeurs.size < 4 && k < 100; k++) {
        const s = [...base];
        const i = a.entier(0, s.length - 2);
        const j = a.entier(i + 1, s.length - 1);
        [s[i], s[j]] = [s[j]!, s[i]!];
        if (s[0] !== '0') valeurs.add(Number(s.join('')));
      }
      while (valeurs.size < 4) valeurs.add(Number(base.join('')) + valeurs.size * 1000);
      const liste = [...valeurs];
      const tri = [...liste].sort((p, q) => p - q);
      const grand = a.suivant() < 0.5;
      const cible = grand ? tri[3]! : tri[0]!;
      return {
        gabarit: 'qcm',
        consigne: `Quel est le plus ${grand ? 'grand' : 'petit'} de ces nombres ?`,
        options: a.melanger(liste.map(fr)),
        reponse: fr(cible),
        indice: 'Ces nombres ont autant de chiffres. Compare-les rang par rang, depuis la gauche.',
        explication: `Rangés dans l’ordre croissant : ${tri.map(fr).join(' < ')}.`,
      };
    }
    let n = a.entier(1_000_000, 999_999_999);
    if (n % 1e6 === 0) n += a.entier(1, 999) * 1000;
    const bas = Math.floor(n / 1e6) * 1e6;
    return {
      gabarit: 'saisie',
      consigne: `Complète l’encadrement au million près : … < ${fr(n)} < ${fr(bas + 1e6)}`,
      reponse: String(bas),
      indice: 'Garde les chiffres des millions et remplace les autres par des zéros.',
      explication: `${fr(n)} contient ${fr(bas / 1e6)} million${bas / 1e6 > 1 ? 's' : ''} et un peu plus. Il est compris entre ${fr(bas)} et ${fr(bas + 1e6)}.`,
    };
  },
});

// ─────────── Diviseurs et multiples

const diviseursDe = (n: number) => Array.from({ length: n }, (_, i) => i + 1).filter((k) => n % k === 0);

export const diviseursMultiplesCm2 = creerGenerateur({
  id: 'diviseurs-multiples-cm2',
  competence: 'MA-C3-CM2-ENT-04',
  cycle: 3,
  description: 'Reconnaitre multiples et diviseurs, compter les diviseurs, trouver diviseurs et multiples communs.',
  generer(a, d) {
    if (d === 1) {
      const k = a.entier(3, 9);
      if (a.suivant() < 0.5) {
        const bon = k * a.entier(3, 11);
        const pieges = [bon + 1, bon - 1, bon + k + 1, bon + 2, bon - 2].filter((x) => x % k !== 0);
        return {
          gabarit: 'qcm',
          consigne: `Lequel de ces nombres est un multiple de ${k} ?`,
          options: optionsNumeriques(a, String(bon), pieges.map(String), () => String(k * a.entier(2, 11) + a.entier(1, k - 1))),
          reponse: String(bon),
          indice: `Un multiple de ${k} est dans la table de ${k}, ou au-delà.`,
          explication: `${bon} = ${k} × ${bon / k}. C’est un multiple de ${k}. Les autres nombres ne sont pas dans la table de ${k}.`,
        };
      }
      const bon = a.entier(2, 10);
      const n = bon * a.entier(3, Math.floor(100 / bon));
      // Au moins deux nombres de 2 à 10 ne divisent pas n (n ≤ 100 n'est pas multiple de 2 520).
      const mauvais = [2, 3, 4, 5, 6, 7, 8, 9, 10].filter((x) => n % x !== 0);
      return {
        gabarit: 'qcm',
        consigne: `Lequel de ces nombres est un diviseur de ${n} ?`,
        options: optionsNumeriques(a, String(bon), a.melanger(mauvais).map(String), () => String(a.choisir(mauvais))),
        reponse: String(bon),
        indice: `Cherche dans les tables de multiplication un produit égal à ${n}.`,
        explication: `${n} = ${bon} × ${n / bon}, donc ${bon} est un diviseur de ${n}. Les autres nombres ne divisent pas ${n} : la division a un reste.`,
      };
    }
    if (d === 2) {
      const n = a.entier(6, 30);
      const divs = diviseursDe(n);
      return {
        gabarit: 'saisie',
        consigne: `Combien le nombre ${n} a-t-il de diviseurs ?`,
        reponse: String(divs.length),
        indice: `Cherche les produits égaux à ${n} : 1 × ${n}, 2 × …`,
        explication: `Les diviseurs de ${n} sont : ${divs.join(', ')}. Il y en a ${divs.length}.`,
      };
    }
    if (a.suivant() < 0.5) {
      // Diviseur commun à deux nombres inférieurs ou égaux à 30.
      const g = a.choisir([2, 3, 4, 5, 6]);
      const x = g * a.entier(2, Math.floor(30 / g));
      let y = g * a.entier(2, Math.floor(30 / g));
      if (y === x) y = x === g * 2 ? g * 3 : g * 2;
      const communs = diviseursDe(x).filter((k) => y % k === 0 && k > 1);
      const bon = a.choisir(communs);
      const pieges = [...diviseursDe(x), ...diviseursDe(y)].filter((k) => !(x % k === 0 && y % k === 0));
      return {
        gabarit: 'qcm',
        consigne: `Lequel de ces nombres est un diviseur commun à ${x} et à ${y} ?`,
        options: optionsNumeriques(a, String(bon), a.melanger(pieges).map(String), () => String(x * y + 1)),
        reponse: String(bon),
        indice: 'Un diviseur commun divise les deux nombres.',
        explication: `${x} = ${bon} × ${x / bon} et ${y} = ${bon} × ${y / bon}. Donc ${bon} divise ${x} et ${y}.`,
      };
    }
    // Multiple commun à deux nombres inférieurs à 15.
    const x = a.entier(2, 9);
    let y = a.entier(3, 14);
    if (y === x || y % x === 0 || x % y === 0) y = x + 1;
    const ppcm = (x * y) / pgcd(x, y);
    const bon = ppcm * a.entier(1, Math.max(1, Math.floor(150 / ppcm)));
    const pieges = [bon + x, bon + y, bon - x, bon - y, x * a.entier(2, 12), y * a.entier(2, 9)].filter((k) => k > 0 && (k % x !== 0 || k % y !== 0));
    return {
      gabarit: 'qcm',
      consigne: `Lequel de ces nombres est un multiple commun à ${x} et à ${y} ?`,
      options: optionsNumeriques(a, String(bon), pieges.map(String), () => String(x * a.entier(2, 20) + 1)),
      reponse: String(bon),
      indice: 'Un multiple commun est à la fois dans la table de chacun des deux nombres.',
      explication: `${bon} = ${x} × ${bon / x} et ${bon} = ${y} × ${bon / y}. C’est un multiple de ${x} et de ${y}.`,
    };
  },
});

function pgcd(x: number, y: number): number {
  return y === 0 ? x : pgcd(y, x % y);
}

// ─────────── Fractions décimales et écriture à virgule (jusqu'aux millièmes)

export const fractionsDecimalesCm2 = creerGenerateur({
  id: 'fractions-decimales-cm2',
  competence: 'MA-C3-CM2-DEC-01',
  cycle: 3,
  description: 'Passer d’une fraction décimale ou d’une somme de fractions décimales à l’écriture à virgule, et inversement.',
  generer(a, d) {
    if (d === 1) {
      const k = a.entier(1, 3);
      const n = a.entier(1, 10 ** k * 9);
      const r = decaler(String(n), -k);
      return {
        gabarit: 'saisie',
        consigne: `Écris sous forme décimale : ${fr(n)}/${fr(10 ** k)}`,
        reponse: r,
        indice: `Le dernier chiffre du numérateur est au rang des ${['dixièmes', 'centièmes', 'millièmes'][k - 1]}.`,
        explication: `${fr(n)}/${fr(10 ** k)}, c’est ${fr(n)} ${['dixième', 'centième', 'millième'][k - 1]}${n > 1 ? 's' : ''}. Le nombre s’écrit ${frDecimal(r)}.`,
      };
    }
    if (d === 2) {
      const e = a.entier(0, 99);
      const ds = a.entier(0, 9);
      const cs = a.entier(0, 9);
      const ms = ds === 0 || cs === 0 ? a.entier(1, 9) : a.choisir([0, a.entier(1, 9)]);
      const termes = [e ? String(e) : '', ds ? `${ds}/10` : '', cs ? `${cs}/100` : '', ms ? `${ms}/1 000` : ''].filter(Boolean);
      const r = normaliserDecimal(`${e},${ds}${cs}${ms}`);
      return {
        gabarit: 'saisie',
        consigne: `Écris sous forme décimale : ${termes.join(' + ')}`,
        reponse: r,
        indice: 'Place chaque chiffre dans son rang : dixièmes, centièmes, millièmes. Mets un zéro dans un rang vide.',
        explication: `Il y a ${e} unité${e > 1 ? 's' : ''}, ${ds} dixième${ds > 1 ? 's' : ''}, ${cs} centième${cs > 1 ? 's' : ''} et ${ms} millième${ms > 1 ? 's' : ''}. Le nombre est ${frDecimal(r)}.`,
      };
    }
    const k = a.entier(2, 3);
    const num = a.entier(10 ** k + 1, 99 * 10 ** k);
    const x = depuisEntier(num, k);
    const den = 10 ** k;
    return {
      gabarit: 'saisie',
      consigne: `Complète : ${frDecimal(x)} = …/${fr(den)}`,
      reponse: String(num),
      indice: `Combien de ${k === 2 ? 'centièmes' : 'millièmes'} y a-t-il dans ${frDecimal(x)} ?`,
      explication: `1 = ${fr(den)}/${fr(den)}. ${frDecimal(x)} = ${fr(num)} ${k === 2 ? 'centièmes' : 'millièmes'} = ${fr(num)}/${fr(den)}.`,
    };
  },
});

// ─────────── Comparer, ranger, intercaler des décimaux

/** Écriture avec trois chiffres après la virgule : « 3,4 » → « 3,400 ». */
const trois = (x: string) => frDecimal(`${x.split(',')[0]},${(x.split(',')[1] ?? '').padEnd(3, '0')}`);

/** Un décimal à `dec` décimales au plus, partie entière dans [min, max]. */
function decimal(a: Aleatoire, min: number, max: number, dec: number): string {
  return depuisEntier(a.entier(min * 10 ** dec, max * 10 ** dec), dec);
}

export const comparerDecimauxCm2 = creerGenerateur({
  id: 'comparer-decimaux-cm2',
  competence: 'MA-C3-CM2-DEC-02',
  cycle: 3,
  description: 'Comparer, ranger et intercaler des nombres décimaux jusqu’aux millièmes.',
  generer(a, d) {
    if (d === 1) {
      const e = a.entier(0, 30);
      // Même partie entière, nombres de décimales différents : le piège « 3,405 > 3,45 ».
      const x = normaliserDecimal(`${e},${a.entier(1, 9)}${a.choisir(['', String(a.entier(0, 9))])}`);
      const y = a.suivant() < 0.15 ? `${x}0` : normaliserDecimal(`${e},${a.entier(0, 9)}${a.entier(0, 9)}${a.entier(1, 9)}`);
      const c = comparerDecimaux(x, y);
      const signe = c === 0 ? '=' : c < 0 ? '<' : '>';
      return {
        gabarit: 'qcm',
        consigne: `Complète avec <, > ou = : ${frDecimal(x)} … ${frDecimal(y)}`,
        options: ['<', '>', '='],
        reponse: signe,
        indice: 'Écris les deux nombres avec trois chiffres après la virgule, puis compare.',
        explication:
          c === 0
            ? `Un zéro à la fin de la partie décimale ne change pas la valeur : ${frDecimal(x)} = ${frDecimal(y)}.`
            : `Les parties entières sont égales. On compare les dixièmes, puis les centièmes, puis les millièmes. ${frDecimal(x)} ${signe} ${frDecimal(normaliserDecimal(y))}.`,
      };
    }
    if (d === 2) {
      const e = a.entier(0, 20);
      const valeurs = new Set<string>();
      while (valeurs.size < 4) {
        const dec = a.entier(1, 3);
        valeurs.add(normaliserDecimal(depuisEntier((e + a.entier(0, 1)) * 10 ** dec + a.entier(1, 10 ** dec - 1), dec)));
      }
      const liste = [...valeurs];
      const tri = [...liste].sort(comparerDecimaux);
      const grand = a.suivant() < 0.5;
      const cible = grand ? tri[3]! : tri[0]!;
      return {
        gabarit: 'qcm',
        consigne: `Quel est le plus ${grand ? 'grand' : 'petit'} de ces nombres ?`,
        options: a.melanger(liste.map(frDecimal)),
        erreurs: erreurLongueurDecimale(liste, frDecimal(cible), grand),
        reponse: frDecimal(cible),
        indice: 'Compare d’abord les parties entières, puis les dixièmes, les centièmes et les millièmes.',
        explication: `Rangés dans l’ordre croissant : ${tri.map(frDecimal).join(' < ')}.`,
      };
    }
    // Intercaler : un seul nombre est strictement entre les deux bornes.
    const centiemes = a.entier(1, 2000);
    const bas = depuisEntier(centiemes, 2);
    const haut = depuisEntier(centiemes + 1, 2);
    const dedans = depuisEntier(centiemes * 10 + a.entier(1, 9), 3);
    const pieges = [
      depuisEntier(centiemes * 10 + 10 + a.entier(1, 9), 3),
      depuisEntier(Math.max(0, centiemes * 10 - a.entier(1, 9)), 3),
      depuisEntier(Math.floor(centiemes / 10) + 1, 1),
      depuisEntier(centiemes * 10 + 20 + a.entier(1, 9), 3),
    ].filter((p) => comparerDecimaux(p, bas) <= 0 || comparerDecimaux(p, haut) >= 0);
    return {
      gabarit: 'qcm',
      consigne: `Quel nombre est compris entre ${frDecimal(bas)} et ${frDecimal(haut)} ?`,
      options: optionsNumeriques(a, frDecimal(dedans), pieges.map(frDecimal), () => frDecimal(decimal(a, 21, 30, 1))),
      reponse: frDecimal(dedans),
      indice: `Écris les bornes avec trois chiffres après la virgule : ${trois(bas)} et ${trois(haut)}.`,
      explication: `${frDecimal(bas)} < ${frDecimal(dedans)} < ${frDecimal(haut)}. Il y a des millièmes entre deux centièmes qui se suivent.`,
    };
  },
});

// ─────────── Partie entière et arrondi à l'unité

export const arrondiUniteCm2 = creerGenerateur({
  id: 'arrondi-unite-cm2',
  competence: 'MA-C3-CM2-DEC-03',
  cycle: 3,
  description: 'Donner la partie entière et l’arrondi à l’unité d’un nombre décimal.',
  generer(a, d) {
    const dec = d === 1 ? 2 : d === 2 ? a.entier(1, 2) : 3;
    let n = a.entier(10 ** dec + 1, 99 * 10 ** dec);
    if (d === 3) {
      // Cas limites : trois décimales proches de n,5 (19,499 ; 7,503), ou passage à la dizaine (19,925 donne 20).
      const dizaine = a.suivant() < 0.4;
      const e = dizaine ? 10 * a.entier(0, 9) + 9 : a.entier(1, 99);
      const m = dizaine ? a.entier(500, 999) : a.entier(470, 529);
      n = e * 1000 + m;
    }
    if (n % 10 === 0) n += 1;
    const x = depuisEntier(n, dec);
    const entier = Math.floor(n / 10 ** dec);
    const dixiemes = Math.floor(n / 10 ** (dec - 1)) % 10;
    if (d === 1) {
      return {
        gabarit: 'saisie',
        consigne: `Quelle est la partie entière de ${frDecimal(x)} ?`,
        reponse: String(entier),
        indice: 'La partie entière est écrite avant la virgule.',
        explication: `${frDecimal(x)} = ${entier} + ${frDecimal(depuisEntier(n % 10 ** dec, dec))}. La partie entière est ${entier}.`,
      };
    }
    const arrondi = dixiemes >= 5 ? entier + 1 : entier;
    return {
      gabarit: 'saisie',
      consigne: `Donne l’arrondi à l’unité de ${frDecimal(x)}.`,
      reponse: String(arrondi),
      indice: 'Regarde le chiffre des dixièmes.',
      explication: `${frDecimal(x)} est entre ${entier} et ${entier + 1}. Le chiffre des dixièmes est ${dixiemes}. ${dixiemes >= 5 ? `Il vaut 5 ou plus : on prend ${entier + 1}.` : `Il est inférieur à 5 : on garde ${entier}.`}`,
    };
  },
});
