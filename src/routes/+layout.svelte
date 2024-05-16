<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<main class="min-h-dvh p-5 lg:p-16 flex items-center justify-center">
  {@render children()}
</main>
