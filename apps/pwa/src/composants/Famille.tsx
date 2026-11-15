import { useEffect, useState } from 'react';
import { api, type MembreFamille } from '../lib/donnees';

// Mode parent : membres de la famille, invitation d'un second parent, ou rejoindre une famille.
export function Famille({ sansEnfant, onRejoint }: { sansEnfant: boolean; onRejoint: () => void }) {
  const [membres, setMembres] = useState<MembreFamille[]>([]);
  const [invitation, setInvitation] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.membresFamille().then(setMembres).catch((e: Error) => setMessage(e.message));
  }, []);

  const essayer = async (action: () => Promise<void>) => {
    setMessage('');
    try {
      await action();
    } catch (e) {
      setMessage((e as Error).message);
    }
  };

  return (
    <section className="hp-card famille">
      <h2 className="titre-2">Famille</h2>
      <ul className="famille__membres">
        {membres.map((m) => (
          <li key={m.user_id} className="ligne">
            <span className="pousse">{m.email}</span>
            {m.moi && <span className="hp-chip hp-chip--neutral">vous</span>}
          </li>
        ))}
      </ul>
      {invitation ? (
        <div className="famille__code" role="status">
          <p className="muet">Code à donner à l’autre parent, valable 7 jours :</p>
          <p className="code-lisible">{invitation.slice(0, 4)}-{invitation.slice(4)}</p>
          <p className="muet">Il se connecte à Hopla avec sa propre adresse, ouvre l’espace parent, puis « Rejoindre une famille ».</p>
        </div>
      ) : (
        <button type="button" className="hp-btn hp-btn--secondary" onClick={() => void essayer(async () => setInvitation(await api.inviterParent()))}>
          Inviter un autre parent
        </button>
      )}
      {sansEnfant && (
        <form className="formulaire" onSubmit={(e) => {
          e.preventDefault();
          void essayer(async () => {
            await api.rejoindreFamille(code);
            setMessage('Famille rejointe.');
            onRejoint();
          });
        }}>
          <label>Rejoindre une famille (code reçu de l’autre parent)
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="ABCD-EFGH" autoCapitalize="characters" required />
          </label>
          <button className="hp-btn hp-btn--primary" style={{ alignSelf: 'flex-start' }}>Rejoindre</button>
        </form>
      )}
      {message && <p className="muet" role="status">{message}</p>}
    </section>
  );
}
