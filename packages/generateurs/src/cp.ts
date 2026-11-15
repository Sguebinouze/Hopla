// Générateurs du CP : point d'entrée de la classe, enregistré dans index.ts.
import {
  additionColonnesCp, additionSoustractionCp, ajouterUnChiffreCp, complementDizaineCp, doublesMoitiesCp,
  numerationCalculCp, proceduresCp, tablesAdditionCp,
} from './cp-calcul';
import { etreAvoirCp, famillesCp, genreNombreCp, lettresMuettesCp, phraseCp, sonsCp, syllabesCp, valeurLettresCp } from './cp-francais';
import { donneesCp, figuresCp, heuresCp, longueursCp, monnaieCp, solidesCp } from './cp-grandeurs';
import { nombresComparerCp, nombresLettresCp, nombresUnitesCp, ordinauxCp, suitesCp } from './cp-nombres';
import { problemesDeuxEtapesCp, problemesMultiplicatifsCp, problemesPartiesToutCp } from './cp-problemes';
import type { Generateur } from './types';

export const GENERATEURS_CP: Generateur[] = [
  // Mathématiques : nombres
  nombresUnitesCp, nombresLettresCp, nombresComparerCp, suitesCp, ordinauxCp,
  // Mathématiques : opérations et calcul mental
  additionSoustractionCp, additionColonnesCp, tablesAdditionCp, doublesMoitiesCp, numerationCalculCp,
  complementDizaineCp, ajouterUnChiffreCp, proceduresCp,
  // Mathématiques : problèmes
  problemesPartiesToutCp, problemesDeuxEtapesCp, problemesMultiplicatifsCp,
  // Mathématiques : grandeurs, géométrie, données
  longueursCp, monnaieCp, heuresCp, solidesCp, figuresCp, donneesCp,
  // Français
  sonsCp, syllabesCp, lettresMuettesCp, valeurLettresCp, genreNombreCp, phraseCp, etreAvoirCp, famillesCp,
];
