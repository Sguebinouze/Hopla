import { describe, expect, it } from 'vitest';
import { ACCESSOIRES, COULEURS_OCTAVE, ecrireApparence, lireApparence, niveauDe } from './apparence';
import type { CompetencePack, Defi, Pack } from './packs';
import type { Suivi } from './progression';
import { trophees } from './trophees';

const notion = (id: string) => ({ id } as CompetencePack);
const pack = {
  annee: '2026-2027', classe: 'ce1', cycle: 2,
  defis: [{ id: 'tables', objectif: 20 } as Defi, { id: 'lecture', objectif: null } as Defi],
  matieres: [
    { matiere: 'francais', programme: {} as Pack['matieres'][0]['programme'], competences: ['F1', 'F2'].map(notion) },
    { matiere: 'mathematiques', programme: {} as Pack['matieres'][0]['programme'], competences: ['M1'].map(notion) },
    { matiere: 'langues-vivantes', programme: {} as Pack['matieres'][0]['programme'], competences: ['L1'].map(notion) },
  ],
} as Pack;
const s = (score: number) => ({ score } as Suivi);
const gagnes = (t: ReturnType<typeof trophees>) => t.filter((x) => x.gagne).map((x) => x.id);

describe('trophées', () => {
  it('rien de gagné au départ, avancement nul', () => {
    const t = trophees(0, {}, pack, {});
    expect(gagnes(t)).toEqual([]);
    expect(t.map((x) => x.id)).toContain('anglais');
    expect(t.every((x) => x.part === 0 || x.id.startsWith('niveau'))).toBe(true);
  });

  it('notions acquises au seuil, par matière ; les notions d’une autre classe ne comptent pas', () => {
    const t = trophees(0, { F1: s(0.9), M1: s(0.85), L1: s(0.95), F2: s(0.84), AUTRE: s(1) }, pack, {});
    expect(gagnes(t)).toEqual(['premiere-notion', 'trois-matieres', 'anglais']);
    expect(t.find((x) => x.id === 'dix-notions')!.part).toBeCloseTo(0.3);
  });

  it('niveaux et défis', () => {
    const t = trophees(800, {}, pack, { tables: 20, lecture: 3 });
    expect(gagnes(t)).toEqual(['niveau-5', 'premier-defi', 'objectif-defi']);
    expect(gagnes(trophees(799, {}, pack, { tables: 19 }))).toEqual(['premier-defi']);
  });
});

describe('apparence d’Octave', () => {
  it('niveau : 200 XP par niveau, à partir de 1', () => {
    expect([0, 199, 200, 1999].map(niveauDe)).toEqual([1, 1, 2, 10]);
  });

  it('lecture tolérante : valeur absente ou inconnue donne l’Octave d’origine', () => {
    expect(lireApparence(null)).toEqual({ couleur: 'turquoise', accessoire: 'aucun' });
    expect(lireApparence('rose.cape')).toEqual({ couleur: 'turquoise', accessoire: 'aucun' });
    expect(lireApparence(ecrireApparence({ couleur: 'or', accessoire: 'couronne' }))).toEqual({ couleur: 'or', accessoire: 'couronne' });
  });

  it('identifiants conformes au format de la base, un seul élément offert au niveau 1', () => {
    for (const x of [...COULEURS_OCTAVE, ...ACCESSOIRES]) expect(x.id).toMatch(/^[a-z]{1,12}$/);
    expect(COULEURS_OCTAVE.filter((c) => c.niveau === 1)).toHaveLength(1);
    expect(ACCESSOIRES.filter((c) => c.niveau === 1).map((a) => a.id)).toEqual(['aucun']);
  });
});
