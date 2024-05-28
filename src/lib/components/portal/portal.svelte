<script lang="ts">
  import type {Snippet} from 'svelte';
  import {portal} from './portal.js';

  interface Props {
    children?: Snippet;
  }

  let {children}: Props = $props();
</script>

<div use:portal hidden>
  {@render children?.()}
</div>
