<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getCalendarContext } from './context.svelte.js';

  interface Props {
    children?: Snippet<[context: Date | null]>;
  }

  let { children }: Props = $props();
  let context = getCalendarContext();
</script>

{#if children}
  {@render children(context.value)}
{:else}
  {context.value?.toLocaleDateString()}
{/if}
