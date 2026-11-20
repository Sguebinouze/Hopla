import { describe, expect, it } from 'vitest';
import { ADRESSE_QR, MODULES_QR } from './qrHopla';

describe('QR code de la présentation', () => {
  it('pointe vers la rubrique Installer du site', () => {
    expect(ADRESSE_QR).toBe('https://hopla-edu.fr/#installer');
  });
  it('est une matrice carrée de taille QR valide (21 + 4k modules)', () => {
    const n = MODULES_QR.length;
    expect((n - 21) % 4).toBe(0);
    for (const r of MODULES_QR) expect(r).toMatch(new RegExp(`^[01]{${n}}$`));
  });
  it('a ses trois repères de position aux coins', () => {
    const n = MODULES_QR.length;
    const repere = ['1111111', '1000001', '1011101', '1011101', '1011101', '1000001', '1111111'];
    for (const [x, y] of [[0, 0], [n - 7, 0], [0, n - 7]] as const) {
      repere.forEach((ligne, i) => expect(MODULES_QR[y + i]!.slice(x, x + 7)).toBe(ligne));
    }
  });
});
