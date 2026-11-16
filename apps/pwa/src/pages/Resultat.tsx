import { Link, useLocation } from 'react-router-dom';
import { Octave } from '../composants/Octave';

export function Resultat() {
  const etat = (useLocation().state ?? { justes: 0, total: 0 }) as { justes: number; total: number; retour?: string | null };
  const retour = etat.retour === '/cahier' ? { to: '/cahier', texte: 'Retour au cahier' } : { to: '/accueil', texte: 'Retour à l\'accueil' };
  return (
    <main className="ecran" style={{ background: 'var(--primary)', color: 'var(--on-primary)', maxWidth: 'none' }}>
      <div style={{ maxWidth: 560, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'center' }}>
        <Octave humeur="reussite" taille={128} />
        <h1 className="titre-1">Série terminée</h1>
        <div className="hp-kpi" style={{ width: '100%', color: 'var(--ink)', alignItems: 'center' }}>
          <span className="hp-kpi__value">{etat.justes} / {etat.total}</span>
          <span className="hp-kpi__label">réponses justes</span>
        </div>
        <Link to={retour.to} className="hp-btn hp-btn--reward hp-btn--lg hp-btn--block">{retour.texte}</Link>
      </div>
    </main>
  );
}
