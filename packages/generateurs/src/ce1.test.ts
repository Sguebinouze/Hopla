// Justesse des générateurs CE1 (compléments) : chaque oracle recalcule la réponse depuis la consigne,
// avec ses propres tables, sans réutiliser la logique ni les listes des générateurs.
import { describe, expect, it } from 'vitest';
import { GENERATEURS_CE1 } from './ce1';
import { DIFFICULTES, GRAINES, partout } from './oracles';
import { generateur } from './index';

const entier = (s: string) => Number(s.replace(/[\s\u00a0\u202f]/g, ''));

// ───────────────────────── Grandeurs

/** « 1 m 46 cm » → 146 ; « 2 km » → 200 000 ; « 85 cm » → 85. */
const enCm = (s: string) => {
  let total = 0;
  for (const m of s.matchAll(/([\d\u00a0\u202f]+) (km|m|cm)\b/g)) total += entier(m[1]!) * { km: 100000, m: 100, cm: 1 }[m[2] as 'km' | 'm' | 'cm'];
  return total;
};
/** « 1 kg 300 g » → 1 300. */
const enG = (s: string) => {
  let total = 0;
  for (const m of s.matchAll(/([\d\u00a0\u202f]+) (kg|g)\b/g)) total += entier(m[1]!) * (m[2] === 'kg' ? 1000 : 1);
  return total;
};

describe('justesse CE1 grandeurs', () => {
  it('longueurs : estimation plausible, conversions, comparaison', () => {
    // Fourchettes plausibles, en centimètres, saisies ici indépendamment.
    const PLAUSIBLE: [RegExp, number, number][] = [
      [/trousse|fourchette/, 15, 25], [/crayon|stylo|cuillère|brosse/, 10, 20], [/gomme|trombone|timbre/, 2, 6], [/livre/, 20, 30],
      [/cartable/, 30, 50], [/porte|lit\b/, 180, 220], [/autobus/, 1000, 1500], [/voiture/, 350, 500], [/camion/, 800, 1600],
      [/baguette/, 50, 80], [/piscine/, 2000, 5000], [/table de classe/, 80, 150], [/feuille/, 25, 35], [/girafe/, 400, 600],
      [/coccinelle/, 0.5, 2], [/tableau/, 200, 400], [/chat/, 30, 60], [/terrain/, 9000, 12000], [/mairie/, 20000, 200000],
      [/ville voisine/, 300000, 5000000],
    ];
    partout('longueurs-ce1', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const [, min, max] = PLAUSIBLE.find(([re]) => re.test(c))!;
        const plausibles = item.options!.filter((o) => enCm(o) >= min && enCm(o) <= max);
        expect(plausibles, c).toEqual([item.reponse]);
      } else if (d === 2) {
        const [gauche, droite] = c.replace('Complète : ', '').split(' = ');
        const unite = droite!.replace('… ', '').trim();
        expect(Number(item.reponse) * enCm(`1 ${unite}`), c).toBe(enCm(gauche!));
      } else {
        const valeurs = item.options!.map(enCm);
        expect(new Set(valeurs).size).toBe(valeurs.length);
        expect(enCm(item.reponse)).toBe(c.includes('grande') ? Math.max(...valeurs) : Math.min(...valeurs));
      }
    });
  });

  it('masses : estimation plausible, conversions, comparaison', () => {
    const PLAUSIBLE: [RegExp, number, number][] = [
      [/sucre|dictionnaire|melon|bouteille/, 800, 1500], [/levure/, 5, 15], [/pomme\b|pomme,/, 100, 250], [/cartable/, 2000, 6000],
      [/baguette|beurre/, 200, 300], [/chat/, 3000, 6000], [/vélo/, 6000, 15000], [/lettre/, 10, 50], [/enfant/, 18000, 35000],
      [/ballon/, 300, 500], [/chocolat/, 80, 200], [/chien/, 20000, 45000], [/pièce/, 5, 10], [/œuf/, 40, 80],
      [/pastèque|sac de pommes/, 3000, 8000], [/fraise/, 10, 30], [/bébé/, 2500, 4500], [/crayon/, 3, 10],
      [/confiture/, 300, 500], [/valise/, 10000, 25000],
    ];
    partout('masses-ce1', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const [, min, max] = PLAUSIBLE.find(([re]) => re.test(c))!;
        expect(item.options!.filter((o) => enG(o) >= min && enG(o) <= max), c).toEqual([item.reponse]);
      } else if (d === 2) {
        const [gauche, droite] = c.replace('Complète : ', '').split(' = ');
        const unite = droite!.replace('… ', '').trim();
        expect(Number(item.reponse) * (unite === 'kg' ? 1000 : 1), c).toBe(enG(gauche!));
      } else {
        const valeurs = item.options!.map(enG);
        expect(new Set(valeurs).size).toBe(valeurs.length);
        expect(enG(item.reponse)).toBe(c.includes('lourde') ? Math.max(...valeurs) : Math.min(...valeurs));
      }
    });
  });

  it('monnaie : centimes, écriture à virgule, comparer deux sommes', () => {
    const enCentimes = (s: string) => {
      const virgule = s.match(/^(\d+),(\d\d) €$/);
      if (virgule) return Number(virgule[1]) * 100 + Number(virgule[2]);
      const e = s.match(/(\d+) euros?/);
      const c = s.match(/(\d+) centimes?/);
      return (e ? Number(e[1]) * 100 : 0) + (c ? Number(c[1]) : 0);
    };
    partout('monnaie-ce1', (item, d) => {
      const c = item.consigne;
      if (d === 1 && item.gabarit === 'saisie') expect(Number(item.reponse)).toBe(Number(c.match(/(\d+) euros?/)![1]) * 100);
      else if (d === 1) expect(enCentimes(item.reponse)).toBe(Number(c.match(/^(\d+) centimes/)![1]));
      else if (d === 2) {
        expect(item.reponse).toMatch(/^\d+,\d\d €$/);
        expect(enCentimes(item.reponse)).toBe(enCentimes(c));
      } else {
        const [, p1, n1, v1, p2, n2, v2] = c.match(/^(\p{L}+) a (\d+) pièces de (\d+) €\. (\p{L}+) a (\d+) pièces de (\d+) centimes/u)!;
        const a = Number(n1) * Number(v1) * 100;
        const b = Number(n2) * Number(v2);
        expect(item.reponse).toBe(a === b ? 'Autant tous les deux' : a > b ? p1 : p2);
      }
    });
  });

  it('heures : après-midi et soir, aiguilles, quarts d’heure', () => {
    const MINUTES: Record<string, number> = { 'et quart': 15, 'et demie': 30, 'moins le quart': -15 };
    partout('heures-ce1', (item, d) => {
      const c = item.consigne;
      if (d === 2) {
        const [, h, g] = c.match(/entre le (\d+) et .+ sur le (\d+)\./)!;
        expect(item.reponse).toBe(`${h} h ${String(Number(g) * 5).padStart(2, '0')}`);
        return;
      }
      const [, h, reste] = c.match(/Il est (\d+) heures? ?(et quart|et demie|moins le quart)?/)!;
      let total = Number(h) * 60 + (reste ? MINUTES[reste]! : 0);
      total += 12 * 60; // de l'après-midi ou du soir
      const attendu = `${Math.floor(total / 60)} h${total % 60 ? ` ${String(total % 60).padStart(2, '0')}` : ''}`;
      expect(item.reponse, c).toBe(attendu);
      expect(Math.floor(total / 60)).toBeLessThanOrEqual(23);
    });
  });

  it('durées : minutes dans une durée, écart entre deux horaires, somme', () => {
    const NOMS: Record<string, number> = {
      'une heure': 60, 'une demi-heure': 30, 'un quart d’heure': 15, 'trois quarts d’heure': 45, 'deux heures': 120,
      'une heure et demie': 90, 'deux quarts d’heure': 30, 'une heure et quart': 75, 'deux demi-heures': 60, 'trois heures': 180,
    };
    const minutes = (s: string) => {
      const m = s.match(/(\d+) h(?: (\d+))?/)!;
      return Number(m[1]) * 60 + Number(m[2] ?? 0);
    };
    partout('durees-ce1', (item, d) => {
      const c = item.consigne;
      if (d === 1) expect(Number(item.reponse)).toBe(NOMS[c.match(/dans (.+) \?/)![1]!]);
      else if (d === 2) {
        const [, x, y] = c.match(/entre (.+) et (.+) \?/)!;
        expect(Number(item.reponse)).toBe(minutes(y!) - minutes(x!));
      } else {
        const durees = [...c.matchAll(/pendant ([^.]+)\./g)].map((m) => NOMS[m[1]!]);
        expect(durees).toHaveLength(2);
        expect(Number(item.reponse)).toBe(durees[0]! + durees[1]!);
      }
    });
  });
});

// ───────────────────────── Géométrie

describe('justesse CE1 géométrie', () => {
  it('solides : forme des objets, faces, arêtes, sommets', () => {
    const FORME: [RegExp, string][] = [
      [/chaussures|brique|mouchoirs|livre|caisse/, 'un pavé'], [/conserve|essuie-tout|bougie|canette|tube/, 'un cylindre'],
      [/balle|bille|orange|globe|ballon/, 'une boule'], [/dé à jouer|sucre|glaçon/, 'un cube'], [/chapeau|plot|cornet|entonnoir/, 'un cône'],
      [/pyramide d’Égypte|tente/, 'une pyramide'],
    ];
    const COMPTES: Record<string, Record<string, number>> = {
      'un cube': { faces: 6, arêtes: 12, sommets: 8 }, 'un pavé': { faces: 6, arêtes: 12, sommets: 8 },
      'une pyramide à base carrée': { faces: 5, arêtes: 8, sommets: 5 },
    };
    const FACES: Record<string, string> = { 'un cube': '6 carrés', 'un pavé': '6 rectangles', 'une pyramide à base carrée': '1 carré et 4 triangles' };
    partout('solides-ce1', (item, d) => {
      const c = item.consigne;
      if (d === 1) expect(item.reponse).toBe(FORME.find(([re]) => re.test(c))![1]);
      else if (d === 2) {
        const [, element, solide] = c.match(/Combien (?:de |d’)(\p{L}+) a (.+) \?/u)!;
        expect(Number(item.reponse)).toBe(COMPTES[solide!]![element!]);
      } else if (c.startsWith('Quelles')) expect(item.reponse).toBe(FACES[c.match(/faces d’(.+) \?/)![1]!]);
      else expect(FACES[item.reponse]).toBe(c.match(/a (.+) comme faces/)![1]);
    });
  });

  it('figures : nature d’après les propriétés, longueurs, angles', () => {
    partout('figures-ce1', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const trois = /3 côtés|3 sommets/.test(c);
        const droit = /un angle droit|angles? (est|sont) droits?|angles droits|est droit/.test(c) && !/Aucun/.test(c);
        const longueurs = [...c.matchAll(/(\d+) cm/g)].map((m) => Number(m[1]));
        const egaux = /4 côtés de même longueur/.test(c) || (/Ses 4 côtés mesurent/.test(c)) || (longueurs.length > 1 && new Set(longueurs).size === 1);
        const attendu = trois ? (droit ? 'un triangle rectangle' : 'un triangle') : egaux ? 'un carré' : 'un rectangle';
        expect(item.reponse, c).toBe(attendu);
      } else if (d === 2) {
        const rect = c.match(/(\d+) cm de long et (\d+) cm de large.+opposé à la (longueur|largeur)/);
        if (rect) expect(Number(item.reponse)).toBe(Number(rect[3] === 'longueur' ? rect[1] : rect[2]));
        else if (c.includes('carré mesure')) expect(item.reponse).toBe(c.match(/(\d+) cm/)![1]);
        else {
          const attendu: [RegExp, number][] = [[/angles droits a un (rectangle|carré)/, 4], [/angles droits a un triangle rectangle/, 1], [/sommets a un rectangle/, 4], [/triangle \?/, 3]];
          expect(Number(item.reponse), c).toBe(attendu.find(([re]) => re.test(c))![1]);
        }
      } else if (c.includes('Comment l’appelle-t-on')) {
        expect(item.reponse).toBe(c.includes('plus petit') ? 'un angle aigu' : c.includes('plus grand') ? 'un angle obtus' : 'un angle droit');
      } else {
        const non = /n’est pas droit\. Est-ce un rectangle|3 côtés et 4 sommets|ne sont pas tous égaux\. Est-ce un carré/.test(c);
        expect(item.reponse.startsWith(non ? 'Non' : 'Oui'), c).toBe(true);
      }
    });
  });
});

// ───────────────────────── Lecture et vocabulaire

describe('justesse CE1 lecture et vocabulaire', () => {
  it('lecture : la réponse vient du texte, le pronom cité figure dans le texte', () => {
    const sansArticle = (s: string) => s.replace(/^(l’|(le|la|les|un|une|des|du|de la|son|sa|ses|leur|elle|il) )/, '');
    partout('lecture-ce1', (item, d) => {
      const [, texte, question] = item.consigne.match(/^« (.+?) » (.+)$/)!;
      expect(item.options).toHaveLength(3);
      if (d === 1) {
        // Le mot principal de la réponse est écrit dans le texte.
        const mots = sansArticle(item.reponse).split(' ');
        expect(texte!.toLowerCase(), item.consigne).toContain(mots[mots.length - 1]!.toLowerCase());
      } else if (d === 2) {
        const citation = question!.match(/« (.+?) »/)![1]!;
        expect(texte).toContain(citation);
        const nom = sansArticle(item.reponse).split(' et ')[0]!;
        expect(texte!.toLowerCase(), item.consigne).toContain(nom.toLowerCase());
      }
    });
  });

  it('termes génériques : catégorie, intrus, du général au précis', () => {
    const CAT: Record<string, string> = {
      pomme: 'fruit', poire: 'fruit', cerise: 'fruit', banane: 'fruit', prune: 'fruit', abricot: 'fruit',
      carotte: 'légume', poireau: 'légume', haricot: 'légume', radis: 'légume', navet: 'légume', courgette: 'légume',
      moineau: 'oiseau', merle: 'oiseau', pigeon: 'oiseau', aigle: 'oiseau', hibou: 'oiseau', mésange: 'oiseau',
      requin: 'poisson', truite: 'poisson', sardine: 'poisson', saumon: 'poisson', thon: 'poisson', carpe: 'poisson',
      fourmi: 'insecte', abeille: 'insecte', mouche: 'insecte', papillon: 'insecte', coccinelle: 'insecte', guêpe: 'insecte',
      rose: 'fleur', tulipe: 'fleur', marguerite: 'fleur', coquelicot: 'fleur', jonquille: 'fleur', violette: 'fleur',
      chêne: 'arbre', sapin: 'arbre', bouleau: 'arbre', platane: 'arbre', tilleul: 'arbre', peuplier: 'arbre',
      pull: 'vêtement', jupe: 'vêtement', chemise: 'vêtement', pantalon: 'vêtement', manteau: 'vêtement', short: 'vêtement',
      table: 'meuble', chaise: 'meuble', armoire: 'meuble', lit: 'meuble', buffet: 'meuble', commode: 'meuble',
      marteau: 'outil', scie: 'outil', tournevis: 'outil', pince: 'outil', râteau: 'outil', pelle: 'outil',
      voiture: 'véhicule', camion: 'véhicule', moto: 'véhicule', autobus: 'véhicule', tracteur: 'véhicule', vélo: 'véhicule',
      piano: 'instrument de musique', guitare: 'instrument de musique', violon: 'instrument de musique', flûte: 'instrument de musique',
      tambour: 'instrument de musique', trompette: 'instrument de musique',
      football: 'sport', judo: 'sport', natation: 'sport', tennis: 'sport', escalade: 'sport', basket: 'sport',
    };
    const NIVEAU: Record<string, number> = {
      aliment: 0, animal: 0, plante: 0, meuble: 0, vêtement: 0, véhicule: 0, bâtiment: 0, boisson: 0, instrument: 0, sport: 0,
      fruit: 1, légume: 1, laitage: 1, oiseau: 1, poisson: 1, insecte: 1, fleur: 1, arbre: 1, siège: 1, chaussure: 1, bateau: 1,
      maison: 1, 'jus de fruit': 1, 'instrument à cordes': 1, 'sport de ballon': 1,
      pomme: 2, carotte: 2, yaourt: 2, moineau: 2, requin: 2, fourmi: 2, tulipe: 2, chêne: 2, tabouret: 2, botte: 2, voilier: 2,
      chalet: 2, 'jus d’orange': 2, guitare: 2, handball: 2,
    };
    partout('generiques-ce1', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const membres = c.match(/: (.+) \?/)![1]!.split(', ');
        const cats = new Set(membres.map((m) => CAT[m]));
        expect(cats.size).toBe(1);
        expect(item.reponse.replace(/^des /, '').replace(/^(\p{L}+)(x|s)\b/u, '$1')).toBe([...cats][0]!.replace(/^(\p{L}+)\b/u, '$1'));
      } else if (d === 2) {
        const cat = c.match(/n’est pas une? (.+) \?/)![1]!;
        expect(item.options!.filter((o) => CAT[o] !== cat)).toEqual([item.reponse]);
      } else {
        const niveaux = item.options!.map((o) => NIVEAU[o]!);
        expect(new Set(niveaux).size).toBe(3);
        expect(NIVEAU[item.reponse]).toBe(c.includes('précis') ? 2 : 0);
      }
    });
  });

  it('contraires : in- ou im- devant un adjectif, dé- ou dés- devant un verbe', () => {
    const contraire = (mot: string) => {
      const verbe = /(er|ir|re)$/.test(mot);
      if (verbe) return /^[aeéiouh]/.test(mot) ? `dés${mot}` : `dé${mot}`;
      return /^[mbp]/.test(mot) ? `im${mot}` : `in${mot}`;
    };
    partout('contraires-ce1', (item, d) => {
      const c = item.consigne;
      if (d === 1) expect(item.reponse).toBe(contraire(c.match(/« (.+) »/)![1]!));
      else if (d === 2) {
        const mot = c.match(/« (.+) »/)![1]!;
        const base = mot.replace(/^(dés|dé|im|in)/, '');
        expect(contraire(base)).toBe(mot);
        expect(item.reponse).toMatch(new RegExp(`(pas ${base}|contraire (de |d’)${base})$`));
      } else {
        const prefixes = item.options!.filter((o) => {
          const base = o.replace(/^(dés|dé|im|in)/, '');
          return base !== o && contraire(base) === o && !['ner', 'cembre', 'viter', 'firmière', 'main', 'age', 'iter', 'don', 'tiste', 'sin'].includes(base);
        });
        expect(prefixes).toHaveLength(3);
        expect(prefixes).not.toContain(item.reponse);
      }
    });
  });

  it('mots formés : -eur, -euse, métiers, para-, anti-, multi-', () => {
    const METIER: Record<string, string> = {
      pain: 'boulanger', viande: 'boucher', gâteaux: 'pâtissier', poisson: 'poissonnier', ferme: 'fermier', jardin: 'jardinier',
      moutons: 'berger', fromage: 'crémier', chaussures: 'cordonnier', fleurs: 'fleuriste', livres: 'libraire', dents: 'dentiste', restaurant: 'cuisinier',
    };
    partout('mots-formes-ce1', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const verbe = item.options!.find((o) => /(er|ir|re)$/.test(o))!;
        const base = verbe === 'conduire' ? 'conduct' : verbe.replace(/(er|ir|re)$/, '');
        const masculin = `${base}eur`;
        const feminin = verbe === 'conduire' ? 'conductrice' : `${base}euse`;
        expect(item.reponse).toBe(c.startsWith('Celle') ? feminin : masculin);
      } else if (d === 2) {
        const cle = Object.keys(METIER).find((k) => c.includes(k))!;
        expect(item.reponse).toBe(METIER[cle]);
      } else {
        const AFFIXE: [RegExp, RegExp][] = [
          [/parapluie/, /pluie/], [/parasol/, /soleil/], [/paravent/, /vent/], [/parachute/, /chute/], [/antivol/, /vol/],
          [/antimoustique/, /moustiques/], [/antibruit/, /bruit/], [/multicolore/, /plusieurs couleurs/], [/multiprise/, /plusieurs prises/],
          [/multisport/, /plusieurs sports/],
        ];
        const [, attendu] = AFFIXE.find(([re]) => re.test(c))!;
        expect(item.options!.filter((o) => attendu.test(o))).toEqual([item.reponse]);
      }
    });
  });

  it('expressions : sens figuré, et une seule phrase au sens propre', () => {
    const SENS: Record<string, string> = {
      'avoir une peur bleue': 'avoir très peur', 'en un clin d’œil': 'très vite', 'avoir une faim de loup': 'avoir très faim',
      'être dans la lune': 'être distrait', 'avoir la langue bien pendue': 'parler beaucoup', 'il pleut des cordes': 'il pleut très fort',
      'avoir le cafard': 'être triste', 'tomber dans les pommes': 's’évanouir', 'avoir un poil dans la main': 'être paresseux',
    };
    // Morceaux d'expressions imagées : une phrase au sens propre n'en contient aucun.
    const IMAGES = [
      'peur bleue', 'jambes à son cou', 'chat dans la gorge', 'posé un lapin', 'dans la lune', 'langue au chat', 'casser les pieds',
      'yeux de la tête', 'cœur sur la main', 'dans les pommes', 'main à la pâte', 'poil dans la main', 'pleut des cordes',
      'faim de loup', 'froid de canard', 'levé du pied gauche', 'plus gros que le ventre', 'coupe pas la parole', 'main verte',
      'muette comme une carpe', 'fourmis dans les jambes', 'clin d’œil', 'deux oreilles', 'a le cafard', 'comme une mule',
      'dans les nuages', 'grain de sel', 'trou de mémoire', 'sur des œufs', 'langue bien pendue',
    ];
    const imagee = (phrase: string) => IMAGES.some((i) => phrase.includes(i));
    partout('expressions-ce1', (item, d) => {
      const c = item.consigne;
      if (d === 3) {
        expect(item.options!.filter((o) => !imagee(o))).toEqual([item.reponse]);
        return;
      }
      const expression = d === 1 ? c.match(/« (.+) »/)![1]!.replace(/^(.)/, (x) => x.toLowerCase()) : item.reponse;
      const sens = d === 1 ? item.reponse : c.match(/« (.+) »/)![1]!;
      if (SENS[expression]) expect(sens).toBe(SENS[expression]);
      expect(expression.split(' ').length).toBeGreaterThan(1);
    });
  });
});

// ───────────────────────── Variété

describe('variété CE1', () => {
  // Domaines fermés : peu de consignes possibles, la variété vient des options.
  const FERMES: Record<string, number> = {
    'longueurs-ce1': 2, 'masses-ce1': 2, 'heures-ce1': 10, 'durees-ce1': 10, 'solides-ce1': 6, 'figures-ce1': 9,
    'generiques-ce1': 13, 'contraires-ce1': 1, 'mots-formes-ce1': 10, 'expressions-ce1': 1, 'lecture-ce1': 30,
  };
  it.each(GENERATEURS_CE1.map((g) => g.id))('%s : assez de consignes distinctes, d1 différente de d3', (id) => {
    const consignes = DIFFICULTES.map((d) => new Set(GRAINES.map((s) => generateur(id).generer(s, d).consigne)));
    for (const ens of consignes) expect(ens.size).toBeGreaterThanOrEqual(FERMES[id] ?? 25);
    expect([...consignes[0]!].some((x) => !consignes[2]!.has(x))).toBe(true);
  });
});
