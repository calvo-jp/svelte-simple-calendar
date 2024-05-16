<script lang="ts">
  import type { Snippet } from 'svelte';
  import ContextProvider from './context-provider.svelte';
  import {
    createRangeCalendarContext,
    setRangeCalendarContext,
    type CreateRangeCalendarContextProps,
    type CreateRangeCalendarContextReturn,
  } from './context.svelte.js';

  interface Props extends CreateRangeCalendarContextProps {
    children: Snippet<[context: CreateRangeCalendarContextReturn]>;
  }

  let { value = $bindable(null), children, ...props }: Props = $props();
  let context = createRangeCalendarContext({ value, ...props });

  setRangeCalendarContext(context);

  let currentCalendar = $derived(context.calendars[0]);
  let previousCalendar = $derived(context.calendars[1]);
</script>

<ContextProvider data={previousCalendar}>
  {@render children(context)}
</ContextProvider>
<ContextProvider data={currentCalendar}>
  {@render children(context)}
</ContextProvider>
