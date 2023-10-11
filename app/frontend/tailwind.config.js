/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

module.exports = {
  content: [
    './src/**/*.{tsx,jsx,html}',
  ],
  theme: {
    theme: {
      extend: {
          fontFamily: {
              sans: ['Figtree', ...defaultTheme.fontFamily.sans],
          },
      },
    },
    extend: {},
  },
  plugins: [
    forms
  ],
}
