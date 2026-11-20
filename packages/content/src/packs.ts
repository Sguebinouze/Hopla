import { GENERATEURS } from '@hopla/generateurs';
import { decouperDictee, decouperLangues, nomsPropres, type LangueEtudiee, type Lexique, type Passage } from '@hopla/redaction';
import type { Contenu } from './charger';
import { CLASSES, CYCLE_DE, type Classe, type Cours, type Defi, type Dictee, type Exercice, type Lecon, type QuestionCulture } from './schemas';
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
      /** Cours complet ; ses images publiées sont dans `medias`, les autres sont retirées. */
      cours: CoursPack | null;
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
  /** Images des questions de la classe : chemin sous /images/ et texte alternatif. */
  medias: Record<string, { src: string; alt: string }>;
  /** Crédits des images que leur licence oblige à citer (page Crédits). */
  credits: string[];
}

export type CoursPack = Pick<Cours, 'duree' | 'essentiel' | 'parties' | 'a_toi' | 'statut'>;

/** Dictée telle que l'appli la joue : texte, groupes à dicter, source et crédit à afficher. */
export interface DicteePack {
  id: string;
  titre: string;
  texte: string;
  groupes: string[];
  source: string;
  credit: string | null;
  /** Points à vérifier à la correction (« Accords : petit(s) »). */
  points: string[];
  /** Mots écrits au tableau avant la dictée : noms propres. */
  tableau: string[];
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
  const cours = new Map((contenu.cours ?? []).filter((k) => statuts.has(k.statut)).map((k) => [k.competence, k]));
  const dictees = (contenu.dictees ?? []).filter((d) => statuts.has(d.statut));
  const medias = new Map((contenu.medias ?? []).filter((m) => statuts.has(m.statut)).map((m) => [m.id, m]));
  // Une image pas encore relue n'apparaît pas : la question reste, sans image (ou avec ses réponses en texte).
  const avecImages = (e: Exercice): Exercice => {
    const { image, images_options, ...reste } = e;
    const options = images_options && Object.values(images_options).every((id) => medias.has(id)) ? images_options : undefined;
    return { ...reste, ...(image && medias.has(image) ? { image } : {}), ...(options ? { images_options: options } : {}) };
  };

  // Une image du cours pas encore publiée : le bloc disparait, le reste du cours s'affiche.
  const coursPack = (k: Cours): CoursPack => ({
    duree: k.duree, essentiel: k.essentiel, a_toi: k.a_toi, statut: k.statut,
    parties: k.parties.map((p) => ({ ...p, blocs: p.blocs.filter((b) => b.type !== 'image' || medias.has(b.media)) })),
  });

  return CLASSES.map((classe): Pack => {
    const programmes = programmesApplicables(contenu.programmes, classe, annee);
    const pack: Omit<Pack, 'voix' | 'medias' | 'credits'> = {
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
            exercices: (banques.get(c.id) ?? []).filter((e) => statuts.has(e.statut)).map(avecImages),
            lecon: (() => {
              const l = lecons.get(c.id);
              return l ? { exemple: l.exemple, regle: l.regle, piege: l.piege, essai: l.essai, statut: l.statut } : null;
            })(),
            cours: cours.has(c.id) ? coursPack(cours.get(c.id)!) : null,
            dictees: dictees.filter((d) => d.competence === c.id && d.classe === classe).map((d) => ({
              id: d.id, titre: d.titre, texte: d.texte, groupes: decouperDictee(d.texte), source: sourceDictee(d), credit: d.credit, points: d.points,
              tableau: d.tableau ?? nomsPropres(d.texte),
            })),
          })),
        };
      }),
    };
    const utilisees = new Set(pack.matieres.flatMap((m) => m.competences.flatMap((c) => [
      ...c.exercices.flatMap((e) => [e.image, ...Object.values(e.images_options ?? {})].filter((x): x is string => Boolean(x))),
      ...(c.cours?.parties.flatMap((p) => p.blocs.flatMap((b) => (b.type === 'image' ? [b.media] : []))) ?? []),
    ])));
    const images = [...utilisees].sort().map((id) => medias.get(id)!);
    return {
      ...pack,
      voix: decoupes(pack.matieres, options.lexique),
      medias: Object.fromEntries(images.map((m) => [m.id, { src: `/images/${m.fichier}`, alt: m.alt }])),
      credits: [...new Set(images.filter((m) => m.credit).map((m) => m.credit!))].sort(),
    };
  });
}
