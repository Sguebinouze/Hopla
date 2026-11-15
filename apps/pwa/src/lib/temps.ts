import { api, type Enfant } from './donnees';

/** Vrai si l'enfant a atteint le temps de travail fixé par son parent pour aujourd'hui. */
export async function tempsEcoule(enfant: Enfant): Promise<boolean> {
  if (!enfant.minutes_par_jour) return false;
  const minutes = await api.minutesAujourdhui().catch(() => 0);
  return minutes >= enfant.minutes_par_jour;
}
