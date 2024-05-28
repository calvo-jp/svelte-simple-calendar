<script lang="ts">
  import {DatePicker} from '$lib/index.js';
  import {cn} from '../cn.js';
</script>

<svelte:head>
  <title>DatePicker | Svelte Simple DatePicker</title>
</svelte:head>

<DatePicker.Root>
  <DatePicker.Control>
    <div>
      <DatePicker.Trigger />
      <DatePicker.ClearTrigger />
    </div>
  </DatePicker.Control>

  <DatePicker.Portal>
    <DatePicker.Content>
      <div class="w-fit border border-gray-200">
        <DatePicker.Calendar>
          <div class="flex gap-2 border-b border-gray-200 px-3 py-4">
            <DatePicker.PreviousMonthTrigger>
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
            </DatePicker.PreviousMonthTrigger>
            <div class="flex grow items-center justify-center">
              <DatePicker.Month />
              <DatePicker.Year />
            </div>
            <DatePicker.NextMonthTrigger>
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
            </DatePicker.NextMonthTrigger>
          </div>

          <div class="p-3">
            <table class="border-collapse text-sm">
              <thead>
                <tr>
                  <DatePicker.Weekdays>
                    {#snippet children(weekday)}
                      <th>
                        <div class="flex size-10 items-center justify-center font-semibold">
                          <DatePicker.Weekday data={weekday} />
                        </div>
                      </th>
                    {/snippet}
                  </DatePicker.Weekdays>
                </tr>
              </thead>

              <tbody>
                <DatePicker.Weeks>
                  {#snippet children(week)}
                    <tr>
                      <DatePicker.Week data={week}>
                        {#snippet children(date)}
                          <td>
                            <DatePicker.Date
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
                      </DatePicker.Week>
                    </tr>
                  {/snippet}
                </DatePicker.Weeks>
              </tbody>
            </table>
          </div>
        </DatePicker.Calendar>
      </div>
    </DatePicker.Content>
  </DatePicker.Portal>
</DatePicker.Root>
