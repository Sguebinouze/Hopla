import { fractionsColoriees } from './fractions-c2';
import { additionRelatifs } from './relatifs-c4';
import { tablesMultiplication } from './tables-c2';
import type { Difficulte, Generateur, Item } from './types';

export type { Difficulte, Gabarit, Generateur, Item, Visuel } from './types';
export { ecrireRelatif, ecrireTerme } from './relatifs-c4';

export const GENERATEURS: Generateur[] = [fractionsColoriees, tablesMultiplication, additionRelatifs];

export function generateur(id: string): Generateur {
  const g = GENERATEURS.find((x) => x.id === id);
  if (!g) throw new Error(`Générateur inconnu : ${id}`);
  return g;
}

/** Une série de `n` items distincts pour un générateur. */
export function serie(id: string, n: number, graineBase: number, difficulte: Difficulte): Item[] {
  const g = generateur(id);
  const vus = new Set<string>();
  const items: Item[] = [];
  for (let i = 0; items.length < n && i < n * 20; i++) {
    const item = g.generer(graineBase + i, difficulte);
    const cle = item.consigne + (item.visuel ? JSON.stringify(item.visuel) : '');
    if (!vus.has(cle)) {
      vus.add(cle);
      items.push(item);
    }
  }
  return items;
}

/** Normalise une saisie : espaces, signe moins typographique ou clavier. */
export function normaliserReponse(saisie: string): string {
  return saisie.trim().replace(/\s+/g, '').replace(/^-/, '−').replace(/^\+/, '');
}
