import { useReseau } from '../lib/horsLigne';
import { Icone } from './Icone';

/** Bandeau discret : sans réseau, ou réponses encore à envoyer. */
export function EtatReseau() {
  const { horsLigne, enAttente } = useReseau();
  if (!horsLigne && enAttente === 0) return null;
  return (
    <p className="etat-reseau" role="status">
      <Icone nom="nuage" taille={18} />
      {horsLigne
        ? `Hors connexion : tu peux continuer, tes réponses seront envoyées au retour du réseau${enAttente ? ` (${enAttente} en attente)` : ''}.`
        : `Envoi de ${enAttente} réponse${enAttente > 1 ? 's' : ''}…`}
    </p>
  );
}
