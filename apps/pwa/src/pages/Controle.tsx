import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { api, type Enfant } from '../lib/donnees';
import { dateLisible, joursAvant, prochainVendredi } from '../lib/entrainement';
import type { ControlePrevu } from '../lib/donnees';
import { chargerPack, competencesJouables, NOMS_MATIERES, sansMatieres, type Pack } from '../lib/packs';
import { aujourdhui, CHIP_ETAT, etat, LIBELLE_ETAT, type Suivi } from '../lib/progression';

// Mode « contrôle vendredi » : l'enfant choisit les notions et la date,
// la mission du jour les fait réviser chaque jour jusque-là.
export function Controle() {
  const naviguer = useNavigate();
  const [enfant, setEnfant] = useState<Enfant | null>(null);
  const [pack, setPack] = useState<Pack | null>(null);
  const [suivi, setSuivi] = useState<Record<string, Suivi>>({});
  const [prevu, setPrevu] = useState<ControlePrevu | null>(null);
  const [date, setDate] = useState(aujourdhui(prochainVendredi()));
  const [choix, setChoix] = useState<string[]>([]);
  const [matiere, setMatiere] = useState('');
  const [erreur, setErreur] = useState('');
  const jour = aujourdhui();

  useEffect(() => {
    void (async () => {
      try {
        const e = await api.enfantCourant();
        if (!e) return naviguer('/');
        setEnfant(e);
        setPack(sansMatieres(await chargerPack(e.classe), e.matieres_masquees));
        setPrevu(await api.controle().catch(() => null));
        setSuivi(await api.progression().catch(() => ({})));
      } catch {
        naviguer('/accueil');
      }
    })();
  }, [naviguer]);

  if (!enfant || !pack) return <main className="ecran" aria-busy="true" />;
  const notions = competencesJouables(pack);

  if (prevu) {
    const liste = notions.filter((c) => prevu.notions.includes(c.id))
      .sort((a, b) => (suivi[a.id]?.score ?? 0) - (suivi[b.id]?.score ?? 0));
    const j = joursAvant(prevu.date, jour);
    return (
      <main className="ecran">
        <div className="ligne">
          <Link to="/accueil" className="hp-iconbtn" aria-label="Retour à l'accueil"><Icone nom="retour" /></Link>
          <h1 className="titre-2 pousse">Mon contrôle</h1>
        </div>
        <section className="hp-card controle__resume">
          <Octave taille={52} />
          <div className="pousse">
            <p className="titre-3" style={{ margin: 0 }}>{dateLisible(prevu.date)}</p>
            <p className="muet" style={{ margin: 0 }}>{j === 0 ? 'C’est aujourd’hui.' : `Dans ${j} jour${j > 1 ? 's' : ''}.`} Chaque jour, la mission t’entraine sur ces notions.</p>
          </div>
        </section>
        <div className="liste-notions">
          {liste.map((c) => {
            const e = etat(suivi[c.id], jour);
            return (
              <div key={c.id} className="hp-skill notion">
                <span className="hp-skill__main">
                  <span className="hp-skill__name">{c.titre}</span>
                  <span className="hp-skill__where">{NOMS_MATIERES[c.matiere] ?? c.matiere}</span>
                </span>
                <span className="notion__actions">
                  <span className={`hp-chip ${CHIP_ETAT[e]}`}>{LIBELLE_ETAT[e]}</span>
                  {c.lecon && <Link to={`/lecon/${c.id}`} className="hp-chip hp-chip--neutral"><Icone nom="livre" taille={16} />Leçon</Link>}
                  <Link to={`/exercice/${c.id}`} className="hp-chip hp-chip--primary">S’entrainer</Link>
                </span>
              </div>
            );
          })}
        </div>
        {liste[0] && <Link to={`/exercice/${liste[0].id}`} className="hp-btn hp-btn--reward hp-btn--block">Réviser la notion la moins sure</Link>}
        <button className="hp-btn hp-btn--ghost" onClick={() => { void api.prevoirControle(null).then(() => { setPrevu(null); setChoix([]); }).catch((e: Error) => setErreur(e.message)); }}>
          Le contrôle est passé ou annulé
        </button>
      </main>
    );
  }

  const matieres = [...new Set(notions.map((c) => c.matiere))];
  const ouverte = matiere && matieres.includes(matiere) ? matiere : matieres[0]!;
  const basculer = (id: string) => setChoix((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));
  const jours = joursDeClasse(5);
  const valider = () => {
    if (choix.length === 0) return;
    const c = { date, notions: choix };
    void api.prevoirControle(c).then(() => setPrevu(c)).catch((e: Error) => setErreur(e.message));
  };
  return (
    <main className="ecran controle">
      <div className="ligne">
        <Link to="/accueil" className="hp-iconbtn" aria-label="Retour à l'accueil"><Icone nom="retour" /></Link>
        <h1 className="titre-2 pousse">Préparer un contrôle</h1>
      </div>

      <section className="hp-card controle__etape">
        <h2 className="titre-3">Quand ?</h2>
        <div className="controle__puces" role="radiogroup" aria-label="Date du contrôle">
          {jours.map((j) => (
            <button key={j} type="button" role="radio" aria-checked={j === date}
              className={`hp-chip ${j === date ? 'hp-chip--primary' : 'hp-chip--neutral'}`} onClick={() => setDate(j)}>
              {dateCourte(j)}
            </button>
          ))}
        </div>
        <label className="controle__autre">
          <span className="muet">Autre date</span>
          <input type="date" min={jour} value={date} onChange={(e) => e.target.value && setDate(e.target.value)} />
        </label>
      </section>

      <section className="hp-card controle__etape">
        <h2 className="titre-3">Quelles notions ?</h2>
        <div className="controle__puces" role="tablist" aria-label="Matières">
          {matieres.map((m) => {
            const n = notions.filter((c) => c.matiere === m && choix.includes(c.id)).length;
            return (
              <button key={m} type="button" role="tab" aria-selected={m === ouverte}
                className={`hp-chip ${m === ouverte ? 'hp-chip--primary' : 'hp-chip--neutral'}`} onClick={() => setMatiere(m)}>
                {NOMS_MATIERES[m] ?? m}{n > 0 ? ` · ${n}` : ''}
              </button>
            );
          })}
        </div>
        {[...new Set(notions.filter((c) => c.matiere === ouverte).map((c) => c.domaine))].map((domaine) => (
          <div key={domaine} className="controle__liste" role="group" aria-label={domaine}>
            <p className="muet">{domaine}</p>
            {notions.filter((c) => c.matiere === ouverte && c.domaine === domaine).map((c) => {
              const coche = choix.includes(c.id);
              return (
                <button key={c.id} type="button" role="checkbox" aria-checked={coche}
                  className={`controle__notion${coche ? ' controle__notion--coche' : ''}`} onClick={() => basculer(c.id)}>
                  <span className="controle__case" aria-hidden="true">{coche && <Icone nom="coche" taille={16} />}</span>
                  <span className="controle__titre">{c.titre}</span>
                </button>
              );
            })}
          </div>
        ))}
      </section>

      {erreur && <p className="muet" role="alert">{erreur}</p>}
      <div className="controle__pied">
        <p className="muet pousse">
          {choix.length === 0 ? 'Choisis au moins une notion.' : `${choix.length} notion${choix.length > 1 ? 's' : ''} · ${dateLisible(date)}`}
        </p>
        <button type="button" className="hp-btn hp-btn--primary" disabled={choix.length === 0} onClick={valider}>Préparer</button>
      </div>
    </main>
  );
}

/** Les n prochains jours de classe (lundi à vendredi), à partir de demain. */
function joursDeClasse(n: number): string[] {
  const res: string[] = [];
  const d = new Date();
  while (res.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) res.push(aujourdhui(d));
  }
  return res;
}

function dateCourte(date: string): string {
  const [a, m, j] = date.split('-').map(Number) as [number, number, number];
  return new Date(a, m - 1, j).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
}
