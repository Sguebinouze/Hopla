import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GrilleEquilibree } from '../composants/Grille';
import { Icone, type NomIcone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { api } from '../lib/donnees';
import { chargerAcces, type AccesJeux } from '../jeux/acces';
import { PLATEAUX } from '../jeux/Plateaux';
import { JEUX, type IdJeu } from '../jeux/regles';

const ICONES: Record<IdJeu, NomIcone> = {
  suites: 'operations', sudoku: 'cahier', memoire: 'ampoule', intrus: 'loupe', labyrinthe: 'globe', sommes: 'plus', 'mots-meles': 'plume',
};

function Verrou() {
  return (
    <section className="hp-card verrou">
      <Octave humeur="reflechit" taille={64} />
      <p style={{ margin: 0 }}>Termine d’abord ta mission du jour : les jeux et le quiz s’ouvrent ensuite.</p>
      <Link to="/accueil" className="hp-btn hp-btn--primary hp-btn--block">Faire ma mission</Link>
    </section>
  );
}

/** Accès commun aux pages de jeux : session, réglage du parent, mission du jour. */
function useAcces() {
  const naviguer = useNavigate();
  const [acces, setAcces] = useState<AccesJeux | null>(null);
  useEffect(() => {
    void chargerAcces().then((a) => (a ? setAcces(a) : naviguer('/')));
  }, [naviguer]);
  return acces;
}

export function Jeux() {
  const acces = useAcces();
  if (!acces) return <main className="ecran" aria-busy="true" />;
  return (
    <main className="ecran">
      <div className="ligne">
        <Link to="/accueil" className="hp-iconbtn" aria-label="Retour"><Icone nom="retour" /></Link>
        <h1 className="titre-2 pousse">Jeux de réflexion</h1>
      </div>
      {!acces.jeux ? <p>Les jeux ne sont pas activés pour ton profil.</p> : !acces.debloque ? <Verrou /> : (
        <GrilleEquilibree min={300} espace={2}>
          {JEUX.map((j) => (
            <Link key={j.id} to={`/jeux/${j.id}`} className="hp-card jeu-carte">
              <span className="jeu-carte__icone"><Icone nom={ICONES[j.id]} taille={26} /></span>
              <span className="pousse"><strong>{j.nom}</strong><span className="muet" style={{ display: 'block' }}>{j.consigne}</span></span>
            </Link>
          ))}
        </GrilleEquilibree>
      )}
    </main>
  );
}

export function Jeu() {
  const { jeu } = useParams();
  const acces = useAcces();
  const [graine, setGraine] = useState(() => Math.floor(Math.random() * 1e9));
  const [fin, setFin] = useState<{ reussi: boolean; bilan: string; xp: number | null } | null>(null);
  const def = JEUX.find((j) => j.id === jeu);
  if (!def) return <main className="ecran"><p>Ce jeu n’existe pas.</p><Link to="/jeux">Voir les jeux</Link></main>;
  if (!acces) return <main className="ecran" aria-busy="true" />;
  const Plateau = PLATEAUX[def.id];
  const terminer = (reussi: boolean, bilan: string) => {
    setFin({ reussi, bilan, xp: null });
    void api.terminerJeu(def.id, reussi).then((xp) => setFin({ reussi, bilan, xp }), () => setFin({ reussi, bilan, xp: 0 }));
  };
  return (
    <main className="ecran">
      <div className="ligne">
        <Link to="/jeux" className="hp-iconbtn" aria-label="Retour aux jeux"><Icone nom="retour" /></Link>
        <h1 className="titre-2 pousse">{def.nom}</h1>
      </div>
      {!acces.jeux || !acces.debloque ? <Verrou /> : fin ? (
        <section className="jeu-fin">
          <div className={`hp-feedback ${fin.reussi ? 'hp-feedback--success' : 'hp-feedback--attention'}`} style={{ maxWidth: 'none' }} role="status">
            <Octave humeur={fin.reussi ? 'reussite' : 'oups'} taille={56} />
            <div>
              <span className="hp-feedback__title">{fin.reussi ? 'Réussi.' : 'Partie terminée.'}</span>
              <span className="hp-feedback__text" style={{ display: 'block' }}>
                {fin.bilan}{fin.xp === null ? '' : fin.xp > 0 ? ` +${fin.xp} XP` : ' Plus d’XP de jeux pour aujourd’hui.'}
              </span>
            </div>
          </div>
          <button type="button" className="hp-btn hp-btn--primary hp-btn--lg hp-btn--block"
            onClick={() => { setFin(null); setGraine(Math.floor(Math.random() * 1e9)); }}>Rejouer</button>
          <Link to="/jeux" className="hp-btn hp-btn--secondary hp-btn--block">Autres jeux</Link>
        </section>
      ) : (
        <>
          <p style={{ margin: 0 }}>{def.consigne}</p>
          <Plateau key={graine} niveau={acces.niveau} graine={graine} onFin={terminer} />
        </>
      )}
    </main>
  );
}
