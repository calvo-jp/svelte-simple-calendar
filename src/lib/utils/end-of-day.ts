import {cloneDate} from './clone-date.js';

export function endOfDay(date: Date) {
  const result = cloneDate(date);
  result.setHours(23, 59, 59, 999);
  return result;
}
