import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { api, type Appareil } from '../lib/donnees';

const dateCourte = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

// Mode parent : appareils associés à un enfant, et association d'un nouvel appareil par code ou QR.
export function Appareils({ enfant, prenom, appareils, onChange }: {
  enfant: string; prenom: string; appareils: Appareil[]; onChange: () => void;
}) {
  const [code, setCode] = useState('');
  const [qr, setQr] = useState('');
  const [message, setMessage] = useState('');
  const [renomme, setRenomme] = useState<{ id: string; nom: string } | null>(null);
  const lien = code ? `${location.origin}/appairer?code=${code}` : '';

  useEffect(() => {
    if (!lien) return;
    QRCode.toDataURL(lien, { margin: 1, width: 200 }).then(setQr).catch(() => setQr(''));
  }, [lien]);

  const essayer = async (action: () => Promise<void>) => {
    setMessage('');
    try {
      await action();
    } catch (e) {
      setMessage((e as Error).message);
    }
  };

  return (
    <div className="appareils">
      <h3 className="titre-3">Appareils de {prenom}</h3>
      {appareils.length === 0 && <p className="muet">Aucun appareil associé. {prenom} utilise l’appareil familial avec son code.</p>}
      {appareils.map((a) => (renomme?.id === a.id ? (
        <form key={a.id} className="ligne appareils__ligne formulaire" onSubmit={(e) => {
          e.preventDefault();
          void essayer(async () => { await api.renommerAppareil(a.id, renomme.nom); setRenomme(null); onChange(); });
        }}>
          <input className="pousse" aria-label="Nom de l’appareil" maxLength={40} required value={renomme.nom}
            onChange={(e) => setRenomme({ id: a.id, nom: e.target.value })} />
          <button className="hp-btn hp-btn--primary">Enregistrer</button>
          <button type="button" className="hp-btn hp-btn--ghost" onClick={() => setRenomme(null)}>Annuler</button>
        </form>
      ) : (
        <div key={a.id} className="ligne appareils__ligne">
          <span className="pousse">{a.nom} <span className="muet">· associé le {dateCourte(a.cree_le)}, vu le {dateCourte(a.vu_le)}</span></span>
          <button type="button" className="hp-btn hp-btn--ghost" onClick={() => setRenomme({ id: a.id, nom: a.nom })}>Renommer</button>
          <button type="button" className="hp-btn hp-btn--ghost" onClick={() => void essayer(async () => { await api.retirerAppareil(a.id); onChange(); })}>
            Retirer
          </button>
        </div>
      )))}
      <p className="muet">5 appareils au plus par enfant. Un appareil inutilisé pendant 6 mois est retiré automatiquement : il suffit de l’associer à nouveau.</p>
      {code ? (
        <div className="appareils__code" role="status">
          {qr && <img src={qr} width={160} height={160} alt={`QR code pour associer un appareil à ${prenom}`} />}
          <div>
            <p className="muet">Sur l’appareil de {prenom}, scanne le QR code ou ouvre Hopla puis « C’est l’appareil d’un enfant : j’ai un code » :</p>
            <p className="code-lisible">{code.slice(0, 4)}-{code.slice(4)}</p>
            <p className="muet">Valable 10 minutes, une seule fois.</p>
            <button type="button" className="hp-btn hp-btn--ghost" onClick={() => { setCode(''); onChange(); }}>C’est fait</button>
          </div>
        </div>
      ) : (
        <button type="button" className="hp-btn hp-btn--secondary" style={{ alignSelf: 'flex-start' }}
          onClick={() => void essayer(async () => setCode(await api.creerAppairage(enfant)))}>
          Associer un appareil
        </button>
      )}
      {message && <p className="muet" role="status">{message}</p>}
    </div>
  );
}
