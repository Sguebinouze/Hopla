"""Télécharge les sources des dictées (lancé par .github/workflows/sources-dictees.yml, pas en local).

- Le jeu de données Classetto (CC BY 4.0) sur data.gouv.fr.
- Des chapitres d'auteurs du domaine public sur Wikisource, en wikitexte brut, pour choisir
  les extraits du collège. Rien n'est réécrit : on choisit des passages tels quels.
"""
import json, os, re, sys, time, urllib.parse, urllib.request

SORTIE = sys.argv[1]
os.makedirs(os.path.join(SORTIE, 'wikisource'), exist_ok=True)
UA = {'User-Agent': 'Hopla/1.0 (sources de dictées ; contact : hopla.news@gmail.com)'}


def lire(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
        return r.read()


# 1. Classetto
csv = lire('https://www.data.gouv.fr/api/1/datasets/r/bc886fc7-4049-49f6-9374-7a8761db5081')
open(os.path.join(SORTIE, 'classetto.csv'), 'wb').write(csv)
print('classetto.csv', len(csv), 'octets')

# 2. Wikisource : chaque recherche garde ses 3 premiers résultats.
RECHERCHES = [
    'La Chèvre de M. Seguin Daudet', 'Les Étoiles Daudet Lettres de mon moulin', 'La Dernière Classe Daudet',
    'Le Secret de maître Cornille', 'Les Vieux Daudet', 'Poil de Carotte Les Poules', 'Poil de Carotte La Taupe',
    'La Guerre des boutons Pergaud', 'De Goupil à Margot Pergaud', 'Le Tour du monde en quatre-vingts jours Chapitre I',
    'Vingt mille lieues sous les mers Un écueil fuyant', 'Michel Strogoff Chapitre I', 'La Parure Maupassant',
    'Aux champs Maupassant', 'La Ficelle Maupassant', 'Mon oncle Jules Maupassant', 'Les Misérables Cosette seule dans les ténèbres',
    'Les Misérables La Tempête sous un crâne', 'Le Grand Meaulnes Il arrive chez nous', 'Germinal Zola Première partie I',
    'Au Bonheur des Dames chapitre I', 'Le Capitaine Fracasse chapitre I', 'Sans famille Hector Malot chapitre I',
    'François le Champi George Sand', 'La Mare au diable George Sand Le labour',
]
index = []
for q in RECHERCHES:
    api = 'https://fr.wikisource.org/w/api.php?' + urllib.parse.urlencode(
        {'action': 'query', 'list': 'search', 'srsearch': q, 'srlimit': 3, 'srnamespace': 0, 'format': 'json'})
    try:
        titres = [r['title'] for r in json.loads(lire(api))['query']['search']]
    except Exception as e:  # une recherche ratée ne bloque pas les autres
        print('recherche ratée', q, e); continue
    for t in titres:
        nom = re.sub(r'[^\w-]+', '_', t)[:120] + '.wiki'
        try:
            brut = lire('https://fr.wikisource.org/w/index.php?' + urllib.parse.urlencode({'title': t, 'action': 'raw'}))
        except Exception as e:
            print('page ratée', t, e); continue
        open(os.path.join(SORTIE, 'wikisource', nom), 'wb').write(brut)
        index.append({'recherche': q, 'titre': t, 'fichier': nom, 'url': 'https://fr.wikisource.org/wiki/' + urllib.parse.quote(t.replace(' ', '_'))})
        time.sleep(0.5)
json.dump(index, open(os.path.join(SORTIE, 'wikisource', 'index.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(index), 'pages Wikisource')
