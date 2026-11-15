// CP, nombres jusqu'à 100. Source : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024).
import { enLettres } from './lettres';
import { choix, creerGenerateur, options, optionsNumeriques, qte } from './outils';

const TROU = '…';

/** Ordinal en lettres jusqu'à « vingtième » : 1 → premier (ou première), 9 → neuvième. */
export function ordinal(n: number, feminin = false): string {
  if (n === 1) return feminin ? 'première' : 'premier';
  const l = enLettres(n);
  if (l.endsWith('cinq')) return `${l}uième`;
  if (l.endsWith('neuf')) return `${l.slice(0, -1)}vième`;
  return `${l.endsWith('e') ? l.slice(0, -1) : l}ième`;
}

// ─────────── Dizaines et unités

export const nombresUnitesCp = creerGenerateur({
  id: 'nombres-unites-cp',
  competence: 'MA-C2-CP-NUM-01',
  cycle: 2,
  description: 'Passer des dizaines et unités à l’écriture en chiffres, et inversement.',
  generer(a, d) {
    if (d === 1) {
      const dz = a.entier(1, 9);
      const u = a.entier(1, 9);
      const n = 10 * dz + u;
      return {
        gabarit: 'qcm',
        consigne: `Quel nombre a ${qte(dz, 'dizaine')} et ${qte(u, 'unité')} ?`,
        ...choix(a, String(n), [[String(10 * u + dz), 'dizaines-unites-inversees'], [String(dz + u), 'dizaines-comptees-unites'], [String(10 * dz), 'unites-oubliees']], () => String(a.entier(11, 99)), { numerique: true }),
        reponse: String(n),
        indice: 'Le chiffre des dizaines s’écrit à gauche.',
        explication: `${qte(dz, 'dizaine')}, c’est ${10 * dz}. ${10 * dz} + ${u} = ${n}.`,
      };
    }
    if (d === 2) {
      const n = a.entier(11, 99);
      const dz = Math.floor(n / 10);
      const u = n % 10;
      const forme = a.entier(0, 3);
      if (forme === 0 || forme === 1) {
        const dizaines = forme === 0;
        return {
          gabarit: 'saisie',
          consigne: `Quel est le chiffre des ${dizaines ? 'dizaines' : 'unités'} de ${n} ?`,
          reponse: String(dizaines ? dz : u),
          indice: 'Les unités sont à droite. Les dizaines sont juste à gauche.',
          explication: `${n}, c’est ${qte(dz, 'dizaine')} et ${qte(u, 'unité')}. Le chiffre des ${dizaines ? 'dizaines' : 'unités'} est ${dizaines ? dz : u}.`,
        };
      }
      const trouDizaines = forme === 3;
      return {
        gabarit: 'saisie',
        consigne: trouDizaines ? `Complète : ${n} = ${TROU} + ${u}` : `Complète : ${n} = ${10 * dz} + ${TROU}`,
        reponse: String(trouDizaines ? 10 * dz : u),
        indice: `${n}, c’est ${qte(dz, 'dizaine')} et ${qte(u, 'unité')}.`,
        explication: `${qte(dz, 'dizaine')}, c’est ${10 * dz}. ${n} = ${10 * dz} + ${u}.`,
      };
    }
    // Difficulté 3 : collection partiellement groupée, comme « 3 dizaines et 15 unités ».
    const u = a.entier(10, 19);
    const dz = a.entier(1, Math.floor((99 - u) / 10));
    const n = 10 * dz + u;
    const morceaux = [qte(dz, 'dizaine'), `${u} unités`];
    if (a.suivant() < 0.5) morceaux.reverse();
    return {
      gabarit: 'saisie',
      consigne: `Écris en chiffres : ${morceaux[0]} et ${morceaux[1]}.`,
      reponse: String(n),
      indice: `${u} unités, c’est 1 dizaine et ${qte(u - 10, 'unité')}.`,
      explication: `${u} unités font 1 dizaine et ${qte(u - 10, 'unité')}. Cela fait ${qte(dz + 1, 'dizaine')} et ${qte(u - 10, 'unité')}. Le nombre est ${n}.`,
    };
  },
});

// ─────────── Écriture en lettres jusqu'à 50

export const nombresLettresCp = creerGenerateur({
  id: 'nombres-lettres-cp',
  competence: 'MA-C2-CP-NUM-02',
  cycle: 2,
  description: 'Écrire en lettres les nombres jusqu’à 50, et inversement.',
  generer(a, d) {
    if (d === 2) {
      const n = a.entier(1, 50);
      return {
        gabarit: 'saisie',
        consigne: `Écris en chiffres : ${enLettres(n)}.`,
        reponse: String(n),
        indice: 'Lis le nombre à voix haute.',
        explication: `${enLettres(n)} s’écrit ${n} en chiffres.`,
      };
    }
    // Difficulté 1 : de 11 à 30 ; difficulté 3 : de 31 à 50, avec « trente-et-un » et « quarante-et-un ».
    const n = d === 1 ? a.entier(11, 30) : a.entier(31, 50);
    const lettres = enLettres(n);
    const dz = Math.floor(n / 10);
    const u = n % 10;
    const pieges: string[] = [];
    if (u === 1) pieges.push(lettres.replace('-et-', '-'));
    if (n >= 11 && n <= 16) pieges.push(`dix-${enLettres(u)}`);
    if (u > 0 && 10 * u + dz <= 50 && u !== dz) pieges.push(enLettres(10 * u + dz));
    pieges.push(enLettres(n <= 40 ? n + 10 : n - 10));
    return {
      gabarit: 'qcm',
      consigne: `Comment s’écrit ${n} en lettres ?`,
      options: options(a, lettres, pieges, () => enLettres(a.entier(d === 1 ? 11 : 21, 50))),
      reponse: lettres,
      indice: 'Lis le nombre à voix haute. Commence par les dizaines.',
      explication: `${n} s’écrit ${lettres}. Les mots sont reliés par des traits d’union.`,
    };
  },
});

// ─────────── Comparer, ranger, intercaler

export const nombresComparerCp = creerGenerateur({
  id: 'nombres-comparer-cp',
  competence: 'MA-C2-CP-NUM-03',
  cycle: 2,
  description: 'Comparer deux nombres avec <, > ou =, trouver le plus grand, ranger cinq nombres.',
  generer(a, d) {
    if (d === 1) {
      const x = a.entier(10, 99);
      const egal = a.suivant() < 0.15;
      let y = egal ? x : a.entier(Math.max(1, x - 15), Math.min(100, x + 15));
      if (!egal && y === x) y = x + 1;
      const signe = x < y ? '<' : x > y ? '>' : '=';
      const mot = signe === '<' ? 'plus petit que' : signe === '>' ? 'plus grand que' : 'égal à';
      return {
        gabarit: 'qcm',
        consigne: `Complète avec <, > ou = : ${x} ${TROU} ${y}`,
        options: a.melanger(['<', '>', '=']),
        reponse: signe,
        indice: 'Compare d’abord les dizaines.',
        explication: `${x} est ${mot} ${y}. On écrit ${x} ${signe} ${y}.`,
      };
    }
    if (d === 2) {
      const dz = a.entier(2, 8);
      const u = a.entier(1, 9);
      const candidats = [10 * dz + u, 10 * u + dz, 10 * (dz + 1) + a.entier(0, 9), 10 * dz + ((u + 4) % 10), 10 * (dz - 1) + u];
      const liste = [...new Set(candidats)].slice(0, 4);
      while (liste.length < 4) {
        const z = a.entier(10, 99);
        if (!liste.includes(z)) liste.push(z);
      }
      const plusGrand = a.suivant() < 0.5;
      const cible = plusGrand ? Math.max(...liste) : Math.min(...liste);
      return {
        gabarit: 'qcm',
        consigne: `Quel est le plus ${plusGrand ? 'grand' : 'petit'} nombre ?`,
        options: a.melanger(liste.map(String)),
        reponse: String(cible),
        indice: 'Compare d’abord les dizaines. Puis compare les unités.',
        explication: `On range les nombres : ${[...liste].sort((p, q) => p - q).join(' < ')}. Le plus ${plusGrand ? 'grand' : 'petit'} est ${cible}.`,
      };
    }
    if (a.suivant() < 0.4) {
      const bas = a.entier(10, 85);
      const haut = bas + a.entier(3, 5);
      const juste = a.entier(bas + 1, haut - 1);
      const pieges = [bas - a.entier(1, 5), haut + a.entier(1, 5), haut];
      return {
        gabarit: 'qcm',
        consigne: `Quel nombre est compris entre ${bas} et ${haut} ?`,
        options: optionsNumeriques(a, String(juste), pieges.filter((x) => x >= 0).map(String), () => String(haut + a.entier(1, 9))),
        reponse: String(juste),
        indice: `Le nombre est plus grand que ${bas}. Il est plus petit que ${haut}.`,
        explication: `${bas} < ${juste} < ${haut}. ${juste} est compris entre ${bas} et ${haut}.`,
      };
    }
    const dz = a.entier(2, 8);
    const valeurs = new Set<number>([10 * dz + a.entier(0, 9)]);
    while (valeurs.size < 5) valeurs.add(a.entier(Math.max(1, 10 * dz - 15), Math.min(99, 10 * dz + 25)));
    const nombres = a.melanger([...valeurs]);
    const croissant = a.suivant() < 0.5;
    const tri = [...nombres].sort((p, q) => (croissant ? p - q : q - p));
    const ecrire = (l: number[]) => l.join(', ');
    const permuter = (i: number) => {
      const l = [...tri];
      [l[i], l[i + 1]] = [l[i + 1]!, l[i]!];
      return ecrire(l);
    };
    return {
      gabarit: 'qcm',
      consigne: `Range du plus ${croissant ? 'petit au plus grand' : 'grand au plus petit'} : ${ecrire(nombres)}.`,
      options: options(a, ecrire(tri), [ecrire([...tri].reverse()), permuter(a.entier(0, 3)), permuter(a.entier(0, 3))], () => ecrire(a.melanger(tri))),
      reponse: ecrire(tri),
      indice: croissant ? 'Cherche d’abord le plus petit nombre.' : 'Cherche d’abord le plus grand nombre.',
      explication: `${tri.join(croissant ? ' < ' : ' > ')}. On écrit : ${ecrire(tri)}.`,
    };
  },
});

// ─────────── Compter de 1 en 1, de 2 en 2, de 10 en 10, à rebours

export const suitesCp = creerGenerateur({
  id: 'suites-cp',
  competence: 'MA-C2-CP-NUM-04',
  cycle: 2,
  description: 'Compléter une suite de nombres de 1 en 1, de 2 en 2, de 10 en 10 ou à rebours.',
  generer(a, d) {
    const pas = d === 1 ? 1 : d === 2 ? a.choisir([2, 10]) : a.choisir([-1, -2, 2, -10]);
    const longueur = 5;
    const depart = pas > 0 ? a.entier(0, 100 - pas * (longueur - 1)) : a.entier(-pas * (longueur - 1), 100);
    const suite = Array.from({ length: longueur }, (_, i) => depart + i * pas);
    // Difficulté 3 : le trou peut être au milieu de la suite.
    const trou = d === 3 ? a.entier(1, longueur - 1) : longueur - 1;
    const reponse = suite[trou]!;
    const ecrite = suite.map((n, i) => (i === trou ? TROU : String(n))).join(', ');
    const sens = pas > 0 ? 'avance' : 'recule';
    const nom = Math.abs(pas) === 1 ? 'de 1 en 1' : Math.abs(pas) === 2 ? 'de 2 en 2' : 'de 10 en 10';
    return {
      gabarit: 'saisie',
      consigne: `Complète la suite : ${ecrite}`,
      reponse: String(reponse),
      indice: 'Regarde de combien on passe d’un nombre au suivant.',
      explication: `On ${sens} ${nom}. Le nombre manquant est ${reponse}.`,
    };
  },
});

// ─────────── Nombres ordinaux et suites répétitives

const LETTRES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const ordinauxCp = creerGenerateur({
  id: 'ordinaux-cp',
  competence: 'MA-C2-CP-NUM-05',
  cycle: 2,
  description: 'Repérer un rang dans une liste ou une file, prolonger une suite répétitive.',
  generer(a, d) {
    if (d === 1) {
      const pas = a.entier(2, 5);
      const depart = a.entier(1, 20);
      const liste = Array.from({ length: 6 }, (_, i) => depart + i * pas);
      const rang = a.entier(2, 6);
      const valeur = liste[rang - 1]!;
      if (a.suivant() < 0.5) {
        return {
          gabarit: 'saisie',
          consigne: `La liste est : ${liste.join(', ')}. Quel est le ${ordinal(rang)} nombre ?`,
          reponse: String(valeur),
          indice: 'Compte les nombres depuis le début de la liste.',
          explication: `Le premier nombre est ${liste[0]}. Le ${ordinal(rang)} nombre est ${valeur}.`,
        };
      }
      const autres = [rang - 1, rang + 1, rang + 2].filter((r) => r >= 1 && r <= 6).map((r) => ordinal(r, true));
      return {
        gabarit: 'qcm',
        consigne: `La liste est : ${liste.join(', ')}. À quelle position est ${valeur} ?`,
        options: options(a, ordinal(rang, true), autres, () => ordinal(a.entier(1, 6), true)),
        reponse: ordinal(rang, true),
        indice: 'Compte les nombres depuis le début de la liste.',
        explication: `${valeur} est le ${ordinal(rang)} nombre. Il est en ${ordinal(rang, true)} position.`,
      };
    }
    if (d === 2) {
      const total = a.entier(5, 12);
      const rang = a.entier(2, total - 1);
      const devant = a.suivant() < 0.6;
      const r = devant ? rang - 1 : total - rang;
      return {
        gabarit: 'saisie',
        consigne: `Il y a ${total} enfants dans la file. Je suis le ${ordinal(rang)}. Combien d’enfants sont ${devant ? 'devant' : 'derrière'} moi ?`,
        reponse: String(r),
        indice: 'Dessine la file avec des ronds.',
        explication: devant
          ? `Je suis le ${ordinal(rang)}. Il y a ${qte(rang - 1, 'enfant')} devant moi.`
          : `Je suis le ${ordinal(rang)}. Il y a ${total} enfants. ${total} − ${rang} = ${r}.`,
      };
    }
    // Difficulté 3 : suite répétitive de lettres, rang jusqu'au vingtième.
    const taille = a.entier(2, 4);
    const motif = a.melanger(LETTRES).slice(0, taille);
    const debut = Array.from({ length: taille * 2 + a.entier(1, taille) }, (_, i) => motif[i % taille]!).join('');
    const rang = a.entier(debut.length + 2, 20);
    const lettre = motif[(rang - 1) % taille]!;
    const autres = LETTRES.filter((l) => !motif.includes(l));
    return {
      gabarit: 'qcm',
      consigne: `La suite est : ${debut}${TROU} Quelle est la ${ordinal(rang, true)} lettre ?`,
      options: options(a, lettre, motif, () => a.choisir(autres)),
      reponse: lettre,
      indice: `Le motif ${motif.join('')} se répète. Continue la suite jusqu’à ${rang}.`,
      explication: `Le motif ${motif.join('')} a ${taille} lettres. Il se répète. La ${ordinal(rang, true)} lettre est ${lettre}.`,
    };
  },
});
