import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { api, type Enfant } from '../lib/donnees';
import { controle as lireControle, dateLisible, joursAvant, prevoirControle, prochainVendredi, type Controle as ControlePrevu } from '../lib/entrainement';
import { chargerPack, competencesJouables, NOMS_MATIERES, type Pack } from '../lib/packs';
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
  const jour = aujourdhui();

  useEffect(() => {
    void (async () => {
      try {
        const e = await api.enfantCourant();
        if (!e) return naviguer('/');
        setEnfant(e);
        setPack(await chargerPack(e.classe));
        setPrevu(lireControle(e.id, aujourdhui()));
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
        <button className="hp-btn hp-btn--ghost" onClick={() => { prevoirControle(enfant.id, null); setPrevu(null); setChoix([]); }}>
          Le contrôle est passé ou annulé
        </button>
      </main>
    );
  }

  const matieres = [...new Set(notions.map((c) => c.matiere))];
  const basculer = (id: string) => setChoix((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));
  return (
    <main className="ecran">
      <div className="ligne">
        <Link to="/accueil" className="hp-iconbtn" aria-label="Retour à l'accueil"><Icone nom="retour" /></Link>
        <h1 className="titre-2 pousse">Préparer un contrôle</h1>
      </div>
      <form className="formulaire hp-card" onSubmit={(e) => {
        e.preventDefault();
        if (choix.length === 0) return;
        const c = { date, notions: choix };
        prevoirControle(enfant.id, c);
        setPrevu(c);
      }}>
        <label>Date du contrôle
          <input type="date" required min={jour} value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        {matieres.map((m) => (
          <fieldset key={m} className="controle__matiere">
            <legend className="titre-3">{NOMS_MATIERES[m] ?? m}</legend>
            {notions.filter((c) => c.matiere === m).map((c) => (
              <label key={c.id} className="controle__notion">
                <input type="checkbox" checked={choix.includes(c.id)} onChange={() => basculer(c.id)} />
                <span>{c.titre}</span>
              </label>
            ))}
          </fieldset>
        ))}
        <button className="hp-btn hp-btn--primary" disabled={choix.length === 0}>
          Préparer {choix.length > 0 ? `${choix.length} notion${choix.length > 1 ? 's' : ''}` : 'le contrôle'}
        </button>
      </form>
    </main>
  );
}
