/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wine': {
          50: '#f8f3f5',
          100: '#f2e6ec',
          200: '#e5cdd9',
          300: '#d8b5c5',
          400: '#cb9cb2',
          500: '#b88499',
          600: '#a26c80',
          700: '#8c5467',
          800: '#7A1E2D',
          900: '#5a0c18',
        },
        'gold': '#C9A227',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
