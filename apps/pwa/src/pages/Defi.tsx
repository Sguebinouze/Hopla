import { normaliserReponse, serie, type Item } from '@hopla/generateurs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { api, type Enfant } from '../lib/donnees';
import { FinDuJour } from '../composants/FinDuJour';
import { tempsEcoule } from '../lib/temps';
import { chargerPack, type Defi as DefiPack } from '../lib/packs';

type Phase = 'pret' | 'en-cours' | 'fini';

function nouvelItem(d: DefiPack, precedent?: Item): Item {
  for (let k = 0; k < 20; k++) {
    const diff = d.difficultes[Math.floor(Math.random() * d.difficultes.length)]!;
    const it = serie(d.generateur, 1, Math.floor(Math.random() * 1e9), diff)[0]!;
    if (it.consigne !== precedent?.consigne) return it;
  }
  return serie(d.generateur, 1, Math.floor(Math.random() * 1e9), d.difficultes[0]!)[0]!;
}

// Défi chrono : le plus de bonnes réponses en une minute, comme les tests de fluence du programme.
export function Defi() {
  const { id = '' } = useParams();
  const naviguer = useNavigate();
  const [enfant, setEnfant] = useState<Enfant | null>(null);
  const [defi, setDefi] = useState<DefiPack | null>(null);
  const [phase, setPhase] = useState<Phase>('pret');
  const [stop, setStop] = useState(0);
  const [item, setItem] = useState<Item | null>(null);
  const [saisie, setSaisie] = useState('');
  const [justes, setJustes] = useState(0);
  const [faux, setFaux] = useState(0);
  const [reste, setReste] = useState(0);
  const [flash, setFlash] = useState<'juste' | 'faux' | null>(null);
  const [record, setRecord] = useState(0);
  const [nouveauRecord, setNouveauRecord] = useState(false);
  const champ = useRef<HTMLInputElement>(null);
  const debut = useRef(0);
  const debutItem = useRef(0);

  useEffect(() => {
    void (async () => {
      try {
        const e = await api.enfantCourant();
        if (!e) return naviguer('/');
        if (await tempsEcoule(e)) return setStop(e.minutes_par_jour ?? 0);
        const d = (await chargerPack(e.classe)).defis.find((x) => x.id === id);
        if (!d) return naviguer('/accueil');
        setEnfant(e);
        setDefi(d);
        setRecord((await api.records().catch(() => ({} as Record<string, number>)))[d.id] ?? 0);
      } catch {
        naviguer('/accueil');
      }
    })();
  }, [id, naviguer]);

  const terminer = useCallback(() => {
    if (!enfant || !defi) return;
    setPhase('fini');
    setNouveauRecord(false);
    void api.noterDefi(defi.id, justes).then(setNouveauRecord).catch(() => undefined);
    setRecord((r) => Math.max(r, justes));
  }, [enfant, defi, justes]);

  useEffect(() => {
    if (phase !== 'en-cours' || !defi) return;
    const t = setInterval(() => {
      const r = Math.min(defi.duree_s, Math.max(0, defi.duree_s - Math.floor((Date.now() - debut.current) / 1000)));
      setReste(r);
      if (r === 0) clearInterval(t);
    }, 200);
    return () => clearInterval(t);
  }, [phase, defi]);

  useEffect(() => {
    if (phase === 'en-cours' && reste === 0 && debut.current > 0) terminer();
  }, [phase, reste, terminer]);

  if (stop) return <FinDuJour minutes={stop} />;
  if (!defi || !enfant) return <main className="ecran" aria-busy="true" />;

  const demarrer = () => {
    setJustes(0);
    setFaux(0);
    setNouveauRecord(false);
    setReste(defi.duree_s);
    setItem(nouvelItem(defi));
    setSaisie('');
    debut.current = Date.now();
    debutItem.current = Date.now();
    setPhase('en-cours');
    setTimeout(() => champ.current?.focus(), 50);
  };

  const valider = () => {
    if (!item || !saisie.trim() || phase !== 'en-cours') return;
    const r = normaliserReponse(saisie);
    const ok = r === item.reponse;
    if (ok) setJustes((n) => n + 1);
    else setFaux((n) => n + 1);
    setFlash(ok ? 'juste' : 'faux');
    setTimeout(() => setFlash(null), 250);
    void api.enregistrer({
      competence: item.competence, contenu: item.id, reussi: ok, indice: false,
      dureeMs: Date.now() - debutItem.current,
      reponse: /^[0-9 ,./-]{1,20}$/.test(r) ? r : undefined,
      erreur: ok ? undefined : item.erreurs?.[r],
    }).catch(() => undefined);
    debutItem.current = Date.now();
    setItem(nouvelItem(defi, item));
    setSaisie('');
    champ.current?.focus();
  };

  const objectif = defi.objectif;
  return (
    <main className="ecran">
      <div className="ligne">
        <Link to="/accueil" className="hp-iconbtn" aria-label="Quitter le défi"><Icone nom="fermer" /></Link>
        <h1 className="titre-2 pousse">Défi chrono · {defi.titre}</h1>
      </div>

      {phase === 'pret' && (
        <section className="hp-card defi__intro">
          <div className="ligne">
            <Octave taille={56} />
            <p className="pousse" style={{ margin: 0 }}>
              Réponds au plus de calculs possible en {defi.duree_s === 60 ? 'une minute' : `${defi.duree_s} secondes`}.
            </p>
          </div>
          <div className="defi__chiffres">
            <span><strong>{record}</strong><span className="muet">ton record</span></span>
            {objectif !== null && <span><strong>{objectif}</strong><span className="muet">objectif de fin d’année</span></span>}
          </div>
          <button className="hp-btn hp-btn--reward hp-btn--lg hp-btn--block" onClick={demarrer}>C’est parti !</button>
        </section>
      )}

      {phase === 'en-cours' && item && (
        <section className="defi">
          <div className="ligne">
            <div className="hp-progress pousse" role="progressbar" aria-label="Temps restant"
              aria-valuenow={reste} aria-valuemin={0} aria-valuemax={defi.duree_s}>
              <span style={{ width: `${(reste / defi.duree_s) * 100}%`, background: 'var(--octave)' }} />
            </div>
            <span className="hp-chip hp-chip--primary">{reste} s</span>
            <span className="hp-chip hp-chip--success">{justes}</span>
          </div>
          <p className={`defi__calcul${flash ? ` defi__calcul--${flash}` : ''}`} aria-live="polite">
            {item.consigne.replace(/^Complète : /, '')}
          </p>
          <form className="ligne" onSubmit={(e) => { e.preventDefault(); valider(); }}>
            <input ref={champ} className="saisie pousse" inputMode="numeric" autoComplete="off" aria-label="Ta réponse"
              value={saisie} onChange={(e) => setSaisie(e.target.value)} />
            <button className="hp-btn hp-btn--primary hp-btn--lg" disabled={!saisie.trim()}>OK</button>
          </form>
        </section>
      )}

      {phase === 'fini' && (
        <section className="hp-card defi__intro" role="status">
          <div className="ligne">
            <Octave humeur={nouveauRecord ? 'reussite' : 'accueil'} taille={56} />
            <p className="pousse" style={{ margin: 0 }}>
              {nouveauRecord ? 'Nouveau record !' : 'Bien joué.'} {justes} bonne{justes > 1 ? 's' : ''} réponse{justes > 1 ? 's' : ''}
              {faux > 0 ? `, ${faux} erreur${faux > 1 ? 's' : ''}` : ''}.
            </p>
          </div>
          <div className="defi__chiffres">
            <span><strong>{justes}</strong><span className="muet">cette fois</span></span>
            <span><strong>{record}</strong><span className="muet">ton record</span></span>
            {objectif !== null && <span><strong>{objectif}</strong><span className="muet">objectif de fin d’année</span></span>}
          </div>
          {objectif !== null && justes >= objectif && <p className="muet" style={{ margin: 0 }}>Objectif de fin d’année atteint.</p>}
          <button className="hp-btn hp-btn--reward hp-btn--lg hp-btn--block" onClick={demarrer}>Rejouer</button>
          <Link to="/accueil" className="hp-btn hp-btn--ghost hp-btn--block">Retour à l’accueil</Link>
        </section>
      )}
    </main>
  );
}
