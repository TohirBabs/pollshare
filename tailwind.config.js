/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["bg-red-400", "bg-green-400", "bg-blue-400"],
  theme: {
    extend: {},
  },
  plugins: [],
};
