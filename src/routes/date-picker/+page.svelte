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
            <ChevronLeftIcon />
          </DatePicker.PreviousMonthTrigger>
          <DatePicker.Month />
          <DatePicker.Year />
          <DatePicker.NextMonthTrigger>
            <ChevronRightIcon />
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
