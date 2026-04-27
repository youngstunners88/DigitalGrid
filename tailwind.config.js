/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#010804',
          900: '#030f0a',
          800: '#051a0f',
          700: '#082b18',
          600: '#0c3d22',
          500: '#00d68f',
          400: '#00ff9d',
          300: '#5affbf',
          200: '#9affda',
          100: '#ccfff0',
          50:  '#f0fff8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['"Space Grotesk"', 'ui-sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      screens: {
        xs: '375px',
        sm: '768px',
        md: '1024px',
        lg: '1440px',
      },
    },
  },
  plugins: [],
}
