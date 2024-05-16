import { cloneDate } from './clone-date.js';

export function startOfDay(date: Date) {
  const result = cloneDate(date);
  result.setHours(0, 0, 0, 0);
  return result;
}
