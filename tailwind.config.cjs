/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      gridTemplateColumns: {
        ['min-max']: 'repeat(auto-fill, minmax(12rem, 1fr))'
      },
      fontFamily: {
        primary: ['Karla', 'sans-serif']
      },
      screens: {
        'xs': '420px',
        'xxs': '360px'
      },
    }
  },
  plugins: []
}
