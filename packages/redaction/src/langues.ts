// Textes des langues vivantes : une même phrase mêle du français et la langue étudiée
// (« **A cat** : un chat. »). Pour la voix d'Octave, on la découpe en passages, chacun lu
// avec sa voix. La langue de chaque mot vient de sa fréquence dans les deux langues
// (lexique calculé par scripts/voix/lexique.py) et de sa place : entre « » ou en gras,
// un mot ambigu est dans la langue étudiée ; ailleurs, il suit ses voisins.

export type LangueEtudiee = 'en-GB' | 'de-DE' | 'es-ES';
export type LangueLue = 'fr-FR' | LangueEtudiee;
export interface Passage { langue: LangueLue; texte: string }
/** Mot en minuscules (apostrophe droite) → [fréquence Zipf dans la langue étudiée, en français]. */
export type Lexique = Record<string, [number, number]>;

// Mots français courants qui existent aussi dans la langue étudiée : hors guillemets, ils
// suivent leurs voisins au lieu de basculer seuls (« il dort », « Le but du jeu », « se levanta »).
const COMMUNS_TOUTES = ['final', 'radical', 'test', 'plus', 'type', 'information', 'national', 'station', 'regret', 'indirect', 'passive'];
const FRANCAIS_COURANTS: Record<LangueEtudiee, Set<string>> = {
  'en-GB': new Set([...COMMUNS_TOUTES, 'a', 'an', 'as', 'but', 'son', 'pain', 'sent', 'court', 'long', 'sale', 'parent', 'figure',
    'change', 'permission', 'suggestion', 'argument', 'affirmative', 'location', 'front', 'range', 'mine', 'in', 'on', 'or', 'place']),
  'de-DE': new Set([...COMMUNS_TOUTES, 'an', 'es', 'hier', 'sein', 'dort', 'nie', 'trier', 'seine', 'du', 'in', 'so', 'argument']),
  'es-ES': new Set([...COMMUNS_TOUTES, 'a', 'e', 'o', 'y', 'u', 'os', 'nos', 'me', 'te', 'se', 'que', 'les', 'la', 'le', 'de', 'en',
    'un', 'tu', 'es', 'son', 'sale', 'grandes', 'nombres']),
};
const ELISION = /^(j|l|d|s|qu|n|c|m|t|jusqu|lorsqu|puisqu)'\p{L}/u;
const MOT = /[\p{L}\p{N}][\p{L}\p{N}\p{M}_'’-]*/gu;
// Un mot peut commencer par un trait d'union : terminaison étudiée (« -ing », « -aba »).
const JETON = /\*\*|«|»|:|[.!?;()]|(?<![\p{L}\p{N}])-?[\p{L}\p{N}][\p{L}\p{N}\p{M}_'’-]*/gu;

type Classe = 'E' | 'F' | 'N';
const cle = (mot: string) => mot.toLowerCase().replace(/’/g, "'").replace(/^-/, '');

function classer(mot: string, marque: boolean, langue: LangueEtudiee, lexique: Lexique): Classe {
  const m = cle(mot);
  if (!/\p{L}/u.test(m)) return 'N';
  if (mot.startsWith('-')) return 'E';
  if (m.length === 1) return marque ? 'E' : 'N';
  if (ELISION.test(m)) return 'F';
  const [zl, zf] = lexique[m] ?? [0, 0];
  const d = zl - zf;
  // Lettres que la langue étudiée n'a pas : « dénombrable », « présent ».
  if ((langue === 'es-ES' ? /[èêàçùûôîœ]/ : /[éèêàçùûôîœ]/).test(m)) return 'F';
  // Entre « » ou en gras : la langue étudiée, sauf un mot nettement français (« je ne suis pas »).
  // Un mot un peu plus courant en français suit ses voisins (« donner son avis », « in Lyon »).
  if (marque) return zf >= 1.5 && d <= -1.5 ? 'F' : d < 0.3 && zf >= 1.5 ? 'N' : 'E';
  if (FRANCAIS_COURANTS[langue].has(m)) return 'N';
  if (d >= 1.5 || (d >= 1 && zf < 3.5)) return 'E';
  if (d <= -0.5 || (zl === 0 && zf > 0)) return 'F';
  return 'N';
}

interface Mot {
  debut: number; fin: number; classe: Classe; penche: boolean; ambigu: boolean; groupe: number; traduction: boolean; marque: number;
}

/** Découpe un texte en passages français et en langue étudiée, dans l'ordre de lecture. */
export function decouperLangues(texte: string, langue: LangueEtudiee, lexique: Lexique): Passage[] {
  const mots: Mot[] = [];
  let guillemets = false;
  let gras = false;
  let marque = 0; // numéro du passage entre « » ou en gras, 0 hors marque
  let marques = 0;
  let debutGlose = 0; // premier mot depuis le début de la phrase, pour « Open : ouvrir. »
  let groupe = 0; // morceau de phrase entre deux ponctuations
  let traduction = false; // morceau ouvert par « : » ou « ( » : souvent la traduction de ce qui précède
  for (const j of texte.matchAll(JETON)) {
    const t = j[0];
    const i = j.index ?? 0;
    // Chaque marque ouvre un morceau : un mot ambigu entre « » suit ses voisins entre « ».
    if (t === '**') { gras = !gras; marque = gras ? ++marques : guillemets ? marque : 0; groupe++; continue; }
    if (t === '«') { guillemets = true; marque = ++marques; groupe++; continue; }
    if (t === '»') { guillemets = false; marque = gras ? marque : 0; groupe++; continue; }
    if (t === ')') { groupe++; traduction = false; continue; }
    if (t === ':') {
      // Glose en début de phrase : « Open : ouvrir. », « Next to : à côté de. ». Les mots avant
      // les deux-points, sans mot français, et dont l'un penche vers la langue étudiée, en sont.
      const avant = mots.slice(debutGlose);
      if (!guillemets && !gras && avant.length > 0 && avant.length <= 4
        && avant.every((m) => m.classe !== 'F') && avant.some((m) => m.penche)) {
        for (const m of avant) m.classe = 'E';
      }
      debutGlose = mots.length;
      groupe++;
      traduction = true;
      continue;
    }
    if (/^[.!?;(]$/.test(t)) {
      debutGlose = mots.length;
      groupe++;
      traduction = t === '(';
      continue;
    }
    const [zl, zf] = lexique[cle(t)] ?? [0, 0];
    mots.push({ debut: i, fin: i + t.length, classe: classer(t, guillemets || gras, langue, lexique), penche: zl > zf, ambigu: /\p{L}/u.test(t) && zl - zf > -0.5, groupe, traduction, marque });
  }

  // Un mot seul entre « », vraiment ambigu (« On », « In »), est le mot étudié.
  for (let k = 1; k <= marques; k++) {
    const dedans = mots.filter((m) => m.marque === k);
    if (dedans.length === 1 && dedans[0]!.classe === 'N' && dedans[0]!.ambigu) dedans[0]!.classe = 'E';
  }
  // Les mots neutres (articles, pronoms, noms propres, nombres) prennent la langue du mot qui suit
  // dans le même morceau de phrase : « le mur », « se coucher », « me levanto ». Sans mot décidé
  // après eux, un morceau qui suit des deux-points ou une parenthèse est une traduction
  // (« A cat : un chat. », « trennen (trier) ») ; les autres prennent la langue du mot d'avant.
  const langues: ('E' | 'F' | null)[] = mots.map((m) => (m.classe === 'N' ? null : m.classe));
  for (let i = langues.length - 2; i >= 0; i--) {
    if (mots[i]!.groupe === mots[i + 1]!.groupe) langues[i] ??= langues[i + 1]!;
  }
  for (let i = 0; i < langues.length; i++) {
    if (langues[i] !== null) continue;
    const memeGroupeAvant = i > 0 && mots[i - 1]!.groupe === mots[i]!.groupe;
    langues[i] = memeGroupeAvant ? langues[i - 1]! : mots[i]!.traduction || i === 0 ? 'F' : langues[i - 1]!;
  }
  if (!langues.includes('E')) return [{ langue: 'fr-FR', texte }];

  const bruts: { langue: LangueLue; debut: number; fin: number }[] = [];
  mots.forEach((m, i) => {
    const l: LangueLue = langues[i] === 'E' ? langue : 'fr-FR';
    const dernier = bruts[bruts.length - 1];
    if (dernier?.langue === l) dernier.fin = m.fin;
    else {
      if (dernier) dernier.fin = m.debut;
      bruts.push({ langue: l, debut: dernier ? m.debut : 0, fin: m.fin });
    }
  });
  bruts[bruts.length - 1]!.fin = texte.length;

  const passages: Passage[] = [];
  for (const b of bruts) {
    const t = nettoyer(texte.slice(b.debut, b.fin));
    if (!/[\p{L}\p{N}]/u.test(t)) continue;
    const dernier = passages[passages.length - 1];
    if (dernier?.langue === b.langue) dernier.texte = `${dernier.texte} ${t}`;
    else passages.push({ langue: b.langue, texte: t });
  }
  return passages;
}

/** Un passage se lit seul : sans marques de mise en forme ni ponctuation orpheline. */
function nettoyer(t: string): string {
  let s = t.replace(/\*\*|[«»]/g, '').replace(/\s+/g, ' ');
  const ouvertes = (s.match(/\(/g) ?? []).length;
  if (ouvertes !== (s.match(/\)/g) ?? []).length) s = s.replace(/[()]/g, '');
  s = s.replace(/\s+([.,!?;:)])/g, '$1').replace(/\(\s+/g, '(').replace(/([?!])[\s?!.]*[?!.]/g, '$1');
  s = s.replace(/^[\s,:;)\]=→+]+/, '').replace(/[\s,:;(\[=→+]+$/, '');
  return s.trim();
}

/** Mots d'un texte tels que le lexique les range, pour repérer ceux qui lui manquent. */
export const motsDuLexique = (texte: string) => [...texte.matchAll(MOT)].map((m) => cle(m[0]));
