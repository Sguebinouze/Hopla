import { pourLaVoix } from '@hopla/redaction';

// Voix d'Octave : synthèse vocale du navigateur (Web Speech), en français,
// et dans la langue étudiée pour les questions d'écoute (anglais, allemand, espagnol).
// Aucune donnée ne quitte l'appareil : la voix est produite localement par le système.

const CLE_AUTO = 'hopla.voix-auto';

export const voixDisponible = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

export type Langue = 'fr-FR' | 'en-GB' | 'de-DE' | 'es-ES';
const voix: Partial<Record<Langue, SpeechSynthesisVoice | null>> = {};
function choisirVoix() {
  if (!voixDisponible()) return;
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
  if (!voixDisponible()) return false;
  if (voix[langue] === undefined) choisirVoix();
  return Boolean(voix[langue]) || speechSynthesis.getVoices().length === 0;
}
if (voixDisponible()) {
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

/** Lit un texte à voix haute ; coupe la lecture en cours, sauf si `ensuite` (le texte suit la lecture en cours). */
export function dire(texte: string, surFin?: () => void, langue: Langue = 'fr-FR', ensuite = false) {
  if (!voixDisponible() || !texte.trim()) return;
  if (!ensuite) speechSynthesis.cancel();
  const morceaux = phrases(langue === 'fr-FR' ? pourLaVoix(texte) : texte);
  let fini = false;
  const terminer = () => {
    if (fini) return;
    fini = true;
    surFin?.();
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
