import { GENERATEURS } from '@hopla/generateurs';
import type { Contenu } from './charger';
import { programmesApplicables } from './verifier';

/**
 * Références des notions : l'identifiant de compétence sert de référence unique, de la leçon au cours
 * et aux questions (FR-C3-6E-GRAM-01, puis FR-C3-6E-GRAM-01-003 pour une question).
 * Il ne change jamais : la progression des enfants et la relecture s'y rattachent.
 */
export interface Reference {
  ref: string;
  matiere: string;
  programme: string;
  /** Programme appliqué cette année scolaire pour cette classe. */
  en_vigueur: boolean;
  cycle: number;
  classe: string;
  domaine: string;
  theme: string;
  titre: string;
  notion: 'verifie' | 'a_verifier';
  lecon: string | null;
  cours: string | null;
  questions: { publiees: number; total: number };
  generateurs: string[];
  dictees: number;
}

export function construireReferences(contenu: Contenu, annee: string): Reference[] {
  const banques = new Map(contenu.banques.map((b) => [b.competence, b.exercices]));
  const lecons = new Map(contenu.lecons.map((l) => [l.competence, l.statut]));
  const cours = new Map((contenu.cours ?? []).map((k) => [k.competence, k.statut]));
  return contenu.referentiels.flatMap((r) => {
    const programme = contenu.programmes.find((p) => p.id === r.programme);
    const enVigueur = programmesApplicables(contenu.programmes, r.classe, annee).some((p) => p.id === r.programme);
    return r.competences.map((c): Reference => {
      const questions = banques.get(c.id) ?? [];
      return {
        ref: c.id,
        matiere: programme?.matiere ?? '',
        programme: r.programme,
        en_vigueur: enVigueur,
        cycle: programme?.cycle ?? 0,
        classe: r.classe,
        domaine: c.domaine,
        theme: c.theme,
        titre: c.titre,
        notion: c.statut === 'verifie' ? 'verifie' : 'a_verifier',
        lecon: lecons.get(c.id) ?? null,
        cours: cours.get(c.id) ?? null,
        questions: { publiees: questions.filter((q) => q.statut === 'publie').length, total: questions.length },
        generateurs: GENERATEURS.filter((g) => g.competences.includes(c.id)).map((g) => g.id),
        dictees: (contenu.dictees ?? []).filter((d) => d.competence === c.id).length,
      };
    });
  });
}
