import { endOfDay } from './end-of-day.js';

test('endOfDay', () => {
  const date = new Date(2021, 0, 1, 12, 34, 56, 789);
  const result = endOfDay(date);
  expect(result).toEqual(new Date(2021, 0, 1, 23, 59, 59, 999));
});
