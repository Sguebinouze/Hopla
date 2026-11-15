import { pourLaVoix } from '@hopla/redaction';

// Voix d'Octave : synthèse vocale du navigateur (Web Speech), en français.
// Aucune donnée ne quitte l'appareil : la voix est produite localement par le système.

const CLE_AUTO = 'hopla.voix-auto';

export const voixDisponible = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

let voix: SpeechSynthesisVoice | null = null;
function choisirVoix() {
  if (!voixDisponible()) return;
  const fr = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('fr'));
  voix = fr.find((v) => v.lang === 'fr-FR' && v.localService) ?? fr.find((v) => v.lang === 'fr-FR') ?? fr[0] ?? null;
}
if (voixDisponible()) {
  choisirVoix();
  speechSynthesis.addEventListener?.('voiceschanged', choisirVoix);
}

/** Lit un texte à voix haute ; coupe la lecture en cours. */
export function dire(texte: string, surFin?: () => void) {
  if (!voixDisponible() || !texte.trim()) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(pourLaVoix(texte));
  u.lang = 'fr-FR';
  u.rate = 0.92;
  if (voix) u.voice = voix;
  if (surFin) {
    u.onend = surFin;
    u.onerror = surFin;
  }
  speechSynthesis.speak(u);
}

export function taire() {
  if (voixDisponible()) speechSynthesis.cancel();
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
