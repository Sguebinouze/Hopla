import { Link, useLocation } from 'react-router-dom';
import { Octave } from '../composants/Octave';
import type { SuiteSerie } from './Exercice';

export function Resultat() {
  const etat = (useLocation().state ?? { justes: 0, total: 0 }) as {
    justes: number; total: number; retour?: string | null;
    /** Questions nouvelles de la même notion, prêtes : absent quand il n'en reste plus. */
    suite?: (SuiteSerie & { competence: string; recherche: string }) | null;
  };
  const suite = etat.suite;
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
        {suite && (
          <Link to={`/exercice/${suite.competence}${suite.recherche}`} state={{ suite: { items: suite.items, posees: suite.posees } }}
            className="hp-btn hp-btn--reward hp-btn--lg hp-btn--block">
            Encore {suite.items.length} question{suite.items.length > 1 ? 's' : ''}
          </Link>
        )}
        <Link to={retour.to} className={`hp-btn ${suite ? 'hp-btn--secondary' : 'hp-btn--reward'} hp-btn--lg hp-btn--block`}>{retour.texte}</Link>
      </div>
    </main>
  );
}
