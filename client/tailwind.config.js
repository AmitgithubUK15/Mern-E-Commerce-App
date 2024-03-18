/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '450px':'450px',
        '557px': '557px',
        '600px':'600px'
      },
      width:{
        '1300px':'1300px',
        '411px':'411px'
      }
    },
    screens: {
      
      'xl': '1280px',
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'md':'768px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'm':'500px',
      's':"300px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}