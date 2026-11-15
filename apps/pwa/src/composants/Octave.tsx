import { COULEURS_OCTAVE, lireApparence, useApparence } from '../lib/apparence';

export type Humeur = 'accueil' | 'reflechit' | 'reussite' | 'oups';

const LIBELLES: Record<Humeur, string> = {
  accueil: 'Octave',
  reflechit: 'Octave réfléchit',
  reussite: 'Octave est content',
  oups: 'Octave t’explique',
};

/**
 * Octave, le compagnon. Couleurs propres à l'illustration (voir le design system).
 * Par défaut, il prend l'apparence choisie par l'enfant en session ; `apparence` force un aperçu.
 */
export function Octave({ humeur = 'accueil', taille = 64, apparence }: { humeur?: Humeur; taille?: number; apparence?: string | null }) {
  const choisie = useApparence();
  const { couleur, accessoire } = lireApparence(apparence === undefined ? choisie : apparence);
  const { corps, ventre } = COULEURS_OCTAVE.find((c) => c.id === couleur)!;
  const trait = { stroke: '#1A1D3A', fill: 'none', strokeLinecap: 'round' as const };
  return (
    <svg width={taille} height={taille} viewBox="0 0 100 100" role="img" aria-label={LIBELLES[humeur]}>
      <path {...trait} strokeWidth={3} d="M40 24 Q34 10 26 8" />
      <circle cx={26} cy={8} r={5} fill="#FFC53D" />
      <path {...trait} strokeWidth={3} d={humeur === 'oups' ? 'M60 24 Q66 12 76 14' : 'M60 24 Q66 10 74 8'} />
      <circle cx={humeur === 'oups' ? 76 : 74} cy={humeur === 'oups' ? 14 : 8} r={humeur === 'reflechit' ? 7 : 5} fill={humeur === 'reflechit' ? '#FFE27A' : '#FFC53D'} />
      {humeur === 'reussite' && (
        <>
          <ellipse cx={14} cy={38} rx={6} ry={12} fill={corps} transform="rotate(-35 14 38)" />
          <ellipse cx={86} cy={38} rx={6} ry={12} fill={corps} transform="rotate(35 86 38)" />
        </>
      )}
      <ellipse cx={50} cy={58} rx={34} ry={35} fill={corps} />
      <ellipse cx={50} cy={68} rx={20} ry={19} fill={ventre} />
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
      <Accessoire id={accessoire} />
    </svg>
  );
}

function Accessoire({ id }: { id: string }) {
  switch (id) {
    case 'lunettes':
      return (
        <g fill="none" stroke="#1A1D3A" strokeWidth={3}>
          <circle cx={38} cy={47} r={12} />
          <circle cx={62} cy={47} r={12} />
          <path d="M26 45l-5-3M74 45l5-3" strokeLinecap="round" />
        </g>
      );
    case 'casquette':
      return (
        <>
          <path d="M27 32Q27 13 50 13T73 32z" fill="#E03131" />
          <path d="M66 30q14-2 21 3-9 4-21 2z" fill="#C92A2A" />
          <circle cx={50} cy={14} r={2.5} fill="#C92A2A" />
        </>
      );
    case 'fleur':
      return (
        <g transform="translate(33 27)">
          {[0, 72, 144, 216, 288].map((r) => (
            <circle key={r} cx={0} cy={-5} r={4} fill="#FF8FB1" transform={`rotate(${r})`} />
          ))}
          <circle r={3.2} fill="#FFC53D" />
        </g>
      );
    case 'casque':
      return (
        <>
          <path d="M20 52Q19 18 50 18T80 52" fill="none" stroke="#1A1D3A" strokeWidth={4.5} strokeLinecap="round" />
          <rect x={12} y={44} width={12} height={18} rx={5} fill="#4B3FD1" />
          <rect x={76} y={44} width={12} height={18} rx={5} fill="#4B3FD1" />
        </>
      );
    case 'chapeau':
      return (
        <>
          <path d="M36 28L54 1l12 27z" fill="#4B3FD1" />
          <ellipse cx={51} cy={28} rx={21} ry={4.5} fill="#3B30B8" />
          <path d="M52 11l1 2.4 2.6.2-2 1.7.6 2.5-2.2-1.4-2.2 1.4.6-2.5-2-1.7 2.6-.2z" fill="#FFC53D" />
          <circle cx={58} cy={21} r={1.6} fill="#FFC53D" />
        </>
      );
    case 'couronne':
      return (
        <>
          <path d="M35 28V12l7.5 7L50 8l7.5 11 7.5-7v16z" fill="#FFC53D" stroke="#E8A400" strokeWidth={1.5} strokeLinejoin="round" />
          <circle cx={50} cy={21} r={2.4} fill="#C2255C" />
          <circle cx={41} cy={23} r={1.6} fill="#1A9C8C" />
          <circle cx={59} cy={23} r={1.6} fill="#1A9C8C" />
        </>
      );
    default:
      return null;
  }
}
