import {compareAsc} from './compare-asc.js';

test('compareAsc', () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dates = [today, yesterday, tomorrow];
  dates.sort(compareAsc);
  expect(dates).toEqual([yesterday, today, tomorrow]);
});
