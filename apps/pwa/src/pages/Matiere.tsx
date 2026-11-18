import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icone } from '../composants/Icone';
import { COULEUR_MATIERE } from '../lib/couleurs';
import { api } from '../lib/donnees';
import { chargerPack, NOMS_MATIERES, type CompetencePack, type Pack } from '../lib/packs';
import { CHIP_ETAT, etat, LIBELLE_ETAT, type Suivi } from '../lib/progression';
import { aFaire, indexer, ranger, rechercher } from '../lib/recherche';

function Notion({ c, suivi, contexte }: { c: CompetencePack; suivi?: Suivi; contexte?: boolean }) {
  const jouable = c.generateurs.length > 0 || c.exercices.length > 0;
  const e = etat(suivi);
  return (
    <div className="hp-skill notion" aria-disabled={!jouable && !c.lecon}>
      <span className="hp-skill__main">
        {contexte && <span className="notion__contexte">{c.domaine} · {c.theme}</span>}
        <span className="hp-skill__name">{c.titre}</span>
        <span className="hp-skill__where" title={c.attendu}>{c.attendu}</span>
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

/** Domaines ouverts, retenus par enfant et par matière : on retrouve la page comme on l'a laissée. */
const cleOuverts = (enfant: string, matiere: string) => `hopla.domaines.${enfant}.${matiere}`;
function lireOuverts(cle: string): string[] | null {
  try { return JSON.parse(localStorage.getItem(cle) ?? 'null') as string[] | null; } catch { return null; }
}

export function Matiere() {
  const { matiere = '' } = useParams();
  const naviguer = useNavigate();
  const [bloc, setBloc] = useState<Pack['matieres'][number] | null>(null);
  const [suivi, setSuivi] = useState<Record<string, Suivi>>({});
  const [requete, setRequete] = useState('');
  const [cle, setCle] = useState('');
  const [ouverts, setOuverts] = useState<string[]>([]);

  useEffect(() => {
    void (async () => {
      try {
        const enfant = await api.enfantCourant();
        if (!enfant) return naviguer('/');
        const pack = await chargerPack(enfant.classe);
        const m = pack.matieres.find((x) => x.matiere === matiere);
        if (!m || enfant.matieres_masquees?.includes(m.matiere)) return naviguer('/accueil');
        const k = cleOuverts(enfant.id, m.matiere);
        const doms = ranger(m.competences).map((d) => d.domaine);
        setCle(k);
        setOuverts(lireOuverts(k) ?? (doms.length === 1 ? doms : []));
        setBloc(m);
        setSuivi(await api.progression().catch(() => ({})));
      } catch {
        naviguer('/accueil');
      }
    })();
  }, [matiere, naviguer]);

  const index = useMemo(() => indexer(bloc?.competences ?? []), [bloc]);
  const domaines = useMemo(() => ranger(bloc?.competences ?? []), [bloc]);
  const priorites = useMemo(() => aFaire(bloc?.competences ?? [], suivi), [bloc, suivi]);
  if (!bloc) return <main className="ecran" aria-busy="true" />;

  const basculer = (domaine: string, ouvert: boolean) => {
    if (ouverts.includes(domaine) === ouvert) return;
    const suivants = ouvert ? [...ouverts, domaine] : ouverts.filter((d) => d !== domaine);
    setOuverts(suivants);
    try { localStorage.setItem(cle, JSON.stringify(suivants)); } catch { /* préférence locale seulement */ }
  };

  const nom = NOMS_MATIERES[bloc.matiere] ?? bloc.matiere;
  const cherche = requete.trim().length >= 2;
  const resultats = cherche ? rechercher(index, requete) : [];
  const vues = (ns: CompetencePack[]) => ns.filter((c) => etat(suivi[c.id]) !== 'nouveau').length;
  const aFaireMaintenant = [...priorites.aRevoir, ...(priorites.suivante ? [priorites.suivante] : [])];

  return (
    <main className={`ecran ${COULEUR_MATIERE[bloc.matiere] ?? ''}`}>
      <div className="ligne">
        <Link to="/accueil" className="hp-iconbtn" aria-label="Retour à l'accueil"><Icone nom="retour" /></Link>
        <h1 className="titre-2 pousse">{nom}</h1>
        <span className="muet">{vues(bloc.competences)} / {bloc.competences.length} vues</span>
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
          {aFaireMaintenant.length > 0 && (
            <section className="liste-notions" aria-label="À faire maintenant">
              <h2 className="titre-3">{priorites.aRevoir.length > 0 ? 'À revoir, puis la suite' : 'Pour continuer'}</h2>
              {aFaireMaintenant.map((c) => <Notion key={c.id} c={c} suivi={suivi[c.id]} contexte />)}
            </section>
          )}
          <div className="domaines">
            {domaines.map((d) => {
              const toutes = d.themes.flatMap((t) => t.notions);
              const n = vues(toutes);
              const ouvert = ouverts.includes(d.domaine);
              return (
                <details key={d.domaine} className="domaine" open={ouvert}
                  onToggle={(e) => basculer(d.domaine, (e.currentTarget as HTMLDetailsElement).open)}>
                  <summary className="domaine__tete">
                    <span className="domaine__titre">
                      <span className="pousse">{d.domaine}</span>
                      <span className="muet">{n} / {toutes.length}</span>
                      <span className="domaine__chevron" aria-hidden="true"><Icone nom="retour" taille={20} /></span>
                    </span>
                    <span className="hp-progress hp-progress--sm" role="progressbar" aria-label={`${n} notions vues sur ${toutes.length}`}
                      aria-valuemin={0} aria-valuemax={toutes.length} aria-valuenow={n}>
                      <span style={{ width: `${toutes.length ? (n / toutes.length) * 100 : 0}%` }} />
                    </span>
                  </summary>
                  <div className="domaine__corps">
                    {d.themes.map((t) => (
                      <div key={t.theme} className="liste-notions">
                        {(d.themes.length > 1 || t.theme !== d.domaine) && <h3 className="titre-3">{t.theme}</h3>}
                        {t.notions.map((c) => <Notion key={c.id} c={c} suivi={suivi[c.id]} />)}
                      </div>
                    ))}
                  </div>
                </details>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}
