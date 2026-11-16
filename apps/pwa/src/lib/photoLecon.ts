// Photo de leçon : le texte lu sur la photo (sur l'appareil) est rapproché des notions du programme de la classe.
// Rapprochement simple par mots : les mots du titre d'une notion comptent plus que ceux de sa leçon.

export interface NotionTexte {
  id: string;
  titre: string;
  matiere: string;
  domaine?: string;
  theme?: string;
  attendu?: string;
  lecon?: { regle: string; exemple: string } | null;
}

const MOTS_VIDES = new Set((
  'avec dans pour sans sous vers chez entre leur leurs elle elles nous vous ils sont etre avoir fait faire plus moins tres '
  + 'cette ces ceux celle celui comme mais donc alors ainsi aussi tout tous toute toutes quand quoi dont lequel laquelle '
  + 'notre votre leur mon ton son mes tes ses une des les aux est ont sur par que qui quel quelle quels quelles '
  + 'savoir connaitre utiliser identifier reconnaitre comprendre ecrire lire exemple exemples regle lecon exercice exercices '
  + 'eleve eleves classe page date nom prenom jour'
).split(' '));

/** Mots significatifs d'un texte : minuscules, sans accents, 4 lettres ou plus, sans mots vides. */
export function mots(texte: string): string[] {
  return texte
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter((m) => m.length >= 4 && !MOTS_VIDES.has(m) && !/^\d+$/.test(m))
    .map((m) => (m.length > 5 ? m.replace(/(s|x)$/, '') : m));
}

export interface Proposition { id: string; score: number }

/** Les notions les plus proches du texte, de la plus probable à la moins probable (au plus `n`). */
export function notionsProches(texte: string, notions: NotionTexte[], n = 3): Proposition[] {
  const lus = new Set(mots(texte));
  if (lus.size === 0) return [];
  const res: Proposition[] = [];
  for (const c of notions) {
    const poids = new Map<string, number>();
    const ajouter = (t: string | undefined, p: number) => {
      for (const m of mots(t ?? '')) poids.set(m, Math.max(poids.get(m) ?? 0, p));
    };
    ajouter(c.lecon?.exemple, 1);
    ajouter(c.lecon?.regle, 1);
    ajouter(c.attendu, 1);
    ajouter(c.theme, 1);
    ajouter(c.domaine, 1);
    ajouter(c.titre, 3);
    let score = 0;
    let titre = 0;
    for (const [m, p] of poids) {
      if (!lus.has(m)) continue;
      score += p;
      if (p === 3) titre++;
    }
    // Il faut au moins un mot du titre, ou plusieurs mots de la leçon.
    if (titre === 0 && score < 3) continue;
    // Titre lu en entier : c'est très probablement la notion.
    const motsTitre = new Set(mots(c.titre));
    if (motsTitre.size > 0 && titre === motsTitre.size) score += 2 * motsTitre.size;
    res.push({ id: c.id, score: score / Math.log2(2 + poids.size) });
  }
  res.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  // Les propositions bien plus faibles que la première ne feraient que brouiller le choix.
  return res.filter((p) => p.score >= res[0]!.score / 2).slice(0, n);
}

// ─────────────────────────────────────────── Photos gardées sur l'appareil (IndexedDB)

export interface PhotoLecon {
  id: string;
  enfant: string;
  le: string;
  image: Blob;
  notions: string[];
}

const BASE = 'hopla-photos';
const MAGASIN = 'photos';
const MAX_PAR_ENFANT = 30;

function ouvrir(): Promise<IDBDatabase> {
  return new Promise((ok, ko) => {
    const r = indexedDB.open(BASE, 1);
    r.onupgradeneeded = () => {
      const s = r.result.createObjectStore(MAGASIN, { keyPath: 'id' });
      s.createIndex('enfant', 'enfant');
    };
    r.onsuccess = () => ok(r.result);
    r.onerror = () => ko(r.error);
  });
}

async function transaction<T>(mode: IDBTransactionMode, f: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await ouvrir();
  return new Promise((ok, ko) => {
    const r = f(db.transaction(MAGASIN, mode).objectStore(MAGASIN));
    r.onsuccess = () => ok(r.result);
    r.onerror = () => ko(r.error);
  });
}

export async function mesPhotos(enfant: string): Promise<PhotoLecon[]> {
  const toutes = await transaction<PhotoLecon[]>('readonly', (s) => s.index('enfant').getAll(enfant));
  return toutes.sort((a, b) => b.le.localeCompare(a.le));
}

export async function garderPhoto(p: PhotoLecon): Promise<void> {
  await transaction('readwrite', (s) => s.put(p));
  const trop = (await mesPhotos(p.enfant)).slice(MAX_PAR_ENFANT);
  for (const x of trop) await supprimerPhoto(x.id);
}

export async function supprimerPhoto(id: string): Promise<void> {
  await transaction('readwrite', (s) => s.delete(id));
}

/** Réduit la photo (1600 px au plus) : plus légère à garder et plus rapide à lire. */
export async function reduire(fichier: Blob): Promise<Blob> {
  const img = await createImageBitmap(fichier);
  const k = Math.min(1, 1600 / Math.max(img.width, img.height));
  const toile = document.createElement('canvas');
  toile.width = Math.round(img.width * k);
  toile.height = Math.round(img.height * k);
  toile.getContext('2d')!.drawImage(img, 0, 0, toile.width, toile.height);
  return new Promise((ok, ko) => toile.toBlob((b) => (b ? ok(b) : ko(new Error('Photo illisible.'))), 'image/jpeg', 0.85));
}

/** Lit le texte de la photo, sur l'appareil (fichiers servis par l'app, dans /ocr). */
export async function lireTexte(image: Blob, progres: (part: number) => void): Promise<string> {
  const { createWorker, OEM } = await import('tesseract.js');
  const worker = await createWorker('fra', OEM.LSTM_ONLY, {
    workerPath: '/ocr/worker.min.js',
    corePath: '/ocr',
    langPath: '/ocr',
    gzip: true,
    workerBlobURL: false,
    logger: (m: { status: string; progress: number }) => {
      if (m.status === 'recognizing text') progres(m.progress);
    },
  });
  try {
    const { data } = await worker.recognize(image);
    return data.text;
  } finally {
    await worker.terminate();
  }
}
