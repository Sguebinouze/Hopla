// Records de défis et contrôle prévu : gardés sur l'appareil, par enfant.
// Rien de personnel : des scores et des identifiants de notions.

export interface Controle {
  date: string; // AAAA-MM-JJ
  notions: string[];
}

const lire = <T>(cle: string, defaut: T): T => {
  try {
    const brut = localStorage.getItem(cle);
    return brut ? (JSON.parse(brut) as T) : defaut;
  } catch {
    return defaut;
  }
};
const ecrire = (cle: string, valeur: unknown) => {
  try {
    if (valeur === null) localStorage.removeItem(cle);
    else localStorage.setItem(cle, JSON.stringify(valeur));
  } catch {
    /* stockage indisponible : rien n'est gardé */
  }
};

export function records(enfant: string): Record<string, number> {
  return lire(`hopla.defis.${enfant}`, {});
}

/** Enregistre un score ; renvoie vrai si c'est un nouveau record. */
export function noterDefi(enfant: string, defi: string, score: number): boolean {
  const r = records(enfant);
  const nouveau = score > (r[defi] ?? 0);
  if (nouveau) ecrire(`hopla.defis.${enfant}`, { ...r, [defi]: score });
  return nouveau;
}

export function controle(enfant: string, jour: string): Controle | null {
  const c = lire<Controle | null>(`hopla.controle.${enfant}`, null);
  return c && c.date >= jour && c.notions.length > 0 ? c : null;
}

export function prevoirControle(enfant: string, c: Controle | null) {
  ecrire(`hopla.controle.${enfant}`, c);
}

/** Prochain vendredi (aujourd'hui exclu), au format AAAA-MM-JJ. */
export function prochainVendredi(d = new Date()): Date {
  const r = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
  while (r.getDay() !== 5) r.setDate(r.getDate() + 1);
  return r;
}

export function joursAvant(date: string, jour: string): number {
  const [a, m, j] = date.split('-').map(Number) as [number, number, number];
  const [b, n, k] = jour.split('-').map(Number) as [number, number, number];
  return Math.round((Date.UTC(a, m - 1, j) - Date.UTC(b, n - 1, k)) / 86_400_000);
}

export function dateLisible(date: string): string {
  const [a, m, j] = date.split('-').map(Number) as [number, number, number];
  return new Date(a, m - 1, j).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}
