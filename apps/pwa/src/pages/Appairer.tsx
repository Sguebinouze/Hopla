import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { api } from '../lib/donnees';
import { estInstallee, plateforme } from '../lib/installation';

// Sur l'appareil de l'enfant : saisir (ou recevoir par QR) le code donné par le parent.
// L'appareil garde ensuite un accès limité à ce seul profil, sans compte parent.
export function Appairer() {
  const [params] = useSearchParams();
  const naviguer = useNavigate();
  const [code, setCode] = useState(params.get('code') ?? '');
  const [message, setMessage] = useState('');
  const [enCours, setEnCours] = useState(false);

  return (
    <main className="ecran ecran--etroit">
      <div className="ligne">
        <Link to="/" className="hp-iconbtn" aria-label="Retour"><Icone nom="retour" /></Link>
        <h1 className="titre-2 pousse">Associer cet appareil</h1>
      </div>
      <div className="hp-bubble">
        <Octave taille={72} />
        <div className="hp-bubble__text"><span className="hp-bubble__name">Octave</span>
          <p style={{ margin: 0 }}>Demande le code à ton parent. Ensuite, cet appareil t’ouvre directement ton espace.</p>
        </div>
      </div>
      {!estInstallee() && plateforme() === 'ios' && (
        <p className="hp-card" style={{ margin: 0 }}>
          D’abord, installe Hopla : touche <strong>Partager</strong> dans Safari, puis <strong>Sur l’écran d’accueil</strong>.
          Ouvre ensuite Hopla depuis son icône et saisis le code là. Sinon, l’icône ne connaîtra pas ton code.
        </p>
      )}
      <form className="formulaire hp-card" onSubmit={async (e) => {
        e.preventDefault();
        setMessage('');
        setEnCours(true);
        try {
          const enfant = await api.lierAppareil(code);
          naviguer('/accueil', { replace: true, state: { bienvenue: enfant.prenom } });
        } catch (err) {
          setMessage((err as Error).message);
        } finally {
          setEnCours(false);
        }
      }}>
        <label>Code de l’appareil
          <input className="code-saisie" value={code} onChange={(e) => setCode(e.target.value)} placeholder="ABCD-EFGH"
            autoCapitalize="characters" autoComplete="off" spellCheck={false} required />
        </label>
        <button className="hp-btn hp-btn--primary hp-btn--lg" disabled={enCours}>Associer</button>
        {message && <p className="muet" role="alert">{message}</p>}
      </form>
    </main>
  );
}
