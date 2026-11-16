import { useSyncExternalStore } from 'react';
import type { Api, Enfant, Resultat } from './donnees';

// Mode hors connexion de l'enfant en session.
// Lectures : la dernière réponse reçue est gardée sur l'appareil et resservie sans réseau.
// Écritures : réponses aux questions, leçons vues et records attendent dans une file,
// envoyée dès que le réseau revient (dans l'ordre, sans doublon).
// Les packs de contenu et l'app elle-même sont mis en cache par le service worker.

type Action =
  | { m: 'enregistrer'; r: Resultat }
  | { m: 'noterLecon'; c: string }
  | { m: 'noterDefi'; d: string; s: number };

const PREFIXE = 'hopla.hors-ligne';

/** Session courante : un profil sur un appareil familial, ou l'appareil appairé de l'enfant. */
function session(): string | null {
  try {
    if (localStorage.getItem('hopla.appareil')) return 'appareil';
    return sessionStorage.getItem('hopla.enfant');
  } catch {
    return null;
  }
}

function lire<T>(cle: string, defaut: T): T {
  try {
    const v = localStorage.getItem(cle);
    return v === null ? defaut : (JSON.parse(v) as T);
  } catch {
    return defaut;
  }
}

function ecrire(cle: string, v: unknown): void {
  try {
    localStorage.setItem(cle, JSON.stringify(v));
  } catch {
    // Stockage plein ou indisponible : on reste en mémoire, sans file d'attente.
  }
}

export function erreurReseau(e: unknown): boolean {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return true;
  const m = String((e as { message?: unknown })?.message ?? e);
  return /failed to fetch|networkerror|network request failed|load failed|fetch failed/i.test(m);
}

// État visible par l'interface : hors connexion ou non, nombre d'éléments en attente.
let etat = { horsLigne: typeof navigator !== 'undefined' && navigator.onLine === false, enAttente: 0 };
const ecouteurs = new Set<() => void>();
function majEtat(p: Partial<typeof etat>): void {
  const n = { ...etat, ...p };
  if (n.horsLigne === etat.horsLigne && n.enAttente === etat.enAttente) return;
  etat = n;
  for (const f of ecouteurs) f();
}
export function useReseau() {
  return useSyncExternalStore(
    (f) => { ecouteurs.add(f); return () => { ecouteurs.delete(f); }; },
    () => etat,
    () => etat,
  );
}

const cleFile = (s: string) => `${PREFIXE}.file.${s}`;
const cleCache = (s: string, nom: string) => `${PREFIXE}.${nom}.${s}`;

function file(): Action[] {
  const s = session();
  return s ? lire<Action[]>(cleFile(s), []) : [];
}

function mettreEnFile(a: Action): void {
  const s = session();
  if (!s) return;
  const f = [...lire<Action[]>(cleFile(s), []), a].slice(-2000);
  ecrire(cleFile(s), f);
  majEtat({ enAttente: f.length });
}

export function avecHorsLigne(api: Api): Api {
  const orig = {
    enfantCourant: api.enfantCourant.bind(api),
    progression: api.progression.bind(api),
    records: api.records.bind(api),
    controle: api.controle.bind(api),
    minutesAujourdhui: api.minutesAujourdhui.bind(api),
    defiFamille: api.defiFamille.bind(api),
    cahier: api.cahier.bind(api),
    mesJournees: api.mesJournees.bind(api),
    enregistrer: api.enregistrer.bind(api),
    noterLecon: api.noterLecon.bind(api),
    noterDefi: api.noterDefi.bind(api),
  };

  /** Lecture : réseau d'abord, copie locale si le réseau manque. */
  async function lecture<T>(nom: string, appel: () => Promise<T>, defaut: T): Promise<T> {
    const s = session();
    try {
      const v = await appel();
      if (s) ecrire(cleCache(s, nom), v);
      majEtat({ horsLigne: false });
      void vider();
      return v;
    } catch (e) {
      if (!s || !erreurReseau(e)) throw e;
      majEtat({ horsLigne: true });
      return lire<T>(cleCache(s, nom), defaut);
    }
  }

  let enCours: Promise<void> | null = null;
  /** Envoie la file d'attente ; s'arrête à la première erreur réseau. */
  function vider(): Promise<void> {
    enCours ??= (async () => {
      const s = session();
      if (!s) return;
      for (;;) {
        const f = lire<Action[]>(cleFile(s), []);
        majEtat({ enAttente: f.length });
        const a = f[0];
        if (!a) return;
        try {
          if (a.m === 'enregistrer') await orig.enregistrer(a.r);
          else if (a.m === 'noterLecon') await orig.noterLecon(a.c);
          else await orig.noterDefi(a.d, a.s);
        } catch (e) {
          if (erreurReseau(e)) { majEtat({ horsLigne: true }); return; }
          // Refus du serveur (session expirée, donnée invalide) : on n'insiste pas pour cet élément.
        }
        ecrire(cleFile(s), lire<Action[]>(cleFile(s), []).slice(1));
      }
    })().finally(() => { enCours = null; });
    return enCours;
  }

  /** Écriture : envoyée tout de suite si possible, sinon mise en file. */
  async function ecriture(a: Action, appel: () => Promise<void>): Promise<void> {
    if (file().length > 0) { mettreEnFile(a); void vider(); return; }
    try {
      await appel();
      majEtat({ horsLigne: false });
    } catch (e) {
      if (!erreurReseau(e)) throw e;
      majEtat({ horsLigne: true });
      mettreEnFile(a);
    }
  }

  api.enfantCourant = () => lecture<Enfant | null>('enfant', orig.enfantCourant, null);
  api.progression = () => lecture('progression', orig.progression, {});
  api.records = () => lecture('records', orig.records, {});
  api.controle = (enfant?: string) => (enfant ? orig.controle(enfant) : lecture('controle', () => orig.controle(), null));
  api.minutesAujourdhui = () => lecture('minutes', orig.minutesAujourdhui, 0);
  api.defiFamille = () => lecture('defi', orig.defiFamille, null);
  api.cahier = (enfant?: string) => (enfant ? orig.cahier(enfant) : lecture('cahier', () => orig.cahier(), null));
  api.mesJournees = (jours) => lecture(`journees`, () => orig.mesJournees(jours), []);
  api.enregistrer = (r) => ecriture({ m: 'enregistrer', r }, () => orig.enregistrer(r));
  api.noterLecon = (c) => ecriture({ m: 'noterLecon', c }, () => orig.noterLecon(c));
  api.noterDefi = async (d, sc) => {
    const s = session();
    const records = s ? lire<Record<string, number>>(cleCache(s, 'records'), {}) : {};
    const nouveau = sc > (records[d] ?? 0);
    let reponse: boolean | null = null;
    await ecriture({ m: 'noterDefi', d, s: sc }, async () => { reponse = await orig.noterDefi(d, sc); });
    if (s && nouveau) ecrire(cleCache(s, 'records'), { ...records, [d]: sc });
    return reponse ?? nouveau;
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => { majEtat({ horsLigne: false }); void vider(); });
    window.addEventListener('offline', () => majEtat({ horsLigne: true }));
    majEtat({ enAttente: file().length });
    void vider();
  }
  return api;
}
