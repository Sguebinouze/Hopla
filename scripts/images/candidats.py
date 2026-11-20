"""Images candidates pour les questions d'histoire et de géographie, cherchées sur Wikimedia Commons.

    python3 scripts/images/candidats.py dossier-de-sortie

Lancé par le workflow « Images candidates » (le poste de travail de Claude n'atteint pas Commons).
Pour chaque cible : les fichiers de la recherche, avec leur licence lue dans les métadonnées de Commons.
Seules restent les licences compatibles avec une appli payante sans partage à l'identique :
domaine public, CC0, CC BY. Une vignette de 960 px de chaque candidate est téléchargée pour le choix ;
le choix et la fiche de chaque image se font ensuite dans le dépôt, en brouillon.
"""
import html, json, os, re, sys, time, urllib.parse, urllib.request

SORTIE = sys.argv[1]
os.makedirs(os.path.join(SORTIE, 'vignettes'), exist_ok=True)
AGENT = 'HoplaImages/1.0 (https://github.com/Sguebinouze/Hopla)'
API = 'https://commons.wikimedia.org/w/api.php?'

# Cible : identifiant de la future image, question(s) concernée(s), recherche Commons.
CIBLES = [
    ('voie-lactee', ['PC-C4-3E-UNIV-01-002'], 'Milky Way night sky photograph'),
    ('soleil-nasa', ['PC-C4-3E-UNIV-01-001'], 'Sun Solar Dynamics Observatory full disk'),
    ('fossile-ammonite', ['SV-C4-3E-EVO-01-001'], 'ammonite fossil'),
    ('eoliennes', ['ST-C3-6E-NRJ-01-003'], 'wind turbines wind farm'),
    ('panneaux-solaires', ['ST-C3-6E-NRJ-01-006'], 'solar panels photovoltaic array'),
    ('arbres-automne', ['ST-C3-6E-ECO-01-002'], 'autumn trees leaves forest'),
    ('terre-vue-espace', ['ST-C3-6E-MVT-01-002', 'QM-C2-CE1-ESP-02-007'], 'Blue Marble Earth NASA'),
    ('engrenages', ['TE-C4-4E-MVT-01-003'], 'gears mechanism metal'),
    ('rouget-de-lisle-pils', ['EM-C2-CE1-REP-01-003'], 'Rouget de Lisle chantant la Marseillaise Pils'),
    ('isoloir', ['EM-C2-CE2-VOTE-01-006'], 'isoloir bureau de vote'),
    ('pont-du-gard-hubert-robert', ['HG-C3-6E-HIST-03-003'], 'Hubert Robert Pont du Gard'),
    ('amphore-panathenaique', ['HG-C3-6E-HIST-02-006'], 'Panathenaic prize amphora'),
    ('classe-geoffroy', ['HG-C3-CM2-HIST-04-002'], 'Henri Jules Jean Geoffroy école classe'),
]
PAR_CIBLE = 8


def lire(url):
    for essai in range(5):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': AGENT})
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except Exception as e:  # Commons limite le débit : on attend et on recommence
            print('nouvel essai', url[:90], e)
            time.sleep(5 * (essai + 1))
    raise RuntimeError(url)


def texte(v):
    """Métadonnée Commons sans balises HTML."""
    return html.unescape(re.sub(r'<[^>]+>', '', v or '')).strip()


def licence(meta):
    """Licence retenue, ou None si elle ne convient pas (SA, NC, ND, inconnue)."""
    court = texte(meta.get('LicenseShortName', {}).get('value', ''))
    l = court.lower()
    if any(x in l for x in ('-sa', ' sa ', 'nc', 'nd', 'share')):
        return None
    if 'public domain' in l or l in ('pd', 'pdm', 'domaine public') or l.startswith('pd-'):
        return 'domaine-public'
    if 'cc0' in l:
        return 'CC0'
    m = re.match(r'cc by (\d\.\d)', l)
    if m and m.group(1) in ('2.0', '3.0', '4.0'):
        return f'CC-BY-{m.group(1)}'
    return None


resultats = []
for ident, questions, recherche in CIBLES:
    q = urllib.parse.urlencode({
        'action': 'query', 'format': 'json', 'generator': 'search', 'gsrsearch': f'{recherche} filetype:bitmap',
        'gsrnamespace': 6, 'gsrlimit': 30, 'prop': 'imageinfo', 'iiprop': 'url|extmetadata|size|mime', 'iiurlwidth': 960,
    })
    pages = json.loads(lire(API + q)).get('query', {}).get('pages', {})
    gardees = []
    for p in sorted(pages.values(), key=lambda x: x.get('index', 99)):
        info = (p.get('imageinfo') or [{}])[0]
        meta = info.get('extmetadata', {})
        lic = licence(meta)
        if not lic or info.get('mime') not in ('image/jpeg', 'image/png'):
            continue
        nom = f"{ident}-{len(gardees) + 1}.jpg"
        try:
            open(os.path.join(SORTIE, 'vignettes', nom), 'wb').write(lire(info['thumburl']))
        except RuntimeError:
            continue
        gardees.append({
            'vignette': f'vignettes/{nom}', 'titre': p['title'], 'page': info.get('descriptionurl'), 'licence': lic,
            'licence_commons': texte(meta.get('LicenseShortName', {}).get('value')),
            'auteur': texte(meta.get('Artist', {}).get('value'))[:200] or None,
            'credit': texte(meta.get('Credit', {}).get('value'))[:200] or None,
            'description': texte(meta.get('ImageDescription', {}).get('value'))[:300] or None,
            'largeur': info.get('width'), 'hauteur': info.get('height'),
        })
        time.sleep(0.3)
        if len(gardees) >= PAR_CIBLE:
            break
    resultats.append({'id': ident, 'questions': questions, 'recherche': recherche, 'candidates': gardees})
    print(ident, len(gardees), 'candidates')

json.dump(resultats, open(os.path.join(SORTIE, 'candidats.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
