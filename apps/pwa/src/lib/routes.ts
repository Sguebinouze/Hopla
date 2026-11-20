// Adresses de haut niveau. La racine du site présente Hopla ; l'app commence à ENTREE.

/** Point d'entrée de l'app : choix du profil, connexion du parent, ou espace de l'enfant sur son appareil. */
export const ENTREE = '/app';

/** Pages légales, listées dans le pied de page de la présentation. */
export const PAGES_LEGALES = [
  { chemin: '/mentions-legales', titre: 'Mentions légales' },
  { chemin: '/cgu', titre: 'Conditions d’utilisation' },
  { chemin: '/cgv', titre: 'Conditions de vente' },
  { chemin: '/confidentialite', titre: 'Confidentialité' },
  { chemin: '/cookies', titre: 'Cookies et traceurs' },
  { chemin: '/accessibilite', titre: 'Accessibilité' },
  { chemin: '/supprimer-mon-compte', titre: 'Supprimer mon compte' },
  { chemin: '/credits', titre: 'Crédits et licences' },
] as const;
