/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3251D0", // Ensure this matches your desired primary color
        light: {
          bg: "#FFFFFF", // Light mode background
          text: "#000000", // Light mode text
        },
        dark: {
          bg: "#1F2937", // Dark mode background (Tailwind's gray-800)
          text: "#FFFFFF", // Dark mode text
        },
      },
    },
  },
  plugins: [],
};