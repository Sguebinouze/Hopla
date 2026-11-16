// Hasard reproductible : une même graine donne toujours la même partie (utile pour les tests).

export type Hasard = () => number;

/** Générateur pseudo-aléatoire (mulberry32), valeurs dans [0, 1[. */
export function hasard(graine: number): Hasard {
  let a = graine >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Entier dans [min, max]. */
export const entre = (h: Hasard, min: number, max: number) => min + Math.floor(h() * (max - min + 1));

export const choisir = <T>(h: Hasard, liste: readonly T[]): T => liste[Math.floor(h() * liste.length)]!;

export function melanger<T>(h: Hasard, liste: readonly T[]): T[] {
  const r = [...liste];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(h() * (i + 1));
    [r[i], r[j]] = [r[j]!, r[i]!];
  }
  return r;
}

/** Empreinte numérique d'un texte (pour tirer une graine d'un identifiant). */
export function empreinte(texte: string): number {
  let h = 2166136261;
  for (let i = 0; i < texte.length; i++) h = Math.imul(h ^ texte.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Niveau de jeu selon la classe : 1 en cycle 2, 2 en cycle 3, 3 en cycle 4. */
export type Niveau = 1 | 2 | 3;
export function niveauDe(classe: string): Niveau {
  if (['cp', 'ce1', 'ce2'].includes(classe)) return 1;
  if (['cm1', 'cm2', '6e'].includes(classe)) return 2;
  return 3;
}
