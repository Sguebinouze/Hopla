import { completerOptions, creerAleatoire } from './aleatoire';
import type { Difficulte, Generateur, Item } from './types';

export type Aleatoire = ReturnType<typeof creerAleatoire>;
type Champs = Omit<Item, 'id' | 'competence' | 'difficulte'>;

const ESPACE = ' ';

/** Écriture française d'un entier : espace insécable entre les classes (1 000, 12 500). */
export function fr(n: number): string {
  const signe = n < 0 ? '−' : '';
  const s = String(Math.abs(n));
  return signe + (s.length > 3 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ESPACE) : s);
}

/** Écriture française d'un décimal donné sous forme de chaîne (« 1234,5 » → « 1 234,5 »). */
export function frDecimal(s: string): string {
  const [e = '0', d] = s.split(',');
  const entier = e.length > 3 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, ESPACE) : e;
  return d ? `${entier},${d}` : entier;
}

/** Accorde un nom avec un nombre : (3, 'bille') → « 3 billes ». */
export function qte(n: number, singulier: string, pluriel = `${singulier}s`): string {
  return `${fr(n)} ${n > 1 ? pluriel : singulier}`;
}

/** « que » élidé devant une voyelle : que('Elsa') → « qu’Elsa », que('Tom') → « que Tom ». */
export function que(mot: string): string {
  return /^[aeiouyéèêâîôûh]/i.test(mot) && !/^h/i.test(mot) ? `qu’${mot}` : `que ${mot}`;
}

/** Fabrique un générateur : chaque appel reçoit un aléatoire déjà initialisé. */
export function creerGenerateur(def: {
  id: string;
  competence: string;
  cycle: 2 | 3 | 4;
  description: string;
  generer: (a: Aleatoire, difficulte: Difficulte) => Champs;
}): Generateur {
  return {
    id: def.id,
    competences: [def.competence],
    cycle: def.cycle,
    description: def.description,
    generer(graine, difficulte) {
      const champs = def.generer(creerAleatoire(graine), difficulte);
      return { id: `${def.id}:${difficulte}:${graine}`, competence: def.competence, difficulte, ...champs };
    },
  };
}

/** Options de QCM : la bonne réponse, des pièges, complétés par `secours` puis mélangés. */
export function options(a: Aleatoire, reponse: string, pieges: string[], secours: () => string, taille = 4): string[] {
  const base = [reponse, ...pieges.filter((p) => p !== reponse)];
  return a.melanger(completerOptions(base, taille, secours));
}

/** Valeur numérique d'une fraction « a/b » ou d'un nombre « 2,5 ». */
export function valeurDe(s: string): number {
  const t = s.replace(/\s/g, '').replace(',', '.').replace('−', '-');
  if (t.includes('/')) {
    const [p, q] = t.split('/').map(Number);
    return p! / q!;
  }
  return Number(t);
}

/** Options de QCM dont les valeurs numériques sont toutes différentes (pas deux bonnes réponses). */
export function optionsNumeriques(a: Aleatoire, reponse: string, pieges: string[], secours: () => string, taille = 4): string[] {
  const liste = [reponse];
  const vues = [valeurDe(reponse)];
  const ajouter = (o: string) => {
    const v = valeurDe(o);
    if (liste.length < taille && Number.isFinite(v) && v >= 0 && !vues.some((w) => Math.abs(w - v) < 1e-9)) {
      liste.push(o);
      vues.push(v);
    }
  };
  pieges.forEach(ajouter);
  for (let i = 0; i < 200 && liste.length < taille; i++) ajouter(secours());
  return a.melanger(liste);
}
