/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 👈 enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3251D0",
      },
    },
  },
  plugins: [],

}
