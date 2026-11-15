import { beforeEach, describe, expect, it } from 'vitest';
import type { Api, Enfant, Resultat } from './donnees';
import { avecHorsLigne } from './horsLigne';

class Stockage {
  private m = new Map<string, string>();
  getItem(k: string) { return this.m.get(k) ?? null; }
  setItem(k: string, v: string) { this.m.set(k, v); }
  removeItem(k: string) { this.m.delete(k); }
  clear() { this.m.clear(); }
}

const ENFANT = { id: 'e1', prenom: 'Léa', classe: 'ce1', xp: 10 } as Enfant;
const r = (contenu: string): Resultat => ({ competence: 'C', contenu, reussi: true, indice: false, dureeMs: 1000 });

/** Fausse API : le réseau se coupe à la demande ; on note ce que le serveur reçoit. */
function fausseApi() {
  const etat = { reseau: true, recus: [] as string[], refuse: '' };
  const panne = () => { if (!etat.reseau) throw new TypeError('Failed to fetch'); };
  const api = {
    mode: 'supabase',
    async enfantCourant() { panne(); return { ...ENFANT }; },
    async progression() { panne(); return { C: { score: 0.5 } }; },
    async records() { panne(); return { tables: 4 }; },
    async controle() { panne(); return null; },
    async minutesAujourdhui() { panne(); return 3; },
    async enregistrer(x: Resultat) {
      panne();
      if (x.contenu === etat.refuse) throw new Error('new row violates row-level security policy');
      etat.recus.push(x.contenu);
    },
    async noterLecon(c: string) { panne(); etat.recus.push(`lecon:${c}`); },
    async noterDefi(d: string, s: number) { panne(); etat.recus.push(`defi:${d}:${s}`); return true; },
  } as unknown as Api;
  return { api: avecHorsLigne(api), etat };
}

beforeEach(() => {
  Object.assign(globalThis, { localStorage: new Stockage(), sessionStorage: new Stockage() });
  sessionStorage.setItem('hopla.enfant', 'e1');
});

describe('mode hors connexion', () => {
  it('sans réseau, les lectures resservent la dernière copie reçue', async () => {
    const { api, etat } = fausseApi();
    expect(await api.enfantCourant()).toEqual(ENFANT);
    expect(await api.records()).toEqual({ tables: 4 });
    etat.reseau = false;
    expect(await api.enfantCourant()).toEqual(ENFANT);
    expect(await api.records()).toEqual({ tables: 4 });
    expect(await api.progression()).toEqual({});
  });

  it('les réponses attendent dans une file et partent dans l’ordre au retour du réseau', async () => {
    const { api, etat } = fausseApi();
    await api.enfantCourant();
    etat.reseau = false;
    await api.enregistrer(r('q1'));
    await api.noterLecon('C');
    await api.enregistrer(r('q2'));
    expect(etat.recus).toEqual([]);
    etat.reseau = true;
    await api.enregistrer(r('q3'));
    await new Promise((f) => setTimeout(f, 0));
    expect(etat.recus).toEqual(['q1', 'lecon:C', 'q2', 'q3']);
    await api.enregistrer(r('q4'));
    expect(etat.recus).toEqual(['q1', 'lecon:C', 'q2', 'q3', 'q4']);
  });

  it('un élément refusé par le serveur ne bloque pas la file ; une erreur non réseau remonte', async () => {
    const { api, etat } = fausseApi();
    await api.enfantCourant();
    etat.reseau = false;
    await api.enregistrer(r('refusé'));
    await api.enregistrer(r('q1'));
    etat.refuse = 'refusé';
    etat.reseau = true;
    await api.enfantCourant();
    await new Promise((f) => setTimeout(f, 0));
    expect(etat.recus).toEqual(['q1']);
    await expect(api.enregistrer(r('refusé'))).rejects.toThrow(/row-level security/);
  });

  it('record de défi sans réseau : jugé sur la copie locale, envoyé plus tard', async () => {
    const { api, etat } = fausseApi();
    await api.records();
    etat.reseau = false;
    expect(await api.noterDefi('tables', 6)).toBe(true);
    expect(await api.noterDefi('tables', 5)).toBe(false);
    expect(await api.records()).toEqual({ tables: 6 });
    etat.reseau = true;
    await api.records();
    await new Promise((f) => setTimeout(f, 0));
    expect(etat.recus).toEqual(['defi:tables:6', 'defi:tables:5']);
  });

  it('chaque profil a sa propre file et ses propres copies', async () => {
    const { api, etat } = fausseApi();
    await api.records();
    etat.reseau = false;
    await api.enregistrer(r('lea'));
    sessionStorage.setItem('hopla.enfant', 'e2');
    expect(await api.records()).toEqual({});
    etat.reseau = true;
    await api.enregistrer(r('tom'));
    expect(etat.recus).toEqual(['tom']);
  });
});
