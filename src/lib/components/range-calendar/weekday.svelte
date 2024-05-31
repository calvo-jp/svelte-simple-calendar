<script lang="ts">
  import type {Weekday} from '$lib/types/index.js';
  import type {Snippet} from 'svelte';

  interface Props {
    children?: Snippet<[context: Weekday]>;
    data: Weekday;
  }

  let {data, children}: Props = $props();
</script>

{#if children}
  {@render children(data)}
{:else}
  {data.slice(0, 1).toUpperCase()}
{/if}
