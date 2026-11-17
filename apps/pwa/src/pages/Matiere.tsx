import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icone } from '../composants/Icone';
import { api } from '../lib/donnees';
import { chargerPack, NOMS_MATIERES, type CompetencePack, type Pack } from '../lib/packs';
import { CHIP_ETAT, etat, LIBELLE_ETAT, type Suivi } from '../lib/progression';
import { indexer, ranger, rechercher } from '../lib/recherche';

function Notion({ c, suivi, contexte }: { c: CompetencePack; suivi?: Suivi; contexte?: boolean }) {
  const jouable = c.generateurs.length > 0 || c.exercices.length > 0;
  const e = etat(suivi);
  return (
    <div className="hp-skill notion" aria-disabled={!jouable && !c.lecon}>
      <span className="hp-skill__main">
        {contexte && <span className="notion__contexte">{c.domaine} · {c.theme}</span>}
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
}

export function Matiere() {
  const { matiere = '' } = useParams();
  const naviguer = useNavigate();
  const [bloc, setBloc] = useState<Pack['matieres'][number] | null>(null);
  const [suivi, setSuivi] = useState<Record<string, Suivi>>({});
  const [requete, setRequete] = useState('');
  const sections = useRef<Record<string, HTMLElement | null>>({});

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

  const index = useMemo(() => indexer(bloc?.competences ?? []), [bloc]);
  const domaines = useMemo(() => ranger(bloc?.competences ?? []), [bloc]);
  if (!bloc) return <main className="ecran" aria-busy="true" />;

  const nom = NOMS_MATIERES[bloc.matiere] ?? bloc.matiere;
  const cherche = requete.trim().length >= 2;
  const resultats = cherche ? rechercher(index, requete) : [];
  const vues = (ns: CompetencePack[]) => ns.filter((c) => etat(suivi[c.id]) !== 'nouveau').length;

  return (
    <main className="ecran">
      <div className="ligne">
        <Link to="/accueil" className="hp-iconbtn" aria-label="Retour à l'accueil"><Icone nom="retour" /></Link>
        <h1 className="titre-2 pousse">{nom}</h1>
        <span className="muet">{bloc.competences.length} notions</span>
      </div>
      <label className="recherche">
        <Icone nom="loupe" taille={20} />
        <input type="search" value={requete} onChange={(e) => setRequete(e.target.value)}
          placeholder={`Chercher en ${nom.toLowerCase()} : un mot, une leçon`} aria-label={`Chercher une notion en ${nom}`} enterKeyHint="search" />
      </label>

      {cherche ? (
        <section className="liste-notions" aria-live="polite">
          <h2 className="titre-3">{resultats.length === 0 ? 'Aucune notion trouvée' : `${resultats.length} notion${resultats.length > 1 ? 's' : ''} trouvée${resultats.length > 1 ? 's' : ''}`}</h2>
          {resultats.length === 0 && <p className="muet">Essaie un autre mot, ou un mot plus court : « fraction », « verbe », « cercle ».</p>}
          {resultats.map((c) => <Notion key={c.id} c={c} suivi={suivi[c.id]} contexte />)}
        </section>
      ) : (
        <>
          {domaines.length > 1 && (
            <nav className="sommaire" aria-label="Domaines du programme">
              {domaines.map((d) => (
                <button key={d.domaine} type="button" className="hp-chip hp-chip--neutral"
                  onClick={() => sections.current[d.domaine]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                  {d.domaine}
                </button>
              ))}
            </nav>
          )}
          {domaines.map((d) => {
            const toutes = d.themes.flatMap((t) => t.notions);
            return (
              <section key={d.domaine} className="domaine" ref={(el) => { sections.current[d.domaine] = el; }}>
                <div className="ligne">
                  <h2 className="titre-2 pousse">{d.domaine}</h2>
                  <span className="muet">{vues(toutes)} / {toutes.length} vues</span>
                </div>
                {d.themes.map((t) => (
                  <div key={t.theme} className="liste-notions">
                    {(d.themes.length > 1 || t.theme !== d.domaine) && <h3 className="titre-3">{t.theme}</h3>}
                    {t.notions.map((c) => <Notion key={c.id} c={c} suivi={suivi[c.id]} />)}
                  </div>
                ))}
              </section>
            );
          })}
        </>
      )}
    </main>
  );
}
