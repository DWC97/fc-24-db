/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-maroon':'#950206',
        'custom-grey':'#2C2E2D',
        'custom-black':'#1C1E1D',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
