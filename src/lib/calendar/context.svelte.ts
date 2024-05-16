import { addMonths } from '$lib/add-months.js';
import { createCalendar, type CreateCalendarConfig } from '$lib/create-calendar.js';
import { subMonths } from '$lib/sub-months.js';
import { getContext, setContext } from 'svelte';

export interface CreateCalendarContextProps extends CreateCalendarConfig {
  value?: Date | null;
  onChange?: (value: Date) => void;
}

export type CreateCalendarContextReturn = ReturnType<typeof createCalendarContext>;

export function createCalendarContext(props?: CreateCalendarContextProps) {
  let value = $state(props?.value ?? null);
  let baseDate = $state(props?.value ?? new Date());

  const calendar = $derived.by(() => createCalendar(baseDate, props));

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
    onChange(newValue: Date) {
      value = newValue;
      props?.onChange?.(newValue);
      baseDate = newValue ?? new Date();
    },
    get calendar() {
      return calendar;
    },
    nextMonth,
    previousMonth,
  };
}

export function setCalendarContext(context: CreateCalendarContextReturn) {
  setContext('calendar', context);
}

export function getCalendarContext() {
  const context = getContext<CreateCalendarContextReturn>('calendar');
  return context;
}

export function createRangeCalendarContext() {}
