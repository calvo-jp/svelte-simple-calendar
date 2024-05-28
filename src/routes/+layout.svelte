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
      future: true,
    },
    {
      path: '/range-date-picker',
      label: 'RangeDatePicker',
      future: true,
    },
  ];

  $inspect($page.url.pathname);
</script>

<div class="flex min-h-dvh">
  <header class="shrink-0 p-16">
    <nav>
      <ul class="space-y-2">
        {#each links as link}
          {@const active = !link.future && $page.url.pathname === link.path}

          <li>
            <a
              href={link.future ? null : link.path}
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
              <span class={cn(link.future && 'text-gray-400')}
                >{link.label}</span
              >

              {#if link.future}
                <span class="text-xs text-blue-500">Coming soon</span>
              {/if}
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
