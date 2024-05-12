<script lang="ts">
  import { getCalendarContext } from './context.svelte.js';

  let context = getCalendarContext();
</script>

{context.calendar.year}
