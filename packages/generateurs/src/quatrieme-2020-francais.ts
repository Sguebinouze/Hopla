// 4e, français, programme 2020 (BO n°31 du 30 juillet 2020), notions placées en 4e par les repères annuels de
// progression (BO n°22 du 29 mai 2019). Reprises des générateurs au même périmètre ; générateurs propres pour
// l'apposition, les compléments de conséquence, les pronoms démonstratifs et possessifs, les degrés de l'adjectif,
// la forme impersonnelle, le sujet éloigné du verbe, le passé du subjonctif et du conditionnel, l'accord du participe
// passé avec avoir, la dérivation. Toutes les phrases sont rédigées et annotées à la main.
import { paroles5e } from './cinquieme-francais';
import { confusionTemps } from './erreurs';
import { creerGenerateur, erreursDe, reprendre } from './outils';
import {
  accordsComplexes4e, interrogativeIndirecte4e, participesPasses4e, polysemie4e, subjonctif4e, subordonnants4e, voixPassive4e,
  intensite4e,
} from './quatrieme-francais';

type Niveau = 1 | 2 | 3;
/** Corpus par niveau : d1 → niveau 1 ; d2 → niveaux 1 et 2 ; d3 → niveaux 2 et 3. */
const niveaux = (d: number): Niveau[] => (d === 1 ? [1] : d === 2 ? [1, 2] : [2, 3]);
const qcm = (a: { melanger: <T>(l: readonly T[]) => T[] }, consigne: string, reponse: string, pieges: string[], indice: string, explication: string,
  code?: (piege: string) => string | undefined) => {
  const options = a.melanger([reponse, ...pieges]);
  return { gabarit: 'qcm' as const, consigne, options, reponse, indice, explication, erreurs: erreursDe(options, reponse, code ? options.map((o) => [o, code(o)] as const) : []) };
};

// ─────────── Reprises : même périmètre qu'au programme 2026 (ou qu'en 5e pour les paroles rapportées)

export const subordonnants4e2020 = reprendre(subordonnants4e, { id: 'subordonnants-4e-2020', competence: 'FR-C4-4E-GRAM-51' });
export const interrogative4e2020 = reprendre(interrogativeIndirecte4e, { id: 'interrogative-indirecte-4e-2020', competence: 'FR-C4-4E-GRAM-52' });
export const voixPassive4e2020 = reprendre(voixPassive4e, { id: 'voix-passive-4e-2020', competence: 'FR-C4-4E-CONJ-52' });
export const subjonctif4e2020 = reprendre(subjonctif4e, { id: 'subjonctif-4e-2020', competence: 'FR-C4-4E-CONJ-53' });
export const accordsComplexes4e2020 = reprendre(accordsComplexes4e, { id: 'accords-complexes-4e-2020', competence: 'FR-C4-4E-ORTH-52' });
export const participesPasses4e2020 = reprendre(participesPasses4e, { id: 'participes-passes-4e-2020', competence: 'FR-C4-4E-ORTH-53' });
export const intensite4e2020 = reprendre(intensite4e, { id: 'intensite-4e-2020', competence: 'FR-C4-4E-VOC-51' });
export const polysemie4e2020 = reprendre(polysemie4e, { id: 'polysemie-4e-2020', competence: 'FR-C4-4E-VOC-53' });
export const paroles4e2020 = reprendre(paroles5e, { id: 'paroles-rapportees-4e-2020', competence: 'FR-C4-4E-DISC-51' });

// ─────────── Apposition, épithète, complément du nom

type FonctionGN = 'épithète' | 'complément du nom' | 'apposition';
/** [phrase, groupe, fonction, niveau] */
export const APPOSITIONS: [string, string, FonctionGN, Niveau][] = [
  ['Le chat noir dort sur le canapé.', 'noir', 'épithète', 1],
  ['La maison de mon oncle est grande.', 'de mon oncle', 'complément du nom', 1],
  ['Paris, capitale de la France, attire les touristes.', 'capitale de la France', 'apposition', 1],
  ['J’ai acheté une robe rouge.', 'rouge', 'épithète', 1],
  ['Le vélo de Léa est neuf.', 'de Léa', 'complément du nom', 1],
  ['Ma sœur, une excellente nageuse, a gagné la course.', 'une excellente nageuse', 'apposition', 1],
  ['Une tasse à café est tombée.', 'à café', 'complément du nom', 1],
  ['Un énorme nuage cache le soleil.', 'énorme', 'épithète', 1],
  ['Lyon, ville des Lumières, illumine ses rues en décembre.', 'ville des Lumières', 'apposition', 1],
  ['Épuisés, les coureurs franchissent la ligne.', 'Épuisés', 'apposition', 2],
  ['Les coureurs épuisés franchissent la ligne.', 'épuisés', 'épithète', 2],
  ['Le professeur, souriant, distribue les copies.', 'souriant', 'apposition', 2],
  ['Le professeur souriant distribue les copies.', 'souriant', 'épithète', 2],
  ['Une machine à laver neuve a été livrée.', 'à laver', 'complément du nom', 2],
  ['Le roi, furieux, quitte la salle.', 'furieux', 'apposition', 2],
  ['Mon frère, ce grand rêveur, a encore oublié ses clés.', 'ce grand rêveur', 'apposition', 2],
  ['Le jardin de ma grand-mère regorge de fleurs.', 'de ma grand-mère', 'complément du nom', 2],
  ['Inquiète, la mère guette le retour de son fils.', 'Inquiète', 'apposition', 3],
  ['Le désir de vaincre anime toute l’équipe.', 'de vaincre', 'complément du nom', 3],
  ['Le capitaine, blessé à la jambe, refuse de quitter le navire.', 'blessé à la jambe', 'apposition', 3],
  ['Arrivés en retard, les élèves s’excusent.', 'Arrivés en retard', 'apposition', 3],
  ['Une peur soudaine la saisit.', 'soudaine', 'épithète', 3],
  ['Seul dans la forêt, l’enfant avait peur.', 'Seul dans la forêt', 'apposition', 3],
  ['Les élèves de la classe voisine chantent.', 'de la classe voisine', 'complément du nom', 3],
  ['Le bruit, assourdissant, réveilla tout le quartier.', 'assourdissant', 'apposition', 3],
  ['Il porte toujours un vieux chapeau de paille.', 'de paille', 'complément du nom', 3],
];
const FONCTIONS_GN: string[] = ['épithète', 'complément du nom', 'apposition', 'attribut du sujet'];

export const apposition4e2020 = creerGenerateur({
  id: 'apposition-4e-2020',
  competence: 'FR-C4-4E-GRAM-53',
  cycle: 4,
  description: 'Identifier l’apposition et la distinguer de l’épithète et du complément du nom.',
  generer(a, d) {
    const [phrase, groupe, fonction] = a.choisir(APPOSITIONS.filter((x) => niveaux(d).includes(x[3])));
    return qcm(a, `Dans « ${phrase} », quelle est la fonction de « ${groupe} » ?`, fonction, FONCTIONS_GN.filter((f) => f !== fonction),
      'L’apposition est détachée par une virgule. L’épithète est collée au nom. Le complément du nom est introduit par une préposition.',
      fonction === 'apposition'
        ? `« ${groupe} » est détaché du nom par une virgule : c’est une apposition.`
        : fonction === 'épithète'
          ? `« ${groupe} » est un adjectif placé contre le nom, sans virgule : il est épithète.`
          : `« ${groupe} » est introduit par une préposition et complète le nom : c’est un complément du nom.`,
      () => 'fonction-grammaticale-confondue');
  },
});

// ─────────── Compléments circonstanciels de cause, de conséquence, de but

type Relation = 'CC de cause' | 'CC de conséquence' | 'CC de but';
/** [phrase, complément, relation, niveau] */
export const CONSEQUENCES: [string, string, Relation, Niveau][] = [
  ['Il a neigé toute la nuit, si bien que les routes sont bloquées.', 'si bien que les routes sont bloquées', 'CC de conséquence', 1],
  ['Nous sommes restés à l’intérieur à cause de la pluie.', 'à cause de la pluie', 'CC de cause', 1],
  ['Elle s’entraine chaque jour pour gagner la course.', 'pour gagner la course', 'CC de but', 1],
  ['Il est tombé parce que le sol était glissant.', 'parce que le sol était glissant', 'CC de cause', 1],
  ['Le bébé dort, de sorte que nous parlons tout bas.', 'de sorte que nous parlons tout bas', 'CC de conséquence', 1],
  ['Il parle fort afin que tout le monde l’entende.', 'afin que tout le monde l’entende', 'CC de but', 1],
  ['Grâce à ton aide, j’ai fini à temps.', 'Grâce à ton aide', 'CC de cause', 1],
  ['Il a tant couru qu’il est essoufflé.', 'qu’il est essoufflé', 'CC de conséquence', 1],
  ['Le vent soufflait si fort que l’arbre est tombé.', 'que l’arbre est tombé', 'CC de conséquence', 2],
  ['Comme il faisait beau, nous avons pique-niqué.', 'Comme il faisait beau', 'CC de cause', 2],
  ['Elle a économisé pour s’offrir un vélo.', 'pour s’offrir un vélo', 'CC de but', 2],
  ['Le film était tellement drôle que nous avons ri aux larmes.', 'que nous avons ri aux larmes', 'CC de conséquence', 2],
  ['Faute de temps, il n’a pas terminé son dessin.', 'Faute de temps', 'CC de cause', 2],
  ['Ferme la porte de peur que le chat ne s’échappe.', 'de peur que le chat ne s’échappe', 'CC de but', 2],
  ['Puisque tu es là, aide-moi à porter ce carton.', 'Puisque tu es là', 'CC de cause', 2],
  ['Il est assez grand pour attraper le pot de confiture.', 'pour attraper le pot de confiture', 'CC de conséquence', 3],
  ['Elle a tant crié qu’elle a perdu sa voix.', 'qu’elle a perdu sa voix', 'CC de conséquence', 3],
  ['Il révise tous les soirs pour réussir son examen.', 'pour réussir son examen', 'CC de but', 3],
  ['La salle était trop petite pour accueillir tout le monde.', 'pour accueillir tout le monde', 'CC de conséquence', 3],
  ['Il a été puni pour avoir menti.', 'pour avoir menti', 'CC de cause', 3],
  ['La route est verglacée, de sorte qu’il faut ralentir.', 'de sorte qu’il faut ralentir', 'CC de conséquence', 3],
  ['Parle doucement de sorte que le bébé ne se réveille pas.', 'de sorte que le bébé ne se réveille pas', 'CC de but', 3],
  ['Il a plu au point que la rivière a débordé.', 'au point que la rivière a débordé', 'CC de conséquence', 3],
  ['Elle a pris un parapluie en raison de la pluie annoncée.', 'en raison de la pluie annoncée', 'CC de cause', 3],
];
const RELATIONS: string[] = ['CC de cause', 'CC de conséquence', 'CC de but', 'CC de temps'];

export const consequence4e2020 = creerGenerateur({
  id: 'complement-consequence-4e-2020',
  competence: 'FR-C4-4E-GRAM-54',
  cycle: 4,
  description: 'Identifier les compléments circonstanciels de conséquence et les distinguer de la cause et du but.',
  generer(a, d) {
    const [phrase, complement, relation] = a.choisir(CONSEQUENCES.filter((x) => niveaux(d).includes(x[3])));
    const explications: Record<Relation, string> = {
      'CC de cause': `« ${complement} » donne la raison du fait : c’est un complément de cause.`,
      'CC de conséquence': `« ${complement} » donne le résultat du fait : c’est un complément de conséquence.`,
      'CC de but': `« ${complement} » donne l’objectif visé : c’est un complément de but.`,
    };
    return qcm(a, `Dans « ${phrase} », quelle est la fonction de « ${complement} » ?`, relation, RELATIONS.filter((r) => r !== relation),
      'Cause : pourquoi ? Conséquence : avec quel résultat ? But : dans quelle intention ?',
      explications[relation], (o) => (o === 'CC de temps' ? undefined : 'connecteur-relation-logique'));
  },
});

// ─────────── Pronoms démonstratifs et possessifs

type Nature = 'pronom démonstratif' | 'pronom possessif' | 'déterminant démonstratif' | 'déterminant possessif' | 'pronom personnel';
/** [phrase, mot, nature, niveau] */
export const DEMONSTRATIFS: [string, string, Nature, Niveau][] = [
  ['Ce livre est à moi.', 'Ce', 'déterminant démonstratif', 1],
  ['Celui-ci est plus lourd que l’autre.', 'Celui-ci', 'pronom démonstratif', 1],
  ['Mon vélo est rouge, le tien est bleu.', 'le tien', 'pronom possessif', 1],
  ['Ta trousse est sur la table.', 'Ta', 'déterminant possessif', 1],
  ['Prends celle que tu préfères.', 'celle', 'pronom démonstratif', 1],
  ['Notre maison est petite, la leur est grande.', 'la leur', 'pronom possessif', 1],
  ['Cette chanson me plait beaucoup.', 'Cette', 'déterminant démonstratif', 1],
  ['Leurs parents sont arrivés.', 'Leurs', 'déterminant possessif', 1],
  ['Ceci est un secret.', 'Ceci', 'pronom démonstratif', 2],
  ['J’ai oublié mes gants ; prête-moi les tiens.', 'les tiens', 'pronom possessif', 2],
  ['Ça m’étonne beaucoup.', 'Ça', 'pronom démonstratif', 2],
  ['Ces roses sentent bon, mais celles du jardin sont plus belles.', 'celles', 'pronom démonstratif', 2],
  ['Leur voiture est en panne.', 'Leur', 'déterminant possessif', 2],
  ['Ces chaussures sont trop petites.', 'Ces', 'déterminant démonstratif', 2],
  ['Ton dessin est plus réussi que le mien.', 'le mien', 'pronom possessif', 2],
  ['C’est mon tour.', 'C’', 'pronom démonstratif', 3],
  ['Je leur écris souvent.', 'leur', 'pronom personnel', 3],
  ['Les nôtres ont gagné le match.', 'Les nôtres', 'pronom possessif', 3],
  ['Ce qui compte, c’est l’effort.', 'Ce', 'pronom démonstratif', 3],
  ['Cela ne me regarde pas.', 'Cela', 'pronom démonstratif', 3],
  ['Votre idée est meilleure que la mienne.', 'la mienne', 'pronom possessif', 3],
  ['Ce matin, il fait froid.', 'Ce', 'déterminant démonstratif', 3],
  ['Donne-leur du pain.', 'leur', 'pronom personnel', 3],
  ['Notre classe a gagné le concours.', 'Notre', 'déterminant possessif', 3],
];
const NATURES: Nature[] = ['pronom démonstratif', 'pronom possessif', 'déterminant démonstratif', 'déterminant possessif', 'pronom personnel'];

export const demonstratifsPossessifs4e2020 = creerGenerateur({
  id: 'pronoms-demonstratifs-possessifs-4e-2020',
  competence: 'FR-C4-4E-GRAM-55',
  cycle: 4,
  description: 'Identifier les pronoms démonstratifs et possessifs et les distinguer des déterminants.',
  generer(a, d) {
    const [phrase, mot, nature] = a.choisir(DEMONSTRATIFS.filter((x) => niveaux(d).includes(x[3])));
    const autres = NATURES.filter((n) => n !== nature);
    // En d1 et d2, le pronom personnel n'est pas proposé : il reste pour d3.
    const pieges = (d < 3 ? autres.filter((n) => n !== 'pronom personnel') : a.melanger(autres).slice(0, 3));
    const explication = nature.startsWith('déterminant')
      ? `« ${mot} » accompagne un nom : c’est un ${nature}.`
      : nature === 'pronom personnel'
        ? `Devant un verbe, « leur » remplace « à eux » ou « à elles » : c’est un pronom personnel, invariable.`
        : `« ${mot} » remplace un nom : c’est un ${nature}.`;
    return qcm(a, `Dans « ${phrase} », quelle est la nature de « ${mot} » ?`, nature, pieges,
      'Un déterminant accompagne un nom. Un pronom remplace un nom.', explication,
      (o) => (o.split(' ')[1] === nature.split(' ')[1] ? 'determinant-pronom-confondus' : undefined));
  },
});

// ─────────── Degrés de l'adjectif : comparatif et superlatif

type Degre = 'comparatif de supériorité' | 'comparatif d’infériorité' | 'comparatif d’égalité' | 'superlatif relatif' | 'superlatif absolu';
/** [phrase, adjectif, degré, niveau] */
export const DEGRES: [string, string, Degre, Niveau][] = [
  ['Léa est plus grande que son frère.', 'grande', 'comparatif de supériorité', 1],
  ['Ce film est moins drôle que le livre.', 'drôle', 'comparatif d’infériorité', 1],
  ['Tom est aussi rapide que Sami.', 'rapide', 'comparatif d’égalité', 1],
  ['C’est le plus beau jour de ma vie.', 'beau', 'superlatif relatif', 1],
  ['Cette tarte est très bonne.', 'bonne', 'superlatif absolu', 1],
  ['Mon sac est plus lourd que le tien.', 'lourd', 'comparatif de supériorité', 1],
  ['Ce chemin est aussi long que l’autre.', 'long', 'comparatif d’égalité', 1],
  ['C’est la moins chère des trois robes.', 'chère', 'superlatif relatif', 1],
  ['Elle est meilleure que moi en dessin.', 'meilleure', 'comparatif de supériorité', 2],
  ['C’est le meilleur gâteau du quartier.', 'meilleur', 'superlatif relatif', 2],
  ['Ce problème est extrêmement difficile.', 'difficile', 'superlatif absolu', 2],
  ['Ta réponse est pire que la mienne.', 'pire', 'comparatif de supériorité', 2],
  ['Il est le moins patient de la famille.', 'patient', 'superlatif relatif', 2],
  ['Cette rue est moins calme que la nôtre.', 'calme', 'comparatif d’infériorité', 2],
  ['Le Nil est le plus long fleuve d’Afrique.', 'long', 'superlatif relatif', 2],
  ['C’est la pire tempête depuis dix ans.', 'pire', 'superlatif relatif', 3],
  ['Ce vase est fort ancien.', 'ancien', 'superlatif absolu', 3],
  ['Ce gâteau est moins sucré que je ne le pensais.', 'sucré', 'comparatif d’infériorité', 3],
  ['C’est un élève extrêmement doué.', 'doué', 'superlatif absolu', 3],
  ['Cette montagne est la plus haute d’Europe.', 'haute', 'superlatif relatif', 3],
  ['Mon chien est aussi têtu que le tien.', 'têtu', 'comparatif d’égalité', 3],
  ['Ce devoir est bien meilleur que le précédent.', 'meilleur', 'comparatif de supériorité', 3],
];
const NOMS_DEGRES: Degre[] = ['comparatif de supériorité', 'comparatif d’infériorité', 'comparatif d’égalité', 'superlatif relatif', 'superlatif absolu'];

export const degresAdjectif4e2020 = creerGenerateur({
  id: 'degres-adjectif-4e-2020',
  competence: 'FR-C4-4E-GRAM-56',
  cycle: 4,
  description: 'Identifier les degrés de l’adjectif : comparatif (supériorité, infériorité, égalité) et superlatif (relatif, absolu).',
  generer(a, d) {
    const [phrase, adjectif, degre] = a.choisir(DEGRES.filter((x) => niveaux(d).includes(x[3])));
    const pieges = a.melanger(NOMS_DEGRES.filter((n) => n !== degre)).slice(0, 3);
    const explication = degre.startsWith('comparatif')
      ? `L’adjectif « ${adjectif} » compare deux éléments : c’est un ${degre}.`
      : degre === 'superlatif relatif'
        ? `L’adjectif « ${adjectif} » situe un élément au plus haut ou au plus bas d’un ensemble : c’est un superlatif relatif.`
        : `L’adjectif « ${adjectif} » exprime une qualité très forte, sans comparaison : c’est un superlatif absolu.`;
    return qcm(a, `Dans « ${phrase} », à quel degré est l’adjectif « ${adjectif} » ?`, degre, pieges,
      'Le comparatif compare deux éléments. Le superlatif relatif compare à tout un ensemble. Le superlatif absolu ne compare pas.',
      explication, () => 'degre-adjectif-confondu');
  },
});

// ─────────── Forme impersonnelle

/** Phrases à la forme impersonnelle, par niveau. */
export const IMPERSONNELLES: [string, Niveau][] = [
  ['Il pleut depuis ce matin.', 1], ['Il faut partir maintenant.', 1], ['Il neige sur la montagne.', 1], ['Il fait très chaud aujourd’hui.', 1],
  ['Il y a du monde au marché.', 2], ['Il s’agit d’une erreur.', 2], ['Il est important de bien dormir.', 2], ['Il fait nuit très tôt en hiver.', 2],
  ['Il arrive parfois des accidents.', 3], ['Il manque trois pages à ce livre.', 3], ['Il reste un peu de gâteau.', 3],
  ['Il est tombé beaucoup de neige.', 3], ['Il se passe des choses étranges ici.', 3], ['Il convient de se taire.', 3],
];
/** Phrases dont le sujet « il » désigne quelqu'un, par niveau. */
export const PERSONNELLES: [string, Niveau][] = [
  ['Il mange une pomme.', 1], ['Il joue au football.', 1], ['Il lit un roman.', 1], ['Il chante sous la douche.', 1], ['Il court vite.', 1],
  ['Il fait ses devoirs.', 2], ['Il est content de te voir.', 2], ['Il s’habille vite.', 2], ['Il fait du vélo le dimanche.', 2], ['Il y pense souvent.', 2],
  ['Il arrive en retard.', 3], ['Il manque de patience.', 3], ['Il reste chez lui.', 3], ['Il est tombé de vélo.', 3], ['Il se passe de dessert.', 3],
  ['Il convient parfaitement pour ce poste.', 3],
];

export const impersonnelle4e2020 = creerGenerateur({
  id: 'forme-impersonnelle-4e-2020',
  competence: 'FR-C4-4E-GRAM-57',
  cycle: 4,
  description: 'Identifier la forme impersonnelle : le pronom « il » ne désigne personne.',
  generer(a, d) {
    const [reponse] = a.choisir(IMPERSONNELLES.filter((x) => niveaux(d).includes(x[1])));
    const pieges = a.melanger(PERSONNELLES.filter((x) => niveaux(d).includes(x[1])).map((x) => x[0])).slice(0, 3);
    return qcm(a, 'Quelle phrase est à la forme impersonnelle ?', reponse, pieges,
      'À la forme impersonnelle, « il » ne remplace personne : on ne peut pas le remplacer par « elle » ou par un nom.',
      `Dans « ${reponse} », « il » ne désigne ni une personne ni une chose : le verbe est à la forme impersonnelle.`,
      () => 'forme-impersonnelle-confondue');
  },
});

// ─────────── Sujet éloigné du verbe

/** [phrase, verbe, sujet, pièges, niveau] */
export const SUJETS_ELOIGNES: [string, string, string, string[], Niveau][] = [
  ['Les enfants de la voisine jouent dans la cour.', 'jouent', 'Les enfants de la voisine', ['la voisine', 'la cour']],
  ['Le chien de mes cousins aboie toute la nuit.', 'aboie', 'Le chien de mes cousins', ['mes cousins', 'la nuit']],
  ['La boite de chocolats est vide.', 'est', 'La boite de chocolats', ['de chocolats', 'chocolats']],
  ['Les fleurs du jardin de ma tante embaument.', 'embaument', 'Les fleurs du jardin de ma tante', ['ma tante', 'du jardin']],
  ['Le bruit des vagues me berce.', 'berce', 'Le bruit des vagues', ['des vagues', 'me']],
  ['Les élèves de cette classe préparent un spectacle.', 'préparent', 'Les élèves de cette classe', ['cette classe', 'un spectacle']],
  ['Dans la forêt vivaient des loups.', 'vivaient', 'des loups', ['la forêt', 'Dans la forêt']],
  ['Au loin brillaient les lumières de la ville.', 'brillaient', 'les lumières de la ville', ['la ville', 'Au loin']],
  ['Sur la table traine un vieux journal.', 'traine', 'un vieux journal', ['la table', 'Sur la table']],
  ['Que dit ton professeur ?', 'dit', 'ton professeur', ['Que', 'tu']],
  ['Le matin, mon frère, après le petit déjeuner, promène le chien.', 'promène', 'mon frère', ['le chien', 'Le matin']],
  ['Ces élèves, malgré la fatigue et la chaleur, terminent la course.', 'terminent', 'Ces élèves', ['la fatigue et la chaleur', 'la course']],
  ['Le bruit des voitures qui passent sous mes fenêtres m’empêche de dormir.', 'empêche', 'Le bruit des voitures qui passent sous mes fenêtres', ['mes fenêtres', 'les voitures']],
  ['La liste des invités que tu m’as donnée hier contient des erreurs.', 'contient', 'La liste des invités que tu m’as donnée hier', ['des invités', 'tu']],
  ['Chaque matin, à la même heure, sans faire de bruit, arrive le facteur.', 'arrive', 'le facteur', ['la même heure', 'Chaque matin']],
  ['Les vieilles maisons du village, que les touristes photographient sans cesse, tombent en ruine.', 'tombent', 'Les vieilles maisons du village', ['les touristes', 'en ruine']],
  ['Le résultat de ces longues recherches étonne les savants.', 'étonne', 'Le résultat de ces longues recherches', ['ces longues recherches', 'les savants']],
  ['Où se cachent les clés de la voiture ?', 'se cachent', 'les clés de la voiture', ['la voiture', 'Où']],
].map(([p, v, s, pi], i) => [p, v, s, pi, (i < 6 ? 1 : i < 12 ? 2 : 3)] as [string, string, string, string[], Niveau]);

export const sujetEloigne4e2020 = creerGenerateur({
  id: 'sujet-eloigne-4e-2020',
  competence: 'FR-C4-4E-GRAM-58',
  cycle: 4,
  description: 'Reconnaitre le sujet d’un verbe, même éloigné du verbe ou placé après lui.',
  generer(a, d) {
    const [phrase, verbe, sujet, pieges] = a.choisir(SUJETS_ELOIGNES.filter((x) => niveaux(d).includes(x[4])));
    return qcm(a, `Dans « ${phrase} », quel est le sujet du verbe « ${verbe} » ?`, sujet, pieges,
      `Pose la question « Qui est-ce qui ${verbe} ? » ou « Qu’est-ce qui ${verbe} ? ». On peut encadrer le sujet par « c’est… qui ».`,
      `Le verbe « ${verbe} » a pour sujet « ${sujet} »${phrase.indexOf(sujet) > phrase.indexOf(` ${verbe} `) ? ', placé après lui' : ''}. Les mots qui les séparent sont des compléments.`,
      () => 'sujet-mal-identifie');
  },
});

// ─────────── Passé du subjonctif et passé du conditionnel

type Temps = 'subjonctif passé' | 'conditionnel passé' | 'passé composé' | 'plus-que-parfait' | 'subjonctif présent' | 'conditionnel présent';
/** [phrase, forme verbale, temps, niveau] */
export const TEMPS_PASSES: [string, string, Temps, Niveau][] = [
  ['Il faut que tu aies fini avant midi.', 'aies fini', 'subjonctif passé', 1],
  ['J’aurais aimé venir avec vous.', 'aurais aimé', 'conditionnel passé', 1],
  ['Elle a fini son travail.', 'a fini', 'passé composé', 1],
  ['Nous avions déjà mangé.', 'avions mangé', 'plus-que-parfait', 1],
  ['Je suis content que tu sois venu.', 'sois venu', 'subjonctif passé', 1],
  ['Tu aurais pu me prévenir.', 'aurais pu', 'conditionnel passé', 1],
  ['Il faut que tu finisses ce soir.', 'finisses', 'subjonctif présent', 1],
  ['Je doute qu’il soit parti.', 'soit parti', 'subjonctif passé', 2],
  ['Si tu avais su, tu serais venu.', 'serais venu', 'conditionnel passé', 2],
  ['Si tu avais su, tu serais venu.', 'avais su', 'plus-que-parfait', 2],
  ['Bien qu’elle ait couru, elle a raté le train.', 'ait couru', 'subjonctif passé', 2],
  ['Bien qu’elle ait couru, elle a raté le train.', 'a raté', 'passé composé', 2],
  ['Nous aimerions partir plus tôt.', 'aimerions', 'conditionnel présent', 2],
  ['Il est possible qu’ils se soient trompés.', 'se soient trompés', 'subjonctif passé', 3],
  ['Nous aurions dû partir plus tôt.', 'aurions dû', 'conditionnel passé', 3],
  ['Je ne crois pas qu’il ait compris.', 'ait compris', 'subjonctif passé', 3],
  ['Selon la radio, les coureurs seraient arrivés hier.', 'seraient arrivés', 'conditionnel passé', 3],
  ['Qu’il ait réussi m’étonne beaucoup.', 'ait réussi', 'subjonctif passé', 3],
  ['Elles étaient parties avant l’orage.', 'étaient parties', 'plus-que-parfait', 3],
  ['Il aurait fallu prévenir les secours.', 'aurait fallu', 'conditionnel passé', 3],
  ['Je voudrais que vous ayez rangé avant ce soir.', 'ayez rangé', 'subjonctif passé', 3],
];
const NOMS_TEMPS: Temps[] = ['subjonctif passé', 'conditionnel passé', 'passé composé', 'plus-que-parfait', 'subjonctif présent', 'conditionnel présent'];
const EXPLICATIONS_TEMPS: Record<Temps, string> = {
  'subjonctif passé': 'auxiliaire au subjonctif présent et participe passé : c’est le subjonctif passé',
  'conditionnel passé': 'auxiliaire au conditionnel présent et participe passé : c’est le conditionnel passé',
  'passé composé': 'auxiliaire au présent de l’indicatif et participe passé : c’est le passé composé',
  'plus-que-parfait': 'auxiliaire à l’imparfait de l’indicatif et participe passé : c’est le plus-que-parfait',
  'subjonctif présent': 'forme simple, après « que », avec les terminaisons du subjonctif : c’est le subjonctif présent',
  'conditionnel présent': 'forme simple en -rais, -rait, -rions… : c’est le conditionnel présent',
};

export const tempsPasses4e2020 = creerGenerateur({
  id: 'subjonctif-conditionnel-passes-4e-2020',
  competence: 'FR-C4-4E-CONJ-51',
  cycle: 4,
  description: 'Identifier le passé du subjonctif et le passé du conditionnel parmi les temps déjà connus.',
  generer(a, d) {
    const [phrase, forme, temps] = a.choisir(TEMPS_PASSES.filter((x) => niveaux(d).includes(x[3])));
    // Toujours proposer les deux temps étudiés, puis compléter.
    const base = (['subjonctif passé', 'conditionnel passé'] as Temps[]).filter((t) => t !== temps);
    const pieges = [...base, ...a.melanger(NOMS_TEMPS.filter((t) => t !== temps && !base.includes(t)))].slice(0, 3);
    return qcm(a, `Dans « ${phrase} », à quel temps est la forme verbale « ${forme} » ?`, temps, pieges,
      'Regarde l’auxiliaire : son mode et son temps donnent le nom du temps composé.',
      `« ${forme} » : ${EXPLICATIONS_TEMPS[temps]}.`, (o) => confusionTemps(temps, o));
  },
});

// ─────────── Accord du participe passé avec avoir

/** [phrase avec …, participe au masculin singulier, accord attendu (suffixe), niveau] */
export const PP_AVOIR: [string, string, '' | 'e' | 's' | 'es', Niveau, 'apres' | 'pronom' | 'coi' | 'interrogatif'][] = [
  ['J’ai … des fleurs dans le jardin.', 'cueilli', '', 1, 'apres'],
  ['Ces fleurs, je les ai … ce matin.', 'cueilli', 'es', 1, 'pronom'],
  ['Ma lettre, je l’ai … hier.', 'envoyé', 'e', 1, 'pronom'],
  ['Nous avons … les photos du voyage.', 'regardé', '', 1, 'apres'],
  ['Les photos, nous les avons … ensemble.', 'regardé', 'es', 1, 'pronom'],
  ['Tes gants ? Je les ai … sous le lit.', 'trouvé', 's', 1, 'pronom'],
  ['Elle a … une veste en laine.', 'acheté', '', 1, 'apres'],
  ['Cette veste, elle l’a … en solde.', 'acheté', 'e', 1, 'pronom'],
  ['Marie, ton frère t’a … longtemps.', 'attendu', 'e', 2, 'pronom'],
  ['Les filles, le directeur vous a … pour votre travail.', 'félicité', 'es', 2, 'pronom'],
  ['Ses amies, il les a … à son anniversaire.', 'invité', 'es', 2, 'pronom'],
  ['Ces gâteaux, qui les a … ?', 'préparé', 's', 2, 'pronom'],
  ['La voisine nous a …, ma sœur et moi.', 'aidé', 'es', 2, 'pronom'],
  ['Léa, je t’ai … au marché.', 'aperçu', 'e', 2, 'pronom'],
  ['Ils ont … la tarte aux pommes.', 'mangé', '', 2, 'apres'],
  ['Mes cousines ? Je leur ai … hier.', 'téléphoné', '', 3, 'coi'],
  ['Ma grand-mère, je lui ai … une longue lettre.', 'écrit', '', 3, 'coi'],
  ['Quelles chaussures as-tu … ?', 'choisi', 'es', 3, 'interrogatif'],
  ['Combien de pommes as-tu … ?', 'mangé', 'es', 3, 'interrogatif'],
  ['Ces histoires, ma mère nous les a … souvent.', 'raconté', 'es', 3, 'pronom'],
  ['Mes amies m’ont … de leur voyage.', 'parlé', '', 3, 'coi'],
  ['Quelle robe a-t-elle … pour la fête ?', 'porté', 'e', 3, 'interrogatif'],
  ['Ces fautes, tu les as … sans aide.', 'corrigé', 'es', 3, 'pronom'],
];

export const accordAvoir4e2020 = creerGenerateur({
  id: 'accord-participe-avoir-4e-2020',
  competence: 'FR-C4-4E-ORTH-51',
  cycle: 4,
  description: 'Accorder le participe passé employé avec avoir quand le COD est placé avant, notamment un pronom personnel.',
  generer(a, d) {
    const [phrase, pp, accord, , cas] = a.choisir(PP_AVOIR.filter((x) => niveaux(d).includes(x[3])));
    const reponse = pp + accord;
    const formes = ['', 'e', 's', 'es'].map((s) => pp + s);
    const explication = cas === 'apres'
      ? `Le COD est placé après le verbe : le participe passé employé avec avoir ne s’accorde pas. On écrit « ${reponse} ».`
      : cas === 'coi'
        ? `Le pronom placé avant est un COI (on dit « parler à », « écrire à », « téléphoner à ») : pas d’accord. On écrit « ${reponse} ».`
        : cas === 'interrogatif'
          ? `Le COD est placé avant le verbe, en tête de la question : le participe s’accorde avec lui. On écrit « ${reponse} ».`
          : `Le COD est un pronom placé avant le verbe : le participe s’accorde avec ce qu’il remplace. On écrit « ${reponse} ».`;
    return qcm(a, `Complète avec le participe passé qui convient : ${phrase}`, reponse, formes.filter((f) => f !== reponse),
      'Avec avoir, le participe passé s’accorde avec le COD seulement si ce COD est placé avant le verbe.', explication,
      (o) => (accord === '' ? (cas === 'coi' ? 'accord-avec-coi' : 'accord-pp-abusif') : o === pp ? 'accord-cod-avant-oublie' : undefined));
  },
});

// ─────────── Dérivation : changement de classe grammaticale et incidences orthographiques

type Classe = 'nom' | 'verbe' | 'adjectif' | 'adverbe';
/** [mot de base, classe de base, dérivé, classe du dérivé] */
export const DERIVES: [string, Classe, string, Classe][] = [
  ['rapide', 'adjectif', 'rapidement', 'adverbe'], ['laver', 'verbe', 'lavage', 'nom'], ['nation', 'nom', 'national', 'adjectif'],
  ['blanc', 'adjectif', 'blanchir', 'verbe'], ['chanter', 'verbe', 'chanteur', 'nom'], ['lent', 'adjectif', 'lentement', 'adverbe'],
  ['utile', 'adjectif', 'utiliser', 'verbe'], ['beau', 'adjectif', 'beauté', 'nom'], ['laver', 'verbe', 'lavable', 'adjectif'],
  ['jardin', 'nom', 'jardiner', 'verbe'], ['saison', 'nom', 'saisonnier', 'adjectif'], ['rouge', 'adjectif', 'rougir', 'verbe'],
];
/** [adjectif, nom dérivé, pièges] : incidences orthographiques de la dérivation. */
export const NOMS_DERIVES: [string, string, string[]][] = [
  ['long', 'longueur', ['longeur', 'longuer', 'longuesse']], ['doux', 'douceur', ['douseur', 'doucheur', 'douxeur']],
  ['frais', 'fraicheur', ['fraisseur', 'fraisheur', 'fraiseur']], ['franc', 'franchise', ['franquise', 'francise', 'franchize']],
  ['gentil', 'gentillesse', ['gentilesse', 'gentiesse', 'gentilité']], ['sec', 'sècheresse', ['secresse', 'sèquesse', 'sécité']],
  ['faux', 'fausseté', ['fauxeté', 'fauseté', 'faussité']], ['bon', 'bonté', ['bonneté', 'bontée', 'bonnité']],
  ['fier', 'fierté', ['fièreté', 'fiertée', 'fièrité']], ['blanc', 'blancheur', ['blanqueur', 'blansseur', 'blanceur']],
];
/** [adjectif, adverbe en -ment, pièges] */
export const ADVERBES_DERIVES: [string, string, string[]][] = [
  ['prudent', 'prudemment', ['prudament', 'prudentement', 'prudamment']], ['courant', 'couramment', ['courament', 'courantement', 'couremment']],
  ['évident', 'évidemment', ['évidament', 'évidentement', 'évidamment']], ['bruyant', 'bruyamment', ['bruyament', 'bruyantement', 'bruyemment']],
  ['patient', 'patiemment', ['patiament', 'patientement', 'patiamment']], ['savant', 'savamment', ['savament', 'savantement', 'savemment']],
  ['fréquent', 'fréquemment', ['fréquament', 'fréquentement', 'fréquamment']], ['puissant', 'puissamment', ['puissament', 'puissantement', 'puissemment']],
  ['gentil', 'gentiment', ['gentillement', 'gentilment', 'gentiement']], ['vrai', 'vraiment', ['vraiement', 'vraimment', 'vrayment']],
  ['poli', 'poliment', ['poliement', 'polimment', 'polliment']], ['assidu', 'assidument', ['assiduement', 'assidumment', 'assiduemment']],
];
const CLASSES: Classe[] = ['nom', 'verbe', 'adjectif', 'adverbe'];

export const derivation4e2020 = creerGenerateur({
  id: 'derivation-4e-2020',
  competence: 'FR-C4-4E-VOC-52',
  cycle: 4,
  description: 'Repérer le changement de classe grammaticale produit par la dérivation et ses incidences orthographiques.',
  generer(a, d) {
    if (d === 1) {
      const [base, classeBase, derive, classe] = a.choisir(DERIVES);
      return qcm(a, `Le mot « ${derive} » est dérivé ${classeBase === 'adjectif' ? 'de l’adjectif' : `du ${classeBase}`} « ${base} ». Quelle est sa classe grammaticale ?`, classe,
        CLASSES.filter((c) => c !== classe),
        'Le suffixe change souvent la classe du mot : -ment forme des adverbes, -age et -eur des noms, -ir et -er des verbes.',
        `« ${derive} » est un ${classe} : le suffixe a changé la classe ${classeBase === 'adjectif' ? 'de l’adjectif' : `du ${classeBase}`} « ${base} ».`);
    }
    if (d === 2) {
      const [adjectif, nom, pieges] = a.choisir(NOMS_DERIVES);
      return qcm(a, `Quel nom est dérivé de l’adjectif « ${adjectif} » ? Choisis la bonne orthographe.`, nom, pieges,
        'Pense au féminin de l’adjectif : il donne souvent le radical du nom (longue, longueur).',
        `On écrit « ${nom} ». La dérivation modifie parfois le radical de l’adjectif « ${adjectif} ».`, () => 'derivation-orthographe');
    }
    const [adjectif, adverbe, pieges] = a.choisir(ADVERBES_DERIVES);
    const enNt = /[ae]nt$/.test(adjectif);
    return qcm(a, `Quel adverbe est correctement dérivé de l’adjectif « ${adjectif} » ?`, adverbe, pieges,
      'Adjectif en -ant : adverbe en -amment. Adjectif en -ent : adverbe en -emment. Sinon, on ajoute -ment au féminin, ou au masculin s’il finit par une voyelle.',
      enNt
        ? `« ${adjectif} » finit par ${adjectif.endsWith('ant') ? '-ant : l’adverbe finit par -amment' : '-ent : l’adverbe finit par -emment'}. On écrit « ${adverbe} ».`
        : `On écrit « ${adverbe} ».`, () => 'derivation-orthographe');
  },
});

export const GENERATEURS_QUATRIEME_2020_FRANCAIS = [
  subordonnants4e2020, interrogative4e2020, apposition4e2020, consequence4e2020, demonstratifsPossessifs4e2020,
  degresAdjectif4e2020, impersonnelle4e2020, sujetEloigne4e2020, tempsPasses4e2020, voixPassive4e2020, subjonctif4e2020,
  accordAvoir4e2020, accordsComplexes4e2020, participesPasses4e2020, intensite4e2020, derivation4e2020, polysemie4e2020,
  paroles4e2020,
];
