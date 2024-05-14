import { subMonths } from './sub-months.js';

test('subMonths', () => {
  const date = new Date(2021, 0, 1);
  const result = subMonths(date, 1);
  expect(result).toEqual(new Date(2020, 11, 1));
});
