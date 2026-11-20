import type { Plateforme } from '../lib/installation';

/**
 * Liens vers les stores. Hopla s'installe aujourd'hui depuis le navigateur, sans store.
 * Renseigner une adresse ici affiche le lien correspondant sur la page de présentation.
 */
export const LIENS_STORES: { appStore: string | null; googlePlay: string | null } = {
  appStore: null,
  googlePlay: null,
};

/** Étapes d'installation depuis le navigateur, selon l'appareil. */
export function InstructionsInstallation({ plateforme, className }: { plateforme: Plateforme; className?: string }) {
  return (
    <ol className={className}>
      {plateforme === 'ios' ? (
        <>
          <li>Dans Safari, touchez <strong>Partager</strong> (le carré avec une flèche vers le haut).</li>
          <li>Choisissez <strong>Sur l’écran d’accueil</strong>, puis <strong>Ajouter</strong>.</li>
          <li>Ouvrez Hopla depuis sa nouvelle icône. Sur iPhone et iPad, l’app installée ne partage pas la connexion de Safari : reconnectez-vous une fois avec votre e-mail et le code reçu.</li>
        </>
      ) : plateforme === 'android' ? (
        <>
          <li>Dans Chrome, touchez le menu <strong>⋮</strong> en haut à droite.</li>
          <li>Choisissez <strong>Installer l’application</strong> (ou <strong>Ajouter à l’écran d’accueil</strong>).</li>
          <li>Ouvrez Hopla depuis sa nouvelle icône.</li>
        </>
      ) : (
        <>
          <li>Dans Chrome ou Edge, cliquez sur l’icône d’installation à droite de la barre d’adresse.</li>
          <li>Sur un ordinateur, vous pouvez aussi garder Hopla dans un onglet : tout fonctionne de la même façon.</li>
        </>
      )}
    </ol>
  );
}
