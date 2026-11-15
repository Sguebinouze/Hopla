// Générateurs 6e (compléments : géométrie, volumes, statistiques, probabilités) : point d'entrée, enregistré dans index.ts.
import { donnees6e, probabilites6e } from './sixieme-donnees';
import { angles6e, bissectrice6e, cercle6e, mediatrice6e, milieu6e, symetrie6e, trianglesAngles6e } from './sixieme-geometrie';
import { solides6e, volumes6e } from './sixieme-volumes';
import type { Generateur } from './types';

export const GENERATEURS_SIXIEME: Generateur[] = [
  milieu6e, cercle6e, mediatrice6e, angles6e, bissectrice6e, trianglesAngles6e, symetrie6e,
  volumes6e, solides6e, donnees6e, probabilites6e,
];
