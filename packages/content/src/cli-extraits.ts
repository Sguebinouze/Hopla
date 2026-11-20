import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { chargerContenu, DOSSIER_CONTENU } from './charger';

// Vérifie que chaque extrait cité par une compétence figure bien, à la page indiquée,
// dans le texte officiel archivé (content/sources/archive). Nécessite pdftotext (poppler-utils).

const outil = spawnSync('pdftotext', ['-v']);
if (outil.error) {
  console.error('pdftotext introuvable : installer poppler-utils (apt install poppler-utils, brew install poppler).');
  process.exit(1);
}

/** Texte comparable : sans espaces, guillemets, tirets ni apostrophes typographiques. */
const normaliser = (t: string) =>
  t.normalize('NFC').replace(/[’']/g, "'").replace(/[–—−-]/g, '-').replace(/[\s  ]+/g, '').toLowerCase();

const cache = new Map<string, string>();
function textePage(fichier: string, page: number): string {
  const cle = `${fichier}#${page}`;
  if (!cache.has(cle)) {
    const morceaux = [['-layout'], ['-raw'], []].map((mode) =>
      spawnSync('pdftotext', [...mode, '-f', String(page), '-l', String(page), fichier, '-'], { encoding: 'utf8' }).stdout ?? '',
    );
    cache.set(cle, morceaux.map(normaliser).join('|'));
  }
  return cache.get(cle)!;
}

const { contenu } = chargerContenu();
let verifies = 0;
let sansExtrait = 0;
const echecs: string[] = [];
for (const ref of contenu.referentiels) {
  for (const c of ref.competences) {
    const { id, page, extrait } = c.source;
    if (page === null || extrait === null) {
      sansExtrait++;
      continue;
    }
    const source = contenu.sources.find((s) => s.id === id);
    const fichier = source?.archive ? join(DOSSIER_CONTENU, source.archive) : null;
    if (!fichier || !existsSync(fichier)) {
      echecs.push(`${c.id} : source ${id} non archivée`);
      continue;
    }
    if (textePage(fichier, page).includes(normaliser(extrait))) verifies++;
    else echecs.push(`${c.id} : extrait introuvable page ${page} de ${id} : « ${extrait} »`);
  }
}

for (const k of contenu.cours) {
  for (const { id, page, extrait } of k.sources) {
    if (page === null || extrait === null) {
      sansExtrait++;
      continue;
    }
    const source = contenu.sources.find((s) => s.id === id);
    const fichier = source?.archive ? join(DOSSIER_CONTENU, source.archive) : null;
    if (!fichier || !existsSync(fichier)) echecs.push(`cours ${k.competence} : source ${id} non archivée`);
    else if (textePage(fichier, page).includes(normaliser(extrait))) verifies++;
    else echecs.push(`cours ${k.competence} : extrait introuvable page ${page} de ${id} : « ${extrait} »`);
  }
}

for (const d of contenu.defis) {
  if (!d.source) continue;
  const source = contenu.sources.find((s) => s.id === d.source!.id);
  const fichier = source?.archive ? join(DOSSIER_CONTENU, source.archive) : null;
  if (!fichier || !existsSync(fichier)) echecs.push(`défi ${d.id} : source ${d.source.id} non archivée`);
  else if (textePage(fichier, d.source.page).includes(normaliser(d.source.extrait))) verifies++;
  else echecs.push(`défi ${d.id} : extrait introuvable page ${d.source.page} : « ${d.source.extrait} »`);
}

console.log(`Extraits : ${verifies} vérifié(s) sur le texte officiel, ${sansExtrait} compétence(s) sans extrait.`);
if (echecs.length) {
  for (const e of echecs) console.error(`  ✖ ${e}`);
  process.exit(1);
}
