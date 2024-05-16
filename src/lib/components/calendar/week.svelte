<script lang="ts">
  import type { CalendarDate, Week } from '$lib/types/index.js';
  import type { Snippet } from 'svelte';

  interface Props {
    data: Week;
    children: Snippet<[context: CalendarDate]>;
  }

  let { data, children }: Props = $props();
</script>

{#each data as date}
  {@render children(date)}
{/each}
