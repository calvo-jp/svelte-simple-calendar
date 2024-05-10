<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet<[context: any]>;
  }

  let { children }: Props = $props();
</script>

{@render children({})}
