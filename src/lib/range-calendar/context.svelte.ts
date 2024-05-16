import { addMonths } from '$lib/add-months.js';
import { compareAsc } from '$lib/compare-asc.js';
import { createCalendar, type CreateCalendarConfig } from '$lib/create-calendar.js';
import { subMonths } from '$lib/sub-months.js';
import type { ICalendar, Interval } from '$lib/types.js';
import { getContext, setContext } from 'svelte';

export interface CreateRangeCalendarContextProps extends CreateCalendarConfig {
  min?: number;
  max?: number;
  value?: Interval | null;
  onChange?: (value: Interval) => void;
}

export type CreateRangeCalendarContextReturn = ReturnType<typeof createRangeCalendarContext>;

export function createRangeCalendarContext(props?: CreateRangeCalendarContextProps) {
  let baseDate = $state.frozen(props?.value?.end ?? new Date());

  let picked = $state.frozen(
    props?.value ? [props.value.start, props.value.end].sort(compareAsc) : [],
  );

  const value: Partial<Interval> | null = $derived.by(() => {
    if (picked.length <= 0) {
      return {};
    } else if (picked.length >= 2) {
      return {
        start: picked[0],
        end: picked[1],
      };
    } else {
      return {
        start: picked[0],
      };
    }
  });

  const calendars: [current: ICalendar, previous: ICalendar] = $derived.by(() => [
    createCalendar(baseDate, props),
    createCalendar(subMonths(baseDate, 1), props),
  ]);

  function pick(...values: Date[]) {
    if (values.length <= 0) return;

    values = values.length >= 2 ? values.sort(compareAsc) : values;
    values = [...values, ...picked].slice(0, 2);

    picked = values;
    baseDate = values[values.length - 1];
  }

  function nextMonth() {
    baseDate = addMonths(baseDate, 1);
  }

  function previousMonth() {
    baseDate = subMonths(baseDate, 1);
  }

  return {
    get value() {
      return value;
    },
    onChange(newValue: Interval) {
      picked = [newValue.start, newValue.end];
      props?.onChange?.(newValue);
      baseDate = newValue?.end ?? new Date();
    },
    get calendars() {
      return calendars;
    },
    nextMonth,
    previousMonth,
    pick,
  };
}

export function setRangeCalendarContext(context: CreateRangeCalendarContextReturn) {
  setContext('calendar-range', context);
}

export function getRangeCalendarContext() {
  return getContext<CreateRangeCalendarContextReturn>('calendar-range');
}

interface CalendarContext {
  readonly calendar: ICalendar;
}

export function setCalendarContext(context: CalendarContext) {
  setContext('calendar-range--calendar', context);
}

export function getCalendarContext() {
  return getContext<CalendarContext>('calendar-range--calendar');
}
