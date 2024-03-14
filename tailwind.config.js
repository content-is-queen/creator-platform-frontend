/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        dots: "url('/images/CiQ_Pattern_02.svg')",
      },
      colors: {
        "queen-blue": "#3667ED",
        "queen-yellow": "#E5FC52",
        "queen-black": "#362921",
        "queen-gray": "#D7CDFB",
        "queen-white": "#F7F7F7",
        "queen-orange": "#FF7300",
      },
      fontFamily: {
        heading: ["Anton", "sans-serif"],
        sans: ["var(--font-forma-deck)"],
        subheading: ["var(--font-forma-banner)"],
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("flowbite/plugin")],
};
