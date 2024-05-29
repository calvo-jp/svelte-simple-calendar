<script lang="ts">
  import type {Snippet} from 'svelte';
  import {
    createDatePickerContext,
    setDatePickerContext,
    type CreateDatePickerContextProps,
    type CreateDatePickerContextReturn,
  } from './context.svelte.js';

  interface Props extends CreateDatePickerContextProps {
    children: Snippet<[context: CreateDatePickerContextReturn]>;
  }

  let {children, ...props}: Props = $props();
  let context = createDatePickerContext(props);

  setDatePickerContext(context);
</script>

{@render children(context)}
