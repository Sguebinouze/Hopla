import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icone } from '../composants/Icone';
import { api } from '../lib/donnees';
import { chargerPack, NOMS_MATIERES, type Pack } from '../lib/packs';

export function Matiere() {
  const { matiere = '' } = useParams();
  const naviguer = useNavigate();
  const [bloc, setBloc] = useState<Pack['matieres'][number] | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const enfant = await api.enfantCourant();
        if (!enfant) return naviguer('/');
        const pack = await chargerPack(enfant.classe);
        const m = pack.matieres.find((x) => x.matiere === matiere);
        if (!m) return naviguer('/accueil');
        setBloc(m);
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
      <p className="muet" style={{ margin: 0 }}>{bloc.programme.intitule} · {bloc.programme.reference}</p>
      {themes.map((t) => (
        <section key={t} className="liste-notions">
          <h2 className="titre-3">{t}</h2>
          {bloc.competences.filter((c) => c.theme === t).map((c) => {
            const jouable = c.generateurs.length > 0 || c.exercices.length > 0;
            return (
              <Link key={c.id} to={jouable ? `/exercice/${c.id}` : '#'} aria-disabled={!jouable}
                className="hp-skill notion" onClick={(e) => { if (!jouable) e.preventDefault(); }}>
                <span className="hp-skill__main">
                  <span className="hp-skill__name">{c.titre}</span>
                  <span className="hp-skill__where">{c.attendu}</span>
                </span>
                <span className="hp-chip hp-chip--primary">{jouable ? "S’entrainer" : 'Bientôt'}</span>
              </Link>
            );
          })}
        </section>
      ))}
    </main>
  );
}
