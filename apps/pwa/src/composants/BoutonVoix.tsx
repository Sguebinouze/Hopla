import { useEffect, useState } from 'react';
import { aUneVoix, dire, taire, type Langue } from '../lib/voix';
import { Icone } from './Icone';

/** Bouton haut-parleur : Octave lit le texte. Masqué si le texte n'a pas sa voix enregistrée : l'enfant lit. */
export function BoutonVoix({ texte, label = 'Écouter', langue = 'fr-FR' }: { texte: string; label?: string; langue?: Langue }) {
  const [enCours, setEnCours] = useState(false);
  useEffect(() => () => taire(), []);
  if (!aUneVoix(texte, langue)) return null;
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
