// CM1, grandeurs et mesures : longueurs, masses, contenances, périmètres, aires, durées.
// Source : programme de mathématiques du cycle 3 (BO n°16 du 17 avril 2025), pages 16 à 18.
// Au cours moyen, les conversions s'appuient sur les relations entre unités (1 m = 100 cm), sans tableau.
import { comparerDecimaux, decaler, depuisEntier } from './decimaux';
import { choix, creerGenerateur, erreursDe, fr, frDecimal, type Aleatoire, type Piege } from './outils';
import type { Difficulte, Generateur } from './types';

// ─────────── Conversions : longueurs, masses, contenances

interface Systeme {
  id: string;
  competence: string;
  description: string;
  /** Symbole et puissance de 10 par rapport à l'unité de base. */
  unites: [string, number][];
  /** Couples usuels (grande unité, petite unité) pour la difficulté 1. */
  usuels: [string, string][];
}

const nbDecimales = (x: string) => x.split(',')[1]?.length ?? 0;

function conversions(s: Systeme): Generateur {
  const exp = new Map(s.unites);
  return creerGenerateur({
    id: s.id,
    competence: s.competence,
    cycle: 3,
    description: s.description,
    generer(a: Aleatoire, d: Difficulte) {
      let de = '';
      let vers = '';
      let x = '';
      let r = '';
      for (let essai = 0; essai < 300; essai++) {
        if (d === 1 || essai === 299) {
          [de, vers] = a.choisir(s.usuels);
          x = String(a.entier(2, 99));
        } else {
          [de] = a.choisir(s.unites);
          const candidats = s.unites.filter(([u, e]) => u !== de && Math.abs(e - exp.get(de)!) <= 3);
          [vers] = a.choisir(candidats);
          x = depuisEntier(a.entier(d === 2 ? 1 : 11, 9999), d === 2 ? 0 : a.entier(1, 2));
          if (d === 3 && nbDecimales(x) === 0) continue;
        }
        r = decaler(x, exp.get(de)! - exp.get(vers)!);
        // Au CM1 : deux chiffres après la virgule au plus, nombres jusqu'à 999 999.
        if (nbDecimales(r) <= 2 && comparerDecimaux(r, '999999') <= 0) break;
      }
      const ecart = Math.abs(exp.get(de)! - exp.get(vers)!);
      const versPetite = exp.get(de)! > exp.get(vers)!;
      const [grande, petite] = versPetite ? [de, vers] : [vers, de];
      const f = fr(10 ** ecart);
      return {
        gabarit: 'saisie',
        consigne: `Convertis ${frDecimal(x)} ${de} en ${vers}.`,
        reponse: r,
        indice: `Cherche combien de ${petite} il y a dans 1 ${grande}.`,
        explication: `1 ${grande} = ${f} ${petite}. ${frDecimal(x)} ${de} = ${frDecimal(x)} ${versPetite ? '×' : '÷'} ${f} ${vers} = ${frDecimal(r)} ${vers}.`,
      };
    },
  });
}

export const longueursCm1 = conversions({
  id: 'longueurs-cm1',
  competence: 'MA-C3-CM1-LONG-01',
  description: 'Convertir des longueurs du millimètre au kilomètre.',
  unites: [['km', 3], ['hm', 2], ['dam', 1], ['m', 0], ['dm', -1], ['cm', -2], ['mm', -3]],
  usuels: [['m', 'cm'], ['km', 'm'], ['m', 'mm'], ['cm', 'mm'], ['m', 'dm']],
});

export const massesCm1 = conversions({
  id: 'masses-cm1',
  competence: 'MA-C3-CM1-MAS-01',
  description: 'Convertir des masses du milligramme au kilogramme, et la tonne.',
  unites: [['t', 6], ['kg', 3], ['hg', 2], ['dag', 1], ['g', 0], ['dg', -1], ['cg', -2], ['mg', -3]],
  usuels: [['kg', 'g'], ['t', 'kg'], ['g', 'mg']],
});

export const contenancesCm1 = conversions({
  id: 'contenances-cm1',
  competence: 'MA-C3-CM1-CONT-01',
  description: 'Convertir des contenances du millilitre à l’hectolitre.',
  unites: [['hL', 2], ['daL', 1], ['L', 0], ['dL', -1], ['cL', -2], ['mL', -3]],
  usuels: [['L', 'cL'], ['L', 'mL'], ['hL', 'L'], ['L', 'dL']],
});

// ─────────── Périmètre d'un polygone

const POLYGONES: [string, number][] = [['triangle', 3], ['quadrilatère', 4], ['pentagone', 5], ['hexagone', 6]];
const liste = (xs: number[]) => `${xs.slice(0, -1).map((x) => `${x} cm`).join(', ')} et ${xs[xs.length - 1]} cm`;

export const perimetreCm1 = creerGenerateur({
  id: 'perimetre-cm1',
  competence: 'MA-C3-CM1-LONG-02',
  cycle: 3,
  description: 'Calculer le périmètre d’un polygone, ou retrouver un côté à partir du périmètre.',
  generer(a, d) {
    if (d === 1) {
      const [nom, n] = a.choisir(POLYGONES);
      const cotes = Array.from({ length: n }, () => a.entier(2, 30));
      const p = cotes.reduce((x, y) => x + y, 0);
      return {
        gabarit: 'saisie',
        consigne: `Les côtés d’un ${nom} mesurent ${liste(cotes)}. Calcule son périmètre. Réponds en cm.`,
        reponse: String(p),
        indice: 'Le périmètre est la longueur du tour de la figure.',
        explication: `On additionne les longueurs des ${n} côtés : ${cotes.join(' + ')} = ${p}. Le périmètre mesure ${p} cm.`,
      };
    }
    if (d === 2) {
      if (a.suivant() < 0.5) {
        const c = a.entier(3, 60);
        return {
          gabarit: 'saisie',
          consigne: `Un carré a des côtés de ${c} cm. Calcule son périmètre. Réponds en cm.`,
          reponse: String(4 * c),
          indice: 'Un carré a quatre côtés de même longueur.',
          explication: `Le tour du carré passe par 4 côtés de ${c} cm. 4 × ${c} = ${4 * c}. Le périmètre mesure ${4 * c} cm.`,
        };
      }
      const L = a.entier(6, 60);
      const l = a.entier(2, L - 1);
      return {
        gabarit: 'saisie',
        consigne: `Un rectangle mesure ${L} cm de long et ${l} cm de large. Calcule son périmètre. Réponds en cm.`,
        reponse: String(2 * (L + l)),
        indice: 'Un rectangle a deux longueurs et deux largeurs.',
        explication: `${L} + ${l} + ${L} + ${l} = ${2 * (L + l)}. Le périmètre mesure ${2 * (L + l)} cm.`,
      };
    }
    if (a.suivant() < 0.3) {
      const c = a.entier(3, 40);
      return {
        gabarit: 'saisie',
        consigne: `Un carré a un périmètre de ${4 * c} cm. Combien mesure un côté ? Réponds en cm.`,
        reponse: String(c),
        indice: 'Le tour du carré passe par 4 côtés de même longueur.',
        explication: `${4 * c} ÷ 4 = ${c}. Chaque côté mesure ${c} cm.`,
      };
    }
    // Triangle : le troisième côté est plus court que la somme des deux autres.
    const x = a.entier(5, 30);
    const y = a.entier(5, 30);
    const z = a.entier(Math.abs(x - y) + 1, x + y - 1);
    const p = x + y + z;
    return {
      gabarit: 'saisie',
      consigne: `Un triangle a un périmètre de ${p} cm. Deux de ses côtés mesurent ${x} cm et ${y} cm. Combien mesure le troisième côté ? Réponds en cm.`,
      reponse: String(z),
      indice: 'Le périmètre est la somme des trois côtés.',
      explication: `Les deux côtés connus mesurent ${x} + ${y} = ${x + y} cm. ${p} − ${x + y} = ${z}. Le troisième côté mesure ${z} cm.`,
    };
  },
});

// ─────────── Aires : pavages en carreaux de 1 cm²

const COMPARER = ['la figure A', 'la figure B', 'les deux ont la même aire'];

export const airesCm1 = creerGenerateur({
  id: 'aires-cm1',
  competence: 'MA-C3-CM1-AIRE-01',
  cycle: 3,
  description: 'Déterminer l’aire d’une figure pavée par des carreaux de 1 cm², et comparer des aires.',
  generer(a, d) {
    if (d === 1) {
      const r = a.entier(2, 9);
      const c = a.entier(2, 12);
      return {
        gabarit: 'saisie',
        consigne: `Un rectangle est pavé par ${r} rangées de ${c} carreaux. Chaque carreau a une aire de 1 cm². Quelle est l’aire du rectangle ? Réponds en cm².`,
        reponse: String(r * c),
        indice: 'Compte les carreaux : combien de rangées, combien de carreaux par rangée ?',
        explication: `${r} rangées de ${c} carreaux : ${r} × ${c} = ${r * c} carreaux. L’aire mesure ${r * c} cm².`,
      };
    }
    if (d === 2) {
      const [r1, c1, r2, c2] = [a.entier(2, 8), a.entier(2, 10), a.entier(2, 8), a.entier(2, 10)];
      const t = r1 * c1 + r2 * c2;
      return {
        gabarit: 'saisie',
        consigne: `Une figure est formée de deux rectangles. Le premier est pavé par ${r1} rangées de ${c1} carreaux. Le second est pavé par ${r2} rangées de ${c2} carreaux. Chaque carreau mesure 1 cm². Quelle est l’aire de la figure ? Réponds en cm².`,
        reponse: String(t),
        indice: 'Calcule l’aire de chaque rectangle, puis ajoute.',
        explication: `Premier rectangle : ${r1} × ${c1} = ${r1 * c1} cm². Second : ${r2} × ${c2} = ${r2 * c2} cm². En tout : ${r1 * c1} + ${r2 * c2} = ${t} cm².`,
      };
    }
    if (a.suivant() < 0.5) {
      const n = a.entier(4, 30);
      const m = 2 * a.entier(1, 6);
      return {
        gabarit: 'saisie',
        consigne: `Une figure est formée de ${n} carreaux entiers et de ${m} demi-carreaux. Un carreau entier mesure 1 cm². Quelle est l’aire de la figure ? Réponds en cm².`,
        reponse: String(n + m / 2),
        indice: 'Deux demi-carreaux forment un carreau entier.',
        explication: `${m} demi-carreaux font ${m / 2} carreau${m / 2 > 1 ? 'x' : ''} entier${m / 2 > 1 ? 's' : ''}. ${n} + ${m / 2} = ${n + m / 2}. L’aire mesure ${n + m / 2} cm².`,
      };
    }
    // Comparer : deux rectangles de formes différentes peuvent avoir la même aire.
    const egales: [number, number, number, number][] = [[4, 6, 3, 8], [2, 12, 4, 6], [3, 10, 5, 6], [2, 9, 3, 6], [4, 9, 6, 6], [2, 10, 4, 5], [3, 8, 2, 12]];
    let [r1, c1, r2, c2] = a.suivant() < 0.35 ? a.choisir(egales) : [a.entier(2, 8), a.entier(3, 10), a.entier(2, 8), a.entier(3, 10)];
    if (a.suivant() < 0.5) [r1, c1, r2, c2] = [r2, c2, r1, c1];
    const [sA, sB] = [r1 * c1, r2 * c2];
    const reponse = sA === sB ? COMPARER[2]! : sA > sB ? COMPARER[0]! : COMPARER[1]!;
    // Erreur typique : juger sur la plus longue rangée au lieu de compter les carreaux.
    const [lA, lB] = [Math.max(r1, c1), Math.max(r2, c2)];
    const naif = lA === lB ? COMPARER[2]! : lA > lB ? COMPARER[0]! : COMPARER[1]!;
    const opts = a.melanger(COMPARER);
    return {
      gabarit: 'qcm',
      consigne: `La figure A est pavée par ${r1} rangées de ${c1} carreaux. La figure B est pavée par ${r2} rangées de ${c2} carreaux. Les carreaux sont identiques. Quelle figure a la plus grande aire ?`,
      options: opts,
      erreurs: erreursDe(opts, reponse, [[naif, 'aire-une-dimension']]),
      reponse,
      indice: 'Compte les carreaux de chaque figure.',
      explication: `Figure A : ${r1} × ${c1} = ${sA} carreaux. Figure B : ${r2} × ${c2} = ${sB} carreaux. ${sA === sB ? 'Les deux figures ont la même aire, même si leurs formes sont différentes.' : `La figure ${sA > sB ? 'A' : 'B'} a la plus grande aire.`}`,
    };
  },
});

// ─────────── Heures et minutes

export const ecrireDuree = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
};
export const ecrireHoraire = (min: number) => `${Math.floor(min / 60) % 24} h ${String(min % 60).padStart(2, '0')}`;

export const dureesCm1 = creerGenerateur({
  id: 'durees-cm1',
  competence: 'MA-C3-CM1-DUR-01',
  cycle: 3,
  description: 'Convertir des durées en heures et minutes, calculer une durée ou un horaire de fin en une ou deux étapes.',
  generer(a, d) {
    if (d === 1) {
      if (a.suivant() < 0.5) {
        const h = a.entier(1, 5);
        const m = a.entier(1, 59);
        return {
          gabarit: 'saisie',
          consigne: `Convertis ${h} h ${m} min en minutes.`,
          reponse: String(60 * h + m),
          indice: '1 h = 60 min.',
          explication: `${h} h = ${h} × 60 min = ${60 * h} min. ${60 * h} + ${m} = ${60 * h + m}. ${h} h ${m} min = ${60 * h + m} min.`,
        };
      }
      const total = a.entier(61, 299);
      const h = Math.floor(total / 60);
      const m = total % 60;
      const pieges: Piege[] = [[ecrireDuree(total + 60), 'heures-mal-comptees'], [ecrireDuree(total - 10)]];
      // Piège : lire les minutes comme des centièmes d'heure (150 min n'est pas 1 h 50 min).
      if (total >= 100 && total % 100 > 0 && total % 100 < 60) pieges.unshift([`${Math.floor(total / 100)} h ${total % 100} min`, 'minutes-centiemes']);
      return {
        gabarit: 'qcm',
        consigne: `Combien font ${total} minutes en heures et minutes ?`,
        ...choix(a, ecrireDuree(total), pieges, () => ecrireDuree(total + 5 * a.entier(1, 12))),
        reponse: ecrireDuree(total),
        indice: 'Combien de fois 60 dans ce nombre ?',
        explication: `${total} = ${h} × 60 + ${m}. ${total} min = ${ecrireDuree(total)}. Une heure compte 60 minutes, pas 100.`,
      };
    }
    const debut = 5 * a.entier(8 * 12, 17 * 12);
    if (d === 2) {
      const duree = 5 * a.entier(4, 34);
      const fin = debut + duree;
      const [hD, mD, hF, mF] = [Math.floor(debut / 60), debut % 60, Math.floor(fin / 60), fin % 60];
      const pieges: Piege[] = [[ecrireDuree(duree + 60), 'heures-mal-comptees'], [ecrireDuree(duree + 10)], [ecrireDuree(duree - 10)]];
      // Piège : soustraire heures et minutes séparément sans passer par l'heure pleine.
      if (mF < mD) pieges.unshift([`${hF - hD} h ${mD - mF} min`, 'soustraction-heures-minutes']);
      return {
        gabarit: 'qcm',
        consigne: `Un film commence à ${ecrireHoraire(debut)} et finit à ${ecrireHoraire(fin)}. Combien de temps dure-t-il ?`,
        ...choix(a, ecrireDuree(duree), pieges, () => ecrireDuree(duree + 5 * a.entier(1, 10))),
        reponse: ecrireDuree(duree),
        indice: 'Avance d’abord jusqu’à l’heure pleine suivante, puis compte le reste.',
        explication:
          mD === 0 || fin <= (hD + 1) * 60
            ? `De ${ecrireHoraire(debut)} à ${ecrireHoraire(fin)}, il s’écoule ${ecrireDuree(duree)}.`
            : `De ${ecrireHoraire(debut)} à ${hD + 1} h, il s’écoule ${60 - mD} min. De ${hD + 1} h à ${ecrireHoraire(fin)}, il s’écoule ${ecrireDuree(fin - (hD + 1) * 60)}. En tout : ${ecrireDuree(duree)}.`,
      };
    }
    const p = a.suivant() < 0.5 ? { nom: a.choisir(['Léo', 'Sami', 'Hugo', 'Tom']), il: 'il' } : { nom: a.choisir(['Lina', 'Nora', 'Jade', 'Rose']), il: 'elle' };
    const marche = 5 * a.entier(1, 6);
    const bus = 5 * a.entier(2, 10);
    const fin = debut + marche + bus;
    return {
      gabarit: 'qcm',
      consigne: `${p.nom} part à ${ecrireHoraire(debut)}. ${p.il === 'il' ? 'Il' : 'Elle'} marche ${marche} min, puis prend le bus pendant ${bus} min. À quelle heure arrive-t-${p.il} ?`,
      ...choix(a, ecrireHoraire(fin), [[ecrireHoraire(fin + 60), 'heures-mal-comptees'], [ecrireHoraire(fin - 10)], [ecrireHoraire(fin + 10)]], () => ecrireHoraire(fin + 5 * a.entier(3, 20))),
      reponse: ecrireHoraire(fin),
      indice: 'Calcule d’abord la durée totale du trajet.',
      explication: `Durée du trajet : ${marche} + ${bus} = ${marche + bus} min. ${ecrireHoraire(debut)} + ${ecrireDuree(marche + bus)} = ${ecrireHoraire(fin)}.`,
    };
  },
});
