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
</script>

{#each context.calendars as calendar}
  <ContextProvider data={calendar}>
    {@render children(context)}
  </ContextProvider>
{/each}
