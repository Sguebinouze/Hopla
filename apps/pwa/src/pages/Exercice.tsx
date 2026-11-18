import { normaliserReponse, type Item } from '@hopla/generateurs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BoutonVoix } from '../composants/BoutonVoix';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { Visuel } from '../composants/Visuel';
import { api } from '../lib/donnees';
import { tempsEcoule } from '../lib/temps';
import { FinDuJour } from '../composants/FinDuJour';
import { chargerPack, competencesJouables, noterRecentes, questionsRecentes, seriePour, supportDe, type ItemPack } from '../lib/packs';
import { dire, lectureAuto, taire, voixPour } from '../lib/voix';

const TAILLE_SERIE = 5;

export function Exercice() {
  const { competence = '' } = useParams();
  const naviguer = useNavigate();
  const [items, setItems] = useState<ItemPack[]>([]);
  const [rang, setRang] = useState(0);
  const [choix, setChoix] = useState<string | null>(null);
  const [saisie, setSaisie] = useState('');
  const [indice, setIndice] = useState(false);
  const [justes, setJustes] = useState(0);
  const [bilans, setBilans] = useState<boolean[]>([]);
  const [aLecon, setALecon] = useState(false);
  const [cycle, setCycle] = useState(3);
  const debut = useRef(Date.now());
  const [stop, setStop] = useState(0);

  useEffect(() => {
    void (async () => {
      try {
        const enfant = await api.enfantCourant();
        if (!enfant) return naviguer('/');
        if (await tempsEcoule(enfant)) return setStop(enfant.minutes_par_jour ?? 0);
        const pack = await chargerPack(enfant.classe);
        const c = competencesJouables(pack).find((x) => x.id === competence);
        if (!c) return naviguer('/accueil');
        setALecon(c.lecon !== null && c.lecon !== undefined);
        setCycle(pack.cycle);
        const serieDuJour = seriePour(c, TAILLE_SERIE, questionsRecentes(enfant.id, c.id));
        noterRecentes(enfant.id, c.id, serieDuJour);
        setItems(serieDuJour);
      } catch {
        naviguer('/accueil');
      }
    })();
  }, [competence, naviguer]);

  const item = items[rang];
  // Un texte à lire en tête de consigne s'affiche à part, la question en dessous.
  const support = item ? supportDe(item.consigne) : null;
  const question = item && support ? item.consigne.slice(item.consigne.indexOf('»') + 1).trim() : '';

  // Au cycle 2, Octave lit chaque consigne (réglable) : un enfant de CP ne lit pas encore seul.
  // Langue vivante : la phrase à comprendre est dite en anglais, après la consigne si elle est lue.
  useEffect(() => {
    if (!item) return;
    const auto = lectureAuto(cycle);
    if (auto) dire(item.consigne);
    if (item.ecoute) dire(item.ecoute.texte, undefined, item.ecoute.langue, auto);
    return () => taire();
  }, [item, cycle]);
  const repondu = choix !== null;
  const juste = useMemo(() => item !== undefined && choix !== null && choix === item.reponse, [item, choix]);

  if (stop) return <FinDuJour minutes={stop} />;
  if (!item) return <main className="ecran" aria-busy="true" />;

  const valider = async (reponse: string) => {
    if (repondu) return;
    const r = item.gabarit === 'saisie' ? normaliserReponse(reponse) : reponse;
    setChoix(r);
    const ok = r === item.reponse;
    if (ok) setJustes((n) => n + 1);
    setBilans((b) => [...b, ok]);
    try {
      await api.enregistrer({
        competence: item.competence, contenu: item.id, reussi: ok, indice, dureeMs: Date.now() - debut.current,
        // Seulement une option du contenu ou un nombre : jamais de texte libre de l'enfant.
        reponse: item.gabarit === 'qcm' || /^[0-9 ,./-]{1,20}$/.test(r) ? r : undefined,
        erreur: ok ? undefined : item.erreurs?.[r],
      });
    } catch {
      /* hors connexion : la synchronisation différée viendra dans une prochaine étape */
    }
  };

  const suivant = () => {
    if (rang + 1 >= items.length) {
      naviguer('/resultat', { state: { justes: justes, total: items.length, retour: retourSur(location.search) } });
      return;
    }
    setRang(rang + 1);
    setChoix(null);
    setSaisie('');
    setIndice(false);
    debut.current = Date.now();
  };

  // Options rédigées (formes verbales, classes de mots) : plus de place, police plus petite.
  const optionsLongues = (item.options ?? []).some((o) => o.length > 9);

  const classeOption = (o: string) => {
    if (!repondu) return 'hp-option';
    if (o === item.reponse) return 'hp-option hp-option--correct';
    if (o === choix) return 'hp-option hp-option--wrong';
    return 'hp-option';
  };

  return (
    <main className="ecran ecran--large ecran--exercice">
      <div className="ligne">
        <Link to="/accueil" className="hp-iconbtn" aria-label="Quitter l'exercice"><Icone nom="fermer" /></Link>
        {/* Une case par question : verte si juste, orange sinon, la question en cours mise en avant. */}
        <ol className="serie pousse" aria-label={`Question ${rang + 1} sur ${items.length}`}>
          {items.map((_, i) => (
            <li key={i} className={`serie__case${i in bilans ? (bilans[i] ? ' serie__case--juste' : ' serie__case--faux') : i === rang ? ' serie__case--courante' : ''}`} />
          ))}
        </ol>
        <span className="muet">{rang + 1} / {items.length}</span>
      </div>

      <div className="exercice" key={rang}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {support ? (
            <>
              <div className="support">
                <p className="support__texte pousse">{support}</p>
                <BoutonVoix texte={item.consigne} label="Écouter le texte et la question" />
              </div>
              <h1 className="titre-1">{question}</h1>
            </>
          ) : (
            <div className="consigne">
              <h1 className="titre-1 pousse">{item.consigne}</h1>
              <BoutonVoix texte={item.consigne} label="Écouter la consigne" />
            </div>
          )}
          {item.ecoute && (
            <div className="ecoute">
              {voixPour(item.ecoute.langue) ? (
                <button type="button" className="hp-btn hp-btn--secondary hp-btn--lg"
                  onClick={() => dire(item.ecoute!.texte, undefined, item.ecoute!.langue)}>
                  <Icone nom="haut-parleur" />Écouter Octave
                </button>
              ) : (
                <p className="ecoute__texte" lang={item.ecoute.langue}>« {item.ecoute.texte} »</p>
              )}
              {repondu && voixPour(item.ecoute.langue) && <p className="ecoute__texte" lang={item.ecoute.langue}>« {item.ecoute.texte} »</p>}
            </div>
          )}
          {item.visuel && <div className="visuel"><Visuel visuel={item.visuel} revele={repondu} /></div>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {item.gabarit === 'qcm' && item.options && (
            <div className={`grille-options${optionsLongues ? ' grille-options--texte' : ''}`}>
              {item.options.map((o) => (
                <button key={o} className={`${classeOption(o)}${optionsLongues ? ' option-texte' : ''}`} onClick={() => void valider(o)} disabled={repondu && o !== choix && o !== item.reponse}>
                  {o}
                </button>
              ))}
            </div>
          )}
          {item.gabarit === 'saisie' && (
            <form className="ligne" onSubmit={(e) => { e.preventDefault(); void valider(saisie); }}>
              <label className="pousse">
                <span className="muet">Ta réponse</span>
                <input className="saisie" inputMode="decimal" autoComplete="off" value={saisie}
                  onChange={(e) => setSaisie(e.target.value)} disabled={repondu} />
              </label>
              {!repondu && <button className="hp-btn hp-btn--primary hp-btn--lg" disabled={!saisie.trim()}>Vérifier</button>}
            </form>
          )}

          {!repondu && (
            <div className={`hp-bubble${indice ? ' hp-bubble--hint' : ''}`} style={{ maxWidth: 'none' }}>
              <Octave humeur="reflechit" taille={56} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="consigne">
                  <p className="hp-bubble__text pousse" style={{ margin: 0 }}>{indice ? `Indice : ${item.indice}` : 'Tu peux demander un indice.'}</p>
                  {indice && <BoutonVoix texte={item.indice} label="Écouter l’indice" />}
                </div>
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
                {!juste && aLecon && <Link to={`/lecon/${competence}`} className="lien-lecon">Revoir la leçon</Link>}
              </div>
              {!juste && <BoutonVoix texte={item.explication} label="Écouter l’explication" />}
            </div>
          )}

          {repondu && <button className="hp-btn hp-btn--primary hp-btn--lg hp-btn--block" onClick={suivant} autoFocus>Continuer</button>}
        </div>
      </div>
    </main>
  );
}

/** Page où revenir après la série (`?retour=/cahier`), limitée aux pages de l'app. */
export function retourSur(recherche: string): string | null {
  const r = new URLSearchParams(recherche).get('retour');
  return r && /^\/[a-z]+$/.test(r) ? r : null;
}
