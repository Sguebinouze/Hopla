import { useEffect, useState, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '../composants/Avatar';
import { Icone } from '../composants/Icone';
import { api, CODE_DE_DEMO, type Profil } from '../lib/donnees';

// 8 pictogrammes faciles à retenir en primaire ; leur position sert de chiffre (0 à 7).
const PICTOS: { nom: string; dessin: ReactNode }[] = [
  { nom: 'Étoile', dessin: <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z" fill="#FFC53D" /> },
  { nom: 'Lune', dessin: <path d="M20 14A8 8 0 1110 4a6 6 0 0010 10z" fill="#4B3FD1" /> },
  { nom: 'Cœur', dessin: <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" fill="#C2255C" /> },
  { nom: 'Feuille', dessin: <path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z" fill="#2B8A3E" /> },
  { nom: 'Goutte', dessin: <path d="M12 21c-4 0-7-3-7-7 0-5 7-11 7-11s7 6 7 11c0 4-3 7-7 7z" fill="#0C8599" /> },
  { nom: 'Soleil', dessin: <circle cx="12" cy="12" r="6" fill="#F76707" /> },
  { nom: 'Poisson', dessin: <path d="M3 12c3-5 9-6 13-2l5-3v10l-5-3c-4 4-10 3-13-2z" fill="#E8590C" /> },
  { nom: 'Nuage', dessin: <path d="M7 18a4 4 0 01-.5-8A6 6 0 0118 9a4.5 4.5 0 01-.5 9z" fill="#74A7FF" /> },
];

export function Code() {
  const { id = '' } = useParams();
  const naviguer = useNavigate();
  const [profil, setProfil] = useState<Profil | null>(null);
  const [saisie, setSaisie] = useState('');
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    void api.listeProfils().then((ps) => setProfil(ps.find((p) => p.id === id) ?? null));
  }, [id]);

  useEffect(() => {
    if (saisie.length < 4) return;
    void (async () => {
      try {
        if (await api.ouvrirSession(id, saisie)) naviguer('/accueil');
        else setErreur('Code incorrect. Réessaie.');
      } catch (e) {
        setErreur((e as Error).message);
      }
      setSaisie('');
    })();
  }, [saisie, id, naviguer]);

  if (!profil) return <main className="ecran" aria-busy="true" />;
  const pictos = profil.code_type === 'pictos';
  const touches = pictos ? PICTOS.map((_, i) => String(i)) : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const ajouter = (c: string) => {
    setErreur('');
    setSaisie((s) => (s.length < 4 ? s + c : s));
  };

  return (
    <main className="ecran" style={{ alignItems: 'center' }}>
      <Link to="/" className="hp-iconbtn" aria-label="Retour au choix du profil" style={{ alignSelf: 'flex-start' }}><Icone nom="retour" /></Link>
      <Avatar teinte={profil.avatar} taille={88} />
      <h1 className="titre-1">Bonjour {profil.prenom}</h1>
      <p className="muet">Tape ton code secret</p>
      <div className="hp-pin__slots" aria-label={`${saisie.length} symboles sur 4`}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`hp-pin__slot${i < saisie.length ? ' hp-pin__slot--filled' : ''}`}>
            {i < saisie.length && <svg width={12} height={12} aria-hidden="true"><circle cx={6} cy={6} r={6} fill="currentColor" /></svg>}
          </span>
        ))}
      </div>
      {erreur && <p className="erreur" role="alert">{erreur}</p>}
      <div className="hp-pin" style={{ boxShadow: 'var(--shadow-card)' }}>
        <div className="hp-pin__grid">
          {touches.map((t) => (
            <button key={t} className="hp-pin__key" onClick={() => ajouter(t)}
              aria-label={pictos ? PICTOS[Number(t)]!.nom : t}>
              {pictos ? <svg width={30} height={30} viewBox="0 0 24 24" aria-hidden="true">{PICTOS[Number(t)]!.dessin}</svg> : t}
            </button>
          ))}
          <button className="hp-pin__key" aria-label="Effacer" onClick={() => setSaisie((s) => s.slice(0, -1))}><Icone nom="effacer" /></button>
        </div>
      </div>
      {api.mode === 'demo' && (
        <p className="bandeau-demo">Démo : le code est {pictos ? '4 fois la lune' : CODE_DE_DEMO}.</p>
      )}
      <p className="muet">Code oublié ? <Link to="/parent">Demande à un parent</Link></p>
    </main>
  );
}
