import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BoutonVoix } from '../composants/BoutonVoix';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { TexteRiche } from '../composants/TexteRiche';
import { api } from '../lib/donnees';
import { competenceDuPack, type CompetencePack } from '../lib/packs';

const melanger = <T,>(l: T[]) => {
  const c = [...l];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j]!, c[i]!];
  }
  return c;
};

export function Lecon() {
  const { competence = '' } = useParams();
  const naviguer = useNavigate();
  const [c, setC] = useState<CompetencePack | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [choix, setChoix] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const enfant = await api.enfantCourant();
        if (!enfant) return naviguer('/');
        const r = await competenceDuPack(enfant.classe, competence);
        if (!r?.competence.lecon) return naviguer('/accueil');
        setC(r.competence);
        setOptions(melanger(r.competence.lecon.essai.options));
      } catch {
        naviguer('/accueil');
      }
    })();
  }, [competence, naviguer]);

  if (!c?.lecon) return <main className="ecran" aria-busy="true" />;
  const l = c.lecon;
  const juste = choix === l.essai.reponse;
  const jouable = c.generateurs.length > 0 || c.exercices.length > 0;

  return (
    <main className="ecran lecon">
      <div className="ligne">
        <button type="button" onClick={() => naviguer(-1)} className="hp-iconbtn" aria-label="Retour"><Icone nom="retour" /></button>
        <h1 className="titre-2 pousse">{c.titre}</h1>
      </div>

      <section className="lecon__bloc">
        <div className="lecon__tete"><span className="lecon__etiquette">Regarde</span><BoutonVoix texte={l.exemple} label="Écouter l’exemple" /></div>
        <p className="lecon__texte">{l.exemple}</p>
      </section>

      <section className="lecon__bloc lecon__bloc--regle">
        <div className="lecon__tete"><span className="lecon__etiquette">Retiens</span><BoutonVoix texte={l.regle} label="Écouter la règle" /></div>
        <p className="lecon__texte"><TexteRiche texte={l.regle} /></p>
      </section>

      {l.piege && (
        <section className="lecon__bloc lecon__bloc--piege">
          <div className="lecon__tete"><span className="lecon__etiquette">Attention</span><BoutonVoix texte={l.piege} label="Écouter le piège" /></div>
          <p className="lecon__texte">{l.piege}</p>
        </section>
      )}

      <section className="lecon__essai">
        <div className="hp-bubble" style={{ maxWidth: 'none' }}>
          <Octave humeur={choix === null ? 'reflechit' : juste ? 'reussite' : 'oups'} taille={56} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
            <span className="hp-bubble__text">À toi : {l.essai.consigne}</span>
            <BoutonVoix texte={l.essai.consigne} label="Écouter la question" />
          </div>
        </div>
        <div className={`grille-options${options.some((o) => o.length > 9) ? ' grille-options--texte' : ''}`}>
          {options.map((o) => (
            <button key={o} type="button" disabled={choix !== null && o !== choix && o !== l.essai.reponse}
              className={`hp-option${options.some((x) => x.length > 9) ? ' option-texte' : ''}${choix !== null && o === l.essai.reponse ? ' hp-option--correct' : ''}${choix === o && !juste ? ' hp-option--wrong' : ''}`}
              onClick={() => { if (choix === null) setChoix(o); }}>
              {o}
            </button>
          ))}
        </div>
        {choix !== null && (
          <div className={`hp-feedback ${juste ? 'hp-feedback--success' : 'hp-feedback--attention'}`} style={{ maxWidth: 'none' }} role="status">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span className="hp-feedback__title">{juste ? 'Juste.' : 'Pas tout à fait.'}</span>
              <span className="hp-feedback__text">{l.essai.explication}</span>
            </div>
          </div>
        )}
        {choix !== null && jouable && (
          <Link to={`/exercice/${c.id}`} className="hp-btn hp-btn--primary hp-btn--lg hp-btn--block">S’entrainer</Link>
        )}
      </section>
    </main>
  );
}
