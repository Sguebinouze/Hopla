// Copie les fichiers de lecture de texte (Tesseract) dans public/ocr, pour les servir depuis l'app :
// aucune requête vers un service tiers, la photo et son texte restent sur l'appareil.
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ici = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const sortie = join(ici, '..', 'public', 'ocr');
mkdirSync(sortie, { recursive: true });

const tesseract = dirname(require.resolve('tesseract.js/package.json'));
const coeur = dirname(createRequire(join(tesseract, 'package.json')).resolve('tesseract.js-core/package.json'));
const fra = dirname(require.resolve('@tesseract.js-data/fra/package.json'));

const fichiers = [
  [join(tesseract, 'dist', 'worker.min.js'), 'worker.min.js'],
  ...['tesseract-core-lstm.wasm.js', 'tesseract-core-simd-lstm.wasm.js', 'tesseract-core-relaxedsimd-lstm.wasm.js']
    .map((f) => [join(coeur, f), f]),
  [join(fra, '4.0.0_best_int', 'fra.traineddata.gz'), 'fra.traineddata.gz'],
];
for (const [de, vers] of fichiers) {
  if (!existsSync(de)) throw new Error(`Fichier OCR introuvable : ${de}`);
  copyFileSync(de, join(sortie, vers));
}
console.log(`OCR : ${fichiers.length} fichiers copiés dans public/ocr`);
