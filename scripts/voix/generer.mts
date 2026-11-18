// Fichiers audio d'Octave : chaque texte lu par l'appli, enregistré une fois avec la voix Algenib
// (Google Chirp 3 HD), puis servi depuis le stockage R2. Seuls les textes sans fichier sont générés.
//
// Entrées (variables d'environnement) :
//   GOOGLE_TTS_CLE   clé de l'API Text-to-Speech
//   EXISTANTS        fichier listant les objets déjà présents dans le bucket (sortie de `aws s3 ls --recursive`)
//   MAX_CARACTERES   plafond de caractères envoyés à Google pour cette exécution (défaut : 1 200 000)
// Sortie : dossier voix-a-envoyer/, à copier tel quel dans le bucket.
//
// Lancement : packages/content/node_modules/.bin/tsx scripts/voix/generer.mts (après pnpm content:packs)

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { pourLaVoix } from '../../packages/redaction/src/index.ts';
import type { Pack } from '../../apps/pwa/src/lib/packs.ts';
import { cheminAudio, textesLus, VOIX_OCTAVE, type TexteLu } from '../../apps/pwa/src/lib/textesLus.ts';

const CLE = process.env.GOOGLE_TTS_CLE;
const MAX = Number(process.env.MAX_CARACTERES ?? 1_200_000);
const SORTIE = 'voix-a-envoyer';
const NOM_VOIX = VOIX_OCTAVE.charAt(0).toUpperCase() + VOIX_OCTAVE.slice(1);
const SIMULATION = process.argv.includes('--simulation');

// Tous les packs publiés, toutes années scolaires confondues.
const racine = 'apps/pwa/public/packs';
const textes = new Map<string, TexteLu>();
for (const annee of readdirSync(racine, { withFileTypes: true }).filter((d) => d.isDirectory())) {
  for (const f of readdirSync(join(racine, annee.name)).filter((n) => n.endsWith('.json'))) {
    const pack = JSON.parse(readFileSync(join(racine, annee.name, f), 'utf8')) as Pack;
    for (const t of textesLus(pack)) textes.set(cheminAudio(t.langue, t.texte), t);
  }
}

const existants = new Set<string>();
if (process.env.EXISTANTS && existsSync(process.env.EXISTANTS)) {
  for (const ligne of readFileSync(process.env.EXISTANTS, 'utf8').split('\n')) {
    const chemin = ligne.trim().split(/\s+/).pop();
    if (chemin?.endsWith('.mp3')) existants.add(chemin);
  }
}

const aFaire = [...textes].filter(([chemin]) => !existants.has(chemin));
const parLangue = (l: [string, TexteLu][]) => Object.entries(l.reduce<Record<string, number>>((a, [, t]) => ({ ...a, [t.langue]: (a[t.langue] ?? 0) + 1 }), {}));
const aDire = (t: TexteLu) => (t.langue === 'fr-FR' ? pourLaVoix(t.texte) : t.texte);
console.log(`${textes.size} textes lus dans l'appli, ${existants.size} fichiers déjà en ligne, ${aFaire.length} à générer.`);
console.log(`Par langue : ${parLangue(aFaire).map(([l, n]) => `${l} ${n}`).join(', ') || 'rien'}`);

let budget = MAX;
const lot = aFaire.filter(([, t]) => {
  const n = aDire(t).length;
  if (n > budget) return false;
  budget -= n;
  return true;
});
const caracteres = MAX - budget;
console.log(`Ce passage : ${lot.length} fichiers, ${caracteres} caractères${lot.length < aFaire.length ? ` (plafond ${MAX} atteint, la suite au prochain passage)` : ''}.`);
if (SIMULATION) process.exit(0);
if (!CLE) throw new Error('GOOGLE_TTS_CLE manquant');

async function synthetiser(t: TexteLu, chemin: string) {
  for (let essai = 1; ; essai++) {
    const r = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${CLE}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        input: { text: aDire(t) },
        voice: { languageCode: t.langue, name: `${t.langue}-Chirp3-HD-${NOM_VOIX}` },
        audioConfig: { audioEncoding: 'MP3' },
      }),
    });
    if (r.ok) {
      const { audioContent } = (await r.json()) as { audioContent: string };
      const fichier = join(SORTIE, chemin);
      await mkdir(dirname(fichier), { recursive: true });
      await writeFile(fichier, Buffer.from(audioContent, 'base64'));
      return;
    }
    // Quota par minute dépassé ou erreur passagère : on attend et on réessaie.
    if ((r.status === 429 || r.status >= 500) && essai < 8) {
      await new Promise((ok) => setTimeout(ok, 5000 * essai));
      continue;
    }
    throw new Error(`${chemin} : ${r.status} ${await r.text()}`);
  }
}

// Quelques requêtes en parallèle, sous le quota de l'API.
let suivant = 0;
let faits = 0;
const echecs: string[] = [];
async function ouvrier() {
  while (suivant < lot.length) {
    const [chemin, t] = lot[suivant++]!;
    try {
      await synthetiser(t, chemin);
      if (++faits % 500 === 0) console.log(`${faits} / ${lot.length}`);
    } catch (e) {
      echecs.push(String(e));
    }
  }
}
await Promise.all(Array.from({ length: 6 }, ouvrier));
console.log(`${faits} fichiers générés, ${echecs.length} échecs.`);
for (const e of echecs.slice(0, 10)) console.log(e);
if (echecs.length > lot.length / 10) process.exit(1);
