// Vérifie l'isolation des sessions sur une vraie base Postgres (PGlite, en mémoire).
// Le schéma auth et les rôles de Supabase sont simulés au minimum.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { pgcrypto } from '@electric-sql/pglite/contrib/pgcrypto';
import { beforeAll, describe, expect, it } from 'vitest';

const PARENT_A = '11111111-1111-1111-1111-111111111111';
const PARENT_B = '22222222-2222-2222-2222-222222222222';

let db: PGlite;

interface Contexte {
  parent: string;
  enfant?: string | null;
  parentMode?: string | null;
}

/** Exécute une requête comme le ferait PostgREST pour un utilisateur connecté. */
async function en<T = Record<string, unknown>>(ctx: Contexte, sql: string, params: unknown[] = []): Promise<T[]> {
  return db.transaction(async (tx) => {
    const entetes = JSON.stringify({
      ...(ctx.enfant ? { 'x-session-enfant': ctx.enfant } : {}),
      ...(ctx.parentMode ? { 'x-session-parent': ctx.parentMode } : {}),
    });
    await tx.query(`select set_config('request.jwt.claim.sub', $1, true), set_config('request.headers', $2, true)`, [ctx.parent, entetes]);
    await tx.exec('set local role authenticated');
    const r = await tx.query<T>(sql, params);
    return r.rows;
  });
}
const une = async <T>(ctx: Contexte, sql: string, params: unknown[] = []) => (await en<Record<string, T>>(ctx, sql, params))[0];

beforeAll(async () => {
  db = new PGlite({ extensions: { pgcrypto } });
  await db.exec(`
    create role anon nologin;
    create role authenticated nologin;
    create schema auth;
    create schema extensions;
    create table auth.users (id uuid primary key);
    create function auth.uid() returns uuid language sql stable as
      $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
    grant usage on schema public, auth, extensions to anon, authenticated;
    insert into auth.users values ('${PARENT_A}'), ('${PARENT_B}');
  `);
  const dossier = join(import.meta.dirname, '..', 'migrations');
  for (const f of readdirSync(dossier).sort()) await db.exec(readFileSync(join(dossier, f), 'utf8'));
}, 60_000);

describe('sessions et isolation', () => {
  let modeA: string;
  let lea: string;
  let tom: string;
  let sessionLea: string;

  it('le parent crée son code puis ouvre le mode parent', async () => {
    await en({ parent: PARENT_A }, `select public.definir_code_parent('4242')`);
    expect((await une<string>({ parent: PARENT_A }, `select public.ouvrir_mode_parent('0000') as j`))?.j).toBeNull();
    modeA = (await une<string>({ parent: PARENT_A }, `select public.ouvrir_mode_parent('4242') as j`))!.j!;
    expect(modeA).toMatch(/^[a-f0-9]{64}$/);
  });

  it('seul le mode parent peut créer un profil enfant', async () => {
    await expect(en({ parent: PARENT_A }, `select public.creer_enfant('Léa', 'orange', 'ce2', '1234')`)).rejects.toThrow(/Mode parent requis/);
    lea = (await une<string>({ parent: PARENT_A, parentMode: modeA }, `select public.creer_enfant('Léa', 'orange', 'ce2', '1234') as id`))!.id!;
    tom = (await une<string>({ parent: PARENT_A, parentMode: modeA }, `select public.creer_enfant('Tom', 'violet', '5e', '9876') as id`))!.id!;
  });

  it('l’écran de choix ne montre que prénoms et avatars', async () => {
    const profils = await en({ parent: PARENT_A }, `select * from public.liste_profils()`);
    expect(profils.map((p) => p.prenom)).toEqual(['Léa', 'Tom']);
    expect(Object.keys(profils[0]!).sort()).toEqual(['avatar', 'code_type', 'id', 'prenom']);
    expect(profils.map((p) => p.code_type)).toEqual(['pictos', 'chiffres']);
  });

  it('sans session, le JWT parent ne lit aucune progression', async () => {
    expect(await en({ parent: PARENT_A }, `select id from public.enfants`)).toEqual([]);
    await expect(en({ parent: PARENT_A, parentMode: modeA }, `select code_hash from public.enfants`)).rejects.toThrow(/permission denied/);
  });

  it('un mauvais code n’ouvre pas la session ; le bon, oui', async () => {
    expect((await une<string>({ parent: PARENT_A }, `select public.ouvrir_session_enfant($1, '0000') as j`, [lea]))?.j).toBeNull();
    sessionLea = (await une<string>({ parent: PARENT_A }, `select public.ouvrir_session_enfant($1, '1234') as j`, [lea]))!.j!;
    expect(sessionLea).toMatch(/^[a-f0-9]{64}$/);
  });

  it('une session enfant ne voit que l’enfant concerné', async () => {
    const visibles = await en({ parent: PARENT_A, enfant: sessionLea }, `select prenom from public.enfants`);
    expect(visibles.map((v) => v.prenom)).toEqual(['Léa']);
  });

  it('un enfant n’enregistre des résultats que pour lui-même', async () => {
    const ins = `insert into public.resultats (enfant_id, competence_id, contenu_id, annee_scolaire, reussi)
                 values ($1, 'MA-C2-CE2-FRAC-01', 'fractions-coloriees:1:42', '2026-2027', true)`;
    await en({ parent: PARENT_A, enfant: sessionLea }, ins, [lea]);
    await expect(en({ parent: PARENT_A, enfant: sessionLea }, ins, [tom])).rejects.toThrow(/row-level security/);
  });

  it('la progression est calculée en base et le client ne peut pas tricher', async () => {
    const lea_ = await une<number>({ parent: PARENT_A, enfant: sessionLea }, `select xp, serie from public.enfants`);
    expect(lea_).toMatchObject({ xp: 10, serie: 1 });
    await expect(en({ parent: PARENT_A, enfant: sessionLea }, `update public.enfants set xp = 99999`)).rejects.toThrow(/permission denied/);
    const p = await une<number>({ parent: PARENT_A, enfant: sessionLea }, `select score, nb_essais from public.progression_competences`);
    expect(p?.nb_essais).toBe(1);
  });

  it('le mode parent voit tous ses enfants, un autre parent rien', async () => {
    const tous = await en({ parent: PARENT_A, parentMode: modeA }, `select prenom from public.enfants order by prenom`);
    expect(tous.map((t) => t.prenom)).toEqual(['Léa', 'Tom']);
    expect(await en({ parent: PARENT_B }, `select * from public.liste_profils()`)).toEqual([]);
    expect((await une<string>({ parent: PARENT_B }, `select public.ouvrir_session_enfant($1, '1234') as j`, [lea]))?.j).toBeNull();
    expect(await en({ parent: PARENT_B, enfant: sessionLea }, `select id from public.resultats`)).toEqual([]);
  });

  it('réponse et erreur typique : visibles par l’enfant et son parent, pas par un autre parent', async () => {
    const ins = `insert into public.resultats (enfant_id, competence_id, contenu_id, annee_scolaire, reussi, reponse, erreur)
                 values ($1, 'MA-C2-CE2-FRAC-02', 'somme:1:7', '2026-2027', false, '2/9', $2)`;
    await en({ parent: PARENT_A, enfant: sessionLea }, ins, [lea, 'additionne-denominateurs']);
    await en({ parent: PARENT_A, enfant: sessionLea }, ins, [lea, 'additionne-denominateurs']);
    await expect(en({ parent: PARENT_A, enfant: sessionLea }, ins, [lea, 'Pas un code'])).rejects.toThrow(/check constraint/);
    const requete = `select erreur, nb::int as nb from public.erreurs_frequentes($1)`;
    expect(await en({ parent: PARENT_A, parentMode: modeA }, requete, [lea])).toEqual([{ erreur: 'additionne-denominateurs', nb: 2 }]);
    expect(await en({ parent: PARENT_A, enfant: sessionLea }, requete, [lea])).toEqual([{ erreur: 'additionne-denominateurs', nb: 2 }]);
    expect(await en({ parent: PARENT_A }, requete, [lea])).toEqual([]);
    expect(await en({ parent: PARENT_B }, requete, [lea])).toEqual([]);
  });

  it('révision espacée : une notion ratée revient le lendemain, une notion maitrisée de plus en plus tard', async () => {
    const p = await une<string>({ parent: PARENT_A, enfant: sessionLea },
      `select (prochaine_revision - current_date)::int as dans, reussites_espacees from public.progression_competences
       where competence_id = 'MA-C2-CE2-FRAC-02'`);
    expect(p).toMatchObject({ dans: 1, reussites_espacees: 0 });
    const r = await db.query<{ i: number[] }>(`select array[app.intervalle(0.5, 0::smallint), app.intervalle(0.7, 3::smallint),
      app.intervalle(0.9, 1::smallint), app.intervalle(0.9, 2::smallint), app.intervalle(0.9, 3::smallint), app.intervalle(0.9, 6::smallint)] as i`);
    expect(r.rows[0]!.i).toEqual([1, 2, 3, 7, 14, 30]);
    await expect(en({ parent: PARENT_A, enfant: sessionLea }, `select app.intervalle(0.9, 1::smallint)`)).rejects.toThrow(/permission denied/);
  });

  it('admin : relecture réservée à un compte inscrit, mode parent ouvert', async () => {
    const ecrire = `insert into public.relectures (type, element_id, decision, commentaire) values ('question', 'QM-C2-CE1-ESP-01-001', 'ok', '')
                    on conflict (type, element_id) do update set decision = excluded.decision, maj_le = now()`;
    const lire = `select type, element_id, decision from public.relectures`;
    const estAdmin = async (ctx: Contexte) => (await une<boolean>(ctx, `select public.est_admin() as a`))!.a;

    // Pas encore inscrit : rien, même en mode parent.
    expect(await estAdmin({ parent: PARENT_A, parentMode: modeA })).toBe(false);
    await expect(en({ parent: PARENT_A, parentMode: modeA }, ecrire)).rejects.toThrow(/row-level security/);

    await db.query(`insert into public.admins (user_id) values ($1)`, [PARENT_A]);
    expect(await estAdmin({ parent: PARENT_A, parentMode: modeA })).toBe(true);
    await en({ parent: PARENT_A, parentMode: modeA }, ecrire);
    expect(await en({ parent: PARENT_A, parentMode: modeA }, lire)).toEqual([{ type: 'question', element_id: 'QM-C2-CE1-ESP-01-001', decision: 'ok' }]);

    // Même compte sans mode parent, ou depuis la session d'un enfant : ni lecture ni écriture.
    expect(await estAdmin({ parent: PARENT_A })).toBe(false);
    expect(await en({ parent: PARENT_A }, lire)).toEqual([]);
    expect(await en({ parent: PARENT_A, enfant: sessionLea }, lire)).toEqual([]);
    await expect(en({ parent: PARENT_A, enfant: sessionLea }, ecrire)).rejects.toThrow(/row-level security/);

    // Un autre parent : rien.
    expect(await estAdmin({ parent: PARENT_B })).toBe(false);
    expect(await en({ parent: PARENT_B }, lire)).toEqual([]);
    await expect(en({ parent: PARENT_B }, ecrire)).rejects.toThrow(/row-level security/);

    // L'admin ne signe pas au nom d'un autre, et les identifiants sont contrôlés.
    await expect(en({ parent: PARENT_A, parentMode: modeA },
      `insert into public.relectures (type, element_id, decision, par) values ('lecon', 'QM-C2-CE1-ESP-01', 'ok', '${PARENT_B}')`)).rejects.toThrow(/row-level security/);
    await expect(en({ parent: PARENT_A, parentMode: modeA },
      `insert into public.relectures (type, element_id, decision) values ('lecon', 'pas un id', 'ok')`)).rejects.toThrow(/check constraint/);
    // La table des admins ne se modifie pas depuis l'app.
    await expect(en({ parent: PARENT_B }, `insert into public.admins (user_id) values ('${PARENT_B}')`)).rejects.toThrow(/permission denied/);
  });

  it('bloque après 5 mauvais codes en 10 minutes', async () => {
    for (let i = 0; i < 4; i++) await en({ parent: PARENT_A }, `select public.ouvrir_session_enfant($1, '0000')`, [tom]);
    await expect(en({ parent: PARENT_A }, `select public.ouvrir_session_enfant($1, '9876')`, [tom])).resolves.toBeDefined();
    await en({ parent: PARENT_A }, `select public.ouvrir_session_enfant($1, '0000')`, [tom]);
    await expect(en({ parent: PARENT_A }, `select public.ouvrir_session_enfant($1, '9876')`, [tom])).rejects.toThrow(/Trop d'essais/);
  });
});
