import { Link } from 'react-router-dom';
import { Octave } from './Octave';

/** Écran affiché quand le temps de travail du jour, fixé par le parent, est atteint. */
export function FinDuJour({ minutes }: { minutes: number }) {
  return (
    <main className="ecran">
      <section className="hp-card defi__intro" role="status">
        <div className="ligne">
          <Octave humeur="reussite" taille={64} />
          <p className="pousse" style={{ margin: 0 }}>
            Bravo ! Tu as fait tes {minutes} minutes de travail prévues aujourd’hui. On reprend demain.
          </p>
        </div>
        <Link to="/accueil" className="hp-btn hp-btn--primary hp-btn--block">Retour à l’accueil</Link>
      </section>
    </main>
  );
}
