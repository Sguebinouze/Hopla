import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '../composants/Avatar';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { api, type Enfant } from '../lib/donnees';
import { lectureAuto, reglerLectureAuto, voixDisponible } from '../lib/voix';
import { chargerPack, missionDuJour, NOMS_MATIERES, type Pack } from '../lib/packs';

const XP_PAR_NIVEAU = 200;
const COULEUR_MATIERE: Record<string, string> = {
  francais: 'hp-subj-francais', mathematiques: 'hp-subj-maths', 'questionner-le-monde': 'hp-subj-histgeo',
  'histoire-geographie': 'hp-subj-histgeo', 'sciences-technologie': 'hp-subj-sciences', svt: 'hp-subj-sciences',
  'physique-chimie': 'hp-subj-physique', technologie: 'hp-subj-techno', 'langues-vivantes': 'hp-subj-langues', emc: 'hp-subj-emc',
};

export function Accueil() {
  const naviguer = useNavigate();
  const [enfant, setEnfant] = useState<Enfant | null>(null);
  const [pack, setPack] = useState<Pack | null>(null);
  const [erreur, setErreur] = useState('');
  const [voixAuto, setVoixAuto] = useState<boolean | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const e = await api.enfantCourant();
        if (!e) return naviguer('/');
        setEnfant(e);
        const p = await chargerPack(e.classe);
        setPack(p);
        setVoixAuto(lectureAuto(p.cycle));
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
  const mission = pack ? missionDuJour(pack) : [];

  return (
    <main className="ecran">
      <div className="ligne">
        <Avatar teinte={enfant.avatar} taille={44} />
        <div className="pousse">
          <h1 className="titre-2">Salut {enfant.prenom}</h1>
          <p className="muet">{enfant.classe.toUpperCase()} · ta session</p>
        </div>
        <span className="hp-chip hp-chip--streak"><Icone nom="flamme" />{enfant.serie}</span>
      </div>

      <div className="hp-level" style={{ minWidth: 0 }}>
        <div className="hp-level__head"><span className="hp-level__title">Niveau {niveau}</span><span className="hp-level__meta">{dansNiveau} / {XP_PAR_NIVEAU} XP</span></div>
        <div className="hp-progress" role="progressbar" aria-valuenow={dansNiveau} aria-valuemin={0} aria-valuemax={XP_PAR_NIVEAU}>
          <span style={{ width: `${(dansNiveau / XP_PAR_NIVEAU) * 100}%` }} />
        </div>
      </div>

      {erreur && <p className="erreur">{erreur}</p>}

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
          </Link>
        ))}
        {mission[0] && (
          <Link to={`/exercice/${mission[0].id}`} className="hp-btn hp-btn--reward hp-btn--block">Commencer</Link>
        )}
      </section>

      {pack && (
        <>
          <h2 className="titre-2">Mes matières</h2>
          <div className="grille-matieres">
            {pack.matieres.filter((m) => m.competences.length > 0).map((m) => (
              <Link key={m.matiere} to={`/matiere/${m.matiere}`} className={`hp-subject ${COULEUR_MATIERE[m.matiere] ?? ''}`}>
                <span className="hp-subject__icon"><Icone nom="eclair" /></span>
                <span className="hp-subject__name">{NOMS_MATIERES[m.matiere] ?? m.matiere}</span>
                <span className="hp-subject__meta">{m.competences.length} notion{m.competences.length > 1 ? 's' : ''}</span>
                <div className="hp-progress hp-progress--sm"><span style={{ width: '0%' }} /></div>
              </Link>
            ))}
          </div>
        </>
      )}

      <div className="pousse" />
      {voixDisponible() && voixAuto !== null && (
        <label className="reglage">
          <input type="checkbox" id="voix-auto" checked={voixAuto}
            onChange={(e) => { reglerLectureAuto(e.target.checked); setVoixAuto(e.target.checked); }} />
          Octave lit les consignes à voix haute
        </label>
      )}
      <button className="hp-btn hp-btn--ghost" onClick={async () => { await api.fermerSession(); naviguer('/'); }}>
        <Icone nom="cadenas" />Quitter ma session
      </button>
    </main>
  );
}
