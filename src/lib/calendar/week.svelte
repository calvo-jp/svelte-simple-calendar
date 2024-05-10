<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet<[context: any]>;
  }

  let { ...props }: Props = $props();
</script>
