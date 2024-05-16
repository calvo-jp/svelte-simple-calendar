import type { CalendarDate, ICalendar, Month, Weekday } from '$lib/types/index.js';
import { addDays } from './add-days.js';
import { chunk } from './chunk.js';
import { createLruCache } from './create-lru-cache.js';
import { endOfMonth } from './end-of-month.js';
import { getDaysInMonth } from './get-days-in-month.js';
import { isSameDay } from './is-same-day.js';
import { isToday } from './is-today.js';
import { startOfMonth } from './start-of-month.js';
import { subDays } from './sub-days.js';

export interface CreateCalendarConfig {
  timezone?: string;
  weekStartsOn?: Weekday;
  disabledDates?: Date[] | ((date: Date) => boolean);
}

export function createCalendar(base: Date, config?: CreateCalendarConfig) {
  const cacheKey = JSON.stringify({
    base,
    config,
  });

  let calendar = cache.get(cacheKey);

  if (calendar) {
    return calendar;
  }

  const dates: CalendarDate[] = [];

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

    dates.push({
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

      dates.unshift({
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
  if (dates.length < 42) {
    const diff = 42 - dates.length;

    for (let i = 1; i <= diff; ++i) {
      const value = addDays(monthLastDay, i);

      dates.push({
        value,
        isToday: false,
        isDisabled: checkDisabled(value),
        isPlaceholder: true,
        isNextMonthDate: true,
        isPreviousMonthDate: false,
      });
    }
  }

  calendar = {
    year: base.getFullYear(),
    month: months[base.getMonth()],
    weeks: chunk(dates, 7),
    weekdays: [
      /**/
      ...weekdays.slice(weekStartsOnIndex),
      ...weekdays.slice(0, weekStartsOnIndex),
    ],
    dates,
  };

  cache.set(cacheKey, calendar);

  return calendar;
}

const cache = createLruCache<string, ICalendar>(512);

const weekdays: Weekday[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const months: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
