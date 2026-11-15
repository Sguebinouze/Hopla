export type Humeur = 'accueil' | 'reflechit' | 'reussite' | 'oups';

const LIBELLES: Record<Humeur, string> = {
  accueil: 'Octave',
  reflechit: 'Octave réfléchit',
  reussite: 'Octave est content',
  oups: 'Octave t’explique',
};

/** Octave, le compagnon. Couleurs fixes de l'illustration (voir le design system). */
export function Octave({ humeur = 'accueil', taille = 64 }: { humeur?: Humeur; taille?: number }) {
  const trait = { stroke: '#1A1D3A', fill: 'none', strokeLinecap: 'round' as const };
  return (
    <svg width={taille} height={taille} viewBox="0 0 100 100" role="img" aria-label={LIBELLES[humeur]}>
      <path {...trait} strokeWidth={3} d="M40 24 Q34 10 26 8" />
      <circle cx={26} cy={8} r={5} fill="#FFC53D" />
      <path {...trait} strokeWidth={3} d={humeur === 'oups' ? 'M60 24 Q66 12 76 14' : 'M60 24 Q66 10 74 8'} />
      <circle cx={humeur === 'oups' ? 76 : 74} cy={humeur === 'oups' ? 14 : 8} r={humeur === 'reflechit' ? 7 : 5} fill={humeur === 'reflechit' ? '#FFE27A' : '#FFC53D'} />
      {humeur === 'reussite' && (
        <>
          <ellipse cx={14} cy={38} rx={6} ry={12} fill="#1A9C8C" transform="rotate(-35 14 38)" />
          <ellipse cx={86} cy={38} rx={6} ry={12} fill="#1A9C8C" transform="rotate(35 86 38)" />
        </>
      )}
      <ellipse cx={50} cy={58} rx={34} ry={35} fill="#22B8A5" />
      <ellipse cx={50} cy={68} rx={20} ry={19} fill="#E3F6F4" />
      <path d="M39 70 L50 75.5 L39 81 Z" fill="#C2255C" />
      <path d="M61 70 L50 75.5 L61 81 Z" fill="#C2255C" />
      <circle cx={50} cy={75.5} r={3} fill="#A61E4D" />
      {humeur === 'reussite' ? (
        <>
          <path {...trait} strokeWidth={4} d="M30 47 Q38 39 46 47" />
          <path {...trait} strokeWidth={4} d="M54 47 Q62 39 70 47" />
          <path d="M40 57 Q50 69 60 57 Z" fill="#1A1D3A" />
        </>
      ) : (
        <>
          <circle cx={38} cy={47} r={10} fill="#fff" />
          <circle cx={62} cy={47} r={10} fill="#fff" />
          <circle cx={humeur === 'oups' ? 38 : 40} cy={humeur === 'reflechit' ? 44 : 49} r={5} fill="#1A1D3A" />
          <circle cx={humeur === 'oups' ? 62 : 64} cy={humeur === 'reflechit' ? 44 : 49} r={5} fill="#1A1D3A" />
          <path {...trait} strokeWidth={2.5} d="M30 35 Q38 31 46 34" />
          <path {...trait} strokeWidth={2.5} d="M54 34 Q62 31 70 35" />
          {humeur === 'oups' && <circle cx={50} cy={62} r={4} fill="#1A1D3A" />}
          {humeur === 'reflechit' && <path {...trait} strokeWidth={3} d="M44 61 L56 61" />}
          {humeur === 'accueil' && <path {...trait} strokeWidth={3} d="M42 59 Q50 66 58 59" />}
        </>
      )}
    </svg>
  );
}
