// Mise en forme du bilan du dimanche (texte et HTML), sans dépendance : testée par vitest,
// importée par la fonction Deno `index.ts`.
// Le courriel reste sobre : des chiffres, pas de réponses ni d'erreurs détaillées (elles sont dans l'app).

export interface BilanEnfant {
  prenom: string;
  classe: string;
  serie: number;
  jours_actifs: number;
  questions: number;
  reussies: number;
  minutes: number;
  notions: number;
  maitrisees: number;
  a_revoir: number;
  controle: { date: string; notions: number } | null;
}

const echapper = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const pluriel = (n: number, mot: string, motPluriel = `${mot}s`) => `${n} ${n > 1 ? motPluriel : mot}`;

function dateLisible(iso: string): string {
  const [a, m, j] = iso.split('-').map(Number) as [number, number, number];
  return new Date(Date.UTC(a, m - 1, j)).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
}

/** Lignes du bilan d'un enfant, en phrases courtes. */
export function lignesEnfant(b: BilanEnfant): string[] {
  if (b.questions === 0) {
    const l = ['Pas de séance cette semaine.'];
    if (b.a_revoir > 0) l.push(`${pluriel(b.a_revoir, 'notion attend', 'notions attendent')} une révision.`);
    if (b.controle) l.push(`Contrôle prévu le ${dateLisible(b.controle.date)} (${pluriel(b.controle.notions, 'notion')}).`);
    return l;
  }
  const taux = Math.round((b.reussies / b.questions) * 100);
  const l = [
    `${pluriel(b.jours_actifs, 'jour')} de travail, ${b.minutes} min en tout.`,
    `${pluriel(b.questions, 'question')}, ${taux} % de réussite.`,
    `${pluriel(b.notions, 'notion travaillée', 'notions travaillées')}, dont ${b.maitrisees} ${b.maitrisees > 1 ? 'maitrisées' : 'maitrisée'}.`,
  ];
  if (b.a_revoir > 0) l.push(`${pluriel(b.a_revoir, 'notion à revoir', 'notions à revoir')} dès maintenant.`);
  if (b.serie > 1) l.push(`Série en cours : ${b.serie} jours.`);
  if (b.controle) l.push(`Contrôle prévu le ${dateLisible(b.controle.date)} (${pluriel(b.controle.notions, 'notion')}).`);
  return l;
}

export function composerBilan(enfants: BilanEnfant[], urlApp: string): { sujet: string; texte: string; html: string } {
  const prenoms = enfants.map((e) => e.prenom);
  const sujet = enfants.length === 0
    ? 'Hopla : le bilan de la semaine'
    : `Hopla : la semaine de ${prenoms.length > 1 ? `${prenoms.slice(0, -1).join(', ')} et ${prenoms.at(-1)}` : prenoms[0]}`;
  const lien = `${urlApp.replace(/\/$/, '')}/parent`;
  const texte = [
    'Bonjour,',
    '',
    'Voici le bilan des 7 derniers jours sur Hopla.',
    '',
    ...enfants.flatMap((e) => [`${e.prenom} (${e.classe.toUpperCase()})`, ...lignesEnfant(e).map((l) => `- ${l}`), '']),
    `Le détail (notions, erreurs fréquentes, séances) est dans l’espace parent : ${lien}`,
    '',
    'Vous recevez ce message parce que vous l’avez demandé dans l’espace parent de Hopla. Pour ne plus le recevoir, décochez « Bilan du dimanche par e-mail » au même endroit.',
  ].join('\n');

  const blocs = enfants.map((e) => `
    <tr><td style="padding:16px 20px;background:#ffffff;border-radius:16px">
      <p style="margin:0 0 8px;font-size:18px;font-weight:600;color:#1A1D3A">${echapper(e.prenom)} <span style="font-weight:400;color:#5B6178">${echapper(e.classe.toUpperCase())}</span></p>
      ${lignesEnfant(e).map((l) => `<p style="margin:4px 0;font-size:15px;line-height:22px;color:#1A1D3A">${echapper(l)}</p>`).join('')}
    </td></tr>
    <tr><td style="height:12px"></td></tr>`).join('');
  const html = `<!doctype html><html lang="fr"><body style="margin:0;padding:0;background:#F4F5FA;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F5FA"><tr><td align="center" style="padding:24px 12px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
    <tr><td style="padding:0 4px 16px;font-size:22px;font-weight:700;color:#4B3FD1">Hopla</td></tr>
    <tr><td style="padding:0 4px 16px;font-size:15px;color:#1A1D3A">Voici le bilan des 7 derniers jours.</td></tr>
    ${blocs}
    <tr><td style="padding:4px 4px 16px"><a href="${echapper(lien)}" style="display:inline-block;padding:12px 18px;border-radius:12px;background:#4B3FD1;color:#ffffff;font-weight:600;text-decoration:none">Voir le détail dans l’espace parent</a></td></tr>
    <tr><td style="padding:0 4px;font-size:12px;line-height:18px;color:#5B6178">Vous recevez ce message parce que vous l’avez demandé dans l’espace parent de Hopla. Pour ne plus le recevoir, décochez « Bilan du dimanche par e-mail » au même endroit.</td></tr>
  </table></td></tr></table></body></html>`;
  return { sujet, texte, html };
}
