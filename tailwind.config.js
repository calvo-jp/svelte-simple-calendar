import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", ...defaultTheme.fontFamily.sans],
        mono: ["'Fira Code'", ...defaultTheme.fontFamily.mono],
      },
      data: {
        today: 'today',
        selected: 'selected',
        disabled: 'disabled',
        placeholder: 'placeholder',
      },
    },
  },
  plugins: [],
};
