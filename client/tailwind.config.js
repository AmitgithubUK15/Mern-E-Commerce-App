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
        '1536px':'1536px',
        '411px':'411px'
      }
    },
    screens: {
     
      'xl': '1260px',
       'l':'1220px',
       'll':'1160px',
       'lll':'1120px',
       'lx':'1060px',
      'lg': '1024px', 
      "lg1":"964px",
      "lg2":"904px",
      "lg3":"844px",
      "lg4":'816px',
      // => @media (min-width: 1024px) { ... }
      'md':'768px',
      'sm1':"706px",
      'sm2':'694px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'm':'500px',
      's':"300px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}