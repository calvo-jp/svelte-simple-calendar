import type { ICalendar } from '$lib/types/index.js';
import { createCalendar, type CreateCalendarConfig } from './create-calendar.js';
import { subMonths } from './sub-months.js';

export interface CreateRangeCalendarConfig extends CreateCalendarConfig {}

export function createRangeCalendar(baseDate: Date, config?: CreateRangeCalendarConfig) {
  const calendars: [current: ICalendar, previous: ICalendar] = [
    createCalendar(baseDate, config),
    createCalendar(subMonths(baseDate, 1), config),
  ];

  return calendars;
}
