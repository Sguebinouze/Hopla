const TEINTES: Record<string, [string, string]> = {
  orange: ['#FFF0E3', '#F76707'],
  violet: ['#ECEAFE', '#4B3FD1'],
  teal: ['#E3F6F4', '#1A9C8C'],
  framboise: ['#FCE4EC', '#C2255C'],
};

export function Avatar({ teinte, taille = 72 }: { teinte: string; taille?: number }) {
  const [fond, corps] = TEINTES[teinte] ?? TEINTES.orange!;
  return (
    <svg width={taille} height={taille} viewBox="0 0 76 76" aria-hidden="true">
      <circle cx="38" cy="38" r="38" fill={fond} />
      <circle cx="38" cy="32" r="14" fill={corps} />
      <path d="M14 66c4-12 14-17 24-17s20 5 24 17" fill={corps} />
    </svg>
  );
}
