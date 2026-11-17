import { describe, expect, it } from 'vitest';
import { colonnesPour, rangees } from './Grille';

describe('grille équilibrée', () => {
  it('rangées sans case vide, écart d’une carte au plus entre rangées', () => {
    expect(rangees(5, 4)).toEqual([3, 2]);
    expect(rangees(3, 2)).toEqual([2, 1]);
    expect(rangees(8, 4)).toEqual([4, 4]);
    expect(rangees(7, 3)).toEqual([3, 2, 2]);
    expect(rangees(3, 3)).toEqual([3]);
    expect(rangees(0, 4)).toEqual([]);
    for (let n = 1; n <= 20; n++) for (let c = 1; c <= 8; c++) {
      const r = rangees(n, c);
      expect(r.reduce((a, b) => a + b, 0)).toBe(n);
      expect(Math.max(...r)).toBeLessThanOrEqual(c);
      expect(Math.max(...r) - Math.min(...r)).toBeLessThanOrEqual(1);
      expect(r.length).toBe(Math.ceil(n / c));
    }
  });
  it('colonnes selon la largeur', () => {
    expect(colonnesPour(772, 150, 8)).toBe(4);
    expect(colonnesPour(358, 104, 8)).toBe(3);
    expect(colonnesPour(100, 150, 8)).toBe(1);
  });
});
