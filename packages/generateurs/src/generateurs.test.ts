import { describe, expect, it } from 'vitest';
import { verifierTexte } from '@hopla/redaction';
import { comparerDecimaux, decaler, normaliserDecimal } from './decimaux';
import { GENERATEURS, enLettres, normaliserReponse, serie } from './index';
import { DIFFICULTES, GRAINES, calculJuste, calculer, egaliteVraie, partout, proche, tous, val } from './oracles';
import { PARTICIPES_ETRE, PHRASES_PROPOSITIONS, SUJETS_ETRE } from './sixieme-francais';

// ───────────────────────── Règles communes à tous les générateurs

// Mots invariables terminés par s, légitimes après « 1 » (« 1 fois », « 1 pas »).
const INVARIABLES_EN_S = ['fois', 'tiers', 'mois', 'pas', 'plus', 'puis', 'dans', 'sous', 'pendant', 'temps', 'avis', 'corps', 'jus', 'bras', 'repas', 'pois', 'nez', 'colis', 'tapis', 'ours', 'dos', 'os', 'vers'];

describe.each(GENERATEURS)('$id', (g) => {
  it('est déterministe pour une graine donnée', () => {
    expect(g.generer(42, 2)).toEqual(g.generer(42, 2));
  });

  it.each(DIFFICULTES)('produit des items valides en difficulté %i', (d) => {
    for (const graine of GRAINES) {
      const item = g.generer(graine, d);
      expect(g.competences).toContain(item.competence);
      expect(item.reponse.length).toBeGreaterThan(0);
      if (item.gabarit === 'qcm') {
        const opts = item.options ?? [];
        expect(opts.length, item.consigne).toBeGreaterThanOrEqual(3);
        expect(opts.length).toBeLessThanOrEqual(4);
        expect(new Set(opts).size, `${item.consigne} ${opts}`).toBe(opts.length);
        expect(opts).toContain(item.reponse);
        // Options numériques : jamais deux valeurs égales (une seule bonne réponse).
        const valeurs = opts.map(val);
        if (valeurs.every(Number.isFinite)) {
          for (let i = 0; i < valeurs.length; i++)
            for (let j = i + 1; j < valeurs.length; j++) expect(proche(valeurs[i]!, valeurs[j]!), `${item.consigne} ${opts}`).toBe(false);
        }
      } else {
        expect(normaliserReponse(item.reponse), item.consigne).toBe(item.reponse);
      }
      if (item.erreurs) {
        expect(item.erreurs[item.reponse], `${item.consigne} : la bonne réponse n'a pas de code d'erreur`).toBeUndefined();
        for (const [option, code] of Object.entries(item.erreurs)) {
          if (item.gabarit === 'qcm') expect(item.options, item.consigne).toContain(option);
          expect(code).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
        }
      }
      for (const texte of [item.consigne, item.indice, item.explication]) {
        const erreurs = verifierTexte(texte, g.cycle).filter((p) => p.niveau === 'erreur');
        expect(erreurs, texte).toEqual([]);
        expect(texte).not.toMatch(/undefined|NaN|\[object/);
        // Règles apprises à la relecture, valables pour toutes les classes.
        for (const m of texte.matchAll(/(?<![\d,])1 (\p{L}+s)(?!\p{L})/gu)) expect(INVARIABLES_EN_S, `« 1 ${m[1]} » : ${texte}`).toContain(m[1]);
        expect(texte, `élision devant un prénom : ${texte}`).not.toMatch(/\b(que|de) [AEIOUYÉÈÊ]\p{Ll}/u);
        expect(texte, `orthographe de 1990 : ${texte}`).not.toMatch(/coût|maître|boîte|connaît|paraît|goût/);
      }
    }
  });

  it('propose des séries variées', () => {
    expect(serie(g.id, 10, 1000, 2).length).toBe(10);
  });
});

// ───────────────────────── Justesse : CE1

describe('justesse CE1 mathématiques', () => {
  it('écriture en lettres : valeurs de référence (orthographe de 1990)', () => {
    const ref: Record<number, string> = {
      0: 'zéro', 1: 'un', 16: 'seize', 17: 'dix-sept', 21: 'vingt-et-un', 31: 'trente-et-un', 60: 'soixante',
      70: 'soixante-dix', 71: 'soixante-et-onze', 77: 'soixante-dix-sept', 80: 'quatre-vingts', 81: 'quatre-vingt-un',
      90: 'quatre-vingt-dix', 91: 'quatre-vingt-onze', 99: 'quatre-vingt-dix-neuf', 100: 'cent', 101: 'cent-un',
      200: 'deux-cents', 201: 'deux-cent-un', 280: 'deux-cent-quatre-vingts', 635: 'six-cent-trente-cinq',
      721: 'sept-cent-vingt-et-un', 999: 'neuf-cent-quatre-vingt-dix-neuf', 1000: 'mille',
    };
    for (const [n, l] of Object.entries(ref)) expect(enLettres(Number(n))).toBe(l);
  });

  it('écriture en lettres : grands nombres (mille invariable, million et milliard noms)', () => {
    const ref: Record<number, string> = {
      1001: 'mille-un', 1080: 'mille-quatre-vingts', 2000: 'deux-mille', 80000: 'quatre-vingt-mille',
      200000: 'deux-cent-mille', 280500: 'deux-cent-quatre-vingt-mille-cinq-cents', 1000000: 'un-million',
      2300000: 'deux-millions-trois-cent-mille', 80000000: 'quatre-vingts-millions', 200000000: 'deux-cents-millions',
      1000000000: 'un-milliard', 3000021000: 'trois-milliards-vingt-et-un-mille',
      999999999: 'neuf-cent-quatre-vingt-dix-neuf-millions-neuf-cent-quatre-vingt-dix-neuf-mille-neuf-cent-quatre-vingt-dix-neuf',
    };
    for (const [n, l] of Object.entries(ref)) expect(enLettres(Number(n))).toBe(l);
  });

  it('nombres : centaines, dizaines, unités', () => {
    partout('nombres-unites-ce1', (item) => {
      const valeurs = { centaine: 100, dizaine: 10, unité: 1 };
      let total = 0;
      for (const m of item.consigne.matchAll(/(\d+) (centaine|dizaine|unité)s?/g)) total += Number(m[1]) * valeurs[m[2] as keyof typeof valeurs];
      expect(Number(item.reponse)).toBe(total);
      expect(total).toBeLessThanOrEqual(1000);
    });
  });

  it('nombres en lettres : chiffres et lettres concordent', () => {
    partout('nombres-lettres-ce1', (item, d) => {
      if (d === 2) expect(item.consigne).toBe(`Écris en chiffres : ${enLettres(Number(item.reponse))}.`);
      else expect(item.reponse).toBe(enLettres(Number(item.consigne.match(/\d+/)![0])));
    });
  });

  it('comparer : plus grand, plus petit, compris entre', () => {
    partout('nombres-comparer-ce1', (item) => {
      const nombres = item.options!.map(Number);
      if (item.consigne.includes('grand')) expect(Number(item.reponse)).toBe(Math.max(...nombres));
      else if (item.consigne.includes('petit')) expect(Number(item.reponse)).toBe(Math.min(...nombres));
      else {
        const [bas, haut] = item.consigne.match(/\d+/g)!.map(Number);
        const dedans = nombres.filter((n) => n > bas! && n < haut!);
        expect(dedans).toEqual([Number(item.reponse)]);
      }
    });
  });

  it('fractions coloriées : la réponse correspond au visuel, dénominateurs du programme', () => {
    for (const [id, autorises] of [['fractions-coloriees', [2, 3, 4, 5, 6, 8, 10, 12]], ['fractions-coloriees-ce1', [2, 3, 4, 5, 6, 8, 10]]] as const) {
      partout(id, (item) => {
        if (item.visuel?.type !== 'grille') throw new Error('visuel attendu');
        const { lignes, colonnes, coloriees } = item.visuel;
        expect(item.reponse).toBe(`${coloriees}/${lignes * colonnes}`);
        expect(autorises).toContain(lignes * colonnes);
      });
    }
  });

  it('fractions : comparer', () => {
    partout('fractions-comparer-ce1', (item) => {
      const v = item.options!.map(val);
      const attendu = item.consigne.includes('grande') ? Math.max(...v) : Math.min(...v);
      expect(val(item.reponse)).toBe(attendu);
      for (const o of item.options!) expect([2, 3, 4, 5, 6, 8, 10]).toContain(Number(o.split('/')[1]));
      // Barres dessinées : une par option, chacune coloriée selon sa fraction.
      if (item.visuel?.type === 'fractions') {
        expect(item.visuel.barres.map((b) => b.nom)).toEqual(item.options);
        for (const b of item.visuel.barres) expect(`${b.coloriees}/${b.parts}`).toBe(b.nom);
      }
    });
  });

  it('fractions : additionner, soustraire, compléter', () => {
    partout('fractions-additionner-ce1', (item) => {
      if (item.consigne.startsWith('Calcule')) calculJuste(item);
      else {
        const f = item.consigne.match(/(\d+)\/(\d+)/)!;
        expect(proche(val(item.reponse), 1 - Number(f[1]) / Number(f[2]))).toBe(true);
      }
      expect(val(item.reponse)).toBeLessThanOrEqual(1);
    });
  });

  it('parité', () => {
    partout('parite-ce1', (item) => {
      const n = Number(item.reponse);
      const pair = item.consigne.includes('pair') && !item.consigne.includes('impair');
      expect(n % 2).toBe(pair ? 0 : 1);
      const encadrement = item.consigne.match(/entre (\d+) et (\d+)/);
      if (encadrement) {
        const ok = item.options!.map(Number).filter((x) => x % 2 === 0 && x > Number(encadrement[1]) && x < Number(encadrement[2]));
        expect(ok).toEqual([n]);
      } else {
        expect(item.options!.map(Number).filter((x) => x % 2 === n % 2)).toEqual([n]);
      }
    });
  });

  it('calcul mental : égalités, opérations, doubles et moitiés', () => {
    for (const id of ['tables-addition-ce1', 'tables-multiplication-ce1', 'doubles-moities-ce1', 'numeration-calcul-ce1', 'procedures-ce1', 'tables-multiplication']) {
      partout(id, (item) => {
        const double = item.consigne.match(/double de (\d+)/);
        const moitie = item.consigne.match(/moitié de (\d+)/);
        if (double) expect(Number(item.reponse)).toBe(2 * Number(double[1]));
        else if (moitie) expect(Number(item.reponse) * 2).toBe(Number(moitie[1]));
        else if (item.consigne.startsWith('Calcule')) calculJuste(item);
        else egaliteVraie(item);
        expect(Number(item.reponse)).toBeLessThanOrEqual(1000);
        expect(Number(item.reponse)).toBeGreaterThanOrEqual(0);
      });
    }
  });

  it('problèmes : la réponse résout l’énoncé', () => {
    partout('problemes-additifs-ce1', (item) => {
      const n = item.consigne.match(/\d+/g)!.map(Number);
      const r = Number(item.reponse);
      const c = item.consigne;
      if (c.includes('en gagne')) expect(r).toBe(n[0]! + n[1]!);
      else if (c.includes('en donne')) expect(r).toBe(n[0]! - n[1]!);
      else if (c.includes('coffre')) expect(r).toBe(n[0]! - n[1]!);
      else if (c.includes('distribué')) expect(r).toBe(n[0]! + n[1]!);
      else if (c.includes('empruntent')) expect(r).toBe(n[0]! + n[1]! - n[2]!);
      else throw new Error(`énoncé inconnu : ${c}`);
      expect(r).toBeGreaterThan(0);
    });
    partout('problemes-comparaison-ce1', (item) => {
      const n = item.consigne.match(/\d+/g)!.map(Number);
      const r = Number(item.reponse);
      const c = item.consigne;
      if (c.includes('garçons et')) expect(r).toBe(n[1]! - n[0]!);
      else if (/Elle en a \d+ de plus/.test(c)) expect(r).toBe(n[0]! - n[1]!);
      else expect(r).toBe(n[0]! + n[1]!);
      expect(r).toBeGreaterThan(0);
    });
    partout('problemes-multiplicatifs-ce1', (item) => {
      const n = item.consigne.match(/\d+/g)!.map(Number);
      const r = Number(item.reponse);
      const c = item.consigne;
      if (c.includes('paquets')) expect(r).toBe(n[0]! * n[1]!);
      else if (c.includes('équipes')) expect(r * n[1]!).toBe(n[0]);
      else expect(r * n[0]!).toBe(n[1]);
    });
  });
});

describe('justesse CE1 français', () => {
  const RANG: Record<string, number> = { 'j’': 0, je: 0, tu: 1, il: 2, elle: 2, nous: 3, vous: 4, ils: 5, elles: 5 };
  const sujetDe = (consigne: string) => consigne.match(/: (j’|\p{L}+) …$/u)![1]!;

  it('présent : terminaisons et formes d’être et avoir', () => {
    const etre = ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'];
    const avoir = ['ai', 'as', 'a', 'avons', 'avez', 'ont'];
    const fins = ['e', 'es', 'e', 'ons', 'ez', 'ent'];
    partout('present-ce1', (item) => {
      const r = RANG[sujetDe(item.consigne)]!;
      const verbe = item.consigne.match(/le verbe (\p{L}+)/u)![1]!;
      if (verbe === 'être') expect(item.reponse).toBe(etre[r]);
      else if (verbe === 'avoir') expect(item.reponse).toBe(avoir[r]);
      else expect(item.reponse).toBe(verbe.slice(0, -2) + fins[r]);
    });
  });

  it('infinitif : même radical, terminaison -er', () => {
    partout('infinitif-ce1', (item) => {
      expect(item.reponse).toMatch(/er$/);
      expect(item.consigne).toContain(item.reponse.slice(0, -2));
    });
  });

  it('pluriel du groupe nominal : chaque mot prend un s', () => {
    partout('pluriel-gn-ce1', (item) => {
      const gn = item.consigne.match(/: (?:le|la|un|une) (.+) →/)![1]!;
      expect(item.reponse).toBe(gn.split(' ').map((m) => `${m}s`).join(' '));
    });
  });

  it('accord sujet-verbe : -nt avec un sujet pluriel', () => {
    partout('accord-sujet-verbe-ce1', (item) => {
      const sujet = item.consigne.match(/: (.+?) …/)![1]!;
      const noyau = sujet.split(' ').slice(0, 2).join(' ');
      const pluriel = /^(Les|Mes) /.test(noyau) || sujet.includes(' et ');
      expect(item.reponse.endsWith(pluriel ? 'ent' : 'e'), item.consigne).toBe(true);
    });
  });

  it('classes de mots : déterminants et pronoms reconnus', () => {
    const det = ['le', 'la', 'les', 'un', 'une', 'des', 'mon', 'ma', 'ce', 'cette'];
    const pro = ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles'];
    partout('classes-mots-ce1', (item) => {
      const mot = item.consigne.match(/du mot « (.+) »/)![1]!;
      const m = mot.toLowerCase();
      if (item.reponse === 'déterminant') expect(det).toContain(m);
      else if (item.reponse === 'pronom') expect(pro).toContain(m);
      else if (item.reponse === 'nom propre') expect(mot[0]).toBe(mot[0]!.toUpperCase());
      else {
        expect(det).not.toContain(m);
        expect(pro).not.toContain(m);
      }
    });
  });

  it('types de phrases : le point d’interrogation signe l’interrogative', () => {
    partout('types-phrases-ce1', (item) => {
      const phrase = item.consigne.match(/« (.+) »/)![1]!;
      expect(item.reponse === 'interrogative').toBe(phrase.endsWith('?'));
    });
  });
});

// ───────────────────────── Justesse : 6e

describe('justesse 6e mathématiques', () => {
  it('comparer des décimaux', () => {
    partout('comparer-decimaux-6e', (item) => {
      if (item.consigne.startsWith('Complète')) {
        const [x, y] = item.consigne.split(': ')[1]!.split(' … ').map(val);
        expect(item.reponse).toBe(x! < y! ? '<' : x! > y! ? '>' : '=');
      } else {
        const v = item.options!.map(val);
        expect(val(item.reponse)).toBe(item.consigne.includes('grand') ? Math.max(...v) : Math.min(...v));
      }
    });
  });

  it('calculs : × et ÷ par 10, 100, 1 000, 0,1…, produits, quotients', () => {
    for (const id of ['multiplier-diviser-10-6e', 'multiplier-decimaux-6e', 'diviser-decimal-6e']) partout(id, calculJuste);
  });

  it('outils décimaux exacts', () => {
    expect(decaler('3,45', 2)).toBe('345');
    expect(decaler('72,1', -3)).toBe('0,0721');
    expect(decaler('5', -1)).toBe('0,5');
    expect(comparerDecimaux('2,5', '2,45')).toBe(1);
    expect(comparerDecimaux('3,7', '3,70')).toBe(0);
    expect(normaliserDecimal('03.50')).toBe('3,5');
    expect(normaliserReponse('3.50')).toBe('3,5');
    expect(normaliserReponse(' 1 000 ')).toBe('1000');
  });

  it('fractions décimales et écriture à virgule', () => {
    partout('fractions-decimales-6e', (item) => {
      const ecrire = item.consigne.match(/^Écris sous forme décimale : (.+)$/);
      if (ecrire) expect(proche(calculer(ecrire[1]!), val(item.reponse)), item.consigne).toBe(true);
      else {
        const x = val(item.consigne.match(/égale à (.+) \?/)![1]!);
        expect(item.options!.map(val).filter((v) => proche(v, x))).toHaveLength(1);
        expect(proche(val(item.reponse), x)).toBe(true);
      }
    });
  });

  it('arrondis', () => {
    partout('arrondir-6e', (item) => {
      const m = item.consigne.match(/arrondi (à l’unité|au dixième|au centième) de (.+)\.$/)!;
      const dec = { 'à l’unité': 0, 'au dixième': 1, 'au centième': 2 }[m[1]!]!;
      const milliemes = Math.round(val(m[2]!) * 1000);
      const pas = 10 ** (3 - dec);
      const quotient = Math.floor(milliemes / pas) + (milliemes % pas >= pas / 2 ? 1 : 0);
      expect(proche(val(item.reponse), quotient / 10 ** dec), item.consigne).toBe(true);
    });
  });

  it('division euclidienne', () => {
    partout('division-euclidienne-6e', (item) => {
      const [a, b] = item.consigne.match(/de ([\d ]+) par (\d+)/)!.slice(1).map(val);
      expect(Number(item.reponse)).toBe(item.consigne.includes('reste') ? a! % b! : Math.floor(a! / b!));
    });
  });

  it('fractions usuelles, fraction d’un nombre, opérations, pourcentages', () => {
    partout('fractions-usuelles-6e', (item) => {
      const dec = item.consigne.match(/décimale de (.+) \?/);
      const frac = item.consigne.match(/égale à (.+) \?/);
      if (dec) expect(proche(val(item.reponse), val(dec[1]!))).toBe(true);
      else if (frac) expect(proche(val(item.reponse), val(frac[1]!))).toBe(true);
      else egaliteVraie(item);
    });
    partout('fraction-dun-nombre-6e', (item) => {
      const m = item.consigne.match(/(\d+)\/(\d+) de (\d+)/);
      if (m) expect(Number(item.reponse) * Number(m[2])).toBe(Number(m[1]) * Number(m[3]));
      else calculJuste(item);
    });
    partout('fractions-operations-6e', calculJuste);
    partout('pourcentages-6e', (item) => {
      const [t, n] = item.consigne.match(/\d+/g)!.map(Number);
      expect(Number(item.reponse)).toBe((t! * n!) / 100);
    });
  });

  it('grandeurs : longueurs, périmètres, aires', () => {
    const lg = ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm'];
    partout('conversions-longueurs-6e', (item) => {
      const [, x, de, vers] = item.consigne.match(/Convertis (.+) (\w+) en (\w+)\./)!;
      expect(proche(val(item.reponse), val(x!) * 10 ** (lg.indexOf(vers!) - lg.indexOf(de!))), item.consigne).toBe(true);
    });
    partout('perimetres-6e', (item) => {
      const n = val(item.consigne.match(/(?:côté|rayon|diamètre|longueur) ([\d,]+)/)![1]!);
      const c = item.consigne;
      let attendu: number;
      if (c.includes('carré')) attendu = 4 * n;
      else if (c.includes('rectangle')) attendu = 2 * (n + val(c.match(/largeur (\d+)/)![1]!));
      else attendu = 3.14 * (c.includes('rayon') ? 2 * n : n);
      expect(proche(val(item.reponse), attendu), c).toBe(true);
    });
    const ar = ['m²', 'dm²', 'cm²'];
    partout('aires-6e', (item) => {
      const c = item.consigne;
      const conv = c.match(/Convertis (.+) (\S+²) en (\S+²)\./);
      if (conv) expect(proche(val(item.reponse), val(conv[1]!) * 100 ** (ar.indexOf(conv[3]!) - ar.indexOf(conv[2]!))), c).toBe(true);
      else if (c.includes('rectangle')) {
        const [L, l] = c.match(/\d+/g)!.map(Number);
        expect(Number(item.reponse)).toBe(L! * l!);
      } else {
        const [k] = c.match(/\d+/g)!.map(Number);
        expect(Number(item.reponse)).toBe(k! * k!);
      }
    });
  });

  it('durées et horaires', () => {
    const minutes = (s: string) => {
      const h = s.match(/(\d+) h/);
      const m = s.match(/(\d+) min/) ?? s.match(/h (\d+)$/);
      return (h ? Number(h[1]) * 60 : 0) + (m ? Number(m[1]) : 0);
    };
    partout('durees-6e', (item, d) => {
      const c = item.consigne;
      if (d === 1) expect(Number(item.reponse)).toBe(minutes(c.match(/Convertis (.+) en/)![1]!));
      else if (d === 2) expect(minutes(item.reponse)).toBe(Number(c.match(/(\d+) minutes/)![1]));
      else {
        const debut = minutes(c.match(/à (\d+ h \d+)/)![1]!);
        const duree = minutes(c.match(/dure (.+?)\./)![1]!);
        expect(minutes(item.reponse)).toBe(debut + duree);
        expect(item.reponse).toMatch(/^\d+ h [0-5]\d$/);
      }
    });
  });

  it('proportionnalité : la réponse respecte le rapport donné', () => {
    partout('proportionnalite-6e', (item) => {
      const n = item.consigne.match(/\d+/g)!.map(Number);
      const [q1, p1] = n;
      const cible = n[n.length - 1]!;
      expect(proche(Number(item.reponse), (p1! / q1!) * cible), item.consigne).toBe(true);
    });
  });
});

describe('justesse 6e français', () => {
  const RANG: Record<string, number> = { 'j’': 0, je: 0, tu: 1, il: 2, nous: 3, vous: 4, ils: 5 };
  const FUTUR_3E: Record<string, string> = {
    être: 'ser', avoir: 'aur', faire: 'fer', aller: 'ir', dire: 'dir', venir: 'viendr', pouvoir: 'pourr', voir: 'verr', vouloir: 'voudr', prendre: 'prendr',
  };
  const IMPERATIF_3E: Record<string, string[]> = {
    être: ['sois', 'soyons', 'soyez'], avoir: ['aie', 'ayons', 'ayez'], faire: ['fais', 'faisons', 'faites'], aller: ['va', 'allons', 'allez'],
    dire: ['dis', 'disons', 'dites'], venir: ['viens', 'venons', 'venez'], voir: ['vois', 'voyons', 'voyez'], prendre: ['prends', 'prenons', 'prenez'],
  };

  it('conditionnel présent : radical du futur et terminaisons de l’imparfait', () => {
    partout('conditionnel-6e', (item) => {
      const inf = item.consigne.match(/« (\p{L}+) »/u)![1]!;
      const r = RANG[item.consigne.match(/: (j’|\p{L}+) …$/u)![1]!]!;
      const radical = FUTUR_3E[inf] ?? inf;
      expect(item.reponse).toBe(radical + ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'][r]);
    });
  });

  it('impératif présent', () => {
    const rangs = ['2e personne du singulier', '1re personne du pluriel', '2e personne du pluriel'];
    partout('imperatif-6e', (item) => {
      const inf = item.consigne.match(/« (\p{L}+) »/u)![1]!;
      const r = rangs.findIndex((x) => item.consigne.includes(x));
      const rad = inf.slice(0, -2);
      const attendu = IMPERATIF_3E[inf]?.[r] ?? (inf.endsWith('er') ? [`${rad}e`, `${rad}ons`, `${rad}ez`][r] : [`${rad}is`, `${rad}issons`, `${rad}issez`][r]);
      expect(item.reponse).toBe(attendu);
    });
  });

  it('participe passé avec être : accord avec le sujet', () => {
    partout('participe-passe-etre-6e', (item) => {
      const sujet = SUJETS_ETRE.find((s) => item.consigne.includes(`: ${s.texte} `))!;
      const [, pp] = PARTICIPES_ETRE.find(([inf]) => item.consigne.includes(`« ${inf} »`))!;
      expect(item.reponse).toBe(pp + (sujet.feminin ? 'e' : '') + (sujet.pluriel ? 's' : ''));
    });
  });

  it('fonctions : verbe d’état pour l’attribut, préposition pour le COI', () => {
    const ETAT = /\b(est|sont|devient|semble|reste|restent|parait|demeure)\b/;
    partout('fonctions-6e', (item) => {
      const phrase = item.consigne.match(/« (.+?) »/)![1]!;
      const groupe = item.consigne.match(/de « (.+) » \?/)![1]!;
      if (item.reponse === 'attribut du sujet') expect(phrase).toMatch(ETAT);
      if (item.reponse === 'COD') {
        expect(phrase).not.toMatch(ETAT);
        expect(groupe).not.toMatch(/^(à|au|aux|de|du|des|d’)\b/);
      }
      if (item.reponse === 'COI') expect(groupe).toMatch(/^(à|au|aux|de|du|des|d’)/);
    });
  });

  it('propositions : autant que de verbes conjugués', () => {
    partout('propositions-6e', (item) => {
      const phrase = item.consigne.match(/« (.+) »/)![1]!;
      const source = PHRASES_PROPOSITIONS.find((p) => p.replace(/\*/g, '') === phrase)!;
      expect(Number(item.reponse)).toBe((source.match(/\*/g) ?? []).length);
    });
  });

  it('conjonctions', () => {
    const coordination = ['mais', 'ou', 'et', 'donc', 'or', 'ni', 'car'];
    partout('conjonctions-6e', (item) => {
      const mot = item.consigne.match(/de « (.+) » \?/)![1]!;
      expect(item.reponse).toBe(coordination.includes(mot) ? 'conjonction de coordination' : 'conjonction de subordination');
    });
  });
});

describe('justesse 5e', () => {
  it('relatifs : la réponse est la somme exacte', () => {
    tous('addition-relatifs', 3, (item) => {
      if (item.visuel?.type !== 'droite') throw new Error('visuel attendu');
      expect(val(item.reponse)).toBe(item.visuel.depart + item.visuel.saut);
    });
  });

  it('normalise le signe moins saisi au clavier', () => {
    expect(normaliserReponse(' -3 ')).toBe('−3');
    expect(normaliserReponse('+4')).toBe('4');
    expect(normaliserReponse(' Ballons ')).toBe('ballons');
    expect(normaliserReponse("Aujourd'hui")).toBe('aujourd’hui');
    expect(normaliserReponse('3 / 4')).toBe('3/4');
  });
});
