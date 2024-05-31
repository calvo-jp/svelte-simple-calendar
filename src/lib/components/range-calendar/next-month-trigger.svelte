<script lang="ts">
  import type {SvelteHTMLElements} from 'svelte/elements';
  import {getRangeCalendarContext} from './context.svelte.js';

  type Props = SvelteHTMLElements['button'];

  let {children, onclick, ...props}: Props = $props();
  let context = getRangeCalendarContext();
</script>

<button
  type="button"
  onclick={(e) => {
    context.nextMonth();
    onclick?.(e);
  }}
  {...props}
>
  {@render children?.()}
</button>
