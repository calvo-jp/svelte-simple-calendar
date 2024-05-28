import {startOfDay} from './start-of-day.js';

export function isSameDay(date1: Date, date2: Date) {
  return startOfDay(date1).getTime() === startOfDay(date2).getTime();
}
