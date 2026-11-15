// CP, lecture, vocabulaire et étude de la langue, sans audio.
// Source : programme de français du cycle 2 (BO n°41 du 31 octobre 2024).
import { choix, creerGenerateur, erreursDe, type Piege } from './outils';

/** Codes d'erreur : la même étiquette pour toutes les options fausses. */
const tous = (opts: string[], reponse: string, code: string) => Object.fromEntries(opts.filter((o) => o !== reponse).map((o) => [o, code]));

const TROU = '…';

// ─────────── Lettres et sons : quel mot contient le son…

// Chaque mot liste les sons suivis qu'il contient. Pour o, è, in et an, la graphie suit les deux-points.
// Sons suivis : a i o u é è l r m f v ch ou on an in oi eu gn.
const MOTS_SONS = [
  'lune:l u', 'tortue:o=o r u', 'vélo:v é l o=o', 'moto:m o=o', 'robot:r o=o', 'domino:o=o m i', 'ami:a m i', 'pile:i l',
  'riz:r i', 'lit:l i', 'sac:a', 'papa:a', 'tapis:a i', 'mur:m u r', 'jupe:u', 'tulipe:u l i', 'bébé:é', 'café:a f é',
  'fusée:f u é', 'été:é', 'école:é o=o l', 'nez:é', 'chèvre:ch è=è v r', 'père:è=è r', 'zèbre:è=è r', 'flèche:f l è=è ch',
  'fête:f è=ê', 'tête:è=ê', 'forêt:f o=o r è=ê', 'lait:l è=ai', 'fraise:f r è=ai', 'chaise:ch è=ai', 'maison:m è=ai on',
  'neige:è=ei', 'reine:r è=ei', 'baleine:a l è=ei', 'peigne:è=ei gn', 'farine:f a r i', 'vache:v a ch', 'cheval:ch v a l',
  'niche:i ch', 'mouche:m ou ch', 'loup:l ou', 'roue:r ou', 'poule:ou l', 'soupe:ou', 'hibou:i ou', 'pont:on', 'savon:a v on',
  'citron:i r on', 'melon:m l on', 'maman:m a an=an', 'gant:an=an', 'ruban:r u an=an', 'orange:o=o r an=an', 'dent:an=en',
  'vent:v an=en', 'tente:an=en', 'lampe:l an=am', 'jambe:an=am', 'chambre:ch an=am r', 'tempête:an=em è=ê', 'temps:an=em',
  'lapin:l a in=in', 'sapin:a in=in', 'jardin:a r in=in', 'matin:m a in=in', 'timbre:in=im r', 'simple:in=im l',
  'pain:in=ain', 'main:m in=ain', 'train:r in=ain', 'bain:in=ain', 'plein:l in=ein', 'ceinture:in=ein u r', 'peinture:in=ein u r',
  'roi:r oi', 'poire:oi r', 'étoile:é oi l', 'voiture:v oi u r', 'noix:oi', 'bois:oi', 'feu:f eu', 'fleur:f l eu r',
  'cheveu:ch v eu', 'bleu:l eu', 'jeu:eu', 'peur:eu r', 'montagne:m on a gn', 'ligne:l i gn', 'araignée:a r è=ai gn é',
  'champignon:ch an=am i gn on', 'agneau:a gn o=eau', 'auto:o=au o=o', 'jaune:o=au', 'saule:o=au l', 'épaule:é o=au l',
  'sauce:o=au', 'bateau:a o=eau', 'gâteau:a o=eau', 'seau:o=eau', 'chapeau:ch a o=eau', 'oiseau:oi o=eau', 'râteau:r a o=eau',
  'couteau:ou o=eau', 'château:ch a o=eau',
].map((ligne) => {
  const [mot, sons] = ligne.split(':') as [string, string];
  const liste = sons.split(' ').map((s) => s.split('=') as [string, string | undefined]);
  return { mot, sons: new Set(liste.map(([s]) => s)), graphies: new Set(liste.filter(([, g]) => g).map(([s, g]) => `${s}=${g}`)) };
});

// Difficulté 1 : voyelles et consonnes simples (o et è écrits o et è).
const SONS_SIMPLES: [string, string | null][] = [
  ['a', null], ['i', null], ['o', 'o'], ['u', null], ['é', null], ['è', 'è'],
  ['l', null], ['r', null], ['m', null], ['f', null], ['v', null], ['ch', null],
];
// Difficulté 2 : sons écrits avec deux lettres. « au » est le son o écrit au.
const SONS_DEUX_LETTRES: [string, string, string | null][] = [
  ['ou', 'ou', null], ['on', 'on', null], ['an', 'an', 'an'], ['in', 'in', 'in'], ['oi', 'oi', null], ['au', 'o', 'au'], ['eu', 'eu', null], ['gn', 'gn', null],
];
// Difficulté 3 : un même son, plusieurs graphies.
const GRAPHIES: Record<string, string[]> = { o: ['o', 'au', 'eau'], in: ['in', 'im', 'ain', 'ein'], an: ['an', 'en', 'am', 'em'], è: ['è', 'ê', 'ai', 'ei'] };
const TOUS_LES_SONS = ['a', 'i', 'o', 'u', 'é', 'è', 'l', 'r', 'm', 'f', 'v', 'ch', 'ou', 'on', 'an', 'in', 'oi', 'eu', 'gn'];

export const sonsCp = creerGenerateur({
  id: 'sons-cp',
  competence: 'FR-C2-CP-LECT-01',
  cycle: 2,
  description: 'Trouver le mot qui contient un son, avec une graphie donnée, ou celui qui ne le contient pas.',
  generer(a, d) {
    const question = (libelle: string) => a.choisir([`Quel mot contient le son « ${libelle} » ?`, `Dans quel mot entends-tu le son « ${libelle} » ?`]);
    const sans = (son: string) => MOTS_SONS.filter((m) => !m.sons.has(son)).map((m) => m.mot);
    if (d === 3) {
      if (a.suivant() < 0.6) {
        const son = a.choisir(Object.keys(GRAPHIES));
        const graphie = a.choisir(GRAPHIES[son]!);
        const avec = MOTS_SONS.filter((m) => m.graphies.has(`${son}=${graphie}`)).map((m) => m.mot);
        const autres = MOTS_SONS.filter((m) => m.sons.has(son) && !m.graphies.has(`${son}=${graphie}`)).map((m) => m.mot);
        const mot = a.choisir(avec);
        return {
          gabarit: 'qcm',
          consigne: `Quel mot contient le son « ${son} » écrit « ${graphie} » ?`,
          ...((opts) => ({ options: opts, erreurs: tous(opts, mot, 'graphie-confondue') }))(a.melanger([mot, ...a.melanger(autres).slice(0, 3)])),
          reponse: mot,
          indice: `Tous les mots ont le son « ${son} ». Regarde comment il s’écrit.`,
          explication: `Dans « ${mot} », le son « ${son} » s’écrit « ${graphie} ».`,
        };
      }
      const son = a.choisir(TOUS_LES_SONS);
      const avec = MOTS_SONS.filter((m) => m.sons.has(son)).map((m) => m.mot);
      const intrus = a.choisir(sans(son));
      const trois = a.melanger(avec).slice(0, 3);
      return {
        gabarit: 'qcm',
        consigne: `Quel mot ne contient pas le son « ${son} » ?`,
        ...((opts) => ({ options: opts, erreurs: tous(opts, intrus, 'son-mal-entendu') }))(a.melanger([intrus, ...trois])),
        reponse: intrus,
        indice: 'Lis chaque mot à voix basse.',
        explication: `On entend « ${son} » dans ${trois.map((m) => `« ${m} »`).join(', ')}. On ne l’entend pas dans « ${intrus} ».`,
      };
    }
    const [libelle, son, graphie] = d === 1
      ? (([s, g]) => [s, s, g] as [string, string, string | null])(a.choisir(SONS_SIMPLES))
      : a.choisir(SONS_DEUX_LETTRES);
    const avec = MOTS_SONS.filter((m) => (graphie ? m.graphies.has(`${son}=${graphie}`) : m.sons.has(son))).map((m) => m.mot);
    const mot = a.choisir(avec);
    return {
      gabarit: 'qcm',
      consigne: question(libelle),
      ...((opts) => ({ options: opts, erreurs: tous(opts, mot, 'son-mal-entendu') }))(a.melanger([mot, ...a.melanger(sans(son)).slice(0, 3)])),
      reponse: mot,
      indice: 'Lis chaque mot à voix basse.',
      explication: `On entend le son « ${libelle} » dans « ${mot} ».`,
    };
  },
});

// ─────────── Syllabes

// Mots sans e muet final ni voyelles en hiatus : chaque groupe de voyelles fait une syllabe.
const MOTS_SYLLABES = [
  'ma-man', 'pa-pa', 'vé-lo', 'mo-to', 'la-pin', 'sa-pin', 'ro-bot', 'ta-pis', 'ki-wi', 'a-mi', 'é-té', 'hi-bou',
  'ca-deau', 'cha-peau', 'bou-chon', 'cou-teau', 'py-ja-ma', 'ca-na-pé', 'cho-co-lat', 'do-mi-no', 'ka-ra-té',
  'pa-ra-pluie', 'é-pi-nard', 'ro-bi-net', 'a-bri-cot', 'ca-ra-mel', 'sa-la-mi', 'a-ni-mal', 'ma-ca-ro-ni',
];

export const syllabesCp = creerGenerateur({
  id: 'syllabes-cp',
  competence: 'FR-C2-CP-LECT-02',
  cycle: 2,
  description: 'Trouver la première ou la dernière syllabe d’un mot, compter ses syllabes.',
  generer(a, d) {
    const decoupe = a.choisir(MOTS_SYLLABES).split('-');
    const mot = decoupe.join('');
    if (d === 2) {
      const n = decoupe.length;
      return {
        gabarit: 'qcm',
        consigne: `Combien de syllabes entends-tu dans « ${mot} » ?`,
        options: ['1', '2', '3', '4'],
        erreurs: Object.fromEntries([n - 1, n + 1].filter((k) => k >= 1 && k <= 4).map((k) => [String(k), 'syllabes-mal-comptees'])),
        reponse: String(n),
        indice: 'Frappe dans tes mains à chaque syllabe.',
        explication: `On découpe : ${decoupe.join(' - ')}. Il y a ${n} syllabes.`,
      };
    }
    const premiere = d === 1;
    const syllabe = premiere ? decoupe[0]! : decoupe[decoupe.length - 1]!;
    const toutes = MOTS_SYLLABES.flatMap((m) => m.split('-'));
    const pieges = toutes.filter((s) => (premiere ? !mot.startsWith(s) : !mot.endsWith(s)));
    const autre = premiere ? decoupe[decoupe.length - 1]! : decoupe[0]!;
    return {
      gabarit: 'qcm',
      consigne: `Quelle est la ${premiere ? 'première' : 'dernière'} syllabe de « ${mot} » ?`,
      ...choix(a, syllabe, (premiere ? !mot.startsWith(autre) : !mot.endsWith(autre)) ? [[autre, 'premiere-derniere-confondues']] : [], () => a.choisir(pieges)),
      reponse: syllabe,
      indice: 'Dis le mot lentement, syllabe par syllabe.',
      explication: `On découpe : ${decoupe.join(' - ')}. La ${premiere ? 'première' : 'dernière'} syllabe est « ${syllabe} ».`,
    };
  },
});

// ─────────── Lettres muettes finales, trouvées grâce à un mot de la même famille

// Nom, mot plus long de la même famille qui fait entendre la lettre muette, déterminant.
const NOMS_MUETS: [string, string, string][] = [
  ['chat', 'chaton', 'un'], ['lait', 'laitier', 'le'], ['dent', 'dentiste', 'une'], ['galop', 'galoper', 'le'],
  ['drap', 'draper', 'un'], ['camp', 'camper', 'un'], ['bord', 'border', 'le'], ['sport', 'sportif', 'le'],
  ['tapis', 'tapisser', 'un'], ['rang', 'ranger', 'un'], ['plat', 'plateau', 'un'], ['bond', 'bondir', 'un'],
  ['pot', 'potier', 'un'], ['chocolat', 'chocolatier', 'le'], ['toit', 'toiture', 'un'], ['fruit', 'fruitier', 'un'],
  ['saut', 'sauter', 'un'], ['tricot', 'tricoter', 'un'], ['refus', 'refuser', 'un'], ['repos', 'reposer', 'le'],
  ['début', 'débuter', 'le'], ['chant', 'chanter', 'un'], ['regard', 'regarder', 'un'], ['retard', 'retarder', 'un'],
  ['bruit', 'bruitage', 'un'],
];
// Adjectif au masculin, puis au féminin.
const ADJECTIFS_MUETS: [string, string][] = [
  ['petit', 'petite'], ['grand', 'grande'], ['gros', 'grosse'], ['long', 'longue'], ['vert', 'verte'], ['rond', 'ronde'],
  ['froid', 'froide'], ['chaud', 'chaude'], ['gris', 'grise'], ['blanc', 'blanche'], ['lourd', 'lourde'], ['haut', 'haute'],
  ['content', 'contente'], ['gourmand', 'gourmande'], ['épais', 'épaisse'], ['mauvais', 'mauvaise'], ['court', 'courte'], ['fort', 'forte'],
];
// Lettres muettes fréquentes en fin de mot, pour les pièges.
const LETTRES_MUETTES = ['t', 'd', 's', 'x'];
// Mots existants à ne pas proposer comme piège.
const MOTS_EXISTANTS = ['laid', 'vers', 'chas', 'dens'];

export const lettresMuettesCp = creerGenerateur({
  id: 'lettres-muettes-cp',
  competence: 'FR-C2-CP-ORTH-01',
  cycle: 2,
  description: 'Trouver la lettre muette finale d’un mot grâce à un mot de la même famille.',
  generer(a, d) {
    const nom = d === 1 || (d === 3 && a.suivant() < 0.5);
    const [mot, famille, det] = nom ? a.choisir(NOMS_MUETS) : [...a.choisir(ADJECTIFS_MUETS), ''];
    const muette = mot.slice(-1);
    const debut = mot.slice(0, -1);
    const amorce = `${det ? `${det} ` : ''}${debut}${TROU}`;
    const indice = nom ? 'Cherche un mot plus long de la même famille.' : 'Dis le mot au féminin.';
    const explication = `On entend « ${muette} » dans « ${famille} ». On écrit « ${mot} » avec un ${muette} muet.`;
    if (d === 3) {
      return {
        gabarit: 'saisie',
        consigne: `Écris le mot en entier : ${amorce} Pense à « ${famille} ».`,
        reponse: mot,
        indice,
        explication,
      };
    }
    const pieges = LETTRES_MUETTES.filter((l) => l !== muette).map((l) => debut + l).filter((m) => !MOTS_EXISTANTS.includes(m));
    return {
      gabarit: 'qcm',
      consigne: `Choisis le mot bien écrit : ${amorce} Pense à « ${famille} ».`,
      ...((opts) => ({ options: opts, erreurs: tous(opts, mot, 'lettre-muette') }))(a.melanger([mot, ...a.melanger(pieges).slice(0, 3)])),
      reponse: mot,
      indice,
      explication,
    };
  },
});

// ─────────── Valeur des lettres : m devant m, b, p ; c ou ç ; g ou gu ; s ou ss

// Le mot est écrit avec le trou à la place de la lettre (ou des lettres) à trouver.
const MOTS_M_N = [
  'la…pe', 'ja…be', 'cha…bre', 'ta…bour', 'po…pier', 'o…bre', 'ti…bre', 'ja…bon', 'to…ber', 'a…poule', 'te…pête', 'nove…bre',
  'tro…pette', 'po…pe', 'ta…pon', 'cha…pion', 'so…bre', 'no…bre', 'co…pote',
  'lu…di', 'mo…de', 'pe…te', 'da…se', 'ta…te', 've…t', 'ro…de', 'me…ton', 'pla…te', 'ma…teau', 'di…de', 'pi…ceau', 'gra…d',
  'mo…tre', 've…tre', 'pa…talon', 'cha…son', 'ce…dre',
];
// Mot avec le trou, réponse, son entendu.
const MOTS_C: [string, string, string][] = [
  ['un gar…on', 'ç', 's'], ['une le…on', 'ç', 's'], ['un ma…on', 'ç', 's'], ['un gla…on', 'ç', 's'], ['un cale…on', 'ç', 's'],
  ['une fa…on', 'ç', 's'], ['une balan…oire', 'ç', 's'], ['un pin…eau', 'c', 's'], ['une gla…e', 'c', 's'], ['une ra…ine', 'c', 's'],
  ['une pu…e', 'c', 's'], ['une …erise', 'c', 's'], ['un …itron', 'c', 's'], ['la poli…e', 'c', 's'], ['un …ochon', 'c', 'k'],
  ['une …arotte', 'c', 'k'], ['un …anard', 'c', 'k'], ['une é…ole', 'c', 'k'], ['un é…ureuil', 'c', 'k'], ['un …ube', 'c', 'k'],
];
const MOTS_G: [string, string, string][] = [
  ['une …itare', 'gu', 'g'], ['une ba…e', 'gu', 'g'], ['une …êpe', 'gu', 'g'], ['une fi…e', 'gu', 'g'], ['la lan…e', 'gu', 'g'],
  ['une va…e', 'gu', 'g'], ['une …irlande', 'gu', 'g'], ['une ba…ette', 'gu', 'g'], ['une …irafe', 'g', 'j'], ['un …enou', 'g', 'j'],
  ['une pa…e', 'g', 'j'], ['la nei…e', 'g', 'j'], ['une oran…e', 'g', 'j'], ['un …ilet', 'g', 'j'], ['un …âteau', 'g', 'g'],
  ['une …omme', 'g', 'g'], ['un lé…ume', 'g', 'g'], ['un …orille', 'g', 'g'],
];
const MOTS_S_SS: [string, string, string][] = [
  ['un poi…on', 'ss', 's'], ['un poi…on', 's', 'z'], ['un cou…in', 'ss', 's'], ['un cou…in', 's', 'z'], ['une ro…e', 's', 'z'],
  ['une mai…on', 's', 'z'], ['une chemi…e', 's', 'z'], ['un va…e', 's', 'z'], ['une ta…e', 'ss', 's'], ['la mou…e', 'ss', 's'],
  ['une bro…e', 'ss', 's'], ['une boi…on', 'ss', 's'], ['une trou…e', 'ss', 's'], ['une fu…ée', 's', 'z'], ['une ceri…e', 's', 'z'],
];
const remplir = (trou: string, lettres: string) => trou.replace(TROU, lettres).split(' ').pop()!;

export const valeurLettresCp = creerGenerateur({
  id: 'valeur-lettres-cp',
  competence: 'FR-C2-CP-ORTH-02',
  cycle: 2,
  description: 'Écrire m devant m, b, p ; choisir c ou ç, g ou gu, s ou ss selon le son entendu.',
  generer(a, d) {
    if (d === 1) {
      const trou = a.choisir(MOTS_M_N);
      const suivante = trou.charAt(trou.indexOf(TROU) + 1);
      const reponse = 'mbp'.includes(suivante) ? 'm' : 'n';
      return {
        gabarit: 'saisie',
        consigne: `Écris m ou n : ${trou}`,
        reponse,
        indice: 'Regarde la lettre qui suit le trou.',
        explication: reponse === 'm'
          ? `Devant m, b ou p, on écrit m. Ici, la lettre suivante est ${suivante}. On écrit ${trou.replace(TROU, 'm')}.`
          : `Devant ${suivante}, on écrit n. On écrit ${trou.replace(TROU, 'n')}.`,
      };
    }
    if (d === 2) {
      const [trou, reponse, son] = a.choisir(MOTS_C);
      const mot = remplir(trou, reponse);
      const suivante = trou.charAt(trou.indexOf(TROU) + 1);
      return {
        gabarit: 'saisie',
        consigne: `Écris c ou ç : ${trou}. On entend « ${son} ».`,
        reponse,
        indice: 'Regarde la voyelle qui suit le trou.',
        explication: son === 'k'
          ? `Devant ${suivante}, la lettre c se lit « k ». On écrit ${mot}.`
          : reponse === 'c'
            ? `Devant e ou i, la lettre c se lit déjà « s ». On écrit ${mot}.`
            : `Devant ${suivante}, c se lit « k ». Pour le son « s », on écrit ç : ${mot}.`,
      };
    }
    if (a.suivant() < 0.5) {
      const [trou, reponse, son] = a.choisir(MOTS_G);
      const mot = remplir(trou, reponse);
      const suivante = trou.charAt(trou.indexOf(TROU) + 1);
      return {
        gabarit: 'saisie',
        consigne: `Écris g ou gu : ${trou}. On entend « ${son} ».`,
        reponse,
        indice: 'Regarde la voyelle qui suit le trou.',
        explication: reponse === 'gu'
          ? `Devant ${suivante}, g se lit « j ». Pour le son « g », on écrit gu : ${mot}.`
          : son === 'j'
            ? `Devant e ou i, la lettre g se lit « j ». On écrit ${mot}.`
            : `Devant ${suivante}, la lettre g se lit « g ». On écrit ${mot}.`,
      };
    }
    const [trou, reponse, son] = a.choisir(MOTS_S_SS);
    const mot = remplir(trou, reponse);
    return {
      gabarit: 'saisie',
      consigne: `Écris s ou ss : ${trou}. On entend « ${son} ».`,
      reponse,
      indice: 'Entre deux voyelles, la lettre s fait le son « z ».',
      explication: son === 'z'
        ? `Entre deux voyelles, s se lit « z ». On écrit ${mot}.`
        : `Entre deux voyelles, il faut ss pour le son « s ». On écrit ${mot}.`,
    };
  },
});

// ─────────── Masculin, féminin, singulier, pluriel

const NOMS_PLURIEL = ['lapin', 'chat', 'ami', 'pomme', 'olive', 'vélo', 'livre', 'fleur', 'arbre', 'poule', 'ballon', 'tortue', 'crayon', 'voiture'];
// Adjectif, placé avant le nom (true) ou après. Puis des paires nom masculin, nom féminin.
const ADJ_CP: [string, boolean][] = [['petit', true], ['grand', true], ['joli', true], ['vert', false], ['noir', false], ['bleu', false], ['gris', false]];
const PAIRES_M_F: [string, string][] = [
  ['ballon', 'balle'], ['bol', 'tasse'], ['camion', 'voiture'], ['vélo', 'moto'], ['crayon', 'gomme'],
  ['pull', 'robe'], ['livre', 'trousse'], ['train', 'maison'], ['pantalon', 'jupe'], ['sac', 'pelle'],
];
const NOMBRES_MOTS = ['deux', 'trois', 'quatre', 'cinq', 'six'];

export const genreNombreCp = creerGenerateur({
  id: 'genre-nombre-cp',
  competence: 'FR-C2-CP-ORTH-03',
  cycle: 2,
  description: 'Marquer le pluriel (-s) d’un nom et d’un groupe nominal, le féminin (-e) d’un adjectif.',
  generer(a, d) {
    if (d === 1) {
      const nom = a.choisir(NOMS_PLURIEL);
      const feminin = ['pomme', 'olive', 'fleur', 'poule', 'tortue', 'voiture'].includes(nom);
      const det = feminin ? 'une' : 'un';
      const nombre = a.choisir(NOMBRES_MOTS);
      return {
        gabarit: 'saisie',
        consigne: `Écris au pluriel : ${det} ${nom}, ${nombre} ${TROU}`,
        reponse: `${nom}s`,
        indice: 'Au pluriel, le nom prend souvent un s.',
        explication: `Il y en a plusieurs. On ajoute un s qu’on n’entend pas : ${nombre} ${nom}s.`,
      };
    }
    const [adj, avant] = a.choisir(d === 2 ? ADJ_CP : ADJ_CP.filter(([x]) => !x.endsWith('s')));
    const [masc, fem] = a.choisir(PAIRES_M_F);
    const gn = (nom: string, x: string) => (avant ? `${x} ${nom}` : `${nom} ${x}`);
    if (d === 2) {
      const amorce = avant ? `une ${TROU} ${fem}` : `une ${fem} ${TROU}`;
      return {
        gabarit: 'saisie',
        consigne: `Complète : un ${gn(masc, adj)}, ${amorce}`,
        reponse: `${adj}e`,
        indice: 'Le mot va avec un nom féminin.',
        explication: `« ${fem} » est féminin. On ajoute un e : une ${gn(fem, `${adj}e`)}.`,
      };
    }
    const reponse = gn(`${masc}s`, `${adj}s`);
    const pieges: [string, string][] = [[gn(masc, `${adj}s`), 'accord-nom'], [gn(`${masc}s`, adj), 'accord-adjectif'], [gn(masc, adj), 'pluriel-oublie']];
    return {
      gabarit: 'qcm',
      consigne: `Écris au pluriel : un ${gn(masc, adj)}, des ${TROU}`,
      ...choix(a, reponse, pieges, () => gn(masc, adj)),
      reponse,
      indice: 'Au pluriel, le nom prend un s. Le mot qui va avec aussi.',
      explication: `Le nom et l’adjectif prennent un s. On écrit : des ${reponse}.`,
    };
  },
});

// ─────────── La phrase : majuscule, point, point d'interrogation, point d'exclamation

// Phrases qui donnent une information (point final), écrites sans majuscule ni point.
const PHRASES_CP = [
  'le chat dort', 'tom joue au ballon', 'il pleut ce matin', 'nina lit un livre', 'le chien court vite',
  'papa fait un gâteau', 'la lune brille', 'nous allons à l’école', 'le bébé rit', 'mia range sa chambre',
  'les oiseaux chantent', 'le train arrive', 'lina mange une pomme', 'il fait très froid', 'maman lave la voiture',
  'le lapin mange une carotte', 'la maitresse lit une histoire', 'mon frère a six ans', 'les enfants jouent dans la cour',
  'le soleil se lève', 'la poule pond un œuf', 'je bois un verre de lait', 'tu dessines une maison', 'le vent souffle fort',
  'la cloche sonne', 'mamie tricote une écharpe', 'le facteur apporte une lettre', 'nous plantons des fleurs',
];
// Vraies exclamations, qui expriment un sentiment.
const EXCLAMATIONS_CP = [
  'quel beau gâteau', 'comme il fait chaud', 'quelle belle journée', 'que tu es grand', 'comme ce chien est drôle',
  'quel bruit', 'comme tu cours vite', 'quelle jolie robe', 'que la mer est belle', 'comme le ciel est bleu',
];
const QUESTIONS_CP = [
  'où est mon cartable', 'as-tu faim', 'qui a pris ma gomme', 'comment vas-tu', 'est-ce que tu viens', 'pourquoi pleures-tu',
  'quand partons-nous', 'aimes-tu les pommes', 'où habite ton ami', 'veux-tu jouer avec moi',
];
const majuscule = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const NOMS_PROPRES = ['tom', 'nina', 'mia', 'lina'];
/** Écrit les prénoms avec leur majuscule à l'intérieur de la phrase. */
const prenoms = (t: string) => t.split(' ').map((m) => (NOMS_PROPRES.includes(m) ? majuscule(m) : m)).join(' ');
const SIGNES = { '.': 'un point', '?': 'un point d’interrogation', '!': 'un point d’exclamation' } as const;

export const phraseCp = creerGenerateur({
  id: 'phrase-cp',
  competence: 'FR-C2-CP-GRAM-01',
  cycle: 2,
  description: 'Écrire une phrase avec majuscule et point, compter les phrases d’un texte, choisir le signe final.',
  generer(a, d) {
    if (d === 1) {
      const brute = a.choisir(PHRASES_CP.filter((x) => !NOMS_PROPRES.includes(x.split(' ')[0]!)));
      const p = prenoms(brute);
      const juste = `${majuscule(p)}.`;
      return {
        gabarit: 'qcm',
        consigne: `Quelle est la bonne écriture de « ${p} » ?`,
        options: a.melanger([juste, `${p}.`, majuscule(p), `${majuscule(p)} ?`]),
        erreurs: { [`${p}.`]: 'majuscule-oubliee', [majuscule(p)]: 'point-oublie', [`${majuscule(p)} ?`]: 'signe-final-confondu' },
        reponse: juste,
        indice: 'Une phrase commence par une majuscule. Elle finit par un point.',
        explication: `La phrase donne une information. Elle commence par une majuscule. Elle finit par un point : ${juste}`,
      };
    }
    if (d === 2) {
      const n = a.entier(2, 4);
      const reserve = [
        ...PHRASES_CP.map((p) => `${majuscule(prenoms(p))}.`),
        ...EXCLAMATIONS_CP.map((p) => `${majuscule(p)} !`),
        ...QUESTIONS_CP.map((p) => `${majuscule(p)} ?`),
      ];
      const texte = a.melanger(reserve).slice(0, n).join(' ');
      return {
        gabarit: 'qcm',
        consigne: `Combien de phrases y a-t-il ? ${texte}`,
        options: ['1', '2', '3', '4'],
        erreurs: Object.fromEntries([n - 1, n + 1].filter((k) => k >= 1 && k <= 4).map((k) => [String(k), 'phrases-mal-comptees'])),
        reponse: String(n),
        indice: 'Compte les majuscules au début des phrases.',
        explication: `Chaque phrase commence par une majuscule. Elle finit par un point, un point d’interrogation ou un point d’exclamation. Il y a ${n} phrases.`,
      };
    }
    const signe = a.choisir(['.', '?', '!'] as const);
    const brute = a.choisir(signe === '.' ? PHRASES_CP : signe === '?' ? QUESTIONS_CP : EXCLAMATIONS_CP);
    const p = majuscule(prenoms(brute));
    const raison = { '.': 'La phrase donne une information.', '?': 'La phrase pose une question.', '!': 'La phrase exprime une émotion.' }[signe];
    return {
      gabarit: 'qcm',
      consigne: `Quel signe termine la phrase ? ${p} ${TROU}`,
      options: a.melanger(['.', '?', '!']),
      erreurs: tous(['.', '?', '!'], signe, 'signe-final-confondu'),
      reponse: signe,
      indice: 'Pose-t-elle une question ? Exprime-t-elle une émotion ?',
      explication: `${raison} Elle finit par ${SIGNES[signe]} : ${p}${signe === '.' ? '' : ' '}${signe}`,
    };
  },
});

// ─────────── Être et avoir au présent

const PERSONNES_CP = ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles'];
const RANG_CP: Record<string, number> = { je: 0, tu: 1, il: 2, elle: 2, nous: 3, vous: 4, ils: 5, elles: 5 };
const ETRE_CP = ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'];
const AVOIR_CP = ['ai', 'as', 'a', 'avons', 'avez', 'ont'];
// Groupe nominal sujet, au pluriel ou non.
const SUJETS_GN: [string, boolean][] = [['Le chat', false], ['Ma sœur', false], ['Léo', false], ['La maitresse', false], ['Les enfants', true], ['Mes amis', true], ['Les filles', true]];
const SUITES: Record<'etre' | 'avoir', string[]> = { etre: ['dans la cour', 'à la maison', 'en retard', 'dans le jardin'], avoir: ['faim', 'froid', 'soif', 'sommeil'] };

export const etreAvoirCp = creerGenerateur({
  id: 'etre-avoir-cp',
  competence: 'FR-C2-CP-CONJ-01',
  cycle: 2,
  description: 'Conjuguer être et avoir au présent avec un pronom ou un groupe nominal sujet.',
  generer(a, d) {
    const etre = a.suivant() < 0.5;
    const table = etre ? ETRE_CP : AVOIR_CP;
    const verbe = etre ? 'être' : 'avoir';
    let sujet: string;
    let rang: number;
    if (d === 3) {
      const [gn, pluriel] = a.choisir(SUJETS_GN);
      sujet = gn;
      rang = pluriel ? 5 : 2;
    } else {
      sujet = a.choisir(d === 1 ? PERSONNES_CP.slice(0, 4) : PERSONNES_CP);
      rang = RANG_CP[sujet]!;
    }
    const forme = table[rang]!;
    const elide = sujet === 'je' && /^[aeiouéê]/.test(forme);
    const debut = elide ? 'j’' : `${sujet} `;
    const suite = a.choisir(SUITES[etre ? 'etre' : 'avoir']);
    const phrase = `${debut}${TROU} ${suite}.`;
    return {
      gabarit: 'qcm',
      consigne: `Complète avec le verbe ${verbe} : ${majuscule(phrase)}`,
      ...choix(a, forme, a.melanger(table).slice(0, 3).map((x): [string, string] => [x, 'accord-personne']), () => a.choisir(table)),
      reponse: forme,
      indice: `Récite le verbe ${verbe} au présent.`,
      explication: `Avec « ${d === 3 ? sujet : debut.trim()} », le verbe ${verbe} s’écrit « ${forme} ». ${majuscule(`${debut}${forme} ${suite}`)}.`,
    };
  },
});

// ─────────── Familles de mots

// Familles autour d'un verbe (difficulté 1), autres familles (difficulté 2).
const FAMILLES_VERBES = [
  ['chanter', 'chanteur', 'chant'], ['danser', 'danseur', 'danse'], ['dormir', 'dormeur', 'endormi'], ['jardin', 'jardinier', 'jardiner'],
  ['coller', 'colle', 'décoller', 'recoller'], ['nager', 'nageur', 'nage'], ['neige', 'neiger', 'enneigé'], ['porter', 'porteur', 'apporter'],
  ['sauter', 'saut', 'sursaut'], ['coiffer', 'coiffeur', 'coiffure'], ['peindre', 'peintre', 'peinture'], ['jouer', 'jouet', 'joueur'],
  ['glisser', 'glissade', 'glissement'], ['monter', 'remonter', 'démonter', 'montée'], ['faire', 'refaire', 'défaire'],
  ['dessiner', 'dessin', 'dessinateur'], ['rouler', 'roulette', 'rouleau'], ['pêcher', 'pêcheur', 'pêche'],
];
const FAMILLES_NOMS = [
  ['lait', 'laitier', 'laitage'], ['pomme', 'pommier'], ['poire', 'poirier'], ['cerise', 'cerisier'], ['maison', 'maisonnette'],
  ['fleur', 'fleurir', 'fleuri'], ['dent', 'dentiste', 'dentifrice'], ['boulanger', 'boulangerie', 'boulangère'], ['chat', 'chaton'],
  ['lapin', 'lapine'], ['terre', 'enterrer', 'terrain'], ['bois', 'boisé'],
];
const FAMILLES = [...FAMILLES_VERBES, ...FAMILLES_NOMS];
// Mots qui ressemblent à un mot d'une famille sans en faire partie.
const SOSIES = ['chameau', 'champ', 'dame', 'dorade', 'jaune', 'cochon', 'laine', 'pompon', 'poisson', 'cirque', 'maitre',
  'flèche', 'copain', 'dinde', 'nappe', 'neuf', 'fée', 'mouton', 'rouge', 'sauce', 'glace', 'peigne'];

/** « a » et « b », ou « a », « b » et « c ». */
const liste = (mots: string[]) => {
  const q = mots.map((m) => `« ${m} »`);
  return q.length > 1 ? `${q.slice(0, -1).join(', ')} et ${q[q.length - 1]}` : q[0]!;
};

export const famillesCp = creerGenerateur({
  id: 'familles-cp',
  competence: 'FR-C2-CP-VOC-01',
  cycle: 2,
  description: 'Trouver un mot de la même famille, repérer l’intrus dans une famille.',
  generer(a, d) {
    if (d === 3) {
      const famille = a.choisir(FAMILLES.filter((f) => f.length >= 3));
      const [mot, ...membres] = a.melanger(famille) as [string, ...string[]];
      const autres = membres.slice(0, 3);
      const intrus = a.choisir(SOSIES);
      return {
        gabarit: 'qcm',
        consigne: `Quel mot n’est pas de la famille de « ${mot} » ?`,
        options: a.melanger([intrus, ...autres]),
        erreurs: tous(autres, intrus, 'famille-mots-confondue'),
        reponse: intrus,
        indice: 'Cherche le morceau de mot qui revient.',
        explication: `${liste(autres)} sont de la famille de « ${mot} ». « ${intrus} » n’en fait pas partie.`,
      };
    }
    const famille = a.choisir(d === 1 ? FAMILLES_VERBES : FAMILLES_NOMS);
    const [mot, ...parents] = a.melanger(famille) as [string, ...string[]];
    const etrangers = [...SOSIES, ...FAMILLES.filter((f) => f !== famille).flat()];
    const parent = a.choisir(parents);
    return {
      gabarit: 'qcm',
      consigne: `Quel mot est de la même famille que « ${mot} » ?`,
      ...((opts) => ({ options: opts, erreurs: erreursDe(opts, parent, opts.map((o): Piege => [o, SOSIES.includes(o) ? 'famille-mots-confondue' : undefined])) }))(a.melanger([parent, ...a.melanger(etrangers).slice(0, 3)])),
      reponse: parent,
      indice: 'Cherche le morceau de mot qui revient.',
      explication: `« ${mot} » et « ${parent} » ont un morceau commun. Ils sont de la même famille.`,
    };
  },
});
