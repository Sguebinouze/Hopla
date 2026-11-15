import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { DOSSIER_CONTENU } from './charger';
import type { Source } from './schemas';

// Calcule l'empreinte des textes officiels archivés dans content/sources/archive/<id>.<ext>.
// Sans --maj : signale les fichiers dont l'empreinte a changé (code de sortie 1).
// Avec --maj : enregistre les empreintes dans sources.json.
const maj = process.argv.includes('--maj');
const fichierSources = join(DOSSIER_CONTENU, 'sources', 'sources.json');
const dossierArchive = join(DOSSIER_CONTENU, 'sources', 'archive');
const sources: Source[] = JSON.parse(readFileSync(fichierSources, 'utf8'));
const archives = existsSync(dossierArchive) ? readdirSync(dossierArchive) : [];

let changements = 0;
for (const source of sources) {
  const nom = archives.find((f) => f.replace(/\.[^.]+$/, '') === source.id);
  if (!nom) {
    console.log(`… ${source.id} : non archivée (déposer le fichier dans content/sources/archive/${source.id}.pdf)`);
    continue;
  }
  const empreinte = createHash('sha256').update(readFileSync(join(dossierArchive, nom))).digest('hex');
  if (source.sha256 === empreinte) {
    console.log(`✓ ${source.id}`);
    continue;
  }
  changements++;
  console.log(`${source.sha256 ? '✖ MODIFIÉE' : '+ nouvelle'} ${source.id} : ${empreinte}`);
  if (maj) {
    source.sha256 = empreinte;
    source.archive = `sources/archive/${nom}`;
  }
}

if (maj && changements) {
  writeFileSync(fichierSources, `${JSON.stringify(sources, null, 2)}\n`);
  console.log(`\n${changements} empreinte(s) enregistrée(s). Relire les compétences concernées avant de publier.`);
} else if (changements) {
  process.exit(1);
}
