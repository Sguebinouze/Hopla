import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { anneeScolaire } from './annee';

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
}

export interface Api {
  mode: 'demo' | 'supabase';
  parentConnecte(): Promise<boolean>;
  envoyerLienParent(email: string): Promise<void>;
  listeProfils(): Promise<Profil[]>;
  /** Renvoie faux si le code est incorrect. */
  ouvrirSession(enfant: string, code: string): Promise<boolean>;
  enfantCourant(): Promise<Enfant | null>;
  enregistrer(r: Resultat): Promise<void>;
  fermerSession(): Promise<void>;
  // Espace parent
  definirCodeParent(code: string): Promise<void>;
  ouvrirModeParent(code: string): Promise<boolean>;
  creerEnfant(e: { prenom: string; avatar: string; classe: Classe; code: string }): Promise<void>;
}

const CLE_SESSION = 'hopla.session-enfant';
const CLE_ENFANT = 'hopla.enfant';
const CLE_PARENT = 'hopla.session-parent';

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
      });
      if (error) throw error;
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
  };
}

// ─────────────────────────────── Démo (sans backend)

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
    envoyerLienParent: async () => undefined,
    listeProfils: async () => lire().map(({ id, prenom, avatar, code_type }) => ({ id, prenom, avatar, code_type })),
    async ouvrirSession(enfant, code) {
      if (code !== CODE_DEMO) return false;
      sessionStorage.setItem(CLE_ENFANT, enfant);
      return true;
    },
    async enfantCourant() {
      const id = sessionStorage.getItem(CLE_ENFANT);
      return lire().find((e) => e.id === id) ?? null;
    },
    async enregistrer(r) {
      const id = sessionStorage.getItem(CLE_ENFANT);
      ecrire(lire().map((e) => (e.id === id ? { ...e, xp: e.xp + (r.reussi ? (r.indice ? 6 : 10) : 2), serie: Math.max(1, e.serie) } : e)));
    },
    async fermerSession() {
      sessionStorage.removeItem(CLE_ENFANT);
    },
    definirCodeParent: async () => undefined,
    ouvrirModeParent: async (code) => code === CODE_DEMO,
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
