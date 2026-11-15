import { normaliserReponse, type Item } from '@hopla/generateurs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { Visuel } from '../composants/Visuel';
import { api } from '../lib/donnees';
import { chargerPack, competencesJouables, seriePour } from '../lib/packs';

const TAILLE_SERIE = 5;

export function Exercice() {
  const { competence = '' } = useParams();
  const naviguer = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [rang, setRang] = useState(0);
  const [choix, setChoix] = useState<string | null>(null);
  const [saisie, setSaisie] = useState('');
  const [indice, setIndice] = useState(false);
  const [justes, setJustes] = useState(0);
  const debut = useRef(Date.now());

  useEffect(() => {
    void (async () => {
      try {
        const enfant = await api.enfantCourant();
        if (!enfant) return naviguer('/');
        const pack = await chargerPack(enfant.classe);
        const c = competencesJouables(pack).find((x) => x.id === competence);
        if (!c) return naviguer('/accueil');
        setItems(seriePour(c, TAILLE_SERIE, 1));
      } catch {
        naviguer('/accueil');
      }
    })();
  }, [competence, naviguer]);

  const item = items[rang];
  const repondu = choix !== null;
  const juste = useMemo(() => item !== undefined && choix !== null && choix === item.reponse, [item, choix]);

  if (!item) return <main className="ecran" aria-busy="true" />;

  const valider = async (reponse: string) => {
    if (repondu) return;
    const r = item.gabarit === 'saisie' ? normaliserReponse(reponse) : reponse;
    setChoix(r);
    const ok = r === item.reponse;
    if (ok) setJustes((n) => n + 1);
    try {
      await api.enregistrer({ competence: item.competence, contenu: item.id, reussi: ok, indice, dureeMs: Date.now() - debut.current });
    } catch {
      /* hors connexion : la synchronisation différée viendra dans une prochaine étape */
    }
  };

  const suivant = () => {
    if (rang + 1 >= items.length) {
      naviguer('/resultat', { state: { justes: justes, total: items.length } });
      return;
    }
    setRang(rang + 1);
    setChoix(null);
    setSaisie('');
    setIndice(false);
    debut.current = Date.now();
  };

  const classeOption = (o: string) => {
    if (!repondu) return 'hp-option';
    if (o === item.reponse) return 'hp-option hp-option--correct';
    if (o === choix) return 'hp-option hp-option--wrong';
    return 'hp-option';
  };

  return (
    <main className="ecran ecran--large">
      <div className="ligne">
        <Link to="/accueil" className="hp-iconbtn" aria-label="Quitter l'exercice"><Icone nom="fermer" /></Link>
        <div className="hp-progress pousse" style={{ background: 'var(--surface-2)' }} role="progressbar"
          aria-valuenow={rang + 1} aria-valuemin={1} aria-valuemax={items.length}>
          <span style={{ width: `${((rang + (repondu ? 1 : 0)) / items.length) * 100}%`, background: 'var(--octave)' }} />
        </div>
        <span className="muet">{rang + 1} / {items.length}</span>
      </div>

      <div className="exercice">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <h1 className="titre-1">{item.consigne}</h1>
          {item.visuel && <div className="visuel"><Visuel visuel={item.visuel} revele={repondu} /></div>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {item.gabarit === 'qcm' && item.options && (
            <div className="grille-options">
              {item.options.map((o) => (
                <button key={o} className={classeOption(o)} onClick={() => void valider(o)} disabled={repondu && o !== choix && o !== item.reponse}>
                  {o}
                </button>
              ))}
            </div>
          )}
          {item.gabarit === 'saisie' && (
            <form className="ligne" onSubmit={(e) => { e.preventDefault(); void valider(saisie); }}>
              <label className="pousse">
                <span className="muet">Ta réponse</span>
                <input className="saisie" inputMode="numeric" autoComplete="off" value={saisie}
                  onChange={(e) => setSaisie(e.target.value)} disabled={repondu} />
              </label>
              {!repondu && <button className="hp-btn hp-btn--primary hp-btn--lg" disabled={!saisie.trim()}>Vérifier</button>}
            </form>
          )}

          {!repondu && (
            <div className={`hp-bubble${indice ? ' hp-bubble--hint' : ''}`} style={{ maxWidth: 'none' }}>
              <Octave humeur="reflechit" taille={56} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <p className="hp-bubble__text" style={{ margin: 0 }}>{indice ? `Indice : ${item.indice}` : 'Tu peux demander un indice.'}</p>
                {!indice && (
                  <button className="hp-btn hp-btn--secondary" style={{ alignSelf: 'flex-start', minHeight: 40 }} onClick={() => setIndice(true)}>
                    <Icone nom="ampoule" />Indice
                  </button>
                )}
              </div>
            </div>
          )}

          {repondu && (
            <div className={`hp-feedback ${juste ? 'hp-feedback--success' : 'hp-feedback--attention'}`} style={{ maxWidth: 'none' }} role="status">
              <Octave humeur={juste ? 'reussite' : 'oups'} taille={56} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span className="hp-feedback__title">{juste ? `Juste : ${item.reponse}.` : 'Pas tout à fait. Regarde :'}</span>
                <span className="hp-feedback__text">{juste ? `+${indice ? 6 : 10} XP` : item.explication}</span>
              </div>
            </div>
          )}

          {repondu && <button className="hp-btn hp-btn--primary hp-btn--lg hp-btn--block" onClick={suivant} autoFocus>Continuer</button>}
        </div>
      </div>
    </main>
  );
}
