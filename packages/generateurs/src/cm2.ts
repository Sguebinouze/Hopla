// Générateurs du CM2 : point d'entrée de la classe, enregistré dans index.ts.
import { additionnerFractionsCm2, comparerFractionsCm2, entierFoisFractionCm2, fractionQuantiteCm2, fractionsSuperieuresCm2 } from './cm2-fractions';
import {
  calculMentalDecimauxCm2, calculMentalEntiersCm2, divisionDecimaleCm2, egalitesTrousCm2, multiplierDecimalEntierCm2,
  multiplierDiviser10Cm2, parenthesesCm2, programmeCalculCm2,
} from './cm2-calcul';
import {
  classesMotsCm2, complementsCirconstancielsCm2, fonctionsCm2, negationTempsComposesCm2, participePasseAvoirCm2,
  participePasseEtreCm2, passeSimpleCm2, phraseComplexeCm2, plusQueParfaitCm2, pronomsComplementsCm2, sujetInverseCm2,
} from './cm2-francais';
import { airesCm2, anglesCm2, convertirAiresCm2, dureesCm2 } from './cm2-grandeurs';
import {
  arrondiUniteCm2, comparerDecimauxCm2, comparerEntiersCm2, diviseursMultiplesCm2, fractionsDecimalesCm2,
  nombresLettresCm2, valeurChiffresCm2,
} from './cm2-nombres';
import { comparaisonMultiplicativeCm2, probabilitesCm2, problemesEtapesCm2, proportionnaliteCm2 } from './cm2-problemes';
import { GENERATEURS_GEOMETRIE } from './geometrie-plane';
import type { Generateur } from './types';

export const GENERATEURS_CM2: Generateur[] = [
  // Mathématiques : nombres entiers, fractions, décimaux
  nombresLettresCm2, valeurChiffresCm2, comparerEntiersCm2, diviseursMultiplesCm2,
  fractionsSuperieuresCm2, comparerFractionsCm2, additionnerFractionsCm2, entierFoisFractionCm2, fractionQuantiteCm2,
  fractionsDecimalesCm2, comparerDecimauxCm2, arrondiUniteCm2,
  // Mathématiques : calcul mental, opérations, algèbre
  multiplierDiviser10Cm2, calculMentalEntiersCm2, calculMentalDecimauxCm2,
  parenthesesCm2, multiplierDecimalEntierCm2, divisionDecimaleCm2, egalitesTrousCm2, programmeCalculCm2,
  // Mathématiques : problèmes, proportionnalité, probabilités, grandeurs
  problemesEtapesCm2, comparaisonMultiplicativeCm2, proportionnaliteCm2, probabilitesCm2,
  airesCm2, convertirAiresCm2, anglesCm2, dureesCm2,
  // Français
  passeSimpleCm2, plusQueParfaitCm2, negationTempsComposesCm2, participePasseEtreCm2, participePasseAvoirCm2,
  fonctionsCm2, complementsCirconstancielsCm2, sujetInverseCm2, classesMotsCm2, phraseComplexeCm2, pronomsComplementsCm2,
  // Géométrie plane et solides
  ...GENERATEURS_GEOMETRIE.cm2,
];
