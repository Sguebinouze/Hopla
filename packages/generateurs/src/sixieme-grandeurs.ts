// 6e, grandeurs, mesures et proportionnalité. Source : programme de mathématiques du cycle 3 (BO n°16 du 17 avril 2025).
import { decaler, depuisEntier } from './decimaux';
import { choix, creerGenerateur, fr, frDecimal } from './outils';

// ─────────── Conversions de longueurs

export const UNITES_LONGUEUR = ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm'];

export const conversionsLongueurs6e = creerGenerateur({
  id: 'conversions-longueurs-6e',
  competence: 'MA-C3-6E-LONG-01',
  cycle: 3,
  description: 'Convertir des longueurs du kilomètre au millimètre.',
  generer(a, d) {
    const m = UNITES_LONGUEUR.indexOf('m');
    let i: number;
    let j: number;
    if (d === 1) {
      // Vers le mètre ou depuis le mètre, avec les unités usuelles.
      const autre = a.choisir([0, 5, 6, 4]);
      [i, j] = a.suivant() < 0.5 ? [autre, m] : [m, autre];
    } else {
      // Au plus trois rangs d'écart : des conversions réalistes.
      i = a.entier(0, 6);
      do j = a.entier(Math.max(0, i - 3), Math.min(6, i + 3)); while (j === i);
    }
    // Difficulté 3 : vers une unité plus grande, le résultat est souvent décimal.
    if (d === 3 && j > i) [i, j] = [j, i];
    const x = depuisEntier(a.entier(1, 9999), a.entier(0, 2));
    const r = decaler(x, j - i);
    const de = UNITES_LONGUEUR[i]!;
    const vers = UNITES_LONGUEUR[j]!;
    const sens = j > i ? 'plus petite' : 'plus grande';
    return {
      gabarit: 'saisie',
      consigne: `Convertis ${frDecimal(x)} ${de} en ${vers}.`,
      reponse: r,
      indice: `Le ${vers} est une unité ${sens} que le ${de}. Le nombre doit être ${j > i ? 'plus grand' : 'plus petit'}.`,
      explication: `Entre le ${de} et le ${vers}, il y a ${Math.abs(j - i)} rang${Math.abs(j - i) > 1 ? 's' : ''}. On ${j > i ? 'multiplie' : 'divise'} par ${fr(10 ** Math.abs(j - i))}. ${frDecimal(x)} ${de} = ${frDecimal(r)} ${vers}.`,
    };
  },
});

// ─────────── Périmètres : carré, rectangle, disque

export const perimetres6e = creerGenerateur({
  id: 'perimetres-6e',
  competence: 'MA-C3-6E-LONG-02',
  cycle: 3,
  description: 'Calculer le périmètre d’un carré, d’un rectangle et d’un disque.',
  generer(a, d) {
    if (d === 3) {
      const diametre = a.entier(2, 40);
      const parRayon = a.suivant() < 0.5;
      const r = depuisEntier(314 * diametre, 2);
      return {
        gabarit: 'saisie',
        consigne: parRayon
          ? `Calcule le périmètre d’un disque de rayon ${frDecimal(depuisEntier(diametre * 5, 1))} cm. Prends 3,14 pour π. Réponds en cm.`
          : `Calcule le périmètre d’un disque de diamètre ${diametre} cm. Prends 3,14 pour π. Réponds en cm.`,
        reponse: r,
        indice: parRayon ? 'Le diamètre est le double du rayon.' : 'Périmètre du disque = diamètre × π.',
        explication: `${parRayon ? `Le diamètre mesure ${diametre} cm. ` : ''}Périmètre = diamètre × π. ${diametre} × 3,14 = ${frDecimal(r)}. Le périmètre mesure environ ${frDecimal(r)} cm.`,
      };
    }
    if (d === 1) {
      const c = a.entier(2, 50);
      return {
        gabarit: 'saisie',
        consigne: `Calcule le périmètre d’un carré de côté ${c} cm. Réponds en cm.`,
        reponse: String(4 * c),
        indice: 'Un carré a quatre côtés de même longueur.',
        explication: `Périmètre du carré = 4 × côté. 4 × ${c} = ${4 * c}. Le périmètre mesure ${4 * c} cm.`,
      };
    }
    const L = a.entier(5, 60);
    const l = a.entier(2, L - 1);
    return {
      gabarit: 'saisie',
      consigne: `Calcule le périmètre d’un rectangle de longueur ${L} m et de largeur ${l} m. Réponds en m.`,
      reponse: String(2 * (L + l)),
      indice: 'Additionne les longueurs des quatre côtés.',
      explication: `Périmètre du rectangle = 2 × (longueur + largeur). 2 × (${L} + ${l}) = 2 × ${L + l} = ${2 * (L + l)}. Le périmètre mesure ${2 * (L + l)} m.`,
    };
  },
});

// ─────────── Aires : carré, rectangle, conversions m², dm², cm²

const UNITES_AIRE = ['m²', 'dm²', 'cm²'];

export const aires6e = creerGenerateur({
  id: 'aires-6e',
  competence: 'MA-C3-6E-AIRE-01',
  cycle: 3,
  description: 'Calculer l’aire d’un carré ou d’un rectangle ; convertir entre m², dm² et cm².',
  generer(a, d) {
    if (d === 3) {
      const i = a.entier(0, 2);
      let j: number;
      do j = a.entier(0, 2); while (j === i);
      const x = depuisEntier(a.entier(1, 999), a.entier(0, 1));
      const r = decaler(x, 2 * (j - i));
      const de = UNITES_AIRE[i]!;
      const vers = UNITES_AIRE[j]!;
      const facteur = fr(100 ** Math.abs(j - i));
      return {
        gabarit: 'saisie',
        consigne: `Convertis ${frDecimal(x)} ${de} en ${vers}.`,
        reponse: r,
        indice: '1 m² = 100 dm² et 1 dm² = 100 cm².',
        explication: `Pour les aires, on passe d’une unité à la suivante en multipliant ou en divisant par 100. On ${j > i ? 'multiplie' : 'divise'} par ${facteur}. ${frDecimal(x)} ${de} = ${frDecimal(r)} ${vers}.`,
      };
    }
    if (d === 1) {
      const L = a.entier(3, 20);
      const l = a.entier(2, L - 1);
      return {
        gabarit: 'saisie',
        consigne: `Calcule l’aire d’un rectangle de ${L} cm sur ${l} cm. Réponds en cm².`,
        reponse: String(L * l),
        indice: 'Aire du rectangle = longueur × largeur.',
        explication: `${L} × ${l} = ${L * l}. L’aire mesure ${L * l} cm².`,
      };
    }
    const c = a.entier(2, 30);
    return {
      gabarit: 'saisie',
      consigne: `Calcule l’aire d’un carré de côté ${c} m. Réponds en m².`,
      reponse: String(c * c),
      indice: 'Aire du carré = côté × côté.',
      explication: `${c} × ${c} = ${c * c}. L’aire mesure ${c * c} m². Attention : 4 × côté donne le périmètre, pas l’aire.`,
    };
  },
});

// ─────────── Durées et horaires

const ecrireDuree = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
};
const ecrireHoraire = (min: number) => {
  const h = Math.floor(min / 60) % 24;
  const m = min % 60;
  return `${h} h ${String(m).padStart(2, '0')}`;
};

export const durees6e = creerGenerateur({
  id: 'durees-6e',
  competence: 'MA-C3-6E-DUR-01',
  cycle: 3,
  description: 'Convertir des durées, calculer un horaire de fin.',
  generer(a, d) {
    if (d === 1) {
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
    if (d === 2) {
      const total = a.entier(61, 299);
      const h = Math.floor(total / 60);
      const m = total % 60;
      // Piège : lire les minutes comme des centièmes d'heure (150 min ≠ 1 h 50 min).
      const naif = total >= 100 ? `${Math.floor(total / 100)} h ${total % 100} min` : `${h} h ${m + 10} min`;
      return {
        gabarit: 'qcm',
        consigne: `Combien font ${total} minutes en heures et minutes ?`,
        ...choix(a, ecrireDuree(total), [[naif, total >= 100 ? 'minutes-centiemes' : undefined], [ecrireDuree(total + 30)], [ecrireDuree(Math.max(61, total - 40))]], () => ecrireDuree(a.entier(61, 299))),
        reponse: ecrireDuree(total),
        indice: 'Combien de fois 60 dans ce nombre ?',
        explication: `${total} = ${h} × 60 + ${m}. ${total} min = ${ecrireDuree(total)}. Une heure compte 60 minutes, pas 100.`,
      };
    }
    const debut = a.entier(8 * 60, 19 * 60) + 0;
    const debutArrondi = debut - (debut % 5);
    const duree = a.entier(7, 40) * 5;
    const fin = debutArrondi + duree;
    const hD = Math.floor(debutArrondi / 60);
    const mD = debutArrondi % 60;
    const hDuree = Math.floor(duree / 60);
    const mDuree = duree % 60;
    // Piège : additionner heures et minutes sans convertir (14 h 35 + 1 h 50 = 15 h 85).
    const naif = `${hD + hDuree} h ${String(mD + mDuree).padStart(2, '0')}`;
    return {
      gabarit: 'qcm',
      consigne: `Un film commence à ${ecrireHoraire(debutArrondi)}. Il dure ${ecrireDuree(duree)}. À quelle heure finit-il ?`,
      ...choix(a, ecrireHoraire(fin), [[naif, 'minutes-au-dela-de-60'], [ecrireHoraire(fin + 60)], [ecrireHoraire(fin - 10)]], () => ecrireHoraire(fin + 5 * a.entier(1, 20))),
      reponse: ecrireHoraire(fin),
      indice: 'Ajoute d’abord les heures, puis les minutes. 60 minutes font 1 heure.',
      explication: `${ecrireHoraire(debutArrondi)} + ${ecrireDuree(duree)} : ${mD} min + ${mDuree} min = ${mD + mDuree} min${mD + mDuree >= 60 ? `, soit 1 h ${mD + mDuree - 60} min` : ''}. Le film finit à ${ecrireHoraire(fin)}.`,
    };
  },
});

// ─────────── Proportionnalité

const ARTICLES: [string, string, string][] = [
  ['kg de pommes', 'coutent', '€'], ['cahiers', 'coutent', '€'], ['places de cinéma', 'coutent', '€'],
  ['litres d’essence', 'coutent', '€'], ['tours de piste', 'durent', 'min'],
];

export const proportionnalite6e = creerGenerateur({
  id: 'proportionnalite-6e',
  competence: 'MA-C3-6E-PROP-01',
  cycle: 3,
  description: 'Résoudre un problème de proportionnalité : linéarité, retour à l’unité.',
  generer(a, d) {
    const [objet, verbe, unite] = a.choisir(ARTICLES);
    const prix = a.entier(2, 15);
    if (d === 1) {
      const q = a.entier(2, 6);
      const k = a.entier(2, 5);
      return {
        gabarit: 'saisie',
        consigne: `${q} ${objet} ${verbe} ${q * prix} ${unite}. Combien ${verbe} ${q * k} ${objet} ?`,
        reponse: String(q * k * prix),
        indice: `${q * k}, c’est ${k} fois ${q}.`,
        explication: `${q * k} ${objet}, c’est ${k} fois plus que ${q}. Le résultat est donc ${k} fois plus grand : ${k} × ${q * prix} = ${q * k * prix} ${unite}.`,
      };
    }
    if (d === 2) {
      const q1 = a.entier(2, 5);
      const q2 = a.entier(2, 6);
      return {
        gabarit: 'saisie',
        consigne: `${q1} ${objet} ${verbe} ${q1 * prix} ${unite}. ${q2} ${objet} ${verbe} ${q2 * prix} ${unite}. Combien ${verbe} ${q1 + q2} ${objet} ?`,
        reponse: String((q1 + q2) * prix),
        indice: `${q1 + q2} = ${q1} + ${q2}.`,
        explication: `${q1 + q2} ${objet}, c’est ${q1} ${objet} et ${q2} ${objet}. ${q1 * prix} + ${q2 * prix} = ${(q1 + q2) * prix} ${unite}.`,
      };
    }
    const q = a.entier(3, 9);
    let cible = a.entier(2, 12);
    if (cible % q === 0 || cible === q) cible += 1;
    return {
      gabarit: 'saisie',
      consigne: `${q} ${objet} ${verbe} ${q * prix} ${unite}. Combien ${verbe} ${cible} ${objet} ?`,
      reponse: String(cible * prix),
      indice: `Cherche d’abord combien pour 1.`,
      explication: `Pour 1 : ${q * prix} ÷ ${q} = ${prix} ${unite}. Pour ${cible} : ${cible} × ${prix} = ${cible * prix} ${unite}.`,
    };
  },
});
