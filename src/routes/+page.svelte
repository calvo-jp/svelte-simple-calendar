<script lang="ts">
  import { Calendar } from '$lib/index.js';
</script>

<div>
  <Calendar.Root>
    <div>
      <Calendar.PreviousButton>Prev</Calendar.PreviousButton>
      <div>
        <Calendar.Month />
        <Calendar.Year />
      </div>
      <Calendar.NextButton>Next</Calendar.NextButton>
    </div>

    <table>
      <thead>
        <tr>
          <Calendar.Weekdays>
            {#snippet children(weekday)}
              <th>
                <Calendar.Weekday data={weekday} />
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
                    <Calendar.Date data={date} />
                  </td>
                {/snippet}
              </Calendar.Week>
            </tr>
          {/snippet}
        </Calendar.Weeks>
      </tbody>
    </table>

    <div>
      <Calendar.Value />
    </div>
  </Calendar.Root>
</div>
