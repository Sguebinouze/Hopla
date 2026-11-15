// Écriture des nombres en lettres, orthographe recommandée de 1990 (traits d'union partout),
// celle qu'emploie le programme : « six-cent-trente-cinq », « deux-millions-trois-cent-mille ».
// « vingt » et « cent » prennent un s quand ils sont multipliés et terminent le nombre, ou
// précèdent « million » ou « milliard » (des noms) ; jamais devant « mille » (invariable).

const UNITES = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix',
  'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize'];
const DIZAINES: Record<number, string> = { 2: 'vingt', 3: 'trente', 4: 'quarante', 5: 'cinquante', 6: 'soixante' };

function moinsDeCent(n: number, final: boolean): string {
  if (n <= 16) return UNITES[n]!;
  if (n < 20) return `dix-${UNITES[n - 10]}`;
  const d = Math.floor(n / 10);
  const u = n % 10;
  if (d <= 6) {
    if (u === 0) return DIZAINES[d]!;
    return `${DIZAINES[d]}-${u === 1 ? 'et-' : ''}${UNITES[u]}`;
  }
  if (d === 7) return `soixante-${n === 71 ? 'et-' : ''}${moinsDeCent(n - 60, final)}`;
  if (n === 80) return final ? 'quatre-vingts' : 'quatre-vingt';
  return `quatre-vingt-${moinsDeCent(n - 80, final)}`;
}

function moinsDeMille(n: number, final: boolean): string {
  if (n < 100) return moinsDeCent(n, final);
  const c = Math.floor(n / 100);
  const reste = n % 100;
  const centaines = c === 1 ? 'cent' : `${UNITES[c]}-cent${reste === 0 && final ? 's' : ''}`;
  return reste === 0 ? centaines : `${centaines}-${moinsDeCent(reste, final)}`;
}

/** Nombre entier de 0 à 999 999 999 999 en lettres. */
export function enLettres(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n >= 1e12) throw new Error(`Hors champ : ${n}`);
  if (n === 0) return 'zéro';
  const milliards = Math.floor(n / 1e9);
  const millions = Math.floor(n / 1e6) % 1000;
  const milliers = Math.floor(n / 1000) % 1000;
  const reste = n % 1000;
  const morceaux: string[] = [];
  if (milliards) morceaux.push(`${moinsDeMille(milliards, true)}-milliard${milliards > 1 ? 's' : ''}`);
  if (millions) morceaux.push(`${moinsDeMille(millions, true)}-million${millions > 1 ? 's' : ''}`);
  if (milliers) morceaux.push(milliers === 1 ? 'mille' : `${moinsDeMille(milliers, false)}-mille`);
  if (reste) morceaux.push(moinsDeMille(reste, true));
  return morceaux.join('-');
}
