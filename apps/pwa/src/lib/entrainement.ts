// Dates du mode contrôle. Les records et le contrôle prévu sont en base (api.records, api.controle).

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
