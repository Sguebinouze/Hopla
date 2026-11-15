// Générateurs du CE2 : point d'entrée de la classe, enregistré dans index.ts.
// Les deux générateurs CE2 historiques (fractions-coloriees, tables-multiplication) restent déclarés dans index.ts.
import { divisionCe2, multiplicationPoseeCe2, operationsPoseesCe2 } from './ce2-operations';
import { faitsMultiplicatifsCe2, numerationCalculCe2, proceduresCe2, tablesAdditionCe2 } from './ce2-calcul';
import { imparfaitFuturCe2, passeComposeCe2, presentCe2 } from './ce2-conjugaison';
import { fractionsAdditionnerCe2, fractionsComparerCe2, fractionsEgalesCe2 } from './ce2-fractions';
import {
  accordSujetVerbeCe2, classesMotsCe2, famillesMotsCe2, femininCe2, formeNegativeCe2, generiquesSynonymesCe2,
  groupeSujetCe2, plurielNomsCe2, prefixesCe2,
} from './ce2-francais';
import { solidesCe2 } from './ce2-geometrie';
import { dureesCe2, longueursCe2, massesContenancesCe2, monnaieCe2 } from './ce2-grandeurs';
import { nombresComparerCe2, nombresLettresCe2, nombresUnitesCe2 } from './ce2-nombres';
import { problemesAdditifsCe2, problemesDeuxEtapesCe2, problemesFoisPlusCe2, problemesMultiplicatifsCe2 } from './ce2-problemes';
import type { Generateur } from './types';

export const GENERATEURS_CE2: Generateur[] = [
  // Mathématiques
  nombresUnitesCe2, nombresLettresCe2, nombresComparerCe2,
  fractionsEgalesCe2, fractionsComparerCe2, fractionsAdditionnerCe2,
  tablesAdditionCe2, faitsMultiplicatifsCe2, numerationCalculCe2, proceduresCe2,
  operationsPoseesCe2, multiplicationPoseeCe2, divisionCe2,
  problemesAdditifsCe2, problemesDeuxEtapesCe2, problemesMultiplicatifsCe2, problemesFoisPlusCe2,
  longueursCe2, massesContenancesCe2, monnaieCe2, dureesCe2,
  solidesCe2,
  // Français
  presentCe2, imparfaitFuturCe2, passeComposeCe2,
  accordSujetVerbeCe2, plurielNomsCe2, femininCe2,
  classesMotsCe2, groupeSujetCe2, formeNegativeCe2,
  prefixesCe2, famillesMotsCe2, generiquesSynonymesCe2,
];
