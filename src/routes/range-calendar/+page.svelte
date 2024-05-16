<script lang="ts">
  import { cn } from '$lib/cn.js';
  import { RangeCalendar } from '$lib/index.js';
</script>

<div class="flex border border-gray-200 w-fit">
  <RangeCalendar.Root>
    <div class="first:border-r border-gray-200">
      <div class="flex border-b border-gray-200 gap-2 px-3 py-4">
        <RangeCalendar.PreviousMonthButton>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 18L9 12L15 6"></path>
          </svg>
        </RangeCalendar.PreviousMonthButton>
        <div class="grow flex items-center justify-center">
          <RangeCalendar.Month />
          <RangeCalendar.Year />
        </div>
        <RangeCalendar.NextMonthButton>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18L15 12L9 6"></path>
          </svg>
        </RangeCalendar.NextMonthButton>
      </div>

      <div class="p-3">
        <table class="border-collapse text-sm">
          <thead>
            <tr>
              <RangeCalendar.Weekdays>
                {#snippet children(weekday)}
                  <th>
                    <div class="size-10 flex items-center justify-center font-semibold">
                      <RangeCalendar.Weekday data={weekday} />
                    </div>
                  </th>
                {/snippet}
              </RangeCalendar.Weekdays>
            </tr>
          </thead>

          <tbody>
            <RangeCalendar.Weeks>
              {#snippet children(week)}
                <tr>
                  <RangeCalendar.Week data={week}>
                    {#snippet children(date)}
                      <td>
                        <RangeCalendar.Date
                          data={date}
                          class={cn(
                            'size-10',
                            'flex',
                            'items-center',
                            'justify-center',
                            'rounded-full',
                            'data-today:bg-gray-100',
                            'data-selected:bg-blue-500',
                            'data-selected:text-white',
                            'data-selected:font-semibold',
                            'data-placeholder:text-gray-400',
                            'data-placeholder:bg-white',
                            'data-placeholder:font-normal',
                          )}
                        />
                      </td>
                    {/snippet}
                  </RangeCalendar.Week>
                </tr>
              {/snippet}
            </RangeCalendar.Weeks>
          </tbody>
        </table>
      </div>
    </div>
  </RangeCalendar.Root>
</div>
