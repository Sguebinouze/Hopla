// CE2, fractions inférieures ou égales à 1, dénominateur jusqu'à 12.
// Source : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024), p. 20-21.
import { choix, creerGenerateur, optionsNumeriques } from './outils';

/** Fractions de base n/d (d ≤ 6) qu'on peut agrandir sans dépasser un dénominateur de 12. */
const BASES: [number, number][] = [
  [1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6],
];
const PRENOMS = ['Marc', 'Ange', 'Saïd', 'Lucie', 'Inès', 'Hugo', 'Nora', 'Malo'];

/** « 1 part », « 3 parts ». */
const parts = (n: number) => `${n} part${n > 1 ? 's' : ''}`;

/** Pièges du programme seulement : numérateur non nul, dénominateur jusqu'à 12, fraction au plus égale à 1. */
const garder = (fractions: string[]) =>
  fractions.filter((f) => {
    const [p, q] = f.split('/').map(Number) as [number, number];
    return p >= 1 && q <= 12 && p <= q;
  });

// ─────────── Égalités de fractions

export const fractionsEgalesCe2 = creerGenerateur({
  id: 'fractions-egales-ce2',
  competence: 'MA-C2-CE2-FRAC-02',
  cycle: 2,
  description: 'Établir des égalités de fractions : numérateur manquant, fraction égale à une fraction donnée.',
  generer(a, d) {
    const [n, den] = a.choisir(d === 1 ? BASES.filter(([, q]) => q === 2) : BASES);
    const k = a.entier(2, Math.floor(12 / den));
    const N = n * k;
    const D = den * k;
    const explication = `Les parts sont ${k} fois plus petites. Il faut ${k} fois plus de parts. ${n} × ${k} = ${N}, donc ${N}/${D} = ${n}/${den}.`;
    if (d === 3) {
      const pieges = garder([`${n}/${D}`, `${N - 1}/${D}`, `${N + 1}/${D}`, `${n + 1}/${den}`]);
      const numerateurGarde = `${n}/${D}`;
      return {
        gabarit: 'qcm',
        consigne: `Quelle fraction est égale à ${n}/${den} ?`,
        ...choix(a, `${N}/${D}`, pieges.map((f): [string, string?] => [f, f === numerateurGarde ? 'numerateur-non-multiplie' : undefined]), () => {
          const q = a.entier(den + 1, 12);
          return `${a.entier(1, q - 1)}/${q}`;
        }, { numerique: true }),
        reponse: `${N}/${D}`,
        indice: 'Des parts deux fois plus petites : il en faut deux fois plus.',
        explication,
      };
    }
    return {
      gabarit: 'saisie',
      consigne: `Complète : …/${D} = ${n}/${den}`,
      reponse: String(N),
      indice: `Combien de fois ${den} dans ${D} ?`,
      explication,
    };
  },
});

// ─────────── Comparer des fractions

export const fractionsComparerCe2 = creerGenerateur({
  id: 'fractions-comparer-ce2',
  competence: 'MA-C2-CE2-FRAC-03',
  cycle: 2,
  description: 'Comparer deux fractions : même dénominateur, même numérateur, dénominateur multiple de l’autre.',
  generer(a, d) {
    let gauche: [number, number];
    let droite: [number, number];
    let explication: string;
    if (d === 1) {
      const den = a.entier(3, 12);
      const [x, y] = a.melanger(Array.from({ length: den - 1 }, (_, i) => i + 1)).slice(0, 2) as [number, number];
      gauche = [x, den];
      droite = [y, den];
      explication = `Les parts ont la même taille. ${parts(x)}, c’est ${x < y ? 'moins' : 'plus'} que ${parts(y)}.`;
    } else if (d === 2) {
      const [p, q] = a.melanger([3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).slice(0, 2) as [number, number];
      const n = a.entier(1, Math.min(p, q) - 1);
      gauche = [n, p];
      droite = [n, q];
      explication = `On prend ${parts(n)} dans les deux cas. Partagé en ${Math.max(p, q)}, chaque part est plus petite qu’en ${Math.min(p, q)}.`;
    } else {
      const [den, k] = a.choisir([[2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [3, 2], [3, 3], [3, 4], [4, 2], [4, 3], [5, 2], [6, 2]] as const);
      const D = den * k;
      const x = a.entier(1, den - 1);
      // Une fois sur quatre environ, les deux fractions sont égales.
      const y = a.suivant() < 0.25 ? x * k : a.entier(1, D - 1);
      const petite: [number, number] = [x, den];
      const grande: [number, number] = [y, D];
      [gauche, droite] = a.suivant() < 0.5 ? [petite, grande] : [grande, petite];
      explication = `${x}/${den} = ${x * k}/${D}. On compare ${x * k}/${D} et ${y}/${D}.`;
    }
    const vg = gauche[0] / gauche[1];
    const vd = droite[0] / droite[1];
    const signe = Math.abs(vg - vd) < 1e-9 ? '=' : vg < vd ? '<' : '>';
    const g = `${gauche[0]}/${gauche[1]}`;
    const dr = `${droite[0]}/${droite[1]}`;
    return {
      gabarit: 'qcm',
      consigne: `Choisis le bon signe : ${g} … ${dr}`,
      options: ['<', '>', '='],
      erreurs: (() => {
        const oppose = signe === '<' ? '>' : signe === '>' ? '<' : undefined;
        // En d3, l'erreur typique compare les numérateurs sans regarder les dénominateurs.
        const naif = gauche[0] < droite[0] ? '<' : gauche[0] > droite[0] ? '>' : '=';
        const e: Record<string, string> = {};
        if (d === 3 && naif !== signe) e[naif] = 'denominateurs-ignores';
        if (oppose && !(oppose in e)) e[oppose] = d === 2 ? 'fraction-unitaire-inversee' : 'signe-comparaison-inverse';
        return e;
      })(),
      reponse: signe,
      indice: d === 2 ? 'Plus on partage le tout, plus les parts sont petites.' : d === 3 ? 'Écris les deux fractions avec le même dénominateur.' : 'Compare le nombre de parts.',
      explication: `${explication} Donc ${g} ${signe} ${dr}.`,
    };
  },
});

// ─────────── Additionner et soustraire des fractions

export const fractionsAdditionnerCe2 = creerGenerateur({
  id: 'fractions-additionner-ce2',
  competence: 'MA-C2-CE2-FRAC-04',
  cycle: 2,
  description: 'Additionner et soustraire des fractions de même dénominateur ou dont un dénominateur est multiple de l’autre.',
  generer(a, d) {
    if (d === 3) {
      // Problème : quelle fraction du gâteau reste-t-il ?
      const den = a.choisir([6, 8, 10, 12]);
      const x = a.entier(1, den - 3);
      const y = a.entier(1, den - 1 - x);
      const r = den - x - y;
      const [p1, p2] = a.melanger(PRENOMS).slice(0, 2);
      return {
        gabarit: 'qcm',
        consigne: `${p1} mange ${x}/${den} d’un gâteau. ${p2} en mange ${y}/${den}. Quelle fraction du gâteau reste-t-il ?`,
        options: optionsNumeriques(a, `${r}/${den}`, garder([`${x + y}/${den}`, `${r}/${den * 2}`, `${r + 1}/${den}`]), () => `${a.entier(1, den - 1)}/${den}`),
        reponse: `${r}/${den}`,
        indice: `Le gâteau entier, c’est ${den}/${den}.`,
        explication: `Ils mangent ${x}/${den} + ${y}/${den} = ${x + y}/${den}. ${den}/${den} − ${x + y}/${den} = ${r}/${den}. Il reste ${r}/${den} du gâteau.`,
      };
    }
    const addition = a.suivant() < 0.5;
    const signe = addition ? '+' : '−';
    if (d === 1) {
      const den = a.entier(3, 12);
      const x = a.entier(1, den - 2);
      const y = a.entier(1, den - 1 - x);
      const [p, q, r] = addition ? [x, y, x + y] : [x + y, y, x];
      return {
        gabarit: 'qcm',
        consigne: `Calcule : ${p}/${den} ${signe} ${q}/${den}`,
        ...choix(a, `${r}/${den}`, [[addition ? `${r}/${den * 2}` : `${p + q}/${den}`, addition ? 'denominateurs-additionnes' : 'addition-au-lieu-soustraction'], [`${r + 1}/${den}`]].filter(([f]) => garder([f!]).length > 0) as [string, string?][], () => `${a.entier(1, den - 1)}/${den}`, { numerique: true }),
        reponse: `${r}/${den}`,
        indice: 'Le dénominateur ne change pas. Calcule avec les numérateurs.',
        explication: `Les parts ont la même taille. ${parts(p)} ${addition ? 'plus' : 'moins'} ${parts(q)}, cela fait ${parts(r)}. Le résultat est ${r}/${den}.`,
      };
    }
    // Un dénominateur multiple de l'autre : 1/2 + 1/4 = 2/4 + 1/4 = 3/4.
    const [den, k] = a.choisir([[2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [3, 2], [3, 3], [3, 4], [4, 2], [4, 3], [5, 2], [6, 2]] as const);
    const D = den * k;
    const x = a.entier(1, den - 1);
    const X = x * k;
    const y = addition ? a.entier(1, D - X) : a.entier(1, X - 1);
    const r = addition ? X + y : X - y;
    const [gauche, droite] = addition && a.suivant() < 0.5 ? [`${y}/${D}`, `${x}/${den}`] : [`${x}/${den}`, `${y}/${D}`];
    const gaucheD = gauche === `${x}/${den}` ? `${X}/${D}` : gauche;
    const droiteD = droite === `${x}/${den}` ? `${X}/${D}` : droite;
    return {
      gabarit: 'qcm',
      consigne: `Calcule : ${gauche} ${signe} ${droite}`,
      ...choix(a, `${r}/${D}`, ([[addition ? `${x + y}/${D}` : `${Math.abs(x - y)}/${D}`, 'numerateur-non-multiplie'], [addition ? `${x + y}/${den}` : `${x}/${D}`, addition ? 'mauvais-denominateur' : undefined], [`${r + 1}/${D}`]] as [string, string?][]).filter(([f]) => garder([f]).length > 0), () => `${a.entier(1, D - 1)}/${D}`, { numerique: true }),
      reponse: `${r}/${D}`,
      indice: `Écris ${x}/${den} avec ${D} comme dénominateur.`,
      explication: `${x}/${den} = ${X}/${D}. ${gaucheD} ${signe} ${droiteD} = ${r}/${D}.`,
    };
  },
});
