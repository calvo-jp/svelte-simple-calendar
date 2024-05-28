import {cloneDate} from './clone-date.js';

export function addDays(date: Date, days: number) {
  const result = cloneDate(date);
  result.setDate(result.getDate() + days);
  return result;
}
