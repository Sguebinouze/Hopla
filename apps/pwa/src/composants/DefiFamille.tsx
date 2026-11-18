import { useEffect, useState } from 'react';
import { api, type DefiFamille as Defi } from '../lib/donnees';
import { Icone } from './Icone';

const SORTES: Record<Defi['sorte'], { titre: (n: number, seul: boolean) => string; unite: string; aide: string }> = {
  bonnes_reponses: {
    titre: (n, seul) => `${n} bonnes réponses${seul ? '' : ' en famille'}`,
    unite: 'bonnes réponses',
    aide: 'Chaque bonne réponse compte, dans toutes les matières.',
  },
  jours_actifs: {
    titre: (n, seul) => `${n} jours de travail${seul ? '' : ' en famille'}`,
    unite: 'jours',
    aide: 'Un jour compte dès la première question.',
  },
  notions: {
    titre: (n, seul) => `${n} notions travaillées${seul ? '' : ' en famille'}`,
    unite: 'notions',
    aide: 'Chaque notion différente travaillée cette semaine compte.',
  },
};

const jourCourt = (iso: string) => {
  const [a, m, j] = iso.split('-').map(Number) as [number, number, number];
  return new Date(a, m - 1, j).toLocaleDateString('fr-FR', { weekday: 'long' });
};

/** Défi de la semaine : un objectif commun à tous les enfants de la famille. */
export function DefiFamille({ parent = false }: { parent?: boolean }) {
  const [defi, setDefi] = useState<Defi | null>(null);
  useEffect(() => { api.defiFamille().then(setDefi).catch(() => setDefi(null)); }, []);
  if (!defi) return null;
  const s = SORTES[defi.sorte];
  const seul = defi.enfants === 1;
  const reste = Math.max(0, defi.objectif - defi.total);
  const part = Math.min(1, defi.total / defi.objectif);
  return (
    <section className="hp-card defi-famille">
      <div className="ligne">
        <span className="defi-famille__icone"><Icone nom={seul ? 'coupe' : 'famille'} /></span>
        <div className="pousse">
          <p className="muet defi-famille__sur">{seul ? 'Défi de la semaine' : 'Défi de la famille'} · jusqu’à {jourCourt(defi.fin)}</p>
          <p className="defi-famille__titre">{s.titre(defi.objectif, seul)}</p>
        </div>
      </div>
      <div className="hp-progress" role="progressbar" aria-label="Avancement du défi"
        aria-valuenow={defi.total} aria-valuemin={0} aria-valuemax={defi.objectif}>
        <span style={{ width: `${part * 100}%` }} />
      </div>
      <p className="muet" style={{ margin: 0 }}>
        {reste === 0 ? 'Défi réussi.' : `${defi.total} sur ${defi.objectif} : encore ${reste} ${s.unite}.`}
        {!parent && !seul && defi.ma_part !== null && reste > 0 && (defi.ma_part > 0 ? ` Ta part : ${defi.ma_part}.` : ' Ta part : 0.')}
        {parent && reste > 0 && ` ${s.aide}`}
      </p>
    </section>
  );
}
