import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { z } from 'zod';
import {
  banqueCultureSchema, banqueSchema, coursSchema, defiSchema, dicteeSchema, glossaireSchema, mediaSchema, leconSchema, programmeSchema, referentielSchema, sourceSchema,
  type Banque, type BanqueCulture, type Cours, type Defi, type Dictee, type Glossaire, type Lecon, type Media, type Programme, type Referentiel, type Source,
} from './schemas';

export const RACINE_DEPOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
export const DOSSIER_CONTENU = join(RACINE_DEPOT, 'content');
/** Images des questions, servies par l'appli sous /images/. */
export const DOSSIER_IMAGES = join(RACINE_DEPOT, 'apps', 'pwa', 'public', 'images');

export interface Contenu {
  sources: Source[];
  programmes: Programme[];
  referentiels: (Referentiel & { fichier: string })[];
  banques: (Banque & { fichier: string })[];
  lecons: (Lecon & { fichier: string })[];
  cours: (Cours & { fichier: string })[];
  glossaire?: Glossaire;
  defis: Defi[];
  culture: (BanqueCulture & { fichier: string })[];
  dictees?: (Dictee & { fichier: string })[];
  medias?: (Media & { fiche: string })[];
}

export interface ErreurChargement {
  fichier: string;
  message: string;
}

function fichiersJson(dossier: string): string[] {
  if (!existsSync(dossier)) return [];
  return readdirSync(dossier).flatMap((nom) => {
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) return fichiersJson(chemin);
    return nom.endsWith('.json') ? [chemin] : [];
  });
}

export function chargerContenu(racine = DOSSIER_CONTENU): { contenu: Contenu; erreurs: ErreurChargement[] } {
  const erreurs: ErreurChargement[] = [];

  const lire = <T>(chemin: string, schema: z.ZodType<T>): T | undefined => {
    const fichier = relative(racine, chemin);
    let brut: unknown;
    try {
      brut = JSON.parse(readFileSync(chemin, 'utf8'));
    } catch (e) {
      erreurs.push({ fichier, message: `JSON invalide : ${(e as Error).message}` });
      return undefined;
    }
    const r = schema.safeParse(brut);
    if (!r.success) {
      for (const issue of r.error.issues) {
        erreurs.push({ fichier, message: `${issue.path.join('.') || '(racine)'} : ${issue.message}` });
      }
      return undefined;
    }
    return r.data;
  };

  const sources = lire(join(racine, 'sources', 'sources.json'), sourceSchema.array()) ?? [];
  const programmes = lire(join(racine, 'programmes', 'programmes.json'), programmeSchema.array()) ?? [];
  const referentiels = fichiersJson(join(racine, 'referentiel')).flatMap((f) => {
    const r = lire(f, referentielSchema);
    return r ? [{ ...r, fichier: relative(racine, f) }] : [];
  });
  const banques = fichiersJson(join(racine, 'exercices')).flatMap((f) => {
    const b = lire(f, banqueSchema);
    return b ? [{ ...b, fichier: relative(racine, f) }] : [];
  });

  const lecons = fichiersJson(join(racine, 'lecons')).flatMap((f) => {
    const l = lire(f, leconSchema);
    return l ? [{ ...l, fichier: relative(racine, f) }] : [];
  });

  const fichierGlossaire = join(racine, 'glossaire.json');
  const glossaire = existsSync(fichierGlossaire) ? lire(fichierGlossaire, glossaireSchema) : undefined;

  const cours = fichiersJson(join(racine, 'cours')).flatMap((f) => {
    const c = lire(f, coursSchema);
    return c ? [{ ...c, fichier: relative(racine, f) }] : [];
  });

  const defis = existsSync(join(racine, 'fluence', 'defis.json'))
    ? lire(join(racine, 'fluence', 'defis.json'), defiSchema.array()) ?? []
    : [];

  const culture = fichiersJson(join(racine, 'culture')).flatMap((f) => {
    const b = lire(f, banqueCultureSchema);
    return b ? [{ ...b, fichier: relative(racine, f) }] : [];
  });

  const dictees = fichiersJson(join(racine, 'dictees')).flatMap((f) => {
    const d = lire(f, dicteeSchema);
    return d ? [{ ...d, fichier: relative(racine, f) }] : [];
  });

  const medias = fichiersJson(join(racine, 'medias')).flatMap((f) => {
    const m = lire(f, mediaSchema);
    return m ? [{ ...m, fiche: relative(racine, f) }] : [];
  });

  return { contenu: { sources, programmes, referentiels, banques, lecons, cours, glossaire, defis, culture, dictees, medias }, erreurs };
}
