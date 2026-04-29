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
          50:  '#f0ffe6',
          100: '#e0ffcc',
          200: '#c1ff99',
          300: '#a1ff66',
          400: '#82ff33',
          500: '#76EE00',
          600: '#5ec200',
          700: '#469600',
          800: '#2e6a00',
          900: '#163e00',
          950: '#0a1f00',
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
      backdropBlur: {
        xs: '2px',
        sm: '4px',
      },
    },
  },
  plugins: [],
}
