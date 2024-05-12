import { addMonths } from '$lib/add-months.js';
import { createCalendar, type CreateCalendarConfig } from '$lib/create-calendar.js';
import { subMonths } from '$lib/sub-months.js';
import { getContext, setContext } from 'svelte';

export interface CreateCalendarContextProps extends CreateCalendarConfig {
  value?: Date;
  onChange?: (value: Date) => void;
}

export type CreateCalendarContextReturn = ReturnType<typeof createCalendarContext>;

export function createCalendarContext(props?: CreateCalendarContextProps) {
  let value = $state(props?.value ?? new Date());
  let baseDate = $state(props?.value ?? new Date());

  const onChange = $derived(function (newValue: Date) {
    value = newValue;
    props?.onChange?.(newValue);
    baseDate = newValue;
  });

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
  };
}

export function setCalendarContext(context: CreateCalendarContextReturn) {
  setContext('calendar', {
    get value() {
      return context;
    },
  });
}

export function getCalendarContext() {
  const context = getContext<{ value: CreateCalendarContextReturn }>('calendar');
  return context.value;
}
