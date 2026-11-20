"""Télécharge les ressources officielles listées dans scripts/sources/a-archiver.json.

    python3 scripts/sources/archiver.py dossier-de-sortie

Lancé par le workflow « Sources officielles » (le poste de travail de Claude n'atteint pas Éduscol).
Chaque document est enregistré tel quel, avec son empreinte SHA-256, sa taille et l'adresse finale
après redirection. L'identification (titre, éditeur, date, licence) se fait ensuite à la lecture,
avant toute entrée dans content/sources/sources.json.
"""
import hashlib, json, os, sys, time, urllib.request

RACINE = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..'))
SORTIE = sys.argv[1]
os.makedirs(SORTIE, exist_ok=True)
AGENT = 'HoplaSources/1.0 (https://github.com/Sguebinouze/Hopla)'
liste = json.load(open(os.path.join(RACINE, 'scripts', 'sources', 'a-archiver.json'), encoding='utf-8'))['documents']

index = []
for doc in liste:
    for essai in range(4):
        try:
            req = urllib.request.Request(doc['url'], headers={'User-Agent': AGENT})
            with urllib.request.urlopen(req, timeout=90) as r:
                contenu = r.read()
                finale, type_ = r.geturl(), r.headers.get('Content-Type', '')
            break
        except Exception as e:  # serveur lent ou limité : on attend et on recommence
            print('nouvel essai', doc['url'], e)
            time.sleep(5 * (essai + 1))
    else:
        index.append({**doc, 'erreur': 'téléchargement impossible'})
        continue
    extension = 'pdf' if contenu[:4] == b'%PDF' else 'html'
    nom = f"{doc['id']}.{extension}"
    open(os.path.join(SORTIE, nom), 'wb').write(contenu)
    index.append({**doc, 'fichier': nom, 'url_finale': finale, 'type': type_, 'octets': len(contenu),
                  'sha256': hashlib.sha256(contenu).hexdigest()})
    print(nom, len(contenu))

json.dump(index, open(os.path.join(SORTIE, 'index.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
