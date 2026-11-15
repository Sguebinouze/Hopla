// CM2, résolution de problèmes, proportionnalité et probabilités.
// Source : programme de mathématiques du cycle 3 (BO n°16 du 17 avril 2025).
// Au cours moyen, la proportionnalité se traite par la linéarité seulement : ni tableau, ni coefficient, ni produit en croix.
import { depuisEntier } from './decimaux';
import { creerGenerateur, fr, frDecimal, type Aleatoire } from './outils';

const PRENOMS = ['Léa', 'Tom', 'Inès', 'Hugo', 'Nora', 'Sami', 'Jade', 'Malik'];

/** Montant en centimes écrit à la française : 1050 → « 10,50 », 700 → « 7 ». */
export function euros(centimes: number): string {
  const e = Math.floor(centimes / 100);
  const c = centimes % 100;
  return c === 0 ? fr(e) : `${fr(e)},${String(c).padStart(2, '0')}`;
}
/** Réponse normalisée d'un montant en centimes : 1050 → « 10,5 ». */
const reponseEuros = (centimes: number) => depuisEntier(centimes, 2);
/** Un prix en centimes, multiple de 5 centimes. */
const prix = (a: Aleatoire, min: number, max: number) => 5 * a.entier(min * 20, max * 20);

// ─────────── Problèmes à plusieurs étapes

export const problemesEtapesCm2 = creerGenerateur({
  id: 'problemes-etapes-cm2',
  competence: 'MA-C3-CM2-PB-01',
  cycle: 3,
  description: 'Problèmes additifs et mixtes en plusieurs étapes, avec des entiers ou des décimaux.',
  generer(a, d) {
    const p = a.choisir(PRENOMS);
    if (d === 1) {
      if (a.suivant() < 0.5) {
        const depart = a.entier(20, 60);
        const descendent = a.entier(3, depart - 5);
        const montent = a.entier(2, 30);
        const r = depart - descendent + montent;
        return {
          gabarit: 'saisie',
          consigne: `Un bus part avec ${depart} passagers. Au premier arrêt, ${descendent} personnes descendent et ${montent} montent. Combien y a-t-il de passagers maintenant ?`,
          reponse: String(r),
          indice: 'Retire d’abord ceux qui descendent, puis ajoute ceux qui montent.',
          explication: `${depart} − ${descendent} = ${depart - descendent}. ${depart - descendent} + ${montent} = ${r}. Il y a ${r} passagers.`,
        };
      }
      const n = a.entier(10_000, 999_999);
      const partis = a.entier(100, 5000);
      const arrives = a.entier(100, 5000);
      const r = n - partis + arrives;
      return {
        gabarit: 'saisie',
        consigne: `Une ville compte ${fr(n)} habitants. Cette année, ${fr(partis)} habitants sont partis et ${fr(arrives)} sont arrivés. Combien d’habitants compte-t-elle maintenant ?`,
        reponse: String(r),
        indice: 'Ceux qui partent font baisser le nombre d’habitants, ceux qui arrivent le font monter.',
        explication: `${fr(n)} − ${fr(partis)} = ${fr(n - partis)}. ${fr(n - partis)} + ${fr(arrives)} = ${fr(r)}. La ville compte ${fr(r)} habitants.`,
      };
    }
    if (d === 2) {
      if (a.suivant() < 0.5) {
        const q = a.entier(2, 6);
        const pu = prix(a, 1, 4);
        const t = prix(a, 2, 9);
        const depense = q * pu + t;
        const billet = [1000, 2000, 5000].find((b) => b > depense)!;
        const r = billet - depense;
        return {
          gabarit: 'saisie',
          consigne: `${p} achète ${q} cahiers à ${euros(pu)} € l’un et une trousse à ${euros(t)} €. ${p} paie avec un billet de ${euros(billet)} €. Combien lui rend-on ?`,
          reponse: reponseEuros(r),
          indice: 'Calcule d’abord le prix des cahiers, puis la dépense totale.',
          explication: `Cahiers : ${q} × ${euros(pu)} = ${euros(q * pu)} €. Dépense : ${euros(q * pu)} + ${euros(t)} = ${euros(depense)} €. Monnaie : ${euros(billet)} − ${euros(depense)} = ${euros(r)} €.`,
        };
      }
      const caisses = a.entier(5, 40);
      const m1 = a.entier(12, 60);
      const sacs = a.entier(5, 40);
      const m2 = a.entier(5, 50);
      const r = caisses * m1 + sacs * m2;
      return {
        gabarit: 'saisie',
        consigne: `Un camion transporte ${caisses} caisses de ${m1} kg et ${sacs} sacs de ${m2} kg. Quelle masse transporte-t-il en tout ? Réponds en kg.`,
        reponse: String(r),
        indice: 'Calcule la masse des caisses, puis celle des sacs.',
        explication: `Caisses : ${caisses} × ${m1} = ${fr(caisses * m1)} kg. Sacs : ${sacs} × ${m2} = ${fr(sacs * m2)} kg. Total : ${fr(caisses * m1)} + ${fr(sacs * m2)} = ${fr(r)} kg.`,
      };
    }
    if (a.suivant() < 0.5) {
      const eleves = a.entier(18, 30);
      const car = 10 * a.entier(15, 60);
      const entree = a.entier(3, 9);
      const total = car + eleves * entree;
      const cooperative = 10 * a.entier(5, Math.floor((total - 10) / 10));
      const r = total - cooperative;
      return {
        gabarit: 'saisie',
        consigne: `${eleves} élèves vont au musée. Le car coute ${fr(car)} € et chaque entrée coute ${entree} €. La coopérative de l’école paie ${fr(cooperative)} €. Combien reste-t-il à payer ?`,
        reponse: String(r),
        indice: 'Calcule le prix des entrées, puis la dépense totale, puis ce qui reste.',
        explication: `Entrées : ${eleves} × ${entree} = ${eleves * entree} €. Dépense totale : ${fr(car)} + ${eleves * entree} = ${fr(total)} €. Reste : ${fr(total)} − ${fr(cooperative)} = ${fr(r)} €.`,
      };
    }
    const amis = a.entier(2, 5);
    const q = a.entier(2, 4);
    const pu = prix(a, 6, 12);
    let boisson = prix(a, 1, 4);
    while ((q * pu + boisson) % (amis * 5) !== 0) boisson += 5;
    const total = q * pu + boisson;
    const r = total / amis;
    return {
      gabarit: 'saisie',
      consigne: `${amis} amis achètent ${q} pizzas à ${euros(pu)} € l’une et une boisson à ${euros(boisson)} €. Ils partagent la dépense en parts égales. Combien paie chacun ?`,
      reponse: reponseEuros(r),
      indice: 'Calcule le prix des pizzas, puis la dépense totale, puis partage.',
      explication: `Pizzas : ${q} × ${euros(pu)} = ${euros(q * pu)} €. Total : ${euros(q * pu)} + ${euros(boisson)} = ${euros(total)} €. Part de chacun : ${euros(total)} ÷ ${amis} = ${euros(r)} €.`,
    };
  },
});

// ─────────── Comparaison multiplicative

export const comparaisonMultiplicativeCm2 = creerGenerateur({
  id: 'comparaison-multiplicative-cm2',
  competence: 'MA-C3-CM2-PB-02',
  cycle: 3,
  description: 'Problèmes de comparaison multiplicative : fois plus, fois moins, combien de fois.',
  generer(a, d) {
    const k = a.entier(2, d === 1 ? 5 : 9);
    const [p1, p2] = a.melanger(PRENOMS);
    if (d === 1) {
      const n = a.entier(4, 30);
      if (a.suivant() < 0.5) {
        return {
          gabarit: 'saisie',
          consigne: `${p1} a ${n} billes. ${p2} en a ${k} fois plus. Combien de billes a ${p2} ?`,
          reponse: String(n * k),
          indice: '« Fois plus » : on multiplie.',
          explication: `${k} fois plus que ${n}, c’est ${n} × ${k} = ${n * k}. ${p2} a ${n * k} billes.`,
        };
      }
      return {
        gabarit: 'saisie',
        consigne: `${p1} a ${n * k} billes. ${p2} en a ${k} fois moins. Combien de billes a ${p2} ?`,
        reponse: String(n),
        indice: '« Fois moins » : on divise.',
        explication: `${k} fois moins que ${n * k}, c’est ${n * k} ÷ ${k} = ${n}. ${p2} a ${n} billes.`,
      };
    }
    if (d === 2) {
      const forme = a.entier(0, 2);
      if (forme === 0) {
        const t = 5 * a.entier(4, 60);
        return {
          gabarit: 'saisie',
          consigne: `Un vélo coute ${fr(t * k)} €. Une trottinette coute ${k} fois moins cher. Combien coute la trottinette ?`,
          reponse: String(t),
          indice: '« Fois moins » : on divise.',
          explication: `${fr(t * k)} ÷ ${k} = ${fr(t)}. La trottinette coute ${fr(t)} €.`,
        };
      }
      if (forme === 1) {
        const h = a.entier(8, 40);
        return {
          gabarit: 'saisie',
          consigne: `Une maison mesure ${h} m de haut. Une tour est ${k} fois plus haute. Quelle est la hauteur de la tour ? Réponds en m.`,
          reponse: String(h * k),
          indice: '« Fois plus » : on multiplie.',
          explication: `${h} × ${k} = ${h * k}. La tour mesure ${h * k} m.`,
        };
      }
      const chat = a.entier(2, 8);
      return {
        gabarit: 'saisie',
        consigne: `Un chien pèse ${chat * k} kg. Un chat pèse ${chat} kg. Combien de fois le chien est-il plus lourd que le chat ?`,
        reponse: String(k),
        indice: `Cherche combien de fois ${chat} est contenu dans ${chat * k}.`,
        explication: `${chat} × ${k} = ${chat * k}. Le chien est ${k} fois plus lourd que le chat.`,
      };
    }
    // Avec des décimaux.
    const dixiemes = a.entier(11, 99);
    const x = depuisEntier(dixiemes, 1);
    if (a.suivant() < 0.5) {
      const r = depuisEntier(dixiemes * k, 1);
      return {
        gabarit: 'saisie',
        consigne: `Une corde mesure ${frDecimal(x)} m. Une autre corde est ${k} fois plus longue. Quelle est sa longueur ? Réponds en m.`,
        reponse: r,
        indice: '« Fois plus » : on multiplie.',
        explication: `${frDecimal(x)} × ${k} = ${frDecimal(r)}. La seconde corde mesure ${frDecimal(r)} m.`,
      };
    }
    const grand = depuisEntier(dixiemes * k, 1);
    return {
      gabarit: 'saisie',
      consigne: `Un sac de sable pèse ${frDecimal(grand)} kg. Un sac de farine pèse ${k} fois moins. Combien pèse le sac de farine ? Réponds en kg.`,
      reponse: x,
      indice: '« Fois moins » : on divise.',
      explication: `${frDecimal(grand)} ÷ ${k} = ${frDecimal(x)}. Le sac de farine pèse ${frDecimal(x)} kg.`,
    };
  },
});

// ─────────── Proportionnalité : linéarité pour la multiplication et pour l'addition

interface Objet { nom: string; verbe: string; unite: string; dec: number; min: number; max: number }
const OBJETS: Objet[] = [
  { nom: 'pains aux raisins', verbe: 'coutent', unite: '€', dec: 2, min: 150, max: 900 },
  { nom: 'cahiers', verbe: 'coutent', unite: '€', dec: 2, min: 200, max: 1200 },
  { nom: 'kg de cerises', verbe: 'coutent', unite: '€', dec: 2, min: 400, max: 2000 },
  { nom: 'tours de piste', verbe: 'durent', unite: 'min', dec: 0, min: 6, max: 30 },
  { nom: 'briques de lait', verbe: 'pèsent', unite: 'kg', dec: 1, min: 20, max: 80 },
];
/** Écriture d'une valeur entière exprimée dans la plus petite unité de l'objet (centimes, dixièmes…). */
const ecrire = (o: Objet, v: number) => (o.dec === 2 ? euros(v) : frDecimal(depuisEntier(v, o.dec)));
/** Arrondit au multiple de 5 centimes pour des prix réalistes. */
const ajuster = (o: Objet, v: number) => (o.dec === 2 ? 5 * Math.max(1, Math.round(v / 5)) : v);

export const proportionnaliteCm2 = creerGenerateur({
  id: 'proportionnalite-cm2',
  competence: 'MA-C3-CM2-PROP-01',
  cycle: 3,
  description: 'Résoudre un problème de proportionnalité par la linéarité multiplicative ou additive.',
  generer(a, d) {
    const o = a.choisir(OBJETS);
    if (d === 1) {
      const q = a.entier(2, 6);
      const k = a.entier(2, 5);
      const v = ajuster(o, a.entier(o.min, o.max));
      const r = v * k;
      return {
        gabarit: 'saisie',
        consigne: `${q} ${o.nom} ${o.verbe} ${ecrire(o, v)} ${o.unite}. Combien ${o.verbe} ${q * k} ${o.nom} ?`,
        reponse: depuisEntier(r, o.dec),
        indice: `${q * k}, c’est combien de fois ${q} ?`,
        explication: `${q * k} ${o.nom}, c’est ${k} fois plus que ${q} ${o.nom}. Donc ${k} fois plus : ${k} × ${ecrire(o, v)} = ${ecrire(o, r)} ${o.unite}.`,
      };
    }
    if (d === 2) {
      const q = a.entier(2, 5);
      const k = a.entier(2, 5);
      const r = ajuster(o, a.entier(o.min, o.max));
      const v = r * k;
      return {
        gabarit: 'saisie',
        consigne: `${q * k} ${o.nom} ${o.verbe} ${ecrire(o, v)} ${o.unite}. Combien ${o.verbe} ${q} ${o.nom} ?`,
        reponse: depuisEntier(r, o.dec),
        indice: `${q}, c’est combien de fois moins que ${q * k} ?`,
        explication: `${q} ${o.nom}, c’est ${k} fois moins que ${q * k} ${o.nom}. Donc ${k} fois moins : ${ecrire(o, v)} ÷ ${k} = ${ecrire(o, r)} ${o.unite}.`,
      };
    }
    // Linéarité additive : 4 pains et 6 pains donnent le prix de 10 pains (ou de 2 pains par différence).
    // Au moins 2 objets dans chaque quantité citée : b ≥ 2.
    const b = a.entier(2, 3);
    const m1 = a.entier(1, 4);
    let m2 = a.entier(2, 6);
    if (m2 === m1) m2 += 1;
    const w = ajuster(o, a.entier(o.min, o.max));
    const [q1, q2, v1, v2] = [b * m1, b * m2, w * m1, w * m2];
    const somme = a.suivant() < 0.6 || q2 < q1;
    const cible = somme ? q1 + q2 : q2 - q1;
    const r = somme ? v1 + v2 : v2 - v1;
    return {
      gabarit: 'saisie',
      consigne: `${q1} ${o.nom} ${o.verbe} ${ecrire(o, v1)} ${o.unite}. ${q2} ${o.nom} ${o.verbe} ${ecrire(o, v2)} ${o.unite}. Combien ${o.verbe} ${cible} ${o.nom} ?`,
      reponse: depuisEntier(r, o.dec),
      indice: `Écris ${cible} à l’aide de ${q1} et de ${q2}.`,
      explication: somme
        ? `${cible} = ${q1} + ${q2}. On ajoute donc les deux valeurs : ${ecrire(o, v1)} + ${ecrire(o, v2)} = ${ecrire(o, r)} ${o.unite}.`
        : `${cible} = ${q2} − ${q1}. On soustrait donc les deux valeurs : ${ecrire(o, v2)} − ${ecrire(o, v1)} = ${ecrire(o, r)} ${o.unite}.`,
    };
  },
});

// ─────────── Probabilités : « a chances sur b »

interface Evenement { texte: string; test: (n: number) => boolean }

function evenementDe(a: Aleatoire): Evenement {
  const k = a.entier(2, 5);
  return a.choisir<Evenement>([
    { texte: 'un nombre pair', test: (n) => n % 2 === 0 },
    { texte: 'un nombre impair', test: (n) => n % 2 === 1 },
    { texte: `un nombre supérieur à ${k}`, test: (n) => n > k },
    { texte: `un nombre inférieur à ${k}`, test: (n) => n < k },
    { texte: 'un multiple de 3', test: (n) => n % 3 === 0 },
    { texte: `le ${k}`, test: (n) => n === k },
  ]);
}

export const probabilitesCm2 = creerGenerateur({
  id: 'probabilites-cm2',
  competence: 'MA-C3-CM2-PROBA-01',
  cycle: 3,
  description: 'Exprimer une probabilité sous la forme « a chances sur b », pour une ou deux épreuves.',
  generer(a, d) {
    if (d === 1) {
      const e = evenementDe(a);
      const issues = [1, 2, 3, 4, 5, 6].filter(e.test);
      return {
        gabarit: 'saisie',
        consigne: `On lance un dé à 6 faces numérotées de 1 à 6. Combien de chances sur 6 a-t-on d’obtenir ${e.texte} ?`,
        reponse: String(issues.length),
        indice: 'Écris les 6 issues possibles. Entoure celles qui conviennent.',
        explication: `Les issues favorables sont : ${issues.join(', ')}. Il y en a ${issues.length} sur 6. On a ${issues.length} chance${issues.length > 1 ? 's' : ''} sur 6.`,
      };
    }
    if (d === 2) {
      const couleurs = a.melanger(['rouges', 'bleues', 'vertes', 'jaunes']).slice(0, 3);
      const nombres = couleurs.map(() => a.entier(1, 9));
      const total = nombres.reduce((s, n) => s + n, 0);
      const i = a.entier(0, 2);
      const contraire = a.suivant() < 0.3;
      const favorables = contraire ? total - nombres[i]! : nombres[i]!;
      const coul = couleurs[i]!.slice(0, -1);
      const liste = couleurs.map((c, j) => `${nombres[j]} boule${nombres[j]! > 1 ? 's' : ''} ${nombres[j]! > 1 ? c : c.slice(0, -1)}`);
      return {
        gabarit: 'saisie',
        consigne: `Une urne contient ${liste[0]}, ${liste[1]} et ${liste[2]}. On tire une boule au hasard. Combien de chances sur ${total} a-t-on de ${contraire ? 'ne pas tirer' : 'tirer'} une boule ${coul} ?`,
        reponse: String(favorables),
        indice: 'Compte toutes les boules, puis celles qui réalisent l’évènement.',
        explication: `Il y a ${nombres.join(' + ')} = ${total} boules. ${contraire ? `Les boules qui ne sont pas ${couleurs[i]} sont au nombre de ${total} − ${nombres[i]} = ${favorables}.` : `Il y a ${favorables} boule${favorables > 1 ? 's' : ''} ${favorables > 1 ? couleurs[i] : coul}.`} On a ${favorables} chance${favorables > 1 ? 's' : ''} sur ${total}.`,
      };
    }
    if (a.suivant() < 0.4) {
      const evts: [string, (x: string, y: string) => boolean][] = [
        ['deux fois pile', (x, y) => x === 'P' && y === 'P'],
        ['deux fois face', (x, y) => x === 'F' && y === 'F'],
        ['une fois pile et une fois face', (x, y) => x !== y],
        ['au moins une fois pile', (x, y) => x === 'P' || y === 'P'],
      ];
      const [texte, test] = a.choisir(evts);
      const issues = ['PP', 'PF', 'FP', 'FF'];
      const bonnes = issues.filter((s) => test(s[0]!, s[1]!));
      return {
        gabarit: 'saisie',
        consigne: `On lance deux pièces de monnaie. Combien de chances sur 4 a-t-on d’obtenir ${texte} ?`,
        reponse: String(bonnes.length),
        indice: 'Fais un arbre : pile (P) ou face (F) pour la première pièce, puis pour la seconde.',
        explication: `Les 4 issues sont PP, PF, FP et FF. Celles qui conviennent : ${bonnes.join(', ')}. On a ${bonnes.length} chance${bonnes.length > 1 ? 's' : ''} sur 4.`,
      };
    }
    const double = a.suivant() < 0.2;
    const s = a.entier(2, 12);
    const couples: string[] = [];
    for (let x = 1; x <= 6; x++) for (let y = 1; y <= 6; y++) if (double ? x === y : x + y === s) couples.push(`(${x} ; ${y})`);
    return {
      gabarit: 'saisie',
      consigne: double
        ? 'On lance deux dés à 6 faces. Combien de chances sur 36 a-t-on d’obtenir un double ?'
        : `On lance deux dés à 6 faces. Combien de chances sur 36 a-t-on que la somme des deux dés soit égale à ${s} ?`,
      reponse: String(couples.length),
      indice: 'Fais un tableau à double entrée : 6 lignes pour le premier dé, 6 colonnes pour le second.',
      explication: `Le tableau compte 6 × 6 = 36 cases. Les cases qui conviennent : ${couples.join(', ')}. On a ${couples.length} chance${couples.length > 1 ? 's' : ''} sur 36.`,
    };
  },
});
