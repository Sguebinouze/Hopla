// CE1, grandeurs et mesures : longueurs, masses, monnaie, heures, durées.
// Source : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024), p. 27 à 29.
// Pas d'écriture à virgule pour les longueurs et les masses ; la virgule n'apparait qu'avec la monnaie.
import { choix, creerGenerateur, erreursDe, fr, qte, type Piege } from './outils';
import type { Aleatoire } from './outils';

const TROU = '…';

/** Mesure en deux unités : (146, 'm', 'cm', 100) → « 1 m 46 cm ». */
function deuxUnites(total: number, grande: string, petite: string, facteur: number): string {
  const g = Math.floor(total / facteur);
  const p = total % facteur;
  if (g === 0) return `${fr(p)} ${petite}`;
  return p === 0 ? `${fr(g)} ${grande}` : `${fr(g)} ${grande} ${fr(p)} ${petite}`;
}

/** Pièges d'estimation : même nombre et autre unité, ou ordre de grandeur invraisemblable. */
const erreursEstimation = (juste: string, pieges: string[], code: string) =>
  Object.fromEntries(pieges.map((p) => [p, p.split(' ')[0] === juste.split(' ')[0] ? 'unite-confondue' : code]));
/** Pièges de comparaison : l'extrême opposé, et la mesure choisie en lisant le premier nombre sans convertir. */
const erreursComparaison = (ecrites: string[], valeurs: number[], reponse: string, grand: boolean): Record<string, string> => {
  const lu = (t: string) => Number(t.split(' ')[0]!.replace(/\s/g, ''));
  const naif = ecrites.reduce((p, q) => ((grand ? lu(q) > lu(p) : lu(q) < lu(p)) ? q : p));
  const oppose = ecrites[valeurs.indexOf(grand ? Math.min(...valeurs) : Math.max(...valeurs))]!;
  return erreursDe(ecrites, reponse, [[naif, 'unites-non-converties'], [oppose, 'plus-grand-plus-petit-confondus']]);
};

/** Options d'un QCM « la plus grande / la plus petite » : valeurs toutes différentes. */
function choisirMesures(a: Aleatoire, base: number, ecarts: number[], n = 4): number[] {
  const valeurs = new Set<number>([base]);
  for (let i = 0; i < 50 && valeurs.size < n; i++) {
    const v = base + a.choisir(ecarts);
    if (v > 0) valeurs.add(v);
  }
  return [...valeurs];
}

// ─────────── Longueurs : m, cm, km

/** Objets familiers : longueur plausible et deux pièges (mauvaise unité, ordre de grandeur). */
const LONGUEURS_REPERES: [string, string, string, string][] = [
  ['une trousse', '20 cm', '2 cm', '2 m'], ['un crayon', '15 cm', '15 m', '1 cm'], ['une gomme', '4 cm', '4 m', '40 cm'],
  ['une cuillère', '15 cm', '15 m', '1 m'], ['un livre de classe', '25 cm', '25 m', '2 cm'], ['un cartable', '40 cm', '4 cm', '40 m'],
  ['une porte', '2 m', '2 cm', '20 m'], ['un lit', '2 m', '20 cm', '20 m'], ['un autobus', '12 m', '12 cm', '1 m'],
  ['une voiture', '4 m', '4 cm', '40 m'], ['une fourchette', '20 cm', '2 m', '2 cm'], ['un trombone', '3 cm', '3 m', '30 cm'],
  ['une baguette de pain', '70 cm', '7 cm', '7 m'], ['une piscine', '25 m', '25 cm', '2 m'], ['un timbre', '3 cm', '3 m', '30 cm'],
  ['un stylo', '14 cm', '14 m', '1 cm'], ['une table de classe', '1 m', '1 cm', '10 m'], ['une feuille de cahier', '30 cm', '3 cm', '3 m'],
  ['une girafe', '5 m', '5 cm', '50 m'], ['une coccinelle', '1 cm', '1 m', '10 cm'], ['un tableau de classe', '3 m', '3 cm', '30 m'],
  ['une brosse à dents', '18 cm', '18 m', '1 cm'], ['un camion', '10 m', '10 cm', '1 m'], ['un chat', '50 cm', '5 cm', '5 m'],
  ['un terrain de football', '100 m', '100 cm', '10 m'], ['la distance de l’école à la mairie', '500 m', '5 cm', '50 cm'],
  ['un trajet jusqu’à la ville voisine', '12 km', '12 cm', '12 m'],
];

export const longueursCe1 = creerGenerateur({
  id: 'longueurs-ce1',
  competence: 'MA-C2-CE1-LONG-01',
  cycle: 2,
  description: 'Estimer une longueur, convertir entre m, cm et km sans virgule, comparer des longueurs.',
  generer(a, d) {
    if (d === 1) {
      const [objet, juste, p1, p2] = a.choisir(LONGUEURS_REPERES);
      return {
        gabarit: 'qcm',
        consigne: `Combien mesure ${objet}, à peu près ?`,
        options: a.melanger([juste, p1, p2]),
        erreurs: erreursEstimation(juste, [p1, p2], 'estimation-longueur'),
        reponse: juste,
        indice: '1 cm, c’est la largeur d’un doigt. 1 m, c’est un grand pas.',
        explication: `${objet[0]!.toUpperCase()}${objet.slice(1)} mesure environ ${juste}.`,
      };
    }
    if (d === 2) {
      const forme = a.entier(0, 3);
      if (forme === 0) {
        const m = a.entier(2, 9);
        return {
          gabarit: 'saisie', consigne: `Complète : ${m} m = ${TROU} cm`, reponse: String(m * 100),
          indice: '1 m = 100 cm.', explication: `1 m = 100 cm. Donc ${m} m = ${m * 100} cm.`,
        };
      }
      if (forme === 1) {
        const k = a.entier(2, 9);
        return {
          gabarit: 'saisie', consigne: `Complète : ${k} km = ${TROU} m`, reponse: String(k * 1000),
          indice: '1 km = 1 000 m.', explication: `1 km = 1 000 m. Donc ${k} km = ${fr(k * 1000)} m.`,
        };
      }
      if (forme === 2) {
        const m = a.entier(1, 5);
        const c = a.entier(1, 99);
        const total = m * 100 + c;
        return {
          gabarit: 'saisie', consigne: `Complète : ${m} m ${c} cm = ${TROU} cm`, reponse: String(total),
          indice: '1 m = 100 cm.', explication: `${m} m = ${m * 100} cm. ${m * 100} + ${c} = ${total}. Cela fait ${total} cm.`,
        };
      }
      const m = a.entier(2, 9);
      return {
        gabarit: 'saisie', consigne: `Complète : ${m * 100} cm = ${TROU} m`, reponse: String(m),
        indice: '100 cm = 1 m.', explication: `100 cm = 1 m. Donc ${m * 100} cm = ${m} m.`,
      };
    }
    // Comparer des longueurs écrites dans des unités différentes.
    const grand = a.suivant() < 0.5;
    const base = a.entier(105, 260);
    const valeurs = choisirMesures(a, base, [-40, -25, -10, -5, 5, 10, 25, 40]);
    const ecrites = valeurs.map((v) => (a.suivant() < 0.5 ? `${v} cm` : deuxUnites(v, 'm', 'cm', 100)));
    const cible = grand ? Math.max(...valeurs) : Math.min(...valeurs);
    const reponse = ecrites[valeurs.indexOf(cible)]!;
    return {
      gabarit: 'qcm',
      consigne: `Quelle longueur est la plus ${grand ? 'grande' : 'petite'} ?`,
      options: a.melanger(ecrites),
      erreurs: erreursComparaison(ecrites, valeurs, reponse, grand),
      reponse,
      indice: 'Écris toutes les longueurs en centimètres.',
      explication: reponse === `${cible} cm`
        ? `1 m = 100 cm. En centimètres, la plus ${grand ? 'grande' : 'petite'} est ${reponse}.`
        : `1 m = 100 cm. ${reponse} fait ${cible} cm. C’est la plus ${grand ? 'grande' : 'petite'}.`,
    };
  },
});

// ─────────── Masses : g et kg

const MASSES_REPERES: [string, string, string, string][] = [
  ['un paquet de sucre', '1 kg', '1 g', '10 kg'], ['un sachet de levure', '10 g', '10 kg', '1 kg'], ['une pomme', '150 g', '150 kg', '15 g'],
  ['un cartable rempli', '3 kg', '3 g', '30 kg'], ['une baguette de pain', '250 g', '250 kg', '2 g'], ['un chat', '4 kg', '4 g', '40 kg'],
  ['un vélo d’enfant', '10 kg', '10 g', '100 kg'], ['une plaquette de beurre', '250 g', '250 kg', '25 kg'], ['une lettre', '20 g', '20 kg', '2 kg'],
  ['un enfant de sept ans', '25 kg', '25 g', '250 kg'], ['un ballon de football', '400 g', '400 kg', '4 g'], ['une tablette de chocolat', '100 g', '100 kg', '10 kg'],
  ['un dictionnaire', '1 kg', '1 g', '20 kg'], ['un gros chien', '30 kg', '30 g', '300 kg'], ['une pièce de 1 euro', '7 g', '7 kg', '70 g'],
  ['un œuf', '60 g', '60 kg', '6 kg'], ['un melon', '1 kg', '1 g', '10 kg'], ['une pastèque', '5 kg', '5 g', '50 kg'],
  ['une bouteille d’eau de 1 litre', '1 kg', '1 g', '10 kg'], ['un sac de pommes de terre', '5 kg', '5 g', '50 kg'],
  ['une fraise', '20 g', '20 kg', '2 kg'], ['un bébé à la naissance', '3 kg', '3 g', '30 kg'], ['un crayon', '5 g', '5 kg', '50 g'],
  ['un pot de confiture', '400 g', '400 kg', '4 g'], ['une valise pleine', '15 kg', '15 g', '150 kg'],
];

export const massesCe1 = creerGenerateur({
  id: 'masses-ce1',
  competence: 'MA-C2-CE1-MAS-01',
  cycle: 2,
  description: 'Estimer une masse, convertir entre g et kg sans virgule, comparer des masses.',
  generer(a, d) {
    if (d === 1) {
      const [objet, juste, p1, p2] = a.choisir(MASSES_REPERES);
      return {
        gabarit: 'qcm',
        consigne: `Combien pèse ${objet}, à peu près ?`,
        options: a.melanger([juste, p1, p2]),
        erreurs: erreursEstimation(juste, [p1, p2], 'estimation-masse'),
        reponse: juste,
        indice: 'Un paquet de sucre pèse 1 kg. Un sachet de levure pèse 10 g.',
        explication: `${objet[0]!.toUpperCase()}${objet.slice(1)} pèse environ ${juste}.`,
      };
    }
    if (d === 2) {
      const forme = a.entier(0, 2);
      if (forme === 0) {
        const k = a.entier(2, 9);
        return {
          gabarit: 'saisie', consigne: `Complète : ${k} kg = ${TROU} g`, reponse: String(k * 1000),
          indice: '1 kg = 1 000 g.', explication: `1 kg = 1 000 g. Donc ${k} kg = ${fr(k * 1000)} g.`,
        };
      }
      if (forme === 1) {
        const k = a.entier(1, 4);
        const g = a.entier(1, 9) * 100 + a.choisir([0, 0, 50]);
        const total = k * 1000 + g;
        return {
          gabarit: 'saisie', consigne: `Complète : ${k} kg ${g} g = ${TROU} g`, reponse: String(total),
          indice: '1 kg = 1 000 g.', explication: `${k} kg = ${fr(k * 1000)} g. ${fr(k * 1000)} + ${g} = ${fr(total)}. Cela fait ${fr(total)} g.`,
        };
      }
      const k = a.entier(2, 9);
      return {
        gabarit: 'saisie', consigne: `Complète : ${fr(k * 1000)} g = ${TROU} kg`, reponse: String(k),
        indice: '1 000 g = 1 kg.', explication: `1 000 g = 1 kg. Donc ${fr(k * 1000)} g = ${k} kg.`,
      };
    }
    const lourd = a.suivant() < 0.5;
    const base = a.entier(8, 25) * 100;
    const valeurs = choisirMesures(a, base, [-700, -400, -300, -100, 100, 300, 400, 700]);
    const ecrites = valeurs.map((v) => (a.suivant() < 0.5 ? `${fr(v)} g` : deuxUnites(v, 'kg', 'g', 1000)));
    const cible = lourd ? Math.max(...valeurs) : Math.min(...valeurs);
    const reponse = ecrites[valeurs.indexOf(cible)]!;
    return {
      gabarit: 'qcm',
      consigne: `Quelle masse est la plus ${lourd ? 'lourde' : 'légère'} ?`,
      options: a.melanger(ecrites),
      erreurs: erreursComparaison(ecrites, valeurs, reponse, lourd),
      reponse,
      indice: 'Écris toutes les masses en grammes.',
      explication: reponse === `${fr(cible)} g`
        ? `1 kg = 1 000 g. En grammes, la plus ${lourd ? 'lourde' : 'légère'} est ${reponse}.`
        : `1 kg = 1 000 g. ${reponse} fait ${fr(cible)} g. C’est la plus ${lourd ? 'lourde' : 'légère'}.`,
    };
  },
});

// ─────────── Monnaie : euros et centimes, écriture à virgule

/** 205 centimes → « 2,05 € ». */
const euros = (centimes: number) => `${Math.floor(centimes / 100)},${String(centimes % 100).padStart(2, '0')} €`;
const eurosCentimes = (e: number, c: number) => `${qte(e, 'euro')} et ${qte(c, 'centime')}`;
const PRENOMS = ['Léo', 'Lina', 'Hugo', 'Jade', 'Sami', 'Nora', 'Tom', 'Rose'];

export const monnaieCe1 = creerGenerateur({
  id: 'monnaie-ce1',
  competence: 'MA-C2-CE1-MONN-01',
  cycle: 2,
  description: 'Passer des centimes aux euros, écrire un prix avec une virgule, comparer deux sommes.',
  generer(a, d) {
    if (d === 1) {
      const e = a.entier(1, 9);
      const c = a.entier(1, 9) * 10 + a.entier(1, 9);
      const total = e * 100 + c;
      if (a.suivant() < 0.5) {
        return {
          gabarit: 'saisie',
          consigne: `Combien de centimes y a-t-il dans ${qte(e, 'euro')} ?`,
          reponse: String(e * 100),
          indice: '1 euro, c’est 100 centimes.',
          explication: `1 € = 100 centimes. Donc ${e} € = ${e * 100} centimes.`,
        };
      }
      const reponse = eurosCentimes(e, c);
      // Pièges : couper le nombre au mauvais endroit, oublier de convertir.
      const pieges: [string, string][] = [[`${qte(Math.floor(total / 10), 'euro')} et ${qte(total % 10, 'centime')}`, 'centimes-rang'], [`${qte(total, 'euro')}`, 'centimes-comptes-en-euros'], [`${qte(c, 'euro')} et ${qte(e, 'centime')}`, 'euros-centimes-inverses']];
      return {
        gabarit: 'qcm',
        consigne: `${total} centimes, combien cela fait-il ?`,
        ...choix(a, reponse, pieges, () => eurosCentimes(e + a.choisir([1, 2]), c)),
        reponse,
        indice: '100 centimes font 1 euro.',
        explication: `${total} centimes = ${e * 100} centimes + ${qte(c, 'centime')}. ${e * 100} centimes font ${e} €. Cela fait ${reponse}.`,
      };
    }
    if (d === 2) {
      const e = a.entier(1, 20);
      const c = a.choisir([5, 50, 3, 30, 7, 70, 8, 80, 9, 90, 1, 10, 15, 45, 99]);
      const reponse = euros(e * 100 + c);
      // Pièges : « 2,5 € » pour 2 € et 5 centimes, centimes collés aux euros, euro en trop.
      const mauvaiseVirgule = c < 10 ? `${e},${c} €` : c % 10 === 0 ? `${e},0${c / 10} €` : `${e},${String(c).split('').reverse().join('')} €`;
      return {
        gabarit: 'qcm',
        consigne: `Comment écrit-on ${eurosCentimes(e, c)} ?`,
        ...choix(a, reponse, [[mauvaiseVirgule, 'centimes-rang'], [`${fr(e * 100 + c)} €`, 'centimes-comptes-en-euros'], [euros((e + 1) * 100 + c)]], () => euros(e * 100 + c + a.choisir([100, 200]))),
        reponse,
        indice: 'Après la virgule, on écrit toujours deux chiffres.',
        explication: `${qte(c, 'centime')} s’écrit ${String(c).padStart(2, '0')} après la virgule. On écrit ${reponse}.`,
      };
    }
    // Comparer deux sommes : nombre de pièces et valeur.
    const [p1, p2] = a.melanger(PRENOMS).slice(0, 2) as [string, string];
    const piece = a.choisir([1, 2]);
    const n1 = a.entier(2, 6);
    const valeur1 = n1 * piece * 100;
    const ecart = a.choisir([-100, 0, 100, 200]);
    const valeur2 = valeur1 + ecart;
    // Au plus 60 pièces : 10 centimes pour les petites sommes, sinon 20 ou 50 centimes.
    const centimes = a.choisir([10, 20, 50].filter((c) => valeur2 / c <= 60));
    const n2 = valeur2 / centimes;
    const reponse = valeur1 === valeur2 ? 'Autant tous les deux' : valeur1 > valeur2 ? p1 : p2;
    return {
      gabarit: 'qcm',
      consigne: `${p1} a ${n1} pièces de ${piece} €. ${p2} a ${n2} pièces de ${centimes} centimes. Qui a le plus d’argent ?`,
      options: a.melanger([p1, p2, 'Autant tous les deux']),
      reponse,
      indice: 'Compte la valeur des pièces, pas leur nombre.',
      explication: `${p1} a ${euros(valeur1)}. ${p2} a ${euros(valeur2)}. ${reponse === 'Autant tous les deux' ? 'Ils ont autant d’argent.' : `${reponse} a le plus d’argent.`}`,
    };
  },
});

// ─────────── Lire l'heure : matin et après-midi, demi-heure, quarts d'heure

/** (14, 15) → « 14 h 15 » ; (8, 0) → « 8 h ». */
const hm = (h: number, m: number) => (m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, '0')}`);
const MOMENT: Record<number, string> = { 0: '', 15: ' et quart', 30: ' et demie', 45: ' moins le quart' };
/** Jusqu'à 6 heures : « de l'après-midi » ; ensuite : « du soir ». */
const moment = (h: number) => (h <= 6 ? 'de l’après-midi' : 'du soir');

export const heuresCe1 = creerGenerateur({
  id: 'heures-ce1',
  competence: 'MA-C2-CE1-TEMPS-01',
  cycle: 2,
  description: 'Lire l’heure : matin et après-midi, demi-heure et quarts d’heure, horloge à aiguilles et digitale.',
  generer(a, d) {
    if (d === 1) {
      // Heures de l'après-midi : 3 heures de l'après-midi, c'est 15 h.
      const h = a.entier(1, 11);
      const reponse = `${h + 12} h`;
      return {
        gabarit: 'qcm',
        consigne: `Il est ${qte(h, 'heure')} ${moment(h)}. Qu’affiche l’horloge digitale ?`,
        ...choix(a, reponse, [[`${h} h`, 'apres-midi-sans-12'], [`${h + 10} h`], [`${(h + 13) % 24} h`]], () => `${a.entier(13, 23)} h`),
        reponse,
        indice: 'Après midi, on ajoute 12 heures.',
        explication: `Après midi, on compte à partir de 12. ${h} + 12 = ${h + 12}. L’horloge affiche ${reponse}.`,
      };
    }
    const m = a.choisir([15, 30, 45]);
    const h = a.entier(1, m === 45 ? 10 : 11);
    const grande = m / 5;
    if (d === 2) {
      const reponse = hm(h, m);
      const dessin = a.suivant() < 0.5;
      // Pièges : prendre l'heure suivante, lire le nombre de la grande aiguille comme des minutes, inverser les aiguilles.
      return {
        gabarit: 'qcm',
        consigne: dessin
          ? 'Quelle heure indique l’horloge ?'
          : `La petite aiguille est entre le ${h} et le ${h + 1}. La grande aiguille est sur le ${grande}. Quelle heure est-il ?`,
        ...(dessin ? { visuel: { type: 'horloge', heures: h, minutes: m } as const } : {}),
        ...choix(a, reponse, [[hm(h + 1, m), 'heure-suivante'], [hm(h, grande), 'minutes-lues-sur-cadran'], [hm(grande, h * 5 % 60), 'aiguilles-inversees']], () => hm(h, (m + 15) % 60)),
        reponse,
        indice: 'La grande aiguille sur le 3 : 15 minutes. Sur le 6 : 30 minutes.',
        explication: `La petite aiguille donne ${qte(h, 'heure')}. La grande aiguille sur le ${grande}, c’est ${m} minutes. Il est ${reponse}.`,
      };
    }
    // Après-midi et quarts d'heure : « 2 heures et quart de l'après-midi » → 14 h 15.
    const reponse = hm(h + 12, m);
    const dit = m === 45 ? `${qte(h + 1, 'heure')} moins le quart` : `${qte(h, 'heure')}${MOMENT[m]}`;
    return {
      gabarit: 'qcm',
      consigne: `Il est ${dit} ${moment(h)}. Qu’affiche l’horloge digitale ?`,
      ...choix(a, reponse, [[hm(h, m), 'apres-midi-sans-12'], [hm(h + 12, m === 15 ? 25 : m === 30 ? 50 : 15), 'quart-heure-mal-compte'], [hm(m === 45 ? h + 13 : h + 12, m === 45 ? 15 : (m + 15) % 60), 'quart-heure-mal-compte']] as Piege[], () => hm(h + 12, (m + 30) % 60)),
      reponse,
      indice: 'Un quart d’heure, c’est 15 minutes. Une demi-heure, c’est 30 minutes.',
      explication: m === 45
        ? `Moins le quart : il manque 15 minutes pour ${h + 1} heures. C’est ${h} h 45. Après midi, on écrit ${reponse}.`
        : `${MOMENT[m]!.trim()[0]!.toUpperCase()}${MOMENT[m]!.trim().slice(1)}, c’est ${m} minutes. Après midi, on ajoute 12 heures. On écrit ${reponse}.`,
    };
  },
});

// ─────────── Durées : heure, demi-heure, quart d'heure, minutes

const DUREES_NOMMEES: [string, number][] = [
  ['une heure', 60], ['une demi-heure', 30], ['un quart d’heure', 15], ['trois quarts d’heure', 45], ['deux heures', 120],
  ['une heure et demie', 90], ['deux quarts d’heure', 30], ['une heure et quart', 75], ['deux demi-heures', 60], ['trois heures', 180],
];
const ACTIVITES: [string, string][] = [
  ['Mamie taille ses rosiers pendant', 'Puis elle bêche pendant'], ['Léo lit pendant', 'Puis il dessine pendant'],
  ['Nora joue au parc pendant', 'Puis elle goute pendant'], ['Tom range sa chambre pendant', 'Puis il joue pendant'],
  ['Papa cuisine pendant', 'Puis il fait la vaisselle pendant'], ['Lina nage pendant', 'Puis elle se repose pendant'],
];

export const dureesCe1 = creerGenerateur({
  id: 'durees-ce1',
  competence: 'MA-C2-CE1-DUR-01',
  cycle: 2,
  description: 'Heure, demi-heure, quart d’heure et minutes : convertir, calculer une durée, ajouter des durées.',
  generer(a, d) {
    if (d === 1) {
      const [nom, minutes] = a.choisir(DUREES_NOMMEES);
      return {
        gabarit: 'saisie',
        consigne: `Combien de minutes y a-t-il dans ${nom} ?`,
        reponse: String(minutes),
        indice: '1 heure = 60 minutes. Une demi-heure = 30 minutes.',
        explication: `Une heure, c’est 60 minutes. Un quart d’heure, c’est 15 minutes. ${nom[0]!.toUpperCase()}${nom.slice(1)}, c’est ${minutes} minutes.`,
      };
    }
    if (d === 2) {
      // Durée entre deux horaires d'une même journée, en quarts d'heure.
      const debut = a.entier(7 * 4, 18 * 4) * 15;
      const duree = a.choisir([15, 30, 45, 60]);
      const fin = debut + duree;
      return {
        gabarit: 'saisie',
        consigne: `Combien de minutes s’écoulent entre ${hm(Math.floor(debut / 60), debut % 60)} et ${hm(Math.floor(fin / 60), fin % 60)} ?`,
        reponse: String(duree),
        indice: 'Compte de quart d’heure en quart d’heure.',
        explication: `On compte ${qte(duree / 15, 'quart')} d’heure. Cela fait ${duree} minutes.`,
      };
    }
    const [action1, action2] = a.choisir(ACTIVITES);
    const [nom1, m1] = a.choisir(DUREES_NOMMEES.filter(([, m]) => m <= 60));
    const [nom2, m2] = a.choisir(DUREES_NOMMEES.filter(([n, m]) => m <= 60 && n !== nom1));
    return {
      gabarit: 'saisie',
      consigne: `${action1} ${nom1}. ${action2} ${nom2}. Combien de minutes en tout ?`,
      reponse: String(m1 + m2),
      indice: 'Écris chaque durée en minutes. Puis ajoute.',
      explication: `${nom1[0]!.toUpperCase()}${nom1.slice(1)}, c’est ${m1} minutes. ${nom2[0]!.toUpperCase()}${nom2.slice(1)}, c’est ${m2} minutes. ${m1} + ${m2} = ${m1 + m2}.`,
    };
  },
});
