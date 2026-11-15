import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icone } from '../composants/Icone';
import { api, type Classe } from '../lib/donnees';

const CLASSES: Classe[] = ['cp', 'ce1', 'ce2', 'cm1', 'cm2', '6e', '5e', '4e', '3e'];

// Première version : code parent et création des profils. Le tableau de bord viendra ensuite.
export function Parent() {
  const [ouvert, setOuvert] = useState(false);
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [enfant, setEnfant] = useState({ prenom: '', avatar: 'orange', classe: 'ce2' as Classe, code: '' });

  const essayer = async (action: () => Promise<void>) => {
    setMessage('');
    try {
      await action();
    } catch (e) {
      setMessage((e as Error).message);
    }
  };

  return (
    <main className="ecran">
      <div className="ligne">
        <Link to="/" className="hp-iconbtn" aria-label="Retour"><Icone nom="retour" /></Link>
        <h1 className="titre-1">Espace parent</h1>
      </div>

      {!ouvert ? (
        <form className="formulaire hp-card" onSubmit={(e) => {
          e.preventDefault();
          void essayer(async () => {
            if (await api.ouvrirModeParent(code)) setOuvert(true);
            else setMessage('Code parent incorrect.');
          });
        }}>
          <label>Code parent (4 chiffres)
            <input inputMode="numeric" pattern="[0-9]{4}" maxLength={4} required value={code} onChange={(e) => setCode(e.target.value)} />
          </label>
          <div className="ligne">
            <button className="hp-btn hp-btn--primary">Ouvrir</button>
            <button type="button" className="hp-btn hp-btn--ghost" onClick={() => void essayer(async () => {
              await api.definirCodeParent(code);
              setMessage('Code parent enregistré. Clique sur Ouvrir.');
            })}>Créer ce code</button>
          </div>
          {api.mode === 'demo' && <p className="bandeau-demo">Démo : le code parent est 1111.</p>}
        </form>
      ) : (
        <form className="formulaire hp-card" onSubmit={(e) => {
          e.preventDefault();
          void essayer(async () => {
            await api.creerEnfant(enfant);
            setMessage(`Profil ${enfant.prenom} créé.`);
            setEnfant({ ...enfant, prenom: '', code: '' });
          });
        }}>
          <h2 className="titre-2">Ajouter un enfant</h2>
          <label>Prénom<input required maxLength={40} value={enfant.prenom} onChange={(e) => setEnfant({ ...enfant, prenom: e.target.value })} /></label>
          <label>Classe
            <select value={enfant.classe} onChange={(e) => setEnfant({ ...enfant, classe: e.target.value as Classe })}>
              {CLASSES.map((c) => <option key={c} value={c}>{c.toUpperCase()}</option>)}
            </select>
          </label>
          <label>Code secret (4 chiffres ; en primaire, 0 à 7 = étoile, lune, cœur, feuille, goutte, soleil, poisson, nuage)
            <input inputMode="numeric" maxLength={4} required value={enfant.code}
              pattern={['cp', 'ce1', 'ce2', 'cm1', 'cm2'].includes(enfant.classe) ? '[0-7]{4}' : '[0-9]{4}'}
              onChange={(e) => setEnfant({ ...enfant, code: e.target.value })} />
          </label>
          <button className="hp-btn hp-btn--primary">Créer le profil</button>
        </form>
      )}
      {message && <p className="muet" role="status">{message}</p>}
    </main>
  );
}
