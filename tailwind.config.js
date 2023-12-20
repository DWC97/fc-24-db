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
        'custom-dark-green':'#44924a',
        'custom-light-green':'#78ca68',
        'custom-yellow':'#f3cc57',
        'custom-orange':'#f8aa3d',
        'custom-red':'#fa5d54',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
