/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#941c3d',
        'primary-dark': '#6e152b',
        secondary: '#b5354d',
        cta: '#0369A1',
        background: '#FFF8F8',
        'text-main': '#5a0f23',
        'text-muted': '#6b2c3e',
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['Josefin Sans', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
