// CE1, vocabulaire : termes génériques et spécifiques, contraires construits avec in- et dé-,
// mots formés avec un suffixe ou un préfixe (chanteur, boulanger, parapluie), sens propre et sens figuré.
// Source : programme de français du cycle 2 (BO n°41 du 31 octobre 2024), p. 17.
import { choix, creerGenerateur, type Piege } from './outils';
/** La même étiquette pour toutes les options fausses. */
const tous = (opts: readonly string[], reponse: string, code: string) => Object.fromEntries(opts.filter((o) => o !== reponse).map((o) => [o, code]));


// ─────────── Termes génériques : du mot général au mot précis

const CATEGORIES: [pluriel: string, singulier: string, membres: string[]][] = [
  ['des fruits', 'un fruit', ['pomme', 'poire', 'cerise', 'banane', 'prune', 'abricot']],
  ['des légumes', 'un légume', ['carotte', 'poireau', 'haricot', 'radis', 'navet', 'courgette']],
  ['des oiseaux', 'un oiseau', ['moineau', 'merle', 'pigeon', 'aigle', 'hibou', 'mésange']],
  ['des poissons', 'un poisson', ['requin', 'truite', 'sardine', 'saumon', 'thon', 'carpe']],
  ['des insectes', 'un insecte', ['fourmi', 'abeille', 'mouche', 'papillon', 'coccinelle', 'guêpe']],
  ['des fleurs', 'une fleur', ['rose', 'tulipe', 'marguerite', 'coquelicot', 'jonquille', 'violette']],
  ['des arbres', 'un arbre', ['chêne', 'sapin', 'bouleau', 'platane', 'tilleul', 'peuplier']],
  ['des vêtements', 'un vêtement', ['pull', 'jupe', 'chemise', 'pantalon', 'manteau', 'short']],
  ['des meubles', 'un meuble', ['table', 'chaise', 'armoire', 'lit', 'buffet', 'commode']],
  ['des outils', 'un outil', ['marteau', 'scie', 'tournevis', 'pince', 'râteau', 'pelle']],
  ['des véhicules', 'un véhicule', ['voiture', 'camion', 'moto', 'autobus', 'tracteur', 'vélo']],
  ['des instruments de musique', 'un instrument de musique', ['piano', 'guitare', 'violon', 'flûte', 'tambour', 'trompette']],
  ['des sports', 'un sport', ['football', 'judo', 'natation', 'tennis', 'escalade', 'basket']],
];

// Du plus général au plus précis.
const CHAINES: [string, string, string][] = [
  ['aliment', 'fruit', 'pomme'], ['aliment', 'légume', 'carotte'], ['aliment', 'laitage', 'yaourt'], ['animal', 'oiseau', 'moineau'],
  ['animal', 'poisson', 'requin'], ['animal', 'insecte', 'fourmi'], ['plante', 'fleur', 'tulipe'], ['plante', 'arbre', 'chêne'],
  ['meuble', 'siège', 'tabouret'], ['vêtement', 'chaussure', 'botte'], ['véhicule', 'bateau', 'voilier'], ['bâtiment', 'maison', 'chalet'],
  ['boisson', 'jus de fruit', 'jus d’orange'], ['instrument', 'instrument à cordes', 'guitare'], ['sport', 'sport de ballon', 'handball'],
];

export const generiquesCe1 = creerGenerateur({
  id: 'generiques-ce1',
  competence: 'FR-C2-CE1-VOC-01',
  cycle: 2,
  description: 'Trouver le terme générique d’une liste, l’intrus d’une catégorie, classer du général au précis.',
  generer(a, d) {
    if (d === 1) {
      const [pluriel, , membres] = a.choisir(CATEGORIES);
      const trois = a.melanger(membres).slice(0, 3);
      return {
        gabarit: 'qcm',
        consigne: `Quel mot désigne à la fois : ${trois.join(', ')} ?`,
        ...choix(a, pluriel, a.melanger(CATEGORIES.map((c) => c[0]).filter((c) => c !== pluriel)).slice(0, 3).map((c): Piege => [c, 'generique-confondu']), () => a.choisir(CATEGORIES)[0]),
        reponse: pluriel,
        indice: 'Cherche le mot qui les regroupe tous.',
        explication: `${trois.join(', ').replace(/, (?=[^,]*$)/, ' et ')} sont ${pluriel}.`.replace(/^(.)/, (c) => c.toUpperCase()),
      };
    }
    if (d === 2) {
      const i = a.entier(0, CATEGORIES.length - 1);
      const [, singulier, membres] = CATEGORIES[i]!;
      const autre = a.choisir(CATEGORIES.filter((_, j) => j !== i));
      const intrus = a.choisir(autre[2]);
      const trois = a.melanger(membres).slice(0, 3);
      return {
        gabarit: 'qcm',
        consigne: `Quel mot n’est pas ${singulier} ?`,
        options: a.melanger([...trois, intrus]),
        erreurs: tous(trois, intrus, 'generique-confondu'),
        reponse: intrus,
        indice: 'Trois mots vont ensemble. Cherche celui qui ne va pas.',
        explication: `${trois.join(', ').replace(/, (?=[^,]*$)/, ' et ')} : ce sont ${CATEGORIES[i]![0]}. « ${intrus} » est ${autre[1]}.`.replace(/^(.)/, (c) => c.toUpperCase()),
      };
    }
    const chaine = a.choisir(CHAINES);
    const precis = a.suivant() < 0.5;
    const reponse = precis ? chaine[2] : chaine[0];
    return {
      gabarit: 'qcm',
      consigne: `Quel mot est le plus ${precis ? 'précis' : 'général'} : ${a.melanger([...chaine]).join(', ')} ?`,
      options: a.melanger([...chaine]),
      erreurs: tous(chaine, reponse, 'general-precis-confondus'),
      reponse,
      indice: 'Un mot général désigne beaucoup de choses. Un mot précis en désigne peu.',
      explication: `Du plus général au plus précis : ${chaine.join(', ')}. Le plus ${precis ? 'précis' : 'général'} est « ${reponse} ».`,
    };
  },
});

// ─────────── Contraires construits avec in- (im-) et dé- (dés-)

/** [mot, contraire, préfixe, verbe ?] */
const CONTRAIRES: [string, string, string, boolean][] = [
  ['visible', 'invisible', 'in', false], ['connu', 'inconnu', 'in', false], ['utile', 'inutile', 'in', false],
  ['juste', 'injuste', 'in', false], ['capable', 'incapable', 'in', false], ['complet', 'incomplet', 'in', false],
  ['exact', 'inexact', 'in', false], ['égal', 'inégal', 'in', false], ['croyable', 'incroyable', 'in', false],
  ['confortable', 'inconfortable', 'in', false], ['mobile', 'immobile', 'im', false], ['patient', 'impatient', 'im', false],
  ['possible', 'impossible', 'im', false], ['prudent', 'imprudent', 'im', false], ['buvable', 'imbuvable', 'im', false],
  ['ranger', 'déranger', 'dé', true], ['monter', 'démonter', 'dé', true], ['coller', 'décoller', 'dé', true],
  ['faire', 'défaire', 'dé', true], ['plier', 'déplier', 'dé', true], ['boucher', 'déboucher', 'dé', true],
  ['brancher', 'débrancher', 'dé', true], ['couvrir', 'découvrir', 'dé', true], ['gonfler', 'dégonfler', 'dé', true],
  ['visser', 'dévisser', 'dé', true], ['geler', 'dégeler', 'dé', true], ['coiffer', 'décoiffer', 'dé', true],
  ['boutonner', 'déboutonner', 'dé', true], ['habiller', 'déshabiller', 'dés', true], ['obéir', 'désobéir', 'dés', true],
];
const SANS_PREFIXE = ['dessin', 'demain', 'image', 'imiter', 'dentiste', 'inviter', 'infirmière', 'décembre', 'diner', 'dindon'];

export const contrairesCe1 = creerGenerateur({
  id: 'contraires-ce1',
  competence: 'FR-C2-CE1-VOC-02',
  cycle: 2,
  description: 'Former et comprendre les contraires construits avec les préfixes in- (im-) et dé- (dés-).',
  generer(a, d) {
    const [mot, contraire, prefixe, verbe] = a.choisir(CONTRAIRES);
    if (d === 1) {
      // Pièges : l'autre préfixe ; « in » devant p ou b ; « re », qui ne donne pas le contraire.
      const pieges = verbe
        ? [`in${mot}`, `re${mot}`]
        : [prefixe === 'im' ? `in${mot}` : `dé${mot}`, prefixe === 'im' ? `dé${mot}` : `mal${mot}`];
      return {
        gabarit: 'qcm',
        consigne: `Quel est le contraire de « ${mot} » ?`,
        ...choix(a, contraire, pieges.map((p): Piege => [p, 'prefixe-contraire']), () => `dés${mot}`),
        reponse: contraire,
        indice: verbe ? 'Ajoute un petit morceau au début du verbe.' : 'Ajoute un petit morceau au début du mot.',
        explication: `On ajoute « ${prefixe}- » devant « ${mot} ». Le contraire est « ${contraire} ».${prefixe === 'im' ? ' Devant m, b ou p, on écrit im.' : ''}`,
      };
    }
    if (d === 2) {
      const reponse = verbe ? `faire le contraire ${/^[aeéiou]/.test(mot) ? 'd’' : 'de '}${mot}` : `pas ${mot}`;
      const pieges = verbe ? [`${mot} de nouveau`, `${mot} très fort`] : [`très ${mot}`, `${mot} de nouveau`];
      return {
        gabarit: 'qcm',
        consigne: `Que veut dire « ${contraire} » ?`,
        options: a.melanger([reponse, ...pieges]),
        erreurs: tous(pieges, reponse, 'sens-prefixe'),
        reponse,
        indice: `Cherche le mot « ${mot} » caché dedans.`,
        explication: `« ${contraire} », c’est « ${mot} » avec le préfixe « ${prefixe}- ». Ce préfixe donne le sens contraire.`,
      };
    }
    const avec = a.melanger(CONTRAIRES).slice(0, 3).map((c) => c[1]);
    const intrus = a.choisir(SANS_PREFIXE);
    return {
      gabarit: 'qcm',
      consigne: 'Quel mot n’est pas le contraire d’un autre mot ?',
      options: a.melanger([...avec, intrus]),
      reponse: intrus,
      indice: 'Enlève le début du mot. Reste-t-il un mot connu ?',
      explication: `Sans son début, « ${intrus} » ne donne pas un mot connu. Les trois autres sont des contraires.`,
    };
  },
});

// ─────────── Mots formés : -eur, -euse (qui fait l'action), -er, -ier (métiers), para-, anti-, multi-

const QUI_FAIT: [verbe: string, action: string, masculin: string, feminin: string][] = [
  ['chanter', 'chante', 'chanteur', 'chanteuse'], ['danser', 'danse', 'danseur', 'danseuse'], ['nager', 'nage', 'nageur', 'nageuse'],
  ['jouer', 'joue', 'joueur', 'joueuse'], ['marcher', 'marche', 'marcheur', 'marcheuse'], ['coiffer', 'coiffe', 'coiffeur', 'coiffeuse'],
  ['vendre', 'vend', 'vendeur', 'vendeuse'], ['courir', 'court', 'coureur', 'coureuse'], ['skier', 'skie', 'skieur', 'skieuse'],
  ['patiner', 'patine', 'patineur', 'patineuse'], ['balayer', 'balaie', 'balayeur', 'balayeuse'], ['mentir', 'ment', 'menteur', 'menteuse'],
  ['dormir', 'dort', 'dormeur', 'dormeuse'], ['pêcher', 'pêche', 'pêcheur', 'pêcheuse'], ['chasser', 'chasse', 'chasseur', 'chasseuse'],
  ['plonger', 'plonge', 'plongeur', 'plongeuse'], ['conduire', 'conduit', 'conducteur', 'conductrice'], ['promener', 'promène', 'promeneur', 'promeneuse'],
];
const METIERS: [string, string, string][] = [
  ['vend du pain', 'boulanger', 'boulangerie'], ['vend de la viande', 'boucher', 'boucherie'], ['fait des gâteaux', 'pâtissier', 'pâtisserie'],
  ['vend du poisson', 'poissonnier', 'poissonnerie'], ['travaille à la ferme', 'fermier', 'ferme'], ['s’occupe du jardin', 'jardinier', 'jardinage'],
  ['garde les moutons', 'berger', 'bergerie'], ['vend du lait et du fromage', 'crémier', 'crémerie'], ['répare les chaussures', 'cordonnier', 'cordonnerie'],
  ['vend des fleurs', 'fleuriste', 'fleur'], ['vend des livres', 'libraire', 'librairie'], ['soigne les dents', 'dentiste', 'dentier'],
  ['cuisine au restaurant', 'cuisinier', 'cuisine'],
];
const AFFIXES: [mot: string, question: string, reponse: string, pieges: [string, string]][] = [
  ['un parapluie', 'Un parapluie protège de quoi ?', 'de la pluie', ['du soleil', 'du vent']],
  ['un parasol', 'Un parasol protège de quoi ?', 'du soleil', ['de la pluie', 'du froid']],
  ['un paravent', 'Un paravent protège de quoi ?', 'du vent', ['du soleil', 'de la pluie']],
  ['un parachute', 'Un parachute protège de quoi ?', 'de la chute', ['du soleil', 'du bruit']],
  ['un antivol', 'Un antivol protège contre quoi ?', 'contre le vol', ['contre la pluie', 'contre le froid']],
  ['un produit antimoustique', 'Un produit antimoustique protège contre quoi ?', 'contre les moustiques', ['contre le soleil', 'contre le vol']],
  ['un mur antibruit', 'Un mur antibruit protège contre quoi ?', 'contre le bruit', ['contre la pluie', 'contre les voleurs']],
  ['un ballon multicolore', 'Que veut dire « multicolore » ?', 'de plusieurs couleurs', ['sans couleur', 'd’une seule couleur']],
  ['une multiprise', 'Que veut dire « multiprise » ?', 'avec plusieurs prises', ['sans prise', 'avec une seule prise']],
  ['un stade multisport', 'Que veut dire « multisport » ?', 'pour plusieurs sports', ['pour un seul sport', 'sans aucun sport']],
];

export const motsFormesCe1 = creerGenerateur({
  id: 'mots-formes-ce1',
  competence: 'FR-C2-CE1-VOC-03',
  cycle: 2,
  description: 'Comprendre des mots formés avec -eur, -euse, -er, -ier et avec para-, anti-, multi-.',
  generer(a, d) {
    if (d === 1) {
      const [verbe, action, masculin, feminin] = a.choisir(QUI_FAIT);
      const elle = a.suivant() < 0.5;
      const reponse = elle ? feminin : masculin;
      return {
        gabarit: 'qcm',
        consigne: `${elle ? 'Celle' : 'Celui'} qui ${action} est ${elle ? 'une' : 'un'} …`,
        options: a.melanger([reponse, elle ? masculin : feminin, verbe]),
        erreurs: { [elle ? masculin : feminin]: 'feminin-nom', [verbe]: 'classe-grammaticale-confondue' },
        reponse,
        indice: elle ? 'Pense à « coiffeuse », « danseuse ».' : 'Pense à « coiffeur », « danseur ».',
        explication: `On forme le nom à partir du verbe « ${verbe} ». ${elle ? 'Celle' : 'Celui'} qui ${action} est ${elle ? 'une' : 'un'} ${reponse}.`,
      };
    }
    if (d === 2) {
      const [action, metier, lieu] = a.choisir(METIERS);
      const autre = a.choisir(METIERS.filter((m) => m[1] !== metier))[1];
      return {
        gabarit: 'qcm',
        consigne: `Comment appelle-t-on la personne qui ${action} ?`,
        options: a.melanger([metier, lieu, autre]),
        erreurs: { [lieu]: 'metier-lieu-confondus' },
        reponse: metier,
        indice: 'Cherche un nom de métier, pas un nom de magasin.',
        explication: `La personne qui ${action} est le ${metier}.`,
      };
    }
    const [mot, question, reponse, pieges] = a.choisir(AFFIXES);
    const sens = mot.includes('para') ? '« Para » veut dire : qui protège de.' : mot.includes('anti') ? '« Anti » veut dire : contre.' : '« Multi » veut dire : plusieurs.';
    return {
      gabarit: 'qcm',
      consigne: question,
      options: a.melanger([reponse, ...pieges]),
      erreurs: tous(pieges, reponse, 'sens-prefixe'),
      reponse,
      indice: 'Coupe le mot en deux. Chaque morceau a un sens.',
      explication: `${sens} La réponse est : ${reponse}.`,
    };
  },
});

// ─────────── Sens propre et sens figuré : expressions imagées

/** [expression, sens, piège littéral, famille de sens, phrase au sens figuré, phrase au sens propre] */
const EXPRESSIONS: [string, string, string, string, string, string][] = [
  ['avoir une peur bleue', 'avoir très peur', 'avoir peur de la couleur bleue', 'peur', 'Léa a une peur bleue des araignées.', 'Léa porte une robe bleue.'],
  ['prendre ses jambes à son cou', 's’enfuir en courant', 'porter ses jambes sur son cou', 'fuir', 'Le voleur prend ses jambes à son cou.', 'Tom a mal aux jambes après la course.'],
  ['avoir un chat dans la gorge', 'avoir la voix enrouée', 'avoir avalé un chat', 'voix', 'Le maitre a un chat dans la gorge.', 'Le chat dort sur le canapé.'],
  ['poser un lapin', 'ne pas venir à un rendez-vous', 'poser un lapin sur la table', 'absent', 'Sami m’a posé un lapin hier.', 'Le lapin mange une carotte.'],
  ['être dans la lune', 'être distrait', 'être sur la lune', 'distrait', 'Hugo est dans la lune pendant la leçon.', 'Ce soir, la lune est toute ronde.'],
  ['donner sa langue au chat', 'renoncer à trouver la réponse', 'donner à manger au chat', 'renoncer', 'Je ne trouve pas : je donne ma langue au chat.', 'Le chien tire la langue.'],
  ['casser les pieds', 'ennuyer quelqu’un', 'se casser un pied', 'ennuyer', 'Arrête de me casser les pieds !', 'Mes pieds sont tout froids.'],
  ['couter les yeux de la tête', 'être très cher', 'faire mal aux yeux', 'cher', 'Ce vélo coute les yeux de la tête.', 'Léa a les yeux verts.'],
  ['avoir le cœur sur la main', 'être généreux', 'avoir mal à la main', 'genereux', 'Grand-mère a le cœur sur la main.', 'Je me lave les mains.'],
  ['tomber dans les pommes', 's’évanouir', 'tomber d’un pommier', 'evanouir', 'Il fait si chaud qu’il tombe dans les pommes.', 'Nora cueille des pommes.'],
  ['mettre la main à la pâte', 'aider au travail', 'faire de la pâte à modeler', 'aider', 'Tout le monde met la main à la pâte.', 'Papa prépare la pâte à crêpes.'],
  ['avoir un poil dans la main', 'être paresseux', 'avoir la main poilue', 'paresseux', 'Il ne fait rien : il a un poil dans la main.', 'Le chien perd ses poils.'],
  ['il pleut des cordes', 'il pleut très fort', 'des cordes tombent du ciel', 'pluie', 'Prends ton parapluie, il pleut des cordes !', 'Les marins tirent sur les cordes.'],
  ['avoir une faim de loup', 'avoir très faim', 'avoir peur du loup', 'faim', 'Après le sport, j’ai une faim de loup.', 'Le loup hurle dans la forêt.'],
  ['un froid de canard', 'un très grand froid', 'un canard qui a froid', 'froid', 'Ce matin, il fait un froid de canard.', 'Le canard nage sur la mare.'],
  ['se lever du pied gauche', 'être de mauvaise humeur', 'se lever à cloche-pied', 'humeur', 'Aujourd’hui, Malo s’est levé du pied gauche.', 'Je mets ma chaussure au pied gauche.'],
  ['avoir les yeux plus gros que le ventre', 'se servir plus qu’on ne peut manger', 'avoir de très gros yeux', 'gourmand', 'Tom a les yeux plus gros que le ventre.', 'Le bébé a mal au ventre.'],
  ['couper la parole', 'interrompre quelqu’un qui parle', 'couper avec des ciseaux', 'interrompre', 'Ne coupe pas la parole à ta sœur.', 'Je coupe le pain.'],
  ['avoir la main verte', 'savoir faire pousser les plantes', 'avoir la main peinte en vert', 'jardin', 'Mamie a la main verte : son jardin est superbe.', 'Les feuilles du tilleul sont vertes.'],
  ['être muet comme une carpe', 'ne rien dire du tout', 'ressembler à un poisson', 'silence', 'Pendant le jeu, Lina est muette comme une carpe.', 'Une carpe nage dans l’étang.'],
  ['avoir des fourmis dans les jambes', 'avoir envie de bouger', 'avoir des fourmis sur soi', 'bouger', 'Après le film, j’ai des fourmis dans les jambes.', 'Les fourmis transportent des miettes.'],
  ['en un clin d’œil', 'très vite', 'en fermant un œil', 'vite', 'Elle a rangé sa chambre en un clin d’œil.', 'Le pirate a un bandeau sur l’œil.'],
  ['dormir sur ses deux oreilles', 'dormir tranquille, sans souci', 'dormir couché sur les oreilles', 'tranquille', 'Tout est fermé : tu peux dormir sur tes deux oreilles.', 'Le lapin a de longues oreilles.'],
  ['avoir le cafard', 'être triste', 'avoir un insecte à la maison', 'triste', 'Sous la pluie, Jade a le cafard.', 'Un cafard court sous l’évier.'],
  ['être têtu comme une mule', 'être très têtu', 'ressembler à une mule', 'tetu', 'Mon frère est têtu comme une mule.', 'La mule porte des sacs dans la montagne.'],
  ['avoir la tête dans les nuages', 'rêver, ne pas faire attention', 'avoir la tête très haute', 'distrait', 'Arrête d’avoir la tête dans les nuages !', 'Des nuages gris cachent le soleil.'],
  ['mettre son grain de sel', 'donner son avis sans qu’on le demande', 'saler un plat', 'avis', 'Mon oncle met toujours son grain de sel.', 'Ajoute une pincée de sel dans l’eau.'],
  ['avoir un trou de mémoire', 'oublier quelque chose', 'avoir un trou dans la tête', 'oubli', 'Pendant la poésie, Léo a un trou de mémoire.', 'Il y a un trou dans ma chaussette.'],
  ['marcher sur des œufs', 'agir avec beaucoup de prudence', 'écraser des œufs', 'prudence', 'Avec ce chien grognon, on marche sur des œufs.', 'La poule a pondu trois œufs.'],
  ['avoir la langue bien pendue', 'parler beaucoup', 'avoir une très longue langue', 'bavard', 'Ma voisine a la langue bien pendue.', 'Le chat se lèche avec sa langue.'],
];

export const expressionsCe1 = creerGenerateur({
  id: 'expressions-ce1',
  competence: 'FR-C2-CE1-VOC-04',
  cycle: 2,
  description: 'Comprendre des expressions imagées et distinguer le sens propre du sens figuré.',
  generer(a, d) {
    const i = a.entier(0, EXPRESSIONS.length - 1);
    const [expression, sens, litteral, famille, , propre] = EXPRESSIONS[i]!;
    // Autres expressions de sens différent : jamais deux bonnes réponses.
    const autres = a.melanger(EXPRESSIONS.filter((e) => e[3] !== famille));
    if (d === 1) {
      return {
        gabarit: 'qcm',
        consigne: `« ${expression[0]!.toUpperCase()}${expression.slice(1)} », cela veut dire :`,
        options: a.melanger([sens, litteral, autres[0]![1]]),
        erreurs: { [litteral]: 'sens-propre-figure' },
        reponse: sens,
        indice: 'Les mots ne veulent pas dire ce qu’ils disent. Cherche l’image.',
        explication: `C’est une expression imagée. Elle veut dire : ${sens}.`,
      };
    }
    if (d === 2) {
      return {
        gabarit: 'qcm',
        consigne: `Quelle expression veut dire « ${sens} » ?`,
        options: a.melanger([expression, autres[0]![0], autres[1]![0]]),
        reponse: expression,
        indice: 'Lis chaque expression. Imagine la situation.',
        explication: `C’est « ${expression} ».`,
      };
    }
    return {
      gabarit: 'qcm',
      consigne: 'Quelle phrase est au sens propre ?',
      options: a.melanger([propre, autres[0]![4], autres[1]![4]]),
      erreurs: tous([autres[0]![4], autres[1]![4]], propre, 'sens-propre-figure'),
      reponse: propre,
      indice: 'Au sens propre, les mots disent exactement ce qui se passe.',
      explication: `« ${propre} » : les mots ont leur sens habituel. Les deux autres phrases sont imagées.`,
    };
  },
});
