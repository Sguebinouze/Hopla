import '@hopla/ds/tokens.css';
import '@hopla/ds/components.css';
import './app.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Accueil } from './pages/Accueil';
import { Code } from './pages/Code';
import { Exercice } from './pages/Exercice';
import { Parent } from './pages/Parent';
import { Profils } from './pages/Profils';
import { Resultat } from './pages/Resultat';

createRoot(document.getElementById('racine')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profils />} />
        <Route path="/code/:id" element={<Code />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/exercice/:competence" element={<Exercice />} />
        <Route path="/resultat" element={<Resultat />} />
        <Route path="/parent" element={<Parent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
