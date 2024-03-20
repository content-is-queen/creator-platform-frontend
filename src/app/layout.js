import { UserProfileProvider } from "@/contexts/AuthContext/UserProfileContext";
import "../styles/globals.css";

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
      className={`${formaDJRBanner.variable} ${formaDJRDeck.variable}`}
    >
      <body>
        <UserProfileProvider>{children}</UserProfileProvider>
      </body>
    </html>
  );
}
