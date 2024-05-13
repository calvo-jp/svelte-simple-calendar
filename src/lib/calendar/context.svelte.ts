import { addMonths } from '$lib/add-months.js';
import { createCalendar, type CreateCalendarConfig } from '$lib/create-calendar.js';
import { subMonths } from '$lib/sub-months.js';
import { getContext, setContext } from 'svelte';

export interface CreateCalendarContextProps extends CreateCalendarConfig {
  value?: Date | null;
  onChange?: (value: Date | null) => void;
}

export type CreateCalendarContextReturn = ReturnType<typeof createCalendarContext>;

export function createCalendarContext(props?: CreateCalendarContextProps) {
  let value: Date | null = $state(props?.value ?? null);
  let baseDate = $state(props?.value ?? new Date());

  function onChange(newValue: Date | null) {
    value = newValue;
    props?.onChange?.(newValue);
    baseDate = newValue ?? new Date();
  }

  const calendar = $derived.by(() => {
    const disabledDates = props?.disabledDates ?? [];
    const weekStartsOn = props?.weekStartsOn ?? 'Sunday';

    return createCalendar(baseDate, {
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

export function setCalendarContext(context: CreateCalendarContextReturn) {
  setContext('calendar', context);
}

export function getCalendarContext() {
  const context = getContext<CreateCalendarContextReturn>('calendar');
  return context;
}
