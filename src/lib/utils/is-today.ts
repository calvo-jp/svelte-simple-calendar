import {isSameDay} from './is-same-day.js';

export function isToday(date: Date) {
  return isSameDay(date, new Date());
}
