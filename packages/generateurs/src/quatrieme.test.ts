// Justesse des générateurs de 4e (programme 2026). Chaque oracle recalcule la réponse depuis la consigne,
// avec ses propres règles ou des tables ressaisies ici, sans réutiliser la logique des générateurs.
import { describe, expect, it } from 'vitest';
import { generateur } from './index';
import { DIFFICULTES, GRAINES, calculer, partout, proche, val } from './oracles';
import { GENERATEURS_QUATRIEME } from './quatrieme';

const nombres = (s: string) => [...s.replace(/(\d)[\s  ](?=\d{3}\b)/g, '$1').matchAll(/−?\d+(?:,\d+)?/g)].map((m) => val(m[0]));
const fractions = (s: string) => [...s.matchAll(/(−)?(\d+)\/(\d+)/g)].map((m) => (m[1] ? -1 : 1) * Number(m[2]) / Number(m[3]));
const enX = (expr: string, x: number) =>
  calculer(expr.replace(/x²/g, `(${x})*(${x})`).replace(/(\d)\(/g, '$1*(').replace(/^x\(/, `(${x})*(`).replace(/(\d)x/g, `$1*(${x})`).replace(/x/g, `(${x})`).replace(/\)\(/g, ')*(').replace(/\*/g, '×'));
const irreductible = (s: string) => {
  const m = s.match(/^−?(\d+)\/(\d+)$/);
  if (!m) return true;
  const pgcd = (a: number, b: number): number => (b ? pgcd(b, a % b) : a);
  return pgcd(Number(m[1]), Number(m[2])) === 1;
};

describe('justesse 4e nombres et calculs', () => {
  it('relatifs : produits, quotients, enchainements', () => {
    for (const id of ['produit-relatifs-4e', 'enchainements-relatifs-4e']) {
      partout(id, (item) => {
        const expr = item.consigne.split(' : ')[1]!.replace(/\(\+/g, '(');
        expect(proche(calculer(expr), val(item.reponse)), item.consigne).toBe(true);
      });
    }
  });

  it('fractions : simplifier, multiplier, diviser, inverse', () => {
    partout('simplifier-fraction-4e', (item) => {
      const [f] = fractions(item.consigne);
      expect(proche(val(item.reponse), f!)).toBe(true);
      expect(irreductible(item.reponse)).toBe(true);
    });
    partout('multiplier-fractions-4e', (item) => {
      const c = item.consigne;
      const f = fractions(c);
      const attendu = c.includes(' de ') ? f[0]! * nombres(c.split(' de ')[1]!)[0]! : f[0]! * f[1]!;
      expect(proche(val(item.reponse), attendu), c).toBe(true);
      expect(irreductible(item.reponse)).toBe(true);
    });
    partout('diviser-fractions-4e', (item) => {
      const c = item.consigne;
      if (c.startsWith('Quel est l’inverse')) {
        const cible = c.match(/de (.+?) \?/)![1]!;
        expect(proche(val(item.reponse) * val(cible), 1)).toBe(true);
      } else if (c.includes('verres')) {
        const [total, verre] = fractions(c).length === 2 ? fractions(c) : [nombres(c)[0]!, fractions(c)[0]!];
        expect(proche(Number(item.reponse) * verre!, total!)).toBe(true);
      } else {
        const [a, b] = fractions(c);
        expect(proche(val(item.reponse), a! / b!)).toBe(true);
        expect(irreductible(item.reponse)).toBe(true);
      }
    });
  });

  it('puissances et racine carrée', () => {
    const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    const expo = (s: string) => Number([...s].map((ch) => SUP.indexOf(ch)).join(''));
    partout('puissances-4e', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const [, base, e] = c.match(/: \(?(−?\d+)\)?([⁰¹²³⁴⁵⁶⁷⁸⁹]+)$/)!;
        expect(val(item.reponse)).toBe(val(base!) ** expo(e!));
        return;
      }
      const termes = [...c.split(' : ')[1]!.matchAll(/(\w+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g)].map((m) => [m[1]!, expo(m[2]!)] as const);
      const [, br, er] = item.reponse.match(/^(\w+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+)$/)!;
      if (d === 2) {
        expect(br).toBe(termes[0]![0]);
        expect(expo(er!)).toBe(termes[0]![1] + termes[1]![1]);
      } else {
        expect(Number(br)).toBe(Number(termes[0]![0]) * Number(termes[1]![0]));
        expect(expo(er!)).toBe(termes[0]![1]);
      }
    });
    partout('racine-carree-4e', (item, d) => {
      const n = nombres(item.consigne.replace('√', ' '))[0]!;
      const r = Number(item.reponse);
      if (d === 2) expect(r * r <= n && (r + 1) ** 2 > n).toBe(true);
      else expect(r * r).toBe(n);
    });
  });

  it('développer et factoriser : égalité en deux valeurs, forme attendue', () => {
    partout('developper-factoriser-4e', (item, d) => {
      const depart = item.consigne.split(' : ')[1]!.replace(/^\((−\d+)\)\(/, '$1(');
      const egal = (e: string) => [2, 5].every((x) => proche(enX(e, x), enX(depart, x)));
      expect(item.options!.filter(egal), item.consigne).toEqual([item.reponse]);
      if (d === 3) expect(item.reponse.startsWith('x(')).toBe(true);
      else expect(item.reponse).not.toMatch(/\(/);
    });
  });

  it('équations : la solution vérifie l’équation', () => {
    partout('equations-4e', (item) => {
      const [g, dr] = item.consigne.split(' : ')[1]!.split(' = ');
      const x = val(item.reponse);
      expect(proche(enX(g!, x), enX(dr!, x)), item.consigne).toBe(true);
    });
  });
});

describe('justesse 4e géométrie', () => {
  it('Pythagore : longueurs et réciproque', () => {
    partout('pythagore-4e', (item, d) => {
      const n = nombres(item.consigne);
      if (d === 1) expect(Number(item.reponse) ** 2).toBe(n[0]! ** 2 + n[1]! ** 2);
      else if (d === 2) expect(Number(item.reponse) ** 2).toBe(n[0]! ** 2 - n[1]! ** 2);
      else {
        const [a, b, c] = [...n].sort((x, y) => x - y);
        expect(item.reponse).toBe(c! ** 2 === a! ** 2 + b! ** 2 ? 'Oui' : 'Non');
      }
    });
  });

  it('droite des milieux, cercle circonscrit, translations', () => {
    partout('droite-milieux-4e', (item) => {
      const c = item.consigne;
      const n = nombres(c)[0];
      if (c.includes('Calcule BC')) expect(proche(val(item.reponse), 2 * n!)).toBe(true);
      else if (c.includes('Calcule')) expect(proche(val(item.reponse), n! / 2)).toBe(true);
      else expect(item.reponse).toMatch(/parallèles|milieu de \[AC\]/);
    });
    partout('cercle-circonscrit-4e', (item) => {
      const c = item.consigne;
      const n = nombres(c)[0];
      if (c.includes('Calcule BC')) expect(proche(val(item.reponse), 2 * n!)).toBe(true);
      else if (c.includes('Calcule')) expect(proche(val(item.reponse), n! / 2)).toBe(true);
      else expect(item.reponse).toMatch(/milieu de \[BC\]|90°|\[EF\]/);
    });
    partout('translations-4e', (item, d) => {
      const c = item.consigne;
      if (d === 3) {
        const [ax, ay, bx, by, cx, cy] = nombres(c);
        expect(nombres(item.reponse)).toEqual([cx! + bx! - ax!, cy! + by! - ay!]);
      } else if (item.gabarit === 'saisie') expect(val(item.reponse)).toBe(nombres(c)[0]);
      else expect(item.reponse).toMatch(/parallélogramme|parallèle|rayon 3 cm|sans la tourner/);
    });
  });

  it('volumes de la pyramide et du cône', () => {
    partout('volumes-pyramide-cone-4e', (item) => {
      const c = item.consigne;
      const n = nombres(c.replace('3,14', ''));
      const attendu = c.includes('cône') ? (3.14 * n[0]! ** 2 * n[1]!) / 3 : c.includes('carré') ? (n[0]! ** 2 * n[1]!) / 3 : (n[0]! * n[1]!) / 3;
      expect(proche(val(item.reponse), attendu), c).toBe(true);
    });
  });
});

describe('justesse 4e données, proportionnalité, fonctions', () => {
  it('statistiques : médiane, étendue, moyenne pondérée', () => {
    partout('statistiques-4e', (item, d) => {
      const c = item.consigne;
      if (d === 3) {
        const paires = [...c.matchAll(/(\d+) élèves? (?:ont|a) eu (\d+)/g)].map((m) => [Number(m[1]), Number(m[2])]);
        const n = paires.reduce((s, [e]) => s + e!, 0);
        const somme = paires.reduce((s, [e, v]) => s + e! * v!, 0);
        expect(proche(val(item.reponse), somme / n)).toBe(true);
        return;
      }
      const v = nombres(c.split(' : ')[1]!.split('.')[0]!).sort((x, y) => x - y);
      if (c.includes('étendue')) expect(Number(item.reponse)).toBe(v.at(-1)! - v[0]!);
      else {
        const m = v.length % 2 ? v[(v.length - 1) / 2]! : (v[v.length / 2 - 1]! + v[v.length / 2]!) / 2;
        expect(proche(val(item.reponse), m)).toBe(true);
      }
    });
  });

  it('probabilités : contraire, deux épreuves', () => {
    const CAS: [RegExp, number][] = [
      [/deux fois pile/, 1 / 4], [/une seule fois pile/, 1 / 2], [/au moins un pile/, 3 / 4], [/pile et 6/, 1 / 12],
      [/un double/, 1 / 6], [/fasse 12/, 1 / 36], [/fasse 7/, 1 / 6], [/face et un nombre pair/, 1 / 4],
    ];
    partout('probabilites-4e', (item, d) => {
      const c = item.consigne;
      if (d === 1) expect(proche(val(item.reponse), 1 - fractions(c)[0]!)).toBe(true);
      else if (c.includes('urne')) {
        const [r, b] = nombres(c);
        expect(proche(val(item.reponse), (r! / (r! + b!)) ** 2)).toBe(true);
      } else expect(proche(val(item.reponse), CAS.find(([re]) => re.test(c))![1])).toBe(true);
    });
  });

  it('proportionnalité, coefficient multiplicateur, programmes de calcul', () => {
    partout('quatrieme-proportionnelle-4e', (item, d) => {
      const n = nombres(item.consigne);
      if (d === 3) expect(proche(Number(item.reponse), (n[0]! * n[1]!) / (n[1]! + n[2]!))).toBe(true);
      else {
        // Contextes : « x1 … y1 … x2 » ou « y1 … x1 … x2 » (consommation).
        const conso = item.consigne.includes('consomme');
        const [x1, y1, x2] = conso ? [n[1]!, n[0]!, n[2]!] : [n[0]!, n[1]!, n[2]!];
        expect(proche(val(item.reponse), (y1 * x2) / x1), item.consigne).toBe(true);
      }
    });
    partout('coefficient-multiplicateur-4e', (item, d) => {
      const c = item.consigne;
      const p = nombres(c.split('%')[0]!).at(-1)!;
      const coef = /augment|hausse/.test(c) ? 1 + p / 100 : 1 - p / 100;
      if (d === 1) expect(proche(val(item.reponse), coef)).toBe(true);
      else if (d === 2) expect(proche(val(item.reponse), nombres(c)[0]! * coef)).toBe(true);
      else expect(proche(val(item.reponse) * coef, nombres(c.split('coute')[1]!)[0]!)).toBe(true);
    });
    partout('programme-calcul-4e', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const [b, k, x] = nombres(c);
        expect(val(item.reponse)).toBe((x! + b!) * k!);
      } else if (d === 2) {
        const [k, b, r] = nombres(c);
        expect(Number(item.reponse) * k! + b!).toBe(r);
      } else {
        const [b, k] = nombres(c);
        expect([1, 4].every((x) => proche(enX(item.reponse, x), (x + b!) * k!))).toBe(true);
      }
    });
  });
});

describe('justesse 4e français', () => {
  it('subordonnants : un pronom relatif a un antécédent nominal juste avant', () => {
    const RELATIFS = ['qui', 'dont', 'où', 'auquel'];
    partout('subordonnants-4e', (item) => {
      const [, phrase, mot] = item.consigne.match(/Dans « (.+) », quelle est la classe de « (.+) » \?/)!;
      // « que » relatif : précédé d'un nom (livre, film, fleurs, lettre) ; conjonctif : précédé d'un verbe.
      const avant = phrase!.slice(0, phrase!.indexOf(` ${mot}`)).split(' ').at(-1)!;
      const relatif = mot === 'que' ? ['film', 'fleurs', 'lettre', 'livre'].includes(avant) : RELATIFS.includes(mot!) && !/demande$/.test(avant);
      expect(item.reponse, item.consigne).toBe(relatif ? 'pronom relatif' : 'conjonction de subordination');
    });
  });

  it('fonctions des subordonnées : relative, complétive, circonstancielle', () => {
    partout('fonctions-subordonnees-4e', (item) => {
      const [, phrase, sub] = item.consigne.match(/Dans « (.+) », quelle est la fonction de la subordonnée « (.+) » \?/)!;
      const premier = sub!.split(/[ ’]/)[0]!.toLowerCase();
      const avant = phrase!.slice(0, phrase!.indexOf(sub!)).trim().split(' ').at(-1) ?? '';
      const circonstance = (m: string) => (/^(quand|dès|pendant)$/.test(m) ? 'CC de temps' : /^(parce|comme|puisque)$/.test(m) ? 'CC de cause'
        : /^(si|au)$/.test(m) ? 'CC de condition' : 'CC d’opposition');
      const attendu = /^(crois|dit|souhaite|demande)$/.test(avant) ? 'COD'
        : avant && /^(qui|que|où|dont)$/.test(premier) ? 'complément du nom' : circonstance(premier);
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('opposition, condition, apposition', () => {
    partout('opposition-condition-4e', (item) => {
      const groupe = item.consigne.match(/fonction de « (.+) » \?/)![1]!;
      const attendu = /^(Malgré|Bien qu|Même s|En dépit|Quoique)/.test(groupe) ? 'CC d’opposition'
        : /^(En cas|Avec un peu|Sans|Si |À condition)/.test(groupe) ? 'CC de condition' : 'apposition';
      expect(item.reponse).toBe(attendu);
    });
  });

  it('interrogative indirecte', () => {
    partout('interrogative-indirecte-4e', (item, d) => {
      if (d === 3) {
        const phrase = item.consigne.match(/« (.+) »/)![1]!;
        expect(item.reponse).toBe(/ si /.test(phrase) ? 'totale' : 'partielle');
      } else {
        expect(item.reponse).not.toMatch(/[?«:]/);
        expect(item.reponse).toMatch(/ (si|où|quand|pourquoi|ce que|qui|combien) /);
      }
    });
  });

  it('temps composés : temps de l’auxiliaire', () => {
    partout('temps-composes-4e', (item) => {
      const aux = item.consigne.match(/« (?:j’|\p{L}+ )(\p{L}+) /u)![1]!;
      const temps = /^(ai|as|a|avons|avez|ont|suis|es|est|sommes|êtes|sont)$/.test(aux) ? 'passé composé' : /^(av|ét)/.test(aux) ? 'plus-que-parfait' : /^(eu|eû|fu|fû|fut)/.test(aux) ? 'passé antérieur'
        : /^(aur|ser)(ai|as|a|ons|ez|ont)$/.test(aux) ? 'futur antérieur' : 'conditionnel passé';
      expect(item.reponse, item.consigne).toBe(temps);
    });
  });

  it('voix passive : sujet et agent échangés, être au même temps', () => {
    partout('voix-passive-4e', (item) => {
      const c = item.consigne;
      if (c.includes('voix active ou')) {
        const phrase = c.match(/« (.+) »/)![1]!;
        expect(item.reponse).toBe(/(sont|est|été|sera|était) \p{L}+(é|i|t|u)(e|es|s)? (par|de) /u.test(phrase) ? 'voix passive' : 'voix active');
        return;
      }
      const active = c.match(/« (.+) »/)![1]!;
      const tempsActif = / (a|ont) /.test(active) ? /(a été|ont été)/ : /\b(inaugurera|organiseront)\b/.test(active) ? / sera / : /\bavait\b/.test(active) ? /avait été/ : /\bapplaudissait\b/.test(active) ? / était / : / (est|sont) /;
      expect(item.reponse, c).toMatch(tempsActif);
      expect(item.reponse).toMatch(/ (par|de) /);
    });
  });

  it('subjonctif présent : formes de référence', () => {
    const SUBJ: Record<string, string> = {
      'chanter tu': 'chantes', 'finir il': 'finisse', 'parler nous': 'parlions', 'partir tu': 'partes', 'jouer vous': 'jouiez', 'écrire il': 'écrive',
      'être tu': 'sois', 'avoir il': 'ait', 'faire nous': 'fassions', 'aller tu': 'ailles', 'pouvoir je': 'puisse', 'savoir vous': 'sachiez',
      'venir ils': 'viennent', 'prendre tu': 'prennes', 'vouloir il': 'veuille', 'voir nous': 'voyions', 'être nous': 'soyons', 'avoir vous': 'ayez',
    };
    partout('subjonctif-4e', (item) => {
      const [, verbe, , personne] = item.consigne.match(/« (.+?) » : (.+?)(?: |’)(je|tu|il|nous|vous|ils) …$/)!;
      expect(item.reponse).toBe(SUBJ[`${verbe} ${personne}`]);
    });
  });

  it('participes passés : le féminin fait entendre la consonne', () => {
    const PP: Record<string, string> = {
      prendre: 'pris', mettre: 'mis', dire: 'dit', faire: 'fait', écrire: 'écrit', conduire: 'conduit', peindre: 'peint', finir: 'fini',
      suivre: 'suivi', vendre: 'vendu', courir: 'couru', offrir: 'offert', ouvrir: 'ouvert', craindre: 'craint', asseoir: 'assis', acquérir: 'acquis',
      rire: 'ri', voir: 'vu',
    };
    partout('participes-passes-4e', (item, d) => {
      const verbe = item.consigne.match(/« (.+?) »/)![1]!;
      const masc = PP[verbe]!;
      expect(item.reponse).toBe(d === 3 ? `${masc}e` : masc);
    });
  });

  it('accords complexes : personne de l’antécédent, plusieurs personnes', () => {
    partout('accords-complexes-4e', (item) => {
      const phrase = item.consigne.split(' : ')[1]!;
      const avant = phrase.split('…')[0]!.toLowerCase();
      const groupe = avant.replace(/^(c’est|ce sont) /, '').replace(/ qui.*$/, '').trim();
      const unique: Record<string, string> = { moi: 'je', toi: 'tu', nous: 'nous', vous: 'vous' };
      const personne = / et |^ni /.test(groupe) ? (/\bmoi\b/.test(groupe) ? 'nous' : /\btoi\b/.test(groupe) ? 'vous' : 'ils') : (unique[groupe] ?? 'ils');
      const fin: Record<string, RegExp> = { je: /(s|e)$/, tu: /s$/, nous: /ons$/, vous: /(ez|tes)$/, ils: /(ent|ont)$/ };
      expect(item.reponse, item.consigne).toMatch(fin[personne]!);
    });
  });

  it('verbes pronominaux : accord seulement si « se » est COD ou verbe essentiellement pronominal', () => {
    partout('pronominaux-4e', (item) => {
      const phrase = item.consigne.split(' : ')[1]!;
      const codApres = /… (les|des|la) /.test(phrase);
      const coi = /(parler|sourire)/.test(item.consigne);
      if (codApres || coi) expect(item.reponse).toMatch(/(é|i|t)$/);
      else expect(item.reponse).toMatch(/(ée|ées|és|es|s|e)$/);
    });
  });

  it('homophones, polysémie, intensité', () => {
    const BONNE: Record<string, string> = {
      'Il voulait venir, … il était malade.': 'mais', 'Range … affaires avant de partir.': 'mes', 'Elle … la table pour le diner.': 'met',
      'Veux-tu du thé … du café ?': 'ou', 'La ville … je suis né est petite.': 'où', 'Le ciel … gris ce matin.': 'est', 'Il pleut … il fait froid.': 'et',
      'Il est tard, … tu dors encore.': 'or', 'Le ballon est sorti … du terrain.': 'hors', 'Prends un pull, … il fait froid.': 'car',
      'Il est huit heures et …': 'quart', 'Il n’aime … le thé ni le café.': 'ni', 'Ce lieu est dangereux, ne … va pas.': 'n’y', 'Je pense, … je suis.': 'donc',
    };
    partout('homophones-conjonctions-4e', (item) => expect(item.reponse).toBe(BONNE[item.consigne.replace('Complète : ', '')]));
    partout('polysemie-4e', (item) => {
      const phrase = item.consigne.match(/« (.+?) »/)![1]!;
      const indices: [RegExp, RegExp][] = [
        [/ordinateur/, /appareil/], [/chat chasse/, /rongeur/], [/euros/, /monnaie/], [/appartement/, /logement/], [/Molière/, /théâtre/],
        [/grande culture/, /connaissances/], [/blé/, /terre/], [/colère/, /calme/], [/classement/, /première place/], [/main verte/, /jardinage/],
        [/banane/, /mûre/], [/facteur/, /courrier/], [/restaurant/, /remarquable/], [/géant/, /insensible/], [/bonheur/, /plongé/],
      ];
      expect(item.reponse).toMatch(indices.find(([re]) => re.test(phrase))![1]);
    });
    const RANG: Record<string, number> = {
      tiède: 0, chaud: 1, brûlant: 2, frais: 0, froid: 1, glacial: 2, content: 0, joyeux: 1, euphorique: 2, inquiet: 0, effrayé: 1, terrifié: 2,
      fatigué: 0, épuisé: 1, exténué: 2, mécontent: 0, fâché: 1, furieux: 2, bon: 0, délicieux: 1, exquis: 2, petit: 0, minuscule: 1, microscopique: 2,
      grand: 0, immense: 1, gigantesque: 2, murmurer: 0, parler: 1, hurler: 2, apprécier: 0, aimer: 1, adorer: 2, ennuyeux: 0, pénible: 1,
      insupportable: 2, intéressant: 0, passionnant: 1, captivant: 2, triste: 0, malheureux: 1, désespéré: 2, sale: 0, crasseux: 1, répugnant: 2,
    };
    partout('intensite-4e', (item, d) => {
      if (d === 3) expect(item.reponse.split(' < ').map((m) => RANG[m])).toEqual([0, 1, 2]);
      else expect(RANG[item.reponse]).toBe(d === 1 ? 2 : 0);
    });
  });
});

describe('variété 4e', () => {
  const FERMES: Record<string, number> = {
    'subordonnants-4e': 6, 'fonctions-subordonnees-4e': 6, 'opposition-condition-4e': 6, 'interrogative-indirecte-4e': 1,
    'voix-passive-4e': 8, 'subjonctif-4e': 15, 'participes-passes-4e': 9, 'accords-complexes-4e': 6, 'pronominaux-4e': 4,
    'homophones-conjonctions-4e': 5, 'polysemie-4e': 6, 'intensite-4e': 15, 'cercle-circonscrit-4e': 25, 'probabilites-4e': 20,
    'puissances-4e': 20, 'racine-carree-4e': 13, 'coefficient-multiplicateur-4e': 16,
  };
  it.each(GENERATEURS_QUATRIEME.filter((g) => !g.id.endsWith('-2020')).map((g) => g.id))('%s : assez de consignes distinctes, d1 différente de d3', (id) => {
    const consignes = DIFFICULTES.map((d) => new Set(GRAINES.map((s) => generateur(id).generer(s, d).consigne)));
    for (const ens of consignes) expect(ens.size).toBeGreaterThanOrEqual(FERMES[id] ?? 25);
    expect([...consignes[0]!].some((x) => !consignes[2]!.has(x))).toBe(true);
  });
});
