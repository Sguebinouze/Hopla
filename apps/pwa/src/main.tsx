import '@hopla/ds/tokens.css';
import '@fontsource/fredoka/latin-500.css';
import '@fontsource/fredoka/latin-600.css';
import '@fontsource/lexend/latin-400.css';
import '@fontsource/lexend/latin-500.css';
import '@fontsource/lexend/latin-600.css';
import '@fontsource/lexend/latin-700.css';
import '@hopla/ds/components.css';
import './app.css';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MiseAJour } from './composants/MiseAJour';
import { Accueil } from './pages/Accueil';
import { Code } from './pages/Code';
import { Exercice } from './pages/Exercice';
import { FicheEnfant } from './pages/FicheEnfant';
import { Lecon } from './pages/Lecon';
import { Appairer } from './pages/Appairer';
import { Confidentialite } from './pages/Confidentialite';
import { PhotoLecon } from './pages/PhotoLecon';
import { Cahier } from './pages/Cahier';
import { Profil } from './pages/Profil';
import { Controle } from './pages/Controle';
import { Defi } from './pages/Defi';
import { Matiere } from './pages/Matiere';
import { Parent } from './pages/Parent';
import { ecouterInstallation } from './lib/installation';
import { Connexion } from './pages/Connexion';
import { Demarrer } from './pages/Demarrer';
import { Profils } from './pages/Profils';
import { Resultat } from './pages/Resultat';
import { Culture } from './pages/Culture';
import { Jeu, Jeux } from './pages/Jeux';
import { Credits } from './pages/Credits';
import { Dictee } from './pages/Dictee';

// Espace admin : module séparé, chargé seulement quand on ouvre /admin.
const Relecture = lazy(() => import('./pages/admin/Relecture'));

ecouterInstallation();

createRoot(document.getElementById('racine')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profils />} />
        <Route path="/code/:id" element={<Code />} />
        <Route path="/appairer" element={<Appairer />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/matiere/:matiere" element={<Matiere />} />
        <Route path="/lecon/:competence" element={<Lecon />} />
        <Route path="/defi/:id" element={<Defi />} />
        <Route path="/controle" element={<Controle />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/cahier" element={<Cahier />} />
        <Route path="/photo" element={<PhotoLecon />} />
        <Route path="/jeux" element={<Jeux />} />
        <Route path="/jeux/:jeu" element={<Jeu />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/demarrer" element={<Demarrer />} />
        <Route path="/exercice/:competence" element={<Exercice />} />
        <Route path="/dictee/:competence" element={<Dictee />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/resultat" element={<Resultat />} />
        <Route path="/parent" element={<Parent />} />
        <Route path="/parent/enfant/:id" element={<FicheEnfant />} />
        <Route path="/admin" element={<Navigate to="/admin/relecture" replace />} />
        <Route path="/admin/relecture" element={<Suspense fallback={<main className="ecran" aria-busy="true" />}><Relecture /></Suspense>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <MiseAJour />
    </BrowserRouter>
  </StrictMode>,
);
