// Générateurs 3e (programme 2026) : point d'entrée, enregistré dans index.ts.
import {
  affines3e, evolutionPourcentage3e, imageAntecedent3e, lineaires3e, probaReunion3e, quartiles3e,
} from './troisieme-donnees';
import {
  accordAdjectif3e, accordPPRelatif3e, accordSujetsComplexes3e, discours3e, emphase3e, identifierTemps3e, pronomRelatif3e,
  subjonctifPasse3e, valeursConditionnel3e,
} from './troisieme-francais';
import { chasles3e, sections3e, thales3e, trigonometrie3e, vecteurs3e, volumeBoule3e } from './troisieme-geometrie';
import { connecteurs3e, connotation3e, homophonesLexicaux3e, racines3e, radicaux3e } from './troisieme-lexique';
import {
  decomposition3e, doubleDistributivite3e, equationCarre3e, identites3e, inequation3e, irreductible3e,
  notationScientifique3e, operationsPuissances3e, produitNul3e, puissancesNegatives3e,
} from './troisieme-nombres';
import { GENERATEURS_TROISIEME_2020_FRANCAIS } from './troisieme-2020-francais';
import { GENERATEURS_TROISIEME_2020_MATHS } from './troisieme-2020-maths';
import type { Generateur } from './types';

export const GENERATEURS_TROISIEME: Generateur[] = [
  decomposition3e, irreductible3e, puissancesNegatives3e, operationsPuissances3e, notationScientifique3e, equationCarre3e,
  doubleDistributivite3e, identites3e, produitNul3e, inequation3e,
  thales3e, trigonometrie3e, volumeBoule3e, sections3e, vecteurs3e, chasles3e,
  quartiles3e, probaReunion3e, evolutionPourcentage3e, imageAntecedent3e, lineaires3e, affines3e,
  emphase3e, pronomRelatif3e, connecteurs3e, discours3e, subjonctifPasse3e, identifierTemps3e, valeursConditionnel3e,
  accordPPRelatif3e, accordSujetsComplexes3e, accordAdjectif3e, connotation3e, racines3e, radicaux3e, homophonesLexicaux3e,
  // Programme 2020
  ...GENERATEURS_TROISIEME_2020_MATHS, ...GENERATEURS_TROISIEME_2020_FRANCAIS,
];
