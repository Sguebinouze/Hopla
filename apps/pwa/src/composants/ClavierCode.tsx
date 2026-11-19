import type { ReactNode } from 'react';
import { Icone } from './Icone';

// 8 pictogrammes faciles à retenir en primaire ; leur position sert de chiffre (0 à 7).
// Couleurs propres à l'illustration.
export const PICTOS: { nom: string; dessin: ReactNode }[] = [
  { nom: 'Étoile', dessin: <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z" fill="#FFC53D" /> },
  { nom: 'Lune', dessin: <path d="M20 14A8 8 0 1110 4a6 6 0 0010 10z" fill="#4B3FD1" /> },
  { nom: 'Cœur', dessin: <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" fill="#C2255C" /> },
  { nom: 'Feuille', dessin: <path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z" fill="#2B8A3E" /> },
  { nom: 'Goutte', dessin: <path d="M12 21c-4 0-7-3-7-7 0-5 7-11 7-11s7 6 7 11c0 4-3 7-7 7z" fill="#0C8599" /> },
  { nom: 'Soleil', dessin: <circle cx="12" cy="12" r="6" fill="#F76707" /> },
  { nom: 'Poisson', dessin: <path d="M3 12c3-5 9-6 13-2l5-3v10l-5-3c-4 4-10 3-13-2z" fill="#E8590C" /> },
  { nom: 'Nuage', dessin: <path d="M7 18a4 4 0 01-.5-8A6 6 0 0118 9a4.5 4.5 0 01-.5 9z" fill="#74A7FF" /> },
];

function Picto({ i, taille = 30 }: { i: number; taille?: number }) {
  return <svg width={taille} height={taille} viewBox="0 0 24 24" aria-hidden="true">{PICTOS[i]!.dessin}</svg>;
}

/** Les 4 symboles d'un code, visibles (pour que le parent le montre à l'enfant). */
export function CodeVisible({ code, pictos }: { code: string; pictos: boolean }) {
  return (
    <span className="code-visible" aria-label={pictos ? code.split('').map((c) => PICTOS[Number(c)]!.nom).join(', ') : code.split('').join(' ')}>
      {code.split('').map((c, k) => (
        <span key={k} className="code-visible__case">{pictos ? <Picto i={Number(c)} taille={28} /> : c}</span>
      ))}
    </span>
  );
}

/** Clavier du code secret : pictogrammes en primaire, chiffres au collège. */
export function ClavierCode({ pictos, saisie, onSaisie, longueur = 4, masquer = true }: {
  pictos: boolean;
  saisie: string;
  onSaisie: (s: string) => void;
  longueur?: number;
  /** Faux : les symboles tapés restent visibles (choix du code par le parent). */
  masquer?: boolean;
}) {
  const touches = pictos ? PICTOS.map((_, i) => String(i)) : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  return (
    <div className="clavier-code">
      <div className="hp-pin__slots" aria-label={`${saisie.length} symboles sur ${longueur}`}>
        {Array.from({ length: longueur }, (_, i) => (
          <span key={i} className={`hp-pin__slot${i < saisie.length ? ' hp-pin__slot--filled' : ''}`}>
            {i < saisie.length && (masquer
              ? <svg width={12} height={12} aria-hidden="true"><circle cx={6} cy={6} r={6} fill="currentColor" /></svg>
              : pictos ? <Picto i={Number(saisie[i])} taille={24} /> : <strong>{saisie[i]}</strong>)}
          </span>
        ))}
      </div>
      <div className="hp-pin" style={{ boxShadow: 'var(--shadow-card)' }}>
        <div className="hp-pin__grid">
          {touches.map((t) => (
            <button key={t} type="button" className="hp-pin__key" onClick={() => saisie.length < longueur && onSaisie(saisie + t)}
              aria-label={pictos ? PICTOS[Number(t)]!.nom : t}>
              {pictos ? <Picto i={Number(t)} /> : t}
            </button>
          ))}
          <button type="button" className="hp-pin__key" aria-label="Effacer" onClick={() => onSaisie(saisie.slice(0, -1))}><Icone nom="effacer" /></button>
        </div>
      </div>
    </div>
  );
}
