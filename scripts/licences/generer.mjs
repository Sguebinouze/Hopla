// Mentions de licence du code tiers embarqué dans l'appli (dépendances de production de @hopla/pwa),
// écrites dans apps/pwa/public/licences.txt et affichées depuis la page Crédits.
// À relancer après un changement de dépendance : pnpm licences
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const racine = new URL('../..', import.meta.url).pathname;
const liste = JSON.parse(execFileSync('pnpm', ['--filter', '@hopla/pwa', 'licenses', 'list', '--prod', '--json'], { cwd: racine, encoding: 'utf8' }));

const paquets = Object.values(liste).flat()
  .filter((p) => !p.name.startsWith('@hopla/'))
  .sort((a, b) => a.name.localeCompare(b.name));

const texteLicence = (dossier) => {
  const fichier = readdirSync(dossier).find((f) => /^(licen[cs]e|copying|ofl)(\.|$)/i.test(f));
  return fichier ? readFileSync(join(dossier, fichier), 'utf8').trim() : null;
};

// Paquet MIT sans fichier de licence : le texte standard, avec l'auteur déclaré dans son package.json.
const MIT = `Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;
const auteur = (dossier) => {
  const a = JSON.parse(readFileSync(join(dossier, 'package.json'), 'utf8')).author;
  return typeof a === 'string' ? a : a?.name ?? 'ses auteurs';
};

const blocs = paquets.map((p) => {
  const texte = texteLicence(p.paths[0]) ?? (p.license === 'MIT' ? `Copyright (c) ${auteur(p.paths[0])}\n\n${MIT}` : null);
  return [`${p.name} ${p.versions.join(', ')}`, `Licence : ${p.license}`, p.homepage ? `Site : ${p.homepage}` : null, '', texte ?? `Texte de la licence ${p.license} : https://spdx.org/licenses/${p.license}.html`]
    .filter((l) => l !== null).join('\n');
});

writeFileSync(join(racine, 'apps/pwa/public/licences.txt'),
  `Hopla. Licences du code tiers embarqué dans l'appli\n\n${blocs.join(`\n\n${'='.repeat(72)}\n\n`)}\n`);
console.log(`${paquets.length} paquets → apps/pwa/public/licences.txt`);
