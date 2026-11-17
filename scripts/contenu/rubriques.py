import sys
from couverture import segments, audit
prog, src, classe = sys.argv[1:4]
a = audit(prog, src)[classe][0]
segs = [s for s in segments(src) if s['classe'] == classe]
for (t, p, ids), s in zip(a, segs):
    if ids and '--tout' not in sys.argv: continue
    txt = s['texte'].replace('Exemples de réussite', '')
    print(f"\n### p{p} {t} {'COUVERT '+str(ids) if ids else ''}\n{txt[:1500]}")
