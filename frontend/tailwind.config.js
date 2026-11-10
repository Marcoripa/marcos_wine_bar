/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#0b0b0b',
          900: '#121212',
          850: '#161616',
          800: '#1c1c1c',
          700: '#282828',
          600: '#3a3a3a',
        },
        gold: {
          50: '#FAF6ED',
          100: '#F4ECD8',
          200: '#E8D7B0',
          300: '#DCC388',
          400: '#D0AF61',
          500: '#C5A059', // Primary gold accent
          600: '#B08B42',
          700: '#8E6F33',
          800: '#6C5426',
          900: '#4A3919',
        },
        copper: {
          400: '#DE8C68',
          500: '#C67550',
          600: '#A45B3A',
        },
        cream: {
          50: '#FCFCF9',
          100: '#F5F5F0', // Primary warm off-white body text
          200: '#E6E6DE',
          300: '#D1D1C5',
          400: '#A8A89A',
          500: '#808072',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backgroundImage: {
        'radial-vignette': 'radial-gradient(circle at 50% 30%, rgba(197, 160, 89, 0.08) 0%, rgba(18, 18, 18, 0.95) 70%, #121212 100%)',
        'gold-gradient': 'linear-gradient(135deg, #E8D7B0 0%, #C5A059 50%, #8E6F33 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(197, 160, 89, 0.25)',
        'gold-glow-lg': '0 0 50px -10px rgba(197, 160, 89, 0.35)',
      },
    },
  },
  plugins: [],
};
