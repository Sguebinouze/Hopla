import { describe, expect, it } from 'vitest';
import { ERREURS } from './erreurs';
import { GENERATEURS } from './index';
import { DIFFICULTES } from './oracles';

// Codes réellement produits par les générateurs, sur un échantillon de graines.
const utilises = new Map<string, string>();
for (const g of GENERATEURS)
  for (const d of DIFFICULTES)
    for (let graine = 1; graine <= 150; graine++)
      for (const code of Object.values(g.generer(graine, d).erreurs ?? {})) if (!utilises.has(code)) utilises.set(code, g.id);

describe('dictionnaire des erreurs', () => {
  it('chaque code produit par un générateur a un libellé', () => {
    const manquants = [...utilises].filter(([code]) => !(code in ERREURS)).map(([code, id]) => `${code} (${id})`);
    expect(manquants).toEqual([]);
  });
  it('chaque libellé est court, sans tiret cadratin, et sert au moins une fois', () => {
    for (const [code, libelle] of Object.entries(ERREURS)) {
      expect(code).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(libelle.length, libelle).toBeLessThanOrEqual(60);
      expect(libelle).not.toMatch(/—/);
      expect(utilises.has(code), `${code} n’est utilisé par aucun générateur`).toBe(true);
    }
  });
});
