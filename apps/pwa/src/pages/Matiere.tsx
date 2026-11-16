import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icone } from '../composants/Icone';
import { api } from '../lib/donnees';
import { chargerPack, NOMS_MATIERES, type Pack } from '../lib/packs';
import { CHIP_ETAT, etat, LIBELLE_ETAT, type Suivi } from '../lib/progression';

export function Matiere() {
  const { matiere = '' } = useParams();
  const naviguer = useNavigate();
  const [bloc, setBloc] = useState<Pack['matieres'][number] | null>(null);
  const [suivi, setSuivi] = useState<Record<string, Suivi>>({});

  useEffect(() => {
    void (async () => {
      try {
        const enfant = await api.enfantCourant();
        if (!enfant) return naviguer('/');
        const pack = await chargerPack(enfant.classe);
        const m = pack.matieres.find((x) => x.matiere === matiere);
        if (!m || enfant.matieres_masquees?.includes(m.matiere)) return naviguer('/accueil');
        setBloc(m);
        setSuivi(await api.progression().catch(() => ({})));
      } catch {
        naviguer('/accueil');
      }
    })();
  }, [matiere, naviguer]);

  if (!bloc) return <main className="ecran" aria-busy="true" />;

  // Notions regroupées par thème du programme, dans l'ordre du texte officiel.
  const themes = [...new Set(bloc.competences.map((c) => c.theme))];
  return (
    <main className="ecran">
      <div className="ligne">
        <Link to="/accueil" className="hp-iconbtn" aria-label="Retour à l'accueil"><Icone nom="retour" /></Link>
        <h1 className="titre-2 pousse">{NOMS_MATIERES[bloc.matiere] ?? bloc.matiere}</h1>
      </div>
      {themes.map((t) => (
        <section key={t} className="liste-notions">
          <h2 className="titre-3">{t}</h2>
          {bloc.competences.filter((c) => c.theme === t).map((c) => {
            const jouable = c.generateurs.length > 0 || c.exercices.length > 0;
            const e = etat(suivi[c.id]);
            return (
              <div key={c.id} className="hp-skill notion" aria-disabled={!jouable && !c.lecon}>
                <span className="hp-skill__main">
                  <span className="hp-skill__name">{c.titre}</span>
                  <span className="hp-skill__where">{c.attendu}</span>
                </span>
                <span className="notion__actions">
                  {e !== 'nouveau' && <span className={`hp-chip ${CHIP_ETAT[e]}`}>{LIBELLE_ETAT[e]}</span>}
                  {c.lecon && <Link to={`/lecon/${c.id}`} className="hp-chip hp-chip--neutral"><Icone nom="livre" taille={16} />Leçon</Link>}
                  {jouable && <Link to={`/exercice/${c.id}`} className="hp-chip hp-chip--primary">S’entrainer</Link>}
                  {!jouable && !c.lecon && <span className="hp-chip hp-chip--neutral">Bientôt</span>}
                </span>
              </div>
            );
          })}
        </section>
      ))}
    </main>
  );
}
