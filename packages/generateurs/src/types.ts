export type Difficulte = 1 | 2 | 3;
export type Gabarit = 'qcm' | 'saisie';

export type Visuel =
  | { type: 'grille'; lignes: number; colonnes: number; coloriees: number }
  | { type: 'droite'; min: number; max: number; depart: number; saut: number };

export interface Item {
  /** Identifiant stable : générateur, difficulté et graine. */
  id: string;
  competence: string;
  gabarit: Gabarit;
  consigne: string;
  visuel?: Visuel;
  /** Pour un QCM : les options, dont la bonne réponse, dans un ordre mélangé. */
  options?: string[];
  reponse: string;
  indice: string;
  explication: string;
  difficulte: Difficulte;
  /**
   * Erreurs typiques : pour une option piège (ou une saisie fautive prévisible), le code de l'erreur
   * qu'elle révèle. Code court, stable, en kebab-case : « decimal-longueur », « futur-conditionnel ».
   * Sert au repérage des erreurs récurrentes dans le suivi parent. Les options sans code sont des
   * erreurs non qualifiées.
   */
  erreurs?: Record<string, string>;
}

export interface Generateur {
  id: string;
  /** Compétences du référentiel couvertes ; vérifiées par le contrôle du contenu. */
  competences: string[];
  cycle: 2 | 3 | 4;
  description: string;
  generer(graine: number, difficulte: Difficulte): Item;
}
