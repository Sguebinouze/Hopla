import { useEffect, useMemo, useState } from 'react';
import { TexteRiche } from '../../composants/TexteRiche';
import { api, type DecisionRelecture } from '../../lib/donnees';
import { GardeAdmin } from './Admin';

// Relecture des contenus rédigés : notion (conformité au texte officiel), leçon, questions.
// Les décisions sont enregistrées en base, puis reportées dans le dépôt par `pnpm content:relecture`.

interface Question {
  id: string; difficulte: number; consigne: string; options: string[]; reponse: string;
  indice: string; explication: string; ecoute?: string;
}
interface Notion {
  id: string; classe: string; titre: string; theme: string; attendu: string; verifiee: boolean;
  source: { titre: string; page: number; extrait: string };
  lecon: { exemple: string; regle: string; piege: string | null; essai: { consigne: string; options: string[]; reponse: string; explication: string } } | null;
  questions: Question[];
  /** Absent d'un fichier de relecture construit avant les dictées. */
  dictees?: { id: string; titre: string; texte: string; source: string; licence: string; url: string | null }[];
}
type Type = DecisionRelecture['type'];
type Element = { type: Type; id: string };

const MATIERES: Record<string, string> = {
  FR: 'Français', MA: 'Maths', QM: 'Questionner le monde', EM: 'EMC', HG: 'Histoire-géo', ST: 'Sciences', LV: 'Anglais',
};
const CLASSES: Record<string, string> = { cp: 'CP', ce1: 'CE1', ce2: 'CE2', cm1: 'CM1', cm2: 'CM2', '6e': '6e', '5e': '5e', '4e': '4e', '3e': '3e' };
const ETATS = ['À relire', 'À corriger', 'Validées', 'Tout'] as const;
const PAR_PAGE = 20;

const cle = (type: Type, id: string) => `${type}#${id}`;
const matiere = (id: string) => MATIERES[id.slice(0, 2)] ?? id.slice(0, 2);
const elements = (n: Notion): Element[] => [
  ...(n.verifiee ? [] : [{ type: 'notion' as const, id: n.id }]),
  ...(n.lecon ? [{ type: 'lecon' as const, id: n.id }] : []),
  ...n.questions.map((q) => ({ type: 'question' as const, id: q.id })),
  ...(n.dictees ?? []).map((d) => ({ type: 'dictee' as const, id: d.id })),
];

function Options({ options, reponse }: { options: string[]; reponse: string }) {
  return (
    <ul className="relecture__options">
      {options.map((o) => <li key={o} className={o === reponse ? 'juste' : undefined}>{o === reponse ? '✓ ' : ''}{o}</li>)}
    </ul>
  );
}

function Decision({ el, d, onDecider }: {
  el: Element; d: DecisionRelecture | undefined;
  onDecider: (el: Element, decision: 'ok' | 'corriger', commentaire: string) => void;
}) {
  const [commentaire, setCommentaire] = useState(d?.commentaire ?? '');
  const [ouvert, setOuvert] = useState(d?.decision === 'corriger');
  useEffect(() => { setCommentaire(d?.commentaire ?? ''); setOuvert(d?.decision === 'corriger'); }, [d?.decision, d?.commentaire]);
  return (
    <div className="relecture__decision">
      <div className="ligne">
        <button type="button" className={`hp-chip ${d?.decision === 'ok' ? 'hp-chip--success' : 'hp-chip--neutral'}`} aria-pressed={d?.decision === 'ok'}
          onClick={() => onDecider(el, 'ok', '')}>{el.type === 'notion' ? 'Conforme au texte' : 'Valider'}</button>
        <button type="button" className={`hp-chip ${d?.decision === 'corriger' ? 'hp-chip--attention' : 'hp-chip--neutral'}`} aria-pressed={d?.decision === 'corriger'}
          onClick={() => setOuvert(true)}>À corriger</button>
      </div>
      {ouvert && (
        <form className="formulaire" onSubmit={(e) => { e.preventDefault(); onDecider(el, 'corriger', commentaire); }}>
          <textarea className="relecture__commentaire" value={commentaire} maxLength={2000} aria-label="Ce qui ne va pas"
            placeholder="Ce qui ne va pas, et la correction souhaitée" onChange={(e) => setCommentaire(e.target.value)} />
          <button className="hp-btn hp-btn--secondary" style={{ alignSelf: 'flex-start' }}>Enregistrer la correction</button>
        </form>
      )}
    </div>
  );
}

function PageRelecture() {
  const [notions, setNotions] = useState<Notion[] | null>(null);
  const [decisions, setDecisions] = useState<Map<string, DecisionRelecture>>(new Map());
  const [classe, setClasse] = useState('');
  const [filtreMatiere, setFiltreMatiere] = useState('Toutes');
  const [etat, setEtat] = useState<(typeof ETATS)[number]>('À relire');
  const [limite, setLimite] = useState(PAR_PAGE);
  const [message, setMessage] = useState('');

  useEffect(() => {
    void (async () => {
      try {
        const r = await fetch('/packs/relecture.json');
        if (!r.ok) throw new Error('Fichier de relecture absent : lancez pnpm content:packs.');
        const n = (await r.json()) as Notion[];
        setNotions(n);
        setClasse(n[0]?.classe ?? '');
        setDecisions(new Map((await api.decisionsRelecture()).map((d) => [cle(d.type, d.element_id), d])));
      } catch (e) {
        setMessage((e as Error).message);
        setNotions((n) => n ?? []);
      }
    })();
  }, []);

  const decision = (el: Element) => decisions.get(cle(el.type, el.id));
  const deClasse = useMemo(() => (notions ?? []).filter((n) => n.classe === classe), [notions, classe]);
  const matieres = useMemo(() => ['Toutes', ...new Set(deClasse.map((n) => matiere(n.id)))], [deClasse]);
  const tous = deClasse.flatMap(elements);
  const ok = tous.filter((e) => decision(e)?.decision === 'ok').length;
  const ko = tous.filter((e) => decision(e)?.decision === 'corriger').length;

  const visibles = deClasse.filter((n) => {
    if (filtreMatiere !== 'Toutes' && matiere(n.id) !== filtreMatiere) return false;
    const ds = elements(n).map((e) => decision(e)?.decision);
    if (etat === 'À relire') return ds.some((d) => !d);
    if (etat === 'À corriger') return ds.some((d) => d === 'corriger');
    if (etat === 'Validées') return ds.length > 0 && ds.every((d) => d === 'ok');
    return true;
  });

  const enregistrer = async (lot: DecisionRelecture[]) => {
    const avant = new Map(decisions);
    setDecisions((m) => { const n = new Map(m); for (const d of lot) n.set(cle(d.type, d.element_id), d); return n; });
    try {
      await api.enregistrerDecisions(lot);
      setMessage(lot.length > 1 ? `${lot.length} éléments validés.` : 'Enregistré.');
    } catch (e) {
      setDecisions(avant);
      setMessage(`Échec de l’enregistrement : ${(e as Error).message}`);
    }
  };
  const decider = (el: Element, d: 'ok' | 'corriger', commentaire: string) =>
    enregistrer([{ type: el.type, element_id: el.id, decision: d, commentaire }]);
  const toutValider = (n: Notion) =>
    enregistrer(elements(n).filter((e) => !decision(e)).map((e) => ({ type: e.type, element_id: e.id, decision: 'ok', commentaire: '' })));

  const exporter = () => {
    const contenu = JSON.stringify([...decisions.values()].map(({ type, element_id, decision: d, commentaire }) => ({ type, element_id, decision: d, commentaire })), null, 2);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([contenu], { type: 'application/json' }));
    a.download = `decisions-relecture-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (!notions) return <section aria-busy="true" />;
  return (
    <section className="relecture">
      <div className="hp-card relecture__barre">
        <div className="ligne">
          <p className="pousse" style={{ margin: 0 }}>
            <strong>{CLASSES[classe] ?? classe}</strong> : {ok} validé{ok > 1 ? 's' : ''} · {ko} à corriger · {tous.length - ok - ko} à relire
          </p>
          <button type="button" className="hp-btn hp-btn--ghost" onClick={exporter} disabled={decisions.size === 0}>Exporter les décisions</button>
        </div>
        <div className="hp-progress hp-progress--sm" role="progressbar" aria-label="Éléments validés" aria-valuenow={ok} aria-valuemin={0} aria-valuemax={tous.length}>
          <span style={{ width: `${tous.length ? (ok / tous.length) * 100 : 0}%` }} />
        </div>
        <div className="relecture__filtres" role="group" aria-label="Classe">
          {[...new Set(notions.map((n) => n.classe))].map((c) => (
            <button key={c} type="button" aria-pressed={c === classe} className={`hp-chip ${c === classe ? 'hp-chip--primary' : 'hp-chip--neutral'}`}
              onClick={() => { setClasse(c); setFiltreMatiere('Toutes'); setLimite(PAR_PAGE); }}>{CLASSES[c] ?? c}</button>
          ))}
        </div>
        <div className="relecture__filtres" role="group" aria-label="Matière">
          {matieres.map((m) => (
            <button key={m} type="button" aria-pressed={m === filtreMatiere} className={`hp-chip ${m === filtreMatiere ? 'hp-chip--primary' : 'hp-chip--neutral'}`}
              onClick={() => { setFiltreMatiere(m); setLimite(PAR_PAGE); }}>{m}</button>
          ))}
        </div>
        <div className="relecture__filtres" role="group" aria-label="État">
          {ETATS.map((e) => (
            <button key={e} type="button" aria-pressed={e === etat} className={`hp-chip ${e === etat ? 'hp-chip--primary' : 'hp-chip--neutral'}`}
              onClick={() => { setEtat(e); setLimite(PAR_PAGE); }}>{e}</button>
          ))}
        </div>
        {message && <p className="muet" role="status">{message}</p>}
      </div>

      {visibles.length === 0 && <p className="hp-card muet">{etat === 'À relire' ? 'Plus rien à relire avec ces filtres.' : 'Aucune notion avec ces filtres.'}</p>}

      {visibles.slice(0, limite).map((n) => {
        const restants = elements(n).filter((e) => !decision(e)).length;
        return (
          <article key={n.id} className="relecture__notion">
            <section className="hp-card relecture__carte">
              <p className="muet">{CLASSES[n.classe]} · {matiere(n.id)} · {n.theme} · {n.id}</p>
              <h2 className="titre-2">{n.titre}</h2>
              <p style={{ margin: 0 }}>{n.attendu}</p>
              <blockquote className="relecture__source">
                « {n.source.extrait} »
                <cite>{n.source.titre}, page {n.source.page} du PDF archivé</cite>
              </blockquote>
              {n.verifiee
                ? <p className="muet">Notion déjà vérifiée sur le texte officiel.</p>
                : <Decision el={{ type: 'notion', id: n.id }} d={decision({ type: 'notion', id: n.id })} onDecider={decider} />}
              {restants > 0 && (
                <div className="ligne relecture__tout">
                  <p className="muet pousse">Tout ce qui n’a pas encore de décision ({restants}) passe en « validé ».</p>
                  <button type="button" className="hp-btn hp-btn--primary" onClick={() => void toutValider(n)}>
                    {restants === elements(n).length ? 'Tout valider' : `Valider les ${restants} restants`}
                  </button>
                </div>
              )}
            </section>

            {n.lecon && (
              <section className="hp-card relecture__carte">
                <h3 className="titre-3">Leçon</h3>
                <dl className="relecture__lecon">
                  <dt>Regarde</dt><dd><TexteRiche texte={n.lecon.exemple} /></dd>
                  <dt>Retiens</dt><dd><TexteRiche texte={n.lecon.regle} /></dd>
                  {n.lecon.piege && <><dt>Attention</dt><dd><TexteRiche texte={n.lecon.piege} /></dd></>}
                  <dt>Essai</dt>
                  <dd>
                    <strong>{n.lecon.essai.consigne}</strong>
                    <Options options={n.lecon.essai.options} reponse={n.lecon.essai.reponse} />
                    <span className="muet">{n.lecon.essai.explication}</span>
                  </dd>
                </dl>
                <Decision el={{ type: 'lecon', id: n.id }} d={decision({ type: 'lecon', id: n.id })} onDecider={decider} />
              </section>
            )}

            {n.questions.map((q) => (
              <section key={q.id} className="hp-card relecture__carte">
                <p className="muet">Niveau {q.difficulte} · {q.id}</p>
                {q.ecoute && <p className="muet">Octave dit en anglais : <strong lang="en">« {q.ecoute} »</strong></p>}
                <strong>{q.consigne}</strong>
                <Options options={q.options} reponse={q.reponse} />
                <p className="muet"><strong>Indice :</strong> {q.indice}</p>
                <p className="muet"><strong>Explication :</strong> {q.explication}</p>
                <Decision el={{ type: 'question', id: q.id }} d={decision({ type: 'question', id: q.id })} onDecider={decider} />
              </section>
            ))}

            {(n.dictees ?? []).map((d) => (
              <section key={d.id} className="hp-card relecture__carte">
                <p className="muet">Dictée · {d.id} · {d.licence === 'hopla' ? 'texte écrit pour l’appli' : d.licence === 'domaine-public' ? 'domaine public' : 'CC BY 4.0'}</p>
                <h3 className="titre-3">{d.titre}</h3>
                <p style={{ margin: 0 }}>{d.texte}</p>
                <p className="muet">
                  {d.source}{d.url && <> · <a href={d.url} target="_blank" rel="noreferrer">texte source</a></>} · {d.texte.split(/\s+/).length} mots
                </p>
                <Decision el={{ type: 'dictee', id: d.id }} d={decision({ type: 'dictee', id: d.id })} onDecider={decider} />
              </section>
            ))}
          </article>
        );
      })}

      {visibles.length > limite && (
        <button type="button" className="hp-btn hp-btn--ghost" onClick={() => setLimite((l) => l + PAR_PAGE)}>
          Afficher {Math.min(PAR_PAGE, visibles.length - limite)} notions de plus ({visibles.length - limite} restantes)
        </button>
      )}
    </section>
  );
}

export default function Relecture() {
  return <GardeAdmin><PageRelecture /></GardeAdmin>;
}
