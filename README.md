## Svelte Simple Calendar

Calendar component for svelte 5

## Installation

```bash
npm install svelte-simple-calendar
```

## Usage

**Calendar**

```svelte
<script>
  let value = $state(new Date());
</script>

<div>
  <Calendar.Root bind:value>
    <div>
      <Calendar.PreviousMonthTrigger>
        <ChevronLeftIcon />
      </Calendar.PreviousMonthTrigger>
      <Calendar.Month />
      <Calendar.Year />
      <Calendar.NextMonthTrigger>
        <ChevronRightIcon />
      </Calendar.NextMonthTrigger>
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
  </Calendar.Root>
</div>
```

**RangeCalendar**

```svelte
<script>
  let value = $state({
    start: new Date(),
    end: new Date(),
  });
</script>

<div>
  <RangeCalendar.Root
    bind:value
    onChange={function (value, valueAsArray) {
      console.log(value);
      console.log(valueAsArray);
    }}
  >
    <div>
      <div>
        <RangeCalendar.PreviousMonthTrigger>
          <ChevronLeftIcon />
        </RangeCalendar.PreviousMonthTrigger>
        <RangeCalendar.Month />
        <RangeCalendar.Year />
        <RangeCalendar.NextMonthTrigger>
          <ChevronRightIcon />
        </RangeCalendar.NextMonthTrigger>
      </div>

      <table>
        <thead>
          <tr>
            <RangeCalendar.Weekdays>
              {#snippet children(weekday)}
                <th>
                  <RangeCalendar.Weekday data={weekday} />
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
                      <RangeCalendar.Date data={date} />
                    </td>
                  {/snippet}
                </RangeCalendar.Week>
              </tr>
            {/snippet}
          </RangeCalendar.Weeks>
        </tbody>
      </table>
    </div>
  </RangeCalendar.Root>
</div>
```
