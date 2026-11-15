import { useEffect, useState } from 'react';
import { choisirTheme, themeChoisi, themeEffectif, type Theme } from '../lib/theme';
import { Icone } from './Icone';

// Bascule clair / sombre. L'icône montre le thème vers lequel on passe.
export function BoutonTheme() {
  const [theme, setTheme] = useState<Theme>(themeEffectif);

  useEffect(() => {
    if (themeChoisi()) return;
    const m = matchMedia('(prefers-color-scheme: dark)');
    const suivre = () => setTheme(m.matches ? 'dark' : 'light');
    m.addEventListener('change', suivre);
    return () => m.removeEventListener('change', suivre);
  }, []);

  const suivant: Theme = theme === 'dark' ? 'light' : 'dark';
  return (
    <button type="button" className="hp-iconbtn" aria-label={suivant === 'dark' ? 'Passer en thème sombre' : 'Passer en thème clair'}
      onClick={() => { choisirTheme(suivant); setTheme(suivant); }}>
      <Icone nom={suivant === 'dark' ? 'lune' : 'soleil'} />
    </button>
  );
}
