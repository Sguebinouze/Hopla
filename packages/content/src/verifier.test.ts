import { describe, expect, it } from 'vitest';
import { anneeScolaire, couvre } from './annees';
import { chargerContenu, type Contenu } from './charger';
import { construirePacks } from './packs';
import { programmesApplicables, verifierContenu } from './verifier';

const { contenu, erreurs } = chargerContenu();
const clone = (): Contenu => structuredClone(contenu);
const erreursDe = (c: Contenu) => verifierContenu(c).filter((x) => x.niveau === 'erreur');

describe('contenu du dépôt', () => {
  it('se charge sans erreur de schéma', () => {
    expect(erreurs).toEqual([]);
  });

  it('ne contient aucune erreur bloquante', () => {
    expect(erreursDe(contenu)).toEqual([]);
  });
});

describe('calendrier des programmes', () => {
  it('bascule la 5e sur le nouveau programme de maths en 2026-2027', () => {
    expect(programmesApplicables(contenu.programmes, '5e', '2025-2026', 'mathematiques').map((p) => p.id)).toEqual(['MA-C4-2020']);
    expect(programmesApplicables(contenu.programmes, '5e', '2026-2027', 'mathematiques').map((p) => p.id)).toEqual(['MA-C4-2026']);
  });

  it('garde l’ancien programme en 4e jusqu’en 2026-2027', () => {
    expect(programmesApplicables(contenu.programmes, '4e', '2026-2027', 'francais').map((p) => p.id)).toEqual(['FR-C4-2020']);
    expect(programmesApplicables(contenu.programmes, '4e', '2027-2028', 'francais').map((p) => p.id)).toEqual(['FR-C4-2026']);
  });

  it('détecte un chevauchement de programmes', () => {
    const c = clone();
    c.programmes.find((p) => p.id === 'MA-C4-2020')!.application.find((a) => a.classe === '5e')!.fin = null;
    expect(erreursDe(c).some((e) => e.message.includes('2 programmes pour 5e'))).toBe(true);
  });

  it('calcule l’année scolaire à partir de la rentrée de septembre', () => {
    expect(anneeScolaire(new Date('2026-11-15'))).toBe('2026-2027');
    expect(anneeScolaire(new Date('2027-06-30'))).toBe('2026-2027');
    expect(anneeScolaire(new Date('2027-09-01'))).toBe('2027-2028');
    expect(couvre('2026-2027', '2025-2026', null)).toBe(true);
  });
});

describe('intégrité des références', () => {
  it('refuse un exercice dont la réponse n’est pas dans les options', () => {
    const c = clone();
    c.banques[0]!.exercices[0]!.reponse = 'jouons';
    expect(erreursDe(c).some((e) => e.message.includes('ne fait pas partie des options'))).toBe(true);
  });

  it('refuse un exercice qui enfreint les règles de rédaction du cycle', () => {
    const c = clone();
    c.banques[0]!.exercices[0]!.explication = 'Bien sûr, voici la réponse fascinante : jouent.';
    expect(erreursDe(c).length).toBeGreaterThan(0);
  });

  it('refuse une compétence vérifiée sans page ni extrait de la source', () => {
    const c = clone();
    const comp = c.referentiels[0]!.competences[0]!;
    comp.statut = 'verifie';
    comp.source = { ...comp.source, page: null, extrait: null };
    expect(erreursDe(c).some((e) => e.message.includes('citer la page'))).toBe(true);
  });

  it('refuse un générateur rattaché à une compétence absente du référentiel', () => {
    const c = clone();
    c.referentiels = c.referentiels.filter((r) => r.programme !== 'MA-C4-2026');
    expect(erreursDe(c).some((e) => e.ou === 'générateur addition-relatifs')).toBe(true);
  });
});

describe('packs', () => {
  it('n’embarque que les exercices publiés, sauf demande explicite', () => {
    const ce2 = (brouillons: boolean) =>
      construirePacks(contenu, '2026-2027', { brouillons }).find((p) => p.classe === 'ce2')!;
    const nb = (b: boolean) =>
      ce2(b).matieres.flatMap((m) => m.competences).reduce((n, c) => n + c.exercices.length, 0);
    expect(nb(false)).toBe(0);
    expect(nb(true)).toBe(3);
    expect(ce2(false).matieres.map((m) => m.programme.id).sort()).toEqual(['FR-C2-2024', 'MA-C2-2024']);
  });
});
