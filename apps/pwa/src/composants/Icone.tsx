const CHEMINS = {
  retour: <path d="M15 5l-7 7 7 7" />,
  fermer: <path d="M6 6l12 12M18 6L6 18" />,
  cadenas: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </>
  ),
  flamme: <path d="M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-3 2-4 2-7 1 1 2 2 3 4 0-3 0-5 0-7z" />,
  eclair: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  ampoule: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 00-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0012 3z" />
    </>
  ),
  coche: <path d="M5 12l5 5 9-10" />,
  effacer: (
    <>
      <path d="M21 5H9l-6 7 6 7h12z" />
      <path d="M16 10l-4 4M12 10l4 4" />
    </>
  ),
} as const;

export type NomIcone = keyof typeof CHEMINS;

export function Icone({ nom, taille = 24, label }: { nom: NomIcone; taille?: number; label?: string }) {
  return (
    <svg
      className="hp-icon"
      width={taille}
      height={taille}
      viewBox="0 0 24 24"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {CHEMINS[nom]}
    </svg>
  );
}
