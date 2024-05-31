import {cloneDate} from './clone-date.js';

export function endOfMonth(date: Date) {
  const result = cloneDate(date);
  result.setMonth(result.getMonth() + 1);
  result.setDate(0);
  result.setHours(23, 59, 59, 999);
  return result;
}
