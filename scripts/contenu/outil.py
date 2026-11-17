"""Écrit notions, leçons et banques d'exercices (brouillon, ia) et vérifie les extraits."""
import json, os, re, subprocess, unicodedata

RACINE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'content'))
SOURCES = {s['id']: s for s in json.load(open(f'{RACINE}/sources/sources.json'))}


def norm(t):
    t = unicodedata.normalize('NFC', t)
    t = re.sub(r"[’']", "'", t)
    t = re.sub(r'[–—−-]', '-', t)
    t = re.sub(r'[\s  ]+', '', t)
    return t.lower()


_cache = {}


def page_txt(src, page):
    k = (src, page)
    if k not in _cache:
        f = f"{RACINE}/{SOURCES[src]['archive']}"
        out = []
        for mode in (['-layout'], ['-raw'], []):
            out.append(subprocess.run(['pdftotext', *mode, '-f', str(page), '-l', str(page), f, '-'], capture_output=True, text=True).stdout)
        _cache[k] = '|'.join(norm(o) for o in out)
    return _cache[k]


def verifier_extrait(src, page, extrait):
    return norm(extrait) in page_txt(src, page)


def dump(obj, chemin):
    with open(chemin, 'w') as h:
        h.write(json.dumps(obj, ensure_ascii=False, indent=2) + '\n')


def ex(d, consigne, options, reponse=None, indice='', explication='', ecoute=None):
    reponse = reponse or options[0]
    return dict(d=d, consigne=consigne, options=options, reponse=reponse, indice=indice, explication=explication, ecoute=ecoute)


def ecrire(programme, classe, notions, langue=None):
    """notions : liste de dict(id, titre, domaine, theme, attendu, exemple, src, page, extrait, lecon, exercices)."""
    erreurs = []
    p = f'{RACINE}/referentiel/{programme}/{classe}.json'
    os.makedirs(os.path.dirname(p), exist_ok=True)
    ref = json.load(open(p)) if os.path.exists(p) else {'programme': programme, 'classe': classe, 'competences': []}
    deja = {c['id'] for c in ref['competences']}
    for n in notions:
        if not verifier_extrait(n['src'], n['page'], n['extrait']):
            erreurs.append(f"{n['id']} : extrait introuvable p{n['page']} {n['src']} : {n['extrait']}")
        comp = {
            'id': n['id'], 'titre': n['titre'], 'domaine': n['domaine'], 'theme': n['theme'],
            'attendu': n['attendu'], 'exemple': n['exemple'],
            'source': {'id': n['src'], 'page': n['page'], 'extrait': n['extrait']},
            'prerequis': n.get('prerequis', []), 'statut': 'verifie',
        }
        if n['id'] in deja:
            ref['competences'] = [comp if c['id'] == n['id'] else c for c in ref['competences']]
        else:
            ref['competences'].append(comp)
        le, rg, pi, (ec, eo, er, ee) = n['lecon']
        assert er in eo, (n['id'], 'essai')
        dump({
            'competence': n['id'], 'exemple': le, 'regle': rg, 'piege': pi,
            'essai': {'consigne': ec, 'options': eo, 'reponse': er, 'explication': ee},
            'statut': 'brouillon', 'auteur': 'ia', 'relu_par': None,
        }, f"{RACINE}/lecons/{n['id']}.json")
        exos = []
        for i, e in enumerate(n['exercices'], 1):
            assert e['reponse'] in e['options'], (n['id'], i, e['reponse'])
            assert len(set(e['options'])) == len(e['options']), (n['id'], i, 'doublon')
            x = {
                'id': f"{n['id']}-{i:03d}", 'gabarit': 'qcm', 'difficulte': e['d'], 'consigne': e['consigne'],
                'options': e['options'], 'reponse': e['reponse'], 'indice': e['indice'], 'explication': e['explication'],
            }
            if e['ecoute']:
                assert langue, n['id']
                x['ecoute'] = {'texte': e['ecoute'], 'langue': langue}
            x.update({'statut': 'brouillon', 'auteur': 'ia', 'relu_par': None})
            exos.append(x)
        assert len(exos) >= 8, (n['id'], len(exos))
        dump({'competence': n['id'], 'exercices': exos}, f"{RACINE}/exercices/{n['id']}.json")
    dump(ref, p)
    return erreurs
