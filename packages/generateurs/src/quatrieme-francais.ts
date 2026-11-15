// 4e, français (programme 2026) : subordination, compléments d'opposition et de condition, apposition, interrogative
// indirecte, temps composés et conditionnel passé, voix passive, subjonctif, participes passés, accords complexes,
// verbes pronominaux, homophones des conjonctions, polysémie, degrés d'intensité.
// Source : programme de français du cycle 4 (arrêté du 18 février 2026, BO n°10 du 5 mars 2026), p. 28, 31 et 32.
// Toutes les phrases sont rédigées et annotées à la main.
import { creerGenerateur } from './outils';

/** Corpus par niveau : d1 → niveau 1 ; d2 → niveaux 1 et 2 ; d3 → niveaux 2 et 3. */
const niveaux = (d: number) => (d === 1 ? [1] : d === 2 ? [1, 2] : [2, 3]);
const qcm = (a: { melanger: <T>(l: readonly T[]) => T[] }, consigne: string, reponse: string, pieges: string[], indice: string, explication: string) => ({
  gabarit: 'qcm' as const, consigne, options: a.melanger([reponse, ...pieges]), reponse, indice, explication,
});

// ─────────── Subordonnants : pronom relatif ou conjonction de subordination

/** [phrase, mot, nature] */
export const SUBORDONNANTS: [string, string, 'pronom relatif' | 'conjonction de subordination', 1 | 2 | 3][] = [
  ['Le livre qui est sur la table est à moi.', 'qui', 'pronom relatif', 1],
  ['La ville dont je te parle est au bord de la mer.', 'dont', 'pronom relatif', 1],
  ['Lorsque la cloche sonne, les élèves sortent.', 'Lorsque', 'conjonction de subordination', 1],
  ['Il est resté parce qu’il était malade.', 'parce qu’', 'conjonction de subordination', 1],
  ['La maison où j’ai grandi a été vendue.', 'où', 'pronom relatif', 1],
  ['Bien qu’il soit tard, nous continuons.', 'Bien qu’', 'conjonction de subordination', 1],
  ['Je pense que tu as raison.', 'que', 'conjonction de subordination', 2],
  ['Le film que nous avons vu était drôle.', 'que', 'pronom relatif', 2],
  ['Elle espère que le train sera à l’heure.', 'que', 'conjonction de subordination', 2],
  ['Les fleurs que tu as cueillies sentent bon.', 'que', 'pronom relatif', 2],
  ['Il faut que tu viennes demain.', 'que', 'conjonction de subordination', 2],
  ['La lettre que j’attendais est enfin arrivée.', 'que', 'pronom relatif', 2],
  ['Je me demande quand il reviendra.', 'quand', 'conjonction de subordination', 3],
  ['L’année où nous sommes partis, il a neigé.', 'où', 'pronom relatif', 3],
  ['Si tu veux, je t’accompagne.', 'Si', 'conjonction de subordination', 3],
  ['C’est l’ami avec qui je voyage.', 'qui', 'pronom relatif', 3],
  ['Comme il pleuvait, le match a été annulé.', 'Comme', 'conjonction de subordination', 3],
  ['Voici l’outil grâce auquel j’ai réparé le vélo.', 'auquel', 'pronom relatif', 3],
];

export const subordonnants4e = creerGenerateur({
  id: 'subordonnants-4e',
  competence: 'FR-C4-4E-GRAM-01',
  cycle: 4,
  description: 'Distinguer pronoms relatifs et conjonctions de subordination.',
  generer(a, d) {
    const [phrase, mot, nature] = a.choisir(SUBORDONNANTS.filter((s) => niveaux(d).includes(s[3])));
    return qcm(a, `Dans « ${phrase} », quelle est la classe de « ${mot} » ?`, nature,
      [nature === 'pronom relatif' ? 'conjonction de subordination' : 'pronom relatif', 'conjonction de coordination', 'adverbe'],
      'Un pronom relatif reprend un nom (son antécédent) et a une fonction. Une conjonction de subordination ne remplace rien.',
      nature === 'pronom relatif'
        ? `« ${mot} » reprend un nom placé avant lui (son antécédent) : c’est un pronom relatif.`
        : `« ${mot} » ne remplace aucun nom : il relie la subordonnée à la principale. C’est une conjonction de subordination.`);
  },
});

// ─────────── Fonctions des subordonnées

/** [phrase, subordonnée, fonction] */
export const FONCTIONS_SUB: [string, string, string, 1 | 2 | 3][] = [
  ['Le chien qui aboie appartient au voisin.', 'qui aboie', 'complément du nom', 1],
  ['J’ai lu le roman que tu m’as prêté.', 'que tu m’as prêté', 'complément du nom', 1],
  ['Je crois que la réunion est annulée.', 'que la réunion est annulée', 'COD', 1],
  ['Elle dit qu’elle arrivera tard.', 'qu’elle arrivera tard', 'COD', 1],
  ['Nous partirons quand le soleil se lèvera.', 'quand le soleil se lèvera', 'CC de temps', 1],
  ['Il est rentré parce qu’il avait froid.', 'parce qu’il avait froid', 'CC de cause', 1],
  ['Le village où je suis né est minuscule.', 'où je suis né', 'complément du nom', 2],
  ['Je souhaite que tu réussisses.', 'que tu réussisses', 'COD', 2],
  ['Dès que la pluie cesse, les enfants sortent.', 'Dès que la pluie cesse', 'CC de temps', 2],
  ['Comme la route est glissante, il roule lentement.', 'Comme la route est glissante', 'CC de cause', 2],
  ['Si tu te dépêches, tu prendras le bus.', 'Si tu te dépêches', 'CC de condition', 2],
  ['Bien qu’il soit fatigué, il termine la course.', 'Bien qu’il soit fatigué', 'CC d’opposition', 2],
  ['L’élève dont je parle est absent.', 'dont je parle', 'complément du nom', 3],
  ['Je me demande si elle viendra.', 'si elle viendra', 'COD', 3],
  ['Pendant que tu dormais, il a neigé.', 'Pendant que tu dormais', 'CC de temps', 3],
  ['Puisque tu insistes, je viendrai.', 'Puisque tu insistes', 'CC de cause', 3],
  ['Au cas où il pleuvrait, prends un parapluie.', 'Au cas où il pleuvrait', 'CC de condition', 3],
  ['Quoiqu’il soit jeune, il est très prudent.', 'Quoiqu’il soit jeune', 'CC d’opposition', 3],
];
const NOMS_FONCTIONS = ['complément du nom', 'COD', 'CC de temps', 'CC de cause', 'CC de condition', 'CC d’opposition'];

export const fonctionsSubordonnees4e = creerGenerateur({
  id: 'fonctions-subordonnees-4e',
  competence: 'FR-C4-4E-GRAM-02',
  cycle: 4,
  description: 'Identifier la fonction d’une proposition subordonnée relative, complétive ou circonstancielle.',
  generer(a, d) {
    const [phrase, sub, fonction] = a.choisir(FONCTIONS_SUB.filter((f) => f[3] === d));
    return qcm(a, `Dans « ${phrase} », quelle est la fonction de la subordonnée « ${sub} » ?`, fonction,
      a.melanger(NOMS_FONCTIONS.filter((f) => f !== fonction)).slice(0, 3),
      'Une relative complète un nom. Une complétive complète le verbe (COD). Une circonstancielle se déplace et se supprime.',
      fonction === 'complément du nom'
        ? `C’est une relative : elle complète le nom qui la précède. Elle est complément du nom.`
        : fonction === 'COD'
          ? `Elle complète le verbe et ne peut pas être supprimée : elle est COD du verbe.`
          : `Elle peut être déplacée ou supprimée : elle est ${fonction}.`);
  },
});

// ─────────── Compléments circonstanciels d'opposition et de condition, apposition

export const PHRASES_OPP_COND: [string, string, string, 1 | 2 | 3][] = [
  ['Malgré la pluie, nous sommes sortis.', 'Malgré la pluie', 'CC d’opposition', 1],
  ['En cas de pluie, le concert sera annulé.', 'En cas de pluie', 'CC de condition', 1],
  ['Avec un peu de chance, nous gagnerons.', 'Avec un peu de chance', 'CC de condition', 1],
  ['Malgré sa fatigue, il a fini la course.', 'Malgré sa fatigue', 'CC d’opposition', 1],
  ['En dépit du froid, ils se baignent.', 'En dépit du froid', 'CC d’opposition', 1],
  ['En cas d’orage, restez à l’abri.', 'En cas d’orage', 'CC de condition', 1],
  ['Paris, capitale de la France, attire les touristes.', 'capitale de la France', 'apposition', 2],
  ['Fatigués, les randonneurs s’arrêtent.', 'Fatigués', 'apposition', 2],
  ['Sans ton aide, je n’y serais pas arrivé.', 'Sans ton aide', 'CC de condition', 2],
  ['Bien qu’elle soit timide, elle a chanté.', 'Bien qu’elle soit timide', 'CC d’opposition', 2],
  ['Le directeur, très souriant, nous accueille.', 'très souriant', 'apposition', 2],
  ['Sans parapluie, tu seras trempé.', 'Sans parapluie', 'CC de condition', 2],
  ['Mon voisin, un ancien marin, raconte des histoires.', 'un ancien marin', 'apposition', 3],
  ['Si tu travailles, tu réussiras.', 'Si tu travailles', 'CC de condition', 3],
  ['Même s’il pleut, nous irons à la plage.', 'Même s’il pleut', 'CC d’opposition', 3],
  ['Victor Hugo, poète et romancier, est né en 1802.', 'poète et romancier', 'apposition', 3],
  ['Quoique fatiguée, elle a terminé son travail.', 'Quoique fatiguée', 'CC d’opposition', 3],
  ['À condition de partir tôt, nous éviterons les bouchons.', 'À condition de partir tôt', 'CC de condition', 3],
];

export const oppositionCondition4e = creerGenerateur({
  id: 'opposition-condition-4e',
  competence: 'FR-C4-4E-GRAM-03',
  cycle: 4,
  description: 'Identifier les compléments circonstanciels d’opposition et de condition, et la fonction apposition.',
  generer(a, d) {
    const [phrase, groupe, fonction] = a.choisir(PHRASES_OPP_COND.filter((p) => niveaux(d).includes(p[3])));
    return qcm(a, `Dans « ${phrase} », quelle est la fonction de « ${groupe} » ?`, fonction,
      ['CC d’opposition', 'CC de condition', 'apposition', 'CC de cause'].filter((f) => f !== fonction),
      'Opposition : malgré, bien que. Condition : si, en cas de, sans. Apposition : détachée par une virgule, elle caractérise un nom.',
      fonction === 'apposition'
        ? `« ${groupe} » est détaché par des virgules et caractérise un nom de la phrase : c’est une apposition.`
        : fonction === 'CC d’opposition'
          ? `« ${groupe} » exprime un fait qui aurait dû empêcher l’action : c’est un CC d’opposition.`
          : `« ${groupe} » exprime une condition nécessaire à l’action : c’est un CC de condition.`);
  },
});

// ─────────── Interrogative indirecte

/** [question directe, interrogative indirecte, totale ?] */
export const INTERROGATIVES: [string, string, boolean][] = [
  ['« Viens-tu ce soir ? »', 'Je te demande si tu viens ce soir.', true],
  ['« As-tu fini tes devoirs ? »', 'Maman demande si j’ai fini mes devoirs.', true],
  ['« Est-ce que le musée est ouvert ? »', 'Le touriste demande si le musée est ouvert.', true],
  ['« Aimes-tu le chocolat ? »', 'Il me demande si j’aime le chocolat.', true],
  ['« Où habites-tu ? »', 'Il me demande où j’habite.', false],
  ['« Quand partez-vous ? »', 'Elle demande quand nous partons.', false],
  ['« Pourquoi pleures-tu ? »', 'Je lui demande pourquoi il pleure.', false],
  ['« Que veux-tu ? »', 'Il me demande ce que je veux.', false],
  ['« Qui a gagné ? »', 'Nous voulons savoir qui a gagné.', false],
  ['« Combien coute ce livre ? »', 'Le client demande combien coute ce livre.', false],
];

export const interrogativeIndirecte4e = creerGenerateur({
  id: 'interrogative-indirecte-4e',
  competence: 'FR-C4-4E-GRAM-04',
  cycle: 4,
  description: 'Identifier et former une subordonnée interrogative indirecte (totale ou partielle).',
  generer(a, d) {
    const i = a.entier(0, INTERROGATIVES.length - 1);
    const [directe, indirecte, totale] = INTERROGATIVES[i]!;
    if (d === 1) {
      const autres = [`Je demande : ${directe}`, indirecte.replace(/ (si|où|quand|pourquoi|ce que|qui|combien) .*$/, ' une réponse.'), 'Je sais que tu viens ce soir.'];
      return qcm(a, 'Quelle phrase contient une proposition subordonnée interrogative indirecte ?', indirecte, autres,
        'L’interrogative indirecte est une question rapportée, sans point d’interrogation, après un verbe comme demander ou savoir.',
        `« ${indirecte} » rapporte une question, sans point d’interrogation : c’est une interrogative indirecte.`);
    }
    if (d === 2) {
      return qcm(a, `${directe} Quelle phrase rapporte cette question au discours indirect ?`, indirecte,
        [indirecte.replace(/ (si|où|quand|pourquoi|ce que|qui|combien) /, ' que '), `${indirecte.slice(0, -1)} ?`, indirecte.replace(/ (si|où|quand|pourquoi|ce que|qui|combien) /, ' : ')].filter((x) => x !== indirecte),
        'On supprime le point d’interrogation et l’inversion du sujet, on garde le mot interrogatif (ou « si »).',
        `On écrit : ${indirecte}`);
    }
    return qcm(a, `« ${indirecte} » L’interrogation indirecte est-elle totale ou partielle ?`, totale ? 'totale' : 'partielle',
      [totale ? 'partielle' : 'totale', 'ce n’est pas une interrogation'],
      'Totale : on répond par oui ou non, elle commence par « si ». Partielle : elle porte sur un élément (où, quand, qui…).',
      totale
        ? 'Elle commence par « si » et appelle une réponse par oui ou non : interrogation totale.'
        : 'Elle porte sur un élément précis (lieu, moment, cause, objet…) : interrogation partielle.');
  },
});

// ─────────── Temps composés de l'indicatif et conditionnel passé

const AUX_AVOIR: Record<string, string[]> = {
  'plus-que-parfait': ['avais', 'avais', 'avait', 'avions', 'aviez', 'avaient'],
  'passé antérieur': ['eus', 'eus', 'eut', 'eûmes', 'eûtes', 'eurent'],
  'futur antérieur': ['aurai', 'auras', 'aura', 'aurons', 'aurez', 'auront'],
  'conditionnel passé': ['aurais', 'aurais', 'aurait', 'aurions', 'auriez', 'auraient'],
  'passé composé': ['ai', 'as', 'a', 'avons', 'avez', 'ont'],
};
const AUX_ETRE: Record<string, string[]> = {
  'plus-que-parfait': ['étais', 'étais', 'était', 'étions', 'étiez', 'étaient'],
  'passé antérieur': ['fus', 'fus', 'fut', 'fûmes', 'fûtes', 'furent'],
  'futur antérieur': ['serai', 'seras', 'sera', 'serons', 'serez', 'seront'],
  'conditionnel passé': ['serais', 'serais', 'serait', 'serions', 'seriez', 'seraient'],
  'passé composé': ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
};
const PRONOMS = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];
const PARTICIPES_AVOIR = ['chanté', 'fini', 'pris', 'vu', 'écrit', 'lu', 'fait', 'dit', 'mangé', 'compris'];
const PARTICIPES_ETRE = ['parti', 'arrivé', 'venu', 'tombé', 'resté', 'sorti'];

export const tempsComposes4e = creerGenerateur({
  id: 'temps-composes-4e',
  competence: 'FR-C4-4E-CONJ-01',
  cycle: 4,
  description: 'Identifier plus-que-parfait, passé antérieur, futur antérieur et conditionnel passé.',
  generer(a, d) {
    const temps = a.choisir(d === 1 ? ['plus-que-parfait', 'futur antérieur', 'passé composé'] : ['plus-que-parfait', 'passé antérieur', 'futur antérieur', 'conditionnel passé']);
    const r = a.entier(0, 5);
    const etre = d === 3 && a.suivant() < 0.6;
    const aux = (etre ? AUX_ETRE : AUX_AVOIR)[temps]![r]!;
    const pp = etre ? a.choisir(PARTICIPES_ETRE) + (r >= 3 ? 's' : '') : a.choisir(PARTICIPES_AVOIR);
    const sujet = r === 0 && /^[aeéèêiou]/.test(aux) ? 'j’' : `${PRONOMS[r]} `;
    const noms = d === 1 ? ['plus-que-parfait', 'futur antérieur', 'passé composé', 'conditionnel passé'] : ['plus-que-parfait', 'passé antérieur', 'futur antérieur', 'conditionnel passé'];
    const tempsAux: Record<string, string> = { 'plus-que-parfait': 'à l’imparfait', 'passé antérieur': 'au passé simple', 'futur antérieur': 'au futur', 'conditionnel passé': 'au conditionnel présent', 'passé composé': 'au présent' };
    return {
      gabarit: 'qcm',
      consigne: `« ${sujet}${aux} ${pp} » : à quel temps ce verbe est-il conjugué ?`,
      options: a.melanger(noms),
      reponse: temps,
      indice: 'Le temps de l’auxiliaire donne le nom du temps composé.',
      explication: `L’auxiliaire « ${aux} » est ${tempsAux[temps]} : le verbe est au ${temps}.`,
    };
  },
});

// ─────────── Voix active et voix passive

/** [voix active, voix passive] */
export const VOIX: [string, string, 1 | 2 | 3][] = [
  ['Le chat mange la souris.', 'La souris est mangée par le chat.', 1],
  ['Le jardinier arrose les fleurs.', 'Les fleurs sont arrosées par le jardinier.', 1],
  ['Le vent pousse les nuages.', 'Les nuages sont poussés par le vent.', 1],
  ['La maitresse corrige les copies.', 'Les copies sont corrigées par la maitresse.', 1],
  ['Le facteur a distribué les lettres.', 'Les lettres ont été distribuées par le facteur.', 2],
  ['Les pompiers ont éteint l’incendie.', 'L’incendie a été éteint par les pompiers.', 2],
  ['Le maire inaugurera la piscine.', 'La piscine sera inaugurée par le maire.', 2],
  ['Une tempête avait détruit le phare.', 'Le phare avait été détruit par une tempête.', 2],
  ['Tous les élèves admirent ce tableau.', 'Ce tableau est admiré de tous les élèves.', 3],
  ['Le public applaudissait la chanteuse.', 'La chanteuse était applaudie par le public.', 3],
  ['Un chien a mordu le facteur.', 'Le facteur a été mordu par un chien.', 3],
  ['Des bénévoles organiseront la fête.', 'La fête sera organisée par des bénévoles.', 3],
];

export const voixPassive4e = creerGenerateur({
  id: 'voix-passive-4e',
  competence: 'FR-C4-4E-CONJ-02',
  cycle: 4,
  description: 'Identifier la voix passive et transformer une phrase active en phrase passive en gardant le temps.',
  generer(a, d) {
    const choix = VOIX.filter((v) => niveaux(d).includes(v[2]));
    const [active, passive] = a.choisir(choix);
    const autre = a.choisir(VOIX.filter((v) => v[0] !== active));
    if (a.suivant() < 0.3) {
      const passiveDemandee = a.suivant() < 0.5;
      const phrase = passiveDemandee ? passive : active;
      return qcm(a, `« ${phrase} » Cette phrase est-elle à la voix active ou à la voix passive ?`, passiveDemandee ? 'voix passive' : 'voix active',
        [passiveDemandee ? 'voix active' : 'voix passive', 'ni l’une ni l’autre'],
        'À la voix passive, le sujet subit l’action ; le verbe est formé de être + participe passé, souvent suivi de « par ».',
        passiveDemandee ? 'Le sujet subit l’action et le verbe est formé de être + participe passé : voix passive.' : 'Le sujet fait l’action : voix active.');
    }
    // Pièges : temps changé, accord oublié, sujet et complément inversés.
    const tempsChange = passive.replace(/(?<!\p{L})(est|sont|a été|ont été|sera|avait été|était)(?!\p{L})/u, (m) => ({ est: 'a été', sont: 'ont été', 'a été': 'est', 'ont été': 'sont', sera: 'est', 'avait été': 'a été', était: 'est' }[m] ?? m));
    const sansAccord = passive.replace(/(é|i|t)(e|es|s)( par| de)/, '$1$3');
    return qcm(a, `« ${active} » Quelle est la phrase passive correspondante, au même temps ?`, passive,
      [tempsChange, sansAccord, autre[1]].filter((x, i, t) => x !== passive && t.indexOf(x) === i).slice(0, 3),
      'Le COD devient sujet ; on conjugue être au temps du verbe actif, puis on ajoute le participe passé accordé et le complément d’agent.',
      `Le COD devient sujet, être est au même temps que le verbe actif, le participe s’accorde : ${passive}`);
  },
});

// ─────────── Subjonctif présent

/** [infinitif, personne, forme au subjonctif présent, pièges (indicatif, autre)] */
const SUBJONCTIFS: [string, string, string, string[], 1 | 2 | 3][] = [
  ['chanter', 'tu', 'chantes', ['chanterais', 'chantais'], 1], ['finir', 'il', 'finisse', ['finit', 'finira'], 1],
  ['parler', 'nous', 'parlions', ['parlons', 'parlerons'], 1], ['partir', 'tu', 'partes', ['pars', 'partiras'], 1],
  ['jouer', 'vous', 'jouiez', ['jouez', 'jouerez'], 1], ['écrire', 'il', 'écrive', ['écrit', 'écrira'], 1],
  ['être', 'tu', 'sois', ['es', 'seras'], 2], ['avoir', 'il', 'ait', ['a', 'aura'], 2], ['faire', 'nous', 'fassions', ['faisons', 'ferons'], 2],
  ['aller', 'tu', 'ailles', ['vas', 'iras'], 2], ['pouvoir', 'je', 'puisse', ['peux', 'pourrai'], 2], ['savoir', 'vous', 'sachiez', ['savez', 'saurez'], 2],
  ['venir', 'ils', 'viennent', ['venaient', 'viendront'], 3], ['prendre', 'tu', 'prennes', ['prends', 'prendras'], 3],
  ['vouloir', 'il', 'veuille', ['veut', 'voudra'], 3], ['voir', 'nous', 'voyions', ['voyons', 'verrons'], 3],
  ['être', 'nous', 'soyons', ['sommes', 'serons'], 3], ['avoir', 'vous', 'ayez', ['avez', 'aurez'], 3],
];
const AMORCES = ['Il faut que', 'Je veux que', 'Il est important que', 'Bien que', 'Avant que', 'J’aimerais que'];

export const subjonctif4e = creerGenerateur({
  id: 'subjonctif-4e',
  competence: 'FR-C4-4E-CONJ-03',
  cycle: 4,
  description: 'Conjuguer et employer le subjonctif présent après les verbes et conjonctions qui l’imposent.',
  generer(a, d) {
    const [infinitif, personne, forme, pieges] = a.choisir(SUBJONCTIFS.filter((s) => s[4] === d));
    const amorce = a.choisir(AMORCES);
    const sujet = personne === 'je' ? 'je' : personne;
    const lie = /^(il|ils|elle|on)$/.test(sujet) ? `${amorce.replace(/que$/, 'qu’')}${sujet}` : `${amorce} ${sujet}`;
    return qcm(a, `Complète avec le verbe « ${infinitif} » : ${lie} …`, forme, pieges,
      `« ${amorce} » est suivi du subjonctif.`,
      `« ${amorce} » impose le subjonctif. ${infinitif[0]!.toUpperCase()}${infinitif.slice(1)} au subjonctif présent avec « ${personne} » : ${forme}.`);
  },
});

// ─────────── Participes passés : -é, -i, -u, consonne finale muette

/** [infinitif, participe masculin, pièges, féminin] */
const PARTICIPES: [string, string, string[], string][] = [
  ['prendre', 'pris', ['prit', 'pri'], 'prise'], ['mettre', 'mis', ['mit', 'mi'], 'mise'], ['dire', 'dit', ['di', 'dis'], 'dite'],
  ['faire', 'fait', ['fais', 'fé'], 'faite'], ['écrire', 'écrit', ['écris', 'écri'], 'écrite'], ['conduire', 'conduit', ['conduis', 'conduite'], 'conduite'],
  ['peindre', 'peint', ['peins', 'peindu'], 'peinte'], ['finir', 'fini', ['finit', 'finis'], 'finie'], ['suivre', 'suivi', ['suivit', 'suivu'], 'suivie'],
  ['vendre', 'vendu', ['vendit', 'vendi'], 'vendue'], ['courir', 'couru', ['courut', 'couri'], 'courue'], ['offrir', 'offert', ['offri', 'offrit'], 'offerte'],
  ['ouvrir', 'ouvert', ['ouvri', 'ouvrit'], 'ouverte'], ['craindre', 'craint', ['crains', 'craindu'], 'crainte'], ['asseoir', 'assis', ['assit', 'asseu'], 'assise'],
  ['acquérir', 'acquis', ['acquit', 'acquéri'], 'acquise'], ['rire', 'ri', ['rit', 'ris'], 'ri'], ['voir', 'vu', ['vi', 'vit'], 'vue'],
];
/** Phrases d3 : COD féminin placé avant, la consonne muette s'entend. */
const PHRASES_PP: [string, string, string][] = [
  ['La lettre qu’il a … est très longue.', 'écrire', 'écrite'], ['La porte qu’elle a … grince.', 'ouvrir', 'ouverte'],
  ['La décision qu’ils ont … est juste.', 'prendre', 'prise'], ['Cette robe, je l’ai … hier.', 'mettre', 'mise'],
  ['La vérité qu’il a … nous surprend.', 'dire', 'dite'], ['La tarte que tu as … est délicieuse.', 'faire', 'faite'],
  ['La fresque qu’ils ont … est immense.', 'peindre', 'peinte'], ['La voiture qu’elle a … est neuve.', 'conduire', 'conduite'],
  ['Cette maison, ils l’ont … l’an dernier.', 'vendre', 'vendue'], ['La fleur qu’il m’a … est une rose.', 'offrir', 'offerte'],
];

export const participesPasses4e = creerGenerateur({
  id: 'participes-passes-4e',
  competence: 'FR-C4-4E-ORTH-01',
  cycle: 4,
  description: 'Écrire les participes passés en -é, -i, -u et ceux terminés par une consonne muette.',
  generer(a, d) {
    if (d < 3) {
      const [infinitif, pp, pieges, feminin] = a.choisir(d === 1 ? PARTICIPES.slice(0, 9) : PARTICIPES);
      return qcm(a, `Quel est le participe passé masculin singulier de « ${infinitif} » ?`, pp, pieges,
        'Mets le participe au féminin : la consonne finale muette s’entend alors.',
        feminin === pp ? `Le participe passé de « ${infinitif} » est « ${pp} » ; il est invariable.` : `On dit « ${feminin} » au féminin, donc on écrit « ${pp} » au masculin.`);
    }
    const [phrase, infinitif, forme] = a.choisir(PHRASES_PP);
    const masculin = PARTICIPES.find((p) => p[0] === infinitif)![1];
    return qcm(a, `Complète avec le participe passé de « ${infinitif} » : ${phrase}`, forme, [masculin, `${masculin}s`, `${forme}s`],
      'Avec avoir, le participe s’accorde avec le COD placé avant le verbe.',
      `Le COD placé avant est féminin singulier : on écrit « ${forme} ». On entend alors la consonne finale.`);
  },
});

// ─────────── Accord sujet-verbe : pronom relatif sujet, sujet de plusieurs personnes

const ACCORDS_4E: [string, string, string, string[], 1 | 2 | 3][] = [
  ['C’est moi qui … la vaisselle ce soir.', 'faire', 'fais', ['fait', 'font'], 1], ['C’est toi qui … raison.', 'avoir', 'as', ['a', 'ont'], 1],
  ['C’est nous qui … gagné.', 'avoir', 'avons', ['ont', 'a'], 1], ['C’est vous qui … en retard.', 'être', 'êtes', ['sont', 'est'], 1],
  ['C’est moi qui … le premier.', 'arriver', 'arrive', ['arrives', 'arrivent'], 1], ['Ce sont eux qui … le repas.', 'préparer', 'préparent', ['prépare', 'préparez'], 1],
  ['Toi et lui … très bien.', 'danser', 'dansez', ['dansent', 'danse'], 2], ['Lui et moi … au cinéma.', 'aller', 'allons', ['vont', 'va'], 2],
  ['Ta sœur et toi … invités.', 'être', 'êtes', ['sont', 'est'], 2], ['Mes parents et moi … à Lyon.', 'habiter', 'habitons', ['habitent', 'habite'], 2],
  ['Ni toi ni moi ne … la réponse.', 'connaitre', 'connaissons', ['connaissent', 'connait'], 2], ['Elle et toi … la même classe.', 'avoir', 'avez', ['ont', 'a'], 2],
  ['C’est toi et moi qui … ce projet.', 'mener', 'menons', ['mènent', 'mène'], 3], ['Toi qui … tout, explique-moi.', 'savoir', 'sais', ['sait', 'savent'], 3],
  ['Vous qui … si bien, chantez !', 'chanter', 'chantez', ['chantent', 'chante'], 3], ['Moi qui … le chemin, je vous guide.', 'connaitre', 'connais', ['connait', 'connaissent'], 3],
  ['Nous qui … tôt, partons les premiers.', 'se lever', 'nous levons', ['se lèvent', 'se lève'], 3], ['Les enfants qui … dehors sont bruyants.', 'jouer', 'jouent', ['joue', 'jouons'], 3],
];

export const accordsComplexes4e = creerGenerateur({
  id: 'accords-complexes-4e',
  competence: 'FR-C4-4E-ORTH-02',
  cycle: 4,
  description: 'Accorder le verbe avec un pronom relatif sujet et avec un sujet de plusieurs personnes.',
  generer(a, d) {
    const [phrase, infinitif, forme, pieges] = a.choisir(ACCORDS_4E.filter((x) => niveaux(d).includes(x[4])));
    return qcm(a, `Complète avec « ${infinitif} » au présent : ${phrase}`, forme, pieges,
      '« Qui » prend la personne de son antécédent. Plusieurs personnes : moi l’emporte (nous), puis toi (vous).',
      `${/qui/.test(phrase) ? 'Le pronom relatif « qui » a la personne de son antécédent.' : 'Le sujet réunit plusieurs personnes.'} On écrit : ${phrase.replace('…', forme)}`);
  },
});

// ─────────── Participe passé des verbes pronominaux

const PRONOMINAUX: [string, string, string, string[], string][] = [
  ['Elles se sont … ce matin.', 'laver', 'lavées', ['lavé', 'lavés'], '« se » est COD (elles ont lavé elles-mêmes) : accord avec le sujet.'],
  ['Elles se sont … les mains.', 'laver', 'lavé', ['lavées', 'lavés'], 'Le COD est « les mains », placé après : pas d’accord.'],
  ['Ils se sont … au téléphone.', 'parler', 'parlé', ['parlés', 'parlées'], '« se » est COI (parler à quelqu’un) : pas d’accord.'],
  ['Les enfants se sont … dans le jardin.', 'cacher', 'cachés', ['caché', 'cachées'], '« se » est COD : accord avec le sujet, masculin pluriel.'],
  ['Ma sœur s’est … tôt.', 'réveiller', 'réveillée', ['réveillé', 'réveillées'], '« se » est COD : accord avec le sujet, féminin singulier.'],
  ['Elles se sont … des lettres.', 'écrire', 'écrit', ['écrites', 'écrits'], 'Le COD « des lettres » est placé après : pas d’accord.'],
  ['Les deux équipes se sont … la main.', 'serrer', 'serré', ['serrées', 'serrés'], 'Le COD « la main » est placé après : pas d’accord.'],
  ['Mes amies se sont … sur un banc.', 'asseoir', 'assises', ['assis', 'assise'], 'Le verbe est essentiellement pronominal ici : accord avec le sujet.'],
  ['Les voisins se sont … de la fête.', 'souvenir', 'souvenus', ['souvenu', 'souvenues'], '« Se souvenir » est essentiellement pronominal : accord avec le sujet.'],
  ['Elles se sont … des cadeaux.', 'offrir', 'offert', ['offertes', 'offerts'], 'Le COD « des cadeaux » est placé après : pas d’accord.'],
  ['Les filles se sont … pour la fête.', 'maquiller', 'maquillées', ['maquillé', 'maquillés'], '« se » est COD : accord avec le sujet, féminin pluriel.'],
  ['Ils se sont … les dents.', 'brosser', 'brossé', ['brossés', 'brossées'], 'Le COD « les dents » est placé après : pas d’accord.'],
  ['Elles se sont … des secrets.', 'confier', 'confié', ['confiées', 'confiés'], 'Le COD « des secrets » est placé après : pas d’accord.'],
  ['Elles se sont … en se voyant.', 'sourire', 'souri', ['souries', 'souris'], '« se » est COI (sourire à quelqu’un) : pas d’accord.'],
  ['Les oiseaux se sont … au matin.', 'envoler', 'envolés', ['envolé', 'envolées'], '« S’envoler » est essentiellement pronominal : accord avec le sujet.'],
];

export const pronominaux4e = creerGenerateur({
  id: 'pronominaux-4e',
  competence: 'FR-C4-4E-ORTH-03',
  cycle: 4,
  description: 'Découvrir l’accord du participe passé des verbes pronominaux.',
  generer(a, d) {
    // d1 : « se » COD ; d2 : COD placé après ; d3 : COI et verbes essentiellement pronominaux.
    const tranches = [[0, 3, 4, 10], [0, 3, 4, 10, 1, 5, 6, 9, 11, 12], [1, 5, 6, 9, 11, 12, 2, 7, 8, 13, 14]];
    const [phrase, infinitif, forme, pieges, explication] = PRONOMINAUX[a.choisir(tranches[d - 1]!)]!;
    return qcm(a, `Complète avec le participe passé de « ${infinitif} » : ${phrase}`, forme, pieges,
      'Cherche si « se » est COD, COI, ou si un autre COD suit le verbe.',
      `${explication} On écrit : ${phrase.replace('…', forme)}`);
  },
});

// ─────────── Homophones : conjonctions de coordination et leurs homophones

/** [phrase avec …, bonne forme, pièges, explication] */
const HOMOPHONES: [string, string, string[], string][] = [
  ['Il voulait venir, … il était malade.', 'mais', ['mes', 'met'], '« mais » exprime une opposition : on peut le remplacer par « pourtant ».'],
  ['Range … affaires avant de partir.', 'mes', ['mais', 'met'], '« mes » est un déterminant possessif : on peut dire « tes affaires ».'],
  ['Elle … la table pour le diner.', 'met', ['mais', 'mes'], '« met » est le verbe mettre : on peut dire « mettait ».'],
  ['Veux-tu du thé … du café ?', 'ou', ['où', 'houx'], '« ou » marque un choix : on peut dire « ou bien ».'],
  ['La ville … je suis né est petite.', 'où', ['ou', 'houx'], '« où » indique le lieu.'],
  ['Le ciel … gris ce matin.', 'est', ['et', 'ai'], '« est » est le verbe être : on peut dire « était ».'],
  ['Il pleut … il fait froid.', 'et', ['est', 'ai'], '« et » relie deux éléments : on peut dire « et puis ».'],
  ['Il est tard, … tu dors encore.', 'or', ['hors', 'aura'], '« or » introduit un fait qui s’oppose ou relance un raisonnement.'],
  ['Le ballon est sorti … du terrain.', 'hors', ['or', 'aura'], '« hors » signifie « à l’extérieur de ».'],
  ['Prends un pull, … il fait froid.', 'car', ['quart', 'qu’à'], '« car » introduit une cause : on peut dire « parce que ».'],
  ['Il est huit heures et …', 'quart', ['car', 'qu’à'], '« quart » est un nom : un quart d’heure.'],
  ['Il n’aime … le thé ni le café.', 'ni', ['n’y', 'nid'], '« ni » coordonne deux éléments négatifs.'],
  ['Ce lieu est dangereux, ne … va pas.', 'n’y', ['ni', 'nid'], '« n’y » : négation « ne » + pronom « y » (là-bas).'],
  ['Je pense, … je suis.', 'donc', ['don', 'dont'], '« donc » introduit une conséquence.'],
];

export const homophones4e = creerGenerateur({
  id: 'homophones-conjonctions-4e',
  competence: 'FR-C4-4E-VOC-01',
  cycle: 4,
  description: 'Distinguer les conjonctions de coordination de leurs homophones.',
  generer(a, d) {
    const tranches = [[0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5, 6, 9, 10, 13], [5, 6, 9, 10, 7, 8, 11, 12, 13]];
    const [phrase, forme, pieges, explication] = HOMOPHONES[a.choisir(tranches[d - 1]!)]!;
    return qcm(a, `Complète : ${phrase}`, forme, pieges, 'Remplace le mot par un autre de même nature pour vérifier.', `${explication} On écrit : ${phrase.replace('…', forme)}`);
  },
});

// ─────────── Polysémie : sens d'un mot selon le contexte

const POLYSEMIE: [string, string, string, string[], 1 | 2 | 3][] = [
  ['La souris de l’ordinateur ne fonctionne plus.', 'souris', 'un appareil pour déplacer le curseur', ['un petit rongeur', 'un sourire discret'], 1],
  ['Le chat chasse une souris dans la grange.', 'souris', 'un petit rongeur', ['un appareil pour déplacer le curseur', 'un sourire discret'], 1],
  ['Il a reçu une pièce de deux euros.', 'pièce', 'une monnaie en métal', ['une partie d’un logement', 'un texte de théâtre'], 1],
  ['Cet appartement compte trois pièces.', 'pièces', 'des parties d’un logement', ['des monnaies en métal', 'des textes de théâtre'], 1],
  ['Molière a écrit cette pièce en 1666.', 'pièce', 'un texte de théâtre', ['une monnaie en métal', 'une partie d’un logement'], 1],
  ['Il a une grande culture.', 'culture', 'un ensemble de connaissances', ['l’exploitation de la terre', 'un élevage de bactéries'], 2],
  ['La culture du blé demande de l’eau.', 'culture', 'l’exploitation de la terre', ['un ensemble de connaissances', 'une pratique artistique'], 2],
  ['Elle a perdu la tête de colère.', 'la tête', 'son calme, sa raison', ['une partie du corps', 'la première place'], 3],
  ['Notre équipe est en tête du classement.', 'tête', 'la première place', ['une partie du corps', 'le calme, la raison'], 2],
  ['Il a la main verte.', 'verte', 'douée pour le jardinage', ['de couleur verte', 'pas encore mûre'], 3],
  ['Cette banane est encore verte.', 'verte', 'pas encore mûre', ['douée pour le jardinage', 'en colère'], 2],
  ['Le facteur a déposé une lettre.', 'lettre', 'un courrier', ['un signe de l’alphabet', 'la culture littéraire'], 1],
  ['Ce petit restaurant est une perle.', 'perle', 'une chose remarquable', ['une petite bille de nacre', 'une goutte de rosée'], 3],
  ['Le géant avait un cœur de pierre.', 'de pierre', 'insensible', ['fait de roche', 'très lourd'], 3],
  ['Depuis la naissance de sa fille, il nage dans le bonheur.', 'nage', 'est plongé dans', ['se déplace dans l’eau', 'transpire beaucoup'], 3],
];

export const polysemie4e = creerGenerateur({
  id: 'polysemie-4e',
  competence: 'FR-C4-4E-VOC-02',
  cycle: 4,
  description: 'Analyser en contexte le sens d’un mot polysémique.',
  generer(a, d) {
    // d1 : objets concrets ; d2 : sens abstraits ; d3 : sens figurés.
    const [phrase, mot, sens, pieges] = a.choisir(POLYSEMIE.filter((p) => niveaux(d).includes(p[4])));
    return qcm(a, `Dans « ${phrase} », que signifie « ${mot} » ?`, sens, pieges,
      'Un mot polysémique a plusieurs sens : c’est le contexte qui choisit.',
      `Ici, le contexte indique que « ${mot} » signifie : ${sens}.`);
  },
});

// ─────────── Degrés d'intensité

/** Du plus faible au plus fort. */
const ECHELLES: string[][] = [
  ['tiède', 'chaud', 'brûlant'], ['frais', 'froid', 'glacial'], ['content', 'joyeux', 'euphorique'], ['inquiet', 'effrayé', 'terrifié'],
  ['fatigué', 'épuisé', 'exténué'], ['mécontent', 'fâché', 'furieux'], ['bon', 'délicieux', 'exquis'], ['petit', 'minuscule', 'microscopique'],
  ['grand', 'immense', 'gigantesque'], ['murmurer', 'parler', 'hurler'], ['apprécier', 'aimer', 'adorer'], ['ennuyeux', 'pénible', 'insupportable'],
  ['intéressant', 'passionnant', 'captivant'], ['triste', 'malheureux', 'désespéré'], ['sale', 'crasseux', 'répugnant'],
];

export const intensite4e = creerGenerateur({
  id: 'intensite-4e',
  competence: 'FR-C4-4E-VOC-03',
  cycle: 4,
  description: 'Classer des mots par degré d’intensité.',
  generer(a, d) {
    const echelle = a.choisir(ECHELLES);
    if (d < 3) {
      const fort = d === 1;
      const reponse = fort ? echelle[2]! : echelle[0]!;
      return qcm(a, `Quel mot exprime le degré le plus ${fort ? 'fort' : 'faible'} : ${a.melanger(echelle).join(', ')} ?`, reponse,
        echelle.filter((m) => m !== reponse),
        'Imagine une échelle, du plus faible au plus fort.',
        `Du plus faible au plus fort : ${echelle.join(', ')}. Le plus ${fort ? 'fort' : 'faible'} est « ${reponse} ».`);
    }
    const reponse = echelle.join(' < ');
    const [x, y, z] = echelle as [string, string, string];
    return qcm(a, `Range ces mots du plus faible au plus fort : ${a.melanger(echelle).join(', ')}.`, reponse,
      [`${y} < ${x} < ${z}`, `${x} < ${z} < ${y}`, `${z} < ${y} < ${x}`],
      'Commence par le mot le plus faible.',
      `Du plus faible au plus fort : ${reponse}.`);
  },
});
