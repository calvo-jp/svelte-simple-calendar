## Svelte Simple Calendar

Calendar component for svelte 5

## Installation

```bash
npm install svelte-simple-calendar
```

## Usage

**Calendar**

```svelte
<script lang="ts">
  import { Date } from 'svelte/reactivity';

  let value = new Date();
</script>

<div>
  <Calendar.Root bind:value>
    <div>
      <Calendar.Previous />
      <Calendar.Month />
      <Calendar.Year />
      <Calendar.Next />
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
```

**RangeCalendar**

```svelte
<script lang="ts">
  import { Date } from 'svelte/reactivity';

  let value = $state({
    from: subDays(7),
    to: new Date(), 7,
  });
</script>

<div>
  <RangeCalendar.Root bind:value>
    {#snippet children(calendar)}
      <div>
        <Calendar.Root {...calendar}>
          <div>
            <Calendar.Previous />
            <Calendar.Month />
            <Calendar.Year />
            <Calendar.Next />
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
    {/snippet}
  </RangeCalendar.Root>
</div>
```
