/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Cormorant Garamond', 'serif'],
      },
      colors: {
        amber: {
          800: '#92400e',
          900: '#78350f',
        },
        orange: {
          50: '#fffaf0',
          100: '#fef3c7',
          200: '#fde68a',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
