// CP, résolution de problèmes. Source : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024).
// Une étape : nombres jusqu'à 100. Deux étapes et problèmes multiplicatifs : nombres jusqu'à 30.
import { creerGenerateur } from './outils';

const PRENOMS_F = ['Léa', 'Anna', 'Mia', 'Jade', 'Lina', 'Rose', 'Nina', 'Zoé'];
const PRENOMS_G = ['Paul', 'Jan', 'Aaron', 'Hugo', 'Malo', 'Noé', 'Tom', 'Sami'];
const OBJETS = ['billes', 'images', 'cartes', 'perles', 'cerises', 'gommettes'];

export const problemesPartiesToutCp = creerGenerateur({
  id: 'problemes-parties-tout-cp',
  competence: 'MA-C2-CP-PB-01',
  cycle: 2,
  description: 'Problèmes additifs en une étape : ajout, retrait, recherche d’une partie ou du tout.',
  generer(a, d) {
    const objet = a.choisir(OBJETS);
    const fille = a.choisir(PRENOMS_F);
    const indice = 'Raconte l’histoire avec tes mots. Cherches-tu le tout ou une partie ?';
    const max = d === 1 ? 50 : 100;
    const total = a.entier(d === 1 ? 12 : 30, max);
    const partie = a.entier(d === 1 ? 2 : 6, d === 1 ? 9 : total - 5);
    const reste = total - partie;
    const forme = d === 1 ? a.entier(0, 1) : d === 2 ? a.entier(1, 3) : a.entier(4, 5);
    if (forme === 0) {
      return {
        gabarit: 'saisie',
        consigne: `${fille} a ${reste} ${objet}. Elle en gagne ${partie}. Combien en a-t-elle maintenant ?`,
        reponse: String(total),
        indice,
        explication: `On cherche le tout. ${reste} + ${partie} = ${total}. ${fille} a ${total} ${objet}.`,
      };
    }
    if (forme === 1) {
      return {
        gabarit: 'saisie',
        consigne: `${fille} a ${total} euros. Elle achète un livre à ${partie} euros. Combien lui reste-t-il ?`,
        reponse: String(reste),
        indice,
        explication: `On cherche une partie. ${total} − ${partie} = ${reste}. Il lui reste ${reste} euros.`,
      };
    }
    if (forme === 2) {
      return {
        gabarit: 'saisie',
        consigne: `Il y avait ${total} oiseaux dans l’arbre. Il n’en reste plus que ${reste}. Combien se sont envolés ?`,
        reponse: String(partie),
        indice,
        explication: `Le tout, c’est ${total}. Il reste ${reste} oiseaux. ${total} − ${reste} = ${partie}. Il y a ${partie} oiseaux envolés.`,
      };
    }
    if (forme === 3) {
      const garcon = a.choisir(PRENOMS_G);
      return {
        gabarit: 'saisie',
        consigne: `${garcon} a ${total} ${objet}. Il en met ${partie} dans sa poche. Il met les autres dans son sac. Combien y en a-t-il dans son sac ?`,
        reponse: String(reste),
        indice,
        explication: `Le tout, c’est ${total}. Une partie, c’est ${partie}. ${total} − ${partie} = ${reste}. Il y en a ${reste} dans son sac.`,
      };
    }
    if (forme === 4) {
      const p = Math.min(partie, 20);
      const r = Math.min(reste, 70);
      return {
        gabarit: 'saisie',
        consigne: `Dans la boite, il y avait des bonbons. J’en ai mangé ${p}. Il en reste encore ${r}. Combien y en avait-il au début ?`,
        reponse: String(p + r),
        indice: 'Au début, il y en avait plus. Cherche le tout.',
        explication: `Au début, il y avait les bonbons mangés et ceux qui restent. ${p} + ${r} = ${p + r}.`,
      };
    }
    const w1 = a.entier(10, 40);
    const w2 = a.entier(10, 40);
    const w3 = a.entier(5, 100 - w1 - w2);
    return {
      gabarit: 'saisie',
      consigne: `Un train a trois wagons. Le premier a ${w1} passagers. Le deuxième en a ${w2}. Le troisième en a ${w3}. Combien y a-t-il de passagers en tout ?`,
      reponse: String(w1 + w2 + w3),
      indice: 'On réunit les passagers des trois wagons.',
      explication: `${w1} + ${w2} + ${w3} = ${w1 + w2 + w3}. Il y a ${w1 + w2 + w3} passagers dans le train.`,
    };
  },
});

export const problemesDeuxEtapesCp = creerGenerateur({
  id: 'problemes-deux-etapes-cp',
  competence: 'MA-C2-CP-PB-02',
  cycle: 2,
  description: 'Problèmes additifs en deux étapes, nombres jusqu’à 30.',
  generer(a, d) {
    if (d === 1) {
      const qui = a.choisir(PRENOMS_G);
      const x = a.entier(2, 15);
      const y = a.entier(2, 8);
      const z = a.entier(2, 30 - x - y);
      return {
        gabarit: 'saisie',
        consigne: `${qui} a ${x} billes. Il en gagne ${y}. Puis il en gagne encore ${z}. Combien en a-t-il maintenant ?`,
        reponse: String(x + y + z),
        indice: 'Fais le calcul en deux étapes.',
        explication: `D’abord : ${x} + ${y} = ${x + y}. Ensuite : ${x + y} + ${z} = ${x + y + z}. ${qui} a ${x + y + z} billes.`,
      };
    }
    if (d === 2) {
      const total = a.entier(15, 30);
      const albums = a.entier(2, Math.floor(total / 2));
      const bd = a.entier(2, total - albums - 2);
      const docs = total - albums - bd;
      return {
        gabarit: 'saisie',
        consigne: `Il y a ${total} livres. Il y a ${albums} albums. Il y a ${bd} bandes dessinées. Les autres sont des documentaires. Combien y a-t-il de documentaires ?`,
        reponse: String(docs),
        indice: 'Enlève d’abord les albums. Puis enlève les bandes dessinées.',
        explication: `D’abord : ${total} − ${albums} = ${total - albums}. Ensuite : ${total - albums} − ${bd} = ${docs}. Il y a ${docs} documentaires.`,
      };
    }
    // Le bus : des enfants descendent, d'autres montent (ou l'inverse).
    const depart = a.entier(12, 28);
    const descendentDabord = a.suivant() < 0.5;
    let premier: number;
    let second: number;
    let fin: number;
    if (descendentDabord) {
      premier = a.entier(2, depart - 2);
      second = a.entier(2, 30 - (depart - premier));
      fin = depart - premier + second;
    } else {
      premier = a.entier(2, 30 - depart);
      second = a.entier(2, depart + premier - 1);
      fin = depart + premier - second;
    }
    const [v1, v2] = descendentDabord ? ['descendent', 'montent'] : ['montent', 'descendent'];
    const milieu = descendentDabord ? depart - premier : depart + premier;
    return {
      gabarit: 'saisie',
      consigne: `Il y a ${depart} enfants dans un bus. Au premier arrêt, ${premier} enfants ${v1}. Au deuxième arrêt, ${second} enfants ${v2}. Combien d’enfants y a-t-il dans le bus maintenant ?`,
      reponse: String(fin),
      indice: 'Fais le calcul arrêt par arrêt.',
      explication: `Premier arrêt : ${depart} ${descendentDabord ? '−' : '+'} ${premier} = ${milieu}. Deuxième arrêt : ${milieu} ${descendentDabord ? '+' : '−'} ${second} = ${fin}. Il y a ${fin} enfants.`,
    };
  },
});

export const problemesMultiplicatifsCp = creerGenerateur({
  id: 'problemes-multiplicatifs-cp',
  competence: 'MA-C2-CP-PB-03',
  cycle: 2,
  description: 'Problèmes multiplicatifs jusqu’à 30 : chercher le tout, le nombre de parts ou la valeur d’une part.',
  generer(a, d) {
    const parts = a.entier(2, 5);
    const parPart = a.entier(2, Math.min(10, Math.floor(30 / parts)));
    const total = parts * parPart;
    const additions = Array.from({ length: parts }, () => parPart).join(' + ');
    if (d === 1) {
      const qui = a.choisir(PRENOMS_G);
      return {
        gabarit: 'saisie',
        consigne: `${qui} apporte ${parts} paquets de biscuits. Il y a ${parPart} biscuits dans chaque paquet. Combien y a-t-il de biscuits en tout ?`,
        reponse: String(total),
        indice: `${parts} paquets de ${parPart}, c’est ${parts} fois ${parPart}.`,
        explication: `C’est ${parts} fois ${parPart} biscuits. ${additions} = ${total}. Il y a ${total} biscuits.`,
      };
    }
    if (d === 2) {
      return {
        gabarit: 'saisie',
        consigne: `Il y a ${total} élèves. Le maitre fait des équipes de ${parPart} élèves. Combien y aura-t-il d’équipes ?`,
        reponse: String(parts),
        indice: `Dessine ${total} croix. Entoure des groupes de ${parPart}.`,
        explication: `On fait des groupes de ${parPart}. ${additions} = ${total}. Il y a ${parts} groupes, donc ${parts} équipes.`,
      };
    }
    return {
      gabarit: 'saisie',
      consigne: `On partage ${total} images entre ${parts} enfants. Chacun a le même nombre d’images. Combien d’images aura chaque enfant ?`,
      reponse: String(parPart),
      indice: 'Distribue les images une par une à chaque enfant.',
      explication: `On distribue ${total} images à ${parts} enfants. ${additions} = ${total}. Chaque enfant aura ${parPart} images.`,
    };
  },
});
