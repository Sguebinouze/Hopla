import { cleVoix } from '@hopla/redaction';
import { describe, expect, it } from 'vitest';
import { cheminAudio, textesLus } from './textesLus';

describe('fichiers audio d’Octave', () => {
  it('clé stable, propre à la langue et au texte exact', () => {
    expect(cleVoix('fr-FR', 'Bonjour')).toBe(cleVoix('fr-FR', 'Bonjour'));
    expect(cleVoix('fr-FR', 'Bonjour')).not.toBe(cleVoix('en-GB', 'Bonjour'));
    expect(cleVoix('fr-FR', 'Bonjour')).not.toBe(cleVoix('fr-FR', 'Bonjour.'));
    expect(cleVoix('fr-FR', 'é')).toBe(cleVoix('fr-FR', 'é'));
    expect(cheminAudio('fr-FR', 'Bonjour')).toMatch(/^algenib\/fr-FR\/[0-9a-z]+\.mp3$/);
  });
  it('liste ce qui est lu : banques, écoute dans sa langue, leçons, culture ; jamais les vides', () => {
    const t = textesLus({
      culture: [{ id: 'q', theme: 't', question: 'Capitale ?', options: [], reponse: '', explication: '' }],
      matieres: [{ matiere: 'm', programme: { id: '', intitule: '', reference: '', verifie: true }, competences: [{
        id: 'c', titre: '', domaine: '', theme: '', attendu: '', exemple: '', statut: '', source: { id: '', page: 1 }, generateurs: [],
        lecon: { exemple: 'Ex', regle: 'Règle', piege: null, essai: { consigne: 'Essai ?', options: [], reponse: '', explication: '' } },
        exercices: [{ id: 'e', gabarit: 'qcm', difficulte: 1, consigne: 'Q ?', reponse: 'a', indice: 'I', explication: '', ecoute: { texte: 'Hello', langue: 'en-GB' } }],
      }] }],
    });
    expect(t).toEqual([
      { langue: 'fr-FR', texte: 'Q ?' }, { langue: 'fr-FR', texte: 'I' }, { langue: 'en-GB', texte: 'Hello' },
      { langue: 'fr-FR', texte: 'Ex' }, { langue: 'fr-FR', texte: 'Règle' }, { langue: 'fr-FR', texte: 'Essai ?' },
      { langue: 'fr-FR', texte: 'Capitale ?' },
    ]);
  });
  it('un texte de langue vivante découpé donne un fichier par passage, dans sa langue', () => {
    const t = textesLus({
      voix: { 'Open : ouvrir.': [{ langue: 'en-GB', texte: 'Open' }, { langue: 'fr-FR', texte: 'ouvrir.' }] },
      matieres: [{ matiere: 'langues-vivantes', programme: { id: '', intitule: '', reference: '', verifie: true }, competences: [{
        id: 'c', titre: '', domaine: '', theme: '', attendu: '', exemple: '', statut: '', source: { id: '', page: 1 }, generateurs: [],
        lecon: null, exercices: [{ id: 'e', gabarit: 'qcm', difficulte: 1, consigne: 'Choisis.', reponse: 'a', indice: '', explication: 'Open : ouvrir.' }],
      }] }],
    });
    expect(t).toEqual([{ langue: 'fr-FR', texte: 'Choisis.' }, { langue: 'en-GB', texte: 'Open' }, { langue: 'fr-FR', texte: 'ouvrir.' }]);
  });
});
