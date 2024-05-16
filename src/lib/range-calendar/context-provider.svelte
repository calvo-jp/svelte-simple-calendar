<script lang="ts">
  import type { ICalendar } from '$lib/types.js';
  import type { Snippet } from 'svelte';
  import { setCalendarContext } from './context.svelte.js';

  interface Props {
    data: ICalendar;
    children: Snippet;
  }

  let { data, children }: Props = $props();

  setCalendarContext({
    get calendar() {
      return data;
    },
  });
</script>

{@render children()}
