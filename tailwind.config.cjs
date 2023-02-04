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
        "c-1": "0 0 6px rgb(1, 202, 202)",
        "c-2": "0 0 6px 2px rgb(30, 41, 59)",
        "c-3": "0 0 8px 3px rgb(173, 255, 47)",
        "c-4": "0 0 6px rgb(200, 200, 200)",
        "c-5": "0 0 8px 3px rgb(220, 38, 38)",
        "c-1-top": "0 -6px 6px -6px rgb(1, 202, 202)",
      },
      screens: {
        "xs-c": "560px",
      },
    },
  },
  plugins: [],
};
