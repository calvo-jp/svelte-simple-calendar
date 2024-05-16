<script lang="ts">
  import { type Snippet } from 'svelte';
  import {
    createCalendarContext,
    setCalendarContext,
    type CreateCalendarContextProps,
    type CreateCalendarContextReturn,
  } from './context.svelte.js';

  interface Props extends CreateCalendarContextProps {
    children: Snippet<[context: CreateCalendarContextReturn]>;
  }

  let { value = $bindable(null), children, ...props }: Props = $props();
  let context = createCalendarContext({ value, ...props });

  setCalendarContext(context);
</script>

{@render children(context)}
