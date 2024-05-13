import { addMonths } from '$lib/add-months.js';
import { createRangeCalendar, type CreateRangeCalendarConfig } from '$lib/create-range-calendar.js';
import { subMonths } from '$lib/sub-months.js';
import type { DateRange } from '$lib/types.js';
import { getContext, setContext } from 'svelte';

export interface CreateRangeCalendarContextProps extends CreateRangeCalendarConfig {
  value?: DateRange;
  onChange?: (value: DateRange | null) => void;
}

export type CreateRangeCalendarContextReturn = ReturnType<typeof createRangeCalendarContext>;

export function createRangeCalendarContext(props?: CreateRangeCalendarContextProps) {
  let value = $state(props?.value ?? null);
  let baseDate = $state(props?.value?.to ?? new Date());

  const onChange = $derived(function (newValue: DateRange | null) {
    value = newValue;
    props?.onChange?.(newValue);
    baseDate = newValue?.to ?? new Date();
  });

  const calendar = $derived.by(() => {
    const disabledDates = props?.disabledDates ?? [];
    const weekStartsOn = props?.weekStartsOn ?? 'Sunday';

    return createRangeCalendar(baseDate, {
      disabledDates,
      weekStartsOn,
    });
  });

  function next() {
    baseDate = addMonths(baseDate, 1);
  }

  function previous() {
    baseDate = subMonths(baseDate, 1);
  }

  function clear() {
    onChange(null);
  }

  return {
    get value() {
      return value;
    },
    onChange,
    get baseDate() {
      return baseDate;
    },
    get calendar() {
      return calendar;
    },
    next,
    previous,
    clear,
  };
}

export function setCalendarContext(context: CreateRangeCalendarContextReturn) {
  setContext('range-calendar', context);
}

export function getCalendarContext() {
  const context = getContext<CreateRangeCalendarContextReturn>('range-calendar');
  return context;
}
