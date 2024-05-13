<script lang="ts">
  import { Calendar } from '$lib/index.js';
</script>

<div class="border border-gray-200 w-fit">
  <Calendar.Root>
    <div class="flex border-b border-gray-200 gap-2 px-3 py-4">
      <Calendar.PreviousButton>
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
      </Calendar.PreviousButton>
      <div class="grow flex items-center justify-center">
        <Calendar.Month />
        <Calendar.Year />
      </div>
      <Calendar.NextButton>
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
      </Calendar.NextButton>
    </div>

    <div class="p-3">
      <table class="border-collapse">
        <thead>
          <tr>
            <Calendar.Weekdays>
              {#snippet children(weekday)}
                <th>
                  <div class="size-10 flex items-center justify-center font-semibold">
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
                        class="size-10 flex items-center justify-center data-today:bg-gray-100 data-selected:bg-blue-500 data-selected:text-white rounded-full data-placeholder:text-gray-400"
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
