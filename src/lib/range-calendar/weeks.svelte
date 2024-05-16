<script lang="ts">
  import type { Week } from '$lib/types.js';
  import type { Snippet } from 'svelte';
  import { getCalendarContext } from './context.svelte.js';

  interface Props {
    children: Snippet<[context: Week]>;
  }

  let { children }: Props = $props();
  let context = getCalendarContext();
</script>

{#each context.calendar.weeks as week}
  {@render children(week)}
{/each}
