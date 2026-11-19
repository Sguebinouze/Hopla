"""Importe les dictées Classetto (CC BY 4.0) dans content/dictees/<classe>/.

    python3 scripts/dictees/importer_classetto.py chemin/vers/classetto.csv

Les dictées arrivent en brouillon : un humain les relit avant publication (orthographe des éditions
anciennes, longueur, adéquation à la classe). Le crédit Classetto est obligatoire (licence CC BY 4.0).
"""
import csv, json, os, re, sys

RACINE = os.path.join(os.path.dirname(__file__), '..', '..')
COMPETENCE = {'ce1': 'FR-C2-CE1-DICT-01', 'ce2': 'FR-C2-CE2-DICT-02', 'cm1': 'FR-C3-CM1-DICT-01', 'cm2': 'FR-C3-CM2-DICT-01'}
# Textes écartés, qu'on ne modifie pas : tiret de dialogue ou parenthèses, absents du clavier intégré
# (cm1-lys, cm2-tempete, cm2-rentree) ; graphie ancienne « très-heureux », comptée fausse en classe (cm1-rouget).
ECARTES = {'cm1-lys', 'cm2-tempete', 'cm2-rentree', 'cm1-rouget'}
CREDIT = 'Classetto, « Quarante dictées pour l’école élémentaire », https://classetto.com/sources/#donnees-ouvertes, licence CC BY 4.0'


def points(ligne):
    out = []
    for champ, nom in (('accords', 'Accords'), ('verbes', 'Verbes'), ('lettres_muettes', 'Lettres muettes')):
        for p in filter(None, (x.strip() for x in ligne[champ].split(';'))):
            out.append(f'{nom} : {p}')
    return out


n = 0
for l in csv.DictReader(open(sys.argv[1], encoding='utf-8')):
    if l['id'] in ECARTES:
        continue
    classe = l['niveau'].lower()
    d = {
        'id': l['id'],
        'classe': classe,
        'competence': COMPETENCE[classe],
        'titre': l['titre'],
        # « […] » marque une coupe dans le passage de l'auteur : on ne la dicte pas.
        'texte': ' '.join(re.sub(r'\s*\[…\]', '', l['texte']).split()),
        'source': {
            # Texte écrit pour l'exercice : Classetto en est l'auteur.
            'auteur': l['auteur'] if l['origine'] == 'auteur' else 'Classetto',
            'oeuvre': l['oeuvre'] or None,
            'passage': l['passage'] or None,
            'reference': '; '.join(filter(None, [l['edition'], l['page_edition'], l['licence_texte']])) or 'Classetto',
            'url': l['lien_edition'] or l['url_page'] or None,
        },
        # Texte du domaine public ou écrit par Classetto ; annotations sous CC BY : le crédit vaut pour tout.
        'licence': 'CC-BY-4.0',
        'credit': CREDIT,
        'points': points(l),
        'statut': 'brouillon',
        'auteur': 'humain',
        'relu_par': None,
    }
    dossier = os.path.join(RACINE, 'content', 'dictees', classe)
    os.makedirs(dossier, exist_ok=True)
    with open(os.path.join(dossier, f"{d['id']}.json"), 'w', encoding='utf-8') as f:
        f.write(json.dumps(d, ensure_ascii=False, indent=2) + '\n')
    n += 1
print(n, 'dictées importées')
