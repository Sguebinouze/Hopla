import { useSyncExternalStore } from 'react';

// Niveau de l'enfant et apparence d'Octave (couleur et accessoire), débloquées en progressant.

export const XP_PAR_NIVEAU = 200;
export const niveauDe = (xp: number) => Math.floor(xp / XP_PAR_NIVEAU) + 1;

export interface Deblocable { id: string; nom: string; niveau: number }

export const COULEURS_OCTAVE: (Deblocable & { corps: string; ventre: string })[] = [
  { id: 'turquoise', nom: 'Turquoise', niveau: 1, corps: '#22B8A5', ventre: '#E3F6F4' },
  { id: 'violet', nom: 'Violet', niveau: 2, corps: '#7B6CF6', ventre: '#ECEAFE' },
  { id: 'orange', nom: 'Orange', niveau: 3, corps: '#FF8A3D', ventre: '#FFF0E3' },
  { id: 'bleu', nom: 'Bleu', niveau: 4, corps: '#4C8DFF', ventre: '#E5EEFF' },
  { id: 'framboise', nom: 'Framboise', niveau: 6, corps: '#E64980', ventre: '#FCE4EC' },
  { id: 'or', nom: 'Or', niveau: 10, corps: '#F2B600', ventre: '#FFF6D6' },
];

export const ACCESSOIRES: Deblocable[] = [
  { id: 'aucun', nom: 'Aucun', niveau: 1 },
  { id: 'lunettes', nom: 'Lunettes', niveau: 2 },
  { id: 'casquette', nom: 'Casquette', niveau: 3 },
  { id: 'fleur', nom: 'Fleur', niveau: 5 },
  { id: 'casque', nom: 'Casque audio', niveau: 7 },
  { id: 'chapeau', nom: 'Chapeau de magicien', niveau: 9 },
  { id: 'couronne', nom: 'Couronne', niveau: 12 },
];

export interface Apparence { couleur: string; accessoire: string }

export function lireApparence(octave: string | null | undefined): Apparence {
  const [c, a] = (octave ?? '').split('.');
  return {
    couleur: COULEURS_OCTAVE.some((x) => x.id === c) ? c! : 'turquoise',
    accessoire: ACCESSOIRES.some((x) => x.id === a) ? a! : 'aucun',
  };
}

export const ecrireApparence = (a: Apparence) => `${a.couleur}.${a.accessoire}`;

// Apparence de l'enfant en session, lue par tous les Octave de l'app.
let courante: string | null = null;
const ecouteurs = new Set<() => void>();

export function definirApparence(octave: string | null | undefined): void {
  const v = octave ?? null;
  if (v === courante) return;
  courante = v;
  for (const f of ecouteurs) f();
}

export function useApparence(): string | null {
  return useSyncExternalStore(
    (f) => { ecouteurs.add(f); return () => { ecouteurs.delete(f); }; },
    () => courante,
    () => courante,
  );
}
