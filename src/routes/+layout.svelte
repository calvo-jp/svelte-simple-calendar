<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<main class="flex min-h-dvh items-center justify-center p-5 lg:p-16">
  {@render children()}
</main>
