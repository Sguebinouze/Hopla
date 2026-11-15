// Générateurs 5e (programme 2026) : point d'entrée, enregistré dans index.ts.
import { pourcentages5e, probabilites5e, reconnaitreProportionnalite5e, statistiques5e, tableauValeurs5e } from './cinquieme-donnees';
import { anglesParalleles5e, parallelogrammes5e, symetrieCentrale5e, triangles5e, volumes5e } from './cinquieme-geometrie';
import { developper5e, equations5e, substitution5e } from './cinquieme-litteral';
import { carresCubes5e, comparerRelatifs5e, distributivite5e, divisibilite5e, fractions5e, priorites5e, soustraireRelatifs5e } from './cinquieme-nombres';
import { accordSujetVerbe5e, identifierTemps5e, participePasse5e, radicaux5e } from './cinquieme-conjugaison';
import { determinantsPronoms5e, fonctions5e, paroles5e, phraseComplexe5e, typesFormes5e } from './cinquieme-francais';
import { affixes5e, registres5e, relationsSens5e } from './cinquieme-lexique';
import type { Generateur } from './types';

export const GENERATEURS_CINQUIEME: Generateur[] = [
  priorites5e, distributivite5e, divisibilite5e, comparerRelatifs5e, soustraireRelatifs5e, fractions5e, carresCubes5e,
  substitution5e, developper5e, equations5e,
  volumes5e, symetrieCentrale5e, anglesParalleles5e, triangles5e, parallelogrammes5e,
  statistiques5e, probabilites5e, pourcentages5e, reconnaitreProportionnalite5e, tableauValeurs5e,
  // Français
  typesFormes5e, phraseComplexe5e, fonctions5e, determinantsPronoms5e, paroles5e,
  identifierTemps5e, radicaux5e, accordSujetVerbe5e, participePasse5e, affixes5e, registres5e, relationsSens5e,
];
