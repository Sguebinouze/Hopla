"""Dictées du collège : passages d'auteurs du domaine public, recopiés tels quels depuis Wikisource.

    python3 scripts/dictees/extraits_college.py chemin/vers/sources-dictees

Les chapitres viennent de la branche `sources-dictees` (workflow « Sources des dictées »). Chaque passage
est un ou plusieurs paragraphes entiers, choisis sans dialogue ni parenthèse (absents du clavier intégré).
Le début attendu de chaque passage est vérifié : si Wikisource change, le script s'arrête.
Les dictées sortent en brouillon : un humain les relit avant publication.
"""
import json, os, sys, urllib.parse

RACINE = os.path.join(os.path.dirname(__file__), '..', '..')
SOURCES = os.path.join(sys.argv[1], 'wikisource')
COMPETENCE = {'6e': 'FR-C3-6E-DICT-01', '5e': 'FR-C4-5E-DICT-01', '4e': 'FR-C4-4E-DICT-01', '3e': 'FR-C4-3E-DICT-01'}

# (classe, id, titre, auteur, œuvre, chapitre Wikisource, paragraphes, début attendu[, fin du passage :
#  le texte s'arrête après ces mots, à la fin d'une phrase, quand le paragraphe continue sur une réplique])
PASSAGES = [
    ('6e', '6e-clos-seguin', 'Le clos de M. Seguin', 'Alphonse Daudet', 'Lettres de mon moulin',
     'Lettres de mon moulin/La chèvre de monsieur Seguin', [10], 'M. Seguin avait derrière sa maison'),
    ('6e', '6e-chevre-montagne', 'La chèvre dans la montagne', 'Alphonse Daudet', 'Lettres de mon moulin',
     'Lettres de mon moulin/La chèvre de monsieur Seguin', [35], 'Quand la chèvre blanche arriva'),
    ('6e', '6e-maitre-cornille', 'Maître Cornille', 'Alphonse Daudet', 'Lettres de mon moulin',
     'Lettres de mon moulin/Le secret de maître Cornille', [5], 'Maître Cornille était un vieux meunier'),
    ('6e', '6e-matin-dimanche', 'Comme un matin de dimanche', 'Alphonse Daudet', 'Contes du lundi',
     'Les Contes du lundi/La Dernière classe', [10], 'Je comptais sur tout ce train'),
    ('6e', '6e-poil-de-carotte', 'Dans le noir', 'Jules Renard', 'Poil de Carotte',
     'Poil de Carotte/01', [18], 'Poil de Carotte, les fesses collées', 'sur leur perchoir.'),
    ('5e', '5e-phileas-fogg', 'Un homme exact', 'Jules Verne', 'Le Tour du monde en quatre-vingts jours',
     'Le Tour du monde en quatre-vingts jours/Chapitre 2', [3], 'Phileas Fogg était de ces gens'),
    ('5e', '5e-question-du-monstre', 'La question du monstre', 'Jules Verne', 'Vingt mille lieues sous les mers',
     'Vingt mille lieues sous les mers/Partie 1/Chapitre 1', [10], 'Alors éclata l’interminable polémique'),
    ('5e', '5e-jardin-fracasse', 'Le jardin abandonné', 'Théophile Gautier', 'Le Capitaine Fracasse',
     'Le Capitaine Fracasse/Chapitre I', [8], 'Les arbres non taillés'),
    ('5e', '5e-derniere-classe', 'La dernière classe', 'Alphonse Daudet', 'Contes du lundi',
     'Les Contes du lundi/La Dernière classe', [13], 'J’enjambai le banc'),
    ('4e', '4e-parure', 'Les gros travaux', 'Guy de Maupassant', 'La Parure',
     'Contes du jour et de la nuit (éd. Flammarion, 1885)/La Parure', [99], 'Elle connut les gros travaux'),
    ('4e', '4e-aux-champs', 'Deux chaumières', 'Guy de Maupassant', 'Aux champs',
     'Contes de la bécasse (Conard, 1908)/Aux champs', [0], 'Les deux chaumières étaient côte à côte'),
    ('4e', '4e-ficelle', 'Jour de marché', 'Guy de Maupassant', 'La Ficelle',
     'Miss Harriet (recueil)/Édition Conard, 1910/La Ficelle', [0], 'Sur toutes les routes autour de Goderville'),
    ('4e', '4e-oncle-jules', 'Mon oncle Jules', 'Guy de Maupassant', 'Mon oncle Jules',
     'Miss Harriet (recueil)/Édition Conard, 1910/Mon oncle Jules', [10], 'Mon oncle Jules, le frère de mon père'),
    ('3e', '3e-germinal', 'La route de Montsou', 'Émile Zola', 'Germinal',
     'Germinal/Partie I/Chapitre 1', [0], 'Dans la plaine rase'),
    ('3e', '3e-bonheur-des-dames', 'Le magasin dans la nuit', 'Émile Zola', 'Au Bonheur des Dames',
     'Au bonheur des dames/1', [178], 'Denise, cédant à la séduction'),
    ('3e', '3e-grand-meaulnes', 'Avant sa venue', 'Alain-Fournier', 'Le Grand Meaulnes',
     'Le Grand Meaulnes/I/02', [3], 'Avant sa venue'),
    ('3e', '3e-cosette-bois', 'Le bois la nuit', 'Victor Hugo', 'Les Misérables',
     'Les Misérables/Tome 2/Livre 3/05', [15], 'Un vent froid soufflait de la plaine'),
]

index = {x['titre']: x for x in json.load(open(os.path.join(SOURCES, 'index.json'), encoding='utf-8'))}
for classe, id_, titre, auteur, oeuvre, chapitre, numeros, debut, *fin in PASSAGES:
    paragraphes = open(os.path.join(SOURCES, index[chapitre]['fichier']), encoding='utf-8').read().split('\n\n')
    # Espace fine insécable de Wikisource : espace insécable, la seule que le clavier connaisse.
    texte = ' '.join(paragraphes[n].strip() for n in numeros).replace(' ', ' ')
    if fin:
        if fin[0] not in texte:
            sys.exit(f'{id_} : fin « {fin[0]} » introuvable')
        texte = texte[:texte.index(fin[0]) + len(fin[0])]
    if not texte.startswith(debut):
        sys.exit(f'{id_} : le passage ne commence plus par « {debut} » ({texte[:60]}…)')
    page = chapitre.split('/')
    d = {
        'id': id_,
        'classe': classe,
        'competence': COMPETENCE[classe],
        'titre': titre,
        'texte': texte,
        'source': {
            'auteur': auteur,
            'oeuvre': oeuvre,
            'passage': page[-1] if len(page) > 1 else None,
            'reference': f'Wikisource, « {chapitre} », paragraphe{"s" if len(numeros) > 1 else ""} {", ".join(str(n + 1) for n in numeros)}',
            'url': 'https://fr.wikisource.org/wiki/' + urllib.parse.quote(chapitre.replace(' ', '_')),
        },
        'licence': 'domaine-public',
        'credit': None,
        'points': [],
        'statut': 'brouillon',
        # Texte de l'auteur, recopié tel quel ; passage choisi par l'IA, à relire.
        'auteur': 'ia',
        'relu_par': None,
    }
    dossier = os.path.join(RACINE, 'content', 'dictees', classe)
    os.makedirs(dossier, exist_ok=True)
    with open(os.path.join(dossier, f'{id_}.json'), 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
        f.write('\n')
print(len(PASSAGES), 'dictées du collège écrites')
