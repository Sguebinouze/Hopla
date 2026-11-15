// Thème clair ou sombre. Sans choix enregistré, l'app suit le réglage de l'appareil
// (tokens.css gère ce cas par prefers-color-scheme).
export type Theme = 'light' | 'dark';

const CLE = 'hopla.theme';

export function themeChoisi(): Theme | null {
  try {
    const t = localStorage.getItem(CLE);
    return t === 'light' || t === 'dark' ? t : null;
  } catch {
    return null;
  }
}

export function themeEffectif(): Theme {
  return themeChoisi() ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

export function choisirTheme(t: Theme): void {
  try {
    localStorage.setItem(CLE, t);
  } catch {
    // Stockage indisponible : le choix vaut pour cette visite.
  }
  document.documentElement.dataset.theme = t;
}
