"""Lexique des langues vivantes pour la voix d'Octave.

Pour chaque mot des leçons et exercices d'anglais, d'allemand et d'espagnol, note sa fréquence
(échelle Zipf, wordfreq) dans la langue étudiée et en français. La construction des packs s'en sert
pour lire chaque passage avec la bonne voix : « **A cat** : un chat » donne « A cat » en anglais,
« un chat » en français. À relancer après un ajout de contenu en langue vivante :

    pip install wordfreq && python3 scripts/voix/lexique.py
"""
import json, os, re
from wordfreq import zipf_frequency

RACINE = os.path.join(os.path.dirname(__file__), '..', '..')
CONTENU = os.path.join(RACINE, 'content')
SORTIE = os.path.join(RACINE, 'packages', 'content', 'voix', 'lexique.json')
LANGUES = {'LV': 'en', 'AL': 'de', 'ES': 'es'}
MOT = re.compile(r"[^\W_][\w'’-]*")


def textes():
    for f in sorted(os.listdir(os.path.join(CONTENU, 'lecons'))):
        if f[:2] in LANGUES:
            d = json.load(open(os.path.join(CONTENU, 'lecons', f), encoding='utf-8'))
            for t in (d.get('exemple'), d.get('regle'), d.get('piege'), d['essai']['consigne']):
                if t: yield LANGUES[f[:2]], t
    for f in sorted(os.listdir(os.path.join(CONTENU, 'exercices'))):
        if f[:2] in LANGUES:
            for e in json.load(open(os.path.join(CONTENU, 'exercices', f), encoding='utf-8'))['exercices']:
                for k in ('consigne', 'indice', 'explication'):
                    if e.get(k): yield LANGUES[f[:2]], e[k]


lexique = {lg: {} for lg in LANGUES.values()}
for lg, t in textes():
    for mot in MOT.findall(t):
        m = mot.lower().replace('’', "'")
        if m not in lexique[lg]:
            lexique[lg][m] = [round(zipf_frequency(m, lg), 1), round(zipf_frequency(m, 'fr'), 1)]
for lg in lexique:
    lexique[lg] = dict(sorted(lexique[lg].items()))
with open(SORTIE, 'w', encoding='utf-8') as f:
    json.dump(lexique, f, ensure_ascii=False, separators=(',', ':'))
    f.write('\n')
print(' '.join(f'{lg}:{len(v)}' for lg, v in lexique.items()), '→', os.path.relpath(SORTIE, RACINE))
