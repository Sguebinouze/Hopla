import { useMemo, useState } from 'react';
import type { BlocCours, CoursPack, QuestionCours } from '../lib/cours';
import { Octave } from './Octave';
import { AvecCitations, TexteRiche } from './TexteRiche';
import { Visuel } from './Visuel';

const melanger = <T,>(l: T[]) => {
  const c = [...l];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j]!, c[i]!];
  }
  return c;
};

/** Question du cours : on répond, on lit l'explication, on continue. */
function Question({ q, numero }: { q: QuestionCours; numero?: number }) {
  const options = useMemo(() => melanger(q.options), [q]);
  const [choix, setChoix] = useState<string | null>(null);
  const juste = choix === q.reponse;
  const longues = options.some((o) => o.length > 9);
  return (
    <div className="cours__question">
      <p className="lecon__question">{numero !== undefined && <span className="cours__numero">{numero}</span>}<AvecCitations texte={q.consigne} /></p>
      <div className={`grille-options${longues ? ' grille-options--texte' : ''}`}>
        {options.map((o) => (
          <button key={o} type="button" disabled={choix !== null && o !== choix && o !== q.reponse}
            className={`hp-option${longues ? ' option-texte' : ''}${choix !== null && o === q.reponse ? ' hp-option--correct' : ''}${choix === o && !juste ? ' hp-option--wrong' : ''}`}
            onClick={() => { if (choix === null) setChoix(o); }}>
            {o}
          </button>
        ))}
      </div>
      {choix !== null && (
        <div className={`hp-feedback ${juste ? 'hp-feedback--success' : 'hp-feedback--attention'}`} style={{ maxWidth: 'none' }} role="status">
          <Octave humeur={juste ? 'reussite' : 'oups'} taille={40} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span className="hp-feedback__title">{juste ? 'Juste.' : 'Pas tout à fait.'}</span>
            <span className="hp-feedback__text"><AvecCitations texte={q.explication} /></span>
          </div>
        </div>
      )}
    </div>
  );
}

function Bloc({ b, images }: { b: BlocCours; images: CoursPack['images'] }) {
  switch (b.type) {
    case 'observe':
      return (
        <div className="cours__bloc cours__observe">
          <p className="cours__etiquette">Observe</p>
          <p className="cours__consigne"><TexteRiche texte={b.consigne} /></p>
          <ul className="cours__exemples">{b.exemples.map((e, i) => <li key={i}><AvecCitations texte={e} /></li>)}</ul>
        </div>
      );
    case 'explique':
      return <p className="cours__bloc lecon__texte"><AvecCitations texte={b.texte} /></p>;
    case 'methode':
      return (
        <div className="cours__bloc cours__methode">
          <p className="cours__etiquette">Méthode</p>
          <p className="cours__consigne"><TexteRiche texte={b.titre} /></p>
          <ol className="cours__etapes">{b.etapes.map((e, i) => <li key={i}><AvecCitations texte={e} /></li>)}</ol>
        </div>
      );
    case 'exemple-resolu':
      return (
        <div className="cours__bloc cours__resolu">
          <p className="cours__etiquette">Exemple résolu</p>
          <p className="cours__consigne"><AvecCitations texte={b.enonce} /></p>
          <ol className="cours__etapes">{b.etapes.map((e, i) => <li key={i}><AvecCitations texte={e} /></li>)}</ol>
          <p className="cours__conclusion"><AvecCitations texte={b.conclusion} /></p>
        </div>
      );
    case 'piege':
      return (
        <div className="cours__bloc cours__piege">
          <Octave humeur="oups" taille={40} />
          <div>
            <p className="cours__etiquette">Attention</p>
            <p className="lecon__texte"><AvecCitations texte={b.erreur} /></p>
            <p className="lecon__texte"><AvecCitations texte={b.correction} /></p>
          </div>
        </div>
      );
    case 'tableau':
      return (
        <div className="cours__bloc cours__tableau">
          <table>
            {b.titre && <caption>{b.titre}</caption>}
            <thead><tr>{b.colonnes.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
            <tbody>{b.lignes.map((l, i) => <tr key={i}>{l.map((x, j) => (j === 0
              ? <th key={j} scope="row"><TexteRiche texte={x} /></th>
              : <td key={j} data-col={b.colonnes[j]}><AvecCitations texte={x} /></td>))}</tr>)}</tbody>
          </table>
        </div>
      );
    case 'vocabulaire':
      return (
        <dl className="cours__bloc cours__vocabulaire">
          {b.mots.map((m) => <div key={m.mot}><dt>{m.mot}</dt><dd><TexteRiche texte={m.definition} /></dd></div>)}
        </dl>
      );
    case 'image': {
      const img = images?.[b.media];
      if (!img) return null;
      return (
        <figure className="cours__bloc cours__figure">
          <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
          <figcaption><TexteRiche texte={b.legende} /></figcaption>
        </figure>
      );
    }
    case 'visuel':
      return (
        <figure className="cours__bloc cours__figure">
          <div className="visuel"><Visuel visuel={b.visuel} /></div>
          <figcaption><TexteRiche texte={b.legende} /></figcaption>
        </figure>
      );
    case 'frise':
      return (
        <ol className="cours__bloc cours__frise">
          {b.reperes.map((r) => <li key={`${r.annee}-${r.evenement}`}><span className="cours__date">{r.date}</span><span><TexteRiche texte={r.evenement} /></span></li>)}
        </ol>
      );
    case 'question':
      return <div className="cours__bloc"><p className="cours__etiquette">Vérifie</p><Question q={b} /></div>;
  }
}

/** Cours complet : parties, puis ce qu'on retient, puis les questions « À toi ». */
export function Cours({ cours }: { cours: CoursPack }) {
  return (
    <div className="cours">
      {cours.parties.map((p, i) => (
        <section key={i} className="cours__partie" aria-labelledby={`partie-${i}`}>
          <h2 id={`partie-${i}`} className="cours__titre"><span className="cours__numero">{i + 1}</span>{p.titre}</h2>
          {p.blocs.map((b, j) => <Bloc key={j} b={b} images={cours.images} />)}
        </section>
      ))}
      <section className="cours__partie cours__essentiel" aria-labelledby="essentiel">
        <h2 id="essentiel" className="cours__titre">Je retiens</h2>
        <p className="muet">À recopier dans ton cahier.</p>
        {cours.essentiel.split('\n').filter(Boolean).map((l, i) => <p key={i} className="lecon__texte"><AvecCitations texte={l} /></p>)}
      </section>
      <section className="cours__partie" aria-labelledby="a-toi">
        <h2 id="a-toi" className="cours__titre">À toi</h2>
        {cours.a_toi.map((q, i) => <Question key={i} q={q} numero={i + 1} />)}
      </section>
    </div>
  );
}
