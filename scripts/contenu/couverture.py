"""Audit de couverture : rubriques officielles (titre suivi de « Objectifs d'apprentissage ») par classe, et notions qui les couvrent."""
import json, os, re, subprocess, sys, collections
sys.path.insert(0, os.path.dirname(__file__))
from outil import RACINE, norm, SOURCES

CLASSES = {
  'Cours préparatoire': 'cp', 'Cours élémentaire première année': 'ce1', 'Cours élémentaire deuxième année': 'ce2',
  'Cours moyen première année': 'cm1', 'Cours moyen deuxième année': 'cm2', 'Sixième': '6e', 'Cinquième': '5e',
  'Quatrième': '4e', 'Troisième': '3e', 'Classe de sixième': '6e', 'Classe de cinquième': '5e', 'Classe de quatrième': '4e', 'Classe de troisième': '3e',
}
ANCRES = re.compile(r"^(Objectifs d.apprentissage|Attendus de fin d.année)")

def segments(src):
    f = f"{RACINE}/{SOURCES[src]['archive']}"
    pages = subprocess.run(['pdftotext', f, '-'], capture_output=True, text=True).stdout.split('\f')
    segs, classe, cur = [], None, None
    for p, txt in enumerate(pages, 1):
        lignes = [l.strip() for l in txt.split('\n')]
        for i, l in enumerate(lignes):
            if l in CLASSES:
                classe = CLASSES[l]; cur = None; continue
            if ANCRES.match(l) and classe:
                j = i - 1
                while j >= 0 and not lignes[j]: j -= 1
                titre = lignes[j] if j >= 0 else '?'
                cur = {'classe': classe, 'titre': titre, 'page': p, 'texte': titre + ' ', 'pages': {p}}
                segs.append(cur); continue
            if cur is not None:
                cur['texte'] += l + ' '; cur['pages'].add(p)
    for s in segs: s['n'] = norm(s['texte'])
    return segs

def audit(programme, src):
    segs = segments(src)
    refs = {}
    d = f"{RACINE}/referentiel/{programme}"
    for f in sorted(os.listdir(d)):
        refs[f[:-5]] = json.load(open(f"{d}/{f}"))['competences']
    out = {}
    for classe, cs in refs.items():
        ss = [s for s in segs if s['classe'] == classe]
        couv = collections.defaultdict(list); orphelines = []
        for c in cs:
            if c['source']['id'] != src: continue
            e = norm(c['source']['extrait'] or '')
            k = [i for i, s in enumerate(ss) if e and (e in s['n'] or e[:40] in s['n'])]
            if not k:
                k = [i for i, s in enumerate(ss) if c['source']['page'] in s['pages']][:1]
            (couv[k[0]].append(c['id']) if k else orphelines.append(c['id']))
        out[classe] = [(s['titre'], s['page'], couv.get(i, [])) for i, s in enumerate(ss)], orphelines
    return out

if __name__ == '__main__':
    prog, src = sys.argv[1], sys.argv[2]
    for classe, (rubs, orph) in audit(prog, src).items():
        vides = sum(1 for r in rubs if not r[2])
        print(f"\n## {prog} {classe} : {len(rubs)} rubriques, {vides} sans notion" + (f", orphelines {orph}" if orph else ''))
        for t, p, ids in rubs:
            print(f"  {'✓' if ids else '✗'} p{p} {t[:90]}" + (f"  [{len(ids)}]" if ids else ''))
