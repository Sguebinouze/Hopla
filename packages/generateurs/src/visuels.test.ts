import { describe, expect, it } from 'vitest';
import { GENERATEURS } from './index';
import { DIFFICULTES, GRAINES, partout } from './oracles';
import type { Item } from './types';

const tous = (): Item[] => GENERATEURS.flatMap((g) => DIFFICULTES.flatMap((d) => GRAINES.map((s) => g.generer(s, d))));

describe('visuels dessinés', () => {
  const items = tous();

  it('horloges : une heure de 1 à 12, minutes de 5 en 5', () => {
    for (const { visuel: v } of items) {
      if (v?.type !== 'horloge') continue;
      expect(v.heures).toBeGreaterThanOrEqual(1);
      expect(v.heures).toBeLessThanOrEqual(12);
      expect(v.minutes % 5).toBe(0);
      expect(v.minutes).toBeLessThan(60);
    }
  });

  it('urnes : les boules dessinées sont celles de l’énoncé, dans le même ordre', () => {
    for (const id of ['probabilites-cm2', 'probabilites-6e', 'probabilites-5e']) {
      partout(id, (item) => {
        if (item.visuel?.type !== 'urne') return;
        const enonce = item.consigne.split('On tire')[0]!;
        const attendu = [...enonce.matchAll(/(\d+) (?:boules? )?(rouge|bleue|verte|jaune|noire)s?/g)].map((m) => ({ couleur: m[2], nombre: Number(m[1]) }));
        expect(item.visuel.boules).toEqual(attendu);
      });
    }
  });

  it('monnaie : des pièces et des billets qui existent', () => {
    for (const { visuel: v } of items) if (v?.type === 'monnaie') for (const x of v.valeurs) expect([1, 2, 5, 10, 20, 50, 100]).toContain(x);
  });

  it('diagrammes : barres positives, un axe qui les contient toutes', () => {
    for (const { visuel: v } of items) {
      if (v?.type !== 'diagramme') continue;
      for (const b of v.barres) expect(b.valeur).toBeGreaterThan(0);
      expect(Math.max(...v.barres.map((b) => b.valeur)) / v.pas).toBeLessThanOrEqual(12);
    }
  });
});
