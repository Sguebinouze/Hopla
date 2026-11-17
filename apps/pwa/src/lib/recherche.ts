import type { CompetencePack } from './packs';

/** Minuscules, sans accents ni ponctuation : « Théorème de Pythagore » → « theoreme de pythagore ». */
export const normaliser = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’'`]/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();

const VIDES = new Set(['le', 'la', 'les', 'l', 'un', 'une', 'des', 'de', 'du', 'd', 'et', 'ou', 'a', 'au', 'aux', 'en', 'sur', 'pour', 'par', 'avec', 'ce', 'ces', 'son', 'sa', 'ses', 'qu', 'que', 'qui', 'est']);

/** Racine grossière : retire le pluriel, pour que « fractions » trouve « fraction » et « animaux » trouve « animal ». */
const racine = (mot: string) => {
  if (mot.length > 4 && mot.endsWith('aux')) return mot.slice(0, -3) + 'al';
  if (mot.length > 3 && /[sx]$/.test(mot)) return mot.slice(0, -1);
  return mot;
};

const mots = (s: string) => normaliser(s).split(' ').filter((m) => m && !VIDES.has(m)).map(racine);

/** Champs fouillés et leur poids : le titre compte plus que le texte des exercices. */
function champs(c: CompetencePack): [string, number][] {
  return [
    [c.titre, 6],
    [c.theme, 3],
    [c.domaine, 2],
    [c.attendu, 3],
    [c.exemple, 2],
    [c.lecon ? `${c.lecon.regle} ${c.lecon.exemple} ${c.lecon.piege ?? ''}` : '', 2],
    [c.exercices.map((e) => e.consigne).join(' '), 1],
  ];
}

export interface Index {
  competence: CompetencePack;
  champs: { mots: Set<string>; poids: number }[];
}

export const indexer = (competences: CompetencePack[]): Index[] =>
  competences.map((c) => ({ competence: c, champs: champs(c).map(([t, poids]) => ({ mots: new Set(mots(t)), poids })) }));

/**
 * Notions qui contiennent tous les mots cherchés (début de mot suffisant à partir de 3 lettres),
 * les plus pertinentes d'abord. Moins de 2 caractères : aucun résultat.
 */
export function rechercher(index: Index[], requete: string): CompetencePack[] {
  const cherches = mots(requete);
  if (normaliser(requete).length < 2 || cherches.length === 0) return [];
  const trouve = (ens: Set<string>, m: string) => {
    if (ens.has(m)) return 2;
    if (m.length >= 3) for (const x of ens) if (x.startsWith(m)) return 1;
    return 0;
  };
  const scores: [CompetencePack, number][] = [];
  for (const { competence, champs: cs } of index) {
    let total = 0;
    let tous = true;
    for (const m of cherches) {
      const s = cs.reduce((acc, ch) => acc + trouve(ch.mots, m) * ch.poids, 0);
      if (s === 0) { tous = false; break; }
      total += s;
    }
    if (tous) scores.push([competence, total]);
  }
  return scores.sort((a, b) => b[1] - a[1]).map(([c]) => c);
}

/** Domaines, puis thèmes, dans l'ordre du programme : chaque thème regroupe toutes ses notions. */
export function ranger(competences: CompetencePack[]): { domaine: string; themes: { theme: string; notions: CompetencePack[] }[] }[] {
  const domaines = new Map<string, Map<string, CompetencePack[]>>();
  for (const c of competences) {
    const d = domaines.get(c.domaine) ?? new Map<string, CompetencePack[]>();
    domaines.set(c.domaine, d);
    d.set(c.theme, [...(d.get(c.theme) ?? []), c]);
  }
  return [...domaines].map(([domaine, t]) => ({ domaine, themes: [...t].map(([theme, notions]) => ({ theme, notions })) }));
}
