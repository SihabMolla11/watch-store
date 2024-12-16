/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#6576FF",
      "primary-hover": "#4f62f1",
      "primary-text": "#364A63",
      "secondary-text": "#8091A7",
      "border-lite": "#DBDFEA",
      "stir-color": "#FFD200",
    },
    fontFamily: {
      "primary-font": ["Roboto", "ui-sans-serif", "system-ui"], // Add Roboto font family
    },
  },
  plugins: [],
};
