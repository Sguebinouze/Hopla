import { doublesMoitiesCe1, numerationCalculCe1, proceduresCe1, tablesAdditionCe1, tablesMultiplicationCe1 } from './ce1-calcul';
import { accordSujetVerbeCe1, classesMotsCe1, infinitifCe1, plurielGnCe1, presentCe1, typesPhrasesCe1 } from './ce1-francais';
import { fractionsAdditionnerCe1, fractionsComparerCe1, nombresComparerCe1, nombresLettresCe1, nombresUnitesCe1, pariteCe1 } from './ce1-nombres';
import { problemesAdditifsCe1, problemesComparaisonCe1, problemesMultiplicatifsCe1 } from './ce1-problemes';
import { normaliserDecimal } from './decimaux';
import { fractionsColoriees, fractionsColorieesCe1 } from './fractions-c2';
import { additionRelatifs } from './relatifs-c4';
import { antonymes6e, conditionnel6e, conjonctions6e, fonctions6e, imperatif6e, participePasseEtre6e, propositions6e } from './sixieme-francais';
import { aires6e, conversionsLongueurs6e, durees6e, perimetres6e, proportionnalite6e } from './sixieme-grandeurs';
import {
  arrondir6e, comparerDecimaux6e, diviserDecimal6e, divisionEuclidienne6e, fractionDunNombre6e, fractionsDecimales6e,
  fractionsOperations6e, fractionsUsuelles6e, multiplierDecimaux6e, multiplierDiviser6e, pourcentages6e,
} from './sixieme-nombres';
import { tablesMultiplication } from './tables-c2';
import type { Difficulte, Generateur, Item } from './types';

export type { Difficulte, Gabarit, Generateur, Item, Visuel } from './types';
export { ecrireRelatif, ecrireTerme } from './relatifs-c4';
export { enLettres } from './lettres';

export const GENERATEURS: Generateur[] = [
  // CE1 mathématiques
  nombresUnitesCe1, nombresLettresCe1, nombresComparerCe1, fractionsColorieesCe1, fractionsComparerCe1,
  fractionsAdditionnerCe1, pariteCe1, tablesAdditionCe1, tablesMultiplicationCe1, doublesMoitiesCe1,
  numerationCalculCe1, proceduresCe1, problemesAdditifsCe1, problemesComparaisonCe1, problemesMultiplicatifsCe1,
  // CE1 français
  presentCe1, infinitifCe1, plurielGnCe1, accordSujetVerbeCe1, classesMotsCe1, typesPhrasesCe1,
  // CE2
  fractionsColoriees, tablesMultiplication,
  // 6e mathématiques
  comparerDecimaux6e, multiplierDiviser6e, fractionsDecimales6e, arrondir6e, multiplierDecimaux6e, diviserDecimal6e,
  divisionEuclidienne6e, fractionsUsuelles6e, fractionDunNombre6e, fractionsOperations6e, pourcentages6e,
  conversionsLongueurs6e, perimetres6e, aires6e, durees6e, proportionnalite6e,
  // 6e français
  imperatif6e, conditionnel6e, participePasseEtre6e, fonctions6e, propositions6e, conjonctions6e, antonymes6e,
  // 5e
  additionRelatifs,
];

export function generateur(id: string): Generateur {
  const g = GENERATEURS.find((x) => x.id === id);
  if (!g) throw new Error(`Générateur inconnu : ${id}`);
  return g;
}

/** Une série de `n` items distincts pour un générateur. */
export function serie(id: string, n: number, graineBase: number, difficulte: Difficulte): Item[] {
  const g = generateur(id);
  const vus = new Set<string>();
  const items: Item[] = [];
  for (let i = 0; items.length < n && i < n * 20; i++) {
    const item = g.generer(graineBase + i, difficulte);
    const cle = [item.consigne, JSON.stringify(item.visuel ?? null), (item.options ?? []).slice().sort().join('|')].join('#');
    if (!vus.has(cle)) {
      vus.add(cle);
      items.push(item);
    }
  }
  return items;
}

/**
 * Normalise une saisie : espaces, signe moins typographique ou clavier,
 * point décimal et zéros inutiles (« 3.50 » devient « 3,5 »).
 */
export function normaliserReponse(saisie: string): string {
  const s = saisie.trim().replace(/\s+/g, '').replace(/^-/, '−').replace(/^\+/, '');
  const m = s.match(/^(−?)(\d+(?:[.,]\d+)?)$/);
  return m ? m[1]! + normaliserDecimal(m[2]!) : s;
}
