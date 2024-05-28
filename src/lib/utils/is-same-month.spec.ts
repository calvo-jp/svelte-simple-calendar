import {isSameMonth} from './is-same-month.js';

test('isSameMonth', () => {
  expect(isSameMonth(new Date(2021, 0, 1), new Date(2021, 0, 25))).toBe(true);
  expect(isSameMonth(new Date(2021, 0, 1), new Date(2021, 1, 25))).toBe(false);
});
