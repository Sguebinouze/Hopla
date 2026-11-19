import { GENERATEURS } from '@hopla/generateurs';
import { decouperDictee, decouperLangues, type LangueEtudiee, type Lexique, type Passage } from '@hopla/redaction';
import type { Contenu } from './charger';
import { CLASSES, CYCLE_DE, type Classe, type Defi, type Dictee, type Exercice, type Lecon, type QuestionCulture } from './schemas';
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
      dictees: DicteePack[];
    }[];
  }[];
  /** Culture générale (hors programme) du cycle de la classe. */
  culture: Pick<QuestionCulture, 'id' | 'theme' | 'question' | 'options' | 'reponse' | 'explication'>[];
  /**
   * Langues vivantes : textes qui mêlent français et langue étudiée, découpés en passages
   * pour que la voix lise chacun dans sa langue. Clé : le texte tel qu'il est affiché.
   */
  voix: Record<string, Passage[]>;
}

/** Dictée telle que l'appli la joue : texte, groupes à dicter, source et crédit à afficher. */
export interface DicteePack {
  id: string;
  titre: string;
  texte: string;
  groupes: string[];
  source: string;
  credit: string | null;
}

const sourceDictee = (d: Dictee) =>
  [d.source.auteur, d.source.oeuvre].filter(Boolean).join(', ') || d.source.reference;

/** Langue étudiée par matière, et sa clé dans le lexique (packages/content/voix/lexique.json). */
export const LANGUE_DE_MATIERE: Record<string, { langue: LangueEtudiee; lexique: 'en' | 'de' | 'es' }> = {
  'langues-vivantes': { langue: 'en-GB', lexique: 'en' },
  allemand: { langue: 'de-DE', lexique: 'de' },
  espagnol: { langue: 'es-ES', lexique: 'es' },
};
export type LexiqueVoix = Record<'en' | 'de' | 'es', Lexique>;

/** Textes d'une matière lus par Octave, dans l'ordre de textesLus côté appli. */
function textesDeLangue(competences: Pack['matieres'][number]['competences']): string[] {
  return competences.flatMap((c) => [
    ...c.exercices.flatMap((e) => [e.consigne, e.indice, e.explication]),
    ...(c.lecon ? [c.lecon.exemple, c.lecon.regle, c.lecon.piege, c.lecon.essai.consigne] : []),
  ]).filter((t): t is string => Boolean(t?.trim()));
}

function decoupes(matieres: Pack['matieres'], lexique: LexiqueVoix | undefined): Pack['voix'] {
  const voix: Pack['voix'] = {};
  if (!lexique) return voix;
  for (const m of matieres) {
    const l = LANGUE_DE_MATIERE[m.matiere];
    if (!l) continue;
    for (const t of textesDeLangue(m.competences)) {
      const passages = decouperLangues(t, l.langue, lexique[l.lexique]);
      if (passages.some((p) => p.langue !== 'fr-FR')) voix[t] = passages;
    }
  }
  return voix;
}

export function construirePacks(
  contenu: Contenu, annee: string, options: { brouillons: boolean; lexique?: LexiqueVoix } = { brouillons: false },
): Pack[] {
  const statuts = new Set<Exercice['statut']>(options.brouillons ? ['brouillon', 'relu', 'publie'] : ['publie']);
  const banques = new Map(contenu.banques.map((b) => [b.competence, b.exercices]));
  const lecons = new Map(contenu.lecons.filter((l) => statuts.has(l.statut)).map((l) => [l.competence, l]));
  const dictees = (contenu.dictees ?? []).filter((d) => statuts.has(d.statut));

  return CLASSES.map((classe): Pack => {
    const programmes = programmesApplicables(contenu.programmes, classe, annee);
    const pack: Omit<Pack, 'voix'> = {
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
            dictees: dictees.filter((d) => d.competence === c.id && d.classe === classe).map((d) => ({
              id: d.id, titre: d.titre, texte: d.texte, groupes: decouperDictee(d.texte), source: sourceDictee(d), credit: d.credit,
            })),
          })),
        };
      }),
    };
    return { ...pack, voix: decoupes(pack.matieres, options.lexique) };
  });
}
