import { describe, expect, it } from 'vitest';
import { type BilanEnfant, composerBilan, lignesEnfant } from '../functions/bilan-hebdo/bilan';

const lea: BilanEnfant = {
  prenom: 'Léa', classe: 'ce2', serie: 3, jours_actifs: 4, questions: 40, reussies: 30, minutes: 52,
  notions: 6, maitrisees: 2, a_revoir: 1, controle: { date: '2026-11-20', notions: 3 },
};
const tom: BilanEnfant = { ...lea, prenom: 'Tom <b>', classe: '6e', serie: 0, jours_actifs: 0, questions: 0, reussies: 0, minutes: 0, notions: 0, maitrisees: 0, a_revoir: 0, controle: null };

describe('bilan du dimanche', () => {
  it('phrases justes et accordées', () => {
    expect(lignesEnfant(lea)).toEqual([
      '4 jours de travail, 52 min en tout.',
      '40 questions, 75 % de réussite.',
      '6 notions travaillées, dont 2 maitrisées.',
      '1 notion à revoir dès maintenant.',
      'Série en cours : 3 jours.',
      'Contrôle prévu le vendredi 20 novembre (3 notions).',
    ]);
    expect(lignesEnfant(tom)).toEqual(['Pas de séance cette semaine.']);
    expect(lignesEnfant({ ...tom, a_revoir: 2 })).toEqual(['Pas de séance cette semaine.', '2 notions attendent une révision.']);
  });

  it('sujet, lien vers l’espace parent, prénoms échappés dans le HTML', () => {
    const m = composerBilan([lea, tom], 'https://exemple.fr/');
    expect(m.sujet).toBe('Hopla : la semaine de Léa et Tom <b>');
    expect(m.texte).toContain('https://exemple.fr/parent');
    expect(m.html).toContain('Tom &lt;b&gt;');
    expect(m.html).not.toContain('Tom <b>');
    expect(composerBilan([lea], 'https://exemple.fr').sujet).toBe('Hopla : la semaine de Léa');
  });

  it('pas de tiret cadratin ni d’identifiant de notion', () => {
    const m = composerBilan([lea, tom], 'https://exemple.fr');
    expect(m.texte + m.html).not.toMatch(/\u2014/);
    expect(m.texte + m.html).not.toMatch(/[A-Z]{2}-C[234]-/);
  });
});
