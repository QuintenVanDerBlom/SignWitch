/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-nav-bar': '#10002B',
        'button-bg-hover': '#471E68',
        'button-bg': '#5E4DCB',
        'inline-link': '#C77DFF',
        'clicked-link': '#7B2CBF',
        'progress-ND': '#D2D2D2',
        'progress-Done': '#240046',
        'button-login': '#CCA7E9',
        'button-login-hover': '#87669F',
        'login-container': '#6653A3',
      },
      fontFamily: {
        k2d: ['K2D', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

