import { etatCahier, planCahier } from '../lib/cahier';
import { DefiFamille } from '../composants/DefiFamille';
import { EtatReseau } from '../composants/EtatReseau';
import { XP_PAR_NIVEAU } from '../lib/apparence';
import { BoutonTheme } from '../composants/BoutonTheme';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '../composants/Avatar';
import { Icone, ICONE_MATIERE } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { api, surAppareilEnfant, type Enfant } from '../lib/donnees';
import { lectureAuto, reglerLectureAuto, voixDisponible } from '../lib/voix';
import { chargerPack, competencesJouables, missionDuJour, NOMS_MATIERES, sansMatieres, type Pack } from '../lib/packs';
import { aujourdhui, bilan, etat, type Suivi } from '../lib/progression';
import { dateLisible } from '../lib/entrainement';
import { missionFaite } from '../jeux/regles';
import type { Cahier, ControlePrevu } from '../lib/donnees';

const COULEUR_MATIERE: Record<string, string> = {
  francais: 'hp-subj-francais', mathematiques: 'hp-subj-maths', 'questionner-le-monde': 'hp-subj-histgeo',
  'histoire-geographie': 'hp-subj-histgeo', 'sciences-technologie': 'hp-subj-sciences', svt: 'hp-subj-sciences',
  'physique-chimie': 'hp-subj-physique', technologie: 'hp-subj-techno', 'langues-vivantes': 'hp-subj-langues', allemand: 'hp-subj-langues', espagnol: 'hp-subj-langues', emc: 'hp-subj-emc',
};

export function Accueil() {
  const naviguer = useNavigate();
  const [enfant, setEnfant] = useState<Enfant | null>(null);
  const [pack, setPack] = useState<Pack | null>(null);
  const [erreur, setErreur] = useState('');
  const [voixAuto, setVoixAuto] = useState<boolean | null>(null);
  const [suivi, setSuivi] = useState<Record<string, Suivi>>({});
  const [prevu, setPrevu] = useState<ControlePrevu | null>(null);
  const [minutes, setMinutes] = useState(0);
  const [mesRecords, setMesRecords] = useState<Record<string, number>>({});
  const [cahier, setCahier] = useState<Cahier | null>(null);
  const [cahierFaites, setCahierFaites] = useState(0);
  const [missionOk, setMissionOk] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const e = await api.enfantCourant();
        if (!e) return naviguer('/');
        setEnfant(e);
        const p = sansMatieres(await chargerPack(e.classe), e.matieres_masquees);
        setPack(p);
        if (e.minutes_par_jour) setMinutes(await api.minutesAujourdhui().catch(() => 0));
        setVoixAuto(lectureAuto(p.cycle));
        // Sans réseau, l'accueil reste utilisable : la progression s'affiche à 0.
        setSuivi(await api.progression().catch(() => ({})));
        setPrevu(await api.controle().catch(() => null));
        setMesRecords(await api.records().catch(() => ({})));
        const jourJ = aujourdhui();
        setMissionOk(missionFaite((await api.mesJournees(1).catch(() => [])).filter((j) => j.jour === jourJ), competencesJouables(p).length));
        const c = await api.cahier().catch(() => null);
        if (c) {
          const jour = aujourdhui();
          const depuis = Math.round((Date.parse(jour) - Date.parse(c.debut)) / 86_400_000) + 1;
          const journees = await api.mesJournees(depuis).catch(() => []);
          setCahierFaites(etatCahier(planCahier(competencesJouables(p), c.jours), c.debut, journees, jour).faites);
        }
        setCahier(c);
      } catch (err) {
        setErreur((err as Error).message || 'Erreur de chargement.');
      }
    })();
  }, [naviguer]);

  if (!enfant) {
    return (
      <main className="ecran" aria-busy={!erreur}>
        {erreur && (
          <>
            <p className="erreur" role="alert">{erreur}</p>
            <button className="hp-btn hp-btn--secondary" onClick={async () => { await api.fermerSession(); naviguer('/'); }}>
              Revenir au choix du profil
            </button>
          </>
        )}
      </main>
    );
  }
  const niveau = Math.floor(enfant.xp / XP_PAR_NIVEAU) + 1;
  const dansNiveau = enfant.xp % XP_PAR_NIVEAU;
  const mission = pack ? missionDuJour(pack, suivi, new Date(), prevu?.notions) : [];
  const masquees = enfant.matieres_masquees ?? [];
  const jeuxActifs = !masquees.includes('jeux');
  const cultureActive = !masquees.includes('culture') && (pack?.culture?.length ?? 0) > 0;

  return (
    <main className="ecran">
      <div className="ligne">
        <Link to="/profil" className="accueil__avatar" aria-label="Mon profil : avatar, Octave et collection">
          <Avatar teinte={enfant.avatar} taille={44} />
        </Link>
        <div className="pousse">
          <h1 className="titre-2">Salut {enfant.prenom}</h1>
          <p className="muet">{enfant.classe.toUpperCase()} · ta session</p>
        </div>
        <span className="hp-chip hp-chip--streak"><Icone nom="flamme" />{enfant.serie}</span>
        <BoutonTheme />
      </div>

      <div className="hp-level" style={{ minWidth: 0 }}>
        <div className="hp-level__head"><span className="hp-level__title">Niveau {niveau}</span><span className="hp-level__meta">{dansNiveau} / {XP_PAR_NIVEAU} XP</span></div>
        <div className="hp-progress" role="progressbar" aria-valuenow={dansNiveau} aria-valuemin={0} aria-valuemax={XP_PAR_NIVEAU}>
          <span style={{ width: `${(dansNiveau / XP_PAR_NIVEAU) * 100}%` }} />
        </div>
      </div>

      <EtatReseau />
      {erreur && <p className="erreur">{erreur}</p>}

      {enfant.minutes_par_jour ? (
        <div className="temps-jour" role="status">
          <span className="muet pousse">
            {minutes >= enfant.minutes_par_jour
              ? 'Temps prévu atteint pour aujourd’hui : bravo, on reprend demain !'
              : `Aujourd’hui : ${Math.round(minutes)} min sur ${enfant.minutes_par_jour}`}
          </span>
          <div className="hp-progress hp-progress--sm" aria-hidden="true">
            <span style={{ width: `${Math.min(100, (minutes / enfant.minutes_par_jour) * 100)}%` }} />
          </div>
        </div>
      ) : null}
      <div className="accueil-haut">
      <section className="hp-mission" style={{ width: 'auto' }}>
        <div className="ligne">
          <Octave taille={46} />
          <span className="hp-mission__title pousse">Mission du jour</span>
        </div>
        {mission.length === 0 && <p style={{ margin: 0 }}>Pas encore d'exercice pour ta classe.</p>}
        {mission.map((c, i) => (
          <Link key={c.id} to={`/exercice/${c.id}`}
            className={`hp-mission__item${i === 0 ? ' hp-mission__item--current' : ''}`}>
            <span className="hp-check" />
            <span className="pousse">{NOMS_MATIERES[c.matiere]} · {c.titre}</span>
            {etat(suivi[c.id]) === 'a-revoir' && <span className="hp-chip hp-chip--attention">À revoir</span>}
          </Link>
        ))}
        {mission[0] && (
          <Link to={`/exercice/${mission[0].id}`} className="hp-btn hp-btn--reward hp-btn--block">Commencer</Link>
        )}
      </section>

      <div className="accueil-cote">
      <DefiFamille />

      {pack && (jeuxActifs || cultureActive) && (
        <section className="hp-card jeux-accueil">
          <div className="ligne">
            <Icone nom="coupe" />
            <h2 className="titre-2 pousse">Jeux et quiz</h2>
            {!missionOk && <span className="hp-chip hp-chip--neutral"><Icone nom="cadenas" taille={14} />Après la mission</span>}
          </div>
          {missionOk ? (
            <div className="jeux-accueil__liens">
              {cultureActive && <Link to="/culture" className="hp-btn hp-btn--reward">Quiz du jour</Link>}
              {jeuxActifs && <Link to="/jeux" className="hp-btn hp-btn--secondary">Jeux</Link>}
            </div>
          ) : (
            <p className="muet">Termine ta mission du jour pour ouvrir {cultureActive ? 'le quiz de culture générale et ' : ''}les jeux de réflexion.</p>
          )}
        </section>
      )}
      </div>
      </div>

      {pack && (
        <>
          <h2 className="titre-2">Mes matières</h2>
          <div className="grille-matieres">
            {pack.matieres.filter((m) => competencesJouables({ ...pack, matieres: [m] }).length > 0).map((m) => {
              const b = bilan(competencesJouables({ ...pack, matieres: [m] }).map((c) => c.id), suivi);
              return (
                <Link key={m.matiere} to={`/matiere/${m.matiere}`} className={`hp-subject ${COULEUR_MATIERE[m.matiere] ?? ''}`}>
                  <span className="hp-subject__icon"><Icone nom={ICONE_MATIERE[m.matiere] ?? 'eclair'} /></span>
                  <span className="hp-subject__name">{NOMS_MATIERES[m.matiere] ?? m.matiere}</span>
                  <span className="hp-subject__meta">
                    {b.total > 0 ? `${b.acquises} / ${b.total} acquise${b.acquises > 1 ? 's' : ''}` : `${m.competences.length} notion${m.competences.length > 1 ? 's' : ''}`}
                  </span>
                  <div className="hp-progress hp-progress--sm" role="progressbar" aria-label="Notions acquises"
                    aria-valuenow={b.acquises} aria-valuemin={0} aria-valuemax={b.total}>
                    <span style={{ width: `${b.part * 100}%` }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}

      {pack && pack.defis.length > 0 && (
        <section className="liste-notions liste-defis">
          <h2 className="titre-2">Défis chrono</h2>
          {pack.defis.map((d) => (
            <Link key={d.id} to={`/defi/${d.id}`} className="hp-skill notion">
              <span className="hp-skill__main">
                <span className="hp-skill__name">{d.titre}</span>
                <span className="hp-skill__where">
                  Record : {mesRecords[d.id] ?? 0}{d.objectif !== null ? ` · objectif de fin d’année : ${d.objectif} en 1 min` : ''}
                </span>
              </span>
              <span className="hp-chip hp-chip--sun"><Icone nom="eclair" taille={16} />1 min</span>
            </Link>
          ))}
        </section>
      )}

      <div className="raccourcis">
      <Link to="/controle" className="hp-skill notion">
        <span className="hp-skill__main">
          <span className="hp-skill__name">{prevu ? `Contrôle ${dateLisible(prevu.date)}` : 'Un contrôle bientôt ?'}</span>
          <span className="hp-skill__where">
            {prevu ? `${prevu.notions.length} notion${prevu.notions.length > 1 ? 's' : ''} à préparer, chaque jour dans ta mission` : 'Choisis les notions, Octave t’aide à réviser.'}
          </span>
        </span>
        <span className="hp-chip hp-chip--primary">{prevu ? 'Voir' : 'Préparer'}</span>
      </Link>

      <Link to="/photo" className="hp-skill notion">
        <span className="hp-skill__main">
          <span className="hp-skill__name">Photo de leçon</span>
          <span className="hp-skill__where">Prends ta leçon du cahier en photo, Octave t’entraine dessus.</span>
        </span>
        <span className="hp-chip hp-chip--primary"><Icone nom="appareil" taille={16} />Photo</span>
      </Link>

      <Link to="/cahier" className="hp-skill notion">
        <span className="hp-skill__main">
          <span className="hp-skill__name">Cahier de vacances</span>
          <span className="hp-skill__where">{cahier ? `Page ${Math.min(cahier.jours, cahierFaites + 1)} sur ${cahier.jours}` : 'Toute ton année en révision, une page par jour.'}</span>
        </span>
        <span className="hp-chip hp-chip--sun"><Icone nom="cahier" taille={16} />{cahier ? 'Continuer' : 'Ouvrir'}</span>
      </Link>
      </div>

      <div className="pousse" />
      {voixDisponible() && voixAuto !== null && (
        <label className="reglage">
          <input type="checkbox" id="voix-auto" checked={voixAuto}
            onChange={(e) => { reglerLectureAuto(e.target.checked); setVoixAuto(e.target.checked); }} />
          Octave lit les consignes à voix haute
        </label>
      )}
      {!surAppareilEnfant() && (
        <button className="hp-btn hp-btn--ghost" onClick={async () => { await api.fermerSession(); naviguer('/'); }}>
          <Icone nom="cadenas" />Quitter ma session
        </button>
      )}
    </main>
  );
}
