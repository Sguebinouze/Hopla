// Justesse des générateurs de 3e du programme 2020. Reprises : mêmes items que le générateur repris (dont la justesse
// est prouvée dans son propre fichier de test), à l'identifiant et à la compétence près. Nouveaux générateurs : chaque
// oracle recalcule la réponse depuis la consigne, avec ses propres règles ou des tables ressaisies ici.
import { describe, expect, it } from 'vitest';
import { generateur } from './index';
import { DIFFICULTES, GRAINES, partout, proche, val } from './oracles';
import { GENERATEURS_TROISIEME_2020_FRANCAIS } from './troisieme-2020-francais';
import { GENERATEURS_TROISIEME_2020_MATHS } from './troisieme-2020-maths';

const nombres = (s: string) => [...s.replace(/(\d)[\s  ](?=\d{3}\b)/g, '$1').matchAll(/−?\d+(?:,\d+)?/g)].map((m) => val(m[0]));

const REPRISES: [string, string][] = [
  ['fraction-irreductible-3e-2020', 'fraction-irreductible-3e'], ['puissances-negatives-3e-2020', 'puissances-negatives-3e'],
  ['operations-puissances-3e-2020', 'operations-puissances-3e'], ['double-distributivite-3e-2020', 'double-distributivite-3e'],
  ['equation-produit-nul-3e-2020', 'equation-produit-nul-3e'], ['equation-carre-3e-2020', 'equation-carre-3e'],
  ['coefficient-multiplicateur-3e-2020', 'coefficient-multiplicateur-4e'], ['image-antecedent-3e-2020', 'image-antecedent-3e'],
  ['fonctions-lineaires-3e-2020', 'fonctions-lineaires-3e'], ['fonctions-affines-3e-2020', 'fonctions-affines-3e'],
  ['volume-boule-3e-2020', 'volume-boule-3e'], ['sections-solides-3e-2020', 'sections-solides-3e'], ['thales-3e-2020', 'thales-3e'],
  ['trigonometrie-3e-2020', 'trigonometrie-3e'],
  ['pronom-relatif-3e-2020', 'pronom-relatif-3e'], ['fonctions-subordonnees-3e-2020', 'fonctions-subordonnees-4e'],
  ['accord-participe-cod-relatif-3e-2020', 'accord-participe-cod-relatif-3e'], ['accord-adjectif-apposition-3e-2020', 'accord-adjectif-fonctions-3e'],
  ['accord-sujets-complexes-3e-2020', 'accord-sujets-complexes-3e'], ['subjonctif-passe-3e-2020', 'subjonctif-passe-3e'],
  ['radicaux-verbaux-3e-2020', 'radicaux-verbaux-3e'], ['discours-indirect-libre-3e-2020', 'discours-indirect-libre-3e'],
  ['connecteurs-logiques-3e-2020', 'connecteurs-logiques-3e'], ['racines-savantes-3e-2020', 'racines-savantes-3e'],
  ['denotation-connotation-3e-2020', 'denotation-connotation-3e'],
];

describe('reprises 3e (programme 2020) : mêmes items que le générateur repris', () => {
  it.each(REPRISES)('%s reprend %s', (id, source) => {
    const g = generateur(id);
    expect(g.competences[0]).toMatch(/^(MA|FR)-C4-3E-[A-Z]+-5\d$/);
    for (const d of DIFFICULTES) for (const s of GRAINES) {
      const { id: _i, competence, ...reste } = g.generer(s, d);
      const { id: _j, competence: _c, ...attendu } = generateur(source).generer(s, d);
      expect(competence).toBe(g.competences[0]);
      expect(reste).toEqual(attendu);
    }
  });
});

describe('justesse 3e mathématiques (programme 2020)', () => {
  it('a² − b² : la factorisation redonne l’expression ; les solutions annulent l’expression', () => {
    const coefficients = (c: string) => {
      const m = c.match(/: (\d*)x² − (\d+)/)!;
      return [m[1] ? Number(m[1]) : 1, Number(m[2])] as const;
    };
    partout('difference-carres-3e-2020', (item, d) => {
      const [k2, c] = coefficients(item.consigne);
      if (d < 3) {
        const m = item.reponse.match(/^\((\d*)x − (\d+)\)\((\d*)x \+ (\d+)\)$/)!;
        const [p, q] = [m[1] ? Number(m[1]) : 1, Number(m[2])];
        for (const x of [2, 3, 7]) expect((p * x - q) * (p * x + q), item.consigne).toBe(k2 * x * x - c);
      } else {
        const sols = [...item.reponse.matchAll(/x = (−?[\d/]+)/g)].map((m) => val(m[1]!));
        expect(sols.length).toBe(2);
        for (const x of sols) expect(proche(k2 * x * x, c), item.consigne).toBe(true);
      }
    });
  });

  it('étendue : plus grande moins plus petite valeur', () => {
    const etendue = (v: number[]) => Math.max(...v) - Math.min(...v);
    partout('etendue-3e-2020', (item, d) => {
      const c = item.consigne;
      if (d === 1) expect(Number(item.reponse)).toBe(etendue(nombres(c.split(' : ')[1]!.split('. Calcule')[0]!)));
      else if (d === 2) {
        const [eA, eB] = [etendue(nombres(c.split('Série A : ')[1]!.split('.')[0]!)), etendue(nombres(c.split('Série B : ')[1]!.split('.')[0]!))];
        expect(item.reponse, c).toBe(eA > eB ? 'la série A' : eA < eB ? 'la série B' : 'les deux séries ont la même étendue');
      } else {
        const liste = c.split(' : ')[1]!.split('. L’étendue')[0]!.split(' ; ');
        const x = Number(item.reponse);
        const serie = liste.map((t) => (t === 'x' ? x : Number(t)));
        const e = nombres(c.split('étendue de la série est ')[1]!)[0]!;
        expect(etendue(serie), c).toBe(e);
        expect(c.includes('plus grande') ? x === Math.max(...serie) : x === Math.min(...serie)).toBe(true);
      }
    });
  });

  it('deux épreuves : dénombrement par tableau à double entrée', () => {
    const premier = (n: number) => n > 1 && [...Array(n).keys()].slice(2).every((k) => n % k !== 0);
    const evenementNombre = (lib: string): ((x: number) => boolean) => {
      if (lib.startsWith('un nombre pair')) return (x) => x % 2 === 0;
      if (lib.startsWith('un multiple de')) { const k = nombres(lib)[0]!; return (x) => x % k === 0; }
      if (lib.startsWith('un nombre premier')) return premier;
      if (lib.startsWith('un nombre supérieur ou égal à')) { const k = nombres(lib)[0]!; return (x) => x >= k; }
      throw new Error(lib);
    };
    partout('deux-epreuves-3e-2020', (item, d) => {
      const c = item.consigne;
      const lib = c.match(/(?:tirer|obtenir) (.+) \?$/)![1]!;
      let fav = 0;
      let total = 0;
      if (d === 1) {
        const n = nombres(c)[0]!;
        const t = evenementNombre(lib);
        for (let x = 1; x <= n; x++) { total++; if (t(x)) fav++; }
      } else {
        const [m, n] = c.includes('pièce') ? [2, nombres(c.split('dé')[1]!)[0]!] : c.includes('deux dés') ? [6, 6] : [nombres(c)[0]!, nombres(c.split('seconde roue')[1]!)[0]!];
        let t: (x: number, y: number) => boolean;
        if (c.includes('pièce')) {
          const cote = lib.startsWith('pile') ? 1 : 2;
          const e = evenementNombre(lib.replace(/^(pile|face) et /, ''));
          t = (x, y) => x === cote && e(y);
        } else if (lib.startsWith('une somme égale à')) { const s = nombres(lib)[0]!; t = (x, y) => x + y === s; }
        else if (lib.startsWith('une somme supérieure ou égale à')) { const s = nombres(lib)[0]!; t = (x, y) => x + y >= s; }
        else if (lib === 'un double' || lib === 'deux nombres égaux') t = (x, y) => x === y;
        else if (lib === 'un produit pair') t = (x, y) => (x * y) % 2 === 0;
        else if (lib.startsWith('un produit égal à')) { const p = nombres(lib)[0]!; t = (x, y) => x * y === p; }
        else throw new Error(lib);
        for (let x = 1; x <= m; x++) for (let y = 1; y <= n; y++) { total++; if (t(x, y)) fav++; }
      }
      expect(fav).toBeGreaterThan(0);
      expect(proche(val(item.reponse), fav / total), `${c} ${fav}/${total}`).toBe(true);
    });
  });

  it('triangles semblables : mêmes angles, côtés proportionnels, longueur correspondante', () => {
    partout('triangles-semblables-3e-2020', (item, d) => {
      const c = item.consigne;
      if (d === 1) {
        const [x, y, p, q] = nombres(c);
        const tri = (t: number[]) => t.sort((u, v) => u - v).join(',');
        const memes = tri([x!, y!, 180 - x! - y!]) === tri([p!, q!, 180 - p! - q!]);
        expect(item.reponse.startsWith(memes ? 'Oui' : 'Non'), c).toBe(true);
      } else if (d === 2) {
        const v = nombres(c);
        const [A, D] = [v.slice(0, 3).sort((u, w) => u - w), v.slice(3, 6).sort((u, w) => u - w)];
        const prop = D.every((x, i) => proche(x / A[i]!, D[0]! / A[0]!));
        expect(item.reponse.startsWith(prop ? 'Oui' : 'Non'), c).toBe(true);
      } else {
        const [ab, bc, de] = nombres(c.split(' : ')[1]!.replace(/A correspond.*?F\. /, ''));
        expect(proche(val(item.reponse), (bc! * de!) / ab!), c).toBe(true);
      }
    });
  });

  it('homothéties et rotations : longueurs × |k|, aires × k², signe du rapport', () => {
    partout('homotheties-rotations-3e-2020', (item, d) => {
      const c = item.consigne;
      const r = val(item.reponse);
      if (c.includes('rotation')) expect(r).toBe(nombres(c.split('segment de ')[1]!)[0]);
      else if (d === 1) expect(proche(r, Math.abs(val(c.match(/rapport (−?\d+(?:,\d+)?)/)![1]!)) * nombres(c.split('segment de ')[1]!)[0]!), c).toBe(true);
      else if (d === 2) {
        const k = val(c.match(/rapport (−?\d+(?:,\d+)?)/)![1]!);
        expect(proche(r, nombres(c)[0]! * k * k), c).toBe(true);
      } else {
        const [oa, oa2] = nombres(c.split('OA = ')[1]!);
        const signe = c.includes('même côté') ? 1 : -1;
        expect(proche(r, (signe * oa2!) / oa!), c).toBe(true);
      }
    });
  });
});

describe('justesse 3e français (programme 2020)', () => {
  const phraseDe = (c: string) => c.match(/« (.+?) »/)![1]!;
  const groupeDe = (c: string) => [...c.matchAll(/« (.+?) »/g)][1]![1]!;

  it('pronoms : en et y adverbiaux, indéfinis, interrogatifs dans une question, relatifs après un antécédent', () => {
    const INDEFINIS = /^(quelqu’un|personne|chacun|rien|plusieurs|tout|certains)$/i;
    partout('pronoms-indefinis-interrogatifs-3e-2020', (item) => {
      const phrase = phraseDe(item.consigne);
      const p = groupeDe(item.consigne);
      const avant = phrase.slice(0, phrase.indexOf(` ${p} `) >= 0 ? phrase.indexOf(` ${p} `) : 0);
      let attendu: string;
      if (/^(en|y)$/.test(p)) attendu = 'pronom adverbial';
      else if (INDEFINIS.test(p)) attendu = 'pronom indéfini';
      else if (phrase.startsWith(p) || /^À$/.test(avant) || /(sais pas|demande)$/.test(avant)) attendu = 'pronom interrogatif';
      else attendu = 'pronom relatif';
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('infinitives et participiales : sujet propre, infinitif ou participe ; relatives et conjonctives', () => {
    partout('infinitives-participiales-3e-2020', (item) => {
      const phrase = phraseDe(item.consigne);
      const sub = groupeDe(item.consigne);
      const avant = phrase.slice(0, phrase.indexOf(sub)).trim().split(' ').at(-1) ?? '';
      let attendu: string;
      if (sub.startsWith('qui ')) attendu = 'subordonnée relative';
      else if (sub.startsWith('que ')) attendu = /^(vois|sais|crois|pense)$/.test(avant) ? 'subordonnée conjonctive' : 'subordonnée relative';
      else if (phrase.startsWith(`${sub},`)) {
        expect(sub, sub).toMatch(/(é|ée|és|ées|i|ie|is|ies|ant|parti)$/);
        attendu = 'subordonnée participiale';
      } else {
        expect(sub.split(' ').some((m) => /(er|ir|re)$/.test(m)), sub).toBe(true);
        attendu = 'subordonnée infinitive';
      }
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('attribut du COD : d’après le verbe et la place du groupe', () => {
    const ETAT = /\b(est|semble|parait|reste|est devenu)\b/;
    partout('attribut-cod-3e-2020', (item) => {
      const phrase = phraseDe(item.consigne);
      const g = groupeDe(item.consigne);
      const avant = phrase.slice(0, phrase.indexOf(g)).trim();
      let attendu: string;
      if (/\b(un|une) \S+$/.test(avant)) attendu = 'épithète';
      else if (/^(la|le|les) /.test(g)) attendu = 'COD';
      else if (ETAT.test(avant) && !avant.split(' ').some((t) => ['a', 'ont', 'l’a'].includes(t))) attendu = 'attribut du sujet';
      else attendu = 'attribut du COD';
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('compléments circonstanciels : d’après le mot qui les introduit', () => {
    const TABLE: [RegExp, string][] = [
      [/^(demain|quand|dès que)/, 'CC de temps'], [/^(dans|au fond)/, 'CC de lieu'], [/^(avec prudence|sans bruit)/, 'CC de manière'],
      [/^(en train|avec un|à l’aide)/, 'CC de moyen'], [/^(à cause|puisqu|faute)/, 'CC de cause'], [/^qu/, 'CC de conséquence'],
      [/^(pour|afin)/, 'CC de but'], [/^(malgré|bien qu|alors que)/, 'CC d’opposition'], [/^(si |en cas|à condition)/, 'CC de condition'],
      [/^(comme|ainsi que|tel)/, 'CC de comparaison'],
    ];
    partout('complements-circonstanciels-3e-2020', (item) => {
      const phrase = phraseDe(item.consigne);
      const g = groupeDe(item.consigne).toLowerCase();
      const attendu = TABLE.find(([r]) => r.test(g))?.[1];
      if (attendu === 'CC de conséquence') expect(phrase).toMatch(/\b(si|tant|tellement)\b/);
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('subjonctif imparfait et plus-que-parfait : accent circonflexe, -ss-, auxiliaire', () => {
    partout('subjonctif-imparfait-3e-2020', (item) => {
      const phrase = phraseDe(item.consigne);
      const mots = groupeDe(item.consigne).split(' ');
      const subordonnee = new RegExp(`qu(e|’)\\S* ?(ne )?${mots[0]}`).test(phrase) || new RegExp(`qu’(il|elle|on)( le)? ${mots[0]}`).test(phrase);
      let attendu: string;
      if (mots.length === 2) {
        if (/^(eût|fût)$/.test(mots[0]!)) attendu = 'subjonctif plus-que-parfait';
        else if (/^(ait|soit)$/.test(mots[0]!)) attendu = 'subjonctif passé';
        else attendu = 'plus-que-parfait de l’indicatif';
      } else if (/[îûâ]n?t$|ss(e|es|ions|iez|ent)$/.test(mots[0]!)) attendu = 'subjonctif imparfait';
      else attendu = subordonnee ? 'subjonctif présent' : 'passé simple';
      expect(item.reponse, item.consigne).toBe(attendu);
    });
  });

  it('mode après une conjonction : subjonctif ou indicatif selon la conjonction', () => {
    const SUBJ = /(^|\s)(bien qu|pour que|avant qu|à condition que|de crainte qu|sans que|afin que|quoiqu)/i;
    const FORMES_SUBJ = new Set(['fasse', 'comprennes', 'vienne', 'dormes', 'sois', 'voie', 'sachions', 'dorme', 'finisse', 'arriviez', 'soit', 'soyons', 'lises', 'lise']);
    partout('mode-apres-conjonction-3e-2020', (item) => {
      const phrase = item.consigne.split(' : ')[1]!;
      expect(item.options!.filter((o) => FORMES_SUBJ.has(o)).length, phrase).toBe(1);
      expect(FORMES_SUBJ.has(item.reponse), phrase).toBe(SUBJ.test(phrase));
    });
  });

  it('falloir et valoir : formes ressaisies', () => {
    const F: Record<string, string> = { présent: 'faut', imparfait: 'fallait', futur: 'faudra', 'conditionnel présent': 'faudrait', 'passé simple': 'fallut', 'participe passé': 'fallu', 'subjonctif présent': 'faille' };
    const V: Record<string, string> = { imparfait: 'valait', futur: 'vaudra', 'conditionnel présent': 'vaudrait', 'participe passé': 'valu', 'subjonctif présent': 'vaille' };
    partout('falloir-valoir-3e-2020', (item) => {
      const c = item.consigne;
      const verbe = c.match(/« (\w+) »/)![1]!;
      const temps = c.match(/» (?:au |à l’)(.+?) :/)![1]!;
      const phrase = c.split(' : ')[1]!;
      let attendu: string;
      if (verbe === 'falloir') attendu = F[temps]!;
      else if (temps === 'présent') attendu = /^Je\b/.test(phrase) ? 'vaux' : /^Ces\b/.test(phrase) ? 'valent' : 'vaut';
      else attendu = V[temps]!;
      expect(item.reponse, c).toBe(attendu);
    });
  });

  it('modalisation : lexique ressaisi', () => {
    const LEXIQUE: Record<string, string> = {
      'sans doute': 'un doute ou une probabilité', 'Peut-être': 'un doute ou une probabilité', 'Il semble que': 'un doute ou une probabilité',
      Probablement: 'un doute ou une probabilité', possible: 'un doute ou une probabilité',
      certain: 'une certitude', 'Évidemment': 'une certitude', 'sûr': 'une certitude', 'Sans aucun doute': 'une certitude', 'Indéniablement': 'une certitude',
      Heureusement: 'un jugement favorable', magnifique: 'un jugement favorable', 'délicieux': 'un jugement favorable', remarquable: 'un jugement favorable',
      Malheureusement: 'un jugement défavorable', 'prétendu': 'un jugement défavorable', 'médiocre': 'un jugement défavorable', 'soi-disant': 'un jugement défavorable',
      'démissionnerait': 'une information non confirmée', 'aurait fui': 'une information non confirmée', 'se rendrait': 'une information non confirmée',
    };
    partout('modalisation-3e-2020', (item) => {
      expect(item.reponse, item.consigne).toBe(LEXIQUE[groupeDe(item.consigne)]);
    });
  });
});

describe('variété 3e (programme 2020)', () => {
  const FERMES: Record<string, number> = {
    'difference-carres-3e-2020': 11, 'triangles-semblables-3e-2020': 25, 'pronoms-indefinis-interrogatifs-3e-2020': 8, 'infinitives-participiales-3e-2020': 6,
    'attribut-cod-3e-2020': 7, 'complements-circonstanciels-3e-2020': 8, 'subjonctif-imparfait-3e-2020': 6,
    'mode-apres-conjonction-3e-2020': 8, 'falloir-valoir-3e-2020': 7, 'modalisation-3e-2020': 7,
  };
  const reprises = new Set(REPRISES.map(([id]) => id));
  const nouveaux = [...GENERATEURS_TROISIEME_2020_MATHS, ...GENERATEURS_TROISIEME_2020_FRANCAIS].map((g) => g.id).filter((id) => !reprises.has(id));
  it('chaque générateur 2020 de 3e est soit repris, soit vérifié ici', () => expect(nouveaux.length + reprises.size).toBe(38));
  it.each(nouveaux)('%s : assez d’items distincts, d1 différente de d3', (id) => {
    const cle = (it: { consigne: string; options?: string[] }) => `${it.consigne}#${[...(it.options ?? [])].sort().join('|')}`;
    const ensembles = DIFFICULTES.map((d) => new Set(GRAINES.map((s) => cle(generateur(id).generer(s, d)))));
    for (const ens of ensembles) expect(ens.size).toBeGreaterThanOrEqual(FERMES[id] ?? 25);
    expect([...ensembles[0]!].some((x) => !ensembles[2]!.has(x))).toBe(true);
  });
});
