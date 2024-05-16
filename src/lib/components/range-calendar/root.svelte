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

  let {
    /**/
    value = $bindable(null),
    numOfMonths = 2,
    children,
    ...props
  }: Props = $props();

  let context = createRangeCalendarContext({
    value,
    numOfMonths,
    ...props,
  });

  setRangeCalendarContext(context);

  let currentCalendar = $derived(context.calendars[0]);
  let previousCalendar = $derived(context.calendars[1]);
</script>

{#if numOfMonths === 2}
  <ContextProvider data={previousCalendar}>
    {@render children(context)}
  </ContextProvider>
{/if}

<ContextProvider data={currentCalendar}>
  {@render children(context)}
</ContextProvider>
