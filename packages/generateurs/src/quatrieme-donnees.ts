// 4e, données, probabilités, proportionnalité et fonctions (programme 2026) : médiane, étendue, moyenne pondérée ;
// évènement contraire, deux épreuves ; quatrième proportionnelle, partage ; coefficient multiplicateur ; programmes de calcul.
// Source : programme de mathématiques du cycle 4 (arrêté du 18 février 2026, BO n°10 du 5 mars 2026), p. 50 et 52.
import { depuisEntier } from './decimaux';
import { creerGenerateur, fr, frDecimal, optionsNumeriques } from './outils';

const dec = (n: number, c: number) => frDecimal(depuisEntier(n, c));

// ─────────── Statistiques : médiane, étendue, moyenne pondérée

export const statistiques4e = creerGenerateur({
  id: 'statistiques-4e',
  competence: 'MA-C4-4E-STAT-01',
  cycle: 4,
  description: 'Déterminer la médiane et l’étendue d’une petite série ; calculer une moyenne pondérée.',
  generer(a, d) {
    if (d === 3) {
      // Moyenne pondérée : notes et effectifs, moyenne au dixième exacte.
      const notes = a.melanger([8, 10, 12, 14, 15, 16]).slice(0, 3).sort((x, y) => x - y);
      const eff = notes.map(() => a.entier(1, 6));
      const total = eff.reduce((x, y) => x + y, 0);
      const somme = notes.reduce((s, n, i) => s + n * eff[i]!, 0);
      // On ajuste le dernier effectif jusqu'à une moyenne décimale exacte au centième.
      let e3 = eff[2]!;
      while ((somme - notes[2]! * eff[2]! + notes[2]! * e3) * 100 % (total - eff[2]! + e3) !== 0) e3 += 1;
      eff[2] = e3;
      const n = eff.reduce((x, y) => x + y, 0);
      const s = notes.reduce((acc, v, i) => acc + v * eff[i]!, 0);
      return {
        gabarit: 'saisie',
        consigne: `Notes d’une classe : ${notes.map((v, i) => `${eff[i]} élève${eff[i]! > 1 ? 's' : ''} ont eu ${v}`).join(', ').replace(/1 élève ont/g, '1 élève a')}. Calcule la moyenne de la classe.`,
        reponse: depuisEntier((s * 100) / n, 2),
        indice: 'Multiplie chaque note par son effectif, additionne, puis divise par l’effectif total.',
        explication: `Somme : ${notes.map((v, i) => `${v} × ${eff[i]}`).join(' + ')} = ${s}. Effectif total : ${n}. Moyenne : ${s} ÷ ${n} = ${dec((s * 100) / n, 2)}.`,
      };
    }
    const n = d === 1 ? a.choisir([5, 7, 9]) : a.choisir([6, 8, 10]);
    const valeurs = Array.from({ length: n }, () => a.entier(2, 30));
    const tries = [...valeurs].sort((x, y) => x - y);
    if (a.suivant() < 0.4) {
      const etendue = tries[n - 1]! - tries[0]!;
      return {
        gabarit: 'saisie',
        consigne: `Série : ${valeurs.join(' ; ')}. Calcule l’étendue de cette série.`,
        reponse: String(etendue),
        indice: 'Étendue = plus grande valeur − plus petite valeur.',
        explication: `${tries[n - 1]} − ${tries[0]} = ${etendue}.`,
      };
    }
    const mediane = n % 2 ? tries[(n - 1) / 2]! : (tries[n / 2 - 1]! + tries[n / 2]!) / 2;
    return {
      gabarit: 'saisie',
      consigne: `Série : ${valeurs.join(' ; ')}. Détermine la médiane de cette série.`,
      reponse: depuisEntier(mediane * 10, 1),
      indice: 'Range les valeurs dans l’ordre croissant, puis cherche la valeur du milieu.',
      explication: n % 2
        ? `Rangées : ${tries.join(' ; ')}. Il y a ${n} valeurs : la médiane est la ${(n + 1) / 2}e, soit ${mediane}.`
        : `Rangées : ${tries.join(' ; ')}. Il y a ${n} valeurs : la médiane est entre la ${n / 2}e et la ${n / 2 + 1}e, soit (${tries[n / 2 - 1]} + ${tries[n / 2]}) ÷ 2 = ${dec(mediane * 10, 1)}.`,
    };
  },
});

// ─────────── Probabilités : évènement contraire, deux épreuves

export const probabilites4e = creerGenerateur({
  id: 'probabilites-4e',
  competence: 'MA-C4-4E-PROBA-01',
  cycle: 4,
  description: 'Calculer la probabilité d’un évènement et de son contraire ; expériences à deux épreuves.',
  generer(a, d) {
    if (d === 1) {
      const den = a.choisir([4, 5, 8, 10, 20]);
      const num = a.entier(1, den - 1);
      return {
        gabarit: 'qcm',
        consigne: `La probabilité qu’un évènement A se réalise est ${num}/${den}. Quelle est la probabilité de l’évènement contraire de A ?`,
        options: optionsNumeriques(a, `${den - num}/${den}`, [`${num}/${den}`, `${den}/${num}`, `1/${den}`], () => `${a.entier(1, den - 1)}/${den + 1}`),
        reponse: `${den - num}/${den}`,
        indice: 'p(A) + p(contraire de A) = 1.',
        explication: `1 − ${num}/${den} = ${den - num}/${den}.`,
      };
    }
    const cas: [string, string, string[], string][] = [
      ['On lance deux pièces équilibrées. Quelle est la probabilité d’obtenir deux fois pile ?', '1/4', ['1/2', '2/4', '1/3'], 'Issues : PP, PF, FP, FF. Une seule est favorable : 1/4.'],
      ['On lance deux pièces équilibrées. Quelle est la probabilité d’obtenir une seule fois pile ?', '1/2', ['1/4', '1/3', '3/4'], 'Issues : PP, PF, FP, FF. Deux sont favorables : 2/4 = 1/2.'],
      ['On lance deux pièces équilibrées. Quelle est la probabilité d’obtenir au moins un pile ?', '3/4', ['1/2', '1/4', '2/3'], 'Seule FF ne contient pas pile : 1 − 1/4 = 3/4.'],
      ['On lance une pièce et un dé équilibrés. Quelle est la probabilité d’obtenir pile et 6 ?', '1/12', ['1/6', '1/2', '1/8'], '2 × 6 = 12 issues équiprobables, une seule favorable : 1/12.'],
      ['On lance deux dés équilibrés. Quelle est la probabilité d’obtenir un double ?', '1/6', ['1/36', '1/12', '2/6'], '36 issues, dont 6 doubles : 6/36 = 1/6.'],
      ['On lance deux dés équilibrés. Quelle est la probabilité que la somme fasse 12 ?', '1/36', ['1/12', '1/6', '2/36'], 'Seule l’issue (6 ; 6) donne 12 : 1/36.'],
      ['On lance deux dés équilibrés. Quelle est la probabilité que la somme fasse 7 ?', '1/6', ['1/12', '7/36', '1/7'], '(1;6), (2;5), (3;4), (4;3), (5;2), (6;1) : 6/36 = 1/6.'],
      ['On lance une pièce et un dé équilibrés. Quelle est la probabilité d’obtenir face et un nombre pair ?', '1/4', ['1/2', '1/6', '1/3'], 'Face : 1/2. Pair : 3/6. 3 issues favorables sur 12 : 1/4.'],
    ];
    if (a.suivant() < 0.5) {
      // Tirage avec remise de deux boules : produit des probabilités.
      const r = a.entier(1, 6);
      const b = a.entier(1, 6);
      const n = r + b;
      const reponse = `${r * r}/${n * n}`;
      return {
        gabarit: 'qcm',
        consigne: `Une urne contient ${r} boule${r > 1 ? 's' : ''} rouge${r > 1 ? 's' : ''} et ${b} bleue${b > 1 ? 's' : ''}. On tire une boule, on la remet, puis on en tire une deuxième. Quelle est la probabilité d’obtenir deux boules rouges ?`,
        options: optionsNumeriques(a, reponse, [`${r}/${n}`, `${2 * r}/${n}`, `${r * r}/${n}`], () => `${a.entier(1, n * n - 1)}/${n * n}`),
        reponse,
        indice: 'Les deux tirages sont indépendants : multiplie les probabilités.',
        explication: `Rouge au premier tirage : ${r}/${n}. Rouge au second : ${r}/${n}. ${r}/${n} × ${r}/${n} = ${reponse}.`,
      };
    }
    const [q, r, pieges, e] = a.choisir(d === 2 ? cas.slice(0, 4) : cas.slice(4));
    return {
      gabarit: 'qcm', consigne: q, options: optionsNumeriques(a, r, pieges, () => `1/${a.entier(2, 9)}`), reponse: r,
      indice: 'Dresse la liste des issues (arbre ou tableau), puis compte les issues favorables.',
      explication: e,
    };
  },
});

// ─────────── Quatrième proportionnelle, partage proportionnel

export const quatriemeProportionnelle4e = creerGenerateur({
  id: 'quatrieme-proportionnelle-4e',
  competence: 'MA-C4-4E-PROP-01',
  cycle: 4,
  description: 'Déterminer une quatrième proportionnelle ; partager une quantité proportionnellement.',
  generer(a, d) {
    if (d < 3) {
      const u = a.entier(2, 12) * (d === 1 ? 1 : 0.5);
      const x1 = a.entier(2, 9);
      const x2 = x1 + a.entier(1, 8);
      const y1 = x1 * u;
      const y2 = x2 * u;
      const contextes = [
        [`${x1} kg de pommes coutent ${dec(y1 * 10, 1)} €.`, `Combien coutent ${x2} kg, en euros ?`],
        [`Une voiture consomme ${dec(y1 * 10, 1)} L pour ${fr(x1 * 100)} km.`, `Combien consomme-t-elle pour ${fr(x2 * 100)} km, en litres ?`],
        [`${x1} cahiers pèsent ${dec(y1 * 10, 1)} hg.`, `Combien pèsent ${x2} cahiers, en hg ?`],
      ];
      const [donnee, question] = a.choisir(contextes);
      return {
        gabarit: 'saisie',
        consigne: `${donnee} ${question}`,
        reponse: depuisEntier(y2 * 10, 1),
        indice: 'Produit en croix : y2 = y1 × x2 ÷ x1.',
        explication: `${dec(y1 * 10, 1)} × ${x2} ÷ ${x1} = ${dec(y2 * 10, 1)}.`,
      };
    }
    const p1 = a.entier(1, 5);
    const p2 = p1 + a.entier(1, 4);
    const total = (p1 + p2) * a.entier(5, 40);
    return {
      gabarit: 'saisie',
      consigne: `Deux amis partagent ${fr(total)} € dans le rapport ${p1} : ${p2}. Combien reçoit le premier, en euros ?`,
      reponse: String((total * p1) / (p1 + p2)),
      indice: `Partage en ${p1 + p2} parts égales.`,
      explication: `${p1} + ${p2} = ${p1 + p2} parts. Une part : ${fr(total)} ÷ ${p1 + p2} = ${total / (p1 + p2)} €. Le premier reçoit ${p1} × ${total / (p1 + p2)} = ${fr((total * p1) / (p1 + p2))} €.`,
    };
  },
});

// ─────────── Pourcentages et coefficient multiplicateur

export const coefficientMultiplicateur4e = creerGenerateur({
  id: 'coefficient-multiplicateur-4e',
  competence: 'MA-C4-4E-PCT-01',
  cycle: 4,
  description: 'Traduire une augmentation ou une diminution en pourcentage par un coefficient multiplicateur et l’appliquer.',
  generer(a, d) {
    const p = a.choisir([5, 10, 15, 20, 25, 30, 40, 50]);
    const hausse = a.suivant() < 0.5;
    const coef = hausse ? 100 + p : 100 - p;
    if (d === 1) {
      return {
        gabarit: 'qcm',
        consigne: `Par quel nombre multiplie-t-on un prix pour ${hausse ? 'l’augmenter' : 'le diminuer'} de ${p} % ?`,
        options: optionsNumeriques(a, dec(coef, 2), [dec(p, 2), dec(hausse ? 100 - p : 100 + p, 2), String(p)], () => dec(coef + 5, 2)),
        reponse: dec(coef, 2),
        indice: `${hausse ? 'Augmenter' : 'Diminuer'} de ${p} %, c’est multiplier par 1 ${hausse ? '+' : '−'} ${p}/100.`,
        explication: `1 ${hausse ? '+' : '−'} ${dec(p, 2)} = ${dec(coef, 2)}.`,
      };
    }
    const prix = a.entier(2, 40) * 10;
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `Un article coute ${prix} €. Son prix ${hausse ? 'augmente' : 'baisse'} de ${p} %. Calcule le nouveau prix, en euros.`,
        reponse: depuisEntier(prix * coef, 2),
        indice: 'Multiplie le prix par le coefficient multiplicateur.',
        explication: `${prix} × ${dec(coef, 2)} = ${dec(prix * coef, 2)} €.`,
      };
    }
    // Retrouver le prix initial.
    const final = prix * coef;
    return {
      gabarit: 'saisie',
      consigne: `Après ${hausse ? 'une hausse' : 'une baisse'} de ${p} %, un article coute ${dec(final, 2)} €. Quel était son prix initial, en euros ?`,
      reponse: String(prix),
      indice: 'Divise le prix final par le coefficient multiplicateur.',
      explication: `${dec(final, 2)} ÷ ${dec(coef, 2)} = ${prix}. Le prix initial était ${prix} €.`,
    };
  },
});

// ─────────── Programmes de calcul : appliquer, remonter

export const programmeCalcul4e = creerGenerateur({
  id: 'programme-calcul-4e',
  competence: 'MA-C4-4E-FONC-01',
  cycle: 4,
  description: 'Appliquer un programme de calcul à un nombre relatif, retrouver le nombre de départ, l’écrire avec une lettre.',
  generer(a, d) {
    const k = a.entier(2, 6);
    const b = a.entier(1, 12);
    if (d === 1) {
      const x = a.entier(-9, 9);
      const r = (x + b) * k;
      return {
        gabarit: 'saisie',
        consigne: `Programme : choisir un nombre, ajouter ${b}, multiplier le résultat par ${k}. Quel résultat obtient-on en choisissant ${x < 0 ? `−${-x}` : x} ?`,
        reponse: r < 0 ? `−${-r}` : String(r),
        indice: 'Applique les étapes dans l’ordre.',
        explication: `${x < 0 ? `−${-x}` : x} + ${b} = ${x + b}. ${x + b} × ${k} = ${r}.`.replace(/(^|\s)-(\d)/g, '$1−$2'),
      };
    }
    if (d === 2) {
      const x = a.entier(1, 20);
      const r = k * x + b;
      return {
        gabarit: 'saisie',
        consigne: `Programme : choisir un nombre, le multiplier par ${k}, ajouter ${b}. On obtient ${r}. Quel nombre a-t-on choisi ?`,
        reponse: String(x),
        indice: 'Remonte le programme en faisant les opérations inverses, dans l’ordre inverse.',
        explication: `${r} − ${b} = ${r - b}. ${r - b} ÷ ${k} = ${x}. On a choisi ${x}.`,
      };
    }
    const reponse = `${k}x + ${k * b}`;
    return {
      gabarit: 'qcm',
      consigne: `Programme : choisir un nombre x, ajouter ${b}, multiplier le résultat par ${k}. Quelle expression donne le résultat ?`,
      options: [...new Set([reponse, `x + ${b} × ${k}`, `${k}x + ${b}`, `${b}x + ${k}`, `${k}x + ${b + k}`])].slice(0, 4).sort(),
      reponse,
      indice: 'Écris (x + b) × k, puis développe.',
      explication: `(x + ${b}) × ${k} = ${k}x + ${k * b}.`,
    };
  },
});
