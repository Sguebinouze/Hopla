#!/usr/bin/env python3
"""Usage : python3 scripts/cours/pages.py content/cours/X.json ...

Remplit la page de chaque extrait cité par un cours : cherche l'extrait dans le PDF archivé
(même normalisation que content:extraits). Échoue si un extrait est introuvable."""
import json, re, subprocess, sys, unicodedata, os
RACINE = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..', 'content'))
sources = {s['id']: s for s in json.load(open(f'{RACINE}/sources/sources.json'))}
def norm(t):
    t = unicodedata.normalize('NFC', t).replace('’', "'").replace("'", "'")
    t = re.sub('[–—−-]', '-', t)
    return re.sub(r'[\s  ]+', '', t).lower()
cache = {}
def pages(fichier):
    if fichier not in cache:
        n = int(re.search(r'Pages:\s+(\d+)', subprocess.run(['pdfinfo', fichier], capture_output=True, text=True).stdout).group(1))
        cache[fichier] = [ '|'.join(norm(subprocess.run(['pdftotext', *m, '-f', str(p), '-l', str(p), fichier, '-'], capture_output=True, text=True).stdout) for m in (['-layout'], ['-raw'], [])) for p in range(1, n + 1)]
    return cache[fichier]
ok = True
for f in sys.argv[1:]:
    c = json.load(open(f))
    for s in c['sources']:
        if s['extrait'] is None: continue
        src = sources[s['id']]
        trouve = [i + 1 for i, t in enumerate(pages(os.path.join(RACINE, src['archive']))) if norm(s['extrait']) in t]
        if not trouve:
            print('INTROUVABLE', f, s['id'], s['extrait']); ok = False
        else:
            s['page'] = trouve[0]
    json.dump(c, open(f, 'w'), ensure_ascii=False, indent=2); open(f, 'a').write('\n')
sys.exit(0 if ok else 1)
