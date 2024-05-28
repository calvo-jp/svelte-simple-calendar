<script lang="ts">
  import type { Snippet } from 'svelte';
  import CalendarProvider from './calendar-provider.svelte';
  import {
    createRangeCalendarContext,
    setRangeCalendarContext,
    type CreateRangeCalendarContextProps,
    type CreateRangeCalendarContextReturn,
  } from './context.svelte.js';

  interface Props extends CreateRangeCalendarContextProps {
    children: Snippet<[context: CreateRangeCalendarContextReturn]>;
  }

  let {
    /**/
    value = $bindable(null),
    children,
    ...props
  }: Props = $props();

  let context = createRangeCalendarContext({
    value,
    ...props,
  });

  setRangeCalendarContext(context);
</script>

<CalendarProvider data={context.calendar}>
  {@render children(context)}
</CalendarProvider>
