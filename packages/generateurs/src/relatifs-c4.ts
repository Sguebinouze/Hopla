import { completerOptions, creerAleatoire } from './aleatoire';
import { erreursDe } from './outils';
import type { Generateur } from './types';

const MOINS = '−';

/** Écrit un relatif seul : « −3 », « 4 », « 0 ». */
export function ecrireRelatif(n: number): string {
  return n < 0 ? `${MOINS}${-n}` : String(n);
}
/** Écrit un relatif dans un calcul : « (−7) », « (+4) ». */
export function ecrireTerme(n: number): string {
  return n < 0 ? `(${MOINS}${-n})` : `(+${n})`;
}

export const additionRelatifs: Generateur = {
  id: 'addition-relatifs',
  competences: ['MA-C4-5E-REL-01'],
  cycle: 4,
  description: 'Additionner deux nombres relatifs, appui sur la droite graduée.',
  generer(graine, difficulte) {
    const a = creerAleatoire(graine);
    const nonNul = (max: number) => (a.entier(1, max)) * (a.suivant() < 0.5 ? -1 : 1);
    let x: number;
    let y: number;
    if (difficulte === 1) {
      x = -a.entier(1, 9);
      y = a.entier(1, 9);
    } else if (difficulte === 2) {
      x = nonNul(12);
      y = nonNul(12);
    } else {
      x = nonNul(30);
      y = nonNul(30);
    }
    const r = x + y;
    const reponse = ecrireRelatif(r);
    // Soustraire au lieu d'ajouter ; signe du résultat inversé. Le troisième piège (distances à zéro ajoutées) coïncide
    // toujours avec l'un des deux autres ou avec la réponse : il n'a pas de code propre.
    const pieges: [string, string?][] = [[ecrireRelatif(x - y), 'soustraction-relatifs'], [ecrireRelatif(-r), 'regle-signes'], [ecrireRelatif((Math.abs(x) + Math.abs(y)) * Math.sign(x))]];
    const options = a.melanger(
      completerOptions([reponse, ...pieges.map(([p]) => p)], 4, () => ecrireRelatif(r + a.entier(-5, 5))),
    );
    const sens = y > 0 ? `avancer de ${y} vers la droite` : `reculer de ${-y} vers la gauche`;
    return {
      id: `${this.id}:${difficulte}:${graine}`,
      competence: 'MA-C4-5E-REL-01',
      gabarit: 'qcm',
      consigne: `Calcule : ${ecrireTerme(x)} + ${ecrireTerme(y)}`,
      visuel: { type: 'droite', min: Math.min(x, r) - 2, max: Math.max(x, r) + 2, depart: x, saut: y },
      options,
      erreurs: erreursDe(options, reponse, pieges),
      reponse,
      indice: `Place-toi sur ${ecrireRelatif(x)} sur la droite graduée.`,
      explication: `Place-toi sur ${ecrireRelatif(x)}. Ajouter ${ecrireTerme(y)}, c'est ${sens}. On arrive à ${reponse}.`,
      difficulte,
    };
  },
};
