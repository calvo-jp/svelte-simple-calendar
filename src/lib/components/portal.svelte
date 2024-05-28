<script lang="ts" context="module">
  function portal(node: HTMLElement) {
    function update() {
      document.body.appendChild(node);
      node.hidden = false;
    }

    function destroy() {
      document.body.removeChild(node);
    }

    update();

    return {
      update,
      destroy,
    };
  }
</script>

<script lang="ts">
  import type {Snippet} from 'svelte';

  interface Props {
    children?: Snippet;
  }

  let {children}: Props = $props();
</script>

<div use:portal hidden>
  {@render children?.()}
</div>
