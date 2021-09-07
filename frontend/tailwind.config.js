const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        faded: {
          DEFAULT: '#EFF0FA',
          '50': '#FFFFFF',
          '100': '#FFFFFF',
          '200': '#FFFFFF',
          '300': '#FFFFFF',
          '400': '#FFFFFF',
          '500': '#EFF0FA',
          '600': '#C8CCEE',
          '700': '#A1A7E2',
          '800': '#7A83D6',
          '900': '#545EC9'
        },
        primary: {
          DEFAULT: '#3942C1',
          '50': '#E7E9F8',
          '100': '#D4D6F2',
          '200': '#ACB0E7',
          '300': '#858BDB',
          '400': '#5E65CF',
          '500': '#3942C1',
          '600': '#2D359A',
          '700': '#222772',
          '800': '#161A4B',
          '900': '#0A0C24'
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
