/** Correction d'une dictée : alignement mot à mot du texte tapé sur le texte de référence. */

export type TypeEcart = 'juste' | 'majuscule' | 'accent' | 'accord' | 'orthographe' | 'oubli' | 'ajout' | 'ponctuation';

export interface MotCorrige {
  /** Mot ou signe du texte de référence (absent pour un mot en trop). */
  attendu?: string;
  /** Ce que l'enfant a tapé à cette place (absent pour un oubli). */
  saisi?: string;
  type: TypeEcart;
}

export interface Correction {
  mots: MotCorrige[];
  /** Nombre de mots et signes du texte de référence. */
  total: number;
  erreurs: number;
  /** Erreurs par type, pour le suivi parent. */
  parType: Partial<Record<TypeEcart, number>>;
  reussi: boolean;
}

/** Une faute pour dix mots au plus. */
export const PART_ERREURS_MAX = 0.1;

const PONCTUATION = /^[,.;:?!…«»]$/u;

/** Apostrophes, points de suspension et espaces ramenés à une seule forme. */
function normaliser(texte: string): string {
  return texte
    .replace(/[  ]/g, ' ')
    .replace(/['ʼ‘]/g, '’')
    .replace(/\.\.\./g, '…')
    .replace(/[‐‑–]/g, '-');
}

export function mots(texte: string): string[] {
  return normaliser(texte).match(/[\p{L}\p{N}’-]+|[,.;:?!…«»]/gu) ?? [];
}

const sansAccent = (m: string) => m.normalize('NFD').replace(/\p{M}/gu, '').normalize('NFC');

// Fins de mots qui portent l'accord ou la terminaison verbale.
const FINS = new Set(['', 's', 'x', 'e', 'es', 'nt', 'ent', 't', 'é', 'ée', 'és', 'ées', 'er', 'ez', 'ai', 'ais', 'ait', 'aient']);

function typeEcart(attendu: string, saisi: string): TypeEcart {
  if (attendu === saisi) return 'juste';
  if (PONCTUATION.test(attendu) || PONCTUATION.test(saisi)) return 'ponctuation';
  if (attendu.toLowerCase() === saisi.toLowerCase()) return 'majuscule';
  const a = attendu.toLowerCase();
  const s = saisi.toLowerCase();
  if (sansAccent(a) === sansAccent(s)) return 'accent';
  let i = 0;
  while (i < a.length && i < s.length && a[i] === s[i]) i++;
  // Même radical, fins différentes parmi celles de l'accord (chantez, chanter ; petite, petites).
  for (let k = i; k >= 2 && i - k <= 2; k--) if (FINS.has(a.slice(k)) && FINS.has(s.slice(k))) return 'accord';
  return 'orthographe';
}

function distance(a: string, b: string): number {
  const d = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let diag = d[0]!;
    d[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const haut = d[j]!;
      d[j] = Math.min(d[j]! + 1, d[j - 1]! + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = haut;
    }
  }
  return d[b.length]!;
}

/** Coût de remplacer un mot par un autre : bas si c'est le même mot mal écrit, pour bien aligner. */
function cout(attendu: string, saisi: string): number {
  if (attendu === saisi) return 0;
  const t = typeEcart(attendu, saisi);
  if (t === 'ponctuation') return PONCTUATION.test(attendu) && PONCTUATION.test(saisi) ? 0.5 : 2;
  if (t !== 'orthographe') return 0.3;
  const a = sansAccent(attendu.toLowerCase());
  const s = sansAccent(saisi.toLowerCase());
  return distance(a, s) <= Math.max(a.length, s.length) / 2 ? 0.7 : 1.5;
}

export function corriger(reference: string, saisie: string): Correction {
  const ref = mots(reference);
  const tape = mots(saisie);
  const n = ref.length;
  const m = tape.length;
  // Distance d'édition pondérée entre les deux suites de mots.
  const c: number[][] = Array.from({ length: n + 1 }, (_, i) => Array.from({ length: m + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      c[i]![j] = Math.min(c[i - 1]![j]! + 1, c[i]![j - 1]! + 1, c[i - 1]![j - 1]! + cout(ref[i - 1]!, tape[j - 1]!));
    }
  }
  const sortie: MotCorrige[] = [];
  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && c[i]![j] === c[i - 1]![j - 1]! + cout(ref[i - 1]!, tape[j - 1]!)) {
      sortie.push({ attendu: ref[i - 1], saisi: tape[j - 1], type: typeEcart(ref[i - 1]!, tape[j - 1]!) });
      i--; j--;
    } else if (i > 0 && c[i]![j] === c[i - 1]![j]! + 1) {
      sortie.push({ attendu: ref[i - 1], type: PONCTUATION.test(ref[i - 1]!) ? 'ponctuation' : 'oubli' });
      i--;
    } else {
      sortie.push({ saisi: tape[j - 1], type: PONCTUATION.test(tape[j - 1]!) ? 'ponctuation' : 'ajout' });
      j--;
    }
  }
  sortie.reverse();
  const parType: Partial<Record<TypeEcart, number>> = {};
  let erreurs = 0;
  for (const mot of sortie) {
    if (mot.type === 'juste') continue;
    erreurs++;
    parType[mot.type] = (parType[mot.type] ?? 0) + 1;
  }
  return { mots: sortie, total: n, erreurs, parType, reussi: n > 0 && erreurs <= Math.max(1, Math.floor(n * PART_ERREURS_MAX)) };
}

const CODES: Partial<Record<TypeEcart, string>> = {
  accord: 'dictee-accords', accent: 'dictee-accents', majuscule: 'dictee-majuscules', orthographe: 'dictee-orthographe',
  oubli: 'dictee-oublis', ajout: 'dictee-oublis', ponctuation: 'dictee-ponctuation',
};

/** Code d'erreur le plus fréquent, pour l'espace parent. */
export function erreurDominante(c: Correction): string | undefined {
  let meilleur: TypeEcart | undefined;
  for (const [type, nb] of Object.entries(c.parType) as [TypeEcart, number][]) {
    if (!meilleur || nb > (c.parType[meilleur] ?? 0)) meilleur = type;
  }
  return meilleur && CODES[meilleur];
}
