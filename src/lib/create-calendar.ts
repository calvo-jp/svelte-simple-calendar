import { addDays } from './add-days.js';
import { chunk } from './chunk.js';
import { endOfMonth } from './end-of-month.js';
import { getDaysInMonth } from './get-days-in-month.js';
import { isSameDay } from './is-same-day.js';
import { isToday } from './is-today.js';
import { startOfMonth } from './sart-of-month.js';
import { subDays } from './sub-days.js';
import type { CalendarDate, ICalendar, Weekday } from './types.js';

interface CalendarConfig {
  weekStartsOn?: Weekday;
  disabledDates?: Date[] | ((date: Date) => boolean);
}

export function createCalendar(base: Date, config?: CalendarConfig): ICalendar {
  const days: CalendarDate[] = [];

  const monthTotalDays = getDaysInMonth(base);
  const monthFirstDay = startOfMonth(base);
  const monthLastDay = endOfMonth(base);

  const weekStartsOnIndex = weekdays.indexOf(config?.weekStartsOn ?? 'Sunday');

  function checkDisabled(date: Date) {
    return !config?.disabledDates
      ? false
      : Array.isArray(config.disabledDates)
        ? config.disabledDates.some((d) => isSameDay(d, date))
        : config.disabledDates?.(date);
  }

  for (let i = 0; i < monthTotalDays; ++i) {
    const value = addDays(monthFirstDay, i);

    days.push({
      value,
      isToday: isToday(value),
      isDisabled: checkDisabled(value),
      isPlaceholder: false,
      isNextMonthDate: false,
      isPreviousMonthDate: false,
    });
  }

  /*
   * if month doesn't start on user's provided start of week,
   * include days from previous month to fill the whole first week
   */
  if (monthFirstDay.getDay() !== weekStartsOnIndex) {
    let diff: number;

    diff = monthFirstDay.getDay() - weekStartsOnIndex;
    diff = diff < 0 ? 7 + diff : diff;

    for (let i = 1; i <= diff; ++i) {
      const value = subDays(monthFirstDay, i);

      days.unshift({
        value,
        isToday: false,
        isDisabled: checkDisabled(value),
        isPlaceholder: true,
        isNextMonthDate: false,
        isPreviousMonthDate: true,
      });
    }
  }

  /*
   * Fill the rest of the calendar with days from next month
   */
  if (days.length < 42) {
    const diff = 42 - days.length;

    for (let i = 1; i <= diff; ++i) {
      const value = addDays(monthLastDay, i);

      days.push({
        value,
        isToday: false,
        isDisabled: checkDisabled(value),
        isPlaceholder: true,
        isNextMonthDate: true,
        isPreviousMonthDate: false,
      });
    }
  }

  return {
    year: base.getFullYear(),
    month: base.getMonth(),
    weeks: chunk(days, 7),
    days: [
      ...weekdays.slice(weekStartsOnIndex),
      ...weekdays.slice(0, weekStartsOnIndex),
    ],
  };
}

const weekdays: Weekday[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
