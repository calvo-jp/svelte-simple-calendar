import {getDaysInMonth} from './get-days-in-month.js';

test('getDaysInMonth', () => {
  const date = new Date(2021, 0, 1);
  const result = getDaysInMonth(date);
  expect(result).toEqual(31);
});
