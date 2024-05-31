<script lang="ts">
  import '../app.css';

  import {page} from '$app/stores';
  import {cn} from './cn.js';

  let {children} = $props();

  const links = [
    {
      path: '/',
      label: 'Calendar',
    },
    {
      path: '/range-calendar',
      label: 'RangeCalendar',
    },
    {
      path: '/date-picker',
      label: 'DatePicker',
    },
    {
      path: '/range-date-picker',
      label: 'RangeDatePicker',
    },
  ];
</script>

<div class="flex min-h-dvh">
  <header class="shrink-0 p-16">
    <nav>
      <ul class="space-y-2">
        {#each links as link}
          {@const active = $page.url.pathname === link.path}

          <li>
            <a
              href={link.path}
              class={cn(
                'flex',
                'items-center',
                'justify-between',
                'gap-8',
                'font-mono',
                'transition-colors',
                'duration-200',
                active && 'text-blue-700',
                !active && 'text-gray-700',
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
