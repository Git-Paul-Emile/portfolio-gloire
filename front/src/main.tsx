import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error("L'element #root est introuvable dans index.html.");
}

/*
  Retrait du titre de repli.

  index.html porte un <title> ecrit en dur, qui sert au cas ou JavaScript ne
  s'execute pas. Des que l'application demarre, Seo.tsx en pose un autre, propre
  a la page affichee. Sous React 19, les balises de react-helmet-async sont
  ajoutees au <head> sans remplacer celles ecrites en dur : le document se
  retrouverait avec deux <title>, ce qui est invalide et fait echouer les audits.

  On supprime donc le repli au demarrage. Sans JavaScript il reste en place,
  puisque ce code ne s'execute jamais.
*/
document.querySelector('title[data-repli]')?.remove();

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
