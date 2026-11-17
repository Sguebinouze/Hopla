import { describe, expect, it } from 'vitest';
import type { CompetencePack } from './packs';
import { indexer, normaliser, ranger, rechercher } from './recherche';

const notion = (id: string, titre: string, domaine: string, theme: string, attendu = ''): CompetencePack => ({
  id, titre, domaine, theme, attendu, exemple: '', statut: 'verifie', source: { id: 's', page: 1 }, generateurs: [], lecon: null, exercices: [],
});

const N = [
  notion('a', 'Centre, rayon, diamètre', 'Espace et géométrie', 'La géométrie plane', 'Le diamètre mesure deux rayons.'),
  notion('b', 'Fractions simples', 'Nombres', 'Les fractions', 'Comparer des fractions.'),
  notion('c', 'Les animaux de la ferme', 'Le vivant', 'Les êtres vivants'),
  notion('d', 'Cercle et disque', 'Espace et géométrie', 'La géométrie plane'),
  notion('e', 'Cube et pavé', 'Espace et géométrie', 'Les solides'),
  notion('f', 'Prismes', 'Espace et géométrie', 'La géométrie plane'),
];
const index = indexer(N);
const ids = (q: string) => rechercher(index, q).map((c) => c.id);

describe('recherche', () => {
  it('ignore accents, majuscules et pluriels', () => {
    expect(normaliser('Théorème d’Élise')).toBe('theoreme d elise');
    expect(ids('RAYONS')).toEqual(['a']);
    expect(ids('fraction')).toEqual(['b']);
    expect(ids('animal')).toEqual(['c']);
  });
  it('accepte un début de mot', () => {
    expect(ids('diam')).toEqual(['a']);
  });
  it('exige tous les mots', () => {
    expect(ids('cercle disque')).toEqual(['d']);
    expect(ids('cercle fraction')).toEqual([]);
  });
  it('classe le titre avant le thème', () => {
    expect(ids('géométrie')[0]).not.toBe('e');
    expect(ids('solide')).toEqual(['e']);
  });
  it('ne cherche rien sous 2 caractères', () => {
    expect(ids('a')).toEqual([]);
  });
});

describe('rangement', () => {
  it('regroupe chaque thème même dispersé dans le programme', () => {
    const r = ranger(N);
    expect(r.map((d) => d.domaine)).toEqual(['Espace et géométrie', 'Nombres', 'Le vivant']);
    expect(r[0]!.themes.map((t) => [t.theme, t.notions.map((n) => n.id)])).toEqual([
      ['La géométrie plane', ['a', 'd', 'f']],
      ['Les solides', ['e']],
    ]);
  });
});
