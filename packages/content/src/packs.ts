import { GENERATEURS } from '@hopla/generateurs';
import type { Contenu } from './charger';
import { CLASSES, CYCLE_DE, type Classe, type Defi, type Exercice, type Lecon, type QuestionCulture } from './schemas';
import { programmesApplicables } from './verifier';

export interface Pack {
  version: 1;
  annee: string;
  classe: Classe;
  cycle: 2 | 3 | 4;
  genere_le: string;
  defis: (Omit<Defi, 'classe' | 'source'> & { source: { id: string; page: number } | null })[];
  matieres: {
    matiere: string;
    programme: { id: string; intitule: string; reference: string; verifie: boolean };
    competences: {
      id: string;
      titre: string;
      domaine: string;
      theme: string;
      attendu: string;
      exemple: string;
      statut: string;
      source: { id: string; page: number | null };
      generateurs: string[];
      exercices: Exercice[];
      lecon: Pick<Lecon, 'exemple' | 'regle' | 'piege' | 'essai' | 'statut'> | null;
    }[];
  }[];
  /** Culture générale (hors programme) du cycle de la classe. */
  culture: Pick<QuestionCulture, 'id' | 'theme' | 'question' | 'options' | 'reponse' | 'explication'>[];
}

export function construirePacks(
  contenu: Contenu, annee: string, options: { brouillons: boolean } = { brouillons: false },
): Pack[] {
  const statuts = new Set<Exercice['statut']>(options.brouillons ? ['brouillon', 'relu', 'publie'] : ['publie']);
  const banques = new Map(contenu.banques.map((b) => [b.competence, b.exercices]));
  const lecons = new Map(contenu.lecons.filter((l) => statuts.has(l.statut)).map((l) => [l.competence, l]));

  return CLASSES.map((classe) => {
    const programmes = programmesApplicables(contenu.programmes, classe, annee);
    return {
      version: 1 as const,
      annee,
      classe,
      cycle: CYCLE_DE[classe],
      genere_le: new Date().toISOString(),
      defis: contenu.defis.filter((d) => d.classe === classe).map(({ classe: _c, source, ...d }) => ({
        ...d, source: source ? { id: source.id, page: source.page } : null,
      })),
      culture: contenu.culture
        .filter((b) => b.cycle === CYCLE_DE[classe])
        .flatMap((b) => b.questions.filter((q) => statuts.has(q.statut)))
        .map(({ id, theme, question, options, reponse, explication }) => ({ id, theme, question, options, reponse, explication })),
      matieres: programmes.map((p) => {
        const ref = contenu.referentiels.find((r) => r.programme === p.id && r.classe === classe);
        return {
          matiere: p.matiere,
          programme: { id: p.id, intitule: p.intitule, reference: p.reference, verifie: p.verifie },
          competences: (ref?.competences ?? []).map((c) => ({
            id: c.id,
            titre: c.titre,
            domaine: c.domaine,
            theme: c.theme,
            attendu: c.attendu,
            exemple: c.exemple,
            statut: c.statut,
            source: { id: c.source.id, page: c.source.page },
            generateurs: GENERATEURS.filter((g) => g.competences.includes(c.id)).map((g) => g.id),
            exercices: (banques.get(c.id) ?? []).filter((e) => statuts.has(e.statut)),
            lecon: (() => {
              const l = lecons.get(c.id);
              return l ? { exemple: l.exemple, regle: l.regle, piege: l.piege, essai: l.essai, statut: l.statut } : null;
            })(),
          })),
        };
      }),
    };
  });
}
