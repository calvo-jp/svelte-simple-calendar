<script lang="ts">
  import type {Snippet} from 'svelte';
  import {default as Calendar} from '../calendar/root.svelte';

  interface Props {
    children: Snippet;
  }

  let {children}: Props = $props();
</script>

<Calendar>
  {@render children()}
</Calendar>
