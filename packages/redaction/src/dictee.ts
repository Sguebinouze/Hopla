// Dictée : le texte se dicte par groupes de mots courts, chacun suivi de sa ponctuation dite à voix haute,
// comme en classe. Les groupes suivent la ponctuation, puis se coupent à 5 mots au plus.

const NOMS_PONCTUATION: Record<string, string> = {
  ',': 'virgule', '.': 'point', ';': 'point-virgule', ':': 'deux-points',
  '?': 'point d’interrogation', '!': 'point d’exclamation', '…': 'points de suspension',
  '«': 'ouvrez les guillemets', '»': 'fermez les guillemets',
};
const FIN_DE_GROUPE = /[,.;:?!…»]$/;
const MOTS_PAR_GROUPE = 5;
const MOTS_OUTILS = new Set([
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'au', 'aux', 'à', 'et', 'ou', 'ni', 'mais', 'qui', 'que', 'dont', 'où',
  'je', 'tu', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles', 'ne', 'se', 'me', 'te', 'y', 'en', 'si', 'comme',
  'mon', 'ton', 'son', 'ma', 'ta', 'sa', 'mes', 'tes', 'ses', 'notre', 'votre', 'nos', 'vos', 'leur', 'leurs',
  'ce', 'cet', 'cette', 'ces', 'dans', 'sur', 'sous', 'avec', 'pour', 'par', 'sans', 'chez', 'vers', 'entre', 'très', 'plus',
]);

/** Coupe le texte en groupes à dicter. Chaque groupe garde sa ponctuation ; rien n'est perdu ni ajouté. */
export function decouperDictee(texte: string): string[] {
  // « et » collé à ses voisins : un guillemet ouvrant reste avec le mot qui suit, un fermant avec celui qui précède.
  const mots = texte.replace(/«\s+/g, '« ').replace(/\s+([»;:?!])/g, ' $1').split(/[ \t\n]+/).filter(Boolean);
  const propositions: string[][] = [];
  let courante: string[] = [];
  for (const m of mots) {
    courante.push(m);
    if (FIN_DE_GROUPE.test(m)) { propositions.push(courante); courante = []; }
  }
  if (courante.length) propositions.push(courante);
  return propositions.flatMap(couper);
}

/** Mot outil, élidé compris (« qu’en », « d’un »). */
const estOutil = (mot: string) => MOTS_OUTILS.has(mot.toLowerCase().replace(/^[a-z]+['’]/, ''));

/**
 * Coupe une proposition en groupes de 5 mots au plus, au meilleur endroit : groupes équilibrés, aucun
 * ne finit sur un déterminant, un pronom sujet ou une préposition (« Dans mon jardin | il y a »).
 */
function couper(p: string[]): string[] {
  if (p.length <= MOTS_PAR_GROUPE) return [p.join(' ')];
  const cout = (debut: number, fin: number) => {
    const n = fin - debut;
    const finOutil = fin < p.length && estOutil(p[fin - 1]!);
    return 4 + (n - 4) ** 2 + (finOutil ? 20 : 0) + (n === 1 ? 6 : 0);
  };
  const meilleur: number[] = [0];
  const coupe: number[] = [0];
  for (let fin = 1; fin <= p.length; fin++) {
    meilleur[fin] = Infinity;
    for (let debut = Math.max(0, fin - MOTS_PAR_GROUPE); debut < fin; debut++) {
      const c = meilleur[debut]! + cout(debut, fin);
      if (c < meilleur[fin]!) { meilleur[fin] = c; coupe[fin] = debut; }
    }
  }
  const groupes: string[] = [];
  for (let fin = p.length; fin > 0; fin = coupe[fin]!) groupes.unshift(p.slice(coupe[fin], fin).join(' '));
  return groupes;
}

/** Ce qu'Octave dit pour un groupe : les mots, puis le nom de chaque signe de ponctuation. */
export function groupeLu(groupe: string): string {
  const signes: string[] = [];
  let mots = groupe.replace(/ /g, ' ');
  if (mots.startsWith('«')) { signes.push(NOMS_PONCTUATION['«']!); mots = mots.slice(1); }
  const avant = signes.length ? `${signes.join(', ')}, ` : '';
  const fin: string[] = [];
  let m: RegExpMatchArray | null;
  while ((m = mots.match(/\s*([,.;:?!…»])$/))) {
    fin.unshift(NOMS_PONCTUATION[m[1]!]!);
    mots = mots.slice(0, m.index);
  }
  const texte = `${avant}${mots.trim()}`;
  return fin.length ? `${texte}, ${fin.join(', ')}.` : `${texte}.`;
}

const ABREVIATIONS = /^(M|Mme|Mlle|Mgr|Dr|St|Ste)\.$/;

/**
 * Mots écrits au tableau avant la dictée, comme en classe : les noms propres, qu'on ne devine pas
 * à l'oreille. Repérés par leur majuscule hors début de phrase (« M. Seguin » compris) ; un nom propre
 * en début de phrase ne se repère pas ainsi : la fiche de la dictée le donne dans `tableau`.
 */
export function nomsPropres(texte: string): string[] {
  const mots = texte.replace(/[\u00a0\u202f]/g, ' ').split(/\s+/).filter(Boolean);
  const noms: string[] = [];
  mots.forEach((brut, i) => {
    const mot = brut.replace(/^[«"(]+|[»",.;:!?…)]+$/g, '');
    // Le mot d'avant, guillemet fermant sauté : « … ! » Puis…
    const precedent = (mots[i - 1] === '»' ? mots[i - 2] : mots[i - 1]) ?? '';
    const apresAbreviation = ABREVIATIONS.test(precedent);
    const debutPhrase = !apresAbreviation && (i === 0 || /[.!?…:]»?$/.test(precedent) || precedent === '«' || /^«/.test(brut));
    if (debutPhrase || !/^\p{Lu}/u.test(mot)) return;
    const nom = apresAbreviation ? `${precedent} ${mot}` : mot;
    if (!noms.includes(nom)) noms.push(nom);
  });
  return noms;
}

