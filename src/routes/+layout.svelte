<script lang="ts">
  import '../app.css';

  import { page } from '$app/stores';
  import { cn } from './cn.js';

  let { children } = $props();

  const links = [
    {
      path: '/',
      label: 'Calendar',
    },
    {
      path: '/range-calendar',
      label: 'RangeCalendar',
    },
  ];

  $inspect($page.url.pathname);
</script>

<div class="flex min-h-dvh">
  <header class="p-16">
    <nav>
      <ul class="space-y-2">
        {#each links as link}
          <li>
            <a
              href={link.path}
              class={cn(
                'font-mono transition-colors duration-200',
                $page.url.pathname === link.path ? 'text-blue-700' : 'text-gray-700',
              )}
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </header>
  <main class="p-16">
    {@render children()}
  </main>
</div>
