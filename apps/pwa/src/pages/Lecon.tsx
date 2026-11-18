import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BoutonVoix } from '../composants/BoutonVoix';
import { Icone, type NomIcone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { TexteRiche } from '../composants/TexteRiche';
import { COULEUR_MATIERE } from '../lib/couleurs';
import { api } from '../lib/donnees';
import { competenceDuPack, NOMS_MATIERES, type CompetencePack } from '../lib/packs';
import { dire, lectureAuto } from '../lib/voix';

const melanger = <T,>(l: T[]) => {
  const c = [...l];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j]!, c[i]!];
  }
  return c;
};

/** Les passages entre « » deviennent des citations surlignées : on voit tout de suite les phrases étudiées. */
function AvecCitations({ texte }: { texte: string }) {
  const morceaux = texte.split(/(«[^»]*»)/g);
  return <>{morceaux.map((m, i) => (m.startsWith('«') ? <q key={i} className="citation">{m.slice(1, -1).trim()}</q> : <TexteRiche key={i} texte={m} />))}</>;
}

/** Notions en gras dans la règle : affichées en étiquettes au-dessus, comme les mots à retenir. */
const motsCles = (regle: string) => [...new Set(regle.split('**').filter((_, i) => i % 2 === 1).map((m) => m.trim()))].slice(0, 6);

type Etape = { cle: string; titre: string; icone: NomIcone; annonce: string; suite?: string };

export function Lecon() {
  const { competence = '' } = useParams();
  const naviguer = useNavigate();
  const [c, setC] = useState<(CompetencePack & { matiere?: string }) | null>(null);
  const [cycle, setCycle] = useState(3);
  const [options, setOptions] = useState<string[]>([]);
  const [choix, setChoix] = useState<string | null>(null);
  const [ouvertes, setOuvertes] = useState(1);
  const etapesRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    void (async () => {
      try {
        const enfant = await api.enfantCourant();
        if (!enfant) return naviguer('/');
        const r = await competenceDuPack(enfant.classe, competence);
        if (!r?.competence.lecon) return naviguer('/accueil');
        setC(r.competence);
        setCycle(r.cycle);
        setOptions(melanger(r.competence.lecon.essai.options));
        if (lectureAuto(r.cycle)) dire(r.competence.lecon.exemple);
        void api.noterLecon(competence).catch(() => undefined);
      } catch {
        naviguer('/accueil');
      }
    })();
  }, [competence, naviguer]);

  if (!c?.lecon) return <main className="ecran" aria-busy="true" />;
  const l = c.lecon;
  const juste = choix === l.essai.reponse;
  const jouable = c.generateurs.length > 0 || c.exercices.length > 0;
  const longues = options.some((o) => o.length > 9);
  const cles = motsCles(l.regle);

  const etapes: Etape[] = [
    { cle: 'decouvre', titre: 'Découvre', icone: 'loupe', annonce: 'Des exemples pour commencer.', suite: 'Voir la règle' },
    { cle: 'comprends', titre: 'Retiens', icone: 'ampoule', annonce: 'La règle à garder en tête.', suite: l.piege ? 'J’ai compris' : 'Je m’essaie' },
    ...(l.piege ? [{ cle: 'piege', titre: 'Le piège', icone: 'eclair' as NomIcone, annonce: 'L’erreur que tout le monde fait.', suite: 'Je m’essaie' }] : []),
    { cle: 'essai', titre: 'À toi', icone: 'flamme', annonce: 'Une question pour vérifier.' },
  ];
  const lu: Record<string, string> = { decouvre: l.exemple, comprends: l.regle, piege: l.piege ?? '', essai: l.essai.consigne };
  const terminee = choix !== null;
  const faites = terminee ? etapes.length : ouvertes - 1;

  const avancer = (i: number) => {
    setOuvertes(i + 2);
    const suivante = etapes[i + 1];
    if (suivante && lectureAuto(cycle)) dire(lu[suivante.cle]!);
    // La nouvelle étape apparait sous la précédente : on l'amène à l'écran.
    requestAnimationFrame(() => etapesRef.current[i + 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  };

  const contenu = (e: Etape): ReactNode => {
    switch (e.cle) {
      case 'decouvre':
        return <p className="lecon__texte lecon__texte--grand"><AvecCitations texte={l.exemple} /></p>;
      case 'comprends':
        return (
          <>
            {cles.length > 1 && (
              <ul className="lecon__cles" aria-label="Mots à retenir">
                {cles.map((m) => <li key={m}>{m}</li>)}
              </ul>
            )}
            <p className="lecon__texte"><AvecCitations texte={l.regle} /></p>
          </>
        );
      case 'piege':
        return (
          <div className="lecon__piege">
            <Octave humeur="oups" taille={48} />
            <p className="lecon__texte"><AvecCitations texte={l.piege!} /></p>
          </div>
        );
      default:
        return (
          <>
            <p className="lecon__question">{l.essai.consigne}</p>
            <div className={`grille-options${longues ? ' grille-options--texte' : ''}`}>
              {options.map((o) => (
                <button key={o} type="button" disabled={choix !== null && o !== choix && o !== l.essai.reponse}
                  className={`hp-option${longues ? ' option-texte' : ''}${choix !== null && o === l.essai.reponse ? ' hp-option--correct' : ''}${choix === o && !juste ? ' hp-option--wrong' : ''}`}
                  onClick={() => { if (choix === null) setChoix(o); }}>
                  {o}
                </button>
              ))}
            </div>
            {terminee && (
              <div className={`hp-feedback ${juste ? 'hp-feedback--success' : 'hp-feedback--attention'}`} style={{ maxWidth: 'none' }} role="status">
                <Octave humeur={juste ? 'reussite' : 'oups'} taille={48} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span className="hp-feedback__title">{juste ? 'Bien joué, tu as compris.' : 'Pas tout à fait.'}</span>
                  <span className="hp-feedback__text">{l.essai.explication}</span>
                </div>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <main className={`ecran ecran--large lecon ${COULEUR_MATIERE[c.matiere ?? ''] ?? ''}`}>
      <div className="lecon__mise">
        <header className="lecon__entete">
          <div className="ligne">
            <button type="button" onClick={() => naviguer(-1)} className="hp-iconbtn" aria-label="Retour"><Icone nom="retour" /></button>
            <span className="lecon__matiere">{NOMS_MATIERES[c.matiere ?? ''] ?? 'Leçon'} · {c.theme}</span>
          </div>
          <div className="lecon__accroche">
            <Octave humeur={terminee ? (juste ? 'reussite' : 'oups') : 'accueil'} taille={72} />
            <div className="lecon__titres">
              <h1 className="lecon__titre">{c.titre}</h1>
              <p className="muet">{terminee ? 'Leçon terminée. Tu peux t’entrainer ou la relire.' : `${etapes.length} étapes, environ 2 minutes.`}</p>
            </div>
          </div>
          <ol className="lecon__progression" aria-label="Étapes de la leçon">
            {etapes.map((e, i) => (
              <li key={e.cle} className={i < faites ? 'faite' : i < ouvertes ? 'courante' : ''}>
                <span className="lecon__pastille" aria-hidden="true"><Icone nom={i < faites ? 'coche' : e.icone} taille={16} /></span>
                <span>{e.titre}</span>
              </li>
            ))}
          </ol>
        </header>

        <ol className="parcours">
          {etapes.map((e, i) => {
            const ouverte = i < ouvertes;
            return (
              <li key={e.cle} ref={(el) => { etapesRef.current[i] = el; }}
                className={`etape etape--${e.cle}${ouverte ? '' : ' etape--avenir'}${i < faites ? ' etape--faite' : ''}`}>
                <span className="etape__repere" aria-hidden="true"><Icone nom={i < faites ? 'coche' : e.icone} taille={20} /></span>
                <section className="etape__carte" aria-label={e.titre}>
                  <div className="lecon__tete">
                    <h2 className="etape__titre">{e.titre}</h2>
                    {ouverte && <BoutonVoix texte={lu[e.cle]!} label={`Écouter : ${e.titre}`} />}
                  </div>
                  {ouverte ? contenu(e) : <p className="muet">{e.annonce}</p>}
                  {ouverte && i === ouvertes - 1 && e.suite && (
                    <button type="button" className="hp-btn hp-btn--primary etape__suite" onClick={() => avancer(i)}>
                      {e.suite}
                    </button>
                  )}
                </section>
              </li>
            );
          })}
        </ol>

        {terminee && (
          <div className="lecon__fin">
            {jouable && <Link to={`/exercice/${c.id}`} className="hp-btn hp-btn--primary hp-btn--lg hp-btn--block">S’entrainer sur cette notion</Link>}
            <button type="button" className="hp-btn hp-btn--secondary hp-btn--block"
              onClick={() => etapesRef.current[0]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Relire la leçon</button>
          </div>
        )}
      </div>
    </main>
  );
}
