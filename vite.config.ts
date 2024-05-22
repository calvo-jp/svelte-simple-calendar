import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import packageJson from './package.json';

export default defineConfig({
  plugins: [sveltekit(), enhancedImages()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      external: Object.keys(packageJson.dependencies),
    },
  },
  test: {
    watch: false,
    globals: true,
    include: ['src/**/*.{test,spec}.{js,ts}'],
    passWithNoTests: true,
  },
});
