// 5e, conjugaison et accords : identifier un temps, variations du radical, accord sujet-verbe dans les cas complexes,
// accord du participe passé avec être et avec avoir (COD placé avant, à distinguer du COI).
// Source : programme de français du cycle 4 (arrêté du 18 février 2026, BO n°10 du 5 mars 2026), p. 31.
import { creerGenerateur } from './outils';

// ─────────── Identifier un temps de l'indicatif

const PERSONNES = ['je', 'tu', 'il', 'nous', 'vous', 'ils'] as const;
const VERBES_ER = ['chanter', 'regarder', 'parler', 'jouer', 'marcher', 'trouver', 'porter', 'écouter', 'raconter', 'dessiner', 'arriver', 'rester'];
const SIMPLES: Record<string, string[]> = {
  'présent': ['e', 'es', 'e', 'ons', 'ez', 'ent'],
  'imparfait': ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'],
  'futur simple': ['erai', 'eras', 'era', 'erons', 'erez', 'eront'],
  'passé simple': ['ai', 'as', 'a', 'âmes', 'âtes', 'èrent'],
  'conditionnel présent': ['erais', 'erais', 'erait', 'erions', 'eriez', 'eraient'],
};
const NOMS_SIMPLES = Object.keys(SIMPLES);
/** Verbes irréguliers à la 3e personne du singulier et à la 1re du pluriel : [présent, imparfait, futur, passé simple, conditionnel]. */
const IRREGULIERS: Record<string, [string[], string[]]> = {
  être: [['est', 'était', 'sera', 'fut', 'serait'], ['sommes', 'étions', 'serons', 'fûmes', 'serions']],
  avoir: [['a', 'avait', 'aura', 'eut', 'aurait'], ['avons', 'avions', 'aurons', 'eûmes', 'aurions']],
  aller: [['va', 'allait', 'ira', 'alla', 'irait'], ['allons', 'allions', 'irons', 'allâmes', 'irions']],
  faire: [['fait', 'faisait', 'fera', 'fit', 'ferait'], ['faisons', 'faisions', 'ferons', 'fîmes', 'ferions']],
  venir: [['vient', 'venait', 'viendra', 'vint', 'viendrait'], ['venons', 'venions', 'viendrons', 'vînmes', 'viendrions']],
  prendre: [['prend', 'prenait', 'prendra', 'prit', 'prendrait'], ['prenons', 'prenions', 'prendrons', 'prîmes', 'prendrions']],
  pouvoir: [['peut', 'pouvait', 'pourra', 'put', 'pourrait'], ['pouvons', 'pouvions', 'pourrons', 'pûmes', 'pourrions']],
  voir: [['voit', 'voyait', 'verra', 'vit', 'verrait'], ['voyons', 'voyions', 'verrons', 'vîmes', 'verrions']],
};
const COMPOSES: [string, string[]][] = [
  ['passé composé', ['ai', 'as', 'a', 'avons', 'avez', 'ont']],
  ['plus-que-parfait', ['avais', 'avais', 'avait', 'avions', 'aviez', 'avaient']],
  ['futur antérieur', ['aurai', 'auras', 'aura', 'aurons', 'aurez', 'auront']],
  ['passé antérieur', ['eus', 'eus', 'eut', 'eûmes', 'eûtes', 'eurent']],
];
const ETRE_COMPOSES: Record<string, string[]> = {
  'passé composé': ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
  'plus-que-parfait': ['étais', 'étais', 'était', 'étions', 'étiez', 'étaient'],
  'futur antérieur': ['serai', 'seras', 'sera', 'serons', 'serez', 'seront'],
  'passé antérieur': ['fus', 'fus', 'fut', 'fûmes', 'fûtes', 'furent'],
};
const sujet = (p: string, forme: string) => (p === 'je' && /^[aeéèêiouh]/.test(forme) ? 'j’' : `${p} `);

export const identifierTemps5e = creerGenerateur({
  id: 'identifier-temps-5e',
  competence: 'FR-C4-5E-CONJ-01',
  cycle: 4,
  description: 'Identifier le temps d’un verbe à l’indicatif : temps simples, puis temps composés.',
  generer(a, d) {
    if (d === 1) {
      const verbe = a.choisir(VERBES_ER);
      const temps = a.choisir(NOMS_SIMPLES);
      const r = a.entier(0, 5);
      const forme = verbe.slice(0, -2) + SIMPLES[temps]![r];
      return {
        gabarit: 'qcm',
        consigne: `« ${sujet(PERSONNES[r]!, forme)}${forme} » : à quel temps de l’indicatif ce verbe est-il conjugué ?`,
        options: a.melanger([temps, ...a.melanger(NOMS_SIMPLES.filter((t) => t !== temps)).slice(0, 3)]),
        reponse: temps,
        indice: 'Repère la terminaison : marque du temps (-ai-, -r-, -â-…) et marque de la personne.',
        explication: `La terminaison « -${SIMPLES[temps]![r]} » avec « ${PERSONNES[r]} » est celle du ${temps}.`,
      };
    }
    if (d === 2) {
      const verbe = a.choisir(Object.keys(IRREGULIERS));
      const pluriel = a.suivant() < 0.5;
      const t = a.entier(0, 4);
      const forme = IRREGULIERS[verbe]![pluriel ? 1 : 0][t]!;
      const temps = NOMS_SIMPLES[t]!;
      return {
        gabarit: 'qcm',
        consigne: `« ${pluriel ? 'nous' : 'elle'} ${forme} » (verbe ${verbe}) : à quel temps de l’indicatif ce verbe est-il conjugué ?`,
        options: a.melanger([temps, ...a.melanger(NOMS_SIMPLES.filter((x) => x !== temps)).slice(0, 3)]),
        reponse: temps,
        indice: 'Pense au radical (il peut changer) et à la terminaison.',
        explication: `« ${forme} » est le verbe ${verbe} au ${temps}.`,
      };
    }
    // Temps composés : auxiliaire avoir ou être.
    const [temps, aux] = a.choisir(COMPOSES);
    const r = a.entier(0, 5);
    const avecEtre = a.suivant() < 0.35;
    const verbe = avecEtre ? a.choisir(['arriver', 'rester', 'tomber', 'entrer']) : a.choisir(VERBES_ER.filter((v) => !['arriver', 'rester'].includes(v)));
    const auxiliaire = avecEtre ? ETRE_COMPOSES[temps]![r]! : aux[r]!;
    const participe = verbe.slice(0, -2) + 'é' + (avecEtre && r >= 3 ? 's' : '');
    return {
      gabarit: 'qcm',
      consigne: `« ${sujet(PERSONNES[r]!, auxiliaire)}${auxiliaire} ${participe} » : à quel temps de l’indicatif ce verbe est-il conjugué ?`,
      options: a.melanger(COMPOSES.map((c) => c[0])),
      reponse: temps,
      indice: 'Un temps composé = auxiliaire + participe passé. Le temps de l’auxiliaire donne le nom du temps composé.',
      explication: `L’auxiliaire « ${auxiliaire} » est au ${{ 'passé composé': 'présent', 'plus-que-parfait': 'imparfait', 'futur antérieur': 'futur simple', 'passé antérieur': 'passé simple' }[temps]} : le verbe est au ${temps}.`,
    };
  },
});

// ─────────── Variations du radical

/** [consigne courte, bonne forme, pièges, explication] */
const RADICAUX: [string, string, string[], string][] = [
  ['manger, présent, nous', 'mangeons', ['mangons', 'mangeont'], 'Devant o, on garde le e pour conserver le son « je » : mangeons.'],
  ['manger, imparfait, je', 'mangeais', ['mangais', 'mangeai'], 'Devant a, on garde le e : mangeais.'],
  ['commencer, présent, nous', 'commençons', ['commencons', 'commenceons'], 'Devant o, le c prend une cédille : commençons.'],
  ['commencer, imparfait, il', 'commençait', ['commencait', 'commenceait'], 'Devant a, le c prend une cédille : commençait.'],
  ['appeler, présent, j’', 'appelle', ['appele', 'appèle'], 'Devant un e muet, le l est doublé : appelle.'],
  ['appeler, présent, nous', 'appelons', ['appellons', 'appèlons'], 'Devant une syllabe prononcée, un seul l : appelons.'],
  ['appeler, futur, ils', 'appelleront', ['appeleront', 'appèleront'], 'Au futur, le l est doublé : appelleront.'],
  ['jeter, présent, tu', 'jettes', ['jetes', 'jètes'], 'Devant un e muet, le t est doublé : jettes.'],
  ['jeter, présent, vous', 'jetez', ['jettez', 'jètez'], 'Devant une syllabe prononcée, un seul t : jetez.'],
  ['acheter, présent, j’', 'achète', ['achette', 'achete'], 'Devant un e muet, le e devient è : achète.'],
  ['acheter, futur, il', 'achètera', ['achettera', 'achetera'], 'Au futur, le e devient è : achètera.'],
  ['lever, présent, elles', 'lèvent', ['levent', 'lèvont'], 'Devant un e muet, le e devient è : lèvent.'],
  ['espérer, présent, tu', 'espères', ['espéres', 'esperes'], 'Devant une syllabe muette, é devient è : espères.'],
  ['venir, présent, ils', 'viennent', ['venent', 'vienent'], 'Le radical devient vienn- devant une terminaison muette : viennent.'],
  ['venir, futur, nous', 'viendrons', ['venirons', 'venrons'], 'Au futur, le radical est viendr- : viendrons.'],
  ['prendre, présent, ils', 'prennent', ['prenent', 'prendent'], 'Le radical devient prenn- devant une terminaison muette : prennent.'],
  ['prendre, présent, nous', 'prenons', ['prennons', 'prendons'], 'Le radical est pren- devant une syllabe prononcée : prenons.'],
  ['envoyer, futur, j’', 'enverrai', ['envoyerai', 'envoierai'], 'Au futur, envoyer a pour radical enverr- : enverrai.'],
  ['nettoyer, présent, il', 'nettoie', ['nettoye', 'netoie'], 'Devant un e muet, le y devient i : nettoie.'],
  ['nettoyer, imparfait, nous', 'nettoyions', ['nettoyons', 'nettoiions'], 'À l’imparfait, nous : radical nettoy- et terminaison -ions : nettoyions.'],
  ['finir, présent, nous', 'finissons', ['finons', 'finisons'], 'Les verbes du 2e groupe prennent -iss- au pluriel : finissons.'],
  ['finir, imparfait, ils', 'finissaient', ['finaient', 'finisaient'], 'À l’imparfait, le 2e groupe garde -iss- : finissaient.'],
  ['pouvoir, futur, je', 'pourrai', ['pouverai', 'pourai'], 'Au futur, pouvoir a pour radical pourr- : pourrai.'],
  ['voir, imparfait, nous', 'voyions', ['voyons', 'voiions'], 'À l’imparfait, nous : radical voy- et terminaison -ions : voyions.'],
  ['faire, présent, vous', 'faites', ['faisez', 'fêtes'], 'Faire est irrégulier : vous faites.'],
  ['dire, présent, vous', 'dites', ['disez', 'dîtes'], 'Dire est irrégulier : vous dites.'],
  ['aller, futur, tu', 'iras', ['alleras', 'allas'], 'Au futur, aller a pour radical ir- : iras.'],
  ['être, imparfait, nous', 'étions', ['étaions', 'sommions'], 'À l’imparfait, être a pour radical ét- : étions.'],
];

export const radicaux5e = creerGenerateur({
  id: 'radicaux-verbaux-5e',
  competence: 'FR-C4-5E-CONJ-02',
  cycle: 4,
  description: 'Conjuguer les verbes réguliers et irréguliers en tenant compte des variations du radical.',
  generer(a, d) {
    // d1 : verbes en -ger, -cer et 2e groupe ; d2 : doublement, accent, y/i ; d3 : irréguliers.
    const tranches = [[0, 1, 2, 3, 20, 21], [4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 19], [13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27]];
    const [consigne, bonne, pieges, explication] = RADICAUX[a.choisir(tranches[d - 1]!)]!;
    const [verbe, temps, pronom] = consigne.split(', ');
    return {
      gabarit: 'qcm',
      consigne: `Conjugue « ${verbe} » ${temps === 'imparfait' ? 'à l’imparfait' : temps === 'futur' ? 'au futur simple' : `au ${temps}`} avec « ${pronom} ».`,
      options: a.melanger([bonne, ...pieges]),
      reponse: bonne,
      indice: 'Le radical peut changer : regarde si la terminaison commence par une voyelle prononcée ou par un e muet.',
      explication,
    };
  },
});

// ─────────── Accord sujet-verbe : cas complexes

/** [phrase avec …, infinitif, réponse, pièges, niveau, explication] */
const ACCORDS: [string, string, string, string[], 1 | 2 | 3, string][] = [
  ['Le bruit des vagues … les campeurs.', 'bercer', 'berce', ['bercent', 'berces'], 1, 'Le noyau du sujet est « bruit », au singulier.'],
  ['Les cris de l’enfant … la voisine.', 'réveiller', 'réveillent', ['réveille', 'réveilles'], 1, 'Le noyau du sujet est « cris », au pluriel.'],
  ['La couleur de ces fleurs … les abeilles.', 'attirer', 'attire', ['attirent', 'attires'], 1, 'Le noyau du sujet est « couleur », au singulier.'],
  ['Les lumières de la ville … au loin.', 'briller', 'brillent', ['brille', 'brilles'], 1, 'Le noyau du sujet est « lumières », au pluriel.'],
  ['Le professeur des élèves … les copies.', 'corriger', 'corrige', ['corrigent', 'corriges'], 1, 'Le noyau du sujet est « professeur », au singulier.'],
  ['Les feuilles de cet arbre … en automne.', 'tomber', 'tombent', ['tombe', 'tombes'], 1, 'Le noyau du sujet est « feuilles », au pluriel.'],
  ['Le bouquet de roses … sur la table.', 'rester', 'reste', ['restent', 'restes'], 1, 'Le noyau du sujet est « bouquet », au singulier.'],
  ['Les élèves de la classe de Léa … au musée.', 'aller', 'vont', ['va', 'allent'], 1, 'Le noyau du sujet est « élèves », au pluriel.'],
  ['Le chant des oiseaux … très tôt.', 'commencer', 'commence', ['commencent', 'commences'], 1, 'Le noyau du sujet est « chant », au singulier.'],
  ['Les voitures du voisin … dans la rue.', 'stationner', 'stationnent', ['stationne', 'stationnes'], 1, 'Le noyau du sujet est « voitures », au pluriel.'],
  ['Le chien et le chat … ensemble.', 'jouer', 'jouent', ['joue', 'jouons'], 2, 'Deux noms coordonnés : le sujet est au pluriel.'],
  ['Ma sœur et moi … la vaisselle.', 'faire', 'faisons', ['font', 'fait'], 2, '« Ma sœur et moi », c’est « nous » : faisons.'],
  ['Toi et ton frère … en retard.', 'être', 'êtes', ['sont', 'est'], 2, '« Toi et ton frère », c’est « vous » : êtes.'],
  ['Lina et Hugo … un exposé.', 'préparer', 'préparent', ['prépare', 'préparez'], 2, 'Deux noms coordonnés : le sujet est au pluriel.'],
  ['Mon oncle et ma tante … à Lyon.', 'habiter', 'habitent', ['habite', 'habitez'], 2, 'Deux noms coordonnés : le sujet est au pluriel.'],
  ['Toi et moi … le même livre.', 'lire', 'lisons', ['lisent', 'lit'], 2, '« Toi et moi », c’est « nous » : lisons.'],
  ['Vous et vos parents … invités.', 'être', 'êtes', ['sont', 'est'], 2, '« Vous et vos parents », c’est « vous » : êtes.'],
  ['Elle et moi … au cinéma ce soir.', 'aller', 'allons', ['vont', 'va'], 2, '« Elle et moi », c’est « nous » : allons.'],
  ['Le vent et la pluie … la récolte.', 'gâcher', 'gâchent', ['gâche', 'gâches'], 2, 'Deux noms coordonnés : le sujet est au pluriel.'],
  ['Mon père, ma mère et moi … en vacances.', 'partir', 'partons', ['partent', 'part'], 2, '« Mon père, ma mère et moi », c’est « nous » : partons.'],
  ['Le maire et ses adjoints … la séance.', 'ouvrir', 'ouvrent', ['ouvre', 'ouvrez'], 2, 'Plusieurs noms coordonnés : le sujet est au pluriel.'],
  ['Ta sœur et toi … très bien.', 'chanter', 'chantez', ['chantent', 'chante'], 2, '« Ta sœur et toi », c’est « vous » : chantez.'],
  ['La pluie et le froid … depuis lundi.', 'durer', 'durent', ['dure', 'dures'], 2, 'Deux noms coordonnés : le sujet est au pluriel.'],
  ['Le groupe de touristes … le château.', 'visiter', 'visite', ['visitent', 'visites'], 3, 'Le noyau du sujet est « groupe », au singulier, même s’il désigne plusieurs personnes.'],
  ['Le directeur de l’école … les parents.', 'recevoir', 'reçoit', ['reçoivent', 'recoit'], 3, 'Le noyau du sujet est « directeur » ; devant o, le c prend une cédille.'],
  ['Les tableaux de ce peintre … très chers.', 'être', 'sont', ['est', 'es'], 3, 'Le noyau du sujet est « tableaux », au pluriel.'],
  ['Les amis de mon frère … demain.', 'venir', 'viennent', ['vient', 'venent'], 3, 'Le noyau du sujet est « amis », au pluriel.'],
  ['Le moteur de ces avions … beaucoup de bruit.', 'faire', 'fait', ['font', 'fais'], 3, 'Le noyau du sujet est « moteur », au singulier.'],
  ['Le père de mes amis … le bus.', 'conduire', 'conduit', ['conduisent', 'conduis'], 3, 'Le noyau du sujet est « père », au singulier.'],
  ['La boite de crayons … sur le bureau.', 'trainer', 'traine', ['trainent', 'traines'], 3, 'Le noyau du sujet est « boite », au singulier.'],
  ['Dans la cour … les enfants de la crèche.', 'courir', 'courent', ['court', 'cours'], 3, 'Le sujet est inversé : « les enfants », au pluriel.'],
  ['Dans le ciel … des milliers d’étoiles.', 'briller', 'brillent', ['brille', 'brilles'], 3, 'Le sujet est inversé : « des milliers d’étoiles », au pluriel.'],
  ['Le bruit des moteurs … les habitants du quartier.', 'gêner', 'gêne', ['gênent', 'gênes'], 3, 'Le noyau du sujet est « bruit », au singulier.'],
];

export const accordSujetVerbe5e = creerGenerateur({
  id: 'accord-sujet-verbe-5e',
  competence: 'FR-C4-5E-ORTH-01',
  cycle: 4,
  description: 'Accorder le verbe avec un sujet séparé par un complément ou comportant plusieurs noms (présent).',
  generer(a, d) {
    const [phrase, infinitif, reponse, pieges, , explication] = a.choisir(ACCORDS.filter((x) => x[4] === d));
    return {
      gabarit: 'qcm',
      consigne: `Complète avec le verbe « ${infinitif} » au présent : ${phrase}`,
      options: a.melanger([reponse, ...pieges]),
      reponse,
      indice: 'Cherche le nom noyau du sujet. Le complément du nom ne commande pas l’accord.',
      explication: `${explication} On écrit : ${phrase.replace('…', reponse)}`,
    };
  },
});

// ─────────── Accord du participe passé avec être et avec avoir

/** [phrase avec …, infinitif, réponse, pièges, niveau, explication] */
const PARTICIPES: [string, string, string, string[], 1 | 2 | 3, string][] = [
  ['Les filles sont … en retard.', 'arriver', 'arrivées', ['arrivés', 'arrivé'], 1, 'Avec être, le participe s’accorde avec le sujet « les filles » : féminin pluriel.'],
  ['Ma grand-mère est … hier.', 'partir', 'partie', ['parti', 'parties'], 1, 'Avec être, accord avec le sujet « ma grand-mère » : féminin singulier.'],
  ['Les invités sont … à midi.', 'venir', 'venus', ['venu', 'venues'], 1, 'Avec être, accord avec le sujet « les invités » : masculin pluriel.'],
  ['Léa et Tom sont … au cinéma.', 'aller', 'allés', ['allées', 'allé'], 1, 'Avec être, accord avec « Léa et Tom » : masculin pluriel.'],
  ['La neige est … toute la nuit.', 'tomber', 'tombée', ['tombé', 'tombées'], 1, 'Avec être, accord avec le sujet « la neige » : féminin singulier.'],
  ['Mes cousines sont … à la maison.', 'rester', 'restées', ['restés', 'resté'], 1, 'Avec être, accord avec « mes cousines » : féminin pluriel.'],
  ['Les feuilles sont … dans la cour.', 'tomber', 'tombées', ['tombés', 'tombé'], 1, 'Avec être, accord avec le sujet « les feuilles » : féminin pluriel.'],
  ['Mon frère est … malade.', 'tomber', 'tombé', ['tombée', 'tombés'], 1, 'Avec être, accord avec le sujet « mon frère » : masculin singulier.'],
  ['Les enfants sont … tard.', 'rentrer', 'rentrés', ['rentrées', 'rentré'], 1, 'Avec être, accord avec le sujet « les enfants » : masculin pluriel.'],
  ['Ma cousine et sa mère sont … ce matin.', 'arriver', 'arrivées', ['arrivés', 'arrivée'], 1, 'Avec être, accord avec « ma cousine et sa mère » : féminin pluriel.'],
  ['Elle a … ses devoirs.', 'finir', 'fini', ['finis', 'finie'], 2, 'Avec avoir, le COD « ses devoirs » est placé après : pas d’accord.'],
  ['Nous avons … des fleurs.', 'cueillir', 'cueilli', ['cueillies', 'cueillis'], 2, 'Avec avoir, le COD « des fleurs » est placé après : pas d’accord.'],
  ['Les élèves ont … la leçon.', 'apprendre', 'appris', ['apprise', 'apprises'], 2, 'Avec avoir, on n’accorde jamais avec le sujet.'],
  ['Je leur ai … une carte.', 'envoyer', 'envoyé', ['envoyés', 'envoyées'], 2, '« Leur » est un COI : le participe ne s’accorde pas.'],
  ['Nous lui avons … la vérité.', 'dire', 'dit', ['dite', 'dits'], 2, '« Lui » est un COI et le COD « la vérité » est placé après : pas d’accord.'],
  ['Mes amies ? Je leur ai … hier.', 'parler', 'parlé', ['parlées', 'parlés'], 2, '« Leur » est un COI : pas d’accord.'],
  ['Ils ont … une maison.', 'construire', 'construit', ['construits', 'construite'], 2, 'Avec avoir, le COD « une maison » est placé après : pas d’accord.'],
  ['Ma tante a … une tarte.', 'préparer', 'préparé', ['préparée', 'préparés'], 2, 'Avec avoir, on n’accorde pas avec le sujet ; le COD est placé après.'],
  ['Les joueurs leur ont … la main.', 'serrer', 'serré', ['serrés', 'serrée'], 2, '« Leur » est un COI et le COD « la main » est placé après : pas d’accord.'],
  ['Je lui ai … un message.', 'écrire', 'écrit', ['écrite', 'écrits'], 2, '« Lui » est un COI et le COD « un message » est placé après : pas d’accord.'],
  ['Ces lettres, je les ai … hier.', 'écrire', 'écrites', ['écrit', 'écrits'], 3, 'Le COD « les » (ces lettres) est placé avant avoir : accord au féminin pluriel.'],
  ['Ta robe ? Où l’as-tu … ?', 'acheter', 'achetée', ['acheté', 'achetées'], 3, 'Le COD « l’ » (ta robe) est placé avant : accord au féminin singulier.'],
  ['Les clés ? Je les ai … sur la table.', 'laisser', 'laissées', ['laissé', 'laissés'], 3, 'Le COD « les » (les clés) est placé avant : accord au féminin pluriel.'],
  ['La tarte, nous l’avons … ensemble.', 'manger', 'mangée', ['mangé', 'mangées'], 3, 'Le COD « l’ » (la tarte) est placé avant : accord au féminin singulier.'],
  ['Les fleurs que tu as … sont belles.', 'cueillir', 'cueillies', ['cueilli', 'cueillie'], 3, 'Le COD « que » reprend « les fleurs », placé avant : accord au féminin pluriel.'],
  ['Ces romans, tu les as … ?', 'lire', 'lus', ['lu', 'lues'], 3, 'Le COD « les » (ces romans) est placé avant : accord au masculin pluriel.'],
  ['Ces chansons, nous les avons … ensemble.', 'chanter', 'chantées', ['chanté', 'chantés'], 3, 'Le COD « les » (ces chansons) est placé avant : accord au féminin pluriel.'],
  ['La lettre que j’ai … est arrivée.', 'envoyer', 'envoyée', ['envoyé', 'envoyés'], 3, 'Le COD « que » reprend « la lettre », placé avant : accord au féminin singulier.'],
  ['Tes amis ? Je les ai … au parc.', 'voir', 'vus', ['vu', 'vues'], 3, 'Le COD « les » (tes amis) est placé avant : accord au masculin pluriel.'],
  ['Cette histoire, qui te l’a … ?', 'raconter', 'racontée', ['raconté', 'racontés'], 3, 'Le COD « l’ » (cette histoire) est placé avant : accord au féminin singulier.'],
];

export const participePasse5e = creerGenerateur({
  id: 'participe-passe-5e',
  competence: 'FR-C4-5E-ORTH-02',
  cycle: 4,
  description: 'Accorder le participe passé avec être, et avec avoir quand le COD est placé avant ; distinguer COD et COI.',
  generer(a, d) {
    const [phrase, infinitif, reponse, pieges, , explication] = a.choisir(PARTICIPES.filter((x) => x[4] === d));
    return {
      gabarit: 'qcm',
      consigne: `Complète avec le participe passé de « ${infinitif} » : ${phrase}`,
      options: a.melanger([reponse, ...pieges]),
      reponse,
      indice: 'Avec être : accord avec le sujet. Avec avoir : accord avec le COD seulement s’il est placé avant.',
      explication: `${explication} On écrit : ${phrase.replace('…', reponse)}`,
    };
  },
});
