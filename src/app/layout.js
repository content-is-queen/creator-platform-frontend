import "../styles/globals.css";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

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
  title: "Creator Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`text-queen-black ${formaDJRBanner.variable} ${formaDJRDeck.variable}`}
    >
      <link rel="icon" href="/images/favicon.svg" />
      <link rel="apple-touch-icon" href="/images/touch-icon.png" />
      <meta name="theme-color" content="#ffffff" charSet="utf-8" />

      <body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        {process.env.NEXT_PUBLIC_APP_ENV === "production" && (
          <Script src="/clarity.js" />
        )}
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
