<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getCalendarContext } from './context.svelte.js';

  interface Props {
    formatter?: (value: Date) => string;
    children?: Snippet<[context: Date]>;
  }

  let { children, ...props }: Props = $props();
  let formatter = $derived(props.formatter ?? ((d: Date) => d.toLocaleDateString()));
  let context = getCalendarContext();
</script>

{#if children}
  {@render children(context.value)}
{:else}
  {formatter(context.value)}
{/if}
