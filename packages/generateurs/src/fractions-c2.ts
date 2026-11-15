import { creerAleatoire } from './aleatoire';
import { erreursDe, optionsNumeriques } from './outils';
import type { Difficulte, Generateur } from './types';

// Dimensions d'une tablette pour chaque dénominateur.
const GRILLES: Record<number, [number, number]> = {
  2: [1, 2], 3: [1, 3], 4: [2, 2], 5: [1, 5], 6: [2, 3], 8: [2, 4], 10: [2, 5], 12: [3, 4],
};

function creerFractionsColoriees(
  id: string, competence: string, parDifficulte: Record<Difficulte, number[]>, description: string,
): Generateur {
  const tous = [...new Set(Object.values(parDifficulte).flat())];
  return {
    id,
    competences: [competence],
    cycle: 2,
    description,
    generer(graine, difficulte) {
      const a = creerAleatoire(graine);
      const d = a.choisir(parDifficulte[difficulte]);
      const n = a.entier(1, d - 1);
      const [lignes, colonnes] = GRILLES[d] ?? [1, d];
      const reponse = `${n}/${d}`;
      // Aucune fraction égale à la réponse parmi les pièges (2/4 et 1/2 seraient toutes deux justes).
      const pieges: [string, string][] = [[`${d - n}/${d}`, 'parts-non-coloriees'], [`${n}/${d - n}`, 'parts-restantes-au-denominateur'], [`${d}/${n}`, 'fraction-inversee']];
      const options = optionsNumeriques(a, reponse, pieges.map(([p]) => p), () => {
        const dd = a.choisir(tous);
        return `${a.entier(1, dd - 1)}/${dd}`;
      });
      const coloriees = n === 1 ? '1 carré est colorié' : `${n} carrés sont coloriés`;
      return {
        id: `${id}:${difficulte}:${graine}`,
        competence,
        gabarit: 'qcm',
        consigne: 'Quelle fraction de la tablette est coloriée ?',
        visuel: { type: 'grille', lignes, colonnes, coloriees: n },
        options,
        erreurs: erreursDe(options, reponse, pieges),
        reponse,
        indice: 'Compte tous les carrés. Puis compte les carrés coloriés.',
        explication: `La tablette a ${d} carrés en tout. ${d} est le dénominateur. ${coloriees}. ${n} est le numérateur. La réponse est ${reponse}.`,
        difficulte,
      };
    },
  };
}

// CE2 : dénominateur jusqu'à 12.
export const fractionsColoriees = creerFractionsColoriees(
  'fractions-coloriees', 'MA-C2-CE2-FRAC-01', { 1: [2, 3, 4], 2: [5, 6, 8], 3: [10, 12] },
  'Lire la fraction coloriée d’une tablette partagée en parts égales (CE2).',
);

// CE1 : dénominateurs de 2 à 10, sauf 7 et 9.
export const fractionsColorieesCe1 = creerFractionsColoriees(
  'fractions-coloriees-ce1', 'MA-C2-CE1-FRAC-01', { 1: [2, 3, 4], 2: [5, 6], 3: [8, 10] },
  'Lire la fraction coloriée d’une tablette partagée en parts égales (CE1).',
);
