import { ecrireRelatif, type ElementFigure, type Point, type Visuel as V } from '@hopla/generateurs';
import { Diagramme, Fractions, Horloge, Monnaie, Regle, Solide, Urne } from './Dessins';

type VFigure = Extract<V, { type: 'figure' }>;
const LETTRES = 'ABCDEFGHIJKLMNOP';
const POLICE = { fontFamily: 'var(--font-text)', fontWeight: 600 } as const;

/** Figure de géométrie : unités de carreau converties en pixels, couleurs du DS. */
function Figure({ visuel }: { visuel: VFigure }) {
  const { largeur, hauteur, quadrillage, reperes, elements } = visuel;
  const u = Math.min(40, 360 / Math.max(largeur, hauteur));
  const m = reperes ? 26 : 14;
  const L = largeur * u + 2 * m;
  const H = hauteur * u + 2 * m;
  const X = (p: Point) => m + p[0] * u;
  const Y = (p: Point) => m + p[1] * u;
  // Repères déjà dessinés : une étiquette se place là où elle s'en éloigne le plus.
  const occupe: Point[] = elements.flatMap((e): Point[] => {
    if (e.forme === 'point') return [e.en];
    if (e.forme === 'segment' || e.forme === 'droite' || e.forme === 'axe')
      return Array.from({ length: 9 }, (_, k): Point => [e.de[0] + ((e.a[0] - e.de[0]) * k) / 8, e.de[1] + ((e.a[1] - e.de[1]) * k) / 8]);
    if (e.forme === 'cercle')
      return Array.from({ length: 24 }, (_, k): Point => [e.centre[0] + e.rayon * Math.cos((k * Math.PI) / 12), e.centre[1] + e.rayon * Math.sin((k * Math.PI) / 12)]);
    if (e.forme === 'polygone') return e.sommets;
    return [];
  });
  const etiquette = (p: Point, nom: string, k: string) => {
    let meilleur: Point = [0, -0.5];
    let ecart = -1;
    for (let i = 0; i < 8; i++) {
      const c: Point = [p[0] + 0.5 * Math.cos((i * Math.PI) / 4 - Math.PI / 4), p[1] + 0.5 * Math.sin((i * Math.PI) / 4 - Math.PI / 4)];
      const proche = Math.min(...occupe.map((o) => Math.hypot(o[0] - c[0], o[1] - c[1])));
      if (proche > ecart + 0.01) { ecart = proche; meilleur = c; }
    }
    return (
      <text key={k} x={X(meilleur)} y={Y(meilleur) + 6} textAnchor="middle" fontSize={16} fill="var(--ink)" {...POLICE}>{nom}</text>
    );
  };
  const trace = (e: ElementFigure, i: number) => {
    switch (e.forme) {
      case 'case':
        return <rect key={i} x={X([e.colonne, e.ligne]) + 1} y={Y([e.colonne, e.ligne]) + 1} width={u - 2} height={u - 2} rx={3}
          fill={e.accent ? 'var(--primary)' : 'var(--primary-soft)'} stroke={e.accent ? 'var(--primary-strong)' : 'var(--primary)'} strokeWidth={1.5} />;
      case 'polygone':
        return <polygon key={i} points={e.sommets.map((p) => `${X(p)},${Y(p)}`).join(' ')}
          fill={e.plein ? 'var(--primary-soft)' : 'none'} stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round" />;
      case 'cercle':
        return <circle key={i} cx={X(e.centre)} cy={Y(e.centre)} r={e.rayon * u}
          fill={e.plein ? 'var(--primary-soft)' : 'none'} stroke={e.plein ? 'var(--primary)' : 'var(--ink)'} strokeWidth={2.5} />;
      case 'segment':
        return <line key={i} x1={X(e.de)} y1={Y(e.de)} x2={X(e.a)} y2={Y(e.a)}
          stroke={e.accent ? 'var(--primary)' : 'var(--ink)'} strokeWidth={e.accent ? 3.5 : 2.5} strokeLinecap="round" />;
      case 'axe':
        return <line key={i} x1={X(e.de)} y1={Y(e.de)} x2={X(e.a)} y2={Y(e.a)}
          stroke="var(--octave-deep)" strokeWidth={3} strokeDasharray="8 6" />;
      case 'droite':
        return (
          <g key={i}>
            <line x1={X(e.de)} y1={Y(e.de)} x2={X(e.a)} y2={Y(e.a)} stroke="var(--ink)" strokeWidth={2.5} strokeLinecap="round" />
            {e.nom && etiquette(e.de, e.nom, 'n')}
          </g>
        );
      case 'point':
        return (
          <g key={i}>
            <path d={`M${X(e.en) - 5} ${Y(e.en) - 5}L${X(e.en) + 5} ${Y(e.en) + 5}M${X(e.en) - 5} ${Y(e.en) + 5}L${X(e.en) + 5} ${Y(e.en) - 5}`}
              stroke="var(--ink)" strokeWidth={2.5} strokeLinecap="round" />
            {e.nom && etiquette(e.en, e.nom, 'n')}
          </g>
        );
    }
  };
  return (
    <svg width="100%" viewBox={`0 0 ${L} ${H}`} role="img" aria-label="Figure de géométrie" style={{ maxWidth: L }}>
      {quadrillage && (
        <g stroke="var(--line)" strokeWidth={1}>
          {Array.from({ length: largeur + 1 }, (_, k) => <line key={`c${k}`} x1={m + k * u} y1={m} x2={m + k * u} y2={m + hauteur * u} />)}
          {Array.from({ length: hauteur + 1 }, (_, k) => <line key={`l${k}`} x1={m} y1={m + k * u} x2={m + largeur * u} y2={m + k * u} />)}
        </g>
      )}
      {reperes && (
        <g fontSize={12} fill="var(--ink-muted)" textAnchor="middle" {...POLICE}>
          {Array.from({ length: largeur }, (_, k) => <text key={`c${k}`} x={m + (k + 0.5) * u} y={m - 8}>{LETTRES[k]}</text>)}
          {Array.from({ length: hauteur }, (_, k) => <text key={`l${k}`} x={m / 2} y={m + (k + 0.5) * u + 4}>{k + 1}</text>)}
        </g>
      )}
      {elements.map(trace)}
    </svg>
  );
}

/** `revele` : après la réponse, la droite graduée montre le saut jusqu'au résultat. */
export function Visuel({ visuel, revele = false }: { visuel: V; revele?: boolean }) {
  switch (visuel.type) {
    case 'figure': return <Figure visuel={visuel} />;
    case 'horloge': return <Horloge {...visuel} />;
    case 'monnaie': return <Monnaie {...visuel} />;
    case 'fractions': return <Fractions {...visuel} />;
    case 'diagramme': return <Diagramme {...visuel} />;
    case 'solide': return <Solide solide={visuel.solide} />;
    case 'urne': return <Urne {...visuel} />;
    case 'regle': return <Regle {...visuel} />;
  }
  if (visuel.type === 'grille') {
    const { lignes, colonnes, coloriees } = visuel;
    const c = 48;
    const g = 6;
    const l = colonnes * (c + g) + g;
    const h = lignes * (c + g) + g;
    return (
      <svg width={l} height={h} viewBox={`0 0 ${l} ${h}`} role="img"
        aria-label={`Une tablette de ${lignes * colonnes} carrés, ${coloriees} coloriés`}>
        <rect width={l} height={h} rx={10} fill="var(--surface-2)" />
        {/* Parts coloriées pleines, parts vides blanches et cerclées : le contraste ne laisse aucun doute. */}
        {Array.from({ length: lignes * colonnes }, (_, i) => (
          <rect key={i} x={g + (i % colonnes) * (c + g) + 1} y={g + Math.floor(i / colonnes) * (c + g) + 1}
            width={c - 2} height={c - 2} rx={6} fill={i < coloriees ? 'var(--primary)' : 'var(--surface-1)'}
            stroke={i < coloriees ? 'var(--primary-strong)' : 'var(--line)'} strokeWidth={2} />
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
      <line x1={8} y1={64} x2={largeur - 8} y2={64} stroke="var(--ink)" strokeWidth={2} />
      {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((n) => (
        <g key={n}>
          <line x1={x(n)} y1={n === 0 ? 54 : 58} x2={x(n)} y2={n === 0 ? 74 : 70} stroke="var(--ink)" strokeWidth={n === 0 ? 3 : 2} />
          <text x={x(n)} y={92} textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--ink-muted)" fontFamily="var(--font-text)">
            {ecrireRelatif(n)}
          </text>
        </g>
      ))}
      <circle cx={x(depart)} cy={64} r={7} fill="var(--streak)" />
      {revele && (
        <>
          <path d={`M${x(depart)} 54 Q${(x(depart) + x(arrivee)) / 2} 10 ${x(arrivee)} 54`}
            fill="none" stroke="var(--success)" strokeWidth={3} strokeDasharray="6 5" />
          <circle cx={x(arrivee)} cy={64} r={7} fill="var(--success)" />
        </>
      )}
    </svg>
  );
}
