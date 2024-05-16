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
        "orange-dots": "url('/images/CiQ_Pattern 4 orange.svg')",
        "blue-dots": "url('/images/CiQ_Pattern 4 blue.svg')",
        "orange-dots-circle": "url('/images/orange-dots-circle-panel.svg')",
        "lilac-dots-circle": "url('/images/lilac-dots-circle-panel.svg')",
      },
      colors: {
        "queen-blue": "#3667ED",
        "queen-yellow": "#E5FC52",
        "queen-black": "#362921",
        "queen-gray": "#D7CDFB",
        "queen-white": "#F7F7F7",
        "queen-orange": "#FF7300",
        "queen-lilac": "#D7CDFB",
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
