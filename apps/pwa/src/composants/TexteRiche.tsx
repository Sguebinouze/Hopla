/** Texte où les notions clés sont entourées de ** : rendues en gras, sans HTML injecté. */
export function TexteRiche({ texte }: { texte: string }) {
  const morceaux = texte.split('**');
  return <>{morceaux.map((m, i) => (i % 2 === 1 ? <strong key={i}>{m}</strong> : <span key={i}>{m}</span>))}</>;
}

/** Les passages entre « » deviennent des citations surlignées : on voit tout de suite les phrases étudiées. */
export function AvecCitations({ texte }: { texte: string }) {
  const morceaux = texte.split(/(«[^»]*»)/g);
  return <>{morceaux.map((m, i) => (m.startsWith('«') ? <q key={i} className="citation">{m.slice(1, -1).trim()}</q> : <TexteRiche key={i} texte={m} />))}</>;
}
