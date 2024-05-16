<script lang="ts">
  import type { Weekday } from '$lib/types/index.js';
  import type { Snippet } from 'svelte';
  import { getCalendarContext } from './context.svelte.js';

  interface Props {
    children: Snippet<[context: Weekday]>;
  }

  let { children }: Props = $props();
  let context = getCalendarContext();
</script>

{#each context.calendar.weekdays as weekday}
  {@render children(weekday)}
{/each}
