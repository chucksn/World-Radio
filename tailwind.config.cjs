/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        itim: ["Itim", "cursive"],
        prosto: ["'Prosto One'", "cursive"],
        roboto: ["Roboto", "sans-serif"],
        robotoMono: ["'Roboto Mono'", "monospace"],
        ubuntu: ["Ubuntu", "sans-serif"],
        unbounded: ["Unbounded", "cursive"],
      },

      animation: {
        "spin-slow": "spin 2s linear infinite",
      },

      minHeight: (theme) => ({
        ...theme("spacing"),
      }),

      maxWidth: (theme) => ({
        ...theme("spacing"),
      }),

      boxShadow: {
        "c-1": "0 0 6px rgb(1, 202, 202)", //blue shadow round
        "c-2": "0 0 6px 2px rgb(30, 41, 59)",
        "c-3": "0 0 8px 3px rgb(173, 255, 47)",
        "c-4": "0 0 4px rgb(200, 200, 200)", //white shadow round
        "c-5": "0 0 8px 3px rgb(220, 38, 38)",
        "c-6": "0 0 5px 1px rgb(220, 38, 38) inset",
        "c-1-top": "0 -6px 6px -6px rgb(1, 202, 202)",
      },
      screens: {
        "xs-c": "630px",
      },
    },
  },
  plugins: [],
};
