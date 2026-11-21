import { Link } from 'react-router-dom';
import { CONTACT } from '../pages/Confidentialite';
import { ENTREE, PAGES_LEGALES } from '../lib/routes';
import { LienParent } from './LienParent';
import { Marque } from './Marque';

/** Pied de page du site : présentation et pages légales. Pas dans l'app elle-même. */
export function PiedDePage() {
  return (
    <footer className="pied">
      <div className="pied__corps">
        <div className="pied__marque">
          <Marque />
          <p className="muet">Réviser du CP à la 3e, un peu chaque jour.</p>
        </div>
        <nav className="pied__colonne pied__colonne--hopla" aria-label="Hopla">
          <h2 className="titre-3">Hopla</h2>
          <Link to="/#fonctionnement">Comment ça marche</Link>
          <Link to="/#parents">Pour les parents</Link>
          <Link to="/#installer">Installer Hopla</Link>
          <Link to={ENTREE}>Ouvrir l’app</Link>
        </nav>
        <nav className="pied__colonne pied__colonne--legal" aria-label="Informations légales">
          <h2 className="titre-3">Informations légales</h2>
          <div className="pied__liens">{PAGES_LEGALES.map((p) => <Link key={p.chemin} to={p.chemin}>{p.titre}</Link>)}</div>
        </nav>
        <div className="pied__colonne pied__colonne--contact">
          <h2 className="titre-3">Contact</h2>
          <LienParent href={`mailto:${CONTACT}`}>{CONTACT}</LienParent>
        </div>
      </div>
      <p className="pied__bas muet">
        © {new Date().getFullYear()} Hopla. Outil indépendant : il n’est ni édité ni agréé par le ministère de l’Éducation nationale.
      </p>
    </footer>
  );
}
