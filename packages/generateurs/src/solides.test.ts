import { describe, expect, it } from 'vitest';
import { compter, dessinSolide, facesVisibles, POLYEDRES } from './solides';

describe('solides dessinés', () => {
  it('ont les nombres de faces, d’arêtes et de sommets des manuels (relation d’Euler)', () => {
    expect(compter('cube')).toEqual({ faces: 6, aretes: 12, sommets: 8 });
    expect(compter('pave')).toEqual({ faces: 6, aretes: 12, sommets: 8 });
    expect(compter('pyramide')).toEqual({ faces: 5, aretes: 8, sommets: 5 });
    expect(compter('pyramide-triangulaire')).toEqual({ faces: 4, aretes: 6, sommets: 4 });
    expect(compter('prisme-triangulaire')).toEqual({ faces: 5, aretes: 9, sommets: 6 });
    for (const nom of Object.keys(POLYEDRES) as (keyof typeof POLYEDRES)[]) {
      const c = compter(nom)!;
      expect(c.sommets - c.aretes + c.faces).toBe(2);
    }
  });

  it('cube vu de face, d’en haut et de droite : 3 faces vues, 3 arêtes cachées au coin arrière', () => {
    // Faces : avant, arrière, dessous, dessus, gauche, droite.
    expect(facesVisibles(POLYEDRES.cube!)).toEqual([true, false, false, true, false, true]);
    const d = dessinSolide('cube');
    expect(d.lignes.filter((l) => l.cache)).toHaveLength(3);
    expect(d.fond).toHaveLength(3);
  });

  it('chaque polyèdre montre au moins une arête cachée, les solides courbes une ligne cachée', () => {
    for (const nom of ['cube', 'pave', 'pyramide', 'pyramide-triangulaire', 'prisme-triangulaire', 'cylindre', 'cone', 'boule'] as const) {
      const d = dessinSolide(nom);
      expect(d.lignes.some((l) => l.cache), nom).toBe(true);
      expect(d.lignes.some((l) => !l.cache), nom).toBe(true);
      expect(Math.min(...d.lignes.flatMap((l) => l.points.map((p) => Math.min(p[0], p[1]))))).toBeCloseTo(0);
    }
  });
});
