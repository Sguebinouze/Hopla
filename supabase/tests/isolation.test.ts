// Vérifie l'isolation des sessions sur une vraie base Postgres (PGlite, en mémoire).
// Le schéma auth et les rôles de Supabase sont simulés au minimum.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { pgcrypto } from '@electric-sql/pglite/contrib/pgcrypto';
import { beforeAll, describe, expect, it } from 'vitest';

const PARENT_A = '11111111-1111-1111-1111-111111111111';
const PARENT_B = '22222222-2222-2222-2222-222222222222';
const PARENT_C = '33333333-3333-3333-3333-333333333333';

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
/** Appareil appairé de l'enfant : rôle anon, aucun compte, jeton d'appareil en en-tête. */
async function surAppareil<T = Record<string, unknown>>(jeton: string | null, sql: string, params: unknown[] = []): Promise<T[]> {
  return db.transaction(async (tx) => {
    await tx.query(`select set_config('request.jwt.claim.sub', '', true), set_config('request.headers', $1, true)`,
      [JSON.stringify(jeton ? { 'x-appareil': jeton } : {})]);
    await tx.exec('set local role anon');
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
    create role service_role nologin;
    create schema auth;
    create schema extensions;
    create table auth.users (id uuid primary key, email text);
    create function auth.uid() returns uuid language sql stable as
      $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
    grant usage on schema public, auth, extensions to anon, authenticated, service_role;
    insert into auth.users values ('${PARENT_A}', 'a@exemple.fr'), ('${PARENT_B}', 'b@exemple.fr'), ('${PARENT_C}', 'c@exemple.fr');
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

  it('famille : un second parent invité voit les mêmes enfants, en mode parent seulement', async () => {
    const code = (await une<string>({ parent: PARENT_A, parentMode: modeA }, `select public.inviter_parent() as c`))!.c!;
    expect(code).toMatch(/^[A-HJ-KMNP-Z2-9]{8}$/);
    await expect(en({ parent: PARENT_A }, `select public.inviter_parent()`)).rejects.toThrow(/Mode parent requis/);

    await en({ parent: PARENT_C }, `select public.definir_code_parent('7777')`);
    await expect(en({ parent: PARENT_C }, `select public.rejoindre_famille('AAAA-BBBB')`)).rejects.toThrow(/inconnu ou expiré/);
    await en({ parent: PARENT_C }, `select public.rejoindre_famille($1)`, [code.slice(0, 4) + '-' + code.slice(4).toLowerCase()]);
    // Usage unique.
    await expect(en({ parent: PARENT_B }, `select public.rejoindre_famille($1)`, [code])).rejects.toThrow(/inconnu ou expiré/);

    expect((await en({ parent: PARENT_C }, `select prenom from public.liste_profils()`)).map((p) => p.prenom)).toEqual(['Léa', 'Tom']);
    expect(await en({ parent: PARENT_C }, `select id from public.enfants`)).toEqual([]);
    const modeC = (await une<string>({ parent: PARENT_C }, `select public.ouvrir_mode_parent('7777') as j`))!.j!;
    expect((await en({ parent: PARENT_C, parentMode: modeC }, `select prenom from public.enfants order by cree_le`)).map((e) => e.prenom)).toEqual(['Léa', 'Tom']);
    expect((await en({ parent: PARENT_C, parentMode: modeC }, `select moi from public.membres_de_ma_famille()`)).length).toBe(2);
    // Le parent B, hors de la famille, ne voit toujours rien.
    expect(await en({ parent: PARENT_B }, `select prenom from public.liste_profils()`)).toEqual([]);
  });

  it('appareil de l’enfant : appairé par code, limité à son profil, révocable', async () => {
    await expect(en({ parent: PARENT_B }, `select public.creer_appairage($1)`, [lea])).rejects.toThrow(/Mode parent requis/);
    const code = (await une<string>({ parent: PARENT_A, parentMode: modeA }, `select public.creer_appairage($1) as c`, [lea]))!.c!;
    await expect(surAppareil(null, `select * from public.lier_appareil('ZZZZZZZZ', 'Tablette')`)).rejects.toThrow(/inconnu ou expiré/);
    const lien = (await surAppareil<{ jeton: string; prenom: string }>(null, `select * from public.lier_appareil($1, 'Tablette')`, [code]))[0]!;
    expect(lien.prenom).toBe('Léa');
    await expect(surAppareil(null, `select * from public.lier_appareil($1, 'Autre')`, [code])).rejects.toThrow(/inconnu ou expiré/);

    const jeton = lien.jeton;
    expect((await surAppareil(jeton, `select prenom from public.mon_appareil()`)).map((r) => r.prenom)).toEqual(['Léa']);
    expect((await surAppareil(jeton, `select prenom from public.enfants`)).map((r) => r.prenom)).toEqual(['Léa']);
    const ins = `insert into public.resultats (enfant_id, competence_id, contenu_id, annee_scolaire, reussi) values ($1, 'MA-C2-CE2-NUM-01', 'x', '2026-2027', true)`;
    await surAppareil(jeton, ins, [lea]);
    await expect(surAppareil(jeton, ins, [tom])).rejects.toThrow(/row-level security/);
    expect((await surAppareil(jeton, `select distinct enfant_id from public.resultats`)).map((r) => r.enfant_id)).toEqual([lea]);
    // Sans jeton, ou avec un faux : rien.
    expect(await surAppareil(null, `select id from public.enfants`)).toEqual([]);
    expect(await surAppareil('faux', `select id from public.resultats`)).toEqual([]);
    for (const f of ['public.inviter_parent()', `public.creer_appairage('${lea}')`, 'public.membres_de_ma_famille()', `public.rejoindre_famille('X')`]) {
      await expect(surAppareil(jeton, `select ${f}`)).rejects.toThrow(/permission denied/);
    }

    // Records et contrôle depuis l'appareil ; le parent les voit, un autre parent non.
    expect((await surAppareil(jeton, `select public.noter_defi('tables-addition-ce1', 9) as n`))[0]!.n).toBe(true);
    expect((await surAppareil(jeton, `select public.noter_defi('tables-addition-ce1', 7) as n`))[0]!.n).toBe(false);
    await surAppareil(jeton, `insert into public.controles (enfant_id, date, notions) values ($1, '2026-11-20', array['MA-C2-CE2-NUM-01'])`, [lea]);
    await expect(surAppareil(jeton, `insert into public.controles (enfant_id, date, notions) values ($1, '2026-11-20', array['MA-C2-CE2-NUM-01'])`, [tom]))
      .rejects.toThrow(/row-level security/);
    await expect(surAppareil(jeton, `update public.controles set notions = array['pas un id'] where enfant_id = $1`, [lea])).rejects.toThrow(/check constraint/);
    expect(await en({ parent: PARENT_A, parentMode: modeA }, `select defi_id, record from public.records_defis`)).toEqual([{ defi_id: 'tables-addition-ce1', record: 9 }]);
    expect((await en({ parent: PARENT_A, parentMode: modeA }, `select enfant_id from public.controles`)).length).toBe(1);
    expect(await en({ parent: PARENT_B }, `select * from public.controles`)).toEqual([]);
    expect(await en({ parent: PARENT_A }, `select * from public.records_defis`)).toEqual([]);

    // Le parent voit l'appareil et le retire : le jeton ne vaut plus rien.
    const appareils = await en<{ id: string; nom: string }>({ parent: PARENT_A, parentMode: modeA }, `select id, nom from public.appareils`);
    expect(appareils.map((a) => a.nom)).toEqual(['Tablette']);
    expect(await en({ parent: PARENT_B }, `select id from public.appareils`)).toEqual([]);
    await en({ parent: PARENT_A, parentMode: modeA }, `delete from public.appareils where id = $1`, [appareils[0]!.id]);
    expect(await surAppareil(jeton, `select prenom from public.mon_appareil()`)).toEqual([]);
    expect(await surAppareil(jeton, `select id from public.enfants`)).toEqual([]);
  });

  it('fiche enfant : leçons vues, historique et réglages, visibles par l’enfant et sa famille seulement', async () => {
    const lea_ = { parent: PARENT_A, enfant: sessionLea };
    await en(lea_, `select public.noter_lecon('MA-C2-CE2-FRAC-02')`);
    await en(lea_, `select public.noter_lecon('MA-C2-CE2-FRAC-02')`);
    await expect(en({ parent: PARENT_A, parentMode: modeA }, `select public.noter_lecon('MA-C2-CE2-FRAC-02')`)).rejects.toThrow(/Session enfant requise/);
    expect(await en({ parent: PARENT_A, parentMode: modeA }, `select competence_id, vues from public.lecons_vues`)).toEqual([{ competence_id: 'MA-C2-CE2-FRAC-02', vues: 2 }]);
    expect(await en({ parent: PARENT_B }, `select * from public.lecons_vues`)).toEqual([]);

    const h = `select sum(questions)::int as q from public.historique($1)`;
    expect((await une<number>({ parent: PARENT_A, parentMode: modeA }, h, [lea]))!.q).toBeGreaterThan(0);
    expect((await une<number>(lea_, h, [lea]))!.q).toBeGreaterThan(0);
    expect((await une<number | null>({ parent: PARENT_B }, h, [lea]))!.q).toBeNull();
    expect((await une<number | null>(lea_, h, [tom]))!.q).toBeNull();

    const regler = `update public.enfants set minutes_par_jour = 30, matieres_masquees = '{langues-vivantes}' where id = $1 returning id`;
    expect(await en(lea_, regler, [lea])).toEqual([]);
    expect(await en({ parent: PARENT_A, parentMode: modeA }, regler, [lea])).toEqual([{ id: lea }]);
    expect(await en(lea_, `select minutes_par_jour, matieres_masquees from public.enfants`)).toEqual([{ minutes_par_jour: 30, matieres_masquees: ['langues-vivantes'] }]);
    await expect(en({ parent: PARENT_A, parentMode: modeA }, `update public.enfants set matieres_masquees = '{"Pas valide"}' where id = $1`, [lea])).rejects.toThrow(/check constraint/);
    await expect(en({ parent: PARENT_A, parentMode: modeA }, `update public.enfants set minutes_par_jour = 1 where id = $1`, [lea])).rejects.toThrow(/check constraint/);
    expect((await une<boolean>({ parent: PARENT_A, parentMode: modeA }, `select public.mode_parent_actif() as m`))!.m).toBe(true);
    expect((await une<boolean>({ parent: PARENT_A }, `select public.mode_parent_actif() as m`))!.m).toBe(false);
  });

  it('profil : l’enfant règle son avatar et son Octave, pour lui seul', async () => {
    const lea_ = { parent: PARENT_A, enfant: sessionLea };
    await en(lea_, `select public.regler_mon_profil('chat-bleu', 'violet.lunettes')`);
    expect(await en({ parent: PARENT_A, parentMode: modeA }, `select avatar, octave from public.enfants where id = $1`, [lea]))
      .toEqual([{ avatar: 'chat-bleu', octave: 'violet.lunettes' }]);
    expect(await en({ parent: PARENT_A, parentMode: modeA }, `select avatar from public.enfants where id = $1`, [tom])).not.toEqual([{ avatar: 'chat-bleu' }]);
    await expect(en({ parent: PARENT_A, parentMode: modeA }, `select public.regler_mon_profil('chat-bleu', null)`)).rejects.toThrow(/Session enfant requise/);
    await expect(en({ parent: PARENT_B }, `select public.regler_mon_profil('chat-bleu', null)`)).rejects.toThrow(/Session enfant requise/);
    await expect(surAppareil(null, `select public.regler_mon_profil('chat-bleu', null)`)).rejects.toThrow(/Session enfant requise/);
    await expect(en(lea_, `select public.regler_mon_profil('<script>', null)`)).rejects.toThrow(/check constraint/);
    await expect(en(lea_, `select public.regler_mon_profil('chat-bleu', 'pas valide')`)).rejects.toThrow(/check constraint/);
    await expect(en(lea_, `update public.enfants set octave = 'or.couronne' where id = $1`, [lea])).rejects.toThrow(/permission denied/);
    await en(lea_, `select public.regler_mon_profil('teal', null)`);
  });

  it('bilan de la semaine : famille seulement, mode parent ; envoi par e-mail aux seuls inscrits, clé de service', async () => {
    const modeP = { parent: PARENT_A, parentMode: modeA };
    type Ligne = { prenom: string; questions: number; jours_actifs: number; erreurs: unknown[]; controle: unknown };
    const b = (await une<Ligne[]>(modeP, `select public.bilan_semaine() as b`))!.b!;
    expect(b.map((x) => x.prenom)).toEqual(['Léa', 'Tom']);
    expect(b[0]!.questions).toBeGreaterThan(0);
    expect(b[0]!.jours_actifs).toBe(1);
    expect(b[0]).toHaveProperty('controle');
    expect(b[1]!.questions).toBe(0);
    await expect(en({ parent: PARENT_A }, `select public.bilan_semaine()`)).rejects.toThrow(/Mode parent requis/);
    await expect(en({ parent: PARENT_A, enfant: sessionLea }, `select public.bilan_semaine()`)).rejects.toThrow(/Mode parent requis/);
    await expect(surAppareil(null, `select public.bilan_semaine()`)).rejects.toThrow(/permission denied/);

    const service = async () => db.transaction(async (tx) => {
      await tx.exec('set local role service_role');
      return (await tx.query<{ email: string; bilan: { prenom: string }[] }>(`select * from public.bilans_a_envoyer()`)).rows;
    });
    expect(await service()).toEqual([]);
    expect((await une<boolean>({ parent: PARENT_A }, `select public.bilan_hebdo_actif() as a`))!.a).toBe(false);
    await expect(en({ parent: PARENT_A }, `select public.regler_bilan_hebdo(true)`)).rejects.toThrow(/Mode parent requis/);
    await en(modeP, `select public.regler_bilan_hebdo(true)`);
    expect((await une<boolean>({ parent: PARENT_A }, `select public.bilan_hebdo_actif() as a`))!.a).toBe(true);
    const envois = await service();
    expect(envois.map((e) => [e.email, e.bilan.map((x) => x.prenom)])).toEqual([['a@exemple.fr', ['Léa', 'Tom']]]);
    for (const qui of [() => en({ parent: PARENT_A }, `select * from public.bilans_a_envoyer()`), () => en(modeP, `select * from public.bilans_a_envoyer()`),
      () => surAppareil(null, `select * from public.bilans_a_envoyer()`)]) {
      await expect(qui()).rejects.toThrow(/permission denied/);
    }
    await en(modeP, `select public.regler_bilan_hebdo(false)`);
    expect(await service()).toEqual([]);
  });

  let codeB = false;
  const ouvrirModeB = async () => {
    if (!codeB) await en({ parent: PARENT_B }, `select public.definir_code_parent('2468')`);
    codeB = true;
    return (await une<string>({ parent: PARENT_B }, `select public.ouvrir_mode_parent('2468') as j`))!.j!;
  };

  it('défi en famille : total commun, chaque enfant ne voit que sa part', async () => {
    const modeB = await ouvrirModeB();
    type Defi = { sorte: string; objectif: number; total: number; ma_part: number | null; enfants: number };
    const sessionTom = (await une<string>({ parent: PARENT_A }, `select public.ouvrir_session_enfant($1, '9876') as j`, [tom]))!.j!;
    const dLea = (await une<Defi>({ parent: PARENT_A, enfant: sessionLea }, `select public.defi_famille() as d`))!.d!;
    const dTom = (await une<Defi>({ parent: PARENT_A, enfant: sessionTom }, `select public.defi_famille() as d`))!.d!;
    const dParent = (await une<Defi>({ parent: PARENT_A, parentMode: modeA }, `select public.defi_famille() as d`))!.d!;
    expect(['bonnes_reponses', 'jours_actifs', 'notions']).toContain(dLea.sorte);
    expect(dLea.enfants).toBe(2);
    expect(dLea.objectif % 2).toBe(0);
    expect(dLea.total).toBeGreaterThan(0);
    expect(dLea.ma_part).toBe(dLea.total);
    expect(dTom).toMatchObject({ total: dLea.total, ma_part: 0 });
    expect(dParent).toMatchObject({ total: dLea.total, ma_part: null });
    expect((await une<null>({ parent: PARENT_B, parentMode: modeB }, `select public.defi_famille() as d`))!.d).toBeNull();
    await expect(en({ parent: PARENT_A }, `select public.defi_famille()`)).rejects.toThrow(/Session requise/);
    await expect(surAppareil(null, `select public.defi_famille()`)).rejects.toThrow(/Session requise/);
  });

  it('cahier de vacances : l’enfant et sa famille seulement', async () => {
    const modeB = await ouvrirModeB();
    const lea_ = { parent: PARENT_A, enfant: sessionLea };
    await en(lea_, `insert into public.cahiers_vacances (enfant_id, debut, jours) values ($1, '2027-07-06', 30)`, [lea]);
    await expect(en(lea_, `insert into public.cahiers_vacances (enfant_id, debut, jours) values ($1, '2027-07-06', 30)`, [tom])).rejects.toThrow(/row-level security/);
    await expect(en(lea_, `update public.cahiers_vacances set jours = 90 where enfant_id = $1`, [lea])).rejects.toThrow(/check constraint/);
    expect(await en({ parent: PARENT_A, parentMode: modeA }, `select jours from public.cahiers_vacances`)).toEqual([{ jours: 30 }]);
    expect(await en({ parent: PARENT_A }, `select * from public.cahiers_vacances`)).toEqual([]);
    expect(await en({ parent: PARENT_B, parentMode: modeB }, `select * from public.cahiers_vacances`)).toEqual([]);
    expect(await surAppareil(null, `select * from public.cahiers_vacances`)).toEqual([]);
    await en({ parent: PARENT_A, parentMode: modeA }, `delete from public.cahiers_vacances where enfant_id = $1`, [lea]);
    expect(await en(lea_, `select * from public.cahiers_vacances`)).toEqual([]);
  });

  it('suppression du compte : les enfants restent si un autre parent est membre, sinon tout part', async () => {
    await expect(en({ parent: PARENT_C }, `select public.supprimer_mon_compte()`)).rejects.toThrow(/Mode parent requis/);
    const modeC = (await une<string>({ parent: PARENT_C }, `select public.ouvrir_mode_parent('7777') as j`))!.j!;
    await en({ parent: PARENT_C, parentMode: modeC }, `select public.supprimer_mon_compte()`);
    expect((await db.query(`select count(*)::int as n from auth.users where id = $1`, [PARENT_C])).rows[0]).toEqual({ n: 0 });
    expect((await en({ parent: PARENT_A, parentMode: modeA }, `select prenom from public.enfants order by cree_le`)).map((e) => e.prenom)).toEqual(['Léa', 'Tom']);

    const PARENT_D = '44444444-4444-4444-4444-444444444444';
    await db.query(`insert into auth.users values ($1, 'd@exemple.fr')`, [PARENT_D]);
    await en({ parent: PARENT_D }, `select public.definir_code_parent('5555')`);
    const modeD = (await une<string>({ parent: PARENT_D }, `select public.ouvrir_mode_parent('5555') as j`))!.j!;
    const zoe = (await une<string>({ parent: PARENT_D, parentMode: modeD }, `select public.creer_enfant('Zoé', 'vert', 'cp', '1212') as id`))!.id!;
    await en({ parent: PARENT_D, parentMode: modeD }, `select public.supprimer_mon_compte()`);
    const reste = await db.query(`select (select count(*) from public.enfants where id = $1)::int as enfants,
      (select count(*) from public.familles f where not exists (select 1 from public.membres_famille m where m.famille_id = f.id))::int as familles_vides`, [zoe]);
    expect(reste.rows[0]).toEqual({ enfants: 0, familles_vides: 0 });
  });

  it('bloque après 5 mauvais codes en 10 minutes', async () => {
    for (let i = 0; i < 4; i++) await en({ parent: PARENT_A }, `select public.ouvrir_session_enfant($1, '0000')`, [tom]);
    await expect(en({ parent: PARENT_A }, `select public.ouvrir_session_enfant($1, '9876')`, [tom])).resolves.toBeDefined();
    await en({ parent: PARENT_A }, `select public.ouvrir_session_enfant($1, '0000')`, [tom]);
    await expect(en({ parent: PARENT_A }, `select public.ouvrir_session_enfant($1, '9876')`, [tom])).rejects.toThrow(/Trop d'essais/);
  });
});
