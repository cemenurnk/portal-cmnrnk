/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cemenurnk-primary': '#478EC2',
        'cemenurnk-secondary': '#F3912C'
      }
    },
  },
  plugins: [],
}

