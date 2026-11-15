// CE2, les solides : cube, pavé, pyramide. Source : programme de mathématiques du cycle 2 (BO n°41 du 31 octobre 2024), p. 35.
import { choix, creerGenerateur, type Piege } from './outils';

type Element = 'faces' | 'sommets' | 'arêtes';

const SOLIDES: { nom: string; le: string; faces: number; sommets: number; aretes: number; formes: string }[] = [
  { nom: 'cube', le: 'un cube', faces: 6, sommets: 8, aretes: 12, formes: 'des carrés' },
  { nom: 'pavé', le: 'un pavé', faces: 6, sommets: 8, aretes: 12, formes: 'des rectangles' },
  { nom: 'pyramide à base carrée', le: 'une pyramide à base carrée', faces: 5, sommets: 5, aretes: 8, formes: 'des triangles et un carré' },
  { nom: 'pyramide à base triangulaire', le: 'une pyramide à base triangulaire', faces: 4, sommets: 4, aretes: 6, formes: 'des triangles' },
];
const FORMES = ['des carrés', 'des rectangles', 'des triangles et un carré', 'des triangles', 'des disques'];

export const solidesCe2 = creerGenerateur({
  id: 'solides-ce2',
  competence: 'MA-C2-CE2-GEO-01',
  cycle: 2,
  description: 'Nombre de faces, de sommets et d’arêtes, nature des faces d’un cube, d’un pavé, d’une pyramide.',
  generer(a, d) {
    const solide = a.choisir(d === 1 ? SOLIDES.slice(0, 2) : SOLIDES);
    if (d === 3 && a.suivant() < 0.5) {
      return {
        gabarit: 'qcm',
        consigne: `Quelles sont les faces d’${solide.le} ?`,
        // Un carré est aussi un rectangle : pour le cube, « des rectangles » n'est pas proposé.
        ...choix(a, solide.formes, a.melanger(FORMES.filter((f) => f !== solide.formes && !(solide.nom === 'cube' && f === 'des rectangles'))).slice(0, 3).map((f): Piege => [f, 'solides-confondus']), () => 'des disques'),
        reponse: solide.formes,
        indice: 'Imagine le solide posé sur la table. Regarde chaque face.',
        explication: `Le solide est ${solide.le}. Ses faces sont ${solide.formes}.`,
      };
    }
    const element: Element = d === 1 ? 'faces' : a.choisir(['faces', 'sommets', 'arêtes'] as const);
    const valeur = element === 'faces' ? solide.faces : element === 'sommets' ? solide.sommets : solide.aretes;
    const pieges: Piege[] = [[String(solide.faces), 'faces-aretes-sommets'], [String(solide.sommets), 'faces-aretes-sommets'], [String(solide.aretes), 'faces-aretes-sommets'], [String(valeur + 2)], [String(valeur - 2)]];
    const definition = { faces: 'Une face est une surface plate.', sommets: 'Un sommet est un coin du solide.', arêtes: 'Une arête est un bord entre deux faces.' }[element];
    return {
      gabarit: 'qcm',
      consigne: `Combien ${element === 'arêtes' ? 'd’arêtes' : `de ${element}`} a ${solide.le} ?`,
      ...choix(a, String(valeur), pieges, () => String(a.entier(3, 14)), { numerique: true }),
      reponse: String(valeur),
      indice: definition,
      explication: `${definition} ${solide.le.charAt(0).toUpperCase()}${solide.le.slice(1)} a ${valeur} ${element}.`,
    };
  },
});
