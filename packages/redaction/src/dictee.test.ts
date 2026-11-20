import { describe, expect, it } from 'vitest';
import { decouperDictee, groupeLu, nomsPropres } from './dictee';

const TEXTE = 'Elles étaient parfaitement heureuses, ces bonnes petites sœurs, et leur maman les aimait tendrement ; toutes les personnes qui les connaissaient les aimaient aussi.';

describe('decouperDictee', () => {
  it('suit la ponctuation et coupe à 5 mots au plus', () => {
    const g = decouperDictee(TEXTE);
    expect(g[0]).toBe('Elles étaient parfaitement heureuses,');
    expect(g.every((x) => x.split(' ').length <= 5)).toBe(true);
  });
  it('ne perd ni n’ajoute aucun mot', () => {
    expect(decouperDictee(TEXTE).join(' ').replace(/ /g, ' ')).toBe(TEXTE);
  });
  it('ne finit pas un groupe sur un mot outil', () => {
    const g = decouperDictee('Dans mon jardin il y a un vieux noyer presque mort qui fait peur aux petits oiseaux.');
    expect(g[0]).toBe('Dans mon jardin');
    expect(g.every((x) => !/ (il|un|aux|le)$/.test(x))).toBe(true);
  });
  it('garde les guillemets avec leurs mots', () => {
    expect(decouperDictee('Il dit : « Bonjour ! »')).toEqual(['Il dit :', '« Bonjour ! »']);
  });
});

describe('groupeLu', () => {
  it('nomme la ponctuation après les mots', () => {
    expect(groupeLu('ces bonnes petites sœurs,')).toBe('ces bonnes petites sœurs, virgule.');
    expect(groupeLu('les aimaient aussi.')).toBe('les aimaient aussi, point.');
    expect(groupeLu('mon enfant')).toBe('mon enfant.');
  });
  it('dit l’ouverture et la fermeture des guillemets', () => {
    expect(groupeLu('« Bonjour ! »')).toBe('ouvrez les guillemets, Bonjour, point d’exclamation, fermez les guillemets.');
  });
});

describe('nomsPropres', () => {
  it('écrit au tableau les noms propres, pas les débuts de phrase', () => {
    expect(nomsPropres('Ce matin, Tom enfile son bonnet et retrouve Lou dehors. Ensemble, ils jouent avec Tom.')).toEqual(['Tom', 'Lou']);
    expect(nomsPropres('Il dit : « Bonjour, Marie ! » Puis il part.')).toEqual(['Marie']);
    expect(nomsPropres('M. Seguin avait une chèvre. Le chat dort.')).toEqual(['M. Seguin']);
    expect(nomsPropres('Le chat dort.')).toEqual([]);
  });
});

