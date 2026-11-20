"""Réponses en images pour l'anglais du CP au CM2 : emojis Fluent (Microsoft, licence MIT).

    python3 scripts/images/emojis.py chemin/vers/fluentui-emoji

Une question reçoit des images seulement si chacune de ses options est un mot français qui se dessine
sans ambiguïté (animal, aliment, vêtement, météo, émotion, couleur…), avec une image différente par option.
L'image illustre le mot français : elle aide à lire la réponse, elle ne traduit pas l'anglais. Les questions
qui demandent un mot anglais (« en anglais ») ne sont pas touchées, l'image donnerait la réponse.

Le dépôt fluentui-emoji se récupère sans tout télécharger :
    git clone --depth 1 --filter=blob:none --sparse https://github.com/microsoft/fluentui-emoji.git
Les images sortent en brouillon : un humain les relit avant qu'elles s'affichent.
"""
import glob, json, os, re, shutil, subprocess, sys, unicodedata

RACINE = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..'))
FLUENT = sys.argv[1]
IMAGES = os.path.join(RACINE, 'apps', 'pwa', 'public', 'images')
MEDIAS = os.path.join(RACINE, 'content', 'medias', 'emojis')

# Mot français (sans déterminant) → (emoji Fluent, texte alternatif).
LEXIQUE = {
    'chat': ('Cat', 'Un chat'), 'chats': ('Cat', 'Un chat'), 'chien': ('Dog', 'Un chien'), 'lapin': ('Rabbit', 'Un lapin'),
    'cheval': ('Horse', 'Un cheval'), 'oiseau': ('Bird', 'Un oiseau'), 'poisson': ('Fish', 'Un poisson'),
    'ours': ('Bear', 'Un ours'), 'lion': ('Lion', 'Une tête de lion'), 'aigle': ('Eagle', 'Un aigle'), 'vache': ('Cow', 'Une vache'),
    'dragon': ('Dragon', 'Un dragon'), 'hamster': ('Hamster', 'Un hamster'), 'kangourou': ('Kangaroo', 'Un kangourou'),
    'pomme': ('Red apple', 'Une pomme rouge'), 'pommes': ('Red apple', 'Une pomme rouge'), 'banane': ('Banana', 'Une banane'),
    'bananes': ('Banana', 'Une banane'), 'fraises': ('Strawberry', 'Une fraise'), 'orange': ('Tangerine', 'Une orange'),
    'gâteau': ('Shortcake', 'Une part de gâteau'), 'pain': ('Bread', 'Un pain'), 'lait': ('Glass of milk', 'Un verre de lait'),
    'chocolat': ('Chocolate bar', 'Une tablette de chocolat'), 'glace': ('Soft ice cream', 'Une glace'), 'tarte': ('Pie', 'Une tarte'),
    'œufs': ('Egg', 'Un œuf'), 'miel': ('Honey pot', 'Un pot de miel'), 'pizza': ('Pizza', 'Une part de pizza'),
    'beurre': ('Butter', 'Du beurre'), 'soupe': ('Pot of food', 'Une marmite de soupe'),
    'manteau': ('Coat', 'Un manteau'), 'pantalon': ('Jeans', 'Un pantalon'), 'robe': ('Dress', 'Une robe'),
    'chaussettes': ('Socks', 'Des chaussettes'), 'tee-shirt': ('T-shirt', 'Un tee-shirt'), 'short': ('Shorts', 'Un short'),
    'maillot de bain': ('One-piece swimsuit', 'Un maillot de bain'), 'écharpe': ('Scarf', 'Une écharpe'), 'gants': ('Gloves', 'Des gants'),
    'lunettes de soleil': ('Sunglasses', 'Des lunettes de soleil'), 'parapluie': ('Umbrella', 'Un parapluie'),
    'chaussures': ('Running shoe', 'Une chaussure'), 'chapeau': ('Top hat', 'Un chapeau'),
    'nez': ('Nose', 'Un nez'), 'bouche': ('Mouth', 'Une bouche'), 'oreille': ('Ear', 'Une oreille'), 'oreilles': ('Ear', 'Une oreille'),
    'yeux': ('Eyes', 'Deux yeux'), 'pied': ('Foot', 'Un pied'), 'pieds': ('Foot', 'Un pied'),
    'main': ('Hand with fingers splayed', 'Une main ouverte'), 'mains': ('Hand with fingers splayed', 'Une main ouverte'),
    'football': ('Soccer ball', 'Un ballon de football'), 'tennis': ('Tennis', 'Une balle de tennis'),
    'natation': ('Person swimming', 'Une personne qui nage'), 'basket': ('Basketball', 'Un ballon de basket'),
    'ski': ('Skier', 'Un skieur'), 'vélo': ('Bicycle', 'Un vélo'),
    'il pleut': ('Cloud with rain', 'Un nuage et de la pluie'), 'pluie': ('Cloud with rain', 'Un nuage et de la pluie'),
    'il neige': ('Snowflake', 'Un flocon de neige'), 'neige': ('Snowflake', 'Un flocon de neige'),
    'il fait beau': ('Sun', 'Le soleil'), 'soleil': ('Sun', 'Le soleil'),
    'il y a du vent': ('Leaf fluttering in wind', 'Une feuille emportée par le vent'),
    'il fait nuit': ('Crescent moon', 'Un croissant de lune'), 'nuit': ('Crescent moon', 'Un croissant de lune'),
    'il fait chaud': ('Hot face', 'Un visage qui a très chaud'), 'il fait froid': ('Cold face', 'Un visage gelé'),
    'livre': ('Closed book', 'Un livre'), 'crayon': ('Pencil', 'Un crayon'), 'stylo': ('Pen', 'Un stylo'),
    'règle': ('Straight ruler', 'Une règle'), 'ciseaux': ('Scissors', 'Des ciseaux'), 'cartable': ('Backpack', 'Un sac à dos'),
    'cahier': ('Notebook', 'Un cahier'), 'cadeau': ('Wrapped gift', 'Un cadeau'), 'cadeaux': ('Wrapped gift', 'Un cadeau'),
    'citrouille': ('Jack-o-lantern', 'Une citrouille d’Halloween'), 'citrouilles': ('Jack-o-lantern', 'Une citrouille d’Halloween'),
    'sapin': ('Christmas tree', 'Un sapin de Noël'),
    'gare': ('Station', 'Une gare'), 'école': ('School', 'Une école'), 'hôpital': ('Hospital', 'Un hôpital'),
    'poste': ('Post office', 'Un bureau de poste'), 'banque': ('Bank', 'Une banque'), 'plage': ('Beach with umbrella', 'Une plage'),
    'cinéma': ('Cinema', 'Une caméra de cinéma'),
    'content': ('Grinning face', 'Un visage souriant'), 'joie': ('Grinning face', 'Un visage souriant'),
    'triste': ('Disappointed face', 'Un visage triste'), 'tristesse': ('Disappointed face', 'Un visage triste'),
    'en colère': ('Angry face', 'Un visage en colère'), 'colère': ('Angry face', 'Un visage en colère'),
    'fatigué': ('Tired face', 'Un visage fatigué'), 'fatiguée': ('Tired face', 'Un visage fatigué'), 'fatigue': ('Tired face', 'Un visage fatigué'),
    'malade': ('Face with thermometer', 'Un visage malade avec un thermomètre'),
    'surpris': ('Astonished face', 'Un visage étonné'), 'surprise': ('Astonished face', 'Un visage étonné'),
    'peur': ('Fearful face', 'Un visage qui a peur'),
    'rouge': ('Red circle', 'Un rond rouge'), 'bleu': ('Blue circle', 'Un rond bleu'), 'bleue': ('Blue circle', 'Un rond bleu'),
    'vert': ('Green circle', 'Un rond vert'), 'verte': ('Green circle', 'Un rond vert'), 'jaune': ('Yellow circle', 'Un rond jaune'),
    'noir': ('Black circle', 'Un rond noir'), 'blanc': ('White circle', 'Un rond blanc'),
}
DETERMINANTS = re.compile(r"^(un|une|le|la|les|des|du|de la|de l’|l’|ta|ton|tes|mon|ma|mes|je suis|il est|elle est|faire du|faire de la)\s*", re.I)


def normaliser(option):
    o = option.strip().rstrip('.!').strip().lower()
    return DETERMINANTS.sub('', o, count=1).strip()


def ident(nom):
    s = unicodedata.normalize('NFD', nom.lower())
    return 'emoji-' + re.sub(r'[^a-z0-9]+', '-', ''.join(c for c in s if not unicodedata.combining(c))).strip('-')


def svg_de(nom):
    """Chemin de l'emoji plat, ton de peau par défaut s'il y en a plusieurs."""
    base = f'assets/{nom}'
    liste = subprocess.run(['git', '-C', FLUENT, 'ls-tree', '-r', '--name-only', 'HEAD', base], capture_output=True, text=True, check=True).stdout.split('\n')
    plats = [p for p in liste if p.endswith('.svg') and '/Flat/' in p and ('/Default/' in p or p.count('/') == 3)]
    if not plats:
        sys.exit(f'emoji introuvable : {nom}')
    subprocess.run(['git', '-C', FLUENT, 'sparse-checkout', 'add', base], check=True, capture_output=True)
    return os.path.join(FLUENT, plats[0])


utilises = {}
questions = 0
for f in sorted(glob.glob(os.path.join(RACINE, 'content', 'exercices', 'LV-C2-*.json')) + glob.glob(os.path.join(RACINE, 'content', 'exercices', 'LV-C3-CM*.json'))):
    banque = json.load(open(f, encoding='utf-8'))
    modifie = False
    for e in banque['exercices']:
        options = e.get('options') or []
        if e['gabarit'] != 'qcm' or len(options) < 2 or 'anglais' in e['consigne'].lower():
            continue
        cles = [normaliser(o) for o in options]
        if not all(c in LEXIQUE for c in cles):
            continue
        emojis = [LEXIQUE[c][0] for c in cles]
        if len(set(emojis)) != len(emojis):
            continue
        e['images_options'] = {o: ident(LEXIQUE[c][0]) for o, c in zip(options, cles)}
        for c in cles:
            utilises[ident(LEXIQUE[c][0])] = LEXIQUE[c]
        modifie = True
        questions += 1
    if modifie:
        with open(f, 'w', encoding='utf-8') as sortie:
            json.dump(banque, sortie, ensure_ascii=False, indent=2)
            sortie.write('\n')

os.makedirs(IMAGES, exist_ok=True)
os.makedirs(MEDIAS, exist_ok=True)
for id_, (nom, alt) in sorted(utilises.items()):
    shutil.copyfile(svg_de(nom), os.path.join(IMAGES, f'{id_}.svg'))
    fiche = os.path.join(MEDIAS, f'{id_}.json')
    if os.path.exists(fiche):  # fiche déjà relue : on garde son statut
        continue
    with open(fiche, 'w', encoding='utf-8') as sortie:
        json.dump({
            'id': id_, 'fichier': f'{id_}.svg', 'alt': alt, 'licence': 'MIT',
            'source': {'nom': 'Fluent Emoji', 'auteur': 'Microsoft', 'titre': nom,
                       'url': 'https://github.com/microsoft/fluentui-emoji/tree/main/assets/' + nom.replace(' ', '%20')},
            'credit': None, 'statut': 'brouillon', 'auteur': 'ia', 'relu_par': None,
        }, sortie, ensure_ascii=False, indent=2)
        sortie.write('\n')
print(f'{questions} questions illustrées, {len(utilises)} images')
