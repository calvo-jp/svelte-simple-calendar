import { cloneDate } from './clone-date.js';

export function subDays(date: Date, days: number) {
  const result = cloneDate(date);
  result.setDate(result.getDate() - days);
  return result;
}
