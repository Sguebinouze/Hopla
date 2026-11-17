import { Children, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Répartit n éléments en rangées équilibrées, sans case vide :
 * autant de rangées qu'il faut avec `colonnesMax` colonnes au plus, puis des rangées de tailles égales
 * à une unité près (les plus longues d'abord). Exemple : 5 éléments sur 4 colonnes → 3 + 2.
 */
export function rangees(n: number, colonnesMax: number): number[] {
  if (n <= 0) return [];
  const max = Math.max(1, Math.floor(colonnesMax));
  const nb = Math.ceil(n / max);
  const base = Math.floor(n / nb);
  const plus = n % nb;
  return Array.from({ length: nb }, (_, i) => base + (i < plus ? 1 : 0));
}

/** Nombre de colonnes possibles dans une largeur donnée. */
export const colonnesPour = (largeur: number, min: number, ecart: number) => Math.max(1, Math.floor((largeur + ecart) / (min + ecart)));

const ESPACES = { 2: 8, 3: 12 } as const;

/**
 * Grille qui s'adapte à la largeur disponible : chaque carte fait au moins `min` pixels,
 * les rangées sont équilibrées et chaque rangée occupe toute la largeur. Aucun trou, quelle que soit la résolution.
 * `min` peut dépendre de la largeur (cartes plus petites sur téléphone).
 */
export function GrilleEquilibree({ min, espace = 3, className, children }: {
  min: number | ((largeur: number) => number);
  /** Écart entre les cartes, en jetons d'espacement du DS (--space-2 ou --space-3). */
  espace?: keyof typeof ESPACES;
  className?: string;
  children: ReactNode;
}) {
  const ecart = ESPACES[espace];
  const gap = `var(--space-${espace})`;
  const ref = useRef<HTMLDivElement>(null);
  const [largeur, setLargeur] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setLargeur(el.clientWidth);
    if (typeof ResizeObserver === 'undefined') return;
    const obs = new ResizeObserver(([e]) => setLargeur(e!.contentRect.width));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const elements = Children.toArray(children);
  // Avant la première mesure : une colonne, comme sur téléphone.
  const tailles = rangees(elements.length, largeur ? colonnesPour(largeur, typeof min === 'function' ? min(largeur) : min, ecart) : 1);
  let k = 0;
  return (
    <div ref={ref} className={`grille-eq${className ? ` ${className}` : ''}`} style={{ gap }}>
      {tailles.map((t, r) => (
        <div key={r} className="grille-eq__rangee" style={{ gridTemplateColumns: `repeat(${t}, minmax(0, 1fr))`, gap }}>
          {elements.slice(k, (k += t))}
        </div>
      ))}
    </div>
  );
}
