// 6e, organisation et gestion de données, probabilités.
// Source : programme de mathématiques du cycle 3 (BO n°16 du 17 avril 2025), p. 25 et 26.
import { depuisEntier } from './decimaux';
import { creerGenerateur, frDecimal, optionsNumeriques } from './outils';

// ─────────── Lire et filtrer des données

const JOURS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];
type Releve = { titre: string; etiquettes: string[]; unite: string; min: number; max: number; plus: string; moins: string; critere: (seuil: number) => string };
const RELEVES: Releve[] = [
  { titre: 'Températures relevées à midi', etiquettes: JOURS, unite: '°C', min: 6, max: 24, plus: 'Quel jour a-t-il fait le plus chaud ?', moins: 'Quel jour a-t-il fait le plus froid ?', critere: (s) => `Combien de jours la température a-t-elle dépassé ${s} °C ?` },
  { titre: 'Livres empruntés à la bibliothèque', etiquettes: JOURS, unite: 'livres', min: 12, max: 60, plus: 'Quel jour a-t-on emprunté le plus de livres ?', moins: 'Quel jour a-t-on emprunté le moins de livres ?', critere: (s) => `Combien de jours a-t-on emprunté plus de ${s} livres ?` },
  { titre: 'Repas servis à la cantine', etiquettes: JOURS, unite: 'repas', min: 150, max: 320, plus: 'Quel jour a-t-on servi le plus de repas ?', moins: 'Quel jour a-t-on servi le moins de repas ?', critere: (s) => `Combien de jours a-t-on servi plus de ${s} repas ?` },
  { titre: 'Hauteur de pluie tombée', etiquettes: JOURS, unite: 'mm', min: 0, max: 30, plus: 'Quel jour a-t-il le plus plu ?', moins: 'Quel jour a-t-il le moins plu ?', critere: (s) => `Combien de jours est-il tombé plus de ${s} mm de pluie ?` },
  { titre: 'Élèves inscrits aux clubs du midi', etiquettes: ['échecs', 'chorale', 'théâtre', 'jardinage', 'robotique'], unite: 'élèves', min: 5, max: 32, plus: 'Quel club a le plus d’inscrits ?', moins: 'Quel club a le moins d’inscrits ?', critere: (s) => `Combien de clubs ont plus de ${s} inscrits ?` },
];

export const donnees6e = creerGenerateur({
  id: 'donnees-6e',
  competence: 'MA-C3-6E-STAT-01',
  cycle: 3,
  description: 'Lire un tableau de données, le filtrer selon un critère, lire un diagramme circulaire.',
  generer(a, d) {
    const r = a.choisir(RELEVES);
    // Valeurs toutes différentes : un seul maximum, un seul minimum.
    const valeurs: number[] = [];
    while (valeurs.length < 5) {
      const v = a.entier(r.min, r.max);
      if (!valeurs.includes(v)) valeurs.push(v);
    }
    const tableau = r.etiquettes.map((e, i) => `${e} : ${valeurs[i]} ${r.unite}`).join(' ; ');
    if (d === 1) {
      const plus = a.suivant() < 0.5;
      const cible = plus ? Math.max(...valeurs) : Math.min(...valeurs);
      const reponse = r.etiquettes[valeurs.indexOf(cible)]!;
      return {
        gabarit: 'qcm',
        consigne: `${r.titre} : ${tableau}. ${plus ? r.plus : r.moins}`,
        options: a.melanger([reponse, ...a.melanger(r.etiquettes.filter((e) => e !== reponse)).slice(0, 3)]),
        reponse,
        indice: `Cherche la valeur la plus ${plus ? 'grande' : 'petite'} du tableau.`,
        explication: `La valeur la plus ${plus ? 'grande' : 'petite'} est ${cible} ${r.unite} : ${reponse}.`,
      };
    }
    if (d === 2) {
      // Seuil entre la plus petite et la plus grande valeur : au moins une valeur le dépasse.
      const seuil = a.entier(Math.min(...valeurs), Math.max(...valeurs) - 1);
      const n = valeurs.filter((v) => v > seuil).length;
      return {
        gabarit: 'saisie',
        consigne: `${r.titre} : ${tableau}. ${r.critere(seuil)}`,
        reponse: String(n),
        indice: `Garde seulement les valeurs strictement plus grandes que ${seuil}.`,
        explication: `Valeurs supérieures à ${seuil} : ${valeurs.filter((v) => v > seuil).join(', ')}. Il y en a ${n}.`,
      };
    }
    // Diagramme circulaire : la part d'un secteur.
    const parts: [string, number][] = [['la moitié', 2], ['le quart', 4], ['le tiers', 3], ['le cinquième', 5], ['le dixième', 10]];
    const [nom, q] = a.choisir(parts);
    const total = q * a.entier(4, 40);
    const sujet = a.choisir([['élèves ont répondu à une enquête sur leur sport préféré', 'du football'], ['personnes ont voté pour le nom de la médiathèque', 'du nom « Les Tilleuls »'], ['visiteurs ont donné leur moyen de transport', 'du vélo']]);
    return {
      gabarit: 'saisie',
      consigne: `${total} ${sujet[0]}. Dans le diagramme circulaire, le secteur ${sujet[1]} occupe ${nom} du disque. Combien de réponses représente ce secteur ?`,
      reponse: String(total / q),
      indice: `${nom[0]!.toUpperCase()}${nom.slice(1)}, c’est diviser par ${q}.`,
      explication: `${total} ÷ ${q} = ${total / q}. Le secteur représente ${total / q} réponses.`,
    };
  },
});

// ─────────── Probabilités : un nombre entre 0 et 1, fraction, décimal, pourcentage

/** a/b → écriture décimale exacte quand b divise une puissance de 10. */
const DENOMINATEURS_DECIMAUX: Record<number, [number, number]> = { 2: [5, 1], 4: [25, 2], 5: [2, 1], 10: [1, 1], 20: [5, 2], 25: [4, 2], 50: [2, 2], 100: [1, 2] };
const decimal = (num: number, den: number) => {
  const [facteur, chiffres] = DENOMINATEURS_DECIMAUX[den]!;
  return frDecimal(depuisEntier(num * facteur, chiffres));
};

export const probabilites6e = creerGenerateur({
  id: 'probabilites-6e',
  competence: 'MA-C3-6E-PROBA-01',
  cycle: 3,
  description: 'Exprimer une probabilité par un nombre entre 0 et 1 (fraction, décimal, pourcentage), la calculer, la comparer à une fréquence.',
  generer(a, d) {
    if (d === 1) {
      const den = a.choisir([2, 4, 5, 10, 20, 25, 50, 100]);
      const num = a.entier(1, den - 1);
      return {
        gabarit: 'saisie',
        consigne: `On a ${num} chance${num > 1 ? 's' : ''} sur ${den} de gagner. Écris cette probabilité sous forme décimale.`,
        reponse: decimal(num, den),
        indice: `« ${num} chance${num > 1 ? 's' : ''} sur ${den} », c’est la fraction ${num}/${den}.`,
        explication: `La probabilité est ${num}/${den}. ${num} ÷ ${den} = ${decimal(num, den)}.`,
      };
    }
    if (d === 2) {
      const couleurs = a.melanger(['rouges', 'bleues', 'vertes', 'jaunes']).slice(0, 2) as [string, string];
      const x = a.entier(1, 9);
      const y = a.entier(1, 9);
      const total = x + y;
      const reponse = `${x}/${total}`;
      // Pièges : rapport entre les deux couleurs, événement contraire, fraction renversée.
      return {
        gabarit: 'qcm',
        consigne: `Une urne contient ${x} boule${x > 1 ? 's' : ''} ${x > 1 ? couleurs[0] : couleurs[0].slice(0, -1)} et ${y} boule${y > 1 ? 's' : ''} ${y > 1 ? couleurs[1] : couleurs[1].slice(0, -1)}. On tire une boule au hasard. Quelle est la probabilité qu’elle soit ${couleurs[0].slice(0, -1)} ?`,
        options: optionsNumeriques(a, reponse, [`${x}/${y}`, `${y}/${total}`, `${total}/${x}`], () => `${a.entier(1, total)}/${total + 1}`),
        reponse,
        indice: 'Probabilité = nombre de cas favorables ÷ nombre total de cas.',
        explication: `Il y a ${total} boules en tout, dont ${x} ${couleurs[0].slice(0, -1)}${x > 1 ? 's' : ''}. La probabilité est ${reponse}.`,
      };
    }
    // Entre 0 et 1, ou fréquence observée comparée à la probabilité.
    if (a.suivant() < 0.5) {
      const impossible = a.choisir(['1,2', '4/3', '1,5', '7/5', '2']);
      const possibles = a.melanger(['0,7', '3/4', '0', '1', '0,25', '2/5', '0,9']).slice(0, 3);
      return {
        gabarit: 'qcm',
        consigne: 'Lequel de ces nombres ne peut pas être une probabilité ?',
        options: a.melanger([impossible, ...possibles]),
        reponse: impossible,
        indice: 'Une probabilité est toujours comprise entre 0 et 1.',
        explication: `Une probabilité est comprise entre 0 et 1. ${impossible} est plus grand que 1 : ce n’est pas une probabilité.`,
      };
    }
    const lancers = a.choisir([20, 50, 100]);
    const piles = lancers / 2 + a.entier(-lancers / 10, lancers / 10);
    const freq = frDecimal(depuisEntier(piles * (100 / lancers), 2));
    return {
      gabarit: 'saisie',
      consigne: `Tom lance une pièce ${lancers} fois. Il obtient ${piles} fois pile. Calcule la fréquence de pile, sous forme décimale.`,
      reponse: freq,
      indice: 'Fréquence = nombre de piles ÷ nombre de lancers.',
      explication: `${piles} ÷ ${lancers} = ${freq}. La fréquence ${freq === '0,5' ? 'est égale à' : 'est proche de'} la probabilité 0,5.`,
    };
  },
});
