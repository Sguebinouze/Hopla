"""Entre dans le dépôt les images choisies parmi les candidates de Wikimedia Commons.

    python3 scripts/images/importer.py scripts/images/choix-hg.json chemin/vers/images-candidats

Un fichier de choix par passage du workflow : ses numéros de candidates renvoient à ce passage-là.

Pour chaque choix : la vignette devient un WebP de 960 px au plus et de 150 Ko au plus
(apps/pwa/public/images), sa fiche est écrite en brouillon (content/medias/commons) avec la licence
et l'auteur lus sur Commons, et les questions désignées reçoivent l'image.
"""
import glob, io, json, os, sys
from PIL import Image

RACINE = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..'))
choix = json.load(open(sys.argv[1], encoding='utf-8'))
candidats = {c['id']: c for c in json.load(open(os.path.join(sys.argv[2], 'candidats.json'), encoding='utf-8'))}
IMAGES = os.path.join(RACINE, 'apps', 'pwa', 'public', 'images')
MEDIAS = os.path.join(RACINE, 'content', 'medias', 'commons')
os.makedirs(MEDIAS, exist_ok=True)
LICENCES = {'domaine-public': 'domaine public', 'CC0': 'CC0', 'CC-BY-2.0': 'CC BY 2.0', 'CC-BY-3.0': 'CC BY 3.0', 'CC-BY-4.0': 'CC BY 4.0'}


def webp(source, destination):
    image = Image.open(source).convert('RGB')
    image.thumbnail((960, 960))
    for qualite in (80, 72, 64, 56, 48):
        tampon = io.BytesIO()
        image.save(tampon, 'WEBP', quality=qualite, method=6)
        if tampon.tell() <= 150 * 1024:
            break
    open(destination, 'wb').write(tampon.getvalue())


par_question = {}
for c in choix:
    cand = candidats[c['cible']]['candidates'][c['candidate'] - 1]
    webp(os.path.join(sys.argv[2], cand['vignette']), os.path.join(IMAGES, f"{c['id']}.webp"))
    titre = cand['titre'].removeprefix('File:').rsplit('.', 1)[0]
    auteur = (cand['auteur'] or '').split('\n')[0].strip() or None
    a_crediter = cand['licence'].startswith('CC-BY')
    fiche = os.path.join(MEDIAS, f"{c['id']}.json")
    if not os.path.exists(fiche):
        with open(fiche, 'w', encoding='utf-8') as f:
            json.dump({
                'id': c['id'], 'fichier': f"{c['id']}.webp", 'alt': c['alt'], 'licence': cand['licence'],
                'source': {'nom': 'Wikimedia Commons', 'auteur': auteur, 'titre': titre, 'url': cand['page']},
                'credit': f"{auteur or 'Auteur inconnu'}, « {titre} », {LICENCES[cand['licence']]}, Wikimedia Commons" if a_crediter else None,
                'statut': 'brouillon', 'auteur': 'ia', 'relu_par': None,
            }, f, ensure_ascii=False, indent=2)
            f.write('\n')
    for q in c['questions']:
        par_question[q] = c['id']

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
print(len(choix), 'images importées')
