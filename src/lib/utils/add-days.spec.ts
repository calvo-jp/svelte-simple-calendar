import {addDays} from './add-days.js';

test('addDays', () => {
  const date = new Date(2021, 0, 1);
  const result = addDays(date, 1);
  expect(result).toEqual(new Date(2021, 0, 2));
});
