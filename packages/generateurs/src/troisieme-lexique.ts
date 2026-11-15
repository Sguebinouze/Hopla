// 3e, français (programme 2026) : connecteurs logiques, dénotation et connotation, sens des racines savantes,
// radicaux verbaux au conditionnel et au subjonctif, homophones lexicaux.
// Source : programme de français du cycle 4 (arrêté du 18 février 2026, BO n°10 du 5 mars 2026), p. 29 et 32.
// Toutes les phrases sont rédigées et annotées à la main. Les pièges sont choisis pour qu'une seule option convienne.
import { creerGenerateur, erreursDe } from './outils';

const niveaux = (d: number) => (d === 1 ? [1] : d === 2 ? [1, 2] : [2, 3]);
type Niveau = 1 | 2 | 3;
/** QCM à options rédigées ; `code` qualifie un piège qui révèle une erreur typique (voir `ERREURS`). */
const qcm = (a: { melanger: <T>(l: readonly T[]) => T[] }, consigne: string, reponse: string, pieges: string[], indice: string, explication: string,
  code?: (piege: string) => string | undefined) => {
  const options = a.melanger([reponse, ...pieges.filter((p, i, t) => p !== reponse && t.indexOf(p) === i)]);
  return { gabarit: 'qcm' as const, consigne, options, reponse, indice, explication, erreurs: erreursDe(options, reponse, code ? options.map((o) => [o, code(o)] as const) : []) };
};

// ─────────── Connecteurs logiques

/** [phrase, connecteur attendu, relation logique, pièges qui ne conviennent pas] */
export const CONNECTEURS: [string, string, string, string[], Niveau][] = [
  ['Il pleuvait ; …, nous sommes restés à la maison.', 'par conséquent', 'la conséquence', ['pourtant', 'en effet', 'par exemple'], 1],
  ['Il a beaucoup révisé ; …, il a échoué.', 'pourtant', 'l’opposition', ['donc', 'en effet', 'par exemple'], 1],
  ['Nous sommes restés au chaud ; …, il faisait très froid dehors.', 'en effet', 'la cause', ['pourtant', 'par conséquent', 'de plus'], 1],
  ['Ce vélo est léger ; …, il est équipé de lumières.', 'de plus', 'l’ajout', ['pourtant', 'par conséquent', 'en effet'], 1],
  ['Certains fruits sont riches en vitamine C ; …, l’orange en contient beaucoup.', 'par exemple', 'l’illustration', ['pourtant', 'par conséquent', 'de plus'], 1],
  ['Le magasin était fermé ; …, nous sommes rentrés sans rien acheter.', 'donc', 'la conséquence', ['pourtant', 'en effet', 'par exemple'], 1],
  ['Mon frère adore le sport ; …, ma sœur préfère la lecture.', 'en revanche', 'l’opposition', ['donc', 'en effet', 'par exemple'], 2],
  ['Ce film est trop long ; …, ses acteurs jouent mal.', 'en outre', 'l’ajout', ['cependant', 'par conséquent', 'en effet'], 2],
  ['Il faut protéger les abeilles ; …, elles pollinisent de nombreuses plantes.', 'en effet', 'la cause', ['cependant', 'par conséquent', 'en outre'], 2],
  ['La route était glissante ; …, le conducteur a ralenti.', 'par conséquent', 'la conséquence', ['cependant', 'en effet', 'par exemple'], 2],
  ['Les dinosaures étaient très variés ; …, certains mesuraient moins d’un mètre.', 'par exemple', 'l’illustration', ['cependant', 'par conséquent', 'en outre'], 2],
  ['Elle était épuisée ; …, elle a terminé la course.', 'néanmoins', 'l’opposition', ['donc', 'en effet', 'par exemple'], 2],
  ['Le projet semblait simple ; …, il a demandé des mois de travail.', 'cependant', 'l’opposition', ['donc', 'en effet', 'en outre'], 3],
  ['Les forêts absorbent du gaz carbonique ; …, elles limitent le réchauffement.', 'ainsi', 'la conséquence', ['néanmoins', 'en effet', 'en revanche'], 3],
  ['Cette solution est économique ; …, elle respecte l’environnement.', 'en outre', 'l’ajout', ['par exemple', 'par conséquent', 'en effet'], 3],
  ['Le témoin ment ; …, il était absent ce soir-là.', 'en effet', 'la cause', ['néanmoins', 'par conséquent', 'en revanche'], 3],
  ['Ce roman a été un immense succès ; …, il a été traduit en quarante langues.', 'd’ailleurs', 'l’ajout d’un argument', ['néanmoins', 'en revanche', 'pourtant'], 3],
  ['Paul adore la montagne ; …, sa sœur ne jure que par la mer.', 'en revanche', 'l’opposition', ['donc', 'en effet', 'par exemple'], 3],
];

export const connecteurs3e = creerGenerateur({
  id: 'connecteurs-logiques-3e',
  competence: 'FR-C4-3E-GRAM-03',
  cycle: 4,
  description: 'Choisir le connecteur logique qui exprime la relation entre deux propositions.',
  generer(a, d) {
    const [phrase, connecteur, relation, pieges] = a.choisir(CONNECTEURS.filter((c) => niveaux(d).includes(c[4])));
    return qcm(a, `Complète avec le connecteur logique qui convient : ${phrase}`, connecteur, pieges,
      'Demande-toi quel lien unit les deux parties : cause, conséquence, opposition, ajout ou exemple.',
      `Le lien entre les deux propositions exprime ${relation} : « ${connecteur} » convient.`, () => 'connecteur-relation-logique');
  },
});

// ─────────── Dénotation et connotation

/** [sens commun, mot mélioratif (ou vide), mot neutre, mot péjoratif, second mot neutre si pas de mélioratif] */
export const SERIES_CONNOTATION: [string, string, string, string, string, Niveau][] = [
  ['un cheval', 'destrier', 'cheval', 'canasson', '', 1], ['une maison', 'demeure', 'maison', 'masure', '', 1],
  ['un film', 'chef-d’œuvre', 'film', 'navet', '', 1], ['une odeur', 'parfum', 'odeur', 'puanteur', '', 1],
  ['un conducteur', '', 'conducteur', 'chauffard', 'automobiliste', 1], ['un journal', '', 'journal', 'torchon', 'quotidien', 1],
  ['un repas', 'festin', 'repas', 'pitance', '', 2], ['la couleur jaune', 'doré', 'jaune', 'jaunâtre', '', 2],
  ['un homme politique', 'homme d’État', 'homme politique', 'politicard', '', 2], ['une voiture', '', 'voiture', 'guimbarde', 'automobile', 2],
  ['regarder', 'contempler', 'regarder', 'reluquer', '', 2], ['une silhouette fine', 'svelte', 'mince', 'maigrichon', '', 2],
  ['un écrivain', '', 'écrivain', 'écrivaillon', 'auteur', 3], ['parler beaucoup', '', 'bavarder', 'jacasser', 'discuter', 3],
  ['la couleur blanche', 'immaculé', 'blanc', 'blanchâtre', '', 3], ['la couleur rouge', 'vermeil', 'rouge', 'rougeaud', '', 3],
  ['une habitation pauvre', '', 'maison', 'taudis', 'logement', 3], ['une écriture', '', 'écriture', 'gribouillis', 'graphie', 3],
];

export const connotation3e = creerGenerateur({
  id: 'denotation-connotation-3e',
  competence: 'FR-C4-3E-VOC-01',
  cycle: 4,
  description: 'Distinguer la dénotation et la connotation méliorative, neutre ou péjorative d’un mot.',
  generer(a, d) {
    const [sens, melioratif, neutre, pejoratif, neutre2] = a.choisir(SERIES_CONNOTATION.filter((s) => niveaux(d).includes(s[5])));
    // Sans mot mélioratif, deux mots sont neutres : on ne demande alors que le mot péjoratif.
    const cible = d === 1 || !melioratif ? 'péjorative' : a.choisir(['péjorative', 'méliorative', 'neutre']);
    const mots = [melioratif || neutre2, neutre, pejoratif];
    const reponse = cible === 'péjorative' ? pejoratif : cible === 'méliorative' ? melioratif : neutre;
    return qcm(a, `Ces mots désignent ${sens} : ${a.melanger(mots).join(', ')}. Lequel a une connotation ${cible === 'neutre' ? 'neutre, sans jugement' : cible} ?`,
      reponse, mots,
      'Tous ont le même sens (la dénotation). Cherche celui qui ajoute un jugement positif, négatif, ou aucun jugement.',
      `« ${pejoratif} » est péjoratif, il dévalorise. ${melioratif ? `« ${melioratif} » est mélioratif, il valorise. « ${neutre} » est neutre.` : `« ${neutre} » et « ${neutre2} » sont neutres.`}`, () => 'connotation-confondue');
  },
});

// ─────────── Racines savantes

/** [élément, sens, mots qui le contiennent] */
export const RACINES: [string, string, string[], Niveau][] = [
  ['chrono', 'le temps', ['chronomètre', 'chronologie'], 1], ['géo', 'la terre', ['géographie', 'géologie'], 1],
  ['bio', 'la vie', ['biologie', 'biographie'], 1], ['graph', 'écrire', ['autographe', 'orthographe'], 1],
  ['phon', 'le son, la voix', ['téléphone', 'microphone'], 1], ['micro', 'petit', ['microscope', 'microbe'], 1],
  ['télé', 'loin', ['télévision', 'téléphone'], 1], ['hydr', 'l’eau', ['hydravion', 'déshydraté'], 1],
  ['poly', 'plusieurs', ['polygone', 'polyglotte'], 1],
  ['anthropo', 'l’être humain', ['anthropologie', 'anthropomorphe'], 2], ['démo', 'le peuple', ['démocratie', 'démographie'], 2],
  ['phile', 'qui aime', ['bibliophile', 'cinéphile'], 2], ['phobe', 'qui craint', ['hydrophobe', 'claustrophobe'], 2],
  ['omni', 'tout', ['omnivore', 'omniprésent'], 2], ['vore', 'qui mange', ['carnivore', 'herbivore'], 2],
  ['cide', 'qui tue', ['insecticide', 'fongicide'], 2], ['biblio', 'le livre', ['bibliothèque', 'bibliophile'], 2],
  ['hippo', 'le cheval', ['hippodrome', 'hippopotame'], 3], ['thermo', 'la chaleur', ['thermomètre', 'thermostat'], 3],
  ['psych', 'l’esprit', ['psychologie', 'psychiatre'], 3], ['archéo', 'ancien', ['archéologie', 'archéologue'], 3],
  ['ortho', 'droit, correct', ['orthographe', 'orthodontiste'], 3], ['pyro', 'le feu', ['pyromane', 'pyrotechnie'], 3],
  ['xéno', 'l’étranger', ['xénophobe', 'xénophobie'], 3], ['cardio', 'le cœur', ['cardiologue', 'cardiogramme'], 3],
  ['auto', 'soi-même', ['autobiographie', 'autoportrait'], 3], ['mégalo', 'grand', ['mégalopole', 'mégalomane'], 3],
];

export const racines3e = creerGenerateur({
  id: 'racines-savantes-3e',
  competence: 'FR-C4-3E-VOC-02',
  cycle: 4,
  description: 'Déduire le sens d’un mot de ses racines grecques ou latines.',
  generer(a, d) {
    const choix = RACINES.filter((r) => niveaux(d).includes(r[3]));
    const [element, sens, mots] = a.choisir(choix);
    const mot = a.choisir(mots);
    // Pièges : sens d'autres racines du même niveau, sans ambiguïté avec le mot choisi.
    const autres = a.melanger(RACINES.filter((r) => r[0] !== element && !r[2].includes(mot) && r[1] !== sens).map((r) => r[1])).slice(0, 3);
    return qcm(a, `Dans le mot « ${mot} », que signifie l’élément « ${element} » ?`, sens, autres,
      'Pense à d’autres mots qui contiennent le même élément.',
      `« ${element} » signifie ${sens}, comme dans ${mots.map((m) => `« ${m} »`).join(' et ')}.`);
  },
});

// ─────────── Radicaux verbaux : conditionnel et subjonctif

/** [phrase, infinitif, forme attendue, pièges, règle] */
export const RADICAUX: [string, string, string, string[], string, Niveau][] = [
  ['Si j’avais le temps, je … plus souvent.', 'courir', 'courrais', ['courais', 'courirais', 'courerais'], 'au conditionnel, « courir » prend deux r : je courrais', 1],
  ['Si j’avais le temps, je … ce film.', 'voir', 'verrais', ['voirais', 'verais', 'voyerais'], 'au conditionnel, le radical de « voir » est « verr- »', 1],
  ['Si nous avions un timbre, nous … une carte.', 'envoyer', 'enverrions', ['envoyerions', 'envoierions', 'enverions'], 'au conditionnel, le radical d’« envoyer » est « enverr- »', 1],
  ['Tu … venir si tu le voulais.', 'pouvoir', 'pourrais', ['pouvrais', 'pourais', 'pouvais'], 'au conditionnel, le radical de « pouvoir » est « pourr- »', 1],
  ['Il faut que tu … tes devoirs.', 'faire', 'fasses', ['fais', 'faisses', 'ferais'], 'au subjonctif, le radical de « faire » est « fass- »', 1],
  ['Il faut que nous … patients.', 'être', 'soyons', ['soyions', 'sommes', 'serions'], 'au subjonctif, « être » donne « que nous soyons », sans i après le y', 1],
  ['Il faut que vous … à l’heure.', 'être', 'soyez', ['soyiez', 'êtes', 'seriez'], 'au subjonctif, « être » donne « que vous soyez », sans i après le y', 2],
  ['Je souhaite que vous … raison.', 'avoir', 'ayez', ['ayiez', 'avez', 'auriez'], 'au subjonctif, « avoir » donne « que vous ayez », sans i après le y', 2],
  ['S’il sortait sans manteau, il … de froid.', 'mourir', 'mourrait', ['mourait', 'mourirait', 'mourerait'], 'au conditionnel, « mourir » prend deux r : il mourrait', 2],
  ['Il faut qu’il … ses amis.', 'croire', 'croie', ['croit', 'croye', 'croirait'], 'au subjonctif, « croire » donne « qu’il croie », avec un e final', 2],
  ['Je doute qu’il … assez vite.', 'courir', 'coure', ['court', 'courre', 'courrait'], 'au subjonctif présent, « courir » garde un seul r : qu’il coure', 2],
  ['Il faut que vous … le médecin.', 'voir', 'voyiez', ['voyez', 'voiez', 'verriez'], 'au subjonctif, « voir » donne « que vous voyiez », avec y puis i', 2],
  ['Si vous vous entrainiez, vous … de l’expérience.', 'acquérir', 'acquerriez', ['acquériez', 'acquéririez', 'acquéreriez'], 'au conditionnel, « acquérir » donne « acquerr- », sans accent et avec deux r', 3],
  ['Il faut que j’… ce colis.', 'envoyer', 'envoie', ['envoye', 'enverrais', 'envoies'], 'au subjonctif, « envoyer » donne « que j’envoie »', 3],
  ['Je voudrais qu’ils … contents.', 'être', 'soient', ['soyent', 'sont', 'seraient'], 'au subjonctif, « être » donne « qu’ils soient »', 3],
  ['Si elle le pouvait, elle … le monde.', 'parcourir', 'parcourrait', ['parcourait', 'parcourirait', 'parcourerait'], 'au conditionnel, « parcourir » prend deux r, comme « courir »', 3],
  ['Il est temps que nous … une décision.', 'prendre', 'prenions', ['prenons', 'prennions', 'prendrions'], 'au subjonctif, « prendre » donne « que nous prenions », avec un seul n', 3],
  ['Il faudrait que tu … ce problème.', 'résoudre', 'résolves', ['résous', 'résoudes', 'résoudrais'], 'au subjonctif, le radical de « résoudre » est « résolv- »', 3],
  ['Si je le pouvais, je … ce château.', 'acquérir', 'acquerrais', ['acquérais', 'acquérirais', 'acquèrerais'], 'au conditionnel, « acquérir » donne « acquerr- », sans accent et avec deux r', 3],
];

export const radicaux3e = creerGenerateur({
  id: 'radicaux-verbaux-3e',
  competence: 'FR-C4-3E-VOC-03',
  cycle: 4,
  description: 'Orthographier les radicaux verbaux difficiles au conditionnel et au subjonctif.',
  generer(a, d) {
    const [phrase, infinitif, forme, pieges, regle] = a.choisir(RADICAUX.filter((r) => niveaux(d).includes(r[5])));
    return qcm(a, `Complète avec le verbe « ${infinitif} » : ${phrase}`, forme, pieges,
      'Repère le mode demandé par la phrase (condition : conditionnel ; « il faut que » : subjonctif), puis le radical du verbe.',
      `${regle[0]!.toUpperCase()}${regle.slice(1)}. On écrit : ${phrase.replace('…', forme)}`,
      (p) => (/yi/.test(p) && !/yi/.test(forme) ? 'subjonctif-yi' : forme.includes('rr') && p === forme.replace('rr', 'r') ? 'radical-r-double' : undefined));
  },
});

// ─────────── Homophones lexicaux

/** [phrase, mot attendu, homophones, sens du mot attendu] */
export const HOMOPHONES: [string, string, string[], string, Niveau][] = [
  ['Il a mal au … depuis ce matin.', 'cou', ['coup', 'cout'], 'la partie du corps', 1],
  ['Le marin regarde la … agitée.', 'mer', ['mère', 'maire'], 'l’étendue d’eau salée', 1],
  ['Le boulanger vend du … frais.', 'pain', ['pin', 'peint'], 'l’aliment', 1],
  ['Ma grand-mère me lit un … de fées.', 'conte', ['compte', 'comte'], 'le récit merveilleux', 1],
  ['J’ai très … : passons à table !', 'faim', ['fin', 'feint'], 'le besoin de manger', 1],
  ['Il boit un … d’eau.', 'verre', ['vert', 'vers', 'ver'], 'le récipient', 1],
  ['Le jardinier remplit son … d’eau.', 'seau', ['sceau', 'saut', 'sot'], 'le récipient à anse', 1],
  ['Le … du village célèbre le mariage.', 'maire', ['mer', 'mère'], 'l’élu qui dirige la commune', 2],
  ['Les cerfs et les … vivent dans le Grand Nord.', 'rennes', ['reines', 'rênes'], 'les animaux', 2],
  ['Le … est un animal de la ferme.', 'porc', ['port', 'pore'], 'l’animal', 2],
  ['Je te l’ai dit trois …', 'fois', ['foi', 'foie'], 'le nombre de répétitions', 2],
  ['Elle a gagné … euros au loto.', 'cent', ['sang', 'sans'], 'le nombre', 2],
  ['Il faut prendre la bonne … pour arriver au village.', 'voie', ['voix', 'vois'], 'le chemin', 2],
  ['Le cavalier tient les … de son cheval.', 'rênes', ['reines', 'rennes'], 'les courroies pour diriger le cheval', 2],
  ['Ce raisonnement est … : il est plein de bon sens.', 'sensé', ['censé', 'sensés'], 'qui a du bon sens', 3],
  ['Tu es … connaitre ta leçon.', 'censé', ['sensé', 'sensés'], 'supposé', 3],
  ['Le bateau entre au …', 'port', ['porc', 'pore'], 'le lieu où accostent les bateaux', 3],
  ['Ce chevalier a une … inébranlable en son roi.', 'foi', ['fois', 'foie'], 'la confiance totale', 3],
  ['Le médecin examine son … : il a trop mangé.', 'foie', ['foi', 'fois'], 'l’organe', 3],
  ['Il a perdu beaucoup de … dans l’accident.', 'sang', ['sans', 'cent'], 'le liquide rouge du corps', 3],
  ['Il est parti … dire au revoir.', 'sans', ['sang', 'cent'], 'la préposition qui marque l’absence', 3],
  ['Les élèves jouent dans la … de récréation.', 'cour', ['cours', 'court'], 'l’espace découvert', 3],
  ['Ce pantalon est trop … pour toi.', 'court', ['cour', 'cours'], 'le contraire de long', 3],
];

export const homophonesLexicaux3e = creerGenerateur({
  id: 'homophones-lexicaux-3e',
  competence: 'FR-C4-3E-VOC-04',
  cycle: 4,
  description: 'Orthographier les homophones lexicaux selon le sens de la phrase.',
  generer(a, d) {
    const [phrase, mot, pieges, sens] = a.choisir(HOMOPHONES.filter((h) => niveaux(d).includes(h[4])));
    return qcm(a, `Complète avec le mot qui convient : ${phrase}`, mot, pieges,
      'Ces mots se prononcent de la même façon : c’est le sens de la phrase qui décide.',
      `Le sens attendu ici : ${sens}. On écrit donc « ${mot} ».`, () => 'homophone-lexical');
  },
});
