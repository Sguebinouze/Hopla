import { useState } from 'react';
import { aujourdhui } from '../lib/progression';
import { NOMS_MATIERES, type CompetencePack } from '../lib/packs';
import { Icone } from './Icone';

/** Choix de la date et des notions d'un contrôle. Utilisé par l'enfant et par le parent. */
export function ChoixControle({ notions, date, onDate, choix, onChoix }: {
  notions: (CompetencePack & { matiere: string })[];
  date: string;
  onDate: (d: string) => void;
  choix: string[];
  onChoix: (c: string[]) => void;
}) {
  const [matiere, setMatiere] = useState('');
  const jour = aujourdhui();
  const matieres = [...new Set(notions.map((c) => c.matiere))];
  const ouverte = matiere && matieres.includes(matiere) ? matiere : matieres[0]!;
  const basculer = (id: string) => onChoix(choix.includes(id) ? choix.filter((x) => x !== id) : [...choix, id]);
  const jours = joursDeClasse(5);
  return (
    <>
      <section className="hp-card controle__etape">
        <h2 className="titre-3">Quand ?</h2>
        <div className="controle__puces" role="radiogroup" aria-label="Date du contrôle">
          {jours.map((j) => (
            <button key={j} type="button" role="radio" aria-checked={j === date}
              className={`hp-chip ${j === date ? 'hp-chip--primary' : 'hp-chip--neutral'}`} onClick={() => onDate(j)}>
              {dateCourte(j)}
            </button>
          ))}
        </div>
        <label className="controle__autre">
          <span className="muet">Autre date</span>
          <input type="date" min={jour} value={date} onChange={(e) => e.target.value && onDate(e.target.value)} />
        </label>
      </section>

      <section className="hp-card controle__etape">
        <h2 className="titre-3">Quelles notions ?</h2>
        <div className="controle__puces" role="tablist" aria-label="Matières">
          {matieres.map((m) => {
            const n = notions.filter((c) => c.matiere === m && choix.includes(c.id)).length;
            return (
              <button key={m} type="button" role="tab" aria-selected={m === ouverte}
                className={`hp-chip ${m === ouverte ? 'hp-chip--primary' : 'hp-chip--neutral'}`} onClick={() => setMatiere(m)}>
                {NOMS_MATIERES[m] ?? m}{n > 0 ? ` · ${n}` : ''}
              </button>
            );
          })}
        </div>
        {[...new Set(notions.filter((c) => c.matiere === ouverte).map((c) => c.domaine))].map((domaine) => (
          <div key={domaine} className="controle__liste" role="group" aria-label={domaine}>
            <p className="muet">{domaine}</p>
            {notions.filter((c) => c.matiere === ouverte && c.domaine === domaine).map((c) => {
              const coche = choix.includes(c.id);
              return (
                <button key={c.id} type="button" role="checkbox" aria-checked={coche}
                  className={`controle__notion${coche ? ' controle__notion--coche' : ''}`} onClick={() => basculer(c.id)}>
                  <span className="controle__case" aria-hidden="true">{coche && <Icone nom="coche" taille={16} />}</span>
                  <span className="controle__titre">{c.titre}</span>
                </button>
              );
            })}
          </div>
        ))}
      </section>
    </>
  );
}

/** Les n prochains jours de classe (lundi à vendredi), à partir de demain. */
function joursDeClasse(n: number): string[] {
  const res: string[] = [];
  const d = new Date();
  while (res.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) res.push(aujourdhui(d));
  }
  return res;
}

function dateCourte(date: string): string {
  const [a, m, j] = date.split('-').map(Number) as [number, number, number];
  return new Date(a, m - 1, j).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
}
