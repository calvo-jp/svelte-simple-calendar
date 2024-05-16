<script lang="ts">
  import type { CalendarDate } from '$lib/types/index.js';
  import { dataAttr } from '$lib/utils/data-attr.js';
  import { isSameDay } from '$lib/utils/is-same-day.js';
  import { isWithinInterval } from '$lib/utils/is-within-interval.js';
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

  let isStartDate = $derived(!!context.value.start && isSameDay(data.value, context.value.start));
  let isEndDate = $derived(!!context.value.end && isSameDay(data.value, context.value.end));
  let isSelected = $derived.by(() => {
    if (isStartDate) return true;
    if (isEndDate) return true;

    const start = context.value?.start;
    const end = context.value?.end;

    if (!start) return false;
    if (!end) return false;

    return isWithinInterval(data.value, { start, end });
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
  onclick={() => {
    context.pick(data.value);
  }}
  disabled={data.isDisabled}
  aria-label={data.value.toDateString()}
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
