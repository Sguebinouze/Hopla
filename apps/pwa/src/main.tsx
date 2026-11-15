import '@hopla/ds/tokens.css';
import '@hopla/ds/components.css';
import './app.css';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Accueil } from './pages/Accueil';
import { Code } from './pages/Code';
import { Exercice } from './pages/Exercice';
import { Lecon } from './pages/Lecon';
import { Controle } from './pages/Controle';
import { Defi } from './pages/Defi';
import { Matiere } from './pages/Matiere';
import { Parent } from './pages/Parent';
import { Profils } from './pages/Profils';
import { Resultat } from './pages/Resultat';

// Espace admin : module séparé, chargé seulement quand on ouvre /admin.
const Relecture = lazy(() => import('./pages/admin/Relecture'));

createRoot(document.getElementById('racine')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profils />} />
        <Route path="/code/:id" element={<Code />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/matiere/:matiere" element={<Matiere />} />
        <Route path="/lecon/:competence" element={<Lecon />} />
        <Route path="/defi/:id" element={<Defi />} />
        <Route path="/controle" element={<Controle />} />
        <Route path="/exercice/:competence" element={<Exercice />} />
        <Route path="/resultat" element={<Resultat />} />
        <Route path="/parent" element={<Parent />} />
        <Route path="/admin" element={<Navigate to="/admin/relecture" replace />} />
        <Route path="/admin/relecture" element={<Suspense fallback={<main className="ecran" aria-busy="true" />}><Relecture /></Suspense>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
