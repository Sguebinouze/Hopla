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
  'haut-parleur': (
    <>
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12" />
    </>
  ),
  livre: (
    <>
      <path d="M4 5a2 2 0 012-2h13v15H6a2 2 0 00-2 2V5z" />
      <path d="M4 20a2 2 0 002 2h13v-4" />
    </>
  ),
  effacer: (
    <>
      <path d="M21 5H9l-6 7 6 7h12z" />
      <path d="M16 10l-4 4M12 10l4 4" />
    </>
  ),
  // Matières.
  plume: (
    <>
      <path d="M20 12.2a6 6 0 00-8.5-8.5L5 10.3V19h8.6z" />
      <path d="M16 8L3 21M17.5 15H9.3" />
    </>
  ),
  operations: (
    <>
      <path d="M7 4v6M4 7h6M14 7h6M5 15l4 4M9 15l-4 4M14 17h6" />
      <path d="M17 14.2v.1M17 19.7v.1" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" />
    </>
  ),
  loupe: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3L20 20" />
    </>
  ),
  fiole: (
    <>
      <path d="M9 3h6M10 3v6l-5.2 8.7A2.2 2.2 0 006.7 21h10.6a2.2 2.2 0 001.9-3.3L14 9V3" />
      <path d="M7.5 15h9" />
    </>
  ),
  feuille: (
    <>
      <path d="M5 19C4 11 9 5 20 4c0 9-5 15-13 15z" />
      <path d="M4 21c3-5 6-8 10-11" />
    </>
  ),
  atome: (
    <>
      <circle cx="12" cy="12" r="1.3" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)" />
    </>
  ),
  puce: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
    </>
  ),
  bulles: (
    <>
      <path d="M14 9a2 2 0 01-2 2H6l-4 4V4a2 2 0 012-2h8a2 2 0 012 2z" />
      <path d="M18 9h2a2 2 0 012 2v11l-4-4h-6a2 2 0 01-2-2v-1" />
    </>
  ),
  balance: (
    <>
      <path d="M12 3v18M7 21h10M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
      <path d="M2 16l3-8 3 8a5 5 0 01-6 0zM16 16l3-8 3 8a5 5 0 01-6 0z" />
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

/** Icône de chaque matière (identifiants des packs). */
export const ICONE_MATIERE: Record<string, NomIcone> = {
  francais: 'plume', mathematiques: 'operations', 'questionner-le-monde': 'loupe',
  'histoire-geographie': 'globe', 'sciences-technologie': 'fiole', svt: 'feuille',
  'physique-chimie': 'atome', technologie: 'puce', 'langues-vivantes': 'bulles', emc: 'balance',
};
