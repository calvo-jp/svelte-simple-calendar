import {isSameDay} from './is-same-day.js';

test('isSameDay', () => {
  const date1 = new Date(2021, 0, 1);
  const date2 = new Date(2021, 0, 1);
  const result = isSameDay(date1, date2);
  expect(result).toEqual(true);
});
