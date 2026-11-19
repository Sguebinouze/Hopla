import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Icone } from './Icone';

/** Vérification d'une nouvelle version : toutes les 30 minutes, et à chaque retour dans l'appli. */
const INTERVALLE = 30 * 60 * 1000;

/**
 * Nouvelle version déployée : un bandeau propose de l'installer. Rien ne se recharge sans le clic,
 * pour ne pas couper un enfant au milieu d'un exercice. « Plus tard » le masque jusqu'à la prochaine
 * vérification ; sinon la nouvelle version s'installe d'elle-même quand l'appli est fermée puis rouverte.
 */
export function MiseAJour() {
  const [masque, setMasque] = useState(false);
  const { needRefresh: [aMettreAJour], updateServiceWorker } = useRegisterSW({
    onRegisteredSW(_url, enregistrement) {
      if (!enregistrement) return;
      const verifier = () => {
        if (navigator.onLine) void enregistrement.update().catch(() => undefined);
      };
      setInterval(verifier, INTERVALLE);
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') verifier();
      });
    },
  });

  // Une version plus récente encore, détectée après « Plus tard » : le bandeau revient.
  useEffect(() => { if (aMettreAJour) setMasque(false); }, [aMettreAJour]);

  // La nouvelle version prend la main puis la page se recharge. Page ouverte avant le premier
  // service worker : il ne la contrôle pas encore, on recharge nous-mêmes.
  const installer = () => {
    void updateServiceWorker(true);
    setTimeout(() => window.location.reload(), 2000);
  };

  if (!aMettreAJour || masque) return null;
  return (
    <div className="mise-a-jour" role="status">
      <p className="mise-a-jour__texte">Nouvelle version prête.</p>
      <button type="button" className="hp-btn hp-btn--primary" onClick={installer}>Mettre à jour</button>
      <button type="button" className="hp-iconbtn" aria-label="Plus tard" onClick={() => setMasque(true)}><Icone nom="fermer" taille={20} /></button>
    </div>
  );
}
