import "../styles/globals.css";

import Providers from "@/components/Providers";

import localFont from "next/font/local";

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

export const metadata = {
  title: "Creator Platform | CIQ",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`bg-queen-white bg-dots bg-repeat-x bg-fixed bg-[center_bottom_-4.5rem] text-queen-black ${formaDJRBanner.variable} ${formaDJRDeck.variable}`}
    >
      <link rel="icon" href="/images/favicon.svg" />
      <link rel="apple-touch-icon" href="/images/touch-icon.png" />
      <meta name="theme-color" content="#ffffff" charSet="utf-8" />

      <body>
        <Providers>
          <main id="main-content">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
