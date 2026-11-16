import { choisir, entre, melanger, type Hasard, type Niveau } from './hasard';

// ─────────────────────────────────────────── Mémoire : retrouver les paires

export const SYMBOLES_MEMOIRE = [
  'soleil', 'lune', 'nuage', 'flamme', 'eclair', 'ampoule', 'livre', 'coupe', 'feuille', 'globe', 'atome', 'plume',
] as const;
export type SymboleMemoire = (typeof SYMBOLES_MEMOIRE)[number];

export function memoire(niveau: Niveau, h: Hasard): SymboleMemoire[] {
  const paires = niveau === 1 ? 6 : niveau === 2 ? 8 : 10;
  const choisis = melanger(h, SYMBOLES_MEMOIRE).slice(0, paires);
  return melanger(h, [...choisis, ...choisis]);
}

// ─────────────────────────────────────────── Intrus : trois éléments d'une catégorie, un d'une autre

export interface Categorie { nom: string; elements: string[]; niveau: Niveau }

/** Catégories disjointes : aucun mot n'appartient à deux catégories (vérifié par les tests). */
export const CATEGORIES: Categorie[] = [
  { nom: 'des fruits', niveau: 1, elements: ['pomme', 'banane', 'fraise', 'cerise', 'poire', 'kiwi', 'abricot', 'raisin'] },
  { nom: 'des légumes', niveau: 1, elements: ['carotte', 'poireau', 'haricot vert', 'courgette', 'radis', 'navet', 'épinard', 'chou'] },
  { nom: 'des animaux de la ferme', niveau: 1, elements: ['vache', 'cochon', 'mouton', 'chèvre', 'âne', 'cheval', 'taureau', 'lapin'] },
  { nom: 'des animaux sauvages d’Afrique', niveau: 1, elements: ['lion', 'girafe', 'zèbre', 'éléphant', 'hippopotame', 'guépard', 'rhinocéros', 'gorille'] },
  { nom: 'des vêtements', niveau: 1, elements: ['pantalon', 'chemise', 'pull', 'jupe', 'manteau', 'robe', 'short', 'écharpe'] },
  { nom: 'des instruments de musique', niveau: 1, elements: ['piano', 'violon', 'guitare', 'flûte', 'tambour', 'trompette', 'harpe', 'xylophone'] },
  { nom: 'des moyens de transport', niveau: 1, elements: ['train', 'avion', 'bateau', 'vélo', 'voiture', 'bus', 'métro', 'camion'] },
  { nom: 'des couleurs', niveau: 1, elements: ['rouge', 'bleu', 'jaune', 'vert', 'violet', 'rose', 'noir', 'blanc'] },
  { nom: 'des oiseaux', niveau: 2, elements: ['moineau', 'aigle', 'pigeon', 'merle', 'mésange', 'hibou', 'corbeau', 'pie'] },
  { nom: 'des insectes', niveau: 2, elements: ['fourmi', 'abeille', 'coccinelle', 'papillon', 'mouche', 'sauterelle', 'libellule', 'moustique'] },
  { nom: 'des planètes', niveau: 2, elements: ['Mercure', 'Vénus', 'Mars', 'Jupiter', 'Saturne', 'Uranus', 'Neptune'] },
  { nom: 'des pays d’Europe', niveau: 2, elements: ['France', 'Italie', 'Espagne', 'Allemagne', 'Belgique', 'Portugal', 'Grèce', 'Suède'] },
  { nom: 'des sports collectifs', niveau: 2, elements: ['football', 'rugby', 'basket', 'handball', 'volley', 'hockey', 'water-polo'] },
  { nom: 'des outils', niveau: 2, elements: ['marteau', 'scie', 'tournevis', 'pince', 'clé à molette', 'perceuse', 'rabot'] },
  { nom: 'des fleuves de France', niveau: 2, elements: ['Loire', 'Seine', 'Rhône', 'Garonne'] },
  { nom: 'des mammifères marins', niveau: 3, elements: ['dauphin', 'baleine', 'phoque', 'orque', 'morse', 'otarie', 'lamantin', 'cachalot'] },
  { nom: 'des capitales d’Europe', niveau: 3, elements: ['Paris', 'Rome', 'Madrid', 'Berlin', 'Lisbonne', 'Vienne', 'Athènes', 'Varsovie'] },
  { nom: 'des continents', niveau: 3, elements: ['Afrique', 'Asie', 'Europe', 'Amérique', 'Océanie', 'Antarctique'] },
  { nom: 'des organes du corps humain', niveau: 3, elements: ['cœur', 'foie', 'poumon', 'estomac', 'rein', 'cerveau', 'intestin'] },
  { nom: 'des peintres', niveau: 3, elements: ['Monet', 'Picasso', 'Van Gogh', 'Cézanne', 'Matisse', 'Renoir', 'Delacroix'] },
  { nom: 'des écrivains', niveau: 3, elements: ['Victor Hugo', 'Molière', 'Jules Verne', 'Zola', 'Balzac', 'Racine', 'Maupassant'] },
  { nom: 'des gaz', niveau: 3, elements: ['dioxygène', 'diazote', 'hélium', 'méthane', 'dihydrogène', 'néon'] },
];

export interface Intrus { elements: string[]; intrus: string; explication: string }

function intrusNombres(niveau: Niveau, h: Hasard): Intrus {
  const k = niveau === 2 ? choisir(h, [2, 5, 10]) : choisir(h, [3, 4, 6, 7, 9]);
  const multiples = new Set<number>();
  while (multiples.size < 3) multiples.add(k * entre(h, 2, niveau === 2 ? 12 : 15));
  let autre = 0;
  while (autre === 0 || autre % k === 0) autre = entre(h, k + 1, k * (niveau === 2 ? 12 : 15));
  return {
    elements: melanger(h, [...[...multiples].map(String), String(autre)]),
    intrus: String(autre),
    explication: `Les autres sont des multiples de ${k}. ${autre} n’est pas dans la table de ${k}.`,
  };
}

export function intrus(niveau: Niveau, h: Hasard): Intrus {
  if (niveau > 1 && h() < 0.3) return intrusNombres(niveau, h);
  const possibles = CATEGORIES.filter((c) => c.niveau <= niveau && c.elements.length >= 3);
  const a = choisir(h, possibles);
  const b = choisir(h, CATEGORIES.filter((c) => c !== a && c.niveau <= niveau));
  const trois = melanger(h, a.elements).slice(0, 3);
  const x = choisir(h, b.elements);
  return { elements: melanger(h, [...trois, x]), intrus: x, explication: `Les autres sont ${a.nom}. « ${x} » fait partie ${b.nom}.` };
}

// ─────────────────────────────────────────── Labyrinthe parfait (un seul chemin entre deux cases)

export interface Labyrinthe {
  largeur: number;
  hauteur: number;
  /** Murs de chaque case : [haut, droite, bas, gauche]. */
  murs: [boolean, boolean, boolean, boolean][];
}

export function labyrinthe(niveau: Niveau, h: Hasard): Labyrinthe {
  const n = niveau === 1 ? 6 : niveau === 2 ? 9 : 12;
  const murs = Array.from({ length: n * n }, () => [true, true, true, true] as [boolean, boolean, boolean, boolean]);
  const vu = new Array<boolean>(n * n).fill(false);
  const pile = [0];
  vu[0] = true;
  const DIRS = [[-1, 0, 0, 2], [0, 1, 1, 3], [1, 0, 2, 0], [0, -1, 3, 1]] as const;
  while (pile.length) {
    const i = pile[pile.length - 1]!;
    const l = Math.floor(i / n);
    const c = i % n;
    const voisins = DIRS.filter(([dl, dc]) => {
      const nl = l + dl;
      const nc = c + dc;
      return nl >= 0 && nl < n && nc >= 0 && nc < n && !vu[nl * n + nc];
    });
    if (!voisins.length) { pile.pop(); continue; }
    const [dl, dc, m, mOppose] = choisir(h, voisins);
    const j = (l + dl) * n + c + dc;
    murs[i]![m] = false;
    murs[j]![mOppose] = false;
    vu[j] = true;
    pile.push(j);
  }
  return { largeur: n, hauteur: n, murs };
}

/** Case voisine si aucun mur ne bloque, sinon la case elle-même. dir : 0 haut, 1 droite, 2 bas, 3 gauche. */
export function avancer(lab: Labyrinthe, i: number, dir: 0 | 1 | 2 | 3): number {
  if (lab.murs[i]![dir]) return i;
  return i + [-lab.largeur, 1, lab.largeur, -1][dir]!;
}

// ─────────────────────────────────────────── Sommes croisées : retrouver les chiffres d'après les sommes

export interface Sommes {
  taille: number;
  max: number;
  solution: number[];
  /** Cases données au départ. */
  donnees: boolean[];
  lignes: number[];
  colonnes: number[];
}

const PARAM_SOMMES: Record<Niveau, { taille: number; max: number; cachees: number }> = {
  1: { taille: 2, max: 5, cachees: 2 },
  2: { taille: 3, max: 9, cachees: 4 },
  3: { taille: 3, max: 9, cachees: 5 },
};

/** Nombre de façons de remplir les cases cachées (arrêt à `max`). */
export function solutionsSommes(s: Omit<Sommes, 'solution'> & { solution?: number[] }, connues: number[], max = 2): number {
  const g = [...connues];
  const cachees = s.donnees.flatMap((d, i) => (d ? [] : [i]));
  let n = 0;
  const essayer = (k: number): void => {
    if (n >= max) return;
    if (k === cachees.length) {
      for (let l = 0; l < s.taille; l++) {
        let t = 0;
        for (let c = 0; c < s.taille; c++) t += g[l * s.taille + c]!;
        if (t !== s.lignes[l]) return;
      }
      for (let c = 0; c < s.taille; c++) {
        let t = 0;
        for (let l = 0; l < s.taille; l++) t += g[l * s.taille + c]!;
        if (t !== s.colonnes[c]) return;
      }
      n++;
      return;
    }
    const i = cachees[k]!;
    for (let v = 1; v <= s.max; v++) {
      g[i] = v;
      essayer(k + 1);
    }
    g[i] = 0;
  };
  essayer(0);
  return n;
}

export function sommes(niveau: Niveau, h: Hasard): Sommes {
  const { taille, max, cachees } = PARAM_SOMMES[niveau];
  for (;;) {
    const solution = Array.from({ length: taille * taille }, () => entre(h, 1, max));
    const lignes = Array.from({ length: taille }, (_, l) => solution.slice(l * taille, (l + 1) * taille).reduce((a, b) => a + b, 0));
    const colonnes = Array.from({ length: taille }, (_, c) => solution.filter((_, i) => i % taille === c).reduce((a, b) => a + b, 0));
    const masque = new Set(melanger(h, solution.map((_, i) => i)).slice(0, cachees));
    const donnees = solution.map((_, i) => !masque.has(i));
    const s = { taille, max, solution, donnees, lignes, colonnes };
    const connues = solution.map((v, i) => (donnees[i] ? v : 0));
    if (solutionsSommes(s, connues) === 1) return s;
  }
}

// ─────────────────────────────────────────── Mots mêlés

export const THEMES_MOTS: Record<Niveau, Record<string, string[]>> = {
  1: {
    'Les animaux': ['CHAT', 'CHIEN', 'LAPIN', 'VACHE', 'POULE', 'LION', 'OURS', 'LOUP'],
    'Les fruits': ['POMME', 'POIRE', 'KIWI', 'FRAISE', 'CERISE', 'PRUNE', 'MELON', 'FIGUE'],
    'L’école': ['STYLO', 'LIVRE', 'COLLE', 'CRAIE', 'GOMME', 'REGLE', 'CAHIER', 'TABLE'],
  },
  2: {
    'Les planètes': ['MERCURE', 'VENUS', 'TERRE', 'MARS', 'JUPITER', 'SATURNE', 'URANUS', 'NEPTUNE'],
    'Les sports': ['FOOTBALL', 'RUGBY', 'TENNIS', 'JUDO', 'BASKET', 'NATATION', 'ESCRIME', 'BOXE'],
    'La météo': ['PLUIE', 'NEIGE', 'ORAGE', 'SOLEIL', 'NUAGE', 'VENT', 'GRELE', 'BRUME'],
  },
  3: {
    'Les sciences': ['ATOME', 'CELLULE', 'ENERGIE', 'GALAXIE', 'MOLECULE', 'PLANETE', 'ORBITE', 'NEURONE'],
    'Les arts': ['PEINTURE', 'SCULPTURE', 'MUSIQUE', 'THEATRE', 'DANSE', 'CINEMA', 'POESIE', 'OPERA'],
    'La géographie': ['FLEUVE', 'MONTAGNE', 'DESERT', 'OCEAN', 'VOLCAN', 'GLACIER', 'PLAINE', 'ARCHIPEL'],
  },
};

export interface MotPlace { mot: string; cases: number[] }
export interface MotsMeles { taille: number; lettres: string[]; mots: MotPlace[]; theme: string }

export function motsMeles(niveau: Niveau, h: Hasard): MotsMeles {
  const taille = niveau === 1 ? 7 : niveau === 2 ? 9 : 11;
  const nombre = niveau === 1 ? 4 : niveau === 2 ? 6 : 8;
  const directions: [number, number][] = niveau === 3 ? [[0, 1], [1, 0], [1, 1]] : [[0, 1], [1, 0]];
  const theme = choisir(h, Object.keys(THEMES_MOTS[niveau]));
  for (;;) {
    const grille = new Array<string>(taille * taille).fill('');
    const mots: MotPlace[] = [];
    for (const mot of melanger(h, THEMES_MOTS[niveau][theme]!)) {
      if (mots.length >= nombre) break;
      if (mot.length > taille) continue;
      for (let essai = 0; essai < 60; essai++) {
        const [dl, dc] = choisir(h, directions);
        const l0 = entre(h, 0, taille - 1 - dl * (mot.length - 1));
        const c0 = entre(h, 0, taille - 1 - dc * (mot.length - 1));
        const cases = [...mot].map((_, k) => (l0 + dl * k) * taille + c0 + dc * k);
        if (cases.every((i, k) => grille[i] === '' || grille[i] === mot[k])) {
          cases.forEach((i, k) => { grille[i] = mot[k]!; });
          mots.push({ mot, cases });
          break;
        }
      }
    }
    if (mots.length < nombre) continue;
    const ALPHABET = 'ABCDEFGHIJKLMNOPRSTUVE';
    const lettres = grille.map((x) => x || ALPHABET[Math.floor(h() * ALPHABET.length)]!);
    return { taille, lettres, mots, theme };
  }
}

/** Cases d'un segment droit (horizontal, vertical ou diagonal) entre deux cases, sinon null. */
export function segment(taille: number, a: number, b: number): number[] | null {
  const [la, ca, lb, cb] = [Math.floor(a / taille), a % taille, Math.floor(b / taille), b % taille];
  const dl = Math.sign(lb - la);
  const dc = Math.sign(cb - ca);
  const n = Math.max(Math.abs(lb - la), Math.abs(cb - ca));
  if (!(la === lb || ca === cb || Math.abs(lb - la) === Math.abs(cb - ca))) return null;
  return Array.from({ length: n + 1 }, (_, k) => (la + dl * k) * taille + ca + dc * k);
}
