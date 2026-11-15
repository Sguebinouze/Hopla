import { describe, expect, it } from 'vitest';
import { bilan, etat, intervalle, majSuivi, type Suivi } from './progression';

const serie = (resultats: boolean[], jour: string, depart?: Suivi) =>
  resultats.reduce<Suivi | undefined>((s, reussi) => majSuivi(s, { reussi, indice: false }, jour), depart)!;

describe('progression (même règle que la base)', () => {
  it('intervalles identiques à app.intervalle', () => {
    expect([intervalle(0.5, 0), intervalle(0.7, 3), intervalle(0.9, 1), intervalle(0.9, 2), intervalle(0.9, 3), intervalle(0.9, 6)])
      .toEqual([1, 2, 3, 7, 14, 30]);
  });

  it('une notion ratée revient le lendemain', () => {
    const s = serie([false, false], '2026-11-15');
    expect(s).toMatchObject({ nbEssais: 2, prochaineRevision: '2026-11-16', reussitesEspacees: 0 });
    expect(etat(s, '2026-11-15')).toBe('en-cours');
    expect(etat(s, '2026-11-16')).toBe('a-revoir');
  });

  it('une notion maitrisée plusieurs jours de suite s’espace : 3, puis 7, puis 14 jours', () => {
    const j1 = serie([true, true, true, true, true, true], '2026-11-15');
    expect(j1.score).toBeGreaterThanOrEqual(0.85);
    expect(j1).toMatchObject({ reussitesEspacees: 1, prochaineRevision: '2026-11-18' });
    expect(etat(j1, '2026-11-16')).toBe('acquis');
    const j2 = serie([true], '2026-11-18', j1);
    expect(j2).toMatchObject({ reussitesEspacees: 2, prochaineRevision: '2026-11-25' });
    const j3 = serie([true], '2026-11-25', j2);
    expect(j3).toMatchObject({ reussitesEspacees: 3, prochaineRevision: '2026-12-09' });
  });

  it('plusieurs réussites le même jour ne comptent qu’une fois', () => {
    const s = serie([true, true, true, true, true, true, true, true], '2026-11-15');
    expect(s.reussitesEspacees).toBe(1);
  });

  it('un échec net remet le compteur à zéro', () => {
    const acquis = serie([true, true, true, true, true, true], '2026-11-15');
    const rate = serie([false, false], '2026-11-18', acquis);
    expect(rate.score).toBeLessThan(0.6);
    expect(rate).toMatchObject({ reussitesEspacees: 0, prochaineRevision: '2026-11-19' });
  });

  it('bilan d’une matière', () => {
    const acquis = serie([true, true, true, true, true, true], '2026-11-15');
    expect(bilan(['a', 'b', 'c', 'd'], { a: acquis, b: serie([false], '2026-11-15') }, '2026-11-16'))
      .toEqual({ acquises: 1, aRevoir: 1, total: 4, part: 0.25 });
  });
});
