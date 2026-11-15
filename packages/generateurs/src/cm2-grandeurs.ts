// CM2, grandeurs et mesures : aires, angles, durées. Source : programme de mathématiques du cycle 3 (BO n°16 du 17 avril 2025).
// Au CM2 : cm², dm², m² ; degré introduit par l'angle droit (sans rapporteur) ; secondes.
import { decaler, depuisEntier } from './decimaux';
import { creerGenerateur, fr, frDecimal, options } from './outils';

// ─────────── Aire du carré et du rectangle

export const airesCm2 = creerGenerateur({
  id: 'aires-cm2',
  competence: 'MA-C3-CM2-AIRE-01',
  cycle: 3,
  description: 'Calculer l’aire d’un carré ou d’un rectangle ; retrouver une dimension connaissant l’aire.',
  generer(a, d) {
    const u = a.choisir(['cm', 'dm', 'm']);
    if (d === 1) {
      const L = a.entier(3, 15);
      const l = a.entier(2, L - 1);
      return {
        gabarit: 'saisie',
        consigne: `Calcule l’aire d’un rectangle de ${L} ${u} de long et ${l} ${u} de large. Réponds en ${u}².`,
        reponse: String(L * l),
        indice: 'Aire du rectangle = longueur × largeur.',
        explication: `${L} × ${l} = ${L * l}. On peut y ranger ${l} rangées de ${L} carrés de 1 ${u}². L’aire mesure ${L * l} ${u}².`,
      };
    }
    if (d === 2) {
      if (a.suivant() < 0.5) {
        const c = a.entier(2, 25);
        return {
          gabarit: 'saisie',
          consigne: `Calcule l’aire d’un carré de ${c} ${u} de côté. Réponds en ${u}².`,
          reponse: String(c * c),
          indice: 'Aire du carré = côté × côté.',
          explication: `${c} × ${c} = ${c * c}. L’aire mesure ${c * c} ${u}². Attention : 4 × ${c} donne le périmètre, pas l’aire.`,
        };
      }
      const L = a.entier(11, 40);
      const l = a.entier(3, 12);
      return {
        gabarit: 'saisie',
        consigne: `Calcule l’aire d’un rectangle de ${L} ${u} de long et ${l} ${u} de large. Réponds en ${u}².`,
        reponse: String(L * l),
        indice: 'Aire du rectangle = longueur × largeur.',
        explication: `${L} × ${l} = ${L * l}. L’aire mesure ${L * l} ${u}².`,
      };
    }
    if (a.suivant() < 0.3) {
      const c = a.entier(2, 12);
      return {
        gabarit: 'saisie',
        consigne: `Un carré a une aire de ${c * c} ${u}². Quelle est la longueur de son côté ? Réponds en ${u}.`,
        reponse: String(c),
        indice: `Cherche le nombre qui, multiplié par lui-même, donne ${c * c}.`,
        explication: `${c} × ${c} = ${c * c}. Le côté mesure ${c} ${u}.`,
      };
    }
    const l = a.entier(2, 12);
    const L = a.entier(l + 1, 25);
    return {
      gabarit: 'saisie',
      consigne: `Un rectangle a une aire de ${L * l} ${u}². Sa largeur mesure ${l} ${u}. Quelle est sa longueur ? Réponds en ${u}.`,
      reponse: String(L),
      indice: `Longueur × ${l} = ${L * l}. Cherche le facteur manquant.`,
      explication: `${L * l} ÷ ${l} = ${L}. Vérification : ${L} × ${l} = ${L * l}. La longueur mesure ${L} ${u}.`,
    };
  },
});

// ─────────── Convertir des aires : cm², dm², m²

const UNITES_AIRE = ['m²', 'dm²', 'cm²'];

export const convertirAiresCm2 = creerGenerateur({
  id: 'convertir-aires-cm2',
  competence: 'MA-C3-CM2-AIRE-02',
  cycle: 3,
  description: 'Convertir des aires entre centimètre carré, décimètre carré et mètre carré.',
  generer(a, d) {
    let i: number;
    let j: number;
    let x: string;
    if (d === 1) {
      // Vers l'unité juste plus petite, nombre entier.
      i = a.entier(0, 1);
      j = i + 1;
      x = String(a.entier(2, 99));
    } else if (d === 2) {
      // Vers une unité plus grande, ou du m² au cm².
      if (a.suivant() < 0.3) {
        [i, j] = [0, 2];
        x = String(a.entier(2, 30));
      } else {
        i = a.entier(1, 2);
        j = i - 1;
        x = String(a.entier(2, 99) * 10 + a.choisir([0, a.entier(1, 9)]));
      }
    } else {
      i = a.entier(0, 2);
      do j = a.entier(0, 2); while (j === i);
      // Résultat limité aux millièmes, comme les décimaux du CM2.
      if (j > i) x = depuisEntier(a.entier(11, 9999), a.entier(1, 2));
      else if (i - j === 1) x = depuisEntier(a.entier(11, 9999), a.entier(0, 1));
      else x = String(10 * a.entier(10, 9999));
    }
    const r = decaler(x, 2 * (j - i));
    const facteur = fr(100 ** Math.abs(j - i));
    const de = UNITES_AIRE[i]!;
    const vers = UNITES_AIRE[j]!;
    return {
      gabarit: 'saisie',
      consigne: `Convertis ${frDecimal(x)} ${de} en ${vers}.`,
      reponse: r,
      indice: '1 m² = 100 dm² et 1 dm² = 100 cm².',
      explication: `Le ${vers} est une unité plus ${j > i ? 'petite' : 'grande'} que le ${de}. On ${j > i ? 'multiplie' : 'divise'} par ${facteur}. ${frDecimal(x)} ${de} = ${frDecimal(r)} ${vers}.`,
    };
  },
});

// ─────────── Angles : aigu, droit, obtus ; mesures à partir de l'angle droit

export const anglesCm2 = creerGenerateur({
  id: 'angles-cm2',
  competence: 'MA-C3-CM2-ANG-01',
  cycle: 3,
  description: 'Reconnaitre un angle aigu, droit ou obtus ; calculer avec des angles à partir de l’angle droit (90°).',
  generer(a, d) {
    if (d === 1) {
      const m = a.suivant() < 0.15 ? 90 : 5 * a.entier(2, 34);
      const nature = m < 90 ? 'aigu' : m === 90 ? 'droit' : 'obtus';
      return {
        gabarit: 'qcm',
        consigne: `Un angle mesure ${m}°. Comment s’appelle cet angle ?`,
        options: a.melanger(['aigu', 'droit', 'obtus']),
        reponse: nature,
        indice: 'Un angle droit mesure 90°. Compare la mesure à 90°.',
        explication: `${m}° ${m < 90 ? '<' : m === 90 ? '=' : '>'} 90°. ${nature === 'aigu' ? 'Un angle plus petit qu’un angle droit est aigu.' : nature === 'droit' ? 'C’est un angle droit.' : 'Un angle plus grand qu’un angle droit est obtus.'}`,
      };
    }
    if (d === 2) {
      const forme = a.entier(0, 2);
      if (forme === 0) {
        const [nom, k] = a.choisir([['la moitié', 2], ['le tiers', 3]] as const);
        const r = 90 / k;
        return {
          gabarit: 'saisie',
          consigne: `Combien mesure ${nom} d’un angle droit ? Réponds en degrés.`,
          reponse: String(r),
          indice: 'Un angle droit mesure 90°.',
          explication: `90 ÷ ${k} = ${r}. ${nom[0]!.toUpperCase()}${nom.slice(1)} d’un angle droit mesure ${r}°.`,
        };
      }
      if (forme === 1) {
        const k = a.entier(2, 4);
        const m = 5 * a.entier(2, Math.floor(175 / (5 * k)));
        return {
          gabarit: 'saisie',
          consigne: `Un angle mesure ${m}°. Combien mesure un angle ${k} fois plus grand ? Réponds en degrés.`,
          reponse: String(m * k),
          indice: '« Fois plus grand » : on multiplie la mesure.',
          explication: `${m} × ${k} = ${m * k}. L’angle mesure ${m * k}°.`,
        };
      }
      const m = 10 * a.entier(2, 17);
      return {
        gabarit: 'saisie',
        consigne: `On plie un angle de ${m}° en deux parties égales. Combien mesure chaque partie ? Réponds en degrés.`,
        reponse: String(m / 2),
        indice: 'Plier un angle en deux, c’est en prendre la moitié.',
        explication: `${m} ÷ 2 = ${m / 2}. Chaque partie mesure ${m / 2}°.`,
      };
    }
    if (a.suivant() < 0.5) {
      const x = 5 * a.entier(2, 30);
      const y = 5 * a.entier(2, Math.floor((175 - x) / 5));
      return {
        gabarit: 'saisie',
        consigne: `On accole un angle de ${x}° et un angle de ${y}°. Combien mesure l’angle obtenu ? Réponds en degrés.`,
        reponse: String(x + y),
        indice: 'Accoler deux angles, c’est ajouter leurs mesures.',
        explication: `${x} + ${y} = ${x + y}. L’angle obtenu mesure ${x + y}°.`,
      };
    }
    const x = 5 * a.entier(1, 17);
    return {
      gabarit: 'saisie',
      consigne: `Quel angle faut-il accoler à un angle de ${x}° pour obtenir un angle droit ? Réponds en degrés.`,
      reponse: String(90 - x),
      indice: 'Un angle droit mesure 90°.',
      explication: `90 − ${x} = ${90 - x}. Il faut un angle de ${90 - x}°.`,
    };
  },
});

// ─────────── Durées : heures, minutes, secondes

const ecrireDuree = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor(s / 60) % 60;
  const sec = s % 60;
  return [h ? `${h} h` : '', m ? `${m} min` : '', sec || (!h && !m) ? `${sec} s` : ''].filter(Boolean).join(' ');
};
const ecrireInstant = (s: number) => `${Math.floor(s / 3600)} h ${String(Math.floor(s / 60) % 60).padStart(2, '0')} min ${String(s % 60).padStart(2, '0')} s`;

export const dureesCm2 = creerGenerateur({
  id: 'durees-cm2',
  competence: 'MA-C3-CM2-DUR-01',
  cycle: 3,
  description: 'Convertir des durées en heures, minutes et secondes ; calculer une durée écoulée.',
  generer(a, d) {
    if (d === 1) {
      const m = a.entier(1, 9);
      const s = a.entier(1, 59);
      return {
        gabarit: 'saisie',
        consigne: `Convertis ${m} min ${s} s en secondes.`,
        reponse: String(60 * m + s),
        indice: '1 min = 60 s.',
        explication: `${m} min = ${m} × 60 s = ${60 * m} s. ${60 * m} + ${s} = ${60 * m + s}. ${m} min ${s} s = ${60 * m + s} s.`,
      };
    }
    if (d === 2) {
      const total = a.entier(61, 599);
      const m = Math.floor(total / 60);
      const s = total % 60;
      // Piège : lire les secondes comme des centièmes (150 s ≠ 1 min 50 s).
      const naif = total >= 100 ? `${Math.floor(total / 100)} min ${total % 100} s` : `${m} min ${s + 10} s`;
      return {
        gabarit: 'qcm',
        consigne: `Combien font ${total} secondes en minutes et secondes ?`,
        options: options(a, ecrireDuree(total), [naif, ecrireDuree(total + 60), ecrireDuree(total - 30)], () => ecrireDuree(a.entier(61, 599))),
        reponse: ecrireDuree(total),
        indice: 'Combien de fois 60 dans ce nombre ?',
        explication: `${total} = ${m} × 60 + ${s}. ${total} s = ${ecrireDuree(total)}. Une minute compte 60 secondes, pas 100.`,
      };
    }
    const debut = a.entier(8 * 3600, 17 * 3600);
    const duree = a.entier(90, 3000);
    const fin = debut + duree;
    // Piège : soustraire chiffre à chiffre sans retenue de 60 (en comptant 100 secondes par minute).
    const [hD, mD, sD] = [Math.floor(debut / 3600), Math.floor(debut / 60) % 60, debut % 60];
    const [hF, mF, sF] = [Math.floor(fin / 3600), Math.floor(fin / 60) % 60, fin % 60];
    const naifS = sF >= sD ? sF - sD : sF + 100 - sD;
    const naifM = (hF - hD) * 60 + mF - mD - (sF >= sD ? 0 : 1);
    // Étapes de la correction : jusqu'à la minute ronde, puis jusqu'à la minute de l'arrivée.
    const rond1 = Math.ceil(debut / 60) * 60;
    const rond2 = fin - sF;
    const naif = naifS < 60 && naifS >= 0 && naifM >= 0 ? ecrireDuree(naifM * 60 + naifS) : ecrireDuree(duree + 40);
    return {
      gabarit: 'qcm',
      consigne: `Une course commence à ${ecrireInstant(debut)} et se termine à ${ecrireInstant(fin)}. Combien de temps a-t-elle duré ?`,
      options: options(a, ecrireDuree(duree), [naif, ecrireDuree(duree + 60), ecrireDuree(duree - 10)], () => ecrireDuree(duree + 5 * a.entier(1, 30))),
      reponse: ecrireDuree(duree),
      indice: 'Avance de l’heure de départ jusqu’à la minute ronde suivante, puis jusqu’à l’heure d’arrivée.',
      explication: `${ecrireInstant(debut)} → ${ecrireInstant(rond1)} : ${ecrireDuree(rond1 - debut)}. ${ecrireInstant(rond1)} → ${ecrireInstant(rond2)} : ${ecrireDuree(rond2 - rond1)}. ${ecrireInstant(rond2)} → ${ecrireInstant(fin)} : ${ecrireDuree(fin - rond2)}. En tout : ${ecrireDuree(duree)}.`,
    };
  },
});
