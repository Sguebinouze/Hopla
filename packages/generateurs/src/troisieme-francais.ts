// 3e, français (programme 2026) : phrase emphatique, pronom relatif, discours indirect libre, subjonctif passé,
// identification des temps, valeurs du conditionnel, accord du participe passé avec un COD relatif, accord sujet-verbe
// (pronom collectif ou distributif, complément du nom), accord de l'adjectif selon sa fonction.
// Source : programme de français du cycle 4 (arrêté du 18 février 2026, BO n°10 du 5 mars 2026), p. 32 et 33.
// Toutes les phrases sont rédigées et annotées à la main.
import { confusionTemps } from './erreurs';
import { creerGenerateur, erreursDe } from './outils';

/** Corpus par niveau : d1 → niveau 1 ; d2 → niveaux 1 et 2 ; d3 → niveaux 2 et 3. */
const niveaux = (d: number) => (d === 1 ? [1] : d === 2 ? [1, 2] : [2, 3]);
type Niveau = 1 | 2 | 3;
/** QCM à options rédigées ; `code` qualifie un piège qui révèle une erreur typique (voir `ERREURS`). */
const qcm = (a: { melanger: <T>(l: readonly T[]) => T[] }, consigne: string, reponse: string, pieges: string[], indice: string, explication: string,
  code?: (piege: string) => string | undefined) => {
  const options = a.melanger([reponse, ...pieges.filter((p, i, t) => p !== reponse && t.indexOf(p) === i)]);
  return { gabarit: 'qcm' as const, consigne, options, reponse, indice, explication, erreurs: erreursDe(options, reponse, code ? options.map((o) => [o, code(o)] as const) : []) };
};

// ─────────── Phrase emphatique

const PRESENTATIF = 'tournure présentative (c’est… qui, c’est… que)';
const TETE = 'détachement en tête de phrase';
const FIN = 'détachement en fin de phrase';
const NEUTRE = 'aucune : phrase neutre';
export const EMPHASES: [string, string, Niveau][] = [
  ['C’est Léa qui a gagné la course.', PRESENTATIF, 1], ['Ce livre, je l’ai lu deux fois.', TETE, 1],
  ['Je l’adore, cette chanson.', FIN, 1], ['Léa a gagné la course.', NEUTRE, 1],
  ['C’est à Lyon que nous habitons.', PRESENTATIF, 1], ['Mon frère, il ne range jamais sa chambre.', TETE, 1],
  ['Elle est magnifique, ta robe.', FIN, 1], ['Nous avons visité le musée hier.', NEUTRE, 1],
  ['C’est demain que les résultats seront affichés.', PRESENTATIF, 2], ['Les maths, ça me plait beaucoup.', TETE, 2],
  ['Tu y penses souvent, à tes vacances ?', FIN, 2], ['Ce film, tout le monde en parle.', TETE, 2],
  ['C’est par la fenêtre que le chat est sorti.', PRESENTATIF, 2], ['Le chat est sorti par la fenêtre.', NEUTRE, 2],
  ['Elle en rêve depuis longtemps, de ce voyage.', FIN, 2], ['Moi, je préfère la mer.', TETE, 3],
  ['C’est toi qui as raison.', PRESENTATIF, 3], ['Je ne les comprends pas, mes voisins.', FIN, 3],
  ['Le chocolat, j’en mange trop.', TETE, 3], ['C’est en forgeant qu’on devient forgeron.', PRESENTATIF, 3],
  ['Mes parents m’ont offert un vélo.', NEUTRE, 3], ['Il est bien long, ce chemin.', FIN, 3], ['Paris, j’y suis allé l’été dernier.', TETE, 3],
];
const EXPLICATIONS_EMPHASE: Record<string, string> = {
  [PRESENTATIF]: 'Le présentatif « c’est… qui » ou « c’est… que » met en relief un élément de la phrase.',
  [TETE]: 'Un groupe est placé en tête de phrase, puis repris par un pronom : c’est un détachement.',
  [FIN]: 'Un pronom annonce un groupe rejeté en fin de phrase : c’est un détachement en fin de phrase.',
  [NEUTRE]: 'Aucun élément n’est mis en relief : la phrase est neutre.',
};

export const emphase3e = creerGenerateur({
  id: 'phrase-emphatique-3e',
  competence: 'FR-C4-3E-GRAM-01',
  cycle: 4,
  description: 'Identifier la phrase emphatique et son mode de construction.',
  generer(a, d) {
    const [phrase, procede] = a.choisir(EMPHASES.filter((e) => niveaux(d).includes(e[2])));
    return qcm(a, `« ${phrase} » Quel procédé de mise en relief est utilisé ?`, procede, [PRESENTATIF, TETE, FIN, NEUTRE],
      'Cherche un présentatif « c’est… qui / que », ou un groupe détaché et repris par un pronom.',
      EXPLICATIONS_EMPHASE[procede]!, () => 'emphase-confondue');
  },
});

// ─────────── Pronom relatif

/** [phrase, pronom attendu, pièges, raison] : aucune autre option n'est correcte dans la phrase. */
export const RELATIFS: [string, string, string[], string, Niveau][] = [
  ['Le livre … je parle est passionnant.', 'dont', ['que', 'où', 'qui'], 'on parle de quelque chose : « dont » remplace un complément introduit par « de ».', 1],
  ['La maison … nous habitons est ancienne.', 'où', ['dont', 'que', 'qui'], '« où » remplace un complément de lieu.', 1],
  ['Le film … nous avons vu était drôle.', 'que', ['dont', 'qui', 'où'], '« que » est COD du verbe « avons vu ».', 1],
  ['L’élève … est absent sera prévenu.', 'qui', ['que', 'dont', 'où'], '« qui » est sujet du verbe « est ».', 1],
  ['C’est un ami … je suis fier.', 'dont', ['que', 'qui', 'où'], 'on est fier de quelqu’un : « dont » remplace un complément introduit par « de ».', 1],
  ['Le jour … il est né, il neigeait.', 'où', ['que', 'dont', 'qui'], '« où » peut aussi remplacer un complément de temps.', 1],
  ['C’est l’outil avec … je répare mon vélo.', 'lequel', ['qui', 'dont', 'que'], 'après une préposition, pour une chose, on emploie « lequel ».', 2],
  ['La personne à … tu parles est ma tante.', 'qui', ['que', 'dont', 'où'], 'après « à », pour une personne, on peut employer « qui ».', 2],
  ['Le concours … je participe a lieu demain.', 'auquel', ['duquel', 'lequel', 'dont'], 'on participe à quelque chose : à + lequel = « auquel ».', 2],
  ['La ville … je rêve est Venise.', 'dont', ['que', 'qui', 'laquelle'], 'on rêve de quelque chose : « dont ».', 2],
  ['Le parc près … nous habitons est fermé.', 'duquel', ['dont', 'auquel', 'lequel'], '« près de » + lequel = « duquel ».', 2],
  ['Les outils sans … il ne peut pas travailler sont rangés.', 'lesquels', ['qui', 'dont', 'que'], 'après une préposition, pour des choses au masculin pluriel : « lesquels ».', 2],
  ['Les questions … je pense sont difficiles.', 'auxquelles', ['desquelles', 'dont', 'lesquelles'], 'on pense à quelque chose : à + lesquelles = « auxquelles ».', 3],
  ['Le tableau … elle est fière a été exposé.', 'dont', ['que', 'duquel', 'auquel'], 'on est fier de quelque chose : « dont ».', 3],
  ['La rivière au bord de … nous pique-niquons est calme.', 'laquelle', ['qui', 'dont', 'que'], 'après « au bord de », pour une chose féminine : « laquelle ».', 3],
  ['Les raisons pour … il est parti restent obscures.', 'lesquelles', ['qui', 'dont', 'que'], 'après « pour », pour des choses au féminin pluriel : « lesquelles ».', 3],
  ['C’est une épreuve à … je ne m’attendais pas.', 'laquelle', ['lequel', 'qui', 'dont'], 'on s’attend à quelque chose ; « épreuve » est féminin : « à laquelle ».', 3],
  ['Le chemin par … nous sommes passés était boueux.', 'lequel', ['laquelle', 'dont', 'que'], 'après « par », pour une chose masculine : « lequel ».', 3],
];

export const pronomRelatif3e = creerGenerateur({
  id: 'pronom-relatif-3e',
  competence: 'FR-C4-3E-GRAM-02',
  cycle: 4,
  description: 'Choisir le pronom relatif selon sa fonction dans la subordonnée relative.',
  generer(a, d) {
    const [phrase, pronom, pieges, raison] = a.choisir(RELATIFS.filter((r) => niveaux(d).includes(r[4])));
    return qcm(a, `Complète avec le pronom relatif qui convient : ${phrase}`, pronom, pieges,
      'Cherche la fonction du pronom dans la relative : sujet, COD, complément introduit par « de », complément de lieu, ou après une préposition.',
      `On écrit « ${pronom} » : ${raison}`, () => 'relatif-fonction');
  },
});

// ─────────── Paroles rapportées : discours indirect libre

const DIRECT = 'discours direct';
const INDIRECT = 'discours indirect';
const LIBRE = 'discours indirect libre';
const RECIT = 'récit, sans paroles rapportées';
export const DISCOURS: [string, string, Niveau][] = [
  ['Il s’écria : « Je ne partirai pas ! »', DIRECT, 1], ['Il déclara qu’il ne partirait pas.', INDIRECT, 1],
  ['Elle demanda si le train était à l’heure.', INDIRECT, 1], ['« Où vas-tu ? » demanda sa mère.', DIRECT, 1],
  ['Il ferma la porte et descendit l’escalier.', RECIT, 1], ['Il réfléchit. Partir maintenant ? Non, c’était impossible.', LIBRE, 1],
  ['Elle hésita. Fallait-il vraiment tout lui avouer ?', LIBRE, 2], ['Le guide nous expliqua que le château datait du XIIe siècle.', INDIRECT, 2],
  ['Le soleil se couchait sur la ville endormie.', RECIT, 2], ['Il murmura : « Personne ne doit savoir. »', DIRECT, 2],
  ['Paul regarda la lettre. Elle ne reviendrait donc jamais.', LIBRE, 2], ['Marie promit qu’elle viendrait le lendemain.', INDIRECT, 2],
  ['Elle soupira. Que pouvait-elle faire de plus ? Rien, absolument rien.', LIBRE, 3], ['L’enfant répondit qu’il n’avait rien vu.', INDIRECT, 3],
  ['« Silence ! » cria le professeur.', DIRECT, 3], ['Il pensait à son avenir. Serait-il un jour heureux ?', LIBRE, 3],
  ['La pluie tomba toute la nuit.', RECIT, 3], ['Il ordonna aux soldats de se retirer.', INDIRECT, 3],
];
const EXPLICATIONS_DISCOURS: Record<string, string> = {
  [DIRECT]: 'Les paroles sont citées telles quelles, entre guillemets, après un verbe de parole.',
  [INDIRECT]: 'Les paroles sont rapportées dans une subordonnée ou un infinitif, après un verbe de parole, sans guillemets.',
  [LIBRE]: 'Les pensées du personnage se mêlent au récit, sans verbe de parole ni guillemets, mais avec leur ton : questions, exclamations.',
  [RECIT]: 'Le narrateur raconte des actions : aucune parole ni pensée n’est rapportée.',
};

export const discours3e = creerGenerateur({
  id: 'discours-indirect-libre-3e',
  competence: 'FR-C4-3E-DISC-01',
  cycle: 4,
  description: 'Distinguer discours direct, indirect et indirect libre dans un récit.',
  generer(a, d) {
    const [phrase, type] = a.choisir(DISCOURS.filter((x) => niveaux(d).includes(x[2])));
    return qcm(a, `Lis cette phrase : ${phrase} Comment les paroles ou les pensées sont-elles rapportées ?`, type, [DIRECT, INDIRECT, LIBRE, RECIT],
      'Repère les guillemets, un verbe de parole suivi de « que » ou « si », ou des pensées glissées dans le récit.',
      EXPLICATIONS_DISCOURS[type]!, (p) => (p === RECIT || type === RECIT ? undefined : 'paroles-rapportees-confondues'));
  },
});

// ─────────── Subjonctif passé

/** [phrase, infinitif, forme attendue, pièges : passé composé, subjonctif présent, autre] */
export const SUBJ_PASSE: [string, string, string, string[], Niveau][] = [
  ['Je suis content que tu … ton examen.', 'réussir', 'aies réussi', ['as réussi', 'réussisses', 'aurais réussi'], 1],
  ['Il faut que vous … vos devoirs avant ce soir.', 'finir', 'ayez fini', ['avez fini', 'finissiez', 'aviez fini'], 1],
  ['Je regrette qu’il … son train.', 'rater', 'ait raté', ['a raté', 'rate', 'aurait raté'], 1],
  ['Bien que nous … tôt, nous sommes en retard.', 'partir', 'soyons partis', ['sommes partis', 'partions', 'ayons partis'], 1],
  ['Elle doute que j’… la vérité.', 'dire', 'aie dit', ['ai dit', 'dise', 'aurais dit'], 1],
  ['Je suis surpris qu’elles … si vite.', 'arriver', 'soient arrivées', ['sont arrivées', 'arrivent', 'aient arrivées'], 1],
  ['Il est possible que nous nous … de chemin.', 'tromper', 'soyons trompés', ['sommes trompés', 'trompions', 'ayons trompés'], 2],
  ['Avant qu’il … le temps de répondre, elle était partie.', 'avoir', 'ait eu', ['a eu', 'ait', 'aurait eu'], 2],
  ['Je ne crois pas qu’ils … ce film.', 'voir', 'aient vu', ['ont vu', 'voient', 'auraient vu'], 2],
  ['Pourvu qu’elle … son bus !', 'prendre', 'ait pris', ['a pris', 'prenne', 'aurait pris'], 2],
  ['Je suis désolé que vous … malade.', 'être', 'ayez été', ['avez été', 'soyez', 'auriez été'], 2],
  ['Il est dommage que tu … la fête.', 'manquer', 'aies manqué', ['as manqué', 'manques', 'aurais manqué'], 2],
  ['Quoiqu’il … beaucoup, il n’a pas progressé.', 'travailler', 'ait travaillé', ['a travaillé', 'travaille', 'aurait travaillé'], 3],
  ['Je doute qu’elle … le mot de passe.', 'retenir', 'ait retenu', ['a retenu', 'retienne', 'aurait retenu'], 3],
  ['Bien qu’ils … tous les efforts, ils ont perdu.', 'faire', 'aient fait', ['ont fait', 'fassent', 'auraient fait'], 3],
  ['Elle attend que nous … pour commencer.', 'revenir', 'soyons revenus', ['sommes revenus', 'revenions', 'ayons revenus'], 3],
  ['Il se peut que j’… mes clés au bureau.', 'oublier', 'aie oublié', ['ai oublié', 'oublie', 'aurais oublié'], 3],
  ['Je suis heureux que vous vous … si vite.', 'rétablir', 'soyez rétablis', ['êtes rétablis', 'rétablissiez', 'ayez rétablis'], 3],
];

export const subjonctifPasse3e = creerGenerateur({
  id: 'subjonctif-passe-3e',
  competence: 'FR-C4-3E-CONJ-01',
  cycle: 4,
  description: 'Employer le subjonctif passé : auxiliaire au subjonctif présent et participe passé.',
  generer(a, d) {
    const [phrase, infinitif, forme, pieges] = a.choisir(SUBJ_PASSE.filter((s) => niveaux(d).includes(s[4])));
    const auxEtre = /^(sois|soit|soyons|soyez|soient)\b/.test(forme);
    return qcm(a, `Complète avec « ${infinitif} » au subjonctif passé : ${phrase}`, forme, pieges,
      'Subjonctif passé : auxiliaire avoir ou être au subjonctif présent, puis participe passé.',
      `L’auxiliaire ${auxEtre ? 'être' : 'avoir'} est au subjonctif présent, suivi du participe passé : ${phrase.replace('…', forme)}`,
      (p) => (p === pieges[0] ? 'indicatif-au-lieu-subjonctif' : p === pieges[1] ? 'subjonctif-present-passe' : /^aur/.test(p) ? 'conditionnel-au-lieu-subjonctif'
        : /^(aie|aies|ait|ayons|ayez|aient|sois|soit|soyons|soyez|soient) /.test(p) ? 'auxiliaire-faux' : 'indicatif-au-lieu-subjonctif'));
  },
});

// ─────────── Identifier un temps par la morphologie

const T = {
  present: 'présent de l’indicatif', imparfait: 'imparfait de l’indicatif', ps: 'passé simple', futur: 'futur simple',
  cond: 'conditionnel présent', pc: 'passé composé', pqp: 'plus-que-parfait', pa: 'passé antérieur', fa: 'futur antérieur',
  condPasse: 'conditionnel passé', subj: 'subjonctif présent', subjPasse: 'subjonctif passé',
} as const;
/** Temps voisins, sources de confusion : ils servent de pièges. */
const VOISINS: Record<string, string[]> = {
  [T.imparfait]: [T.cond, T.ps, T.present], [T.futur]: [T.cond, T.present, T.imparfait], [T.cond]: [T.futur, T.imparfait, T.condPasse],
  [T.ps]: [T.imparfait, T.present, T.futur], [T.pc]: [T.subjPasse, T.pqp, T.pa], [T.pqp]: [T.pa, T.pc, T.condPasse],
  [T.pa]: [T.pqp, T.ps, T.fa], [T.fa]: [T.condPasse, T.futur, T.pa], [T.condPasse]: [T.fa, T.cond, T.pqp],
  [T.subj]: [T.present, T.imparfait, T.subjPasse], [T.subjPasse]: [T.pc, T.subj, T.condPasse], [T.present]: [T.subj, T.ps, T.imparfait],
};
const AUXILIAIRES = new Set(('a ai as avons avez ont avais avait avions aviez avaient eus eut eurent eûmes eûtes aurai auras aura aurons aurez auront '
  + 'aurais aurait aurions auriez auraient aie aies ait ayons ayez aient suis es est sommes êtes sont étais était étions étiez étaient fus fut fûmes '
  + 'fûtes furent serai seras sera serons serez seront serais serait serions seriez seraient sois soit soyons soyez soient').split(' '));
export const FORMES_TEMPS: [string, string, Niveau][] = [
  ['ils chantaient', T.imparfait, 1], ['nous finirons', T.futur, 1], ['tu chanterais', T.cond, 1], ['elle a pris', T.pc, 1],
  ['je chantai', T.ps, 1], ['vous partiez', T.imparfait, 1], ['il viendra', T.futur, 1], ['elles firent', T.ps, 1],
  ['nous avions fini', T.pqp, 2], ['tu auras compris', T.fa, 2], ['qu’il vienne', T.subj, 2], ['ils eurent vu', T.pa, 2],
  ['je serais parti', T.condPasse, 2], ['que nous ayons fini', T.subjPasse, 2], ['vous fûtes', T.ps, 2], ['nous prendrions', T.cond, 2],
  ['que nous voyions', T.subj, 3], ['je courrai', T.futur, 3], ['je courrais', T.cond, 3], ['elles se seront levées', T.fa, 3],
  ['il aurait fallu', T.condPasse, 3], ['vous eûtes fini', T.pa, 3], ['j’étais allé', T.pqp, 3], ['qu’elle soit sortie', T.subjPasse, 3],
  ['ils crurent', T.ps, 3], ['tu acquerras', T.futur, 3], ['nous mourrions', T.cond, 3], ['elle fut partie', T.pa, 3],
];

export const identifierTemps3e = creerGenerateur({
  id: 'identifier-temps-3e',
  competence: 'FR-C4-3E-CONJ-02',
  cycle: 4,
  description: 'Identifier le temps et le mode d’une forme verbale en raisonnant sur sa morphologie.',
  generer(a, d) {
    const [forme, temps] = a.choisir(FORMES_TEMPS.filter((f) => niveaux(d).includes(f[2])));
    const compose = forme.split(/[ ’]/).some((mot, i, mots) => AUXILIAIRES.has(mot) && i < mots.length - 1);
    return qcm(a, `« ${forme} » : à quel temps et à quel mode ce verbe est-il conjugué ?`, temps, VOISINS[temps]!,
      compose ? 'Forme composée : le temps de l’auxiliaire donne le nom du temps.' : 'Observe la terminaison et le radical : -ais, -ai, -rai, -rais…',
      `${compose ? 'L’auxiliaire indique le temps composé' : 'La terminaison et le radical indiquent le temps'} : « ${forme} » est ${temps.startsWith('imparfait') ? 'à l’' : 'au '}${temps}.`,
      (p) => confusionTemps(temps, p));
  },
});

// ─────────── Valeurs du conditionnel

const FUTUR_PASSE = 'futur dans le passé';
const HYPOTHESE = 'hypothèse';
const POLITESSE = 'politesse';
const INCERTAIN = 'information non confirmée';
const SOUHAIT = 'souhait';
/** [phrase, verbe au conditionnel, valeur] */
export const CONDITIONNELS: [string, string, string, Niveau][] = [
  ['Il a dit qu’il viendrait demain.', 'viendrait', FUTUR_PASSE, 1], ['Si j’avais le temps, je lirais davantage.', 'lirais', HYPOTHESE, 1],
  ['Pourrais-tu fermer la fenêtre ?', 'Pourrais', POLITESSE, 1], ['Selon la presse, le ministre démissionnerait.', 'démissionnerait', INCERTAIN, 1],
  ['Elle pensait qu’elle réussirait.', 'réussirait', FUTUR_PASSE, 1], ['Je voudrais un renseignement, s’il vous plait.', 'voudrais', POLITESSE, 1],
  ['Au cas où il pleuvrait, nous resterions ici.', 'resterions', HYPOTHESE, 2], ['D’après les témoins, l’incendie aurait commencé vers minuit.', 'aurait commencé', INCERTAIN, 2],
  ['Nous savions que le voyage serait long.', 'serait', FUTUR_PASSE, 2], ['Auriez-vous l’heure ?', 'Auriez', POLITESSE, 2],
  ['Si tu m’avais écouté, tu n’aurais pas perdu.', 'aurais perdu', HYPOTHESE, 2], ['Le suspect se serait enfui par la fenêtre.', 'serait enfui', INCERTAIN, 2],
  ['J’aimerais tant voyager autour du monde !', 'aimerais', SOUHAIT, 3], ['Il promit qu’il écrirait chaque semaine.', 'écrirait', FUTUR_PASSE, 3],
  ['Que ferais-tu à ma place ?', 'ferais', HYPOTHESE, 3], ['Selon certaines sources, le prix de l’essence augmenterait.', 'augmenterait', INCERTAIN, 3],
  ['Il aimerait devenir pilote.', 'aimerait', SOUHAIT, 3], ['Elle croyait que le train partirait à l’heure.', 'partirait', FUTUR_PASSE, 3],
  ['Nous voudrions tellement gagner ce match !', 'voudrions', SOUHAIT, 3],
];
const EXPLICATIONS_COND: Record<string, string> = {
  [FUTUR_PASSE]: 'Dans un récit au passé, le conditionnel exprime une action postérieure : c’est le futur dans le passé, valeur temporelle.',
  [HYPOTHESE]: 'Le conditionnel exprime ce qui arriverait si une condition était remplie : valeur d’hypothèse.',
  [POLITESSE]: 'Le conditionnel adoucit une demande : valeur de politesse.',
  [INCERTAIN]: 'Le conditionnel signale une information rapportée, non vérifiée : valeur d’information non confirmée.',
  [SOUHAIT]: 'Le conditionnel exprime un désir, un rêve : valeur de souhait.',
};

export const valeursConditionnel3e = creerGenerateur({
  id: 'valeurs-conditionnel-3e',
  competence: 'FR-C4-3E-CONJ-03',
  cycle: 4,
  description: 'Identifier la valeur temporelle ou modale du conditionnel.',
  generer(a, d) {
    const [phrase, verbe, valeur] = a.choisir(CONDITIONNELS.filter((c) => niveaux(d).includes(c[3])));
    const toutes = d === 3 ? [FUTUR_PASSE, HYPOTHESE, POLITESSE, INCERTAIN, SOUHAIT] : [FUTUR_PASSE, HYPOTHESE, POLITESSE, INCERTAIN];
    return qcm(a, `Dans « ${phrase} », quelle est la valeur du conditionnel « ${verbe} » ?`, valeur,
      a.melanger(toutes.filter((v) => v !== valeur)).slice(0, 3),
      'Le conditionnel peut situer une action dans le futur d’un passé, ou exprimer une hypothèse, la politesse, une information incertaine, un souhait.',
      EXPLICATIONS_COND[valeur]!, () => 'valeur-conditionnel');
  },
});

// ─────────── Participe passé avec avoir et COD relatif

/** [phrase, infinitif, forme attendue, formes (ms, fs, mp, fp), raison] */
export const PP_RELATIF: [string, string, string, [string, string, string, string], string, Niveau][] = [
  ['Les fleurs que j’ai … sentent bon.', 'cueillir', 'cueillies', ['cueilli', 'cueillie', 'cueillis', 'cueillies'], '« que » reprend « les fleurs », féminin pluriel', 1],
  ['Le gâteau que tu as … était délicieux.', 'préparer', 'préparé', ['préparé', 'préparée', 'préparés', 'préparées'], '« que » reprend « le gâteau », masculin singulier', 1],
  ['La lettre qu’elle a … est arrivée.', 'écrire', 'écrite', ['écrit', 'écrite', 'écrits', 'écrites'], '« que » reprend « la lettre », féminin singulier', 1],
  ['Les livres que nous avons … sont rangés.', 'lire', 'lus', ['lu', 'lue', 'lus', 'lues'], '« que » reprend « les livres », masculin pluriel', 1],
  ['Les photos qu’il a … sont floues.', 'prendre', 'prises', ['pris', 'prise', 'pris', 'prises'], '« que » reprend « les photos », féminin pluriel', 1],
  ['La robe que j’ai … me plait beaucoup.', 'acheter', 'achetée', ['acheté', 'achetée', 'achetés', 'achetées'], '« que » reprend « la robe », féminin singulier', 1],
  ['Les chansons que vous avez … étaient tristes.', 'chanter', 'chantées', ['chanté', 'chantée', 'chantés', 'chantées'], '« que » reprend « les chansons », féminin pluriel', 2],
  ['Les exercices que le professeur a … sont faciles.', 'donner', 'donnés', ['donné', 'donnée', 'donnés', 'données'], '« que » reprend « les exercices », masculin pluriel', 2],
  ['La décision qu’ils ont … est surprenante.', 'prendre', 'prise', ['pris', 'prise', 'pris', 'prises'], '« que » reprend « la décision », féminin singulier', 2],
  ['Les films dont nous avons … sont sortis hier.', 'parler', 'parlé', ['parlé', 'parlée', 'parlés', 'parlées'], '« dont » n’est pas COD : pas d’accord', 2],
  ['Les erreurs qu’elle a … sont rares.', 'faire', 'faites', ['fait', 'faite', 'faits', 'faites'], '« que » reprend « les erreurs », féminin pluriel', 2],
  ['Les clés que j’avais … ont été retrouvées.', 'perdre', 'perdues', ['perdu', 'perdue', 'perdus', 'perdues'], '« que » reprend « les clés », féminin pluriel', 2],
  ['Les efforts qu’il a … ont payé.', 'fournir', 'fournis', ['fourni', 'fournie', 'fournis', 'fournies'], '« que » reprend « les efforts », masculin pluriel', 3],
  ['Les histoires dont il nous a … sont vraies.', 'parler', 'parlé', ['parlé', 'parlée', 'parlés', 'parlées'], '« dont » n’est pas COD : pas d’accord', 3],
  ['Quelle aventure nous avons … !', 'vivre', 'vécue', ['vécu', 'vécue', 'vécus', 'vécues'], 'le COD « quelle aventure », féminin singulier, est placé avant', 3],
  ['Les difficultés que nous avons … nous ont rendus plus forts.', 'rencontrer', 'rencontrées', ['rencontré', 'rencontrée', 'rencontrés', 'rencontrées'], '« que » reprend « les difficultés », féminin pluriel', 3],
  ['La maison qu’ils ont … appartenait à mon grand-père.', 'repeindre', 'repeinte', ['repeint', 'repeinte', 'repeints', 'repeintes'], '« que » reprend « la maison », féminin singulier', 3],
  ['Les cadeaux que tu m’as … me touchent.', 'offrir', 'offerts', ['offert', 'offerte', 'offerts', 'offertes'], '« que » reprend « les cadeaux », masculin pluriel', 3],
];

export const accordPPRelatif3e = creerGenerateur({
  id: 'accord-participe-cod-relatif-3e',
  competence: 'FR-C4-3E-ORTH-01',
  cycle: 4,
  description: 'Accorder le participe passé employé avec avoir quand le COD est un pronom relatif placé avant.',
  generer(a, d) {
    const [phrase, infinitif, forme, formes, raison] = a.choisir(PP_RELATIF.filter((p) => niveaux(d).includes(p[5])));
    return qcm(a, `Complète avec le participe passé de « ${infinitif} » : ${phrase}`, forme, formes,
      'Avec avoir, le participe passé s’accorde avec le COD seulement s’il est placé avant le verbe.',
      `${raison[0]!.toUpperCase()}${raison.slice(1)}. On écrit : ${phrase.replace('…', forme)}`,
      (p) => (forme === formes[0] ? (phrase.includes(' dont ') ? 'accord-avec-dont' : 'accord-pp-abusif') : p === formes[0] ? 'accord-cod-avant-oublie' : 'accord-pp-genre-nombre'));
  },
});

// ─────────── Accord sujet-verbe : pronom collectif ou distributif, complément du nom

/** [phrase, infinitif, forme attendue, pièges, noyau du sujet] */
export const SUJETS_COMPLEXES: [string, string, string, string[], string, Niveau][] = [
  ['Chacun des élèves … son cahier.', 'avoir', 'a', ['ont', 'as'], '« chacun »', 1],
  ['Le panier de pommes … sur la table.', 'être', 'est', ['sont', 'es'], '« le panier »', 1],
  ['Aucun des joueurs ne … abandonner.', 'vouloir', 'veut', ['veulent', 'veux'], '« aucun »', 1],
  ['Le bruit des vagues … le sommeil.', 'troubler', 'trouble', ['troublent', 'troubles'], '« le bruit »', 1],
  ['Les feuilles de cet arbre … en automne.', 'tomber', 'tombent', ['tombe', 'tombes'], '« les feuilles »', 1],
  ['Tout le monde … content.', 'être', 'est', ['sont', 'es'], '« tout le monde »', 1],
  ['Nul n’… censé ignorer la loi.', 'être', 'est', ['sont', 'es'], '« nul »', 2],
  ['Personne ne … la réponse.', 'connaitre', 'connait', ['connaissent', 'connais'], '« personne »', 2],
  ['La boite de crayons … par terre.', 'être', 'est', ['sont', 'es'], '« la boite »', 2],
  ['Les enfants de ma voisine … du piano.', 'jouer', 'jouent', ['joue', 'joues'], '« les enfants »', 2],
  ['Chacune de ces maisons … un jardin.', 'posséder', 'possède', ['possèdent', 'possèdes'], '« chacune »', 2],
  ['Le chant des oiseaux … les promeneurs.', 'réjouir', 'réjouit', ['réjouissent', 'réjouis'], '« le chant »', 2],
  ['Chacun d’entre nous … ses défauts.', 'avoir', 'a', ['avons', 'ont'], '« chacun »', 3],
  ['Aucune de ces solutions ne … satisfaisante.', 'sembler', 'semble', ['semblent', 'sembles'], '« aucune »', 3],
  ['Les conseils de mon entraineur … efficaces.', 'être', 'sont', ['est', 'es'], '« les conseils »', 3],
  ['Le comportement de ces élèves … le professeur.', 'inquiéter', 'inquiète', ['inquiètent', 'inquiètes'], '« le comportement »', 3],
  ['Quelqu’un parmi vous … la clé ?', 'avoir', 'a', ['avez', 'ont'], '« quelqu’un »', 3],
  ['L’odeur des croissants chauds … toute la rue.', 'envahir', 'envahit', ['envahissent', 'envahis'], '« l’odeur »', 3],
  ['Chacun de vous … participer.', 'pouvoir', 'peut', ['pouvez', 'peuvent'], '« chacun »', 3],
];

export const accordSujetsComplexes3e = creerGenerateur({
  id: 'accord-sujets-complexes-3e',
  competence: 'FR-C4-3E-ORTH-02',
  cycle: 4,
  description: 'Accorder le verbe avec un pronom collectif ou distributif, ou avec un sujet comportant un complément du nom.',
  generer(a, d) {
    const [phrase, infinitif, forme, pieges, noyau] = a.choisir(SUJETS_COMPLEXES.filter((s) => niveaux(d).includes(s[5])));
    const pluriel = /^« (les|des) /.test(noyau);
    return qcm(a, `Complète avec « ${infinitif} » au présent : ${phrase}`, forme, pieges,
      'Cherche le mot principal du sujet : le complément du nom ne commande pas l’accord.',
      `Le verbe s’accorde avec ${noyau}, ${pluriel ? 'au pluriel' : 'au singulier'}. On écrit : ${phrase.replace('…', forme)}`,
      (p) => (p !== pieges[0] ? 'accord-personne' : /^« (chacun|chacune|aucun|aucune|personne|nul|tout le monde|quelqu’un) »$/.test(noyau) ? 'accord-pronom-distributif' : 'accord-complement-du-nom'));
  },
});

// ─────────── Accord de l'adjectif : épithète, attribut, apposition

const EPITHETE = 'épithète';
const ATTRIBUT = 'attribut';
const APPOSITION = 'apposition';
/** [phrase, adjectif au masculin singulier, forme attendue, formes (ms, fs, mp, fp), fonction, mot qualifié] */
export const ADJECTIFS: [string, string, string, [string, string, string, string], string, string, Niveau][] = [
  ['Les rues … de la ville dormaient.', 'désert', 'désertes', ['désert', 'déserte', 'déserts', 'désertes'], EPITHETE, '« rues »', 1],
  ['Ces histoires sont vraiment …', 'amusant', 'amusantes', ['amusant', 'amusante', 'amusants', 'amusantes'], ATTRIBUT, '« histoires »', 1],
  ['…, les randonneurs firent une pause.', 'épuisé', 'Épuisés', ['Épuisé', 'Épuisée', 'Épuisés', 'Épuisées'], APPOSITION, '« randonneurs »', 1],
  ['Ma sœur semble … aujourd’hui.', 'fatigué', 'fatiguée', ['fatigué', 'fatiguée', 'fatigués', 'fatiguées'], ATTRIBUT, '« sœur »', 1],
  ['Il porte des chaussures …', 'neuf', 'neuves', ['neuf', 'neuve', 'neufs', 'neuves'], EPITHETE, '« chaussures »', 1],
  ['La mer, … par le soleil, scintillait.', 'chauffé', 'chauffée', ['chauffé', 'chauffée', 'chauffés', 'chauffées'], APPOSITION, '« mer »', 1],
  ['Ces pommes paraissent bien …', 'mûr', 'mûres', ['mûr', 'mûre', 'mûrs', 'mûres'], ATTRIBUT, '« pommes »', 2],
  ['Une voiture et un camion … bloquaient la route.', 'arrêté', 'arrêtés', ['arrêté', 'arrêtée', 'arrêtés', 'arrêtées'], EPITHETE, '« voiture » et « camion »', 2],
  ['…, la petite fille courut vers sa mère.', 'effrayé', 'Effrayée', ['Effrayé', 'Effrayée', 'Effrayés', 'Effrayées'], APPOSITION, '« la petite fille »', 2],
  ['Je trouve ces exercices …', 'compliqué', 'compliqués', ['compliqué', 'compliquée', 'compliqués', 'compliquées'], ATTRIBUT, '« exercices »', 2],
  ['Des fleurs … ornaient la table.', 'blanc', 'blanches', ['blanc', 'blanche', 'blancs', 'blanches'], EPITHETE, '« fleurs »', 2],
  ['Mes cousines, … de leur victoire, chantaient.', 'fier', 'fières', ['fier', 'fière', 'fiers', 'fières'], APPOSITION, '« cousines »', 2],
  ['Elle porte une veste et un pantalon …', 'noir', 'noirs', ['noir', 'noire', 'noirs', 'noires'], EPITHETE, '« veste » et « pantalon »', 3],
  ['Les enfants restèrent … devant le spectacle.', 'muet', 'muets', ['muet', 'muette', 'muets', 'muettes'], ATTRIBUT, '« enfants »', 3],
  ['…, la vieille maison semblait abandonnée.', 'isolé', 'Isolée', ['Isolé', 'Isolée', 'Isolés', 'Isolées'], APPOSITION, '« la vieille maison »', 3],
  ['Ces légendes semblent très …', 'ancien', 'anciennes', ['ancien', 'ancienne', 'anciens', 'anciennes'], ATTRIBUT, '« légendes »', 3],
  ['Des questions … restent sans réponse.', 'essentiel', 'essentielles', ['essentiel', 'essentielle', 'essentiels', 'essentielles'], EPITHETE, '« questions »', 3],
  ['Ces deux sœurs, … et rieuses, animent la classe.', 'vif', 'vives', ['vif', 'vive', 'vifs', 'vives'], APPOSITION, '« sœurs »', 3],
];
const ROLE: Record<string, string> = {
  [EPITHETE]: 'Il est placé à côté du nom, sans verbe ni virgule : il est épithète.',
  [ATTRIBUT]: 'Il est relié au nom par un verbe comme être, sembler, paraitre, rester, trouver : il est attribut.',
  [APPOSITION]: 'Il est séparé du nom par une virgule : il est en apposition.',
};

export const accordAdjectif3e = creerGenerateur({
  id: 'accord-adjectif-fonctions-3e',
  competence: 'FR-C4-3E-ORTH-03',
  cycle: 4,
  description: 'Accorder l’adjectif épithète, attribut ou apposé, et identifier sa fonction.',
  generer(a, d) {
    const [phrase, adjectif, forme, formes, fonction, qualifie] = a.choisir(ADJECTIFS.filter((x) => niveaux(d).includes(x[6])));
    const complete = phrase.replace('…', forme);
    if (d > 1 && a.suivant() < 0.4) {
      return qcm(a, `Dans « ${complete} », quelle est la fonction de « ${forme.toLowerCase()} » ?`, fonction, [EPITHETE, ATTRIBUT, APPOSITION, 'complément du nom'],
        'Épithète : à côté du nom. Attribut : relié par un verbe. Apposition : séparé par une virgule.',
        ROLE[fonction]!, (p) => (p === 'complément du nom' ? undefined : 'fonction-adjectif-confondue'));
    }
    return qcm(a, `Complète avec l’adjectif « ${adjectif} » bien accordé : ${phrase}`, forme, formes,
      'L’adjectif s’accorde en genre et en nombre avec le nom qu’il qualifie, quelle que soit sa fonction.',
      `L’adjectif qualifie ${qualifie} : il s’accorde avec ${/ et /.test(qualifie) ? 'les deux noms, au masculin pluriel' : 'ce nom'}. ${ROLE[fonction]!}`, () => 'accord-adjectif');
  },
});
