<script lang="ts">
  import {createPopper} from '$lib/utils/create-popper/index.js';
  import {cn} from '../cn.js';

  let popper = createPopper();
</script>

<button use:popper.reference>Reference</button>

{#if popper.open}
  <div use:popper.floating>
    <div
      use:popper.arrow
      class={cn(
        'size-2 bg-gray-900',
        '[clip-path:polygon(50%_50%,_0%_100%,_100%_100%)]',
      )}
    ></div>

    <div class="rounded-lg bg-gray-900 px-3 py-2 text-white">Floating</div>
  </div>
{/if}
