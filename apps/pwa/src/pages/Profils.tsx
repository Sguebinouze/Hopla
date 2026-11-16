import { MentionProgrammes } from '../composants/Programmes';
import { BoutonTheme } from '../composants/BoutonTheme';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '../composants/Avatar';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { api, surAppareilEnfant, type Profil } from '../lib/donnees';

const FOURNISSEURS = [
  ...(import.meta.env.VITE_AUTH_APPLE === '1' ? [{ id: 'apple' as const, nom: 'Apple' }] : []),
  ...(import.meta.env.VITE_AUTH_GOOGLE === '1' ? [{ id: 'google' as const, nom: 'Google' }] : []),
];

export function Profils() {
  const [connecte, setConnecte] = useState<boolean | null>(null);
  const [profils, setProfils] = useState<Profil[]>([]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(() => erreurDuLien());
  const [envoye, setEnvoye] = useState(false);
  const [code, setCode] = useState('');
  const naviguer = useNavigate();

  useEffect(() => {
    void (async () => {
      // Appareil de l'enfant : son espace s'ouvre directement.
      if (surAppareilEnfant() && (await api.monAppareil().catch(() => null))) return naviguer('/accueil', { replace: true });
      const ok = await api.parentConnecte();
      setConnecte(ok);
      if (ok) setProfils(await api.listeProfils());
    })();
  }, [naviguer]);

  if (connecte === null) return <main className="ecran" aria-busy="true" />;

  if (!connecte) {
    return (
      <main className="ecran">
        <div className="ligne"><div className="marque pousse"><img src="/icone.svg" width={36} height={36} alt="" />Hopla</div><BoutonTheme /></div>
        <h1 className="titre-1">Connexion parent</h1>
        <MentionProgrammes />
        <p className="muet">Une seule fois sur cet appareil. Ensuite, chaque enfant entre avec son code secret.</p>
        <Link to="/confidentialite" className="muet lien-discret">Confidentialité : ce que Hopla garde, et ce qu’il ne garde pas</Link>
        {!envoye ? (
          <form className="formulaire" onSubmit={async (e) => {
            e.preventDefault();
            setMessage('');
            try {
              await api.envoyerLienParent(email);
              setEnvoye(true);
            } catch (err) {
              setMessage(/rate limit|security purposes/i.test((err as Error).message)
                ? 'Trop de demandes rapprochées. Attends une minute avant de redemander un e-mail.'
                : 'L’e-mail n’a pas pu partir. Vérifie l’adresse et réessaie.');
            }
          }}>
            <label>Adresse e-mail<input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
            <button className="hp-btn hp-btn--primary hp-btn--lg">Recevoir le lien</button>
          </form>
        ) : (
          <form className="formulaire" onSubmit={async (e) => {
            e.preventDefault();
            setMessage('');
            try {
              await api.verifierCodeParent(email, code);
              setConnecte(true);
              setProfils(await api.listeProfils());
            } catch {
              setMessage('Ce code ne fonctionne pas : il a peut-être expiré ou déjà servi. Demande un nouvel e-mail.');
            }
          }}>
            <p style={{ margin: 0 }}>E-mail envoyé à <strong>{email}</strong>. Saisis ici le code à 8 chiffres qu’il contient. Tu peux aussi toucher le lien, s’il s’ouvre sur cet appareil.</p>
            <label>Code reçu par e-mail
              <input className="code-saisie" inputMode="numeric" autoComplete="one-time-code" required pattern="[0-9 ]{6,10}"
                value={code} onChange={(e) => setCode(e.target.value)} placeholder="12345678" />
            </label>
            <button className="hp-btn hp-btn--primary hp-btn--lg">Me connecter</button>
            <button type="button" className="hp-btn hp-btn--ghost" onClick={() => { setEnvoye(false); setCode(''); setMessage(''); }}>Changer d’adresse ou renvoyer l’e-mail</button>
          </form>
        )}
        {FOURNISSEURS.map((f) => (
          <button key={f.id} type="button" className="hp-btn hp-btn--secondary hp-btn--block"
            onClick={() => void api.connecterAvec(f.id).catch((e: Error) => setMessage(e.message))}>
            Continuer avec {f.nom}
          </button>
        ))}
        {message && <p className="muet">{message}</p>}
        <div className="pousse" />
        <Link to="/appairer" className="hp-btn hp-btn--ghost hp-btn--block">C’est l’appareil d’un enfant : j’ai un code</Link>
      </main>
    );
  }

  return (
    <main className="ecran">
      <div className="ligne"><div className="marque pousse"><img src="/icone.svg" width={36} height={36} alt="" />Hopla</div><BoutonTheme /></div>
      <div className="hp-bubble">
        <Octave taille={88} />
        <div className="hp-bubble__text"><span className="hp-bubble__name">Octave</span>
          <h1 className="titre-1">Bonjour. Qui travaille aujourd'hui ?</h1>
        </div>
      </div>
      {api.mode === 'demo' && <p className="bandeau-demo">Mode démo : aucune donnée ne quitte cet appareil.</p>}
      <div className="grille-profils">
        {profils.map((p) => (
          <Link key={p.id} to={`/code/${p.id}`} className="hp-profile" style={{ width: 'auto' }}>
            <Avatar teinte={p.avatar} />
            <span className="hp-profile__name">{p.prenom}</span>
            <span className="hp-profile__lock"><Icone nom="cadenas" taille={14} />Code secret</span>
          </Link>
        ))}
      </div>
      {profils.length === 0 && <p className="muet">Aucun profil. Crée-les depuis l'espace parent.</p>}
      <p className="muet" style={{ textAlign: 'center' }}>Chaque enfant entre avec son code et ne voit que sa propre progression.</p>
      <div className="pousse" />
      <Link to="/parent" className="hp-btn hp-btn--secondary hp-btn--block"><Icone nom="cadenas" />Espace parent</Link>
    </main>
  );
}

/** Message lisible quand on arrive par un lien de connexion refusé (déjà utilisé ou expiré). */
function erreurDuLien(): string {
  const h = new URLSearchParams(location.hash.replace(/^#/, ''));
  if (!h.get('error') && !h.get('error_code')) return '';
  history.replaceState(null, '', location.pathname + location.search);
  return h.get('error_code') === 'otp_expired'
    ? 'Ce lien a déjà servi ou a expiré. Demande un nouvel e-mail et utilise le code qu’il contient.'
    : 'La connexion par ce lien n’a pas abouti. Demande un nouvel e-mail.';
}
