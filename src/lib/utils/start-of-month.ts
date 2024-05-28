import {cloneDate} from './clone-date.js';

export function startOfMonth(date: Date) {
  const result = cloneDate(date);
  result.setDate(1);
  result.setHours(0, 0, 0, 0);
  return result;
}
