import { dessinSolide, type CouleurBoule, type NomSolide, type Visuel as V } from '@hopla/generateurs';

// Dessins des questions de maths. Couleurs du DS, sauf les objets réels (pièces, billets, boules)
// qui gardent leur couleur dans les deux thèmes : ce sont des illustrations.
const POLICE = { fontFamily: 'var(--font-text)', fontWeight: 600 } as const;
const OR = '#E2B23C';
const ARGENT = '#C9CED6';
const ENCRE_OBJET = '#1A1D3A';
const BILLETS: Record<number, string> = { 5: '#A3A9B3', 10: '#E07A68', 20: '#5B8FDB', 50: '#F0954A', 100: '#5BB37A' };
const BOULES: Record<CouleurBoule, string> = { rouge: '#E5484D', bleue: '#3E7BFA', verte: '#30A46C', jaune: '#FFC53D', noire: '#2B2E3A' };

/** Horloge à aiguilles. Le libellé ne donne pas l'heure : c'est la question. */
export function Horloge({ heures, minutes }: Extract<V, { type: 'horloge' }>) {
  const r = 92;
  const c = 100;
  const point = (angle: number, l: number) => [c + l * Math.sin(angle), c - l * Math.cos(angle)] as const;
  const [hx, hy] = point((((heures % 12) + minutes / 60) * Math.PI) / 6, 48);
  const [mx, my] = point((minutes * Math.PI) / 30, 74);
  return (
    <svg width={200} height={200} viewBox="0 0 200 200" role="img" aria-label="Une horloge à aiguilles">
      <circle cx={c} cy={c} r={r} fill="var(--surface-0)" stroke="var(--ink)" strokeWidth={4} />
      {Array.from({ length: 60 }, (_, k) => {
        const [x1, y1] = point((k * Math.PI) / 30, r - 4);
        const [x2, y2] = point((k * Math.PI) / 30, r - (k % 5 ? 9 : 15));
        return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink-muted)" strokeWidth={k % 5 ? 1 : 2.5} />;
      })}
      <line x1={c} y1={c} x2={hx} y2={hy} stroke="var(--ink)" strokeWidth={8} strokeLinecap="round" />
      <line x1={c} y1={c} x2={mx} y2={my} stroke="var(--primary)" strokeWidth={5} strokeLinecap="round" />
      {/* Nombres par-dessus les aiguilles, détourés : une aiguille ne cache jamais un nombre. */}
      {Array.from({ length: 12 }, (_, k) => {
        const [x, y] = point(((k + 1) * Math.PI) / 6, r - 30);
        return <text key={k} x={x} y={y + 6} textAnchor="middle" fontSize={18} fill="var(--ink)" stroke="var(--surface-0)" strokeWidth={4} paintOrder="stroke" {...POLICE}>{k + 1}</text>;
      })}
      <circle cx={c} cy={c} r={6} fill="var(--ink)" />
    </svg>
  );
}

/** Pièces et billets : les billets d'abord, puis les pièces, rangés en lignes. */
export function Monnaie({ valeurs }: Extract<V, { type: 'monnaie' }>) {
  const largeur = 352;
  const tries = [...valeurs].sort((a, b) => b - a);
  const places: { v: number; x: number; y: number; l: number; h: number }[] = [];
  let x = 0;
  let y = 0;
  let hLigne = 0;
  let billet = true;
  for (const v of tries) {
    const estBillet = v >= 5;
    const [l, h] = estBillet ? [86, 48] : v === 2 ? [46, 46] : [42, 42];
    if (billet && !estBillet && x > 0) { x = 0; y += hLigne + 10; hLigne = 0; }
    billet = estBillet;
    if (x + l > largeur) { x = 0; y += hLigne + 10; hLigne = 0; }
    places.push({ v, x, y, l, h });
    x += l + 8;
    hLigne = Math.max(hLigne, h);
  }
  const hauteur = y + hLigne;
  return (
    <svg width="100%" viewBox={`-2 -2 ${largeur + 4} ${hauteur + 4}`} role="img" aria-label="Des pièces et des billets en euros" style={{ maxWidth: largeur }}>
      {places.map(({ v, x: px, y: py, l, h }, i) =>
        v >= 5 ? (
          <g key={i}>
            <rect x={px} y={py} width={l} height={h} rx={5} fill={BILLETS[v]} stroke={ENCRE_OBJET} strokeOpacity={0.35} strokeWidth={1.5} />
            <rect x={px + 6} y={py + 6} width={l - 12} height={h - 12} rx={3} fill="none" stroke="#FFFFFF" strokeOpacity={0.5} />
            <text x={px + l / 2} y={py + h / 2 + 7} textAnchor="middle" fontSize={20} fill={ENCRE_OBJET} {...POLICE}>{v} €</text>
          </g>
        ) : (
          <g key={i}>
            <circle cx={px + l / 2} cy={py + h / 2} r={l / 2 - 1} fill={v === 2 ? OR : ARGENT} stroke={ENCRE_OBJET} strokeOpacity={0.35} strokeWidth={1.5} />
            <circle cx={px + l / 2} cy={py + h / 2} r={l / 2 - 8} fill={v === 2 ? ARGENT : OR} />
            <text x={px + l / 2} y={py + h / 2 + 6} textAnchor="middle" fontSize={17} fill={ENCRE_OBJET} {...POLICE}>{v}</text>
          </g>
        ),
      )}
    </svg>
  );
}

/** Barres partagées en parts égales, une par fraction. */
export function Fractions({ barres }: Extract<V, { type: 'fractions' }>) {
  const l = 260;
  const h = 34;
  const g = 14;
  const marge = 52;
  return (
    <svg width="100%" viewBox={`0 0 ${marge + l + 2} ${barres.length * (h + g) - g + 2}`} role="img"
      aria-label={`Des barres partagées en parts égales : ${barres.map((b) => b.nom).join(', ')}`} style={{ maxWidth: marge + l + 2 }}>
      {barres.map((b, i) => (
        <g key={i} transform={`translate(0 ${i * (h + g) + 1})`}>
          <text x={0} y={h / 2 + 7} fontSize={19} fill="var(--ink)" {...POLICE}>{b.nom}</text>
          {Array.from({ length: b.parts }, (_, k) => (
            <rect key={k} x={marge + (k * l) / b.parts} y={0} width={l / b.parts} height={h}
              fill={k < b.coloriees ? 'var(--primary)' : 'var(--surface-0)'} stroke="var(--ink)" strokeWidth={1.5} />
          ))}
        </g>
      ))}
    </svg>
  );
}

/** Diagramme en barres, axe gradué depuis 0. */
export function Diagramme({ titre, unite, pas, barres }: Extract<V, { type: 'diagramme' }>) {
  const haut = Math.ceil(Math.max(...barres.map((b) => b.valeur)) / pas) * pas;
  const graduations = haut / pas;
  const g = 50; // marge de gauche (nombres de l'axe)
  const L = 360;
  const H = 260;
  const y0 = H - 34;
  const yHaut = 40;
  const y = (v: number) => y0 - ((y0 - yHaut) * v) / haut;
  const larg = (L - g - 10) / barres.length;
  return (
    <svg width="100%" viewBox={`0 0 ${L} ${H}`} role="img" aria-label={`Diagramme en barres : ${titre}`} style={{ maxWidth: L }}>
      <text x={L / 2} y={16} textAnchor="middle" fontSize={14} fill="var(--ink)" {...POLICE}>{titre}</text>
      <text x={g - 8} y={yHaut - 12} textAnchor="end" fontSize={12} fill="var(--ink-muted)" {...POLICE}>{unite}</text>
      {Array.from({ length: graduations + 1 }, (_, k) => (
        <g key={k}>
          <line x1={g} x2={L - 6} y1={y(k * pas)} y2={y(k * pas)} stroke="var(--line)" strokeWidth={1} />
          <text x={g - 8} y={y(k * pas) + 4} textAnchor="end" fontSize={12} fill="var(--ink-muted)" {...POLICE}>{k * pas}</text>
        </g>
      ))}
      {barres.map((b, i) => (
        <g key={b.nom}>
          <rect x={g + i * larg + larg * 0.18} y={y(b.valeur)} width={larg * 0.64} height={y0 - y(b.valeur)} rx={3} fill="var(--primary)" />
          <text x={g + i * larg + larg / 2} y={y0 + 18} textAnchor="middle" fontSize={12} fill="var(--ink)" {...POLICE}>{b.nom}</text>
        </g>
      ))}
      <line x1={g} x2={g} y1={yHaut - 6} y2={y0} stroke="var(--ink)" strokeWidth={2} />
      <line x1={g} x2={L - 6} y1={y0} y2={y0} stroke="var(--ink)" strokeWidth={2} />
    </svg>
  );
}

/** Solide en perspective cavalière ; le libellé ne le nomme pas. */
export function Solide({ solide }: { solide: NomSolide }) {
  const d = dessinSolide(solide);
  const u = 64;
  const m = 8;
  const pts = (p: readonly (readonly [number, number])[]) => p.map(([x, y]) => `${m + x * u},${m + y * u}`).join(' ');
  return (
    <svg width={d.largeur * u + 2 * m} height={d.hauteur * u + 2 * m} viewBox={`0 0 ${d.largeur * u + 2 * m} ${d.hauteur * u + 2 * m}`}
      role="img" aria-label="Un solide dessiné en perspective, arêtes cachées en pointillés">
      {d.fond.map((f, i) => <polygon key={i} points={pts(f)} fill="var(--primary-soft)" />)}
      {d.lignes.map((l, i) => (
        <polyline key={i} points={pts(l.points)} fill="none" stroke="var(--ink)" strokeWidth={l.cache ? 2 : 3}
          strokeDasharray={l.cache ? '7 6' : undefined} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

/** Urne : les boules sont mélangées toujours de la même façon pour une même urne. */
export function Urne({ boules }: Extract<V, { type: 'urne' }>) {
  const liste = boules.flatMap((b) => Array<CouleurBoule>(b.nombre).fill(b.couleur));
  // Mélange déterministe : la même question montre toujours la même urne.
  let graine = liste.length * 7919 + boules.reduce((s, b) => s * 31 + b.nombre, 1);
  for (let i = liste.length - 1; i > 0; i--) {
    graine = (graine * 1103515245 + 12345) % 2147483648;
    const j = graine % (i + 1);
    [liste[i], liste[j]] = [liste[j]!, liste[i]!];
  }
  const r = 12;
  const colonnes = 7;
  const lignes = Math.ceil(liste.length / colonnes);
  const L = colonnes * 2 * (r + 2) + 28;
  const H = lignes * 2 * (r + 2) + 54;
  return (
    <svg width={L} height={H} viewBox={`0 0 ${L} ${H}`} role="img" aria-label={`Une urne contenant ${liste.length} boules de couleur`}>
      <path d={`M6 10 L6 ${H - 18} Q6 ${H - 4} 20 ${H - 4} L${L - 20} ${H - 4} Q${L - 6} ${H - 4} ${L - 6} ${H - 18} L${L - 6} 10`}
        fill="var(--surface-0)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
      {liste.map((c, i) => {
        const ligne = Math.floor(i / colonnes);
        const col = i % colonnes;
        return (
          <circle key={i} cx={14 + (r + 2) + col * 2 * (r + 2) + (ligne % 2 ? r / 2 : 0)} cy={H - 12 - (r + 2) - ligne * 2 * (r + 1)}
            r={r} fill={BOULES[c]} stroke={ENCRE_OBJET} strokeOpacity={0.4} strokeWidth={1.5} />
        );
      })}
    </svg>
  );
}

/** Règle graduée en centimètres, trait posé au-dessus. */
export function Regle({ graduations, debut, fin }: Extract<V, { type: 'regle' }>) {
  const u = 22;
  const m = 16;
  const L = graduations * u + 2 * m;
  const x = (cm: number) => m + cm * u;
  return (
    <svg width="100%" viewBox={`0 0 ${L} 100`} role="img" aria-label="Un trait au-dessus d’une règle graduée en centimètres" style={{ maxWidth: L }}>
      <line x1={x(debut)} x2={x(fin)} y1={20} y2={20} stroke="var(--primary)" strokeWidth={5} strokeLinecap="round" />
      <line x1={x(debut)} x2={x(debut)} y1={12} y2={28} stroke="var(--primary)" strokeWidth={3} />
      <line x1={x(fin)} x2={x(fin)} y1={12} y2={28} stroke="var(--primary)" strokeWidth={3} />
      <rect x={m - 10} y={36} width={L - 2 * m + 20} height={56} rx={6} fill="var(--sun-soft)" stroke="var(--ink)" strokeWidth={2} />
      {Array.from({ length: graduations * 2 + 1 }, (_, k) => (
        <line key={k} x1={x(k / 2)} x2={x(k / 2)} y1={36} y2={k % 2 ? 46 : 54} stroke="var(--ink)" strokeWidth={k % 2 ? 1 : 2} />
      ))}
      {Array.from({ length: graduations + 1 }, (_, k) => (
        <text key={k} x={x(k)} y={74} textAnchor="middle" fontSize={13} fill="var(--ink)" {...POLICE}>{k}</text>
      ))}
    </svg>
  );
}
