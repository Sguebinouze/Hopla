import { describe, expect, it } from 'vitest';
import { compterMots, verifierTexte } from './index';

const regles = (texte: string, cycle: 2 | 3 | 4) => verifierTexte(texte, cycle).map((p) => p.regle);

describe('verifierTexte', () => {
  it('accepte une explication de cycle 2 conforme', () => {
    expect(verifierTexte('La tablette a 8 carrés en tout. 8 est le dénominateur.', 2)).toEqual([]);
  });

  it('refuse le tiret cadratin et le vocabulaire interdit', () => {
    expect(regles('Bien sûr — voici un cours fascinant.', 3)).toEqual(
      expect.arrayContaining(['tiret-cadratin', 'vocabulaire']),
    );
  });

  it('bloque une phrase trop longue en cycle 2 et alerte seulement en cycle 4', () => {
    const longue = 'Pour trouver la bonne réponse il faut compter les carrés coloriés puis tous les carrés de la tablette.';
    expect(verifierTexte(longue, 2)[0]?.niveau).toBe('erreur');
    expect(verifierTexte(longue, 4)).toEqual([]);
  });

  it('signale un participe présent en tête de phrase', () => {
    expect(regles('En observant ce schéma, on remarque un angle droit.', 3)).toContain('participe-present');
    expect(regles('Observe ce schéma : il y a un angle droit.', 3)).toEqual([]);
    expect(regles('Avant de calculer, lis la consigne.', 3)).toEqual([]);
  });

  it('alerte sans bloquer sur les notions disciplinaires ambiguës', () => {
    const p = verifierTexte('Décris le paysage de la photo.', 3);
    expect(p).toHaveLength(1);
    expect(p[0]?.niveau).toBe('alerte');
  });

  it('compte une fraction ou un relatif comme un mot', () => {
    expect(compterMots('La réponse est 3/8.')).toBe(4);
    expect(compterMots('On arrive à −3.')).toBe(4);
  });
});

describe('tics relevés par Humanizer', () => {
  it('alerte sur l’importance gonflée', () => {
    const p = verifierTexte('L’opinion publique joue un rôle capital.', 3);
    expect(p.some((x) => x.niveau === 'alerte' && x.message.includes('joue un rôle capital'))).toBe(true);
  });
  it('bloque une phrase qui parle de la leçon', () => {
    expect(verifierTexte('Dans cette leçon, tu apprends les fractions.', 3).some((x) => x.niveau === 'erreur')).toBe(true);
    expect(verifierTexte('Nous allons voir les fractions.', 3).some((x) => x.niveau === 'erreur')).toBe(true);
  });
  it('signale « complexe », sauf dans le terme de grammaire « phrase complexe »', () => {
    expect(verifierTexte('Une phrase complexe a plusieurs propositions.', 3)).toEqual([]);
    expect(verifierTexte('Les phrases complexes sont longues.', 3)).toEqual([]);
    expect(verifierTexte('Ce calcul est complexe.', 3).some((x) => x.niveau === 'alerte')).toBe(true);
  });
  it('laisse passer une traduction ordinaire', () => {
    expect(verifierTexte('I hope you can come : j’espère que tu pourras venir.', 4)).toEqual([]);
  });
});
