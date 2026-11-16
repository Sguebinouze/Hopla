import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { definirApparence } from './apparence';
import { avecHorsLigne } from './horsLigne';
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
  /** Matières masquées par le parent (identifiants : 'langues-vivantes'…). */
  matieres_masquees?: string[];
  /** Temps de travail maximal par jour, en minutes ; null : pas de limite. */
  minutes_par_jour?: number | null;
  /** Apparence d'Octave choisie par l'enfant (« couleur.accessoire ») ; null : d'origine. */
  octave?: string | null;
}

export const AVATARS = ['orange', 'violet', 'teal', 'framboise'] as const;

export interface ReglagesEnfant {
  prenom: string;
  avatar: string;
  classe: Classe;
  matieres_masquees: string[];
  minutes_par_jour: number | null;
}

export interface JourneeNotion {
  jour: string;
  competence_id: string;
  questions: number;
  reussies: number;
  duree_ms: number;
}

export interface LeconVue {
  competence_id: string;
  vues: number;
  derniere_vue: string;
}

/** Bilan des 7 derniers jours d'un enfant (calculé en base, même calcul que l'e-mail du dimanche). */
export interface BilanSemaine {
  enfant_id: string;
  prenom: string;
  classe: Classe;
  serie: number;
  jours_actifs: number;
  questions: number;
  reussies: number;
  minutes: number;
  notions: number;
  maitrisees: number;
  a_revoir: number;
  controle: { date: string; notions: number } | null;
}

/** Défi de la semaine en famille : objectif commun, total de la famille, part de l'enfant en session. */
export interface DefiFamille {
  sorte: 'bonnes_reponses' | 'jours_actifs' | 'notions';
  debut: string;
  fin: string;
  enfants: number;
  objectif: number;
  total: number;
  ma_part: number | null;
}

export interface Cahier { debut: string; jours: number }

export interface FicheEnfant {
  historique: JourneeNotion[];
  lecons: LeconVue[];
  records: Record<string, number>;
  controle: ControlePrevu | null;
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
  /** Connexion par le code reçu (8 chiffres) de l'e-mail : indispensable pour l'app installée sur iPhone et iPad, où le lien s'ouvre dans Safari. */
  verifierCodeParent(email: string, code: string): Promise<void>;
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
  /** Crée le profil et renvoie son identifiant. */
  creerEnfant(e: { prenom: string; avatar: string; classe: Classe; code: string }): Promise<string>;
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
  // Défi en famille (enfant en session ou mode parent) et cahier de vacances.
  defiFamille(): Promise<DefiFamille | null>;
  cahier(enfant?: string): Promise<Cahier | null>;
  ouvrirCahier(c: Cahier | null, enfant?: string): Promise<void>;
  /** Séances de l'enfant en session, par jour et par notion. */
  mesJournees(jours: number): Promise<JourneeNotion[]>;
  // Bilan de la semaine (mode parent) et e-mail du dimanche.
  bilanSemaine(): Promise<BilanSemaine[]>;
  bilanHebdoActif(): Promise<boolean>;
  reglerBilanHebdo(actif: boolean): Promise<void>;
  // Fiche enfant (mode parent).
  modeParentActif(): Promise<boolean>;
  ficheEnfant(enfant: string): Promise<FicheEnfant>;
  reglerEnfant(enfant: string, r: ReglagesEnfant): Promise<void>;
  changerCodeEnfant(enfant: string, code: string): Promise<void>;
  supprimerEnfant(enfant: string): Promise<void>;
  /** Toutes les données de la famille, pour l'export (droit d'accès et de portabilité). */
  exporterDonnees(): Promise<unknown>;
  /** Supprime le compte du parent ; les enfants restent si un autre parent est membre. */
  supprimerMonCompte(): Promise<void>;
  // Enfant en session.
  /** L'enfant choisit son avatar et l'apparence d'Octave. */
  reglerMonProfil(avatar: string, octave: string | null): Promise<void>;
  noterLecon(competence: string): Promise<void>;
  /** Minutes de travail aujourd'hui (questions répondues). */
  minutesAujourdhui(): Promise<number>;
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

const auJour = (d = new Date()) => {
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
      // Sans réseau, la session expirera d'elle-même côté serveur ; on la ferme ici quand même.
      await client.rpc('fermer_sessions').then(() => undefined, () => undefined);
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
    async verifierCodeParent(email, code) {
      const { error } = await client.auth.verifyOtp({ email, token: code.replace(/\D/g, ''), type: 'email' });
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
        .select('id, prenom, avatar, classe, code_type, xp, serie, matieres_masquees, minutes_par_jour, octave')
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
      const { data, error } = await client.rpc('creer_enfant', {
        p_prenom: e.prenom.trim().slice(0, 40), p_avatar: e.avatar, p_classe: e.classe, p_code: e.code,
      });
      if (error) throw error;
      return data as string;
    },
    async suiviParent() {
      const { data: enfants, error } = await client.from('enfants')
        .select('id, prenom, avatar, classe, code_type, xp, serie, matieres_masquees, minutes_par_jour, octave').order('cree_le');
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
      const { data: ligne } = await client.from('enfants').select('id, prenom, avatar, classe, code_type, xp, serie, matieres_masquees, minutes_par_jour, octave').eq('id', e.enfant_id).maybeSingle();
      return (ligne as Enfant | null) ?? ({ id: e.enfant_id, prenom: e.prenom, avatar: e.avatar, classe: e.classe, xp: e.xp, serie: e.serie, code_type: 'pictos' } as Enfant);
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
    async defiFamille() {
      const { data, error } = await client.rpc('defi_famille');
      if (error) throw error;
      return (data as DefiFamille | null) ?? null;
    },
    async cahier(enfant) {
      const id = enfant ?? (await this.enfantCourant())?.id;
      if (!id) return null;
      const { data, error } = await client.from('cahiers_vacances').select('debut, jours').eq('enfant_id', id).maybeSingle();
      if (error) throw error;
      return (data as Cahier | null) ?? null;
    },
    async ouvrirCahier(c, enfant) {
      const id = enfant ?? (await this.enfantCourant())?.id;
      if (!id) throw new Error('Aucun profil en cours.');
      const { error } = c
        ? await client.from('cahiers_vacances').upsert({ enfant_id: id, debut: c.debut, jours: c.jours, cree_le: new Date().toISOString() })
        : await client.from('cahiers_vacances').delete().eq('enfant_id', id);
      if (error) throw error;
    },
    async mesJournees(jours) {
      const e = await this.enfantCourant();
      if (!e) return [];
      const { data, error } = await client.rpc('historique', { p_enfant: e.id, p_jours: Math.min(365, Math.max(1, jours)) });
      if (error) throw error;
      return (data as JourneeNotion[]).map((x) => ({ ...x, questions: Number(x.questions), reussies: Number(x.reussies), duree_ms: Number(x.duree_ms) }));
    },
    async bilanSemaine() {
      const { data, error } = await client.rpc('bilan_semaine');
      if (error) throw error;
      return data as BilanSemaine[];
    },
    async bilanHebdoActif() {
      const { data, error } = await client.rpc('bilan_hebdo_actif');
      if (error) throw error;
      return data === true;
    },
    async reglerBilanHebdo(actif) {
      const { error } = await client.rpc('regler_bilan_hebdo', { p_actif: actif });
      if (error) throw error;
    },
    async modeParentActif() {
      if (!sessionStorage.getItem(CLE_PARENT)) return false;
      const { data, error } = await client.rpc('mode_parent_actif');
      if (error) throw error;
      return data === true;
    },
    async ficheEnfant(enfant) {
      const [h, l, r, c] = await Promise.all([
        client.rpc('historique', { p_enfant: enfant, p_jours: 60 }),
        client.from('lecons_vues').select('competence_id, vues, derniere_vue').eq('enfant_id', enfant).order('derniere_vue', { ascending: false }),
        client.from('records_defis').select('defi_id, record').eq('enfant_id', enfant),
        this.controle(enfant),
      ]);
      for (const x of [h, l, r]) if (x.error) throw x.error;
      return {
        historique: (h.data as JourneeNotion[]).map((x) => ({ ...x, questions: Number(x.questions), reussies: Number(x.reussies), duree_ms: Number(x.duree_ms) })),
        lecons: l.data as LeconVue[],
        records: Object.fromEntries((r.data as { defi_id: string; record: number }[]).map((x) => [x.defi_id, x.record])),
        controle: c,
      };
    },
    async reglerEnfant(enfant, r) {
      const { error } = await client.from('enfants').update({
        prenom: r.prenom.trim().slice(0, 40), avatar: r.avatar, classe: r.classe,
        matieres_masquees: r.matieres_masquees, minutes_par_jour: r.minutes_par_jour,
      }).eq('id', enfant);
      if (error) throw error;
    },
    async changerCodeEnfant(enfant, code) {
      const { error } = await client.rpc('definir_code_enfant', { p_enfant: enfant, p_code: code });
      if (error) throw error;
    },
    async supprimerEnfant(enfant) {
      const { error } = await client.from('enfants').delete().eq('id', enfant);
      if (error) throw error;
    },
    async exporterDonnees() {
      const tout = async (table: string, colonnes: string) => {
        const lignes: unknown[] = [];
        for (let debut = 0; ; debut += 1000) {
          const { data, error } = await client.from(table).select(colonnes).range(debut, debut + 999);
          if (error) throw error;
          lignes.push(...data);
          if (data.length < 1000) return lignes;
        }
      };
      return {
        exporte_le: new Date().toISOString(),
        famille: await this.membresFamille(),
        enfants: await tout('enfants', 'id, prenom, avatar, classe, xp, serie, derniere_activite, cree_le, matieres_masquees, minutes_par_jour, octave'),
        resultats: await tout('resultats', 'enfant_id, competence_id, contenu_id, annee_scolaire, reussi, indice, duree_ms, reponse, erreur, le'),
        progression: await tout('progression_competences', 'enfant_id, competence_id, score, nb_essais, prochaine_revision, maj_le'),
        lecons_vues: await tout('lecons_vues', 'enfant_id, competence_id, vues, derniere_vue'),
        records_defis: await tout('records_defis', 'enfant_id, defi_id, record, maj_le'),
        controles: await tout('controles', 'enfant_id, date, notions, maj_le'),
        appareils: await tout('appareils', 'enfant_id, nom, cree_le, vu_le'),
      };
    },
    async supprimerMonCompte() {
      const { error } = await client.rpc('supprimer_mon_compte');
      if (error) throw error;
      sessionStorage.clear();
      await client.auth.signOut();
    },
    async reglerMonProfil(avatar, octave) {
      const { error } = await client.rpc('regler_mon_profil', { p_avatar: avatar, p_octave: octave });
      if (error) throw error;
    },
    async noterLecon(competence) {
      const { error } = await client.rpc('noter_lecon', { p_competence: competence });
      if (error) throw error;
    },
    async minutesAujourdhui() {
      const e = await this.enfantCourant();
      if (!e) return 0;
      const { data, error } = await client.rpc('historique', { p_enfant: e.id, p_jours: 1 });
      if (error) throw error;
      const jour = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Paris' });
      return (data as JourneeNotion[]).filter((x) => x.jour === jour).reduce((n, x) => n + Number(x.duree_ms), 0) / 60_000;
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
    verifierCodeParent: async () => undefined,
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
      const h = lireDemo<Record<string, JourneeNotion[]>>('hopla.demo-historique', {});
      const jour = auJour();
      const lignes = h[id] ?? [];
      const l = lignes.find((x) => x.jour === jour && x.competence_id === r.competence);
      if (l) { l.questions++; l.reussies += r.reussi ? 1 : 0; l.duree_ms += r.dureeMs; }
      else lignes.unshift({ jour, competence_id: r.competence, questions: 1, reussies: r.reussi ? 1 : 0, duree_ms: r.dureeMs });
      h[id] = lignes;
      ecrireDemo('hopla.demo-historique', h);
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
    async defiFamille() {
      const lundi = new Date();
      lundi.setHours(0, 0, 0, 0);
      lundi.setDate(lundi.getDate() - ((lundi.getDay() + 6) % 7));
      const debut = auJour(lundi);
      const dimanche = new Date(lundi);
      dimanche.setDate(lundi.getDate() + 6);
      const enfants = lire();
      if (enfants.length === 0) return null;
      const semaine = Math.floor((lundi.getTime() / 86_400_000 + 3) / 7);
      const sorte = (['bonnes_reponses', 'jours_actifs', 'notions'] as const)[semaine % 3]!;
      const h = lireDemo<Record<string, JourneeNotion[]>>('hopla.demo-historique', {});
      const moi = (await this.enfantCourant())?.id ?? null;
      const compte = (id: string) => {
        const l = (h[id] ?? []).filter((x) => x.jour >= debut);
        if (sorte === 'bonnes_reponses') return l.reduce((n, x) => n + x.reussies, 0);
        return new Set(l.map((x) => (sorte === 'jours_actifs' ? x.jour : x.competence_id))).size;
      };
      return {
        sorte, debut, fin: auJour(dimanche), enfants: enfants.length,
        objectif: enfants.length * { bonnes_reponses: 60, jours_actifs: 4, notions: 6 }[sorte],
        total: enfants.reduce((n, e) => n + compte(e.id), 0),
        ma_part: moi ? compte(moi) : null,
      };
    },
    async cahier(enfant) {
      const id = enfant ?? (await this.enfantCourant())?.id ?? '';
      return lireDemo<Record<string, Cahier>>('hopla.demo-cahiers', {})[id] ?? null;
    },
    async ouvrirCahier(c, enfant) {
      const id = enfant ?? (await this.enfantCourant())?.id ?? '';
      const tout = lireDemo<Record<string, Cahier>>('hopla.demo-cahiers', {});
      if (c) tout[id] = c; else delete tout[id];
      ecrireDemo('hopla.demo-cahiers', tout);
    },
    async mesJournees(jours) {
      const id = (await this.enfantCourant())?.id ?? '';
      const debut = auJour(new Date(Date.now() - (jours - 1) * 86_400_000));
      return (lireDemo<Record<string, JourneeNotion[]>>('hopla.demo-historique', {})[id] ?? []).filter((x) => x.jour >= debut);
    },
    async bilanSemaine() {
      const debut = auJour(new Date(Date.now() - 6 * 86_400_000));
      const h = lireDemo<Record<string, JourneeNotion[]>>('hopla.demo-historique', {});
      const suivis = lireJournal();
      return Promise.all(lire().map(async (e) => {
        const l = (h[e.id] ?? []).filter((x) => x.jour >= debut);
        const notions = new Set(l.map((x) => x.competence_id));
        const prog = suivis[e.id]?.progression ?? {};
        const c = await this.controle(e.id);
        return {
          enfant_id: e.id, prenom: e.prenom, classe: e.classe, serie: e.serie,
          jours_actifs: new Set(l.map((x) => x.jour)).size,
          questions: l.reduce((n, x) => n + x.questions, 0),
          reussies: l.reduce((n, x) => n + x.reussies, 0),
          minutes: Math.round(l.reduce((n, x) => n + x.duree_ms, 0) / 60_000),
          notions: notions.size,
          maitrisees: [...notions].filter((id) => (prog[id]?.score ?? 0) >= 0.85).length,
          a_revoir: Object.values(prog).filter((s) => s.nbEssais > 0 && s.prochaineRevision <= auJour()).length,
          controle: c ? { date: c.date, notions: c.notions.length } : null,
        };
      }));
    },
    bilanHebdoActif: async () => lireDemo('hopla.demo-bilan', false),
    async reglerBilanHebdo(actif) { ecrireDemo('hopla.demo-bilan', actif); },
    modeParentActif: async () => sessionStorage.getItem(CLE_PARENT) === 'demo',
    async ficheEnfant(enfant) {
      return {
        historique: lireDemo<Record<string, JourneeNotion[]>>('hopla.demo-historique', {})[enfant] ?? [],
        lecons: lireDemo<Record<string, LeconVue[]>>('hopla.demo-lecons', {})[enfant] ?? [],
        records: lireDemo<Record<string, number>>(`hopla.defis.${enfant}`, {}),
        controle: await this.controle(enfant),
      };
    },
    async reglerEnfant(enfant, r) {
      ecrire(lire().map((e) => (e.id === enfant ? { ...e, ...r } : e)));
    },
    changerCodeEnfant: async () => undefined,
    async supprimerEnfant(enfant) {
      ecrire(lire().filter((e) => e.id !== enfant));
    },
    async exporterDonnees() {
      return { exporte_le: new Date().toISOString(), enfants: lire(), suivi: lireJournal() };
    },
    supprimerMonCompte: async () => { throw new Error('Pas de compte à supprimer en mode démo.'); },
    async reglerMonProfil(avatar, octave) {
      const id = (await this.enfantCourant())?.id;
      ecrire(lire().map((e) => (e.id === id ? { ...e, avatar, octave } : e)));
    },
    async noterLecon(competence) {
      const id = (await this.enfantCourant())?.id;
      if (!id) return;
      const tout = lireDemo<Record<string, LeconVue[]>>('hopla.demo-lecons', {});
      const avant = (tout[id] ?? []).find((x) => x.competence_id === competence);
      tout[id] = [{ competence_id: competence, vues: (avant?.vues ?? 0) + 1, derniere_vue: new Date().toISOString() },
        ...(tout[id] ?? []).filter((x) => x.competence_id !== competence)];
      ecrireDemo('hopla.demo-lecons', tout);
    },
    async minutesAujourdhui() {
      const id = (await this.enfantCourant())?.id ?? '';
      const jour = auJour();
      return (lireDemo<Record<string, JourneeNotion[]>>('hopla.demo-historique', {})[id] ?? [])
        .filter((x) => x.jour === jour).reduce((n, x) => n + x.duree_ms, 0) / 60_000;
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
      return id;
    },
  };
}

export const CODE_DE_DEMO = CODE_DEMO;

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const cle = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const base: Api = url && cle ? apiSupabase(url, cle) : apiDemo();
export const api: Api = suivreApparence(base.mode === 'supabase' ? avecHorsLigne(base) : base);

/** Les Octave de l'app prennent l'apparence choisie par l'enfant en session. */
function suivreApparence(a: Api): Api {
  const enfantCourant = a.enfantCourant.bind(a);
  const fermerSession = a.fermerSession.bind(a);
  a.enfantCourant = async () => {
    const e = await enfantCourant();
    definirApparence(e?.octave);
    return e;
  };
  a.fermerSession = async () => {
    definirApparence(null);
    await fermerSession();
  };
  return a;
}
