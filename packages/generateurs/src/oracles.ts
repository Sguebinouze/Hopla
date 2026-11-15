// Outils d'oracle pour les tests de justesse : ils recalculent la réponse à partir de la consigne,
// sans réutiliser la logique des générateurs. Réservé aux fichiers *.test.ts.
import { expect } from 'vitest';
import { generateur } from './index';
import type { Difficulte, Item } from './types';

export const DIFFICULTES: Difficulte[] = [1, 2, 3];
export const GRAINES = Array.from({ length: 400 }, (_, i) => i * 7919 + 1);

/** Valeur d'une écriture française : « 1 234,5 », « −3 », « 3/4 ». */
export const val = (s: string): number => {
  const t = s.replace(/[\s  ]/g, '').replace(/,/g, '.').replace(/−/g, '-');
  if (/^-?\d+(\.\d+)?\/\d+$/.test(t)) {
    const [p, q] = t.split('/').map(Number);
    return p! / q!;
  }
  return Number(t);
};

/** Évalue une expression arithmétique écrite à la française. */
export const calculer = (expr: string): number => {
  const js = expr
    .replace(/(\d)[\s  ](?=\d{3}\b)/g, '$1')
    .replace(/(\d),(\d)/g, '$1.$2')
    .replace(/×/g, '*').replace(/÷/g, '/').replace(/[−–]/g, '-');
  if (!/^[\d.+\-*/() ]+$/.test(js)) throw new Error(`Expression inattendue : ${expr}`);
  return Function(`return (${js});`)() as number;
};

export const proche = (x: number, y: number) => Math.abs(x - y) < 1e-9 * Math.max(1, Math.abs(y));

/** Parcourt toutes les graines pour une difficulté. */
export const tous = (id: string, d: Difficulte, f: (item: Item) => void) => {
  for (const graine of GRAINES) f(generateur(id).generer(graine, d));
};

/** Parcourt toutes les graines et toutes les difficultés. */
export const partout = (id: string, f: (item: Item, d: Difficulte) => void) => {
  for (const d of DIFFICULTES) for (const graine of GRAINES) f(generateur(id).generer(graine, d), d);
};

/** Vérifie une égalité à trou (« … » ou « ? ») une fois la réponse placée. */
export const egaliteVraie = (item: Item) => {
  const eq = item.consigne.replace(/^Complète : /, '').replace(/[…?]/, `(${item.reponse})`);
  const [g, dr] = eq.split('=');
  expect(proche(calculer(g!), calculer(dr!)), item.consigne).toBe(true);
};

/** Vérifie une consigne « Calcule : <expression> ». */
export const calculJuste = (item: Item) => {
  const expr = item.consigne.match(/^Calcule : (.+)$/)![1]!;
  expect(proche(calculer(expr), val(item.reponse)), item.consigne).toBe(true);
};
