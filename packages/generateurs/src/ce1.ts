// Générateurs CE1 (compléments : grandeurs, géométrie, lecture, vocabulaire) : point d'entrée, enregistré dans index.ts.
import { figuresCe1, solidesCe1 } from './ce1-geometrie';
import { dureesCe1, heuresCe1, longueursCe1, massesCe1, monnaieCe1 } from './ce1-grandeurs';
import { lectureCe1 } from './ce1-lecture';
import { contrairesCe1, expressionsCe1, generiquesCe1, motsFormesCe1 } from './ce1-vocabulaire';
import { GENERATEURS_GEOMETRIE } from './geometrie-plane';
import type { Generateur } from './types';

export const GENERATEURS_CE1: Generateur[] = [
  longueursCe1, massesCe1, monnaieCe1, heuresCe1, dureesCe1, solidesCe1, figuresCe1,
  lectureCe1, generiquesCe1, contrairesCe1, motsFormesCe1, expressionsCe1,
  // Géométrie plane et solides
  ...GENERATEURS_GEOMETRIE.ce1,
];
