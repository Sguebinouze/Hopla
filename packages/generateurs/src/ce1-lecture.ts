// CE1, comprendre un texte : information explicite, chaine anaphorique (reprises pronominales), inférence simple.
// Source : programme de français du cycle 2 (BO n°41 du 31 octobre 2024), p. 6 et 7.
// Textes rédigés à la main, phrases de 10 mots au plus. Chaque question : réponse, puis deux pièges.
import { creerGenerateur } from './outils';

type Question = [question: string, reponse: string, piege1: string, piege2: string];
export interface TexteCe1 {
  texte: string;
  /** d1 : l'information est écrite dans le texte. */
  explicite: Question;
  /** d2 : qui ou quoi un pronom remplace. */
  reprise: Question;
  /** d3 : ce qu'on comprend sans que ce soit écrit, et pourquoi. */
  inference: Question;
  pourquoi: string;
}

export const TEXTES_CE1: TexteCe1[] = [
  {
    texte: 'Lina ouvre la porte du jardin. Elle voit un hérisson sous la haie. Il mange une limace.',
    explicite: ['Où est le hérisson ?', 'sous la haie', 'sur le toit', 'dans la cuisine'],
    reprise: ['Dans « Il mange une limace », qui est « il » ?', 'le hérisson', 'le jardin', 'la porte'],
    inference: ['Où est Lina ?', 'dans le jardin', 'à l’école', 'dans la voiture'],
    pourquoi: 'Lina ouvre la porte du jardin et voit la haie.',
  },
  {
    texte: 'Tom met son bonnet et ses gants. Dehors, la neige tombe depuis le matin. Il prend sa luge.',
    explicite: ['Qu’est-ce qui tombe dehors ?', 'la neige', 'la pluie', 'des feuilles'],
    reprise: ['Dans « Il prend sa luge », qui est « il » ?', 'Tom', 'le bonnet', 'le matin'],
    inference: ['En quelle saison se passe l’histoire ?', 'en hiver', 'en été', 'au printemps'],
    pourquoi: 'Il neige et Tom prend sa luge.',
  },
  {
    texte: 'Maman sort un gâteau du four. Il sent bon le chocolat. Jade compte les bougies : il y en a sept.',
    explicite: ['Combien y a-t-il de bougies ?', 'sept', 'six', 'huit'],
    reprise: ['Dans « Il sent bon le chocolat », qui est « il » ?', 'le gâteau', 'le four', 'le chocolat'],
    inference: ['Que fête-t-on ?', 'un anniversaire', 'Noël', 'la rentrée'],
    pourquoi: 'Il y a un gâteau avec des bougies.',
  },
  {
    texte: 'Le facteur sonne à la porte. Il tend un paquet à Hugo. Hugo l’ouvre et trouve un livre.',
    explicite: ['Que trouve Hugo dans le paquet ?', 'un livre', 'un jouet', 'une lettre'],
    reprise: ['Dans « Hugo l’ouvre », que remplace « l’ » ?', 'le paquet', 'la porte', 'le livre'],
    inference: ['Pourquoi le facteur sonne-t-il ?', 'pour donner un paquet', 'pour boire un café', 'pour jouer avec Hugo'],
    pourquoi: 'Le facteur tend un paquet à Hugo.',
  },
  {
    texte: 'Le ciel devient tout noir. Les enfants rentrent vite dans la classe. Ils ont entendu le tonnerre.',
    explicite: ['Où rentrent les enfants ?', 'dans la classe', 'dans la cantine', 'dans le bus'],
    reprise: ['Dans « Ils ont entendu le tonnerre », qui est « ils » ?', 'les enfants', 'les nuages', 'les maitres'],
    inference: ['Quel temps va-t-il faire ?', 'un orage', 'un grand soleil', 'un arc-en-ciel'],
    pourquoi: 'Le ciel est noir et on entend le tonnerre.',
  },
  {
    texte: 'Sami a perdu une dent ce matin. Ce soir, il la glisse sous son oreiller. Il espère une surprise.',
    explicite: ['Quand Sami a-t-il perdu sa dent ?', 'ce matin', 'hier', 'ce soir'],
    reprise: ['Dans « il la glisse », que remplace « la » ?', 'la dent', 'la surprise', 'la nuit'],
    inference: ['Qui va apporter la surprise ?', 'la petite souris', 'le facteur', 'la maitresse'],
    pourquoi: 'On glisse sa dent sous l’oreiller pour la petite souris.',
  },
  {
    texte: 'Nora arrose les tomates du potager. Elles sont rouges et bien rondes. Demain, elle va les cueillir.',
    explicite: ['Que fait Nora ?', 'elle arrose les tomates', 'elle plante des fleurs', 'elle mange une pomme'],
    reprise: ['Dans « Elles sont rouges », qui est « elles » ?', 'les tomates', 'les fleurs', 'les feuilles'],
    inference: ['Les tomates sont-elles mûres ?', 'oui, elles sont rouges', 'non, elles sont vertes', 'non, elles sont toutes petites'],
    pourquoi: 'Une tomate rouge est mûre.',
  },
  {
    texte: 'Le chat de Malo se cache sous le lit. Il tremble. Dehors, un gros chien aboie.',
    explicite: ['Où se cache le chat ?', 'sous le lit', 'sur l’armoire', 'dans le jardin'],
    reprise: ['Dans « Il tremble », qui est « il » ?', 'le chat', 'Malo', 'le lit'],
    inference: ['Pourquoi le chat se cache-t-il ?', 'il a peur du chien', 'il a faim', 'il veut jouer'],
    pourquoi: 'Le chat tremble pendant que le chien aboie.',
  },
  {
    texte: 'Inès met son maillot et ses lunettes. Elle saute dans l’eau du grand bassin. Puis elle nage jusqu’au bord.',
    explicite: ['Que met Inès ?', 'son maillot et ses lunettes', 'son manteau et ses bottes', 'son pyjama'],
    reprise: ['Dans « Elle saute dans l’eau », qui est « elle » ?', 'Inès', 'l’eau', 'la piscine'],
    inference: ['Où est Inès ?', 'à la piscine', 'à la bibliothèque', 'au marché'],
    pourquoi: 'Inès porte un maillot et nage dans un grand bassin.',
  },
  {
    texte: 'Papa gonfle les pneus du vélo. Léo met son casque. Ils partent tous les deux sur le chemin.',
    explicite: ['Que met Léo ?', 'son casque', 'ses bottes', 'son manteau'],
    reprise: ['Dans « Ils partent tous les deux », qui est « ils » ?', 'Papa et Léo', 'les pneus', 'les vélos'],
    inference: ['Que vont-ils faire ?', 'une balade à vélo', 'un gâteau', 'une sieste'],
    pourquoi: 'Papa gonfle les pneus et Léo met son casque.',
  },
  {
    texte: 'La maitresse distribue les feuilles. Les élèves écrivent leur prénom en haut. Puis ils commencent la dictée.',
    explicite: ['Qu’écrivent les élèves en haut de la feuille ?', 'leur prénom', 'la date', 'un dessin'],
    reprise: ['Dans « Puis ils commencent la dictée », qui est « ils » ?', 'les élèves', 'les feuilles', 'les parents'],
    inference: ['Où se passe l’histoire ?', 'à l’école', 'à la plage', 'au cinéma'],
    pourquoi: 'Il y a une maitresse, des élèves et une dictée.',
  },
  {
    texte: 'Rose cherche ses bottes partout. Elle les trouve enfin derrière la porte. Il pleut très fort ce matin.',
    explicite: ['Où sont les bottes ?', 'derrière la porte', 'sous le lit', 'dans le placard'],
    reprise: ['Dans « Elle les trouve », que remplace « les » ?', 'les bottes', 'les portes', 'les chaussettes'],
    inference: ['Pourquoi Rose veut-elle ses bottes ?', 'parce qu’il pleut', 'parce qu’il fait chaud', 'pour aller dormir'],
    pourquoi: 'Il pleut très fort : les bottes gardent les pieds au sec.',
  },
  {
    texte: 'Le boulanger se lève à quatre heures. Il prépare le pain et les croissants. À sept heures, la boutique ouvre.',
    explicite: ['À quelle heure se lève le boulanger ?', 'à quatre heures', 'à sept heures', 'à midi'],
    reprise: ['Dans « Il prépare le pain », qui est « il » ?', 'le boulanger', 'le croissant', 'le client'],
    inference: ['Pourquoi le boulanger se lève-t-il si tôt ?', 'pour que le pain soit prêt', 'pour aller à l’école', 'pour regarder la télévision'],
    pourquoi: 'Le pain doit être cuit avant l’ouverture de la boutique.',
  },
  {
    texte: 'Un oiseau construit son nid dans le cerisier. Il apporte des brindilles et de la mousse. Le nid sera bientôt prêt.',
    explicite: ['Où l’oiseau construit-il son nid ?', 'dans le cerisier', 'sur le toit', 'dans la haie'],
    reprise: ['Dans « Il apporte des brindilles », qui est « il » ?', 'l’oiseau', 'le cerisier', 'le nid'],
    inference: ['À quoi servent les brindilles ?', 'à construire le nid', 'à nourrir l’oiseau', 'à décorer le cerisier'],
    pourquoi: 'L’oiseau apporte les brindilles pendant qu’il construit son nid.',
  },
  {
    texte: 'Hugo a oublié son gouter à la maison. Sami partage sa pomme avec lui. Hugo le remercie.',
    explicite: ['Qu’a oublié Hugo ?', 'son gouter', 'son cartable', 'son manteau'],
    reprise: ['Dans « Hugo le remercie », qui est « le » ?', 'Sami', 'le gouter', 'le maitre'],
    inference: ['Comment est Sami ?', 'généreux', 'méchant', 'fatigué'],
    pourquoi: 'Sami partage sa pomme avec Hugo.',
  },
  {
    texte: 'Ce matin, la mare est gelée. Les canards glissent sur la glace. Ils ne peuvent plus nager.',
    explicite: ['Comment est la mare ce matin ?', 'gelée', 'pleine de poissons', 'vide'],
    reprise: ['Dans « Ils ne peuvent plus nager », qui est « ils » ?', 'les canards', 'les poissons', 'les enfants'],
    inference: ['Quel temps fait-il ?', 'il fait très froid', 'il fait très chaud', 'il y a du vent chaud'],
    pourquoi: 'L’eau de la mare a gelé.',
  },
  {
    texte: 'Lucie met dans son sac un maillot et une serviette. Elle ajoute de la crème solaire. Puis elle part avec ses parents.',
    explicite: ['Que met Lucie dans son sac ?', 'un maillot et une serviette', 'des bottes et un bonnet', 'des livres'],
    reprise: ['Dans « Elle ajoute de la crème solaire », qui est « elle » ?', 'Lucie', 'la serviette', 'la maman'],
    inference: ['Où va Lucie ?', 'à la plage', 'à la patinoire', 'à l’école'],
    pourquoi: 'Lucie emporte un maillot, une serviette et de la crème solaire.',
  },
  {
    texte: 'Le réveil sonne. Noé ouvre un œil, puis se retourne dans son lit. Il est encore très fatigué.',
    explicite: ['Que fait Noé quand le réveil sonne ?', 'il se retourne dans son lit', 'il saute du lit', 'il chante'],
    reprise: ['Dans « Il est encore très fatigué », qui est « il » ?', 'Noé', 'le réveil', 'le lit'],
    inference: ['Noé a-t-il envie de se lever ?', 'non, il veut dormir encore', 'oui, tout de suite', 'oui, pour aller jouer'],
    pourquoi: 'Noé est fatigué et se retourne dans son lit.',
  },
  {
    texte: 'Lola, la chienne de Jade, boite. Le vétérinaire examine sa patte. Il pose un pansement.',
    explicite: ['Qui examine la patte de Lola ?', 'le vétérinaire', 'Jade', 'la maitresse'],
    reprise: ['Dans « Il pose un pansement », qui est « il » ?', 'le vétérinaire', 'Lola', 'Jade'],
    inference: ['Pourquoi Lola boite-t-elle ?', 'elle a mal à la patte', 'elle veut jouer', 'elle a faim'],
    pourquoi: 'Le vétérinaire soigne sa patte avec un pansement.',
  },
  {
    texte: 'Au marché, Mamie achète des pommes et des poireaux. Elle paie le marchand. Puis elle rentre préparer la soupe.',
    explicite: ['Qu’achète Mamie ?', 'des pommes et des poireaux', 'du pain et du lait', 'des fleurs'],
    reprise: ['Dans « Elle paie le marchand », qui est « elle » ?', 'Mamie', 'la soupe', 'la pomme'],
    inference: ['Avec quoi Mamie va-t-elle faire la soupe ?', 'avec les poireaux', 'avec du chocolat', 'avec du pain'],
    pourquoi: 'On fait la soupe avec des légumes, comme les poireaux.',
  },
  {
    texte: 'Le petit poisson rouge tourne dans son bocal. Malik lui donne à manger chaque matin. Il ne l’oublie jamais.',
    explicite: ['Où vit le poisson ?', 'dans un bocal', 'dans la mer', 'dans une rivière'],
    reprise: ['Dans « Il ne l’oublie jamais », qui est « il » ?', 'Malik', 'le poisson', 'le bocal'],
    inference: ['Comment Malik s’occupe-t-il de son poisson ?', 'il en prend soin', 'il le laisse seul', 'il le fait sortir'],
    pourquoi: 'Malik le nourrit chaque matin sans jamais l’oublier.',
  },
  {
    texte: 'Il fait nuit. Paul allume sa lampe de poche. Il cherche son doudou sous les draps.',
    explicite: ['Que cherche Paul ?', 'son doudou', 'sa lampe', 'ses chaussons'],
    reprise: ['Dans « Il cherche son doudou », qui est « il » ?', 'Paul', 'le doudou', 'le drap'],
    inference: ['Pourquoi Paul allume-t-il sa lampe ?', 'parce qu’il fait noir', 'parce qu’il a chaud', 'parce qu’il a faim'],
    pourquoi: 'Il fait nuit : sans lampe, Paul ne voit rien.',
  },
  {
    texte: 'Les élèves plantent des graines dans des pots. Chaque jour, ils arrosent la terre. Une semaine plus tard, de petites tiges sortent.',
    explicite: ['Que plantent les élèves ?', 'des graines', 'des arbres', 'des tomates'],
    reprise: ['Dans « ils arrosent la terre », qui est « ils » ?', 'les élèves', 'les pots', 'les graines'],
    inference: ['Que s’est-il passé après une semaine ?', 'les graines ont poussé', 'les pots sont cassés', 'les élèves sont partis'],
    pourquoi: 'De petites tiges sortent de la terre.',
  },
  {
    texte: 'Le chevalier monte sur son cheval blanc. Il tient une grande épée. Il part vers le château.',
    explicite: ['De quelle couleur est le cheval ?', 'blanc', 'noir', 'marron'],
    reprise: ['Dans « Il tient une grande épée », qui est « il » ?', 'le chevalier', 'le cheval', 'le château'],
    inference: ['Comment le chevalier se déplace-t-il ?', 'à cheval', 'à pied', 'en bateau'],
    pourquoi: 'Le chevalier monte sur son cheval avant de partir.',
  },
  {
    texte: 'Ce soir, Elsa ne trouve pas le sommeil. Demain, c’est la rentrée. Elle pense à sa nouvelle classe.',
    explicite: ['Quand est la rentrée ?', 'demain', 'ce soir', 'dans un mois'],
    reprise: ['Dans « Elle pense à sa nouvelle classe », qui est « elle » ?', 'Elsa', 'la classe', 'la rentrée'],
    inference: ['Comment se sent Elsa ?', 'un peu inquiète', 'très en colère', 'malade'],
    pourquoi: 'Elsa n’arrive pas à dormir et pense à la rentrée.',
  },
  {
    texte: 'Zoé verse la farine, le sucre et les œufs. Elle mélange avec une cuillère en bois. Papa allume le four.',
    explicite: ['Avec quoi Zoé mélange-t-elle ?', 'une cuillère en bois', 'une fourchette', 'ses mains'],
    reprise: ['Dans « Elle mélange », qui est « elle » ?', 'Zoé', 'la farine', 'la cuillère'],
    inference: ['Que préparent Zoé et Papa ?', 'un gâteau', 'une soupe', 'une salade'],
    pourquoi: 'Farine, sucre, œufs et four : c’est un gâteau.',
  },
  {
    texte: 'Le bus s’arrête devant l’école. Les enfants descendent un par un. Le chauffeur leur fait un signe.',
    explicite: ['Où s’arrête le bus ?', 'devant l’école', 'devant la gare', 'devant le parc'],
    reprise: ['Dans « Le chauffeur leur fait un signe », qui est « leur » ?', 'les enfants', 'le bus', 'les parents'],
    inference: ['Comment les enfants sont-ils venus à l’école ?', 'en bus', 'à pied', 'à vélo'],
    pourquoi: 'Les enfants descendent du bus devant l’école.',
  },
  {
    texte: 'Enzo lance le ballon trop fort. Le ballon passe par-dessus la grille. Il roule jusque dans la rue.',
    explicite: ['Qui lance le ballon ?', 'Enzo', 'Tom', 'la maitresse'],
    reprise: ['Dans « Il roule jusque dans la rue », qui est « il » ?', 'le ballon', 'Enzo', 'le trottoir'],
    inference: ['Pourquoi le ballon passe-t-il la grille ?', 'Enzo l’a lancé trop fort', 'le vent l’a poussé', 'un chien l’a pris'],
    pourquoi: 'Le texte dit qu’Enzo lance le ballon trop fort.',
  },
  {
    texte: 'Grand-père plante des fraisiers au printemps. En juin, il cueille de belles fraises. Il en donne à ses voisins.',
    explicite: ['Quand Grand-père cueille-t-il les fraises ?', 'en juin', 'en hiver', 'en septembre'],
    reprise: ['Dans « il cueille de belles fraises », qui est « il » ?', 'Grand-père', 'le fraisier', 'le voisin'],
    inference: ['Grand-père a-t-il beaucoup de fraises ?', 'oui, assez pour en donner', 'non, aucune', 'non, une seule'],
    pourquoi: 'Il en a assez pour en donner à ses voisins.',
  },
  {
    texte: 'Les feuilles des arbres deviennent jaunes et rouges. Elles tombent sur le trottoir. Léa les ramasse pour son herbier.',
    explicite: ['De quelle couleur sont les feuilles ?', 'jaunes et rouges', 'vertes', 'bleues'],
    reprise: ['Dans « Léa les ramasse », que remplace « les » ?', 'les feuilles', 'les arbres', 'les fleurs'],
    inference: ['En quelle saison est-on ?', 'en automne', 'en été', 'au printemps'],
    pourquoi: 'Les feuilles jaunissent et tombent en automne.',
  },
  {
    texte: 'Mia a de la fièvre et mal à la gorge. Le docteur lui donne un sirop. Elle reste au lit toute la journée.',
    explicite: ['Que donne le docteur ?', 'un sirop', 'un bonbon', 'un livre'],
    reprise: ['Dans « Le docteur lui donne un sirop », qui est « lui » ?', 'Mia', 'le docteur', 'le sirop'],
    inference: ['Mia va-t-elle à l’école aujourd’hui ?', 'non, elle est malade', 'oui, comme d’habitude', 'oui, en bus'],
    pourquoi: 'Mia a de la fièvre et reste au lit toute la journée.',
  },
  {
    texte: 'La sirène retentit. Les pompiers enfilent leur casque et montent dans le camion. Ils partent très vite.',
    explicite: ['Où montent les pompiers ?', 'dans le camion', 'dans un avion', 'dans un bateau'],
    reprise: ['Dans « Ils partent très vite », qui est « ils » ?', 'les pompiers', 'les casques', 'les voisins'],
    inference: ['Pourquoi les pompiers partent-ils vite ?', 'quelqu’un a besoin d’aide', 'ils sont en retard pour manger', 'ils font une course'],
    pourquoi: 'La sirène appelle les pompiers pour aider quelqu’un.',
  },
];

export const lectureCe1 = creerGenerateur({
  id: 'lecture-ce1',
  competence: 'FR-C2-CE1-LECT-01',
  cycle: 2,
  description: 'Comprendre un texte court : information écrite, reprise par un pronom, inférence simple.',
  generer(a, d) {
    const t = a.choisir(TEXTES_CE1);
    const [question, reponse, p1, p2] = d === 1 ? t.explicite : d === 2 ? t.reprise : t.inference;
    const pronom = d === 2 ? [...question.matchAll(/« ([^»]+) »/g)].at(-1)![1]! : '';
    return {
      gabarit: 'qcm',
      consigne: `« ${t.texte} » ${question}`,
      options: a.melanger([reponse, p1, p2]),
      reponse,
      indice: d === 1 ? 'Relis le texte. La réponse y est écrite.' : d === 2 ? 'Cherche le mot que le petit mot remplace.' : 'La réponse n’est pas écrite. Cherche les indices.',
      explication: d === 1
        ? `Le texte le dit : ${reponse}.`
        : d === 2
          ? `« ${pronom} » remplace ${reponse}. Il évite de répéter le mot.`
          : `${t.pourquoi} Donc : ${reponse}.`,
    };
  },
});
