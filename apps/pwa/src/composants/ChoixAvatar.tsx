import { Avatar, ecrireAvatar, lireAvatar, NOMS_PERSONNAGES, NOMS_TEINTES, PERSONNAGES, TEINTES } from './Avatar';

/** Choix du personnage puis de la teinte. Utilisé par l'enfant (profil) et par le parent (fiche). */
export function ChoixAvatar({ valeur, onChange, taille = 52 }: { valeur: string; onChange: (avatar: string) => void; taille?: number }) {
  const { personnage, teinte } = lireAvatar(valeur);
  return (
    <div className="choix-avatar">
      <div className="choix-avatar__ligne" role="radiogroup" aria-label="Personnage">
        {PERSONNAGES.map((p) => (
          <button key={p} type="button" role="radio" aria-checked={p === personnage} aria-label={NOMS_PERSONNAGES[p]}
            className={`fiche__avatar${p === personnage ? ' fiche__avatar--choisi' : ''}`} onClick={() => onChange(ecrireAvatar(p, teinte))}>
            <Avatar teinte={ecrireAvatar(p, teinte)} taille={taille} />
          </button>
        ))}
      </div>
      <div className="choix-avatar__ligne" role="radiogroup" aria-label="Couleur">
        {Object.entries(TEINTES).map(([t, [, corps]]) => (
          <button key={t} type="button" role="radio" aria-checked={t === teinte} aria-label={NOMS_TEINTES[t]}
            className={`choix-avatar__teinte${t === teinte ? ' choix-avatar__teinte--choisie' : ''}`}
            style={{ background: corps }} onClick={() => onChange(ecrireAvatar(personnage, t))} />
        ))}
      </div>
    </div>
  );
}
