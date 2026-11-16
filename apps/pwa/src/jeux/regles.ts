import { empreinte, hasard, melanger } from './hasard';

// Règles communes : déblocage après la mission du jour, quiz de culture du jour.

export const JEUX = [
  { id: 'suites', nom: 'Suites logiques', consigne: 'Trouve ce qui vient ensuite.' },
  { id: 'sudoku', nom: 'Mini-sudoku', consigne: 'Chaque chiffre une seule fois par ligne, par colonne et par bloc.' },
  { id: 'memoire', nom: 'Mémoire', consigne: 'Retourne les cartes deux par deux et retrouve les paires.' },
  { id: 'intrus', nom: 'L’intrus', consigne: 'Trouve l’élément qui n’est pas comme les autres.' },
  { id: 'labyrinthe', nom: 'Labyrinthe', consigne: 'Mène Octave jusqu’à la sortie.' },
  { id: 'sommes', nom: 'Sommes croisées', consigne: 'Complète la grille : chaque ligne et chaque colonne doit donner sa somme.' },
  { id: 'mots-meles', nom: 'Mots mêlés', consigne: 'Retrouve les mots cachés : touche la première lettre, puis la dernière.' },
] as const;
export type IdJeu = (typeof JEUX)[number]['id'];

/** Questions d'une série du jour pour la mission (même taille que dans Exercice). */
const QUESTIONS_PAR_NOTION = 5;

/**
 * La mission du jour est faite quand trois notions (ou toutes, s'il y en a moins)
 * ont reçu une série complète aujourd'hui.
 */
export function missionFaite(journeesDuJour: { competence_id: string; questions: number }[], notionsJouables: number): boolean {
  if (notionsJouables === 0) return true;
  const faites = new Set(journeesDuJour.filter((j) => j.questions >= QUESTIONS_PAR_NOTION).map((j) => j.competence_id)).size;
  return faites >= Math.min(3, notionsJouables);
}

export interface QuestionQuiz { id: string; question: string; options: string[]; reponse: string; explication: string }

/**
 * Quiz du jour : 5 questions, toujours les mêmes pour un enfant un jour donné.
 * Ordre propre à chaque enfant ; on parcourt toute la banque avant de revoir une question.
 */
export function quizDuJour<Q extends QuestionQuiz>(questions: Q[], enfant: string, jour: string, n = 5): Q[] {
  if (questions.length === 0) return [];
  const tries = [...questions].sort((a, b) => a.id.localeCompare(b.id));
  const ordre = melanger(hasard(empreinte(enfant)), tries);
  const numero = Math.floor(Date.parse(`${jour}T12:00:00Z`) / 86_400_000);
  const debut = (numero * n) % ordre.length;
  const h = hasard(empreinte(`${enfant}#${jour}`));
  return Array.from({ length: Math.min(n, ordre.length) }, (_, k) => {
    const q = ordre[(debut + k) % ordre.length]!;
    return { ...q, options: melanger(h, q.options) };
  });
}
