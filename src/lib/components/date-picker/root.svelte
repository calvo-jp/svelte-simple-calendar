<script lang="ts">
  import type {CreatePopperProps} from '$lib/utils/create-popper/create-popper.svelte.js';
  import type {Snippet} from 'svelte';

  interface Props extends CreatePopperProps {
    value?: Date | null;
    onChange?: ((value: Date) => void) | null;
    children: Snippet;
  }

  let {children}: Props = $props();
</script>

{@render children()}
