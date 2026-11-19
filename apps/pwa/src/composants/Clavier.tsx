import { useEffect, useRef, useState } from 'react';
import { appliquerTouche, toucheDuClavierPhysique, type ModeClavier, type Touche } from '../lib/clavier';
import { Icone } from './Icone';

const CHIFFRES = ['1', '2', '3', 'effacer', '4', '5', '6', '/', '7', '8', '9', '−'];
const LETTRES = [
  ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
  ['w', 'x', 'c', 'v', 'b', 'n', '’', '-'],
  ['é', 'è', 'ê', 'à', 'â', 'ç', 'ù', 'û', 'î', 'ô'],
];

interface Props {
  valeur: string;
  onChange: (v: string) => void;
  onValider: () => void;
  /** Clavier proposé d'abord, d'après la forme de la réponse attendue. */
  mode: ModeClavier;
  /** Touche pour passer des chiffres aux lettres et inversement. */
  bascule?: boolean;
  libelleValider?: string;
  /** Réponse envoyée : seul l'écran reste, les touches disparaissent. */
  desactive?: boolean;
}

/**
 * Clavier de réponse intégré, aux couleurs du DS : le clavier du téléphone ou de la tablette ne
 * s'ouvre pas et ne cache pas la question. Un clavier physique (ordinateur) fonctionne aussi.
 */
export function Clavier({ valeur, onChange, onValider, mode, bascule = true, libelleValider = 'Vérifier', desactive = false }: Props) {
  const [courant, setCourant] = useState(mode);
  useEffect(() => setCourant(mode), [mode]);

  // Le clavier physique passe par les mêmes règles que les touches à l'écran.
  const etat = useRef({ valeur, onChange, onValider });
  etat.current = { valeur, onChange, onValider };
  useEffect(() => {
    if (desactive) return;
    const surTouche = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target instanceof HTMLElement && e.target.closest('input, textarea, select, [contenteditable]')) return;
      const t = toucheDuClavierPhysique(e.key);
      if (!t) return;
      e.preventDefault();
      const { valeur: v, onChange: changer, onValider: valider } = etat.current;
      if (t === 'valider') { if (v.trim()) valider(); return; }
      changer(appliquerTouche(v, t));
    };
    window.addEventListener('keydown', surTouche);
    return () => window.removeEventListener('keydown', surTouche);
  }, [desactive]);

  const taper = (t: Touche) => onChange(appliquerTouche(valeur, t));
  const touche = (t: string) => (
    <button key={t} type="button" className={`clavier__touche${t === 'effacer' ? ' clavier__touche--action' : ''}`}
      aria-label={t === 'effacer' ? 'Effacer' : t === '−' ? 'Moins' : t === '/' ? 'Barre de fraction' : undefined}
      onClick={() => taper(t)}>
      {t === 'effacer' ? <Icone nom="effacer" taille={24} /> : t}
    </button>
  );
  const valider = (
    <button type="button" className="clavier__touche clavier__touche--valider" disabled={!valeur.trim()} onClick={onValider}>
      {libelleValider}
    </button>
  );
  const basculer = (vers: ModeClavier) => (
    <button type="button" className="clavier__touche clavier__touche--action" onClick={() => setCourant(vers)}
      aria-label={vers === 'lettres' ? 'Clavier lettres' : 'Clavier chiffres'}>
      {vers === 'lettres' ? 'abc' : '123'}
    </button>
  );

  return (
    <div className="clavier">
      <div className="clavier__ecran" role="textbox" aria-readonly="true" aria-label="Ta réponse">
        <span>{valeur}</span>
        {!desactive && <span className="clavier__curseur" aria-hidden="true" />}
        {!valeur && <span className="clavier__indication">Ta réponse</span>}
      </div>
      {!desactive && (courant === 'chiffres' ? (
        <div className="clavier__touches clavier__touches--chiffres">
          {CHIFFRES.map(touche)}
          {touche(',')}
          {touche('0')}
          {bascule ? basculer('lettres') : <span aria-hidden="true" />}
          {valider}
        </div>
      ) : (
        <div className="clavier__touches clavier__touches--lettres">
          {LETTRES[0]!.map(touche)}
          {LETTRES[1]!.map(touche)}
          {LETTRES[2]!.map(touche)}
          <span className="clavier__large2">{touche('effacer')}</span>
          {LETTRES[3]!.map(touche)}
          <span className="clavier__large2">{bascule ? basculer('chiffres') : <span aria-hidden="true" />}</span>
          <button type="button" className="clavier__touche clavier__touche--action clavier__large5" onClick={() => taper('espace')}>espace</button>
          <span className="clavier__large3">{valider}</span>
        </div>
      ))}
    </div>
  );
}
