import { describe, expect, it } from 'vitest';
import { cleItem, marquesDe, seriePour, supportDe, type CompetencePack } from './packs';

const lecture = {
  id: 'FR-C2-CE1-LECT-01', titre: 'Comprendre un texte', generateurs: ['lecture-ce1'], exercices: [],
} as unknown as CompetencePack;

describe('séries de questions', () => {
  it('jamais deux fois la même question, même avec les options dans un autre ordre', () => {
    for (let i = 0; i < 200; i++) {
      const s = seriePour(lecture, 5);
      expect(s).toHaveLength(5);
      expect(new Set(s.map(cleItem)).size).toBe(5);
    }
  });

  it('jamais deux fois le même texte à lire dans une série', () => {
    for (let i = 0; i < 200; i++) {
      const textes = seriePour(lecture, 5).map((it) => supportDe(it.consigne));
      expect(textes.every(Boolean)).toBe(true);
      expect(new Set(textes).size).toBe(5);
    }
  });

  it('la série suivante évite les textes des séries récentes', () => {
    for (let i = 0; i < 50; i++) {
      const recentes = new Set<string>();
      const deja = new Set<string>();
      for (let j = 0; j < 4; j++) {
        const s = seriePour(lecture, 5, recentes);
        for (const it of s) {
          const t = supportDe(it.consigne)!;
          expect(deja.has(t)).toBe(false);
          deja.add(t);
        }
        for (const m of marquesDe(s)) recentes.add(m);
      }
    }
  });

  it('banque rédigée seule : pas de doublon, série complète si la banque suffit', () => {
    const exercices = Array.from({ length: 8 }, (_, i) => ({
      id: `X-${i}`, gabarit: 'qcm', consigne: `Question ${i}`, options: ['a', 'b', 'c'], reponse: 'a',
      indice: '', explication: '', difficulte: ((i % 3) + 1) as 1 | 2 | 3, statut: 'publie',
    }));
    const c = { id: 'X', titre: 'X', generateurs: [], exercices } as unknown as CompetencePack;
    for (let i = 0; i < 100; i++) {
      const s = seriePour(c, 5, new Set(exercices.slice(0, 4).map((e) => cleItem(e as never))));
      expect(new Set(s.map((x) => x.consigne)).size).toBe(5);
    }
  });
});
