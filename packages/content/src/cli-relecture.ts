import { readFileSync } from 'node:fs';
import { chargerContenu } from './charger';
import { appliquerRelecture, type Decision } from './relecture';
import { verifierContenu } from './verifier';

// Usage : pnpm content:relecture --decisions decisions.json --par Laurent [--simulation]
// decisions.json : export de l'espace admin (/admin/relecture, bouton « Exporter les décisions »).
const args = process.argv.slice(2);
const valeur = (nom: string) => {
  const i = args.indexOf(nom);
  return i >= 0 ? args[i + 1] : undefined;
};
const fichier = valeur('--decisions');
const par = valeur('--par');
if (!fichier || !par) {
  console.error('Usage : pnpm content:relecture --decisions decisions.json --par <prénom du relecteur> [--simulation]');
  process.exit(1);
}
const simulation = args.includes('--simulation');
const decisions = JSON.parse(readFileSync(fichier, 'utf8')) as Decision[];
const { contenu, erreurs } = chargerContenu();
if (erreurs.length) {
  console.error('Contenu illisible : lancez pnpm content:check.');
  process.exit(1);
}
const bilan = appliquerRelecture(contenu, decisions, par, !simulation);
console.log(`${simulation ? 'Simulation : ' : ''}${bilan.publies.length} élément(s) publié(s), ${bilan.verifiees.length} notion(s) vérifiée(s).`);
if (bilan.introuvables.length) console.log(`Introuvables (contenu modifié depuis ?) : ${bilan.introuvables.map((d) => d.element_id).join(', ')}`);
if (bilan.aCorriger.length) {
  console.log(`\nÀ corriger (${bilan.aCorriger.length}) :`);
  for (const d of bilan.aCorriger) console.log(`- ${d.type} ${d.element_id} : ${d.commentaire || '(sans commentaire)'}`);
}
if (!simulation) {
  const recharge = chargerContenu();
  const bloquants = [...recharge.erreurs, ...verifierContenu(recharge.contenu).filter((c) => c.niveau === 'erreur')];
  if (bloquants.length) {
    console.error('\nAttention : le contenu a maintenant des erreurs bloquantes, lancez pnpm content:check.');
    process.exit(1);
  }
}
