import { ChoixControle } from '../composants/ChoixControle';
import { ChoixAvatar } from '../composants/ChoixAvatar';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Appareils } from '../composants/Appareils';
import { Avatar } from '../composants/Avatar';
import { Icone } from '../composants/Icone';
import {
  api, type Appareil, type Classe, type ControlePrevu, type Enfant, type FicheEnfant as Fiche, type ReglagesEnfant, type SuiviEnfant,
} from '../lib/donnees';
import { chargerPack, competencesJouables, NOMS_MATIERES, sansMatieres, type Pack } from '../lib/packs';
import { prochainVendredi } from '../lib/entrainement';
import { aujourdhui, bilan, CHIP_ETAT, etat, LIBELLE_ETAT, libelleErreur } from '../lib/progression';

const CLASSES: Classe[] = ['cp', 'ce1', 'ce2', 'cm1', 'cm2', '6e', '5e', '4e', '3e'];
const LIMITES = [null, 15, 20, 30, 45, 60, 90, 120];
const ONGLETS = ['Progression', 'Séances', 'Leçons', 'Contrôle', 'Réglages'] as const;
type Onglet = (typeof ONGLETS)[number];

const jourLisible = (j: string) => {
  const [a, m, d] = j.split('-').map(Number) as [number, number, number];
  return new Date(a, m - 1, d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
};
const dateCourte = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
const minutes = (ms: number) => Math.max(1, Math.round(ms / 60_000));

// Mode parent : tout le suivi d'un enfant, et ses réglages.
export function FicheEnfant() {
  const { id = '' } = useParams();
  const naviguer = useNavigate();
  const [suivi, setSuivi] = useState<SuiviEnfant | null>(null);
  const [fiche, setFiche] = useState<Fiche | null>(null);
  const [pack, setPack] = useState<Pack | null>(null);
  const [appareils, setAppareils] = useState<Appareil[]>([]);
  const [onglet, setOnglet] = useState<Onglet>('Progression');
  const [version, setVersion] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    void (async () => {
      try {
        if (!(await api.modeParentActif())) return naviguer('/parent');
        const s = (await api.suiviParent()).find((x) => x.enfant.id === id);
        if (!s) return naviguer('/parent');
        setSuivi(s);
        const [f, p, a] = await Promise.all([api.ficheEnfant(id), chargerPack(s.enfant.classe).catch(() => null), api.appareils().catch(() => [])]);
        setFiche(f);
        setPack(p);
        setAppareils(a.filter((x) => x.enfant_id === id));
      } catch (e) {
        setMessage((e as Error).message);
      }
    })();
  }, [id, naviguer, version]);

  const titres = useMemo(() => new Map(pack?.matieres.flatMap((m) => m.competences.map((c) => [c.id, c.titre] as const)) ?? []), [pack]);

  if (!suivi) return <main className="ecran" aria-busy="true">{message && <p className="muet" role="alert">{message}</p>}</main>;
  const { enfant } = suivi;

  return (
    <main className="ecran fiche">
      <div className="ligne">
        <Link to="/parent" className="hp-iconbtn" aria-label="Retour à l’espace parent"><Icone nom="retour" /></Link>
        <Avatar teinte={enfant.avatar} taille={40} />
        <div className="pousse">
          <h1 className="titre-2">{enfant.prenom}</h1>
          <p className="muet">{enfant.classe.toUpperCase()} · {enfant.xp} XP · série de {enfant.serie} jour{enfant.serie > 1 ? 's' : ''}</p>
        </div>
      </div>
      <div className="fiche__onglets" role="tablist" aria-label="Rubriques">
        {ONGLETS.map((o) => (
          <button key={o} type="button" role="tab" aria-selected={o === onglet}
            className={`hp-chip ${o === onglet ? 'hp-chip--primary' : 'hp-chip--neutral'}`} onClick={() => setOnglet(o)}>{o}</button>
        ))}
      </div>
      {message && <p className="muet" role="alert">{message}</p>}

      {onglet === 'Progression' && pack && fiche && <Progression suivi={suivi} pack={pack} fiche={fiche} titres={titres} />}
      {onglet === 'Séances' && fiche && <Seances fiche={fiche} titres={titres} />}
      {onglet === 'Leçons' && fiche && <Lecons fiche={fiche} titres={titres} />}
      {onglet === 'Contrôle' && fiche && pack && (
        <ControleParent enfant={enfant} pack={pack} prevu={fiche.controle} titres={titres} onChange={() => setVersion((v) => v + 1)} />
      )}
      {onglet === 'Réglages' && (
        <Reglages suivi={suivi} pack={pack} appareils={appareils} onChange={() => setVersion((v) => v + 1)}
          onSupprime={() => naviguer('/parent')} />
      )}
    </main>
  );
}

function Progression({ suivi, pack, fiche, titres }: { suivi: SuiviEnfant; pack: Pack; fiche: Fiche; titres: Map<string, string> }) {
  const { enfant, progression, erreurs } = suivi;
  const masquees = enfant.matieres_masquees ?? [];
  return (
    <>
      {pack.matieres.filter((m) => !masquees.includes(m.matiere)).map((m) => {
        const notions = competencesJouables({ ...pack, matieres: [m] });
        if (notions.length === 0) return null;
        const b = bilan(notions.map((c) => c.id), progression);
        return (
          <details key={m.matiere} className="hp-card fiche__matiere">
            <summary>
              <span className="ligne">
                <strong className="pousse">{NOMS_MATIERES[m.matiere] ?? m.matiere}</strong>
                {b.aRevoir > 0 && <span className="hp-chip hp-chip--attention">{b.aRevoir} à revoir</span>}
                <span className="muet">{b.acquises} / {b.total}</span>
              </span>
              <span className="hp-progress hp-progress--sm" role="progressbar" aria-valuenow={b.acquises} aria-valuemin={0} aria-valuemax={b.total}
                aria-label={`Notions acquises en ${NOMS_MATIERES[m.matiere] ?? m.matiere}`}>
                <span style={{ width: `${b.part * 100}%` }} />
              </span>
            </summary>
            <ul className="fiche__notions">
              {notions.map((c) => {
                const s = progression[c.id];
                const e = etat(s);
                return (
                  <li key={c.id} className="ligne fiche__notion">
                    <span className="pousse">{c.titre}</span>
                    {s && <span className="muet">{Math.round(s.score * 100)} %</span>}
                    {e !== 'nouveau' && <span className={`hp-chip ${CHIP_ETAT[e]}`}>{LIBELLE_ETAT[e]}</span>}
                  </li>
                );
              })}
            </ul>
          </details>
        );
      })}
      <section className="hp-card fiche__bloc">
        <h2 className="titre-3">Erreurs fréquentes (30 jours)</h2>
        {erreurs.length === 0 ? <p className="muet">Aucune erreur récurrente repérée.</p> : (
          <ul className="fiche__liste">
            {erreurs.slice(0, 8).map((e) => (
              <li key={`${e.competence}#${e.erreur}`} className="ligne">
                <span className="pousse"><strong>{libelleErreur(e.erreur)}</strong><span className="muet suivi__notion">{titres.get(e.competence) ?? e.competence}</span></span>
                <span className="hp-chip hp-chip--neutral">{e.nb} fois</span>
              </li>
            ))}
          </ul>
        )}
      </section>
      {pack.defis.length > 0 && (
        <section className="hp-card fiche__bloc">
          <h2 className="titre-3">Défis chrono</h2>
          <ul className="fiche__liste">
            {pack.defis.map((d) => (
              <li key={d.id} className="ligne">
                <span className="pousse">{d.titre}</span>
                <span className="muet">record {fiche.records[d.id] ?? 0}{d.objectif !== null ? ` / objectif ${d.objectif}` : ''}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

/** Le parent prévoit, modifie ou annule le contrôle de l'enfant ; la mission du jour le prépare. */
function ControleParent({ enfant, pack, prevu, titres, onChange }: {
  enfant: Enfant; pack: Pack; prevu: ControlePrevu | null; titres: Map<string, string>; onChange: () => void;
}) {
  const [edition, setEdition] = useState(false);
  const [date, setDate] = useState(prevu?.date ?? aujourdhui(prochainVendredi()));
  const [choix, setChoix] = useState<string[]>(prevu?.notions ?? []);
  const [message, setMessage] = useState('');
  const enregistrer = (c: ControlePrevu | null) => {
    setMessage('');
    api.prevoirControle(c, enfant.id).then(() => { setEdition(false); onChange(); }).catch((e: Error) => setMessage(e.message));
  };

  if (!edition) {
    return (
      <section className="hp-card fiche__bloc">
        <h2 className="titre-3">Contrôle prévu</h2>
        {prevu ? (
          <>
            <p style={{ margin: 0 }}><strong>{jourLisible(prevu.date)}</strong></p>
            <ul className="fiche__liste">
              {prevu.notions.map((n) => <li key={n}>{titres.get(n) ?? n}</li>)}
            </ul>
            <p className="muet" style={{ margin: 0 }}>Chaque jour d’ici là, la mission de {enfant.prenom} commence par ces notions.</p>
            <div className="ligne">
              <button type="button" className="hp-btn hp-btn--primary" onClick={() => { setDate(prevu.date); setChoix(prevu.notions); setEdition(true); }}>Modifier</button>
              <button type="button" className="hp-btn hp-btn--ghost" onClick={() => enregistrer(null)}>Annuler le contrôle</button>
            </div>
          </>
        ) : (
          <>
            <p className="muet" style={{ margin: 0 }}>Aucun contrôle prévu. Indique la date et les notions : la mission du jour de {enfant.prenom} les fera réviser jusque-là.</p>
            <button type="button" className="hp-btn hp-btn--primary" onClick={() => setEdition(true)}>Prévoir un contrôle</button>
          </>
        )}
        {message && <p className="muet" role="alert">{message}</p>}
      </section>
    );
  }
  return (
    <>
      <ChoixControle notions={competencesJouables(sansMatieres(pack, enfant.matieres_masquees))} date={date} onDate={setDate} choix={choix} onChoix={setChoix} />
      {message && <p className="muet" role="alert">{message}</p>}
      <div className="ligne">
        <span className="muet pousse">{choix.length === 0 ? 'Choisis au moins une notion.' : `${choix.length} notion${choix.length > 1 ? 's' : ''} · ${jourLisible(date)}`}</span>
        <button type="button" className="hp-btn hp-btn--ghost" onClick={() => setEdition(false)}>Retour</button>
        <button type="button" className="hp-btn hp-btn--primary" disabled={choix.length === 0} onClick={() => enregistrer({ date, notions: choix })}>Enregistrer</button>
      </div>
    </>
  );
}

function Seances({ fiche, titres }: { fiche: Fiche; titres: Map<string, string> }) {
  const jours = [...new Set(fiche.historique.map((h) => h.jour))];
  if (jours.length === 0) return <p className="hp-card muet">Aucune séance sur les 60 derniers jours.</p>;
  return (
    <section className="fiche__seances">
      {jours.map((j) => {
        const lignes = fiche.historique.filter((h) => h.jour === j);
        const q = lignes.reduce((n, h) => n + h.questions, 0);
        const r = lignes.reduce((n, h) => n + h.reussies, 0);
        const d = lignes.reduce((n, h) => n + h.duree_ms, 0);
        return (
          <article key={j} className="hp-card fiche__seance">
            <div>
              <strong className="fiche__jour">{jourLisible(j)}</strong>
              <p className="muet">{minutes(d)} min · {q} question{q > 1 ? 's' : ''} · {Math.round((r / q) * 100)} % de réussite</p>
            </div>
            <div className="fiche__puces">
              {lignes.map((h) => (
                <span key={h.competence_id} className="hp-chip hp-chip--neutral">
                  {titres.get(h.competence_id) ?? h.competence_id} · {h.reussies}/{h.questions}
                </span>
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}

function Lecons({ fiche, titres }: { fiche: Fiche; titres: Map<string, string> }) {
  if (fiche.lecons.length === 0) return <p className="hp-card muet">Aucune leçon consultée pour l’instant.</p>;
  return (
    <section className="hp-card fiche__bloc">
      <ul className="fiche__liste">
        {fiche.lecons.map((l) => (
          <li key={l.competence_id} className="ligne">
            <span className="pousse">{titres.get(l.competence_id) ?? l.competence_id}</span>
            <span className="muet">{l.vues} fois · {dateCourte(l.derniere_vue)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Reglages({ suivi, pack, appareils, onChange, onSupprime }: {
  suivi: SuiviEnfant; pack: Pack | null; appareils: Appareil[]; onChange: () => void; onSupprime: () => void;
}) {
  const { enfant } = suivi;
  const [r, setR] = useState<ReglagesEnfant>({
    prenom: enfant.prenom, avatar: enfant.avatar, classe: enfant.classe,
    matieres_masquees: enfant.matieres_masquees ?? [], minutes_par_jour: enfant.minutes_par_jour ?? null,
  });
  const [code, setCode] = useState('');
  const [confirmer, setConfirmer] = useState(false);
  const [message, setMessage] = useState('');
  const essayer = async (action: () => Promise<void>, ok: string) => {
    setMessage('');
    try {
      await action();
      setMessage(ok);
    } catch (e) {
      setMessage((e as Error).message);
    }
  };
  const basculer = (m: string) => setR((x) => ({
    ...x, matieres_masquees: x.matieres_masquees.includes(m) ? x.matieres_masquees.filter((y) => y !== m) : [...x.matieres_masquees, m],
  }));

  return (
    <>
      <form className="hp-card formulaire" onSubmit={(e) => { e.preventDefault(); void essayer(async () => { await api.reglerEnfant(enfant.id, r); onChange(); }, 'Réglages enregistrés.'); }}>
        <label>Prénom ou pseudo
          <input value={r.prenom} maxLength={40} required onChange={(e) => setR({ ...r, prenom: e.target.value })} />
        </label>
        <fieldset className="fiche__groupe">
          <legend>Avatar</legend>
          <ChoixAvatar valeur={r.avatar} taille={44} onChange={(avatar) => setR({ ...r, avatar })} />
        </fieldset>
        <label>Classe
          <select value={r.classe} onChange={(e) => setR({ ...r, classe: e.target.value as Classe })}>
            {CLASSES.map((c) => <option key={c} value={c}>{c.toUpperCase()}</option>)}
          </select>
        </label>
        {pack && (
          <fieldset className="fiche__groupe">
            <legend>Matières proposées</legend>
            <div className="fiche__puces">
              {pack.matieres.map((m) => {
                const active = !r.matieres_masquees.includes(m.matiere);
                return (
                  <button key={m.matiere} type="button" role="checkbox" aria-checked={active}
                    className={`hp-chip ${active ? 'hp-chip--primary' : 'hp-chip--neutral'}`} onClick={() => basculer(m.matiere)}>
                    {active && <Icone nom="coche" taille={16} />}{NOMS_MATIERES[m.matiere] ?? m.matiere}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}
        <label>Temps de travail par jour
          <select value={r.minutes_par_jour ?? ''} onChange={(e) => setR({ ...r, minutes_par_jour: e.target.value ? Number(e.target.value) : null })}>
            {LIMITES.map((l) => <option key={l ?? 'aucune'} value={l ?? ''}>{l ? `${l} minutes` : 'Pas de limite'}</option>)}
          </select>
        </label>
        <button className="hp-btn hp-btn--primary" style={{ alignSelf: 'flex-start' }}>Enregistrer</button>
      </form>

      <form className="hp-card formulaire" onSubmit={(e) => { e.preventDefault(); void essayer(async () => { await api.changerCodeEnfant(enfant.id, code); setCode(''); }, 'Code changé.'); }}>
        <label>Nouveau code secret ({enfant.code_type === 'pictos' ? '4 chiffres de 0 à 7 : étoile, lune, cœur, feuille, goutte, soleil, poisson, nuage' : '4 chiffres'})
          <input inputMode="numeric" pattern={enfant.code_type === 'pictos' ? '[0-7]{4}' : '[0-9]{4}'} maxLength={4} required value={code} onChange={(e) => setCode(e.target.value)} />
        </label>
        <button className="hp-btn hp-btn--secondary" style={{ alignSelf: 'flex-start' }}>Changer le code</button>
      </form>

      <section className="hp-card">
        <Appareils enfant={enfant.id} prenom={enfant.prenom} appareils={appareils} onChange={onChange} />
      </section>

      <section className="hp-card fiche__bloc">
        <h2 className="titre-3">Supprimer ce profil</h2>
        {!confirmer ? (
          <button type="button" className="hp-btn hp-btn--ghost" style={{ alignSelf: 'flex-start' }} onClick={() => setConfirmer(true)}>
            Supprimer le profil de {enfant.prenom}
          </button>
        ) : (
          <>
            <p style={{ margin: 0 }}>Toute la progression, les résultats et les appareils de {enfant.prenom} seront effacés. C’est définitif.</p>
            <div className="ligne">
              <button type="button" className="hp-btn hp-btn--primary" onClick={() => void essayer(async () => { await api.supprimerEnfant(enfant.id); onSupprime(); }, '')}>
                Supprimer définitivement
              </button>
              <button type="button" className="hp-btn hp-btn--ghost" onClick={() => setConfirmer(false)}>Annuler</button>
            </div>
          </>
        )}
      </section>
      {message && <p className="muet" role="status">{message}</p>}
    </>
  );
}
