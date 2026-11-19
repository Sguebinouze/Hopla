import { ERREURS_DICTEE } from '@hopla/generateurs';
import { describe, expect, it } from 'vitest';
import { corriger, erreurDominante, mots } from './dictee';

const types = (ref: string, saisie: string) => corriger(ref, saisie).mots.map((m) => `${m.attendu ?? '∅'}/${m.saisi ?? '∅'}:${m.type}`);

describe('correction de dictée', () => {
  it('découpe mots et ponctuation, apostrophes ramenées à une forme', () => {
    expect(mots('C\'est l’été, voilà !')).toEqual(['C’est', 'l’été', ',', 'voilà', '!']);
    expect(mots('« Oh ! » dit-il...')).toEqual(['«', 'Oh', '!', '»', 'dit-il', '…']);
  });
  it('texte identique : zéro faute', () => {
    const c = corriger('Le chat dort.', 'Le chat dort.');
    expect(c.erreurs).toBe(0);
    expect(c.reussi).toBe(true);
  });
  it('classe accord, accent, majuscule, orthographe', () => {
    expect(types('Les petites filles chantent.', 'les petite filles chante.')).toEqual([
      'Les/les:majuscule', 'petites/petite:accord', 'filles/filles:juste', 'chantent/chante:accord', './.:juste',
    ]);
    expect(types('Il a mangé là.', 'Il a mange la.')).toEqual(['Il/Il:juste', 'a/a:juste', 'mangé/mange:accent', 'là/la:accent', './.:juste']);
    expect(types('un oiseau', 'un oizo')).toEqual(['un/un:juste', 'oiseau/oizo:orthographe']);
    expect(types('Vous chantez.', 'Vous chanter.')).toEqual(['Vous/Vous:juste', 'chantez/chanter:accord', './.:juste']);
  });
  it('aligne malgré un mot oublié ou ajouté', () => {
    expect(types('Le petit chat dort.', 'Le chat dort.')).toEqual(['Le/Le:juste', 'petit/∅:oubli', 'chat/chat:juste', 'dort/dort:juste', './.:juste']);
    expect(types('Le chat dort.', 'Le gros chat dort.')).toEqual(['Le/Le:juste', '∅/gros:ajout', 'chat/chat:juste', 'dort/dort:juste', './.:juste']);
  });
  it('compte la ponctuation oubliée', () => {
    const c = corriger('Il pleut, je reste.', 'Il pleut je reste');
    expect(c.parType.ponctuation).toBe(2);
    expect(c.erreurs).toBe(2);
  });
  it('réussie à une faute pour dix mots', () => {
    const ref = 'Le chat noir dort sur le lit de ma sœur.';
    expect(corriger(ref, 'Le chat noir dort sur le lit de ma soeur.').reussi).toBe(true);
    expect(corriger(ref, 'Le chat noire dort sur le lie de ma soeur.').reussi).toBe(false);
    expect(corriger(ref, '').reussi).toBe(false);
  });
  it('le code d’erreur dominant existe dans le dictionnaire', () => {
    const c = corriger('Les petites filles chantent.', 'Les petite fille chante.');
    const code = erreurDominante(c);
    expect(code).toBe('dictee-accords');
    expect(ERREURS_DICTEE[code!]).toBeDefined();
    expect(erreurDominante(corriger('a', 'a'))).toBeUndefined();
    for (const t of ['il a mange', 'Il mangé.', 'Il a a mangé.', 'Il a magné.']) {
      const e = erreurDominante(corriger('Il a mangé.', t));
      expect(e && ERREURS_DICTEE[e], t).toBeDefined();
    }
  });
});
