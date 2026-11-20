import { useEffect, useState } from 'react';
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

const MATIERES: { classe: string; nom: string; icone: NomIcone; classes: string }[] = [
  { classe: 'hp-subj-francais', nom: 'Français', icone: 'plume', classes: 'CP à 3e' },
  { classe: 'hp-subj-maths', nom: 'Mathématiques', icone: 'operations', classes: 'CP à 3e' },
  { classe: 'hp-subj-histgeo', nom: 'Histoire-géographie', icone: 'globe', classes: 'CM1 à 3e' },
  { classe: 'hp-subj-sciences', nom: 'Sciences', icone: 'feuille', classes: 'CP à 3e' },
  { classe: 'hp-subj-physique', nom: 'Physique-chimie', icone: 'atome', classes: '5e à 3e' },
  { classe: 'hp-subj-techno', nom: 'Technologie', icone: 'puce', classes: '5e à 3e' },
  { classe: 'hp-subj-langues', nom: 'Langues vivantes', icone: 'bulles', classes: 'CP à 3e' },
  { classe: 'hp-subj-emc', nom: 'Enseignement moral et civique', icone: 'balance', classes: 'CP à 3e' },
];

const ETAPES = [
  { titre: 'Le parent crée l’espace famille', texte: 'Une adresse e-mail suffit. Pour chaque enfant : un prénom, un avatar et sa classe.' },
  { titre: 'L’enfant entre avec son code', texte: 'Sur l’appareil de la famille ou sur le sien. Il ne voit que sa propre progression.' },
  { titre: 'Un peu chaque jour', texte: 'Une mission courte, une leçon quand il bloque, et Octave pour l’encourager.' },
];

const CONTENUS: { icone: NomIcone; titre: string; texte: string }[] = [
  { icone: 'livre', titre: 'Des leçons en étapes', texte: 'Découvrir, retenir, éviter le piège, puis s’exercer.' },
  { icone: 'eclair', titre: 'Le défi chrono', texte: 'Le plus de bonnes réponses en une minute, pour gagner en aisance.' },
  { icone: 'cahier', titre: 'Le contrôle à préparer', texte: 'L’enfant choisit les notions et la date. La mission du jour les fait réviser jusque-là.' },
  { icone: 'appareil', titre: 'La photo de leçon', texte: 'Il photographie sa leçon du cahier, Hopla propose les exercices qui vont avec. La photo reste sur l’appareil.' },
  { icone: 'haut-parleur', titre: 'Les dictées', texte: 'Hopla lit la dictée comme en classe, puis montre le texte pour se corriger.' },
  { icone: 'coupe', titre: 'Jeux et quiz', texte: 'Des jeux de réflexion et un quiz de culture du jour, pour souffler entre deux séances.' },
];

const PARENTS: { icone: NomIcone; titre: string; texte: string }[] = [
  { icone: 'famille', titre: 'Le suivi de chaque enfant', texte: 'Le temps passé, les notions acquises et celles à revoir.' },
  { icone: 'cadenas', titre: 'Le minimum de données', texte: 'Un prénom, un avatar et une classe. Ni publicité, ni mesure d’audience, ni traceur.' },
  { icone: 'nuage', titre: 'Même sans réseau', texte: 'Le travail continue hors connexion, à la maison comme en voiture.' },
  { icone: 'appareil', titre: 'Partagé ou personnel', texte: 'Un appareil pour toute la famille, ou celui de l’enfant. Chacun entre avec son code secret.' },
];

const NOMS_PLATEFORMES: Record<Plateforme, string> = { ios: 'iPhone et iPad', android: 'Android', autre: 'Ordinateur' };

/** Retour vers l'app d'un lien de connexion qui arrive encore à la racine (anciens e-mails). */
const retourConnexion = () => /access_token|error/.test(location.hash) || /[?&]code=/.test(location.search);

export function Presentation() {
  const { hash } = useLocation();

  // Ancres (#installer, #parents...) : le routeur ne fait pas défiler la page tout seul.
  useEffect(() => {
    if (!hash || retourConnexion()) return;
    document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  if (retourConnexion()) return <Navigate to={`${ENTREE}${location.search}${location.hash}`} replace />;
  if (estInstallee() || surAppareilEnfant()) return <Navigate to={ENTREE} replace />;

  return (
    <div className="vitrine">
      <header className="vitrine__entete">
        <div className="vitrine__cadre vitrine__barre">
          <Link to="/" className="vitrine__logo" aria-label="Hopla, accueil"><Marque /></Link>
          <nav className="vitrine__nav" aria-label="Sections">
            <a href="#fonctionnement">Comment ça marche</a>
            <a href="#parents">Parents</a>
            <a href="#installer">Installer</a>
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
            <p className="muet">Le parent crée le compte. L’enfant n’a besoin que de son code.</p>
          </div>
          <Apercu />
        </section>

        <section id="fonctionnement" className="vitrine__section">
          <div className="vitrine__cadre">
            <h2 className="vitrine__titre-section">Comment ça marche</h2>
            <ol className="vitrine__etapes">
              {ETAPES.map((e, i) => (
                <li key={e.titre} className="hp-card vitrine__etape">
                  <span className="vitrine__numero" aria-hidden="true">{i + 1}</span>
                  <h3 className="titre-2">{e.titre}</h3>
                  <p>{e.texte}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="matieres" className="vitrine__section vitrine__section--teinte">
          <div className="vitrine__cadre">
            <h2 className="vitrine__titre-section">Les matières de l’école et du collège</h2>
            <ul className="vitrine__matieres">
              {MATIERES.map((m) => (
                <li key={m.nom} className={`hp-subject ${m.classe}`}>
                  <span className="hp-subject__icon"><Icone nom={m.icone} /></span>
                  <span className="hp-subject__name">{m.nom}</span>
                  <span className="hp-subject__meta">{m.classes}</span>
                </li>
              ))}
            </ul>
            <p className="mention-programmes">
              <strong>Conçu d’après les programmes officiels de l’Éducation nationale.</strong> Hopla complète le travail
              fait en classe, il ne le remplace pas.
            </p>
          </div>
        </section>

        <section id="contenu" className="vitrine__section">
          <div className="vitrine__cadre">
            <h2 className="vitrine__titre-section">Ce que l’enfant y trouve</h2>
            <ul className="vitrine__grille">
              {CONTENUS.map((c) => <Atout key={c.titre} {...c} />)}
            </ul>
          </div>
        </section>

        <section id="parents" className="vitrine__section vitrine__section--teinte">
          <div className="vitrine__cadre vitrine__deux">
            <div>
              <h2 className="vitrine__titre-section">Pour les parents</h2>
              <ul className="vitrine__liste">
                {PARENTS.map((p) => <Atout key={p.titre} {...p} nu />)}
              </ul>
            </div>
            <ApercuParent />
          </div>
        </section>

        <Installer />
      </main>

      <PiedDePage />
    </div>
  );
}

function Atout({ icone, titre, texte, nu = false }: { icone: NomIcone; titre: string; texte: string; nu?: boolean }) {
  return (
    <li className={nu ? 'vitrine__atout' : 'hp-card vitrine__atout'}>
      <span className="vitrine__pictogramme"><Icone nom={icone} /></span>
      <div>
        <h3 className="vitrine__atout-titre">{titre}</h3>
        <p>{texte}</p>
      </div>
    </li>
  );
}

/** Aperçu de l'espace de l'enfant, fait des composants du DS. Illustration : rien n'est cliquable. */
function Apercu() {
  return (
    <div className="vitrine__apercu" aria-hidden="true">
      <div className="hp-bubble">
        <Octave taille={72} />
        <p className="hp-bubble__text"><span className="hp-bubble__name">Octave</span>Bonjour Léa ! Trois missions aujourd’hui.</p>
      </div>
      <div className="hp-mission vitrine__mission">
        <div className="ligne">
          <span className="hp-mission__title pousse">Mission du jour</span>
          <span className="hp-chip hp-chip--streak"><Icone nom="flamme" />5</span>
        </div>
        <span className="hp-mission__item hp-mission__item--done"><span className="hp-check"><Icone nom="coche" taille={14} /></span>Maths · Les compléments à 10</span>
        <span className="hp-mission__item hp-mission__item--current"><span className="hp-check" />Français · Le pluriel des noms</span>
        <span className="hp-mission__item"><span className="hp-check" />Questionner le monde · Les saisons</span>
      </div>
      <div className="hp-feedback hp-feedback--success">
        <Icone nom="coche" />
        <div>
          <p className="hp-feedback__title">Bravo !</p>
          <p className="hp-feedback__text">Un cheval, des chevaux : tu as trouvé.</p>
        </div>
      </div>
    </div>
  );
}

/** Aperçu de l'espace parent. Chiffres d'exemple. */
function ApercuParent() {
  return (
    <figure className="vitrine__parent" aria-label="Exemple de suivi dans l’espace parent">
      <div className="vitrine__kpis" aria-hidden="true">
        <div className="hp-kpi"><span className="hp-kpi__label">Cette semaine</span><span className="hp-kpi__value">1 h 20</span><span className="hp-kpi__meta">sur 5 jours</span></div>
        <div className="hp-kpi"><span className="hp-kpi__label">Notions acquises</span><span className="hp-kpi__value">14</span><span className="hp-kpi__meta">dont 3 cette semaine</span></div>
      </div>
      <div className="hp-skill vitrine__notion" aria-hidden="true">
        <div className="hp-skill__main">
          <span className="hp-skill__name">Le pluriel des noms</span>
          <span className="hp-skill__where">Français · CE1</span>
        </div>
        <span className="hp-chip hp-chip--attention">À revoir</span>
      </div>
      <figcaption className="muet">Exemple de suivi dans l’espace parent.</figcaption>
    </figure>
  );
}

function Installer() {
  const p = plateforme();
  const [installee, setInstallee] = useState(false);
  const [direct, setDirect] = useState(installationDirecte);
  // L'invite d'installation du navigateur peut arriver après le premier affichage.
  useEffect(() => {
    const maj = () => setDirect(installationDirecte());
    window.addEventListener('beforeinstallprompt', maj);
    return () => window.removeEventListener('beforeinstallprompt', maj);
  }, []);
  const stores = LIENS_STORES.appStore || LIENS_STORES.googlePlay;
  const ordre: Plateforme[] = p === 'autre' ? ['ios', 'android', 'autre'] : [p, ...(['ios', 'android', 'autre'] as const).filter((x) => x !== p)];

  return (
    <section id="installer" className="vitrine__section">
      <div className="vitrine__cadre vitrine__installer">
        <div className="vitrine__installer-texte">
          <h2 className="vitrine__titre-section">Installer Hopla</h2>
          <p>
            Hopla s’installe comme une app, depuis le navigateur : une icône sur l’écran d’accueil,
            et le travail continue même sans réseau.
          </p>
          {installee ? (
            <p className="hp-card"><Icone nom="coche" /> Hopla est installé sur cet appareil.</p>
          ) : direct ? (
            <button type="button" className="hp-btn hp-btn--primary hp-btn--lg"
              onClick={() => void installer().then((ok) => { setInstallee(ok); setDirect(false); })}>Installer Hopla</button>
          ) : null}
          {stores && (
            <div className="vitrine__stores">
              {LIENS_STORES.appStore && <a className="hp-btn hp-btn--secondary" href={LIENS_STORES.appStore}>App Store</a>}
              {LIENS_STORES.googlePlay && <a className="hp-btn hp-btn--secondary" href={LIENS_STORES.googlePlay}>Google Play</a>}
            </div>
          )}
          <div className="vitrine__qr">
            <QrCode label="QR code : ouvrir Hopla sur un téléphone ou une tablette" />
            <p className="muet">Sur ordinateur, scannez ce code avec le téléphone ou la tablette de l’enfant pour y ouvrir Hopla.</p>
          </div>
        </div>
        <div className="vitrine__plateformes">
          {ordre.map((x) => (
            <div key={x} className="hp-card vitrine__plateforme">
              <h3 className="titre-2">{NOMS_PLATEFORMES[x]}</h3>
              <InstructionsInstallation plateforme={x} className="vitrine__instructions" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
