/** « 2026-2027 » → 2026 */
export const debutAnnee = (annee: string): number => Number(annee.slice(0, 4));
export const anneeDe = (debut: number): string => `${debut}-${debut + 1}`;

/** Année scolaire en cours à une date (la rentrée est fixée au 1er septembre). */
export function anneeScolaire(date = new Date()): string {
  const y = date.getFullYear();
  return anneeDe(date.getMonth() >= 8 ? y : y - 1);
}

/** Vrai si l'année est comprise dans [debut, fin] (fin incluse, null = sans fin). */
export function couvre(annee: string, debut: string, fin: string | null): boolean {
  const a = debutAnnee(annee);
  return a >= debutAnnee(debut) && (fin === null || a <= debutAnnee(fin));
}
