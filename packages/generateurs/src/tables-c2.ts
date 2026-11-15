import { creerAleatoire } from './aleatoire';
import type { Generateur } from './types';

export const tablesMultiplication: Generateur = {
  id: 'tables-multiplication',
  competences: ['MA-C2-CE2-CALC-01'],
  cycle: 2,
  description: 'Calcul mental : tables de multiplication de 2 à 9.',
  generer(graine, difficulte) {
    const a = creerAleatoire(graine);
    const x = difficulte === 1 ? a.choisir([2, 3, 4, 5]) : a.entier(6, 9);
    const y = difficulte === 1 ? a.entier(1, 10) : a.entier(2, 9);
    const p = x * y;
    const base = {
      id: `${this.id}:${difficulte}:${graine}`,
      competence: 'MA-C2-CE2-CALC-01',
      gabarit: 'saisie' as const,
      difficulte,
    };
    if (difficulte === 3) {
      return {
        ...base,
        consigne: `Complète : ${x} × ? = ${p}`,
        reponse: String(y),
        indice: `Récite la table de ${x}.`,
        explication: `${x} × ${y} = ${p}. Le nombre manquant est ${y}.`,
      };
    }
    const astuce =
      y > 5 ? ` ${x} × ${y}, c'est ${x} × 5 plus ${x} × ${y - 5}. ${x * 5} + ${x * (y - 5)} = ${p}.` : '';
    return {
      ...base,
      consigne: `Calcule : ${x} × ${y}`,
      reponse: String(p),
      indice: `Récite la table de ${x}.`,
      explication: `${x} × ${y} = ${p}.${astuce}`,
    };
  },
};
