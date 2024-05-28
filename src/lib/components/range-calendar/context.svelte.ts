import type {ICalendar, Interval} from '$lib/types/index.js';
import {addMonths} from '$lib/utils/add-months.js';
import {cloneDate} from '$lib/utils/clone-date.js';
import {compareAsc} from '$lib/utils/compare-asc.js';
import {
  createCalendar,
  type CreateCalendarConfig,
} from '$lib/utils/create-calendar.js';
import {differenceInDays} from '$lib/utils/difference-in-days.js';
import {isSameDay} from '$lib/utils/is-same-day.js';
import {subMonths} from '$lib/utils/sub-months.js';
import {getContext, setContext} from 'svelte';

export interface CreateRangeCalendarContextProps extends CreateCalendarConfig {
  value?: Interval | null;
  onChange?: (value: Interval, valueAsArray: Date[]) => void;
}

export type CreateRangeCalendarContextReturn = ReturnType<
  typeof createRangeCalendarContext
>;

export function createRangeCalendarContext(
  props?: CreateRangeCalendarContextProps,
) {
  let baseDate = $state(props?.value?.end ?? new Date());

  let picked = $state.frozen(
    props?.value ? [props.value.start, props.value.end].sort(compareAsc) : [],
  );

  function checkDisabled(date: Date) {
    if (!props?.disabledDates) {
      return false;
    }

    if (Array.isArray(props.disabledDates)) {
      return props.disabledDates.some((d) => isSameDay(d, date));
    }

    return props.disabledDates(date);
  }

  function onChange(newValue: Interval) {
    picked = [newValue.start, newValue.end];
    baseDate = newValue.end;
    props?.onChange?.(
      newValue,
      intervalToArray(newValue).filter((v) => !checkDisabled(v)),
    );
  }

  const value: Partial<Interval> = $derived.by(() => {
    const l = picked.toSorted(compareAsc);

    return {
      start: l.at(0),
      end: l.at(1),
    };
  });

  const calendar = $derived(createCalendar(baseDate, props));

  function pick(date: Date) {
    let newValue: Date[];

    newValue = [date, ...picked];
    newValue = newValue.slice(0, 2);

    const shouldKeepView = calendar.dates.some((obj) => {
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
      const v = {
        start: l[0],
        end: l[1],
      };

      props?.onChange?.(
        v,
        intervalToArray(v).filter((v) => !checkDisabled(v)),
      );
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
    onChange,
    get calendar() {
      return calendar;
    },
    nextMonth,
    previousMonth,
    pick,
  };
}

export function setRangeCalendarContext(
  context: CreateRangeCalendarContextReturn,
) {
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

function intervalToArray(interval: Interval) {
  const l: Date[] = [];
  const i = differenceInDays(interval.start, interval.end);

  let j = 0;

  for (; j <= i; j++) {
    const d = cloneDate(interval.start);

    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + j);

    l.push(d);
  }

  return l;
}
