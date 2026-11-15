// CE2, nombres jusqu'à 10 000. Source : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024), p. 19-20.
import { enLettres } from './lettres';
import { choix, creerGenerateur, fr, qte, type Piege } from './outils';

// ─────────── Unités de numération : milliers, centaines, dizaines, unités

const UNITES = [
  { cle: 'm', valeur: 1000, mot: 'millier' },
  { cle: 'c', valeur: 100, mot: 'centaine' },
  { cle: 'd', valeur: 10, mot: 'dizaine' },
  { cle: 'u', valeur: 1, mot: 'unité' },
] as const;

export const nombresUnitesCe2 = creerGenerateur({
  id: 'nombres-unites-ce2',
  competence: 'MA-C2-CE2-NUM-01',
  cycle: 2,
  description: 'Écrire en chiffres un nombre donné en milliers, centaines, dizaines et unités ; compter les dizaines ou les centaines.',
  generer(a, d) {
    if (d === 3) {
      // « Combien y a-t-il de dizaines en tout dans 4 635 ? » : 463.
      const n = a.entier(1000, 9999);
      const centaines = a.suivant() < 0.5;
      const mot = centaines ? 'centaines' : 'dizaines';
      const r = Math.floor(n / (centaines ? 100 : 10));
      const reste = n % (centaines ? 100 : 10);
      return {
        gabarit: 'saisie',
        consigne: `Combien y a-t-il de ${mot} en tout dans ${fr(n)} ?`,
        reponse: String(r),
        indice: centaines ? '1 millier, c’est 10 centaines.' : '1 centaine, c’est 10 dizaines.',
        explication: `${fr(n)}, c’est ${fr(r)} ${mot} et ${qte(reste, 'unité')}. Il y a ${fr(r)} ${mot} en tout.`,
      };
    }
    const nombres = { m: a.entier(1, 8), c: a.entier(1, 9), d: a.entier(1, 9), u: a.entier(1, 9) };
    // Difficulté 2 : une unité de numération dépasse 9, comme « 32 centaines ».
    if (d === 2) {
      const cle = a.choisir(['c', 'd', 'u'] as const);
      nombres[cle] = a.entier(10, cle === 'c' ? 19 : 39);
    }
    const ordre = d === 2 ? a.melanger(UNITES) : [...UNITES];
    const morceaux = ordre.map((x) => qte(nombres[x.cle], x.mot));
    const valeurs = ordre.map((x) => nombres[x.cle] * x.valeur);
    const total = valeurs.reduce((s, v) => s + v, 0);
    return {
      gabarit: 'saisie',
      consigne: `Écris en chiffres : ${morceaux[0]}, ${morceaux[1]}, ${morceaux[2]} et ${morceaux[3]}.`,
      reponse: String(total),
      indice: '1 millier, c’est 1 000. 1 centaine, c’est 100.',
      explication: `${ordre.map((x, i) => `${morceaux[i]} ${nombres[x.cle] > 1 ? 'font' : 'fait'} ${fr(valeurs[i]!)}`).join('. ')}. Le nombre est ${fr(total)}.`,
    };
  },
});

// ─────────── Écriture en lettres jusqu'à 10 000

export const nombresLettresCe2 = creerGenerateur({
  id: 'nombres-lettres-ce2',
  competence: 'MA-C2-CE2-NUM-02',
  cycle: 2,
  description: 'Passer de l’écriture en chiffres à l’écriture en lettres jusqu’à 10 000, et inversement.',
  generer(a, d) {
    const m = a.entier(1, 9);
    const c = a.entier(0, 9);
    // Difficulté 3 : fin en 70, 80 ou 90, la plus difficile à écrire.
    const dz = d === 3 ? a.entier(7, 9) : a.entier(1, 6);
    const u = a.entier(0, 9);
    const n = m * 1000 + c * 100 + dz * 10 + u;
    const lettres = enLettres(n);
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `Écris en chiffres : ${lettres}.`,
        reponse: String(n),
        indice: 'Cherche d’abord le nombre de milliers.',
        explication: `${lettres} : ${qte(m, 'millier')}, puis ${n % 1000}. Le nombre est ${fr(n)}.`,
      };
    }
    const voisins = ([[m * 1000 + dz * 100 + c * 10 + u, 'centaines-dizaines-inversees'], [c * 1000 + m * 100 + dz * 10 + u, 'milliers-centaines-inverses'], [n + 1000, undefined]] as [number, string | undefined][])
      .filter(([x]) => x >= 1000 && x <= 9999 && x !== n);
    return {
      gabarit: 'qcm',
      consigne: `Comment s’écrit ${fr(n)} en lettres ?`,
      ...choix(a, lettres, voisins.map(([x, code]): Piege => [enLettres(x), code]), () => enLettres(a.entier(1000, 9999))),
      reponse: lettres,
      indice: `Lis d’abord les milliers : ${enLettres(m * 1000)}.`,
      explication: `${fr(n)} s’écrit ${lettres}. Mille ne prend jamais de s.`,
    };
  },
});

// ─────────── Comparer, ranger, intercaler, encadrer

export const nombresComparerCe2 = creerGenerateur({
  id: 'nombres-comparer-ce2',
  competence: 'MA-C2-CE2-NUM-03',
  cycle: 2,
  description: 'Comparer des nombres jusqu’à 10 000, compléter une suite, trouver un nombre compris entre deux autres.',
  generer(a, d) {
    if (d === 2) {
      const pas = a.choisir([1, 10, 100, 1000]);
      const depart = pas === 1000 ? a.entier(1, 5) * 1000 : a.entier(1000, 9000 - 4 * pas);
      const suite = [0, 1, 2].map((k) => depart + k * pas);
      const r = depart + 3 * pas;
      return {
        gabarit: 'saisie',
        consigne: `Complète la suite : ${suite.map(fr).join(', ')}, …`,
        reponse: String(r),
        indice: 'Cherche de combien on avance à chaque fois.',
        explication: `On avance de ${fr(pas)} à chaque fois. ${fr(suite[2]!)} + ${fr(pas)} = ${fr(r)}.`,
      };
    }
    if (d === 3) {
      const pas = a.choisir([10, 100]);
      const bas = a.entier(1000 / pas, 9900 / pas - 1) * pas;
      const haut = bas + pas;
      const juste = bas + a.entier(1, pas - 1);
      const pieges = [bas - a.entier(1, 9), haut + a.entier(1, 9), juste + pas, juste - pas]
        .filter((x) => x >= 1000 && (x <= bas || x >= haut));
      return {
        gabarit: 'qcm',
        consigne: `Quel nombre est compris entre ${fr(bas)} et ${fr(haut)} ?`,
        ...choix(a, fr(juste), pieges.map((x): Piege => [fr(x), 'hors-encadrement']), () => fr(haut + a.entier(1, 99))),
        reponse: fr(juste),
        indice: `Le nombre est plus grand que ${fr(bas)}. Il est plus petit que ${fr(haut)}.`,
        explication: `${fr(bas)} < ${fr(juste)} < ${fr(haut)}. ${fr(juste)} est compris entre les deux.`,
      };
    }
    // Des nombres proches, comme 6 234, 6 243, 6 239 et 6 300.
    const m = a.entier(1, 8);
    const c = a.entier(1, 8);
    const x = a.entier(1, 9);
    const y = a.entier(0, 9);
    const base = m * 1000 + c * 100;
    const candidats = [base + x * 10 + y, base + y * 10 + x, base + 100 + y, base - 1000 + x * 10 + y + 100, base + ((x + 4) % 10) * 10 + y];
    const liste = [...new Set(candidats)].filter((z) => z >= 1000).slice(0, 4);
    while (liste.length < 4) {
      const z = a.entier(1000, 9999);
      if (!liste.includes(z)) liste.push(z);
    }
    const plusGrand = a.suivant() < 0.5;
    const cible = plusGrand ? Math.max(...liste) : Math.min(...liste);
    return {
      gabarit: 'qcm',
      consigne: `Quel est le plus ${plusGrand ? 'grand' : 'petit'} nombre ?`,
      options: a.melanger(liste.map(fr)),
      erreurs: { [fr(plusGrand ? Math.min(...liste) : Math.max(...liste))]: 'plus-grand-plus-petit-confondus' },
      reponse: fr(cible),
      indice: 'Compare d’abord les milliers. Puis compare les centaines.',
      explication: `On range les nombres : ${[...liste].sort((p, q) => p - q).map(fr).join(' < ')}. Le plus ${plusGrand ? 'grand' : 'petit'} est ${fr(cible)}.`,
    };
  },
});
