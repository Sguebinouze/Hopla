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
export const LANGUES_ECOUTE = ['en-GB', 'de-DE', 'es-ES'] as const;

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
