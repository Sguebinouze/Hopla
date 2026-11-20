import { ENTREE } from '../lib/routes';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BoutonTheme } from '../composants/BoutonTheme';
import { Icone } from '../composants/Icone';
import { api } from '../lib/donnees';

const FOURNISSEURS = [
  ...(import.meta.env.VITE_AUTH_APPLE === '1' ? [{ id: 'apple' as const, nom: 'Apple' }] : []),
  ...(import.meta.env.VITE_AUTH_GOOGLE === '1' ? [{ id: 'google' as const, nom: 'Google' }] : []),
];

// Connexion du parent : adresse e-mail, puis code reçu par e-mail, sans quitter l'app.
// (Le lien de l'e-mail marche aussi, mais sur iPhone et iPad il s'ouvre dans Safari, pas dans l'app installée.)
export function Connexion() {
  const naviguer = useNavigate();
  const [email, setEmail] = useState('');
  const [envoye, setEnvoye] = useState(false);
  const [code, setCode] = useState('');
  const [message, setMessage] = useState(() => erreurDuLien());
  const [enCours, setEnCours] = useState(false);

  const agir = async (action: () => Promise<void>, echec: (e: Error) => string) => {
    setMessage('');
    setEnCours(true);
    try {
      await action();
    } catch (e) {
      setMessage(echec(e as Error));
    } finally {
      setEnCours(false);
    }
  };

  return (
    <main className="ecran ecran--etroit">
      <div className="ligne">
        <Link to={ENTREE} className="hp-iconbtn" aria-label="Retour"><Icone nom="retour" /></Link>
        <span className="pousse" />
        <BoutonTheme />
      </div>
      <div className="etapes" aria-label="Étape 1 sur 5">
        <span className="etapes__nom">Étape 1 sur 5 · Votre adresse</span>
        <div className="hp-progress hp-progress--sm" aria-hidden="true"><span style={{ width: '20%' }} /></div>
      </div>
      <h1 className="titre-1">{envoye ? 'Vérifiez vos e-mails' : 'Connexion parent'}</h1>

      {!envoye ? (
        <form className="formulaire" onSubmit={(e) => {
          e.preventDefault();
          void agir(async () => { await api.envoyerLienParent(email); setEnvoye(true); },
            (err) => (/rate limit|security purposes/i.test(err.message)
              ? 'Trop de demandes rapprochées. Attendez une minute avant de redemander un e-mail.'
              : 'L’e-mail n’a pas pu partir. Vérifiez l’adresse et réessayez.'));
        }}>
          <p className="muet" style={{ margin: 0 }}>Votre adresse sert seulement à vous connecter. Pas de mot de passe : Hopla vous envoie un code.</p>
          <label>Adresse e-mail<input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <button className="hp-btn hp-btn--primary hp-btn--lg" disabled={enCours}>Recevoir mon code</button>
        </form>
      ) : (
        <form className="formulaire" onSubmit={(e) => {
          e.preventDefault();
          void agir(async () => { await api.verifierCodeParent(email, code); naviguer(ENTREE, { replace: true }); },
            () => 'Ce code ne fonctionne pas : il a peut-être expiré ou déjà servi. Demandez un nouvel e-mail.');
        }}>
          <p style={{ margin: 0 }}>Un e-mail est parti à <strong>{email}</strong>. Saisissez le code à 8 chiffres qu’il contient.</p>
          <label>Code reçu par e-mail
            <input className="code-saisie" inputMode="numeric" autoComplete="one-time-code" required pattern="[0-9 ]{6,10}"
              value={code} onChange={(e) => setCode(e.target.value)} placeholder="12345678" />
          </label>
          <button className="hp-btn hp-btn--primary hp-btn--lg" disabled={enCours}>Valider</button>
          <p className="muet" style={{ margin: 0 }}>Rien reçu ? Regardez dans les indésirables, ou</p>
          <button type="button" className="hp-btn hp-btn--ghost" onClick={() => { setEnvoye(false); setCode(''); setMessage(''); }}>
            Changer d’adresse ou renvoyer l’e-mail
          </button>
        </form>
      )}

      {FOURNISSEURS.map((f) => (
        <button key={f.id} type="button" className="hp-btn hp-btn--secondary hp-btn--block"
          onClick={() => void api.connecterAvec(f.id).catch((e: Error) => setMessage(e.message))}>
          Continuer avec {f.nom}
        </button>
      ))}
      {message && <p className="erreur" role="alert">{message}</p>}
    </main>
  );
}

/** Message lisible quand on arrive par un lien de connexion refusé (déjà utilisé ou expiré). */
function erreurDuLien(): string {
  const h = new URLSearchParams(location.hash.replace(/^#/, ''));
  if (!h.get('error') && !h.get('error_code')) return '';
  history.replaceState(null, '', location.pathname + location.search);
  return h.get('error_code') === 'otp_expired'
    ? 'Ce lien a déjà servi ou a expiré. Demandez un nouvel e-mail et saisissez le code qu’il contient.'
    : 'La connexion par ce lien n’a pas abouti. Demandez un nouvel e-mail.';
}
