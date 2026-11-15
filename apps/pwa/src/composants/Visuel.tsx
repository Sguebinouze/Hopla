import { ecrireRelatif, type Visuel as V } from '@hopla/generateurs';

/** `revele` : après la réponse, la droite graduée montre le saut jusqu'au résultat. */
export function Visuel({ visuel, revele = false }: { visuel: V; revele?: boolean }) {
  if (visuel.type === 'grille') {
    const { lignes, colonnes, coloriees } = visuel;
    const c = 48;
    const g = 6;
    const l = colonnes * (c + g) + g;
    const h = lignes * (c + g) + g;
    return (
      <svg width={l} height={h} viewBox={`0 0 ${l} ${h}`} role="img"
        aria-label={`Une tablette de ${lignes * colonnes} carrés, ${coloriees} coloriés`}>
        <rect width={l} height={h} rx={10} fill="#7A4A2A" />
        {Array.from({ length: lignes * colonnes }, (_, i) => (
          <rect key={i} x={g + (i % colonnes) * (c + g)} y={g + Math.floor(i / colonnes) * (c + g)}
            width={c} height={c} rx={6} fill={i < coloriees ? '#FF8A3D' : '#A86A44'} />
        ))}
      </svg>
    );
  }

  const { min, max, depart, saut } = visuel;
  const pas = 40;
  const largeur = (max - min) * pas + 40;
  const x = (n: number) => 20 + (n - min) * pas;
  const arrivee = depart + saut;
  return (
    <svg width="100%" viewBox={`0 0 ${largeur} 100`} role="img"
      aria-label={`Droite graduée de ${ecrireRelatif(min)} à ${ecrireRelatif(max)}, départ ${ecrireRelatif(depart)}`}
      style={{ maxWidth: largeur }}>
      <line x1={8} y1={64} x2={largeur - 8} y2={64} stroke="#1A1D3A" strokeWidth={2} />
      {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((n) => (
        <g key={n}>
          <line x1={x(n)} y1={n === 0 ? 54 : 58} x2={x(n)} y2={n === 0 ? 74 : 70} stroke="#1A1D3A" strokeWidth={n === 0 ? 3 : 2} />
          <text x={x(n)} y={92} textAnchor="middle" fontSize={13} fontWeight={600} fill="#3A4060" fontFamily="Lexend">
            {ecrireRelatif(n)}
          </text>
        </g>
      ))}
      <circle cx={x(depart)} cy={64} r={7} fill="#F76707" />
      {revele && (
        <>
          <path d={`M${x(depart)} 54 Q${(x(depart) + x(arrivee)) / 2} 10 ${x(arrivee)} 54`}
            fill="none" stroke="#0B6E3E" strokeWidth={3} strokeDasharray="6 5" />
          <circle cx={x(arrivee)} cy={64} r={7} fill="#0B6E3E" />
        </>
      )}
    </svg>
  );
}
