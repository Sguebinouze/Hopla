import { describe, expect, it } from 'vitest';
import {
  CATEGORIES, THEMES_MOTS, avancer, intrus, labyrinthe, memoire, motsMeles, segment, solutionsSommes, sommes,
} from './autres';
import { hasard, niveauDe, type Niveau } from './hasard';
import { missionFaite, quizDuJour } from './regles';
import { suite } from './suites';
import { compterSolutions, conflits, sudoku } from './sudoku';

const NIVEAUX: Niveau[] = [1, 2, 3];
const GRAINES = Array.from({ length: 60 }, (_, i) => i * 7919 + 13);

describe('suites logiques', () => {
  it('la réponse est parmi les options, sans doublon, et prolonge la règle', () => {
    for (const n of NIVEAUX) for (const g of GRAINES) {
      const s = suite(n, hasard(g));
      expect(s.options).toContain(s.reponse);
      expect(new Set(s.options).size).toBe(s.options.length);
      expect(s.options.length).toBeGreaterThanOrEqual(3);
      expect(s.termes.length).toBeGreaterThanOrEqual(4);
      expect(s.regle.length).toBeGreaterThan(10);
      const nums = s.termes.map(Number);
      if (nums.every((x) => Number.isInteger(x))) {
        // Vérification indépendante des règles numériques simples.
        const tout = [...nums, Number(s.reponse)];
        const ecarts = tout.slice(1).map((x, i) => x - tout[i]!);
        const quotients = tout.slice(1).map((x, i) => x / tout[i]!);
        const sommeDesDeux = tout.slice(2).every((x, i) => x === tout[i]! + tout[i + 1]!);
        const ecartsSecond = ecarts.slice(1).map((x, i) => x - ecarts[i]!);
        const alterne = ecarts.every((e, i) => e === ecarts[i % 2]);
        const carres = tout.every((x) => Number.isInteger(Math.sqrt(x)));
        expect(
          ecarts.every((e) => e === ecarts[0]) || quotients.every((q) => q === quotients[0]) || sommeDesDeux
          || ecartsSecond.every((e) => e === ecartsSecond[0]) || alterne || carres,
        ).toBe(true);
      } else {
        // Motif de formes : la suite complète est périodique.
        const tout = [...s.termes, s.reponse];
        const periode = [2, 3].find((p) => tout.every((x, i) => i < p || x === tout[i - p]));
        expect(periode).toBeDefined();
      }
    }
  });
});

describe('mini-sudoku', () => {
  it('grille de départ à solution unique, solution valide et cohérente', () => {
    for (const n of NIVEAUX) for (const g of GRAINES.slice(0, 25)) {
      const s = sudoku(n, hasard(g));
      expect(s.solution.length).toBe(s.taille * s.taille);
      expect(conflits(s.solution, s.taille, s.blocL, s.blocC).size).toBe(0);
      expect(s.solution.every((v) => v >= 1 && v <= s.taille)).toBe(true);
      expect(s.depart.every((v, i) => v === 0 || v === s.solution[i])).toBe(true);
      expect(s.depart.filter((v) => v === 0).length).toBeGreaterThan(0);
      expect(compterSolutions(s.depart, s.taille, s.blocL, s.blocC)).toBe(1);
    }
  });
});

describe('mémoire', () => {
  it('chaque symbole apparait exactement deux fois', () => {
    for (const n of NIVEAUX) for (const g of GRAINES) {
      const cartes = memoire(n, hasard(g));
      const compte = new Map<string, number>();
      for (const c of cartes) compte.set(c, (compte.get(c) ?? 0) + 1);
      expect([...compte.values()].every((x) => x === 2)).toBe(true);
      expect(cartes.length).toBe(n === 1 ? 12 : n === 2 ? 16 : 20);
    }
  });
});

describe('intrus', () => {
  it('les catégories sont disjointes', () => {
    const vus = new Map<string, string>();
    for (const c of CATEGORIES) for (const e of c.elements) {
      expect(vus.get(e.toLowerCase()), `${e} dans ${c.nom} et ${vus.get(e.toLowerCase())}`).toBeUndefined();
      vus.set(e.toLowerCase(), c.nom);
    }
  });
  it('un seul intrus, les trois autres de la même catégorie ou multiples du même nombre', () => {
    for (const n of NIVEAUX) for (const g of GRAINES) {
      const x = intrus(n, hasard(g));
      expect(x.elements).toHaveLength(4);
      expect(new Set(x.elements).size).toBe(4);
      expect(x.elements).toContain(x.intrus);
      const autres = x.elements.filter((e) => e !== x.intrus);
      const k = x.explication.match(/multiples de (\d+)/)?.[1];
      if (k) {
        expect(autres.every((e) => Number(e) % Number(k) === 0)).toBe(true);
        expect(Number(x.intrus) % Number(k)).not.toBe(0);
      } else {
        const cat = CATEGORIES.find((c) => c.elements.includes(autres[0]!))!;
        expect(autres.every((e) => cat.elements.includes(e))).toBe(true);
        expect(cat.elements).not.toContain(x.intrus);
        expect(cat.niveau).toBeLessThanOrEqual(n);
      }
    }
  });
});

describe('labyrinthe', () => {
  it('parfait : toutes les cases reliées, un seul chemin (n − 1 passages)', () => {
    for (const n of NIVEAUX) for (const g of GRAINES.slice(0, 20)) {
      const lab = labyrinthe(n, hasard(g));
      const total = lab.largeur * lab.hauteur;
      let passages = 0;
      lab.murs.forEach((m, i) => {
        if (!m[1]) { passages++; expect(lab.murs[i + 1]![3]).toBe(false); }
        if (!m[2]) { passages++; expect(lab.murs[i + lab.largeur]![0]).toBe(false); }
      });
      expect(passages).toBe(total - 1);
      const vus = new Set([0]);
      const file = [0];
      while (file.length) {
        const i = file.shift()!;
        for (const d of [0, 1, 2, 3] as const) {
          const j = avancer(lab, i, d);
          if (!vus.has(j)) { vus.add(j); file.push(j); }
        }
      }
      expect(vus.size).toBe(total);
    }
  });
});

describe('sommes croisées', () => {
  it('sommes justes et une seule façon de compléter', () => {
    for (const n of NIVEAUX) for (const g of GRAINES.slice(0, 20)) {
      const s = sommes(n, hasard(g));
      for (let l = 0; l < s.taille; l++) expect(s.solution.slice(l * s.taille, (l + 1) * s.taille).reduce((a, b) => a + b)).toBe(s.lignes[l]);
      for (let c = 0; c < s.taille; c++) expect(s.solution.filter((_, i) => i % s.taille === c).reduce((a, b) => a + b)).toBe(s.colonnes[c]);
      expect(s.donnees.some((d) => !d)).toBe(true);
      expect(solutionsSommes(s, s.solution.map((v, i) => (s.donnees[i] ? v : 0)), 5)).toBe(1);
    }
  });
});

describe('mots mêlés', () => {
  it('chaque mot se lit à sa place, en ligne droite, et la grille ne contient que des majuscules', () => {
    for (const n of NIVEAUX) for (const g of GRAINES.slice(0, 30)) {
      const m = motsMeles(n, hasard(g));
      expect(m.lettres).toHaveLength(m.taille * m.taille);
      expect(m.lettres.every((x) => /^[A-Z]$/.test(x))).toBe(true);
      expect(m.mots.length).toBe(n === 1 ? 4 : n === 2 ? 6 : 8);
      for (const p of m.mots) {
        expect(p.cases.map((i) => m.lettres[i]).join('')).toBe(p.mot);
        expect(segment(m.taille, p.cases[0]!, p.cases.at(-1)!)).toEqual(p.cases);
        expect(THEMES_MOTS[n][m.theme]).toContain(p.mot);
      }
    }
  });
  it('les mots des thèmes sont en majuscules sans accent', () => {
    for (const n of NIVEAUX) for (const mots of Object.values(THEMES_MOTS[n])) for (const w of mots) expect(w).toMatch(/^[A-Z]+$/);
  });
});

describe('règles', () => {
  it('niveau selon la classe', () => {
    expect(['cp', 'ce2', 'cm1', '6e', '5e', '3e'].map(niveauDe)).toEqual([1, 1, 2, 2, 3, 3]);
  });
  it('mission faite après trois séries complètes du jour', () => {
    const j = (c: string, q: number) => ({ competence_id: c, questions: q });
    expect(missionFaite([j('a', 5), j('b', 5)], 10)).toBe(false);
    expect(missionFaite([j('a', 5), j('b', 5), j('c', 4)], 10)).toBe(false);
    expect(missionFaite([j('a', 5), j('b', 6), j('c', 5)], 10)).toBe(true);
    expect(missionFaite([j('a', 5)], 1)).toBe(true);
  });
  it('quiz du jour : stable pour un enfant et un jour, toute la banque avant une répétition', () => {
    const banque = Array.from({ length: 23 }, (_, i) => ({ id: `CG-C2-${String(i).padStart(3, '0')}`, question: `q${i}`, options: ['a', 'b', 'c'], reponse: 'a', explication: 'x' }));
    const q1 = quizDuJour(banque, 'enfant-1', '2026-11-17');
    expect(q1).toHaveLength(5);
    expect(quizDuJour(banque, 'enfant-1', '2026-11-17').map((q) => q.id)).toEqual(q1.map((q) => q.id));
    const vus = new Set<string>();
    for (let d = 0; d < 4; d++) for (const q of quizDuJour(banque, 'enfant-1', `2026-11-${17 + d}`)) vus.add(q.id);
    expect(vus.size).toBe(20);
    expect(q1.every((q) => q.options.includes(q.reponse))).toBe(true);
  });
});
