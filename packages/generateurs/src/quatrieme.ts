// Générateurs 4e (programmes 2026, puis 2020) : point d'entrée, enregistré dans index.ts.
import { coefficientMultiplicateur4e, probabilites4e, programmeCalcul4e, quatriemeProportionnelle4e, statistiques4e } from './quatrieme-donnees';
import { cercleCirconscrit4e, droiteMilieux4e, pythagore4e, translations4e, volumesPyramideCone4e } from './quatrieme-geometrie';
import {
  developper4e, diviserFractions4e, enchainementsRelatifs4e, equations4e, multiplierFractions4e, produitRelatifs4e, puissances4e,
  racineCarree4e, simplifierFraction4e,
} from './quatrieme-nombres';
import {
  accordsComplexes4e, fonctionsSubordonnees4e, homophones4e, intensite4e, interrogativeIndirecte4e, oppositionCondition4e,
  participesPasses4e, polysemie4e, pronominaux4e, subjonctif4e, subordonnants4e, tempsComposes4e, voixPassive4e,
} from './quatrieme-francais';
import type { Generateur } from './types';

export const GENERATEURS_QUATRIEME: Generateur[] = [
  produitRelatifs4e, enchainementsRelatifs4e, simplifierFraction4e, multiplierFractions4e, diviserFractions4e, puissances4e,
  racineCarree4e, developper4e, equations4e,
  pythagore4e, droiteMilieux4e, volumesPyramideCone4e, translations4e, cercleCirconscrit4e,
  statistiques4e, probabilites4e, quatriemeProportionnelle4e, coefficientMultiplicateur4e, programmeCalcul4e,
  // Français
  subordonnants4e, fonctionsSubordonnees4e, oppositionCondition4e, interrogativeIndirecte4e, tempsComposes4e, voixPassive4e,
  subjonctif4e, participesPasses4e, accordsComplexes4e, pronominaux4e, homophones4e, polysemie4e, intensite4e,
];
