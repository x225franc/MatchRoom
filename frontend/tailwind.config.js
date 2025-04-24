/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#BAA089",
        secondary: "#E8CEB7",
        tertiary: "#0F0F0F",
        "tertiary-2": "#F8F8F8",
      },
    },
  },
  plugins: [],
};
