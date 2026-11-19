# Marque Hopla.

## Le nom

- Le nom de marque s'écrit **Hopla.** : majuscule, point final.
- Avec le point : partout où le nom est seul, comme une marque. En-tête de l'appli (composant `Marque`), titre de l'onglet, nom de l'app installée (manifeste, `apple-mobile-web-app-title`), en-tête des e-mails, début d'un objet d'e-mail (« Hopla. Le bilan de la semaine »), fin de titre (« Bienvenue sur Hopla. »).
- Sans le point : dans une phrase, où il se lirait comme une fin de phrase. « Hopla ne demande que le prénom », « Installer Hopla », « Ouvrez Hopla depuis son icône ».
- Le point de marque est un rond `primary` de 0,19 em, posé sur la ligne de base (`.marque__point`). Dans un e-mail, un point typographique en `#4B3FD1`.

## Le logo

L'icône : « H. » blanc sur une touche `primary`, avec la lèvre `primary-strong` de 3 px des boutons pressables. Le H et le nom sont en Fredoka 600 vectorisé : les fichiers s'affichent pareil sans la police.

### Déclinaisons autorisées

Fichiers dans `packages/ds/marque/`, générés par `python3 scripts/marque/generer.py`. Aucune autre version n'est autorisée.

| Fichier | Forme | Fond |
|---|---|---|
| `hopla-logo.svg` | Horizontale, couleur | Clair : `surface-0`, `surface-1`, blanc. Version par défaut. |
| `hopla-logo-sombre.svg` | Horizontale, nom clair, point `primary` sombre | Sombre : `surface-0` sombre, `ink`. |
| `hopla-logo-inverse.svg` | Horizontale, touche blanche, nom blanc | `primary` uniquement. |
| `hopla-logo-mono-encre.svg` | Horizontale, une couleur `ink`, H et point évidés | Impression une couleur, fond clair hors DS. |
| `hopla-logo-mono-blanc.svg` | Horizontale, une couleur blanche, H et point évidés | Photo ou fond foncé hors DS. |
| `hopla-logo-vertical.svg`, `-vertical-sombre.svg` | Icône au-dessus du nom | Formats carrés ou hauts : réseaux sociaux, affiche, écran d'ouverture. |
| `hopla-icone.svg` (= `hopla-mark.svg`, `apps/pwa/public/icone.svg`) | Icône seule, couleur | Icône d'app, favicon, avatar de compte. |
| `hopla-icone-inverse.svg`, `-mono-encre.svg`, `-mono-blanc.svg` | Icône seule | Mêmes fonds que la version horizontale correspondante. |

Dans l'appli, le logo passe par le composant `Marque` (icône 36 px, nom 22 px `ink`, point `primary`), qui suit le thème clair ou sombre.

### Proportions et zone de protection

- Unité `x` = un quart de la hauteur de l'icône (12 px pour une icône de 48).
- Version horizontale : nom à 0,75 × la hauteur de l'icône, écart de `x` entre icône et nom, capitales centrées sur l'icône.
- Version verticale : nom à 0,4 × la hauteur de l'icône, écart de 0,2 × l'icône.
- Zone de protection : `x` de vide tout autour du logo. Aucun texte, bord ou image dans cette zone.

### Tailles minimales

| Forme | Écran | Impression |
|---|---|---|
| Icône | 16 px (favicon) | 6 mm |
| Horizontale | 96 px de large | 25 mm |
| Verticale | 64 px de large | 18 mm |

Sous ces tailles, utiliser l'icône seule.

### Interdits

- Recolorer, même avec une autre couleur du DS. `sun` reste réservé aux récompenses, `octave` au compagnon.
- Déformer, étirer, pivoter.
- Ajouter un contour, une ombre portée floue, un dégradé ou un effet.
- Réécrire le nom dans une autre police, en majuscules (« HOPLA ») ou sans le point.
- Séparer le point du nom, le remplacer par un point carré ou un autre signe.
- Poser la version couleur sur `primary` (la touche disparaît) ou sur une photo chargée : prendre la version inverse ou mono.
- Recomposer l'icône et le nom à la main avec d'autres écarts : utiliser les fichiers ou le composant `Marque`.
- Mettre Octave dans le logo ou le logo dans une bulle d'Octave.
