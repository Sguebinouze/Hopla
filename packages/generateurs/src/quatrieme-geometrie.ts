// 4e, espace et géométrie (programme 2026) : théorème de Pythagore et réciproque, droite des milieux, volumes de la
// pyramide et du cône, translations, triangle rectangle et cercle circonscrit.
// Source : programme de mathématiques du cycle 4 (arrêté du 18 février 2026, BO n°10 du 5 mars 2026), p. 47 et 48.
import { depuisEntier } from './decimaux';
import { creerGenerateur, fr, frDecimal, options } from './outils';
import { ecrireRelatif } from './relatifs-c4';

const dec = (n: number, c: number) => frDecimal(depuisEntier(n, c));
/** Triplets pythagoriciens primitifs : côtés de l'angle droit, hypoténuse. */
const TRIPLETS: [number, number, number][] = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
const NOMS = [['A', 'B', 'C'], ['E', 'F', 'G'], ['R', 'S', 'T'], ['K', 'L', 'M']] as const;

// ─────────── Théorème de Pythagore, réciproque, contraposée

export const pythagore4e = creerGenerateur({
  id: 'pythagore-4e',
  competence: 'MA-C4-4E-PYTH-01',
  cycle: 4,
  description: 'Calculer une longueur avec le théorème de Pythagore ; prouver qu’un triangle est rectangle ou non.',
  generer(a, d) {
    const [x, y, z] = a.choisir(TRIPLETS);
    const k = a.choisir([1, 1, 2, 3]);
    const [A, B, C] = a.choisir(NOMS);
    if (d === 1) {
      return {
        gabarit: 'saisie',
        consigne: `${A}${B}${C} est rectangle en ${A}. ${A}${B} = ${x * k} cm et ${A}${C} = ${y * k} cm. Calcule ${B}${C}, en cm.`,
        reponse: String(z * k),
        indice: 'Dans un triangle rectangle, le carré de l’hypoténuse est égal à la somme des carrés des deux autres côtés.',
        explication: `${B}${C}² = ${x * k}² + ${y * k}² = ${fr((x * k) ** 2)} + ${fr((y * k) ** 2)} = ${fr((z * k) ** 2)}. ${B}${C} = √${fr((z * k) ** 2)} = ${z * k} cm.`,
      };
    }
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `${A}${B}${C} est rectangle en ${A}. ${B}${C} = ${z * k} cm et ${A}${B} = ${x * k} cm. Calcule ${A}${C}, en cm.`,
        reponse: String(y * k),
        indice: '[BC] est l’hypoténuse : c’est le côté le plus long. Calcule BC² − AB².',
        explication: `${A}${C}² = ${B}${C}² − ${A}${B}² = ${fr((z * k) ** 2)} − ${fr((x * k) ** 2)} = ${fr((y * k) ** 2)}. ${A}${C} = ${y * k} cm.`,
      };
    }
    // Réciproque ou contraposée : comparer le carré du plus grand côté à la somme des deux autres.
    const rectangle = a.suivant() < 0.5;
    const grand = rectangle ? z * k : z * k + a.choisir([-1, 1]);
    const somme = (x * k) ** 2 + (y * k) ** 2;
    return {
      gabarit: 'qcm',
      consigne: `Un triangle a des côtés de ${x * k} cm, ${y * k} cm et ${grand} cm. Est-il rectangle ?`,
      options: a.melanger(['Oui', 'Non', 'On ne peut pas savoir']),
      reponse: rectangle ? 'Oui' : 'Non',
      indice: 'Compare le carré du plus grand côté à la somme des carrés des deux autres.',
      explication: rectangle
        ? `${grand}² = ${fr(grand ** 2)} et ${x * k}² + ${y * k}² = ${fr(somme)}. Égalité : d’après la réciproque du théorème de Pythagore, le triangle est rectangle.`
        : `${grand}² = ${fr(grand ** 2)} et ${x * k}² + ${y * k}² = ${fr(somme)}. ${fr(grand ** 2)} ≠ ${fr(somme)} : d’après la contraposée du théorème de Pythagore, le triangle n’est pas rectangle.`,
    };
  },
});

// ─────────── Droite des milieux

export const droiteMilieux4e = creerGenerateur({
  id: 'droite-milieux-4e',
  competence: 'MA-C4-4E-MIL-01',
  cycle: 4,
  description: 'Utiliser les théorèmes de la droite des milieux pour calculer une longueur ou justifier un parallélisme.',
  generer(a, d) {
    const t = a.entier(20, 160);
    if (d === 1) {
      return {
        gabarit: 'saisie',
        consigne: `Dans le triangle ABC, I est le milieu de [AB] et J le milieu de [AC]. BC = ${dec(t, 1)} cm. Calcule IJ, en cm.`,
        reponse: depuisEntier(t * 5, 2),
        indice: 'Le segment qui joint les milieux de deux côtés mesure la moitié du troisième côté.',
        explication: `D’après le théorème des milieux, IJ = BC ÷ 2 = ${dec(t, 1)} ÷ 2 = ${dec(t * 5, 2)} cm.`,
      };
    }
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `Dans le triangle ABC, I est le milieu de [AB] et J le milieu de [AC]. IJ = ${dec(t, 1)} cm. Calcule BC, en cm.`,
        reponse: depuisEntier(2 * t, 1),
        indice: 'BC est le double de IJ.',
        explication: `IJ = BC ÷ 2, donc BC = 2 × ${dec(t, 1)} = ${dec(2 * t, 1)} cm.`,
      };
    }
    // Droite passant par un milieu, parallèle à un côté : elle coupe le troisième côté en son milieu.
    if (a.suivant() < 0.5) {
      return {
        gabarit: 'saisie',
        consigne: `Dans le triangle ABC, I est le milieu de [AB]. La parallèle à (BC) passant par I coupe [AC] en J. AC = ${dec(t, 1)} cm. Calcule AJ, en cm.`,
        reponse: depuisEntier(t * 5, 2),
        indice: 'Une droite qui passe par le milieu d’un côté et qui est parallèle à un deuxième côté coupe le troisième en son milieu.',
        explication: `J est le milieu de [AC], donc AJ = ${dec(t, 1)} ÷ 2 = ${dec(t * 5, 2)} cm.`,
      };
    }
    const enonces: [string, string, string[]][] = [
      ['I et J sont les milieux de [AB] et [AC]. Que peut-on dire des droites (IJ) et (BC) ?', 'Elles sont parallèles.', ['Elles sont perpendiculaires.', 'Elles sont sécantes en I.', 'On ne peut rien dire.']],
      ['I est le milieu de [AB] et (IJ) est parallèle à (BC), avec J sur [AC]. Que peut-on dire de J ?', 'J est le milieu de [AC].', ['J est le milieu de [BC].', 'AJ = BC.', 'On ne peut rien dire.']],
    ];
    const [q, r, pieges] = a.choisir(enonces);
    return {
      gabarit: 'qcm', consigne: `Dans le triangle ABC, ${q}`, options: a.melanger([r, ...pieges]), reponse: r,
      indice: 'Pense aux trois théorèmes de la droite des milieux.',
      explication: `D’après le théorème de la droite des milieux, la réponse est : ${r}`,
    };
  },
});

// ─────────── Volumes de la pyramide et du cône

export const volumesPyramideCone4e = creerGenerateur({
  id: 'volumes-pyramide-cone-4e',
  competence: 'MA-C4-4E-VOL-01',
  cycle: 4,
  description: 'Calculer le volume d’une pyramide et d’un cône de révolution.',
  generer(a, d) {
    if (d === 1) {
      const B = a.entier(2, 40) * 3;
      const h = a.entier(2, 15);
      return {
        gabarit: 'saisie',
        consigne: `Une pyramide a une base d’aire ${B} cm² et une hauteur de ${h} cm. Calcule son volume, en cm³.`,
        reponse: String((B * h) / 3),
        indice: 'Volume d’une pyramide = aire de la base × hauteur ÷ 3.',
        explication: `${B} × ${h} ÷ 3 = ${fr((B * h) / 3)}. Le volume est ${fr((B * h) / 3)} cm³.`,
      };
    }
    if (d === 2) {
      const c = a.entier(2, 12);
      const h = a.entier(1, 10) * 3;
      return {
        gabarit: 'saisie',
        consigne: `Une pyramide a pour base un carré de ${c} cm de côté et une hauteur de ${h} cm. Calcule son volume, en cm³.`,
        reponse: String((c * c * h) / 3),
        indice: 'Calcule d’abord l’aire de la base carrée.',
        explication: `Aire de la base : ${c} × ${c} = ${c * c} cm². Volume : ${c * c} × ${h} ÷ 3 = ${fr((c * c * h) / 3)} cm³.`,
      };
    }
    const r = a.entier(1, 9);
    const h = a.entier(1, 10) * 3;
    // 3,14 × r² × h ÷ 3, avec h multiple de 3 : calcul exact en centièmes.
    const v = (314 * r * r * h) / 3;
    return {
      gabarit: 'saisie',
      consigne: `Un cône de révolution a un rayon de base de ${r} cm et une hauteur de ${h} cm. Calcule son volume, en cm³. Prends 3,14 pour π.`,
      reponse: depuisEntier(v, 2),
      indice: 'Volume du cône = π × rayon² × hauteur ÷ 3.',
      explication: `3,14 × ${r}² × ${h} ÷ 3 = ${dec(v, 2)}. Le volume vaut environ ${dec(v, 2)} cm³.`,
    };
  },
});

// ─────────── Translations

const coord = (x: number, y: number) => `(${ecrireRelatif(x)} ; ${ecrireRelatif(y)})`;

export const translations4e = creerGenerateur({
  id: 'translations-4e',
  competence: 'MA-C4-4E-TRANS-01',
  cycle: 4,
  description: 'Effet d’une translation : conservations, lien avec le parallélogramme, image d’un point dans un repère.',
  generer(a, d) {
    if (d === 1) {
      const t = a.entier(11, 99);
      const x = a.entier(20, 160);
      const angle = a.suivant() < 0.5;
      return angle
        ? {
            gabarit: 'saisie', consigne: `Un angle mesure ${x}°. Calcule la mesure de son image par une translation, en degrés.`, reponse: String(x),
            indice: 'Une translation conserve les angles.', explication: `La translation conserve les mesures d’angles : l’image mesure ${x}°.`,
          }
        : {
            gabarit: 'saisie', consigne: `Un segment mesure ${dec(t, 1)} cm. Calcule la longueur de son image par une translation, en cm.`, reponse: depuisEntier(t, 1),
            indice: 'Une translation conserve les longueurs.', explication: `La translation conserve les longueurs : l’image mesure ${dec(t, 1)} cm.`,
          };
    }
    if (d === 2 && a.suivant() < 0.5) {
      const aire = a.entier(6, 120);
      const figure = a.choisir(['un triangle', 'un rectangle', 'un disque', 'un parallélogramme']);
      return {
        gabarit: 'saisie', consigne: `${figure[0]!.toUpperCase()}${figure.slice(1)} a une aire de ${aire} cm². Calcule l’aire de son image par une translation, en cm².`,
        reponse: String(aire),
        indice: 'Une translation conserve les longueurs, donc aussi les aires.',
        explication: `La translation conserve les longueurs et les angles : l’image a la même aire, ${aire} cm².`,
      };
    }
    if (d === 2) {
      const enonces: [string, string, string[]][] = [
        ['La translation qui transforme A en B transforme C en D. Quelle est la nature de ABDC ?', 'un parallélogramme', ['un trapèze quelconque', 'un triangle', 'un cercle']],
        ['Par une translation, l’image d’une droite est :', 'une droite parallèle', ['une droite perpendiculaire', 'un point', 'un cercle']],
        ['Par une translation, l’image d’un cercle de rayon 3 cm est :', 'un cercle de rayon 3 cm', ['un cercle de rayon 6 cm', 'un disque de rayon 1,5 cm', 'un segment']],
        ['Une translation fait glisser une figure :', 'sans la tourner ni la retourner', ['en la faisant tourner d’un demi-tour', 'en la retournant comme un pliage', 'en l’agrandissant']],
      ];
      const [q, r, pieges] = a.choisir(enonces);
      return {
        gabarit: 'qcm', consigne: q, options: a.melanger([r, ...pieges]), reponse: r,
        indice: 'Une translation est un glissement : direction, sens et longueur fixés.',
        explication: `Réponse : ${r}. Une translation conserve les longueurs, les angles et le parallélisme.`,
      };
    }
    const [ax, ay, bx, by] = [a.entier(-6, 6), a.entier(-6, 6), a.entier(-6, 6), a.entier(-6, 6)];
    const [cx, cy] = [a.entier(-6, 6), a.entier(-6, 6)];
    const [dx, dy] = [bx - ax, by - ay];
    const reponse = coord(cx + dx, cy + dy);
    return {
      gabarit: 'qcm',
      consigne: `Dans un repère, A${coord(ax, ay)} et B${coord(bx, by)}. La translation qui transforme A en B transforme C${coord(cx, cy)} en D. Quelles sont les coordonnées de D ?`,
      options: options(a, reponse, [coord(cx - dx, cy - dy), coord(cx + dy, cy + dx), coord(bx + cx, by + cy)], () => coord(cx + dx + 1, cy + dy)),
      reponse,
      indice: 'Pour aller de A à B, de combien se déplace-t-on horizontalement et verticalement ?',
      explication: `De A à B : ${ecrireRelatif(dx)} en abscisse et ${ecrireRelatif(dy)} en ordonnée. On applique le même déplacement à C : D${reponse}.`,
    };
  },
});

// ─────────── Triangle rectangle et cercle circonscrit

export const cercleCirconscrit4e = creerGenerateur({
  id: 'cercle-circonscrit-4e',
  competence: 'MA-C4-4E-CERC-01',
  cycle: 4,
  description: 'Triangle rectangle inscrit dans un demi-cercle : centre et rayon du cercle circonscrit, angle droit.',
  generer(a, d) {
    const t = a.entier(20, 180);
    if (d === 1) {
      return {
        gabarit: 'saisie',
        consigne: `Le triangle ABC est rectangle en A et BC = ${dec(t, 1)} cm. Calcule le rayon de son cercle circonscrit, en cm.`,
        reponse: depuisEntier(t * 5, 2),
        indice: 'Le cercle circonscrit à un triangle rectangle a pour diamètre l’hypoténuse.',
        explication: `[BC] est un diamètre du cercle circonscrit. Rayon = ${dec(t, 1)} ÷ 2 = ${dec(t * 5, 2)} cm.`,
      };
    }
    if (d === 2 && a.suivant() < 0.5) {
      return {
        gabarit: 'saisie',
        consigne: `Le triangle ABC est rectangle en A. Son cercle circonscrit a un rayon de ${dec(t, 1)} cm. Calcule BC, en cm.`,
        reponse: depuisEntier(2 * t, 1),
        indice: 'L’hypoténuse est un diamètre du cercle circonscrit.',
        explication: `[BC] est un diamètre : BC = 2 × ${dec(t, 1)} = ${dec(2 * t, 1)} cm.`,
      };
    }
    if (d === 2) {
      const enonces: [string, string, string[]][] = [
        ['Le triangle ABC est rectangle en A. Où est le centre de son cercle circonscrit ?', 'au milieu de [BC]', ['au point A', 'au milieu de [AB]', 'à l’intérieur du triangle, loin des côtés']],
        ['Le point A est sur le cercle de diamètre [BC], distinct de B et C. Que mesure l’angle BAC ?', '90°', ['45°', '60°', '180°']],
        ['Le triangle EFG est rectangle en G. Quel segment est un diamètre de son cercle circonscrit ?', '[EF]', ['[EG]', '[FG]', 'aucun']],
      ];
      const [q, r, pieges] = a.choisir(enonces);
      return {
        gabarit: 'qcm', consigne: q, options: a.melanger([r, ...pieges]), reponse: r,
        indice: 'Un triangle est rectangle si et seulement s’il est inscrit dans un demi-cercle dont le diamètre est un de ses côtés.',
        explication: `Réponse : ${r}. L’hypoténuse d’un triangle rectangle est un diamètre de son cercle circonscrit.`,
      };
    }
    // Médiane relative à l'hypoténuse.
    return {
      gabarit: 'saisie',
      consigne: `Le triangle ABC est rectangle en A. M est le milieu de [BC] et BC = ${dec(t, 1)} cm. Calcule AM, en cm.`,
      reponse: depuisEntier(t * 5, 2),
      indice: 'A est sur le cercle de centre M et de diamètre [BC].',
      explication: `M est le centre du cercle circonscrit et A est sur ce cercle : AM = MB = ${dec(t, 1)} ÷ 2 = ${dec(t * 5, 2)} cm.`,
    };
  },
});
