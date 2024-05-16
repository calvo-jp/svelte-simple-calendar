<script lang="ts">
  import type { ICalendar } from '$lib/types.js';
  import type { Snippet } from 'svelte';

  interface Props {
    data: ICalendar;
    children: Snippet;
  }

  let { data, children }: Props = $props();
</script>

{@render children()}
