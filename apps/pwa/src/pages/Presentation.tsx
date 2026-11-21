import { useEffect, useState, type CSSProperties } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { BoutonTheme } from '../composants/BoutonTheme';
import { Icone, type NomIcone } from '../composants/Icone';
import { InstructionsInstallation, LIENS_STORES } from '../composants/Installation';
import { Marque } from '../composants/Marque';
import { PiedDePage } from '../composants/PiedDePage';
import { QrCode } from '../composants/QrCode';
import { surAppareilEnfant } from '../lib/donnees';
import { estInstallee, installationDirecte, installer, plateforme, type Plateforme } from '../lib/installation';
import { ENTREE } from '../lib/routes';

// Page de présentation, à la racine du site. L'app commence à ENTREE.
// N'est jamais montrée dans l'app installée ni sur l'appareil d'un enfant : on va directement à l'app.
// Animations sobres (apparition au défilement, tuiles qui se retournent au survol), coupées si
// l'appareil demande moins d'animations.

const ETAPES = [
  { titre: 'Le parent crée l’espace famille', texte: 'Un e-mail, puis un prénom, un avatar et une classe par enfant.' },
  { titre: 'L’enfant entre avec son code', texte: 'Sur l’appareil de la famille ou sur le sien.' },
  { titre: 'Un peu chaque jour', texte: 'Une mission courte, une leçon s’il bloque, Octave pour l’encourager.' },
];

type Tuile = { icone: NomIcone; titre: string; texte: string };

const ONGLETS: Record<'enfant' | 'parents', { libelle: string; tuiles: Tuile[] }> = {
  enfant: {
    libelle: 'Pour l’enfant',
    tuiles: [
      { icone: 'livre', titre: 'Des leçons en étapes', texte: 'Découvrir, retenir, éviter le piège, puis s’exercer.' },
      { icone: 'eclair', titre: 'Le défi chrono', texte: 'Le plus de bonnes réponses en une minute, pour gagner en aisance.' },
      { icone: 'cahier', titre: 'Le contrôle à préparer', texte: 'Il choisit les notions et la date. La mission du jour les fait réviser jusque-là.' },
      { icone: 'appareil', titre: 'La photo de leçon', texte: 'Il photographie sa leçon, Hopla propose les exercices qui vont avec. La photo reste sur l’appareil.' },
      { icone: 'haut-parleur', titre: 'Les dictées', texte: 'Hopla lit la dictée comme en classe, puis montre le texte pour se corriger.' },
      { icone: 'coupe', titre: 'Jeux et quiz', texte: 'Des jeux de réflexion et un quiz de culture du jour, pour souffler.' },
    ],
  },
  parents: {
    libelle: 'Pour les parents',
    tuiles: [
      { icone: 'famille', titre: 'Le suivi de chaque enfant', texte: 'Le temps passé, les notions acquises et celles à revoir.' },
      { icone: 'cadenas', titre: 'Le minimum de données', texte: 'Un prénom, un avatar et une classe. Ni publicité, ni mesure d’audience, ni traceur.' },
      { icone: 'nuage', titre: 'Même sans réseau', texte: 'Le travail continue hors connexion, à la maison comme en voiture.' },
      { icone: 'appareil', titre: 'Partagé ou personnel', texte: 'Un appareil pour toute la famille, ou celui de l’enfant. Chacun entre avec son code.' },
    ],
  },
};

const NOMS_PLATEFORMES: Record<Plateforme, string> = { ios: 'iPhone et iPad', android: 'Android', autre: 'Ordinateur' };

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
        <section className="vitrine__cadre vitrine__hero">
          <div className="vitrine__hero-texte">
            <span className="hp-chip hp-chip--primary">Du CP à la 3e</span>
            <h1 className="vitrine__titre">Réviser un peu chaque jour, à son rythme</h1>
            <p className="vitrine__chapo">
              Des séances courtes, des leçons claires et un compagnon, Octave, pour avancer pas à pas.
              Chaque notion suit le programme officiel de la classe.
            </p>
            <div className="vitrine__actions">
              <Link to="/connexion" className="hp-btn hp-btn--primary hp-btn--lg">Créer l’espace famille</Link>
              <Link to="/appairer" className="hp-btn hp-btn--secondary hp-btn--lg">J’ai un code enfant</Link>
            </div>
          </div>
        </section>

        <section id="fonctionnement" className="vitrine__cadre vitrine__fonctionnement" aria-label="Comment ça marche">
          <ol className="vitrine__etapes">
            {ETAPES.map((e, i) => (
              <li key={e.titre} className="vitrine__etape" data-apparition style={{ '--i': i } as CSSProperties}>
                <span className="vitrine__numero" aria-hidden="true">{i + 1}</span>
                <div>
                  <h2 className="vitrine__etape-titre">{e.titre}</h2>
                  <p>{e.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="decouvrir" className="vitrine__section vitrine__section--teinte">
          <div className="vitrine__cadre">
            <div className="vitrine__tete" data-apparition>
              <h2 className="vitrine__titre-section">Tout le programme, du CP à la 3e</h2>
              <div className="hp-segment" role="group" aria-label="Afficher">
                {(Object.keys(ONGLETS) as (keyof typeof ONGLETS)[]).map((o) => (
                  <button key={o} type="button" aria-pressed={onglet === o} onClick={() => setOnglet(o)}>{ONGLETS[o].libelle}</button>
                ))}
              </div>
            </div>
            <ul key={onglet} className={`vitrine__tuiles vitrine__tuiles--${onglet}`}>
              {ONGLETS[onglet].tuiles.map((t, i) => (
                <li key={t.titre} className="tuile" tabIndex={0} style={{ '--i': i } as CSSProperties}>
                  <div className="tuile__face">
                    <span className="tuile__icone"><Icone nom={t.icone} taille={28} /></span>
                    <h3 className="tuile__titre">{t.titre}</h3>
                  </div>
                  <span className="tuile__indice" aria-hidden="true"><Icone nom="plus" taille={16} /></span>
                  <p className="tuile__texte">{t.texte}</p>
                </li>
              ))}
            </ul>
            <p className="muet vitrine__note" data-apparition>
              Conçu d’après les programmes officiels de l’Éducation nationale. Hopla complète le travail fait en classe, il ne le remplace pas.
            </p>
          </div>
        </section>

        <Installer />
      </main>

      <PiedDePage />
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
    <section id="installer" className="vitrine__section">
      <div className="vitrine__cadre vitrine__installer">
        <div className="vitrine__installer-texte" data-apparition>
          <h2 className="vitrine__titre-section">Installer Hopla</h2>
          <p>Hopla s’installe depuis le navigateur, sans store : une icône sur l’écran d’accueil, et le travail continue sans réseau.</p>
          {installee ? (
            <p className="hp-card"><Icone nom="coche" /> Hopla est installé sur cet appareil.</p>
          ) : direct ? (
            <button type="button" className="hp-btn hp-btn--primary hp-btn--lg"
              onClick={() => void installer().then((ok) => { setInstallee(ok); setDirect(false); })}>Installer Hopla</button>
          ) : null}
          {(LIENS_STORES.appStore || LIENS_STORES.googlePlay) && (
            <div className="vitrine__stores">
              {LIENS_STORES.appStore && <a className="hp-btn hp-btn--secondary" href={LIENS_STORES.appStore}>App Store</a>}
              {LIENS_STORES.googlePlay && <a className="hp-btn hp-btn--secondary" href={LIENS_STORES.googlePlay}>Google Play</a>}
            </div>
          )}
          <div className="vitrine__qr">
            <QrCode taille={128} label="QR code : ouvrir Hopla sur un téléphone ou une tablette" />
            <p className="muet">Scannez avec le téléphone ou la tablette de l’enfant pour y ouvrir Hopla.</p>
          </div>
        </div>
        <div className="hp-card vitrine__plateforme" data-apparition>
          <div className="hp-segment" role="group" aria-label="Appareil">
            {(['ios', 'android', 'autre'] as const).map((x) => (
              <button key={x} type="button" aria-pressed={p === x} onClick={() => setP(x)}>{NOMS_PLATEFORMES[x]}</button>
            ))}
          </div>
          <InstructionsInstallation key={p} plateforme={p} className="vitrine__instructions" />
        </div>
      </div>
    </section>
  );
}
