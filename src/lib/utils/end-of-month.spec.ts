import {endOfMonth} from './end-of-month.js';

test('endOfMonth', () => {
  const date = new Date(2021, 0, 1);
  const result = endOfMonth(date);
  expect(result).toEqual(new Date(2021, 0, 31, 23, 59, 59, 999));
});
