import { describe, expect, it } from 'vitest';
import { pourLaVoix } from './oral';

describe('pourLaVoix', () => {
  it.each([
    ['Calcule : 3/5 + 1/5', 'Calcule : 3 cinquièmes plus un cinquième'],
    ['Complète : 4 + … = 12', 'Complète : 4 plus combien égale 12'],
    ['Complète : 72 = 9 × …', 'Complète : 72 égale 9 fois combien'],
    ['Le lit est donc… le chat.', 'Le lit est donc, le chat.'],
    ['Calcule : (−5) + (+3)', 'Calcule : (moins 5) plus (plus 3)'],
    ['Convertis 3,5 m en cm.', 'Convertis 3,5 mètres en centimètres.'],
    ['Un cycliste roule à 15 km/h.', 'Un cycliste roule à 15 kilomètres par heure.'],
    ['L’eau bout à 100 °C.', 'L’eau bout à 100 degrés.'],
    ['Calcule 25 % de 80 €.', 'Calcule 25 pour cent de 80 euros.'],
    ['Calcule : 994 ÷ 1 000', 'Calcule : 994 divisé par 1000'],
    ['graine → plantule → plante fleurie', 'graine, puis plantule, puis plante fleurie'],
    ['Un film dure 2 h 35 min.', 'Un film dure 2 heures 35 minutes.'],
    ['La **fusion** est le passage du solide au liquide.', 'La fusion est le passage du solide au liquide.'],
    ['Compare : 3,7 … 3,70', 'Compare : 3,7, 3,70'],
    ['Vers 3300 avant J.-C.', 'Vers 3300 avant Jésus-Christ'],
    ['Aire : 28 cm².', 'Aire : 28 centimètres carrés.'],
  ])('%s', (entree, attendu) => {
    expect(pourLaVoix(entree)).toBe(attendu);
  });
});
