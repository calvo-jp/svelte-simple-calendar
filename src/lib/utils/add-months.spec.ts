import { addMonths } from './add-months.js';

test('addMonths', () => {
  const date = new Date(2021, 0, 1);
  const result = addMonths(date, 1);
  expect(result).toEqual(new Date(2021, 1, 1));
});
