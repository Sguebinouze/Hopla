import { useNavigate } from 'react-router-dom';
import { Icone } from '../composants/Icone';

// Crédits : sources des textes, voix, polices et code tiers, avec les mentions que leurs licences demandent.
export function Credits() {
  const naviguer = useNavigate();
  return (
    <main className="ecran ecran--etroit confidentialite">
      <div className="ligne">
        <button type="button" className="hp-iconbtn" aria-label="Retour" onClick={() => naviguer(-1)}><Icone nom="retour" /></button>
        <h1 className="titre-2 pousse">Crédits</h1>
      </div>

      <section>
        <h2 className="titre-3">Programmes</h2>
        <p>
          Les notions suivent les programmes officiels publiés au Bulletin officiel. Chaque notion cite sa source :
          numéro et date du Bulletin, page.
        </p>
      </section>

      <section>
        <h2 className="titre-3">Dictées</h2>
        <ul>
          <li>
            Dictées du CE1 au CM2 : Classetto, « Quarante dictées pour l’école élémentaire »,{' '}
            <a href="https://classetto.com/sources/#donnees-ouvertes" target="_blank" rel="noreferrer">classetto.com</a>,
            licence <a href="https://creativecommons.org/licenses/by/4.0/deed.fr" target="_blank" rel="noreferrer">CC BY 4.0</a>.
            Hopla découpe les textes en groupes à dicter.
          </li>
          <li>Extraits d’auteurs du domaine public, recopiés depuis Wikisource. L’auteur et l’œuvre s’affichent sous chaque dictée.</li>
        </ul>
      </section>

      <section>
        <h2 className="titre-3">Voix d’Octave</h2>
        <p>Synthèse vocale Google Cloud Text-to-Speech, voix Chirp 3 HD. Un texte sans voix enregistrée n’est pas lu.</p>
      </section>

      <section>
        <h2 className="titre-3">Polices</h2>
        <p>
          Fredoka (The Fredoka Project Authors) et Lexend (The Lexend Project Authors), sous licence{' '}
          <a href="https://openfontlicense.org" target="_blank" rel="noreferrer">SIL Open Font License 1.1</a>.
        </p>
      </section>

      <section>
        <h2 className="titre-3">Code tiers</h2>
        <p>
          Hopla utilise des bibliothèques libres : React, React Router, Supabase, Workbox, Tesseract.js (lecture des photos de leçon)
          et leurs dépendances, sous licences MIT, ISC, BSD, 0BSD et Apache 2.0.
        </p>
        <p><a href="/licences.txt" target="_blank" rel="noreferrer">Texte complet des licences</a></p>
      </section>

      <section>
        <h2 className="titre-3">Hopla.</h2>
        <p>Logo, Octave, avatars, illustrations, leçons et exercices : créations du projet.</p>
      </section>
    </main>
  );
}
