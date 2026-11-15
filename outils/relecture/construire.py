# Rassemble notions, leçons et questions rédigées à relire, et produit la page de relecture.
# Usage : python3 outils/relecture/construire.py . /chemin/relecture-hopla.html, puis republier la page de relecture (même adresse).
import json, glob, os, sys
R = sys.argv[1]; S = os.path.dirname(os.path.abspath(__file__))
sources = {s['id']: s for s in json.load(open(f'{R}/content/sources/sources.json'))}
ORDRE = ['cp', 'ce1', 'ce2', 'cm1', 'cm2', '6e', '5e', '4e', '3e']
MAT = {'FR': 'Français', 'MA': 'Maths', 'QM': 'Questionner le monde', 'EM': 'EMC', 'HG': 'Histoire-géo', 'ST': 'Sciences', 'LV': 'Anglais'}
lecons = {os.path.basename(f)[:-5]: json.load(open(f)) for f in glob.glob(f'{R}/content/lecons/*.json')}
banques = {json.load(open(f))['competence']: json.load(open(f))['exercices'] for f in glob.glob(f'{R}/content/exercices/*.json')}
notions = []
for f in glob.glob(f'{R}/content/referentiel/*/*.json'):
    ref = json.load(open(f))
    for c in ref['competences']:
        l = lecons.get(c['id'])
        qs = [q for q in banques.get(c['id'], []) if q['statut'] == 'brouillon' and q['gabarit'] == 'qcm']
        lecon = l if l and l['statut'] == 'brouillon' else None
        if not lecon and not qs and c['statut'] != 'a_verifier': continue
        src = c['source']
        notions.append({
            'id': c['id'], 'titre': c['titre'], 'classe': ref['classe'].upper() if ref['classe'] != '6e' and len(ref['classe']) > 2 else ref['classe'],
            'matiere': MAT.get(c['id'][:2], c['id'][:2]), 'theme': c['theme'], 'attendu': c['attendu'],
            'source': {'titre': sources[src['id']]['titre'], 'page': src['page'], 'extrait': src['extrait']} if src else None,
            'lecon': {k: lecon[k] for k in ('exemple', 'regle', 'piege', 'essai')} if lecon else None,
            'questions': [{'id': q['id'], 'difficulte': q['difficulte'], 'consigne': q['consigne'], 'options': q['options'], 'reponse': q['reponse'],
                           'indice': q['indice'], 'explication': q['explication'], **({'ecoute': q['ecoute']['texte']} if q.get('ecoute') else {})} for q in qs],
            '_ordre': (ORDRE.index(ref['classe']), list(MAT).index(c['id'][:2]) if c['id'][:2] in MAT else 99, c['id']),
        })
notions = [n for n in notions if n['source']]
notions.sort(key=lambda n: n['_ordre'])
for n in notions: del n['_ordre']
for n in notions: n['classe'] = {'cp': 'CP', 'ce1': 'CE1', 'ce2': 'CE2', 'cm1': 'CM1', 'cm2': 'CM2'}.get(n['classe'].lower(), n['classe'])
donnees = json.dumps(notions, ensure_ascii=False).replace('</', '<\\/')
t = open(f'{S}/page.tpl.html').read().replace('__DONNEES__', donnees)
open(f'{sys.argv[2]}', 'w').write(t)
print(len(notions), sum(1 for n in notions if n['lecon']), sum(len(n['questions']) for n in notions), round(len(t)/1024), 'Ko')
