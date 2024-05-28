import {addMonths} from '$lib/utils/add-months.js';
import {createCalendar, type CreateCalendarConfig} from '$lib/utils/create-calendar.js';
import {subMonths} from '$lib/utils/sub-months.js';
import {getContext, setContext} from 'svelte';

export interface CreateCalendarContextProps extends CreateCalendarConfig {
  value?: Date | null;
  onValueChange?: (value: Date) => void;
}

export type CreateCalendarContextReturn = ReturnType<typeof createCalendarContext>;

export function createCalendarContext(props?: CreateCalendarContextProps) {
  let value = $state.frozen(props?.value ?? null);
  let baseDate = $state.frozen(props?.value ?? new Date());

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
    onValueChange(newValue: Date) {
      value = newValue;
      props?.onValueChange?.(newValue);
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
  return getContext<CreateCalendarContextReturn>('calendar');
}
