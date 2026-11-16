import { api, type Enfant } from '../lib/donnees';
import { chargerPack, competencesJouables, sansMatieres, type Pack } from '../lib/packs';
import { aujourdhui } from '../lib/progression';
import { niveauDe, type Niveau } from './hasard';
import { missionFaite } from './regles';

export interface AccesJeux {
  enfant: Enfant;
  pack: Pack;
  niveau: Niveau;
  /** Mission du jour faite : jeux et quiz ouverts. */
  debloque: boolean;
  /** Le parent peut couper les jeux ou le quiz (matières masquées « jeux », « culture »). */
  jeux: boolean;
  culture: boolean;
}

export async function chargerAcces(): Promise<AccesJeux | null> {
  const enfant = await api.enfantCourant();
  if (!enfant) return null;
  const masquees = enfant.matieres_masquees ?? [];
  const pack = await chargerPack(enfant.classe);
  const jouables = competencesJouables(sansMatieres(pack, masquees)).length;
  const jour = aujourdhui();
  const journees = (await api.mesJournees(1).catch(() => [])).filter((j) => j.jour === jour);
  return {
    enfant, pack, niveau: niveauDe(enfant.classe),
    debloque: missionFaite(journees, jouables),
    jeux: !masquees.includes('jeux'),
    culture: !masquees.includes('culture') && (pack.culture?.length ?? 0) > 0,
  };
}

/** Quiz du jour déjà fait sur cet appareil : son score, sinon null. */
export function quizFait(enfant: string, jour: string): number | null {
  try {
    const v = JSON.parse(localStorage.getItem(`hopla.culture.${enfant}`) ?? 'null') as { jour: string; score: number } | null;
    return v && v.jour === jour ? v.score : null;
  } catch {
    return null;
  }
}
export function noterQuiz(enfant: string, jour: string, score: number): void {
  try {
    localStorage.setItem(`hopla.culture.${enfant}`, JSON.stringify({ jour, score }));
  } catch {
    /* stockage indisponible : le quiz pourra être refait, les XP restent plafonnés */
  }
}
