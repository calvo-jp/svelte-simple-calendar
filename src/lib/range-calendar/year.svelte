<script lang="ts">
  import type { Year } from '$lib/types.js';
  import type { Snippet } from 'svelte';
  import { getCalendarContext } from './context.svelte.js';

  interface Props {
    children?: Snippet<[context: Year]>;
  }

  let { children }: Props = $props();
  let calendar = getCalendarContext();
</script>

{#if children}
  {@render children(calendar.year)}
{:else}
  {calendar.year}
{/if}
