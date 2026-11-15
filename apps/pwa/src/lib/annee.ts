/** Année scolaire en cours (la rentrée est fixée au 1er septembre). Même règle que @hopla/content. */
export function anneeScolaire(date = new Date()): string {
  const y = date.getFullYear();
  const debut = date.getMonth() >= 8 ? y : y - 1;
  return `${debut}-${debut + 1}`;
}
