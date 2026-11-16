import { useEffect, useState } from 'react';
import { api, type BilanSemaine as Bilan } from '../lib/donnees';
import { dateLisible } from '../lib/entrainement';

// Espace parent : les 7 derniers jours de chaque enfant, et l'inscription au bilan du dimanche par e-mail.
// La case n'apparait que si l'envoi est configuré (VITE_BILAN_EMAIL=1, voir docs/architecture.md).
const EMAIL_ACTIF = import.meta.env.VITE_BILAN_EMAIL === '1';

export function BilanSemaine() {
  const [bilans, setBilans] = useState<Bilan[] | null>(null);
  const [email, setEmail] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.bilanSemaine().then(setBilans).catch(() => setBilans([]));
    if (EMAIL_ACTIF) api.bilanHebdoActif().then(setEmail).catch(() => setEmail(null));
  }, []);

  if (!bilans || bilans.length === 0) return null;
  return (
    <section className="hp-card bilan">
      <h2 className="titre-3">Cette semaine</h2>
      {bilans.map((b) => (
        <div key={b.enfant_id} className="bilan__enfant">
          <strong>{b.prenom}</strong>
          {b.questions === 0 ? (
            <p className="muet">Pas de séance ces 7 derniers jours.</p>
          ) : (
            <div className="fiche__puces">
              <span className="hp-chip hp-chip--neutral">{b.jours_actifs} jour{b.jours_actifs > 1 ? 's' : ''}</span>
              <span className="hp-chip hp-chip--neutral">{b.minutes} min</span>
              <span className="hp-chip hp-chip--neutral">{b.questions} questions · {Math.round((b.reussies / b.questions) * 100)} %</span>
              <span className="hp-chip hp-chip--success">{b.maitrisees} / {b.notions} notion{b.notions > 1 ? 's' : ''} maitrisée{b.maitrisees > 1 ? 's' : ''}</span>
              {b.a_revoir > 0 && <span className="hp-chip hp-chip--attention">{b.a_revoir} à revoir</span>}
            </div>
          )}
          {b.controle && <p className="muet">Contrôle {dateLisible(b.controle.date)} · {b.controle.notions} notion{b.controle.notions > 1 ? 's' : ''}</p>}
        </div>
      ))}
      {EMAIL_ACTIF && email !== null && (
        <label className="bilan__email">
          <input type="checkbox" checked={email} onChange={(e) => {
            const v = e.target.checked;
            setEmail(v);
            setMessage('');
            api.reglerBilanHebdo(v).catch((err: Error) => { setEmail(!v); setMessage(err.message); });
          }} />
          <span>Bilan du dimanche par e-mail <span className="muet">(le même résumé, chaque dimanche soir)</span></span>
        </label>
      )}
      {message && <p className="muet" role="alert">{message}</p>}
    </section>
  );
}
