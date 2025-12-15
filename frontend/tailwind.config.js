/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'azul-fondo': '#555B6E',
        'verde-grisaseo': '#89B0AE',
        'verde-menta': '#BEE3DB',
        'durazno': '#FFD6BA',
        'blanco' : '#FAF9F9'
      },
    },
  },
  plugins: [],
}

