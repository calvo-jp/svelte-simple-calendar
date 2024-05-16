import type { ICalendar, Interval } from '$lib/types/index.js';
import { addMonths } from '$lib/utils/add-months.js';
import { compareAsc } from '$lib/utils/compare-asc.js';
import { createCalendar, type CreateCalendarConfig } from '$lib/utils/create-calendar.js';
import { subMonths } from '$lib/utils/sub-months.js';
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

  const value: { [K in keyof Interval]: Interval[K] | null } = $derived.by(() => {
    if (picked.length <= 0) {
      return {
        start: null,
        end: null,
      };
    } else if (picked.length >= 2) {
      return {
        start: picked[0],
        end: picked[1],
      };
    } else {
      return {
        start: picked[0],
        end: null,
      };
    }
  });

  const calendars: [current: ICalendar, previous: ICalendar] = $derived.by(() => [
    createCalendar(baseDate, props),
    createCalendar(subMonths(baseDate, 1), props),
  ]);

  function pick(...dates: Date[]) {
    if (dates.length <= 0) return;

    dates = dates.length >= 2 ? dates.sort(compareAsc) : dates;
    dates = [...dates, ...picked].slice(0, 2);
    picked = dates;

    /** TODO */
    const shouldReloadView = false;

    if (shouldReloadView) {
      baseDate = dates[dates.length - 1];
    }

    if (dates.length >= 2) {
      props?.onChange?.({ start: dates[0], end: dates[1] });
    }
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
