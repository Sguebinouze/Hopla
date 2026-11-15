// Générateur pseudo-aléatoire déterministe (mulberry32) : même graine, même exercice.
export function creerAleatoire(graine: number) {
  let a = graine >>> 0;
  const suivant = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const entier = (min: number, max: number) => min + Math.floor(suivant() * (max - min + 1));
  const choisir = <T>(liste: readonly T[]): T => liste[entier(0, liste.length - 1)] as T;
  const melanger = <T>(liste: readonly T[]): T[] => {
    const copie = [...liste];
    for (let i = copie.length - 1; i > 0; i--) {
      const j = entier(0, i);
      [copie[i], copie[j]] = [copie[j] as T, copie[i] as T];
    }
    return copie;
  };
  return { suivant, entier, choisir, melanger };
}

/** Complète une liste d'options sans doublon jusqu'à `taille` éléments. */
export function completerOptions(base: string[], taille: number, secours: () => string): string[] {
  const options = [...new Set(base)];
  let garde = 0;
  while (options.length < taille && garde++ < 200) {
    const candidat = secours();
    if (!options.includes(candidat)) options.push(candidat);
  }
  return options.slice(0, taille);
}
