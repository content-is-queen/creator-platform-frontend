/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        dots: "url('/images/CiQ_Pattern_02.svg')",
        "lilac-dots": "url('/images/CiQ_Pattern 4 lilac.svg')",
        "blue-dots": "url('/images/CiQ_Pattern 4 blue.svg')",
        "orange-dots-circle": "url('/images/orange-dots-circle.svg')",
        "lilac-dots-circle": "url('/images/lilac-dots-circle.svg')",
      },
      colors: {
        "queen-blue": {
          DEFAULT: "#3667ED",
          dark: "#315dd5",
          darker: "#2b52be",
          light: "#5e85f1",
        },
        "queen-yellow": {
          DEFAULT: "#E5FC52",
          dark: "#cee34a",
          light: "#e8fc63",
          lighter: "#eafd75",
        },
        "queen-black": {
          DEFAULT: "#362921",
          dark: "#1b1511",
          light: "#4a3e37",
        },
        "queen-white": { DEFAULT: "#F7F7F7", dark: "#dedede" },
        "queen-orange": {
          DEFAULT: "#FF7300",
          dark: "#e66800",
          light: "#ff811a",
        },
        "queen-lilac": {
          DEFAULT: "#D7CDFB",
          dark: "#aca4c9",
          light: "#e7e1fd",
        },
      },
      fontFamily: {
        heading: ["var(--font-anton)"],
        sans: ["var(--font-forma-deck)"],
        subheading: ["var(--font-forma-banner)"],
        decorative: ["var(--font-swear-display)"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
