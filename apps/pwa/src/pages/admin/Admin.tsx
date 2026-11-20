import { ENTREE } from '../../lib/routes';
import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Icone } from '../../composants/Icone';
import { api } from '../../lib/donnees';

// Espace admin : chargé à part (import dynamique), jamais téléchargé par une session enfant.
// L'accès est contrôlé en base (public.est_admin) : compte inscrit comme admin et mode parent ouvert.

const RUBRIQUES = [{ chemin: '/admin/relecture', libelle: 'Relecture' }, { chemin: '/admin/references', libelle: 'Références' }];

export function GardeAdmin({ children }: { children: ReactNode }) {
  const [acces, setAcces] = useState<'attente' | 'oui' | 'non'>('attente');
  const [erreur, setErreur] = useState('');
  useEffect(() => {
    api.estAdmin().then((ok) => setAcces(ok ? 'oui' : 'non')).catch((e: Error) => { setErreur(e.message); setAcces('non'); });
  }, []);

  if (acces === 'attente') return <main className="ecran" aria-busy="true" />;
  if (acces === 'non') {
    return (
      <main className="ecran">
        <h1 className="titre-1">Administration</h1>
        <section className="hp-card formulaire">
          <p style={{ margin: 0 }}>Cet espace est réservé au compte administrateur, avec le mode parent ouvert dans cet onglet.</p>
          {erreur && <p className="muet" role="alert">{erreur}</p>}
          <Link to="/parent" className="hp-btn hp-btn--primary">Ouvrir le mode parent</Link>
          <Link to={ENTREE} className="hp-btn hp-btn--ghost">Retour</Link>
        </section>
      </main>
    );
  }
  return (
    <main className="ecran ecran--large admin">
      <header className="ligne admin__tete">
        <Link to="/parent" className="hp-iconbtn" aria-label="Retour à l’espace parent"><Icone nom="retour" /></Link>
        <h1 className="titre-1 pousse">Administration</h1>
        <nav className="ligne" aria-label="Rubriques">
          {RUBRIQUES.map((r) => (
            <NavLink key={r.chemin} to={r.chemin} className={({ isActive }) => `hp-chip ${isActive ? 'hp-chip--primary' : 'hp-chip--neutral'}`}>
              {r.libelle}
            </NavLink>
          ))}
        </nav>
      </header>
      {children}
    </main>
  );
}
