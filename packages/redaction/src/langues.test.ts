import { describe, expect, it } from 'vitest';
import { decouperLangues, type Lexique } from './langues';

// Fréquences Zipf (langue étudiée, français), comme dans packages/content/voix/lexique.json.
const EN: Lexique = {
  a: [7.4, 7], cat: [4.8, 3.9], un: [4.6, 7.1], chat: [4.6, 4.8], open: [5.5, 4.3], ouvrir: [0, 4.8], que: [3.8, 7.1],
  veut: [1.7, 5.6], dire: [3.7, 6], have: [6.7, 3.8], you: [7, 4.7], got: [5.9, 3.8], pet: [4.5, 3.6], on: [6.9, 6.7],
  dit: [2.9, 6], red: [5.3, 4.3], car: [5.5, 5.7], pas: [3.6, 7], ing: [4, 3.3], le: [4.5, 7.3], verbe: [1.3, 4.1],
  prend: [1.4, 5.3], je: [3.6, 6.9], ne: [4, 6.7], suis: [2.6, 6.1], dénombrable: [0, 2.1], nom: [3.2, 5.6], tom: [4.8, 4.5],
  said: [6, 3.4], he: [6.7, 4], was: [6.8, 3.8], tired: [4.7, 2.3], but: [6.6, 5.3], du: [4.2, 7], jeu: [2.4, 5.5], s: [5.9, 6.5],
};
const DE: Lexique = { der: [7.5, 4.3], zug: [4.9, 2], le: [4.7, 7.3], train: [3.4, 5.2], il: [4.2, 7], dort: [5.8, 4.1] };
const lire = (t: string, l: Lexique, langue: 'en-GB' | 'de-DE' = 'en-GB') =>
  decouperLangues(t, langue, l).map((p) => `${p.langue.slice(0, 2)}:${p.texte}`);

describe('decouperLangues', () => {
  it('le mot étudié en gras, sa traduction en français', () => {
    expect(lire('**A cat** : un chat.', EN)).toEqual(['en:A cat', 'fr:un chat.']);
  });
  it('les guillemets marquent la langue étudiée, sauf du français évident', () => {
    expect(lire('Que veut dire « Have you got a pet? » ?', EN)).toEqual(['fr:Que veut dire', 'en:Have you got a pet?']);
    expect(lire('On dit « a red car », pas « je ne suis pas ».', EN)).toEqual(['fr:On dit', 'en:a red car', 'fr:pas je ne suis pas.']);
  });
  it('glose en début de phrase, sans marque', () => {
    expect(lire('Open : ouvrir.', EN)).toEqual(['en:Open', 'fr:ouvrir.']);
  });
  it('les mots ambigus suivent le mot qui suit', () => {
    expect(lire('« der Zug » : le train.', DE, 'de-DE')).toEqual(['de:der Zug', 'fr:le train.']);
    expect(lire('Tom said he was tired.', EN)).toEqual(['en:Tom said he was tired.']);
  });
  it('un terme de grammaire français en gras reste en français', () => {
    expect(lire('Un nom **dénombrable** prend -s.', EN)).toEqual(['fr:Un nom dénombrable prend', 'en:-s.']);
  });
  it('un texte tout en français reste entier, mots courants compris', () => {
    expect(decouperLangues('Le but du jeu.', 'en-GB', EN)).toEqual([{ langue: 'fr-FR', texte: 'Le but du jeu.' }]);
    expect(decouperLangues('Il dort.', 'de-DE', DE)).toEqual([{ langue: 'fr-FR', texte: 'Il dort.' }]);
  });
  it('terminaison avec son trait d’union', () => {
    expect(lire('Le verbe prend -ing.', EN)).toEqual(['fr:Le verbe prend', 'en:-ing.']);
  });
});
