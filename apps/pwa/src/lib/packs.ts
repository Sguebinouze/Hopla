import { serie, type Difficulte, type Item } from '@hopla/generateurs';
import { anneeScolaire } from './annee';
import type { Classe } from './donnees';
import type { Langue } from './voix';
import { aujourdhui, etat, type Suivi } from './progression';

// Forme produite par @hopla/content (pnpm content:packs).
export interface CompetencePack {
  id: string;
  titre: string;
  domaine: string;
  theme: string;
  attendu: string;
  exemple: string;
  statut: string;
  source: { id: string; page: number | null };
  generateurs: string[];
  lecon: {
    exemple: string;
    regle: string;
    piege: string | null;
    essai: { consigne: string; options: string[]; reponse: string; explication: string };
  } | null;
  exercices: {
    id: string;
    gabarit: string;
    difficulte: Difficulte;
    consigne: string;
    options?: string[];
    reponse: string;
    indice: string;
    explication: string;
    erreurs?: Record<string, string>;
    ecoute?: Ecoute;
  }[];
}

/** Langues vivantes : phrase dite à l'élève dans la langue étudiée. */
export interface Ecoute {
  texte: string;
  langue: Langue;
}
export type ItemPack = Item & { ecoute?: Ecoute };

export interface Defi {
  id: string;
  titre: string;
  competence: string;
  generateur: string;
  difficultes: Difficulte[];
  duree_s: number;
  /** Objectif de fin d'année fixé par le programme, null s'il n'en fixe pas. */
  objectif: number | null;
  source: { id: string; page: number } | null;
}

export interface Pack {
  annee: string;
  classe: Classe;
  cycle: 2 | 3 | 4;
  defis: Defi[];
  /** Culture générale (hors programme), banque du cycle de la classe. */
  culture?: { id: string; theme: string; question: string; options: string[]; reponse: string; explication: string }[];
  matieres: {
    matiere: string;
    programme: { id: string; intitule: string; reference: string; verifie: boolean };
    competences: CompetencePack[];
  }[];
}

export const NOMS_MATIERES: Record<string, string> = {
  francais: 'Français',
  mathematiques: 'Maths',
  'questionner-le-monde': 'Questionner le monde',
  'sciences-technologie': 'Sciences',
  'histoire-geographie': 'Histoire-géo',
  svt: 'SVT',
  'physique-chimie': 'Physique-chimie',
  technologie: 'Technologie',
  'langues-vivantes': 'Anglais',
  allemand: 'Allemand',
  espagnol: 'Espagnol',
  emc: 'EMC',
};

/** Deuxièmes langues vivantes, proposées de la 5e à la 3e. */
export const LV2 = ['allemand', 'espagnol'] as const;
export type Lv2 = (typeof LV2)[number] | 'aucune';
export const aUneLv2 = (classe: Classe) => ['5e', '4e', '3e'].includes(classe);
/** Matières à masquer pour qu'un enfant ne voie que sa deuxième langue. */
export const masqueesPourLv2 = (lv2: Lv2): string[] => LV2.filter((l) => l !== lv2);

export async function chargerPack(classe: Classe): Promise<Pack> {
  const r = await fetch(`/packs/${anneeScolaire()}/${classe}.json`);
  if (!r.ok) throw new Error(`Pack introuvable pour ${classe}`);
  return (await r.json()) as Pack;
}

/**
 * Mission du jour : trois notions. D'abord deux révisions arrivées à échéance au plus
 * (les plus anciennes), puis les matières en alternance, avec une rotation quotidienne.
 */
export function missionDuJour(
  pack: Pack, suivi: Record<string, Suivi> = {}, jour = new Date(), controle: string[] = [],
) {
  const date = aujourdhui(jour);
  // Contrôle prévu : ses deux notions les moins sures passent en premier.
  const aPreparer = competencesJouables(pack)
    .filter((c) => controle.includes(c.id))
    .sort((a, b) => (suivi[a.id]?.score ?? 0) - (suivi[b.id]?.score ?? 0))
    .slice(0, 2);
  const revisions = competencesJouables(pack)
    .filter((c) => etat(suivi[c.id], date) === 'a-revoir')
    .sort((a, b) => suivi[a.id]!.prochaineRevision.localeCompare(suivi[b.id]!.prochaineRevision))
    .slice(0, 2);
  const ordre = [...aPreparer, ...revisions, ...rotation(pack, jour)];
  return ordre.filter((c, i) => ordre.findIndex((x) => x.id === c.id) === i).slice(0, 3);
}

function rotation(pack: Pack, jour: Date) {
  const numero = Math.floor(jour.getTime() / 86_400_000);
  const parMatiere = pack.matieres
    .map((m) => competencesJouables({ ...pack, matieres: [m] }))
    .filter((l) => l.length > 0)
    .map((l, k) => {
      const debut = (numero + k) % l.length;
      return [...l.slice(debut), ...l.slice(0, debut)];
    });
  const alternees: ReturnType<typeof competencesJouables> = [];
  for (let i = 0; parMatiere.some((l) => i < l.length); i++) for (const l of parMatiere) if (l[i]) alternees.push(l[i]!);
  return alternees;
}

/** Une compétence du pack avec sa matière et le cycle de la classe. */
export async function competenceDuPack(classe: Classe, id: string) {
  const pack = await chargerPack(classe);
  const c = competencesJouables(pack).find((x) => x.id === id)
    ?? pack.matieres.flatMap((m) => m.competences.map((x) => ({ ...x, matiere: m.matiere }))).find((x) => x.id === id);
  return c ? { competence: c, cycle: pack.cycle } : null;
}

/** Compétences jouables (au moins un générateur ou un exercice publié). */
export function competencesJouables(pack: Pack) {
  return pack.matieres.flatMap((m) =>
    m.competences
      .filter((c) => c.generateurs.length > 0 || c.exercices.length > 0)
      .map((c) => ({ ...c, matiere: m.matiere })),
  );
}

// Progression dans une série : on commence simple, on finit par la difficulté 3.
const PALIERS: Difficulte[] = [1, 1, 2, 2, 3];
const hasard = <T>(liste: T[]): T => liste[Math.floor(Math.random() * liste.length)]!;
const melanger = <T>(liste: T[]): T[] => {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j]!, copie[i]!];
  }
  return copie;
};

/** Clé d'une question, indépendante de l'ordre des options (le générateur les mélange). */
export const cleItem = (it: Item) =>
  `${it.consigne}#${JSON.stringify(it.visuel ?? null)}#${[...(it.options ?? [])].sort().join('|')}`;

/** Texte support d'une question : long passage entre guillemets en tête de consigne (texte à lire, par exemple). */
export const supportDe = (consigne: string) => consigne.match(/^« ([^»]{25,}) »/)?.[1] ?? null;

/** Marques d'une série, à retenir pour ne pas la reproposer tout de suite. */
export const marquesDe = (items: Item[]) =>
  items.flatMap((it) => {
    const s = supportDe(it.consigne);
    return s ? [cleItem(it), `support:${s}`] : [cleItem(it)];
  });

/**
 * Une série d'items pour une compétence, de difficulté croissante, sans doublon.
 * On évite aussi de reprendre deux fois le même texte support dans la série,
 * et ce qui a été vu dans les séries récentes (`recentes`), tant que la banque le permet.
 */
export function seriePour(c: CompetencePack, n: number, recentes: ReadonlySet<string> = new Set()): ItemPack[] {
  const rediges: ItemPack[] = c.exercices
    .filter((e) => e.gabarit === 'qcm' || e.gabarit === 'saisie')
    .map((e) => ({
      id: e.id,
      competence: c.id,
      gabarit: e.gabarit as Item['gabarit'],
      consigne: e.consigne,
      // Les banques rédigées gardent un ordre fixe dans le fichier : on mélange à l'affichage.
      options: e.options ? melanger(e.options) : undefined,
      reponse: e.reponse,
      indice: e.indice,
      explication: e.explication,
      difficulte: e.difficulte,
      erreurs: e.erreurs,
      ecoute: e.ecoute,
    }));
  const graine = Math.floor(Math.random() * 1e9);
  const vus = new Set<string>();
  const supports = new Set<string>();
  const items: ItemPack[] = [];
  // Exigence décroissante : d'abord rien de récent ni de texte déjà lu, puis seulement pas de texte déjà lu, puis pas de doublon.
  const refuse = (it: Item, k: number) => {
    const cle = cleItem(it);
    if (vus.has(cle)) return true;
    const s = supportDe(it.consigne);
    if (k < n * 30 && s && supports.has(s)) return true;
    if (k < n * 15 && (recentes.has(cle) || (s !== null && recentes.has(`support:${s}`)))) return true;
    return false;
  };
  for (let k = 0; items.length < n && k < n * 40; k++) {
    const d = PALIERS[Math.min(items.length, PALIERS.length - 1)]!;
    const libres = rediges.filter((e) => !refuse(e, k));
    const auPalier = libres.filter((e) => e.difficulte === d);
    const prendreRedige = libres.length > 0 && (c.generateurs.length === 0 || (auPalier.length > 0 && Math.random() < 0.3));
    const item = prendreRedige
      ? hasard(auPalier.length ? auPalier : libres)
      : c.generateurs.length
        ? serie(hasard(c.generateurs), 1, graine + k * 7_919, d)[0]
        : undefined;
    if (!item) {
      if (c.generateurs.length === 0 && libres.length === 0 && k < n * 30) continue;
      break;
    }
    if (refuse(item, k)) continue;
    vus.add(cleItem(item));
    const s = supportDe(item.consigne);
    if (s) supports.add(s);
    items.push(item);
  }
  return items;
}

// Séries récentes, par enfant et par notion, gardées sur l'appareil.
const CLE_RECENTES = 'hopla.recentes';
const MAX_RECENTES = 40;
export function questionsRecentes(enfant: string, competence: string): Set<string> {
  try {
    const t = JSON.parse(localStorage.getItem(CLE_RECENTES) ?? '{}') as Record<string, string[]>;
    return new Set(t[`${enfant}/${competence}`] ?? []);
  } catch {
    return new Set();
  }
}
export function noterRecentes(enfant: string, competence: string, items: Item[]): void {
  try {
    const t = JSON.parse(localStorage.getItem(CLE_RECENTES) ?? '{}') as Record<string, string[]>;
    const cle = `${enfant}/${competence}`;
    t[cle] = [...marquesDe(items), ...(t[cle] ?? [])].slice(0, MAX_RECENTES);
    localStorage.setItem(CLE_RECENTES, JSON.stringify(t));
  } catch {
    /* stockage indisponible : seule la série en cours évite les répétitions */
  }
}

/** Pack sans les matières masquées par le parent. */
export function sansMatieres(pack: Pack, masquees: string[] = []): Pack {
  return masquees.length ? { ...pack, matieres: pack.matieres.filter((m) => !masquees.includes(m.matiere)) } : pack;
}
