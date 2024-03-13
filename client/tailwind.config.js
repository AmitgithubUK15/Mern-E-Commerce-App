/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '557px': '557px',
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
      's':"350px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}