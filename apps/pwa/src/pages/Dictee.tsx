import { groupeLu } from '@hopla/redaction';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Clavier } from '../composants/Clavier';
import { FinDuJour } from '../composants/FinDuJour';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { corriger, erreurDominante, type Correction, type MotCorrige, type TypeEcart } from '../lib/dictee';
import { api } from '../lib/donnees';
import { competenceDuPack, type DicteePack } from '../lib/packs';
import { tempsEcoule } from '../lib/temps';
import { dire, taire } from '../lib/voix';

type Etape = 'ecoute' | 'dictee' | 'correction';

const LIBELLES: Partial<Record<TypeEcart, string>> = {
  accord: 'Accords', accent: 'Accents', majuscule: 'Majuscules', orthographe: 'Orthographe',
  oubli: 'Mots oubliés', ajout: 'Mots en trop', ponctuation: 'Ponctuation',
};

// Dictées faites, par enfant : la suivante est la plus ancienne ou une jamais faite.
const cleFaites = (enfant: string) => `hopla.dictees.${enfant}`;
function faites(enfant: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(cleFaites(enfant)) ?? '[]') as string[];
  } catch {
    return [];
  }
}
function noterFaite(enfant: string, id: string) {
  try {
    localStorage.setItem(cleFaites(enfant), JSON.stringify([...faites(enfant).filter((x) => x !== id), id].slice(-50)));
  } catch {
    /* stockage indisponible : l'ordre repart du début */
  }
}
export function dicteeSuivante(dictees: DicteePack[], deja: string[]): DicteePack | undefined {
  return dictees.find((d) => !deja.includes(d.id)) ?? [...dictees].sort((a, b) => deja.indexOf(a.id) - deja.indexOf(b.id))[0];
}

/** Espaces du texte corrigé : rien avant la virgule et le point, rien après le guillemet ouvrant. */
function espaceAvant(precedent: MotCorrige, mot: MotCorrige): boolean {
  const t = mot.attendu ?? mot.saisi ?? '';
  const p = precedent.attendu ?? precedent.saisi ?? '';
  return !/^[,.…]$/.test(t) && p !== '«';
}

export function Dictee() {
  const { competence = '' } = useParams();
  const naviguer = useNavigate();
  const [dictee, setDictee] = useState<DicteePack | null>(null);
  const [enfant, setEnfant] = useState('');
  const [stop, setStop] = useState(0);
  const [etape, setEtape] = useState<Etape>('ecoute');
  const [rang, setRang] = useState(0);
  const [saisie, setSaisie] = useState('');
  const [correction, setCorrection] = useState<Correction | null>(null);
  const debut = useRef(Date.now());

  useEffect(() => {
    void (async () => {
      try {
        const e = await api.enfantCourant();
        if (!e) return naviguer('/');
        if (await tempsEcoule(e)) return setStop(e.minutes_par_jour ?? 0);
        const trouve = await competenceDuPack(e.classe, competence);
        const d = trouve && dicteeSuivante(trouve.competence.dictees ?? [], faites(e.id));
        if (!d) return naviguer('/accueil');
        setEnfant(e.id);
        setDictee(d);
      } catch {
        naviguer('/accueil');
      }
    })();
    return () => taire();
  }, [competence, naviguer]);

  // Chaque groupe est dit une fois en arrivant ; l'enfant le réécoute autant qu'il veut.
  useEffect(() => {
    if (etape === 'dictee' && dictee) dire(groupeLu(dictee.groupes[rang]!));
  }, [etape, rang, dictee]);

  if (stop) return <FinDuJour minutes={stop} />;
  if (!dictee) return <main className="ecran" aria-busy="true" />;

  const groupes = dictee.groupes;
  const dernier = rang >= groupes.length - 1;

  const corrigerDictee = async () => {
    taire();
    const c = corriger(dictee.texte, saisie);
    setCorrection(c);
    setEtape('correction');
    noterFaite(enfant, dictee.id);
    try {
      await api.enregistrer({
        competence, contenu: dictee.id, reussi: c.reussi, indice: false, dureeMs: Date.now() - debut.current,
        // Nombre d'erreurs sur le nombre de mots : jamais le texte tapé par l'enfant.
        reponse: `${c.erreurs}/${c.total}`,
        erreur: c.reussi ? undefined : erreurDominante(c),
      });
    } catch {
      /* hors connexion : le résultat n'est pas enregistré */
    }
  };

  const recommencer = () => {
    setSaisie('');
    setRang(0);
    setCorrection(null);
    setEtape('ecoute');
    debut.current = Date.now();
  };

  return (
    <main className="ecran ecran--large dictee">
      <div className="ligne">
        <Link to="/accueil" className="hp-iconbtn" aria-label="Quitter la dictée"><Icone nom="fermer" /></Link>
        <h1 className="titre-2 pousse">Dictée : {dictee.titre}</h1>
        {etape === 'dictee' && <span className="muet">{rang + 1} / {groupes.length}</span>}
      </div>

      {etape === 'ecoute' && (
        <div className="dictee__debut">
          <div className="hp-bubble" style={{ maxWidth: 'none' }}>
            <Octave humeur="accueil" taille={56} />
            <p className="hp-bubble__text" style={{ margin: 0 }}>
              Écoute d’abord tout le texte. Ensuite, je te le dicte morceau par morceau, avec la ponctuation.
            </p>
          </div>
          <div className="dictee__actions">
            <button type="button" className="hp-btn hp-btn--secondary hp-btn--lg" onClick={() => dire(dictee.texte)}>
              <Icone nom="haut-parleur" />Écouter le texte
            </button>
            <button type="button" className="hp-btn hp-btn--primary hp-btn--lg" onClick={() => { taire(); setEtape('dictee'); }}>
              Commencer
            </button>
          </div>
        </div>
      )}

      {etape === 'dictee' && (
        <>
          <ol className="serie" aria-label={`Morceau ${rang + 1} sur ${groupes.length}`}>
            {groupes.map((_, i) => <li key={i} className={`serie__case${i < rang ? ' serie__case--juste' : i === rang ? ' serie__case--courante' : ''}`} />)}
          </ol>
          <div className="dictee__actions">
            <button type="button" className="hp-btn hp-btn--secondary" onClick={() => dire(groupeLu(groupes[rang]!))}>
              <Icone nom="haut-parleur" />Réécouter
            </button>
            {dernier && (
              <button type="button" className="hp-btn hp-btn--secondary" onClick={() => dire(dictee.texte)}>
                <Icone nom="livre" />Relire tout le texte
              </button>
            )}
          </div>
          <Clavier valeur={saisie} onChange={setSaisie} texte mode="lettres" indication="Écris ce que tu entends"
            libelleValider={dernier ? 'Corriger' : 'Suivant'} valideVide
            onValider={() => (dernier ? void corrigerDictee() : setRang((r) => r + 1))} />
        </>
      )}

      {etape === 'correction' && correction && (
        <div className="dictee__correction">
          <div className={`hp-feedback ${correction.reussi ? 'hp-feedback--success' : 'hp-feedback--attention'}`} style={{ maxWidth: 'none' }} role="status">
            <Octave humeur={correction.reussi ? 'reussite' : 'oups'} taille={56} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span className="hp-feedback__title">
                {correction.erreurs === 0 ? 'Aucune erreur.' : `${correction.erreurs} erreur${correction.erreurs > 1 ? 's' : ''} sur ${correction.total} mots et signes.`}
              </span>
              <span className="hp-feedback__text">
                {correction.erreurs === 0 ? 'Le texte est écrit sans faute.' : 'Barré : ce que tu as écrit. Surligné : la bonne écriture.'}
              </span>
            </div>
          </div>

          {correction.erreurs > 0 && (
            <div className="dictee__types">
              {(Object.entries(correction.parType) as [TypeEcart, number][]).map(([t, n]) => (
                <span key={t} className="hp-chip hp-chip--attention">{LIBELLES[t]} : {n}</span>
              ))}
            </div>
          )}

          <p className="dictee__texte">
            {correction.mots.map((m, i) => {
              const avant = i > 0 && espaceAvant(correction.mots[i - 1]!, m) ? ' ' : '';
              if (m.type === 'juste') return <span key={i}>{avant}{m.attendu}</span>;
              return (
                <span key={i}>
                  {avant}
                  {m.saisi && <s className="dictee__ecrit" aria-label={`tu as écrit ${m.saisi}`}>{m.saisi}</s>}
                  {m.saisi && m.attendu && ' '}
                  {m.attendu && <mark className="dictee__bon">{m.attendu}</mark>}
                </span>
              );
            })}
          </p>

          <p className="dictee__source muet">
            {dictee.credit?.startsWith(dictee.source) ? <>Texte : {dictee.credit}.</>
              : <>Texte : {dictee.source}.{dictee.credit && <> D’après {dictee.credit}.</>}</>}
          </p>

          <div className="dictee__actions">
            <button type="button" className="hp-btn hp-btn--secondary hp-btn--lg" onClick={recommencer}>Recommencer</button>
            <Link to="/accueil" className="hp-btn hp-btn--primary hp-btn--lg">Terminer</Link>
          </div>
        </div>
      )}
    </main>
  );
}
