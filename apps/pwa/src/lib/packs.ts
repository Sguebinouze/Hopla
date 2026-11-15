import { serie, type Difficulte, type Item } from '@hopla/generateurs';
import { anneeScolaire } from './annee';
import type { Classe } from './donnees';

// Forme produite par @hopla/content (pnpm content:packs).
export interface CompetencePack {
  id: string;
  domaine: string;
  theme: string;
  attendu: string;
  exemple: string;
  generateurs: string[];
  exercices: {
    id: string;
    gabarit: string;
    difficulte: Difficulte;
    consigne: string;
    options?: string[];
    reponse: string;
    indice: string;
    explication: string;
  }[];
}

export interface Pack {
  annee: string;
  classe: Classe;
  cycle: 2 | 3 | 4;
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

/** Compétences jouables (au moins un générateur ou un exercice publié). */
export function competencesJouables(pack: Pack) {
  return pack.matieres.flatMap((m) =>
    m.competences
      .filter((c) => c.generateurs.length > 0 || c.exercices.length > 0)
      .map((c) => ({ ...c, matiere: m.matiere })),
  );
}

/** Une série d'items pour une compétence : générateurs d'abord, banque rédigée ensuite. */
export function seriePour(c: CompetencePack, n: number, difficulte: Difficulte): Item[] {
  const graine = Math.floor(Math.random() * 1e9);
  const generes = c.generateurs.flatMap((g, i) => serie(g, n, graine + i * 10_000, difficulte));
  const rediges: Item[] = c.exercices
    .filter((e) => e.gabarit === 'qcm' || e.gabarit === 'saisie')
    .map((e) => ({
      id: e.id,
      competence: c.id,
      gabarit: e.gabarit as Item['gabarit'],
      consigne: e.consigne,
      options: e.options,
      reponse: e.reponse,
      indice: e.indice,
      explication: e.explication,
      difficulte: e.difficulte,
    }));
  const tous = [...generes, ...rediges];
  for (let i = tous.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tous[i], tous[j]] = [tous[j]!, tous[i]!];
  }
  return tous.slice(0, n);
}
