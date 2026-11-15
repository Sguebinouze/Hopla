// 5e, vocabulaire : préfixes et suffixes, registres de langue, relations de sens entre les mots.
// Source : programme de français du cycle 4 (arrêté du 18 février 2026, BO n°10 du 5 mars 2026), p. 27 et 28.
import { creerGenerateur, erreursDe } from './outils';

// ─────────── Préfixes et suffixes les plus fréquents

/** [affixe, sens, mot exemple, pièges de sens] */
const PREFIXES: [string, string, string, string[]][] = [
  ['pré-', 'avant', 'préhistoire', ['après', 'contre', 'à travers']],
  ['re-', 'de nouveau', 'relire', ['avant', 'contre', 'à moitié']],
  ['anti-', 'contre', 'antivol', ['avant', 'très', 'entre']],
  ['inter-', 'entre', 'international', ['contre', 'sous', 'au-delà']],
  ['trans-', 'à travers, au-delà', 'transatlantique', ['avant', 'contre', 'à moitié']],
  ['sous-', 'en dessous', 'sous-marin', ['au-dessus', 'avant', 'contre']],
  ['sur-', 'au-dessus, en excès', 'surpopulation', ['en dessous', 'de nouveau', 'contre']],
  ['hyper-', 'très, au-delà', 'hypermarché', ['en dessous', 'contre', 'de nouveau']],
  ['auto-', 'soi-même', 'autoportrait', ['contre', 'à distance', 'plusieurs']],
  ['télé-', 'à distance', 'téléphone', ['soi-même', 'contre', 'avant']],
  ['bi-', 'deux', 'bicyclette', ['trois', 'plusieurs', 'contre']],
  ['tri-', 'trois', 'tricycle', ['deux', 'plusieurs', 'avant']],
  ['poly-', 'plusieurs', 'polyglotte', ['un seul', 'deux', 'contre']],
  ['mal-', 'mal, mauvais', 'malchance', ['de nouveau', 'avant', 'bien']],
  ['in-', 'contraire, absence', 'inutile', ['dans, à l’intérieur seulement', 'de nouveau', 'très']],
];
/** [suffixe, sens, mot exemple, pièges] */
const SUFFIXES: [string, string, string, string[]][] = [
  ['-able', 'qui peut être', 'lavable', ['qui fait l’action', 'petit', 'action de']],
  ['-ible', 'qui peut être', 'lisible', ['qui fait l’action', 'manière', 'lieu où']],
  ['-eur', 'qui fait l’action', 'nageur', ['qui peut être', 'petit', 'manière']],
  ['-ette', 'petit', 'fillette', ['grand', 'qui peut être', 'action de']],
  ['-ment (adverbe)', 'manière', 'lentement', ['petit', 'lieu où', 'qui fait l’action']],
  ['-age', 'action de', 'lavage', ['petit', 'qui peut être', 'manière']],
  ['-logue', 'spécialiste de', 'biologue', ['qui craint', 'qui tue', 'petit']],
  ['-phobe', 'qui craint', 'claustrophobe', ['qui aime', 'spécialiste de', 'qui tue']],
  ['-cide', 'qui tue', 'insecticide', ['qui aime', 'qui craint', 'spécialiste de']],
  ['-erie', 'lieu où l’on fabrique ou vend', 'boulangerie', ['qui fait l’action', 'petit', 'manière']],
];
/** Mot construit → décomposition [préfixe, radical, suffixe]. */
const MOTS_CONSTRUITS: [string, string, string][] = [
  ['incassable', 'in- + cass(er) + -able', 'contraire de « qui peut être cassé »'],
  ['relecture', 're- + lect(ure)', 'action de lire de nouveau'],
  ['impensable', 'im- + pens(er) + -able', 'qu’on ne peut pas penser'],
  ['malheureusement', 'mal- + heureuse + -ment', 'de manière malheureuse'],
  ['antibruit', 'anti- + bruit', 'qui protège contre le bruit'],
  ['télécommande', 'télé- + commande', 'commande à distance'],
  ['illisible', 'il- + lis(ible)', 'qu’on ne peut pas lire'],
  ['préchauffer', 'pré- + chauffer', 'chauffer avant'],
  ['intercommunal', 'inter- + communal', 'entre plusieurs communes'],
  ['irremplaçable', 'ir- + rempla(cer) + -able', 'qu’on ne peut pas remplacer'],
];

export const affixes5e = creerGenerateur({
  id: 'affixes-5e',
  competence: 'FR-C4-5E-VOC-01',
  cycle: 4,
  description: 'Connaitre le sens des préfixes et suffixes les plus fréquents ; déduire le sens d’un mot construit.',
  generer(a, d) {
    if (d === 1) {
      const [prefixe, sens, exemple, pieges] = a.choisir(PREFIXES);
      return {
        gabarit: 'qcm',
        consigne: `Dans « ${exemple} », que signifie le préfixe ${prefixe} ?`,
        options: a.melanger([sens, ...pieges]),
        reponse: sens,
        indice: 'Pense à d’autres mots qui commencent par le même préfixe.',
        explication: `Le préfixe ${prefixe} signifie « ${sens} », comme dans « ${exemple} ».`,
      };
    }
    if (d === 2) {
      const [suffixe, sens, exemple, pieges] = a.choisir(SUFFIXES);
      return {
        gabarit: 'qcm',
        consigne: `Dans « ${exemple} », quel est le sens du suffixe ${suffixe} ?`,
        options: a.melanger([sens, ...pieges]),
        reponse: sens,
        indice: 'Le suffixe se trouve à la fin du mot. Il change souvent la classe du mot.',
        explication: `Le suffixe ${suffixe} signifie « ${sens} », comme dans « ${exemple} ».`,
      };
    }
    const i = a.entier(0, MOTS_CONSTRUITS.length - 1);
    const [mot, , sens] = MOTS_CONSTRUITS[i]!;
    const autres = MOTS_CONSTRUITS.filter((_, j) => j !== i).map((m) => m[2]);
    return {
      gabarit: 'qcm',
      consigne: `Que signifie le mot « ${mot} » ?`,
      options: a.melanger([sens, ...a.melanger(autres).slice(0, 3)]),
      reponse: sens,
      indice: 'Découpe le mot : préfixe, radical, suffixe.',
      explication: `« ${mot} » se décompose ainsi : ${MOTS_CONSTRUITS[i]![1]}. Il signifie : ${sens}.`,
    };
  },
});

// ─────────── Registres de langue

/** [familier, courant, soutenu] */
const REGISTRES: [string, string, string][] = [
  ['une bagnole', 'une voiture', 'une automobile'], ['un bouquin', 'un livre', 'un ouvrage'], ['bosser', 'travailler', 'œuvrer'],
  ['se marrer', 'rire', 's’esclaffer'], ['bouffer', 'manger', 'se restaurer'], ['un gamin', 'un enfant', 'un bambin'],
  ['piger', 'comprendre', 'saisir le sens'], ['le fric', 'l’argent', 'les deniers'], ['un flic', 'un policier', 'un agent de la force publique'],
  ['se planter', 'se tromper', 's’abuser'], ['crevé', 'fatigué', 'épuisé'], ['la flotte', 'l’eau', 'l’onde'],
  ['un pote', 'un ami', 'un camarade'], ['bouquiner', 'lire', 's’adonner à la lecture'], ['se barrer', 's’en aller', 'prendre congé'],
];
/** Phrases : [familier, courant, soutenu] */
const PHRASES_REGISTRES: [string, string, string][] = [
  ['T’as vu ce film ?', 'Tu as vu ce film ?', 'Avez-vous vu ce film ?'],
  ['J’en ai marre.', 'J’en ai assez.', 'Je suis las.'],
  ['Il est super sympa.', 'Il est très gentil.', 'Il est fort aimable.'],
  ['On s’est bien marrés.', 'Nous avons bien ri.', 'Nous nous sommes fort divertis.'],
  ['C’est trop la honte.', 'C’est très gênant.', 'Cela est fort embarrassant.'],
  ['Ça caille dehors.', 'Il fait froid dehors.', 'La température est fort basse.'],
];
const REGISTRE = ['familier', 'courant', 'soutenu'] as const;

export const registres5e = creerGenerateur({
  id: 'registres-5e',
  competence: 'FR-C4-5E-VOC-02',
  cycle: 4,
  description: 'Distinguer les registres de langue familier, courant et soutenu ; passer de l’un à l’autre.',
  generer(a, d) {
    if (d === 1) {
      const triple = a.choisir(REGISTRES);
      const r = a.entier(0, 2);
      return {
        gabarit: 'qcm',
        consigne: `À quel registre de langue appartient « ${triple[r]} » ?`,
        options: [...REGISTRE],
        erreurs: erreursDe(REGISTRE, REGISTRE[r]!, REGISTRE.map((x) => [x, 'registre-langue-confondu'] as const)),
        reponse: REGISTRE[r]!,
        indice: 'Familier : entre amis. Courant : la langue de tous les jours. Soutenu : la langue soignée, souvent écrite.',
        explication: `« ${triple[0]} » est familier, « ${triple[1]} » est courant, « ${triple[2]} » est soutenu.`,
      };
    }
    if (d === 2) {
      const i = a.entier(0, REGISTRES.length - 1);
      const [familier, courant, soutenu] = REGISTRES[i]!;
      const autre = REGISTRES[(i + 1 + a.entier(0, REGISTRES.length - 2)) % REGISTRES.length]![1];
      return {
        gabarit: 'qcm',
        consigne: `Quel est l’équivalent en registre courant de « ${familier} » ?`,
        options: a.melanger([courant, soutenu, autre]),
        erreurs: erreursDe([soutenu], courant, [[soutenu, 'registre-langue-confondu']]),
        reponse: courant,
        indice: 'Cherche le mot de même sens qu’on emploie partout, sans être ni relâché ni recherché.',
        explication: `« ${familier} » (familier) se dit « ${courant} » en registre courant et « ${soutenu} » en registre soutenu.`,
      };
    }
    const triple = a.choisir(PHRASES_REGISTRES);
    const r = a.entier(0, 2);
    return {
      gabarit: 'qcm',
      consigne: `« ${triple[r]} » À quel registre de langue appartient cette phrase ?`,
      options: [...REGISTRE],
      erreurs: erreursDe(REGISTRE, REGISTRE[r]!, REGISTRE.map((x) => [x, 'registre-langue-confondu'] as const)),
      reponse: REGISTRE[r]!,
      indice: 'Observe le vocabulaire et la syntaxe : négation complète, inversion du sujet, mots familiers.',
      explication: `Familier : « ${triple[0]} » Courant : « ${triple[1]} » Soutenu : « ${triple[2]} »`,
    };
  },
});

// ─────────── Relations de sens entre les mots

const RELATIONS: [string, string, 'des synonymes' | 'des antonymes' | 'des homonymes' | 'un mot générique et un mot spécifique'][] = [
  ['rapide', 'véloce', 'des synonymes'], ['commencer', 'débuter', 'des synonymes'], ['peur', 'crainte', 'des synonymes'],
  ['habitation', 'demeure', 'des synonymes'], ['joyeux', 'gai', 'des synonymes'], ['finir', 'achever', 'des synonymes'],
  ['monter', 'descendre', 'des antonymes'], ['généreux', 'avare', 'des antonymes'], ['victoire', 'défaite', 'des antonymes'],
  ['ancien', 'moderne', 'des antonymes'], ['accepter', 'refuser', 'des antonymes'], ['clair', 'obscur', 'des antonymes'],
  ['vert', 'verre', 'des homonymes'], ['mer', 'mère', 'des homonymes'], ['pain', 'pin', 'des homonymes'],
  ['cou', 'coup', 'des homonymes'], ['sang', 'cent', 'des homonymes'], ['chêne', 'chaine', 'des homonymes'],
  ['fruit', 'cerise', 'un mot générique et un mot spécifique'], ['instrument', 'violon', 'un mot générique et un mot spécifique'],
  ['meuble', 'armoire', 'un mot générique et un mot spécifique'], ['oiseau', 'mésange', 'un mot générique et un mot spécifique'],
  ['véhicule', 'tracteur', 'un mot générique et un mot spécifique'], ['sport', 'escrime', 'un mot générique et un mot spécifique'],
];
const NOMS_RELATIONS = ['des synonymes', 'des antonymes', 'des homonymes', 'un mot générique et un mot spécifique'];

export const relationsSens5e = creerGenerateur({
  id: 'relations-sens-5e',
  competence: 'FR-C4-5E-VOC-03',
  cycle: 4,
  description: 'Reconnaitre et nommer les relations de sens entre deux mots : synonymie, antonymie, homonymie, générique et spécifique.',
  generer(a, d) {
    // d1 : synonymes et antonymes ; d2 : + générique et spécifique ; d3 : homonymes, antonymes, générique.
    const permis = d === 1 ? NOMS_RELATIONS.slice(0, 2) : d === 2 ? [NOMS_RELATIONS[0]!, NOMS_RELATIONS[1]!, NOMS_RELATIONS[3]!] : NOMS_RELATIONS.slice(1);
    const [m1, m2, relation] = a.choisir(RELATIONS.filter((r) => permis.includes(r[2])));
    const ordre = a.suivant() < 0.5 ? [m1, m2] : [m2, m1];
    return {
      gabarit: 'qcm',
      consigne: `Quelle relation unit les mots « ${ordre[0]} » et « ${ordre[1]} » ?`,
      options: a.melanger([...NOMS_RELATIONS]),
      erreurs: erreursDe(NOMS_RELATIONS, relation, NOMS_RELATIONS.map((x) => [x, 'relation-sens-confondue'] as const)),
      reponse: relation,
      indice: 'Synonymes : même sens. Antonymes : sens contraires. Homonymes : même prononciation, sens différents.',
      explication: {
        'des synonymes': `« ${m1} » et « ${m2} » ont un sens proche : ce sont des synonymes.`,
        'des antonymes': `« ${m1} » et « ${m2} » ont des sens contraires : ce sont des antonymes.`,
        'des homonymes': `« ${m1} » et « ${m2} » se prononcent de la même façon mais n’ont pas le même sens : ce sont des homonymes.`,
        'un mot générique et un mot spécifique': `« ${m2} » est une sorte de « ${m1} » : « ${m1} » est le mot générique, « ${m2} » le mot spécifique.`,
      }[relation],
    };
  },
});
