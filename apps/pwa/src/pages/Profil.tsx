import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '../composants/Avatar';
import { ChoixAvatar } from '../composants/ChoixAvatar';
import { Icone } from '../composants/Icone';
import { Octave } from '../composants/Octave';
import { ACCESSOIRES, COULEURS_OCTAVE, definirApparence, ecrireApparence, lireApparence, niveauDe, type Apparence } from '../lib/apparence';
import { api, type Enfant } from '../lib/donnees';
import { erreurReseau } from '../lib/horsLigne';
import { chargerPack, sansMatieres } from '../lib/packs';
import { trophees, type Trophee } from '../lib/trophees';

// Profil de l'enfant : son avatar, son Octave (débloqué en progressant) et sa collection.
export function Profil() {
  const naviguer = useNavigate();
  const [enfant, setEnfant] = useState<Enfant | null>(null);
  const [avatar, setAvatar] = useState('orange');
  const [apparence, setApparence] = useState<Apparence>(lireApparence(null));
  const [collection, setCollection] = useState<Trophee[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    void (async () => {
      try {
        const e = await api.enfantCourant();
        if (!e) return naviguer('/');
        setEnfant(e);
        setAvatar(e.avatar);
        setApparence(lireApparence(e.octave));
        const [pack, suivi, records] = await Promise.all([
          chargerPack(e.classe).then((p) => sansMatieres(p, e.matieres_masquees)),
          api.progression().catch(() => ({})),
          api.records().catch(() => ({} as Record<string, number>)),
        ]);
        setCollection(trophees(e.xp, suivi, pack, records));
      } catch {
        naviguer('/accueil');
      }
    })();
  }, [naviguer]);

  if (!enfant) return <main className="ecran" aria-busy="true" />;
  const niveau = niveauDe(enfant.xp);

  const enregistrer = (a: string, o: Apparence) => {
    setAvatar(a);
    setApparence(o);
    const octave = o.couleur === 'turquoise' && o.accessoire === 'aucun' ? null : ecrireApparence(o);
    definirApparence(octave);
    setMessage('');
    api.reglerMonProfil(a, octave)
      .then(() => setEnfant((e) => (e ? { ...e, avatar: a, octave } : e)))
      .catch((e: unknown) => setMessage(erreurReseau(e) ? 'Pas de connexion : ton choix n’est pas enregistré, réessaie quand le réseau revient.' : 'Ce choix n’a pas pu être enregistré.'));
  };
  const gagnes = collection.filter((t) => t.gagne).length;

  return (
    <main className="ecran">
      <div className="ligne">
        <Link to="/accueil" className="hp-iconbtn" aria-label="Retour à l'accueil"><Icone nom="retour" /></Link>
        <h1 className="titre-2 pousse">Mon profil</h1>
      </div>

      <section className="hp-card profil__tete">
        <Avatar teinte={avatar} taille={64} />
        <div className="pousse">
          <p className="titre-2" style={{ margin: 0 }}>{enfant.prenom}</p>
          <p className="muet" style={{ margin: 0 }}>Niveau {niveau} · {enfant.xp} XP</p>
        </div>
      </section>
      {message && <p className="muet" role="alert">{message}</p>}

      <section className="hp-card profil__section">
        <h2 className="titre-3">Mon avatar</h2>
        <ChoixAvatar valeur={avatar} onChange={(a) => enregistrer(a, apparence)} />
      </section>

      <section className="hp-card profil__section">
        <h2 className="titre-3">Mon Octave</h2>
        <div className="profil__octave">
          <Octave taille={112} apparence={ecrireApparence(apparence)} humeur="reussite" />
          <p className="muet" style={{ margin: 0 }}>Monte de niveau pour débloquer de nouvelles couleurs et de nouveaux accessoires.</p>
        </div>
        <div className="choix-avatar__ligne" role="radiogroup" aria-label="Couleur d’Octave">
          {COULEURS_OCTAVE.map((c) => {
            const ouvert = niveau >= c.niveau;
            return (
              <button key={c.id} type="button" role="radio" aria-checked={c.id === apparence.couleur} disabled={!ouvert}
                aria-label={ouvert ? c.nom : `${c.nom}, niveau ${c.niveau}`}
                className={`choix-avatar__teinte${c.id === apparence.couleur ? ' choix-avatar__teinte--choisie' : ''}`}
                style={{ background: c.corps }} onClick={() => enregistrer(avatar, { ...apparence, couleur: c.id })}>
                {!ouvert && <Icone nom="cadenas" taille={16} />}
              </button>
            );
          })}
        </div>
        <div className="fiche__puces" role="radiogroup" aria-label="Accessoire d’Octave">
          {ACCESSOIRES.map((a) => {
            const ouvert = niveau >= a.niveau;
            const choisi = a.id === apparence.accessoire;
            return (
              <button key={a.id} type="button" role="radio" aria-checked={choisi} disabled={!ouvert}
                className={`hp-chip ${choisi ? 'hp-chip--primary' : 'hp-chip--neutral'} profil__accessoire`}
                onClick={() => enregistrer(avatar, { ...apparence, accessoire: a.id })}>
                {!ouvert && <Icone nom="cadenas" taille={14} />}
                {a.nom}{!ouvert && ` · niv. ${a.niveau}`}
              </button>
            );
          })}
        </div>
      </section>

      <section className="hp-card profil__section">
        <div className="ligne">
          <h2 className="titre-3 pousse">Ma collection</h2>
          <span className="hp-chip hp-chip--sun">{gagnes} / {collection.length}</span>
        </div>
        <div className="collection">
          {collection.map((t) => (
            <div key={t.id} className={`trophee${t.gagne ? ' trophee--gagne' : ''}`}>
              <span className="trophee__icone"><Icone nom={t.gagne ? 'coupe' : 'cadenas'} /></span>
              <span className="trophee__nom">{t.nom}</span>
              <span className="trophee__condition">{t.condition}</span>
              {!t.gagne && (
                <div className="hp-progress hp-progress--sm" role="progressbar" aria-label={`Avancement : ${t.nom}`}
                  aria-valuenow={Math.round(t.part * 100)} aria-valuemin={0} aria-valuemax={100}>
                  <span style={{ width: `${t.part * 100}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
