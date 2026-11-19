/** Clavier intégré : la saisie d'une réponse, sans le clavier du système. */

export type ModeClavier = 'chiffres' | 'lettres';
export type Touche = string | 'effacer' | 'espace';

export const LONGUEUR_MAX = 24;
/** Une dictée de 3e compte 200 mots au plus. */
export const LONGUEUR_MAX_TEXTE = 1600;

/** Ponctuation tapée en mode texte (dictée). */
export const PONCTUATION_TEXTE = [',', '.', '?', '!', ';', ':', '«', '»', '…'];

/** Une réponse qui contient une lettre se tape sur le clavier lettres ; sinon, le pavé numérique. */
export const modeClavier = (reponse: string): ModeClavier => (/\p{L}/u.test(reponse) ? 'lettres' : 'chiffres');

/** Le moins ne se tape qu'en tête ; pas d'espace en tête ni double ; longueur bornée. */
export function appliquerTouche(valeur: string, touche: Touche, texte = false): string {
  if (touche === 'effacer') return [...valeur].slice(0, -1).join('');
  if (valeur.length >= (texte ? LONGUEUR_MAX_TEXTE : LONGUEUR_MAX)) return valeur;
  if (texte) {
    if (touche === 'espace') return valeur === '' || valeur.endsWith(' ') ? valeur : `${valeur} `;
    return valeur + (touche === '−' ? '-' : touche);
  }
  if (touche === 'espace') return valeur === '' || valeur.endsWith(' ') ? valeur : `${valeur} `;
  if (touche === '−') return valeur === '' ? '−' : valeur;
  return valeur + touche;
}

/** Touche du clavier physique (ordinateur, clavier de tablette) traduite en touche du clavier intégré. */
export function toucheDuClavierPhysique(cle: string, texte = false): Touche | 'valider' | null {
  if (cle === 'Enter') return 'valider';
  if (cle === 'Backspace') return 'effacer';
  if (cle === ' ') return 'espace';
  if (texte) {
    // La dictée garde majuscules et ponctuation telles quelles.
    if (cle === "'") return '’';
    if (cle === '"') return null;
    if (cle === '-' || cle === '’' || PONCTUATION_TEXTE.includes(cle)) return cle;
    return /^[\p{L}\d]$/u.test(cle) ? cle : null;
  }
  if (cle === '-' || cle === '−') return '−';
  if (cle === '.' || cle === ',') return ',';
  if (cle === "'" || cle === '’') return '’';
  if (cle === '/') return '/';
  if (/^[\p{L}\d]$/u.test(cle)) return cle.toLowerCase();
  return null;
}
