// CE1, nombres et fractions. Source : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024).
import { enLettres } from './lettres';
import { choix, creerGenerateur, qte, type Piege } from './outils';

const tous = (opts: string[], reponse: string, code: string) => Object.fromEntries(opts.filter((o) => o !== reponse).map((o) => [o, code]));

// ─────────── Nombres jusqu'à 1 000 : unités de numération

const UNITES_NUM = [
  { cle: 'c', valeur: 100, mot: 'centaine' },
  { cle: 'd', valeur: 10, mot: 'dizaine' },
  { cle: 'u', valeur: 1, mot: 'unité' },
] as const;

export const nombresUnitesCe1 = creerGenerateur({
  id: 'nombres-unites-ce1',
  competence: 'MA-C2-CE1-NUM-01',
  cycle: 2,
  description: 'Écrire en chiffres un nombre donné en centaines, dizaines et unités.',
  generer(a, d) {
    const c = a.entier(1, d === 1 ? 9 : 6);
    let dz = a.entier(1, 9);
    let u = a.entier(1, 9);
    // Difficulté 2 et 3 : un groupement à défaire, comme « 2 centaines, 27 dizaines et 14 unités ».
    if (d >= 2) {
      if (a.suivant() < 0.5) u = a.entier(10, 29);
      else dz = a.entier(10, 29);
    }
    const nombres = { c, d: dz, u };
    const ordre = d === 3 ? a.melanger(UNITES_NUM) : [...UNITES_NUM];
    const morceaux = ordre.map((x) => qte(nombres[x.cle], x.mot));
    const total = c * 100 + dz * 10 + u;
    const valeurs = ordre.map((x) => nombres[x.cle] * x.valeur);
    return {
      gabarit: 'saisie',
      consigne: `Écris en chiffres : ${morceaux[0]}, ${morceaux[1]} et ${morceaux[2]}.`,
      reponse: String(total),
      indice: '1 centaine, c’est 100. 1 dizaine, c’est 10.',
      explication: `${ordre.map((x, i) => `${morceaux[i]} ${nombres[x.cle] > 1 ? 'font' : 'fait'} ${valeurs[i]}`).join('. ')}. ${valeurs.join(' + ')} = ${total}.`,
    };
  },
});

// ─────────── Nombres jusqu'à 1 000 : écriture en lettres

export const nombresLettresCe1 = creerGenerateur({
  id: 'nombres-lettres-ce1',
  competence: 'MA-C2-CE1-NUM-01',
  cycle: 2,
  description: 'Passer de l’écriture en chiffres à l’écriture en lettres, et inversement.',
  generer(a, d) {
    // Difficulté 3 : dizaines de 70, 80 et 90, les plus difficiles à écrire.
    const c = a.entier(1, 9);
    const dz = d === 3 ? a.entier(7, 9) : a.entier(1, 6);
    const u = a.entier(0, 9);
    const n = c * 100 + dz * 10 + u;
    const lettres = enLettres(n);
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `Écris en chiffres : ${lettres}.`,
        reponse: String(n),
        indice: 'Cherche d’abord le nombre de centaines.',
        explication: `${lettres} : ${c} centaine${c > 1 ? 's' : ''}, puis ${n % 100}. Le nombre est ${n}.`,
      };
    }
    const voisins: [number, string | undefined][] = [
      [c * 100 + u * 10 + dz, 'dizaines-unites-inversees'], [dz * 100 + c * 10 + u, 'centaines-dizaines-inversees'], [c * 100 + ((dz + 1) % 10) * 10 + u, undefined],
    ];
    return {
      gabarit: 'qcm',
      consigne: `Comment s’écrit ${n} en lettres ?`,
      ...choix(a, lettres, voisins.filter(([x]) => x >= 100 && x <= 999 && x !== n).map(([x, code]): Piege => [enLettres(x), code]), () => enLettres(a.entier(100, 999))),
      reponse: lettres,
      indice: `Lis le nombre à voix haute : ${c} centaine${c > 1 ? 's' : ''}, puis la fin.`,
      explication: `${n} s’écrit ${lettres}. Les mots sont reliés par des traits d’union.`,
    };
  },
});

// ─────────── Comparer, ranger, encadrer

export const nombresComparerCe1 = creerGenerateur({
  id: 'nombres-comparer-ce1',
  competence: 'MA-C2-CE1-NUM-02',
  cycle: 2,
  description: 'Comparer des nombres jusqu’à 1 000 et trouver un nombre compris entre deux autres.',
  generer(a, d) {
    if (d === 3) {
      const bas = a.entier(10, 89) * 10;
      const haut = bas + 10;
      const juste = bas + a.entier(1, 9);
      const pieges = [bas - a.entier(1, 9), haut + a.entier(1, 9), Number(String(juste).split('').reverse().join(''))]
        .filter((x) => x <= bas || x >= haut);
      return {
        gabarit: 'qcm',
        consigne: `Quel nombre est compris entre ${bas} et ${haut} ?`,
        ...choix(a, String(juste), pieges.map((x): Piege => [String(x), 'hors-encadrement']), () => String(haut + a.entier(1, 50))),
        reponse: String(juste),
        indice: `Le nombre est plus grand que ${bas}. Il est plus petit que ${haut}.`,
        explication: `${bas} < ${juste} < ${haut}. ${juste} est compris entre ${bas} et ${haut}.`,
      };
    }
    const c = a.entier(1, 8);
    const x = a.entier(1, 9);
    const y = a.entier(0, 9);
    const candidats = [c * 100 + x * 10 + y, c * 100 + y * 10 + x, (c + 1) * 100 + y, c * 100 + x * 10 + ((y + 3) % 10), c * 100 + ((x + 5) % 10) * 10 + y];
    const liste = [...new Set(candidats)].slice(0, 4);
    while (liste.length < 4) {
      const z = a.entier(100, 999);
      if (!liste.includes(z)) liste.push(z);
    }
    const plusGrand = d === 1;
    const cible = plusGrand ? Math.max(...liste) : Math.min(...liste);
    return {
      gabarit: 'qcm',
      consigne: `Quel est le plus ${plusGrand ? 'grand' : 'petit'} nombre ?`,
      options: a.melanger(liste.map(String)),
      erreurs: { [String(plusGrand ? Math.min(...liste) : Math.max(...liste))]: 'plus-grand-plus-petit-confondus' },
      reponse: String(cible),
      indice: 'Compare d’abord les centaines. Puis compare les dizaines.',
      explication: `On range les nombres : ${[...liste].sort((p, q) => p - q).join(' < ')}. Le plus ${plusGrand ? 'grand' : 'petit'} est ${cible}.`,
    };
  },
});

const majuscule = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

// ─────────── Fractions : comparer

const DENOMINATEURS_CE1 = [2, 3, 4, 5, 6, 8, 10];
const NOMS_PARTS: Record<number, [string, string]> = {
  2: ['demi', 'demis'], 3: ['tiers', 'tiers'], 4: ['quart', 'quarts'], 5: ['cinquième', 'cinquièmes'],
  6: ['sixième', 'sixièmes'], 8: ['huitième', 'huitièmes'], 10: ['dixième', 'dixièmes'],
};
/** « un quart », « 3 cinquièmes ». */
export function nomFraction(n: number, d: number): string {
  const [s, p] = NOMS_PARTS[d]!;
  return n === 1 ? `un ${s}` : `${n} ${p}`;
}

export const fractionsComparerCe1 = creerGenerateur({
  id: 'fractions-comparer-ce1',
  competence: 'MA-C2-CE1-FRAC-02',
  cycle: 2,
  description: 'Comparer des fractions de même dénominateur ou de numérateur 1.',
  generer(a, d) {
    const memeDenominateur = d === 1 || (d === 3 && a.suivant() < 0.5);
    const plusGrande = d !== 3 || a.suivant() < 0.5;
    const mot = plusGrande ? 'grande' : 'petite';
    if (memeDenominateur) {
      const den = a.choisir([5, 6, 8, 10]);
      const nums = a.melanger(Array.from({ length: den - 1 }, (_, i) => i + 1)).slice(0, 4);
      const cible = plusGrande ? Math.max(...nums) : Math.min(...nums);
      return {
        gabarit: 'qcm',
        consigne: `Quelle fraction est la plus ${mot} ?`,
        options: a.melanger(nums.map((n) => `${n}/${den}`)),
        erreurs: { [`${plusGrande ? Math.min(...nums) : Math.max(...nums)}/${den}`]: 'plus-grand-plus-petit-confondus' },
        reponse: `${cible}/${den}`,
        indice: 'Les parts ont toutes la même taille. Compte les parts.',
        explication: `Le tout est partagé en ${den} parts égales. ${cible}/${den}, c’est ${nomFraction(cible, den)}. C’est le ${plusGrande ? 'plus' : 'moins'} de parts.`,
      };
    }
    const dens = a.melanger(DENOMINATEURS_CE1).slice(0, 4);
    const cible = plusGrande ? Math.min(...dens) : Math.max(...dens);
    return {
      gabarit: 'qcm',
      consigne: `Quelle fraction est la plus ${mot} ?`,
      options: a.melanger(dens.map((x) => `1/${x}`)),
      // Erreur typique : croire que 1/8 est plus grand que 1/2 parce que 8 est plus grand que 2.
      erreurs: { [`1/${plusGrande ? Math.max(...dens) : Math.min(...dens)}`]: 'fraction-unitaire-inversee' },
      reponse: `1/${cible}`,
      indice: 'Plus on partage le tout, plus les parts sont petites.',
      explication: `Pour 1/${cible}, le tout est partagé en ${cible} parts. ${plusGrande ? 'Ce sont les parts les plus grandes.' : 'Ce sont les parts les plus petites.'} 1/${cible} est la plus ${mot}.`,
    };
  },
});

// ─────────── Fractions : additionner et soustraire, même dénominateur

export const fractionsAdditionnerCe1 = creerGenerateur({
  id: 'fractions-additionner-ce1',
  competence: 'MA-C2-CE1-FRAC-03',
  cycle: 2,
  description: 'Additionner et soustraire des fractions de même dénominateur, trouver un complément.',
  generer(a, d) {
    const den = a.choisir(d === 1 ? [4, 5, 6] : [4, 5, 6, 8, 10]);
    const secours = () => `${a.entier(1, den - 1)}/${den}`;
    if (d === 3) {
      const n = a.entier(1, den - 1);
      const qui = a.choisir(['Lucie', 'Hugo', 'Inès', 'Malo']);
      return {
        gabarit: 'qcm',
        consigne: `${qui} colorie ${n}/${den} d’une figure en bleu. Le reste est en rouge. Quelle fraction est en rouge ?`,
        ...choix(a, `${den - n}/${den}`, [[`${n}/${den}`, 'complement-au-tout'], [`${den}/${den}`]], secours, { numerique: true }),
        reponse: `${den - n}/${den}`,
        indice: `La figure entière, c’est ${den}/${den}.`,
        explication: `La figure entière fait ${den}/${den}. ${den}/${den} − ${n}/${den} = ${den - n}/${den}. La partie rouge vaut ${den - n}/${den}.`,
      };
    }
    const x = a.entier(1, den - 2);
    const y = a.entier(1, den - 1 - x);
    const addition = d === 1;
    const [p, q] = addition ? [x, y] : [x + y, y];
    const r = addition ? x + y : x;
    const signe = addition ? '+' : '−';
    return {
      gabarit: 'qcm',
      consigne: `Calcule : ${p}/${den} ${signe} ${q}/${den}`,
      ...choix(a, `${r}/${den}`, addition ? [[`${r}/${den * 2}`, 'denominateurs-additionnes']] : [[`${p + q}/${den}`, 'addition-au-lieu-soustraction']], secours, { numerique: true }),
      reponse: `${r}/${den}`,
      indice: 'Le dénominateur ne change pas. Calcule avec les numérateurs.',
      explication: `${majuscule(nomFraction(p, den))} ${addition ? 'plus' : 'moins'} ${nomFraction(q, den)}, cela fait ${nomFraction(r, den)}. Le résultat est ${r}/${den}.`,
    };
  },
});

// ─────────── Parité

export const pariteCe1 = creerGenerateur({
  id: 'parite-ce1',
  competence: 'MA-C2-CE1-OPE-01',
  cycle: 2,
  description: 'Dire si un nombre est pair ou impair.',
  generer(a, d) {
    if (d === 3) {
      const bas = a.entier(100, 980);
      const haut = bas + 11;
      const pair = bas + 1 + 2 * a.entier(0, 4) + (bas % 2 === 0 ? 1 : 0);
      const impairDedans = pair + 1 < haut ? pair + 1 : pair - 1;
      const pairDehors = bas % 2 === 0 ? bas - 2 : bas - 1;
      const pairApres = haut % 2 === 0 ? haut + 2 : haut + 1;
      return {
        gabarit: 'qcm',
        consigne: `Quel nombre pair est compris entre ${bas} et ${haut} ?`,
        options: a.melanger([pair, impairDedans, pairDehors, pairApres].map(String)),
        erreurs: { [String(impairDedans)]: 'parite-confondue', [String(pairDehors)]: 'hors-encadrement', [String(pairApres)]: 'hors-encadrement' },
        reponse: String(pair),
        indice: 'Regarde le chiffre des unités. Puis vérifie l’encadrement.',
        explication: `${pair} finit par ${pair % 10} : il est pair. Il est compris entre ${bas} et ${haut}.`,
      };
    }
    const max = d === 1 ? 99 : 999;
    const min = d === 1 ? 10 : 100;
    const chercherPair = d === 1;
    const tirer = (pair: boolean) => {
      const n = a.entier(min, max);
      return n % 2 === (pair ? 0 : 1) ? n : n + 1 > max ? n - 1 : n + 1;
    };
    const cible = tirer(chercherPair);
    const autres = new Set<number>();
    while (autres.size < 3) {
      const z = tirer(!chercherPair);
      if (z !== cible) autres.add(z);
    }
    return {
      gabarit: 'qcm',
      consigne: `Quel nombre est ${chercherPair ? 'pair' : 'impair'} ?`,
      ...((opts) => ({ options: opts, erreurs: tous(opts, String(cible), 'parite-confondue') }))(a.melanger([cible, ...autres].map(String))),
      reponse: String(cible),
      indice: 'Regarde seulement le chiffre des unités.',
      explication: `Un nombre pair finit par 0, 2, 4, 6 ou 8. ${cible} finit par ${cible % 10} : il est ${chercherPair ? 'pair' : 'impair'}.`,
    };
  },
});
