import type { Visuel } from '@hopla/generateurs';
import type { Illustration } from './packs';

// Forme produite par @hopla/content (CoursPack) : le cours complet d'une notion.
export interface QuestionCours {
  consigne: string;
  options: string[];
  reponse: string;
  explication: string;
}

export type BlocCours =
  | { type: 'observe'; consigne: string; exemples: string[] }
  | { type: 'explique'; texte: string }
  | { type: 'methode'; titre: string; etapes: string[] }
  | { type: 'exemple-resolu'; enonce: string; etapes: string[]; conclusion: string }
  | { type: 'piege'; erreur: string; correction: string }
  | { type: 'tableau'; titre: string | null; colonnes: string[]; lignes: string[][] }
  | { type: 'vocabulaire'; mots: { mot: string; definition: string }[] }
  | { type: 'image'; media: string; legende: string }
  | { type: 'visuel'; visuel: Visuel; legende: string }
  | { type: 'frise'; reperes: { annee: number; date: string; evenement: string }[] }
  | ({ type: 'question' } & QuestionCours);

export interface CoursPack {
  duree: number;
  essentiel: string;
  parties: { titre: string; blocs: BlocCours[] }[];
  a_toi: QuestionCours[];
  statut: string;
  /** Images du cours, résolues au chargement du pack (identifiant → chemin et texte alternatif). */
  images?: Record<string, Illustration>;
}

/** Toutes les questions d'un cours : la série d'entraînement ne doit en reprendre aucune. */
export const questionsDuCours = (k: CoursPack): QuestionCours[] => [
  ...k.parties.flatMap((p) => p.blocs.filter((b): b is Extract<BlocCours, { type: 'question' }> => b.type === 'question')),
  ...k.a_toi,
];
