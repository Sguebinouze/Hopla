import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { anneeScolaire } from './annees';
import { RACINE_DEPOT, chargerContenu } from './charger';
import { construirePacks, type LexiqueVoix } from './packs';
import { construireRelecture } from './relecture';
import { verifierContenu } from './verifier';

// Usage : pnpm content:packs [--annee 2026-2027] [--brouillons] [--sortie chemin]
const args = process.argv.slice(2);
const valeur = (nom: string) => {
  const i = args.indexOf(nom);
  return i >= 0 ? args[i + 1] : undefined;
};
const annee = valeur('--annee') ?? anneeScolaire();
const brouillons = args.includes('--brouillons') || process.env.HOPLA_BROUILLONS === '1';
const sortie = valeur('--sortie') ?? join(RACINE_DEPOT, 'apps', 'pwa', 'public', 'packs');

const { contenu, erreurs } = chargerContenu();
const bloquants = [...erreurs, ...verifierContenu(contenu).filter((c) => c.niveau === 'erreur')];
if (bloquants.length) {
  console.error('Contenu invalide : lancez pnpm content:check.');
  process.exit(1);
}

// Lexique des langues vivantes (scripts/voix/lexique.py) : découpe les textes par langue pour la voix.
const lexique = JSON.parse(readFileSync(join(RACINE_DEPOT, 'packages', 'content', 'voix', 'lexique.json'), 'utf8')) as LexiqueVoix;
const packs = construirePacks(contenu, annee, { brouillons, lexique });
const dossier = join(sortie, annee);
mkdirSync(dossier, { recursive: true });
for (const pack of packs) writeFileSync(join(dossier, `${pack.classe}.json`), JSON.stringify(pack));
writeFileSync(
  join(sortie, 'index.json'),
  JSON.stringify({ annee, brouillons, classes: packs.map((p) => p.classe), genere_le: new Date().toISOString() }),
);
// Ce qui reste à relire, pour l'espace admin (contenu pédagogique seulement).
writeFileSync(join(sortie, 'relecture.json'), JSON.stringify(construireRelecture(contenu)));
const resume = packs
  .map((p) => `${p.classe}:${p.matieres.reduce((n, m) => n + m.competences.length, 0)}`)
  .join(' ');
console.log(`Packs ${annee}${brouillons ? ' (avec brouillons)' : ''} → ${dossier}\nCompétences par classe : ${resume}`);
