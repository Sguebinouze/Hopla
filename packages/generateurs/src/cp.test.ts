// Justesse des générateurs du CP : chaque oracle recalcule la réponse à partir de la consigne,
// sans réutiliser la logique ni les listes des générateurs. Les règles communes (déterminisme,
// QCM, rédaction, séries variées) sont vérifiées par generateurs.test.ts.
import { describe, expect, it } from 'vitest';
import { GENERATEURS_CP } from './cp';
import { generateur } from './index';
import { DIFFICULTES, GRAINES, calculJuste, calculer, egaliteVraie, partout } from './oracles';
import type { Difficulte, Item } from './types';

const nombres = (t: string) => (t.match(/\d+/g) ?? []).map(Number);
const r = (item: Item) => Number(item.reponse);

// Écriture en lettres de 0 à 50, orthographe de 1990, recopiée du programme et du dictionnaire.
const LETTRES_0_50 = [
  'zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix',
  'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf', 'vingt',
  'vingt-et-un', 'vingt-deux', 'vingt-trois', 'vingt-quatre', 'vingt-cinq', 'vingt-six', 'vingt-sept', 'vingt-huit', 'vingt-neuf', 'trente',
  'trente-et-un', 'trente-deux', 'trente-trois', 'trente-quatre', 'trente-cinq', 'trente-six', 'trente-sept', 'trente-huit', 'trente-neuf', 'quarante',
  'quarante-et-un', 'quarante-deux', 'quarante-trois', 'quarante-quatre', 'quarante-cinq', 'quarante-six', 'quarante-sept', 'quarante-huit', 'quarante-neuf', 'cinquante',
];
const ORDINAUX = [
  '', 'premier', 'deuxième', 'troisième', 'quatrième', 'cinquième', 'sixième', 'septième', 'huitième', 'neuvième', 'dixième',
  'onzième', 'douzième', 'treizième', 'quatorzième', 'quinzième', 'seizième', 'dix-septième', 'dix-huitième', 'dix-neuvième', 'vingtième',
];
const rangDe = (mot: string) => (mot === 'première' ? 1 : ORDINAUX.indexOf(mot));

describe('justesse CP mathématiques : nombres', () => {
  it('dizaines et unités', () => {
    partout('nombres-unites-cp', (item) => {
      const c = item.consigne;
      const dz = c.match(/(\d+) dizaines?/);
      const u = c.match(/(\d+) unités?/);
      const chiffre = c.match(/chiffre des (dizaines|unités) de (\d+)/);
      if (chiffre) {
        const n = Number(chiffre[2]);
        expect(r(item)).toBe(chiffre[1] === 'dizaines' ? Math.floor(n / 10) : n % 10);
      } else if (c.startsWith('Complète')) egaliteVraie(item);
      else expect(r(item)).toBe(10 * Number(dz![1]) + Number(u![1]));
      expect(r(item)).toBeLessThanOrEqual(100);
    });
  });

  it('nombres en lettres jusqu’à 50', () => {
    partout('nombres-lettres-cp', (item) => {
      const lettres = item.consigne.match(/^Écris en chiffres : (.+)\.$/);
      if (lettres) expect(LETTRES_0_50.indexOf(lettres[1]!)).toBe(r(item));
      else {
        const n = nombres(item.consigne)[0]!;
        expect(item.reponse).toBe(LETTRES_0_50[n]);
      }
    });
  });

  it('comparer, intercaler, ranger', () => {
    partout('nombres-comparer-cp', (item) => {
      const c = item.consigne;
      if (c.includes('<, > ou =')) {
        const [x, y] = c.split(' : ')[1]!.split(' … ').map(Number) as [number, number];
        expect(item.reponse).toBe(x < y ? '<' : x > y ? '>' : '=');
      } else if (c.startsWith('Range')) {
        const liste = nombres(c.split(' : ')[1]!);
        const croissant = c.includes('du plus petit au plus grand');
        const attendu = [...liste].sort((p, q) => (croissant ? p - q : q - p)).join(', ');
        expect(item.reponse).toBe(attendu);
        expect(item.options!.filter((o) => o === attendu)).toHaveLength(1);
        expect(Math.max(...liste)).toBeLessThanOrEqual(100);
      } else if (c.includes('compris entre')) {
        const [bas, haut] = nombres(c) as [number, number];
        expect(item.options!.map(Number).filter((n) => n > bas && n < haut)).toEqual([r(item)]);
      } else {
        const v = item.options!.map(Number);
        expect(r(item)).toBe(c.includes('grand') ? Math.max(...v) : Math.min(...v));
        expect(Math.max(...v)).toBeLessThanOrEqual(100);
      }
    });
  });

  it('suites de 1 en 1, de 2 en 2, de 10 en 10, à rebours', () => {
    partout('suites-cp', (item) => {
      const termes = item.consigne.split(' : ')[1]!.split(', ');
      const valeurs = termes.map((t) => (t === '…' ? r(item) : Number(t)));
      const pas = valeurs[1]! - valeurs[0]!;
      expect([1, 2, 10, -1, -2, -10]).toContain(pas);
      valeurs.forEach((v, i) => expect(v, item.consigne).toBe(valeurs[0]! + i * pas));
      for (const v of valeurs) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(100);
      }
    });
  });

  it('ordinaux : rang dans une liste, une file, une suite répétitive', () => {
    partout('ordinaux-cp', (item) => {
      const c = item.consigne;
      const liste = c.match(/^La liste est : ([\d, ]+)\./);
      const file = c.match(/^Il y a (\d+) enfants dans la file\. Je suis le ([\p{L}-]+)\..*(devant|derrière)/u);
      const suite = c.match(/^La suite est : ([A-Z]+)… Quelle est la ([\p{L}-]+) lettre/u);
      if (liste) {
        const l = nombres(liste[1]!);
        const quel = c.match(/Quel est le ([\p{L}-]+) nombre/u);
        if (quel) expect(r(item)).toBe(l[rangDe(quel[1]!) - 1]);
        else {
          const v = Number(c.match(/position est (\d+)/)![1]);
          expect(rangDe(item.reponse)).toBe(l.indexOf(v) + 1);
        }
      } else if (file) {
        const total = Number(file[1]);
        const rang = rangDe(file[2]!);
        expect(r(item)).toBe(file[3] === 'devant' ? rang - 1 : total - rang);
      } else if (suite) {
        const s = suite[1]!;
        const rang = rangDe(suite[2]!);
        // Plus petite période compatible avec le début affiché.
        let p = 1;
        while ([...s].some((ch, i) => ch !== s[i % p])) p++;
        expect(s.length).toBeGreaterThanOrEqual(2 * p);
        expect(item.reponse).toBe(s[(rang - 1) % p]);
        expect(rang).toBeGreaterThan(s.length);
        expect(rang).toBeLessThanOrEqual(20);
      } else throw new Error(`énoncé inconnu : ${c}`);
    });
  });
});

describe('justesse CP mathématiques : opérations et calcul mental', () => {
  it('addition et soustraction, opérations inverses', () => {
    partout('addition-soustraction-cp', (item) => {
      const [, fait] = item.consigne.match(/On sait que (.+?)\. /)!;
      const [g, d] = fait!.split(' = ');
      expect(calculer(g!)).toBe(calculer(d!));
      const question = item.consigne.match(/Combien fait (.+) \?/);
      if (question) expect(r(item)).toBe(calculer(question[1]!));
      else {
        const justes = item.options!.filter((o) => {
          const [a, b] = o.split(' = ');
          return calculer(a!) === calculer(b!);
        });
        expect(justes).toEqual([item.reponse]);
      }
    });
  });

  it('additions en colonnes : deux ou trois termes, résultat jusqu’à 100', () => {
    partout('addition-colonnes-cp', (item, d) => {
      calculJuste(item);
      expect(nombres(item.consigne)).toHaveLength(d === 3 ? 3 : 2);
      expect(r(item)).toBeLessThanOrEqual(100);
    });
  });

  it('tables d’addition : termes de 0 à 10', () => {
    partout('tables-addition-cp', (item) => {
      egaliteVraie(item);
      const [g, d] = item.consigne.replace('…', item.reponse).replace('Complète : ', '').split(' = ');
      const termes = nombres((g!.includes('+') ? g : d)!);
      for (const t of termes) expect(t).toBeLessThanOrEqual(10);
    });
  });

  it('doubles et moitiés : nombres du programme', () => {
    const baseDoubles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50];
    const baseMoities = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 40, 60, 80, 100];
    partout('doubles-moities-cp', (item) => {
      const c = item.consigne;
      let double = c.match(/double de (\d+)/);
      let moitie = c.match(/moitié de (\d+)/);
      if (double) {
        expect(r(item)).toBe(2 * Number(double[1]));
        expect(baseDoubles).toContain(Number(double[1]));
      } else if (moitie) {
        expect(2 * r(item)).toBe(Number(moitie[1]));
        expect(baseMoities).toContain(Number(moitie[1]));
      } else if ((double = c.match(/double de … = (\d+)/))) {
        expect(2 * r(item)).toBe(Number(double[1]));
        expect(baseDoubles).toContain(r(item));
      } else if ((moitie = c.match(/moitié de … = (\d+)/))) {
        expect(r(item)).toBe(2 * Number(moitie[1]));
        expect(baseMoities).toContain(r(item));
      } else throw new Error(`énoncé inconnu : ${c}`);
    });
  });

  it('ajouter ou retirer 1, 2, 10, des dizaines', () => {
    partout('numeration-calcul-cp', (item) => {
      calculJuste(item);
      const [, k] = nombres(item.consigne) as [number, number];
      expect(k <= 2 || k % 10 === 0).toBe(true);
      expect(r(item)).toBeGreaterThanOrEqual(0);
      expect(r(item)).toBeLessThanOrEqual(100);
      if (item.visuel?.type === 'droite') expect(item.visuel.depart + item.visuel.saut).toBe(r(item));
    });
  });

  it('compléments à la dizaine supérieure', () => {
    partout('complement-dizaine-cp', (item) => {
      egaliteVraie(item);
      const dizaine = nombres(item.consigne).find((n) => n % 10 === 0)!;
      const autre = nombres(item.consigne).find((n) => n !== dizaine)!;
      expect(dizaine - autre).toBeLessThan(10);
      expect(r(item)).toBeGreaterThan(0);
    });
  });

  it('ajouter un nombre à un chiffre, ajouter 9', () => {
    partout('ajouter-un-chiffre-cp', (item, d) => {
      calculJuste(item);
      const [n, k] = nombres(item.consigne) as [number, number];
      if (d === 3) expect(k).toBe(9);
      else expect(k).toBeLessThan(9);
      // Difficulté 2 : passage de la dizaine.
      if (d === 2) expect(Math.floor((n + k) / 10)).toBe(Math.floor(n / 10) + 1);
      if (d === 1) expect(Math.floor((n + k) / 10)).toBe(Math.floor(n / 10));
      expect(r(item)).toBeLessThanOrEqual(100);
    });
  });

  it('procédures : 50 − 6, moitié de 46, 47 + 28', () => {
    partout('procedures-cp', (item) => {
      const moitie = item.consigne.match(/moitié de (\d+)/);
      if (moitie) expect(2 * r(item)).toBe(Number(moitie[1]));
      else calculJuste(item);
      if (item.consigne.includes('−')) {
        const [n, k] = nombres(item.consigne) as [number, number];
        expect(n % 10).toBe(0);
        expect(k).toBeLessThan(10);
      }
      expect(r(item)).toBeLessThanOrEqual(100);
    });
  });
});

describe('justesse CP mathématiques : problèmes', () => {
  it('problèmes parties-tout en une étape, nombres jusqu’à 100', () => {
    partout('problemes-parties-tout-cp', (item) => {
      const c = item.consigne;
      const n = nombres(c);
      if (c.includes('en gagne')) expect(r(item)).toBe(n[0]! + n[1]!);
      else if (c.includes('achète')) expect(r(item)).toBe(n[0]! - n[1]!);
      else if (c.includes('envolés')) expect(r(item)).toBe(n[0]! - n[1]!);
      else if (c.includes('poche')) expect(r(item)).toBe(n[0]! - n[1]!);
      else if (c.includes('au début')) expect(r(item)).toBe(n[0]! + n[1]!);
      else if (c.includes('wagons')) expect(r(item)).toBe(n.reduce((p, q) => p + q, 0));
      else throw new Error(`énoncé inconnu : ${c}`);
      expect(r(item)).toBeGreaterThan(0);
      for (const x of [...n, r(item)]) expect(x).toBeLessThanOrEqual(100);
    });
  });

  it('problèmes en deux étapes, nombres jusqu’à 30', () => {
    partout('problemes-deux-etapes-cp', (item) => {
      const c = item.consigne;
      const n = nombres(c);
      let milieu: number;
      if (c.includes('encore')) {
        milieu = n[0]! + n[1]!;
        expect(r(item)).toBe(milieu + n[2]!);
      } else if (c.includes('documentaires')) {
        milieu = n[0]! - n[1]!;
        expect(r(item)).toBe(milieu - n[2]!);
      } else {
        const mouvements = [...c.matchAll(/(\d+) enfants (descendent|montent)/g)].map((m) => (m[2] === 'montent' ? 1 : -1) * Number(m[1]));
        expect(mouvements).toHaveLength(2);
        milieu = n[0]! + mouvements[0]!;
        expect(r(item)).toBe(milieu + mouvements[1]!);
      }
      for (const x of [...n, milieu, r(item)]) {
        expect(x).toBeGreaterThan(0);
        expect(x).toBeLessThanOrEqual(30);
      }
    });
  });

  it('problèmes multiplicatifs jusqu’à 30', () => {
    partout('problemes-multiplicatifs-cp', (item) => {
      const c = item.consigne;
      const n = nombres(c);
      if (c.includes('paquets')) expect(r(item)).toBe(n[0]! * n[1]!);
      else if (c.includes('équipes')) expect(r(item) * n[1]!).toBe(n[0]);
      else if (c.includes('On partage')) expect(r(item) * n[1]!).toBe(n[0]);
      else throw new Error(`énoncé inconnu : ${c}`);
      expect(Math.max(...n, r(item))).toBeLessThanOrEqual(30);
    });
  });
});

describe('justesse CP mathématiques : grandeurs, géométrie, données', () => {
  const enCm = (s: string) => {
    const m = s.match(/^(\d+) (cm|m)$/)!;
    return Number(m[1]) * (m[2] === 'm' ? 100 : 1);
  };
  // Ordres de grandeur raisonnables, en centimètres.
  const PLAUSIBLE: [RegExp, number, number][] = [
    [/trousse/, 15, 30], [/gomme/, 2, 8], [/cahier/, 20, 35], [/crayon/, 8, 20], [/porte/, 180, 250], [/lit/, 150, 220],
    [/voiture/, 300, 500], [/bus/, 800, 1500], [/cuillère/, 10, 25], [/règle/, 15, 40], [/table/, 50, 150], [/trombone/, 2, 6],
  ];

  it('longueurs : ordres de grandeur, m et cm, problèmes', () => {
    partout('longueurs-cp', (item) => {
      const c = item.consigne;
      const n = nombres(c);
      if (c.includes('à peu près')) {
        const [, min, max] = PLAUSIBLE.find(([motif]) => motif.test(c))!;
        expect(item.options!.filter((o) => enCm(o) >= min && enCm(o) <= max)).toEqual([item.reponse]);
      } else if (c.includes('Quelle longueur est la plus')) {
        const v = item.options!.map(enCm);
        expect(enCm(item.reponse)).toBe(c.includes('grande') ? Math.max(...v) : Math.min(...v));
        expect(new Set(v).size).toBe(v.length);
      } else if (c.includes('coupe')) expect(r(item)).toBe(n[0]! - n[1]!);
      else if (c.includes('bout à bout')) expect(r(item)).toBe(n[0]! + n[1]!);
      else if (c.includes('pour faire 1 m')) expect(r(item)).toBe(100 - n[0]!);
      else throw new Error(`énoncé inconnu : ${c}`);
    });
  });

  it('monnaie : valeur d’une somme, monnaie rendue', () => {
    partout('monnaie-cp', (item) => {
      const c = item.consigne;
      const rendu = c.match(/coute (\d+) €\. Tu payes avec un billet de (\d+) €/);
      if (rendu) expect(r(item)).toBe(Number(rendu[2]) - Number(rendu[1]));
      else {
        const total = [...c.matchAll(/(\d+) (?:billet|pièce)s? de (\d+) €/g)].reduce((s, m) => s + Number(m[1]) * Number(m[2]), 0);
        expect(r(item)).toBe(total);
      }
      expect(r(item)).toBeGreaterThan(0);
      expect(r(item)).toBeLessThanOrEqual(100);
    });
  });

  it('heures entières', () => {
    partout('heures-cp', (item) => {
      const c = item.consigne;
      const petite = c.match(/La petite aiguille est sur le (\d+)\./);
      const il = c.match(/^Il est (\d+) heures?\. Sur quel nombre est la (petite|grande) aiguille/);
      if (c.includes('Les deux aiguilles sont sur le 12') && c.includes('milieu de la journée')) expect(item.reponse).toBe('midi');
      else if (petite) {
        expect(c).toContain('La grande aiguille est sur le 12.');
        const h = Number(petite[1]);
        expect(item.reponse).toBe(`${h} heure${h > 1 ? 's' : ''}`);
      } else if (il) expect(r(item)).toBe(il[2] === 'petite' ? Number(il[1]) : 12);
      else throw new Error(`énoncé inconnu : ${c}`);
    });
  });

  it('solides : forme des objets, faces du cube et du pavé', () => {
    const FORMES: [RegExp, string][] = [
      [/chaussures|brique|céréales/, 'pavé'], [/conserve|canette|tube/, 'cylindre'], [/balle|orange|bille/, 'boule'],
      [/dé à jouer|sucre/, 'cube'], [/cornet|chapeau/, 'cône'],
    ];
    partout('solides-cp', (item) => {
      const c = item.consigne;
      if (c.startsWith('Combien de faces')) expect(item.reponse).toBe('6');
      else if (c.includes('forme des faces')) expect(item.reponse).toBe(c.includes('cube') ? 'des carrés' : 'des rectangles');
      else expect(item.reponse).toBe(FORMES.find(([m]) => m.test(c))![1]);
    });
  });

  it('figures planes : côtés et sommets', () => {
    const COTES: Record<string, number> = { triangle: 3, carré: 4, rectangle: 4 };
    partout('figures-cp', (item) => {
      const c = item.consigne;
      const nommer = c.match(/Combien de (?:côtés|sommets) a un (\p{L}+) \?/u);
      const autant = c.match(/^Une figure a (\d+) (?:côtés|sommets)\. Combien a-t-elle/);
      if (nommer) expect(r(item)).toBe(COTES[nommer[1]!]);
      else if (autant) expect(r(item)).toBe(Number(autant[1]));
      else if (c.includes('toute ronde')) expect(item.reponse).toBe('disque');
      else if (/\b3 côtés/.test(c)) expect(item.reponse).toBe('triangle');
      else if (c.includes('pas tous')) expect(item.reponse).toBe('rectangle');
      else if (c.includes('même longueur')) expect(item.reponse).toBe('carré');
      else throw new Error(`énoncé inconnu : ${c}`);
    });
  });

  it('données : lire les effectifs d’une enquête', () => {
    partout('donnees-cp', (item) => {
      const c = item.consigne;
      const tableau = c.split(' : ')[1]!.split('.')[0]!;
      const eff = new Map([...tableau.matchAll(/(\p{L}+) (\d+)/gu)].map((m) => [m[1]!, Number(m[2])]));
      expect(eff.size).toBe(4);
      const valeurs = [...eff.values()];
      if (c.includes('plus choisie')) expect(eff.get(item.reponse)).toBe(Math.max(...valeurs));
      else if (c.includes('moins choisie')) expect(eff.get(item.reponse)).toBe(Math.min(...valeurs));
      else if (c.includes('de plus pour')) {
        const [, a, b] = c.match(/pour « (\p{L}+) » que pour « (\p{L}+) »/u)!;
        expect(r(item)).toBe(eff.get(a!)! - eff.get(b!)!);
        expect(r(item)).toBeGreaterThan(0);
      } else {
        expect(r(item)).toBe(valeurs.reduce((s, x) => s + x, 0));
        expect(r(item)).toBeLessThan(40);
      }
      // Une seule réponse possible quand on cherche le plus ou le moins.
      expect(new Set(valeurs).size).toBe(valeurs.length);
    });
  });
});

describe('justesse CP français', () => {
  // Présence d'un son dans un mot écrit. Une voyelle nasale n'est pas suivie d'une voyelle ni d'un n ou d'un m.
  const SON: Record<string, RegExp> = {
    a: /[âà]|a(?![iuy]|[nm](?![aeiouyéèêâ]))/, i: /î|(?<![aeo])i(?![nm](?![aeiouyéèêâ])|ll)/,
    o: /ô|o(?![uiy]|[nm](?![aeiouyéèêâ]))|au/, u: /û|(?<![oeaqg])u(?![nm](?![aeiouyéèêâ]))/,
    é: /é|ez$/, è: /[èê]|[ae]i(?![nm](?![aeiouyéèêâ]))/,
    l: /l/, r: /r/, m: /m(?![bp])/, f: /f|ph/, v: /v/, ch: /ch/,
    ou: /o[uùû]/, on: /o[nm](?![aeiouyéèêânm])/, an: /[ae][nm](?![aeiouyéèêânm])/, in: /i[nm](?![aeiouyéèêânm])/,
    oi: /oi/, eu: /eu|œu/, gn: /gn/,
  };
  // Graphies d'un même son.
  const GRAPHIE: Record<string, Record<string, RegExp>> = {
    o: { o: /ô|o(?![uiy]|[nm](?![aeiouyéèêâ]))/, au: /(?<!e)au/, eau: /eau/ },
    in: { in: /(?<![ae])in(?![aeiouyéèêânm])/, im: /im(?=[bp])/, ain: /ain(?![aeiouyéèêânm])/, ein: /ein(?![aeiouyéèêânm])/ },
    an: { an: /an(?![aeiouyéèêânm])/, en: /en(?![aeiouyéèêânm])/, am: /am(?=[bp])/, em: /em(?=[bp])/ },
    è: { è: /è/, ê: /ê/, ai: /ai(?![nm](?![aeiouyéèêâ]))/, ei: /ei(?![nm](?![aeiouyéèêâ]))/ },
  };

  it('sons : un son, une graphie, ou le mot qui ne contient pas le son', () => {
    partout('sons-cp', (item) => {
      const c = item.consigne;
      const graphie = c.match(/le son « (\p{L}+) » écrit « (\p{L}+) »/u);
      const negation = c.match(/ne contient pas le son « (\p{L}+) »/u);
      const simple = c.match(/le son « (\p{L}+) » \?$/u);
      if (graphie) {
        const [, son, g] = graphie;
        for (const o of item.options!) expect(SON[son!]!.test(o), `${o} : ${son}`).toBe(true);
        expect(item.options!.filter((o) => GRAPHIE[son!]![g!]!.test(o))).toEqual([item.reponse]);
      } else if (negation) {
        expect(item.options!.filter((o) => !SON[negation[1]!]!.test(o))).toEqual([item.reponse]);
      } else if (simple) {
        const libelle = simple[1]!;
        // « au » : le son o écrit au ; les autres mots n'ont pas le son o.
        const son = libelle === 'au' ? 'o' : libelle;
        if (libelle === 'au') expect(item.reponse).toMatch(GRAPHIE.o!.au!);
        expect(item.options!.filter((o) => SON[son]!.test(o)), c).toEqual([item.reponse]);
      } else throw new Error(`énoncé inconnu : ${c}`);
    });
  });

  it('syllabes : première, dernière, nombre', () => {
    const groupesVoyelles = (m: string) => (m.match(/[aeiouyéèêàâîôû]+/g) ?? []).length;
    partout('syllabes-cp', (item) => {
      const mot = item.consigne.match(/« (\p{L}+) »/u)![1]!;
      if (item.consigne.includes('Combien')) expect(r(item)).toBe(groupesVoyelles(mot));
      else if (item.consigne.includes('première')) {
        expect(item.options!.filter((o) => mot.startsWith(o))).toEqual([item.reponse]);
        expect(groupesVoyelles(item.reponse)).toBe(1);
      } else {
        expect(item.options!.filter((o) => mot.endsWith(o))).toEqual([item.reponse]);
        expect(groupesVoyelles(item.reponse)).toBe(1);
      }
    });
  });

  it('lettres muettes : le mot de la même famille fait entendre la lettre', () => {
    partout('lettres-muettes-cp', (item) => {
      const [, debut, famille] = item.consigne.match(/: (?:(?:un|une|le|la) )?(\p{L}+)… Pense à « (\p{L}+) »/u)!;
      expect(item.reponse.startsWith(debut!)).toBe(true);
      expect(item.reponse.length).toBe(debut!.length + 1);
      expect(famille!.startsWith(item.reponse)).toBe(true);
      expect(famille!.length).toBeGreaterThan(item.reponse.length);
      expect(item.indice).not.toContain(famille);
      if (item.options) {
        expect(item.options.filter((o) => famille!.startsWith(o))).toEqual([item.reponse]);
        // Les pièges finissent par une lettre muette plausible.
        for (const o of item.options) if (o !== item.reponse) expect('tdsx').toContain(o.slice(-1));
      }
    });
  });

  it('m ou n, c ou ç, g ou gu, s ou ss', () => {
    partout('valeur-lettres-cp', (item) => {
      const c = item.consigne;
      const mot = c.match(/: (?:\p{L}+ )?(\p{L}*…\p{L}*)/u)![1]!;
      const [avant, apres] = mot.split('…') as [string, string];
      const son = c.match(/On entend « (\p{L}) »/u)?.[1];
      const devantEI = /^[eiéèêy]/.test(apres);
      if (c.startsWith('Écris m ou n')) expect(item.reponse).toBe(/^[mbp]/.test(apres) ? 'm' : 'n');
      else if (c.startsWith('Écris c ou ç')) expect(item.reponse).toBe(devantEI || son === 'k' ? 'c' : 'ç');
      else if (c.startsWith('Écris g ou gu')) {
        expect(item.reponse).toBe(devantEI && son === 'g' ? 'gu' : 'g');
        if (!devantEI) expect(son).toBe('g');
      } else if (c.startsWith('Écris s ou ss')) {
        expect(avant.slice(-1)).toMatch(/[aeiouéè]/);
        expect(apres.charAt(0)).toMatch(/[aeiouéè]/);
        expect(item.reponse).toBe(son === 'z' ? 's' : 'ss');
      } else throw new Error(`énoncé inconnu : ${c}`);
    });
  });

  it('pluriel en -s, féminin en -e', () => {
    partout('genre-nombre-cp', (item) => {
      const c = item.consigne;
      const pluriel = c.match(/^Écris au pluriel : une? (\p{L}+), \p{L}+ …$/u);
      const gn = c.match(/^Écris au pluriel : un (.+), des …$/);
      const feminin = c.match(/^Complète : un (\p{L}+) (\p{L}+), une /u);
      if (pluriel) expect(item.reponse).toBe(`${pluriel[1]}s`);
      else if (gn) expect(item.reponse).toBe(gn[1]!.split(' ').map((m) => `${m}s`).join(' '));
      else if (feminin) {
        expect(item.reponse.endsWith('e')).toBe(true);
        expect([feminin[1], feminin[2]]).toContain(item.reponse.slice(0, -1));
        // L'adjectif est placé du même côté du nom dans les deux groupes.
        const fem = c.split(', ')[1]!.split(' ');
        const masc = [feminin[1], feminin[2]];
        expect(fem.indexOf('…')).toBe(masc.indexOf(item.reponse.slice(0, -1)) + 1);
      } else throw new Error(`énoncé inconnu : ${c}`);
    });
  });

  it('phrase : majuscule et point, nombre de phrases, signe final', () => {
    const question = (p: string) => /^(Où|Qui|Comment|Pourquoi|Quand|Est-ce)\s|-(tu|nous|vous|il|elle)(\s|$)/.test(p);
    const exclamation = (p: string) => /^(Comme|Que|Quel|Quelle)\s/.test(p) && !question(p);
    partout('phrase-cp', (item) => {
      const c = item.consigne;
      if (c.startsWith('Quelle est la bonne écriture')) {
        const bonnes = item.options!.filter((o) => /^\p{Lu}/u.test(o) && /\p{L}\.$/u.test(o));
        expect(bonnes).toEqual([item.reponse]);
      } else if (c.startsWith('Combien de phrases')) {
        const texte = c.slice(c.indexOf('?') + 1);
        expect(r(item)).toBe((texte.match(/[.!?]/g) ?? []).length);
        // Le point d'exclamation ne termine que de vraies exclamations.
        for (const ph of texte.trim().split(/(?<=[.!?])\s+/)) {
          if (ph.endsWith('!')) expect(exclamation(ph.slice(0, -2)), ph).toBe(true);
          if (ph.endsWith('?')) expect(question(ph.slice(0, -2)), ph).toBe(true);
        }
      } else if (c.startsWith('Quel signe termine la phrase')) {
        const p = c.match(/\? (.+) …$/)![1]!;
        expect(item.reponse).toBe(question(p) ? '?' : exclamation(p) ? '!' : '.');
      } else throw new Error(`énoncé inconnu : ${c}`);
      if (item.reponse === '!' || item.reponse === '?' || c.startsWith('Combien')) expect(item.explication).not.toMatch(/finit par un point :/);
    });
  });

  it('être et avoir au présent', () => {
    const ETRE = ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'];
    const AVOIR = ['ai', 'as', 'a', 'avons', 'avez', 'ont'];
    const PRONOMS: Record<string, number> = { 'j’': 0, je: 0, tu: 1, il: 2, elle: 2, nous: 3, vous: 4, ils: 5, elles: 5 };
    partout('etre-avoir-cp', (item) => {
      const [, verbe, sujet] = item.consigne.match(/le verbe (être|avoir) : (.+?) ?…/u)!;
      const s = sujet!.toLowerCase();
      const rang = s in PRONOMS ? PRONOMS[s]! : /^(les|mes) /.test(s) ? 5 : 2;
      expect(item.reponse).toBe((verbe === 'être' ? ETRE : AVOIR)[rang]);
    });
  });

  it('familles de mots : le mot de la famille partage le plus long morceau', () => {
    // Plus long morceau commun à deux mots.
    const commun = (x: string, y: string) => {
      let best = 0;
      for (let i = 0; i < x.length; i++) for (let j = i + 1; j <= x.length; j++) if (j - i > best && y.includes(x.slice(i, j))) best = j - i;
      return best;
    };
    partout('familles-cp', (item) => {
      const meme = item.consigne.match(/même famille que « (\p{L}+) »/u);
      const intrus = item.consigne.match(/n’est pas de la famille de « (\p{L}+) »/u);
      if (meme) {
        const mot = meme[1]!;
        const score = (o: string) => commun(mot, o);
        expect(score(item.reponse), item.consigne).toBeGreaterThanOrEqual(4);
        for (const o of item.options!) if (o !== item.reponse) expect(score(o), `${mot} / ${o}`).toBeLessThan(score(item.reponse));
      } else if (intrus) {
        const mot = intrus[1]!;
        const autres = item.options!.filter((o) => o !== item.reponse);
        expect(commun(mot, item.reponse), `${mot} / ${item.reponse}`).toBeLessThan(4);
        for (const o of autres) {
          expect(commun(mot, o), `${mot} / ${o}`).toBeGreaterThanOrEqual(4);
          expect(commun(item.reponse, o), `${item.reponse} / ${o}`).toBeLessThan(4);
        }
      } else throw new Error(`énoncé inconnu : ${item.consigne}`);
    });
  });
});

// Garde-fou : les nombres affichés restent dans le champ du CP.
describe('champ numérique du CP', () => {
  it('aucun nombre au-delà de 100 dans les consignes de mathématiques', () => {
    const ids = ['nombres-unites-cp', 'nombres-comparer-cp', 'suites-cp', 'ordinaux-cp', 'addition-soustraction-cp', 'addition-colonnes-cp',
      'tables-addition-cp', 'doubles-moities-cp', 'numeration-calcul-cp', 'complement-dizaine-cp', 'ajouter-un-chiffre-cp', 'procedures-cp',
      'problemes-parties-tout-cp', 'problemes-deux-etapes-cp', 'problemes-multiplicatifs-cp', 'longueurs-cp', 'monnaie-cp', 'donnees-cp'];
    for (const id of ids) {
      partout(id, (item) => {
        for (const n of nombres(item.consigne)) expect(n, `${id} : ${item.consigne}`).toBeLessThanOrEqual(100);
      });
    }
  });
});

// Variété minimale des générateurs revus après relecture, et énoncés sans phrase ouverte par un chiffre.
describe('variété et énoncés du CP', () => {
  const consignes = (id: string, d: Difficulte) => new Set(GRAINES.map((g) => generateur(id).generer(g, d).consigne));
  it.each(['sons-cp', 'lettres-muettes-cp', 'valeur-lettres-cp', 'phrase-cp', 'familles-cp', 'problemes-deux-etapes-cp'])('%s : au moins 15 consignes par difficulté', (id) => {
    const [c1, c2, c3] = DIFFICULTES.map((d) => consignes(id, d)) as [Set<string>, Set<string>, Set<string>];
    for (const c of [c1, c2, c3]) expect(c.size).toBeGreaterThanOrEqual(15);
    expect([...c1].filter((x) => c3.has(x))).toEqual([]);
    if (id === 'sons-cp') expect([...c1].filter((x) => c2.has(x))).toEqual([]);
  });

  it('aucune phrase de consigne ne commence par un chiffre', () => {
    for (const g of GENERATEURS_CP) {
      partout(g.id, (item) => {
        for (const ph of item.consigne.split(/(?<=[.!?])\s+/)) expect(ph, `${g.id} : ${item.consigne}`).not.toMatch(/^\d/);
      });
    }
  });
});
