"""QR code de la page d'accueil : ouvre la rubrique « Installer » de hopla-edu.fr sur le téléphone.

    pip install segno
    python3 scripts/qr/generer.py

Sortie : apps/pwa/src/lib/qrHopla.ts (une chaîne de 0 et de 1 par rangée, sans marge).
Le composant QrCode dessine les modules et ajoute la zone blanche réglementaire de 4 modules.
"""
import os
import segno

ADRESSE = 'https://hopla-edu.fr/#installer'
RACINE = os.path.join(os.path.dirname(__file__), '..', '..')
SORTIE = os.path.join(RACINE, 'apps/pwa/src/lib/qrHopla.ts')

qr = segno.make(ADRESSE, error='m', micro=False)
rangees = [''.join('1' if m else '0' for m in rangee) for rangee in qr.matrix]

with open(SORTIE, 'w', encoding='utf-8') as f:
    f.write('// Généré par scripts/qr/generer.py : ne pas éditer.\n')
    f.write(f"export const ADRESSE_QR = '{ADRESSE}';\n\n")
    f.write('export const MODULES_QR: readonly string[] = [\n')
    for r in rangees:
        f.write(f"  '{r}',\n")
    f.write('];\n')
print(f'{len(rangees)} x {len(rangees[0])} modules -> {SORTIE}')
