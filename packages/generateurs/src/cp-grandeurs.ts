// CP, grandeurs et mesures, espace et géométrie, données.
// Source : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024).
import { choix, creerGenerateur, erreursDe, qte } from './outils';

const PRENOMS = ['Léa', 'Anna', 'Mia', 'Paul', 'Jan', 'Aaron', 'Hugo', 'Zoé'];
const FILLES = ['Léa', 'Anna', 'Mia', 'Zoé'];

// ─────────── Longueurs : ordres de grandeur, mètre et centimètre

// Objet, dimension demandée, bonne réponse, pièges nettement faux.
const LONGUEURS_REPERES: [string, string, string[]][] = [
  ['une trousse', '20 cm', ['2 cm', '2 m']],
  ['une gomme', '4 cm', ['40 cm', '4 m']],
  ['un cahier', '30 cm', ['3 cm', '3 m']],
  ['un crayon', '15 cm', ['1 cm', '15 m']],
  ['une porte', '2 m', ['2 cm', '20 cm']],
  ['un lit', '2 m', ['2 cm', '20 cm']],
  ['une voiture', '4 m', ['4 cm', '40 cm']],
  ['un bus', '12 m', ['12 cm', '1 cm']],
  ['une cuillère', '15 cm', ['1 cm', '15 m']],
  ['une règle d’écolier', '20 cm', ['2 cm', '20 m']],
  ['une table de classe', '1 m', ['1 cm', '10 cm']],
  ['un trombone', '3 cm', ['30 cm', '3 m']],
];

export const longueursCp = creerGenerateur({
  id: 'longueurs-cp',
  competence: 'MA-C2-CP-LONG-01',
  cycle: 2,
  description: 'Choisir une longueur plausible, comparer des longueurs en m et cm, résoudre un problème de longueurs.',
  generer(a, d) {
    if (d === 1) {
      const [objet, juste, pieges] = a.choisir(LONGUEURS_REPERES);
      return {
        gabarit: 'qcm',
        consigne: `Combien mesure ${objet}, à peu près ?`,
        options: a.melanger([juste, ...pieges]),
        // Même nombre, autre unité : confusion cm et m ; sinon, ordre de grandeur invraisemblable.
        erreurs: Object.fromEntries(pieges.map((p) => [p, p.split(' ')[0] === juste.split(' ')[0] ? 'unite-confondue' : 'estimation-longueur'])),
        reponse: juste,
        indice: '1 cm, c’est la largeur d’un doigt. 1 m, c’est un grand pas.',
        explication: `${objet.charAt(0).toUpperCase()}${objet.slice(1)} mesure environ ${juste}.`,
      };
    }
    if (d === 2) {
      const plusLongue = a.suivant() < 0.5;
      const cm = new Set<number>();
      while (cm.size < 3) cm.add(a.entier(1, 9) * 10 + a.choisir([0, 5]));
      const valeurs = [...cm].map((v) => ({ texte: `${v} cm`, v }));
      valeurs.push({ texte: '1 m', v: 100 });
      const cible = valeurs.reduce((p, q) => ((plusLongue ? q.v > p.v : q.v < p.v) ? q : p));
      const opposee = valeurs.reduce((p, q) => ((plusLongue ? q.v < p.v : q.v > p.v) ? q : p));
      // Sans conversion, « 1 m » parait la plus petite et le plus grand nombre de cm la plus grande.
      const sansConversion = plusLongue ? valeurs.filter((x) => x.texte !== '1 m').reduce((p, q) => (q.v > p.v ? q : p)) : valeurs[3]!;
      const opts = a.melanger(valeurs.map((x) => x.texte));
      return {
        gabarit: 'qcm',
        consigne: `Quelle longueur est la plus ${plusLongue ? 'grande' : 'petite'} ?`,
        options: opts,
        erreurs: erreursDe(opts, cible.texte, [[sansConversion.texte, 'unites-non-converties'], [opposee.texte, 'plus-grand-plus-petit-confondus']]),
        reponse: cible.texte,
        indice: '1 m, c’est 100 cm.',
        explication: `1 m = 100 cm. On range : ${[...valeurs].sort((p, q) => p.v - q.v).map((x) => x.texte).join(' < ')}. La plus ${plusLongue ? 'grande' : 'petite'} est ${cible.texte}.`,
      };
    }
    const qui = a.choisir(PRENOMS);
    const forme = a.entier(0, 2);
    if (forme === 0) {
      const total = a.entier(20, 99);
      const coupe = a.entier(5, total - 5);
      return {
        gabarit: 'saisie',
        consigne: `${qui} a un ruban de ${total} cm. On en coupe ${coupe} cm. Combien de centimètres reste-t-il ?`,
        reponse: String(total - coupe),
        indice: 'Le ruban devient plus court.',
        explication: `${total} − ${coupe} = ${total - coupe}. Il reste ${total - coupe} cm de ruban.`,
      };
    }
    if (forme === 1) {
      const x = a.entier(10, 50);
      const y = a.entier(10, 99 - x);
      return {
        gabarit: 'saisie',
        consigne: `${qui} a deux baguettes : ${x} cm et ${y} cm. On les met bout à bout. Quelle longueur obtient-on, en centimètres ?`,
        reponse: String(x + y),
        indice: 'On met les longueurs bout à bout : on les ajoute.',
        explication: `${x} + ${y} = ${x + y}. On obtient ${x + y} cm.`,
      };
    }
    const n = a.entier(1, 9) * 10;
    return {
      gabarit: 'saisie',
      consigne: `Une ficelle mesure ${n} cm. Combien de centimètres faut-il ajouter pour faire 1 m ?`,
      reponse: String(100 - n),
      indice: '1 m, c’est 100 cm.',
      explication: `1 m = 100 cm. ${n} + ${100 - n} = 100. Il faut ajouter ${100 - n} cm.`,
    };
  },
});

// ─────────── Monnaie : compter une somme, rendre la monnaie (montants entiers jusqu'à 100 €)

type Moyen = { valeur: number; billet: boolean };
const PIECES_BILLETS_CP: Moyen[] = [
  { valeur: 1, billet: false }, { valeur: 2, billet: false },
  { valeur: 5, billet: true }, { valeur: 10, billet: true }, { valeur: 20, billet: true },
];
const ecrireMoyen = (n: number, m: Moyen) => `${qte(n, m.billet ? 'billet' : 'pièce')} de ${m.valeur} €`;

export const monnaieCp = creerGenerateur({
  id: 'monnaie-cp',
  competence: 'MA-C2-CP-MONN-01',
  cycle: 2,
  description: 'Trouver la valeur d’un ensemble de pièces et de billets, rendre la monnaie.',
  generer(a, d) {
    if (d === 3) {
      const billet = a.choisir([20, 50, 100]);
      const prix = a.entier(Math.floor(billet / 2), billet - 1);
      const objet = a.choisir(['un livre', 'un ballon', 'un jeu', 'une trousse', 'une poupée']);
      return {
        gabarit: 'saisie',
        consigne: `${objet.charAt(0).toUpperCase()}${objet.slice(1)} coute ${prix} €. Tu payes avec un billet de ${billet} €. Combien le vendeur te rend-il, en euros ?`,
        reponse: String(billet - prix),
        indice: `Cherche ce qui manque à ${prix} pour aller jusqu’à ${billet}.`,
        explication: `${prix} + ${billet - prix} = ${billet}. Le vendeur te rend ${billet - prix} €.`,
      };
    }
    const qui = a.choisir(PRENOMS);
    let moyens: Moyen[];
    let nombres: number[];
    do {
      moyens = d === 1
        ? [PIECES_BILLETS_CP[3]!, PIECES_BILLETS_CP[0]!]
        : a.melanger(PIECES_BILLETS_CP).slice(0, 3).sort((p, q) => q.valeur - p.valeur);
      nombres = moyens.map(() => a.entier(1, d === 1 ? 9 : 4));
    } while (moyens.reduce((s, m, i) => s + m.valeur * nombres[i]!, 0) > 100);
    const total = moyens.reduce((s, m, i) => s + m.valeur * nombres[i]!, 0);
    const morceaux = moyens.map((m, i) => ecrireMoyen(nombres[i]!, m));
    const elle = FILLES.includes(qui);
    const avoir = morceaux.length === 2
      ? `${qui} a ${morceaux[0]} et ${morceaux[1]}.`
      : `${qui} a ${morceaux[0]}. ${elle ? 'Elle' : 'Il'} a aussi ${morceaux[1]} et ${morceaux[2]}.`;
    return {
      gabarit: 'saisie',
      consigne: `${avoir} Combien d’euros a-t-${elle ? 'elle' : 'il'} en tout ?`,
      reponse: String(total),
      indice: 'Compte d’abord les billets. Puis ajoute les pièces.',
      explication: `${moyens.map((m, i) => `${ecrireMoyen(nombres[i]!, m)} : ${m.valeur * nombres[i]!} €`).join('. ')}. En tout : ${total} €.`,
    };
  },
});

// ─────────── Lire l'heure (heures entières)

const heures = (n: number) => qte(n, 'heure');

export const heuresCp = creerGenerateur({
  id: 'heures-cp',
  competence: 'MA-C2-CP-TEMPS-01',
  cycle: 2,
  description: 'Lire une heure entière d’après la position des aiguilles, placer les aiguilles.',
  generer(a, d) {
    if (d === 3 && a.suivant() < 0.25) {
      return {
        gabarit: 'qcm',
        consigne: 'Les deux aiguilles sont sur le 12. C’est le milieu de la journée. Quelle heure est-il ?',
        options: a.melanger(['midi', 'minuit', heures(6), heures(1)]),
        reponse: 'midi',
        indice: 'Au milieu de la journée, on déjeune.',
        explication: 'Les deux aiguilles sont sur le 12. Au milieu de la journée, il est midi.',
      };
    }
    const n = a.entier(1, 11);
    if (d === 2) {
      const petite = a.suivant() < 0.6;
      return {
        gabarit: 'saisie',
        consigne: `Il est ${heures(n)}. Sur quel nombre est la ${petite ? 'petite' : 'grande'} aiguille ?`,
        reponse: String(petite ? n : 12),
        indice: 'La petite aiguille montre les heures. La grande aiguille montre les minutes.',
        explication: petite
          ? `À ${heures(n)}, la petite aiguille est sur le ${n}.`
          : 'À une heure entière, la grande aiguille est toujours sur le 12.',
      };
    }
    // Difficulté 3 : l'ordre des aiguilles change dans l'énoncé.
    const phrases = [`La petite aiguille est sur le ${n}.`, 'La grande aiguille est sur le 12.'];
    if (d === 3) phrases.reverse();
    const voisines = [n === 11 ? 1 : n + 1, n === 1 ? 11 : n - 1].map(heures);
    return {
      gabarit: 'qcm',
      consigne: `${phrases.join(' ')} Quelle heure est-il ?`,
      ...choix(a, heures(n), [[heures(12), 'aiguilles-inversees'], ...voisines.map((x): [string] => [x])], () => heures(a.entier(1, 11))),
      reponse: heures(n),
      indice: 'La petite aiguille montre les heures.',
      explication: `La grande aiguille sur le 12 : c’est une heure entière. La petite aiguille est sur le ${n}. Il est ${heures(n)}.`,
    };
  },
});

// ─────────── Solides : reconnaitre, nommer, compter les faces

const SOLIDES_OBJETS: [string, string][] = [
  ['une boite à chaussures', 'pavé'], ['une brique de lait', 'pavé'], ['une boite de céréales', 'pavé'],
  ['une boite de conserve', 'cylindre'], ['une canette', 'cylindre'], ['un tube de colle', 'cylindre'],
  ['une balle de tennis', 'boule'], ['une orange', 'boule'], ['une bille', 'boule'],
  ['un dé à jouer', 'cube'], ['un morceau de sucre', 'cube'],
  ['un cornet de glace', 'cône'], ['un chapeau de clown', 'cône'],
];
const SOLIDES = ['cube', 'pavé', 'boule', 'cylindre', 'cône'];

export const solidesCp = creerGenerateur({
  id: 'solides-cp',
  competence: 'MA-C2-CP-GEO-01',
  cycle: 2,
  description: 'Reconnaitre la forme d’un objet (cube, pavé, boule, cylindre, cône), décrire les faces du cube et du pavé.',
  generer(a, d) {
    if (d === 3) {
      const cube = a.suivant() < 0.5;
      const nom = cube ? 'cube' : 'pavé';
      if (a.suivant() < 0.5) {
        return {
          gabarit: 'qcm',
          consigne: `Combien de faces a un ${nom} ?`,
          ...choix(a, '6', [['8', 'faces-aretes-sommets'], ['12', 'faces-aretes-sommets'], ['4']], () => String(a.entier(3, 10)), { numerique: true }),
          reponse: '6',
          indice: 'Compte les faces : dessus, dessous, et tout autour.',
          explication: `Un ${nom} a 6 faces. Il y a le dessus et le dessous. Il y a 4 faces autour.`,
        };
      }
      const forme = cube ? 'des carrés' : 'des rectangles';
      return {
        gabarit: 'qcm',
        consigne: `Quelle est la forme des faces d’un ${nom} ?`,
        options: a.melanger(['des carrés', 'des rectangles', 'des triangles', 'des disques']),
        erreurs: { [cube ? 'des rectangles' : 'des carrés']: 'carre-rectangle-confondus' },
        reponse: forme,
        indice: cube ? 'Toutes les faces d’un cube sont pareilles.' : 'Pense à une boite à chaussures.',
        explication: `Les faces d’un ${nom} sont ${forme}.`,
      };
    }
    // Difficulté 1 : cube, boule, cylindre seulement ; difficulté 2 : les cinq solides.
    const permis = d === 1 ? ['cube', 'boule', 'cylindre'] : SOLIDES;
    const [objet, solide] = a.choisir(SOLIDES_OBJETS.filter(([, s]) => permis.includes(s)));
    return {
      gabarit: 'qcm',
      consigne: `Quelle est la forme d’${objet} ?`,
      ...choix(a, solide, a.melanger(permis.filter((s) => s !== solide)).map((s) => [s, 'solides-confondus'] as const), () => a.choisir(permis), { taille: d === 1 ? 3 : 4 }),
      reponse: solide,
      indice: 'Imagine l’objet dans ta main. Il roule ? Il a des faces plates ?',
      explication: `${objet.charAt(0).toUpperCase()}${objet.slice(1)} a la forme d’un${solide === 'boule' ? 'e' : ''} ${solide}.`,
    };
  },
});

// ─────────── Figures planes : côtés et sommets

const FIGURES: [string, number][] = [['triangle', 3], ['carré', 4], ['rectangle', 4]];

export const figuresCp = creerGenerateur({
  id: 'figures-cp',
  competence: 'MA-C2-CP-GEO-02',
  cycle: 2,
  description: 'Nommer le triangle, le carré, le rectangle et le disque, compter les côtés et les sommets.',
  generer(a, d) {
    const noms = ['triangle', 'carré', 'rectangle', 'disque'];
    if (d === 1) {
      const [nom, cotes] = a.choisir([['triangle', 3], ['disque', 0]] as [string, number][]);
      return {
        gabarit: 'qcm',
        consigne: cotes ? `Une figure a ${cotes} côtés. Comment s’appelle-t-elle ?` : 'Une figure est toute ronde. Comment s’appelle-t-elle ?',
        options: a.melanger(noms),
        erreurs: Object.fromEntries(noms.filter((x) => x !== nom).map((x) => [x, 'figures-confondues'])),
        reponse: nom,
        indice: 'Compte les côtés de chaque figure.',
        explication: cotes ? `Une figure à ${cotes} côtés est un ${nom}.` : 'Une figure toute ronde, sans côté, est un disque.',
      };
    }
    if (d === 2) {
      const sommets = a.suivant() < 0.5;
      if (a.suivant() < 0.5) {
        const [nom, n] = a.choisir(FIGURES);
        return {
          gabarit: 'saisie',
          consigne: `Combien de ${sommets ? 'sommets' : 'côtés'} a un ${nom} ?`,
          reponse: String(n),
          indice: sommets ? 'Les sommets sont les pointes de la figure.' : 'Les côtés sont les traits droits.',
          explication: `Un ${nom} a ${n} côtés et ${n} sommets.`,
        };
      }
      const n = a.entier(3, 10);
      return {
        gabarit: 'saisie',
        consigne: `Une figure a ${n} ${sommets ? 'côtés' : 'sommets'}. Combien a-t-elle de ${sommets ? 'sommets' : 'côtés'} ?`,
        reponse: String(n),
        indice: 'Entre deux côtés, il y a un sommet.',
        explication: `Une figure fermée a autant de côtés que de sommets. Elle a ${n} côtés et ${n} sommets.`,
      };
    }
    const cas = a.entier(0, 2);
    const description = [
      'Elle a 4 côtés. Ses 4 côtés ont la même longueur.',
      'Elle a 4 côtés. Ses côtés n’ont pas tous la même longueur.',
      'Elle a 3 côtés et 3 sommets.',
    ][cas]!;
    const reponse = ['carré', 'rectangle', 'triangle'][cas]!;
    return {
      gabarit: 'qcm',
      consigne: `${description} Quelle est cette figure ?`,
      options: a.melanger(noms),
      erreurs: Object.fromEntries(noms.filter((x) => x !== reponse).map((x) => [x, cas < 2 && x !== 'triangle' && x !== 'disque' ? 'carre-rectangle-confondus' : 'figures-confondues'])),
      reponse,
      indice: 'Compte les côtés. Puis compare leurs longueurs.',
      explication: cas === 2
        ? 'Une figure à 3 côtés est un triangle.'
        : `Le carré et le rectangle ont 4 côtés. ${cas === 0 ? 'Le carré a 4 côtés de même longueur.' : 'Le rectangle n’a pas 4 côtés égaux.'} C’est un ${reponse}.`,
    };
  },
});

// ─────────── Données : lire un tableau d'effectifs

const ENQUETES: { titre: string; valeurs: string[] }[] = [
  { titre: 'Fruit préféré', valeurs: ['orange', 'fraise', 'banane', 'kiwi', 'pomme'] },
  { titre: 'Animal préféré', valeurs: ['chat', 'chien', 'lapin', 'poisson', 'cheval'] },
  { titre: 'Couleur préférée', valeurs: ['rouge', 'bleu', 'vert', 'jaune', 'violet'] },
  { titre: 'Sport préféré', valeurs: ['football', 'natation', 'judo', 'danse', 'vélo'] },
];

export const donneesCp = creerGenerateur({
  id: 'donnees-cp',
  competence: 'MA-C2-CP-DON-01',
  cycle: 2,
  description: 'Lire les résultats d’une enquête : le plus, le moins, combien de plus, combien en tout.',
  generer(a, d) {
    const enquete = a.choisir(ENQUETES);
    const valeurs = a.melanger(enquete.valeurs).slice(0, 4);
    const effectifs = new Set<number>();
    while (effectifs.size < 4) effectifs.add(a.entier(1, 10));
    const eff = [...effectifs];
    const ligne = `${enquete.titre} des élèves : ${valeurs.map((v, i) => `${v} ${eff[i]}`).join(', ')}.`;
    if (d === 1) {
      const plus = a.suivant() < 0.5;
      const i = eff.indexOf(plus ? Math.max(...eff) : Math.min(...eff));
      return {
        gabarit: 'qcm',
        consigne: `${ligne} Quelle réponse est la ${plus ? 'plus' : 'moins'} choisie ?`,
        options: a.melanger(valeurs),
        erreurs: { [valeurs[eff.indexOf(plus ? Math.min(...eff) : Math.max(...eff))]!]: 'plus-grand-plus-petit-confondus' },
        reponse: valeurs[i]!,
        indice: `Cherche le nombre le plus ${plus ? 'grand' : 'petit'}.`,
        explication: `Le nombre le plus ${plus ? 'grand' : 'petit'} est ${eff[i]}. C’est ${valeurs[i]}.`,
      };
    }
    if (d === 2) {
      const [i, j] = a.melanger([0, 1, 2, 3]).slice(0, 2) as [number, number];
      const [g, p] = eff[i]! > eff[j]! ? [i, j] : [j, i];
      const ecart = eff[g]! - eff[p]!;
      return {
        gabarit: 'saisie',
        consigne: `${ligne} Combien de réponses de plus pour « ${valeurs[g]} » que pour « ${valeurs[p]} » ?`,
        reponse: String(ecart),
        indice: 'Cherche l’écart entre les deux nombres.',
        explication: `« ${valeurs[g]} » : ${eff[g]}. « ${valeurs[p]} » : ${eff[p]}. ${eff[g]} − ${eff[p]} = ${ecart}.`,
      };
    }
    const total = eff.reduce((s, x) => s + x, 0);
    return {
      gabarit: 'saisie',
      consigne: `${ligne} Combien d’élèves ont répondu en tout ?`,
      reponse: String(total),
      indice: 'Ajoute tous les nombres du tableau.',
      explication: `${eff.join(' + ')} = ${total}. En tout, ${total} élèves ont répondu.`,
    };
  },
});
