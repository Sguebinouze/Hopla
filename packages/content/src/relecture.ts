import { readFileSync, writeFileSync } from 'node:fs';
import { isAbsolute, join } from 'node:path';
import { DOSSIER_CONTENU, type Contenu } from './charger';
import type { CoursPack } from './packs';

// Relecture humaine : ce qui reste à relire (pour l'espace admin de la PWA),
// et application des décisions prises dans l'espace admin aux fichiers du dépôt.

export const ORDRE_CLASSES = ['cp', 'ce1', 'ce2', 'cm1', 'cm2', '6e', '5e', '4e', '3e'] as const;
const ORDRE_MATIERES = ['FR', 'MA', 'QM', 'EM', 'HG', 'ST', 'LV'];

export interface QuestionRelecture {
  id: string;
  difficulte: number;
  consigne: string;
  options: string[];
  reponse: string;
  indice: string;
  explication: string;
  ecoute?: string;
}

export interface NotionRelecture {
  id: string;
  classe: string;
  titre: string;
  theme: string;
  attendu: string;
  /** La notion elle-même est-elle déjà vérifiée sur le texte officiel ? */
  verifiee: boolean;
  source: { titre: string; page: number; extrait: string };
  lecon: { exemple: string; regle: string; piege: string | null; essai: { consigne: string; options: string[]; reponse: string; explication: string } } | null;
  /** Cours complet en brouillon, avec ses appuis et les images qu'il montre (même non publiées). */
  cours: CoursRelecture | null;
  questions: QuestionRelecture[];
  dictees: DicteeRelecture[];
  medias: MediaRelecture[];
}

export type CoursRelecture = CoursPack & {
  sources: { titre: string; page: number | null; extrait: string | null; appui: string }[];
  images: Record<string, { src: string; alt: string }>;
};

export interface MediaRelecture {
  id: string;
  src: string;
  alt: string;
  licence: string;
  source: { nom: string; auteur: string | null; titre: string | null; url: string };
  credit: string | null;
  /** Questions qui l'utilisent, et l'option qu'elle illustre le cas échéant. */
  usages: { question: string; consigne: string; option: string | null }[];
}

export interface DicteeRelecture {
  id: string;
  titre: string;
  texte: string;
  /** Auteur et œuvre, ou référence. */
  source: string;
  licence: string;
  url: string | null;
}

/** Notions qui ont encore quelque chose à relire : la notion, sa leçon en brouillon ou des questions rédigées en brouillon. */
export function construireRelecture(contenu: Contenu): NotionRelecture[] {
  const titres = new Map(contenu.sources.map((s) => [s.id, s.titre]));
  const lecons = new Map(contenu.lecons.map((l) => [l.competence, l]));
  const banques = new Map(contenu.banques.map((b) => [b.competence, b]));
  const dicteesDe = new Map<string, DicteeRelecture[]>();
  for (const d of contenu.dictees ?? []) {
    if (d.statut !== 'brouillon') continue;
    const source = [d.source.auteur, d.source.oeuvre].filter(Boolean).join(', ') || d.source.reference;
    dicteesDe.set(d.competence, [...(dicteesDe.get(d.competence) ?? []),
      { id: d.id, titre: d.titre, texte: d.texte, source, licence: d.licence, url: d.source.url }]);
  }
  // Images en brouillon, rattachées aux notions dont les questions les utilisent.
  const brouillonsMedia = new Map((contenu.medias ?? []).filter((m) => m.statut === 'brouillon').map((m) => [m.id, m]));
  const mediasDe = (exercices: { id: string; consigne: string; image?: string; images_options?: Record<string, string> }[]) => {
    const parId = new Map<string, MediaRelecture>();
    const noter = (id: string | undefined, e: { id: string; consigne: string }, option: string | null) => {
      const m = id ? brouillonsMedia.get(id) : undefined;
      if (!m) return;
      const r = parId.get(m.id) ?? {
        id: m.id, src: `/images/${m.fichier}`, alt: m.alt, licence: m.licence, source: m.source, credit: m.credit, usages: [],
      };
      r.usages.push({ question: e.id, consigne: e.consigne, option });
      parId.set(m.id, r);
    };
    for (const e of exercices) {
      noter(e.image, e, null);
      for (const [o, id] of Object.entries(e.images_options ?? {})) noter(id, e, o);
    }
    return [...parId.values()];
  };
  const notions: NotionRelecture[] = [];
  for (const ref of contenu.referentiels) {
    for (const c of ref.competences) {
      if (!c.source || c.source.page === null || c.source.extrait === null) continue;
      const l = lecons.get(c.id);
      const lecon = l && l.statut === 'brouillon' ? l : null;
      const k = (contenu.cours ?? []).find((x) => x.competence === c.id && x.statut === 'brouillon');
      const cours: CoursRelecture | null = k ? {
        duree: k.duree, essentiel: k.essentiel, parties: k.parties, a_toi: k.a_toi, statut: k.statut,
        sources: k.sources.map((s) => ({ titre: titres.get(s.id) ?? s.id, page: s.page, extrait: s.extrait, appui: s.appui })),
        images: Object.fromEntries(k.parties.flatMap((p) => p.blocs.flatMap((b) => {
          const m = b.type === 'image' ? contenu.medias?.find((x) => x.id === b.media) : undefined;
          return m ? [[m.id, { src: `/images/${m.fichier}`, alt: m.alt }]] : [];
        }))),
      } : null;
      const questions = (banques.get(c.id)?.exercices ?? [])
        .filter((e) => e.statut === 'brouillon' && e.gabarit === 'qcm' && e.options)
        .map((e) => ({
          id: e.id, difficulte: e.difficulte, consigne: e.consigne, options: e.options!, reponse: e.reponse,
          indice: e.indice, explication: e.explication, ...(e.ecoute ? { ecoute: e.ecoute.texte } : {}),
        }));
      const verifiee = c.statut === 'verifie';
      const dictees = dicteesDe.get(c.id) ?? [];
      const medias = mediasDe(banques.get(c.id)?.exercices ?? []);
      if (verifiee && !lecon && !cours && questions.length === 0 && dictees.length === 0 && medias.length === 0) continue;
      notions.push({
        id: c.id, classe: ref.classe, titre: c.titre, theme: c.theme, attendu: c.attendu, verifiee,
        source: { titre: titres.get(c.source.id) ?? c.source.id, page: c.source.page, extrait: c.source.extrait },
        lecon: lecon ? { exemple: lecon.exemple, regle: lecon.regle, piege: lecon.piege, essai: lecon.essai } : null,
        cours,
        questions,
        dictees,
        medias,
      });
    }
  }
  const rang = (n: NotionRelecture) => [
    ORDRE_CLASSES.indexOf(n.classe as (typeof ORDRE_CLASSES)[number]),
    ORDRE_MATIERES.indexOf(n.id.slice(0, 2)),
  ];
  return notions.sort((a, b) => {
    const [ca, ma] = rang(a);
    const [cb, mb] = rang(b);
    return ca! - cb! || ma! - mb! || a.id.localeCompare(b.id);
  });
}

export interface Decision {
  type: 'notion' | 'lecon' | 'question' | 'dictee' | 'media' | 'cours';
  element_id: string;
  decision: 'ok' | 'corriger';
  commentaire: string;
}

export interface BilanApplication {
  publies: string[];
  verifiees: string[];
  aCorriger: Decision[];
  introuvables: Decision[];
}

/**
 * Applique les décisions « ok » : question, leçon, cours, dictée et image passent en `publie` avec `relu_par`,
 * la notion passe en `verifie`. Les décisions « corriger » sont seulement listées.
 * Seul un humain prend ces décisions (espace admin) ; ce code ne fait que les reporter.
 */
export function appliquerRelecture(contenu: Contenu, decisions: Decision[], par: string, ecrire = true): BilanApplication {
  const bilan: BilanApplication = { publies: [], verifiees: [], aCorriger: [], introuvables: [] };
  const fichiers = new Map<string, unknown>();
  const charger = <T>(fichier: string): T => {
    const f = isAbsolute(fichier) ? fichier : join(DOSSIER_CONTENU, fichier);
    if (!fichiers.has(f)) fichiers.set(f, JSON.parse(readFileSync(f, 'utf8')));
    return fichiers.get(f) as T;
  };
  for (const d of decisions) {
    if (d.decision === 'corriger') { bilan.aCorriger.push(d); continue; }
    if (d.type === 'question') {
      const b = contenu.banques.find((x) => x.exercices.some((e) => e.id === d.element_id));
      const e = b && charger<{ exercices: { id: string; statut: string; relu_par: string | null }[] }>(b.fichier).exercices.find((x) => x.id === d.element_id);
      if (!e) { bilan.introuvables.push(d); continue; }
      if (e.statut !== 'publie') { e.statut = 'publie'; e.relu_par = par; bilan.publies.push(d.element_id); }
    } else if (d.type === 'media') {
      const f = contenu.medias?.find((x) => x.id === d.element_id);
      const brut = f && charger<{ statut: string; relu_par: string | null }>(f.fiche);
      if (!brut) { bilan.introuvables.push(d); continue; }
      if (brut.statut !== 'publie') { brut.statut = 'publie'; brut.relu_par = par; bilan.publies.push(`image ${d.element_id}`); }
    } else if (d.type === 'dictee') {
      const f = contenu.dictees?.find((x) => x.id === d.element_id);
      const brut = f && charger<{ statut: string; relu_par: string | null }>(f.fichier);
      if (!brut) { bilan.introuvables.push(d); continue; }
      if (brut.statut !== 'publie') { brut.statut = 'publie'; brut.relu_par = par; bilan.publies.push(`dictée ${d.element_id}`); }
    } else if (d.type === 'cours') {
      const k = contenu.cours?.find((x) => x.competence === d.element_id);
      const brut = k && charger<{ statut: string; relu_par: string | null; sources: { page: number | null; extrait: string | null }[] }>(k.fichier);
      if (!brut) { bilan.introuvables.push(d); continue; }
      // Un cours publié cite chaque source avec page et extrait : sinon il reste en brouillon.
      if (brut.sources.some((s) => s.page === null || s.extrait === null)) {
        bilan.aCorriger.push({ ...d, commentaire: 'source sans page ni extrait' });
        continue;
      }
      if (brut.statut !== 'publie') { brut.statut = 'publie'; brut.relu_par = par; bilan.publies.push(`cours ${d.element_id}`); }
    } else if (d.type === 'lecon') {
      const l = contenu.lecons.find((x) => x.competence === d.element_id);
      const brut = l && charger<{ statut: string; relu_par: string | null }>(l.fichier);
      if (!brut) { bilan.introuvables.push(d); continue; }
      if (brut.statut !== 'publie') { brut.statut = 'publie'; brut.relu_par = par; bilan.publies.push(`leçon ${d.element_id}`); }
    } else {
      const r = contenu.referentiels.find((x) => x.competences.some((c) => c.id === d.element_id));
      const c = r && charger<{ competences: { id: string; statut: string }[] }>(r.fichier).competences.find((x) => x.id === d.element_id);
      if (!c) { bilan.introuvables.push(d); continue; }
      if (c.statut !== 'verifie') { c.statut = 'verifie'; bilan.verifiees.push(d.element_id); }
    }
  }
  if (ecrire) for (const [f, v] of fichiers) writeFileSync(f, JSON.stringify(v, null, 2) + '\n');
  return bilan;
}
