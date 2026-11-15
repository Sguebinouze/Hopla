// CE2, résolution de problèmes. Nombres entiers jusqu'à 10 000 ; champ réduit pour les structures difficiles.
// Source : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024), p. 24-25.
import { creerGenerateur, fr } from './outils';

// Prénoms commençant par une consonne : « que Lucie », « de Tom », sans élision.
const PRENOMS_F = ['Lucie', 'Nora', 'Jade', 'Lina', 'Rose', 'Léa', 'Maya', 'Sarah'];
const PRENOMS_G = ['Léo', 'Sami', 'Hugo', 'Malo', 'Noé', 'Tom', 'Paul', 'Jérôme'];

// ─────────── Problèmes additifs en une étape (parties-tout, transformation, comparaison)

export const problemesAdditifsCe2 = creerGenerateur({
  id: 'problemes-additifs-ce2',
  competence: 'MA-C2-CE2-PB-01',
  cycle: 2,
  description: 'Problèmes additifs en une étape avec des nombres supérieurs à 1 000 : parties-tout, transformation, comparaison.',
  generer(a, d) {
    const indice = 'Raconte l’histoire avec tes mots. Fais un schéma en barres.';
    if (d === 1) {
      // Ordres de grandeur vraisemblables pour chaque énoncé.
      const forme = a.entier(0, 2);
      if (forme === 0) {
        // Les arrivées restent nettement inférieures à la population.
        const habitants = a.entier(2000, 8000);
        const arrivees = a.entier(100, Math.floor(habitants / 5));
        const total = habitants + arrivees;
        return {
          gabarit: 'saisie',
          consigne: `Une ville a ${fr(habitants)} habitants. ${fr(arrivees)} nouveaux habitants arrivent. Combien d’habitants y a-t-il maintenant ?`,
          reponse: String(total),
          indice,
          explication: `Le nombre d’habitants augmente. ${fr(habitants)} + ${fr(arrivees)} = ${fr(total)}. La ville a ${fr(total)} habitants.`,
        };
      }
      const total = a.entier(2000, 9000);
      // Une partie entre le quart et les trois quarts du tout.
      const part = a.entier(Math.floor(total / 4), Math.floor((3 * total) / 4));
      const reste = total - part;
      if (forme === 1) {
        return {
          gabarit: 'saisie',
          consigne: `Un club a ${fr(total)} timbres. ${fr(part)} timbres viennent de France. Combien de timbres viennent d’autres pays ?`,
          reponse: String(reste),
          indice,
          explication: `Le tout fait ${fr(total)}. Une partie fait ${fr(part)}. ${fr(total)} − ${fr(part)} = ${fr(reste)}.`,
        };
      }
      return {
        gabarit: 'saisie',
        consigne: `Un camion transporte ${fr(total)} kg de sable. Il en livre ${fr(part)} kg. Combien de kilos restent dans le camion ?`,
        reponse: String(reste),
        indice,
        explication: `La masse de sable diminue. ${fr(total)} − ${fr(part)} = ${fr(reste)}. Il reste ${fr(reste)} kg.`,
      };
    }
    const petit = a.entier(1000, 6000);
    // L'écart reste plus petit que la plus petite quantité.
    const ecart = a.entier(100, Math.min(3999, petit - 100));
    const grand = petit + ecart;
    const fille = a.choisir(PRENOMS_F);
    const garcon = a.choisir(PRENOMS_G);
    const forme = d === 2 ? a.entier(0, 1) : a.entier(2, 3);
    if (forme === 0) {
      return {
        gabarit: 'saisie',
        consigne: `${garcon} a ${fr(petit)} points. ${fille} a ${fr(ecart)} points de plus que ${garcon}. Combien de points a ${fille} ?`,
        reponse: String(grand),
        indice,
        explication: `${fille} a plus de points que ${garcon}. ${fr(petit)} + ${fr(ecart)} = ${fr(grand)}. ${fille} a ${fr(grand)} points.`,
      };
    }
    if (forme === 1) {
      return {
        gabarit: 'saisie',
        consigne: `Un magasin vend ${fr(grand)} livres et ${fr(petit)} jeux. Combien de livres de plus que de jeux vend-il ?`,
        reponse: String(ecart),
        indice: 'Cherche l’écart entre les deux nombres.',
        explication: `On cherche l’écart. ${fr(grand)} − ${fr(petit)} = ${fr(ecart)}. Il vend ${fr(ecart)} livres de plus.`,
      };
    }
    if (forme === 2) {
      // Le mot « plus » apparait, mais il faut soustraire.
      return {
        gabarit: 'saisie',
        consigne: `${fille} a ${fr(grand)} points. Elle a ${fr(ecart)} points de plus que ${garcon}. Combien de points a ${garcon} ?`,
        reponse: String(petit),
        indice: `Attention : c’est ${fille} qui a le plus de points.`,
        explication: `${garcon} a moins de points que ${fille}. ${fr(grand)} − ${fr(ecart)} = ${fr(petit)}. ${garcon} a ${fr(petit)} points.`,
      };
    }
    return {
      gabarit: 'saisie',
      consigne: `${garcon} a ${fr(petit)} points. Il a ${fr(ecart)} points de moins que ${fille}. Combien de points a ${fille} ?`,
      reponse: String(grand),
      indice: `Attention : c’est ${fille} qui a le plus de points.`,
      explication: `${fille} a plus de points que ${garcon}. ${fr(petit)} + ${fr(ecart)} = ${fr(grand)}. ${fille} a ${fr(grand)} points.`,
    };
  },
});

// ─────────── Problèmes en deux étapes : additifs, comparaison puis tout, mixtes

export const problemesDeuxEtapesCe2 = creerGenerateur({
  id: 'problemes-deux-etapes-ce2',
  competence: 'MA-C2-CE2-PB-02',
  cycle: 2,
  description: 'Problèmes en deux étapes : additifs, comparaison puis recherche du tout, mixtes avec une multiplication.',
  generer(a, d) {
    if (d === 1) {
      const x = a.entier(200, 2000);
      const y = a.entier(20, 500);
      const z = a.entier(50, Math.floor((x + y) / 2));
      const r = x + y - z;
      return {
        gabarit: 'saisie',
        consigne: `La médiathèque a ${fr(x)} livres. Elle en achète ${y}. Elle en donne ${fr(z)}. Combien de livres a-t-elle maintenant ?`,
        reponse: String(r),
        indice: 'Fais le calcul en deux étapes.',
        explication: `D’abord : ${fr(x)} + ${y} = ${fr(x + y)}. Ensuite : ${fr(x + y)} − ${fr(z)} = ${fr(r)}. Elle a ${fr(r)} livres.`,
      };
    }
    if (d === 2) {
      // Léo a 188 billes. Lucie en a 75 de plus. Combien en tout ?
      const garcon = a.choisir(PRENOMS_G);
      const fille = a.choisir(PRENOMS_F);
      const x = a.entier(100, 900);
      const plus = a.suivant() < 0.6;
      const y = a.entier(20, plus ? 300 : Math.min(300, x - 20));
      const autre = plus ? x + y : x - y;
      return {
        gabarit: 'saisie',
        consigne: `${garcon} a ${x} billes. ${fille} en a ${y} de ${plus ? 'plus' : 'moins'} que ${garcon}. Combien les deux enfants ont-ils de billes en tout ?`,
        reponse: String(x + autre),
        indice: `Cherche d’abord le nombre de billes de ${fille}.`,
        explication: `D’abord : ${x} ${plus ? '+' : '−'} ${y} = ${autre}. ${fille} a ${autre} billes. Ensuite : ${x} + ${autre} = ${fr(x + autre)}.`,
      };
    }
    const forme = a.entier(0, 2);
    if (forme === 0) {
      // Abi achète 7 litres d'huile à 2 € le litre. Elle donne 20 €.
      const qui = a.choisir(PRENOMS_F);
      const litres = a.entier(2, 9);
      const prix = a.entier(2, 9);
      const cout = litres * prix;
      const billet = [20, 50, 100].find((b) => b > cout)!;
      return {
        gabarit: 'saisie',
        consigne: `${qui} achète ${litres} litres d’huile à ${prix} € le litre. Elle donne ${billet} €. Combien lui rend-on ?`,
        reponse: String(billet - cout),
        indice: 'Cherche d’abord le prix de l’huile.',
        explication: `D’abord : ${litres} × ${prix} = ${cout}. L’huile coute ${cout} €. Ensuite : ${billet} − ${cout} = ${billet - cout}.`,
      };
    }
    if (forme === 1) {
      // Un restaurant a 4 tables de 6 places et 7 tables de 4 places.
      const t1 = a.entier(2, 9);
      const p1 = a.entier(4, 8);
      const t2 = a.entier(2, 9);
      const p2 = a.choisir([2, 4, 6, 8, 10].filter((p) => p !== p1));
      return {
        gabarit: 'saisie',
        consigne: `Un restaurant a ${t1} tables de ${p1} places. Il a aussi ${t2} tables de ${p2} places. Combien de clients peut-il recevoir ?`,
        reponse: String(t1 * p1 + t2 * p2),
        indice: 'Compte les places de chaque sorte de table.',
        explication: `${t1} × ${p1} = ${t1 * p1}. ${t2} × ${p2} = ${t2 * p2}. ${t1 * p1} + ${t2 * p2} = ${t1 * p1 + t2 * p2}.`,
      };
    }
    // Un cahier coute 4 € et un protège-cahier 2 €. 20 cahiers et autant de protège-cahiers.
    const qui = a.choisir(PRENOMS_G);
    const cahier = a.entier(2, 6);
    const protege = a.entier(1, 3);
    const n = a.entier(4, 30);
    return {
      gabarit: 'saisie',
      consigne: `Un cahier coute ${cahier} € et un protège-cahier ${protege} €. ${qui} achète ${n} cahiers et autant de protège-cahiers. Combien paie-t-il ?`,
      reponse: String(n * (cahier + protege)),
      indice: 'Cherche d’abord le prix d’un cahier avec son protège-cahier.',
      explication: `D’abord : ${cahier} + ${protege} = ${cahier + protege}. Ensuite : ${n} × ${cahier + protege} = ${n * (cahier + protege)}. Il paie ${n * (cahier + protege)} €.`,
    };
  },
});

// ─────────── Problèmes multiplicatifs en une étape, produits cartésiens

export const problemesMultiplicatifsCe2 = creerGenerateur({
  id: 'problemes-multiplicatifs-ce2',
  competence: 'MA-C2-CE2-PB-03',
  cycle: 2,
  description: 'Problèmes multiplicatifs : valeur du tout, valeur d’une part, nombre de parts, produits cartésiens.',
  generer(a, d) {
    if (d === 1) {
      // Valeur du tout : champ numérique étendu.
      const parBoite = a.entier(12, 99);
      const boites = a.entier(3, 9);
      return {
        gabarit: 'saisie',
        consigne: `Une boite contient ${parBoite} crayons. Combien de crayons y a-t-il dans ${boites} boites ?`,
        reponse: String(parBoite * boites),
        indice: `${boites} boites de ${parBoite} : c’est ${boites} fois ${parBoite}.`,
        explication: `${boites} fois ${parBoite} crayons. ${boites} × ${parBoite} = ${fr(parBoite * boites)}. Il y a ${fr(parBoite * boites)} crayons.`,
      };
    }
    if (d === 2) {
      // Valeur d'une part : 6 dictionnaires pour 72 €.
      const n = a.entier(2, 9);
      const prix = a.entier(6, 12);
      const total = n * prix;
      return {
        gabarit: 'saisie',
        consigne: `La maitresse achète ${n} dictionnaires. Elle paie ${total} €. Quel est le prix d’un dictionnaire ?`,
        reponse: String(prix),
        indice: 'Fais un schéma en barres partagé en parts égales.',
        explication: `On partage ${total} € en ${n} parts égales. ${n} × ${prix} = ${total}. Un dictionnaire coute ${prix} €.`,
      };
    }
    if (a.suivant() < 0.5) {
      // Nombre de parts : champ réduit.
      const parBoite = a.choisir([4, 6, 8, 10]);
      const boites = a.entier(2, 9);
      const oeufs = parBoite * boites;
      return {
        gabarit: 'saisie',
        consigne: `On range ${oeufs} œufs par boites de ${parBoite}. Combien de boites faut-il ?`,
        reponse: String(boites),
        indice: `Fais des paquets de ${parBoite}. Compte les paquets.`,
        explication: `On cherche combien de fois ${parBoite} dans ${oeufs}. ${boites} × ${parBoite} = ${oeufs}. Il faut ${boites} boites.`,
      };
    }
    // Produit cartésien : 3 pantalons et 7 pulls.
    const pantalons = a.entier(2, 5);
    const pulls = a.entier(2, 9);
    return {
      gabarit: 'saisie',
      consigne: `Une poupée a ${pantalons} pantalons et ${pulls} pulls. De combien de façons peut-on l’habiller ?`,
      reponse: String(pantalons * pulls),
      indice: 'Fais un tableau : les pantalons en lignes, les pulls en colonnes.',
      explication: `Chaque pantalon va avec ${pulls} pulls. ${pantalons} × ${pulls} = ${pantalons * pulls}. Il y a ${pantalons * pulls} façons.`,
    };
  },
});

// ─────────── Comparaison multiplicative : « fois plus », « fois moins »

export const problemesFoisPlusCe2 = creerGenerateur({
  id: 'problemes-fois-plus-ce2',
  competence: 'MA-C2-CE2-PB-04',
  cycle: 2,
  description: 'Problèmes de comparaison multiplicative en une étape ; distinguer « fois plus » et « de plus ».',
  generer(a, d) {
    const k = a.entier(2, d === 1 ? 6 : 9);
    // Un casque coute de 10 à 60 € : la trottinette reste sous 400 €.
    const petit = a.entier(d === 1 ? 10 : 3, d === 1 ? 60 : 30);
    if (d === 1) {
      return {
        gabarit: 'saisie',
        consigne: `Le casque coute ${petit} €. La trottinette coute ${k} fois plus cher. Combien coute la trottinette ?`,
        reponse: String(k * petit),
        indice: `« ${k} fois plus », c’est une multiplication par ${k}.`,
        explication: `La trottinette coute ${k} fois le prix du casque. ${k} × ${petit} = ${k * petit}. Elle coute ${k * petit} €.`,
      };
    }
    const fille = a.choisir(PRENOMS_F);
    const garcon = a.choisir(PRENOMS_G);
    const grand = k * petit;
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `${garcon} a ${grand} images. ${fille} en a ${k} fois moins. Combien d’images a ${fille} ?`,
        reponse: String(petit),
        indice: `« ${k} fois moins », c’est une division par ${k}.`,
        explication: `${garcon} a ${k} fois plus d’images que ${fille}. ${k} × ${petit} = ${grand}. Donc ${fille} a ${petit} images.`,
      };
    }
    // Difficulté 3 : « fois plus » ou « de plus », à distinguer.
    const fois = a.suivant() < 0.5;
    const r = fois ? k * petit : k + petit;
    return {
      gabarit: 'saisie',
      consigne: `${fille} a ${petit} images. ${garcon} en a ${k} ${fois ? 'fois plus' : 'de plus'} que ${fille}. Combien d’images a ${garcon} ?`,
      reponse: String(r),
      indice: '« Fois plus » ou « de plus » : lis bien la phrase.',
      explication: fois
        ? `« ${k} fois plus » : on multiplie. ${k} × ${petit} = ${r}. ${garcon} a ${r} images.`
        : `« ${k} de plus » : on ajoute. ${petit} + ${k} = ${r}. ${garcon} a ${r} images.`,
    };
  },
});
