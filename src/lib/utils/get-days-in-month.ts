import {cloneDate} from './clone-date.js';

export function getDaysInMonth(date: Date): number {
  const clone = cloneDate(date);
  const year = clone.getFullYear();
  const month = clone.getMonth();

  const result = cloneDate(date);

  result.setFullYear(year, month + 1, 0);
  result.setHours(0, 0, 0, 0);

  return result.getDate();
}
