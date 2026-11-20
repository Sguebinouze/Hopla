import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { api, surAppareilEnfant } from '../lib/donnees';

/**
 * Lien vers l'extérieur (site, e-mail) depuis un écran qu'un enfant peut voir : contrôle parental
 * (code d'un parent de la famille) avant de sortir de Hopla. Sans famille sur cet appareil
 * (visiteur non connecté), le lien s'ouvre directement.
 */
export function LienParent({ href, children }: { href: string; children: ReactNode }) {
  const fenetre = useRef<HTMLDialogElement>(null);
  const [code, setCode] = useState('');
  const [ouvert, setOuvert] = useState(false);
  const [message, setMessage] = useState('');
  const externe = !href.startsWith('mailto:');
  // Contrôle actif par défaut ; levé seulement si l'appareil n'a ni compte parent ni profil d'enfant.
  const [garde, setGarde] = useState(true);
  useEffect(() => {
    if (surAppareilEnfant()) return;
    void api.parentConnecte().then(setGarde).catch(() => undefined);
  }, []);

  return (
    <>
      <a href={href} target={externe ? '_blank' : undefined} rel={externe ? 'noreferrer' : undefined} onClick={(e) => {
        if (!garde) return;
        e.preventDefault();
        setCode('');
        setMessage('');
        setOuvert(false);
        fenetre.current?.showModal();
      }}>{children}</a>
      {createPortal(<dialog ref={fenetre} className="hp-card controle-parental" onClose={() => setOuvert(false)}>
        {!ouvert ? (
          <form method="dialog" className="formulaire" onSubmit={(e) => {
            e.preventDefault();
            setMessage('');
            api.controleParental(code)
              .then((ok) => (ok ? setOuvert(true) : setMessage('Code parent incorrect.')))
              .catch((err: Error) => setMessage(err.message));
          }}>
            <h2 className="titre-3">Demande à un parent</h2>
            <p className="muet" style={{ margin: 0 }}>Ce lien sort de Hopla. Un parent tape son code pour continuer.</p>
            <label>Code parent
              <input type="password" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} required autoComplete="off" value={code} onChange={(e) => setCode(e.target.value)} />
            </label>
            {message && <p className="muet" role="alert">{message}</p>}
            <div className="ligne">
              <button className="hp-btn hp-btn--primary">Valider</button>
              <button type="button" className="hp-btn hp-btn--ghost" onClick={() => fenetre.current?.close()}>Annuler</button>
            </div>
          </form>
        ) : (
          <div className="formulaire">
            <p style={{ margin: 0 }}>C’est bon.</p>
            <div className="ligne">
              <a className="hp-btn hp-btn--primary" href={href} target={externe ? '_blank' : undefined} rel={externe ? 'noreferrer' : undefined}
                onClick={() => fenetre.current?.close()}>Ouvrir le lien</a>
              <button type="button" className="hp-btn hp-btn--ghost" onClick={() => fenetre.current?.close()}>Fermer</button>
            </div>
          </div>
        )}
      </dialog>, document.body)}
    </>
  );
}
