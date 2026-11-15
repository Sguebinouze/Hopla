import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { anneeScolaire } from './annee';
import { majSuivi, type Suivi } from './progression';

export type Classe = 'cp' | 'ce1' | 'ce2' | 'cm1' | 'cm2' | '6e' | '5e' | '4e' | '3e';

export interface Profil {
  id: string;
  prenom: string;
  avatar: string;
  code_type: 'pictos' | 'chiffres';
}

export interface Enfant extends Profil {
  classe: Classe;
  xp: number;
  serie: number;
}

export interface Resultat {
  competence: string;
  contenu: string;
  reussi: boolean;
  indice: boolean;
  dureeMs: number;
  /** Option choisie (QCM) ou nombre saisi. Jamais de texte libre. */
  reponse?: string;
  /** Code d'erreur typique de l'option choisie, s'il existe. */
  erreur?: string;
}

export interface ErreurFrequente {
  competence: string;
  erreur: string;
  nb: number;
}

export interface DecisionRelecture {
  type: 'notion' | 'lecon' | 'question';
  element_id: string;
  decision: 'ok' | 'corriger';
  commentaire: string;
  maj_le?: string;
}

export interface Appareil {
  id: string;
  enfant_id: string;
  nom: string;
  cree_le: string;
  vu_le: string;
}

export interface MembreFamille {
  user_id: string;
  email: string;
  rejoint_le: string;
  moi: boolean;
}

export interface ControlePrevu {
  date: string;
  notions: string[];
}

export interface SuiviEnfant {
  enfant: Enfant;
  progression: Record<string, Suivi>;
  erreurs: ErreurFrequente[];
}

export interface Api {
  mode: 'demo' | 'supabase';
  parentConnecte(): Promise<boolean>;
  envoyerLienParent(email: string): Promise<void>;
  /** Connexion parent par Apple ou Google (si le fournisseur est activé dans Supabase). */
  connecterAvec(fournisseur: 'apple' | 'google'): Promise<void>;
  listeProfils(): Promise<Profil[]>;
  /** Renvoie faux si le code est incorrect. */
  ouvrirSession(enfant: string, code: string): Promise<boolean>;
  enfantCourant(): Promise<Enfant | null>;
  enregistrer(r: Resultat): Promise<void>;
  /** Progression de l'enfant en session, par compétence. */
  progression(): Promise<Record<string, Suivi>>;
  fermerSession(): Promise<void>;
  // Espace parent
  definirCodeParent(code: string): Promise<void>;
  ouvrirModeParent(code: string): Promise<boolean>;
  creerEnfant(e: { prenom: string; avatar: string; classe: Classe; code: string }): Promise<void>;
  /** Mode parent ouvert : progression et erreurs fréquentes de chaque enfant. */
  suiviParent(): Promise<SuiviEnfant[]>;
  // Appareil de l'enfant : appairé par un code du parent, limité à ce profil.
  /** Profil associé à cet appareil, ou null. */
  monAppareil(): Promise<Enfant | null>;
  lierAppareil(code: string): Promise<Enfant>;
  // Mode parent : famille et appareils.
  membresFamille(): Promise<MembreFamille[]>;
  inviterParent(): Promise<string>;
  rejoindreFamille(code: string): Promise<void>;
  creerAppairage(enfant: string): Promise<string>;
  appareils(): Promise<Appareil[]>;
  retirerAppareil(id: string): Promise<void>;
  // Défis et contrôle de l'enfant en session (ou d'un enfant en mode parent).
  records(): Promise<Record<string, number>>;
  /** Vrai si c'est un nouveau record. */
  noterDefi(defi: string, score: number): Promise<boolean>;
  controle(enfant?: string): Promise<ControlePrevu | null>;
  prevoirControle(c: ControlePrevu | null, enfant?: string): Promise<void>;
  // Espace admin : compte inscrit comme admin, mode parent ouvert (contrôlé en base).
  estAdmin(): Promise<boolean>;
  decisionsRelecture(): Promise<DecisionRelecture[]>;
  enregistrerDecisions(d: DecisionRelecture[]): Promise<void>;
}

type LigneProgression = {
  competence_id: string; score: number; nb_essais: number; prochaine_revision: string;
  reussites_espacees: number; derniere_reussite: string | null;
};
const COLONNES_PROGRESSION = 'competence_id, score, nb_essais, prochaine_revision, reussites_espacees, derniere_reussite';
const versSuivi = (l: LigneProgression): Suivi => ({
  score: l.score, nbEssais: l.nb_essais, prochaineRevision: l.prochaine_revision,
  reussitesEspacees: l.reussites_espacees, derniereReussite: l.derniere_reussite,
});

const CLE_SESSION = 'hopla.session-enfant';
const CLE_ENFANT = 'hopla.enfant';
const CLE_PARENT = 'hopla.session-parent';
/** Appareil de l'enfant : jeton durable, gardé sur l'appareil (localStorage). */
const CLE_APPAREIL = 'hopla.appareil';

function jetonAppareil(): string | null {
  try {
    return localStorage.getItem(CLE_APPAREIL);
  } catch {
    return null;
  }
}

/** Nom générique de l'appareil, sans rien d'identifiant. */
/** Vrai si cet appareil est associé à un profil enfant. */
export const surAppareilEnfant = () => jetonAppareil() !== null;

export function nomAppareil(): string {
  const ua = navigator.userAgent;
  if (/iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'iPad';
  if (/iPhone/.test(ua)) return 'iPhone';
  if (/Android/.test(ua)) return /Mobile/.test(ua) ? 'Téléphone Android' : 'Tablette Android';
  if (/Macintosh/.test(ua)) return 'Mac';
  if (/Windows/.test(ua)) return 'PC Windows';
  return 'Appareil';
}

const auJour = () => {
  const d = new Date();
  const z = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
};

// ─────────────────────────────── Supabase

function apiSupabase(url: string, cle: string): Api {
  // Le jeton de session enfant reste dans l'onglet (sessionStorage) et part en en-tête.
  const client: SupabaseClient = createClient(url, cle, {
    global: {
      fetch: (entree, init) => {
        const entetes = new Headers(init?.headers);
        const jeton = sessionStorage.getItem(CLE_SESSION);
        if (jeton) entetes.set('x-session-enfant', jeton);
        const jetonParent = sessionStorage.getItem(CLE_PARENT);
        if (jetonParent) entetes.set('x-session-parent', jetonParent);
        const appareil = jetonAppareil();
        if (appareil) entetes.set('x-appareil', appareil);
        return fetch(entree, { ...init, headers: entetes });
      },
    },
  });

  const fermerTout = async () => {
    if (sessionStorage.getItem(CLE_SESSION) || sessionStorage.getItem(CLE_PARENT)) {
      await client.rpc('fermer_sessions');
    }
    sessionStorage.removeItem(CLE_SESSION);
    sessionStorage.removeItem(CLE_PARENT);
    sessionStorage.removeItem(CLE_ENFANT);
  };

  return {
    mode: 'supabase',
    async parentConnecte() {
      const { data } = await client.auth.getSession();
      return data.session !== null;
    },
    async envoyerLienParent(email) {
      const { error } = await client.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin } });
      if (error) throw error;
    },
    async connecterAvec(fournisseur) {
      const { error } = await client.auth.signInWithOAuth({ provider: fournisseur, options: { redirectTo: location.origin } });
      if (error) throw error;
    },
    async listeProfils() {
      const { data, error } = await client.rpc('liste_profils');
      if (error) throw error;
      return data as Profil[];
    },
    async ouvrirSession(enfant, code) {
      // Une seule session à la fois dans l'onglet : on ferme le mode parent ou la session précédente.
      await fermerTout();
      const { data, error } = await client.rpc('ouvrir_session_enfant', { p_enfant: enfant, p_code: code });
      if (error) throw error;
      if (!data) return false;
      sessionStorage.setItem(CLE_SESSION, data as string);
      sessionStorage.setItem(CLE_ENFANT, enfant);
      return true;
    },
    async enfantCourant() {
      if (jetonAppareil()) return this.monAppareil();
      const id = sessionStorage.getItem(CLE_ENFANT);
      if (!sessionStorage.getItem(CLE_SESSION) || !id) return null;
      const { data, error } = await client
        .from('enfants')
        .select('id, prenom, avatar, classe, code_type, xp, serie')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data as Enfant | null;
    },
    async enregistrer(r) {
      const enfant = await this.enfantCourant();
      if (!enfant) return;
      const { error } = await client.from('resultats').insert({
        enfant_id: enfant.id,
        competence_id: r.competence,
        contenu_id: r.contenu,
        annee_scolaire: anneeScolaire(),
        reussi: r.reussi,
        indice: r.indice,
        duree_ms: Math.min(r.dureeMs, 3_600_000),
        reponse: r.reponse?.slice(0, 60) ?? null,
        erreur: r.erreur ?? null,
      });
      if (error) throw error;
    },
    async progression() {
      if (!sessionStorage.getItem(CLE_SESSION) && !jetonAppareil()) return {};
      const { data, error } = await client.from('progression_competences').select(COLONNES_PROGRESSION);
      if (error) throw error;
      return Object.fromEntries((data as LigneProgression[]).map((l) => [l.competence_id, versSuivi(l)]));
    },
    fermerSession: fermerTout,
    async definirCodeParent(code) {
      const { error } = await client.rpc('definir_code_parent', { p_code: code });
      if (error) throw error;
    },
    async ouvrirModeParent(code) {
      await fermerTout();
      const { data, error } = await client.rpc('ouvrir_mode_parent', { p_code: code });
      if (error) throw error;
      if (!data) return false;
      sessionStorage.setItem(CLE_PARENT, data as string);
      return true;
    },
    async creerEnfant(e) {
      const { error } = await client.rpc('creer_enfant', {
        p_prenom: e.prenom, p_avatar: e.avatar, p_classe: e.classe, p_code: e.code,
      });
      if (error) throw error;
    },
    async suiviParent() {
      const { data: enfants, error } = await client.from('enfants')
        .select('id, prenom, avatar, classe, code_type, xp, serie').order('cree_le');
      if (error) throw error;
      const { data: lignes, error: e2 } = await client.from('progression_competences')
        .select(`enfant_id, ${COLONNES_PROGRESSION}`);
      if (e2) throw e2;
      return Promise.all((enfants as Enfant[]).map(async (enfant) => {
        const { data: erreurs, error: e3 } = await client.rpc('erreurs_frequentes', { p_enfant: enfant.id });
        if (e3) throw e3;
        return {
          enfant,
          progression: Object.fromEntries((lignes as (LigneProgression & { enfant_id: string })[])
            .filter((l) => l.enfant_id === enfant.id).map((l) => [l.competence_id, versSuivi(l)])),
          erreurs: (erreurs as { competence_id: string; erreur: string; nb: number }[])
            .map((x) => ({ competence: x.competence_id, erreur: x.erreur, nb: Number(x.nb) })),
        };
      }));
    },
    async monAppareil() {
      if (!jetonAppareil()) return null;
      const { data, error } = await client.rpc('mon_appareil');
      if (error) throw error;
      const e = (data as (Omit<Enfant, 'id' | 'code_type'> & { enfant_id: string })[])[0];
      if (!e) {
        // Appareil retiré par le parent : on oublie le jeton.
        try { localStorage.removeItem(CLE_APPAREIL); } catch { /* rien */ }
        return null;
      }
      return { id: e.enfant_id, prenom: e.prenom, avatar: e.avatar, classe: e.classe, xp: e.xp, serie: e.serie, code_type: 'pictos' } as Enfant;
    },
    async lierAppareil(code) {
      const { data, error } = await client.rpc('lier_appareil', { p_code: code, p_nom: nomAppareil() });
      if (error) throw error;
      const l = (data as { jeton: string; enfant_id: string; prenom: string; avatar: string; classe: Classe }[])[0]!;
      localStorage.setItem(CLE_APPAREIL, l.jeton);
      sessionStorage.removeItem(CLE_SESSION);
      sessionStorage.removeItem(CLE_PARENT);
      return { id: l.enfant_id, prenom: l.prenom, avatar: l.avatar, classe: l.classe, xp: 0, serie: 0, code_type: 'pictos' } as Enfant;
    },
    async membresFamille() {
      const { data, error } = await client.rpc('membres_de_ma_famille');
      if (error) throw error;
      return data as MembreFamille[];
    },
    async inviterParent() {
      const { data, error } = await client.rpc('inviter_parent');
      if (error) throw error;
      return data as string;
    },
    async rejoindreFamille(code) {
      const { error } = await client.rpc('rejoindre_famille', { p_code: code });
      if (error) throw error;
    },
    async creerAppairage(enfant) {
      const { data, error } = await client.rpc('creer_appairage', { p_enfant: enfant });
      if (error) throw error;
      return data as string;
    },
    async appareils() {
      const { data, error } = await client.from('appareils').select('id, enfant_id, nom, cree_le, vu_le').order('cree_le');
      if (error) throw error;
      return data as Appareil[];
    },
    async retirerAppareil(id) {
      const { error } = await client.from('appareils').delete().eq('id', id);
      if (error) throw error;
    },
    async records() {
      const { data, error } = await client.from('records_defis').select('defi_id, record');
      if (error) throw error;
      return Object.fromEntries((data as { defi_id: string; record: number }[]).map((r) => [r.defi_id, r.record]));
    },
    async noterDefi(defi, score) {
      const { data, error } = await client.rpc('noter_defi', { p_defi: defi, p_score: score });
      if (error) throw error;
      return data === true;
    },
    async controle(enfant) {
      const id = enfant ?? (await this.enfantCourant())?.id;
      if (!id) return null;
      const { data, error } = await client.from('controles').select('date, notions').eq('enfant_id', id).maybeSingle();
      if (error) throw error;
      const c = data as ControlePrevu | null;
      return c && c.date >= auJour() ? c : null;
    },
    async prevoirControle(c, enfant) {
      const id = enfant ?? (await this.enfantCourant())?.id;
      if (!id) throw new Error('Aucun profil en cours.');
      const { error } = c
        ? await client.from('controles').upsert({ enfant_id: id, date: c.date, notions: c.notions, maj_le: new Date().toISOString() })
        : await client.from('controles').delete().eq('enfant_id', id);
      if (error) throw error;
    },
    async estAdmin() {
      if (!sessionStorage.getItem(CLE_PARENT)) return false;
      const { data, error } = await client.rpc('est_admin');
      if (error) throw error;
      return data === true;
    },
    async decisionsRelecture() {
      const toutes: DecisionRelecture[] = [];
      for (let debut = 0; ; debut += 1000) {
        const { data, error } = await client.from('relectures')
          .select('type, element_id, decision, commentaire, maj_le').order('element_id').range(debut, debut + 999);
        if (error) throw error;
        toutes.push(...(data as DecisionRelecture[]));
        if (data.length < 1000) return toutes;
      }
    },
    async enregistrerDecisions(d) {
      const maj_le = new Date().toISOString();
      for (let i = 0; i < d.length; i += 200) {
        const lot = d.slice(i, i + 200).map((x) => ({
          type: x.type, element_id: x.element_id, decision: x.decision, commentaire: x.commentaire.slice(0, 2000), maj_le,
        }));
        const { error } = await client.from('relectures').upsert(lot, { onConflict: 'type,element_id' });
        if (error) throw error;
      }
    },
  };
}

// ─────────────────────────────── Démo (sans backend)

function lireDemo<T>(cle: string, defaut: T): T {
  try {
    const v = localStorage.getItem(cle);
    return v ? (JSON.parse(v) as T) : defaut;
  } catch {
    return defaut;
  }
}
function ecrireDemo(cle: string, valeur: unknown) {
  try {
    if (valeur === null) localStorage.removeItem(cle);
    else localStorage.setItem(cle, JSON.stringify(valeur));
  } catch {
    /* stockage indisponible : rien n'est gardé */
  }
}

const CODE_DEMO = '1111';
const ENFANTS_DEMO: Enfant[] = [
  { id: 'demo-ce1', prenom: 'Élève de CE1', avatar: 'orange', code_type: 'pictos', classe: 'ce1', xp: 0, serie: 0 },
  { id: 'demo-6e', prenom: 'Élève de 6e', avatar: 'violet', code_type: 'chiffres', classe: '6e', xp: 0, serie: 0 },
];

function apiDemo(): Api {
  const lire = (): Enfant[] => {
    try {
      return JSON.parse(localStorage.getItem('hopla.demo') ?? '') as Enfant[];
    } catch {
      return ENFANTS_DEMO;
    }
  };
  type Journal = Record<string, { progression: Record<string, Suivi>; erreurs: { competence: string; erreur: string }[] }>;
  const lireJournal = (): Journal => {
    try {
      return JSON.parse(localStorage.getItem('hopla.demo-suivi') ?? '{}') as Journal;
    } catch {
      return {};
    }
  };
  const ecrireJournal = (j: Journal) => {
    try {
      localStorage.setItem('hopla.demo-suivi', JSON.stringify(j));
    } catch {
      /* stockage indisponible : la démo ne garde pas la progression */
    }
  };
  const ecrire = (e: Enfant[]) => {
    try {
      localStorage.setItem('hopla.demo', JSON.stringify(e));
    } catch {
      /* stockage indisponible : la démo repart de zéro */
    }
  };
  return {
    mode: 'demo',
    parentConnecte: async () => true,
    connecterAvec: async () => { throw new Error('Pas de connexion externe en mode démo.'); },
    envoyerLienParent: async () => undefined,
    listeProfils: async () => lire().map(({ id, prenom, avatar, code_type }) => ({ id, prenom, avatar, code_type })),
    async ouvrirSession(enfant, code) {
      if (code !== CODE_DEMO) return false;
      sessionStorage.removeItem(CLE_PARENT);
      sessionStorage.setItem(CLE_ENFANT, enfant);
      return true;
    },
    async enfantCourant() {
      const id = jetonAppareil() ?? sessionStorage.getItem(CLE_ENFANT);
      return lire().find((e) => e.id === id) ?? null;
    },
    async enregistrer(r) {
      const id = jetonAppareil() ?? sessionStorage.getItem(CLE_ENFANT);
      ecrire(lire().map((e) => (e.id === id ? { ...e, xp: e.xp + (r.reussi ? (r.indice ? 6 : 10) : 2), serie: Math.max(1, e.serie) } : e)));
      if (!id) return;
      const j = lireJournal();
      const d = j[id] ?? { progression: {}, erreurs: [] };
      d.progression[r.competence] = majSuivi(d.progression[r.competence], r);
      if (r.erreur) d.erreurs = [...d.erreurs, { competence: r.competence, erreur: r.erreur }].slice(-200);
      j[id] = d;
      ecrireJournal(j);
    },
    async progression() {
      const id = jetonAppareil() ?? sessionStorage.getItem(CLE_ENFANT);
      return id ? (lireJournal()[id]?.progression ?? {}) : {};
    },
    async suiviParent() {
      const j = lireJournal();
      return lire().map((enfant) => {
        const d = j[enfant.id];
        const compte = new Map<string, ErreurFrequente>();
        for (const x of d?.erreurs ?? []) {
          const k = `${x.competence}#${x.erreur}`;
          compte.set(k, { ...x, nb: (compte.get(k)?.nb ?? 0) + 1 });
        }
        return {
          enfant,
          progression: d?.progression ?? {},
          erreurs: [...compte.values()].sort((a, b) => b.nb - a.nb).slice(0, 20),
        };
      });
    },
    async fermerSession() {
      sessionStorage.removeItem(CLE_ENFANT);
      sessionStorage.removeItem(CLE_PARENT);
    },
    definirCodeParent: async () => undefined,
    async ouvrirModeParent(code) {
      if (code !== CODE_DEMO) return false;
      sessionStorage.setItem(CLE_PARENT, 'demo');
      return true;
    },
    // Démo : appareils, famille, records et contrôles gardés dans ce navigateur.
    async monAppareil() {
      const id = jetonAppareil();
      return id ? (lire().find((e) => e.id === id) ?? null) : null;
    },
    async lierAppareil(code) {
      const c = lireDemo<Record<string, string>>('hopla.demo-appairages', {});
      const enfant = c[code.toUpperCase().replace(/[^A-Z0-9]/g, '')];
      const e = lire().find((x) => x.id === enfant);
      if (!e) throw new Error('Code inconnu ou expiré.');
      localStorage.setItem(CLE_APPAREIL, e.id);
      ecrireDemo('hopla.demo-appareils', [...lireDemo<Appareil[]>('hopla.demo-appareils', []),
        { id: `app-${Date.now()}`, enfant_id: e.id, nom: nomAppareil(), cree_le: new Date().toISOString(), vu_le: new Date().toISOString() }]);
      return e;
    },
    membresFamille: async () => [{ user_id: 'demo', email: 'parent@demo', rejoint_le: new Date().toISOString(), moi: true }],
    inviterParent: async () => 'DEMO2345',
    rejoindreFamille: async () => { throw new Error('Pas d’invitation en mode démo.'); },
    async creerAppairage(enfant) {
      const code = Array.from({ length: 8 }, () => 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 31)]).join('');
      ecrireDemo('hopla.demo-appairages', { ...lireDemo<Record<string, string>>('hopla.demo-appairages', {}), [code]: enfant });
      return code;
    },
    appareils: async () => lireDemo<Appareil[]>('hopla.demo-appareils', []),
    async retirerAppareil(id) {
      ecrireDemo('hopla.demo-appareils', lireDemo<Appareil[]>('hopla.demo-appareils', []).filter((a) => a.id !== id));
    },
    async records() {
      const id = (await this.enfantCourant())?.id;
      return id ? lireDemo<Record<string, number>>(`hopla.defis.${id}`, {}) : {};
    },
    async noterDefi(defi, score) {
      const id = (await this.enfantCourant())?.id;
      if (!id) return false;
      const r = lireDemo<Record<string, number>>(`hopla.defis.${id}`, {});
      if ((r[defi] ?? 0) >= score) return false;
      ecrireDemo(`hopla.defis.${id}`, { ...r, [defi]: score });
      return true;
    },
    async controle(enfant) {
      const id = enfant ?? (await this.enfantCourant())?.id;
      const c = id ? lireDemo<ControlePrevu | null>(`hopla.controle.${id}`, null) : null;
      return c && c.date >= auJour() && c.notions.length > 0 ? c : null;
    },
    async prevoirControle(c, enfant) {
      const id = enfant ?? (await this.enfantCourant())?.id;
      if (id) ecrireDemo(`hopla.controle.${id}`, c);
    },
    // Démo : admin dès que le mode parent est ouvert ; décisions gardées dans ce navigateur.
    estAdmin: async () => sessionStorage.getItem(CLE_PARENT) === 'demo',
    async decisionsRelecture() {
      try {
        return JSON.parse(localStorage.getItem('hopla.demo-relecture') ?? '[]') as DecisionRelecture[];
      } catch {
        return [];
      }
    },
    async enregistrerDecisions(d) {
      const toutes = new Map((await this.decisionsRelecture()).map((x) => [`${x.type}#${x.element_id}`, x]));
      const maj_le = new Date().toISOString();
      for (const x of d) toutes.set(`${x.type}#${x.element_id}`, { ...x, maj_le });
      try {
        localStorage.setItem('hopla.demo-relecture', JSON.stringify([...toutes.values()]));
      } catch {
        throw new Error('Stockage du navigateur indisponible : décisions non enregistrées.');
      }
    },
    async creerEnfant(e) {
      const id = `demo-${Date.now()}`;
      const code_type = ['cp', 'ce1', 'ce2', 'cm1', 'cm2'].includes(e.classe) ? 'pictos' : 'chiffres';
      ecrire([...lire(), { id, prenom: e.prenom, avatar: e.avatar, classe: e.classe, code_type, xp: 0, serie: 0 }]);
    },
  };
}

export const CODE_DE_DEMO = CODE_DEMO;

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const cle = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
export const api: Api = url && cle ? apiSupabase(url, cle) : apiDemo();
