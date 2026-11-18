import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '../composants/Avatar';
import { BoutonTheme } from '../composants/BoutonTheme';
import { Icone } from '../composants/Icone';
import { Marque } from '../composants/Marque';
import { Octave } from '../composants/Octave';
import { MentionProgrammes } from '../composants/Programmes';
import { api, surAppareilEnfant, type Profil } from '../lib/donnees';

// Point d'entrée de l'app.
// - Appareil appairé à un enfant : son espace s'ouvre directement.
// - Personne de connecté : présentation et deux portes (parent, enfant avec un code).
// - Parent connecté sans enfant : l'assistant de démarrage.
// - Sinon : « Qui travaille aujourd'hui ? » (appareil partagé de la famille).
export function Profils() {
  const naviguer = useNavigate();
  const [connecte, setConnecte] = useState<boolean | null>(null);
  const [profils, setProfils] = useState<Profil[]>([]);

  useEffect(() => {
    void (async () => {
      // Arrivée par un lien de connexion refusé : l'écran de connexion explique quoi faire.
      if (/error/.test(location.hash)) return naviguer(`/connexion${location.hash}`, { replace: true });
      if (surAppareilEnfant() && (await api.monAppareil().catch(() => null))) return naviguer('/accueil', { replace: true });
      const ok = await api.parentConnecte();
      if (!ok) return setConnecte(false);
      const ps = await api.listeProfils().catch(() => []);
      if (ps.length === 0) return naviguer('/demarrer', { replace: true });
      setProfils(ps);
      setConnecte(true);
    })();
  }, [naviguer]);

  if (connecte === null) return <main className="ecran ecran--etroit" aria-busy="true" />;

  if (!connecte) {
    return (
      <main className="ecran ecran--etroit ouverture">
        <div className="ligne"><Marque /><BoutonTheme /></div>
        <div className="ouverture__corps">
          <Octave taille={120} />
          <h1 className="titre-1">Réviser un peu chaque jour, à son rythme</h1>
          <p style={{ margin: 0 }}>Des séances courtes, des leçons claires et un compagnon, Octave, pour avancer pas à pas.</p>
          <MentionProgrammes />
        </div>
        <div className="ouverture__actions">
          <Link to="/connexion" className="hp-btn hp-btn--primary hp-btn--lg hp-btn--block">Je suis parent</Link>
          <Link to="/appairer" className="hp-btn hp-btn--secondary hp-btn--lg hp-btn--block">Je suis un enfant, j’ai un code</Link>
          <p className="muet" style={{ margin: 0, textAlign: 'center' }}>
            Première visite ? Commencez par « Je suis parent » : vous créerez les profils de vos enfants en quelques minutes.
          </p>
          <Link to="/confidentialite" className="muet lien-discret" style={{ textAlign: 'center' }}>Confidentialité : ce que Hopla garde, et ce qu’il ne garde pas</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="ecran ecran--etroit">
      <div className="ligne"><Marque /><BoutonTheme /></div>
      <div className="hp-bubble">
        <Octave taille={88} />
        <div className="hp-bubble__text"><span className="hp-bubble__name">Octave</span>
          <h1 className="titre-1">Bonjour. Qui travaille aujourd'hui ?</h1>
        </div>
      </div>
      {api.mode === 'demo' && <p className="bandeau-demo">Mode démo : aucune donnée ne quitte cet appareil.</p>}
      <div className="grille-profils">
        {profils.map((p) => (
          <Link key={p.id} to={`/code/${p.id}`} className="hp-profile" style={{ width: 'auto' }}>
            <Avatar teinte={p.avatar} />
            <span className="hp-profile__name">{p.prenom}</span>
            <span className="hp-profile__lock"><Icone nom="cadenas" taille={14} />Code secret</span>
          </Link>
        ))}
      </div>
      <p className="muet" style={{ textAlign: 'center' }}>Chaque enfant entre avec son code et ne voit que sa propre progression.</p>
      <div className="pousse" />
      <Link to="/parent" className="hp-btn hp-btn--secondary hp-btn--block"><Icone nom="cadenas" />Espace parent</Link>
    </main>
  );
}
