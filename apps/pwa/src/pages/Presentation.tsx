import { useEffect, useState, type CSSProperties } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { BoutonTheme } from '../composants/BoutonTheme';
import { Icone, type NomIcone } from '../composants/Icone';
import { InstructionsInstallation, LIENS_STORES } from '../composants/Installation';
import { Marque } from '../composants/Marque';
import { Octave } from '../composants/Octave';
import { PiedDePage } from '../composants/PiedDePage';
import { QrCode } from '../composants/QrCode';
import { surAppareilEnfant } from '../lib/donnees';
import { estInstallee, installationDirecte, installer, plateforme, type Plateforme } from '../lib/installation';
import { ENTREE } from '../lib/routes';

// Page de présentation, à la racine du site. L'app commence à ENTREE.
// N'est jamais montrée dans l'app installée ni sur l'appareil d'un enfant : on va directement à l'app.
// Tenue en deux écrans : l'accroche avec des questions d'exemple à essayer, puis le programme et
// l'installation côte à côte. Couleurs des matières du DS ; animations coupées si l'appareil le demande.

const ETAPES = [
  { titre: 'Le parent crée l’espace', texte: 'Un prénom, un avatar et une classe par enfant.', couleur: 'primary' },
  { titre: 'L’enfant entre avec son code', texte: 'Sur l’appareil de la famille ou le sien.', couleur: 'sun' },
  { titre: 'Un peu chaque jour', texte: 'Une mission courte, et Octave pour encourager.', couleur: 'octave' },
];

/** Questions d'exemple, tirées des cours de Hopla. La bonne réponse est `reponse`. */
const EXEMPLES: { classe: string; matiere: string; subj: string; question: string; options: string[]; reponse: string; bravo: string }[] = [
  { classe: 'CP', matiere: 'Maths', subj: 'maths', question: 'Quel est le double de 8 ?', options: ['10', '16', '4'], reponse: '16', bravo: '8 + 8 = 16.' },
  { classe: 'CE1', matiere: 'Français', subj: 'francais', question: 'Un cheval, des… ?', options: ['chevals', 'chevaux', 'chevale'], reponse: 'chevaux', bravo: 'Les noms en -al font leur pluriel en -aux.' },
  { classe: 'CE2', matiere: 'Sciences', subj: 'sciences', question: 'À quelle température l’eau bout-elle ?', options: ['0 °C', '37 °C', '100 °C'], reponse: '100 °C', bravo: 'Elle devient alors vapeur.' },
  { classe: '6e', matiere: 'Maths', subj: 'maths', question: 'Quelle est la moitié de 0,5 ?', options: ['0,25', '0,05', '1'], reponse: '0,25', bravo: '0,25 + 0,25 = 0,5.' },
  { classe: 'CP', matiere: 'Géographie', subj: 'histgeo', question: 'Quel est le plus grand océan ?', options: ['l’Atlantique', 'le Pacifique', 'l’océan Indien'], reponse: 'le Pacifique', bravo: 'C’est le plus grand du monde.' },
];

type Tuile = { icone: NomIcone; titre: string; texte: string; subj: string };

const ONGLETS: Record<'enfant' | 'parents', { libelle: string; tuiles: Tuile[] }> = {
  enfant: {
    libelle: 'Pour l’enfant',
    tuiles: [
      { icone: 'livre', subj: 'francais', titre: 'Des leçons en étapes', texte: 'Découvrir, retenir, éviter le piège, puis s’exercer.' },
      { icone: 'eclair', subj: 'maths', titre: 'Le défi chrono', texte: 'Le plus de bonnes réponses en une minute, pour gagner en aisance.' },
      { icone: 'cahier', subj: 'sciences', titre: 'Le contrôle à préparer', texte: 'Il choisit les notions et la date. La mission du jour les fait réviser.' },
      { icone: 'appareil', subj: 'histgeo', titre: 'La photo de leçon', texte: 'Il photographie sa leçon, Hopla propose les exercices qui vont avec.' },
      { icone: 'haut-parleur', subj: 'langues', titre: 'Les dictées', texte: 'Hopla lit la dictée comme en classe, puis montre le texte.' },
      { icone: 'coupe', subj: 'physique', titre: 'Jeux et quiz', texte: 'Des jeux de réflexion et un quiz de culture du jour.' },
    ],
  },
  parents: {
    libelle: 'Pour les parents',
    tuiles: [
      { icone: 'famille', subj: 'emc', titre: 'Le suivi de chaque enfant', texte: 'Le temps passé, les notions acquises et celles à revoir.' },
      { icone: 'cadenas', subj: 'maths', titre: 'Le minimum de données', texte: 'Un prénom, un avatar, une classe. Ni publicité, ni traceur.' },
      { icone: 'nuage', subj: 'sciences', titre: 'Même sans réseau', texte: 'Le travail continue hors connexion, à la maison comme en voiture.' },
      { icone: 'appareil', subj: 'langues', titre: 'Partagé ou personnel', texte: 'Un appareil pour la famille, ou celui de l’enfant, avec son code.' },
    ],
  },
};

const NOMS_PLATEFORMES: Record<Plateforme, string> = { ios: 'iPhone, iPad', android: 'Android', autre: 'Ordinateur' };

const moinsDAnimations = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Retour vers l'app d'un lien de connexion qui arrive encore à la racine (anciens e-mails). */
const retourConnexion = () => /access_token|error/.test(location.hash) || /[?&]code=/.test(location.search);

/** Fait apparaître les blocs marqués data-apparition quand ils entrent dans l'écran (une seule fois). */
function useApparition() {
  useEffect(() => {
    const blocs = document.querySelectorAll<HTMLElement>('[data-apparition]');
    if (moinsDAnimations() || !('IntersectionObserver' in window)) {
      blocs.forEach((b) => b.classList.add('apparu'));
      return;
    }
    const obs = new IntersectionObserver((entrees) => {
      for (const e of entrees) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('apparu');
        obs.unobserve(e.target);
      }
    }, { rootMargin: '0px 0px -8% 0px' });
    blocs.forEach((b) => obs.observe(b));
    return () => obs.disconnect();
  }, []);
}

export function Presentation() {
  const { hash } = useLocation();
  const [onglet, setOnglet] = useState<'enfant' | 'parents'>('enfant');
  useApparition();

  // Ancres : le routeur ne fait pas défiler la page tout seul. #parents ouvre l'onglet des parents.
  useEffect(() => {
    if (!hash || retourConnexion()) return;
    if (hash === '#parents') setOnglet('parents');
    document.getElementById(hash === '#parents' ? 'decouvrir' : hash.slice(1))?.scrollIntoView({ behavior: moinsDAnimations() ? 'auto' : 'smooth' });
  }, [hash]);

  if (retourConnexion()) return <Navigate to={`${ENTREE}${location.search}${location.hash}`} replace />;
  if (estInstallee() || surAppareilEnfant()) return <Navigate to={ENTREE} replace />;

  return (
    <div className="vitrine">
      <header className="vitrine__entete">
        <div className="vitrine__cadre vitrine__barre">
          <Link to="/" className="vitrine__logo" aria-label="Hopla, accueil"><Marque /></Link>
          <nav className="vitrine__nav" aria-label="Sections">
            <Link to="/#fonctionnement">Comment ça marche</Link>
            <Link to="/#parents">Parents</Link>
            <Link to="/#installer">Installer</Link>
          </nav>
          <BoutonTheme />
          <Link to={ENTREE} className="hp-btn hp-btn--primary">Ouvrir Hopla</Link>
        </div>
      </header>

      <main>
        <section className="vitrine__une">
          <div className="vitrine__cadre vitrine__hero">
            <div className="vitrine__hero-texte">
              <span className="hp-chip hp-chip--sun">Du CP à la 3e</span>
              <h1 className="vitrine__titre">Réviser un peu chaque jour, <span className="vitrine__surligne">à son rythme</span></h1>
              <p className="vitrine__chapo">Des séances courtes, des leçons claires et Octave pour avancer pas à pas. Chaque notion suit le programme officiel.</p>
              <div className="vitrine__actions">
                <Link to="/connexion" className="hp-btn hp-btn--primary hp-btn--lg">Créer l’espace famille</Link>
                <Link to="/appairer" className="hp-btn hp-btn--secondary hp-btn--lg">J’ai un code enfant</Link>
              </div>
              <ol id="fonctionnement" className="vitrine__etapes" aria-label="Comment ça marche">
                {ETAPES.map((e, i) => (
                  <li key={e.titre} className={`vitrine__etape vitrine__etape--${e.couleur}`}>
                    <span className="vitrine__numero" aria-hidden="true">{i + 1}</span>
                    <div>
                      <h2 className="vitrine__etape-titre">{e.titre}</h2>
                      <p>{e.texte}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <Essai />
          </div>
        </section>

        <section id="decouvrir" className="vitrine__section vitrine__section--teinte">
          <div className="vitrine__cadre vitrine__duo">
            <div className="vitrine__programme" data-apparition>
              <div className="vitrine__tete">
                <h2 className="vitrine__titre-section">Tout le programme, du CP à la 3e</h2>
                <div className="hp-segment" role="group" aria-label="Afficher">
                  {(Object.keys(ONGLETS) as (keyof typeof ONGLETS)[]).map((o) => (
                    <button key={o} type="button" aria-pressed={onglet === o} onClick={() => setOnglet(o)}>{ONGLETS[o].libelle}</button>
                  ))}
                </div>
              </div>
              <ul key={onglet} className={`vitrine__tuiles vitrine__tuiles--${onglet}`}>
                {ONGLETS[onglet].tuiles.map((t, i) => (
                  <li key={t.titre} className={`tuile hp-subj-${t.subj}`} tabIndex={0} style={{ '--i': i } as CSSProperties}>
                    <div className="tuile__face">
                      <span className="tuile__icone"><Icone nom={t.icone} taille={22} /></span>
                      <h3 className="tuile__titre">{t.titre}</h3>
                    </div>
                    <span className="tuile__indice" aria-hidden="true"><Icone nom="plus" taille={14} /></span>
                    <p className="tuile__texte">{t.texte}</p>
                  </li>
                ))}
              </ul>
              <p className="muet vitrine__note">Conçu d’après les programmes officiels. Hopla complète la classe, il ne la remplace pas.</p>
            </div>
            <Installer />
          </div>
        </section>
      </main>

      <PiedDePage />
    </div>
  );
}

/**
 * Questions d'exemple à essayer : une carte par question, avec la matière et la classe.
 * Défile seule toutes les 6 secondes, sauf si le visiteur la survole ou vient de répondre.
 */
function Essai() {
  const [i, setI] = useState(0);
  const [choix, setChoix] = useState<string | null>(null);
  // Pause tant que la souris est sur la carte ou que le clavier y est (focus).
  const [survol, setSurvol] = useState(false);
  const [focus, setFocus] = useState(false);
  const pause = survol || focus;
  const ex = EXEMPLES[i]!;
  const aller = (n: number) => {
    setI((n + EXEMPLES.length) % EXEMPLES.length);
    setChoix(null);
    // Le bouton répondu est désactivé : le navigateur lui retire le focus sans toujours émettre blur.
    setFocus(false);
  };

  useEffect(() => {
    if (moinsDAnimations()) return;
    // Après une réponse, on passe à la suivante au bout de 3,5 s, même sous la souris :
    // la pause ne vaut que pour laisser le temps de lire et de répondre.
    if (choix) {
      const t = setTimeout(() => aller(i + 1), 3500);
      return () => clearTimeout(t);
    }
    if (pause) return;
    const t = setTimeout(() => aller(i + 1), 6000);
    return () => clearTimeout(t);
  }, [i, choix, pause]);

  const juste = choix === ex.reponse;
  return (
    <div className="essai" onMouseEnter={() => setSurvol(true)} onMouseLeave={() => setSurvol(false)}
      onFocus={() => setFocus(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false); }}>
      <div key={i} className={`hp-card essai__carte hp-subj-${ex.subj}`} aria-live="polite">
        <div className="essai__haut">
          <span className="essai__matiere">{ex.matiere} · {ex.classe}</span>
          <span className="essai__invite">Essaie une question de Hopla</span>
        </div>
        <p className="essai__question">{ex.question}</p>
        <div className="essai__options">
          {ex.options.map((o) => (
            <button key={o} type="button" disabled={choix !== null}
              className={`hp-option${choix !== null && o === ex.reponse ? ' hp-option--correct' : ''}${choix === o && !juste ? ' hp-option--wrong' : ''}`}
              onClick={() => setChoix(o)}>{o}</button>
          ))}
        </div>
        {/* Octave occupe la même place avant et après la réponse : la carte ne change pas de hauteur. */}
        <div className="essai__octave">
          <span className="vitrine__octave"><Octave taille={56} humeur={choix ? (juste ? 'reussite' : 'oups') : 'accueil'} /></span>
          {choix === null ? (
            <p className="hp-bubble__text essai__bulle">À toi ! Choisis une réponse.</p>
          ) : (
            <div className={`hp-feedback ${juste ? 'hp-feedback--success' : 'hp-feedback--attention'} essai__retour`}>
              <div>
                <p className="hp-feedback__title">{juste ? 'Bravo !' : `C’était : ${ex.reponse}`}</p>
                <p className="hp-feedback__text">{ex.bravo}</p>
              </div>
            </div>
          )}
        </div>
        <div className="essai__points" role="group" aria-label="Choisir une question">
          {EXEMPLES.map((e, n) => (
            <button key={n} type="button" aria-label={`Question ${n + 1} : ${e.matiere}, ${e.classe}`} aria-current={n === i}
              className="essai__point" onClick={() => aller(n)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Installer() {
  const [p, setP] = useState<Plateforme>(plateforme);
  const [installee, setInstallee] = useState(false);
  const [direct, setDirect] = useState(installationDirecte);
  // L'invite d'installation du navigateur peut arriver après le premier affichage.
  useEffect(() => {
    const maj = () => setDirect(installationDirecte());
    window.addEventListener('beforeinstallprompt', maj);
    return () => window.removeEventListener('beforeinstallprompt', maj);
  }, []);

  return (
    <aside id="installer" className="vitrine__installer" data-apparition>
      <div className="vitrine__installer-tete">
        <span className="tuile__icone vitrine__installer-icone"><Icone nom="appareil" taille={22} /></span>
        <h2 className="vitrine__titre-carte">Installer Hopla</h2>
      </div>
      <p>Depuis le navigateur, sans store. Le travail continue sans réseau.</p>
      <div className="hp-segment" role="group" aria-label="Appareil">
        {(['ios', 'android', 'autre'] as const).map((x) => (
          <button key={x} type="button" aria-pressed={p === x} onClick={() => setP(x)}>{NOMS_PLATEFORMES[x]}</button>
        ))}
      </div>
      <InstructionsInstallation key={p} plateforme={p} className="vitrine__instructions" />
      {(LIENS_STORES.appStore || LIENS_STORES.googlePlay) && (
        <div className="vitrine__stores">
          {LIENS_STORES.appStore && <a className="hp-btn hp-btn--secondary" href={LIENS_STORES.appStore}>App Store</a>}
          {LIENS_STORES.googlePlay && <a className="hp-btn hp-btn--secondary" href={LIENS_STORES.googlePlay}>Google Play</a>}
        </div>
      )}
      <div className="vitrine__installer-bas">
        <div className="vitrine__qr">
          <QrCode taille={96} label="QR code : ouvrir Hopla sur un téléphone ou une tablette" />
          <p className="muet">Scannez avec le téléphone ou la tablette de l’enfant.</p>
        </div>
        {installee ? (
          <p className="muet"><Icone nom="coche" taille={16} /> Installé sur cet appareil.</p>
        ) : direct ? (
          <button type="button" className="hp-btn hp-btn--primary"
            onClick={() => void installer().then((ok) => { setInstallee(ok); setDirect(false); })}>Installer</button>
        ) : null}
      </div>
    </aside>
  );
}
