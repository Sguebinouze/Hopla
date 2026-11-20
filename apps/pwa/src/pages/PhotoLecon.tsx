import { ENTREE } from '../lib/routes';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChampTactile } from '../composants/ChampTactile';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { api, type Enfant } from '../lib/donnees';
import { chargerPack, competencesJouables, NOMS_MATIERES, sansMatieres } from '../lib/packs';
import {
  garderPhoto, lireTexte, mesPhotos, notionsProches, reduire, supprimerPhoto, type PhotoLecon as Photo,
} from '../lib/photoLecon';

type Etape =
  | { e: 'liste' }
  | { e: 'lecture'; image: Blob; part: number }
  | { e: 'choix'; image: Blob; proposees: string[] }
  | { e: 'voir'; photo: Photo };

const sansAccents = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Image d'un Blob, avec libération de l'adresse temporaire. */
function Image({ blob, alt, className }: { blob: Blob; alt: string; className?: string }) {
  const url = useMemo(() => URL.createObjectURL(blob), [blob]);
  useEffect(() => () => URL.revokeObjectURL(url), [url]);
  return <img src={url} alt={alt} className={className} />;
}

// Photo de leçon : l'enfant photographie sa leçon du cahier, Hopla lit le texte sur l'appareil,
// propose les notions du programme qui y correspondent et l'entraine dessus. La photo reste sur l'appareil.
export function PhotoLecon() {
  const naviguer = useNavigate();
  const [enfant, setEnfant] = useState<Enfant | null>(null);
  const [notions, setNotions] = useState<ReturnType<typeof competencesJouables>>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [etape, setEtape] = useState<Etape>({ e: 'liste' });
  const [recherche, setRecherche] = useState('');
  const [message, setMessage] = useState('');
  const champ = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void (async () => {
      try {
        const e = await api.enfantCourant();
        if (!e) return naviguer(ENTREE);
        setEnfant(e);
        setNotions(competencesJouables(sansMatieres(await chargerPack(e.classe), e.matieres_masquees)));
        setPhotos(await mesPhotos(e.id).catch(() => []));
      } catch {
        naviguer('/accueil');
      }
    })();
  }, [naviguer]);

  if (!enfant) return <main className="ecran" aria-busy="true" />;
  const parId = new Map(notions.map((c) => [c.id, c] as const));

  const photographier = async (fichier: File | undefined) => {
    if (!fichier) return;
    setMessage('');
    setRecherche('');
    try {
      const image = await reduire(fichier);
      setEtape({ e: 'lecture', image, part: 0 });
      const texte = await lireTexte(image, (part) => setEtape((x) => (x.e === 'lecture' ? { ...x, part } : x)));
      setEtape({ e: 'choix', image, proposees: notionsProches(texte, notions).map((p) => p.id) });
    } catch {
      setMessage('Je n’ai pas réussi à lire cette photo. Réessaie avec plus de lumière, la page bien à plat.');
      setEtape({ e: 'liste' });
    }
  };

  const garder = async (image: Blob, notion: string) => {
    const photo: Photo = { id: crypto.randomUUID(), enfant: enfant.id, le: new Date().toISOString(), image, notions: [notion] };
    await garderPhoto(photo).catch(() => setMessage('La photo n’a pas pu être gardée sur cet appareil.'));
    setPhotos(await mesPhotos(enfant.id).catch(() => []));
    setEtape({ e: 'voir', photo });
  };

  const entete = (
    <div className="ligne">
      {etape.e === 'liste'
        ? <Link to="/accueil" className="hp-iconbtn" aria-label="Retour à l'accueil"><Icone nom="retour" /></Link>
        : <button type="button" className="hp-iconbtn" aria-label="Retour à mes photos" onClick={() => setEtape({ e: 'liste' })}><Icone nom="retour" /></button>}
      <h1 className="titre-2 pousse">Photo de leçon</h1>
    </div>
  );

  const ligneNotion = (id: string, action: 'garder' | 'lien', image?: Blob) => {
    const c = parId.get(id);
    if (!c) return null;
    const contenu = (
      <>
        <span className="hp-skill__main">
          <span className="hp-skill__name">{c.titre}</span>
          <span className="hp-skill__where">{NOMS_MATIERES[c.matiere] ?? c.matiere} · {c.domaine}</span>
        </span>
        <span className="hp-chip hp-chip--primary">{action === 'garder' ? 'C’est ça' : 'S’entrainer'}</span>
      </>
    );
    return action === 'garder'
      ? <button key={id} type="button" className="hp-skill notion photo__notion" onClick={() => void garder(image!, id)}>{contenu}</button>
      : <Link key={id} to={`/exercice/${id}`} className="hp-skill notion">{contenu}</Link>;
  };

  if (etape.e === 'lecture') {
    return (
      <main className="ecran">
        {entete}
        <Image blob={etape.image} alt="Ta photo" className="photo__apercu" />
        <section className="hp-card photo__lecture" role="status">
          <Octave humeur="reflechit" taille={56} />
          <div className="pousse">
            <p style={{ margin: 0 }}>Octave lit ta leçon…</p>
            <div className="hp-progress hp-progress--sm" aria-hidden="true"><span style={{ width: `${etape.part * 100}%` }} /></div>
          </div>
        </section>
      </main>
    );
  }

  if (etape.e === 'choix') {
    const filtre = sansAccents(recherche.trim());
    const autres = filtre.length >= 2 ? notions.filter((c) => sansAccents(c.titre).includes(filtre)).slice(0, 8) : [];
    return (
      <main className="ecran">
        {entete}
        <Image blob={etape.image} alt="Ta photo" className="photo__apercu" />
        <h2 className="titre-3">{etape.proposees.length > 0 ? 'C’est quelle leçon ?' : 'Je n’ai pas reconnu la leçon.'}</h2>
        {etape.proposees.length > 0 && <div className="liste-notions">{etape.proposees.map((id) => ligneNotion(id, 'garder', etape.image))}</div>}
        <label className="photo__recherche">
          <span className="muet">{etape.proposees.length > 0 ? 'Une autre ? Cherche-la :' : 'Cherche-la dans ton programme :'}</span>
          <ChampTactile type="search" value={recherche} placeholder="Par exemple : fractions" onChange={setRecherche} />
        </label>
        {autres.length > 0 && <div className="liste-notions">{autres.map((c) => ligneNotion(c.id, 'garder', etape.image))}</div>}
        {filtre.length >= 2 && autres.length === 0 && <p className="muet">Aucune notion de ta classe ne s’appelle ainsi.</p>}
      </main>
    );
  }

  if (etape.e === 'voir') {
    const { photo } = etape;
    return (
      <main className="ecran">
        {entete}
        <Image blob={photo.image} alt="Ta leçon" className="photo__apercu photo__apercu--grande" />
        <div className="liste-notions">
          {photo.notions.map((id) => ligneNotion(id, 'lien'))}
          {photo.notions.some((id) => parId.get(id)?.lecon) && (
            <Link to={`/lecon/${photo.notions[0]}`} className="hp-btn hp-btn--secondary">Voir la leçon d’Octave</Link>
          )}
        </div>
        <button type="button" className="hp-btn hp-btn--ghost" onClick={() => {
          void supprimerPhoto(photo.id).then(async () => { setPhotos(await mesPhotos(enfant.id)); setEtape({ e: 'liste' }); });
        }}>Supprimer cette photo</button>
      </main>
    );
  }

  return (
    <main className="ecran">
      {entete}
      <section className="hp-card cahier__intro">
        <Octave taille={56} />
        <p style={{ margin: 0 }}>
          Prends ta leçon du cahier en photo : je la lis, je trouve la notion et je t’entraine dessus.
          La photo reste sur cet appareil.
        </p>
      </section>
      <input ref={champ} type="file" accept="image/*" capture="environment" hidden
        onChange={(e) => { void photographier(e.target.files?.[0]); e.target.value = ''; }} />
      <button type="button" className="hp-btn hp-btn--primary hp-btn--lg hp-btn--block" onClick={() => champ.current?.click()}>
        <Icone nom="appareil" />Prendre ma leçon en photo
      </button>
      {message && <p className="muet" role="alert">{message}</p>}
      {photos.length > 0 && (
        <>
          <h2 className="titre-3">Mes leçons en photo</h2>
          <div className="photo__grille">
            {photos.map((p) => (
              <button key={p.id} type="button" className="photo__vignette" onClick={() => setEtape({ e: 'voir', photo: p })}>
                <Image blob={p.image} alt="" />
                <span>{parId.get(p.notions[0] ?? '')?.titre ?? 'Leçon'}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
