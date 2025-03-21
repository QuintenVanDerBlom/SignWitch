/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-nav-bar':{
          DEFAULT: '#D3104C',
          dark: '#65102A'
        },
        'button-bg-hover': {
          DEFAULT: '#BB0D43',
          dark: '#65102A',
        },
        'button-bg': {
          DEFAULT: '#BB0D43',
          dark: '#65102A',
        },
        'inline-link': {
          DEFAULT:'#FF2448',
          dark: '#4DB3CD',
        },
        'clicked-link': {
          DEFAULT: '#A80255',
          dark: '#006AAB',
        },
        'progress-ND': {
          DEFAULT: '#D2D2D2',
          dark: '#65102A',
        },
        'progress-Done': {
          DEFAULT: '#257017',
          dark: '#34792A',
        },
        'button-login': {
          DEFAULT: '#003340',
          dark: '#091A32',
        },
        'button-login-hover': {
          DEFAULT: '#003340',
          dark: '#091A32',
        },
        'login-container': {
          DEFAULT: '#B51F4A',
          dark: '#65102A',
        },
        'lesson-container': {
          DEFAULT: '#B51F4A',
          dark: '#65102A',
        },
        'background-color': {
          DEFAULT: '#F7EFE3',
          dark: '#525252',
        },
        'title-color': {
          DEFAULT: '#003340',
          dark: '#026F8B',
        },
      },
      fontFamily: {
        k2d: ['K2D', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

