import { useEffect, useRef, useState } from 'react';
import { appliquerTouche, PONCTUATION_TEXTE, toucheDuClavierPhysique, type ModeClavier, type Touche } from '../lib/clavier';
import { Icone } from './Icone';

const CHIFFRES = ['1', '2', '3', 'effacer', '4', '5', '6', '/', '7', '8', '9', '−'];
const LETTRES = [
  ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
  ['w', 'x', 'c', 'v', 'b', 'n', '’', '-'],
  ['é', 'è', 'ê', 'à', 'â', 'ç', 'ù', 'û', 'î', 'ô'],
];

const NOMS_TOUCHES: Record<string, string> = {
  ',': 'Virgule', '.': 'Point', '?': 'Point d’interrogation', '!': 'Point d’exclamation', ';': 'Point-virgule',
  ':': 'Deux-points', '«': 'Ouvrir les guillemets', '»': 'Fermer les guillemets', '…': 'Points de suspension', '’': 'Apostrophe',
};

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
  /** Le texte s'affiche ailleurs (champ de recherche) : pas d'écran au-dessus des touches. */
  sansEcran?: boolean;
  /** La touche de validation reste active sur un texte vide (fermer le clavier d'une recherche). */
  valideVide?: boolean;
  /**
   * Clavier lettres : sur un écran assez grand, une rangée de chiffres au-dessus des lettres remplace
   * la touche « 123 ». Sur un petit écran, la touche « 123 » reste.
   */
  chiffresSiPlace?: boolean;
  /**
   * Saisie d'un texte (dictée) : majuscule d'une lettre, rangée de ponctuation, œ et ï,
   * écran sur plusieurs lignes, longueur d'une dictée.
   */
  texte?: boolean;
  indication?: string;
}

/**
 * Clavier de réponse intégré, aux couleurs du DS : le clavier du téléphone ou de la tablette ne
 * s'ouvre pas et ne cache pas la question. Un clavier physique (ordinateur) fonctionne aussi.
 */
export function Clavier({
  valeur, onChange, onValider, mode, bascule = true, libelleValider = 'Vérifier', desactive = false, sansEcran = false, valideVide = false,
  chiffresSiPlace = false, texte = false, indication = 'Ta réponse',
}: Props) {
  const [courant, setCourant] = useState(mode);
  useEffect(() => setCourant(mode), [mode]);
  // Majuscule pour la lettre suivante seulement.
  const [majuscule, setMajuscule] = useState(false);
  const ecran = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (texte && ecran.current) ecran.current.scrollTop = ecran.current.scrollHeight;
  }, [texte, valeur]);

  // Le clavier physique passe par les mêmes règles que les touches à l'écran.
  const etat = useRef({ valeur, onChange, onValider, valideVide, texte });
  etat.current = { valeur, onChange, onValider, valideVide, texte };
  useEffect(() => {
    if (desactive) return;
    const surTouche = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // Un autre champ modifiable a la main ; un champ en lecture seule (recherche tactile) passe par ce clavier.
      const cible = e.target instanceof HTMLElement ? e.target.closest('input, textarea, select, [contenteditable]') : null;
      if (cible && !(cible instanceof HTMLInputElement && cible.readOnly)) return;
      const t = toucheDuClavierPhysique(e.key, etat.current.texte);
      if (!t) return;
      e.preventDefault();
      const { valeur: v, onChange: changer, onValider: valider } = etat.current;
      if (t === 'valider') { if (v.trim() || etat.current.valideVide) valider(); return; }
      changer(appliquerTouche(v, t, etat.current.texte));
    };
    window.addEventListener('keydown', surTouche);
    return () => window.removeEventListener('keydown', surTouche);
  }, [desactive]);

  const taper = (t: Touche) => {
    const lettre = majuscule && /^\p{L}$/u.test(t);
    onChange(appliquerTouche(valeur, lettre ? t.toUpperCase() : t, texte));
    if (majuscule && t !== 'effacer') setMajuscule(false);
  };
  const touche = (t: string, classe = '') => (
    <button key={t} type="button" className={`clavier__touche${t === 'effacer' ? ' clavier__touche--action' : ''}${classe}`}
      aria-label={t === 'effacer' ? 'Effacer' : t === '−' ? (texte ? 'Trait d’union' : 'Moins') : t === '/' ? 'Barre de fraction' : NOMS_TOUCHES[t]}
      onClick={() => taper(t)}>
      {t === 'effacer' ? <Icone nom="effacer" taille={24} /> : majuscule && /^\p{L}$/u.test(t) ? t.toUpperCase() : t}
    </button>
  );
  const maj = (
    <button type="button" className={`clavier__touche clavier__touche--action${majuscule ? ' clavier__touche--active' : ''}`}
      aria-label="Majuscule" aria-pressed={majuscule} onClick={() => setMajuscule((m) => !m)}>
      <Icone nom="majuscule" taille={22} />
    </button>
  );
  const valider = (
    <button type="button" className="clavier__touche clavier__touche--valider" disabled={!valideVide && !valeur.trim()} onClick={onValider}>
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
    <div className={`clavier${chiffresSiPlace ? ' clavier--chiffres-si-place' : ''}`}>
      {!sansEcran && (
        <div ref={ecran} className={`clavier__ecran${texte ? ' clavier__ecran--texte' : ''}`} role="textbox" aria-readonly="true"
          aria-multiline={texte || undefined} aria-label={indication}>
          <span>{valeur}</span>
          {!desactive && <span className="clavier__curseur" aria-hidden="true" />}
          {!valeur && <span className="clavier__indication">{indication}</span>}
        </div>
      )}
      {!desactive && (courant === 'chiffres' ? (
        <div className="clavier__touches clavier__touches--chiffres">
          {CHIFFRES.map((t) => touche(t))}
          {touche(',')}
          {touche('0')}
          {bascule ? basculer('lettres') : <span aria-hidden="true" />}
          {valider}
        </div>
      ) : texte ? (
        <div className="clavier__touches clavier__touches--lettres">
          {LETTRES[0]!.map((t) => touche(t))}
          {LETTRES[1]!.map((t) => touche(t))}
          {maj}
          {['w', 'x', 'c', 'v', 'b', 'n', '’'].map((t) => touche(t))}
          <span className="clavier__large2">{touche('effacer')}</span>
          {LETTRES[3]!.map((t) => touche(t))}
          {[...PONCTUATION_TEXTE, '−'].map((t) => touche(t, ' clavier__touche--ponctuation'))}
          <span className="clavier__large2">{bascule ? basculer('chiffres') : <span aria-hidden="true" />}</span>
          {touche('œ')}
          {touche('ï')}
          <button type="button" className="clavier__touche clavier__touche--action clavier__large3" onClick={() => taper('espace')}>espace</button>
          <span className="clavier__large3">{valider}</span>
        </div>
      ) : (
        <div className="clavier__touches clavier__touches--lettres">
          {chiffresSiPlace && ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((c) => touche(c, ' clavier__chiffre-haut'))}
          {LETTRES[0]!.map((t) => touche(t))}
          {LETTRES[1]!.map((t) => touche(t))}
          {LETTRES[2]!.map((t) => touche(t))}
          <span className="clavier__large2">{touche('effacer')}</span>
          {LETTRES[3]!.map((t) => touche(t))}
          <span className="clavier__large2 clavier__bascule">{bascule ? basculer('chiffres') : <span aria-hidden="true" />}</span>
          <button type="button" className="clavier__touche clavier__touche--action clavier__large5" onClick={() => taper('espace')}>espace</button>
          <span className="clavier__large3">{valider}</span>
        </div>
      ))}
    </div>
  );
}
