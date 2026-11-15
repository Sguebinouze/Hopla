// Génère dist/tokens.css depuis tokens.json (copie du design system Hopla).
// tokens.json est la seule source : ne jamais éditer le CSS généré.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(join(root, 'tokens.json'), 'utf8'));
const themes = tokens.color.themes.map((t) => t.id);
const [first] = themes;

const valueFor = (token, theme) =>
  typeof token.value === 'string' ? token.value : token.value[theme] ?? token.value[first];

const themed = [...tokens.color.tokens, ...(tokens.shadow?.tokens ?? [])];
const block = (theme) => themed.map((t) => `  --${t.name}: ${valueFor(t, theme)};`).join('\n');

const plain = ['spacing', 'radius', 'size']
  .flatMap((family) => tokens[family]?.tokens ?? [])
  .map((t) => `  --${t.name}: ${t.value};`);
const fonts = Object.entries(tokens.type.families).map(([key, stack]) => `  --font-${key}: ${stack};`);

const dark = themes.includes('dark') ? block('dark') : '';
const css = `/* Hopla, généré depuis tokens.json : ne pas éditer */
:root, [data-theme="${first}"] {
${block(first)}
}
${dark ? `[data-theme="dark"] {\n${dark}\n}\n@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="${first}"]) {\n${dark.replace(/^/gm, '  ')}\n  }\n}\n` : ''}:root {
${[...plain, ...fonts].join('\n')}
}
`;

mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist', 'tokens.css'), css);
console.log(`tokens.css : ${themed.length} couleurs et ombres, ${plain.length} mesures, ${fonts.length} familles`);
