import { Link, useNavigate } from 'react-router-dom';
import { Icone } from '../composants/Icone';
import { LienParent } from '../composants/LienParent';
import { CONTACT } from './Confidentialite';

// Page publique, sans compte : comment supprimer son compte et ce qui est effacé.
// Adresse à déclarer dans la fiche Google Play (suppression de compte depuis le Web).
export function SupprimerCompte() {
  const naviguer = useNavigate();
  return (
    <main className="ecran ecran--etroit confidentialite">
      <div className="ligne">
        <button type="button" className="hp-iconbtn" aria-label="Retour" onClick={() => naviguer(-1)}><Icone nom="retour" /></button>
        <h1 className="titre-2 pousse">Supprimer son compte</h1>
      </div>
      <section>
        <h2 className="titre-3">En trois étapes</h2>
        <ol>
          <li>Connectez-vous avec votre adresse e-mail : Hopla vous envoie un code.</li>
          <li>Ouvrez l’espace parent avec votre code parent.</li>
          <li>Dans « Mes données », choisissez « Supprimer mon compte », puis confirmez.</li>
        </ol>
        <Link to="/connexion" className="hp-btn hp-btn--primary" style={{ alignSelf: 'flex-start' }}>Me connecter</Link>
      </section>
      <section>
        <h2 className="titre-3">Ce qui est effacé</h2>
        <p>
          Votre compte et votre adresse e-mail sont effacés tout de suite. Si vous êtes le seul parent de la famille, les profils
          des enfants et tout leur travail le sont aussi. Si un second parent est membre de la famille, les profils restent pour lui.
        </p>
        <p>Pour garder une copie, téléchargez d’abord vos données depuis l’espace parent, dans « Mes données ».</p>
      </section>
      <section>
        <h2 className="titre-3">Sans accès à votre adresse e-mail</h2>
        <p>Écrivez à <LienParent href={`mailto:${CONTACT}`}>{CONTACT}</LienParent> en indiquant l’adresse du compte.</p>
      </section>
    </main>
  );
}
