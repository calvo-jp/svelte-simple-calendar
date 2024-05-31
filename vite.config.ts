import {enhancedImages} from '@sveltejs/enhanced-img';
import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit(), enhancedImages()],
  server: {
    port: 3000,
  },
  test: {
    watch: false,
    globals: true,
    include: ['src/**/*.{test,spec}.{js,ts}'],
    passWithNoTests: true,
  },
});
