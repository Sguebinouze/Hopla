import { pourLaVoix } from '@hopla/redaction';
import { describe, expect, it } from 'vitest';
import { phrases } from './voix';

describe('voix d’Octave', () => {
  it('une phrase par énoncé, ponctuation gardée', () => {
    expect(phrases(pourLaVoix('« Lina ouvre la porte du jardin. Elle voit un hérisson. Il mange une limace. » Où est le hérisson ?')))
      .toEqual(['Lina ouvre la porte du jardin.', 'Elle voit un hérisson.', 'Il mange une limace.', 'Où est le hérisson?']);
  });
  it('pause aux deux-points et aux retours à la ligne, pas dans les nombres', () => {
    expect(phrases('Calcule : 3,5 + 1 000\nPuis vérifie')).toEqual(['Calcule :', '3,5 + 1 000', 'Puis vérifie']);
    expect(phrases('…')).toEqual([]);
  });
});
