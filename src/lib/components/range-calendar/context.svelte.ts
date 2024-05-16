import type { ICalendar, Interval } from '$lib/types/index.js';
import { addMonths } from '$lib/utils/add-months.js';
import { compareAsc } from '$lib/utils/compare-asc.js';
import { createCalendar, type CreateCalendarConfig } from '$lib/utils/create-calendar.js';
import { isSameDay } from '$lib/utils/is-same-day.js';
import { subMonths } from '$lib/utils/sub-months.js';
import { getContext, setContext } from 'svelte';

export interface CreateRangeCalendarContextProps extends CreateCalendarConfig {
  min?: number;
  max?: number;
  value?: Interval | null;
  onChange?: (value: Interval) => void;
  numOfMonths?: 1 | 2;
}

export type CreateRangeCalendarContextReturn = ReturnType<typeof createRangeCalendarContext>;

export function createRangeCalendarContext(props?: CreateRangeCalendarContextProps) {
  let baseDate = $state(props?.value?.end ?? new Date());

  let picked = $state.frozen(
    props?.value ? [props.value.start, props.value.end].sort(compareAsc) : [],
  );

  const value: Partial<Interval> = $derived.by(() => {
    const l = picked.toSorted(compareAsc);

    return {
      start: l.at(0),
      end: l.at(1),
    };
  });

  const calendars: [current: ICalendar, previous: ICalendar] = $derived([
    createCalendar(baseDate, props),
    createCalendar(subMonths(baseDate, 1), props),
  ]);

  function pick(date: Date) {
    let newValue: Date[];

    newValue = [date, ...picked];
    newValue = newValue.slice(0, 2);

    const shouldKeepView = [
      ...calendars[0].days,
      ...(props?.numOfMonths === 2 ? calendars[1].days : []),
    ].some((obj) => {
      if (obj.isPlaceholder) {
        return false;
      } else {
        return isSameDay(obj.value, date);
      }
    });

    if (!shouldKeepView) {
      baseDate = date;
    }

    if (newValue.length >= 2) {
      const l = newValue.toSorted(compareAsc);

      props?.onChange?.({
        start: l[0],
        end: l[1],
      });
    }

    picked = newValue;
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
