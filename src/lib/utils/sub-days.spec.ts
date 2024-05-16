import { subDays } from './sub-days.js';

test('subDays', () => {
  const date = new Date(2021, 0, 1);
  const result = subDays(date, 1);
  expect(result).toEqual(new Date(2020, 11, 31));
});
