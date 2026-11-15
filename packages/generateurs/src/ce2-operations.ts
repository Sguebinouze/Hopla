// CE2, les quatre opérations (nombres jusqu'à 10 000).
// Source : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024), p. 21.
import { creerGenerateur, fr } from './outils';

// ─────────── Additions et soustractions posées, somme et différence

export const operationsPoseesCe2 = creerGenerateur({
  id: 'operations-posees-ce2',
  competence: 'MA-C2-CE2-OPE-01',
  cycle: 2,
  description: 'Additions et soustractions posées jusqu’à 10 000 ; mots « somme » et « différence ».',
  generer(a, d) {
    if (d === 3) {
      const x = a.entier(1000, 8999);
      const y = a.entier(100, 9999 - x);
      const somme = a.suivant() < 0.5;
      if (somme) {
        return {
          gabarit: 'saisie',
          consigne: `Quelle est la somme de ${fr(x)} et de ${fr(y)} ?`,
          reponse: String(x + y),
          indice: 'La somme est le résultat d’une addition.',
          explication: `La somme, c’est le résultat de l’addition. ${fr(x)} + ${fr(y)} = ${fr(x + y)}.`,
        };
      }
      const grand = x + y;
      return {
        gabarit: 'saisie',
        consigne: `Quelle est la différence entre ${fr(grand)} et ${fr(y)} ?`,
        reponse: String(x),
        indice: 'La différence est le résultat d’une soustraction.',
        explication: `La différence, c’est le résultat de la soustraction. ${fr(grand)} − ${fr(y)} = ${fr(x)}.`,
      };
    }
    if (d === 1) {
      const x = a.entier(1000, 7999);
      const y = a.entier(100, Math.min(9999 - x, 4999));
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${fr(x)} + ${fr(y)}`,
        reponse: String(x + y),
        indice: 'Pose l’addition. Aligne les unités sous les unités.',
        explication: `Commence par les unités. N’oublie pas les retenues. ${fr(x)} + ${fr(y)} = ${fr(x + y)}.`,
      };
    }
    // Soustraction, parfois avec des zéros comme 5 000 − 1 237.
    const grand = a.suivant() < 0.3 ? a.entier(2, 9) * 1000 : a.entier(2000, 9999);
    const petit = a.entier(100, grand - 100);
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${fr(grand)} − ${fr(petit)}`,
      reponse: String(grand - petit),
      indice: 'Pose la soustraction. Aligne les unités sous les unités.',
      explication: `Commence par les unités. N’oublie pas les retenues. ${fr(grand)} − ${fr(petit)} = ${fr(grand - petit)}.`,
    };
  },
});

// ─────────── Multiplication posée : nombre à 2 ou 3 chiffres par un nombre à 1 ou 2 chiffres

export const multiplicationPoseeCe2 = creerGenerateur({
  id: 'multiplication-posee-ce2',
  competence: 'MA-C2-CE2-OPE-02',
  cycle: 2,
  description: 'Multiplier un nombre à deux ou trois chiffres par un nombre à un ou deux chiffres ; mot « produit ».',
  generer(a, d) {
    if (d === 3) {
      // 548 × 16 = 548 × 6 + 548 × 10.
      const petit = a.entier(11, 39);
      const grand = a.entier(100, Math.floor(9999 / petit));
      const u = petit % 10;
      const dz = petit - u;
      const etapeU = u === 0 ? '' : `${grand} × ${u} = ${fr(grand * u)}. `;
      return {
        gabarit: 'saisie',
        consigne: `Calcule : ${grand} × ${petit}`,
        reponse: String(grand * petit),
        indice: `Pose la multiplication. Mets ${petit} sur la deuxième ligne.`,
        explication: `${etapeU}${grand} × ${dz} = ${fr(grand * dz)}. ${u === 0 ? `Le produit est ${fr(grand * petit)}.` : `${fr(grand * u)} + ${fr(grand * dz)} = ${fr(grand * petit)}.`}`,
      };
    }
    const petit = a.entier(2, 9);
    const grand = d === 1 ? a.entier(12, 99) : a.entier(100, Math.min(999, Math.floor(9999 / petit)));
    if (d === 1 && a.suivant() < 0.4) {
      return {
        gabarit: 'saisie',
        consigne: `Quel est le produit de ${petit} et de ${grand} ?`,
        reponse: String(petit * grand),
        indice: 'Le produit est le résultat d’une multiplication.',
        explication: `Le produit, c’est le résultat de la multiplication. ${petit} × ${grand} = ${fr(petit * grand)}.`,
      };
    }
    const c = Math.floor(grand / 100);
    const reste = grand % 100;
    const morceaux = c > 0 ? [c * 100, reste] : [grand - (grand % 10), grand % 10];
    const utiles = morceaux.filter((m) => m > 0);
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${grand} × ${petit}`,
      reponse: String(grand * petit),
      indice: 'Pose la multiplication. Commence par les unités.',
      explication: `${utiles.map((m) => `${m} × ${petit} = ${fr(m * petit)}`).join('. ')}. ${utiles.length > 1 ? `${utiles.map((m) => fr(m * petit)).join(' + ')} = ${fr(grand * petit)}.` : `Le produit est ${fr(grand * petit)}.`}`,
    };
  },
});

// ─────────── Division : opération inverse de la multiplication

export const divisionCe2 = creerGenerateur({
  id: 'division-ce2',
  competence: 'MA-C2-CE2-OPE-03',
  cycle: 2,
  description: 'Calculer un quotient à l’aide des tables et de la multiplication ; utiliser le symbole ÷.',
  generer(a, d) {
    if (d === 2) {
      // On a 7 × 13 = 91, donc 91 ÷ 7 = 13 et 91 ÷ 13 = 7.
      const x = a.entier(2, 9);
      const y = a.entier(11, 19);
      const p = x * y;
      const parX = a.suivant() < 0.5;
      const diviseur = parX ? x : y;
      const r = parX ? y : x;
      return {
        gabarit: 'saisie',
        consigne: `On sait que ${x} × ${y} = ${p}. Calcule ${p} ÷ ${diviseur}.`,
        reponse: String(r),
        indice: 'La division est l’opération inverse de la multiplication.',
        explication: `${x} × ${y} = ${p}. Donc ${p} ÷ ${diviseur} = ${r}.`,
      };
    }
    const diviseur = a.entier(2, 9);
    const q = d === 1 ? a.entier(2, 10) : a.entier(11, 15);
    const p = diviseur * q;
    return {
      gabarit: 'saisie',
      consigne: `Calcule : ${p} ÷ ${diviseur}`,
      reponse: String(q),
      indice: `Cherche combien de fois ${diviseur} dans ${p}.`,
      explication: `${diviseur} × ${q} = ${p}. Donc ${p} ÷ ${diviseur} = ${q}.`,
    };
  },
});
