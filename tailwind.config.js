/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#08B9AF',
        secondaryGreen: '#C7E0DB',
        secondary: '#1A1C1B',
        background: '#F4F4F4',
        grayText: '#9E9E9E',
        tintGreen: '#018673',
      }
    },
  },
  plugins: [],
}
