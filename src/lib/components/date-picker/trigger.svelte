<script lang="ts">
  import type {SvelteHTMLElements} from 'svelte/elements';
  import {getDatePickerContext} from './context.svelte.js';

  type Props = SvelteHTMLElements['button'];

  let {children, ...props}: Props = $props();
  let context = getDatePickerContext();
</script>

<button use:context.reference type="button" {...props}>
  {@render children?.()}
</button>
