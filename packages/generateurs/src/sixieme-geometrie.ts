// 6e, espace et géométrie : distances et milieu, cercle et disque, médiatrice, angles, bissectrice,
// triangles, symétrie axiale. Source : programme de mathématiques du cycle 3 (BO n°16 du 17 avril 2025), p. 23.
import { depuisEntier } from './decimaux';
import { creerGenerateur, frDecimal, options } from './outils';

/** Longueur en dixièmes de cm → « 8,4 cm ». */
const cm = (dixiemes: number) => `${frDecimal(depuisEntier(dixiemes, 1))} cm`;
/** Moitié d'une longueur donnée en dixièmes, écrite exactement : 85 → « 4,25 ». */
const moitie = (dixiemes: number) => frDecimal(depuisEntier(dixiemes * 5, 2));
const POINTS = [['A', 'B'], ['C', 'D'], ['E', 'F'], ['M', 'N'], ['R', 'S']] as const;

// ─────────── Distances et milieu d'un segment

export const milieu6e = creerGenerateur({
  id: 'milieu-6e',
  competence: 'MA-C3-6E-GEO-01',
  cycle: 3,
  description: 'Utiliser la définition du milieu d’un segment et de la distance entre deux points.',
  generer(a, d) {
    const [P, Q] = a.choisir(POINTS);
    const I = a.choisir(['I', 'K', 'O']);
    if (d === 1) {
      const t = a.entier(20, 150);
      return {
        gabarit: 'saisie',
        consigne: `${I} est le milieu du segment [${P}${Q}]. ${P}${Q} = ${cm(t)}. Calcule ${P}${I}, en cm.`,
        reponse: moitie(t),
        indice: 'Le milieu partage le segment en deux longueurs égales.',
        explication: `${I} est le milieu de [${P}${Q}], donc ${P}${I} = ${I}${Q} = ${P}${Q} ÷ 2. ${frDecimal(depuisEntier(t, 1))} ÷ 2 = ${moitie(t)}. ${P}${I} = ${moitie(t)} cm.`,
      };
    }
    if (d === 2) {
      const t = a.entier(10, 90);
      return {
        gabarit: 'saisie',
        consigne: `${I} est le milieu du segment [${P}${Q}]. ${P}${I} = ${cm(t)}. Calcule ${P}${Q}, en cm.`,
        reponse: frDecimal(depuisEntier(2 * t, 1)),
        indice: `${P}${Q} est le double de ${P}${I}.`,
        explication: `${P}${I} = ${I}${Q}, donc ${P}${Q} = 2 × ${P}${I} = 2 × ${frDecimal(depuisEntier(t, 1))} = ${frDecimal(depuisEntier(2 * t, 1))} cm.`,
      };
    }
    // Un point équidistant n'est pas forcément le milieu : il doit être sur le segment.
    const t = a.entier(15, 60);
    const surSegment = a.suivant() < 0.5;
    const egales = a.suivant() < 0.6;
    const autre = egales ? t : t + a.choisir([-7, -4, 3, 6]);
    const reponse = egales && surSegment ? 'Oui' : 'Non';
    return {
      gabarit: 'qcm',
      consigne: `Le point ${I} ${surSegment ? `est sur le segment [${P}${Q}]` : `n’est pas sur la droite (${P}${Q})`}. ${P}${I} = ${cm(t)} et ${I}${Q} = ${cm(autre)}. ${I} est-il le milieu de [${P}${Q}] ?`,
      options: a.melanger(['Oui', 'Non', 'On ne peut pas savoir']),
      reponse,
      indice: 'Le milieu est sur le segment et à égale distance des deux extrémités.',
      explication: reponse === 'Oui'
        ? `${I} est sur [${P}${Q}] et ${P}${I} = ${I}${Q}. ${I} est le milieu de [${P}${Q}].`
        : !surSegment
          ? `${I} n’est pas sur le segment. Il ne peut pas en être le milieu, même à égale distance de ${P} et de ${Q}.`
          : `${P}${I} et ${I}${Q} ne sont pas égales. ${I} n’est pas le milieu de [${P}${Q}].`,
    };
  },
});

// ─────────── Cercle et disque : rayon, diamètre, corde, ensembles de points

const VOCABULAIRE_CERCLE: [string, string][] = [
  ['Un segment qui relie le centre à un point du cercle s’appelle :', 'un rayon'],
  ['Un segment qui relie deux points du cercle en passant par le centre s’appelle :', 'un diamètre'],
  ['Un segment qui relie deux points quelconques du cercle s’appelle :', 'une corde'],
  ['L’ensemble des points situés à une même distance du centre s’appelle :', 'un cercle'],
  ['L’ensemble des points situés à une distance du centre inférieure ou égale au rayon s’appelle :', 'un disque'],
];

export const cercle6e = creerGenerateur({
  id: 'cercle-6e',
  competence: 'MA-C3-6E-GEO-02',
  cycle: 3,
  description: 'Connaitre cercle, disque, rayon, diamètre, corde ; situer un point par sa distance au centre.',
  generer(a, d) {
    if (d === 1) {
      const t = a.entier(10, 90);
      const versDiametre = a.suivant() < 0.5;
      return versDiametre
        ? {
            gabarit: 'saisie', consigne: `Un cercle a un rayon de ${cm(t)}. Calcule son diamètre, en cm.`,
            reponse: frDecimal(depuisEntier(2 * t, 1)),
            indice: 'Le diamètre mesure deux rayons.',
            explication: `Diamètre = 2 × rayon = 2 × ${frDecimal(depuisEntier(t, 1))} = ${frDecimal(depuisEntier(2 * t, 1))} cm.`,
          }
        : {
            gabarit: 'saisie', consigne: `Un cercle a un diamètre de ${cm(2 * t)}. Calcule son rayon, en cm.`,
            reponse: frDecimal(depuisEntier(t, 1)),
            indice: 'Le rayon mesure la moitié du diamètre.',
            explication: `Rayon = diamètre ÷ 2 = ${frDecimal(depuisEntier(2 * t, 1))} ÷ 2 = ${frDecimal(depuisEntier(t, 1))} cm.`,
          };
    }
    if (d === 2 && a.suivant() < 0.5) {
      // Tous les points du cercle sont à la même distance du centre : le rayon.
      const t = a.entier(10, 90);
      const [O, M] = [a.choisir(['O', 'C', 'K']), a.choisir(['M', 'P', 'T'])];
      const corde = a.suivant() < 0.5;
      return corde
        ? {
            gabarit: 'saisie',
            consigne: `[${M}N] est un diamètre du cercle de centre ${O}. ${O}${M} = ${cm(t)}. Calcule ${M}N, en cm.`,
            reponse: frDecimal(depuisEntier(2 * t, 1)),
            indice: `${O}${M} est un rayon. Un diamètre mesure deux rayons.`,
            explication: `${O}${M} est un rayon. ${M}N = 2 × ${frDecimal(depuisEntier(t, 1))} = ${frDecimal(depuisEntier(2 * t, 1))} cm.`,
          }
        : {
            gabarit: 'saisie',
            consigne: `Le cercle de centre ${O} a un rayon de ${cm(t)}. Le point ${M} est sur ce cercle. Calcule ${O}${M}, en cm.`,
            reponse: frDecimal(depuisEntier(t, 1)),
            indice: 'Tous les points d’un cercle sont à la même distance du centre.',
            explication: `${M} est sur le cercle, donc ${O}${M} est égal au rayon : ${cm(t)}.`,
          };
    }
    if (d === 2) {
      const [question, reponse] = a.choisir(VOCABULAIRE_CERCLE);
      return {
        gabarit: 'qcm', consigne: question,
        options: options(a, reponse, ['un rayon', 'un diamètre', 'une corde', 'un cercle', 'un disque'].filter((x) => x !== reponse).slice(0, 3), () => 'un arc'),
        reponse,
        indice: 'Le cercle est la ligne. Le disque est la surface. Le diamètre passe par le centre.',
        explication: `${question.replace(/ s’appelle :$/, '')} : c’est ${reponse}.`,
      };
    }
    const r = a.entier(2, 9);
    const position = a.entier(0, 2);
    const distance = position === 0 ? r : position === 1 ? a.entier(1, r - 1) : r + a.entier(1, 4);
    const reponse = ['sur le cercle', 'à l’intérieur du disque, pas sur le cercle', 'à l’extérieur du disque'][position]!;
    return {
      gabarit: 'qcm',
      consigne: `Un cercle a pour centre O et pour rayon ${r} cm. Le point M est à ${distance} cm de O. Où est M ?`,
      options: a.melanger(['sur le cercle', 'à l’intérieur du disque, pas sur le cercle', 'à l’extérieur du disque']),
      reponse,
      indice: 'Compare la distance OM au rayon.',
      explication: position === 0
        ? `OM = ${distance} cm = rayon. M est sur le cercle.`
        : position === 1
          ? `OM = ${distance} cm < ${r} cm. M est à l’intérieur du disque.`
          : `OM = ${distance} cm > ${r} cm. M est à l’extérieur du disque.`,
    };
  },
});

// ─────────── Médiatrice d'un segment

export const mediatrice6e = creerGenerateur({
  id: 'mediatrice-6e',
  competence: 'MA-C3-6E-GEO-03',
  cycle: 3,
  description: 'Connaitre la médiatrice d’un segment et sa propriété caractéristique.',
  generer(a, d) {
    const [P, Q] = a.choisir(POINTS);
    if (d === 1) {
      const definitions: [string, string, string[]][] = [
        ['La médiatrice d’un segment est la droite :', 'perpendiculaire au segment en son milieu', ['parallèle au segment', 'qui passe par une extrémité du segment', 'perpendiculaire au segment en une extrémité']],
        ['Un point de la médiatrice de [AB] est :', 'à la même distance de A et de B', ['plus près de A que de B', 'toujours sur le segment [AB]', 'le milieu de [AB] seulement']],
        ['La médiatrice d’un segment le coupe :', 'en son milieu, à angle droit', ['à une extrémité', 'en son milieu, sans angle droit', 'en deux segments inégaux']],
      ];
      const [q, r, pieges] = a.choisir(definitions);
      return {
        gabarit: 'qcm', consigne: q, options: a.melanger([r, ...pieges]), reponse: r,
        indice: 'Médiatrice : « médi » comme milieu, et un angle droit.',
        explication: `${q.replace(/ :$/, '')} ${r}.`,
      };
    }
    const M = a.choisir(['K', 'T', 'H'].filter((x) => x !== P && x !== Q));
    const t = a.entier(15, 95);
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `Le point ${M} est sur la médiatrice du segment [${P}${Q}]. ${M}${P} = ${cm(t)}. Calcule ${M}${Q}, en cm.`,
        reponse: frDecimal(depuisEntier(t, 1)),
        indice: 'Un point de la médiatrice est à égale distance des extrémités du segment.',
        explication: `${M} est sur la médiatrice de [${P}${Q}], donc ${M}${P} = ${M}${Q} = ${cm(t)}.`,
      };
    }
    const egales = a.suivant() < 0.5;
    const autre = egales ? t : t + a.choisir([-6, -3, 4, 8]);
    return {
      gabarit: 'qcm',
      consigne: `${M}${P} = ${cm(t)} et ${M}${Q} = ${cm(autre)}. Le point ${M} est-il sur la médiatrice de [${P}${Q}] ?`,
      options: a.melanger(['Oui', 'Non', 'On ne peut pas savoir']),
      reponse: egales ? 'Oui' : 'Non',
      indice: 'Compare les distances aux deux extrémités du segment.',
      explication: egales
        ? `${M} est à égale distance de ${P} et de ${Q}. Il est sur la médiatrice de [${P}${Q}].`
        : `${M}${P} ≠ ${M}${Q}. ${M} n’est pas à égale distance de ${P} et de ${Q} : il n’est pas sur la médiatrice.`,
    };
  },
});

// ─────────── Angles : nature, angles supplémentaires, opposés par le sommet

const NATURE = (x: number) => (x === 0 ? 'nul' : x < 90 ? 'aigu' : x === 90 ? 'droit' : x < 180 ? 'obtus' : x === 180 ? 'plat' : 'plein');

export const angles6e = creerGenerateur({
  id: 'angles-6e',
  competence: 'MA-C3-6E-ANG-01',
  cycle: 3,
  description: 'Nommer un angle selon sa mesure ; angles supplémentaires, adjacents, opposés par le sommet.',
  generer(a, d) {
    if (d === 1) {
      const x = a.choisir([0, 90, 180, 360, a.entier(1, 89), a.entier(91, 179), a.entier(5, 85), a.entier(95, 175)]);
      const reponse = `un angle ${NATURE(x)}`;
      return {
        gabarit: 'qcm',
        consigne: `Un angle mesure ${x}°. Comment s’appelle-t-il ?`,
        options: options(a, reponse, ['nul', 'aigu', 'droit', 'obtus', 'plat', 'plein'].map((n) => `un angle ${n}`).filter((n) => n !== reponse).slice(0, 3), () => 'un angle droit'),
        reponse,
        indice: 'Repères : droit 90°, plat 180°, plein 360°.',
        explication: x < 90 && x > 0 ? `${x}° est entre 0° et 90° : l’angle est aigu.` : x > 90 && x < 180 ? `${x}° est entre 90° et 180° : l’angle est obtus.` : `${x}° : c’est ${reponse}.`,
      };
    }
    const x = a.entier(12, 168);
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `Deux angles sont supplémentaires. L’un mesure ${x}°. Calcule la mesure de l’autre, en degrés.`,
        reponse: String(180 - x),
        indice: 'Deux angles supplémentaires ont une somme de 180°.',
        explication: `180 − ${x} = ${180 - x}. L’autre angle mesure ${180 - x}°.`,
      };
    }
    // Deux droites sécantes : angles opposés par le sommet égaux, angles adjacents supplémentaires.
    const oppose = a.suivant() < 0.5;
    return {
      gabarit: 'saisie',
      consigne: `Deux droites sécantes forment quatre angles. L’un mesure ${x}°. Calcule la mesure de l’angle ${oppose ? 'opposé par le sommet' : 'qui lui est adjacent'}, en degrés.`,
      reponse: String(oppose ? x : 180 - x),
      indice: 'Angles opposés par le sommet : même mesure. Angles adjacents formés par deux droites : somme de 180°.',
      explication: oppose
        ? `Deux angles opposés par le sommet ont la même mesure : ${x}°.`
        : `Les deux angles adjacents forment un angle plat. 180 − ${x} = ${180 - x}. L’angle mesure ${180 - x}°.`,
    };
  },
});

// ─────────── Bissectrice d'un angle saillant

export const bissectrice6e = creerGenerateur({
  id: 'bissectrice-6e',
  competence: 'MA-C3-6E-ANG-02',
  cycle: 3,
  description: 'Utiliser la définition de la bissectrice d’un angle pour calculer des mesures.',
  generer(a, d) {
    const x = a.entier(10, 89) * 2;
    if (d === 1) {
      return {
        gabarit: 'saisie',
        consigne: `On trace la bissectrice d’un angle de ${x}°. Calcule la mesure de chacun des deux angles obtenus, en degrés.`,
        reponse: String(x / 2),
        indice: 'La bissectrice partage l’angle en deux angles de même mesure.',
        explication: `${x} ÷ 2 = ${x / 2}. Chaque angle mesure ${x / 2}°.`,
      };
    }
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `La bissectrice d’un angle forme deux angles de ${x / 2}° chacun. Calcule la mesure de l’angle de départ, en degrés.`,
        reponse: String(x),
        indice: 'L’angle de départ est formé des deux angles égaux.',
        explication: `2 × ${x / 2} = ${x}. L’angle de départ mesure ${x}°.`,
      };
    }
    // Bissectrice d'un angle dont on connait le supplémentaire (angles de 20° à 160°).
    const y = 180 - Math.min(x, 160);
    return {
      gabarit: 'saisie',
      consigne: `Deux angles adjacents forment un angle plat. L’un mesure ${y}°. On trace la bissectrice de l’autre. Calcule la mesure des angles obtenus, en degrés.`,
      reponse: String((180 - y) / 2),
      indice: 'Calcule d’abord l’autre angle, puis prends sa moitié.',
      explication: `L’autre angle mesure 180 − ${y} = ${180 - y}°. Sa bissectrice le partage en deux : ${180 - y} ÷ 2 = ${(180 - y) / 2}°.`,
    };
  },
});

// ─────────── Triangles : somme des angles, triangles particuliers, existence

export const trianglesAngles6e = creerGenerateur({
  id: 'triangles-angles-6e',
  competence: 'MA-C3-6E-TRI-01',
  cycle: 3,
  description: 'Calculer un angle d’un triangle (somme 180°), triangles isocèle, équilatéral, rectangle ; existence d’un triangle.',
  generer(a, d) {
    if (d === 1) {
      const x = a.entier(20, 110);
      const y = a.entier(15, 160 - x);
      return {
        gabarit: 'saisie',
        consigne: `Dans un triangle ABC, l’angle A mesure ${x}° et l’angle B mesure ${y}°. Calcule l’angle C, en degrés.`,
        reponse: String(180 - x - y),
        indice: 'La somme des angles d’un triangle vaut 180°.',
        explication: `${x} + ${y} = ${x + y}. 180 − ${x + y} = ${180 - x - y}. L’angle C mesure ${180 - x - y}°.`,
      };
    }
    if (d === 2) {
      const cas = a.entier(0, 2);
      if (cas === 0) {
        const x = a.entier(10, 80);
        return {
          gabarit: 'saisie',
          consigne: `Un triangle est rectangle en A. L’angle B mesure ${x}°. Calcule l’angle C, en degrés.`,
          reponse: String(90 - x),
          indice: 'L’angle droit mesure 90°. La somme des trois angles vaut 180°.',
          explication: `180 − 90 − ${x} = ${90 - x}. L’angle C mesure ${90 - x}°.`,
        };
      }
      if (cas === 1) {
        const base = a.entier(20, 80);
        return {
          gabarit: 'saisie',
          consigne: `Le triangle ABC est isocèle en A. L’angle B mesure ${base}°. Calcule l’angle A, en degrés.`,
          reponse: String(180 - 2 * base),
          indice: 'Dans un triangle isocèle, les deux angles à la base ont la même mesure.',
          explication: `Les angles B et C mesurent ${base}° chacun. 180 − 2 × ${base} = ${180 - 2 * base}. L’angle A mesure ${180 - 2 * base}°.`,
        };
      }
      const sommet = a.entier(10, 80) * 2;
      return {
        gabarit: 'saisie',
        consigne: `Le triangle ABC est isocèle en A. L’angle A mesure ${sommet}°. Calcule l’angle B, en degrés.`,
        reponse: String((180 - sommet) / 2),
        indice: 'Les deux angles à la base sont égaux. Ils se partagent ce qui reste de 180°.',
        explication: `180 − ${sommet} = ${180 - sommet}. ${180 - sommet} ÷ 2 = ${(180 - sommet) / 2}. L’angle B mesure ${(180 - sommet) / 2}°.`,
      };
    }
    // Existence d'un triangle de côtés donnés.
    const x = a.entier(2, 9);
    const y = a.entier(2, 9);
    const possible = a.suivant() < 0.5;
    const z = possible ? a.entier(Math.abs(x - y) + 1, x + y - 1) : x + y + a.entier(0, 4);
    return {
      gabarit: 'qcm',
      consigne: `Peut-on construire un triangle dont les côtés mesurent ${x} cm, ${y} cm et ${z} cm ?`,
      options: a.melanger(['Oui', 'Non', 'Seulement s’il est rectangle']),
      reponse: possible ? 'Oui' : 'Non',
      indice: 'Le plus grand côté doit être plus petit que la somme des deux autres.',
      explication: possible
        ? `Le plus grand côté mesure ${Math.max(x, y, z)} cm. Il est plus petit que la somme des deux autres : le triangle existe.`
        : `${x} + ${y} = ${x + y} et ${z} ≥ ${x + y}. Les deux petits côtés ne peuvent pas se rejoindre : pas de triangle.`,
    };
  },
});

// ─────────── Symétrie axiale

const AXES: [string, string, string[]][] = [
  ['un carré', '4', ['2', '1', '0']], ['un rectangle (non carré)', '2', ['4', '1', '0']], ['un triangle équilatéral', '3', ['1', '6', '0']],
  ['un triangle isocèle (non équilatéral)', '1', ['2', '3', '0']], ['un losange (non carré)', '2', ['4', '1', '0']],
  ['un triangle quelconque', '0', ['1', '3', '2']], ['un cercle', 'une infinité', ['4', '2', '1']],
];

export const symetrie6e = creerGenerateur({
  id: 'symetrie-6e',
  competence: 'MA-C3-6E-SYM-01',
  cycle: 3,
  description: 'Axes de symétrie des figures usuelles ; propriétés de la symétrie axiale (conservation, distance à l’axe).',
  generer(a, d) {
    if (d === 1) {
      const [figure, n, pieges] = a.choisir(AXES);
      return {
        gabarit: 'qcm',
        consigne: `Combien d’axes de symétrie a ${figure} ?`,
        options: a.melanger([n, ...pieges]),
        reponse: n,
        indice: 'Un axe de symétrie partage la figure en deux moitiés qui se superposent par pliage.',
        explication: `${figure[0]!.toUpperCase()}${figure.slice(1)} ${n === '0' ? 'n’a aucun axe' : n === '1' ? 'a 1 axe' : `a ${n} axes`} de symétrie.`,
      };
    }
    const t = a.entier(15, 95);
    if (d === 2) {
      const grandeur = a.choisir(['longueur', 'angle'] as const);
      if (grandeur === 'angle') {
        const x = a.entier(20, 160);
        return {
          gabarit: 'saisie',
          consigne: `Un angle mesure ${x}°. On construit son symétrique par rapport à une droite. Calcule la mesure de l’angle symétrique, en degrés.`,
          reponse: String(x),
          indice: 'La symétrie axiale conserve les mesures.',
          explication: `La symétrie axiale conserve les angles. L’angle symétrique mesure aussi ${x}°.`,
        };
      }
      return {
        gabarit: 'saisie',
        consigne: `Le segment [AB] mesure ${cm(t)}. [A′B′] est son symétrique par rapport à une droite. Calcule A′B′, en cm.`,
        reponse: frDecimal(depuisEntier(t, 1)),
        indice: 'La symétrie axiale conserve les longueurs.',
        explication: `La symétrie axiale conserve les longueurs. A′B′ = AB = ${cm(t)}.`,
      };
    }
    // Le point et son symétrique sont à la même distance de l'axe, de part et d'autre.
    const versAxe = a.suivant() < 0.5;
    return versAxe
      ? {
          gabarit: 'saisie',
          consigne: `A′ est le symétrique de A par rapport à la droite (d). AA′ = ${cm(t)}. Calcule la distance de A à la droite (d), en cm.`,
          reponse: moitie(t),
          indice: 'La droite (d) est la médiatrice du segment [AA′].',
          explication: `(d) est la médiatrice de [AA′] : elle passe par son milieu. Distance de A à (d) = ${frDecimal(depuisEntier(t, 1))} ÷ 2 = ${moitie(t)} cm.`,
        }
      : {
          gabarit: 'saisie',
          consigne: `Le point A est à ${cm(t)} de la droite (d). A′ est son symétrique par rapport à (d). Calcule AA′, en cm.`,
          reponse: frDecimal(depuisEntier(2 * t, 1)),
          indice: 'A′ est de l’autre côté de (d), à la même distance que A.',
          explication: `A et A′ sont chacun à ${cm(t)} de (d). AA′ = 2 × ${frDecimal(depuisEntier(t, 1))} = ${frDecimal(depuisEntier(2 * t, 1))} cm.`,
        };
  },
});

