import { cloneDate } from './clone-date.js';

/** Is `date1` after `date2`? */
export function compareAsc(date1: Date, date2: Date) {
  const d1 = cloneDate(date1);
  const d2 = cloneDate(date2);

  const diff = d1.getTime() - d2.getTime();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
  } else {
    return 0;
  }
}
