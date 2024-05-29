<script lang="ts">
  import type {SvelteHTMLElements} from 'svelte/elements';

  type Props = SvelteHTMLElements['div'];

  let {children, ...props}: Props = $props();
</script>

<div {...props}>
  {@render children?.()}
</div>
