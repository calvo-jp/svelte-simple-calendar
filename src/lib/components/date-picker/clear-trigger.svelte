<script lang="ts">
  import type {SvelteHTMLElements} from 'svelte/elements';
  import {getDatePickerContext} from './context.svelte.js';

  type Props = SvelteHTMLElements['div'];

  let {children, onclick, ...props}: Props = $props();
  let context = getDatePickerContext();
</script>

{#if context.value}
  <div
    role="button"
    tabindex="0"
    onclick={(e) => {
      onclick?.(e);
      context.onValueChange(null);
    }}
    {...props}
  >
    {@render children?.()}
  </div>
{/if}
