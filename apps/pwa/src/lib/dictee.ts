import type { Classe } from './donnees';

/**
 * Dictée sur papier : Hopla lit, l'enfant écrit sur sa feuille, puis compare avec le texte et compte
 * ses erreurs. Deux façons de dicter :
 * - `classe` : comme le maitre ou la maitresse, chaque morceau lu deux fois, le temps d'écrire entre les
 *   deux, sans retour en arrière ;
 * - `rythme` : un morceau à la fois, réécouté à volonté, l'enfant passe au suivant quand il a fini.
 */
export type ModeDictee = 'classe' | 'rythme';
export type VitesseDictee = 'normale' | 'lente';

/**
 * Vitesse d'écriture à la main, en lettres par minute : ordre de grandeur par classe, à ajuster à l'usage.
 * La dictée demande en plus de réfléchir à l'orthographe : on ajoute une marge. L'enfant qui a fini avant
 * passe à la seconde lecture.
 */
export const LETTRES_PAR_MINUTE: Record<Classe, number> = {
  cp: 15, ce1: 25, ce2: 35, cm1: 45, cm2: 55, '6e': 65, '5e': 75, '4e': 85, '3e': 95,
};
const MARGE = 1.2;
const MINIMUM_MS = 4000;

/** Temps laissé pour écrire un morceau, entre ses deux lectures (mode classe). */
export function tempsEcriture(groupe: string, classe: Classe, vitesse: VitesseDictee = 'normale'): number {
  const lettres = (groupe.match(/[\p{L}\p{N}]/gu) ?? []).length;
  const ms = (lettres / LETTRES_PAR_MINUTE[classe]) * 60_000 * MARGE * (vitesse === 'lente' ? 1.3 : 1);
  return Math.max(MINIMUM_MS, Math.round(ms / 500) * 500);
}

export const nombreDeMots = (texte: string) => texte.split(/\s+/).filter((m) => /\p{L}/u.test(m)).length;

/** Dictée réussie : une erreur pour dix mots au plus (une au moins tolérée). */
export const erreursAdmises = (texte: string) => Math.max(1, Math.floor(nombreDeMots(texte) / 10));

/** Points à vérifier, regroupés par sorte (« Accords », « Verbes »…), pour la correction. */
export function pointsParSorte(points: string[]): { sorte: string; mots: string[] }[] {
  const groupes = new Map<string, string[]>();
  for (const p of points) {
    const i = p.indexOf(' : ');
    const sorte = i > 0 ? p.slice(0, i) : 'À vérifier';
    groupes.set(sorte, [...(groupes.get(sorte) ?? []), i > 0 ? p.slice(i + 3) : p]);
  }
  return [...groupes].map(([sorte, mots]) => ({ sorte, mots }));
}
