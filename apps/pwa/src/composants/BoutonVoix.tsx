import { useEffect, useState } from 'react';
import { dire, taire, voixDisponible, type Langue } from '../lib/voix';
import { Icone } from './Icone';

/** Bouton haut-parleur : Octave lit le texte. Masqué si l'appareil n'a pas de synthèse vocale. */
export function BoutonVoix({ texte, label = 'Écouter', langue = 'fr-FR' }: { texte: string; label?: string; langue?: Langue }) {
  const [enCours, setEnCours] = useState(false);
  useEffect(() => () => taire(), []);
  if (!voixDisponible()) return null;
  return (
    <button type="button" className="hp-iconbtn bouton-voix" aria-label={enCours ? 'Arrêter la lecture' : label} aria-pressed={enCours}
      onClick={() => {
        if (enCours) {
          taire();
          setEnCours(false);
          return;
        }
        setEnCours(true);
        dire(texte, () => setEnCours(false), langue);
      }}>
      <Icone nom="haut-parleur" />
    </button>
  );
}
