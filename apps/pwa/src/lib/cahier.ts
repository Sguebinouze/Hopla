// Cahier de vacances : la révision de l'année, une page par jour.
// Une page = 3 notions de la classe : une de français, une de maths, une d'une autre matière (à tour de rôle).
// Une page est faite quand chacune de ses notions a eu au moins une série (5 questions) depuis l'ouverture
// de la page ; une seule page par jour, pour garder le rythme d'un cahier.

export const QUESTIONS_PAR_NOTION = 5;
export const NOTIONS_PAR_PAGE = 3;
export const DUREES = [
  { jours: 10, nom: 'Petites vacances', detail: '10 pages' },
  { jours: 30, nom: 'Été', detail: '30 pages' },
  { jours: 40, nom: 'Grand été', detail: '40 pages' },
] as const;

export interface NotionCahier { id: string; matiere: string }
export interface Journee { jour: string; competence_id: string; questions: number }

/** Pages du cahier : pour chaque page, les identifiants de ses notions. Déterministe. */
export function planCahier(notions: NotionCahier[], pages: number): string[][] {
  const parMatiere = new Map<string, string[]>();
  for (const n of notions) parMatiere.set(n.matiere, [...(parMatiere.get(n.matiere) ?? []), n.id]);
  const fr = parMatiere.get('francais') ?? [];
  const ma = parMatiere.get('mathematiques') ?? [];
  const autres = [...parMatiere.entries()].filter(([m]) => m !== 'francais' && m !== 'mathematiques').map(([, ids]) => ids);
  const files = [fr, ma].filter((f) => f.length > 0);
  if (files.length === 0 && autres.length === 0) return [];

  const curseurs = new Map<string[], number>();
  const suivant = (f: string[]) => {
    const i = curseurs.get(f) ?? 0;
    curseurs.set(f, i + 1);
    return f[i % f.length]!;
  };
  // Troisième notion : les autres matières à tour de rôle ; sans autre matière, français et maths en alternance.
  const troisiemes = autres.length > 0 ? autres : files;
  const plan: string[][] = [];
  for (let p = 0; p < pages; p++) {
    const page: string[] = [];
    for (const f of files) page.push(suivant(f));
    let essais = 0;
    while (page.length < NOTIONS_PAR_PAGE && essais++ < 10) {
      const id = suivant(troisiemes[(p + essais) % troisiemes.length]!);
      if (!page.includes(id)) page.push(id);
    }
    plan.push(page);
  }
  return plan;
}

export interface EtatCahier {
  /** Nombre de pages faites. */
  faites: number;
  /** Questions faites par notion sur la page en cours (depuis son ouverture). */
  enCours: Record<string, number>;
  /** Vrai si une page a déjà été faite aujourd'hui. */
  pageDuJourFaite: boolean;
  fini: boolean;
}

/** Avancement du cahier d'après les séances (par jour et par notion), à partir de sa date de début. */
export function etatCahier(plan: string[][], debut: string, journees: Journee[], aujourdhui: string): EtatCahier {
  const jours = [...new Set(journees.filter((j) => j.jour >= debut).map((j) => j.jour))].sort();
  let p = 0;
  let acc: Record<string, number> = {};
  let dernier = '';
  for (const jour of jours) {
    if (p >= plan.length) break;
    const page = plan[p]!;
    for (const j of journees) {
      if (j.jour === jour && page.includes(j.competence_id)) acc[j.competence_id] = (acc[j.competence_id] ?? 0) + j.questions;
    }
    if (page.every((id) => (acc[id] ?? 0) >= QUESTIONS_PAR_NOTION)) {
      p++;
      acc = {};
      dernier = jour;
    }
  }
  return { faites: p, enCours: acc, pageDuJourFaite: dernier === aujourdhui, fini: p >= plan.length && plan.length > 0 };
}
