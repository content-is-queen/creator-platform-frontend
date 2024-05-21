import "../styles/globals.css";
import "react-tailwindcss-select/dist/index.css";

import Providers from "@/components/Providers";

import localFont from "next/font/local";
import { Anton } from "next/font/google";

const formaDJRDeck = localFont({
  src: "./fonts/FormaDJRDeck-Regular.woff2",
  variable: "--font-forma-deck",
});

const formaDJRBanner = localFont({
  src: [
    { path: "./fonts/FormaDJRBanner-Regular.woff2" },
    { path: "./fonts/FormaDJRBanner-Bold.woff2", weight: "bold" },
  ],
  variable: "--font-forma-banner",
});

const anton = Anton({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

export const metadata = {
  title: "Creator Platform | CIQ",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`bg-queen-white ${formaDJRBanner.variable} ${formaDJRDeck.variable} ${anton.className}`}
    >
      <link rel="icon" href="/images/favicon.svg" />
      <link rel="apple-touch-icon" href="/images/touch-icon.png" />
      <meta name="theme-color" content="#ffffff" />

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
