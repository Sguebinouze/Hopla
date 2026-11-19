import { cleVoix, groupeLu } from '@hopla/redaction';
import type { Pack } from './packs';
import type { Langue } from './voix';

/** Voix d'Octave (Google Chirp 3 HD). En changer regénère tous les fichiers sous un nouveau dossier. */
export const VOIX_OCTAVE = 'algenib';

export interface TexteLu { langue: Langue; texte: string }

/**
 * Tout ce qu'Octave peut lire dans un pack, tel que dire() le lit :
 * consignes, indices et explications des banques, phrases d'écoute, leçons, dictées, quiz de culture.
 * Les questions des générateurs (nombres tirés au hasard) n'y sont pas : elles gardent la voix de l'appareil.
 * Sert au script de génération des fichiers audio et à l'appli pour savoir lesquels existent.
 */
export function textesLus(pack: Pick<Pack, 'matieres' | 'culture' | 'voix'>): TexteLu[] {
  const out: TexteLu[] = [];
  // Un texte de langue vivante découpé se lit passage par passage : un fichier par passage.
  const fr = (texte: string | null | undefined) => {
    if (!texte?.trim()) return;
    const passages = pack.voix?.[texte];
    if (passages) out.push(...passages);
    else out.push({ langue: 'fr-FR', texte });
  };
  for (const m of pack.matieres) {
    for (const c of m.competences) {
      for (const e of c.exercices) {
        fr(e.consigne);
        fr(e.indice);
        fr(e.explication);
        if (e.ecoute?.texte.trim()) out.push({ langue: e.ecoute.langue, texte: e.ecoute.texte });
      }
      if (c.lecon) {
        fr(c.lecon.exemple);
        fr(c.lecon.regle);
        fr(c.lecon.piege);
        fr(c.lecon.essai.consigne);
      }
      // Dictée : le texte entier (première écoute, relecture), puis chaque groupe avec sa ponctuation nommée.
      for (const d of c.dictees ?? []) {
        fr(d.texte);
        for (const g of d.groupes) fr(groupeLu(g));
      }
    }
  }
  for (const q of pack.culture ?? []) fr(q.question);
  return out;
}

/** Chemin du fichier audio d'un texte, relatif à l'adresse du stockage. */
export const cheminAudio = (langue: string, texte: string) => `${VOIX_OCTAVE}/${langue}/${cleVoix(langue, texte)}.mp3`;
