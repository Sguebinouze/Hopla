"""Schémas de sciences dessinés par Hopla, en SVG.

    python3 scripts/images/schemas.py

Couleurs du DS (thème clair). Chaque schéma sort en brouillon avec sa fiche (licence hopla) et
s'attache aux questions listées : un humain le relit avant qu'il s'affiche.
"""
import json, os, glob, sys

RACINE = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..'))
IMAGES = os.path.join(RACINE, 'apps', 'pwa', 'public', 'images')
MEDIAS = os.path.join(RACINE, 'content', 'medias', 'schemas')
os.makedirs(MEDIAS, exist_ok=True)

ENCRE, TRAIT, FOND, CIEL, MER = '#1A1D3A', '#5B6077', '#FFFFFF', '#EAF3FD', '#9CC3F0'
JAUNE, ORANGE, VIOLET, VERT, GRIS = '#FFC53D', '#F76707', '#4B3FD1', '#2B8A3E', '#ADB5BD'
POLICE = 'font-family="Nunito, Arial, sans-serif" font-weight="700"'


def texte(x, y, t, taille=26, couleur=ENCRE, ancre='middle'):
    return f'<text x="{x}" y="{y}" font-size="{taille}" fill="{couleur}" text-anchor="{ancre}" {POLICE}>{t}</text>'


def fleche(x1, y1, x2, y2, couleur=VIOLET, epaisseur=5):
    """Trait terminé par une pointe."""
    import math
    a = math.atan2(y2 - y1, x2 - x1)
    p = [(x2, y2), (x2 - 22 * math.cos(a - 0.45), y2 - 22 * math.sin(a - 0.45)), (x2 - 22 * math.cos(a + 0.45), y2 - 22 * math.sin(a + 0.45))]
    bx, by = x2 - 16 * math.cos(a), y2 - 16 * math.sin(a)
    return (f'<line x1="{x1}" y1="{y1}" x2="{bx:.1f}" y2="{by:.1f}" stroke="{couleur}" stroke-width="{epaisseur}" stroke-linecap="round"/>'
            f'<polygon points="{" ".join(f"{u:.1f},{v:.1f}" for u, v in p)}" fill="{couleur}"/>')


def circuit_simple():
    """Circuit de CE1 : pile, lampe allumée, interrupteur fermé, fils."""
    s = [f'<rect width="960" height="600" fill="{FOND}"/>']
    fil = f'stroke="{ENCRE}" stroke-width="6" fill="none" stroke-linejoin="round" stroke-linecap="round"'
    # Fils : boucle rectangulaire, interrompue par la pile (bas), la lampe (haut) et l'interrupteur (droite).
    s.append(f'<path d="M380 470 L180 470 L180 150 L420 150" {fil}/>')
    s.append(f'<path d="M540 150 L780 150 L780 250" {fil}/>')
    s.append(f'<path d="M780 380 L780 470 L580 470" {fil}/>')
    # Pile : corps jaune, borne + et borne −.
    s.append(f'<rect x="380" y="430" width="200" height="80" rx="12" fill="{JAUNE}" stroke="{ENCRE}" stroke-width="4"/>')
    s.append(f'<rect x="580" y="452" width="16" height="36" rx="4" fill="{GRIS}" stroke="{ENCRE}" stroke-width="3"/>')
    s.append(texte(410, 482, '−', 34))
    s.append(texte(550, 482, '+', 34))
    s.append(texte(480, 560, 'pile'))
    # Lampe : culot, ampoule, filament et rayons (le circuit est fermé, elle brille).
    s.append(f'<rect x="452" y="150" width="56" height="34" rx="6" fill="{GRIS}" stroke="{ENCRE}" stroke-width="4"/>')
    s.append(f'<path d="M420 150 L452 160 M540 150 L508 160" {fil}/>')
    s.append(f'<circle cx="480" cy="110" r="52" fill="#FFF3C4" stroke="{ENCRE}" stroke-width="4"/>')
    s.append(f'<path d="M462 150 L462 116 Q471 98 480 116 Q489 98 498 116 L498 150" fill="none" stroke="{ORANGE}" stroke-width="4"/>')
    for x1, y1, x2, y2 in [(400, 70, 372, 52), (480, 38, 480, 8), (560, 70, 588, 52), (390, 116, 356, 116), (570, 116, 604, 116)]:
        s.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{ORANGE}" stroke-width="5" stroke-linecap="round"/>')
    s.append(texte(640, 120, 'lampe', ancre='start'))
    # Interrupteur fermé : deux plots, la lame posée sur le second.
    s.append(f'<circle cx="780" cy="250" r="10" fill="{ENCRE}"/><circle cx="780" cy="380" r="10" fill="{ENCRE}"/>')
    s.append(f'<line x1="780" y1="380" x2="780" y2="250" stroke="{ENCRE}" stroke-width="8" stroke-linecap="round"/>')
    s.append(f'<rect x="760" y="300" width="40" height="30" rx="6" fill="{VIOLET}"/>')
    s.append(texte(740, 325, 'interrupteur', ancre='end'))
    s.append(texte(210, 320, 'fil', ancre='start'))
    return 960, 600, s


def circuit_derivation():
    """Schéma normalisé : générateur, interrupteur fermé, deux lampes en dérivation."""
    s = [f'<rect width="960" height="560" fill="{FOND}"/>']
    fil = f'stroke="{ENCRE}" stroke-width="5" fill="none" stroke-linecap="round"'
    # Branche principale à gauche : générateur (traits long et court) et interrupteur.
    s.append(f'<path d="M160 120 L160 230 M160 290 L160 330 M160 400 L160 460 L400 460 M160 120 L400 120" {fil}/>')
    s.append(f'<line x1="120" y1="230" x2="200" y2="230" stroke="{ENCRE}" stroke-width="5"/>')
    s.append(f'<line x1="140" y1="252" x2="180" y2="252" stroke="{ENCRE}" stroke-width="12"/>')
    s.append(f'<path d="M160 252 L160 290" {fil}/>')
    s.append(texte(212, 230, '+', 30, ancre='start'))
    s.append(texte(70, 258, 'G', 30))
    # Interrupteur fermé.
    s.append(f'<circle cx="160" cy="330" r="7" fill="{ENCRE}"/><circle cx="160" cy="400" r="7" fill="{ENCRE}"/>')
    s.append(f'<line x1="160" y1="330" x2="160" y2="400" stroke="{ENCRE}" stroke-width="5"/>')
    s.append(texte(70, 372, 'K', 30))
    # Nœuds et deux branches, une lampe sur chacune (cercle barré).
    for x in (400,):
        s.append(f'<circle cx="{x}" cy="120" r="9" fill="{ENCRE}"/><circle cx="{x}" cy="460" r="9" fill="{ENCRE}"/>')
    s.append(f'<path d="M400 120 L800 120 M400 460 L800 460" {fil}/>')
    for x, nom in ((400, 'L1'), (800, 'L2')):
        s.append(f'<path d="M{x} 120 L{x} 245 M{x} 335 L{x} 460" {fil}/>')
        s.append(f'<circle cx="{x}" cy="290" r="45" fill="{FOND}" stroke="{ENCRE}" stroke-width="5"/>')
        s.append(f'<path d="M{x - 32} 258 L{x + 32} 322 M{x - 32} 322 L{x + 32} 258" stroke="{ENCRE}" stroke-width="5"/>')
        s.append(texte(x + 62, 300, nom, 30, ancre='start'))
    return 960, 560, s


def cycle_eau():
    """Cycle de l'eau : mer, soleil, évaporation, nuage, pluie, montagne, rivière."""
    s = [f'<rect width="960" height="640" fill="{CIEL}"/>']
    # Soleil.
    s.append(f'<circle cx="110" cy="100" r="52" fill="{JAUNE}"/>')
    # Mer à gauche, montagne et rivière à droite.
    s.append(f'<path d="M0 480 Q120 465 240 480 T480 480 L480 640 L0 640 Z" fill="{MER}"/>')
    s.append(f'<path d="M480 640 L480 520 Q540 470 600 420 L760 230 L960 380 L960 640 Z" fill="#B7D8A8"/>')
    s.append(f'<path d="M700 300 L760 230 L815 271 L780 290 L745 270 Z" fill="#FFFFFF"/>')
    s.append(f'<path d="M780 330 Q700 420 640 470 Q560 530 470 560" fill="none" stroke="#3E7BFA" stroke-width="12" stroke-linecap="round"/>')
    # Nuage.
    nuage = '<ellipse cx="560" cy="150" rx="120" ry="52"/><ellipse cx="500" cy="120" rx="60" ry="48"/><ellipse cx="610" cy="110" rx="70" ry="55"/>'
    # Contour d'abord (formes épaissies), puis les mêmes formes en blanc : un seul contour net.
    s.append(f'<g fill="#9AA3B5" stroke="#9AA3B5" stroke-width="6">{nuage}</g><g fill="#FFFFFF">{nuage}</g>')
    # Pluie sur la montagne.
    for x in range(660, 800, 30):
        s.append(f'<line x1="{x}" y1="215" x2="{x - 12}" y2="250" stroke="#3E7BFA" stroke-width="4" stroke-linecap="round"/>')
    # Flèches du cycle.
    s.append(fleche(220, 450, 220, 300))
    s.append(fleche(280, 450, 280, 300))
    s.append(fleche(330, 230, 430, 170))
    s.append(fleche(610, 500, 530, 545))
    s.append(texte(250, 285, 'évaporation', 26, VIOLET))
    s.append(texte(370, 150, 'condensation', 26, VIOLET))
    s.append(texte(880, 270, 'précipitations', 26, VIOLET))
    s.append(texte(650, 600, 'ruissellement', 26, VIOLET))
    s.append(texte(150, 560, 'mer', 28, ENCRE))
    return 960, 640, s


SCHEMAS = [
    # id, dessin, questions, texte alternatif (ne donne pas la réponse)
    ('schema-circuit-simple', circuit_simple, ['QM-C2-CE1-OBJ-01-004', 'QM-C2-CE1-OBJ-01-005'],
     'Schéma : une pile, une lampe et un interrupteur reliés par des fils'),
    ('schema-circuit-derivation', circuit_derivation, ['PC-C4-5E-ELEC-01-004'],
     'Schéma électrique : un générateur G, un interrupteur K et deux lampes L1 et L2'),
    ('schema-cycle-eau', cycle_eau, ['FR-C3-6E-LECT-03-003'],
     'Dessin avec des flèches : la mer, le soleil, un nuage, la pluie et une rivière'),
]

par_question = {}
for ident, dessin, questions, alt in SCHEMAS:
    l, h, morceaux = dessin()
    contenu = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {l} {h}" width="{l}" height="{h}">' + ''.join(morceaux) + '</svg>'
    open(os.path.join(IMAGES, f'{ident}.svg'), 'w', encoding='utf-8').write(contenu)
    print(ident, len(contenu.encode()) // 1024, 'Ko')
    fiche = os.path.join(MEDIAS, f'{ident}.json')
    if not os.path.exists(fiche):
        json.dump({
            'id': ident, 'fichier': f'{ident}.svg', 'alt': alt, 'licence': 'hopla',
            'source': {'nom': 'Hopla', 'auteur': None, 'titre': 'Schéma dessiné par Hopla', 'url': 'https://github.com/Sguebinouze/Hopla'},
            'credit': None, 'statut': 'brouillon', 'auteur': 'ia', 'relu_par': None,
        }, open(fiche, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
        open(fiche, 'a').write('\n')
    for q in questions:
        par_question[q] = ident

for f in glob.glob(os.path.join(RACINE, 'content', 'exercices', '*.json')):
    banque = json.load(open(f, encoding='utf-8'))
    touche = False
    for e in banque['exercices']:
        if e['id'] in par_question:
            e['image'] = par_question.pop(e['id'])
            touche = True
    if touche:
        with open(f, 'w', encoding='utf-8') as sortie:
            json.dump(banque, sortie, ensure_ascii=False, indent=2)
            sortie.write('\n')
if par_question:
    sys.exit(f'questions introuvables : {", ".join(par_question)}')
