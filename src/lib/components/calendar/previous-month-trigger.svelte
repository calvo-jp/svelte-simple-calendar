<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { getCalendarContext } from './context.svelte.js';

  type Props = SvelteHTMLElements['button'];

  let { children, onclick, ...props }: Props = $props();
  let context = getCalendarContext();
</script>

<button
  type="button"
  onclick={(e) => {
    context.previousMonth();
    onclick?.(e);
  }}
  {...props}
>
  {@render children?.()}
</button>
