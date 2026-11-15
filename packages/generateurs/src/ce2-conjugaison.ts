// CE2, conjugaison : présent, imparfait, futur et passé composé de l'indicatif.
// Être, avoir, verbes du premier groupe et huit verbes du 3e groupe (faire, aller, dire, venir, pouvoir, voir, vouloir, prendre).
// Source : programme de français du cycle 2 (BO n°41 du 31 octobre 2024), p. 22.
import { confusionTemps } from './erreurs';
import { choix, creerGenerateur } from './outils';
import type { Aleatoire } from './outils';

export const PERSONNES_CE2 = ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles'] as const;
type Personne = (typeof PERSONNES_CE2)[number];
const RANG: Record<Personne, number> = { je: 0, tu: 1, il: 2, elle: 2, nous: 3, vous: 4, ils: 5, elles: 5 };

// Premier groupe sans particularité orthographique et conjugué avec avoir.
const VERBES_ER = ['chanter', 'jouer', 'parler', 'danser', 'regarder', 'aimer', 'écouter', 'dessiner', 'sauter',
  'trouver', 'porter', 'habiter', 'aider', 'garder', 'raconter', 'chercher', 'demander', 'gagner'];

type Temps = 'présent' | 'imparfait' | 'futur';
type Tables = Record<Temps, string[]>;

const IRREGULIERS: Record<string, Tables> = {
  être: {
    présent: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
    imparfait: ['étais', 'étais', 'était', 'étions', 'étiez', 'étaient'],
    futur: ['serai', 'seras', 'sera', 'serons', 'serez', 'seront'],
  },
  avoir: {
    présent: ['ai', 'as', 'a', 'avons', 'avez', 'ont'],
    imparfait: ['avais', 'avais', 'avait', 'avions', 'aviez', 'avaient'],
    futur: ['aurai', 'auras', 'aura', 'aurons', 'aurez', 'auront'],
  },
  faire: {
    présent: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'],
    imparfait: ['faisais', 'faisais', 'faisait', 'faisions', 'faisiez', 'faisaient'],
    futur: ['ferai', 'feras', 'fera', 'ferons', 'ferez', 'feront'],
  },
  aller: {
    présent: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'],
    imparfait: ['allais', 'allais', 'allait', 'allions', 'alliez', 'allaient'],
    futur: ['irai', 'iras', 'ira', 'irons', 'irez', 'iront'],
  },
  dire: {
    présent: ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'],
    imparfait: ['disais', 'disais', 'disait', 'disions', 'disiez', 'disaient'],
    futur: ['dirai', 'diras', 'dira', 'dirons', 'direz', 'diront'],
  },
  venir: {
    présent: ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'],
    imparfait: ['venais', 'venais', 'venait', 'venions', 'veniez', 'venaient'],
    futur: ['viendrai', 'viendras', 'viendra', 'viendrons', 'viendrez', 'viendront'],
  },
  pouvoir: {
    présent: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'],
    imparfait: ['pouvais', 'pouvais', 'pouvait', 'pouvions', 'pouviez', 'pouvaient'],
    futur: ['pourrai', 'pourras', 'pourra', 'pourrons', 'pourrez', 'pourront'],
  },
  voir: {
    présent: ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'],
    imparfait: ['voyais', 'voyais', 'voyait', 'voyions', 'voyiez', 'voyaient'],
    futur: ['verrai', 'verras', 'verra', 'verrons', 'verrez', 'verront'],
  },
  vouloir: {
    présent: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'],
    imparfait: ['voulais', 'voulais', 'voulait', 'voulions', 'vouliez', 'voulaient'],
    futur: ['voudrai', 'voudras', 'voudra', 'voudrons', 'voudrez', 'voudront'],
  },
  prendre: {
    présent: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'],
    imparfait: ['prenais', 'prenais', 'prenait', 'prenions', 'preniez', 'prenaient'],
    futur: ['prendrai', 'prendras', 'prendra', 'prendrons', 'prendrez', 'prendront'],
  },
};
const TROISIEME_A = ['faire', 'aller', 'dire', 'venir'];
const TROISIEME_B = ['pouvoir', 'voir', 'vouloir', 'prendre'];

/** Les six formes d'un verbe à un temps simple. */
export function formes(verbe: string, temps: Temps): string[] {
  const irr = IRREGULIERS[verbe];
  if (irr) return irr[temps];
  const radical = verbe.slice(0, -2);
  if (temps === 'présent') return ['e', 'es', 'e', 'ons', 'ez', 'ent'].map((f) => radical + f);
  if (temps === 'imparfait') return ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'].map((f) => radical + f);
  return ['ai', 'as', 'a', 'ons', 'ez', 'ont'].map((f) => verbe + f);
}

const voyelle = (s: string) => /^[aeéèêiouh]/i.test(s);
/** « je » devient « j’ » devant une voyelle. */
const devant = (p: Personne, forme: string) => (p === 'je' && voyelle(forme) ? 'j’' : `${p} `);

function qcmTemps(a: Aleatoire, verbe: string, temps: Temps, p: Personne, autreTemps: Temps) {
  const liste = formes(verbe, temps);
  const forme = liste[RANG[p]]!;
  const pieges: [string, string?][] = [...a.melanger(liste.filter((f) => f !== forme)).slice(0, 2).map((f): [string, string] => [f, 'accord-personne']), [formes(verbe, autreTemps)[RANG[p]]!, confusionTemps(temps, autreTemps)]];
  const au = temps === 'imparfait' ? 'à l’imparfait' : `au ${temps}`;
  return {
    gabarit: 'qcm' as const,
    consigne: `Complète avec le verbe ${verbe} ${au} : ${devant(p, forme).trim()} …`,
    ...choix(a, forme, pieges, () => a.choisir(liste)),
    reponse: forme,
    indice: IRREGULIERS[verbe] ? `Récite le verbe ${verbe} ${au}.` : 'Regarde le sujet. Il commande la terminaison.',
    explication: `${au.charAt(0).toUpperCase()}${au.slice(1)}, avec « ${p} », on écrit : ${devant(p, forme)}${forme}.`,
  };
}

// ─────────── Présent

export const presentCe2 = creerGenerateur({
  id: 'present-ce2',
  competence: 'FR-C2-CE2-CONJ-01',
  cycle: 2,
  description: 'Conjuguer au présent être, avoir, les verbes en -er et faire, aller, dire, venir, pouvoir, voir, vouloir, prendre.',
  generer(a, d) {
    const verbe = d === 1 ? a.choisir([...VERBES_ER, 'être', 'avoir']) : a.choisir(d === 2 ? TROISIEME_A : TROISIEME_B);
    return qcmTemps(a, verbe, 'présent', a.choisir(PERSONNES_CE2), 'imparfait');
  },
});

// ─────────── Imparfait et futur

export const imparfaitFuturCe2 = creerGenerateur({
  id: 'imparfait-futur-ce2',
  competence: 'FR-C2-CE2-CONJ-02',
  cycle: 2,
  description: 'Conjuguer à l’imparfait et au futur être, avoir, les verbes en -er et les verbes du 3e groupe du programme.',
  generer(a, d) {
    const temps: Temps = d === 1 ? 'futur' : d === 2 ? 'imparfait' : a.choisir(['futur', 'imparfait'] as const);
    const verbe = d === 3 ? a.choisir([...TROISIEME_A, ...TROISIEME_B]) : a.choisir([...VERBES_ER, 'être', 'avoir']);
    return qcmTemps(a, verbe, temps, a.choisir(PERSONNES_CE2), temps === 'futur' ? 'imparfait' : 'futur');
  },
});

// ─────────── Passé composé

const PARTICIPES: Record<string, string> = {
  être: 'été', avoir: 'eu', faire: 'fait', dire: 'dit', pouvoir: 'pu', voir: 'vu', vouloir: 'voulu', prendre: 'pris',
};
// Verbes conjugués avec être au passé composé : le participe s'accorde avec le sujet.
const AVEC_ETRE: Record<string, string> = { aller: 'allé', venir: 'venu', arriver: 'arrivé', tomber: 'tombé', rentrer: 'rentré' };
const AVOIR_PRESENT = ['ai', 'as', 'a', 'avons', 'avez', 'ont'];
const ETRE_PRESENT = ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'];

export const passeComposeCe2 = creerGenerateur({
  id: 'passe-compose-ce2',
  competence: 'FR-C2-CE2-CONJ-03',
  cycle: 2,
  description: 'Conjuguer au passé composé avec avoir ou être ; accorder le participe passé avec être.',
  generer(a, d) {
    if (d === 3) {
      const verbe = a.choisir(Object.keys(AVEC_ETRE));
      const p = a.choisir(['il', 'elle', 'ils', 'elles'] as const);
      const base = AVEC_ETRE[verbe]!;
      const accord = (p === 'elle' || p === 'elles' ? 'e' : '') + (p === 'ils' || p === 'elles' ? 's' : '');
      const aux = ETRE_PRESENT[RANG[p]]!;
      const forme = `${aux} ${base}${accord}`;
      const autres = ['', 'e', 's', 'es'].filter((x) => x !== accord).map((x) => `${aux} ${base}${x}`);
      return {
        gabarit: 'qcm',
        consigne: `Complète au passé composé avec le verbe ${verbe} : ${p} …`,
        ...choix(a, forme, [...a.melanger(autres).slice(0, 2).map((x): [string, string] => [x, 'accord-etre']), [`${AVOIR_PRESENT[RANG[p]]} ${base}`, 'auxiliaire-faux']], () => `${aux} ${base}`),
        reponse: forme,
        indice: `Le verbe ${verbe} se conjugue avec être. Regarde le sujet.`,
        explication: `Avec être, le participe s’accorde avec le sujet « ${p} ». On écrit : ${p} ${forme}.`,
      };
    }
    const verbe = d === 1 ? a.choisir(VERBES_ER) : a.choisir(Object.keys(PARTICIPES));
    const participe = PARTICIPES[verbe] ?? `${verbe.slice(0, -2)}é`;
    const p = a.choisir(PERSONNES_CE2);
    const aux = AVOIR_PRESENT[RANG[p]]!;
    const forme = `${aux} ${participe}`;
    const pieges: [string, string][] = [[`${aux} ${verbe}`, 'infinitif-au-lieu-participe'], [`${ETRE_PRESENT[RANG[p]]} ${participe}`, 'auxiliaire-faux'], [`${a.choisir(AVOIR_PRESENT.filter((x) => x !== aux))} ${participe}`, 'accord-personne']];
    if (d === 1) pieges.push([`${aux} ${participe}s`, 'accord-pp-abusif']);
    return {
      gabarit: 'qcm',
      consigne: `Complète au passé composé avec le verbe ${verbe} : ${devant(p, aux).trim()} …`,
      ...choix(a, forme, pieges, () => `${a.choisir(AVOIR_PRESENT)} ${participe}`),
      reponse: forme,
      indice: 'Le passé composé : l’auxiliaire avoir, puis le participe passé.',
      explication: `Avoir au présent, puis le participe passé « ${participe} ». On écrit : ${devant(p, aux)}${forme}.`,
    };
  },
});
