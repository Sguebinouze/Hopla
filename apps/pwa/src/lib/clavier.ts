/** Clavier intégré : la saisie d'une réponse, sans le clavier du système. */

export type ModeClavier = 'chiffres' | 'lettres';
export type Touche = string | 'effacer' | 'espace';

export const LONGUEUR_MAX = 24;

/** Une réponse qui contient une lettre se tape sur le clavier lettres ; sinon, le pavé numérique. */
export const modeClavier = (reponse: string): ModeClavier => (/\p{L}/u.test(reponse) ? 'lettres' : 'chiffres');

/** Le moins ne se tape qu'en tête ; pas d'espace en tête ni double ; longueur bornée. */
export function appliquerTouche(valeur: string, touche: Touche): string {
  if (touche === 'effacer') return [...valeur].slice(0, -1).join('');
  if (valeur.length >= LONGUEUR_MAX) return valeur;
  if (touche === 'espace') return valeur === '' || valeur.endsWith(' ') ? valeur : `${valeur} `;
  if (touche === '−') return valeur === '' ? '−' : valeur;
  return valeur + touche;
}

/** Touche du clavier physique (ordinateur, clavier de tablette) traduite en touche du clavier intégré. */
export function toucheDuClavierPhysique(cle: string): Touche | 'valider' | null {
  if (cle === 'Enter') return 'valider';
  if (cle === 'Backspace') return 'effacer';
  if (cle === ' ') return 'espace';
  if (cle === '-' || cle === '−') return '−';
  if (cle === '.' || cle === ',') return ',';
  if (cle === "'" || cle === '’') return '’';
  if (cle === '/') return '/';
  if (/^[\p{L}\d]$/u.test(cle)) return cle.toLowerCase();
  return null;
}
