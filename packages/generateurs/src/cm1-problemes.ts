// CM1, résolution de problèmes et proportionnalité.
// Source : programme de mathématiques du cycle 3 (BO n°16 du 17 avril 2025), pages 8 et 26.
// Au cours moyen, pas de tableau de proportionnalité : on raisonne sur les quantités (fois plus, somme).
import { depuisEntier } from './decimaux';
import { creerGenerateur, fr, frDecimal, type Aleatoire } from './outils';

const FILLES = ['Lucie', 'Inès', 'Nora', 'Jade', 'Lina', 'Rose', 'Elsa', 'Maya'];
const GARCONS = ['Léo', 'Sami', 'Hugo', 'Malo', 'Noé', 'Tom', 'Enzo', 'Paul'];

function personne(a: Aleatoire) {
  const fille = a.suivant() < 0.5;
  return { nom: a.choisir(fille ? FILLES : GARCONS), il: fille ? 'elle' : 'il', Il: fille ? 'Elle' : 'Il' };
}

/** Prix en euros à partir de centimes, toujours avec deux décimales : 640 → « 6,40 ». */
const prix = (c: number) => `${fr(Math.floor(c / 100))},${String(c % 100).padStart(2, '0')}`;
const euros = (c: number) => frDecimal(depuisEntier(c, 2));
/** « que » s'élide devant une voyelle : « qu’Elsa », « que Tom ». */
export const que = (nom: string) => (/^[AEIOUYÉÈÊH]/.test(nom) ? `qu’${nom}` : `que ${nom}`);

// ─────────── Problèmes additifs et mixtes en deux ou trois étapes

export const problemesEtapesCm1 = creerGenerateur({
  id: 'problemes-etapes-cm1',
  competence: 'MA-C3-CM1-PB-01',
  cycle: 3,
  description: 'Problèmes additifs ou mixtes en deux ou trois étapes, avec des entiers ou des prix décimaux.',
  generer(a, d) {
    const p = personne(a);
    const forme = a.entier(0, 1);
    if (d === 1 && forme === 0) {
      const x = a.entier(500, 9999);
      const y = a.entier(50, 999);
      const z = a.entier(50, 999);
      const r = x + y - z;
      return {
        gabarit: 'saisie',
        consigne: `Un club compte ${fr(x)} adhérents. En septembre, ${y} personnes s’inscrivent et ${z} partent. Combien d’adhérents compte le club fin septembre ?`,
        reponse: String(r),
        indice: 'Fais le calcul en deux étapes : les arrivées, puis les départs.',
        explication: `D’abord : ${fr(x)} + ${y} = ${fr(x + y)}. Ensuite : ${fr(x + y)} − ${z} = ${fr(r)}. Le club compte ${fr(r)} adhérents.`,
      };
    }
    if (d === 1) {
      const [l, m, me] = [a.entier(120, 480), a.entier(120, 480), a.entier(120, 480)];
      const total = l + m + me + a.entier(100, 900);
      const r = total - (l + m + me);
      return {
        gabarit: 'saisie',
        consigne: `Un camion doit parcourir ${fr(total)} km. Il roule ${l} km lundi, ${m} km mardi et ${me} km mercredi. Combien de kilomètres lui reste-t-il à parcourir ?`,
        reponse: String(r),
        indice: 'Calcule d’abord la distance déjà parcourue.',
        explication: `Distance parcourue : ${l} + ${m} + ${me} = ${fr(l + m + me)} km. Il reste ${fr(total)} − ${fr(l + m + me)} = ${fr(r)} km.`,
      };
    }
    if (d === 2 && forme === 0) {
      const n = a.entier(2, 6);
      const pu = a.entier(2, 5);
      const stylo = a.entier(1, 4);
      const billet = n * pu + stylo < 20 ? 20 : 50;
      const r = billet - (n * pu + stylo);
      return {
        gabarit: 'saisie',
        consigne: `${p.nom} achète ${n} cahiers à ${pu} € et un stylo à ${stylo} €. ${p.Il} paie avec un billet de ${billet} €. Combien lui rend-on ?`,
        reponse: String(r),
        indice: 'Calcule le prix des cahiers, puis le prix total, puis la monnaie rendue.',
        explication: `Cahiers : ${n} × ${pu} = ${n * pu} €. Total : ${n * pu} + ${stylo} = ${n * pu + stylo} €. Monnaie : ${billet} − ${n * pu + stylo} = ${r} €.`,
      };
    }
    if (d === 2) {
      const rangees = a.entier(8, 30);
      const places = a.entier(12, 40);
      const vendues = a.entier(10, rangees * places - 1);
      const r = rangees * places - vendues;
      return {
        gabarit: 'saisie',
        consigne: `Un théâtre a ${rangees} rangées de ${places} places. ${fr(vendues)} places sont vendues. Combien de places restent libres ?`,
        reponse: String(r),
        indice: 'Calcule d’abord le nombre total de places.',
        explication: `Nombre de places : ${rangees} × ${places} = ${fr(rangees * places)}. Places libres : ${fr(rangees * places)} − ${fr(vendues)} = ${fr(r)}.`,
      };
    }
    if (forme === 0) {
      // Trois étapes avec des prix décimaux, calculés en centimes.
      const n = a.entier(2, 4);
      const livre = a.entier(250, 990);
      const magazine = a.entier(150, 690);
      const total = n * livre + magazine;
      const billet = total < 2000 ? 2000 : total < 5000 ? 5000 : 10000;
      const r = billet - total;
      return {
        gabarit: 'saisie',
        consigne: `${p.nom} achète ${n} livres à ${prix(livre)} € chacun et un magazine à ${prix(magazine)} €. ${p.Il} paie avec un billet de ${billet / 100} €. Combien lui rend-on ? Réponds en euros.`,
        reponse: depuisEntier(r, 2),
        indice: 'Calcule le prix des livres, puis le total, puis la monnaie rendue.',
        explication: `Livres : ${n} × ${prix(livre)} = ${prix(n * livre)} €. Total : ${prix(n * livre)} + ${prix(magazine)} = ${prix(total)} €. Monnaie : ${billet / 100} − ${prix(total)} = ${euros(r)} €.`,
      };
    }
    const eleves = a.entier(18, 30);
    const car = a.entier(150, 450);
    const entree = a.entier(3, 12);
    const r = car + eleves * entree;
    return {
      gabarit: 'saisie',
      consigne: `Une classe de ${eleves} élèves va au musée. Le car coute ${car} €. L’entrée coute ${entree} € par élève. Combien coute la sortie en tout ?`,
      reponse: String(r),
      indice: 'Calcule d’abord le prix de toutes les entrées.',
      explication: `Entrées : ${eleves} × ${entree} = ${eleves * entree} €. Total : ${car} + ${eleves * entree} = ${r} €.`,
    };
  },
});

// ─────────── Comparaison multiplicative

const OBJETS = ['billes', 'images', 'cartes', 'timbres', 'perles', 'autocollants'];
const ECARTS: { grand: string; petit: string; unite: string; question: string }[] = [
  { grand: 'Un vélo coute', petit: 'Une trottinette coute', unite: '€', question: 'Combien de fois le vélo coute-t-il plus cher que la trottinette ?' },
  { grand: 'Un immeuble mesure', petit: 'Une maison mesure', unite: 'm', question: 'Combien de fois l’immeuble est-il plus haut que la maison ?' },
  { grand: 'Un camion pèse', petit: 'Une voiture pèse', unite: 'kg', question: 'Combien de fois le camion est-il plus lourd que la voiture ?' },
];

export const comparaisonMultiplicativeCm1 = creerGenerateur({
  id: 'comparaison-multiplicative-cm1',
  competence: 'MA-C3-CM1-PB-02',
  cycle: 3,
  description: 'Problèmes de comparaison multiplicative : fois plus, fois moins, combien de fois.',
  generer(a, d) {
    const A = personne(a);
    let B = personne(a);
    while (B.nom === A.nom) B = personne(a);
    const objet = a.choisir(OBJETS);
    const k = a.entier(2, d === 1 ? 5 : 9);
    const m = a.entier(3, d === 1 ? 20 : 60);
    const forme = d === 1 ? a.entier(0, 1) : d === 2 ? a.entier(1, 2) : a.entier(2, 4);
    if (forme === 0) {
      return {
        gabarit: 'saisie',
        consigne: `${A.nom} a ${m} ${objet}. ${B.nom} en a ${k} fois plus. Combien ${B.nom} en a-t-${B.il} ?`,
        reponse: String(k * m),
        indice: `« ${k} fois plus » : ${B.nom} en a plus ${que(A.nom)}.`,
        explication: `${k} fois plus que ${m}, c’est ${k} × ${m} = ${k * m}. ${B.nom} a ${k * m} ${objet}.`,
      };
    }
    if (forme === 1) {
      return {
        gabarit: 'saisie',
        consigne: `${A.nom} a ${k * m} ${objet}. ${B.nom} en a ${k} fois moins. Combien ${B.nom} en a-t-${B.il} ?`,
        reponse: String(m),
        indice: `« ${k} fois moins » : on partage en ${k} parts égales.`,
        explication: `${k} fois moins que ${k * m}, c’est ${k * m} ÷ ${k} = ${m}. ${B.nom} a ${m} ${objet}.`,
      };
    }
    if (forme === 2) {
      // Le mot « plus » ne conduit pas toujours à une multiplication.
      return {
        gabarit: 'saisie',
        consigne: `${B.nom} a ${k * m} ${objet}. C’est ${k} fois plus ${que(A.nom)}. Combien ${A.nom} en a-t-${A.il} ?`,
        reponse: String(m),
        indice: `Qui en a le plus ? ${B.nom} en a ${k} fois plus, donc ${A.nom} en a ${k} fois moins.`,
        explication: `${A.nom} en a ${k} fois moins ${que(B.nom)}. ${k * m} ÷ ${k} = ${m}. ${A.nom} a ${m} ${objet}.`,
      };
    }
    if (forme === 3) {
      return {
        gabarit: 'saisie',
        consigne: `${B.nom} a ${m} ${objet}. C’est ${k} fois moins ${que(A.nom)}. Combien ${A.nom} en a-t-${A.il} ?`,
        reponse: String(k * m),
        indice: `Qui en a le plus ? ${B.nom} en a ${k} fois moins, donc ${A.nom} en a ${k} fois plus.`,
        explication: `${A.nom} en a ${k} fois plus ${que(B.nom)}. ${k} × ${m} = ${k * m}. ${A.nom} a ${k * m} ${objet}.`,
      };
    }
    const e = a.choisir(ECARTS);
    const petit = e.unite === 'kg' ? 100 * a.entier(5, 15) : e.unite === 'm' ? a.entier(6, 12) : 10 * a.entier(3, 15);
    return {
      gabarit: 'saisie',
      consigne: `${e.grand} ${fr(k * petit)} ${e.unite}. ${e.petit} ${fr(petit)} ${e.unite}. ${e.question}`,
      reponse: String(k),
      indice: `Cherche par combien il faut multiplier ${fr(petit)} pour obtenir ${fr(k * petit)}.`,
      explication: `${fr(petit)} × ${k} = ${fr(k * petit)}. C’est ${k} fois plus.`,
    };
  },
});

// ─────────── Proportionnalité

const CONTEXTES: { objet: string; verbe: string; unite: string; mini: number; maxi: number }[] = [
  { objet: 'pains aux raisins', verbe: 'coutent', unite: '€', mini: 3, maxi: 12 },
  { objet: 'cahiers', verbe: 'coutent', unite: '€', mini: 3, maxi: 20 },
  { objet: 'paquets de riz', verbe: 'pèsent', unite: 'g', mini: 500, maxi: 3000 },
  { objet: 'bouteilles de jus', verbe: 'contiennent', unite: 'cL', mini: 50, maxi: 600 },
  { objet: 'tours de piste', verbe: 'mesurent', unite: 'm', mini: 200, maxi: 1600 },
];

export const proportionnaliteCm1 = creerGenerateur({
  id: 'proportionnalite-cm1',
  competence: 'MA-C3-CM1-PROP-01',
  cycle: 3,
  description: 'Résoudre un problème de proportionnalité en raisonnant sur les quantités, sans tableau.',
  generer(a, d) {
    const c = a.choisir(CONTEXTES);
    const enonce = (q: number, v: number) => `${q} ${c.objet} ${c.verbe} ${fr(v)} ${c.unite}.`;
    const question = (q: number) => `Combien ${c.verbe} ${q} ${c.objet} ?`;
    if (d === 1) {
      const q = a.entier(2, 6);
      const v = a.entier(c.mini, c.maxi);
      const k = a.entier(2, 5);
      return {
        gabarit: 'saisie',
        consigne: `${enonce(q, v)} ${question(k * q)}`,
        reponse: String(k * v),
        indice: `${k * q}, c’est combien de fois ${q} ?`,
        explication: `${k * q} ${c.objet}, c’est ${k} fois plus que ${q} ${c.objet}. Donc ${k} fois plus : ${k} × ${fr(v)} = ${fr(k * v)} ${c.unite}.`,
      };
    }
    if (d === 2) {
      const q = a.entier(2, 6);
      const v = a.entier(c.mini, c.maxi);
      const k = a.entier(2, 5);
      return {
        gabarit: 'saisie',
        consigne: `${enonce(k * q, k * v)} ${question(q)}`,
        reponse: String(v),
        indice: `${q}, c’est combien de fois moins que ${k * q} ?`,
        explication: `${q} ${c.objet}, c’est ${k} fois moins que ${k * q} ${c.objet}. Donc ${k} fois moins : ${fr(k * v)} ÷ ${k} = ${fr(v)} ${c.unite}.`,
      };
    }
    // Deux informations, puis leur somme ou leur différence.
    const q0 = a.entier(1, 3);
    const v0 = a.entier(c.mini, c.maxi);
    const i = a.entier(2, 4);
    let j = a.entier(2, 6);
    if (j === i) j += 1;
    // La différence doit porter sur au moins deux objets.
    const somme = a.suivant() < 0.6 || Math.abs(j - i) * q0 < 2;
    const [q1, v1, q2, v2] = [i * q0, i * v0, j * q0, j * v0];
    const cible = somme ? q1 + q2 : Math.abs(q2 - q1);
    const r = somme ? v1 + v2 : Math.abs(v2 - v1);
    const [gq, gv, pq, pv] = q1 > q2 ? [q1, v1, q2, v2] : [q2, v2, q1, v1];
    return {
      gabarit: 'saisie',
      consigne: `${enonce(q1, v1)} ${enonce(q2, v2)} ${question(cible)}`,
      reponse: String(r),
      indice: somme ? `${cible} = ${q1} + ${q2}.` : `${cible} = ${gq} − ${pq}.`,
      explication: somme
        ? `${cible} ${c.objet}, c’est ${q1} ${c.objet} et encore ${q2} ${c.objet}. ${fr(v1)} + ${fr(v2)} = ${fr(r)} ${c.unite}.`
        : `${cible} ${c.objet}, c’est ${gq} ${c.objet} moins ${pq} ${c.objet}. ${fr(gv)} − ${fr(pv)} = ${fr(r)} ${c.unite}.`,
    };
  },
});
