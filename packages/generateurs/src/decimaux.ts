// Calcul décimal exact sur des chaînes : aucune erreur d'arrondi des nombres flottants.

/** « 3,5 » ou « 3.5 » → { entier: '3', decimales: '5' } (sans signe). */
function decouper(n: string): { entier: string; decimales: string } {
  const [e = '0', d = ''] = n.replace('.', ',').split(',');
  return { entier: e.replace(/^0+(?=\d)/, '') || '0', decimales: d.replace(/0+$/, '') };
}

/** Écriture française normalisée : virgule, pas de zéro inutile. « 3.50 » → « 3,5 ». */
export function normaliserDecimal(n: string): string {
  const { entier, decimales } = decouper(n);
  return decimales ? `${entier},${decimales}` : entier;
}

/** Multiplie un décimal positif par 10^k (k négatif : divise). */
export function decaler(n: string, k: number): string {
  const { entier, decimales } = decouper(n);
  const chiffres = entier + decimales;
  let virgule = entier.length + k;
  let tout = chiffres;
  if (virgule <= 0) {
    tout = '0'.repeat(1 - virgule) + tout;
    virgule = 1;
  }
  if (virgule > tout.length) tout = tout + '0'.repeat(virgule - tout.length);
  return normaliserDecimal(`${tout.slice(0, virgule)},${tout.slice(virgule)}`);
}

/** Compare deux décimaux positifs : -1, 0 ou 1. */
export function comparerDecimaux(a: string, b: string): -1 | 0 | 1 {
  const x = decouper(a);
  const y = decouper(b);
  if (x.entier.length !== y.entier.length) return x.entier.length < y.entier.length ? -1 : 1;
  if (x.entier !== y.entier) return x.entier < y.entier ? -1 : 1;
  const l = Math.max(x.decimales.length, y.decimales.length);
  const dx = x.decimales.padEnd(l, '0');
  const dy = y.decimales.padEnd(l, '0');
  return dx === dy ? 0 : dx < dy ? -1 : 1;
}

/** Écrit un décimal à partir d'un entier de « centièmes », « millièmes »… : (325, 2) → « 3,25 ». */
export function depuisEntier(valeur: number, decimales: number): string {
  return decaler(String(valeur), -decimales);
}
