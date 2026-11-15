import { describe, expect, it } from 'vitest';
import { verifierTexte } from '@hopla/redaction';
import { GENERATEURS, normaliserReponse, serie } from './index';
import type { Difficulte } from './types';

const DIFFICULTES: Difficulte[] = [1, 2, 3];
const GRAINES = Array.from({ length: 400 }, (_, i) => i * 7919 + 1);
const valeur = (s: string) => Number(s.replace('−', '-'));

describe.each(GENERATEURS)('$id', (g) => {
  it('est déterministe pour une graine donnée', () => {
    expect(g.generer(42, 2)).toEqual(g.generer(42, 2));
  });

  it.each(DIFFICULTES)('produit des items valides en difficulté %i', (d) => {
    for (const graine of GRAINES) {
      const item = g.generer(graine, d);
      expect(g.competences).toContain(item.competence);
      if (item.gabarit === 'qcm') {
        expect(item.options).toHaveLength(4);
        expect(new Set(item.options).size).toBe(4);
        expect(item.options).toContain(item.reponse);
      }
      for (const texte of [item.consigne, item.indice, item.explication]) {
        const erreurs = verifierTexte(texte, g.cycle).filter((p) => p.niveau === 'erreur');
        expect(erreurs, texte).toEqual([]);
      }
    }
  });

  it('propose des séries variées', () => {
    const items = serie(g.id, 10, 1000, 2);
    expect(items.length).toBe(10);
  });
});

describe('justesse des réponses', () => {
  it('fractions : la réponse correspond au visuel', () => {
    const g = GENERATEURS.find((x) => x.id === 'fractions-coloriees')!;
    for (const graine of GRAINES) {
      const item = g.generer(graine, 3);
      if (item.visuel?.type !== 'grille') throw new Error('visuel attendu');
      const { lignes, colonnes, coloriees } = item.visuel;
      expect(item.reponse).toBe(`${coloriees}/${lignes * colonnes}`);
      expect(lignes * colonnes).toBeLessThanOrEqual(12);
    }
  });

  it('relatifs : la réponse est la somme exacte', () => {
    const g = GENERATEURS.find((x) => x.id === 'addition-relatifs')!;
    for (const graine of GRAINES) {
      const item = g.generer(graine, 3);
      if (item.visuel?.type !== 'droite') throw new Error('visuel attendu');
      expect(valeur(item.reponse)).toBe(item.visuel.depart + item.visuel.saut);
    }
  });

  it('tables : la réponse est le produit ou le facteur manquant', () => {
    const g = GENERATEURS.find((x) => x.id === 'tables-multiplication')!;
    for (const graine of GRAINES) {
      for (const d of DIFFICULTES) {
        const item = g.generer(graine, d);
        const [x, y, p] = item.consigne.match(/\d+/g)!.map(Number);
        if (d === 3) expect(Number(item.reponse) * x!).toBe(y);
        else expect(Number(item.reponse)).toBe(x! * y!);
        void p;
      }
    }
  });

  it('normalise le signe moins saisi au clavier', () => {
    expect(normaliserReponse(' -3 ')).toBe('−3');
    expect(normaliserReponse('+4')).toBe('4');
  });
});
