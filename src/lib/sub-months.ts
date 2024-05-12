import { cloneDate } from './clone-date.js';

export function subMonths(date: Date, months: number) {
  const result = cloneDate(date);
  result.setMonth(result.getMonth() - months);
  return result;
}
