// Justesse des générateurs de 4e du programme 2020. Reprises : mêmes items que le générateur repris (dont la justesse
// est prouvée dans son propre fichier de test), à l'identifiant, à la compétence et au vocabulaire de la consigne près.
// Nouveaux générateurs : chaque oracle recalcule la réponse depuis la consigne, avec ses propres règles ou des tables
// ressaisies ici, sans réutiliser la logique ni les corpus des générateurs.
import { describe, expect, it } from 'vitest';
import { generateur } from './index';
import { DIFFICULTES, GRAINES, partout, proche, val } from './oracles';
import { GENERATEURS_QUATRIEME_2020_FRANCAIS } from './quatrieme-2020-francais';
import { GENERATEURS_QUATRIEME_2020_MATHS } from './quatrieme-2020-maths';

const nombres = (s: string) => [...s.replace(/(\d)[\s  ](?=\d{3}\b)/g, '$1').matchAll(/−?\d+(?:,\d+)?/g)].map((m) => val(m[0]));
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const expo = (s: string) => Number(s.replace('⁻', '-').split('').map((c) => (SUP.includes(c) ? SUP.indexOf(c) : c)).join(''));

const SANS_IRREDUCTIBLE = (c: string) => c
  .replace(/^Écris la fraction (\S+) sous forme irréductible\.$/, 'Simplifie au maximum la fraction $1.')
  .replace('Calcule et donne le résultat sous forme irréductible : ', 'Calcule et simplifie le résultat au maximum : ');
const REPRISES: [string, string, ((c: string) => string)?][] = [
  ['produit-relatifs-4e-2020', 'produit-relatifs-4e'], ['simplifier-fraction-4e-2020', 'simplifier-fraction-4e', SANS_IRREDUCTIBLE],
  ['multiplier-fractions-4e-2020', 'multiplier-fractions-4e', SANS_IRREDUCTIBLE], ['diviser-fractions-4e-2020', 'diviser-fractions-4e', SANS_IRREDUCTIBLE],
  ['decomposition-facteurs-premiers-4e-2020', 'decomposition-facteurs-premiers-3e'], ['racine-carree-4e-2020', 'racine-carree-4e'],
  ['puissances-4e-2020', 'puissances-4e'], ['notation-scientifique-4e-2020', 'notation-scientifique-3e'],
  ['developper-factoriser-4e-2020', 'developper-factoriser-4e'], ['equations-4e-2020', 'equations-4e'],
  ['quatrieme-proportionnelle-4e-2020', 'quatrieme-proportionnelle-4e'], ['pythagore-4e-2020', 'pythagore-4e'],
  ['volumes-pyramide-cone-4e-2020', 'volumes-pyramide-cone-4e'], ['translations-4e-2020', 'translations-4e'],
  ['subordonnants-4e-2020', 'subordonnants-4e'], ['interrogative-indirecte-4e-2020', 'interrogative-indirecte-4e'],
  ['voix-passive-4e-2020', 'voix-passive-4e'], ['subjonctif-4e-2020', 'subjonctif-4e'], ['accords-complexes-4e-2020', 'accords-complexes-4e'],
  ['participes-passes-4e-2020', 'participes-passes-4e'], ['intensite-4e-2020', 'intensite-4e'], ['polysemie-4e-2020', 'polysemie-4e'],
  ['paroles-rapportees-4e-2020', 'paroles-rapportees-5e'],
];

describe('reprises 4e (programme 2020) : mêmes items que le générateur repris', () => {
  it.each(REPRISES)('%s reprend %s', (id, source, consigne) => {
    const g = generateur(id);
    expect(g.competences[0]).toMatch(/^(MA|FR)-C4-4E-[A-Z]+-5\d$/);
    for (const d of DIFFICULTES) for (const s of GRAINES) {
      const { id: _i, competence, consigne: c, ...reste } = g.generer(s, d);
      const { id: _j, consigne: c0, competence: _c, ...attendu } = generateur(source).generer(s, d);
      expect(competence).toBe(g.competences[0]);
      expect(reste).toEqual(attendu);
      expect(c).toBe(consigne ? consigne(c0) : c0);
      expect(c).not.toMatch(/irréductible/);
    }
  });
});

describe('justesse 4e mathématiques (programme 2020)', () => {
  it('puissances de 10 et préfixes', () => {
    const PREFIXE: Record<string, number> = { nano: -9, micro: -6, milli: -3, kilo: 3, méga: 6, giga: 9 };
    partout('puissances-dix-4e-2020', (item) => {
      const c = item.consigne;
      if (c.startsWith('Quelle est l’écriture décimale')) {
        const n = expo(c.match(/10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/)![1]!);
        expect(proche(val(item.reponse), 10 ** n), c).toBe(true);
      } else if (c.startsWith('Quelle puissance')) {
        const x = val(c.match(/égale à (.+) \?/)![1]!);
        expect(proche(10 ** expo(item.reponse.slice(2)), x), c).toBe(true);
      } else {
        const nom = c.match(/« (.+?) »/)![1]!;
        expect(expo(item.reponse.slice(2))).toBe(PREFIXE[nom]);
      }
    });
  });

  it('médiane : liste ou tableau d’effectifs', () => {
    const mediane = (v: number[]) => {
      const t = [...v].sort((x, y) => x - y);
      return t.length % 2 ? t[(t.length - 1) / 2]! : (t[t.length / 2 - 1]! + t[t.length / 2]!) / 2;
    };
    partout('mediane-4e-2020', (item) => {
      const c = item.consigne;
      let serie: number[];
      if (c.startsWith('Pointures')) {
        serie = [...c.matchAll(/(\d+) (?:élèves? chaussen?t? )?du (\d+)/g)].flatMap((m) => Array(Number(m[1])).fill(Number(m[2])) as number[]);
      } else serie = nombres(c.split(' : ')[1]!.split('. Détermine')[0]!);
      expect(proche(val(item.reponse), mediane(serie)), c).toBe(true);
    });
  });

  it('probabilités : contraire, somme des issues, urne', () => {
    partout('probabilites-4e-2020', (item, d) => {
      const c = item.consigne;
      if (d === 1) expect(proche(val(item.reponse) + val(c.match(/est (\d,\d+)\./)![1]!), 1), c).toBe(true);
      else if (d === 2) {
        const liste = c.match(/sont (?:respectivement )?([\d,; ]+)\./)![1]!.split(' ; ').map(val);
        expect(proche(liste.reduce((x, y) => x + y, 0) + val(item.reponse), 1), c).toBe(true);
        expect(val(item.reponse)).toBeGreaterThan(0);
      } else {
        const [r, b, v] = nombres(c);
        expect(proche(val(item.reponse), (b! + v!) / (r! + b! + v!)), c).toBe(true);
      }
    });
  });

  it('Thalès dans les triangles emboîtés : quotients égaux ; réciproque par produits en croix', () => {
    partout('thales-emboites-4e-2020', (item, d) => {
      const c = item.consigne;
      const L: Record<string, number> = Object.fromEntries([...c.matchAll(/([A-Z]{2}) = (\d+) cm/g)].map((m) => [m[1]!, Number(m[2])]));
      if (d < 3) {
        const cherche = c.match(/Calcule ([A-Z]{2})/)![1]!;
        L[cherche] = val(item.reponse);
        const q = [['AM', 'AB'], ['AN', 'AC'], ['MN', 'BC']].filter(([x, y]) => L[x!] !== undefined && L[y!] !== undefined).map(([x, y]) => L[x!]! / L[y!]!);
        expect(q.length).toBeGreaterThanOrEqual(2);
        for (const v of q) expect(proche(v, q[0]!), c).toBe(true);
      } else {
        const paralleles = L.AM! * L.AC! === L.AN! * L.AB!;
        expect(item.reponse.startsWith(paralleles ? 'Oui, d’après la réciproque' : 'Non'), c).toBe(true);
      }
    });
  });

  it('cosinus : adjacent sur hypoténuse', () => {
    partout('cosinus-4e-2020', (item, d) => {
      const c = item.consigne;
      const droit = c.match(/rectangle en ([A-Z])/)![1]!;
      const [y, x] = [...c.match(/cos\(([A-Z])([A-Z])̂/)!.slice(1)];
      const seg = (s: string, t: string) => [s, t].sort().join('');
      const [adj, hyp] = [seg(x!, droit), seg(x!, y!)];
      if (d === 1) expect(item.reponse).toBe(`${adj}/${hyp}`);
      else {
        const L: Record<string, number> = Object.fromEntries([...c.matchAll(/([A-Z]{2}) = (\d+(?:,\d+)?) cm/g)].map((m) => [m[1]!, val(m[2]!)]));
        const cos = val(c.match(/\) = (\d,\d)/)![1]!);
        if (d === 2) expect(proche(val(item.reponse), L[hyp]! * cos), c).toBe(true);
        else expect(proche(val(item.reponse), L[adj]! / cos), c).toBe(true);
      }
    });
  });

  it('grandeurs quotients : vitesse, conversions, débit', () => {
    const heures = (s: string) => {
      const m = s.match(/(?:(\d+) h)?(?: ?(\d+) min)?/)!;
      return Number(m[1] ?? 0) + Number(m[2] ?? 0) / 60;
    };
    partout('grandeurs-quotients-4e-2020', (item) => {
      const c = item.consigne;
      const r = val(item.reponse);
      if (c.includes('pendant')) {
        const v = nombres(c.split('vitesse moyenne de ')[1]!)[0]!;
        expect(proche(r, v * heures(c.split('pendant ')[1]!.split('.')[0]!)), c).toBe(true);
      } else if (c.includes('parcourt')) {
        const dist = val(c.match(/parcourt ([\d,]+) km/)![1]!);
        expect(proche(r, dist / heures(c.split(' km en ')[1]!.split('.')[0]!)), c).toBe(true);
      } else if (c.startsWith('Convertis')) expect(proche(r, (nombres(c)[0]! * 1000) / 3600), c).toBe(true);
      else if (c.includes('m/s')) expect(proche(r, (nombres(c)[0]! * 3600) / 1000), c).toBe(true);
      else {
        const [debit, volume] = nombres(c);
        expect(proche(r * debit!, volume!), c).toBe(true);
      }
    });
  });

  it('agrandissement et réduction : × k, × k², × k³', () => {
    partout('agrandissement-4e-2020', (item, d) => {
      const c = item.consigne;
      const k = val(c.match(/rapport (\d+(?:,\d+)?)/)![1]!);
      const depart = nombres(c.replace(/rapport \d+(?:,\d+)?/, ''))[0]!;
      expect(proche(val(item.reponse), depart * k ** d), c).toBe(true);
      expect(c.includes('réduction')).toBe(k < 1);
    });
  });
});

describe('justesse 4e français (programme 2020)', () => {
  const phraseDe = (c: string) => c.match(/« (.+?) »/)![1]!;
  const groupeDe = (c: string) => [...c.matchAll(/« (.+?) »/g)][1]![1]!;

  it('apposition : détachée par une virgule ; complément du nom introduit par une préposition ; sinon épithète', () => {
    partout('apposition-4e-2020', (item) => {
      const phrase = phraseDe(item.consigne);
      const g = groupeDe(item.consigne);
      const detache = phrase.includes(`, ${g},`) || phrase.startsWith(`${g},`) || phrase.includes(`, ${g}.`);
      const attendu = detache ? 'apposition' : /^(de|du|des|à) /.test(g) ? 'complément du nom' : 'épithète';
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('cause, conséquence, but : d’après le mot qui introduit le complément', () => {
    const IMPERATIFS = /^(Parle|Ferme)\b/;
    partout('complement-consequence-4e-2020', (item) => {
      const phrase = phraseDe(item.consigne);
      const g = groupeDe(item.consigne);
      const debut = g.toLowerCase();
      let attendu: string;
      if (/^(parce que|à cause|grâce|comme|puisque|faute|en raison|pour avoir)/.test(debut)) attendu = 'CC de cause';
      else if (/^(afin|de peur)/.test(debut)) attendu = 'CC de but';
      else if (/^(si bien que|au point)/.test(debut)) attendu = 'CC de conséquence';
      else if (debut.startsWith('de sorte qu')) attendu = IMPERATIFS.test(phrase) ? 'CC de but' : 'CC de conséquence';
      else if (/^qu(e|’)/.test(debut)) {
        expect(phrase, phrase).toMatch(/\b(si|tant|tellement)\b/);
        attendu = 'CC de conséquence';
      } else if (debut.startsWith('pour ')) attendu = /\b(assez|trop)\b/.test(phrase.split(g)[0]!) ? 'CC de conséquence' : 'CC de but';
      else throw new Error(`Complément non prévu : ${g}`);
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('démonstratifs et possessifs : un déterminant est suivi d’un nom, un pronom le remplace', () => {
    partout('pronoms-demonstratifs-possessifs-4e-2020', (item) => {
      const phrase = phraseDe(item.consigne);
      const mot = groupeDe(item.consigne);
      const m = mot.toLowerCase();
      const suivant = phrase.slice(phrase.indexOf(mot) + mot.length).trim().split(/[\s,.;]/)[0]!.toLowerCase();
      let attendu: string;
      if (m === 'leur' && (/-leur/.test(phrase) || /\bje leur\b/i.test(phrase))) attendu = 'pronom personnel';
      else if (/^(le|la|les) (mien|tien|sien|nôtre|vôtre|leur)/.test(m)) attendu = 'pronom possessif';
      else if (/^(mon|ton|son|ma|ta|sa|mes|tes|ses|notre|votre|nos|vos|leur|leurs)$/.test(m)) attendu = 'déterminant possessif';
      else if (/^(celui|celle|ceux|celles|ceci|cela|ça|c’)/.test(m)) attendu = 'pronom démonstratif';
      else if (m === 'ce') attendu = /^(qui|que|dont)$/.test(suivant) ? 'pronom démonstratif' : 'déterminant démonstratif';
      else if (/^(cet|cette|ces)$/.test(m)) attendu = 'déterminant démonstratif';
      else throw new Error(`Mot non prévu : ${mot}`);
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('degrés de l’adjectif : d’après l’adverbe et la présence de « que »', () => {
    partout('degres-adjectif-4e-2020', (item) => {
      const phrase = phraseDe(item.consigne);
      const adj = groupeDe(item.consigne);
      const avant = phrase.split(new RegExp(`(?<!\\p{L})${adj}(?!\\p{L})`, 'u'))[0]!;
      const apres = phrase.slice(avant.length + adj.length);
      let attendu: string;
      if (/\b(très|extrêmement|fort)\s*$/.test(avant)) attendu = 'superlatif absolu';
      else if (/\b(le|la|les|l’)\s*(plus|moins)?\s*$/.test(avant) && !/^\s*que\b/.test(apres)) attendu = 'superlatif relatif';
      else if (/\baussi\s*$/.test(avant)) attendu = 'comparatif d’égalité';
      else if (/\bmoins\s*$/.test(avant)) attendu = 'comparatif d’infériorité';
      else if (/\bplus\s*$/.test(avant) || /^(meilleure?|pire)$/.test(adj)) attendu = 'comparatif de supériorité';
      else throw new Error(`Phrase non prévue : ${phrase}`);
      if (attendu.startsWith('comparatif')) expect(apres, phrase).toMatch(/^\s*que\b/);
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('forme impersonnelle : une seule option où « il » ne désigne rien', () => {
    const IMPERSONNEL = [
      /^Il (pleut|neige|faut|y a|s’agit)\b/, /^Il fait (très )?(chaud|froid|beau|nuit)\b/, /^Il est (important|possible|tombé beaucoup) de?/,
      /^Il (arrive parfois|manque trois|reste un peu|se passe des|convient de)\b/,
    ];
    partout('forme-impersonnelle-4e-2020', (item) => {
      const imp = item.options!.filter((o) => IMPERSONNEL.some((r) => r.test(o)));
      expect(imp, item.options!.join(' / ')).toEqual([item.reponse]);
    });
  });

  it('sujet éloigné : présent dans la phrase, accordé avec le verbe, sans préposition en tête', () => {
    partout('sujet-eloigne-4e-2020', (item) => {
      const phrase = phraseDe(item.consigne);
      const verbe = groupeDe(item.consigne);
      const s = item.reponse;
      expect(phrase).toContain(s);
      expect(/^(de|du|à|au|sur|dans)\b/i.test(s), phrase).toBe(false);
      const pluriel = /^(les|des|ces)\b/i.test(s);
      const verbePluriel = /aient$/.test(verbe) || (/ent$/.test(verbe) && !/ient$/.test(verbe));
      expect(verbePluriel, `${phrase} : ${s}`).toBe(pluriel);
    });
  });

  it('passé du subjonctif et du conditionnel : d’après l’auxiliaire', () => {
    const AUX: [RegExp, string][] = [
      [/^(aie|aies|ait|ayons|ayez|aient|sois|soit|soyons|soyez|soient)$/, 'subjonctif passé'],
      [/^(aurais|aurait|aurions|auriez|auraient|serais|serait|serions|seriez|seraient)$/, 'conditionnel passé'],
      [/^(ai|as|a|avons|avez|ont|suis|es|est|sommes|êtes|sont)$/, 'passé composé'],
      [/^(avais|avait|avions|aviez|avaient|étais|était|étions|étiez|étaient)$/, 'plus-que-parfait'],
    ];
    partout('subjonctif-conditionnel-passes-4e-2020', (item) => {
      const forme = groupeDe(item.consigne).replace(/^se /, '');
      const mots = forme.split(' ');
      const attendu = mots.length === 1
        ? (/(rais|rait|rions|riez|raient)$/.test(forme) ? 'conditionnel présent' : 'subjonctif présent')
        : AUX.find(([r]) => r.test(mots[0]!))![1];
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('participe passé avec avoir : accord avec le COD placé avant, en genre et en nombre', () => {
    const FEMININS = /\b(fleurs|lettre|photos|veste|Marie|filles|amies|sœur|Léa|chaussures|pommes|histoires|robe|fautes)\b/;
    partout('accord-participe-avoir-4e-2020', (item) => {
      const phrase = item.consigne.split(' : ')[1]!;
      const avant = phrase.split('…')[0]!;
      const base = item.options!.reduce((x, y) => (y.length < x.length ? y : x));
      const interrogatif = /^(Quelles?|Combien de)\b/.test(phrase);
      const pronomCod = /(\bles |\bvous |\bnous |l’|t’)(ai|as|a|avons|avez|ont)\s*$/.test(avant.trim());
      const coi = /\b(leur|lui|m’)\s*(ai|as|a|ont)\s*$/.test(avant.trim());
      if (coi || (!pronomCod && !interrogatif)) expect(item.reponse, phrase).toBe(base);
      else {
        const pluriel = /\b(les|vous|nous)\b/.test(avant) || /^(Quelles|Combien)/.test(phrase);
        const feminin = FEMININS.test(phrase);
        expect(item.reponse, phrase).toBe(base + (feminin ? 'e' : '') + (pluriel ? 's' : ''));
      }
    });
  });

  it('dérivation : classe d’après le suffixe ; orthographe des noms ; adverbes en -amment, -emment', () => {
    const NOMS_CORRECTS = ['longueur', 'douceur', 'fraicheur', 'franchise', 'gentillesse', 'sècheresse', 'fausseté', 'bonté', 'fierté', 'blancheur'];
    partout('derivation-4e-2020', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const mot = c.match(/« (.+?) »/)![1]!;
        const classe = /ment$/.test(mot) ? 'adverbe' : /(age|eur|té)$/.test(mot) ? 'nom' : /(ir|er)$/.test(mot) && !/ier$/.test(mot) ? 'verbe' : 'adjectif';
        expect(item.reponse, c).toBe(classe);
      } else if (d === 2) {
        expect(NOMS_CORRECTS).toContain(item.reponse);
        expect(item.options!.filter((o) => NOMS_CORRECTS.includes(o))).toEqual([item.reponse]);
      } else {
        const adj = c.match(/« (.+?) »/)![1]!;
        const EXCEPTIONS: Record<string, string> = { gentil: 'gentiment' };
        const attendu = EXCEPTIONS[adj] ?? (adj.endsWith('ant') ? `${adj.slice(0, -3)}amment` : adj.endsWith('ent') ? `${adj.slice(0, -3)}emment` : /[aeiouy]$/.test(adj) ? `${adj}ment` : `${adj}ement`);
        expect(item.reponse, c).toBe(attendu);
      }
    });
  });
});

describe('variété 4e (programme 2020)', () => {
  const FERMES: Record<string, number> = {
    'puissances-dix-4e-2020': 14, 'apposition-4e-2020': 8, 'complement-consequence-4e-2020': 8,
    'pronoms-demonstratifs-possessifs-4e-2020': 8, 'degres-adjectif-4e-2020': 7, 'forme-impersonnelle-4e-2020': 25,
    'sujet-eloigne-4e-2020': 6, 'subjonctif-conditionnel-passes-4e-2020': 7, 'accord-participe-avoir-4e-2020': 8,
    'derivation-4e-2020': 10,
  };
  const reprises = new Set(REPRISES.map(([id]) => id));
  const nouveaux = [...GENERATEURS_QUATRIEME_2020_MATHS, ...GENERATEURS_QUATRIEME_2020_FRANCAIS].map((g) => g.id).filter((id) => !reprises.has(id));
  it('chaque générateur 2020 de 4e est soit repris, soit vérifié ici', () => expect(nouveaux.length + reprises.size).toBe(39));
  it.each(nouveaux)('%s : assez de consignes distinctes, d1 différente de d3', (id) => {
    // Consigne et options : certaines consignes sont fixes, les phrases proposées varient.
    const cle = (it: { consigne: string; options?: string[] }) => `${it.consigne}#${[...(it.options ?? [])].sort().join('|')}`;
    const consignes = DIFFICULTES.map((d) => new Set(GRAINES.map((s) => cle(generateur(id).generer(s, d)))));
    for (const ens of consignes) expect(ens.size).toBeGreaterThanOrEqual(FERMES[id] ?? 25);
    expect([...consignes[0]!].some((x) => !consignes[2]!.has(x))).toBe(true);
  });
});
