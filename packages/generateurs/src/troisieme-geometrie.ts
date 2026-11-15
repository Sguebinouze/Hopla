// 3e, espace et géométrie (programme 2026) : théorème de Thalès et sa réciproque, trigonométrie dans le triangle
// rectangle, volume de la boule, sections de solides, vecteurs, relation de Chasles.
// Source : programme de mathématiques du cycle 4 (arrêté du 18 février 2026, BO n°10 du 5 mars 2026), p. 48 et 49.
import { depuisEntier } from './decimaux';
import { creerGenerateur, options } from './outils';

const LETTRES = 'ABCDEFGHIJKLMNPRSTUV';
const lettres = (a: { melanger: <T>(l: readonly T[]) => T[] }, n: number) => a.melanger([...LETTRES]).slice(0, n).sort();
const RAPPORTS: [number, number][] = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [4, 5]];

// ─────────── Théorème de Thalès

const THALES_OUI = 'Oui, d’après la réciproque du théorème de Thalès';
const THALES_NON = 'Non, d’après la contraposée du théorème de Thalès';

export const thales3e = creerGenerateur({
  id: 'thales-3e',
  competence: 'MA-C4-3E-THAL-01',
  cycle: 4,
  description: 'Calculer une longueur avec le théorème de Thalès ; prouver un parallélisme avec la réciproque ou la contraposée.',
  generer(a, d) {
    const [p, q] = a.choisir(RAPPORTS);
    const u = a.entier(1, 4);
    const v = a.entier(1, 5);
    const [am, ab, mn, bc] = [p * u, q * u, p * v, q * v];
    const contexte = d === 2
      ? `Les droites (BM) et (CN) se coupent en A, avec (MN) // (BC).`
      : `Dans le triangle ABC, M est sur [AB], N est sur [AC] et (MN) // (BC).`;
    if (d < 3) {
      // Une fois sur deux on cherche la petite longueur, sinon la grande.
      const cherchePetit = a.suivant() < 0.5;
      const consigne = cherchePetit
        ? `${contexte} AM = ${am} cm, AB = ${ab} cm et BC = ${bc} cm. Calcule MN, en cm.`
        : `${contexte} AM = ${am} cm, MN = ${mn} cm et BC = ${bc} cm. Calcule AB, en cm.`;
      const reponse = String(cherchePetit ? mn : ab);
      return {
        gabarit: 'saisie',
        consigne,
        reponse,
        indice: 'D’après le théorème de Thalès : AM/AB = AN/AC = MN/BC.',
        explication: cherchePetit
          ? `AM/AB = MN/BC, donc MN = BC × AM ÷ AB = ${bc} × ${am} ÷ ${ab} = ${mn}. MN mesure ${mn} cm.`
          : `AM/AB = MN/BC, donc AB = AM × BC ÷ MN = ${am} × ${bc} ÷ ${mn} = ${ab}. AB mesure ${ab} cm.`,
      };
    }
    // Réciproque ou contraposée.
    const w = a.entier(2, 5);
    const paralleles = a.suivant() < 0.5;
    const [an, ac] = [p * w + (paralleles ? 0 : 1), q * w];
    const reponse = paralleles ? THALES_OUI : THALES_NON;
    return {
      gabarit: 'qcm',
      consigne: `Les points A, M, B sont alignés dans cet ordre, ainsi que A, N, C. AM = ${am} cm, AB = ${ab} cm, AN = ${an} cm et AC = ${ac} cm. Les droites (MN) et (BC) sont-elles parallèles ?`,
      options: a.melanger([THALES_OUI, THALES_NON, 'Oui, d’après le théorème de Thalès', 'On ne peut pas conclure']),
      reponse,
      indice: 'Compare les quotients AM/AB et AN/AC. Le théorème de Thalès sert à calculer, sa réciproque à prouver un parallélisme.',
      explication: `AM/AB = ${am}/${ab}${u > 1 ? ` = ${p}/${q}` : ''} et AN/AC = ${an}/${ac}${paralleles && w > 1 ? ` = ${p}/${q}` : ''}. ${paralleles ? 'Les quotients sont égaux et les points sont alignés dans le même ordre : les droites sont parallèles.' : 'Les quotients ne sont pas égaux : les droites ne sont pas parallèles.'}`,
    };
  },
});

// ─────────── Trigonométrie

type Rapport = 'cos' | 'sin' | 'tan';
const NOMS_RAPPORT: Record<Rapport, string> = { cos: 'le cosinus', sin: 'le sinus', tan: 'la tangente' };
const DU_RAPPORT: Record<Rapport, string> = { cos: 'du cosinus', sin: 'du sinus', tan: 'de la tangente' };

export const trigonometrie3e = creerGenerateur({
  id: 'trigonometrie-3e',
  competence: 'MA-C4-3E-TRIG-01',
  cycle: 4,
  description: 'Utiliser le cosinus, le sinus et la tangente dans un triangle rectangle.',
  generer(a, d) {
    const [r, x, y] = a.melanger(lettres(a, 3));
    // Triangle rectangle en r ; angle aigu en x. Côtés : adjacent [rx], opposé [ry], hypoténuse [xy].
    const seg = (s: string, t: string) => [s, t].sort().join('');
    const [adj, opp, hyp] = [seg(r!, x!), seg(r!, y!), seg(x!, y!)];
    const triangle = [r, x, y].sort().join('');
    const angle = `${y}${x}̂${r}`;
    const rapport = a.choisir<Rapport>(['cos', 'sin', 'tan']);
    const contexte = `Le triangle ${triangle} est rectangle en ${r}.`;
    if (d === 1) {
      const quotient: Record<Rapport, string> = { cos: `${adj}/${hyp}`, sin: `${opp}/${hyp}`, tan: `${opp}/${adj}` };
      const reponse = quotient[rapport];
      return {
        gabarit: 'qcm',
        consigne: `${contexte} Quelle égalité donne ${rapport}(${angle}) ?`,
        options: options(a, reponse, [quotient.cos, quotient.sin, quotient.tan, `${hyp}/${adj}`].filter((o) => o !== reponse), () => `${adj}/${opp}`),
        reponse,
        indice: 'Cosinus : adjacent sur hypoténuse. Sinus : opposé sur hypoténuse. Tangente : opposé sur adjacent.',
        explication: `L’hypoténuse est [${hyp}], le côté adjacent à l’angle ${angle} est [${adj}], le côté opposé est [${opp}]. ${NOMS_RAPPORT[rapport][0]!.toUpperCase()}${NOMS_RAPPORT[rapport].slice(1)} vaut donc ${reponse}.`,
      };
    }
    if (d === 2) {
      // Côté connu × valeur du rapport.
      const enCentiemes = rapport === 'tan';
      const valeur = enCentiemes ? a.choisir([25, 50, 75, 125, 150]) : a.choisir([2, 4, 5, 6, 8]);
      const connu = enCentiemes ? 4 * a.entier(1, 6) : a.entier(5, 20);
      const [nomConnu, nomCherche] = rapport === 'tan' ? [adj, opp] : [hyp, rapport === 'cos' ? adj : opp];
      const reponse = depuisEntier(connu * valeur, enCentiemes ? 2 : 1);
      const v = depuisEntier(valeur, enCentiemes ? 2 : 1);
      return {
        gabarit: 'saisie',
        consigne: `${contexte} ${nomConnu} = ${connu} cm et ${rapport}(${angle}) = ${v}. Calcule ${nomCherche}, en cm.`,
        reponse,
        indice: `Écris l’égalité ${DU_RAPPORT[rapport]}, puis isole la longueur cherchée.`,
        explication: `${rapport}(${angle}) = ${nomCherche}/${nomConnu}, donc ${nomCherche} = ${nomConnu} × ${v} = ${connu} × ${v} = ${reponse} cm.`,
      };
    }
    // Hypoténuse : côté connu ÷ cosinus ou sinus.
    const fonction = a.choisir<Rapport>(['cos', 'sin']);
    const valeur = a.choisir([2, 4, 5, 6, 8]);
    const h = 5 * a.entier(1, 6);
    const cote = depuisEntier(h * valeur, 1);
    const nomCote = fonction === 'cos' ? adj : opp;
    const v = depuisEntier(valeur, 1);
    return {
      gabarit: 'saisie',
      consigne: `${contexte} ${nomCote} = ${cote} cm et ${fonction}(${angle}) = ${v}. Calcule l’hypoténuse ${hyp}, en cm.`,
      reponse: String(h),
      indice: `${fonction}(${angle}) = ${nomCote}/${hyp} : l’hypoténuse est au dénominateur.`,
      explication: `${fonction}(${angle}) = ${nomCote}/${hyp}, donc ${hyp} = ${nomCote} ÷ ${v} = ${cote} ÷ ${v} = ${h} cm.`,
    };
  },
});

// ─────────── Volume de la boule

const volumeBoule = (r: number) => (4 / 3) * Math.PI * r ** 3;

export const volumeBoule3e = creerGenerateur({
  id: 'volume-boule-3e',
  competence: 'MA-C4-3E-BOULE-01',
  cycle: 4,
  description: 'Calculer le volume d’une boule de rayon donné, arrondi à l’unité.',
  generer(a, d) {
    if (d === 3 && a.suivant() < 0.3) {
      const k = a.entier(2, 5);
      const reponse = String(k ** 3);
      return {
        gabarit: 'qcm',
        consigne: `On multiplie le rayon d’une boule par ${k}. Par combien son volume est-il multiplié ?`,
        options: options(a, reponse, [String(k), String(k * k), String(3 * k)].filter((o) => o !== reponse), () => String(k ** 3 + a.entier(1, 9))),
        reponse,
        indice: 'Dans la formule du volume, le rayon est au cube.',
        explication: `Le volume dépend de r³ : si le rayon est multiplié par ${k}, le volume est multiplié par ${k}³ = ${k ** 3}.`,
      };
    }
    const r = a.entier(1, d === 1 ? 12 : 15);
    const u = a.choisir(['mm', 'cm', 'dm', 'm']);
    const demi = d === 3;
    const v = Math.round(demi ? volumeBoule(r) / 2 : volumeBoule(r));
    const donnee = d === 1 ? `de rayon ${r} ${u}` : `de diamètre ${2 * r} ${u}`;
    return {
      gabarit: 'saisie',
      consigne: `Calcule le volume d’${demi ? 'une demi-boule' : 'une boule'} ${donnee}. Arrondis au ${u}³ près.`,
      reponse: String(v),
      indice: `Volume d’une boule : 4/3 × π × r³.${d > 1 ? ' Le rayon est la moitié du diamètre.' : ''}`,
      explication: `${d > 1 ? `r = ${2 * r} ÷ 2 = ${r} ${u}. ` : ''}V = 4/3 × π × ${r}³${demi ? ' ÷ 2' : ''}, soit environ ${v} ${u}³.`,
    };
  },
});

// ─────────── Sections de solides, sphère et boule

/** [consigne, réponse, pièges] : situations sans valeur numérique. */
const SECTIONS: [string, string, string[]][] = [
  ['On coupe un pavé droit par un plan parallèle à une face. Quelle est la nature de la section ?', 'un rectangle identique à cette face', ['un rectangle plus petit que cette face', 'un triangle', 'un disque']],
  ['On coupe un cube par un plan parallèle à une face. Quelle est la nature de la section ?', 'un carré identique à cette face', ['un rectangle quelconque', 'un triangle', 'un carré plus petit que cette face']],
  ['On coupe un cylindre par un plan perpendiculaire à son axe. Quelle est la nature de la section ?', 'un disque de même rayon que la base', ['un rectangle', 'un disque plus petit que la base', 'un triangle']],
  ['On coupe un cylindre par un plan parallèle à son axe. Quelle est la nature de la section ?', 'un rectangle', ['un disque', 'un cercle', 'un triangle']],
  ['On coupe une boule par un plan. Quelle est la nature de la section ?', 'un disque', ['un cercle', 'un rectangle', 'une sphère']],
  ['On coupe une sphère par un plan. Quelle est la nature de la section ?', 'un cercle', ['un disque', 'un rectangle', 'une boule']],
  ['On coupe une sphère par un plan qui passe par son centre. Quelle est la section ?', 'un grand cercle, de même rayon que la sphère', ['un cercle plus petit que la sphère', 'un point', 'un rectangle']],
];

export const sections3e = creerGenerateur({
  id: 'sections-solides-3e',
  competence: 'MA-C4-3E-SECT-01',
  cycle: 4,
  description: 'Connaitre la sphère et la boule, et la nature des sections d’un pavé, d’un cylindre, d’une boule.',
  generer(a, d) {
    if (d === 1) {
      if (a.suivant() < 0.4) {
        const r = a.entier(2, 12);
        const sphere = a.suivant() < 0.5;
        const reponse = sphere ? `les points situés à exactement ${r} cm de O` : `les points situés à ${r} cm ou moins de O`;
        return {
          gabarit: 'qcm',
          consigne: `Quels points forment ${sphere ? 'la sphère' : 'la boule'} de centre O et de rayon ${r} cm ?`,
          options: a.melanger([reponse, sphere ? `les points situés à ${r} cm ou moins de O` : `les points situés à exactement ${r} cm de O`, `les points situés à plus de ${r} cm de O`, `les points situés à exactement ${2 * r} cm de O`]),
          reponse,
          indice: 'La sphère est la « surface ». La boule est la sphère et tout son intérieur.',
          explication: sphere ? `La sphère contient les points à exactement ${r} cm du centre.` : `La boule contient la sphère et son intérieur : les points à ${r} cm ou moins du centre.`,
        };
      }
      const [consigne, reponse, pieges] = a.choisir(SECTIONS);
      return {
        gabarit: 'qcm', consigne, options: a.melanger([reponse, ...pieges]), reponse,
        indice: 'Imagine la coupe du solide par le plan, comme une tranche.',
        explication: `La section est ${reponse}.`,
      };
    }
    if (d === 2) {
      const solide = a.choisir(['pave', 'cylindre-perpendiculaire', 'cylindre-axe']);
      if (solide === 'pave') {
        const [l, w, h] = [a.entier(7, 12), a.entier(4, 6), a.entier(1, 3)];
        const reponse = `un rectangle de ${l} cm sur ${w} cm`;
        return {
          gabarit: 'qcm',
          consigne: `Un pavé droit mesure ${l} cm × ${w} cm × ${h} cm. On le coupe par un plan parallèle à la face de ${l} cm sur ${w} cm. Quelle est la section ?`,
          options: a.melanger([reponse, `un rectangle de ${l} cm sur ${h} cm`, `un rectangle de ${w} cm sur ${h} cm`, `un carré de ${l} cm de côté`]),
          reponse,
          indice: 'Une section parallèle à une face est identique à cette face.',
          explication: `La section est parallèle à la face de ${l} cm sur ${w} cm : c’est ${reponse}.`,
        };
      }
      const r = a.entier(2, 9);
      let h = r + a.entier(2, 9);
      if (h === 2 * r) h += 1;
      const perpendiculaire = solide === 'cylindre-perpendiculaire';
      const reponse = perpendiculaire ? `un disque de rayon ${r} cm` : `un rectangle de ${2 * r} cm sur ${h} cm`;
      const pieges = perpendiculaire ? [`un disque de rayon ${h} cm`, `un disque de rayon ${2 * r} cm`, `un rectangle de ${r} cm sur ${h} cm`] : [`un rectangle de ${r} cm sur ${h} cm`, `un disque de rayon ${r} cm`, `un rectangle de ${2 * r} cm sur ${2 * h} cm`];
      return {
        gabarit: 'qcm',
        consigne: `Un cylindre a pour rayon ${r} cm et pour hauteur ${h} cm. On le coupe par un plan ${perpendiculaire ? 'perpendiculaire à son axe' : 'qui contient son axe'}. Quelle est la section ?`,
        options: a.melanger([reponse, ...pieges]),
        reponse,
        indice: perpendiculaire ? 'La section est une copie de la base.' : 'La section contient l’axe : sa largeur est le diamètre.',
        explication: perpendiculaire ? `La section est un disque identique à la base : ${reponse}.` : `La largeur de la section est le diamètre, ${2 * r} cm, et sa longueur la hauteur : ${reponse}.`,
      };
    }
    // Rayon de la section d'une sphère, à la distance d du centre (Pythagore).
    const [R, dist, rayon] = a.choisir([[5, 3, 4], [5, 4, 3], [10, 6, 8], [10, 8, 6], [13, 5, 12], [13, 12, 5], [15, 9, 12], [15, 12, 9], [17, 8, 15], [17, 15, 8],
      [25, 7, 24], [25, 24, 7], [26, 10, 24], [20, 12, 16], [20, 16, 12], [25, 15, 20], [25, 20, 15], [29, 20, 21], [29, 21, 20], [30, 18, 24]] as const);
    const solide = a.choisir(['une sphère', 'une boule']);
    return {
      gabarit: 'saisie',
      consigne: `On coupe ${solide} de centre O et de rayon ${R} cm par un plan situé à ${dist} cm de O. Calcule le rayon de la section, en cm.`,
      reponse: String(rayon),
      indice: 'Le rayon de la sphère est l’hypoténuse d’un triangle rectangle formé avec la distance au centre et le rayon de la section.',
      explication: `D’après le théorème de Pythagore : r² = ${R}² − ${dist}² = ${R * R} − ${dist * dist} = ${rayon * rayon}, donc r = ${rayon} cm.`,
    };
  },
});

// ─────────── Vecteurs

const vect = (s: string) => `vecteur ${s}`;

export const vecteurs3e = creerGenerateur({
  id: 'vecteurs-3e',
  competence: 'MA-C4-3E-VECT-01',
  cycle: 4,
  description: 'Vecteurs égaux, vecteur opposé, translation et parallélogramme.',
  generer(a, d) {
    const [x, y, z, w] = lettres(a, 4) as [string, string, string, string];
    const formes = d === 1 ? ['egal', 'oppose'] : d === 2 ? ['egal', 'oppose', 'translation'] : ['egal-autre', 'translation', 'translation'];
    const forme = a.choisir(formes);
    if (forme === 'oppose') {
      const reponse = vect(y + x);
      return {
        gabarit: 'qcm',
        consigne: `Quel est l’opposé du ${vect(x + y)} ?`,
        options: a.melanger([reponse, vect(x + y), 'le vecteur nul']),
        reponse,
        indice: 'L’opposé d’un vecteur a la même direction, la même longueur, mais le sens contraire.',
        explication: `L’opposé du ${vect(x + y)} va de ${y} vers ${x} : c’est le ${reponse}.`,
      };
    }
    if (forme === 'translation') {
      const reponse = `${x}${y}${w}${z}`;
      return {
        gabarit: 'qcm',
        consigne: `L’image du point ${z} par la translation de ${vect(x + y)} est le point ${w}. Quel quadrilatère est un parallélogramme ?`,
        options: a.melanger([reponse, `${x}${y}${z}${w}`, `${x}${w}${y}${z}`]),
        reponse,
        indice: `Le ${vect(x + y)} est égal au ${vect(z + w)}. Attention à l’ordre des lettres.`,
        explication: `${vect(x + y)} = ${vect(z + w)}, donc ${x}${y}${w}${z} est un parallélogramme (on tourne dans l’ordre ${x}, ${y}, ${w}, ${z}).`,
      };
    }
    // Parallélogramme xyzw : xy = wz et xw = yz.
    const [depart, reponse, pieges] = forme === 'egal'
      ? [x + y, w + z, [z + w, y + z, x + w]]
      : [x + w, y + z, [z + y, x + y, w + z]];
    return {
      gabarit: 'qcm',
      consigne: `${x}${y}${z}${w} est un parallélogramme. Quel vecteur est égal au ${vect(depart)} ?`,
      options: a.melanger([vect(reponse), ...pieges.map(vect)]),
      reponse: vect(reponse),
      indice: 'Deux vecteurs égaux ont même direction, même sens et même longueur.',
      explication: `Dans le parallélogramme ${x}${y}${z}${w}, les côtés opposés sont parallèles et de même longueur. Le ${vect(depart)} est égal au ${vect(reponse)}, dans le même sens.`,
    };
  },
});

// ─────────── Relation de Chasles

export const chasles3e = creerGenerateur({
  id: 'relation-chasles-3e',
  competence: 'MA-C4-3E-VECT-02',
  cycle: 4,
  description: 'Additionner des vecteurs avec la relation de Chasles.',
  generer(a, d) {
    const [x, y, z, w] = a.melanger(lettres(a, 4)) as [string, string, string, string];
    let consigne: string;
    let reponse: string;
    let pieges: string[];
    let explication: string;
    if (d === 1) {
      if (a.suivant() < 0.2) {
        consigne = `${vect(x + y)} + ${vect(y + x)} = ?`;
        reponse = 'le vecteur nul';
        pieges = [vect(x + y), `2 × ${vect(x + y)}`, vect(y + x)];
        explication = `${vect(x + y)} + ${vect(y + x)} = ${vect(x + x)} : on revient au point de départ, c’est le vecteur nul.`;
      } else {
        consigne = `${vect(x + y)} + ${vect(y + z)} = ?`;
        reponse = vect(x + z);
        pieges = [vect(z + x), vect(y + z), vect(x + y)];
        explication = `Relation de Chasles : on va de ${x} à ${y}, puis de ${y} à ${z}. Résultat : ${reponse}.`;
      }
    } else if (d === 2) {
      consigne = `${vect(x + y)} + ${vect(y + z)} + ${vect(z + w)} = ?`;
      reponse = vect(x + w);
      pieges = [vect(w + x), vect(x + z), vect(y + w)];
      explication = `On enchaine : ${x} → ${y} → ${z} → ${w}. Résultat : ${reponse}.`;
    } else if (a.suivant() < 0.5) {
      // Réordonner : xy + zx = zx + xy = zy.
      consigne = `${vect(x + y)} + ${vect(z + x)} = ?`;
      reponse = vect(z + y);
      pieges = [vect(y + z), vect(x + z), vect(z + x)];
      explication = `On change l’ordre : ${vect(z + x)} + ${vect(x + y)} = ${vect(z + y)}.`;
    } else {
      // Soustraire : xy − zy = xy + yz = xz.
      consigne = `${vect(x + y)} − ${vect(z + y)} = ?`;
      reponse = vect(x + z);
      pieges = [vect(z + x), vect(x + y), vect(y + z)];
      explication = `Soustraire ${vect(z + y)}, c’est ajouter son opposé ${vect(y + z)} : ${vect(x + y)} + ${vect(y + z)} = ${vect(x + z)}.`;
    }
    return {
      gabarit: 'qcm',
      consigne: `Simplifie avec la relation de Chasles : ${consigne}`,
      options: a.melanger([reponse, ...pieges]),
      reponse,
      indice: 'Relation de Chasles : vecteur AB + vecteur BC = vecteur AC. La lettre du milieu doit se répéter.',
      explication,
    };
  },
});
