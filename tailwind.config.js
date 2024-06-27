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
        "queen-blue": "#3667ED",
        "queen-yellow": { DEFAULT: "#E5FC52", dark: "#c4e204" },
        "queen-black": "#362921",
        "queen-gray": "#D7CDFB",
        "queen-white": "#F7F7F7",
        "queen-orange": { DEFAULT: "#FF7300", dark: "#e66800" },
        "queen-lilac": "#D7CDFB",
      },
      fontFamily: {
        heading: ["var(--font-anton)"],
        sans: ["var(--font-forma-deck)"],
        subheading: ["var(--font-forma-banner)"],
        decorative: ["var(--font-swear-display)"],
      },
    },
  },
};
