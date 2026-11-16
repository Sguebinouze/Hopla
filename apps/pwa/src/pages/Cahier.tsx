import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { DUREES, etatCahier, planCahier, QUESTIONS_PAR_NOTION } from '../lib/cahier';
import { api, type Cahier as CahierEnfant, type Enfant, type JourneeNotion } from '../lib/donnees';
import { chargerPack, competencesJouables, NOMS_MATIERES, sansMatieres, type Pack } from '../lib/packs';
import { aujourdhui } from '../lib/progression';

const joursDepuis = (debut: string, jour: string) => {
  const [a, m, j] = debut.split('-').map(Number) as [number, number, number];
  const [b, n, k] = jour.split('-').map(Number) as [number, number, number];
  return Math.round((Date.UTC(b, n - 1, k) - Date.UTC(a, m - 1, j)) / 86_400_000);
};

// Cahier de vacances : toute l'année en révision, une page par jour.
export function Cahier() {
  const naviguer = useNavigate();
  const [enfant, setEnfant] = useState<Enfant | null>(null);
  const [pack, setPack] = useState<Pack | null>(null);
  const [cahier, setCahier] = useState<CahierEnfant | null | undefined>(undefined);
  const [journees, setJournees] = useState<JourneeNotion[]>([]);
  const [arreter, setArreter] = useState(false);
  const [erreur, setErreur] = useState('');
  const jour = aujourdhui();

  useEffect(() => {
    void (async () => {
      try {
        const e = await api.enfantCourant();
        if (!e) return naviguer('/');
        setEnfant(e);
        setPack(sansMatieres(await chargerPack(e.classe), e.matieres_masquees));
        const c = await api.cahier();
        if (c) setJournees(await api.mesJournees(joursDepuis(c.debut, jour) + 1).catch(() => []));
        setCahier(c);
      } catch {
        naviguer('/accueil');
      }
    })();
  }, [naviguer, jour]);

  if (!enfant || !pack || cahier === undefined) return <main className="ecran" aria-busy="true" />;
  const notions = competencesJouables(pack);
  const titres = new Map(notions.map((c) => [c.id, c] as const));

  const entete = (
    <div className="ligne">
      <Link to="/accueil" className="hp-iconbtn" aria-label="Retour à l'accueil"><Icone nom="retour" /></Link>
      <h1 className="titre-2 pousse">Cahier de vacances</h1>
    </div>
  );

  if (!cahier) {
    const ouvrir = (jours: number) => {
      const c = { debut: jour, jours };
      api.ouvrirCahier(c).then(() => { setJournees([]); setCahier(c); }).catch((e: Error) => setErreur(e.message));
    };
    return (
      <main className="ecran">
        {entete}
        <section className="hp-card cahier__intro">
          <Octave taille={64} />
          <p style={{ margin: 0 }}>
            Toute ton année de {enfant.classe.toUpperCase()} en révision, une page par jour : une notion de français,
            une de maths et une d’une autre matière. Une série de {QUESTIONS_PAR_NOTION} questions par notion, et la page est faite.
          </p>
        </section>
        <h2 className="titre-3">Combien de pages ?</h2>
        <div className="cahier__durees">
          {DUREES.map((d) => (
            <button key={d.jours} type="button" className="hp-skill notion cahier__duree" onClick={() => ouvrir(d.jours)}>
              <span className="hp-skill__main">
                <span className="hp-skill__name">{d.nom}</span>
                <span className="hp-skill__where">{d.detail} · environ 15 minutes par jour</span>
              </span>
              <span className="hp-chip hp-chip--primary">Commencer</span>
            </button>
          ))}
        </div>
        {erreur && <p className="muet" role="alert">{erreur}</p>}
      </main>
    );
  }

  const plan = planCahier(notions, cahier.jours);
  const e = etatCahier(plan, cahier.debut, journees, jour);
  const page = plan[e.faites];

  return (
    <main className="ecran">
      {entete}
      <section className="hp-card cahier__avancement">
        <div className="ligne">
          <span className="pousse titre-3" style={{ margin: 0 }}>{e.fini ? 'Cahier terminé' : `Page ${e.faites + 1} sur ${cahier.jours}`}</span>
          <span className="hp-chip hp-chip--sun">{e.faites} / {cahier.jours}</span>
        </div>
        <ol className="cahier__tampons" aria-label="Pages du cahier">
          {plan.map((_, i) => (
            <li key={i} className={`cahier__tampon${i < e.faites ? ' cahier__tampon--fait' : ''}${i === e.faites && !e.fini ? ' cahier__tampon--courant' : ''}`}
              aria-label={`Page ${i + 1}${i < e.faites ? ', faite' : ''}`}>
              {i < e.faites ? <Icone nom="coche" taille={14} /> : i + 1}
            </li>
          ))}
        </ol>
      </section>

      {e.fini ? (
        <section className="hp-card cahier__intro">
          <Octave humeur="reussite" taille={72} />
          <p style={{ margin: 0 }}>Bravo {enfant.prenom}, tu as fini ton cahier ! Toute ton année est révisée.</p>
        </section>
      ) : e.pageDuJourFaite ? (
        <section className="hp-card cahier__intro">
          <Octave humeur="reussite" taille={64} />
          <p style={{ margin: 0 }}>Page du jour faite, bravo ! La suivante t’attend demain.</p>
        </section>
      ) : page && (
        <section className="liste-notions">
          <h2 className="titre-3">La page du jour</h2>
          {page.map((id) => {
            const c = titres.get(id);
            if (!c) return null;
            const faites = Math.min(QUESTIONS_PAR_NOTION, e.enCours[id] ?? 0);
            const ok = faites >= QUESTIONS_PAR_NOTION;
            return (
              <Link key={id} to={`/exercice/${id}?retour=/cahier`} className="hp-skill notion" aria-label={`${c.titre}${ok ? ', faite' : ''}`}>
                <span className="hp-skill__main">
                  <span className="hp-skill__name">{c.titre}</span>
                  <span className="hp-skill__where">{NOMS_MATIERES[c.matiere] ?? c.matiere}</span>
                </span>
                {ok
                  ? <span className="hp-chip hp-chip--success"><Icone nom="coche" taille={16} />Faite</span>
                  : <span className="hp-chip hp-chip--primary">{faites > 0 ? `${faites} / ${QUESTIONS_PAR_NOTION}` : 'S’entrainer'}</span>}
              </Link>
            );
          })}
        </section>
      )}

      <div className="pousse" />
      {!arreter ? (
        <button type="button" className="hp-btn hp-btn--ghost" onClick={() => setArreter(true)}>
          {e.fini ? 'Ranger le cahier' : 'Arrêter le cahier'}
        </button>
      ) : (
        <div className="ligne">
          <span className="muet pousse">{e.fini ? 'Ranger ce cahier ?' : 'Arrêter ? Les pages faites seront perdues.'}</span>
          <button type="button" className="hp-btn hp-btn--primary" onClick={() => {
            api.ouvrirCahier(null).then(() => { setCahier(null); setArreter(false); }).catch((x: Error) => setErreur(x.message));
          }}>Oui</button>
          <button type="button" className="hp-btn hp-btn--ghost" onClick={() => setArreter(false)}>Non</button>
        </div>
      )}
      {erreur && <p className="muet" role="alert">{erreur}</p>}
    </main>
  );
}
