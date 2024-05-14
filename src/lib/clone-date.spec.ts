import { cloneDate } from './clone-date.js';

test('cloneDate', () => {
  const date = new Date(2021, 0, 1);
  const result = cloneDate(date);
  expect(result).toEqual(new Date(2021, 0, 1));
});
