<script lang="ts">
  import type { Weekday } from '$lib/types.js';
  import type { Snippet } from 'svelte';
  import { getCalendarContext } from './context.svelte.js';

  interface Props {
    children: Snippet<[context: Weekday]>;
  }

  let { children }: Props = $props();
  let calendar = getCalendarContext();
</script>

{#each calendar.weekdays as weekday}
  {@render children(weekday)}
{/each}
