import { chargerContenu } from './charger';
import { verifierContenu } from './verifier';

const { contenu, erreurs: erreursChargement } = chargerContenu();
const constats = [
  ...erreursChargement.map((e) => ({ niveau: 'erreur' as const, ou: e.fichier, message: e.message })),
  ...verifierContenu(contenu),
];

const erreurs = constats.filter((c) => c.niveau === 'erreur');
const alertes = constats.filter((c) => c.niveau === 'alerte');
const nbCompetences = contenu.referentiels.reduce((n, r) => n + r.competences.length, 0);
const nbExercices = contenu.banques.reduce((n, b) => n + b.exercices.length, 0);

console.log(
  `Contenu : ${contenu.sources.length} sources, ${contenu.programmes.length} programmes, ` +
    `${nbCompetences} compétences, ${nbExercices} exercices rédigés.`,
);
if (alertes.length) {
  console.log(`\n${alertes.length} alerte(s) :`);
  for (const a of alertes) console.log(`  ⚠ ${a.ou} : ${a.message}`);
}
if (erreurs.length) {
  console.error(`\n${erreurs.length} erreur(s) bloquante(s) :`);
  for (const e of erreurs) console.error(`  ✖ ${e.ou} : ${e.message}`);
  process.exit(1);
}
console.log('\nAucune erreur bloquante.');
