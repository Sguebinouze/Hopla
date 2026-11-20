// Contrôle automatique des règles de rédaction pédagogique (voir docs/redaction.md).
// Il ne remplace pas la relecture humaine : il attrape les tics les plus fréquents.

export type Cycle = 2 | 3 | 4;
export type Niveau = 'erreur' | 'alerte';

export interface Probleme {
  niveau: Niveau;
  regle: string;
  message: string;
  extrait: string;
}

interface Interdit {
  motif: RegExp;
  niveau: Niveau;
  note?: string;
}

// Formules creuses, emphase et fausse complicité : interdites partout.
const INTERDITS: Interdit[] = [
  { motif: /\bbien sûr\b/i, niveau: 'erreur' },
  { motif: /\bvoici (un|une|le|la|les)\b/i, niveau: 'erreur' },
  { motif: /\bplongeons\b/i, niveau: 'erreur' },
  { motif: /\bdécouvrons ensemble\b/i, niveau: 'erreur' },
  { motif: /\bil est important de noter\b/i, niveau: 'erreur' },
  { motif: /\ben somme\b/i, niveau: 'erreur' },
  { motif: /\bpour résumer\b/i, niveau: 'erreur' },
  { motif: /\bfascinant/i, niveau: 'erreur' },
  { motif: /\bcrucia/i, niveau: 'erreur' },
  { motif: /\bincontournable/i, niveau: 'erreur' },
  { motif: /\bpléthore\b/i, niveau: 'erreur' },
  { motif: /\blevier/i, niveau: 'erreur' },
  { motif: /\bvoyage au cœur\b/i, niveau: 'erreur' },
  { motif: /\bdébloqu/i, niveau: 'erreur' },
  { motif: /\bmaîtris/i, niveau: 'erreur' },
  { motif: /\bc'est parti\b/i, niveau: 'erreur' },
  { motif: /\bsuper travail\b/i, niveau: 'erreur' },
  { motif: /\btu es prêt/i, niveau: 'erreur' },
  // Tics relevés par Humanizer (github.com/blader/humanizer), transposés en français.
  // Importance gonflée, formule qui sonne profond, vente, autorité sans nom, texte qui parle de lui-même :
  // alerte seulement, un historien peut écrire « marque un tournant » à bon escient.
  { motif: /\bjoue un rôle (capital|clé|majeur|essentiel|central|déterminant|primordial|fondamental)/i, niveau: 'alerte', note: 'dire ce que la chose fait' },
  { motif: /\b(témoigne|souligne|illustre) (de )?l[’']importance\b/i, niveau: 'alerte', note: 'dire le fait' },
  { motif: /\b(héritage|empreinte) (durable|indélébile)/i, niveau: 'alerte', note: 'dire le fait' },
  { motif: /\b(la vraie question|au fond, ce qui compte|le cœur du problème)\b/i, niveau: 'alerte', note: 'énoncer l’idée précise' },
  { motif: /\b(niché|à couper le souffle|riche patrimoine|cadre idyllique)\b/i, niveau: 'alerte', note: 'ton publicitaire' },
  { motif: /\b(les|des|certains) (experts|spécialistes|observateurs) (disent|pensent|estiment|affirment|soulignent)\b/i, niveau: 'alerte', note: 'nommer la source ou dire le fait' },
  { motif: /\b(dans|avec) cette (leçon|fiche|activité)\b|\b(nous allons|on va) (voir|découvrir|apprendre)\b/i, niveau: 'erreur' },
  { motif: /\b(voyons|regardons) ensemble\b|\bn[’']hésite pas\b/i, niveau: 'erreur' },
  // Notions légitimes en géographie (« paysage ») et en grammaire (« phrase complexe ») :
  // on alerte sans bloquer, le relecteur tranche.
  { motif: /\bpaysage/i, niveau: 'alerte', note: 'légitime en géographie, à éviter ailleurs' },
  { motif: /\bcomplexe/i, niveau: 'alerte', note: 'légitime pour « phrase complexe », à éviter ailleurs' },
];

// Longueur maximale d'une phrase (en mots) selon le cycle.
export const MOTS_MAX: Record<Cycle, { max: number; niveau: Niveau }> = {
  2: { max: 12, niveau: 'erreur' },
  3: { max: 20, niveau: 'alerte' },
  4: { max: 25, niveau: 'alerte' },
};

// Mots en -ant qui ne sont pas des participes présents.
const FAUX_PARTICIPES = new Set([
  'avant', 'maintenant', 'pendant', 'durant', 'cependant', 'enfant', 'enfants', 'souvent',
  'devant', 'suivant', 'suivante', 'gant', 'géant', 'restant', 'montant', 'auparavant',
]);

export function phrases(texte: string): string[] {
  return texte
    .split(/(?<=[.!?…])\s+/u)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function compterMots(phrase: string): number {
  // « 3/8 », « −7 », « l'enfant » comptent pour un mot.
  return phrase.split(/\s+/u).filter((m) => /[\p{L}\p{N}]/u.test(m)).length;
}

export function verifierTexte(texte: string, cycle: Cycle): Probleme[] {
  const problemes: Probleme[] = [];

  if (texte.includes('—')) {
    problemes.push({ niveau: 'erreur', regle: 'tiret-cadratin', message: 'Tiret cadratin interdit.', extrait: texte });
  }

  for (const { motif, niveau, note } of INTERDITS) {
    const m = texte.match(motif);
    if (m) {
      problemes.push({
        niveau,
        regle: 'vocabulaire',
        message: `Expression à proscrire : « ${m[0]} »${note ? ` (${note})` : ''}.`,
        extrait: texte,
      });
    }
  }

  if ((texte.match(/!/g) ?? []).length > 1) {
    problemes.push({ niveau: 'alerte', regle: 'exclamation', message: 'Plusieurs points d’exclamation.', extrait: texte });
  }

  const limite = MOTS_MAX[cycle];
  for (const phrase of phrases(texte)) {
    const n = compterMots(phrase);
    if (n > limite.max) {
      problemes.push({
        niveau: limite.niveau,
        regle: 'longueur',
        message: `Phrase de ${n} mots (cycle ${cycle} : ${limite.max} au plus).`,
        extrait: phrase,
      });
    }
    const premier = phrase.match(/^(?:En\s+)?([\p{L}'’]+)/u)?.[1]?.toLowerCase();
    if (premier && premier.length > 4 && premier.endsWith('ant') && !FAUX_PARTICIPES.has(premier)) {
      problemes.push({
        niveau: 'alerte',
        regle: 'participe-present',
        message: 'Phrase ouverte par un participe présent : préférer un impératif.',
        extrait: phrase,
      });
    }
  }

  return problemes;
}

export { cleVoix, pourLaVoix } from './oral';
export { decouperLangues, motsDuLexique, type LangueEtudiee, type LangueLue, type Lexique, type Passage } from './langues';
export { decouperDictee, groupeLu, nomsPropres } from './dictee';
