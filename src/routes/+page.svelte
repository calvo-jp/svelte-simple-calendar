<script lang="ts">
  import { Calendar } from '$lib/index.js';
  import { cn } from './cn.js';
</script>

<div class="w-fit border border-gray-200">
  <Calendar.Root>
    <div class="flex gap-2 border-b border-gray-200 px-3 py-4">
      <Calendar.PreviousMonthButton>
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
      </Calendar.PreviousMonthButton>
      <div class="flex grow items-center justify-center">
        <Calendar.Month />
        <Calendar.Year />
      </div>
      <Calendar.NextMonthButton>
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
      </Calendar.NextMonthButton>
    </div>

    <div class="p-3">
      <table class="border-collapse text-sm">
        <thead>
          <tr>
            <Calendar.Weekdays>
              {#snippet children(weekday)}
                <th>
                  <div class="flex size-10 items-center justify-center font-semibold">
                    <Calendar.Weekday data={weekday} />
                  </div>
                </th>
              {/snippet}
            </Calendar.Weekdays>
          </tr>
        </thead>

        <tbody>
          <Calendar.Weeks>
            {#snippet children(week)}
              <tr>
                <Calendar.Week data={week}>
                  {#snippet children(date)}
                    <td>
                      <Calendar.Date
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
                </Calendar.Week>
              </tr>
            {/snippet}
          </Calendar.Weeks>
        </tbody>
      </table>
    </div>
  </Calendar.Root>
</div>
