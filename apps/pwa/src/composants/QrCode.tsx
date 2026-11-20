import { MODULES_QR } from '../lib/qrHopla';

const MARGE = 4; // zone vide imposée autour d'un QR code, en modules

/**
 * QR code vers la rubrique « Installer » de hopla-edu.fr (généré par scripts/qr/generer.py).
 * Toujours sombre sur clair, même en thème sombre : les lecteurs de QR code lisent mal l'inverse.
 * Le cadre force donc les tokens du thème clair (data-theme="light").
 */
export function QrCode({ taille = 168, label }: { taille?: number; label: string }) {
  const n = MODULES_QR.length;
  const d = MODULES_QR.flatMap((rangee, y) =>
    [...rangee].map((m, x) => (m === '1' ? `M${x + MARGE} ${y + MARGE}h1v1h-1z` : '')),
  ).join('');
  return (
    <div className="qr" data-theme="light">
      <svg width={taille} height={taille} viewBox={`0 0 ${n + 2 * MARGE} ${n + 2 * MARGE}`} role="img" aria-label={label} shapeRendering="crispEdges">
        <path d={d} />
      </svg>
    </div>
  );
}
