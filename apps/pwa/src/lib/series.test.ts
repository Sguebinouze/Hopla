import { describe, expect, it } from 'vitest';
import { aEviter } from '../pages/Exercice';
import { cleItem, empreinteQuestion, empreintesEssai, marquesDe, seriePour, supportDe, type CompetencePack } from './packs';

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

  // Leçon de 6e sur les fonctions : la question « À toi » vient d'une phrase que le générateur sait aussi poser.
  const ESSAI = 'Dans « Nous partirons demain », quelle est la fonction de « demain » ?';
  const fonctions = {
    id: 'FR-C3-6E-GRAM-01', titre: 'Fonctions', generateurs: ['fonctions-6e'], exercices: [
      { id: 'FR-C3-6E-GRAM-01-001', gabarit: 'qcm', difficulte: 1, consigne: 'Dans « Nous partirons demain. », quelle est la fonction de « demain » ?',
        options: ['COD', 'complément circonstanciel'], reponse: 'complément circonstanciel', indice: '', explication: '' },
    ],
    lecon: { exemple: '', regle: '', piege: null, essai: { consigne: ESSAI, options: [], reponse: '', explication: '' } },
  } as unknown as CompetencePack;

  it('la série ne reprend jamais la question « À toi » de la leçon, même reformulée par un générateur', () => {
    expect(empreintesEssai({ consigne: ESSAI, options: [] })).toContain('cite:nous partirons demain');
    for (let i = 0; i < 300; i++) {
      const s = seriePour(fonctions, 5, new Set(), aEviter(fonctions, []));
      expect(s.length).toBeGreaterThan(0);
      for (const it of s) expect(it.consigne).not.toMatch(/Nous partirons demain/);
    }
  });

  it('« Encore » : aucune question déjà posée dans la séance ne revient, puis plus de bouton', () => {
    let posees: string[] = [];
    let total = 0;
    for (let j = 0; j < 20; j++) {
      const s = seriePour(fonctions, 5, new Set(), aEviter(fonctions, posees));
      if (s.length === 0) break;
      for (const it of s) {
        expect(posees).not.toContain(empreinteQuestion(it));
        expect(it.consigne).not.toMatch(/Nous partirons demain/);
      }
      posees = [...posees, ...s.map(empreinteQuestion)];
      total += s.length;
    }
    // 24 phrases dans le générateur, moins celle de l'essai : la séance s'arrête quand tout a été posé.
    expect(total).toBeGreaterThan(15);
    expect(seriePour(fonctions, 5, new Set(), aEviter(fonctions, posees)).length).toBeLessThan(5);
  });
});

describe('consignes génériques', () => {
  it('une même consigne avec des dessins ou des options différents donne des questions distinctes', () => {
    const fractions = {
      id: 'MA-C2-CE1-FRAC-02', titre: 'Comparer des fractions', generateurs: ['fractions-comparer-ce1'], exercices: [],
      lecon: { exemple: '', regle: '', piege: null, essai: { consigne: 'Quelle fraction est la plus grande ?', options: ['1/4', '1/2', '1/10'], reponse: '1/2', explication: '' } },
    } as unknown as CompetencePack;
    const heures = { id: 'MA-C2-CP-TEMPS-01', titre: 'Heures', generateurs: ['heures-cp'], exercices: [], lecon: null } as unknown as CompetencePack;
    for (let i = 0; i < 50; i++) {
      expect(seriePour(fractions, 5, new Set(), aEviter(fractions, []))).toHaveLength(5);
      const s = seriePour(heures, 5);
      expect(s).toHaveLength(5);
      expect(new Set(s.map(empreinteQuestion)).size).toBe(5);
    }
  });
});
