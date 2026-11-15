// CE2, étude de la langue : accords, classes de mots, phrase, vocabulaire.
// Source : programme de français du cycle 2 (BO n°41 du 31 octobre 2024), p. 18-19 et 22.
import { formes } from './ce2-conjugaison';
import { creerGenerateur, options } from './outils';

const majuscule = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

// ─────────── Accord sujet-verbe : présent, imparfait, futur, verbes du 3e groupe

const ACTIONS_ER: [string, string][] = [
  ['jouer', 'dans la cour'], ['chanter', 'une chanson'], ['regarder', 'le ciel'], ['dessiner', 'un arbre'],
  ['danser', 'ensemble'], ['parler', 'fort'], ['écouter', 'la maitresse'], ['chercher', 'un trésor'],
];
const ACTIONS_3E: [string, string][] = [
  ['faire', 'un gâteau'], ['aller', 'à la piscine'], ['prendre', 'le bus'], ['dire', 'bonjour'], ['voir', 'la mer'],
];
const SUJETS_SG = ['Mon cousin', 'Ma sœur', 'Léa', 'Le garçon', 'Mon voisin', 'La fille', 'Il', 'Elle'];
const SUJETS_PL = ['Les enfants', 'Mes amis', 'Les filles', 'Mes cousins', 'Les élèves', 'Ils', 'Elles'];

export const accordSujetVerbeCe2 = creerGenerateur({
  id: 'accord-sujet-verbe-ce2',
  competence: 'FR-C2-CE2-ORTH-01',
  cycle: 2,
  description: 'Accorder le verbe avec son sujet au présent, à l’imparfait et au futur.',
  generer(a, d) {
    const [verbe, suite] = a.choisir(d === 1 ? ACTIONS_ER : [...ACTIONS_ER, ...ACTIONS_3E]);
    const temps = d === 3 ? a.choisir(['imparfait', 'futur'] as const) : 'présent';
    const pluriel = a.suivant() < 0.55;
    let sujet = a.choisir(pluriel ? SUJETS_PL : SUJETS_SG);
    if (d >= 2 && a.suivant() < 0.5) {
      // Sujets plus difficiles : deux noms, ou un nom suivi d'un complément au nombre opposé.
      sujet = pluriel
        ? a.choisir([`${a.choisir(['Léa', 'Nora', 'Inès'])} et ${a.choisir(['Tom', 'Hugo', 'Sami'])}`, 'Les enfants du voisin', 'Les amies de Léa'])
        : a.choisir(['Le fils des voisins', 'La maman des enfants', 'Le chef des pompiers']);
    }
    const liste = formes(verbe, temps);
    const forme = liste[pluriel ? 5 : 2]!;
    const autre = formes(verbe, temps === 'futur' ? 'présent' : temps === 'imparfait' ? 'futur' : 'imparfait');
    const au = temps === 'imparfait' ? 'à l’imparfait' : `au ${temps}`;
    return {
      gabarit: 'qcm',
      consigne: `Choisis le verbe ${au} : ${sujet} … ${suite}.`,
      options: options(a, forme, [liste[pluriel ? 2 : 5]!, liste[1]!, autre[pluriel ? 5 : 2]!], () => a.choisir(liste)),
      reponse: forme,
      indice: sujet.includes(' des ') || sujet.includes(' du ') || sujet.includes(' de ') ? 'Cherche le nom principal du sujet.' : 'Le sujet est-il au singulier ou au pluriel ?',
      explication: pluriel
        ? `Le sujet « ${sujet} » est au pluriel. Le verbe se termine par -nt : ${forme}.`
        : `Le sujet « ${sujet} » est au singulier. On écrit : ${forme}.`,
    };
  },
});

// ─────────── Pluriel des noms : -s, -x, -al/-aux

const PLURIELS_D1: [string, string][] = [
  ['bateau', 'bateaux'], ['gâteau', 'gâteaux'], ['oiseau', 'oiseaux'], ['chapeau', 'chapeaux'], ['château', 'châteaux'],
  ['cadeau', 'cadeaux'], ['manteau', 'manteaux'], ['rideau', 'rideaux'], ['couteau', 'couteaux'], ['tableau', 'tableaux'],
  ['seau', 'seaux'], ['drapeau', 'drapeaux'], ['jeu', 'jeux'], ['cheveu', 'cheveux'], ['feu', 'feux'], ['neveu', 'neveux'],
  ['lieu', 'lieux'], ['pneu', 'pneus'], ['bleu', 'bleus'], ['ballon', 'ballons'], ['crayon', 'crayons'], ['vélo', 'vélos'],
];
const PLURIELS_D2: [string, string][] = [
  ['bijou', 'bijoux'], ['caillou', 'cailloux'], ['chou', 'choux'], ['genou', 'genoux'], ['hibou', 'hiboux'], ['joujou', 'joujoux'],
  ['pou', 'poux'], ['clou', 'clous'], ['trou', 'trous'], ['kangourou', 'kangourous'], ['cou', 'cous'], ['verrou', 'verrous'],
  ['sou', 'sous'], ['cheval', 'chevaux'], ['journal', 'journaux'], ['animal', 'animaux'], ['hôpital', 'hôpitaux'],
  ['signal', 'signaux'], ['canal', 'canaux'], ['métal', 'métaux'], ['bocal', 'bocaux'], ['bal', 'bals'], ['festival', 'festivals'],
  ['carnaval', 'carnavals'], ['chacal', 'chacals'], ['récital', 'récitals'],
];
const ADJECTIFS = ['petit', 'grand', 'joli', 'gros'];

/** Pièges : les autres marques possibles du pluriel, et le nom laissé au singulier. */
const autresPluriels = (sg: string) => [`${sg}s`, `${sg}x`, sg, ...(sg.endsWith('al') ? [`${sg.slice(0, -2)}aux`] : [])];

export const plurielNomsCe2 = creerGenerateur({
  id: 'pluriel-noms-ce2',
  competence: 'FR-C2-CE2-ORTH-02',
  cycle: 2,
  description: 'Écrire au pluriel des noms en -eau, -eu, -ou, -al et un groupe nominal.',
  generer(a, d) {
    const [sg, pl] = a.choisir(d === 1 ? PLURIELS_D1 : PLURIELS_D2);
    const regle = sg.endsWith('al') && pl.endsWith('aux')
      ? 'Les noms en -al font souvent leur pluriel en -aux.'
      : pl.endsWith('x')
        ? `Les noms en -${sg.endsWith('eau') ? 'eau' : sg.endsWith('eu') ? 'eu' : 'ou'} prennent souvent un x au pluriel.`
        : sg.endsWith('ou') || sg.endsWith('al') || sg.endsWith('eu')
          ? `« ${sg} » fait partie des exceptions : il prend un s.`
          : 'Ce nom prend un s au pluriel.';
    if (d === 3) {
      const adj = a.choisir(ADJECTIFS);
      const adjPl = adj.endsWith('s') ? adj : `${adj}s`;
      const reponse = `${adjPl} ${pl}`;
      const pieges = [...new Set(autresPluriels(sg).filter((x) => x !== pl).map((x) => `${adjPl} ${x}`).concat(`${adj} ${pl}`))].filter((x) => x !== reponse);
      return {
        gabarit: 'qcm',
        consigne: `Écris au pluriel : le ${adj} ${sg} → les …`,
        options: options(a, reponse, a.melanger(pieges).slice(0, 3), () => `${adj} ${sg}`),
        reponse,
        indice: 'Le nom et l’adjectif s’accordent tous les deux.',
        explication: `${regle} L’adjectif « ${adj} » s’accorde aussi. On écrit : les ${reponse}.`,
      };
    }
    return {
      gabarit: 'qcm',
      consigne: `Écris au pluriel : un ${sg} → des …`,
      options: options(a, pl, autresPluriels(sg).filter((x) => x !== pl), () => sg, 3),
      reponse: pl,
      indice: 'Regarde la fin du nom.',
      explication: `${regle} On écrit : des ${pl}.`,
    };
  },
});

// ─────────── Féminin qui s'entend

// Difficulté 1 : on ajoute un e qui s'entend (voisin, voisine).
const FEMININ_E = [
  'voisin', 'marchand', 'gris', 'cousin', 'petit', 'grand', 'lourd', 'blond', 'client', 'gourmand', 'mauvais',
  'étudiant', 'président', 'chaud', 'vert', 'court', 'français', 'anglais', 'méchant', 'avocat', 'candidat', 'lent',
];
// Difficulté 2 : -eur/-euse, -eux/-euse, -f/-ve, -er/-ère, consonne doublée.
const FEMININS_D2: [string, string][] = [
  ['chanteur', 'chanteuse'], ['danseur', 'danseuse'], ['vendeur', 'vendeuse'], ['coiffeur', 'coiffeuse'], ['nageur', 'nageuse'],
  ['joueur', 'joueuse'], ['voleur', 'voleuse'], ['menteur', 'menteuse'], ['patineur', 'patineuse'], ['skieur', 'skieuse'],
  ['joyeux', 'joyeuse'], ['heureux', 'heureuse'], ['peureux', 'peureuse'], ['curieux', 'curieuse'],
  ['sportif', 'sportive'], ['neuf', 'neuve'], ['vif', 'vive'], ['actif', 'active'], ['naïf', 'naïve'], ['veuf', 'veuve'],
  ['boulanger', 'boulangère'], ['fermier', 'fermière'], ['premier', 'première'], ['dernier', 'dernière'], ['cher', 'chère'],
  ['léger', 'légère'], ['berger', 'bergère'], ['écolier', 'écolière'],
  ['ancien', 'ancienne'], ['gardien', 'gardienne'], ['musicien', 'musicienne'], ['lion', 'lionne'], ['bon', 'bonne'],
  ['champion', 'championne'], ['cruel', 'cruelle'], ['naturel', 'naturelle'], ['pareil', 'pareille'], ['chien', 'chienne'], ['mignon', 'mignonne'],
];
// Difficulté 3 : -teur/-trice, et le féminin dans un groupe nominal.
const FEMININS_TRICE: [string, string][] = [
  ['lecteur', 'lectrice'], ['acteur', 'actrice'], ['directeur', 'directrice'], ['conducteur', 'conductrice'],
  ['instituteur', 'institutrice'], ['inspecteur', 'inspectrice'], ['spectateur', 'spectatrice'], ['dessinateur', 'dessinatrice'],
  ['aviateur', 'aviatrice'], ['admirateur', 'admiratrice'], ['explorateur', 'exploratrice'], ['animateur', 'animatrice'],
];
const NOMS_GN: [string, string][] = [
  ['chanteur', 'chanteuse'], ['danseur', 'danseuse'], ['vendeur', 'vendeuse'], ['nageur', 'nageuse'], ['boulanger', 'boulangère'],
  ['fermier', 'fermière'], ['musicien', 'musicienne'], ['gardien', 'gardienne'], ['champion', 'championne'], ['voisin', 'voisine'],
  ['cousin', 'cousine'], ['lecteur', 'lectrice'], ['acteur', 'actrice'], ['directeur', 'directrice'],
];
const ADJ_GN: [string, string][] = [
  ['joyeux', 'joyeuse'], ['sportif', 'sportive'], ['curieux', 'curieuse'], ['gourmand', 'gourmande'], ['blond', 'blonde'],
  ['heureux', 'heureuse'], ['actif', 'active'], ['prudent', 'prudente'],
];

/** Règle du féminin, dite à l'élève. */
function regleFeminin(m: string, f: string): string {
  if (f.endsWith('trice')) return 'La fin -teur devient -trice.';
  if (m.endsWith('eur') || m.endsWith('eux')) return `La fin -${m.slice(-3)} devient -euse.`;
  if (f.endsWith('ve')) return 'La fin -f devient -ve.';
  if (f.endsWith('ère')) return 'La fin -er devient -ère.';
  if (f.length === m.length + 2) return 'La consonne finale double avant le e.';
  return 'On ajoute un e.';
}

/** Pièges : le masculin avec un e, le masculin seul, une fausse fin. */
function piegesFeminin(m: string, f: string): string[] {
  const fausse = f.endsWith('trice') ? m.replace(/eur$/, 'euse')
    : m.endsWith('eur') ? `${m}se`
      : m.endsWith('eux') ? m.replace(/x$/, 'sse')
        : f.endsWith('ve') ? m.replace(/f$/, 'ffe')
          : f.endsWith('ère') ? m.replace(/er$/, 'erre')
            : f === `${m}e` ? `${m}${m.slice(-1)}e` : null;
  return [`${m}e`, m, ...(fausse ? [fausse] : [])].filter((x) => x !== f);
}

export const femininCe2 = creerGenerateur({
  id: 'feminin-ce2',
  competence: 'FR-C2-CE2-ORTH-02',
  cycle: 2,
  description: 'Écrire le féminin d’un nom ou d’un adjectif qui s’entend, seul ou dans un groupe nominal.',
  generer(a, d) {
    if (d === 3 && a.suivant() < 0.5) {
      const [mn, fn] = a.choisir(NOMS_GN);
      const [ma, fa] = a.choisir(ADJ_GN);
      const reponse = `${fn} ${fa}`;
      return {
        gabarit: 'qcm',
        consigne: `Écris au féminin : un ${mn} ${ma} → une …`,
        options: options(a, reponse, [`${fn} ${ma}`, `${mn} ${fa}`, `${mn}e ${fa}`], () => `${mn} ${ma}`),
        reponse,
        indice: 'Le nom et l’adjectif changent tous les deux.',
        explication: `« ${mn} » devient « ${fn} ». « ${ma} » devient « ${fa} ». On écrit : une ${reponse}.`,
      };
    }
    const [m, f] = d === 1 ? (() => { const x = a.choisir(FEMININ_E); return [x, `${x}e`] as const; })()
      : a.choisir(d === 2 ? FEMININS_D2 : FEMININS_TRICE);
    return {
      gabarit: 'qcm',
      consigne: `Quel est le féminin de « ${m} » ?`,
      options: a.melanger([f, ...piegesFeminin(m, f)]),
      reponse: f,
      indice: d === 1 ? 'Dis le mot avec « une » devant.' : 'Dis les deux mots à voix haute : un… une…',
      explication: `On dit « ${m} » au masculin et « ${f} » au féminin. ${regleFeminin(m, f)}`,
    };
  },
});

// ─────────── Classes de mots, avec l'adverbe

const CLASSES = ['déterminant', 'nom commun', 'nom propre', 'adjectif', 'verbe', 'pronom', 'adverbe'] as const;
type Classe = (typeof CLASSES)[number];
const CODE: Record<string, Classe> = { D: 'déterminant', N: 'nom commun', P: 'nom propre', A: 'adjectif', V: 'verbe', R: 'pronom', B: 'adverbe' };

// Chaque mot étiqueté est suivi de sa classe : B adverbe, D déterminant, N nom commun, P nom propre, A adjectif, V verbe, R pronom.
const PHRASES_ANALYSEES = [
  'Le/D chat/N dort/V souvent/B', 'Léa/P court/V très/B vite/B', 'Il/R mange/V lentement/B', 'Nous/R partons/V demain/B',
  'Ma/D petite/A sœur/N chante/V bien/B', 'Tom/P range/V sa/D chambre/N aujourd’hui/B', 'Elle/R parle/V doucement/B',
  'Le/D bébé/N pleure/V encore/B', 'Ils/R arrivent/V tôt/B', 'Mon/D grand/A frère/N lit/V beaucoup/B',
  'Hugo/P marche/V assez/B vite/B', 'Cette/D tarte/N est/V si/B bonne/A', 'Vous/R chantez/V joyeusement/B',
  'La/D vieille/A tortue/N avance/V lentement/B', 'Le/D chien/N noir/A aboie/V fort/B', 'Le/D train/N part/V bientôt/B',
  'Nous/R mangeons/V ensemble/B', 'Paul/P nage/V rapidement/B', 'Tu/R travailles/V bien/B', 'La/D neige/N tombe/V doucement/B',
  'Ils/R rentrent/V tard/B', 'Le/D petit/A garçon/N rit/V souvent/B', 'Elle/R chante/V toujours/B',
  'Mon/D chat/N gris/A dort/V beaucoup/B', 'Vous/R parlez/V trop/B', 'La/D rivière/N coule/V lentement/B',
  'Ce/D gâteau/N est/V très/B bon/A',
];

export const classesMotsCe2 = creerGenerateur({
  id: 'classes-mots-ce2',
  competence: 'FR-C2-CE2-GRAM-01',
  cycle: 2,
  description: 'Reconnaitre le déterminant, le nom, l’adjectif, le verbe, le pronom sujet et l’adverbe.',
  generer(a, d) {
    const mots = a.choisir(PHRASES_ANALYSEES).split(' ').map((m) => {
      const [mot, code] = m.split('/');
      return { mot: mot!, classe: code ? CODE[code] : undefined };
    });
    const phrase = `${mots.map((m) => m.mot).join(' ')}.`;
    if (d === 3) {
      const adverbes = mots.filter((m) => m.classe === 'adverbe');
      const cible = a.choisir(adverbes);
      const autres = mots.filter((m) => m.classe && m.classe !== 'adverbe').map((m) => m.mot);
      return {
        gabarit: 'qcm',
        consigne: `Dans « ${phrase} », quel mot est un adverbe ?`,
        options: options(a, cible.mot, a.melanger(autres).slice(0, 3), () => a.choisir(autres)),
        reponse: cible.mot,
        indice: 'L’adverbe ne change jamais. Il précise souvent le verbe.',
        explication: `« ${cible.mot} » est un adverbe. Il ne varie pas.`,
      };
    }
    // Difficulté 1 : nom, verbe ou adverbe. Difficulté 2 : toutes les classes étiquetées.
    const candidats = mots.filter((m) => m.classe && (d > 1 || ['nom commun', 'verbe', 'adverbe'].includes(m.classe)));
    const cible = a.choisir(candidats);
    const classe = cible.classe!;
    return {
      gabarit: 'qcm',
      consigne: `Dans « ${phrase} », quelle est la classe du mot « ${cible.mot} » ?`,
      options: options(a, classe, a.melanger(CLASSES.filter((c) => c !== classe)).slice(0, 3), () => a.choisir(CLASSES)),
      reponse: classe,
      indice: 'Le verbe change avec le temps. L’adverbe ne change jamais.',
      explication: `« ${cible.mot} » est un ${classe}.`,
    };
  },
});

// ─────────── Groupe sujet et pronom personnel sujet

const GN_PRONOMS: [string, string][] = [
  ['Le chat', 'il'], ['Mon oncle', 'il'], ['Le facteur', 'il'], ['Mon père', 'il'], ['Le boulanger', 'il'],
  ['Ma sœur', 'elle'], ['La maitresse', 'elle'], ['Ta voisine', 'elle'], ['Ta grand-mère', 'elle'], ['La fleur', 'elle'],
  ['Les garçons', 'ils'], ['Les camions', 'ils'], ['Léa et Tom', 'ils'], ['Papi et Mamie', 'ils'], ['Les chats', 'ils'],
  ['Mes cousins', 'ils'], ['Tom et Léo', 'ils'],
  ['Les filles', 'elles'], ['Les voitures', 'elles'], ['Léa et Nora', 'elles'], ['Mes tantes', 'elles'], ['Les poules', 'elles'],
  ['Inès et Léa', 'elles'], ['Mes amies', 'elles'],
];
// Difficulté 2 : [groupe sujet court, verbe, suite].
const PHRASES_SUJET_D2: [string, string, string][] = [
  ['Les enfants', 'jouent', 'dans la cour'], ['Mon petit frère', 'mange', 'une pomme'], ['La maitresse', 'raconte', 'une histoire'],
  ['Léa et Tom', 'regardent', 'un film'], ['Les oiseaux', 'chantent', 'le matin'], ['Le facteur', 'apporte', 'une lettre'],
  ['Ma mère', 'lit', 'un livre'], ['Les loups', 'hurlent', 'fort'], ['Le boulanger', 'prépare', 'le pain'],
  ['Mes parents', 'achètent', 'des fruits'], ['La vache', 'mange', 'de l’herbe'], ['Nora', 'dessine', 'un château'],
  ['Les élèves', 'visiteront', 'un musée'], ['Mon chat', 'dort', 'sur le canapé'], ['Le vent', 'souffle', 'très fort'],
  ['Les pompiers', 'éteignent', 'le feu'], ['Hugo et Malo', 'construisent', 'une cabane'], ['Le train', 'arrive', 'en gare'],
  ['Ma grand-mère', 'tricote', 'une écharpe'], ['Les poules', 'picorent', 'du grain'], ['Le soleil', 'brille', 'dans le ciel'],
  ['Mes cousines', 'chantent', 'une chanson'],
];
// Difficulté 3 : [complément en tête, groupe sujet, verbe, suite] ; sujets longs ou placés après un complément.
const PHRASES_SUJET_D3: [string, string, string, string][] = [
  ['', 'Le chien de mes voisins', 'aboie', 'la nuit'], ['', 'Les enfants de la classe', 'préparent', 'un spectacle'],
  ['', 'La sœur de Lucie', 'joue', 'du piano'], ['', 'Les livres de la bibliothèque', 'sont', 'neufs'],
  ['', 'Le maitre de mon frère', 'corrige', 'les cahiers'], ['', 'Les amis de mon frère', 'arrivent', 'ce soir'],
  ['', 'La voiture de mes parents', 'roule', 'vite'], ['', 'Le petit chat de Léa', 'dort', 'au soleil'],
  ['', 'Les fleurs du jardin', 'poussent', 'vite'], ['', 'Le gardien du musée', 'ferme', 'les portes'],
  ['Ce matin, ', 'le facteur', 'apporte', 'une lettre'], ['Dans la forêt, ', 'les loups', 'hurlent', 'fort'],
  ['Chaque soir, ', 'ma mère', 'lit', 'un livre'], ['Au marché, ', 'mes parents', 'achètent', 'des fruits'],
  ['Demain, ', 'les élèves', 'visiteront', 'un musée'], ['Dans le pré, ', 'la vache', 'mange', 'de l’herbe'],
  ['Le mercredi, ', 'les enfants du quartier', 'jouent', 'au parc'], ['Sur la branche, ', 'le merle de Paul', 'chante', 'fort'],
  ['En hiver, ', 'les oiseaux du parc', 'cherchent', 'des graines'], ['Après la classe, ', 'les amies de Nora', 'goutent', 'ensemble'],
  ['Ce soir, ', 'le frère de Tom', 'regarde', 'un film'], ['Dans la cuisine, ', 'le chat des voisins', 'mange', 'du poisson'],
];

export const groupeSujetCe2 = creerGenerateur({
  id: 'groupe-sujet-ce2',
  competence: 'FR-C2-CE2-GRAM-02',
  cycle: 2,
  description: 'Trouver le groupe sujet d’une phrase et le remplacer par un pronom personnel sujet.',
  generer(a, d) {
    if (d === 1) {
      const [gn, pronom] = a.choisir(GN_PRONOMS);
      return {
        gabarit: 'qcm',
        consigne: `Quel pronom peut remplacer « ${gn} » ?`,
        options: a.melanger(['il', 'elle', 'ils', 'elles']),
        reponse: pronom,
        indice: 'Masculin ou féminin ? Singulier ou pluriel ?',
        explication: `« ${gn} » est au ${pronom.endsWith('s') ? 'pluriel' : 'singulier'}. On le remplace par « ${pronom} ».`,
      };
    }
    const [avant, gs, verbe, suite]: [string, string, string, string] = d === 2 ? ['', ...a.choisir(PHRASES_SUJET_D2)] : a.choisir(PHRASES_SUJET_D3);
    const phrase = majuscule(`${avant}${gs} ${verbe} ${suite}.`);
    const reponse = avant ? gs : majuscule(gs);
    // Piège des sujets longs : le nom sans son complément (« Le chien » pour « Le chien de mes voisins »).
    const tete = reponse.split(/ (?:de|du|des) /)[0]!;
    const pieges = [verbe, suite, avant ? avant.replace(/,\s*$/, '') : tete !== reponse ? tete : `${reponse} ${verbe}`];
    return {
      gabarit: 'qcm',
      consigne: `Dans « ${phrase} », quel est le groupe sujet ?`,
      options: options(a, reponse, pieges, () => `${verbe} ${suite}`),
      reponse,
      indice: d === 3 ? 'Cherche le verbe. Le groupe sujet peut être long.' : 'Cherche le verbe. Qui est-ce qui fait l’action ?',
      explication: `Le verbe est « ${verbe} ». Le groupe sujet est « ${gs} ».`,
    };
  },
});

// ─────────── Forme négative (« ne… pas » : le texte du CE2 ne prévoit pas d'autre négation)

// [début de phrase, verbe, suite]. Un début vide donne une phrase impérative.
const PHRASES_NEG_D1: [string, string, string][] = [
  ['Jean', 'ferme', 'la porte'], ['Tom', 'mange', 'sa soupe'], ['Les enfants', 'jouent', 'dehors'], ['Je', 'regarde', 'la télévision'],
  ['Nous', 'partons', 'demain'], ['Lina', 'range', 'ses jouets'], ['Le chat', 'dort', 'sur le lit'], ['Tu', 'connais', 'la réponse'],
  ['Mon frère', 'lit', 'un livre'], ['Les oiseaux', 'chantent', 'le matin'], ['Vous', 'venez', 'avec nous'], ['Il', 'pleut', 'ce matin'],
  ['Papa', 'prépare', 'le diner'], ['Nous', 'voulons', 'du pain'], ['Elle', 'court', 'vite'], ['Le bus', 'passe', 'ici'],
  ['Les filles', 'dansent', 'ensemble'], ['Je', 'vais', 'à la piscine'], ['Ma sœur', 'fait', 'ses devoirs'], ['Ils', 'prennent', 'le train'],
  ['Tu', 'sais', 'nager'], ['Le chien', 'mange', 'sa pâtée'],
];
const PHRASES_NEG_D2: [string, string, string][] = [
  ['Il', 'aime', 'les épinards'], ['Elle', 'écoute', 'la radio'], ['Tu', 'arrives', 'en retard'], ['Ils', 'habitent', 'ici'],
  ['Nous', 'avons', 'faim'], ['Vous', 'êtes', 'en retard'], ['Léo', 'oublie', 'son cartable'], ['Le bébé', 'a', 'sommeil'],
  ['Mes amis', 'arrivent', 'ce soir'], ['On', 'entend', 'la mer'],
  ['', 'ferme', 'la porte'], ['', 'range', 'ta chambre'], ['', 'ouvre', 'la fenêtre'], ['', 'écris', 'au tableau'],
  ['', 'cours', 'dans le couloir'], ['', 'touche', 'le four'], ['', 'oublie', 'ton manteau'], ['', 'mange', 'trop vite'],
  ['', 'regarde', 'la télévision'], ['', 'attends', 'le bus'], ['', 'crie', 'si fort'],
];
// Difficulté 3 : « j’ » qui redevient « je », impératives avec une personne interpelée, phrases plus longues.
const PHRASES_NEG_D3: [string, string, string][] = [
  ['Je', 'aime', 'le chocolat'], ['Je', 'écoute', 'la musique'], ['Je', 'habite', 'en ville'], ['Je', 'arrive', 'à l’heure'],
  ['Je', 'ai', 'froid'], ['Jean,', 'ferme', 'la porte'], ['Léa,', 'range', 'tes crayons'], ['Hugo,', 'ouvre', 'la fenêtre'],
  ['Les enfants,', 'courez', 'dans la cour'], ['Maman,', 'attends', 'devant l’école'],
  ['Ce matin, mon petit frère', 'mange', 'sa soupe'], ['Le soir, mes parents', 'regardent', 'un film'],
  ['Dans la cour, les enfants', 'jouent', 'au ballon'], ['Mon grand frère', 'aime', 'beaucoup le football'],
  ['Le chien des voisins', 'aboie', 'toute la nuit'], ['Cet été, nous', 'irons', 'à la mer'], ['Demain, tu', 'iras', 'à la piscine'],
  ['Les élèves de la classe', 'écoutent', 'la maitresse'], ['Ma petite sœur', 'dessine', 'un grand soleil'],
  ['Le matin, je', 'bois', 'du lait'], ['Au parc, Lina', 'joue', 'avec son chien'],
];

export const formeNegativeCe2 = creerGenerateur({
  id: 'forme-negative-ce2',
  competence: 'FR-C2-CE2-GRAM-03',
  cycle: 2,
  description: 'Transformer une phrase déclarative ou impérative à la forme négative avec ne… pas.',
  generer(a, d) {
    const [avant, verbe, suite] = a.choisir(d === 1 ? PHRASES_NEG_D1 : d === 2 ? PHRASES_NEG_D2 : PHRASES_NEG_D3);
    const elision = /^[aeéèêiouh]/.test(verbe);
    // « J’aime » devient « Je n’aime pas » : le je élidé reprend son e.
    const jeElide = elision && /(^|\s)[Jj]e$/.test(avant);
    const debut = avant ? `${avant} ` : '';
    const debutAffirmatif = jeElide ? avant.replace(/e$/, '’') : debut;
    const ne = elision ? 'n’' : 'ne ';
    const mauvaisNe = elision ? 'ne ' : 'n’';
    const phrase = majuscule(`${debutAffirmatif}${verbe} ${suite}.`);
    const reponse = majuscule(`${debut}${ne}${verbe} pas ${suite}.`);
    const pieges = [
      majuscule(`${debutAffirmatif}${verbe} pas ${suite}.`),
      majuscule(`${debut}${ne}${verbe} ${suite}.`),
      majuscule(`${debut}ne pas ${verbe} ${suite}.`),
      majuscule(`${debut}${mauvaisNe}${verbe} pas ${suite}.`),
    ];
    const regle = jeElide
      ? 'On encadre le verbe avec n’ et pas. Le j’ redevient je.'
      : elision
        ? 'On encadre le verbe avec n’ et pas. Devant une voyelle, ne devient n’.'
        : 'On encadre le verbe avec ne et pas.';
    return {
      gabarit: 'qcm',
      consigne: `« ${phrase} » Mets cette phrase à la forme négative.`,
      options: options(a, reponse, a.melanger(pieges).slice(0, 3), () => pieges[0]!),
      reponse,
      indice: 'La négation a deux morceaux : ne et pas.',
      explication: `${regle} On écrit : ${reponse}`,
    };
  },
});

// ─────────── Préfixes : sens négatif (dé-, mal-, mé-, in-, im-) ou répétition (re-)

const ADJ_NEGATIFS: [string, string][] = [
  ['impossible', 'possible'], ['impatient', 'patient'], ['imprudent', 'prudent'], ['immobile', 'mobile'], ['impoli', 'poli'],
  ['impair', 'pair'], ['imbuvable', 'buvable'], ['invisible', 'visible'], ['injuste', 'juste'], ['inutile', 'utile'],
  ['inconnu', 'connu'], ['incapable', 'capable'], ['inactif', 'actif'], ['incorrect', 'correct'], ['inexact', 'exact'],
  ['inégal', 'égal'], ['incomplet', 'complet'], ['malheureux', 'heureux'], ['malhonnête', 'honnête'], ['maladroit', 'adroit'],
  ['malpropre', 'propre'], ['mécontent', 'content'],
];
const VERBES_PREFIXES: [string, string, 'contraire' | 'nouveau'][] = [
  ['défaire', 'faire', 'contraire'], ['décoller', 'coller', 'contraire'], ['déplier', 'plier', 'contraire'],
  ['déranger', 'ranger', 'contraire'], ['démonter', 'monter', 'contraire'], ['déboucher', 'boucher', 'contraire'],
  ['débrancher', 'brancher', 'contraire'], ['décharger', 'charger', 'contraire'], ['décongeler', 'congeler', 'contraire'],
  ['dégonfler', 'gonfler', 'contraire'], ['dévisser', 'visser', 'contraire'], ['déboutonner', 'boutonner', 'contraire'],
  ['refaire', 'faire', 'nouveau'], ['relire', 'lire', 'nouveau'], ['repeindre', 'peindre', 'nouveau'], ['redire', 'dire', 'nouveau'],
  ['recoller', 'coller', 'nouveau'], ['revoir', 'voir', 'nouveau'], ['recompter', 'compter', 'nouveau'], ['replier', 'plier', 'nouveau'],
  ['remonter', 'monter', 'nouveau'], ['recharger', 'charger', 'nouveau'], ['refermer', 'fermer', 'nouveau'],
];

export const prefixesCe2 = creerGenerateur({
  id: 'prefixes-ce2',
  competence: 'FR-C2-CE2-LEX-01',
  cycle: 2,
  description: 'Trouver le sens d’un mot formé avec un préfixe : dé-, mal-, mé-, in-, im-, re-.',
  generer(a, d) {
    if (d === 1) {
      const [mot, base] = a.choisir(ADJ_NEGATIFS);
      const reponse = `pas ${base}`;
      return {
        gabarit: 'qcm',
        consigne: `Que veut dire « ${mot} » ?`,
        options: a.melanger([reponse, `très ${base}`, `un peu ${base}`, `${base} avant`]),
        reponse,
        indice: `Cherche le mot « ${base} » caché dedans.`,
        explication: `« ${majuscule(mot)} », c’est « ${base} » avec un préfixe. Ce préfixe veut dire « pas ».`,
      };
    }
    if (d === 2) {
      const [mot, base, sens] = a.choisir(VERBES_PREFIXES);
      const reponse = sens === 'contraire' ? `le contraire de ${base}` : `${base} de nouveau`;
      return {
        gabarit: 'qcm',
        consigne: `Que veut dire « ${mot} » ?`,
        options: a.melanger([`le contraire de ${base}`, `${base} de nouveau`, `${base} avant`, `bien ${base}`]),
        reponse,
        indice: 'Regarde le début du mot.',
        explication: sens === 'contraire'
          ? `Le préfixe dé- donne le sens contraire. « ${majuscule(mot)} », c’est le contraire de « ${base} ».`
          : `Le préfixe re- veut dire « de nouveau ». « ${majuscule(mot)} », c’est ${base} de nouveau.`,
      };
    }
    // Difficulté 3 : trouver le contraire parmi des mots à préfixe de sens différent.
    const contraires = [...ADJ_NEGATIFS, ...VERBES_PREFIXES.filter((v) => v[2] === 'contraire')];
    const [mot, base] = a.choisir(contraires);
    const autres = a.melanger(contraires.filter(([, b]) => b !== base)).slice(0, 3).map(([m]) => m);
    return {
      gabarit: 'qcm',
      consigne: `Quel mot est le contraire de « ${base} » ?`,
      options: a.melanger([mot, ...autres]),
      reponse: mot,
      indice: `Cherche le mot « ${base} » avec un préfixe devant.`,
      explication: `« ${majuscule(mot)} », c’est « ${base} » avec un préfixe. Ce préfixe donne le sens contraire.`,
    };
  },
});

// ─────────── Familles de mots et dérivation

const FAMILLES = [
  ['fleur', 'fleuriste', 'fleurir'], ['jardin', 'jardinier', 'jardinage'], ['dent', 'dentiste', 'dentier'],
  ['lait', 'laitier', 'laitage'], ['terre', 'terrain', 'terrier'], ['glace', 'glacier', 'glaçon'],
  ['neige', 'neiger', 'neigeux'], ['chant', 'chanteur', 'chanson'], ['bois', 'boisé', 'boiserie'],
  ['poisson', 'poissonnier', 'poissonnerie'], ['boulanger', 'boulangerie', 'boulangère'], ['coiffer', 'coiffeur', 'coiffure'],
];
// [nom, verbe, adjectif] d'une même famille.
const DERIVES: [string, string, string][] = [
  ['observation', 'observer', 'observable'], ['lavage', 'laver', 'lavable'], ['création', 'créer', 'créatif'],
  ['invention', 'inventer', 'inventif'], ['admiration', 'admirer', 'admirable'], ['utilisation', 'utiliser', 'utilisable'],
];
const CLASSES_DERIVES = ['nom', 'verbe', 'adjectif'] as const;

export const famillesMotsCe2 = creerGenerateur({
  id: 'familles-mots-ce2',
  competence: 'FR-C2-CE2-LEX-02',
  cycle: 2,
  description: 'Reconnaitre les mots d’une même famille ; trouver le nom, le verbe ou l’adjectif dérivé.',
  generer(a, d) {
    if (d === 3) {
      const [famille, autre] = a.melanger(DERIVES).slice(0, 2) as [[string, string, string], [string, string, string]];
      const [donnee, cherchee, troisieme] = a.melanger([0, 1, 2] as const) as (0 | 1 | 2)[] as [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2];
      const classe = CLASSES_DERIVES[cherchee];
      const reponse = famille[cherchee];
      return {
        gabarit: 'qcm',
        consigne: `Quel ${classe} est de la même famille que « ${famille[donnee]} » ?`,
        options: a.melanger([reponse, famille[troisieme], autre[cherchee], autre[troisieme]]),
        reponse,
        indice: 'Cherche la partie commune. Puis vérifie la classe du mot.',
        explication: `« ${famille[donnee]} » et « ${reponse} » ont une partie commune. « ${majuscule(reponse)} » est un ${classe}.`,
      };
    }
    const [famille, ...autres] = a.melanger(FAMILLES).slice(0, 4) as string[][];
    const [donne, membre] = a.melanger(famille!).slice(0, 2) as [string, string];
    if (d === 1) {
      const reponse = membre;
      return {
        gabarit: 'qcm',
        consigne: `Quel mot est de la même famille que « ${donne} » ?`,
        options: a.melanger([reponse, ...autres.map((f) => a.choisir(f))]),
        reponse,
        indice: 'Cherche la partie commune aux deux mots.',
        explication: `« ${donne} » et « ${reponse} » ont une partie commune. Ils sont de la même famille.`,
      };
    }
    const intrus = a.choisir(autres[0]!);
    const restants = famille!.filter((m) => m !== donne);
    return {
      gabarit: 'qcm',
      consigne: `Quel mot n’est pas de la même famille que « ${donne} » ?`,
      options: a.melanger([...restants, intrus]),
      reponse: intrus,
      indice: `Cherche la partie commune avec « ${donne} ».`,
      explication: `« ${majuscule(restants[0]!)} » et « ${restants[1]} » ont une partie commune avec « ${donne} ». « ${majuscule(intrus)} » est l’intrus.`,
    };
  },
});

// ─────────── Termes génériques et synonymes

const CATEGORIES: { pluriel: string; singulier: string; mots: string[] }[] = [
  { pluriel: 'des fruits', singulier: 'un fruit', mots: ['pomme', 'poire', 'cerise', 'banane', 'fraise', 'abricot'] },
  { pluriel: 'des légumes', singulier: 'un légume', mots: ['carotte', 'poireau', 'navet', 'haricot', 'courgette', 'radis'] },
  { pluriel: 'des oiseaux', singulier: 'un oiseau', mots: ['moineau', 'pigeon', 'merle', 'aigle', 'hibou', 'corbeau'] },
  { pluriel: 'des outils', singulier: 'un outil', mots: ['marteau', 'scie', 'tournevis', 'pince', 'pelle', 'râteau'] },
  { pluriel: 'des meubles', singulier: 'un meuble', mots: ['table', 'chaise', 'armoire', 'lit', 'buffet', 'commode'] },
  { pluriel: 'des vêtements', singulier: 'un vêtement', mots: ['pantalon', 'robe', 'chemise', 'manteau', 'jupe', 'pull'] },
  { pluriel: 'des instruments de musique', singulier: 'un instrument de musique', mots: ['piano', 'guitare', 'violon', 'flûte', 'tambour', 'trompette'] },
  { pluriel: 'des véhicules', singulier: 'un véhicule', mots: ['voiture', 'camion', 'moto', 'autobus', 'tracteur', 'vélo'] },
];
const SYNONYMES: [string, string][] = [
  ['peur', 'crainte'], ['content', 'joyeux'], ['maison', 'habitation'], ['voiture', 'automobile'], ['commencer', 'débuter'],
  ['finir', 'terminer'], ['triste', 'malheureux'], ['calme', 'tranquille'], ['bâtir', 'construire'], ['regarder', 'observer'],
];

export const generiquesSynonymesCe2 = creerGenerateur({
  id: 'generiques-synonymes-ce2',
  competence: 'FR-C2-CE2-LEX-03',
  cycle: 2,
  description: 'Trouver le terme générique d’une liste, l’intrus d’une catégorie, un synonyme.',
  generer(a, d) {
    if (d === 3) {
      const [paire, ...autres] = a.melanger(SYNONYMES).slice(0, 4) as [string, string][];
      const [mot, synonyme] = a.melanger(paire!) as [string, string];
      return {
        gabarit: 'qcm',
        consigne: `Quel mot a presque le même sens que « ${mot} » ?`,
        options: a.melanger([synonyme, ...autres.map((p) => a.choisir(p))]),
        reponse: synonyme,
        indice: 'Remplace le mot dans une phrase. Le sens reste-t-il le même ?',
        explication: `« ${majuscule(mot)} » et « ${synonyme} » ont presque le même sens. Ce sont des synonymes.`,
      };
    }
    const [cat, ...autres] = a.melanger(CATEGORIES).slice(0, 4);
    if (d === 1) {
      const mots = a.melanger(cat!.mots).slice(0, 3);
      return {
        gabarit: 'qcm',
        consigne: `Quel mot désigne à la fois : ${mots.join(', ')} ?`,
        options: a.melanger([cat!.pluriel, ...autres.map((c) => c.pluriel)]),
        reponse: cat!.pluriel,
        indice: 'Cherche le mot qui les regroupe tous.',
        explication: `${majuscule(mots.join(', '))} sont ${cat!.pluriel}.`,
      };
    }
    const mots = a.melanger(cat!.mots).slice(0, 3);
    const intrus = a.choisir(autres[0]!.mots);
    return {
      gabarit: 'qcm',
      consigne: `Quel mot n’est pas ${cat!.singulier} ?`,
      options: a.melanger([...mots, intrus]),
      reponse: intrus,
      indice: `Cherche les trois mots qui sont ${cat!.pluriel}.`,
      explication: `${majuscule(mots.join(', '))} sont ${cat!.pluriel}. « ${majuscule(intrus)} » est ${autres[0]!.singulier}.`,
    };
  },
});
