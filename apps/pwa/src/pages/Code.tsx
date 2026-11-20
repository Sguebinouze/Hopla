import { ENTREE } from '../lib/routes';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '../composants/Avatar';
import { ClavierCode } from '../composants/ClavierCode';
import { Icone } from '../composants/Icone';
import { api, CODE_DE_DEMO, type Profil } from '../lib/donnees';

export function Code() {
  const { id = '' } = useParams();
  const naviguer = useNavigate();
  const [profil, setProfil] = useState<Profil | null>(null);
  const [saisie, setSaisie] = useState('');
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    void api.listeProfils().then((ps) => setProfil(ps.find((p) => p.id === id) ?? null));
  }, [id]);

  useEffect(() => {
    if (saisie.length < 4) return;
    void (async () => {
      try {
        if (await api.ouvrirSession(id, saisie)) naviguer('/accueil');
        else setErreur('Code incorrect. Réessaie.');
      } catch (e) {
        setErreur((e as Error).message);
      }
      setSaisie('');
    })();
  }, [saisie, id, naviguer]);

  if (!profil) return <main className="ecran ecran--etroit" aria-busy="true" />;
  const pictos = profil.code_type === 'pictos';

  return (
    <main className="ecran ecran--etroit" style={{ alignItems: 'center' }}>
      <Link to={ENTREE} className="hp-iconbtn" aria-label="Retour au choix du profil" style={{ alignSelf: 'flex-start' }}><Icone nom="retour" /></Link>
      <Avatar teinte={profil.avatar} taille={88} />
      <h1 className="titre-1">Bonjour {profil.prenom}</h1>
      <p className="muet">Tape ton code secret</p>
      {erreur && <p className="erreur" role="alert">{erreur}</p>}
      <ClavierCode pictos={pictos} saisie={saisie} onSaisie={(s) => { setErreur(''); setSaisie(s); }} />
      {api.mode === 'demo' && (
        <p className="bandeau-demo">Démo : le code est {pictos ? '4 fois la lune' : CODE_DE_DEMO}.</p>
      )}
      <p className="muet">Code oublié ? <Link to="/parent">Demande à un parent</Link></p>
    </main>
  );
}
