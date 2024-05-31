<script lang="ts">
  import type {SvelteHTMLElements} from 'svelte/elements';
  import {getDatePickerContext} from './context.svelte.js';

  type Props = SvelteHTMLElements['div'];

  let {children, ...props}: Props = $props();
  let context = getDatePickerContext();
</script>

{#if context.isOpen}
  <div use:context.floating {...props}>
    {@render children?.()}
  </div>
{/if}
