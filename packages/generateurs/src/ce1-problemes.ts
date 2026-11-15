// CE1, résolution de problèmes. Source : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024).
// Les nombres restent dans le champ du CE1 (jusqu'à 1 000).
import { creerGenerateur } from './outils';

const PRENOMS_F = ['Lucie', 'Inès', 'Nora', 'Jade', 'Lina', 'Rose', 'Elsa', 'Maya'];
const PRENOMS_G = ['Léo', 'Sami', 'Hugo', 'Malo', 'Noé', 'Tom', 'Enzo', 'Paul'];
const OBJETS = ['billes', 'images', 'cartes', 'perles', 'plumes', 'gommettes'];

export const problemesAdditifsCe1 = creerGenerateur({
  id: 'problemes-additifs-ce1',
  competence: 'MA-C2-CE1-PB-01',
  cycle: 2,
  description: 'Problèmes additifs : ajout, retrait, parties et tout, deux étapes.',
  generer(a, d) {
    const objet = a.choisir(OBJETS);
    const il = a.suivant() < 0.5;
    const qui = a.choisir(il ? PRENOMS_G : PRENOMS_F);
    const pronom = il ? 'il' : 'elle';
    const indice = 'Raconte l’histoire avec tes mots. Le nombre augmente-t-il ou diminue-t-il ?';
    if (d === 3) {
      const x = a.entier(40, 300);
      const y = a.entier(10, 99);
      const z = a.entier(10, x + y - 5);
      const r = x + y - z;
      return {
        gabarit: 'saisie',
        consigne: `La bibliothèque a ${x} livres. Le maitre en apporte ${y}. Les élèves en empruntent ${z}. Combien de livres reste-t-il ?`,
        reponse: String(r),
        indice: 'Fais le calcul en deux étapes.',
        explication: `D’abord : ${x} + ${y} = ${x + y}. Ensuite : ${x + y} − ${z} = ${r}. Il reste ${r} livres.`,
      };
    }
    const max = d === 1 ? 100 : 1000;
    const total = a.entier(Math.floor(max / 3), max - 1);
    const part = a.entier(Math.max(2, Math.floor(total / 5)), total - 2);
    const reste = total - part;
    const forme = d === 1 ? a.entier(0, 1) : a.entier(2, 3);
    if (forme === 0) {
      return {
        gabarit: 'saisie',
        consigne: `${qui} a ${part} ${objet}. ${il ? 'Il' : 'Elle'} en gagne ${reste}. Combien en a-t-${pronom} maintenant ?`,
        reponse: String(total),
        indice,
        explication: `Le nombre de ${objet} augmente. ${part} + ${reste} = ${total}. ${qui} a ${total} ${objet}.`,
      };
    }
    if (forme === 1) {
      return {
        gabarit: 'saisie',
        consigne: `${qui} a ${total} ${objet}. ${il ? 'Il' : 'Elle'} en donne ${part}. Combien lui en reste-t-il ?`,
        reponse: String(reste),
        indice,
        explication: `Le nombre de ${objet} diminue. ${total} − ${part} = ${reste}. Il reste ${reste} ${objet}.`,
      };
    }
    if (forme === 2) {
      return {
        gabarit: 'saisie',
        consigne: `Dans mes deux coffres, j’ai ${total} ${objet}. J’en ai ${part} dans le coffre vert. Combien en ai-je dans le coffre rouge ?`,
        reponse: String(reste),
        indice: 'Les deux coffres forment le tout. Cherche la partie qui manque.',
        explication: `Le tout fait ${total}. Une partie fait ${part}. ${total} − ${part} = ${reste}. Le coffre rouge contient ${reste} ${objet}.`,
      };
    }
    return {
      gabarit: 'saisie',
      consigne: `Dans ma boite, il y avait des ${objet}. J’en ai distribué ${part}. Il m’en reste ${reste}. Combien y en avait-il au début ?`,
      reponse: String(total),
      indice: 'Au début, il y en avait plus. Les deux nombres forment le tout.',
      explication: `Au début, il y avait les ${objet} distribuées et les ${objet} restantes. ${part} + ${reste} = ${total}.`,
    };
  },
});

export const problemesComparaisonCe1 = creerGenerateur({
  id: 'problemes-comparaison-ce1',
  competence: 'MA-C2-CE1-PB-02',
  cycle: 2,
  description: 'Problèmes de comparaison : « de plus que », écart entre deux quantités.',
  generer(a, d) {
    const objet = a.choisir(OBJETS);
    const fille = a.choisir(PRENOMS_F);
    const garcon = a.choisir(PRENOMS_G);
    const max = d === 1 ? 100 : 1000;
    const petit = a.entier(10, Math.floor(max / 2));
    const ecart = a.entier(5, Math.floor(max / 2) - 1);
    const grand = petit + ecart;
    const indice = 'Dessine deux barres. Qui en a le plus ?';
    if (d === 1) {
      return {
        gabarit: 'saisie',
        consigne: `${garcon} a ${petit} ${objet}. ${fille} en a ${ecart} de plus que ${garcon}. Combien ${fille} a-t-elle de ${objet} ?`,
        reponse: String(grand),
        indice,
        explication: `${fille} en a plus que ${garcon}. ${petit} + ${ecart} = ${grand}. ${fille} a ${grand} ${objet}.`,
      };
    }
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `Dans l’école, il y a ${petit} garçons et ${grand} filles. Combien y a-t-il de filles de plus que de garçons ?`,
        reponse: String(ecart),
        indice: 'Cherche l’écart entre les deux nombres.',
        explication: `On cherche l’écart. ${grand} − ${petit} = ${ecart}. Il y a ${ecart} filles de plus.`,
      };
    }
    return {
      gabarit: 'saisie',
      consigne: `${fille} a ${grand} ${objet}. Elle en a ${ecart} de plus que ${garcon}. Combien ${garcon} a-t-il de ${objet} ?`,
      reponse: String(petit),
      indice: `Attention : c’est ${fille} qui en a le plus.`,
      explication: `${garcon} en a moins que ${fille}. ${grand} − ${ecart} = ${petit}. ${garcon} a ${petit} ${objet}.`,
    };
  },
});

export const problemesMultiplicatifsCe1 = creerGenerateur({
  id: 'problemes-multiplicatifs-ce1',
  competence: 'MA-C2-CE1-PB-03',
  cycle: 2,
  description: 'Problèmes multiplicatifs : chercher le tout, le nombre de parts ou la valeur d’une part.',
  generer(a, d) {
    const parPart = a.entier(2, d === 1 ? 5 : 10);
    const parts = a.entier(2, d === 1 ? 5 : 10);
    const total = parPart * parts;
    if (d === 1) {
      const qui = a.choisir(PRENOMS_G);
      return {
        gabarit: 'saisie',
        consigne: `${qui} apporte ${parts} paquets de biscuits. Chaque paquet contient ${parPart} biscuits. Combien y a-t-il de biscuits en tout ?`,
        reponse: String(total),
        indice: `${parts} paquets de ${parPart} : c’est ${parts} fois ${parPart}.`,
        explication: `${parts} fois ${parPart} biscuits. ${parts} × ${parPart} = ${total}. Il y a ${total} biscuits.`,
      };
    }
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `Il y a ${total} élèves. On fait des équipes de ${parPart} élèves. Combien y aura-t-il d’équipes ?`,
        reponse: String(parts),
        indice: `Fais des paquets de ${parPart}. Compte les paquets.`,
        explication: `On cherche combien de fois ${parPart} dans ${total}. ${parts} × ${parPart} = ${total}. Il y aura ${parts} équipes.`,
      };
    }
    return {
      gabarit: 'saisie',
      consigne: `${parts} enfants se partagent ${total} images. Chacun a le même nombre d’images. Combien d’images aura chaque enfant ?`,
      reponse: String(parPart),
      indice: 'Distribue les images une par une à chaque enfant.',
      explication: `On partage ${total} en ${parts} parts égales. ${parts} × ${parPart} = ${total}. Chaque enfant aura ${parPart} images.`,
    };
  },
});
