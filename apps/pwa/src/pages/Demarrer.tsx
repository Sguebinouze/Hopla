import { ENTREE } from '../lib/routes';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Avatar } from '../composants/Avatar';
import { ChoixAvatar } from '../composants/ChoixAvatar';
import { ClavierCode, CodeVisible } from '../composants/ClavierCode';
import { InstructionsInstallation } from '../composants/Installation';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { api, type Classe, type Profil } from '../lib/donnees';
import { estInstallee, installationDirecte, installer, plateforme } from '../lib/installation';
import { aUneLv2, masqueesPourLv2, type Lv2 } from '../lib/packs';

const CLASSES: Classe[] = ['cp', 'ce1', 'ce2', 'cm1', 'cm2', '6e', '5e', '4e', '3e'];
const ETAPES = ['Votre adresse', 'Code parent', 'Vos enfants', 'Les appareils', 'Installer Hopla'] as const;
type Etape = 'code' | 'enfants' | 'appareils' | 'installer' | 'fin';
const NUMERO: Record<Etape, number> = { code: 2, enfants: 3, appareils: 4, installer: 5, fin: 5 };

interface EnfantAssistant extends Profil { classe?: Classe; ou: 'partage' | 'propre'; appairage?: string }

// Assistant de premier lancement côté parent (l'étape 1, l'adresse e-mail, est l'écran de connexion).
// Il sert aussi plus tard, depuis l'espace parent, pour ajouter un enfant ou un appareil (?etape=enfants).
export function Demarrer() {
  const naviguer = useNavigate();
  const [params] = useSearchParams();
  const [etape, setEtape] = useState<Etape | null>(null);
  const [enfants, setEnfants] = useState<EnfantAssistant[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    void (async () => {
      if (!(await api.parentConnecte())) return naviguer('/connexion', { replace: true });
      const ouvert = await api.modeParentActif().catch(() => false);
      const ps = await api.listeProfils().catch(() => []);
      setEnfants(ps.map((p) => ({ ...p, ou: 'partage' })));
      const voulue = params.get('etape') as Etape | null;
      setEtape(!ouvert ? 'code' : voulue && voulue !== 'code' ? voulue : 'enfants');
    })();
  }, [naviguer, params]);

  if (!etape) return <main className="ecran ecran--etroit" aria-busy="true" />;
  const n = NUMERO[etape];
  const suite = (e: Etape) => { setMessage(''); setEtape(e); window.scrollTo(0, 0); };

  return (
    <main className="ecran demarrer">
      <div className="ligne">
        <Link to={ENTREE} className="hp-iconbtn" aria-label="Quitter l’assistant"><Icone nom="fermer" /></Link>
        <div className="etapes pousse" aria-label={`Étape ${n} sur 5`}>
          <span className="etapes__nom">Étape {n} sur 5 · {etape === 'fin' ? 'C’est prêt' : ETAPES[n - 1]}</span>
          <div className="hp-progress hp-progress--sm" aria-hidden="true"><span style={{ width: `${(etape === 'fin' ? 1 : (n - 1) / 5) * 100}%` }} /></div>
        </div>
      </div>

      {etape === 'code' && <EtapeCode onFait={() => suite('enfants')} />}
      {etape === 'enfants' && (
        <EtapeEnfants enfants={enfants} onAjout={(e) => setEnfants((l) => [...l, e])} onSuite={() => suite('appareils')} />
      )}
      {etape === 'appareils' && (
        <EtapeAppareils enfants={enfants} onChange={(id, p) => setEnfants((l) => l.map((e) => (e.id === id ? { ...e, ...p } : e)))}
          onSuite={() => suite('installer')} onErreur={setMessage} />
      )}
      {etape === 'installer' && <EtapeInstaller enfantAvecAppareil={enfants.some((e) => e.ou === 'propre')} onSuite={() => suite('fin')} />}
      {etape === 'fin' && (
        <section className="demarrer__etape">
          <div className="hp-bubble">
            <Octave humeur="reussite" taille={80} />
            <div className="hp-bubble__text"><span className="hp-bubble__name">Octave</span>
              <h1 className="titre-2" style={{ margin: 0 }}>C’est prêt !</h1>
            </div>
          </div>
          <ul className="demarrer__recap">
            {enfants.map((e) => (
              <li key={e.id} className="hp-card">
                <Avatar teinte={e.avatar} taille={40} />
                <span className="pousse"><strong>{e.prenom}</strong><span className="muet"> · {e.ou === 'propre' ? 'sur son propre appareil' : 'sur cet appareil'}</span></span>
                {e.ou === 'partage' && <button type="button" className="hp-btn hp-btn--primary" onClick={() => naviguer(`/code/${e.id}`)}>Lancer sa séance</button>}
              </li>
            ))}
          </ul>
          <p className="muet" style={{ margin: 0 }}>Vous retrouverez la progression de chacun, les réglages et les appareils dans l’espace parent.</p>
          <Link to="/parent" className="hp-btn hp-btn--secondary hp-btn--block">Ouvrir l’espace parent</Link>
        </section>
      )}
      {message && <p className="erreur" role="alert">{message}</p>}
    </main>
  );
}

function EtapeCode({ onFait }: { onFait: () => void }) {
  const [existant, setExistant] = useState(false);
  const [code, setCode] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [enCours, setEnCours] = useState(false);

  const valider = async () => {
    setMessage('');
    if (!/^\d{4}$/.test(code)) return setMessage('Le code parent fait 4 chiffres.');
    if (!existant && code !== confirmation) return setMessage('Les deux codes ne sont pas identiques.');
    setEnCours(true);
    try {
      if (!existant) {
        try {
          await api.definirCodeParent(code);
        } catch (e) {
          if (/Mode parent requis/.test((e as Error).message)) {
            setExistant(true);
            setConfirmation('');
            return setMessage('Vous avez déjà un code parent : saisissez-le pour continuer.');
          }
          throw e;
        }
      }
      if (await api.ouvrirModeParent(code)) onFait();
      else setMessage('Code parent incorrect.');
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setEnCours(false);
    }
  };

  return (
    <form className="formulaire demarrer__etape" onSubmit={(e) => { e.preventDefault(); void valider(); }}>
      <h1 className="titre-1">{existant ? 'Votre code parent' : 'Choisissez votre code parent'}</h1>
      <p style={{ margin: 0 }}>
        4 chiffres, que vos enfants ne connaissent pas. Il protège l’espace parent (réglages, progression, appareils)
        quand vos enfants utilisent l’appareil.
      </p>
      <label>Code parent
        <input type="password" inputMode="numeric" autoComplete={existant ? 'current-password' : 'new-password'} pattern="[0-9]{4}" maxLength={4} required
          value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} />
      </label>
      {!existant && (
        <label>Confirmez-le
          <input type="password" inputMode="numeric" autoComplete="new-password" pattern="[0-9]{4}" maxLength={4} required
            value={confirmation} onChange={(e) => setConfirmation(e.target.value.replace(/\D/g, ''))} />
        </label>
      )}
      {api.mode === 'demo' && <p className="bandeau-demo">Démo : le code parent est 1111.</p>}
      {message && <p className="erreur" role="alert">{message}</p>}
      <button className="hp-btn hp-btn--primary hp-btn--lg" disabled={enCours}>Continuer</button>
    </form>
  );
}

function EtapeEnfants({ enfants, onAjout, onSuite }: {
  enfants: EnfantAssistant[]; onAjout: (e: EnfantAssistant) => void; onSuite: () => void;
}) {
  const vide = { prenom: '', classe: 'ce2' as Classe, avatar: 'orange', code: '', lv2: 'aucune' as Lv2 };
  const [ouvert, setOuvert] = useState(enfants.length === 0);
  const [f, setF] = useState(vide);
  const [message, setMessage] = useState('');
  const [enCours, setEnCours] = useState(false);
  const pret = f.prenom.trim().length > 0 && f.code.length === 4;

  const creer = async () => {
    setMessage('');
    setEnCours(true);
    try {
      const id = await api.creerEnfant(f);
      if (aUneLv2(f.classe)) {
        await api.reglerEnfant(id, {
          prenom: f.prenom.trim(), avatar: f.avatar, classe: f.classe, matieres_masquees: masqueesPourLv2(f.lv2), minutes_par_jour: null,
        });
      }
      onAjout({ id, prenom: f.prenom.trim(), avatar: f.avatar, classe: f.classe, code_type: 'chiffres', ou: 'partage' });
      setF(vide);
      setOuvert(false);
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setEnCours(false);
    }
  };

  return (
    <section className="demarrer__etape">
      <h1 className="titre-1">Vos enfants</h1>
      <p style={{ margin: 0 }}>Un profil par enfant. Hopla ne demande que son prénom (ou un pseudo), sa classe et un avatar.</p>

      {enfants.length > 0 && (
        <ul className="demarrer__recap">
          {enfants.map((e) => (
            <li key={e.id} className="hp-card">
              <Avatar teinte={e.avatar} taille={40} />
              <span className="pousse"><strong>{e.prenom}</strong>{e.classe && <span className="muet"> · {e.classe.toUpperCase()}</span>}</span>
              <span className="hp-chip hp-chip--success"><Icone nom="coche" taille={16} />Créé</span>
            </li>
          ))}
        </ul>
      )}

      {ouvert ? (
        <form className="formulaire hp-card demarrer__formulaire" onSubmit={(e) => { e.preventDefault(); if (pret) void creer(); }}>
          <h2 className="titre-2">{enfants.length === 0 ? 'Premier enfant' : 'Un autre enfant'}</h2>
          <label>Prénom ou pseudo<input required maxLength={40} autoComplete="off" value={f.prenom} onChange={(e) => setF({ ...f, prenom: e.target.value })} /></label>
          <label>Classe cette année
            <select value={f.classe} onChange={(e) => setF({ ...f, classe: e.target.value as Classe, code: '' })}>
              {CLASSES.map((c) => <option key={c} value={c}>{c.toUpperCase()}</option>)}
            </select>
          </label>
          {aUneLv2(f.classe) && (
            <label>Deuxième langue
              <select value={f.lv2} onChange={(e) => setF({ ...f, lv2: e.target.value as Lv2 })}>
                <option value="aucune">Aucune</option>
                <option value="allemand">Allemand</option>
                <option value="espagnol">Espagnol</option>
              </select>
            </label>
          )}
          <span className="demarrer__libelle">Avatar</span>
          <ChoixAvatar valeur={f.avatar} taille={44} onChange={(avatar) => setF({ ...f, avatar })} />
          <span className="demarrer__libelle">Son code secret</span>
          <p className="muet" style={{ margin: 0 }}>
            Le code se compose de 4 chiffres.
            {' '}{f.prenom.trim() || 'Votre enfant'} le tapera au début de chaque séance sur l’appareil partagé.
          </p>
          <ClavierCode pictos={false} saisie={f.code} masquer={false} onSaisie={(code) => setF({ ...f, code })} />
          {f.code.length === 4 && (
            <p className="demarrer__code">Son code : <CodeVisible code={f.code} pictos={false} /> Montrez-le-lui, ou notez-le.</p>
          )}
          {message && <p className="erreur" role="alert">{message}</p>}
          <button className="hp-btn hp-btn--primary hp-btn--lg" disabled={!pret || enCours}>
            {f.prenom.trim() ? `Créer le profil de ${f.prenom.trim()}` : 'Créer le profil'}
          </button>
          {enfants.length > 0 && <button type="button" className="hp-btn hp-btn--ghost" onClick={() => { setOuvert(false); setF(vide); }}>Annuler</button>}
        </form>
      ) : (
        <>
          <button type="button" className="hp-btn hp-btn--secondary hp-btn--block" onClick={() => setOuvert(true)}>
            <Icone nom="plus" />Ajouter un autre enfant
          </button>
          <button type="button" className="hp-btn hp-btn--primary hp-btn--lg hp-btn--block" onClick={onSuite}>Continuer</button>
        </>
      )}
    </section>
  );
}

function EtapeAppareils({ enfants, onChange, onSuite, onErreur }: {
  enfants: EnfantAssistant[];
  onChange: (id: string, p: Partial<EnfantAssistant>) => void;
  onSuite: () => void;
  onErreur: (m: string) => void;
}) {
  const adresse = location.origin.replace(/^https?:\/\//, '');
  return (
    <section className="demarrer__etape">
      <h1 className="titre-1">Où vos enfants révisent-ils ?</h1>
      <p style={{ margin: 0 }}>Sur cet appareil, chacun choisit son profil et tape son code. Sur son propre téléphone ou sa tablette, Hopla s’ouvre directement sur son espace.</p>
      {enfants.map((e) => (
        <div key={e.id} className="hp-card demarrer__appareil">
          <div className="ligne">
            <Avatar teinte={e.avatar} taille={40} />
            <strong className="pousse">{e.prenom}</strong>
          </div>
          <div className="demarrer__choix" role="radiogroup" aria-label={`Appareil de ${e.prenom}`}>
            {(['partage', 'propre'] as const).map((ou) => (
              <button key={ou} type="button" role="radio" aria-checked={e.ou === ou}
                className={`demarrer__option${e.ou === ou ? ' demarrer__option--choisie' : ''}`} onClick={() => onChange(e.id, { ou })}>
                <span className="demarrer__rond" aria-hidden="true">{e.ou === ou && <Icone nom="coche" taille={14} />}</span>
                {ou === 'partage' ? 'Cet appareil, partagé' : 'Son propre appareil'}
              </button>
            ))}
          </div>
          {e.ou === 'propre' && (e.appairage ? (
            <div className="demarrer__appairage">
              <p className="code-lisible">{e.appairage.slice(0, 4)}-{e.appairage.slice(4)}</p>
              <ol>
                <li>Sur l’appareil de {e.prenom}, ouvrez <strong>{adresse}</strong> et installez Hopla (étape suivante).</li>
                <li>Ouvrez Hopla depuis son icône et touchez « Je suis un enfant, j’ai un code ».</li>
                <li>Saisissez ce code : l’appareil s’ouvrira ensuite toujours sur l’espace de {e.prenom}.</li>
              </ol>
              <p className="muet" style={{ margin: 0 }}>Valable 10 minutes, une seule fois. Expiré ?
                <button type="button" className="hp-btn hp-btn--ghost" onClick={() => void api.creerAppairage(e.id).then((c) => onChange(e.id, { appairage: c })).catch((x: Error) => onErreur(x.message))}>Nouveau code</button>
              </p>
            </div>
          ) : (
            <button type="button" className="hp-btn hp-btn--secondary" style={{ alignSelf: 'flex-start' }}
              onClick={() => void api.creerAppairage(e.id).then((c) => onChange(e.id, { appairage: c })).catch((x: Error) => onErreur(x.message))}>
              Afficher le code pour son appareil
            </button>
          ))}
        </div>
      ))}
      <p className="muet" style={{ margin: 0 }}>Vous pourrez changer d’avis à tout moment : fiche de l’enfant, onglet Réglages, rubrique Appareils.</p>
      <button type="button" className="hp-btn hp-btn--primary hp-btn--lg hp-btn--block" onClick={onSuite}>Continuer</button>
    </section>
  );
}

function EtapeInstaller({ enfantAvecAppareil, onSuite }: { enfantAvecAppareil: boolean; onSuite: () => void }) {
  const [installee, setInstallee] = useState(estInstallee());
  const p = plateforme();
  return (
    <section className="demarrer__etape">
      <h1 className="titre-1">Installer Hopla</h1>
      {installee ? (
        <p className="hp-card" style={{ margin: 0 }}><Icone nom="coche" /> Hopla est installé sur cet appareil.</p>
      ) : (
        <>
          <p style={{ margin: 0 }}>Hopla s’installe comme une app, sans passer par un store : une icône sur l’écran d’accueil, et le travail continue même sans réseau.</p>
          {installationDirecte() ? (
            <button type="button" className="hp-btn hp-btn--primary hp-btn--lg hp-btn--block"
              onClick={() => void installer().then((ok) => ok && setInstallee(true))}>Installer Hopla</button>
          ) : (
            <InstructionsInstallation plateforme={p} className="hp-card demarrer__instructions" />
          )}
        </>
      )}
      {enfantAvecAppareil && (
        <p style={{ margin: 0 }}>Faites la même chose sur l’appareil de chaque enfant qui a le sien, <strong>avant</strong> d’y saisir son code.</p>
      )}
      <button type="button" className="hp-btn hp-btn--primary hp-btn--lg hp-btn--block" onClick={onSuite}>{installee ? 'Continuer' : 'C’est fait, ou plus tard'}</button>
    </section>
  );
}
