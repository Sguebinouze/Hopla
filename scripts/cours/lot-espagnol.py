"""Lot de cours : espagnol 5e (programme 2025), 4e et 3e (programme 2020). Écrit les cours en brouillon (auteur ia).

    cd scripts/cours && python3 lot-espagnol.py
    python3 scripts/cours/pages.py content/cours/ES-C4-*.json

Cycle 4 : phrases de 25 mots au plus (alerte), pas de bloc vocabulaire. Espagnol d’Espagne par défaut.
"""
from commun import bq, ecrire, q, source_referentiel as ref


def mots(titre, *paires):
    return {'type': 'tableau', 'titre': titre, 'colonnes': ['Espagnol', 'Français'], 'lignes': [list(p) for p in paires]}


COURS = {
    # ---------------------------------------------------------------------- 5e
    'ES-C4-5E-PRES-01': dict(duree=5, essentiel=
        'Se présenter : Me llamo Hugo. Tengo doce años. Soy francés. Vivo en Lyon.\n'
        'Les questions : ¿Cómo te llamas? ¿Cuántos años tienes? ¿De dónde eres? ¿Dónde vives?\n'
        'En espagnol, une question s’ouvre par ¿ et une exclamation par ¡.',
        parties=[
            ('Questions et réponses', [
                mots('Presentarse', ('¿Cómo te llamas?', 'Comment t’appelles-tu ?'), ('¿Cuántos años tienes?', 'Quel âge as-tu ?'), ('¿De dónde eres?', 'D’où es-tu ?'), ('¿Dónde vives?', 'Où habites-tu ?')),
                bq('« Tengo trece años. » donne :', ['l’âge', 'le nom', 'la ville'], 'Años : ans.'),
            ]),
            ('L’âge avec tener', [
                {'type': 'explique', 'texte': 'Comme en français, l’âge se dit avec « avoir » : tengo doce años.'},
                {'type': 'piege', 'erreur': 'On écrit la question sans ¿ au début.', 'correction': 'L’espagnol encadre la question : ¿Dónde vives?'},
            ]),
        ],
        a_toi=[
            q('« ¿De dónde eres? » veut dire :', ['D’où es-tu ?', 'Où vas-tu ?', 'Qui es-tu ?'], 'Origine.'),
            q('« J’habite à Paris » se dit :', ['Vivo en París.', 'Soy en París.', 'Tengo París.'], 'Vivir : habiter.'),
            q('Une question espagnole commence par :', ['¿', '?', '¡'], 'Point d’interrogation renversé.'),
        ],
        sources=[ref('ES-C4-5E-PRES-01', 'Se présenter')]),

    'ES-C4-5E-PRAES-01': dict(duree=6, essentiel=
        'Au présent, on enlève -ar, -er ou -ir et on ajoute la terminaison du sujet.\n'
        'Hablar : hablo, hablas, habla, hablamos, habláis, hablan. Comer : como, comes, come…\n'
        'Le sujet est souvent omis : la terminaison suffit. Hablo español.',
        parties=[
            ('Trois groupes', [
                {'type': 'tableau', 'titre': 'Présent', 'colonnes': ['Sujet', 'hablar', 'comer', 'vivir'], 'lignes': [
                    ['yo', 'hablo', 'como', 'vivo'], ['tú', 'hablas', 'comes', 'vives'], ['él, ella, usted', 'habla', 'come', 'vive'], ['nosotros', 'hablamos', 'comemos', 'vivimos'], ['ellos, ustedes', 'hablan', 'comen', 'viven']]},
                bq('« Nosotros … en Madrid. » (vivir)', ['vivimos', 'vivemos', 'viven'], '-ir : -imos.'),
            ]),
            ('Sans pronom', [
                {'type': 'explique', 'texte': 'Comes mucho : tu manges beaucoup. La terminaison -es indique tú.'},
                {'type': 'piege', 'erreur': 'On écrit « yo hablo » partout.', 'correction': 'Le pronom n’est utile que pour insister : Hablo español.'},
            ]),
        ],
        a_toi=[
            q('« Ellos … la televisión. » (mirar)', ['miran', 'miras', 'miramos'], 'Ellos : -an.'),
            q('« Bebes » correspond à :', ['tú', 'yo', 'ella'], 'Terminaison -es.'),
            q('« Escribo » veut dire :', ['j’écris', 'il écrit', 'nous écrivons'], 'Terminaison -o : yo.'),
        ],
        sources=[ref('ES-C4-5E-PRAES-01', 'Le présent')]),

    'ES-C4-5E-SER-01': dict(duree=6, essentiel=
        'Ser : identité, caractère, origine, profession. Soy alto. Es francesa.\n'
        'Estar : lieu et état passager. Estoy en casa. Está cansado.\n'
        'Tener : avoir (tengo, tienes, tiene). Ir : aller (voy, vas, va).',
        parties=[
            ('Quatre verbes', [
                {'type': 'tableau', 'titre': 'Présent', 'colonnes': ['Sujet', 'ser', 'estar', 'tener', 'ir'], 'lignes': [
                    ['yo', 'soy', 'estoy', 'tengo', 'voy'], ['tú', 'eres', 'estás', 'tienes', 'vas'], ['él, ella', 'es', 'está', 'tiene', 'va'], ['nosotros', 'somos', 'estamos', 'tenemos', 'vamos'], ['ellos', 'son', 'están', 'tienen', 'van']]},
                bq('« Mi madre … en el jardín. »', ['está', 'es', 'tiene'], 'Un lieu : estar.'),
            ]),
            ('Ser ou estar', [
                {'type': 'tableau', 'titre': 'Choisir', 'colonnes': ['Ser', 'Estar'], 'lignes': [
                    ['Soy simpático. (caractère)', 'Estoy contento. (état du moment)'], ['Es de Sevilla. (origine)', 'Está en Sevilla. (lieu)']]},
                {'type': 'piege', 'erreur': 'On écrit « Soy en clase ».', 'correction': 'Pour un lieu : Estoy en clase.'},
            ]),
        ],
        a_toi=[
            q('« Hoy … cansada. »', ['estoy', 'soy', 'tengo'], 'État passager.'),
            q('« Mi padre … médico. »', ['es', 'está', 'tiene'], 'Profession : ser.'),
            q('« Nosotros … al cine. » (ir)', ['vamos', 'van', 'vais'], 'Ir : vamos.'),
        ],
        sources=[ref('ES-C4-5E-SER-01', 'Ser, estar, tener, ir')]),

    'ES-C4-5E-ART-01': dict(duree=5, essentiel=
        'Articles définis : el, la, los, las. Indéfinis : un, una, unos, unas.\n'
        'Le pluriel ajoute -s après une voyelle, -es après une consonne : libro → libros, ciudad → ciudades.\n'
        'L’adjectif s’accorde, et le nom de pays s’emploie sans article : Vivo en España.',
        parties=[
            ('Articles et pluriel', [
                {'type': 'tableau', 'titre': 'Articles', 'colonnes': ['Genre', 'Singulier', 'Pluriel'], 'lignes': [
                    ['masculin', 'el / un chico', 'los / unos chicos'], ['féminin', 'la / una chica', 'las / unas chicas']]},
                bq('Le pluriel de « el país » est :', ['los países', 'los paíss', 'las países'], 'Consonne : -es.'),
            ]),
            ('L’accord', [
                {'type': 'explique', 'texte': 'Un chico alto, una chica alta, unos chicos altos, unas chicas altas.'},
                {'type': 'piege', 'erreur': 'On écrit « Vivo en la Francia ».', 'correction': 'La plupart des pays n’ont pas d’article : Vivo en Francia.'},
            ]),
        ],
        a_toi=[
            q('« … casas » (les)', ['las', 'los', 'la'], 'Féminin pluriel.'),
            q('« Una playa … » (bonita)', ['bonita', 'bonito', 'bonitas'], 'Accord au féminin singulier.'),
            q('Quelle phrase est juste ?', ['Vivo en México.', 'Vivo en el México.', 'Vivo a México.'], 'Pas d’article.'),
        ],
        sources=[ref('ES-C4-5E-ART-01', 'Articles, genre et pluriel')]),

    'ES-C4-5E-FAM-01': dict(duree=5, essentiel=
        'La famille : el padre, la madre, los padres, el hermano, la hermana, los abuelos, el tío, la tía, el primo.\n'
        'Mi, tu devant un nom singulier ; mis, tus devant un nom pluriel.\n'
        'Mi hermana se llama Ana. Mis padres son simpáticos.',
        parties=[
            ('Les membres', [
                mots('La familia', ('los padres', 'les parents'), ('los hermanos', 'les frères et sœurs'), ('los abuelos', 'les grands-parents'), ('el tío / la tía', 'l’oncle / la tante'), ('el primo / la prima', 'le cousin / la cousine')),
                bq('« Los padres » désigne :', ['le père et la mère', 'les pères', 'les grands-parents'], 'Les parents.'),
            ]),
            ('Mi ou mis', [
                {'type': 'tableau', 'titre': 'Possessifs', 'colonnes': ['Nombre', 'à moi', 'à toi'], 'lignes': [
                    ['singulier', 'mi hermano', 'tu hermano'], ['pluriel', 'mis hermanos', 'tus hermanos']]},
                {'type': 'piege', 'erreur': 'On écrit « mi abuelos ».', 'correction': 'Nom pluriel : mis abuelos.'},
            ]),
        ],
        a_toi=[
            q('« … primos viven en Cádiz. »', ['Mis', 'Mi', 'Mía'], 'Pluriel.'),
            q('« La tía » est :', ['la tante', 'la grand-mère', 'la cousine'], 'Tía : tante.'),
            q('« ¿Tienes hermanos? » demande :', ['si tu as des frères et sœurs', 'si tu as des cousins', 'si tu as des enfants'], 'Hermanos.'),
        ],
        sources=[ref('ES-C4-5E-FAM-01', 'La famille')]),

    'ES-C4-5E-GUST-01': dict(duree=5, essentiel=
        'Me gusta + nom singulier ou infinitif : me gusta el fútbol, me gusta leer.\n'
        'Me gustan + nom pluriel : me gustan los gatos. Me encanta : j’adore.\n'
        'La préférence : prefiero la playa. No me gusta nada : je n’aime pas du tout.',
        parties=[
            ('Gusta ou gustan', [
                {'type': 'tableau', 'titre': 'Accord', 'colonnes': ['Complément', 'Verbe', 'Exemple'], 'lignes': [
                    ['singulier', 'gusta', 'Me gusta la música.'], ['infinitif', 'gusta', 'Me gusta bailar.'], ['pluriel', 'gustan', 'Me gustan las películas.']]},
                bq('« Me … los perros. »', ['gustan', 'gusta', 'gusto'], 'Perros est au pluriel.'),
            ]),
            ('Pour chacun', [
                mots('Gustar', ('me gusta', 'j’aime'), ('te gusta', 'tu aimes'), ('le gusta', 'il, elle aime'), ('prefiero', 'je préfère'), ('me encanta', 'j’adore')),
                {'type': 'piege', 'erreur': 'On écrit « Yo gusto el chocolate ».', 'correction': 'La chose plait à la personne : Me gusta el chocolate.'},
            ]),
        ],
        a_toi=[
            q('« ¿Te … el chocolate? »', ['gusta', 'gustan', 'gustas'], 'Singulier.'),
            q('« Me encanta nadar. » veut dire :', ['J’adore nager.', 'Je dois nager.', 'Je sais nager.'], 'Encantar.'),
            q('« Prefiero » veut dire :', ['je préfère', 'je prends', 'je prévois'], 'Preferir.'),
        ],
        sources=[ref('ES-C4-5E-GUST-01', 'Gouts et préférences')]),

    'ES-C4-5E-HORA-01': dict(duree=5, essentiel=
        'Les dizaines : veinte, treinta, cuarenta, cincuenta… cien. On relie avec y à partir de 31 : treinta y uno.\n'
        'L’heure : Es la una. Son las dos. Son las dos y cuarto, y media.\n'
        'Son las tres menos cuarto : 2 h 45.',
        parties=[
            ('Compter', [
                mots('Números', ('veintiuno', '21'), ('treinta y cinco', '35'), ('cuarenta y ocho', '48'), ('setenta', '70'), ('cien', '100')),
                bq('« Sesenta y dos » :', ['62', '72', '26'], 'Sesenta : 60.'),
            ]),
            ('Dire l’heure', [
                {'type': 'tableau', 'titre': '¿Qué hora es?', 'colonnes': ['Espagnol', 'Heure'], 'lignes': [
                    ['Es la una.', '1 h'], ['Son las cinco.', '5 h'], ['Son las cinco y cuarto.', '5 h 15'], ['Son las cinco y media.', '5 h 30'], ['Son las seis menos cuarto.', '5 h 45']]},
                {'type': 'piege', 'erreur': 'On écrit « Son la una ».', 'correction': 'Une heure est au singulier : Es la una.'},
            ]),
        ],
        a_toi=[
            q('« Son las ocho y media » :', ['8 h 30', '7 h 30', '8 h 15'], 'Y media : et demie.'),
            q('« Setenta » :', ['70', '60', '17'], 'Siete → setenta.'),
            q('« À dix heures » se dit :', ['a las diez', 'en las diez', 'son las diez'], 'A las + heure.'),
        ],
        sources=[ref('ES-C4-5E-HORA-01', 'Nombres et heure')]),

    'ES-C4-5E-FUT-01': dict(duree=5, essentiel=
        'Ir a + infinitif exprime un projet proche : Voy a visitar Madrid.\n'
        'Me gustaría + infinitif exprime un souhait : Me gustaría ser veterinaria.\n'
        'Repères : mañana, el fin de semana que viene, el año próximo.',
        parties=[
            ('Projets', [
                {'type': 'tableau', 'titre': 'Ir a + infinitif', 'colonnes': ['Sujet', 'Exemple'], 'lignes': [
                    ['yo', 'Voy a estudiar.'], ['tú', 'Vas a viajar.'], ['nosotros', 'Vamos a jugar.'], ['ellos', 'Van a salir.']]},
                bq('« Mañana … a ir a la playa. »', ['voy', 'soy', 'tengo'], 'Ir a.'),
            ]),
            ('Souhaits', [
                {'type': 'explique', 'texte': '« Me gustaría aprender a surfear. » : j’aimerais apprendre à surfer.'},
                {'type': 'piege', 'erreur': 'On oublie a : « Voy comer ».', 'correction': 'Il faut a : Voy a comer.'},
            ]),
        ],
        a_toi=[
            q('« Me gustaría » veut dire :', ['j’aimerais', 'j’aime', 'je dois'], 'Souhait.'),
            q('Quelle phrase est juste ?', ['Vamos a cenar.', 'Vamos cenar.', 'Vamos de cenar.'], 'Ir a + infinitif.'),
            q('« El año próximo » veut dire :', ['l’année prochaine', 'l’année dernière', 'cette année'], 'Próximo.'),
        ],
        sources=[ref('ES-C4-5E-FUT-01', 'Le futur proche')]),

    'ES-C4-5E-MEX-01': dict(duree=6, essentiel=
        'Le Mexique est le pays où vivent le plus d’hispanophones. Sa capitale est Mexico (Ciudad de México), la monnaie le peso.\n'
        'Avant la conquête espagnole vivaient les Mayas et les Aztèques, dont la capitale était Tenochtitlan.\n'
        'Le Día de Muertos, début novembre, honore les défunts avec des autels colorés.',
        parties=[
            ('Repères', [
                {'type': 'tableau', 'titre': 'Le Mexique', 'colonnes': ['Thème', 'Repère'], 'lignes': [
                    ['capitale', 'Ciudad de México'], ['civilisations anciennes', 'Mayas (Chichén Itzá), Aztèques (Tenochtitlan)'], ['conquête', 'Hernán Cortés, 1519-1521'], ['indépendance', 'appel de 1810, obtenue en 1821'], ['artiste', 'Frida Kahlo, peintre']]},
                bq('La capitale aztèque était :', ['Tenochtitlan', 'Chichén Itzá', 'Cuzco'], 'Mexico est construite dessus.'),
            ]),
            ('Le Día de Muertos', [
                {'type': 'explique', 'texte': 'Les 1er et 2 novembre, les familles dressent un autel avec des photos, des fleurs orange et des têtes de mort en sucre.'},
                {'type': 'piege', 'erreur': 'On confond le Día de Muertos avec Halloween.', 'correction': 'C’est une fête familiale pour se souvenir des défunts, pas une fête pour faire peur.'},
            ]),
        ],
        a_toi=[
            q('La monnaie du Mexique est :', ['le peso', 'l’euro', 'le dollar'], 'El peso mexicano.'),
            q('Chichén Itzá est une cité :', ['maya', 'aztèque', 'inca'], 'Dans le Yucatán.'),
            q('Frida Kahlo était :', ['peintre', 'reine', 'conquistador'], 'Artiste mexicaine.'),
        ],
        sources=[ref('ES-C4-5E-MEX-01', 'Le Mexique')]),

    'ES-C4-5E-GER-01': dict(duree=5, essentiel=
        'Estar + gérondif décrit une action en cours : Estoy comiendo. Está lloviendo.\n'
        'Le gérondif : -ar → -ando (hablando), -er et -ir → -iendo (comiendo, viviendo).\n'
        'Quelques irréguliers : leer → leyendo, dormir → durmiendo.',
        parties=[
            ('Former le gérondif', [
                {'type': 'tableau', 'titre': 'Gérondif', 'colonnes': ['Infinitif', 'Gérondif', 'Exemple'], 'lignes': [
                    ['hablar', 'hablando', 'Estoy hablando.'], ['comer', 'comiendo', 'Estamos comiendo.'], ['escribir', 'escribiendo', 'Está escribiendo.'], ['leer', 'leyendo', 'Estás leyendo.']]},
                bq('« Mi hermano está … » (dormir)', ['durmiendo', 'dormiendo', 'dormido'], 'Irrégulier.'),
            ]),
            ('Décrire une image', [
                {'type': 'explique', 'texte': 'En la foto, los niños están jugando y una mujer está leyendo.'},
                {'type': 'piege', 'erreur': 'On emploie ser : « Soy comiendo ».', 'correction': 'Toujours estar : Estoy comiendo.'},
            ]),
        ],
        a_toi=[
            q('Le gérondif de « bailar » :', ['bailando', 'bailiendo', 'bailado'], '-ar → -ando.'),
            q('« Está lloviendo » veut dire :', ['Il est en train de pleuvoir.', 'Il a plu.', 'Il pleuvra.'], 'Action en cours.'),
            q('« Nosotros … viendo una película. »', ['estamos', 'somos', 'vamos'], 'Estar + gérondif.'),
        ],
        sources=[ref('ES-C4-5E-GER-01', 'Estar + gérondif')]),

    'ES-C4-5E-IMPF-01': dict(duree=5, essentiel=
        'L’imparfait décrit une habitude ou une situation passée : Cuando era pequeño, jugaba en el parque.\n'
        'Verbes en -ar : -aba (hablaba). Verbes en -er et -ir : -ía (comía, vivía).\n'
        'Nosotros prend un accent : hablábamos.',
        parties=[
            ('Les terminaisons', [
                {'type': 'tableau', 'titre': 'Imparfait', 'colonnes': ['Sujet', 'jugar', 'comer'], 'lignes': [
                    ['yo', 'jugaba', 'comía'], ['tú', 'jugabas', 'comías'], ['él, ella', 'jugaba', 'comía'], ['nosotros', 'jugábamos', 'comíamos'], ['ellos', 'jugaban', 'comían']]},
                bq('« Antes, mis abuelos … en el campo. » (vivir)', ['vivían', 'vivaban', 'viven'], '-ir : -ían.'),
            ]),
            ('Raconter son enfance', [
                {'type': 'explique', 'texte': 'Cuando tenía ocho años, iba a la escuela a pie y veía a mis amigos cada día.'},
                {'type': 'piege', 'erreur': 'On met -aba à un verbe en -er : « comaba ».', 'correction': '-er et -ir prennent -ía : comía.'},
            ]),
        ],
        a_toi=[
            q('« Yo … mucho de pequeño. » (leer)', ['leía', 'leaba', 'leo'], '-er : -ía.'),
            q('L’imparfait sert à :', ['décrire une habitude passée', 'raconter une action unique', 'parler du futur'], 'Antes, cada día…'),
            q('« Hablábamos » correspond à :', ['nosotros', 'ellos', 'yo'], '-ábamos.'),
        ],
        sources=[ref('ES-C4-5E-IMPF-01', 'L’imparfait')]),

    'ES-C4-5E-COMP-01': dict(duree=5, essentiel=
        'Supériorité : más… que. Infériorité : menos… que. Égalité : tan… como.\n'
        'Madrid es más grande que Sevilla. El tren es menos caro que el avión. Soy tan alto como tú.\n'
        'Irréguliers : mejor (meilleur), peor (pire).',
        parties=[
            ('Trois comparatifs', [
                {'type': 'tableau', 'titre': 'Comparer', 'colonnes': ['Degré', 'Structure', 'Exemple'], 'lignes': [
                    ['supériorité', 'más + adj. + que', 'Ana es más alta que Luis.'], ['infériorité', 'menos + adj. + que', 'El gato es menos rápido que el perro.'], ['égalité', 'tan + adj. + como', 'Es tan simpático como su hermano.']]},
                bq('« Este libro es … interesante … el otro. » (égalité)', ['tan … como', 'más … como', 'tan … que'], 'Égalité.'),
            ]),
            ('Mejor et peor', [
                {'type': 'piege', 'erreur': 'On écrit « más bueno que » pour « meilleur ».', 'correction': 'On dit mejor que : Esta pizza es mejor que la otra.'},
            ]),
        ],
        a_toi=[
            q('« Moins cher que » se dit :', ['menos caro que', 'más caro que', 'tan caro como'], 'Menos… que.'),
            q('« Peor » veut dire :', ['pire', 'meilleur', 'pareil'], 'Comparatif de malo.'),
            q('Quelle phrase est juste ?', ['Soy más alto que mi padre.', 'Soy más alto como mi padre.', 'Soy tan alto que mi padre.'], 'Más… que.'),
        ],
        sources=[ref('ES-C4-5E-COMP-01', 'Comparer : más, menos, tan')]),

    'ES-C4-5E-DIPH-01': dict(duree=5, essentiel=
        'Certains verbes changent de voyelle quand l’accent tombe sur le radical : poder → puedo, empezar → empiezo, volver → vuelvo.\n'
        'La diphtongue apparait à yo, tú, él et ellos.\n'
        'Nosotros et vosotros gardent la voyelle de l’infinitif : podemos, empezamos.',
        parties=[
            ('Les diphtongues', [
                {'type': 'tableau', 'titre': 'Présent', 'colonnes': ['Sujet', 'poder', 'empezar', 'volver'], 'lignes': [
                    ['yo', 'puedo', 'empiezo', 'vuelvo'], ['tú', 'puedes', 'empiezas', 'vuelves'], ['él, ella', 'puede', 'empieza', 'vuelve'], ['nosotros', 'podemos', 'empezamos', 'volvemos'], ['ellos', 'pueden', 'empiezan', 'vuelven']]},
                bq('« La clase … a las ocho. » (empezar)', ['empieza', 'empeza', 'empiezamos'], 'E → ie.'),
            ]),
            ('Repérer', [
                {'type': 'piege', 'erreur': 'On diphtongue aussi nosotros : « puedemos ».', 'correction': 'Nosotros garde la voyelle : podemos.'},
            ]),
        ],
        a_toi=[
            q('« ¿… venir conmigo? » (poder, tú)', ['Puedes', 'Podes', 'Pueden'], 'O → ue.'),
            q('« Nosotros … a casa. » (volver)', ['volvemos', 'vuelvemos', 'vuelven'], 'Pas de diphtongue.'),
            q('« Quiero » vient de :', ['querer', 'quedar', 'quitar'], 'E → ie.'),
        ],
        sources=[ref('ES-C4-5E-DIPH-01', 'Verbes à diphtongue')]),

    # ---------------------------------------------------------------------- 4e
    'ES-C4-4E-PASS-01': dict(duree=6, essentiel=
        'Le passé simple (pretérito indefinido) raconte une action terminée et datée : Ayer visité el museo.\n'
        '-ar : -é, -aste, -ó, -amos, -asteis, -aron. -er et -ir : -í, -iste, -ió, -imos, -isteis, -ieron.\n'
        'Irréguliers fréquents : ir et ser → fui, fue ; hacer → hice, hizo ; tener → tuve, tuvo.',
        parties=[
            ('Les terminaisons', [
                {'type': 'tableau', 'titre': 'Indefinido', 'colonnes': ['Sujet', 'visitar', 'comer', 'ir / ser'], 'lignes': [
                    ['yo', 'visité', 'comí', 'fui'], ['tú', 'visitaste', 'comiste', 'fuiste'], ['él, ella', 'visitó', 'comió', 'fue'], ['nosotros', 'visitamos', 'comimos', 'fuimos'], ['ellos', 'visitaron', 'comieron', 'fueron']]},
                bq('« El año pasado … a Perú. » (ir, nosotros)', ['fuimos', 'íbamos', 'vamos'], 'Action terminée et datée.'),
            ]),
            ('Repères', [
                mots('Marqueurs', ('ayer', 'hier'), ('anoche', 'hier soir'), ('el año pasado', 'l’année dernière'), ('hace dos días', 'il y a deux jours')),
                {'type': 'piege', 'erreur': 'On oublie l’accent : « hable » au lieu de « habló ».', 'correction': 'L’accent écrit change le sens : habló (il parla), hablo (je parle).'},
            ]),
        ],
        a_toi=[
            q('« Ayer … una pizza. » (comer, yo)', ['comí', 'comía', 'como'], 'Indefinido.'),
            q('« Hizo » vient de :', ['hacer', 'ir', 'hablar'], 'Irrégulier.'),
            q('« Hace tres días » veut dire :', ['il y a trois jours', 'dans trois jours', 'depuis trois jours'], 'Hace : il y a.'),
        ],
        sources=[ref('ES-C4-4E-PASS-01', 'Raconter au passé simple')]),

    'ES-C4-4E-OBLIG-01': dict(duree=4, essentiel=
        'Tener que + infinitif : obligation personnelle. Tengo que estudiar.\n'
        'Hay que + infinitif : obligation générale, pour tout le monde. Hay que respetar las normas.\n'
        'Tener se conjugue, hay ne change pas.',
        parties=[
            ('Deux obligations', [
                {'type': 'tableau', 'titre': 'Obligation', 'colonnes': ['Forme', 'Pour qui', 'Exemple'], 'lignes': [
                    ['tener que', 'une personne précise', 'Tienes que ordenar tu cuarto.'], ['hay que', 'tout le monde', 'Hay que llegar a la hora.']]},
                bq('« En la biblioteca, … hablar bajo. »', ['hay que', 'tengo que', 'tiene'], 'Règle générale.'),
            ]),
            ('La construction', [
                {'type': 'piege', 'erreur': 'On écrit « Tengo estudiar ».', 'correction': 'Il faut que : Tengo que estudiar.'},
            ]),
        ],
        a_toi=[
            q('« Nosotros … que salir. »', ['tenemos', 'hay', 'tienen'], 'Tener conjugué.'),
            q('« Hay que reciclar » veut dire :', ['Il faut recycler.', 'J’ai recyclé.', 'Il y a du recyclage.'], 'Obligation générale.'),
            q('Quelle phrase est juste ?', ['Tienes que descansar.', 'Tienes descansar.', 'Hay que tú descansar.'], 'Tener que + infinitif.'),
        ],
        sources=[ref('ES-C4-4E-OBLIG-01', 'L’obligation')]),

    'ES-C4-4E-DIPH-01': dict(duree=5, essentiel=
        'Trois diphtongues au présent : e → ie (querer : quiero), o → ue (dormir : duermo), u → ue (jugar : juego).\n'
        'Elles touchent yo, tú, él et ellos, pas nosotros ni vosotros.\n'
        'Autres verbes : pensar, preferir, empezar ; poder, volver, contar.',
        parties=[
            ('Trois modèles', [
                {'type': 'tableau', 'titre': 'Diphtongues', 'colonnes': ['Sujet', 'querer', 'dormir', 'jugar'], 'lignes': [
                    ['yo', 'quiero', 'duermo', 'juego'], ['tú', 'quieres', 'duermes', 'juegas'], ['él, ella', 'quiere', 'duerme', 'juega'], ['nosotros', 'queremos', 'dormimos', 'jugamos'], ['ellos', 'quieren', 'duermen', 'juegan']]},
                bq('« Mi hermano … al baloncesto. » (jugar)', ['juega', 'juga', 'jueguamos'], 'U → ue.'),
            ]),
            ('Retenir', [
                {'type': 'methode', 'titre': 'Conjuguer', 'etapes': ['Repère la voyelle du radical : pensar.', 'Est-ce yo, tú, él ou ellos ? Diphtongue : pienso.', 'Nosotros ? Pas de diphtongue : pensamos.']},
                {'type': 'piege', 'erreur': 'On écrit « jugo » pour « je joue ».', 'correction': 'Jugar diphtongue : juego.'},
            ]),
        ],
        a_toi=[
            q('« ¿Qué … hacer? » (preferir, tú)', ['prefieres', 'preferes', 'prefieremos'], 'E → ie.'),
            q('« Ellos … ocho horas. » (dormir)', ['duermen', 'dormen', 'durmen'], 'O → ue.'),
            q('« Nosotros … en ti. » (pensar)', ['pensamos', 'piensamos', 'piensan'], 'Pas de diphtongue.'),
        ],
        sources=[ref('ES-C4-4E-DIPH-01', 'Verbes à diphtongue')]),

    'ES-C4-4E-DIA-01': dict(duree=5, essentiel=
        'La journée se raconte avec des verbes pronominaux : me levanto, me ducho, me visto, me acuesto.\n'
        'L’heure se donne avec a las : a las siete, a las ocho y media.\n'
        'Les moments : por la mañana, por la tarde, por la noche.',
        parties=[
            ('Mon emploi du temps', [
                {'type': 'methode', 'titre': 'Un día normal', 'etapes': ['Me levanto a las siete.', 'Desayuno y me visto.', 'Voy al instituto a las ocho.', 'Por la tarde, hago los deberes.', 'Me acuesto a las diez.']},
                bq('« Me acuesto » veut dire :', ['je me couche', 'je me lève', 'je me lave'], 'Acostarse.'),
            ]),
            ('Les moments', [
                mots('El día', ('por la mañana', 'le matin'), ('por la tarde', 'l’après-midi'), ('por la noche', 'le soir, la nuit'), ('el instituto', 'le collège, le lycée'), ('los deberes', 'les devoirs')),
                {'type': 'piege', 'erreur': 'On écrit « en la mañana ».', 'correction': 'En Espagne, on dit por la mañana.'},
            ]),
        ],
        a_toi=[
            q('« Me ducho » veut dire :', ['je me douche', 'je m’habille', 'je déjeune'], 'Ducharse.'),
            q('« À sept heures » :', ['a las siete', 'en las siete', 'son las siete'], 'A las.'),
            q('« Los deberes » sont :', ['les devoirs', 'les droits', 'les cours'], 'À la maison.'),
        ],
        sources=[ref('ES-C4-4E-DIA-01', 'Ma journée')]),

    'ES-C4-4E-CAMI-01': dict(duree=5, essentiel=
        'Demander : Perdone, ¿dónde está la estación? ¿Por dónde se va al museo?\n'
        'Indiquer : siga todo recto, gire a la derecha, tome la primera calle a la izquierda, está enfrente del banco.\n'
        'Al = a + el, del = de + el.',
        parties=[
            ('Le chemin', [
                mots('Indicaciones', ('todo recto', 'tout droit'), ('a la derecha', 'à droite'), ('a la izquierda', 'à gauche'), ('enfrente de', 'en face de'), ('al lado de', 'à côté de'), ('cerca / lejos', 'près / loin')),
                bq('« Gire a la izquierda » veut dire :', ['Tournez à gauche.', 'Tournez à droite.', 'Allez tout droit.'], 'Izquierda : gauche.'),
            ]),
            ('Al et del', [
                {'type': 'explique', 'texte': 'Voy al parque (a + el). La farmacia está enfrente del hotel (de + el). Mais : a la playa, de la plaza.'},
                {'type': 'piege', 'erreur': 'On écrit « a el museo ».', 'correction': 'A + el se contracte : al museo.'},
            ]),
        ],
        a_toi=[
            q('« ¿Está lejos? » demande :', ['si c’est loin', 'si c’est ouvert', 'si c’est cher'], 'Lejos : loin.'),
            q('« Je vais au marché » :', ['Voy al mercado.', 'Voy a el mercado.', 'Voy en mercado.'], 'Contraction.'),
            q('Pour aborder quelqu’un poliment :', ['Perdone', 'Hasta luego', 'Oye tú'], 'Excusez-moi.'),
        ],
        sources=[ref('ES-C4-4E-CAMI-01', 'Demander son chemin')]),

    'ES-C4-4E-VIAJ-01': dict(duree=5, essentiel=
        'L’espagnol est langue officielle en Espagne, dans la plupart des pays d’Amérique latine et en Guinée équatoriale.\n'
        'Des lieux : l’Alhambra à Grenade, la Sagrada Familia à Barcelone, le Machu Picchu au Pérou.\n'
        'Voyager : el billete (en Espagne), el boleto (en Amérique), la estación, el andén, ida y vuelta.',
        parties=[
            ('Lieux célèbres', [
                {'type': 'tableau', 'titre': 'Repères', 'colonnes': ['Lieu', 'Ville, pays', 'Ce que c’est'], 'lignes': [
                    ['la Alhambra', 'Granada, España', 'palais andalou'], ['la Sagrada Familia', 'Barcelona, España', 'basilique de Gaudí'], ['Machu Picchu', 'Perú', 'cité inca'], ['las cataratas del Iguazú', 'Argentina y Brasil', 'chutes d’eau']]},
                bq('La Sagrada Familia a été conçue par :', ['Gaudí', 'Picasso', 'Dalí'], 'Architecte catalan.'),
            ]),
            ('À la gare', [
                mots('El viaje', ('un billete de ida y vuelta', 'un aller-retour'), ('el andén', 'le quai'), ('la maleta', 'la valise'), ('el retraso', 'le retard')),
                {'type': 'piege', 'erreur': 'On croit qu’on parle portugais au Mexique ou espagnol au Brésil.', 'correction': 'Le Brésil parle portugais. Le Mexique, l’Argentine ou le Pérou parlent espagnol.'},
            ]),
        ],
        a_toi=[
            q('Le Machu Picchu se trouve au :', ['Pérou', 'Mexique', 'Chili'], 'Cité inca.'),
            q('« La maleta » est :', ['la valise', 'la malle-poste', 'le billet'], 'On y range ses affaires.'),
            q('« Ida y vuelta » veut dire :', ['aller-retour', 'aller simple', 'retour seul'], 'Ida : aller.'),
        ],
        sources=[ref('ES-C4-4E-VIAJ-01', 'Voyager en pays hispanophone')]),

    'ES-C4-4E-PRON-01': dict(duree=5, essentiel=
        'Un verbe pronominal se conjugue avec me, te, se, nos, os, se : me levanto, te llamas, se ducha.\n'
        'Le pronom se place avant le verbe conjugué : Me levanto temprano.\n'
        'Il se soude à l’infinitif, au gérondif et à l’impératif affirmatif : Voy a levantarme. ¡Levántate!',
        parties=[
            ('Conjuguer', [
                {'type': 'tableau', 'titre': 'Levantarse', 'colonnes': ['Sujet', 'Forme'], 'lignes': [
                    ['yo', 'me levanto'], ['tú', 'te levantas'], ['él, ella', 'se levanta'], ['nosotros', 'nos levantamos'], ['ellos', 'se levantan']]},
                bq('« ¿Cómo … llamas? »', ['te', 'se', 'me'], 'Tú → te.'),
            ]),
            ('Placer le pronom', [
                {'type': 'tableau', 'titre': 'Avant ou soudé', 'colonnes': ['Forme', 'Exemple'], 'lignes': [
                    ['verbe conjugué', 'Me acuesto tarde.'], ['infinitif', 'Tengo que acostarme.'], ['impératif affirmatif', '¡Acuéstate!']]},
                {'type': 'piege', 'erreur': 'On écrit « Levanto me ».', 'correction': 'Avant le verbe conjugué : Me levanto.'},
            ]),
        ],
        a_toi=[
            q('« Nosotros … duchamos por la mañana. »', ['nos', 'se', 'os'], 'Nosotros → nos.'),
            q('« Voy a … » (acostarse, yo)', ['acostarme', 'me acostar', 'acostarse'], 'Soudé à l’infinitif.'),
            q('« Se llama Pablo » veut dire :', ['Il s’appelle Pablo.', 'J’appelle Pablo.', 'On appelle Pablo.'], 'Llamarse.'),
        ],
        sources=[ref('ES-C4-4E-PRON-01', 'Les verbes pronominaux')]),

    'ES-C4-4E-PERF-01': dict(duree=5, essentiel=
        'Le passé composé (pretérito perfecto) se forme avec haber + participe : he comido.\n'
        'Participe : -ar → -ado (hablado), -er et -ir → -ido (comido, vivido). Il ne s’accorde pas.\n'
        'En Espagne, il sert pour un passé récent : hoy, esta mañana, este año, ya, todavía no.',
        parties=[
            ('Haber + participe', [
                {'type': 'tableau', 'titre': 'Passé composé', 'colonnes': ['Sujet', 'haber', 'Exemple'], 'lignes': [
                    ['yo', 'he', 'He terminado.'], ['tú', 'has', '¿Has comido?'], ['él, ella', 'ha', 'Ha llovido.'], ['nosotros', 'hemos', 'Hemos visto la película.'], ['ellos', 'han', 'Han salido.']]},
                bq('« Esta mañana … temprano. » (levantarse, yo)', ['me he levantado', 'me levanté ayer', 'he me levantado'], 'Passé récent ; pronom avant haber.'),
            ]),
            ('Participes irréguliers', [
                mots('Participios', ('hacer → hecho', 'fait'), ('decir → dicho', 'dit'), ('ver → visto', 'vu'), ('escribir → escrito', 'écrit'), ('volver → vuelto', 'revenu')),
                {'type': 'piege', 'erreur': 'On emploie ser comme auxiliaire : « Soy llegado ».', 'correction': 'L’espagnol emploie toujours haber : He llegado.'},
            ]),
        ],
        a_toi=[
            q('Le participe de « hacer » :', ['hecho', 'hacido', 'hizo'], 'Irrégulier.'),
            q('« Todavía no he terminado » veut dire :', ['Je n’ai pas encore fini.', 'J’ai déjà fini.', 'Je finirai.'], 'Todavía no : pas encore.'),
            q('« Ellas … llegado. »', ['han', 'son', 'hemos'], 'Haber, sans accord.'),
        ],
        sources=[ref('ES-C4-4E-PERF-01', 'Le passé composé')]),

    'ES-C4-4E-COD-01': dict(duree=6, essentiel=
        'Complément direct : lo, la, los, las. ¿El libro? Lo tengo.\n'
        'Complément indirect : le, les. Le escribo a mi abuela.\n'
        'Quand le et lo se suivent, le devient se : se lo doy. Le pronom se soude à l’infinitif : quiero verlo.',
        parties=[
            ('Direct ou indirect', [
                {'type': 'tableau', 'titre': 'Pronoms', 'colonnes': ['Rôle', 'Singulier', 'Pluriel', 'Exemple'], 'lignes': [
                    ['direct masculin', 'lo', 'los', 'Lo veo.'], ['direct féminin', 'la', 'las', 'Las compro.'], ['indirect', 'le', 'les', 'Les hablo.']]},
                bq('« ¿Tienes la llave? Sí, … tengo. »', ['la', 'lo', 'le'], 'La llave : féminin.'),
            ]),
            ('Se lo', [
                {'type': 'explique', 'texte': '¿Le das el regalo a Marta? Sí, se lo doy. (le + lo → se lo)'},
                {'type': 'piege', 'erreur': 'On écrit « le lo doy ».', 'correction': 'Le devient se devant lo, la, los, las : se lo doy.'},
            ]),
        ],
        a_toi=[
            q('« ¿Compras los tomates? Sí, … compro. »', ['los', 'las', 'les'], 'Masculin pluriel.'),
            q('« Je veux le voir » (le film) :', ['Quiero verlo.', 'Quiero lo ver.', 'Lo quiero veo.'], 'Soudé à l’infinitif.'),
            q('« Le escribo » : le pronom est :', ['indirect', 'direct', 'réfléchi'], 'J’écris à quelqu’un.'),
        ],
        sources=[ref('ES-C4-4E-COD-01', 'Pronoms compléments lo, la, le')]),

    'ES-C4-4E-QUANT-01': dict(duree=5, essentiel=
        'Mucho, poco, bastante, demasiado s’accordent avec le nom : muchos amigos, poca agua.\n'
        'Après un verbe, ils ne changent pas : trabajo mucho.\n'
        'Muy se place devant un adjectif ou un adverbe : muy alto, muy bien. Jamais « muy mucho ».',
        parties=[
            ('Accorder', [
                {'type': 'tableau', 'titre': 'Avec un nom', 'colonnes': ['Mot', 'Masculin', 'Féminin'], 'lignes': [
                    ['beaucoup', 'muchos libros', 'muchas casas'], ['peu', 'poco dinero', 'poca leche'], ['trop', 'demasiados coches', 'demasiada gente'], ['assez', 'bastantes chicos', 'bastantes chicas']]},
                bq('« Hay … personas en la calle. »', ['muchas', 'muchos', 'mucho'], 'Personas : féminin pluriel.'),
            ]),
            ('Mucho ou muy', [
                {'type': 'tableau', 'titre': 'Choisir', 'colonnes': ['Devant…', 'Mot', 'Exemple'], 'lignes': [
                    ['un nom', 'mucho', 'mucho tiempo'], ['un adjectif', 'muy', 'muy cansado'], ['après un verbe', 'mucho', 'Lee mucho.']]},
                {'type': 'piege', 'erreur': 'On écrit « Es mucho bonito ».', 'correction': 'Devant un adjectif : Es muy bonito.'},
            ]),
        ],
        a_toi=[
            q('« Estoy … contento. »', ['muy', 'mucho', 'muchos'], 'Devant un adjectif.'),
            q('« Hay … ruido. » (trop)', ['demasiado', 'demasiada', 'muy'], 'Ruido : masculin.'),
            q('« Duerme … » (beaucoup)', ['mucho', 'muy', 'muchos'], 'Après un verbe.'),
        ],
        sources=[ref('ES-C4-4E-QUANT-01', 'Mucho, poco, demasiado')]),

    # ---------------------------------------------------------------------- 3e
    'ES-C4-3E-IMPF-01': dict(duree=6, essentiel=
        'L’imparfait décrit le décor et les habitudes du passé : -aba pour -ar, -ía pour -er et -ir.\n'
        'Trois verbes irréguliers : ser (era), ir (iba), ver (veía).\n'
        'Le passé simple raconte une action ponctuelle : Llovía cuando salí.',
        parties=[
            ('Les irréguliers', [
                {'type': 'tableau', 'titre': 'Imparfait irrégulier', 'colonnes': ['Sujet', 'ser', 'ir', 'ver'], 'lignes': [
                    ['yo', 'era', 'iba', 'veía'], ['tú', 'eras', 'ibas', 'veías'], ['él, ella', 'era', 'iba', 'veía'], ['nosotros', 'éramos', 'íbamos', 'veíamos'], ['ellos', 'eran', 'iban', 'veían']]},
                bq('« Cuando … pequeña, vivía en Málaga. »', ['era', 'fui', 'estaba'], 'Description : imparfait de ser.'),
            ]),
            ('Imparfait ou passé simple', [
                {'type': 'tableau', 'titre': 'Deux passés', 'colonnes': ['Temps', 'Rôle', 'Exemple'], 'lignes': [
                    ['imparfait', 'décor, habitude', 'Hacía sol. Siempre íbamos a la playa.'], ['indefinido', 'action unique', 'Un día, encontré una cartera.']]},
                {'type': 'piege', 'erreur': 'On met tout le récit à l’imparfait.', 'correction': 'Les actions qui font avancer l’histoire sont au passé simple.'},
            ]),
        ],
        a_toi=[
            q('« Todos los veranos … a casa de mis abuelos. »', ['íbamos', 'fuimos', 'vamos'], 'Habitude.'),
            q('« Veía » vient de :', ['ver', 'venir', 'vivir'], 'Irrégulier.'),
            q('« … las diez cuando llegó. »', ['Eran', 'Fueron', 'Son'], 'Le décor : imparfait.'),
        ],
        sources=[ref('ES-C4-3E-IMPF-01', 'L’imparfait')]),

    'ES-C4-3E-FUT-01': dict(duree=6, essentiel=
        'Le futur simple ajoute à l’infinitif : -é, -ás, -á, -emos, -éis, -án. Hablaré, comeré, viviré.\n'
        'Irréguliers : tendré, haré, podré, saldré, diré, vendré, querré.\n'
        'Ir a + infinitif exprime un projet proche : Voy a estudiar medicina.',
        parties=[
            ('Former le futur', [
                {'type': 'tableau', 'titre': 'Futur simple', 'colonnes': ['Sujet', 'trabajar', 'tener'], 'lignes': [
                    ['yo', 'trabajaré', 'tendré'], ['tú', 'trabajarás', 'tendrás'], ['él, ella', 'trabajará', 'tendrá'], ['nosotros', 'trabajaremos', 'tendremos'], ['ellos', 'trabajarán', 'tendrán']]},
                bq('« En el futuro, … en Londres. » (vivir, yo)', ['viviré', 'vivaré', 'vivo'], 'Infinitif + -é.'),
            ]),
            ('Parler de son métier', [
                mots('Profesiones', ('médico / médica', 'médecin'), ('ingeniero / ingeniera', 'ingénieur'), ('abogado / abogada', 'avocat'), ('profesor / profesora', 'professeur')),
                {'type': 'piege', 'erreur': 'On écrit « teneré ».', 'correction': 'Tener est irrégulier : tendré.'},
            ]),
        ],
        a_toi=[
            q('Le futur de « hacer » (yo) :', ['haré', 'haceré', 'hice'], 'Irrégulier.'),
            q('« Seré profesora » veut dire :', ['Je serai professeure.', 'J’étais professeure.', 'Je suis professeure.'], 'Futur de ser.'),
            q('« Podremos » vient de :', ['poder', 'poner', 'pedir'], 'Irrégulier.'),
        ],
        sources=[ref('ES-C4-3E-FUT-01', 'Futur et projets')]),

    'ES-C4-3E-OPIN-01': dict(duree=5, essentiel=
        'Donner son avis : Creo que…, Pienso que…, En mi opinión…, Para mí…\n'
        'Accord : Estoy de acuerdo contigo. Tienes razón. Désaccord : No estoy de acuerdo.\n'
        'Nuancer : Depende. Es verdad, pero… Por un lado… por otro lado…',
        parties=[
            ('Exprimer un avis', [
                mots('Opinar', ('En mi opinión,…', 'À mon avis,…'), ('Estoy de acuerdo.', 'Je suis d’accord.'), ('Tienes razón.', 'Tu as raison.'), ('Por un lado… por otro lado…', 'D’un côté… de l’autre…'), ('Depende.', 'Ça dépend.')),
                bq('« Tienes razón » veut dire :', ['Tu as raison.', 'Tu as une raison.', 'Tu raisonnes.'], 'Tener razón.'),
            ]),
            ('Argumenter', [
                {'type': 'methode', 'titre': 'Un avis argumenté', 'etapes': ['Pienso que las redes sociales son útiles.', 'Primero, permiten hablar con amigos lejanos.', 'Sin embargo, hay que limitar el tiempo.', 'Por eso, creo que hay que usarlas con cuidado.']},
                {'type': 'piege', 'erreur': 'On dit « Soy de acuerdo ».', 'correction': 'On dit Estoy de acuerdo.'},
            ]),
        ],
        a_toi=[
            q('Quelle phrase est juste ?', ['Estoy de acuerdo contigo.', 'Soy de acuerdo contigo.', 'Tengo de acuerdo contigo.'], 'Estar de acuerdo.'),
            q('« Sin embargo » introduit :', ['une opposition', 'une cause', 'un exemple'], 'Cependant.'),
            q('« Para mí » veut dire :', ['pour moi', 'par moi', 'avec moi'], 'Avis personnel.'),
        ],
        sources=[ref('ES-C4-3E-OPIN-01', 'Donner son avis')]),

    'ES-C4-3E-COMP-01': dict(duree=5, essentiel=
        'Comparatifs : más… que, menos… que, tan… como, tanto… como (avec un nom).\n'
        'Superlatif : el / la más… de. Es el chico más alto de la clase. Le suffixe -ísimo renforce : altísimo.\n'
        'Irréguliers : mejor, peor, mayor (plus âgé), menor (plus jeune).',
        parties=[
            ('Superlatif', [
                {'type': 'tableau', 'titre': 'Degrés', 'colonnes': ['Forme', 'Exemple'], 'lignes': [
                    ['superlatif relatif', 'el río más largo de España'], ['superlatif absolu', 'un libro interesantísimo'], ['égalité avec un nom', 'Tengo tantos libros como tú.']]},
                bq('« Es la ciudad más bonita … España. »', ['de', 'que', 'en'], 'Superlatif : de.'),
            ]),
            ('Irréguliers', [
                mots('Comparativos', ('mejor', 'meilleur, mieux'), ('peor', 'pire'), ('mayor', 'plus âgé, plus grand'), ('menor', 'plus jeune, plus petit')),
                {'type': 'piege', 'erreur': 'On écrit « tan libros como ».', 'correction': 'Devant un nom : tanto, accordé. Tantos libros como.'},
            ]),
        ],
        a_toi=[
            q('« Mi hermano … » (plus âgé)', ['mayor', 'menor', 'mejor'], 'Mayor : plus âgé.'),
            q('« Riquísimo » veut dire :', ['très délicieux', 'très riche seulement', 'peu bon'], 'Rico + -ísimo.'),
            q('« Tengo … paciencia como tú. »', ['tanta', 'tan', 'tanto'], 'Paciencia : féminin.'),
        ],
        sources=[ref('ES-C4-3E-COMP-01', 'Comparer et le superlatif')]),

    'ES-C4-3E-CONN-01': dict(duree=5, essentiel=
        'Cause : porque, como (en début de phrase). Opposition : pero, sin embargo, aunque.\n'
        'Temps : cuando, luego, después, mientras.\n'
        'Que relie une relative : El libro que leo es genial.',
        parties=[
            ('Les connecteurs', [
                {'type': 'tableau', 'titre': 'Relier', 'colonnes': ['Sens', 'Connecteurs', 'Exemple'], 'lignes': [
                    ['cause', 'porque, como', 'Como llueve, me quedo en casa.'], ['opposition', 'pero, aunque, sin embargo', 'Aunque estoy cansado, salgo.'], ['temps', 'cuando, luego, mientras', 'Cuando llego, ceno.']]},
                bq('« … no tengo dinero, no voy al cine. »', ['Como', 'Porque', 'Pero'], 'Cause en tête : como.'),
            ]),
            ('Porque ou como', [
                {'type': 'piege', 'erreur': 'On ouvre la phrase par porque pour la cause.', 'correction': 'En tête de phrase : como. Après la principale : porque.'},
            ]),
        ],
        a_toi=[
            q('« Aunque » veut dire :', ['bien que, même si', 'parce que', 'quand'], 'Opposition.'),
            q('« No salgo … llueve. »', ['porque', 'como', 'cuando no'], 'Cause après la principale.'),
            q('« Mientras » veut dire :', ['pendant que', 'pourtant', 'ensuite'], 'Simultanéité.'),
        ],
        sources=[ref('ES-C4-3E-CONN-01', 'Relier ses idées')]),

    'ES-C4-3E-HIST-01': dict(duree=6, essentiel=
        '1492 : prise de Grenade et premier voyage de Christophe Colomb vers l’Amérique pour les Rois catholiques.\n'
        'Au XVIe siècle, les Espagnols conquièrent les empires aztèque (Cortés) et inca (Pizarro). Au XIXe, l’Amérique espagnole devient indépendante.\n'
        'En Espagne, la guerre civile (1936-1939) mène à la dictature de Franco, jusqu’en 1975 ; la démocratie revient avec la Constitution de 1978.',
        parties=[
            ('Une frise', [
                {'type': 'frise', 'reperes': [
                    {'annee': 1492, 'date': '1492', 'evenement': 'Prise de Grenade, Colomb atteint l’Amérique.'},
                    {'annee': 1521, 'date': '1521', 'evenement': 'Chute de Tenochtitlan, capitale aztèque.'},
                    {'annee': 1810, 'date': '1810-1825', 'evenement': 'Indépendances en Amérique (Bolívar, San Martín).'},
                    {'annee': 1936, 'date': '1936-1939', 'evenement': 'Guerre civile espagnole.'},
                    {'annee': 1978, 'date': '1978', 'evenement': 'Constitution démocratique espagnole.'}]},
                bq('Simón Bolívar est connu pour :', ['les indépendances d’Amérique du Sud', 'la conquête du Mexique', 'la guerre civile espagnole'], 'El Libertador.'),
            ]),
            ('Situer les évènements', [
                {'type': 'piege', 'erreur': 'On croit que Franco a gouverné jusqu’à la Constitution de 1978.', 'correction': 'Franco meurt en 1975 ; la transition aboutit à la Constitution de 1978.'},
            ]),
        ],
        a_toi=[
            q('En 1492, Christophe Colomb :', ['atteint l’Amérique', 'conquiert le Pérou', 'fonde Madrid'], 'Pour les Rois catholiques.'),
            q('L’empire inca a été conquis par :', ['Pizarro', 'Cortés', 'Bolívar'], 'Au Pérou.'),
            q('La guerre civile espagnole a eu lieu :', ['de 1936 à 1939', 'de 1914 à 1918', 'de 1975 à 1978'], 'Avant la Seconde Guerre mondiale.'),
        ],
        sources=[ref('ES-C4-3E-HIST-01', 'Repères d’histoire hispanique')]),

    'ES-C4-3E-REL-01': dict(duree=5, essentiel=
        'Que relie une relative à une personne ou une chose : la chica que vive aquí, el libro que leo.\n'
        'Donde pour un lieu, cuando pour un moment : la ciudad donde nací, el día cuando llegó.\n'
        'Porque introduit une subordonnée de cause.',
        parties=[
            ('Les relatifs', [
                {'type': 'tableau', 'titre': 'Relier', 'colonnes': ['Mot', 'Pour', 'Exemple'], 'lignes': [
                    ['que', 'personne ou chose', 'El chico que canta es mi primo.'], ['donde', 'un lieu', 'El pueblo donde vivo es pequeño.'], ['cuando', 'un moment', 'Me acuerdo del día cuando te conocí.']]},
                bq('« La casa … nací está en Toledo. »', ['donde', 'que', 'cuando'], 'Un lieu.'),
            ]),
            ('Que sujet et complément', [
                {'type': 'explique', 'texte': 'Que traduit à la fois « qui » et « que » : la película que me gusta, la película que veo.'},
                {'type': 'piege', 'erreur': 'On traduit « qui » par quien dans une relative simple.', 'correction': 'Dans une relative simple, on emploie que : el chico que habla.'},
            ]),
        ],
        a_toi=[
            q('« El perro … ladra es mío. »', ['que', 'quien', 'donde'], 'Relative simple.'),
            q('« Donde » s’emploie pour :', ['un lieu', 'une personne', 'une cause'], 'Où.'),
            q('« No vengo porque estoy enfermo » exprime :', ['une cause', 'un lieu', 'un moment'], 'Porque.'),
        ],
        sources=[ref('ES-C4-3E-REL-01', 'Relatifs et subordonnées')]),

    'ES-C4-3E-MED-01': dict(duree=5, essentiel=
        'El medio ambiente : l’environnement. La contaminación, el cambio climático, la basura, el reciclaje.\n'
        'Des gestes : reciclar, ahorrar agua, apagar la luz, ir en bici.\n'
        'Pour proposer : Hay que…, Deberíamos…, Es importante + infinitif.',
        parties=[
            ('Vocabulaire', [
                mots('Medio ambiente', ('la basura', 'les déchets'), ('el reciclaje', 'le recyclage'), ('ahorrar agua', 'économiser l’eau'), ('apagar la luz', 'éteindre la lumière'), ('las energías renovables', 'les énergies renouvelables')),
                bq('« Ahorrar » veut dire :', ['économiser', 'gaspiller', 'arroser'], 'Ahorrar energía.'),
            ]),
            ('Proposer', [
                {'type': 'explique', 'texte': 'Deberíamos ir al instituto en bici. Hay que separar la basura.'},
                {'type': 'piege', 'erreur': 'On confond « la basura » et « le bazar ».', 'correction': 'La basura : les ordures, les déchets.'},
            ]),
        ],
        a_toi=[
            q('« Deberíamos » veut dire :', ['nous devrions', 'nous devons', 'nous avons dû'], 'Conseil.'),
            q('« El cambio climático » est :', ['le changement climatique', 'la météo', 'le climatiseur'], 'Cambio : changement.'),
            q('« Apagar la luz » veut dire :', ['éteindre la lumière', 'allumer la lumière', 'payer l’électricité'], 'Apagar : éteindre.'),
        ],
        sources=[ref('ES-C4-3E-MED-01', 'Environnement : el medio ambiente')]),

    'ES-C4-3E-PASS-01': dict(duree=5, essentiel=
        'Le passif se forme avec ser + participe accordé avec le sujet : La casa fue construida en 1900.\n'
        'L’auteur est introduit par por : El Quijote fue escrito por Cervantes.\n'
        'Le se impersonnel remplace souvent le passif : Se habla español. Se venden pisos.',
        parties=[
            ('Le passif avec ser', [
                {'type': 'tableau', 'titre': 'Actif et passif', 'colonnes': ['Actif', 'Passif'], 'lignes': [
                    ['Cervantes escribió el Quijote.', 'El Quijote fue escrito por Cervantes.'], ['Gaudí diseñó la Sagrada Familia.', 'La Sagrada Familia fue diseñada por Gaudí.']]},
                bq('« Las cartas fueron … ayer. »', ['enviadas', 'enviado', 'enviados'], 'Accord : féminin pluriel.'),
            ]),
            ('Le se impersonnel', [
                mots('Tournures en se', ('Se habla inglés.', 'On parle anglais.'), ('Se venden bicicletas.', 'Vélos à vendre.'), ('No se puede fumar.', 'Il est interdit de fumer.')),
                {'type': 'piege', 'erreur': 'On écrit « La ciudad fue fundado ».', 'correction': 'Avec ser, le participe s’accorde : fue fundada.'},
            ]),
        ],
        a_toi=[
            q('Dans un passif, l’auteur est introduit par :', ['por', 'para', 'de'], 'Por Cervantes.'),
            q('« Se alquila piso » veut dire :', ['Appartement à louer.', 'Il loue son appartement.', 'L’appartement est loué.'], 'Se impersonnel.'),
            q('« El puente fue … en 1990. »', ['construido', 'construida', 'construir'], 'Puente : masculin.'),
        ],
        sources=[ref('ES-C4-3E-PASS-01', 'Le passif et le se impersonnel')]),

    'ES-C4-3E-IND-01': dict(duree=5, essentiel=
        'Rapporter des paroles : Dice que está cansado. Rapporter une question fermée : Pregunta si quiero venir.\n'
        'Avec un mot interrogatif, on le garde avec son accent : Pregunta dónde vivo.\n'
        'Les pronoms et possessifs changent : « Te quiero » → Dice que me quiere.',
        parties=[
            ('Rapporter', [
                {'type': 'tableau', 'titre': 'Direct et indirect', 'colonnes': ['Direct', 'Indirect'], 'lignes': [
                    ['« Estoy cansado. »', 'Dice que está cansado.'], ['« ¿Quieres venir? »', 'Pregunta si quiero venir.'], ['« ¿Dónde vives? »', 'Pregunta dónde vivo.'], ['« Mi casa es grande. »', 'Dice que su casa es grande.']]},
                bq('« ¿Tienes hambre? » → Me pregunta … tengo hambre.', ['si', 'que', 'cuando'], 'Question fermée : si.'),
            ]),
            ('Changer les personnes', [
                {'type': 'piege', 'erreur': 'On garde le pronom de départ : « Dice que te quiero ».', 'correction': 'On adapte au point de vue : Dice que me quiere.'},
            ]),
        ],
        a_toi=[
            q('« Vengo mañana », dice Ana. → Ana dice que … mañana.', ['viene', 'vengo', 'vienes'], 'Troisième personne.'),
            q('« ¿Cuándo llegas? » → Pregunta … llego.', ['cuándo', 'si', 'que'], 'Le mot interrogatif reste.'),
            q('« Pregunta si » veut dire :', ['il demande si', 'il répond que', 'il dit que'], 'Question rapportée.'),
        ],
        sources=[ref('ES-C4-3E-IND-01', 'Le discours indirect')]),

    'ES-C4-3E-SUBJ-01': dict(duree=6, essentiel=
        'Le subjonctif présent se forme sur la 1re personne du présent : -ar → -e (hable), -er et -ir → -a (coma, viva).\n'
        'Tener → tengo → tenga ; hacer → hago → haga. Irréguliers : ser (sea), ir (vaya), estar (esté).\n'
        'On l’emploie après querer que, esperar que et ojalá : Espero que vengas.',
        parties=[
            ('Former le subjonctif', [
                {'type': 'tableau', 'titre': 'Subjonctif présent', 'colonnes': ['Sujet', 'hablar', 'comer', 'tener'], 'lignes': [
                    ['yo', 'hable', 'coma', 'tenga'], ['tú', 'hables', 'comas', 'tengas'], ['él, ella', 'hable', 'coma', 'tenga'], ['nosotros', 'hablemos', 'comamos', 'tengamos'], ['ellos', 'hablen', 'coman', 'tengan']]},
                bq('« Quiero que tú … la verdad. » (decir)', ['digas', 'dices', 'decir'], 'Digo → diga.'),
            ]),
            ('Quand l’employer', [
                mots('Souhait', ('Quiero que vengas.', 'Je veux que tu viennes.'), ('Espero que tengas suerte.', 'J’espère que tu auras de la chance.'), ('¡Ojalá haga sol!', 'Pourvu qu’il fasse beau !')),
                {'type': 'piege', 'erreur': 'On écrit « Espero que vienes ».', 'correction': 'Esperar que + subjonctif : Espero que vengas.'},
            ]),
        ],
        a_toi=[
            q('« Ojalá … buen tiempo. » (hacer)', ['haga', 'hace', 'hizo'], 'Ojalá + subjonctif.'),
            q('Le subjonctif de « ser » (yo) :', ['sea', 'soy', 'era'], 'Irrégulier.'),
            q('« Mis padres quieren que … » (estudiar, yo)', ['estudie', 'estudio', 'estudiar'], 'Querer que + subjonctif.'),
        ],
        sources=[ref('ES-C4-3E-SUBJ-01', 'Le subjonctif présent')]),
}

ecrire(COURS)
