/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '768px',
      md: '1024px',
      lg: '1280px',
      xl: '1650px'
    },
    extend: {
      fontFamily: {
        rubik: ['rubik', 'sans-serif'],
        publish: ['Public Sans', 'sans-serif']
      }
    }
  },
  plugins: []
}
