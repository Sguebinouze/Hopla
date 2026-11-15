// 5e, statistiques, probabilités, proportionnalité et fonctions.
// Source : programme de mathématiques du cycle 4 (arrêté du 18 février 2026, BO n°10 du 5 mars 2026), p. 49 à 52.
import { depuisEntier } from './decimaux';
import { choix, creerGenerateur, fr, frDecimal, optionsNumeriques } from './outils';

const dec = (n: number, chiffres: number) => frDecimal(depuisEntier(n, chiffres));

// ─────────── Statistiques : effectifs, fréquences, moyenne

const SERIES = [
  'Notes d’un élève au dernier trimestre', 'Nombre de buts marqués par une équipe à chaque match',
  'Températures relevées chaque matin, en °C', 'Nombre de livres lus par des élèves cet été',
];
const MOYENS = ['à pied', 'à vélo', 'en bus', 'en voiture'];

export const statistiques5e = creerGenerateur({
  id: 'statistiques-5e',
  competence: 'MA-C4-5E-STAT-01',
  cycle: 4,
  description: 'Calculer des effectifs et des fréquences ; calculer et interpréter une moyenne simple.',
  generer(a, d) {
    if (d === 1) {
      // Fréquence en pourcentage : effectif total 20, 25, 50 ou 100.
      const total = a.choisir([20, 25, 50]);
      const moyen = a.choisir(MOYENS);
      const effectif = a.entier(1, total - 1);
      const pct = (effectif * 100) / total;
      return {
        gabarit: 'saisie',
        consigne: `Dans une classe de ${total} élèves, ${effectif} viennent au collège ${moyen}. Calcule la fréquence de ce moyen de transport, en pourcentage.`,
        reponse: String(pct),
        indice: 'Fréquence = effectif ÷ effectif total. Multiplie par 100 pour un pourcentage.',
        explication: `${effectif} ÷ ${total} = ${dec(effectif * (100 / total), 2)}, soit ${pct} %.`,
      };
    }
    const titre = a.choisir(SERIES);
    const n = a.entier(4, 6);
    const valeurs = Array.from({ length: n }, () => a.entier(2, 19));
    // Moyenne exacte au dixième : on ajuste la dernière valeur pour un total divisible.
    const somme0 = valeurs.reduce((x, y) => x + y, 0);
    const reste = somme0 % n;
    valeurs[n - 1] = valeurs[n - 1]! - reste + (valeurs[n - 1]! - reste < 1 ? n : 0);
    const somme = valeurs.reduce((x, y) => x + y, 0);
    const moyenne = somme / n;
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `${titre} : ${valeurs.join(' ; ')}. Calcule la moyenne de cette série.`,
        reponse: String(moyenne),
        indice: 'Moyenne = somme des valeurs ÷ nombre de valeurs.',
        explication: `Somme : ${valeurs.join(' + ')} = ${somme}. ${somme} ÷ ${n} = ${moyenne}.`,
      };
    }
    // Retrouver une valeur manquante connaissant la moyenne.
    const connues = valeurs.slice(0, n - 1);
    return {
      gabarit: 'saisie',
      consigne: `${titre} : ${connues.join(' ; ')} et une dernière valeur. La moyenne des ${n} valeurs est ${moyenne}. Calcule la dernière valeur.`,
      reponse: String(valeurs[n - 1]),
      indice: 'Calcule d’abord la somme totale : moyenne × nombre de valeurs.',
      explication: `Somme totale : ${moyenne} × ${n} = ${somme}. Somme connue : ${connues.reduce((x, y) => x + y, 0)}. ${somme} − ${connues.reduce((x, y) => x + y, 0)} = ${valeurs[n - 1]}.`,
    };
  },
});

// ─────────── Probabilités : équiprobabilité, évènement contraire, impossible, certain

export const probabilites5e = creerGenerateur({
  id: 'probabilites-5e',
  competence: 'MA-C4-5E-PROBA-01',
  cycle: 4,
  description: 'Attribuer une probabilité dans une situation d’équiprobabilité ; évènement contraire, impossible, certain.',
  generer(a, d) {
    if (d === 1) {
      const cas: [string, string, string[]][] = [
        ['On lance un dé équilibré à six faces. Quelle est la probabilité d’obtenir 4 ?', '1/6', ['1/4', '4/6', '1/2']],
        ['On lance une pièce équilibrée. Quelle est la probabilité d’obtenir pile ?', '1/2', ['1', '1/4', '2']],
        ['On lance un dé équilibré à six faces. Quelle est la probabilité d’obtenir 7 ?', '0', ['1/7', '1/6', '7/6']],
        ['On lance un dé équilibré à six faces. Quelle est la probabilité d’obtenir un nombre inférieur à 7 ?', '1', ['6/7', '1/6', '1/2']],
        ['On lance un dé équilibré à six faces. Quelle est la probabilité d’obtenir un nombre pair ?', '1/2', ['1/3', '2/6', '1/6']],
        ['On lance un dé équilibré à six faces. Quelle est la probabilité d’obtenir un multiple de 3 ?', '1/3', ['1/6', '1/2', '3/6']],
        ['On tire une carte au hasard dans un jeu de 32 cartes. Quelle est la probabilité de tirer un as ?', '1/8', ['1/32', '4/52', '1/4']],
      ];
      const [q, r, pieges] = a.choisir(cas);
      return {
        gabarit: 'qcm', consigne: q,
        options: optionsNumeriques(a, r, pieges, () => `1/${a.entier(2, 12)}`),
        reponse: r,
        indice: 'Probabilité = nombre d’issues favorables ÷ nombre d’issues possibles.',
        explication: r === '0' ? 'Cet évènement est impossible : sa probabilité est 0.' : r === '1' ? 'Cet évènement est certain : sa probabilité est 1.' : `On compte les issues favorables et les issues possibles. La probabilité est ${r}.`,
      };
    }
    const couleurs = a.melanger(['rouges', 'bleues', 'vertes', 'noires']).slice(0, 3) as [string, string, string];
    const nb = [a.entier(1, 9), a.entier(1, 9), a.entier(1, 9)];
    const total = nb[0]! + nb[1]! + nb[2]!;
    const sing = (c: string) => c.slice(0, -1);
    const urne = `Une urne contient ${nb[0]} boule${nb[0]! > 1 ? 's' : ''} ${nb[0]! > 1 ? couleurs[0] : sing(couleurs[0])}, ${nb[1]} ${nb[1]! > 1 ? couleurs[1] : sing(couleurs[1])} et ${nb[2]} ${nb[2]! > 1 ? couleurs[2] : sing(couleurs[2])}.`;
    if (d === 2) {
      const reponse = `${nb[0]}/${total}`;
      return {
        gabarit: 'qcm',
        consigne: `${urne} On tire une boule au hasard. Quelle est la probabilité de tirer une boule ${sing(couleurs[0])} ?`,
        ...choix(a, reponse, [[`${nb[0]}/${total - nb[0]!}`, 'probabilite-favorables-sur-autres'], [`1/3`, 'equiprobabilite-des-couleurs'], [`${total - nb[0]!}/${total}`, 'evenement-contraire']], () => `${a.entier(1, total)}/${total + 2}`, { numerique: true }),
        reponse,
        indice: 'Compte toutes les boules, puis celles de la couleur demandée.',
        explication: `Il y a ${total} boules, dont ${nb[0]} ${nb[0]! > 1 ? couleurs[0] : sing(couleurs[0])}. La probabilité est ${reponse}.`,
      };
    }
    // Évènement contraire.
    const reponse = `${total - nb[0]!}/${total}`;
    return {
      gabarit: 'qcm',
      consigne: `${urne} On tire une boule au hasard. Quelle est la probabilité de ne pas tirer une boule ${sing(couleurs[0])} ?`,
      ...choix(a, reponse, [[`${nb[0]}/${total}`, 'evenement-contraire'], [`${nb[1]}/${total}`], [`${total - nb[0]!}/${nb[0]}`, 'probabilite-favorables-sur-autres']], () => `${a.entier(1, total)}/${total + 1}`, { numerique: true }),
      reponse,
      indice: 'Probabilité du contraire = 1 − probabilité de l’évènement.',
      explication: `Probabilité de tirer une ${sing(couleurs[0])} : ${nb[0]}/${total}. Contraire : 1 − ${nb[0]}/${total} = ${reponse}.`,
    };
  },
});

// ─────────── Proportionnalité : pourcentages ; reconnaitre un tableau de proportionnalité

export const pourcentages5e = creerGenerateur({
  id: 'pourcentages-5e',
  competence: 'MA-C4-5E-PROP-01',
  cycle: 4,
  description: 'Calculer et appliquer un pourcentage ; calculer un pourcentage à partir d’effectifs.',
  generer(a, d) {
    if (d === 1) {
      const p = a.choisir([1, 10, 25, 50, 20, 5]);
      const base = p === 1 || p === 5 ? a.entier(2, 30) * 100 : p === 25 ? a.entier(2, 40) * 4 : a.entier(2, 60) * 10;
      return {
        gabarit: 'saisie',
        consigne: `Calcule ${p} % de ${fr(base)}.`,
        reponse: depuisEntier(base * p, 2),
        indice: `${p} %, c’est ${p} pour 100 : multiplie par ${p}, puis divise par 100.`,
        explication: `${fr(base)} × ${p} ÷ 100 = ${dec(base * p, 2)}.`,
      };
    }
    if (d === 2) {
      const total = a.choisir([20, 25, 40, 50, 200]);
      const part = a.entier(1, total - 1);
      const candidats = ['Alexis', 'Chloé', 'Salma', 'Djibril'];
      const qui = a.choisir(candidats);
      return {
        gabarit: 'saisie',
        consigne: `Lors de l’élection des délégués, ${total} élèves ont voté. ${qui} a obtenu ${part} voix. Calcule son pourcentage de voix.`,
        reponse: depuisEntier(part * (10000 / total), 2),
        indice: 'Pourcentage = voix obtenues ÷ voix exprimées × 100.',
        explication: `${part} ÷ ${total} × 100 = ${dec(part * (10000 / total), 2)}. ${qui} a obtenu ${dec(part * (10000 / total), 2)} % des voix.`,
      };
    }
    // Appliquer une réduction.
    const prix = a.entier(4, 60) * 5;
    const p = a.choisir([10, 20, 25, 30, 40, 50]);
    return {
      gabarit: 'saisie',
      consigne: `Un article coute ${prix} €. Il est soldé à −${p} %. Calcule son nouveau prix, en euros.`,
      reponse: depuisEntier(prix * (100 - p), 2),
      indice: 'Calcule la réduction, puis retire-la du prix.',
      explication: `Réduction : ${prix} × ${p} ÷ 100 = ${dec(prix * p, 2)} €. Nouveau prix : ${prix} − ${dec(prix * p, 2)} = ${dec(prix * (100 - p), 2)} €.`,
    };
  },
});

export const reconnaitreProportionnalite5e = creerGenerateur({
  id: 'reconnaitre-proportionnalite-5e',
  competence: 'MA-C4-5E-PROP-02',
  cycle: 4,
  description: 'Reconnaitre une situation de proportionnalité à partir d’un tableau ; utiliser un coefficient de proportionnalité.',
  generer(a, d) {
    const k = a.entier(2, 9);
    const xs = a.melanger([1, 2, 3, 4, 5, 6, 8, 10]).slice(0, 3).sort((x, y) => x - y);
    if (d === 3) {
      // Compléter une case avec le coefficient.
      const manque = a.entier(5, 15);
      return {
        gabarit: 'saisie',
        consigne: `Ce tableau est un tableau de proportionnalité. Première ligne : ${xs.join(' ; ')} ; ${manque}. Deuxième ligne : ${xs.map((x) => x * k).join(' ; ')} ; … Complète la case vide.`,
        reponse: String(manque * k),
        indice: 'Cherche par quel nombre on multiplie la première ligne pour obtenir la deuxième.',
        explication: `Le coefficient de proportionnalité est ${k}. ${manque} × ${k} = ${manque * k}.`,
      };
    }
    const proportionnel = a.suivant() < 0.5;
    const ys = xs.map((x) => x * k);
    if (!proportionnel) ys[2] = ys[2]! + a.choisir([-2, -1, 1, 3]);
    const contexte = d === 1
      ? `Prix de cahiers : ${xs.map((x, i) => `${x} cahier${x > 1 ? 's' : ''} coutent ${ys[i]} €`).join(', ')}.`.replace(/1 cahier coutent/, '1 cahier coute')
      : `Première ligne : ${xs.join(' ; ')}. Deuxième ligne : ${ys.join(' ; ')}.`;
    return {
      gabarit: 'qcm',
      consigne: `${contexte} Est-ce une situation de proportionnalité ?`,
      options: a.melanger(['Oui', 'Non', 'On ne peut pas savoir']),
      erreurs: { [proportionnel ? 'Non' : 'Oui']: 'proportionnalite-non-verifiee' },
      reponse: proportionnel ? 'Oui' : 'Non',
      indice: 'Calcule chaque quotient : deuxième ligne ÷ première ligne.',
      explication: proportionnel
        ? `Les quotients sont tous égaux à ${k} : c’est une situation de proportionnalité.`
        : `${ys[0]} ÷ ${xs[0]} = ${k}, mais ${ys[2]} ÷ ${xs[2]} ≠ ${k}. Les quotients ne sont pas égaux : ce n’est pas une situation de proportionnalité.`,
    };
  },
});

// ─────────── Fonctions : tableau de valeurs à partir d'une formule

export const tableauValeurs5e = creerGenerateur({
  id: 'tableau-valeurs-5e',
  competence: 'MA-C4-5E-FONC-01',
  cycle: 4,
  description: 'Calculer des valeurs à partir d’une formule exprimant une grandeur en fonction d’une autre.',
  generer(a, d) {
    if (d === 1) {
      const prixKg = a.entier(2, 9);
      const m = a.entier(2, 12);
      return {
        gabarit: 'saisie',
        consigne: `Le prix P, en euros, de m kilogrammes de pommes est donné par P = ${prixKg} × m. Calcule P pour m = ${m}.`,
        reponse: String(prixKg * m),
        indice: 'Remplace m par sa valeur.',
        explication: `P = ${prixKg} × ${m} = ${prixKg * m}. Le prix est ${prixKg * m} €.`,
      };
    }
    if (d === 2) {
      const fixe = a.entier(2, 15);
      const parHeure = a.entier(3, 12);
      const h = a.entier(1, 8);
      return {
        gabarit: 'saisie',
        consigne: `Une location de vélo coute C = ${fixe} + ${parHeure} × h euros, où h est le nombre d’heures. Calcule C pour h = ${h}.`,
        reponse: String(fixe + parHeure * h),
        indice: 'Calcule d’abord le produit, puis ajoute.',
        explication: `C = ${fixe} + ${parHeure} × ${h} = ${fixe} + ${parHeure * h} = ${fixe + parHeure * h}. La location coute ${fixe + parHeure * h} €.`,
      };
    }
    // Retrouver la valeur de départ ou repérer une situation non proportionnelle.
    const c = a.entier(3, 9);
    const total = c * a.entier(2, 12);
    return {
      gabarit: 'saisie',
      consigne: `Le périmètre d’un carré de côté c est donné par P = 4 × c. Le périmètre vaut ${4 * total} cm. Calcule c, en cm.`,
      reponse: String(total),
      indice: 'Résous 4 × c = périmètre.',
      explication: `4 × c = ${4 * total}, donc c = ${4 * total} ÷ 4 = ${total} cm.`,
    };
  },
});
