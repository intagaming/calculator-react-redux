module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'cal-gray': {
          light: '#a5a5a4',
          DEFAULT: '#323233',
        },
      }
    },
  },
  variants: {
    extend: {
      brightness: ['active'],
    },
  },
  plugins: [],
}
