// Essai des voix Google Chirp 3 HD pour Octave : quelques textes de l'appli, lus par chaque voix française.
// Lancé par le workflow « Essai des voix » (clé dans le secret GOOGLE_TTS_CLE). Sortie : essai-voix/*.mp3
import { mkdir, writeFile } from 'node:fs/promises';

const CLE = process.env.GOOGLE_TTS_CLE;
if (!CLE) throw new Error('GOOGLE_TTS_CLE manquant');
const API = 'https://texttospeech.googleapis.com/v1';

const TEXTES = {
  'cp-lecon': 'Il y a quatre points cardinaux. Ce sont le nord, le sud, l’est et l’ouest. Sur une carte, le nord est en haut.',
  '6e-question': 'Dans « Le ciel devient gris. », quelle est la fonction de « gris » ?',
  '6e-explication': 'Pas tout à fait. Regarde : le verbe devenir introduit un attribut du sujet.',
  '6e-lecon': 'La vie sur Terre demande trois conditions. De l’eau liquide, une atmosphère qui protège, une température adaptée. Elles dépendent de la distance au Soleil : ni trop près, ni trop loin.',
  'calcul': 'Combien font 37 + 48 ?',
  'bravo': 'Bravo ! Tu as trouvé 4 bonnes réponses sur 5.',
};
const ANGLAIS = 'I like Saturday because there is no school.';

async function appel(chemin, corps) {
  const r = await fetch(`${API}/${chemin}${chemin.includes('?') ? '&' : '?'}key=${CLE}`, corps ? { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(corps) } : undefined);
  if (!r.ok) throw new Error(`${chemin} : ${r.status} ${await r.text()}`);
  return r.json();
}

async function voixDe(langue) {
  const { voices } = await appel(`voices?languageCode=${langue}`);
  return voices.map((v) => v.name).filter((n) => n.includes('Chirp3-HD')).sort();
}

async function lire(texte, langue, nom, fichier) {
  const { audioContent } = await appel('text:synthesize', {
    input: { text: texte }, voice: { languageCode: langue, name: nom }, audioConfig: { audioEncoding: 'MP3' },
  });
  await writeFile(fichier, Buffer.from(audioContent, 'base64'));
}

await mkdir('essai-voix', { recursive: true });
const fr = await voixDe('fr-FR');
const en = (await voixDe('en-GB')).slice(0, 4);
console.log(`fr-FR : ${fr.length} voix, en-GB : ${en.length} voix`);
let caracteres = 0;
for (const nom of fr) {
  for (const [cle, texte] of Object.entries(TEXTES)) {
    await lire(texte, 'fr-FR', nom, `essai-voix/${nom}--${cle}.mp3`);
    caracteres += texte.length;
  }
}
for (const nom of en) {
  await lire(ANGLAIS, 'en-GB', nom, `essai-voix/${nom}--anglais.mp3`);
  caracteres += ANGLAIS.length;
}
await writeFile('essai-voix/textes.json', JSON.stringify({ textes: TEXTES, anglais: ANGLAIS, fr, en }, null, 2));
console.log(`${caracteres} caractères facturables (gratuit sous 1 million par mois)`);
