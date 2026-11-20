import { z } from 'zod';

export const CLASSES = ['cp', 'ce1', 'ce2', 'cm1', 'cm2', '6e', '5e', '4e', '3e'] as const;
export const CYCLE_DE: Record<Classe, 2 | 3 | 4> = {
  cp: 2, ce1: 2, ce2: 2, cm1: 3, cm2: 3, '6e': 3, '5e': 4, '4e': 4, '3e': 4,
};
export const MATIERES = [
  'francais', 'mathematiques', 'questionner-le-monde', 'sciences-technologie', 'histoire-geographie',
  'svt', 'physique-chimie', 'technologie', 'langues-vivantes', 'allemand', 'espagnol', 'emc',
] as const;
/** Préfixe d'identifiant de compétence par matière. */
export const PREFIXE: Record<Matiere, string> = {
  francais: 'FR', mathematiques: 'MA', 'questionner-le-monde': 'QM', 'sciences-technologie': 'ST',
  'histoire-geographie': 'HG', svt: 'SV', 'physique-chimie': 'PC', technologie: 'TE',
  'langues-vivantes': 'LV', allemand: 'AL', espagnol: 'ES', emc: 'EM',
};
/** Langues des phrases d'écoute (synthèse vocale de l'appareil). */
export const LANGUES_ECOUTE = ['fr-FR', 'en-GB', 'de-DE', 'es-ES'] as const;

export type Classe = (typeof CLASSES)[number];
export type Matiere = (typeof MATIERES)[number];

const annee = z.string().regex(/^\d{4}-\d{4}$/, 'format attendu : 2026-2027');

export const sourceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  titre: z.string().min(1),
  editeur: z.string().min(1),
  url: z.string().url(),
  licence: z.enum(['etalab-2.0', 'texte-officiel', 'autre']),
  consulte_le: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sha256: z.string().regex(/^[a-f0-9]{64}$/).nullable(),
  archive: z.string().nullable(),
});

export const programmeSchema = z.object({
  id: z.string().regex(/^[A-Z]{2}-C[234]-\d{4}$/),
  matiere: z.enum(MATIERES),
  cycle: z.union([z.literal(2), z.literal(3), z.literal(4)]),
  intitule: z.string().min(1),
  reference: z.string().min(1),
  sources: z.array(z.string()).min(1),
  verifie: z.boolean(),
  application: z
    .array(z.object({ classe: z.enum(CLASSES), debut: annee, fin: annee.nullable() }))
    .min(1),
});

export const competenceSchema = z.object({
  id: z.string().regex(/^[A-Z]{2}-C[234]-[A-Z0-9]{2,3}-[A-Z]{2,6}-\d{2}$/),
  /** Nom court affiché à l'élève (« Doubles et moitiés »). */
  titre: z.string().min(1).max(40),
  domaine: z.string().min(1),
  theme: z.string().min(1),
  attendu: z.string().min(1),
  exemple: z.string().min(1),
  source: z.object({
    id: z.string(),
    page: z.number().int().positive().nullable(),
    extrait: z.string().nullable(),
  }),
  prerequis: z.array(z.string()),
  statut: z.enum(['a_verifier', 'verifie']),
});

export const referentielSchema = z.object({
  programme: z.string(),
  classe: z.enum(CLASSES),
  competences: z.array(competenceSchema).min(1),
});

const ID_MEDIA = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export const exerciceSchema = z
  .object({
    id: z.string().regex(/^[A-Z]{2}-C[234]-[A-Z0-9]{2,3}-[A-Z]{2,6}-\d{2}-\d{3}$/),
    gabarit: z.enum(['qcm', 'saisie', 'texte-a-trous', 'association', 'ordre', 'vrai-faux']),
    difficulte: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    consigne: z.string().min(1),
    options: z.array(z.string()).optional(),
    reponse: z.string().min(1),
    indice: z.string().min(1),
    explication: z.string().min(1),
    /** Code d'erreur typique par option piège (voir Item.erreurs dans @hopla/generateurs). */
    erreurs: z.record(z.string(), z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)).optional(),
    /** Langues vivantes : phrase dite à l'élève dans la langue étudiée, avant de répondre. */
    ecoute: z.object({ texte: z.string().min(1).max(120), langue: z.enum(LANGUES_ECOUTE) }).optional(),
    /** Illustration de la question (identifiant d'un média de content/medias), affichée sous la consigne. */
    image: z.string().regex(ID_MEDIA).optional(),
    /** Réponses en images : une image par option (option → identifiant de média). */
    images_options: z.record(z.string(), z.string().regex(ID_MEDIA)).optional(),
    statut: z.enum(['brouillon', 'relu', 'publie']),
    auteur: z.enum(['humain', 'ia']),
    relu_par: z.string().nullable(),
  })
  .refine((e) => e.statut === 'brouillon' || e.relu_par !== null, {
    message: 'un exercice relu ou publié doit indiquer relu_par',
  });

export const banqueSchema = z.object({
  competence: z.string(),
  exercices: z.array(exerciceSchema).min(1),
});

export type Source = z.infer<typeof sourceSchema>;
export type Programme = z.infer<typeof programmeSchema>;
export type Competence = z.infer<typeof competenceSchema>;
export type Referentiel = z.infer<typeof referentielSchema>;
export type Exercice = z.infer<typeof exerciceSchema>;

// Leçon courte d'une notion : un exemple concret d'abord, la règle ensuite, puis un essai guidé.
// Dans `regle`, les notions clés peuvent être entourées de ** pour le gras.
export const leconSchema = z
  .object({
    competence: z.string(),
    exemple: z.string().min(1),
    regle: z.string().min(1),
    piege: z.string().min(1).nullable(),
    essai: z.object({
      consigne: z.string().min(1),
      options: z.array(z.string()).min(2).max(4),
      reponse: z.string().min(1),
      explication: z.string().min(1),
    }),
    statut: z.enum(['brouillon', 'relu', 'publie']),
    auteur: z.enum(['humain', 'ia']),
    relu_par: z.string().nullable(),
  })
  .refine((l) => l.statut === 'brouillon' || l.relu_par !== null, {
    message: 'une leçon relue ou publiée doit indiquer relu_par',
  });
export type Lecon = z.infer<typeof leconSchema>;

// Cours complet d'une notion : la leçon courte reste « l'essentiel » ; le cours déroule la notion en parties,
// chacune faite de blocs typés (observer, expliquer, méthode, exemple résolu, piège, tableau, image…).
// Chaque cours cite ses appuis : une source du registre, avec page et extrait vérifiés avant publication.
const texteCours = z.string().min(1);
export const questionCoursSchema = z.object({
  consigne: texteCours,
  options: z.array(z.string().min(1)).min(2).max(4),
  reponse: texteCours,
  explication: texteCours,
});
export const blocCoursSchema = z.discriminatedUnion('type', [
  /** Corpus d'exemples à observer avant toute règle. */
  z.object({ type: z.literal('observe'), consigne: texteCours, exemples: z.array(texteCours).min(2).max(8) }),
  z.object({ type: z.literal('explique'), texte: texteCours }),
  /** Procédure numérotée, réutilisable sur n'importe quel exemple. */
  z.object({ type: z.literal('methode'), titre: texteCours, etapes: z.array(texteCours).min(2).max(6) }),
  z.object({ type: z.literal('exemple-resolu'), enonce: texteCours, etapes: z.array(texteCours).min(1).max(5), conclusion: texteCours }),
  z.object({ type: z.literal('piege'), erreur: texteCours, correction: texteCours }),
  z.object({ type: z.literal('tableau'), titre: texteCours.nullable(), colonnes: z.array(texteCours).min(2).max(5), lignes: z.array(z.array(z.string())).min(1) }),
  z.object({ type: z.literal('vocabulaire'), mots: z.array(z.object({ mot: texteCours, definition: texteCours })).min(1) }),
  z.object({ type: z.literal('image'), media: z.string().regex(ID_MEDIA), legende: texteCours }),
  /** Dessin des générateurs de maths (horloge, barres de fractions, solide…). */
  z.object({ type: z.literal('visuel'), visuel: z.object({ type: z.string() }).passthrough(), legende: texteCours }),
  z.object({ type: z.literal('frise'), reperes: z.array(z.object({ annee: z.number().int(), date: texteCours, evenement: texteCours })).min(2) }),
  /** Question intercalée : on vérifie qu'une étape est comprise avant la suivante. */
  questionCoursSchema.extend({ type: z.literal('question') }),
]);
export const coursSchema = z
  .object({
    competence: z.string(),
    /** Durée de lecture estimée, en minutes. */
    duree: z.number().int().min(3).max(30),
    /** Trace écrite : ce que l'élève copie dans son cahier. */
    essentiel: texteCours,
    parties: z.array(z.object({ titre: texteCours, blocs: z.array(blocCoursSchema).min(1) })).min(1).max(6),
    a_toi: z.array(questionCoursSchema).min(2).max(4),
    sources: z.array(z.object({
      id: z.string(),
      /** Page imprimée du document archivé et extrait exact : contrôlés par content:extraits. */
      page: z.number().int().positive().nullable(),
      extrait: z.string().min(1).nullable(),
      /** Ce que la source appuie dans le cours. */
      appui: texteCours,
    })).min(1),
    statut: z.enum(['brouillon', 'relu', 'publie']),
    auteur: z.enum(['humain', 'ia']),
    relu_par: z.string().nullable(),
  })
  .refine((c) => c.statut === 'brouillon' || c.relu_par !== null, { message: 'un cours relu ou publié doit indiquer relu_par' })
  .refine((c) => c.statut !== 'publie' || c.sources.every((s) => s.page !== null && s.extrait !== null), {
    message: 'un cours publié cite chaque source avec sa page et son extrait',
  });
export type BlocCours = z.infer<typeof blocCoursSchema>;

// Glossaire commun : une seule définition par terme et par cycle, reprise mot pour mot par tous les cours
// (bloc « vocabulaire »). Les cours d'un même cycle ne peuvent donc pas se contredire.
export const glossaireSchema = z.object({
  termes: z.array(z.object({
    terme: z.string().min(1),
    /** Définition par cycle ; un cycle absent : le terme n'y est pas défini. */
    definitions: z.object({ '2': z.string().min(1).optional(), '3': z.string().min(1).optional(), '4': z.string().min(1).optional() }),
  })),
});
export type Glossaire = z.infer<typeof glossaireSchema>;
export type QuestionCours = z.infer<typeof questionCoursSchema>;
export type Cours = z.infer<typeof coursSchema>;

// Culture générale (hors programme) : une banque de questions par cycle, quiz de 5 questions par jour.
export const THEMES_CULTURE = [
  'geographie', 'histoire', 'sciences', 'nature', 'espace', 'arts', 'langue', 'sport', 'inventions', 'monde',
] as const;
export const questionCultureSchema = z
  .object({
    id: z.string().regex(/^CG-C[234]-\d{3}$/),
    theme: z.enum(THEMES_CULTURE),
    question: z.string().min(1).max(160),
    options: z.array(z.string().min(1)).min(3).max(4),
    reponse: z.string().min(1),
    explication: z.string().min(1).max(240),
    statut: z.enum(['brouillon', 'relu', 'publie']),
    auteur: z.enum(['humain', 'ia']),
    relu_par: z.string().nullable(),
  })
  .refine((q) => q.statut === 'brouillon' || q.relu_par !== null, {
    message: 'une question relue ou publiée doit indiquer relu_par',
  });
export const banqueCultureSchema = z.object({
  cycle: z.union([z.literal(2), z.literal(3), z.literal(4)]),
  questions: z.array(questionCultureSchema).min(1),
});
export type QuestionCulture = z.infer<typeof questionCultureSchema>;
export type BanqueCulture = z.infer<typeof banqueCultureSchema>;
export type Banque = z.infer<typeof banqueSchema>;

// Défi de fluence : le plus de bonnes réponses en temps limité, sur des faits à automatiser.
// L'objectif cite le texte officiel (page et extrait vérifiés par pnpm content:extraits) ; null s'il n'en fixe pas.
export const defiSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  classe: z.enum(CLASSES),
  titre: z.string().min(1).max(40),
  competence: z.string(),
  generateur: z.string(),
  difficultes: z.array(z.union([z.literal(1), z.literal(2), z.literal(3)])).min(1),
  duree_s: z.number().int().min(30).max(300),
  objectif: z.number().int().positive().nullable(),
  source: z.object({ id: z.string(), page: z.number().int().positive(), extrait: z.string().min(10) }).nullable(),
  verifie: z.boolean(),
}).refine((d) => (d.objectif === null) === (d.source === null), {
  message: 'un objectif chiffré cite sa source, et seulement dans ce cas',
});
export type Defi = z.infer<typeof defiSchema>;

// Dictée : un texte réel (auteur du domaine public, jeu de données sous licence libre) ou une phrase
// construite pour le CP. La licence doit permettre la vente de l'appli sur les stores ; une licence
// CC BY impose le crédit, affiché dans l'appli. Voir docs/licences.md.
export const LICENCES_DICTEE = ['domaine-public', 'CC-BY-4.0', 'hopla'] as const;
export const dicteeSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    classe: z.enum(CLASSES),
    competence: z.string(),
    titre: z.string().min(1).max(60),
    texte: z.string().min(5).max(1500),
    source: z.object({
      auteur: z.string().nullable(),
      oeuvre: z.string().nullable(),
      passage: z.string().nullable(),
      reference: z.string().min(3),
      url: z.string().url().nullable(),
    }),
    licence: z.enum(LICENCES_DICTEE),
    credit: z.string().nullable(),
    // Points d'orthographe à observer (accords, terminaisons, lettres muettes), quand la source les donne.
    /** Mots écrits au tableau (noms propres) ; absent : repérés dans le texte (nomsPropres). */
    tableau: z.array(z.string().min(1)).optional(),
    points: z.array(z.string()),
    statut: z.enum(['brouillon', 'relu', 'publie']),
    auteur: z.enum(['humain', 'ia']),
    relu_par: z.string().nullable(),
  })
  .refine((d) => d.licence !== 'CC-BY-4.0' || (d.credit?.length ?? 0) > 5, { message: 'une dictée sous CC BY doit indiquer son crédit' })
  .refine((d) => d.statut === 'brouillon' || d.relu_par !== null, { message: 'une dictée relue ou publiée doit indiquer relu_par' });
export type Dictee = z.infer<typeof dicteeSchema>;

// Images des questions. Le fichier est dans apps/pwa/public/images ; la fiche dit d'où il vient,
// sous quelle licence, et ce qu'il montre (texte lu par les lecteurs d'écran).
// Licences retenues : usage commercial permis, sans partage à l'identique ni clause non commerciale.
export const LICENCES_MEDIA = [
  'domaine-public', 'CC0', 'CC-BY-4.0', 'CC-BY-3.0', 'CC-BY-2.0', 'MIT', 'Apache-2.0', 'licence-ouverte-2.0',
  'pexels', 'unsplash', 'pixabay', 'hopla',
] as const;
/** Licences qui obligent à créditer l'auteur : le crédit s'affiche sur la page Crédits. */
export const LICENCES_A_CREDITER: readonly string[] = ['CC-BY-4.0', 'CC-BY-3.0', 'CC-BY-2.0', 'licence-ouverte-2.0'];
export const mediaSchema = z
  .object({
    id: z.string().regex(ID_MEDIA).max(60),
    fichier: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*\.(svg|webp)$/),
    /** Ce que montre l'image, sans donner la réponse. */
    alt: z.string().min(3).max(140),
    licence: z.enum(LICENCES_MEDIA),
    source: z.object({
      nom: z.string().min(1),
      auteur: z.string().nullable(),
      titre: z.string().nullable(),
      url: z.string().url(),
    }),
    credit: z.string().nullable(),
    statut: z.enum(['brouillon', 'relu', 'publie']),
    auteur: z.enum(['humain', 'ia']),
    relu_par: z.string().nullable(),
  })
  .refine((m) => !LICENCES_A_CREDITER.includes(m.licence) || Boolean(m.credit), { message: 'cette licence exige un crédit' })
  .refine((m) => m.statut === 'brouillon' || m.relu_par !== null, { message: 'une image relue ou publiée doit indiquer relu_par' });

export type Media = z.infer<typeof mediaSchema>;
