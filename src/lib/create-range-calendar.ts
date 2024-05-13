import { createCalendar, type CreateCalendarConfig } from './create-calendar.js';
import { subMonths } from './sub-months.js';
import type { DateRange, IRangeCalendar } from './types.js';

export interface CreateRangeCalendarConfig extends CreateCalendarConfig {
  hint?: Partial<DateRange>;
}

export function createRangeCalendar(
  baseDate: Date,
  config?: CreateRangeCalendarConfig,
): IRangeCalendar {
  return [createCalendar(baseDate, config), createCalendar(subMonths(baseDate, 1), config)];
}
