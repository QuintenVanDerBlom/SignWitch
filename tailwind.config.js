/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-nav-bar': '#D3104C',
        'button-bg-hover': '#BB0D43',
        'button-bg': '#BB0D43',
        'inline-link': '#C77DFF',
        'clicked-link': '#7B2CBF',
        'progress-ND': '#D2D2D2',
        'progress-Done': '#003340',
        'button-login': '#003340',
        'button-login-hover': '#003340',
        'login-container': '#B51F4A',
        'lesson-container':'#B51F4A',
        'background-color': '#F7EFE3',

      },
      fontFamily: {
        k2d: ['K2D', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

