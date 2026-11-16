import { melanger, type Hasard, type Niveau } from './hasard';

// Mini-sudoku : grille 4×4 (blocs 2×2) ou 6×6 (blocs 2 lignes × 3 colonnes), solution unique.

export interface Sudoku {
  taille: 4 | 6;
  blocL: number;
  blocC: number;
  /** Grille de départ, ligne par ligne ; 0 = case vide. */
  depart: number[];
  solution: number[];
}

const PARAMETRES: Record<Niveau, { taille: 4 | 6; vides: number }> = {
  1: { taille: 4, vides: 7 },
  2: { taille: 6, vides: 16 },
  3: { taille: 6, vides: 22 },
};

export function dimensions(taille: 4 | 6) {
  return taille === 4 ? { blocL: 2, blocC: 2 } : { blocL: 2, blocC: 3 };
}

/** Valeurs possibles en case i. */
function possibles(g: number[], i: number, taille: number, blocL: number, blocC: number): number[] {
  const l = Math.floor(i / taille);
  const c = i % taille;
  const pris = new Set<number>();
  for (let k = 0; k < taille; k++) {
    pris.add(g[l * taille + k]!);
    pris.add(g[k * taille + c]!);
  }
  const l0 = l - (l % blocL);
  const c0 = c - (c % blocC);
  for (let a = 0; a < blocL; a++) for (let b = 0; b < blocC; b++) pris.add(g[(l0 + a) * taille + c0 + b]!);
  const r: number[] = [];
  for (let v = 1; v <= taille; v++) if (!pris.has(v)) r.push(v);
  return r;
}

/** Nombre de solutions (on s'arrête à `max`). */
export function compterSolutions(g0: number[], taille: number, blocL: number, blocC: number, max = 2): number {
  const g = [...g0];
  let n = 0;
  const resoudre = (): void => {
    if (n >= max) return;
    let meilleure = -1;
    let options: number[] = [];
    for (let i = 0; i < g.length; i++) {
      if (g[i] !== 0) continue;
      const p = possibles(g, i, taille, blocL, blocC);
      if (p.length === 0) return;
      if (meilleure < 0 || p.length < options.length) { meilleure = i; options = p; }
    }
    if (meilleure < 0) { n++; return; }
    for (const v of options) {
      g[meilleure] = v;
      resoudre();
      g[meilleure] = 0;
      if (n >= max) return;
    }
  };
  resoudre();
  return n;
}

function remplir(h: Hasard, taille: number, blocL: number, blocC: number): number[] {
  const g = new Array<number>(taille * taille).fill(0);
  const placer = (i: number): boolean => {
    if (i === g.length) return true;
    for (const v of melanger(h, possibles(g, i, taille, blocL, blocC))) {
      g[i] = v;
      if (placer(i + 1)) return true;
    }
    g[i] = 0;
    return false;
  };
  placer(0);
  return g;
}

export function sudoku(niveau: Niveau, h: Hasard): Sudoku {
  const { taille, vides } = PARAMETRES[niveau];
  const { blocL, blocC } = dimensions(taille);
  const solution = remplir(h, taille, blocL, blocC);
  const depart = [...solution];
  let retirees = 0;
  for (const i of melanger(h, solution.map((_, k) => k))) {
    if (retirees >= vides) break;
    const v = depart[i]!;
    depart[i] = 0;
    if (compterSolutions(depart, taille, blocL, blocC) === 1) retirees++;
    else depart[i] = v;
  }
  return { taille, blocL, blocC, depart, solution };
}

/** Cases en conflit (même valeur dans une ligne, une colonne ou un bloc). */
export function conflits(g: number[], taille: number, blocL: number, blocC: number): Set<number> {
  const r = new Set<number>();
  for (let i = 0; i < g.length; i++) {
    if (!g[i]) continue;
    for (let j = i + 1; j < g.length; j++) {
      if (g[j] !== g[i]) continue;
      const [li, ci, lj, cj] = [Math.floor(i / taille), i % taille, Math.floor(j / taille), j % taille];
      const memeBloc = Math.floor(li / blocL) === Math.floor(lj / blocL) && Math.floor(ci / blocC) === Math.floor(cj / blocC);
      if (li === lj || ci === cj || memeBloc) { r.add(i); r.add(j); }
    }
  }
  return r;
}
