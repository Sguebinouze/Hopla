import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { mots, notionsProches, type NotionTexte } from './photoLecon';

// Notions réelles du pack de CE2 (extraits).
const notions: NotionTexte[] = [
  { id: 'FR-C2-CE2-CONJ-02', titre: 'L’imparfait et le futur', matiere: 'francais', domaine: 'Grammaire et orthographe',
    attendu: 'Conjuguer à l’imparfait et au futur de l’indicatif être, avoir, les verbes du premier groupe et les verbes du 3e groupe du programme.',
    lecon: { regle: 'L’**imparfait** parle du passé : -ais, -ait, -ions, -aient. Le **futur** parle de demain : -rai, -ras, -ra.', exemple: 'Hier, je jouais. Demain, je jouerai.' } },
  { id: 'FR-C2-CE2-CONJ-03', titre: 'Le passé composé', matiere: 'francais', domaine: 'Grammaire et orthographe',
    attendu: 'Conjuguer au passé composé avec avoir ou être, et accorder le participe passé avec être.',
    lecon: { regle: 'Le **passé composé** a deux mots. D’abord **avoir** ou **être**, puis le participe passé.', exemple: 'Nous avons joué. Elle est allée au parc.' } },
  { id: 'MA-C2-CE2-FRAC-01', titre: 'Lire une fraction', matiere: 'mathematiques', theme: 'Les fractions',
    attendu: 'Lire, écrire et représenter une fraction inférieure ou égale à 1 dont le dénominateur ne dépasse pas 12.',
    lecon: { regle: 'Le **dénominateur** dit en combien de parts égales on coupe. Le **numérateur** dit combien de parts on prend.', exemple: 'Une barre est coupée en 4 parts égales. 3 parts sont coloriées : 3/4.' } },
  { id: 'MA-C2-CE2-FRAC-02', titre: 'Fractions égales', matiere: 'mathematiques', theme: 'Les fractions',
    attendu: 'Établir des égalités de fractions inférieures ou égales à 1.',
    lecon: { regle: 'Deux fractions sont **égales** si elles représentent la même part. On multiplie le haut et le bas par le même nombre.', exemple: 'Des parts deux fois plus petites, deux fois plus de parts. Donc 6/8 = 3/4.' } },
  { id: 'QM-C2-CE2-OBJ-01', titre: 'Conducteurs et isolants', matiere: 'questionner-le-monde', theme: 'Les objets et l’électricité',
    attendu: 'Trier les matériaux conducteurs et isolants, connaitre le rôle de l’interrupteur et les règles de sécurité.',
    lecon: { regle: 'Les **conducteurs** laissent passer le courant, comme le métal. Les **isolants** l’arrêtent.', exemple: 'Je mets une cuillère en métal dans le circuit. La lampe brille.' } },
];

const premier = (texte: string) => notionsProches(texte, notions)[0]?.id;

describe('mots d’un texte', () => {
  it('minuscules, sans accents ni mots vides, pluriels simples ramenés au singulier', () => {
    expect(mots('Les FRACTIONS égales, avec le numérateur !')).toEqual(['fraction', 'egale', 'numerateur']);
  });
});

describe('notions proches du texte d’une photo', () => {
  it('reconnait des leçons de cahier, même avec des fautes de lecture', () => {
    expect(premier('Conjugaison\nLe passé composé\nJ’ai mangé, tu as mangé, il a mangé\nIl est parti, elle est partie')).toBe('FR-C2-CE2-CONJ-03');
    expect(premier('LES FRACTIONS\n3/4 : le numérateur est 3, le dénominateur est 4.\nOn coupe en parts égales')).toMatch(/^MA-C2-CE2-FRAC-0[12]$/);
    expect(premier('Sciences : le courant électrique\nLe métal est un conducteur. Le plastique et le bois sont des isolants.')).toBe('QM-C2-CE2-OBJ-01');
    expect(premier('L’imparfait de l’indicatif\nje chantais, tu chantais, il chantait, nous chantions')).toBe('FR-C2-CE2-CONJ-02');
  });

  it('texte sans rapport ou vide : aucune proposition', () => {
    expect(notionsProches('Liste de courses : pommes, farine, lait', notions)).toEqual([]);
    expect(notionsProches('', notions)).toEqual([]);
  });

  it('au plus trois propositions, de la plus probable à la moins probable', () => {
    const p = notionsProches('fractions égales numérateur dénominateur parts', notions);
    expect(p.length).toBeLessThanOrEqual(3);
    expect(p[0]!.id).toBe('MA-C2-CE2-FRAC-02');
    for (let i = 1; i < p.length; i++) expect(p[i - 1]!.score).toBeGreaterThanOrEqual(p[i]!.score);
  });

  // Sur le vrai pack de CE2, s'il a été construit (pnpm content:packs).
  const pack = join(import.meta.dirname, '..', '..', 'public', 'packs', '2026-2027', 'ce2.json');
  it.skipIf(!existsSync(pack))('sur le pack complet de CE2, les mêmes leçons sont reconnues', () => {
    const p = JSON.parse(readFileSync(pack, 'utf8')) as { matieres: { matiere: string; competences: NotionTexte[] }[] };
    const tout = p.matieres.flatMap((m) => m.competences.map((c) => ({ ...c, matiere: m.matiere })));
    expect(notionsProches('Le passé composé\nJ’ai mangé, il est parti', tout)[0]?.id).toBe('FR-C2-CE2-CONJ-03');
    expect(notionsProches('Le métal est un conducteur. Le plastique est un isolant.', tout)[0]?.id).toBe('QM-C2-CE2-OBJ-01');
  });
});
