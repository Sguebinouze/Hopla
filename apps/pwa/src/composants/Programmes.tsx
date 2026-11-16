// Formulation factuelle sur le lien avec les programmes officiels.
// Rien qui suggère un agrément : Hopla est indépendant du ministère.

/** Mention courte, pour l'écran de connexion. */
export function MentionProgrammes() {
  return (
    <p className="mention-programmes">
      <strong>Conçu d’après les programmes officiels de l’Éducation nationale, du CP à la 3e.</strong>
    </p>
  );
}

/** Mention détaillée, pour l'espace parent. */
export function BlocProgrammes() {
  return (
    <section className="hp-card fiche__bloc">
      <h2 className="titre-2">Les programmes suivis</h2>
      <p style={{ margin: 0 }}>
        Hopla est conçu d’après les programmes officiels de l’Éducation nationale. Chaque notion travaillée correspond à un
        attendu du programme de la classe, celui qui s’applique cette année scolaire.
      </p>
      <p className="muet" style={{ margin: 0 }}>
        Hopla est un outil indépendant : il n’est ni édité ni agréé par le ministère de l’Éducation nationale.
        Il complète le travail fait en classe, il ne le remplace pas.
      </p>
    </section>
  );
}
