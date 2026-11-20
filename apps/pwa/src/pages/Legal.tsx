import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icone } from '../composants/Icone';
import { LienParent } from '../composants/LienParent';
import { PiedDePage } from '../composants/PiedDePage';
import { CONTACT } from './Confidentialite';

// Pages légales du site. Les éléments encore inconnus sont marqués « À compléter » :
// rien n'est inventé (identité, adresses, conditions). Mise à jour : date en tête de page.

const MISE_A_JOUR = '20 novembre 2026';

/** Repère visible d'une information à fournir avant la mise en ligne publique. */
function ACompleter({ quoi }: { quoi?: string }) {
  return <span className="hp-chip hp-chip--attention">À compléter{quoi ? ` : ${quoi}` : ''}</span>;
}

/** Retour : page précédente si elle existe, sinon la présentation. */
export function BoutonRetour() {
  const naviguer = useNavigate();
  return (
    <button type="button" className="hp-iconbtn" aria-label="Retour"
      onClick={() => (history.length > 1 ? naviguer(-1) : naviguer('/'))}><Icone nom="retour" /></button>
  );
}

function PageLegale({ titre, brouillon = false, children }: { titre: string; brouillon?: boolean; children: ReactNode }) {
  return (
    <>
      <main className="ecran ecran--etroit page-legale">
        <div className="ligne">
          <BoutonRetour />
          <h1 className="titre-2 pousse">{titre}</h1>
        </div>
        <p className="muet">Mise à jour le {MISE_A_JOUR}.</p>
        {brouillon && <p className="bandeau-demo">Page en cours de rédaction. Les rubriques seront complétées avant l’ouverture au public.</p>}
        {children}
      </main>
      <PiedDePage />
    </>
  );
}

function Rubrique({ titre, children }: { titre: string; children?: ReactNode }) {
  return (
    <section>
      <h2 className="titre-3">{titre}</h2>
      {children ?? <p><ACompleter quoi="à rédiger" /></p>}
    </section>
  );
}

export function MentionsLegales() {
  return (
    <PageLegale titre="Mentions légales">
      <Rubrique titre="Éditeur">
        <p>Hopla est un projet personnel et non commercial de Laurent <ACompleter quoi="nom" />, en phase de test auprès de quelques familles.</p>
        <p>Adresse : <ACompleter /></p>
        <p>Contact : <LienParent href={`mailto:${CONTACT}`}>{CONTACT}</LienParent></p>
      </Rubrique>
      <Rubrique titre="Directeur de la publication">
        <p><ACompleter /></p>
      </Rubrique>
      <Rubrique titre="Hébergement">
        <ul>
          <li><strong>Cloudflare</strong> héberge le site et les fichiers de l’app. Adresse : <ACompleter /></li>
          <li><strong>Supabase</strong> héberge la base de données et la connexion, sur des serveurs situés à Paris. Adresse : <ACompleter /></li>
        </ul>
      </Rubrique>
      <Rubrique titre="Propriété intellectuelle">
        <p>
          Le nom Hopla, son logo, Octave, les textes, les leçons et les exercices sont protégés. Toute reproduction demande
          une autorisation écrite. Les ressources tierces et leurs licences sont listées dans les <Link to="/credits">crédits</Link>.
        </p>
      </Rubrique>
      <Rubrique titre="Programmes officiels">
        <p>
          Hopla est conçu d’après les programmes officiels de l’Éducation nationale. C’est un outil indépendant :
          il n’est ni édité ni agréé par le ministère de l’Éducation nationale.
        </p>
      </Rubrique>
      <Rubrique titre="Données personnelles">
        <p>Voir la page <Link to="/confidentialite">Confidentialité</Link>.</p>
      </Rubrique>
    </PageLegale>
  );
}

export function Cgu() {
  return (
    <PageLegale titre="Conditions d’utilisation" brouillon>
      <p>Ces conditions encadrent l’utilisation de Hopla par les parents et les enfants.</p>
      <Rubrique titre="Objet du service" />
      <Rubrique titre="Compte parent" />
      <Rubrique titre="Profils des enfants" />
      <Rubrique titre="Règles d’utilisation" />
      <Rubrique titre="Contenus pédagogiques" />
      <Rubrique titre="Disponibilité du service" />
      <Rubrique titre="Responsabilité" />
      <Rubrique titre="Suppression du compte">
        <p>Le parent peut supprimer son compte à tout moment : <Link to="/supprimer-mon-compte">comment supprimer son compte</Link>.</p>
      </Rubrique>
      <Rubrique titre="Modification des conditions" />
      <Rubrique titre="Droit applicable" />
    </PageLegale>
  );
}

export function Cgv() {
  return (
    <PageLegale titre="Conditions de vente" brouillon>
      <p>Hopla est gratuit à ce jour. Ces conditions s’appliqueront si une offre payante est proposée.</p>
      <Rubrique titre="Offres et prix" />
      <Rubrique titre="Commande et paiement" />
      <Rubrique titre="Droit de rétractation" />
      <Rubrique titre="Résiliation" />
      <Rubrique titre="Médiation de la consommation" />
    </PageLegale>
  );
}

export function Cookies() {
  return (
    <PageLegale titre="Cookies et traceurs">
      <Rubrique titre="Ce que Hopla n’utilise pas">
        <p>Hopla ne dépose aucun cookie de publicité ni de mesure d’audience. Il n’utilise aucun traceur tiers.</p>
      </Rubrique>
      <Rubrique titre="Ce que l’appareil garde">
        <ul>
          <li>Le thème choisi, clair ou sombre.</li>
          <li>La session en cours, pour rester connecté.</li>
          <li>Une copie du travail, pour réviser sans réseau.</li>
          <li>Les réglages de l’appareil, comme la voix de lecture.</li>
        </ul>
        <p>
          Ces éléments servent seulement au fonctionnement de Hopla. Strictement nécessaires, ils ne demandent pas de
          consentement (article 82 de la loi Informatique et Libertés). C’est pourquoi Hopla n’affiche pas de bandeau cookies.
        </p>
      </Rubrique>
      <Rubrique titre="Cookies techniques de l’hébergeur">
        <p><ACompleter quoi="liste à vérifier" /></p>
      </Rubrique>
      <Rubrique titre="En savoir plus">
        <p>Voir la page <Link to="/confidentialite">Confidentialité</Link>.</p>
      </Rubrique>
    </PageLegale>
  );
}

export function Accessibilite() {
  return (
    <PageLegale titre="Accessibilité">
      <Rubrique titre="Ce que Hopla prévoit">
        <ul>
          <li>Des couleurs contrastées, en thème clair comme en thème sombre.</li>
          <li>De grandes zones à toucher, adaptées aux plus jeunes.</li>
          <li>La lecture à voix haute des consignes et des leçons.</li>
        </ul>
      </Rubrique>
      <Rubrique titre="État de conformité">
        <p>Hopla n’a pas encore fait l’objet d’un audit de conformité au RGAA (référentiel général d’amélioration de l’accessibilité).</p>
      </Rubrique>
      <Rubrique titre="Signaler un problème">
        <p>Une difficulté d’accès ? Écrivez à <LienParent href={`mailto:${CONTACT}`}>{CONTACT}</LienParent>.</p>
      </Rubrique>
    </PageLegale>
  );
}
