import { ENTREE } from '../lib/routes';
import { groupeLu, nomsPropres } from '@hopla/redaction';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FinDuJour } from '../composants/FinDuJour';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { erreursAdmises, pointsParSorte, tempsEcriture, type ModeDictee, type VitesseDictee } from '../lib/dictee';
import { api, type Classe } from '../lib/donnees';
import { competenceDuPack, type DicteePack } from '../lib/packs';
import { tempsEcoule } from '../lib/temps';
import { aUneVoix, dire, reglerVitesse, taire } from '../lib/voix';

// La dictée s'écrit sur papier : Hopla la lit comme en classe, puis montre le texte pour se corriger.
type Etape = 'reglages' | 'lecture' | 'dictee' | 'relecture' | 'correction';
/** Mode classe : première lecture du morceau, temps d'écriture, seconde lecture, courte pause. */
type Phase = 'lecture1' | 'ecriture' | 'lecture2' | 'attente';

const PAUSE_ENTRE_MORCEAUX = 2500;
const NOMBRES_ERREURS = ['0', '1', '2', '3', '4', '5', '6 ou plus'];

// Dictées faites, par enfant : la suivante est la plus ancienne ou une jamais faite.
const cleFaites = (enfant: string) => `hopla.dictees.${enfant}`;
function faites(enfant: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(cleFaites(enfant)) ?? '[]') as string[];
  } catch {
    return [];
  }
}
function noterFaite(enfant: string, id: string) {
  try {
    localStorage.setItem(cleFaites(enfant), JSON.stringify([...faites(enfant).filter((x) => x !== id), id].slice(-50)));
  } catch {
    /* stockage indisponible : l'ordre repart du début */
  }
}

// Réglages retenus sur l'appareil.
const CLE_REGLAGES = 'hopla.dictee-reglages';
function reglagesRetenus(): { mode: ModeDictee; vitesse: VitesseDictee } {
  try {
    const r = JSON.parse(localStorage.getItem(CLE_REGLAGES) ?? '{}') as { mode?: ModeDictee; vitesse?: VitesseDictee };
    return { mode: r.mode === 'rythme' ? 'rythme' : 'classe', vitesse: r.vitesse === 'lente' ? 'lente' : 'normale' };
  } catch {
    return { mode: 'classe', vitesse: 'normale' };
  }
}

/** Une dictée se fait à l'oreille : seulement celles dont le texte et chaque morceau ont leur voix enregistrée. */
export const dicteeAudible = (d: DicteePack) => aUneVoix(d.texte) && d.groupes.every((g) => aUneVoix(groupeLu(g)));

export function dicteeSuivante(dictees: DicteePack[], deja: string[]): DicteePack | undefined {
  return dictees.find((d) => !deja.includes(d.id)) ?? [...dictees].sort((a, b) => deja.indexOf(a.id) - deja.indexOf(b.id))[0];
}

export function Dictee() {
  const { competence = '' } = useParams();
  const naviguer = useNavigate();
  const [dictee, setDictee] = useState<DicteePack | null>(null);
  const [enfant, setEnfant] = useState<{ id: string; classe: Classe } | null>(null);
  const [stop, setStop] = useState(0);
  const [{ mode, vitesse }, setReglages] = useState(reglagesRetenus);
  const [etape, setEtape] = useState<Etape>('reglages');
  const [rang, setRang] = useState(0);
  const [phase, setPhase] = useState<Phase>('lecture1');
  const [dureeEcriture, setDureeEcriture] = useState(0);
  const [enPause, setEnPause] = useState(false);
  const [luEnEntier, setLuEnEntier] = useState(false);
  const [erreurs, setErreurs] = useState<string | null>(null);
  const debut = useRef(Date.now());
  // Chaque lecture ou attente porte le numéro de la séquence en cours : une pause l'invalide.
  const jeton = useRef(0);
  const minuteur = useRef<number | undefined>(undefined);
  // « J'ai fini » pendant le temps d'écriture : seconde lecture tout de suite.
  const passerALaRelecture = useRef<() => void>(() => undefined);

  useEffect(() => {
    void (async () => {
      try {
        const e = await api.enfantCourant();
        if (!e) return naviguer(ENTREE);
        if (await tempsEcoule(e)) return setStop(e.minutes_par_jour ?? 0);
        const trouve = await competenceDuPack(e.classe, competence);
        const d = trouve && dicteeSuivante((trouve.competence.dictees ?? []).filter(dicteeAudible), faites(e.id));
        if (!d) return naviguer('/accueil');
        setEnfant({ id: e.id, classe: e.classe });
        setDictee(d);
      } catch {
        naviguer('/accueil');
      }
    })();
    return () => {
      jeton.current++;
      window.clearTimeout(minuteur.current);
      taire();
      reglerVitesse(1);
    };
  }, [competence, naviguer]);

  const arreter = useCallback(() => {
    jeton.current++;
    window.clearTimeout(minuteur.current);
    taire();
  }, []);

  /** Mode classe : un morceau lu, le temps de l'écrire, relu, puis le suivant. */
  const dicterMorceau = useCallback((i: number) => {
    if (!dictee || !enfant) return;
    arreter();
    const j = jeton.current;
    const g = dictee.groupes[i]!;
    const actif = () => j === jeton.current;
    const suivant = () => {
      if (!actif()) return;
      if (i + 1 < dictee.groupes.length) dicterMorceau(i + 1);
      else setEtape('relecture');
    };
    const relire = () => {
      if (!actif()) return;
      window.clearTimeout(minuteur.current);
      setPhase('lecture2');
      dire(groupeLu(g), () => {
        if (!actif()) return;
        setPhase('attente');
        minuteur.current = window.setTimeout(suivant, PAUSE_ENTRE_MORCEAUX);
      });
    };
    setRang(i);
    setEnPause(false);
    setPhase('lecture1');
    dire(groupeLu(g), () => {
      if (!actif()) return;
      const d = tempsEcriture(g, enfant.classe, vitesse);
      setDureeEcriture(d);
      setPhase('ecriture');
      minuteur.current = window.setTimeout(relire, d);
    });
    passerALaRelecture.current = relire;
  }, [dictee, enfant, vitesse, arreter]);

  const mettreEnPause = useCallback(() => {
    arreter();
    setEnPause(true);
  }, [arreter]);

  // Mode classe : l'appli quittée en cours de dictée se met en pause.
  useEffect(() => {
    if (etape !== 'dictee' || mode !== 'classe') return;
    const cache = () => { if (document.hidden) mettreEnPause(); };
    document.addEventListener('visibilitychange', cache);
    return () => document.removeEventListener('visibilitychange', cache);
  }, [etape, mode, mettreEnPause]);

  // Première lecture et relecture : le texte en entier.
  useEffect(() => {
    if (!dictee || (etape !== 'lecture' && etape !== 'relecture')) return;
    arreter();
    const j = jeton.current;
    setLuEnEntier(false);
    dire(dictee.texte, () => {
      if (j !== jeton.current) return;
      setLuEnEntier(true);
      // Comme en classe : après la première lecture, la dictée commence.
      if (etape === 'lecture' && mode === 'classe') minuteur.current = window.setTimeout(() => setEtape('dictee'), PAUSE_ENTRE_MORCEAUX);
    });
  }, [etape, dictee, mode, arreter]);

  // Dictée : mode classe enchainé, mode à son rythme un morceau à la fois.
  useEffect(() => {
    if (etape !== 'dictee' || !dictee) return;
    if (mode === 'classe') dicterMorceau(0);
    else { setRang(0); dire(groupeLu(dictee.groupes[0]!)); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etape]);

  if (stop) return <FinDuJour minutes={stop} />;
  if (!dictee || !enfant) return <main className="ecran" aria-busy="true" />;

  const groupes = dictee.groupes;
  const tableau = dictee.tableau ?? nomsPropres(dictee.texte);
  const admises = erreursAdmises(dictee.texte);

  const regler = (r: { mode?: ModeDictee; vitesse?: VitesseDictee }) => {
    const n = { mode, vitesse, ...r };
    setReglages(n);
    try {
      localStorage.setItem(CLE_REGLAGES, JSON.stringify(n));
    } catch {
      /* réglages pour cette dictée seulement */
    }
  };

  const commencer = () => {
    reglerVitesse(vitesse === 'lente' ? 0.85 : 1);
    debut.current = Date.now();
    setEtape('lecture');
  };

  const morceauSuivant = () => {
    if (rang + 1 < groupes.length) {
      setRang(rang + 1);
      dire(groupeLu(groupes[rang + 1]!));
    } else {
      setEtape('relecture');
    }
  };

  const corriger = () => {
    arreter();
    setEtape('correction');
  };

  const noter = async (n: string) => {
    setErreurs(n);
    noterFaite(enfant.id, dictee.id);
    const nombre = n === '6 ou plus' ? 6 : Number(n);
    try {
      await api.enregistrer({
        competence, contenu: dictee.id, reussi: nombre <= admises, indice: mode === 'rythme', dureeMs: Date.now() - debut.current,
        // Le nombre d'erreurs que l'enfant a compté sur sa feuille : rien de ce qu'il a écrit.
        reponse: n === '6 ou plus' ? '6+' : n,
      });
    } catch {
      /* hors connexion : le résultat n'est pas enregistré */
    }
  };

  const recommencer = () => {
    arreter();
    setErreurs(null);
    setRang(0);
    setEtape('reglages');
  };

  const reussie = erreurs !== null && (erreurs === '6 ou plus' ? 6 : Number(erreurs)) <= admises;

  return (
    <main className="ecran ecran--large dictee">
      <div className="ligne">
        <Link to="/accueil" className="hp-iconbtn" aria-label="Quitter la dictée" onClick={arreter}><Icone nom="fermer" /></Link>
        {etape === 'dictee' ? (
          <ol className="serie pousse" aria-label={`Morceau ${rang + 1} sur ${groupes.length}`}>
            {groupes.map((_, i) => <li key={i} className={`serie__case${i < rang ? ' serie__case--juste' : i === rang ? ' serie__case--courante' : ''}`} />)}
          </ol>
        ) : <span className="pousse" />}
        {etape === 'dictee' && <span className="muet">{rang + 1} / {groupes.length}</span>}
      </div>

      {/* Ce que le maitre écrit au tableau : le titre et les noms propres. */}
      {etape !== 'correction' && (
        <div className="hp-card dictee__tableau">
          <span className="muet">Au tableau</span>
          <h1 className="titre-2">{dictee.titre}</h1>
          {tableau.length > 0 && <p className="dictee__noms">{tableau.join(' · ')}</p>}
        </div>
      )}

      {etape === 'reglages' && (
        <div className="dictee__bloc">
          <div className="hp-bubble" style={{ maxWidth: 'none' }}>
            <Octave humeur="accueil" taille={56} />
            <p className="hp-bubble__text" style={{ margin: 0 }}>
              Prends une feuille et un crayon. Recopie le titre. Je lis le texte une fois en entier, puis je te le dicte
              morceau par morceau, avec la ponctuation.
            </p>
          </div>
          <fieldset className="dictee__reglage">
            <legend>Comment je dicte</legend>
            <div className="dictee__choix">
              <button type="button" className={`hp-option option-texte${mode === 'classe' ? ' hp-option--selected' : ''}`} aria-pressed={mode === 'classe'}
                onClick={() => regler({ mode: 'classe' })}>
                <strong>Comme en classe</strong>
                <span className="muet">Chaque morceau lu deux fois, le temps d’écrire entre les deux. Pas de retour en arrière.</span>
              </button>
              <button type="button" className={`hp-option option-texte${mode === 'rythme' ? ' hp-option--selected' : ''}`} aria-pressed={mode === 'rythme'}
                onClick={() => regler({ mode: 'rythme' })}>
                <strong>À mon rythme</strong>
                <span className="muet">Tu réécoutes autant que tu veux et tu passes au morceau suivant quand tu as fini.</span>
              </button>
            </div>
          </fieldset>
          <fieldset className="dictee__reglage">
            <legend>Vitesse de lecture</legend>
            <div className="ligne">
              {(['normale', 'lente'] as const).map((v) => (
                <button key={v} type="button" className={`hp-chip ${vitesse === v ? 'hp-chip--primary' : 'hp-chip--neutral'}`} aria-pressed={vitesse === v}
                  onClick={() => regler({ vitesse: v })}>{v === 'normale' ? 'Normale' : 'Lente'}</button>
              ))}
            </div>
          </fieldset>
          <button type="button" className="hp-btn hp-btn--primary hp-btn--lg hp-btn--block" onClick={commencer}>Je suis prêt</button>
        </div>
      )}

      {etape === 'lecture' && (
        <div className="dictee__bloc">
          <div className="hp-bubble" style={{ maxWidth: 'none' }}>
            <Octave humeur="accueil" taille={56} />
            <p className="hp-bubble__text" style={{ margin: 0 }}>
              {luEnEntier && mode === 'classe' ? 'On commence. Écris le premier morceau.' : 'Écoute le texte en entier. N’écris pas encore.'}
            </p>
          </div>
          {mode === 'rythme' && (
            <div className="dictee__actions">
              <button type="button" className="hp-btn hp-btn--secondary hp-btn--lg" onClick={() => dire(dictee.texte)}>
                <Icone nom="haut-parleur" />Réécouter le texte
              </button>
              <button type="button" className="hp-btn hp-btn--primary hp-btn--lg" onClick={() => { arreter(); setEtape('dictee'); }}>Commencer la dictée</button>
            </div>
          )}
        </div>
      )}

      {etape === 'dictee' && mode === 'classe' && (
        <div className="dictee__bloc">
          <div className="dictee__etat" role="status">
            {enPause ? 'En pause.' : phase === 'lecture1' ? 'Écoute.' : phase === 'ecriture' ? 'Écris.' : phase === 'lecture2' ? 'Écoute encore et vérifie.' : 'Morceau suivant…'}
          </div>
          {phase === 'ecriture' && !enPause && (
            <div className="dictee__temps" aria-hidden="true"><span key={rang} style={{ animationDuration: `${dureeEcriture}ms` }} /></div>
          )}
          <div className="dictee__actions">
            {enPause ? (
              <button type="button" className="hp-btn hp-btn--primary hp-btn--lg" onClick={() => dicterMorceau(rang)}>
                <Icone nom="lecture" />Reprendre ce morceau
              </button>
            ) : (
              <>
                <button type="button" className="hp-btn hp-btn--secondary hp-btn--lg" onClick={mettreEnPause}><Icone nom="pause" />Pause</button>
                {phase === 'ecriture' && (
                  <button type="button" className="hp-btn hp-btn--primary hp-btn--lg" onClick={() => passerALaRelecture.current()}>J’ai fini</button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {etape === 'dictee' && mode === 'rythme' && (
        <div className="dictee__bloc">
          <div className="dictee__etat" role="status">Écris ce morceau.</div>
          <div className="dictee__actions">
            <button type="button" className="hp-btn hp-btn--secondary hp-btn--lg" onClick={() => dire(groupeLu(groupes[rang]!))}>
              <Icone nom="haut-parleur" />Réécouter
            </button>
            <button type="button" className="hp-btn hp-btn--primary hp-btn--lg" onClick={morceauSuivant}>
              {rang + 1 < groupes.length ? 'Morceau suivant' : 'J’ai tout écrit'}
            </button>
          </div>
        </div>
      )}

      {etape === 'relecture' && (
        <div className="dictee__bloc">
          <div className="hp-bubble" style={{ maxWidth: 'none' }}>
            <Octave humeur="accueil" taille={56} />
            <p className="hp-bubble__text" style={{ margin: 0 }}>
              {luEnEntier
                ? 'Relis-toi seul : les accords, les accents, les majuscules, les points.'
                : 'Je relis le texte en entier. Suis sur ta feuille et corrige ce qui manque.'}
            </p>
          </div>
          <div className="dictee__actions">
            {mode === 'rythme' && (
              <button type="button" className="hp-btn hp-btn--secondary hp-btn--lg" onClick={() => dire(dictee.texte)}>
                <Icone nom="haut-parleur" />Réécouter le texte
              </button>
            )}
            {(luEnEntier || mode === 'rythme') && (
              <button type="button" className="hp-btn hp-btn--primary hp-btn--lg" onClick={corriger}>J’ai fini, je corrige</button>
            )}
          </div>
        </div>
      )}

      {etape === 'correction' && (
        <div className="dictee__bloc">
          <div className="hp-bubble" style={{ maxWidth: 'none' }}>
            <Octave humeur="reflechit" taille={56} />
            <p className="hp-bubble__text" style={{ margin: 0 }}>
              Compare mot à mot avec ta feuille. Souligne chaque erreur, puis compte-les.
            </p>
          </div>
          <article className="dictee__texte">
            <h2 className="titre-3">{dictee.titre}</h2>
            <p>{dictee.texte}</p>
          </article>
          {(dictee.points?.length ?? 0) > 0 && (
            <div className="hp-card dictee__points">
              <h3 className="titre-3">Regarde bien</h3>
              <dl>
                {pointsParSorte(dictee.points!).map((p) => (
                  <div key={p.sorte}><dt>{p.sorte}</dt><dd>{p.mots.join(' · ')}</dd></div>
                ))}
              </dl>
            </div>
          )}
          {dictee.source !== 'Hopla' && (
            <p className="dictee__source muet">
              {dictee.credit?.startsWith(dictee.source) ? <>Texte : {dictee.credit}.</>
                : <>Texte : {dictee.source}.{dictee.credit && <> D’après {dictee.credit}.</>}</>}
            </p>
          )}

          {erreurs === null ? (
            <fieldset className="dictee__reglage">
              <legend>Combien d’erreurs as-tu trouvées ?</legend>
              <div className="dictee__compte">
                {NOMBRES_ERREURS.map((n) => (
                  <button key={n} type="button" className="hp-option" onClick={() => void noter(n)}>{n}</button>
                ))}
              </div>
            </fieldset>
          ) : (
            <>
              <div className={`hp-feedback ${reussie ? 'hp-feedback--success' : 'hp-feedback--attention'}`} style={{ maxWidth: 'none' }} role="status">
                <Octave humeur={reussie ? 'reussite' : 'oups'} taille={56} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span className="hp-feedback__title">{reussie ? 'Dictée réussie.' : 'Dictée à refaire.'}</span>
                  <span className="hp-feedback__text">
                    {admises} erreur{admises > 1 ? 's' : ''} au plus pour ce texte. {reussie ? '' : 'Recopie les mots mal écrits, puis refais-la dans quelques jours.'}
                  </span>
                </div>
              </div>
              <div className="dictee__actions">
                <button type="button" className="hp-btn hp-btn--secondary hp-btn--lg" onClick={recommencer}>Recommencer</button>
                <Link to="/accueil" className="hp-btn hp-btn--primary hp-btn--lg">Terminer</Link>
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}
