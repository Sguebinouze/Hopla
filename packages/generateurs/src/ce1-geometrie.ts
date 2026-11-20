// CE1, géométrie : solides usuels, figures planes, angles.
// Source : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024), p. 33 et 34.
import { choix, creerGenerateur, type Piege } from './outils';
import type { NomSolide } from './types';
/** La même étiquette pour toutes les options fausses. */
const tous = (opts: readonly string[], reponse: string, code: string) => Object.fromEntries(opts.filter((o) => o !== reponse).map((o) => [o, code]));


// ─────────── Solides : cube, pavé, pyramide, boule, cylindre, cône

const SOLIDES = ['cube', 'pavé', 'pyramide', 'boule', 'cylindre', 'cône'] as const;
type Solide = (typeof SOLIDES)[number];

const OBJETS: [string, Solide][] = [
  ['une boite à chaussures', 'pavé'], ['une boite de conserve', 'cylindre'], ['une balle de tennis', 'boule'], ['un dé à jouer', 'cube'],
  ['un morceau de sucre', 'cube'], ['une bille', 'boule'], ['une brique de lait', 'pavé'], ['un rouleau d’essuie-tout', 'cylindre'],
  ['une orange', 'boule'], ['une bougie ronde et droite', 'cylindre'], ['un chapeau pointu de fête', 'cône'], ['un plot de sport', 'cône'],
  ['une boite de mouchoirs', 'pavé'], ['un livre', 'pavé'], ['un globe terrestre', 'boule'], ['une canette', 'cylindre'],
  ['un cornet de glace', 'cône'], ['une pyramide d’Égypte', 'pyramide'], ['un glaçon carré', 'cube'], ['une brique de jeu', 'pavé'],
  ['un ballon de football', 'boule'], ['un tube de colle', 'cylindre'], ['une caisse en bois', 'pavé'], ['un entonnoir retourné', 'cône'],
  ['une tente pointue à base carrée', 'pyramide'],
];
const ARTICLE: Record<Solide, string> = { cube: 'un cube', pavé: 'un pavé', pyramide: 'une pyramide', boule: 'une boule', cylindre: 'un cylindre', cône: 'un cône' };
const DESSIN: Record<Solide, NomSolide> = { cube: 'cube', pavé: 'pave', pyramide: 'pyramide', boule: 'boule', cylindre: 'cylindre', cône: 'cone' };

// Nombre de faces, d'arêtes et de sommets.
export const POLYEDRES_CE1: { nom: string; dessin: NomSolide; faces: number; aretes: number; sommets: number; natureFaces: string }[] = [
  { nom: 'un cube', dessin: 'cube', faces: 6, aretes: 12, sommets: 8, natureFaces: '6 carrés' },
  { nom: 'un pavé', dessin: 'pave', faces: 6, aretes: 12, sommets: 8, natureFaces: '6 rectangles' },
  { nom: 'une pyramide à base carrée', dessin: 'pyramide', faces: 5, aretes: 8, sommets: 5, natureFaces: '1 carré et 4 triangles' },
];
const POLYEDRES = POLYEDRES_CE1;
const ELEMENTS = [
  { mot: 'faces', cle: 'faces', aide: 'Une face est une surface plate.' },
  { mot: 'arêtes', cle: 'aretes', aide: 'Une arête est un bord, là où deux faces se touchent.' },
  { mot: 'sommets', cle: 'sommets', aide: 'Un sommet est un coin, là où les arêtes se rejoignent.' },
] as const;

export const solidesCe1 = creerGenerateur({
  id: 'solides-ce1',
  competence: 'MA-C2-CE1-GEO-01',
  cycle: 2,
  description: 'Reconnaitre et nommer les solides usuels ; décrire le cube, le pavé et la pyramide.',
  generer(a, d) {
    if (d === 1) {
      const [objet, solide] = a.choisir(OBJETS);
      const reponse = ARTICLE[solide];
      const dessin = a.suivant() < 0.4;
      return {
        gabarit: 'qcm',
        consigne: dessin ? 'Comment s’appelle ce solide ?' : `Quelle est la forme d’${objet} ?`,
        ...(dessin ? { visuel: { type: 'solide', solide: DESSIN[solide] } as const } : {}),
        ...choix(a, reponse, a.melanger(SOLIDES.filter((s) => s !== solide)).slice(0, 3).map((s): Piege => [ARTICLE[s], 'solides-confondus']), () => ARTICLE[a.choisir(SOLIDES)]),
        reponse,
        indice: dessin ? 'Regarde ses faces. Roule-t-il ? A-t-il un sommet pointu ?' : 'Imagine l’objet. Roule-t-il ? A-t-il des faces plates ?',
        explication: dessin ? `C’est ${reponse}.` : `${objet[0]!.toUpperCase()}${objet.slice(1)} a la forme d’${reponse}.`,
      };
    }
    const p = a.choisir(POLYEDRES);
    if (d === 2) {
      const e = a.choisir(ELEMENTS);
      const n = p[e.cle];
      const dessin = a.suivant() < 0.5;
      return {
        gabarit: 'qcm',
        consigne: `Combien ${/^[aeéiou]/.test(e.mot) ? 'd’' : 'de '}${e.mot} a ${dessin ? 'ce solide' : p.nom} ?`,
        ...(dessin ? { visuel: { type: 'solide', solide: p.dessin } as const } : {}),
        ...choix(a, String(n), ([[String(p.faces), 'faces-aretes-sommets'], [String(p.aretes), 'faces-aretes-sommets'], [String(p.sommets), 'faces-aretes-sommets'], [String(n + 2)]] as Piege[]).filter(([x]) => x !== String(n)), () => String(a.entier(3, 14))),
        reponse: String(n),
        indice: dessin ? `${e.aide} Les pointillés montrent ce qui est caché.` : e.aide,
        explication: `${p.nom[0]!.toUpperCase()}${p.nom.slice(1)} : ${p.faces} faces, ${p.aretes} arêtes, ${p.sommets} sommets.`,
      };
    }
    // Nature des faces, ou retrouver le solide d'après ses faces.
    if (a.suivant() < 0.5) {
      return {
        gabarit: 'qcm',
        consigne: `Quelles sont les faces d’${p.nom} ?`,
        ...((opts) => ({ options: opts, erreurs: tous(opts, p.natureFaces, 'solides-confondus') }))(a.melanger(POLYEDRES.map((x) => x.natureFaces).concat('6 triangles'))),
        reponse: p.natureFaces,
        indice: 'Imagine le solide posé sur la table. Regarde chaque face.',
        explication: `Ses faces sont : ${p.natureFaces}.`,
      };
    }
    return {
      gabarit: 'qcm',
      consigne: `Un solide a ${p.natureFaces} comme faces. Quel est ce solide ?`,
      ...((opts) => ({ options: opts, erreurs: tous(opts, p.nom, 'solides-confondus') }))(a.melanger(POLYEDRES.map((x) => x.nom).concat('un cylindre'))),
      reponse: p.nom,
      indice: 'Compte les faces. Regarde leur forme.',
      explication: `${p.natureFaces[0]!.toUpperCase()}${p.natureFaces.slice(1)} : c’est ${p.nom}.`,
    };
  },
});

// ─────────── Figures planes : carré, rectangle, triangle, triangle rectangle, angles

const FIGURES = ['un carré', 'un rectangle', 'un triangle', 'un triangle rectangle'] as const;

/** Descriptions rédigées : chaque figure par ses côtés et ses angles. */
const DESCRIPTIONS: [string, (typeof FIGURES)[number]][] = [
  ['Elle a 4 côtés de même longueur et 4 angles droits.', 'un carré'],
  ['Elle a 4 angles droits. Ses côtés ne sont pas tous égaux.', 'un rectangle'],
  ['Elle a 3 côtés. Aucun de ses angles n’est droit.', 'un triangle'],
  ['Elle a 3 côtés. Un de ses angles est droit.', 'un triangle rectangle'],
  ['Ses 4 côtés mesurent 5 cm. Ses 4 angles sont droits.', 'un carré'],
  ['Ses côtés mesurent 6 cm, 3 cm, 6 cm et 3 cm. Ses angles sont droits.', 'un rectangle'],
  ['Elle a 3 sommets. Aucun angle n’est droit.', 'un triangle'],
  ['Elle a 3 côtés et un angle droit.', 'un triangle rectangle'],
  ['Ses côtés mesurent 8 cm, 2 cm, 8 cm et 2 cm. Ses angles sont droits.', 'un rectangle'],
  ['Ses 4 côtés mesurent 3 cm. Ses 4 angles sont droits.', 'un carré'],
];

export const figuresCe1 = creerGenerateur({
  id: 'figures-ce1',
  competence: 'MA-C2-CE1-GEO-02',
  cycle: 2,
  description: 'Reconnaitre le carré, le rectangle, le triangle et le triangle rectangle ; angles droits, aigus, obtus.',
  generer(a, d) {
    if (d === 1) {
      const [description, figure] = a.choisir(DESCRIPTIONS);
      return {
        gabarit: 'qcm',
        consigne: `${description} Quelle est cette figure ?`,
        options: a.melanger([...FIGURES]),
        erreurs: Object.fromEntries(FIGURES.filter((f) => f !== figure).map((f) => [f,
          f.includes('triangle') && figure.includes('triangle') ? 'angle-droit-non-verifie' : !f.includes('triangle') && !figure.includes('triangle') ? 'carre-rectangle-confondus' : 'figures-confondues'])),
        reponse: figure,
        indice: 'Compte les côtés. Cherche les angles droits.',
        explication: `${description} C’est ${figure}.`,
      };
    }
    if (d === 2) {
      const forme = a.entier(0, 2);
      if (forme === 0) {
        const questions: [string, number, string][] = [
          ['Combien d’angles droits a un rectangle ?', 4, 'Un rectangle a 4 angles droits.'],
          ['Combien d’angles droits a un carré ?', 4, 'Un carré a 4 angles droits.'],
          ['Combien d’angles droits a un triangle rectangle ?', 1, 'Un triangle rectangle a un seul angle droit.'],
          ['Combien de sommets a un rectangle ?', 4, 'Un rectangle a 4 sommets.'],
          ['Combien de côtés a un triangle ?', 3, 'Un triangle a 3 côtés.'],
          ['Combien de sommets a un triangle ?', 3, 'Un triangle a 3 sommets.'],
        ];
        const [q, n, e] = a.choisir(questions);
        return {
          gabarit: 'saisie', consigne: q, reponse: String(n),
          indice: 'Pense à la figure. Compte sur tes doigts.', explication: e,
        };
      }
      if (forme === 1) {
        const c = a.entier(2, 15);
        return {
          gabarit: 'saisie',
          consigne: `Un côté d’un carré mesure ${c} cm. Combien mesure un autre côté, en cm ?`,
          reponse: String(c),
          indice: 'Les côtés d’un carré ont tous la même longueur.',
          explication: `Les 4 côtés d’un carré ont la même longueur. Chaque côté mesure ${c} cm.`,
        };
      }
      const L = a.entier(5, 20);
      const l = a.entier(2, L - 1);
      const longueur = a.suivant() < 0.5;
      return {
        gabarit: 'saisie',
        consigne: `Un rectangle mesure ${L} cm de long et ${l} cm de large. Combien mesure le côté opposé à la ${longueur ? 'longueur' : 'largeur'}, en cm ?`,
        reponse: String(longueur ? L : l),
        indice: 'Dans un rectangle, les côtés opposés ont la même longueur.',
        explication: `Les côtés opposés d’un rectangle ont la même longueur. Le côté cherché mesure ${longueur ? L : l} cm.`,
      };
    }
    // Angles, et justifier qu'une figure n'est pas un rectangle.
    if (a.suivant() < 0.5) {
      const cas: [string, string, string][] = [
        ['Un angle est plus petit qu’un angle droit. Comment l’appelle-t-on ?', 'un angle aigu', 'Plus petit qu’un angle droit : c’est un angle aigu.'],
        ['Un angle est plus grand qu’un angle droit. Comment l’appelle-t-on ?', 'un angle obtus', 'Plus grand qu’un angle droit : c’est un angle obtus.'],
        ['Un angle a la forme du coin d’une feuille. Comment l’appelle-t-on ?', 'un angle droit', 'Le coin d’une feuille forme un angle droit.'],
        ['L’équerre trace un angle. Comment l’appelle-t-on ?', 'un angle droit', 'L’équerre sert à tracer un angle droit.'],
      ];
      const [q, r, e] = a.choisir(cas);
      return {
        gabarit: 'qcm', consigne: q,
        options: a.melanger(['un angle aigu', 'un angle droit', 'un angle obtus']),
        erreurs: tous(['un angle aigu', 'un angle droit', 'un angle obtus'], r, 'angles-confondus'),
        reponse: r,
        indice: 'Compare l’angle avec le coin d’une feuille.',
        explication: e,
      };
    }
    const cas: [string, string, string[], string][] = [
      ['Une figure a 4 côtés. Un de ses angles n’est pas droit. Est-ce un rectangle ?', 'Non, car un angle n’est pas droit.', ['Oui, car elle a 4 côtés.', 'Oui, car elle a 4 sommets.'], 'Un rectangle a 4 angles droits. Un seul angle qui n’est pas droit suffit pour dire non.'],
      ['Une figure a 4 angles droits. Ses côtés opposés ont la même longueur. Est-ce un rectangle ?', 'Oui, car elle a 4 angles droits.', ['Non, car elle a 4 côtés.', 'Non, car elle n’a pas de sommet.'], 'Elle a 4 angles droits et ses côtés opposés sont égaux. C’est un rectangle.'],
      ['Une figure a 3 côtés et 4 sommets. Est-ce possible ?', 'Non, un triangle a 3 sommets.', ['Oui, c’est un triangle.', 'Oui, c’est un carré.'], 'Une figure a autant de côtés que de sommets. Avec 3 côtés, elle a 3 sommets.'],
      ['Une figure a 4 angles droits. Ses côtés ne sont pas tous égaux. Est-ce un carré ?', 'Non, car ses côtés ne sont pas tous égaux.', ['Oui, car elle a 4 angles droits.', 'Oui, car elle a 4 côtés.'], 'Un carré a 4 côtés égaux. Cette figure est un rectangle.'],
      ['Une figure a 3 côtés et un angle droit. Est-ce un triangle rectangle ?', 'Oui, car elle a un angle droit.', ['Non, car elle a 3 côtés.', 'Non, il faut 4 angles droits.'], 'Un triangle rectangle a 3 côtés et un angle droit.'],
    ];
    const [q, r, pieges, e] = a.choisir(cas);
    return {
      gabarit: 'qcm', consigne: q, options: a.melanger([r, ...pieges]), erreurs: tous(pieges, r, 'propriete-figure'), reponse: r,
      indice: 'Repense aux propriétés : côtés, angles droits, longueurs.',
      explication: e,
    };
  },
});
