// Générateurs du CM1 : point d'entrée de la classe, enregistré dans index.ts.
// Source : programmes de français et de mathématiques du cycle 3 (BO n°16 du 17 avril 2025).
import { additionDecimauxCm1, divisionCm1, egalitesTrousCm1, multiplicationsCm1, numerationCalculCm1, proceduresCm1 } from './cm1-calcul';
import {
  accordGnCm1, accordSujetVerbeCm1, complementsCm1, conjugaisonCm1, determinantsCm1, participeEtreCm1, passeComposeCm1, pronomsCm1,
  synonymesCm1,
} from './cm1-francais';
import { airesCm1, contenancesCm1, dureesCm1, longueursCm1, massesCm1, perimetreCm1 } from './cm1-grandeurs';
import {
  additionnerFractionsCm1, arrondiCm1, comparerDecimauxCm1, comparerEntiersCm1, comparerFractionsCm1, fractionQuantiteCm1,
  fractionsDecimalesCm1, fractionsEntiersCm1, multiplesCm1, nombresLettresCm1, valeurChiffresCm1,
} from './cm1-nombres';
import { comparaisonMultiplicativeCm1, problemesEtapesCm1, proportionnaliteCm1 } from './cm1-problemes';
import { GENERATEURS_GEOMETRIE } from './geometrie-plane';
import type { Generateur } from './types';

export const GENERATEURS_CM1: Generateur[] = [
  // Mathématiques : nombres, fractions, décimaux
  valeurChiffresCm1, nombresLettresCm1, comparerEntiersCm1, multiplesCm1,
  fractionsEntiersCm1, comparerFractionsCm1, additionnerFractionsCm1, fractionQuantiteCm1,
  fractionsDecimalesCm1, comparerDecimauxCm1, arrondiCm1,
  // Mathématiques : calcul, opérations, algèbre
  proceduresCm1, numerationCalculCm1, additionDecimauxCm1, multiplicationsCm1, divisionCm1, egalitesTrousCm1,
  // Mathématiques : problèmes, proportionnalité
  problemesEtapesCm1, comparaisonMultiplicativeCm1, proportionnaliteCm1,
  // Mathématiques : grandeurs et mesures
  longueursCm1, perimetreCm1, massesCm1, contenancesCm1, airesCm1, dureesCm1,
  // Français
  conjugaisonCm1, passeComposeCm1, accordSujetVerbeCm1, accordGnCm1, participeEtreCm1, determinantsCm1, pronomsCm1, complementsCm1,
  synonymesCm1,
  // Géométrie plane et solides
  ...GENERATEURS_GEOMETRIE.cm1,
];
