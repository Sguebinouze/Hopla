import { ERREURS, ERREURS_DICTEE } from '@hopla/generateurs';

// Suivi d'une notion. Même règle que app.apres_resultat et app.intervalle
// (supabase/migrations/20261116000000_suivi.sql) : la démo calcule ici, Supabase en base.

export interface Suivi {
  score: number;
  nbEssais: number;
  prochaineRevision: string; // AAAA-MM-JJ
  reussitesEspacees: number;
  derniereReussite: string | null;
}

export type Etat = 'nouveau' | 'a-revoir' | 'en-cours' | 'acquis';

export const SEUIL_ACQUIS = 0.85;

export function aujourdhui(d = new Date()): string {
  const z = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
}

function plusJours(jour: string, n: number): string {
  const [a, m, j] = jour.split('-').map(Number) as [number, number, number];
  return aujourdhui(new Date(a, m - 1, j + n));
}

/** Jours avant la prochaine révision. */
export function intervalle(score: number, reussites: number): number {
  if (score < 0.6) return 1;
  if (score < SEUIL_ACQUIS) return 2;
  if (reussites <= 1) return 3;
  if (reussites === 2) return 7;
  if (reussites === 3) return 14;
  return 30;
}

export function majSuivi(s: Suivi | undefined, r: { reussi: boolean; indice: boolean }, jour = aujourdhui()): Suivi {
  const gain = r.reussi ? (r.indice ? 0.2 : 0.3) : 0;
  const score = s ? Math.min(1, s.score * 0.7 + gain) : r.reussi ? 0.3 : 0;
  const avant = s?.reussitesEspacees ?? 0;
  const reussites = score < 0.6 ? 0
    : score >= SEUIL_ACQUIS && (!s?.derniereReussite || s.derniereReussite < jour) ? Math.min(avant + 1, 10)
      : avant;
  return {
    score,
    nbEssais: (s?.nbEssais ?? 0) + 1,
    reussitesEspacees: reussites,
    derniereReussite: score >= SEUIL_ACQUIS ? jour : (s?.derniereReussite ?? null),
    prochaineRevision: plusJours(jour, intervalle(score, reussites)),
  };
}

/** Une notion travaillée revient quand sa date de révision est passée, même si elle était acquise. */
export function etat(s: Suivi | undefined, jour = aujourdhui()): Etat {
  if (!s || s.nbEssais === 0) return 'nouveau';
  if (s.prochaineRevision <= jour) return 'a-revoir';
  return s.score >= SEUIL_ACQUIS ? 'acquis' : 'en-cours';
}

export const LIBELLE_ETAT: Record<Etat, string> = {
  nouveau: 'Nouveau', 'a-revoir': 'À revoir', 'en-cours': 'En cours', acquis: 'Acquis',
};
export const CHIP_ETAT: Record<Etat, string> = {
  nouveau: 'hp-chip--neutral', 'a-revoir': 'hp-chip--attention', 'en-cours': 'hp-chip--sun', acquis: 'hp-chip--success',
};

/** Part de notions acquises (ou à revoir après avoir été acquises) dans une liste. */
export function bilan(ids: string[], suivi: Record<string, Suivi>, jour = aujourdhui()) {
  let acquises = 0;
  let aRevoir = 0;
  for (const id of ids) {
    const s = suivi[id];
    if (s && s.score >= SEUIL_ACQUIS) acquises++;
    if (etat(s, jour) === 'a-revoir') aRevoir++;
  }
  return { acquises, aRevoir, total: ids.length, part: ids.length ? acquises / ids.length : 0 };
}

/** Code d'erreur → libellé du dictionnaire ERREURS, ou code mis en forme s'il n'y figure pas. */
export function libelleErreur(code: string): string {
  const libelle = ERREURS[code] ?? ERREURS_DICTEE[code];
  if (libelle) return libelle;
  const t = code.replace(/-/g, ' ');
  return t.charAt(0).toUpperCase() + t.slice(1);
}
