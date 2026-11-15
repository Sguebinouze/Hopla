// Écriture des nombres en lettres jusqu'à 1 000, orthographe recommandée de 1990
// (traits d'union partout), celle qu'emploie le programme : « six-cent-trente-cinq ».

const UNITES = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix',
  'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize'];
const DIZAINES: Record<number, string> = { 2: 'vingt', 3: 'trente', 4: 'quarante', 5: 'cinquante', 6: 'soixante' };

function moinsDeCent(n: number): string {
  if (n <= 16) return UNITES[n]!;
  if (n < 20) return `dix-${UNITES[n - 10]}`;
  const d = Math.floor(n / 10);
  const u = n % 10;
  if (d <= 6) {
    if (u === 0) return DIZAINES[d]!;
    return `${DIZAINES[d]}-${u === 1 ? 'et-' : ''}${UNITES[u]}`;
  }
  if (d === 7) return `soixante-${n === 71 ? 'et-' : ''}${moinsDeCent(n - 60)}`;
  if (n === 80) return 'quatre-vingts';
  return `quatre-vingt-${moinsDeCent(n - 80)}`;
}

export function enLettres(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 1000) throw new Error(`Hors champ : ${n}`);
  if (n === 1000) return 'mille';
  if (n < 100) return moinsDeCent(n);
  const c = Math.floor(n / 100);
  const reste = n % 100;
  const centaines = c === 1 ? 'cent' : `${UNITES[c]}-cent${reste === 0 ? 's' : ''}`;
  return reste === 0 ? centaines : `${centaines}-${moinsDeCent(reste)}`;
}
