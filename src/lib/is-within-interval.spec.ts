import { isWithinInterval } from './is-within-interval.js';

test('isWithinInterval', () => {
  const date = new Date(2021, 0, 1);
  const startDate = new Date(2021, 0, 1);
  const endDate = new Date(2021, 0, 2);
  const result = isWithinInterval(date, {
    start: startDate,
    end: endDate,
  });
  expect(result).toBe(true);
});
