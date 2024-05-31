<script lang="ts">
  import {getDatePickerContext} from './context.svelte.js';

  interface Props {
    placeholder: string;
  }

  let {placeholder}: Props = $props();
  let context = getDatePickerContext();
</script>

{#if context.value}
  {context.value.toLocaleDateString()}
{:else}
  {placeholder}
{/if}
