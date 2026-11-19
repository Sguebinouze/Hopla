import { normaliserReponse } from '@hopla/generateurs';
import { describe, expect, it } from 'vitest';
import { appliquerTouche, LONGUEUR_MAX, modeClavier, toucheDuClavierPhysique } from './clavier';

const taper = (touches: string[]) => touches.reduce((v, t) => appliquerTouche(v, t), '');

describe('clavier intégré', () => {
  it('choisit le pavé numérique pour un nombre, une fraction, un décimal', () => {
    expect(modeClavier('42')).toBe('chiffres');
    expect(modeClavier('3/8')).toBe('chiffres');
    expect(modeClavier('−2,5')).toBe('chiffres');
    expect(modeClavier('ss')).toBe('lettres');
  });
  it('tape un nombre négatif décimal reconnu par la correction', () => {
    expect(normaliserReponse(taper(['−', '2', ',', '5']))).toBe(normaliserReponse('-2.5'));
  });
  it('le moins seulement en tête, pas d’espace en tête ni double', () => {
    expect(taper(['3', '−'])).toBe('3');
    expect(taper(['espace', 'l', 'e', 'espace', 'espace', 'c'])).toBe('le c');
  });
  it('efface le dernier caractère, accent compris', () => {
    expect(taper(['é', 't', 'é', 'effacer'])).toBe('ét');
    expect(appliquerTouche('', 'effacer')).toBe('');
  });
  it('borne la longueur', () => {
    expect(taper(Array(LONGUEUR_MAX + 5).fill('1'))).toHaveLength(LONGUEUR_MAX);
  });
  it('traduit le clavier physique', () => {
    expect(toucheDuClavierPhysique('.')).toBe(',');
    expect(toucheDuClavierPhysique('-')).toBe('−');
    expect(toucheDuClavierPhysique('A')).toBe('a');
    expect(toucheDuClavierPhysique('Enter')).toBe('valider');
    expect(toucheDuClavierPhysique('Shift')).toBeNull();
  });
});
