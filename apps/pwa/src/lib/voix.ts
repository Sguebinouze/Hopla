import { pourLaVoix } from '@hopla/redaction';
import { cheminAudio, type TexteLu } from './textesLus';

// Voix d'Octave. Les textes rédigés (consignes, indices, explications, leçons) ont un fichier audio
// enregistré à l'avance avec la voix Algenib (Google Chirp 3 HD), servi par le stockage public
// (VITE_VOIX_URL). Les autres (questions tirées au hasard) et le hors connexion passent par la
// synthèse vocale de l'appareil. Rien ne part de l'appareil : la lecture télécharge un fichier.

const CLE_AUTO = 'hopla.voix-auto';

const syntheseDisponible = () => typeof window !== 'undefined' && 'speechSynthesis' in window;
const BASE_AUDIO = (import.meta.env.VITE_VOIX_URL as string | undefined)?.replace(/\/$/, '') ?? '';
const lecteur: HTMLAudioElement | null = BASE_AUDIO && typeof Audio !== 'undefined' ? new Audio() : null;
export const voixDisponible = () => lecteur !== null || syntheseDisponible();

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
const voix: Partial<Record<Langue, SpeechSynthesisVoice | null>> = {};
function choisirVoix() {
  if (!syntheseDisponible()) return;
  const toutes = speechSynthesis.getVoices();
  for (const langue of ['fr-FR', 'en-GB', 'de-DE', 'es-ES'] as const) {
    const debut = langue.slice(0, 2);
    const proches = toutes.filter((v) => v.lang.toLowerCase().startsWith(debut));
    const exacte = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-') === langue;
    // Les voix « améliorées » ou « premium » (iPad, Mac) sont bien plus naturelles que les voix compactes.
    const soignee = (v: SpeechSynthesisVoice) => /premium|enhanced|amélioré|natural|neural/i.test(v.name);
    voix[langue] = proches.find((v) => exacte(v) && soignee(v)) ?? proches.find((v) => exacte(v) && v.localService)
      ?? proches.find(exacte) ?? proches[0] ?? null;
  }
}

/** Vrai si l'appareil a une voix pour cette langue (les voix arrivent parfois après le chargement). */
export function voixPour(langue: Langue): boolean {
  if (lecteur) return true;
  if (!syntheseDisponible()) return false;
  if (voix[langue] === undefined) choisirVoix();
  return Boolean(voix[langue]) || speechSynthesis.getVoices().length === 0;
}
if (syntheseDisponible()) {
  choisirVoix();
  speechSynthesis.addEventListener?.('voiceschanged', choisirVoix);
}

/**
 * Découpe un texte en phrases, lues l'une après l'autre : la synthèse vocale de certains appareils
 * (iPad notamment) enchaine les phrases sans marquer les points. Chaque phrase garde sa ponctuation finale.
 */
export function phrases(texte: string): string[] {
  return texte
    .split(/(?<=[.!?…:;])\s+|\n+/)
    .map((p) => p.trim())
    .filter((p) => /[\p{L}\p{N}]/u.test(p));
}

/** Synthèse de l'appareil, phrase par phrase ; `fin` est appelé une fois, à la fin ou en cas d'erreur. */
function parler(texte: string, langue: Langue, fin: () => void) {
  if (!syntheseDisponible()) return fin();
  const morceaux = phrases(langue === 'fr-FR' ? pourLaVoix(texte) : texte);
  let fini = false;
  const terminer = () => {
    if (fini) return;
    fini = true;
    fin();
  };
  morceaux.forEach((m, i) => {
    const u = new SpeechSynthesisUtterance(m);
    u.lang = langue;
    u.rate = langue === 'fr-FR' ? 0.9 : 0.8;
    const v = voix[langue];
    if (v) u.voice = v;
    if (i === morceaux.length - 1) u.onend = terminer;
    u.onerror = terminer;
    speechSynthesis.speak(u);
  });
  if (morceaux.length === 0) terminer();
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
  if (!lecteur || !enregistres.has(chemin)) return parler(m.texte, m.langue, fin);
  // Fichier absent ou lecture refusée : la voix de l'appareil prend le relais.
  let relais = false;
  const repli = (absent: boolean) => {
    if (relais || fini || ce !== tour) return;
    relais = true;
    if (absent) enregistres.delete(chemin);
    parler(m.texte, m.langue, fin);
  };
  lecteur.onended = fin;
  lecteur.onerror = () => repli(true);
  lecteur.src = `${BASE_AUDIO}/${chemin}`;
  prechargerSuivant();
  lecteur.play().catch((e: unknown) => {
    if ((e as { name?: string })?.name !== 'AbortError') repli(false);
  });
}

/** Lit un texte à voix haute ; coupe la lecture en cours, sauf si `ensuite` (le texte suit la lecture en cours). */
export function dire(texte: string, surFin?: () => void, langue: Langue = 'fr-FR', ensuite = false) {
  if (!voixDisponible() || !texte.trim()) return;
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
  if (syntheseDisponible()) speechSynthesis.cancel();
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
