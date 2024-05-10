<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet<[context: any]>;
  }

  let { children, ...props }: Props = $props();
</script>

{@render children({})}
