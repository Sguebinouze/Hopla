import { BlocProgrammes } from '../composants/Programmes';
import { DefiFamille } from '../composants/DefiFamille';
import { BilanSemaine } from '../composants/BilanSemaine';
import { BoutonTheme } from '../composants/BoutonTheme';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '../composants/Avatar';
import { Icone } from '../composants/Icone';
import { Famille } from '../composants/Famille';
import { api, type Classe, type SuiviEnfant } from '../lib/donnees';
import { chargerPack, competencesJouables, NOMS_MATIERES, type Pack } from '../lib/packs';
import { bilan, libelleErreur } from '../lib/progression';


function TableauEnfant({ suivi, pack }: { suivi: SuiviEnfant; pack: Pack | undefined }) {
  const { enfant, progression, erreurs } = suivi;
  const titres = new Map(pack?.matieres.flatMap((m) => m.competences.map((c) => [c.id, c.titre] as const)) ?? []);
  return (
    <section className="hp-card suivi">
      <div className="ligne">
        <Avatar teinte={enfant.avatar} taille={40} />
        <div className="pousse">
          <h2 className="titre-2">{enfant.prenom}</h2>
          <p className="muet">{enfant.classe.toUpperCase()} · {enfant.xp} XP · série de {enfant.serie} jour{enfant.serie > 1 ? 's' : ''}</p>
        </div>
      </div>
      {pack ? pack.matieres.map((m) => {
        const ids = competencesJouables({ ...pack, matieres: [m] }).map((c) => c.id);
        if (ids.length === 0) return null;
        const b = bilan(ids, progression);
        return (
          <div key={m.matiere} className="suivi__matiere">
            <div className="ligne">
              <span className="pousse">{NOMS_MATIERES[m.matiere] ?? m.matiere}</span>
              {b.aRevoir > 0 && <span className="hp-chip hp-chip--attention">{b.aRevoir} à revoir</span>}
              <span className="muet">{b.acquises} / {b.total}</span>
            </div>
            <div className="hp-progress hp-progress--sm" role="progressbar" aria-label={`Notions acquises en ${NOMS_MATIERES[m.matiere] ?? m.matiere}`}
              aria-valuenow={b.acquises} aria-valuemin={0} aria-valuemax={b.total}>
              <span style={{ width: `${b.part * 100}%` }} />
            </div>
          </div>
        );
      }) : <p className="muet">Programme de la classe indisponible.</p>}
      <h3 className="titre-3">Erreurs fréquentes (30 jours)</h3>
      {erreurs.length === 0 ? <p className="muet">Aucune erreur récurrente repérée.</p> : (
        <ul className="suivi__erreurs">
          {erreurs.slice(0, 5).map((e) => (
            <li key={`${e.competence}#${e.erreur}`}>
              <span className="pousse">
                <strong>{libelleErreur(e.erreur)}</strong>
                <span className="muet suivi__notion">{titres.get(e.competence) ?? e.competence}</span>
              </span>
              <span className="hp-chip hp-chip--neutral">{e.nb} fois</span>
            </li>
          ))}
        </ul>
      )}
      <Link to={`/parent/enfant/${enfant.id}`} className="hp-btn hp-btn--secondary" style={{ alignSelf: 'flex-start' }}>
        Fiche complète et réglages
      </Link>
    </section>
  );
}

export function Parent() {
  const [ouvert, setOuvert] = useState(false);
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [suivis, setSuivis] = useState<SuiviEnfant[]>([]);
  const [packs, setPacks] = useState<Partial<Record<Classe, Pack>>>({});
  const [version, setVersion] = useState(0);
  const [admin, setAdmin] = useState(false);
  const [confirmer, setConfirmer] = useState(false);

  // Mode parent encore ouvert dans cet onglet (retour depuis une fiche) : pas besoin de redemander le code.
  useEffect(() => {
    api.modeParentActif().then((o) => o && setOuvert(true)).catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!ouvert) return;
    void (async () => {
      try {
        setAdmin(await api.estAdmin().catch(() => false));
        const s = await api.suiviParent();
        setSuivis(s);
        const classes = [...new Set(s.map((x) => x.enfant.classe))];
        const charges = await Promise.all(classes.map((c) => chargerPack(c).then((p) => [c, p] as const).catch(() => null)));
        setPacks(Object.fromEntries(charges.filter((x) => x !== null)));
      } catch (e) {
        setMessage((e as Error).message);
      }
    })();
  }, [ouvert, version]);

  const essayer = async (action: () => Promise<void>) => {
    setMessage('');
    try {
      await action();
    } catch (e) {
      setMessage((e as Error).message);
    }
  };

  return (
    <main className="ecran">
      <div className="ligne">
        <Link to="/" className="hp-iconbtn" aria-label="Retour"><Icone nom="retour" /></Link>
        <h1 className="titre-1 pousse">Espace parent</h1>
        <BoutonTheme />
      </div>

      {!ouvert ? (
        <form className="formulaire hp-card" onSubmit={(e) => {
          e.preventDefault();
          void essayer(async () => {
            if (await api.ouvrirModeParent(code)) setOuvert(true);
            else setMessage('Code parent incorrect.');
          });
        }}>
          <label>Code parent (4 chiffres)
            <input inputMode="numeric" pattern="[0-9]{4}" maxLength={4} required value={code} onChange={(e) => setCode(e.target.value)} />
          </label>
          <div className="ligne">
            <button className="hp-btn hp-btn--primary">Ouvrir</button>
            <button type="button" className="hp-btn hp-btn--ghost" onClick={() => void essayer(async () => {
              await api.definirCodeParent(code);
              setMessage('Code parent enregistré. Clique sur Ouvrir.');
            })}>Créer ce code</button>
          </div>
          {api.mode === 'demo' && <p className="bandeau-demo">Démo : le code parent est 1111.</p>}
        </form>
      ) : (
        <>
        {admin && (
          <Link to="/admin" className="hp-skill notion">
            <span className="hp-skill__main">
              <span className="hp-skill__name">Administration</span>
              <span className="hp-skill__where">Relecture des notions, leçons et questions</span>
            </span>
            <Icone nom="eclair" />
          </Link>
        )}
        <BilanSemaine key={`bilan-${version}`} />
        <DefiFamille parent key={`defi-${version}`} />
        {suivis.map((s) => (
          <TableauEnfant key={s.enfant.id} suivi={s} pack={packs[s.enfant.classe]} />
        ))}
        <Famille sansEnfant={suivis.length === 0} onRejoint={() => setVersion((v) => v + 1)} />
        <Link to="/demarrer?etape=enfants" className="hp-skill notion">
          <span className="hp-skill__main">
            <span className="hp-skill__name">Ajouter un enfant ou un appareil</span>
            <span className="hp-skill__where">Nouveau profil, tablette ou téléphone d’un enfant, installation</span>
          </span>
          <Icone nom="plus" />
        </Link>
        <BlocProgrammes />
        <section className="hp-card fiche__bloc">
          <h2 className="titre-2">Mes données</h2>
          <p className="muet">Hopla ne garde que le prénom, l’avatar et la classe de chaque enfant, avec ses résultats. <Link to="/confidentialite">En savoir plus</Link> · <Link to="/credits">Crédits</Link></p>
          <button type="button" className="hp-btn hp-btn--secondary" style={{ alignSelf: 'flex-start' }} onClick={() => void essayer(async () => {
            const donnees = await api.exporterDonnees();
            const a = document.createElement('a');
            a.href = URL.createObjectURL(new Blob([JSON.stringify(donnees, null, 2)], { type: 'application/json' }));
            a.download = `hopla-donnees-${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(a.href);
          })}>Télécharger toutes nos données</button>
          {!confirmer ? (
            <button type="button" className="hp-btn hp-btn--ghost" style={{ alignSelf: 'flex-start' }} onClick={() => setConfirmer(true)}>
              Supprimer mon compte
            </button>
          ) : (
            <>
              <p style={{ margin: 0 }}>
                Ton compte sera supprimé. Si un autre parent est membre de la famille, les profils des enfants restent avec lui ;
                sinon, tous les profils et leurs résultats sont effacés. C’est définitif.
              </p>
              <div className="ligne">
                <button type="button" className="hp-btn hp-btn--primary" onClick={() => void essayer(async () => {
                  await api.supprimerMonCompte();
                  location.assign('/');
                })}>Supprimer définitivement</button>
                <button type="button" className="hp-btn hp-btn--ghost" onClick={() => setConfirmer(false)}>Annuler</button>
              </div>
            </>
          )}
        </section>
        </>
      )}
      {message && <p className="muet" role="status">{message}</p>}
    </main>
  );
}
