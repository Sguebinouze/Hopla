// CE2, grandeurs et mesures : longueurs, masses, contenances, monnaie, durées.
// Source : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024), p. 29-31.
// Pas d'écriture à virgule pour les longueurs, masses et contenances, pas de tableau de conversion.
import { choix, creerGenerateur, fr, options, qte, type Piege } from './outils';
import type { Aleatoire } from './outils';

const TROU = '…';

/** Une relation entre deux unités : 1 grande = facteur petites. */
type Relation = { grande: string; petite: string; facteur: number };

const ecrire = (n: number, unite: string) => `${fr(n)} ${unite}`;

/** Conversions sans virgule : de la grande unité vers la petite, l'inverse, ou une mesure en deux unités. */
function genererConversion(a: Aleatoire, d: number, relations: Relation[], mixtes: Relation[], max: number) {
  if (d === 3) {
    const { grande, petite, facteur } = a.choisir(mixtes);
    const g = a.entier(1, Math.max(1, Math.floor(max / facteur) - 1));
    const p = a.entier(1, facteur - 1);
    const total = g * facteur + p;
    return {
      gabarit: 'saisie' as const,
      consigne: `Complète : ${ecrire(g, grande)} ${ecrire(p, petite)} = ${TROU} ${petite}`,
      reponse: String(total),
      indice: `1 ${grande} = ${ecrire(facteur, petite)}.`,
      explication: `${ecrire(g, grande)} = ${ecrire(g * facteur, petite)}. ${ecrire(g * facteur, petite)} + ${ecrire(p, petite)} = ${ecrire(total, petite)}.`,
    };
  }
  const { grande, petite, facteur } = a.choisir(relations);
  const g = a.entier(2, Math.min(99, Math.floor(max / facteur)));
  if (d === 1) {
    return {
      gabarit: 'saisie' as const,
      consigne: `Complète : ${ecrire(g, grande)} = ${TROU} ${petite}`,
      reponse: String(g * facteur),
      indice: `1 ${grande} = ${ecrire(facteur, petite)}.`,
      explication: `1 ${grande} = ${ecrire(facteur, petite)}. Donc ${ecrire(g, grande)} = ${ecrire(g * facteur, petite)}.`,
    };
  }
  return {
    gabarit: 'saisie' as const,
    consigne: `Complète : ${ecrire(g * facteur, petite)} = ${TROU} ${grande}`,
    reponse: String(g),
    indice: `${ecrire(facteur, petite)} = 1 ${grande}.`,
    explication: `${ecrire(facteur, petite)} = 1 ${grande}. Donc ${ecrire(g * facteur, petite)} = ${ecrire(g, grande)}.`,
  };
}

// ─────────── Longueurs

const LONGUEURS: Relation[] = [
  { grande: 'cm', petite: 'mm', facteur: 10 },
  { grande: 'm', petite: 'dm', facteur: 10 },
  { grande: 'dm', petite: 'cm', facteur: 10 },
  { grande: 'm', petite: 'cm', facteur: 100 },
  { grande: 'm', petite: 'mm', facteur: 1000 },
  { grande: 'km', petite: 'm', facteur: 1000 },
];

export const longueursCe2 = creerGenerateur({
  id: 'longueurs-ce2',
  competence: 'MA-C2-CE2-GM-01',
  cycle: 2,
  description: 'Convertir des longueurs (km, m, dm, cm, mm) sans virgule, avec les relations entre unités.',
  generer: (a, d) => genererConversion(a, d, LONGUEURS, LONGUEURS.filter((r) => r.grande !== 'dm' && r.petite !== 'dm'), 9999),
});

// ─────────── Masses et contenances

const MASSES: Relation[] = [
  { grande: 'kg', petite: 'g', facteur: 1000 },
  { grande: 't', petite: 'kg', facteur: 1000 },
];
const CONTENANCES: Relation[] = [
  { grande: 'L', petite: 'dL', facteur: 10 },
  { grande: 'L', petite: 'cL', facteur: 100 },
];

export const massesContenancesCe2 = creerGenerateur({
  id: 'masses-contenances-ce2',
  competence: 'MA-C2-CE2-GM-02',
  cycle: 2,
  description: 'Convertir des masses (t, kg, g) et des contenances (L, dL, cL) sans virgule.',
  generer(a, d) {
    const masses = a.suivant() < 0.5;
    const relations = masses ? MASSES : CONTENANCES;
    return genererConversion(a, d, relations, relations, 9999);
  },
});

// ─────────── Monnaie : écriture à virgule, additions, rendre la monnaie

/** 368 centimes → « 3,68 € ». */
export const euros = (centimes: number) => `${fr(Math.floor(centimes / 100))},${String(centimes % 100).padStart(2, '0')} €`;

export const monnaieCe2 = creerGenerateur({
  id: 'monnaie-ce2',
  competence: 'MA-C2-CE2-GM-03',
  cycle: 2,
  description: 'Écrire un prix avec une virgule, additionner des montants, rendre la monnaie.',
  generer(a, d) {
    const secours = (autour: number) => () => euros(Math.max(1, autour + a.choisir([-100, -10, 10, 100, 1, -1])));
    if (d === 1) {
      // « deux euros et cinq centimes » à distinguer de « deux euros et cinquante centimes ».
      const e = a.entier(1, 20);
      const c = a.choisir([5, 50, 7, 70, 8, 80, 3, 30, 15, 45, 99]);
      const reponse = euros(e * 100 + c);
      const inverse = c < 10 ? c * 10 : c % 10 === 0 ? c / 10 : (c % 10) * 10 + Math.floor(c / 10);
      return {
        gabarit: 'qcm',
        consigne: `Comment écrit-on ${e} euro${e > 1 ? 's' : ''} et ${c} centime${c > 1 ? 's' : ''} ?`,
        ...choix(a, reponse, [[euros(e * 100 + inverse), 'centimes-rang'], [`${fr(e * 100 + c)} €`, 'centimes-comptes-en-euros'], [euros((e + 1) * 100 + c)]], secours(e * 100 + c)),
        reponse,
        indice: 'Après la virgule, il y a toujours deux chiffres pour les centimes.',
        explication: `${c} centime${c > 1 ? 's' : ''} s’écrit ${String(c).padStart(2, '0')} après la virgule. La réponse est ${reponse}.`,
      };
    }
    if (d === 2) {
      const x = a.entier(100, 9999);
      const enCentimes = a.suivant() < 0.3;
      const y = enCentimes ? a.entier(11, 99) : a.entier(100, 9999);
      const total = x + y;
      const terme = enCentimes ? `${y} centimes` : euros(y);
      // Piège : oublier la retenue des centimes vers les euros.
      const sansRetenue = Math.floor(x / 100) * 100 + Math.floor(y / 100) * 100 + ((x % 100) + (y % 100)) % 100;
      return {
        gabarit: 'qcm',
        consigne: `Calcule : ${euros(x)} + ${terme}`,
        ...choix(a, euros(total), [[euros(sansRetenue), 'retenue-oubliee'], [euros(total + 100)], [euros(total - 10)]], secours(total)),
        reponse: euros(total),
        indice: '100 centimes font 1 €.',
        explication: `On ajoute les centimes, puis les euros. 100 centimes font 1 €. Le total est ${euros(total)}.`,
      };
    }
    // Rendre la monnaie par ajouts successifs.
    const billet = a.choisir([5, 10, 20]);
    const prix = a.entier(101, billet * 100 - 101);
    const rendu = billet * 100 - prix;
    const centimes = (100 - (prix % 100)) % 100;
    const etape = prix + centimes;
    return {
      gabarit: 'qcm',
      consigne: `Un jouet coute ${euros(prix)}. Tu paies avec ${billet} €. Combien doit-on te rendre ?`,
      options: options(a, euros(rendu), [euros(rendu + 100), euros(rendu - 100), euros(Math.floor(rendu / 100) * 100 + (100 - (rendu % 100)) % 100)], secours(rendu)),
      reponse: euros(rendu),
      indice: 'Avance d’abord jusqu’à l’euro suivant.',
      explication: centimes === 0
        ? `${billet} − ${prix / 100} = ${(billet * 100 - prix) / 100}. On rend ${euros(rendu)}.`
        : `On ajoute ${qte(centimes, 'centime')} pour aller à ${euros(etape)}. Puis on ajoute ${euros(billet * 100 - etape)} pour aller à ${billet} €. On rend ${euros(rendu)}.`,
    };
  },
});

// ─────────── Durées : heures et minutes, dans une même journée

/** 510 minutes → « 8 h 30 ». */
export const horaire = (minutes: number) => `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, '0')}`;

export const dureesCe2 = creerGenerateur({
  id: 'durees-ce2',
  competence: 'MA-C2-CE2-GM-04',
  cycle: 2,
  description: 'Convertir des heures en minutes, calculer une durée entre deux horaires, trouver un horaire.',
  generer(a, d) {
    if (d === 1) {
      const h = a.entier(1, 4);
      const m = a.entier(1, 11) * 5;
      return {
        gabarit: 'saisie',
        consigne: `Combien de minutes y a-t-il dans ${h} h ${m} min ?`,
        reponse: String(h * 60 + m),
        indice: '1 heure, c’est 60 minutes.',
        explication: `${h} h = ${h * 60} min. ${h * 60} + ${m} = ${h * 60 + m}. Il y a ${h * 60 + m} minutes.`,
      };
    }
    if (d === 2) {
      // Durée en minutes entre deux horaires proches : 15 h 40 et 16 h 05.
      const debut = a.entier(7 * 12, 18 * 12) * 5;
      const duree = a.entier(2, 11) * 5;
      const fin = debut + duree;
      const passage = Math.ceil(debut / 60) * 60;
      const explication = passage > debut && passage < fin
        ? `De ${horaire(debut)} à ${horaire(passage)} : ${passage - debut} minutes. De ${horaire(passage)} à ${horaire(fin)} : ${fin - passage} minutes. ${passage - debut} + ${fin - passage} = ${duree}.`
        : `De ${horaire(debut)} à ${horaire(fin)} : ${duree} minutes.`;
      return {
        gabarit: 'saisie',
        consigne: `Combien de minutes s’écoulent entre ${horaire(debut)} et ${horaire(fin)} ?`,
        reponse: String(duree),
        indice: 'Avance d’abord jusqu’à l’heure pile.',
        explication,
      };
    }
    // Horaire d'arrivée ou de départ.
    const debut = a.entier(7 * 6, 14 * 6) * 10;
    const duree = a.entier(1, 3) * 60 + a.choisir([0, 10, 20, 30, 40, 50]);
    const fin = debut + duree;
    const dureeTexte = duree % 60 === 0 ? `${duree / 60} h` : `${Math.floor(duree / 60)} h ${duree % 60} min`;
    const arrivee = a.suivant() < 0.6;
    const reponse = horaire(arrivee ? fin : debut);
    const autour = arrivee ? fin : debut;
    // Une heure de trop ou de moins ; minutes retirées au lieu d'ajoutées (ou l'inverse).
    const pieges: Piege[] = [[horaire(autour + 60), 'heures-mal-comptees'], [horaire(autour - 60), 'heures-mal-comptees'], [horaire(arrivee ? fin - 2 * (duree % 60) : debut + 2 * (duree % 60)), 'sens-duree-inverse']];
    const secours = () => horaire(autour + a.choisir([-30, -20, -10, 10, 20, 30]));
    if (arrivee) {
      return {
        gabarit: 'qcm',
        consigne: `Le train part à ${horaire(debut)}. Le trajet dure ${dureeTexte}. À quelle heure arrive-t-il ?`,
        ...choix(a, reponse, pieges, secours),
        reponse,
        indice: 'Ajoute d’abord les heures, puis les minutes.',
        explication: `${horaire(debut)} + ${dureeTexte}, c’est ${horaire(fin)}. Le train arrive à ${horaire(fin)}.`,
      };
    }
    const qui = a.choisir(['Lucie', 'Inès', 'Nora', 'Jade']);
    return {
      gabarit: 'qcm',
      consigne: `${qui} rentre à ${horaire(fin)}. Elle est sortie pendant ${dureeTexte}. À quelle heure est-elle partie ?`,
      ...choix(a, reponse, pieges, secours),
      reponse,
      indice: 'Recule d’abord des heures, puis des minutes.',
      explication: `${horaire(fin)} − ${dureeTexte}, c’est ${horaire(debut)}. ${qui} est partie à ${horaire(debut)}.`,
    };
  },
});
