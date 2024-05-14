import { startOfMonth } from './start-of-month.js';

test('startOfMonth', () => {
  const date = new Date(2021, 0, 1);
  const result = startOfMonth(date);
  expect(result).toEqual(new Date(2021, 0, 1));
});
