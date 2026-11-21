"""Outils communs aux lots de cours : questions, sources, visuels et écriture des fichiers."""
import json, os

RACINE = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..'))
BO = 'bo41-2024-maths-c2'
LIVRET = 'eduscol-livret-maths-ce1-2025'
FRAC = 'eduscol-fractions-ce1-cm2-2025'


def q(consigne, options, explication):
    """Question : la première option est la bonne réponse."""
    return {'consigne': consigne, 'options': options, 'reponse': options[0], 'explication': explication}


def bq(consigne, options, explication):
    return {'type': 'question', **q(consigne, options, explication)}


def src(id_, extrait, appui, page=None):
    return {'id': id_, 'page': page, 'extrait': extrait, 'appui': appui}


def barres(*b):
    return {'type': 'fractions', 'barres': [{'parts': p, 'coloriees': c, 'nom': f'{c}/{p}'} for p, c in b]}


def ecrire(COURS):
    """Écrit chaque cours dans content/cours, en brouillon (auteur ia).

    Un cours déjà relu ou publié n'est pas réécrit : seul un humain le modifie. Les pages des sources
    déjà trouvées (scripts de pages) sont gardées.
    """
    ecrits = 0
    for competence, c in COURS.items():
        chemin = os.path.join(RACINE, 'content', 'cours', f'{competence}.json')
        pages = {}
        if os.path.exists(chemin):
            with open(chemin, encoding='utf-8') as f:
                ancien = json.load(f)
            if ancien.get('statut') != 'brouillon':
                print(competence, ': déjà', ancien.get('statut'), ', non réécrit')
                continue
            pages = {(s['id'], s['extrait']): s.get('page') for s in ancien.get('sources', [])}
        sources = [{**s, 'page': pages.get((s['id'], s['extrait'])) or s.get('page')} for s in c['sources']]
        cours = {
            'competence': competence, 'duree': c['duree'], 'essentiel': c['essentiel'],
            'parties': [{'titre': t, 'blocs': b} for t, b in c['parties']],
            'a_toi': c['a_toi'], 'sources': sources,
            'statut': 'brouillon', 'auteur': 'ia', 'relu_par': None,
        }
        with open(chemin, 'w', encoding='utf-8') as f:
            json.dump(cours, f, ensure_ascii=False, indent=2)
            f.write('\n')
        ecrits += 1
    print(ecrits, 'cours écrits')


def vocabulaire(cycle, *termes):
    """Bloc vocabulaire tiré du glossaire commun : la définition du cycle, mot pour mot."""
    with open(os.path.join(RACINE, 'content', 'glossaire.json'), encoding='utf-8') as f:
        glossaire = {t['terme']: t['definitions'] for t in json.load(f)['termes']}
    return {'type': 'vocabulaire', 'mots': [{'mot': t, 'definition': glossaire[t][str(cycle)]} for t in termes]}


def source_referentiel(competence, appui):
    """Source d'un cours : l'extrait déjà vérifié de la compétence dans le référentiel (id, page, extrait)."""
    import glob
    for chemin in glob.glob(os.path.join(RACINE, 'content', 'referentiel', '*', '*.json')):
        with open(chemin, encoding='utf-8') as f:
            for c in json.load(f)['competences']:
                if c['id'] == competence:
                    s = c['source']
                    return src(s['id'], s['extrait'], appui, s.get('page'))
    raise KeyError(competence)
