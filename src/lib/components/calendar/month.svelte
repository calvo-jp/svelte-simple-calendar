<script lang="ts">
  import type {Month} from '$lib/types/index.js';
  import type {Snippet} from 'svelte';
  import {getCalendarContext} from './context.svelte.js';

  interface Props {
    snippet?: Snippet<[context: Month]>;
  }

  let {snippet}: Props = $props();
  let context = getCalendarContext();
</script>

{#if snippet}
  {@render snippet(context.calendar.month)}
{:else}
  {context.calendar.month.slice(0, 3)}
{/if}
