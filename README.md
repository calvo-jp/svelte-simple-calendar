## Svelte Simple Calendar

```svelte
<script lang="ts">
  import { Date } from 'svelte/reactivity';

  let value = new Date();
</script>

<div>
  <Calendar.Root bind:value>
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
