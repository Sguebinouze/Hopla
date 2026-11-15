import { GENERATEURS } from '@hopla/generateurs';
import type { Contenu } from './charger';
import { CLASSES, CYCLE_DE, type Classe, type Exercice } from './schemas';
import { programmesApplicables } from './verifier';

export interface Pack {
  version: 1;
  annee: string;
  classe: Classe;
  cycle: 2 | 3 | 4;
  genere_le: string;
  matieres: {
    matiere: string;
    programme: { id: string; intitule: string; reference: string; verifie: boolean };
    competences: {
      id: string;
      domaine: string;
      theme: string;
      attendu: string;
      exemple: string;
      statut: string;
      generateurs: string[];
      exercices: Exercice[];
    }[];
  }[];
}

export function construirePacks(
  contenu: Contenu, annee: string, options: { brouillons: boolean } = { brouillons: false },
): Pack[] {
  const statuts = new Set<Exercice['statut']>(options.brouillons ? ['brouillon', 'relu', 'publie'] : ['publie']);
  const banques = new Map(contenu.banques.map((b) => [b.competence, b.exercices]));

  return CLASSES.map((classe) => {
    const programmes = programmesApplicables(contenu.programmes, classe, annee);
    return {
      version: 1 as const,
      annee,
      classe,
      cycle: CYCLE_DE[classe],
      genere_le: new Date().toISOString(),
      matieres: programmes.map((p) => {
        const ref = contenu.referentiels.find((r) => r.programme === p.id && r.classe === classe);
        return {
          matiere: p.matiere,
          programme: { id: p.id, intitule: p.intitule, reference: p.reference, verifie: p.verifie },
          competences: (ref?.competences ?? []).map((c) => ({
            id: c.id,
            domaine: c.domaine,
            theme: c.theme,
            attendu: c.attendu,
            exemple: c.exemple,
            statut: c.statut,
            generateurs: GENERATEURS.filter((g) => g.competences.includes(c.id)).map((g) => g.id),
            exercices: (banques.get(c.id) ?? []).filter((e) => statuts.has(e.statut)),
          })),
        };
      }),
    };
  });
}
