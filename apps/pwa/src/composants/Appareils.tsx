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
      {appareils.map((a) => (
        <div key={a.id} className="ligne appareils__ligne">
          <span className="pousse">{a.nom} <span className="muet">· associé le {dateCourte(a.cree_le)}, vu le {dateCourte(a.vu_le)}</span></span>
          <button type="button" className="hp-btn hp-btn--ghost" onClick={() => void essayer(async () => { await api.retirerAppareil(a.id); onChange(); })}>
            Retirer
          </button>
        </div>
      ))}
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
