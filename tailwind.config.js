/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edfff7',
          100: '#d5ffed',
          200: '#aeffe0',
          300: '#73ffcd',
          400: '#33f5b2',
          500: '#56e39f', // Main brand color from logo
          600: '#00c87b',
          700: '#009d64',
          800: '#067a52',
          900: '#076445',
        },
        dark: {
          50: '#f7f7f8',
          100: '#eeeef0',
          200: '#d9d9dc',
          300: '#b6b7bc',
          400: '#8e8f97',
          500: '#6f707a',
          600: '#5a5b64',
          700: '#3f3f45',
          800: '#313131', // Updated to specified color
          900: '#1a1a1a',
        }
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};