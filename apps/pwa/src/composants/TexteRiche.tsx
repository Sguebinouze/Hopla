/** Texte où les notions clés sont entourées de ** : rendues en gras, sans HTML injecté. */
export function TexteRiche({ texte }: { texte: string }) {
  const morceaux = texte.split('**');
  return <>{morceaux.map((m, i) => (i % 2 === 1 ? <strong key={i}>{m}</strong> : <span key={i}>{m}</span>))}</>;
}
