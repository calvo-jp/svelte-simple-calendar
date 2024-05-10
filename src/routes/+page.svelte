<script lang="ts">
  import { Calendar } from '$lib/index.js';
</script>

<div>
  <Calendar.Root>
    <div>
      <Calendar.Year />
      <Calendar.Month />
    </div>

    <table>
      <thead>
        <tr>
          <Calendar.Weekdays>
            {#snippet children(o)}
              <th>
                <Calendar.Weekday {...o} />
              </th>
            {/snippet}
          </Calendar.Weekdays>
        </tr>
      </thead>

      <tbody>
        <Calendar.Weeks>
          {#snippet children(i)}
            <tr>
              <Calendar.Week {...i}>
                {#snippet children(j)}
                  <td>
                    <Calendar.Date {...j} />
                  </td>
                {/snippet}
              </Calendar.Week>
            </tr>
          {/snippet}
        </Calendar.Weeks>
      </tbody>
    </table>
  </Calendar.Root>
</div>
```
