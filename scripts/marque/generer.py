"""Déclinaisons du logo Hopla. en SVG vectorisés (aucune police requise à l'affichage).

    pip install fonttools brotli uharfbuzz skia-pathops
    python3 scripts/marque/generer.py

Règles d'usage : docs/marque.md. Sortie : packages/ds/marque/.
"""
import io, os
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

RACINE = os.path.join(os.path.dirname(__file__), '..', '..')
POLICE = os.path.join(RACINE, 'apps/pwa/node_modules/@fontsource/fredoka/files/fredoka-latin-600-normal.woff2')
SORTIE = os.path.join(RACINE, 'packages/ds/marque')

# Couleurs du DS (packages/ds/tokens.json)
PRIMARY, PRIMARY_STRONG, PRIMARY_DARK = '#4B3FD1', '#362BA8', '#8F84F5'
INK, INK_DARK, BLANC, LINE = '#1A1D3A', '#F1F2FA', '#FFFFFF', '#DCE0EE'

police = TTFont(POLICE)
# Contours fusionnés : sans chevauchements, la découpe d'une version monochrome reste nette.
from fontTools.ttLib.removeOverlaps import removeOverlaps
removeOverlaps(police)
tampon = io.BytesIO(); police.flavor = None; police.save(tampon)
face = hb.Face(tampon.getvalue()); hbfont = hb.Font(face)
glyphes = police.getGlyphSet(); ordre = police.getGlyphOrder(); upm = police['head'].unitsPerEm
n = lambda v: ('%.2f' % v).rstrip('0').rstrip('.')


def texte(chaine, x, base, taille):
    """Chemin SVG du texte composé (crénage compris) et sa largeur."""
    buf = hb.Buffer(); buf.add_str(chaine); buf.guess_segment_properties()
    hb.shape(hbfont, buf, {'kern': True, 'liga': True})
    s = taille / upm; stylo = SVGPathPen(glyphes, ntos=n); cx = 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        g = ordre[info.codepoint]
        glyphes[g].draw(TransformPen(stylo, (s, 0, 0, -s, x + (cx + pos.x_offset) * s, base)))
        cx += pos.x_advance
    return stylo.getCommands(), cx * s


def bornes(chaine):
    b = BoundsPen(glyphes); glyphes[police.getBestCmap()[ord(chaine)]].draw(b); return b.bounds


H_BAS = bornes('H')  # (xmin, ymin, xmax, ymax) en unités de police
HAUT_CAP = H_BAS[3] / upm

# Icône dans un carré de 48 : « H. » centré au-dessus de la lèvre de 3.
S_ICONE, BASE_ICONE, X0 = 0.026, 31.45, 12.1
H_ICONE, _ = texte('H', X0 - H_BAS[0] * S_ICONE, BASE_ICONE, S_ICONE * upm)
POINT_ICONE = (X0 + (H_BAS[2] - H_BAS[0]) * S_ICONE + 2.4 + 3.2, BASE_ICONE - 3.2, 3.2)


def tuile_chemin(x, y, w, h, r):
    return (f'M{n(x + r)} {n(y)}H{n(x + w - r)}A{n(r)} {n(r)} 0 0 1 {n(x + w)} {n(y + r)}V{n(y + h - r)}'
            f'A{n(r)} {n(r)} 0 0 1 {n(x + w - r)} {n(y + h)}H{n(x + r)}A{n(r)} {n(r)} 0 0 1 {n(x)} {n(y + h - r)}'
            f'V{n(y + r)}A{n(r)} {n(r)} 0 0 1 {n(x + r)} {n(y)}Z')


def cercle_chemin(cx, cy, r):
    return f'M{n(cx - r)} {n(cy)}a{n(r)} {n(r)} 0 1 0 {n(2 * r)} 0a{n(r)} {n(r)} 0 1 0 {n(-2 * r)} 0Z'


def icone(variante, dx=0, dy=0, k=1):
    """Icône 48×48 placée en (dx, dy) à l'échelle k."""
    t = f'transform="translate({n(dx)} {n(dy)}) scale({n(k)})"'
    cx, cy, r = POINT_ICONE
    if variante in ('mono-encre', 'mono-blanc'):
        # Une seule couleur : la tuile, H et point évidés (fond visible au travers).
        coul = INK if variante == 'mono-encre' else BLANC
        d = tuile_chemin(0, 0, 48, 48, 14) + H_ICONE + cercle_chemin(cx, cy, r)
        return f'<path {t} fill-rule="evenodd" fill="{coul}" d="{d}"/>'
    tuile, levre, lettre = (BLANC, LINE, PRIMARY) if variante == 'inverse' else (PRIMARY, PRIMARY_STRONG, BLANC)
    return (f'<g {t}><rect width="48" height="48" rx="14" fill="{levre}"/><rect width="48" height="45" rx="14" fill="{tuile}"/>'
            f'<path d="{H_ICONE}" fill="{lettre}"/><circle cx="{n(cx)}" cy="{n(cy)}" r="{n(r)}" fill="{lettre}"/></g>')


def nom(x, base, taille, coul_texte, coul_point):
    """« Hopla. » : nom en Fredoka 600 et point de marque rond de 0,19 em sur la ligne de base."""
    d, larg = texte('Hopla', x, base, taille)
    r = 0.095 * taille; cx = x + larg + 0.05 * taille + r
    return (f'<path d="{d}" fill="{coul_texte}"/><circle cx="{n(cx)}" cy="{n(base - r)}" r="{n(r)}" fill="{coul_point}"/>',
            cx + r - x)


COULEURS = {
    'clair': ('couleur', INK, PRIMARY), 'sombre': ('couleur', INK_DARK, PRIMARY_DARK),
    'inverse': ('inverse', BLANC, BLANC), 'mono-encre': ('mono-encre', INK, INK), 'mono-blanc': ('mono-blanc', BLANC, BLANC),
}


def svg(w, h, corps, titre):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {n(w)} {n(h)}" width="{n(w)}" height="{n(h)}" '
            f'role="img" aria-label="{titre}">{corps}</svg>\n')


def horizontal(var):
    ic, ct, cp = COULEURS[var]
    taille = 36  # 0,75 × hauteur de l'icône ; écart 12 = 0,25 × icône
    base = 24 + HAUT_CAP * taille / 2  # capitales centrées sur l'icône
    corps, larg = nom(60, base, taille, ct, cp)
    return svg(60 + larg, 48, icone(ic) + corps, 'Hopla.')


def vertical(var):
    ic, ct, cp = COULEURS[var]
    taille = 40; _, larg = nom(0, 0, taille, ct, cp)
    w = max(larg, 96); base = 96 + 20 + HAUT_CAP * taille
    descente = -police['hhea'].descent / upm * taille * 0.75  # jambage du p
    corps, _ = nom((w - larg) / 2, base, taille, ct, cp)
    return svg(w, base + descente, icone(ic, (w - 96) / 2, 0, 2) + corps, 'Hopla.')


fichiers = {
    'hopla-icone.svg': svg(48, 48, icone('couleur'), 'Hopla.'),
    'hopla-icone-inverse.svg': svg(48, 48, icone('inverse'), 'Hopla.'),
    'hopla-icone-mono-encre.svg': svg(48, 48, icone('mono-encre'), 'Hopla.'),
    'hopla-icone-mono-blanc.svg': svg(48, 48, icone('mono-blanc'), 'Hopla.'),
    **{f'hopla-logo{"" if v == "clair" else "-" + v}.svg': horizontal(v) for v in COULEURS},
    'hopla-logo-vertical.svg': vertical('clair'),
    'hopla-logo-vertical-sombre.svg': vertical('sombre'),
}
for nomf, contenu in fichiers.items():
    with open(os.path.join(SORTIE, nomf), 'w', encoding='utf-8') as f: f.write(contenu)
print(len(fichiers), 'fichiers dans packages/ds/marque/')
