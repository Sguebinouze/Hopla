// Préparation d'un texte pour la synthèse vocale : symboles, fractions et unités deviennent des mots.
// La voix lit ce qu'un professeur dirait à voix haute, pas les signes.

const PARTS: Record<number, [string, string]> = {
  2: ['demi', 'demis'], 3: ['tiers', 'tiers'], 4: ['quart', 'quarts'], 5: ['cinquième', 'cinquièmes'],
  6: ['sixième', 'sixièmes'], 7: ['septième', 'septièmes'], 8: ['huitième', 'huitièmes'], 9: ['neuvième', 'neuvièmes'],
  10: ['dixième', 'dixièmes'], 12: ['douzième', 'douzièmes'], 100: ['centième', 'centièmes'], 1000: ['millième', 'millièmes'],
};

// Unités, de la plus longue à la plus courte pour éviter les captures partielles (« cm » avant « m »).
const UNITES: [string, string][] = [
  ['km/h', 'kilomètres par heure'], ['m/s', 'mètres par seconde'],
  ['cm²', 'centimètres carrés'], ['dm²', 'décimètres carrés'], ['m²', 'mètres carrés'], ['km²', 'kilomètres carrés'],
  ['cm³', 'centimètres cubes'], ['°C', 'degrés'],
  ['dam', 'décamètres'], ['km', 'kilomètres'], ['hm', 'hectomètres'], ['dm', 'décimètres'], ['cm', 'centimètres'], ['mm', 'millimètres'],
  ['kg', 'kilogrammes'], ['mg', 'milligrammes'], ['mL', 'millilitres'], ['cL', 'centilitres'], ['dL', 'décilitres'],
  ['min', 'minutes'], ['m', 'mètres'], ['g', 'grammes'], ['L', 'litres'], ['h', 'heures'], ['s', 'secondes'], ['€', 'euros'],
];
const echapper = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');

export function pourLaVoix(texte: string): string {
  let t = texte.normalize('NFC');
  t = t.replace(/\*\*/g, '').replace(/[«»"]/g, '');
  t = t.replace(/(\d)[   ](?=\d{3}\b)/g, '$1');
  // Fractions écrites a/b entre deux nombres entiers.
  t = t.replace(/(?<![\d,])(\d+)\/(\d+)(?![\d,])/g, (_, a: string, b: string) => {
    const n = Number(a);
    const d = Number(b);
    const part = PARTS[d];
    if (!part) return `${a} sur ${b}`;
    return n === 1 ? `un ${part[0]}` : `${a} ${part[1]}`;
  });
  t = t.replace(/(\d+)\s?%/g, '$1 pour cent');
  for (const [u, mot] of UNITES) {
    t = t.replace(new RegExp(`(\\d)\\s?${echapper(u)}(?![\\p{L}²³])`, 'gu'), `$1 ${mot}`);
  }
  // Unité seule après « en » (« Convertis 3 m en cm ») ; nombre signé entre parenthèses.
  for (const [u, mot] of UNITES) {
    t = t.replace(new RegExp(`(\\ben )${echapper(u)}(?![\\p{L}²³])`, 'gu'), `$1${mot}`);
  }
  t = t.replace(/\(\+(\d)/g, '(plus $1');
  // Le trou d'une égalité se lit « combien » ; ailleurs, les points de suspension marquent une pause.
  t = t.replace(/([+−×÷=]\s*)…|…(\s*[+−×÷=])/g, (_, avant?: string, apres?: string) => (avant ? `${avant}combien` : `combien${apres}`));
  t = t.replace(/…/g, ', ');
  t = t.replace(/(^|[\s(])[−-](\d)/g, '$1moins $2');
  t = t.replace(/\s*×\s*/g, ' fois ').replace(/\s*÷\s*/g, ' divisé par ').replace(/\s*−\s*/g, ' moins ');
  t = t.replace(/\s+\+\s+/g, ' plus ').replace(/\s+=\s+/g, ' égale ');
  t = t.replace(/\s+<\s+/g, ' est inférieur à ').replace(/\s+>\s+/g, ' est supérieur à ');
  t = t.replace(/\s*→\s*/g, ', puis ');
  t = t.replace(/J\.-C\./g, 'Jésus-Christ');
  return t.replace(/\s+/g, ' ').replace(/\s+([,.?!])/g, '$1').trim();
}
