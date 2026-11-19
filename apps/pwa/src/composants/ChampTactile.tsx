import { useEffect, useMemo, useRef, useState, type InputHTMLAttributes } from 'react';
import { Clavier } from './Clavier';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
  value: string;
  onChange: (v: string) => void;
};

/**
 * Champ de texte libre (recherche) : sur écran tactile, le clavier lettres de Hopla s'ouvre en bas de
 * l'écran à la place de celui du système, et le texte se tape dans le champ. Avec une souris, champ ordinaire.
 */
export function ChampTactile({ value, onChange, ...attributs }: Props) {
  const tactile = useMemo(() => typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches, []);
  const [ouvert, setOuvert] = useState(false);
  const champ = useRef<HTMLInputElement>(null);
  const tiroir = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ouvert) return;
    // Le contenu de la page reste lisible au-dessus du clavier ; un appui ailleurs le referme.
    document.body.classList.add('avec-clavier');
    champ.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    const ailleurs = (e: PointerEvent) => {
      const cible = e.target as Node;
      if (!tiroir.current?.contains(cible) && !champ.current?.contains(cible)) setOuvert(false);
    };
    const echap = (e: KeyboardEvent) => { if (e.key === 'Escape') setOuvert(false); };
    document.addEventListener('pointerdown', ailleurs);
    document.addEventListener('keydown', echap);
    return () => {
      document.body.classList.remove('avec-clavier');
      document.removeEventListener('pointerdown', ailleurs);
      document.removeEventListener('keydown', echap);
    };
  }, [ouvert]);

  if (!tactile) return <input {...attributs} value={value} onChange={(e) => onChange(e.target.value)} />;
  return (
    <>
      <input {...attributs} ref={champ} value={value} readOnly aria-expanded={ouvert}
        className={`${attributs.className ?? ''}${ouvert ? ' champ-tactile--actif' : ''}`} onClick={() => setOuvert(true)} />
      {ouvert && (
        <div ref={tiroir} className="clavier-tiroir" role="dialog" aria-label="Clavier">
          <Clavier valeur={value} onChange={onChange} onValider={() => setOuvert(false)} mode="lettres" libelleValider="OK" sansEcran valideVide />
        </div>
      )}
    </>
  );
}
