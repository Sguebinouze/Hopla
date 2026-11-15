import { GENERATEURS, type Generateur } from '@hopla/generateurs';
import { verifierTexte } from '@hopla/redaction';
import { anneeDe, couvre, debutAnnee } from './annees';
import type { Contenu } from './charger';
import { CLASSES, CYCLE_DE, PREFIXE, type Classe, type Competence, type Programme } from './schemas';

export interface Constat {
  niveau: 'erreur' | 'alerte';
  ou: string;
  message: string;
}

export interface OptionsVerification {
  /** Années scolaires sur lesquelles le calendrier doit être complet et sans chevauchement. */
  annees: string[];
  /** Matières dont le calendrier doit couvrir toutes les classes de leurs cycles. */
  matieresSuivies: Programme['matiere'][];
  generateurs?: Generateur[];
}

export const OPTIONS_PAR_DEFAUT: OptionsVerification = {
  annees: [2026, 2027, 2028].map(anneeDe),
  matieresSuivies: ['francais', 'mathematiques'],
};

/** Programmes applicables à une classe pour une année et une matière. */
export function programmesApplicables(
  programmes: Programme[], classe: Classe, annee: string, matiere?: Programme['matiere'],
): Programme[] {
  return programmes.filter(
    (p) =>
      (!matiere || p.matiere === matiere) &&
      p.application.some((a) => a.classe === classe && couvre(annee, a.debut, a.fin)),
  );
}

export function verifierContenu(contenu: Contenu, options = OPTIONS_PAR_DEFAUT): Constat[] {
  const constats: Constat[] = [];
  const erreur = (ou: string, message: string) => constats.push({ niveau: 'erreur', ou, message });
  const alerte = (ou: string, message: string) => constats.push({ niveau: 'alerte', ou, message });
  const generateurs = options.generateurs ?? GENERATEURS;

  const unicite = (ids: string[], quoi: string) => {
    const vus = new Set<string>();
    for (const id of ids) {
      if (vus.has(id)) erreur(id, `${quoi} en double`);
      vus.add(id);
    }
  };

  // Sources
  const sources = new Map(contenu.sources.map((s) => [s.id, s]));
  unicite(contenu.sources.map((s) => s.id), 'source');
  for (const s of contenu.sources) {
    if (!s.sha256) alerte(`source ${s.id}`, 'pas encore archivée ni empreinte (pnpm content:hash)');
  }

  // Programmes et calendrier
  const programmes = new Map(contenu.programmes.map((p) => [p.id, p]));
  unicite(contenu.programmes.map((p) => p.id), 'programme');
  for (const p of contenu.programmes) {
    if (!p.id.startsWith(PREFIXE[p.matiere])) erreur(`programme ${p.id}`, `préfixe incohérent avec la matière ${p.matiere}`);
    for (const s of p.sources) if (!sources.has(s)) erreur(`programme ${p.id}`, `source inconnue : ${s}`);
    for (const a of p.application) {
      if (CYCLE_DE[a.classe] !== p.cycle) erreur(`programme ${p.id}`, `la classe ${a.classe} n'est pas du cycle ${p.cycle}`);
      if (a.fin && debutAnnee(a.fin) < debutAnnee(a.debut)) erreur(`programme ${p.id}`, `fin avant début pour ${a.classe}`);
    }
    if (!p.verifie) alerte(`programme ${p.id}`, 'référence non vérifiée sur le texte officiel');
  }
  for (const matiere of options.matieresSuivies) {
    for (const classe of CLASSES) {
      for (const annee of options.annees) {
        const applicables = programmesApplicables(contenu.programmes, classe, annee, matiere);
        if (applicables.length === 0) erreur(`calendrier ${matiere}`, `aucun programme pour ${classe} en ${annee}`);
        if (applicables.length > 1) {
          erreur(`calendrier ${matiere}`, `${applicables.length} programmes pour ${classe} en ${annee} : ${applicables.map((p) => p.id).join(', ')}`);
        }
      }
    }
  }

  // Toutes matières : jamais deux programmes de la même matière pour une classe et une année.
  const matieres = [...new Set(contenu.programmes.map((p) => p.matiere))];
  for (const matiere of matieres.filter((m) => !options.matieresSuivies.includes(m))) {
    for (const classe of CLASSES) {
      for (const annee of options.annees) {
        const applicables = programmesApplicables(contenu.programmes, classe, annee, matiere);
        if (applicables.length > 1) {
          erreur(`calendrier ${matiere}`, `${applicables.length} programmes pour ${classe} en ${annee} : ${applicables.map((p) => p.id).join(', ')}`);
        }
      }
    }
  }

  // Référentiel
  const competences = new Map<string, Competence & { cycle: 2 | 3 | 4; programme: string }>();
  for (const r of contenu.referentiels) {
    const p = programmes.get(r.programme);
    if (!p) {
      erreur(r.fichier, `programme inconnu : ${r.programme}`);
      continue;
    }
    if (!p.application.some((a) => a.classe === r.classe)) erreur(r.fichier, `${p.id} ne s'applique pas à la classe ${r.classe}`);
    const attendu = `${PREFIXE[p.matiere]}-C${p.cycle}-${r.classe.toUpperCase()}-`;
    for (const c of r.competences) {
      if (competences.has(c.id)) erreur(c.id, 'compétence en double');
      if (!c.id.startsWith(attendu)) erreur(c.id, `l'identifiant doit commencer par ${attendu}`);
      if (!sources.has(c.source.id)) erreur(c.id, `source inconnue : ${c.source.id}`);
      if (c.statut === 'a_verifier') alerte(c.id, 'attendu à vérifier sur le texte source');
      if (c.statut === 'verifie' && (c.source.page === null || c.source.extrait === null)) {
        erreur(c.id, 'une compétence vérifiée doit citer la page et l’extrait de sa source');
      }
      for (const pb of verifierTexte(c.exemple, p.cycle)) {
        (pb.niveau === 'erreur' ? erreur : alerte)(`${c.id} (exemple)`, pb.message);
      }
      competences.set(c.id, { ...c, cycle: p.cycle, programme: p.id });
    }
  }
  for (const c of competences.values()) {
    for (const pre of c.prerequis) if (!competences.has(pre)) erreur(c.id, `prérequis inconnu : ${pre}`);
  }

  // Banque d'exercices
  const idsExercices: string[] = [];
  for (const b of contenu.banques) {
    const c = competences.get(b.competence);
    if (!c) {
      erreur(b.fichier, `compétence inconnue : ${b.competence}`);
      continue;
    }
    for (const e of b.exercices) {
      idsExercices.push(e.id);
      if (!e.id.startsWith(`${b.competence}-`)) erreur(e.id, `l'identifiant doit commencer par ${b.competence}-`);
      if (e.gabarit === 'qcm') {
        const opts = e.options ?? [];
        if (opts.length < 2) erreur(e.id, 'un QCM a au moins 2 options');
        if (new Set(opts).size !== opts.length) erreur(e.id, 'options en double');
        if (!opts.includes(e.reponse)) erreur(e.id, 'la réponse ne fait pas partie des options');
      }
      for (const [champ, texte] of [['consigne', e.consigne], ['indice', e.indice], ['explication', e.explication]] as const) {
        for (const pb of verifierTexte(texte, c.cycle)) {
          (pb.niveau === 'erreur' ? erreur : alerte)(`${e.id} (${champ})`, pb.message);
        }
      }
    }
  }
  unicite(idsExercices, 'exercice');

  // Générateurs
  for (const g of generateurs) {
    for (const id of g.competences) {
      const c = competences.get(id);
      if (!c) erreur(`générateur ${g.id}`, `compétence inconnue : ${id}`);
      else if (c.cycle !== g.cycle) erreur(`générateur ${g.id}`, `cycle ${g.cycle} différent de celui de ${id} (${c.cycle})`);
    }
  }

  // Couverture : une compétence sans aucun exercice est un trou.
  // Leçons : une par notion au plus, règles de rédaction du cycle, essai cohérent.
  const vuesLecons = new Set<string>();
  for (const l of contenu.lecons) {
    const c = competences.get(l.competence);
    if (!c) {
      erreur(l.fichier, `compétence inconnue : ${l.competence}`);
      continue;
    }
    if (vuesLecons.has(l.competence)) erreur(l.fichier, `deux leçons pour ${l.competence}`);
    vuesLecons.add(l.competence);
    const opts = l.essai.options;
    if (new Set(opts).size !== opts.length) erreur(l.fichier, 'essai : options en double');
    if (!opts.includes(l.essai.reponse)) erreur(l.fichier, 'essai : la réponse ne fait pas partie des options');
    const textes: [string, string][] = [
      ['exemple', l.exemple], ['regle', l.regle.replace(/\*\*/g, '')], ['piege', l.piege ?? ''],
      ['essai.consigne', l.essai.consigne], ['essai.explication', l.essai.explication],
    ];
    for (const [champ, texte] of textes) {
      if (!texte) continue;
      for (const pb of verifierTexte(texte, c.cycle)) {
        (pb.niveau === 'erreur' ? erreur : alerte)(`leçon ${l.competence} (${champ})`, pb.message);
      }
    }
  }

  // Défis de fluence : compétence de la classe, générateur qui la couvre, identifiants uniques.
  const vusDefis = new Set<string>();
  for (const d of contenu.defis) {
    const ici = `défi ${d.id}`;
    if (vusDefis.has(d.id)) erreur(ici, 'identifiant en double');
    vusDefis.add(d.id);
    if (!competences.has(d.competence)) erreur(ici, `compétence inconnue : ${d.competence}`);
    if (!d.competence.includes(`-${d.classe.toUpperCase()}-`)) erreur(ici, `compétence ${d.competence} hors de la classe ${d.classe}`);
    const g = generateurs.find((x) => x.id === d.generateur);
    if (!g) erreur(ici, `générateur inconnu : ${d.generateur}`);
    else if (!g.competences.includes(d.competence)) erreur(ici, `le générateur ${d.generateur} ne couvre pas ${d.competence}`);
    if (d.source && !contenu.sources.some((s) => s.id === d.source!.id)) erreur(ici, `source inconnue : ${d.source.id}`);
  }

  const couvertes = new Set([...contenu.banques.map((b) => b.competence), ...generateurs.flatMap((g) => g.competences)]);
  for (const id of competences.keys()) if (!couvertes.has(id)) alerte(id, 'aucun exercice ni générateur');

  return constats;
}
