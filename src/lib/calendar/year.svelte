<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getCalendarContext } from './context.svelte.js';

  interface Props {
    children?: Snippet<[context: number]>;
  }

  let { children }: Props = $props();
  let context = getCalendarContext();
</script>

{#if children}
  {@render children(context.calendar.year)}
{:else}
  {context.calendar.year}
{/if}
