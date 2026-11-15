// 5e, espace et géométrie : volumes, symétrie centrale, angles et parallélisme, triangles, parallélogrammes.
// Source : programme de mathématiques du cycle 4 (arrêté du 18 février 2026, BO n°10 du 5 mars 2026), p. 45 et 46.
import { depuisEntier } from './decimaux';
import { creerGenerateur, fr, frDecimal, options } from './outils';
import { ecrireRelatif } from './relatifs-c4';

const dec = (n: number, chiffres: number) => frDecimal(depuisEntier(n, chiffres));

// ─────────── Volumes : cube, pavé, prisme droit, cylindre ; volumes et capacités

export const volumes5e = creerGenerateur({
  id: 'volumes-5e',
  competence: 'MA-C4-5E-VOL-01',
  cycle: 4,
  description: 'Calculer le volume d’un cube, d’un pavé, d’un prisme droit, d’un cylindre ; convertir volumes et capacités.',
  generer(a, d) {
    if (d === 1) {
      if (a.suivant() < 0.4) {
        const c = a.entier(2, 12);
        return {
          gabarit: 'saisie', consigne: `Calcule le volume d’un cube de ${c} cm d’arête, en cm³.`, reponse: String(c ** 3),
          indice: 'Volume du cube = arête × arête × arête.',
          explication: `${c} × ${c} × ${c} = ${fr(c ** 3)}. Le volume est ${fr(c ** 3)} cm³.`,
        };
      }
      const [L, l, h] = [a.entier(3, 15), a.entier(2, 10), a.entier(2, 9)];
      return {
        gabarit: 'saisie', consigne: `Calcule le volume d’un pavé droit de ${L} cm de long, ${l} cm de large et ${h} cm de haut, en cm³.`,
        reponse: String(L * l * h),
        indice: 'Volume du pavé droit = longueur × largeur × hauteur.',
        explication: `${L} × ${l} × ${h} = ${fr(L * l * h)}. Le volume est ${fr(L * l * h)} cm³.`,
      };
    }
    if (d === 2) {
      if (a.suivant() < 0.5) {
        // Prisme droit à base triangle rectangle : aire de la base × hauteur.
        const [x, y, h] = [a.entier(2, 9) * 2, a.entier(2, 9), a.entier(3, 15)];
        const base = (x * y) / 2;
        return {
          gabarit: 'saisie',
          consigne: `Un prisme droit a pour base un triangle rectangle dont les côtés de l’angle droit mesurent ${x} cm et ${y} cm. Sa hauteur est ${h} cm. Calcule son volume, en cm³.`,
          reponse: String(base * h),
          indice: 'Volume du prisme droit = aire de la base × hauteur.',
          explication: `Aire de la base : ${x} × ${y} ÷ 2 = ${base} cm². Volume : ${base} × ${h} = ${fr(base * h)} cm³.`,
        };
      }
      // Conversions : 1 L = 1 dm³ = 1 000 cm³, 1 mL = 1 cm³.
      const cm3 = a.entier(1, 99) * 100;
      const versLitres = a.suivant() < 0.5;
      return versLitres
        ? {
            gabarit: 'saisie', consigne: `Convertis ${fr(cm3)} cm³ en litres.`, reponse: depuisEntier(cm3, 3),
            indice: '1 L = 1 dm³ = 1 000 cm³.',
            explication: `1 L = 1 000 cm³. ${fr(cm3)} ÷ 1 000 = ${dec(cm3, 3)}. Cela fait ${dec(cm3, 3)} L.`,
          }
        : {
            gabarit: 'saisie', consigne: `Convertis ${dec(cm3, 3)} L en cm³.`, reponse: String(cm3),
            indice: '1 L = 1 000 cm³.',
            explication: `${dec(cm3, 3)} × 1 000 = ${fr(cm3)}. Cela fait ${fr(cm3)} cm³.`,
          };
    }
    // Cylindre et disque, avec π ≈ 3,14 : calcul exact en centièmes.
    const r = a.entier(1, 10);
    if (a.suivant() < 0.4) {
      return {
        gabarit: 'saisie',
        consigne: `Calcule l’aire d’un disque de rayon ${r} cm, en cm². Prends 3,14 pour π.`,
        reponse: depuisEntier(314 * r * r, 2),
        indice: 'Aire du disque = π × rayon × rayon.',
        explication: `3,14 × ${r} × ${r} = ${dec(314 * r * r, 2)}. L’aire vaut environ ${dec(314 * r * r, 2)} cm².`,
      };
    }
    const h = a.entier(2, 20);
    return {
      gabarit: 'saisie',
      consigne: `Calcule le volume d’un cylindre de rayon ${r} cm et de hauteur ${h} cm, en cm³. Prends 3,14 pour π.`,
      reponse: depuisEntier(314 * r * r * h, 2),
      indice: 'Volume du cylindre = aire du disque de base × hauteur.',
      explication: `Aire de la base : 3,14 × ${r} × ${r} = ${dec(314 * r * r, 2)} cm². Volume : ${dec(314 * r * r, 2)} × ${h} = ${dec(314 * r * r * h, 2)} cm³.`,
    };
  },
});

// ─────────── Symétrie centrale (demi-tour)

const coord = (x: number, y: number) => `(${ecrireRelatif(x)} ; ${ecrireRelatif(y)})`;

export const symetrieCentrale5e = creerGenerateur({
  id: 'symetrie-centrale-5e',
  competence: 'MA-C4-5E-SYM-01',
  cycle: 4,
  description: 'Utiliser la définition et les propriétés de la symétrie centrale (demi-tour).',
  generer(a, d) {
    const t = a.entier(11, 89);
    if (d === 1) {
      const versDouble = a.suivant() < 0.5;
      return versDouble
        ? {
            gabarit: 'saisie', consigne: `A′ est le symétrique de A par rapport au point O. OA = ${dec(t, 1)} cm. Calcule AA′, en cm.`,
            reponse: depuisEntier(2 * t, 1),
            indice: 'O est le milieu du segment [AA′].',
            explication: `O est le milieu de [AA′], donc AA′ = 2 × OA = 2 × ${dec(t, 1)} = ${dec(2 * t, 1)} cm.`,
          }
        : {
            gabarit: 'saisie', consigne: `A′ est le symétrique de A par rapport au point O. AA′ = ${dec(2 * t, 1)} cm. Calcule OA′, en cm.`,
            reponse: depuisEntier(t, 1),
            indice: 'O est le milieu du segment [AA′].',
            explication: `O est le milieu de [AA′], donc OA′ = AA′ ÷ 2 = ${dec(t, 1)} cm.`,
          };
    }
    if (d === 2) {
      const lg = a.entier(2, 15);
      const ang = a.choisir([a.entier(20, 85), a.entier(95, 160)]);
      const proprietes: [string, string, string[]][] = [
        ['Par une symétrie centrale, l’image d’une droite est :', 'une droite parallèle', ['une droite perpendiculaire', 'un segment', 'un point']],
        [`Par une symétrie centrale, un segment de ${lg} cm a pour image :`, `un segment de ${lg} cm`, [`un segment de ${2 * lg} cm`, `un segment de ${lg + 1} cm`, 'une droite']],
        [`Par une symétrie centrale, un angle de ${ang}° a pour image :`, `un angle de ${ang}°`, [`un angle de ${180 - ang}°`, `un angle de ${ang + 15}°`, `un angle de ${ang - 15}°`]],
        ['Le symétrique du centre O par rapport à O est :', 'le point O lui-même', ['un point à 2 cm de O', 'n’importe quel point', 'il n’existe pas']],
        ['Une symétrie centrale correspond à :', 'un demi-tour autour du centre', ['un quart de tour autour du centre', 'un pliage le long d’une droite', 'un glissement']],
      ];
      const [q, r, pieges] = a.choisir(proprietes);
      return {
        gabarit: 'qcm', consigne: q, options: a.melanger([r, ...pieges]), reponse: r,
        indice: 'La symétrie centrale est un demi-tour : elle conserve longueurs, angles et alignements.',
        explication: `${q.replace(/ :$/, '')} ${r}. La symétrie centrale conserve les longueurs, les angles et le parallélisme.`,
      };
    }
    // Dans un repère, symétrique par rapport à l'origine.
    const x = a.entier(1, 9) * (a.suivant() < 0.5 ? -1 : 1);
    const y = a.entier(1, 9) * (a.suivant() < 0.5 ? -1 : 1);
    const reponse = coord(-x, -y);
    return {
      gabarit: 'qcm',
      consigne: `Dans un repère d’origine O, le point A a pour coordonnées ${coord(x, y)}. Quelles sont les coordonnées de son symétrique A′ par rapport à O ?`,
      options: options(a, reponse, [coord(-x, y), coord(x, -y), coord(y, x)], () => coord(x, y)),
      reponse,
      indice: 'O est le milieu de [AA′] : on prend les opposés des deux coordonnées.',
      explication: `L’abscisse ${ecrireRelatif(x)} devient ${ecrireRelatif(-x)} et l’ordonnée ${ecrireRelatif(y)} devient ${ecrireRelatif(-y)}. A′ a pour coordonnées ${reponse}.`,
    };
  },
});

// ─────────── Angles et parallélisme : alternes-internes, correspondants

export const anglesParalleles5e = creerGenerateur({
  id: 'angles-paralleles-5e',
  competence: 'MA-C4-5E-ANG-01',
  cycle: 4,
  description: 'Angles alternes-internes et correspondants : calculer, et caractériser le parallélisme.',
  generer(a, d) {
    const x = a.entier(25, 155);
    if (d < 3) {
      // d1 : angles alternes-internes ; d2 : angles correspondants.
      const type = d === 1 ? 'alterne-interne' : 'correspondant';
      return {
        gabarit: 'saisie',
        consigne: `Deux droites parallèles sont coupées par une sécante. Un angle mesure ${x}°. Calcule la mesure de l’angle ${type} qui lui est associé, en degrés.`,
        reponse: String(x),
        indice: 'Avec deux droites parallèles, deux angles alternes-internes ou correspondants ont la même mesure.',
        explication: `Les droites sont parallèles, donc les angles ${type === 'alterne-interne' ? 'alternes-internes' : 'correspondants'} ont la même mesure : ${x}°.`,
      };
    }
    // Réciproque : les droites sont-elles parallèles ?
    const egaux = a.suivant() < 0.5;
    const y = egaux ? x : x + a.choisir([-3, -2, 2, 4]);
    const type = a.choisir(['alternes-internes', 'correspondants']);
    return {
      gabarit: 'qcm',
      consigne: `Deux droites sont coupées par une sécante. Deux angles ${type} mesurent ${x}° et ${y}°. Les deux droites sont-elles parallèles ?`,
      options: a.melanger(['Oui', 'Non', 'On ne peut pas savoir']),
      reponse: egaux ? 'Oui' : 'Non',
      indice: 'Si deux angles alternes-internes (ou correspondants) sont égaux, les droites sont parallèles.',
      explication: egaux
        ? `Les deux angles ${type} sont égaux : les droites sont parallèles.`
        : `${x}° ≠ ${y}° : si les droites étaient parallèles, ces angles seraient égaux. Elles ne sont pas parallèles.`,
    };
  },
});

// ─────────── Triangles : aire, hauteurs, médianes

export const triangles5e = creerGenerateur({
  id: 'triangles-5e',
  competence: 'MA-C4-5E-TRI-01',
  cycle: 4,
  description: 'Calculer l’aire d’un triangle ; hauteurs et médianes.',
  generer(a, d) {
    const b = a.entier(3, 20);
    const h = a.entier(2, 15);
    if (d === 1) {
      return {
        gabarit: 'saisie',
        consigne: `Un triangle a une base de ${b} cm et une hauteur relative à cette base de ${h} cm. Calcule son aire, en cm².`,
        reponse: depuisEntier(b * h * 5, 1),
        indice: 'Aire du triangle = base × hauteur ÷ 2.',
        explication: `${b} × ${h} ÷ 2 = ${dec(b * h * 5, 1)}. L’aire vaut ${dec(b * h * 5, 1)} cm².`,
      };
    }
    if (d === 2) {
      const aire = (b * h) / 2;
      if (!Number.isInteger(aire)) {
        return {
          gabarit: 'saisie',
          consigne: `Un triangle a une aire de ${dec(b * h * 5, 1)} cm² et une base de ${b} cm. Calcule la hauteur relative à cette base, en cm.`,
          reponse: String(h),
          indice: 'Aire = base × hauteur ÷ 2, donc hauteur = 2 × aire ÷ base.',
          explication: `2 × ${dec(b * h * 5, 1)} = ${b * h}. ${b * h} ÷ ${b} = ${h}. La hauteur mesure ${h} cm.`,
        };
      }
      return {
        gabarit: 'saisie',
        consigne: `Une médiane partage un triangle d’aire ${fr(aire * 2)} cm² en deux triangles. Calcule l’aire de chacun, en cm².`,
        reponse: String(aire),
        indice: 'Une médiane partage un triangle en deux triangles de même aire.',
        explication: `Les deux triangles ont la même aire : ${fr(aire * 2)} ÷ 2 = ${aire} cm².`,
      };
    }
    const definitions: [string, string][] = [
      ['La droite qui passe par un sommet et qui est perpendiculaire au côté opposé s’appelle :', 'une hauteur'],
      ['Le segment qui joint un sommet au milieu du côté opposé s’appelle :', 'une médiane'],
      ['La droite perpendiculaire à un côté en son milieu s’appelle :', 'une médiatrice'],
      ['Les trois hauteurs d’un triangle sont :', 'concourantes'],
      ['Le point de concours des médiatrices d’un triangle est le centre :', 'du cercle circonscrit'],
    ];
    const [q, r] = a.choisir(definitions);
    const autres = ['une hauteur', 'une médiane', 'une médiatrice', 'une bissectrice'];
    const pieges = r === 'concourantes' ? ['parallèles', 'de même longueur', 'perpendiculaires'] : r === 'du cercle circonscrit' ? ['du triangle', 'de la hauteur', 'du côté le plus long'] : autres.filter((x) => x !== r).slice(0, 3);
    return {
      gabarit: 'qcm', consigne: q, options: a.melanger([r, ...pieges]), reponse: r,
      indice: 'Hauteur : angle droit. Médiane : milieu du côté opposé. Médiatrice : angle droit et milieu.',
      explication: `${q.replace(/ :$/, '')} ${r}.`,
    };
  },
});

// ─────────── Parallélogrammes : propriétés, parallélogrammes particuliers, aire

export const parallelogrammes5e = creerGenerateur({
  id: 'parallelogrammes-5e',
  competence: 'MA-C4-5E-PARA-01',
  cycle: 4,
  description: 'Propriétés du parallélogramme (côtés, angles, diagonales), parallélogrammes particuliers, aire.',
  generer(a, d) {
    if (d === 1) {
      const cas = a.entier(0, 3);
      const t = a.entier(11, 99);
      if (cas === 0) {
        return {
          gabarit: 'saisie', consigne: `ABCD est un parallélogramme. AB = ${dec(t, 1)} cm. Calcule CD, en cm.`, reponse: depuisEntier(t, 1),
          indice: 'Les côtés opposés d’un parallélogramme ont la même longueur.', explication: `[AB] et [CD] sont opposés, donc CD = AB = ${dec(t, 1)} cm.`,
        };
      }
      if (cas === 1) {
        return {
          gabarit: 'saisie', consigne: `ABCD est un parallélogramme de centre O. AC = ${dec(2 * t, 1)} cm. Calcule AO, en cm.`, reponse: depuisEntier(t, 1),
          indice: 'Les diagonales d’un parallélogramme se coupent en leur milieu.', explication: `O est le milieu de [AC], donc AO = ${dec(2 * t, 1)} ÷ 2 = ${dec(t, 1)} cm.`,
        };
      }
      const x = a.entier(35, 145);
      if (cas === 2) {
        return {
          gabarit: 'saisie', consigne: `ABCD est un parallélogramme. L’angle en A mesure ${x}°. Calcule l’angle en C, en degrés.`, reponse: String(x),
          indice: 'Les angles opposés d’un parallélogramme sont égaux.', explication: `A et C sont opposés, donc l’angle en C mesure aussi ${x}°.`,
        };
      }
      return {
        gabarit: 'saisie', consigne: `ABCD est un parallélogramme. L’angle en A mesure ${x}°. Calcule l’angle en B, en degrés.`, reponse: String(180 - x),
        indice: 'Deux angles consécutifs d’un parallélogramme sont supplémentaires.', explication: `180 − ${x} = ${180 - x}. L’angle en B mesure ${180 - x}°.`,
      };
    }
    if (d === 2) {
      const cas: [string, string][] = [
        ['Un parallélogramme a des diagonales de même longueur. C’est :', 'un rectangle'],
        ['Un parallélogramme a des diagonales perpendiculaires. C’est :', 'un losange'],
        ['Un parallélogramme a un angle droit. C’est :', 'un rectangle'],
        ['Un parallélogramme a deux côtés consécutifs de même longueur. C’est :', 'un losange'],
        ['Un parallélogramme a des diagonales perpendiculaires et de même longueur. C’est :', 'un carré'],
        ['Un quadrilatère a des diagonales qui se coupent en leur milieu. C’est :', 'un parallélogramme'],
        ['Un quadrilatère a ses côtés opposés parallèles deux à deux. C’est :', 'un parallélogramme'],
        ['Un quadrilatère a quatre côtés de même longueur. C’est :', 'un losange'],
        ['Un quadrilatère a trois angles droits. C’est :', 'un rectangle'],
        ['Un losange a un angle droit. C’est :', 'un carré'],
        ['Un rectangle a deux côtés consécutifs de même longueur. C’est :', 'un carré'],
        ['Un rectangle a des diagonales perpendiculaires. C’est :', 'un carré'],
        ['Un losange a des diagonales de même longueur. C’est :', 'un carré'],
      ];
      const [q, r] = a.choisir(cas);
      return {
        gabarit: 'qcm', consigne: q.replace(' C’est :', ' Quelle est sa nature la plus précise ?'),
        options: a.melanger(['un rectangle', 'un losange', 'un carré', 'un parallélogramme', 'un trapèze'].filter((x) => x !== r).slice(0, 3).concat(r)),
        reponse: r,
        indice: 'Diagonales de même longueur : rectangle. Diagonales perpendiculaires : losange. Les deux : carré.',
        explication: `${q.replace(/\. C’est :$/, '')} : c’est ${r}. On ne peut pas en dire plus.`,
      };
    }
    const b = a.entier(3, 20);
    const h = a.entier(2, 15);
    return {
      gabarit: 'saisie',
      consigne: `Un parallélogramme a un côté de ${b} cm et une hauteur relative à ce côté de ${h} cm. Calcule son aire, en cm².`,
      reponse: String(b * h),
      indice: 'Aire du parallélogramme = côté × hauteur relative à ce côté.',
      explication: `${b} × ${h} = ${b * h}. L’aire vaut ${b * h} cm². On ne divise pas par 2, contrairement au triangle.`,
    };
  },
});
