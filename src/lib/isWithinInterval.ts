import { cloneDate } from './clone-date.js';
import type { Interval } from './types.js';

export function isWithinInterval(date: Date, interval: Interval) {
  const time = cloneDate(date).getTime();

  const [startTime, endTime] = [
    cloneDate(interval.start).getTime(),
    cloneDate(interval.end).getTime(),
  ].sort((a, b) => a - b);

  return time >= startTime && time <= endTime;
}
