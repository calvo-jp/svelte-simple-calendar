<script lang="ts">
  import { dataAttr } from '$lib/data-attr.js';
  import { isSameDay } from '$lib/is-same-day.js';
  import type { CalendarDate } from '$lib/types.js';
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { getCalendarContext } from './context.svelte.js';

  type ButtonProps = Omit<SvelteHTMLElements['button'], 'children'>;

  interface Props extends ButtonProps {
    data: CalendarDate;
    children?: Snippet<[context: CalendarDate & { isSelected: boolean }]>;
  }

  let { data, children, ...props }: Props = $props();
  let context = getCalendarContext();
  let isSelected = $derived(!context.value ? false : isSameDay(context.value, data.value));
  let renderProps = $derived({ ...data, isSelected });
</script>

<button
  type="button"
  onclick={() => {
    context.onChange(data.value);
  }}
  disabled={data.isDisabled}
  data-disabled={dataAttr(data.isDisabled)}
  data-selected={dataAttr(isSelected)}
  data-today={dataAttr(data.isToday)}
  data-placeholder={dataAttr(data.isPlaceholder)}
  data-next-month-date={dataAttr(data.isNextMonthDate)}
  data-previous-month-date={dataAttr(data.isPreviousMonthDate)}
  data-value={data.value.toISOString()}
  {...props}
>
  {#if children}
    {@render children(renderProps)}
  {:else}
    {data.value.getDate()}
  {/if}
</button>
