import { ENTREE } from '../lib/routes';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BoutonVoix } from '../composants/BoutonVoix';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { api } from '../lib/donnees';
import { aujourdhui } from '../lib/progression';
import { chargerAcces, noterQuiz, quizFait, type AccesJeux } from '../jeux/acces';
import { quizDuJour } from '../jeux/regles';

// Quiz de culture générale : 5 questions par jour, hors programme scolaire.
export function Culture() {
  const naviguer = useNavigate();
  const [acces, setAcces] = useState<AccesJeux | null>(null);
  const [rang, setRang] = useState(0);
  const [choix, setChoix] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [fin, setFin] = useState<{ score: number; xp: number | null } | null>(null);
  const jour = aujourdhui();

  useEffect(() => {
    void chargerAcces().then((a) => {
      if (!a) return naviguer(ENTREE);
      setAcces(a);
      const deja = quizFait(a.enfant.id, jour);
      if (deja !== null) setFin({ score: deja, xp: null });
    });
  }, [naviguer, jour]);

  const quiz = useMemo(() => (acces ? quizDuJour(acces.pack.culture ?? [], acces.enfant.id, jour) : []), [acces, jour]);
  if (!acces) return <main className="ecran" aria-busy="true" />;

  const entete = (
    <div className="ligne">
      <Link to="/accueil" className="hp-iconbtn" aria-label="Retour"><Icone nom="retour" /></Link>
      <h1 className="titre-2 pousse">Quiz du jour</h1>
      {!fin && quiz.length > 0 && <span className="muet">{rang + 1} / {quiz.length}</span>}
    </div>
  );
  if (!acces.culture) return <main className="ecran">{entete}<p>Le quiz n’est pas activé pour ton profil.</p></main>;
  if (!acces.debloque) {
    return (
      <main className="ecran">{entete}
        <section className="hp-card verrou">
          <Octave humeur="reflechit" taille={64} />
          <p style={{ margin: 0 }}>Termine d’abord ta mission du jour : le quiz s’ouvre ensuite.</p>
          <Link to="/accueil" className="hp-btn hp-btn--primary hp-btn--block">Faire ma mission</Link>
        </section>
      </main>
    );
  }
  if (fin) {
    return (
      <main className="ecran">{entete}
        <div className={`hp-feedback ${fin.score >= 3 ? 'hp-feedback--success' : 'hp-feedback--attention'}`} style={{ maxWidth: 'none' }} role="status">
          <Octave humeur={fin.score >= 3 ? 'reussite' : 'oups'} taille={56} />
          <div>
            <span className="hp-feedback__title">{fin.score} bonne{fin.score > 1 ? 's' : ''} réponse{fin.score > 1 ? 's' : ''} sur {quiz.length || 5}.</span>
            <span className="hp-feedback__text" style={{ display: 'block' }}>
              {fin.xp ? `+${fin.xp} XP. ` : ''}Un nouveau quiz t’attend demain.
            </span>
          </div>
        </div>
        <Link to="/jeux" className="hp-btn hp-btn--primary hp-btn--block">Jeux de réflexion</Link>
        <Link to="/accueil" className="hp-btn hp-btn--secondary hp-btn--block">Retour à l’accueil</Link>
      </main>
    );
  }

  const q = quiz[rang]!;
  const juste = choix === q.reponse;
  const classe = (o: string) => {
    if (!choix) return 'hp-option option-texte';
    if (o === q.reponse) return 'hp-option option-texte hp-option--correct';
    return o === choix ? 'hp-option option-texte hp-option--wrong' : 'hp-option option-texte';
  };
  const suivant = () => {
    if (rang + 1 < quiz.length) { setRang(rang + 1); setChoix(null); return; }
    noterQuiz(acces.enfant.id, jour, score);
    setFin({ score, xp: null });
    void api.terminerJeu('culture', score >= 3).then((xp) => setFin({ score, xp }), () => undefined);
  };

  return (
    <main className="ecran">
      {entete}
      <p className="muet">Culture générale, hors programme scolaire.</p>
      <div className="consigne">
        <h2 className="titre-1 pousse">{q.question}</h2>
        <BoutonVoix texte={q.question} label="Écouter la question" />
      </div>
      <div className="grille-options grille-options--texte">
        {q.options.map((o) => (
          <button key={o} type="button" className={classe(o)} disabled={choix !== null && o !== choix && o !== q.reponse}
            onClick={() => { if (choix) return; setChoix(o); if (o === q.reponse) setScore((s) => s + 1); }}>
            {o}
          </button>
        ))}
      </div>
      {choix && (
        <>
          <div className={`hp-feedback ${juste ? 'hp-feedback--success' : 'hp-feedback--attention'}`} style={{ maxWidth: 'none' }} role="status">
            <Octave humeur={juste ? 'reussite' : 'oups'} taille={48} />
            <div>
              <span className="hp-feedback__title">{juste ? 'Juste.' : `Réponse : ${q.reponse}.`}</span>
              <span className="hp-feedback__text" style={{ display: 'block' }}>{q.explication}</span>
            </div>
          </div>
          <button type="button" className="hp-btn hp-btn--primary hp-btn--lg hp-btn--block" onClick={suivant} autoFocus>Continuer</button>
        </>
      )}
    </main>
  );
}
