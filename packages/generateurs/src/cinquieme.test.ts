// Justesse des générateurs de 5e (programme 2026). Chaque oracle recalcule la réponse depuis la consigne,
// avec ses propres règles ou des tables ressaisies ici, sans réutiliser la logique des générateurs.
import { describe, expect, it } from 'vitest';
import { GENERATEURS_CINQUIEME } from './cinquieme';
import { generateur } from './index';
import { DIFFICULTES, GRAINES, calculJuste, calculer, egaliteVraie, partout, proche, val } from './oracles';

const nombres = (s: string) => [...s.replace(/(\d)[\s  ](?=\d{3}\b)/g, '$1').matchAll(/−?\d+(?:,\d+)?/g)].map((m) => val(m[0]));

/** Évalue une expression en x : « 2(3x + 4) », « 7x − 2 », « x² + 1 ». */
const enX = (expr: string, x: number) =>
  calculer(expr.replace(/x²/g, `(${x})*(${x})`).replace(/(\d)\(/g, '$1*(').replace(/(\d)x/g, `$1*(${x})`).replace(/x/g, `(${x})`).replace(/\*/g, '×'));

describe('justesse 5e nombres et calculs', () => {
  it('priorités et distributivité : le calcul est exact', () => {
    partout('priorites-5e', calculJuste);
    partout('distributivite-5e', (item) => {
      if (item.consigne.startsWith('Complète')) egaliteVraie(item);
      else expect(proche(calculer(item.consigne.split(' : ')[1]!), val(item.reponse))).toBe(true);
    });
  });

  it('divisibilité : un seul nombre divisible', () => {
    partout('divisibilite-5e', (item) => {
      const div = nombres(item.consigne)[0]!;
      expect(item.options!.filter((o) => Number(o) % div === 0)).toEqual([item.reponse]);
    });
  });

  it('relatifs : opposé, comparaison, soustraction', () => {
    partout('comparer-relatifs-5e', (item, d) => {
      if (d === 1) expect(val(item.reponse)).toBe(-nombres(item.consigne)[0]!);
      else if (d === 2) {
        const v = item.options!.map(val);
        expect(val(item.reponse)).toBe(item.consigne.includes('grand') ? Math.max(...v) : Math.min(...v));
      } else {
        const [x, y] = nombres(item.consigne.split(' : ')[1]!);
        expect(item.reponse).toBe(x! < y! ? '<' : '>');
      }
    });
    partout('soustraire-relatifs-5e', (item) => {
      expect(proche(calculer(item.consigne.split(' : ')[1]!.replace(/\(\+/g, '(')), val(item.reponse)), item.consigne).toBe(true);
    });
  });

  it('fractions : somme exacte, comparaison', () => {
    partout('fractions-5e', (item) => {
      const c = item.consigne;
      const f = [...c.matchAll(/(\d+)\/(\d+)/g)].map((m) => Number(m[1]) / Number(m[2]));
      if (c.startsWith('Complète')) expect(item.reponse).toBe(f[0]! < f[1]! ? '<' : '>');
      else {
        const attendu = c.includes(' − ') ? f[0]! - f[1]! : f[0]! + f[1]!;
        expect(proche(val(item.reponse), attendu), c).toBe(true);
        // Réponse irréductible.
        const m = item.reponse.match(/^(\d+)\/(\d+)$/);
        if (m) {
          const pgcd = (a: number, b: number): number => (b ? pgcd(b, a % b) : a);
          expect(pgcd(Number(m[1]), Number(m[2]))).toBe(1);
        }
      }
    });
  });

  it('carrés et cubes', () => {
    partout('carres-cubes-5e', (item) => {
      const c = item.consigne;
      if (c.includes('…²')) expect(Number(item.reponse) ** 2).toBe(nombres(c).at(-1));
      else expect(proche(calculer(c.split(' : ')[1]!.replace(/(\d+)²/g, '$1×$1').replace(/(\d+)³/g, '$1×$1×$1')), val(item.reponse))).toBe(true);
    });
  });
});

describe('justesse 5e calcul littéral', () => {
  it('substitution', () => {
    partout('substitution-5e', (item) => {
      const [, expr, x] = item.consigne.match(/^Calcule (.+) pour x = (.+)\.$/)!;
      expect(proche(enX(expr!, val(x!)), val(item.reponse)), item.consigne).toBe(true);
    });
  });

  it('réduire, développer, factoriser : égalité en deux valeurs, forme attendue', () => {
    partout('developper-factoriser-5e', (item, d) => {
      const depart = d === 3 ? item.consigne.match(/^Factorise (.+) en mettant/)![1]! : item.consigne.split(' : ')[1]!;
      const egal = (e: string) => [2, 5].every((x) => proche(enX(e, x), enX(depart, x)));
      expect(item.options!.filter(egal), item.consigne).toEqual([item.reponse]);
      if (d === 2) expect(item.reponse).not.toMatch(/\(/);
      if (d === 3) expect(item.reponse.startsWith(`${item.consigne.match(/mettant (\d+)/)![1]}(`)).toBe(true);
    });
  });

  it('équations', () => {
    partout('equations-5e', (item) => {
      const c = item.consigne;
      const x = Number(item.reponse);
      const eq = c.match(/: (.+) = (\d+)$/);
      if (eq) expect(proche(enX(eq[1]!, x), Number(eq[2]))).toBe(true);
      else if (c.startsWith('On ajoute')) {
        const [b, total] = nombres(c);
        expect(x + b!).toBe(total);
      } else {
        const k = c.includes('double') ? 2 : c.includes('triple') ? 3 : c.includes('quadruple') ? 4 : nombres(c)[0]!;
        expect(x * k).toBe(nombres(c).at(-1));
      }
    });
  });
});

describe('justesse 5e géométrie', () => {
  it('volumes et capacités', () => {
    partout('volumes-5e', (item) => {
      const c = item.consigne;
      const n = nombres(c.replace('3,14', ''));
      let attendu: number;
      if (c.includes('cube de')) attendu = n[0]! ** 3;
      else if (c.includes('pavé droit')) attendu = n[0]! * n[1]! * n[2]!;
      else if (c.includes('prisme')) attendu = (n[0]! * n[1]! / 2) * n[2]!;
      else if (c.includes('en litres')) attendu = n[0]! / 1000;
      else if (c.includes('en cm³') && c.startsWith('Convertis')) attendu = n[0]! * 1000;
      else if (c.includes('disque')) attendu = 3.14 * n[0]! ** 2;
      else attendu = 3.14 * n[0]! ** 2 * n[1]!;
      expect(proche(val(item.reponse), attendu), c).toBe(true);
    });
  });

  it('symétrie centrale : milieu, conservation, coordonnées opposées', () => {
    partout('symetrie-centrale-5e', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const x = nombres(c)[0]!;
        expect(proche(val(item.reponse), c.includes('Calcule AA′') ? 2 * x : x / 2)).toBe(true);
      } else if (d === 2) {
        const mesure = c.match(/(\d+) ?(cm|°)/);
        if (mesure) expect(item.reponse).toContain(`${mesure[1]}${mesure[2] === '°' ? '°' : ' cm'}`);
        else expect(item.reponse).toMatch(/parallèle|lui-même|demi-tour/);
      } else {
        const [x, y] = nombres(c.match(/coordonnées \((.+?)\)/)![1]!);
        expect(nombres(item.reponse)).toEqual([-x!, -y!]);
      }
    });
  });

  it('angles et parallélisme', () => {
    partout('angles-paralleles-5e', (item, d) => {
      const n = nombres(item.consigne);
      if (d < 3) expect(Number(item.reponse)).toBe(n[0]);
      else expect(item.reponse).toBe(n[0] === n[1] ? 'Oui' : 'Non');
    });
  });

  it('triangles : aire, hauteur, médiane, vocabulaire', () => {
    const DEF: [RegExp, string][] = [
      [/perpendiculaire au côté opposé/, 'une hauteur'], [/milieu du côté opposé/, 'une médiane'], [/perpendiculaire à un côté en son milieu/, 'une médiatrice'],
      [/trois hauteurs/, 'concourantes'], [/médiatrices/, 'du cercle circonscrit'],
    ];
    partout('triangles-5e', (item, d) => {
      const c = item.consigne;
      const n = nombres(c);
      if (d === 1) expect(proche(val(item.reponse), (n[0]! * n[1]!) / 2)).toBe(true);
      else if (c.includes('médiane')) expect(Number(item.reponse) * 2).toBe(n[0]);
      else if (d === 2) expect(proche(Number(item.reponse), (2 * n[0]!) / n[1]!)).toBe(true);
      else expect(item.reponse).toBe(DEF.find(([re]) => re.test(c))![1]);
    });
  });

  it('parallélogrammes : propriétés, nature, aire', () => {
    const NATURE: [RegExp, string][] = [
      [/perpendiculaires et de même longueur/, 'un carré'], [/Un losange a/, 'un carré'], [/Un rectangle a/, 'un carré'],
      [/diagonales de même longueur|un angle droit|trois angles droits/, 'un rectangle'], [/perpendiculaires|consécutifs de même longueur|quatre côtés de même/, 'un losange'],
      [/se coupent en leur milieu|parallèles deux à deux/, 'un parallélogramme'],
    ];
    partout('parallelogrammes-5e', (item, d) => {
      const c = item.consigne;
      const n = nombres(c);
      if (d === 1) {
        if (c.includes('Calcule AO')) expect(proche(val(item.reponse), n[0]! / 2)).toBe(true);
        else if (c.includes('angle en B')) expect(Number(item.reponse)).toBe(180 - n[0]!);
        else expect(val(item.reponse)).toBe(n[0]);
      } else if (d === 2) expect(item.reponse).toBe(NATURE.find(([re]) => re.test(c))![1]);
      else expect(Number(item.reponse)).toBe(n[0]! * n[1]!);
    });
  });
});

describe('justesse 5e données, proportionnalité, fonctions', () => {
  it('statistiques : fréquence, moyenne, valeur manquante', () => {
    partout('statistiques-5e', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const [total, effectif] = nombres(c);
        expect(proche(val(item.reponse), (effectif! * 100) / total!)).toBe(true);
      } else if (d === 2) {
        const v = nombres(c.split(' : ')[1]!);
        expect(proche(val(item.reponse), v.reduce((x, y) => x + y, 0) / v.length)).toBe(true);
      } else {
        const connues = nombres(c.split(' : ')[1]!.split(' et une')[0]!);
        const [n, moyenne] = nombres(c.split('La moyenne des ')[1]!);
        expect(Number(item.reponse)).toBe(n! * moyenne! - connues.reduce((x, y) => x + y, 0));
      }
    });
  });

  it('probabilités', () => {
    const SIMPLES: [RegExp, number][] = [
      [/obtenir 4 \?/, 1 / 6], [/pile/, 1 / 2], [/obtenir 7 \?/, 0], [/inférieur à 7/, 1], [/pair/, 1 / 2], [/multiple de 3/, 1 / 3], [/un as/, 4 / 32],
    ];
    partout('probabilites-5e', (item, d) => {
      const c = item.consigne;
      if (d === 1) expect(proche(val(item.reponse), SIMPLES.find(([re]) => re.test(c))![1])).toBe(true);
      else {
        const n = nombres(c.split('.')[0]!);
        const total = n.reduce((x, y) => x + y, 0);
        const p = n[0]! / total;
        expect(proche(val(item.reponse), c.includes('ne pas tirer') ? 1 - p : p), c).toBe(true);
      }
    });
  });

  it('pourcentages et proportionnalité', () => {
    partout('pourcentages-5e', (item, d) => {
      const n = nombres(item.consigne.replace('−', ''));
      if (d === 1) expect(proche(val(item.reponse), (n[0]! * n[1]!) / 100)).toBe(true);
      else if (d === 2) expect(proche(val(item.reponse), (n[1]! / n[0]!) * 100)).toBe(true);
      else expect(proche(val(item.reponse), n[0]! * (1 - n[1]! / 100))).toBe(true);
    });
    partout('reconnaitre-proportionnalite-5e', (item, d) => {
      const c = item.consigne;
      if (d === 3) {
        const ligne1 = nombres(c.split('Deuxième ligne')[0]!.split('Première ligne : ')[1]!);
        const ligne2 = nombres(c.split('Deuxième ligne : ')[1]!);
        expect(Number(item.reponse)).toBe((ligne1.at(-1)! * ligne2[0]!) / ligne1[0]!);
        return;
      }
      const n = nombres(c);
      const xs = d === 1 ? [n[0]!, n[2]!, n[4]!] : n.slice(0, 3);
      const ys = d === 1 ? [n[1]!, n[3]!, n[5]!] : n.slice(3, 6);
      const prop = ys.every((y, i) => proche(y / xs[i]!, ys[0]! / xs[0]!));
      expect(item.reponse).toBe(prop ? 'Oui' : 'Non');
    });
  });

  it('formules et tableaux de valeurs', () => {
    partout('tableau-valeurs-5e', (item, d) => {
      const n = nombres(item.consigne);
      if (d === 1) expect(Number(item.reponse)).toBe(n[0]! * n[1]!);
      else if (d === 2) expect(Number(item.reponse)).toBe(n[0]! + n[1]! * n[2]!);
      else expect(Number(item.reponse) * 4).toBe(n.at(-1));
    });
  });
});

describe('justesse 5e français', () => {
  const IMPERATIFS = /^(Ne )?(Range|touche|Fermez|parle|Prenez|te penche|mangez|Arrose|Faites)\b/;
  it('types et formes : ponctuation, négation, impératif', () => {
    partout('types-formes-5e', (item, d) => {
      const phrase = item.consigne.match(/« (.+) »/)![1]!;
      const type = phrase.endsWith('?') ? 'interrogative' : IMPERATIFS.test(phrase) ? 'injonctive' : 'déclarative';
      const negative = /\b(ne|n’)/i.test(phrase) && /\b(pas|plus|jamais|rien|personne)\b|^(Rien|Personne)\b/.test(phrase);
      const exclamative = phrase.endsWith('!');
      if (d === 1) expect(item.reponse).toBe(type);
      else if (d === 2) expect(item.reponse).toBe(negative ? 'Oui' : 'Non');
      else expect(item.reponse).toBe(`${type}, ${negative ? 'négative' : 'affirmative'} et ${exclamative ? 'exclamative' : 'non exclamative'}`);
    });
  });

  it('phrase simple ou complexe, relations', () => {
    const NON_VERBALES = ['Silence !', 'Défense de fumer.', 'Quelle belle journée !', 'Fin de la partie.', 'Au loup !', 'Interdiction de stationner devant le portail.', 'Bonne nuit, les enfants.'];
    partout('phrase-complexe-5e', (item, d) => {
      const phrase = item.consigne.match(/« (.+) »/)![1]!;
      const subordination = /(?<!\p{L})(que|qu’|quand|si|où|parce qu)(?!\p{L})/u.test(phrase.replace(/^Si /, 'si '));
      const coordination = /(?<!\p{L})(et|mais|ou|donc|car|or|ni)(?!\p{L})/u.test(phrase);
      const virgules = phrase.split(',').length - 1;
      if (d < 3) {
        const attendu = NON_VERBALES.includes(phrase) ? 'non verbale' : subordination || coordination || virgules > 0 && !/^(Après|Chaque)/.test(phrase) ? 'complexe' : 'simple';
        expect(item.reponse, phrase).toBe(attendu);
      } else expect(item.reponse, phrase).toBe(subordination ? 'subordination' : coordination ? 'coordination' : 'juxtaposition');
    });
  });

  it('fonctions : groupes connus ressaisis', () => {
    const ATTENDU: Record<string, string> = {
      'Les randonneurs': 'sujet', 'le sommet': 'COD', architecte: 'attribut du sujet', 'les grilles du parc': 'COD', incroyable: 'attribut du sujet',
      'Le chat de la voisine': 'sujet', 'leur exposé': 'COD', 'mûrs': 'attribut du sujet', 'Le boulanger': 'sujet', 'très patient': 'attribut du sujet',
      'de nos projets': 'COI', 'à leurs parents': 'COI', 'dans le parc': 'CC de lieu', 'samedi soir': 'CC de temps', 'à cause de la neige': 'CC de cause',
      'avec prudence': 'CC de manière', 'à mes grands-parents': 'COI', 'au printemps': 'CC de temps', 'sur le port': 'CC de lieu', 'faute d’argent': 'CC de cause',
      calmement: 'CC de manière', 'de cette tempête': 'COI', 'un vieux cerisier': 'sujet', 'Au fond du jardin': 'CC de lieu', 'Grâce à ses efforts': 'CC de cause',
      'son examen': 'COD', hier: 'CC de temps', 'Sans un mot': 'CC de manière', silencieux: 'attribut du sujet', 'aux élèves': 'COI', 'les loups': 'sujet',
      'Tous les étés': 'CC de temps',
    };
    partout('fonctions-5e', (item) => {
      const groupe = item.consigne.match(/fonction de « (.+) » \?/)![1]!;
      expect(item.reponse).toBe(ATTENDU[groupe]);
    });
  });

  it('déterminant ou pronom ; classes de pronoms', () => {
    const TOUJOURS_PRONOMS = ['Celles-ci', 'Chacun', 'le tien', 'Quelques-uns', 'Cela'];
    const AMBIGUS = ['le', 'les', 'leur', 'la', 'l’', 'Plusieurs'];
    partout('determinants-pronoms-5e', (item, d) => {
      if (d === 3) {
        const p = item.consigne.match(/« (.+?) »/)![1]!.split(' (')[0]!;
        const classe = ['elle', 'nous', 'leur', 'lui', 'eux'].includes(p) ? 'personnel' : /^(cel|ce|ça)/.test(p) ? 'démonstratif' : 'indéfini';
        expect(item.reponse).toBe(`pronom ${classe}`);
        return;
      }
      const [, phrase, mot] = item.consigne.match(/Dans « (.+) », « (.+) » est-il/)!;
      // Un déterminant est suivi d'un nom ; un pronom est suivi d'un verbe ou d'un auxiliaire.
      const suite = phrase!.slice(phrase!.indexOf(mot!) + mot!.length).trim().split(/[\s,.!?]/)[0]!;
      const verbeApres = /^(regarde|a|ai|avons|connais|sont)$/.test(suite);
      const attendu = TOUJOURS_PRONOMS.includes(mot!) || (AMBIGUS.includes(mot!) && verbeApres) ? 'un pronom' : 'un déterminant';
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('paroles rapportées', () => {
    partout('paroles-rapportees-5e', (item, d) => {
      if (d === 1) expect(item.reponse).toBe(item.consigne.includes('«') ? 'au discours direct' : 'au discours indirect');
      else {
        expect(item.reponse).not.toMatch(/[«:]/);
        const sujet = item.consigne.split(' ')[0];
        expect(item.reponse.startsWith(sujet!)).toBe(true);
        // Pas de verbe à la 1re personne avec « il » ou « elle ».
        expect(item.reponse).not.toMatch(/\b(il|elle) (viens|suis|gagnerai)\b/);
      }
    });
  });

  it('identifier un temps', () => {
    const IRR: Record<string, string> = {
      est: 'présent', sommes: 'présent', a: 'présent', avons: 'présent', va: 'présent', allons: 'présent', fait: 'présent', faisons: 'présent',
      vient: 'présent', venons: 'présent', prend: 'présent', prenons: 'présent', peut: 'présent', pouvons: 'présent', voit: 'présent', voyons: 'présent',
      fut: 'passé simple', fûmes: 'passé simple', eut: 'passé simple', eûmes: 'passé simple', alla: 'passé simple', allâmes: 'passé simple',
      fit: 'passé simple', fîmes: 'passé simple', vint: 'passé simple', vînmes: 'passé simple', prit: 'passé simple', prîmes: 'passé simple',
      put: 'passé simple', pûmes: 'passé simple', vit: 'passé simple', vîmes: 'passé simple',
    };
    partout('identifier-temps-5e', (item, d) => {
      const formes = item.consigne.match(/« (.+?) »/)![1]!.replace(/^j’/, 'j’ ').split(' ');
      if (d === 3) {
        const aux = formes[1]!;
        const temps = /^(ai|as|a|avons|avez|ont|suis|es|est|sommes|êtes|sont)$/.test(aux) ? 'passé composé'
          : /^(av|ét)/.test(aux) ? 'plus-que-parfait' : /^(aur|ser)/.test(aux) ? 'futur antérieur' : 'passé antérieur';
        expect(item.reponse).toBe(temps);
        return;
      }
      const f = formes[1]!;
      let temps: string;
      if (d === 2 && IRR[f]) temps = IRR[f]!;
      else if (/(r|er)(ais|ait|ions|iez|aient)$/.test(f) && /(rais|rait|rions|riez|raient)$/.test(f)) temps = 'conditionnel présent';
      else if (/(rai|ras|ra|rons|rez|ront)$/.test(f)) temps = 'futur simple';
      else if (/(ais|ait|ions|iez|aient)$/.test(f)) temps = 'imparfait';
      else if (/(âmes|âtes|èrent)$/.test(f) || /^(je|j’)$/.test(formes[0]!) && f.endsWith('ai') || formes[0] === 'tu' && f.endsWith('as') || formes[0] === 'il' && f.endsWith('a')) temps = 'passé simple';
      else temps = 'présent';
      expect(item.reponse, item.consigne).toBe(temps);
    });
  });

  it('radicaux des verbes : formes de référence', () => {
    const ATTENDU: Record<string, string> = {
      'manger présent nous': 'mangeons', 'manger imparfait je': 'mangeais', 'commencer présent nous': 'commençons', 'commencer imparfait il': 'commençait',
      'appeler présent j’': 'appelle', 'appeler présent nous': 'appelons', 'appeler futur simple ils': 'appelleront', 'jeter présent tu': 'jettes',
      'jeter présent vous': 'jetez', 'acheter présent j’': 'achète', 'acheter futur simple il': 'achètera', 'lever présent elles': 'lèvent',
      'espérer présent tu': 'espères', 'venir présent ils': 'viennent', 'venir futur simple nous': 'viendrons', 'prendre présent ils': 'prennent',
      'prendre présent nous': 'prenons', 'envoyer futur simple j’': 'enverrai', 'nettoyer présent il': 'nettoie', 'nettoyer imparfait nous': 'nettoyions',
      'finir présent nous': 'finissons', 'finir imparfait ils': 'finissaient', 'pouvoir futur simple je': 'pourrai', 'voir imparfait nous': 'voyions',
      'faire présent vous': 'faites', 'dire présent vous': 'dites', 'aller futur simple tu': 'iras', 'être imparfait nous': 'étions',
    };
    partout('radicaux-verbaux-5e', (item) => {
      const [, verbe, temps, pronom] = item.consigne.match(/« (.+?) » (?:au |à l’)(.+) avec « (.+) »/)!;
      expect(item.reponse).toBe(ATTENDU[`${verbe} ${temps} ${pronom}`]);
    });
  });

  it('accord sujet-verbe : nom noyau ou sujet multiple', () => {
    const PERS3: Record<string, [string, string]> = {
      bercer: ['berce', 'bercent'], réveiller: ['réveille', 'réveillent'], attirer: ['attire', 'attirent'], briller: ['brille', 'brillent'],
      corriger: ['corrige', 'corrigent'], tomber: ['tombe', 'tombent'], rester: ['reste', 'restent'], aller: ['va', 'vont'], commencer: ['commence', 'commencent'],
      stationner: ['stationne', 'stationnent'], jouer: ['joue', 'jouent'], préparer: ['prépare', 'préparent'], habiter: ['habite', 'habitent'],
      visiter: ['visite', 'visitent'], recevoir: ['reçoit', 'reçoivent'], être: ['est', 'sont'], venir: ['vient', 'viennent'], faire: ['fait', 'font'],
      conduire: ['conduit', 'conduisent'], trainer: ['traine', 'trainent'], courir: ['court', 'courent'], gâcher: ['gâche', 'gâchent'],
      ouvrir: ['ouvre', 'ouvrent'], durer: ['dure', 'durent'], gêner: ['gêne', 'gênent'],
    };
    const NOUS: Record<string, string> = { faire: 'faisons', lire: 'lisons', aller: 'allons', partir: 'partons' };
    const VOUS: Record<string, string> = { être: 'êtes', chanter: 'chantez' };
    partout('accord-sujet-verbe-5e', (item) => {
      const [, infinitif, phrase] = item.consigne.match(/« (.+?) » au présent : (.+)$/)!;
      const avant = phrase!.split('…')[0]!.trim();
      const apres = phrase!.split('…')[1]!.trim();
      let attendu: string;
      if (/\bmoi\b/i.test(avant)) attendu = NOUS[infinitif!]!;
      else if (/\b(toi|vous)\b/i.test(avant)) attendu = VOUS[infinitif!]!;
      else {
        // Noyau : premier nom du sujet ; sujet inversé quand la phrase commence par un complément de lieu.
        const sujet = /^Dans /.test(avant) ? apres : avant;
        const noyau = sujet.split(/ (de|du|des|d’)\b/)[0]!;
        const pluriel = / et /.test(noyau) || /^(Les|Des|des|les|Mes|Tes|Ses) /.test(noyau);
        attendu = PERS3[infinitif!]![pluriel ? 1 : 0];
      }
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('participe passé : être, avoir, COD placé avant', () => {
    // Genre et nombre du sujet (avec être) ou du COD placé avant (avec avoir), ressaisis ici.
    const MARQUE: [RegExp, string][] = [
      [/^Les filles sont|^Mes cousines sont|^Les feuilles sont|^Ma cousine et sa mère/, 'es'], [/^Ma grand-mère est|^La neige est/, 'e'],
      [/^Les invités sont|^Léa et Tom sont|^Les enfants sont/, 's'], [/^Mon frère est/, ''],
      [/^Ces lettres|^Les clés \?|^Les fleurs que|^Ces chansons/, 'es'], [/^Ta robe|^La tarte|^La lettre que|^Cette histoire/, 'e'],
      [/^Ces romans|^Tes amis/, 's'],
    ];
    const PP: Record<string, string> = {
      arriver: 'arrivé', partir: 'parti', venir: 'venu', aller: 'allé', tomber: 'tombé', rester: 'resté', rentrer: 'rentré', finir: 'fini',
      cueillir: 'cueilli', apprendre: 'appris', envoyer: 'envoyé', dire: 'dit', parler: 'parlé', écrire: 'écrit', acheter: 'acheté',
      laisser: 'laissé', manger: 'mangé', lire: 'lu', construire: 'construit', préparer: 'préparé', serrer: 'serré', chanter: 'chanté',
      voir: 'vu', raconter: 'raconté',
    };
    partout('participe-passe-5e', (item) => {
      const [, infinitif, phrase] = item.consigne.match(/de « (.+?) » : (.+)$/)!;
      const marque = MARQUE.find(([re]) => re.test(phrase!))?.[1] ?? '';
      expect(item.reponse, item.consigne).toBe(PP[infinitif!]! + marque);
    });
  });

  it('lexique : affixes, registres, relations de sens', () => {
    const SENS: Record<string, string> = {
      'pré-': 'avant', 're-': 'de nouveau', 'anti-': 'contre', 'inter-': 'entre', 'trans-': 'à travers, au-delà', 'sous-': 'en dessous',
      'sur-': 'au-dessus, en excès', 'hyper-': 'très, au-delà', 'auto-': 'soi-même', 'télé-': 'à distance', 'bi-': 'deux', 'tri-': 'trois',
      'poly-': 'plusieurs', 'mal-': 'mal, mauvais', 'in-': 'contraire, absence', '-able': 'qui peut être', '-ible': 'qui peut être',
      '-eur': 'qui fait l’action', '-ette': 'petit', '-ment': 'manière', '-age': 'action de', '-logue': 'spécialiste de', '-phobe': 'qui craint',
      '-cide': 'qui tue', '-erie': 'lieu où l’on fabrique ou vend',
    };
    partout('affixes-5e', (item, d) => {
      if (d < 3) expect(item.reponse).toBe(SENS[item.consigne.match(/(?:préfixe|suffixe) (\S+?)(?: \(adverbe\))? \?/)![1]!]);
      else expect(item.reponse).toMatch(/ne peut pas|contraire|de nouveau|manière|contre|distance|avant|entre/);
    });
    const FAMILIER = /bagnole|bouquin|bosser|se marrer|bouffer|gamin|piger|fric|flic|se planter|crevé|flotte|pote|bouquiner|se barrer|T’as|marre|super sympa|marrés|trop la honte|caille/;
    const SOUTENU = /automobile|ouvrage|œuvrer|s’esclaffer|se restaurer|bambin|saisir le sens|deniers|force publique|s’abuser|épuisé|l’onde|camarade|s’adonner|prendre congé|Avez-vous|las\b|fort /;
    partout('registres-5e', (item, d) => {
      const cible = item.consigne.match(/« (.+?) »/)![1]!;
      if (d === 2) {
        expect(FAMILIER.test(item.reponse) || SOUTENU.test(item.reponse)).toBe(false);
        return;
      }
      expect(item.reponse, cible).toBe(FAMILIER.test(cible) ? 'familier' : SOUTENU.test(cible) ? 'soutenu' : 'courant');
    });
    const HOMONYMES = [['vert', 'verre'], ['mer', 'mère'], ['pain', 'pin'], ['cou', 'coup'], ['sang', 'cent'], ['chêne', 'chaine']];
    const GENERIQUES = ['fruit', 'instrument', 'meuble', 'oiseau', 'véhicule', 'sport'];
    const ANTONYMES = [['monter', 'descendre'], ['généreux', 'avare'], ['victoire', 'défaite'], ['ancien', 'moderne'], ['accepter', 'refuser'], ['clair', 'obscur']];
    partout('relations-sens-5e', (item) => {
      const [m1, m2] = [...item.consigne.matchAll(/« (.+?) »/g)].map((m) => m[1]!);
      const paire = (l: string[][]) => l.some(([x, y]) => (x === m1 && y === m2) || (x === m2 && y === m1));
      const attendu = paire(HOMONYMES) ? 'des homonymes' : GENERIQUES.includes(m1!) || GENERIQUES.includes(m2!) ? 'un mot générique et un mot spécifique' : paire(ANTONYMES) ? 'des antonymes' : 'des synonymes';
      expect(item.reponse).toBe(attendu);
    });
  });
});

describe('variété 5e', () => {
  // Domaines fermés : peu de consignes possibles, la variété vient des options ou des valeurs.
  const FERMES: Record<string, number> = {
    'divisibilite-5e': 2, 'comparer-relatifs-5e': 2, 'carres-cubes-5e': 13, 'types-formes-5e': 25, 'phrase-complexe-5e': 15, 'fonctions-5e': 10, 'determinants-pronoms-5e': 8,
    'paroles-rapportees-5e': 10, 'radicaux-verbaux-5e': 6, 'accord-sujet-verbe-5e': 10, 'participe-passe-5e': 10, 'affixes-5e': 10,
    'registres-5e': 6, 'relations-sens-5e': 12, 'probabilites-5e': 7, 'triangles-5e': 5, 'parallelogrammes-5e': 12, 'symetrie-centrale-5e': 25,
  };
  it.each(GENERATEURS_CINQUIEME.map((g) => g.id))('%s : assez de consignes distinctes, d1 différente de d3', (id) => {
    const consignes = DIFFICULTES.map((d) => new Set(GRAINES.map((s) => generateur(id).generer(s, d).consigne)));
    for (const ens of consignes) expect(ens.size).toBeGreaterThanOrEqual(FERMES[id] ?? 25);
    expect([...consignes[0]!].some((x) => !consignes[2]!.has(x))).toBe(true);
  });
});
