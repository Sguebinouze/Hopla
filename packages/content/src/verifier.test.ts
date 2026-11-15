import { appliquerRelecture, construireRelecture } from './relecture';
import { describe, expect, it } from 'vitest';
import { anneeScolaire, couvre } from './annees';
import { chargerContenu, type Contenu } from './charger';
import { construirePacks } from './packs';
import { programmesApplicables, verifierContenu } from './verifier';

const { contenu, erreurs } = chargerContenu();
const clone = (): Contenu => structuredClone(contenu);
const erreursDe = (c: Contenu) => verifierContenu(c).filter((x) => x.niveau === 'erreur');

describe('contenu du dépôt', () => {
  it('se charge sans erreur de schéma', () => {
    expect(erreurs).toEqual([]);
  });

  it('ne contient aucune erreur bloquante', () => {
    expect(erreursDe(contenu)).toEqual([]);
  });
});

describe('calendrier des programmes', () => {
  it('bascule la 5e sur le nouveau programme de maths en 2026-2027', () => {
    expect(programmesApplicables(contenu.programmes, '5e', '2025-2026', 'mathematiques').map((p) => p.id)).toEqual(['MA-C4-2020']);
    expect(programmesApplicables(contenu.programmes, '5e', '2026-2027', 'mathematiques').map((p) => p.id)).toEqual(['MA-C4-2026']);
  });

  it('garde l’ancien programme en 4e jusqu’en 2026-2027', () => {
    expect(programmesApplicables(contenu.programmes, '4e', '2026-2027', 'francais').map((p) => p.id)).toEqual(['FR-C4-2020']);
    expect(programmesApplicables(contenu.programmes, '4e', '2027-2028', 'francais').map((p) => p.id)).toEqual(['FR-C4-2026']);
  });

  it('détecte un chevauchement de programmes', () => {
    const c = clone();
    c.programmes.find((p) => p.id === 'MA-C4-2020')!.application.find((a) => a.classe === '5e')!.fin = null;
    expect(erreursDe(c).some((e) => e.message.includes('2 programmes pour 5e'))).toBe(true);
  });

  it('calcule l’année scolaire à partir de la rentrée de septembre', () => {
    expect(anneeScolaire(new Date('2026-11-15'))).toBe('2026-2027');
    expect(anneeScolaire(new Date('2027-06-30'))).toBe('2026-2027');
    expect(anneeScolaire(new Date('2027-09-01'))).toBe('2027-2028');
    expect(couvre('2026-2027', '2025-2026', null)).toBe(true);
  });
});

describe('intégrité des références', () => {
  it('refuse un exercice dont la réponse n’est pas dans les options', () => {
    const c = clone();
    c.banques[0]!.exercices[0]!.reponse = 'jouons';
    expect(erreursDe(c).some((e) => e.message.includes('ne fait pas partie des options'))).toBe(true);
  });

  it('relecture : liste ce qui reste à relire et reporte les décisions humaines', () => {
    // Contenu remis en brouillon en mémoire : la liste ne dépend pas de l'état du dépôt.
    const enAttente: Contenu = {
      ...contenu,
      referentiels: contenu.referentiels.map((r) => ({ ...r, competences: r.competences.map((c) => ({ ...c, statut: 'a_verifier' as const })) })),
      banques: contenu.banques.map((b) => ({ ...b, exercices: b.exercices.map((e) => ({ ...e, statut: 'brouillon' as const, relu_par: null })) })),
      lecons: contenu.lecons.map((l) => ({ ...l, statut: 'brouillon' as const, relu_par: null })),
    };
    const notions = construireRelecture(enAttente);
    expect(notions[0]!.classe).toBe('cp');
    const n = notions.find((x) => x.lecon && x.questions.length > 0)!;
    expect(n.verifiee).toBe(false);
    // Rien d'écrit (dernier argument) : décisions reportées sur le contenu réel, sans toucher au dépôt.
    const q = contenu.banques.flatMap((b) => b.exercices).find((e) => e.id === n.questions[0]!.id)!;
    const bilan = appliquerRelecture(contenu, [
      { type: 'question', element_id: q.id, decision: 'ok', commentaire: '' },
      { type: 'notion', element_id: n.id, decision: 'corriger', commentaire: 'Extrait trop court.' },
      { type: 'question', element_id: 'XX-C2-CE1-ABC-01-001', decision: 'ok', commentaire: '' },
    ], 'Laurent', false);
    // Une question déjà publiée n'est pas republiée ; une inconnue est signalée ; une correction est listée.
    expect(bilan.publies).toEqual(q.statut === 'publie' ? [] : [q.id]);
    expect(bilan.aCorriger.map((d) => d.commentaire)).toEqual(['Extrait trop court.']);
    expect(bilan.introuvables.map((d) => d.element_id)).toEqual(['XX-C2-CE1-ABC-01-001']);
  });

  it('refuse un défi de fluence dont le générateur ne couvre pas la compétence', () => {
    const d = contenu.defis.find((x) => x.id === 'tables-addition-ce1')!;
    const faux = { ...contenu, defis: [...contenu.defis, { ...d, id: 'defi-faux', generateur: 'tables-addition-cp' }] };
    expect(erreursDe(faux).map((e) => e.message).join('\n')).toMatch(/ne couvre pas MA-C2-CE1-CALC-01/);
    expect(construirePacks(contenu, '2026-2027').find((p) => p.classe === 'ce1')!.defis.map((x) => x.objectif)).toEqual([12, 8, 8]);
  });

  it('refuse un exercice qui enfreint les règles de rédaction du cycle', () => {
    const c = clone();
    c.banques[0]!.exercices[0]!.explication = 'Bien sûr, voici la réponse fascinante : jouent.';
    expect(erreursDe(c).length).toBeGreaterThan(0);
  });

  it('refuse une compétence vérifiée sans page ni extrait de la source', () => {
    const c = clone();
    const comp = c.referentiels[0]!.competences[0]!;
    comp.statut = 'verifie';
    comp.source = { ...comp.source, page: null, extrait: null };
    expect(erreursDe(c).some((e) => e.message.includes('citer la page'))).toBe(true);
  });

  it('refuse un générateur rattaché à une compétence absente du référentiel', () => {
    const c = clone();
    c.referentiels = c.referentiels.filter((r) => r.programme !== 'MA-C4-2026');
    expect(erreursDe(c).some((e) => e.ou === 'générateur addition-relatifs')).toBe(true);
  });
});

describe('packs', () => {
  it('n’embarque que les exercices publiés, sauf demande explicite', () => {
    const ce2 = (brouillons: boolean) =>
      construirePacks(contenu, '2026-2027', { brouillons }).find((p) => p.classe === 'ce2')!;
    const nb = (b: boolean) =>
      ce2(b).matieres.flatMap((m) => m.competences).reduce((n, c) => n + c.exercices.length, 0);
    // Avec les brouillons : toutes les questions rédigées des notions du pack, quel que soit leur nombre.
    const ids = new Set(ce2(true).matieres.flatMap((m) => m.competences.map((c) => c.id)));
    const redigees = contenu.banques.filter((b) => ids.has(b.competence)).reduce((n, b) => n + b.exercices.length, 0);
    const publiees = contenu.banques.filter((b) => ids.has(b.competence))
      .reduce((n, b) => n + b.exercices.filter((e) => e.statut === 'publie').length, 0);
    expect(redigees).toBeGreaterThan(0);
    expect(nb(false)).toBe(publiees);
    expect(nb(true)).toBe(redigees);
    // Un brouillon n'entre jamais dans un pack de production.
    const enBrouillon = {
      ...contenu,
      banques: contenu.banques.map((b) => ({ ...b, exercices: b.exercices.map((e) => ({ ...e, statut: 'brouillon' as const, relu_par: null })) })),
    };
    expect(construirePacks(enBrouillon, '2026-2027').find((p) => p.classe === 'ce2')!
      .matieres.flatMap((m) => m.competences).reduce((n, c) => n + c.exercices.length, 0)).toBe(0);
    expect(ce2(false).matieres.map((m) => m.programme.id).sort()).toEqual(['EM-C2-2024', 'FR-C2-2024', 'LV-C2-2020', 'MA-C2-2024', 'QM-C2-2020']);
  });
});
