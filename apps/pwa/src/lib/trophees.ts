import { niveauDe } from './apparence';
import type { Pack } from './packs';
import { SEUIL_ACQUIS, type Suivi } from './progression';

// Collection de l'enfant : trophées calculés à partir de sa progression, de son niveau et de ses records.
// Rien de plus n'est enregistré : un trophée se gagne en progressant, il ne se perd pas
// (sauf si une notion acquise redescend sous le seuil, ce qui la remet au travail).

export interface Trophee {
  id: string;
  nom: string;
  condition: string;
  gagne: boolean;
  /** Avancement vers le trophée, de 0 à 1. */
  part: number;
}

export function trophees(xp: number, suivi: Record<string, Suivi>, pack: Pack, records: Record<string, number>): Trophee[] {
  const matiereDe = new Map(pack.matieres.flatMap((m) => m.competences.map((c) => [c.id, m.matiere] as const)));
  const acquises = Object.entries(suivi).filter(([id, s]) => matiereDe.has(id) && s.score >= SEUIL_ACQUIS).map(([id]) => id);
  const matieres = new Set(acquises.map((id) => matiereDe.get(id)));
  const niveau = niveauDe(xp);
  const defisFaits = pack.defis.filter((d) => (records[d.id] ?? 0) > 0);
  const objectifs = pack.defis.filter((d) => d.objectif !== null && (records[d.id] ?? 0) >= d.objectif);
  const avecObjectif = pack.defis.filter((d) => d.objectif !== null);

  const seuil = (id: string, nom: string, condition: string, valeur: number, cible: number): Trophee =>
    ({ id, nom, condition, gagne: valeur >= cible, part: Math.min(1, valeur / cible) });

  const liste = [
    seuil('premiere-notion', 'Premier pas', 'Acquérir une notion', acquises.length, 1),
    seuil('dix-notions', 'Bonne lancée', 'Acquérir 10 notions', acquises.length, 10),
    seuil('trente-notions', 'Tête bien pleine', 'Acquérir 30 notions', acquises.length, 30),
    seuil('trois-matieres', 'Touche-à-tout', 'Acquérir une notion dans 3 matières', matieres.size, 3),
    seuil('niveau-5', 'Niveau 5', 'Atteindre le niveau 5', niveau, 5),
    seuil('niveau-10', 'Niveau 10', 'Atteindre le niveau 10', niveau, 10),
    seuil('niveau-20', 'Niveau 20', 'Atteindre le niveau 20', niveau, 20),
  ];
  if (matiereDe.size > 0 && [...matiereDe.values()].includes('langues-vivantes')) {
    liste.push(seuil('anglais', 'Hello !', 'Acquérir une notion d’anglais', acquises.filter((id) => matiereDe.get(id) === 'langues-vivantes').length, 1));
  }
  if (pack.defis.length > 0) liste.push(seuil('premier-defi', 'Chrono lancé', 'Terminer un défi chrono', defisFaits.length, 1));
  if (avecObjectif.length > 0) {
    liste.push(seuil('objectif-defi', 'Objectif atteint', 'Atteindre l’objectif de fin d’année d’un défi', objectifs.length, 1));
  }
  return liste;
}
