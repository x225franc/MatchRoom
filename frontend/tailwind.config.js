/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#BAA089",
          light: "#C6B099",
          dark: "#A08976",
        },
        secondary: {
          DEFAULT: "#E8CEB7",
          light: "#F3DCC9",
          dark: "#D3B9A2",
        },
        tertiary: {
          DEFAULT: "#0F0F0F",
          light: "#3A3A3A",
          dark: "#000000",
        },
        "tertiary-2": {
          DEFAULT: "#F8F8F8",
          light: "#FFFFFF",
          dark: "#E5E5E5",
        },
      },
    },
  },
  plugins: [],
};
