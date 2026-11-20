import { describe, expect, it } from 'vitest';
import { erreursAdmises, nombreDeMots, pointsParSorte, tempsEcriture } from './dictee';

describe('dictée sur papier', () => {
  it('laisse plus de temps aux petits qu’aux grands, jamais moins de 4 secondes', () => {
    const g = 'Ce matin, il neige.';
    expect(tempsEcriture(g, 'ce1')).toBeGreaterThan(tempsEcriture(g, 'cm2'));
    expect(tempsEcriture(g, 'cm2')).toBeGreaterThan(tempsEcriture(g, '3e'));
    expect(tempsEcriture('Il', '3e')).toBe(4000);
    expect(tempsEcriture(g, 'ce1', 'lente')).toBeGreaterThan(tempsEcriture(g, 'ce1'));
    // 14 lettres à 25 lettres par minute, avec la marge : une quarantaine de secondes au CE1.
    expect(tempsEcriture(g, 'ce1')).toBe(40_500);
  });

  it('une erreur pour dix mots, une au moins', () => {
    expect(nombreDeMots('Le chat dort , il rêve .')).toBe(5);
    expect(erreursAdmises('Le chat dort.')).toBe(1);
    expect(erreursAdmises(Array(45).fill('mot').join(' '))).toBe(4);
  });

  it('regroupe les points à vérifier par sorte', () => {
    expect(pointsParSorte(['Accords : petit(s)', 'Verbes : (est)', 'Accords : gai(s)'])).toEqual([
      { sorte: 'Accords', mots: ['petit(s)', 'gai(s)'] }, { sorte: 'Verbes', mots: ['(est)'] },
    ]);
  });
});
