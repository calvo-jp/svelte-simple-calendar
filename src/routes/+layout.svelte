<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<main class="p-5 lg:p-16">
  {@render children()}
</main>
