# Marque Hopla.

## Le nom

- Le nom de marque s'écrit **Hopla.** : majuscule, point final.
- Avec le point : partout où le nom est seul, comme une marque. En-tête de l'appli (composant `Marque`), titre de l'onglet, nom de l'app installée (manifeste, `apple-mobile-web-app-title`), en-tête des e-mails, début d'un objet d'e-mail (« Hopla. Le bilan de la semaine »), fin de titre (« Bienvenue sur Hopla. »).
- Sans le point : dans une phrase, où il se lirait comme une fin de phrase. « Hopla ne demande que le prénom », « Installer Hopla », « Ouvrez Hopla depuis son icône ».
- Le point de marque est un rond `primary` de 0,19 em, posé sur la ligne de base (`.marque__point`). Dans un e-mail, un point typographique en `#4B3FD1`.

## Le logo

- Icône : « H. » blanc sur une touche `primary` avec la lèvre `primary-strong` de 3 px des boutons pressables. Le H est le glyphe Fredoka 600 vectorisé, centré avec le point dans la zone au-dessus de la lèvre.
- Sources : `packages/ds/hopla-mark.svg` (identique à `apps/pwa/public/icone.svg`). Dérivés : `icone-192.png`, `icone-512.png` (coins arrondis transparents), `icone-masquable-512.png` et `apple-touch-icon.png` (pleine page, le système arrondit).
- Dans l'appli, le logo passe toujours par le composant `Marque` (icône 36 px et nom 22 px Fredoka 600 `ink`). Pas d'icône seule à côté d'un nom tapé à la main.
- Interdits : recolorer l'icône, utiliser `sun` (réservé aux récompenses) ou `octave` (réservé au compagnon), ajouter un effet (dégradé, ombre portée floue), déformer, écrire le nom dans une autre police.
- Taille minimale : 16 px pour l'icône (onglet), 18 px de hauteur de capitale pour le nom.
