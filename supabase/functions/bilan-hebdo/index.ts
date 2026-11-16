// Fonction Supabase (Deno) : envoie le bilan du dimanche aux parents qui l'ont demandé.
// Appelée chaque dimanche par pg_cron (voir docs/architecture.md, « Mettre en service »).
// Secrets : RESEND_API_KEY, BILAN_EXPEDITEUR (adresse d'un domaine vérifié chez Resend),
// BILAN_CLE (partagée avec la tâche planifiée), URL_APP. SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont fournis.
import { createClient } from 'npm:@supabase/supabase-js@2.45.4';
import { type BilanEnfant, composerBilan } from './bilan.ts';

const env = (nom: string) => Deno.env.get(nom) ?? '';

Deno.serve(async (req) => {
  if (!env('BILAN_CLE') || req.headers.get('x-bilan-cle') !== env('BILAN_CLE')) {
    return new Response('Accès refusé.', { status: 401 });
  }
  if (!env('RESEND_API_KEY') || !env('BILAN_EXPEDITEUR') || !env('URL_APP')) {
    return new Response('Envoi non configuré : RESEND_API_KEY, BILAN_EXPEDITEUR et URL_APP sont requis.', { status: 503 });
  }
  const client = createClient(env('SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false } });
  const { data, error } = await client.rpc('bilans_a_envoyer');
  if (error) return new Response(`Lecture impossible : ${error.message}`, { status: 500 });

  let envoyes = 0;
  const echecs: number[] = [];
  for (const { email, bilan } of data as { email: string; bilan: BilanEnfant[] }[]) {
    const { sujet, texte, html } = composerBilan(bilan, env('URL_APP'));
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: env('BILAN_EXPEDITEUR'), to: [email], subject: sujet, text: texte, html }),
    });
    if (r.ok) envoyes++;
    else echecs.push(r.status);
  }
  // Aucune adresse dans la réponse ni dans les journaux.
  return Response.json({ envoyes, echecs: echecs.length, statuts: [...new Set(echecs)] });
});
