/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D000FF",
        secondary: "rgb(15, 20, 25)",
        tertiary: "#EFF3F4",
        label: "#536471",
        danger: "#FF6767",
        success: "#00D366",
      },
    },
  },
  plugins: [],
};
