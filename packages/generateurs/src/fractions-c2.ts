import { completerOptions, creerAleatoire } from './aleatoire';
import type { Difficulte, Generateur } from './types';

// Dimensions d'une tablette pour chaque dénominateur (CE2 : dénominateur jusqu'à 12).
const GRILLES: Record<number, [number, number]> = {
  2: [1, 2], 3: [1, 3], 4: [2, 2], 5: [1, 5], 6: [2, 3], 8: [2, 4], 10: [2, 5], 12: [3, 4],
};
const PAR_DIFFICULTE: Record<Difficulte, number[]> = { 1: [2, 3, 4], 2: [5, 6, 8], 3: [10, 12] };

export const fractionsColoriees: Generateur = {
  id: 'fractions-coloriees',
  competences: ['MA-C2-CE2-FRAC-01'],
  cycle: 2,
  description: 'Lire la fraction coloriée d’une tablette partagée en parts égales.',
  generer(graine, difficulte) {
    const a = creerAleatoire(graine);
    const d = a.choisir(PAR_DIFFICULTE[difficulte]);
    const n = a.entier(1, d - 1);
    const [lignes, colonnes] = GRILLES[d] ?? [1, d];
    const reponse = `${n}/${d}`;
    const options = a.melanger(
      completerOptions([reponse, `${d - n}/${d}`, `${n}/${d - n}`, `${d}/${n}`], 4, () => {
        const dd = a.choisir(Object.keys(GRILLES).map(Number));
        return `${a.entier(1, dd - 1)}/${dd}`;
      }),
    );
    const coloriees = n === 1 ? '1 carré est colorié' : `${n} carrés sont coloriés`;
    return {
      id: `${this.id}:${difficulte}:${graine}`,
      competence: 'MA-C2-CE2-FRAC-01',
      gabarit: 'qcm',
      consigne: 'Quelle fraction de la tablette est coloriée ?',
      visuel: { type: 'grille', lignes, colonnes, coloriees: n },
      options,
      reponse,
      indice: 'Compte tous les carrés. Puis compte les carrés coloriés.',
      explication: `La tablette a ${d} carrés en tout. ${d} est le dénominateur. ${coloriees}. ${n} est le numérateur. La réponse est ${reponse}.`,
      difficulte,
    };
  },
};
