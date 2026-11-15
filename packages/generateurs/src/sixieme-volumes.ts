// 6e, volumes et vision dans l'espace : volume en cm³ par dénombrement de cubes, solides usuels et prisme droit.
// Source : programme de mathématiques du cycle 3 (BO n°16 du 17 avril 2025), p. 19, 20, 23 et 24.
import { creerGenerateur, options, qte } from './outils';

// ─────────── Volumes : dénombrer des cubes de 1 cm³

export const volumes6e = creerGenerateur({
  id: 'volumes-6e',
  competence: 'MA-C3-6E-VOL-01',
  cycle: 3,
  description: 'Déterminer et comparer des volumes en cm³ en dénombrant des cubes de 1 cm³.',
  generer(a, d) {
    if (d === 1) {
      const r = a.entier(2, 9);
      const c = a.entier(2, 9);
      return {
        gabarit: 'saisie',
        consigne: `Une plaque est formée d’une seule couche de cubes de 1 cm³ : ${r} rangées de ${c} cubes. Calcule son volume, en cm³.`,
        reponse: String(r * c),
        indice: 'Compte les cubes : chaque cube a un volume de 1 cm³.',
        explication: `${r} rangées de ${c} cubes : ${r} × ${c} = ${r * c} cubes. Le volume est ${r * c} cm³.`,
      };
    }
    const h = a.entier(2, 6);
    const r = a.entier(2, 8);
    const c = a.entier(2, 8);
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `Un pavé est formé de cubes de 1 cm³ : ${h} couches, chacune de ${r} rangées de ${c} cubes. Calcule son volume, en cm³.`,
        reponse: String(h * r * c),
        indice: 'Compte les cubes d’une couche, puis multiplie par le nombre de couches.',
        explication: `Une couche : ${r} × ${c} = ${r * c} cubes. ${h} couches : ${h} × ${r * c} = ${h * r * c} cubes. Le volume est ${h * r * c} cm³.`,
      };
    }
    // Comparer deux pavés de formes différentes.
    const v1 = h * r * c;
    const [h2, r2, c2] = a.suivant() < 0.3 ? [r, c, h] : [a.entier(2, 6), a.entier(2, 8), a.entier(2, 8)];
    const v2 = h2 * r2 * c2;
    const reponse = v1 === v2 ? 'Ils ont le même volume' : v1 > v2 ? 'Le pavé A' : 'Le pavé B';
    return {
      gabarit: 'qcm',
      consigne: `Le pavé A est formé de ${h} couches de ${r} rangées de ${c} cubes de 1 cm³. Le pavé B est formé de ${h2} couches de ${r2} rangées de ${c2} cubes de 1 cm³. Lequel a le plus grand volume ?`,
      options: a.melanger(['Le pavé A', 'Le pavé B', 'Ils ont le même volume']),
      reponse,
      indice: 'Calcule le nombre de cubes de chaque pavé.',
      explication: `Pavé A : ${h} × ${r} × ${c} = ${v1} cm³. Pavé B : ${h2} × ${r2} × ${c2} = ${v2} cm³. ${reponse === 'Ils ont le même volume' ? 'Les deux volumes sont égaux.' : `${reponse} a le plus grand volume.`}`,
    };
  },
});

// ─────────── Solides : reconnaitre, compter faces, arêtes, sommets ; assemblages de cubes

const DESCRIPTIONS: [string, string][] = [
  ['Il a deux bases triangulaires identiques et trois faces rectangulaires.', 'un prisme droit'],
  ['Il a deux bases en forme de disque et une surface courbe.', 'un cylindre'],
  ['Il a une base en forme de disque et un sommet.', 'un cône'],
  ['Il a six faces carrées identiques.', 'un cube'],
  ['Il a une base carrée et quatre faces triangulaires qui se rejoignent en un sommet.', 'une pyramide'],
  ['Il n’a aucune face plane : tous ses points sont à la même distance du centre.', 'une boule'],
  ['Il a six faces rectangulaires, pas toutes carrées, opposées deux à deux.', 'un pavé droit'],
  ['Il a deux bases hexagonales identiques et six faces rectangulaires.', 'un prisme droit'],
];
const SOLIDES = ['un prisme droit', 'un cylindre', 'un cône', 'un cube', 'une pyramide', 'une boule', 'un pavé droit'];
/** Un cube est un pavé droit, et un pavé droit est un prisme droit : jamais ensemble dans les options. */
const INCLUS: Record<string, string[]> = {
  'un cube': ['un pavé droit', 'un prisme droit'], 'un pavé droit': ['un cube', 'un prisme droit'], 'un prisme droit': ['un cube', 'un pavé droit'],
};

const COMPTES: { nom: string; faces: number; aretes: number; sommets: number }[] = [
  { nom: 'un cube', faces: 6, aretes: 12, sommets: 8 },
  { nom: 'un pavé droit', faces: 6, aretes: 12, sommets: 8 },
  { nom: 'un prisme droit à base triangulaire', faces: 5, aretes: 9, sommets: 6 },
  { nom: 'une pyramide à base carrée', faces: 5, aretes: 8, sommets: 5 },
  { nom: 'une pyramide à base triangulaire', faces: 4, aretes: 6, sommets: 4 },
  { nom: 'un prisme droit à base hexagonale', faces: 8, aretes: 18, sommets: 12 },
];
const ELEMENTS = [['faces', 'faces'], ['arêtes', 'aretes'], ['sommets', 'sommets']] as const;

export const solides6e = creerGenerateur({
  id: 'solides-6e',
  competence: 'MA-C3-6E-ESP-01',
  cycle: 3,
  description: 'Reconnaitre les solides usuels dont le prisme droit, compter faces, arêtes, sommets, dénombrer un assemblage de cubes.',
  generer(a, d) {
    if (d === 1) {
      const [description, solide] = a.choisir(DESCRIPTIONS);
      return {
        gabarit: 'qcm',
        consigne: `${description} Quel est ce solide ?`,
        options: options(a, solide, a.melanger(SOLIDES.filter((s) => s !== solide && !(INCLUS[solide] ?? []).includes(s))).slice(0, 3), () => 'une sphère creuse'),
        reponse: solide,
        indice: 'Regarde la forme des bases et des autres faces.',
        explication: `${description} C’est ${solide}.`,
      };
    }
    if (d === 2) {
      const s = a.choisir(COMPTES);
      const [mot, cle] = a.choisir(ELEMENTS);
      const n = s[cle];
      return {
        gabarit: 'saisie',
        consigne: `Combien ${mot === 'arêtes' ? 'd’' : 'de '}${mot} a ${s.nom} ?`,
        reponse: String(n),
        indice: 'Faces : surfaces planes. Arêtes : bords. Sommets : coins.',
        explication: `${s.nom[0]!.toUpperCase()}${s.nom.slice(1)} a ${s.faces} faces, ${s.aretes} arêtes et ${s.sommets} sommets.`,
      };
    }
    // Assemblage : grand cube fait de petits cubes, ou cubes manquants pour le compléter.
    const n = a.entier(2, 5);
    if (a.suivant() < 0.5) {
      return {
        gabarit: 'saisie',
        consigne: `Combien de petits cubes faut-il pour construire un grand cube de ${n} petits cubes de côté ?`,
        reponse: String(n ** 3),
        indice: 'Compte les cubes d’une couche, puis le nombre de couches.',
        explication: `Une couche : ${n} × ${n} = ${n * n} cubes. ${n} couches : ${n} × ${n * n} = ${n ** 3} cubes.`,
      };
    }
    const deja = a.entier(1, n ** 3 - 1);
    return {
      gabarit: 'saisie',
      consigne: `Léa veut construire un grand cube de ${n} petits cubes de côté. Elle a déjà posé ${qte(deja, 'petit cube', 'petits cubes')}. Combien en manque-t-il ?`,
      reponse: String(n ** 3 - deja),
      indice: 'Calcule d’abord le nombre total de petits cubes.',
      explication: `Il faut ${n} × ${n} × ${n} = ${n ** 3} cubes. ${n ** 3} − ${deja} = ${n ** 3 - deja}. Il en manque ${n ** 3 - deja}.`,
    };
  },
});
