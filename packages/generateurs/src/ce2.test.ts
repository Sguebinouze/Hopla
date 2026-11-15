// Justesse des générateurs du CE2 : chaque oracle recalcule la réponse à partir de la consigne,
// sans réutiliser la logique ni les listes des générateurs.
import { describe, expect, it } from 'vitest';
import { GENERATEURS_CE2 } from './ce2';
import { enLettres, serie } from './index';
import { DIFFICULTES, GRAINES, calculJuste, egaliteVraie, partout, proche, val } from './oracles';

/** Nombres d'un texte écrit à la française (« 4 635 » compte pour un seul nombre). */
const nombres = (texte: string): number[] =>
  (texte.match(/\d{1,3}(?:[\s  ]\d{3})+|\d+/g) ?? []).map((n) => Number(n.replace(/[\s  ]/g, '')));
const fraction = (f: string) => {
  const [p, q] = f.split('/').map(Number);
  return { p: p!, q: q!, v: p! / q! };
};
const fractionsDe = (texte: string) => (texte.match(/\d+\/\d+/g) ?? []).map(fraction);

// ───────────────────────── Mathématiques

describe('justesse CE2 mathématiques : nombres', () => {
  it('unités de numération : milliers, centaines, dizaines, unités', () => {
    const valeurs: Record<string, number> = { millier: 1000, centaine: 100, dizaine: 10, unité: 1 };
    partout('nombres-unites-ce2', (item) => {
      const c = item.consigne;
      const enTout = c.match(/de (dizaines|centaines) en tout dans (.+) \?/);
      if (enTout) {
        const n = nombres(enTout[2]!)[0]!;
        expect(Number(item.reponse)).toBe(Math.floor(n / (enTout[1] === 'dizaines' ? 10 : 100)));
      } else {
        let total = 0;
        for (const m of c.matchAll(/(\d+) (millier|centaine|dizaine|unité)s?/g)) total += Number(m[1]) * valeurs[m[2]!]!;
        expect(Number(item.reponse), c).toBe(total);
      }
      expect(Number(item.reponse)).toBeLessThanOrEqual(10000);
    });
  });

  it('écriture en lettres : chiffres et lettres concordent', () => {
    partout('nombres-lettres-ce2', (item) => {
      const c = item.consigne;
      if (item.gabarit === 'saisie') expect(enLettres(Number(item.reponse))).toBe(c.match(/: (.+)\.$/)![1]);
      else expect(item.reponse).toBe(enLettres(nombres(c)[0]!));
      const n = item.gabarit === 'saisie' ? Number(item.reponse) : nombres(c)[0]!;
      expect(n).toBeGreaterThanOrEqual(1000);
      expect(n).toBeLessThanOrEqual(10000);
    });
  });

  it('comparer, compléter une suite, encadrer', () => {
    partout('nombres-comparer-ce2', (item) => {
      const c = item.consigne;
      if (c.startsWith('Complète la suite')) {
        const [x, y, z] = nombres(c);
        expect(y! - x!).toBe(z! - y!);
        expect(Number(item.reponse)).toBe(z! + (z! - y!));
        return;
      }
      const valeurs = item.options!.map(val);
      if (c.includes('plus grand')) expect(val(item.reponse)).toBe(Math.max(...valeurs));
      else if (c.includes('plus petit')) expect(val(item.reponse)).toBe(Math.min(...valeurs));
      else {
        const [bas, haut] = nombres(c);
        expect(valeurs.filter((v) => v > bas! && v < haut!)).toEqual([val(item.reponse)]);
      }
      for (const v of valeurs) expect(v).toBeLessThanOrEqual(10000);
    });
  });
});

describe('justesse CE2 mathématiques : fractions', () => {
  const duProgramme = (f: { p: number; q: number }) => {
    expect(f.q).toBeLessThanOrEqual(12);
    expect(f.p).toBeLessThanOrEqual(f.q);
  };

  it('égalités de fractions', () => {
    partout('fractions-egales-ce2', (item) => {
      if (item.gabarit === 'saisie') egaliteVraie(item);
      else {
        const cible = fractionsDe(item.consigne)[0]!;
        const egales = item.options!.filter((o) => proche(fraction(o).v, cible.v));
        expect(egales).toEqual([item.reponse]);
        expect(item.reponse).not.toBe(`${cible.p}/${cible.q}`);
        item.options!.forEach((o) => duProgramme(fraction(o)));
      }
    });
  });

  it('comparer deux fractions', () => {
    partout('fractions-comparer-ce2', (item, d) => {
      const [g, dr] = fractionsDe(item.consigne);
      const attendu = proche(g!.v, dr!.v) ? '=' : g!.v < dr!.v ? '<' : '>';
      expect(item.reponse, item.consigne).toBe(attendu);
      [g!, dr!].forEach(duProgramme);
      expect(g!.v).toBeLessThanOrEqual(1);
      if (d === 1) expect(g!.q).toBe(dr!.q);
      if (d === 2) expect(g!.p).toBe(dr!.p);
      if (d === 3) expect(Math.max(g!.q, dr!.q) % Math.min(g!.q, dr!.q)).toBe(0);
    });
  });

  it('additionner, soustraire, problème du gâteau', () => {
    partout('fractions-additionner-ce2', (item) => {
      if (item.consigne.startsWith('Calcule')) calculJuste(item);
      else {
        const parts = fractionsDe(item.consigne);
        expect(proche(val(item.reponse), 1 - parts.reduce((s, f) => s + f.v, 0)), item.consigne).toBe(true);
      }
      expect(val(item.reponse)).toBeGreaterThan(0);
      expect(val(item.reponse)).toBeLessThanOrEqual(1);
      duProgramme(fraction(item.reponse));
    });
  });
});

describe('justesse CE2 mathématiques : calcul', () => {
  it('tables d’addition : égalités à trou vraies, termes de 1 à 10', () => {
    partout('tables-addition-ce2', (item) => {
      egaliteVraie(item);
      const termes = item.consigne.replace('Complète : ', '').replace('…', item.reponse).match(/\d+/g)!.map(Number);
      const somme = Math.max(...termes);
      expect(somme).toBeLessThanOrEqual(20);
      for (const t of termes.filter((x) => x !== somme)) expect(t).toBeGreaterThanOrEqual(1);
    });
  });

  it('faits multiplicatifs : égalités à trou', () => {
    partout('faits-multiplicatifs-ce2', (item) => {
      egaliteVraie(item);
      expect(Number(item.reponse)).toBeLessThanOrEqual(10000);
    });
  });

  it('multiplier par 10 ou par 100', () => {
    partout('numeration-calcul-ce2', (item) => {
      if (item.consigne.startsWith('Calcule')) calculJuste(item);
      else egaliteVraie(item);
      expect(Number(item.reponse)).toBeLessThanOrEqual(10000);
    });
  });

  it('procédures de calcul mental', () => {
    partout('procedures-ce2', (item) => {
      calculJuste(item);
      expect(Number(item.reponse)).toBeLessThanOrEqual(10000);
      expect(Number(item.reponse)).toBeGreaterThanOrEqual(0);
    });
  });

  it('additions, soustractions, somme et différence', () => {
    partout('operations-posees-ce2', (item) => {
      const c = item.consigne;
      const [x, y] = nombres(c);
      if (c.startsWith('Calcule')) calculJuste(item);
      else if (c.includes('somme')) expect(Number(item.reponse)).toBe(x! + y!);
      else expect(Number(item.reponse)).toBe(x! - y!);
      for (const n of [...nombres(c), Number(item.reponse)]) expect(n).toBeLessThanOrEqual(10000);
      expect(Number(item.reponse)).toBeGreaterThan(0);
    });
  });

  it('multiplication posée et produit', () => {
    partout('multiplication-posee-ce2', (item) => {
      const [x, y] = nombres(item.consigne);
      expect(Number(item.reponse)).toBe(x! * y!);
      expect(Number(item.reponse)).toBeLessThanOrEqual(10000);
      // Un facteur à 2 ou 3 chiffres, l'autre à 1 ou 2 chiffres.
      expect(Math.max(x!, y!)).toBeLessThan(1000);
      expect(Math.min(x!, y!)).toBeLessThan(100);
    });
  });

  it('division : quotient exact', () => {
    partout('division-ce2', (item) => {
      const [p, q] = item.consigne.match(/(\d+) ÷ (\d+)/)!.slice(1).map(Number);
      expect(Number(item.reponse) * q!).toBe(p);
    });
  });
});

describe('justesse CE2 mathématiques : problèmes', () => {
  it('problèmes additifs en une étape', () => {
    partout('problemes-additifs-ce2', (item) => {
      const c = item.consigne;
      const [x, y] = nombres(c);
      const r = Number(item.reponse);
      if (c.includes('arrivent')) expect(r).toBe(x! + y!);
      else if (c.includes('autres pays') || c.includes('livre')) expect(r).toBe(x! - y!);
      else if (c.includes('jeux')) expect(r).toBe(x! - y!);
      else if (/Elle a [\d\s]+ points de plus/.test(c)) expect(r).toBe(x! - y!);
      else if (c.includes('de moins que') || c.includes('de plus que')) expect(r).toBe(x! + y!);
      else throw new Error(`énoncé inconnu : ${c}`);
      expect(r).toBeGreaterThan(0);
      expect(Math.max(x!, y!)).toBeGreaterThan(100);
    });
  });

  it('problèmes en deux étapes', () => {
    partout('problemes-deux-etapes-ce2', (item) => {
      const c = item.consigne;
      const n = nombres(c);
      const r = Number(item.reponse);
      if (c.includes('médiathèque')) expect(r).toBe(n[0]! + n[1]! - n[2]!);
      else if (c.includes('de plus que')) expect(r).toBe(n[0]! + (n[0]! + n[1]!));
      else if (c.includes('de moins que')) expect(r).toBe(n[0]! + (n[0]! - n[1]!));
      else if (c.includes('litre')) expect(r).toBe(n[2]! - n[0]! * n[1]!);
      else if (c.includes('restaurant')) expect(r).toBe(n[0]! * n[1]! + n[2]! * n[3]!);
      else if (c.includes('autant')) expect(r).toBe(n[2]! * (n[0]! + n[1]!));
      else throw new Error(`énoncé inconnu : ${c}`);
      expect(r).toBeGreaterThan(0);
    });
  });

  it('problèmes multiplicatifs et produits cartésiens', () => {
    partout('problemes-multiplicatifs-ce2', (item) => {
      const c = item.consigne;
      const [x, y] = nombres(c);
      const r = Number(item.reponse);
      if (c.includes('Combien de crayons')) expect(r).toBe(x! * y!);
      else if (c.includes('prix d’un')) expect(r * x!).toBe(y);
      else if (c.includes('Combien de boites')) expect(r * y!).toBe(x);
      else if (c.includes('façons')) expect(r).toBe(x! * y!);
      else throw new Error(`énoncé inconnu : ${c}`);
    });
  });

  it('« fois plus », « fois moins », « de plus »', () => {
    partout('problemes-fois-plus-ce2', (item) => {
      const c = item.consigne;
      const r = Number(item.reponse);
      const n = nombres(c);
      if (c.includes('fois plus')) expect(r).toBe(n[0]! * n[1]!);
      else if (c.includes('fois moins')) expect(r * n[1]!).toBe(n[0]);
      else if (c.includes('de plus')) expect(r).toBe(n[0]! + n[1]!);
      else throw new Error(`énoncé inconnu : ${c}`);
    });
  });
});

describe('justesse CE2 mathématiques : grandeurs et solides', () => {
  // Chaque unité exprimée dans la plus petite unité de sa grandeur.
  const UNITES: Record<string, [string, number]> = {
    km: ['longueur', 1000000], m: ['longueur', 1000], dm: ['longueur', 100], cm: ['longueur', 10], mm: ['longueur', 1],
    t: ['masse', 1000000], kg: ['masse', 1000], g: ['masse', 1],
    L: ['contenance', 100], dL: ['contenance', 10], cL: ['contenance', 1],
  };
  const conversion = (item: { consigne: string; reponse: string }) => {
    const [gauche, droite] = item.consigne.replace(/^Complète : /, '').split(' = ');
    const cible = droite!.match(/… (\w+)$/)![1]!;
    let total = 0;
    const grandeurs = new Set<string>();
    for (const m of gauche!.matchAll(/(\d{1,3}(?:[\s  ]\d{3})*|\d+) (\w+)/g)) {
      const [grandeur, facteur] = UNITES[m[2]!]!;
      grandeurs.add(grandeur);
      total += Number(m[1]!.replace(/[\s  ]/g, '')) * facteur;
    }
    grandeurs.add(UNITES[cible]![0]);
    expect(grandeurs.size, item.consigne).toBe(1);
    expect(Number(item.reponse), item.consigne).toBe(total / UNITES[cible]![1]);
    expect(Number.isInteger(Number(item.reponse))).toBe(true);
    expect(Number(item.reponse)).toBeLessThanOrEqual(10000);
  };

  it('longueurs', () => partout('longueurs-ce2', conversion));
  it('masses et contenances', () => partout('masses-contenances-ce2', conversion));

  it('monnaie : écriture à virgule, additions, rendre la monnaie', () => {
    const centimes = (s: string) => {
      const m = s.match(/(\d+),(\d\d) €/);
      return m ? Number(m[1]) * 100 + Number(m[2]) : NaN;
    };
    partout('monnaie-ce2', (item) => {
      const c = item.consigne;
      const r = centimes(item.reponse);
      const ecrire = c.match(/(\d+) euros? et (\d+) centimes?/);
      if (ecrire) expect(r).toBe(Number(ecrire[1]) * 100 + Number(ecrire[2]));
      else if (c.startsWith('Calcule')) {
        const montants = [...c.matchAll(/(\d+),(\d\d) €/g)].map((m) => Number(m[1]) * 100 + Number(m[2]));
        const enCentimes = c.match(/\+ (\d+) centimes/);
        expect(r).toBe(montants.reduce((s, x) => s + x, 0) + (enCentimes ? Number(enCentimes[1]) : 0));
      } else {
        const prix = centimes(c);
        const billet = Number(c.match(/avec (\d+) €/)![1]);
        expect(r).toBe(billet * 100 - prix);
      }
      expect(item.options!.filter((o) => centimes(o) === r)).toEqual([item.reponse]);
    });
  });

  it('durées et horaires', () => {
    const minutes = (s: string) => {
      const m = s.match(/(\d+) h(?: (\d+))?/);
      return Number(m![1]) * 60 + Number(m![2] ?? 0);
    };
    partout('durees-ce2', (item) => {
      const c = item.consigne;
      const dans = c.match(/dans (\d+) h (\d+) min/);
      const entre = c.match(/entre (\d+ h \d+) et (\d+ h \d+)/);
      const duree = c.match(/(?:dure|pendant) (\d+) h(?: (\d+) min)?/);
      if (dans) expect(Number(item.reponse)).toBe(Number(dans[1]) * 60 + Number(dans[2]));
      else if (entre) expect(Number(item.reponse)).toBe(minutes(entre[2]!) - minutes(entre[1]!));
      else {
        const d = Number(duree![1]) * 60 + Number(duree![2] ?? 0);
        const horaire = minutes(c.match(/à (\d+ h \d+)/)![1]!);
        const attendu = c.includes('arrive') ? horaire + d : horaire - d;
        expect(minutes(item.reponse), c).toBe(attendu);
        expect(item.options!.filter((o) => minutes(o) === attendu)).toEqual([item.reponse]);
        expect(attendu).toBeLessThan(24 * 60);
      }
    });
  });

  it('solides : faces, sommets, arêtes (relation d’Euler) et nature des faces', () => {
    // Faces carrées ou rectangulaires pour cube et pavé ; une pyramide a une base et des triangles.
    const attendus: Record<string, { faces: number; sommets: number; arêtes: number }> = {
      cube: { faces: 6, sommets: 8, arêtes: 12 },
      pavé: { faces: 6, sommets: 8, arêtes: 12 },
      'pyramide à base carrée': { faces: 1 + 4, sommets: 4 + 1, arêtes: 4 + 4 },
      'pyramide à base triangulaire': { faces: 1 + 3, sommets: 3 + 1, arêtes: 3 + 3 },
    };
    partout('solides-ce2', (item) => {
      const c = item.consigne;
      const solide = c.match(/(?:un|une) (cube|pavé|pyramide à base \p{L}+)/u)![1]!;
      const ref = attendus[solide]!;
      expect(ref.faces + ref.sommets - ref.arêtes).toBe(2);
      const element = c.match(/Combien (?:de |d’)(faces|sommets|arêtes)/);
      if (element) expect(Number(item.reponse)).toBe(ref[element[1] as keyof typeof ref]);
      else if (solide === 'cube') expect(item.reponse).toBe('des carrés');
      else if (solide === 'pavé') expect(item.reponse).toBe('des rectangles');
      else expect(item.reponse).toBe(solide.endsWith('carrée') ? 'des triangles et un carré' : 'des triangles');
    });
  });
});

// ───────────────────────── Français

describe('justesse CE2 français : conjugaison', () => {
  const RANG: Record<string, number> = { 'j’': 0, je: 0, tu: 1, il: 2, elle: 2, nous: 3, vous: 4, ils: 5, elles: 5 };
  // Présent des verbes irréguliers du programme, écrit en toutes lettres.
  const PRESENT: Record<string, string> = {
    être: 'suis es est sommes êtes sont', avoir: 'ai as a avons avez ont', faire: 'fais fais fait faisons faites font',
    aller: 'vais vas va allons allez vont', dire: 'dis dis dit disons dites disent', venir: 'viens viens vient venons venez viennent',
    pouvoir: 'peux peux peut pouvons pouvez peuvent', voir: 'vois vois voit voyons voyez voient',
    vouloir: 'veux veux veut voulons voulez veulent', prendre: 'prends prends prend prenons prenez prennent',
  };
  const present = (v: string, r: number) => (PRESENT[v] ? PRESENT[v]!.split(' ')[r]! : v.slice(0, -2) + ['e', 'es', 'e', 'ons', 'ez', 'ent'][r]);
  // Imparfait : radical du « nous » au présent (sauf être), terminaisons -ais, -ais, -ait, -ions, -iez, -aient.
  const imparfait = (v: string, r: number) => {
    const radical = v === 'être' ? 'ét' : present(v, 3).replace(/ons$/, '');
    return radical + ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'][r];
  };
  // Futur : infinitif (sans e final), sauf radicaux irréguliers ; terminaisons -ai, -as, -a, -ons, -ez, -ont.
  const RADICAL_FUTUR: Record<string, string> = { être: 'ser', avoir: 'aur', faire: 'fer', aller: 'ir', venir: 'viendr', pouvoir: 'pourr', voir: 'verr', vouloir: 'voudr' };
  const futur = (v: string, r: number) => (RADICAL_FUTUR[v] ?? v.replace(/e$/, '')) + ['ai', 'as', 'a', 'ons', 'ez', 'ont'][r];
  const sujet = (c: string) => c.match(/: (j’|\p{L}+) …$/u)![1]!;

  it('présent', () => {
    partout('present-ce2', (item) => {
      const v = item.consigne.match(/le verbe (\p{L}+)/u)![1]!;
      expect(item.reponse, item.consigne).toBe(present(v, RANG[sujet(item.consigne)]!));
    });
  });

  it('imparfait et futur', () => {
    partout('imparfait-futur-ce2', (item) => {
      const c = item.consigne;
      const v = c.match(/le verbe (\p{L}+)/u)![1]!;
      const r = RANG[sujet(c)]!;
      expect(item.reponse, c).toBe(c.includes('imparfait') ? imparfait(v, r) : futur(v, r));
    });
  });

  it('passé composé : auxiliaire et accord avec être', () => {
    const PARTICIPES: Record<string, string> = {
      être: 'été', avoir: 'eu', faire: 'fait', dire: 'dit', pouvoir: 'pu', voir: 'vu', vouloir: 'voulu', prendre: 'pris', venir: 'venu',
    };
    const AVEC_ETRE = ['aller', 'venir', 'arriver', 'tomber', 'rentrer'];
    partout('passe-compose-ce2', (item) => {
      const c = item.consigne;
      const v = c.match(/le verbe (\p{L}+)/u)![1]!;
      const p = sujet(c);
      const r = RANG[p]!;
      const participe = PARTICIPES[v] ?? `${v.slice(0, -2)}é`;
      if (AVEC_ETRE.includes(v)) {
        const accord = (p.startsWith('elle') ? 'e' : '') + (p.endsWith('s') ? 's' : '');
        expect(item.reponse, c).toBe(`${present('être', r)} ${participe}${accord}`);
      } else expect(item.reponse, c).toBe(`${present('avoir', r)} ${participe}`);
    });
  });
});

describe('justesse CE2 français : orthographe grammaticale', () => {
  it('accord sujet-verbe : -nt avec un sujet pluriel, au bon temps', () => {
    partout('accord-sujet-verbe-ce2', (item) => {
      const c = item.consigne;
      const s = c.match(/: (.+?) …/)![1]!;
      const noyau = s.split(' ').slice(0, 2).join(' ');
      const pluriel = /^(Les|Mes|Ils|Elles)\b/.test(noyau) || s.includes(' et ');
      const v = item.reponse;
      expect(v.endsWith('nt'), c).toBe(pluriel);
      if (c.includes('imparfait')) expect(v).toMatch(pluriel ? /aient$/ : /ait$/);
      else if (c.includes('futur')) expect(v).toMatch(pluriel ? /ront$/ : /ra$/);
      else expect(v).not.toMatch(/([^f]ait|aient|ra|ront)$/);
    });
  });

  it('pluriel des noms : -s, -x, -aux et exceptions', () => {
    const EN_X = ['bijou', 'caillou', 'chou', 'genou', 'hibou', 'joujou', 'pou'];
    const AL_EN_S = ['bal', 'festival', 'carnaval', 'chacal', 'récital'];
    const pluriel = (n: string) => {
      if (n.endsWith('eau')) return `${n}x`;
      if (n.endsWith('eu')) return ['pneu', 'bleu'].includes(n) ? `${n}s` : `${n}x`;
      if (n.endsWith('ou')) return EN_X.includes(n) ? `${n}x` : `${n}s`;
      if (n.endsWith('al')) return AL_EN_S.includes(n) ? `${n}s` : `${n.slice(0, -2)}aux`;
      return n.endsWith('s') ? n : `${n}s`;
    };
    partout('pluriel-noms-ce2', (item) => {
      const gn = item.consigne.match(/: (?:un|le) (.+) →/)![1]!;
      expect(item.reponse, item.consigne).toBe(gn.split(' ').map(pluriel).join(' '));
    });
  });

  it('féminin qui s’entend', () => {
    const feminin = (m: string) => {
      if (m.endsWith('teur') && !['chanteur', 'menteur'].includes(m)) return m.replace(/teur$/, 'trice');
      if (m.endsWith('eur')) return m.replace(/eur$/, 'euse');
      if (m.endsWith('eux')) return m.replace(/eux$/, 'euse');
      if (m.endsWith('f')) return m.replace(/f$/, 've');
      if (m.endsWith('er')) return m.replace(/er$/, 'ère');
      if (/(ien|on|el|eil)$/.test(m)) return `${m}${m.slice(-1)}e`;
      return `${m}e`;
    };
    partout('feminin-ce2', (item, d) => {
      const gn = item.consigne.match(/: un (.+) → une …$/);
      if (gn) {
        expect(d).toBe(3);
        expect(item.reponse, gn[1]).toBe(gn[1]!.split(' ').map(feminin).join(' '));
        return;
      }
      const m = item.consigne.match(/« (.+) »/)![1]!;
      expect(item.reponse, m).toBe(feminin(m));
      if (d === 1) expect(item.reponse).toBe(`${m}e`);
      if (d === 3) expect(item.reponse).toMatch(/trice$/);
    });
  });
});

describe('justesse CE2 français : la phrase', () => {
  const DETERMINANTS = ['le', 'la', 'les', 'un', 'une', 'des', 'mon', 'ma', 'mes', 'sa', 'ce', 'cette'];
  const PRONOMS = ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles'];
  const ADVERBES = ['très', 'si', 'bien', 'assez', 'aujourd’hui', 'demain', 'souvent', 'vite', 'encore', 'tôt', 'tard', 'beaucoup', 'fort',
    'bientôt', 'ensemble', 'toujours', 'trop'];
  const estAdverbe = (m: string) => ADVERBES.includes(m) || m.endsWith('ment');

  it('classes de mots : déterminants, pronoms, adverbes', () => {
    partout('classes-mots-ce2', (item) => {
      const c = item.consigne;
      if (c.includes('quel mot est un adverbe')) {
        expect(item.options!.filter((o) => estAdverbe(o.toLowerCase()))).toEqual([item.reponse]);
        return;
      }
      const mot = c.match(/du mot « (.+) »/)![1]!;
      const m = mot.toLowerCase();
      if (item.reponse === 'déterminant') expect(DETERMINANTS).toContain(m);
      else if (item.reponse === 'pronom') expect(PRONOMS).toContain(m);
      else if (item.reponse === 'adverbe') expect(estAdverbe(m), mot).toBe(true);
      else if (item.reponse === 'nom propre') expect(mot[0]).toBe(mot[0]!.toUpperCase());
      else {
        expect(DETERMINANTS).not.toContain(m);
        expect(PRONOMS).not.toContain(m);
        expect(estAdverbe(m), mot).toBe(false);
      }
    });
  });

  it('groupe sujet et pronom', () => {
    const FEMININS = ['sœur', 'maitresse', 'voisine', 'grand-mère', 'fleur', 'filles', 'voitures', 'tantes', 'poules', 'amies', 'Nora', 'Léa', 'Inès'];
    partout('groupe-sujet-ce2', (item) => {
      const c = item.consigne;
      const gn = c.match(/remplacer « (.+) »/);
      if (gn) {
        const mots = gn[1]!.split(/ et | /);
        const pluriel = gn[1]!.includes(' et ') || /^(Les|Mes)\b/.test(gn[1]!);
        // Pluriel masculin dès qu'un nom est masculin.
        const feminin = gn[1]!.includes(' et ') ? mots.every((m) => FEMININS.includes(m)) : mots.some((m) => FEMININS.includes(m));
        expect(item.reponse, gn[1]).toBe((feminin ? 'elle' : 'il') + (pluriel ? 's' : ''));
        return;
      }
      const phrase = c.match(/« (.+?) »/)![1]!;
      const gs = item.reponse;
      const apres = phrase.slice(phrase.indexOf(gs) + gs.length).trim().split(' ')[0]!;
      expect(phrase, gs).toContain(gs);
      expect(/^(Les|les|Mes|mes)\b/.test(gs) || gs.includes(' et ')).toBe(apres.endsWith('nt'));
      expect(DETERMINANTS.includes(gs.split(' ')[0]!.toLowerCase()) || /^\p{Lu}/u.test(gs)).toBe(true);
    });
  });

  it('forme négative : ne (ou n’) avant le verbe, pas après', () => {
    partout('forme-negative-ce2', (item) => {
      const phrase = item.consigne.match(/^« (.+) » Mets/)![1]!;
      // Retirer ne… pas ; « Je aime » redevient « J’aime ».
      const affirmative = (s: string) => s.replace(/\b[Nn]e (\p{L}+) pas /u, '$1 ').replace(/\b[Nn]’(\p{L}+) pas /u, '$1 ')
        .replace(/\b([Jj])e (?=[aeéèêiouh])/u, '$1’');
      const bonnes = item.options!.filter((o) => {
        const elision = /[Nn]’[aeéèêiouh]/.test(o);
        const ne = /\b[Nn]e [^aeéèêiouh]\p{L}* pas /u.test(o);
        return (elision || ne) && affirmative(o).toLowerCase() === phrase.toLowerCase();
      });
      expect(bonnes, item.consigne).toEqual([item.reponse]);
    });
  });
});

describe('justesse CE2 français : vocabulaire', () => {
  it('préfixes : sens contraire ou répétition', () => {
    const NEGATIFS = /^(im|in|dé|mal|mé)/;
    partout('prefixes-ce2', (item) => {
      const contraire = item.consigne.match(/contraire de « (.+) »/);
      if (contraire) {
        // Une seule option se lit « préfixe négatif + mot donné ».
        expect(item.options!.filter((o) => NEGATIFS.test(o) && o.replace(NEGATIFS, '') === contraire[1])).toEqual([item.reponse]);
        return;
      }
      const mot = item.consigne.match(/« (.+) »/)![1]!;
      if (mot.startsWith('re')) expect(item.reponse).toBe(`${mot.slice(2)} de nouveau`);
      else if (mot.startsWith('dé')) expect(item.reponse).toBe(`le contraire de ${mot.slice(2)}`);
      else expect(item.reponse).toBe(`pas ${mot.replace(NEGATIFS, '')}`);
    });
  });

  it('familles de mots : partie commune et classe', () => {
    const debut = (m: string) => m.normalize('NFD').replace(/\p{M}/gu, '').slice(0, 3);
    const CLASSE: Record<string, RegExp> = { nom: /(tion|age)$/, verbe: /(er|ir|re)$/, adjectif: /(able|ible|if)$/ };
    partout('familles-mots-ce2', (item) => {
      const c = item.consigne;
      const donne = c.match(/« (.+) »/)?.[1];
      if (!donne) {
        // L'intrus est le seul mot qui ne partage pas son début avec les autres.
        const autres = item.options!.filter((o) => o !== item.reponse);
        expect(new Set(autres.map(debut)).size).toBe(1);
        expect(debut(item.reponse)).not.toBe(debut(autres[0]!));
        return;
      }
      if (c.includes('n’est pas')) {
        expect(item.options!.filter((o) => debut(o) !== debut(donne))).toEqual([item.reponse]);
        return;
      }
      const classe = c.match(/^Quel (nom|verbe|adjectif) /)?.[1];
      const bonnes = item.options!.filter((o) => debut(o) === debut(donne) && (!classe || CLASSE[classe]!.test(o)) && o !== donne);
      expect(bonnes, c).toEqual([item.reponse]);
    });
  });

  it('termes génériques et synonymes', () => {
    const CATEGORIE: Record<string, string> = {
      pomme: 'fruit', poire: 'fruit', cerise: 'fruit', banane: 'fruit', fraise: 'fruit', abricot: 'fruit',
      carotte: 'légume', poireau: 'légume', navet: 'légume', haricot: 'légume', courgette: 'légume', radis: 'légume',
      moineau: 'oiseau', pigeon: 'oiseau', merle: 'oiseau', aigle: 'oiseau', hibou: 'oiseau', corbeau: 'oiseau',
      marteau: 'outil', scie: 'outil', tournevis: 'outil', pince: 'outil', pelle: 'outil', râteau: 'outil',
      table: 'meuble', chaise: 'meuble', armoire: 'meuble', lit: 'meuble', buffet: 'meuble', commode: 'meuble',
      pantalon: 'vêtement', robe: 'vêtement', chemise: 'vêtement', manteau: 'vêtement', jupe: 'vêtement', pull: 'vêtement',
      piano: 'instrument de musique', guitare: 'instrument de musique', violon: 'instrument de musique',
      flûte: 'instrument de musique', tambour: 'instrument de musique', trompette: 'instrument de musique',
      voiture: 'véhicule', camion: 'véhicule', moto: 'véhicule', autobus: 'véhicule', tracteur: 'véhicule', vélo: 'véhicule',
    };
    const SYNONYMES = [
      ['peur', 'crainte'], ['content', 'joyeux'], ['maison', 'habitation'], ['voiture', 'automobile'], ['commencer', 'débuter'],
      ['finir', 'terminer'], ['triste', 'malheureux'], ['calme', 'tranquille'], ['bâtir', 'construire'], ['regarder', 'observer'],
    ];
    partout('generiques-synonymes-ce2', (item) => {
      const c = item.consigne;
      const liste = c.match(/à la fois : (.+) \?/);
      const nEst = c.match(/n’est pas un (.+) \?/);
      const syn = c.match(/même sens que « (.+) »/);
      if (liste) {
        const cats = new Set(liste[1]!.split(', ').map((m) => CATEGORIE[m]));
        expect(cats.size).toBe(1);
        expect(item.reponse.replace(/^des /, '').replace(/^(\p{L}+)x\b|^(\p{L}+)s\b/u, '$1$2')).toBe([...cats][0]);
      } else if (nEst) {
        expect(item.options!.filter((o) => CATEGORIE[o] !== nEst[1])).toEqual([item.reponse]);
      } else {
        const paire = SYNONYMES.find((p) => p.includes(syn![1]!))!;
        expect(item.options!.filter((o) => paire.includes(o) && o !== syn![1])).toEqual([item.reponse]);
      }
    });
  });
});

// ───────────────────────── Rédaction et variété

describe('rédaction CE2 : accords des nombres et variété des séries', () => {
  it('jamais « 1 » suivi d’un nom au pluriel (« 1 parts »)', () => {
    // Mots invariables terminés par s : légitimes après 1.
    const INVARIABLES = ['fois', 'tiers', 'mois', 'pas', 'plus', 'puis', 'dans', 'sous', 'pendant'];
    for (const g of GENERATEURS_CE2) {
      partout(g.id, (item) => {
        for (const texte of [item.consigne, item.indice, item.explication]) {
          for (const m of texte.matchAll(/(?<![\d,])1 (\p{L}+s)(?!\p{L})/gu)) expect(INVARIABLES, `${g.id} : ${texte}`).toContain(m[1]);
        }
      });
    }
  });

  const CORRIGES = [
    'problemes-additifs-ce2', 'faits-multiplicatifs-ce2', 'feminin-ce2', 'forme-negative-ce2', 'groupe-sujet-ce2',
    'prefixes-ce2', 'classes-mots-ce2', 'pluriel-noms-ce2', 'familles-mots-ce2',
  ];
  it.each(CORRIGES)('%s : au moins 20 consignes distinctes par difficulté, d1 différente de d3', (id) => {
    const consignes = DIFFICULTES.map((d) => {
      const vues = new Set<string>();
      partout(id, (item, dd) => {
        if (dd === d) vues.add(item.consigne);
      });
      return vues;
    });
    for (const vues of consignes) expect(vues.size).toBeGreaterThanOrEqual(20);
    expect([...consignes[2]!].filter((c) => !consignes[0]!.has(c)).length).toBeGreaterThan(0);
    expect(serie(id, 10, 1, 3).length).toBe(10);
    expect(GRAINES.length).toBe(400);
  });

  it('faits multiplicatifs : jamais de facteur 1', () => {
    partout('faits-multiplicatifs-ce2', (item) => {
      expect(item.consigne).not.toMatch(/(?<!\d)1 ×|× 1(?!\d)/);
      expect(item.reponse).not.toBe('1');
    });
  });

  it('problèmes : ordres de grandeur vraisemblables', () => {
    partout('problemes-additifs-ce2', (item) => {
      const [x, y] = nombres(item.consigne);
      if (item.consigne.includes('arrivent')) expect(y!).toBeLessThanOrEqual(x! / 5);
      if (item.consigne.includes('de plus que') || item.consigne.includes('de moins que')) expect(Math.min(x!, y!)).toBeGreaterThanOrEqual(100);
    });
    partout('problemes-fois-plus-ce2', (item) => expect(Number(item.reponse)).toBeLessThanOrEqual(400));
  });
});
