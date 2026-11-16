import { choisir, entre, melanger, type Hasard, type Niveau } from './hasard';

// Suites logiques : trouver le terme suivant. Chaque suite porte sa règle, rédigée pour l'enfant.

export interface Suite {
  termes: string[];
  reponse: string;
  options: string[];
  regle: string;
}

const FORMES = ['●', '▲', '■', '★', '◆'] as const;

/** Construit une suite numérique à partir d'une fonction terme(n), n = 0, 1, 2… */
function numerique(h: Hasard, terme: (n: number) => number, longueur: number, regle: string, ecarts: number[]): Suite {
  const valeurs = Array.from({ length: longueur + 1 }, (_, n) => terme(n));
  const reponse = valeurs[longueur]!;
  const pieges = new Set<number>();
  for (const e of melanger(h, ecarts)) {
    if (pieges.size >= 3) break;
    const v = reponse + e;
    if (v !== reponse && v >= 0 && !pieges.has(v)) pieges.add(v);
  }
  for (let k = 1; pieges.size < 3; k++) {
    for (const v of [reponse + k, reponse - k]) if (pieges.size < 3 && v >= 0 && v !== reponse) pieges.add(v);
  }
  return {
    termes: valeurs.slice(0, longueur).map(String),
    reponse: String(reponse),
    options: melanger(h, [String(reponse), ...[...pieges].map(String)]),
    regle,
  };
}

function motif(h: Hasard): Suite {
  const [a, b, c] = melanger(h, FORMES);
  const modeles: [string[], string][] = [
    [[a!, b!], 'Le motif se répète : deux formes à tour de rôle.'],
    [[a!, b!, c!], 'Le motif se répète : trois formes dans le même ordre.'],
    [[a!, a!, b!], 'Le motif se répète : deux fois la même forme, puis une autre.'],
    [[a!, b!, b!], 'Le motif se répète : une forme, puis deux fois la même.'],
  ];
  const [m, regle] = choisir(h, modeles);
  const longueur = m.length * 2 + entre(h, 0, m.length - 1);
  const suite = Array.from({ length: longueur + 1 }, (_, i) => m[i % m.length]!);
  const reponse = suite[longueur]!;
  const autres = melanger(h, FORMES.filter((f) => f !== reponse)).slice(0, 2);
  return { termes: suite.slice(0, longueur), reponse, options: melanger(h, [reponse, ...autres]), regle };
}

export function suite(niveau: Niveau, h: Hasard): Suite {
  if (niveau === 1) {
    if (h() < 0.4) return motif(h);
    const pas = entre(h, 1, 5);
    const debut = entre(h, 0, 10);
    if (h() < 0.25) {
      const haut = entre(h, 4 * pas + 2, 4 * pas + 20);
      return numerique(h, (n) => haut - pas * n, 4, `On enlève ${pas} à chaque fois.`, [1, -1, 2, -2, pas, -pas]);
    }
    return numerique(h, (n) => debut + pas * n, 4, `On ajoute ${pas} à chaque fois.`, [1, -1, 2, -2, pas, -pas]);
  }
  if (niveau === 2) {
    const sorte = entre(h, 0, 3);
    if (sorte === 0) {
      const pas = entre(h, 3, 12);
      const debut = entre(h, 1, 30);
      return numerique(h, (n) => debut + pas * n, 4, `On ajoute ${pas} à chaque fois.`, [1, -1, 10, -10, pas, -pas]);
    }
    if (sorte === 1) {
      const k = choisir(h, [2, 3]);
      const debut = entre(h, 1, 5);
      return numerique(h, (n) => debut * k ** n, 4, `On multiplie par ${k} à chaque fois.`, [1, -1, debut * k ** 3, -debut * k ** 3, 2, -2]);
    }
    if (sorte === 2) {
      const a = entre(h, 2, 6);
      const b = entre(h, 1, 4);
      const debut = entre(h, 1, 15);
      const t = (n: number) => debut + Math.ceil(n / 2) * a - Math.floor(n / 2) * b;
      return numerique(h, t, 5, `On ajoute ${a}, puis on enlève ${b}, et ainsi de suite.`, [a, -a, b, -b, a - b, 1]);
    }
    const debut = entre(h, 1, 10);
    return numerique(h, (n) => debut + (n * (n + 1)) / 2, 5, 'On ajoute 1, puis 2, puis 3… un de plus à chaque fois.', [1, -1, 2, -2, 5, -3]);
  }
  const sorte = entre(h, 0, 4);
  if (sorte === 0) {
    const debut = entre(h, 1, 4);
    return numerique(h, (n) => (n + debut) ** 2, 4, 'Ce sont des carrés : 1×1, 2×2, 3×3…', [1, -1, 2 * (4 + debut), -(2 * (4 + debut) - 1), 10, -10]);
  }
  if (sorte === 1) {
    const a = entre(h, 1, 4);
    const b = entre(h, 1, 4);
    const t: number[] = [a, b];
    for (let i = 2; i <= 6; i++) t.push(t[i - 1]! + t[i - 2]!);
    return numerique(h, (n) => t[n]!, 6, 'Chaque nombre est la somme des deux précédents.', [1, -1, t[5]!, -t[4]!, 2, -2]);
  }
  if (sorte === 2) {
    const k = choisir(h, [2, 3, 4]);
    const debut = entre(h, 1, 3);
    return numerique(h, (n) => debut * k ** n, 4, `On multiplie par ${k} à chaque fois.`, [1, -1, debut * k ** 3, -debut * k ** 3, 4, -4]);
  }
  if (sorte === 3) {
    const pas = entre(h, 3, 9);
    const haut = entre(h, 60, 120);
    return numerique(h, (n) => haut - pas * n, 5, `On enlève ${pas} à chaque fois.`, [1, -1, pas, -pas, 10, -10]);
  }
  const debut = entre(h, 1, 5);
  return numerique(h, (n) => 2 * (debut + n) - 1, 5, 'Ce sont des nombres impairs qui se suivent.', [1, -1, 2, -2, 4, -4]);
}
