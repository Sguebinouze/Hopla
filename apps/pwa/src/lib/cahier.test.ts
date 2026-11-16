import { describe, expect, it } from 'vitest';
import { etatCahier, planCahier, type Journee } from './cahier';

const notions = [
  ...['F1', 'F2', 'F3'].map((id) => ({ id, matiere: 'francais' })),
  ...['M1', 'M2'].map((id) => ({ id, matiere: 'mathematiques' })),
  ...['H1'].map((id) => ({ id, matiere: 'histoire-geographie' })),
  ...['A1', 'A2'].map((id) => ({ id, matiere: 'langues-vivantes' })),
];

describe('plan du cahier', () => {
  it('chaque page : une notion de français, une de maths, une autre matière à tour de rôle', () => {
    const plan = planCahier(notions, 6);
    expect(plan).toHaveLength(6);
    for (const page of plan) {
      expect(page).toHaveLength(3);
      expect(new Set(page).size).toBe(3);
      expect(page[0]).toMatch(/^F/);
      expect(page[1]).toMatch(/^M/);
      expect(page[2]).toMatch(/^[HA]/);
    }
    expect(plan.map((p) => p[0])).toEqual(['F1', 'F2', 'F3', 'F1', 'F2', 'F3']);
    expect(new Set(plan.map((p) => p[2]))).toEqual(new Set(['H1', 'A1', 'A2']));
    expect(planCahier(notions, 6)).toEqual(plan);
  });

  it('sans autre matière, la troisième notion vient du français ou des maths, sans doublon', () => {
    const plan = planCahier(notions.slice(0, 5), 4);
    for (const page of plan) expect(new Set(page).size).toBe(3);
  });

  it('classe sans notion : pas de page', () => {
    expect(planCahier([], 10)).toEqual([]);
  });
});

describe('avancement du cahier', () => {
  const plan = [['F1', 'M1', 'H1'], ['F2', 'M2', 'A1'], ['F3', 'M1', 'A2']];
  const j = (jour: string, competence_id: string, questions = 5): Journee => ({ jour, competence_id, questions });

  it('une page se fait en une ou plusieurs séances ; une seule page par jour', () => {
    const journees = [
      j('2027-07-06', 'F1'), j('2027-07-06', 'M1'),
      j('2027-07-07', 'H1'), j('2027-07-07', 'F2'), j('2027-07-07', 'M2'), j('2027-07-07', 'A1'),
      j('2027-07-08', 'F2'), j('2027-07-08', 'M2'), j('2027-07-08', 'A1', 3),
    ];
    const e = etatCahier(plan, '2027-07-06', journees, '2027-07-08');
    expect(e.faites).toBe(1);
    expect(e.enCours).toEqual({ F2: 5, M2: 5, A1: 3 });
    expect(e.pageDuJourFaite).toBe(false);
    expect(etatCahier(plan, '2027-07-06', journees, '2027-07-07').pageDuJourFaite).toBe(true);
  });

  it('les séances d’avant le début ne comptent pas ; le cahier se termine', () => {
    const avant = [j('2027-07-01', 'F1'), j('2027-07-01', 'M1'), j('2027-07-01', 'H1')];
    expect(etatCahier(plan, '2027-07-06', avant, '2027-07-06').faites).toBe(0);
    const tout = plan.flatMap((page, i) => page.map((id) => j(`2027-07-1${i}`, id)));
    expect(etatCahier(plan, '2027-07-06', tout, '2027-07-20')).toMatchObject({ faites: 3, fini: true });
  });
});
