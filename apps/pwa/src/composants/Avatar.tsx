// Avatars : un personnage et une teinte (« chat-bleu »). L'ancien format (« violet ») reste lu
// comme le personnage de base. Couleurs propres à l'illustration.

export const TEINTES: Record<string, [string, string]> = {
  orange: ['#FFF0E3', '#F76707'],
  violet: ['#ECEAFE', '#4B3FD1'],
  teal: ['#E3F6F4', '#1A9C8C'],
  framboise: ['#FCE4EC', '#C2255C'],
  soleil: ['#FFF6D6', '#E8A400'],
  bleu: ['#E5EEFF', '#2F6FEB'],
  vert: ['#E6F4EA', '#2B8A3E'],
  ardoise: ['#ECEEF3', '#5B6178'],
};

export const PERSONNAGES = ['enfant', 'chat', 'lapin', 'ours', 'renard', 'hibou', 'robot'] as const;
export type Personnage = (typeof PERSONNAGES)[number];

export const NOMS_PERSONNAGES: Record<Personnage, string> = {
  enfant: 'Personnage', chat: 'Chat', lapin: 'Lapin', ours: 'Ours', renard: 'Renard', hibou: 'Hibou', robot: 'Robot',
};

export const NOMS_TEINTES: Record<string, string> = {
  orange: 'Orange', violet: 'Violet', teal: 'Turquoise', framboise: 'Framboise',
  soleil: 'Soleil', bleu: 'Bleu', vert: 'Vert', ardoise: 'Ardoise',
};

export function lireAvatar(avatar: string): { personnage: Personnage; teinte: string } {
  const [a, b] = avatar.includes('-') ? avatar.split('-') : ['enfant', avatar];
  const personnage = (PERSONNAGES as readonly string[]).includes(a!) ? (a as Personnage) : 'enfant';
  return { personnage, teinte: b && TEINTES[b] ? b : 'orange' };
}

export function ecrireAvatar(personnage: Personnage, teinte: string): string {
  return personnage === 'enfant' ? teinte : `${personnage}-${teinte}`;
}

const ENCRE = '#1A1D3A';

function Yeux({ y = 41, ecart = 7 }: { y?: number; ecart?: number }) {
  return (
    <>
      <circle cx={38 - ecart} cy={y} r={2.6} fill={ENCRE} />
      <circle cx={38 + ecart} cy={y} r={2.6} fill={ENCRE} />
    </>
  );
}

function Dessin({ personnage, fond, corps }: { personnage: Personnage; fond: string; corps: string }) {
  switch (personnage) {
    case 'chat':
      return (
        <>
          <path d="M21 36L23 15 37 26z" fill={corps} />
          <path d="M55 36L53 15 39 26z" fill={corps} />
          <path d="M25 30l1-9 6 5z" fill={fond} />
          <path d="M51 30l-1-9-6 5z" fill={fond} />
          <circle cx={38} cy={43} r={19} fill={corps} />
          <Yeux />
          <path d="M35.5 47h5L38 50z" fill={ENCRE} />
          <path d="M22 46l9 1M22 51l9-2M54 46l-9 1M54 51l-9-2" stroke={fond} strokeWidth={1.6} strokeLinecap="round" />
        </>
      );
    case 'lapin':
      return (
        <>
          <ellipse cx={30} cy={18} rx={5.5} ry={13} fill={corps} />
          <ellipse cx={46} cy={18} rx={5.5} ry={13} fill={corps} />
          <ellipse cx={30} cy={19} rx={2.5} ry={9} fill={fond} />
          <ellipse cx={46} cy={19} rx={2.5} ry={9} fill={fond} />
          <circle cx={38} cy={45} r={18} fill={corps} />
          <Yeux y={43} />
          <ellipse cx={38} cy={50} rx={2.6} ry={2} fill={ENCRE} />
          <path d="M38 52v3M35 56h6" stroke={ENCRE} strokeWidth={1.6} strokeLinecap="round" />
        </>
      );
    case 'ours':
      return (
        <>
          <circle cx={23} cy={28} r={7.5} fill={corps} />
          <circle cx={53} cy={28} r={7.5} fill={corps} />
          <circle cx={23} cy={28} r={3.5} fill={fond} />
          <circle cx={53} cy={28} r={3.5} fill={fond} />
          <circle cx={38} cy={43} r={19} fill={corps} />
          <Yeux y={39} />
          <ellipse cx={38} cy={49} rx={8.5} ry={6.5} fill={fond} />
          <ellipse cx={38} cy={47} rx={3.2} ry={2.3} fill={ENCRE} />
        </>
      );
    case 'renard':
      return (
        <>
          <path d="M19 38L21 12 36 25z" fill={corps} />
          <path d="M57 38L55 12 40 25z" fill={corps} />
          <path d="M23 29l1-10 7 6z" fill={ENCRE} opacity={0.35} />
          <path d="M53 29l-1-10-7 6z" fill={ENCRE} opacity={0.35} />
          <circle cx={38} cy={42} r={19} fill={corps} />
          <path d="M19.5 43C26 47 32 50 38 59 44 50 50 47 56.5 43 54 56 46 62 38 62S22 56 19.5 43z" fill="#fff" />
          <Yeux y={39} />
          <circle cx={38} cy={55} r={2.6} fill={ENCRE} />
        </>
      );
    case 'hibou':
      return (
        <>
          <path d="M20 30l3-12 9 8zM56 30l-3-12-9 8z" fill={corps} />
          <ellipse cx={38} cy={44} rx={19} ry={20} fill={corps} />
          <circle cx={30} cy={40} r={7.5} fill="#fff" />
          <circle cx={46} cy={40} r={7.5} fill="#fff" />
          <circle cx={30} cy={40} r={3.3} fill={ENCRE} />
          <circle cx={46} cy={40} r={3.3} fill={ENCRE} />
          <path d="M35 47h6l-3 5z" fill="#FFC53D" />
          <path d="M30 56q4 3 8 0 4 3 8 0" stroke={fond} strokeWidth={1.8} fill="none" strokeLinecap="round" />
        </>
      );
    case 'robot':
      return (
        <>
          <path d="M38 24v-8" stroke={ENCRE} strokeWidth={2.4} strokeLinecap="round" />
          <circle cx={38} cy={14} r={3.5} fill="#FFC53D" />
          <rect x={17} y={36} width={5} height={10} rx={2} fill={corps} />
          <rect x={54} y={36} width={5} height={10} rx={2} fill={corps} />
          <rect x={20} y={24} width={36} height={34} rx={9} fill={corps} />
          <rect x={26} y={34} width={10} height={9} rx={3} fill="#fff" />
          <rect x={40} y={34} width={10} height={9} rx={3} fill="#fff" />
          <circle cx={31} cy={38.5} r={2.3} fill={ENCRE} />
          <circle cx={45} cy={38.5} r={2.3} fill={ENCRE} />
          <rect x={29} y={48} width={18} height={4} rx={2} fill={fond} />
        </>
      );
    default:
      return (
        <>
          <circle cx={38} cy={32} r={14} fill={corps} />
          <path d="M14 66c4-12 14-17 24-17s20 5 24 17" fill={corps} />
        </>
      );
  }
}

export function Avatar({ teinte: avatar, taille = 72 }: { teinte: string; taille?: number }) {
  const { personnage, teinte } = lireAvatar(avatar);
  const [fond, corps] = TEINTES[teinte]!;
  return (
    <svg width={taille} height={taille} viewBox="0 0 76 76" aria-hidden="true">
      <defs>
        <clipPath id="avatar-rond"><circle cx="38" cy="38" r="38" /></clipPath>
      </defs>
      <circle cx="38" cy="38" r="38" fill={fond} />
      <g clipPath="url(#avatar-rond)"><Dessin personnage={personnage} fond={fond} corps={corps} /></g>
    </svg>
  );
}
