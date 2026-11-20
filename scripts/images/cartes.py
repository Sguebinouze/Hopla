"""Cartes des questions de géographie, dessinées en SVG à partir de Natural Earth (domaine public).

    python3 scripts/images/cartes.py dossier-natural-earth

Le dossier contient les fichiers GeoJSON de https://github.com/nvkelso/natural-earth-vector (dossier geojson) :
ne_110m_admin_0_countries, ne_50m_admin_0_countries, ne_50m_rivers_lake_centerlines.
Aucune carte ne porte de nom : elle montre un lieu (pays colorié, point), la question demande de le nommer
ou de le situer. Les cartes sortent en brouillon : un humain les relit avant qu'elles s'affichent.
"""
import json, math, os, sys

RACINE = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..'))
NE = sys.argv[1]
IMAGES = os.path.join(RACINE, 'apps', 'pwa', 'public', 'images')
MEDIAS = os.path.join(RACINE, 'content', 'medias', 'cartes')
os.makedirs(MEDIAS, exist_ok=True)

# Couleurs du DS (thème clair) : mer, terres, frontières, lieu mis en avant, fleuves, point.
MER, TERRE, BORD = '#D6E8F8', '#FFFFFF', '#B8BED6'
REPERE, REPERE_DOUX, FLEUVE, POINT, ENCRE = '#4B3FD1', '#C9C3F7', '#1F5FD6', '#FFC53D', '#1A1D3A'
METROPOLE = (-6, 10, 41, 52)  # France métropolitaine (Corse comprise), hors outre-mer

CARTES = [
    # id, emprise (lon min, lon max, lat min, lat max), échelle, pays coloriés, points (lon, lat), fleuves, questions, texte alternatif
    ('carte-monde', (-180, 180, -58, 84), '110m', [], [], False,
     ['QM-C2-CE1-ESP-02-003', 'HG-C2-CP-GEO-02-001', 'HG-C2-CP-GEO-02-006'],
     'Planisphère : les continents en blanc, les océans en bleu'),
    ('carte-monde-france', (-180, 180, -58, 84), '110m', ['FRA*'], [], False,
     ['HG-C2-CP-GEO-02-003', 'QM-C2-CE1-ESP-02-001', 'HG-C2-CP-GEO-05-008'],
     'Planisphère : la France est coloriée en violet'),
    ('carte-monde-europe', (-180, 180, -58, 84), '110m', ['@Europe'], [], False,
     ['HG-C3-CM1-GEO-02-003'], 'Planisphère : l’Europe est coloriée en violet'),
    ('carte-europe-france', (-12, 22, 34, 58), '50m', ['FRA*'], [], False,
     ['QM-C2-CE1-ESP-02-004', 'QM-C2-CE1-ESP-02-005', 'HG-C2-CP-GEO-04-007'],
     'Carte de l’Europe de l’Ouest : la France est coloriée en violet, la mer en bleu'),
    ('carte-amerique-sud-outre-mer', (-85, -30, -56, 14), '50m', ['FRA'], [], False,
     ['HG-C4-3E-GEO-05-002'], 'Carte de l’Amérique du Sud : un territoire français est colorié en violet'),
    ('carte-monde-reunion', (-180, 180, -58, 84), '110m', [], [(55.5, -21.1)], False,
     ['HG-C4-3E-GEO-05-003'], 'Planisphère : un point jaune marque une île'),
    ('carte-france-strasbourg', (-6, 11, 41, 52), '50m', ['FRA*'], [(7.75, 48.58)], False,
     ['HG-C4-3E-GEO-06-003'], 'Carte de France : un point jaune marque une ville près de la frontière est'),
    ('carte-canal-suez', (24, 46, 18, 37), '50m', [], [(32.35, 30.6)], False,
     ['HG-C4-4E-GEO-04-002'], 'Carte : un point jaune marque un canal entre deux mers'),
    ('carte-canal-panama', (-100, -60, -6, 26), '50m', [], [(-79.7, 9.1)], False,
     ['HG-C4-4E-GEO-04-005'], 'Carte : un point jaune marque un canal entre deux océans'),
    ('carte-etats-unis', (-130, -60, 18, 55), '50m', ['USA'], [], False,
     ['HG-C4-4E-GEO-06-003'], 'Carte : les États-Unis sont coloriés en violet, entourés d’océans'),
    ('carte-mali-niger-fleuve', (-18, 18, 3, 26), '50m', ['~MLI', '~NER'], [], True,
     ['HG-C4-4E-GEO-07-008'], 'Carte de l’Afrique de l’Ouest : deux pays coloriés, un grand fleuve en bleu les traverse'),
]


def charger(nom):
    return json.load(open(os.path.join(NE, f'ne_{nom}.geojson'), encoding='utf-8'))['features']


def anneaux(geometrie):
    if geometrie['type'] == 'Polygon':
        return [geometrie['coordinates']]
    if geometrie['type'] == 'MultiPolygon':
        return geometrie['coordinates']
    return []


def lignes(geometrie):
    if geometrie['type'] == 'LineString':
        return [geometrie['coordinates']]
    if geometrie['type'] == 'MultiLineString':
        return geometrie['coordinates']
    return []


def dessiner(ident, emprise, echelle, colories, points, fleuves):
    lon0, lon1, lat0, lat1 = emprise
    # Projection équirectangulaire, étirée selon la latitude moyenne pour une carte régionale.
    kx = 1 if lon1 - lon0 >= 300 else math.cos(math.radians((lat0 + lat1) / 2))
    largeur = 960
    hauteur = round(largeur * (lat1 - lat0) / ((lon1 - lon0) * kx))
    def xy(lon, lat):
        return ((lon - lon0) / (lon1 - lon0) * largeur, (lat1 - lat) / (lat1 - lat0) * hauteur)
    def chemin(points_, ferme=True):
        pts, dernier = [], None
        for lon, lat in points_:
            p = tuple(round(v) for v in xy(lon, lat))
            if p != dernier:
                pts.append(p)
                dernier = p
        if len(pts) < 2:
            return ''
        return 'M' + 'L'.join(f'{x:g},{y:g}' for x, y in pts) + ('Z' if ferme else '')
    def dedans(anneau):
        xs = [p[0] for p in anneau]
        ys = [p[1] for p in anneau]
        return max(xs) >= lon0 and min(xs) <= lon1 and max(ys) >= lat0 and min(ys) <= lat1
    def dans_metropole(anneau):
        a, b, c, d = METROPOLE
        return all(a <= lon <= b and c <= lat <= d for lon, lat in anneau[:20])
    def colorie(f, poly):
        code = f['properties'].get('ADM0_A3') or f['properties'].get('ISO_A3')
        continent = f['properties'].get('CONTINENT')
        for c in colories:
            # Continent : sans la Russie d'Asie ni les territoires lointains (Guyane, Réunion…).
            lon_, lat_ = poly[0][0]
            if c.startswith('@') and continent == c[1:] and code != 'RUS' and -30 <= lon_ <= 45 and lat_ >= 34:
                return REPERE
            if c == code or (c == f'{code}*' and dans_metropole(poly[0])):
                return REPERE
            if c == f'~{code}':
                return REPERE_DOUX
        return None
    morceaux = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {largeur} {hauteur}" width="{largeur}" height="{hauteur}">',
                f'<rect width="{largeur}" height="{hauteur}" fill="{MER}"/>']
    fond, avant = [], []
    for f in charger(f'{echelle}_admin_0_countries'):
        for poly in anneaux(f['geometry']):
            if not dedans(poly[0]):
                continue
            d = ''.join(chemin(a) for a in poly)
            couleur = colorie(f, poly)
            (avant if couleur else fond).append((d, couleur or TERRE))
    for d, couleur in fond + avant:
        morceaux.append(f'<path d="{d}" fill="{couleur}" stroke="{BORD}" stroke-width="0.8" stroke-linejoin="round"/>')
    if fleuves:
        for f in charger('50m_rivers_lake_centerlines'):
            for l in lignes(f['geometry']):
                if dedans(l):
                    morceaux.append(f'<path d="{chemin(l, False)}" fill="none" stroke="{FLEUVE}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>')
    for lon, lat in points:
        x, y = xy(lon, lat)
        morceaux.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="11" fill="{POINT}" stroke="{ENCRE}" stroke-width="3"/>')
    morceaux.append('</svg>')
    contenu = '\n'.join(morceaux)
    open(os.path.join(IMAGES, f'{ident}.svg'), 'w', encoding='utf-8').write(contenu)
    return len(contenu.encode())


par_question = {}
for ident, emprise, echelle, colories, points, fleuves, questions, alt in CARTES:
    taille = dessiner(ident, emprise, echelle, colories, points, fleuves)
    print(f'{ident} : {taille // 1024} Ko')
    fiche = os.path.join(MEDIAS, f'{ident}.json')
    if not os.path.exists(fiche):
        with open(fiche, 'w', encoding='utf-8') as f:
            json.dump({
                'id': ident, 'fichier': f'{ident}.svg', 'alt': alt, 'licence': 'domaine-public',
                'source': {'nom': 'Natural Earth', 'auteur': None, 'titre': 'Carte dessinée par Hopla à partir des données Natural Earth',
                           'url': 'https://www.naturalearthdata.com'},
                'credit': None, 'statut': 'brouillon', 'auteur': 'ia', 'relu_par': None,
            }, f, ensure_ascii=False, indent=2)
            f.write('\n')
    for q in questions:
        par_question[q] = ident

import glob
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
