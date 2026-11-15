import { serie, type Difficulte, type Item } from '@hopla/generateurs';
import { anneeScolaire } from './annee';
import type { Classe } from './donnees';
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
  langue: 'en-GB';
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
  emc: 'EMC',
};

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

/** Une série d'items pour une compétence, de difficulté croissante, sans doublon. */
export function seriePour(c: CompetencePack, n: number): ItemPack[] {
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
  const cle = (it: Item) => `${it.consigne}#${JSON.stringify(it.visuel ?? null)}#${(it.options ?? []).join('|')}`;
  const vus = new Set<string>();
  const items: ItemPack[] = [];
  for (let k = 0; items.length < n && k < n * 30; k++) {
    const d = PALIERS[Math.min(items.length, PALIERS.length - 1)]!;
    const libres = rediges.filter((e) => !vus.has(cle(e)));
    const auPalier = libres.filter((e) => e.difficulte === d);
    const prendreRedige = libres.length > 0 && (c.generateurs.length === 0 || (auPalier.length > 0 && Math.random() < 0.3));
    const item = prendreRedige
      ? hasard(auPalier.length ? auPalier : libres)
      : c.generateurs.length
        ? serie(hasard(c.generateurs), 1, graine + k * 7_919, d)[0]
        : undefined;
    if (!item) break;
    if (vus.has(cle(item))) continue;
    vus.add(cle(item));
    items.push(item);
  }
  return items;
}

/** Pack sans les matières masquées par le parent. */
export function sansMatieres(pack: Pack, masquees: string[] = []): Pack {
  return masquees.length ? { ...pack, matieres: pack.matieres.filter((m) => !masquees.includes(m.matiere)) } : pack;
}
