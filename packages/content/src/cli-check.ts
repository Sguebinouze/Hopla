import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { motsDuLexique } from '@hopla/redaction';
import { chargerContenu, RACINE_DEPOT } from './charger';
import type { LexiqueVoix } from './packs';
import { verifierContenu } from './verifier';

const { contenu, erreurs: erreursChargement } = chargerContenu();

// Mots de langue vivante absents du lexique de la voix : ils seraient lus avec la voix de leurs voisins.
const LEXIQUE_DE_PREFIXE: Record<string, keyof LexiqueVoix> = { LV: 'en', AL: 'de', ES: 'es' };
const lexique = JSON.parse(readFileSync(join(RACINE_DEPOT, 'packages', 'content', 'voix', 'lexique.json'), 'utf8')) as LexiqueVoix;
const absents = new Set<string>();
const verifierMots = (competence: string, textes: (string | null | undefined)[]) => {
  const l = LEXIQUE_DE_PREFIXE[competence.slice(0, 2)];
  if (!l) return;
  for (const t of textes) for (const m of motsDuLexique(t ?? '')) if (!(m in lexique[l])) absents.add(`${l}:${m}`);
};
for (const b of contenu.banques) for (const e of b.exercices) verifierMots(b.competence, [e.consigne, e.indice, e.explication]);
for (const l of contenu.lecons) verifierMots(l.competence, [l.exemple, l.regle, l.piege, l.essai.consigne]);

const constats = [
  ...erreursChargement.map((e) => ({ niveau: 'erreur' as const, ou: e.fichier, message: e.message })),
  ...verifierContenu(contenu),
  ...(absents.size ? [{
    niveau: 'alerte' as const,
    ou: 'packages/content/voix/lexique.json',
    message: `${absents.size} mot(s) de langue vivante hors lexique (${[...absents].slice(0, 5).join(', ')}…) : lancer python3 scripts/voix/lexique.py.`,
  }] : []),
];

const erreurs = constats.filter((c) => c.niveau === 'erreur');
const alertes = constats.filter((c) => c.niveau === 'alerte');
const nbCompetences = contenu.referentiels.reduce((n, r) => n + r.competences.length, 0);
const nbExercices = contenu.banques.reduce((n, b) => n + b.exercices.length, 0);

console.log(
  `Contenu : ${contenu.sources.length} sources, ${contenu.programmes.length} programmes, ` +
    `${nbCompetences} compétences, ${nbExercices} exercices rédigés.`,
);
if (alertes.length) {
  console.log(`\n${alertes.length} alerte(s) :`);
  for (const a of alertes) console.log(`  ⚠ ${a.ou} : ${a.message}`);
}
if (erreurs.length) {
  console.error(`\n${erreurs.length} erreur(s) bloquante(s) :`);
  for (const e of erreurs) console.error(`  ✖ ${e.ou} : ${e.message}`);
  process.exit(1);
}
console.log('\nAucune erreur bloquante.');
