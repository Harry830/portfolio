/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#f6f2ea',
          soft: '#efe8db',
          warm: '#ebe2d1',
        },
        paper: '#fbf8f1',
        ink: {
          DEFAULT: '#16161a',
          soft: '#2a2a30',
          muted: '#4a4a52',
          faint: '#6c6c75',
          ghost: '#a0a09a',
        },
        amber: {
          DEFAULT: '#c8843d',
          deep: '#a26425',
          soft: '#e7b27a',
        },
        charcoal: {
          DEFAULT: '#0e0e10',
          soft: '#1a1a1d',
        },
        chrome: {
          1: '#d8d8db',
          2: '#a4a6ac',
          3: '#6b6e75',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '4rem',
        },
      },
      screens: {
        '4k': '1980px',
      },
    },
  },
  plugins: [],
}
