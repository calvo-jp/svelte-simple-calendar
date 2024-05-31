<script lang="ts">
  import type {Snippet} from 'svelte';
  import {default as Calendar} from '../calendar/root.svelte';
  import {getDatePickerContext} from './context.svelte.js';

  interface Props {
    children: Snippet;
  }

  let {children}: Props = $props();
  let context = getDatePickerContext();
</script>

<Calendar
  value={context.value}
  onValueChange={(newValue) => {
    context.onValueChange(newValue);
    context.close();
  }}
>
  {@render children()}
</Calendar>
