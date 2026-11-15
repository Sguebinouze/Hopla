// CE1, étude de la langue. Source : programme de français du cycle 2 (BO n°41 du 31 octobre 2024).
import { choix, creerGenerateur } from './outils';

// Verbes du premier groupe sans particularité orthographique (pas de -ger, -cer, -yer, -eler, -eter, -ier,
// ni de e ou é dans l'avant-dernière syllabe).
export const VERBES_ER = ['chanter', 'jouer', 'parler', 'marcher', 'danser', 'regarder', 'aimer', 'écouter',
  'arriver', 'dessiner', 'sauter', 'trouver', 'porter', 'tomber', 'rentrer', 'habiter', 'aider', 'garder', 'gouter', 'raconter'];

export const PERSONNES = ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles'] as const;
type Personne = (typeof PERSONNES)[number];
const RANG: Record<Personne, number> = { je: 0, tu: 1, il: 2, elle: 2, nous: 3, vous: 4, ils: 5, elles: 5 };
const FIN_PRESENT = ['e', 'es', 'e', 'ons', 'ez', 'ent'];
export const ETRE = ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'];
export const AVOIR = ['ai', 'as', 'a', 'avons', 'avez', 'ont'];

const voyelle = (s: string) => /^[aeéèêiouh]/i.test(s);
/** « je » devient « j’ » devant une voyelle. */
export const sujetDevant = (p: Personne, forme: string) => (p === 'je' && voyelle(forme) ? 'j’' : `${p} `);

// ─────────── Présent : être, avoir, premier groupe

export const presentCe1 = creerGenerateur({
  id: 'present-ce1',
  competence: 'FR-C2-CE1-CONJ-01',
  cycle: 2,
  description: 'Conjuguer au présent être, avoir et les verbes du premier groupe.',
  generer(a, d) {
    const p = a.choisir(d === 1 ? (['je', 'tu', 'il', 'elle'] as const) : PERSONNES);
    const irregulier = d === 2 || (d === 3 && a.suivant() < 0.3);
    if (irregulier) {
      const etre = a.suivant() < 0.5;
      const table = etre ? ETRE : AVOIR;
      const forme = table[RANG[p]]!;
      return {
        gabarit: 'qcm',
        consigne: `Complète avec le verbe ${etre ? 'être' : 'avoir'} au présent : ${sujetDevant(p, forme).trim()} …`,
        ...choix(a, forme, a.melanger(table).slice(0, 3).map((x): [string, string] => [x, 'accord-personne']), () => a.choisir(table)),
        reponse: forme,
        indice: `Récite le verbe ${etre ? 'être' : 'avoir'} au présent.`,
        explication: `Le verbe ${etre ? 'être' : 'avoir'} ne suit pas de modèle. Au présent, on écrit : ${sujetDevant(p, forme)}${forme}.`,
      };
    }
    const verbe = a.choisir(VERBES_ER);
    const radical = verbe.slice(0, -2);
    const fin = FIN_PRESENT[RANG[p]]!;
    const forme = radical + fin;
    const autres = ['e', 'es', 'ons', 'ez', 'ent'].filter((f) => f !== fin).map((f) => radical + f);
    return {
      gabarit: 'qcm',
      consigne: `Complète avec le verbe ${verbe} au présent : ${sujetDevant(p, forme).trim()} …`,
      ...choix(a, forme, a.melanger(autres).slice(0, 3).map((x): [string, string] => [x, 'accord-personne']), () => radical + a.choisir(['e', 'es', 'ons', 'ez', 'ent'])),
      reponse: forme,
      indice: 'Regarde le sujet. Il commande la terminaison.',
      explication: `Avec « ${p} », la terminaison est -${fin}. On écrit : ${sujetDevant(p, forme)}${forme}.`,
    };
  },
});

// ─────────── Retrouver l'infinitif d'un verbe du premier groupe

const FIN_FUTUR = ['ai', 'as', 'a', 'ons', 'ez', 'ont'];
const FIN_IMPARFAIT = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'];

export const infinitifCe1 = creerGenerateur({
  id: 'infinitif-ce1',
  competence: 'FR-C2-CE1-CONJ-02',
  cycle: 2,
  description: 'Trouver l’infinitif d’un verbe du premier groupe conjugué.',
  generer(a, d) {
    const verbe = a.choisir(VERBES_ER);
    const radical = verbe.slice(0, -2);
    const p = a.choisir(PERSONNES);
    const r = RANG[p];
    const temps = d === 1 ? 'present' : d === 2 ? 'futur' : a.choisir(['imparfait', 'passe'] as const);
    const forme =
      temps === 'present' ? radical + FIN_PRESENT[r]
      : temps === 'futur' ? verbe + FIN_FUTUR[r]
      : temps === 'imparfait' ? radical + FIN_IMPARFAIT[r]
      : `${AVOIR[r]} ${radical}é`;
    const conjugue = `${sujetDevant(p, forme)}${forme}`;
    return {
      gabarit: 'qcm',
      consigne: `Quel est l’infinitif du verbe : ${conjugue} ?`,
      ...choix(a, verbe, [[`${radical}é`, 'participe-pour-infinitif'], [`${radical}ent`, 'conjugue-pour-infinitif'], [`${radical}e`, 'conjugue-pour-infinitif']], () => `${radical}ons`),
      reponse: verbe,
      indice: 'Cherche le radical. Puis ajoute -er.',
      explication: `Le radical est « ${radical} ». L’infinitif se termine par -er : ${verbe}.`,
    };
  },
});

// ─────────── Accords dans le groupe nominal : pluriel en -s, féminin en -e

export const NOMS_M = ['chat', 'chien', 'livre', 'vélo', 'crayon', 'jardin', 'camion', 'ballon', 'lapin', 'garçon', 'train', 'mouton'];
export const NOMS_F = ['fleur', 'table', 'maison', 'poule', 'pomme', 'voiture', 'robe', 'tortue', 'fille', 'chaise'];
const ADJ_AVANT = ['petit', 'grand', 'joli'];
const ADJ_APRES = ['noir', 'vert', 'bleu'];

export const plurielGnCe1 = creerGenerateur({
  id: 'pluriel-gn-ce1',
  competence: 'FR-C2-CE1-ORTH-01',
  cycle: 2,
  description: 'Mettre au pluriel un groupe nominal (nom et adjectif) : -s, -e.',
  generer(a, d) {
    const feminin = d === 3;
    const nom = a.choisir(feminin ? NOMS_F : NOMS_M);
    const avant = d !== 1 && a.suivant() < 0.6;
    const adjM = a.choisir(avant ? ADJ_AVANT : ADJ_APRES);
    const adj = feminin ? `${adjM}e` : adjM;
    const defini = a.suivant() < 0.5;
    const det = defini ? (feminin ? 'la' : 'le') : feminin ? 'une' : 'un';
    const detPl = defini ? 'les' : 'des';
    const gn = (n: string, x: string) => (avant ? `${x} ${n}` : `${n} ${x}`);
    const reponse = gn(`${nom}s`, `${adj}s`);
    const pieges: [string, string][] = [[gn(nom, `${adj}s`), 'accord-nom'], [gn(`${nom}s`, adj), 'accord-adjectif'], feminin ? [gn(`${nom}s`, `${adjM}s`), 'accord-adjectif'] : [gn(nom, adj), 'pluriel-oublie']];
    return {
      gabarit: 'qcm',
      consigne: `Écris au pluriel : ${det} ${gn(nom, adj)} → ${detPl} …`,
      ...choix(a, reponse, pieges, () => gn(nom, adj)),
      reponse,
      indice: 'Au pluriel, le nom prend un s. L’adjectif aussi.',
      explication: feminin
        ? `« ${adj} » va avec « ${nom} ». Il est au féminin et au pluriel. On écrit : ${detPl} ${reponse}.`
        : `Le nom et l’adjectif prennent un s. On ne l’entend pas. On écrit : ${detPl} ${reponse}.`,
    };
  },
});

// ─────────── Accord sujet-verbe : la marque -nt du pluriel

const ACTIONS: [string, string][] = [
  ['jouer', 'dans la cour'], ['chanter', 'une chanson'], ['regarder', 'le ciel'], ['dessiner', 'un arbre'],
  ['marcher', 'vite'], ['danser', 'ensemble'], ['parler', 'fort'], ['sauter', 'très haut'], ['écouter', 'la maitresse'],
];
const SUJETS_SG = ['Le chat', 'Ma sœur', 'Léa', 'Le garçon', 'Mon voisin', 'La fille'];
const SUJETS_PL = ['Les enfants', 'Mes amis', 'Les filles', 'Mes cousins', 'Les élèves'];

export const accordSujetVerbeCe1 = creerGenerateur({
  id: 'accord-sujet-verbe-ce1',
  competence: 'FR-C2-CE1-ORTH-02',
  cycle: 2,
  description: 'Accorder le verbe avec son sujet : marque -nt du pluriel.',
  generer(a, d) {
    const [verbe, suite] = a.choisir(ACTIONS);
    const radical = verbe.slice(0, -2);
    const pluriel = a.suivant() < 0.6;
    let sujet = a.choisir(pluriel ? SUJETS_PL : SUJETS_SG);
    if (d === 2 && pluriel) sujet = `${a.choisir(['Léa', 'Nora', 'Inès'])} et ${a.choisir(['Tom', 'Hugo', 'Sami'])}`;
    if (d === 3) sujet = pluriel ? `Les chiens du voisin` : `Le chien des voisins`;
    const forme = radical + (pluriel ? 'ent' : 'e');
    return {
      gabarit: 'qcm',
      consigne: `Choisis le bon verbe : ${sujet} … ${suite}.`,
      ...choix(a, forme, [[`${radical}e`, 'accord-sujet-verbe'], [`${radical}es`, 'accord-personne'], [`${radical}ent`, 'accord-sujet-verbe'], [`${radical}ons`, 'accord-personne']], () => `${radical}ez`),
      reponse: forme,
      indice: d === 3 ? 'Cherche qui fait l’action.' : 'Le sujet est-il au singulier ou au pluriel ?',
      explication: pluriel
        ? `Le sujet est « ${sujet} ». Il est au pluriel. Le verbe se termine par -nt : ${forme}.`
        : `Le sujet est « ${sujet} ». Il est au singulier. On écrit : ${forme}.`,
    };
  },
});

// ─────────── Classes de mots

export const DETERMINANTS = ['le', 'la', 'les', 'un', 'une', 'des', 'mon', 'ma', 'ce', 'cette'];
export const PRONOMS_SUJETS = ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles'];
export const CLASSES = ['déterminant', 'nom commun', 'nom propre', 'adjectif', 'verbe', 'pronom'] as const;
type Classe = (typeof CLASSES)[number];
const CODE: Record<string, Classe> = { D: 'déterminant', N: 'nom commun', P: 'nom propre', A: 'adjectif', V: 'verbe', R: 'pronom' };

// Chaque mot est suivi de sa classe : D déterminant, N nom commun, P nom propre, A adjectif, V verbe, R pronom.
const PHRASES_ANALYSEES = [
  'Le/D chat/N noir/A dort/V', 'Léa/P regarde/V la/D lune/N', 'Il/R mange/V une/D grosse/A pomme/N',
  'Mon/D petit/A frère/N joue/V', 'Tom/P lance/V le/D ballon/N', 'Elle/R porte/V une/D robe/N bleue/A',
  'Cette/D fleur/N sent/V bon', 'Nous/R visitons/V Paris/P', 'La/D vieille/A dame/N lit/V',
  'Le/D chien/N blanc/A aboie/V', 'Hugo/P dessine/V un/D bateau/N', 'Ils/R chantent/V une/D chanson/N',
  'Ma/D sœur/N cherche/V Félix/P', 'Le/D grand/A arbre/N tombe/V', 'Tu/R ranges/V ta chambre/N',
];

export const classesMotsCe1 = creerGenerateur({
  id: 'classes-mots-ce1',
  competence: 'FR-C2-CE1-GRAM-01',
  cycle: 2,
  description: 'Reconnaitre le déterminant, le nom, l’adjectif, le verbe, le pronom sujet.',
  generer(a, d) {
    const mots = a.choisir(PHRASES_ANALYSEES).split(' ').map((m) => {
      const [mot, code] = m.split('/');
      return { mot: mot!, classe: code ? CODE[code] : undefined };
    });
    const phrase = `${mots.map((m) => m.mot).join(' ')}.`;
    // Difficulté 1 : nom ou verbe. Ensuite, toutes les classes étiquetées.
    const candidats = mots.filter((m) => m.classe && (d > 1 || m.classe === 'nom commun' || m.classe === 'verbe'));
    const cible = a.choisir(candidats);
    const classe = cible.classe!;
    return {
      gabarit: 'qcm',
      consigne: `Dans « ${phrase} », quelle est la classe du mot « ${cible.mot} » ?`,
      ...choix(a, classe, a.melanger(CLASSES.filter((c) => c !== classe)).slice(0, 3).map((c): [string, string] => [c,
        (c === 'déterminant' && classe === 'pronom') || (c === 'pronom' && classe === 'déterminant') ? 'determinant-pronom-confondus' : 'classe-grammaticale-confondue']), () => a.choisir(CLASSES)),
      reponse: classe,
      indice: 'Le verbe change avec le temps. Le nom suit souvent un déterminant.',
      explication: `« ${cible.mot} » est un ${classe}.`,
    };
  },
});

// ─────────── Types de phrases

export const TYPES = ['déclarative', 'interrogative', 'impérative'] as const;
export const PHRASES_TYPES: Record<(typeof TYPES)[number], string[]> = {
  déclarative: ['Le soleil brille.', 'Mon chat dort sur le lit.', 'Nous allons à la piscine.', 'Il pleut depuis ce matin.', 'Léo range ses crayons.'],
  interrogative: ['Où est mon cartable ?', 'As-tu fini ton dessin ?', 'Quelle heure est-il ?', 'Est-ce que tu viens ?', 'Pourquoi pleure-t-il ?'],
  impérative: ['Ferme la porte.', 'Range ta chambre.', 'Viens vite !', 'Écoute bien la consigne.', 'Lave-toi les mains.'],
};
const RAISON: Record<(typeof TYPES)[number], string> = {
  déclarative: 'Elle donne une information.',
  interrogative: 'Elle pose une question. Elle finit par un point d’interrogation.',
  impérative: 'Elle donne un ordre ou un conseil.',
};

export const typesPhrasesCe1 = creerGenerateur({
  id: 'types-phrases-ce1',
  competence: 'FR-C2-CE1-GRAM-02',
  cycle: 2,
  description: 'Reconnaitre une phrase déclarative, interrogative ou impérative.',
  generer(a) {
    const type = a.choisir(TYPES);
    const phrase = a.choisir(PHRASES_TYPES[type]);
    return {
      gabarit: 'qcm',
      consigne: `« ${phrase} » Quel est le type de cette phrase ?`,
      options: a.melanger([...TYPES]),
      erreurs: Object.fromEntries(TYPES.filter((t) => t !== type).map((t) => [t, 'type-phrase-confondu'])),
      reponse: type,
      indice: 'Donne-t-elle une information, pose-t-elle une question ou donne-t-elle un ordre ?',
      explication: `C’est une phrase ${type}. ${RAISON[type]}`,
    };
  },
});
