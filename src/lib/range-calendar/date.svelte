<script lang="ts">
  import { dataAttr } from '$lib/data-attr.js';
  import { isSameDay } from '$lib/is-same-day.js';
  import { isWithinInterval } from '$lib/is-within-interval.js';
  import type { CalendarDate } from '$lib/types.js';
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { getRangeCalendarContext } from './context.svelte.js';

  type ButtonProps = Omit<SvelteHTMLElements['button'], 'children'>;

  interface Props extends ButtonProps {
    data: CalendarDate;
    children?: Snippet<[context: CalendarDate & { isSelected: boolean }]>;
  }

  let { data, children, ...props }: Props = $props();
  let context = getRangeCalendarContext();

  let isStartDate = $derived(!!context.value && isSameDay(data.value, context.value.start));
  let isEndDate = $derived(!!context.value?.start && isSameDay(data.value, context.value.end));
  let isSelected = $derived.by(() => {
    if (isStartDate) return true;
    if (isEndDate) return true;
    if (!context.value) return false;
    if (isWithinInterval(data.value, context.value)) return true;
    return false;
  });

  let renderProps = $derived({
    ...data,
    isStartDate,
    isEndDate,
    isSelected,
  });
</script>

<button
  type="button"
  onclick={() => {}}
  disabled={data.isDisabled}
  data-disabled={dataAttr(data.isDisabled)}
  data-selected={dataAttr(isSelected)}
  data-today={dataAttr(data.isToday)}
  data-placeholder={dataAttr(data.isPlaceholder)}
  data-next-month-date={dataAttr(data.isNextMonthDate)}
  data-previous-month-date={dataAttr(data.isPreviousMonthDate)}
  data-start-date={dataAttr(isStartDate)}
  data-end-date={dataAttr(isEndDate)}
  data-value={data.value.toISOString()}
  {...props}
>
  {#if children}
    {@render children(renderProps)}
  {:else}
    {data.value.getDate()}
  {/if}
</button>
