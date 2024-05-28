<script lang="ts">
  import {DatePicker} from '$lib/index.js';
</script>

<svelte:head>
  <title>DatePicker | Svelte Simple Calendar</title>
</svelte:head>

<DatePicker.Root>
  <DatePicker.Control>
    <div>
      <DatePicker.Trigger />
      <DatePicker.ClearTrigger />
    </div>
  </DatePicker.Control>

  <DatePicker.Content>
    <DatePicker.Calendar>
      <div>
        <div>
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
          <DatePicker.Month />
          <DatePicker.Year />
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

        <table>
          <thead>
            <tr>
              <DatePicker.Weekdays>
                {#snippet children(weekday)}
                  <th>
                    <DatePicker.Weekday data={weekday} />
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
                        <DatePicker.Date data={date} />
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
  </DatePicker.Content>
</DatePicker.Root>
