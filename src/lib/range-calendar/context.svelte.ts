import { addMonths } from '$lib/add-months.js';
import { createCalendar, type CreateCalendarConfig } from '$lib/create-calendar.js';
import { subMonths } from '$lib/sub-months.js';
import type { ICalendar, Interval } from '$lib/types.js';
import { getContext, setContext } from 'svelte';

export interface CreateRangeCalendarContextProps extends CreateCalendarConfig {
  value?: Interval | null;
  onChange?: (value: Interval) => void;
}

export type CreateRangeCalendarContextReturn = ReturnType<typeof createRangeCalendarContext>;

export function createRangeCalendarContext(props: CreateRangeCalendarContextProps) {
  let value = $state(props?.value ?? null);
  let baseDate = $state(props?.value?.end ?? new Date());

  const calendars: [current: ICalendar, previous: ICalendar] = $derived.by(() => {
    const config: CreateCalendarConfig = {
      disabledDates: props.disabledDates ?? [],
      weekStartsOn: props.weekStartsOn ?? 'Sunday',
    };

    const previousMonth = subMonths(baseDate, 1);

    return [createCalendar(baseDate, config), createCalendar(previousMonth, config)];
  });

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
      value = newValue;
      props?.onChange?.(newValue);
      baseDate = newValue?.end ?? new Date();
    },
    get calendars() {
      return calendars;
    },
    nextMonth,
    previousMonth,
  };
}

export function setRangeCalendarContext(context: CreateRangeCalendarContextReturn) {
  setContext('range-calendar', context);
}

export function getRangeCalendarContext() {
  const context = getContext<CreateRangeCalendarContextReturn>('range-calendar');
  return context;
}