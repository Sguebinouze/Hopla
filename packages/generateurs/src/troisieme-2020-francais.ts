// 3e, français, programme 2020 (BO n°31 du 30 juillet 2020), notions placées en 3e par les repères annuels de
// progression (BO n°22 du 29 mai 2019). Reprises des générateurs au même périmètre ; générateurs propres pour les
// pronoms indéfinis, interrogatifs et adverbiaux, les subordonnées infinitives et participiales, l'attribut du COD,
// l'ensemble des compléments circonstanciels, le subjonctif imparfait et plus-que-parfait, le mode après une
// conjonction, les verbes falloir et valoir, la modalisation. Toutes les phrases sont rédigées et annotées à la main.
import { erreursDe, creerGenerateur, reprendre } from './outils';
import { fonctionsSubordonnees4e } from './quatrieme-francais';
import {
  accordAdjectif3e, accordPPRelatif3e, accordSujetsComplexes3e, discours3e, pronomRelatif3e, subjonctifPasse3e,
} from './troisieme-francais';
import { connecteurs3e, connotation3e, racines3e, radicaux3e } from './troisieme-lexique';

type Niveau = 1 | 2 | 3;
const niveaux = (d: number): Niveau[] => (d === 1 ? [1] : d === 2 ? [1, 2] : [2, 3]);
const qcm = (a: { melanger: <T>(l: readonly T[]) => T[] }, consigne: string, reponse: string, pieges: string[], indice: string, explication: string,
  code?: (piege: string) => string | undefined) => {
  const options = a.melanger([reponse, ...pieges]);
  return { gabarit: 'qcm' as const, consigne, options, reponse, indice, explication, erreurs: erreursDe(options, reponse, code ? options.map((o) => [o, code(o)] as const) : []) };
};

// ─────────── Reprises

export const pronomRelatif3e2020 = reprendre(pronomRelatif3e, { id: 'pronom-relatif-3e-2020', competence: 'FR-C4-3E-GRAM-51' });
export const fonctionsSubordonnees3e2020 = reprendre(fonctionsSubordonnees4e, { id: 'fonctions-subordonnees-3e-2020', competence: 'FR-C4-3E-GRAM-52' });
export const accordPPRelatif3e2020 = reprendre(accordPPRelatif3e, { id: 'accord-participe-cod-relatif-3e-2020', competence: 'FR-C4-3E-ORTH-51' });
export const accordAdjectif3e2020 = reprendre(accordAdjectif3e, { id: 'accord-adjectif-apposition-3e-2020', competence: 'FR-C4-3E-ORTH-52' });
export const accordSujets3e2020 = reprendre(accordSujetsComplexes3e, { id: 'accord-sujets-complexes-3e-2020', competence: 'FR-C4-3E-ORTH-53' });
export const subjonctifPasse3e2020 = reprendre(subjonctifPasse3e, { id: 'subjonctif-passe-3e-2020', competence: 'FR-C4-3E-CONJ-51' });
export const radicaux3e2020 = reprendre(radicaux3e, { id: 'radicaux-verbaux-3e-2020', competence: 'FR-C4-3E-CONJ-52' });
export const discours3e2020 = reprendre(discours3e, { id: 'discours-indirect-libre-3e-2020', competence: 'FR-C4-3E-DISC-51' });
export const connecteurs3e2020 = reprendre(connecteurs3e, { id: 'connecteurs-logiques-3e-2020', competence: 'FR-C4-3E-DISC-52' });
export const racines3e2020 = reprendre(racines3e, { id: 'racines-savantes-3e-2020', competence: 'FR-C4-3E-VOC-51' });
export const connotation3e2020 = reprendre(connotation3e, { id: 'denotation-connotation-3e-2020', competence: 'FR-C4-3E-VOC-52' });

// ─────────── Pronoms indéfinis, interrogatifs, adverbiaux et relatifs

type Pronom = 'pronom indéfini' | 'pronom interrogatif' | 'pronom adverbial' | 'pronom relatif' | 'pronom personnel';
/** [phrase, pronom, nature, niveau] */
export const PRONOMS: [string, string, Pronom, Niveau][] = [
  ['Quelqu’un a frappé à la porte.', 'Quelqu’un', 'pronom indéfini', 1],
  ['Qui a mangé le gâteau ?', 'Qui', 'pronom interrogatif', 1],
  ['J’en veux encore un peu.', 'en', 'pronom adverbial', 1],
  ['Le livre que je lis est passionnant.', 'que', 'pronom relatif', 1],
  ['Personne n’est venu.', 'Personne', 'pronom indéfini', 1],
  ['Que veux-tu pour ton anniversaire ?', 'Que', 'pronom interrogatif', 1],
  ['Nous y allons demain.', 'y', 'pronom adverbial', 1],
  ['La ville où je suis né est petite.', 'où', 'pronom relatif', 1],
  ['Chacun apporte un plat.', 'Chacun', 'pronom indéfini', 2],
  ['Lequel préfères-tu ?', 'Lequel', 'pronom interrogatif', 2],
  ['Des pommes ? J’en ai acheté trois.', 'en', 'pronom adverbial', 2],
  ['C’est l’ami dont je t’ai parlé.', 'dont', 'pronom relatif', 2],
  ['Rien ne l’arrête.', 'Rien', 'pronom indéfini', 2],
  ['À qui penses-tu ?', 'qui', 'pronom interrogatif', 2],
  ['Ce problème, j’y pense souvent.', 'y', 'pronom adverbial', 2],
  ['Plusieurs sont déjà partis.', 'Plusieurs', 'pronom indéfini', 2],
  ['Je ne sais pas qui viendra.', 'qui', 'pronom interrogatif', 3],
  ['L’homme qui parle est mon oncle.', 'qui', 'pronom relatif', 3],
  ['Tout est prêt pour la fête.', 'Tout', 'pronom indéfini', 3],
  ['Il revient de Lyon ; il en revient ravi.', 'en', 'pronom adverbial', 3],
  ['La table sur laquelle tu écris est bancale.', 'laquelle', 'pronom relatif', 3],
  ['Certains préfèrent la montagne.', 'Certains', 'pronom indéfini', 3],
  ['Je me demande lequel choisir.', 'lequel', 'pronom interrogatif', 3],
  ['Ce jardin, je m’y repose chaque dimanche.', 'y', 'pronom adverbial', 3],
  ['Les amis avec qui je pars sont prêts.', 'qui', 'pronom relatif', 3],
];
const NOMS_PRONOMS: Pronom[] = ['pronom indéfini', 'pronom interrogatif', 'pronom adverbial', 'pronom relatif', 'pronom personnel'];
const EXPLICATIONS_PRONOMS: Record<Pronom, string> = {
  'pronom indéfini': 'il désigne une personne ou une chose de façon vague, sans la préciser : c’est un pronom indéfini',
  'pronom interrogatif': 'il sert à poser une question, directe ou indirecte : c’est un pronom interrogatif',
  'pronom adverbial': 'il remplace un complément introduit par « de » (en) ou par « à » (y) : c’est un pronom adverbial',
  'pronom relatif': 'il reprend un nom placé juste avant lui, son antécédent, et introduit une subordonnée relative : c’est un pronom relatif',
  'pronom personnel': 'c’est un pronom personnel',
};

export const autresPronoms3e2020 = creerGenerateur({
  id: 'pronoms-indefinis-interrogatifs-3e-2020',
  competence: 'FR-C4-3E-GRAM-53',
  cycle: 4,
  description: 'Identifier les pronoms indéfinis, interrogatifs, adverbiaux et relatifs.',
  generer(a, d) {
    const [phrase, pronom, nature] = a.choisir(PRONOMS.filter((x) => niveaux(d).includes(x[3])));
    const pieges = a.melanger(NOMS_PRONOMS.filter((n) => n !== nature)).slice(0, 3);
    return qcm(a, `Dans « ${phrase} », quelle est la nature du pronom « ${pronom} » ?`, nature, pieges,
      'Un pronom relatif a un antécédent juste avant lui. Un pronom interrogatif pose une question. « En » et « y » sont des pronoms adverbiaux.',
      `« ${pronom} » : ${EXPLICATIONS_PRONOMS[nature]}.`,
      (o) => (['pronom relatif', 'pronom interrogatif'].includes(o) && ['pronom relatif', 'pronom interrogatif'].includes(nature) ? 'relatif-interrogatif-confondus' : 'classe-grammaticale-confondue'));
  },
});

// ─────────── Subordonnées infinitives et participiales

type Sub = 'subordonnée infinitive' | 'subordonnée participiale' | 'subordonnée relative' | 'subordonnée conjonctive';
/** [phrase, subordonnée, nature, niveau] */
export const SUBORDONNEES: [string, string, Sub, Niveau][] = [
  ['J’entends les oiseaux chanter.', 'les oiseaux chanter', 'subordonnée infinitive', 1],
  ['J’entends les oiseaux qui chantent.', 'qui chantent', 'subordonnée relative', 1],
  ['Je regarde la pluie tomber.', 'la pluie tomber', 'subordonnée infinitive', 1],
  ['Je vois que la pluie tombe.', 'que la pluie tombe', 'subordonnée conjonctive', 1],
  ['Il voit les enfants jouer dans la cour.', 'les enfants jouer dans la cour', 'subordonnée infinitive', 1],
  ['Elle sent son cœur battre très fort.', 'son cœur battre très fort', 'subordonnée infinitive', 1],
  ['Le travail terminé, ils rentrèrent chez eux.', 'Le travail terminé', 'subordonnée participiale', 2],
  ['Nous écoutons le vent souffler.', 'le vent souffler', 'subordonnée infinitive', 2],
  ['La nuit tombant, les rues se vident.', 'La nuit tombant', 'subordonnée participiale', 2],
  ['Les vacances finies, chacun reprend le travail.', 'Les vacances finies', 'subordonnée participiale', 2],
  ['Je sais que les vacances sont finies.', 'que les vacances sont finies', 'subordonnée conjonctive', 2],
  ['Je laisse le chat sortir.', 'le chat sortir', 'subordonnée infinitive', 2],
  ['La pluie ayant cessé, nous sommes sortis.', 'La pluie ayant cessé', 'subordonnée participiale', 3],
  ['Son père parti, l’enfant se mit à pleurer.', 'Son père parti', 'subordonnée participiale', 3],
  ['Les spectateurs regardaient les acrobates s’envoler.', 'les acrobates s’envoler', 'subordonnée infinitive', 3],
  ['Le repas fini, les invités passèrent au salon.', 'Le repas fini', 'subordonnée participiale', 3],
  ['Les invités que nous attendions sont arrivés.', 'que nous attendions', 'subordonnée relative', 3],
  ['Dieu aidant, nous réussirons.', 'Dieu aidant', 'subordonnée participiale', 3],
  ['J’ai vu le soleil se lever sur la mer.', 'le soleil se lever sur la mer', 'subordonnée infinitive', 3],
];
const NOMS_SUB: Sub[] = ['subordonnée infinitive', 'subordonnée participiale', 'subordonnée relative', 'subordonnée conjonctive'];

export const infinitivesParticipiales3e2020 = creerGenerateur({
  id: 'infinitives-participiales-3e-2020',
  competence: 'FR-C4-3E-GRAM-54',
  cycle: 4,
  description: 'Identifier les subordonnées infinitives et participiales, et les distinguer des relatives et des conjonctives.',
  generer(a, d) {
    const [phrase, sub, nature] = a.choisir(SUBORDONNEES.filter((x) => niveaux(d).includes(x[3])));
    const explication: Record<Sub, string> = {
      'subordonnée infinitive': `« ${sub} » a son propre sujet et un verbe à l’infinitif, après un verbe de perception ou « laisser » : c’est une subordonnée infinitive.`,
      'subordonnée participiale': `« ${sub} » a son propre sujet et un verbe au participe ; elle est détachée en tête de phrase : c’est une subordonnée participiale.`,
      'subordonnée relative': `« ${sub} » commence par un pronom relatif qui reprend un nom : c’est une subordonnée relative.`,
      'subordonnée conjonctive': `« ${sub} » commence par la conjonction « que » et complète le verbe : c’est une subordonnée conjonctive.`,
    };
    return qcm(a, `Dans « ${phrase} », quelle est la nature de la proposition « ${sub} » ?`, nature, NOMS_SUB.filter((n) => n !== nature),
      'Infinitive : sujet propre et verbe à l’infinitif. Participiale : sujet propre et verbe au participe. Relative et conjonctive commencent par un mot subordonnant.',
      explication[nature], () => 'fonction-grammaticale-confondue');
  },
});

// ─────────── Attribut du COD

type FonctionAttr = 'attribut du COD' | 'attribut du sujet' | 'épithète' | 'COD';
/** [phrase, groupe, fonction, niveau] */
export const ATTRIBUTS_COD: [string, string, FonctionAttr, Niveau][] = [
  ['Je trouve ce film drôle.', 'drôle', 'attribut du COD', 1],
  ['Ce film est drôle.', 'drôle', 'attribut du sujet', 1],
  ['J’ai vu un film drôle.', 'drôle', 'épithète', 1],
  ['On l’a élu délégué.', 'délégué', 'attribut du COD', 1],
  ['Il est devenu délégué.', 'délégué', 'attribut du sujet', 1],
  ['Ils ont nommé Paul capitaine.', 'capitaine', 'attribut du COD', 1],
  ['Nous avons repeint la cuisine.', 'la cuisine', 'COD', 1],
  ['Nous avons repeint la cuisine en jaune.', 'en jaune', 'attribut du COD', 2],
  ['Elle juge cet exercice facile.', 'facile', 'attribut du COD', 2],
  ['Cet exercice semble facile.', 'facile', 'attribut du sujet', 2],
  ['Elle a choisi un exercice facile.', 'facile', 'épithète', 2],
  ['Le jury l’a déclaré vainqueur.', 'vainqueur', 'attribut du COD', 2],
  ['Je le croyais malade.', 'malade', 'attribut du COD', 2],
  ['Il parait malade.', 'malade', 'attribut du sujet', 2],
  ['On considère ce peintre comme un génie.', 'comme un génie', 'attribut du COD', 3],
  ['Ses amis l’appellent Toto.', 'Toto', 'attribut du COD', 3],
  ['Cette nouvelle rend Léa heureuse.', 'heureuse', 'attribut du COD', 3],
  ['Léa reste heureuse.', 'heureuse', 'attribut du sujet', 3],
  ['J’ai rencontré une fille heureuse.', 'heureuse', 'épithète', 3],
  ['Les habitants ont élu cette femme maire.', 'maire', 'attribut du COD', 3],
  ['Le peintre a repeint la porte.', 'la porte', 'COD', 3],
  ['Tout le monde trouvait la sortie dangereuse.', 'dangereuse', 'attribut du COD', 3],
];
const NOMS_ATTR: FonctionAttr[] = ['attribut du COD', 'attribut du sujet', 'épithète', 'COD'];

export const attributCod3e2020 = creerGenerateur({
  id: 'attribut-cod-3e-2020',
  competence: 'FR-C4-3E-GRAM-55',
  cycle: 4,
  description: 'Identifier l’attribut du COD et le distinguer de l’attribut du sujet, de l’épithète et du COD.',
  generer(a, d) {
    const [phrase, groupe, fonction] = a.choisir(ATTRIBUTS_COD.filter((x) => niveaux(d).includes(x[3])));
    const explication: Record<FonctionAttr, string> = {
      'attribut du COD': `« ${groupe} » donne une caractéristique au COD, par l’intermédiaire du verbe : c’est un attribut du COD.`,
      'attribut du sujet': `« ${groupe} » donne une caractéristique au sujet, après un verbe d’état : c’est un attribut du sujet.`,
      'épithète': `« ${groupe} » est placé contre le nom, dans le même groupe nominal : il est épithète.`,
      'COD': `« ${groupe} » complète le verbe sans préposition : c’est le COD.`,
    };
    return qcm(a, `Dans « ${phrase} », quelle est la fonction de « ${groupe} » ?`, fonction, NOMS_ATTR.filter((n) => n !== fonction),
      'L’attribut du COD reste quand on remplace le COD par un pronom : « Je le trouve drôle ». L’épithète, elle, disparait avec le nom.',
      explication[fonction], () => 'fonction-grammaticale-confondue');
  },
});

// ─────────── Tous les compléments circonstanciels

type CC = 'CC de temps' | 'CC de lieu' | 'CC de manière' | 'CC de moyen' | 'CC de cause' | 'CC de conséquence' | 'CC de but'
  | 'CC d’opposition' | 'CC de condition' | 'CC de comparaison';
/** [phrase, complément, sens, niveau] */
export const CIRCONSTANCIELS: [string, string, CC, Niveau][] = [
  ['Demain, nous partirons en vacances.', 'Demain', 'CC de temps', 1],
  ['Les enfants jouent dans le jardin.', 'dans le jardin', 'CC de lieu', 1],
  ['Il conduit avec prudence.', 'avec prudence', 'CC de manière', 1],
  ['Elle voyage en train.', 'en train', 'CC de moyen', 1],
  ['Le match est reporté à cause de la pluie.', 'à cause de la pluie', 'CC de cause', 1],
  ['Nous partirons quand le soleil se lèvera.', 'quand le soleil se lèvera', 'CC de temps', 1],
  ['Il ouvre la boite avec un couteau.', 'avec un couteau', 'CC de moyen', 1],
  ['Elle est entrée sans bruit.', 'sans bruit', 'CC de manière', 1],
  ['Il s’entraine pour gagner.', 'pour gagner', 'CC de but', 2],
  ['Malgré la fatigue, il a terminé la course.', 'Malgré la fatigue', 'CC d’opposition', 2],
  ['Si tu viens, nous jouerons aux cartes.', 'Si tu viens', 'CC de condition', 2],
  ['Il a tant couru qu’il est épuisé.', 'qu’il est épuisé', 'CC de conséquence', 2],
  ['Il court comme un lapin.', 'comme un lapin', 'CC de comparaison', 2],
  ['Puisqu’il pleut, nous restons ici.', 'Puisqu’il pleut', 'CC de cause', 2],
  ['En cas d’orage, rentrez vite.', 'En cas d’orage', 'CC de condition', 2],
  ['Bien qu’elle soit fatiguée, elle continue.', 'Bien qu’elle soit fatiguée', 'CC d’opposition', 2],
  ['Il parle doucement afin que le bébé dorme.', 'afin que le bébé dorme', 'CC de but', 3],
  ['Elle chante ainsi que le faisait sa mère.', 'ainsi que le faisait sa mère', 'CC de comparaison', 3],
  ['À condition de partir tôt, nous arriverons à l’heure.', 'À condition de partir tôt', 'CC de condition', 3],
  ['Le vent soufflait si fort que les tuiles s’envolaient.', 'que les tuiles s’envolaient', 'CC de conséquence', 3],
  ['Alors que tout le monde dormait, il travaillait encore.', 'Alors que tout le monde dormait', 'CC d’opposition', 3],
  ['Faute d’argent, il a renoncé au voyage.', 'Faute d’argent', 'CC de cause', 3],
  ['Il a réparé la chaise à l’aide d’un marteau.', 'à l’aide d’un marteau', 'CC de moyen', 3],
  ['Il se bat tel un lion.', 'tel un lion', 'CC de comparaison', 3],
  ['Au fond de la vallée coule une rivière.', 'Au fond de la vallée', 'CC de lieu', 3],
  ['Dès que la cloche sonne, les élèves sortent.', 'Dès que la cloche sonne', 'CC de temps', 3],
];
const NOMS_CC: CC[] = ['CC de temps', 'CC de lieu', 'CC de manière', 'CC de moyen', 'CC de cause', 'CC de conséquence', 'CC de but', 'CC d’opposition', 'CC de condition', 'CC de comparaison'];
const QUESTIONS_CC: Record<CC, string> = {
  'CC de temps': 'quand ?', 'CC de lieu': 'où ?', 'CC de manière': 'comment ?', 'CC de moyen': 'avec quoi, par quel moyen ?',
  'CC de cause': 'pourquoi ?', 'CC de conséquence': 'avec quel résultat ?', 'CC de but': 'dans quelle intention ?',
  'CC d’opposition': 'malgré quoi ?', 'CC de condition': 'à quelle condition ?', 'CC de comparaison': 'comme qui, comme quoi ?',
};

export const circonstanciels3e2020 = creerGenerateur({
  id: 'complements-circonstanciels-3e-2020',
  competence: 'FR-C4-3E-GRAM-56',
  cycle: 4,
  description: 'Identifier tous les compléments circonstanciels : temps, lieu, manière, moyen, cause, conséquence, but, opposition, condition, comparaison.',
  generer(a, d) {
    const [phrase, complement, sens] = a.choisir(CIRCONSTANCIELS.filter((x) => niveaux(d).includes(x[3])));
    const pieges = a.melanger(NOMS_CC.filter((n) => n !== sens)).slice(0, 3);
    return qcm(a, `Dans « ${phrase} », quel est le sens du complément circonstanciel « ${complement} » ?`, sens, pieges,
      'Pose la bonne question : quand ? où ? comment ? pourquoi ? dans quel but ? malgré quoi ? à quelle condition ?',
      `« ${complement} » répond à la question « ${QUESTIONS_CC[sens]} » : c’est un ${sens}.`, () => 'fonction-grammaticale-confondue');
  },
});

// ─────────── Subjonctif imparfait et plus-que-parfait

type TempsSubj = 'subjonctif imparfait' | 'subjonctif plus-que-parfait' | 'subjonctif présent' | 'subjonctif passé' | 'passé simple' | 'plus-que-parfait de l’indicatif';
/** [phrase, forme, temps, niveau] */
export const SUBJ_IMPARFAITS: [string, string, TempsSubj, Niveau][] = [
  ['Il fallait qu’il partît.', 'partît', 'subjonctif imparfait', 1],
  ['Je voulais qu’elle vînt.', 'vînt', 'subjonctif imparfait', 1],
  ['Bien qu’il eût fini, il resta.', 'eût fini', 'subjonctif plus-que-parfait', 1],
  ['Il partit à l’aube.', 'partit', 'passé simple', 1],
  ['Il faut qu’il parte.', 'parte', 'subjonctif présent', 1],
  ['Il faut qu’il soit parti avant midi.', 'soit parti', 'subjonctif passé', 1],
  ['Il partit avant qu’elle fût arrivée.', 'fût arrivée', 'subjonctif plus-que-parfait', 2],
  ['Elle avait fini avant nous.', 'avait fini', 'plus-que-parfait de l’indicatif', 2],
  ['Je craignais qu’il ne plût.', 'plût', 'subjonctif imparfait', 2],
  ['Il fallait que nous chantassions.', 'chantassions', 'subjonctif imparfait', 2],
  ['Quoiqu’elle eût vu le danger, elle avança.', 'eût vu', 'subjonctif plus-que-parfait', 2],
  ['Il vint nous voir.', 'vint', 'passé simple', 2],
  ['Il fallait qu’il eût du courage.', 'eût', 'subjonctif imparfait', 3],
  ['Il eut du courage.', 'eut', 'passé simple', 3],
  ['On attendit qu’il fût parti.', 'fût parti', 'subjonctif plus-que-parfait', 3],
  ['Il était parti depuis longtemps.', 'était parti', 'plus-que-parfait de l’indicatif', 3],
  ['Le roi ordonna qu’on le servît.', 'servît', 'subjonctif imparfait', 3],
  ['Je doute qu’il ait compris.', 'ait compris', 'subjonctif passé', 3],
];
const NOMS_SUBJ: TempsSubj[] = ['subjonctif imparfait', 'subjonctif plus-que-parfait', 'subjonctif présent', 'subjonctif passé', 'passé simple', 'plus-que-parfait de l’indicatif'];

export const subjonctifImparfait3e2020 = creerGenerateur({
  id: 'subjonctif-imparfait-3e-2020',
  competence: 'FR-C4-3E-CONJ-53',
  cycle: 4,
  description: 'Identifier le subjonctif imparfait et le subjonctif plus-que-parfait, et les distinguer du passé simple.',
  generer(a, d) {
    const [phrase, forme, temps] = a.choisir(SUBJ_IMPARFAITS.filter((x) => niveaux(d).includes(x[3])));
    const base = (['subjonctif imparfait', 'subjonctif plus-que-parfait', 'passé simple'] as TempsSubj[]).filter((t) => t !== temps);
    const pieges = [...base, ...a.melanger(NOMS_SUBJ.filter((t) => t !== temps && !base.includes(t)))].slice(0, 3);
    const explication: Record<TempsSubj, string> = {
      'subjonctif imparfait': 'forme simple, avec l’accent circonflexe à la 3e personne du singulier ou les finales en -ss- : subjonctif imparfait',
      'subjonctif plus-que-parfait': 'auxiliaire au subjonctif imparfait (eût, fût) et participe passé : subjonctif plus-que-parfait',
      'subjonctif présent': 'forme simple après « que », dans une phrase au présent : subjonctif présent',
      'subjonctif passé': 'auxiliaire au subjonctif présent (ait, soit) et participe passé : subjonctif passé',
      'passé simple': 'forme simple sans accent circonflexe, dans une proposition principale : passé simple',
      'plus-que-parfait de l’indicatif': 'auxiliaire à l’imparfait de l’indicatif et participe passé : plus-que-parfait de l’indicatif',
    };
    return qcm(a, `Dans « ${phrase} », à quel temps est la forme verbale « ${forme} » ?`, temps, pieges,
      'Au subjonctif imparfait, la 3e personne du singulier prend un accent circonflexe : qu’il fût, qu’il eût, qu’il partît.',
      `« ${forme} » : ${explication[temps]}.`, (o) => (o.startsWith('subjonctif') !== temps.startsWith('subjonctif') ? 'subjonctif-indicatif' : undefined));
  },
});

// ─────────── Mode après une conjonction de subordination

/** [phrase avec …, verbe, forme attendue, autres formes, niveau] */
export const MODES_CONJONCTION: [string, string, string, string[], Niveau][] = [
  ['Bien qu’il … froid, nous sortons.', 'faire', 'fasse', ['fait', 'fera']],
  ['Nous sortons parce qu’il … beau.', 'faire', 'fait', ['fasse', 'fera']],
  ['Je t’explique la règle pour que tu … mieux.', 'comprendre', 'comprennes', ['comprends', 'comprendras']],
  ['Range ta chambre avant que ta mère … te voir.', 'venir', 'vienne', ['vient', 'viendra']],
  ['Pendant que tu …, je fais la vaisselle.', 'dormir', 'dors', ['dormes', 'dormiras']],
  ['Puisque tu … là, aide-moi.', 'être', 'es', ['sois', 'seras']],
  ['Je viendrai à condition que tu … là.', 'être', 'sois', ['es', 'seras']],
  ['Il se cache de crainte qu’on le … dans la rue.', 'voir', 'voie', ['voit', 'verra']],
  ['Elle est partie sans que nous … pourquoi.', 'savoir', 'sachions', ['savons', 'saurons']],
  ['Alors que tout le monde …, il travaille.', 'dormir', 'dort', ['dorme', 'dormira']],
  ['Dès que le film …, nous partirons.', 'finir', 'finit', ['finisse', 'finissait']],
  ['Afin que vous … à l’heure, partez tôt.', 'arriver', 'arriviez', ['arrivez', 'arriverez']],
  ['Quoiqu’il … riche, il vit simplement.', 'être', 'soit', ['est', 'sera']],
  ['Il est resté si longtemps que nous … partis sans lui.', 'être', 'sommes', ['soyons', 'serons']],
  ['Après qu’il … parti, nous avons rangé.', 'être', 'est', ['soit', 'sera']],
  ['Je te prête ce livre pour que tu le … pendant les vacances.', 'lire', 'lises', ['lis', 'liras']],
  ['Tandis que Léa …, Tom dessine.', 'lire', 'lit', ['lise', 'lira']],
].map(([p, v, f, o], i) => [p, v, f, o, (i < 8 ? 1 : i < 13 ? 2 : 3)] as [string, string, string, string[], Niveau]);

export const modeConjonction3e2020 = creerGenerateur({
  id: 'mode-apres-conjonction-3e-2020',
  competence: 'FR-C4-3E-CONJ-54',
  cycle: 4,
  description: 'Choisir le mode du verbe après une conjonction de subordination : subjonctif (bien que, pour que…) ou indicatif (parce que, après que…).',
  generer(a, d) {
    const [phrase, verbe, forme, autres] = a.choisir(MODES_CONJONCTION.filter((x) => niveaux(d).includes(x[4])));
    const conjonction = phrase.match(/(bien qu|parce qu|pour que|avant qu|pendant que|puisque|à condition que|de crainte qu|sans que|alors que|dès que|afin que|quoiqu|si longtemps que|après qu|tandis que)/i)?.[1] ?? '';
    return qcm(a, `Complète avec le verbe « ${verbe} » au mode qui convient : ${phrase}`, forme, autres,
      'Bien que, pour que, avant que, afin que, sans que, à condition que, de crainte que : subjonctif. Parce que, pendant que, puisque, dès que, après que : indicatif.',
      `Après « ${conjonction.toLowerCase()}${/qu$/i.test(conjonction) ? 'e' : ''} », on emploie le ${/(bien qu|pour que|avant qu|à condition que|de crainte qu|sans que|afin que|quoiqu)/i.test(conjonction) ? 'subjonctif' : 'mode indicatif'} : « ${forme} ».`,
      () => 'subjonctif-indicatif');
  },
});

// ─────────── Falloir et valoir

/** [phrase avec …, verbe, temps, forme attendue, pièges, niveau] */
export const FALLOIR_VALOIR: [string, string, string, string, string[], Niveau][] = [
  ['Il … partir tôt demain matin.', 'falloir', 'futur', 'faudra', ['fallera', 'faudrait', 'faut']],
  ['Hier, il … attendre une heure.', 'falloir', 'imparfait', 'fallait', ['faulait', 'faudrait', 'fallut']],
  ['Ce tableau … très cher aujourd’hui.', 'valoir', 'présent', 'vaut', ['vaux', 'valent', 'valoit']],
  ['Ces bijoux … une fortune.', 'valoir', 'présent', 'valent', ['vaut', 'vallent', 'vaulent']],
  ['Je ne … rien aux échecs.', 'valoir', 'présent', 'vaux', ['vaut', 'vale', 'valois']],
  ['Il … mieux se taire.', 'valoir', 'présent', 'vaut', ['vaux', 'faut', 'vaudra']],
  ['Il … du courage pour continuer.', 'falloir', 'présent', 'faut', ['faux', 'fault', 'fallait']],
  ['Dans dix ans, cette maison … le double.', 'valoir', 'futur', 'vaudra', ['valera', 'vaudrait', 'vaudera']],
  ['À ta place, il … mieux partir maintenant.', 'valoir', 'conditionnel présent', 'vaudrait', ['valerait', 'vaudra', 'vaudait']],
  ['Si tu avais un vélo, il ne … plus prendre le bus.', 'falloir', 'conditionnel présent', 'faudrait', ['fallerait', 'faudra', 'faudait']],
  ['Il … deux heures pour tout ranger.', 'falloir', 'passé simple', 'fallut', ['falla', 'fallit', 'faudrut']],
  ['Ce but nous a … la victoire.', 'valoir', 'participe passé', 'valu', ['valé', 'vallu', 'valut']],
  ['Il a … tout recommencer.', 'falloir', 'participe passé', 'fallu', ['fallé', 'falu', 'fallut']],
  ['Je doute qu’il … la peine d’insister.', 'valoir', 'subjonctif présent', 'vaille', ['vale', 'vaut', 'valle']],
  ['Je regrette qu’il … tout refaire.', 'falloir', 'subjonctif présent', 'faille', ['falle', 'faut', 'faudrait']],
  ['Autrefois, ce terrain ne … presque rien.', 'valoir', 'imparfait', 'valait', ['vallait', 'vaudrait', 'vaulait']],
  ['Il … que tu viennes, même en retard.', 'falloir', 'conditionnel présent', 'faudrait', ['faudra', 'fallait', 'faut']],
  ['Bien que cette voiture … cher, je l’achète.', 'valoir', 'subjonctif présent', 'vaille', ['vaut', 'vaudra', 'vale']],
].map(([p, v, t, f, o], i) => [p, v, t, f, o, (i < 7 ? 1 : i < 13 ? 2 : 3)] as [string, string, string, string, string[], Niveau]);

export const falloirValoir3e2020 = creerGenerateur({
  id: 'falloir-valoir-3e-2020',
  competence: 'FR-C4-3E-CONJ-55',
  cycle: 4,
  description: 'Conjuguer les verbes falloir et valoir aux temps étudiés.',
  generer(a, d) {
    const [phrase, verbe, temps, forme, pieges] = a.choisir(FALLOIR_VALOIR.filter((x) => niveaux(d).includes(x[5])));
    const au = (t: string) => (/^[aeiouéèêi]/.test(t) ? `à l’${t}` : `au ${t}`);
    return qcm(a, `Complète avec le verbe « ${verbe} » ${au(temps)} : ${phrase}`, forme, pieges,
      verbe === 'falloir'
        ? '« Falloir » ne se conjugue qu’avec « il » : il faut, il fallait, il faudra, il faudrait, qu’il faille, il a fallu.'
        : '« Valoir » : je vaux, il vaut, ils valent ; futur en vaud- (il vaudra) ; subjonctif : qu’il vaille.',
      `${au(temps).replace(/^à/, 'À').replace(/^au/, 'Au')}, « ${verbe} » donne « ${forme} ».`, () => 'radical-verbe');
  },
});

// ─────────── Modalisation

type Modalite = 'une certitude' | 'un doute ou une probabilité' | 'un jugement favorable' | 'un jugement défavorable' | 'une information non confirmée';
/** [phrase, marque, modalité, niveau] */
export const MODALISATIONS: [string, string, Modalite, Niveau][] = [
  ['Il viendra sans doute demain.', 'sans doute', 'un doute ou une probabilité', 1],
  ['Il est certain que nous gagnerons.', 'certain', 'une certitude', 1],
  ['Heureusement, personne n’a été blessé.', 'Heureusement', 'un jugement favorable', 1],
  ['Malheureusement, le spectacle est annulé.', 'Malheureusement', 'un jugement défavorable', 1],
  ['Peut-être a-t-il oublié notre rendez-vous.', 'Peut-être', 'un doute ou une probabilité', 1],
  ['Évidemment, tu as raison.', 'Évidemment', 'une certitude', 1],
  ['Ce magnifique spectacle a ravi le public.', 'magnifique', 'un jugement favorable', 1],
  ['Selon la radio, le ministre démissionnerait.', 'démissionnerait', 'une information non confirmée', 2],
  ['Ce prétendu expert se trompe souvent.', 'prétendu', 'un jugement défavorable', 2],
  ['Il semble que la pluie s’arrête.', 'Il semble que', 'un doute ou une probabilité', 2],
  ['Je suis sûr qu’elle réussira.', 'sûr', 'une certitude', 2],
  ['Ce film médiocre m’a ennuyé.', 'médiocre', 'un jugement défavorable', 2],
  ['Probablement, il est déjà parti.', 'Probablement', 'un doute ou une probabilité', 2],
  ['Ce délicieux gâteau a disparu en un instant.', 'délicieux', 'un jugement favorable', 2],
  ['D’après des témoins, le voleur aurait fui par le toit.', 'aurait fui', 'une information non confirmée', 3],
  ['Sans aucun doute, c’est le meilleur joueur.', 'Sans aucun doute', 'une certitude', 3],
  ['Il est possible que le train ait du retard.', 'possible', 'un doute ou une probabilité', 3],
  ['Ce soi-disant champion a perdu dès le premier tour.', 'soi-disant', 'un jugement défavorable', 3],
  ['Le président se rendrait en Chine la semaine prochaine.', 'se rendrait', 'une information non confirmée', 3],
  ['Indéniablement, ce roman est une réussite.', 'Indéniablement', 'une certitude', 3],
  ['Elle a eu la chance de rencontrer cette remarquable chercheuse.', 'remarquable', 'un jugement favorable', 3],
];
const NOMS_MODALITES: Modalite[] = ['une certitude', 'un doute ou une probabilité', 'un jugement favorable', 'un jugement défavorable', 'une information non confirmée'];

export const modalisation3e2020 = creerGenerateur({
  id: 'modalisation-3e-2020',
  competence: 'FR-C4-3E-VOC-53',
  cycle: 4,
  description: 'Repérer et interpréter les marques de modalisation : certitude, doute, jugement, information non confirmée.',
  generer(a, d) {
    const [phrase, marque, modalite] = a.choisir(MODALISATIONS.filter((x) => niveaux(d).includes(x[3])));
    const pieges = a.melanger(NOMS_MODALITES.filter((n) => n !== modalite)).slice(0, 3);
    return qcm(a, `Dans « ${phrase} », qu’exprime « ${marque} » ?`, modalite, pieges,
      'Un modalisateur montre le point de vue de celui qui parle : est-il sûr, hésitant, admiratif, critique ? Le conditionnel peut signaler une information non vérifiée.',
      `« ${marque} » exprime ${modalite} de la part de celui qui parle ou écrit.`, () => 'modalisation-confondue');
  },
});

export const GENERATEURS_TROISIEME_2020_FRANCAIS = [
  pronomRelatif3e2020, fonctionsSubordonnees3e2020, autresPronoms3e2020, infinitivesParticipiales3e2020, attributCod3e2020,
  circonstanciels3e2020, subjonctifPasse3e2020, radicaux3e2020, subjonctifImparfait3e2020, modeConjonction3e2020,
  falloirValoir3e2020, accordPPRelatif3e2020, accordAdjectif3e2020, accordSujets3e2020, discours3e2020, connecteurs3e2020,
  racines3e2020, connotation3e2020, modalisation3e2020,
];
