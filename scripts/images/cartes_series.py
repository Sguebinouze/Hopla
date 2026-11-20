"""Questions de géographie sur carte, en série : une carte par question, sans aucun nom écrit.

    python3 scripts/images/cartes_series.py dossier-natural-earth

La carte montre un lieu (continent, région, pays colorié ou point jaune), la question demande de le nommer.
Données Natural Earth (domaine public) : ne_110m_admin_0_countries, ne_50m_admin_0_countries.
Cartes et questions sortent en brouillon (auteur ia) : un humain les relit avant qu'elles s'affichent.
Relancer le script ne crée pas de doublon : une question déjà présente (même image) est laissée telle quelle.
"""
import json, math, os, sys

RACINE = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..'))
NE = sys.argv[1]
IMAGES = os.path.join(RACINE, 'apps', 'pwa', 'public', 'images')
MEDIAS = os.path.join(RACINE, 'content', 'medias', 'cartes')
EXERCICES = os.path.join(RACINE, 'content', 'exercices')

MER, TERRE, BORD = '#D6E8F8', '#FFFFFF', '#B8BED6'
REPERE, POINT, ENCRE = '#4B3FD1', '#FFC53D', '#1A1D3A'

MONDE = (-180, 180, -86, 88)
EUROPE = (-12, 35, 34, 71)
EUROPE_OUEST = (-12, 22, 34, 58)
ROUTES = (-20, 110, -5, 56)
CARAIBES = (-75, -55, 8, 22)
USA = (-128, -65, 23, 50)
AFRIQUE_OUEST = (-18, 16, 3, 25)

_cache = {}


def pays(echelle):
    if echelle not in _cache:
        _cache[echelle] = json.load(open(os.path.join(NE, f'ne_{echelle}_admin_0_countries.geojson'), encoding='utf-8'))['features']
    return _cache[echelle]


def anneaux(g):
    return [g['coordinates']] if g['type'] == 'Polygon' else g['coordinates'] if g['type'] == 'MultiPolygon' else []


def couper(anneau, x0, garder_est):
    """Sutherland-Hodgman : garde la partie d'un anneau à l'est (ou à l'ouest) du méridien x0."""
    dedans = (lambda p: p[0] >= x0) if garder_est else (lambda p: p[0] <= x0)
    sortie = []
    for i, p in enumerate(anneau):
        q = anneau[i - 1]
        if dedans(p):
            if not dedans(q):
                t = (x0 - q[0]) / (p[0] - q[0])
                sortie.append([x0, q[1] + t * (p[1] - q[1])])
            sortie.append(p)
        elif dedans(q):
            t = (x0 - q[0]) / (p[0] - q[0])
            sortie.append([x0, q[1] + t * (p[1] - q[1])])
    return sortie


OURAL = 60  # limite Europe / Asie retenue pour la Russie


def polygones_colories(f, poly, selection):
    """Morceaux du polygone `poly` du pays `f` à colorier pour la sélection, ou []."""
    pr = f['properties']
    code, continent = pr.get('ADM0_A3'), pr.get('CONTINENT')
    sorte, valeur = selection
    lon0, lat0 = poly[0][0]
    if sorte == 'pays':
        for v in valeur:
            metropole = v.endswith('*')
            if v.rstrip('*') == code and (not metropole or all(-6 <= x <= 10 and 41 <= y <= 52 for x, y in poly[0][:20])):
                return [poly]
        return []
    if sorte == 'banque-mondiale':
        return [poly] if pr.get('REGION_WB') == valeur else []
    if sorte == 'sous-region':
        return [poly] if pr.get('SUBREGION') == valeur else []
    if sorte == 'continent':
        if code == 'RUS':
            # La Russie compte pour l'Europe à l'ouest de l'Oural, pour l'Asie à l'est (Tchoukotka comprise).
            if all(x < -160 for x, _ in poly[0]):
                return [poly] if valeur == 'Asia' else []
            if valeur not in ('Europe', 'Asia'):
                return []
            morceau = [couper(a, OURAL, valeur == 'Asia') for a in poly]
            return [morceau] if len(morceau[0]) >= 3 else []
        if valeur == 'Americas':
            return [poly] if continent in ('North America', 'South America') else []
        if continent != valeur:
            return []
        # Europe sans les territoires lointains (Guyane, Réunion…).
        if valeur == 'Europe' and not (-30 <= lon0 <= 45 and lat0 >= 34):
            return []
        return [poly]
    raise ValueError(sorte)


def dessiner(ident, emprise, echelle, selection, points):
    lon0, lon1, lat0, lat1 = emprise
    kx = 1 if lon1 - lon0 >= 300 else math.cos(math.radians((lat0 + lat1) / 2))
    largeur = 960
    hauteur = round(largeur * (lat1 - lat0) / ((lon1 - lon0) * kx))

    def xy(lon, lat):
        return ((lon - lon0) / (lon1 - lon0) * largeur, (lat1 - lat) / (lat1 - lat0) * hauteur)

    def chemin(points_):
        pts, dernier = [], None
        for lon, lat in points_:
            p = tuple(round(v) for v in xy(max(lon0 - 5, min(lon1 + 5, lon)), max(lat0 - 5, min(lat1 + 5, lat))))
            # Un point à moins de 2 pixels du précédent n'ajoute rien de visible.
            if dernier is None or abs(p[0] - dernier[0]) + abs(p[1] - dernier[1]) >= 2:
                pts.append(p)
                dernier = p
        return 'M' + 'L'.join(f'{x},{y}' for x, y in pts) + 'Z' if len(pts) >= 3 else ''

    def visible(a):
        xs, ys = [p[0] for p in a], [p[1] for p in a]
        return max(xs) >= lon0 and min(xs) <= lon1 and max(ys) >= lat0 and min(ys) <= lat1

    fond, avant = [], []
    for f in pays(echelle):
        for poly in anneaux(f['geometry']):
            if not visible(poly[0]):
                continue
            fond.append(''.join(chemin(a) for a in poly))
            if selection:
                for morceau in polygones_colories(f, poly, selection):
                    avant.append(''.join(chemin(a) for a in morceau))
    s = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {largeur} {hauteur}" width="{largeur}" height="{hauteur}">',
         f'<rect width="{largeur}" height="{hauteur}" fill="{MER}"/>',
         f'<g fill="{TERRE}" stroke="{BORD}" stroke-width="0.8" stroke-linejoin="round">' + ''.join(f'<path d="{d}"/>' for d in fond if d) + '</g>']
    if avant:
        s.append(f'<g fill="{REPERE}" stroke="{BORD}" stroke-width="0.8" stroke-linejoin="round">' + ''.join(f'<path d="{d}"/>' for d in avant if d) + '</g>')
    for lon, lat in points:
        x, y = xy(lon, lat)
        s.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="11" fill="{POINT}" stroke="{ENCRE}" stroke-width="3"/>')
    s.append('</svg>')
    contenu = '\n'.join(s)
    open(os.path.join(IMAGES, f'{ident}.svg'), 'w', encoding='utf-8').write(contenu)
    return len(contenu.encode())


# ─────────── Les séries : carte, puis question(s) posée(s) avec elle.
# Question : (compétence, difficulté, consigne, options (réponse en premier), indice, explication)

CONTINENT = 'Quel continent est colorié en violet ?'
CONTINENT_CE1 = 'Sur ce planisphère, quel continent est en violet ?'
OCEAN = 'Quel océan est marqué d’un point jaune ?'
OCEAN_CE1 = 'Sur ce planisphère, comment s’appelle l’océan marqué d’un point ?'
AIRE = 'Quelle grande aire régionale est coloriée sur le planisphère ?'
FOYER = 'Quel grand foyer de population est colorié sur le planisphère ?'
OUTREMER = 'Quel territoire ultramarin français est marqué d’un point jaune ?'
UE = 'Quel pays de l’Union européenne est colorié sur la carte ?'
PASSAGE = 'Quel passage maritime est marqué d’un point jaune ?'
METROPOLE = 'Quelle métropole mondiale est marquée d’un point jaune ?'
VILLE_USA = 'Quelle ville des États-Unis est marquée d’un point jaune ?'
AFRIQUE_O = 'Quel pays d’Afrique de l’Ouest est colorié sur la carte ?'


def continent(nom, cle, autres_cp, autres_ce1, indice, explication):
    return (f'carte-continent-{nom}', MONDE, '110m', ('continent', cle), [], 'Planisphère : un continent est colorié en violet', [
        ('HG-C2-CP-GEO-02', 1, CONTINENT, autres_cp, indice, explication),
        ('QM-C2-CE1-ESP-02', 2, CONTINENT_CE1, autres_ce1, indice, explication),
    ])


def ocean(nom, point, autres_cp, autres_ce1, indice, explication):
    return (f'carte-ocean-{nom}', MONDE, '110m', None, [point], 'Planisphère : un point jaune est posé dans un océan', [
        ('HG-C2-CP-GEO-02', 1, OCEAN, autres_cp, indice, explication),
        ('QM-C2-CE1-ESP-02', 2, OCEAN_CE1, autres_ce1, indice, explication),
    ])


def une(ident, emprise, echelle, selection, points, alt, competence, difficulte, consigne, options, indice, explication):
    return (ident, emprise, echelle, selection, points, alt, [(competence, difficulte, consigne, options, indice, explication)])


SERIES = [
    continent('afrique', 'Africa', ['l’Afrique', 'l’Europe', 'l’Asie'], ['l’Afrique', 'l’Europe', 'l’Asie', 'l’Amérique'],
              'Il est au sud de l’Europe.', 'C’est l’Afrique, au sud de l’Europe.'),
    continent('amerique', 'Americas', ['l’Amérique', 'l’Afrique', 'l’Océanie'], ['l’Amérique', 'l’Afrique', 'l’Océanie', 'l’Asie'],
              'Il est à gauche sur le planisphère.', 'C’est l’Amérique, de l’autre côté de l’océan Atlantique.'),
    continent('asie', 'Asia', ['l’Asie', 'l’Europe', 'l’Amérique'], ['l’Asie', 'l’Europe', 'l’Amérique', 'l’Océanie'],
              'C’est le plus grand continent.', 'C’est l’Asie, le plus grand continent.'),
    continent('europe', 'Europe', ['l’Europe', 'l’Afrique', 'l’Océanie'], ['l’Europe', 'l’Afrique', 'l’Océanie', 'l’Asie'],
              'La France est sur ce continent.', 'C’est l’Europe. La France est en Europe.'),
    continent('oceanie', 'Oceania', ['l’Océanie', 'l’Amérique', 'l’Afrique'], ['l’Océanie', 'l’Amérique', 'l’Afrique', 'l’Antarctique'],
              'Il est en bas à droite, entouré d’océans.', 'C’est l’Océanie, avec l’Australie.'),
    continent('antarctique', 'Antarctica', ['l’Antarctique', 'l’Europe', 'l’Asie'], ['l’Antarctique', 'l’Europe', 'l’Asie', 'l’Océanie'],
              'Il est tout en bas, au pôle Sud.', 'C’est l’Antarctique, couvert de glace.'),
    ocean('atlantique', (-35, 25), ['l’océan Atlantique', 'l’océan Pacifique', 'l’océan Indien'],
          ['l’océan Atlantique', 'l’océan Pacifique', 'l’océan Indien', 'l’océan Arctique'],
          'Il borde la France à l’ouest.', 'C’est l’océan Atlantique, entre l’Europe et l’Amérique.'),
    ocean('pacifique', (-140, 5), ['l’océan Pacifique', 'l’océan Atlantique', 'l’océan Arctique'],
          ['l’océan Pacifique', 'l’océan Atlantique', 'l’océan Arctique', 'l’océan Indien'],
          'C’est le plus grand océan.', 'C’est l’océan Pacifique, le plus grand océan.'),
    ocean('indien', (78, -22), ['l’océan Indien', 'l’océan Pacifique', 'l’océan Atlantique'],
          ['l’océan Indien', 'l’océan Pacifique', 'l’océan Atlantique', 'l’océan Austral'],
          'Il est au sud de l’Asie.', 'C’est l’océan Indien, entre l’Afrique et l’Australie.'),
    ocean('arctique', (0, 81), ['l’océan Arctique', 'l’océan Austral', 'l’océan Indien'],
          ['l’océan Arctique', 'l’océan Austral', 'l’océan Indien', 'l’océan Pacifique'],
          'Il est tout en haut, au pôle Nord.', 'C’est l’océan Arctique, autour du pôle Nord.'),
    ocean('austral', (-110, -63), ['l’océan Austral', 'l’océan Arctique', 'l’océan Atlantique'],
          ['l’océan Austral', 'l’océan Arctique', 'l’océan Atlantique', 'l’océan Indien'],
          'Il entoure l’Antarctique.', 'C’est l’océan Austral, autour de l’Antarctique.'),

    # CM1 : grandes aires régionales.
    une('carte-aire-afrique-subsaharienne', MONDE, '110m', ('banque-mondiale', 'Sub-Saharan Africa'), [], 'Planisphère : une grande région du monde est coloriée en violet',
        'HG-C3-CM1-GEO-02', 1, AIRE, ['l’Afrique subsaharienne', 'le Maghreb', 'l’Asie du Sud', 'l’Amérique latine'],
        'Elle se trouve au sud du désert du Sahara.', 'C’est l’Afrique subsaharienne, au sud du Sahara.'),
    une('carte-aire-maghreb', MONDE, '110m', ('pays', ['MAR', 'DZA', 'TUN']), [], 'Planisphère : une région du monde est coloriée en violet',
        'HG-C3-CM1-GEO-02', 2, AIRE, ['le Maghreb', 'l’Afrique subsaharienne', 'le Moyen-Orient', 'l’Europe'],
        'Ces pays bordent la Méditerranée, au nord de l’Afrique.', 'C’est le Maghreb : le Maroc, l’Algérie et la Tunisie.'),
    une('carte-aire-amerique-du-nord', MONDE, '110m', ('pays', ['USA', 'CAN']), [], 'Planisphère : une grande région du monde est coloriée en violet',
        'HG-C3-CM1-GEO-02', 1, AIRE, ['l’Amérique du Nord', 'l’Amérique latine', 'l’Europe', 'l’Asie de l’Est'],
        'Elle occupe le nord du continent américain.', 'C’est l’Amérique du Nord : le Canada et les États-Unis.'),
    une('carte-aire-amerique-latine', MONDE, '110m', ('banque-mondiale', 'Latin America & Caribbean'), [], 'Planisphère : une grande région du monde est coloriée en violet',
        'HG-C3-CM1-GEO-02', 1, AIRE, ['l’Amérique latine', 'l’Amérique du Nord', 'l’Afrique subsaharienne', 'l’Asie du Sud'],
        'On y parle surtout espagnol et portugais.', 'C’est l’Amérique latine, du Mexique à la pointe sud de l’Amérique.'),
    une('carte-aire-asie-de-l-est', MONDE, '110m', ('sous-region', 'Eastern Asia'), [], 'Planisphère : une grande région du monde est coloriée en violet',
        'HG-C3-CM1-GEO-02', 2, AIRE, ['l’Asie de l’Est', 'l’Asie du Sud', 'l’Océanie', 'l’Europe'],
        'Elle borde l’océan Pacifique, au nord-est de l’Inde.', 'C’est l’Asie de l’Est, avec la Chine, la Corée et le Japon.'),
    une('carte-aire-asie-du-sud', MONDE, '110m', ('banque-mondiale', 'South Asia'), [], 'Planisphère : une grande région du monde est coloriée en violet',
        'HG-C3-CM1-GEO-02', 2, AIRE, ['l’Asie du Sud', 'l’Asie de l’Est', 'le Maghreb', 'l’Afrique subsaharienne'],
        'Elle s’avance dans l’océan Indien.', 'C’est l’Asie du Sud, avec l’Inde, le Pakistan et le Bangladesh.'),

    # 6e : grands foyers de population.
    une('carte-foyer-asie-de-l-est', MONDE, '110m', ('pays', ['CHN', 'JPN', 'KOR', 'PRK', 'TWN']), [], 'Planisphère : une région très peuplée est coloriée en violet',
        'HG-C3-6E-GEO-04', 2, FOYER, ['l’Asie de l’Est', 'l’Asie du Sud', 'l’Europe', 'l’Afrique de l’Ouest'],
        'Ce foyer borde l’océan Pacifique.', 'C’est l’Asie de l’Est : la Chine, le Japon et la Corée.'),
    une('carte-foyer-asie-du-sud', MONDE, '110m', ('pays', ['IND', 'PAK', 'BGD', 'NPL', 'LKA']), [], 'Planisphère : une région très peuplée est coloriée en violet',
        'HG-C3-6E-GEO-04', 2, FOYER, ['l’Asie du Sud', 'l’Asie de l’Est', 'l’Europe', 'l’Afrique de l’Ouest'],
        'Ce foyer s’avance dans l’océan Indien.', 'C’est l’Asie du Sud : l’Inde, le Pakistan et le Bangladesh.'),
    une('carte-foyer-europe', MONDE, '110m', ('continent', 'Europe'), [], 'Planisphère : une région très peuplée est coloriée en violet',
        'HG-C3-6E-GEO-04', 2, FOYER, ['l’Europe', 'l’Asie de l’Est', 'l’Asie du Sud', 'l’Amérique du Nord'],
        'C’est le troisième foyer de population du monde.', 'C’est l’Europe, troisième grand foyer de population.'),

    # 3e : territoires ultramarins.
    une('carte-outremer-guadeloupe', CARAIBES, '50m', None, [(-61.55, 16.2)], 'Carte de la mer des Caraïbes : un point jaune marque une île',
        'HG-C4-3E-GEO-05', 2, OUTREMER, ['la Guadeloupe', 'la Martinique', 'la Guyane', 'Saint-Pierre-et-Miquelon'],
        'Cette île est au nord de la Martinique.', 'C’est la Guadeloupe, dans les Antilles, au nord de la Martinique.'),
    une('carte-outremer-martinique', CARAIBES, '50m', None, [(-61.0, 14.65)], 'Carte de la mer des Caraïbes : un point jaune marque une île',
        'HG-C4-3E-GEO-05', 2, OUTREMER, ['la Martinique', 'la Guadeloupe', 'la Guyane', 'La Réunion'],
        'Cette île est au sud de la Guadeloupe.', 'C’est la Martinique, dans les Antilles, au sud de la Guadeloupe.'),
    une('carte-outremer-mayotte', MONDE, '110m', None, [(45.15, -12.8)], 'Planisphère : un point jaune marque une île',
        'HG-C4-3E-GEO-05', 1, OUTREMER, ['Mayotte', 'La Réunion', 'la Nouvelle-Calédonie', 'la Polynésie française'],
        'Cette île est entre Madagascar et l’Afrique.', 'C’est Mayotte, dans l’océan Indien, entre Madagascar et l’Afrique.'),
    une('carte-outremer-nouvelle-caledonie', MONDE, '110m', None, [(165.5, -21.3)], 'Planisphère : un point jaune marque une île',
        'HG-C4-3E-GEO-05', 1, OUTREMER, ['la Nouvelle-Calédonie', 'la Polynésie française', 'Mayotte', 'la Martinique'],
        'Elle se trouve à l’est de l’Australie.', 'C’est la Nouvelle-Calédonie, dans l’océan Pacifique, à l’est de l’Australie.'),
    une('carte-outremer-polynesie', MONDE, '110m', None, [(-149.5, -17.6)], 'Planisphère : un point jaune marque des îles',
        'HG-C4-3E-GEO-05', 1, OUTREMER, ['la Polynésie française', 'la Nouvelle-Calédonie', 'La Réunion', 'la Guadeloupe'],
        'Ses îles sont au milieu de l’océan Pacifique.', 'C’est la Polynésie française, au milieu de l’océan Pacifique.'),
    une('carte-outremer-saint-pierre', MONDE, '110m', None, [(-56.3, 46.9)], 'Planisphère : un point jaune marque des îles',
        'HG-C4-3E-GEO-05', 2, OUTREMER, ['Saint-Pierre-et-Miquelon', 'la Guadeloupe', 'la Guyane', 'Mayotte'],
        'Ces îles sont au large du Canada.', 'C’est Saint-Pierre-et-Miquelon, dans l’Atlantique Nord, au large du Canada.'),

    # 3e : pays de l'Union européenne.
    une('carte-ue-allemagne', EUROPE, '50m', ('pays', ['DEU']), [], 'Carte de l’Europe : un pays est colorié en violet',
        'HG-C4-3E-GEO-06', 1, UE, ['l’Allemagne', 'la Pologne', 'la France', 'l’Autriche'],
        'C’est le pays le plus peuplé de l’Union européenne.', 'C’est l’Allemagne, voisine de la France à l’est.'),
    une('carte-ue-espagne', EUROPE, '50m', ('pays', ['ESP']), [], 'Carte de l’Europe : un pays est colorié en violet',
        'HG-C4-3E-GEO-06', 1, UE, ['l’Espagne', 'le Portugal', 'l’Italie', 'la France'],
        'Il est au sud-ouest de la France, de l’autre côté des Pyrénées.', 'C’est l’Espagne, séparée de la France par les Pyrénées.'),
    une('carte-ue-italie', EUROPE, '50m', ('pays', ['ITA']), [], 'Carte de l’Europe : un pays est colorié en violet',
        'HG-C4-3E-GEO-06', 1, UE, ['l’Italie', 'la Grèce', 'l’Espagne', 'la Croatie'],
        'Il a la forme d’une botte.', 'C’est l’Italie, une péninsule en forme de botte.'),
    une('carte-ue-pologne', EUROPE, '50m', ('pays', ['POL']), [], 'Carte de l’Europe : un pays est colorié en violet',
        'HG-C4-3E-GEO-06', 2, UE, ['la Pologne', 'l’Allemagne', 'la Roumanie', 'la Suède'],
        'Il est à l’est de l’Allemagne, au bord de la mer Baltique.', 'C’est la Pologne, entre l’Allemagne et l’Ukraine.'),
    une('carte-ue-suede', EUROPE, '50m', ('pays', ['SWE']), [], 'Carte de l’Europe : un pays est colorié en violet',
        'HG-C4-3E-GEO-06', 2, UE, ['la Suède', 'la Finlande', 'la Pologne', 'le Danemark'],
        'Ce pays du nord de l’Europe borde la mer Baltique à l’ouest.', 'C’est la Suède, en Scandinavie.'),
    une('carte-ue-belgique', EUROPE, '50m', ('pays', ['BEL']), [], 'Carte de l’Europe : un pays est colorié en violet',
        'HG-C4-3E-GEO-06', 2, UE, ['la Belgique', 'les Pays-Bas', 'le Luxembourg', 'l’Autriche'],
        'Il est au nord de la France. Sa capitale accueille des institutions européennes.', 'C’est la Belgique. Bruxelles accueille la Commission européenne.'),
    une('carte-ue-grece', EUROPE, '50m', ('pays', ['GRC']), [], 'Carte de l’Europe : un pays est colorié en violet',
        'HG-C4-3E-GEO-06', 2, UE, ['la Grèce', 'l’Italie', 'la Bulgarie', 'Chypre'],
        'Il est au sud-est de l’Europe et compte de nombreuses îles.', 'C’est la Grèce, au sud-est de l’Europe.'),

    # 4e : passages maritimes.
    une('carte-passage-gibraltar', ROUTES, '50m', None, [(-5.6, 36.0)], 'Carte de l’Europe à l’Asie : un point jaune marque un passage entre deux mers',
        'HG-C4-4E-GEO-04', 1, PASSAGE, ['le détroit de Gibraltar', 'le détroit d’Ormuz', 'le détroit de Malacca', 'le canal de Suez'],
        'Il relie la Méditerranée à l’océan Atlantique.', 'C’est le détroit de Gibraltar, entre l’Espagne et le Maroc.'),
    une('carte-passage-ormuz', ROUTES, '50m', None, [(56.4, 26.5)], 'Carte de l’Europe à l’Asie : un point jaune marque un passage entre deux mers',
        'HG-C4-4E-GEO-04', 2, PASSAGE, ['le détroit d’Ormuz', 'le détroit de Gibraltar', 'le détroit de Malacca', 'le canal de Suez'],
        'Le pétrole du golfe Persique passe par là.', 'C’est le détroit d’Ormuz, à la sortie du golfe Persique.'),
    une('carte-passage-malacca', ROUTES, '50m', None, [(100.5, 3.0)], 'Carte de l’Europe à l’Asie : un point jaune marque un passage entre deux mers',
        'HG-C4-4E-GEO-04', 2, PASSAGE, ['le détroit de Malacca', 'le détroit d’Ormuz', 'le canal de Suez', 'le détroit de Gibraltar'],
        'Il longe la Malaisie, entre l’océan Indien et la mer de Chine.', 'C’est le détroit de Malacca, l’un des plus fréquentés du monde.'),
    une('carte-passage-pas-de-calais', ROUTES, '50m', None, [(1.5, 51.0)], 'Carte de l’Europe à l’Asie : un point jaune marque un passage entre deux mers',
        'HG-C4-4E-GEO-04', 1, PASSAGE, ['le pas de Calais', 'le détroit de Gibraltar', 'le Bosphore', 'le détroit d’Ormuz'],
        'Il sépare la France du Royaume-Uni.', 'C’est le pas de Calais, entre la Manche et la mer du Nord.'),
    une('carte-passage-bab-el-mandeb', ROUTES, '50m', None, [(43.4, 12.6)], 'Carte de l’Europe à l’Asie : un point jaune marque un passage entre deux mers',
        'HG-C4-4E-GEO-04', 2, PASSAGE, ['le détroit de Bab-el-Mandeb', 'le détroit d’Ormuz', 'le canal de Suez', 'le détroit de Gibraltar'],
        'Il relie la mer Rouge à l’océan Indien.', 'C’est le détroit de Bab-el-Mandeb, au sud de la mer Rouge.'),
    une('carte-passage-bosphore', ROUTES, '50m', None, [(29.0, 41.1)], 'Carte de l’Europe à l’Asie : un point jaune marque un passage entre deux mers',
        'HG-C4-4E-GEO-04', 2, PASSAGE, ['le Bosphore', 'le détroit de Gibraltar', 'le pas de Calais', 'le détroit de Malacca'],
        'Il traverse Istanbul, entre la mer Noire et la Méditerranée.', 'C’est le Bosphore, qui traverse Istanbul.'),

    # 4e : métropoles mondiales.
    une('carte-metropole-new-york', MONDE, '110m', None, [(-74.0, 40.7)], 'Planisphère : un point jaune marque une ville',
        'HG-C4-4E-GEO-05', 1, METROPOLE, ['New York', 'Londres', 'Tokyo', 'Shanghai'],
        'Elle est sur la côte est des États-Unis.', 'C’est New York, sur la façade atlantique des États-Unis.'),
    une('carte-metropole-tokyo', MONDE, '110m', None, [(139.7, 35.7)], 'Planisphère : un point jaune marque une ville',
        'HG-C4-4E-GEO-05', 1, METROPOLE, ['Tokyo', 'Shanghai', 'Singapour', 'New York'],
        'Elle est sur une île, à l’est de l’Asie.', 'C’est Tokyo, capitale du Japon.'),
    une('carte-metropole-shanghai', MONDE, '110m', None, [(121.5, 31.2)], 'Planisphère : un point jaune marque une ville',
        'HG-C4-4E-GEO-05', 2, METROPOLE, ['Shanghai', 'Tokyo', 'Singapour', 'Londres'],
        'Elle est sur la côte de la Chine.', 'C’est Shanghai, premier port du monde, sur la côte chinoise.'),
    une('carte-metropole-singapour', MONDE, '110m', None, [(103.8, 1.35)], 'Planisphère : un point jaune marque une ville',
        'HG-C4-4E-GEO-05', 2, METROPOLE, ['Singapour', 'Shanghai', 'Tokyo', 'New York'],
        'Elle est tout près de l’équateur, au sud-est de l’Asie.', 'C’est Singapour, au bord du détroit de Malacca.'),
    une('carte-metropole-londres', EUROPE_OUEST, '50m', None, [(-0.13, 51.5)], 'Carte de l’Europe de l’Ouest : un point jaune marque une ville',
        'HG-C4-4E-GEO-05', 1, METROPOLE, ['Londres', 'Paris', 'Bruxelles', 'Amsterdam'],
        'Elle se trouve en Grande-Bretagne.', 'C’est Londres, capitale du Royaume-Uni.'),
    une('carte-metropole-paris', EUROPE_OUEST, '50m', None, [(2.35, 48.85)], 'Carte de l’Europe de l’Ouest : un point jaune marque une ville',
        'HG-C4-4E-GEO-05', 1, METROPOLE, ['Paris', 'Londres', 'Berlin', 'Madrid'],
        'Elle est traversée par la Seine.', 'C’est Paris, au nord de la France.'),

    # 4e : villes des États-Unis.
    une('carte-usa-new-york', USA, '50m', None, [(-74.0, 40.7)], 'Carte des États-Unis : un point jaune marque une ville',
        'HG-C4-4E-GEO-06', 1, VILLE_USA, ['New York', 'Los Angeles', 'Chicago', 'Houston'],
        'Elle est sur la façade atlantique, au nord-est.', 'C’est New York, au cœur de la mégalopole du Nord-Est.'),
    une('carte-usa-los-angeles', USA, '50m', None, [(-118.2, 34.05)], 'Carte des États-Unis : un point jaune marque une ville',
        'HG-C4-4E-GEO-06', 1, VILLE_USA, ['Los Angeles', 'New York', 'Chicago', 'Miami'],
        'Elle est sur la façade pacifique, en Californie.', 'C’est Los Angeles, sur la façade pacifique.'),
    une('carte-usa-chicago', USA, '50m', None, [(-87.6, 41.9)], 'Carte des États-Unis : un point jaune marque une ville',
        'HG-C4-4E-GEO-06', 2, VILLE_USA, ['Chicago', 'Houston', 'Los Angeles', 'Washington'],
        'Elle est au bord des Grands Lacs.', 'C’est Chicago, au bord du lac Michigan.'),
    une('carte-usa-houston', USA, '50m', None, [(-95.4, 29.8)], 'Carte des États-Unis : un point jaune marque une ville',
        'HG-C4-4E-GEO-06', 2, VILLE_USA, ['Houston', 'Chicago', 'New York', 'Seattle'],
        'Elle est au Texas, près du golfe du Mexique.', 'C’est Houston, au Texas, dans la Sun Belt.'),
    une('carte-usa-washington', USA, '50m', None, [(-77.0, 38.9)], 'Carte des États-Unis : un point jaune marque une ville',
        'HG-C4-4E-GEO-06', 2, VILLE_USA, ['Washington', 'New York', 'Chicago', 'Los Angeles'],
        'Elle est au sud de New York, sur la façade atlantique.', 'C’est Washington, la capitale fédérale.'),

    # 4e : Afrique de l'Ouest.
    une('carte-afrique-ouest-nigeria', AFRIQUE_OUEST, '50m', ('pays', ['NGA']), [], 'Carte de l’Afrique de l’Ouest : un pays est colorié en violet',
        'HG-C4-4E-GEO-07', 1, AFRIQUE_O, ['le Nigeria', 'le Ghana', 'le Niger', 'le Sénégal'],
        'C’est le pays le plus peuplé d’Afrique.', 'C’est le Nigeria. Sa plus grande ville est Lagos.'),
    une('carte-afrique-ouest-senegal', AFRIQUE_OUEST, '50m', ('pays', ['SEN']), [], 'Carte de l’Afrique de l’Ouest : un pays est colorié en violet',
        'HG-C4-4E-GEO-07', 1, AFRIQUE_O, ['le Sénégal', 'le Mali', 'la Côte d’Ivoire', 'le Ghana'],
        'Il est à l’extrémité ouest du continent africain.', 'C’est le Sénégal. Sa capitale, Dakar, est au bord de l’Atlantique.'),
    une('carte-afrique-ouest-cote-d-ivoire', AFRIQUE_OUEST, '50m', ('pays', ['CIV']), [], 'Carte de l’Afrique de l’Ouest : un pays est colorié en violet',
        'HG-C4-4E-GEO-07', 2, AFRIQUE_O, ['la Côte d’Ivoire', 'le Ghana', 'le Sénégal', 'le Nigeria'],
        'Il borde le golfe de Guinée, à l’ouest du Ghana.', 'C’est la Côte d’Ivoire, sur le golfe de Guinée.'),
    une('carte-afrique-ouest-ghana', AFRIQUE_OUEST, '50m', ('pays', ['GHA']), [], 'Carte de l’Afrique de l’Ouest : un pays est colorié en violet',
        'HG-C4-4E-GEO-07', 2, AFRIQUE_O, ['le Ghana', 'la Côte d’Ivoire', 'le Nigeria', 'le Mali'],
        'Il borde le golfe de Guinée, entre la Côte d’Ivoire et le Togo.', 'C’est le Ghana, sur le golfe de Guinée.'),
    une('carte-afrique-ouest-mali', AFRIQUE_OUEST, '50m', ('pays', ['MLI']), [], 'Carte de l’Afrique de l’Ouest : un pays est colorié en violet',
        'HG-C4-4E-GEO-07', 2, AFRIQUE_O, ['le Mali', 'le Niger', 'le Sénégal', 'le Nigeria'],
        'Sa capitale est Bamako.', 'C’est le Mali, un grand pays sans accès à la mer.'),
    une('carte-afrique-ouest-niger', AFRIQUE_OUEST, '50m', ('pays', ['NER']), [], 'Carte de l’Afrique de l’Ouest : un pays est colorié en violet',
        'HG-C4-4E-GEO-07', 2, AFRIQUE_O, ['le Niger', 'le Mali', 'le Nigeria', 'le Tchad'],
        'Ce pays sans accès à la mer est au nord du Nigeria.', 'C’est le Niger, au nord du Nigeria.'),
]


def banque(competence):
    chemin = os.path.join(EXERCICES, f'{competence}.json')
    return chemin, json.load(open(chemin, encoding='utf-8'))


banques = {}
nouvelles = 0
for ident, emprise, echelle, selection, points, alt, questions in SERIES:
    taille = dessiner(ident, emprise, echelle, selection, points)
    if taille > 150 * 1024:
        sys.exit(f'{ident} : {taille // 1024} Ko, trop lourd')
    fiche = os.path.join(MEDIAS, f'{ident}.json')
    if not os.path.exists(fiche):
        json.dump({
            'id': ident, 'fichier': f'{ident}.svg', 'alt': alt, 'licence': 'domaine-public',
            'source': {'nom': 'Natural Earth', 'auteur': None, 'titre': 'Carte dessinée par Hopla à partir des données Natural Earth',
                       'url': 'https://www.naturalearthdata.com'},
            'credit': None, 'statut': 'brouillon', 'auteur': 'ia', 'relu_par': None,
        }, open(fiche, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
        open(fiche, 'a').write('\n')
    for competence, difficulte, consigne, options, indice, explication in questions:
        if competence not in banques:
            banques[competence] = banque(competence)
        _, b = banques[competence]
        if any(e.get('image') == ident and e['consigne'] == consigne for e in b['exercices']):
            continue
        dernier = max(int(e['id'].rsplit('-', 1)[1]) for e in b['exercices'])
        b['exercices'].append({
            'id': f'{competence}-{dernier + 1:03d}', 'gabarit': 'qcm', 'difficulte': difficulte, 'consigne': consigne,
            'options': options, 'reponse': options[0], 'indice': indice, 'explication': explication,
            'statut': 'brouillon', 'auteur': 'ia', 'relu_par': None, 'image': ident,
        })
        nouvelles += 1

for chemin, b in banques.values():
    with open(chemin, 'w', encoding='utf-8') as sortie:
        json.dump(b, sortie, ensure_ascii=False, indent=2)
        sortie.write('\n')
print(f'{len(SERIES)} cartes, {nouvelles} questions ajoutées')
