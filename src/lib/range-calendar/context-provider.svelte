<script lang="ts">
  import type { ICalendar } from '$lib/types.js';
  import type { Snippet } from 'svelte';
  import { setCalendarContext } from './context.svelte.js';

  interface Props {
    calendar: ICalendar;
    children: Snippet;
  }

  let { calendar, children }: Props = $props();

  setCalendarContext(calendar);
</script>

{@render children()}
