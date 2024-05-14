import { cloneDate } from './clone-date.js';

export function getDaysInMonth(date: Date): number {
  const d = cloneDate(date);

  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  d.setHours(0, 0, 0, 0);

  return d.getDate();
}
