import { Link, useNavigate } from 'react-router-dom';
import { Icone } from '../composants/Icone';
import { LienParent } from '../composants/LienParent';

export const CONTACT = 'hopla.news@gmail.com';

// Politique de confidentialité : accessible sans compte, depuis l'écran de connexion et l'espace parent.
export function Confidentialite() {
  const naviguer = useNavigate();
  return (
    <main className="ecran ecran--etroit confidentialite">
      <div className="ligne">
        <button type="button" className="hp-iconbtn" aria-label="Retour" onClick={() => naviguer(-1)}><Icone nom="retour" /></button>
        <h1 className="titre-2 pousse">Confidentialité</h1>
      </div>
      <p className="muet">Mise à jour le 20 novembre 2026.</p>

      <section>
        <h2 className="titre-3">Qui est responsable</h2>
        <p>
          Hopla est un projet personnel et non commercial de Laurent, en phase de test auprès de quelques familles.
          Pour toute question ou demande : <LienParent href={`mailto:${CONTACT}`}>{CONTACT}</LienParent>.
        </p>
      </section>

      <section>
        <h2 className="titre-3">Ce que Hopla garde</h2>
        <ul>
          <li><strong>Pour le parent :</strong> son adresse e-mail, qui sert à se connecter, et son code parent, enregistré sous une forme protégée qui ne permet pas de le relire.</li>
          <li><strong>Pour chaque enfant :</strong> un prénom ou un pseudo, un avatar, une classe et l’apparence choisie pour Octave. Son code secret est protégé de la même façon.</li>
          <li>
            <strong>Son travail :</strong> les réponses choisies, les erreurs, le temps passé, la progression par notion,
            les leçons consultées, les records de défis, le contrôle prévu, le cahier de vacances,
            et le nombre de parties de jeux et de quiz du jour.
          </li>
          <li><strong>Les appareils appairés :</strong> un nom générique (« iPhone », « Android ») et les dates d’utilisation.</li>
        </ul>
        <p>
          Hopla ne demande jamais le nom de famille, l’adresse, la date de naissance ni de photo d’un enfant.
          L’enfant n’a ni compte ni adresse e-mail : c’est le parent qui crée son profil.
        </p>
      </section>

      <section>
        <h2 className="titre-3">Ce qui reste sur l’appareil</h2>
        <p>
          Les photos de leçon et le texte lu dessus ne quittent jamais l’appareil : la lecture se fait sur place.
          L’appareil garde aussi le thème choisi, la session en cours et une copie du travail pour réviser sans réseau.
          Ces éléments servent seulement au fonctionnement de l’app : il n’y a ni publicité, ni mesure d’audience, ni traceur.
        </p>
      </section>

      <section>
        <h2 className="titre-3">Pourquoi</h2>
        <p>
          Ces données servent uniquement à faire fonctionner Hopla : proposer à l’enfant les bonnes révisions et montrer
          sa progression au parent. Elles ne sont ni vendues, ni cédées, ni utilisées pour de la publicité.
          Chaque famille ne voit que ses propres données ; un enfant ne voit que les siennes.
        </p>
      </section>

      <section>
        <h2 className="titre-3">Où elles sont</h2>
        <ul>
          <li><strong>Supabase</strong> héberge la base de données et la connexion, sur des serveurs situés à Paris.</li>
          <li><strong>Cloudflare</strong> héberge les fichiers de l’app et voit passer l’adresse IP des visiteurs pour servir les pages.</li>
          <li><strong>Google (Gmail)</strong> envoie les e-mails de connexion et reçoit pour cela l’adresse e-mail du parent.</li>
        </ul>
      </section>

      <section>
        <h2 className="titre-3">Combien de temps</h2>
        <ul>
          <li><strong>Le détail du travail</strong> (chaque réponse, leçons consultées, parties de jeux) : 1 an. La progression par notion reste tant que le compte existe.</li>
          <li><strong>Un appareil appairé</strong> qui ne sert plus pendant 6 mois est retiré ; il suffit de l’associer à nouveau.</li>
          <li><strong>Une famille sans aucune activité pendant 1 an</strong> : les comptes parents, les profils des enfants et leur travail sont supprimés.</li>
        </ul>
        <p>
          Le parent peut supprimer à tout moment le profil d’un enfant (fiche de l’enfant, onglet Réglages) ou son compte
          entier (espace parent, Mes données) : les données sont alors effacées de la base. Si un second parent est membre
          de la famille, les profils des enfants restent pour lui. <Link to="/supprimer-mon-compte">Comment supprimer son compte</Link>.
        </p>
      </section>

      <section>
        <h2 className="titre-3">Vos droits</h2>
        <p>
          Vous pouvez accéder à vos données, les corriger, les effacer, les récupérer ou vous opposer à leur traitement.
          L’espace parent permet de télécharger toutes les données de la famille, de modifier les profils et de tout supprimer.
          Pour le reste, écrivez à <LienParent href={`mailto:${CONTACT}`}>{CONTACT}</LienParent>. Vous pouvez aussi saisir la CNIL
          (<LienParent href="https://www.cnil.fr">cnil.fr</LienParent>).
        </p>
      </section>
    </main>
  );
}
