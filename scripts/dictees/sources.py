"""Télécharge les sources des dictées (lancé par .github/workflows/sources-dictees.yml, pas en local).

- Le jeu de données Classetto (CC BY 4.0) sur data.gouv.fr.
- Des chapitres d'auteurs du domaine public sur Wikisource, en texte, pour choisir les extraits
  du collège. Rien n'est réécrit : on choisit des passages tels quels.
"""
import json, os, re, sys, time, urllib.parse, urllib.request
from html.parser import HTMLParser

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

# 2. Wikisource : chapitres choisis pour le collège, en texte (les pages principales ne font que
# transclure les pages scannées : on demande le rendu, puis on garde les paragraphes).
CHAPITRES = [
    'Lettres de mon moulin/La chèvre de monsieur Seguin', 'Lettres de mon moulin/Les étoiles',
    'Lettres de mon moulin/Le secret de maître Cornille', 'Les Contes du lundi/La Dernière classe',
    'Poil de Carotte/01', 'Poil de Carotte/10', 'Poil de Carotte/11',
    'Le Tour du monde en quatre-vingts jours/Chapitre 1', 'Le Tour du monde en quatre-vingts jours/Chapitre 2',
    'Vingt mille lieues sous les mers/Partie 1/Chapitre 1', 'Le Capitaine Fracasse/Chapitre I',
    'Contes du jour et de la nuit (éd. Flammarion, 1885)/La Parure', 'Contes de la bécasse (Conard, 1908)/Aux champs',
    'Miss Harriet (recueil)/Édition Conard, 1910/Mon oncle Jules', 'Miss Harriet (recueil)/Édition Conard, 1910/La Ficelle',
    'Germinal/Partie I/Chapitre 1', 'Au bonheur des dames/1', 'Le Grand Meaulnes/I/02', 'Le Grand Meaulnes/I/05',
    'Les Misérables/Tome 1/Livre 7/03', 'Les Misérables/Tome 2/Livre 3/05',
]


class Paragraphes(HTMLParser):
    """Texte des <p> du rendu, sans numéros de page, notes ni éléments masqués."""
    IGNORES = ('pagenum', 'ws-noexport', 'reference', 'mw-editsection', 'noprint', 'mw-cite-backlink')

    def __init__(self):
        super().__init__()
        self.pile, self.ignore, self.dans_p, self.courant, self.sortie = [], 0, 0, [], []

    def handle_starttag(self, tag, attrs):
        classes = dict(attrs).get('class') or ''
        ignore = tag in ('sup', 'style', 'script') or any(c in classes for c in self.IGNORES)
        if tag in ('br', 'img', 'wbr'):
            if self.dans_p and not self.ignore:
                self.courant.append(' ')
            return
        self.pile.append((tag, ignore))
        self.ignore += ignore
        if tag == 'p':
            self.dans_p += 1

    def handle_endtag(self, tag):
        if tag in ('br', 'img', 'wbr') or tag not in (t for t, _ in self.pile):
            return
        while self.pile:
            t, ignore = self.pile.pop()
            self.ignore -= ignore
            if t == 'p':
                self.dans_p -= 1
                texte = ' '.join(''.join(self.courant).split())
                if texte:
                    self.sortie.append(texte)
                self.courant = []
            if t == tag:
                break

    def handle_data(self, data):
        if self.dans_p and not self.ignore:
            self.courant.append(data)


index = []
for t in CHAPITRES:
    api = 'https://fr.wikisource.org/w/api.php?' + urllib.parse.urlencode(
        {'action': 'parse', 'page': t, 'prop': 'text', 'format': 'json', 'formatversion': 2})
    try:
        html = json.loads(lire(api))['parse']['text']
    except Exception as e:  # un chapitre raté ne bloque pas les autres
        print('chapitre raté', t, e); continue
    p = Paragraphes()
    p.feed(html)
    nom = re.sub(r'[^\w-]+', '_', t)[:120] + '.txt'
    open(os.path.join(SORTIE, 'wikisource', nom), 'w', encoding='utf-8').write('\n\n'.join(p.sortie) + '\n')
    index.append({'titre': t, 'fichier': nom, 'paragraphes': len(p.sortie),
                  'url': 'https://fr.wikisource.org/wiki/' + urllib.parse.quote(t.replace(' ', '_'))})
    time.sleep(0.5)
json.dump(index, open(os.path.join(SORTIE, 'wikisource', 'index.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(index), 'chapitres Wikisource')
