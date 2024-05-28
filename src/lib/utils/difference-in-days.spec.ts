import {differenceInDays} from './difference-in-days.js';

test('diffenceInDays', () => {
  expect(differenceInDays(new Date(2021, 0, 1), new Date(2021, 0, 2))).toBe(1);
});
