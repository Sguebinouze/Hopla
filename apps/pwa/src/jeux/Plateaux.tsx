import { useEffect, useMemo, useRef, useState } from 'react';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { avancer, intrus, labyrinthe, memoire, motsMeles, segment, sommes, type Intrus } from './autres';
import { hasard, type Niveau } from './hasard';
import type { IdJeu } from './regles';
import { suite, type Suite } from './suites';
import { conflits, sudoku } from './sudoku';

export interface PropsJeu {
  niveau: Niveau;
  graine: number;
  /** Fin de partie : réussie ou non, avec une ligne de bilan. */
  onFin: (reussi: boolean, bilan: string) => void;
}

const MANCHES = 5;

// ─────────────────────────────────────────── QCM en 5 manches (suites, intrus)

function Manches<T>({ manches, rendu, options, reponse, explication, onFin }: {
  manches: T[];
  rendu: (m: T) => React.ReactNode;
  options: (m: T) => string[];
  reponse: (m: T) => string;
  explication: (m: T) => string;
  onFin: PropsJeu['onFin'];
}) {
  const [rang, setRang] = useState(0);
  const [choix, setChoix] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const m = manches[rang]!;
  const juste = choix === reponse(m);
  const classe = (o: string) => {
    if (!choix) return 'hp-option';
    if (o === reponse(m)) return 'hp-option hp-option--correct';
    return o === choix ? 'hp-option hp-option--wrong' : 'hp-option';
  };
  const suivant = () => {
    if (rang + 1 >= manches.length) return onFin(score >= 4, `${score} bonne${score > 1 ? 's' : ''} réponse${score > 1 ? 's' : ''} sur ${manches.length}`);
    setRang(rang + 1);
    setChoix(null);
  };
  return (
    <div className="jeu-manches">
      <p className="muet">Manche {rang + 1} sur {manches.length}</p>
      {rendu(m)}
      <div className="grille-options">
        {options(m).map((o) => (
          <button key={o} type="button" className={classe(o)} disabled={choix !== null && o !== choix && o !== reponse(m)}
            onClick={() => { if (choix) return; setChoix(o); if (o === reponse(m)) setScore((s) => s + 1); }}>
            {o}
          </button>
        ))}
      </div>
      {choix && (
        <>
          <div className={`hp-feedback ${juste ? 'hp-feedback--success' : 'hp-feedback--attention'}`} style={{ maxWidth: 'none' }} role="status">
            <Octave humeur={juste ? 'reussite' : 'oups'} taille={48} />
            <div><span className="hp-feedback__title">{juste ? 'Juste.' : `Il fallait : ${reponse(m)}.`}</span>
              <span className="hp-feedback__text" style={{ display: 'block' }}>{explication(m)}</span></div>
          </div>
          <button type="button" className="hp-btn hp-btn--primary hp-btn--lg hp-btn--block" onClick={suivant} autoFocus>Continuer</button>
        </>
      )}
    </div>
  );
}

export function SuitesJeu({ niveau, graine, onFin }: PropsJeu) {
  const manches = useMemo(() => { const h = hasard(graine); return Array.from({ length: MANCHES }, () => suite(niveau, h)); }, [niveau, graine]);
  return (
    <Manches<Suite> manches={manches} onFin={onFin} options={(m) => m.options} reponse={(m) => m.reponse} explication={(m) => m.regle}
      rendu={(m) => (
        <div className="suite" aria-label={`Suite : ${m.termes.join(', ')}, puis ?`}>
          {m.termes.map((t, i) => <span key={i} className="suite__terme">{t}</span>)}
          <span className="suite__terme suite__terme--inconnu">?</span>
        </div>
      )} />
  );
}

export function IntrusJeu({ niveau, graine, onFin }: PropsJeu) {
  const manches = useMemo(() => { const h = hasard(graine); return Array.from({ length: MANCHES }, () => intrus(niveau, h)); }, [niveau, graine]);
  return (
    <Manches<Intrus> manches={manches} onFin={onFin} options={(m) => m.elements} reponse={(m) => m.intrus} explication={(m) => m.explication}
      rendu={() => <p className="titre-2" style={{ margin: 0 }}>Lequel n’est pas comme les autres ?</p>} />
  );
}

// ─────────────────────────────────────────── Pavé de chiffres (sudoku, sommes)

function Pave({ max, onChiffre, onEffacer }: { max: number; onChiffre: (v: number) => void; onEffacer: () => void }) {
  return (
    <div className="pave">
      {Array.from({ length: max }, (_, i) => i + 1).map((v) => (
        <button key={v} type="button" className="pave__touche" onClick={() => onChiffre(v)}>{v}</button>
      ))}
      <button type="button" className="pave__touche" aria-label="Effacer" onClick={onEffacer}><Icone nom="effacer" /></button>
    </div>
  );
}

export function SudokuJeu({ niveau, graine, onFin }: PropsJeu) {
  const s = useMemo(() => sudoku(niveau, hasard(graine)), [niveau, graine]);
  const [g, setG] = useState(s.depart);
  const [sel, setSel] = useState<number | null>(s.depart.findIndex((v) => v === 0));
  const enConflit = conflits(g, s.taille, s.blocL, s.blocC);
  const poser = (v: number) => {
    if (sel === null || s.depart[sel] !== 0) return;
    const n = [...g];
    n[sel] = v;
    setG(n);
    if (n.every((x, i) => x === s.solution[i])) onFin(true, 'Grille complète.');
  };
  const pleine = g.every((x) => x !== 0);
  return (
    <div className="jeu-plateau">
      <div className="grille-chiffres" style={{ gridTemplateColumns: `repeat(${s.taille}, 1fr)` }} role="grid" aria-label="Grille de sudoku">
        {g.map((v, i) => {
          const l = Math.floor(i / s.taille);
          const c = i % s.taille;
          const bord = `${c % s.blocC === s.blocC - 1 && c < s.taille - 1 ? ' case--bord-d' : ''}${l % s.blocL === s.blocL - 1 && l < s.taille - 1 ? ' case--bord-b' : ''}`;
          return (
            <button key={i} type="button" role="gridcell" disabled={s.depart[i] !== 0}
              className={`case${s.depart[i] ? ' case--donnee' : ''}${sel === i ? ' case--choisie' : ''}${enConflit.has(i) ? ' case--conflit' : ''}${bord}`}
              aria-label={`Ligne ${l + 1}, colonne ${c + 1}${v ? ` : ${v}` : ', vide'}`} onClick={() => setSel(i)}>
              {v || ''}
            </button>
          );
        })}
      </div>
      {pleine && enConflit.size === 0 && g.some((x, i) => x !== s.solution[i]) && <p className="muet">Presque : une case n’est pas la bonne.</p>}
      <Pave max={s.taille} onChiffre={poser} onEffacer={() => { if (sel !== null && s.depart[sel] === 0) setG(g.map((x, i) => (i === sel ? 0 : x))); }} />
      <button type="button" className="hp-btn hp-btn--ghost" onClick={() => onFin(false, 'Partie abandonnée.')}>J’arrête</button>
    </div>
  );
}

export function SommesJeu({ niveau, graine, onFin }: PropsJeu) {
  const s = useMemo(() => sommes(niveau, hasard(graine)), [niveau, graine]);
  const [g, setG] = useState(() => s.solution.map((v, i) => (s.donnees[i] ? v : 0)));
  const [sel, setSel] = useState<number | null>(s.donnees.findIndex((d) => !d));
  const totalL = (l: number) => g.slice(l * s.taille, (l + 1) * s.taille).reduce((a, b) => a + b, 0);
  const totalC = (c: number) => g.filter((_, i) => i % s.taille === c).reduce((a, b) => a + b, 0);
  const poser = (v: number) => {
    if (sel === null || s.donnees[sel]) return;
    const n = g.map((x, i) => (i === sel ? v : x));
    setG(n);
    const ok = n.every((x) => x > 0)
      && Array.from({ length: s.taille }, (_, l) => n.slice(l * s.taille, (l + 1) * s.taille).reduce((a, b) => a + b, 0) === s.lignes[l]).every(Boolean)
      && Array.from({ length: s.taille }, (_, c) => n.filter((_, i) => i % s.taille === c).reduce((a, b) => a + b, 0) === s.colonnes[c]).every(Boolean);
    if (ok) onFin(true, 'Toutes les sommes sont justes.');
  };
  const etat = (t: number, cible: number, complet: boolean) => (complet ? (t === cible ? ' somme--juste' : ' somme--fausse') : '');
  return (
    <div className="jeu-plateau">
      <p className="muet">Chiffres de 1 à {s.max}.</p>
      <div className="grille-chiffres grille-sommes" style={{ gridTemplateColumns: `repeat(${s.taille + 1}, 1fr)` }}>
        {Array.from({ length: s.taille }, (_, l) => (
          <SommesLigne key={l}>
            {Array.from({ length: s.taille }, (_, c) => {
              const i = l * s.taille + c;
              return (
                <button key={i} type="button" disabled={s.donnees[i]} onClick={() => setSel(i)}
                  className={`case${s.donnees[i] ? ' case--donnee' : ''}${sel === i ? ' case--choisie' : ''}`}
                  aria-label={`Ligne ${l + 1}, colonne ${c + 1}${g[i] ? ` : ${g[i]}` : ', vide'}`}>{g[i] || ''}</button>
              );
            })}
            <span className={`somme${etat(totalL(l), s.lignes[l]!, g.slice(l * s.taille, (l + 1) * s.taille).every((x) => x > 0))}`}>= {s.lignes[l]}</span>
          </SommesLigne>
        ))}
        {Array.from({ length: s.taille }, (_, c) => (
          <span key={`c${c}`} className={`somme${etat(totalC(c), s.colonnes[c]!, g.filter((_, i) => i % s.taille === c).every((x) => x > 0))}`}>= {s.colonnes[c]}</span>
        ))}
        <span />
      </div>
      <Pave max={s.max} onChiffre={poser} onEffacer={() => { if (sel !== null && !s.donnees[sel]) setG(g.map((x, i) => (i === sel ? 0 : x))); }} />
      <button type="button" className="hp-btn hp-btn--ghost" onClick={() => onFin(false, 'Partie abandonnée.')}>J’arrête</button>
    </div>
  );
}
const SommesLigne = ({ children }: { children: React.ReactNode }) => <>{children}</>;

// ─────────────────────────────────────────── Mémoire

export function MemoireJeu({ niveau, graine, onFin }: PropsJeu) {
  const cartes = useMemo(() => memoire(niveau, hasard(graine)), [niveau, graine]);
  const [trouvees, setTrouvees] = useState<Set<number>>(new Set());
  const [retournees, setRetournees] = useState<number[]>([]);
  const [coups, setCoups] = useState(0);
  const attente = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(attente.current), []);
  const toucher = (i: number) => {
    if (trouvees.has(i) || retournees.includes(i) || retournees.length === 2) return;
    const r = [...retournees, i];
    setRetournees(r);
    if (r.length < 2) return;
    const n = coups + 1;
    setCoups(n);
    if (cartes[r[0]!] === cartes[r[1]!]) {
      const t = new Set([...trouvees, ...r]);
      setTrouvees(t);
      setRetournees([]);
      if (t.size === cartes.length) onFin(true, `Toutes les paires en ${n} coups.`);
    } else {
      attente.current = window.setTimeout(() => setRetournees([]), 900);
    }
  };
  return (
    <div className="jeu-plateau">
      <p className="muet">{coups} coup{coups > 1 ? 's' : ''} · {trouvees.size / 2} paire{trouvees.size > 2 ? 's' : ''} sur {cartes.length / 2}</p>
      <div className="memoire" style={{ gridTemplateColumns: `repeat(${cartes.length > 16 ? 5 : 4}, 1fr)` }}>
        {cartes.map((s, i) => {
          const visible = trouvees.has(i) || retournees.includes(i);
          return (
            <button key={i} type="button" className={`carte${visible ? ' carte--visible' : ''}${trouvees.has(i) ? ' carte--trouvee' : ''}`}
              aria-label={visible ? s : 'Carte cachée'} onClick={() => toucher(i)}>
              {visible ? <Icone nom={s} taille={30} /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────── Labyrinthe

export function LabyrintheJeu({ niveau, graine, onFin }: PropsJeu) {
  const lab = useMemo(() => labyrinthe(niveau, hasard(graine)), [niveau, graine]);
  const sortie = lab.largeur * lab.hauteur - 1;
  const [pos, setPos] = useState(0);
  const [pas, setPas] = useState(0);
  const ici = useRef(0);
  const fini = useRef(false);
  const bouger = (d: 0 | 1 | 2 | 3) => {
    if (fini.current) return;
    const n = avancer(lab, ici.current, d);
    if (n === ici.current) return;
    ici.current = n;
    setPos(n);
    setPas((x) => x + 1);
    if (n === sortie) { fini.current = true; window.setTimeout(() => onFin(true, 'Octave est sorti du labyrinthe.'), 300); }
  };
  useEffect(() => {
    const touche = (e: KeyboardEvent) => {
      const d = ({ ArrowUp: 0, ArrowRight: 1, ArrowDown: 2, ArrowLeft: 3 } as Record<string, 0 | 1 | 2 | 3>)[e.key];
      if (d !== undefined) { e.preventDefault(); bouger(d); }
    };
    window.addEventListener('keydown', touche);
    return () => window.removeEventListener('keydown', touche);
  });
  const depart = useRef<{ x: number; y: number } | null>(null);
  return (
    <div className="jeu-plateau">
      <p className="muet">{pas} déplacement{pas > 1 ? 's' : ''}</p>
      <div className="labyrinthe" style={{ gridTemplateColumns: `repeat(${lab.largeur}, 1fr)` }}
        onPointerDown={(e) => { depart.current = { x: e.clientX, y: e.clientY }; }}
        onPointerUp={(e) => {
          const d0 = depart.current;
          depart.current = null;
          if (!d0) return;
          const dx = e.clientX - d0.x;
          const dy = e.clientY - d0.y;
          if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
          bouger(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0));
        }}>
        {lab.murs.map((m, i) => (
          <span key={i} className={`labyrinthe__case${m[0] ? ' mur-h' : ''}${m[1] ? ' mur-d' : ''}${m[2] ? ' mur-b' : ''}${m[3] ? ' mur-g' : ''}`}>
            {i === pos ? <span className="labyrinthe__octave" aria-label="Octave" /> : i === sortie ? <Icone nom="coupe" taille={16} /> : null}
          </span>
        ))}
      </div>
      <div className="fleches">
        <span />
        <button type="button" className="hp-iconbtn fleche--haut" aria-label="Haut" onClick={() => bouger(0)}><Icone nom="retour" /></button>
        <span />
        <button type="button" className="hp-iconbtn fleche--gauche" aria-label="Gauche" onClick={() => bouger(3)}><Icone nom="retour" /></button>
        <span />
        <button type="button" className="hp-iconbtn fleche--droite" aria-label="Droite" onClick={() => bouger(1)}><Icone nom="retour" /></button>
        <span />
        <button type="button" className="hp-iconbtn fleche--bas" aria-label="Bas" onClick={() => bouger(2)}><Icone nom="retour" /></button>
        <span />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────── Mots mêlés

export function MotsMelesJeu({ niveau, graine, onFin }: PropsJeu) {
  const m = useMemo(() => motsMeles(niveau, hasard(graine)), [niveau, graine]);
  const [trouves, setTrouves] = useState<string[]>([]);
  const [debut, setDebut] = useState<number | null>(null);
  const [rate, setRate] = useState<number[]>([]);
  const casesTrouvees = new Set(m.mots.filter((p) => trouves.includes(p.mot)).flatMap((p) => p.cases));
  const toucher = (i: number) => {
    if (debut === null) { setDebut(i); setRate([]); return; }
    const seg = segment(m.taille, debut, i);
    setDebut(null);
    if (!seg || seg.length < 2) return;
    const lu = seg.map((k) => m.lettres[k]).join('');
    const mot = m.mots.find((p) => !trouves.includes(p.mot) && (p.mot === lu || p.mot === [...lu].reverse().join('')));
    if (!mot) { setRate(seg); return; }
    const t = [...trouves, mot.mot];
    setTrouves(t);
    if (t.length === m.mots.length) onFin(true, `Les ${m.mots.length} mots sont trouvés.`);
  };
  return (
    <div className="jeu-plateau">
      <p className="muet">Thème : {m.theme}</p>
      <div className="mots-meles" style={{ gridTemplateColumns: `repeat(${m.taille}, 1fr)` }}>
        {m.lettres.map((l, i) => (
          <button key={i} type="button" onClick={() => toucher(i)}
            className={`lettre${casesTrouvees.has(i) ? ' lettre--trouvee' : ''}${debut === i ? ' lettre--debut' : ''}${rate.includes(i) ? ' lettre--ratee' : ''}`}>
            {l}
          </button>
        ))}
      </div>
      <ul className="mots-liste">
        {m.mots.map((p) => <li key={p.mot} className={trouves.includes(p.mot) ? 'mot--trouve' : ''}>{p.mot}</li>)}
      </ul>
      <button type="button" className="hp-btn hp-btn--ghost" onClick={() => onFin(false, `${trouves.length} mot${trouves.length > 1 ? 's' : ''} sur ${m.mots.length}.`)}>J’arrête</button>
    </div>
  );
}

export const PLATEAUX: Record<IdJeu, (p: PropsJeu) => React.ReactElement> = {
  suites: SuitesJeu,
  sudoku: SudokuJeu,
  memoire: MemoireJeu,
  intrus: IntrusJeu,
  labyrinthe: LabyrintheJeu,
  sommes: SommesJeu,
  'mots-meles': MotsMelesJeu,
};
