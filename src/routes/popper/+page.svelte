<script lang="ts">
  import Portal from '$lib/components/portal/portal.svelte';
  import {createPopper} from '$lib/utils/create-popper/index.js';
  import {cn} from '../cn.js';

  let popper = createPopper();
</script>

<button use:popper.reference type="button" class="h-12 w-40 border border-gray-300 px-3">
  Click me
</button>

<Portal>
  {#if popper.open}
    <div use:popper.floating class="z-tooltip">
      <div
        use:popper.arrow
        class={cn('size-2 bg-gray-900', '[clip-path:polygon(50%_50%,_0%_100%,_100%_100%)]')}
      ></div>

      <div class="rounded-lg bg-gray-900 px-3 py-2 text-white">I'm a tooltip!</div>
    </div>
  {/if}
</Portal>
