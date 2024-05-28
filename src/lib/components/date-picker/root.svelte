<script lang="ts">
  import type {Snippet} from 'svelte';
  import {
    createDatePickerContext,
    type CreateDatePickerContextProps,
    type CreateDatePickerContextReturn,
  } from './context.svelte.js';

  interface Props extends CreateDatePickerContextProps {
    children: Snippet<[context: CreateDatePickerContextReturn]>;
  }

  let {children, ...props}: Props = $props();
  let context = createDatePickerContext(props);
</script>

{@render children(context)}
