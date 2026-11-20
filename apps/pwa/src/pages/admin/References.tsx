import { useEffect, useMemo, useState } from 'react';
import { NOMS_MATIERES } from '../../lib/packs';
import { GardeAdmin } from './Admin';

// Table des références : chaque notion porte un identifiant unique et stable, repris par sa leçon,
// son cours et ses questions. Construite par pnpm content:packs (public/packs/references.json).

interface Reference {
  ref: string; matiere: string; programme: string; en_vigueur: boolean; cycle: number; classe: string;
  domaine: string; theme: string; titre: string; notion: 'verifie' | 'a_verifier';
  lecon: string | null; cours: string | null; questions: { publiees: number; total: number };
  generateurs: string[]; dictees: number;
}

const CLASSES = ['cp', 'ce1', 'ce2', 'cm1', 'cm2', '6e', '5e', '4e', '3e'];
const STATUT: Record<string, string> = { publie: 'publié', relu: 'relu', brouillon: 'brouillon' };
const sansAccents = (t: string) => t.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

function PageReferences() {
  const [refs, setRefs] = useState<Reference[] | null>(null);
  const [message, setMessage] = useState('');
  const [recherche, setRecherche] = useState('');
  const [classe, setClasse] = useState('');
  const [matiere, setMatiere] = useState('');
  const [enVigueur, setEnVigueur] = useState(true);

  useEffect(() => {
    fetch('/packs/references.json')
      .then((r) => { if (!r.ok) throw new Error('Table absente : lancez pnpm content:packs.'); return r.json() as Promise<Reference[]>; })
      .then(setRefs)
      .catch((e: Error) => { setMessage(e.message); setRefs([]); });
  }, []);

  const matieres = useMemo(() => [...new Set((refs ?? []).map((r) => r.matiere))].sort(), [refs]);
  const visibles = useMemo(() => {
    const mots = sansAccents(recherche).split(/\s+/).filter(Boolean);
    return (refs ?? []).filter((r) => {
      if (enVigueur && !r.en_vigueur) return false;
      if (classe && r.classe !== classe) return false;
      if (matiere && r.matiere !== matiere) return false;
      const texte = sansAccents(`${r.ref} ${r.titre} ${r.theme} ${r.domaine}`);
      return mots.every((m) => texte.includes(m));
    });
  }, [refs, recherche, classe, matiere, enVigueur]);

  if (!refs) return <p className="muet" aria-busy="true">Chargement…</p>;
  return (
    <section className="references">
      <details className="hp-card references__legende">
        <summary>Lire une référence</summary>
        <p><code>FR-C3-6E-GRAM-01</code> : matière (FR), cycle (C3), classe (6E), domaine (GRAM), numéro de la notion (01).</p>
        <p>La leçon et le cours portent la référence de leur notion. Une question y ajoute son numéro : <code>FR-C3-6E-GRAM-01-003</code>.</p>
        <p className="muet">Une référence ne change jamais : la progression des enfants et la relecture s’y rattachent.</p>
      </details>
      <div className="references__filtres formulaire">
        <label>Rechercher<input type="search" value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Référence, titre, thème…" /></label>
        <label>Classe
          <select value={classe} onChange={(e) => setClasse(e.target.value)}>
            <option value="">Toutes</option>
            {CLASSES.map((c) => <option key={c} value={c}>{c.toUpperCase()}</option>)}
          </select>
        </label>
        <label>Matière
          <select value={matiere} onChange={(e) => setMatiere(e.target.value)}>
            <option value="">Toutes</option>
            {matieres.map((m) => <option key={m} value={m}>{NOMS_MATIERES[m] ?? m}</option>)}
          </select>
        </label>
        <label className="references__case"><input type="checkbox" checked={enVigueur} onChange={(e) => setEnVigueur(e.target.checked)} /> Programmes en vigueur</label>
      </div>
      {message && <p className="muet" role="alert">{message}</p>}
      <p className="muet">{visibles.length} notion{visibles.length > 1 ? 's' : ''}</p>
      <div className="references__table">
        <table>
          <thead>
            <tr><th scope="col">Référence</th><th scope="col">Notion</th><th scope="col">Leçon</th><th scope="col">Cours</th><th scope="col">Questions</th><th scope="col">Générateurs</th></tr>
          </thead>
          <tbody>
            {visibles.slice(0, 300).map((r) => (
              <tr key={r.ref}>
                <th scope="row"><code>{r.ref}</code>{r.notion === 'a_verifier' && <span className="references__alerte"> à vérifier</span>}</th>
                <td><strong>{r.titre}</strong><span className="muet"> · {NOMS_MATIERES[r.matiere] ?? r.matiere}, {r.classe.toUpperCase()} · {r.theme}</span></td>
                <td>{r.lecon ? STATUT[r.lecon] : '–'}</td>
                <td>{r.cours ? STATUT[r.cours] : '–'}</td>
                <td>{r.questions.publiees}/{r.questions.total}{r.dictees > 0 && <span className="muet"> · {r.dictees} dictée{r.dictees > 1 ? 's' : ''}</span>}</td>
                <td>{r.generateurs.length || '–'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visibles.length > 300 && <p className="muet">300 premières lignes : affinez la recherche.</p>}
    </section>
  );
}

export default function References() {
  return <GardeAdmin><PageReferences /></GardeAdmin>;
}
