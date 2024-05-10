<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    value?: Date | null;
    onChange?: (value: Date | null) => void;
    children: Snippet<[context: any]>;
  }

  let { value, onChange, children }: Props = $props();
</script>

{@render children({})}
