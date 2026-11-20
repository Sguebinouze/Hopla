import { cheminAudio, type TexteLu } from './textesLus';

// Voix d'Octave. Les textes rédigés (consignes, indices, explications, leçons, dictées) ont un fichier
// audio enregistré à l'avance avec la voix Algenib (Google Chirp 3 HD), servi par le stockage public
// (VITE_VOIX_URL). Un texte sans fichier (question tirée au hasard par un générateur) n'est pas lu :
// pas de voix de synthèse de l'appareil, l'enfant lit. Rien ne part de l'appareil : la lecture télécharge un fichier.

const CLE_AUTO = 'hopla.voix-auto';

const BASE_AUDIO = (import.meta.env.VITE_VOIX_URL as string | undefined)?.replace(/\/$/, '') ?? '';
const lecteur: HTMLAudioElement | null = BASE_AUDIO && typeof Audio !== 'undefined' ? new Audio() : null;
export const voixDisponible = () => lecteur !== null;

/** Textes qui ont un fichier audio (ceux du pack chargé), par chemin. Un fichier introuvable en sort. */
const enregistres = new Set<string>();
/** Textes de langue vivante découpés en passages : chacun est lu avec la voix de sa langue. */
const passagesDe = new Map<string, TexteLu[]>();
export function connaitreTextes(textes: TexteLu[], decoupes: Record<string, TexteLu[]> = {}) {
  for (const [texte, passages] of Object.entries(decoupes)) passagesDe.set(texte, passages);
  if (!lecteur) return;
  for (const t of textes) enregistres.add(cheminAudio(t.langue, t.texte));
}

// iPad, iPhone : un élément audio ne joue seul qu'après une première lecture lancée par un geste.
// On le débloque au premier toucher, avec un silence, pour les lectures automatiques du cycle 2.
const SILENCE = 'data:audio/wav;base64,UklGRkQDAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSADAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA==';
if (lecteur && typeof document !== 'undefined') {
  const debloquer = () => {
    lecteur.src = SILENCE;
    lecteur.play().catch(() => {});
    document.removeEventListener('pointerdown', debloquer, true);
  };
  document.addEventListener('pointerdown', debloquer, true);
}

export type Langue = 'fr-FR' | 'en-GB' | 'de-DE' | 'es-ES';

/** Vrai si ce texte a sa voix enregistrée (tous ses passages pour un texte de langue vivante découpé). */
export function aUneVoix(texte: string, langue: Langue = 'fr-FR'): boolean {
  if (!lecteur || !texte.trim()) return false;
  const passages = langue === 'fr-FR' ? passagesDe.get(texte) : undefined;
  return passages
    ? passages.every((p) => enregistres.has(cheminAudio(p.langue, p.texte)))
    : enregistres.has(cheminAudio(langue, texte));
}

/** Vitesse de lecture (1 : normale). Le ton de la voix ne change pas. */
let vitesse = 1;
export function reglerVitesse(v: number) {
  vitesse = v;
}

// File de lecture : un texte après l'autre (consigne puis phrase d'écoute). `tour` invalide
// les rappels d'une lecture interrompue.
let file: { texte: string; langue: Langue; surFin?: () => void }[] = [];
let enCours = false;
let tour = 0;

/** Passages d'un texte découpé : le fichier suivant est demandé pendant la lecture, sans blanc entre deux voix. */
function prechargerSuivant() {
  const p = file[0];
  if (!p) return;
  const chemin = cheminAudio(p.langue, p.texte);
  if (enregistres.has(chemin)) void fetch(`${BASE_AUDIO}/${chemin}`, { mode: 'no-cors' }).catch(() => undefined);
}

function suivant() {
  const m = file.shift();
  if (!m) { enCours = false; return; }
  enCours = true;
  const ce = tour;
  let fini = false;
  const fin = () => {
    if (fini || ce !== tour) return;
    fini = true;
    m.surFin?.();
    suivant();
  };
  const chemin = cheminAudio(m.langue, m.texte);
  if (!lecteur || !enregistres.has(chemin)) return fin();
  // Fichier absent : le texte sort de la liste des textes lus, son bouton disparaît au prochain affichage.
  lecteur.onended = fin;
  lecteur.onerror = () => {
    enregistres.delete(chemin);
    fin();
  };
  lecteur.src = `${BASE_AUDIO}/${chemin}`;
  lecteur.defaultPlaybackRate = vitesse;
  lecteur.playbackRate = vitesse;
  prechargerSuivant();
  lecteur.play().catch((e: unknown) => {
    if ((e as { name?: string })?.name !== 'AbortError') fin();
  });
}

/**
 * Lit un texte à voix haute ; coupe la lecture en cours, sauf si `ensuite` (le texte suit la lecture en cours).
 * Sans voix enregistrée, rien n'est lu ; `surFin` est appelé quand même, pour qu'un enchainement
 * (dictée) ne reste pas bloqué sur un fichier manquant.
 */
export function dire(texte: string, surFin?: () => void, langue: Langue = 'fr-FR', ensuite = false) {
  if (!aUneVoix(texte, langue)) {
    if (surFin) window.setTimeout(surFin, 0);
    return;
  }
  if (!ensuite) taire();
  const passages = langue === 'fr-FR' ? passagesDe.get(texte) : undefined;
  if (passages) passages.forEach((p, i) => file.push({ ...p, surFin: i === passages.length - 1 ? surFin : undefined }));
  else file.push({ texte, langue, surFin });
  if (!enCours) suivant();
}

export function taire() {
  tour++;
  file = [];
  enCours = false;
  if (lecteur) {
    lecteur.onended = null;
    lecteur.onerror = null;
    lecteur.pause();
  }
}

/** Lecture automatique des consignes : activée par défaut au cycle 2, réglable par l'enfant. */
export function lectureAuto(cycle: number): boolean {
  try {
    const v = localStorage.getItem(CLE_AUTO);
    if (v !== null) return v === '1';
  } catch {
    /* stockage indisponible : réglage par défaut */
  }
  return cycle === 2;
}
export function reglerLectureAuto(actif: boolean) {
  try {
    localStorage.setItem(CLE_AUTO, actif ? '1' : '0');
  } catch {
    /* sans stockage, le réglage vaut pour la session seulement */
  }
}
