/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      itim: ["Itim", "cursive"],
      prosto: ["'Prosto One'", "cursive"],
      roboto: ["Roboto", "sans-serif"],
      robotoMono: ["'Roboto Mono'", "monospace"],
      ubuntu: ["Ubuntu", "sans-serif"],
      unbounded: ["Unbounded", "cursive"],
    },
    extend: {
      boxShadow: {
        c_1: "0 0 6px rgb(1, 202, 202)",
      },
    },
  },
  plugins: [],
};
