import {cloneDate} from './clone-date.js';
import {compareAsc} from './compare-asc.js';

export function differenceInDays(dateLeft: Date, dateRight: Date) {
  const clone0 = cloneDate(dateLeft);
  const clone1 = cloneDate(dateRight);

  const list = [clone0, clone1].sort(compareAsc);

  const d0 = list[0];
  const d1 = list[1];

  d0.setHours(0, 0, 0, 0);
  d1.setHours(0, 0, 0, 0);

  const diff = d1.getTime() - d0.getTime();

  return Math.round(diff / (1000 * 60 * 60 * 24));
}
