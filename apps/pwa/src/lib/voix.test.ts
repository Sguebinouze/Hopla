import { cleVoix, pourLaVoix } from '@hopla/redaction';
import { describe, expect, it } from 'vitest';
import { phrases } from './voix';
import { cheminAudio, textesLus } from './textesLus';

describe('voix d’Octave', () => {
  it('une phrase par énoncé, ponctuation gardée', () => {
    expect(phrases(pourLaVoix('« Lina ouvre la porte du jardin. Elle voit un hérisson. Il mange une limace. » Où est le hérisson ?')))
      .toEqual(['Lina ouvre la porte du jardin.', 'Elle voit un hérisson.', 'Il mange une limace.', 'Où est le hérisson?']);
  });
  it('pause aux deux-points et aux retours à la ligne, pas dans les nombres', () => {
    expect(phrases('Calcule : 3,5 + 1 000\nPuis vérifie')).toEqual(['Calcule :', '3,5 + 1 000', 'Puis vérifie']);
    expect(phrases('…')).toEqual([]);
  });
});

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
});
