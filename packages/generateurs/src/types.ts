export type Difficulte = 1 | 2 | 3;
export type Gabarit = 'qcm' | 'saisie';

export type Point = readonly [number, number];

/** Éléments d'une figure de géométrie, en unités de carreau (origine en haut à gauche, y vers le bas). */
export type ElementFigure =
  | { forme: 'cercle'; centre: Point; rayon: number; plein?: boolean }
  | { forme: 'segment'; de: Point; a: Point; accent?: boolean }
  | { forme: 'droite'; de: Point; a: Point; nom?: string }
  | { forme: 'axe'; de: Point; a: Point }
  | { forme: 'point'; en: Point; nom?: string }
  | { forme: 'polygone'; sommets: Point[]; plein?: boolean }
  | { forme: 'case'; colonne: number; ligne: number; accent?: boolean };

export type Visuel =
  | { type: 'grille'; lignes: number; colonnes: number; coloriees: number }
  | { type: 'droite'; min: number; max: number; depart: number; saut: number }
  | {
      type: 'figure';
      largeur: number;
      hauteur: number;
      /** Papier quadrillé ; `reperes` nomme les colonnes (A, B, C…) et les lignes (1, 2, 3…). */
      quadrillage?: boolean;
      reperes?: boolean;
      elements: ElementFigure[];
    }
  /** Horloge à aiguilles (cadran de 12 heures). */
  | { type: 'horloge'; heures: number; minutes: number }
  /** Pièces et billets en euros, posés côte à côte. */
  | { type: 'monnaie'; valeurs: number[] }
  /** Barres de même longueur partagées en parts égales, avec leur nom. */
  | { type: 'fractions'; barres: { parts: number; coloriees: number; nom: string }[] }
  /** Diagramme en barres : axe gradué de `pas` en `pas` à partir de 0. */
  | { type: 'diagramme'; titre: string; unite: string; pas: number; barres: { nom: string; valeur: number }[] }
  /** Solide en perspective cavalière, arêtes cachées en pointillés. */
  | { type: 'solide'; solide: NomSolide }
  /** Urne vue de face : boules de couleur. */
  | { type: 'urne'; boules: { couleur: CouleurBoule; nombre: number }[] }
  /** Trait posé au-dessus d'une règle graduée en centimètres. */
  | { type: 'regle'; graduations: number; debut: number; fin: number };

export type NomSolide =
  | 'cube' | 'pave' | 'pyramide' | 'pyramide-triangulaire' | 'prisme-triangulaire' | 'cylindre' | 'cone' | 'boule';
export type CouleurBoule = 'rouge' | 'bleue' | 'verte' | 'jaune' | 'noire';

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
